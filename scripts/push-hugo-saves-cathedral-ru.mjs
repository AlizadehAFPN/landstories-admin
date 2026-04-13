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
  storyId: 'hugo-saves-cathedral',
  icon: '\u{1F4D6}',
  tier: 'S',
  source:
    'Victor Hugo, "Notre-Dame de Paris" (1831); French National Assembly records on monument preservation; architectural history of Notre-Dame restoration',
  era: '1831',
  readingTimeMinutes: 2,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 2.3499, lat: 48.853 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  RUSSIAN — «Писатель, который спас собор»
//
//  Proverb: «Бог троицу любит» (God loves the number three)
//  — subverted: the cathedral survived centuries, survived
//    revolution — but its salvation was not a third miracle
//    or a third prayer, but a single novel.
// ═══════════════════════════════════════════════════════════
const ru = {
  lang: 'ru',
  langStoryId: 'ru#hugo-saves-cathedral',
  title: 'Писатель, который спас собор',
  subtitle:
    '...как придуманный горбун предотвратил реальный снос Нотр-Дама',
  excerpt:
    'К 1820-м Нотр-Дам умирал. Собор, шесть веков возвышавшийся над Парижем, разваливался — и всем было плевать.',
  moralOrLesson:
    'Одна хорошо рассказанная история может спасти то, что не под силу ни армиям, ни законам — вымысел способен заставить людей полюбить то, что они собирались уничтожить.',
  characters: [
    'Виктор Гюго',
    'Квазимодо (вымышленный)',
    'Эсмеральда (вымышленная)',
    'Эжен Виолле-ле-Дюк',
  ],
  paragraphs: [
    {
      text: 'К 1820-м Нотр-Дам умирал. Собор, шесть веков возвышавшийся над Парижем, разваливался — и всем было плевать. Революция разбила витражи, снесла головы двадцати восьми каменным статуям библейских царей — их приняли за французских королей — и переплавила колокола на пушечные ядра. Собор переименовали в «Храм Разума». Когда Наполеон в 1804-м короновался здесь, стены пришлось завесить гобеленами — просто чтобы скрыть разруху.',
    },
    {
      text: 'И дальше становилось только хуже. Чиновники обсуждали не как починить собор, а когда его снести. По всей Франции средневековые здания разбирали на кирпичи или сносили как позорное наследие «тёмных веков». Один из величайших соборов мира стоял в очереди на слом — и почти никто за него не вступился.',
    },
    {
      text: 'И тут за дело взялся двадцатидевятилетний Виктор Гюго. К тому моменту он уже был одним из самых известных писателей Франции — и был в ярости. Он видел, как средневековые здания исчезают квартал за кварталом, и понимал: речи и петиции ничего не спасут. Тогда он решился на то, чего до него не делал никто, — написать роман, который заставит целую страну влюбиться в здание.',
    },
    {
      text: 'В 1831 году вышел «Собор Парижской Богоматери». История глухого одинокого звонаря Квазимодо, живущего в башнях собора, и красавицы Эсмеральды, которую он любит из тени. Но главный герой книги — не они. Главный герой — сам собор. Гюго посвятил целые главы каменной резьбе, витражным розам, каждой арке и каждому камню — и читатель чувствовал: собор живой, он дышит.',
    },
    {
      text: 'Книга взорвала Францию. О Нотр-Даме заговорили все — но уже не как о развалине, а как о национальном сокровище. Люди, ни разу не заходившие в собор, чувствовали, что знают каждую горгулью по имени. Разговоры о сносе стихли за ночь. В 1844-м правительство запустило грандиозную реставрацию: архитектор Эжен Виолле-ле-Дюк двадцать лет восстанавливал шпиль, ставил знаменитых горгулий и возвращал собору тот облик, который мы знаем сегодня.',
    },
    {
      text: 'Задумайтесь, что сделал один человек. Без армии, без закона, без единого кирпича в руках. Он придумал горбуна — и заставил целую нацию увидеть красоту в камнях, которые она собиралась пустить на щебень. Говорят, Бог троицу любит: собор пережил века, пережил революцию — а спасло его не третье чудо и не третья молитва, а один-единственный роман.',
    },
    {
      text: 'Когда 15 апреля 2019 года Нотр-Дам загорелся, почти миллиард человек смотрел трансляцию. Незнакомые люди стояли на берегу Сены со слезами на глазах. И каждый из них — знал он это или нет — оплакивал то, что Виктор Гюго научил их любить почти двести лет назад. Одна история, рассказанная как надо, сделала здание бессмертным.',
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
      throw new Error(`[${label}] P${i + 1}: ${chars} chars exceeds 600`);
    }
    if (words > 120) {
      throw new Error(`[${label}] P${i + 1}: ${words} words exceeds 120`);
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

  console.log('=== Hugo Saves Cathedral (RU) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
