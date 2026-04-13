import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: { S: "ephesus" },
  langStoryId: { S: "zh#virgin-mary-house" },
  lang: { S: "zh" },
  storyId: { S: "virgin-mary-house" },
  title: { S: `病床上的预言` },
  subtitle: { S: `一个从未离开过德国的修女，如何精确描述了两千公里外的一座房子` },
  excerpt: { S: `她连床都下不了。十九世纪初，德国小城迪尔门有一位修女，名叫安妮\u00B7凯瑟琳\u00B7艾默里希，生命最后的岁月全在病床上度过。然而就是这张病床上，她说出了一件让所有人都无法解释的事。` },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: `她连床都下不了。十九世纪初，德国小城迪尔门有一位修女，名叫安妮\u00B7凯瑟琳\u00B7艾默里希。生命最后那几年，她几乎无法站立，每天只能躺在窄窄的床上。但就在这张床上，她说出了一件至今没人能解释的事\u2014\u2014她描述了一座自己从未见过的房子，在一个从未去过的国家，六十年后，有人按照她的描述去找，竟然真的找到了。`
          },
        },
      },
      {
        M: {
          text: {
            S: `艾默里希从小就有异象。她会突然看见圣经中的场景，仿佛自己就站在现场。她的手脚还出现了与耶稣受难相同位置的伤口\u2014\u2014也就是所谓的\u201C圣痕\u201D，当时的医生反复检查，给不出任何医学解释。1820年到1824年间，德国诗人克莱门斯\u00B7布伦塔诺几乎每天守在她床边，把她描述的每一个画面都记录下来，后来整理成书出版。`
          },
        },
      },
      {
        M: {
          text: {
            S: `所有异象中，有一个格外特别。艾默里希极其详细地描述了圣母玛利亚最后居住的地方\u2014\u2014一座小石屋，坐落在古城以弗所上方的山上，也就是今天土耳其的西海岸。基督教传统认为，耶稣被钉十字架后，使徒约翰带着玛利亚来到这里避难。艾默里希说出了房间的布局、门边的泉水、山的形状，甚至连从窗口望出去能看到海的细节都没有遗漏。`
          },
        },
      },
      {
        M: {
          text: {
            S: `1881年，法国神父朱利安\u00B7古耶读到了这些记录，决定亲自去一趟。他带着艾默里希的文字当作唯一的地图，来到以弗所，登上科雷索斯山\u2014\u2014当地人叫它\u201C夜莺山\u201D。在她描述的那个位置，他发现了一座石屋的废墟。泉水在那里。房间格局吻合。她说的每一个细节，全都对上了。`
          },
        },
      },
      {
        M: {
          text: {
            S: `十年之后，一支天主教传教士团队带着考古学家重返旧地，进行正式发掘。结果让所有人震惊：地基可以追溯到公元一世纪\u2014\u2014恰好就是玛利亚可能在这里生活的年代。这不是中世纪层层叠叠堆砌出来的传说，这些石头是真的，而且年代足够久远。`
          },
        },
      },
      {
        M: {
          text: {
            S: `梵蒂冈正式认可了这个发现。1896年，教皇利奥十三世宣布此地为朝圣地。此后，先后有三位教皇亲自前往：1967年的保禄六世、1979年的若望保禄二世、2006年的本笃十六世。但来这里的不只是基督徒。在伊斯兰教中，玛利亚同样受到尊崇\u2014\u2014她被称为\u201C麦尔彦\u201D，《古兰经》中有一整章以她的名字命名\u2014\u2014所以这座小屋吸引着各种信仰的人。`
          },
        },
      },
      {
        M: {
          text: {
            S: `中国有句老话：事不过三。但这个故事里，\u201C巧合\u201D远远不止三次\u2014\u2014房间的布局、泉水的位置、山的形状、海的方向、石头的年代，一个瘫在床上的人，怎么可能全说对？艾默里希一辈子没离开过德国，没见过以弗所的地图，身边没有任何去过那里的人。无论你怎么解释在迪尔门那间小屋里发生的事，山上的那座房子是真实存在的。今天，你可以推开它的门，走进去。`
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: `有些事没有答案，只有证据。那座房子还在山上，而谜底至今没有揭开。`,
  },
  source: {
    S: "Anne Catherine Emmerich visions, compiled by Clemens Brentano; Lazarist expedition records; Papal recognitions",
  },
  characters: {
    L: [
      { S: "Virgin Mary" },
      { S: "John the Apostle" },
      { S: "Anne Catherine Emmerich" },
      { S: "Abb\u00E9 Julien Gouyet" },
    ],
  },
  era: { S: "1st century AD (house) / 1881 (discovery)" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  thumbnail: { S: "" },
  icon: { S: "\uD83C\uDFE0" },
  tier: { S: "A" },
  coordinates: {
    M: {
      lng: { N: "27.3333" },
      lat: { N: "37.9147" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  storyCategory: { S: "prophets_pilgrims" },
  updatedAt: { N: String(now) },
};

async function main() {
  try {
    await client.send(
      new PutItemCommand({
        TableName: "Story",
        Item: item,
      })
    );
    console.log("zh#virgin-mary-house pushed successfully");
  } catch (err) {
    console.error("Failed to push zh version:", err);
    process.exit(1);
  }
}

main();
