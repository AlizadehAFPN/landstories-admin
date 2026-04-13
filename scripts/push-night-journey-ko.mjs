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

// ─── KOREAN STORY: 하늘 끝에 닿은 밤 ──────────────────────────────────────────
// Proverb woven in: "하늘이 무너져도 솟아날 구멍이 있다"
// Subverted: "구멍이 아니라 하늘 전체가 열렸다"
// Register: modern Korean storyteller — vivid, rhythmic, conversational narrative

const title = "하늘 끝에 닿은 밤";

const subtitle =
  "모든 것을 잃은 예언자, 날개 달린 짐승, 그리고 일곱 하늘 너머의 만남";

const excerpt =
  "서기 619년, 이슬람에서 '슬픔의 해'라 부르는 시기다. 무함마드는 자신을 지켜주던 두 사람을 그해 모두 잃었다.";

const moralOrLesson =
  "가장 깊은 깨달음은 승리의 순간이 아니라 모든 것이 무너진 순간에 온다. 무함마드가 일곱 하늘을 받은 건 세상이 그를 환호할 때가 아니라 돌을 던질 때였다. 이 여정이 전하는 건 하나다—믿음으로 견뎌낸 절망은 끝이 아니라 문이 될 수 있다는 것.";

const paragraphs = [
  {
    text: "서기 619년, 이슬람에서 '슬픔의 해'라 부르는 시기다. 무함마드는 메카 권력자들이 두려워하는 믿음을 퍼뜨린 죄로 이미 쫓기는 몸이었다. 그해, 그를 지켜주던 두 사람이 차례로 떠났다. 먼저 삼촌 아부 탈리브—십 년 넘게 핏줄의 의리 하나로 그를 감싸온 방패. 그다음 아내 하디자—천사를 처음 마주하고 떨며 돌아온 남편을 안으며 \"하나님은 당신을 버리지 않을 거예요\"라고 말해준 사람. 방패도 없고, 쉴 곳도 없었다. 타이프라는 도시에 도움을 구하러 갔다. 돌아온 건 돌이었다. 피가 신발을 적셨다.",
  },
  {
    text: "하늘이 무너져도 솟아날 구멍이 있다고 했다. 그런데 무함마드에게는 구멍이 아니라 하늘 전체가 열렸다. 쉰 살, 피투성이, 혼자—바로 그 바닥에서 천사 지브릴이 나타났다. 곁에는 부라크라 불리는 날개 달린 짐승. 한 걸음이면 수평선 끝이었다. 무함마드는 단숨에 사막 천이백 킬로미터를 넘어 예루살렘 성전산에 내렸다.",
  },
  {
    text: "성전산. 아브라함이 아들 위에 칼을 들었던 언덕, 솔로몬이 성전을 올렸던 그 자리다. 그 안에 하나님이 보낸 모든 예언자가 서 있었다. 지브릴이 말했다. \"기도를 이끄시오.\" 마지막 예언자가 모든 예언자 앞에 섰다.",
  },
  {
    text: "그 바위—유대교에서 가장 성스러운 곳이 있던 바로 그 돌—에서 무함마드는 일곱 하늘을 관통했다. 첫째 하늘에 아담이 잃어버린 영혼들 앞에서 울고 있었다. 둘째에 예수와 세례 요한. 셋째에 \"아름다움의 절반을 받았다\"는 유수프. 여섯째에서 무사가 눈물을 흘렸다—무함마드의 공동체가 자기 것보다 커지리라는 걸 알았기 때문이다. 일곱째 하늘, 세 종교의 아버지 이브라힘이 천상의 카바에 기대어 미소 짓고 있었다.",
  },
  {
    text: "거기서부터는 혼자였다. 지브릴마저 멈췄다. \"한 발짝만 더 가면 저는 타버립니다.\" 창조의 끝을 지나 무함마드는 하나님 앞에 섰다. 명이 내려왔다—하루 쉰 번의 기도. 받아들이고 돌아오는 길에 무사가 막아섰다. \"네 백성은 못 감당하네. 내가 겪어봐서 알아.\" 다시 올라갔다. 마흔. 서른. 스물. 열. 마침내 다섯, 한 번이 열 번으로 치는 조건. 무사가 또 줄이라 했다. 무함마드가 답했다. \"부끄러워서 더는 못 구합니다. 이대로 받겠습니다.\"",
  },
  {
    text: "새벽이 오기 전에 메카로 돌아왔다. 잠자리는 아직 따뜻했다. 메카 지도자들이 코웃음 쳤다—하룻밤에 예루살렘을 다녀왔다고? 한 번도 가본 적 없는 그 도시를 묘사해 보라 했다. 하나님이 눈앞에 그 도시를 펼쳐주었고, 무함마드는 성문과 성벽과 건물을 정확히 짚었다. 대부분은 여전히 거짓말이라 했다. 하지만 절친 아부 바크르는 망설이지 않았다. \"그분이 그렇다 했으면, 그런 겁니다.\" 그날부터 그는 '알시디크'—'확인하는 자'라 불렸다. 제국들보다 오래 남은 이름이다.",
  },
  {
    text: "칠십 년 뒤, 칼리프 압둘말리크가 무함마드가 올라간 그 바위 위에 황금빛 바위의 돔을 세웠다. 성전산 서쪽 벽—유대인들이 통곡의 벽이라 부르는—을 무슬림은 부라크의 벽이라 불렀다. 그날 밤 정해진 다섯 번의 기도를 오늘날 이십억 명이 드리고 있다. 하룻밤의 여정이 예루살렘을 이슬람의 셋째 성지로 만들었다. 바위 하나. 믿음 셋. 같은 하늘을 향한 같은 손짓.",
  },
];

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION (KO) ===\n");

