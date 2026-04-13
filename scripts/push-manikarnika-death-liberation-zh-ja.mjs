/**
 * Push "Where Death Is Liberation" (Manikarnika Ghat, Varanasi) recreated in zh, ja
 * to the Story DynamoDB table.
 *
 * Chinese proverb subverted: 事不过三 (Nothing goes beyond three times)
 *   → Reincarnation doesn't follow the three-strikes rule. In Varanasi, one fire ends it all.
 *
 * Japanese proverb subverted: 仏の顔も三度まで (Even Buddha's patience lasts only three times)
 *   → But Shiva at this ghat has never refused a single soul in thousands of years. Way past three.
 *
 * Run: node scripts/push-manikarnika-death-liberation-zh-ja.mjs
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared (unchanged) fields from the English record ───────────────
const shared = {
  siteId: "varanasi",
  storyId: "manikarnika-death-liberation",
  coordinates: { lat: 25.3109, lng: 83.0107 },
  disabled: false,
  hasAudio: false,
  icon: "\uD83D\uDD25",
  image: "",
  isFree: true,
  readingTimeMinutes: 4,
  source:
    "Parry, Jonathan P. Death in Banaras, Cambridge University Press, 1994; Eck, Diana L. Banaras: City of Light, Princeton University Press, 1982; Justice, Christopher. Dying the Good Death: The Pilgrimage to Die in India\u2019s Holy City, SUNY Press, 1997; Skanda Purana, Kashi Khanda (12th-14th century CE); Markandeya Purana (Harishchandra legend); Bhutiani, Shubhashish. Hotel Salvation (Mukti Bhawan), 2016 film, Venice Film Festival",
  storyCategory: "prophets_pilgrims",
  thumbnail: "",
  tier: "S",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════════════
// CHINESE (zh) — Simplified Mandarin
// Proverb subverted: 事不过三
// ═══════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#manikarnika-death-liberation",

  title: `死亡即解脱`,

  subtitle: `在恒河边那座火焰从未熄灭的焚尸台上，一个\u201C贱民\u201D掌管着通向自由的圣火——而死亡，是这座圣城最神圣的仪式`,

  excerpt: `都说事不过三，可轮回偏不讲这规矩。在瓦拉纳西恒河边，火焰从未熄灭。印度教徒相信，死在这里，不只是一生的终结——而是所有轮回的终结。`,

  characters: [
    `湿婆（在焚尸台旁为逝者低语解脱咒语的印度教大神）`,
    `多姆王（掌管永恒圣火的人，来自印度最底层种姓）`,
    `卡比尔（十五世纪拒绝死在瓦拉纳西的诗人）`,
  ],

  era: `从神话时代到今天（焚尸台的火已经燃烧了数百年）`,

  moralOrLesson: `瓦拉纳西把最神圣的地方建在了焚尸场上——然后发现了一个全世界的人花一辈子逃避的真相：想要真正自由，唯一的办法就是不再害怕那团火。`,

  paragraphs: [
    {
      text: `都说事不过三，可轮回偏不讲这规矩——同一个灵魂反反复复地生、反反复复地死，永远出不了那个圈。但在恒河边的瓦拉纳西，一把火就能让你彻底出局。这座印度教最神圣的城市里，玛尼卡尼卡焚尸台的火焰从未熄灭过。一天二十四小时，石阶上同时烧着十几座葬火堆，数百具遗体每天化为灰烬飘入恒河。死在这里，不是一辈子的结束——是所有辈子的结束。`,
    },
    {
      text: `经文里是这么说的：湿婆——印度教中掌管毁灭与重生之力的大神——会亲自站在每一具燃烧的遗体旁。火焰升起的那一刻，他俯身在逝者耳边低声说出一个秘密咒语，解开轮回的锁链。不看你的身份。有钱没钱，有罪无罪，最高种姓还是最低种姓——火烧掉肉体，河水带走骨灰，湿婆的低语把灵魂送到彼岸。没有人被拒之门外。`,
    },
    {
      text: `但最讽刺的来了。这片圣地上权力最大的人，既不是祭司，也不是国王，而是\u201C多姆王\u201D——多姆种姓的首领。几千年来，这个种姓在印度被叫做\u201C不可触碰者\u201D，是整个社会最底层的存在。然而，永恒圣火归他掌管。每一堆火葬柴都必须用他的火来点燃，没有例外。每个悲痛的家庭都要向他买那一簇火苗——整个种姓制度里最被看不起的人，偏偏握着每个灵魂通向神的钥匙。`,
    },
    {
      text: `仪式延续了几千年，一个细节都没变。遗体从狭窄的巷子里被抬出来，亲属一路高喊\u201CRam Naam Satya Hai\u201D——意思是\u201C唯有神的名字是真的\u201D。遗体最后一次浸入恒河，然后放上码好的柴堆。长子从多姆王手中接过火种，绕遗体走五圈，每一圈代表一种元素：地、水、火、风、空。最后，他用竹竿敲碎头骨，释放灵魂。那声脆响传过水面——那是一个人获得自由的声音。`,
    },
    {
      text: `不是所有人都需要火。有些人太纯净，火也没什么好烧的。五岁以下的孩子直接放入恒河——他们的天真就是通行证。出家的圣人也不用火——放弃俗世的那一天，他们就已经\u201C死\u201D过一次了。还有怀孕的女性，因为腹中的孩子无罪可烧。他们的遗体被沉入河中。焚尸台的规矩也有例外——每一个例外，都在悄悄告诉你这种文化怎么理解\u201C纯净\u201D两个字。`,
    },
    {
      text: `焚尸台旁边有一栋房子，叫\u201C穆克提巴万\u201D——翻译过来就是\u201C解脱之屋\u201D。说白了，这是一家专门让人来等死的旅馆。每位客人有一间房、一张床、床头放着经书。但只给你十五天。十五天没死，请离开，重新排队。这里有候补名单。管理员亲眼送走过一万两千多人，他总结出一条规律：放得下的人走得安详，放不下的人走得痛苦。好的死亡，不是你侥幸躲过的那种——是你睁着眼、坦然面对的那种。`,
    },
    {
      text: `但瓦拉纳西关于死亡最叛逆的一笔，来自一个拒绝死在这里的人。十五世纪的诗人卡比尔，一辈子质疑所有宗教规矩，临死前偏偏离开了瓦拉纳西。他去了马格哈尔——人们深信死在那里会转世成驴。他就是要证明一件事：神不是某座城市的特产，真正的解脱在人心里。当追随者掀开他的裹尸布，里面只有一捧鲜花。不怕死的人，死亡拿他没办法。真正的故事，从放下恐惧那一刻，才刚刚开始。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — Modern Japanese
// Proverb subverted: 仏の顔も三度まで
// ═══════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#manikarnika-death-liberation",

  title: `死が解放になる場所`,

  subtitle: `ガンジス河畔の火葬場で一度も絶えたことのない炎——その聖火を守るのは最下層カーストの男だった。この聖なる都市では、死こそが最も神聖な行為である`,

  excerpt: `ヴァラナシのガンジス河畔にあるマニカルニカ・ガート。ここの炎は一度も消えたことがない。ヒンドゥー教徒は信じている——ここで死ねば、すべての輪廻が終わると。`,

  characters: [
    `シヴァ神（死者に解放のマントラを囁くヒンドゥー教の神）`,
    `ドーム・ラージャ（永遠の聖火の守護者、インド最下層カーストの長）`,
    `カビール（ヴァラナシで死ぬことを拒んだ十五世紀の詩人）`,
  ],

  era: `神話の時代から現代まで（何世紀にもわたり炎が燃え続けている）`,

  moralOrLesson: `ヴァラナシは最も聖なる場所を、寺院ではなく火葬場の上に築いた——そして、世界中の人々が一生をかけて逃げ続けるある真実を見つけた。本当に自由になる唯一の方法は、炎を恐れることをやめることだ。`,

  paragraphs: [
    {
      text: `ヴァラナシのガンジス河畔にあるマニカルニカ・ガート。ここの炎は一度も消えたことがない。一日二十四時間、三百六十五日、石段の上では十数体の遺体が同時に燃え続けている。毎日数百の肉体がここで灰となり、ガンジスへと流れてゆく。だが、ここには悲しみの色がない。ヒンドゥー教の信仰では、ヴァラナシで死ぬということは、一つの人生が終わるのではない。すべての人生が終わるのだ。生と死を繰り返す果てしない輪廻が、ここでようやく断ち切られる。死が、完全なる自由への唯一の扉になる。`,
    },
    {
      text: `聖典にはこう記されている。シヴァ——ヒンドゥー教で破壊と再生を司る神——が、燃える遺体の一つひとつのそばに立つのだと。炎が立ち上る瞬間、シヴァは死者の耳元に身をかがめ、秘密のマントラを囁く。輪廻の鎖を断ち切る、たった一つの言葉だ。仏の顔も三度まで——どんな慈悲にも限りがある、と人は言う。だがこのガートのシヴァに、その限りはない。富者も貧者も、聖者も罪人も——何千年もの間、一人として拒まなかった。火が肉体を焼き、河が灰を運び、シヴァの囁きが魂を彼岸へ送る。三度どころではない。ここに終わりはない。`,
    },
    {
      text: `だが、この聖地で最も大きな権力を持つのは、僧侶でも王でもない。「ドーム・ラージャ」——ドーム・カーストの長だ。このカーストは何千年もの間「不可触民」と呼ばれ、インド社会の最底辺に置かれてきた。しかし、永遠の聖火を管理するのは彼だ。すべての火葬用の薪は、彼の火種から点けなければならない。例外はない。遺族は皆、彼から火を買う。社会の最も底にいる人間が、すべての魂が神に至るための鍵を握っている——これほど痛烈な皮肉があるだろうか。`,
    },
    {
      text: `儀式は何千年も変わっていない。遺体は狭い路地を通って運ばれ、親族は「ラーム・ナーム・サッティヤ・ヘイ」——「神の名だけが真実だ」と唱え続ける。遺体は最後にガンジスに浸され、積み上げられた薪の上に置かれる。長男がドーム・ラージャの火を受け取り、遺体の周りを五度回る。地・水・火・風・空——五つの元素を表す五周だ。最後に竹の棒で頭蓋骨を割り、魂を解き放つ。水面を渡るあの乾いた音——それは、一人の人間が自由になった瞬間の音だ。`,
    },
    {
      text: `ただし、誰もが火を必要とするわけではない。あまりに純粋な者には、燃やすべきものがない。五歳以下の子どもはそのままガンジスに委ねられる——その無垢さだけで十分だから。出家した聖者もまた火を必要としない——俗世を捨てた日に、すでに一度「死んで」いるからだ。そして妊婦。胎内の命には、焼き払うべき罪がない。彼らの遺体は河に沈められる。火葬場の掟にも例外がある——そしてその一つひとつが、この文化が「清浄」をどう捉えているかを静かに語っている。`,
    },
    {
      text: `火葬場のそばに「ムクティ・バワン」——「解脱の館」と呼ばれる建物がある。死を待つ人のための宿だ。一人に一部屋、一台のベッド、枕元に聖典。ただし猶予は十五日間。十五日以内に死ねなければ、退去して再び順番を待つ。ウェイティングリストがある。管理人はこれまでに一万二千人以上を見送ってきた。彼が言うパターンはいつも同じだ——執着を手放した人は穏やかに逝き、手放せない人は苦しむ。「良い死」とは、逃げ切った死ではない。目を開けたまま向き合った死だ。`,
    },
    {
      text: `だが、ヴァラナシの死にまつわる最も反骨的な物語は、ここで死ぬことを拒んだ男のものだ。十五世紀の詩人カビール。あらゆる宗教の決まりごとに疑問を投げかけ続けた彼は、死の床からヴァラナシを離れた。向かった先はマガハル——そこで死ねばロバに生まれ変わると信じられていた場所だ。神は一つの街のものではない、本当の解放は心の中にある——彼はそれを体で証明した。弟子たちが覆いを外したとき、そこにあったのは遺体ではなく、一面の花だった。死を恐れない人間を、死は連れていけない。本当の物語は、恐れを手放したその瞬間から始まる。`,
    },
  ],
};

// ─── Push ─────────────────────────────────────────────────────────────

async function push(item, label) {
  try {
    await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`\u2705 ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
  } catch (err) {
    console.error(`\u274C ${label} FAILED:`, err);
    process.exit(1);
  }
}

(async () => {
  await push(zh, "Chinese (zh)");
  await push(ja, "Japanese (ja)");
  console.log("\nBoth languages pushed successfully.");
})();
