import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const story = {
  siteId: "ephesus",
  langStoryId: "ja#library-celsus",
  lang: "ja",
  storyId: "library-celsus",
  title: `セルスス図書館——父への最後の贈り物`,
  subtitle: `息子の悲しみが、古代世界で最も美しい図書館を生んだ`,
  excerpt: `西暦114年、ローマ帝国有数の大都市エフェソス——現在のトルコ西海岸にあったその街で、一人の男が世を去った。ティベリウス・ユリウス・ケルスス・ポレマエアヌス。元老院議員から執政官、そしてアジア属州全体の総督にまで上り詰めた人物だ。息子のアクィラには、記念碑のひとつでも建てれば十分だったはずだ。ところが彼は、誰も予想しなかったことをやってのけた——父のために、当時世界で最も美しい図書館を建てたのだ。`,
  icon: "📚",
  tier: "A",
  era: "117–125年",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "crowns_conquests",
  coordinates: { lat: 37.9394, lng: 27.3403 },
  source: `考古学的発掘調査；奉献碑文；オーストリア考古学研究所記録`,
  characters: [
    `ケルスス（ティベリウス・ユリウス・ケルスス・ポレマエアヌス）`,
    `アクィラ（ガイウス・ユリウス・アクィラ）`,
    `ソフィア（知恵）`,
    `エピステーメー（学識）`,
    `エンノイア（思慮）`,
    `アレテー（美徳）`,
  ],
  moralOrLesson: `最も偉大な記念碑は、愛と喪失から生まれることが多い。故人のために何を築くか——それは、生きている私たち自身が何者かを語っている。`,
  paragraphs: [
    {
      text: `西暦114年、ローマ帝国有数の大都市エフェソス——現在のトルコ西海岸にあったその街で、一人の男が世を去った。ティベリウス・ユリウス・ケルスス・ポレマエアヌス。元老院議員から執政官、そしてアジア属州全体の総督にまで上り詰めた人物だ。息子のアクィラには、記念碑のひとつでも建てれば十分だったはずだ。ところが彼は、誰も予想しなかったことをやってのけた——父のために、当時世界で最も美しい図書館を建てたのだ。`,
    },
    {
      text: `建設にはおよそ十年を要し、125年頃に完成した。蔵書数は約一万二千巻。エジプトの伝説的なアレクサンドリア図書館、そしてライバル都市ペルガモンの蔵書庫に次ぐ、古代世界第三位の規模だった。だが、この図書館を特別にしていたのは大きさではない。その美しさだ。二層構造のファサードでは、外側の柱をわずかに低くすることで、建物全体が実際より壮大に見える視覚的な仕掛けが施されていた。`,
    },
    {
      text: `建築家たちは、古代の書物にとって最大の敵——湿気——への対策も講じた。壁を二重にして間に空気層を設けたのだ。言ってみれば、二千年前の空調システムである。入り口には四体の女性像が立ち、それぞれ「知恵」「学識」「思慮」「美徳」を象徴していた。これは装飾ではない。「これが私の父だった」という、息子からの無言の宣言だ。`,
    },
    {
      text: `物語はここから、もう一段深くなる。アクィラは図書館の床下に、父の大理石の石棺を安置した。ローマでは市壁の内側に死者を埋葬することは固く禁じられていた。それでも例外が認められたという事実が、エフェソスの人々のケルススへの敬意の深さを物語っている。日本には「親孝行したい時分に親はなし」ということわざがある。だがアクィラは、親がいなくなった後にこそ、史上最大の親孝行をやってみせたのだ。`,
    },
    {
      text: `図書館は百年以上にわたって繁栄した。だが262年、北方から押し寄せたゴート族——やがてローマ帝国そのものを崩壊へ追い込むゲルマンの戦士たち——がエフェソスを襲撃し、内部に火を放った。一万二千巻の書物は灰と化した。その後も度重なる地震が残された構造を崩し、やがてこの建物は土と瓦礫の下に姿を消した。千年以上もの間。`,
    },
    {
      text: `1903年、オーストリアの考古学者たちが発掘を開始した。土の中から現れたのは、ファサードの断片——柱、彫刻、あの四体の像の欠片だった。1970年から復元作業が始まり、一つひとつの石を元の位置に戻していく気の遠くなるような作業が続いた。そして1978年、ファサードは再びそびえ立った。レプリカではない。約二千年前に据えられたのと同じ石が、同じ場所に戻ったのだ。`,
    },
    {
      text: `今日、セルスス図書館はエフェソスの象徴だ。毎年数百万人がこのファサードの前で写真を撮る。だがそのほとんどは、自分が撮っているものの本当の意味を知らないだろう。この図書館は、皇帝に媚びるために建てられたのでも、権力を誇示するためでもない。父を失った息子が、世界に学びの場を贈ることこそ最高の追悼だと信じた——ただそれだけだ。その想いは、二千年近く経った今も、静かに届き続けている。`,
    },
  ],
  updatedAt: Math.floor(Date.now() / 1000),
};

async function push() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: story,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log("SUCCESS: ja#library-celsus pushed to DynamoDB");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      await docClient.send(
        new PutCommand({
          TableName: "Story",
          Item: story,
        })
      );
      console.log("SUCCESS: ja#library-celsus updated in DynamoDB");
    } else {
      console.error("FAILED:", err.message);
      process.exit(1);
    }
  }
}

push();
