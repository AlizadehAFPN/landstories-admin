import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: "The Ninth Legion \u2014 Legio IX Hispana \u2014 was no ordinary army unit. These soldiers fought under Julius Caesar during his conquest of Gaul (modern France) in the 50s BC. They followed him into the civil war that destroyed the Republic and gave birth to the Empire. By AD 43, when Emperor Claudius sent them to invade Britain, the Ninth had been fighting for over a century. Five thousand hardened veterans, stationed at York \u2014 northern England\u2019s military capital \u2014 holding Rome\u2019s most dangerous frontier.",
  },
  {
    text: "And then they vanished.",
  },
  {
    text: "The last proof the Ninth existed is an inscription at York, dated AD 108. After that \u2014 nothing. No transfer orders, no gravestones, no mention in the obsessively detailed Roman military records. When Emperor Hadrian showed up in Britain in AD 122 to build his Wall, the Ninth was already gone. A new legion was sent from Germany to fill their spot. Rome tracked every unit across three continents. For an entire legion to vanish from the paperwork? Something went very, very wrong.",
  },
  {
    text: "The most famous theory is the most terrifying. The Ninth marched north into Caledonia \u2014 modern Scotland \u2014 to crush a rebellion by the Picts, fierce warriors the Romans called \u201cthe Painted People.\u201d Imagine five thousand men entering the Highlands: fog-soaked mountains, dense forests, endless bogs \u2014 a nightmare for soldiers trained to fight on flat ground. The Picts knew every ridge and river, ambushed the column, cut the supply lines, and destroyed them. Five thousand men swallowed by the mist.",
  },
  {
    text: "But here\u2019s the twist. In the 1950s, archaeologists found tiles stamped with the Ninth\u2019s mark at a base in Nijmegen, the Netherlands \u2014 proof that part of the legion reached mainland Europe after AD 108. Some historians think the Ninth wasn\u2019t destroyed in Scotland at all but transferred and wiped out in a different war entirely \u2014 maybe the brutal Jewish revolt in Judaea around AD 132, where Rome lost whole units. One mystery just replaces another. And the silence in the records stays just as loud.",
  },
  {
    text: "This unsolved disappearance became a British legend. Rosemary Sutcliff turned it into \u201cThe Eagle of the Ninth\u201d in 1954 \u2014 a novel about a young Roman officer crossing Hadrian\u2019s Wall to find his father\u2019s lost legion. It was required reading for generations of British kids and later inspired the 2011 film \u201cThe Eagle.\u201d Sutcliff\u2019s version \u2014 the Ninth making a last stand against Pictish warriors in the Highlands \u2014 is the story most people carry in their heads, whether they know the source or not.",
  },
  {
    text: "We may never know what happened. The evidence is just incomplete enough to keep everyone guessing and just complete enough that nobody can look away. But this much is certain: Hadrian built his Wall because something went catastrophically wrong in the north. Whether the Ninth lies under Scottish heather or Middle Eastern sand, their disappearance drew that line across Britain forever. The most powerful empire the ancient world ever produced lost five thousand men \u2014 and never found out how.",
  },
];

// Validate constraints before pushing
let totalChars = 0;
let allValid = true;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  const charOk = chars <= 500 ? "\u2705" : "\u274c";
  const wordOk = words <= 100 ? "\u2705" : "\u274c";
  console.log(`P${i + 1}: ${chars} chars ${charOk}  ${words} words ${wordOk}`);
  if (chars > 500 || words > 100) allValid = false;
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (\u00b120% = 2400\u20133600)`);

if (!allValid) {
  console.error("\n\u274c Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}
if (totalChars < 2400 || totalChars > 3600) {
  console.error(`\n\u274c Total chars ${totalChars} outside acceptable range. Aborting.`);
  process.exit(1);
}

console.log("\n\u2705 All constraints passed. Pushing to DynamoDB...\n");

// Only update English-specific content fields — nothing structural
const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "hadrians-wall",
      langStoryId: "en#lost-ninth-legion",
    },
    UpdateExpression:
      "SET #p = :paragraphs, #ex = :excerpt, #mol = :moral, #rt = :rt, #ua = :ua",
    ExpressionAttributeNames: {
      "#p": "paragraphs",
      "#ex": "excerpt",
      "#mol": "moralOrLesson",
      "#rt": "readingTimeMinutes",
      "#ua": "updatedAt",
    },
    ExpressionAttributeValues: {
      ":paragraphs": paragraphs,
      ":excerpt":
        "The Ninth Legion \u2014 Legio IX Hispana \u2014 was no ordinary army unit. These soldiers fought under Julius Caesar during his conquest of Gaul.",
      ":moral":
        "Even the greatest empires have limits. Sometimes five thousand men march beyond those limits \u2014 and the only thing that comes back is silence.",
      ":rt": 3,
      ":ua": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("\u2705 Story updated successfully!");
console.log(`   Title: ${result.Attributes.title}`);
console.log(`   Paragraphs: ${result.Attributes.paragraphs.length}`);
console.log(`   Reading time: ${result.Attributes.readingTimeMinutes} min`);
console.log(`   Updated at: ${new Date(result.Attributes.updatedAt * 1000).toISOString()}`);
