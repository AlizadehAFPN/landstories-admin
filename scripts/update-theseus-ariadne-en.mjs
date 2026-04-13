import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const paragraphs = [
  {
    text: `Every nine years, Athens owed an impossible debt. Fourteen young people \u2014 seven boys, seven girls \u2014 sent to Crete to be fed to a monster. The Minotaur, half-man and half-bull, lived inside a maze called the Labyrinth beneath the palace of Knossos. No one who went in ever came out. This was the price King Minos demanded after defeating Athens in war. By the third tribute, a prince named Theseus had had enough. He told his father King Aegeus: I\u2019ll go myself. And I\u2019ll kill it.`,
  },
  {
    text: `His father begged him not to go. But Theseus wouldn\u2019t back down. Before the ship left, Aegeus made him promise one thing. The ship would sail under black sails \u2014 the color of mourning. If Theseus survived, he had to swap them for white sails on the way home, so his father could spot the good news from the clifftops before the ship even reached the harbor. Theseus swore he would. Then he sailed for Crete.`,
  },
  {
    text: `When the Athenian captives arrived in Crete, they were paraded before King Minos and his court \u2014 walking dead, as far as anyone cared. But someone in the crowd couldn\u2019t stop staring. Ariadne, the king\u2019s own daughter, saw Theseus and fell for him on the spot. He stood tall, unbroken, defiant even in chains. That night, she snuck down to his cell with two gifts that would change everything: a sharp sword and a ball of thread.`,
  },
  {
    text: `Her plan was dead simple. \u201CTie the thread to the entrance of the Labyrinth,\u201D she told him. \u201CUnwind it as you go deeper. When you\u2019ve killed the beast, follow the thread back out.\u201D Nobody had ever thought of it \u2014 or if they had, nobody had loved a prisoner enough to help. In return, Theseus swore he\u2019d take her to Athens and make her his queen. She was betting everything on a stranger. He gave her his word.`,
  },
  {
    text: `At dawn, Theseus tied Ariadne\u2019s thread to the entrance and walked into total darkness. Dead ends, false turns, corridors that looped back on themselves \u2014 the maze was designed to break you. He kept going, the thread trailing behind him, his only way back. In the deepest chamber, he found the Minotaur. The fight was brutal. The beast charged, horns first, roaring. But Theseus fought for every kid Athens had ever sent here to die. He drove the sword through its heart. Then \u2014 silence.`,
  },
  {
    text: `He followed the thread back through the darkness and stepped into daylight where Ariadne was waiting. They freed the other captives, ran to the harbor, and sailed for Athens. Ariadne believed she was heading toward her new life as queen. She was wrong. On the island of Naxos, Theseus left her behind. Whether he forgot, lost interest, or was ordered by the gods \u2014 nobody knows. She woke up alone on a beach, watching his ship shrink into nothing on the horizon.`,
  },
  {
    text: `But the story wasn\u2019t finished with Ariadne. The god Dionysus found her on that beach, fell in love, and made her his immortal wife. He took the crown from her head and flung it into the sky, where it became a constellation you can still see on summer nights \u2014 Corona Borealis, the Northern Crown. The girl abandoned by a hero ended up married to a god.`,
  },
  {
    text: `Theseus, meanwhile, was about to pay for his carelessness. In the rush of victory \u2014 or weighed down by guilt over Ariadne \u2014 he forgot to change the black sails to white. His father Aegeus was watching from the cliffs of Cape Sounion, scanning the horizon for a flash of white. Instead, he saw black. He believed his son was dead. The old king threw himself into the sea \u2014 which still carries his name: the Aegean. The hero who killed the monster came home to find he\u2019d destroyed his own father.`,
  },
];

const excerpt = `Every nine years, Athens owed an impossible debt. Fourteen young people \u2014 seven boys, seven girls \u2014 sent to Crete to be fed to a monster.`;

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const charCount = text.length;
  const wordCount = text.split(/\s+/).length;
  totalChars += charCount;
  console.log(`P${i + 1}: ${charCount} chars, ${wordCount} words${charCount > 500 ? " ⚠️ OVER 500 CHARS" : ""} ${wordCount > 100 ? " ⚠️ OVER 100 WORDS" : ""}`);
}
console.log(`\nTotal: ${totalChars} chars (target ~3000, range 2400-3600)`);
console.log(`Paragraphs: ${paragraphs.length} (target 6-8)\n`);

const dynamoParagraphs = paragraphs.map((p) => ({
  M: { text: { S: p.text } },
}));

const now = Math.floor(Date.now() / 1000);

const command = new UpdateItemCommand({
  TableName: "Story",
  Key: {
    siteId: { S: "knossos" },
    langStoryId: { S: "en#theseus-ariadne" },
  },
  UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": { L: dynamoParagraphs },
    ":e": { S: excerpt },
    ":u": { N: String(now) },
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await client.send(command);
  console.log("✅ Story updated successfully!");
  console.log(`Updated fields: paragraphs (${paragraphs.length} paragraphs), excerpt, updatedAt (${now})`);
  console.log(`Title (unchanged): ${result.Attributes.title.S}`);
  console.log(`Subtitle (unchanged): ${result.Attributes.subtitle.S}`);
  console.log(`MoralOrLesson (unchanged): ${result.Attributes.moralOrLesson.S}`);
} catch (err) {
  console.error("❌ Update failed:", err.message);
  process.exit(1);
}
