import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: "abu-simbel",
  langStoryId: "ko#solar-alignment-miracle",
  lang: "ko",
  storyId: "solar-alignment-miracle",
  title: "태양이 절하는 순간",
  subtitle: "1년에 두 번, 3,200년째 반복되는 빛의 기적",
  excerpt:
    "1년에 딱 두 번, 이집트 아부심벨 신전에서 불가능한 일이 벌어진다. 한 줄기 햇빛이 60미터의 바위를 관통해 칠흑 같은 어둠 속 세 석상의 얼굴을 비추는 것이다.",
  paragraphs: [
    {
      text: "1년에 딱 두 번, 이집트 남부 아부심벨에서 말이 안 되는 일이 벌어진다. 2월 22일과 10월 22일, 해가 뜨는 순간 한 줄기 빛이 신전 입구로 들어와 60미터에 달하는 바위 속을 꿰뚫는다. 복도를 지나고, 방을 지나고, 또 방을 지나 — 신전의 가장 깊고 가장 어두운 곳까지. 그리고 거기서 일 년 내내 캄캄한 어둠 속에 앉아 있던 세 석상의 얼굴을 비춘다.",
    },
    {
      text: "빛이 닿는 건 세 존재다. 신들의 왕 아문라. 떠오르는 태양의 신 라호라크티. 그리고 이 신전을 세운 장본인, 감히 자기 석상을 신들 사이에 앉힌 파라오 — 람세스 2세. 약 20분간 셋의 얼굴이 황금빛으로 타오르는 동안, 네 번째 석상은 어둠 속에 남는다. 어둠과 저승의 신 프타. 우연이 아니다. 태양조차 누가 빛의 자리이고 누가 어둠의 자리인지 구별한다는 뜻이다.",
    },
    {
      text: "진짜 소름 돋는 건 여기서부터다. 기원전 1244년경, 3천 년도 더 전 얘기다. 망원경도 없었다. 컴퓨터도 없었다. GPS 같은 건 상상조차 못 할 시대였다. 그런데 이 사람들은 1년 중 딱 이틀, 해가 정확히 어디서 뜨는지 계산해냈고, 각도를 잡아냈고, 절벽을 통째로 깎아 60미터짜리 빛의 통로를 만들었다. 기회는 딱 한 번이었다. 산을 옮겨서 다시 할 수는 없으니까.",
    },
    {
      text: "2월 22일은 람세스 2세의 생일, 10월 22일은 즉위 기념일로 알려져 있다. 학자들 사이에선 이견이 있지만, 솔직히 그건 핵심이 아니다. 누군가가 태양마저 정해진 날짜에 한 인간에게 절하도록 건물을 설계했다는 사실. 그게 핵심이다. 그리고 태양은 3천 년이 넘도록 그 약속을 한 번도 어기지 않았다.",
    },
    {
      text: "매년 수천 명이 새벽녘 아부심벨에 모인다. 그리고 마침내 그 순간이 온다 — 첫 빛줄기가 입구를 뚫고, 60미터의 어둠을 천천히 기어가서, 세 석상의 얼굴이 칠흑 속에서 금빛으로 번쩍 타오르는 순간. '세 번 찍어 안 넘어가는 나무 없다'고 했다. 하지만 이 건축가들은 단 한 번에 해냈고, 그 한 번이 3천 년을 버텼다.",
    },
    {
      text: "1960년대, 아스완 하이댐 건설로 아부심벨이 물에 잠길 위기에 놓였다. 유네스코는 역사상 가장 대담한 구출 작전에 나섰다. 신전 전체를 1,036개 블록으로 잘라내 65미터 높은 절벽 위로 옮기고, 원래 모습 그대로 다시 맞춰 붙였다. 가장 큰 난관은 3천 년 전 고대 기술자들이 설정해놓은 천문학적 정렬을 그대로 재현하는 것이었다.",
    },
    {
      text: "거의 해냈다 — 거의. 이전 후 빛은 하루 늦게 도착한다. 2월 21일과 10월 21일. 이 하루의 오차가 모든 걸 말해준다. 현대 최고의 장비를 총동원해 신전을 통째로 옮기고도 24시간을 놓쳤다. 3천 년 전 건축가들은 눈과 수학과 믿음, 그 셋만으로 첫 시도에 정확히 맞췄다. 지금도 태양은 약속 시간에 나타난다.",
    },
  ],
  moralOrLesson:
    "가장 위대한 걸작은 인간의 손과 우주의 리듬이 만나는 순간에 태어나고, 진짜 정밀함은 그것을 만든 문명보다 오래간다.",
  icon: "☀️",
  tier: "A",
  source:
    "Desroches-Noblecourt, C. The Great Temple of Abu Simbel. Paris, 1968; UNESCO Technical Reports",
  characters: ["Ramesses II", "Amun-Ra", "Ra-Horakhty", "Ptah"],
  era: "New Kingdom (c. 1244 BC)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 22.3369, lng: 31.6256 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
};

async function push() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log("SUCCESS: Korean story pushed to DynamoDB");
    console.log(`  siteId: ${item.siteId}`);
    console.log(`  langStoryId: ${item.langStoryId}`);
    console.log(`  title: ${item.title}`);
    console.log(`  updatedAt: ${item.updatedAt}`);
    console.log(`  paragraphs: ${item.paragraphs.length}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Korean record already exists. Skipping to avoid overwrite.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
