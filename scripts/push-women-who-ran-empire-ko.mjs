import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "persepolis" },
  langStoryId: { S: "ko#women-who-ran-the-empire" },
  storyId: { S: "women-who-ran-the-empire" },
  lang: { S: "ko" },
  title: { S: "제국을 돌린 여자들" },
  subtitle: { S: "궁전 벽 속 점토판 3만 장이 밝힌 진실 — 여자에게 같은 임금을 주고, 출산 수당을 보장하고, 왕을 만든 건 여왕들이었던 제국" },
  excerpt: { S: "23세기 동안 페르세폴리스 벽 속에 봉인되어 있던 점토판 3만 장. 그 안에는 그리스 역사가 누구도 기록하지 않은 사실이 있었다. 지구에서 가장 큰 제국이 여자에게 남자와 같은 임금을 줬고, 갓 아이를 낳은 엄마를 지원했고, 왕좌에 누가 앉을지 결정한 건 여왕이었다는 것." },
  icon: { S: "👑" },
  tier: { S: "A" },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1930년대, 이란 남부 페르세폴리스. 고대 페르시아 제국의 수도였던 궁전 벽을 뜯어냈더니 점토판 3만 장이 쏟아졌다. 내용은 회계 장부 — 누구한테 얼마를 줬는지, 곡물이 몇 가마인지. 세상에서 가장 지루한 문서. 그런데 누군가 그걸 제대로 읽기 시작하자 역사가 뒤집혔다. 지구에서 가장 큰 제국이 2,500년 전에 이미 남녀 동일 임금을 주고 있었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "점토판은 기원전 500년 무렵, 다리우스 대왕 시절 약 15년간의 기록이다. 제국 각지의 노동자 수천 명 — 페르시아인, 바빌로니아인, 이집트인, 그리스인, 인도인 — 이름, 직급, 임금이 빼곡했다. 그중 수백 명이 여자. 노예가 아니라 급여를 받는 전문직이자 관리자. 같은 일을 하면 남녀 구분 없이 같은 급여. 15년치 수천 건에 일관되게 적용된 국가 정책이었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "더 놀라운 건 따로 있다. 아이를 낳은 여성에게 추가 급여가 나갔다. 기원전 5세기에 국가가 운영하는 출산 수당이 존재했던 거다. 같은 시대 아테네에서는 여자가 남자 없이 외출조차 못 했다. 로마에서는 여자를 법적으로 평생 미성년자 취급했다. 그런데 그리스인들이 '야만인'이라 부르던 페르시아가 출산 복지를 돌리고 있었다. 서양이 비슷한 제도를 갖추려면 2천 년을 더 기다려야 했다."
          }
        }
      },
      {
        M: {
          text: {
            S: "꼭대기에는 진짜 거물이 있었다. '이르다바마'라는 여성은 점토판 수십 장에 걸쳐 등장한다. 대규모 농장을 굴리고, 수백 명을 지휘하고, 왕좌에 앉은 여성이 새겨진 개인 도장으로 거래를 승인했다. 총독급 규모의 곡물과 가축 거래. 그녀의 결정을 허락한 남편이나 아버지는 기록 어디에도 없다. 그녀 위에는 왕뿐이었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "하지만 진짜 판을 뒤집은 건 아토사였다. 페르시아 제국을 맨땅에서 세운 키루스 대왕의 딸. 왕 세 명과 차례로 결혼한 여자. 페르시아 여자를 거들떠보지도 않던 그리스 역사가 헤로도토스조차 아토사에 대해서만은 이렇게 썼다 — \"궁정의 모든 권력을 쥐고 있었다.\" 다리우스 왕이 후계자를 정해야 할 때, 아토사가 움직였다. 이복형들을 제치고 아들 크세르크세스를 왕좌에 앉혔다. 여자 한 명이 세계 최대 제국의 다음 왕을 정한 거다."
          }
        }
      },
      {
        M: {
          text: {
            S: "세 번 찍어 안 넘어가는 나무 없다고 했다. 그런데 이 진실은 정복자가 불을 질러도, 역사가들이 수백 년간 덮어도, 학자들이 눈앞에 놓고도 못 본 척해도, 23세기째 넘어지지 않았다. 학자들은 페르세폴리스를 보며 자기가 보고 싶은 것만 봤다. 아무 근거 없이 한 건물에 '크세르크세스의 하렘'이란 이름까지 붙였다. 하지만 점토판 속 왕실 여성들은 자유롭게 지방을 오가고, 연회를 열고, 영지를 관리하며, 막대한 재산을 쥐고 있었다."
          }
        }
      },
      {
        M: {
          text: {
            S: "역사를 쓴 건 그리스인이니, 페르시아는 폭군이 여자를 가둔 나라로 그려졌다. 진실은 23세기 동안 벽 속에 갇혀 있었다 — 알렉산드로스가 페르세폴리스에 지른 불이 오히려 점토판을 단단하게 구워준 덕에. 결국 시카고로 건너간 그 점토판을 리처드 핼록이란 학자가 수십 년에 걸쳐 해독했다. 곡물 영수증이 여성 인권 역사상 가장 혁명적인 문서가 된 거다. 거창한 선언문이 아니었다. 월급 명세서였다."
          }
        }
      }
    ]
  },
  moralOrLesson: { S: "2,400년 동안 서양은 페르시아 제국을 여자에게 아무 발언권도 없는 평범한 왕국으로 여겼다. 그러다 점토판 3만 장이 그 편견을 부숴버렸다. 여자에게 동일 임금을 주고, 출산 수당을 지급하고, 거대한 영지를 맡기고, 왕위까지 결정하게 한 제국. 증거는 늘 거기 있었다 — 벽 속에 봉인되고, 불에 단단히 구워진 채, 누군가 제대로 읽어줄 날만 기다리면서." },
  source: { S: "Hallock, R.T., Persepolis Fortification Tablets (1969); Henkelman, Wouter, The Other Gods Who Are (2008); Brosius, Maria, Women in Ancient Persia (1996); Koch, Heidemarie, Frauen und Schlangen (2002); Llewellyn-Jones, Lloyd, King and Court in Ancient Persia (2013); Herodotus, Histories III.133-134, VII.2-3; Aeschylus, The Persians (472 BCE); Briant, Pierre, From Cyrus to Alexander (2002)" },
  characters: {
    L: [
      { S: "Atossa (daughter of Cyrus, kingmaker)" },
      { S: "Irdabama (wealthy estate owner)" },
      { S: "Artystone (Darius's favorite wife)" },
      { S: "The women supervisors of the Fortification Tablets" },
      { S: "Richard Hallock (decipherer of the tablets)" }
    ]
  },
  era: { S: "509–494 BCE (Fortification Tablets); broader Achaemenid period 550–330 BCE" },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  updatedAt: { N: "1773602680" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "52.8914" },
      lat: { N: "29.9342" }
    }
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "lost_found" }
};

async function pushStory() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item
    });
    const result = await client.send(command);
    console.log("SUCCESS: Korean story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("siteId: persepolis");
    console.log("langStoryId: ko#women-who-ran-the-empire");
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
}

pushStory();
