import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const now = Math.floor(Date.now() / 1000);

const item = {
  TableName: "Story",
  Item: {
    siteId: { S: "hermitage-winter-palace" },
    langStoryId: { S: "zh#storming-winter-palace" },
    lang: { S: "zh" },
    storyId: { S: "storming-winter-palace" },
    title: { S: `那一夜，俄罗斯变天了` },
    subtitle: { S: `冬宫\u201C攻城战\u201D的荒诞真相` },
    excerpt: {
      S: `电影里是枪林弹雨的史诗攻城。真相？一群人在一千多个房间里迷了路，十万瓶好酒险些毁掉一场革命，最后政府部长们在饭桌上乖乖被捕。`,
    },
    icon: { S: "⚔️" },
    tier: { S: "S" },
    paragraphs: {
      L: [
        {
          M: {
            text: {
              S: `你以为的十月革命是什么样的？成千上万武装工人冲向冬宫大门，一路枪战杀进去，把整个政府掀了个底朝天。这个画面来自爱森斯坦1927年的电影\u300A十月\u300B\u2014\u2014说白了就是宣传片。1917年10月那个晚上真正发生的事情，比电影要离谱得多。`,
            },
          },
        },
        {
          M: {
            text: {
              S: `当时守在冬宫里的，只有几百号人\u2014\u2014大部分是十几岁的军校学员，还有一支叫\u201C敢死营\u201D的女兵部队，她们之前在一战前线真刀真枪地打过仗。他们守的是临时政府，就是沙皇尼古拉二世八个月前退位之后仓促搭起来的民主政权。但随着时间一点点过去，守军开始从后门悄悄溜走。革命最大的障碍，自己走了。`,
            },
          },
        },
        {
          M: {
            text: {
              S: `布尔什维克与其说是\u201C攻进\u201D冬宫，不如说是\u201C溜进\u201D去的。他们翻窗户、钻仆人通道，三三两两地摸了进去。要知道，冬宫有一千多个房间，好几拨武装工人直接在走廊里迷了路。然后，有人发现了沙皇的酒窖\u2014\u2014十万瓶俄罗斯最顶级的好酒。接下来发生的事，差点让这场革命还没成功就先翻车：政变进行到一半，攻占者们集体喝嗨了。`,
            },
          },
        },
        {
          M: {
            text: {
              S: `布尔什维克指挥官急了。他们派武装卫兵去制止，结果卫兵也跟着喝上了。他们试着把酒窖封起来，有人把墙砸开继续喝。最后没辙了，只能把所有酒瓶全砸了。葡萄酒顺着冬宫的排水沟流到了大街上\u2014\u2014首都的街道上淌过一条红色的河。与此同时，真正的政府\u2014\u2014那些部长们\u2014\u2014被发现挤在一间小餐厅的桌子旁边。没放一枪，全部被捕。`,
            },
          },
        },
        {
          M: {
            text: {
              S: `1917年10月26日天亮的时候，列宁站在人群面前宣布：\u201C临时政府已被推翻。\u201D就这样，罗曼诺夫沙皇三百年的权力中心，一夜之间换了主人。整个过程大概十二个小时，而其中最\u201C惨烈\u201D的部分，可能是那十万瓶酒。`,
            },
          },
        },
        {
          M: {
            text: {
              S: `但真正让人意外的是后面的事。刚推翻了一个帝国的革命者们，并没有毁掉帝国的宝贝。冬宫里收藏着地球上最顶级的艺术品\u2014\u2014伦勃朗、鲁本斯、达\u00B7芬奇。新政权完全可以把这些东西一把火烧了，当作皇室奢靡的象征。但他们没有。他们把大门打开，让所有人都能进来看。冬宫变成了埃尔米塔日博物馆的核心，沙皇的私藏成了全民的珍宝。`,
            },
          },
        },
        {
          M: {
            text: {
              S: `都说事不过三，罗曼诺夫王朝偏偏就倒在了第三个世纪。而那场本该是史诗级决战的革命，结果是一群人在黑暗的走廊里乱转、一场酒窖灾难、一次饭桌上的安静逮捕。二十世纪最大的权力更迭，不是以怒吼收场的\u2014\u2014是以宿醉收场的。`,
            },
          },
        },
      ],
    },
    moralOrLesson: {
      S: `再大的帝国也有散场的时候\u2014\u2014有时候，散场的方式比你想象的要荒唐得多。`,
    },
    source: {
      S: "Bolshevik records, John Reed's \"Ten Days That Shook the World,\" Winter Palace garrison memoirs",
    },
    characters: {
      L: [
        { S: "Vladimir Lenin" },
        { S: "Alexander Kerensky (fled before the storming)" },
        { S: "Women's Battalion of Death" },
        { S: "Red Guards" },
        { S: "Provisional Government ministers" },
      ],
    },
    era: { S: "October 25-26, 1917" },
    readingTimeMinutes: { N: "2" },
    image: { S: "" },
    thumbnail: { S: "" },
    coordinates: {
      M: {
        lng: { N: "30.3146" },
        lat: { N: "59.9398" },
      },
    },
    hasAudio: { BOOL: false },
    isFree: { BOOL: true },
    disabled: { BOOL: false },
    storyCategory: { S: "crowns_conquests" },
    updatedAt: { N: String(now) },
  },
};

async function pushStory() {
  try {
    const command = new PutItemCommand(item);
    const result = await client.send(command);
    console.log("Successfully pushed Chinese (zh) story to DynamoDB!");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("Request ID:", result.$metadata.requestId);
    console.log(
      "Key: siteId=hermitage-winter-palace, langStoryId=zh#storming-winter-palace"
    );
  } catch (error) {
    console.error("Error pushing story:", error);
    process.exit(1);
  }
}

pushStory();
