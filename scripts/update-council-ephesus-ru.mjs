/**
 * Update "The Council of Ephesus" Russian story — editorial polish.
 * Updates text fields + translates characters/era to Russian.
 * Does NOT touch: siteId, langStoryId, storyId, lang, icon, storyCategory,
 *   tier, isFree, hasAudio, readingTimeMinutes, thumbnail, image,
 *   coordinates, source, disabled.
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// Load env
const envFile = readFileSync("/Users/wallex/landstories-admin/.env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const KEY = { siteId: "ephesus", langStoryId: "ru#council-ephesus" };

// ─── REVISED TEXT ────────────────────────────────────────────────────

const updatedTitle = "Битва за Богородицу";

const updatedSubtitle = "Как богословский спор обернулся дракой, а драка \u2014 догмой";

const updatedExcerpt =
  "Лето 431 года. В древний Эфес съезжаются больше двухсот епископов \u2014 и не на молитву, а на войну.";

const updatedMoral =
  "Великие богословские споры никогда не бывают только о Боге \u2014 за каждым догматом стоят амбиции, деньги и власть, а истину определяет тот, кто победил.";

const updatedEra = "Поздний Рим / Ранняя Византия (431 г. н.э.)";

const updatedCharacters = [
  "Кирилл Александрийский",
  "Несторий Константинопольский",
  "Император Феодосий II",
  "Сирийские епископы",
  "Дева Мария (в центре богословского спора)",
];

const updatedParagraphs = [
  {
    text: "Лето 431 года. В древний Эфес съезжаются больше двухсот епископов \u2014 и не на молитву, а на войну. Римский император Феодосий II созвал Третий Вселенский собор, чтобы раз и навсегда закрыть вопрос, раскалывавший христианский мир: кто такая Мария? Просто женщина, родившая человека, в котором обитал Бог, \u2014 или Богородица, та, что носила под сердцем самого Творца? От ответа зависело, во что будут верить миллиарды людей следующие шестнадцать веков.",
  },
  {
    text: "По одну сторону \u2014 Несторий, патриарх Константинополя, самый влиятельный церковник на востоке империи. Его позиция: Мария родила лишь человеческую природу Христа. По другую \u2014 Кирилл, патриарх Александрии Египетской, который стоял на сво\u0451м: Мария выносила Бога во плоти. Точка. Но этот спор никогда не был только про богословие. Константинополь и Александрия десятилетиями грызлись за звание духовной столицы Востока. Спор о вере стал лишь очередным полем битвы.",
  },
  {
    text: "Кирилл приехал в Эфес первым \u2014 и ждать не стал. Сирийские епископы, главные союзники Нестория, ещ\u0451 пылили по дорогам, когда он открыл собор без них. За один день Кирилл устроил Несторию суд, осудил его учение и лишил сана. Вс\u0451 было кончено до того, как противники вошли в городские ворота. Когда сирийцы наконец добрались, они пришли в ярость \u2014 собрали собственный собор и отлучили Кирилла в ответ.",
  },
  {
    text: "А дальше \u2014 полный хаос. Несколько недель две группы епископов расхаживали по улицам Эфеса, предавая друг друга анафеме. Монахи обеих сторон устраивали потасовки прямо на площадях. Император Феодосий \u2014 человек, который затеял вс\u0451 это ради единства церкви, \u2014 не выдержал и бросил за реш\u0451тку обоих: и Кирилла, и Нестория. Собор, задуманный как лекарство для больной церкви, обернулся самым громким религиозным скандалом в истории Римской империи.",
  },
  {
    text: "Но Кирилл умел играть вдолгую. Прямо из тюрьмы он развернул такую кампанию подкупа, что позавидовал бы любой современный политик. Золото, слоновая кость, дорогие ткани \u2014 вс\u0451 потекло рекой к нужным людям при императорском дворе. Говорят, Бог троицу любит \u2014 так вот, на Третьем Вселенском соборе Он явно любил того, кто платил щедрее.",
  },
  {
    text: "Взятки сделали сво\u0451 дело. Император отпустил Кирилла, утвердил его приговор, а Нестория сослал в глубь египетской пустыни. Бывший патриарх Константинополя пров\u0451л остаток жизни в забвении, отправляя письма, на которые никто так и не ответил. Ещ\u0451 вчера \u2014 один из самых могущественных людей империи. А теперь \u2014 никто.",
  },
  {
    text: "Решение того собора \u2014 что Мария есть Богородица \u2014 стало одним из краеугольных камней христианства. Спустя почти шестнадцать столетий оно по-прежнему в самом сердце католической и православной веры. А началось вс\u0451 с подтасованного голосования, закулисных сделок и одного епископа, который понял то, чего не понимает большинство до сих пор: победители пишут не только историю \u2014 они пишут и богословие.",
  },
];

// ─── EXECUTE ─────────────────────────────────────────────────────────

async function main() {
  // Verify item exists
  const { Item: current } = await docClient.send(
    new GetCommand({ TableName: TABLE, Key: KEY })
  );

  if (current) {
    console.log("\u2500\u2500\u2500 Existing Russian story found \u2500\u2500\u2500");
    console.log("  Title:", current.title);
    console.log("  Paragraphs:", current.paragraphs.length);
    const oldChars = current.paragraphs.reduce((s, p) => s + p.text.length, 0);
    console.log("  Total chars:", oldChars);
  } else {
    console.log("  No existing Russian version \u2014 will create new record");
  }

  // Validate new paragraphs
  console.log("\n\u2500\u2500\u2500 New paragraph stats \u2500\u2500\u2500");
  for (let i = 0; i < updatedParagraphs.length; i++) {
    const t = updatedParagraphs[i].text;
    const words = t.split(/\s+/).length;
    console.log(`  P${i + 1}: ${t.length} chars, ${words} words`);
    if (t.length > 500) console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 500 chars!`);
    if (words > 100) console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 100 words!`);
  }
  const newChars = updatedParagraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`  Total: ${newChars} chars (target ~3000 \u00B120%)`);

  // Validate JSON round-trip
  const testObj = { paragraphs: updatedParagraphs, title: updatedTitle, excerpt: updatedExcerpt };
  const roundTrip = JSON.parse(JSON.stringify(testObj));
  if (roundTrip.paragraphs.length !== updatedParagraphs.length) {
    console.error("\u2717 JSON round-trip failed!");
    process.exit(1);
  }
  console.log("  JSON round-trip: \u2713");

  // Update
  const now = Math.floor(Date.now() / 1000);

  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: KEY,
      UpdateExpression:
        "SET title = :t, subtitle = :st, excerpt = :e, moralOrLesson = :m, " +
        "era = :era, characters = :ch, paragraphs = :p, updatedAt = :u",
      ExpressionAttributeValues: {
        ":t": updatedTitle,
        ":st": updatedSubtitle,
        ":e": updatedExcerpt,
        ":m": updatedMoral,
        ":era": updatedEra,
        ":ch": updatedCharacters,
        ":p": updatedParagraphs,
        ":u": now,
      },
    })
  );
  console.log("\n\u2713 Russian story updated successfully");

  // Verify
  const { Item: updated } = await docClient.send(
    new GetCommand({ TableName: TABLE, Key: KEY })
  );
  console.log("\n\u2500\u2500\u2500 Verification \u2500\u2500\u2500");
  console.log("  Title:", updated.title);
  console.log("  Subtitle:", updated.subtitle);
  console.log("  Excerpt:", updated.excerpt);
  console.log("  Era:", updated.era);
  console.log("  Characters:", JSON.stringify(updated.characters));
  console.log("  Paragraphs:", updated.paragraphs.length);
  for (let i = 0; i < updated.paragraphs.length; i++) {
    const t = updated.paragraphs[i].text;
    console.log(`  P${i + 1}: ${t.length} chars, ${t.split(/\s+/).length} words`);
  }
  const verifyChars = updated.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`  Total: ${verifyChars} chars`);

  // Confirm unchanged fields
  console.log("\n\u2500\u2500\u2500 Unchanged fields check \u2500\u2500\u2500");
  console.log("  siteId:", updated.siteId);
  console.log("  langStoryId:", updated.langStoryId);
  console.log("  lang:", updated.lang);
  console.log("  storyId:", updated.storyId);
  console.log("  storyCategory:", updated.storyCategory);
  console.log("  tier:", updated.tier);
  console.log("  icon:", updated.icon);
  console.log("  source:", updated.source);

  console.log("\n\u2713 All done.");
}

main().catch(console.error);
