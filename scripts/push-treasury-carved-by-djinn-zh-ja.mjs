// Push Chinese and Japanese recreations of "The Treasury Carved by Djinn"
// to the Story DynamoDB table.
//
// Chinese proverb subverted: 三人成虎 (three people say tiger, it becomes true)
//   → Here an entire nation "made a tiger" for a thousand years
// Japanese proverb subverted: 百聞は一見にしかず (seeing once > hearing 100 times)
//   → Here, seeing the Treasury makes you BELIEVE the legend more, not less

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const shared = {
  siteId: "petra",
  storyId: "treasury-carved-by-djinn",
  icon: "\u{1F3DB}\uFE0F",
  storyCategory: "gods_monsters",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 7,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 30.3216, lng: 35.4513 },
  source:
    "Burckhardt, Johann Ludwig. Travels in Syria and the Holy Land, 1822; Farajat, Suleiman. Excavations at al-Khazneh (2003); Diodorus Siculus, Bibliotheca Historica XIX.94-95; McKenzie, Judith. The Architecture of Petra, 1990; Joukowsky, Martha Sharp. Petra Great Temple, Brown University Excavations; Madain Project, al-Khazneh Burial Crypt documentation",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — Simplified Mandarin
// Register: Popular WeChat article / podcast — gripping, conversational, vivid
// Proverb: 三人成虎 — subverted into "an entire nation made a tiger"
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#treasury-carved-by-djinn",

  title: `精灵一夜凿出的宝库`,

  subtitle: `贝都因人千年传说中，佩特拉悬崖上那座不可能是人建的宫殿`,

  excerpt: `贝都因人从来不叫它陵墓。他们叫它\u201C法老的宝库\u201D\u2014\u2014还发誓说，这东西根本不是人造的。`,

  moralOrLesson: `人类最伟大的作品，在传说里总会变成神灵的杰作\u2014\u2014因为我们无法接受一个事实：那些早已被遗忘的凡人，曾经拥有我们再也追不上的天赋。`,

  characters: [
    `法老（传说人物）`,
    `精灵/镇尼（超自然建造者）`,
    `阿雷塔斯四世（纳巴泰国王）`,
    `约翰\u00B7路德维希\u00B7布克哈特（化名\u201C易卜拉欣酋长\u201D）`,
    `所罗门王（苏莱曼，精灵之主）`,
  ],

  era: `约公元前1世纪至公元1世纪（建造时期）；1812年（布克哈特重新发现）`,

  paragraphs: [
    {
      text: `贝都因人从来不叫它陵墓。他们管它叫\u201C法老宝库\u201D\u2014\u2014Khaznat al-Firaun，而且发誓，没有任何人的手碰过它。传说是这样的：当年埃及法老追着摩西穿过红海，并没有淹死。他活了下来，一路追到南方的群山里，身后拖着好几车偷来的黄金。峡谷越来越窄，战车过不去了。法老怎么办？他是法术之王啊\u2014\u2014他召唤了精灵。`,
    },
    {
      text: `精灵，在伊斯兰传统里叫镇尼（djinn），是用\u201C无烟之火\u201D造出来的生灵，不是人，也不是神，介于两者之间。《古兰经》里说，所罗门王曾命令它们修建耶路撒冷的圣殿。这一回，法老召唤了同样的力量。精灵们应声而来。一个晚上，它们在悬崖上凿出了一面四十米高的宫殿。廊柱、神像、密室\u2014\u2014全从整块岩石里雕出来。最后在顶上放了个石瓮，把黄金封进去，然后消失了。`,
    },
    {
      text: `几百年来，贝都因人真信黄金就在那个瓮里。这可不是茶余饭后闲聊\u2014\u2014他们直接朝它开枪。十八、十九世纪来的旅行者发现，那个瓮上布满了几百个弹孔，全是一代又一代部落勇士打上去的，想把它轰开倒出金子。但那个瓮是实心的，和悬崖连为一体，里面什么都没有，从来就没有过。弹痕至今还在。都说\u201C三人成虎\u201D，这里是整个民族成虎，一传就是上千年\u2014\u2014因为这个传说实在太好了，好到没人舍得不信。`,
    },
    {
      text: `真正的建造者比任何精灵都了不起。大约公元前一世纪，纳巴泰人\u2014\u2014一群从游牧民变成中东最富商人的阿拉伯人\u2014\u2014为最伟大的国王阿雷塔斯四世凿出了这座王陵。正面是希腊式廊柱、守护来世的神像、携灵升天的雄鹰。位置选得精准：任何人穿过佩特拉那条狭窄峡谷，第一眼看到的就是它\u2014\u2014让你还没进城，就知道走进了谁的地盘。`,
    },
    {
      text: `这座宝库在欧洲人的记忆里消失了整整一千年。1812年，瑞士探险家布克哈特化装成\u201C易卜拉欣酋长\u201D混了进去。为了这一刻，他花了三年学阿拉伯语和《古兰经》。借口是去先知哈伦的墓前宰羊献祭。向导带他穿过九十米深的峡谷，出来的瞬间，宝库正面扑面而来。向导盯着他说：\u201C我看你是个异教徒。\u201D布克哈特马上撤了\u2014\u2014但他刚刚发现了地球上最伟大的失落城市之一。`,
    },
    {
      text: `2003年，考古学家在宝库底下往下挖了六米，找到了传说一直在掩盖的东西。不是黄金\u2014\u2014是坟墓。至少十一具遗骸，旁边是陶罐和焚香。2024年，又在附近发现了十二具骨骸，安静地躺了两千年。宝库从来不是金库。从第一天起，它就是王国最重要人物的安息之所，放在每个进城的人都得路过的地方。`,
    },
    {
      text: `但传说就是死不了。斯皮尔伯格把它变成了《夺宝奇兵3》里圣杯的藏身处。真实的内部？又小又空，跟电影完全不是一回事。但这不重要。当清晨的光照上砂岩，整面墙变成活火的颜色\u2014\u2014那一刻，再理性的人也会愣住。也许精灵是真的。也许黄金还在里面，在比任何人都挖得更深的地方。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — Natural modern Japanese
// Register: NHK Special documentary / popular nonfiction — compelling, precise
// Proverb: 百聞は一見にしかず — subverted: seeing deepens the mystery
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#treasury-carved-by-djinn",

  title: `精霊が刻んだ宝物殿`,

  subtitle: `ペトラの断崖に一夜で刻まれた\u201Cありえない\u201D建造物\u2014\u2014その正体をめぐる千年の物語`,

  excerpt: `ベドウィンの民はそれを墓とは呼ばなかった。彼らはそれを\u201Cファラオの宝物殿\u201Dと呼び、人の手で造られたものではないと信じていた。`,

  moralOrLesson: `人間が生み出した最高傑作は、いつしか神や精霊の仕業として語り継がれる\u2014\u2014とうに忘れ去られた名もなき人々が、今の私たちには二度と届かない天才だったという事実を、私たちが受け入れられないからだ。`,

  characters: [
    `ファラオ（伝説上の人物）`,
    `ジン（超自然的な建造者）`,
    `アレタス四世（ナバテア王）`,
    `ヨハン\u30FBルートヴィヒ\u30FBブルクハルト（変装名\u300Cシェイク\u30FBイブラヒム\u300D）`,
    `ソロモン王（スレイマン、ジンの主）`,
  ],

  era: `紀元前1世紀\u301C紀元後1世紀頃（建造）、1812年（ブルクハルトによる再発見）`,

  paragraphs: [
    {
      text: `ベドウィンの民は、それを墓とは呼ばなかった。\u300Cハズナト\u30FBアル\uFF1Dファラウン\u300D\u2014\u2014ファラオの宝物殿。人間が造ったものではないと、彼らは固く信じていた。伝説はこうだ。エジプトのファラオは紅海でモーセを追いかけて溺れたのではない。生き延びて、奪った黄金を荷車に積み、南の山岳地帯まで追ってきた。峡谷が狭くなり、戦車が通れなくなったとき、ファラオは魔術の王にふさわしいことをした。精霊\u2014\u2014ジンを召喚したのだ。`,
    },
    {
      text: `ジンとは、イスラムの伝承に登場する\u300C煙のない炎\u300Dから生まれた存在だ。人間でも神でもなく、その間にいる強大な霊的存在。コーランには、かつてソロモン王がジンを従えてエルサレムの神殿を建てさせたと記されている。今度はファラオが同じ力を呼んだ。ジンは応じた。たった一晩で、高さ四十メートルの壮大な正面壁を断崖から削り出した。列柱、神々の像、隠された部屋\u2014\u2014すべて一枚岩から。そして頂上に石の壺を置き、黄金を封じ込め、姿を消した。`,
    },
    {
      text: `何百年もの間、ベドウィンはその壺に本当に黄金が入っていると信じていた。噂話のレベルではない。実際に銃で撃っていたのだ。十八世紀から十九世紀にかけて訪れた旅行者たちが見たのは、何百もの弾痕が刻まれた壺だった。何世代にもわたる部族の戦士たちが、壺を割って金を手に入れようとした跡だ。だが、壺は断崖と一体の無垢の岩。中には何もない。最初から何もなかった。\u300C百聞は一見にしかず\u300Dと言うけれど、この壺に関しては逆だった。見れば見るほど、人の手で造れるはずがないと思えてくる。あの弾痕は、伝説を信じたかった人間たちの記念碑として、今もそこにある。`,
    },
    {
      text: `しかし、本当の建造者はどんな精霊よりもすごかった。紀元前一世紀頃、ナバテア人\u2014\u2014遊牧民から中東随一の大商人へのし上がったアラブの民が、最も偉大な王アレタス四世のために王家の墓として削り出した。ギリシャ風の列柱、来世を守護する神々の像、魂を天へ運ぶ鷲。すべてが計算ずくだ。ペトラに続く狭い峡谷を抜けた瞬間、最初に目に飛び込んでくるのがこの壁面\u2014\u2014\u300Cここは誰の王国か\u300Dを、言葉なしに突きつけるためだった。`,
    },
    {
      text: `この建造物は、ヨーロッパ人の記憶から千年間消えていた。1812年、スイスの探検家ヨハン\u30FBルートヴィヒ\u30FBブルクハルトが\u300Cシェイク\u30FBイブラヒム\u300Dに変装して潜入した。この瞬間のために三年かけてアラビア語とコーランを学んだ男だ。口実は\u300C預言者ハルンの墓で山羊を捧げたい\u300D。案内人に導かれ、深さ九十メートルの峡谷を抜ける。目の前に宝物殿が現れた。案内人が静かに言った。\u300Cおまえは異教徒だな\u300D。ブルクハルトはすぐに引き返した\u2014\u2014だが彼はたった今、地球上で最も偉大な失われた都市のひとつを見つけたのだった。`,
    },
    {
      text: `2003年、考古学者たちが宝物殿の地下を掘った。六メートル下から現れたのは、伝説がずっと隠してきたものだった。黄金ではない\u2014\u2014墓だ。少なくとも十一体の遺骨、そして副葬品の陶器や香炉。2024年にはさらに十二体の遺骨が近くから見つかった。二千年間、誰にも触れられずに眠っていた。宝物殿は金庫ではなかった。最初から、王国で最も重要な人物たちが眠る墓だったのだ\u2014\u2014都に入るすべての者の目に触れる場所に、意図的に置かれた墓。`,
    },
    {
      text: `それでも伝説は死なない。スピルバーグは\u300E\u30A4\u30F3\u30C7\u30A3\u30FB\u30B8\u30E7\u30FC\u30F3\u30BA\uFF0F最後の聖戦\u300Fで、宝物殿を聖杯の隠し場所にした。実際の内部は小さくて、がらんとしていて、映画とはまるで別物だ。でも、そんなことはどうでもいい。夜明けの光が砂岩を照らし、壁全体が燃えるような色に染まる瞬間\u2014\u2014どんなに冷静な人間でも足を止める。もしかしたら精霊は本当にいたのかもしれない。もしかしたら黄金はまだあの中にある。誰よりも深い場所に。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════════════

async function push(label, item) {
  console.log(`\n⏳ Pushing ${label}...`);
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`✅ ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
  } catch (err) {
    console.error(`❌ ${label} FAILED:`, err);
    process.exit(1);
  }
}

async function main() {
  // Validate JSON structure before pushing
  for (const [label, item] of [["zh", zh], ["ja", ja]]) {
    if (!item.title || !item.paragraphs?.length || !item.moralOrLesson) {
      console.error(`❌ Validation failed for ${label}: missing required fields`);
      process.exit(1);
    }
    console.log(`✅ ${label} validated: ${item.paragraphs.length} paragraphs, title="${item.title}"`);
  }

  await push("Chinese (zh)", zh);
  await push("Japanese (ja)", ja);

  console.log("\n🎉 All versions pushed successfully!");
}

main();
