import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "babylon",
  langStoryId: "tr#tower-of-babel",
  storyId: "tower-of-babel",
  lang: "tr",

  // Turkish text fields
  title: "Göğe Uzanan Kule",

  subtitle: "İnsanlığın en ünlü hırs hikâyesinin arkasındaki gerçek kule — ve Tanrı'nın onu durdurmak için neden yeryüzüne indiği",

  excerpt: "Kadim Babil'in kalbinde, Fırat'ın dünyanın en büyük şehrini ikiye böldüğü yerde, bir yapı göğe doğru yükseldi. Tarihte yarım kalan en ünlü bina olacaktı — ama mimarlarının beceriksizliğinden değil. İnsanoğlunun hırsı üzerine anlatılmış en eski hikâyeye göre, bizzat Tanrı gelip onu durdurmuştu.",

  paragraphs: [
    {
      text: "Bir dünya hayal et: herkes aynı dili konuşuyor. Yaratılış kitabının on birinci bölümü tam da böyle açılıyor. Nuh'un torunları bugünkü Güney Irak'ta dümdüz bir ovaya geliyorlar. Taş yok, kereste yok. Sadece çamur. Nehir çamurunu tuğla yapıp ateşte pişiriyorlar, aralarına zift sürüyorlar — o zift ki bugün hâlâ Irak topraklarından kaynayarak çıkıyor. Sonra her şeyi değiştirecek o cümleyi kuruyorlar: \u201cGelin, tepesi göklere erişecek bir kule yapalım.\u201d"
    },
    {
      text: "İşin çılgın tarafı şu: o kule gerçekten vardı. Adı Etemenanki'ydi — Sümerce \u201cYerin ve Göğün Temel Tapınağı.\u201d Babil'in göbeğinde dikiliyordu. Alman arkeolog Robert Koldewey 1899'da kazı başlattığında, kutsal kitabın anlattığını buldu: her kenarı 91 metre olan devasa bir kare taban, fırınlanmış tuğlalar ve zift. Asırlarca yeniden yükseltildi ama en görkemli hâline Kral Nebukadnezar döneminde kavuştu, milattan önce 600 civarında. Kralın kendi yazıtı her şeyi özetliyor: \u201cTepesini göklere erdirdim.\u201d"
    },
    {
      text: "Yedi kat. Tepedeki mavi sırlı tuğlalar güneşte parlıyor. Zirvedeyse tanrı Marduk'a adanmış bir tapınak. Yüksekliği 91 metre — kabaca Özgürlük Heykeli kadar. Masa gibi dümdüz bir ovada bu kuleyi 50 kilometre öteden görebilirdiniz. Dağı olmayan bir ülkede insanlar kendi dağını yapmıştı. Yunan tarihçi Heredot milattan önce 460 civarında gelip gördüğünde, zirvedeki tapınakta her gece tek başına uyuyan bir rahibeden söz etti — tanrının kendisini bekliyormuş. Yunanlılar bile ağzı açık kalmıştı."
    },
    {
      text: "\u201cBabil\u201d adı aslında bir alay. Babilliler şehirlerine \u201cBab-ili\u201d diyordu — \u201cTanrı'nın Kapısı.\u201d Ama İbrani yazarlar adı \u201cbalal\u201da — \u201ckarıştırmak\u201da — bağladılar. Tanrı'nın Kapısı böylece Kargaşa'nın Kapısı oldu. Birlikten kuvvet doğar derler — ama belki de Tanrı'nın korktuğu tam da buydu. Ve bu hikâye İbranilere bile ait değildi. Milattan önce 2100'den kalma bir Sümer şiiri, Yaratılış'tan bin yıl önce, aynı şeyi anlatıyordu: bir zamanlar tek dil vardı, sonra tanrılar onu parçaladı."
    },
    {
      text: "Bir de kuleyi inşa eden adamın portresi var. 2011'de tarihçi Andrew George, Nebukadnezar döneminden kalma siyah bir taş levha yayımladı. Üzerinde kral, kulesinin yanında duruyor — elinde bir asa, yüzü zirveye dönük. Tamamlanmış kulenin şimdiye kadar bulunan tek görüntüsü bu. Orada duruyor Nebukadnezar — dünyanın en güçlü adamı — eserine yukarı bakıyor. Yüzündeki ifadeyi anlatacak tek kelime var: taşa dönmüş gurur."
    },
    {
      text: "Kule Tanrı'nın yıldırımıyla yıkılmadı. Çok daha sıradan bir şeye yenildi: zamana. Büyük İskender milattan önce 331'de Pers İmparatorluğu'nu ezip Babil'e girdiğinde kule çoktan dökülüyordu. Persler iki yüz yıl boyunca çürümeye bırakmıştı. İskender on bin askerine enkazı temizletmeyi emretti. İki ay uğraştılar, kıpırdatamadılar. Sonra İskender otuz iki yaşında, Nebukadnezar'ın kendi sarayında sıtmadan öldü. Kimse bir daha denemedi."
    },
    {
      text: "Bugün Bağdat'ın 85 kilometre güneyinde suyla dolu bir çukur var — antik dünyanın en büyük kulesinin bir zamanlar yükseldiği yer. UNESCO 2019'da Dünya Mirası listesine aldı. Ama kulenin asıl anıtı Irak'ta değil. Yeryüzünde konuşulan her dilde. Seul'deki bir çocukla São Paulo'daki bir çocuğun aynı gün batımını izleyip onu anlatacak tek ortak kelimeleri olmamasında. Tuğlalar gitti. Zift yüzyıllar önce ufalandı. Ama kargaşa mı? O sonsuza dek bizimle."
    }
  ],

  moralOrLesson: "Kule hiçbir zaman yükseklikle ilgili değildi — birlikle ilgiliydi. Tanrı'yı asıl tedirgin eden, birleşmiş insanlığın sınır tanımayacak olmasıydı. Yeryüzünde konuşulan her dil, o ilk bütünlükten kopan bir parçadır; her çeviri, Tanrı'nın kırmayı uygun gördüğü şeyi yeniden birleştirme çabasıdır. Belki ders şu değil: insanlar asla göğe uzanmamalı. Belki asıl ders, uzanmanın kendisinin varmaktan daha kıymetli olduğudur — ve darmadağın olmuş dillerimiz, tüm karmaşalarına rağmen, tek bir dilin asla yaratamayacağı güzelliği çeşitlilikleriyle ortaya koymuştur.",

  // Unchanged fields from English
  icon: "🗼",
  tier: "S",
  source: "Genesis 11:1-9 (Tower of Babel narrative); George, Andrew R. 'A Stele of Nebuchadnezzar II,' Cuneiform Royal Inscriptions and Related Texts in the Sch\u00f8yen Collection, Cornell University Studies in Assyriology and Sumerology 17, 2011; Herodotus, Histories, Book I.178-183; The Esagila Tablet (AO 6555, Louvre); 'Enmerkar and the Lord of Aratta' (Sumerian poem, c. 2100 BCE); Koldewey, Robert. The Excavations at Babylon, 1914; George, Andrew R. Babylonian Topographical Texts, Orientalia Lovaniensia Analecta 40, 1992; Strabo, Geography XVI.1.5 (Alexander's clearing of the ziggurat); Wiseman, D.J. Nebuchadrezzar and Babylon, Oxford University Press, 1985",
  characters: [
    "Nebuchadnezzar II -- king who rebuilt the ziggurat Etemenanki to its full glory",
    "Herodotus -- Greek historian who visited and described the tower around 460 BCE",
    "Alexander the Great -- ordered 10,000 men to clear its rubble in 331 BCE",
    "Robert Koldewey -- German archaeologist who excavated its foundations (1899-1917)",
    "Andrew George -- Assyriologist who published the Tower of Babel stele (2011)"
  ],
  era: "c. 610-562 BCE (Nebuchadnezzar's reconstruction); Genesis account undated; archaeological remains excavated 1899-1917",
  readingTimeMinutes: 9,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 44.4209, lat: 32.5363 },
  hasAudio: false,
  isFree: true,
  storyCategory: "prophets_pilgrims",
  updatedAt: 1773584405,
};

