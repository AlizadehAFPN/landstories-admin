import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "venice-st-marks-doges" },
  langStoryId: { S: "ko#wedding-of-the-sea" },
  lang: { S: "ko" },
  storyId: { S: "wedding-of-the-sea" },
  title: { S: "바다와 결혼한 나라" },
  subtitle: { S: "800년간 바다에 금반지를 던진 공화국, 베네치아" },
  excerpt: {
    S: "세상에 바다랑 결혼한 나라가 있어요. 비유가 아니에요. 진짜로요. 베네치아의 지도자는 매년 금반지를 빼서 바다에 던졌어요. 800년 동안.",
  },
  moralOrLesson: {
    S: "주권은 한 번의 선언이 아니에요. 한 나라가 해마다 새로 맺는 약속, 끝까지 버티겠다는 의지 그 자체예요.",
  },
  icon: { S: "💍" },
  tier: { S: "A" },
  source: {
    S: "Da Canal, Martin. Les Estoires de Venise (13th c.); Muir, Edward. Civic Ritual in Renaissance Venice, 1981; Lane, Frederic. Venice: A Maritime Republic, 1973",
  },
  characters: {
    L: [
      { S: "도제 피에트로 2세 오르세올로" },
      { S: "교황 알렉산데르 3세" },
      { S: "신성로마제국 황제 프리드리히 바르바로사" },
      { S: "나폴레옹 보나파르트" },
      { S: "베네치아의 도제들" },
    ],
  },
  era: { S: "중세~근대 (1000년~현재)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: `${Math.floor(Date.now() / 1000)}` },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "12.3388" },
      lat: { N: "45.4343" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "세상에 바다랑 결혼한 나라가 있어요. 비유가 아니에요. 진짜로요. 거의 800년 동안, 매년 한 번씩, 베네치아 공화국의 최고 지도자 '도제'는 거대한 황금 배를 타고 아드리아해 한가운데로 나갔어요. 거기서 손가락의 금반지를 빼 파도 속에 던지며 선언했죠. \"바다여, 영원한 지배의 증표로 그대와 혼인한다.\" 한 번도 빠짐없이요.",
          },
        },
      },
      {
        M: {
          text: {
            S: "시작은 서기 1000년쯤이었어요. 당시 베네치아는 갯벌 위에 말뚝을 박아 세운 작은 도시였는데, 지금의 크로아티아 쪽 해안에서 온 해적들이 무역로를 완전히 막아버렸어요. 참다못한 도제 피에트로 오르세올로 2세가 함대를 이끌고 아드리아해를 건너 해적을 박살 냈어요. 돌아온 날이 마침 예수 승천 축일이었는데, 그는 바다 한가운데서 아드리아해가 베네치아의 것임을 선포했어요. 그 뒤로 모든 도제가 같은 날, 같은 맹세를 되풀이했어요.",
          },
        },
      },
      {
        M: {
          text: {
            S: "1177년, 의식은 한 단계 올라갔어요. 교황 알렉산데르 3세가 당시 유럽 최강자였던 신성로마제국 황제에게 쫓기고 있었는데, 베네치아가 교황을 숨겨주고 둘 사이의 화해까지 이끌어낸 거예요. 감격한 교황은 도제에게 금반지를 건네며 선언했어요. 이제부터 아드리아해와의 결혼은 하느님의 축복이라고. 이름도 생겼죠. '스포살리치오 델 마레', 바다와의 결혼식. 과시가 아니라, 신성한 의식이 된 거예요.",
          },
        },
      },
      {
        M: {
          text: {
            S: "이 의식의 하이라이트는 '부친토로'였어요. 도제 전용 의식 선박인데, 마지막으로 만들어진 건 1729년이에요. 길이 35미터, 온통 금박에 붉은 비단을 두르고, 노를 젓는 사람만 168명. 외국 사절들은 본국에 이렇게 보고했어요. 유럽 어디서도 — 어떤 대관식도, 베르사유의 연회도 — 이 황금 배가 수백 척을 거느리고 물 위를 미끄러지는 광경은 못 따라간다고. 뱃머리에 선 도제는 결혼식장으로 걸어가는 신랑 그 자체였어요.",
          },
        },
      },
      {
        M: {
          text: {
            S: "마지막 의식은 1797년 승천 축일이었어요. 열이틀 뒤, 나폴레옹의 군대가 밀려들어왔고 공화국은 스스로 해산을 결의했어요. 1,100년간 이어진 독립의 끝이었죠. 나폴레옹은 뭘 해야 하는지 정확히 알고 있었어요. 부친토로의 금박을 벗겨 녹이고, 남은 뼈대는 불태웠어요. 역사상 가장 화려했던 배의 잿더미가, 한때 그 배가 승리의 항해를 하던 바로 그 바다에 뿌려졌어요. 나폴레옹은 베네치아를 정복한 게 아니에요. 웨딩드레스를 태운 거예요.",
          },
        },
      },
      {
        M: {
          text: {
            S: "세 번 찍어 안 넘어가는 나무 없다지만, 베네치아는 800번을 찍었어요. 도끼가 아니라 금반지로. 정복이 아니라 사랑이었으니까요. 의식은 1900년대에 되살아나서 지금도 매년 열려요. 도제 대신 시장이 반지를 던지지만요. 지금 이 순간에도, 베네치아 앞바다 바닥에는 800년치 금반지가 진흙 속에 잠들어 있어요. 한 나라가 바다와의 결혼을 지키려고 해마다 바친 값이에요. 그리고 천 년 동안, 베네치아는 약속을 지켰어요.",
          },
        },
      },
    ],
  },
};

async function push() {
  try {
    await client.send(
      new PutItemCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log("✅ Successfully pushed ko#wedding-of-the-sea");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log("⚠️  Record already exists. Overwriting...");
      await client.send(
        new PutItemCommand({
          TableName: "Story",
          Item: item,
        })
      );
      console.log("✅ Successfully overwrote ko#wedding-of-the-sea");
    } else {
      console.error("❌ Failed:", err);
      process.exit(1);
    }
  }
}

push();
