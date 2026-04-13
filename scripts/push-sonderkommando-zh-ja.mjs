import { readFileSync } from "node:fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// ── Load .env.local ──
const envFile = readFileSync(
  new URL("../.env.local", import.meta.url),
  "utf-8"
);
const env = {};
for (const line of envFile.split("\n")) {
  const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+)/);
  if (m) env[m[1]] = m[2].trim();
}

const client = new DynamoDBClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = env.DYNAMO_TABLE_STORY || "Story";
const now = Math.floor(Date.now() / 1000);

// ── Shared (non-text) fields ──
const base = {
  siteId: "auschwitz-birkenau",
  storyId: "sonderkommando-uprising",
  icon: "\u{1F525}",
  tier: "A",
  source:
    "Auschwitz-Birkenau Memorial archives; Sonderkommando testimonies; Yad Vashem documentation",
  characters: [
    "Ala Gertner",
    "Roza Robota",
    "Regina Safirsztajn",
    "Estera Wajcblum",
    "The Sonderkommando prisoners",
  ],
  era: "World War II (October 7, 1944)",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 19.1775, lat: 50.034 },
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  updatedAt: now,
};

// ════════════════════════════════════════════════════════════
// CHINESE (zh) — Simplified Mandarin
// ════════════════════════════════════════════════════════════
// Proverb used: 宁为玉碎、不为瓦全
// (Better to be jade shattered than a tile kept whole)
// Subversion: In Auschwitz, you don't choose whether you shatter.
//             They chose something harder — clenching their teeth shut.
// ════════════════════════════════════════════════════════════

const zhItem = {
  ...base,
  lang: "zh",
  langStoryId: "zh#sonderkommando-uprising",
  title: `以火还火`,
  subtitle: `等死的囚徒选择了反抗，四个女孩让这一切成为可能`,
  moralOrLesson: `即便死亡已成定局，选择反抗——选择战斗、拒绝沉默、不让杀你的人赢得最后的胜利——这本身就是人最大的自由。`,
  excerpt: `在奥斯维辛集中营里，有一群人比所有囚犯都更绝望。他们被叫作\u201C特别工作队\u201D——被纳粹党卫军挑出来的犹太囚犯，专门干最不是人干的活：把自己的同胞领进毒气室，搬出堆叠的尸体，从死人嘴里拔金牙，然后把遗体一具一具塞进焚尸炉。党卫军让他们吃饱饭、跟其他人隔开，不是出于什么善意，纯粹是因为这台杀人机器需要他们有力气继续运转。每个人都心知肚明——等他们知道得太多了，下一批进焚尸炉的就是自己。`,
  paragraphs: [
    {
      text: `在奥斯维辛集中营里，有一群人比所有囚犯都更绝望。他们被叫作\u201C特别工作队\u201D——被纳粹党卫军挑出来的犹太囚犯，专门干最不是人干的活：把自己的同胞领进毒气室，搬出堆叠的尸体，从死人嘴里拔金牙，然后把遗体一具一具塞进焚尸炉。党卫军让他们吃饱饭、跟其他人隔开，不是出于什么善意，纯粹是因为这台杀人机器需要他们有力气继续运转。每个人都心知肚明——等他们知道得太多了，下一批进焚尸炉的就是自己。`,
    },
    {
      text: `1944年秋天，纳粹德国的败局已经无法遮掩。苏联红军从东线步步逼近，党卫军开始疯狂销毁大屠杀的证据——拆毒气室、烧档案、炸焚尸炉，恨不得把一切痕迹从地球上抹干净。特别工作队的人看得很清楚：他们就是\u201C痕迹\u201D的一部分。轮到他们了。几个月来，一小群人在暗中谋划一件不可能的事。不是逃跑，不是等人来救，而是起义——一群已经被判了死刑的人，决定自己选择怎么死。`,
    },
    {
      text: `整个计划的命脉是火药。四个年轻的犹太女囚——阿拉\u00B7格特纳、罗扎\u00B7罗博塔、雷吉娜\u00B7萨菲尔施泰因和埃斯特拉\u00B7瓦伊茨布卢姆——在集中营旁边的军火工厂做工。几个月里，她们一点一点把火药偷出来，藏在裙子褶皱里，藏在双层底的饭盒里，一双手传一双手，经过一条秘密的囚犯接力链，最终送到焚尸炉那边。她们都才二十出头。被抓到意味着酷刑和死亡。她们照做不误。`,
    },
    {
      text: `1944年10月7日，四号焚尸炉的特别工作队得到消息：今天就要被处决。于是他们先动了手。用偷来的火药、铁罐做的土炸弹和随手能抓到的工具，他们冲向了党卫军。三名党卫军被打死，四号焚尸炉被点燃。火焰和黑烟冲上比克瑙的天空——集中营的每个角落都看得到。`,
    },
    {
      text: `二号焚尸炉的囚犯听到动静，也加入了战斗。有人剪断铁丝网冲了出去，拼命跑向空旷的田野。但党卫军的增援来得太快——士兵、军犬、压倒性的火力。逃出去的人一个接一个被追上、打死。几个小时之后，一切结束了。四百五十一名特别工作队成员死亡。有人死在战斗中，但更多的人是在投降之后被处决的。`,
    },
    {
      text: `党卫军追查到了火药来源，找到了那四个女孩。阿拉、罗扎、雷吉娜和埃斯特拉被捕，遭受了数周酷刑。纳粹要的是名字——走私链上的每一个人。人说宁为玉碎、不为瓦全——可在奥斯维辛，碎不碎由不得你。她们选了一件更难的事：咬紧牙关，一个名字都没吐出来。没有一个同伴因为她们而陷入危险。`,
    },
    {
      text: `1945年1月6日——就在苏军解放奥斯维辛的二十一天前——四个女孩在全体囚犯面前被绞死。绞索套上脖子的那一刻，罗扎\u00B7罗博塔喊出了幸存者一辈子都忘不了的话：\u201CHazak v\u2019amatz\u201D——希伯来语，意思是\u201C坚强，勇敢\u201D。`,
    },
    {
      text: `她们是奥斯维辛最后一批被处决的囚犯之一。三周后，集中营获得了自由。她们帮助摧毁的那座焚尸炉，再也没有被重建。`,
    },
  ],
};

