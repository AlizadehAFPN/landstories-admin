import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "rila-monastery" },
  langStoryId: { S: "ko#wandering-relics" },
  lang: { S: "ko" },
  storyId: { S: "wandering-relics" },
  title: { S: "떠도는 유해 — 성인의 500년 여정" },
  subtitle: { S: "한 수도승의 뼈가 제국을 건너며 나라를 하나로 묶은 이야기" },
  excerpt: { S: "946년, 불가리아 릴라 산맥 깊은 동굴에서 이반이라는 수도승이 홀로 숨을 거뒀다. 제자들이 그를 발견했을 때, 눈을 의심했다. 시신이 전혀 썩지 않은 것이다." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "946년, 불가리아 릴라 산맥 깊은 동굴에서 이반이라는 수도승이 홀로 숨을 거뒀다. 제자들이 그를 발견했을 때, 눈을 의심했다. 시신이 전혀 썩지 않은 것이다. 동방정교회에서 이건 단 하나의 의미밖에 없다 — 하늘이 인정한 성인이라는 증거. 그의 유해는 곧 성물로 모셔졌다. 하지만 산속에서의 평화는 거기까지였다. 이반의 뼈는 이후 500년 동안 전쟁터를 떠돌 운명이었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "980년경, 불가리아 차르 사무일에겐 한 수가 필요했다. 당시 초강대국 비잔틴 제국이 사방에서 불가리아를 조여 오고 있었다. 중세 시대에 유명한 성인의 유해를 가지고 있다는 건, 하늘이 우리 편이라는 일종의 보증서였다. 사무일은 이반의 유해를 외진 릴라 동굴에서 수도 스레데츠 — 지금의 소피아 — 로 옮겼다. 죽은 수도승이 정치적 무기가 된 순간이었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "그런데 불가리아는 그마저도 잃었다. 1183년경, 헝가리와 벌인 전쟁 중에 이반의 유해가 헝가리 왕도 에스테르곰으로 실려 갔다. 전리품이었든 거래의 대가였든, 결과는 같았다. 불가리아의 가장 신성한 보물이 남의 나라 교회에 놓이게 된 것이다."
          }
        }
      },
      {
        M: {
          text: {
            S: "하지만 불가리아는 물러서지 않았다. 아센 형제가 대규모 봉기를 이끌어 외세를 몰아내고 제국을 다시 세웠다. 1195년경, 그들은 성인의 유해를 새 수도 터르노보로 모셔 왔다. 사람들이 길가에 늘어서 울고 환호했다. 이반의 귀환은 단순한 종교 행사가 아니었다 — 불가리아가 다시 살아 있다는 증거였다."
          }
        }
      },
      {
        M: {
          text: {
            S: "오래가지 못했다. 1396년, 오스만 제국이 불가리아를 완전히 삼켰다. 터르노보는 함락됐고, 교회는 파괴되거나 버려졌다. 수십 년 동안 이반의 유해는 폐허 속에 방치됐다. 행렬도, 축제도, 아무것도 없었다. 그저 침묵뿐이었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "여기서 이야기가 놀라운 방향으로 흘러간다. 오스만 지배가 70년을 넘긴 1469년, 크라토보라는 작은 마을 출신 세 형제가 나섰다. 이반의 유해를 그가 살고 죽은 릴라 수도원으로 돌려보내겠다고. '세 번 찍어 안 넘어가는 나무 없다'고 했던가. 하지만 이 나무는 달랐다. 몇 번을 찍혀도, 몇 세기를 떠돌아도 끝내 넘어지지 않았다. 소피아를 지날 때 수천 명이 거리로 쏟아져 나왔다. 점령당한 나라에서 자국의 성인을 기리는 건, 조용하지만 분명한 저항이었다. 나라는 빼앗을 수 있어도, 우리가 누구인지는 빼앗을 수 없다는 선언이었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "이반의 유해는 지금도 릴라 수도원에 있다. 천 년 전 그가 기도하며 살았던 바로 그 산속이다. 매년 불가리아 사람들은 성인의 뼈가 마침내 집으로 돌아온 그날을 기념한다. 산속 동굴에서 홀로 죽은 수도승 하나가, 500년의 전쟁과 정복과 생존을 관통하며 한 나라를 하나로 붙들어 놓았다. 유럽 역사상 가장 기이한 여정이라 불릴 만하다."
          }
        }
      }
    ]
  },
  moralOrLesson: { S: "신성한 것은 어떤 제국보다 오래간다 — 때로는 한 사람의 유해가 수백 년에 걸쳐 한 나라의 정체성을 붙들어 놓을 수 있다." },
  icon: { S: "⚱️" },
  tier: { S: "A" },
  source: { S: "Patriarch Euthymius, Vita; the Rila Charter; Bulgarian medieval chronicles" },
  characters: {
    L: [
      { S: "Saint Ivan of Rila (relics)" },
      { S: "Tsar Samuel" },
      { S: "Asen dynasty rulers" },
      { S: "Three brothers of Kratovo" }
    ]
  },
  era: { S: "Medieval Period (946-1469 AD)" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "23.34" },
      lat: { N: "42.1333" }
    }
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
  storyId: { S: "wandering-relics" }
};

async function push() {
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)"
    });
    const result = await client.send(cmd);
    console.log("SUCCESS — Korean story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Korean record already exists! Use update instead.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
