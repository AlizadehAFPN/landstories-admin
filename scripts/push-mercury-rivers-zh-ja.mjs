// Push Chinese (zh) and Japanese (ja) recreations of
// "The Mercury Rivers of the Underworld" (mercury-rivers-underworld)
// to the Story table.

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
  siteId: "terracotta-army",
  storyId: "mercury-rivers-underworld",
  icon: "\uD83C\uDF0A", // 🌊
  storyCategory: "riddles_past",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.3812, lng: 109.2541 },
  source: `Sima Qian, "Shiji"; 2003 Chinese Academy of Sciences mercury survey; Archaeological Institute of Shaanxi Province`,
  characters: [
    "Qin Shi Huang \u2014 the emperor who built the underworld",
    "Sima Qian \u2014 the historian who described it",
    "Modern scientists confirming the mercury",
  ],
  era: "210 BC \u2014 Qin Dynasty",
  updatedAt: now,
};

// ═════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — Modern Mandarin · Simplified · WeChat/podcast register
//
// This is CHINESE history — every reader knows 秦始皇, 司马迁, 《史记》.
// The challenge: make the deeply familiar feel electrifying again.
// Register: like a viral WeChat longform or a gripping podcast episode.
//
// Proverb: 三十年河东三十年河西
// (Thirty years east of the river, thirty years west — fortune is fickle)
// Subversion: Everyone says rivers shift over decades. But the mercury
// rivers beneath this tomb haven't shifted in 2,200 years.
// ═════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#mercury-rivers-underworld",

  title: `始皇帝的水银江山`,

  subtitle: `他在地下建造了一整个宇宙`,

  excerpt: `公元前100年左右，司马迁写了一句放在当时来看完全是天方夜谭的话：秦始皇的陵墓里，有一整套用真正的水银做成的河流。不是比喻，不是夸张\u2014\u2014是货真价实的液态水银，在地底下模拟出了整个中国的江河湖海。`,

  moralOrLesson: `有些被当成神话嘲笑了两千年的东西，到头来比任何虚构都更离奇。`,

  paragraphs: [
    {
      text: `公元前100年左右，有个叫司马迁的人写了一句话，放在当时来看完全是天方夜谭。他说秦始皇\u2014\u2014就是那个修了长城、造了兵马俑的千古一帝\u2014\u2014死后的陵墓里面有一整套用真正的水银做成的河流。不是比喻，不是夸张，是货真价实的液态水银，通过精密的机关驱动，在地底下模拟出了整个中国的江河湖海。`,
    },
    {
      text: `司马迁在《史记》里写得清清楚楚：\u201c以水银为百川江河大海，机相灌输。\u201d天花板上镶满宝石，模拟漫天星辰；地面铺成了整个帝国的微缩地图。头顶星河璀璨，脚下江山如画\u2014\u2014一个死人独享的私人宇宙。`,
    },
    {
      text: `这话一写就是两千多年，大部分人一直觉得司马迁在吹牛。水银做的河流？地底下的星空？听着也太像神话了。秦始皇陵就在西安临潼边上，一座76米高的封土堆，上面长着石榴树，路人天天经过。谁都知道它在那儿，但谁也没法证明里面到底藏了什么\u2014\u2014除非真把它刨开看看。`,
    },
    {
      text: `直到2003年，中国科学院的科学家决定换个思路：不开墓，直接测墓顶上方土壤的水银含量。结果出来以后，所有人都愣住了\u2014\u2014墓室正上方的水银浓度比周围地区高出整整一百倍。更离谱的是，水银的分布不是随机的，它的走向和密度精准地对应着中国几条主要河流在地图上的真实位置。`,
    },
    {
      text: `都说三十年河东三十年河西，可秦始皇地下的那些河，两千两百年了，愣是一滴没挪过。司马迁没有吹牛，他字字句句说的都是大实话。秦始皇真的在地下造了一个完整的宇宙\u2014\u2014水银铸成的江河复刻着帝国的水系，宝石拼成的星空对照着真实的夜幕，还有装了机关的弩机像一支幽灵军队，两千年如一日地守着入口。`,
    },
    {
      text: `更让人抓狂的是：这个墓，中国到现在都没有打开。水银有强大的杀菌防腐能力，里面的一切已经在浓密的水银蒸气中密封了两千两百多年。科学家最怕的就是一旦破土，外面的空气涌进去，所有文物可能在几分钟之内就灰飞烟灭。于是地球上最大的考古谜团就这么安安静静地搁着，谁也不敢碰。`,
    },
    {
      text: `有些学者相信墓里极有可能藏着大批竹简和文献\u2014\u2014足以改写中国上古史的那种。想想看，秦始皇是统一中国文字的人，他怎么可能不把书带进自己的来世？如果那些文书真的还在里面，它们已经在水银弥漫的永恒黑暗中被完美封存了整整两千年。而我们只能站在外面，干看着。`,
    },
    {
      text: `今天，秦始皇陵就在那儿，光天化日之下，谁都看得见。每年几十万游客排队进来，拍兵马俑的照片，买点纪念品，然后从那座安安静静、绿树成荫的山丘旁边走过去，连头都不回。他们不知道的是，就在他们脚下几十米深的黑暗里，中国第一位皇帝的水银河流\u2014\u2014也许直到此刻\u2014\u2014还在无声地流淌着。`,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — Modern Japanese · NHK documentary / popular nonfiction
//
// Japanese readers know 始皇帝 and 兵馬俑 well. Register: authoritative
// yet compelling, like a well-produced NHK special or popular nonfiction.
//
// Proverb: 石の上にも三年
// (Even sitting on a stone for three years will warm it — patience pays off)
// Subversion: This emperor has been sitting in mercury for 2,200 years
// and hasn't budged. That's not patience — that's permanence.
// ═════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#mercury-rivers-underworld",

  title: `始皇帝の水銀河`,

  subtitle: `地下に宇宙を造った皇帝の墓`,

  excerpt: `紀元前100年ごろ、司馬遷という歴史家がとんでもないことを書き残した。始皇帝の墓の中に、本物の水銀でできた河が流れている、と。比喩ではない。液体の水銀を機械仕掛けで循環させ、中国全土の河川を地下に再現したというのだ。`,

  moralOrLesson: `何千年も神話だと笑われてきた話が、実はどんなフィクションよりも奇妙な真実だったということもある。`,

  paragraphs: [
    {
      text: `紀元前100年ごろ、司馬遷という歴史家がとんでもないことを書き残した。中国初の統一皇帝・始皇帝\u2014\u2014万里の長城を築き、兵馬俑を従えたあの男\u2014\u2014その墓の中に、本物の水銀でできた河が流れている、と。比喩ではない。液体の水銀を機械仕掛けで循環させ、中国全土の河川を地下に再現したというのだ。`,
    },
    {
      text: `司馬遷は中国最大の歴史書\u300e史記\u300fにこう記している。\u300c水銀をもって百川・江河・大海をかたどり、機械によって注ぎ流す\u300d。天井には宝石を散りばめて星空を模し、床には帝国の精密な地図が広がる。頭上に銀河、足元に山河\u2014\u2014死者ひとりのために造られた、完全なる地下宇宙だ。`,
    },
    {
      text: `二千年以上、ほとんどの人はこの記述を大げさな伝説だと思っていた。水銀の河？地下の星空？どう聞いても神話だ。始皇帝陵はずっとそこにあった\u2014\u2014西安郊外の、高さ76メートルの丘。表面にはザクロの木が茂り、場所は誰でも知っている。だが中に何があるのか、開けてみなければ誰にもわからなかった。`,
    },
    {
      text: `2003年、中国科学院の研究チームが画期的なアプローチをとった。墓を開けずに、真上の土壌から水銀濃度を測定したのだ。結果は衝撃的だった。墓室の直上の水銀レベルは、周辺地域の最大100倍。しかも水銀の分布はランダムではなく、中国の主要河川の実際の地理的配置と正確に一致していた。`,
    },
    {
      text: `\u300c石の上にも三年\u300dというが、この皇帝は水銀の海の底で二千二百年、微動だにしていない。そして司馬遷の記述は、一文字たりとも嘘ではなかった。始皇帝は本当に地下に宇宙を造っていたのだ\u2014\u2014水銀で帝国の河川を再現し、宝石で夜空の星座を写し取り、侵入者を自動で射抜く弓の仕掛けに入口を守らせた。`,
    },
    {
      text: `驚くべきことに、中国政府はいまだにこの墓を開いていない。水銀には強力な殺菌・防腐作用があり、内部のあらゆるものが二千二百年以上にわたって水銀蒸気の中で保存されてきた。開封した瞬間、外気に触れてすべてが数分で崩壊する恐れがある。こうして地球上最大の考古学的謎は、手つかずのまま眠り続けている。`,
    },
    {
      text: `一部の研究者は、墓の中に大量の竹簡や文献が眠っている可能性を指摘している。始皇帝は中国の文字を統一した人物だ\u2014\u2014来世に書物を持ち込まないはずがない。もしそれが本当なら、古代中国の歴史を書き換えるほどの資料が、水銀に満たされた暗闇の中で二千年間、完璧な状態で封じ込められていることになる。そして、我々はそれに触れることすらできない。`,
    },
    {
      text: `今日も始皇帝陵はそこにある。白日の下、誰の目にも見える場所に。毎年何十万人もの観光客が訪れ、兵馬俑の写真を撮り、土産物を買い、あの静かな緑の丘のそばを何気なく通り過ぎていく。その足元の深い闇の中で、中国最初の皇帝が造った水銀の河が\u2014\u2014おそらく今この瞬間も\u2014\u2014音もなく流れ続けていることを知らずに。`,
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────────────

const stories = [
  { label: "Chinese (zh)", data: zh },
  { label: "Japanese (ja)", data: ja },
];

for (const { label, data } of stories) {
  try {
    // Validate: every paragraph must have text
    for (let i = 0; i < data.paragraphs.length; i++) {
      if (!data.paragraphs[i].text || data.paragraphs[i].text.trim() === "") {
        throw new Error(`Paragraph ${i + 1} has empty text`);
      }
    }

    await doc.send(new PutCommand({ TableName: TABLE, Item: data }));
    console.log(`\u2705 ${label} pushed successfully (${data.langStoryId})`);
  } catch (err) {
    console.error(`\u274c ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log("\nBoth stories pushed to Story table.");
