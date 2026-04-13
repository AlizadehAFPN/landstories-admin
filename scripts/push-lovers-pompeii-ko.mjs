import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const item = {
  siteId: "pompeii",
  langStoryId: "ko#lovers-of-pompeii",
  lang: "ko",
  storyId: "lovers-of-pompeii",
  title: "화산이 남긴 포옹",
  subtitle: "화산보다 오래 남은 포옹, 그리고 백 년의 오해",
  excerpt: "서기 79년, 베수비오 화산이 터졌다. 폼페이는 화산재에 통째로 묻혔고, 수천 명이 한 발짝도 떼지 못한 채 숨졌다.",
  paragraphs: [
    {
      text: "서기 79년, 베수비오 화산이 터졌다. 폼페이는 화산재에 통째로 묻혔고, 수천 명이 한 발짝도 떼지 못한 채 숨졌다. 수백 년 뒤, 굳은 재 속에 사람 모양의 빈 공간이 남아 있다는 게 밝혀졌다. 거기에 석고를 부으면, 죽는 순간 그대로의 자세가 되살아났다. 수백 구의 석고상 중 유독 사람들의 발길을 멈추게 한 게 있었다. 두 사람이 서로를 껴안은 채, 끝까지 놓지 않고 있었다."
    },
    {
      text: "백 년이 넘도록, 이 석고상은 '두 처녀'라 불렸다. 당연히 젊은 여성 둘이라고 생각한 거다. 자세가 다정했고, 체격이 가녀려 보였으니까. 1800년대 학자들은 한 번도 의심하지 않았고, 관광 가이드들은 세대에 걸쳐 같은 설명을 반복했다. '두 처녀'는 폼페이의 상징이 됐다 — 재 속에 굳어버린 다정함."
    },
    {
      text: "그러다 2017년, 피렌체 대학 연구팀이 CT 촬영과 DNA 검사를 돌렸다. 석고상이 처음 만들어졌을 때는 존재하지도 않던 기술이었다. 결과는 백 년의 이야기를 단번에 뒤집었다. '두 처녀'는 처녀가 아니었다. 둘 다 남성, 나이는 열여덟에서 스무 살 사이. 화산이 세상을 삼키는 동안 서로를 붙잡고 있던 건 두 명의 젊은 남자였다."
    },
    {
      text: "뉴스는 전 세계로 퍼졌고, 질문은 하나로 모였다. 이 둘은 무슨 사이였을까? 과학은 거기까진 답할 수 없었다. 형제였을 수도, 절친한 친구였을 수도, 연인이었을 수도 있다. 고대 로마에서 남성 간의 관계는 흔하고 자연스러운 것이었지만, 누가 누구와 함께할 수 있는지는 신분에 따라 엄격히 정해져 있었다. 화산재는 이들의 몸은 지켰지만, 이야기까지 지켜 주진 않았다."
    },
    {
      text: "하늘이 무너져도 솟아날 구멍이 있다고 했다. 그런데 이 두 사람은 구멍을 찾지 않았다. 하늘이 진짜로 무너지던 그 순간, 이들이 찾은 건 서로였다. 한 명이 다른 한 명 위로 몸을 웅크렸고, 얼굴을 상대 몸에 묻은 채 팔로 꼭 감쌌다. 이 자세에 이름 같은 건 필요 없다. 형제도 이렇게 한다. 친구도 이렇게 한다. 연인도 이렇게 한다. 아끼는 사람을 혼자 보내지 않겠다는 것. 그게 전부다."
    },
    {
      text: "백 년간의 착각은 그 자체로 교훈이 됐다. 1800년대 학자들은 다정한 자세를 보고 '여자'라고 단정 지었다. 두 남자가 이렇게 서로를 안을 수 있다는 건 상상도 못 한 거다. 틀린 건 재 속의 두 사람이 아니라, 바라보는 쪽이었다."
    },
    {
      text: "지금 이 석고상은 '폼페이의 연인들'이라 불리기도 한다. 공식 이름은 아직 없다. 세대마다 이 포옹을 자기 시선으로 읽는다. 하지만 보이는 건 변하지 않는다. 스무 살이 채 안 된 두 청년이, 삶의 마지막 아침에 서로를 끌어안고 있었다는 것. 형제애든, 우정이든, 사랑이든 — 화산재는 신경 쓰지 않는다. 이 둘은 끝까지 놓지 않았다. 그게 이 이야기의 전부다."
    }
  ],
  moralOrLesson: "사랑의 모양이 뭐든, 모든 게 끝날 때 마지막으로 손이 가는 건 결국 사람이다. 그리고 죽은 이에 대해 우리가 하는 말은, 그들보다 우리 자신을 더 많이 보여준다.",
  icon: "💔",
  tier: "A",
  source: "Lazer, Estelle. Resurrecting Pompeii, 2009; University of Florence DNA study, 2017; National Geographic coverage",
  characters: ["껴안은 두 남성 (신원 미상, 18~20세)"],
  era: "79 AD (reanalyzed 2017)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 40.749, lng: 14.4875 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "lost_found",
  updatedAt: Math.floor(Date.now() / 1000)
};

async function push() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)"
      })
    );
    console.log("SUCCESS: Korean story pushed to DynamoDB");
    console.log(`  siteId: ${item.siteId}`);
    console.log(`  langStoryId: ${item.langStoryId}`);
    console.log(`  title: ${item.title}`);
    console.log(`  paragraphs: ${item.paragraphs.length}`);
    console.log(`  updatedAt: ${item.updatedAt}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Korean record already exists. Aborting to prevent overwrite.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
