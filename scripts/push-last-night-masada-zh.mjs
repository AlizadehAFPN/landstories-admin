import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "masada",
  langStoryId: "zh#last-night-on-masada",
  lang: "zh",
  storyId: "last-night-on-masada",
  title: `马萨达的最后一夜`,
  subtitle: `960名犹太守军宁死不做罗马奴隶——用抽签决定谁来了结彼此，这是历史上最悲壮的终章`,
  excerpt: `城墙已破，攻城坡道直通山顶，天亮罗马大军就会涌入。那个夜晚，守军首领站起来说了一番话，此后两千年回荡不绝。`,
  paragraphs: [
    {
      text: `公元73年春天，罗马第十军团终于攻破了马萨达的外墙——他们花了好几个月，硬是在悬崖上堆出一条攻城坡道。守军临时用木头和泥土筑了一道应急墙，罗马人撞不开，索性放火烧。风一度把火焰吹向罗马人自己的攻城塔——但很快就转了向。天黑时，墙已经不存在了。所有人都清楚天亮意味着什么：一万名士兵从缺口涌入。没有墙了，只剩下一个选择。`,
    },
    {
      text: `这群人不是普通难民。他们是\u201c短刀党\u201d——犹太起义中最极端的一支武装。七年前，罗马士兵洗劫了耶路撒冷圣殿，屠杀平民，整个犹太地区揭竿而起。起义军初期打出了漂亮仗，全歼过罗马一个完整军团。随后罗马调来六万大军，逐一碾碎每个据点。耶路撒冷被烧成废墟，圣殿化为灰烬。马萨达是最后的钉子户——960个人守在死海边的悬崖堡垒上，靠希律王一百年前囤下的粮食活着。`,
    },
    {
      text: `那天夜里，首领以利亚撒\u00b7本\u00b7亚尔把所有人召集到希律王的宫殿里。据约瑟夫斯记载——此人原是犹太指挥官，后来投靠了罗马，也是留下唯一记录的人——以利亚撒前后讲了两番话。他描述了投降后等着他们的命运：男人死在矿井和斗兽场里，女人遭受凌辱，孩子从小就是奴隶。\u201c让我们的妻子免于屈辱，\u201d他说，\u201c让我们的孩子永远不必知道奴役是什么滋味。\u201d他不是在叫大家放弃。他是在问：你们还愿意做最后一个自由人的决定吗？`,
    },
    {
      text: `男人们哭了。有人抱着妻子，怎么也放不开手。但以利亚撒没有停。他让他们看看四周——烧焦的城墙，山脚下像绳套一样收紧的罗马营地。没有什么好谈判的。罗马对叛军从来只有一个态度：杀一儆百。耶路撒冷陷落后那些十字架刑场，所有人都听说过——钉的人太多，士兵连做十字架的木头都用光了。被俘的犹太人在罗马街头被当战利品一样游街示众。不是一下子同意的，也不是没有眼泪——但最终，所有人都点了头。`,
    },
    {
      text: `接下来发生的事井然有序。犹太律法禁止自杀，他们心里清楚。所以他们想出一个办法，让最终只有一个人需要亲手了结自己。每个男人走向家人，抱紧他们，然后动了手。他们烧掉了所有财物，唯独留下粮仓不动——这是说给罗马人听的：我们不是被饿死的，是我们自己选的。十个人被抽签选出，负责杀死剩余的人。这十个人再抽一次签。最后那个人点燃了宫殿，然后把剑刺进自己的身体。中国人说\u201c宁为玉碎，不为瓦全\u201d。这960个人，碎得干干净净。`,
    },
    {
      text: `天亮了。罗马士兵冲进缺口——盾牌紧锁，刀剑出鞘，做好了打一场恶战的准备。迎接他们的是沉默。约瑟夫斯写道：\u201c四面八方是令人恐惧的死寂，宫殿中只有火焰。\u201d士兵大喊，用剑猛砸盾牌，什么回应都没有。然后两个女人和五个孩子从一个隐蔽的蓄水池里爬了出来。其中一人是以利亚撒的亲属。她把一切都告诉了罗马人。这些身经百战的老兵——曾经亲手烧掉耶路撒冷圣殿的人——站在满地的死者面前，一句话都说不出来。`,
    },
    {
      text: `但有一件事很奇怪：此后整整两千年，塑造犹太教的那些拉比们从未提起过马萨达。一次都没有。他们选了另一个英雄——一位靠谈判走出被围耶路撒冷的学者，用\u201c学问\u201d这一样东西，撑起了一个没有圣殿、没有国土也能延续的传统。马萨达的刀剑和烈火，恰恰是他们所拒绝的。但故事还是活了下来。罗马人在山顶上遇到的那片沉默——属于那些宁死不跪的人——两千年后依然回荡在这片高原上空，无人能答，无可辩驳。`,
    },
  ],
  moralOrLesson: `自由不仅仅是没有锁链——它是一个人选择自己命运的终极权利，即使每一条路都通向黑暗。衡量一个民族的尺度，不是他们是否活了下来，而是他们是否拒绝交出那个让活着有意义的东西。`,
  icon: "⚔️",
  tier: "S",
  source:
    "Josephus, Flavius. Bellum Judaicum (The Jewish War), Book VII, chapters 252-406; Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; Magness, Jodi. Masada: From Jewish Revolt to Modern Myth, Princeton University Press, 2019; Cohen, Shaye J.D. 'Masada: Literary Tradition, Archaeological Remains, and the Credibility of Josephus,' Journal of Jewish Studies 33, 1982",
  characters: [
    "Eleazar ben Ya'ir -- leader of the Sicarii defenders",
    "Flavius Josephus -- Jewish-Roman historian, sole source of the account",
    "Two unnamed women -- survivors who hid in a cistern with five children",
    "Lucius Flavius Silva -- Roman commander of the besieging Tenth Legion",
    "The 960 defenders -- men, women, and children of the last Jewish stronghold",
  ],
  era: "73 or 74 CE -- the final chapter of the First Jewish-Roman War",
  readingTimeMinutes: 3,
  image: "",
  updatedAt: 1772116624,
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 35.3536, lat: 31.3156 },
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
};

async function push() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log("✅ Chinese (zh) version pushed successfully!");
    console.log(`   siteId: ${item.siteId}`);
    console.log(`   langStoryId: ${item.langStoryId}`);
    console.log(`   title: ${item.title}`);
    console.log(`   paragraphs: ${item.paragraphs.length}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log("⚠️  Record already exists. Overwriting...");
      await docClient.send(
        new PutCommand({ TableName: "Story", Item: item })
      );
      console.log("✅ Chinese (zh) version overwritten successfully!");
    } else {
      console.error("❌ Failed to push Chinese version:", err);
      process.exit(1);
    }
  }
}

push();
