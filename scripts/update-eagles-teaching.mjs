import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

async function main() {
  // 1. Get the current item
  const { Item } = await doc.send(new GetCommand({
    TableName: "Story",
    Key: { siteId: "alamut-castle", langStoryId: "en#eagles-teaching" },
  }));

  if (!Item) {
    console.error("Item not found!");
    process.exit(1);
  }

  console.log("Original item found. Updating text fields only...\n");

  // 2. Update ONLY the text/content fields — preserve everything else
  Item.subtitle = "How an eagle chose the rock, a name foretold its destiny, and a woman on a mule rediscovered it all";

  Item.moralOrLesson = "The greatest lessons don't always come from scholars. Sometimes they come from an eagle choosing where to land, a name carrying the date of its own destiny, and a valley hidden so well it took the world seven centuries to find it again.";

  Item.readingTimeMinutes = 2;
  Item.updatedAt = Math.floor(Date.now() / 1000);

  Item.paragraphs = [
    {
      text: "Around the year 840, a ruler named Wahsudan was hunting in the mountains south of the Caspian Sea \u2014 a region of Iran so rugged that even Arab armies couldn\u2019t conquer it. Then he saw something that changed everything. A great eagle dropped from the sky and landed on a blade of rock rising two hundred meters above the valley floor. Wahsudan looked at that rock \u2014 sheer cliffs on three sides, one narrow approach, a river below \u2014 and understood. The bird had just shown him where to build an unbreakable fortress.",
    },
    {
      text: "He built it. And he named it after the lesson. In the local Daylami dialect, \u2018aluh\u2019 meant eagle and \u2018amukht\u2019 meant teaching. Aluh amukht \u2014 the Eagle\u2019s Teaching. Say it fast, a few hundred times over a few hundred years, and it becomes one word: Alamut. The fortress sat on its rock for two and a half centuries, passing through the hands of local rulers \u2014 a perfect stronghold in a hidden valley, known to almost no one.",
    },
    {
      text: "Then, in 1090, everything changed. A fugitive preacher named Hassan-i Sabbah \u2014 leader of a revolutionary branch of Shia Islam called the Ismailis \u2014 slipped into the valley and captured the castle without spilling a drop of blood. He turned Alamut into the headquarters of a movement that would terrify the medieval world for nearly two centuries. But that\u2019s not the strangest part of the story.",
    },
    {
      text: "In Islamic numerology, every Arabic letter carries a numerical value. Medieval scholars discovered that when you add up the letters of the old Daylami name \u2014 Aluh amukht \u2014 they total 483. The year Hassan captured Alamut? 483 in the Islamic calendar. The name Wahsudan gave his castle two hundred and fifty years before Hassan was born contained the exact date of the event that would make it legendary. Whether that\u2019s coincidence or destiny depends on what you believe. The Ismailis had no doubts.",
    },
    {
      text: "In 1256, the Mongols came. They tore down the walls, burned the legendary library, and massacred the garrison. The valley \u2014 already cut off from the world by mountains and a gorge that floods shut half the year \u2014 slipped back into silence. For nearly seven centuries, Alamut existed only as a legend: the setting for Marco Polo\u2019s wild tales of drugged assassins and paradise gardens, a name used by European writers who had never seen the place and had no clue where it actually was.",
    },
    {
      text: "In 1930, a thirty-seven-year-old Englishwoman named Freya Stark set out from Baghdad on the back of a mule \u2014 camp bed, mosquito net, and a determination to find the Valley of the Assassins. She was a self-taught mapmaker who\u2019d already explored parts of the Middle East most European men were afraid to enter. She crossed mountain passes half-sick with malaria, relying on local guides who each gave different names for the same hill. When she reached the rock, she discovered the official maps were dead wrong \u2014 and fixed them herself. Her book brought Alamut back to the world.",
    },
    {
      text: "Today, about thirty percent of the original fortress survives on its rock above the valley. Visitors climb two hundred meters of steep stairs to find fragments of walls, ruined workshops, and a water channel carved into the cliff by Hassan\u2019s engineers that still works after nearly a thousand years. But the real thing you notice, standing on the summit, isn\u2019t the ruins. It\u2019s the golden eagles. They\u2019re still there, riding the wind above the peaks, circling the same valley Wahsudan hunted twelve centuries ago. The eagle chose well. The lesson endures.",
    },
  ];

  // 3. Put the updated item back (full replace, all non-text fields preserved)
  await doc.send(new PutCommand({
    TableName: "Story",
    Item,
    ReturnConsumedCapacity: "TOTAL",
  }));

  console.log("Updated successfully!\n");

  // 4. Verify by reading back
  const { Item: verify } = await doc.send(new GetCommand({
    TableName: "Story",
    Key: { siteId: "alamut-castle", langStoryId: "en#eagles-teaching" },
  }));

  console.log(`title: ${verify.title}`);
  console.log(`subtitle: ${verify.subtitle}`);
  console.log(`moralOrLesson: ${verify.moralOrLesson}`);
  console.log(`paragraphs: ${verify.paragraphs.length}`);
  console.log(`readingTimeMinutes: ${verify.readingTimeMinutes}`);
  console.log(`updatedAt: ${verify.updatedAt}`);
  console.log(`\n--- Non-text fields preserved ---`);
  console.log(`siteId: ${verify.siteId}`);
  console.log(`storyId: ${verify.storyId}`);
  console.log(`langStoryId: ${verify.langStoryId}`);
  console.log(`lang: ${verify.lang}`);
  console.log(`icon: ${verify.icon}`);
  console.log(`tier: ${verify.tier}`);
  console.log(`storyCategory: ${verify.storyCategory}`);
  console.log(`era: ${verify.era}`);
  console.log(`isFree: ${verify.isFree}`);
  console.log(`hasAudio: ${verify.hasAudio}`);
  console.log(`disabled: ${verify.disabled}`);
  console.log(`coordinates: ${JSON.stringify(verify.coordinates)}`);
  console.log(`characters: ${JSON.stringify(verify.characters)}`);
  console.log(`excerpt: ${verify.excerpt}`);
  console.log(`source: ${verify.source}`);

  console.log(`\n--- Paragraphs ---`);
  verify.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    console.log(`\nP${i + 1} (${chars} chars, ${words} words):`);
    console.log(p.text);
  });

  const totalChars = verify.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`\nTotal text characters: ${totalChars}`);
}

main().catch(console.error);
