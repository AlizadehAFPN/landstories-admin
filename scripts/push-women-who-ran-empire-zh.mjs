import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "persepolis",
  langStoryId: "zh#women-who-ran-the-empire",
  storyId: "women-who-ran-the-empire",
  lang: "zh",
  title: `她们撑起了帝国`,
  subtitle: `三万块泥板揭开了希腊人从未记录的真相——一个同工同酬、有产假制度、由女人决定谁来当国王的帝国`,
  excerpt: `波斯波利斯的墙里封了二十三个世纪的三万块泥板，揭开了希腊历史学家从来不屑于记录的事实：地球上最大的帝国给女性同等报酬，保障新妈妈的权益，而在帝国的最高层，是女人决定了谁有资格坐上王位。`,
  moralOrLesson: `二十四个世纪以来，西方世界一直以为波斯帝国不过是又一个女人没有话语权的王朝。然后三万块泥板击碎了这个迷思。它们证明：在这个帝国里，女性同工同酬，新妈妈有生育补贴，女性经营庞大产业，女性决定谁来当国王。证据一直都在——封在一面墙里，被大火烧硬，安静地等了两千多年，等着有人真正去读它。`,
  icon: "\uD83D\uDC51",
  tier: "A",
  source: "Hallock, R.T., Persepolis Fortification Tablets (1969); Henkelman, Wouter, The Other Gods Who Are (2008); Brosius, Maria, Women in Ancient Persia (1996); Koch, Heidemarie, Frauen und Schlangen (2002); Llewellyn-Jones, Lloyd, King and Court in Ancient Persia (2013); Herodotus, Histories III.133-134, VII.2-3; Aeschylus, The Persians (472 BCE); Briant, Pierre, From Cyrus to Alexander (2002)",
  era: "509\u2013494 BCE (Fortification Tablets); broader Achaemenid period 550\u2013330 BCE",
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  coordinates: { lng: 52.8914, lat: 29.9342 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "lost_found",
  updatedAt: Math.floor(Date.now() / 1000),
  characters: [
    "Atossa (daughter of Cyrus, kingmaker)",
    "Irdabama (wealthy estate owner)",
    "Artystone (Darius\u2019s favorite wife)",
    "The women supervisors of the Fortification Tablets",
    "Richard Hallock (decipherer of the tablets)",
  ],
  paragraphs: [
    {
      text: `1930年代，考古学家撬开了波斯波利斯的一面墙。波斯波利斯是古波斯帝国的首都，在今天的伊朗。墙里塞着三万块泥板，全是账本——谁干了什么活，发了多少粮。听起来无聊透了，直到有人真的坐下来读。那些枯燥的收支记录里，埋着一个改写历史的秘密：两千五百年前，地球上最大的帝国给女性发的工资，和男性一模一样。`,
    },
    {
      text: `泥板记录了大流士大帝统治下大约十五年的账目，大概在公元前500年。上面列着来自帝国各地的工人——波斯人、巴比伦人、埃及人、希腊人——每人都有职位和工资。其中几百个名字是女性的。不是奴隶，不是仆人，是正式的有薪员工和管理者。同样的技术工作，女性拿的工资和男性一分不差。不是偶尔一次，是十五年间上千条记录都是如此。这是制度。`,
    },
    {
      text: `但最让人意外的发现还在后面。泥板显示，刚生完孩子的女性可以领取额外报酬——公元前五世纪的带薪产假。同一时期的雅典，女性不能拥有财产，出门必须有男人陪同。罗马呢？女人一辈子在法律上都是未成年人。反倒是被希腊人骂成\u201c野蛮人\u201d的波斯，早早建起了一套保障新妈妈的制度。西方世界要追上这一步，还要再等两千多年。`,
    },
    {
      text: `再看看帝国高层。泥板里反复出现一个名字：伊尔达巴玛。她经营着大片农庄，手下管着几百号工人，调配粮食、酒和牲畜的规模堪比一方长官。她有自己的私人印章——上面刻着一个坐在王座上的女人。所有调令和签收都是她亲自盖章，没有任何记录提到需要丈夫或父亲批准。她只对国王一人负责。`,
    },
    {
      text: `而真正的权力核心是阿托萨。她是居鲁士大帝的女儿——就是白手起家创建整个波斯帝国的那个人。她先后嫁给了三任国王。连向来不怎么关注波斯女性的希腊历史学家希罗多德都写道，阿托萨在宫廷里\u201c掌握一切权力\u201d。当大流士需要选定继承人时，阿托萨出手了。她力主让自己的儿子薛西斯继位，越过他那些年长的同父异母兄弟。她赢了。一个女人，决定了地球上最大帝国的下一任统治者。`,
    },
    {
      text: `几百年来，西方学者看波斯波利斯，看到的都是自己脑子里已有的东西——后宫、面纱、落后的帝国。他们甚至给一座建筑贴上了\u201c薛西斯的后宫\u201d这个标签，证据？一条也没有。但泥板讲述的完全是另一个故事。王室女性在各省之间自由往来，主持宴席，经营庄园，掌控大量财富。她们不是被关在墙后面的人。她们是在墙里面运转整个帝国的人。`,
    },
    {
      text: `历史是希腊人写的，所以波斯被描述成暴君统治、女性毫无地位的地方。真相呢？封在墙里整整二十三个世纪。中国人常说\u201c真金不怕火炼\u201d——亚历山大大帝一把火烧掉了波斯波利斯，本想毁灭一切，结果那场大火反而把泥板烧得更加坚硬，将真相完好地保存了下来。这些泥板辗转到了芝加哥，一位叫理查德\u00b7哈洛克的学者花了几十年，将那些发粮记录一块块破译出来。最终改写女性权利史的，不是什么宏大宣言——是两千五百年前的工资条。`,
    },
  ],
};

async function main() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log("SUCCESS: Chinese (zh) story pushed to DynamoDB");
    console.log(`  siteId: ${item.siteId}`);
    console.log(`  langStoryId: ${item.langStoryId}`);
    console.log(`  title: ${item.title}`);
    console.log(`  paragraphs: ${item.paragraphs.length}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists! Use update instead.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

main();
