// Push Chinese (zh) and Japanese (ja) recreations of
// "Twenty-Three Nations Before the King" to the Story DynamoDB table.

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
  siteId: "persepolis",
  storyId: "twenty-three-nations",
  icon: "\u{1F3DB}\uFE0F",
  storyCategory: "riddles_past",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 29.9342, lng: 52.8914 },
  source:
    "Schmidt, Erich F., Persepolis I: Structures, Reliefs, Inscriptions (1953); Root, Margaret Cool, The King and Kingship in Achaemenid Art (1979); Briant, Pierre, From Cyrus to Alexander (2002); Garrison, Mark and Root, Margaret Cool, Seals on the Persepolis Fortification Tablets (2001–); Kuhrt, Amélie, The Persian Empire: A Corpus of Sources (2007)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 海纳百川 (The sea accepts all rivers) — subverted: the Persians
// gathered 23 rivers of different colors and carved them all into one staircase.
// Register: Modern Mandarin, WeChat/podcast storytelling. Punchy, dramatic.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#twenty-three-nations",

  title: `二十三国，无人下跪`,

  subtitle:
    `史上最强的帝国把\u201c多元\u201d刻进了石头——二十三个民族昂首走向他们的王`,

  excerpt:
    `在波斯帝国最宏伟的宫殿台阶上，二十三个民族穿着自己的衣服、带着自己的礼物、保持着自己的尊严，走在一场永不结束的队列中。这是古代世界最激进的政治宣言。`,

  moralOrLesson:
    `真正的强大不是让人跪下，而是让人站着走向你——波斯波利斯的石阶告诉后人：一个帝国的伟大不在于它强加了多少统一，而在于它容纳了多少不同。`,

  characters: [
    `大流士一世（万王之王）`,
    `薛西斯一世（完成觐见殿）`,
    `二十三个属国民族`,
    `希腊和埃及的工匠`,
    `恩斯特\u00B7赫茨费尔德（发掘者）`,
  ],

  era: `公元前515\u2013465年（建造）；1931\u20131939年（发掘）`,

  paragraphs: [
    {
      text: `伊朗南部有一片废墟，叫波斯波利斯——两千五百年前，这里是波斯帝国的礼仪之都。废墟里有一段石阶，上面的浮雕彻底改变了后人对权力的理解。石阶上刻着二十三组人，来自当时世界上最大帝国的各个角落，正朝着他们的王走去。每一组人穿自己民族的衣服，带自己家乡的礼物，保持自己的样子。没有一个人跪着。没有一个人戴锁链。在两千五百年前的世界，这简直不可想象。`,
    },
    {
      text: `雕刻的细节精细到让人窒息。埃兰人牵着一头母狮和两只幼崽，你能数清母狮皮肤下的每一块肌肉。亚美尼亚人牵着一匹马，辔头上的穗子根根分明。巴比伦人带着织物和一头驼峰牛，织物上的每根流苏都是单独凿进石头的。吕底亚的使团——来自那个传说中河水冲出黄金的国度——捧着金手镯和一辆微型战车。埃塞俄比亚人扛来了象牙。二十三个民族，每一个看起来就像它自己。`,
    },
    {
      text: `为什么这很重要？因为在波斯之前，统治中东几百年的亚述帝国，宫殿墙上刻的全是敌人被穿刺、被砍头、被活剥的画面。那就是古代帝国展示力量的方式：让你害怕。而波斯波利斯的浮雕里，没有一幕对人的暴力——一幕都没有。每个外族人站着走路，手里拿的是贡品，不是锁链。波斯人征服了巴比伦，亲眼见过那些残暴的传统，然后选了一条完全相反的路。`,
    },
    {
      text: `更绝的是，波斯人不光把这个理念刻在石头上——他们是真干了。大流士大帝在宫殿地基下埋了金银铭牌，上面写着谁造了它：石匠是希腊人和吕底亚人，金匠是米底人和埃及人，砖匠是巴比伦人。帝国最伟大的建筑，由帝国每个角落的人一起建造。中国人说海纳百川——波斯人是真把二十三条河汇在了一起，条条不同色，全部流进了同一片石阶。`,
    },
    {
      text: `石阶正中央坐着万王之王——几乎可以确定是大流士一世——一手持莲花，一手握权杖，身后站着儿子薛西斯，与父亲一样高。意思再明确不过：这个王朝会延续下去。而最神秘的画面在另一侧石阶上：一头狮子正咬住一头公牛。学者认为这是星图——春分那天，狮子座追上金牛座。那一天就是诺鲁孜节，波斯新年。整段石阶，其实是一本刻进石头的日历。`,
    },
    {
      text: `但这一切是真的吗？历史学家吵了几十年。那些贡品实际上是税收，自愿参加的背后站着军队，笑容是帝国宣传。不过，就连最怀疑的学者也承认：波斯人确实不一样。帝国创建者居鲁士大帝曾颁布法令，允许被征服的民族保留自己的神灵和习俗——这是人类最早的宗教宽容宣言之一。艺术当然有夸张，但它夸张的那些东西，是真实存在的。`,
    },
    {
      text: `公元前三三〇年，亚历山大大帝一把火烧了波斯波利斯——或许是酒后失态，但绝对是在宣示征服者的态度。讽刺的是，倒塌的废墟反而把东侧石阶埋住了，完美保存至今。七十二根柱子，如今还剩十三根。而每年春天，全世界三亿波斯语使用者庆祝诺鲁孜节，重复着两千五百年前刻在这段石阶上的仪式。那支队列还在走，还没到终点——永远也到不了。但这恰恰就是它的意义。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 十人十色 (10 people, 10 colors — everyone is different) — subverted:
// the Persians carved 二十三民族二十三色 — 23 peoples, 23 colors, all in harmony
// on a single stone staircase.
// Register: NHK documentary / popular nonfiction. Clean, precise, emotional
// at key moments.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#twenty-three-nations",

  title: "ひざまずかなかった二十三の民",

  subtitle:
    "史上最大の帝国が石に刻んだ理想——二十三の民族が尊厳を保ったまま、王の前へ歩む",

  excerpt:
    "ペルシア帝国の謁見殿に続く石段に、二十三の民族が永遠の行列を刻まれている。それぞれの衣装をまとい、それぞれの贈り物を手にし、それぞれの誇りを保ったまま。古代世界でもっとも大胆な政治的メッセージが、ここに眠っている。",

  moralOrLesson:
    "真の力とは、人をひざまずかせることではなく、立ったまま自分の前に歩ませることだ——ペルセポリスの石段は二千五百年かけて語り続けている。帝国の偉大さとは、どれだけ均一性を強いたかではなく、どれだけの多様性を包み込んだかで決まる、と。",

  characters: [
    "ダレイオス一世（大王）",
    "クセルクセス一世（アパダーナを完成）",
    "二十三の属国民族",
    "ギリシア人・エジプト人の職人たち",
    "エルンスト・ヘルツフェルト（発掘者）",
  ],

  era: "紀元前515〜465年（建設）、1931〜1939年（発掘）",

  paragraphs: [
    {
      text: "イラン南部の荒野に、ペルセポリスという廃墟がある。二千五百年前、ペルシア帝国の儀式の都だった場所だ。その一角に石段がある。この石段の浮き彫りが、「権力」というものの意味を根本から書き換えた。刻まれているのは二十三の民族。当時の世界最大の帝国のあらゆる場所から集まった人々が、王に向かって歩いている。それぞれが自分の民族衣装を着て、故郷の産物を手にしている。ひざまずいている者は一人もいない。鎖でつながれた者も一人もいない。二千五百年前の世界で、それはあり得ない光景だった。",
    },
    {
      text: "彫刻のディテールが凄まじい。エラム人は母ライオンと二頭の子ライオンを連れている——皮膚の下の筋肉まで見えるほどだ。アルメニア人が引く馬は、手綱の房飾りの一本一本まで刻まれている。バビロニア人は織物とこぶ牛を携え、織物の房は一つずつ石に彫り込まれている。リュディア——あのクロイソス王の国、川から金が採れたという伝説の地——からは金の腕輪と小さな戦車。エチオピアからは象牙。二十三の民族が、それぞれ「自分自身」の姿で刻まれている。",
    },
    {
      text: "なぜこれが衝撃的なのか。ペルシアの前に中東を数百年にわたって支配したアッシリア帝国は、宮殿をどう飾ったか。敵が串刺しにされ、首を刎ねられ、生きたまま皮を剥がれる場面だ。帝国の強さとは恐怖のことだった。だがペルセポリスの浮き彫りには、人に対する暴力が一つもない。文字通り一場面もない。すべての外国人が立って歩き、手にしているのは鎖ではなく贈り物だ。ペルシア人はバビロンを征服し、あの残虐の伝統を目の当たりにした上で、正反対を選んだ。",
    },
    {
      text: "しかもペルシア人は、理念を石に刻んだだけではない。実行した。ダレイオス大王は建物の基礎に金と銀の銘板を埋め、こう記した——石工はギリシア人とリュディア人、金細工師はメディア人とエジプト人、煉瓦職人はバビロニア人。帝国最高の建造物を、帝国のあらゆる場所の人々が造った。十人十色ということわざがある。だがペルシア人がここに刻んだのは二十三民族二十三色——そしてその全部が、一つの石段の上で調和している。",
    },
    {
      text: "石段の中央に座るのは「王の中の王」——ほぼ確実にダレイオス一世だ。蓮の花と笏を手にし、背後に息子クセルクセスが同じ高さで立っている。王朝は続く、という宣言だ。だが最も謎めいた図像は反対側にある。ライオンが雄牛に噛みついている。研究者たちはこれを星図と考えている。春分の瞬間、しし座がおうし座を追い越す。その日がノウルーズ——ペルシアの正月だ。あの行列全体が、石に刻まれた暦だった。",
    },
    {
      text: "ただし、これはどこまで本当なのか。歴史家は何十年も議論してきた。贈り物は実質、税だった。自発的参加の裏には軍隊がいた。あの笑顔はプロパガンダだった。それでも懐疑派さえ認めることがある——ペルシア人は本当に違っていた、と。帝国の創始者キュロス大王は、征服した民族に自分たちの神と習慣を守ることを許す勅令を出した。人類史上もっとも早い時期の宗教的寛容の宣言だ。芸術には誇張がある。だがその誇張の元にあったものは、確かに実在した。",
    },
    {
      text: "紀元前三三〇年、アレクサンドロス大王がペルセポリスに火を放った。酔った勢いだったかもしれないが、征服者としての意思表示だったのは間違いない。皮肉にも、崩れ落ちた瓦礫が東側の石段を埋め、完璧に保存した。七十二本あった柱のうち、今も十三本が立っている。そして毎年春になると、ペルシア語圏の三億の人々がノウルーズを祝う——二千五百年前にこの石段に刻まれた儀式を繰り返しながら。あの行列はまだ歩いている。まだ終着点に着いていない。永遠に着かない。それこそが、この行列の意味だ。",
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
  console.log("═══ Pushing Twenty-Three Nations zh/ja recreations to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      const chars = p.text.length;
      totalChars += chars;
    }
    console.log(
      `\n\uD83D\uDCCA ${rec.lang} "${rec.title}": ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
    if (totalChars < 800 || totalChars > 2000) {
      console.warn(
        `\u26A0\uFE0F  ${rec.lang} total chars (${totalChars}) outside target range [800–2000]`
      );
    }
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);

  console.log("\n═══ Both zh/ja recreations pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
