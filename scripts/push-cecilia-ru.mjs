import { readFileSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// Load .env.local
const env = {};
for (const line of readFileSync('.env.local', 'utf-8').split('\n')) {
  const idx = line.indexOf('=');
  if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
}

const client = new DynamoDBClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = env.DYNAMO_TABLE_STORY || 'Story';
const now = Math.floor(Date.now() / 1000);

// ─── Non-text fields (identical across all languages) ───
const base = {
  siteId: 'catacombs-rome',
  storyId: 'st-cecilias-incorrupt-body',
  icon: '\u{1F3B5}',
  tier: 'A',
  source: "Acta Sanctorum; Maderno's sculpture documentation; De Rossi, Giovanni Battista. Roma Sotterranea, 1864-77",
  characters: [
    'Saint Cecilia',
    'Cardinal Paolo Emilio Sfondrato',
    'Stefano Maderno (sculptor)',
    'Pope Urban I',
    'Pope Paschal I',
  ],
  era: 'Martyrdom c. 230 AD; rediscovery 1599',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 12.5135, lat: 41.8579 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  RUSSIAN — «Нетленная Цецилия»
//  Proverb: «Бог троицу любит» (God loves the Trinity / things come in threes)
//  — subverted: the three strikes were "loved by God," but in Cecilia's favor
// ═══════════════════════════════════════════════════════════
const ru = {
  lang: 'ru',
  langStoryId: 'ru#st-cecilias-incorrupt-body',
  title: 'Нетленная Цецилия',
  subtitle: 'Покровительница музыки, которую тринадцать веков смерти так и не смогли тронуть',
  excerpt: 'В 1599 году в Риме вскрыли каменный саркофаг, запечатанный почти восемьсот лет. То, что обнаружили внутри, не укладывалось ни в какие рамки.',
  moralOrLesson: 'Некоторые истории отказываются быть похороненными. Те, кто пытался заставить Цецилию замолчать, давно забыты. А она — всё ещё здесь: в мраморе, в музыке, в каждом концертном зале, который носит её имя. Иногда самый тихий голос оказывается тем, что звучит дольше всех.',
  paragraphs: [
    {
      text: 'В 1599 году в Риме рабочие вскрыли каменный саркофаг под алтарём старой церкви. Гроб был запечатан почти восемьсот лет. То, что они увидели внутри, не укладывалось в голову: молодая женщина лежала на боку, словно только что уснула. Не скелет. Не прах. Тринадцать веков прошло — а она выглядела так, будто просто прилегла отдохнуть. Её звали Цецилия. И история того, как она оказалась в этом гробу, — одна из самых невероятных во всём Риме.',
    },
    {
      text: 'Цецилия была римской аристократкой. Она жила примерно в 230 году нашей эры — во времена, когда за веру во Христа убивали без суда. Чиновники императора выслеживали христиан, а Цецилия тайно приняла крещение. Мало того — она ещё и мужа своего, язычника Валериана, привела к новой вере. Когда власти об этом узнали, простым наказанием дело не обошлось. Из неё решили сделать пример.',
    },
    {
      text: 'Её заперли в парной собственного дома и раскалили воздух до смертельного жара. Хотели сварить заживо — и чтобы ни один палач не запачкал рук. Цецилия просидела там сутки. Живая. Тогда прислали палача. По римскому закону ему полагалось ровно три удара мечом — ни одним больше. Он трижды рубанул по шее. Три раза лезвие не смогло отсечь голову. Говорят, Бог троицу любит — но в тот день он явно был не на стороне палача. Цецилия упала с тремя глубокими ранами на шее, истекая кровью, — но дышала. И продержалась ещё три дня.',
    },
    {
      text: 'По Риму разнеслась весть: казнённая женщина жива и проповедует. К ней потянулись толпы. Сотни людей, увидев её, тут же принимали крещение. Люди собирали её кровь в тряпицы и сосуды как святыню. Когда Цецилия наконец умерла, папа Урбан I — глава подпольной христианской общины Рима — похоронил её в катакомбах Сан-Каллисто, рядом с могилами самих понтификов.',
    },
    {
      text: 'Шесть веков тело пролежало под землёй. В 821 году папа Пасхалий I перенёс останки в церковь, построенную в её честь, — Санта-Чечилия-ин-Трастевере, в старом квартале на другом берегу Тибра. Саркофаг замуровали под алтарём. И там он простоял нетронутым почти восемьсот лет — пока в 1599 году кардинал Сфондрато не затеял ремонт и не решил его вскрыть.',
    },
    {
      text: 'Тело не истлело — совсем не так, как можно было бы ожидать спустя тринадцать столетий. Цецилия лежала на правом боку, колени вместе, руки вытянуты вперёд, лицо отвёрнуто к земле. Как будто спит. А на шее — три глубоких пореза, по-прежнему различимых. Следы от меча палача. Те самые три удара, которыми её так и не смогли заставить замолчать. Кардинал немедленно вызвал скульптора Стефано Мадерно — запечатлеть увиденное, прежде чем гроб снова закроют.',
    },
    {
      text: 'Мадерно высек из мрамора фигуру в натуральную величину — в точности как она лежала: тихая поза, отвёрнутое лицо, три раны на шее. Скульптуру закончили в 1600 году, и она до сих пор стоит под тем же алтарём в Трастевере. Это одна из самых пронзительных работ в Риме — не потому что в ней пафос или драма, а потому что в ней покой. Цецилия не тянется к небесам. Она просто лежит — такая, какой её нашли. И вот уже больше четырёхсот лет люди замирают перед ней.',
    },
    {
      text: 'А вот что самое поразительное. Задолго до того, как нашли её тело, Цецилия уже стала одной из самых почитаемых святых — покровительницей музыки. На своей вынужденной свадьбе с Валерианом, пока вокруг гремели римские инструменты, она пела Богу — молча, в сердце. Этот образ остался навсегда. Сегодня концертные залы и музыкальные академии по всему миру носят её имя. Женщина, которую Рим пытался заставить замолчать, стала святой, для которой поёт весь мир.',
    },
  ],
};

// ─── Validation ──────────────────────────────────────────
function validate(story) {
  const label = story.lang.toUpperCase();
  let totalChars = 0;
  const pCount = story.paragraphs.length;

  if (pCount < 6 || pCount > 10) {
    throw new Error(`[${label}] Paragraph count ${pCount} out of range (6-10)`);
  }

  for (let i = 0; i < pCount; i++) {
    const text = story.paragraphs[i].text;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    totalChars += chars;

    if (chars > 600) {
      throw new Error(`[${label}] P${i + 1}: ${chars} chars exceeds 600 (500 + 20%)`);
    }
    if (words > 120) {
      throw new Error(`[${label}] P${i + 1}: ${words} words exceeds 120 (100 + 20%)`);
    }
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  }

  console.log(`  Total: ${totalChars} chars (target: 2400-3600)`);
  if (totalChars < 2000 || totalChars > 4200) {
    throw new Error(`[${label}] Total ${totalChars} chars outside acceptable range`);
  }
  console.log(`  [${label}] Validation passed.\n`);
}

// ─── Push ────────────────────────────────────────────────
async function pushStory(story) {
  const item = { ...base, ...story };
  const label = story.lang.toUpperCase();

  console.log(`Pushing ${label} to DynamoDB...`);
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression: 'attribute_not_exists(siteId) OR lang <> :en',
      ExpressionAttributeValues: { ':en': 'en' },
    })
  );
  console.log(`✓ ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
}

async function main() {
  console.log('=== Validating RU story ===\n');
  console.log('--- RU ---');
  validate(ru);

  console.log('=== Pushing to DynamoDB ===\n');
  await pushStory(ru);

  console.log('=== Russian story pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
