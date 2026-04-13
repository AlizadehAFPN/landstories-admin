// Push Chinese (zh) and Japanese (ja) recreations of
// "The Vulture Stone — A Cosmic Message?" to the Story DynamoDB table.

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
  siteId: "gobeklitepe",
  storyId: "vulture-stone",
  icon: "\u{1F985}",
  storyCategory: "riddles_past",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 37.22332, lng: 38.92242 },
  source:
    "Sweatman & Tsikritsis, Mediterranean Archaeology and Archaeometry (2017); Schmidt, Klaus, G\u00F6bekli Tepe: A Stone Age Sanctuary",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 天有不测风云 (the heavens hold unpredictable storms) — subverted:
// 12,000 years ago, these "primitive" people didn't just predict the storm,
// they carved it into eternity.
// Register: Modern Mandarin, WeChat/podcast storytelling. Punchy, vivid,
// conversational — as if a popular science host is telling you something wild.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#vulture-stone",

  title: `秃鹫之石——来自远古的宇宙密码？`,

  subtitle: `一块一万两千年前的石碑，可能记录了一次彗星撞击`,

  excerpt:
    `一万两千年前，在今天土耳其的东南部，有人在一根巨大的石柱上刻下了一组图案。没有文字，只有画面——一只秃鹫抓着一个圆盘，一具没有头的人体，一只蝎子，还有一堆谁都看不懂的符号。这根石柱就是哥贝克力石阵的第43号柱，人们管它叫\u201c秃鹫之石\u201d。几千年来，没人知道它到底在说什么。但现在，我们可能读懂了。`,

  moralOrLesson:
    `我们总是低估祖先——那些建造了人类第一座神殿的人，也许比我们想象的更懂这个宇宙。`,

  characters: [
    `新石器时代的天文观测者`,
    `秃鹫（星座图像）`,
    `爱丁堡大学研究员`,
    `克劳斯\u00B7施密特（发掘者）`,
  ],

  era: `前陶新石器时代（约公元前10950年）`,

  paragraphs: [
    {
      text: `一万两千年前，在今天土耳其的东南部，有人在一根巨大的石柱上刻下了一组图案。没有文字，只有画面——一只秃鹫抓着一个圆盘，一具没有头的人体，一只蝎子，还有一堆谁都看不懂的符号。这根石柱就是哥贝克力石阵的第43号柱，人们管它叫\u201c秃鹫之石\u201d。几千年来，没人知道它到底在说什么。但现在，我们可能读懂了。`,
    },
    {
      text: `哥贝克力石阵本身就够让人震惊的。它建于大约公元前9600年——比巨石阵早了六千年，比埃及金字塔早了七千年。更离谱的是，建造它的不是什么高度文明，而是一群狩猎采集者。按我们过去的认知，这帮人连固定住所都没有，怎么可能盖出这种规模的建筑？但他们就是做到了。而秃鹫之石，是整个遗址里最让考古学家头疼的谜题。`,
    },
    {
      text: `很长一段时间，大多数专家觉得这些图案跟葬礼有关。有些古老文化会把死者的遗体放在野外，让秃鹫来啄食——这种做法在西藏至今还有，叫\u201c天葬\u201d。秃鹫、无头尸体、围绕的动物——怎么看都像一幅关于死亡的画面。大家觉得，这事就这么定了。`,
    },
    {
      text: `然后2017年，爱丁堡大学的两个研究员把一切都翻了个底朝天。马丁\u00B7斯威特曼和迪米特里奥斯\u00B7齐克里齐斯把石柱上的图案输入了古代星空模拟程序，结果发现了一件疯狂的事：石头上的每一只动物，都精确对应着一个真实的星座。秃鹫对应人马座，蝎子对应天蝎座。而秃鹫爪中那个圆盘——那是太阳。`,
    },
    {
      text: `把这些拼在一起，秃鹫之石变成了一张星空快照，精确指向一个特定的时间——大约公元前10950年。这个日期绝不是随便挑的。那正是科学家所说的\u201c新仙女木事件\u201d发生的时候：一颗彗星或者它的碎片很可能撞上了地球，引发了一场持续一千多年的极寒。温度骤降，生态崩溃，无数族群就此消失。`,
    },
    {
      text: `我们常说\u201c天有不测风云\u201d——老天爷要变脸，谁也拦不住。可一万两千年前，有一群人偏偏不信这个邪。他们夜复一夜地仰望星空，追踪天体的运行，在那颗彗星砸下来之后，把整个星空的位置刻进了石头里。不是为了装饰，不是为了好玩，是为了让后来的人知道：这里发生过什么。所谓\u201c不测风云\u201d，他们不但测到了，还刻成了永恒。`,
    },
    {
      text: `石柱中央那个无头的人像？也许就是他们在说：这场灾难，死了很多人。整根石柱看起来越来越不像艺术品，而像一份用石头写成的灾难报告——由亲历者亲手刻下。我们花了几千年觉得老祖宗很\u201c原始\u201d。秃鹫之石说：你们想多了。有时候，最古老的那条消息，恰恰是我们最该认真读的那一条。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 仏の顔も三度まで (even Buddha loses patience after three times)
// — subverted: this stone waited twelve thousand years for someone to read it,
// a patience far beyond any buddha.
// Register: NHK documentary / popular nonfiction. Clean, precise, with
// controlled emotional beats. A knowledgeable narrator telling you something
// that will change how you see the past.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#vulture-stone",

  title: "ハゲワシの石碑——宇宙からのメッセージ？",

  subtitle:
    "一万二千年前の石に刻まれた、彗星衝突の記録かもしれない",

  excerpt:
    "今からおよそ一万二千年前、現在のトルコ南東部で、誰かが石柱にメッセージを刻んだ。文字ではない——絵だ。円盤をつかむハゲワシ。首のない人体。サソリ。誰にも完全には読み解けない不思議な図柄の数々。これがギョベクリ・テペの「第43号柱」、通称「ハゲワシの石碑」だ。何千年もの間、この石碑が何を語っているのか、誰にもわからなかった。でも今、その答えが見え始めている。",

  moralOrLesson:
    "私たちはいつも祖先を見くびってきた——最初の神殿を築いた人々は、私たちの想像をはるかに超えて宇宙を理解していたのかもしれない。",

  characters: [
    "新石器時代の天文観測者",
    "ハゲワシ（星座の象徴）",
    "エディンバラ大学の研究者",
    "クラウス・シュミット（発掘者）",
  ],

  era: "先土器新石器時代（紀元前10950年頃）",

  paragraphs: [
    {
      text: "今からおよそ一万二千年前、現在のトルコ南東部で、誰かが石柱にメッセージを刻んだ。文字ではない——絵だ。円盤をつかむハゲワシ。首のない人体。サソリ。誰にも完全には読み解けない不思議な図柄の数々。これがギョベクリ・テペの「第43号柱」、通称「ハゲワシの石碑」だ。何千年もの間、この石碑が何を語っているのか、誰にもわからなかった。でも今、その答えが見え始めている。",
    },
    {
      text: "ギョベクリ・テペという遺跡そのものが、まず常識を覆す存在だ。建てられたのは紀元前9600年頃——ストーンヘンジより六千年も古く、エジプトのピラミッドより七千年も前になる。しかも建てたのは狩猟採集民だ。定住すらしていなかったはずの人々が、なぜこれほど巨大な石造神殿を造れたのか。考古学の常識が根底から揺らぐ話だ。そしてハゲワシの石碑は、この遺跡最大の謎とされている。",
    },
    {
      text: "長い間、研究者たちはこの彫刻を葬送の儀式を描いた場面だと考えていた。古代の一部の文化では、遺体を屋外に安置してハゲワシに委ねる「鳥葬」が行われていた——チベットでは今も続く風習だ。ハゲワシ、首のない遺体、取り囲む動物たち。死と再生の宗教画。長年、それで話は決着したと思われていた。",
    },
    {
      text: "ところが2017年、エディンバラ大学の二人の研究者がすべてをひっくり返した。マーティン・スウェットマンとディミトリオス・ツィクリツィスが石碑の図柄を古代の星空シミュレーションにかけたところ、驚くべき結果が出た。石に刻まれた動物の一つ一つが、実在の星座と正確に一致していたのだ。ハゲワシはいて座。サソリはさそり座。そしてハゲワシが握りしめていたあの円盤——あれは太陽だった。",
    },
    {
      text: "すべてを重ね合わせると、ハゲワシの石碑はある特定の瞬間の夜空を記録した「スナップショット」になる。その日付はおよそ紀元前10950年。これが重大なのは、科学者が「ヤンガードリアス」と呼ぶ地球規模の大異変の時期と、ぴたりと一致するからだ。彗星かその破片が地球に衝突し、千年以上続く過酷な寒冷期を引き起こした。気温は急落し、生態系は崩壊し、数多くの文明が姿を消した。",
    },
    {
      text: "「仏の顔も三度まで」と言うけれど、この石碑は一万二千年もの間、誰かが読み解いてくれるのをじっと待ち続けた。仏どころの忍耐ではない。そしてようやく読み解かれた先にあったのは、驚くべき事実だった——一万二千年前の「原始的」とされた人々が、夜空を精密に観測し、宇宙規模の大災害を記録し、後世に伝えようとしていた。彼らはただ日々を生き延びていたのではない。観測し、分析し、記録していたのだ。",
    },
    {
      text: "石碑の中央に刻まれた首のない人体。それはおそらく「この災害で多くの命が失われた」という意味だろう。この石碑は装飾品などではなく、大災害を生き延びた人々が後世に残した警告だったのかもしれない。私たちは何千年もの間、祖先を「未開」と決めつけてきた。ハゲワシの石碑は静かにこう語りかけている——最も古いメッセージにこそ、最も耳を傾けるべきだったのだ、と。",
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
  console.log("═══ Pushing Vulture Stone zh + ja recreations to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const chars = rec.paragraphs[i].text.length;
      totalChars += chars;
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

  console.log("\n═══ Both zh + ja recreations pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
