// Push "The Minotaur and the Labyrinth" — zh, ja versions
// Uses DynamoDB Document Client from @aws-sdk/lib-dynamodb

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English record) ───────────────────────────

const shared = {
  siteId: "knossos",
  storyId: "minotaur-labyrinth",
  icon: "\u{1F402}",
  tier: "S",
  storyCategory: "ghosts_curses",
  era: "Mythological Era (Minoan period)",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  thumbnail: "",
  image: "",
  coordinates: { lat: 35.2981, lng: 25.1631 },
  source: "Apollodorus\u2019s Bibliotheca, Ovid\u2019s Metamorphoses, Plutarch\u2019s Life of Theseus",
  disabled: false,
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — 迷宫里的怪物
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#minotaur-labyrinth",
  characters: [
    `弥诺陶洛斯（阿斯忒里翁）`,
    `米诺斯王`,
    `帕西法厄王后`,
    `海神波塞冬`,
    `代达罗斯`,
    `白色神牛`,
  ],
  title: `迷宫里的怪物`,
  subtitle: `藏在王宫地下的秘密`,
  excerpt: `米诺斯想当克里特岛的王，但光有野心不够\u2014\u2014他得让所有人相信，他是天选之人。`,
  moralOrLesson: `答应神的事，就别想赖账。米诺斯舍不得一头牛，想蒙混过关，结果制造了一个吃人的怪物\u2014\u2014还搭上了别人家孩子的命。`,
  paragraphs: [
    {
      text: `米诺斯想当克里特岛的王，但光有野心不够\u2014\u2014他得让所有人相信，他是天选之人。于是他向海神波塞冬祈祷：给我一个神迹，让全岛的人都看见，我就把您赐给我的东西献祭回去。波塞冬回应了。一头白色公牛从海浪中走出来，浑身散发着不像凡间该有的光泽。克里特岛的百姓看着这头牛从海里走上岸，心里全明白了：这人，是神选的。`,
    },
    {
      text: `可米诺斯看着那头牛，下不了手。它太完美了，杀掉实在可惜。他动了个小聪明\u2014\u2014随便找了头普通牛献祭，把神牛留给了自己。他觉得波塞冬大概不会在意，或者根本不会发现。都说\u201c举头三尺有神明\u201d，米诺斯偏偏觉得，神明大概在忙别的事。他错得离谱。波塞冬的惩罚不是风暴，不是瘟疫，而是一个诅咒\u2014\u2014直接降在了他妻子帕西法厄身上，让她对那头白色公牛产生了无法控制的疯狂执念。`,
    },
    {
      text: `帕西法厄找到了宫里唯一能帮她的人：代达罗斯，一个从雅典来的天才发明家。他给她造了一件令人不安的东西\u2014\u2014一头中空的木牛，外面裹着真牛皮，逼真到连真牛都分辨不出。从那之后，一个不该存在的生命诞生了：人的身体，牛的头颅。人们叫他弥诺陶洛斯。他的真名叫阿斯忒里翁\u2014\u2014意思是\u201c星辰之子\u201d。连怪物都有一个美丽的名字。`,
    },
    {
      text: `帕西法厄试过像养普通孩子一样养他。有一阵子，好像还真行。但随着他长大，他的胃口也在变\u2014\u2014他想吃的不是面包，不是肉，而是人。当第一次杀戮发生时，米诺斯面对的是一个他自己一手造成的噩梦。他没法杀了这个生物\u2014\u2014那是他妻子的儿子。但他也不能放任它在外面游荡。于是他再次找到代达罗斯，给了他这辈子最难的任务：造一座谁也逃不出去的牢笼。`,
    },
    {
      text: `代达罗斯没有造牢笼。他造了一个比牢笼更恐怖的东西。在克诺索斯王宫的地下，他设计了迷宫\u2014\u2014通道扭曲缠绕，走进去就再也走不出来。走廊绕来绕去回到原点，楼梯沉入黑暗又折回原处，到处是死路。而在迷宫的最深处，黑暗中，牛头怪来回踱步，咆哮，等待被投喂。`,
    },
    {
      text: `喂给他的，是雅典的年轻人。米诺斯的儿子安德洛革俄斯在雅典被杀\u2014\u2014卷入了城邦政治，很可能是被嫉妒他的人暗杀的。米诺斯带着海军碾压了雅典。停战条件令人毛骨悚然：每隔九年，雅典必须送来七个年轻男子和七个年轻女子，丢进迷宫里。没有武器，没有地图，没有出路。只有黑暗中等待的牛头怪。`,
    },
    {
      text: `一代又一代，雅典的父母活在一种最残忍的恐惧中：自己的孩子可能是下一批被送去喂怪物的十四人之一。而这一切，只因为一座远方岛屿上的国王，对一位神明撒了谎。克诺索斯的遗址至今仍在\u2014\u2014数百个房间，蜿蜒的走廊，处处死路。有人说是宫殿启发了传说，也有人说传说在先。不管怎样，这个故事讲了三千年，核心就一句话：跟神做了交易，就得认账。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — 迷宮の怪物
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#minotaur-labyrinth",
  characters: [
    `ミノタウロス（アステリオン）`,
    `ミノス王`,
    `パーシパエー`,
    `ポセイドン`,
    `ダイダロス`,
    `白い雄牛`,
  ],
  title: `迷宮の怪物`,
  subtitle: `迷路の果てに待つもの`,
  excerpt: `ミノス王がクレタ島の王座を手に入れたかったとき、ただの野心だけでは足りなかった。神に選ばれた証が必要だった。`,
  moralOrLesson: `神との約束は絶対に破ってはならない。ミノスは一頭の牛を惜しんで神を欺いた。その報いとして生まれた怪物は、王国の名誉と他国の子供たちの命を飲み込んだ。`,
  paragraphs: [
    {
      text: `ミノス王がクレタ島の王座を手に入れたかったとき、ただの野心だけでは足りなかった。神に選ばれた証が必要だった。そこで彼は海の神ポセイドンに祈った。\u300c私に王の資格があるなら、その証を見せてください。いただいたものは必ずお返しします\u300d。ポセイドンは応えた。波間から一頭の白い雄牛が現れた。この世のものとは思えないほど美しい。クレタの民はその牛が海から歩き出てくるのを見て、確信した\u2014\u2014この男は、神に選ばれた王だ。`,
    },
    {
      text: `だが、ミノスはその牛を前にして、刃を振り下ろせなかった。あまりに完璧すぎたのだ。そこで彼はごまかした。普通の牛を代わりに捧げ、神の牛は自分のものにした。ポセイドンは気づかないだろう、あるいは気にしないだろう\u2014\u2014そう高をくくった。\u300c仏の顔も三度まで\u300dという言葉がある。だがポセイドンは仏ではなかった。たった一度の裏切りで、もう許す気はなかった。神の報復は嵐でも疫病でもなく、呪いだった。ミノスの妻パーシパエーの心を狂わせ、あの白い牛への異常な執着を植えつけたのだ。`,
    },
    {
      text: `正気を失ったパーシパエーは、宮廷にいた唯一の天才に助けを求めた。アテネから来た発明家ダイダロスだ。彼が作ったものは、聞くだけで背筋が寒くなる\u2014\u2014本物の牛皮を張った中空の木製の雌牛。本物の牛すら見分けがつかないほど精巧だった。そしてその結果、この世に存在してはならないものが生まれた。人間の体に、牛の頭を持つ怪物。人々はそれをミノタウロスと呼んだ。本名はアステリオン\u2014\u2014\u300c星の子\u300dという意味だ。怪物にさえ、美しい名前はつけられる。`,
    },
    {
      text: `パーシパエーは、普通の子供のように育てようとした。しばらくは、なんとかなっているように見えた。だが成長するにつれ、その飢えは変わっていった。パンでも肉でもない。人の肉を欲したのだ。最初の犠牲者が出たとき、ミノスは自分が作り出した悪夢と向き合わなければならなかった。殺すことはできない\u2014\u2014妻の息子だ。かといって野放しにもできない。彼は再びダイダロスを呼び、人生でもっとも困難な仕事を与えた。誰一人として逃げ出せない檻を作れ、と。`,
    },
    {
      text: `ダイダロスは檻を作らなかった。もっと恐ろしいものを作った。クノッソス宮殿の地下に、迷宮を設計したのだ。一度足を踏み入れたら、二度と出られない。通路は曲がりくねって元に戻り、階段は闇へ下りてまた上る。行き止まりだらけ。そしてその最深部、光の届かない場所で、ミノタウロスは歩き回り、唸り声を上げ、餌が来るのを待っていた。`,
    },
    {
      text: `その餌は、アテネから送られてきた。ミノスの息子アンドロゲオスがアテネで殺されたのだ。都市国家の政治に巻き込まれ、おそらく嫉妬から暗殺された。ミノスは海軍を率いてアテネを叩きのめした。そして突きつけた講和条件は、血も凍るようなものだった。九年ごとに若い男女を七人ずつ、計十四人を迷宮に送れ。武器なし、地図なし、出口なし。暗闇の中に、ただミノタウロスがいるだけだ。`,
    },
    {
      text: `何世代にもわたって、アテネの親たちは想像しうる最悪の恐怖とともに暮らした。自分の子供が、迷宮に送られる十四人に選ばれるかもしれない。すべては、遠い島の一人の王が、神との約束を破ったことから始まった。クノッソスの遺跡は今も残っている。何百もの部屋、曲がりくねった廊下、至るところの行き止まり。宮殿が伝説を生んだのか、伝説が宮殿を飾ったのか。いずれにせよ、この物語は三千年を超えて語り継がれてきた。そのメッセージはただ一つ\u2014\u2014神との約束を破れば、その代償は自分だけでは済まない。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\n\u23F3 Pushing ${label} ...`);

  // Validate required fields
  const required = [
    "siteId", "langStoryId", "storyId", "lang", "title", "subtitle",
    "excerpt", "icon", "storyCategory", "era", "tier", "moralOrLesson",
    "source", "paragraphs",
  ];
  for (const key of required) {
    if (item[key] === undefined || item[key] === null) {
      throw new Error(`Missing required field: ${key}`);
    }
  }

  // Validate paragraphs
  if (!Array.isArray(item.paragraphs) || item.paragraphs.length === 0) {
    throw new Error("paragraphs must be a non-empty array");
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    if (!item.paragraphs[i].text || typeof item.paragraphs[i].text !== "string") {
      throw new Error(`paragraph[${i}].text is missing or invalid`);
    }
  }

  // Validate JSON round-trip (catches encoding issues)
  const roundTrip = JSON.parse(JSON.stringify(item));
  if (roundTrip.title !== item.title) {
    throw new Error("JSON round-trip failed for title \u2014 encoding issue");
  }

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId) OR langStoryId <> :existing",
      ExpressionAttributeValues: {
        ":existing": `en#${item.storyId}`,
      },
    })
  );

  console.log(`\u2705 ${label} pushed successfully (${item.paragraphs.length} paragraphs, updatedAt=${item.updatedAt})`);
}

