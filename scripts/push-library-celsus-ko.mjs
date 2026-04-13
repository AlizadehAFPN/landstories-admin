import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "ephesus" },
  langStoryId: { S: "ko#library-celsus" },
  lang: { S: "ko" },
  storyId: { S: "library-celsus" },
  title: { S: "셀수스 도서관 — 아버지를 위해 세운 영원" },
  subtitle: { S: "한 아들의 슬픔이 고대 세계에서 가장 아름다운 도서관을 만들었다" },
  excerpt: { S: "서기 114년, 로마 제국에서 손꼽히는 대도시 에페소스. 지금의 터키 서쪽 해안에 있던 이 도시에서 한 거물이 세상을 떠났다. 이름은 셀수스. 로마 원로원 의원을 거쳐 집정관까지 올랐고, 끝내는 아시아 지방 전체를 다스리는 총독이 된 인물이었다. 아들 아퀼라에게는 아버지를 기릴 방법이 필요했다. 동상? 기념비? 그는 누구도 예상 못 한 길을 택했다. 세상에서 가장 아름다운 도서관을 짓기로 한 것이다." },
  moralOrLesson: { S: "가장 위대한 기념물은 사랑과 상실에서 태어난다. 떠나간 이를 위해 무엇을 세우느냐가, 남은 이의 진짜 모습을 말해준다." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "서기 114년, 로마 제국에서 손꼽히는 대도시 에페소스. 지금의 터키 서쪽 해안에 있던 이 도시에서 한 거물이 세상을 떠났다. 이름은 셀수스. 로마 원로원 의원을 거쳐 집정관까지 올랐고, 끝내는 아시아 지방 전체를 다스리는 총독이 된 인물이었다. 아들 아퀼라에게는 아버지를 기릴 방법이 필요했다. 동상? 기념비? 그는 누구도 예상 못 한 길을 택했다. 세상에서 가장 아름다운 도서관을 짓기로 한 것이다."
          }
        }
      },
      {
        M: {
          text: {
            S: "공사는 거의 10년이 걸렸다. 125년경 완성된 셀수스 도서관에는 약 12,000개의 두루마리가 소장됐다. 이집트 알렉산드리아 도서관, 페르가몬 도서관에 이어 고대 세계 3위 규모였다. 하지만 이 도서관을 특별하게 만든 건 크기가 아니라 아름다움이었다. 2층 높이의 정면에는 눈속임이 숨어 있었는데, 바깥쪽 기둥을 가운데보다 살짝 짧게 만들어 건물 전체가 실제보다 더 웅장하게 보이도록 한 것이다."
          }
        }
      },
      {
        M: {
          text: {
            S: "건축가들은 수천 년간 고대 문서를 망쳐온 적, 습기까지 잡았다. 벽을 이중으로 쌓고 사이에 공기층을 두는 방식이었다. 요즘 말로 하면 고대판 항온항습 시스템인 셈이다. 입구에는 네 개의 조각상이 서 있었다. 지혜, 학식, 사려, 덕. 아퀼라가 아버지에게서 가장 존경한 것들이었다. 장식이 아니었다. \"이런 분이셨습니다, 저희 아버지는.\" 아들이 돌에 새긴 고백이었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "여기서 이야기는 한층 더 깊어진다. 아퀼라는 도서관 바닥 아래에 아버지의 대리석 관을 안치했다. 이건 로마의 가장 오래된 금기 중 하나를 깨는 일이었다. 성벽 안에 시신을 묻는 건 법으로 금지되어 있었으니까. 그런데도 예외가 인정됐다. 에페소스 시민들이 셀수스를 그만큼 존경했다는 뜻이다. 그러니까 이 건물은 도서관이면서 동시에 무덤이었다. 한 아들이 자기 슬픔을, 도시 전체를 위한 선물로 바꿔놓은 것이다."
          }
        }
      },
      {
        M: {
          text: {
            S: "100년 넘게 도서관은 번성했다. 그러다 262년, 훗날 로마 제국마저 무너뜨리는 데 한몫하게 될 북방의 고트족이 에페소스를 습격했다. 도서관 내부에 불이 붙었고, 12,000개의 두루마리는 전부 잿더미가 됐다. 이후 수백 년간 이어진 지진이 나머지마저 무너뜨렸고, 천 년이 넘도록 고대 세계 최고의 건축물 중 하나가 흙더미 속에 잠들어 있었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "1903년, 오스트리아 고고학자들이 이곳을 파기 시작했다. 흙 속에서 기둥 조각, 부서진 조각상, 정교한 장식들이 하나둘 모습을 드러냈다. 1970년부터 복원팀이 돌 하나하나를 원래 자리에 맞춰 넣기 시작했다. 거대한 고대 퍼즐이었다. 1978년, 마침내 정면이 다시 섰다. 복제품이 아니었다. 거의 2천 년 전 그 자리에 있던 바로 그 돌들이, 정확히 제자리로 돌아온 것이다."
          }
        }
      },
      {
        M: {
          text: {
            S: "호랑이는 죽어서 가죽을 남기고, 사람은 죽어서 이름을 남긴다고 했다. 셀수스는 이름보다 큰 걸 남겼다. 정확히는, 아들이 남겨줬다. 오늘날 셀수스 도서관은 에페소스의 상징이다. 매년 수백만 명이 그 정면을 사진에 담지만, 그 뒤에 아버지와 아들의 사랑 이야기가 잠들어 있다는 건 잘 모른다. 아퀼라는 황제에게 잘 보이려고 지은 게 아니었다. 떠난 아버지를 기리는 가장 좋은 방법이, 세상에 배움의 장소를 선물하는 것이라 믿었을 뿐이다. 2천 년이 지난 지금도 그 선물은 빛나고 있다."
          }
        }
      }
    ]
  },
  icon: { S: "📚" },
  tier: { S: "A" },
  source: { S: "Archaeological excavations; dedicatory inscriptions; Austrian Archaeological Institute records" },
  characters: {
    L: [
      { S: "Tiberius Julius Celsus Polemaeanus" },
      { S: "Gaius Julius Aquila" },
      { S: "Sophia" },
      { S: "Episteme" },
      { S: "Ennoia" },
      { S: "Arete" }
    ]
  },
  era: { S: "117-125 AD" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "27.3403" },
      lat: { N: "37.9394" }
    }
  },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
  updatedAt: { N: "1772122360" }
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)"
    });
    const result = await command.input;
    console.log("Pushing ko#library-celsus to Story table...");
    const response = await client.send(command);
    console.log("SUCCESS! HTTP Status:", response.$metadata.httpStatusCode);
    console.log("Record pushed: ko#library-celsus (ephesus)");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists! Use update instead.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
