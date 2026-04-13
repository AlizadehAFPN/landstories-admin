import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "hadrians-wall" },
  langStoryId: { S: "ko#vindolanda-tablets" },
  storyId: { S: "vindolanda-tablets" },
  lang: { S: "ko" },
  title: { S: "빈돌란다 서판 — 세상 끝에서 온 목소리" },
  subtitle: { S: "2천 년의 침묵을 깨고 말을 건네는 나무 조각들" },
  excerpt: { S: "1973년 봄. 영국 고고학자 로빈 벌리는 하드리아누스 방벽 바로 남쪽, 로마 군사 요새 빈돌란다에서 시커먼 진흙을 파고 있었다." },
  tier: { S: "A" },
  storyCategory: { S: "crowns_conquests" },
  readingTimeMinutes: { N: "4" },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  icon: { S: "📜" },
  image: { S: "" },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lat: { N: "55.0265" },
      lng: { N: "-2.3615" },
    },
  },
  era: { S: "Late 1st to early 2nd century AD (c. AD 85-130)" },
  characters: {
    L: [
      { S: "Robin Birley" },
      { S: "Andrew Birley" },
      { S: "Claudia Severa" },
      { S: "Sulpicia Lepidina" },
      { S: "Flavius Cerialis (Prefect of the Ninth Cohort of Batavians)" },
      { S: "The unnamed soldier requesting socks and underpants" },
    ],
  },
  source: {
    S: 'Robin Birley, "Vindolanda: A Roman Frontier Fort on Hadrian\'s Wall" (2009); Alan K. Bowman, "Life and Letters on the Roman Frontier: Vindolanda and its People" (2003); Tab. Vindol. II 291 (Claudia Severa\'s birthday invitation); British Museum Vindolanda Tablets Online (vindolanda.csad.ox.ac.uk)',
  },
  updatedAt: { N: "1773587516" },
  moralOrLesson: {
    S: "가장 강렬한 역사적 발견은 황금 보물이나 거대한 비문이 아니다. 때로는 가장 작고 평범한 한마디 — 양말 보내줘, 생일에 와줘 — 가 수천 년을 건너 우리에게 말을 건넨다. 따뜻함이 필요하고, 친구가 그립고, 함께 축하할 사람이 있어야 한다는 것. 그건 2천 년 전이나 지금이나 똑같다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1973년 봄. 영국 고고학자 로빈 벌리는 하드리아누스 방벽 바로 남쪽, 로마 군사 요새 빈돌란다에서 시커먼 진흙을 파고 있었다. 엽서보다 얇은 나무 조각이 하나 나왔다. 목수가 버린 쪼가리인 줄 알았다. 그런데 빛에 비추자 글씨가 보였다. 자작나무 위에 먹으로 쓴 라틴어, 거의 1,900년 전의 것이었다. 그 순간, 죽은 사람들이 입을 열기 시작했다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "비밀은 진흙에 있었다. 이 요새는 서기 85년경부터 수십 년에 걸쳐 여러 번 허물고 다시 지어졌는데, 매번 이전 층이 축축한 흙 아래 묻혔다. 산소가 차단되니 나무와 잉크가 썩지 않고 버텼다. 벌리의 아들 앤드루가 발굴을 이어받아 지금까지 1,600장이 넘는 서판을 꺼냈다. 황제의 칙령도, 위대한 선언문도 아니다. 군인들과 그 가족이 주고받은 일상의 쪽지. 바로 그게 이 서판을 특별하게 만든다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "가장 유명한 건 생일 초대장이다. 인근 요새 장교의 아내 클라우디아 세베라가 빈돌란다의 친구 술피키아 레피디나에게 쓴 편지다. \"꼭 와줘요, 당신이 와야 제 생일이 즐거워요.\" 대부분은 서기관이 대신 썼다. 하지만 편지 맨 아래, 삐뚤빼뚤한 친필로 직접 덧붙인 한마디. \"기다릴게요, 언니.\" 이 짧은 문장이 로마 세계 전체에서 여성이 직접 쓴 가장 오래된 라틴어 기록이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "또 하나, 어떤 군인의 편지가 있다. 로마군에 끌려온 외지인 병사가 고향 집에 보낸 것이다. \"양말 두 켤레, 샌들 두 켤레, 속옷 두 벌 보냈습니다.\" 이게 영국 역사상 속옷이 등장한 최초의 기록이다. 청동 갑옷도, 전장의 함성도 아닌 — 비 맞고 얼어붙는 변방에서 깨끗한 양말이랑 속옷 좀 보내달라고 가족한테 편지 쓴 한 사람 이야기다. 신화가 아니다. 그냥 어느 날의 일상이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "다른 서판도 가관이다. \"병사들 맥주가 다 떨어졌습니다, 좀 보내주십시오\"라는 간청이 있고, 752명 중 실제 전투 가능 인원이 296명뿐이라는 부대 현황 보고서도 있다. 현지 원주민을 \"브리툰쿨리\"라고 적은 정보 보고서도 나왔는데, 풀어 쓰면 \"쪼잔한 브리튼놈들\" 정도다. 갑옷도 제대로 안 걸친다며 비웃는 내용. 요즘 단톡방 뒷담화랑 다를 게 없다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "진짜 가슴에 남는 건 이거다. 이 사람들은 로마 출신이 아니었다. 지금의 네덜란드에서 온 바타비아인, 벨기에에서 온 퉁그리아인, 프랑스에서 온 갈리아인. 정복당한 땅에서 차출돼 \"알려진 세상의 끝\"이라 불리던 축축하고 칙칙한 섬으로 보내진 사람들이다. 편지마다 작고 절박한 연결의 흔적이 묻어 있다. 아들에게 양말을 부치는 어머니, 생일잔치를 준비하는 친구들, 험담을 나누는 장교들.",
          },
        },
      },
      {
        M: {
          text: {
            S: "사람들은 이 서판을 \"로마 시대 이메일\"이라 부른다. 딱 맞는 말이다. 짧고, 어수선하고, 줄임말 투성이에, 지극히 개인적이다. 빈돌란다 발굴은 지금도 계속된다. 매 시즌 새 서판이 진흙에서 올라온다. 옛말에 사람은 가도 말은 남는다고 했다. 그런데 2천 년을 버틴 그 말이란 게 — 양말 좀 보내줘, 맥주가 떨어졌어, 내 생일에 와줘. 우리와 그들 사이 거리는 생각보다 훨씬 가깝다.",
          },
        },
      },
    ],
  },
};

async function pushStory() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });

    const result = await client.send(command);
    console.log("SUCCESS: Korean story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("siteId:", item.siteId.S);
    console.log("langStoryId:", item.langStoryId.S);
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists! langStoryId:", item.langStoryId.S);
    } else {
      console.error("ERROR:", error.message);
    }
    process.exit(1);
  }
}

pushStory();
