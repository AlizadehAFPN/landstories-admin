import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `When King Minos wanted the throne of Crete, he needed more than ambition \u2014 he needed proof the gods were on his side. So he prayed to Poseidon, the god of the sea, and made a deal: send me a sign, and I'll sacrifice whatever you send. Poseidon answered. A white bull rose from the waves, so perfect it didn't look real. The people of Crete watched it walk out of the ocean and knew \u2014 this man was chosen.`,
  },
  {
    text: `But Minos looked at that bull and couldn't do it. It was too beautiful to kill. So he swapped it out \u2014 sacrificed an ordinary bull instead and kept the divine one for himself. He figured Poseidon wouldn't notice, or wouldn't care. He was catastrophically wrong. The god's punishment didn't come as a storm or a plague. It came as madness \u2014 a curse on Minos's wife, Queen Pasiphae, that twisted her mind into an obsession with the white bull itself.`,
  },
  {
    text: `Desperate and out of her mind, Pasiphae turned to the only person clever enough to help: Daedalus, a genius inventor from Athens living at the Cretan court. What he built for her was disturbing \u2014 a hollow wooden cow covered in real hide, so realistic it fooled the bull. From that encounter, something impossible was born: a creature with a human body and the head of a bull. They called him the Minotaur. His real name was Asterion \u2014 "the starry one." Even monsters get beautiful names.`,
  },
  {
    text: `Pasiphae tried to raise him like any child. For a while, it almost worked. But as the Minotaur grew, so did his hunger \u2014 and it wasn't for bread or meat. He craved human flesh. When the killings started, Minos faced a nightmare of his own making. He couldn't destroy the creature \u2014 it was his wife's son. But he couldn't let it roam free. So he turned again to Daedalus and gave him the hardest job of his life: build a cage no one could ever escape.`,
  },
  {
    text: `Daedalus didn't build a cage. He built something worse. Beneath the palace of Knossos, he designed the Labyrinth \u2014 a maze so twisted that anyone who walked in would never walk out. Hallways looped back on themselves. Stairways dropped into darkness and climbed right back up. Dead ends everywhere. And at the very center, alone in the dark, the Minotaur paced and raged and waited to be fed.`,
  },
  {
    text: `The food came from Athens. When Minos's son Androgeos was killed there \u2014 caught up in Athenian politics and possibly murdered out of jealousy \u2014 Minos brought his navy to Athens and crushed them. His terms for peace were horrifying: every nine years, Athens had to send seven young men and seven young women into the Labyrinth. No weapons, no map, no way out. Just the Minotaur in the dark.`,
  },
  {
    text: `For generations, Athenian parents lived with the worst fear imaginable: that their child would be among the fourteen sent to die in the maze. All because one king on a faraway island broke a promise to a god. The ruins of Knossos still stand \u2014 hundreds of rooms, winding corridors, dead ends. Some say the palace inspired the legend. Others say the legend came first. Either way, the message has survived three thousand years: when you make a deal with the gods, you keep it.`,
  },
];

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const charCount = p.text.length;
  const wordCount = p.text.split(/\s+/).length;
  totalChars += charCount;
  console.log(`P${i + 1}: ${charCount} chars, ${wordCount} words`);
  if (charCount > 500) console.error(`  ⚠ OVER 500 chars!`);
  if (wordCount > 100) console.error(`  ⚠ OVER 100 words!`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400-3600)\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error("Total character count out of range! Aborting.");
  process.exit(1);
}

const now = Math.floor(Date.now() / 1000);

const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "knossos",
      langStoryId: "en#minotaur-labyrinth",
    },
    UpdateExpression:
      "SET paragraphs = :p, excerpt = :e, moralOrLesson = :m, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": "When King Minos wanted the throne of Crete, he needed more than ambition \u2014 he needed proof the gods were on his side.",
      ":m": "You can't hide from the consequences of a broken promise. Minos tried to cheat a god and created a monster that consumed his kingdom's honor \u2014 and other people's children.",
      ":u": now,
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("Updated successfully!");
console.log("Title:", result.Attributes.title);
console.log("Paragraphs:", result.Attributes.paragraphs.length);
console.log("Excerpt:", result.Attributes.excerpt);
console.log("Moral:", result.Attributes.moralOrLesson);
console.log("UpdatedAt:", result.Attributes.updatedAt);
