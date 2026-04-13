import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "varanasi" },
  langStoryId: { S: "ko#oldest-living-city" },
  lang: { S: "ko" },
  storyId: { S: "oldest-living-city" },
  title: { S: "죽지 않는 도시" },
  subtitle: {
    S: "역사보다 오래되고 전설보다 오래된, 삼천 년 동안 단 하루도 멈추지 않은 도시",
  },
  excerpt: {
    S: "마크 트웨인은 바라나시가 역사보다 오래되고, 전통보다 오래되고, 전설보다도 오래됐다고 썼다. 과장이 아니었다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "마크 트웨인이 1896년 배를 타고 갠지스강에 도착했을 때, 이렇게 썼습니다. \"역사보다 오래되고, 전통보다 오래되고, 전설보다도 오래된 도시. 그 셋을 합친 것보다 두 배는 더 오래 보인다.\" 과장이 아니었습니다. 강으로 내려가는 돌계단, 지붕마다 솟은 사원, 수백 년째 꺼지지 않는 화장터의 불. 많은 도시가 '지구에서 가장 오래된 도시'를 자처합니다. 바라나시가 다른 건 딱 하나. 한 번도 자기 자신이기를 멈춘 적이 없다는 겁니다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "두 강이 만나는 지점을 파내려가자 기원전 1800년경 토기가 나왔습니다. 그 아래는 아무것도 없고, 그 위로는 인도 역사 전체가 흙과 돌로 켜켜이 쌓여 있었습니다. 끊김 없이. 공백 없이. 침묵 없이. 인류 최초의 경전 중 하나인 리그베다는 이곳을 '카시'라 불렀습니다. 빛의 도시. 다른 고대 도시들이 버려지고, 잊히고, 수천 년 뒤에야 발굴되는 동안, 카시는 그냥 계속 빛나고 있었습니다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "기원전 528년경, 붓다가 바라나시 바로 옆 사르나트까지 걸어왔습니다. 아무 데나 고른 게 아닙니다. 바라나시는 이미 당대 세계의 지식 중심지였습니다. 자기를 포기하고 떠났던 다섯 제자 앞에서, 그는 아시아 절반을 바꿀 가르침을 펼칩니다. 중도, 사성제, 고통에서 벗어나는 길. 불교의 탄생을 지켜본 이 도시는, 그때 이미 천 년이 넘은 도시였습니다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "열 번 찍어 안 넘어가는 나무 없다고 합니다. 바라나시는 열 번이 아니라 수백 번 찍혔습니다. 1194년, 침략군이 천 개 가까운 사원을 무너뜨렸습니다. 1669년, 무굴 황제 아우랑제브는 인도에서 가장 신성한 시바 사원을 허물고 그 자리에 모스크를 올렸습니다. 도시 이름까지 바꿨습니다. 아무도 새 이름을 쓰지 않았습니다. 1780년, 여왕 아힐랴바이 홀카르가 바로 옆에 새 사원을 세웠고, 시크교 왕이 그 지붕을 금으로 덮었습니다. 힌두교 여왕이 짓고, 시크교 왕이 완성한 사원. 도시는 전보다 더 찬란하게 다시 일어섰습니다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "바라나시가 진짜 특별한 이유는 따로 있습니다. 힌두 경전에 따르면 이 도시는 시바 신의 삼지창 위에 올려져 있습니다. 하늘과 땅 사이에 떠 있는 도시. 우주가 멸망하는 날에도 시바가 이 도시만은 홍수 위로 들어 올린다고 합니다. 신성한 건 건물이 아니라 땅 그 자체입니다. 사원을 아무리 부숴도 바라나시는 바라나시입니다. 이곳에서 숨을 거두면 윤회의 고리에서 영원히 벗어난다고 믿습니다. 신의 집은 부술 수 있어도, 그 집이 서 있던 땅은 부술 수 없습니다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "바라나시는 박물관이 아닙니다. 두 사람이 겨우 비켜 지나가는 골목에서, 소와 오토바이와 장례 행렬과 등교하는 아이들이 한꺼번에 뒤섞입니다. 힌두교도, 무슬림, 시크교도 모두가 지금도 읊는 반항의 시인 카비르가 이 도시 사람이었습니다. 인도 전통 관악기의 거장 비스밀라 칸은 칠십 년 동안 매일 새벽 갠지스강 옆에서 연주했고, 떠나자는 모든 제안을 거절하며 말했습니다. \"내 강과 내 신을 두고 갈 수는 없습니다.\"",
          },
        },
      },
      {
        M: {
          text: {
            S: "매일 저녁, 다샤슈와메드 가트에서 사제들이 거대한 놋쇠 등잔을 어둠 속에 휘두릅니다. 수천 명이 돌계단에서, 검은 강 위의 배에서 그 불빛을 지켜봅니다. 매일 아침, 해가 뜨기 전 사람들이 회색빛 새벽 속을 강물로 걸어 내려갑니다. 이 도시는 삼천 년 동안 매일 해온 일을 오늘도 합니다. 강을 향해 얼굴을 돌리고, 기도하고, 죽은 이를 태우고, 살아갑니다.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "도시가 삼천 년을 버티는 건 성벽이나 군대 덕분이 아닙니다. 인간의 영혼에 어떤 의미를 주느냐에 달린 것입니다. 가장 오래 살아남는 곳은 돌 위에 세운 곳이 아니라, 너무나 깊은 하나의 생각 위에 세운 곳입니다 — 모든 세대가 스스로, 간절하게, 다시 짓기를 택하는 그런 생각 말입니다.",
  },
  // Unchanged fields from English
  icon: { S: "🕉️" },
  tier: { S: "S" },
  source: {
    S: "Twain, Mark. Following the Equator, 1897, Ch. LVIII; Eck, Diana L. Banaras: City of Light, Princeton University Press, 1982; Narain, A.K. and Roy, T.N. Excavations at Rajghat, Banaras Hindu University, 1976; Skanda Purana, Kashi Khanda (12th-14th century CE); Dhammacakkappavattana Sutta (Samyutta Nikaya 56.11); Xuanzang, Da Tang Xiyu Ji (Great Tang Records on the Western Regions, 7th century CE)",
  },
  characters: {
    L: [
      { S: "Mark Twain (American author who visited in 1896)" },
      {
        S: "The Buddha (Siddhartha Gautama, who preached at nearby Sarnath)",
      },
      { S: "Xuanzang (Chinese Buddhist pilgrim, 7th century CE)" },
      { S: "Ustad Bismillah Khan (shehnai maestro, 1916-2006)" },
      { S: "Kabir (mystic poet-weaver, c. 1398-1518)" },
      { S: "Tulsidas (author of the Ramcharitmanas, c. 1532-1623)" },
    ],
  },
  era: { S: "c. 1800 BCE – present (over 3,000 years of continuous habitation)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: "1773433903" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lat: { N: "25.3109" },
      lng: { N: "83.0107" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "place_names" },
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
    console.log("   siteId: varanasi");
    console.log("   langStoryId: ko#oldest-living-city");
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
