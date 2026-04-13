import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "neuschwanstein-castle" },
  langStoryId: { S: "tr#swan-knight-lohengrin" },
  storyId: { S: "swan-knight-lohengrin" },
  lang: { S: "tr" },
  title: { S: "Kuğu Şövalyesi" },
  subtitle: { S: "Bir operadan çıkıp taşa dönüşen efsane" },
  excerpt: { S: "Efsane Ortaçağ'a kadar uzanır ama asıl dönüm noktası 1850'de geldi — Alman besteci Richard Wagner bu hikâyeyi operaya dönüştürdüğünde." },
  moralOrLesson: { S: "İman diyor ki bazı şeyleri sorma. Ama insan doğası sormadan edemiyor. Asıl trajedi sormak değil — sır üzerine kurulan bir aşkın gerçeğe dayanamaması." },
  icon: { S: "🦢" },
  tier: { S: "A" },
  source: { S: "Wagner, Richard. Lohengrin, WWV 75, premiered 1850; Wolfram von Eschenbach, Parzival (c. 1200-1210); McIntosh, Christopher. The Swan King, 2012" },
  characters: {
    L: [
      { S: "Lohengrin (Kuğu Şövalyesi)" },
      { S: "Brabant Düşesi Elsa" },
      { S: "Parsifal (Lohengrin'in babası)" },
      { S: "Ortrud (büyücü)" },
      { S: "Bavyera Kralı II. Ludwig" },
      { S: "Richard Wagner" }
    ]
  },
  era: { S: "Medieval legend, 19th century revival" },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "10.7498" },
      lat: { N: "47.5576" }
    }
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  storyCategory: { S: "love_heartbreak" },
  updatedAt: { N: "1773539917" },
  paragraphs: {
    L: [
      {
        M: {
          text: { S: "Efsane Ortaçağ'a kadar uzanır ama asıl dönüm noktası 1850'de geldi — Alman besteci Richard Wagner bu hikâyeyi operaya dönüştürdüğünde. Zaman, 933 yılı. Brabant Düşesi Elsa, öz kardeşini öldürmekle suçlanır. Suçlama yalandır; kardeşi aslında Ortrud adlı bir büyücü tarafından kuğuya dönüştürülmüştür. Ama bunu bilen yok. Elsa'nın düelloda onu savunacak bir şampiyonu da yok. Kaderi belli gibidir: ölüm." }
        }
      },
      {
        M: {
          text: { S: "Derken nehirde bir tekne belirir. Onu ne kürek çeker ne rüzgâr — sadece tek bir beyaz kuğu. Teknede gümüş zırhlı bir şövalye durur; başka bir âlemden gelmiş gibidir. Kıyıya çıkar, Elsa adına dövüşür ve kazanır. Sonra onunla evlenir. Ama bir koşul koyar ve bu koşul tartışılmaz: Elsa ona asla adını ya da nereden geldiğini sormayacaktır. Sorduğu an, şövalye sonsuza dek gidecektir." }
        }
      },
      {
        M: {
          text: { S: "Bir süre her şey yolundadır. Şövalye Brabant'ı adaletle yönetir, Elsa'yı derinden sever. Ama Ortrud boş durmaz. Her gece Elsa'nın kulağına aynı zehri damlatır: \"Evlendiğin adamın adını bile bilmiyorsun. Bu nasıl bir evlilik?\" Kuşku küçük başlar ama durmak bilmez. Sabrın sonu selamettir derler — Elsa'nın hikâyesinde selamet, tam da sabrın bittiği yerde sona erdi. Düğün gecesi dayanamaz ve sorar: \"Sen kimsin? Nereden geldin?\"" }
        }
      },
      {
        M: {
          text: { S: "Şövalyenin yüzü hüzünle kapanır. Adı Lohengrin'dir — Hristiyan efsanesindeki Kutsal Kâse Şövalyeleri'nden Parsifal'in oğlu. Kâse onu Elsa'yı korumak için göndermiştir. Ama bu gücün tek bir şartı vardır: koşulsuz güven. Şüphe ettiğin an büyü biter. Lohengrin kuğu teknesini geri çağırır. Kuğunun üzerine dua eder — kuğu, Elsa'nın kayıp kardeşine dönüşür, sapasağlam. Sonra tekneye biner ve ufukta kaybolur. Elsa arkasından bakar ve acısına dayanamayıp ölür." }
        }
      },
      {
        M: {
          text: { S: "1861'de on beş yaşında bir Bavyera prensi, Münih'teki bir tiyatroda Wagner'in Lohengrin'ini ilk kez izler. Gösteri onu yerle bir eder. Baştan sona hıçkırarak ağlar ve sonradan bu geceyi gençliğinin en belirleyici anı olarak anlatır. Ama Prens Ludwig sadece hayranlık duymaz — Lohengrin'de kendini görür. O da tuhaftır, güzeldir ve açıklanamaz biridir. O da sevgiye imkânsız şartlar koyar. O da dünya cevap istediğinde kaybolmayı tercih edecektir." }
        }
      },
      {
        M: {
          text: { S: "Ludwig 1864'te henüz on sekiz yaşındayken Bavyera Kralı olur. Ve efsane hayal dünyasından çıkıp taşa dönüşür. Alpler'de bir uçurumun kenarına Neuschwanstein'ı inşa ettirir — masallardan fırlamış bir kale. İçini kuğularla doldurur: duvarlarda resimler, mobilyalarda oymalar, avlularda çeşmeler. Kalenin adı bile \"Yeni Kuğu Taşı\" demektir. Bu süsleme değildir; bu bir ilandır. Kuğu Şövalyesi yeniden doğmuştur. Tek isteği güzellikle baş başa kalmaktır — dünya hesap sorduğu an kaybolmaya hazırdır." }
        }
      },
      {
        M: {
          text: { S: "Ve dünya hesap sordu. 1886'da Ludwig'in kendi hükümeti onu akıl hastası ilan edip tahttan indirdi. Birkaç gün sonra Starnberg Gölü'nün sığ sularında ölü bulundu — boğulmuştu, ama koşulları bugün bile kimse tam olarak açıklayamıyor. Tıpkı Lohengrin gibi kayboldu — arkasında bir dağın tepesinde bembeyaz bir kale ve hâlâ cevapsız bir soru bırakarak." }
        }
      }
    ]
  }
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("SUCCESS: Turkish Swan Knight Lohengrin pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
}

push();
