import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "great-pyramids-giza" },
  langStoryId: { S: "ko#secret-chambers-void" },
  lang: { S: "ko" },
  storyId: { S: "secret-chambers-void" },
  title: { S: "봉인된 방" },
  subtitle: { S: "4,500년째 봉인된 30미터의 빈 공간" },
  excerpt: {
    S: "2017년, 물리학자들이 대피라미드에 입자 검출기를 들이댔다. 610만 톤의 석회암 속에서 4,500년째 밀봉된 30미터 길이의 빈 공간이 발견됐다. 그 안에 뭐가 있는지는, 아직 아무도 모른다.",
  },
  moralOrLesson: {
    S: "지구에서 가장 많이 연구된 건물도 비밀을 품고 있었다. 우리가 아는 것은 결코 전부가 아니다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "2017년, 물리학자들이 기자의 대피라미드에 입자 검출기를 들이댔다. 610만 톤짜리 석회암 속, 피라미드 내부의 '대회랑'이라 불리는 긴 경사 통로 바로 위에서 뭔가가 잡혔다. 길이 약 30미터의 텅 빈 공간. 어떤 통로와도 이어지지 않고, 완전히 막힌 채 숨어 있었다. 쿠푸 파라오의 인부들이 마지막 돌을 얹은 뒤 4,500년 동안, 아무도 몰랐던 방이었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "찾아낸 방법부터 SF 영화 같다. 우주에서 끊임없이 쏟아지는 '뮤온'이라는 아주 작은 입자가 있다. 이 입자는 단단한 돌에 부딪히면 막히고, 빈 공간을 만나면 그냥 통과한다. 과학자들은 이 차이를 이용해 피라미드 내부를 일종의 엑스레이로 찍었다. 그렇게 나타난 게, 여객기 한 대 길이만 한 빈 공간이었다. 지구에서 가장 많이 연구된 건물 한가운데에서.",
          },
        },
      },
      {
        M: {
          text: {
            S: "이게 왜 난리가 났냐면, 대피라미드 안에서 새로운 공간이 발견된 건 천 년이 넘도록 처음이었기 때문이다. 마지막으로 내부를 뚫고 들어간 사람은 서기 820년경 바그다드를 다스리던 칼리프 알마문이었다. 그의 부하들이 돌벽을 깨부수고 들어가 위쪽으로 올라가는 통로와 왕의 방을 발견했다. 그 뒤 1,200년 동안 학자들은 피라미드 내부가 전부 밝혀졌다고 확신했다. 뮤온 스캔이 그 확신을 산산조각 냈다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "논쟁이 벌어졌다. 한쪽은 \"건축하다 생긴 빈틈일 뿐\"이라고 했다. 반대쪽은 거세게 반박했다. 대회랑 바로 위 30미터짜리 공간이 우연히 생길 리 없다는 거다. 아직 발견 안 된 무덤? 신성한 문서를 넣어둔 비밀 금고? 어쩌면 쿠푸 파라오의 진짜 안식처? 한 가지 짚고 넘어갈 게 있다 — 쿠푸의 미라는 지금까지 단 한 번도 발견된 적이 없다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "돌다리도 두들겨 보고 건너라고 했다. 과학자들은 인류가 쌓아 올린 가장 거대한 돌덩이를 두들겨봤다. 그런데 안이 비었다는 건 알겠는데, 들여다볼 수가 없다. 초소형 로봇을 미세한 구멍으로 넣어보자는 제안이 나왔지만, 이집트 정부가 거부했다. 지구에서 가장 중요한 유적에 구멍을 뚫는 건, 아무리 과학이라 해도 쉽게 허락할 일이 아니다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "한번 생각해 보자. 인공위성이 지표면 구석구석을 찍고, 고대 DNA를 해독하고, 바닷속 지형까지 지도로 만드는 시대다. 그런데 매년 수백만 명이 셀카를 찍으러 오는 바로 그곳에, 4,500년째 비밀을 품은 밀봉된 공간이 있다. 살아 있는 사람 중 그 안에 뭐가 있는지 아는 사람은 아무도 없다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "대피라미드는 도굴꾼도, 폭약을 들고 온 탐험가도, 고대 이집트 이후 흥하고 망한 모든 나라도 버텨냈다. 그 봉인된 공간 속에 뭐가 있든 — 그냥 빈 공기든, 잊힌 왕이든, 아직 누구도 상상 못 한 무언가든 — 4,500년을 기다렸다. 조금 더 기다릴 수 있다.",
          },
        },
      },
    ],
  },
  icon: { S: "🔮" },
  tier: { S: "A" },
  source: {
    S: 'Morishima, K. et al. "Discovery of a big void in Khufu\'s Pyramid," Nature 552, 386-390 (2017)',
  },
  characters: {
    L: [{ S: "ScanPyramids research team" }, { S: "Pharaoh Khufu" }],
  },
  era: { S: "Old Kingdom (discovered 2017)" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  coordinates: {
    M: {
      lng: { N: "31.1342" },
      lat: { N: "29.9792" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "riddles_past" },
  updatedAt: { N: "1773512656" },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("SUCCESS — Korean story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("siteId: great-pyramids-giza");
    console.log("langStoryId: ko#secret-chambers-void");
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
