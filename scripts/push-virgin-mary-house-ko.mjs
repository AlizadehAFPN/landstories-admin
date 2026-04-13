import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: { S: "ephesus" },
  langStoryId: { S: "ko#virgin-mary-house" },
  lang: { S: "ko" },
  storyId: { S: "virgin-mary-house" },
  title: { S: `\uC131\uBAA8\uC758 \uC9D1\uC744 \uCC3E\uC544\uB0B8 \uB0A0` },
  subtitle: { S: `\uB3C5\uC77C\uC758 \uC791\uC740 \uB9C8\uC744\uC5D0\uC11C \uD3C9\uC0DD \uB204\uC6CC \uC9C0\uB0B8 \uC218\uB140\uAC00, \uBCF8 \uC801 \uC5C6\uB294 \uC9D1\uC744 \uC815\uD655\uD788 \uBBC0\uC0AC\uD588\uB2E4` },
  excerpt: { S: `침대에서 일어나지도 못했다. 1800년대 초 독일의 작은 마을 뒬멘에 안네 카타리나 에머리히라는 수녀가 살았다. 생의 마지막 몇 년은 통째로 병상 위에서 보냈다. 그런데 바로 그 침대 위에서, 그녀는 아무도 설명할 수 없는 이야기를 꺼냈다.` },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: `침대에서 일어나지도 못했다. 1800년대 초, 독일의 작은 마을 뒬멘에 안네 카타리나 에머리히라는 수녀가 살고 있었다. 삶의 마지막 몇 년은 온전히 병상 위에서 보냈다. 그런데 바로 그 침대 위에서 그녀는 불가능한 일을 해냈다. 한 번도 가본 적 없는 나라에 있는, 한 번도 본 적 없는 집을 묘사한 것이다. 그리고 육십 년 뒤, 누군가 그 말을 따라 찾아갔더니\u2014\u2014진짜 거기 있었다.`
          },
        },
      },
      {
        M: {
          text: {
            S: `에머리히는 어릴 때부터 환시를 경험했다. 성경 속 장면이 갑자기 눈앞에 펼쳐지면서 마치 자기가 그 현장에 서 있는 것 같았다고 한다. 양 손과 양 발에는 예수의 십자가형과 같은 자리에 상처가 나타났다. 이른바 \u2018성흔\u2019인데, 당시 의사들이 몇 번이고 검사했지만 원인을 밝혀내지 못했다. 1820년부터 1824년까지 독일 시인 클레멘스 브렌타노가 거의 매일 그녀 곁에 앉아 환시의 내용을 받아 적었고, 이것이 나중에 책으로 출간됐다.`
          },
        },
      },
      {
        M: {
          text: {
            S: `수많은 환시 가운데 유독 하나가 소름 끼칠 정도로 구체적이었다. 성모 마리아가 마지막으로 살았던 집에 대한 묘사였다. 고대 도시 에페소스가 내려다보이는 산 위, 지금의 터키 서해안에 있는 작은 돌집. 기독교 전승에 따르면 예수가 십자가에 못 박힌 뒤, 사도 요한이 마리아를 이곳으로 데려와 지켜줬다고 전해진다. 에머리히는 방의 구조, 집 옆의 샘물, 산의 윤곽, 창밖으로 보이는 바다까지 놀라울 만큼 세세하게 말했다.`
          },
        },
      },
      {
        M: {
          text: {
            S: `1881년, 프랑스 신부 줄리앙 구예가 이 기록을 읽고 직접 확인하러 떠났다. 에머리히의 글만을 유일한 지도 삼아 에페소스로 향했고, 코레소스 산을 올랐다. 현지 사람들은 이 산을 \u2018뷜뷜 다으\u2019, 즉 \u2018나이팅게일의 산\u2019이라 부른다. 그녀가 묘사한 바로 그 자리에, 돌로 지은 작은 집의 폐허가 있었다. 샘물도 있었다. 방의 배치도 맞았다. 그녀가 말한 모든 것이, 하나도 빠짐없이 들어맞았다.`
          },
        },
      },
      {
        M: {
          text: {
            S: `십 년 뒤, 라자리스트 선교단이 고고학자들과 함께 돌아와 본격적인 발굴을 시작했다. 결과는 충격이었다. 기초 부분의 연대가 기원후 1세기로 나온 것이다. 마리아가 실제로 이곳에서 살았을 수 있는 바로 그 시기. 중세에 전설 위에 전설을 쌓아 만들어낸 유적이 아니었다. 돌 자체가 진짜였고, 나이도 충분했다.`
          },
        },
      },
      {
        M: {
          text: {
            S: `바티칸도 이 발견을 외면하지 못했다. 1896년 교황 레오 13세가 이곳을 공식 순례지로 선포했다. 이후 세 명의 교황이 직접 찾았다. 1967년 바오로 6세, 1979년 요한 바오로 2세, 2006년 베네딕토 16세. 하지만 이곳을 찾는 건 기독교인만이 아니다. 이슬람에서도 마리아는 \u2018마르얌\u2019이라 불리며 깊이 공경받고 있고, 꾸란에는 그녀의 이름을 딴 장이 통째로 있다. 이 작은 집은 종교의 경계를 넘어 사람들을 끌어당기고 있다.`
          },
        },
      },
      {
        M: {
          text: {
            S: `한국에는 \u2018세 번 찍어 안 넘어가는 나무 없다\u2019라는 속담이 있다. 하지만 이 이야기에서는 세 번이 아니라 다섯 번, 여섯 번, 일곱 번이다. 방 구조, 샘물 위치, 산 모양, 바다 방향, 돌의 나이\u2014\u2014침대에서 일어나지도 못하던 사람이 말한 것이 전부 맞았다. 에머리히는 평생 독일을 떠난 적이 없었다. 에페소스 지도를 본 적도 없었고, 그곳에 다녀온 사람을 만난 적도 없었다. 뒬멘의 그 작은 방에서 무슨 일이 있었는지, 우리는 모른다. 하지만 산 위의 그 집은 실재한다. 오늘도 그 문을 열고 안으로 들어갈 수 있다.`
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: `설명할 수 없는 일은 존재한다. 그 집은 아직도 산 위에 있고, 답은 여전히 나오지 않았다.`,
  },
  source: {
    S: "Anne Catherine Emmerich visions, compiled by Clemens Brentano; Lazarist expedition records; Papal recognitions",
  },
  characters: {
    L: [
      { S: "Virgin Mary" },
      { S: "John the Apostle" },
      { S: "Anne Catherine Emmerich" },
      { S: "Abb\u00E9 Julien Gouyet" },
    ],
  },
  era: { S: "1st century AD (house) / 1881 (discovery)" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  thumbnail: { S: "" },
  icon: { S: "\uD83C\uDFE0" },
  tier: { S: "A" },
  coordinates: {
    M: {
      lng: { N: "27.3333" },
      lat: { N: "37.9147" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  storyCategory: { S: "prophets_pilgrims" },
  updatedAt: { N: String(now) },
};

async function main() {
  try {
    await client.send(
      new PutItemCommand({
        TableName: "Story",
        Item: item,
      })
    );
    console.log("ko#virgin-mary-house pushed successfully");
  } catch (err) {
    console.error("Failed to push ko version:", err);
    process.exit(1);
  }
}

main();
