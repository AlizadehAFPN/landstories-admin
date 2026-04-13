import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

const now = Math.floor(Date.now() / 1000);

// ─── KOREAN STORY: 가터 기사단의 탄생 ──────────────────────────────────────────
//
// Cultural anchor proverb: "하늘이 무너져도 솟아날 구멍이 있다"
// (Even if the sky falls, there's a hole to rise through)
// Subverted: Edward didn't just find a hole — he built an order of knighthood
// right where the sky had fallen.
//
// Register: Modern Korean storytelling — skilled podcast narrator / popular
// nonfiction. Natural, vivid, conversational but not sloppy. The kind of
// voice a 25-year-old Korean would hear on a quality history podcast.
// ─────────────────────────────────────────────────────────────────────────────

const item = {
  // ── Keys & identifiers (unchanged from English) ──
  siteId: "windsor-castle",
  langStoryId: "ko#order-of-the-garter",
  lang: "ko",
  storyId: "order-of-the-garter",

  // ── Korean text fields ──
  title: "가터 기사단의 탄생",
  subtitle: "무도회장에 떨어진 가터 하나가 만든 세계 최고의 기사 작위",
  excerpt:
    "옷에 작은 사고 하나가 역사상 가장 명예로운 기사단을 만들었다면 믿겠는가. 1348년, 잉글랜드. 에드워드 3세는 크레시 전투에서 프랑스를 박살 낸 전쟁의 왕이었다. 그런 왕이 윈저 성에서 성대한 무도회를 열었다.",

  moralOrLesson:
    "진정한 기품이란 남의 수치를 함께 비웃는 것이 아니라, 그 수치를 명예로 바꿔주는 것이다 — 한 순간의 품격이 수백 년의 전통을 만들 수 있다",

  characters: [
    "에드워드 3세 — 잉글랜드 왕, 가터 기사단 창설자",
    "켄트의 조앤 — 당대 잉글랜드 최고의 미인, 떨어진 가터의 주인공",
    "흑태자 에드워드 — 창립 기사, 유럽에서 가장 두려운 전사",
    "헨리 그로스몬트, 랭커스터 공작 — 창립 기사",
    "존 챈도스 경 — 창립 기사이자 뛰어난 전략가",
    "아서 왕 — 원탁의 기사 전설의 주인공, 기사단의 모델",
  ],

  paragraphs: [
    {
      text: "옷에 작은 사고 하나가 역사상 가장 명예로운 기사단을 만들었다면 믿겠는가. 1348년, 잉글랜드. 에드워드 3세는 크레시 전투에서 프랑스를 박살 낸 전쟁의 왕이었다. 그런 왕이 윈저 성에서 성대한 무도회를 열었다. 기사들, 귀족들, 잉글랜드에서 내로라하는 인물들이 다 모였다. 술이 돌고, 음악이 울리고, 모든 게 완벽했다. 그때까지는.",
    },
    {
      text: "무도회장 한가운데서 춤을 추던 사람은 켄트의 조앤. 당대 잉글랜드 최고의 미인이었고, 왕이 홀딱 반한 여인이라는 소문이 파다했다. 그런데 춤 도중 그녀의 가터 — 스타킹을 고정하려고 무릎 아래에 매는 비단 끈 — 가 스르르 미끄러져 바닥에 떨어졌다. 모두가 보는 앞에서. 14세기에 가터는 속옷이나 다름없었다. 오늘날로 치면 상상할 수 있는 최악의 옷 사고다. 연회장이 웃음바다가 됐다.",
    },
    {
      text: `그 순간 왕이 움직였다. 에드워드 3세는 천천히 무도회장을 가로질러 걸어갔다. 허리를 숙여 가터를 집어 들었다. 웃음이 뚝 멈췄다. 왕은 비웃던 얼굴들을 하나하나 둘러본 뒤, 그 파란 비단 끈을 자기 다리에 묶었다. 그리고 프랑스어로 여섯 단어를 내뱉었다. "Honi soit qui mal y pense." — 이것을 나쁘게 생각하는 자에게 수치를.`,
    },
    {
      text: "단 한 번의 행동으로 판이 뒤집어졌다. 한 여인의 수치를 왕이 통째로 뒤엎어 버린 것이다. 에드워드는 선언했다 — 이 가터가 새로운 기사단의 상징이 될 것이며, 지금 웃은 자들이 언젠가 이걸 달라고 무릎 꿇게 될 거라고. 빈말이 아니었다. 하늘이 무너져도 솟아날 구멍이 있다고 했던가. 에드워드는 하늘이 무너진 바로 그 자리에, 구멍이 아니라 기사단을 세웠다. 가터 기사단. 700년이 지난 지금까지 세계에서 가장 오래되고, 가장 명예로운 기사 작위다.",
    },
    {
      text: "에드워드가 본보기로 삼은 건 아서 왕의 원탁이었다. 14세기 사람들은 아서 왕 전설을 실제 역사처럼 믿었다. 기사단 정원을 24명으로 딱 잘라 정한 것도 원탁의 기사 수를 따른 것이다. 본거지는 윈저 성. 하지만 이건 이름뿐인 명예직이 아니었다. 창립 기사들은 잉글랜드에서 가장 무서운 전사들이었다. 왕의 아들 흑태자 에드워드는 유럽 전체가 두려워하는 장수였다. 연회장이 아니라 전장에서 증명한 자들만 들어갈 수 있었다.",
    },
    {
      text: "기사단의 심장부는 윈저 성 안의 세인트 조지 예배당이다. 열 명의 왕과 여왕이 잠든 고딕 양식의 걸작. 안에는 1348년부터 지금까지 모든 기사의 문장이 새겨진 자리가 줄지어 있고, 그 위로 화려한 깃발들이 걸려 있다. 매년 6월이면 새 기사들이 파란 벨벳 예복에 커다란 흰 깃털 모자를 쓰고 성을 행진한다. 판타지 소설에서 튀어나온 장면 같다. 관중은 여전히 환호한다. 700년 가까이 한 번도 끊기지 않았다.",
    },
    {
      text: "진짜 놀라운 건 이거다. 오늘날까지 가터 훈장은 영국 국왕만이 줄 수 있는 개인적인 선물이다. 총리도 끼어들 수 없고, 위원회도 없고, 정치도 없다. 오직 왕이 직접 고른다. 윈스턴 처칠이 이 훈장을 받았다. 나폴레옹을 꺾은 웰링턴 공작도 받았다. 이 모든 게 무도회장에서 벌어진 단 한 순간으로 거슬러 올라간다 — 한 여인의 수치를 이 땅 최고의 명예로 바꿔놓고, 감히 누가 뭐라 해보라고 맞선 왕의 그 순간으로.",
    },
  ],

  // ── Unchanged fields from English ──
  icon: "🎖️",
  image: "",
  thumbnail: "",
  era: "1348 AD — Present",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  hasAudio: false,
  disabled: false,
  readingTimeMinutes: 3,
  coordinates: { lat: 51.4838, lng: -0.6073 },
  source:
    'Jean Froissart\'s "Chroniques" (c. 1370s), Elias Ashmole\'s "The Institution, Laws and Ceremonies of the Most Noble Order of the Garter" (1672), Lisa Jefferson\'s scholarly research on the Order\'s founding, Historic Royal Palaces archives',
  updatedAt: now,
};

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION (Korean) ===\n");

