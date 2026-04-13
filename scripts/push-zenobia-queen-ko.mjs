import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "palmyra" },
  langStoryId: { S: "ko#zenobia-queen-who-defied-rome" },
  lang: { S: "ko" },
  storyId: { S: "zenobia-queen-who-defied-rome" },
  title: { S: "로마에 맞선 여왕" },
  subtitle: {
    S: "팔미라의 여왕 제노비아, 로마 제국의 3분의 1을 정복하고 갑옷을 입고 전장에 선 여전사의 이야기",
  },
  excerpt: {
    S: "서기 267년, 시리아의 한 연회장에서 왕이 살해당했다. 그 피의 현장에서 살아 나온 한 여자가 나일강에서 앙카라까지 뻗치는 제국을 손에 넣게 된다.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "서기 267년, 시리아 에메사의 연회장. 로마 동방의 최고 실력자 오다이나투스가 자기 조카의 손에 아들과 함께 목숨을 잃었다. 이유는 하찮은 원한이었다고 한다. 그런데 진짜 이야기는 그 자리에서 살아 걸어 나온 사람한테서 시작된다. 그의 두 번째 아내. 이름은 제노비아. 그녀는 곧 고대 세계에서 가장 위험한 여자가 된다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "당시 기록들은 하나같이 믿기 어렵다는 듯 그녀를 묘사한다. 네 개 언어를 구사했고, 당대 최고의 철학자 밑에서 공부했다. 말을 타고 군대 선두에 섰으며, 병사들과 나란히 수십 리를 걸었고, 술자리에서는 페르시아 왕들도 못 이겼다. 클레오파트라의 후손이라 주장하기도 했다. 남편이 죽고 어린 아들이 명목상 왕좌에 앉았지만, 실제로 모든 걸 움직인 건 제노비아였다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그리고 아무도 예상 못 한 일을 벌인다. 270년, 7만 대군을 남쪽으로 보내 이집트를 쳤다. 로마 시민 전체의 밥줄인 곡창지대, 바로 그 땅이었다. 로마 수비대를 박살 내고 고대 세계에서 가장 부유한 땅을 차지했다. 동시에 북쪽으로는 시리아 전역과 지금의 터키 깊숙이까지 밀어붙였다. 전성기에 그녀의 영토는 로마 전체의 3분의 1이었다. 주화에 자기 얼굴을 새기고 로마 황제의 초상은 지워버렸다. 야망이 아니었다. 선전포고였다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "로마가 최강의 카드를 꺼냈다. 황제 아우렐리아누스. 이미 무너져 내리던 서방 제국을 다시 꿰매놓은 냉혹하고 유능한 군인이었다. 272년, 그가 동방으로 진군했다. 제노비아는 역사에 길이 남을 답장을 보냈다. \"클레오파트라가 살아서 굴욕당하느니 여왕으로 죽기를 택한 걸 모르시나요?\" 아우렐리아누스는 꿈쩍도 안 했다. 시리아의 타는 듯한 태양 아래, 제노비아의 중장기병을 일부러 추격하도록 유인한 뒤 더위가 칼 대신 싸우게 만들었다. 군대가 무너졌다. 제노비아는 팔미라를 향해 달렸다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "아우렐리아누스는 팔미라를 에워싸고 기다렸다. 성벽 안에서 식량이 바닥났다. 제노비아가 기대했던 페르시아 지원군은 끝내 오지 않았다. 세 번 찍어 안 넘어가는 나무 없다고 했던가. 하지만 제노비아는 나무가 아니었다. 쓰러지는 대신 한밤중에 빠져나갔다. 사막에서 가장 빠른 경주용 낙타에 올라타 유프라테스 강 너머 페르시아를 향해 내달렸다. 로마 기병대가 그녀를 잡은 건 강변이었다. 배에 오르려는 순간. 자유가 눈앞에 보이는 그 지점. 한 발은 물속에, 다른 한 발은 역사 속에 걸친 채 붙잡혔다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그 뒤의 이야기는 누구 말을 믿느냐에 달렸다. 로마 쪽 기록에 따르면, 보석이 너무 무거워 시종들이 들어줘야 할 만큼 화려한 황금 사슬에 묶여 로마 거리를 끌려다녔고, 이후 원로원 의원의 아내로 조용히 여생을 보냈다. 다른 기록은 로마로 끌려가는 길에 스스로 굶어 죽었다고 전한다. 자신이 늘 조상이라 주장했던 클레오파트라처럼. 아랍 쪽에서 전해오는 결말이 가장 극적이다. 반지에 숨겨둔 독을 깨물며 이렇게 말했다. \"적의 손이 아닌, 내 손으로.\"",
          },
        },
      },
      {
        M: {
          text: {
            S: "로마 원로원이 \"겨우 여자 한 명 때문에 군단을 낭비했느냐\"고 비아냥거리자, 아우렐리아누스가 쏘아붙였다. \"그 여자가 어떤 사람인지 알았다면 비난 대신 찬사를 보냈을 것이오.\" 자기 손으로 무너뜨린 상대를 두고도 존경 없이는 입을 열 수 없었다. 오늘날 그녀의 동상은 다마스쿠스에 서 있다. 시리아 화폐에는 그녀의 얼굴이 새겨져 있다. 그리고 팔미라의 폐허는 세월과 전쟁을 견디며 여전히 사막 위로 솟아 있다. 마치 끝내 무릎 꿇기를 거부한 누군가의 뼈대처럼.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "왕관은 태어날 때 쓰고 나오는 자만의 것이 아니다. 세상이 얕본 사람이 빼앗은 왕좌가 가장 위험하고, 도전의 진정한 크기는 이겼느냐가 아니라 적마저 고개를 숙일 수밖에 없었느냐로 결정된다.",
  },
  icon: { S: "👑" },
  tier: { S: "S" },
  source: {
    S: "Historia Augusta, 'The Thirty Pretenders' (Trebellius Pollio); Zosimus, New History; al-Tabari, History of the Prophets and Kings; Edward Gibbon, The Decline and Fall of the Roman Empire; Pat Southern, Empress Zenobia: Palmyra's Rebel Queen; Alaric Watson, Aurelian and the Third Century",
  },
  characters: {
    L: [
      { S: "Queen Zenobia (Septimia Zenobia / Bat-Zabbai / az-Zabba')" },
      { S: "Emperor Aurelian (Lucius Domitius Aurelianus)" },
      { S: "Cassius Longinus (philosopher and advisor)" },
      { S: "General Zabdas" },
      { S: "Vaballathus (Zenobia's son)" },
      { S: "Odaenathus (Zenobia's husband)" },
    ],
  },
  era: {
    S: "267-274 AD (Zenobia's regency, conquests, and defeat by Aurelian)",
  },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "38.2684" },
      lat: { N: "34.5505" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
};

// Validate: check paragraph counts and character lengths
console.log("=== Validation ===");
let totalChars = 0;
item.paragraphs.L.forEach((p, i) => {
  const text = p.M.text.S;
  const charCount = text.length;
  totalChars += charCount;
  console.log(
    `  P${i + 1}: ${charCount} chars ${charCount > 400 ? "⚠️ LONG" : "✓"}`
  );
});
console.log(`  Total paragraph chars: ${totalChars}`);
console.log(`  Paragraphs: ${item.paragraphs.L.length}`);
console.log(`  Title: "${item.title.S}" (${item.title.S.length} chars)`);
console.log(`  Subtitle: ${item.subtitle.S.length} chars`);
console.log(`  Excerpt: ${item.excerpt.S.length} chars`);
console.log(`  MoralOrLesson: ${item.moralOrLesson.S.length} chars`);
console.log();

// JSON validation
try {
  JSON.stringify(item);
  console.log("✅ JSON validation passed");
} catch (e) {
  console.error("❌ JSON validation failed:", e.message);
  process.exit(1);
}

// Push to DynamoDB
try {
  const result = await client.send(
    new PutItemCommand({
      TableName: "Story",
      Item: item,
    })
  );
  console.log(
    "✅ Successfully pushed ko#zenobia-queen-who-defied-rome to Story table"
  );
  console.log(`   HTTP status: ${result.$metadata.httpStatusCode}`);
} catch (err) {
  console.error("❌ Failed to push:", err.message);
  process.exit(1);
}
