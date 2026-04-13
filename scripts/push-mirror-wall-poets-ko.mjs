// Push Korean (ko) recreation of "The Mirror Wall Poets" to the Story DynamoDB table.
// Proverb woven in: "사람은 가도 말은 남는다" — subverted at the ending.
// Register: Modern Korean storytelling (podcast/popular nonfiction). Natural 해체/했다체 narrative.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: "sigiriya",
  langStoryId: "ko#mirror-wall-poets",
  lang: "ko",
  storyId: "mirror-wall-poets",
  title: "거울벽의 시인들",
  subtitle:
    "800년 동안 사람들은 바위를 오르고, 벽화 속 여인들을 올려다보고, 반짝이는 벽에 사랑의 시를 긁어 넣었다 — 그게 지금까지 발견된 가장 오래된 싱할라 시 모음집이다",
  excerpt:
    "그림 속 여인들 아래, 그림이 비칠 만큼 매끈하게 닦인 벽이 있었다. 800년 동안 그 앞에 선 사람들이 아무도 예상 못 한 일을 했다 — 시를 쓴 것이다.",
  icon: "✍️",
  storyCategory: "living_heritage",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 7.957, lng: 80.7603 },
  era: "6th-14th century CE (graffiti period); 1956 (Paranavitana's publication)",
  source:
    "Paranavitana, Senarath. Sigiri Graffiti: Being Sinhalese Verses of the Eighth, Ninth, and Tenth Centuries, 2 vols., Oxford University Press, 1956; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; MAP Academy, 'Desires, Reactions, Interpretations: Murals and Inscriptions from Sigiriya'; Bell, H.C.P. Archaeological Survey of Ceylon, Annual Reports 1896-1904",
  characters: [
    "키티 (욕망을 경고한 불교 승려)",
    "데바, 마하마타의 아내 (벽화 속 여인들에게 질투한 여성)",
    "이름 모를 여성 방문객 (남성 시인들을 조롱한 여성)",
    "세나라트 파라나비타나 (685편의 시를 해독한 고고학자)",
    "800년에 걸친 수백 명의 익명의 방문객들",
  ],
  moralOrLesson:
    "흔적을 남기는 건 현대인의 습관이라고 생각하기 쉽다 — 댓글, 인스타 캡션, 벽에 쓴 낙서. 하지만 거울벽은 정반대를 증명한다. 1,500년 전 사람들도 아름다운 걸 보면 지금 우리와 똑같은 충동을 느꼈다. 뭔가 말하고, 적어두고, 남기고 싶은 마음. 사람의 마음은 변하지 않았다. 우리는 여전히 이미지에 빠지고, 아무도 안 읽을 글을 쓰고, 감정을 글로 적으면 영원해질 거라고 믿는다.",
  paragraphs: [
    {
      text: "5세기, 스리랑카의 카샤파 왕은 정글 한가운데 솟은 바위 요새 시기리야에 벽 하나를 거울처럼 닦게 했다. 석회에 달걀흰자, 야생 꿀을 섞어 바르고 밀랍으로 문질러 광을 냈다. 그 벽은 '구름 속 여인들' — 금빛 구름 사이에 떠 있는 여인들을 그린 벽화 바로 아래에 있었다. 벽을 따라 걸으면 위에는 그림 속 여인, 아래에는 거울에 비친 여인이 나란히 나타났다. 왕의 사적인 즐거움을 위해 만들어진 것이었다. 하지만 그 벽의 진짜 운명은 전혀 달랐다.",
    },
    {
      text: "495년, 카샤파는 왕좌를 되찾으러 온 친형제와의 전투에서 죽었다. 요새는 불교 사원이 되었고, 구름 여인들은 더 이상 왕 혼자만의 보물이 아니었다. 승려, 순례자, 군인, 상인, 농부 — 바위를 오르는 사람이면 누구나 그 그림을 볼 수 있었다. 그리고 아무도 예상 못 한 일이 벌어졌다. 벽화에 압도된 사람들이 날카로운 도구를 꺼내 매끈한 벽에 자기 감정을 긁어 새기기 시작한 것이다. 거울이 공책이 되는 순간이었다.",
    },
    {
      text: "6세기부터 14세기까지, 무려 800년에 걸쳐 1,800편이 넘는 글이 거울벽에 새겨졌다. 사랑 시, 인생에 대한 단상, 불교적 경고, 농담, 그리고 '나 여기 왔다 감' 수준의 메모까지. 싱할라어, 산스크리트어, 타밀어로 쓰인 이 글들은 누가 기획한 게 아니었다. 그냥 인간의 본능이었다 — 아름다운 걸 보면 뭔가 말하고 싶어지는. 이 낙서들이 모여 지금까지 알려진 가장 오래된 싱할라 시 모음집이 됐다.",
    },
    {
      text: "대부분은 남자들이었고, 주제는 하나같이 욕망이었다. \"금빛 피부의 여인이 마음과 눈을 사로잡았다\"고 한 사람은 썼다. 다른 사람은 그림 속 여인의 곁눈질에 그대로 쓰러졌다고 했다 — \"그 비스듬한 눈빛에 사로잡혀, 나는 바닥에 엎드려 버렸다.\" 가벼운 구경꾼들이 아니었다. 좁은 통로에 서서 금빛 여인들이 구름 사이에 떠 있는 모습을 올려다보다가, 자기가 느끼는 감정을 담을 말이 없다는 걸 깨달은 사람들이었다.",
    },
    {
      text: "하지만 여자들의 반응은 달랐다. '마하마타의 아내' 데바는 질투가 뚝뚝 떨어지는 시를 남겼다 — \"절벽 위 사슴 눈의 여자가 나를 미치게 한다. 진주를 흔들며 내 남편한테 추파를 던지잖아.\" 그리고 이름 모를 한 여성이 벽 전체에서 가장 날카로운 한 마디를 남겼다 — \"여자인 나로서는 저 그림 속 여인들이 안쓰럽다. 멍청한 남자들, 시를 쓴다고 그 난리치면서 — 술 한 잔 먹을 것 하나 갖고 온 놈은 없구나.\" 1,500년 전 글인데, 지금 읽어도 뼈를 때린다.",
    },
    {
      text: "승려 키티는 사랑에 눈먼 방문객들이 놓친 걸 꿰뚫어 봤다. 그의 글은 다음 사람을 위한 경고 같았다 — \"여기 머물거든 마음을 빼앗기지 마라. 쾌락은 고통이 되고, 고통은 쾌락을 닮는다.\" 구름 여인들이 바로 그 교훈이라는 걸 그는 알았다. 아름답고, 갖고 싶지만, 절대 닿을 수 없는 존재. 그 갈망 자체가 핵심이었다. 그리고 그 그림 아래 벽에는? 정확히 그 갈망을 새긴 1,800개의 흔적이 돌에 깊이 박혀 있었다.",
    },
    {
      text: "1956년, 고고학자 세나라트 파라나비타나가 이 중 685편을 해독해 세상에 내놓았다 — 천 년 넘게 침묵하던 목소리들이 되살아난 것이다. 그리고 여기에 반전이 있다. 우리 말에 '사람은 가도 말은 남는다'고 했다. 거울벽은 아름다움을 비추려고 만들어졌다. 하지만 세월이 거울을 흐리게 했다. 비침은 사라졌다. 대신 살아남은 건, 그 비침이 있던 자리에 서서 자기가 본 것을 어떻게든 말로 남기려 한 사람들의 글이었다. 거울은 실패했다. 시는 남았다.",
    },
  ],
  updatedAt: now,
};

async function push() {
  console.log("Pushing Korean (ko) Mirror Wall Poets story...");
  console.log(`  siteId: ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title: ${item.title}`);
  console.log(`  paragraphs: ${item.paragraphs.length}`);
  console.log(`  updatedAt: ${item.updatedAt}`);

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
      })
    );
    console.log("\n✅ Successfully pushed ko#mirror-wall-poets");
  } catch (err) {
    console.error("\n❌ Failed to push:", err);
    process.exit(1);
  }
}

push();
