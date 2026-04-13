import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "knossos" },
  langStoryId: { S: "ko#theseus-ariadne" },
  lang: { S: "ko" },
  storyId: { S: "theseus-ariadne" },
  title: { S: "미궁의 실" },
  subtitle: { S: "괴물을 죽인 영웅, 사랑을 버린 남자" },
  excerpt: { S: "9년마다 아테네는 피의 빚을 갚아야 했다. 소년 일곱, 소녀 일곱. 크레타섬의 미궁 속 괴물에게 바치는 제물이었다." },
  moralOrLesson: { S: "영웅도 결국 사람이다. 괴물은 죽였지만, 은인은 버렸고, 아버지는 부주의로 잃었다. 이기는 것과 잃는 것은 늘 함께 온다." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "9년마다 아테네는 피의 빚을 갚아야 했다. 소년 일곱, 소녀 일곱. 크레타섬 크노소스 궁전 지하의 미궁으로 보내는 제물이었다. 그 안에는 미노타우로스가 살았다. 반은 사람, 반은 황소인 괴물. 한 번 들어가면 아무도 나오지 못했다. 전쟁에서 아테네를 꺾은 미노스 왕이 요구한 대가였다. 세 번째 제물을 보낼 때가 되자, 왕자 테세우스가 입을 열었다. \"내가 가겠다. 그리고 그놈을 죽이겠다.\""
          },
        },
      },
      {
        M: {
          text: {
            S: "아버지 아이게우스 왕은 미친 듯이 말렸다. 하지만 테세우스는 꿈쩍도 안 했다. 결국 아이게우스는 딱 하나만 약속받았다. 배는 검은 돛을 달고 떠난다 — 죽음의 색이다. 살아서 돌아오면 흰 돛으로 바꿔라. 그러면 항구에 닿기도 전에 절벽 위에서 알아볼 수 있으니까. 테세우스는 맹세했다. 그리고 크레타를 향해 떠났다."
          },
        },
      },
      {
        M: {
          text: {
            S: "크레타에 도착한 아테네의 젊은이들은 미노스 왕 앞에 끌려 나왔다. 어차피 죽을 목숨, 아무도 관심을 주지 않았다. 그런데 군중 속에서 눈을 떼지 못하는 사람이 있었다. 아리아드네, 미노스 왕의 딸이었다. 쇠사슬에 묶여 있으면서도 꺾이지 않는 눈빛. 그녀는 그 자리에서 사랑에 빠졌다. 그날 밤, 아리아드네는 감옥으로 몰래 내려갔다. 손에는 날카로운 칼 한 자루, 그리고 실 뭉치 하나."
          },
        },
      },
      {
        M: {
          text: {
            S: "계획은 놀라울 만큼 단순했다. \"미궁 입구에 실을 묶어. 들어가면서 풀어. 괴물을 죽이면, 실을 따라 나와.\" 그동안 아무도 생각 못 한 건지, 아니면 죄수를 도울 만큼 사랑한 사람이 없었던 건지. 테세우스는 약속했다. 아테네로 데려가 왕비로 삼겠다고. 왕의 딸이 낯선 죄수에게 모든 걸 걸었다. 돌아온 건 말 한마디뿐이었다."
          },
        },
      },
      {
        M: {
          text: {
            S: "새벽, 테세우스는 미궁 입구에 실을 묶고 어둠 속으로 걸어 들어갔다. 막다른 길, 갈라지는 통로, 제자리로 돌아오는 복도 — 사람의 정신을 무너뜨리는 구조였다. 실만 믿고 계속 나아갔다. 가장 깊은 곳에서 괴물과 마주쳤다. 미노타우로스가 뿔을 앞세우고 달려들었다. 테세우스는 이곳에서 죽어간 모든 아이들을 생각하며 싸웠다. 칼이 괴물의 심장을 꿰뚫었다. 그리고 — 정적."
          },
        },
      },
      {
        M: {
          text: {
            S: "실을 따라 어둠을 빠져나왔다. 입구에서 아리아드네가 기다리고 있었다. 다른 포로들을 풀어주고, 항구로 달려가 배에 올랐다. 아리아드네는 새 삶이 시작된다고 믿었다. 틀렸다. 가는 길에 들른 낙소스라는 섬에서, 테세우스는 그녀를 두고 떠나버렸다. 잊은 건지, 싫증이 난 건지, 신의 명령이었는지 — 아무도 모른다. 아리아드네는 해변에서 눈을 떴다. 수평선 끝에서 배 한 척이 점처럼 사라지고 있었다."
          },
        },
      },
      {
        M: {
          text: {
            S: "세 번 찍어 안 넘어가는 나무 없다고 했다. 하지만 가끔은, 쓰러진 자리에서 전혀 다른 꽃이 핀다. 디오니소스가 그 해변에서 아리아드네를 발견했다. 포도주와 축제의 신은 그녀와 사랑에 빠졌고, 불멸의 아내로 삼았다. 그녀의 왕관을 하늘로 던져 별자리로 만들었다 — 여름밤에 올려다보면 보이는 '북쪽왕관자리'가 바로 그것이다. 영웅에게 버림받은 여인이 신의 아내가 됐다."
          },
        },
      },
      {
        M: {
          text: {
            S: "한편 테세우스에게도 대가가 돌아왔다. 승리에 들뜬 나머지 — 혹은 아리아드네에 대한 죄책감 때문인지 — 검은 돛을 흰 돛으로 바꾸는 걸 깜빡했다. 아버지 아이게우스는 수니온 곶 절벽 위에서 바다만 바라보고 있었다. 흰색은 보이지 않았다. 검은 돛만 다가왔다. 아들이 죽었다고 믿은 왕은 그 자리에서 바다로 뛰어내렸다. 그 바다가 지금 우리가 '에게해'라 부르는 바다다. 괴물을 죽인 영웅은 고향에 돌아와, 자기 손으로 아버지를 죽인 셈이 됐다."
          },
        },
      },
    ],
  },
  icon: { S: "🧵" },
  tier: { S: "A" },
  source: { S: "Plutarch's Life of Theseus, Apollodorus's Bibliotheca, Catullus 64, Ovid's Heroides" },
  characters: {
    L: [
      { S: "Theseus" },
      { S: "Ariadne" },
      { S: "The Minotaur" },
      { S: "King Minos" },
      { S: "King Aegeus" },
      { S: "Dionysus" },
    ],
  },
  era: { S: "Mythological Era" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: "1773661869" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "25.1631" },
      lat: { N: "35.2981" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "love_heartbreak" },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });
    const result = await client.send(command);
    console.log("✅ Korean story pushed successfully!");
    console.log("   siteId:", item.siteId.S);
    console.log("   langStoryId:", item.langStoryId.S);
    console.log("   title:", item.title.S);
    console.log("   HTTP status:", result.$metadata.httpStatusCode);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log("⚠️  Record already exists. Overwriting...");
      const command = new PutItemCommand({
        TableName: "Story",
        Item: item,
      });
      const result = await client.send(command);
      console.log("✅ Korean story overwritten successfully!");
      console.log("   HTTP status:", result.$metadata.httpStatusCode);
    } else {
      console.error("❌ Failed to push:", err.message);
      process.exit(1);
    }
  }
}

push();
