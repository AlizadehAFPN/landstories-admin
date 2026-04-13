import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "moscow-kremlin" },
  langStoryId: { S: "tr#lost-library-ivan" },
  lang: { S: "tr" },
  storyId: { S: "lost-library-ivan" },
  title: { S: "Kayıp Kütüphane" },
  subtitle: { S: "Tarihin en büyük kayıp hazinesi" },
  excerpt: {
    S: "1472 yılı. Son Bizans imparatorunun yeğeni Sophia Palaiologina, Rusya Büyük Prensi III. İvan'la evlenmek üzere Moskova'ya geldi. Yanında ne altın ne toprak vardı. Çeyizi bambaşkaydı: yüzlerce antik Yunanca ve Latince el yazması — Homeros, Aristoteles, Cicero. Konstantinopolis'in efsanevi kütüphanesinden kalan son parçalar; dünyanın çoktan yok olduğunu sandığı eserler.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1472 yılı. Son Bizans imparatorunun yeğeni Sophia Palaiologina, Rusya Büyük Prensi III. İvan'la evlenmek üzere Moskova'ya geldi. Yanında ne altın ne toprak vardı. Çeyizi bambaşkaydı: yüzlerce antik Yunanca ve Latince el yazması — Homeros, Aristoteles, Cicero. Konstantinopolis'in efsanevi kütüphanesinden kalan son parçalar; dünyanın çoktan yok olduğunu sandığı eserler. Bir Bizans prensesi, insanlığın en değerli yazılı mirasını düğün bohçasına sarıp Moskova'ya götürdü.",
          },
        },
      },
      {
        M: {
          text: {
            S: "III. İvan bu eserleri sıradan bir yere koymadı. Kremlin'in altına özel bir yer altı kasası yaptırdı. Moskova o dönem neredeyse tamamen ahşaptı; yangınlar düzenli olarak mahalleleri yalayıp yutuyordu. Kasayı, Kremlin'in ünlü Uspenski Katedrali'ni de inşa eden İtalyan mimar Aristotele Fioravanti tasarlamıştı. Yüzyılların biriktirdiği paha biçilmez bilgi, Rusya'nın tam kalbinde, toprağın metrelerce altına gömüldü.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama koleksiyonun asıl büyümesi İvan'ın torunu IV. İvan döneminde oldu — tarihin \"Korkunç İvan\" diye bildiği adam. Döneminin en acımasız hükümdarlarından biriydi ama kitaplara olan tutkusu sınır tanımıyordu. Simya ve mistisizm üzerine nadir metinler dahil yüzlerce yeni cilt ekledi. 1570 civarında Alman papaz Johann Wetterman kütüphaneyi kendi gözleriyle gördüğünü iddia etti ve sözleri tarihe kazındı: \"Dünyadaki hiçbir hazineyle ölçülemeyecek parşömenler.\"",
          },
        },
      },
      {
        M: {
          text: {
            S: "Sonra 1584'te Korkunç İvan öldü. Ve kütüphane buhar olup uçtu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ne olduğunu kimse bilmiyor. İvan son yıllarını giderek büyüyen bir paranoya içinde geçirmişti — kasayı kendi elleriyle mühürleyip yerini mezara götürmüş olabilir. Bir başka teoriye göre kütüphane, 1598-1613 arasındaki Karışıklıklar Dönemi'nde — Rusya'yı yıkıma sürükleyen iç savaşta — saklandı ve yerini bilen herkes kargaşanın içinde can verdi. Moskova'nın bitmek bilmeyen yangınlarının her şeyi kül ettiğini savunanlar da var. Ama görgü tanıklıkları ve Bizans kayıtları, bu kütüphanenin gerçekten var olduğuna işaret ediyor.",
          },
        },
      },
      {
        M: {
          text: {
            S: "O günden bu yana herkes onu arıyor. 1724'te Çar Büyük Petro, Kremlin'in altına bir keşif ekibi gönderdi — eli boş döndüler. 1894'te Profesör Ignatius Stelletsky tüm kariyerini bu arayışa adadı; Kremlin'in altındaki tünellerin haritasını çıkardı, ta ki Sovyet yönetimi onu durduruncaya dek. 1930'larda Stalin gizli bir arama emri verdi. Adamları derinlere inen tüneller buldu. Stalin'in tepkisi mi? Tünelleri betonla doldurttu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bir an durun ve düşünün. Sovyetler Birliği'nin en güçlü adamı, tarihin en büyük kayıp kütüphanesine açılması muhtemel tünelleri bulduruyor — ve içeri girmek yerine betonla kapatıyor. \"Üç kişi bilirse alem bilir,\" derler. Bu sırrın peşine üç devrin en güçlü adamları düştü ve alem hâlâ bilmiyor. Aşağıda ne vardı ki Stalin için bile bilmemek, bilmekten daha güvenli göründü?",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bugün Kremlin'in bazı bölümlerinin altını kazmak kesinlikle yasak. Eğer kütüphane hâlâ oradaysa, dünyanın en korunaklı yapılarından birinin altında bekliyor — yüzyılların sırları, tonlarca beton ve devlet güvenliğinin katmanları ardında. Bazıları, bulunduğu gün bunun sadece eski kitaplar olmayacağına inanıyor: Konstantinopolis'ten yola çıkıp Moskova'nın altında kaybolan o eserler, belki de insanlık tarihinin kayıp bölümüdür.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "Bazen en büyük hazineyi, onu koruması gereken güç gömer",
  },
  source: {
    S: "Johann Wetterman'ın tanıklığı (y. 1570), Profesör Stelletsky'nin araştırmaları (1894-1930'lar), Bizans evlilik kayıtları",
  },
  characters: {
    L: [
      { S: "III. İvan" },
      { S: "Sophia Palaiologina" },
      { S: "Korkunç İvan" },
      { S: "Aristotele Fioravanti" },
      { S: "Johann Wetterman" },
      { S: "Profesör Stelletsky" },
      { S: "Stalin" },
    ],
  },
  icon: { S: "📚" },
  tier: { S: "A" },
  era: { S: "1472 – günümüz" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  coordinates: {
    M: {
      lng: { N: "37.6175" },
      lat: { N: "55.752" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "riddles_past" },
  updatedAt: { N: "1772125034" },
};

async function push() {
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });
    const result = await client.send(cmd);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists! Use update or remove condition.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
