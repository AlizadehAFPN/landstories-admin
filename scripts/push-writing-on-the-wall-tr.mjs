import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "babylon" },
  langStoryId: { S: "tr#writing-on-the-wall" },
  lang: { S: "tr" },
  storyId: { S: "writing-on-the-wall" },
  title: { S: "Duvardaki Yazı" },
  subtitle: {
    S: "MENE, MENE, TEKEL, UFARSIN — gizemli bir elin saray duvarına yazdığı ölüm fermanı",
  },
  excerpt: {
    S: "Babil İmparatorluğu'nun son gecesinde dışarıda bir Pers ordusu bekliyordu. İçerideyse veliaht prens bin kişilik bir ziyafet verip Kudüs Tapınağı'ndan çalınmış altın kadehlere şarap döküyordu. Derken havadan bir el belirdi ve imparatorluğun sonunu duvara yazdı.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Dünyada güçlü olan herkesin bilmesi gereken bir şey var: tarihin en büyük imparatorluğu bir savaşla değil, bir ziyafet sırasında çöktü. MÖ 539, Ekim'in on ikinci gecesi. Babil — surları öyle kalındı ki üstünde savaş arabaları yarışırdı — düşman kapıdayken bile kendini yenilmez sanıyordu. Pers ordusu kapıların önünde mevzilenmişti. İçerideyse kadehler dolup taşıyordu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Asıl sorun dışarıdaki düşman değildi — tahtında oturmayan kraldı. Babil'in son hükümdarı Nabonidus, on yıl önce başkentini terk edip bin kilometre ötedeki Tayma çölüne çekilmişti. Yönetimi oğlu Belşassar'a bırakmıştı. Kralın tahtını meşru kılan en kutsal Babil bayramı on yıldır kutlanmıyordu. Rahipler öfkeden köpürüyordu. Halk tedirgin. Ve Persler kapıya dayanmak üzereydi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "O son gecede Belşassar bin soyluyu saraya toplayıp bir ziyafet verdi. Sonra tarihe geçecek bir hata yaptı: hizmetçilere, Babil'in en güçlü hükümdarı Nebukadnezar'ın yaklaşık elli yıl önce Kudüs Tapınağı'ndan yağmaladığı altın ve gümüş kadehleri getirmelerini buyurdu. Bu kaplar İsrail'in Tanrısı'na adanmış kutsal eşyalardı. Belşassar ve konukları bu kadehleri birer parti bardağı gibi kullanıp kendi altın ve taş tanrılarına kadeh kaldırdı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "İşte tam o an oldu. Havadan bir insan eli belirdi — kolu yok, gövdesi yok, sadece parmaklar. Ve sarayın duvarına bir şeyler yazmaya başladı. Belşassar olan biteni kendi gözleriyle gördü. Yüzünden bütün kan çekildi. Dizlerinin bağı çözüldü. Sesi titreyerek Babil'deki bütün bilgeleri, falcıları, müneccimleri çağırttı. Yazıyı çözebilene servet ve makam vadetti. Hiçbiri yazıya anlam veremedi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Sonunda birisi Daniel'i hatırladı — altmış altı yıl önce delikanlıyken Kudüs'ten sürgün edilmiş Yahudi bir bilge, artık yaşlı bir adam. Daniel geldi, ödülleri elinin tersiyle itti ve duvardaki yazıyı okudu: MENE, MENE, TEKEL, UFARSIN. Aramice sözcükler, çifte anlam taşıyordu. İsim olarak küçülen ağırlık birimleri — mina, şekel, yarım mina — Babil krallarının eriyen değerini gösteriyordu. Fiil olaraksa bir idam fermanıydı: Sayıldın. Tartıldın. Bölündün. Krallığın bu gece bitiyor, Persler kapıda.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Aynı gece Persler hamlesini yaptı. Büyük Kiros — bilinen dünyanın yarısını çoktan fethetmiş Pers kralı — Fırat Nehri'ni şehrin yukarısından saptırttı. Fırat, surların altından Babil'in tam ortasından geçiyordu. Su seviyesi düşünce Pers askerleri sığlaşan nehir yatağından yürüyerek korumasız bırakılmış nehir kapılarının altından süzüldü ve şehri içeriden ele geçirdi. Babil tek bir ok atılmadan düştü.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Güneş doğmadan Belşassar öldürüldü. Kiros on yedi gün sonra Babil'e girdi — bir fatih olarak değil, bir kurtarıcı olarak. İhmal edilmiş tapınakları onarttı, yerel tanrılara saygı gösterdi ve tarihin akışını değiştirecek bir ferman yayınladı: sürgündeki Yahudiler evlerine dönüp Kudüs'teki tapınaklarını yeniden inşa edebilecekti. Yaklaşık elli yıllık Babil Sürgünü sona erdi. Belşassar'ın ziyafetinde oyuncak ettiği kutsal kadehler, çalındıkları şehre geri dönecekti.",
          },
        },
      },
      {
        M: {
          text: {
            S: "\"Duvardaki yazı\" deyiminin neredeyse her dile girmiş olmasının bir sebebi var. Herkesin tanıdığı o anı yakalıyor: her şey yıkılmaya bir adım kala, işaretler her yerde, ama tepedekiler kutlama yapmaktan başını kaldıramıyor. Yazılan bozulmaz derler — doğru. Ama yazıyı okuyacak gözün açık olması lazım. İmparatorluklar sonlarını ilan etmez. Ziyafet verir. Altın kadehlerden içer. Ve bir yerlerde, okumayı reddettikleri harflerle, hüküm çoktan yazılmış olur.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "İmparatorluklar sonlarını ilan etmez. Ziyafet verir. Altın kadehlerden içer. Surlarını sayar, yüzyıllardır ayakta duranın bir gecede yıkılamayacağına kendilerini inandırır. Ama tarih kendi hesabını tutar ve her krallık tartıya çıkar — mene, tekel, ufarsin — sayıldın, tartıldın, bölündün. Yazı her zaman duvardadır. Mesele, onu okuyacak kadar ayık birinin olup olmadığıdır.",
  },
  icon: { S: "✋" },
  tier: { S: "A" },
  source: {
    S: "Daniel 5 (biblical account of Belshazzar's feast); The Nabonidus Chronicle (BM 35382, British Museum); The Cyrus Cylinder (BM 90920, British Museum); Herodotus, Histories I.191 (fall of Babylon); Xenophon, Cyropaedia VII.5 (festival and river diversion); The Verse Account of Nabonidus (BM 38299); Beaulieu, Paul-Alain. The Reign of Nabonidus, King of Babylon 556-539 B.C., Yale University Press, 1989; Kuhrt, Amélie. 'The Cyrus Cylinder and Achaemenid Imperial Policy,' Journal for the Study of the Old Testament 25, 1983; Collins, John J. Daniel: A Commentary on the Book of Daniel, Fortress Press, 1993",
  },
  characters: {
    L: [
      { S: "Belshazzar -- crown prince of Babylon, regent in his father's absence" },
      { S: "Nabonidus -- the last king of Babylon, absent in Tayma for a decade" },
      { S: "Daniel -- Jewish exile who read the mysterious writing" },
      { S: "Cyrus the Great -- Persian king whose army conquered Babylon in a single night" },
      { S: "Gobryas (Ugbaru) -- Persian general who entered Babylon through the dry riverbed" },
    ],
  },
  era: { S: "October 12, 539 BCE -- the night Babylon fell to Persia" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "44.4209" },
      lat: { N: "32.5363" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "prophets_pilgrims" },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });
    const result = await client.send(command);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);

    // Validate by reading back
    const { GetItemCommand } = await import("@aws-sdk/client-dynamodb");
    const getResult = await client.send(
      new GetItemCommand({
        TableName: "Story",
        Key: {
          siteId: { S: "babylon" },
          langStoryId: { S: "tr#writing-on-the-wall" },
        },
      })
    );
    if (getResult.Item) {
      console.log("VERIFIED: Record exists in DynamoDB");
      console.log("  Title:", getResult.Item.title.S);
      console.log("  Lang:", getResult.Item.lang.S);
      console.log("  Paragraphs:", getResult.Item.paragraphs.L.length);
    } else {
      console.error("ERROR: Record not found after push!");
    }
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Turkish version already exists! Use update instead.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
