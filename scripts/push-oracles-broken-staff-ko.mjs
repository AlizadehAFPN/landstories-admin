import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const ko = {
  siteId: "baalbek",
  storyId: "oracles-broken-staff",
  lang: "ko",
  langStoryId: "ko#oracles-broken-staff",
  title: "부러진 지팡이의 신탁",
  subtitle:
    "빈 편지로 신을 시험한 황제, 부러진 지휘봉에 담긴 죽음의 예언",
  excerpt:
    "파르티아 원정을 앞둔 로마 최강의 황제가 바알벡 신전에 봉인된 편지를 보냈다. 편지 안은 비어 있었다. 시험이었다.",
  icon: "\u{1F52E}",
  storyCategory: "prophecies_curses",
  era: "114 CE (Trajan's consultation); c. 400 CE (Macrobius's account); 391 CE (temple closure)",
  tier: "S",
  isFree: true,
  hasAudio: false,
  characters: [
    "Emperor Trajan (Marcus Ulpius Traianus)",
    "Jupiter Heliopolitanus (the oracle god)",
    "Macrobius (Roman author who recorded the prophecy)",
    "Baal-Hadad (the Canaanite storm god beneath Jupiter's mask)",
    "Emperor Theodosius I (who silenced the oracle forever)",
  ],
  coordinates: { lat: 34.0069, lng: 36.2039 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 4,
  source:
    "Macrobius, Saturnalia I.23 (c. 400 CE); Cassius Dio, Roman History LXVIII.29; Hajjar, Youssef. La triade d\u2019H\u00e9liopolis-Baalbek, 1977; Kropp & Lohmann, Temple Construction at Baalbek, 2011; Butcher, Kevin. Roman Syria and the Near East, 2003",
  updatedAt: now,
  disabled: false,
  moralOrLesson:
    "가장 무서운 예언은 파멸을 경고하는 예언이 아니다. 완전한 승리를 약속하면서, 그 대가를 아무도 읽을 수 없는 수수께끼 속에 감춰 버리는 예언이다.",
  paragraphs: [
    {
      text: "서기 114년, 트라야누스는 세상에서 가장 강한 사람이었다. 로마 원로원이 직접 '최고의 통치자'라는 칭호를 바칠 정도였으니 말 다 했다. 수많은 나라를 정복했고, 그가 세운 건축물은 2천 년이 지난 지금도 서 있다. 그런 그에게 마지막 목표가 남아 있었다. 200년 넘게 로마의 자존심을 짓밟아 온 동방의 강국, 파르티아. 그런데 대군을 출발시키기 전에, 그는 예상 밖의 일을 했다. 신에게 편지를 쓴 것이다.",
    },
    {
      text: "아무 신이나 찾은 게 아니었다. 오늘날 레바논 땅에 있는 바알벡, 그 거대한 신전의 신탁을 택했다. 로마식 이름은 유피테르였지만, 그 아래 감춰진 정체는 로마보다 수천 년이나 앞선 폭풍의 신 바알이었다. 이 신탁은 독특했다. 신관들이 황금 신상을 들것 위에 올리면, 신상이 저절로 움직였다. 흔들리고, 돌고, 뒤로 밀리고. 신관들은 그 움직임을 읽어 신의 답을 전했다.",
    },
    {
      text: "하지만 트라야누스는 쉽게 믿는 인간이 아니었다. 명문가 출신이 아니라 전장에서 실력으로 올라온 군인 황제. 정보 보고서를 검증하듯 모든 걸 직접 확인해야 직성이 풀리는 사람이었다. 그래서 함정을 놨다. 아무것도 쓰지 않은 빈 편지에 황제의 인장만 찍어 신전으로 보냈다. 진짜 신이면 증명해 보라는 거였다. 신관들은 의식을 치렀고, 답이 돌아왔다. 빈 두루마리. 글자 하나 없는. 트라야누스가 보낸 것의 완벽한 거울이었다. 함정이 실패한 게 아니었다. 함정 자체가 증거가 되어 버렸다.",
    },
    {
      text: "신의 존재를 확인한 트라야누스는 진짜 질문을 꺼냈다. 밤마다 잠을 설치게 만든 그 질문. 원정은 성공하겠는가. 나는 살아서 돌아올 수 있는가. 신탁은 말로 답하지 않았다. 신관들이 로마 장교의 권위를 상징하는 나무 지휘봉을 가져다 꺾어 부러뜨렸다. 그 조각들을 천으로 감싸 황제에게 보냈다. 수수께끼였다. 그리고 그 뜻을 알아내는 데 3년이 걸렸다.",
    },
    {
      text: "처음엔 모든 게 완벽했다. 트라야누스는 메소포타미아를 휩쓸었고, 파르티아의 수도를 함락시켰으며, 로마 군대가 한 번도 가본 적 없는 페르시아만까지 도달했다. 해안에 선 그는 말했다. 알렉산드로스 대왕처럼 인도까지 갈 수 있을 만큼 젊었으면. 그때 모든 게 무너졌다. 곳곳에서 반란이 터졌다. 몸이 무너졌다. 117년, 로마로 돌아가는 배 위에서 뇌졸중으로 쓰러졌고, 다시 일어나지 못했다. 그의 유골은 황금 항아리에 담겨 로마로 돌아왔다.",
    },
    {
      text: "부러져서 천에 감싸인 지팡이. 부러져서 천에 감싸여 돌아온 사람. 신탁은 소름 끼칠 정도로 정확했다. 넌 모든 것을 이긴다. 다만 살아서는 돌아오지 못한다. 모르는 게 약이라고 했던가. 트라야누스에겐 아는 것도 약이 아니었다. 답을 받아 놓고도 끝내 풀지 못했으니까. 역사상 가장 잔인한 예언이었을지 모른다. 실패를 경고한 게 아니라, 완전한 승리를 약속하면서 그 대가를 아무도 읽을 수 없는 수수께끼 속에 숨겨 버렸으니까.",
    },
    {
      text: "그 예언을 내린 신은 트라야누스보다 수백 년을 더 버텼다. 사랑, 전쟁, 죽음에 대한 답을 구하러 제국 곳곳에서 사람들이 몰려왔다. 그러다 391년, 기독교 황제 테오도시우스가 모든 옛 신앙을 금지했다. 바알벡의 성화가 꺼졌다. 황금 신상은 부서졌다. 황제의 죽음을 예언했던 신탁은 영원히 입을 다물었다.",
    },
    {
      text: "오늘날 바알벡에는 고대 세계에서 가장 높은 기둥 여섯 개가 여전히 서 있다. 황제조차 귀 기울이게 만든 신의 마지막 흔적이다. 지팡이는 사라졌다. 예언은 지켜졌다.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// VALIDATE & PUSH
// ═══════════════════════════════════════════════════════════════

function validate(story) {
  const label = `${story.lang} — ${story.title}`;
  console.log(`\nValidating: ${label}`);

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
    if (p.text.length > 550) {
      console.warn(
        `  WARNING: paragraph ${i} is ${p.text.length} chars (limit ~500)`
      );
    }
    console.log(`  P${i}: ${p.text.length} chars`);
  }

  const totalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  Total chars: ${totalChars}`);
  console.log(`  Paragraphs: ${story.paragraphs.length}`);
  console.log(`  VALID ✓`);
}

async function push(story) {
  const label = `${story.lang} — ${story.title}`;
  console.log(`\nPushing: ${label}`);
  console.log(`  siteId: ${story.siteId}`);
  console.log(`  langStoryId: ${story.langStoryId}`);

  await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: story,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );

  console.log(`  SUCCESS: ${label} pushed to DynamoDB.`);
}

async function main() {
  validate(ko);
  await push(ko);
  console.log("\n=== DONE ===");
}

main().catch((err) => {
  if (err.name === "ConditionalCheckFailedException") {
    console.error("\nSKIPPED: ko#oracles-broken-staff already exists.");
  } else {
    console.error("\nFATAL:", err);
    process.exit(1);
  }
});
