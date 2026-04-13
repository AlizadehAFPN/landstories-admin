// Push Japanese (ja) recreation of "The Last Letters" to the Story DynamoDB table.
// Cultural anchor: 言霊 (kotodama) — the belief that words carry spiritual power
// and can outlive the person who wrote them.
// Register: Modern Japanese, NHK documentary narration style. Measured, dignified,
// but deeply engaging. Like an NHK スペシャル or compelling popular nonfiction.

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
  langStoryId: "ja#last-letters",
  storyId: "last-letters",
  lang: "ja",
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

  title: "最後の手紙",

  subtitle:
    "闇の中から届けられた言葉\u2014\u2014戻れないと知りながら書き残した人々の記録",

  excerpt:
    "ナチスがアウシュヴィッツを設計したとき、目指していたのは完全な沈黙だった。" +
    "殺された人々の持ち物は没収され、名前は番号に変えられ、" +
    "遺体は焼かれて灰は風に撒かれた。" +
    "墓も標も痕跡も残さない\u2014\u2014" +
    "その人が存在したという事実そのものを消し去ること。",

  moralOrLesson:
    "言葉は忘却に対する究極の武器である。一通の手紙、壁に刻まれた名前、" +
    "灰の中に埋められた証言\u2014\u2014それだけで、" +
    "人類史上最も強力な抹殺の装置を打ち破ることができる。",

  paragraphs: [
    // ── P1 · 完全な沈黙 ──
    {
      text:
        "ナチスがアウシュヴィッツを設計したとき、" +
        "目指していたのは完全な沈黙だった。" +
        "殺された人々の持ち物は没収され、名前は番号に変えられ、" +
        "遺体は焼かれて灰は風に撒かれた。" +
        "墓も標も痕跡も残さない\u2014\u2014" +
        "その人が存在したという事実そのものを消し去ること。" +
        "それは命を奪うだけの行為ではなかった。" +
        "人が生きた記憶そのものを、この世から消す行為だった。",
    },
    // ── P2 · たった一つの武器 ──
    {
      text:
        "しかし、囚人たちはたった一つの武器を手にしていた。言葉だ。" +
        "収容所が稼働していた間、手紙やメモ、証言の断片が" +
        "驚くべき地下ネットワークを通じて外部に運び出された。" +
        "食料容器の二重底に隠され、洗濯に出される衣服の裏地に縫い込まれ、" +
        "看守の目が逸れた一瞬に有刺鉄線の向こうへ渡され、" +
        "外部作業に出る囚人の手で持ち出された。" +
        "一通の手紙を送ることは、死刑に値する行為だった。" +
        "そしてその一通一通が、" +
        "永遠に黙らされるはずだった声の、静かな抵抗だった。",
    },
    // ── P3 · 言霊 ──
    {
      text:
        "日本には\u201C言霊\u201Dという考え方がある\u2014\u2014" +
        "言葉には魂が宿り、書かれた文字は書いた人が消えた後も" +
        "生き続けるという信仰だ。" +
        "アウシュヴィッツから送り出された手紙は、" +
        "まさにその力を証明している。" +
        "ポーランド語、イディッシュ語、ハンガリー語、フランス語、" +
        "ギリシャ語、オランダ語、チェコ語\u2014\u2014" +
        "ヨーロッパ中の言葉で書かれたそれらの手紙には、" +
        "紙切れに走り書きされたものもあれば、" +
        "自分の運命を受け入れた上で、最後の数時間をかけて" +
        "丁寧に綴られた別れの言葉もあった。",
    },
    // ── P4 · 母の手紙 ──
    {
      text:
        "ある母親の手紙は、ポーランドのレジスタンスを通じて" +
        "子供たちのもとに届けられた。" +
        "\u300C私のかわいい子供たち、" +
        "お母さんは誰も帰ってこられない場所に行きます。" +
        "きょうだい仲良くしてね。パパを大切にしてね。" +
        "お母さんがあなたたちを命より大切に思っていたこと、" +
        "覚えていてね。強くいるんだよ。泣かないで。" +
        "お母さんは天国からずっと見守っているから\u300D。" +
        "彼女の名前は分からない。" +
        "この手紙が残ったのは、移送列車から投げ出されたものを" +
        "ポーランドの鉄道員が拾い、地下組織に渡したからだ。",
    },
    // ── P5 · 父の手紙 ──
    {
      text:
        "ある父親は弟に宛てて書いた。" +
        "\u300C東へ連れて行かれる。東が何を意味するか、分かっている。" +
        "看守に時計を渡して、この手紙を投函してくれと頼んだが、" +
        "おそらくしてくれないだろう。" +
        "もし奇跡的にこれを読んでいるなら、" +
        "最後に思い浮かべていたのはお前だったと知ってくれ。" +
        "店は売ってくれ。母さんを頼む。" +
        "子供たちに伝えてくれ\u2014\u2014" +
        "父親は立ったまま死んだと\u300D。",
    },
    // ── P6 · ハンナ ──
    {
      text:
        "十六歳の少女は、パンの包み紙の裏にこう書いた。" +
        "\u300C今日は私の誕生日。十六歳になった。" +
        "ケーキもロウソクも歌もない。" +
        "上の段の女の人が\u2018おめでとう\u2019と言ってくれた。" +
        "それで十分だった。" +
        "次の誕生日は、たぶん来ない。" +
        "もし誰かがこれを見つけたら、知ってほしい\u2014\u2014" +
        "私の名前はハンナ。私は確かにここにいた\u300D。",
    },
    // ── P7 · 証言と証拠 ──
    {
      text:
        "これらの手紙は、別れの言葉であると同時に虐殺の証拠でもあった。" +
        "到着時の\u201C選別\u201D、脱衣室、ガス室、焼却炉\u2014\u2014" +
        "連合国の政府がまだ信じようとしなかった時代に、" +
        "目撃者による詳細な記録が外部に届けられていた。" +
        "ゾンダーコマンド\u2014\u2014" +
        "ガス室と焼却炉での作業を強制された囚人たち\u2014\u2014は、" +
        "自分たちの証言をガラス瓶や金属缶に入れ、" +
        "焼却炉の近くの土に埋めた。自分も殺されると分かっていた。" +
        "それでも、いつか誰かがこの言葉を掘り起こしてくれると信じて。" +
        "戦後、実際にいくつかの手稿が発見された。" +
        "ザルメン\u00B7グラドフスキ、レイブ\u00B7ラングフス、" +
        "ザルメン\u00B7レヴェンタル\u2014\u2014" +
        "死者の灰の中から見つかったイディッシュ語の記録は、" +
        "ホロコーストの最も直接的な証言となった。",
    },
    // ── P8 · 響き続ける声 ──
    {
      text:
        "今日、残された手紙はアウシュヴィッツ＝ビルケナウ記念館、" +
        "エルサレムのヤド・ヴァシェム、" +
        "ワシントンの米国ホロコースト記念博物館をはじめ、" +
        "世界中の機関に保存されている。" +
        "紙は黄ばみ、インクは薄れている。" +
        "しかし、そこに刻まれた声は今も静かに響いている。" +
        "すべての記憶を消し去るために設計された場所で、" +
        "数枚の紙切れが不可能を成し遂げた\u2014\u2014" +
        "番号に、灰に、無に還元されるはずだった一人ひとりの人間を、" +
        "名前のある、物語のある、誰かに愛された存在として、" +
        "この世界に留めたのだ。",
    },
  ],
};

async function main() {
  console.log("Pushing ja#last-letters to Story table...");
  await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log("Successfully pushed ja#last-letters");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
