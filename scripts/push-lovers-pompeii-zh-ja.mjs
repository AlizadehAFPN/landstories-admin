import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───────────────────────────
const shared = {
  siteId: "pompeii",
  storyId: "lovers-of-pompeii",
  icon: "\u{1F494}",
  storyCategory: "lost_found",
  era: "79 AD (reanalyzed 2017)",
  tier: "A",
  isFree: true,
  isFeatured: false,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 40.749, lng: 14.4875 },
  disabled: false,
  source:
    "Lazer, Estelle. Resurrecting Pompeii, 2009; University of Florence DNA study, 2017; National Geographic coverage",
  characters: [
    "The Two Embracing Figures (unidentified males, ages 18-20)",
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb subverted: \u201c\u773c\u89c1\u4e3a\u5b9e\u201d (seeing is believing)
// \u2014 subverted: what we \u201csaw\u201d for a century was only what we wanted to see
// ═══════════════════════════════════════════════════════════════════════
const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#lovers-of-pompeii",
  updatedAt: NOW,

  title: `\u5e9e\u8d1d\u6700\u540e\u7684\u62e5\u62b1`,
  subtitle: `\u4e00\u4e2a\u8de8\u8d8a\u4e24\u5343\u5e74\u7684\u8bef\u89e3\uff0c\u548c\u4e00\u4efd\u65e0\u6cd5\u5b9a\u4e49\u7684\u6df1\u60c5`,
  excerpt: `\u516c\u5143\uff17\uff19\u5e74\uff0c\u7ef4\u82cf\u5a01\u706b\u5c71\u6beb\u65e0\u9884\u5146\u5730\u7206\u53d1\u4e86\u3002\u6eda\u70eb\u7684\u706b\u5c71\u7070\u548c\u6bd2\u6c14\u541e\u6ca1\u4e86\u6574\u5ea7\u5e9e\u8d1d\u57ce\uff0c\u51e0\u5343\u4eba\u8fde\u9003\u8dd1\u7684\u673a\u4f1a\u90fd\u6ca1\u6709\u3002`,
  moralOrLesson: `\u4e0d\u7ba1\u7231\u4ee5\u4ec0\u4e48\u5f62\u5f0f\u5b58\u5728\uff0c\u5b83\u90fd\u662f\u6211\u4eec\u5728\u5931\u53bb\u4e00\u5207\u65f6\u6700\u540e\u6293\u4f4f\u7684\u4e1c\u897f\u2014\u2014\u800c\u6211\u4eec\u600e\u4e48\u89e3\u8bfb\u6b7b\u8005\u7684\u6545\u4e8b\uff0c\u8bf4\u7684\u5176\u5b9e\u662f\u6211\u4eec\u81ea\u5df1\u3002`,

  paragraphs: [
    {
      text: `\u516c\u5143\uff17\uff19\u5e74\uff0c\u7ef4\u82cf\u5a01\u706b\u5c71\u6beb\u65e0\u9884\u5146\u5730\u7206\u53d1\u4e86\u3002\u6eda\u70eb\u7684\u706b\u5c71\u7070\u548c\u6bd2\u6c14\u541e\u6ca1\u4e86\u6574\u5ea7\u5e9e\u8d1d\u57ce\uff0c\u51e0\u5343\u4eba\u8fde\u9003\u8dd1\u7684\u673a\u4f1a\u90fd\u6ca1\u6709\u3002\u51e0\u767e\u5e74\u540e\uff0c\u8003\u53e4\u5b66\u5bb6\u53d1\u73b0\uff0c\u90a3\u4e9b\u9047\u96be\u8005\u7684\u8eab\u4f53\u5728\u786c\u5316\u7684\u706b\u5c71\u7070\u91cc\u7559\u4e0b\u4e86\u7a7a\u8154\u3002\u5f80\u91cc\u9762\u704c\u5165\u77f3\u818f\uff0c\u5c31\u80fd\u8fd8\u539f\u4ed6\u4eec\u6b7b\u53bb\u90a3\u4e00\u523b\u7684\u59ff\u6001\u3002\u5728\u6570\u767e\u5177\u4ee4\u4eba\u5fc3\u788e\u7684\u77f3\u818f\u50cf\u4e2d\uff0c\u6709\u4e00\u7ec4\u8ba9\u6240\u6709\u4eba\u90fd\u505c\u4e0b\u4e86\u811a\u6b65\uff1a\u4e24\u4e2a\u4eba\u7d27\u7d27\u7f20\u7ed5\u5728\u4e00\u8d77\uff0c\u4e00\u4e2a\u62a4\u4f4f\u53e6\u4e00\u4e2a\uff0c\u5728\u4e16\u754c\u7ec8\u7ed3\u7684\u90a3\u4e00\u523b\u6b7b\u6b7b\u4e0d\u653e\u624b\u3002`,
    },
    {
      text: `\u4e00\u767e\u591a\u5e74\u6765\uff0c\u4eba\u4eec\u53eb\u4ed6\u4eec\u201c\u4e24\u4f4d\u5c11\u5973\u201d\u3002\u8fd9\u6545\u4e8b\u542c\u8d77\u6765\u5929\u7ecf\u5730\u4e49\uff1a\u4e24\u4e2a\u5e74\u8f7b\u5973\u5b69\u2014\u2014\u4e5f\u8bb8\u662f\u59d0\u59b9\uff0c\u4e5f\u8bb8\u662f\u6bcd\u5973\u2014\u2014\u5728\u6b7b\u4ea1\u6765\u4e34\u65f6\u7d27\u7d27\u76f8\u4f9d\u3002\u59ff\u6001\u6e29\u67d4\uff0c\u8eab\u5f62\u7ea4\u7ec6\uff0c\u5341\u4e5d\u4e16\u7eaa\u7684\u5b66\u8005\u4ece\u6ca1\u60f3\u8fc7\u8981\u8d28\u7591\u3002\u4e00\u4ee3\u53c8\u4e00\u4ee3\u7684\u5bfc\u6e38\u91cd\u590d\u7740\u540c\u6837\u7684\u8bdd\u3002\u201c\u4e24\u4f4d\u5c11\u5973\u201d\u6210\u4e86\u5e9e\u8d1d\u6700\u6709\u540d\u7684\u7b26\u53f7\u4e4b\u4e00\u2014\u2014\u4e00\u5e45\u88ab\u706b\u5c71\u7070\u51dd\u56fa\u7684\u6df1\u60c5\u753b\u9762\u3002`,
    },
    {
      text: `\u7136\u540e\uff0c2017\u5e74\uff0c\u4f5b\u7f57\u4f26\u8428\u5927\u5b66\u7684\u4e00\u4e2a\u56e2\u961f\u7528CT\u626b\u63cf\u548cDNA\u68c0\u6d4b\u91cd\u65b0\u5ba1\u89c6\u4e86\u8fd9\u7ec4\u77f3\u818f\u50cf\u2014\u2014\u8fd9\u662f\u5b83\u4eec\u88ab\u53d1\u73b0\u65f6\u6839\u672c\u4e0d\u5b58\u5728\u7684\u6280\u672f\u3002\u7ed3\u679c\uff0c\u4e00\u767e\u591a\u5e74\u7684\u8ba4\u77e5\u88ab\u5f7b\u5e95\u98a0\u8986\u4e86\u3002\u90a3\u4e24\u4f4d\u201c\u5c11\u5973\u201d\u6839\u672c\u4e0d\u662f\u5973\u6027\u3002\u4e24\u4e2a\u4eba\u90fd\u662f\u7537\u7684\u3002\u5e74\u9f84\u5927\u7ea6\u5341\u516b\u5230\u4e8c\u5341\u5c81\u3002\u4e24\u4e2a\u5e74\u8f7b\u7537\u4eba\uff0c\u5728\u706b\u5c71\u6740\u6b7b\u5468\u56f4\u6240\u6709\u4eba\u7684\u65f6\u5019\uff0c\u62b1\u5728\u4e86\u4e00\u8d77\u3002`,
    },
    {
      text: `\u6d88\u606f\u4e00\u51fa\uff0c\u5168\u7403\u54d7\u7136\u3002\u6700\u663e\u800c\u6613\u89c1\u7684\u95ee\u9898\u6765\u4e86\uff1a\u4ed6\u4eec\u5230\u5e95\u662f\u4ec0\u4e48\u5173\u7cfb\uff1f\u79d1\u5b66\u56de\u7b54\u4e0d\u4e86\u8fd9\u4e2a\u3002\u4ed6\u4eec\u53ef\u80fd\u662f\u5144\u5f1f\uff0c\u53ef\u80fd\u662f\u631a\u53cb\uff0c\u4e5f\u53ef\u80fd\u662f\u604b\u4eba\u3002\u5728\u53e4\u7f57\u9a6c\uff0c\u7537\u6027\u4e4b\u95f4\u7684\u4eb2\u5bc6\u5173\u7cfb\u662f\u516c\u5f00\u4e14\u5e38\u89c1\u7684\u2014\u2014\u867d\u7136\u793e\u4f1a\u5bf9\u8c01\u80fd\u8ddf\u8c01\u5728\u4e00\u8d77\u6709\u4e25\u683c\u7684\u9636\u5c42\u89c4\u77e9\u3002\u4ed6\u4eec\u4e4b\u95f4\u53ef\u80fd\u662f\u4efb\u4f55\u5173\u7cfb\u3002\u706b\u5c71\u7070\u4fdd\u5b58\u4e86\u4ed6\u4eec\u7684\u8eab\u4f53\uff0c\u5374\u6ca1\u6709\u4fdd\u5b58\u4ed6\u4eec\u7684\u6545\u4e8b\u3002`,
    },
    {
      text: `\u4f46\u4ed6\u4eec\u7684\u59ff\u6001\u672c\u8eab\u5df2\u7ecf\u8bf4\u660e\u4e86\u4e00\u5207\uff1a\u5f53\u5929\u7a7a\u53d8\u9ed1\u3001\u7a7a\u6c14\u53d8\u6210\u6bd2\u836f\u7684\u65f6\u5019\uff0c\u8fd9\u4e24\u4e2a\u4eba\u6ca1\u6709\u5404\u5954\u4e1c\u897f\u3002\u4ed6\u4eec\u4f38\u624b\u627e\u5230\u4e86\u5f7c\u6b64\u3002\u4e00\u4e2a\u4eba\u8e61\u7f29\u7740\u62a4\u4f4f\u53e6\u4e00\u4e2a\uff0c\u8138\u7d27\u8d34\u7740\u5bf9\u65b9\u7684\u8eab\u4f53\uff0c\u53cc\u81c2\u7d27\u7d27\u73af\u7ed5\u3002\u8fd9\u4e2a\u52a8\u4f5c\u4e0d\u9700\u8981\u4efb\u4f55\u6807\u7b7e\u3002\u5144\u5f1f\u4f1a\u8fd9\u6837\u505a\uff0c\u670b\u53cb\u4f1a\u8fd9\u6837\u505a\uff0c\u604b\u4eba\u4e5f\u4f1a\u8fd9\u6837\u505a\u3002\u4e24\u4e2a\u4e0d\u613f\u8ba9\u5728\u4e4e\u7684\u4eba\u72ec\u81ea\u8d74\u6b7b\u7684\u4eba\u2014\u2014\u8fd9\u5c31\u662f\u5168\u90e8\u3002`,
    },
    {
      text: `\u6211\u4eec\u5e38\u8bf4\u201c\u773c\u89c1\u4e3a\u5b9e\u201d\uff0c\u4f46\u8fd9\u4e2a\u6301\u7eed\u767e\u5e74\u7684\u8bef\u8ba4\u6070\u6070\u8bc1\u660e\u4e86\u76f8\u53cd\u2014\u2014\u6211\u4eec\u770b\u5230\u7684\uff0c\u5f80\u5f80\u53ea\u662f\u6211\u4eec\u60f3\u770b\u5230\u7684\u3002\u5341\u4e5d\u4e16\u7eaa\u7684\u5b66\u8005\u770b\u5230\u6e29\u67d4\u5c31\u8ba4\u5b9a\u662f\u201c\u5973\u6027\u201d\uff0c\u4ece\u6ca1\u60f3\u8fc7\u4e24\u4e2a\u7537\u4eba\u4e5f\u4f1a\u8fd9\u6837\u62e5\u62b1\u3002\u8fd9\u4e2a\u9519\u8bef\uff0c\u4e0e\u5176\u8bf4\u66b4\u9732\u4e86\u77f3\u818f\u50cf\u7684\u79d8\u5bc6\uff0c\u4e0d\u5982\u8bf4\u66b4\u9732\u4e86\u89e3\u8bfb\u8005\u81ea\u5df1\u7684\u76f2\u533a\u3002`,
    },
    {
      text: `\u4eca\u5929\uff0c\u4eba\u4eec\u6709\u65f6\u53eb\u4ed6\u4eec\u201c\u5e9e\u8d1d\u7684\u604b\u4eba\u201d\uff0c\u5c3d\u7ba1\u6ca1\u6709\u4efb\u4f55\u5b98\u65b9\u540d\u79f0\u6562\u8fd9\u6837\u5b9a\u8bba\u3002\u6bcf\u4e2a\u65f6\u4ee3\u90fd\u900f\u8fc7\u81ea\u5df1\u7684\u773c\u5149\u53bb\u89e3\u8bfb\u8fd9\u4e2a\u62e5\u62b1\u3002\u4f46\u753b\u9762\u4ece\u672a\u6539\u53d8\u3002\u4e24\u4e2a\u521a\u521a\u6210\u5e74\u7684\u5e74\u8f7b\u7537\u4eba\uff0c\u5728\u751f\u547d\u6700\u540e\u4e00\u4e2a\u65e9\u6668\u7d27\u7d27\u76f8\u62e5\u3002\u4e0d\u7ba1\u4f60\u53eb\u5b83\u624b\u8db3\u4e4b\u60c5\u3001\u8fc7\u547d\u7684\u4ea4\u60c5\uff0c\u8fd8\u662f\u7231\u60c5\u2014\u2014\u706b\u5c71\u7070\u4e0d\u5728\u4e4e\u3002\u4ed6\u4eec\u62b1\u4f4f\u4e86\u5f7c\u6b64\uff0c\u8fd9\u5c31\u662f\u5168\u90e8\u7684\u6545\u4e8b\u3002`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb subverted: 「百聞は一見にしかず」 (seeing once > hearing 100 times)
// — subverted: what people "saw" for a century was only what they wanted to see
// ═══════════════════════════════════════════════════════════════════════
const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#lovers-of-pompeii",
  updatedAt: NOW,

  title: "ポンペイ最後の抱擁",
  subtitle: "二千年の誤解と、名前のつけられない絆",
  excerpt:
    "西暦79年、ヴェスヴィオ火山が突然噴火した。灼熱の火山灰と有毒ガスがローマの都市ポンペイを飲み込み、数千人が一歩も逃げられないまま命を落とした。",
  moralOrLesson:
    "愛がどんな形であれ、すべてを失うとき最後に手を伸ばすのはそこだ——そして死者について語る物語は、語る者自身を映し出す。",

  paragraphs: [
    {
      text: "西暦79年、ヴェスヴィオ火山が突然噴火した。灼熱の火山灰と有毒ガスがローマの都市ポンペイを飲み込み、数千人が一歩も逃げられないまま命を落とした。何世紀ものち、考古学者たちは固まった火山灰の中に遺体が残した空洞を発見する。そこに石膏を流し込むと、亡くなった瞬間の姿がそのまま再現できた。何百体もの石膏像の中で、誰もが足を止めるものがあった。二人の人間が絡み合うように抱き合い、一人がもう一人をかばうようにして、すべてが終わる瞬間まで離さなかった姿だ。",
    },
    {
      text: "百年以上にわたって、この二人は「二人の乙女」と呼ばれてきた。話の筋は明快に見えた。若い女性二人——姉妹か、母と娘か——が死の瞬間に寄り添っている。抱き合う姿はやさしげで、体つきも華奢に見え、1800年代にこの像を最初に調べた学者たちは疑問すら持たなかった。何世代ものガイドが同じ説明を繰り返した。「二人の乙女」はポンペイで最も有名なシンボルのひとつになった——火山灰に閉じ込められた献身の姿として。",
    },
    {
      text: "ところが2017年、フィレンツェ大学のチームがCTスキャンとDNA鑑定を実施した——石膏像が発見された当時には存在しなかった技術だ。結果は、百年以上の常識を根底から覆した。「二人の乙女」は乙女ではなかった。二人とも男性だった。年齢はどちらも18歳から20歳ほど。二人の若い男が、火山が周囲のすべてを殺していく中で、互いを抱きしめていたのだ。",
    },
    {
      text: "ニュースは世界中を駆け巡った。当然の問いがすぐに浮かぶ——この二人は、いったい何の関係だったのか。科学にはそれに答える術がない。兄弟だったかもしれない。親友だったかもしれない。恋人だったかもしれない。古代ローマでは男性同士の恋愛や性的な関係はごく普通に認められていた——ただし身分や階級によって厳格なルールがあった。二人がどんな関係であっても不思議はない。火山灰は体を残したが、物語までは残さなかった。",
    },
    {
      text: "ただ、あの姿勢そのものが語っていることがある。空が暗転し、空気が毒に変わったとき、この二人は別々の方向に走らなかった。互いに手を伸ばした。一人がもう一人に覆いかぶさるように丸くなり、顔を相手の体に押し当て、腕をきつく回した。この仕草にラベルは要らない。兄弟もこうする。友人もこうする。恋人もこうする。大切な人をひとりで死なせたくなかった——ただそれだけだ。",
    },
    {
      text: "「百聞は一見にしかず」と言うけれど、この百年の誤りが証明したのはむしろ逆だった——人は見たいものしか見ない。19世紀の学者たちは、やさしさを目にして「女性」と決めつけた。男同士がこんなふうに抱き合うなど、想像もしなかった。この取り違えは、火山灰の中の二人について語っているのではない。解釈する側の人間について語っているのだ。",
    },
    {
      text: "いま、彼らは「ポンペイの恋人たち」と呼ばれることもある。ただし公式にそう名づけた機関はない。どの時代も、自分たちのレンズを通してあの抱擁を読み解こうとする。だが、あの姿は変わらない。成人したばかりの二人の若者が、人生最後の朝に互いを抱きしめている。それを兄弟愛と呼ぼうが、友情と呼ぼうが、恋と呼ぼうが——火山灰は気にしない。二人は離さなかった。それが、この話のすべてだ。",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════

async function push(label, item) {
  console.log(`\n⏳ Pushing ${label} …`);
  // Validate JSON structure
  const requiredFields = [
    "siteId",
    "langStoryId",
    "storyId",
    "lang",
    "title",
    "subtitle",
    "excerpt",
    "moralOrLesson",
    "paragraphs",
  ];
  for (const f of requiredFields) {
    if (!item[f]) throw new Error(`Missing required field: ${f}`);
  }
  if (!Array.isArray(item.paragraphs) || item.paragraphs.length === 0) {
    throw new Error("paragraphs must be a non-empty array");
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    if (!item.paragraphs[i].text) {
      throw new Error(`Paragraph ${i} is missing text`);
    }
  }
  console.log(
    `   siteId:       ${item.siteId}`,
    `\n   langStoryId:  ${item.langStoryId}`,
    `\n   title:        ${item.title}`,
    `\n   paragraphs:   ${item.paragraphs.length}`,
    `\n   chars total:  ${item.paragraphs.reduce((s, p) => s + p.text.length, 0)}`
  );

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );
  console.log(`✅ ${label} pushed successfully.`);
}

(async () => {
  try {
    await push("zh (Chinese)", zh);
    await push("ja (Japanese)", ja);
    console.log("\n🎉 All done — both records pushed.");
  } catch (err) {
    console.error("\n❌ Error:", err.message);
    if (err.name === "ConditionalCheckFailedException") {
      console.error(
        "   Record already exists. Delete first or remove the condition."
      );
    }
    process.exit(1);
  }
})();
