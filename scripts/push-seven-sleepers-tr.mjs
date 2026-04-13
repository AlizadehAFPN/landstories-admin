import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "ephesus",
  storyId: "seven-sleepers",
  icon: "\u{1F634}",
  tier: "A",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 27.3419, lat: 37.9392 },
  hasAudio: false,
  isFree: true,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
  source:
    "Gregory of Tours; Jacobus de Voragine, Golden Legend; Quran, Surah 18 (Al-Kahf)",
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Yedi Uyurlar
//  Register: Modern Turkish storyteller — the voice of a skilled
//    popular-history narrator or a high-quality Turkish podcast.
//    Think İlber Ortaylı'nın akıcılığı, Emrah Safa Gürkan'ın
//    anlatıcılığı. Not Ottoman, not academic, not slang.
//  Proverb subverted: «Sabreden derviş muradına ermiş»
//    → "bu yedi gencin sabrı iki asır sürdü ve uyandıklarında
//       dünya artık onların inandığı dünyaydı."
//  Cultural note: Kıtmir (the dog) included — a detail deeply
//    meaningful for Turkish/Islamic audiences. Yemliha used instead
//    of Jamblicus as the Turkish/Islamic name tradition.
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#seven-sleepers",
  title: "Yedi Uyurlar",
  subtitle:
    "İki asır uyuyup bambaşka bir dünyaya uyanan yedi genç",
  excerpt:
    "Hayatının en kötü gününden sonra uykuya daldığını düşün — gözlerini açtığında iki yüz yıl geçmiş. Efes'te yedi gencin başına gelen tam olarak buydu.",
  moralOrLesson:
    "İmparatorluklar yıkılır, çağlar değişir; ama gerçek inanç zamanın ötesine geçer ve en beklenmedik anda kendini kanıtlar.",
  characters: [
    "Yedi Uyurlar (Yemliha, Mekselina, Mislina, Mernuş, Debernuş, Şazenûş, Kefeştatayyûş)",
    "İmparator Decius",
    "İmparator II. Theodosius",
    "Ekmekçi",
  ],
  era: "Roma İmparatorluk Dönemi (MS 250) — Bizans Dönemi (~MS 450)",
  paragraphs: [
    {
      text: "Hayatının en kötü gününden sonra uykuya daldığını düşün. Gözlerini açtığında iki yüz yıl geçmiş. Tanıdığın herkes toprağın altında, ama sen bir gün bile yaşlanmamışsın. Kulağa masal gibi geliyor, değil mi? Oysa dünyanın iki büyük dini — Hristiyanlık ve İslam — bu hikâyenin gerçek olduğuna inanıyor. Üstelik olayın geçtiği yer bugün hâlâ ayakta: Efes, Batı Anadolu'nun görkemli antik kenti.",
    },
    {
      text: "Milattan sonra 250 yılında Roma İmparatoru Decius, imparatorluk tarihinin en kanlı Hristiyan avını başlattı. Her vatandaş Roma tanrılarına kurban sunmak zorundaydı; reddedenin sonu ölümdü. Efes'te — dönemin en zengin, en gösterişli şehirlerinden birinde — yedi genç adam bu emre boyun eğmeyi reddetti. Başkasının tanrısına secde etmektense ölümü göze aldılar.",
    },
    {
      text: "Kaçtılar. Şehrin hemen dışındaki dağa tırmandılar ve bir mağaranın derinliklerine sığındılar. Yanlarında sadık köpekleri Kıtmir vardı. Ama Decius'un gözü her yerdeydi. İmparator onları buldurduğunda idam ettirmedi — daha beterini yaptı. Mağaranın ağzını devasa kayalarla kapattırıp yedi genci karanlığın içinde diri diri gömdü. İmparatorun gözünde iş bitmişti: yedi asi, bir dağın bağrında, unutulmaya terk edilmiş.",
    },
    {
      text: "Aradan iki yüz yıl geçti. 450 yılı civarında bir çiftçi hayvanlarına barınak ararken o mağaranın ağzını açtı. İçeride gördüğü manzara aklının almayacağı türdendi. Yedi genç adam — canlı, sapasağlam — sanki öğleden sonra şekerleme yapmış gibi gözlerini ovuşturarak doğruluyorlardı. Dünyadan haberleri yoktu. Onları ölüme mahkûm eden Roma artık çoktan Hristiyanlığı benimsemişti.",
    },
    {
      text: "Gençlerden biri — İslam geleneğinde adı Yemliha olarak geçer — ekmek almak için şehre indi. Ekmekçiye parasını uzattığında adam taş kesildi. Sikkeler neredeyse iki asırlıktı; üzerinde çoktan unutulmuş İmparator Decius'un yüzü vardı. Haber şehri yangın gibi sardı. Yetkililer mağaraya koştu ve diğer altı genci de buldu: hâlâ genç, hâlâ şaşkın, hâlâ \"bugün günlerden ne?\" diye soran.",
    },
    {
      text: "Haber İmparator II. Theodosius'a ulaştı; bizzat Efes'e geldi. Hristiyan dünya için bu bir mucizeydi — inancın imparatorluklardan uzun yaşayabileceğinin, ölümün son söz olmadığının canlı kanıtı. Derler ya, \"sabreden derviş muradına ermiş\" — bu yedi gencin sabrı iki asır sürdü ve uyandıklarında dünya artık onların inandığı dünyaydı. Kısa süre sonra, sanki sadece bu mesajı iletmek için ayakta tutulmuşlarmış gibi, huzur içinde gözlerini yumup bu kez gerçekten uykuya daldılar.",
    },
    {
      text: "Hikâyeleri onlarla bitmedi. Yüzyıllar boyunca Hristiyan dünyasının en çok anlatılan mucizelerinden biri oldu — sonra aynı anlatı Kur'an-ı Kerim'de Kehf Suresi'nde yerini aldı. Ashab-ı Kehf: Mağara Arkadaşları. İki din, bir mucize ve hâlâ yankılanan bir soru: Bir sabah uyandığında bütün dünya sensiz ilerlemiş olsa, ne yapardın?",
    },
  ],
};

// ─── Push ───
async function pushStory(item, label) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Validate
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`${label}: Missing required fields`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(
      `${label}: Paragraph count ${item.paragraphs.length} out of range`
    );
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    const t = item.paragraphs[i].text;
    if (!t || t.length === 0) {
      throw new Error(`${label}: Paragraph ${i} is empty`);
    }
    const words = t.split(/\s+/).length;
    console.log(`  P${i + 1}: ${t.length} chars, ~${words} words`);
    if (t.length > 600) {
      console.warn(`  ⚠ Paragraph ${i + 1} exceeds 500-char target (${t.length})`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  totalChars:  ${totalChars}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  ❌ ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  ❌ ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("Yedi Uyurlar — Turkish push");
  console.log(`Timestamp: ${now}`);
  console.log("═══════════════════════════════════════════════");

  await pushStory(tr, "TURKISH");

  console.log("\n✅ Turkish version pushed successfully.");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});
