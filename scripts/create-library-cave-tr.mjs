import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ─── Turkish story: Kütüphane Mağarası ───

const paragraphs = [
  {
    text: `1900 yılı, Çin'in Gobi Çölü'nün ortası. Wang Yuanlu adında gezgin bir Taocu rahip, Dunhuang yakınlarındaki Mogao Mağaraları'nı tek başına temizliyordu. Arkeolog falan değildi — kendi kendini yetiştirmiş, harap tapınaklara gönüllü bekçilik eden sıradan bir adamdı. Boyalı bir koridoru süpürürken duvarda bir çatlak fark etti. Arkasında yerden tavana el yazmalarıyla dolu, mühürlenmiş küçük bir oda vardı. İçinde yaklaşık elli bin belge.`,
  },
  {
    text: `O odayı kimin mühürlediğini kimse bilmiyor. En güçlü tahmin, rahiplerin 1002 yılı civarında — belki istilacı ordulardan korumak için, belki de yer kalmadığı için — girişi tuğlayla örüp sıvaladığı yönünde. Sebep ne olursa olsun, çöl gerisini halletti. Yaklaşık dokuz yüz yıl boyunca dünyanın en kuru havası bu belgeleri neredeyse kusursuz biçimde korudu.`,
  },
  {
    text: `Wang ne bulduğunu tam kavrayamadı ama önemli bir şey olduğunu biliyordu. Yerel yetkililere haber verdi. Omuz silktiler. Eyalet idaresine yazdı. "Tekrar mühürle" dediler. Yedi yıl boyunca Wang, elinde belki de insanlık tarihinin en büyük kütüphane keşfi varken, bunu ciddiye alacak tek bir yetkili aradı. Bulamadı.`,
  },
  {
    text: `Derken 1907'de kapıya Macar asıllı İngiliz kaşif Aurel Stein dayandı. Haftalarca çölde yürümüştü, elinde bir söylentiden başka bir şey yoktu. Mağarayı gördüğü an bunun tarihin en büyük belge keşiflerinden biri olduğunu anladı. Hamlesi ustacaydı: Wang'a, Çin'in en ünlü destanı "Batıya Yolculuk"taki efsanevi Budist keşiş Xuanzang'ın sadık takipçisi olduğunu söyledi. Kaderin onu bu metinleri batıya taşımak için gönderdiğini ileri sürdü. Dindar bir adam olan Wang, her kelimesine inandı.`,
  },
  {
    text: `Stein yirmi dört kasa el yazması ve beş kasa tabloyla oradan ayrıldı — yaklaşık on bin parça. Wang'a neredeyse hiçbir şey ödemedi. Bir yıl sonra Fransız bilgin Paul Pelliot gelip en değerli altı bin belgeyi seçerek aldı. Arkasından Japon, Rus ve Amerikan ekipleri sıraya girdi. 1910'da Çin hükümeti nihayet harekete geçip kalanları Pekin'e taşıdığında, mağaranın içindekilerin yarısından fazlası çoktan dünyanın dört bir yanına dağılmıştı.`,
  },
  {
    text: `Bu hikâyenin asıl sızısı şurada: Wang aldığı her kuruşu mağaraların onarımına harcadı. Eski kâğıtları kutsal taşla takas ettiğine, sevdiği tapınağı kurtardığına yürekten inanıyordu. 1931'de öldü ve ömrünü korumaya adadığı mağaraların yakınına gömüldü. Verdiğinin, inşa ettiği her şeyden daha değerli olduğunu hiç anlayamadı.`,
  },
  {
    text: `Stein'ın aldıkları arasında Elmas Sutra da vardı — milattan sonra 868'de basılmış, dünyanın bilinen en eski tarihli baskı kitabı. Şu anda Londra'daki British Library'de duruyor. Sanskritçeden çevrilen tam adı: "Yanılsamayı Kesen Elmas." Yanılsamayı kesmek için yazılmış bir metin — ama hayatının en büyük yanılsamasının içinde yaşayan adamın gözünü açamadı.`,
  },
  {
    text: `Bugün, Çin çölündeki tek bir mağaradan çıkanları incelemek isteseniz Londra, Paris, Tokyo ve Petersburg'a uçak bileti almanız gerekir. Kütüphane Mağarası'nın kendisi artık bomboş — elli bin sesin dokuz asır boyunca karanlıkta beklediği küçük, çıplak bir oda. Derler ki kıymetini bilmeyenin elinden alınırmış. Ama asıl tehlike, kıymetini tam olarak bilen birinin kapıda belirmesidir.`,
  },
];

