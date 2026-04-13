// Push Chinese (zh) and Japanese (ja) recreations of
// "The Shrine of the Three Magi" to the Story DynamoDB table.
//
// zh proverb: 窃钩者诛，窃国者侯 (steal a buckle, get executed; steal a country, become a lord)
//   → subverted: steal three holy bones, build a holy city
// ja proverb: 盗人にも三分の理 (even a thief has some justification)
//   → subverted: Rainald didn't have 三分の理 — he had a cathedral's worth

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical to English record) ─────────────────────────────
const shared = {
  siteId: "cologne-cathedral",
  storyId: "shrine-of-the-three-magi",
  icon: "\u{1F451}",
  storyCategory: "prophets_pilgrims",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 50.9413, lng: 6.9583 },
  source:
    "Cardini, Franco. The Three Magi: History and Legend; Wolff, Arnold. The Cologne Cathedral; Kessel, Johann Hubert. Antiquitates Colonienses, 1863",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 窃钩者诛，窃国者侯 — subverted: 偷了三具圣骨，偷出了一座圣城
// Register: Modern Mandarin, WeChat/podcast storytelling. Punchy, oral, vivid.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#shrine-of-the-three-magi",

  title: `三王圣骨`,

  subtitle: `一场中世纪最大的圣物劫掠，如何让科隆成为北欧朝圣之都`,

  excerpt: `1164年，一队武装骑兵从米兰押出一口金色大箱，翻过阿尔卑斯山直奔科隆。带队的科隆大主教莱纳德声称，箱子里装的是《圣经》中东方三博士的遗骨——基督教世界最贵重的圣物。`,

  moralOrLesson: `信仰中最伟大的圣物，往往是战争的战利品——一座靠偷来的骨头建起神圣地位的城市，永远无法彻底摆脱这个事实。`,

  characters: [
    `莱纳德\u00B7冯\u00B7达塞尔（科隆大主教）`,
    `腓特烈一世\u00B7巴巴罗萨（神圣罗马帝国皇帝）`,
    `尼古拉斯\u00B7凡尔登（金匠大师）`,
    `东方三博士（卡斯帕、梅尔基奥、巴尔塔萨）`,
    `海伦娜太后（君士坦丁大帝之母）`,
  ],

  era: `12\u201313世纪（1164\u20131225年）`,

  paragraphs: [
    {
      text: `1164年，一队全副武装的骑兵押着一口沉甸甸的金色大箱，从米兰出发，翻过阿尔卑斯山，沿莱茵河一路北上，直奔科隆。带队的人叫莱纳德\u00B7冯\u00B7达塞尔——科隆大主教，同时也是神圣罗马帝国皇帝\u201C红胡子\u201D腓特烈一世最信任的谋臣。箱子里装的东西，他对外宣称是基督教世界最贵重的遗骨：《圣经》故事里那三位追随那颗星到伯利恒、给新生的耶稣献上黄金、乳香和没药的东方三博士的遗骸。`,
    },
    {
      text: `三个来自中东的智者，骨头怎么会跑到意大利？故事要倒回公元四世纪。君士坦丁大帝的母亲海伦娜太后是个狂热的圣物收集者，她走遍已知世界搜罗与基督教有关的一切遗迹。据说她在波斯找到了三博士的遗骨，先运到君士坦丁堡，后来辗转送到了米兰的圣厄斯托焦教堂。这一放，就是八百年。整整八百年，没有人敢动这些骨头一根指头。`,
    },
    {
      text: `直到\u201C红胡子\u201D来了。米兰跟皇帝对着干了好些年，1162年，两年围城之后，终于城破。红胡子不是来招安的，是来灭城的——城墙推倒，建筑夷平，居民驱散。这是一个血淋淋的警告：北意大利的城市们，别再挑战帝国的权威。而最后那记致命的羞辱？莱纳德走进教堂，把米兰最神圣的宝贝——东方三王的圣骨——整箱搬走，运回了科隆。中世纪历史上最大规模的一次圣物劫掠，就这么完成了。`,
    },
    {
      text: `圣骨落户科隆，效果立竿见影。朝圣者从全欧洲蜂拥而至，原来的老教堂根本塞不下这么多人。于是科隆决定建一座配得上这些圣骨的新教堂——就是今天仍然矗立在莱茵河畔的那座宏伟的哥特式大教堂。为了安放圣骨，他们请来了当时最负盛名的金匠尼古拉斯\u00B7凡尔登。到1225年，他完成了整个西方世界最大的黄金圣龛：镀金银铜打造，长逾两米，镶嵌着超过一千颗宝石，表面遍布先知、使徒和国王的精美金像。`,
    },
    {
      text: `中国老话讲\u201C窃钩者诛，窃国者侯\u201D——偷个扣子要杀头，偷个国家反而封侯。莱纳德干的事更绝：偷了三具圣骨，偷出了一座圣城。科隆因此暴富。朝圣者需要吃饭、住宿、买纪念品，整座城市围绕着这三具遗骨运转起来。市徽上印着三顶金冠，主显节——纪念东方三博士朝拜耶稣的日子——成了全城最盛大的节日。北欧最神圣的城市，底下压着的全是偷来的骨头。`,
    },
    {
      text: `米兰从来没放下过这件事。整整八百年，他们一代又一代地要求科隆归还圣骨。终于在1903年，科隆大主教松了口，归还了几块碎骨。这些残片回到了圣厄斯托焦教堂，如今还安放在那里。但绝大部分遗骨从未离开过科隆。它们至今仍然躺在尼古拉斯\u00B7凡尔登打造的那个金光灿灿的圣龛里，在专为它们而建的大教堂的祭坛后方，接受世界各地信徒的瞻仰。八百多年了，这三位传说中的东方国王——他们被偷走的骨头——仍然在莱茵河畔发光。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 盗人にも三分の理 (even a thief has some justification)
//   → subverted: Rainald had not 三分の理 but a whole cathedral's worth
// Register: NHK documentary / popular nonfiction. Measured, precise, building
// to emotional payoff. Clean kanji-kana balance.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#shrine-of-the-three-magi",

  title: "三賢者の聖骨",

  subtitle:
    "ミラノから奪われた東方三博士の遺骨が、ケルンを北欧最大の巡礼都市に変えるまで",

  excerpt:
    "1164年、重装備の騎馬隊がミラノから黄金の櫃を運び出した。率いるのはケルン大司教ライナルト・フォン・ダッセル。櫃の中身は、聖書に記された「東方の三博士」の遺骨だという。",

  moralOrLesson:
    "信仰における最も偉大な宝は、しばしば戦争の略奪品である。盗まれた骨の上に聖地を築いた都市は、その真実から永遠に逃れることはできない。",

  characters: [
    "ライナルト・フォン・ダッセル（ケルン大司教）",
    "フリードリヒ1世バルバロッサ（神聖ローマ皇帝）",
    "ニコラウス・フォン・フェルデン（金細工師）",
    "東方の三博士（カスパール、メルキオール、バルタザール）",
    "ヘレナ（コンスタンティヌス大帝の母）",
  ],

  era: "12\u301C13世紀（1164\u301C1225年）",

  paragraphs: [
    {
      text: "1164年、重装備の騎馬隊がミラノから黄金の櫃を運び出した。アルプスを越え、ライン川を下り、目指す先はケルン。一隊を率いるのはライナルト・フォン・ダッセル。ケルン大司教にして、神聖ローマ皇帝フリードリヒ1世——通称「赤髭王」バルバロッサ——の最も信頼する側近だ。この櫃の中身について、ライナルトは驚くべき主張をした。聖書に記された「東方の三博士」——星に導かれてベツレヘムを訪れ、幼子イエスに黄金・乳香・没薬を献じた三人の賢者——その遺骨だというのだ。",
    },
    {
      text: "だが、なぜ中東の賢者たちの骨がイタリアにあったのか。話は4世紀にさかのぼる。キリスト教を公認したコンスタンティヌス大帝の母ヘレナは、聖遺物の収集に情熱を注いだ人物だった。彼女はペルシアで三博士の遺骨を発見し、まずコンスタンティノープルへ運んだ。やがて遺骨はミラノのサンテウストルジョ教会に移された。以来およそ800年、この聖遺物に手を触れた者はいなかった。",
    },
    {
      text: "状況を変えたのは赤髭王だった。ミラノは何年にもわたって皇帝に逆らい続けていた。1162年、2年間の包囲の末にようやく陥落すると、赤髭王は情け容赦なく報復した。城壁を破壊し、建物を打ち壊し、住民を追放した。北イタリアのあらゆる都市に対する見せしめだ。そして最後の仕上げに、ライナルトは教会に踏み込み、ミラノが最も大切にしていた宝——東方三博士の聖骨——を根こそぎ持ち去った。中世最大の聖遺物略奪が、こうして成し遂げられた。",
    },
    {
      text: "ケルンに聖骨が届くと、その影響はすさまじかった。ヨーロッパ中から巡礼者が殺到し、それまでの古い聖堂ではとても収まりきらなくなった。そこで計画されたのが、この聖骨にふさわしい新たな大聖堂——今もライン川のほとりにそびえるゴシック建築の傑作だ。聖骨を納めるために、当代随一の金細工師ニコラウス・フォン・フェルデンが招かれた。1225年までに彼が完成させたのは西方世界最大の黄金聖龕——鍍金の銀銅製で全長2メートル超、1000個以上の宝石がちりばめられ、預言者・使徒・王たちの黄金像が列をなしていた。",
    },
    {
      text: "「盗人にも三分の理」ということわざがある。だがライナルトの場合、「三分の理」どころではなかった——大聖堂ひとつ分の大義名分を手に入れたのだ。盗まれた聖骨はケルンに莫大な富をもたらした。巡礼者には宿も食事も土産も必要だ。ケルンは市の紋章に三つの黄金の冠を掲げた。公現祭——東方の三博士がイエスを訪れた日を祝う祭日——は街最大の行事となった。こうして北ヨーロッパで最も聖なる都市が生まれた。盗まれた骨の上に。",
    },
    {
      text: "ミラノは決して忘れなかった。800年にわたり、聖骨の返還を求め続けた。ようやく1903年、ケルン大司教が応じ、骨のわずかな断片が返還された。これらの断片は現在もサンテウストルジョ教会に安置されている。だが、遺骨の大部分は一度もケルンを離れていない。ニコラウス・フォン・フェルデンが造り上げた黄金の聖龕の中に、その聖骨のために建てられた大聖堂の祭壇の奥に、今なお眠っている。800年以上の歳月を経てもなお、三人の伝説の王の盗まれた遺骨は、ライン河畔で信仰の灯をともし続けている。",
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
  console.log("=== Pushing Shrine of the Three Magi zh/ja recreations to DynamoDB ===");
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
      `\n📊 ${rec.lang} "${rec.title}": ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
    if (totalChars < 800 || totalChars > 1800) {
      console.warn(
        `⚠️  ${rec.lang} total chars (${totalChars}) outside target range [800-1800]`
      );
    }
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);

  console.log("\n=== Both zh/ja recreations pushed successfully ===");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err);
  process.exit(1);
});
