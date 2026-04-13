import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });

const item = {
  siteId: { S: 'masada' },
  langStoryId: { S: 'tr#lots-of-the-ten' },
  lang: { S: 'tr' },
  storyId: { S: 'lots-of-the-ten' },
  title: { S: 'Son Gecenin Kurası' },
  subtitle: { S: 'On bir çömlek kırığı, üç iskelet ve bir kadının örgülü saçları — Masada efsanesini hem doğrulayan hem sarsan keşifler' },
  excerpt: { S: 'Üzerinde isimler kazılı on bir çömlek parçası — birinde Masada komutanının adı. Arkeologlar son gecenin kuralarını bulduklarını sandı. Ama gerçek hiç de o kadar basit değildi.' },
  icon: { S: '🔮' },
  tier: { S: 'A' },
  storyCategory: { S: 'riddles_past' },
  paragraphs: { L: [
    { M: { text: { S: '1963\'te Yigael Yadin, yirmi sekiz ülkeden binlerce gönüllüyle Masada\'ya tırmandı. Sıradan bir arkeolog değildi — 1948 savaşında İsrail ordusunun başkomutanlığını yapmıştı. Şimdi kazma küreğe sarılmıştı, çünkü peşinde olduğu şey olağanüstüydü. Milattan sonra 73\'te yaklaşık bin Yahudi isyancı, Roma\'ya boyun eğmektense ölümü seçmişti bu kayalığın tepesinde. Tarihçi Josephus\'a göre son gece on kişi kurayla seçilmiş, gerisini onlar halletmişti. Yadin o kuraları arıyordu.' }}},
    { M: { text: { S: 'Bulduğu şey nefes kesiciydi. Güney kapısı yakınlarında toprağın altından on bir çömlek parçası çıktı — her birinin üzerinde kazınmış bir isim. Birinde \'Ben Ya\'ir\' yazıyordu: halkına \'Köle olacağımıza onurumuzla ölelim\' diyen komutan Eleazar ben Ya\'ir\'in adı. \'O kurayı çeken adamın neler hissettiğini hayal edin\' diye yazdı Yadin. Haber dünyayı sarstı — Yahudi tarihinin en karanlık gecesinin somut kanıtı, iki bin yıl sonra tozun altından çıkmıştı.' }}},
    { M: { text: { S: 'Ama akademik dünya kolay ikna olmadı. Josephus on kişilik bir kuradan bahsediyordu; bulunan parça on birdi. \'Ben Ya\'ir\' o çağda son derece yaygın bir isimdi — bugün bir kazıda \'Mehmet\' yazmış bir parça bulmak ne kanıtlarsa, o kadar. Zaten Masada\'nın dört bir yanından yüzlerce benzer parça çıkmıştı; nöbet listeleri, erzak kayıtları, sıradan gündelik işler. Üstelik Josephus, Kudüs\'ü yerle bir eden Roma imparatorlarının himayesinde yazıyordu. Asil bir toplu intihar, kaotik bir sondan çok daha iyi bir hikâye yapardı.' }}},
    { M: { text: { S: 'Bir de cesetler vardı. Kuzey Sarayı\'nın hamamında üç iskelet bulundu: yirmi yaşlarında bir erkek, on sekiz civarı bir kadın ve bir çocuk. Kadının yanında örgülü saçları duruyordu — iki bin yıl sonra hâlâ sapasağlam, çölün kavurucu kurak havası korumuştu onları. O kadın, öleceğini bilerek saçlarını örmüştü. Yürek burkan bir görüntüydü. Ama tam yanıbaşlarında domuz kemikleri vardı. Yahudiler domuz beslemezdi. Romalılar beslerdi. Peki bu iskeletler kime aitti?' }}},
    { M: { text: { S: 'İsrail bu soruya bilimle değil, siyasetle cevap verdi. 1969\'da yirmi yedi iskelet Masada\'nın eteklerinde tam askeri törenle toprağa verildi — bayraklara sarılı tabutlar, tören kıtası, silah selamı. Arkeolojinin kanıtlayamadığını devlet töreni kesin ilan etti. Yıllar sonra sosyolog Nachman Ben-Yehuda, ders kitaplarının çirkin bir gerçeği sessizce sildiğini gösterdi: dağa sığınmadan önce savunucular, yakındaki bir köyde yedi yüz Yahudi sivili katletmişti. Efsane, gerçekten daha işe yarıyordu.' }}},
    { M: { text: { S: 'Ama kazıda tartışmaların gölgesinde kalan bir keşif de vardı. Yıkıntıların arasından çıkan parşömenlerden biri Hezekiel 37\'ydi — peygamberin kuru kemiklerle dolu bir vadi gördüğü, Tanrı\'nın \'Bu kemikler yaşayabilir mi?\' diye sorduğu bölüm. Ulusal dirilişi anlatan bir metin, tam da bir ulusun son direnişinin sona erdiği yerde. Sabır acıdır, meyvesi tatlıdır derler. Ama iki bin yıl beklemek zorunda kalan bir tohumdan kimse söz etmemişti.' }}},
    { M: { text: { S: '2005\'te bilim insanları, Yadin\'in kazısından çıkan iki bin yıllık bir hurma tohumunu toprağa dikti. Filizlendi. Büyüdü. Adını Metuşelah koydular — Tevrat\'ta en uzun yaşayan insanın adı. Çömlek parçaları belki kura değildi. Kemikler belki savunuculara ait değildi. Konuşmalar belki hiç yapılmadı. Ama parşömenler gerçekti — gerçek insanlar, gerçek bir havrada, gerçek bir dağın tepesinde okumuştu onları. Ve o tohum gerçekti — iki bin yıl molozun altında, birinin gelip su vermesini beklemiş. Bu kemikler yaşayabilir mi? Masada\'da tohumlar bile evet diyor.' }}}
  ]},
  moralOrLesson: { S: 'Geçmişi keşfetmekle onu yeniden kurmak arasındaki çizgi, sandığımızdan çok daha ince. Toprağın altından bir eser çıkaran her arkeolog, o eserin hangi hikâyeyi anlatacağına dair bir seçim yapar — ve en çok gerçek olmasını istediğimiz hikâyeler, en dikkatli sorgulamamız gerekenlerdir. Örgülü saçlar, isim kazınmış çömlek parçaları, dağınık kemikler: hepsi gerçek. Ne anlama geldiklerine biz karar veriyoruz.' },
  characters: { L: [
    { S: 'Yigael Yadin — arkeolog, eski İsrail Genelkurmay Başkanı, Masada\'nın kazıcısı' },
    { S: 'Örgülü saçlı kadın — Kuzey Sarayı\'nda kalıntıları bulunan, kimliği bilinmeyen 17-18 yaşlarında bir genç kadın' },
    { S: 'Nachman Ben-Yehuda — Masada mitini sorgulayan İbrani Üniversitesi sosyoloğu' },
    { S: 'Joe Zias — kemiklerin kimliğini sorgulayan fiziksel antropolog' },
    { S: 'Sarah Sallon — Masada\'dan çıkan 2.000 yıllık tohumu filizlendiren bilim insanı' }
  ]},
  source: { S: "Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; Cohen, Shaye J.D. 'Masada: Literary Tradition, Archaeological Remains, and the Credibility of Josephus,' Journal of Jewish Studies 33, 1982; Ben-Yehuda, Nachman. The Masada Myth: Collective Memory and Mythmaking in Israel, University of Wisconsin Press, 1995; Ben-Yehuda, Nachman. Sacrificing Truth: Archaeology and the Myth of Masada, Humanity Books, 2002; Zias, Joe. 'Human Skeletal Remains from the Southern Cave at Masada,' in The Dead Sea Scrolls Fifty Years After Their Discovery, 2000; Sallon et al. 'Germination, Genetics, and Growth of an Ancient Date Seed,' Science 320, 2008" },
  era: { S: "1963-1965 (Yadin's excavation); 1969 (state funeral); 1982-2019 (scholarly debate)" },
  readingTimeMinutes: { N: '3' },
  image: { S: '' },
  updatedAt: { N: '1772151500' },
  disabled: { BOOL: false },
  thumbnail: { S: '' },
  coordinates: { M: { lng: { N: '35.3536' }, lat: { N: '31.3156' } } },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true }
};

async function push() {
  try {
    await client.send(new PutItemCommand({
      TableName: 'Story',
      Item: item
    }));
    console.log('✓ SUCCESS: Turkish story pushed to DynamoDB');
    console.log('  siteId:', item.siteId.S);
    console.log('  langStoryId:', item.langStoryId.S);
    console.log('  title:', item.title.S);
  } catch (err) {
    console.error('✗ FAILED:', err.message);
    process.exit(1);
  }
}

push();