const item = {
  // Keys
  siteId: "mogao-caves",
  langStoryId: "tr#library-cave-sealed",
  storyId: "library-cave-sealed",
  lang: "tr",

  // Turkish text
  title: "Kütüphane Mağarası: 900 Yıl Mühürlü Kalan 50.000 El Yazması",
  subtitle: "Dokuz asır boyunca çölün altında bekleyen insanlık hazinesi",
  excerpt:
    "1900 yılı, Çin'in Gobi Çölü'nün ortası. Wang Yuanlu adında gezgin bir Taocu rahip, Dunhuang yakınlarındaki Mogao Mağaraları'nı tek başına temizliyordu.",
  moralOrLesson:
    "Bir hazinenin en büyük düşmanı ihmal ya da savaş değildir — kıymetini bilen birinin kapıda belirmesidir.",
  paragraphs,

  // Preserved metadata (identical to English)
  characters: [
    "Wang Yuanlu — mağarayı bulan Taocu bekçi",
    "Aurel Stein — el yazmalarını alan kaşif",
    "Paul Pelliot — Fransız bilgin",
    "Mağarayı ~1002'de mühürleyen meçhul rahipler",
  ],
  era: "~1002 (mühürlenme) — 1900 (keşif)",
  source:
    'Aurel Stein, "Ruins of Desert Cathay" (1912); Paul Pelliot expedition records; International Dunhuang Project (IDP)',
  icon: "📜",
  tier: "A",
  storyCategory: "riddles_past",
  coordinates: { lat: 40.0362, lng: 94.8089 },
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  readingTimeMinutes: 3,
  updatedAt: Math.floor(Date.now() / 1000),
};

// ─── Validate before push ───

console.log("=== PRE-PUSH VALIDATION ===\n");

let valid = true;

// Check paragraph constraints
item.paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  const charOk = chars <= 500;
  const wordOk = words <= 100;
  const flag = charOk && wordOk ? "✓" : "✗";
  console.log(
    `P${i + 1}: ${chars} chars, ${words} words ${flag}${!charOk ? " ⚠️ OVER 500 CHARS" : ""}${!wordOk ? " ⚠️ OVER 100 WORDS" : ""}`
  );
  if (!charOk || !wordOk) valid = false;
});

const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
console.log(`\nTotal: ${totalChars} chars, ${item.paragraphs.length} paragraphs`);
if (totalChars < 2400 || totalChars > 3600) {
  console.log("⚠️ Total chars outside 3000 ±20% range");
  valid = false;
}

// Validate JSON serialization (catches bad characters)
try {
  const json = JSON.stringify(item);
  JSON.parse(json);
  console.log("JSON validation: ✓");
} catch (err) {
  console.log("JSON validation: ✗", err.message);
  valid = false;
}

if (!valid) {
  console.error("\n❌ Validation failed. Aborting push.");
  process.exit(1);
}

// ─── Push to DynamoDB ───

console.log("\n=== PUSHING TO DYNAMODB ===\n");

try {
  await docClient.send(
    new PutCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    })
  );
  console.log("✅ Turkish story pushed successfully!");
  console.log(`   siteId: ${item.siteId}`);
  console.log(`   langStoryId: ${item.langStoryId}`);
  console.log(`   title: ${item.title}`);
  console.log(
    `   updatedAt: ${new Date(item.updatedAt * 1000).toISOString()}`
  );
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.error(
      "❌ Record already exists! Use UpdateCommand to modify existing records."
    );
  } else {
    console.error("❌ Push failed:", err);
  }
  process.exit(1);
}

// ─── Verify ───

console.log("\n=== VERIFICATION ===\n");

import { GetCommand } from "@aws-sdk/lib-dynamodb";

const verify = await docClient.send(
  new GetCommand({
    TableName: "Story",
    Key: { siteId: "mogao-caves", langStoryId: "tr#library-cave-sealed" },
  })
);

if (verify.Item) {
  console.log("✅ Verified: record exists in DynamoDB");
  console.log(`   title: ${verify.Item.title}`);
  console.log(`   paragraphs: ${verify.Item.paragraphs.length}`);
  console.log(`   lang: ${verify.Item.lang}`);
} else {
  console.error("❌ Verification failed: record not found!");
  process.exit(1);
}
