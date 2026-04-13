import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Fields unchanged from English ───────────────────────────────────
const base = {
  siteId: "babylon",
  storyId: "writing-on-the-wall",
  icon: "\u270B",
  tier: "A",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 44.4209, lat: 32.5363 },
  hasAudio: false,
  isFree: true,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
  source: "Daniel 5 (biblical account of Belshazzar's feast); The Nabonidus Chronicle (BM 35382, British Museum); The Cyrus Cylinder (BM 90920, British Museum); Herodotus, Histories I.191 (fall of Babylon); Xenophon, Cyropaedia VII.5 (festival and river diversion); The Verse Account of Nabonidus (BM 38299); Beaulieu, Paul-Alain. The Reign of Nabonidus, King of Babylon 556-539 B.C., Yale University Press, 1989; Kuhrt, Am\u00e9lie. 'The Cyrus Cylinder and Achaemenid Imperial Policy,' Journal for the Study of the Old Testament 25, 1983; Collins, John J. Daniel: A Commentary on the Book of Daniel, Fortress Press, 1993",
  characters: [
    "Belshazzar -- crown prince of Babylon, regent in his father's absence",
    "Nabonidus -- the last king of Babylon, absent in Tayma for a decade",
    "Daniel -- Jewish exile who read the mysterious writing",
    "Cyrus the Great -- Persian king whose army conquered Babylon in a single night",
    "Gobryas (Ugbaru) -- Persian general who entered Babylon through the dry riverbed",
  ],
  era: "October 12, 539 BCE -- the night Babylon fell to Persia",
};

