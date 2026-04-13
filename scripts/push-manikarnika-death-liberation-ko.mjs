import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "varanasi" },
  langStoryId: { S: "ko#manikarnika-death-liberation" },
  lang: { S: "ko" },
  storyId: { S: "manikarnika-death-liberation" },
  title: { S: "죽어야 자유다" },
  subtitle: {
    S: "한 번도 꺼진 적 없는 장례의 불꽃, 가장 낮은 자가 모든 영혼의 열쇠를 쥔 곳 — 지상에서 가장 거룩한 도시에서 죽음은 가장 성스러운 행위다",
  },
  excerpt: {
    S: "마니카르니카 가트의 불은 꺼진 적이 없다. 단 한 번도. 힌두교 최고의 성지 바라나시, 갠지스강 위 돌계단에서 장례의 불꽃이 쉬지 않고 타오른다. 이곳에서 죽음은 완전한 자유의 문이다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "마니카르니카 가트의 불은 꺼진 적이 없다. 단 한 번도. 힌두교 최고의 성지 바라나시, 갠지스강 돌계단 위에서 장례의 불꽃이 하루도 쉬지 않고 타오른다. 동시에 열두 구, 하루에 수백 명. 연기가 피어오르고 재가 강물로 흩어진다. 힌두교도들은 이곳에서 죽으면 윤회의 굴레가 완전히 끊긴다고 믿는다. 여기서 죽음은 끝이 아니다. 완전한 자유의 문이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "경전이 그 이유를 알려준다. 시바—힌두교에서 파괴와 변환을 관장하는 신—가 이곳에서 타는 모든 시신 곁에 선다고 한다. 불길이 솟는 순간, 시바는 죽어가는 자의 귀에 비밀의 만트라를 속삭인다. 해탈의 열쇠다. 생전에 누구였는지는 상관없다. 부자든 거지든, 성인이든 죄인이든. 불이 몸을 태우고, 강이 재를 받고, 시바의 속삭임이 영혼을 건너편으로 보낸다. 거절당하는 자는 없다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그런데 반전이 있다. 이 거룩한 화장터에서 가장 큰 힘을 쥔 건 성직자도 왕도 아니다. 돔 라자다. 인도 카스트 제도 최하층, 수천 년간 '불가촉천민'이라 불려온 계급의 우두머리. 그가 영원히 꺼지지 않는 불꽃을 관리한다. 모든 장례의 불은 반드시 그의 불에서 옮겨 붙여야 한다. 예외 없다. 유족은 사랑하는 이를 해방시킬 불씨를 얻으려 그에게 돈을 낸다. 세상에서 가장 천대받는 사람이, 모든 영혼이 신에게 닿는 데 필요한 유일한 열쇠를 쥐고 있다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "의식은 수백 년째 변하지 않았다. 시신이 좁은 골목을 지나 도착하고, 유족은 \"람 남 사트야 하이\"를 외친다. '신의 이름만이 진실이다'라는 뜻이다. 시신은 마지막으로 갠지스강에 한 번 담겼다 올려지고, 장작 위에 놓인다. 장남이 돔 라자의 불씨로 장작에 불을 붙이며 다섯 바퀴를 돈다. 흙, 물, 불, 바람, 허공. 다섯 원소에 한 바퀴씩. 그러고 나서 대나무 막대로 두개골을 깬다. 영혼을 놓아주는 것이다. 강 위로 퍼지는 그 날카로운 소리—누군가가 자유로워지는 순간의 소리다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "모두가 불을 거치는 건 아니다. 다섯 살 미만의 아이는 그대로 강에 맡긴다. 순수함 자체가 통행증이다. 속세를 버리며 이미 한 번 '죽은' 수행자들도 마찬가지다. 임신한 여성도 불이 필요 없다. 뱃속 아이에게는 태울 업보가 없으니까. 화장터의 규칙에도 예외는 있다. 그리고 그 예외 하나하나가 이 문화에서 '순수함'이 무엇인지를 말해준다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "화장터 근처에 묵티 바완이라는 곳이 있다. '해방의 집'. 사람들이 죽으러 오는 숙소다. 방 하나, 침대 하나, 경전 한 권. 주어진 시간은 15일. 그 안에 죽지 못하면 나갔다 다시 신청한다. 대기자 명단이 있다. 이곳 관리인은 만 이천 명 넘게 떠나보냈다. 패턴은 늘 같았다고 한다. 원한을 내려놓은 사람은 편히 갔다. 끝까지 붙잡은 사람은 괴로워하며 갔다. 좋은 죽음이란 피하는 게 아니라, 눈 뜨고 맞이하는 것이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그런데 바라나시에서 죽음에 관해 가장 파격적인 일을 벌인 사람은, 정작 이곳에서 죽기를 거부한 남자다. 15세기 시인 카비르. 모든 종교의 규칙에 의문을 던진 사람이었다. 그는 임종 직전 바라나시를 떠나 마가르로 갔다. 그곳에서 죽으면 다음 생에 당나귀로 태어난다는 미신이 있었다. 신은 한 도시의 것이 아니며, 진짜 자유는 장소가 아니라 마음에 있다는 걸 몸으로 증명하려 한 것이다. 제자들이 수의를 걷어내자, 시신 대신 꽃만 남아 있었다고 전한다. 하늘이 무너져도 솟아날 구멍이 있다 했다. 바라나시가 수천 년째 말하는 것은 바로 이것이다—그 구멍은 두려움 없는 마음이다.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "바라나시는 가장 거룩한 장소를 사원이 아니라 화장터 위에 세웠다. 그리고 온 세상이 평생 도망치는 한 가지를 발견했다. 진짜 자유로워지는 길은 하나뿐이다—불꽃 앞에서 두려움을 내려놓는 것.",
  },
  characters: {
    L: [
      { S: "시바 (이곳에서 죽어가는 자에게 해탈의 만트라를 속삭이는 힌두교의 신)" },
      { S: "돔 라자 (인도 최하층 카스트 출신으로 영원한 불꽃을 관리하는 자)" },
      { S: "카비르 (바라나시를 떠나 죽음을 택한 15세기 시인)" },
    ],
  },
  icon: { S: "🔥" },
  tier: { S: "S" },
  source: {
    S: "Parry, Jonathan P. Death in Banaras, Cambridge University Press, 1994; Eck, Diana L. Banaras: City of Light, Princeton University Press, 1982; Justice, Christopher. Dying the Good Death: The Pilgrimage to Die in India's Holy City, SUNY Press, 1997; Skanda Purana, Kashi Khanda (12th-14th century CE); Markandeya Purana (Harishchandra legend); Bhutiani, Shubhashish. Hotel Salvation (Mukti Bhawan), 2016 film, Venice Film Festival",
  },
  era: {
    S: "Mythological origins to present day (fires burning continuously for centuries)",
  },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "prophets_pilgrims" },
  coordinates: {
    M: {
      lat: { N: "25.3109" },
      lng: { N: "83.0107" },
    },
  },
  updatedAt: { N: "1773662666" },
};

async function push() {
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });
    const result = await client.send(cmd);
    console.log("SUCCESS: Korean story pushed to DynamoDB");
    console.log("HTTP status:", result.$metadata.httpStatusCode);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log("Item already exists. Use update or remove condition to overwrite.");
    } else {
      console.error("FAILED:", err.message);
    }
  }
}

push();
