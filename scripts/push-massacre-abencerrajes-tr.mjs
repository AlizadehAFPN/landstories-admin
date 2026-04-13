import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: { S: "alhambra" },
  langStoryId: { S: "tr#massacre-of-the-abencerrajes" },
  lang: { S: "tr" },
  storyId: { S: "massacre-of-the-abencerrajes" },
  title: { S: "Abenseraçlar Katliamı" },
  subtitle: { S: "Otuz altı şövalye, dünyanın en güzel tavanının altında ziyafete çağrıldı — mermer havuz hâlâ onların kanını taşıyor" },
  excerpt: { S: "İnsan elinin yonttuğu en güzel tavanın altında otuz altı şövalyeye sofra kuruldu. Birer birer içeri girdiler. Hiçbiri dışarı çıkamadı." },
  paragraphs: { L: [
    { M: { text: { S: "On beşinci yüzyılın sonunda Avrupa'da tek bir Müslüman krallık kalmıştı: Gırnata. İspanya'nın geri kalanı çoktan düşmüştü ama Gırnata hâlâ direniyordu. Ve bu krallığı asıl ayakta tutan bir aile vardı: Abenseraçlar. Kuzey Afrika kökenli bu soylu klan, kimin sultan olacağına, kimin tahttan ineceğine karar verirdi. Gırnata'nın gerçek gücü tahtın üstünde değil, onların elindeydi. Ve birisi bu gücü sonsuza dek kırmak istedi." }}},
    { M: { text: { S: "Rakip klan Zegriler, zehirli ama basit bir yalan uydurdu. Sultana gidip Abenseraç şövalyelerinden birinin sultanın hanımıyla gizli ilişki yaşadığını fısıldadılar. Doğru olup olmadığının hiçbir önemi yoktu. Namusun tahttan bile kutsal sayıldığı bir sarayda böyle bir suçlamanın tek karşılığı vardı: ölüm. Sultan — kıskançlığın ve aşağılanma korkusunun pençesinde — tek gecede bütün aileyi silmeye karar verdi." }}},
    { M: { text: { S: "Otuz altı Abenseraç şövalyesine Elhamra Sarayı'nda ziyafet daveti gönderildi. En güzel kıyafetlerini giyip geldiler — çünkü Gırnata'da sultanın sofrası bir soylu ailenin alabileceği en büyük onurdu. Aslanlar Avlusu'ndan geçtiler; on iki taş aslanın sırtında taşıdığı mermer çeşmenin yanından, cennetin dört ırmağını simgeleyen su kanallarının arasından yürüdüler. Ölüme yürüdüklerinden haberleri yoktu." }}},
    { M: { text: { S: "Şövalyeler teker teker bir salona alındı. Salonun ortasındaki mermer havuzun başında boyunları vuruldu. Su kanı akıtıyordu; içeri giren bir sonraki konuk hiçbir şey görmüyor, hiçbir şeyden şüphelenmiyordu — kılıç boynuna değene kadar. Gırnata'nın en soylu ailesi, sarayın en güzel odasına girdi ve bir daha dışarı çıkamadı. O oda bugün hâlâ onların adını taşıyor: Abenseraçlar Salonu." }}},
    { M: { text: { S: "Öldükleri yerin tam üstünde İslam sanatının en büyük başyapıtlarından biri duruyor: sekiz köşeli bir yıldız biçiminde yükselen beş bin bal peteği oyma, on altı pencereden süzülen ışıkla nefes alır gibi titreyen bir tavan. Cenneti andırsın diye yapılmıştı. Ama hemen altında, mermer havuzda kızılımsı bir leke var — beş yüz yıldır silinmiyor. Bilim insanları demir oksit diyor. Ziyaretçiler başka bir şey anlatıyor: o leke otuz altı şövalyenin kanı, mermere öyle işlemiş ki hiçbir su temizleyemiyor." }}},
    { M: { text: { S: "Sultan, krallığını ayakta tutan aileyi kendi eliyle yok etmişti. Ağaca balta vurmuşlar, sapı bendendir demiş derler ya — Gırnata da kendi dalından yapılmış baltayla devrildi. Abenseraçlar olmadan krallık iç savaşlara gömüldü. Kastilya Kraliçesi İsabella ile Kral Ferdinand tam da bu çöküşü bekliyordu. Eski bir İspanyol şarkısı suçu açıkça söylüyor: 'Abenseraçları öldürdünüz, onlar Gırnata'nın çiçeğiydi.' Bir kuşak geçmeden krallık tarihten silindi." }}},
    { M: { text: { S: "Bugün her yıl milyonlarca insan o salona giriyor. Başlarını kaldırıp insan elinin yonttuğu en ince işçilikli tavana bakıyor. Sonra gözlerini indirip havuzdaki lekeye. Ve Elhamra'yı dünyadaki bütün saraylardan ayıran o duyguyu hissediyor: yukarıda güzellik, aşağıda kan. Bir medeniyetin en yüce eseri, aynı medeniyetin kendini yok ettiği noktanın tam üstünde asılı duruyor." }}}
  ]},
  moralOrLesson: { S: "En zarif güzellikle en kaba vahşet aynı odada var olabilir. Kan mermerden silinir belki, ama hafızadan asla. Kendi soylu ailelerini içeriden yok eden medeniyetler, kendi sonlarının tarihini çoktan yazmıştır." },
  characters: { L: [
    { S: "Abenseraçlar (Beni Serrac) — kaderi mühürlenmiş soylu aile" },
    { S: "Sultan (Ebü'l-Hasan Ali ya da daha önceki bir Nasrî hükümdarı)" },
    { S: "Zegriler — komployu kuran rakip klan" },
    { S: "İsimsiz Abenseraç şövalyesi — sultanın hanımıyla ilişki yaşamakla suçlanan" },
    { S: "Gines Perez de Hita — efsaneyi ölümsüzleştiren vakanüvis" }
  ]},
  coordinates: { M: {
    lng: { N: "-3.5881" },
    lat: { N: "37.1761" }
  }},
  disabled: { BOOL: false },
  era: { S: "y. 1462-1482 (tarihî çatışmalar); efsane Nasrî hanedanının son on yıllarında geçiyor" },
  hasAudio: { BOOL: false },
  icon: { S: "⚔️" },
  image: { S: "" },
  isFree: { BOOL: true },
  readingTimeMinutes: { N: "3" },
  source: { S: "Perez de Hita, Gines. Guerras civiles de Granada (Historia de los bandos de los Zegries y Abencerrajes), 1595-1619; Irving, Washington. Tales of the Alhambra, 1832; Anonymous. El Abencerraje y la hermosa Jarifa, c. 1561-1565 (ed. Antonio de Villegas, Inventario, 1565); Hernando de Baeza. Historia de los Reyes Moros de Granada, early 16th c.; Chateaubriand, Francois-Rene de. Les Aventures du dernier Abencerage, 1826; Ibn Zamrak, epigraphic poems of the Alhambra; Fortuny, Mariano. La matanza de los Abencerrajes, c. 1870 (Museu Nacional d'Art de Catalunya)" },
  storyCategory: { S: "crowns_conquests" },
  thumbnail: { S: "" },
  tier: { S: "S" },
  updatedAt: { N: String(now) }
};

