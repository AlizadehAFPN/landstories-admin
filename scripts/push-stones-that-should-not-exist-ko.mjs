import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

/* ── env ─────────────────────────────────────────────────────────── */
const envFile = readFileSync(
  new URL("../.env.local", import.meta.url),
  "utf-8"
);
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1]] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";

const timestamp = Math.floor(Date.now() / 1000);

// ════════════════════════════════════════════════════════════════════
//  KOREAN  (ko)
//  Proverb subverted: 세 번 찍어 안 넘어가는 나무 없다
//  → "그런데 이 돌 앞에서는 그 말이 안 통했다"
// ════════════════════════════════════════════════════════════════════
const ko = {
  siteId: "baalbek",
  storyId: "stones-that-should-not-exist",
  langStoryId: "ko#stones-that-should-not-exist",
  lang: "ko",
  title: "있을 수 없는 돌",
  subtitle:
    "수백 년간 설명을 거부한 팔백 톤의 돌 세 개, 그리고 인류가 깎아낸 가장 거대한 돌을 품은 채석장",
  excerpt:
    "레바논의 벽 속에 돌 세 개가 박혀 있다. 하나에 팔백 톤. 맞닿은 틈에 면도날 한 장 들어가지 않는다. 접착제도 시멘트도 없다. 그리고 수백 년간, 어떤 설명도 없었다.",
  moralOrLesson:
    "야망의 크기는 완성한 것이 아니라 감히 시작한 것이 말해준다. 로마인들은 인류 역사상 가장 거대한 돌을 다듬다 말고 떠났다. 이천 년이 지난 지금도 우리는 여전히 묻는다 — 대체 뭘 지으려 했던 걸까.",
  paragraphs: [
    {
      text: "레바논 바알베크에 벽 하나가 서 있다. 그 벽의 기초를 이루는 돌이 세 개다. 하나에 팔백 톤. 로마 제국이 세운 가장 큰 신전, 유피테르 신전의 기초석이다. 셋이 맞닿은 틈이 어찌나 정밀한지 면도날 한 장 들어갈 자리가 없다. 접착제도 시멘트도 없다. 그저 석회암과 석회암이 중력 하나로 맞물려 이천 년을 버티고 있다. 이름 한 줄 남기지 않은 기술자들의 솜씨다.",
    },
    {
      text: "수백 년 동안 이 돌들이 어떻게 거기 놓였는지 아는 사람은 아무도 없었다. 수수께끼가 너무 거대해서 어떤 합리적 설명도 통째로 삼켜버렸다. 아랍 전설에서는 아담의 아들 카인이 거인들의 힘을 빌려 도시를 세웠다 했고, 이슬람 전승에서는 솔로몬 왕이 부린 초자연적 존재 '진'이 돌을 날랐다고 전했다. 19세기에는 영국 탐험가가 \"선사시대 코끼리를 크레인처럼 썼을 것\"이라고 진지하게 주장하기까지 했다.",
    },
    {
      text: "1867년, 마크 트웨인이 이 벽 앞에 섰다. 한참 올려다보고는 이렇게 적었다. \"저 거대한 돌덩이들이 채석장에서 어떻게 옮겨졌는지, 그 수수께끼를 푼 사람은 없다.\" 과장이 아니었다. 채석장은 팔백 미터 밖에 있다. 엔진도, 강철도, 그 무게를 견딜 바퀴도 없던 이천 년 전에 팔백 톤짜리 돌이 그 거리를 건너왔다. 그런데도 돌은 거기 있다.",
    },
    {
      text: "답은 1977년에 나왔다. 프랑스 건축가 장피에르 아당이 직접 계산을 해본 것이다. 캡스턴이라 불리는 회전 드럼 열여섯 대, 하나마다 서른두 명이 돌린다. 삼베 밧줄과 도르래로 연결. 총 인원 오백열두 명. 채석장에서 신전까지는 완만한 내리막이라 중력이 힘을 보탰다. 그 불가능해 보이는 틈 없는 이음새? 돌의 가장자리만 완벽하게 평평히 갈아낸 로마식 기법이었다. 외계인도 아니고 거인도 아니다. 그저 로마가 로마답게 해낸 일이다.",
    },
    {
      text: "하지만 채석장에는 더 큰 비밀이 묻혀 있었다. 이천 년 동안 반쯤 땅에 파묻힌 채 누워 있던 미완성 돌 하나. '임산부의 돌'이라 불리는 석재다. 천 톤. 벽에 박힌 세 돌보다 더 무겁다. 바위에서 거의 잘라냈지만 끝내 옮기지 못했다. 작업 중 금이 갔을 수도, 전염병이 돌았을 수도, 돈이 바닥났을 수도 있다. 진짜 이유는 아무도 모른다.",
    },
    {
      text: "세 번 찍어 안 넘어가는 나무 없다고 했다. 그런데 이 돌 앞에서는 그 말이 안 통했다. 이름의 유래는 이렇다. 한 임산부가 바알베크 사람들에게 선언했다. \"나는 이 돌을 옮기는 비법을 알고 있어요. 대신 아이를 낳을 때까지만 먹여주세요.\" 사람들이 받아들였다. 아홉 달, 잘 먹었다. 아이가 태어나자 그녀는 털어놓았다. 사실 아무것도 모른다고. 민담 역사상 가장 당당한 허풍이었을지도 모른다.",
    },
    {
      text: "그러다 2014년, 판이 뒤집혔다. 고고학자 자닌 압둘 마시 박사의 팀이 '임산부의 돌' 아래를 파 들어가다 아무도 예상 못 한 것과 맞닥뜨렸다. 또 하나의 돌. 인류가 깎아낸 그 어떤 것보다 거대한 돌이었다. 길이 거의 이십 미터. 폭 육 미터. 높이 오 미터 이상. 천육백오십 톤. 짐을 가득 실은 보잉 747 네 대보다 무겁다. 인류 역사상 가장 큰 가공석이 로마 황제의 시대부터 땅속에 잠들어 있었다.",
    },
    {
      text: "바닥에 닿지도 못했다. 압둘 마시 박사는 채석장에 서서 이렇게 말했다. \"우리는 아직 이 돌의 전체 크기조차 모릅니다.\" 이천 년 전, 로마의 기술자들은 이 바위를 보고 생각했다. '쓸 수 있겠다.' 다듬고, 표면을 매끄럽게 갈고, 운반까지 준비했다. 그리고 영원히 떠나버렸다. 그들이 남기고 간 것은 실패의 흔적이 아니다. 인류가 바위에서 깎아낸 가장 거대한 것이, 그보다 더 거대한 무언가를 위한 것이었다는 증거다.",
    },
  ],
  characters: [
    "Jean-Pierre Adam (French architect-archaeologist)",
    "Dr. Jeanine Abdul Massih (Lebanese University archaeologist)",
    "The Roman engineers of Colonia Heliopolis",
    "The Pregnant Woman of the Legend",
    "Mark Twain (visiting author, 1867)",
  ],
  coordinates: { lat: 34.0069, lng: 36.2039 },
  disabled: false,
  era: "c. 27 BCE \u2013 60 CE (Trilithon construction); 2014 (discovery of the largest carved stone in history)",
  hasAudio: false,
  icon: "\u{1FAA8}",
  image: "",
  isFree: true,
  readingTimeMinutes: 3,
  source:
    "Adam, Jean-Pierre. \u2018A propos du trilithon de Baalbek,\u2019 Syria Vol. 54, 1977; Abdul Massih, Jeanine & German Archaeological Institute, 2014 excavation reports; Kalayan, Haroutune. \u2018The Engraved Drawing on the Trilithon,\u2019 1969; Twain, Mark. The Innocents Abroad, 1869; Archaeology Magazine, March/April 2015; Guinness World Records, Largest Megalith from Antiquity",
  storyCategory: "mysteries_enigmas",
  thumbnail: "",
  tier: "S",
  updatedAt: timestamp,
};

