// ═══════════════════════════════════════════════════════════════════════════════
// "The King's Downfall" → Turkish: "Gökteki Kale"
//
// NOT a translation. Recreated from scratch in native Turkish voice.
//
// Proverb (subverted): "Kılıçla gelen kılıçla gider" → "Kılıçla gelen, hançerle gitti."
// Secondary proverb: "Etme bulma dünyası"
// Register: Modern skilled storyteller — podcast/nonfiction energy
// ═══════════════════════════════════════════════════════════════════════════════

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ─── TURKISH STORY ──────────────────────────────────────────────────────────

const title = "Gökteki Kale";

const subtitle =
  "On sekiz yıl gökteki kalesinden hükmeden kral, kardeşinin ordusuna karşı aşağı indi \u2014 ve birkaç dakikada her şeyini kaybetti";

const excerpt =
  "Öz babasını öldürüp tahtı alan bir kral, ormanın ortasında ulaşılmaz bir kale kurdu. On sekiz yıl gökyüzünden hükmetti. Sonra kardeşi orduyla döndü \u2014 ve Kashyapa kaleden indi. Her şey dakikalar içinde bitti.";

const paragraphs = [
  {
    text: "Kashyapa öz babasını öldürdü. Hikâye burada başlıyor. 477 yılında Sri Lanka Kralı Dhatusena\u2019yı devirdi \u2014 adamı diri diri duvara ördürdü \u2014 ve tahtı aldı. Ama üvey kardeşi Moggallana, tahtın gerçek varisi, aynı gece kaçtı. Karanlıkta koşan genç bir prens, Güney Hindistan\u2019a doğru. Kashyapa biliyordu: bir gün dönecekti. O yüzden ormanın tam ortasında, iki yüz metrelik bir kayanın tepesine saray kurdu. Hiçbir ordunun ulaşamayacağı bir kale.",
  },
  {
    text: "On sekiz yıl boyunca Kashyapa gökyüzünden hükmetti. Sigiriya\u2019nın çevresini hendeklerle sardı, kayanın girişine devasa bir aslan oydu, duvarları altın yaldızlı tanrıça freskleriyle bezedi. Her merdiven, her mazgal, her dar geçit tek bir gün için yapılmıştı: kardeşinin orduyla döneceği gün. Ve o gün 495 yılında geldi \u2014 Moggallana Güney Hint askerleriyle kapıda. Tahtını geri almaya gelmişti. Kashyapa kimsenin beklemediği şeyi yaptı.",
  },
  {
    text: "Aşağı indi. Yirmi yıl boyunca inşa ettiği surların arkasında beklemek yerine, ordusunu düz ovaya sürdü. Belki hızlı bitireceğini düşündü. Belki saklanmanın onu zayıf göstereceğini biliyordu. Ya da belki \u2014 on sekiz yıl boyunca yaptıklarıyla yaşadıktan sonra \u2014 artık bitsin istiyordu. Gökyüzünde kale kuran adam, savaşını yerde vermeyi seçti.",
  },
  {
    text: "İki ordu kayanın eteğinde çarpıştı. Kashyapa savaş filinin üstündeydi, tam merkezde, herkesin gözü önünde. Sonra oldu. Fil bataklık zemine girdi ve sağlam yer bulmak için yana döndü. Çamurdan kaçan bir hayvan, o kadar. Ama askerler krallarının arkasını döndüğünü gördü \u2014 ve bozgun sandılar. Migara, yıllar önce Kashyapa\u2019nın babasını öldürmesine yardım etmiş komutan, tam da bu anı bekliyordu. Geri çekilme emrini verdi. Ordu dakikalar içinde dağıldı. Kashyapa yapayalnız kaldı.",
  },
  {
    text: "Sonrası Sri Lanka tarihinin en ünlü ölümüdür. Kashyapa belinden mücevherli bir hançer çekti, boğazına dayadı ve kesti. Ama insanları bin beş yüz yıldır ürperten ayrıntı şudur: boğazını kestikten sonra kanlı hançeri başının üstüne kaldırdı \u2014 bütün savaş alanı görsün diye. Sonra hançeri yavaşça kınına soktu. Ve düştü. Kınına soktu çünkü hesap kapanmıştı. Kılıçla gelen, hançerle gitti.",
  },
  {
    text: "Moggallana tahtı aldı ve başkenti eski kutsal şehir Anuradhapura\u2019ya taşıdı. Sigiriya \u2014 bu imkânsız kale, suçun ve dehanın abidesi \u2014 Budist keşişlere bırakıldı. Baba katilinin zevk sarayı bir manastıra dönüştü. Boyalı tanrıçalar tıraşlı başlara baktı. Çeşmeler sustu. Aslan ufalandı. On dört yüzyıl boyunca o kayada duyulan tek ses keşişlerin ilahileri ve ziyaretçilerin cilalı Ayna Duvarı\u2019na kazıdığı aşk şiirleri oldu.",
  },
  {
    text: "Budistlerin Kashyapa yorumu acımasız ve yalındır: karma bir sonraki hayatını beklemez. Adam dahiydi. Kalesi bir başyapıttı. Ama suç yine de onu buldu \u2014 surlarını aşarak değil, hiçbir zaman kazanamadığı sadakat yoluyla. O gün dağılan ordu, babasını öldürmüş bir kralın ardından aslında hiç yürümemişti. Etme bulma dünyası derler ya \u2014 Kashyapa kalesini istediği kadar yükseğe kurdu. Düşüş her zaman orada bekliyordu.",
  },
];

