import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: { S: "ephesus" },
  langStoryId: { S: "ko#seven-sleepers" },
  lang: { S: "ko" },
  storyId: { S: "seven-sleepers" },
  title: { S: "200년의 잠" },
  subtitle: { S: "잠들었다 깨어보니, 200년이 흘러 있었다" },
  excerpt: { S: "인생 최악의 날, 잠이 들었습니다. 눈을 떠 보니 200년이 지나 있었어요. 기독교와 이슬람, 두 종교가 모두 실화라 믿는 고대 에페소스의 전설." },
  moralOrLesson: { S: "세상 모든 것이 변해도 변하지 않는 믿음이 있다면, 그 믿음은 시대를 초월해 서로 다른 종교마저 하나의 경이 앞에 모이게 한다." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "인생 최악의 날, 잠이 들었다고 생각해 보세요. 그런데 눈을 떠 보니 200년이 지나 있습니다. 아는 사람은 모두 세상을 떠났고, 당신만 하루도 늙지 않은 채 남아 있어요. 말도 안 되는 얘기 같죠? 그런데 기독교와 이슬람, 세계에서 가장 큰 종교 두 곳이 실제로 일어난 일이라고 믿는 이야기가 있습니다. 지금의 터키 서부, 고대 도시 에페소스에서 벌어진 일이에요."
          },
        },
      },
      {
        M: {
          text: {
            S: "서기 250년경, 로마 황제 데키우스는 역대 가장 잔혹한 기독교 박해를 시작합니다. 제국 전역에서 로마 신들에게 제물을 바치라고 강요했고, 거부하면 죽었어요. 고대 세계 최고의 도시 에페소스에서도 일곱 명의 젊은이가 맞섰습니다. 절하지 않겠다. 향도 피우지 않겠다. 그 대가가 뭔지 뻔히 알면서도요."
          },
        },
      },
      {
        M: {
          text: {
            S: "그래서 도망쳤습니다. 성벽 너머 피온 산 깊숙한 동굴에 몸을 숨겼죠. 하지만 데키우스가 알아냈어요. 끌어내 공개 처형하는 대신, 더 잔인한 방법을 택했습니다. 동굴 입구를 거대한 돌로 막아 버린 겁니다. 산 채로 묻은 거예요. 황제에게 그건 끝이었습니다. 산속에 파묻힌 일곱 명, 잊히면 그만인 존재들."
          },
        },
      },
      {
        M: {
          text: {
            S: "십 년이면 강산도 변한다고 하죠. 그런데 200년이 흘렀습니다. 서기 450년경, 한 농부가 소를 들여놓을 곳을 찾다가 그 동굴을 열었어요. 안에서 본 광경은 상상을 넘어섰습니다. 일곱 명의 젊은이가 살아 있었어요. 마치 오후에 잠깐 눈을 붙인 것처럼 기지개를 켜며 일어나고 있었습니다. 자신들을 죽이려 했던 로마 제국이 기독교 국가가 됐다는 건 꿈에도 모른 채."
          },
        },
      },
      {
        M: {
          text: {
            S: "잠에서 깬 한 명, 잠블리쿠스라는 청년이 빵을 사러 시내로 나갔습니다. 동전을 내밀자 빵 장수의 얼굴이 굳었어요. 동전에는 200년 전 황제 데키우스의 얼굴이 새겨져 있었거든요. 누구도 기억 못 하는 시대의 돈이었습니다. 소문은 순식간에 퍼졌고, 관리들이 동굴로 달려갔습니다. 나머지 여섯 명은 여전히 그 자리에, 여전히 젊은 채로, 오늘이 며칠이냐고 묻고 있었어요."
          },
        },
      },
      {
        M: {
          text: {
            S: "소식은 황제 테오도시우스 2세에게까지 닿았고, 그는 직접 에페소스를 찾았습니다. 기독교 세계에 이건 신기한 사건이 아니었어요. 기적이었습니다. 신이 몸을 지켜 낼 수 있다는 것, 믿음이 제국보다 오래간다는 것, 죽음이 마지막이 아니라는 것. 일곱 청년은 그 불가능한 메시지를 전한 뒤 얼마 안 돼 조용히 눈을 감았습니다. 마치 그 한 가지를 세상에 보여 주려고만 깨어난 것처럼."
          },
        },
      },
      {
        M: {
          text: {
            S: "이야기는 거기서 끝나지 않았습니다. 기독교에서 수백 년간 전해지다, 이슬람 경전인 꾸란 18장 '알 카흐프', 뜻은 '동굴'인 장에도 기록됩니다. 기독교와 이슬람이 함께 소중히 여기는 이야기는 손에 꼽을 정도로 드물어요. 두 개의 믿음, 하나의 기적, 그리고 아직도 울리는 하나의 질문. 만약 당신이 잠에서 깨어났는데 세상이 당신 없이 200년을 살아 버렸다면 — 당신은 어떻게 하겠어요?"
          },
        },
      },
    ],
  },
  icon: { S: "😴" },
  tier: { S: "A" },
  source: { S: "Gregory of Tours; Jacobus de Voragine, Golden Legend; Quran, Surah 18 (Al-Kahf)" },
  characters: {
    L: [
      { S: "The Seven Sleepers (Maximilian, Jamblicus, Martinian, John, Dionysius, Exacustodianus, Antoninus)" },
      { S: "Emperor Decius" },
      { S: "Emperor Theodosius II" },
      { S: "The bread seller" },
    ],
  },
  era: { S: "Roman Imperial Period (250 AD) to Byzantine Period (~450 AD)" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  updatedAt: { N: String(now) },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "27.3419" },
      lat: { N: "37.9392" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "prophets_pilgrims" },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });

    const result = await client.send(command);
    console.log("SUCCESS: Korean story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("langStoryId: ko#seven-sleepers");
    console.log("siteId: ephesus");
    console.log("updatedAt:", now);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: A record with this key already exists! Use update instead.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
