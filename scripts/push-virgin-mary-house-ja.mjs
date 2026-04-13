import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: { S: "ephesus" },
  langStoryId: { S: "ja#virgin-mary-house" },
  lang: { S: "ja" },
  storyId: { S: "virgin-mary-house" },
  title: { S: `\u8056\u6BCD\u306E\u5BB6\u3092\u898B\u3064\u3051\u305F\u65E5` },
  subtitle: { S: `\u30C9\u30A4\u30C4\u306E\u5C0F\u3055\u306A\u753A\u3067\u5BDD\u305F\u304D\u308A\u3060\u3063\u305F\u4FEE\u9053\u5973\u304C\u3001\u898B\u305F\u3053\u3068\u3082\u306A\u3044\u5BB6\u3092\u6B63\u78BA\u306B\u8A00\u3044\u5F53\u3066\u305F` },
  excerpt: { S: `\u30D9\u30C3\u30C9\u304B\u3089\u8D77\u304D\u4E0A\u304C\u308B\u3053\u3068\u3059\u3089\u3067\u304D\u306A\u304B\u3063\u305F\u30021800\u5E74\u4EE3\u521D\u982D\u3001\u30C9\u30A4\u30C4\u306E\u5C0F\u3055\u306A\u753A\u30C7\u30E5\u30EB\u30E1\u30F3\u306B\u66AE\u3089\u3059\u30A2\u30F3\u30CD\u30FB\u30AB\u30BF\u30EA\u30CA\u30FB\u30A8\u30E1\u30EA\u30C3\u30D2\u3068\u3044\u3046\u4FEE\u9053\u5973\u306F\u3001\u4EBA\u751F\u306E\u6700\u5F8C\u306E\u6570\u5E74\u9593\u3092\u305A\u3063\u3068\u5BDD\u305F\u304D\u308A\u3067\u904E\u3054\u3057\u305F\u3002\u3060\u304C\u3001\u305D\u306E\u30D9\u30C3\u30C9\u306E\u4E0A\u304B\u3089\u5F7C\u5973\u304C\u8A9E\u3063\u305F\u3053\u3068\u304C\u3001\u4ECA\u3082\u8AB0\u306B\u3082\u8AAC\u660E\u3067\u304D\u306A\u3044\u3002` },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: `ベッドから起き上がることすらできなかった。1800年代初頭、ドイツの小さな町デュルメンに暮らすアンネ・カタリナ・エメリッヒという修道女は、人生の最後の数年間を寝たきりで過ごしていた。しかし、そのベッドの上で彼女はあることを語り始める。一度も行ったことのない国にある、一度も見たことのない家の話だ。そして六十年後、誰かがその言葉を頼りに探しに行ったら\u2014\u2014本当にそこにあった。`
          },
        },
      },
      {
        M: {
          text: {
            S: `エメリッヒは幼い頃から幻視を体験していた。聖書に描かれた場面が突然目の前に広がり、まるで自分がその場に立っているかのように細部まで見えたという。両手両足にはキリストの磔刑と同じ位置に傷が現れ\u2014\u2014いわゆる\u300C聖痕\u300Dで、当時の医師たちが繰り返し診察しても原因はわからなかった。1820年から1824年にかけて、ドイツの詩人クレメンス・ブレンターノがほぼ毎日彼女のそばに付き添い、語られる幻視の内容をすべて書き留めた。のちにそれは本として出版される。`
          },
        },
      },
      {
        M: {
          text: {
            S: `数ある幻視のなかで、ひとつだけ際立って具体的なものがあった。聖母マリアが最後に暮らした家の描写だ。場所は古代都市エフェソスを見下ろす山の上、現在のトルコ西海岸にあたる。キリスト教の伝承では、イエスの十字架刑のあと、使徒ヨハネがマリアをこの地に連れてきて匿ったとされている。エメリッヒは部屋の配置、家のそばの泉、山の稜線、眼下に広がる海の眺めまで、驚くほど細かく描写した。`
          },
        },
      },
      {
        M: {
          text: {
            S: `1881年、フランス人神父ジュリアン・グイエがその記録を読み、自分の目で確かめに行くことを決意する。エメリッヒの言葉だけを頼りにエフェソスへ向かい、コレソス山を登った。地元の人々はこの山を\u300Cビュルビュル・ダー\u300D\u2014\u2014\u300Cナイチンゲールの山\u300Dと呼んでいる。彼女が描写したまさにその場所に、小さな石造りの家の廃墟があった。泉も、部屋の配置も、すべてが一致した。`
          },
        },
      },
      {
        M: {
          text: {
            S: `その十年後、ラザリスト会の宣教師団が考古学者を伴って本格的な発掘に戻ってきた。調査結果は衝撃的だった。基礎部分の年代は紀元一世紀\u2014\u2014マリアが実際にここで暮らしていてもおかしくない時代のものだった。中世に作り上げられた伝説の上に建てられた遺跡ではない。石そのものが、十分に古かったのだ。`
          },
        },
      },
      {
        M: {
          text: {
            S: `バチカンもこれを無視できなかった。1896年、教皇レオ13世がこの場所を公式な巡礼地に認定する。以来、三人の教皇が自ら足を運んでいる。1967年のパウロ6世、1979年のヨハネ・パウロ2世、2006年のベネディクト16世。ただし、訪れるのはキリスト教徒だけではない。イスラム教でもマリアは\u300Cマルヤム\u300Dとして深く敬われ、クルアーンには彼女の名を冠した章がまるごとある。この小さな家は、信仰の垣根を越えて人を引き寄せ続けている。`
          },
        },
      },
      {
        M: {
          text: {
            S: `日本には\u300C三度目の正直\u300Dということわざがある。だがこの話では、三度どころではない。部屋の配置、泉の場所、山の形、海の方角、石の年代\u2014\u2014寝たきりの女性が語った細部が、ひとつ残らず正しかった。エメリッヒは生涯ドイツを出なかった。エフェソスの地図を見たこともない。そこを訪れた人と話したこともない。デュルメンの小さな部屋で何が起きたのか、それは誰にもわからない。だが、山の上のあの家は実在する。今日でも、その扉を開けて中に入ることができる。`
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: `説明がつかないことは、世の中にある。あの家は今も山の上に建っていて、答えはまだ出ていない。`,
  },
  source: {
    S: "Anne Catherine Emmerich visions, compiled by Clemens Brentano; Lazarist expedition records; Papal recognitions",
  },
  characters: {
    L: [
      { S: "Virgin Mary" },
      { S: "John the Apostle" },
      { S: "Anne Catherine Emmerich" },
      { S: "Abb\u00E9 Julien Gouyet" },
    ],
  },
  era: { S: "1st century AD (house) / 1881 (discovery)" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  thumbnail: { S: "" },
  icon: { S: "\uD83C\uDFE0" },
  tier: { S: "A" },
  coordinates: {
    M: {
      lng: { N: "27.3333" },
      lat: { N: "37.9147" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  storyCategory: { S: "prophets_pilgrims" },
  updatedAt: { N: String(now) },
};

async function main() {
  try {
    await client.send(
      new PutItemCommand({
        TableName: "Story",
        Item: item,
      })
    );
    console.log("ja#virgin-mary-house pushed successfully");
  } catch (err) {
    console.error("Failed to push ja version:", err);
    process.exit(1);
  }
}

main();
