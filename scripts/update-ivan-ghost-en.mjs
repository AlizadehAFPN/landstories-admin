import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `Ivan the Terrible wasn't born a monster. He became Russia's first-ever tsar in 1547, and for years he was actually impressive — expanding the empire east into Siberia, modernizing the legal code, building St. Basil's Cathedral in Moscow. Then his first wife Anastasia died in 1560, and Ivan became convinced that the boyars — Russia's powerful noble families — had poisoned her. Something inside him broke. What came next would define his name forever.`,
  },
  {
    text: `He created a private army called the oprichnina — thousands of black-robed horsemen who strapped severed dog heads to their saddles to show they'd "sniff out" traitors. From inside the Kremlin, Ivan unleashed years of terror. He had the head of the Russian Orthodox Church strangled. He ordered the destruction of Novgorod, an entire city in northern Russia, where thousands died over five brutal weeks. No one was safe. Not priests, not nobles, not even his own blood.`,
  },
  {
    text: `In November 1581, Ivan struck his own son and heir — also named Ivan — with an iron-tipped staff during an argument. The blow killed him. That scene was later captured in one of the most haunting paintings in Russian art: a father with wild eyes, cradling his dying son, the horror of what he'd done crashing over him. Ivan spent his last three years swinging between bursts of cruelty and desperate prayers, crawling on his knees through the Kremlin's churches.`,
  },
  {
    text: `On March 28, 1584, Ivan sat down to play chess. He never finished the game. They found his body frozen stiff, his face locked in an expression that witnesses called "terrible to behold."`,
  },
  {
    text: `And then the haunting began.`,
  },
  {
    text: `For over four hundred years, people in the Kremlin have reported the same thing: a tall figure in monk's robes, drifting along the fortress walls at night. When Napoleon's army occupied Moscow in 1812, French soldiers swore they felt an icy presence in the royal chambers — candles dying on their own, their breath turning to fog in September. During the Soviet era, Kremlin workers quietly traded stories about footsteps in sealed hallways and doors swinging open in rooms locked for decades.`,
  },
  {
    text: `The ghost is said to appear most often in November — the same month Ivan killed his son. Those who've felt it describe a sudden, crushing wave of grief and rage, like walking into a wall of emotion. Some talk about a cold hand gripping their shoulder and a voice whispering words in a version of Russian so old that no one alive can understand it.`,
  },
  {
    text: `You don't have to believe in ghosts to understand this: Ivan the Terrible left so much pain inside those walls that even now, more than four centuries later, you can't walk the Kremlin's corridors without the feeling that someone is standing right behind you. Some places don't just remember history — they refuse to let it leave.`,
  },
];

const excerpt = paragraphs[0].text;

const result = await ddb.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "moscow-kremlin",
      langStoryId: "en#ivan-terrible-ghost",
    },
    UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": excerpt,
      ":u": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("Updated successfully!");
console.log("Paragraphs count:", result.Attributes.paragraphs.length);
console.log("Excerpt (first 80 chars):", result.Attributes.excerpt.substring(0, 80) + "...");
console.log("updatedAt:", result.Attributes.updatedAt);

// Verify constraints
for (let i = 0; i < result.Attributes.paragraphs.length; i++) {
  const p = result.Attributes.paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  const status = chars > 500 || words > 100 ? "OVER LIMIT" : "OK";
  console.log(`  P${i + 1}: ${chars} chars, ${words} words [${status}]`);
}
const totalChars = result.Attributes.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
console.log(`  Total: ${totalChars} chars`);
