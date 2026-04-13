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

// ─── Non-text fields (from English original) ────────────
const base = {
  siteId: 'vatican-st-peters',
  storyId: 'st-peters-tomb-discovery',
  icon: '\u26CF\uFE0F',
  tier: 'A',
  source: 'Guarducci, Margherita. The Tomb of St. Peter, 1960; Toynbee and Ward-Perkins, The Shrine of St. Peter, 1956; Walsh, John Evangelist. The Bones of St. Peter, 1982',
  characters: [
    'Pope Pius XII',
    'Pope Paul VI',
    'Margherita Guarducci',
    'Antonio Ferrua',
    'Emperor Constantine',
  ],
  era: '1939-1968',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 12.4536, lat: 41.9022 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  RUSSIAN — «Могила под алтарём»
//  Proverb: «Бог троицу любит» (God loves the Trinity / things
//  come in threes) — subverted: four layers of devotion stacked
//  over the same few square metres, so God "exceeded" His own rule.
// ═══════════════════════════════════════════════════════════
const ru = {
  lang: 'ru',
  langStoryId: 'ru#st-peters-tomb-discovery',
  title: 'Могила под алтарём',
  subtitle: 'Как случайный провал в полу раскрыл двухтысячелетнюю тайну главного собора мира',
  excerpt: 'В 1939 году рабочие в подвалах собора Святого Петра проломили мраморный пол и провалились в кромешную тьму. Они наткнулись на тайну, которую земля хранила шестнадцать веков.',
  moralOrLesson: 'Вера и археология могут прийти к одной истине — просто разными дорогами.',
  paragraphs: [
    {
      text: 'В 1939 году рабочие Ватикана копали под собором Святого Петра — самым большим храмом на планете. Задача была простая: освободить место для нового папского захоронения. Но мраморный пол вдруг ушёл из-под ног, и люди провалились в кромешную темноту. Когда пыль осела, они стояли в месте, куда шестнадцать веков не проникал свет. Они только что наткнулись на тайну, способную подтвердить — или разрушить — саму причину, по которой этот собор стоит именно здесь.',
    },
    {
      text: 'Под полом оказался целый город мёртвых — римский некрополь, запечатанный примерно с 320 года. Император Константин — первый правитель Рима, принявший христианство — приказал засыпать это кладбище землёй. Гробницы знатных римлян, могилы бывших рабов — всё ушло под землю. И всё ради одного: чтобы над одной конкретной могилой встал его храм.',
    },
    {
      text: 'Папа Пий XII — тот самый, кто провёл Церковь через Вторую мировую — тайно разрешил раскопки. Десять лет небольшая группа археологов ползала по узким тоннелям под собором, расчищая одну гробницу за другой. Древние фрески, мозаики, латинские надписи первого века нашей эры. Усыпальницы стояли вдоль старой римской дороги, которая была проложена ещё до того, как христианство появилось на свет.',
    },
    {
      text: 'Чем дальше археологи продвигались на запад — к тому месту, над которым стоит главный алтарь собора — тем проще и беднее становились захоронения. Они входили в ту часть Ватиканского холма, где хоронили простых людей и казнённых преступников. Именно в такое место и попал бы распятый рыбак из маленького городка в Галилее.',
    },
    {
      text: 'Прямо под папским алтарём нашли нечто поразительное: маленькую каменную святыню, построенную около 160 года. Она точно совпадала с описанием римского священника Гая, который около 200 года писал, что может показать паломникам «трофей» апостола Петра на Ватиканском холме. Святыня стояла вплотную к стене, покрытой нацарапанными молитвами первых христиан. Но одна надпись звучала громче остальных: «Petros eni» — «Пётр здесь».',
    },
    {
      text: 'За этой стеной, в нише, выложенной мрамором, лежали человеческие кости. Они были завёрнуты в пурпурную ткань с золотой нитью — такой чести удостаивались лишь цари и величайшие святые. Анатом установил: мужчина крепкого телосложения, умерший в возрасте от шестидесяти до семидесяти лет. Описание удивительно точно совпадало с тем, что известно об апостоле Петре.',
    },
    {
      text: 'Но находка разожгла нешуточный спор. Главный археолог Антонио Ферруа нашёл другие кости — прямо в земле под святыней — и был уверен, что именно они подлинные. Ему возразила Маргерита Гвардуччи, специалист по древним надписям. Она настаивала: настоящие мощи — те, что за стеной. Гвардуччи подняла ватиканские архивы и восстановила всю цепочку: кости переложили за стену для сохранности ещё во время одной из ранних перестроек собора.',
    },
    {
      text: 'В 1968 году папа Павел VI обратился к миру с тщательно выверенными словами: «Мощи святого Петра были идентифицированы способом, который мы считаем убедительным». Он остановился в полушаге от догмы — до сих пор ни один католик не обязан верить, что эти кости принадлежат Петру.',
    },
    {
      text: 'Принадлежат ли эти кости тому самому рыбаку из Галилеи, который ходил рядом с Иисусом, — возможно, мы так никогда и не узнаем наверняка. Но вот что бесспорно: могила первого века, святыня второго, базилика Константина и тот грандиозный собор, что стоит над ними сегодня — говорят, Бог троицу любит, но тут четыре слоя, и все указывают на одни и те же несколько квадратных метров римской земли. Это не просто вера. Это точка на карте, которая не сдвинулась за два тысячелетия.',
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
  console.log(`\u2713 ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
}

async function main() {
  console.log('=== Validating RU story ===\n');
  console.log('--- RU ---');
  validate(ru);

  console.log('=== Pushing to DynamoDB ===\n');
  await pushStory(ru);

  console.log('=== St. Peter\'s Tomb Discovery (RU) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
