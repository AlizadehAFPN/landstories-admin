import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "windsor-castle" },
  langStoryId: { S: "tr#order-of-the-garter" },
  lang: { S: "tr" },
  storyId: { S: "order-of-the-garter" },
  title: { S: "Tarihin En Asil Jartiyeri" },
  subtitle: { S: "Dans pistinde düşen bir jartiyer, dünyanın en köklü şövalyelik nişanını doğurdu" },
  excerpt: { S: "Tarihin en prestijli şövalyelik nişanının bir kadının düşürdüğü jartiyer yüzünden kurulduğunu söylesem inanır mısınız? Yıl 1348. İngiltere Kralı III. Edward — Crécy Muharebesi'nde Fransızları darmadağın etmiş bir savaşçı kral — şatosunda devasa bir balo veriyor." },
  moralOrLesson: { S: "Gerçek asalet, başkalarının onurunu korumaktır — tek bir zarif hareket, yüzyıllarca yaşayacak bir gelenek yaratabilir." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Tarihin en prestijli şövalyelik nişanının bir kadının düşürdüğü jartiyer yüzünden kurulduğunu söylesem inanır mısınız? Yıl 1348. İngiltere Kralı III. Edward — Crécy Muharebesi'nde Fransızları darmadağın etmiş bir savaşçı kral — şatosunda devasa bir balo veriyor. Salon şövalyelerle, soylularla, ülkenin en kudretli isimleriyle tıklım tıklım. Şarap su gibi akıyor, müzik çalıyor. Derken, tarihin akışını değiştirecek bir şey oluyor."
          }
        }
      },
      {
        M: {
          text: {
            S: "Dans pistinde Kent'li Joan var — dönemin tartışmasız en güzel kadını ve Kral'ın gözünü alamadığı söylenen biri. Tam dans ederken bacağındaki jartiyer — çorabını dizinin altında tutan ipek bir bant — kayıp yere düşüyor. Herkesin gözü önünde. 1300'lerde jartiyer mahrem sayılan bir giysi parçasıydı; bugünün diliyle söylersek, aklınıza gelebilecek en fena gardırop kazası. Salon bir anda kahkahaya boğuldu."
          }
        }
      },
      {
        M: {
          text: {
            S: "Derken Kral Edward herkesin beklemediği bir şey yaptı. Dans pistinin ortasından yürüdü, eğildi ve jartiyeri yerden aldı. Salon buz kesti. Sırıtan her yüze tek tek baktı, sonra o mavi ipek şeridi ağır ağır kendi bacağına bağladı. Ve Fransızca altı kelime söyledi ki yedi yüzyıl boyunca yankılanacaktı: \"Honi soit qui mal y pense.\" Bunu kötü düşünenin yüzü kara olsun."
          }
        }
      },
      {
        M: {
          text: {
            S: "\"Son gülen iyi güler\" derler ya — işte Edward o gece bunu tarihe yazdı. Tek bir hareketle her şeyi tersine çevirdi. Bir kadının utancı, bir kralın meydan okumasına dönüştü. Donan salona bu jartiyerin yeni bir şövalyelik nişanının simgesi olacağını ilan etti — öyle bir nişan ki, o gece gülen herkes bir gün onu taşımak için yalvaracaktı. Ve lafta kalmadı. Jartiyer Nişanı'nı kurdu; yaklaşık yedi yüz yıl sonra, hâlâ dünyanın en eski ve en prestijli şövalyelik nişanı."
          }
        }
      },
      {
        M: {
          text: {
            S: "Edward bu kardeşliği Kral Arthur'un efsanevi Yuvarlak Masa'sını örnek alarak kurdu — ve 1300'lerde insanlar Arthur efsanelerini gayet ciddiye alıyordu. Üye sayısını Arthur'un masasındaki şövalye sayısına uygun olarak 24 ile sınırladı, merkez üs olarak Windsor Şatosu'nu seçti. Ama bunlar tören için verilen kâğıt üstü unvanlar değildi. Kurucu şövalyeler İngiltere'nin en sert savaşçılarıydı — aralarında Avrupa'nın korkulu rüyası, Kral'ın oğlu Kara Prens de vardı. Bu onur savaş meydanında kazanılıyordu."
          }
        }
      },
      {
        M: {
          text: {
            S: "Nişanın ruhani evi Windsor'daki St. George Şapeli — on kral ve kraliçenin gömülü olduğu nefes kesen bir Gotik başyapıt. İçeride, 1348'den bu yana her Jartiyer Şövalyesi'nin arması oyma ahşap koltuklarda sergileniyor, üzerlerinde rengarenk flamalar asılı. Her haziran ayında yeni şövalyeler yere kadar uzanan mavi kadife cüppeler ve devasa beyaz tüylerle süslü şapkalarla şato arazisinde yürüyor — bir fantezi romanından fırlamış gibi. Kalabalık hâlâ tezahürat yapıyor. Gelenek yedi yüz yıldır hiç bozulmadı."
          }
        }
      },
      {
        M: {
          text: {
            S: "İşin en çarpıcı yanı şu: bugün bile Jartiyer Nişanı yalnızca İngiliz hükümdarının kişisel armağanı. Başbakan karışamaz, komisyon yoktur, siyaset girmez. Sadece Kral ya da Kraliçe kimin layık olduğuna karar verir. Winston Churchill bu nişanı taşıdı. Napolyon'u dize getiren Wellington Dükü de. Ve hepsi dans pistindeki tek bir ana dayanıyor — bir kadının mahcubiyetini ülkenin en yüce onuruna çeviren ve \"Buna laf eden varsa buyursun\" diyen bir krala."
          }
        }
      }
    ]
  },
  characters: {
    L: [
      { S: "III. Edward — İngiltere Kralı, Jartiyer Nişanı'nın kurucusu" },
      { S: "Kent'li Joan (Salisbury Kontesi) — Düşen jartiyeriyle Nişan'a ilham veren kadın" },
      { S: "Kara Prens Edward — Kurucu şövalye ve Avrupa'nın en korkulan savaşçısı" },
      { S: "Henry of Grosmont, Lancaster Dükü — Kurucu şövalye" },
      { S: "Sir John Chandos — Kurucu şövalye ve usta stratejist" },
      { S: "Kral Arthur — Yuvarlak Masa'sı Nişan'a model alınan efsanevi kral" }
    ]
  },
  source: { S: "Jean Froissart'ın \"Chroniques\" eseri (y. 1370'ler), Elias Ashmole'un \"The Institution, Laws and Ceremonies of the Most Noble Order of the Garter\" eseri (1672), Lisa Jefferson'ın akademik araştırmaları, Historic Royal Palaces arşivleri" },
  era: { S: "1348 — Günümüz" },
  icon: { S: "🎖️" },
  tier: { S: "A" },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lat: { N: "51.4838" },
      lng: { N: "-0.6073" }
    }
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  storyCategory: { S: "crowns_conquests" },
  updatedAt: { N: "1773435994" }
};

try {
  const result = await client.send(new PutItemCommand({
    TableName: "Story",
    Item: item
  }));
  console.log("SUCCESS: Turkish story pushed to DynamoDB");
  console.log("HTTP Status:", result.$metadata.httpStatusCode);
} catch (error) {
  console.error("FAILED:", error.message);
  process.exit(1);
}
