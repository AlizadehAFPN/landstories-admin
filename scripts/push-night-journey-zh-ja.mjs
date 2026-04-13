import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "jerusalem-old-city",
  storyId: "night-journey-isra-miraj",
  storyCategory: "prophets_pilgrims",
  icon: "\u{1F319}",
  tier: "S",
  era: "c. 621 CE (the Isra and Mi\u2019raj); 691 CE (Dome of the Rock construction)",
  readingTimeMinutes: 10,
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  coordinates: { lat: 31.7777, lng: 35.2355 },
  source:
    "Quran, Surah Al-Isra 17:1; Sahih al-Bukhari, Book of Merits of the Helpers, Hadith 3887 (Night Journey account); Sahih Muslim, Book of Faith, Hadith 162; Ibn Hisham, Al-Sirah al-Nabawiyyah (Life of the Prophet); al-Tabari, Tarikh al-Rusul wa\u2019l-Muluk (History of Prophets and Kings); Creswell, K.A.C., Early Muslim Architecture (Dome of the Rock); Colby, Frederick, Narrating Muhammad\u2019s Night Journey, 2008; Vuckovic, Brooke Olson, Heavenly Journeys, Earthly Concerns, 2005",
  updatedAt: NOW,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  CHINESE (zh) — 简体中文
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#night-journey-isra-miraj",
  title: `一夜登天`,
  subtitle: `走投无路的先知，翅膀遮天的飞马，改变世界的七重天之旅`,
  excerpt: `公元619年，穆罕默德的世界崩塌了。他失去了最重要的两个人，被石头砸到鞋子浸透了血\u2014\u2014然后，在最绝望的夜晚，天使来了。`,
  characters: [
    `先知穆罕默德`,
    `天使吉卜利勒（加百列）`,
    `布拉克（神驹）`,
    `先知穆萨（摩西）`,
    `先知易卜拉欣（亚伯拉罕）`,
    `阿布\u00B7伯克尔`,
  ],
  paragraphs: [
    {
      text: `公元619年，阿拉伯人叫它\u201C悲伤之年\u201D。穆罕默德因为传播一种让麦加权贵坐不住的信仰，早就成了被追杀的对象。但他还活着，因为有两个人。叔父阿布\u00B7塔利卜，一个倔老头，靠着家族的面子替侄子挡了整整十年的刀。妻子赫蒂彻，当年他第一次见到天使、吓得浑身发抖时，把他搂在怀里说：\u201C安拉绝不会抛弃你。\u201D几个月之内，两人先后走了。盾没了，港湾也没了。他跑去塔伊夫城求援，当地人拿石头招待他\u2014\u2014追着砸，直到鞋子被血泡透。`,
    },
    {
      text: `中国人说\u201C否极泰来\u201D。但谁也没想到，来的不是好运，而是一匹翅膀能遮住半边天的飞马。就在他浑身是伤、走投无路的时候，天使吉卜利勒出现了，身边站着一匹叫\u201C布拉克\u201D的神驹\u2014\u2014每迈一步，蹄子就落在目力所及的尽头。一瞬间，穆罕默德穿越了一千两百公里的沙漠，落在耶路撒冷的圣殿山上。亚伯拉罕在这里举刀献子，所罗门在这里修建圣殿。圣所里面，真主派遣过的每一位先知都已到齐。吉卜利勒说：\u201C你来领拜。\u201D最后一位先知，站到了所有先知的前面。`,
    },
    {
      text: `从那块石头\u2014\u2014犹太人的\u201C至圣所\u201D曾经矗立的同一块基岩\u2014\u2014穆罕默德升上了七重天。每一层都有人等着。第一层是亚当，为迷失的灵魂流泪。第二层是耶稣和施洗约翰。第三层是优素福，据说一个人就占了世间一半的美貌。第六层是穆萨\u2014\u2014也就是摩西\u2014\u2014他哭了，因为穆罕默德将来的信众会超过他的。到了第七层，三大信仰共同的先祖易卜拉欣，靠着天上的天房，微微笑着点了头。`,
    },
    {
      text: `再往上，连天使都不能去了。吉卜利勒停住脚说：\u201C再走一步，我就烧成灰了。\u201D穆罕默德独自前行，来到\u201C远极之树\u201D\u2014\u2014造物的边界。他站在了真主面前。命令是：每天礼拜五十次。穆罕默德答应了。但回来的路上穆萨拦住他：\u201C你的人扛不住的\u2014\u2014我跟以色列人打过交道，信我。\u201D穆罕默德折回去跟真主求减。四十次。穆萨摇头。三十。二十。十。最后五次，每次算十次的功德。穆萨还觉得多。穆罕默德说：\u201C算了吧，我实在不好意思再开口了。五次就五次。\u201D`,
    },
    {
      text: `回到麦加，天还没亮。被窝还是热的。麦加的大人物笑翻了\u2014\u2014一晚上飞到耶路撒冷再飞回来？他们让他描述那座从没去过的城市。真主把耶路撒冷的景象投在他眼前，他把城门、城墙、每栋建筑说得一丝不差。多数人照样不信。但最好的朋友阿布\u00B7伯克尔一秒没犹豫：\u201C他说了，我就信。\u201D从那天起，阿布\u00B7伯克尔有了个称号\u2014\u2014\u201C坚信者\u201D。这个名号，比后来好几个帝国都活得久。`,
    },
    {
      text: `七十年后，哈里发阿卜杜勒\u00B7马利克在穆罕默德升天的那块石头上，盖起了金灿灿的岩石圆顶清真寺。圣殿山的西墙\u2014\u2014犹太人叫它\u201C哭墙\u201D\u2014\u2014穆斯林叫它\u201C布拉克墙\u201D，纪念那匹载着先知飞过夜空的神驹。那一夜谈下来的五次礼拜，今天有二十亿人每天都在做。一次夜行，让耶路撒冷成了伊斯兰第三圣城。一块石头，三个信仰，同一场朝着天空的、从未完成的攀登。`,
    },
  ],
  moralOrLesson: `最深的启示，不会在人生巅峰降临，而在最绝望的时刻。穆罕默德被赐予七重天，不是在他凯旋的时候，而是在他被石头砸得浑身是血的时候。不是世人拥戴他的时候，而是世人抛弃他的时候。夜行登霄告诉我们：用信念扛住的苦难，有可能变成通向无限的门。`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  JAPANESE (ja) — 日本語
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#night-journey-isra-miraj",
  title: `天翔ける夜`,
  subtitle: `すべてを失った預言者、天を駆ける神馬、七つの天を貫いた一夜の物語`,
  excerpt: `西暦619年。ムハンマドの世界は崩れ落ちた。命を守ってくれた二人を立て続けに失い、石を投げられて血まみれになった夜\u2014\u2014天使が降りてきた。`,
  characters: [
    `預言者ムハンマド`,
    `天使ジブリール（ガブリエル）`,
    `ブラーク（神馬）`,
    `預言者ムーサー（モーセ）`,
    `預言者イブラーヒーム（アブラハム）`,
    `アブー・バクル・スィッディーク`,
  ],
  paragraphs: [
    {
      text: `西暦619年。イスラム世界で「悲しみの年」と呼ばれる年だ。ムハンマドは、メッカの支配層にとって不都合な信仰を説いて回り、すでに命を狙われていた。それでも生きていられたのは、二人がいたからだ。叔父アブー・ターリブ。一族の意地で十年間、体を張って甥を守り続けた頑固な男。妻ハディージャ。天使と初めて出会い、恐怖で震えるムハンマドを抱きしめて言った\u2014\u2014「神はあなたを決して見捨てない」。その二人が、立て続けに逝った。盾が消え、港が消えた。助けを求めてターイフに向かったが、住民は石を投げつけた。サンダルが血に浸るまで。`,
    },
    {
      text: `そのどん底で、天使ジブリールが現れた。傍らには翼を持つ神馬「ブラーク」。一歩で地平線の果てまで届くという。ムハンマドはその背にまたがり、一瞬で千二百キロの砂漠を越え、エルサレムの「神殿の丘」に降り立った。アブラハムがわが子に刃を振り上げ、ソロモンが神殿を築いた、あの丘だ。聖所の中には、神が遣わしたすべての預言者が待っていた。ジブリールが告げた\u2014\u2014「礼拝を導け」。最後の預言者が、最初の預言者たちの前に立った。`,
    },
    {
      text: `「基礎の岩」\u2014\u2014かつてユダヤの至聖所が置かれたその岩から、ムハンマドは七つの天を昇った。第一の天にはアダム。迷える魂のために涙を流していた。第二の天にはイエスと洗礼者ヨハネ。第三の天にはユースフ\u2014\u2014「この世の美の半分を授かった」と伝えられる預言者。第六の天ではムーサー（モーセ）が泣いた。ムハンマドの共同体がいずれ自分のそれより大きくなると知って。そして第七の天。三つの信仰の父イブラーヒーム（アブラハム）が、天上のカアバに寄りかかり、静かに微笑んでいた。`,
    },
    {
      text: `その先は、天使ですら踏み込めない領域だった。ジブリールは足を止めた。「これ以上は進めない。進めば焼き尽くされる」。ムハンマドはたった一人で「究極の境界の木」\u2014\u2014創造の果てに達し、神の前に立った。命じられたのは一日五十回の礼拝。ムハンマドは受け入れた。だが帰り道、ムーサーが待っていた。「おまえの民には無理だ。私はイスラエルの民で懲りている」。引き返して四十回。ムーサーは首を振る。三十回。二十回。十回。最後に五回、一回が十回分の功徳。ムーサーはまだ戻れと言った。ムハンマドは答えた。「もう何度もお願いした。これ以上は恥ずかしい。これでいい」。`,
    },
    {
      text: `メッカに戻ったとき、夜はまだ明けていなかった。寝床はまだ温かかった。メッカの有力者たちは笑った。一晩でエルサレムを往復だと。行ったこともない街を言い当ててみろ、と詰め寄った。神がその光景を目の前に映し出し、ムハンマドは門も壁も建物も寸分違わず語った。大半は信じなかった。だが親友アブー・バクルは一瞬も迷わなかった。「彼がそう言うなら、そうだ」。その日からアブー・バクルは「スィッディーク」\u2014\u2014「真実を認める者」と呼ばれた。その名は、いくつもの帝国より長く生き続けている。`,
    },
    {
      text: `七転び八起き、と日本では言う。だがムハンマドは七度倒れたのではない\u2014\u2014七つの天を駆け上がったのだ。七十年後、カリフのアブドゥルマリクがあの岩の上に黄金の「岩のドーム」を建てた。神殿の丘の西壁を、ユダヤの人々は「嘆きの壁」と呼び、ムスリムは神馬にちなんで「ブラークの壁」と呼ぶ。あの夜に定められた五回の礼拝を、今日、二十億の人々が行っている。たった一度の夜の旅が、エルサレムをイスラム第三の聖地にした。一つの岩。三つの信仰。同じ空に向かう、終わりなき祈り。`,
    },
  ],
  moralOrLesson: `最も深い啓示は、栄光の瞬間ではなく、絶望の底で訪れる。ムハンマドが七つの天を与えられたのは、勝利の時ではなく打ちのめされた時であり、世が彼を称えた時ではなく石を投げた時だった。夜の旅が教えてくれるのは、信仰をもって耐え抜いた悲しみが、無限への扉に変わりうるということだ。`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PUSH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function push(item, label) {
  console.log(`\n--- Pushing ${label} ---`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Validate JSON roundtrip
  const json = JSON.stringify(item);
  const parsed = JSON.parse(json);
  if (parsed.title !== item.title) {
    throw new Error(`JSON roundtrip failed for ${label} title`);
  }
  if (parsed.paragraphs.length !== item.paragraphs.length) {
    throw new Error(`JSON roundtrip failed for ${label} paragraphs`);
  }
  console.log(`  JSON validation: PASS (${json.length} bytes)`);

  const cmd = new PutCommand({ TableName: TABLE, Item: item });
  const res = await docClient.send(cmd);
  console.log(`  HTTP status: ${res.$metadata.httpStatusCode}`);

  if (res.$metadata.httpStatusCode !== 200) {
    throw new Error(`Push failed for ${label}: HTTP ${res.$metadata.httpStatusCode}`);
  }
  console.log(`  ✓ ${label} pushed successfully`);
}

async function main() {
  try {
    await push(zh, "zh (Chinese)");
    await push(ja, "ja (Japanese)");
    console.log("\n=== ALL DONE ===");
  } catch (err) {
    console.error("\n!!! ERROR:", err.message);
    process.exit(1);
  }
}

main();
