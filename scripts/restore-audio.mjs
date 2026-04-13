/**
 * One-time script to restore audio references in the Story DynamoDB table.
 * Audio files still exist in S3 but references were accidentally removed.
 *
 * Usage: node scripts/restore-audio.mjs [--dry-run]
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const DRY_RUN = process.argv.includes("--dry-run");

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const CLOUDFRONT = "https://d1u6ectbijsml5.cloudfront.net";
const TABLE = "Story";

// ── Bitrates (confirmed from existing DB data) ──────────────────────────
// conquest-legend p5 polly:  84140 bytes / 14.016s = 6003 bytes/sec
// conquest-legend p0 openai: 375360 bytes / 18.768s = 20000 bytes/sec
const POLLY_BPS = 6003;
const OPENAI_BPS = 20000;

// ── Voice IDs per storyCategory (from Lambda voice-config) ─────────────
const POLLY_VOICES = {
  crowns_conquests: "Stephen",
  love_heartbreak: "Danielle",
  gods_monsters: "Matthew",
  riddles_past: "Ruth",
  ghosts_curses: "Amy",
  builders_wonders: "Gregory",
  prophets_pilgrims: "Salli",
  tricksters_folk_tales: "Matthew",
  place_names: "Danielle",
  lost_found: "Gregory",
};

const OPENAI_VOICES = {
  crowns_conquests: "echo",
  love_heartbreak: "nova",
  gods_monsters: "onyx",
  riddles_past: "fable",
  ghosts_curses: "ash",
  builders_wonders: "sage",
  prophets_pilgrims: "coral",
  tricksters_folk_tales: "shimmer",
  place_names: "alloy",
  lost_found: "ballad",
};

// ── S3 audio files (from `aws s3 ls --recursive`) ─────────────────────
// Path structure: audio/{provider}/{lang}/{siteId}/{storyId}/p{idx}.mp3
// Exception: audio/en/... (legacy Polly path without provider prefix)
const audioGroups = [
  // ─── audio/en/ (Polly, legacy path) ───
  {
    s3Path: "audio/en/alanya-castle/cleopatras-gift",
    provider: "polly",
    siteId: "alanya-castle",
    storyId: "cleopatras-gift",
    files: [
      { idx: 0, size: 105164 },
      { idx: 1, size: 82844 },
      { idx: 2, size: 76364 },
      { idx: 3, size: 94364 },
      { idx: 4, size: 64412 },
    ],
  },
  {
    s3Path: "audio/en/alanya-castle/conquest-legend",
    provider: "polly",
    siteId: "alanya-castle",
    storyId: "conquest-legend",
    files: [
      { idx: 0, size: 107468 },
      { idx: 1, size: 26252 },
      { idx: 2, size: 76364 },
      { idx: 3, size: 83564 },
      { idx: 4, size: 47996 },
    ],
  },
  {
    s3Path: "audio/en/alanya-castle/elenis-tears",
    provider: "polly",
    siteId: "alanya-castle",
    storyId: "elenis-tears",
    files: [
      { idx: 0, size: 105596 },
      { idx: 1, size: 88172 },
      { idx: 2, size: 104588 },
      { idx: 3, size: 59084 },
      { idx: 4, size: 72044 },
    ],
  },
  {
    s3Path: "audio/en/alanya-castle/mahperi-hatun",
    provider: "polly",
    siteId: "alanya-castle",
    storyId: "mahperi-hatun",
    files: [
      { idx: 0, size: 86444 },
      { idx: 1, size: 101564 },
      { idx: 2, size: 95372 },
      { idx: 3, size: 110924 },
      { idx: 4, size: 102572 },
    ],
  },

  // ─── audio/openai/ ───
  {
    s3Path: "audio/openai/en/alanya-castle/cleopatras-gift",
    provider: "openai",
    siteId: "alanya-castle",
    storyId: "cleopatras-gift",
    files: [
      { idx: 0, size: 359520 },
      { idx: 1, size: 305280 },
      { idx: 2, size: 274560 },
      { idx: 3, size: 352800 },
      { idx: 4, size: 233280 },
    ],
  },
  {
    s3Path: "audio/openai/en/alanya-castle/conquest-legend",
    provider: "openai",
    siteId: "alanya-castle",
    storyId: "conquest-legend",
    files: [
      { idx: 0, size: 375360 },
      { idx: 1, size: 108000 },
      { idx: 2, size: 288480 },
    ],
  },

  // ─── audio/polly/ ───
  {
    s3Path: "audio/polly/en/alanya-castle/conquest-legend",
    provider: "polly",
    siteId: "alanya-castle",
    storyId: "conquest-legend",
    files: [{ idx: 5, size: 84140 }],
  },
];

// ── Main ────────────────────────────────────────────────────────────────

async function restoreAudio() {
  console.log(DRY_RUN ? "=== DRY RUN ===" : "=== APPLYING CHANGES ===");

  // Group all audio data by story
  const storyMap = new Map();

  for (const group of audioGroups) {
    const key = `${group.siteId}#${group.storyId}`;
    if (!storyMap.has(key)) {
      storyMap.set(key, {
        siteId: group.siteId,
        storyId: group.storyId,
        paragraphAudio: {},
      });
    }
    const entry = storyMap.get(key);

    for (const file of group.files) {
      if (!entry.paragraphAudio[file.idx]) {
        entry.paragraphAudio[file.idx] = {};
      }

      const bps = group.provider === "openai" ? OPENAI_BPS : POLLY_BPS;
      const durationSeconds =
        Math.round((file.size / bps) * 1000) / 1000;

      entry.paragraphAudio[file.idx][group.provider] = {
        url: `${CLOUDFRONT}/${group.s3Path}/p${file.idx}.mp3`,
        durationSeconds,
        provider: group.provider,
      };
    }
  }

  let totalRestored = 0;
  let totalSkipped = 0;

  for (const [key, storyAudio] of storyMap) {
    const { siteId, storyId } = storyAudio;
    console.log(`\n── ${siteId} / ${storyId} ──`);

    // Fetch current story
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE,
        Key: { siteId, langStoryId: `en#${storyId}` },
      })
    );

    if (!result.Item) {
      console.log("  WARN: Story not found in DynamoDB!");
      continue;
    }

    const story = result.Item;
    const storyCategory = story.storyCategory;
    const paragraphs = [...(story.paragraphs || [])];

    console.log(
      `  category: ${storyCategory}, paragraphs: ${paragraphs.length}, hasAudio: ${story.hasAudio}`
    );

    let changed = false;

    for (const [idxStr, providers] of Object.entries(
      storyAudio.paragraphAudio
    )) {
      const idx = parseInt(idxStr);

      if (idx >= paragraphs.length) {
        console.log(`  p${idx}: SKIP (paragraph index out of range)`);
        continue;
      }

      // Clone paragraph to avoid mutating original
      const para = { ...paragraphs[idx] };
      paragraphs[idx] = para;

      if (!para.audioProviders) {
        para.audioProviders = {};
      }

      for (const [provider, audioData] of Object.entries(providers)) {
        // Skip if this provider already exists
        if (para.audioProviders[provider]) {
          console.log(`  p${idx} ${provider}: SKIP (already exists)`);
          totalSkipped++;
          continue;
        }

        const voiceId =
          provider === "openai"
            ? OPENAI_VOICES[storyCategory]
            : POLLY_VOICES[storyCategory];

        para.audioProviders[provider] = {
          ...audioData,
          voiceId: voiceId || "unknown",
        };

        console.log(
          `  p${idx} ${provider}: RESTORE → voice=${voiceId}, duration=${audioData.durationSeconds}s`
        );
        totalRestored++;
        changed = true;
      }

      // Set legacy `audio` field if missing (use first available provider)
      if (!para.audio && para.audioProviders) {
        const first = Object.values(para.audioProviders)[0];
        if (first) {
          para.audio = {
            url: first.url,
            durationSeconds: first.durationSeconds,
          };
        }
      }
    }

    if (!changed) {
      console.log("  No changes needed");
      continue;
    }

    const hasAudio = paragraphs.some(
      (p) =>
        p.audio ||
        (p.audioProviders && Object.keys(p.audioProviders).length > 0)
    );

    if (DRY_RUN) {
      console.log(`  WOULD UPDATE: hasAudio=${hasAudio}`);
    } else {
      await docClient.send(
        new UpdateCommand({
          TableName: TABLE,
          Key: { siteId, langStoryId: `en#${storyId}` },
          UpdateExpression:
            "SET paragraphs = :paragraphs, hasAudio = :hasAudio, updatedAt = :updatedAt",
          ExpressionAttributeValues: {
            ":paragraphs": paragraphs,
            ":hasAudio": hasAudio,
            ":updatedAt": Math.floor(Date.now() / 1000),
          },
        })
      );
      console.log(`  UPDATED: hasAudio=${hasAudio}`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Restored: ${totalRestored} audio references`);
  console.log(`Skipped:  ${totalSkipped} (already existed)`);
  console.log(DRY_RUN ? "Mode: DRY RUN (no changes applied)" : "Mode: APPLIED");
}

restoreAudio().catch(console.error);
