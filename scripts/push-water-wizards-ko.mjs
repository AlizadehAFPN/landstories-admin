import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "petra" },
  langStoryId: { S: "ko#nabataean-water-wizards" },
  lang: { S: "ko" },
  storyId: { S: "nabataean-water-wizards" },
  title: { S: "사막에 물을 숨긴 사람들" },
  subtitle: { S: "비 한 방울 없는 곳에 분수와 정원을 만든 고대 나바테아인의 비밀" },
  excerpt: { S: "페트라에는 사하라보다 비가 적게 온다. 그런데 2천 년 전, 이 사막 한가운데 3만 명이 분수와 수영장까지 갖추고 살았다. 나바테아인들은 물을 찾은 게 아니다 — 만들어냈다." },
  icon: { S: "💧" },
  image: { S: "" },
  thumbnail: { S: "" },
  tier: { S: "S" },
  isFree: { BOOL: true },
  hasAudio: { BOOL: false },
  disabled: { BOOL: false },
  storyCategory: { S: "builders_wonders" },
  readingTimeMinutes: { N: "4" },
  era: { S: "c. 300 BC – AD 363 (Nabataean water system); 312 BC (Antigonus invasion); 1963 (flash flood disaster)" },
  coordinates: {
    M: {
      lat: { N: "30.3285" },
      lng: { N: "35.4444" },
    },
  },
  characters: {
    L: [
      { S: "나바테아 기술자들 (이름 없는 천재들)" },
      { S: "아레타스 4세 (나바테아 왕)" },
      { S: "디오도로스 시쿨루스 (그리스 역사가)" },
      { S: "안티고노스 1세 (침공에 실패한 장군)" },
      { S: "리앤 베달 (고고학자)" },
    ],
  },
  source: {
    S: "Diodorus Siculus, Bibliotheca Historica XIX.94-95 (c. 60-30 BC); Ortloff, Charles R. 'The Water Supply and Distribution System of the Nabataean City of Petra,' Cambridge Archaeological Journal 15:1, 2005; Bedal, Leigh-Ann. 'A Pool Complex in Petra's City Center,' BASOR 324, 2001; Jungmann, Niklas. 'Rediscovering the Ain Braq Aqueduct,' Levant, 2025; National Geographic, 'Petra's Ancient Technology and Climate Change,' 2024",
  },
  moralOrLesson: {
    S: "진짜 강한 나라는 군대가 아니라 눈에 보이지 않는 것을 다루는 기술 위에 세워진다. 적이 두려워하는 건 보이는 보물이 아니라, 아무리 찾아도 찾을 수 없는 비밀이다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "페트라에는 비가 거의 안 온다. 사하라 사막 일부보다도 적게. 1년에 고작 150밀리미터. 그런데 2천 년 전, 이 땅에 3만 명이 살았다. 분수가 있었고, 정원이 있었고, 수영장이 있었다. 강가도 아니고, 호수 옆도 아니다. 지구에서 가장 메마른 사막 한복판이었다. 나바테아인들은 물을 찾은 게 아니라, 만들어냈다. 현대 과학자들이 분석해보니 서양이 유체역학이라는 이름조차 붙이기 수백 년 전에 이미 그 원리를 꿰뚫고 있었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그들의 진짜 무기는 수도관이 아니었다. 비밀이었다. 기원전 312년, 그리스 군대가 이들의 부를 노리고 쳐들어왔다. 나바테아인들은 쫓아가서 박살 냈다. 더 큰 병력이 오자 사막으로 사라져버렸다. 그리스 병사들은 목이 말라 항복을 빌었다. 비밀은 간단했다. 광야 곳곳에 물탱크가 묻혀 있었는데, 위장이 완벽해서 그들만 찾을 수 있었다. 사막이 약점이 아니라 요새였던 거다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "도시의 생명줄은 7킬로미터 떨어진 아인 무사, '모세의 샘'이었다. 그 물을 끌어오려면 시크라 불리는 1킬로미터짜리 좁은 협곡을 통과해야 했다. 한쪽 절벽에는 돌 수로, 반대쪽에는 정밀하게 이어 붙인 토기 파이프를 놓았다. 협곡 입구에는 댐과 터널로 홍수를 도시 바깥으로 돌렸다. 1963년, 바로 그 홍수가 관광객 22명의 목숨을 앗아갔다. 나바테아인들이 2천 년 전에 이미 해결한 문제였다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "생존만으로는 부족했다. 과시하고 싶었다. 1998년, 고고학자 리앤 베달이 옛 지도에 '아래쪽 시장'이라 표기된 곳을 팠다. 시장이 아니었다. 길이 43미터짜리 인공 호수에 섬 하나를 띄운 궁전 정원이었다. 섬에 가려면 헤엄쳐야 했다. 사막 한가운데 호수, 그 위에 떠 있는 섬. 이걸 본 로마 관리라면 딱 하나만 깨달았을 것이다 — 이 사람들은 건드리면 안 된다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "도시 한가운데에는 님파에움이라는 공공 분수대가 3만 시민에게 물을 공급했다. 2025년, 훔볼트 대학교의 니클라스 융만이 산속에서 놀라운 걸 발견했다. 길이 116미터짜리 납 파이프라인. 물을 높은 곳으로 밀어 올린 뒤 반대편으로 흘려보내는 역사이펀이었다. 학계에서는 이 기술이 로마 건축물 안에서만 쓰인 줄 알았다. 나바테아인들은 2천 년 전에 이미 야외에서 돌리고 있었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "서기 106년, 로마가 페트라를 점령했다. 그리고 거의 전례 없는 일을 했다. 나바테아인의 수도 시스템을 그대로 뒀다. 로마는 점령지마다 자기네 공법을 덮어씌우기로 유명했다. 하지만 페트라에서는 있는 걸 보고 인정한 거다 — 이보다 잘할 수 없다고. 물이 깊을수록 소리가 없다더니, 로마가 처음으로 입을 다문 곳이 바로 페트라였다. 그 뒤로도 2백 년 동안 나바테아인의 파이프가 도시를 먹여 살렸다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "서기 363년 5월 19일, 대지진이 모든 걸 무너뜨렸다. 파이프가 터지고, 수로가 주저앉았다. 5백 년의 공학이 몇 분 만에 끝났다. 다시 지을 수도 있었다. 하지만 세상이 바뀌어 있었다. 교역로가 바다로 옮겨갔고, 페트라를 먹여 살리던 무역이 끊겼다. 돈도 사람도 없으니 아무도 수리하지 않았다. 물이 사라지자 페트라도 사라졌다. 연못은 모래에 묻히고, 파이프는 부서지고, 사막이 조용히 모든 걸 집어삼켰다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "지금도 시크 협곡에는 홍수가 쏟아진다. 2022년에는 하루 만에 6개월치 비가 내려 관광객 1,700명이 대피했다. 고대 댐은 폐허가 됐지만 여전히 그 자리에 서 있다. 물은 그냥 마시는 게 아니라 권력이고, 비밀이고, 왕국과 폐허를 가르는 경계선이라는 걸 알았던 사람들이 남긴 마지막 증거로.",
          },
        },
      },
    ],
  },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
};

async function pushStory() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });

    const result = await client.send(command);
    console.log("✅ Korean story pushed successfully!");
    console.log("   siteId: petra");
    console.log("   langStoryId: ko#nabataean-water-wizards");
    console.log("   HTTP Status:", result.$metadata.httpStatusCode);

    // Verify by reading it back
    const { GetItemCommand } = await import("@aws-sdk/client-dynamodb");
    const verify = await client.send(
      new GetItemCommand({
        TableName: "Story",
        Key: {
          siteId: { S: "petra" },
          langStoryId: { S: "ko#nabataean-water-wizards" },
        },
        ProjectionExpression: "title, lang, langStoryId, siteId",
      })
    );
    console.log("\n✅ Verification read-back:");
    console.log("   title:", verify.Item.title.S);
    console.log("   lang:", verify.Item.lang.S);
    console.log("   langStoryId:", verify.Item.langStoryId.S);
    console.log("   siteId:", verify.Item.siteId.S);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("❌ Record already exists! Use update instead of put.");
    } else {
      console.error("❌ Error pushing story:", err);
    }
  }
}

pushStory();
