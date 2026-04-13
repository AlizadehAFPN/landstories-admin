import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `For 145 years, the Ottoman Empire held Buda — the ancient hilltop capital of Hungary — as one of its most prized western outposts. By 1686, Europe had had enough. A massive alliance of armies from Austria, Bavaria, Brandenburg, and a dozen smaller states gathered along the Danube with a single mission: take the city back. What followed was 78 days of hell that would turn the river into a mirror of flames.`,
  },
  {
    text: `The siege opened in mid-June with a wall of noise. Cannons on both sides fired day and night — so constantly that soldiers went deaf within weeks. When sections of Buda's walls crumbled, attackers rushed through the gaps, only to be cut down by Ottoman defenders who knew every corner, every blind spot, every rooftop angle. The castle sat high on a limestone ridge above the Danube. Getting close was hard enough. Staying alive inside was something else entirely.`,
  },
  {
    text: `By August, disease was killing the attackers faster than Ottoman weapons ever could. The trenches had become open graves. Surgeons ran out of bandages and started wrapping wounds with cloth stripped from dead men's uniforms. Charles of Lorraine, the general commanding this massive siege, faced a brutal truth: if Buda didn't fall before winter, his army would fall apart on its own.`,
  },
  {
    text: `On September 2nd, Charles threw everything he had into one last push. By mid-afternoon, soldiers were charging from every direction, scrambling over rubble that used to be walls. The fighting was street by street, doorway by doorway, with no mercy shown by either side. The outer city fell within hours. But the castle itself — perched high above the burning city on its cliff — refused to break.`,
  },
  {
    text: `Then the castle walls gave way. Hungarian soldiers led the final charge — this was their capital, and they'd waited 145 years to reclaim it. The Ottoman governor, Abdurrahman Abdi Pasha, could have surrendered. He chose to die fighting, sword in hand, defending the fortress he'd sworn to hold. Of the 10,000 Ottoman soldiers who held Buda, fewer than 500 survived.`,
  },
  {
    text: `But "victory" is a generous word for what remained. More than 20,000 attackers lay dead in the trenches and rubble. The city itself was gutted. The Corvina Library — one of Europe's greatest book collections, gathered by Hungarian King Matthias two centuries before — was nothing but ash. They didn't free a city. They freed a graveyard.`,
  },
  {
    text: `And yet, September 2nd, 1686 became one of the most celebrated dates in Hungarian history. Church bells rang across the country when the news arrived. After nearly a century and a half under Ottoman control, Buda was Hungarian again. The price was everything the city had once been — but for a people who still remembered what freedom felt like, even ruins were worth more than someone else's palace.`,
  },
];

// ── Validation ──────────────────────────────────────────────
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const t = paragraphs[i].text;
  const words = t.split(/\s+/).length;
  const chars = t.length;
  totalChars += chars;
  console.log(`P${i}: ${chars} chars, ${words} words`);
  if (chars > 500) console.error(`  ⚠️  P${i} exceeds 500 char limit!`);
  if (words > 100) console.error(`  ⚠️  P${i} exceeds 100 word limit!`);
}
console.log(`\nTotal: ${totalChars} chars (target ~3000 ±20% = 2400–3600)`);
console.log(`Paragraphs: ${paragraphs.length} (target 6–8)\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error("⚠️  Total character count out of range!");
}

// ── Push to DynamoDB ────────────────────────────────────────
const now = Math.floor(Date.now() / 1000);
const excerpt = paragraphs[0].text.substring(0, 130).replace(/\s+\S*$/, "");

console.log(`Excerpt: "${excerpt}"\n`);

const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "buda-castle",
      langStoryId: "en#great-siege-1686",
    },
    UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": excerpt,
      ":u": now,
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("✅ Updated successfully!");
console.log("Title:", result.Attributes.title);
console.log("Subtitle:", result.Attributes.subtitle);
console.log("Paragraphs:", result.Attributes.paragraphs.length);
console.log("Excerpt:", result.Attributes.excerpt);
console.log("Updated at:", new Date(result.Attributes.updatedAt * 1000).toISOString());

// Verify no metadata fields were touched
console.log("\n── Preserved fields ──");
console.log("siteId:", result.Attributes.siteId);
console.log("storyId:", result.Attributes.storyId);
console.log("langStoryId:", result.Attributes.langStoryId);
console.log("tier:", result.Attributes.tier);
console.log("icon:", result.Attributes.icon);
console.log("storyCategory:", result.Attributes.storyCategory);
console.log("era:", result.Attributes.era);
console.log("characters:", result.Attributes.characters);
console.log("moralOrLesson:", result.Attributes.moralOrLesson);
console.log("coordinates:", result.Attributes.coordinates);
console.log("isFree:", result.Attributes.isFree);
console.log("disabled:", result.Attributes.disabled);
