/**
 * Update the Temple Mount story (en) with Hebrew-tradition retelling.
 *
 * Usage: node scripts/update-temple-mount-en.mjs
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

// Load .env.local for AWS credentials
const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)=(.+)$/);
  if (match) process.env[match[1]] = match[2];
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";

const story = {
  siteId: "jerusalem-old-city",
  langStoryId: "en#temple-mount-three-faiths",
  storyId: "temple-mount-three-faiths",
  lang: "en",
  title: "The Stone That Remembers",
  subtitle:
    "One stone, three faiths, and three thousand years of prayer upon the mountain where creation began",
  excerpt:
    "It is told \u2014 and the telling itself is ancient \u2014 that beneath the golden dome that crowns Jerusalem lies a rough, pale slab of bedrock, rising from the mountain like a bone from the earth\u2019s own body.",
  icon: "\ud83d\udd4a\ufe0f",
  storyCategory: "prophets_pilgrims",
  era: "c. 1000 BC \u2013 present (three millennia of continuous sacred significance)",
  tier: "S",
  isFree: true,
  hasAudio: false,
  disabled: false,
  characters: [
    "King Solomon",
    "Abraham / Ibrahim",
    "Caliph Umar ibn al-Khattab",
    "Emperor Titus",
    "Caliph Abd al-Malik ibn Marwan",
    "Saladin (Salah ad-Din)",
  ],
  moralOrLesson:
    "The stone does not choose who kneels upon it. It endures beneath all prayers equally, in every tongue, for every name of God. Perhaps the children of Abraham \u2014 all of them \u2014 will one day remember that they are weeping upon the same rock, for the same mercy. It is not given to us to complete that work. But neither are we free to abandon it.",
  coordinates: { lat: 31.7777, lng: 35.2355 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 4,
  source:
    "Mishnah Yoma 5:2 (Foundation Stone dimensions); Josephus, The Jewish War (70 CE destruction); 1 Kings 6\u20138 (Solomon\u2019s Temple); Genesis 22 (Binding of Isaac); Quran 17:1 (Isra reference); Creswell, K.A.C., Early Muslim Architecture (Dome of the Rock); Ritmeyer, Leen, The Quest: Revealing the Temple Mount in Jerusalem; Grabar, Oleg, The Shape of the Holy; William of Tyre, Historia (Crusader accounts); Ibn al-Athir, The Complete History (Saladin\u2019s reconquest)",
  updatedAt: Math.floor(Date.now() / 1000),
  paragraphs: [
    {
      text: "It is told \u2014 and the telling itself is ancient \u2014 that beneath the golden dome that crowns Jerusalem lies a rough, pale slab of bedrock, eighteen meters long and thirteen wide, rising from the mountain like a bone from the earth\u2019s own body. The sages called it Even HaShetiya \u2014 the Foundation Stone. The Arabs named it al-Sakhra. And there are those who say that when God created the world, He cast this stone into the deep the way a builder sets a cornerstone, and from it the world unfolded like a garment.",
    },
    {
      text: "On this stone, Abraham bound his son. The Torah says Isaac; the Quran says Ismail. God said: Take your son, your only one, whom you love, and offer him up. And Abraham rose early and saddled his donkey and cleaved the wood. Three days they walked. The boy said: Father, here is the fire and the wood, but where is the lamb? And the father answered: God Himself will provide the lamb, my son. And they walked on together \u2014 and the silence between them was heavier than the mountain.",
    },
    {
      text: "A thousand years passed. David took Jerusalem and bought Moriah\u2019s threshing floor for fifty shekels. Solomon his son raised a Temple \u2014 seven years of cedar, gold, and bronze. The Holy of Holies stood over the stone, and in it rested the Ark. No one entered save the High Priest, once a year, barefoot, to speak the Name. Four centuries the Temple stood. Then Nebuchadnezzar came and fire swallowed the gold. The Ark vanished. The exiles wept by foreign rivers: If I forget you, Jerusalem, let my right hand forget its cunning.",
    },
    {
      text: "The exiles returned and built again \u2014 a modest house that made the elders weep. Herod raised it into a wonder, extending the mount with stones so vast some weigh five hundred tons. Into this temple walked Jesus, who overturned the merchants\u2019 tables: My house shall be a house of prayer. He prophesied: Not one stone will remain upon another. In the year 70, Titus brought the legions. The gold melted between the cracks; soldiers pried apart every block to claim it. All that survived was the Western Wall. There the Jews have pressed their foreheads and wept for two thousand years.",
    },
    {
      text: "For six centuries the mount lay in ruin. Rome raised a pagan temple. The Byzantines heaped it with refuse \u2014 calculated humiliation. Then in 637, Umar entered Jerusalem in peace. When he saw the filth covering Abraham\u2019s rock, he knelt and cleared it with his own hands. A wooden mosque rose at the southern end. Fifty-four years later, Abd al-Malik built the Dome of the Rock \u2014 a golden crown for the stone, its mosaics blazing, its inscriptions proclaiming the oneness of God. It cost seven times Egypt\u2019s yearly revenue. He did not flinch. He was sheltering the rock upon which the world began.",
    },
    {
      text: "The Crusaders took Jerusalem in 1099 and washed its streets with blood. They crowned the dome with a cross and placed an altar over the Foundation Stone. Al-Aqsa became the fortress of the Knights Templar \u2014 who took their very name from the Temple. Eighty-eight years the cross gleamed. Then Saladin came. Unlike the Crusaders, he did not slaughter. He removed the cross, restored the crescent, and washed the sacred rock with rosewater from Damascus. As the old men say: The stone does not remember who conquered it. It remembers only who wept upon it.",
    },
    {
      text: "Today, Jews pray at the Western Wall below but do not ascend. Muslims worship at Al-Aqsa. Christians venerate the ground where Jesus taught. Three faiths. One stone. Three thousand years. Beneath the dome the bedrock lies exposed \u2014 pale, rough, indifferent to empires. It has outlasted Solomon and Titus, the Crusaders and the Ottomans. It will outlast whatever comes next. The stone does not speak. The stone does not choose. But the stone remembers \u2014 and perhaps that is its holiest quality: that it has borne every prayer, in every tongue, and has refused none.",
    },
  ],
};

async function main() {
  console.log(`Updating story "${story.title}" in table "${TABLE}"...`);
  console.log(`  Key: siteId="${story.siteId}", langStoryId="${story.langStoryId}"`);
  console.log(`  updatedAt: ${story.updatedAt}`);

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: story,
    }),
  );

  console.log("Story updated successfully!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
