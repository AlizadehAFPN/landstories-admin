// Push "The Last Vestal Virgin" — Chinese (zh) version
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const title = `千年圣火`;

const subtitle = `守了一千年的火，被一道诏书吹灭`;

const excerpt = `一千多年来，六个女人守护着罗马的圣火。她们至高无上、不可侵犯——但只要犯了一条戒律，等待她们的就是活埋。`;

const moralOrLesson = `再长的传统也挡不住一纸命令，再大的权力背后都藏着等量的代价。`;

const paragraphs = [
  {
    text: `古罗马有一份工作，堪称史上最极端的职位：六个女人，从小被选中，唯一的任务就是让一团火别灭。这火要是灭了，罗马就完了。从公元前700年到公元394年，超过一千年的时间里，这群\u201C维斯塔圣女\u201D在罗马广场中心的神庙里守护着女神维斯塔的圣火。她们是古代世界权力最大的女性。代价？她们的身体、自由，有时候还有命。`,
  },
  {
    text: `圣女从六到十岁就被选中，全部来自罗马最显赫的家族。一旦入选，服役三十年：十年学，十年做，十年教。都说事不过三，可这些女人的命，偏偏被\u201C三\u201D这个数字焊死了——三十年、三个阶段，而且三十年里只有一条铁律：绝对不能破身。回报是什么？她们拿到了罗马其他女性做梦都不敢想的权力——拥有财产、立遗嘱、法庭作证不用起誓。路上碰到押赴刑场的死囚，圣女一个点头，犯人当场释放。`,
  },
  {
    text: `在罗马街头，连最高官员见到圣女都得让路。她们坐的马车，平时只有皇后才能用。在角斗场，她们的座位在最前排，紧挨着皇帝本人。在一个把大多数女性当财产的社会里，维斯塔圣女是真正\u201C碰不得\u201D的存在——侵犯圣女，死罪。`,
  },
  {
    text: `但权力背后藏着一个让人脊背发凉的规矩。圣女一旦被指控破了誓，等待她的不是普通的死刑。罗马法律禁止让圣女流血，因为那会触怒神灵。于是他们想了个\u201C两全其美\u201D的办法：被告穿上丧服，被押着走过她曾经主宰的广场，带到一个叫\u201C罪恶之地\u201D的地方。那里有一间地下小屋，里面放着一盏灯、一块面包、一壶水。她走进去，入口用土封死。罗马没有杀她。只是\u2026\u2026把她\u201C收起来了\u201D。`,
  },
  {
    text: `千年间，至少有十位圣女被这样活埋。而且很多时候，罪名根本就是捏造的。罗马打了败仗、遭了天灾，当权者需要替罪羊——指控圣女破誓最省事，把公众的恐慌变成一场\u201C献祭\u201D就行了。历史学家普鲁塔克记录这些审判时满是怀疑，小普林尼写到暴君多米提安治下的一次活埋，字里行间全是压不住的愤怒。`,
  },
  {
    text: `维斯塔圣女的终结不是因为丑闻，而是因为时代变了。公元382年，已经皈依基督教的皇帝格拉提安砍掉了圣女团的经费。十二年后，皇帝狄奥多西一世彻底关门大吉，下令熄灭圣火。烧了一千多年、一天都没断过的火，就这么灭了。人类历史上持续最久的传统之一，被一纸诏书画上句号。`,
  },
  {
    text: `最后一任首席圣女，很可能是一个叫科利娅\u00B7康科迪亚的女人。没人知道她是据理力争还是默默离去。但她留下的东西至今还在。维斯塔圣女之家今天仍然矗立在罗马广场，庭院里排满了曾经摆放历任首席圣女雕像的基座。有的空了——被岁月或人为砸毁。有的名字被刮掉了，而抹去这些名字的，恰恰是取代她们的那个信仰。一千年的虔诚，最后只剩空白的石头，和沉默。`,
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
  langStoryId: "zh#last-vestal-virgin",
  lang: "zh",
  storyId: "last-vestal-virgin",
  title,
  subtitle,
  excerpt,
  moralOrLesson,
  paragraphs,
  characters: [
    "维斯塔圣女",
    "努马·庞皮利乌斯国王",
    "皇帝狄奥多西一世",
    "科利娅·康科迪亚（末代首席圣女）",
    "皇帝多米提安",
  ],
  coordinates: { lat: 41.8917, lng: 12.487 },
  disabled: false,
  era: "公元前7世纪 - 公元394年",
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

console.log("\n✅ Chinese (zh) story pushed successfully!");
console.log(`   siteId: ${item.siteId}`);
console.log(`   langStoryId: ${item.langStoryId}`);
console.log(`   Title: ${item.title}`);
console.log(`   Paragraphs: ${item.paragraphs.length}`);
console.log(`   Total chars: ${totalChars}`);
console.log(
  `   Updated at: ${new Date(item.updatedAt * 1000).toISOString()}`
);
