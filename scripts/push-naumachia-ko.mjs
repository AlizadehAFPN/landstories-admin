import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "colosseum-rome",
  langStoryId: "ko#naumachia-sea-battles",
  lang: "ko",
  storyId: "naumachia-sea-battles",

  // Text fields — Korean
  title: "바다가 된 콜로세움",
  subtitle: "황제의 명령 한마디에, 경기장이 바다로 변했다",
  excerpt:
    "서기 80년, 로마. 콜로세움이 처음 문을 열었다. 티투스 황제는 검투사 시합으로는 성에 안 찼다. 그래서 경기장 바닥에 물을 가득 채우고 진짜 군함을 띄웠다. 진짜 무기, 진짜 전투, 진짜 죽음.",
  moralOrLesson:
    "가장 거대한 제국은 사람뿐 아니라 자연마저 지배하려 했다. 하지만 아무리 대단한 볼거리도 시대의 변화 앞에서는 결국 사라진다.",

  paragraphs: [
    {
      text: "서기 80년, 로마. 콜로세움이 처음으로 문을 열었다. 티투스 황제는 개장 축하로 검투사 시합을 준비했는데, 그걸로는 성에 안 찼다. 그래서 이 사람이 뭘 했냐면 — 경기장 바닥에 물을 가득 채우고 진짜 군함을 띄웠다. 진짜 무기, 진짜 전투, 진짜 죽음. 허풍처럼 들리겠지만 여러 목격자가 기록을 남겼고, 현대 고고학자들이 그 흔적을 발굴해냈다.",
    },
    {
      text: "그날 관중석에 마르티알리스라는 시인이 앉아 있었다. 그는 직접 본 장면을 시로 남겼는데, 핵심은 이거다. 아침에는 분명 마른 땅이었는데, 오후에는 군함이 서로 들이받고 있었다. 해가 지면 다시 마른 땅. 경기장이 바다가 됐다가 육지가 됐다가를 반복하는 걸 보면, 건물이 아니라 살아 숨 쉬는 무언가를 보는 기분이었을 것이다.",
    },
    {
      text: "역사가 카시우스 디오의 기록은 더 구체적이다. 티투스는 배 몇 척 띄운 정도가 아니었다. 아테네 대 시라쿠사 같은 그리스 역사 속 유명 해전을 통째로 재현했다. 물에서 훈련받은 말과 소까지 동원됐고, 싸운 건 사형수들이었다. 진짜 칼을 쥐어주고 고대 선원 역할을 맡긴 것이다. 안전장치 같은 건 없었다. 물이 붉게 물들었다.",
    },
    {
      text: "이걸 가능하게 만든 기술력이 더 놀랍다. 경기장 바닥 아래에는 로마의 수도교와 연결된 수로가 깔려 있었다. 바닥은 방수 콘크리트로 밀봉해서 아래층으로 물이 새지 않게 했고, 거대한 수문으로 물의 양을 조절했다. 공연이 끝나면 배수 시스템이 몇 시간 만에 물을 빼냈다. 쉽게 말해, 경기장을 수영장으로도 쓸 수 있게 만든 건데 — 다만 그 수영장은 사람을 죽이기 위한 것이었다.",
    },
    {
      text: "이 해전은 딱 십 년 정도밖에 이어지지 못했다. 티투스의 동생이자 후계자인 도미티아누스 황제가 경기장 지하를 완전히 다른 용도로 바꿔버렸다. 동물 우리, 지하 통로, 기계식 승강기로 가득한 거대한 미로를 지은 것이다. 오늘날 콜로세움에 가면 보이는 그 지하 유적이 바로 이것이다. 나무 바닥과 복잡한 기계 장치가 들어서자, 물을 채우는 건 영영 불가능해졌다. 역사상 가장 미친 공연은 그렇게 사라졌다.",
    },
    {
      text: "세 번 찍어 안 넘어가는 나무가 없다지만, 로마는 나무 따위엔 관심이 없었다. 바다를 통째로 끌어왔으니까. 로마인들은 지중해를 '마레 노스트룸', 즉 '우리의 바다'라고 불렀다. 그 바다를 자기들의 가장 거대한 건물 안으로 끌어들인 것이다. 황제의 명 한마디에 물이 차오르고, 한마디에 빠져나갔다. 5만 명의 관중 앞에서 군함이 부딪히고 사람이 죽어가는 걸 본 로마 시민들에게 전해진 메시지는 딱 하나였다 — 로마가 다스리지 못할 것은 이 세상에 없다.",
    },
  ],

  // Preserved fields from English
  icon: "🚢",
  tier: "A",
  source:
    "Martial, De Spectaculis (Liber Spectaculorum); Cassius Dio, Roman History LXVI; Suetonius, Lives of the Caesars",
  characters: [
    "Emperor Titus",
    "Emperor Domitian",
    "Martial (poet)",
    "Cassius Dio (historian)",
    "Condemned prisoners",
  ],
  era: "Flavian Dynasty (80 AD)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  coordinates: { lat: 41.8902, lng: 12.4922 },
  updatedAt: Math.floor(Date.now() / 1000),
};

async function push() {
  console.log("Pushing Korean Naumachia story...");
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);
  console.log(`  updatedAt:   ${item.updatedAt}`);

  // Validate JSON roundtrip
  const serialized = JSON.stringify(item);
  const parsed = JSON.parse(serialized);
  if (parsed.paragraphs.length !== 6) {
    throw new Error("JSON validation failed: paragraph count mismatch");
  }
  if (parsed.lang !== "ko") {
    throw new Error("JSON validation failed: lang mismatch");
  }
  console.log("  JSON validation: PASSED");

  const result = await docClient.send(
    new PutCommand({
      TableName: "Story",
      Item: item,
    })
  );

  console.log(`  HTTP status: ${result.$metadata.httpStatusCode}`);
  if (result.$metadata.httpStatusCode === 200) {
    console.log("SUCCESS — Korean story pushed to DynamoDB.");
  } else {
    console.error("FAILED — unexpected status code");
    process.exit(1);
  }
}

push().catch((err) => {
  console.error("PUSH FAILED:", err);
  process.exit(1);
});
