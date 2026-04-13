import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `Год 1258-й. Турецкий город Конья. Человек с разбитым сердцем берёт в руки перо и пишет первые строки того, что станет главной поэмой персидского языка. Его зовут Джалаладдин Руми. И начинает он не с мудрости, не с философии. Он начинает со звука — с плача тростниковой флейты.`,
  },
  {
    text: `\u00ABПослушай тростник — послушай, о чём он плачет\u00BB, — написал Руми. Эта флейта — её называют \u00ABней\u00BB — сделана из полого тростника, срезанного на берегу реки. Тростник вырвали из земли, где он рос, и назад ему пути нет. Каждая нота, каждый стон, который из него вырывается, — это не музыка. Это тоска. Тростник не играет. Тростник горюет.`,
  },
  {
    text: `Метафора проста до боли. Тростник — это человеческая душа. Берег реки — это Бог. Или начало начал. Или то место, откуда мы все пришли до рождения. Когда тебя вдруг накрывает тоска без причины, когда грусть приходит ниоткуда и ты не можешь объяснить почему — это тростник в тебе. Это твоя душа вспоминает дом, из которого её когда-то забрали.`,
  },
  {
    text: `Руми не придумал это на пустом месте. До \u00ABМаснави\u00BB он пережил потерю, которая его уничтожила. В его жизнь вошёл странствующий мистик по имени Шамс Табризи — и перевернул всё. Шамс не был обычным учителем: он бросал вызов, провоцировал, выжигал всё, во что Руми верил о Боге и любви. А потом исчез. Возможно, его убили. Руми больше никогда его не увидел.`,
  },
  {
    text: `Говорят, Бог троицу любит. Но Руми хватило одного удара. Одна потеря — и уважаемый, но заурядный богослов стал одним из величайших поэтов в истории. Боль стала топливом. И когда он сел писать \u00ABМаснави\u00BB — эпическую поэму в шести книгах, которую суфии — последователи мистической традиции ислама — называют \u00ABКораном на персидском\u00BB, — он начал с тростниковой флейты. Потому что главная правда о человеке — не радость. А тоска.`,
  },
  {
    text: `Эта поэма породила целую духовную практику. Ученики Руми основали орден Мевлеви — тех самых кружащихся дервишей, которых вы наверняка видели на фотографиях: белые одежды, раскинутые руки, бесконечное вращение. На их церемониях первым всегда звучит ней. Начальные ноты нарочно грубые, надрывные — как тот самый первый крик вырванного тростника. А потом дервиши начинают кружиться: одна ладонь к небу, другая к земле. Они не танцуют. Они молятся телом.`,
  },
  {
    text: `Сегодня, спустя почти восемь веков, Руми — самый продаваемый поэт в Америке. Его строки — на кружках, в татуировках, в лентах соцсетей. Но тот самый первый образ — тростниковая флейта, которая плачет, потому что помнит, откуда её забрали, — бьёт сильнее всего. И неважно, во что ты веришь. Каждый хоть раз чувствовал эту тягу — к чему-то, чему и названия-то нет.`,
  },
  {
    text: `Вот в чём сила Руми: он уместил всё это в нескольких строках о пустом тростнике. Мы все тоскуем по дому, который не можем вспомнить. А тростниковая флейта — это голос этой тоски. Голос, данный тому, что обычно молчит.`,
  },
];

const title = "Плач тростника";
const subtitle = "Поэма, ставшая молитвой суфиев";
const excerpt = `Год 1258-й. Турецкий город Конья. Человек с разбитым сердцем берёт в руки перо и пишет первые строки того, что станет главной поэмой персидского языка. Его зовут Джалаладдин Руми.`;
const moralOrLesson = `Всякая необъяснимая тоска — это память души о том, откуда она пришла. Наша самая глубокая печаль — тоска по дому, который мы не можем вспомнить.`;

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) {
    console.error(`ERROR: P${i + 1} exceeds 500 character limit!`);
    process.exit(1);
  }
  if (words > 100) {
    console.error(`ERROR: P${i + 1} exceeds 100 word limit!`);
    process.exit(1);
  }
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);

if (paragraphs.length < 6 || paragraphs.length > 10) {
  console.error(`ERROR: Paragraph count ${paragraphs.length} outside 6-10 range!`);
  process.exit(1);
}

const minChars = 3000 * 0.8; // 2400
const maxChars = 3000 * 1.2; // 3600
if (totalChars < minChars || totalChars > maxChars) {
  console.error(`ERROR: Total chars ${totalChars} outside ${minChars}-${maxChars} range!`);
  process.exit(1);
}

console.log("\nAll constraints pass. Pushing to DynamoDB...\n");

const item = {
  siteId: "mevlana-museum",
  langStoryId: "ru#reed-flute",
  lang: "ru",
  storyId: "reed-flute",
  title,
  subtitle,
  excerpt,
  moralOrLesson,
  paragraphs,
  characters: [
    "Мевлана Джалаладдин Руми",
    "Шамс Табризи (упоминается)",
    "Тростниковая флейта (ней)",
    "Дервиши ордена Мевлеви",
  ],
  era: "Сельджукский период (ок. 1258 г. н.э.)",
  coordinates: { lat: 37.8719, lng: 32.5047 },
  disabled: false,
  hasAudio: false,
  icon: "\uD83C\uDFB5",
  image: "",
  isFree: true,
  readingTimeMinutes: 2,
  source: "Rumi, Masnavi-ye-Ma'navi, Book I; Franklin Lewis, Rumi: Past and Present, East and West",
  storyCategory: "love_heartbreak",
  thumbnail: "",
  tier: "A",
  updatedAt: Math.floor(Date.now() / 1000),
};

const command = new PutCommand({
  TableName: "Story",
  Item: item,
  ConditionExpression: "attribute_not_exists(siteId)",
});

try {
  await docClient.send(command);
  console.log("Successfully pushed 'Плач тростника' (ru#reed-flute)");
  console.log(`Title: ${item.title}`);
  console.log(`Subtitle: ${item.subtitle}`);
  console.log(`Paragraphs: ${item.paragraphs.length}`);
  console.log(`Total chars: ${totalChars}`);
  console.log(`Excerpt: ${item.excerpt.substring(0, 80)}...`);
  console.log(`Moral: ${item.moralOrLesson.substring(0, 80)}...`);
  console.log(`Updated at: ${item.updatedAt}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.log("Record already exists. Overwriting...");
    const overwriteCommand = new PutCommand({
      TableName: "Story",
      Item: item,
    });
    await docClient.send(overwriteCommand);
    console.log("Successfully overwrote 'Плач тростника' (ru#reed-flute)");
    console.log(`Title: ${item.title}`);
    console.log(`Paragraphs: ${item.paragraphs.length}`);
    console.log(`Total chars: ${totalChars}`);
    console.log(`Updated at: ${item.updatedAt}`);
  } else {
    console.error("Failed to push:", err.message);
    process.exit(1);
  }
}
