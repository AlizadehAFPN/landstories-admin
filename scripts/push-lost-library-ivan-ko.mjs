import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "moscow-kremlin" },
  langStoryId: { S: "ko#lost-library-ivan" },
  lang: { S: "ko" },
  storyId: { S: "lost-library-ivan" },
  title: { S: "이반 뇌제의 사라진 도서관" },
  subtitle: { S: "인류가 잃어버린 가장 위대한 보물" },
  excerpt: {
    S: "1472년, 비잔틴 제국 마지막 황제의 조카딸이 러시아 대공에게 시집오면서 가져온 건 금도 땅도 아니었다. 수백 권의 고대 필사본, 세상이 영원히 사라졌다고 믿었던 바로 그 책들이었다.",
  },
  moralOrLesson: {
    S: "가장 위대한 보물은, 그것을 지켜야 할 권력이 오히려 감춘다",
  },
  icon: { S: "📚" },
  tier: { S: "A" },
  era: { S: "1472 - present" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "riddles_past" },
  updatedAt: { N: "1772125110" },
  coordinates: {
    M: {
      lng: { N: "37.6175" },
      lat: { N: "55.752" },
    },
  },
  source: {
    S: "Johann Wetterman's account (c. 1570), Professor Stelletsky's research (1894-1930s), Byzantine marriage records",
  },
  characters: {
    L: [
      { S: "Ivan III" },
      { S: "Sophia Palaiologina" },
      { S: "Ivan the Terrible" },
      { S: "Aristotele Fioravanti" },
      { S: "Johann Wetterman" },
      { S: "Professor Stelletsky" },
      { S: "Stalin" },
    ],
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1472년, 비잔틴 제국 마지막 황제의 조카딸 소피아 팔라이올로기나가 러시아 대공 이반 3세에게 시집왔다. 그런데 그녀가 가져온 진짜 지참금은 금도, 땅도 아니었다. 수백 권의 고대 그리스어, 라틴어 필사본이었다. 호메로스, 아리스토텔레스, 키케로 — 세상 어디에서도 이미 사라졌다고 믿었던 책들이, 그녀의 짐 속에 있었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "이반 3세는 이 책들을 크렘린 지하 깊숙한 곳에 가뒀다. 당시 모스크바는 거의 전부 나무로 지어진 도시라, 불이 나면 온 동네가 타버리기 일쑤였다. 이탈리아 출신 건축가 아리스토텔레 피오라반티가 설계했다는 그 지하 금고 안에, 수백 년치 인류의 지식이 잠들었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "이 책들은 이반 3세의 손자, 이반 4세 — 세상이 '이반 뇌제'라 부르는 그 잔혹한 군주 — 시절에 더 불어났다. 역사상 손꼽히는 폭군이었지만, 이 사람은 책에 미쳐 있었다. 연금술서, 유대 신비주의 문헌까지 수백 권을 더했다. 1570년경, 독일인 목사 요한 베테르만이 이 도서관을 직접 봤다고 증언했다. 그의 표현: \"이 세상 어떤 보물로도 값을 매길 수 없는 두루마리들.\"",
          },
        },
      },
      {
        M: {
          text: {
            S: "그리고 1584년, 이반 뇌제가 죽었다. 도서관은 감쪽같이 사라졌다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "말년에 편집증이 극에 달했던 이반이 금고를 봉인하고, 그 위치를 무덤까지 가져갔을 수 있다. 1598년부터 15년간 이어진 러시아 내전 속에서 숨겨졌고, 아는 사람은 전부 죽었을 수도 있다. 끝없는 화재가 삼켜버렸을 수도 있다. 하지만 목격자 증언과 비잔틴 기록은 하나같이 말한다 — 이 도서관은 분명 존재했다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그때부터 사람들은 이걸 찾아 헤맸다. 1724년, 표트르 대제가 크렘린 밑으로 탐사대를 보냈다. 빈손으로 돌아왔다. 1894년, 이그나티우스 스텔레츠키 교수는 평생을 바쳐 지하 터널을 뒤졌지만, 소비에트 정부가 그를 막았다. 1930년대, 스탈린이 극비리에 수색을 명령했다. 부하들이 더 깊은 곳으로 내려가는 터널을 찾아냈다. 열 번 찍어 안 넘어가는 나무 없다지만, 이 나무는 달랐다 — 스탈린은 그 터널을 콘크리트로 메워버렸다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "한번 생각해 보자. 소련 최고 권력자가, 역사상 최대의 잃어버린 도서관으로 이어질 수 있는 길을 찾았다. 그런데 더 들어가 보는 대신, 입구를 막아버렸다. 그 밑에 대체 뭐가 있었길래, 차라리 모르는 게 낫다고 판단한 걸까?",
          },
        },
      },
      {
        M: {
          text: {
            S: "오늘까지도 크렘린 일부 구역의 지하 발굴은 금지다. 만약 그 도서관이 아직 거기 있다면, 지구에서 가장 삼엄한 경비 구역 아래, 수백 년의 비밀과 콘크리트와 국가 권력 뒤에 잠들어 있는 셈이다. 그리고 그게 발견되는 날, 그건 낡은 책 더미가 아니라 인류 문명에서 빠져 있던 한 장이 될 것이다.",
          },
        },
      },
    ],
  },
};

async function pushStory() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });

    const result = await client.send(command);
    console.log("SUCCESS: Korean story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("siteId: moscow-kremlin");
    console.log("langStoryId: ko#lost-library-ivan");
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists! langStoryId ko#lost-library-ivan");
    } else {
      console.error("ERROR:", error.message);
    }
    process.exit(1);
  }
}

pushStory();
