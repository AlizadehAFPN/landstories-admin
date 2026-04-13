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
    text: `In the first century AD, Ephesus was one of the biggest cities in the Roman Empire — and almost everything about it ran on one thing: the goddess Artemis. Her temple was one of the Seven Wonders of the Ancient World. Pilgrims poured in from across the Mediterranean to worship there. Merchants sold silver shrines, priests collected offerings, and the whole city hummed with the business of belief. Then a man named Paul showed up and started telling people their gods weren't real.`,
  },
  {
    text: `Paul wasn't just passing through. He stayed in Ephesus for nearly three years, from around 53 to 57 AD, and he was devastatingly effective. Converts piled up. People stopped buying silver statues. They stopped visiting the temple. For the true believers in Artemis, this was annoying. For the people who made their living selling her image, it was an emergency.`,
  },
  {
    text: `A silversmith named Demetrius decided enough was enough. He made miniature shrines of Artemis — a solid business until Paul came along. He called a meeting of every craftsman in the trade and laid it out: this outsider is destroying our way of life. He's telling people that handmade gods are no gods at all. And if that idea catches on, we're finished. Our livelihoods, our temple, our city — all of it.`,
  },
  {
    text: `It worked. The craftsmen lost it. They grabbed two of Paul's traveling companions — Gaius and Aristarchus — and dragged them into the Great Theater of Ephesus, a massive amphitheater carved into the hillside that could hold 25,000 people. The place filled up fast, and the crowd started chanting one phrase over and over: "Great is Artemis of the Ephesians!" They kept it up for two straight hours.`,
  },
  {
    text: `Paul wanted to walk into that theater and face the mob himself. His own people wouldn't let him. City officials who knew him sent urgent word: do not go in there. They were right — this was a crowd that had moved past arguments into something darker. Most of the people in the theater didn't even know why they were there. They just knew they were angry.`,
  },
  {
    text: `In the end, it was a bureaucrat who saved the day. The city clerk — the highest local official in Ephesus — stepped forward and gave the most practical speech in the Bible. If Artemis is really a goddess, he told them, she doesn't need a mob to protect her. And if Rome hears about this little riot, they'll strip our city of its privileges. Take your complaints to court. The crowd went home.`,
  },
  {
    text: `Twenty-five thousand people screaming for a goddess whose temple is now rubble. A silversmith defending his paycheck in the name of religion. A bureaucrat who understood that empires don't tolerate chaos. And Paul — the man at the center of it all — would go on to shape the faith that replaced everything they were fighting for. That theater still stands in Ephesus today. You can sit in those same seats and feel it — the echo of thousands of voices, chanting for a world that was already slipping away.`,
  },
];

const excerpt = paragraphs[0].text;

const params = {
  TableName: "Story",
  Key: {
    siteId: "ephesus",
    langStoryId: "en#saint-paul-riot",
  },
  UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": Math.floor(Date.now() / 1000),
  },
  ReturnValues: "ALL_NEW",
};

try {
  const result = await docClient.send(new UpdateCommand(params));
  console.log("Updated successfully!");
  console.log("Title:", result.Attributes.title);
  console.log("Paragraphs:", result.Attributes.paragraphs.length);
  console.log("Excerpt preview:", result.Attributes.excerpt.substring(0, 80) + "...");
} catch (err) {
  console.error("Update failed:", err);
  process.exit(1);
}
