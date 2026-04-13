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
  siteId: 'abu-simbel',
  storyId: 'solar-alignment-miracle',
  icon: '\u2600\uFE0F',
  tier: 'A',
  source: 'Desroches-Noblecourt, C. The Great Temple of Abu Simbel. Paris, 1968; UNESCO Technical Reports',
  characters: ['Ramesses II', 'Amun-Ra', 'Ra-Horakhty', 'Ptah'],
  era: 'New Kingdom (c. 1244 BC)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 31.6256, lat: 22.3369 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  RUSSIAN — «Луч, который не опаздывает»
//  Proverb: «Бог троицу любит» (God loves a trinity / things come in threes)
//  — subverted: three statues glow, the fourth stays in darkness
// ═══════════════════════════════════════════════════════════
const ru = {
  lang: 'ru',
  langStoryId: 'ru#solar-alignment-miracle',
  title: 'Луч, который не опаздывает',
  subtitle: 'Солнце кланяется фараону — дважды в год, три тысячи лет подряд',
  excerpt:
    'Два раза в год на юге Египта происходит то, чего быть не должно. Луч солнца проникает в храм Абу-Симбел и проходит шестьдесят метров сквозь скалу, чтобы осветить лица трёх каменных богов, сидящих в кромешной тьме.',
  moralOrLesson:
    'Высшее мастерство — попасть в ритм вселенной. Настоящая точность переживает тех, кто её создал.',
  paragraphs: [
    {
      text: 'Два раза в год на юге Египта происходит то, чего быть не должно. На рассвете 22 февраля и 22 октября солнечный луч входит в дверной проём храма Абу-Симбел и пробивает шестьдесят метров цельной скалы — через залы, коридоры, камеры — до самого тёмного места в храме. Святая святых. Там он освещает лица трёх каменных богов, которые все остальные 363 дня в году проводят в кромешной тьме.',
    },
    {
      text: 'Луч падает на три фигуры. Амон-Ра — царь богов. Ра-Хорахти — бог восходящего солнца. И Рамсес II собственной персоной — фараон, который построил этот храм и имел дерзость усадить свою статую среди божеств. Минут двадцать все трое купаются в золотом свете, а четвёртая статуя — Птах, бог тьмы и загробного мира — остаётся в тени. Это не случайность. В этом весь замысел. Бог троицу любит. А четвёртого — солнце обходит стороной.',
    },
    {
      text: 'А теперь — масштаб. Строители Абу-Симбела сделали это около 1244 года до нашей эры. Больше трёх тысяч лет назад. Без телескопов. Без компьютеров. Без единого прибора. Они вычислили, где именно взойдёт солнце в два конкретных дня в году, рассчитали угол — и вырубили целый храм в скале так, чтобы луч прошёл шестьдесят метров сквозь камень и упал ровно туда, куда нужно. У них была одна попытка. Скалу не передвинешь.',
    },
    {
      text: 'Считается, что 22 февраля — день рождения Рамсеса, а 22 октября — годовщина коронации. Историки спорят, но, честно говоря, это не главное. Именинник он в тот день или нет — кто-то спроектировал здание, которое заставляет солнце кланяться одному человеку. По расписанию. И оно кланяется вот уже больше трёх тысяч лет. Ни один архитектор в истории человечества даже близко не подошёл к такому уровню амбиций.',
    },
    {
      text: 'Каждый год тысячи людей собираются у храма затемно. Стоят. Ждут. И когда это наконец происходит — когда первый проблеск света проскальзывает в проём и ползёт шестьдесят метров сквозь толщу камня, пока три древних лица не вспыхивают золотом в черноте — это не похоже на астрономию. Это похоже на чудо. Для древних египтян так и было задумано: сам бог солнца Ра входит в храм, чтобы навестить фараона, который дерзнул сесть с богами за один стол.',
    },
    {
      text: 'В шестидесятые годы новая Асуанская плотина грозила навсегда затопить Абу-Симбел. И тогда ЮНЕСКО пошло на отчаянный шаг: храм целиком разрезали на 1036 каменных блоков, подняли на 65 метров вверх по скале и собрали заново. Блок к блоку. Одна из главных задач — сохранить ту самую солнечную ось, которую древние инженеры выставили три тысячи лет назад.',
    },
    {
      text: 'Справились. Почти. После переноса луч стал приходить на сутки позже — 21 февраля и 21 октября вместо двадцать второго. Эти двадцать четыре часа — пожалуй, самая красноречивая деталь всей истории. Современная команда с лучшими технологиями на планете перенесла горный храм целиком — и промахнулась на один день. А те первые строители, у которых не было ничего, кроме глаз, математики и веры, попали в точку с первой попытки. Три тысячи лет спустя солнце всё ещё приходит вовремя.',
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
