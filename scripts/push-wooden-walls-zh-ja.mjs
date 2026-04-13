// Push Chinese (zh) and Japanese (ja) recreations of
// "The Wooden Walls of Athens" to the Story DynamoDB table.
//
// Chinese proverb subverted: 谋事在人，成事在天 → reversed: heaven gave the answer,
// success depended on the human who was listening.
//
// Japanese proverb subverted: 人事を尽くして天命を待つ → reversed: heaven spoke first,
// and the human had to decipher it correctly.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across both languages) ─────────────────────────
const shared = {
  siteId: "delphi",
  storyId: "wooden-walls",
  icon: "\u2693",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 38.4824, lng: 22.501 },
  source:
    "Herodotus\u2019s Histories (Book 7, chapters 140\u2013143), Plutarch\u2019s Life of Themistocles",
  updatedAt: now,
};

// ═════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 谋事在人，成事在天 (Man proposes, Heaven disposes)
// Subverted: Here heaven GAVE the answer first — success depended entirely
// on who was listening and how they chose to interpret it.
// Register: Modern Mandarin, WeChat article / popular podcast storytelling.
// ═════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#wooden-walls",

  title: "木墙之谜",

  subtitle: "一句神谕如何拯救了整个希腊",

  excerpt:
    `公元前480年，地球上最强大的帝国盯上了希腊。波斯国王薛西斯带着一支庞大到不可思议的军队杀了过来\u2014\u2014古代史书说，大军所到之处，连河水都能被喝干。`,

  moralOrLesson:
    `都说\u201c谋事在人，成事在天\u201d。但这个故事恰恰反过来\u2014\u2014天已经把答案给了，能不能活，全看你怎么去听。`,

  characters: [
    "特米斯托克利",
    "女祭司（皮提亚）",
    "薛西斯",
    "雅典公民大会",
    "阿波罗",
  ],

  era: "公元前480年",

  paragraphs: [
    {
      text: `公元前480年，地球上最强大的帝国盯上了希腊。波斯国王薛西斯带着一支庞大到不可思议的军队杀了过来\u2014\u2014古代史书说，大军所到之处，连河水都能被喝干。十年前，他老爸大流士在马拉松战役里栽了跟头。这一次，薛西斯不只是来打仗的，他是来报仇的。`,
    },
    {
      text: `雅典人慌了。按照希腊人的老规矩，大事不决问神明。他们派使者去德尔斐神庙求见女祭司\u2014\u2014她代替太阳神阿波罗开口，是整个古希腊最让人信服的预言之声。然而，第一道神谕让所有人心凉透了：逃吧，逃到天涯海角，什么都救不了你们。使者不甘心，跪在地上死活不走，求她再给一句话。`,
    },
    {
      text: `女祭司又开口了，这次说的是一个谜语。她说\u201c木墙\u201d会保雅典平安，还称萨拉米斯岛为\u201c神圣之地\u201d。灾难肯定要来，这一点毫无悬念。但谜语里似乎藏着一线生机。整个雅典的命运，就悬在一个问题上：所谓的\u201c木墙\u201d，到底指的是什么？`,
    },
    {
      text: `雅典公民大会炸了锅。年长的领袖们说这还不够明白吗\u2014\u2014\u201c木墙\u201d就是卫城山丘上那圈木栅栏，赶紧躲进去死守就行。但一个叫特米斯托克利的将军站出来，给出了一个完全不同的解读：\u201c木墙\u201d指的是船。雅典刚造了一支庞大的新舰队，神谕是在告诉他们\u2014\u2014放弃这座城，到海上去决战。`,
    },
    {
      text: `特米斯托克利有一个让所有人哑口无言的论点：你们注意到没有，神谕管萨拉米斯叫\u201c神圣的\u201d\u2014\u2014不是\u201c残酷的\u201d，不是\u201c致命的\u201d。如果希腊人注定要死在那里，女祭司为什么会用这么好的词？\u201c神圣\u201d意味着胜利。公民大会投票，特米斯托克利赢了。`,
    },
    {
      text: `雅典开始了全城大撤离。女人、孩子、老人，所有人渡海转移到萨拉米斯岛上。波斯大军浩浩荡荡开进空城，一把火烧了整个雅典，连卫城上的神庙都没放过。看起来一切都完了。但特米斯托克利早就设好了圈套。他故意把波斯舰队引进萨拉米斯岛附近的狭窄水道。那些巨大的波斯战舰挤在窄道里根本施展不开，而希腊小型快船灵活得多，左冲右突，把它们撞了个粉碎。`,
    },
    {
      text: `这是人类历史上最具决定性的海战之一。那些\u201c木墙\u201d\u2014\u2014雅典的舰队\u2014\u2014不只救了雅典，更救了整个希腊。没了海军保障补给线，薛西斯只能撤退。不到一年，残余的波斯军队在普拉提亚战役中被彻底击溃，入侵彻底终结。`,
    },
    {
      text: `都说\u201c谋事在人，成事在天\u201d。但这个故事恰恰反过来\u2014\u2014天已经把答案给出来了，能不能活，全看你怎么去听。同一个神谕，多年前害得吕底亚国王克洛伊斯倾家荡国，如今却救了整个希腊文明。区别不在神说了什么，而在于谁在听。克洛伊斯只听到了自己想听的，特米斯托克利却听出了话里真正的意思。有时候答案就摆在你面前\u2014\u2014但只有敢跟所有人唱反调的人，才看得见。`,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 人事を尽くして天命を待つ (Do your best and await heaven's will)
// Subverted: Here the order was reversed — heaven spoke first, and it fell
// to a human to interpret its true meaning correctly.
// Register: NHK documentary / popular nonfiction. Clean, precise, building
// dramatic tension.
// ═════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#wooden-walls",

  title: "木の壁の謎",

  subtitle: "一つの神託がギリシャの運命を変えた",

  excerpt:
    "紀元前480年、地上最強の帝国がギリシャに牙を剥いた。ペルシア王クセルクセスが率いてきた軍勢は、古代の歴史家が「通り過ぎるだけで川の水が干上がった」と記すほどの規模だった。",

  moralOrLesson:
    "「人事を尽くして天命を待つ」\u2014\u2014だがこの物語では順序が逆だった。天がまず答えを示し、それを正しく読み解けるかが人間に問われた。同じ神託がある王を滅ぼし、ある文明を救った。違いは神の言葉ではなく、聞く側の姿勢にあった。",

  characters: [
    "テミストクレス",
    "巫女（ピューティア）",
    "クセルクセス",
    "アテネの民会",
    "アポロン",
  ],

  era: "紀元前480年",

  paragraphs: [
    {
      text: "紀元前480年、地上最強の帝国がギリシャに牙を剥いた。ペルシア王クセルクセスが率いてきた軍勢は、古代の歴史家が「通り過ぎるだけで川の水が干上がった」と記すほどの規模だった。10年前、父ダレイオスはマラトンの戦いで敗れている。クセルクセスの遠征は単なる侵略ではない\u2014\u2014復讐だった。",
    },
    {
      text: "アテネは恐怖に包まれた。ギリシャ人には危機に陥ったときの定番がある。デルフォイの神殿に使者を送り、巫女を通じて太陽神アポロンの神託を仰ぐのだ。古代世界で最も信頼された予言の声である。ところが、最初の神託は絶望そのものだった。「逃げよ。地の果てまで逃げよ。何をしても無駄だ」。使者たちは帰ろうとしなかった。もう少しだけ、希望のある言葉をくださいと食い下がった。",
    },
    {
      text: "巫女は再び口を開いた。今度は謎かけだった。「木の壁」がアテネを守り、サラミスは「神聖なる島」だと告げたのだ。破滅が迫っていることに変わりはない。だがこの謎の奥に、かすかな光が差していた。アテネの運命はたった一つの問いにかかった\u2014\u2014「木の壁」とは、いったい何を意味するのか。",
    },
    {
      text: "アテネの民会は大紛糾した。長老たちは言った。「木の壁」とはアクロポリスを囲む木の柵のことだ、あそこに立てこもって神に祈るしかないと。だが、テミストクレスという将軍がまったく別の解釈を突きつけた。「木の壁」とは船のことだ。アテネはちょうど大規模な艦隊を建造したばかりだった。神託は、この街を捨てて海で戦えと告げているのだと。",
    },
    {
      text: "テミストクレスには決定的な一言があった。「神託がサラミスを何と呼んだか、思い出してほしい。『神聖なる』だ。『残酷なる』でも『死の島』でもない。もしギリシャ人がそこで滅びる運命なら、巫女がそんな美しい言葉を選ぶだろうか。『神聖なる』は勝利を意味している」。採決が行われた。テミストクレスが勝った。",
    },
    {
      text: "アテネは全市民の避難を決行した。女性、子供、老人\u2014\u2014すべての人がサラミス島へ渡った。ペルシア軍は無人の街に入り、アクロポリスの神殿もろとも焼き尽くした。誰が見ても、完全な敗北だった。だがテミストクレスは罠を仕掛けていたのだ。ペルシア艦隊をサラミス周辺の狭い海峡に誘い込んだ。巨大なペルシアの軍船はそこでは身動きが取れず、小回りの利くギリシャの船に次々と体当たりされ、粉々に砕かれた。",
    },
    {
      text: "史上最も決定的な海戦の一つだった。「木の壁」\u2014\u2014つまりアテネの艦隊\u2014\u2014はアテネだけでなく、ギリシャ全土を救った。海からの補給路を断たれたクセルクセスは撤退を余儀なくされ、翌年、残存するペルシア軍はプラタイアの戦いで壊滅した。侵略は、終わった。",
    },
    {
      text: "「人事を尽くして天命を待つ」という言葉がある。だがこの物語では順序が逆だった。天がまず答えを示し、それを正しく読み取れるかが人間に問われたのだ。同じ神託が、かつてリュディアのクロイソス王を破滅に導き、今度はひとつの文明をまるごと救った。違いは神の言葉ではない\u2014\u2014聞く側の姿勢だ。クロイソスは聞きたいことだけを聞いた。テミストクレスは、言葉の奥にある真意を聞き取った。答えはいつも目の前にある。ただ、皆と違う読み方をする勇気のある者だけが、それに気づく。",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═════════════════════════════════════════════════════════════════════════════

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
  console.log("=== Pushing Wooden Walls zh/ja recreations to DynamoDB ===");
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja]) {
    let totalChars = 0;
    for (const p of rec.paragraphs) {
      totalChars += p.text.length;
    }
    console.log(
      `\n${rec.lang} "${rec.title}": ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
    if (totalChars < 800 || totalChars > 2000) {
      console.warn(
        `WARNING: ${rec.lang} total chars (${totalChars}) outside target range [800-2000]`
      );
    }
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);

  console.log("\n=== Both zh/ja recreations pushed successfully ===");
}

main().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
