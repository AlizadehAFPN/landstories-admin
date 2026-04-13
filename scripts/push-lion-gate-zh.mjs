import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "sigiriya" },
  langStoryId: { S: "zh#lion-gate-sky-fortress" },
  lang: { S: "zh" },
  storyId: { S: "lion-gate-sky-fortress" },
  title: { S: "狮子门" },
  subtitle: { S: "一个弑父篡位的国王，在悬崖上造了一头巨狮——所有人必须走进它张开的大嘴，才能抵达他的天空宫殿" },
  excerpt: { S: "想见那个住在云端的国王，你得先走进一头巨狮张开的血盆大口，然后沿着它的喉咙一路往上爬。这头狮子不是雕塑，不是装饰——它是大门。" },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: `想象一下这个画面：公元五世纪的斯里兰卡，一座花岗岩巨崖从热带丛林里拔地而起，足足两百米高。你沿着石阶往上爬，爬到半山腰，路没了。挡在你面前的，是一头砖石砌成的巨狮，三十五米高，嘴巴大张，正对着你。往上走的唯一通道，就是从它的嘴里穿过去。这不是什么艺术品，不是景观设计。这是一扇门——一个叫迦叶波的国王给自己造的前门。`
          }
        }
      },
      {
        M: {
          text: {
            S: `迦叶波手上有血债。大约公元477年，他杀了自己的父亲达都舍那王，抢走了王位。他同父异母的弟弟目犍连——本来的合法继承人——逃到了印度南部，开始招兵买马。迦叶波很清楚，复仇只是时间问题。于是他做了一个疯狂的决定：放弃旧都，把整个朝廷搬到丛林深处一块叫锡吉里耶的孤崖上面。既然人心收不住，那就造一座谁也攻不上来的堡垒。`
          }
        }
      },
      {
        M: {
          text: {
            S: `但这头狮子不只是军事工事，它是一份用砖头写的政治宣言。僧伽罗人——斯里兰卡的主体民族——相信自己是狮子的后代。他们的建国神话里，开国始祖维阇耶王子的外祖父就是一头真正的狮子。"僧伽罗"这个词本身就是"狮子族"的意思。所以迦叶波在悬崖上修一头巨大的狮子，要传达的信息再明确不过：我才是狮子血脉的正统继承人，我的王位天经地义。`
          }
        }
      },
      {
        M: {
          text: {
            S: `这头狮子的体量超出想象。从残存的狮爪和岩壁上的痕迹推算，它大约三十五米高、二十一米宽，砖石和灰泥覆盖在木材与铁钉搭成的骨架上，整个骨架直接锚固在花岗岩里。两只前爪之间，每只爪子都有好几米高，脚趾的纹路清晰可见，中间是一道石阶，笔直通向狮子张开的大嘴。你从嘴里走进去，沿着喉咙往上攀，最后从顶部钻出来。你不是从狮子旁边经过，你是从它身体里面穿过去。`
          }
        }
      },
      {
        M: {
          text: {
            S: `效果正是迦叶波想要的。每一个使节、每一个将军、每一个来求见的人，都得走进一头猛兽的嘴里。中国人说"虎口余生"——从老虎嘴里逃出来算捡了一条命。但在锡吉里耶，没有"余生"这回事，因为你不是逃出去的，你是自己走进去的。走进狮口不是劫后余生，而是入场的代价。你走进去的时候是一个普通人，从顶上出来的时候，已经进入了一个神的领地。而政治含义更简单粗暴——你是猎物，国王是猛兽。`
          }
        }
      },
      {
        M: {
          text: {
            S: `狮子门只是开胃菜。整座巨崖是一台披着天堂外衣的战争机器。据说护城河里养着鳄鱼；精心设计的水花园里，漂亮的水池其实是蓄水池，开阔的草坪其实是射杀区。上山的路凿在悬崖上，窄得只能两个人并排走。凿进岩石的水箱能让宫殿在围城中撑很久。每一处细节都在同时侍奉两个主人：美与生存。`
          }
        }
      },
      {
        M: {
          text: {
            S: `1898年，英国考古学家贝尔在狮子平台上清理了几个世纪堆积的碎石，挖出了两只巨大的狮爪——砖砌的爪子立在石基上，精细到能看出收拢的爪尖。狮爪上方的岩壁上满是锚孔、褪色的灰泥、一个庞然大物消失后留下的痕迹。狮子的身体早已不在——木头腐朽了，灰泥剥落了，砖墙被一千五百年的热带风暴打得只剩残影。`
          }
        }
      },
      {
        M: {
          text: {
            S: `今天，一架钢铁楼梯钉在悬崖上，穿过狮子身体曾经矗立的地方。游客们抓着扶手，顶着风，俯瞰脚下遥远的丛林。但那两只狮爪还在——巨大的、耐心的、属于猫科动物的两只前爪，安安静静地趴在平台上，像这头狮子只是躺下来打了个盹，剩下的身体还藏在岩石里面。一千五百年过去了，你想到达山顶，依然必须从它们中间走过。迦叶波造了一扇门，比他的王朝活得更久。`
          }
        }
      }
    ]
  },
  moralOrLesson: {
    S: `锡吉里耶的建造者们懂得一个现代建筑师大多已经遗忘的道理——建筑不只是结构，它是一种体验，一个用石头、空间、恐惧和惊叹讲述的故事。狮子门不是一扇门，它是一场蜕变：你以凡人之身走入，穿过猛兽之躯攀升，最终踏入一位神王的领地。`
  },
  icon: { S: "\u{1F981}" },
  tier: { S: "A" },
  source: {
    S: "Bell, H.C.P. Report on the Sigiriya Excavations, Archaeological Survey of Ceylon Annual Reports 1896-1904; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; Mahavamsa, chapter 6 (Vijaya legend); Culavamsa, chapters 38-39; UNESCO World Heritage Nomination File 202; Paranavitana, Senarath. History of Ceylon, vol. 1, 1959"
  },
  characters: {
    L: [
      { S: "迦叶波一世（建造者）" },
      { S: "维阇耶王子（僧伽罗人的传说始祖，狮子的后代）" },
      { S: "H.C.P. 贝尔（1898年发掘狮爪的英国考古学家）" },
      { S: "那些无名的工程师和劳工" }
    ]
  },
  era: { S: "477-495 CE (construction); 1898 (Bell's excavation)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: "1772124312" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "80.7603" },
      lat: { N: "7.957" }
    }
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "builders_wonders" }
};

async function push() {
  try {
    const cmd = new PutItemCommand({ TableName: "Story", Item: item });
    const result = await client.send(cmd);
    console.log("SUCCESS: zh#lion-gate-sky-fortress pushed to DynamoDB");
    console.log("HTTP status:", result.$metadata.httpStatusCode);
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
