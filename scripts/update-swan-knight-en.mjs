import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: "The legend goes back to the Middle Ages, but the version that changed everything came in 1850 \u2014 when German composer Richard Wagner turned it into one of his greatest operas. The story is set around 933 AD. A young noblewoman named Elsa of Brabant is accused of murdering her own brother. The charge is a lie \u2014 her brother was actually turned into a swan by a sorceress named Ortrud. But nobody believes Elsa. She has no champion to fight for her in trial by combat. She\u2019s about to die.",
  },
  {
    text: "Then a boat appears on the river. Not pulled by oars or wind \u2014 pulled by a single white swan. Standing in the boat is a knight in silver armor, glowing like something out of another world. He steps ashore, declares himself Elsa\u2019s champion, and wins the fight. He marries her. But there\u2019s one condition, and it\u2019s absolute: she can never ask his name or where he comes from. The second she does, he\u2019s gone forever.",
  },
  {
    text: "For a while, it works. The knight rules Brabant with wisdom and loves Elsa deeply. But Ortrud isn\u2019t done. Night after night, she drips poison into Elsa\u2019s ear: Who is this man you married? What kind of wife doesn\u2019t even know her husband\u2019s name? The doubt starts small but it\u2019s relentless. And on their wedding night, Elsa breaks. She asks the one question she was never supposed to ask: Who are you? Where do you come from?",
  },
  {
    text: "The knight\u2019s face fills with sorrow. His name is Lohengrin \u2014 son of Parsifal, a Knight of the Holy Grail, the most sacred order in Christian legend. The Grail sent him to protect Elsa, but its power runs on one thing: total faith. The moment you doubt, the magic dies. Lohengrin calls the swan-boat back. He prays over the swan, which transforms into Elsa\u2019s lost brother, alive and whole. Then he sails away forever. Elsa watches him vanish and dies of grief.",
  },
  {
    text: "In 1861, a fifteen-year-old Bavarian prince named Ludwig sat in a Munich theater and watched Wagner\u2019s Lohengrin for the first time. It wrecked him. He sobbed through the performance and later wrote it was the defining experience of his youth. But Ludwig didn\u2019t just admire Lohengrin \u2014 he became Lohengrin. He too was strange, beautiful, and impossible to explain. He too put impossible conditions on love. He too would rather vanish than let the world strip him bare.",
  },
  {
    text: "Ludwig became King of Bavaria in 1864 at just eighteen. Then the legend moved from his imagination into stone. He built Neuschwanstein \u2014 a fairy-tale castle perched on a cliff in the Alps \u2014 and filled it with swans. Painted on walls, carved into furniture, shaped into fountains. The name itself means \u201CNew Swan Stone.\u201D This wasn\u2019t decoration. It was a declaration: the Swan Knight reborn, asking only to be left alone with beauty, ready to vanish the moment the world demanded answers.",
  },
  {
    text: "And the world did demand answers. In 1886, Ludwig\u2019s own government declared him insane and removed him from power. Days later, he was found dead in the shallow waters of Lake Starnberg, drowned under circumstances nobody has ever fully explained. Like Lohengrin, he vanished \u2014 leaving behind a white castle on a mountaintop, and a question that still has no answer.",
  },
];

const excerpt =
  "The legend goes back to the Middle Ages, but the version that changed everything came in 1850 \u2014 when German composer Richard Wagner turned it into one of his greatest operas.";

const moralOrLesson =
  "Faith says don\u2019t ask certain questions. But human nature says you have to. The tragedy isn\u2019t in the asking \u2014 it\u2019s that love built on mystery can never survive the truth.";

async function main() {
  const result = await docClient.send(
    new UpdateCommand({
      TableName: "Story",
      Key: {
        siteId: "neuschwanstein-castle",
        langStoryId: "en#swan-knight-lohengrin",
      },
      UpdateExpression:
        "SET paragraphs = :paragraphs, excerpt = :excerpt, moralOrLesson = :moral, updatedAt = :ts",
      ExpressionAttributeValues: {
        ":paragraphs": paragraphs,
        ":excerpt": excerpt,
        ":moral": moralOrLesson,
        ":ts": Math.floor(Date.now() / 1000),
      },
      ReturnValues: "ALL_NEW",
    })
  );

  console.log("Update successful!");
  console.log("Title:", result.Attributes.title);
  console.log("Paragraphs:", result.Attributes.paragraphs.length);
  console.log("\n--- UPDATED STORY ---\n");
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`[P${i + 1}] (${p.text.length} chars, ${p.text.split(/\s+/).length} words)`);
    console.log(p.text);
    console.log();
  });
  console.log("Excerpt:", result.Attributes.excerpt);
  console.log("\nMoral:", result.Attributes.moralOrLesson);
}

main().catch(console.error);
