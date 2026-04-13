import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const item = {
  siteId: "alamut-castle",
  langStoryId: "zh#library-burned-seven-days",
  lang: "zh",
  storyId: "library-burned-seven-days",
  title: `烧了七天七夜的图书馆`,
  subtitle: `四十万册书，七天七夜的烈火，和永远无法知道的损失`,
  excerpt: `一位历史学家走进了厄尔布尔士山深处最伟大的图书馆，亲手选择了哪些该留。他留下了古兰经，留下了天文仪器。然后点燃了其余的一切。阿拉穆特的大火，烧了七天七夜。`,
  moralOrLesson: `城墙可以重建，王朝可以复兴，但烧掉的书永远回不来。阿拉穆特最大的悲剧不是失去了什么——而是我们永远不会知道失去了什么。`,
  paragraphs: [
    {
      text: `公元1090年，一个叫哈桑·萨巴赫的学者做了一件不可思议的事：不费一兵一卒，拿下了阿拉穆特城堡。这座要塞坐落在伊朗北部厄尔布尔士山脉的悬崖之上，易守难攻。但哈桑拿下它不是为了打仗。他把自己关在城堡里，三十四年几乎没出过门。他在干什么？读书，收书，建图书馆。三十四年，他建起了整个伊斯兰世界最伟大的藏书之一。`,
    },
    {
      text: `此后一百六十多年，每一任继承者都在往这座图书馆里添书。到十三世纪中叶，馆藏达到了四十万册——神学、哲学、天文、医学、诗歌，几乎涵盖了当时人类知识的每个角落。穆斯林世界各地的学者不远千里赶来求学。这不是一间普通的藏书楼，这是那个时代地球上最重要的知识中心之一。`,
    },
    {
      text: `在这些学者中，有一位叫纳西尔丁·图西——十三世纪伊斯兰世界最杰出的科学头脑。他在阿拉穆特住了三十多年，写出了改变天文学走向的研究，后来传到文艺复兴时期的欧洲，影响了哥白尼。他使用这座图书馆的方式，只有天才才做得到——不是一本一本地读，而是把不同领域的知识串联起来，把人类认知的边界往外推。`,
    },
    {
      text: `1256年，蒙古人来了。旭烈兀——成吉思汗的孙子——率十万大军杀进山谷，目标只有一个：彻底消灭在阿拉穆特盘踞了近两百年的力量。末代城主鲁克努丁试图谈判，甚至主动拆掉自己的城墙以示投降。没有用。旭烈兀要的不是投降，是毁灭。`,
    },
    {
      text: `然后发生了这个故事里最令人心碎的一幕。点火之前，随蒙古军同行的历史学家志费尼被允许走进图书馆。他是个读书人，他完全清楚自己面前摆着什么。他挑出了古兰经，取走了天文仪器，甚至读完了哈桑·萨巴赫的自传——那是关于阿拉穆特建立过程的唯一亲历记录。然后，他亲手放火烧了剩下的一切。大火烧了七天七夜。秦始皇焚书，好歹后人知道他烧了什么。但阿拉穆特这场火，连这点安慰都没留下。`,
    },
    {
      text: `图西活了下来。他投靠了蒙古人——是背叛还是求生，没人说得清。他成了旭烈兀的首席科学顾问，说服这位征服者在伊朗马拉盖建了一座天文台，又从各个被攻陷的城市搜罗了四十万册书充实其中。那里产出的研究成果，几百年后传到了哥白尼手里。图西脑子里记住的东西，有一部分挺过了那场大火。但也只是一部分而已。`,
    },
    {
      text: `今天，阿拉穆特城堡只剩大约三分之一的残垣断壁，依然立在厄尔布尔士山的那块岩石上。考古学家发现八百年前修建的水渠，至今还有水在流。蒙古人走后，人们回来了——人总是会回来的。但图书馆回不来了。四十万册书，几个世纪的思想与诗篇，一周之内化为灰烬。我们知道一个天才凭记忆带走了什么。但我们永远不会知道，烧掉的究竟是什么。`,
    },
  ],
  characters: [
    `纳西尔丁·图西（在毁灭中幸存的博学家）`,
    `旭烈兀（下令摧毁阿拉穆特的蒙古统帅）`,
    `志费尼（焚毁图书馆的历史学家）`,
    `鲁克努丁·库沙（阿拉穆特末代城主）`,
    `哈桑·萨巴赫（创建图书馆的奠基者）`,
  ],
  icon: "🔥",
  tier: "S",
  source:
    "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); Peter Willey, Eagle's Nest: Ismaili Castles in Iran and Syria (I.B. Tauris, 2005); Encyclopaedia Iranica; Hamideh Chubak, Alamut archaeological reports (2004)",
  era: "November-December 1256 CE (Mongol destruction of Alamut)",
  readingTimeMinutes: 5,
  image: "",
  thumbnail: "",
  coordinates: { lng: 50.5861, lat: 36.4447 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "lost_found",
  updatedAt: Math.floor(Date.now() / 1000),
};

async function push() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
      })
    );
    console.log("SUCCESS: Chinese (zh) story pushed to DynamoDB");
    console.log(`  siteId: ${item.siteId}`);
    console.log(`  langStoryId: ${item.langStoryId}`);
    console.log(`  title: ${item.title}`);
    console.log(`  paragraphs: ${item.paragraphs.length}`);
    console.log(`  updatedAt: ${item.updatedAt}`);
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
