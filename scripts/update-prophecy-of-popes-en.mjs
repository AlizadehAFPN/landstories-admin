import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `There's a document that claims to name every pope who will ever live. It was supposedly written in the 1100s, contains 112 short Latin phrases — one for each pope — and ends with a prediction that the last pope will watch Rome burn. By most counts, Pope Francis was number 112. He died in April 2025. The Catholic Church elected another pope anyway. So either the prophecy was wrong, or we've miscounted — or something else entirely.`,
  },
  {
    text: `The prophecy is attributed to Saint Malachy, an Irish archbishop who traveled to Rome in 1139 and allegedly had a vision of every pope to come. But here's the catch — nobody heard about it for over 400 years. A Benedictine monk named Arnold Wion finally published it in 1595. Historians noticed something immediately: every prediction before 1595 matched its pope perfectly. Suspiciously perfectly. The entries after that year? Suddenly much harder to pin down.`,
  },
  {
    text: `Still, some of the later matches are hard to dismiss. Pius X, who led the Catholic Church from 1903 to 1914, was labeled "Ignis ardens" — burning fire — and he spent his whole papacy pushing back against modern ideas creeping into the Church. John Paul I was tagged "De medietate lunae" — of the half moon. He lasted just 33 days as pope in 1978, dying so suddenly that conspiracy theories still follow his name.`,
  },
  {
    text: `Then came the moment everyone had been dreading. In 2013, Pope Benedict XVI did something no pope had done in 600 years — he resigned. On Malachy's list, he was entry 111 out of 112. His phrase? "Gloria olivae" — glory of the olive. He'd chosen the name Benedict, and the Benedictine order has a branch called the Olivetans. Coincidence or prophecy, the match sent chills. Because entry 112 was the final one.`,
  },
  {
    text: `That last entry breaks the pattern. Instead of a short phrase, it's a full paragraph: "In the final persecution of the Holy Roman Church, there will sit Peter the Roman, who will feed his sheep through many tribulations. When these things are finished, the city of seven hills will be destroyed, and the terrible Judge will judge his people. The End." The city of seven hills is Rome. There is no entry 113.`,
  },
  {
    text: `When Argentine cardinal Jorge Bergoglio was elected and chose the name Francis — not Peter — believers scrambled. They noted his Italian roots and argued that as Bishop of Rome and successor to Saint Peter, he was "Peter the Roman" by default. They stretched, they recounted the list. Then Francis died in April 2025, and the cardinals filed into the Sistine Chapel and did what they've always done — chose another pope. Robert Prevost became Leo XIV. The list had run out. The Church had not.`,
  },
  {
    text: `And that might be the real lesson. The Prophecy of the Popes was probably written by a clever monk in the 1590s who faked the early entries and left the later ones vague enough to match anything. But for nearly five centuries, it made people count popes like a countdown clock. Every death, every election, every new white smoke from the Sistine Chapel gets filtered through Malachy's list. Prophecies don't need to be true to be powerful. They just need to ask a question you can't stop thinking about.`,
  },
];

const excerpt = `There's a document that claims to name every pope who will ever live. It was supposedly written in the 1100s, contains 112 short Latin phrases — one for each pope — and ends with a prediction that the last pope will watch Rome burn.`;

const subtitle = `A medieval list naming every pope — and we've already passed the last entry`;

const now = Math.floor(Date.now() / 1000);

const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "vatican-st-peters",
      langStoryId: "en#prophecy-of-the-popes",
    },
    UpdateExpression:
      "SET paragraphs = :p, excerpt = :e, subtitle = :s, readingTimeMinutes = :r, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": excerpt,
      ":s": subtitle,
      ":r": 3,
      ":u": now,
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("Update successful!");
console.log("Title:", result.Attributes?.title);
console.log("Subtitle:", result.Attributes?.subtitle);
console.log("Paragraphs:", result.Attributes?.paragraphs?.length);
console.log("Reading time:", result.Attributes?.readingTimeMinutes, "min");
console.log("Updated at:", result.Attributes?.updatedAt);
