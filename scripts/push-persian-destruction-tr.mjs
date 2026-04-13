import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "acropolis-athens",
  langStoryId: "tr#persian-destruction",
  lang: "tr",
  storyId: "persian-destruction",
  title: "Küller Üstüne Yemin",
  subtitle: "Atina'yı yakan ateş, Parthenon'u doğurdu",
  excerpt:
    "MÖ 480, sonbahar. Tarihin gördüğü en büyük orduyu arkasına alan bir adam, Atina'nın tepesinde dikilip şehrin yanışını izliyor. Pers Kralı Serhas. Üç yüz bin asker — belki daha fazla — Yunanistan'ı ezip geçerek buraya kadar gelmiş.",
  paragraphs: [
    {
      text: "MÖ 480, sonbahar. Tarihin gördüğü en büyük orduyu arkasına alan bir adam, Atina'nın tepesinde dikilip şehrin yanışını izliyor. Pers Kralı Serhas. Üç yüz bin asker — belki daha fazla — Yunanistan'ı ezip geçerek buraya kadar gelmiş. Spartalılar onu Termopylai'de durdurmaya çalışmıştı — dar bir dağ geçidinde son nefeslerine kadar dövüşmüşlerdi. Ama sadece yavaşlatabilmişlerdi. Atina bomboştu. Halk çoktan gemilere binip gitmişti. Her şeylerini donanmalarına bağlamışlardı.",
    },
    {
      text: "Ama herkes gitmemişti. Bir avuç rahip ve savaşçı, Akropolis'e — Atina'nın en kutsal tepesine — sığınmıştı. Ahşap duvarların arkasına saklanmışlardı. Sebebi vardı: Delfi Kâhini, ünlü kehanetinde \"ahşap duvarlar Atina'yı kurtaracak\" demişti ve onlar bunu kendileri sandılar. Yanılıyorlardı. Pers askerleri kayalıklardan gizli bir yol bulup tırmandı, savunmacıları arkadan sardı. Tanrılarına sığınmak için sunakların önüne çökmüş insanları oracıkta kılıçtan geçirdiler. Sonra her şeyi ateşe verdiler.",
    },
    {
      text: "O gün yüzyılların birikimi alev alev yandı. Boyalı kabartmalarla süslü, adaklarla dolu görkemli Athena Tapınağı enkaza döndü. Rahipler, Atina'nın en kutsal varlığını — tanrıçanın zeytin ağacından yontulmuş kadim heykelini — son anda kurtarmayı başarmışlardı. Ama gerisi yok oldu. Her hazine, her boyanmış sütun, nesiller boyunca tanrılara sunulmuş her sanat eseri küle dönmüştü. Serhas, Atina'nın ruhunu söküp almıştı.",
    },
    {
      text: "Ama Serhas'ın zaferi çok kısa sürdü. Atinalı komutan Themistokles — tarihin en keskin askeri beyinlerinden biri — koca Pers donanmasını Salamis Adası yakınlarındaki dar sulara çekmeyi başardı. Tuzaktı bu. Devasa Pers savaş gemileri dönecek yer bulamadı. Daha küçük, daha çevik Yunan gemileri onları paramparça etti. Serhas bütün bu felaketi kıyıda kurduğu tahtından izledi; sonra kuyruğunu kıstırıp Pers'e kaçtı. Geride bıraktığı ordu da ertesi yıl ezildi.",
    },
    {
      text: "Ve sonra geldi o yemin. Yunanlılar, yıkılan tapınaklarını yeniden inşa etmeyeceklerine ant içtiler. Her yanmış sütun, her parçalanmış heykel, her enkaz yığını olduğu yerde kalacaktı — Pers'in ne yaptığının canlı kanıtı olarak. Ve sözlerinde durdular. Otuz yıl boyunca o harabeler tepenin üstünde el değmeden durdu. Koca bir nesil, kendi kutsal mekânlarının yıkıntıları arasından geçerek büyüdü. Sabrın sonu selamettir derler — Atinalılar için sabrın sonu Parthenon oldu.",
    },
    {
      text: "MÖ 449'da Atina, Perslerle barış antlaşması imzaladı. Perikles adında bir lider çıktı ortaya ve dedi ki: \"Yemin yerine getirildi. Artık dünyanın görmediği bir şey inşa etmenin zamanı.\" Ve Parthenon, eski tapınağın külleri üzerinde yükseldi. Üzerindeki her heykel aynı hikâyeyi anlatıyordu: düzen kaosun, medeniyet yıkımın üstüne çıkar. Bu, Atina'nın dünyaya mesajıydı: \"Bizi yakıp yıktınız. Bakın yerine ne diktik.\"",
    },
    {
      text: "Ve işte tüylerinizi diken diken edecek kısım. 1800'lerde Akropolis'te kazı yapan arkeologlar, Serhas'ın ateşinden kalan enkazı tam da eski Atinalıların gömdüğü yerde buldular: yanmış heykeller, parçalanmış kabartmalar, isli taşlar. İki bin beş yüz yıl sonra, Atina tarihinin en karanlık gününün izleri hâlâ oradaydı — bilerek saklanmış, bilerek korunmuştu. Sanki şehrin kendisi kimsenin unutmamasını istiyormuş gibi.",
    },
  ],
  moralOrLesson:
    "Yıkılmak, son değildir. Persler Atina'yı küle çevirdi — ama farkında olmadan tarihin en görkemli tapınağının önünü açtı.",
  icon: "🔥",
  tier: "A",
  era: "MÖ 480",
  source:
    "Herodotus's Histories (Books 8-9), Thucydides's History, Isocrates's Panegyricus, Diodorus Siculus's Bibliotheca Historica",
  characters: [
    "Serhas",
    "Themistokles",
    "Atinalı rahipler ve savunmacılar",
    "Pers ordusu",
  ],
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: {
    lat: 37.9715,
    lng: 23.7267,
  },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "lost_found",
  updatedAt: Math.floor(Date.now() / 1000),
};

async function pushStory() {
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
    console.log(`   paragraphs: ${item.paragraphs.length}`);
    console.log(`   updatedAt: ${item.updatedAt}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("❌ Record already exists! Use update instead.");
    } else {
      console.error("❌ Push failed:", err.message);
    }
    process.exit(1);
  }
}

pushStory();
