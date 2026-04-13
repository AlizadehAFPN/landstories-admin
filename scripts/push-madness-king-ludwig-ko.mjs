// Push Korean recreation of "The Madness of King Ludwig II"
// to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical to English record) ────────────────────────────
const shared = {
  siteId: "neuschwanstein-castle",
  storyId: "madness-of-king-ludwig",
  icon: "\u{1F451}",
  storyCategory: "lost_found",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 47.5576, lng: 10.7498 },
  source:
    "McIntosh, Christopher. The Swan King: Ludwig II of Bavaria, 2012; Blunt, Wilfrid. The Dream King, 1970; Bavarian State Archives",
  era: "19th century (1864-1886)",
  characters: [
    "King Ludwig II of Bavaria",
    "Richard Wagner",
    "Bavarian ministers",
    "Dr. Bernhard von Gudden",
  ],
};

// ─── Korean (ko) ────────────────────────────────────────────────────────────
const ko = {
  ...shared,
  lang: "ko",
  langStoryId: "ko#madness-of-king-ludwig",
  updatedAt: now,
  title: "꿈에 미친 왕",
  subtitle:
    "권력 대신 아름다움을 택한 왕, 그리고 그가 절벽 위에 남긴 것",
  excerpt:
    "1864년, 열여덟 살 소년이 바이에른의 왕이 됐다. 그가 원한 건 왕좌가 아니라 음악이었다. 작곡가 바그너에게 보낸 편지 한 통으로, 역사에서 가장 무모하고 아름다운 집착이 시작됐다.",
  moralOrLesson:
    "세상은 권력보다 아름다움을 택한 사람을 벌한다. 하지만 그가 남긴 것은, 그를 벌한 모든 왕좌보다 오래간다.",
  paragraphs: [
    {
      text: "1864년, 열여덟 살 소년이 바이에른의 왕이 됐다. 키 크고, 머리카락 짙고, 잘생긴 청년. 문제는 이 사람이 권력에 전혀 관심이 없었다는 거다. 루트비히 2세가 원한 건 음악이었다. 왕이 된 지 몇 주 만에, 작곡가 리하르트 바그너에게 편지를 보냈다. \u201c당신 어깨 위의 짐을 영원히 덜어드리겠습니다. 당신은 나에게 신입니다.\u201d 열여덟이 쉰한 살에게. 역사에서 가장 무모하고, 가장 아름다운 집착은 그렇게 시작됐다.",
    },
    {
      text: "루트비히는 나라 곳간을 바그너에게 쏟아부었다. 빚을 갚아주고, 바그너가 수십 년간 꿈꿔온 바이로이트 축제극장을 지어줬다. 불 꺼진 뮌헨 극장 객석에 혼자 앉아, 자기만을 위한 오페라를 들으며 울었다. 관객 한 명. 무대 위 오케스트라 전부. 정치인들은 난리가 났다. 결국 바그너를 도시에서 내쫓았다. 그래도 루트비히는 안 변했다. 나라 살림에는 눈길도 안 주면서, 음악 하나를 위해서라면 뭐든 하는 왕이었다.",
    },
    {
      text: "현실이 마음에 안 들면, 루트비히는 자기 세상을 지었다. 성 세 채. 갈수록 더 화려하게. 린더호프에는 지하 동굴 속 비밀 호수가 있었다. 왕은 거기서 금빛 배를 타고 떠다녔고, 동굴 벽에 바그너 음악이 울려 퍼졌다. 헤렌킴제는 프랑스 베르사유 궁전을 섬 위에 통째로 다시 지은 것이었다. 거울의 방은 원본보다 더 길었다. 그리고 노이슈반슈타인. 알프스 절벽 위에 세운 이 성은, 처음부터 끝까지 바그너 오페라의 무대였다.",
    },
    {
      text: "해가 갈수록 루트비히는 점점 이상해졌다. 낮과 밤을 바꿔 살았다. 새벽 세 시에 횃불 켜고 금빛 썰매를 타고 숲을 달렸다. 저녁이면 존재하지 않는 손님들을 위해 식탁을 차렸다. 루이 14세, 마리 앙투아네트 \u2014 수백 년 전에 죽은 프랑스 왕족들. 빈 의자를 바라보며 식사 내내 그들과 대화했다. 하늘을 나는 기계를 설계하고, 열기구로만 갈 수 있는 바위 꼭대기 위의 성도 그렸다. 둘 다 지어지지 않았다.",
    },
    {
      text: "1886년 6월 8일, 루트비히를 단 한 번도 직접 만나본 적 없는 정신과 의사 네 명이 그에게 미쳤다는 판정을 내렸다. 이틀 뒤, 관리들이 노이슈반슈타인으로 올라왔다. 성 경비병들이 첫 번째 무리를 돌려보냈고, 짧은 몇 시간 동안 왕은 자기가 지은 전설 속 주인공처럼 성을 지켰다. 하지만 두 번째 시도가 성공했다. 왕관을 뺏기고, 슈타른베르크 호수 옆 베르크 성으로 끌려갔다. 동화를 지은 사람이 죄수가 됐다.",
    },
    {
      text: "사흘 뒤, 6월 13일 저녁. 루트비히는 담당 의사 구덴 박사와 호숫가를 걸으러 나갔다. 둘 다 돌아오지 않았다. 그날 밤, 두 사람의 시신이 얕은 물에서 발견됐다. 루트비히, 마흔 살. 공식 사인은 익사. 하지만 시신이 발견된 곳은 물이 겨우 허리까지였고, 루트비히는 수영을 잘했다. 그날 밤 무슨 일이 벌어졌는지, 백 년이 넘도록 아무도 모른다.",
    },
    {
      text: "세 번 찍어 안 넘어가는 나무 없다고 했다. 그들은 바그너를 쫓아냈고, 왕관을 뺏었고, 마지막에 자유까지 가져갔다. 나무는 쓰러졌다. 하지만 그 나무가 남긴 성에 지금 매년 140만 명이 찾아온다. 월트 디즈니가 노이슈반슈타인을 보고 잠자는 숲속의 공주 성을 만들었다. 왕을 가둔 이유가 됐던 그 미친 꿈이, 지구에서 가장 유명한 성이 됐다. 루트비히의 장관들은 아무도 기억 못 한다. 그의 정부는 역사책 각주일 뿐이다. 하지만 그들이 부수려 한 꿈은? 아직도 알프스 절벽 위에 서 있다.",
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────────────
async function push(item) {
  const label = `${item.lang}#${item.storyId}`;
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`✅  ${label} pushed successfully`);
  } catch (err) {
    console.error(`❌  ${label} FAILED:`, err);
    process.exitCode = 1;
  }
}

await push(ko);
