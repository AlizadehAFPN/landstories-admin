// Push Chinese (zh) and Japanese (ja) recreations of
// "The Patricide King" to the Story DynamoDB table.
//
// zh proverb: 天网恢恢，疏而不漏 (Heaven's net is vast, nothing slips through)
//   — subverted: He built his palace above the clouds,
//     but forgot heaven's net hangs higher than clouds.
// zh register: Modern Mandarin, WeChat-article / popular podcast storytelling.
//
// ja proverb: 身から出た錆 (Rust from within — you reap what you sow)
//   — subverted: No matter how much you polish the walls,
//     the rust springs from the inside.
// ja register: NHK documentary / popular nonfiction.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across all languages) ──────────────────────────
const shared = {
  siteId: "sigiriya",
  storyId: "patricide-king",
  icon: "👑",
  storyCategory: "crowns_conquests",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 7.957, lng: 80.7603 },
  source:
    "Culavamsa (chapters 38-39); Geiger, Wilhelm, trans. Culavamsa: Being the More Recent Part of the Mahavamsa, 1929; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; De Silva, K.M. A History of Sri Lanka, 1981; UNESCO World Heritage Nomination File 202",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 天网恢恢，疏而不漏 (Heaven's net is vast, nothing slips through)
// Subversion: He built his palace above the clouds, but forgot heaven's net
//   hangs higher than clouds.
// Register: Modern Mandarin, WeChat-article / popular podcast.
// Short punchy sentences, conversational asides, culturally native imagery.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#patricide-king",

  title: `弑父之王`,

  subtitle: `一个王子杀了亲生父亲，在一百八十米的巨石上建了王座，却发现再高的城堡也关不住心里的鬼`,

  excerpt: `公元五世纪，一个永远当不了合法国王的王子杀了自己的亲生父亲，然后把王座搬到了一块一百八十米高的巨石上\u2014\u2014高到连神都得抬头看他。`,

  moralOrLesson: `用父亲的血夺来的王座根本不是王座，而是一座空中的牢笼。再高的城堡，也关不住一个人心里已经做出的审判。`,

  characters: [
    `迦叶波一世（弑父之王）`,
    `达图塞纳王（他的父亲）`,
    `莫加兰王子（异母弟，合法继承人）`,
    `米伽罗（达图塞纳的侄子，军事统帅兼同谋者）`,
  ],

  era: `公元473-495年`,

  paragraphs: [
    {
      text: `公元473年，斯里兰卡发生了一件震动整个王国的事\u2014\u2014一个王子杀了自己的亲生父亲。这个王子叫迦叶波。他的父亲达图塞纳是阿努拉德普勒的国王，一位了不起的建设者。他修建了卡拉维瓦水库，六千英亩的水面，养活了整个王国的稻田。但迦叶波的母亲出身低微，按照规矩，王位轮不到他，要传给王后的儿子\u2014\u2014他同父异母的弟弟莫加兰。`,
    },
    {
      text: `迦叶波不认命。国王的侄子米伽罗是军队统帅，亲生母亲被达图塞纳处死，恨意与野心一拍即合。两人联手发动政变，把老国王投入大牢。接下来的事被编年史永远记了下来：迦叶波把父亲拖到水库边，逼他交代藏金的下落。老国王跪在水边，用戴着镣铐的双手捧起一掬水，平静地说：\u201C这就是我全部的财富。\u201D`,
    },
    {
      text: `一个为百姓修水库的国王，最后的尊严全藏在那一捧水里。但迦叶波根本听不进去。他们剥光了老国王的衣服，用铁链锁住他的身体，然后\u2014\u2014活活砌进了一面砖墙。达图塞纳，那个教会人民筑墙蓄水的人，最终死在了墙里。黑暗中，窒息中，被自己传给这片土地的技术杀死。`,
    },
    {
      text: `佛教里，杀父是最重的罪，什么修行都赎不回来。阿努拉德普勒的僧侣拒绝承认迦叶波为王。百姓叫他\u201C弑父者\u201D。弟弟莫加兰渡海逃到南印度，开始招兵买马准备复仇。迦叶波头上有了王冠，但这顶王冠没有一丝荣光。`,
    },
    {
      text: `于是他做了一个前无古人的决定\u2014\u2014彻底抛弃神圣古都，把整个王国搬到丛林深处一块巨型花岗岩上。这块石头从平坦的丛林里拔地而起，像一面垂直的墙，高一百八十米，顶上只有两个足球场那么大。佛教僧侣在它的洞穴里修行了几百年，但从没人想过住到上面去。迦叶波站在下面仰头看着它，看到的不是一块石头\u2014\u2014是一座任何军队都攻不上来、任何僧侣都审判不了的王座。`,
    },
    {
      text: `他花了十八年，把这块石头变成了一个奇迹。山脚下是精密的水上花园，那些喷泉设计得如此精巧，一千五百年后的今天居然还能运转。沿着山路往上走，悬崖上画着仙女壁画，一面石墙被打磨得像镜子一样光滑。而最震撼的是入口\u2014\u2014一头二十米高的巨型石狮，你得走进它张开的大嘴，才能到达山顶。上面是一座完整的宫殿，还有一个从整块岩石里凿出来的巨型水池，比奥运标准泳池还大。`,
    },
    {
      text: `迦叶波封自己为神王，铸金币，开商港，甚至给拒绝他的僧侣捐了座寺庙。每一幅壁画、每一座喷泉都在喊同一句话：我配得上，我值得拥有这一切。但老话说得好\u2014\u2014天网恢恢，疏而不漏。他把宫殿建到了云上面，却忘了天网比云还高。他建成的不是天堂，是全世界最美的监狱。再高的石头，也关不住一个人心里已经做出的审判。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 身から出た錆 (Rust from within — you reap what you sow)
// Subversion: No matter how much you polish the walls, rust springs from
//   the inside. Connects to Sigiriya's polished mirror wall.
// Register: NHK documentary / popular nonfiction. Clean, precise, emotional
//   at key moments. Natural modern Japanese with balanced kanji/kana.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#patricide-king",

  title: "父殺しの王",

  subtitle:
    "父を殺した王子は空に玉座を築いた\u2014\u2014だが、どんな城塞も内なる裁きからは逃れられなかった",

  excerpt:
    "五世紀、正統な王にはなれない運命の王子が実の父を殺した。そして百八十メートルの巨岩の頂に玉座を築いた\u2014\u2014神さえ見上げなければならないほどの高さに。",

  moralOrLesson:
    "父の血で奪った玉座は玉座ではない\u2014\u2014空に浮かぶ牢獄だ。どれほど高い城塞を築こうと、自らの内に棲みついた裁きから人を守ることはできない。",

  characters: [
    "カッサパ一世（父殺しの王）",
    "ダートゥセーナ王（父）",
    "モッガラーナ王子（異母弟、正統な後継者）",
    "ミガーラ（ダートゥセーナの甥、軍司令官にして共謀者）",
  ],

  era: "473-495年",

  paragraphs: [
    {
      text: "西暦473年、スリランカの王子カッサパは実の父を殺した。父ダートゥセーナはアヌラーダプラの王で、カラ・ウェワという六千エーカーの巨大貯水池を造り、王国中の水田を潤した建設王だった。だがカッサパの母は身分の低い女性で、王位は正妻の息子\u2014\u2014異母弟のモッガラーナに約束されていた。",
    },
    {
      text: "カッサパは、その運命を受け入れなかった。王の甥ミガーラは軍の総司令官で、自分の母をダートゥセーナに処刑されていた。復讐心と野望が手を結んだ。二人はクーデターを起こし、老王を捕らえた。そしてカッサパは父をカラ・ウェワの岸まで引きずっていき、国庫の在処を吐けと迫った。老王は水辺にひざまずき、鎖につながれた両手で水をすくい、静かにこう言った。「これが、私の全財産だ」",
    },
    {
      text: "民に水を与えた王の、最後の誇りがその一掬いの水にあった。だがカッサパの耳には届かなかった。彼らは老王の衣を剥ぎ、鎖で縛り上げ、生きたまま煉瓦の壁の中に塗り込めた。ダートゥセーナ\u2014\u2014民に壁の造り方を教えた王が、その壁の中で、闇の中で、息絶えた。",
    },
    {
      text: "仏教において父殺しは五逆罪の筆頭、どんな修行を積んでも償えない。アヌラーダプラの僧侶たちはカッサパを王と認めることを拒んだ。民は彼を「父殺しのカッサパ」と呼んだ。弟モッガラーナは海を渡り南インドへ逃れ、奪還の兵を集め始めた。王冠はカッサパの頭上にあった。だがそこに名誉は、一片もなかった。",
    },
    {
      text: "そこでカッサパは前代未聞の決断を下す。聖なる古都を捨て、王国ごとジャングルの奥にそびえる一枚岩の上に移したのだ。シーギリヤ\u2014\u2014平地から垂直に百八十メートルそびえ立つ花崗岩の塊。頂上はサッカーグラウンド二面分ほどしかない。僧侶たちが何世紀も洞窟で瞑想してきた場所だが、上に住もうとした者はいなかった。カッサパはこの岩を見上げ、どんな軍にも攻められず、どんな僧にも裁かれない玉座を見た。",
    },
    {
      text: "十八年をかけて彼が築いたものは、息を呑むしかない。麓には精緻な水庭園が広がり、その噴水は千五百年後の今も動く。岩壁には天女のフレスコ画が描かれ、鏡のように磨き抜かれた石壁が続く。そして入口には高さ二十メートルの巨大な石造ライオンがそびえ、人はその口の中をくぐって頂上へ登った。頂上にはオリンピックプール大の水槽が一枚岩から削り出され、本格的な宮殿が広がっていた。",
    },
    {
      text: "カッサパは自らを神王と宣言した。金貨を鋳造し、交易港を開き、自分を拒んだ僧侶にまで寺院を寄進した。壁画の一枚一枚、噴水の一つ一つが同じことを叫んでいた\u2014\u2014俺にはその資格がある、と。だが「身から出た錆」とはよく言ったもので、壁をどれだけ磨き上げても、錆は内側から湧いてくる。カッサパが造ったのは楽園ではなかった。世界で最も美しい牢獄だった。どれほど高い岩の上に逃げようと、自分の中に棲みついた裁きからは、誰も逃げられない。",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23F3 Pushing ${label} ...`);

  // JSON round-trip validation
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Verify no paragraph has empty text
  for (let i = 0; i < record.paragraphs.length; i++) {
    if (!record.paragraphs[i].text || record.paragraphs[i].text.trim() === "") {
      throw new Error(`Empty paragraph text at index ${i} for ${label}`);
    }
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully (new record).`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `\u26A0\uFE0F  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`\u2705 ${label} overwritten successfully.`);
    } else {
      console.error(`\u274C Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log(
    "\u2550\u2550\u2550 Pushing Patricide King zh/ja recreations to DynamoDB \u2550\u2550\u2550"
  );
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      totalChars += rec.paragraphs[i].text.length;
    }
    console.log(
      `\n\uD83D\uDCCA ${rec.lang} "${rec.title}": ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
    if (totalChars < 800 || totalChars > 1800) {
      console.warn(
        `\u26A0\uFE0F  ${rec.lang} total chars (${totalChars}) outside target range [800-1800]`
      );
    }
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);

  console.log(
    "\n\u2550\u2550\u2550 Both zh/ja recreations pushed successfully \u2550\u2550\u2550"
  );
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
