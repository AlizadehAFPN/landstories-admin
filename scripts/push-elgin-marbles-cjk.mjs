// Push "The Elgin Marbles — Rescue or Theft?" — zh, ja, ko versions
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
  siteId: "acropolis-athens",
  storyId: "elgin-marbles",
  icon: "\u{1F3FA}",
  tier: "A",
  storyCategory: "lost_found",
  era: "1801-1812 (removal), debate ongoing",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  thumbnail: "",
  image: "",
  coordinates: { lat: 37.9715, lng: 23.7267 },
  source:
    "House of Commons Select Committee Report (1816), modern scholarly analysis, British Museum and Greek government statements",
  disabled: false,
  characters: [
    "Thomas Bruce, 7th Earl of Elgin",
    "Giovanni Battista Lusieri (Elgin's agent)",
    "Ottoman authorities",
    "Greek witnesses",
  ],
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — 帕特农石雕：是抢救，还是抢劫？
// ═══════════════════════════════════════════════════════════════════════════════
//
// Proverb subversion: 完璧归赵 (returning the jade intact to Zhao)
// — Every Chinese person knows this idiom about returning a national treasure.
//   Subverted: "这块'璧'离开雅典两百多年了，赵国还在等。"
//
// Register: Modern WeChat long-read / popular podcast. Conversational, punchy.
// Title wordplay: 抢救 (rush to save) vs 抢劫 (to rob) — same first character 抢.

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#elgin-marbles",
  title: `帕特农石雕：是抢救，还是抢劫？`,
  subtitle: `离家两百年的雕塑，还能回去吗？`,
  excerpt: `1801年，希腊不属于希腊人。一个苏格兰贵族拿着一张画素描的许可证来到雅典。结果他干的事，两百多年了还没吵完。`,
  moralOrLesson: `过去到底属于谁？帕特农石雕的争论逼我们面对一个问题：文化瑰宝究竟属于创造它们的民族，还是属于有能力拿走它们的人？`,
  paragraphs: [
    {
      text: `想象一下：1801年，希腊不属于希腊人。奥斯曼帝国——也就是今天土耳其的前身——已经统治这片土地超过350年了。就在这时候，一个叫托马斯·布鲁斯的苏格兰贵族来了。他更广为人知的头衔是\u201C额尔金伯爵\u201D，刚被任命为英国驻奥斯曼帝国大使。他手里拿着一张许可证，说是来给帕特农神庙的古代雕塑画画素描、做做石膏模型的。接下来他干的事，直到今天还在吵。`,
    },
    {
      text: `额尔金可没老老实实画画。他带了一整队工人，用锯子锯开大理石，用撬棍撬下雕像，然后把帕特农神庙差不多一半幸存的雕塑装船运回了英国。什么概念？75米长的精美浮雕带，15块战争场景的方形雕板，17尊比真人还大的神像——他们甚至还从隔壁的厄瑞克忒翁神庙搬走了一根少女柱，就是那种用少女身体当柱子的雕塑。`,
    },
    {
      text: `当时的希腊人在奥斯曼帝国的统治下，根本拦不住。但他们没有沉默。工人们暴力拆卸时，古老的接缝被强行掰开，雕塑碎块摔落在地。一位希腊目击者留下了一句话，两百多年后读起来依然刺痛：\u201C土耳其人没有流泪，但我们哭了。\u201D就连在英国本土，大诗人拜伦也怒不可遏——他直接写诗痛骂额尔金，说他剥夺了雅典的灵魂。`,
    },
    {
      text: `额尔金把所有东西运到伦敦，在自己家里摆了个展。可这整套操作几乎让他破产了，所以1816年，他把这批雕塑卖给了英国政府。议会辩论了一番这笔买卖到底合不合道德，最后还是投票通过了。从那以后，这些雕塑就一直待在大英博物馆里，每年吸引几百万游客。而希腊呢？1832年刚一独立，就开始要了。要到现在，还没要回来。`,
    },
    {
      text: `大英博物馆的说法是这样的：我们救了这些雕塑。要不是额尔金搬走它们，污染、战争、或者长年无人打理，早就毁了——再说了，在伦敦，全世界任何人都能免费来看。希腊的回应也很干脆：你们趁着外国帝国占领我们国土的时候拿走的。没有任何一届希腊政府同意过。这些雕塑属于帕特农神庙，它们是两千五百年前专门为那座建筑雕刻的。两边都有道理。两边都不让步。`,
    },
    {
      text: `2009年，希腊打出了最漂亮的一张牌——不是靠律师，而是靠建筑。雅典在帕特农神庙脚下建起了全新的卫城博物馆，一座令人屏息的玻璃建筑。馆内有一个展厅，完全按照帕特农神庙的原始尺寸建造。希腊保留下来的雕塑被放在它们原来的位置上。而那些被带去伦敦的？对应的位置空着。不需要任何说明文字。那些空白自己会说话。`,
    },
    {
      text: `中国人常说\u201C完璧归赵\u201D，可这块\u201C璧\u201D离开雅典两百多年了，赵国还在等。就连名字本身都是一场战争：叫\u201C额尔金石雕\u201D，等于承认一个英国贵族是它们的主人；叫\u201C帕特农雕塑\u201D，就是在说它们属于雅典。这些两千五百年前的石刻，本来讲的是众神和英雄的故事。现在它们讲的是另一个故事——关于帝国、关于占有、关于一个至今无人能答的问题：从被征服的民族手里拿走的美，你真的能说是你的吗？`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — パルテノンの彫刻——救出か、略奪か
// ═══════════════════════════════════════════════════════════════════════════════
//
// Proverb subversion: 庇を貸して母屋を取られる
// (Lend the eaves, lose the main house — give a little, they take everything)
// — Elgin was given permission to sketch (the "eaves") but took half the
//   temple's sculptures (the "main house"). Every Japanese person knows this.
//
// Register: Compelling NHK documentary / popular nonfiction. Clear, measured,
// engaging. Modern Japanese prose — no 文語.

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#elgin-marbles",
  title: `パルテノンの彫刻——救出か、略奪か`,
  subtitle: `離れた彫刻の帰る日は来るのか`,
  excerpt: `1801年、ギリシャはギリシャ人のものではなかった。一人のスコットランド貴族がスケッチの許可証を手にアテネにやって来た。彼がそこで始めたことは、200年以上たった今も決着がついていない。`,
  moralOrLesson: `過去は本当に誰のものか。パルテノン彫刻をめぐる論争は問いかける——文化遺産は生み出した民族のものか、それとも持ち去る力を持った者のものか。`,
  paragraphs: [
    {
      text: `1801年。ギリシャはギリシャ人のものではなかった。オスマン帝国——現在のトルコの前身——が、この地を350年以上支配していた。そこに一人のスコットランド貴族がアテネにやって来る。トーマス・ブルース、通称エルギン伯爵。イギリスからオスマン帝国に派遣された外交官だ。手にしていたのは、パルテノン神殿の古代彫刻をスケッチし、石膏で型を取る許可証。ところが彼がやったことは、200年以上たった今でも決着がついていない。`,
    },
    {
      text: `エルギンはスケッチなどしなかった。大勢の作業員を連れてきて、大理石をノコギリで切り、バールで彫像を引きはがし、パルテノン神殿に残っていた彫刻のおよそ半分を船でイギリスに送った。75メートルにわたる精緻なフリーズ（帯状の浮き彫り）、15枚の戦闘場面を描いた浮き彫り板、実物より大きな17体の神像。隣のエレクテイオン神殿からは、少女の姿をした柱「カリアティード」まで持ち去った。`,
    },
    {
      text: `オスマン帝国の支配下にあったギリシャの人々には、止める力がなかった。だが、黙ってはいなかった。作業員たちが古代の接合部を力ずくで引き裂き、彫刻の破片が地面に落ちるのを、彼らは見ていた。ある目撃者が残した言葉は、今読んでも胸に刺さる。「トルコ人は泣かなかった。だが、私たちは泣いた」。イギリス本国でさえ、詩人バイロン卿が激怒した。エルギンを「略奪者」と呼び、アテネの魂を奪った罪を詩に刻んだ。`,
    },
    {
      text: `エルギンは彫刻をロンドンの自宅に並べて公開した。しかし、この事業で彼はほぼ破産寸前。1816年、コレクションをイギリス政府に売却する。議会ではこの購入が倫理的かどうか議論されたが、結局、賛成多数で可決された。以来、彫刻は大英博物館に収蔵され、毎年何百万人もの来館者を集めている。ギリシャは1832年に独立を果たした直後から返還を求め続けている。今もだ。`,
    },
    {
      text: `大英博物館の主張はこうだ。「我々がこの彫刻を救った。エルギンが持ち出さなければ、大気汚染、戦争、放置で失われていたかもしれない。ロンドンなら世界中の誰でも無料で見られる」。ギリシャの反論はこうだ。「外国の帝国がわが国を占領している間に持ち去ったものだ。ギリシャ政府は一度たりとも許可を出していない。あの彫刻は2500年前にパルテノン神殿のために彫られたものだ」。双方に理がある。双方とも一歩も引かない。`,
    },
    {
      text: `「庇を貸して母屋を取られる」ということわざがある。エルギンに与えられたのはスケッチの許可——いわば「庇」だった。だが彼が持ち去ったのは神殿そのものの半分、まさに「母屋」だった。2009年、ギリシャは最も雄弁な反撃に出た。法廷ではなく、建築で。パルテノン神殿のすぐ麓に、新アクロポリス博物館を開館した。ガラス張りの美しい建物の中に、神殿と同じ寸法で造られた展示室がある。ギリシャに残った彫刻は本来の位置に置かれている。ロンドンにあるべき彫刻の場所は——空けてある。説明書きは要らない。その空白がすべてを語っている。`,
    },
    {
      text: `名前ひとつとっても戦いだ。「エルギン・マーブル」と呼べば、イギリス貴族の所有物と認めることになる。「パルテノン彫刻」と呼べば、アテネに属するものだと言うことになる。2500年前に彫られたこの石像たちは、もともと神々や英雄の物語を伝えるためのものだった。今、それらが語るのは別の物語——帝国と所有、そして誰にも答えの出せない問い。征服された民族から持ち去った美を、本当に「自分のもの」と呼べるのだろうか。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// KOREAN (ko) — 파르테논 조각상 — 구출인가, 약탈인가
// ═══════════════════════════════════════════════════════════════════════════════
//
// Proverb subversion: 구슬이 서 말이라도 꿰어야 보배
// (Even three bags of gems aren't treasure until strung together)
// — The Parthenon sculptures in London, no matter how well displayed,
//   are "unstrung beads" separated from the building they were made for.
//
// Register: Natural modern Korean narrative. Engaging, vivid. Avoids
// unnecessary Sino-Korean where native Korean sounds more natural.

const ko = {
  ...shared,
  lang: "ko",
  langStoryId: "ko#elgin-marbles",
  title: `파르테논 조각상 — 구출인가, 약탈인가`,
  subtitle: `떠난 조각들은 돌아올 수 있을까`,
  excerpt: `1801년, 그리스는 그리스인의 나라가 아니었다. 스코틀랜드 귀족 하나가 스케치 허가증을 들고 아테네에 나타났다. 그다음 그가 한 일은 200년이 넘도록 끝나지 않는 싸움이 됐다.`,
  moralOrLesson: `과거는 정말 누구의 것인가? 파르테논 조각상 논쟁은 묻는다 — 문화유산은 그것을 만든 민족의 것인가, 아니면 가져갈 힘이 있었던 자의 것인가.`,
  paragraphs: [
    {
      text: `1801년, 그리스는 그리스인의 나라가 아니었다. 오스만 제국 — 오늘날 터키의 전신 — 이 350년 넘게 이 땅을 지배하고 있었다. 바로 그때, 스코틀랜드 출신 귀족 하나가 아테네에 나타난다. 토머스 브루스, 일명 엘긴 백작. 영국이 오스만 궁정에 보낸 외교관이었다. 그의 손에는 파르테논 신전의 고대 조각상을 스케치하고 석고 본을 뜰 수 있다는 허가증이 들려 있었다. 그런데 그다음 그가 한 일은, 200년이 넘도록 끝나지 않는 싸움의 시작이었다.`,
    },
    {
      text: `엘긴은 스케치 따위는 하지 않았다. 그는 인부들을 데려와 대리석을 톱으로 자르고, 쇠지렛대로 조각상을 뜯어냈다. 파르테논 신전에 남아 있던 조각의 거의 절반을 배에 실어 영국으로 보냈다. 75미터에 달하는 정교한 프리즈, 전투 장면을 담은 부조판 15점, 실물보다 큰 신상 17점. 심지어 옆 건물인 에레크테이온 신전에서는 소녀 모습의 기둥인 카리아티드까지 뜯어 갔다.`,
    },
    {
      text: `오스만 제국 치하의 그리스인들은 막을 힘이 없었다. 하지만 침묵하지는 않았다. 인부들이 고대의 이음새를 억지로 벌리고, 조각 파편이 땅에 떨어지는 걸 그들은 지켜봤다. 한 목격자가 남긴 말은 200년이 지난 지금도 가슴을 찌른다. \u201C터키인들은 울지 않았다. 그러나 우리는 울었다.\u201D 영국 본토에서도 시인 바이런 경이 분노를 터뜨렸다. 그는 엘긴을 약탈자라 부르며, 아테네의 영혼을 빼앗은 죄를 시로 고발했다.`,
    },
    {
      text: `엘긴은 조각상을 런던 자택에 진열했다. 하지만 이 작업으로 거의 파산 지경에 이르렀고, 1816년 컬렉션을 영국 정부에 팔았다. 의회에서 이 구매가 윤리적인지 논쟁이 벌어졌지만, 결국 찬성 다수로 통과됐다. 이후 조각상은 대영박물관에 자리 잡았고, 해마다 수백만 명이 찾아온다. 그리스는 1832년 독립한 직후부터 반환을 요구해 왔다. 지금까지도.`,
    },
    {
      text: `대영박물관의 논리는 이렇다. 우리가 이 조각들을 구했다. 엘긴이 가져오지 않았더라면 대기오염이나 전쟁, 방치로 사라졌을 수도 있다. 런던에서는 전 세계 누구나 무료로 볼 수 있다. 그리스의 반박은 이렇다. 외국 제국이 우리 땅을 점령하고 있을 때 가져간 것이다. 그리스 정부가 허락한 적은 단 한 번도 없다. 이 조각들은 2,500년 전 파르테논 신전을 위해 만들어진 것이다. 양쪽 다 일리가 있다. 양쪽 다 한 발짝도 물러서지 않는다.`,
    },
    {
      text: `2009년, 그리스는 가장 강력한 한 수를 뒀다 — 변호사가 아니라, 건축으로. 아테네는 파르테논 신전 바로 아래에 새 아크로폴리스 박물관을 열었다. 유리로 된 아름다운 건물 안에, 파르테논 원래 크기 그대로 재현한 전시실이 있다. 그리스에 남은 조각들은 본래 위치에 놓여 있다. 런던에 있는 조각들이 있어야 할 자리는 — 비어 있다. 안내문 따위는 필요 없다. 그 빈자리가 모든 것을 말해 준다.`,
    },
    {
      text: `옛말에 \u201C구슬이 서 말이라도 꿰어야 보배\u201D라고 했다. 런던의 대영박물관에 아무리 잘 진열해 놓아도, 파르테논에서 떨어져 나온 조각은 꿰지 못한 구슬이다. 이름부터가 전쟁이다. \u201C엘긴 마블\u201D이라 부르면 영국 귀족의 소유물이 된다. \u201C파르테논 조각\u201D이라 부르면 아테네의 것이 된다. 이 2,500년 된 석상들은 원래 신과 영웅의 이야기를 전하기 위해 만들어졌다. 지금 이 석상들은 다른 이야기를 하고 있다 — 제국과 소유, 그리고 아직 아무도 답하지 못한 질문. 정복당한 민족에게서 가져간 아름다움을, 정말 \u2018내 것\u2019이라 부를 수 있는가?`,
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
  const stories = [zh, ja, ko];

  console.log("\u2550".repeat(55));
  console.log("  Elgin Marbles \u2014 CJK Push (zh, ja, ko)");
  console.log("\u2550".repeat(55));
  console.log(`Table: ${TABLE}`);
  console.log(`Site:  ${shared.siteId}`);
  console.log(`Time:  ${new Date(now * 1000).toISOString()}`);

  // Print readable text for verification
  for (const story of stories) {
    console.log(`\n--- ${story.lang.toUpperCase()} | ${story.title} ---`);
    console.log(`Subtitle: ${story.subtitle}`);
    console.log(`Excerpt: ${story.excerpt}`);
    console.log(`Moral: ${story.moralOrLesson}`);
    console.log(`Paragraphs: ${story.paragraphs.length}`);
    const totalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
    console.log(`Total chars: ${totalChars}`);
    story.paragraphs.forEach((p, i) =>
      console.log(`  P${i + 1} (${p.text.length} chars): ${p.text.slice(0, 40)}...`)
    );
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

  console.log(`\n${"═".repeat(55)}`);
  console.log("  All 3 languages pushed successfully \u2705");
  console.log(`${"═".repeat(55)}\n`);
}

main();
