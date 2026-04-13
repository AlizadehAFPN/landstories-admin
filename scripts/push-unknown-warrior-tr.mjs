import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "westminster-abbey",
  langStoryId: "tr#the-unknown-warrior",
  lang: "tr",
  storyId: "the-unknown-warrior",

  // Turkish text
  title: "Meçhul Savaşçı",
  subtitle: "Adı yok, rütbesi yok — ama kralların arasında yatıyor",
  excerpt:
    "Kapağın üzerine Londra Kalesi'nden getirilen bir Haçlı kılıcı konuldu. Şövalyelerin çağından kalma bir silah, makineli tüfek çağında ölen bir askerin göğsünde yatıyor.",
  paragraphs: [
    {
      text: "1916 yılı. Birinci Dünya Savaşı'nın tam ortası. İngiliz ordu papazı David Railton, Fransa'nın kuzeyinde, cephe gerisindeki bir askeri mezarlıkta yürüyordu. Her yer ölülerle doluydu. Bir mezar taşı gözüne takıldı. Üzerinde sadece şu yazıyordu: \"Bilinmeyen Bir İngiliz Asker.\" İsim yok. Rütbe yok. Nereli olduğu bile belli değil. Her şeyini vermiş, sonra çamura karışıp yok olmuş bir adam. Railton o haçın önünde donup kaldı. Aklına bir fikir düştü — ama dört yıl boyunca kimseye tek kelime etmedi.",
    },
    {
      text: "Savaş 1918'de bitti. Rakamlar korkunçtu: yaklaşık bir milyon İngiliz askeri ölmüştü. Yüz binlercesinin cesedi bile bulunamadı — top mermileriyle parçalanmış, siper çamurlarına gömülmüş, iz bırakmadan silinmişlerdi. Ailelerin gömecek bir cesedi, başında duracak bir mezarı yoktu. İşte o zaman Railton, Westminster Abbey'in başrahibine mektubunu yazdı. Teklifi şuydu: Kimliği belirsiz bir askeri Fransa'dan getirin. Kralların yanına gömün. Bir ulusun verebileceği en büyük onuru ona verin.",
    },
    {
      text: "7 Kasım 1920 gecesi, altı İngiliz askerinin kimliği belirsiz cesedi Fransa ve Belçika savaş alanlarından sessizce çıkarıldı. Hepsi aynı torbalara konulup Saint-Pol'deki bir kiliseye getirildi. Gece yarısı, Tuğgeneral Wyatt tek başına içeri girdi. Altı cesedin önünde durdu, birini işaret etti. Hepsi buydu. Diğer beşi onurla tekrar toprağa verildi. O andan itibaren seçilen adamın kim olduğunu kimse bilemezdi. Zaten bütün mesele de buydu.",
    },
    {
      text: "Tabut, Hampton Court Sarayı'nın meşesinden yapıldı — kraliyet ağacı, isimsiz bir adam için. Kapağın üzerine Londra Kalesi'nden bir Haçlı kılıcı konuldu. Bir düşünün: şövalyelerin çağından kalma bir silah, makineli tüfek çağında ölen bir askerin göğsünde yatıyor. Demir kalkanın üzerinde şu yazıyordu: \"1914–1918 Büyük Savaşı'nda Kral ve Vatan için düşen bir İngiliz Savaşçısı.\" Sonra tabut mühürlendi. Sonsuza dek. Adı, yaşı, onu öldüren muharebe — hepsi o tabutla birlikte gömüldü.",
    },
    {
      text: "11 Kasım 1920. Silahların susmasının tam ikinci yıl dönümü. Tabut, altı siyah atın çektiği bir top arabasıyla Londra sokaklarından geçti. Kral Beşinci George, tabutun arkasında yürüyordu. Yüz binlerce insan sokakları doldurmuştu — sessiz, ağlamaklı, bazıları kayıp oğullarının fotoğraflarını avuçlarında sıkıyordu. Westminster Abbey'e varıldığında, İngiltere'nin en yüksek cesaret nişanını taşıyan Victoria Cross sahipleri tabutu omuzlarına alıp büyük batı kapısından içeri taşıdı.",
    },
    {
      text: "Kral, açık mezara avuç avuç Fransız toprağı serpti. Ardından mezar, Fransa ve Belçika savaş alanlarından getirilen yüz kum çuvalı toprakla dolduruldu — böylece Meçhul Savaşçı, uğruna öldüğü toprakta sonsuza dek yatacaktı. Zemine siyah Belçika mermeri döşendi. Üzerine, tüm İngilizce konuşan dünyanın artık ezbere bildiği şu sözler kazındı: \"Onu kralların arasına gömdüler; çünkü Tanrı'ya ve yurduna karşı iyilik etmişti.\"",
    },
    {
      text: "O mezar, Britanya'nın en kutsal noktası oldu. Abbey'de tek bir kural var: o taşın üzerine kimse basamaz. Turist, rahip, hatta kral bile. 1923'te Lady Elizabeth, geleceğin Kralı Altıncı George ile evlenirken gelin çiçeğini bu mezarın üzerine bıraktı — siperlerde kaybettiği ağabeyi için. O günden beri Abbey'deki her kraliyet gelini aynısını yapıyor. Amerika bile kendi en yüksek askeri madalyasını ona verdi. Adı olmayan bir adam, tarihin en çok onurlandırılan askerlerinden biri oldu.",
    },
    {
      text: "Westminster Abbey'de krallar yatıyor, kraliçeler, bilim insanları, şairler — yüzyılların en büyük isimleri. Ama o binanın en değerli karış toprağı, adını kimsenin asla bilemeyeceği birine ait. Belki fabrika işçisiydi, belki köy öğretmeni, belki çiftçi çocuğu. Derler ya, \"İnsan ölür, adı kalır.\" Bu adam tam tersini yaptı: adı sonsuza dek silindi ama kendisi ölümsüz oldu. Çünkü o bir kişi değil — çamura gömülen her hayat, kaybolan her isim, veda edememiş her aile adına orada yatıyor.",
    },
  ],
  moralOrLesson:
    "Bir insanın değeri ismine, rütbesine ya da unvanına bağlı değildir. İsimsiz bir asker kralların arasına gömüldü — ve bütün bir ulusun en kutsal mezarı oldu.",

  // Preserved fields from English
  characters: [
    "The Unknown Warrior — An unidentified British soldier of the Great War",
    "Reverend David Railton — Army chaplain who conceived the idea after seeing an unmarked grave in Armentières",
    "Brigadier General L.J. Wyatt — The officer who chose the body from six candidates at midnight",
    "King George V — Who walked behind the coffin and scattered French soil into the grave",
    "Herbert Ryle — Dean of Westminster, who championed the proposal and composed the inscription",
    "David Lloyd George — Prime Minister who gave final approval for the burial",
  ],
  source:
    'Westminster Abbey archives, Reverend David Railton\'s papers, Michael Gavaghan\'s "The Story of the Unknown Warrior" (1995), Imperial War Museum records, Hansard parliamentary debates (1920)',
  era: "1920 AD — Aftermath of the Great War",
  icon: "🎖️",
  tier: "A",
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  coordinates: { lng: -0.1273, lat: 51.4993 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "crowns_conquests",
  updatedAt: Math.floor(Date.now() / 1000),
};