async function main() {
  const stories = [zh, ja];

  console.log("\u2550".repeat(50));
  console.log("  Minotaur & Labyrinth \u2014 CJK Push (zh, ja)");
  console.log("\u2550".repeat(50));
  console.log(`Table: ${TABLE}`);
  console.log(`Site:  ${shared.siteId}`);
  console.log(`Time:  ${new Date(now * 1000).toISOString()}`);

  // Print readable text for verification
  for (const story of stories) {
    console.log(`\n--- ${story.lang.toUpperCase()} | ${story.title} ---`);
    console.log(`Subtitle: ${story.subtitle}`);
    console.log(`Paragraphs: ${story.paragraphs.length}`);
    const totalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
    console.log(`Total chars: ${totalChars}`);
    console.log(`Excerpt: ${story.excerpt}`);
    console.log(`Moral: ${story.moralOrLesson}`);
    console.log(`\nFull text:`);
    story.paragraphs.forEach((p, i) => {
      console.log(`  P${i + 1}: ${p.text}`);
    });
  }

  console.log("\n");

  for (const story of stories) {
    try {
      await pushStory(story);
    } catch (err) {
      console.error(`\n\u274C FAILED ${story.lang}#${story.storyId}:`, err.message);
      console.error("   Full error:", err);
      process.exit(1);
    }
  }

  console.log("\n" + "\u2550".repeat(50));
  console.log("  Both languages pushed successfully \u2705");
  console.log("\u2550".repeat(50) + "\n");
}

main();
