// Push Turkish recreation of "The Stone That Remembers" to the Story DynamoDB table.
// Turkish proverb subverted: "Taş yerinde ağırdır" → heavy not from its place, but from tears.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const tr = {
  // ─── Unchanged fields from English ─────────────────────────────────────────
  siteId: "jerusalem-old-city",
  storyId: "temple-mount-three-faiths",
  icon: "🕊️",
  storyCategory: "prophets_pilgrims",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 31.7777, lng: 35.2355 },
  source:
    "Mishnah Yoma 5:2 (Foundation Stone dimensions); Josephus, The Jewish War (70 CE destruction); 1 Kings 6–8 (Solomon's Temple); Genesis 22 (Binding of Isaac); Quran 17:1 (Isra reference); Creswell, K.A.C., Early Muslim Architecture (Dome of the Rock); Ritmeyer, Leen, The Quest: Revealing the Temple Mount in Jerusalem; Grabar, Oleg, The Shape of the Holy; William of Tyre, Historia (Crusader accounts); Ibn al-Athir, The Complete History (Saladin's reconquest)",
  characters: [
    "Kral Süleyman",
    "İbrahim Peygamber",
    "Halife Ömer ibn Hattab",
    "General Titus",
    "Halife Abdülmelik ibn Mervan",
    "Selahaddin Eyyubi",
  ],
  era: "MÖ ~1000 – günümüz (üç bin yıllık kesintisiz kutsal tarih)",

  // ─── Turkish-specific fields ───────────────────────────────────────────────
  lang: "tr",
  langStoryId: "tr#temple-mount-three-faiths",
  updatedAt: now,

  title: "Hatırlayan Taş",

  subtitle:
    "Bir kaya, üç din ve yaratılışın başladığı dağda üç bin yıllık dua",

  excerpt:
    "Anlatılır — hem de çok eskiden beri anlatılır — ki Kudüs'ü taçlandıran altın kubbenin altında, dağın gövdesinden bir kemik gibi yükselen çıplak, soluk bir kaya yatar.",

  moralOrLesson:
    "Taş, önünde diz çökenin kim olduğunu sormaz. Her dilin duasına, Tanrı'nın her adına aynı sabırla katlanır. Belki bir gün İbrahim'in çocukları — hepsi birden — aynı kayanın üstünde, aynı merhamet için ağladıklarını hatırlar. Bu işi tamamlamak belki bize düşmedi. Ama yarıda bırakmak da kimsenin hakkı değil.",

  paragraphs: [
    {
      text: "Kudüs'te altın kubbenin tam altında, dağın içinden bir kemik gibi yükselen çıplak bir kaya var. On sekiz metre uzunluğunda, on üç metre genişliğinde — ne süsü var ne yazısı. Yahudiler Temel Taşı diyor, Müslümanlar es-Sahra diyor. Ve iki taraf da aynı inanılmaz şeyi söylüyor: Tanrı dünyayı yaratırken işe buradan başladı. Kayayı yokluğun ortasına koydu — bir ustanın temele koyduğu ilk taş gibi — ve tüm yaratılış bu tek noktadan dışarı doğru yayıldı.",
    },
    {
      text: "İbrahim Peygamber'in oğlunu kurban etmeye götürdüğü yer burası. Tevrat'ta İshak, Kur'an'da İsmail — ama hikâyenin kalbi aynı: Allah, İbrahim'den en çok sevdiği kişiyi vermesini istedi. Odunları yükledi, çocuğu aldı, üç gün yürüdü. Bir noktada çocuk hiçbir babanın duymak istemeyeceği soruyu sordu: Baba, ateşi ve odunu görüyorum ama kurban nerede? İbrahim'in cevabı tek cümleydi: Allah bilir. Ve yürümeye devam ettiler — aralarındaki sessizlik dağdan daha ağır.",
    },
    {
      text: "Bin yıl sonra Kral Davud Kudüs'ü aldı. Oğlu Süleyman taşın üzerine İlk Mabet'i dikti — sedir ağacı, altın, bronz. En iç odasına yılda bir kez, yalınayak, tek bir kişi girebilirdi: tapınağın baş rahibi. Ve orada Tanrı'nın gerçek adını fısıldardı. Dört yüz yıl ayakta kaldı. Sonra Babil kralı Nebukadnezar her şeyi ateşe verdi. Ahit Sandığı bir daha bulunamadı. Sürgündeki Yahudiler ağıt yaktı: Seni unutursam Kudüs, sağ elim kurusun.",
    },
    {
      text: "Sürgünden dönenler mabedi yeniden yaptı — o kadar mütevazıydı ki eskisini görmüş yaşlılar ağladı. Kral Herodes onu harikaya dönüştürdü; beş yüz tonluk devasa taşlarla tepeyi büyüttü. İsa geldi, tüccarların masalarını devirdi ve uyardı: Burada taş üstünde taş kalmayacak. MS 70'te Romalı general Titus onu haklı çıkardı. Askerleri mabedi ateşe verdi, erimiş altın için taşları tek tek söktü. Geriye sadece Batı Duvarı kaldı — Yahudilerin iki bin yıldır alınlarını dayayıp dua ettiği yer.",
    },
    {
      text: "Altı yüz yıl tepe harabe kaldı. Romalılar üstüne pagan tapınağı dikti. Bizanslılar Yahudileri aşağılamak için çöp döktü. Sonra 637'de Halife Ömer Kudüs'ü tek damla kan dökmeden aldı. İbrahim'in kayasını pislik içinde görünce diz çöküp elleriyle temizledi. Elli yıl sonra Halife Abdülmelik Kubbet'üs-Sahra'yı yaptırdı — her Kudüs fotoğrafında gördüğünüz o altın kubbe. Mısır'ın yedi yıllık vergi gelirini harcadı, gözünü bile kırpmadı. Dünyanın başladığı kayaya taç giydiriyordu.",
    },
    {
      text: "1099'da Haçlılar Kudüs'ü bastı ve içerideki neredeyse herkesi kılıçtan geçirdi. Kubbeye haç dikip kayanın üstüne sunak koydular. Tapınak Şövalyeleri Mescid-i Aksa'ya yerleşti — adlarını da oradan aldılar. Seksen sekiz yıl sonra Selahaddin şehri geri aldı. Haçlılardan farklı olarak kimsenin canına dokunmadı. Haçı indirdi, hilali yerine koydu, kayayı Şam'dan getirdiği gül suyuyla yıkadı. Derler ki taş yerinde ağırdır — ama bu taş fetihlerden değil, üstünde dökülen gözyaşlarından ağır.",
    },
    {
      text: "Yahudiler Batı Duvarı'nda dua ediyor ama tepeye adım atmıyor — çok kutsal. Müslümanlar Mescid-i Aksa'da ibadet ediyor. Hristiyanlar İsa'nın yürüdüğü yollarda yürüyor. Üç din. Bir kaya. Üç bin yıl. Kubbenin altında kaya öylece duruyor — soluk, pürüzlü, kimin gelip gittiğine aldırmayan. Süleyman'ı, Titus'u, Haçlıları, Osmanlıları geride bıraktı. Bundan sonra gelecek olanı da bırakacak. Taş konuşmuyor. Taş seçmiyor. Ama her dilde edilen her duayı hatırlıyor — ve tek birini bile geri çevirmedi.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATION & PUSH
// ═══════════════════════════════════════════════════════════════════════════════

async function validate(record) {
  const label = `${record.lang}#${record.storyId}`;

  // JSON round-trip check
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Character & word constraints
  let totalChars = 0;
  for (let i = 0; i < record.paragraphs.length; i++) {
    const p = record.paragraphs[i];
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;

    if (chars > 500) {
      console.warn(`⚠️  Paragraph ${i + 1}: ${chars} chars (over 500 limit)`);
    }
    if (words > 100) {
      console.warn(`⚠️  Paragraph ${i + 1}: ${words} words (over 100 limit)`);
    }
    console.log(`   P${i + 1}: ${chars} chars, ${words} words`);
  }

  console.log(`\n📊 ${label}: ${record.paragraphs.length} paragraphs, ${totalChars} total characters`);

  if (record.paragraphs.length < 6 || record.paragraphs.length > 10) {
    console.warn(`⚠️  Paragraph count ${record.paragraphs.length} outside 6–10 range`);
  }

  return true;
}

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n⏳ Pushing ${label} ...`);

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${label} pushed successfully (new record).`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`⚠️  ${label} already exists. Overwriting...`);
      await doc.send(new PutCommand({ TableName: TABLE, Item: record }));
      console.log(`✅ ${label} overwritten successfully.`);
    } else {
      console.error(`❌ Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══ Pushing Turkish 'Hatırlayan Taş' to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}\n`);

  await validate(tr);
  await pushStory(tr);

  // Verify the record was written
  console.log("\n🔍 Verifying...");
  const { DynamoDBClient: C2 } = await import("@aws-sdk/client-dynamodb");
  const { GetCommand } = await import("@aws-sdk/lib-dynamodb");
  const result = await doc.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: tr.siteId, langStoryId: tr.langStoryId },
    })
  );
  if (result.Item && result.Item.title === tr.title) {
    console.log(`✅ Verified: "${result.Item.title}" exists with ${result.Item.paragraphs.length} paragraphs.`);
  } else {
    console.error("❌ Verification failed — record not found or title mismatch.");
    process.exit(1);
  }

  console.log("\n═══ Done ═══");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err);
  process.exit(1);
});
