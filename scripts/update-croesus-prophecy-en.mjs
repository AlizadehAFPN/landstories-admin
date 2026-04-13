import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Picture the richest man in the ancient world. That was Croesus, King of Lydia — a kingdom in what's now western Turkey, sitting on ridiculous amounts of gold. "Rich as Croesus" became the ancient version of "rich as a billionaire." When you're that wealthy, you start believing you can buy anything — even the future. So he sent staggering gifts to the Oracle at Delphi: a solid gold lion over 500 pounds, golden bowls, and 117 bars of pure gold. His goal? Get the gods on his side.`,
  },
  {
    text: `But in 546 BCE, Croesus had a problem — a massive one. Cyrus the Great of Persia, the most dangerous military commander of the era, was swallowing kingdoms whole. He'd already toppled the Median Empire to the east and was pushing west, straight toward Lydia. Croesus had to make a choice: strike first, or sit back and hope Cyrus stopped? He decided to ask the most famous fortune-teller in the world — the Oracle at Delphi.`,
  },
  {
    text: `The priestess of Apollo, known as the Pythia, gave him an answer that would echo through history: "If you cross the Halys River, a great empire will be destroyed." That's it. No details. No fine print. Just one devastating sentence wrapped in a bow.`,
  },
  {
    text: `Croesus heard exactly what he wanted to hear. A great empire destroyed? Obviously Persia. He celebrated, sent even more gold to Delphi as a thank-you, and marched his army east across the Halys River — the border between his kingdom and Cyrus's territory. He never once stopped to ask the one question that could have saved everything: which empire?`,
  },
  {
    text: `The first battle was a draw. Croesus pulled back to his capital, Sardis, planning to regroup over winter and bring in allies for a spring campaign. But Cyrus was not the kind of general who gives you time to recover. He chased Croesus all the way to Sardis, surrounded the city, and took it in just fourteen days. The richest king in the world was now Cyrus's prisoner. The great empire the Oracle promised would fall? It was his own.`,
  },
  {
    text: `According to the Greek historian Herodotus, Cyrus had Croesus placed on a pyre to be burned alive. As the flames climbed, Croesus cried out to Apollo — the god he'd showered with gold, the god whose Oracle had sent him to war. Then, out of a clear sky, a sudden rainstorm crashed down and killed the fire. Cyrus was so shaken by this sign from the gods that he pulled Croesus from the flames and made him a royal advisor instead.`,
  },
  {
    text: `But Croesus was still bitter. He sent one last message to Delphi: "Is this how Apollo repays the faithful?" The Oracle's answer was ice-cold: "The god said a great empire would fall. You should have asked which one. You didn't understand the prophecy, and you never bothered to clarify. Blame yourself, not the god."`,
  },
  {
    text: `And that's the story that defined Delphi for centuries. The Oracle never lied — she told the truth in a way that required you to be honest with yourself first. Croesus wasn't tricked. He tricked himself. He walked into that prophecy with his answer already written, and heard only what confirmed it. Twenty-five centuries later, we still do the exact same thing — hear what we want to hear, and call it fate when it goes wrong.`,
  },
];

const excerpt =
  "Picture the richest man in the ancient world. That was Croesus, King of Lydia — a kingdom in what's now western Turkey, sitting on ridiculous amounts of gold. When you're that wealthy, you start believing you can buy anything — even the future.";

const now = Math.floor(Date.now() / 1000);

async function main() {
  // Verify paragraph constraints before pushing
  let totalChars = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    const t = paragraphs[i].text;
    const chars = t.length;
    const words = t.split(/\s+/).length;
    totalChars += chars;
    console.log(
      `P${i + 1}: ${chars} chars, ${words} words ${chars > 500 ? "⚠️ OVER 500 CHARS" : "✓"} ${words > 100 ? "⚠️ OVER 100 WORDS" : "✓"}`
    );
  }
  console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
  console.log(`Excerpt: ${excerpt.length} chars\n`);

  if (paragraphs.some((p) => p.text.length > 500)) {
    console.error("❌ A paragraph exceeds 500 chars. Aborting.");
    process.exit(1);
  }
  if (paragraphs.some((p) => p.text.split(/\s+/).length > 100)) {
    console.error("❌ A paragraph exceeds 100 words. Aborting.");
    process.exit(1);
  }

  const result = await doc.send(
    new UpdateCommand({
      TableName: "Story",
      Key: { siteId: "delphi", langStoryId: "en#croesus-prophecy" },
      UpdateExpression:
        "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": paragraphs,
        ":e": excerpt,
        ":u": now,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  console.log("✅ Story updated successfully!");
  console.log("Title:", result.Attributes.title);
  console.log("Paragraphs:", result.Attributes.paragraphs.length);
  console.log("Excerpt:", result.Attributes.excerpt.substring(0, 80) + "...");
  console.log("UpdatedAt:", new Date(result.Attributes.updatedAt * 1000).toISOString());
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
