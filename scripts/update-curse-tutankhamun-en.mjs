// Update the English "Curse of Tutankhamun" story — text polish only.
// Only touches: paragraphs, excerpt, moralOrLesson, updatedAt.
// All other fields (siteId, storyId, icon, tier, storyCategory, characters,
// coordinates, source, era, disabled, hasAudio, isFree, etc.) are untouched.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Edited paragraphs ──────────────────────────────────────────────────────

const paragraphs = [
  {
    text: `In November 1922, British archaeologist Howard Carter did what no one had managed in three thousand years — he found a pharaoh's tomb with its treasures still inside. Tutankhamun, an Egyptian king who died at just nineteen, had been sealed in the Valley of the Kings near Luxor. The golden death mask, the nested coffins, thousands of artifacts glowing in lamplight — the world had never seen anything like it. But within months, the greatest discovery in archaeology became tied to something far darker.`,
  },
  {
    text: `Lord Carnarvon, the wealthy English aristocrat who bankrolled Carter's search for years, was there when the tomb was unsealed. Five months later, he was dead. A mosquito bit him in Cairo; he nicked the bite shaving, it got infected, and on April 5, 1923, the infection killed him. At the exact moment he died, according to witnesses, every light in Cairo went out — a citywide blackout no one could explain. Back home at his English estate, his dog Susie reportedly howled once and dropped dead.`,
  },
  {
    text: `The press lost its mind. Arthur Conan Doyle — the creator of Sherlock Holmes and a true believer in the supernatural — went on record saying Carnarvon had been killed by an ancient curse. Newspapers invented a warning supposedly carved above the tomb entrance: "Death shall come on swift wings to him who disturbs the peace of the King." That inscription never existed. But the story was too perfect, and no one was going to let facts get in the way.`,
  },
  {
    text: `Then more people started dying. George Jay Gould, an American millionaire who visited the tomb, died of pneumonia within months. Prince Ali Fahmy, a wealthy Egyptian who'd been at the opening, was shot dead by his wife at London's Savoy Hotel. The radiologist who X-rayed Tutankhamun's mummy died of a mystery illness. By 1929, eleven people connected to the discovery had died early, and newspapers kept score with gruesome delight.`,
  },
  {
    text: `But here's the thing that should have killed the story: Howard Carter himself — the man who cracked open the tomb, touched every artifact, and spent ten years cataloging its contents — lived for another seventeen years. He died in 1939 at sixty-four, of natural causes. If Tutankhamun's spirit wanted revenge on those who disturbed his rest, it somehow skipped the one person most responsible. If the curse was real, it had terrible aim.`,
  },
  {
    text: `Science has offered some real answers. Researchers found dangerous mold inside sealed Egyptian tombs — the kind that can cause deadly infections in someone already in poor health, which Carnarvon was. And the so-called "curse deaths" don't hold up under scrutiny. Plenty of people connected to the discovery lived long, healthy lives. They just never made the papers, because "Man Visits Ancient Tomb, Nothing Happens" isn't much of a headline.`,
  },
  {
    text: `Still, the Curse of Tutankhamun refuses to die — not because anyone truly believes in vengeful ghosts, but because the story touches something deeper. We all sense, on some level, that the dead deserve their rest, and that breaking into a sealed tomb for glory should come at a cost. Three thousand years of silence, broken in one afternoon. Maybe the real curse was never supernatural. Maybe it's just the weight of knowing you crossed a line that was never meant to be crossed.`,
  },
];

const excerpt =
  "In 1922, Howard Carter found a pharaoh's tomb still packed with treasure. Within months, people connected to the discovery started dying — and the world's most famous curse was born.";

const moralOrLesson =
  "The dead deserve their rest, and those who cross that line — whether they face ancient wrath or their own guilt — always pay some kind of price.";

// ─── Push to DynamoDB (update only text fields) ─────────────────────────────

const result = await doc.send(
  new UpdateCommand({
    TableName: TABLE,
    Key: {
      siteId: "valley-of-the-kings",
      langStoryId: "en#curse-of-tutankhamun",
    },
    UpdateExpression:
      "SET paragraphs = :p, excerpt = :e, moralOrLesson = :m, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": excerpt,
      ":m": moralOrLesson,
      ":u": now,
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("✅ Updated successfully.");
console.log("   siteId:", result.Attributes.siteId);
console.log("   langStoryId:", result.Attributes.langStoryId);
console.log("   title:", result.Attributes.title);
console.log("   paragraphs:", result.Attributes.paragraphs.length, "paragraphs");
console.log("   excerpt:", result.Attributes.excerpt.substring(0, 80) + "…");
console.log("   updatedAt:", result.Attributes.updatedAt);
