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
  siteId: 'notre-dame-de-paris',
  storyId: 'crown-of-thorns-rescue',
  icon: '\u{1F451}',
  tier: 'A',
  source: 'Paris Fire Brigade reports; Father Jean-Marc Fournier interviews; historical records of the Crown of Thorns',
  characters: [
    'Father Jean-Marc Fournier',
    'Paris firefighters',
    'King Louis IX (historical)',
    'Christ (theological)',
  ],
  era: 'April 15, 2019 (relic dates to 1st century AD)',
  readingTimeMinutes: 2,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 2.35, lat: 48.853 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  RUSSIAN — «Терновый венец в огне»
//  Proverb: «Бог троицу любит» (God loves the number three)
//  — subverted: the Crown survived far more than three times,
//    so God "lost count long ago"
// ═══════════════════════════════════════════════════════════
const ru = {
  lang: 'ru',
  langStoryId: 'ru#crown-of-thorns-rescue',
  title: 'Терновый венец в огне',
  subtitle: 'Как живая цепь пожарных вынесла главную реликвию христианства из горящего Нотр-Дама',
  excerpt: 'Вечером 15 апреля 2019 года над крышей Нотр-Дама поднялся дым. Через час кровля собора полыхала стеной огня. Но внутри горящего здания разворачивалась история куда драматичнее, чем мог представить любой зритель с той стороны экрана.',
  moralOrLesson: 'Есть вещи, которые выживают не по везению — а потому что в каждом поколении находится тот, кто решает ради них пойти в огонь.',
  paragraphs: [
    {
      text: 'Вечером 15 апреля 2019 года над крышей Нотр-Дама поднялся дым. Через час дубовый каркас кровли — средневековые строители называли его «Лес», потому что на него ушла целая роща, — полыхал сплошной стеной. Знаменитый шпиль собора рухнул в прямом эфире на глазах у миллионов. Многие плакали. Но внутри горящего здания разворачивалась история куда более драматичная, чем мог представить любой зритель с той стороны экрана.',
    },
    {
      text: 'В самом сердце собора капеллан парижской пожарной бригады — отец Жан-Марк Фурнье — вёл группу пожарных на спасательную операцию. Не за людьми. За тем, что находилось в непрерывном хранении человечества почти две тысячи лет: Терновым венцом — реликвией, которую христиане считают венцом, возложенным на голову Иисуса перед распятием. Он хранился в сокровищнице собора. И огонь подбирался ближе с каждой минутой.',
    },
    {
      text: 'У этого венца — своя невероятная судьба. В 1239 году король Франции Людовик IX — настолько набожный, что позже его причислят к лику святых — выкупил реликвию у обнищавшего правителя остатков Византии. Цена? Больше половины годового дохода всей Франции. Затем Людовик построил Сент-Шапель — одну из красивейших церквей Парижа — специально для этой единственной реликвии. А когда венец привезли, король снял обувь и пронёс его босиком через весь город.',
    },
    {
      text: 'Но вернёмся в горящий собор. Венец лежал в хранилище за электронными замками. Отец Фурнье и пожарные пробивались к нему через коридоры, затянутые чёрным дымом. Когда добрались — замки не работали: жар вывел из строя электронику. Один из пожарных вскрыл механизм силой. За дверью, в хрустальном футляре, лежал он — кольцо из переплетённых тростников, скреплённое золотой нитью. Невозможно хрупкий на фоне хаоса вокруг.',
    },
    {
      text: 'Времени на осторожность не было — сверху сыпались горящие обломки. Пожарные выстроились в живую цепь и передавали хрустальный футляр из рук в руки: через дым, мимо летящих углей, по коридорам, залитым рыжим светом пламени, — пока он не оказался под открытым небом парижской ночи. Когда реликвию вынесли, отец Фурнье упал на колени. Пожарные — люди, чья работа бежать навстречу огню, — не сдерживали слёз.',
    },
    {
      text: 'А теперь — то, от чего мурашки по коже. Терновый венец оказывался на грани гибели снова и снова на протяжении почти двух тысяч лет. Он пережил падение Рима. Пережил разграбление Константинополя в 1204 году, когда крестоносцы вместо Иерусалима разорили братский христианский город. Пережил Великую французскую революцию — священник спрятал его за мгновение до того, как толпа ворвалась в церковь. Пережил две мировые войны. И в 2019-м — пережил пожар Нотр-Дама.',
    },
    {
      text: 'Кто-то назовёт это везением. Кто-то — цепью совпадений. Но закономерность бросается в глаза: каждый раз, когда мир рушился, кто-то решал, что этот хрупкий круг из шипов стоит того, чтобы рискнуть жизнью. Отец Фурнье вошёл в пылающий собор. Священник времён революции поставил на кон голову — в буквальном смысле. Средневековый король отдал полцарства. Говорят, Бог троицу любит — но с Терновым венцом Он давно сбился со счёта. Венец выживает не по случайности, а потому что в каждом поколении находится тот, кто решает его спасти.',
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

  console.log('=== Crown of Thorns (RU) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
