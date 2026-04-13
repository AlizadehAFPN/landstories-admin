import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "catacombs-of-paris" },
  langStoryId: { S: "tr#philibert-aspairt-lost" },
  lang: { S: "tr" },
  storyId: { S: "philibert-aspairt-lost" },

  title: { S: "Çıkışa Yirmi Metre Kala Kaybolan Adam" },
  subtitle: {
    S: "Philibert Aspairt 1793\u2019te Paris\u2019in altındaki tünellere girdi \u2014 on bir yıl sonra, çıkışa bir nefes kala bulundu",
  },
  excerpt: {
    S: "3 Kasım 1793\u2019te Philibert Aspairt adında bir adam, Paris\u2019in altındaki tünellere girdi ve bir daha geri çıkamadı.",
  },

  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "3 Kasım 1793 gecesi, Philibert Aspairt adında bir adam Paris\u2019in altındaki tünellere girdi ve bir daha çıkamadı. Cesedi on bir yıl sonra bulundu. Ama bu hikâyeyi unutulmaz kılan şey, ölümün kendisi değil, ölümün yeri: çıkışa yirmi metre kalmıştı. Yirmi metre \u2014 bir apartman koridoru kadar. Neredeyse kurtulmuştu. Ama zifiri karanlıkta \u201Cneredeyse\u201D diye bir şey yoktur.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Aspairt, Paris\u2019in Sol Yakası\u2019ndaki Val-de-Grâce askeri hastanesinin kapıcısıydı. Hastanenin bodrum katından eski taş ocaklarına inen geçitler vardı; personel arasında bilmeyen yoktu. Peki bu adam neden o tünellere indi? Büyük ihtimalle yakındaki bir manastırın şarap mahzenini arıyordu. Fransız Devrimi sırasında kovulan keşişlerin geride bıraktığı likör stoku. Birkaç tünel ötede, bedavadan içki. Kulağa kötü gelmiyor, değil mi?",
          },
        },
      },
      {
        M: {
          text: {
            S: "Yanına bir mum aldı. Bir tane. Şimdi Paris\u2019in altındaki o tünel ağını bir hayal edin: üç yüz kilometreden uzun, çıkmaz sokaklarla, su basmış galerilerle, çökmüş tavanlarla dolu bir labirent. Her geçit ikiye ayrılıyor, her ikiye ayrılan yol tekrar ikiye ayrılıyor. 1793\u2019te neredeyse hiçbiri haritalanmamıştı. Tek bir mum, etrafınızda iki üç metrelik bir halka aydınlatır. Onun ötesi? Gözlerinizin açık mı kapalı mı olduğunun hiç fark etmediği türden bir karanlık.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Mum söndü.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bir rüzgâr üflemiş olabilir. Belki fitil dibine kadar yandı. Belki ayağı takıldı. Sebebi önemli değil. Önemli olan şu: bir adam, üç yüz kilometrelik tünel ağının bir yerinde ışıksız, haritasız, hangi yönün kurtuluşa hangi yönün ölüme çıktığını bilmeden, yapayalnız dikiliyordu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Yürüdü. Saatlerce, belki günlerce yürümüş olmalı. Ellerini kireçtaşı duvarlarda gezdirerek, her kavşakta tahmine dayalı bir karar vererek, sesinin yankı bile yapmadan taşlara yutulduğu koridorlarda avazı çıktığı kadar bağırarak. Arkasında ne bir iz bıraktı, ne bir işaret. Karanlık onu sessizce yuttu, o kadar.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Cesedi 1804\u2019te ortaya çıktı \u2014 tam on bir yıl sonra. Tünelleri haritalayan taş ocağı işçileri, cebindeki hastane anahtarlarından onu tanıdı. Yattığı yerden kısa bir koridor, tek bir dönüş \u2014 ve doğruca kendi çalıştığı hastanenin bodrum katına çıkılıyordu. Çıkış yirmi metre ötedeydi. O kavşakta sola dönseydi hayata dönecekti. Ama zifiri karanlıkta sağa döndü. \u201CSabrın sonu selamettir\u201D derler. Selamet hakikaten oradaydı \u2014 yirmi adım ötede. Ama karanlıkta sabrın sonu selamet değil, sessizliktir.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Onu düştüğü yere gömdüler. Mezar taşı hâlâ orada duruyor \u2014 Paris yeraltısının en ücra köşelerinden birinde, katakomblardaki birkaç işaretli mezardan biri. Bugün tünellere gizlice girenler, taşının üstüne mum ve bozuk para bırakıyor. Hikâyesi hâlâ anlatılıyor çünkü hepimizin içinde bir yere dokunuyor: kurtuluşa elini uzatsan dokunacak kadar yakın olmak ve bunu asla bilmemek. Paris\u2019in altında yirmi metre, yirmi kilometre eder. Karanlığın, ne kadar yakın olduğunuzla işi yoktur.",
          },
        },
      },
    ],
  },

  moralOrLesson: {
    S: "Labirentte mesafe değil, yön her şeydir \u2014 Aspairt çıkışa yirmi metre kala öldü; bazen kurtuluş göz görmeyecek kadar yakındır.",
  },

  // Unchanged fields from English
  icon: { S: "🕯️" },
  tier: { S: "A" },
  source: {
    S: 'Inspection Générale des Carrières records; Héricart de Thury, "Description des Catacombes de Paris" (1815); cataphile oral tradition',
  },
  characters: {
    L: [
      { S: "Philibert Aspairt" },
      { S: "Quarry workers of the Inspection Générale (discoverers)" },
    ],
  },
  era: { S: "November 3, 1793 (lost); 1804 (found)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "2.34" },
      lat: { N: "48.84" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "ghosts_curses" },
  updatedAt: { N: "1772155467" },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });

    const result = await client.send(command);
    console.log("Successfully pushed Turkish story!");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("PK (siteId):", item.siteId.S);
    console.log("SK (langStoryId):", item.langStoryId.S);
  } catch (error) {
    console.error("PUSH FAILED:", error.message);
    process.exit(1);
  }
}

push();
