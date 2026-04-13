import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 1607, a fifteen-year-old Mughal prince named Khurram walked through a bazaar in his father's palace and stopped dead. A fourteen-year-old girl stood at a stall \u2014 Arjumand Banu Begum, daughter of one of the most powerful Persian nobles at court. He went to his father, Emperor Jahangir, and said he would marry her. The astrologers picked a date \u2014 five years away. He waited every one of those days. They married in 1612, and he gave her a new name: Mumtaz Mahal, the Jewel of the Palace.`,
  },
  {
    text: `This wasn\u2019t a royal marriage in name only. Shah Jahan \u2014 as Khurram became after taking the throne \u2014 gave Mumtaz the imperial seal, making her the only person who could approve state documents besides himself. She traveled with him on every military campaign, often pregnant, through dust and monsoon across India. In nineteen years, she bore him fourteen children. Among the survivors: Jahanara, who\u2019d become the most powerful woman in the empire, and Aurangzeb, who\u2019d become its most ruthless ruler.`,
  },
  {
    text: `In 1631, on a campaign in central India, Mumtaz went into labor with her fourteenth child. Thirty hours later, she was bleeding out. She made Shah Jahan promise three things: build me a tomb more beautiful than anything on earth. Never marry again. Care for our children. On June 17, at thirty-eight, the Jewel of the Palace died. The baby survived. Shah Jahan walked out of that tent a broken man. Within weeks his beard was fully white, and he cried so hard his eyesight failed.`,
  },
  {
    text: `Shah Jahan poured the wealth of the richest empire on earth into keeping that promise. Twenty thousand workers. One thousand elephants. Twenty-two years. White marble from Rajasthan that blushes pink at dawn and turns silver under moonlight. Precious stones from across the known world \u2014 lapis lazuli, jade, turquoise, sapphires \u2014 set into the marble so precisely the building seems to glow from within. The cost: thirty-two million rupees. Around eight hundred million dollars today.`,
  },
  {
    text: `In 1657, Shah Jahan fell ill, and his four sons went to war for the throne. Aurangzeb \u2014 the most ruthless \u2014 won. He executed his eldest brother Dara Shikoh, made the others disappear, and locked his own father in a tower at Agra Fort. Through carved stone screens, Shah Jahan could see the Taj Mahal across the river \u2014 pink at dawn, white at noon, silver at dusk. For eight years, he sat there. His daughter Jahanara chose prison with him, refusing to let her father face the end alone.`,
  },
  {
    text: `On January 22, 1666, Shah Jahan died at seventy-four, eyes toward the white dome across the river. Aurangzeb denied him a state funeral. The body was washed, placed in a coffin, and carried by boat to the Taj Mahal. He was laid beside Mumtaz in the crypt below \u2014 the real burial place, beneath the tombs visitors see today. His tomb sits slightly off-center, the only break in the building\u2019s perfect symmetry, because the whole thing was designed for one. That flaw says everything.`,
  },
  {
    text: `Today, nearly four hundred years later, eight million people visit the Taj Mahal every year. Most know the basics: a man loved a woman, she died, he built the most beautiful building on earth. What they don\u2019t know is the ending \u2014 that he spent his last eight years locked in a tower, staring at the only promise he ever kept, waiting to be carried across the river and laid beside her in the dark. The Taj Mahal isn\u2019t a building. It\u2019s what grief looks like when it has the budget of an empire.`,
  },
];

// Verify constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  WARNING: P${i + 1} exceeds 500 char limit!`);
  if (words > 100) console.warn(`  WARNING: P${i + 1} exceeds 100 word limit!`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error("ABORT: Total character count outside acceptable range!");
  process.exit(1);
}

// Update only the paragraphs field
const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "taj-mahal",
      langStoryId: "en#shah-jahans-tears",
    },
    UpdateExpression: "SET paragraphs = :p, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":u": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("Update successful!");
console.log("Updated fields: paragraphs, updatedAt");
console.log(`New updatedAt: ${result.Attributes.updatedAt}`);
console.log(`Paragraph count: ${result.Attributes.paragraphs.length}`);
console.log("\nFields NOT touched (preserved as-is):");
const preserved = Object.keys(result.Attributes).filter(
  (k) => k !== "paragraphs" && k !== "updatedAt"
);
console.log(preserved.join(", "));
