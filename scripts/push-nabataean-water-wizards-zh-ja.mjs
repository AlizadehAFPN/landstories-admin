// Push Chinese and Japanese recreations of "The Water Wizards of Petra"
// to the Story DynamoDB table.
//
// Chinese proverb subverted: 上善若水 (The highest good is like water — Laozi)
//   → The Nabataeans didn't flow like water — they COMMANDED it into power
// Japanese proverb subverted: 水を制する者は天下を制す (Control water, control the world)
//   → The Nabataeans proved this literally, 2000 years before anyone else

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
  storyId: "nabataean-water-wizards",
  icon: "\u{1F4A7}",
  storyCategory: "builders_wonders",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 30.3285, lng: 35.4444 },
  source:
    "Diodorus Siculus, Bibliotheca Historica XIX.94-95 (c. 60-30 BC); Ortloff, Charles R. 'The Water Supply and Distribution System of the Nabataean City of Petra,' Cambridge Archaeological Journal 15:1, 2005; Bedal, Leigh-Ann. 'A Pool Complex in Petra\u2019s City Center,' BASOR 324, 2001; Jungmann, Niklas. 'Rediscovering the Ain Braq Aqueduct,' Levant, 2025; National Geographic, 'Petra\u2019s Ancient Technology and Climate Change,' 2024",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — Simplified Mandarin
