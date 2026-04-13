/**
 * Push "The Workers' Village Discovery" recreated in zh, ja
 * to the Story DynamoDB table.
 *
 * Chinese proverb subverted: 三人成虎 (three people make a tiger —
 *   a lie repeated enough becomes truth)
 * Japanese proverb subverted: 百聞は一見にしかず (seeing once beats
 *   hearing a hundred times)
 *
 * Run: node scripts/push-workers-village-zh-ja.mjs
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared (unchanged) fields from the English record ───────────────
const shared = {
  siteId: "great-pyramids-giza",
  storyId: "workers-village-discovery",
  characters: [
    "Mark Lehner (Archaeologist)",
    "Zahi Hawass (Egyptologist)",
    "The Pyramid Workers",
  ],
  coordinates: { lng: 31.135, lat: 29.971 },
  disabled: false,
  era: "Old Kingdom (rediscovered 1990)",
  hasAudio: false,
  icon: "⚒️",
  image: "",
  isFree: true,
  readingTimeMinutes: 3,
  source:
    "Lehner, Mark. The Complete Pyramids. Thames & Hudson, 1997; Hawass, Zahi. Mountains of the Pharaohs, 2006",
  storyCategory: "crowns_conquests",
  thumbnail: "",
  tier: "A",
  updatedAt: NOW,
};

// ═════════════════════════════════════════════════════════════════════
// CHINESE (zh) — Simplified Mandarin
// Proverb subverted: 三人成虎
// ═════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#workers-village-discovery",
  title: `金字塔下的真相`,
  subtitle: `一次意外，推翻了延续两千年的谎言`,
  excerpt: `两千多年来，全世界都信了同一个故事：金字塔是奴隶建的。直到1990年，一匹马在沙漠里绊了一跤。`,
  moralOrLesson: `真相可能要等几千年才浮出水面，但真实的故事，往往比取代它的谎言更加动人。`,
  paragraphs: [
    {
      text: `两千多年来，全世界都信了同一个故事：金字塔是奴隶建的。最早这么说的，是古希腊历史学家希罗多德——他写的时候，金字塔已经建成两千年了。他说法老胡夫强迫十万人做苦力。好莱坞后来把这当成了经典画面：锁链、鞭子、囚犯在烈日下拖石头。《圣经》里以色列人在埃及为奴的故事，也不知什么时候混进了金字塔传说。到了20世纪，没人再质疑——\u201C金字塔是奴隶造的\u201D，就是常识。三人成虎，一个谎言被重复两千五百年，比真理还真。但这个\u201C常识\u201D，从头到尾都是错的。`,
    },
    {
      text: `1990年，一个美国游客在狮身人面像附近骑马。马蹄突然绊到一截露出沙面的矮墙——泥砖砌的，离狮身人面像大概四百米。看着就是沙漠里随处可见的破砖烂瓦，压根不起眼。但就是这一绊，把全世界对金字塔建造者的认知，彻底踩碎了。`,
    },
    {
      text: `考古学家马克\u00B7莱纳和扎希\u00B7哈瓦斯带队发掘。挖出来的东西让所有人傻眼：沙子底下埋着一座规划完整的城镇。宿舍、面包房、酿酒坊、鱼类加工车间、铜器作坊，甚至还有医院——里面留着精心治疗伤病的痕迹。这哪是什么奴隶营？这是一座能住两万人的正经城市，每个细节都在说同一句话：让工人吃好住好，保持最佳状态。`,
    },
    {
      text: `这些工人吃牛肉。在古埃及，牛肉是奢侈品，奴隶连想都别想。日常口粮是面包和啤酒——标准的自由劳动者待遇。受了伤有人治：骨折被正规接好，甚至有人截肢后又活了好几年。没人会花这种精力去救一个奴隶。只有真正看重的人，才值得拼命救回来。`,
    },
    {
      text: `真正一锤定音的是墓葬。很多工人有自己的墓——不大，但规规矩矩——就建在金字塔旁边。在古埃及，让奴隶葬在法老圣体附近？绝不可能。更绝的是，有些墓碑上刻着工队名号：\u201C胡夫之友\u201D\u201C门卡拉的醉鬼\u201D。这哪是奴隶会起的名字？这分明是工友之间才有的那种又骄傲又带劲的绰号——古今中外，哪个工地不是这样？`,
    },
    {
      text: `真相比所有人想的都要震撼。金字塔是一项国家工程——不是死刑，更像服兵役。工人从埃及各地的村庄轮流上岗，每次三个月，以劳动抵税。工队之间互相较劲，对手艺极其自豪。干完活回家的时候，他们知道自己亲手参与了整个文明中最神圣的建筑。这不是惩罚——这是一个普通埃及人离神最近的机会。`,
    },
    {
      text: `一匹马绊了一跤，一个持续两千五百年的谎言轰然倒塌。金字塔不是残酷的产物——它靠的是信仰、技术，和让人叹为观止的组织能力。千百万人不是被鞭子赶着去的，他们是自己排着队，争着去参与一件比自己更伟大的事。而他们建起来的东西，比之后每一个帝国都活得更久。`,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — Modern Japanese
// Proverb subverted: 百聞は一見にしかず
// ═════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#workers-village-discovery",
  title: "砂に埋もれていた真実",
  subtitle: "ピラミッド「奴隷建設」の神話を覆した偶然の発見",
  excerpt:
    "2000年以上、世界中がひとつの嘘を信じてきた——ピラミッドは奴隷が建てた。1990年、一頭の馬のつまずきが、すべてを変えた。",
  moralOrLesson:
    "真実が明らかになるまでに何千年もかかることがある。だが本当の物語は、それに取って代わった神話よりも、ずっと心を打つものだ。",
  paragraphs: [
    {
      text: "2000年以上にわたって、世界中がひとつの嘘を信じてきた。古代ギリシャの歴史家ヘロドトスが、ピラミッド完成からおよそ2000年後に書き残した記録——「ファラオ・クフ王は10万人を奴隷として強制労働させた」。ハリウッドはこれを映画の定番に仕立て上げた。鎖につながれた囚人が灼熱の砂漠で巨石を引きずり、監督官が背後で鞭を振り下ろす。旧約聖書に描かれたイスラエル人のエジプト奴隷時代も、いつしかピラミッド伝説と混ざり合った。20世紀に入る頃には、もう誰も疑わなかった。「ピラミッドは奴隷の血と涙で建てられた」——それが常識だった。だが、その常識は丸ごと間違っていた。",
    },
    {
      text: "1990年、スフィンクスの南およそ400メートル。アメリカ人観光客が乗っていた馬が、砂から顔を出していた低い壁につまずいた。日干しレンガの、何の変哲もない遺構だ。砂漠にはこんなものがいくらでもある。だが、この一頭の馬のつまずきが、2500年にわたる「常識」を根底から覆すことになる。",
    },
    {
      text: "考古学者マーク・レーナーとザヒ・ハワスが発掘に乗り出した。掘れば掘るほど、驚きは増すばかりだった。砂の下に、計画的に設計された都市がまるごと眠っていたのだ。宿舎、パン工房、ビール醸造所、魚の加工施設、銅の工房——そして病院。骨折を正確に接合した痕跡や、高度な外科手術を受けた骨が見つかった。奴隷の収容所ではない。最大2万人が暮らせるように設計された、本物の町だった。",
    },
    {
      text: "住人たちの食生活がさらに衝撃的だった。牛肉を食べていたのだ。古代エジプトで牛肉は最高級の贅沢品で、奴隷の口に入ることなどありえない。日常の主食はパンとビール——自由な労働者に支給される標準的な食事だ。怪我をすれば、きちんと治療を受けていた。骨折した腕は正確に固定され、四肢の切断手術の後も何年も生き延びた人さえいた。使い捨ての奴隷に、ここまで手をかける理由はない。大切にされていたのだ——かけがえのない人材として。",
    },
    {
      text: "そして、決定的な証拠が現れた。多くの労働者が自分専用の墓を持っていた。小さいが丁寧に造られ、ピラミッドのすぐ近くに建てられていた。古代エジプトで、ファラオの聖なる遺体の傍らに奴隷を葬る？ありえない。さらに墓碑銘には作業チームの名前が刻まれていた——「クフの友」「メンカウラーの酔っ払いたち」。苦しみの叫びなどではない。仲間同士が誇りを込めてつけた、ちょっとふざけたチーム名だ。古今東西、現場の人間がやることは変わらない。「百聞は一見にしかず」とはよく言ったもので——2500年間、人類はこの嘘を聞いて信じ続けた。だが砂の下の証拠を見た瞬間、すべてがひっくり返った。",
    },
    {
      text: "浮かび上がった真相は、誰の予想も超えていた。ピラミッド建設は国家プロジェクトだった。死刑判決ではなく、徴兵に近い仕組みだ。エジプト全土の村々から労働者が集まり、3ヶ月交代で働いた。労働で税を納める、一種の勤労奉仕だ。チーム同士は競い合い、自分たちの腕前に誇りを持っていた。任期を終えて村に帰るとき、彼らはわかっていた——自分はこの文明で最も神聖な建造物を、この手で造ったのだと。罰ではなかった。普通のエジプト人が神に最も近づける、一生に一度の機会だったのだ。",
    },
    {
      text: "馬が一歩つまずいただけで、2500年の神話が崩壊した。ピラミッドは残酷の産物ではなかった。信仰と技術と、驚異的な組織力が生み出したものだった。何百万もの人々は、鞭で駆り立てられたのではない。自分よりも大きな何かに加わるチャンスを求めて、自ら列に並んだのだ。そして彼らが築いたものは、その後に現れたすべての帝国よりも長く——今なお、砂漠にそびえ立っている。",
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────

async function pushItem(item) {
  const label = `${item.lang} — "${item.title}"`;
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) OR attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅  ${label} — pushed successfully.`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`⚠️  ${label} — record exists, overwriting…`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`✅  ${label} — overwritten successfully.`);
      return true;
    }
    console.error(`❌  ${label} — FAILED:`, err.message);
    return false;
  }
}

async function main() {
  console.log(
    `\nTimestamp: ${NOW} (${new Date(NOW * 1000).toISOString()})\n`
  );

  for (const item of [zh, ja]) {
    const ok = await pushItem(item);
    if (!ok) process.exit(1);
  }

  console.log("\n🏁  Both language versions pushed successfully.\n");
}

main();
