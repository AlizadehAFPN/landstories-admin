// Push "Theseus, Ariadne, and the Thread" — zh, ja versions
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
  storyId: "theseus-ariadne",
  icon: "\u{1F9F5}",         // 🧵
  tier: "A",
  storyCategory: "love_heartbreak",
  era: "Mythological Era",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  thumbnail: "",
  image: "",
  coordinates: { lat: 35.2981, lng: 25.1631 },
  source: "Plutarch\u2019s Life of Theseus, Apollodorus\u2019s Bibliotheca, Catullus 64, Ovid\u2019s Heroides",
  characters: ["Theseus", "Ariadne", "The Minotaur", "King Minos", "King Aegeus", "Dionysus"],
  disabled: false,
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — 忒修斯、阿里阿德涅与那根线
// ═══════════════════════════════════════════════════════════════════════════════
//
// Register: Modern Mandarin, WeChat-article / popular podcast style.
// Proverb (subverted): 事不过三 — "things don't go past three."
//   Normal meaning: patience runs out after three times.
//   Subverted here: by the third human tribute, someone finally snapped.
// Quotable line: 被英雄抛弃的姑娘，最后嫁给了神。

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#theseus-ariadne",
  title: `忒修斯、阿里阿德涅与那根线`,
  subtitle: `爱情、背叛，以及一场弑怪之战`,
  excerpt: `每隔九年，雅典要送出十四条年轻的命\u2014\u2014七个男孩，七个女孩，送去克里特岛，喂给一头半人半牛的怪物。`,
  moralOrLesson: `再伟大的英雄也有致命的弱点。忒修斯拯救了雅典，却辜负了救他的人，又因一时大意害死了自己的父亲。每一场胜利的背后，都藏着失去。`,
  paragraphs: [
    {
      text: `每隔九年，雅典要送出十四条年轻的命。七个男孩，七个女孩，送去克里特岛，喂给一头半人半牛的怪物。这头怪物叫弥诺陶洛斯，住在克诺索斯宫殿下面的一座迷宫里\u2014\u2014进去的人，没有一个活着出来。这是克里特国王弥诺斯打赢战争后定下的规矩。都说事不过三，到了第三次进贡，终于有人忍不了了。雅典王子忒修斯站出来对父亲说：这次，我自己去。那个怪物，我来杀。`,
    },
    {
      text: `老国王埃勾斯拼了命地拦。但忒修斯铁了心。出发前，父亲只求了一件事：船出海时挂的是黑帆，那是丧事的颜色。如果你活着回来，换成白帆\u2014\u2014我站在悬崖上，老远就能看见。忒修斯发了誓。然后他扬帆，驶向克里特。`,
    },
    {
      text: `雅典的年轻人被押到弥诺斯王面前示众。在所有人眼里，他们已经是下一批死人。但人群中有一双眼睛，从头到尾只看一个人。公主阿里阿德涅看见忒修斯的那一刻，整个人就陷了进去。他戴着锁链，却没有半点怯意\u2014\u2014那双眼睛像是在向整座岛宣战。当天夜里，她偷偷溜到他的牢房，带了两样东西：一把剑，一团线。`,
    },
    {
      text: `计划简单得要命。\u201c把线头系在迷宫入口，一边走一边放线。杀了那东西之后，顺着线原路走出来就行。\u201d从来没人想到过这一招\u2014\u2014又或者，从来没有人为一个囚犯愿意赌上一切。忒修斯发誓：带她去雅典，娶她为后。她把全部身家押在了一个刚认识的人身上。而他给了她一句话。`,
    },
    {
      text: `天刚亮，忒修斯把线系在入口，踏进了彻底的黑暗。死路、岔口、走了一圈又回到原点的通道\u2014\u2014迷宫就是为了让人崩溃而造的。他咬着牙往前走，身后的线一寸寸展开，那是他唯一的活路。在最深处，他撞上了弥诺陶洛斯。这是一场死斗。怪物低头用角猛冲过来，吼声能把墙震裂。但忒修斯心里装着每一个被送到这里送死的雅典孩子。他一剑穿心。然后\u2014\u2014整座迷宫安静了。`,
    },
    {
      text: `他顺着线走出黑暗。阳光底下，阿里阿德涅正等在那里。他们放出所有俘虏，冲到港口，驶向雅典。阿里阿德涅以为她在奔向全新的人生。她错了。船在纳克索斯岛靠岸时，忒修斯把她丢在了那里。忘了？厌了？还是被神命令的？没人知道。她醒来时只剩自己一个人，站在沙滩上，看着那艘船在海平线上一点一点缩小，直到什么都不剩。`,
    },
    {
      text: `但命运没有抛弃阿里阿德涅\u2014\u2014只是换了一种方式。酒神狄俄尼索斯在那片沙滩上找到了她，一眼就爱上了她，娶她为妻，赐她永生。他摘下她头上的冠冕，朝夜空一抛\u2014\u2014那顶冠变成了一圈星星，就是北冕座。夏天的晚上抬头看，你还能看见它。被英雄抛弃的姑娘，最后嫁给了神。`,
    },
    {
      text: `而忒修斯的代价，紧跟着就到了。是胜利冲昏了头，还是对阿里阿德涅的亏欠搅乱了心神\u2014\u2014他忘了换帆。老国王埃勾斯站在苏尼翁海角的悬崖上，死死盯着海面。他等的是白色。看到的，是黑色。他以为儿子死了。老人纵身跳进了大海\u2014\u2014这片海到今天还叫爱琴海，就是用他的名字命的名。杀掉怪物的英雄回到家，却发现自己亲手毁了父亲。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — テセウス、アリアドネ、そして一本の糸
// ═══════════════════════════════════════════════════════════════════════════════
//
// Register: Modern Japanese, NHK documentary / popular nonfiction style.
// Proverb (subverted): 仏の顔も三度まで — "Even Buddha's patience lasts only three times."
//   Normal meaning: everyone has a limit.
//   Subverted here: by the third tribute of human sacrifice, Theseus had reached his.
// Quotable line: 英雄に捨てられた娘は、神の花嫁になった。

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#theseus-ariadne",
  title: `テセウス、アリアドネ、そして一本の糸`,
  subtitle: `愛と裏切り、そして怪物退治の神話`,
  excerpt: `九年に一度、アテナイは十四人の若者をクレタ島に差し出さなければならなかった\u2014\u2014少年七人、少女七人、怪物の餌として。`,
  moralOrLesson: `英雄にも弱さはある。テセウスはアテナイを救ったが、自分を救ってくれた人を裏切り、うっかりで父を死なせた。勝利のすぐ隣には、いつも喪失がある。`,
  paragraphs: [
    {
      text: `九年に一度、アテナイは十四人の若者をクレタ島に差し出さなければならなかった。少年七人、少女七人。クノッソス宮殿の地下に広がる迷宮\u2014\u2014ラビュリントスに棲む怪物、ミノタウロスの餌として。半人半牛のその化け物が待つ迷宮に足を踏み入れて、生きて戻った者は一人もいない。クレタ王ミノスが戦に勝った代償として、アテナイに突きつけた条件だった。仏の顔も三度までという。三度目の生贄の年、ついに一人の王子が立ち上がった。テセウス。父王アイゲウスにこう告げた。\u300c今度は俺が行く。あの化け物は、俺が殺す\u300d`,
    },
    {
      text: `父は必死で止めた。だがテセウスは聞く耳を持たなかった。出航の前、アイゲウスはひとつだけ頼んだ。船は黒い帆で出る\u2014\u2014弔いの色だ。もし生きていたら、帰りは白い帆に替えてくれ。岬の上から、遠くからでもわかるから。テセウスは誓った。そしてクレタへ漕ぎ出した。`,
    },
    {
      text: `クレタに着いたアテナイの若者たちは、ミノス王の前に引き出された。誰が見ても、もう死んだも同然の顔ぶれだった。けれど群衆の中に、一人だけ目が釘付けになった者がいる。王女アリアドネだ。テセウスを見た瞬間、心を持っていかれた。鎖につながれているのに、恐れのかけらもない。その目は、まるでクレタ全体に喧嘩を売っているようだった。その夜、アリアドネはテセウスの牢に忍び込んだ。手には二つの贈り物\u2014\u2014鋭い剣と、一玉の糸。`,
    },
    {
      text: `作戦はごくシンプルだった。\u300c迷宮の入口にこの糸を結んで。奥に進みながら糸を伸ばして。怪物を倒したら、糸をたどって戻ればいい\u300d。今まで誰も思いつかなかったのか\u2014\u2014それとも、囚人のためにそこまでする人間がいなかっただけか。テセウスは誓った。アテナイに連れて帰る、必ず妻にすると。彼女は見ず知らずの男にすべてを賭けた。テセウスは、言葉で応えた。`,
    },
    {
      text: `夜明けとともに、テセウスはアリアドネの糸を入口に結び、完全な闇の中へ踏み出した。行き止まり、分かれ道、ぐるっと回って元の場所に戻る通路\u2014\u2014この迷宮は、人間の心を折るために造られたものだった。それでもテセウスは進み続けた。背後で伸びていく糸だけが、唯一の命綱。最も深い部屋で、ミノタウロスと向き合った。凄まじい戦いだった。怪物が角を突き出し、轟音とともに突っ込んでくる。だがテセウスは、ここで命を落としたすべてのアテナイの子供たちのために戦った。剣を怪物の心臓に突き立てた。そして\u2014\u2014静寂。`,
    },
    {
      text: `糸をたどり、闇を抜け、陽の光の中に出ると\u2014\u2014アリアドネが待っていた。囚人たちを解放し、港まで走り、アテナイを目指して船を出した。アリアドネは信じていた。これが新しい人生の始まりだと。だが、違った。ナクソス島で、テセウスは彼女を置いていった。忘れたのか。飽きたのか。神に命じられたのか。誰にもわからない。目が覚めたとき、アリアドネは砂浜にたった一人きりだった。水平線の向こうに消えていく船を、ただ見つめていた。`,
    },
    {
      text: `だが、物語はアリアドネを見捨てなかった。酒神ディオニュソスがあの浜辺で彼女を見つけ、一目で恋に落ちた。不死の妻として迎え入れ、彼女の頭から冠を取ると、夜空に向かって放り投げた。冠は星座になった\u2014\u2014かんむり座。夏の夜空を見上げれば、今でもそこにある。英雄に捨てられた娘は、神の花嫁になった。`,
    },
    {
      text: `一方、テセウスには報いが待っていた。勝利の興奮か、アリアドネへの後ろめたさか\u2014\u2014理由はわからない。ただひとつ確かなのは、彼が帆を替え忘れたということだ。父アイゲウスはスーニオン岬の崖の上に立ち、海を見つめていた。白い帆を、ずっと待っていた。見えたのは\u2014\u2014黒。息子は死んだのだと思った。老王は海に身を投げた。その海は今も彼の名前で呼ばれている\u2014\u2014エーゲ海。怪物を倒した英雄が故郷に帰り着いたとき、自分の手で父を失っていたことを知った。`,
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

  console.log("\u2550".repeat(60));
  console.log("  Theseus, Ariadne & the Thread \u2014 CJK Push (zh, ja)");
  console.log("\u2550".repeat(60));
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

  console.log("\n" + "\u2550".repeat(60));
  console.log("  Both languages pushed successfully \u2705");
  console.log("\u2550".repeat(60) + "\n");
}

main();
