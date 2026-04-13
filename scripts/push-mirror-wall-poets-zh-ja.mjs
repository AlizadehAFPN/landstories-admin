// Push Chinese (zh) and Japanese (ja) recreations of
// "The Mirror Wall Poets" to the Story DynamoDB table.
//
// zh proverb: 人过留名，雁过留声 — subverted: these poets left not just names,
//   but heartbeats, jealousy, and unspoken love letters from 1,500 years ago.
// zh register: Modern Mandarin, WeChat/podcast storytelling.
//
// ja proverb: 立つ鳥跡を濁さず — subverted: these visitors did the opposite,
//   carving traces so deep 1,500 years couldn't erase them.
// ja register: NHK documentary / popular nonfiction.

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
  siteId: "sigiriya",
  storyId: "mirror-wall-poets",
  icon: "✍️",
  storyCategory: "living_heritage",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 7.957, lng: 80.7603 },
  source:
    "Paranavitana, Senarath. Sigiri Graffiti: Being Sinhalese Verses of the Eighth, Ninth, and Tenth Centuries, 2 vols., Oxford University Press, 1956; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; MAP Academy, 'Desires, Reactions, Interpretations: Murals and Inscriptions from Sigiriya'; Bell, H.C.P. Archaeological Survey of Ceylon, Annual Reports 1896-1904",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 人过留名，雁过留声 (Everyone leaves a trace) — subverted: these poets