// Validate before pushing
function validate(item) {
  const errors = [];

  if (!item.title || item.title.length === 0) errors.push("Missing title");
  if (!item.subtitle || item.subtitle.length === 0) errors.push("Missing subtitle");
  if (!item.excerpt || item.excerpt.length === 0) errors.push("Missing excerpt");
  if (!item.moralOrLesson || item.moralOrLesson.length === 0) errors.push("Missing moralOrLesson");
  if (!item.paragraphs || item.paragraphs.length < 6) errors.push(`Only ${item.paragraphs?.length} paragraphs (need 6-8)`);

  for (let i = 0; i < item.paragraphs.length; i++) {
    const p = item.paragraphs[i];
    if (!p.text || p.text.length === 0) {
      errors.push(`Paragraph ${i + 1} is empty`);
    } else if (p.text.length > 600) {
      errors.push(`Paragraph ${i + 1} too long: ${p.text.length} chars`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + (p.text?.length || 0), 0);
  if (totalChars < 2400 || totalChars > 3600) {
    errors.push(`Total chars ${totalChars} outside 2400-3600 range`);
  }

  if (item.lang !== "tr") errors.push(`Wrong lang: ${item.lang}`);
  if (!item.langStoryId.startsWith("tr#")) errors.push(`Wrong langStoryId prefix: ${item.langStoryId}`);

  return errors;
}

const errors = validate(item);
if (errors.length > 0) {
  console.error("VALIDATION FAILED:");
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}

console.log("Validation passed:");
console.log(`  Title: ${item.title}`);
console.log(`  Paragraphs: ${item.paragraphs.length}`);
console.log(`  Total chars: ${item.paragraphs.reduce((s, p) => s + p.text.length, 0)}`);
item.paragraphs.forEach((p, i) => {
  console.log(`  P${i + 1}: ${p.text.length} chars`);
});
console.log("");

async function push() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log(`  siteId: ${item.siteId}`);
    console.log(`  langStoryId: ${item.langStoryId}`);
    console.log(`  title: ${item.title}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists for tr#tower-of-babel. Skipping to avoid overwrite.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
