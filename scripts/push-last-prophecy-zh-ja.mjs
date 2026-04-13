// Push "The Last Prophecy — The God Falls Silent" — zh, ja recreations
// Site: Delphi | Story: last-prophecy
// Each version is RECREATED natively, not translated.

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
  siteId: "delphi",
  storyId: "last-prophecy",
  icon: "\u{1F311}",
  tier: "A",
  storyCategory: "lost_found",
  era: "393 CE",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  thumbnail: "",
  image: "",
  coordinates: { lat: 38.4824, lng: 22.501 },
  source:
    "Philostorgius\u2019s Church History (quoted by Photius), Cedrenus\u2019s Compendium of History, Sozomen\u2019s Church History",
  disabled: false,
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — 最后的神谕——当神不再开口
//
// Proverb: 事不过三 — "things don't go beyond three / patience runs out"
// Subversion: The Oracle spoke for over a thousand years, far beyond three,
//   but even the longest-running voice eventually falls silent.
// Register: Modern Mandarin, WeChat-article / popular podcast storytelling.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#last-prophecy",

  title: `最后的神谕\u2014\u2014当神不再开口`,

  subtitle: `阿波罗永远沉默的那一天`,

  excerpt: `整整一千多年，德尔斐神谕是古代世界最有分量的声音。国王、将军、走投无路的普通人，纷纷赶往希腊中部这座偏远的山间圣地，只为听到一句关于未来的话。`,

  moralOrLesson: `万物皆有终，即便是神的声音也不例外。但智慧一旦说出口，便会永远回响。神谕沉默了，可她留下的教诲从未消散。`,

  characters: [
    `最后的皮提亚`,
    `罗马皇帝狄奥多西一世`,
    `阿波罗`,
  ],

  paragraphs: [
    {
      text: `一千多年。整整一千多年，德尔斐神谕是古代世界最有分量的声音。国王来过，将军来过，走投无路的普通人也来过\u2014\u2014从地中海的每一个角落赶到希腊中部这座偏远的山间圣地，就为了听一句话。一位名叫\u201c皮提亚\u201d的女祭司坐在大地裂缝的上方，吸入从地底深处升腾而起的气体，然后以太阳神阿波罗的名义开口说话。她的预言决定过战争的走向、殖民地的选址，甚至文明的兴衰。然后，公元393年，她最后一次开了口。`,
    },
    {
      text: `让她闭嘴的人叫狄奥多西一世\u2014\u2014罗马帝国历史上第一位把基督教定为唯一合法宗教的皇帝。公元391年，他一纸禁令席卷整个罗马世界：所有异教信仰一律取缔。一切献祭，一切仪式，一切神庙，统统关门。士兵们从埃及到不列颠，挨个封锁神殿大门。祭司们作鸟兽散，圣物被熔化或抢走。德尔斐本就在漫长的衰落中苟延残喘，如今连最后一线生机也即将被掐灭。`,
    },
    {
      text: `据说，狄奥多西在最后关头派了一名使者前往德尔斐\u2014\u2014是去嘲笑这个气数已尽的旧信仰，还是想亲耳确认旧神们已经认输，谁也说不准。最后一位皮提亚沿着台阶走入神庙地底的密室，最后一次攀上那座神圣的三足铜鼎，吸入从大地深处升起的气息，然后开口了。`,
    },
    {
      text: `\u201c去告诉国王吧：辉煌的神殿已坍塌在地。阿波罗再无容身之处，神圣的月桂已枯，会说话的泉眼已干。预言之水，熄灭了。\u201d`,
    },
    {
      text: `就这一句。没有谜语，没有双关，没有需要反复琢磨的弦外之音。一位神\u2014\u2014借他在人间最后一位代言人的嘴\u2014\u2014亲口承认：一切结束了。圣火被浇灭。神庙的大门最后一次合上。环绕圣地长达千年的月桂树林，无人照料，慢慢枯死了。`,
    },
    {
      text: `中国人常说\u201c事不过三\u201d，意思是再大的耐心也有用完的时候。可德尔斐的神谕开口说了一千多年，远远超过了三次。但哪怕是神的声音，也终有说到尽头的一天。此后数百年间，断断续续有人试图重启神谕，无一成功。德尔斐\u2014\u2014古希腊人口中的\u201c世界的肚脐\u201d，因为他们真心相信这里就是大地的正中心\u2014\u2014最终沦为希腊山间的又一片废墟。曾经的朝圣者变成了游客，曾经的祈祷变成了快门声。`,
    },
    {
      text: `但有些东西活了下来。神谕沉默了，可她从未真正停止说话。刻在神庙入口上方的两句话\u2014\u2014\u201c认识你自己\u201d和\u201c凡事勿过度\u201d\u2014\u2014成了西方哲学最古老的基石，两千多年后的今天依然被人挂在嘴边。世界上有一个地方，你能去问出人生中最大的那些问题\u2014\u2014这种渴望从未消失过。它活在每一种信仰里，活在每一次对意义的追问里，活在每一个深夜有人突然发问\u201c这一切到底意味着什么\u201d的时刻里。`,
    },
    {
      text: `神沉默了。但人们带到他门前的那些问题\u2014\u2014关于命运，关于自由意志，关于接下来会发生什么\u2014\u2014从来没有消失过。我们今天在问的，还是同样的问题。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — 最後の神託——神は沈黙した
//
// Proverb: 仏の顔も三度まで — "Even Buddha's patience lasts only three times"
// Subversion: The Oracle spoke thousands of times over a millennium — far beyond
//   three — yet even divine patience has its limits. Nothing lasts forever.
// Register: Modern Japanese, NHK documentary / popular nonfiction narration.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#last-prophecy",

  title: `最後の神託\u2014\u2014神は沈黙した`,

  subtitle: `アポロンの声が永遠に途絶えた日`,

  excerpt: `千年以上もの間、デルフォイの神託は古代世界で最も重い言葉だった。王も将軍も庶民も、ギリシャの山奥のこの聖地を目指した\u2014\u2014たった一言の予言を聞くために。`,

  moralOrLesson: `すべてのものには終わりがある。たとえ神の声であっても。だが一度語られた知恵は、永遠にこだまし続ける。神託は途絶えた。しかしその教えは、今も消えてはいない。`,

  characters: [
    `最後のピュティア`,
    `皇帝テオドシウス1世`,
    `アポロン`,
  ],

  paragraphs: [
    {
      text: `千年以上もの間、デルフォイの神託は古代世界で最も重い\u300c一言\u300dだった。王も将軍も、行き場を失った庶民も、地中海の果てからギリシャ中部のこの山奥の聖地を目指した。たった一言を聞くために。\u300cピュティア\u300dと呼ばれる巫女が、大地の裂け目の上に座り、地底から立ちのぼるガスを吸い込み、太陽神アポロンの言葉を告げる。その予言は戦争の行方を決め、植民地の場所を定め、文明の興亡すら左右した。そして紀元393年\u2014\u2014彼女は最後の言葉を口にした。`,
    },
    {
      text: `彼女を黙らせたのは、ローマ皇帝テオドシウス1世\u2014\u2014キリスト教を帝国唯一の公認宗教にした最初の皇帝だ。紀元391年、彼はローマ帝国全土で異教の信仰を禁じる勅令を発した。捧げものも、儀式も、神殿も、すべてだ。兵士たちはエジプトからブリテンまで、次々と聖所を封鎖していった。神官たちは散り散りになり、聖なる宝物は溶かされるか持ち去られた。長い衰退の中にあったデルフォイは、最後の命綱を断たれようとしていた。`,
    },
    {
      text: `伝承によれば、テオドシウスは最後に一人の使者をデルフォイへ送ったという。滅びゆく信仰を嘲笑うためか、それとも古い神々が自ら敗北を認める声を聞くためか\u2014\u2014理由は定かではない。最後のピュティアは神殿の地下室へ降り、最後の一度だけ、神聖な三脚の台座に上った。大地の息吹を吸い込み、そして口を開いた。`,
    },
    {
      text: `\u300c王に伝えよ。栄光の神殿は地に崩れ落ちた。アポロンにはもはや住まう場所もなく、聖なる月桂樹もなく、言葉を語る泉もない。予言の水は、尽きた\u300d`,
    },
    {
      text: `それだけだった。謎かけもない。二重の意味もない。一柱の神が\u2014\u2014最後の巫女の口を借りて\u2014\u2014終わりを認めた。ただ、それだけのことだった。聖火は消された。神殿の扉が最後に閉じられた。千年にわたって聖地を囲んでいた月桂樹の林は、やがて枯れ果てた。`,
    },
    {
      text: `日本には\u300c仏の顔も三度まで\u300dということわざがある。どんなに慈悲深い存在でも、三度までしか許してくれない。しかしデルフォイの神託は千年以上もの間、何千回となく声を上げ続けた。三度どころの話ではない。それでも\u2014\u2014いや、だからこそ\u2014\u2014永遠に続くものなど、この世にはないのだと思い知らされる。その後数百年の間に、神託を復活させようとした者もいた。だが誰一人、成功しなかった。古代ギリシャ人が\u300c世界のへそ\u300dと呼び、本気でここが大地の中心だと信じていたデルフォイは、ギリシャの山あいに残るただの遺跡になった。巡礼者は観光客に変わり、祈りの言葉はシャッター音に変わった。`,
    },
    {
      text: `だが、消えなかったものがある。神託は黙ったが、本当の意味では語りを止めなかった。神殿の入り口に刻まれていた二つの言葉\u2014\u2014\u300c汝自身を知れ\u300dと\u300c度を越すなかれ\u300d\u2014\u2014は西洋哲学の土台となり、二千年以上を経た今でも引用され続けている。この世のどこかに、人生で一番大きな問いをぶつけられる場所がある\u2014\u2014その衝動は消えていない。あらゆる宗教の中に、意味を探すすべての営みの中に、そして夜更けに誰かが\u300c結局、全部どういうことなんだろう\u300dとつぶやく瞬間の中に、生き続けている。`,
    },
    {
      text: `神は沈黙した。だが、人々が神の扉の前に持ち込んだ問い\u2014\u2014運命について、自由意志について、この先に何が待っているのかについて\u2014\u2014それは一度も途絶えたことがない。私たちが今日問いかけているのは、まったく同じ問いだ。`,
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
      ConditionExpression:
        "attribute_not_exists(siteId) OR langStoryId <> :existing",
      ExpressionAttributeValues: {
        ":existing": `en#${item.storyId}`,
      },
    })
  );

  console.log(
    `\u2705 ${label} pushed successfully (${item.paragraphs.length} paragraphs, updatedAt=${item.updatedAt})`
  );
}

async function main() {
  const stories = [zh, ja];

  console.log("\u2550".repeat(55));
  console.log("  The Last Prophecy \u2014 CJK Push (zh, ja)");
  console.log("\u2550".repeat(55));
  console.log(`Table: ${TABLE}`);
  console.log(`Site:  ${shared.siteId}`);
  console.log(`Time:  ${new Date(now * 1000).toISOString()}`);

  // Print readable text for verification
  for (const story of stories) {
    console.log(`\n--- ${story.lang.toUpperCase()} | ${story.title} ---`);
    console.log(`Subtitle: ${story.subtitle}`);
    console.log(`Excerpt: ${story.excerpt}`);
    console.log(`Paragraphs: ${story.paragraphs.length}`);
    const totalChars = story.paragraphs.reduce(
      (sum, p) => sum + p.text.length,
      0
    );
    console.log(`Total chars: ${totalChars}`);
    console.log(`Moral: ${story.moralOrLesson}`);
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
  console.log("  Both languages pushed successfully \u2705");
  console.log(`${"═".repeat(55)}\n`);
}

main();
