import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "buda-castle" },
  langStoryId: { S: "ko#raven-king" },
  lang: { S: "ko" },
  storyId: { S: "raven-king" },
  title: { S: "까마귀가 만든 왕" },
  subtitle: { S: "마차시 코르비누스, 그 이름의 시작" },
  excerpt: {
    S: "1440년대 헝가리에서 가장 위험한 남자가 있었다. 야노시 후냐디. 오스만 제국이 중부 유럽을 집어삼키려 할 때, 홀로 그 앞을 가로막은 장군이다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1440년대 헝가리에서 가장 위험한 남자가 있었다. 야노시 후냐디. 오스만 제국이 중부 유럽을 집어삼키려 할 때, 홀로 그 앞을 가로막은 장군이다. 전장에서는 무적이었지만, 궁정에서는 적이 끊이지 않았다. 그의 힘을 시기하는 귀족들, 암살 시도, 끝없는 음모. 1443년, 후냐디가 다시 전장으로 떠나면서 작은 결정 하나를 내린다. 바로 이 결정이, 역사에서 가장 기이한 전설의 시작이 된다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "떠나기 전, 그는 임신 중인 아내 에르제베트 실라지에게 인장 반지를 건넨다. 금으로 만든 이 반지는 장신구가 아니었다. 조약에 서명하고, 군대를 움직이고, 명령서가 진짜임을 증명하는 도장이었다. 이 반지를 가진 사람이 곧 후냐디의 목소리였다. 위조된 편지 한 통이 전쟁을 일으키거나 목숨을 앗아갈 수 있던 시대, 이 반지를 잃는다는 것은 상상조차 할 수 없는 일이었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "몇 주 뒤, 에르제베트는 아들을 낳는다. 이름은 마차시. 어느 날 아침, 후냐드 성에서 아이를 돌보던 그녀가 반지를 잠시 요람 가장자리에 올려놓는다. 바로 그 순간, 까마귀 한 마리가 열린 창문으로 쏜살같이 날아들더니 금반지를 부리로 낚아채고, 높은 탑 꼭대기로 날아가 버린다. 눈 깜짝할 사이에, 후냐디 가문에서 가장 중요한 물건이 사라진다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "에르제베트는 공포에 질린다. 이 반지 없이는 남편의 적들이 인장을 위조하고, 가짜 명령을 내리고, 심지어 그의 군대마저 돌려세울 수 있었다. 그런데 그다음 벌어진 일은 아무도 설명하지 못한다. 갓 몇 주 된 아기 마차시가 탑 위의 까마귀를 올려다본다. 눈을 깜빡이지 않는다. 기이할 만큼 또렷한 눈빛으로, 새를 가만히 응시한다. 몇 분이 흘렀을까. 까마귀가 천천히 내려와 요람 가장자리에 앉더니, 반지를 아기의 이불 위에 떨어뜨린다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "이 이야기는 순식간에 헝가리 전역으로 퍼진다. \"까마귀가 저 아이를 알아봤다.\" 사람들이 속삭인다. \"저 아이에게는 큰 운명이 있다.\" 될성부른 나무는 떡잎부터 알아본다고 했던가. 이 아이는 떡잎이 아니라, 까마귀가 먼저 알아봤다. 까마귀가 길들여진 새였는지, 야생이었는지, 아니면 훗날 왕을 만들기 위해 지어낸 이야기인지는 중요하지 않았다. 15세기 헝가리에서, 믿음은 어떤 군대보다 빠르고, 어떤 칼보다 강했다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그리고 그 믿음은 틀리지 않았다. 1458년, 겨우 열다섯 살의 마차시가 헝가리의 왕으로 선출된다. 더 부유하고 더 좋은 집안 출신의 경쟁자들을 제치고, 평범한 사람들이 그를 원했기 때문이다. 그는 까마귀를 자신의 상징으로 삼고, 역사는 그를 마차시 코르비누스라 부른다. 코르비누스. 라틴어로 '까마귀'라는 뜻이다. 그의 문장에는 금반지를 물고 있는 검은 까마귀가 새겨졌다. 요람 위의 그 까마귀, 바로 그 반지였다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "오늘날에도 그 까마귀는 헝가리를 지키고 있다. 돌에 새겨지고, 기념비에 찍히고, 나라의 정체성 속에 살아 숨 쉰다. 까마귀 앞에서 눈 한 번 깜빡이지 않던 아기는, 자라서 오스만 제국 앞에서도 눈 하나 깜빡이지 않았다. 유럽 최고의 르네상스 궁정을 세웠고, 헝가리 역사상 가장 위대한 왕이 되었다. 어떤 이야기는 위대함을 기록하는 데 그치지 않는다. 위대함을 만들어낸다.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "운명은 때로 가장 기이한 방식으로 자신을 드러낸다.",
  },
  source: {
    S: "János Thuróczy's Chronica Hungarorum; Hungarian folk tradition",
  },
  characters: {
    L: [
      { S: "마차시 코르비누스 (갓난아기)" },
      { S: "에르제베트 실라지" },
      { S: "야노시 후냐디" },
      { S: "까마귀" },
    ],
  },
  era: { S: "1443" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  thumbnail: { S: "" },
  icon: { S: "🦅" },
  tier: { S: "A" },
  coordinates: {
    M: {
      lat: { N: "47.4961" },
      lng: { N: "19.0398" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  storyCategory: { S: "crowns_conquests" },
  updatedAt: { N: "1773494391" },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("✅ Successfully pushed ko#raven-king to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (error) {
    console.error("❌ Failed to push:", error.message);
    process.exit(1);
  }
}

push();
