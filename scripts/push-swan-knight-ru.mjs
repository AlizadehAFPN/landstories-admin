import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "neuschwanstein-castle",
  langStoryId: "ru#swan-knight-lohengrin",
  storyId: "swan-knight-lohengrin",
  lang: "ru",

  // Russian content
  title: "Лебединый рыцарь",
  subtitle:
    "Рыцарь Святого Грааля, приплывший в ладье с лебедем, — и король, построивший в его честь замок",
  excerpt:
    "Этой легенде — больше тысячи лет. Но мир по-настоящему узнал её только в 1850 году, когда Рихард Вагнер превратил её в оперу, от которой у людей перехватывало дыхание.",
  moralOrLesson:
    "Вера требует: не спрашивай. Человеческая природа требует: спроси. Трагедия не в вопросе — а в том, что любовь, построенная на тайне, не выдерживает правды.",

  paragraphs: [
    {
      text: "Этой легенде — больше тысячи лет. Но мир по-настоящему узнал её только в 1850 году, когда Рихард Вагнер превратил её в оперу, от которой у людей перехватывало дыхание. Действие — примерно 933 год. Молодую дворянку Эльзу Брабантскую обвиняют в убийстве родного брата. Это ложь: брата заколдовала ведьма Ортруда, превратив в лебедя. Но никто Эльзе не верит. Защитника нет — за неё некому выйти на судебный поединок. Ей грозит смерть.",
    },
    {
      text: "И тут на реке появляется ладья. Не на вёслах, не под парусом — её тянет белый лебедь. В ладье стоит рыцарь в серебряных доспехах, и от него будто исходит свет. Он сходит на берег, объявляет себя защитником Эльзы и побеждает в поединке. Потом берёт её в жёны. Но ставит одно условие — железное, без оговорок: она никогда не должна спрашивать, кто он и откуда. В тот миг, когда спросит, — он исчезнет навсегда.",
    },
    {
      text: "Какое-то время всё хорошо. Рыцарь правит Брабантом мудро, Эльзу любит по-настоящему. Но Ортруда не унимается. Ночь за ночью капает яд в уши: кто этот человек, за которого ты вышла? Что за жена не знает имени собственного мужа? Сомнение растёт — медленно, но неотступно. И в брачную ночь Эльза не выдерживает. Задаёт единственный вопрос, который ей запрещено задавать: кто ты и откуда? Говорят, любопытной Варваре на базаре нос оторвали. Эльзе оторвало сердце.",
    },
    {
      text: "Лицо рыцаря темнеет от горя. Его зовут Лоэнгрин — сын Парсифаля, рыцарь Святого Грааля, самого священного ордена в христианском предании. Грааль послал его спасти Эльзу, но сила Грааля держится на одном — на абсолютной вере. Стоит усомниться — и чудо гаснет. Лоэнгрин призывает ладью. Молится над лебедем — и тот оборачивается пропавшим братом Эльзы, живым и невредимым. А потом Лоэнгрин уплывает. Навсегда. Эльза смотрит вслед — и умирает от горя.",
    },
    {
      text: "В 1861 году пятнадцатилетний баварский принц Людвиг сидел в мюнхенском театре и впервые смотрел вагнеровского «Лоэнгрина». Это его уничтожило. Он рыдал весь спектакль, а потом писал, что тот вечер определил всю его жизнь. Но Людвиг не просто восхищался Лоэнгрином — он стал Лоэнгрином. Такой же странный, прекрасный и необъяснимый. Так же ставил невозможные условия любви. И так же готов был исчезнуть — лишь бы мир не добрался до его сути.",
    },
    {
      text: "В 1864 году Людвиг стал королём Баварии — ему было всего восемнадцать. И легенда шагнула из воображения в камень. Он построил Нойшванштайн — сказочный замок на скале посреди Альп — и наполнил его лебедями. На стенах — росписи с лебедями. На мебели — резные лебеди. В фонтанах — лебеди. Само название замка значит «Новый Лебединый Камень». Это было не украшение. Это было послание: Рыцарь Лебедя вернулся. Просит об одном — оставьте наедине с красотой. А потребуете ответов — исчезнет.",
    },
    {
      text: "Мир потребовал. В 1886 году собственное правительство объявило Людвига безумным и отстранило от власти. Через несколько дней его нашли мёртвым на мелководье Штарнбергского озера — утонувшим при обстоятельствах, которые так и не удалось объяснить. Как и Лоэнгрин, он исчез — оставив после себя белый замок на вершине горы. И вопрос, на который до сих пор нет ответа.",
    },
  ],

  // Localized metadata
  characters: [
    "Лоэнгрин (Рыцарь Лебедя)",
    "Эльза Брабантская",
    "Парсифаль (отец Лоэнгрина)",
    "Ортруда (ведьма)",
    "Людвиг II, король Баварии",
    "Рихард Вагнер",
  ],
  era: "Средневековая легенда, возрождение XIX века",

  // Preserved from English
  coordinates: { lat: 47.5576, lng: 10.7498 },
  disabled: false,
  hasAudio: false,
  icon: "\uD83E\uDDA2",
  image: "",
  isFree: true,
  readingTimeMinutes: 4,
  source:
    "Wagner, Richard. Lohengrin, WWV 75, premiered 1850; Wolfram von Eschenbach, Parzival (c. 1200-1210); McIntosh, Christopher. The Swan King, 2012",
  storyCategory: "love_heartbreak",
  thumbnail: "",
  tier: "A",
  updatedAt: Math.floor(Date.now() / 1000),
};

async function main() {
  // Validate paragraphs
  console.log("=== VALIDATION ===\n");
  let totalChars = 0;
  item.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    const status = chars <= 500 ? "OK" : "OVER";
    console.log(
      `[P${i + 1}] ${chars} chars, ${words} words — ${status}`
    );
    if (chars > 500) {
      console.error(`  WARNING: Paragraph ${i + 1} exceeds 500 characters!`);
    }
  });
  console.log(`\nTotal: ${totalChars} chars, ${item.paragraphs.length} paragraphs`);
  console.log(`Target: ~3000 chars (±20% = 2400-3600)\n`);

  if (totalChars < 2400 || totalChars > 3600) {
    console.error("WARNING: Total characters outside acceptable range!");
  }

  // Push to DynamoDB
  console.log("=== PUSHING TO DYNAMODB ===\n");
  const result = await docClient.send(
    new PutCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );

  console.log("Push successful!");
  console.log(`HTTP Status: ${result.$metadata.httpStatusCode}`);
  console.log(`Key: siteId=${item.siteId}, langStoryId=${item.langStoryId}`);
  console.log(`\n=== STORY PREVIEW ===\n`);
  console.log(`Title: ${item.title}`);
  console.log(`Subtitle: ${item.subtitle}`);
  console.log(`Excerpt: ${item.excerpt}\n`);
  item.paragraphs.forEach((p, i) => {
    console.log(`[P${i + 1}]`);
    console.log(p.text);
    console.log();
  });
  console.log(`Moral: ${item.moralOrLesson}`);
}

main().catch((err) => {
  console.error("Push failed:", err.message);
  if (err.name === "ConditionalCheckFailedException") {
    console.error(
      "Record already exists! Use UpdateCommand to modify, or delete first."
    );
  }
  process.exit(1);
});