// Register: Popular WeChat article / podcast — punchy, vivid, conversational
// Proverb: 上善若水 (Laozi) — subverted: they didn't flow like water, they
//          turned water into power, secrecy, and a trump card that made Rome bow
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#nabataean-water-wizards",

  title: `驭水之城`,

  subtitle: `两千年前，一群沙漠游牧民在地球最干旱的地方建起了喷泉和泳池`,

  excerpt: `佩特拉的年降雨量还不如撒哈拉的某些地方。可两千年前，纳巴泰人硬是在这里建了一座三万人的城市\u2014\u2014有喷泉、有泳池、有花园。他们不是找到了水，而是凭空造出了水。`,

  moralOrLesson: `最伟大的文明不是靠征服和黄金建造的，而是靠驾驭那些看不见的力量。而最危险的财富，不是敌人看得见的宝藏，而是他们永远找不到的隐秘资源。`,

  characters: [
    `纳巴泰工程师们（无名天才）`,
    `国王阿雷塔斯四世`,
    `狄奥多罗斯（希腊历史学家）`,
    `安提柯一世（入侵失败的将军）`,
    `贝达尔（考古学家）`,
  ],

  era: `约公元前300年\u2013公元363年（纳巴泰供水系统）；公元前312年（安提柯入侵）；1963年（山洪灾难）`,

  paragraphs: [
    {
      text: `佩特拉一年的降雨量才一百五十毫米，比撒哈拉的某些地方还少。两千年前，纳巴泰人在这里建起了一座三万人的城市。不是沿河建的，不是靠湖建的，就在地球上最干旱的沙漠正中央。有喷泉，有水池，有花园。他们不是找到了水源\u2014\u2014他们用技术造出了水，而且早在西方文明给\u201C流体力学\u201D取名之前，就已经精通了它。`,
    },
    {
      text: `他们最厉害的武器不是管道，是保密。公元前312年，希腊军队来抢劫。第一波得手了，纳巴泰人追上去全歼。更大的一波来了，纳巴泰人直接消失在沙漠里。希腊人渴得快死，求和撤退。秘密？荒漠各处埋着密封水库，伪装得谁也找不着。沙漠不是他们的弱点\u2014\u2014沙漠就是他们最坚固的城墙。`,
    },
    {
      text: `佩特拉的命脉是七公里外的\u201C摩西之泉\u201D。纳巴泰人用两套并行系统把水引过一公里长的锡克峡谷：一侧凿石渠，另一侧铺精密接口的陶管。峡谷口建了大坝和隧道，专把山洪引到城外。1963年，一场洪水在锡克峡谷夺走二十二条人命\u2014\u2014而纳巴泰人两千年前就解决了这个问题。`,
    },
    {
      text: `光活着可不行，还得炫。1998年，考古学家贝达尔挖了一块老地图标注为\u201C下市场\u201D的地方。不是市场。是个天堂花园：四十三米长的水池中央有座岛上凉亭，想过去只能游过去。沙漠里造了一座带岛的湖。来访的罗马官员秒懂潜台词\u2014\u2014能在这种地方建出这玩意的人，你最好别惹。`,
    },
    {
      text: `城中心有座公共喷泉叫\u201C水神殿\u201D，供三万人使用。2025年，柏林洪堡大学的容曼在山里发现了一条一百一十六米的铅质加压管道\u2014\u2014反虹吸系统，先把水往上推，再让它顺坡流下来。此前学界认为这种技术只存在于罗马建筑内部。纳巴泰人两千年前就在野外用上了。`,
    },
    {
      text: `老子说\u201C上善若水\u201D。纳巴泰人大概没读过\u300A道德经\u300B，但他们才是真正读懂了水的人\u2014\u2014不是随波逐流那种懂，是把水变成权力、变成秘密、变成连罗马帝国都甘拜下风的底牌。公元106年罗马接管佩特拉，做了一件几乎史无前例的事：原封不动保留纳巴泰人的供水系统。罗马的惯例是到哪儿都铺自家工程。但在佩特拉，他们看了一圈，承认了\u2014\u2014我们做不到更好。`,
    },
    {
      text: `公元363年5月19日，大地震把一切摧毁。管道断裂，水渠坍塌，五百年的工程一瞬归零。本来可以重建\u2014\u2014但世界变了。贸易路线转到了海上，让佩特拉富起来的商队不再来了。没钱没人，没人修系统。没了水，佩特拉死了。水池填满了沙，管道化为碎片，沙漠收回了纳巴泰人从它手里偷走的一切。`,
    },
    {
      text: `今天洪水仍在锡克峡谷肆虐。2022年一天下了半年的雨，一千七百名游客紧急撤离。古老的大坝只剩残垣，却在无声证明一件事：水不只是用来喝的。它是权力，是秘密，是一座王国与一片废墟之间唯一的分界线。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — Natural modern Japanese
// Register: NHK Special documentary / popular nonfiction — compelling, precise
// Proverb: 水を制する者は天下を制す — subverted: the Nabataeans embodied this
//          literally, proving control of water > military conquest
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#nabataean-water-wizards",

  title: `砂漠の錬水術`,

  subtitle: `二千年前、砂漠の遊牧民が人類史上最も精巧な水道を築き、その秘密で帝国を退けた`,

  excerpt: `ペトラの年間降水量はサハラ砂漠の一部よりも少ない。それでも二千年前、ナバテア人はここに三万人の都市を築いた\u2014\u2014噴水、プール、庭園つきで。彼らは水を見つけたのではない。水を生み出したのだ。`,

  moralOrLesson: `最も偉大な文明は征服や黄金の上ではなく、目に見えないものを支配する力の上に築かれる。そして最も危険な富とは、敵に見える財宝ではなく、敵が決して見つけられない秘密の資源なのだ。`,

  characters: [
    `ナバテア人の技術者たち（無名の天才）`,
    `アレタス四世（ナバテア王）`,
    `ディオドロス\u30FBシクルス（ギリシャの歴史家）`,
    `アンティゴノス一世（侵攻に失敗した将軍）`,
    `リー\u30FBアン\u30FBベダル（考古学者）`,
  ],

  era: `紀元前300年頃\u301C紀元363年（ナバテアの水道システム）、紀元前312年（アンティゴノスの侵攻）、1963年（鉄砲水災害）`,

  paragraphs: [
    {
      text: `年間降水量わずか150ミリ。サハラ砂漠の一部よりも少ない。二千年前、ナバテア人はそんな場所に三万人が暮らす都市を築いた。川沿いではない。湖のほとりでもない。地球上で最も乾いた砂漠のど真ん中だ。噴水があり、プールがあり、庭園まであった。彼らは水を発見したのではない\u2014\u2014水を\u300C発明\u300Dしたのだ。西洋が流体力学という概念に名前をつける何世紀も前に、彼らはその技術を完成させていた。`,
    },
    {
      text: `最強の武器はパイプラインではなく、秘密保持だった。紀元前312年、ギリシャ軍が略奪に来た。最初の襲撃は成功したが、ナバテア人は追撃して壊滅させた。さらに大軍が来ると、彼らは砂漠に姿を消した。渇きに耐えかねたギリシャ兵は和平を求めて撤退するしかなかった。理由は単純だ。荒野の各所に密封された地下貯水槽が隠されていた。場所を知るのはナバテア人だけ。砂漠は弱点ではなかった\u2014\u2014砂漠そのものが難攻不落の要塞だった。`,
    },
    {
      text: `都市の生命線は7キロ先の\u300Cモーセの泉\u300Dだった。ナバテア人はこの水を全長1キロのシーク峡谷を通して引いた。片側の崖面に石の水路を刻み、反対側には精密な継ぎ手を持つ陶製パイプを敷設。峡谷の入口にはダムとトンネルを設け、鉄砲水を迂回させた。1963年、このシーク峡谷で鉄砲水が22人の観光客の命を奪っている\u2014\u2014ナバテア人が二千年前に解決していた問題だ。`,
    },
    {
      text: `だが生き延びるだけでは物足りなかった。見せつける必要があった。1998年、考古学者ベダルが古地図で\u300C下の市場\u300Dと記された場所を発掘した。市場ではなかった。全長43メートルのプールの中央に島が浮かび、そこに東屋が建つ楽園庭園だった。島に渡る手段は泳ぐしかない。砂漠のど真ん中に、島付きの人工湖。訪れたローマの使節なら即座に理解しただろう\u2014\u2014この民には手を出すな、と。`,
    },
    {
      text: `\u300C水を制する者は天下を制す\u300Dという言葉がある。ナバテア人はその格言を二千年前に文字通り体現していた。都市の中心にはニンファエウムと呼ばれる大型公共噴水があり、三万人の暮らしを支えていた。2025年、フンボルト大学のユングマン研究員が山中で116メートルの加圧鉛管を発見した。逆サイフォンという仕組みで、水を上り坂に押し上げてから反対側へ流す。この技術はローマの建物内部にしかないと思われていた。ナバテア人は二千年前、屋外の山岳地帯でそれを実現していたのだ。`,
    },
    {
      text: `紀元106年、ローマがペトラを併合した時、前代未聞のことが起きた。征服者がナバテア人の水道システムをそのまま残したのだ。ローマは征服した土地に自国の工学を上書きすることで知られていた。だがペトラでは、既存のシステムを前にして認めざるを得なかった\u2014\u2014これ以上のものは我々には造れない、と。ナバテア人のパイプはその後二世紀にわたって水を送り続けた。`,
    },
    {
      text: `西暦363年5月19日、大地震が襲った。パイプラインは断裂し、水路は崩落し、五百年分の水道工学が数分で瓦解した。再建は可能だったが、世界は変わっていた。交易路は海に移り、ペトラを潤したキャラバンは途絶えた。資金も人手もなく、誰も修復しなかった。水を失ったペトラは死んだ。プールは砂に埋もれ、パイプは朽ち、砂漠はナバテア人が奪ったものを静かに取り返した。`,
    },
    {
      text: `今もシーク峡谷では鉄砲水が猛威を振るう。2022年には半年分の雨が一日で降り、1700人の観光客が緊急避難した。古代のダムは廃墟となって沈黙している。だがその沈黙は一つの真実を語っている\u2014\u2014水はただの飲み物ではない。それは権力であり、秘密であり、王国と廃墟を隔てるたった一つの境界線なのだ。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════════════

async function push(label, item) {
  console.log(`\n\u23F3 Pushing ${label}...`);
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`\u2705 ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
  } catch (err) {
    console.error(`\u274C ${label} FAILED:`, err);
    process.exit(1);
  }
}

async function main() {
  // Validate JSON structure before pushing
  for (const [label, item] of [["zh", zh], ["ja", ja]]) {
    if (!item.title || !item.paragraphs?.length || !item.moralOrLesson) {
      console.error(`\u274C Validation failed for ${label}: missing required fields`);
      process.exit(1);
    }
    // Validate every paragraph has text
    for (let i = 0; i < item.paragraphs.length; i++) {
      if (!item.paragraphs[i].text) {
        console.error(`\u274C Validation failed for ${label}: paragraph ${i} missing text`);
        process.exit(1);
      }
    }
    console.log(`\u2705 ${label} validated: ${item.paragraphs.length} paragraphs, title="${item.title}"`);
  }

  await push("Chinese (zh)", zh);
  await push("Japanese (ja)", ja);

  console.log("\n\uD83C\uDF89 All versions pushed successfully!");
}

main();
