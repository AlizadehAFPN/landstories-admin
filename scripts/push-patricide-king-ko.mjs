import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const now = Math.floor(Date.now() / 1000);

const item = {
  TableName: "Story",
  Item: {
    siteId: { S: "sigiriya" },
    langStoryId: { S: "ko#patricide-king" },
    lang: { S: "ko" },
    storyId: { S: "patricide-king" },
    title: { S: "아버지를 죽인 왕" },
    subtitle: {
      S: "아버지를 죽이고 하늘 위에 궁전을 지었다. 하지만 아무리 높이 올라가도, 죄는 따라왔다.",
    },
    excerpt: {
      S: "5세기 스리랑카. 왕이 될 수 없었던 왕자가 아버지를 죽이고, 밀림 한가운데 바위 꼭대기에 왕좌를 세웠다. 신조차 올려다봐야 할 만큼 높은 곳에.",
    },
    icon: { S: "\ud83d\udc51" },
    tier: { S: "S" },
    paragraphs: {
      L: [
        {
          M: {
            text: {
              S: "서기 473년, 스리랑카. 카샤파라는 왕자가 자기 아버지를 죽였다. 이유는 단순했다. 왕이 되고 싶었으니까. 아버지 다투세나는 고대 수도 아누라다푸라를 다스린 왕이었다. 나라 전체 논에 물을 댈 수 있는 거대한 저수지를 만든, 백성들이 진심으로 존경하는 왕. 문제는 카샤파의 어머니 신분이 낮았다는 거다. 왕위는 왕비의 아들인 이복동생 모갈라나 차지였다. 카샤파는 태어날 때부터 왕이 될 수 없는 사람이었다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "그 분노에 동맹이 생겼다. 왕의 조카이자 군 사령관 미가라. 다투세나 왕이 미가라의 어머니를 처형한 적이 있었다. 복수심에 불타는 미가라와 왕위에 굶주린 카샤파 \u2014 둘은 군대를 돌려 왕을 사로잡았다. 그리고 역사가 절대 잊지 못할 장면이 벌어졌다. 카샤파가 아버지를 끌고 간 곳은 다투세나가 직접 만든 저수지였다. \"보물을 어디 숨겼느냐.\" 늙은 왕은 쇠사슬에 묶인 두 손으로 물을 떠 보였다. \"내가 가진 재산은 이것뿐이다.\"",
            },
          },
        },
        {
          M: {
            text: {
              S: "백성에게 준 물이 자기 유산이라는 뜻이었다. 금이 아니라. 카샤파는 듣지 않았다. 미가라가 복수를 마무리했다. 늙은 왕의 옷을 벗기고, 쇠사슬로 묶은 채 벽돌 벽 안에 산 채로 가두었다. 백성에게 물을 주려고 저수지를 만든 왕이 \u2014 자기가 가르친 기술로 쌓은 벽 속에서 천천히 죽어갔다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "불교에서 아버지를 죽이는 건 사람이 저지를 수 있는 가장 무거운 죄다. 어떤 기도로도, 어떤 선행으로도 지울 수 없는 죄. 아누라다푸라의 승려들은 카샤파를 왕으로 인정하길 거부했다. 백성들은 그를 '아비를 죽인 자'라 불렀다. 이복동생 모갈라나는 바다를 건너 남인도로 도망쳐 복수의 군대를 모으기 시작했다. 카샤파는 왕관을 썼다. 하지만 그 왕관은 아무것도 증명하지 못했다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "그래서 카샤파는 역사에 전례 없는 결정을 내렸다. 수도를 통째로 버린 것이다. 새로 고른 곳은 평평한 밀림 한가운데 수직으로 솟은 거대한 바위. 높이 180미터, 꼭대기는 축구장 두 개 크기. 수백 년간 승려들이 동굴에서 수행하던 곳이었지, 그 위에서 살겠다고 나선 사람은 역사상 한 명도 없었다. 카샤파는 그 바위를 올려다보며 확신했을 것이다. 저기라면 군대도 못 오고, 승려도 나를 판단하지 못한다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "18년에 걸쳐 카샤파가 만든 건 상상을 초월했다. 바위 아래에는 1500년이 지난 지금도 물이 나오는 분수 정원. 절벽 중간에는 천녀들의 벽화와 거울처럼 닦아놓은 벽. 정상 입구는 높이 20미터짜리 거대한 사자 석상의 입이었다 \u2014 그 입을 지나야 꼭대기에 올라갈 수 있었다. 꼭대기에는 바위를 통째로 깎아 만든 궁전. 거기 딸린 수영장만 해도 올림픽 규격이었다.",
            },
          },
        },
        {
          M: {
            text: {
              S: "카샤파는 스스로를 신이라 선언했다. 금화를 찍고, 무역항을 열고, 자기를 거부한 승려들에게 절까지 지어줬다. 모든 벽화가, 모든 분수가 같은 말을 외치고 있었다 \u2014 나는 자격이 있다. 이건 내 것이다. 세 번 찍어 안 넘어가는 나무 없다고 했다. 카샤파는 세 번 도끼를 휘둘렀다. 아버지를 죽이고, 수도를 버리고, 하늘에 성을 쌓았다. 하지만 죄책감이라는 나무는 \u2014 천 번을 찍어도 넘어가지 않았다. 역사는 진작 알고 있었다. 카샤파가 세운 건 낙원이 아니었다. 세상에서 가장 아름다운 감옥이었다. 아무리 높이 올라가도, 이미 자기 안에 사는 것에게서는 도망칠 수 없으니까.",
            },
          },
        },
      ],
    },
    moralOrLesson: {
      S: "아버지의 피로 차지한 왕좌는 왕좌가 아니라 하늘 위의 감옥이다. 아무리 높은 성벽도, 이미 자기 안에 살고 있는 심판에게서는 지켜주지 못한다.",
    },
    source: {
      S: "Culavamsa (chapters 38-39); Geiger, Wilhelm, trans. Culavamsa: Being the More Recent Part of the Mahavamsa, 1929; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; De Silva, K.M. A History of Sri Lanka, 1981; UNESCO World Heritage Nomination File 202",
    },
    characters: {
      L: [
        { S: "\uce74\uc0e4\ud30c 1\uc138 (\uc544\ubc84\uc9c0\ub97c \uc8fd\uc778 \uc655)" },
        { S: "\ub2e4\ud22c\uc138\ub098 \uc655 (\uce74\uc0e4\ud30c\uc758 \uc544\ubc84\uc9c0)" },
        { S: "\ubaa8\uac08\ub77c\ub098 \uc655\uc790 (\uc774\ubcf5\ub3d9\uc0dd, \uc815\ub2f9\ud55c \ud6c4\uacc4\uc790)" },
        { S: "\ubbf8\uac00\ub77c (\ub2e4\ud22c\uc138\ub098\uc758 \uc870\uce74, \uad70 \uc0ac\ub839\uad00\uc774\uc790 \uacf5\ubaa8\uc790)" },
      ],
    },
    era: { S: "473-495 CE" },
    readingTimeMinutes: { N: "3" },
    image: { S: "" },
    thumbnail: { S: "" },
    coordinates: {
      M: {
        lng: { N: "80.7603" },
        lat: { N: "7.957" },
      },
    },
    hasAudio: { BOOL: false },
    isFree: { BOOL: true },
    disabled: { BOOL: false },
    storyCategory: { S: "crowns_conquests" },
    updatedAt: { N: String(now) },
  },
};

async function pushStory() {
  try {
    const command = new PutItemCommand(item);
    const result = await client.send(command);
    console.log("Successfully pushed Korean (ko) patricide-king story to DynamoDB!");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("Request ID:", result.$metadata.requestId);
    console.log("Key: siteId=sigiriya, langStoryId=ko#patricide-king");
  } catch (error) {
    console.error("Error pushing story:", error);
    process.exit(1);
  }
}

pushStory();