// ═══════════════════════════════════════════════════════════════════════
//  KOREAN (ko)
//  Proverb subverted: "세 번 찍어 안 넘어가는 나무 없다" — no tree
//  withstands three strikes of the axe. Here the three words on the
//  wall (numbered, weighed, divided) ARE the three strikes that felled
//  the mightiest empire on earth.
// ═══════════════════════════════════════════════════════════════════════
const koItem = {
  ...base,
  lang: "ko",
  langStoryId: "ko#writing-on-the-wall",

  title: "벽 위의 글씨",

  subtitle:
    "메네, 메네, 데겔, 우바르신 — 정체 모를 손이 궁전 벽에 제국의 사형선고를 써 내린 밤",

  excerpt:
    "바빌론 제국의 마지막 밤, 성벽 밖에는 페르시아 대군이 기다리고 있었다. 안에서 왕자는 귀족 천 명을 불러모아 잔치를 벌이며 예루살렘 성전에서 약탈한 금잔으로 술을 마셨다. 그때 허공에서 손이 나타나 벽 위에 제국의 최후를 써 내려갔다.",

  paragraphs: [
    {
      text: "이건 실화다. 고대 세계에서 가장 강력했던 제국이 전쟁이 아니라 술자리에서 무너졌다. 기원전 539년 10월 12일 밤, 성벽 위로 전차가 나란히 달릴 수 있을 만큼 두꺼운 성벽의 도시 바빌론이 함락됐다. 밖에는 페르시아 대군이 진을 치고 있었다. 그리고 안에서는? 와인을 따르고 있었다.",
    },
    {
      text: "진짜 문제는 성 밖의 적이 아니었다. 왕이 없었다. 바빌론의 마지막 왕 나보니두스는 10년 전에 수도를 떠나 천 킬로미터나 떨어진 사막 오아시스 타이마로 가버린 상태였다. 아들 벨사살에게 나라를 통째로 맡기고. 왕이 직접 주관해야 하는 가장 중요한 의식이 10년째 끊겼다. 사제들은 분노했고, 백성은 불안에 떨었고, 페르시아는 코앞까지 와 있었다.",
    },
    {
      text: "그 마지막 밤, 벨사살은 귀족 천 명을 불러 대연회를 벌였다. 그리고 역사에 남을 선택을 한다. 거의 50년 전, 바빌론 최고의 왕 네부카드네자르가 예루살렘 성전에서 뺏어 온 금은 잔을 가져오라 명한 것이다. 이스라엘의 신에게 바쳐진 거룩한 그릇이었다. 벨사살과 귀족들은 그 잔에 술을 가득 채워 돌과 금으로 만든 자기네 우상에게 건배했다.",
    },
    {
      text: "바로 그때였다. 팔도 몸도 없이, 사람의 손가락만 허공에서 나타나더니 궁전 벽에 글씨를 쓰기 시작했다. 벨사살은 그걸 눈앞에서 봤다. 얼굴이 하얗게 질리고 다리에 힘이 빠졌다. 바빌론의 모든 점쟁이와 학자를 불러모았지만 아무도 그 글씨를 읽지 못했다.",
    },
    {
      text: "그때 누군가 다니엘이라는 이름을 꺼냈다. 66년 전 소년 시절에 유대 땅에서 끌려온 포로, 이제는 백발의 노인이 된 사람이었다. 다니엘은 궁전에 들어와 포상을 거절하고 곧장 벽을 읽었다. '메네, 메네, 데겔, 우바르신.' 아람어로 된 이 단어들은 점점 작아지는 무게 단위이면서, 동시에 세 개의 동사였다. 세어졌다. 달아졌다. 나뉘었다. '당신의 나라는 오늘 밤으로 끝났습니다. 페르시아가 가져갑니다.'",
    },
    {
      text: "세 번 찍어 안 넘어가는 나무 없다더니 — 벽 위의 세 마디가 제국을 쓰러뜨린 도끼였다. 그날 밤, 페르시아의 키루스 대왕은 바빌론 한가운데를 관통하는 유프라테스 강의 물줄기를 상류에서 돌려버렸다. 수위가 낮아지자 병사들이 얕아진 강바닥을 걸어 성벽 아래 수문으로 스며들었다. 바빌론은 단 한 번의 전투도 없이 무너졌다.",
    },
    {
      text: "벨사살은 해가 뜨기 전에 죽었다. 키루스는 열일곱 날 뒤 바빌론에 입성했다. 파괴자가 아니라 해방자로서. 버려진 신전을 복원하고, 역사를 뒤바꿀 칙령을 내렸다. 거의 50년간 포로로 잡혀 있던 유대인들은 고향으로 돌아가 예루살렘 성전을 다시 세울 수 있게 됐다. 벨사살이 술잔으로 쓰던 성물도 원래 자리로 돌아갔다.",
    },
    {
      text: "모든 게 무너지기 직전에는 반드시 징조가 있다. 사방에 널려 있는데 정작 당사자만 못 본다. 이 이야기가 2,500년이 넘도록 살아남은 건, 그 순간을 이토록 선명하게 보여준 이야기가 달리 없기 때문이다. 제국은 끝을 예고하지 않는다. 잔치를 연다. 금잔에 술을 따른다. 그리고 어딘가, 아무도 읽으려 하지 않는 벽 위에 판결은 이미 쓰여 있다.",
    },
  ],

  moralOrLesson:
    "제국은 망할 때 경고장을 보내지 않는다. 잔치를 연다. 금잔에 술을 채운다. 성벽이 두꺼우니까, 수백 년을 버텼으니까, 설마 오늘 밤에 무너지겠냐며 안심한다. 하지만 역사는 자기만의 저울을 갖고 있다. 모든 왕국은 언젠가 그 위에 올려진다 — 메네, 데겔, 우바르신 — 세어졌고, 달아졌고, 나뉘었다. 글씨는 언제나 벽 위에 쓰여 있다. 문제는 그걸 읽을 만큼 깨어 있는 사람이 있느냐는 것이다.",
};

// ─── Push ─────────────────────────────────────────────────────────────
async function push(item, label) {
  // Safety check: don't overwrite English
  if (item.langStoryId.startsWith("en#")) {
    throw new Error("Refusing to overwrite English record!");
  }

  // Check for existing record
  const existing = await docClient.send(
    new GetCommand({ TableName: TABLE, Key: { siteId: item.siteId, langStoryId: item.langStoryId } })
  );
  if (existing.Item) {
    console.log(`⚠️  ${label} already exists — overwriting with updated version`);
  }

  await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log(`✅  ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
}

async function main() {
  try {
    await push(koItem, "Korean (ko)");
    console.log("\n🎉 Done — Korean story pushed to DynamoDB.");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

main();
