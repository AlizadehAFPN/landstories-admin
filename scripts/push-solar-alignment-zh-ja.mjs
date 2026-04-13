import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─────────────────────────────────────────────
// CHINESE (zh) — 三千年之约
// ─────────────────────────────────────────────
const zhItem = {
  siteId: "abu-simbel",
  langStoryId: "zh#solar-alignment-miracle",
  lang: "zh",
  storyId: "solar-alignment-miracle",
  title: "三千年之约",
  subtitle: "太阳每年两次准时赴约，风雨无阻，三千二百年",
  excerpt: "在埃及南部的阿布辛贝神庙，每年有两天，一束阳光会准时穿过六十米的岩石长廊，照亮黑暗深处三座石像的面庞。这个约定，太阳守了三千两百年。",
  icon: "☀️",
  tier: "A",
  era: "New Kingdom (c. 1244 BC)",
  storyCategory: "prophets_pilgrims",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  hasAudio: false,
  isFree: true,
  disabled: false,
  coordinates: { lng: 31.6256, lat: 22.3369 },
  characters: ["拉美西斯二世", "阿蒙-拉", "拉-霍拉赫提", "普塔"],
  source: "Desroches-Noblecourt, C. The Great Temple of Abu Simbel. Paris, 1968; UNESCO Technical Reports",
  updatedAt: NOW,
  moralOrLesson: "最高的技艺，是让人造之物与宇宙的节拍合而为一。真正的精准，比创造它的文明更长久。",
  paragraphs: [
    {
      text: "每年两次，埃及南部的阿布辛贝神庙里会发生一件不可思议的事。2月22日和10月22日的清晨，第一缕阳光从神庙东门射入，一路穿过六十米的岩石——穿过大厅、走廊和密室——最终抵达整座建筑最深处的圣所。在那里，三座沉默了363天的石像，突然被金光点亮。",
    },
    {
      text: "被照亮的是三尊雕像：众神之王阿蒙-拉、日出之神拉-霍拉赫提，以及拉美西斯二世本人——就是那个建了这座神庙、还敢把自己的雕像摆在神旁边的法老。三尊雕像在金光中熠熠生辉，而第四尊——冥界之神普塔——始终隐没在阴影里。这不是巧合。太阳也分得清，谁该站在光里，谁该留在暗处。",
    },
    {
      text: "最让人震撼的是时间。这一切发生在公元前1244年左右，距今超过三千年。没有望远镜，没有计算机，没有GPS。古埃及的工匠们精确算出了一年中两个特定日期的日出方位，推算出光线的精确角度，然后把一座神庙直接凿进悬崖。让一束光穿过六十米岩石，准确落在该落的地方。他们只有一次机会——你没法挪动一座山。",
    },
    {
      text: "这两个日期——2月22日和10月22日——据说分别是拉美西斯二世的生日和加冕纪念日。历史学家对此争论不休，但说实话，争的不是重点。不管那天到底是不是他生日，有人造了一座建筑，让太阳本身按照时刻表向一个人致敬。而且太阳照做了，三千两百年，从未爽约。",
    },
    {
      text: `中国人常说"天人合一"，讲的是人要顺应天道。但拉美西斯二世反过来了——他不是顺应太阳，而是让太阳来顺应他。他用石头给太阳定了规矩，而太阳居然认了。`,
    },
    {
      text: "每年那两天，成千上万人天不亮就聚在阿布辛贝神庙前等待。当第一道光从门缝挤进来，沿着六十米的石头甬道缓缓爬行，直到三张古老的面孔在黑暗中猛然亮起金色的光芒——那一刻，没人觉得这是天文学。那是神迹。对于古埃及人来说，这就是他们的信仰：太阳神拉亲自推门而入，探望端坐于众神之间的法老。",
    },
    {
      text: "上世纪六十年代，阿斯旺大坝即将让这座神庙沉入水底。联合国教科文组织发起了人类历史上最大胆的文物抢救行动——把整座神庙切成1036块巨石，搬到65米高的悬崖上重新拼装。最大的难题？保住那个三千多年前的天文校准。",
    },
    {
      text: "他们几乎做到了——差一天。搬迁后，阳光晚到了24小时，变成了2月21日和10月21日。就差这一天，却是整个故事最耐人寻味的细节。一支拥有一切现代工具的团队，搬了整座山中神庙，差了24小时。而三千年前的工匠们，凭双眼、凭算术、凭信仰，一次就做对了。三千年后，太阳依然准时赴约。",
    },
  ],
};

