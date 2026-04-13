import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";

// ═══════════════════════════════════════════════════════
//  KOREAN (ko) — 열 개의 제비
// ═══════════════════════════════════════════════════════
const koItem = {
  siteId: "masada",
  storyId: "lots-of-the-ten",
  lang: "ko",
  langStoryId: "ko#lots-of-the-ten",
  icon: "\uD83D\uDD2E",
  tier: "A",
  source:
    "Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; Cohen, Shaye J.D. 'Masada: Literary Tradition, Archaeological Remains, and the Credibility of Josephus,' Journal of Jewish Studies 33, 1982; Ben-Yehuda, Nachman. The Masada Myth: Collective Memory and Mythmaking in Israel, University of Wisconsin Press, 1995; Ben-Yehuda, Nachman. Sacrificing Truth: Archaeology and the Myth of Masada, Humanity Books, 2002; Zias, Joe. 'Human Skeletal Remains from the Southern Cave at Masada,' in The Dead Sea Scrolls Fifty Years After Their Discovery, 2000; Sallon et al. 'Germination, Genetics, and Growth of an Ancient Date Seed,' Science 320, 2008",
  characters: [
    "Yigael Yadin -- archaeologist, former IDF Chief of Staff, excavator of Masada",
    "The woman with braided hair -- an unnamed 17-18 year old whose remains were found in the Northern Palace",
    "Nachman Ben-Yehuda -- Hebrew University sociologist who challenged the Masada myth",
    "Joe Zias -- physical anthropologist who questioned the identification of the bones",
    "Sarah Sallon -- scientist who germinated a 2,000-year-old seed from Masada",
  ],
  era: "1963-1965 (Yadin's excavation); 1969 (state funeral); 1982-2019 (scholarly debate)",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 35.3536, lat: 31.3156 },
  hasAudio: false,
  isFree: true,
  storyCategory: "riddles_past",
  updatedAt: Math.floor(Date.now() / 1000),

  title: `열 개의 제비`,
  subtitle: `토기 조각 열한 개, 해골 셋, 땋은 머리카락 하나 — 마사다 전설을 증명하면서 동시에 뒤흔든 발굴 이야기`,
  excerpt: `이름이 새겨진 토기 조각이 먼지 속에서 나왔다. 그중 하나에 '벤 야이르'라는 글자. 세상은 마사다 마지막 밤의 증거라며 환호했지만, 진실은 그보다 훨씬 복잡했다.`,
  moralOrLesson: `과거를 발견하는 것과 만들어내는 것 사이의 경계는 우리가 믿고 싶은 것보다 훨씬 얇다. 흙에서 유물을 꺼내는 모든 고고학자는 그것이 어떤 이야기를 들려줄지 선택하게 된다. 그리고 우리가 가장 사실이길 바라는 이야기일수록 가장 꼼꼼히 따져봐야 한다. 땋은 머리카락도, 이름 새긴 조각도, 흩어진 뼈도 모두 진짜다. 그것이 무엇을 뜻하는지는 우리가 정하는 것이다.`,

  paragraphs: [
    {
      text: `1963년, 이가엘 야딘이 마사다에 올랐다. 스물여덟 나라에서 모인 자원봉사자 수천 명과 함께. 야딘은 고고학자이기 전에 군인이었다 — 1948년 독립전쟁에서 이스라엘군을 이끈 참모총장 출신이다. 그가 삽을 들이댄 곳은 서기 73년, 천 명 가까운 유대 반란군이 로마에 무릎 꿇느니 차라리 죽겠다고 선택한 사막 위의 요새였다. 유대계 로마 역사가 요세푸스는 썼다 — 마지막 밤, 열 명이 제비를 뽑아 나머지를 모두 죽였다고. 야딘은 바로 그 제비를 찾으러 온 것이다.`,
    },
    {
      text: `놀라운 게 나왔다. 남쪽 성문 근처, 흙 속에서 토기 조각 열한 개. 하나하나에 이름이 긁혀 있었다. 그중 하나에 '벤 야이르'. 마사다의 지도자 엘아자르 벤 야이르의 이름이었다. 야딘은 썼다. "그 제비를 뽑은 사람의 심정을 상상해보라." 전 세계가 열광했다. 유대 역사에서 가장 극적인 밤의 물증이, 이천 년 묵은 먼지 속에서 나타난 것이다.`,
    },
    {
      text: `학자들이 들고일어났다. 요세푸스는 열 명이라 했는데 조각은 열한 개다. '벤 야이르'는 당시 흔한 이름이었다 — 현대 발굴지에서 '김'이라는 글자를 찾고 특정 인물의 증거라 우기는 셈이다. 비슷한 이름 조각이 마사다 전역에서 수백 개 나왔는데, 대부분 작업 배치나 식량 배급용이었다. 게다가 요세푸스 자신이 로마에 항복한 뒤 황제의 후원으로 글을 쓴 사람이다. 숭고한 자결이라는 이야기가, 추하고 혼란스러운 최후보다 훨씬 편한 서사였을 것이다.`,
    },
    {
      text: `뼈도 나왔다. 북쪽 궁전 목욕탕 터에서 해골 셋 — 스무 살쯤 된 청년, 열일곱여덟 살 여자, 아이 하나. 여자 곁에는 땋은 머리카락이 고스란히 남아 있었다. 이천 년 전 것이 사막의 메마른 공기 속에 보존된 것이다. 죽을 줄 알면서 머리를 땋은 사람. 하지만 바로 옆에서 돼지뼈가 나왔다. 유대인은 돼지를 기르지 않았다. 로마인은 길렀다.`,
    },
    {
      text: `이스라엘은 과학이 아니라 정치로 답했다. 1969년, 스물일곱 구의 유해가 마사다 기슭에서 정식 군장례를 받았다. 국기로 감싼 관, 의장대의 경례. 고고학이 증명 못 한 것을 국가 의례가 기정사실로 만들어버렸다. 사회학자 벤예후다가 나중에 밝혀낸 건 더 불편한 진실이었다 — 그 수비대는 영웅이 아니었다. 마사다로 올라가기 전, 인근 마을에서 같은 유대인 칠백 명을 학살하고 도망친 사람들이었다.`,
    },
    {
      text: `세 번 찍어 안 넘어가는 나무 없다고 했다. 제비가 의심받았고, 뼈가 의심받았고, 연설이 의심받았다. 세 번을 찍었다. 그런데 이 이야기는 넘어가지 않았다. 대신 그 자리에서 싹이 텄다. 폐허의 두루마리에서 에스겔 37장이 나왔다 — 마른 뼈로 가득한 골짜기에서 신이 묻는 장면. "이 뼈들이 살 수 있겠느냐?" 민족 부활의 예언이 민족 저항의 마지막 자리에서 발견된 것이다. 2005년에는 야딘의 발굴지에서 나온 대추야자 씨 하나에 물을 줬더니 싹이 돋았다. 이천 년을 잔해 밑에서 잠들어 있던 씨. 사람들은 그 나무에 성경에서 가장 오래 산 인물의 이름을 붙였다. 므두셀라.`,
    },
    {
      text: `토기 조각이 정말 그 밤의 제비인지는 모른다. 뼈가 수비대의 것인지도 모른다. 연설은 한 번도 울려 퍼진 적 없을지 모른다. 하지만 두루마리는 진짜였다 — 진짜 사람들이 진짜 산꼭대기 회당에서 진짜 읽었다. 그리고 그 씨도 진짜였다. 이천 년 동안 돌무더기 밑에 묻혀, 누군가 물과 빛을 줄 때까지 기다리고 있었을 뿐이다. 이 뼈들이 살 수 있겠느냐고? 마사다에서는 씨 한 알마저 그렇다고 답한다.`,
    },
  ],
};

// ═══════════════════════════════════════════════════════
//  PUSH
// ═══════════════════════════════════════════════════════
async function pushItem(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\nPushing ${label}...`);

  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`Missing required fields for ${label}`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(
      `Unexpected paragraph count (${item.paragraphs.length}) for ${label}`
    );
  }

  for (let i = 0; i < item.paragraphs.length; i++) {
    if (!item.paragraphs[i].text || item.paragraphs[i].text.trim() === "") {
      throw new Error(`Empty paragraph at index ${i} for ${label}`);
    }
  }

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );
  console.log(`  ✓ ${label} pushed successfully.`);
}

(async () => {
  try {
    await pushItem(koItem);
    console.log("\n=== Korean story (ko) pushed successfully. ===\n");
  } catch (err) {
    console.error("\n✗ ERROR:", err.message || err);
    if (err.name === "ConditionalCheckFailedException") {
      console.error(
        "  A record with this siteId+langStoryId already exists. Delete it first or remove the condition."
      );
    }
    process.exit(1);
  }
})();
