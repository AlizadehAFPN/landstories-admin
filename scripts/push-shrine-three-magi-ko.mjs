import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "cologne-cathedral" },
  langStoryId: { S: "ko#shrine-of-the-three-magi" },
  lang: { S: "ko" },
  storyId: { S: "shrine-of-the-three-magi" },
  title: { S: "동방박사의 황금 성물함" },
  subtitle: { S: "밀라노에서 훔친 동방박사의 유골이 쾰른을 북유럽 최대의 성지로 만들기까지" },
  excerpt: { S: "1164년, 말을 탄 무장 병사들이 밀라노에서 황금 궤짝 하나를 끌고 나왔다. 알프스를 넘고 라인강을 따라 북쪽으로 향한 이 행렬의 선두에는 쾰른 대주교이자 바르바로사 황제의 오른팔, 라인알트 폰 다셀이 있었다." },
  moralOrLesson: { S: "믿음의 가장 위대한 보물은 종종 전쟁의 전리품이다—훔친 뼈 위에 성스러움을 세운 도시는, 그 진실에서 결코 자유로울 수 없다." },
  icon: { S: "👑" },
  tier: { S: "A" },
  era: { S: "12th-13th century (1164-1225)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "prophets_pilgrims" },
  updatedAt: { N: "1773513041" },
  coordinates: {
    M: {
      lat: { N: "50.9413" },
      lng: { N: "6.9583" },
    },
  },
  source: { S: "Cardini, Franco. The Three Magi: History and Legend; Wolff, Arnold. The Cologne Cathedral; Kessel, Johann Hubert. Antiquitates Colonienses, 1863" },
  characters: {
    L: [
      { S: "Rainald von Dassel (Archbishop of Cologne)" },
      { S: "Emperor Frederick Barbarossa" },
      { S: "Nicholas of Verdun (goldsmith)" },
      { S: "The Three Magi (Caspar, Melchior, Balthasar)" },
      { S: "Empress Helena" },
    ],
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1164년, 말을 탄 무장 병사들이 밀라노에서 황금 궤짝 하나를 끌고 나왔다. 알프스를 넘고 라인강을 따라 북쪽으로 향한 이 행렬의 선두에는 라인알트 폰 다셀이 있었다. 쾰른 대주교이자 프리드리히 바르바로사 황제의 오른팔. 궤짝 안에는 동방박사 세 사람의 유골이 들어 있었다—아기 예수에게 황금과 유향과 몰약을 바쳤다는, 바로 그 현자들의 뼈.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그런데 중동 출신 현자들의 뼈가 어쩌다 이탈리아에 있었을까. 이야기는 4세기로 거슬러 올라간다. 기독교를 공인한 로마 황제 콘스탄티누스의 어머니 헬레나 황후가 각지를 돌며 성물을 수집했는데, 페르시아에서 동방박사의 유골을 찾아 콘스탄티노플로 가져온 것이다. 그 뼈는 다시 밀라노로 옮겨져 산테우스토르조 성당에서 약 800년간 조용히 모셔졌다. 바르바로사가 나타나기 전까지.",
          },
        },
      },
      {
        M: {
          text: {
            S: "밀라노는 수년간 황제에 맞서왔다. 1162년, 바르바로사는 2년에 걸친 포위 끝에 마침내 도시를 함락시켰다. 점령만 한 게 아니었다. 성벽을 무너뜨리고, 건물을 부수고, 시민들을 사방으로 흩어버렸다. 북이탈리아 모든 도시에 보내는 경고였다. 그리고 마지막 모욕—라인알트가 밀라노의 가장 신성한 보물, 동방박사의 유골을 챙겨 쾰른으로 떠나버렸다. 중세 역사상 최대의 성물 약탈이었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "효과는 즉각적이었다. 유럽 전역에서 순례자들이 쾰른으로 밀려들었다. 기존 성당으로는 감당이 안 됐고, 새로 짓기 시작한 것이 지금도 서 있는 고딕 양식의 쾰른 대성당이다. 유골을 모실 성물함 제작은 당대 최고의 금세공사 니콜라스 폰 베르됭에게 맡겨졌다. 1225년경 완성된 이 성물함은 서유럽 최대의 황금 유골함—길이 2미터가 넘는 금도금 궤짝에 천 개 넘는 보석과 예언자, 사도, 왕의 금상이 촘촘히 박혀 있었다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "도둑이 제 발 저린다고 했던가. 쾰른은 달랐다. 발이 저리기는커녕, 훔친 뼈 위에 도시 전체를 세웠다. 순례자들에게 숙소와 식사를 팔아 부를 쌓았고, 시의 문장에 세 개의 황금 왕관을 새겼다. 동방박사가 아기 예수를 찾아간 날을 기리는 주현절은 쾰른 최대의 축일이 됐다. 무력으로 빼앗은 뼈를 황금 궤짝에 가두고, 그 위에 북유럽 최고의 성지를 만들어낸 것이다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "밀라노는 잊지 않았다. 800년을 요구했다. 1903년, 마침내 쾰른이 뼛조각 몇 점을 돌려보냈고, 그것들은 산테우스토르조 성당에 다시 안치됐다. 하지만 나머지는 끝내 돌아오지 않았다. 지금도 니콜라스 폰 베르됭이 만든 황금 성물함 안에, 그것을 위해 지어진 대성당의 제단 뒤에 놓여 있다. 800년이 흘러도, 전설 속 세 왕의 뼈는 여전히 라인강변에서 사람들을 불러 모은다.",
          },
        },
      },
    ],
  },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("SUCCESS: Korean story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("siteId: cologne-cathedral");
    console.log("langStoryId: ko#shrine-of-the-three-magi");
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
}

push();
