import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════
// KOREAN (ko) — v2: full native recreation
// Proverb subverted: 하늘이 무너져도 솟아날 구멍이 있다
// Register: modern storyteller (서프라이즈/podcast narrative 했다체)
// ═══════════════════════════════════════════════════
const koItem = {
  siteId: { S: "catacombs-of-paris" },
  storyId: { S: "philibert-aspairt-lost" },
  storyCategory: { S: "ghosts_curses" },
  tier: { S: "A" },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  readingTimeMinutes: { N: "3" },
  icon: { S: "\u{1F56F}\uFE0F" },
  coordinates: { M: { lat: { N: "48.84" }, lng: { N: "2.34" } } },
  source: {
    S: `Inspection G\u00e9n\u00e9rale des Carri\u00e8res records; H\u00e9ricart de Thury, "Description des Catacombes de Paris" (1815); cataphile oral tradition`,
  },
  image: { S: "" },
  thumbnail: { S: "" },
  updatedAt: { N: String(now) },
  lang: { S: "ko" },
  langStoryId: { S: "ko#philibert-aspairt-lost" },
  title: { S: "스무 걸음 앞이 출구였다" },
  subtitle: {
    S: "1793년, 파리 지하로 사라진 남자 — 11년 뒤 출구 코앞에서 시신으로 발견되다",
  },
  excerpt: {
    S: "1793년 11월 3일, 필리베르 아스파르라는 남자가 파리 지하 터널로 내려갔다. 다시는 올라오지 못했다.",
  },
  era: { S: "1793년 11월 3일 (실종); 1804년 (발견)" },
  characters: {
    L: [
      { S: "필리베르 아스파르" },
      { S: "채석장 측량 인부들 (발견자)" },
    ],
  },
  moralOrLesson: {
    S: "하늘이 무너져도 솟아날 구멍이 있다고 했다. 구멍은 진짜 있었다, 20미터 앞에. 다만 어둠 속에서는 있어도 없는 것과 같았다. 방향을 잃으면 거리는 의미가 없다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1793년 11월 3일 밤, 한 남자가 파리 땅속으로 내려갔다. 이름은 필리베르 아스파르. 그는 다시 올라오지 못했다. 11년 뒤에야 시신으로 발견됐는데, 이 이야기가 200년 넘게 전해지는 이유는 딱 하나다. 그가 숨을 거둔 자리에서 출구까지 겨우 20미터였다는 것. 거의 다 온 거였다. 하지만 칠흑 같은 어둠 속에서, '거의'는 아무런 의미가 없었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "아스파르는 파리 좌안의 발드그라스 군 병원에서 수위로 일하던 사람이다. 병원 지하실에서 옛 채석장 터널로 이어지는 길이 있다는 건 직원들 사이에선 공공연한 비밀이었다. 그가 왜 내려갔는지 확실히 아는 사람은 없다. 가장 그럴듯한 추측은 이렇다. 프랑스 혁명 통에 쫓겨난 수도사들이 근처 수도원 지하에 술을 숨겨두고 갔다는 소문이 돌았다. 공짜 술, 터널 몇 개만 지나면 된다는 거였다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그의 손에는 초가 한 자루 들려 있었다. 딱 하나. 파리 지하 채석장은 300킬로미터가 넘는 거대한 미로다. 막힌 길, 물에 잠긴 통로, 무너져 내린 천장, 쉴 새 없이 갈라지는 갈림길. 1793년 당시 이 지하 세계의 지도라 부를 만한 것은 거의 없었다. 초 한 자루가 밝히는 범위는 고작 2~3미터. 그 바깥은 손을 얼굴에 갖다 대도 보이지 않는, 완전한 어둠이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그리고 초가 꺼졌다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "바람 때문이었는지, 다 타버린 건지는 알 수 없다. 이유는 중요하지 않다. 결과만 중요하다. 300킬로미터짜리 미로 한가운데에 빛도, 지도도, 방향 감각도 없는 사람 하나가 남았다. 어느 쪽이 살 길이고 어느 쪽이 막다른 벽인지, 알아낼 방법이 완전히 사라진 것이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그는 걸었다. 몇 시간을, 어쩌면 며칠을. 거친 석회암 벽을 손끝으로 더듬으며 갈림길이 나올 때마다 감으로 방향을 택했다. 소리를 질렀을 것이다. 하지만 돌벽은 메아리 하나 돌려주지 않았다. 그가 남긴 흔적은 아무것도 없었다. 어둠이 그를 통째로 집어삼켰다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "1804년, 터널을 측량하던 인부들이 시신 하나를 발견했다. 주머니 속 병원 열쇠 다발로 신원이 확인됐다. 필리베르 아스파르. 그가 쓰러진 곳에서 짧은 복도 하나만 지나면, 매일 출퇴근하던 그 병원의 지하실이었다. 출구까지 정확히 20미터. 갈림길에서 왼쪽으로 한 번만 꺾었으면 살아 나왔다. 하지만 그는 오른쪽을 택했다. 하늘이 무너져도 솟아날 구멍이 있다고 했다. 구멍은 진짜 있었다, 20미터 앞에. 다만 어둠 속에서는 있어도 없는 것과 같았다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그는 쓰러진 바로 그 자리에 묻혔다. 그의 묘비는 지금도 터널 안에 서 있다. 파리 카타콤 전체를 통틀어 이름이 새겨진 무덤은 손에 꼽는다. 요즘도 몰래 지하에 들어가는 사람들은 그의 묘석 위에 초와 동전을 놓고 간다. 이 이야기가 사라지지 않는 이유는 간단하다. 우리 모두가 가장 무서워하는 것을 건드리기 때문이다. 살 길이 바로 곁에 있었는데, 끝내 모른 채 죽은 것. 어둠에게 거리란 없다. 20미터든, 20킬로미터든.",
          },
        },
      },
    ],
  },
};

async function push(label, item) {
  console.log(`\nPushing ${label}...`);
  try {
    await client.send(
      new PutItemCommand({ TableName: TABLE, Item: item })
    );
    console.log(`  ✓ ${label} pushed successfully (langStoryId: ${item.langStoryId.S})`);
  } catch (err) {
    console.error(`  ✗ ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

(async () => {
  console.log(`Timestamp: ${now}`);
  await push("Korean (ko) v2", koItem);
  console.log("\nDone.");
})();
