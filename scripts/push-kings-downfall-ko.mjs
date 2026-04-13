import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "sigiriya" },
  langStoryId: { S: "ko#kings-downfall" },
  lang: { S: "ko" },
  storyId: { S: "kings-downfall" },
  title: { S: "왕의 몰락" },
  subtitle: {
    S: "아버지를 죽이고 하늘 위에 요새를 지은 왕. 18년 뒤, 동생이 군대를 끌고 오자 — 그는 스스로 내려왔다",
  },
  excerpt: {
    S: "서기 477년, 스리랑카의 한 왕자가 아버지를 죽이고 왕좌를 빼앗았다. 도망친 이복동생이 돌아올 것을 알고, 정글 한가운데 200미터 바위 위에 난공불락의 요새를 지었다. 18년 뒤 그날이 왔을 때, 그는 성벽 뒤에 숨지 않았다. 결말은 몇 분 만에 찾아왔다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "카샤파는 자기 아버지를 죽였다. 이야기는 거기서 시작된다. 서기 477년, 스리랑카의 다투세나 왕을 끌어내리고 벽 속에 산 채로 가두어 버렸다. 그렇게 왕좌를 차지했다. 하지만 정당한 후계자였던 이복동생 모갈라나는 그날 밤 도망쳤다. 어둠 속을 뚫고 남인도까지 달아난 어린 왕자. 카샤파는 알고 있었다. 그 동생이 반드시 돌아올 거라는 걸. 그래서 정글 한가운데, 200미터짜리 바위 꼭대기에 궁전을 지었다. 어떤 군대도 올라올 수 없는, 하늘 위의 요새를.",
          },
        },
      },
      {
        M: {
          text: {
            S: "18년 동안 카샤파는 하늘에서 나라를 다스렸다. 시기리야 바위를 해자로 둘러싸고, 입구에는 거대한 사자를 바위에 새겼다. 벽마다 황금빛 여신들을 그려 넣었다. 모든 계단, 모든 통로, 모든 방어 지점이 단 하나의 목적을 위해 만들어졌다 — 동생이 군대를 이끌고 올 그날을 위해. 그리고 서기 495년, 마침내 그날이 왔다. 모갈라나가 남인도 병사들과 함께, 자기 왕좌를 되찾으러 나타났다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그런데 카샤파는 아무도 예상 못 한 일을 했다. 내려왔다. 20년 가까이 쌓아 올린 성벽 뒤에서 버티는 대신, 군대를 이끌고 평원으로 나갔다. 빨리 끝장내고 싶었을 수도 있다. 숨으면 겁쟁이로 보일까 봐 그랬을 수도 있다. 아니면 — 18년 동안 자기가 저지른 일과 함께 살아온 사람이 — 그냥 끝내고 싶었는지도 모른다. 하늘 위에 요새를 지은 왕이, 땅 위에서 싸우기를 택했다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "바위 아래 평원에서 두 군대가 맞붙었다. 카샤파는 전투 코끼리 위에 올라타고 한가운데서 싸웠다. 모두가 볼 수 있게. 그때였다. 코끼리가 늪지대에 발이 빠지면서 몸을 옆으로 틀었다. 그냥 진흙을 피하려던 것뿐이었다. 하지만 병사들 눈에는 왕이 등을 돌리는 것처럼 보였다. 미가라 — 18년 전 카샤파가 아버지를 죽일 때 옆에 있던 바로 그 장군 — 가 이 순간을 놓치지 않았다. 퇴각을 외쳤고, 군대가 순식간에 무너졌다. 몇 분 만에, 카샤파는 완전히 혼자가 됐다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "다음에 벌어진 일은 스리랑카 역사에서 가장 유명한 죽음이다. 카샤파는 허리춤에서 보석 박힌 단검을 뽑아 자기 목을 그었다. 하지만 여기서 끝이 아니다. 천오백 년 동안 사람들의 머릿속에서 지워지지 않는 건 바로 이 다음 장면이다. 목을 가른 뒤, 피 묻은 단검을 머리 위로 높이 들어 올렸다. 전장의 모든 눈이 자기를 보도록. 그리고 천천히 — 칼집에 꽂았다. 쓰러지기 전에. 칼을 넣었다는 건, 싸움이 끝났다는 뜻이었다. 자기 손으로 모든 것을 마무리한 것이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "모갈라나가 왕좌에 올랐고, 수도를 옛 성지 아누라다푸라로 되돌렸다. 시기리야 — 불가능해 보이는 요새, 죄의식과 천재성이 빚어낸 기념물 — 는 불교 승려들에게 넘겨졌다. 아버지를 죽인 왕의 궁전이 수도원이 됐다. 황금빛 여신들은 삭발한 스님들을 내려다봤고, 분수는 멈추고, 사자상은 부서져 내렸다. 천사백 년 동안 그 바위 위에 울려 퍼진 건 독경 소리와, 거울벽에 새겨진 사랑의 낙서뿐이었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "옛말에 하늘이 무너져도 솟아날 구멍이 있다고 했다. 카샤파는 그 구멍을 하늘 위에 직접 만들었다. 200미터 바위 꼭대기, 어떤 군대도 뚫을 수 없는 요새. 하지만 아버지를 죽인 사람에게는 솟아날 구멍 같은 건 없었다. 성벽이 뚫린 게 아니다. 충성이 무너진 것이다. 결정적 순간에 군대가 등을 돌린 건, 처음부터 아버지를 죽인 왕을 진심으로 따른 적이 없었기 때문이다. 아무리 높이 올라가도, 무너질 자리는 이미 정해져 있는 법이다.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "카샤파는 자기가 저지른 일에서 달아나려고 하늘 위에 요새를 쌓았다. 하지만 무너진 건 성벽이 아니었다. 아버지를 죽인 왕을 위해 목숨을 거는 군대는, 처음부터 떠날 날만 기다리는 군대였다. 그리고 마지막 순간, 스스로 목을 긋고 칼을 칼집에 넣은 카샤파가 진짜로 지배한 건 — 자기 자신의 최후뿐이었다.",
  },
  // Unchanged fields from English
  icon: { S: "⚔️" },
  tier: { S: "S" },
  source: {
    S: "Culavamsa, chapters 38-39 (Geiger translation, 1929); De Silva, K.M. A History of Sri Lanka, 1981; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; Gunawardana, R.A.L.H. Robe and Plough: Monasticism and Economic Interest in Early Medieval Sri Lanka, 1979; UNESCO World Heritage Nomination File 202",
  },
  characters: {
    L: [
      { S: "King Kashyapa I (the doomed king)" },
      { S: "King Moggallana I (his half-brother, the returning heir)" },
      { S: "Migara (the betrayer who switched sides)" },
      { S: "General Sulaksmana (commander of Sigiriya's garrison)" },
    ],
  },
  era: { S: "495 CE" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: "1772115420" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "80.7603" },
      lat: { N: "7.957" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "ghosts_curses" },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });

    const result = await client.send(command);
    console.log("✅ Korean story pushed successfully!");
    console.log("   siteId: sigiriya");
    console.log("   langStoryId: ko#kings-downfall");
    console.log("   HTTP status:", result.$metadata.httpStatusCode);
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      console.error("❌ Record already exists! Not overwriting.");
    } else {
      console.error("❌ Error pushing Korean story:", error.message);
    }
    process.exit(1);
  }
}

push();