// ─────────────────────────────────────────────
// JAPANESE (ja) — 太陽の約束
// ─────────────────────────────────────────────
const jaItem = {
  siteId: "abu-simbel",
  langStoryId: "ja#solar-alignment-miracle",
  lang: "ja",
  storyId: "solar-alignment-miracle",
  title: "太陽の約束",
  subtitle: "年に二度、太陽は約束を守りに来る。三千二百年、一度も欠かさず。",
  excerpt: "エジプト南部のアブ・シンベル神殿で、年に二度だけ起きる現象がある。朝日が神殿の入口から差し込み、六十メートルの岩の奥にある三体の石像を黄金色に照らし出す。この約束を、太陽は三千二百年守り続けている。",
  icon: "☀️",
  tier: "A",
  era: "New Kingdom (c. 1244 BC)",
  storyCategory: "prophets_pilgrims",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  hasAudio: false,
  isFree: true,
  disabled: false,
  coordinates: { lng: 31.6256, lat: 22.3369 },
  characters: ["ラメセス二世", "アメン・ラー", "ラー・ホルアクティ", "プタハ"],
  source: "Desroches-Noblecourt, C. The Great Temple of Abu Simbel. Paris, 1968; UNESCO Technical Reports",
  updatedAt: NOW,
  moralOrLesson: "人の手が生み出す最高の技は、宇宙のリズムと調和すること。本物の精密さは、それを生み出した文明よりも長く残る。",
  paragraphs: [
    {
      text: "年に二度、エジプト南部のアブ・シンベル神殿で、説明のつかないことが起きる。2月22日と10月22日の日の出の瞬間、一筋の光が神殿の東の入口から差し込み、六十メートルの岩の中をまっすぐ進んでいく。大広間を抜け、回廊を抜け、奥の間を抜け——そして神殿の最も深い場所、至聖所にたどり着く。そこで、一年のうち363日を闇の中で過ごしてきた三体の石像が、突然、黄金の光を浴びる。",
    },
    {
      text: "光に照らされるのは三体。神々の王アメン・ラー、日の出の神ラー・ホルアクティ、そしてラメセス二世——この神殿を建て、自分の像を神々の隣に堂々と座らせたファラオだ。約二十分間、三体は黄金色に輝く。だが四体目の像——冥界の神プタハ——だけは、完全に影の中に沈んだままだ。偶然ではない。太陽でさえ、光の中にいるべき者と闇に留まるべき者を、ちゃんと知っている。",
    },
    {
      text: "本当に驚くのはここからだ。この仕掛けが作られたのは紀元前1244年頃。三千年以上前のことだ。望遠鏡もない。コンピュータもない。GPSもない。古代エジプトの技術者たちは、一年のうちたった二日の日の出の位置を正確に割り出し、光の角度を計算し、崖をくり抜いて神殿を彫り上げた。六十メートルの岩の先にある一点に、光を届けるために。やり直しはきかない。山は動かせないのだから。",
    },
    {
      text: "2月22日と10月22日は、ラメセス二世の誕生日と即位記念日だと伝えられている。歴史家の間では議論が続いているが、正直なところ、そこは本質ではない。誕生日だろうがなかろうが、誰かが「太陽そのものに、決まった日に、決まった人間に敬意を表させる」建物を設計したのだ。そして太陽は、三千二百年間、その約束を守り続けている。",
    },
    {
      text: "日本には「石の上にも三年」ということわざがある。辛抱すれば報われるという意味だ。だがアブ・シンベルの石像たちは、三年どころか三千二百年、暗闇の中で座り続けている。そして太陽は一度も忘れなかった。三年で温まる石があるなら、三千年待ち続ける太陽もある。",
    },
    {
      text: "毎年その日、夜明け前から何千人もの人々がアブ・シンベルの前に集まる。そして光が来る。入口の隙間から最初の一筋がすべり込み、六十メートルの石の通路をゆっくり這い進み、やがて闇の中の三つの古代の顔が、ふいに金色に燃え上がる——その瞬間、誰もこれを天文学だとは思わない。奇跡だと感じる。古代エジプト人にとって、それはまさに信仰そのものだった。太陽神ラーが自ら扉を開け、神々の列に座るファラオを訪ねてくる。",
    },
    {
      text: "1960年代、アスワン・ハイダムの建設により、この神殿は水没の危機に瀕した。ユネスコは人類史上最も大胆な文化財救出作戦を実行する。神殿を1036個のブロックに切り分け、65メートル高い崖の上へ運び上げ、一つ一つ組み直した。最大の課題は何だったか？ 三千年以上前に設定された天文学的な配置を、寸分の狂いなく再現すること。",
    },
    {
      text: "結果は——ほぼ完璧だった。ただし、一日だけずれた。移設後、光が届くのは2月21日と10月21日になった。たった一日。しかし、この一日のずれこそが、すべてを物語っている。あらゆる最新技術を持つ現代のチームが、山ごと神殿を動かして、二十四時間ずれた。三千年前の技術者たちは、自分の目と計算と信念だけで、一発で成功させた。そして三千年後の今も、太陽は時間通りにやってくる。",
    },
  ],
};

// ─────────────────────────────────────────────
// PUSH
// ─────────────────────────────────────────────
async function push(item, label) {
  try {
    await docClient.send(
      new PutCommand({ TableName: TABLE, Item: item })
    );
    console.log(`✅ ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
  } catch (err) {
    console.error(`❌ ${label} FAILED:`, err);
    process.exit(1);
  }
}

async function main() {
  console.log(`Timestamp: ${NOW}`);
  console.log("---");

  // Validate both items before pushing
  for (const [label, item] of [["ZH", zhItem], ["JA", jaItem]]) {
    const json = JSON.stringify(item);
    JSON.parse(json); // will throw if invalid
    console.log(`${label} JSON valid (${json.length} bytes, ${item.paragraphs.length} paragraphs)`);
  }

  console.log("---");
  await push(zhItem, "ZH (Chinese)");
  await push(jaItem, "JA (Japanese)");
  console.log("---");
  console.log("All done.");
}

main();
