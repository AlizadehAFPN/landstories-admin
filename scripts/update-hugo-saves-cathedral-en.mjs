import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `By the 1820s, Notre-Dame was dying. The cathedral that had towered over Paris for six centuries was crumbling, and nobody seemed to care. During the French Revolution, mobs had smashed its stained glass, beheaded 28 stone statues of biblical kings \u2014 mistaking them for French monarchs \u2014 and melted the great bells into cannonballs. They even renamed it the \u201CTemple of Reason\u201D in their war on the Catholic Church. When Napoleon crowned himself emperor inside in 1804, workers had to hang tapestries just to cover up the wreckage.`
  },
  {
    text: `And now it was about to get worse. City officials weren\u2019t debating how to fix Notre-Dame \u2014 they were debating when to knock it down. Across France, medieval buildings were being torn apart for materials or simply demolished as embarrassing leftovers from the \u201CDark Ages.\u201D One of the greatest cathedrals ever built was on the chopping block, and almost nobody was fighting to save it.`
  },
  {
    text: `Then a 29-year-old novelist decided to pick a fight with the wrecking ball. Victor Hugo was already one of the most famous writers in France, and he was furious. He watched medieval buildings disappear block by block and knew that speeches and petitions wouldn\u2019t save them. So he tried something nobody had done before \u2014 he wrote a novel designed to make an entire country fall in love with a building.`
  },
  {
    text: `In 1831, Hugo published \u201CNotre-Dame de Paris\u201D \u2014 you probably know it as \u201CThe Hunchback of Notre-Dame.\u201D It tells the story of Quasimodo, a deaf, lonely bell-ringer living in the cathedral\u2019s towers, and Esmeralda, the dancer he loves from the shadows. But the real star of the book isn\u2019t either of them \u2014 it\u2019s the building itself. Hugo wrote whole chapters describing the stonework, the rose windows, the flying buttresses, making readers feel like the cathedral was alive and breathing.`
  },
  {
    text: `The book exploded. Suddenly everyone in France was talking about Notre-Dame \u2014 not as some crumbling eyesore but as a national treasure. People who had never stepped foot inside the cathedral felt like they knew every gargoyle by name. The demolition talk died overnight. In 1844, the government launched a massive restoration led by architect Eug\u00E8ne Viollet-le-Duc, who spent two decades rebuilding the spire, adding the famous gargoyles, and restoring much of what the world now pictures when it thinks of Notre-Dame.`
  },
  {
    text: `Think about what Hugo actually pulled off. A single writer, armed with nothing but ink and imagination, saved one of the most iconic buildings on Earth. He didn\u2019t pass a law or raise an army. He invented a fictional hunchback \u2014 and made a whole nation see beauty in stones they were ready to demolish. Sometimes the pen really is mightier than the wrecking ball.`
  },
  {
    text: `When Notre-Dame caught fire on April 15, 2019, nearly a billion people watched the livestream. Strangers stood on the banks of the Seine with tears running down their faces. And whether they knew it or not, they were all grieving something Victor Hugo had taught them to love almost two hundred years earlier. One story, told well enough, had made a building immortal.`
  }
];

const excerpt = "By the 1820s, Notre-Dame was dying. The cathedral that had towered over Paris for six centuries was crumbling, and nobody seemed to care.";

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "notre-dame-de-paris",
    langStoryId: "en#hugo-saves-cathedral",
  },
  UpdateExpression: "SET #p = :p, #e = :e, #u = :u",
  ExpressionAttributeNames: {
    "#p": "paragraphs",
    "#e": "excerpt",
    "#u": "updatedAt",
  },
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await ddb.send(cmd);
  console.log("Updated successfully!");
  console.log(`Paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`Excerpt: ${result.Attributes.excerpt}`);
  console.log(`Updated at: ${result.Attributes.updatedAt}`);

  // Print each paragraph with char count for verification
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`\n--- Paragraph ${i + 1} (${p.text.length} chars) ---`);
    console.log(p.text);
  });
} catch (err) {
  console.error("Error:", err);
  process.exit(1);
}
