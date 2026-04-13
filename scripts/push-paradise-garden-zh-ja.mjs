import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const base = {
  siteId: "alamut-castle",
  storyId: "paradise-garden-legend",
  icon: "\u{1F33F}",
  tier: "S",
  source:
    "Marco Polo, The Travels of Marco Polo (Yule-Cordier translation, Book 1, Ch. 24); Farhad Daftary, The Assassin Legends: Myths of the Isma'ilis (I.B. Tauris, 1994); Bernard Lewis, The Assassins: A Radical Sect in Islam (Weidenfeld & Nicolson, 1967); Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Sylvestre de Sacy, Academy of Inscriptions lecture, 1809; Encyclopaedia Iranica, 'HASAN SABBAH'",
  era: "1090-1256 CE (Nizari Ismaili period); 1272 (Marco Polo's journey through Persia)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 36.4447, lng: 50.5861 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "tricksters_folk_tales",
  updatedAt: now,
};

// ─────────────────────────────────────────────
// CHINESE (zh) — Simplified Mandarin
// Proverb: 三人成虎 (Three people say tiger → everyone believes)
// Subverted: Marco Polo proved one person is enough
// Register: Popular podcast / WeChat longform
// ─────────────────────────────────────────────
const zhItem = {
  ...base,
  lang: "zh",
  langStoryId: "zh#paradise-garden-legend",
  title: `山中老人的天堂花园`,
  subtitle: `关于刺客组织最著名的谎言，以及被它掩埋了八百年的真相`,
  excerpt: `两座大山之间，山中老人造出了世上最美的花园\u2014\u2014金色亭阁、流淌着美酒和蜂蜜的溪流、无数绝世美女。这个故事流传了八百年。唯一的问题是：它从头到尾都是假的。`,
  characters: [
    `哈桑\u00B7萨巴赫（\u201C山中老人\u201D）`,
    `马可\u00B7波罗（传播传说的威尼斯商人）`,
    `鲁斯蒂谦洛\u00B7达\u00B7比萨（在狱中记录波罗口述的小说家）`,
    `拉希德丁\u00B7锡南（叙利亚的\u201C山中老人\u201D）`,
    `法尔哈德\u00B7达夫塔里（揭穿神话的现代历史学家）`,
  ],
  paragraphs: [
    {
      text: `1272年，一个叫马可\u00B7波罗的威尼斯商人穿过了波斯北部的群山。他压根没踏进过阿拉穆特城堡\u2014\u2014十六年前蒙古人就已经把它夷为平地了。但在丝绸之路沿途的集市上，他听到了一个疯狂的故事，疯狂到他余生都在反复讲述：两座大山之间，有人造出了世上最美的花园。金碧辉煌的亭阁，流淌着美酒和蜂蜜的溪流，还有无数绝世美女。`,
    },
    {
      text: `传说是这样讲的。哈桑\u00B7萨巴赫\u2014\u2014十字军叫他\u201C山中老人\u201D\u2014\u2014从附近村子里挑选年轻人，给他们灌下迷药，趁他们昏死过去，把人抬进这座花园。这些年轻人醒来时，真以为自己到了天堂：美女围绕、盛宴不断、你能想到的一切享乐，应有尽有。过几天，他们再次被下药抬出来。然后哈桑告诉他们\u2014\u2014只有我能送你回去。听我的话，哪怕是去送死，天堂就永远是你的。`,
    },
    {
      text: `传说就是这样解释的：他打造了中世纪最无畏的杀手。这些人不是勉强接受死亡，而是主动冲向死亡\u2014\u2014最后一次任务能换来永恒，他们深信不疑。十字军亲眼看着这些人伪装成僧侣或士兵混进皇宫，在光天化日之下一刀毙命，然后站在原地，从不试图逃跑。敌人管他们叫hashishin\u2014\u2014\u201C吸大麻的人\u201D，一个蔑称。这个词传到欧洲，变成了assassin。英语里\u201C刺客\u201D这个词，就是这么来的。`,
    },
    {
      text: `但这一切都不是真的。古人说三人成虎\u2014\u2014三个人说街上有老虎，所有人就信了。马可\u00B7波罗证明了一件更离谱的事：有时候一个人就够了。1994年，历史学家法尔哈德\u00B7达夫塔里出版了一部权威研究，把这些神话一条条拆了个干净。哈桑的追随者留下的文献里没有任何关于花园的记载。同时代的穆斯林作家从没提过什么迷药。1256年，蒙古历史学家志费尼在城堡陷落后亲自上山检查，他找到了仓库、作坊和一座图书馆\u2014\u2014没有金亭，没有美酒，没有花园。波罗不过是在重复集市上的八卦，说的是一个他从未见过的地方。`,
    },
    {
      text: `真实的哈桑\u00B7萨巴赫和传说完全是两个人。他是一个极度自律的学者，严厉到什么地步呢\u2014\u2014自己的亲生儿子因为喝了酒，被他下令处死。1090年，他拿下了阿拉穆特\u2014\u2014一座矗立在伊朗北部悬崖绝壁上的要塞\u2014\u2014据记载没有流一滴血。此后三十四年，他再也没有离开过这座城堡，在里面建起了伊斯兰世界最伟大的图书馆之一。他的追随者不是什么被下了药的行尸走肉，而是受过良好教育的人：学语言、研究外交、出于真正的信仰而行动。`,
    },
    {
      text: `阿拉穆特真正的\u201C花园\u201D是什么？梯田。靠人工一凿一锤从石灰岩里开出来的水渠，和深嵌在悬崖中的蓄水池。没有黄金亭阁，没有蜂蜜溪流\u2014\u2014有的是精妙绝伦的工程，在地球上最偏远的山谷之一，养活了一整个由学者、士兵和他们家人组成的社区。那些蓄水池有的至今还蓄着水，将近一千年了。`,
    },
    {
      text: `然而最终赢的，是马可\u00B7波罗。他的故事\u2014\u2014由一个从未到过那里的人讲述，关于从未发生过的事情，在监狱牢房里口述给一个小说家\u2014\u2014给了英语\u201Cassassin\u201D这个词。它启发了《刺客信条》，让几百万玩家沉浸在一个至今仍被那个幻想塑造的世界里。而真正的哈桑\u2014\u2014一个不流血就拿下要塞、三十四年不出城门的学者\u2014\u2014几乎无人知晓。历史上最危险的武器从来不是匕首，而是一个没人费心去核实的故事。`,
    },
  ],
  moralOrLesson: `流传最久的故事未必最真实\u2014\u2014来自恐惧、偏见和外人想象的传说，可以将数百年的学术、信仰和真正的成就一笔抹杀，直到神话比它所取代的历史更加真实。`,
};

