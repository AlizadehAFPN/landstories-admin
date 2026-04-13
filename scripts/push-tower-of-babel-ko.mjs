// Push Korean recreation of "The Tower That Touched Heaven"
// to the Story DynamoDB table.
//
// Proverb: "세 번 찍어 안 넘어가는 나무 없다" (No tree survives three chops — persistence always wins)
// Subverted: "세 번 찍어 안 넘어가는 나무가 없다지만, 이 탑은 세 번을 살려도 결국 쓰러졌다."
//   (They say no tree survives three chops, but this tower fell even after being raised three times.)
// Register: Modern Korean storytelling — think 설민석-style YouTube history narration or
//   a gripping podcast episode. Plain narrative -다 form with direct reader address.
//   Not academic, not casual texting. A skilled narrator holding your attention.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const ko = {
  siteId: "babylon",
  storyId: "tower-of-babel",
  lang: "ko",
  langStoryId: "ko#tower-of-babel",
  icon: "🗼",
  storyCategory: "prophets_pilgrims",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 5,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 32.5363, lng: 44.4209 },
  source:
    "Genesis 11:1-9 (Tower of Babel narrative); George, Andrew R. 'A Stele of Nebuchadnezzar II,' Cuneiform Royal Inscriptions and Related Texts in the Schøyen Collection, Cornell University Studies in Assyriology and Sumerology 17, 2011; Herodotus, Histories, Book I.178-183; The Esagila Tablet (AO 6555, Louvre); 'Enmerkar and the Lord of Aratta' (Sumerian poem, c. 2100 BCE); Koldewey, Robert. The Excavations at Babylon, 1914; George, Andrew R. Babylonian Topographical Texts, Orientalia Lovaniensia Analecta 40, 1992; Strabo, Geography XVI.1.5 (Alexander's clearing of the ziggurat); Wiseman, D.J. Nebuchadrezzar and Babylon, Oxford University Press, 1985",
  era: "c. 610-562 BCE (Nebuchadnezzar's reconstruction); Genesis account undated; archaeological remains excavated 1899-1917",
  updatedAt: now,

  title: "하늘에 닿은 탑",

  subtitle:
    "성경 속 가장 대담한 도전 뒤에 숨은 진짜 건축물 — 그리고 신이 직접 내려온 이유",

  excerpt:
    "고대 바빌론의 한복판, 유프라테스강이 지상 최대의 도시를 가르던 그곳에, 하늘을 향해 치솟은 건축물이 있었다. 인류 역사상 가장 유명한 미완성 건물이 된 것은, 기술이 부족해서가 아니라 — 인간의 오만에 대해 전해지는 가장 오래된 이야기에 따르면, 신이 직접 내려와 막았기 때문이다.",

  characters: [
    "네부카드네자르 2세 — 지구라트 에테메난키를 완성한 바빌론의 왕",
    "헤로도토스 — 기원전 460년경 탑을 직접 보고 기록한 그리스 역사가",
    "알렉산드로스 대왕 — 기원전 331년 만 명의 병사로 잔해 정리를 시도한 정복자",
    "로베르트 콜데바이 — 1899년 탑의 기초를 발굴한 독일 고고학자",
    "앤드루 조지 — 2011년 바벨탑 비석을 공개한 아시리아학자",
  ],

  moralOrLesson:
    "이 탑은 애초에 높이가 목적이 아니었다. 하나 된 인류, 그리고 하나 된 인류가 보여줄 수 있는 가능성에 대한 두려움이 핵심이었다. 지구 위 모든 언어는 그 원래의 하나였던 것에서 갈라진 조각이고, 모든 번역은 신이 부순 것을 다시 맞추려는 시도다. 어쩌면 교훈은 인간이 하늘에 손 뻗지 말라는 게 아니라, 뻗는 행위 자체가 도달보다 중요하다는 것일지 모른다. 흩어진 말들이 빚어낸 아름다움은, 하나의 언어가 평생 만들어낼 수 있는 것보다 훨씬 크니까.",

  paragraphs: [
    {
      text: "모든 사람이 같은 말을 쓰던 세상을 떠올려 보자. 창세기 11장은 그렇게 시작한다. 노아의 후손들이 지금의 이라크 남부, 티그리스강과 유프라테스강 사이 평원에 당도한다. 돌도 없고 나무도 없다. 오직 진흙뿐. 그래서 강가 흙으로 벽돌을 빚어 불에 굽고, 땅에서 저절로 솟아오르는 천연 타르로 붙인다. 그리고 이 한마디를 던진다. \u201C꼭대기가 하늘에 닿는 탑을 세우자.\u201D",
    },
    {
      text: "놀라운 건, 그 탑이 실재했다는 거다. 이름은 에테메난키. 수메르어로 \u2018하늘과 땅의 기초 신전\u2019이라는 뜻이다. 바빌론 한복판에 서 있었다. 1899년 독일 고고학자 로베르트 콜데바이가 발굴했을 때, 성경 묘사 그대로였다. 한 변 91미터짜리 정사각형 기단. 불에 구운 벽돌과 타르. 수백 년에 걸친 증축 끝에 기원전 600년경, 네부카드네자르 2세 때 절정에 달했다. 왕이 직접 새긴 비문에 이렇게 적혀 있다. \u201C나는 이 탑의 꼭대기를 하늘과 겨루게 했노라.\u201D",
    },
    {
      text: "7층짜리 거대한 구조물. 꼭대기 벽돌에 입힌 파란 유약이 햇살에 번쩍였다. 최상층에는 바빌론의 으뜸 신 마르두크의 신전이 있었다. 높이 약 91미터, 자유의 여신상과 비슷하다. 탁자처럼 평평한 벌판 위라 50킬로미터 밖에서도 보였다. 산이 없는 나라에 인간이 산을 만든 것이다. 기원전 460년경 그리스 역사가 헤로도토스가 직접 보고 기록했다. 꼭대기에서 매일 밤 여사제 한 명이 홀로 잠들며 신의 방문을 기다렸다고. 그리스인들마저 할 말을 잃었다.",
    },
    {
      text: "\u2018바벨\u2019이란 이름 자체가 모욕이다. 바빌론 사람들은 자기 도시를 \u2018바브일리\u2019, 즉 \u2018신의 문\u2019이라 불렀다. 그런데 히브리 저자들이 \u2018발랄\u2019, 즉 \u2018뒤섞다\u2019와 연결시켜 버렸다. 신의 문이 혼돈의 땅이 된 거다. 그런데 이 이야기의 원조는 히브리인이 아니다. 기원전 2100년경 수메르 서사시에 이미 같은 줄거리가 나온다. 모든 인류가 한 언어를 쓰다가 신들이 그걸 뒤흔들었다는 것. 언어가 갈라진 기억은 성경보다 천 년은 앞선, 메소포타미아의 유산이다.",
    },
    {
      text: "건설자의 초상화도 남아 있다. 2011년 학자 앤드루 조지가 네부카드네자르 시대의 검은 돌 비석을 세상에 공개했다. 왕이 자기 탑 옆에 서서 건축 지팡이를 쥐고, 고개를 젖혀 꼭대기를 올려다본다. 완성된 탑의 모습을 담은 유일한 그림이다. 세상에서 가장 강한 자가, 자기 손으로 세운 것을 올려다보는데 — 그 표정은 돌에 새겨진 자부심 그 자체다.",
    },
    {
      text: "세 번 찍어 안 넘어가는 나무가 없다지만, 이 탑은 세 번을 살려도 결국 쓰러졌다. 수메르인이 터를 닦았고, 네부카드네자르가 하늘까지 끌어올렸고, 알렉산드로스 대왕이 살리려 했다. 기원전 331년 페르시아를 무너뜨리고 바빌론에 입성했을 때, 탑은 이미 허물어지고 있었다. 200년간 방치된 결과였다. 알렉산드로스는 만 명의 병사를 투입해 잔해를 치우게 했다. 두 달을 파도 거의 달라진 게 없었다. 그리고 기원전 323년, 네부카드네자르의 궁전에서 열병으로 숨을 거뒀다. 서른두 살이었다. 그 뒤로는 아무도 손대지 않았다.",
    },
    {
      text: "지금 그 자리에는 바그다드에서 남쪽으로 85킬로미터, 물이 찬 구덩이 하나만 남아 있다. 고대 세계 최대의 건축물이 서 있던 자리에 정사각형 웅덩이. 2019년 유네스코가 바빌론을 세계유산으로 지정했다. 하지만 이 탑의 진짜 기념비는 이라크에 없다. 지구 위 모든 언어 안에 있다. 서울의 아이와 상파울루의 아이가 같은 노을을 보면서, 그걸 나눌 단어가 단 하나도 없다는 사실 속에. 벽돌은 부서졌다. 타르는 수백 년 전에 바스러졌다. 하지만 혼란? 그건 영원하다.",
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────────────
async function main() {
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: ko }));
    console.log(`✅  Pushed ko#tower-of-babel  (updatedAt: ${now})`);
  } catch (err) {
    console.error("❌  Failed ko#tower-of-babel:", err.message);
    process.exit(1);
  }
}

main();
