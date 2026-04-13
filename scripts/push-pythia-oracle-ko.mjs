// Push "The Pythia — Voice of Apollo" — Korean (ko) version
// Recreated as native Korean storytelling, not translated

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const ko = {
  siteId: "delphi",
  storyId: "pythia-oracle",
  langStoryId: "ko#pythia-oracle",
  lang: "ko",

  title: "피티아 — 아폴론의 목소리",
  subtitle: "천 년간 신의 입이 된 여사제",
  excerpt:
    "천 년이 넘도록 고대 세계에서 가장 두려운 존재는 왕이 아니었다. 장군도 아니었다. 그리스 델포이 신전 깊은 곳, 빛 한 줄기 들지 않는 지하 방에 홀로 앉은 한 여자였다.",
  moralOrLesson:
    "신탁은 한 번도 거짓말을 하지 않았다. 다만 진실에 두 가지 뜻을 담았을 뿐이다. 그 뜻을 제대로 읽으려면 신전 입구에 새겨진 바로 그 말이 필요했다 — 너 자신을 알라.",

  paragraphs: [
    {
      text: "천 년이 넘도록 고대 세계에서 가장 두려운 존재는 왕이 아니었다. 장군도 아니었다. 한 여자였다. 그리스 델포이 신전 깊은 곳, 빛 한 줄기 들지 않는 지하 방. 바위 틈에서 올라오는 기체를 들이마시며 세 발 의자 위에 홀로 앉은 여자. 이름은 피티아, 델포이의 신탁이었다. 그녀가 입을 열면 사람들은 예언의 신 아폴론이 직접 말하는 것이라 믿었다. 왕들이 대륙을 건너고 몇 달을 기다린 건 오직 그녀에게 질문 하나를 던지기 위해서였다.",
    },
    {
      text: "피티아는 반드시 델포이 출신 여성이었다. 처음엔 젊고 결혼하지 않은 여자만 뽑았다. 그런데 한번은 외지에서 온 남자가 피티아를 해치는 사건이 벌어졌다. 그 뒤로는 쉰 살이 넘은 여성만 선발했고, 다만 처녀의 흰 옷은 그대로 입혔다. 한번 뽑히면 모든 게 끝이었다. 집도 버리고, 가족도 떠나고, 이름도 잃었다. 이제 그녀는 아폴론의 것이었다. 죽는 날까지 신의 입으로 사는 삶이었다.",
    },
    {
      text: "의식은 한 달에 딱 한 번, 아폴론의 신성한 숫자인 7일에 치러졌다. 피티아는 먹지도 마시지도 않고 차가운 산속 샘물에 몸을 씻은 뒤, 신전에서 가장 깊고 아무도 들어갈 수 없는 방으로 내려갔다. 바위가 갈라진 틈 바로 위에 놓인 세 발 의자에 앉으면, 아래에서 달콤한 냄새의 기체가 피어올랐다. 월계수 잎을 씹고 성수를 마시면, 그녀는 서서히 이 세상이 아닌 어딘가로 빠져들었다.",
    },
    {
      text: "그다음은 아무도 예측하지 못했다. 피티아의 몸이 떨리기 시작하고, 비명 같은 소리가 터져 나왔다. 목소리는 그녀의 것이 아니었다. 말은 뒤엉키고 부서져 알아들을 수가 없었지만, 옆에 선 사제들은 한마디도 놓치지 않았다. 그들이 피티아의 외침을 받아 적고 다듬으면, 수수께끼 같은 예언이 탄생했다. 세 번 찍어 안 넘어가는 나무가 없다지만, 피티아는 달랐다. 단 한마디면 제국이 넘어갔다. 신탁은 거짓말을 한 적이 없다. 다만 진실에 두 가지 뜻을 심었을 뿐이다.",
    },
    {
      text: "그 수수께끼들이 실제로 역사를 바꿨다. 당시 세계 최고 부자이자 리디아의 왕이었던 크로이소스가 페르시아를 공격해도 되겠냐고 물었다. 신탁의 대답은 이랬다. \"강을 건너면 거대한 제국이 무너지리라.\" 크로이소스는 자신만만하게 군대를 이끌고 강을 건넜다. 무너진 건 그 자신의 제국이었다. 기원전 480년, 페르시아 대군이 그리스로 밀려왔을 때 신탁은 \"나무 벽을 믿으라\"고 했다. 장군 테미스토클레스는 그게 전함을 뜻한다고 주장했고, 아테네는 모든 것을 바다에 걸었다. 살라미스 해전에서 페르시아 함대는 박살 났다.",
    },
    {
      text: "그래서 정말 무슨 일이 벌어진 걸까? 2001년, 과학자들이 신전 터 바로 아래에서 두 개의 단층선이 교차하는 걸 발견했다. 그 갈라진 틈으로 에틸렌이라는 가스가 새어 나올 수 있는데, 조금만 마셔도 몸이 붕 뜨고 정신이 몽롱해진다고 한다. 고대 기록에 묘사된 피티아의 상태와 놀라울 만큼 일치했다. 결국 가스에 취한 것이었을까? 아니면 정말 무언가가 그녀를 통해 말한 것일까? 어느 쪽이든 상관없었다. 사람들은 믿었고, 그 믿음이 군대를 움직이고 왕국을 허물었다.",
    },
    {
      text: "끝은 서기 393년에 찾아왔다. 로마 황제 테오도시우스는 독실한 기독교인이었고, 그리스 옛 종교의 흔적을 남김없이 지우려 했다. 그가 델포이로 사람을 보내 물었다. 신탁에게 아직 할 말이 남았느냐고. 피티아의 마지막 대답은 역사에 남은 가장 서늘한 작별이다. \"황제에게 전하라. 위대한 전당은 무너졌고, 아폴론에게는 더 이상 지붕도, 성스러운 월계수도, 말하는 샘도 없다. 물마저 침묵했다.\" 천 년을 이어 온 신의 목소리는 그렇게 꺼졌다. 다시는 들리지 않았다.",
    },
  ],

  // Unchanged from English record
  icon: "\u{1F52E}",
  tier: "S",
  storyCategory: "riddles_past",
  era: "8th century BCE - 393 CE",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  thumbnail: "",
  image: "",
  coordinates: { lat: 38.4824, lng: 22.501 },
  source:
    "Herodotus\u2019s Histories, Plutarch\u2019s Moralia (On the Pythian Oracles), Pausanias\u2019s Description of Greece, Diodorus Siculus\u2019s Bibliotheca Historica",
  disabled: false,
  characters: [
    "피티아",
    "아폴론",
    "리디아의 왕 크로이소스",
    "테미스토클레스",
    "아폴론의 사제들",
  ],
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\n\u23F3 Pushing ${label} ...`);

  // Validate required fields
  const required = [
    "siteId",
    "langStoryId",
    "storyId",
    "lang",
    "title",
    "subtitle",
    "excerpt",
    "icon",
    "storyCategory",
    "era",
    "tier",
    "moralOrLesson",
    "source",
    "paragraphs",
  ];
  for (const key of required) {
    if (item[key] === undefined || item[key] === null) {
      throw new Error(`Missing required field: ${key}`);
    }
  }

  // Validate paragraphs
  if (!Array.isArray(item.paragraphs) || item.paragraphs.length === 0) {
    throw new Error("paragraphs must be a non-empty array");
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    if (
      !item.paragraphs[i].text ||
      typeof item.paragraphs[i].text !== "string"
    ) {
      throw new Error(`paragraph[${i}].text is missing or invalid`);
    }
  }

  // Validate JSON round-trip (catches encoding issues)
  const roundTrip = JSON.parse(JSON.stringify(item));
  if (roundTrip.title !== item.title) {
    throw new Error("JSON round-trip failed for title \u2014 encoding issue");
  }

  // Print content for verification
  console.log(`\n--- ${item.lang.toUpperCase()} | ${item.title} ---`);
  console.log(`Subtitle: ${item.subtitle}`);
  console.log(`Excerpt: ${item.excerpt}`);
  console.log(`Moral: ${item.moralOrLesson}`);
  console.log(`Paragraphs: ${item.paragraphs.length}`);
  const totalChars = item.paragraphs.reduce(
    (sum, p) => sum + p.text.length,
    0
  );
  console.log(`Total chars: ${totalChars}`);
  console.log("");
  item.paragraphs.forEach((p, i) => {
    console.log(`  [${i + 1}] (${p.text.length} chars) ${p.text.substring(0, 60)}...`);
  });
  console.log("");

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) OR langStoryId <> :existing",
      ExpressionAttributeValues: {
        ":existing": `en#${item.storyId}`,
      },
    })
  );

  console.log(
    `\u2705 ${label} pushed successfully (${item.paragraphs.length} paragraphs, updatedAt=${item.updatedAt})`
  );
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Pythia Oracle — Korean (ko) Push");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`Table: ${TABLE}`);
  console.log(`Site:  ${ko.siteId}`);
  console.log(`Time:  ${new Date(now * 1000).toISOString()}`);

  try {
    await pushStory(ko);
  } catch (err) {
    console.error(`\n\u274C FAILED ${ko.lang}#${ko.storyId}:`, err.message);
    console.error("   Full error:", err);
    process.exit(1);
  }

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  Korean version pushed successfully \u2705");
  console.log("═══════════════════════════════════════════════════════\n");
}

main();
