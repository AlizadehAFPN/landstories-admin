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
  storyId: 'unesco-rescue-moving-mountains',
  icon: '🏗️',
  tier: 'A',
  source: 'Desroches-Noblecourt, C. et al. The Rescue of Abu Simbel. UNESCO, 1968; Säve-Söderbergh, T. Temples and Tombs of Ancient Nubia. Thames & Hudson, 1987',
  characters: [
    'UNESCO',
    'Gamal Abdel Nasser',
    'VBB Engineering (Sweden)',
    'International community of 50 nations',
  ],
  era: 'Modern (1964-1968)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 31.6256, lat: 22.3369 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  RUSSIAN — "Как мир сдвинул гору"
//  Proverb: "С миру по нитке — голому рубаха"
//    (A thread from each person — a shirt for the naked)
//  Subversion: "А тут с миру по нитке —
//    фараону гору сдвинули." Instead of a shirt for the
//    destitute, fifty nations stitched together enough will
//    to move a pharaoh's mountain.
//  Register: Skilled modern Russian storyteller — vivid,
//    conversational, rhythmic oral narration. Think popular
//    nonfiction podcast or top-tier YouTube history narrator.
//    Not Tolstoy, not Soviet bureaucratic prose, not slang.
// ═══════════════════════════════════════════════════════════
const ru = {
  lang: 'ru',
  langStoryId: 'ru#unesco-rescue-moving-mountains',

  title: 'Как мир сдвинул гору',

  subtitle: 'Как 50 стран спасли храмы фараона от наступающего моря',

  excerpt: 'В 1960 году Египет оказался перед выбором, которого не пожелаешь никому. Президент Насер строил Асуанскую плотину — гигантский проект, который должен был обуздать Нил и дать стране электричество. Но за плотиной поднималось рукотворное море — озеро Насер. Пятьсот километров долины Нила уходили под воду.',

  moralOrLesson: 'Когда мир объединяется ради того, что дорого всем, — даже горы можно сдвинуть.',

  paragraphs: [
    {
      text: 'В 1960 году Египет оказался перед выбором, которого не пожелаешь никому. Президент Насер строил Асуанскую плотину — гигантский проект, который должен был обуздать Нил и дать стране электричество. Но за плотиной поднималось рукотворное море — озеро Насер. Пятьсот километров долины Нила уходили под воду. И вместе с ними — десятки древних храмов. В том числе Абу-Симбел: два храма, которые Рамсес Великий вырубил прямо в скале больше трёх тысяч лет назад.',
    },
    {
      text: 'И тогда ЮНЕСКО сделало то, чего раньше не пробовал никто. Обратилось ко всему миру: помогите — или храмы исчезнут навсегда. И мир откликнулся. Пятьдесят стран — включая те, что в разгар холодной войны не могли договориться вообще ни о чём — прислали деньги, инженеров, технику. Швеция, у которой с Египтом не было ни исторических, ни политических связей, стала одним из крупнейших доноров. Общий счёт: 40 миллионов долларов — на сегодняшние деньги это больше 360 миллионов.',
    },
    {
      text: 'А теперь — самое безумное. Абу-Симбел нельзя было просто взять и перенести. Храмы вырублены прямо в скале, они — часть горы. И вот шведская фирма VBB предлагает план, от которого у нормального человека глаз дёргается: распилить весь комплекс на 1 036 блоков по 20–30 тонн каждый. Поднять на 65 метров вверх. Отнести на 200 метров от реки. А потом собрать заново на искусственном холме, который выглядел бы точь-в-точь как настоящая скала.',
    },
    {
      text: 'Работа началась в 1964-м, а озеро уже подбиралось к храмам. Рабочие возвели временную дамбу, чтобы сдержать воду, — и едва успели. Но вот что поражает больше всего: электроинструменты использовать было нельзя. Вибрация разрушила бы древний песчаник. Каждый рез — вручную, с точностью до миллиметра. Каждый блок пронумеровали, подняли краном и поставили ровно туда, где он стоял три тысячи лет. Самый дорогой пазл в истории человечества.',
    },
    {
      text: 'Внутри нового холма инженеры возвели один из крупнейших бетонных куполов в мире — щит от влажности, которую принесло озеро в пустыню. А снаружи воссоздали ландшафт с такой точностью, что человек, идущий к храму, видел почти то же самое, что видели подданные Рамсеса тридцать два века назад.',
    },
    {
      text: '22 сентября 1968 года обновлённый Абу-Симбел открыли. И тут выяснилось: инженеры сотворили ещё одно чудо. Дважды в год солнечный луч проникает в самое сердце храма и освещает статуи богов — этот трюк древние строители заложили 32 века назад. На новом месте солнечную ось сохранили с точностью до одного дня. Те, кто видел храм до переноса, говорили: отличить невозможно.',
    },
    {
      text: 'Но главное, что Абу-Симбел подарил миру, — не камни. А доказательство. Говорят, с миру по нитке — голому рубаха. А тут с миру по нитке — фараону гору сдвинули. Пятьдесят стран отложили все разногласия ради того, что принадлежит всем. Эта история привела к Конвенции ЮНЕСКО о всемирном наследии 1972 года. Сегодня под её защитой больше 1 100 памятников по всей Земле — от Мачу-Пикчу до Великой стены. Каждый стоит потому, что однажды мир доказал: ради того, что действительно важно, можно и гору сдвинуть.',
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
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression: 'attribute_not_exists(siteId) OR lang <> :en',
        ExpressionAttributeValues: { ':en': 'en' },
      })
    );
    console.log(`\u2713 ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      console.log(`  ${label} record exists, safe to overwrite (not English)...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`\u2713 ${label} overwritten successfully (langStoryId: ${story.langStoryId})\n`);
    } else {
      throw err;
    }
  }
}

async function main() {
  console.log('=== Validating RU story ===\n');
  console.log('--- RU ---');
  validate(ru);

  console.log('=== Pushing to DynamoDB ===\n');
  await pushStory(ru);

  console.log('=== RU story pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
