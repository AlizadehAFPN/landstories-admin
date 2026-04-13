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
//  CHINESE (zh) — 一本小说救了巴黎圣母院
//
//  Proverb: 事不过三 (things don't go past three —
//           patience runs out at three strikes)
//  — subverted: the cathedral suffered three mortal blows
//    (Revolution, decades of neglect, demolition order),
//    and by all rights should have died. But Hugo's pen
//    dragged it back from that third death.
// ═══════════════════════════════════════════════════════════
const zh = {
  lang: 'zh',
  langStoryId: 'zh#hugo-saves-cathedral',
  title: `一本小说救了巴黎圣母院`,
  subtitle: `虚构的驼背敲钟人，如何阻止了一座大教堂的毁灭`,
  excerpt: `19世纪20年代，巴黎圣母院正在一点点死去。这座矗立了六百年的大教堂摇摇欲坠，整个巴黎似乎无人在意。`,
  moralOrLesson: `好的故事能做到法律和军队做不到的事——虚构的力量，能让人们爱上他们原本打算毁掉的一切。`,
  characters: [
    `维克多\u00B7雨果`,
    `卡西莫多（虚构）`,
    `艾丝美拉达（虚构）`,
    `维奥莱-勒-迪克`,
  ],
  paragraphs: [
    {
      text: `19世纪20年代的巴黎圣母院，正在一点点死去。这座在塞纳河畔矗立了六百年的大教堂，浑身上下伤痕累累。法国大革命期间，暴民砸碎了彩色玻璃窗，把28尊圣经人物的石像脑袋全部砍掉——因为他们以为那是法国国王的雕像。大钟被熔成了炮弹，教堂甚至被改名叫\u201C理性殿堂\u201D。1804年拿破仑在里面加冕称帝时，工人们不得不挂满壁毯，就为了遮住那些破得不成样子的墙壁。`,
    },
    {
      text: `更糟的还在后头。巴黎的市政官员已经不讨论\u201C怎么修\u201D了——他们在讨论\u201C什么时候拆\u201D。那个年代，全法国的中世纪建筑不是被当废料拆卖，就是被直接推平，理由只有一个：这些是\u201C黑暗时代\u201D留下来的破烂。人类史上最伟大的教堂之一排上了拆除日程，几乎没人站出来说一句反对的话。`,
    },
    {
      text: `然后，一个29岁的年轻作家决定跟拆迁队较量一下。维克多\u00B7雨果，当时已经是法国最有名的作家之一。他眼看着中世纪建筑一栋接一栋消失，愤怒到了极点。他清楚演讲和请愿书根本没用——那些东西救不了一砖一瓦。于是他做了一件前所未有的事：写一本小说，让全法国爱上一栋建筑。`,
    },
    {
      text: `1831年，雨果出版了\u300A巴黎圣母院\u300B——你可能更熟悉它的另一个名字，\u300A钟楼怪人\u300B。故事讲的是一个又聋又孤独的敲钟人卡西莫多，住在教堂钟楼里，默默爱着美丽的舞女艾丝美拉达。但这本书真正的主角既不是他，也不是她——是那栋建筑本身。雨果花了好几章来写石雕的纹路、玫瑰花窗透进来的光、每一道拱顶和每一根石柱，把大教堂写成了一个有血有肉、会呼吸的生命。`,
    },
    {
      text: `书一出版，直接炸了。突然间，全法国都在聊巴黎圣母院——不再是\u201C破旧碍眼的东西\u201D，而是不可替代的国宝。从没进过教堂大门的人，读完小说觉得自己跟每一尊石兽都是老熟人。拆除的声音一夜之间消失了。1844年，政府启动大规模修复，建筑师维奥莱-勒-迪克花了整整二十年重建尖塔、加上标志性的石兽雕像，把圣母院恢复成了今天全世界心目中的模样。`,
    },
    {
      text: `都说事不过三。大革命毁了它一次，几十年的无人问津毁了它第二次，拆除令差点要了它第三条命。按这个说法，圣母院早该认命了。但雨果偏偏用一支笔，把它从第三次死亡线上硬生生拽了回来。他没立法，没带兵，他造了一个虚构的驼背敲钟人——然后让整个国家重新看见了石头里的美。有时候，一支笔真的比一台推土机管用。`,
    },
    {
      text: `2019年4月15日，巴黎圣母院着火了。将近十亿人盯着手机直播，看着尖塔在火焰中倒下。塞纳河边，陌生人站在一起，脸上挂着泪。他们也许并不知道，自己之所以为一栋建筑心碎，是因为将近两百年前，有一个年轻作家讲了一个足够好的故事。一个好故事，可以让一栋建筑永远活下去。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  JAPANESE (ja) — 大聖堂を救った小説家
//
//  Proverb: 仏の顔も三度まで (even Buddha's patience
//           only lasts three times)
//  — subverted: the cathedral was struck three times
//    (Revolution, neglect, demolition order). By all
//    rights, even divine patience would've run out.
//    But Hugo's pen overturned that fate.
// ═══════════════════════════════════════════════════════════
const ja = {
  lang: 'ja',
  langStoryId: 'ja#hugo-saves-cathedral',
  title: '大聖堂を救った小説家',
  subtitle: '架空のせむし男が、ノートルダム取り壊しの危機を救った',
  excerpt:
    '1820年代、ノートルダム大聖堂は静かに死にかけていた。600年にわたってパリの空を見守ってきた大聖堂は崩れかけ、誰もそれを気にかけていなかった。',
  moralOrLesson:
    'よく語られた物語は、法律や軍隊でも成し遂げられないことをやってのける——フィクションには、人々が壊そうとしていたものを愛させる力がある。',
  characters: [
    'ヴィクトル・ユゴー',
    'カジモド（架空）',
    'エスメラルダ（架空）',
    'ウジェーヌ・ヴィオレ＝ル＝デュク',
  ],
  paragraphs: [
    {
      text: '1820年代のパリ。ノートルダム大聖堂は、静かに死にかけていた。セーヌ川のほとりに600年そびえてきたこの大聖堂は、もはや見る影もなかった。フランス革命の嵐の中、暴徒たちはステンドグラスを叩き割り、聖書の人物を刻んだ28体の石像の首をはねた——フランス国王の像だと思い込んだのだ。大鐘は溶かされて砲弾に変わり、大聖堂は「理性の神殿」と名前を変えられた。1804年にナポレオンがここで戴冠式を行ったとき、ボロボロの壁を隠すためにタペストリーで覆い尽くさなければならなかったほどだ。',
    },
    {
      text: 'だが、最悪はまだ先にあった。パリ市の役人たちが議論していたのは「どう修復するか」ではない。「いつ取り壊すか」だった。当時のフランスでは、中世の建物が次々と姿を消していた。建材として売り払われるか、「暗黒時代の恥ずかしい遺物」として更地にされるか。人類史上最も偉大な大聖堂の一つが解体リストに載り、ほとんど誰も声を上げなかった。',
    },
    {
      text: 'そこに立ち上がったのが、29歳の若き小説家だった。ヴィクトル・ユゴー。すでにフランスで最も著名な作家の一人だった彼は、中世の建物が一つまた一つと消えていくのを目の当たりにし、怒りに震えていた。演説や嘆願書では何も変わらない——それはわかっていた。だからユゴーは、前例のない手段に出た。一冊の小説で、フランス中をひとつの建物に恋させるのだ。',
    },
    {
      text: '1831年、ユゴーは『ノートルダム・ド・パリ』を世に送り出した。日本では『ノートルダムのせむし男』として知られる作品だ。耳が聞こえず孤独な鐘つき男カジモドが大聖堂の塔に暮らし、美しい踊り子エスメラルダをひそかに想い続ける物語。しかし、この小説の真の主役は人間ではない——大聖堂そのものだ。ユゴーは石の彫刻、バラ窓から差し込む光、空に向かって伸びるアーチの一つひとつを、まるで息をしている生き物のように描き出した。',
    },
    {
      text: 'この一冊が、フランスを変えた。ある日を境に、国中がノートルダムの話を始めた。「朽ちかけた邪魔な建物」ではなく、かけがえのない国の宝として。一度も大聖堂を訪れたことのない人々が、すべてのガーゴイルをまるで旧友のように感じた。取り壊しの議論は一夜にして消えた。1844年、政府は建築家ウジェーヌ・ヴィオレ＝ル＝デュクの指揮で大規模修復に着手。20年をかけて尖塔を再建し、象徴的なガーゴイルを新たに加え、今日世界中の人が思い浮かべるノートルダムの姿をつくり上げた。',
    },
    {
      text: '「仏の顔も三度まで」という。革命に打ちのめされ、何十年もの放置で朽ち果て、取り壊しの決定が下されかけた——三度目だ。普通なら、ここで終わる。だがユゴーは、ペン一本でその運命を覆した。法律を変えたわけでも、軍を率いたわけでもない。架空のせむし男を生み出し、国中の人々に石の中に宿る美しさを見せたのだ。ときにペンは、解体のハンマーよりも強い。',
    },
    {
      text: '2019年4月15日、ノートルダム大聖堂が燃えた。10億人近くがスマートフォンの画面に釘付けになり、尖塔が炎の中に崩れ落ちるのを見つめた。セーヌ川のほとりでは、見知らぬ人同士が並んで涙を流していた。その涙の本当の理由を、本人たちは知らなかったかもしれない。約200年前、ひとりの若い作家が語った、たった一つの物語。それが、ひとつの建物を永遠にした。',
    },
  ],
};

// ─── Validation (adjusted for CJK: ~1000-1500 chars) ────
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
    totalChars += chars;

    if (chars > 350) {
      throw new Error(`[${label}] P${i + 1}: ${chars} chars exceeds 350`);
    }
    console.log(`  P${i + 1}: ${chars} chars`);
  }

  console.log(`  Total: ${totalChars} chars (target: 1000-1500, ±20%)`);
  if (totalChars < 800 || totalChars > 1800) {
    throw new Error(
      `[${label}] Total ${totalChars} chars outside acceptable range (800-1800)`
    );
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
  console.log(
    `\u2713 ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`
  );
}

async function main() {
  console.log('=== Validating ZH story ===\n');
  console.log('--- ZH ---');
  validate(zh);

  console.log('=== Validating JA story ===\n');
  console.log('--- JA ---');
  validate(ja);

  console.log('=== Pushing to DynamoDB ===\n');
  await pushStory(zh);
  await pushStory(ja);

  console.log('=== Hugo Saves Cathedral (ZH + JA) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
