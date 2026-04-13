// Push Chinese (zh) and Japanese (ja) recreations of
// "The Stones That Should Not Exist" to the Story DynamoDB table.
//
// Chinese proverb subversion: 事不过三 (nothing goes past three)
//   → "事不过三？罗马人显然没听过这话。"
//
// Japanese proverb subversion: 石の上にも三年 (patience on a stone for 3 years)
//   → The stones have waited 2000 years and still haven't revealed everything.

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
  siteId: "baalbek",
  storyId: "stones-that-should-not-exist",
  icon: "\u{1FAA8}",
  storyCategory: "mysteries_enigmas",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.0069, lng: 36.2039 },
  source:
    "Adam, Jean-Pierre. 'A propos du trilithon de Baalbek,' Syria Vol. 54, 1977; Abdul Massih, Jeanine & German Archaeological Institute, 2014 excavation reports; Kalayan, Haroutune. 'The Engraved Drawing on the Trilithon,' 1969; Twain, Mark. The Innocents Abroad, 1869; Archaeology Magazine, March/April 2015; Guinness World Records, Largest Megalith from Antiquity",
  era: "c. 27 BCE \u2013 60 CE (Trilithon construction); 2014 (discovery of the largest carved stone in history)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 事不过三 — nothing goes past three / three strikes and you're out.
