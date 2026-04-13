import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const record = {
  // ─── Keys & identifiers ───
  siteId: "babylon",
  langStoryId: "ko#code-of-hammurabi",
  storyId: "code-of-hammurabi",
  lang: "ko",

  // ─── Korean text fields ───
  title: "돌에 새긴 법",
  subtitle:
    "한 바빌론 왕이 검은 돌에 새긴 282개의 법, 정의의 뜻을 영원히 바꾸다",
  excerpt:
    "약 4천 년 전, 바빌론의 한 왕이 282개의 법을 검은 돌기둥에 새겨 신전에 세웠다 \u2014 누구나 볼 수 있도록. 그 법 중에는 이후 모든 법체계에 울려 퍼질 원칙이 담겨 있었다. 눈에는 눈, 이에는 이.",

  paragraphs: [
    {
      text: "기원전 1755년경, 바빌론의 왕 함무라비는 전례 없는 일을 했다. 살인, 절도, 이혼, 부실 공사까지 다루는 282개의 법을 검은 돌기둥에 새긴 것이다. 가공하기 거의 불가능한 단단한 돌이었다. 그리고 그걸 신전에 세웠다 \u2014 누구나 볼 수 있게. 법은 궁전의 비밀이 아니다. 법은 모두의 것이다.",
    },
    {
      text: "기둥 꼭대기에는 모든 걸 설명하는 부조가 새겨져 있다. 함무라비가 바빌론의 태양신 샤마시 앞에 서 있고, 샤마시가 신성한 지팡이와 고리를 건넨다. 이 법은 왕의 의견이 아니라 하늘의 명령이라는 뜻이다. 부조 아래, 쐐기문자 49열이 일상의 거의 모든 영역을 다루고 있다.",
    },
    {
      text: "함무라비는 학자가 아니라 정복자였다. 기원전 1792년 즉위했을 때 바빌론은 적에 둘러싸인 작은 나라였다. 30년에 걸쳐 하나씩 꺾었다 \u2014 유프라테스강의 부유한 도시 마리까지. 남은 편지들은 관개 분쟁을 직접 해결하고 부패한 관리를 추적한 왕의 모습을 보여준다. 이 법전은 완벽주의자의 걸작이었다.",
    },
    {
      text: "가장 유명한 건 196조다. 자유인의 눈을 멀게 하면 네 눈도 뽑힌다. 눈에는 눈, 이에는 이. 성경과 코란을 거쳐 전 세계 법정까지 이어진 원칙이다. 하지만 바빌론에서 정의는 신분에 따라 달랐다. 귀족이면 눈을 잃고, 평민이면 벌금, 노예면 주인에게 배상. 법은 모두가 보라고 새긴 것이지, 모두를 같이 대하라는 뜻은 아니었다.",
    },
    {
      text: "놀라울 만큼 현대적인 법도 있었다. 부실 시공으로 집이 무너져 주인이 죽으면 건축업자가 처형됐다. 남편이 전쟁 포로가 되면 아내는 재혼할 수 있었고, 남편이 돌아오면 누구와 살지 아내가 골랐다. 남편의 모욕을 증명한 아내는 재산을 챙겨 떠날 수도 있었다. 4천 년 전, 바빌론 여성에겐 이미 법적 보호가 있었다.",
    },
    {
      text: "기둥은 신전에서 600년을 버텼다. 기원전 1158년경, 지금의 이란 남서부에서 온 엘람 왕 슈트루크-나훈테가 시파르를 약탈하고 이 돌을 전리품으로 가져갔다. 함무라비의 이름을 지우고 자기 이름을 새기려 했지만 끝내지 못했다. 돌은 3천 년 넘게 폐허 속에 묻혀, 위로 문명이 흥하고 망하는 동안 아무도 그 존재를 몰랐다.",
    },
    {
      text: "1901년, 프랑스 고고학자 자크 드 모르간이 이란의 수사에서 이 돌을 발굴했다. 학계가 뒤집어졌다. 장-뱅상 셰유가 이듬해 텍스트를 해독하자, 함무라비 법전과 성경 \u2014 특히 출애굽기 \u2014 의 유사점이 드러났다. 모세의 율법이 독창적이라 믿던 학자들은 천 년 이상 앞서 비슷한 법을 새긴 바빌론 왕과 마주해야 했다.",
    },
    {
      text: "\u2018법 없이도 살 사람\u2019이라는 말이 있다. 함무라비는 달랐다 \u2014 법이 보이지 않으면 정의도 없다고 봤다. 오늘 이 기둥은 파리 루브르에 서 있다. 그 법은 공정하지 않았다. 하지만 모든 제국보다 오래 산 생각을 남겼다 \u2014 법은 범죄보다 먼저 있어야 하고, 왕도 자기보다 큰 무언가에 답해야 한다. 4천 년이 흘렀다. 우리는 아직 그 생각을 넘지 못했다.",
    },
  ],

  moralOrLesson:
    "함무라비 이전에 정의란 강자가 약자에게 강요하는 것이었다. 함무라비 이후 정의는 \u2014 최소한 원칙적으로는 \u2014 기록되고, 눈에 보이고, 모두에게 적용 가능한 것이 되었다. 그의 법은 현대 기준으로 공정하지 않았다. 계층을 차별했고, 가난한 이를 더 가혹하게 벌했으며, 오늘날 용납할 수 없는 처벌을 담고 있었다. 하지만 혁명적인 하나의 생각을 세웠다: 법은 범죄 전에 존재해야 하고, 형벌은 비례해야 하며, 왕조차 자신의 의지보다 큰 무언가에 묶여야 한다. 3천 년간 아무도 읽지 못한 언어로 검은 돌에 새겨진 그 생각은 결국 파괴할 수 없는 것으로 드러났다.",

  // ─── Preserved fields from English record ───
  icon: "\u2696\uFE0F",
  storyCategory: "crowns_conquests",
  era: "c. 1755-1750 BCE (code\u2019s promulgation); discovered at Susa, Iran, in 1901-1902",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  coordinates: { lat: 32.5363, lng: 44.4209 },
  characters: [
    "Hammurabi -- sixth king of the First Babylonian Dynasty (r. 1792-1750 BCE)",
    "Shamash -- the sun god of justice, depicted handing Hammurabi the rod and ring of kingship",
    "Shutruk-Nahhunte -- Elamite king who looted the stele as war booty around 1158 BCE",
    "Jacques de Morgan -- French archaeologist who discovered the stele at Susa in 1901-1902",
    "Jean-Vincent Scheil -- Dominican friar who translated the code and revealed it to the modern world",
  ],
  source:
    "The Code of Hammurabi (Louvre, Sb 8); Scheil, Jean-Vincent. M\u00E9moires de la D\u00E9l\u00E9gation en Perse, vol. 4, 1902 (first translation); Roth, Martha T. Law Collections from Mesopotamia and Asia Minor, Scholars Press, 1995; Van De Mieroop, Marc. King Hammurabi of Babylon: A Biography, Blackwell, 2005; Richardson, Seth. \u2018On Seeing and Believing: Liver Divination and the Era of Warring States,\u2019 in Divination and Interpretation of Signs in the Ancient World, Oriental Institute, 2010; Driver, G.R. and Miles, John C. The Babylonian Laws, 2 vols., Oxford, 1952-1955; Charpin, Dominique. Hammurabi of Babylon, I.B. Tauris, 2012; Laws of Ur-Nammu (c. 2100 BCE); Laws of Eshnunna (c. 1930 BCE)",
  disabled: false,
  updatedAt: Math.floor(Date.now() / 1000),
};

async function main() {
  await doc.send(
    new PutCommand({
      TableName: "Story",
      Item: record,
      ConditionExpression: "attribute_not_exists(siteId)",
    })
  );

  console.log("Korean version created successfully!");
  console.log(`  siteId: ${record.siteId}`);
  console.log(`  langStoryId: ${record.langStoryId}`);
  console.log(`  title: ${record.title}`);

  let totalChars = 0;
  record.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  });
  console.log(`  Total: ${totalChars} chars`);
}

main().catch((err) => {
  if (err.name === "ConditionalCheckFailedException") {
    console.error(
      "ERROR: Korean record already exists! Aborting to prevent overwrite."
    );
  } else {
    console.error("ERROR:", err.message);
  }
  process.exit(1);
});