let totalChars = 0;
for (let i = 0; i < item.paragraphs.length; i++) {
  const text = item.paragraphs[i].text;
  const chars = text.length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars`);
}

console.log(
  `\nTotal: ${totalChars} chars | ${item.paragraphs.length} paragraphs`
);
console.log(`Target: ~1000–1500 chars (±20% → 800–1800)`);
const inRange = totalChars >= 800 && totalChars <= 1800;
console.log(`Status: ${inRange ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`);

if (!inRange) {
  console.error("\n✗ Total character count out of range. Aborting.");
  process.exit(1);
}

// ─── PUSH TO DYNAMODB ───────────────────────────────────────────────────────

const command = new PutCommand({
  TableName: "Story",
  Item: item,
  ConditionExpression:
    "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
});

try {
  await docClient.send(command);
  console.log("\n✓ Korean story pushed successfully to DynamoDB!");
  console.log(`  siteId:       ${item.siteId}`);
  console.log(`  langStoryId:  ${item.langStoryId}`);
  console.log(`  title:        ${item.title}`);
  console.log(`  subtitle:     ${item.subtitle}`);
  console.log(`  paragraphs:   ${item.paragraphs.length}`);
  console.log(`  totalChars:   ${totalChars}`);
  console.log(`  updatedAt:    ${item.updatedAt}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.log(
      "\n⚠ Record already exists. Updating with PutCommand (overwrite)..."
    );
    // Retry without condition
    const retryCommand = new PutCommand({
      TableName: "Story",
      Item: item,
    });
    try {
      await docClient.send(retryCommand);
      console.log("✓ Korean story updated successfully!");
      console.log(`  siteId:       ${item.siteId}`);
      console.log(`  langStoryId:  ${item.langStoryId}`);
      console.log(`  title:        ${item.title}`);
      console.log(`  updatedAt:    ${item.updatedAt}`);
    } catch (retryErr) {
      console.error("\n✗ Retry failed:", retryErr.message);
      process.exit(1);
    }
  } else {
    console.error("\n✗ Push failed:", err.message);
    process.exit(1);
  }
}