async function push() {
  try {
    // Validate JSON structure
    const jsonStr = JSON.stringify(item);
    JSON.parse(jsonStr); // Verify it parses back
    console.log(`JSON valid. Total size: ${jsonStr.length} bytes`);

    // Count paragraph characters
    let totalChars = 0;
    item.paragraphs.forEach((p, i) => {
      const len = p.text.length;
      totalChars += len;
      console.log(`  P${i + 1}: ${len} chars`);
    });
    console.log(`  Total paragraph chars: ${totalChars}`);
    console.log(`  Paragraphs: ${item.paragraphs.length}`);

    // Push to DynamoDB
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        // Overwrite existing record with trimmed version
      })
    );

    console.log("\n✅ Successfully pushed tr#the-unknown-warrior to Story table");

    // Verify by reading back
    const { GetCommand } = await import("@aws-sdk/lib-dynamodb");
    const result = await docClient.send(
      new GetCommand({
        TableName: "Story",
        Key: { siteId: "westminster-abbey", langStoryId: "tr#the-unknown-warrior" },
      })
    );

    if (result.Item) {
      console.log("✅ Verification: record exists in DynamoDB");
      console.log(`   Title: ${result.Item.title}`);
      console.log(`   Lang: ${result.Item.lang}`);
      console.log(`   Paragraphs: ${result.Item.paragraphs.length}`);
      console.log(`   UpdatedAt: ${result.Item.updatedAt}`);
    } else {
      console.error("❌ Verification failed: record not found after push");
    }
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("❌ Record already exists! Use update instead of put.");
    } else {
      console.error("❌ Push failed:", err.message);
    }
    process.exit(1);
  }
}

push();
