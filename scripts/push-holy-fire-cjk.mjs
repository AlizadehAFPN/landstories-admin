// Push Chinese (zh), Japanese (ja), and Korean (ko) recreations of
// "The Holy Fire" to the Story DynamoDB table.

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
  siteId: "jerusalem-old-city",
  storyId: "holy-fire-miracle",
  icon: "\u{1F525}",
  storyCategory: "prophets_pilgrims",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 5,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 31.7784, lng: 35.2296 },
  source:
    "Egeria, Itinerarium Egeriae (c. 385 CE); Bernard the Monk, Itinerarium (c. 870 CE); William of Tyre, Historia (12th century); Skarlakidis, Haris, Holy Fire: The Miracle of the Light of the Resurrection at the Tomb of Christ, 2011; Cohen, Raymond, Saving the Holy Sepulchre, 2008; Cust, L.G.A., The Status Quo in the Holy Places, 1929; Greek Orthodox Patriarchate of Jerusalem, church chronicles; Nusseibeh, Sari, Once Upon a Country, 2007",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 事不过三 (things don't go past three / three strikes and you're out)
// — subverted: this fire didn't even give the wrong people a FIRST chance.
// Register: Modern Mandarin, WeChat/podcast storytelling. Punchy, rhythmic,
// conversational. Like a popular Chinese history podcast.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#holy-fire-miracle",

  title: "圣火",

  subtitle:
    "一千七百年来，每个复活节前夜，一簇无法解释的火焰都会从基督的墓穴中升起",

  excerpt: `复活节前夜，耶路撒冷圣墓教堂里的每一盏灯、每一根蜡烛，全部熄灭。一万名朝圣者站在漆黑中，每人手里攥着三十三根没点燃的蜡烛。他们等着，就像所有经历过失去的人一样：手里只有对光的记忆，和一个信念——光会回来。`,

  moralOrLesson: `不管是奇迹还是谜团，圣火回应的是比证据更深的东西。一千七百年来，人们一次又一次回到同一座石头墓穴前，因为他们心底都明白一件古老的事：黑暗永远不是最后的结局。光会回来——只要我们愿意在黑暗中一起站得足够久，去等它。`,

  characters: [
    "耶路撒冷希腊正教牧首",
    "海伦娜皇后（教堂创建者）",
    "努赛贝家族（自公元637年起的穆斯林钥匙守护者）",
    "图诺姆（奥斯曼时代皈依基督教的殉道者）",
    "哈里发欧麦尔·伊本·赫塔卜",
    "横跨十七个世纪的朝圣者",
  ],

  era: "4世纪至今（至少自公元385年起的年度仪式）",

  paragraphs: [
    {
      text: `复活节前夜，耶路撒冷圣墓教堂里的每一盏灯、每一根蜡烛，全部被熄灭。教堂陷入一片死寂的漆黑。一万名朝圣者站在黑暗中，每人手里攥着三十三根没点燃的蜡烛——一根代表耶稣在人间的一年。他们来自雅典、莫斯科、亚的斯亚贝巴。他们等着，就像所有经历过失去的人等待一样：手里什么都没有，只有对光的记忆，和一个信念——光会回来。`,
    },
    {
      text: `牧首走进圣殿中心的小圣堂——那座覆盖在耶稣墓穴之上的大理石神龛。在众人注视下，他被仔细搜过身：没有火柴，没有打火机，没有任何能点火的东西。门被封上。万人屏息。然后，光从墓穴的小窗里透了出来。牧首捧着两支燃烧的火炬走出来，教堂瞬间沸腾。火焰从一根烛芯跳到另一根，从一只手传到另一只手，直到一万簇火焰把黑暗整个吞没。`,
    },
    {
      text: `这件事已经持续了整整一千七百年。公元385年左右，一个叫埃杰里亚的罗马旅行者写下了亲眼所见。在她之前几十年，君士坦丁大帝的母亲海伦娜在一座罗马神庙下面找到了耶稣受难的地点，君士坦丁随即在墓穴上建起了大教堂。后来这座教堂被波斯人烧毁，被埃及哈里发拆毁，被地震震塌，被岁月磨损——但每一年的圣周六，火都会回来。石头可以碎，仪式比石头更久。`,
    },
    {
      text: `1579年，亚美尼亚人拿到了奥斯曼帝国的许可，要主持这场仪式，希腊牧首被锁在了门外。他只能站在入口旁的一根大理石柱子边，默默祈祷。教堂里面，亚美尼亚人等着。火没有来。但在外面——石柱突然裂开，一声巨响如同炸雷，裂缝中窜出了火焰，就在被驱逐的牧首面前。都说事不过三，但这把火连第一次机会都没给错的人。那道裂缝今天还在那里，焦黑的痕迹清晰可见。`,
    },
    {
      text: `目击者中有一个奥斯曼军官，名叫图诺姆。他亲眼看到火从石头里迸出来，当场宣告自己信仰了基督。他立刻被逮捕，以叛教罪被活活烧死——一个因为相信天上之火的人，被人间之火吞噬。教会至今仍尊他为殉道者。奥斯曼当局深受震动，把仪式主持权还给了希腊人。四百五十年来，再没人敢挑战这个权利。`,
    },
    {
      text: `这座教堂本身就是一部人性寓言。六个教派共用这一座教堂，规矩细到搬一把椅子都能引发修道士之间的群架。外墙上有一架木梯，从1728年就靠在那里——没人动过，因为没人有权改变任何东西。而教堂大门的钥匙呢？自公元637年起就由两个穆斯林家族保管，原因很简单：基督徒彼此不信任，不敢把钥匙交给自己人。也只有耶路撒冷，才容得下这种荒诞、美丽、又偏偏运转良好的安排。`,
    },
    {
      text: `如今，专机在几小时内就能把圣火从耶路撒冷送到雅典、莫斯科、布加勒斯特、亚的斯亚贝巴。机场工作人员鼓掌欢迎，国家元首到停机坪亲自迎接。星期六下午在石头墓穴中点燃的一簇火焰，到星期天早上已经到达四个大洲。朝圣者把手伸进火焰，发誓感觉不到热度。怀疑论者摇头。但每一年，所有人都会回来，站在黑暗里一起等着——因为这就是人类自古以来一直在做的事。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 石の上にも三年 (sit on a stone for three years and it warms up)
// — subverted: this stone listened to 1700 years of prayer, then answered
// on its own.
// Register: NHK documentary / popular nonfiction. Measured authority with
// restrained emotional intensity at key moments.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#holy-fire-miracle",

  title: "聖なる炎",

  subtitle:
    "千七百年間、聖土曜日のたびにキリストの墓から現れる炎——その理由を誰も説明できない",

  excerpt:
    "復活祭の前夜、エルサレムの聖墳墓教会から、すべての火が消される。ランプも、ろうそくも、一つ残らず。一万人の巡礼者がその闇の中に立ち、三十三本の火のついていないろうそくを握りしめている。光の記憶だけを頼りに、それがもう一度戻ると信じて、ただ待つ。",

  moralOrLesson:
    "奇跡であれ謎であれ、聖火が応えているのは証拠よりも深い何かだ。千七百年にわたり、人々は同じ石の墓に戻り続けてきた。心のどこかに太古の確信を宿しているからだ——闇は決して最後の言葉ではない。光は必ず戻る。暗闇の中で共に立ち続ける覚悟さえあれば。",

  characters: [
    "エルサレムのギリシャ正教総主教",
    "ヘレナ皇后（教会の創建者）",
    "ヌセイベ家（西暦637年以来の鍵の番人、イスラム教徒の一族）",
    "トゥノム（オスマン時代のイスラム教徒の改宗者・殉教者）",
    "カリフ・ウマル・イブン・アル＝ハッターブ",
    "十七世紀にわたる巡礼者たち",
  ],

  era: "4世紀〜現在（少なくとも西暦385年以降の年次儀式）",

  paragraphs: [
    {
      text: "復活祭の前夜、エルサレムの聖墳墓教会から、すべての火が消される。ランプも、ろうそくも、一つ残らず。教会は封じられた墓のように暗くなる。一万人の巡礼者がその闇の中に立ち、三十三本の火のついていないろうそくを握りしめている——キリストが地上を歩んだ年数と同じだ。アテネから、モスクワから、アディスアベバから来た人々。彼らはただ待つ。光の記憶だけを頼りに、それがもう一度戻ると信じて。",
    },
    {
      text: "総主教がエディクラに入る。キリストが葬られ、そして信者たちが信じるところでは復活した、その墓の上に建てられた大理石の聖堂だ。群衆の前で身体検査を受けている。マッチもライターもない。扉が封じられる。沈黙。すると、墓の小さな窓から光が漏れ始める。総主教が二本の燃える松明を手に現れた瞬間、教会は歓声に包まれる。炎はろうそくからろうそくへ、手から手へ飛び移り、一万の火が闇を飲み込んでいく。",
    },
    {
      text: "これが千七百年、途切れることなく続いている。西暦385年頃、ローマの旅行者エゲリアがこの儀式を書き残した。それより数十年前、コンスタンティヌス帝の母ヘレナがローマ神殿の下から磔刑の場所を見つけ、帝は墓の上に大聖堂を建てた。その教会はペルシア軍に焼かれ、エジプトのカリフに壊され、地震に崩され、歳月に削られた。だが毎年、聖土曜日になると火は戻ってきた。石は砕けても、儀式は石より長く生き残る。",
    },
    {
      text: "1579年、アルメニア人がオスマン帝国の許可を得て儀式を主導することになり、ギリシャ正教の総主教は教会から締め出された。彼にできたのは、入口脇の大理石の柱の前で祈ることだけだった。教会の中で、アルメニア人たちは待った。火は来なかった。ところが外では——柱が雷鳴のような音とともに裂け、その亀裂から炎が噴き出した。追放された総主教の目の前で。石の上にも三年というが、この石は千七百年分の祈りを聞いていた。そしてあの日、自ら答えを出した。亀裂は今も残っている。焦げ跡が、訪れる者すべてに見える形で。",
    },
    {
      text: "目撃者の中に、トゥノムというオスマンの将校がいた。石から炎が噴き出すのを見て、その場でキリストへの信仰を宣言した。即座に逮捕され、棄教の罪で生きたまま焼き殺された——天の火を信じた人間が、地上の火に焼かれた。教会は今なお彼を殉教者として讃えている。動揺したオスマン側は、ギリシャ正教に儀式の主導権を返した。以来四百五十年、その権利に異を唱えた者はいない。",
    },
    {
      text: "この教会自体が、人間というものの縮図だ。六つの宗派が精密な規則のもとに空間を分かち合い、椅子ひとつ動かしただけで修道士同士の殴り合いになることもある。外壁には1728年以来動かされていない木の梯子がある。動かす権限を持つ者がいないからだ。そして正面玄関の鍵は、西暦637年以来、二つのイスラム教徒の家族が預かっている。キリスト教徒同士が互いを信用できなかったからだ。エルサレムでしか成立しない、不条理で、美しくて、それでもちゃんと機能している仕組みだ。",
    },
    {
      text: "今日、聖火は数時間のうちにチャーター機でエルサレムからアテネ、モスクワ、ブカレスト、アディスアベバへと運ばれる。空港の職員が歓声で出迎え、大統領が滑走路に姿を見せる。土曜の午後に石の墓で灯った炎は、日曜の朝には四つの大陸に届いている。巡礼者たちは炎に手をかざし、熱くないと誓う。懐疑的な人たちは首を振る。だが毎年、誰もが戻ってくる。闇の中に一緒に立つために——人間が太古からずっと続けてきたことを、もう一度繰り返すために。",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// KOREAN (ko)
// Proverb: 하늘이 무너져도 솟아날 구멍이 있다 (Even if the sky falls, there's
// a hole to rise through) — subverted: on that day the fire found its hole
// through stone.
// Register: Modern Korean narrative nonfiction / quality podcast. Natural
// spoken rhythm, distinct from Chinese or Japanese pacing.
// ═══════════════════════════════════════════════════════════════════════════════

const ko = {
  ...shared,
  lang: "ko",
  langStoryId: "ko#holy-fire-miracle",

  title: "성화",

  subtitle:
    "천칠백 년 동안, 부활절 전야마다 그리스도의 무덤에서 설명할 수 없는 불꽃이 피어오른다",

  excerpt:
    "부활절 전야, 예루살렘 성묘교회의 모든 불이 꺼진다. 램프도, 촛불도, 하나 남김없이. 만 명의 순례자가 어둠 속에 서서 서른세 개의 꺼진 초를 쥐고 있다. 빛의 기억만을 붙잡고, 그 빛이 돌아올 거라는 믿음 하나로 기다린다.",

  moralOrLesson:
    "기적이든 수수께끼든, 성화가 답하는 건 증거보다 더 깊은 무언가다. 천칠백 년 동안 사람들은 같은 돌무덤 앞으로 돌아왔다. 마음 어딘가에 오래된 확신을 품고 있기 때문이다. 어둠이 마지막 말은 아니라는 것. 빛은 반드시 돌아온다——어둠 속에서 함께 서서 기다릴 각오만 있다면.",

  characters: [
    "예루살렘 그리스 정교회 총대주교",
    "헬레나 황후 (교회 창건자)",
    "누세이베 가문 (서기 637년부터 열쇠를 지켜온 무슬림 가문)",
    "투놈 (오스만 시대 무슬림 개종자이자 순교자)",
    "칼리프 우마르 이븐 알하타브",
    "천칠백 년에 걸친 순례자들",
  ],

  era: "4세기~현재 (최소 서기 385년부터 이어진 연례 의식)",

  paragraphs: [
    {
      text: "부활절 전야, 예루살렘 성묘교회의 모든 불이 꺼진다. 램프도, 촛불도, 하나 남김없이. 교회는 봉인된 무덤처럼 어두워진다. 만 명의 순례자가 그 어둠 속에 서 있다. 각자 손에 서른세 개의 꺼진 초를 쥐고 있다——예수가 이 땅을 걸은 햇수만큼이다. 아테네에서, 모스크바에서, 아디스아바바에서 온 사람들. 그들은 기다린다. 빛의 기억만을 붙잡고, 그 빛이 돌아올 거라는 믿음 하나로.",
    },
    {
      text: "총대주교가 에디쿨라 안으로 들어간다. 예수가 묻히고, 믿는 이들에 따르면 부활한 바로 그 무덤 위에 세워진 대리석 성당이다. 군중 앞에서 몸수색을 받았다. 성냥도 라이터도 없다. 문이 봉인된다. 정적. 그러다 무덤의 작은 타원형 창으로 빛이 새어 나온다. 총대주교가 타오르는 횃불 두 개를 들고 나오는 순간, 교회가 터진다. 불꽃이 심지에서 심지로, 손에서 손으로 번져 만 개의 불꽃이 어둠을 삼킨다.",
    },
    {
      text: "이 일이 천칠백 년째 이어지고 있다. 서기 385년경, 로마의 여행자 에게리아가 이 의식을 기록으로 남겼다. 그보다 수십 년 전, 콘스탄티누스 대제의 어머니 헬레나가 로마 신전 아래서 십자가 처형 장소를 발견했고, 대제는 무덤 위에 대성당을 세웠다. 페르시아군에 불탔고, 이집트 칼리프에게 허물어졌고, 지진에 무너졌고, 세월에 닳았다. 하지만 매년 성토요일이면 불은 돌아왔다. 돌은 부서져도, 의식은 돌보다 오래간다.",
    },
    {
      text: "1579년, 아르메니아인들이 오스만 제국의 허락을 얻어 의식을 주관하게 됐다. 그리스 정교회 총대주교는 문밖으로 쫓겨났다. 그가 할 수 있는 건 입구 옆 대리석 기둥 앞에서 기도하는 것뿐이었다. 교회 안에서 아르메니아인들이 기다렸다. 불이 오지 않았다. 그런데 밖에서——기둥이 천둥 같은 소리와 함께 갈라지더니, 그 틈에서 불꽃이 터져 나왔다. 쫓겨난 총대주교의 바로 눈앞에서. 하늘이 무너져도 솟아날 구멍이 있다더니, 그날 불은 돌 속에서 제 길을 찾았다. 그 갈라진 자국은 지금도 그 자리에 있다. 까맣게 그을린 채로.",
    },
    {
      text: "목격자 중에 투놈이라는 오스만 장교가 있었다. 돌에서 불이 터지는 걸 보고, 그 자리에서 그리스도를 향한 믿음을 선언했다. 즉시 체포되어 배교죄로 산 채로 화형당했다——하늘의 불을 믿은 사람이 땅의 불에 삼켜졌다. 교회는 오늘날까지 그를 순교자로 기린다. 크게 흔들린 오스만 당국은 그리스 정교회에 의식 주관권을 돌려줬다. 그로부터 사백오십 년, 아무도 그 권리에 이의를 제기하지 못했다.",
    },
    {
      text: "이 교회 자체가 인간 본성의 축소판이다. 여섯 개 교파가 촘촘한 규칙 아래 교회를 나눠 쓰는데, 의자 하나 옮겼다가 수도사끼리 주먹다짐이 벌어지기도 한다. 건물 외벽에는 1728년부터 놓여 있는 나무 사다리가 있다. 아무도 치우지 못한다——옮길 권한을 가진 사람이 없기 때문이다. 정문 열쇠는? 서기 637년부터 두 무슬림 가문이 보관하고 있다. 기독교인들이 서로를 믿지 못해서 자기들끼리 열쇠를 맡길 수 없었기 때문이다. 예루살렘에서만 가능한, 황당하고, 아름답고, 그런데도 작동하는 시스템이다.",
    },
    {
      text: "오늘날 성화는 전세기를 타고 몇 시간 안에 예루살렘에서 아테네, 모스크바, 부쿠레슈티, 아디스아바바로 옮겨진다. 공항 직원들이 환호로 맞이하고, 대통령이 활주로에 나와 영접한다. 토요일 오후 돌무덤에서 피어난 불꽃 하나가, 일요일 아침이면 네 대륙에 닿는다. 순례자들은 불꽃 속으로 손을 내밀며 뜨겁지 않다고 맹세한다. 회의론자들은 고개를 젓는다. 하지만 매년 모두 돌아온다. 어둠 속에 함께 서기 위해——인류가 아주 오랜 옛날부터 해온 일이니까.",
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
  console.log("═══ Pushing Holy Fire CJK recreations to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja, ko]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      totalChars += rec.paragraphs[i].text.length;
    }
    console.log(
      `\n\uD83D\uDCCA ${rec.lang} "${rec.title}": ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
    if (totalChars < 800 || totalChars > 2000) {
      console.warn(
        `\u26A0\uFE0F  ${rec.lang} total chars (${totalChars}) outside target range [800-2000]`
      );
    }
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);
  await pushStory(ko);

  console.log("\n═══ All three CJK recreations pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
