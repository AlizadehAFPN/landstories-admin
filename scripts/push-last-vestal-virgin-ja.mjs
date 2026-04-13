// Push "The Last Vestal Virgin" — Japanese (ja) version
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const title = "千年の炎";

const subtitle = "千年燃え続けた炎が、一通の勅令で消えた";

const excerpt =
  "千年以上にわたって六人の女性がローマの聖火を守り続けた。不可侵の存在で、強大な権力を持っていた——たった一つの誓いを破れば、生き埋めにされることを除けば。";

const moralOrLesson =
  "どれほど長く続いた伝統も一枚の勅令で終わりうる。そして最大の特権には、常に最大の代償がつきまとう。";

const paragraphs = [
  {
    text: "古代ローマに、とんでもない「求人」があった。六人の少女を選び出し、たった一つの炎を絶やすなという任務を与える。火が消えたら、ローマは滅ぶ。紀元前700年頃から西暦394年まで、千年以上もの間、「ウェスタの処女」と呼ばれる女性たちがローマの中心にある神殿で、かまどの女神ウェスタの聖火を守り続けた。古代世界で最も強い権力を持った女性たち。その代償は、自由と身体、そして時に命だった。",
  },
  {
    text: "選ばれるのは六歳から十歳の少女。出身はローマ屈指の名門に限られた。一度選ばれたら三十年の奉仕が待っている——最初の十年で儀式を学び、次の十年で執り行い、最後の十年で次世代を育てる。「石の上にも三年」と言うが、彼女たちは三十年座り続けた。しかもその間、絶対に処女でなければならない。見返りは、ローマの他の女性には夢のまた夢だった力。財産を持ち、遺言を書き、法廷で宣誓なしに証言できた。刑場へ向かう死刑囚がウェスタの処女とすれ違えば、その場で釈放されることさえあった。",
  },
  {
    text: "ローマの大通りでは、最高位の官僚でさえウェスタの処女に道を譲った。彼女たちの馬車は、通常なら皇后だけに許されたもの。コロッセオでは最前列、皇帝のすぐ隣に座った。女性を財産として扱う社会で、ウェスタの処女だけは文字通り「触れてはならない」存在だった。手を出せば、死罪。",
  },
  {
    text: "だが、この特権には背筋の凍る裏面があった。誓いを破ったとされた処女を待つのは、普通の処刑ではない。ローマ法は聖女の血を流すことを禁じていた——神々の怒りを買うからだ。そこで「抜け道」が編み出された。告発された処女は葬式の衣をまとい、かつて支配したフォロ・ロマーノを引き回された後、「邪悪の地」と呼ばれる場所へ連行される。地下の小部屋に灯り、パン、水。彼女が中に入ると、入口は土で塞がれた。ローマは彼女を殺してはいない。ただ……「しまっておいた」だけだ。",
  },
  {
    text: "千年の間に少なくとも十人の処女がこうして生き埋めにされた。告発が本当だったとは限らない。ローマが戦に敗れたり災害に見舞われたりすると、為政者には生贄が必要だった。処女の誓い破りを告発するのが最も手っ取り早い——民衆の恐怖を「神への捧げもの」に変えてしまえばいい。歴史家プルタルコスはこれらの裁判を明らかな疑念とともに記録し、小プリニウスは暴君ドミティアヌス帝治世下のある生き埋めを、怒りを隠しきれない筆で書き残した。",
  },
  {
    text: "ウェスタの処女はスキャンダルで終わったのではない。世界のほうが変わった。西暦382年、キリスト教徒の皇帝グラティアヌスが聖女団への資金を断った。十二年後、テオドシウス一世がすべてに終止符を打ち、聖火を消すよう命じた。千年以上、一日も途切れることなく燃え続けた炎が、ただ消えた。人類史上最も長く続いた伝統のひとつが、一通の勅令で幕を閉じた。",
  },
  {
    text: "最後にこの聖なる集団を率いたのは、コエリア・コンコルディアという女性だったとされている。彼女が抗ったのか、静かに去ったのか、誰も知らない。だが残されたものは今も語りかけてくる。ウェスタの処女の家はフォロ・ロマーノに今も建っている。中庭には歴代の巫女長の像が置かれていた台座が並ぶ。空になったものがある——時に砕かれ、あるいは人の手で壊された。名前を削り取られた台座もある。削ったのは、彼女たちに取って代わった信仰そのものだった。千年の献身が、空白の石と沈黙になった。",
  },
];

// Validate
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].text.length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(
  `Target: ~1000-1500 chars (±20% = 800-1800). ${totalChars >= 800 && totalChars <= 1800 ? "✅ PASS" : "❌ FAIL"}`
);

const item = {
  siteId: "roman-forum-palatine",
  langStoryId: "ja#last-vestal-virgin",
  lang: "ja",
  storyId: "last-vestal-virgin",
  title,
  subtitle,
  excerpt,
  moralOrLesson,
  paragraphs,
  characters: [
    "ウェスタの処女たち",
    "ヌマ・ポンピリウス王",
    "テオドシウス一世",
    "コエリア・コンコルディア（最後の巫女長）",
    "ドミティアヌス帝",
  ],
  coordinates: { lat: 41.8917, lng: 12.487 },
  disabled: false,
  era: "紀元前7世紀 - 西暦394年",
  hasAudio: false,
  icon: "🔥",
  image: "",
  isFree: true,
  readingTimeMinutes: 3,
  source:
    "Plutarch, Life of Numa; Livy, Ab Urbe Condita; Aulus Gellius, Noctes Atticae; Ammianus Marcellinus",
  storyCategory: "lost_found",
  thumbnail: "",
  tier: "A",
  updatedAt: Math.floor(Date.now() / 1000),
};

// Validate JSON serialization
try {
  const json = JSON.stringify(item);
  JSON.parse(json);
  console.log("✅ JSON validation passed");
} catch (e) {
  console.error("❌ JSON validation failed:", e.message);
  process.exit(1);
}

const res = await doc.send(
  new PutCommand({
    TableName: "Story",
    Item: item,
    ConditionExpression:
      "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
  })
);

console.log("\n✅ Japanese (ja) story pushed successfully!");
console.log(`   siteId: ${item.siteId}`);
console.log(`   langStoryId: ${item.langStoryId}`);
console.log(`   Title: ${item.title}`);
console.log(`   Paragraphs: ${item.paragraphs.length}`);
console.log(`   Total chars: ${totalChars}`);
console.log(
  `   Updated at: ${new Date(item.updatedAt * 1000).toISOString()}`
);