// didn't just leave names — they left heartbeats, jealousy, and confessions
// from fifteen centuries ago.
// Register: Modern Mandarin, WeChat-article / popular podcast storytelling.
// Short punchy sentences, conversational asides, culturally native imagery.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#mirror-wall-poets",

  title: `镜墙诗人`,

  subtitle: `八百年间，无数人爬上一块巨石，仰望壁画中的仙女，然后掏出工具把情诗刻进了墙壁\u2014\u2014这里藏着现存最古老的僧伽罗语诗歌集`,

  excerpt: `壁画仙女的下方，有一面被打磨得像镜子一样光滑的墙。八百年里，一个又一个路人停下脚步，抬头望向画中的女子，然后做了一件谁也没想到的事\u2014\u2014他们写诗了。`,

  moralOrLesson: `我们总觉得\u201C到此一游\u201D是现代人的毛病\u2014\u2014发朋友圈、刷弹幕、在景区刻字。但镜墙证明了恰恰相反。一千五百年前，人们看到美的东西，心里涌起的冲动跟我们今天一模一样：说点什么，写下来，让它留住。人心没变过。我们还是会为一张图片动心，还是会写下没人会读的句子，还是会天真地相信，把感受变成文字，它就能永远存在。`,

  characters: [
    `基提（一位告诫世人不要沉迷欲望的佛教僧人）`,
    `黛瓦，摩诃摩多之妻（对壁画仙女醋意大发的女访客）`,
    `一位匿名女性访客（犀利嘲讽男性诗人的无名女子）`,
    `塞纳拉特\u00B7帕拉纳维塔纳（破译685首诗的考古学家）`,
    `八百年间无数匿名访客`,
  ],

  era: `公元6至14世纪（涂鸦时期）；1956年（帕拉纳维塔纳出版译文）`,

  paragraphs: [
    {
      text: `五世纪，斯里兰卡有个国王叫迦叶波。他在丛林中一块拔地而起的巨石上筑了堡垒\u2014\u2014锡吉里耶。半山腰画着一群\u201C云中仙女\u201D\u2014\u2014金色皮肤，飘在云间。仙女正下方，工匠用石灰、蛋清、野蜂蜜和蜂蜡，把石墙打磨得像镜子。走过去，抬头是画中美人，低头是她们的倒影。这面镜墙，本是国王的私藏。后来，它属于了所有人。`,
    },
    {
      text: `公元495年，迦叶波战死\u2014\u2014杀他的是亲弟弟，来夺回王位的。堡垒变成佛寺，云中仙女不再是一个人的私藏。和尚、商人、士兵、农民，谁爬上去都能看见。然后一件没人预料的事发生了：有人看到仙女，说不出话，掏出随身利器，把感受刻进了那面光滑的墙。一个人刻了，就有第二个、第三个。然后就停不下来了。`,
    },
    {
      text: `从六世纪到十四世纪，八百年间，一千八百多条刻文覆盖了整面墙。情诗、人生感悟、佛家道理、调侃，还有最朴素的\u201C到此一游\u201D\u2014\u2014僧伽罗语、梵语、泰米尔语，什么都有。没人组织，没人策划，纯粹是人的本能：看到美的东西，就想说点什么。这些随手刻下的句子，成了现存最古老的僧伽罗语诗歌集之一。`,
    },
    {
      text: `大多数诗是男人刻的，写的全是欲望。\u201C金肤少女勾走了我的心和眼，\u201D一位写道。另一位更夸张：\u201C被她斜眼一扫，我直接趴在地上起不来了。\u201D这不是随便涂鸦。他们是被美彻底击穿的人\u2014\u2014站在窄得要命的走廊上，仰望云间的金色女子，发现自己所有的词都配不上眼前这一幕。`,
    },
    {
      text: `女人来了，画风突变。一个叫黛瓦的女人\u2014\u2014身份只被记为\u201C摩诃摩多之妻\u201D\u2014\u2014留下一首醋意十足的诗：\u201C悬崖上那个鹿眼女人让我抓狂，她晃着珍珠项链勾引我丈夫。\u201D更绝的是一位连名字都没留的女人，她写下了整面墙上最犀利的话：\u201C作为女人，我倒挺心疼画里的姐妹。你们这群傻男人，憋了半天写几句破诗，也没见谁给我们带壶酒来。\u201D一千五百年前的话，今天读起来还是痛快。`,
    },
    {
      text: `和尚基提看到了那些被迷住的人没看到的东西。他的刻文像是给下一个路过的人留的忠告：\u201C在这里待着可以，别丢了心。快乐通向痛苦，痛苦又长得像快乐。\u201D他明白，云中仙女本身就是一课\u2014\u2014美丽、诱人、永远够不着。她们点燃的渴望，才是这面墙真正的主题。一千八百条刻文，每一条都是证据。`,
    },
    {
      text: `1956年，考古学家帕拉纳维塔纳发表了其中685首诗的译文，让沉默千年的声音重新开口。最妙的是：镜墙造出来是为了映照美，但时间把镜面蒙住了，倒影消失了。留下来的，是那些站在消失的倒影前、拼命想记录眼前所见的人写下的文字。人过留名，雁过留声\u2014\u2014但镜墙上这些人留下的不只是名字，是心跳、嫉妒和一千五百年前没说出口的情话。镜子碎了，诗还活着。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 立つ鳥跡を濁さず (A departing bird doesn't muddy the waters) —
// subverted: these visitors did the opposite — they carved traces so deep that
// fifteen centuries couldn't erase them.
// Register: NHK documentary / popular nonfiction. Clean, precise, emotional at
// key moments. Natural modern Japanese with balanced kanji/kana.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#mirror-wall-poets",

  title: "鏡の壁の詩人たち",

  subtitle:
    "800年にわたり、人々は巨岩をよじ登り、壁画の女たちを見上げ、恋の詩を磨かれた壁に刻み続けた\u2014\u2014そこに残されていたのは、現存最古のシンハラ語詩集だった",

  excerpt:
    "壁画の女たちの真下に、鏡のように磨き上げられた壁があった。800年のあいだ、足を止めた旅人たちは上を見上げ、誰も予想しなかったことを始めた\u2014\u2014詩を書いたのだ。",

  moralOrLesson:
    "「ここに来た」と書き残すのは現代人の習性だと思いがちだ\u2014\u2014SNSの投稿、コメント、落書き。だが鏡の壁は正反対のことを証明している。千五百年前の人々も、美しいものを前にしたとき、今の私たちとまったく同じ衝動に駆られた。何か言いたい。書き残したい。それを永遠にしたい。人の心は変わっていない。私たちは今も絵に心を奪われ、誰にも読まれないかもしれない言葉を書き、気持ちを文字にすればそれが永遠になると信じている。",

  characters: [
    "キティ（欲望への執着を戒めた仏教僧）",
    "デーヴァ、摩訶摩多の妻（壁画の女たちに嫉妬した女性訪問者）",
    "名前を残さなかった女性訪問者（男性詩人たちを痛烈に皮肉った無名の女性）",
    "セーナラト\u30FBパラナヴィターナ（685首の詩を解読した考古学者）",
    "800年にわたる無数の匿名の訪問者たち",
  ],

  era: "6世紀から14世紀（落書きの時代）、1956年（パラナヴィターナの出版）",

  paragraphs: [
    {
      text: "5世紀のスリランカ。カーシャパという王が、ジャングルからそびえ立つ巨岩の上に要塞を築いた。シーギリヤだ。岩山の中腹には「雲の乙女たち」と呼ばれる壁画が描かれている。金色の肌をした女たちが、雲の中にふわりと浮かんでいる。その真下に、石灰と卵白、野生の蜂蜜、蜜蝋を塗り込んで鏡のように磨き上げた壁があった。歩いていくと、上には壁画の美女、下にはその姿が壁に映る。王だけの楽しみとして作られた壁。それが、やがて万人のものになった。",
    },
    {
      text: "西暦495年、カーシャパは戦死する。殺したのは実の弟\u2014\u2014王位を取り戻しに来たのだ。要塞は仏教寺院に変わり、雲の乙女たちは誰でも見られるようになった。僧侶も、商人も、兵士も、農民も。そして、誰も予想しなかったことが起きる。壁画を見上げて言葉を失った誰かが、持っていた鋭い道具で、磨かれた壁に自分の思いを刻み始めたのだ。一人が刻めば、次の人も。そのまた次の人も。止まらなくなった。",
    },
    {
      text: "6世紀から14世紀まで、800年にわたって、千八百を超える刻文がこの壁を埋め尽くした。恋の詩、人生についての感慨、仏教の教え、冗談、そして素朴な「ここに来た」という記録。シンハラ語、サンスクリット語、タミル語\u2014\u2014言語もさまざまだ。誰かが企画したわけではない。美しいものを見たら何か言いたくなる、人間のまっすぐな本能だった。こうして壁に刻まれた言葉は、現存する最古のシンハラ語詩集のひとつになった。",
    },
    {
      text: "詩を刻んだのは、ほとんどが男たちだった。書いたのは、欲望だ。「金色の肌の少女が、心と目を奪い去った」とある者は刻んだ。別の者はこう残した。「彼女たちの流し目に射抜かれて、その場に崩れ落ちた。」ふざけて書いたのではない。狭い回廊に立ち、雲の中に浮かぶ金色の女たちを見上げ、自分の持つ言葉では到底足りないと悟った人間たちの、本気の叫びだった。",
    },
    {
      text: "だが、女性の訪問者たちの反応はまったく違った。「摩訶摩多の妻」とだけ記されたデーヴァという女性は、嫉妬をむき出しにした詩を残している。「崖の上のあの鹿のような目をした女、真珠をちらつかせてうちの夫を誘惑してる。」さらに強烈なのが、名前すら残さなかったある女性の一節だ。「女として言わせてもらうけど、描かれた女たちが気の毒よ。あんたたち男は必死に詩なんか書いてるけど、誰一人、私たちに酒の一杯も持ってきやしない。」千五百年前の落書きなのに、今読んでも笑ってしまう。",
    },
    {
      text: "僧侶キティは、恋に浮かされた者たちが見逃していたものを見抜いていた。彼の刻文は、次にこの壁の前に立つ人への忠告だ。「ここに留まるなら、心を失うな。快楽は苦に通じ、苦は快楽に似ている。」雲の乙女たちこそが教えそのものだと、彼は理解していた。美しく、魅惑的で、絶対に手が届かない。彼女たちが呼び起こす渇望\u2014\u2014それこそが、この壁の本当のテーマだった。千八百の刻文すべてが、その証拠だ。",
    },
    {
      text: "1956年、考古学者セーナラト\u30FBパラナヴィターナがこのうち685首の詩を翻訳・出版し、千年以上沈黙していた声をよみがえらせた。考えてみれば皮肉な話だ。鏡の壁は、美を映すために作られた。しかし時が鏡面を曇らせ、映像は消えた。残ったのは、かつて映像があった場所に立ち、見たものを必死に言葉にしようとした人々の刻文だった。「立つ鳥跡を濁さず」と言うが、この壁の詩人たちは違う。去り際に、千五百年経っても消えない痕跡を壁に刻みつけていった。鏡は割れた。詩は生きている。",
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
  console.log(
    "\u2550\u2550\u2550 Pushing Mirror Wall Poets zh/ja recreations to DynamoDB \u2550\u2550\u2550"
  );
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      totalChars += p.text.length;
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

  console.log(
    "\n\u2550\u2550\u2550 Both zh/ja recreations pushed successfully \u2550\u2550\u2550"
  );
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
