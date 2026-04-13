// Recreate "The King Who Conquered the Lie" in Turkish — native voice, not translation.
// Turkish proverb: "Yalancının mumu yatsıya kadar yanar" (A liar's candle burns only until evening prayer)
// Subverted: Darius's candle burned for two thousand years.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const tr = {
  siteId: "persepolis",
  storyId: "king-who-conquered-the-lie",
  lang: "tr",
  langStoryId: "tr#king-who-conquered-the-lie",
  icon: "\u2694\uFE0F",
  storyCategory: "crowns_conquests",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 29.9342, lng: 52.8914 },
  source:
    "The Behistun Inscription (DB), Old Persian text translated in Kent, R.G., Old Persian: Grammar, Texts, Lexicon (1953); Herodotus, Histories III.61-88; Briant, Pierre, From Cyrus to Alexander (2002); Waters, Matt, Ancient Persia: A Concise History (2014); Hallock, R.T., Persepolis Fortification Tablets (1969)",
  updatedAt: now,

  title: "Yalanı Fetheden Kral",

  subtitle:
    "Hakikati en yüce ilke yapan adam \u2014 belki de tarihin en büyük yalanıyla tahta çıktı",

  excerpt:
    "MÖ 522. Yedi Pers soylusu bir kaleyi basıp dünyanın en büyük imparatorluğunun kralını boğazladı. O kanlı odadan çıkan adam Persepolis\u2019i inşa edecek \u2014 ve bunu haklı çıkarmak için tarihin en büyük yalanını kayalara kazıyacaktı.",

  era: "MÖ 522\u2013518 (Darius\u2019un yükselişi); 1835\u20131847 (Bîsütun Yazıtı\u2019nın çözümü)",

  characters: [
    "I. Darius (Büyük Darius)",
    "Gaumata / Bardiya (tartışmalı kral)",
    "Otanes, Gobryas ve altı suikastçı",
    "Atossa (Büyük Kiros\u2019un kızı)",
    "Henry Rawlinson (yazıtı çözen)",
  ],

  moralOrLesson:
    "Hakikati imparatorluğunun en yüce değeri yapan adam, o imparatorluğu belki de tarihin en büyük yalanıyla kurdu. Ve o çelişki üzerine yükselen uygarlık iki yüzyıl ayakta kaldı; kıtaları birleştiren yollar açtı, işçilerine hak ettiğini ödedi, insanlığın en güzel sanat eserlerini yarattı. Bazen en büyük hakikatler, en cüretli yalanlardan doğar.",

  paragraphs: [
    {
      text: "MÖ 522. Pers İmparatorluğu Libya\u2019dan Hindistan\u2019a uzanıyor \u2014 dünyanın o güne dek gördüğü en büyük devlet. Tahtında Büyük Kiros\u2019un oğlu Bardiya var; vergileri kaldırmış, halk bayılıyor adama. Derken bir gece yedi soylu kaleyi basıyor. Karanlıkta biri kralı yere yapıştırıyor; Darius elinde hançerle donup kalıyor \u2014 kendi adamını vuracak diye tereddütte. Kralı tutan adam haykırıyor: \u201CSapla! İkimize birden vursan bile!\u201D Darius sapladı. Sonra başını kesip halka gösterdiler.",
    },
    {
      text: "Darius veliaht falan değildi \u2014 taht sıralamasında adı bile geçmeyen sıradan bir soylu. Ama sonra yaptığı şey tarihi değiştirdi. Zagros Dağları\u2019nda, eski bir yolun yüz metre yukarısındaki dimdik bir kayalığa devasa bir yazıt kazıttı \u2014 üç ayrı dilde. Ve o yazıtta gerçeği sıfırdan kurguladı. Öldürdükleri adam gerçek Bardiya değilmiş. Gerçek prens aylar önce gizlice öldürülmüş. Gaumata adlı bir rahip onun kılığına girip tahtı çalmış. Darius ise Tanrı\u2019nın gönderdiği kurtarıcıymış.",
    },
    {
      text: "İşin ilginci: bugün neredeyse hiçbir tarihçi bu hikâyeye inanmıyor. Darius kendi hikâyesinin hem yazarı hem tek tanığı. Bütün imparatorluk \u2014 Bardiya\u2019yı bizzat tanıyan insanlar dahil \u2014 onu gerçek kral diye kabul etmişti. Vergi indirimi, tahtı çalmaya çalışan umutsuz bir sahtekârın değil, kendinden emin bir hükümdarın işi. Üstelik Darius darbeden sonra hem Kiros\u2019un kızıyla hem Bardiya\u2019nın kızıyla evlendi \u2014 bu bir hanedanı geri getirme değil, yutma hamlesi. Tarihçiler açıkça söylüyor: meşru kralı öldürdü, hikâyeyi uydurdu.",
    },
    {
      text: "Yalancının mumu yatsıya kadar yanarmış. Darius\u2019unki iki bin yıl yandı. Ama önce imparatorluk isyan etti: tek yılda on dokuz eyalette ayaklanma. Bir adam daha kalkıp \u201CBen Bardiya\u2019yım\u201D dedi \u2014 insanların Darius\u2019a ne kadar güvenmediğini göstermeye bu bile yeter. Darius hepsini ezdi. Bir isyancının burnunu, kulaklarını, dilini kestirdi; gözünü oydurdu; sonra diri diri kazığa oturtup sergiledi. Mesaj hep aynıydı: bunlar \u201CYalan\u201D\u2019ın askerleri \u2014 Pers inancında Hakikat\u2019in ezeli düşmanı. Darius\u2019a karşı çıkan, Tanrı\u2019ya karşı çıkmış olurdu.",
    },
    {
      text: "Tahtını kanla aldı, propagandayla pekiştirdi. Sonra tarihin en şaşırtıcı uygarlıklarından birini kurdu. Persepolis\u2019te düzinelerce milletten gelen işçilere maaş ödeniyordu; köle değillerdi. Kadınlar erkeklerle aynı ücreti alıyordu. Hamile kadınlara fazladan erzak veriliyordu. Yolları öyle hızlıydı ki tarihçi Herodotos \u201Cne kar, ne yağmur, ne kavurucu sıcak, ne gecenin karanlığı ulakları durduramaz\u201D diye yazdı. Yirmi dört asır sonra Amerikan Postanesi bu sözü sloganı yaptı. Yalancı, inanmaya değer bir dünya kurmuştu.",
    },
    {
      text: "O yazıt iki bin yıl okunamadan kaldı. 1835\u2019te Henry Rawlinson adında genç bir İngiliz subay kayalığa tırmanmaya başladı. Tek eliyle kadim yazıları kopyalıyordu \u2014 diğer eliyle uçurumun kenarındaki merdivene tutunarak. En ulaşılmaz bölümlere bir Kürt çocuğunu iple sarkıttı. On iki yıl sürdü. Şifreyi çözünce Mezopotamya\u2019nın kayıp yazı sistemi de çözüldü \u2014 Rosetta Taşı Mısır hiyeroglifleri için neyse, Bîsütun Yazıtı çivi yazısı için o oldu. İki bin yıllık sessizlikten sonra Darius yeniden konuşuyordu.",
    },
    {
      text: "Bugün hâlâ orada, kayaya kazınmış \u2014 ayağı düşmanının sırtında, dokuz asi kral önünde sıralanmış. Persepolis hâlâ İran ovalarından yükseliyor; sütunları, Darius\u2019un \u201Ctanrım yarattı\u201D dediği göğe uzanıyor. Ve bu çelişkinin kolay bir cevabı yok: Hakikat\u2019i bayrak yapan bir katil. İnanılacak bir şey inşa eden bir propagandacı. Dünyanın en büyük imparatorluğunu en büyük yalanı üzerine kuran \u2014 ve sonra ömrünü o yalanı gerçeğe dönüştürmekle geçiren bir adam.",
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────────────

console.log(`\n${"═".repeat(60)}`);
console.log(`Pushing TURKISH (tr)...`);
console.log(`  siteId:      ${tr.siteId}`);
console.log(`  langStoryId: ${tr.langStoryId}`);
console.log(`  title:       ${tr.title}`);
console.log(`  paragraphs:  ${tr.paragraphs.length}`);
console.log(`  updatedAt:   ${tr.updatedAt}`);

// ─── Validate before pushing ─────────────────────────────────────────────────
const requiredFields = [
  "siteId", "storyId", "lang", "langStoryId", "title", "subtitle",
  "excerpt", "moralOrLesson", "paragraphs", "characters", "era", "source",
];
for (const f of requiredFields) {
  if (!tr[f]) {
    console.error(`  ❌ VALIDATION FAILED: missing field "${f}"`);
    process.exit(1);
  }
}
if (tr.paragraphs.length < 6 || tr.paragraphs.length > 10) {
  console.error(`  ❌ VALIDATION FAILED: expected 6-10 paragraphs, got ${tr.paragraphs.length}`);
  process.exit(1);
}
for (let i = 0; i < tr.paragraphs.length; i++) {
  const len = tr.paragraphs[i].text.length;
  if (len > 600) {
    console.error(`  ❌ VALIDATION FAILED: paragraph ${i + 1} is ${len} chars (max 600)`);
    process.exit(1);
  }
}
console.log("  ✅ Validation passed.");

try {
  await doc.send(new PutCommand({ TableName: TABLE, Item: tr }));
  console.log("  ✅ TURKISH (tr) pushed successfully.");
} catch (err) {
  console.error(`  ❌ FAILED: ${err.message}`);
  process.exit(1);
}

console.log(`\n${"═".repeat(60)}`);
console.log("Done. Turkish version is live.");
console.log(`Timestamp: ${now}`);
