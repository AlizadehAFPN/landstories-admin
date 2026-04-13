import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "alamut-castle",
  langStoryId: "ko#paradise-garden-legend",
  lang: "ko",
  storyId: "paradise-garden-legend",

  title: "낙원은 없었다",
  subtitle: "암살자에 대해 퍼진 가장 유명한 거짓말, 그리고 팔백 년간 묻혀 있던 진실",
  excerpt: "두 산 사이에, 산의 노인은 세상에서 가장 크고 아름다운 정원을 만들었다. 금빛 누각, 포도주와 우유와 꿀이 흐르는 시냇물, 그리고 세상에서 가장 아름다운 여인들이 있었다.",

  paragraphs: [
    {
      text: "1272년, 베네치아 상인 마르코 폴로는 페르시아 북부의 산길을 지나고 있었다. 알라무트 성은 이미 없었다. 몽골군이 16년 전에 부숴버렸으니까. 하지만 실크로드 장터에서 그가 들은 이야기는 팔백 년을 살아남았다. 두 산 사이 숨겨진 계곡, 황금 누각, 꿀과 포도주가 흐르는 시냇물, 세상에서 가장 아름다운 여인들.",
    },
    {
      text: "전설은 이랬다. 십자군이 '산의 노인'이라 부른 하산 이 사바흐는 마을 청년들을 골라 약을 먹여 재운 뒤, 이 정원으로 데려갔다. 눈을 뜬 청년들은 자기가 진짜 천국에 온 줄 알았다. 며칠 뒤 다시 약을 먹여 데리고 나오면, 하산이 말했다. \"나를 따르면 다시 보내주마. 죽음도 마다하지 마라.\"",
    },
    {
      text: "이렇게 중세 역사상 가장 두려운 암살자들이 만들어졌다고 한다. 단검 하나 들고 왕궁에 잠입해, 대낮에 표적을 찌르고, 도망치지도 않았다. 적들은 이들을 '하시신'이라 불렀다 — 대마초나 피우는 자들이란 비하의 별명이었다. 이 단어가 유럽에 건너가 'assassin'이 됐다. 영어로 '암살자'라는 뜻이다.",
    },
    {
      text: "그런데 전부 거짓이었다. 역사학자 파르하드 다프타리가 1994년에 밝혀냈다. 그 정원은 처음부터 존재한 적이 없었다. 하산의 추종자들이 남긴 기록에도, 같은 시대 이슬람 역사가들의 기록에도 약물이나 정원 이야기는 한 줄도 없다. 1256년 몽골군이 알라무트를 점령했을 때 역사가 주바이니가 직접 안을 뒤져봤다. 창고, 작업장, 도서관. 황금 누각도 없고, 꿀 시냇물도 없었다.",
    },
    {
      text: "진짜 하산 이 사바흐는 전설과 정반대였다. 술을 마신 자기 아들을 직접 처형할 만큼 엄격한 학자였다. 1090년, 이란 북부 깎아지른 절벽 위의 요새 알라무트를 피 한 방울 안 흘리고 손에 넣었다. 그리고 서른네 해 동안 성 밖을 한 번도 나가지 않으며, 이슬람 세계 최고 수준의 도서관을 세웠다.",
    },
    {
      text: "소문난 잔치에 먹을 것 없다고 했던가. 알라무트의 진짜 '정원'은 석회암 절벽을 깎아 만든 물길과 저수조, 그 물로 일군 계단식 밭이었다. 황금도 꿀도 아닌 — 세상에서 가장 외진 골짜기에서 학자와 군인과 가족을 먹여 살린 공학 기술이었다. 그 저수조 중 일부는 천 년 가까이 지난 지금도 물을 담고 있다.",
    },
    {
      text: "하지만 마르코 폴로가 이겼다. 가본 적도 없는 곳에서, 일어난 적도 없는 일을, 감옥에서 소설가에게 불러준 이야기 — 그게 영어에 'assassin'이라는 단어를 남겼다. 어쌔신 크리드라는 게임을 낳아 수천만 명을 그 환상 속에 빠뜨렸다. 피 한 방울 없이 성을 얻고 서른네 해를 자리를 지킨 학자는 아무도 모른다. 역사상 가장 위험한 무기는 단검이 아니었다. 아무도 확인하지 않은 이야기 한 편이었다.",
    },
  ],

  moralOrLesson:
    "어떤 민족에 대해 가장 오래 살아남는 이야기가 반드시 사실인 것은 아니다. 두려움과 편견, 외부인의 상상이 만든 전설은 수백 년의 학문과 업적을 한순간에 묻어버릴 수 있다 — 신화가 그것이 대체한 진짜 역사보다 더 현실처럼 남을 때까지.",

  characters: [
    "하산 이 사바흐 ('산의 노인')",
    "마르코 폴로 (전설을 퍼뜨린 베네치아 여행가)",
    "루스티켈로 다 피사 (폴로의 이야기를 받아 적은 작가)",
    "라시드 알딘 시난 (시리아의 '산의 노인')",
    "파르하드 다프타리 (신화를 깨뜨린 현대 역사학자)",
  ],

  source:
    "Marco Polo, The Travels of Marco Polo (Yule-Cordier translation, Book 1, Ch. 24); Farhad Daftary, The Assassin Legends: Myths of the Isma'ilis (I.B. Tauris, 1994); Bernard Lewis, The Assassins: A Radical Sect in Islam (Weidenfeld & Nicolson, 1967); Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Sylvestre de Sacy, Academy of Inscriptions lecture, 1809; Encyclopaedia Iranica, 'HASAN SABBAH'",

  icon: "🌿",
  tier: "S",
  era: "1090-1256 CE (Nizari Ismaili period); 1272 (Marco Polo's journey through Persia)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 36.4447, lng: 50.5861 },
  hasAudio: false,
  isFree: true,
  storyCategory: "tricksters_folk_tales",
  disabled: false,
  updatedAt: 1773489169,
};

async function main() {
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
    console.log(`  paragraphs: ${item.paragraphs.length}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Korean record already exists. Aborting to avoid overwrite.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

main();
