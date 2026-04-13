import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const ru = {
  siteId: "baalbek",
  storyId: "oracles-broken-staff",
  lang: "ru",
  langStoryId: "ru#oracles-broken-staff",
  title: "Сломанный жезл",
  subtitle:
    "Император послал оракулу чистый лист — проверка. Оракул прислал сломанный жезл — приговор.",
  excerpt:
    "Прежде чем двинуть армию на восток, самый могущественный человек в мире отправил оракулу запечатанное письмо. Внутри не было ни слова. Это была проверка.",
  icon: "\u{1F52E}",
  storyCategory: "prophecies_curses",
  era: "114 CE (Trajan's consultation); c. 400 CE (Macrobius's account); 391 CE (temple closure)",
  tier: "S",
  isFree: true,
  hasAudio: false,
  characters: [
    "Emperor Trajan (Marcus Ulpius Traianus)",
    "Jupiter Heliopolitanus (the oracle god)",
    "Macrobius (Roman author who recorded the prophecy)",
    "Baal-Hadad (the Canaanite storm god beneath Jupiter's mask)",
    "Emperor Theodosius I (who silenced the oracle forever)",
  ],
  coordinates: { lat: 34.0069, lng: 36.2039 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 4,
  source:
    "Macrobius, Saturnalia I.23 (c. 400 CE); Cassius Dio, Roman History LXVIII.29; Hajjar, Youssef. La triade d\u2019H\u00e9liopolis-Baalbek, 1977; Kropp & Lohmann, Temple Construction at Baalbek, 2011; Butcher, Kevin. Roman Syria and the Near East, 2003",
  updatedAt: now,
  disabled: false,
  moralOrLesson:
    "Самые страшные пророчества — не те, что предвещают гибель, а те, что обещают победу по цене, которую невозможно разглядеть заранее.",
  paragraphs: [
    {
      text: "114 год нашей эры. Император Траян — самый могущественный человек на планете. Римский сенат официально назвал его «лучшим из правителей». Он покорил народы и построил монументы, которые стоят до сих пор. Но оставалась одна незакрытая страница — Парфия. Восточная империя, которая два века унижала Рим. Парфяне разгромили армию Красса в битве при Каррах — одно из самых позорных поражений в римской истории. Траян решил закончить то, что Рим не смог. Но прежде чем двинуть хотя бы одного солдата, он сделал нечто неожиданное. Он написал письмо богу.",
    },
    {
      text: "Не какому-нибудь богу. Он обратился к оракулу Баальбека — громадному храму на территории нынешнего Ливана. Римляне называли местное божество Юпитером Гелиополитанским, но под этим именем скрывался Баал — древний бог грозы, которому поклонялись на этом холме за тысячи лет до основания Рима. Оракул работал не как другие: жрецы несли золотую статую на платформе, и когда кто-то задавал вопрос, статуя начинала двигаться сама — дёргалась, кружилась, отшатывалась. Жрецы читали эти движения как волю бога.",
    },
    {
      text: "Но Траян не из тех, кто верит на слово. Он поднялся на вершину не по рождению — по таланту. Привычка настоящего командира: перепроверять всё. Доверяй, но проверяй. И он устроил ловушку. Запечатал абсолютно чистый лист императорской печатью и отправил в храм. Докажи, что ты настоящий. Жрецы провели ритуал. И оракул прислал ответ — пустой свиток. Ни единого слова. Идеальное зеркало того, что отправил Траян. Ловушка не просто провалилась — она обернулась доказательством.",
    },
    {
      text: "Теперь Траян задал настоящий вопрос — тот, который не давал ему спать. Удастся ли вторжение? Вернётся ли он домой живым? Оракул не стал отвечать словами. Жрецы взяли центурионский жезл — деревянную палку, которую римские офицеры носили как знак власти — и сломали его на куски. Завернули обломки в ткань и отправили свёрток императору. Это была загадка. На её разгадку ушло три года.",
    },
    {
      text: "Поначалу всё шло блестяще. Траян пронёсся через Месопотамию, взял парфянскую столицу Ктесифон и дошёл до Персидского залива — дальше на восток, чем когда-либо забиралась римская армия. Стоя на берегу, он сказал, что будь он помоложе — пошёл бы по следам Александра Македонского до самой Индии. А потом всё рухнуло. Вспыхнули восстания. Здоровье сдало. В 117 году, на пути домой по морю, его настиг удар, и он умер. Прах Траяна привезли в Рим в золотой урне и поместили у подножия колонны, которая носит его имя до сих пор.",
    },
    {
      text: "Жезл, сломанный и завёрнутый в ткань. Тело, сломленное и привезённое домой. Оракул ответил с хирургической точностью: ты победишь — но живым не вернёшься. Говорят, бог правду видит, да не скоро скажет. Оракул Баальбека сказал правду сразу — но завернул её так, что расслышали только три года спустя, когда прах императора уже несли домой в золотой урне. Самое жестокое пророчество в истории: оно пообещало полную победу и спрятало цену в загадку, которую никто не разгадал вовремя.",
    },
    {
      text: "Бог, который это предсказал, пережил Траяна на столетия. Паломники тянулись через всю империю — спрашивали о любви, войне, смерти. Но в 391 году христианский император Феодосий — считавший старых богов демонами — запретил все языческие культы на территории Рима. Огни Баальбека погасли. Золотую статую уничтожили. Оракул, который когда-то предрекал гибель императоров, замолчал навсегда.",
    },
    {
      text: "Сегодня в Баальбеке стоят шесть гигантских колонн — самые высокие сохранившиеся колонны античного мира. Последние свидетели бога, который заставлял императоров слушать и был достаточно честен, чтобы сказать им то, что они не хотели слышать. Жезл давно исчез. Пророчество сбылось.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// VALIDATE & PUSH
// ═══════════════════════════════════════════════════════════════

function validate(story) {
  const label = `${story.lang} — ${story.title}`;
  console.log(`\nValidating: ${label}`);

  if (!story.siteId || !story.langStoryId || !story.lang || !story.title) {
    throw new Error(`Missing required fields for ${label}`);
  }
  if (!story.paragraphs || story.paragraphs.length < 6) {
    throw new Error(
      `Too few paragraphs for ${label}: ${story.paragraphs.length}`
    );
  }

  for (let i = 0; i < story.paragraphs.length; i++) {
    const p = story.paragraphs[i];
    if (!p.text || p.text.length === 0) {
      throw new Error(`Empty paragraph ${i} for ${label}`);
    }
    if (p.text.length > 550) {
      console.warn(
        `  WARNING: paragraph ${i} is ${p.text.length} chars (limit ~500)`
      );
    }
    console.log(`  P${i}: ${p.text.length} chars`);
  }

  const totalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  Total chars: ${totalChars}`);
  console.log(`  Paragraphs: ${story.paragraphs.length}`);
  console.log(`  VALID ✓`);
}

async function push(story) {
  const label = `${story.lang} — ${story.title}`;
  console.log(`\nPushing: ${label}`);
  console.log(`  siteId: ${story.siteId}`);
  console.log(`  langStoryId: ${story.langStoryId}`);

  await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: story,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );

  console.log(`  SUCCESS: ${label} pushed to DynamoDB.`);
}

async function main() {
  validate(ru);
  await push(ru);
  console.log("\n=== DONE ===");
}

main().catch((err) => {
  if (err.name === "ConditionalCheckFailedException") {
    console.error("\nSKIPPED: ru#oracles-broken-staff already exists.");
  } else {
    console.error("\nFATAL:", err);
    process.exit(1);
  }
});
