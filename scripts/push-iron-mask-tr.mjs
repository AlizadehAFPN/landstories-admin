import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "palace-of-versailles" },
  langStoryId: { S: "tr#man-in-iron-mask" },
  storyId: { S: "man-in-iron-mask" },
  lang: { S: "tr" },
  title: { S: "Demir Maskeli Adam" },
  subtitle: { S: "Bir kralın 34 yıl sakladığı mahkûm — Fransa tarihinin en büyük sırrı" },
  excerpt: { S: "1669'da Fransız Alpleri'ndeki bir kaleye yüzü örtülü bir mahkûm getirildi. Kim olduğunu kimse öğrenemeyecekti." },
  icon: { S: "🎭" },
  tier: { S: "S" },
  era: { S: "XIV. Louis Dönemi (1669–1703)" },
  storyCategory: { S: "riddles_past" },
  readingTimeMinutes: { N: "3" },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  image: { S: "" },
  thumbnail: { S: "" },
  moralOrLesson: { S: "Bazı sırlar o kadar şiddetle korunur ki sırrı saklamak, gerçeğin kendisinden daha ünlü olur." },
  source: { S: "Voltaire, Le Siècle de Louis XIV; Dumas, Le Vicomte de Bragelonne; Fransız devlet arşivleri" },
  coordinates: {
    M: {
      lat: { N: "48.8049" },
      lng: { N: "2.1204" },
    },
  },
  characters: {
    L: [
      { S: "Maskeli mahkûm" },
      { S: "Kral XIV. Louis" },
      { S: "Saint-Mars (gardiyan)" },
      { S: "Voltaire" },
      { S: "Alexandre Dumas" },
    ],
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1669. Fransız Alpleri'ndeki Pignerol Kalesi'nin önüne bir araba yanaşıyor. İçinde yüzü kadife bir maskeyle örtülü bir adam var — evet, kadife; meşhur demir maske sonradan uydurulacak. Arabayı karşılayan kişi Saint-Mars adında bir gardiyan. Emri bizzat Avrupa'nın en güçlü hükümdarı XIV. Louis'den almış. Talimat kısa ve ürpertici: Bu adamı yaşat, rahat ettir, ama kim olduğunu sakın, asla kimse öğrenmesin.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ve bunu ölümüne ciddiye aldılar. Gardiyanların mahkûmla günlük ihtiyaçları dışında tek kelime konuşması yasaktı. Ziyaretçi yok, mektup yok, dış dünyayla temas sıfır. Birisi kim olduğunu öğrenmeye kalkarsa? Ceza ölüm — ama mahkûma değil, sorana. Bu adam her kimse, neyi biliyorsa ya da neyi temsil ediyorsa, Fransız sarayı onu diri diri gömmek için her şeyi göze almıştı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Otuz dört yıl. Bu adamı otuz dört yıl boyunca hapishaneden hapishaneye taşıdılar. Pignerol'den güney kıyısındaki Sainte-Marguerite adasına, oradan Paris'in göbeğindeki Bastille'e. Saint-Mars her seferinde yanındaydı — her taşınmada terfi edip yeni hapishanenin müdürü olarak atandı. 1703'te mahkûm öldü. Hücresi aynı gün boşaltıldı: duvarlar kazındı, eşyalar yakıldı. Adamın var olduğuna dair tek bir iz bırakılmadı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Peki bu adam kimdi? Bu soru üç yüz yılı aşkın süredir cevapsız. Dönemin ünlü Fransız düşünürü Voltaire, mahkûmun XIV. Louis'nin gizli ikiz kardeşi olduğunu öne sürdü — varlığı kralın taht hakkını tehlikeye atacağı için saklanmıştı. Bir asır sonra romancı Alexandre Dumas bu fikri tarihin en bilinen macera romanlarından birine dönüştürdü. Bugün çoğu insan hikâyeyi Dumas'dan tanır.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama tek teori bu değil. Bazı tarihçilere göre mahkûm, gizli bir anlaşmada XIV. Louis'yi arkadan vuran İtalyan diplomat Kont Matthioli'ydi. Başka bir görüşe göre gözden düşmüş bir Fransız generaliydi. En çılgın iddia mı? Bu adamın kralın öz babası olduğu — yani bizzat Güneş Kral'ın gayrimeşru doğduğu. Her teorinin bir dayanağı var. Hiçbirinin kesin kanıtı yok.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bugün tarihçilerin çoğunluğunun kabul ettiği teori en yalın olanı. Eustache Dauger adında sıradan bir uşak, güçlü bir Fransız bakanın yanında çalışırken devlet sırlarına denk gelmiş. Öyle sırlar ki kral, bu adamın bir daha özgürce konuşmasına izin veremezmiş. İdam edecek kadar suçlu değil ama salıverecek kadar masum da değil. Çözüm basit: yüzünü kapat, kapıyı kilitle, anahtarı yut.",
          },
        },
      },
      {
        M: {
          text: {
            S: "İşte asıl ürpertici olan bu. XIV. Louis dünyanın en güçlü insanıydı — Versailles'ı inşa ettirdi, Avrupa'yı savaşlarla sarstı, kendine Güneş Kral dedirtti. Ama bu tek mahkûmu ne öldürebildi ne serbest bırakabildi ne de yüzünü gösterebildi. \"Ser verilir, sır verilmez\" derler — bu adam tam bunu yaptı: ömrünü verdi, sırrını vermedi. Üç yüz yıl geçti. Maskenin arkasındaki yüz hâlâ onu oraya koyan kraldan güçlü.",
          },
        },
      },
    ],
  },
  updatedAt: { N: "1772155208" },
};

async function pushStory() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("siteId: palace-of-versailles");
    console.log("langStoryId: tr#man-in-iron-mask");
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
}

pushStory();
