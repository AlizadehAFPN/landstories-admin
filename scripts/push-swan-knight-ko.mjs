import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "neuschwanstein-castle" },
  langStoryId: { S: "ko#swan-knight-lohengrin" },
  storyId: { S: "swan-knight-lohengrin" },
  lang: { S: "ko" },
  title: { S: "백조의 기사" },
  subtitle: { S: "백조가 이끄는 배를 타고 나타나 한 왕에게 성을 짓게 만든 전설의 기사" },
  excerpt: { S: "이 이야기는 중세까지 거슬러 올라간다. 하지만 진짜 역사를 바꾼 건 1850년, 독일 작곡가 리하르트 바그너가 이걸 오페라로 만들면서다." },
  moralOrLesson: { S: "믿음은 묻지 말라 하고, 사람은 결국 묻게 되어 있다. 비극은 물어본 데 있지 않다. 비밀 위에 세운 사랑은 진실 앞에서 절대 살아남지 못한다는 것 — 그게 진짜 비극이다." },
  icon: { S: "🦢" },
  tier: { S: "A" },
  source: { S: "Wagner, Richard. Lohengrin, WWV 75, premiered 1850; Wolfram von Eschenbach, Parzival (c. 1200-1210); McIntosh, Christopher. The Swan King, 2012" },
  characters: {
    L: [
      { S: "로엔그린 (백조의 기사)" },
      { S: "브라반트의 엘자" },
      { S: "파르치팔 (로엔그린의 아버지)" },
      { S: "오르트루트 (마녀)" },
      { S: "바이에른의 루트비히 2세" },
      { S: "리하르트 바그너" }
    ]
  },
  era: { S: "중세 전설, 19세기 부활" },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "10.7498" },
      lat: { N: "47.5576" }
    }
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  storyCategory: { S: "love_heartbreak" },
  updatedAt: { N: "1773540258" },
  paragraphs: {
    L: [
      {
        M: {
          text: { S: "이 이야기는 중세까지 거슬러 올라간다. 하지만 진짜 역사를 바꾼 건 1850년, 독일 작곡가 리하르트 바그너가 이걸 오페라로 만들면서다. 배경은 서기 933년. 브라반트의 젊은 귀족 엘자가 친오빠를 죽였다는 누명을 쓴다. 진짜로는 오빠가 마녀 오르트루트의 저주에 걸려 백조로 변한 건데, 아무도 엘자 말을 안 믿는다. 결투재판에서 대신 싸워줄 사람도 없다. 이대로면 엘자는 죽는다." }
        }
      },
      {
        M: {
          text: { S: "그때 강 위로 배 한 척이 나타난다. 노도 없고 돛도 없다. 하얀 백조 한 마리가 배를 끌고 온다. 배 위에는 은빛 갑옷을 입은 기사가 서 있다. 이 세상 사람 같지 않다. 기사는 엘자 편에 서서 결투에서 이기고, 엘자에게 청혼한다. 단, 조건이 하나 있다. 절대로 이름을 묻지 마라. 어디서 왔는지도 묻지 마라. 묻는 순간, 나는 영원히 떠난다." }
        }
      },
      {
        M: {
          text: { S: "한동안은 괜찮았다. 기사는 브라반트를 잘 다스렸고, 엘자를 진심으로 사랑했다. 그런데 오르트루트가 가만히 있질 않는다. 밤마다 엘자 귀에 대고 속삭인다. 남편 이름도 모르면서 어떻게 사는 거야? 그게 부인이야? 의심은 처음엔 작았다. 하지만 모르는 게 약이라지만, 한번 자리 잡은 의심은 약으로도 못 고친다. 결국 첫날밤, 엘자가 입을 연다. \"당신은 누구예요? 어디서 온 거예요?\"" }
        }
      },
      {
        M: {
          text: { S: "기사의 얼굴이 슬픔으로 가득 찬다. 그의 이름은 로엔그린. 아버지는 파르치팔, 성배를 지키는 기사단의 일원이다. 성배가 그를 엘자에게 보낸 것이다. 하지만 성배의 힘은 오직 완전한 믿음 위에서만 유지된다. 의심하는 순간, 모든 게 끝이다. 로엔그린은 백조 앞에서 기도를 올린다. 그러자 백조가 엘자의 잃어버린 오빠로 돌아온다. 살아있고, 멀쩡하다. 하지만 로엔그린은 배에 올라 영원히 떠난다. 엘자는 그 모습을 바라보다 슬픔에 쓰러져 숨을 거둔다." }
        }
      },
      {
        M: {
          text: { S: "1861년, 열다섯 살 바이에른 왕자 루트비히가 뮌헨의 한 극장에서 바그너의 〈로엔그린〉을 본다. 완전히 무너졌다. 공연 내내 눈물을 흘렸고, 나중에 이렇게 적었다 — 내 인생을 바꾼 순간이었다고. 근데 루트비히는 그냥 감동받은 게 아니다. 그는 로엔그린이 되었다. 아름답고, 기이하고, 설명이 안 되는 사람. 사랑에 불가능한 조건을 거는 사람. 세상이 진실을 요구하면 차라리 사라져버리는 사람." }
        }
      },
      {
        M: {
          text: { S: "1864년, 루트비히는 겨우 열여덟에 바이에른의 왕이 된다. 그리고 전설을 돌로 쌓기 시작한다. 알프스 절벽 위에 동화 같은 성을 짓고, 온통 백조로 채웠다. 벽에 그리고, 가구에 새기고, 분수로 만들었다. 성 이름이 노이슈반슈타인 — '새로운 백조의 돌'이라는 뜻이다. 장식이 아니었다. 선언이었다. 나는 백조의 기사다. 세상이 답을 요구하는 순간, 나는 떠날 것이다." }
        }
      },
      {
        M: {
          text: { S: "세상은 답을 요구했다. 1886년, 루트비히의 정부는 그를 미치광이로 선언하고 왕위에서 끌어내렸다. 며칠 뒤, 그는 슈타른베르크 호수의 얕은 물에서 싸늘한 시체로 발견됐다. 어떻게 죽은 건지, 아직도 아무도 모른다. 로엔그린처럼, 루트비히도 사라졌다. 산꼭대기에 하얀 성 하나 남기고, 끝내 답할 수 없는 물음 하나 남기고." }
        }
      }
    ]
  }
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("SUCCESS: Korean Swan Knight Lohengrin (백조의 기사) pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
}

push();
