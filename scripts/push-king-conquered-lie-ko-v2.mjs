import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: { S: "persepolis" },
  langStoryId: { S: "ko#king-who-conquered-the-lie" },
  lang: { S: "ko" },
  storyId: { S: "king-who-conquered-the-lie" },
  storyCategory: { S: "crowns_conquests" },
  icon: { S: "⚔️" },
  tier: { S: "S" },
  isFree: { BOOL: true },
  hasAudio: { BOOL: false },
  disabled: { BOOL: false },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  thumbnail: { S: "" },
  updatedAt: { N: String(now) },
  coordinates: {
    M: {
      lat: { N: "29.9342" },
      lng: { N: "52.8914" },
    },
  },
  source: {
    S: "The Behistun Inscription (DB), Old Persian text translated in Kent, R.G., Old Persian: Grammar, Texts, Lexicon (1953); Herodotus, Histories III.61-88; Briant, Pierre, From Cyrus to Alexander (2002); Waters, Matt, Ancient Persia: A Concise History (2014); Hallock, R.T., Persepolis Fortification Tablets (1969)",
  },
  era: {
    S: "기원전 522–518년 (다레이오스의 부상); 1835–1847년 (베히스툰 비문 해독)",
  },
  characters: {
    L: [
      { S: "다레이오스 1세 (대왕)" },
      { S: "가우마타 / 바르디야 (정체가 논란되는 왕)" },
      { S: "오타네스, 고브리아스, 그리고 다섯 명의 공모자" },
      { S: "아토사 (키루스 대왕의 딸)" },
      { S: "헨리 롤린슨 (비문 해독자)" },
    ],
  },
  title: { S: "거짓말이 세운 제국" },
  subtitle: {
    S: "'진실'이 전부라 외친 왕. 그런데 그 제국의 시작이 역사상 가장 대담한 거짓말이었다면?",
  },
  excerpt: {
    S: "기원전 522년, 귀족 일곱이 한밤중에 요새를 습격해 세계 최대 제국의 왕을 죽였다. 피 묻은 칼을 쥔 남자는 훗날 페르세폴리스를 세우고, 자기 범죄를 정당화하려 절벽 하나를 통째로 캔버스로 썼다.",
  },
  moralOrLesson: {
    S: "진실을 외친 건 거짓말쟁이였다. 그 거짓 위에 세워진 문명은 200년을 이어갔고, 대륙을 잇는 도로를 놓았고, 일한 만큼 대가를 치렀다. 때로 가장 위대한 진실은, 가장 대담한 거짓에서 태어난다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "기원전 522년. 페르시아 제국은 리비아에서 인도까지 뻗은, 인류 최대의 영토였다. 왕좌에는 키루스 대왕의 아들 바르디야. 제국 전역의 세금을 면제해 백성의 지지를 한몸에 받던 참이었다. 그런데 어느 밤, 귀족 일곱이 왕의 요새에 잠입한다. 어둠 속에서 한 남자가 왕을 바닥에 깔았고, 다레이오스는 칼을 들고도 망설였다—동료를 찌를까 봐. \u201C나까지 찔러도 좋으니 찔러!\u201D 칼이 왕의 몸에 꽂혔다. 잘린 머리가 군중 앞에 내걸렸다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "다레이오스는 왕족이 아니었다. 아무도 이름조차 모르던 하급 귀족. 그런데 이 남자가 다음에 한 일이 역사를 바꿔놓는다. 자그로스 산맥 절벽, 땅에서 백 미터 위에, 세 가지 언어로 역대 최대 규모의 비문을 새긴 것이다. 내용은 이랬다—죽은 자는 진짜 바르디야가 아니다. 가우마타라는 사제가 왕자 행세를 한 것이고, 다레이오스야말로 신이 택한 구원자다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "문제는, 이 이야기의 유일한 출처가 다레이오스 자신뿐이라는 점이다. 제국 전체가 바르디야를 진짜 왕으로 받아들였다. 세금 면제는 사기꾼이 아니라 진짜 왕이나 할 결정이다. 게다가 쿠데타 직후, 다레이오스는 키루스 대왕의 딸과 바르디야의 딸을 동시에 아내로 맞았다. 혈통을 잇는 게 아니라 삼키는 행동이다. 오늘날 학자들의 결론은 간단하다. 정당한 왕을 죽이고 이야기를 꾸며냈다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "제국도 안 속았다. 일 년 만에 열아홉 건의 반란이 터졌다. 심지어 바르디야를 자처하는 사람까지 나타났다. 하늘이 무너져도 솟아날 구멍이 있다고 했던가—다레이오스는 구멍조차 없었다. 대신 피로 뚫었다. 한 반란 지도자는 코와 귀와 혀가 잘리고, 한쪽 눈이 뽑힌 채 말뚝에 꿰어졌다. 메시지는 언제나 같았다. 이 자들은 '거짓'을 따른 자. 나에게 맞서는 것은 신에게 맞서는 것이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그런데—피와 거짓으로 올라선 이 남자가 놀라운 걸 만들어냈다. 페르세폴리스에서 수십 나라 출신의 노동자들이 정당한 임금을 받았다. 여성도 같은 보수. 임신하면 추가 배급까지 나왔다. 그가 놓은 도로는 어찌나 빠르던지, 헤로도토스가 적었다—\u201C눈도 비도 더위도 어둠도 이 전령을 막지 못한다.\u201D 2,400년 뒤, 미국 우체국이 이 문장을 그대로 자기네 표어로 쓴다. 거짓말쟁이가 진짜 믿을 만한 것을 만들어냈다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "절벽의 비문은 2천 년간 침묵했다. 1835년, 영국 장교 헨리 롤린슨이 그 절벽을 타기 시작했다. 사다리에 매달려 한 손으로 고대 문자를 베끼고, 가장 높은 곳에는 쿠르드족 소년을 밧줄로 내려보냈다. 12년이 걸렸다. 해독에 성공하자 고대 메소포타미아 전체의 문자가 열렸다—로제타석이 이집트 상형문자를 풀어낸 것과 같은 일이었다. 2천 년의 침묵 끝에, 다레이오스가 다시 입을 열었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "지금도 그는 절벽에 새겨져 있다. 적의 등을 밟고, 아홉 명의 반란왕을 무릎 꿇린 모습으로. 페르세폴리스의 기둥들은 여전히 이란 평원 위에서 하늘을 향해 서 있다. 모순에는 답이 없다. 진실을 외친 살인자. 믿을 만한 것을 남긴 거짓말쟁이. 역사상 가장 정교한 거짓말 위에 제국을 세운 남자—그리고 평생을 바쳐 그 거짓말을 현실로 만든 남자.",
          },
        },
      },
    ],
  },
};

async function push() {
  try {
    // Validate JSON structure
    const jsonStr = JSON.stringify(item);
    JSON.parse(jsonStr); // Will throw if invalid
    console.log("JSON validation passed ✓");
    console.log(`Total paragraphs: ${item.paragraphs.L.length}`);

    // Count approximate Korean characters
    const allText = item.paragraphs.L.map((p) => p.M.text.S).join("");
    console.log(`Total paragraph characters: ${allText.length}`);

    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });

    const result = await client.send(cmd);
    console.log("Push successful ✓");
    console.log(`HTTP status: ${result.$metadata.httpStatusCode}`);
    console.log(`langStoryId: ko#king-who-conquered-the-lie`);
    console.log(`updatedAt: ${now}`);
  } catch (err) {
    console.error("Push FAILED ✗");
    console.error(err);
    process.exit(1);
  }
}

push();