let totalChars = 0;
let allPass = true;

for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  totalChars += chars;

  const charOk = chars <= 400;

  if (!charOk) allPass = false;

  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "✓" : "✗ OVER"}`
  );
}

console.log(
  `\nTotal: ${totalChars} chars | ${paragraphs.length} paragraphs`
);
console.log(`Target: ~1000–1500 chars (±20% = 800–1800)`);
console.log(
  `Status: ${totalChars >= 800 && totalChars <= 1800 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── DYNAMODB PUT (new record) ──────────────────────────────────────────────

const now = Math.floor(Date.now() / 1000);

const item = {
  // ── Keys ──
  siteId: "jerusalem-old-city",
  langStoryId: "ko#night-journey-isra-miraj",
  storyId: "night-journey-isra-miraj",
  lang: "ko",

  // ── Korean fields ──
  title,
  subtitle,
  excerpt,
  moralOrLesson,
  paragraphs,

  // ── Preserved fields (from English record) ──
  characters: [
    "Prophet Muhammad",
    "Angel Jibril (Gabriel)",
    "The Buraq (celestial steed)",
    "Prophet Musa (Moses)",
    "Prophet Ibrahim (Abraham)",
    "Abu Bakr al-Siddiq",
  ],
  source:
    "Quran, Surah Al-Isra 17:1; Sahih al-Bukhari, Book of Merits of the Helpers, Hadith 3887 (Night Journey account); Sahih Muslim, Book of Faith, Hadith 162; Ibn Hisham, Al-Sirah al-Nabawiyyah (Life of the Prophet); al-Tabari, Tarikh al-Rusul wa'l-Muluk (History of Prophets and Kings); Creswell, K.A.C., Early Muslim Architecture (Dome of the Rock); Colby, Frederick, Narrating Muhammad's Night Journey, 2008; Vuckovic, Brooke Olson, Heavenly Journeys, Earthly Concerns, 2005",
  era: "c. 621 CE (the Isra and Mi'raj); 691 CE (Dome of the Rock construction)",
  icon: "🌙",
  image: "",
  thumbnail: "",
  tier: "S",
  storyCategory: "prophets_pilgrims",
  coordinates: { lat: 31.7777, lng: 35.2355 },
  readingTimeMinutes: 10,
  isFree: true,
  hasAudio: false,
  disabled: false,
  updatedAt: now,
};

const command = new PutCommand({
  TableName: "Story",
  Item: item,
  ConditionExpression:
    "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
});

try {
  await docClient.send(command);
  console.log("\n✓ Korean story pushed successfully to DynamoDB.");
  console.log(`  siteId: ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title: ${item.title}`);
  console.log(`  paragraphs: ${item.paragraphs.length}`);
  console.log(`  updatedAt: ${now}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.error(
      "\n✗ Korean record already exists! Use update instead of put."
    );
  } else {
    console.error("\n✗ DynamoDB push failed:", err.message);
  }
  process.exit(1);
}
