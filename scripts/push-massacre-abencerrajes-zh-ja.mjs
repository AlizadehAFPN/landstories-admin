import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════
//  CHINESE (zh) — 血染阿尔罕布拉
// ═══════════════════════════════════════════════════════════

const zhItem = {
  // Keys
  siteId: "alhambra",
  langStoryId: "zh#massacre-of-the-abencerrajes",

  // Identity
  storyId: "massacre-of-the-abencerrajes",
  lang: "zh",

  // Classification (unchanged)
  storyCategory: "crowns_conquests",
  tier: "S",
  icon: "\u{2694}\u{FE0F}",
  image: "",
  thumbnail: "",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 3,

  // Geo & metadata (unchanged)
  coordinates: { lat: 37.1761, lng: -3.5881 },
  era: `c. 1462-1482 (historical conflicts); legend set during the final decades of the Nasrid dynasty`,
  source: `Perez de Hita, Gines. Guerras civiles de Granada (Historia de los bandos de los Zegries y Abencerrajes), 1595-1619; Irving, Washington. Tales of the Alhambra, 1832; Anonymous. El Abencerraje y la hermosa Jarifa, c. 1561-1565 (ed. Antonio de Villegas, Inventario, 1565); Hernando de Baeza. Historia de los Reyes Moros de Granada, early 16th c.; Chateaubriand, Francois-Rene de. Les Aventures du dernier Abencerage, 1826; Ibn Zamrak, epigraphic poems of the Alhambra; Fortuny, Mariano. La matanza de los Abencerrajes, c. 1870 (Museu Nacional d'Art de Catalunya)`,
  characters: [
    `The Abencerrajes (Banu Sarraj) -- the doomed noble family`,
    `The Sultan (Abu'l-Hasan Ali or an earlier Nasrid ruler)`,
    `The Zenetes/Zegries -- the rival family who orchestrated the conspiracy`,
    `The unnamed Abencerraje knight -- accused of an affair with the sultana`,
    `Gines Perez de Hita -- the chronicler who immortalized the legend`,
  ],

  // === CHINESE TEXT ===

  title: `血染阿尔罕布拉`,

  subtitle: `三十六位骑士赴宴，走进世上最美的大厅，无一人生还`,

  excerpt: `世上最精美的穹顶之下，三十六位骑士应邀赴宴。一个接一个走进那间大厅，没有一个活着出来。`,

  moralOrLesson: `极致的美和极致的残忍，可以发生在同一个房间里。大理石上的血迹会褪色，记忆中的血迹永远不会。而那些亲手毁掉自己最强支柱的文明，其实早已写下了自己灭亡的日期。`,

  paragraphs: [
    {
      text: `十五世纪的格拉纳达，是整个欧洲最后一个穆斯林王国。西班牙其他地方早就被基督教大军拿下了，只有这座城还在撑着。而在这座城的权力中心，有一个家族可以左右一切\u2014\u2014阿本塞拉赫家族。他们出身北非望族，根基深厚，格拉纳达历任苏丹的废立都绕不开他们。说白了，他们是造王者。但在权力游戏里，谁站得最高，谁就被盯得最紧。`,
    },
    {
      text: `他们的死对头泽格里家族编了一个谎言，简单得近乎天才：阿本塞拉赫家族的一位骑士，和苏丹的王后偷了情。这件事是真是假根本不重要。在那个把荣誉看得比命还重的宫廷里，光是说出口就够了。苏丹被嫉妒烧穿了理智，做了一个决定\u2014\u2014一夜之间，让这个家族从地球上消失。`,
    },
    {
      text: `苏丹在阿尔罕布拉宫设了一场盛大的宴席，邀请阿本塞拉赫家族三十六位最出色的骑士前来赴宴。他们盛装出席，因为在格拉纳达，苏丹亲自设宴相邀，是一个贵族家族能收到的最高礼遇。他们穿过狮子庭院，走过十二头石狮子托举着的大理石喷泉，脚下的水道倒映着天光\u2014\u2014据说象征着天堂的四条河流。没有一个人意识到，自己正在走向死亡。`,
    },
    {
      text: `骑士们被一个接一个带进一间大厅，按在大厅正中的大理石喷泉盆上斩首。流水把血冲走了，所以后来的每一位客人走进来时，什么都看不到，什么都察觉不了\u2014\u2014直到刀落到自己脖子上。格拉纳达最高贵的家族，就这样一个接一个走进王宫里最美的房间，再也没有出来。那间大厅至今仍以他们的名字命名：阿本塞拉赫厅。`,
    },
    {
      text: `他们头顶上方，是人类建筑史上最让人屏住呼吸的杰作之一\u2014\u2014五千个蜂窝状钟乳石单元，层层叠叠，汇成一颗巨大的八角星。十六扇窗户洒进的光让整座穹顶看起来像是活的。它的设计初衷，就是让你抬头时以为自己在看天堂。而在它正下方，大理石喷泉盆里有一道褪不掉的暗红色痕迹。科学家说是氧化铁。但五百年来，所有人听到的说法都一样：那是三十六位骑士的血，渗得太深，任何水都冲不掉。`,
    },
    {
      text: `中国人说\u201c自毁长城\u201d，苏丹干的比这还狠\u2014\u2014他毁的是王国唯一的长城。阿本塞拉赫家族一倒，格拉纳达立刻陷入内战，四分五裂。而这正是斐迪南和伊莎贝拉一直在等的。一首古老的西班牙民谣唱得直白无比：\u201c你杀了阿本塞拉赫家族，他们可是格拉纳达的花啊。\u201d一代人之后，这个欧洲最后的穆斯林王国彻底消亡了。`,
    },
    {
      text: `今天，每年几百万人走进那间大厅。抬头，是人类之手雕刻过的最精致的穹顶。低头，是喷泉里那道怎么也洗不掉的印记。而你在那一刻感受到的，正是阿尔罕布拉宫不同于世上任何宫殿的东西\u2014\u2014头顶是美的极致，脚下是血的残痕。一个文明最高的赞歌，恰恰悬在它亲手毁灭自己的地方。`,
    },
  ],

  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  JAPANESE (ja) — アルハンブラ 血の宴
// ═══════════════════════════════════════════════════════════

const jaItem = {
  // Keys
  siteId: "alhambra",
  langStoryId: "ja#massacre-of-the-abencerrajes",

  // Identity
  storyId: "massacre-of-the-abencerrajes",
  lang: "ja",

  // Classification (unchanged)
  storyCategory: "crowns_conquests",
  tier: "S",
  icon: "\u{2694}\u{FE0F}",
  image: "",
  thumbnail: "",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 3,

  // Geo & metadata (unchanged)
  coordinates: { lat: 37.1761, lng: -3.5881 },
  era: `c. 1462-1482 (historical conflicts); legend set during the final decades of the Nasrid dynasty`,
  source: `Perez de Hita, Gines. Guerras civiles de Granada (Historia de los bandos de los Zegries y Abencerrajes), 1595-1619; Irving, Washington. Tales of the Alhambra, 1832; Anonymous. El Abencerraje y la hermosa Jarifa, c. 1561-1565 (ed. Antonio de Villegas, Inventario, 1565); Hernando de Baeza. Historia de los Reyes Moros de Granada, early 16th c.; Chateaubriand, Francois-Rene de. Les Aventures du dernier Abencerage, 1826; Ibn Zamrak, epigraphic poems of the Alhambra; Fortuny, Mariano. La matanza de los Abencerrajes, c. 1870 (Museu Nacional d'Art de Catalunya)`,
  characters: [
    `The Abencerrajes (Banu Sarraj) -- the doomed noble family`,
    `The Sultan (Abu'l-Hasan Ali or an earlier Nasrid ruler)`,
    `The Zenetes/Zegries -- the rival family who orchestrated the conspiracy`,
    `The unnamed Abencerraje knight -- accused of an affair with the sultana`,
    `Gines Perez de Hita -- the chronicler who immortalized the legend`,
  ],

  // === JAPANESE TEXT ===

  title: `\u30A2\u30EB\u30CF\u30F3\u30D6\u30E9\u3000\u8840\u306E\u5BB4`,

  subtitle: `\u4E16\u754C\u3067\u6700\u3082\u7F8E\u3057\u3044\u5929\u4E95\u306E\u4E0B\u3001\u4E09\u5341\u516D\u4EBA\u306E\u9A0E\u58EB\u304C\u5BB4\u306B\u62DB\u304B\u308C\u305F\u2014\u2014\u751F\u304D\u3066\u51FA\u305F\u8005\u306F\u4E00\u4EBA\u3082\u3044\u306A\u3044`,

  excerpt: `\u4EBA\u306E\u624B\u304C\u751F\u307F\u51FA\u3057\u305F\u6700\u3082\u7CBE\u7DFB\u306A\u5929\u4E95\u306E\u4E0B\u3001\u4E09\u5341\u516D\u4EBA\u306E\u9A0E\u58EB\u304C\u5BB4\u306B\u62DB\u304B\u308C\u305F\u3002\u4E00\u4EBA\u305A\u3064\u5E83\u9593\u306B\u5165\u308A\u3001\u8AB0\u4E00\u4EBA\u623B\u3063\u3066\u3053\u306A\u304B\u3063\u305F\u3002`,

  moralOrLesson: `\u3053\u306E\u4E0A\u306A\u304F\u7F8E\u3057\u3044\u3082\u306E\u3068\u3001\u3053\u306E\u4E0A\u306A\u304F\u6B8B\u9177\u306A\u3082\u306E\u306F\u3001\u540C\u3058\u90E8\u5C4B\u306B\u5B58\u5728\u3067\u304D\u308B\u3002\u5927\u7406\u77F3\u306B\u67D3\u307F\u305F\u8840\u306F\u3084\u304C\u3066\u8584\u308C\u308B\u3002\u3057\u304B\u3057\u8A18\u61B6\u306B\u523B\u307E\u308C\u305F\u8840\u306F\u6C7A\u3057\u3066\u6D88\u3048\u306A\u3044\u3002\u305D\u3057\u3066\u3001\u81EA\u3089\u306E\u6700\u3082\u8A87\u308A\u9AD8\u304D\u4E00\u65CF\u3092\u5185\u304B\u3089\u6EC5\u307C\u3057\u305F\u6587\u660E\u306F\u3001\u305D\u306E\u77AC\u9593\u306B\u3059\u3067\u306B\u81EA\u3089\u306E\u7D42\u308F\u308A\u3092\u66F8\u304D\u8A18\u3057\u3066\u3044\u305F\u306E\u3060\u3002`,

  paragraphs: [
    {
      text: `\u5341\u4E94\u4E16\u7D00\u306E\u30B0\u30E9\u30CA\u30C0\u306F\u3001\u30E8\u30FC\u30ED\u30C3\u30D1\u306B\u6B8B\u3055\u308C\u305F\u6700\u5F8C\u306E\u30A4\u30B9\u30E9\u30E0\u738B\u56FD\u3060\u3063\u305F\u3002\u30B9\u30DA\u30A4\u30F3\u306E\u4ED6\u306E\u5730\u57DF\u306F\u3068\u3046\u306B\u30AD\u30EA\u30B9\u30C8\u6559\u8ECD\u306B\u5236\u5727\u3055\u308C\u3066\u3044\u305F\u3002\u3053\u306E\u5B64\u7ACB\u3057\u305F\u738B\u56FD\u3067\u3001\u3042\u3089\u3086\u308B\u6A29\u529B\u306E\u7CF8\u3092\u63E1\u3063\u3066\u3044\u305F\u306E\u304C\u30A2\u30D9\u30F3\u30BB\u30E9\u30FC\u30D8\u30B9\u4E00\u65CF\u3060\u3002\u5317\u30A2\u30D5\u30EA\u30AB\u306B\u30EB\u30FC\u30C4\u3092\u6301\u3064\u540D\u9580\u8CB4\u65CF\u3067\u3001\u6B74\u4EE3\u306E\u30B9\u30EB\u30BF\u30F3\u3092\u7ACB\u3066\u308B\u306E\u3082\u964D\u308D\u3059\u306E\u3082\u3001\u5F7C\u3089\u306E\u4E00\u5B58\u3060\u3063\u305F\u3002\u307E\u3055\u306B\u300C\u738B\u3092\u4F5C\u308B\u8005\u305F\u3061\u300D\u3002\u305D\u3057\u3066\u3001\u305D\u308C\u3092\u8A31\u305B\u306A\u3044\u8005\u304C\u3044\u305F\u3002`,
    },
    {
      text: `\u5BBF\u6575\u306E\u30BB\u30B0\u30EA\u4E00\u65CF\u304C\u3001\u3042\u308B\u3068\u304D\u6050\u308D\u3057\u304F\u30B7\u30F3\u30D7\u30EB\u306A\u5618\u3092\u3067\u3063\u3061\u4E0A\u3052\u305F\u3002\u30A2\u30D9\u30F3\u30BB\u30E9\u30FC\u30D8\u30B9\u306E\u9A0E\u58EB\u306E\u4E00\u4EBA\u304C\u3001\u30B9\u30EB\u30BF\u30F3\u306E\u5983\u3068\u5BC6\u901A\u3057\u3066\u3044\u308B\u2014\u2014\u305F\u3063\u305F\u305D\u308C\u3060\u3051\u3060\u3002\u771F\u5B9F\u304B\u3069\u3046\u304B\u306F\u95A2\u4FC2\u306A\u3044\u3002\u540D\u8A89\u304C\u3059\u3079\u3066\u3060\u3063\u305F\u3042\u306E\u5BAE\u5EF7\u3067\u306F\u3001\u7591\u60D1\u304C\u53E3\u306B\u51FA\u3055\u308C\u305F\u77AC\u9593\u3001\u305D\u308C\u304C\u5224\u6C7A\u306B\u306A\u308B\u3002\u5AC9\u5992\u3068\u5C48\u8FB1\u306B\u98F2\u307F\u8FBC\u307E\u308C\u305F\u30B9\u30EB\u30BF\u30F3\u306F\u3001\u4E00\u65CF\u3092\u307E\u308B\u3054\u3068\u4E00\u6669\u3067\u6D88\u3059\u3053\u3068\u3092\u6C7A\u3081\u305F\u3002`,
    },
    {
      text: `\u30B9\u30EB\u30BF\u30F3\u306F\u30A2\u30EB\u30CF\u30F3\u30D6\u30E9\u5BAE\u6BBF\u3067\u76DB\u5927\u306A\u5BB4\u3092\u50AC\u3057\u3001\u30A2\u30D9\u30F3\u30BB\u30E9\u30FC\u30D8\u30B9\u4E00\u65CF\u304B\u3089\u4E09\u5341\u516D\u4EBA\u306E\u7CBE\u92ED\u306E\u9A0E\u58EB\u3092\u62DB\u3044\u305F\u3002\u5F7C\u3089\u306F\u6700\u4E0A\u306E\u88C5\u3044\u3067\u53C2\u3058\u305F\u3002\u30B0\u30E9\u30CA\u30C0\u306B\u304A\u3044\u3066\u3001\u30B9\u30EB\u30BF\u30F3\u81EA\u3089\u306E\u62DB\u5F85\u306F\u8CB4\u65CF\u304C\u53D7\u3051\u3046\u308B\u6700\u9AD8\u306E\u6804\u8A89\u3060\u3063\u305F\u304B\u3089\u3060\u3002\u300C\u7345\u5B50\u306E\u4E2D\u5EAD\u300D\u3092\u629C\u3051\u3001\u5341\u4E8C\u982D\u306E\u77F3\u306E\u7345\u5B50\u304C\u652F\u3048\u308B\u5927\u7406\u77F3\u306E\u5674\u6C34\u3092\u904E\u304E\u3001\u697D\u5712\u306E\u56DB\u3064\u306E\u5DDD\u3092\u6A21\u3057\u305F\u3068\u3044\u3046\u6C34\u8DEF\u306B\u6CBF\u3063\u3066\u6B69\u3044\u305F\u3002\u81EA\u5206\u305F\u3061\u304C\u6B7B\u306B\u5411\u304B\u3063\u3066\u6B69\u3044\u3066\u3044\u308B\u3053\u3068\u306B\u3001\u8AB0\u4E00\u4EBA\u6C17\u3065\u304B\u306A\u304B\u3063\u305F\u3002`,
    },
    {
      text: `\u9A0E\u58EB\u305F\u3061\u306F\u4E00\u4EBA\u305A\u3064\u5E83\u9593\u306B\u901A\u3055\u308C\u3001\u5E8A\u306E\u4E2D\u592E\u306B\u3042\u308B\u5927\u7406\u77F3\u306E\u5674\u6C34\u76E4\u306E\u4E0A\u3067\u9996\u3092\u843D\u3068\u3055\u308C\u305F\u3002\u6D41\u308C\u308B\u6C34\u304C\u8840\u3092\u6D17\u3044\u6D41\u3059\u304B\u3089\u3001\u6B21\u306B\u5165\u3063\u3066\u304F\u308B\u5BA2\u306B\u306F\u4F55\u3082\u898B\u3048\u306A\u3044\u3002\u4F55\u306E\u7570\u5909\u3082\u611F\u3058\u306A\u3044\u2014\u2014\u81EA\u5206\u306E\u9996\u306B\u5203\u304C\u89E6\u308C\u308B\u305D\u306E\u77AC\u9593\u307E\u3067\u3002\u30B0\u30E9\u30CA\u30C0\u3067\u6700\u3082\u9AD8\u8CB4\u306A\u4E00\u65CF\u304C\u3001\u5BAE\u6BBF\u3067\u6700\u3082\u7F8E\u3057\u3044\u90E8\u5C4B\u306B\u4E00\u4EBA\u305A\u3064\u8DB3\u3092\u8E0F\u307F\u5165\u308C\u3001\u4E00\u4EBA\u3082\u51FA\u3066\u3053\u306A\u304B\u3063\u305F\u3002\u305D\u306E\u90E8\u5C4B\u306F\u4ECA\u3082\u5F7C\u3089\u306E\u540D\u3067\u547C\u3070\u308C\u3066\u3044\u308B\u2014\u2014\u300C\u30A2\u30D9\u30F3\u30BB\u30E9\u30FC\u30D8\u30B9\u306E\u9593\u300D\u3002`,
    },
    {
      text: `\u5F7C\u3089\u304C\u547D\u3092\u843D\u3068\u3057\u305F\u5834\u6240\u306E\u771F\u4E0A\u306B\u306F\u3001\u30A4\u30B9\u30E9\u30E0\u5EFA\u7BC9\u53F2\u4E0A\u6700\u9AD8\u5091\u4F5C\u306E\u3072\u3068\u3064\u304C\u5E83\u304C\u3063\u3066\u3044\u308B\u3002\u4E94\u5343\u3082\u306E\u920E\u4E73\u77F3\u72B6\u306E\u8702\u306E\u5DE3\u6A21\u69D8\u304C\u3001\u516B\u8292\u661F\u3092\u63CF\u304D\u306A\u304C\u3089\u5929\u4E95\u3044\u3063\u3071\u3044\u306B\u9023\u306A\u3063\u3066\u3044\u308B\u3002\u5341\u516D\u306E\u7A93\u304B\u3089\u5DEE\u3057\u8FBC\u3080\u5149\u304C\u3001\u307E\u308B\u3067\u5929\u4E95\u305D\u306E\u3082\u306E\u304C\u606F\u3092\u3057\u3066\u3044\u308B\u304B\u306E\u3088\u3046\u306A\u932F\u899A\u3092\u751F\u3080\u3002\u5929\u56FD\u3092\u898B\u4E0A\u3052\u3066\u3044\u308B\u6C17\u5206\u306B\u3055\u305B\u308B\u2014\u2014\u305D\u308C\u304C\u3053\u306E\u5929\u4E95\u306E\u610F\u56F3\u3060\u3063\u305F\u3002\u3060\u304C\u305D\u306E\u771F\u4E0B\u3001\u5927\u7406\u77F3\u306E\u5674\u6C34\u76E4\u306B\u306F\u3001\u3069\u3046\u3057\u3066\u3082\u6D88\u3048\u306A\u3044\u8D64\u8336\u8272\u306E\u67D3\u307F\u304C\u3042\u308B\u3002\u79D1\u5B66\u8005\u306F\u9178\u5316\u9244\u3060\u3068\u8A00\u3046\u3002\u3057\u304B\u3057\u4E94\u767E\u5E74\u9593\u3001\u8A2A\u308C\u308B\u4EBA\u3059\u3079\u3066\u304C\u805E\u304B\u3055\u308C\u308B\u8A71\u306F\u540C\u3058\u3060\u3002\u3042\u308C\u306F\u4E09\u5341\u516D\u4EBA\u306E\u9A0E\u58EB\u306E\u8840\u3002\u3042\u307E\u308A\u306B\u6DF1\u304F\u67D3\u307F\u8FBC\u3093\u3067\u3001\u3069\u3093\u306A\u6C34\u3067\u3082\u6D17\u3044\u6D41\u305B\u306A\u304F\u306A\u3063\u305F\u306E\u3060\u3068\u3002`,
    },
    {
      text: `\u65E5\u672C\u306B\u306F\u300C\u4EBA\u3092\u546A\u308F\u3070\u7A74\u4E8C\u3064\u300D\u3068\u3044\u3046\u3053\u3068\u308F\u3056\u304C\u3042\u308B\u3002\u3060\u304C\u30B9\u30EB\u30BF\u30F3\u306F\u3001\u7A74\u3092\u4E09\u5341\u516D\u3082\u6398\u3063\u305F\u4E0A\u306B\u3001\u81EA\u5206\u306E\u738B\u56FD\u306E\u58B3\u7A74\u307E\u3067\u6398\u3063\u3066\u3057\u307E\u3063\u305F\u3002\u30A2\u30D9\u30F3\u30BB\u30E9\u30FC\u30D8\u30B9\u3092\u5931\u3063\u305F\u30B0\u30E9\u30CA\u30C0\u306F\u5185\u6226\u3067\u56DB\u5206\u4E94\u88C2\u3057\u3001\u30D5\u30A7\u30EB\u30CA\u30F3\u30C9\u3068\u30A4\u30B5\u30D9\u30EB\u306E\u8ECD\u52E2\u304C\u5F85\u3063\u3066\u3044\u305F\u306E\u306F\u307E\u3055\u306B\u305D\u306E\u9699\u3060\u3063\u305F\u3002\u53E4\u3044\u30B9\u30DA\u30A4\u30F3\u306E\u6B4C\u306B\u3053\u3046\u3042\u308B\u3002\u300C\u30A2\u30D9\u30F3\u30BB\u30E9\u30FC\u30D8\u30B9\u3092\u6BBA\u3057\u305F\u306A\u3002\u5F7C\u3089\u3053\u305D\u30B0\u30E9\u30CA\u30C0\u306E\u82B1\u3060\u3063\u305F\u306E\u306B\u300D\u3002\u4E00\u4E16\u4EE3\u5F8C\u3001\u30E8\u30FC\u30ED\u30C3\u30D1\u6700\u5F8C\u306E\u30A4\u30B9\u30E9\u30E0\u738B\u56FD\u306F\u5730\u4E0A\u304B\u3089\u6D88\u3048\u305F\u3002`,
    },
    {
      text: `\u4ECA\u65E5\u3001\u6BCE\u5E74\u6570\u767E\u4E07\u306E\u4EBA\u3005\u304C\u3053\u306E\u5E83\u9593\u3092\u8A2A\u308C\u308B\u3002\u898B\u4E0A\u3052\u308C\u3070\u3001\u4EBA\u9593\u306E\u624B\u304C\u5F6B\u308A\u4E0A\u3052\u305F\u6700\u3082\u7CBE\u7DFB\u306A\u5929\u4E95\u3002\u898B\u4E0B\u308D\u305B\u3070\u3001\u5674\u6C34\u306B\u6B8B\u308B\u6D88\u3048\u306A\u3044\u67D3\u307F\u3002\u305D\u3057\u3066\u305D\u306E\u77AC\u9593\u306B\u80F8\u3092\u7A81\u304F\u3082\u306E\u2014\u2014\u305D\u308C\u304C\u30A2\u30EB\u30CF\u30F3\u30D6\u30E9\u5BAE\u6BBF\u3092\u4E16\u754C\u306E\u3069\u306E\u5BAE\u6BBF\u3068\u3082\u9055\u3046\u3082\u306E\u306B\u3057\u3066\u3044\u308B\u3002\u4E0A\u306B\u306F\u7F8E\u306E\u9802\u70B9\u3002\u4E0B\u306B\u306F\u8840\u306E\u8A18\u61B6\u3002\u3042\u308B\u6587\u660E\u304C\u5230\u9054\u3057\u3048\u305F\u6700\u9AD8\u306E\u8868\u73FE\u304C\u3001\u305D\u306E\u6587\u660E\u304C\u81EA\u3089\u3092\u6EC5\u307C\u3057\u305F\u307E\u3055\u306B\u305D\u306E\u5834\u6240\u306E\u771F\u4E0A\u306B\u6D6E\u304B\u3093\u3067\u3044\u308B\u3002`,
    },
  ],

  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  VALIDATION & PUSH
// ═══════════════════════════════════════════════════════════

function validate(item, label) {
  console.log(`\n=== ${label} PRE-PUSH VALIDATION ===`);
  console.log("siteId:", item.siteId);
  console.log("langStoryId:", item.langStoryId);
  console.log("lang:", item.lang);
  console.log("title:", item.title);
  console.log("subtitle:", item.subtitle);
  console.log("paragraphs:", item.paragraphs.length);

  let totalChars = 0;
  item.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    totalChars += chars;
    console.log(`  P${i + 1}: ${chars} chars`);
  });
  console.log(`  TOTAL: ${totalChars} chars across ${item.paragraphs.length} paragraphs`);
  console.log("excerpt:", item.excerpt.length, "chars");
  console.log("moralOrLesson:", item.moralOrLesson.length, "chars");
  console.log("updatedAt:", item.updatedAt);

  // Validate JSON round-trip
  try {
    const json = JSON.stringify(item);
    JSON.parse(json);
    console.log(`JSON validation: PASSED (${json.length} bytes)`);
  } catch (e) {
    console.error("JSON validation FAILED:", e.message);
    process.exit(1);
  }
}

