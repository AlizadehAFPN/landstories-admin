import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "notre-dame-de-paris",
  storyId: "crown-of-thorns-rescue",
  icon: "\u{1F451}",
  tier: "A",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 2.35, lat: 48.853 },
  hasAudio: false,
  isFree: true,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — إكليل الشَّوك في قلب النار
//  Proverb subverted: «الثالثة ثابتة» (The third time is definitive)
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#crown-of-thorns-rescue",
  title: "إكليل الشَّوك في قلب النار",
  subtitle: "سلسلة بشريّة من رجال الإطفاء أنقذت أقدس أثر مسيحيّ من جحيم نوتردام",
  excerpt: "في مساء الخامس عشر من أبريل ٢٠١٩، بدأ الدخان يتصاعد من سقف كاتدرائية نوتردام في باريس. لكنّ ما كان يحدث داخل المبنى المشتعل كان أخطر بكثير ممّا يراه أحد من الخارج.",
  moralOrLesson: "بعض الأشياء لا تنجو بالحظّ، بل لأنّ في كلّ جيل مَن يُقرِّر أنّها تستحقّ أن يدخل من أجلها في النار.",
  source: "تقارير فرقة إطفاء باريس؛ مقابلات الأب جان-مارك فورنييه؛ سجلّات تاريخية عن إكليل الشوك",
  characters: [
    "الأب جان-مارك فورنييه",
    "رجال إطفاء باريس",
    "الملك لويس التاسع (تاريخي)",
    "المسيح (لاهوتي)",
  ],
  era: "١٥ أبريل ٢٠١٩ (يعود الأثر إلى القرن الأول الميلادي)",
  paragraphs: [
    {
      text: "مساء الخامس عشر من أبريل ٢٠١٩. دخانٌ يتصاعد من سقف كاتدرائية نوتردام في باريس. خلال ساعة واحدة، تحوَّل هيكلُها الخشبيّ — الذي بناه حِرَفيّون قبل ثمانمئة وخمسين سنة واحتاج غابةً بأكملها حتّى سمَّوه «الغابة» — إلى جدار من نار. البرج الشهير انهار على الهواء أمام ملايين المشاهدين. لكنّ ما كان يحدث في الداخل كان أخطر بكثير.",
    },
    {
      text: "في أعماق الكاتدرائية، كان الأب جان-مارك فورنييه — قسّيس فرقة إطفاء باريس — يقود فريقاً من رجال الإطفاء في مهمّة إنقاذ. ليس لأشخاص. بل لشيء ظلّ في عهدة البشر منذ ألفَي سنة تقريباً: إكليل الشَّوك، الأثر الذي يؤمن المسيحيّون أنّه وُضِعَ على رأس المسيح قبل صَلبه. كان محبوساً في خزنة الكاتدرائية، والنار تقترب.",
    },
    {
      text: "لإكليل الشوك قصّة لا تُصدَّق. في عام ١٢٣٩، اشتراه الملك لويس التاسع — وكان متديّناً لدرجة أنّ الكنيسة أعلنته قدّيساً لاحقاً — من حاكم القسطنطينية المُفلِس. الثمن؟ أكثر من نصف إيراد فرنسا السنوي بأكمله. ثمّ بنى لويس كنيسة سانت شابيل، من أجمل كنائس باريس، لغرض واحد: أن يحتضن هذا الإكليل. وحين وصل، خلع الملك حذاءه ومشى حافياً في الشوارع لاستقباله.",
    },
    {
      text: "نعود إلى الكاتدرائية المشتعلة. الإكليل كان خلف أقفال إلكترونية في الخزنة. الأب فورنييه ورجال الإطفاء شقّوا طريقهم عبر ممرّات يخنقها الدخان حتّى وصلوا. لكنّ الحرارة أعطبت الأقفال. أحد رجال الإطفاء حطَّمها بالقوّة. وفي الداخل وجدوه: حلقة من القَصَب المجدول بخيوط ذهبيّة، داخل عُلبة كريستال، تبدو هشّة بشكل لا يُصدَّق وسط كلّ هذا الجنون.",
    },
    {
      text: "لا وقت للحذر. حُطام مشتعل يتساقط من فوق. فشكَّلوا سلسلة بشريّة ومرَّروا العلبة يداً بيد — عبر الدخان، تحت الجَمر المتطاير، في ممرّات لوَّنتها النار بالبرتقالي — حتّى خرجت إلى هواء ليل باريس. لحظة خروج الإكليل سالماً، سقط الأب فورنييه على ركبتيه. ورجال إطفاء اعتادوا الركض نحو الخطر كلّ يوم… انهاروا وبكَوا.",
    },
    {
      text: "يقولون «الثالثة ثابتة». لكنّ هذا الإكليل تجاوز الثالثة بمراحل. نجا من سقوط روما. نجا من نهب القسطنطينية عام ١٢٠٤ حين هاجم الصليبيّون مدينة مسيحية بدل أن يُكمِلوا طريقهم إلى القدس. نجا من الثورة الفرنسية عام ١٧٨٩ حين كان الثُّوّار يحطّمون كلّ رمز ديني — أخفاه كاهن في اللحظة الأخيرة. نجا من حربين عالميتين. وفي ٢٠١٩، نجا من نوتردام.",
    },
    {
      text: "بعض الناس يسمّي هذا حظّاً. بعضهم يسمّيه صدفة. لكنّ هناك نمطاً يصعب تجاهله: في كلّ كارثة، قرَّر شخص ما أنّ هذه الحلقة الصغيرة الهشّة من الشوك تستحقّ المخاطرة بكلّ شيء. الأب فورنييه دخل كاتدرائية تحترق من أجلها. كاهن خاطر بالمِقصَلة في الثورة. ملك أنفق نصف ثروة مملكته. مهما كان ما تؤمن به، إكليل الشوك لا يزال باقياً — لأنّ هناك دائماً مَن يختار إنقاذه.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN — تاج خار در دلِ آتش
//  Proverb subverted: «تا سه نشه، بازی نشه» (It's not serious until the third time)
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#crown-of-thorns-rescue",
  title: "تاج خار در دلِ آتش",
  subtitle: "زنجیر انسانیِ آتش‌نشانانی که مقدس‌ترین یادگار مسیحیت را از جهنمِ نوتردام نجات دادند",
  excerpt: "غروبِ پانزدهمِ آوریل ۲۰۱۹، دود از سقفِ کلیسای نوتردامِ پاریس بالا رفت. اما داخلِ ساختمانِ شعله‌ور، ماجرایی بسیار حیاتی‌تر از آنچه بیرون دیده می‌شد در حال رقم خوردن بود.",
  moralOrLesson: "بعضی چیزها با شانس نمی‌مانند. در هر نسلی کسی هست که تصمیم می‌گیرد ارزشِ رفتن توی آتش را دارند.",
  source: "گزارش‌های واحد آتش‌نشانی پاریس؛ مصاحبه‌های کشیش ژان-مارک فورنیه؛ اسناد تاریخی تاج خار",
  characters: [
    "کشیش ژان-مارک فورنیه",
    "آتش‌نشانان پاریس",
    "لویی نهم (تاریخی)",
    "مسیح (الهیاتی)",
  ],
  era: "۱۵ آوریل ۲۰۱۹ (قدمت یادگار به قرن اول میلادی بازمی‌گردد)",
  paragraphs: [
    {
      text: "غروبِ پانزدهمِ آوریل ۲۰۱۹. دود از سقفِ کلیسای نوتردامِ پاریس بالا می‌رود. ظرفِ یک ساعت، سازه‌ی چوبی‌اش — که هشتصد و پنجاه سال پیش ساخته بودندش و بهش می‌گفتند «جنگل» چون یک جنگلِ کامل درخت خرجش شده بود — تبدیل به دیواری از آتش شد. برجِ معروفِ کلیسا جلوِ دوربین‌ها فرو ریخت و میلیون‌ها نفر با چشمِ گریان تماشا کردند. ولی داخلِ ساختمانِ شعله‌ور، داستانی خیلی مهم‌تر داشت رقم می‌خورد.",
    },
    {
      text: "در اعماقِ کلیسا، کشیش ژان-مارک فورنیه — روحانیِ واحدِ آتش‌نشانیِ پاریس — داشت گروهی از آتش‌نشان‌ها را در یک مأموریتِ نجات رهبری می‌کرد. نه نجاتِ انسان. نجاتِ چیزی که نزدیکِ دو هزار سال بود دست‌به‌دست انسان‌ها رسیده بود: تاجِ خار، یادگاری که مسیحیان باور دارند پیش از مصلوب شدنِ عیسی بر سرش گذاشتند. تاج در گاوصندوقِ کلیسا قفل بود و آتش داشت نزدیک می‌شد.",
    },
    {
      text: "خودِ تاجِ خار داستانی باورنکردنی دارد. سالِ ۱۲۳۹، لویی نهم — پادشاهِ فرانسه که آن‌قدر مؤمن بود که بعدها کلیسا قدیسش اعلام کرد — آن را از فرمانروایِ ورشکسته‌ی قسطنطنیه خرید. قیمتش؟ بیشتر از نصفِ درآمدِ سالانه‌ی کلِّ فرانسه. بعد لویی کلیسای سنت‌شاپل را ساخت — یکی از زیباترین کلیساهای پاریس — فقط برای نگهداریِ همین یک تاج. و وقتی تاج به پاریس رسید، پادشاه کفش‌هایش را درآورد و پابرهنه در خیابان‌ها راه افتاد تا استقبالش کند.",
    },
    {
      text: "برگردیم به کلیسایِ در حالِ سوختن. تاج پشتِ قفل‌های الکترونیکیِ گاوصندوق بود. کشیش فورنیه و آتش‌نشان‌ها از راهروهای پُر از دود رد شدند تا رسیدند. اما گرما مدارِ قفل‌ها را سوزانده بود. یکی از آتش‌نشان‌ها با زور قفل را شکست. و آنجا، داخلِ محفظه‌ی بلوری، پیدایش کردند: حلقه‌ای از نیِ بافته‌شده با نخِ طلا، آن‌قدر شکننده که باورت نمی‌شد وسطِ این همه آشوب سالم مانده.",
    },
    {
      text: "وقتِ ظرافت نبود. تکه‌های شعله‌ور از سقف می‌ریخت. پس زنجیرِ انسانی تشکیل دادند و محفظه‌ی بلوری را دست‌به‌دست بردند — از میانِ دود، زیرِ پاره‌آتش‌های در حالِ ریزش، در راهروهایی که آتش نارنجی‌شان کرده بود — تا بالاخره به هوای آزادِ شبِ پاریس رسید. لحظه‌ای که تاجِ خار سالم بیرون آمد، کشیش فورنیه روی زانوهایش افتاد. و آتش‌نشان‌هایی که عمری به سمتِ خطر دویده بودند… زدند زیرِ گریه.",
    },
    {
      text: "می‌گویند تا سه نشه، بازی نشه. ولی این تاج از سه خیلی وقت پیش رد شده. از سقوطِ رُم جان سالم به در برد. از غارتِ قسطنطنیه در ۱۲۰۴ — وقتی صلیبیون به‌جای رفتن به بیت‌المقدس، شهرِ مسیحیِ هم‌کیشِ خودشان را چاپیدند — جان سالم به در برد. از انقلابِ فرانسه در ۱۷۸۹ جان سالم به در برد، وقتی اوباش هر نمادِ مذهبی را نابود می‌کردند و یک کشیش سرِ لحظه پنهانش کرد. از دو جنگِ جهانی جان سالم به در برد. و در ۲۰۱۹، از نوتردام.",
    },
    {
      text: "بعضی‌ها اسمش را شانس می‌گذارند. بعضی‌ها می‌گویند تصادف. اما یک الگو هست که نمی‌شود نادیده‌اش گرفت: در هر فاجعه، یک نفر تصمیم گرفته که این حلقه‌ی کوچکِ شکننده‌ی خار ارزشِ همه‌چیز را دارد. کشیش فورنیه برایش وارد کلیسایِ در حالِ سوختن شد. یک روحانی در انقلابِ فرانسه سرِ گیوتین را به جان خرید. یک پادشاه نصفِ ثروتِ مملکتش را خرجش کرد. هرچه باور داشته باشید، تاجِ خار سرِ جایش مانده — چون همیشه کسی هست که نجاتش دادن را انتخاب کند.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Alevler İçinde Dikenli Taç
//  Proverb subverted: «Sabrın sonu selamettir» (Patience leads to salvation)
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#crown-of-thorns-rescue",
  title: "Alevler \u0130çinde Dikenli Taç",
  subtitle: "H\u0131ristiyanl\u0131\u011F\u0131n en kutsal emanetini Notre-Dame yang\u0131n\u0131ndan kurtaran insan zinciri",
  excerpt: "15 Nisan 2019 akşamı, Paris'teki Notre-Dame Katedrali'nin çatısından dumanlar yükselmeye başladı. Ama yanan binanın içinde, dışarıdan kimsenin göremediği çok daha kritik bir şey yaşanıyordu.",
  moralOrLesson: "Bazı şeyler şansla ayakta kalmaz; her çağda biri, onlar için ateşe yürümeye değer olduğuna karar verir.",
  source: "Paris İtfaiyesi raporları; Peder Jean-Marc Fournier röportajları; Dikenli Taç'ın tarihi kayıtları",
  characters: [
    "Peder Jean-Marc Fournier",
    "Paris itfaiyecileri",
    "Kral IX. Louis (tarihi)",
    "Hz. İsa (teolojik)",
  ],
  era: "15 Nisan 2019 (emanet M.S. 1. yüzyıla tarihlenir)",
  paragraphs: [
    {
      text: "15 Nisan 2019 akşamı. Paris'teki Notre-Dame Katedrali'nin çatısından dumanlar yükselmeye başlıyor. Bir saat içinde, sekiz yüz elli yıl önce ortaçağ ustaları tarafından inşa edilen ahşap iskelet — yapımında koca bir orman harcandığı için ona \"Orman\" denirdi — bir ateş duvarına dönmüştü. Katedralin simgesi olan kule canlı yayında milyonlarca insanın gözü önünde çöktü. Ama yanan binanın içinde, dışarıdan kimsenin göremediği çok daha kritik bir şey yaşanıyordu.",
    },
    {
      text: "Katedralin derinliklerinde, Peder Jean-Marc Fournier — Paris İtfaiyesi'nin papazı — bir grup itfaiyeciyi kurtarma görevine yönlendiriyordu. İnsan kurtarmak için değil. Yaklaşık iki bin yıldır kesintisiz olarak insanların koruması altında olan bir şeyi kurtarmak için: Dikenli Taç. Hristiyanların, İsa'nın çarmıha gerilmeden önce başına konulduğuna inandığı kutsal emanet. Katedralin hazine kasasında kilitliydi ve alevler yaklaşıyordu.",
    },
    {
      text: "Dikenli Taç'ın kendisi başlı başına inanılmaz bir hikâye. 1239'da Fransa Kralı IX. Louis — o kadar dindar biriydi ki kilise onu sonradan aziz ilan etti — bu tacı Konstantinopolis'te hüküm süren ve paraya sıkışmış Doğu Roma hükümdarından satın aldı. Fiyatı mı? Fransa'nın toplam yıllık gelirinin yarısından fazla. Sonra Louis, Paris'in en göz alıcı kiliselerinden biri olan Sainte-Chapelle'i yalnızca bu tek emaneti barındırmak için yaptırdı. Taç Paris'e ulaştığında kral ayakkabılarını çıkardı ve onu karşılamak için sokaklarda yalınayak yürüdü.",
    },
    {
      text: "Yanan katedrale dönelim. Taç, elektronik kilitlerle korunan kasanın içindeydi. Peder Fournier ve itfaiyeciler duman dolu koridorlardan geçerek kasaya ulaştılar. Ama ısı kilitlerin devresini çoktan yakmıştı. İtfaiyecilerden biri kilidi zorla kırdı. İçeride, kristal muhafazasının içinde buldular onu: altın iplikle bir arada tutulan örülmüş sazdan bir halka. Etraftaki kaosu düşününce inanılmaz derecede kırılgan görünüyordu.",
    },
    {
      text: "Dikkatli taşımaya vakit yoktu. Yukarıdan yanan enkaz parçaları düşüyordu. Bir insan zinciri oluşturdular ve kristal muhafazayı elden ele taşıdılar — dumanın içinden, dökülen korların altından, ateşin turuncu aydınlattığı koridorlardan geçerek — ta ki Paris gecesinin açık havasına çıkana dek. Dikenli Taç sağ salim dışarı çıktığında Peder Fournier dizlerinin üzerine çöktü. Ve tehlikeye koşmayı meslek edinmiş o sert itfaiyeciler… gözyaşlarına boğuldular.",
    },
    {
      text: "Derler ki \"sabrın sonu selamettir.\" Bu taç, o sözün canlı kanıtı gibi — tek farkla: selamet hep geliyor ama felaketler bir türlü bitmiyor. Roma'nın çöküşünden sağ çıktı. 1204'te Haçlıların Kudüs yerine Hristiyan şehir Konstantinopolis'i yağmalamasından sağ çıktı. 1789 Fransız Devrimi'nden sağ çıktı — ayaklanmacılar her dini sembolü parçalarken bir rahip son anda sakladı. İki dünya savaşından sağ çıktı. Ve 2019'da Notre-Dame'dan.",
    },
    {
      text: "Kimileri buna şans der. Kimileri tesadüf. Ama görmezden gelinemeyecek bir örüntü var: her felakette birisi, bu küçük ve kırılgan diken halkasının her şeye değdiğine karar vermiş. Peder Fournier onun için yanan bir katedrale girdi. Fransız Devrimi'nde bir rahip onun için giyotini göze aldı. Bir kral onun için krallığının servetinin yarısını harcadı. Ne inanırsanız inanın, Dikenli Taç ayakta kalmaya devam ediyor — çünkü her seferinde onu kurtarmayı seçen biri çıkıyor.",
    },
  ],
};

// ─── Push each language ───
async function pushStory(item, label) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Validate
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`${label}: Missing required fields`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(`${label}: Paragraph count ${item.paragraphs.length} out of range`);
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    const t = item.paragraphs[i].text;
    if (!t || t.length === 0) {
      throw new Error(`${label}: Paragraph ${i} is empty`);
    }
    if (t.length > 600) {
      console.warn(`  ⚠ Paragraph ${i} is ${t.length} chars (target <500)`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  totalChars:  ${totalChars}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  ❌ ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  ❌ ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("Crown of Thorns — ar / fa / tr push");
  console.log(`Timestamp: ${now}`);
  console.log("═══════════════════════════════════════════════");

  await pushStory(ar, "ARABIC");
  await pushStory(fa, "PERSIAN");
  await pushStory(tr, "TURKISH");

  console.log("\n✅ All three languages pushed successfully.");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});
