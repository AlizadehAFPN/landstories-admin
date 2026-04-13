import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  TableName: "Story",
  Item: {
    siteId: { S: "buda-castle" },
    langStoryId: { S: "ko#great-siege-1686" },
    lang: { S: "ko" },
    storyId: { S: "great-siege-1686" },
    title: { S: "불의 강" },
    subtitle: { S: "145년의 사슬을 끊은 78일" },
    excerpt: { S: "오스만 제국이 부다를 차지한 건 1541년이었다. 헝가리 왕국의 심장이자 다뉴브강이 내려다보이는 언덕 위의 수도." },
    moralOrLesson: { S: "자유는 때로 폭정보다 비싼 값을 치르게 한다." },
    icon: { S: "⚔️" },
    tier: { S: "A" },
    source: { S: "Habsburg military archives; Ottoman defteris; European gazettes" },
    era: { S: "June 18 - September 2, 1686" },
    readingTimeMinutes: { N: "2" },
    image: { S: "" },
    thumbnail: { S: "" },
    hasAudio: { BOOL: false },
    isFree: { BOOL: true },
    disabled: { BOOL: false },
    storyCategory: { S: "crowns_conquests" },
    updatedAt: { N: "1773510640" },
    coordinates: {
      M: {
        lat: { N: "47.497" },
        lng: { N: "19.039" },
      },
    },
    characters: {
      L: [
        { S: "Charles of Lorraine" },
        { S: "Abdurrahman Abdi Pasha (Ottoman Commander)" },
        { S: "Eugene of Savoy" },
      ],
    },
    paragraphs: {
      L: [
        {
          M: {
            text: {
              S: "오스만 제국이 부다를 차지한 건 1541년이었다. 헝가리 왕국의 심장이자 다뉴브강이 내려다보이는 언덕 위의 수도. 그 도시가 무려 145년 동안 오스만의 깃발 아래 있었다. 1686년, 유럽이 더 이상 참지 못했다. 오스트리아, 바이에른, 브란덴부르크를 비롯해 십여 개 나라의 연합군이 다뉴브강을 따라 집결했다. 목표는 하나, 부다를 되찾는 것.",
            },
          },
        },
        {
          M: {
            text: {
              S: "6월 중순, 포성이 하늘을 갈랐다. 양쪽 모두 밤낮없이 대포를 쏘아댔고, 몇 주 만에 귀가 먹은 병사들이 속출했다. 성벽 일부가 무너지면 공격군이 틈새로 몰려들었지만, 오스만 수비대는 골목 하나, 지붕 하나까지 꿰고 있었다. 석회암 절벽 위에 우뚝 선 부다 성은 다가가는 것 자체가 목숨을 거는 일이었다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "8월이 되자 진짜 적이 나타났다. 전염병이었다. 참호는 무덤이 되었고, 군의관들은 붕대가 떨어져 전사자의 군복을 찢어 상처를 감았다. 총사령관 로렌의 카를 공작은 냉혹한 현실을 직시했다. 겨울이 오기 전에 부다가 안 떨어지면, 군대가 먼저 무너진다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "9월 2일, 카를 공작은 모든 것을 걸었다. 오후가 되자 사방에서 병사들이 무너진 성벽을 타고 밀려들었다. 골목마다, 문 앞마다 칼과 총이 맞부딪쳤다. 자비 같은 건 없었다. 외곽 도시는 몇 시간 만에 함락됐지만, 절벽 위의 성만은 끝까지 버텼다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "그리고 마침내 성벽이 무너졌다. 최후의 돌격을 이끈 건 헝가리 병사들이었다. 그들에게 이건 남의 성이 아니라 자기 수도였으니까. 145년을 기다린 사람들이었다. 오스만 총독 아브두라흐만 압디 파샤는 항복할 수 있었다. 하지만 칼을 뽑아 들고 싸우다 죽는 쪽을 택했다. 성을 지키겠다는 맹세를 끝까지 지킨 것이다. 만 명이었던 오스만 수비대 중 살아남은 건 500명이 채 안 됐다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "세 번 찍어 안 넘어가는 나무 없다고 했던가. 유럽은 145년을 찍었고, 결국 부다는 넘어졌다. 그런데 '승리'라는 말이 어울리는 광경은 아니었다. 공격군 쪽에서만 2만 명 넘게 죽었다. 도시는 폐허가 됐다. 200년 전 마차시 왕이 모은 유럽 최고의 장서, 코르비나 도서관은 잿더미가 되었다. 도시를 해방한 게 아니라 묘지를 해방한 셈이었다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "그래도 1686년 9월 2일은 헝가리 역사에서 가장 빛나는 날 중 하나가 되었다. 소식이 전해지자 전국에서 교회 종이 울렸다. 거의 한 세기 반 만에 부다가 다시 헝가리의 것이 되었다. 대가는 도시가 가진 모든 것이었지만, 자유의 기억을 아직 간직한 사람들에게는 폐허라도 남의 궁전보다 나았다.",
            },
          },
        },
      ],
    },
  },
};

try {
  const result = await client.send(new PutItemCommand(item));
  console.log("SUCCESS: Korean story pushed to DynamoDB");
  console.log("HTTP Status:", result.$metadata.httpStatusCode);
  console.log("Record: ko#great-siege-1686 for siteId=buda-castle");
} catch (error) {
  console.error("FAILED:", error.message);
  process.exit(1);
}
