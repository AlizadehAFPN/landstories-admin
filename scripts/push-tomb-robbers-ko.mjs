import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "valley-of-the-kings" },
  langStoryId: { S: "ko#tomb-robbers-trials" },
  storyId: { S: "tomb-robbers-trials" },
  lang: { S: "ko" },
  title: { S: "도굴꾼의 자백" },
  subtitle: { S: "\"늘 하던 대로 무덤을 털러 갔다\"" },
  excerpt: { S: "기원전 1110년경, 이집트. 파라오들은 수백 년 동안 왕가의 계곡에 금과 보석을 묻어왔다. 하지만 람세스 9세 시대, 나라 곳간은 바닥났다. 가장 가난한 마을 바로 옆에 어마어마한 금이 잠들어 있었다. 누군가 손을 대는 건 시간문제였다." },
  icon: { S: "📜" },
  image: { S: "" },
  thumbnail: { S: "" },
  era: { S: "Late New Kingdom (c. 1110 BC)" },
  storyCategory: { S: "ghosts_curses" },
  tier: { S: "A" },
  isFree: { BOOL: true },
  hasAudio: { BOOL: false },
  disabled: { BOOL: false },
  readingTimeMinutes: { N: "4" },
  source: { S: "Peet, T. Eric. The Great Tomb Robberies of the Twentieth Egyptian Dynasty. Oxford, 1930; Papyrus Abbott, British Museum" },
  coordinates: {
    M: {
      lat: { N: "25.7402" },
      lng: { N: "32.6014" },
    },
  },
  characters: {
    L: [
      { S: "Amenpnufer (Tomb Robber)" },
      { S: "Paser (Mayor of East Thebes)" },
      { S: "Pawera (Mayor of West Thebes)" },
      { S: "Ramesses IX (Pharaoh)" },
    ],
  },
  moralOrLesson: { S: "아무리 신성한 보물도 배고픈 사람 앞에선 안전하지 않다. 지키는 자와 훔치는 자 사이의 경계는, 우리가 믿고 싶은 것보다 언제나 얇았다." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "기원전 1110년경, 이집트. 파라오들은 수백 년 동안 왕가의 계곡에 무덤을 만들어왔다. 금, 보석, 파라오가 저승에서 필요할 온갖 것들을 함께 묻었다. 그런데 람세스 9세 시대에 이르자 나라 곳간은 바닥났다. 흉년이 계속되고, 노동자들은 몇 달째 품삯을 못 받았다. 테베에서 가장 가난한 마을 바로 옆에, 평생 구경도 못 할 금이 잠들어 있었다. 누군가 손을 대는 건 시간문제였다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "사건의 시작은 앙숙인 두 시장이었다. 동쪽 테베, 그러니까 사람들이 사는 도시의 시장 파세르가, 왕릉이 있는 서쪽 나일강 건너편 시장 파웨라를 고발한 것이다. 도굴꾼들이 무덤을 제멋대로 털게 내버려두고, 어쩌면 뒷돈까지 챙긴다고. 고대 이집트에서 파라오의 무덤을 건드리는 건 단순한 절도가 아니었다. 우주의 질서를 흔드는 짓이었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "관리들이 왕릉을 조사하러 나섰다. 결과는 참담했다. 무덤마다 뚫려 있었다. 관은 박살 나고, 미라는 겹겹이 싼 천이 벗겨진 채 나뒹굴었다. 반지, 부적, 금붙이 하나 남지 않았다. 영원을 위해 묻어둔 보물이 동네 장터에서 팔리고 있었다. 수사망이 좁혀지자 석공, 사제, 경비병, 심지어 무덤을 지키는 게 직업인 관리까지 줄줄이 엮였다. 전부 한통속이었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "이어진 재판 기록은 3천 년이 지난 지금 봐도 소름이 돋는다. 자진해서 입을 연 자도 있었고, 발바닥을 몽둥이로 맞아가며 토해낸 자도 있었다. 그중에서도 석공 아멘프누페르의 자백이 압권이다. 파라오 소벡엠사프 2세의 무덤을 어떻게 털었는지를, 마치 어제 저녁 뭘 먹었는지 말하듯 담담하게 풀어놓았다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "파피루스에 적힌 그의 말이 3천 년을 건너 전해진다. \"늘 하던 대로 무덤을 털러 갔다. 신은 묻힌 방 안쪽에 누워 있었다. 미라에서 금과 부적, 보석을 걷어내고 관에 불을 질렀다.\" 늘 하던 대로. 출근하듯 무덤을 턴 것이다. 금은 여덟 명이 똑같이 나눠 가졌다. 막다른 골목에 몰린 사람들의 발작이 아니었다. 철저하게 짜인 고대판 조직 범죄였다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "주모자들은 거의 틀림없이 처형됐다. 그런데도 도굴은 멈추지 않았다. \"사흘 굶으면 도둑질 안 할 사람 없다\"는 옛말이 있지만, 테베 서쪽 노동자들은 사흘이 아니라 몇 달을 굶었다. 왕릉의 금만이 유일한 생존 수단이었다. 결국 사제들도 무덤 지키기를 포기했다. 대신 미라를 몰래 꺼내, 아무도 모르는 곳에 숨기는 쪽을 택했다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그 비밀 은닉처가 발견된 건 1800년대였다. 이집트 역사상 가장 전설적인 파라오들이 한자리에 모여 있었다. 람세스 대왕, 세티 1세, 투트모세 3세. 화려한 부장품은 전부 사라지고 수수한 관에 담겨 있었지만, 미라만은 온전했다. 사제들이 자기 백성으로부터 파라오를 숨겨서, 겨우 지켜낸 것이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "3천 년 전, 한 석공이 지상에서 가장 신성한 무덤을 바라보며 어깨를 으쓱했다. 죽은 사람한테 금이 무슨 소용이야. 도굴 재판 파피루스가 남긴 교훈은 하나다. 아무리 신성한 보물도 배고픈 사람 앞에선 안전하지 않다는 것. 그리고 지키는 자와 훔치는 자 사이의 경계는, 우리가 믿고 싶은 것보다 훨씬 얇다는 것.",
          },
        },
      },
    ],
  },
  updatedAt: { N: "1773582634" },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("SUCCESS: Korean story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("siteId: valley-of-the-kings");
    console.log("langStoryId: ko#tomb-robbers-trials");
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
}

push();
