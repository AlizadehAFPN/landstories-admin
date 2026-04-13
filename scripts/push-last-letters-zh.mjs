// Push Chinese (zh) recreation of "The Last Letters" to the Story DynamoDB table.
// Proverb: 好记性不如烂笔头 (the palest ink outlasts the strongest memory)
// — subverted: in Auschwitz, writing wasn't to aid memory — it was to prove existence.
// Register: Modern Mandarin, WeChat/podcast storytelling. Intimate, gripping,
// conversational. Like a popular Chinese history podcast or 故事FM episode.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: "auschwitz-birkenau",
  langStoryId: "zh#last-letters",
  storyId: "last-letters",
  lang: "zh",
  icon: "\u{1F4DD}",
  storyCategory: "lost_found",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 50.0343, lng: 19.1783 },
  source:
    "Auschwitz-Birkenau Memorial archives; Yad Vashem; United States Holocaust Memorial Museum; Polish Underground State archives",
  characters: [
    "Anonymous prisoners",
    "Zalmen Gradowski",
    "Lejb Langfus",
    "Zalmen Lewental",
    "Polish resistance couriers",
  ],
  era: "World War II (1940-1945)",
  updatedAt: now,

  title: "最后的家书",

  subtitle: "从黑暗中递出的只言片语——来自那些知道自己回不来的人",

  excerpt:
    "纳粹设计奥斯维辛的时候，目标只有一个：让所有人彻底消失。" +
    "财物充公，名字换成编号，尸体烧成灰烬撒进风里——" +
    "不留坟墓，不留标记，不留一丝痕迹。这不只是屠杀，这是对记忆本身的灭绝。",

  moralOrLesson:
    "文字是对抗遗忘最有力的武器。一封信、一个刻在墙上的名字、" +
    "一份埋在灰烬中的证词，就足以击败人类历史上最强大的遗忘机器。",

  paragraphs: [
    // ── P1 · 沉默的设计 ──
    {
      text:
        "纳粹设计奥斯维辛的时候，目标只有一个：让所有人彻底消失。" +
        "财物充公，名字换成编号，尸体烧成灰烬撒进风里——" +
        "不留坟墓，不留标记，不留一丝\u201C这个人存在过\u201D的痕迹。" +
        "这不只是屠杀，这是对记忆本身的灭绝。",
    },
    // ── P2 · 唯一的武器 ──
    {
      text:
        "但囚犯们找到了唯一的武器：一支笔，一张纸，几句话。" +
        "在集中营运转的那些年里，无数封信件和纸条通过一个惊人的地下网络传递出去——" +
        "藏在送饭容器的夹层里，缝进送去洗衣房的衣服内衬里，" +
        "在看守分神的瞬间塞过铁丝网，由外出劳动的囚犯偷偷带出。" +
        "每传一封信，就是一次以死相搏的赌注。" +
        "每一封信，都是一个本该永远沉默的声音在说：我不。",
    },
    // ── P3 · 烂笔头 ──
    {
      text:
        "中国人说\u201C好记性不如烂笔头\u201D。" +
        "但在奥斯维辛，写字不是为了怕忘，是为了证明自己活过。" +
        "那些留下来的信用波兰语、意第绪语、匈牙利语、法语、" +
        "希腊语、荷兰语、捷克语写成——" +
        "有的是在碎纸片上匆匆写就的几行字，" +
        "有的是一笔一划认认真真写下的遗书。" +
        "写信的人知道自己不会活着离开，" +
        "他们把最后的几个小时留给了文字。",
    },
    // ── P4 · 母亲的信 ──
    {
      text:
        "一位母亲的信通过波兰地下抵抗组织辗转送到了孩子们手上：" +
        "\u201C我亲爱的小宝贝们，妈妈要去一个没人能回来的地方了。" +
        "你们要互相照顾，要听爸爸的话。" +
        "记住，妈妈爱你们胜过爱自己的命。" +
        "要勇敢，我的宝贝。不要为我哭。" +
        "我会在天上看着你们的。\u201D" +
        "没人知道她叫什么名字。这封信之所以留存至今，" +
        "是因为一个波兰铁路工人捡到了它——" +
        "它是从驶往集中营的火车上扔出来的。",
    },
    // ── P5 · 父亲的信 ──
    {
      text:
        "一个父亲写给弟弟：" +
        "\u201C他们要把我们送到东边去。东边是什么意思，我们都知道。" +
        "我把手表给了一个看守，他答应帮我寄出这封信，" +
        "虽然我知道他多半不会。" +
        "如果你真的奇迹般读到了这些字，" +
        "要知道，在最后时刻我想着的是你。" +
        "把店卖了，照顾好妈。" +
        "告诉我的孩子们，他们的父亲死的时候没有跪下。\u201D",
    },
    // ── P6 · 汉娜 ──
    {
      text:
        "一个十六岁的女孩在面包包装纸的背面写道：" +
        "\u201C今天是我的生日。十六岁。" +
        "没有蛋糕，没有蜡烛，没有人唱生日歌。" +
        "上铺的女人跟我说了一句生日快乐，够了。" +
        "我大概不会再有下一个生日了。" +
        "如果有人看到这张纸条——请记住，" +
        "我叫汉娜。我是真实存在过的。\u201D",
    },
    // ── P7 · 证词与证据 ──
    {
      text:
        "这些信不仅仅是告别。很多信详细描述了杀人的全过程——" +
        "火车站台上的筛选、脱衣室、毒气室、焚尸炉——" +
        "在盟国政府还拒绝相信的时候，" +
        "这些信提供了大屠杀的第一手证据。" +
        "特遣队——那些被迫在毒气室和焚尸炉旁工作的囚犯——" +
        "把自己的证词装进玻璃瓶和金属罐里，" +
        "埋在焚尸炉旁边的土里。" +
        "他们知道自己也会被杀，但他们赌有一天会有人把这些文字挖出来。" +
        "战后，人们果然找到了其中几份手稿：" +
        "扎尔门\u00B7格拉多夫斯基、莱布\u00B7朗弗斯、" +
        "扎尔门\u00B7莱文塔尔用意第绪语写下的文字——" +
        "埋在死者的骨灰中，这是大屠杀最直接的证词。",
    },
    // ── P8 · 留存 ──
    {
      text:
        "今天，这些信被保存在奥斯维辛-比克瑙纪念馆、" +
        "耶路撒冷的犹太大屠杀纪念馆、" +
        "华盛顿的美国大屠杀纪念博物馆，以及全世界的档案馆里。" +
        "纸张发黄了，墨迹褪色了，但上面的声音从未安静过。" +
        "在一个被设计成抹杀一切记忆的地方，" +
        "这些薄薄的纸片做到了不可能的事：" +
        "它们让每一个人重新变回了人——" +
        "不是编号，不是灰烬，不是虚无，" +
        "而是一个有名字、有故事、有人爱过的人。",
    },
  ],
};

async function main() {
  console.log("Pushing zh#last-letters to Story table...");
  await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log("Successfully pushed zh#last-letters");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