const moralOrLesson =
  "Kashyapa kalesini yaptıklarından kaçmak için kurdu. Ama onu yarı yolda bırakan surlar değildi \u2014 suçun ta kendisiydi. Öz babasını öldürmüş bir adama hizmet eden ordu, gitmek için fırsat bekleyen bir ordudur. Ve son anında, boğazını kesip hançeri kınına sokarken, Kashyapa gerçekten hükmettiği tek şeyin kendisi olduğunu kanıtladı.";

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION (TR) ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;

  const charOk = chars <= 500;
  const wordOk = words <= 100;
  if (!charOk || !wordOk) allPass = false;

  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "\u2713" : "\u2717 OVER"} | ${words} words ${wordOk ? "\u2713" : "\u2717 OVER"}`
  );
}

console.log(
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`
);
console.log(`Target: ~3000 chars (\u00b120% = 2400\u20133600)`);
console.log(
  `Range: ${totalChars >= 2400 && totalChars <= 3600 ? "\u2713 WITHIN RANGE" : "\u2717 OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n\u2717 Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── FETCH ENGLISH & PUSH TURKISH ──────────────────────────────────────────

console.log("\nFetching English record...");

const { Item: en } = await doc.send(
  new GetCommand({
    TableName: "Story",
    Key: { siteId: "sigiriya", langStoryId: "en#kings-downfall" },
  })
);

if (!en) {
  console.error("\u2717 English record not found!");
  process.exit(1);
}

console.log("\u2713 English record found.");

const now = Math.floor(Date.now() / 1000);

const trItem = {
  ...en,
  lang: "tr",
  langStoryId: "tr#kings-downfall",
  title,
  subtitle,
  excerpt,
  paragraphs,
  moralOrLesson,
  updatedAt: now,
  readingTimeMinutes: 3,
};

console.log("\nPushing Turkish record...");
console.log(`  siteId:      ${trItem.siteId}`);
console.log(`  langStoryId: ${trItem.langStoryId}`);
console.log(`  title:       ${trItem.title}`);
console.log(`  paragraphs:  ${trItem.paragraphs.length}`);
console.log(`  updatedAt:   ${now}`);

try {
  await doc.send(
    new PutCommand({
      TableName: "Story",
      Item: trItem,
    })
  );
  console.log("\n\u2713 Turkish story pushed successfully to DynamoDB!");
} catch (err) {
  console.error(`\n\u2717 Push failed: ${err.message}`);
  process.exit(1);
}

// ─── VERIFY ─────────────────────────────────────────────────────────────────

const { Item: verify } = await doc.send(
  new GetCommand({
    TableName: "Story",
    Key: { siteId: "sigiriya", langStoryId: "tr#kings-downfall" },
  })
);

if (verify && verify.title === title && verify.paragraphs.length === 7) {
  console.log("\u2713 Verification passed. Record confirmed in DynamoDB.");
  console.log(`  title: ${verify.title}`);
  console.log(`  paragraphs: ${verify.paragraphs.length}`);
  console.log(`  lang: ${verify.lang}`);
} else {
  console.error("\u2717 Verification failed!");
  process.exit(1);
}
