import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const story = {
  siteId: "ephesus",
  langStoryId: "zh#library-celsus",
  lang: "zh",
  storyId: "library-celsus",
  title: `他给父亲建了一座图书馆`,
  subtitle: `以弗所古城里，一段跨越两千年的父子情`,
  excerpt: `公元114年，罗马帝国最繁华的城市之一——以弗所，就在今天土耳其的西海岸，一个叫塞尔苏斯的人去世了。他从罗马元老院议员一路升到执政官，最后当上了整个亚细亚行省的总督。儿子阿奎拉完全可以立块碑、塑个像，体面地送父亲最后一程。但他没有。他做了一件谁也没想到的事——给父亲建了一座当时全世界最美的图书馆。`,
  icon: "📚",
  tier: "A",
  era: "公元117–125年",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "crowns_conquests",
  coordinates: { lat: 37.9394, lng: 27.3403 },
  source: `考古发掘记录；奉献铭文；奥地利考古研究所档案`,
  characters: [
    `塞尔苏斯（提贝里乌斯·尤利乌斯·塞尔苏斯·波莱马埃阿努斯）`,
    `阿奎拉（盖乌斯·尤利乌斯·阿奎拉）`,
    `索菲亚（智慧）`,
    `厄庇斯忒墨（学识）`,
    `恩诺亚（思想）`,
    `阿瑞忒（美德）`,
  ],
  moralOrLesson: `最伟大的纪念碑，往往诞生于爱与失去之间。我们为逝者建造的东西，说到底，映照的是活着的人自己。`,
  paragraphs: [
    {
      text: `公元114年，罗马帝国最繁华的城市之一——以弗所，就在今天土耳其的西海岸，一个叫塞尔苏斯的人去世了。他从罗马元老院议员一路升到执政官，最后当上了整个亚细亚行省的总督。儿子阿奎拉完全可以立块碑、塑个像，体面地送父亲最后一程。但他没有。他做了一件谁也没想到的事——给父亲建了一座当时全世界最美的图书馆。`,
    },
    {
      text: `这项工程花了大约十年，到公元125年左右完工。馆内存放着大约一万两千卷书，规模仅次于埃及的亚历山大图书馆和附近城市帕加马的藏书馆，排名古代世界第三。但真正让它与众不同的不是大，而是美。两层高的正面柱廊经过精心计算——外侧柱子比中间的略矮一点，制造出一种视觉错觉，让整座建筑看起来比实际还要宏伟。这不是巧合，是故意的。`,
    },
    {
      text: `建筑师还解决了一个困扰古代藏书家的大难题：潮湿。他们在墙壁之间留出一层空气夹层——说白了就是两千年前的恒温恒湿系统——让湿气根本碰不到里面的书卷。图书馆入口立着四座女性雕像，分别代表智慧、学识、思想和美德。这不是装饰。这是一个儿子在告诉所有人：我的父亲，就是这样的人。`,
    },
    {
      text: `故事到这里才真正动人。阿奎拉把父亲的大理石棺安放在了图书馆的地板之下。要知道，在罗马的城墙以内安葬死者，是严格禁止的——这是罗马人最古老的规矩之一。能为塞尔苏斯破这个例，说明以弗所人对他的敬重有多深。所以这座建筑不只是图书馆，还是一座陵墓。中国人常说\u201C子欲养而亲不待\u201D，可阿奎拉偏不认命——父亲走了，他就用一整座图书馆来还这份爱。`,
    },
    {
      text: `图书馆辉煌了一百多年。公元262年，从北方南下的哥特人——日耳曼部落的战士，后来正是他们参与了罗马帝国的覆灭——攻入以弗所，一把火烧掉了图书馆的内部。一万两千卷书，全部化为灰烬。之后几百年间，地震一次又一次把残存的结构震塌。古代世界最美的建筑之一，就这样埋在了泥土和碎石底下，一埋就是一千多年。`,
    },
    {
      text: `1903年，奥地利考古学家开始在遗址上发掘。泥土里慢慢露出了正面墙的碎片——柱子、雕刻，还有那四座雕像的残件。从1970年起，一个团队开始像拼拼图一样把这些碎片拼回原位，一块石头一块石头地复原。到1978年，正面墙重新矗立了起来。不是复制品，不是仿建——是原来那些石头，回到了将近两千年前它们所在的位置。`,
    },
    {
      text: `今天，塞尔苏斯图书馆就是以弗所的名片——每个去那儿的人都要看的第一站。每年有几百万人在那面正墙前拍照，但大多数人恐怕并不知道，他们拍下的其实是人类历史上最深情的一段父子故事。这座图书馆不是为了讨好皇帝，不是为了炫耀权力。一个痛失父亲的儿子决定，纪念父亲最好的方式就是送给这个世界一个学习的地方。将近两千年过去了，这份礼物还在。`,
    },
  ],
  updatedAt: Math.floor(Date.now() / 1000),
};

async function push() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: story,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log("SUCCESS: zh#library-celsus pushed to DynamoDB");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      await docClient.send(
        new PutCommand({
          TableName: "Story",
          Item: story,
        })
      );
      console.log("SUCCESS: zh#library-celsus updated in DynamoDB");
    } else {
      console.error("FAILED:", err.message);
      process.exit(1);
    }
  }
}

push();
