import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: 'babylon',
  storyId: 'tower-of-babel',
  storyCategory: 'prophets_pilgrims',
  icon: '\u{1F5FC}',
  tier: 'S',
  readingTimeMinutes: 9,
  image: '',
  thumbnail: '',
  coordinates: { lng: 44.4209, lat: 32.5363 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  era: "c. 610-562 BCE (Nebuchadnezzar's reconstruction); Genesis account undated; archaeological remains excavated 1899-1917",
  source: "Genesis 11:1-9 (Tower of Babel narrative); George, Andrew R. 'A Stele of Nebuchadnezzar II,' Cuneiform Royal Inscriptions and Related Texts in the Schøyen Collection, Cornell University Studies in Assyriology and Sumerology 17, 2011; Herodotus, Histories, Book I.178-183; The Esagila Tablet (AO 6555, Louvre); 'Enmerkar and the Lord of Aratta' (Sumerian poem, c. 2100 BCE); Koldewey, Robert. The Excavations at Babylon, 1914; George, Andrew R. Babylonian Topographical Texts, Orientalia Lovaniensia Analecta 40, 1992; Strabo, Geography XVI.1.5 (Alexander's clearing of the ziggurat); Wiseman, D.J. Nebuchadrezzar and Babylon, Oxford University Press, 1985",
  characters: [
    'Nebuchadnezzar II -- king who rebuilt the ziggurat Etemenanki to its full glory',
    'Herodotus -- Greek historian who visited and described the tower around 460 BCE',
    'Alexander the Great -- ordered 10,000 men to clear its rubble in 331 BCE',
    'Robert Koldewey -- German archaeologist who excavated its foundations (1899-1917)',
    'Andrew George -- Assyriologist who published the Tower of Babel stele (2011)',
  ],
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════
//  CHINESE (zh) — Modern Mandarin, conversational podcast tone
// ═══════════════════════════════════════════════════════
const zhItem = {
  ...shared,
  lang: 'zh',
  langStoryId: 'zh#tower-of-babel',

  title: `通天塔`,

  subtitle: `圣经里最疯狂的野心故事背后，有一座真实存在过的巨塔——上帝亲自下凡把它叫停了`,

  excerpt: `在古巴比伦的中心，幼发拉底河将人类最伟大的城市一分为二的地方，有一座直冲云霄的建筑。它将成为人类历史上最出名的烂尾楼——不是因为建造者手艺不行，而是因为人类关于野心的最古老传说里，上帝亲自下来喊了停。`,

  paragraphs: [
    {
      text: `想象一下，全世界所有人说同一种语言。《创世记》第十一章就是这么开头的。大洪水之后，诺亚的后代一路迁徙，来到了今天伊拉克南部的一片大平原——幼发拉底河和底格里斯河之间的土地。这里没有石头，没有木材，只有泥。于是他们把河泥捏成砖，用火烧硬，再用天然沥青粘起来——那种沥青，到今天还能从伊拉克的地面上冒出来。然后，他们说了一句改变一切的话：\u201C来，我们造一座塔，塔顶要通天。\u201D`,
    },
    {
      text: `最离谱的是——这座塔真的存在过。它叫以特门安基，苏美尔语的意思是\u201C天地根基之庙\u201D。它就矗立在巴比伦城的正中心。1899年，德国考古学家科尔德维把它从土里挖了出来，发现了和圣经描述几乎一模一样的东西：一个巨大的方形底座，每边91米，用窑烧砖和沥青砌成。这座塔反复重建了好几个世纪，到公元前600年左右，尼布甲尼撒二世把它推到了巅峰。他自己在石碑上刻了一句话：\u201C我举其顶，与天争高。\u201D`,
    },
    {
      text: `七层。最高处铺着蓝色琉璃砖，太阳一照，像是天空掉了一角下来。顶上是供奉主神马尔杜克的神殿。总高约91米——自由女神像的高度。放在一马平川的平原上，50公里外都能看见它。这就是一座人造的山，建在一个根本没有山的国家。公元前460年左右，希腊历史学家希罗多德亲眼见过，说塔顶每夜有一位女祭司独自守候，等着神降临。连见过世面的希腊人都看呆了。`,
    },
    {
      text: `\u201C巴别\u201D这个名字，本身就是一场跨越千年的嘲讽。巴比伦人管自己的城市叫\u201C巴比利\u201D——意思是\u201C神之门\u201D。但写圣经的希伯来人换了个读法，把它跟\u201C巴拉尔\u201D挂了钩——意思是\u201C搅乱\u201D。神之门就这么变成了混乱之地。更绝的是，这故事甚至不是希伯来人的原创。公元前2100年，一首苏美尔诗歌——比《创世记》早了整整一千年——就已经讲了同一件事：曾经人类说同一种话，后来众神把它给搅了。语言的混乱，是两河流域的古老记忆。《圣经》只是把它重新讲了一遍。`,
    },
    {
      text: `我们甚至有建造者本人的肖像。2011年，亚述学家安德鲁\u00B7乔治公布了一块尼布甲尼撒时代的黑色石碑。上面刻着这位国王站在他的塔旁边，手握建造者之杖，脸微微仰着，望向塔顶。这是人类迄今发现的唯一一幅完成后的通天塔图像。尼布甲尼撒——那个时代地球上最有权势的人——仰望自己一手建起的东西。他脸上的表情，只能用一个词形容：石化了的骄傲。`,
    },
    {
      text: `塔不是被上帝击倒的。击倒它的是一个更平凡的力量：时间。公元前331年，亚历山大大帝碾碎波斯帝国之后进入巴比伦，通天塔已经在坍塌了——波斯人让它荒了两百年。亚历山大下令派一万名士兵去清废墟。干了两个月，几乎没动。然后，公元前323年，亚历山大在尼布甲尼撒的王宫里发了一场高烧，死了。三十二岁。从此再没有人试过。`,
    },
    {
      text: `《三国演义》开头就说：天下大势，合久必分。但通天塔的故事讲了一个更狠的版本——不是合久了自然会分，是有人根本不许你合。全人类说同一种话，建同一座塔，怀同一个梦。而恰恰是这份齐心，把上帝吓到了。`,
    },
    {
      text: `今天，巴格达以南85公里的地方，只剩下一个灌满了水的方形坑——古代世界最伟大的塔，曾经就站在这里。2019年，联合国教科文组织把它列为了世界遗产。但通天塔真正的纪念碑不在伊拉克。它在地球上每一种被说出口的语言里。首尔的孩子和圣保罗的孩子可以看着同一场日落，却找不到一个共同的词来描述它。砖早碎了。沥青风化了好几个世纪。但那场混乱？永远。`,
    },
  ],

  moralOrLesson: `通天塔从来不只是关于高度，它关于团结——以及团结的人类有多可怕。地球上的每一种语言，都是那份原初的整体被打碎后留下的碎片。每一次翻译，都是在试图重建上帝觉得必须摧毁的东西。也许真正的教训不是人不该往天上够，而是够的过程比够到更重要。我们支离破碎的语言带来了无尽的混乱，但也正是这种多样性，创造出了任何单一语言都无法承载的美。`,
};

// ═══════════════════════════════════════════════════════
//  JAPANESE (ja) — Modern Japanese, NHK documentary tone
// ═══════════════════════════════════════════════════════
const jaItem = {
  ...shared,
  lang: 'ja',
  langStoryId: 'ja#tower-of-babel',

  title: '天を突いた塔',

  subtitle: '聖書が語る人類最大の野望——その裏に実在したジッグラト、そして神が降りてきた理由',

  excerpt: '古代バビロンの心臓部、ユーフラテス川が地上最大の都市を貫くその場所に、天を目指してそびえ立つ建造物があった。人類史上もっとも有名な「未完の建築」——それが未完に終わったのは、技術の問題ではない。人間の野望について語られた最古の物語は、こう伝えている。神自らが降りてきて、止めた、と。',

  paragraphs: [
    {
      text: '全人類がひとつの言葉を話していた世界を想像してほしい。旧約聖書の創世記11章は、そこから始まる。大洪水のあと、ノアの子孫たちは現在のイラク南部——ティグリス川とユーフラテス川に挟まれた平原にたどり着いた。石もない。木もない。あるのは泥だけ。彼らは川の泥をレンガに成形し、窯で焼き、天然アスファルト——今もイラクの地面から湧き出している——で接着した。そして、すべてを変える一言を口にした。「さあ、天まで届く塔を建てよう」',
    },
    {
      text: '驚くべきことに、この塔は実在した。エテメンアンキ——シュメール語で「天と地の基礎の神殿」。バビロンの街にそびえ立っていた。1899年、ドイツの考古学者ロベルト・コルデヴァイが掘り出したとき、聖書の記述とぴったり一致するものが現れた。一辺91メートルの巨大な正方形の土台。窯焼きレンガとアスファルトで築かれている。何世紀にもわたり再建が繰り返され、紀元前600年ごろ、ネブカドネザル2世のもとで最盛期を迎えた。王自身がこう刻んでいる。「余はその頂を天に競わせた」',
    },
    {
      text: '七層。頂上には青い釉薬レンガが太陽を受けて輝いていた。最上階に鎮座するのは主神マルドゥクの神殿。高さはおよそ91メートル——自由の女神とほぼ同じだ。果てしなく平らな大地の上、50キロ先からでも見えた。山のない国に、人間が造った山。紀元前460年ごろ、ギリシャの歴史家ヘロドトスが実際に目にし、塔の頂で毎夜ひとりの巫女が神の降臨を待っていたと書き残している。あのギリシャ人ですら、息を呑んだ。',
    },
    {
      text: '「バベル」という名前そのものが、壮大な皮肉だ。バビロニア人は自分たちの都を「バブ・イリ」——「神の門」と呼んだ。だがヘブライ人はこれを「バラル」——「混乱させる」と読み替えた。神の門が、混乱の地になった。しかもこの物語、ヘブライ人のオリジナルですらない。紀元前2100年のシュメール詩——創世記より千年も前の作品——にすでに同じ筋書きがある。かつて人類はひとつの言葉を話していたが、神々がそれをかき乱した、と。言語の混乱は、聖書よりはるか昔から、メソポタミアの記憶だった。',
    },
    {
      text: '建てた本人の肖像まで残っている。2011年、アッシリア学者アンドリュー・ジョージがネブカドネザル時代の黒い石板を公開した。王が塔のそばに立ち、建築の杖を握り、頂上を見上げている。完成した塔を描いた、世界で唯一の図像だ。地上で最も強大な男が、自分の造り上げたものを仰ぎ見ている——その表情は、石に刻まれた誇りとしか言いようがない。',
    },
    {
      text: '塔は神に打ち倒されたわけではない。もっと平凡なものに倒された——時間だ。紀元前331年、ペルシャ帝国を叩き潰したアレクサンドロス大王がバビロンに入ったとき、塔はすでに崩壊しかけていた。ペルシャが200年間放置したのだ。アレクサンドロスは1万の兵にがれきの撤去を命じた。2ヶ月かけて、ほとんど進まなかった。そして紀元前323年、ネブカドネザルの宮殿で熱病に倒れ、死んだ。32歳。以後、誰も再建を試みていない。',
    },
    {
      text: '「驕れる者は久しからず」と平家物語は諭す。だがバベルの塔の物語は、もう少し厄介なことを言っている。人類は驕ったのではない。ひとつになったのだ。同じ言葉を話し、同じ塔を建て、同じ夢を見た。そしてまさにその団結が——神を怯えさせた。',
    },
    {
      text: '今日、バグダッドの南85キロに、水の溜まった四角い穴がある。古代世界最大の塔が立っていた場所だ。2019年、ユネスコの世界遺産に登録された。だがこの塔の本当の記念碑はイラクにはない。地球上のすべての言語の中にある。ソウルの子どもとサンパウロの子どもが同じ夕焼けを見つめながら、それを伝え合う言葉をひとつも持っていないという事実の中に。レンガは消えた。アスファルトは何世紀も前に崩れた。だが、あの混乱だけは——永遠だ。',
    },
  ],

  moralOrLesson: 'あの塔が本当に問いかけているのは、高さではない。団結だ。そして、団結した人類がどれほど恐ろしい存在になりうるか、ということだ。地球上のすべての言語は、あの原初の一体性が砕け散った破片であり、すべての翻訳行為は、神が壊すべきと判断したものを再び組み立てようとする試みだ。教訓は「天に手を伸ばすな」ではないのかもしれない。手を伸ばすことそのものが、届くことより尊いのだ。散り散りになった言葉たちは混乱をもたらした。だがその多様性は、ひとつの言語では決して生み出せなかった美を、この世界にもたらしている。',
};

// ─── Validation ───
function validate(item, lang) {
  const errors = [];
  if (!item.siteId) errors.push('Missing siteId');
  if (!item.langStoryId) errors.push('Missing langStoryId');
  if (item.langStoryId !== `${lang}#tower-of-babel`) errors.push(`langStoryId mismatch: ${item.langStoryId}`);
  if (item.lang !== lang) errors.push(`lang mismatch: ${item.lang}`);
  if (!item.title) errors.push('Missing title');
  if (!item.subtitle) errors.push('Missing subtitle');
  if (!item.excerpt) errors.push('Missing excerpt');
  if (!item.moralOrLesson) errors.push('Missing moralOrLesson');
  if (!Array.isArray(item.paragraphs) || item.paragraphs.length < 6) errors.push(`Paragraphs count: ${item.paragraphs?.length}`);
  for (let i = 0; i < item.paragraphs.length; i++) {
    if (!item.paragraphs[i].text || item.paragraphs[i].text.length < 20) {
      errors.push(`Paragraph ${i} too short or missing`);
    }
  }
  if (!item.storyId) errors.push('Missing storyId');
  if (typeof item.updatedAt !== 'number') errors.push('updatedAt not a number');
  return errors;
}

// ─── Push ───
async function push(item, lang) {
  const errors = validate(item, lang);
  if (errors.length > 0) {
    console.error(`\u274C Validation failed for ${lang}:`, errors);
    process.exit(1);
  }

  // Quick JSON round-trip check
  const json = JSON.stringify(item);
  try {
    JSON.parse(json);
  } catch (e) {
    console.error(`\u274C JSON serialization error for ${lang}:`, e.message);
    process.exit(1);
  }

  console.log(`\u2705 ${lang} validation passed (${item.paragraphs.length} paragraphs, JSON ${json.length} bytes)`);

  const cmd = new PutCommand({
    TableName: 'Story',
    Item: item,
  });

  const res = await docClient.send(cmd);
  console.log(`\u2705 ${lang} pushed successfully (HTTP ${res.$metadata.httpStatusCode})`);
  return res;
}

// ─── Main ───
try {
  console.log('--- Pushing zh (Chinese) ---');
  await push(zhItem, 'zh');

  console.log('\n--- Pushing ja (Japanese) ---');
  await push(jaItem, 'ja');

  console.log('\n\u2705 All done. Both zh and ja records created.');
} catch (err) {
  console.error('\u274C Push failed:', err.message);
  process.exit(1);
}