// ════════════════════════════════════════════════════════════════════
//  PUSH + VERIFY
// ════════════════════════════════════════════════════════════════════
async function push(label, item) {
  console.log(`\n\u23F3 Pushing ${label} (${item.langStoryId}) ...`);
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`\u2705 ${label} pushed successfully.`);
  } catch (err) {
    console.error(`\u274C ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

async function verify(label, siteId, langStoryId) {
  const res = await doc.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId, langStoryId },
    })
  );
  if (res.Item) {
    console.log(
      `   \u2714 Verified ${label}: title = "${res.Item.title}", paragraphs = ${res.Item.paragraphs.length}`
    );
  } else {
    console.error(`   \u2718 Verification FAILED for ${label} \u2014 item not found!`);
    process.exit(1);
  }
}

(async () => {
  console.log(`Timestamp: ${timestamp}`);

  // Validate JSON structure before push
  const requiredFields = [
    "siteId", "storyId", "langStoryId", "lang", "title", "subtitle",
    "excerpt", "moralOrLesson", "paragraphs", "characters", "coordinates",
    "era", "source", "storyCategory", "tier", "updatedAt",
  ];
  for (const f of requiredFields) {
    if (ko[f] === undefined || ko[f] === null) {
      console.error(`\u274C Missing required field: ${f}`);
      process.exit(1);
    }
  }
  console.log(`\u2705 All ${requiredFields.length} required fields present.`);
  console.log(`   Paragraphs: ${ko.paragraphs.length}`);
  console.log(`   Lang: ${ko.lang}`);
  console.log(`   LangStoryId: ${ko.langStoryId}`);

  await push("Korean", ko);
  await verify("Korean", ko.siteId, ko.langStoryId);

  console.log("\n\uD83C\uDF89 Korean version pushed and verified successfully!");
})();
