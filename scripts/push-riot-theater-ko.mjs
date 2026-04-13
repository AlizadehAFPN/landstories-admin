import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════
// KOREAN (ko)
// Proverb: "세 번 찍어 안 넘어가는 나무 없다"
// (No tree stands after three strikes — persistence wins)
// Subverted: 바울은 3년을 찍었고, 결국 그 나무는 넘어갔다.
// ═══════════════════════════════════════════════════════════════

const ko = {
  siteId: "ephesus",
  storyId: "saint-paul-riot",
  icon: "\u{1F3AD}",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  hasAudio: false,
  coordinates: { lat: 37.9392, lng: 27.3419 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 2,
  updatedAt: now,
  disabled: false,
  lang: "ko",
  langStoryId: "ko#saint-paul-riot",
  title: "극장이 뒤집어진 날",
  subtitle: "한 전도사의 설교가 부른 대소동",
  source: "사도행전 19:23-41",
  era: "서기 55-57년",
  characters: [
    "바울",
    "은세공사 데메트리오스",
    "가이우스",
    "아리스타르코스",
    "시 서기관",
  ],
  excerpt:
    "서기 1세기, 에페소스는 로마 제국에서 손꼽히는 대도시였다. 이 도시가 돌아가는 축은 딱 하나, 여신 아르테미스였다. 그녀의 신전은 고대 세계 7대 불가사의 중 하나였고, 지중해 곳곳에서 순례자들이 끊이지 않았다. 상인들은 은으로 만든 작은 신전 모형을 팔았고, 사제들은 제물을 거뒀다. 도시 전체가 '믿음'이라는 산업으로 먹고살았다. 그런데 바울이라는 남자가 나타나서, 이 신들은 진짜가 아니라고 말하기 시작했다.",
  moralOrLesson:
    "믿음 하나가 경제를 흔들고 제국을 바꾼다. 마음에서 시작된 것이 결국 세상을 뒤집는 법이다.",
  paragraphs: [
    {
      text: "서기 1세기, 에페소스는 로마 제국에서 손꼽히는 대도시였다. 이 도시가 돌아가는 축은 딱 하나, 여신 아르테미스였다. 그녀의 신전은 고대 세계 7대 불가사의 중 하나였고, 지중해 곳곳에서 순례자들이 끊이지 않았다. 상인들은 은으로 만든 작은 신전 모형을 팔았고, 사제들은 제물을 거뒀다. 도시 전체가 '믿음'이라는 산업으로 먹고살았다. 그런데 바울이라는 남자가 나타나서, 이 신들은 진짜가 아니라고 말하기 시작했다.",
    },
    {
      text: "바울은 지나가는 나그네가 아니었다. 서기 53년에서 57년까지, 거의 3년을 에페소스에 머물렀다. 그리고 그의 설교는 무섭도록 잘 먹혔다. 개종하는 사람이 쏟아졌고, 은으로 된 신상은 안 팔리기 시작했고, 신전을 찾는 발길도 뜸해졌다. 아르테미스를 진심으로 모시는 사람들에게는 불쾌한 일이었다. 하지만 여신의 모습을 만들어 파는 걸로 먹고사는 사람들에게? 이건 밥줄이 끊기는 문제였다.",
    },
    {
      text: "은세공사 데메트리오스가 먼저 나섰다. 아르테미스 신전 모형을 만들어 파는 장인 — 바울이 오기 전까지는 든든한 사업이었다. 그는 같은 업종의 장인들을 전부 불러 모아 대놓고 말했다. \"이 외지인이 우리 삶을 무너뜨리고 있다. 사람 손으로 만든 신은 신이 아니라고 떠들고 다닌다. 이 말이 퍼지면 우리 생계도, 신전도, 이 도시 자체도 끝이다.\"",
    },
    {
      text: "효과는 즉각적이었다. 장인들은 완전히 폭발했다. 바울의 동행 가이우스와 아리스타르코스를 붙잡아 끌고 에페소스의 대극장으로 몰려갔다. 언덕을 깎아 만든 거대한 원형극장, 2만 5천 명이 들어차는 그 공간이 순식간에 꽉 찼다. 군중은 한 문장을 반복했다. \"위대하신 에페소스의 아르테미스!\" 두 시간 동안, 쉬지 않고.",
    },
    {
      text: "바울은 직접 극장에 걸어 들어가겠다고 했다. 동료들이 필사적으로 막았다. 그를 아는 시 관리들도 급히 전갈을 보냈다 — 절대 들어가지 마라. 그들이 옳았다. 그 군중은 이미 대화가 통하는 상태가 아니었다. 사실 극장 안에 있는 사람 대부분은 왜 자기가 거기 있는지조차 몰랐다. 그저 무언가에 화가 나 있다는 것만 알았을 뿐이다.",
    },
    {
      text: "결국 상황을 끝낸 건 관료 한 명이었다. 에페소스의 최고 행정관이 군중 앞에 서서, 성경에 기록된 연설 중 가장 현실적인 말을 했다. 아르테미스가 진짜 여신이라면 폭도가 되어서 지킬 필요가 없다. 그리고 로마가 이 소동 소식을 들으면 우리 도시의 자치권을 거둬갈 것이다. 불만이 있으면 법정에 가라. 군중은 조용히 집으로 돌아갔다.",
    },
    {
      text: "세 번 찍어 안 넘어가는 나무 없다고 했던가. 바울은 3년을 찍었고, 결국 그 나무는 넘어갔다. 2만 5천 명이 목이 터져라 외친 여신의 신전은 오늘날 잔해뿐이다. 밥줄을 지키겠다며 들끓었던 은세공사의 이름은 역사 한 줄로 남았다. 하지만 바울 — 그 모든 소동의 한가운데 있던 남자는 — 그들이 지키려 했던 모든 것을 대체한 믿음을 세상에 퍼뜨렸다. 그 극장은 아직도 에페소스에 서 있다. 같은 자리에 앉아 보라. 이미 저물어가던 세상을 향해 외치던 수천 명의 함성이, 아직도 귓가에 울릴 테니.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════

async function pushStory(story) {
  const label = `${story.lang} — ${story.title}`;
  console.log(`\nPushing: ${label}`);
  console.log(`  siteId: ${story.siteId}`);
  console.log(`  langStoryId: ${story.langStoryId}`);
  console.log(`  paragraphs: ${story.paragraphs.length}`);

  // Validate before push
  if (!story.siteId || !story.langStoryId || !story.lang || !story.title) {
    throw new Error(`Missing required fields for ${label}`);
  }
  if (!story.paragraphs || story.paragraphs.length < 6) {
    throw new Error(
      `Too few paragraphs for ${label}: ${story.paragraphs.length}`
    );
  }
  for (let i = 0; i < story.paragraphs.length; i++) {
    const p = story.paragraphs[i];
    if (!p.text || p.text.length === 0) {
      throw new Error(`Empty paragraph ${i} for ${label}`);
    }
  }

  const totalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  total chars: ${totalChars}`);

  // Char-count per paragraph
  story.paragraphs.forEach((p, i) => {
    console.log(`    p${i}: ${p.text.length} chars`);
  });

  await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: story,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );

  console.log(`  SUCCESS: ${label} pushed.`);
}

async function main() {
  try {
    await pushStory(ko);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  SKIPPED (already exists): ${ko.langStoryId}`);
    } else {
      console.error(`  FAILED: ${ko.lang} — ${err.message}`);
      throw err;
    }
  }

  console.log("\n=== DONE ===");
}

main().catch((err) => {
  console.error("\nFATAL:", err);
  process.exit(1);
});
