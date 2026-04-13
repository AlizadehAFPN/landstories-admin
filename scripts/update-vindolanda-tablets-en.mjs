import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Spring, 1973. A British archaeologist named Robin Birley was digging through black, waterlogged mud at Vindolanda \u2014 a Roman military fort just south of Hadrian\u2019s Wall in northern England. He spotted thin slivers of wood in the muck and figured they were scrap from a carpenter\u2019s shop. Then he held one up to the light. There was writing on it \u2014 faint Latin words, inked onto birch wood thinner than a postcard. That sliver of wood was almost 1,900 years old. And it was about to make the dead speak.`,
  },
  {
    text: `What Birley had stumbled on was a time capsule. The fort had been rebuilt over decades starting around AD 85, and each rebuild buried the layer below it in wet, oxygen-free soil \u2014 the one condition where wood, leather, and ink survive. Over the following years, his son Andrew continued the dig. Together, they\u2019ve pulled more than 1,600 wooden tablets from the ground. Not carved declarations from emperors. Not grand speeches. Just soldiers, wives, and officers writing everyday notes to each other. And that\u2019s exactly what makes them extraordinary.`,
  },
  {
    text: `The most famous tablet is a birthday invitation. Claudia Severa, wife of an officer at a nearby fort, writes to her friend Sulpicia Lepidina at Vindolanda: \u201cI give you a warm invitation to make sure that you come to us, to make the day more enjoyable for me by your arrival.\u201d A scribe wrote most of the letter. But at the bottom, in her own shaky handwriting, Claudia added six words: \u201cI shall expect you, sister.\u201d Those six words are the oldest known Latin writing by a woman in the entire Roman world.`,
  },
  {
    text: `Then there\u2019s the letter from a soldier \u2014 probably a foreign recruit serving Rome\u2019s army \u2014 writing home to beg for supplies: \u201cI have sent you\u2026 pairs of socks, two pairs of sandals, and two pairs of underpants.\u201d That\u2019s right \u2014 this is the first recorded mention of underwear in Britain\u2019s entire history. Forget bronze armor and battle cries. This was a guy stuck on a freezing, rain-soaked frontier, asking his family for clean socks and underwear. That\u2019s not myth. That\u2019s Tuesday.`,
  },
  {
    text: `Other tablets are just as revealing. One is a plea: \u201cThe soldiers have no beer \u2014 please order some to be sent.\u201d Another is a troop report showing that of 752 soldiers assigned to one unit, only 296 were present and fit \u2014 the rest sick, wounded, or posted elsewhere. Then there\u2019s the intelligence note that dismisses the locals as \u201cBrittunculi\u201d \u2014 basically, \u201cthe pathetic little Britons\u201d \u2014 sneering that they don\u2019t even use real armor. It reads like a military text chain: all arrogance, zero respect.`,
  },
  {
    text: `Here\u2019s the thing that hits hardest. These weren\u2019t Romans from Rome. They were Batavians from what\u2019s now the Netherlands, Tungrians from Belgium, Gauls from France \u2014 soldiers drafted from conquered lands and shipped to a cold, gray island at the end of the known world. Their letters are full of small, desperate acts of connection: a mother mailing socks to her son, friends planning birthday parties, officers trading gossip. They missed their families. They complained about the weather. They counted the days.`,
  },
  {
    text: `People call the tablets \u201cthe Roman equivalent of emails,\u201d and honestly, that nails it. They\u2019re short, messy, full of abbreviations, and deeply personal. The excavations at Vindolanda keep going \u2014 Andrew Birley\u2019s team still pulls new tablets from the dirt every season. And every one of them says the same thing: the gap between us and the people who lived two thousand years ago is a lot smaller than we think. They needed warm clothes, cold beer, and someone to celebrate a birthday with. So do we.`,
  },
];

const excerpt = `Spring, 1973. A British archaeologist named Robin Birley was digging through black, waterlogged mud at Vindolanda \u2014 a Roman military fort just south of Hadrian\u2019s Wall in northern England.`;

async function main() {
  const result = await docClient.send(
    new UpdateCommand({
      TableName: "Story",
      Key: {
        siteId: "hadrians-wall",
        langStoryId: "en#vindolanda-tablets",
      },
      UpdateExpression:
        "SET paragraphs = :p, excerpt = :e, updatedAt = :u, readingTimeMinutes = :r",
      ExpressionAttributeValues: {
        ":p": paragraphs,
        ":e": excerpt,
        ":u": Math.floor(Date.now() / 1000),
        ":r": 4,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  console.log("Update successful!");
  console.log("Title:", result.Attributes.title);
  console.log("Paragraphs count:", result.Attributes.paragraphs.length);
  console.log("Excerpt:", result.Attributes.excerpt);
  console.log("ReadingTime:", result.Attributes.readingTimeMinutes, "min");

  // Print each paragraph with character count
  result.Attributes.paragraphs.forEach((p, i) => {
    const words = p.text.split(/\s+/).length;
    console.log(
      `\nParagraph ${i + 1} (${p.text.length} chars, ${words} words):`
    );
    console.log(p.text);
  });
}

main().catch(console.error);