// ════════════════════════════════════════════════════════════
// JAPANESE (ja) — Modern Japanese
// ════════════════════════════════════════════════════════════
// Proverb used: 窮鼠猫を噛む (A cornered rat bites the cat)
// Subversion: They did something more terrifying than biting —
//             they sealed their lips shut.
// ════════════════════════════════════════════════════════════

const jaItem = {
  ...base,
  lang: "ja",
  langStoryId: "ja#sonderkommando-uprising",
  title: `最後の炎`,
  subtitle: `死を待つだけの囚人たちが立ち上がった——そして、四人の女性がそれを可能にした`,
  moralOrLesson: `たとえ死が避けられないとしても、抵抗を選ぶこと——戦い、沈黙を拒み、殺す者に最後の勝利を渡さないこと——それこそが人間に残された究極の自由である。`,
  excerpt: `アウシュヴィッツには、誰よりも深い絶望の中にいた人々がいた。ゾンダーコマンド——ナチス親衛隊によって選び出されたユダヤ人囚人だ。同胞をガス室へ導き、遺体を運び出し、死者の口から金歯を抜き、亡骸を焼却炉に送り込む。それが彼らに課せられた仕事だった。親衛隊は彼らに十分な食事を与え、他の囚人から隔離した。慈悲からではない。殺戮の装置を動かし続けるために、体力が必要だったからだ。そして全員が分かっていた——知りすぎた者は、次に焼かれる。`,
  paragraphs: [
    {
      text: `アウシュヴィッツには、誰よりも深い絶望の中にいた人々がいた。ゾンダーコマンド——ナチス親衛隊によって選び出されたユダヤ人囚人だ。同胞をガス室へ導き、遺体を運び出し、死者の口から金歯を抜き、亡骸を焼却炉に送り込む。それが彼らに課せられた仕事だった。親衛隊は彼らに十分な食事を与え、他の囚人から隔離した。慈悲からではない。殺戮の装置を動かし続けるために、体力が必要だったからだ。そして全員が分かっていた——知りすぎた者は、次に焼かれる。`,
    },
    {
      text: `1944年の秋、ナチス・ドイツの敗色は濃くなっていた。ソ連軍が東から迫り、親衛隊は虐殺の証拠隠滅に動き出した。ガス室を解体し、記録を焼き、痕跡を消していく。ゾンダーコマンドの男たちには分かっていた——自分たちもまた、消されるべき\u300C証拠\u300Dだということが。数カ月前から、小さなグループが密かに計画を立てていた。脱走でも、救出でもない。蜂起だ。すでに死を宣告された者たちによる、最後の抵抗。`,
    },
    {
      text: `計画の生命線は火薬だった。四人の若いユダヤ人女性——アラ・ゲルトナー、ローザ・ロボタ、レギーナ・サフィルシュタイン、エステラ・ヴァイツブルム——が収容所に隣接する軍需工場で働いていた。何カ月もかけて、少しずつ火薬を盗み出した。スカートの折り目に隠し、二重底の食器に忍ばせ、囚人から囚人へと手渡しで、焼却炉のある建物まで届けた。全員が二十代だった。見つかれば拷問と死が待っている。それでも、やめなかった。`,
    },
    {
      text: `1944年10月7日、第四焼却炉のゾンダーコマンドに知らせが届いた——今日、処刑される。彼らは先手を打った。密かに集めた火薬、ブリキ缶で作った手製の爆弾、手に取れるものすべてを武器にして、親衛隊の警備兵に襲いかかった。親衛隊員三名が殺され、第四焼却炉が炎に包まれた。黒煙がビルケナウの空に立ち上り、収容所のどこからでも見えた。`,
    },
    {
      text: `第二焼却炉の囚人たちも戦いに加わった。鉄条網を切り裂いて外へ飛び出した者もいた。だが親衛隊の増援は速かった。兵士、軍用犬、圧倒的な火力。逃げた者たちは一人また一人と追い詰められ、撃ち殺された。数時間で全てが終わった。四百五十一人のゾンダーコマンドが命を落とした。戦闘の中で倒れた者もいた。だが大半は、降伏した後に処刑された。`,
    },
    {
      text: `親衛隊は火薬の出所を突き止め、四人の女性にたどり着いた。アラ、ローザ、レギーナ、エステラは逮捕され、何週間にもわたって拷問を受けた。親衛隊が欲しがったのは名前だった——密輸に関わったすべての人間の名前。窮鼠猫を噛むという。追い詰められれば、どんな弱い者でも噛みつく。だが彼女たちは、噛みつくよりもっと恐ろしいことをやってのけた——口を閉ざしたのだ。一つの名前も漏れなかった。一人の仲間も、彼女たちによって危険にさらされることはなかった。`,
    },
    {
      text: `1945年1月6日——ソ連軍がアウシュヴィッツを解放するわずか二十一日前——四人の女性は全囚人の前で絞首刑に処された。首に縄がかけられたとき、ローザ・ロボタが叫んだ。その言葉を、生存者たちは生涯忘れなかった。\u300Cハザク・ヴェアマツ\u300D——ヘブライ語で\u300C強くあれ、勇敢であれ\u300D。`,
    },
    {
      text: `彼女たちはアウシュヴィッツで最後に処刑された囚人の一人となった。三週間後、収容所は解放された。彼女たちが破壊を助けた焼却炉は、二度と再建されることはなかった。`,
    },
  ],
};

// ── Validate & Push ──
function validate(item) {
  const { lang, paragraphs, title, subtitle, excerpt, moralOrLesson } = item;
  if (!title || !subtitle || !excerpt || !moralOrLesson) {
    throw new Error(`[${lang}] Missing required text field`);
  }
  if (paragraphs.length < 6 || paragraphs.length > 10) {
    throw new Error(
      `[${lang}] Expected 6-10 paragraphs, got ${paragraphs.length}`
    );
  }
  const totalChars = paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(
    `[${lang}] ${paragraphs.length} paragraphs, ${totalChars} total chars`
  );
  // Verify JSON round-trip is safe
  JSON.stringify(item);
  console.log(`[${lang}] JSON validation passed`);
}

async function pushStory(item) {
  validate(item);
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );
  console.log(`\u2705 Pushed ${item.lang}: ${item.langStoryId}`);
}

async function main() {
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}\n`);

  await pushStory(zhItem);
  console.log("");
  await pushStory(jaItem);

  console.log("\n\uD83C\uDF89 Both stories pushed successfully!");
}

main().catch((err) => {
  console.error("\u274C Error:", err);
  process.exit(1);
});