validate(zhItem, "CHINESE (zh)");
validate(jaItem, "JAPANESE (ja)");

// Push Chinese
console.log("\n=== PUSHING zh TO DYNAMODB ===");
try {
  const r1 = await doc.send(new PutCommand({ TableName: TABLE, Item: zhItem }));
  console.log("SUCCESS! Chinese story pushed. HTTP:", r1.$metadata.httpStatusCode);
} catch (err) {
  console.error("zh PUSH FAILED:", err.message);
  process.exit(1);
}

// Verify Chinese
console.log("\n=== VERIFYING zh ===");
try {
  const v1 = await doc.send(new GetCommand({
    TableName: TABLE,
    Key: { siteId: "alhambra", langStoryId: "zh#massacre-of-the-abencerrajes" },
  }));
  if (v1.Item) {
    console.log("VERIFIED! zh record exists.");
    console.log("  title:", v1.Item.title);
    console.log("  paragraphs:", v1.Item.paragraphs.length);
  } else {
    console.error("VERIFICATION FAILED: zh record not found!");
    process.exit(1);
  }
} catch (err) {
  console.error("zh VERIFY FAILED:", err.message);
  process.exit(1);
}

// Push Japanese
console.log("\n=== PUSHING ja TO DYNAMODB ===");
try {
  const r2 = await doc.send(new PutCommand({ TableName: TABLE, Item: jaItem }));
  console.log("SUCCESS! Japanese story pushed. HTTP:", r2.$metadata.httpStatusCode);
} catch (err) {
  console.error("ja PUSH FAILED:", err.message);
  process.exit(1);
}

// Verify Japanese
console.log("\n=== VERIFYING ja ===");
try {
  const v2 = await doc.send(new GetCommand({
    TableName: TABLE,
    Key: { siteId: "alhambra", langStoryId: "ja#massacre-of-the-abencerrajes" },
  }));
  if (v2.Item) {
    console.log("VERIFIED! ja record exists.");
    console.log("  title:", v2.Item.title);
    console.log("  paragraphs:", v2.Item.paragraphs.length);
  } else {
    console.error("VERIFICATION FAILED: ja record not found!");
    process.exit(1);
  }
} catch (err) {
  console.error("ja VERIFY FAILED:", err.message);
  process.exit(1);
}

console.log("\n=== ALL DONE ===");
console.log("Both zh and ja versions pushed and verified successfully.");
