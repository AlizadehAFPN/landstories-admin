import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: "By 1174, Saladin was the most powerful man in the Middle East. He\u2019d seized power in Egypt, unified it with Syria under his command, and was gearing up for the campaign that would eventually take Jerusalem back from the Crusaders. No army in the region could challenge him. But there was one enemy that didn\u2019t use armies \u2014 a man perched in a mountain fortress called Masyaf, who didn\u2019t fight wars with soldiers. He fought them with a single knife slipped between a ruler\u2019s ribs in the dead of night.",
  },
  {
    text: "His name was Rashid al-Din Sinan \u2014 the Crusaders called him the Old Man of the Mountain. He led the Syrian Assassins, a sect that perfected the targeted kill at a fortress called Alamut in Persia. Their agents trained from boyhood to slip into any court, wear any face, and strike with a single blade \u2014 knowing they\u2019d die in the act. Sinan held a grudge: Saladin had crushed the caliphate in Egypt that his sect traced its roots to, and was planning to swallow their territory next.",
  },
  {
    text: "In 1174, Sinan sent thirteen agents to infiltrate Saladin\u2019s camp and kill him. Thirteen \u2014 an unusually large team, which tells you just how dangerous the target was. They nearly pulled it off. But a local governor named Khumartakin, who ruled a castle near the Assassins\u2019 territory, recognized the infiltrators before they could strike. The alarm went up. All thirteen were caught. The first attempt failed \u2014 but Sinan wasn\u2019t the type to quit after one try.",
  },
  {
    text: "On May 22, 1176, Sinan tried again. During Saladin\u2019s siege of Azaz in northern Syria, assassins wearing the uniforms of the sultan\u2019s own soldiers attacked Saladin himself. One drove a blade at his skull \u2014 it glanced off a steel cap hidden under his turban. Another slashed his throat \u2014 chainmail under his robes stopped the cut. Saladin fought them hand-to-hand as his guards swarmed in. Every assassin was killed. But the message landed harder than any blade: they could reach him.",
  },
  {
    text: "Saladin marched to Masyaf and besieged the fortress. He spread chalk and cinders around his tent so any footstep would show, posted guards all night, and lit oil lamps along the perimeter. Every precaution a military mind could think of. Then one night, the sultan woke to see a shadow slipping through the tent flap. Beside his pillow: warm scones baked in a style only the Assassins used, a poisoned dagger, and a note from Sinan. The bread was still warm. Not a single footprint in the chalk.",
  },
  {
    text: "Let that sink in for a second. Someone walked through an armed camp, past every guard, across ground designed to catch their footprints, stood over the most powerful man in the Middle East while he slept \u2014 and chose to leave proof rather than a corpse. They could have slit his throat. They left pastries instead. The dagger on the pillow wasn\u2019t a failed assassination. It was a business card.",
  },
  {
    text: "Saladin lifted the siege within days. He never attacked an Assassin fortress again. A truce was struck, and in one of the strangest turns of the Crusader era, Sinan\u2019s own agents eventually fought alongside Saladin against the Crusader kingdoms. The blade left beside the pillow \u2014 rather than planted in the sultan\u2019s heart \u2014 did something no killing ever could. It turned an enemy into an ally. Sometimes the most powerful weapon is the one you choose not to use.",
  },
];

// --- Validation ---
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  ⚠ P${i + 1} exceeds 500-char limit!`);
  if (words > 100) console.warn(`  ⚠ P${i + 1} exceeds 100-word limit!`);
}
console.log(`\nTotal: ${totalChars} chars across ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)\n`);

// --- Push to DynamoDB ---
async function main() {
  const now = Math.floor(Date.now() / 1000);

  const result = await docClient.send(
    new UpdateCommand({
      TableName: "Story",
      Key: {
        siteId: "alamut-castle",
        langStoryId: "en#dagger-on-saladins-pillow",
      },
      UpdateExpression: "SET paragraphs = :p, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": paragraphs,
        ":u": now,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  console.log("✅ Updated successfully!");
  console.log(`   updatedAt: ${now}`);
  console.log(`   title: ${result.Attributes.title}`);
  console.log(`   paragraphs count: ${result.Attributes.paragraphs.length}`);
}

main().catch((err) => {
  console.error("❌ Update failed:", err.message);
  process.exit(1);
});
