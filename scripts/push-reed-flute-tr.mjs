import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "mevlana-museum" },
  langStoryId: { S: "tr#reed-flute" },
  lang: { S: "tr" },
  storyId: { S: "reed-flute" },
  title: { S: "Neyin Feryadı" },
  subtitle: { S: "Tasavvufun ruhunu şekillendiren şiir" },
  excerpt: {
    S: "1258 yılı. Konya. Yüreğinde taşıdığı acıyla kaleme sarılan Mevlana, Farsça'nın en büyük şiirinin ilk satırlarını yazacak. Ve her şeye bir sesle başlayacak — bir neyin feryadıyla.",
  },
  moralOrLesson: {
    S: "İnsanın en derin hüznü, unuttuğu bir eve duyduğu özlemdir — ruhumuz nereden geldiğini hatırlar, biz hatırlamasak bile.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1258 yılı. Konya. Selçuklu başkentinin dar sokaklarında bir adam, yüreğinde taşıdığı acıyla kaleme sarılıyor. Adı Mevlana Celaleddin. Ama o gece ne bir vaaz yazacak ne bir ders notu. O gece, Farsça'nın gelmiş geçmiş en büyük şiirinin ilk satırlarını yazacak. Ve her şeye bir sesle başlayacak — bir neyin feryadıyla.",
          },
        },
      },
      {
        M: {
          text: {
            S: "«Dinle neyden, şikâyet etmekte» — Mesnevi böyle açılır. Ney dediğin bir kamış. Nehir kenarından koparılmış, içi oyulmuş, üflenecek hale getirilmiş sıradan bir kamış. Ama mesele şu: o kamış bir kere koparıldı mı, bir daha asla yerine dönemez. Ve ondan çıkan her ses, her titreşim, aslında bir ezgi değil. Bir ağıt. Kamışın, koparıldığı yere duyduğu özlemin sesi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Benzetme o kadar yalın ki acıtıyor. Kamış, insan ruhudur. Nehir kenarı ise ilahi olan — Tanrı, evren, doğmadan önce nereden geldiysen orası. Hiçbir sebebi yokken huzursuzlanırsın bazen, değil mi? İçine bir boşluk çöker, adını koyamazsın. İşte o an, sendeki kamış inliyor. Ruhun, koparıldığı yeri hatırlıyor. Mevlana bunu yedi yüz küsur yıl önce söylemiş. Ve hâlâ kimse daha iyisini söyleyemedi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama bu şiir yoktan var olmadı. Mevlana, Mesnevi'yi yazmadan önce hayatının en büyük yıkımını yaşadı. Tebrizli Şems adında bir derviş çıkageldi Konya'ya. Sıradan bir hoca değildi Şems — Mevlana'nın bildiği her şeyi sorguladı, onu yerle bir edip yeniden inşa etti. Mevlana'nın dünyası altüst oldu. Ve sonra Şems kayboldu. Muhtemelen öldürüldü. Bir daha geri dönmedi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ateş düştüğü yeri yakar, derler. Ama Şems'in kaybı Mevlana'ya öyle bir ateş düşürdü ki, yanan yerden bütün dünyayı aydınlatan bir ışık doğdu. Saygın ama klasik bir medrese hocası olan adam, tarihin gördüğü en büyük şairlerden birine dönüştü. Acı, onun yakıtı oldu. Ve altı ciltlik devasa Mesnevi'yi — tasavvufun «Farsça Kur'an» dediği eseri — yazmaya oturduğunda, ilk sözü neye verdi. Çünkü insan olmanın özü mutluluk değil. Özlem.",
          },
        },
      },
      {
        M: {
          text: {
            S: "O şiir bir gelenek doğurdu. Mevlana'nın izinden gidenler Mevlevi dervişleri oldu — beyaz kıyafetleriyle dönerek sema yapan, mutlaka görmüşsündür. Her sema töreninde ilk ses neyden gelir. Kasıtlı olarak ham ve yürek burkan bir ses — kamışın ilk feryadının yankısı. Sonra dervişler dönmeye başlar: bir avuç göğe, bir avuç yere. Gösteri değil bu. Bedenle edilmiş bir dua.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bugün, sekiz yüzyıla yakın bir süre sonra, Mevlana dünyanın en çok okunan şairlerinden biri. Sözleri dövmelere, sosyal medya paylaşımlarına, kahve kupalarına yazılıyor. Batı onu «Rumi» diye tanıyor, biz Mevlana diye. Ama adı ne olursa olsun, o ilk imge — kamışın koparıldığı yere ağlaması — hâlâ en derinden vuran. İnancın ne olduğu farketmez. Herkes o sızıyı tanır. Adını koyamadığın bir şeye doğru o çekişi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Mevlana'nın dehası, bütün bunları içi boş bir kamış parçasıyla anlatabilmesiydi. Hepimiz hatırlayamadığımız bir eve hasret duyuyoruz — ve ney, o hasretin sesi. Sekiz yüz yıldır çalıyor. Ve hâlâ susmadı.",
          },
        },
      },
    ],
  },
  icon: { S: "🎵" },
  tier: { S: "A" },
  source: {
    S: "Rumi, Masnavi-ye-Ma'navi, Book I; Franklin Lewis, Rumi: Past and Present, East and West",
  },
  characters: {
    L: [
      { S: "Mevlana Jalaluddin Rumi" },
      { S: "Shams-i-Tabrizi (referenced)" },
      { S: "The reed flute (ney)" },
      { S: "Mevlevi dervishes" },
    ],
  },
  era: { S: "Seljuk Period (c. 1258 AD)" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  updatedAt: { N: "1773495496" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "32.5047" },
      lat: { N: "37.8719" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "love_heartbreak" },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("SUCCESS: Turkish reed-flute story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
}

push();
