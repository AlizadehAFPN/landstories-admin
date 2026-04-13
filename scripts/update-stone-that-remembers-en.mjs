/**
 * Update "The Stone That Remembers" (en) — paragraph edit only.
 * Only touches `paragraphs` and `updatedAt`. All other fields stay untouched.
 *
 * Usage: node scripts/update-stone-that-remembers-en.mjs
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1]] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";

const paragraphs = [
  {
    text: "Underneath the golden dome in Jerusalem, there\u2019s a slab of bare rock \u2014 eighteen meters long, thirteen wide \u2014 rising out of the mountain like a bone from the earth itself. Jews call it the Foundation Stone. Muslims call it al-Sakhra. And both traditions make the same staggering claim: when God created the world, He started here. He set this rock into the void the way a builder lays a cornerstone, and everything \u2014 all of creation \u2014 spread outward from this one spot.",
  },
  {
    text: "This is where Abraham brought his son to be sacrificed \u2014 Isaac in the Torah, Ismail in the Quran. The story is the same in both: God told Abraham to give up the person he loved most. So he loaded the firewood, took the boy, and walked for three days. At some point the boy asked the question no parent wants to hear: Father, I see the fire and the wood, but where is the lamb? Abraham said: God will provide. And they kept walking \u2014 the silence between them heavier than the mountain itself.",
  },
  {
    text: "A thousand years later, King David took Jerusalem. His son Solomon raised the First Temple over the stone \u2014 cedar, gold, and bronze. At its heart: the Holy of Holies, where only one person entered, once a year, barefoot \u2014 the High Priest, whispering God\u2019s true name. Four centuries it stood. Then Babylon\u2019s king Nebuchadnezzar burned it to the ground. The Ark of the Covenant vanished. In exile, the survivors wept: If I forget you, Jerusalem, let my right hand wither.",
  },
  {
    text: "The exiles rebuilt \u2014 a humbler temple that made old men cry. King Herod turned it into a wonder, expanding the mount with stones so massive some weigh five hundred tons. Jesus walked in, flipped the merchants\u2019 tables, and warned: Not one stone will be left standing. In 70 AD, Roman general Titus proved him right. His soldiers torched it and ripped apart every block for melted gold. All that survived was the Western Wall \u2014 where Jews have pressed their foreheads in prayer for two thousand years.",
  },
  {
    text: "For six centuries the mount lay in ruins. Romans raised a pagan temple. Byzantines dumped garbage on it to humiliate the Jews. Then in 637, Caliph Umar took Jerusalem peacefully. When he saw the filth on Abraham\u2019s rock, he knelt and cleared it himself. Fifty years later, Caliph Abd al-Malik built the Dome of the Rock \u2014 that golden shrine you see in every photo of Jerusalem. It cost seven years of Egypt\u2019s tax revenue. He didn\u2019t flinch. He was crowning the rock where the world began.",
  },
  {
    text: "In 1099, Crusaders stormed Jerusalem and slaughtered nearly everyone inside. They put a cross on the Dome, an altar over the stone. The Knights Templar moved into Al-Aqsa mosque \u2014 that\u2019s where they got their name, from the Temple. Eighty-eight years later, Saladin took the city back. Unlike the Crusaders, he spared it. He took down the cross, put back the crescent, and washed the rock with rosewater from Damascus. The stone doesn\u2019t remember who conquered it. It only remembers who wept upon it.",
  },
  {
    text: "Jews pray at the Western Wall but won\u2019t step onto the mount \u2014 too sacred. Muslims worship at Al-Aqsa. Christians walk where Jesus taught. Three faiths. One rock. Three thousand years. Under the dome the bedrock just sits there \u2014 pale, rough, indifferent to empires. It outlasted Solomon, Titus, Crusaders, and Ottomans. It\u2019ll outlast whatever comes next. The stone doesn\u2019t speak. It doesn\u2019t choose. But it remembers every prayer, in every language \u2014 and has never turned a single one away.",
  },
];

async function main() {
  const key = {
    siteId: "jerusalem-old-city",
    langStoryId: "en#temple-mount-three-faiths",
  };

  // Pre-flight: verify character & word limits
  let totalChars = 0;
  let ok = true;
  for (let i = 0; i < paragraphs.length; i++) {
    const t = paragraphs[i].text;
    const chars = t.length;
    const words = t.split(/\s+/).length;
    totalChars += chars;
    const flag = chars > 500 || words > 100 ? " ** OVER LIMIT **" : "";
    if (flag) ok = false;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words${flag}`);
  }
  console.log(`  Total: ${totalChars} chars (target ~3000, range 2400-3600)`);
  if (totalChars > 3600) {
    console.error("TOTAL EXCEEDS 3600 — aborting.");
    process.exit(1);
  }
  if (!ok) {
    console.warn("WARNING: Some paragraphs exceed per-paragraph limits.");
  }

  console.log(`\nPushing to DynamoDB...`);
  console.log(`  Table: ${TABLE}`);
  console.log(`  Key: siteId="${key.siteId}", langStoryId="${key.langStoryId}"`);

  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: key,
      UpdateExpression: "SET paragraphs = :p, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": paragraphs,
        ":u": Math.floor(Date.now() / 1000),
      },
    }),
  );

  console.log("Paragraphs updated successfully!");

  // Verify
  const { Item } = await docClient.send(
    new GetCommand({ TableName: TABLE, Key: key }),
  );
  console.log(`\nVerification — ${Item.paragraphs.length} paragraphs stored.`);
  let verifyTotal = 0;
  for (let i = 0; i < Item.paragraphs.length; i++) {
    const t = Item.paragraphs[i].text;
    verifyTotal += t.length;
    console.log(`  P${i + 1}: ${t.length} chars, ${t.split(/\s+/).length} words`);
  }
  console.log(`  Total: ${verifyTotal} chars`);
  console.log(`  Title: "${Item.title}" (unchanged)`);
  console.log(`  Subtitle: "${Item.subtitle}" (unchanged)`);
  console.log(`  Excerpt: "${Item.excerpt.slice(0, 60)}..." (unchanged)`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
