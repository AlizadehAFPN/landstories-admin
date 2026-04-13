// Push Chinese (zh), Japanese (ja), and Korean (ko) recreations of
// "The Crown of Thorns in the Flames" to the Story DynamoDB table.

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
  siteId: "notre-dame-de-paris",
  storyId: "crown-of-thorns-rescue",
  icon: "\u{1F451}",
  storyCategory: "prophets_pilgrims",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 48.853, lng: 2.35 },
  source:
    "Paris Fire Brigade reports; Father Jean-Marc Fournier interviews; historical records of the Crown of Thorns",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 野火烧不尽，春风吹又生 (Bai Juyi) — subverted: the crown survives
// not because of any spring wind, but because someone BECOMES the spring wind.
// Register: Modern Mandarin, WeChat/podcast storytelling. Short punchy sentences.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#crown-of-thorns-rescue",

  title: "烈焰下的荆棘冠",

  subtitle: "消防员组成人链，从火海中抢出了基督教最神圣的圣物",

  excerpt:
    "2019年4月15日傍晚，巴黎圣母院的屋顶燃起了大火。但真正震撼人心的故事，不在屋顶——而在火海深处。",

  moralOrLesson:
    "有些东西能一次次死里逃生，不是因为运气，而是因为每一代人里，都有人觉得它值得冒生命危险去守护。",

  characters: [
    "让-马克\u00B7富尼耶神父",
    "巴黎消防员",
    "路易九世（历史人物）",
    "耶稣基督（神学人物）",
  ],

  era: "2019年4月15日（圣物可追溯至公元1世纪）",

  paragraphs: [
    {
      text: "2019年4月15日傍晚，巴黎圣母院的屋顶冒出了浓烟。不到一个小时，那片有八百五十年历史的橡木框架——中世纪的工匠管它叫\u201c森林\u201d，因为盖它砍光了整整一片森林的树——变成了一堵火墙。标志性的尖塔在全球直播中轰然倒塌，数百万人盯着屏幕，很多人流着泪。但在燃烧的大教堂里面，正在发生一件比外面任何人能想到的都更惊心动魄的事。",
    },
    {
      text: "大教堂深处，巴黎消防队神父让-马克\u00B7富尼耶正带着一队消防员执行救援任务。他们要救的不是人，而是一件被人类守护了将近两千年的东西——荆棘冠，基督徒相信耶稣被钉上十字架之前，头上戴的就是它。它锁在圣母院的宝库里，而火正在逼近。",
    },
    {
      text: "这顶荆棘冠的来历本身就是传奇。1239年，法国国王路易九世——虔诚到后来被封为圣人——从君士坦丁堡一位穷到揭不开锅的统治者手中买下了它。多少钱？超过法国全年国库收入的一半。然后路易专门为这一件圣物建了一座教堂：圣礼拜堂，至今仍是巴黎最美的建筑之一。荆棘冠运到巴黎那天，国王脱掉鞋子，赤脚走过街道去迎接它。",
    },
    {
      text: "回到着火的教堂。荆棘冠就在宝库金库里，电子锁层层保护。富尼耶神父和消防员们穿过浓烟弥漫的走廊冲到门前，却发现高温已经烧坏了电子锁。一名消防员硬生生砸开了锁。门开的瞬间，他们看见圣物安静地躺在水晶匣子里——一圈金线缠绕的草编环，在四周的烈焰与混乱中，脆弱得不像真的。",
    },
    {
      text: "没有时间小心翼翼。燃烧的碎片从头顶不断掉落。消防员们组成人链，将水晶匣子一个接一个往外传——穿过浓烟，躲过飞溅的火星，沿着被头顶大火映成橘红色的走廊——直到它到达巴黎夜空下的露天处。荆棘冠安全脱险的那一刻，富尼耶神父跪倒在地。那些以冲向危险为职业的硬汉消防员们，哭了。",
    },
    {
      text: "但真正让这个故事不可思议的，是它的规律。两千年来，荆棘冠无数次濒临毁灭——每一次，都有人站出来。它挺过了罗马帝国的覆灭。挺过了1204年十字军洗劫君士坦丁堡——讽刺的是，那是基督徒在抢自己人的城。挺过了1789年法国大革命，暴民砸烂了一切宗教象征物，一个神父在最后关头把它藏了起来。挺过了两次世界大战。2019年，又从巴黎圣母院的火海中活了下来。",
    },
    {
      text: "有人说这是运气，有人说这是巧合。有句古诗说得好：野火烧不尽，春风吹又生。但荆棘冠的故事告诉我们——它之所以烧不尽，不是因为等什么春风，而是因为每一次大火烧来时，总有一个人选择自己成为那阵春风。富尼耶神父冲进了着火的大教堂。大革命中的那个神父冒着上断头台的风险藏起了它。路易九世花掉半个国库买下了它。不管你信不信奇迹，荆棘冠一直活着——因为总有人愿意为它走进火里。",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 七転び八起き (fall seven times, rise eight) — subverted: this crown
// has fallen far more than seven times, and each time someone chose to be
// that "eighth rising."
// Register: NHK documentary / popular nonfiction. Clean, precise, emotional
// at key moments.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#crown-of-thorns-rescue",

  title: "炎の中の茨の冠",

  subtitle:
    "キリスト教最大の聖遺物を炎から救い出した、消防士たちの人間の鎖",

  excerpt:
    "2019年4月15日の夕方、パリのノートルダム大聖堂の屋根から煙が上がった。だが炎に包まれた建物の中では、外からは誰にも見えないところで、もっと劇的な出来事が起きていた。",

  moralOrLesson:
    "あるものが何度も滅びの淵から生き延びるのは、運ではない。どの時代にも、炎の中に踏み込んでそれを守ろうとする人間がいたからだ。",

  characters: [
    "\u30B8\u30E3\u30F3\uFF1D\u30DE\u30EB\u30AF\u30FB\u30D5\u30EB\u30CB\u30A8\u795E\u7236",
    "\u30D1\u30EA\u306E\u6D88\u9632\u58EB\u305F\u3061",
    "\u30EB\u30A4\u4E5D\u4E16\uFF08\u30D5\u30E9\u30F3\u30B9\u56FD\u738B\uFF09",
    "\u30A4\u30A8\u30B9\u30FB\u30AD\u30EA\u30B9\u30C8",
  ],

  era: "2019\u5E744\u670815\u65E5\uFF08\u8056\u907A\u7269\u306E\u8D77\u6E90\u306F\u7D00\u51431\u4E16\u7D00\uFF09",

  paragraphs: [
    {
      text: "2019年4月15日の夕方、パリのノートルダム大聖堂の屋根から煙が上がり始めた。1時間もしないうちに、850年前のオーク材の骨組み——中世の職人たちが「森」と呼んだ、一つの森をまるごと使い切って造ったもの——が炎の壁と化した。象徴だった尖塔がテレビの生中継で崩れ落ちる瞬間、世界中で何百万もの人が見つめ、多くが涙を流した。だが燃え盛る大聖堂の中では、外からは想像もつかない出来事が進行していた。",
    },
    {
      text: "大聖堂の奥深くで、パリ消防旅団の司祭ジャン＝マルク・フルニエ神父が消防士のチームを率いて、ある救出に向かっていた。救うのは人ではない。およそ二千年にわたり人の手で守り継がれてきたもの——茨の冠。キリスト教徒がイエスの磔刑の直前、その頭に置かれたと信じる聖遺物だ。ノートルダムの宝物庫に施錠されており、炎はそこに迫っていた。",
    },
    {
      text: "茨の冠の来歴そのものが、一つの伝説だ。1239年、フランス国王ルイ九世——のちに聖人に列せられるほど信仰に篤い王だった——が、資金難に陥っていたコンスタンティノープルの支配者から買い取った。その代価は、フランスの年間歳入の半分以上。ルイはこの聖遺物ひとつのために、パリに今も残る壮麗なサント・シャペル礼拝堂を建てた。茨の冠がパリに届いた日、王は靴を脱ぎ、裸足で街を歩いてそれを迎えた。",
    },
    {
      text: "燃える大聖堂に話を戻そう。茨の冠は宝物庫の金庫の中、電子ロックの奥にあった。フルニエ神父と消防士たちは煙に満ちた廊下を突き進んだ。しかし辿り着いた時、熱で電子ロックはすでに壊れていた。一人の消防士が力ずくで機構を叩き壊した。中にあったのは、クリスタルのケースに収まった聖遺物——金糸で束ねられた草の輪。周囲の炎と混乱の中で、あり得ないほど脆く見えた。",
    },
    {
      text: "丁寧に扱う余裕はなかった。燃える破片が頭上から降ってくる。消防士たちは人間の鎖を組み、クリスタルケースを手から手へ渡していった——煙の中を、降り注ぐ火の粉をかわし、炎でオレンジ色に染まった廊下を抜け——パリの夜空の下に出るまで。茨の冠が無事に外へ出た瞬間、フルニエ神父はその場にひざまずいた。危険に向かって走ることが日常の消防士たちが、声を上げて泣いた。",
    },
    {
      text: "この話が鳥肌ものなのは、ここからだ。茨の冠は二千年近く、何度も滅びかけてきた——そのたびに、誰かが立ち上がった。ローマ帝国の崩壊を生き延びた。1204年、十字軍がエルサレムではなく同じキリスト教徒の都コンスタンティノープルを略奪した時も残った。1789年のフランス革命で暴徒があらゆる宗教の象徴を壊す中、一人の司祭がぎりぎりで隠した。二度の世界大戦もくぐり抜けた。そして2019年、ノートルダムの炎からも逃れた。",
    },
    {
      text: "七転び八起きという言葉がある。だが茨の冠の場合、「七」ではきかない——二千年分の試練の果てに、そのたびに誰かが「八起き目」になることを選んだ。フルニエ神父は燃える大聖堂に飛び込んだ。革命時代の司祭はギロチンを覚悟で隠した。中世の王は国庫の半分を差し出した。奇跡と呼ぶかどうかは人それぞれだ。ただ一つ確かなことがある——茨の冠が今もあるのは、そのたびに誰かが、炎の中に踏み出すことを選んだからだ。",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// KOREAN (ko)
// Proverb: 세 번 찍어 안 넘어가는 나무 없다 (No tree survives three axe blows)
// — subverted: this crown was struck far more than three times across two
// thousand years, and it still stands.
// Register: Modern Korean podcast / popular nonfiction. Natural narrative
// with spoken-Korean rhythm.
// ═══════════════════════════════════════════════════════════════════════════════

const ko = {
  ...shared,
  lang: "ko",
  langStoryId: "ko#crown-of-thorns-rescue",

  title: "불길 속의 가시관",

  subtitle:
    "기독교에서 가장 신성한 성물을 화염 속에서 건져낸 소방관들의 인간 사슬",

  excerpt:
    "2019년 4월 15일 저녁, 파리 노트르담 대성당 지붕에서 연기가 피어올랐다. 하지만 불타는 건물 안에서는 바깥 누구도 모르는, 훨씬 더 극적인 일이 벌어지고 있었다.",

  moralOrLesson:
    "어떤 것이 살아남는 건 운이 아니다. 매 세대마다, 그것을 위해 불 속으로 걸어 들어가기를 택한 누군가가 있었기 때문이다.",

  characters: [
    "\uC7A5\uB9C8\uB974\uD06C \uD478\uB974\uB2C8\uC5D0 \uC2E0\uBD80",
    "\uD30C\uB9AC \uC18C\uBC29\uAD00\uB4E4",
    "\uB8E8\uC774 9\uC138(\uD504\uB791\uC2A4 \uC655)",
    "\uC608\uC218 \uADF8\uB9AC\uC2A4\uB3C4",
  ],

  era: "2019\uB144 4\uC6D4 15\uC77C (\uC131\uBB3C\uC758 \uAE30\uC6D0\uC740 \uAE30\uC6D0\uD6C4 1\uC138\uAE30)",

  paragraphs: [
    {
      text: "2019년 4월 15일 저녁, 파리 노트르담 대성당 지붕에서 연기가 올라왔다. 한 시간도 안 돼서, 850년 된 참나무 지붕 골조가\u2014\u2014중세 건축자들은 그걸 \u201c숲\u201d이라 불렀다, 진짜 숲 하나를 통째로 써야 지을 수 있었으니까\u2014\u2014불벽이 됐다. 상징이던 첨탑이 생중계로 무너지는 걸 수백만 명이 지켜봤고, 많은 사람이 울었다. 하지만 불타는 대성당 안에서는, 밖에서는 상상도 못할 일이 벌어지고 있었다.",
    },
    {
      text: "대성당 깊은 곳에서, 파리 소방대 군종신부 장마르크 푸르니에가 소방관 팀을 이끌고 구출 작전에 나서고 있었다. 사람을 구하러 간 게 아니었다. 거의 이천 년 동안 사람의 손에서 손으로 지켜져 온 것\u2014\u2014가시관. 기독교인들은 예수가 십자가에 못 박히기 직전, 그 머리에 씌워진 것이라 믿는 성물이다. 그건 노트르담 보물실 금고 안에 잠겨 있었고, 불길이 다가오고 있었다.",
    },
    {
      text: "가시관의 이력 자체가 하나의 전설이다. 1239년, 프랑스 왕 루이 9세\u2014\u2014훗날 성인 반열에 오를 만큼 독실했던 왕\u2014\u2014가 콘스탄티노플에서 돈이 궁해진 한 지배자에게서 사들였다. 값이 얼마였느냐면, 프랑스 한 해 국고 수입의 반이 넘었다. 루이는 이 성물 하나만을 위해 생트샤펠이라는 예배당을 지었다. 지금도 파리에서 가장 아름다운 건축물 중 하나다. 가시관이 파리에 도착한 날, 왕은 신발을 벗고 맨발로 거리를 걸어가 그것을 맞이했다.",
    },
    {
      text: "다시 불타는 대성당으로 돌아가자. 가시관은 보물실 금고 안, 전자 잠금장치 뒤에 있었다. 푸르니에 신부와 소방관들은 연기 가득한 복도를 뚫고 나아갔다. 도착했을 때, 열기가 전자 잠금장치를 이미 망가뜨린 뒤였다. 한 소방관이 힘으로 잠금 장치를 부쉈다. 안에는 수정 케이스에 담긴 성물이 있었다\u2014\u2014금실로 묶인 풀줄기로 엮은 고리. 사방의 불길과 혼란 속에서, 믿기 어려울 만큼 연약해 보였다.",
    },
    {
      text: "조심히 다룰 시간이 없었다. 불붙은 잔해가 머리 위로 떨어지고 있었다. 소방관들은 인간 사슬을 만들어 수정 케이스를 손에서 손으로 넘겼다\u2014\u2014연기를 뚫고, 쏟아지는 불씨를 피하며, 머리 위 화염에 주황빛으로 물든 복도를 지나\u2014\u2014파리의 밤하늘 아래로 나올 때까지. 가시관이 무사히 밖으로 나온 순간, 푸르니에 신부는 그 자리에 무릎을 꿇었다. 위험 속으로 뛰어드는 게 직업인 소방관들이 울었다.",
    },
    {
      text: "이 이야기가 소름 끼치는 건 여기서부터다. 가시관은 이천 년 가까이 수없이 사라질 위기에 처했다\u2014\u2014그때마다 누군가 나섰다. 로마 제국이 무너졌을 때도 살아남았다. 1204년 십자군이 예루살렘 대신 같은 기독교 도시 콘스탄티노플을 약탈했을 때도 살아남았다. 1789년 프랑스 혁명 때 폭도가 모든 종교 상징을 부수는 와중에, 한 사제가 간발의 차이로 숨겼다. 두 차례 세계대전도 넘겼다. 그리고 2019년, 노트르담의 불길에서도 빠져나왔다.",
    },
    {
      text: "세 번 찍어 안 넘어가는 나무 없다고 한다. 하지만 이 가시관은 달랐다. 로마의 멸망, 십자군의 약탈, 혁명의 광기, 두 번의 세계대전, 그리고 현대의 화재\u2014\u2014세 번이 아니라 수천 년에 걸친 도끼질을 버텼다. 기적이라 부를 수도 있겠다. 다만 한 가지 분명한 건, 매번 도끼가 내려칠 때마다 누군가 그 앞에 몸을 던졌다는 거다. 푸르니에 신부는 불타는 대성당에 뛰어들었고, 혁명 때 그 사제는 단두대를 각오하고 숨겼고, 루이 9세는 나라 살림 반을 내놓았다. 가시관이 아직 여기 있는 건 운이 아니다\u2014\u2014매 세대마다, 불 속으로 걸어 들어가기를 택한 누군가가 있었기 때문이다.",
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
  console.log("\u2550\u2550\u2550 Pushing Crown of Thorns CJK recreations to DynamoDB \u2550\u2550\u2550");
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja, ko]) {
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
        `\u26A0\uFE0F  ${rec.lang} total chars (${totalChars}) outside target range [800-2000]`
      );
    }
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);
  await pushStory(ko);

  console.log("\n\u2550\u2550\u2550 All three CJK recreations pushed successfully \u2550\u2550\u2550");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