async function push() {
  try {
    // Validate before pushing
    let totalChars = 0;
    let valid = true;
    console.log('\n📋 Pre-push validation:');
    item.paragraphs.L.forEach((p, i) => {
      const text = p.M.text.S;
      const chars = text.length;
      const words = text.split(/\s+/).length;
      totalChars += chars;
      const status = chars > 500 ? '⚠️ OVER 500' : '✓';
      if (chars > 500) valid = false;
      console.log('   P' + (i+1) + ': ' + chars + ' chars, ' + words + ' words ' + status);
    });
    console.log('   Total: ' + totalChars + ' chars (' + item.paragraphs.L.length + ' paragraphs)');
    
    if (!valid) {
      console.log('\n❌ Validation failed — paragraph over 500 chars');
      return;
    }

    // Validate JSON structure
    JSON.stringify(item);
    console.log('   JSON structure: ✓');

    const command = new PutItemCommand({
      TableName: 'Story',
      Item: item
    });
    const result = await client.send(command);
    console.log('\n✅ Turkish story pushed successfully!');
    console.log('   siteId: ' + item.siteId.S);
    console.log('   langStoryId: ' + item.langStoryId.S);
    console.log('   title: ' + item.title.S);
    console.log('   updatedAt: ' + item.updatedAt.N);
    console.log('   HTTP status: ' + result.$metadata.httpStatusCode);
  } catch (err) {
    console.error('\n❌ Push failed:', err.message);
    console.error(err);
  }
}

push();