// ─────────────────────────────────────────────
// JAPANESE (ja) — Modern Japanese
// Proverb: 人の噂も七十五日 (Rumors last only 75 days)
// Subverted: Marco Polo's bazaar gossip lasted 800 years
// Register: NHK documentary / popular nonfiction
// ─────────────────────────────────────────────
const jaItem = {
  ...base,
  lang: "ja",
  langStoryId: "ja#paradise-garden-legend",
  title: `山の老人の楽園`,
  subtitle: `暗殺教団について語られた最も有名な嘘と、それが800年間葬り続けた驚くべき真実`,
  excerpt: `ふたつの山に挟まれた谷に、山の老人は黄金の東屋と蜜の流れる小川、この世で最も美しい女たちを集めた楽園を造った\u2014\u2014この物語は800年語り継がれてきた。ただひとつの問題は、すべてが作り話だったということだ。`,
  characters: [
    `ハサン・サッバーフ（「山の老人」）`,
    `マルコ・ポーロ（伝説を広めたヴェネツィアの商人）`,
    `ルスティケロ・ダ・ピサ（獄中でポーロの口述を記録した小説家）`,
    `ラシードゥッディーン・シナーン（シリアの「山の老人」）`,
    `ファルハド・ダフタリー（神話を解体した現代の歴史学者）`,
  ],
  paragraphs: [
    {
      text: `1272年、マルコ・ポーロというヴェネツィアの商人がペルシア北部の山岳地帯を旅していた。彼はアラムート城に足を踏み入れたことは一度もない\u2014\u201416年前にモンゴル軍がすでに破壊していたからだ。だがシルクロード沿いの市場で、彼はとんでもない話を耳にする。ふたつの山に挟まれた谷に、世にも美しい庭園が造られていた。黄金に輝く東屋、ワインと蜂蜜が流れる小川、そして絶世の美女たち。`,
    },
    {
      text: `伝説はこうだ。ハサン・サッバーフ\u2014\u2014十字軍が「山の老人」と呼んだ指導者\u2014\u2014は近隣の村から若者を選び、薬で眠らせ、この庭園に運び込んだ。目を覚ました若者たちは、本当に天国に来たと思い込んだ。美しい女性、終わりのない宴、考えうるすべての快楽。数日後、再び薬で眠らされ、外に運び出される。そしてハサンは告げた。「お前をあの場所に戻せるのは私だけだ。私に従え。死ぬことになっても構わない。そうすれば、永遠にあの楽園はお前のものだ」と。`,
    },
    {
      text: `こうして彼は中世で最も恐れ知らずの暗殺者を生み出した\u2014\u2014と伝説は語る。死を受け入れるどころか、自ら死に向かって走る男たち。最後の任務を果たせば永遠の楽園が待っていると信じていたからだ。十字軍は目撃した。僧侶や兵士に変装して宮廷に忍び込み、白昼堂々と短剣で一撃し、逃げようともしない姿を。敵はこの集団を「ハシーシーン」と呼んだ\u2014\u2014「大麻を吸う者」という蔑称だ。この言葉がヨーロッパに渡り、「アサシン」になった。`,
    },
    {
      text: `ところが、これはすべて嘘だった。「人の噂も七十五日」という。噂はやがて消えるものだ、と。だがマルコ・ポーロの噂は800年生き延びた。1994年、歴史学者ファルハド・ダフタリーが決定的な研究でこの神話を完全に解体した。ハサンの信奉者たちが残した記録に、この庭園への言及は一切ない。同時代のムスリムの文献に薬物使用の記述もない。1256年にモンゴルの歴史家ジュヴァイニーが陥落直後のアラムートを自ら視察したとき、見つかったのは倉庫と工房と図書館だけだった。黄金の東屋も、ワインも、庭園も、何もなかった。ポーロは自分が一度も見たことのない場所について、市場の噂話を繰り返していただけだった。`,
    },
    {
      text: `本当のハサン・サッバーフは、伝説とはまるで違う人物だった。厳格な学者で、息子が酒を飲んだという理由で処刑した男だ。1090年、イラン北部の断崖絶壁にそびえるアラムート城を、一滴の血も流さずに手に入れたと伝えられている。そこから34年間、一歩も外に出ることなく、イスラム世界有数の図書館を築き上げた。彼の信奉者たちは薬漬けの操り人形ではなかった。語学を学び、外交を研究し、本物の信仰心から行動した教養ある人々だった。`,
    },
    {
      text: `アラムートの本当の「庭園」とは何だったのか。それは段々畑だ。石灰岩の崖を手作業で削って造った水路と、岩盤深くに刻まれた貯水槽で灌漑された農業用のテラスだった。黄金の東屋ではない。蜂蜜の小川でもない。地球上で最も人里離れた谷のひとつで、学者と兵士とその家族を養った、見事な土木技術だった。その貯水槽のいくつかは、千年近く経った今でもまだ水をたたえている。`,
    },
    {
      text: `それでも最後に勝ったのは、マルコ・ポーロだった。一度も現地を訪れなかった男が語り、実際には起こらなかった出来事を描き、監獄の独房で小説家に口述したこの話が、英語に「アサシン」という言葉を残した。そして『アサシン クリード』を生み出し、今なおあの幻想に彩られた世界を何百万人ものプレイヤーが体験している。一方、本当のハサン\u2014\u2014血を流さずに要塞を奪い、34年間城門から一歩も出なかった学者\u2014\u2014はほとんど知られていない。歴史上最も危険な武器は、短剣ではなかった。誰も検証しようとしなかった、たったひとつの物語だった。`,
    },
  ],
  moralOrLesson: `ある民族について最も長く語り継がれる物語が、最も正確とは限らない\u2014\u2014恐怖と偏見と部外者の想像から生まれた伝説は、何世紀にもわたる学問、信仰、真の功績を覆い隠し、やがて神話は、それが置き換えた歴史よりも現実のものとなる。`,
};

// ─────────────────────────────────────────────
// Push to DynamoDB
// ─────────────────────────────────────────────
async function push(item, label) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId: ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title: ${item.title}`);
  console.log(`  paragraphs: ${item.paragraphs.length}`);

  // Validate JSON round-trip
  const json = JSON.stringify(item);
  const parsed = JSON.parse(json);
  if (parsed.title !== item.title) {
    throw new Error(`JSON round-trip failed for ${label}`);
  }
  if (parsed.paragraphs.length !== item.paragraphs.length) {
    throw new Error(`Paragraph count mismatch for ${label}`);
  }
  console.log(`  JSON validation: OK (${json.length} bytes)`);

  await docClient.send(
    new PutCommand({ TableName: TABLE, Item: item })
  );
  console.log(`  Push: SUCCESS`);
}

try {
  await push(zhItem, "Chinese (zh)");
  await push(jaItem, "Japanese (ja)");
  console.log("\nAll done. Both records pushed successfully.");
} catch (err) {
  console.error("\nERROR:", err.message);
  process.exit(1);
}