// Subversion: The Romans clearly never heard that rule.
// Register: Modern Mandarin, WeChat-article / popular-podcast storytelling.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#stones-that-should-not-exist",

  title: `不该存在的巨石`,

  subtitle: `黎巴嫩墙壁里的八百吨巨石困惑了世人两千年\u2014\u2014而采石场深处，还藏着一块更大的`,

  excerpt: `黎巴嫩的一面墙里，嵌着三块石头。每块八百吨。拼接得刀片都插不进去。没有水泥，没有灰浆。几千年来，没人能解释。`,

  moralOrLesson: `衡量野心的标准，从来不是你完成了多少，而是你敢于开始什么。罗马人在采石场留下了人类有史以来雕出的最大石头\u2014\u2014没完工。两千年过去了，它还在让所有看到它的人发问：他们当初到底想造什么。`,

  characters: [
    `让-皮埃尔\u00B7亚当（法国建筑考古学家）`,
    `珍妮\u00B7阿卜杜勒\u00B7马西赫博士（黎巴嫩大学考古学家）`,
    `罗马赫利奥波利斯殖民地的工程师们`,
    `传说中的孕妇`,
    `马克\u00B7吐温（美国作家，1867年到访）`,
  ],

  paragraphs: [
    {
      text: `黎巴嫩的巴勒贝克有一面墙，墙里嵌着三块石头。每一块重八百吨。它们是朱庇特神庙的地基\u2014\u2014整个罗马帝国有史以来建造的规模最大的神殿。这三块石头拼合得严丝合缝，刀片都插不进去。没有水泥，没有灰浆，纯靠石灰岩与石灰岩紧紧贴合，凭重力和无名工匠的技艺死死咬住彼此。`,
    },
    {
      text: `几千年来，没有人能解释这些石头是怎么到那儿的。谜团太大了，大到把所有合理的答案都吞了进去。阿拉伯传说中，这座城是亚当的儿子该隐建造的，帮手是远古巨人。伊斯兰传统把功劳归于所罗门王\u2014\u2014据说他命令一种叫\u201C精灵\u201D的超自然生物搬运了巨石。等到了十九世纪，一位英国探险家煞有介事地提出了自己的理论：史前大象充当了活体起重机。`,
    },
    {
      text: `1867年，马克\u00B7吐温来到巴勒贝克，盯着那面墙看了很久，然后在游记里写道：\u201C这些巨石究竟怎么从采石场运到这里，是没有人解开过的谜。\u201D他一个字都没夸张。采石场在八百米外。两千年前，没有发动机，没有钢铁，没有任何一种轮子扛得住这个重量\u2014\u2014八百吨的石块就这么跨过了那段距离。然而它们就稳稳地待在那里，像是一直在那儿似的。`,
    },
    {
      text: `1977年，答案来了。法国建筑师让-皮埃尔\u00B7亚当算了一笔账：十六台绞盘，每台三十二人转动，用麻绳和滑轮连接，总共五百一十二个工人。采石场到神庙的地面微微下倾\u2014\u2014重力帮了忙。那些令人抓狂的完美接缝？罗马人的独门绝技：只把每块石头的边缘磨到绝对平整。没有外星人，没有巨人，只不过是罗马人做了罗马人该做的事。`,
    },
    {
      text: `然而采石场里藏着更大的秘密。有一块半埋在地下的巨石，在原地安安静静躺了两千年。当地人叫它\u201C孕妇之石\u201D。足足一千吨\u2014\u2014比墙里那三块都重。它几乎已经从基岩上完全切割下来了，却从未被移动过一步。也许是在开采中裂了一道致命的缝，也许是一场瘟疫席卷了工地，也许是预算烧光了。没人知道真正的原因。`,
    },
    {
      text: `这个名字来自一个传说。一位怀孕的女人告诉巴勒贝克的居民：她知道移动那块不可能之石的秘诀\u2014\u2014条件是养她到孩子出生。大家答应了。她安安稳稳吃了九个月。等孩子生下来，她坦白说自己完全不知道怎么搬。这大概是民间故事史上最精彩的一次忽悠。`,
    },
    {
      text: `事不过三？罗马人显然没听过这话。2014年，黎巴嫩大学考古学家珍妮\u00B7阿卜杜勒\u00B7马西赫带领团队在孕妇之石下方发掘，铲子忽然碰到了谁都没有预料到的东西\u2014\u2014又一块巨石，比已知的人类雕凿过的任何石头都要大。将近二十米长，六米宽，超过五米高。一千六百五十吨\u2014\u2014比四架满载的波音747加在一起还重。人类历史上最大的人工石材，从凯撒的时代起，就一直安静地藏在地下。`,
    },
    {
      text: `他们甚至还没挖到底。马西赫站在采石场里说：\u201C我们根本不知道它完整的尺寸。\u201D两千年前，罗马工程师看着这块岩石，心想：这个能用。他们塑造了它，打磨了每一面，为运输做好了一切准备\u2014\u2014然后头也不回地走了，再也没回来。但他们留下的不是一座失败的纪念碑。恰恰相反：人类双手从岩石中凿出过的最庞大的造物，本身就是证据\u2014\u2014它原本是要去成就某件更宏大的事。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 石の上にも三年 — sit on a stone for three years and it warms up
//   (patience and persistence pay off).
// Subversion: These stones have waited 2000 years and still haven't
//   revealed everything. Patience doesn't begin to cover this.
// Register: Natural modern Japanese. NHK documentary / popular nonfiction.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#stones-that-should-not-exist",

  title: "あるはずのない巨石",

  subtitle:
    "八百トンの石が二千年間、世界を困惑させた\u2014\u2014そして石切り場は、さらに大きな秘密を隠していた",

  excerpt:
    "レバノンの壁に、三つの石。一つ八百トン。カミソリの刃も通さないほど精密に組み合わされている。モルタルもセメントもなし。何世紀もの間、誰にも説明できなかった。",

  moralOrLesson:
    "野心の真の尺度は、何を完成させたかではなく、何を始める勇気があったかだ。ローマ人は史上最大の未完成の石を石切り場に残した。二千年後の今も、私たちはまだ考えている\u2014\u2014彼らは何を造ろうとしていたのだろう、と。",

  characters: [
    "ジャン＝ピエール・アダン（フランスの建築考古学者）",
    "ジャニーヌ・アブドゥル・マッシー博士（レバノン大学の考古学者）",
    "コロニア・ヘリオポリスのローマ技師たち",
    "伝説の妊婦",
    "マーク・トウェイン（アメリカの作家、1867年来訪）",
  ],

  paragraphs: [
    {
      text: "レバノンのバールベクに、一枚の壁がある。その中に、三つの石が収まっている。一つあたりの重さは八百トン。ローマ帝国が建てた最大の宗教建築、ユピテル神殿の土台だ。三つの石は寸分の隙間もなく組み合わされ、カミソリの刃すら通さない。モルタルもセメントも使われていない。石灰岩と石灰岩が向き合い、重力と名も残さなかった技師たちの腕だけで、二千年間そこに留まり続けている。",
    },
    {
      text: "何世紀もの間、誰もこの石をどう運んだのか説明できなかった。謎があまりに巨大すぎて、あらゆる合理的な説明を飲み込んでしまったのだ。アラビアの伝説では、この都市を建てたのはアダムの息子カインで、巨人たちが手を貸したという。イスラムの伝承では、ソロモン王が超自然的な存在\u2014\u2014ジンと呼ばれる精霊\u2014\u2014に命じて石を運ばせたとされる。十九世紀には、あるイギリスの探検家が大真面目にこう主張した。先史時代の象がクレーン代わりに使われた、と。",
    },
    {
      text: "一八六七年、マーク・トウェインがバールベクを訪れた。あの壁をじっと見つめた末に、旅行記にこう書き残している。「これほどの巨石がどうやって石切り場から運ばれたのか、解き明かした者はいない」。大げさでも何でもなかった。石切り場は神殿から約八百メートル離れている。エンジンもなく、鉄鋼もなく、この重量に耐えられる車輪もなかった二千年前に、八百トンの石がその距離を渡った。なのに石はそこにある。何食わぬ顔で。",
    },
    {
      text: "答えが出たのは一九七七年。フランスの建築家ジャン＝ピエール・アダンが計算した。十六基の巻き上げ機に、それぞれ三十二人の作業員。麻のロープと滑車で繋ぎ、合計五百十二人。石切り場から神殿までの地面はわずかに下り坂になっていて、重力が味方した。あの信じがたいほど精密な接合面の秘密は？ローマ人の技術だ。石の縁だけを完璧に研磨する。宇宙人でもなく、巨人でもない。ただローマ人がローマ人らしい仕事をしただけだった。",
    },
    {
      text: "だが石切り場には、もっと大きな秘密が眠っていた。二千年もの間、半ば地中に埋もれたまま横たわる巨石。地元の人々は「妊婦の石」と呼ぶ。重さ千トン\u2014\u2014壁に収まった三つの石よりさらに重い。基盤の岩からほぼ切り出されていたが、一度も動かされることはなかった。採掘中にひびが入ったのかもしれない。疫病が襲ったのかもしれない。資金が尽きたのかもしれない。真相は誰にもわからない。",
    },
    {
      text: "「妊婦の石」という名には伝説がある。ある妊婦がバールベクの住民に告げた。あの動かせるはずのない石を動かす方法を知っている\u2014\u2014ただし、子どもが生まれるまで食べさせてほしい、と。人々は承諾した。彼女は九ヶ月間、十分に食べた。出産の日、彼女はあっさり白状した。「まったくわかりません」。民間伝承史上、最も見事なハッタリかもしれない。",
    },
    {
      text: "「石の上にも三年」と言うが、バールベクの石は二千年待っても、まだすべてを明かしてはいなかった。二〇一四年、考古学者ジャニーヌ・アブドゥル・マッシーが率いるチームが妊婦の石の下を掘り進めたとき、誰も予想しなかったものに突き当たった\u2014\u2014もう一つの巨石だ。人類が刻んだあらゆる石を超える大きさ。長さ約二十メートル、幅六メートル、高さ五メートル以上。千六百五十トン。満載のボーイング747四機分より重い。人類史上最大の加工石材が、皇帝たちの時代からずっと地中に隠れていた。",
    },
    {
      text: "発掘チームは底にすら達していなかった。アブドゥル・マッシーは石切り場に立ち、こう言った。「全体の大きさは、まだわかっていません」。二千年前、ローマの技師たちはこの岩を見て、思った\u2014\u2014使える、と。彼らは形を整え、表面を磨き、運搬の準備を進めた。そして永遠に立ち去った。彼らが残したのは失敗の記念碑ではない。人間の手が岩から削り出した最も巨大なものは、さらに巨大な何かのために生まれた\u2014\u2014その証だ。",
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────────────
async function push(item, label) {
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`\u2705  ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
  } catch (err) {
    console.error(`\u274C  ${label} FAILED:`, err);
    process.exit(1);
  }
}

(async () => {
  await push(zh, "Chinese (zh)");
  await push(ja, "Japanese (ja)");
  console.log("\nDone. Both records written to Story table.");
})();
