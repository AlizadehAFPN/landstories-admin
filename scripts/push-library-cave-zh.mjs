import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const story = {
  siteId: "mogao-caves",
  langStoryId: "zh#library-cave-sealed",
  lang: "zh",
  storyId: "library-cave-sealed",
  title: "藏经洞：五万卷经书，沉睡九百年",
  subtitle: "敦煌莫高窟里那个改写历史的小房间",
  excerpt: "1900年，一个云游道士在戈壁滩上扫沙子，无意间敲开了一面墙——墙后面，是沉默了九百年的五万卷手稿。",
  icon: "📜",
  tier: "A",
  era: "约1002年（封洞）— 1900年（发现）",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "riddles_past",
  coordinates: { lat: 40.0362, lng: 94.8089 },
  source: "斯坦因《沙埋契丹废墟记》(1912)；伯希和考察记录；国际敦煌项目(IDP)",
  characters: [
    "王圆箓——守护洞窟的道士",
    "奥莱尔·斯坦因——拿走经卷的探险家",
    "保罗·伯希和——法国汉学家",
    "约1002年封洞的无名僧人"
  ],
  moralOrLesson: "一件宝贝最大的敌人，不是被遗忘，也不是战火。而是终于来了一个人，他比你更清楚它值多少钱。",
  paragraphs: [
    {
      text: `1900年，甘肃敦煌，戈壁沙漠边缘。一个叫王圆箓的云游道士正在莫高窟里扫沙子。他不是什么考古学家，就是个自学成才的修行人，看这片千年石窟破败得不像样，自己掏钱掏力来修缮。那天他清理一条画廊走道时，发现墙上有条裂缝。他敲开一看——裂缝后面藏着一间密室，不到十平方米，里面从地板到天花板，塞满了经卷。大约五万件。`
    },
    {
      text: `没人确切知道是谁封的这间屋子，也没人知道为什么。学者们最靠谱的猜测是，大约公元1002年前后，寺院里的僧人把它封了起来——也许是为了躲避入侵的军队，也许只是因为洞窟放不下了。不管什么原因，入口被砖头砌死，外面抹上泥灰，剩下的交给了沙漠。将近九百年，地球上最干燥的空气把这些文献保存得近乎完好。`
    },
    {
      text: `王道士不完全明白自己撞上了什么，但他知道这事不小。他去找当地官员汇报。官员们没当回事。他又写信给省里。省里回话说：封回去吧。整整七年，王圆箓求爷爷告奶奶，想让哪怕一个有权有势的人关心一下这个可能是人类历史上最重大的文献发现。没有人理他。`
    },
    {
      text: `1907年，一个叫斯坦因的匈牙利裔英国探险家出现了。他穿越了好几周的沙漠，就凭一个传言。但他一看到洞窟里的东西，立刻明白这是什么级别的发现。他的手段很高明：他对王道士说，自己是唐僧的忠实信徒——就是《西游记》里那个取经的玄奘。他说命运派他来把这些圣物再次带往西方。王圆箓是个虔诚的人，他信了每一个字。`
    },
    {
      text: `斯坦因带走了二十四箱经卷和五箱绘画，大概一万件。他付给王道士的钱少得可怜。一年后，法国汉学家伯希和来了，精心挑走了六千件最好的。接着日本人、俄国人、美国人轮番登场，各取所需。等到1910年清政府终于反应过来，把剩下的运到北京时，洞里一半以上的东西已经散落在全世界了。`
    },
    {
      text: `这个故事最让人心痛的地方在于：王圆箓把收到的每一分钱都花在了修缮洞窟上。他真心实意地相信，自己是在用旧纸换新庙，用文书保石窟。老话说"买椟还珠"——买了盒子，退了珍珠。可王道士连盒子都没留住，他是把珍珠双手捧出去的那个人，然后用换来的几个铜板，去修了一只空盒子。1931年他去世，就葬在洞窟旁边，守了一辈子。他到死都不知道，他送出去的东西，比他建起来的一切加在一起还要珍贵。`
    },
    {
      text: `斯坦因带走的那批东西里，有一卷叫《金刚经》的佛经——印刷于公元868年，是目前已知世界上最早的有明确日期的印刷书籍。它现在躺在伦敦的大英图书馆里。《金刚经》的梵文全名翻译过来是"能断一切虚妄的金刚"。这个名字用在这里太残忍了：一部关于"看破幻象"的经书，恰恰是从一个一辈子都没看破幻象的人手里拿走的。`
    },
    {
      text: `今天，你想研究这一个洞窟里出来的东西，得买飞往伦敦、巴黎、东京和圣彼得堡的机票。藏经洞本身现在空了——就是一间光秃秃的小屋子，五万个声音曾经在黑暗中安静地坐了九百年。事实证明，一件宝贝最大的敌人，不是被遗忘，也不是战火。而是终于来了一个人，他比你更清楚它值多少钱。`
    }
  ],
  updatedAt: 1772121585
};

async function push() {
  try {
    await docClient.send(new PutCommand({
      TableName: "Story",
      Item: story,
      ConditionExpression: "attribute_not_exists(siteId)"
    }));
    console.log("SUCCESS: zh#library-cave-sealed pushed to DynamoDB");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      // Record exists, overwrite
      await docClient.send(new PutCommand({
        TableName: "Story",
        Item: story
      }));
      console.log("SUCCESS: zh#library-cave-sealed updated in DynamoDB");
    } else {
      console.error("FAILED:", err.message);
      process.exit(1);
    }
  }
}

push();
