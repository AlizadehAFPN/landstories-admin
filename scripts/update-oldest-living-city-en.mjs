import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// ─── REWRITTEN PARAGRAPHS ───────────────────────────────────────────────────

const paragraphs = [
  {
    text: `Mark Twain said Varanasi is "older than history, older than tradition, older even than legend — and looks twice as old as all of them put together." When he reached the Ganges by boat in 1896, what he saw had been there for thousands of years: stone steps descending into the river, temples on every rooftop, cremation fires burning nonstop for centuries. Many cities claim to be the oldest on Earth. Varanasi's claim is different — it never stopped being itself.`,
    audio: {
      url: "https://d1u6ectbijsml5.cloudfront.net/audio/polly/en/varanasi/oldest-living-city/p0.mp3",
      durationSeconds: 114.744,
    },
    audioProviders: {
      polly: {
        voiceId: "Danielle",
        durationSeconds: 114.744,
        provider: "polly",
        url: "https://d1u6ectbijsml5.cloudfront.net/audio/polly/en/varanasi/oldest-living-city/p0.mp3",
      },
    },
  },
  {
    text: `Archaeologists dug near where two rivers meet and found pottery from roughly 1800 BCE. Below that layer — nothing. Above it — layer after layer after layer, every era of Indian history stacked like a timeline made of dirt and stone. No gap. No abandonment. No silence. The Rigveda, one of the oldest sacred texts ever composed, calls this place Kashi — "the City of Light." While other ancient cities were abandoned and eventually rediscovered, Kashi just kept shining.`,
  },
  {
    text: `Around 528 BCE, the Buddha walked to Sarnath, just outside Varanasi, to give his very first sermon. He didn't pick the spot randomly — Varanasi was already the intellectual capital of the known world. In front of five followers who had actually given up on him, he laid out the ideas that would reshape half of Asia: the Middle Way, the Four Noble Truths, the path to ending suffering. The city was already a thousand years old when it witnessed the birth of Buddhism.`,
  },
  {
    text: `Conquerors came for Varanasi again and again. In 1194, invading armies destroyed nearly a thousand temples. In 1669, the Mughal Emperor Aurangzeb tore down the holiest Shiva temple in India and built a mosque on its foundations. He renamed the city. Nobody used the new name. Then in 1780, a warrior queen named Ahilyabai Holkar built a new temple right next door. A Sikh king later covered its dome in gold. A Hindu queen built it. A Sikh king crowned it. The city rose again — brighter than before.`,
  },
  {
    text: `Here's what makes Varanasi truly different. Hindu scripture says the city sits on Shiva's trident, suspended between heaven and earth. When the universe is destroyed at the end of time, Shiva lifts the city above the flood. The ground is sacred — not the buildings. That's why you can burn every temple and Varanasi is still Varanasi. Hindus believe anyone who dies within its borders escapes the cycle of rebirth forever. You can destroy the house of God. You cannot destroy the ground it stands on.`,
  },
  {
    text: `But Varanasi isn't a museum. Walk through its lanes — so narrow two people can barely pass — and you'll share the road with cows, motorcycles, funeral processions, and schoolchildren all at once. This is the city that gave the world Kabir, the rebel poet whose words are still quoted by Hindus, Muslims, and Sikhs. It's where Bismillah Khan played music by the Ganges every dawn for seventy years and refused to leave, saying he could never abandon his river and his god.`,
  },
  {
    text: `Every evening at Dashashwamedh Ghat, priests swing massive brass lamps through the darkness while thousands watch from the stone steps and from boats on the black water. Every morning, before the sun clears the far bank, bathers walk down to the river in the grey half-light. And the city does what it has done every single day for three thousand years: it turns its face to the water, it prays, it burns its dead, and it lives.`,
  },
];

// ─── UPDATE ──────────────────────────────────────────────────────────────────

const params = {
  TableName: "Story",
  Key: {
    siteId: "varanasi",
    langStoryId: "en#oldest-living-city",
  },
  UpdateExpression: "SET paragraphs = :p, readingTimeMinutes = :r, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":r": 3,
    ":u": Math.floor(Date.now() / 1000),
  },
  ReturnValues: "ALL_NEW",
};

try {
  const result = await docClient.send(new UpdateCommand(params));
  console.log("✅ Updated oldest-living-city (en)");
  console.log("   Paragraphs:", result.Attributes.paragraphs.length);
  console.log("   Reading time:", result.Attributes.readingTimeMinutes, "min");

  // Validate constraints
  let totalChars = 0;
  for (let i = 0; i < result.Attributes.paragraphs.length; i++) {
    const p = result.Attributes.paragraphs[i];
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    console.log(`   P${i}: ${chars} chars, ${words} words ${chars > 500 ? "⚠️ OVER 500" : "✓"} ${words > 100 ? "⚠️ OVER 100W" : "✓"}`);
  }
  console.log(`   Total: ${totalChars} chars (target ~3000, range 2400-3600)`);
} catch (err) {
  console.error("❌ Failed:", err.message);
  process.exit(1);
}
