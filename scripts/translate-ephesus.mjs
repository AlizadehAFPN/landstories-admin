/**
 * Push Ephesus Ancient City site record to 10 languages in DynamoDB.
 * Each language is a CULTURAL RECREATION — not a translation.
 *
 * Usage: node scripts/translate-ephesus.mjs [--dry-run]
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Load .env.local for AWS credentials
const envFile = readFileSync(
  new URL("../.env.local", import.meta.url),
  "utf-8"
);
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const DRY_RUN = process.argv.includes("--dry-run");
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_SITES || "Landstories";
const now = Math.floor(Date.now() / 1000);

const base = {
  PK: "SITE#ephesus",
  category: "ancient_ruins",
  cityId: "izmir",
  constructionYear:
    "10th century BC (Greek settlement), major development 6th century BC–6th century AD",
  countryId: "TR",
  "GSI1-PK": "CAT#ancient_ruins",
  "GSI1-SK": now,
  lat: 37.9392,
  lng: 27.3419,
  siteId: "ephesus",
  thumbnail:
    "https://landstories-images.s3.eu-north-1.amazonaws.com/images/sites/ephesus/1771155181962.webp",
  unesco: true,
  updatedAt: now,
};

/* ═══════════════════════════════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════════════════════════════ */

const translations = {
  // ─────────────────────────── SPANISH ───────────────────────────
  es: {
    lang: "es",
    SK: "LANG#es",
    "GSI2-PK": "LANG#es",
    "GSI2-SK": now,
    title: "Ciudad Antigua de Éfeso",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "Patrimonio de la Humanidad — la ciudad grecorromana más completa del Mediterráneo, sede del Templo de Artemisa (una de las Siete Maravillas), la Biblioteca de Celso y la Casa de la Virgen María.",
    builder:
      "Colonos griegos jonios, ampliada por el rey lidio Creso y los emperadores romanos",
    historicalPeriod: "Multiperiodo (Arcaico–Bizantino)",
    constructionYear:
      "Siglo X a.C. (asentamiento griego), desarrollo principal del siglo VI a.C. al VI d.C.",
    description:
      "La historia de Éfeso abarca tres milenios de civilización humana. Fundada por colonos griegos jonios alrededor del siglo X a.C., creció hasta convertirse en una de las ciudades más importantes del mundo antiguo. El Templo de Artemisa, erigido aquí, fue una de las Siete Maravillas del Mundo Antiguo — cuatro veces más grande que el Partenón de Atenas.\n\nÉfeso fue una ciudad de primicias: acogió una de las primeras comunidades cristianas establecidas por San Pablo, se convirtió en el hogar de la Virgen María en sus últimos años, albergó la legendaria Biblioteca de Celso (la tercera mayor biblioteca del mundo antiguo) y contaba con el mayor teatro de Anatolia con 25.000 asientos.\n\nLa ciudad desempeñó un papel crucial en el cristianismo primitivo. San Pablo pasó tres años aquí y escribió su célebre «Carta a los Efesios». El Evangelio de Juan pudo haber sido escrito aquí. El Tercer Concilio Ecuménico se celebró en Éfeso en el año 431 d.C., donde María fue declarada «Theotokos» (Madre de Dios).\n\nCaminar por Éfeso es caminar entre capas de historia humana: templos griegos, calles romanas, iglesias bizantinas y las leyendas de dioses, filósofos y santos que dieron forma a la civilización occidental.",
    historicalSignificance:
      "Éfeso representa la cumbre de la civilización urbana antigua. En su apogeo, fue la segunda ciudad más grande del Imperio romano después de la propia Roma. La ciudad era la capital comercial y cultural de Asia Menor, sirviendo como punto final de la Ruta de la Seda y puerta de enlace entre Oriente y Occidente.\n\nEl Templo de Artemisa convirtió a Éfeso en destino de peregrinación durante siglos. La diosa Artemisa de Éfeso era única: no la virgen cazadora de la mitología griega, sino una diosa de la fertilidad con múltiples senos que reflejaba las tradiciones anatolias de la diosa madre. La destrucción y reconstrucción del templo se convirtió en una de las historias más famosas de la Antigüedad.\n\nLa historia cristiana cala hondo aquí. San Juan trajo a la Virgen María a Éfeso tras la Crucifixión. La predicación de San Pablo provocó un célebre motín cuando los plateros que fabricaban estatuillas de Artemisa temieron por su sustento. La ciudad se convirtió en una de las Siete Iglesias de Asia mencionadas en el Libro del Apocalipsis.\n\nArqueólogos austriacos han excavado Éfeso desde 1863, desenterrando menos del 20 % de la ciudad antigua. Cada año trae nuevos hallazgos, y el yacimiento sigue revelando secretos del mundo antiguo.",
    funFacts: [
      "La Biblioteca de Celso tenía un túnel subterráneo que la conectaba con el burdel de enfrente — ¡un escándalo antiguo!",
      "El teatro podía acoger a 25.000 espectadores — más que la mayoría de los recintos de conciertos modernos",
      "Éfeso cambió de ubicación TRES veces a lo largo de su historia debido al aterramiento del puerto",
      "La palabra «efímero» podría derivar de Éfeso — las cosas cambiaban como la ciudad que se desplazaba",
      "Los arqueólogos austriacos solo han desenterrado entre el 15 y el 20 % de la ciudad antigua",
      "Las Casas Aterrazadas revelan antiguos sistemas de calefacción por suelo radiante y mosaicos",
      "Se cree que Cleopatra visitó Éfeso junto a Marco Antonio",
      "La ciudad tenía letrinas públicas con agua corriente y un curioso orden social para sentarse",
    ],
    timeline: [
      "Siglo X a.C. - Los griegos jonios establecen el asentamiento",
      "Siglo VII a.C. - Los lidios conquistan Éfeso",
      "560 a.C. - El rey Creso financia el Templo de Artemisa",
      "356 a.C. - Heróstrato incendia el Templo de Artemisa la noche del nacimiento de Alejandro Magno",
      "334 a.C. - Alejandro Magno libera Éfeso del dominio persa",
      "129 a.C. - Se convierte en capital de la provincia romana de Asia",
      "53-57 d.C. - San Pablo reside en Éfeso durante tres años",
      "262 d.C. - Los godos destruyen el Templo de Artemisa",
      "431 d.C. - Se celebra aquí el Tercer Concilio Ecuménico (María declarada Theotokos)",
      "614 d.C. - La invasión persa causa una destrucción masiva",
      "1863 - Comienzan las excavaciones arqueológicas austriacas",
      "2015 - Designado Patrimonio de la Humanidad por la UNESCO",
    ],
    tags: [
      "éfeso",
      "efes",
      "ciudad-antigua",
      "unesco",
      "siete-maravillas",
      "artemisa",
      "biblioteca-celso",
      "romano",
      "griego",
      "cristiano",
      "virgen-maría",
      "siete-durmientes",
      "san-pablo",
      "izmir",
      "selçuk",
    ],
  },

  // ─────────────────────────── CHINESE ───────────────────────────
  zh: {
    lang: "zh",
    SK: "LANG#zh",
    "GSI2-PK": "LANG#zh",
    "GSI2-SK": now,
    title: "以弗所古城",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "联合国教科文组织世界遗产——地中海沿岸保存最完整的希腊罗马古城，拥有阿尔忒弥斯神殿（世界七大奇迹之一）、塞尔苏斯图书馆和圣母玛利亚故居。",
    builder: "爱奥尼亚希腊殖民者建城，吕底亚国王克洛伊索斯和罗马皇帝扩建",
    historicalPeriod: "跨时代（古风时期至拜占庭时期）",
    constructionYear:
      "公元前10世纪（希腊人定居），公元前6世纪至公元6世纪为主要发展期",
    description:
      "以弗所的历史横跨三千年。公元前10世纪左右由爱奥尼亚希腊殖民者建立，逐渐发展成为古代世界最重要的城市之一。在此修建的阿尔忒弥斯神殿是古代世界七大奇迹之一，规模为雅典帕特农神殿的四倍。\n\n以弗所是一座创造了众多「第一」的城市：它拥有由使徒保罗建立的最早基督教社区之一；圣母玛利亚在此度过晚年；这里坐落着传奇的塞尔苏斯图书馆——古代世界第三大图书馆；城中的大剧场可容纳25,000名观众，是安纳托利亚规模最大的古代剧场。\n\n这座城市在早期基督教历史上扮演了举足轻重的角色。使徒保罗在此居住三年，写下了著名的《以弗所书》。《约翰福音》可能就是在此处写成。公元431年，第三次大公会议在以弗所召开，玛利亚被宣告为「天主之母」（Theotokos）。\n\n漫步以弗所，便是穿行于人类文明的层层叠叠之中：希腊神庙、罗马街道、拜占庭教堂，以及那些塑造了西方文明的神祇、哲人和圣徒的传说。",
    historicalSignificance:
      "以弗所代表了古代城市文明的巅峰。鼎盛时期，它是仅次于罗马的罗马帝国第二大城市。这座城市是小亚细亚的商业和文化之都，是丝绸之路的终点站，也是连接东西方的门户。\n\n阿尔忒弥斯神殿使以弗所成为延续数百年的朝圣目的地。以弗所的阿尔忒弥斯女神独具特色——她并非希腊神话中的处女猎神，而是一位多乳房的丰饶女神，体现了安纳托利亚的母神崇拜传统。神殿的毁灭与重建成为古代世界最著名的故事之一。\n\n基督教历史在这里根基深厚。耶稣受难后，使徒约翰将圣母玛利亚带到以弗所。使徒保罗的布道曾引发一场著名的骚乱——制作阿尔忒弥斯银像的工匠们担忧生计受到威胁。以弗所成为《启示录》中所述亚西亚七教会之一。\n\n自1863年以来，奥地利考古学家持续在以弗所进行发掘，但迄今发掘面积不足古城总面积的20%。每一年都有新的发现，这座遗址仍在不断揭示古代世界的秘密。",
    funFacts: [
      "塞尔苏斯图书馆有一条通往对面妓院的地下暗道——古代的秘闻趣事！",
      "大剧场可容纳25,000人——超过当今大多数演唱会场馆",
      "以弗所在历史上曾因港口淤塞而三次迁址",
      "英语中的「ephemeral」（短暂的）一词可能源自以弗所——如同这座不断变迁的城市",
      "奥地利考古学家至今仅发掘了古城的15-20%",
      "阶梯别墅区展示了古代的地暖系统和精美的马赛克",
      "据信埃及艳后克里奥帕特拉曾与马克·安东尼一同到访以弗所",
      "古城拥有带自来水系统的公共厕所，并有独特的社交座位安排",
    ],
    timeline: [
      "公元前10世纪 - 爱奥尼亚希腊人建立定居点",
      "公元前7世纪 - 吕底亚人征服以弗所",
      "公元前560年 - 克洛伊索斯国王出资修建阿尔忒弥斯神殿",
      "公元前356年 - 赫洛斯特拉图斯在亚历山大大帝出生之夜纵火焚毁阿尔忒弥斯神殿",
      "公元前334年 - 亚历山大大帝将以弗所从波斯统治下解放",
      "公元前129年 - 成为罗马亚细亚行省的首府",
      "公元53-57年 - 使徒保罗在以弗所居住三年",
      "公元262年 - 哥特人摧毁阿尔忒弥斯神殿",
      "公元431年 - 第三次大公会议在此召开（玛利亚被尊为天主之母）",
      "公元614年 - 波斯入侵造成大规模破坏",
      "1863年 - 奥地利考古发掘工作启动",
      "2015年 - 被列入联合国教科文组织世界遗产名录",
    ],
    tags: [
      "以弗所",
      "efes",
      "古城",
      "世界遗产",
      "七大奇迹",
      "阿尔忒弥斯",
      "塞尔苏斯图书馆",
      "罗马",
      "希腊",
      "基督教",
      "圣母玛利亚",
      "七眠者",
      "使徒保罗",
      "伊兹密尔",
      "塞尔丘克",
    ],
  },

  // ─────────────────────────── FRENCH ───────────────────────────
  fr: {
    lang: "fr",
    SK: "LANG#fr",
    "GSI2-PK": "LANG#fr",
    "GSI2-SK": now,
    title: "Éphèse, cité antique",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "Patrimoine mondial de l'UNESCO — la cité gréco-romaine la plus complète de Méditerranée, abritant le Temple d'Artémis (l'une des Sept Merveilles), la Bibliothèque de Celsus et la Maison de la Vierge Marie.",
    builder:
      "Colons grecs ioniens, agrandie par le roi lydien Crésus et les empereurs romains",
    historicalPeriod: "Multi-époques (Archaïque–Byzantin)",
    constructionYear:
      "Xe siècle av. J.-C. (implantation grecque), développement majeur du VIe siècle av. J.-C. au VIe siècle apr. J.-C.",
    description:
      "L'histoire d'Éphèse s'étend sur trois millénaires. Fondée par des colons grecs ioniens aux alentours du Xe siècle avant notre ère, Éphèse s'est hissée au rang des cités les plus illustres du monde antique. Le Temple d'Artémis, édifié ici, comptait parmi les Sept Merveilles du monde — quatre fois plus vaste que le Parthénon d'Athènes.\n\nÉphèse fut une cité pionnière : elle accueillit l'une des toutes premières communautés chrétiennes fondées par saint Paul, devint la dernière demeure de la Vierge Marie, abrita la légendaire Bibliothèque de Celsus — troisième plus grande bibliothèque du monde antique — et possédait le plus grand théâtre d'Anatolie, fort de 25 000 places.\n\nLa cité joua un rôle déterminant dans le christianisme naissant. Saint Paul y séjourna trois ans et y rédigea sa célèbre « Épître aux Éphésiens ». L'Évangile selon Jean pourrait y avoir été composé. Le Troisième Concile œcuménique s'y tint en 431 apr. J.-C., proclamant Marie « Theotokos » (Mère de Dieu).\n\nDéambuler dans Éphèse, c'est traverser les strates de l'histoire humaine : temples grecs, rues romaines, églises byzantines, et les légendes des dieux, philosophes et saints qui ont façonné la civilisation occidentale.",
    historicalSignificance:
      "Éphèse incarne l'apogée de la civilisation urbaine antique. À son zénith, elle était la deuxième ville de l'Empire romain après Rome elle-même. Capitale commerciale et culturelle de l'Asie Mineure, elle marquait le terminus de la Route de la soie et la porte entre Orient et Occident.\n\nLe Temple d'Artémis fit d'Éphèse un lieu de pèlerinage durant des siècles. L'Artémis d'Éphèse était une déesse singulière : non pas la chasseresse vierge de la mythologie grecque, mais une divinité de la fécondité aux multiples seins, héritière des traditions anatoliennes de la Déesse Mère. La destruction et la reconstruction du temple sont devenues l'un des récits les plus célèbres de l'Antiquité.\n\nL'histoire chrétienne y est profondément enracinée. Saint Jean amena la Vierge Marie à Éphèse après la Crucifixion. La prédication de saint Paul y déclencha une émeute fameuse lorsque les orfèvres fabriquant des statuettes d'Artémis craignirent pour leur gagne-pain. La cité devint l'une des Sept Églises d'Asie mentionnées dans le Livre de l'Apocalypse.\n\nDes archéologues autrichiens fouillent Éphèse depuis 1863, n'en ayant exhumé que moins de 20 %. Chaque année apporte son lot de découvertes, et le site continue de livrer les secrets du monde antique.",
    funFacts: [
      "La Bibliothèque de Celsus possédait un tunnel souterrain menant au lupanar d'en face — un scandale antique !",
      "Le théâtre pouvait accueillir 25 000 spectateurs — davantage que la plupart des salles de concert modernes",
      "Éphèse a changé d'emplacement TROIS fois au cours de son histoire en raison de l'ensablement du port",
      "Le mot « éphémère » pourrait dériver d'Éphèse — les choses y changeaient comme la cité elle-même se déplaçait",
      "Les archéologues autrichiens n'ont dégagé qu'entre 15 et 20 % de la cité antique",
      "Les Maisons en Terrasses révèlent des systèmes antiques de chauffage par le sol et des mosaïques",
      "Cléopâtre aurait visité Éphèse en compagnie de Marc Antoine",
      "La ville disposait de latrines publiques avec eau courante et une disposition sociale pour s'asseoir",
    ],
    timeline: [
      "Xe siècle av. J.-C. - Les Grecs ioniens fondent la colonie",
      "VIIe siècle av. J.-C. - Les Lydiens conquièrent Éphèse",
      "560 av. J.-C. - Le roi Crésus finance le Temple d'Artémis",
      "356 av. J.-C. - Érostrate incendie le Temple d'Artémis la nuit de la naissance d'Alexandre le Grand",
      "334 av. J.-C. - Alexandre le Grand libère Éphèse de la domination perse",
      "129 av. J.-C. - Devient capitale de la province romaine d'Asie",
      "53-57 apr. J.-C. - Saint Paul séjourne à Éphèse durant trois ans",
      "262 apr. J.-C. - Les Goths détruisent le Temple d'Artémis",
      "431 apr. J.-C. - Le Troisième Concile œcuménique s'y tient (Marie déclarée Theotokos)",
      "614 apr. J.-C. - L'invasion perse cause des destructions majeures",
      "1863 - Début des fouilles archéologiques autrichiennes",
      "2015 - Inscription au patrimoine mondial de l'UNESCO",
    ],
    tags: [
      "éphèse",
      "efes",
      "cité-antique",
      "unesco",
      "sept-merveilles",
      "artémis",
      "bibliothèque-celsus",
      "romain",
      "grec",
      "chrétien",
      "vierge-marie",
      "sept-dormants",
      "saint-paul",
      "izmir",
      "selçuk",
    ],
  },

  // ─────────────────────────── ARABIC ───────────────────────────
  ar: {
    lang: "ar",
    SK: "LANG#ar",
    "GSI2-PK": "LANG#ar",
    "GSI2-SK": now,
    title: "مدينة أفسس القديمة",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "موقع تراث عالمي لليونسكو — أكثر المدن الإغريقية الرومانية اكتمالاً على ضفاف المتوسط، تضمّ معبد أرتميس (إحدى عجائب الدنيا السبع) ومكتبة سيلسوس ومنزل السيدة مريم العذراء.",
    builder:
      "مستوطنون إغريق أيونيون، وسّعها الملك الليدي كرويسوس والأباطرة الرومان",
    historicalPeriod: "متعددة الحقب (العصر القديم – البيزنطي)",
    constructionYear:
      "القرن العاشر ق.م (الاستيطان الإغريقي)، التطور الرئيسي من القرن السادس ق.م إلى القرن السادس الميلادي",
    description:
      "يمتدّ تاريخ أفسس عبر ثلاثة آلاف سنة من الحضارة الإنسانية. أسّسها مستوطنون إغريق أيونيون نحو القرن العاشر قبل الميلاد، ونمت لتصبح إحدى أعظم مدن العالم القديم. كان معبد أرتميس الذي شُيّد هنا إحدى عجائب الدنيا السبع — يفوق البارثينون في أثينا حجماً بأربع مرّات.\n\nكانت أفسس مدينة الأوائل: احتضنت إحدى أولى الجماعات المسيحية التي أسّسها القديس بولس، وصارت مقرّ السيدة مريم العذراء في سنواتها الأخيرة، وضمّت مكتبة سيلسوس الأسطورية — ثالث أكبر مكتبة في العالم القديم — ومسرحاً ضخماً يتّسع لخمسة وعشرين ألف متفرّج، وهو الأكبر في الأناضول.\n\nاضطلعت المدينة بدور محوري في تاريخ المسيحية المبكرة. أقام فيها القديس بولس ثلاث سنوات وكتب رسالته الشهيرة إلى أهل أفسس. وربما كُتب إنجيل يوحنا هنا. وفي عام ٤٣١ ميلادياً، انعقد المجمع المسكوني الثالث في أفسس حيث أُعلنت مريم «ثيوتوكوس» (والدة الإله).\n\nتحتلّ أفسس أيضاً مكانة عظيمة في التراث الإسلامي. يُعدّ كهف أصحاب الكهف — «الفتية الذين آمنوا بربّهم» كما جاء في سورة الكهف — من أبرز المواقع المرتبطة بهذه القصة القرآنية الكريمة.\n\nالمشي في أفسس هو عبور بين طبقات التاريخ البشري: معابد إغريقية وشوارع رومانية وكنائس بيزنطية وأساطير آلهة وفلاسفة وقدّيسين صاغوا ملامح الحضارة.",
    historicalSignificance:
      "تمثّل أفسس ذروة الحضارة المدنية في العصور القديمة. في أوج ازدهارها، كانت ثاني أكبر مدينة في الإمبراطورية الرومانية بعد روما ذاتها. شكّلت العاصمة التجارية والثقافية لآسيا الصغرى، ومحطة نهاية طريق الحرير، وبوابة بين المشرق والمغرب.\n\nجعل معبد أرتميس من أفسس وجهة للحجّ على مدى قرون. كانت أرتميس أفسس فريدة من نوعها — لا الصيّادة العذراء في الأساطير الإغريقية، بل إلهة خصوبة متعدّدة الأثداء تعكس تقاليد الإلهة الأم الأناضولية. أصبحت قصة تدمير المعبد وإعادة بنائه من أشهر الروايات في التاريخ القديم.\n\nللتاريخ المسيحي جذور عميقة هنا. جلب القديس يوحنا السيدة مريم العذراء إلى أفسس بعد الصلب. وأثارت مواعظ القديس بولس شغباً شهيراً حين خاف صاغة الفضة — الذين كانوا يصنعون تماثيل أرتميس — على أرزاقهم. وغدت المدينة إحدى الكنائس السبع في آسيا المذكورة في سفر الرؤيا.\n\nوفي التراث الإسلامي، تُعدّ أفسس موطن أصحاب الكهف (أهل الكهف) الوارد ذكرهم في سورة الكهف من القرآن الكريم، ما يجعلها نقطة التقاء نادرة بين الديانتين المسيحية والإسلامية.\n\nينقّب علماء آثار نمساويون في أفسس منذ عام ١٨٦٣، ولم يُكشف بعد سوى أقلّ من ٢٠٪ من المدينة القديمة. كلّ عام يحمل اكتشافات جديدة، ولا يزال الموقع يبوح بأسرار العالم القديم.",
    funFacts: [
      "كان لمكتبة سيلسوس نفق سرّي تحت الأرض يصل إلى دار البغاء المقابلة — فضيحة قديمة!",
      "كان المسرح يتّسع لـ 25,000 متفرّج — أكثر من معظم قاعات الحفلات الحديثة",
      "انتقلت أفسس من موقعها ثلاث مرّات عبر تاريخها بسبب تراكم الطمي في الميناء",
      "قد تكون كلمة «عابر» (ephemeral) مشتقة من أفسس — فالأشياء كانت تتغيّر كتغيّر المدينة نفسها",
      "لم يكشف علماء الآثار النمساويون سوى 15-20٪ من المدينة القديمة حتى الآن",
      "تكشف المنازل المدرّجة عن أنظمة تدفئة أرضية قديمة وفسيفساء بديعة",
      "يُعتقد أن كليوباترا زارت أفسس برفقة ماركوس أنطونيوس",
      "كانت المدينة تملك مراحيض عامة بمياه جارية ونظام اجتماعي طريف لترتيب الجلوس",
    ],
    timeline: [
      "القرن العاشر ق.م - الإغريق الأيونيون يؤسّسون المستوطنة",
      "القرن السابع ق.م - الليديون يفتحون أفسس",
      "٥٦٠ ق.م - الملك كرويسوس يموّل بناء معبد أرتميس",
      "٣٥٦ ق.م - هيروستراتوس يحرق معبد أرتميس ليلة مولد الإسكندر الأكبر",
      "٣٣٤ ق.م - الإسكندر الأكبر يحرّر أفسس من الحكم الفارسي",
      "١٢٩ ق.م - تصبح عاصمة ولاية آسيا الرومانية",
      "٥٣-٥٧ م - القديس بولس يقيم في أفسس ثلاث سنوات",
      "٢٦٢ م - القوط يدمّرون معبد أرتميس",
      "٤٣١ م - انعقاد المجمع المسكوني الثالث هنا (مريم تُعلن ثيوتوكوس)",
      "٦١٤ م - الغزو الفارسي يسبّب دماراً واسعاً",
      "١٨٦٣ - بدء أعمال التنقيب الأثري النمساوية",
      "٢٠١٥ - إدراجها في قائمة التراث العالمي لليونسكو",
    ],
    tags: [
      "أفسس",
      "efes",
      "مدينة-قديمة",
      "يونسكو",
      "عجائب-الدنيا",
      "أرتميس",
      "مكتبة-سيلسوس",
      "روماني",
      "إغريقي",
      "مسيحي",
      "مريم-العذراء",
      "أصحاب-الكهف",
      "القديس-بولس",
      "إزمير",
      "سلجوق",
    ],
  },

  // ─────────────────────────── PERSIAN / FARSI ───────────────────────────
  fa: {
    lang: "fa",
    SK: "LANG#fa",
    "GSI2-PK": "LANG#fa",
    "GSI2-SK": now,
    title: "شهر باستانی افسوس",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "میراث جهانی یونسکو — کامل‌ترین شهر یونانی-رومی مدیترانه، زادگاه معبد آرتمیس (از عجایب هفتگانه)، کتابخانه سلسوس و خانه حضرت مریم.",
    builder:
      "مهاجران یونانی ایونیایی، گسترش‌یافته توسط کرزوس پادشاه لیدیه و امپراتوران روم",
    historicalPeriod: "چندین دوره (باستانی تا بیزانسی)",
    constructionYear:
      "سده دهم پ.م (استقرار یونانیان)، توسعه اصلی از سده ششم پ.م تا سده ششم میلادی",
    description:
      "تاریخ افسوس سه هزاره را در بر می‌گیرد. این شهر که در حدود سده دهم پیش از میلاد توسط مهاجران یونانی ایونیایی بنیاد نهاده شد، به یکی از مهم‌ترین شهرهای جهان باستان تبدیل گشت. معبد آرتمیس که در اینجا ساخته شد، یکی از عجایب هفتگانه جهان باستان بود — چهار برابر بزرگ‌تر از پارتنون آتن.\n\nافسوس شهر نخستین‌ها بود: میزبان یکی از نخستین جوامع مسیحی پایه‌گذاری‌شده توسط پولس رسول؛ خانه حضرت مریم در سال‌های پایانی عمرشان؛ جایگاه کتابخانه افسانه‌ای سلسوس — سومین کتابخانه بزرگ جهان باستان — و تئاتری عظیم با گنجایش ۲۵٬۰۰۰ نفر، بزرگ‌ترین تئاتر باستانی آناتولی.\n\nافسوس پیوند ژرفی با تاریخ ایران نیز دارد. این شهر بخشی از شاهنشاهی هخامنشی بود و کوروش بزرگ و داریوش آن را در قلمرو خود داشتند. آزادسازی افسوس از دست پارسیان توسط اسکندر در ۳۳۴ پ.م، یکی از نقاط عطف تاریخ این شهر است.\n\nاین شهر در تاریخ مسیحیت نخستین نقشی بی‌بدیل ایفا کرد. پولس رسول سه سال اینجا زیست و نامه مشهورش به افسسیان را نوشت. در سال ۴۳۱ میلادی، سومین شورای جهانی مسیحی در افسوس برگزار شد و مریم «تئوتوکوس» (مادر خدا) اعلام گشت.\n\nدر میراث اسلامی نیز، افسوس با داستان اصحاب کهف — «جوانانی که به پروردگار خود ایمان آوردند» در سوره کهف — پیوند عمیقی دارد.\n\nقدم زدن در افسوس، گذر از لایه‌لایه تاریخ بشری است: معابد یونانی، خیابان‌های رومی، کلیساهای بیزانسی، و افسانه‌های خدایان، فیلسوفان و قدیسانی که تمدن غرب را شکل دادند.",
    historicalSignificance:
      "افسوس نماینده اوج تمدن شهری باستان است. در دوران شکوفایی، دومین شهر بزرگ امپراتوری روم پس از خود رم بود. پایتخت بازرگانی و فرهنگی آسیای صغیر و ایستگاه پایانی جاده ابریشم و دروازه‌ای میان شرق و غرب.\n\nمعبد آرتمیس، افسوس را برای قرن‌ها به مقصد زیارت تبدیل کرد. آرتمیس افسوسی منحصربه‌فرد بود — نه شکارچی باکره اساطیر یونانی، بلکه ایزدبانوی باروری با سینه‌های متعدد که بازتاب‌دهنده سنت‌های الهه مادر آناتولیایی بود.\n\nپیوند افسوس با ایران‌زمین عمیق و دیرینه است. این شهر از زمان لشکرکشی کوروش بزرگ در قلمرو شاهنشاهی هخامنشی قرار گرفت و ساتراپ‌نشین ایونیا بخش مهمی از این امپراتوری بود. داریوش بزرگ معبد آرتمیس را پس از بازسازی گرامی داشت. آزادسازی افسوس توسط اسکندر مقدونی از حکومت پارسی، پایانی بود بر فصلی مهم از تاریخ مشترک ایران و این شهر.\n\nتاریخ مسیحی در اینجا ریشه‌ای ژرف دارد. یوحنای رسول حضرت مریم را پس از مصلوب شدن عیسی مسیح به افسوس آورد. موعظه‌های پولس رسول شورشی مشهور برانگیخت.\n\nدر سنّت اسلامی، افسوس با داستان اصحاب کهف (سوره الکهف) پیوند دارد و آن را به یکی از نادر نقاط اشتراک مسیحیت و اسلام تبدیل می‌کند.\n\nباستان‌شناسان اتریشی از سال ۱۸۶۳ در افسوس کاوش می‌کنند و هنوز کمتر از ۲۰ درصد شهر باستانی کشف شده است.",
    funFacts: [
      "کتابخانه سلسوس تونلی زیرزمینی به فاحشه‌خانه روبه‌رو داشت — رسوایی باستانی!",
      "تئاتر گنجایش ۲۵٬۰۰۰ نفر داشت — بیشتر از اکثر سالن‌های کنسرت امروزی",
      "افسوس در طول تاریخ سه بار به‌خاطر رسوب‌گذاری بندر جابه‌جا شد",
      "واژه انگلیسی «ephemeral» (زودگذر) شاید از نام افسوس گرفته شده — همچون شهری که پیوسته دگرگون می‌شد",
      "باستان‌شناسان اتریشی تاکنون تنها ۱۵ تا ۲۰ درصد شهر را کاوش کرده‌اند",
      "خانه‌های پلکانی سیستم‌های گرمایش از کف و موزاییک‌های شگفت‌انگیز باستانی را آشکار می‌سازند",
      "گمان می‌رود کلئوپاترا به همراه مارکوس آنتونیوس از افسوس دیدن کرده باشد",
      "شهر توالت‌های عمومی با آب جاری و چیدمان اجتماعی ویژه‌ای برای نشستن داشت",
    ],
    timeline: [
      "سده دهم پ.م - یونانیان ایونیایی مستوطنه را بنیاد می‌نهند",
      "سده هفتم پ.م - لیدیایی‌ها افسوس را فتح می‌کنند",
      "۵۶۰ پ.م - کرزوس پادشاه هزینه ساخت معبد آرتمیس را تأمین می‌کند",
      "۳۵۶ پ.م - هروستراتوس معبد آرتمیس را در شب زادروز اسکندر کبیر به آتش می‌کشد",
      "۳۳۴ پ.م - اسکندر کبیر افسوس را از سلطه پارسیان آزاد می‌سازد",
      "۱۲۹ پ.م - پایتخت ایالت رومی آسیا می‌شود",
      "۵۳-۵۷ م - پولس رسول سه سال در افسوس اقامت می‌کند",
      "۲۶۲ م - گوت‌ها معبد آرتمیس را ویران می‌کنند",
      "۴۳۱ م - سومین شورای جهانی مسیحی اینجا برگزار می‌شود (مریم تئوتوکوس اعلام می‌گردد)",
      "۶۱۴ م - حمله ساسانیان ویرانی گسترده‌ای به بار می‌آورد",
      "۱۸۶۳ - آغاز کاوش‌های باستان‌شناسی اتریشی",
      "۲۰۱۵ - ثبت در فهرست میراث جهانی یونسکو",
    ],
    tags: [
      "افسوس",
      "efes",
      "شهر-باستانی",
      "یونسکو",
      "عجایب-هفتگانه",
      "آرتمیس",
      "کتابخانه-سلسوس",
      "رومی",
      "یونانی",
      "مسیحی",
      "حضرت-مریم",
      "اصحاب-کهف",
      "پولس-رسول",
      "ازمیر",
      "سلچوق",
    ],
  },

  // ─────────────────────────── TURKISH ───────────────────────────
  tr: {
    lang: "tr",
    SK: "LANG#tr",
    "GSI2-PK": "LANG#tr",
    "GSI2-SK": now,
    title: "Efes Antik Kenti",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "UNESCO Dünya Mirası — Akdeniz'in en eksiksiz Greko-Romen kenti. Artemis Tapınağı (Dünyanın Yedi Harikası'ndan biri), Celsus Kütüphanesi ve Meryem Ana Evi'ne ev sahipliği yapar.",
    builder:
      "İyonya Grek kolonistler tarafından kurulmuş; Lidya Kralı Kroisos ve Roma imparatorları tarafından genişletilmiştir",
    historicalPeriod: "Çok dönemli (Arkaik–Bizans)",
    constructionYear:
      "MÖ 10. yüzyıl (Grek yerleşimi), MÖ 6. yüzyıldan MS 6. yüzyıla kadar ana gelişme dönemi",
    description:
      "Efes'in tarihi üç bin yıla yayılır. Milattan önce 10. yüzyılda İyonya Grek kolonistler tarafından kurulan kent, antik dünyanın en önemli şehirlerinden biri hâline geldi. Burada inşa edilen Artemis Tapınağı, Dünyanın Yedi Harikası'ndan biriydi — Atina'daki Parthenon'un dört katı büyüklüğündeydi.\n\nEfes, pek çok ilke sahne olmuş bir kenttir: Aziz Pavlus'un kurduğu ilk Hristiyan topluluklarından birine ev sahipliği yapmış, Meryem Ana'nın son yıllarını geçirdiği yer olmuş, antik dünyanın üçüncü büyük kütüphanesi olan efsanevi Celsus Kütüphanesi'ni barındırmış ve Anadolu'nun en büyük antik tiyatrosuyla — 25.000 kişilik kapasitesiyle — göz kamaştırmıştır.\n\nKent, erken Hristiyanlık tarihinde belirleyici bir rol oynamıştır. Aziz Pavlus burada üç yıl yaşamış ve ünlü «Efeslilere Mektup»u yazmıştır. Yuhanna İncili'nin burada kaleme alınmış olabileceği düşünülmektedir. 431 yılında Üçüncü Ekümenik Konsil Efes'te toplanmış ve Meryem «Theotokos» (Tanrı Doğuran) ilan edilmiştir.\n\nEfes, Türkiye'nin en değerli kültürel hazinelerinden biridir. Anadolu toprağının bağrında, Ege'nin ışığında yükselen bu kent, medeniyetlerin beşiği olan bu coğrafyanın en parlak mücevherlerinden birini oluşturur. Selçuk ilçesinde, İzmir'in sıcak kucağında duran Efes, her yıl milyonlarca ziyaretçiyi ağırlamaya devam etmektedir.\n\nEfes'te yürümek, insanlık tarihinin katmanları arasında gezinmektir: Grek tapınakları, Roma caddeleri, Bizans kiliseleri ve Batı uygarlığını biçimlendiren tanrıların, filozofların ve azizlerin efsaneleri.",
    historicalSignificance:
      "Efes, antik kentsel uygarlığın doruk noktasını temsil eder. En parlak döneminde Roma'nın kendisinden sonra Roma İmparatorluğu'nun ikinci büyük kentiydi. Küçük Asya'nın ticaret ve kültür başkenti, İpek Yolu'nun son durağı ve Doğu ile Batı arasındaki kapıydı.\n\nArtemis Tapınağı, Efes'i yüzyıllar boyunca bir hac merkezi hâline getirdi. Efes Artemisi benzersizdi — Yunan mitolojisindeki bakire avcı değil, Anadolu Ana Tanrıça geleneğini yansıtan çok memeli bir bereket tanrıçasıydı. Tapınağın yıkımı ve yeniden inşası, antik dünyanın en ünlü öykülerinden biri oldu.\n\nHristiyan tarihi burada derin kökler salmıştır. Aziz Yuhanna, çarmıha gerilişin ardından Meryem Ana'yı Efes'e getirdi. Aziz Pavlus'un vaazları, Artemis heykelcikleri yapan gümüşçülerin geçimlerini tehlikede hissetmeleri üzerine ünlü bir ayaklanmaya yol açtı. Kent, Vahiy Kitabı'nda anılan Asya'nın Yedi Kilisesi'nden biri oldu.\n\nEfes aynı zamanda İslam geleneğinde de önemli bir yere sahiptir. Ashab-ı Kehf (Yedi Uyurlar) kıssası — Kur'an-ı Kerim'de Kehf Suresi'nde anlatılan — bu kentle ilişkilendirilir ve Efes'i hem Hristiyanlık hem de İslam için kutsal bir buluşma noktası kılar.\n\nAvusturyalı arkeologlar 1863'ten bu yana Efes'te kazı yapmaktadır ve antik kentin henüz yüzde yirmisinden azı gün yüzüne çıkarılmıştır. Her yıl yeni keşifler yapılmakta, bu eşsiz sit alanı antik dünyanın sırlarını açığa çıkarmaya devam etmektedir.",
    funFacts: [
      "Celsus Kütüphanesi'nden karşıdaki genelevine giden bir yeraltı tüneli vardı — antik bir skandal!",
      "Tiyatro 25.000 kişi kapasiteliydi — çoğu modern konser mekanından daha büyük",
      "Efes, limanın dolması yüzünden tarihi boyunca ÜÇ kez yer değiştirdi",
      "İngilizcedeki «ephemeral» (geçici) kelimesi Efes'ten türemiş olabilir — her şey bu kaygan kent gibi değişiyordu",
      "Avusturyalı arkeologlar antik kentin yalnızca yüzde 15-20'sini gün yüzüne çıkardı",
      "Yamaç Evler, antik yerden ısıtma sistemlerini ve muhteşem mozaikleri gözler önüne seriyor",
      "Kleopatra'nın Marcus Antonius ile birlikte Efes'i ziyaret ettiğine inanılıyor",
      "Kentte akan suyu olan halka açık tuvaletler ve ilginç bir sosyal oturma düzeni vardı",
    ],
    timeline: [
      "MÖ 10. yüzyıl - İyonyalı Grekler yerleşim kurdu",
      "MÖ 7. yüzyıl - Lidyalılar Efes'i fethetti",
      "MÖ 560 - Kral Kroisos, Artemis Tapınağı'nı finanse etti",
      "MÖ 356 - Herostratos, Büyük İskender'in doğduğu gece Artemis Tapınağı'nı ateşe verdi",
      "MÖ 334 - Büyük İskender, Efes'i Pers egemenliğinden kurtardı",
      "MÖ 129 - Roma'nın Asia eyaletinin başkenti oldu",
      "MS 53-57 - Aziz Pavlus Efes'te üç yıl ikamet etti",
      "MS 262 - Gotlar Artemis Tapınağı'nı yıktı",
      "MS 431 - Üçüncü Ekümenik Konsil burada toplandı (Meryem Theotokos ilan edildi)",
      "MS 614 - Sasani istilası büyük yıkıma neden oldu",
      "1863 - Avusturya arkeolojik kazıları başladı",
      "2015 - UNESCO Dünya Mirası Listesi'ne alındı",
    ],
    tags: [
      "efes",
      "antik-kent",
      "unesco",
      "yedi-harika",
      "artemis",
      "celsus-kütüphanesi",
      "roma",
      "grek",
      "hristiyan",
      "meryem-ana",
      "yedi-uyurlar",
      "aziz-pavlus",
      "izmir",
      "selçuk",
      "anadolu",
    ],
  },

  // ─────────────────────────── RUSSIAN ───────────────────────────
  ru: {
    lang: "ru",
    SK: "LANG#ru",
    "GSI2-PK": "LANG#ru",
    "GSI2-SK": now,
    title: "Древний город Эфес",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "Объект Всемирного наследия ЮНЕСКО — наиболее сохранившийся греко-римский город Средиземноморья с храмом Артемиды (одно из Семи чудес света), библиотекой Цельса и Домом Богородицы.",
    builder:
      "Ионийские греческие колонисты; расширен лидийским царём Крёзом и римскими императорами",
    historicalPeriod: "Многопериодный (архаика — Византия)",
    constructionYear:
      "X век до н.э. (греческое поселение), основное развитие — с VI века до н.э. по VI век н.э.",
    description:
      "История Эфеса охватывает три тысячелетия. Основанный ионийскими греческими колонистами около X века до нашей эры, Эфес вырос в один из величайших городов древнего мира. Храм Артемиды, воздвигнутый здесь, являлся одним из Семи чудес света — он превосходил афинский Парфенон в четыре раза.\n\nЭфес был городом первых свершений: здесь возникла одна из первых христианских общин, основанных апостолом Павлом; здесь провела последние годы жизни Пресвятая Богородица; здесь стояла легендарная библиотека Цельса — третья по величине в древнем мире; здесь возвышался крупнейший в Анатолии театр на 25 000 мест.\n\nГород сыграл ключевую роль в истории раннего христианства. Апостол Павел прожил здесь три года и написал знаменитое «Послание к Ефесянам». Евангелие от Иоанна, возможно, было создано именно здесь. В 431 году в Эфесе состоялся Третий Вселенский собор, на котором Дева Мария была провозглашена «Богородицей» (Θεοτόκος).\n\nДля православного мира Эфес имеет особое значение. Это один из семи городов, к церквям которых обращается Книга Откровения. Предание о Семи спящих отроках Эфесских глубоко почитается в православной традиции.\n\nПрогулка по Эфесу — это путешествие сквозь пласты человеческой истории: греческие храмы, римские улицы, византийские церкви и легенды богов, философов и святых, сформировавших западную цивилизацию.",
    historicalSignificance:
      "Эфес олицетворяет расцвет древней городской цивилизации. В период наибольшего могущества он являлся вторым по величине городом Римской империи после самого Рима. Город был торговой и культурной столицей Малой Азии, конечной точкой Великого шёлкового пути и вратами между Востоком и Западом.\n\nХрам Артемиды превратил Эфес в место паломничества на протяжении столетий. Артемида Эфесская была уникальна — не девственная охотница греческой мифологии, а многогрудая богиня плодородия, восходящая к анатолийским традициям Великой Матери. История разрушения и восстановления храма стала одним из самых знаменитых сюжетов древности.\n\nХристианская история глубоко укоренена здесь. Апостол Иоанн привёз Пресвятую Богородицу в Эфес после Распятия. Проповедь апостола Павла вызвала знаменитый бунт серебряников, опасавшихся за свой промысел. Город стал одной из Семи Церквей Асии, упомянутых в Откровении Иоанна Богослова.\n\nДля Русской Православной Церкви Эфес особенно значим: решения Третьего Вселенского собора (431 г.) о Богородице являются одним из столпов православного богословия. Предание о Семи Эфесских отроках — юношах, уснувших на два столетия и пробудившихся в христианской империи — одно из самых почитаемых в православной агиографии.\n\nАвстрийские археологи ведут раскопки в Эфесе с 1863 года, обнажив менее 20 % древнего города. Каждый год приносит новые открытия, и памятник продолжает раскрывать тайны античного мира.",
    funFacts: [
      "Из библиотеки Цельса в публичный дом напротив вёл подземный тоннель — античный скандал!",
      "Театр вмещал 25 000 зрителей — больше, чем большинство современных концертных площадок",
      "Эфес ТРИ раза менял местоположение из-за заиливания гавани",
      "Слово «эфемерный» может происходить от названия Эфеса — всё менялось, как и сам вечно перемещавшийся город",
      "Австрийские археологи раскопали лишь 15–20 % древнего города",
      "Террасные дома открыли системы древнего подпольного отопления и мозаики",
      "Считается, что Клеопатра посещала Эфес вместе с Марком Антонием",
      "В городе имелись общественные уборные с проточной водой и особым социальным порядком рассадки",
    ],
    timeline: [
      "X в. до н.э. - Ионийские греки основывают поселение",
      "VII в. до н.э. - Лидийцы завоёвывают Эфес",
      "560 г. до н.э. - Царь Крёз финансирует строительство храма Артемиды",
      "356 г. до н.э. - Герострат поджигает храм Артемиды в ночь рождения Александра Македонского",
      "334 г. до н.э. - Александр Македонский освобождает Эфес от персидского владычества",
      "129 г. до н.э. - Становится столицей римской провинции Азия",
      "53–57 гг. н.э. - Апостол Павел живёт в Эфесе три года",
      "262 г. н.э. - Готы разрушают храм Артемиды",
      "431 г. н.э. - Третий Вселенский собор (Дева Мария провозглашена Богородицей)",
      "614 г. н.э. - Персидское нашествие причиняет значительные разрушения",
      "1863 - Начало австрийских археологических раскопок",
      "2015 - Внесён в Список Всемирного наследия ЮНЕСКО",
    ],
    tags: [
      "эфес",
      "efes",
      "древний-город",
      "юнеско",
      "семь-чудес",
      "артемида",
      "библиотека-цельса",
      "римский",
      "греческий",
      "христианский",
      "богородица",
      "семь-отроков",
      "апостол-павел",
      "измир",
      "сельчук",
    ],
  },

  // ─────────────────────────── KOREAN ───────────────────────────
  ko: {
    lang: "ko",
    SK: "LANG#ko",
    "GSI2-PK": "LANG#ko",
    "GSI2-SK": now,
    title: "에페소스 고대 도시",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "유네스코 세계유산 — 지중해 연안에서 가장 완전하게 보존된 그리스-로마 도시. 아르테미스 신전(세계 7대 불가사의), 셀수스 도서관, 성모 마리아의 집이 있다.",
    builder:
      "이오니아 그리스 식민자들이 건설, 리디아 왕 크로이소스와 로마 황제들이 확장",
    historicalPeriod: "다기간(고졸기–비잔틴)",
    constructionYear:
      "기원전 10세기(그리스인 정착), 기원전 6세기~기원후 6세기 주요 발전기",
    description:
      "에페소스의 역사는 삼천 년에 걸쳐 있다. 기원전 10세기경 이오니아 그리스 식민자들이 세운 이 도시는 고대 세계에서 가장 중요한 도시 중 하나로 성장했다. 이곳에 세워진 아르테미스 신전은 고대 세계 7대 불가사의 중 하나로, 아테네의 파르테논 신전보다 네 배나 컸다.\n\n에페소스는 '최초'의 도시였다. 사도 바울이 세운 최초의 기독교 공동체 중 하나를 품었고, 성모 마리아가 말년을 보낸 곳이었으며, 고대 세계 3대 도서관 중 하나인 전설의 셀수스 도서관이 있었고, 아나톨리아 최대 규모인 25,000석의 대극장이 있었다.\n\n이 도시는 초기 기독교 역사에서 결정적인 역할을 했다. 사도 바울은 이곳에서 3년간 거주하며 유명한 「에페소서」를 집필했다. 「요한복음」이 이곳에서 기록되었을 가능성이 있다. 431년 제3차 공의회가 에페소스에서 열려 마리아를 '테오토코스'(하느님의 어머니)로 선언했다.\n\n에페소스를 거니는 것은 인류 역사의 지층을 걷는 것과 같다. 그리스 신전, 로마 거리, 비잔틴 교회, 그리고 서양 문명을 빚어낸 신들과 철학자들과 성인들의 전설이 켜켜이 쌓여 있다.",
    historicalSignificance:
      "에페소스는 고대 도시 문명의 정점을 대표한다. 전성기에는 로마 다음으로 로마 제국에서 두 번째로 큰 도시였다. 소아시아의 상업·문화 수도이자 실크로드의 종착역이며 동서양을 잇는 관문이었다.\n\n아르테미스 신전은 에페소스를 수백 년간 순례의 목적지로 만들었다. 에페소스의 아르테미스는 독특했다 — 그리스 신화의 처녀 사냥꾼이 아니라, 아나톨리아 모신 전통을 반영한 다유방의 풍요 여신이었다. 신전의 파괴와 재건은 고대 세계에서 가장 유명한 이야기 중 하나가 되었다.\n\n기독교 역사가 이곳에 깊이 뿌리내리고 있다. 사도 요한은 십자가 처형 이후 성모 마리아를 에페소스로 모셨다. 사도 바울의 설교는 아르테미스 은상을 만들던 은장이들이 생계를 위협받자 유명한 폭동을 일으켰다. 이 도시는 요한계시록에 언급된 아시아의 일곱 교회 중 하나가 되었다.\n\n오스트리아 고고학자들은 1863년부터 에페소스를 발굴해 왔으나 아직 고대 도시의 20%도 드러나지 않았다. 해마다 새로운 발견이 이루어지며, 이 유적지는 계속해서 고대 세계의 비밀을 밝혀내고 있다.",
    funFacts: [
      "셀수스 도서관에서 맞은편 유곽으로 통하는 지하 통로가 있었다 — 고대의 스캔들!",
      "대극장은 25,000명을 수용할 수 있었다 — 오늘날 대부분의 콘서트 홀보다 크다",
      "에페소스는 항구의 퇴적으로 역사상 세 번이나 위치를 옮겼다",
      "영어 'ephemeral'(덧없는)은 에페소스에서 유래했을 수 있다 — 끊임없이 변하는 도시처럼",
      "오스트리아 고고학자들은 지금까지 고대 도시의 15~20%만 발굴했다",
      "테라스 하우스에서는 고대 온돌 시스템과 모자이크가 발견되었다",
      "클레오파트라가 마르쿠스 안토니우스와 함께 에페소스를 방문한 것으로 전해진다",
      "도시에는 수세식 공중 화장실과 독특한 좌석 배치가 있었다",
    ],
    timeline: [
      "기원전 10세기 - 이오니아 그리스인들이 정착지를 건설",
      "기원전 7세기 - 리디아인들이 에페소스를 정복",
      "기원전 560년 - 크로이소스 왕이 아르테미스 신전 건립을 후원",
      "기원전 356년 - 헤로스트라토스가 알렉산드로스 대왕 탄생일 밤에 아르테미스 신전에 방화",
      "기원전 334년 - 알렉산드로스 대왕이 에페소스를 페르시아 지배에서 해방",
      "기원전 129년 - 로마 아시아 속주의 수도가 됨",
      "기원후 53~57년 - 사도 바울이 에페소스에서 3년간 거주",
      "기원후 262년 - 고트족이 아르테미스 신전을 파괴",
      "기원후 431년 - 제3차 공의회 개최(마리아를 테오토코스로 선언)",
      "기원후 614년 - 페르시아 침공으로 대규모 파괴",
      "1863년 - 오스트리아 고고학 발굴 시작",
      "2015년 - 유네스코 세계유산 등재",
    ],
    tags: [
      "에페소스",
      "efes",
      "고대도시",
      "유네스코",
      "7대불가사의",
      "아르테미스",
      "셀수스도서관",
      "로마",
      "그리스",
      "기독교",
      "성모마리아",
      "일곱잠자리",
      "사도바울",
      "이즈미르",
      "셀추크",
    ],
  },

  // ─────────────────────────── GERMAN ───────────────────────────
  de: {
    lang: "de",
    SK: "LANG#de",
    "GSI2-PK": "LANG#de",
    "GSI2-SK": now,
    title: "Antike Stadt Ephesos",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "UNESCO-Welterbe — die am vollständigsten erhaltene griechisch-römische Stadt im Mittelmeerraum mit dem Artemis-Tempel (eines der Sieben Weltwunder), der Celsus-Bibliothek und dem Haus der Jungfrau Maria.",
    builder:
      "Ionische griechische Siedler, erweitert durch den lydischen König Krösus und römische Kaiser",
    historicalPeriod: "Mehrere Epochen (Archaik–Byzanz)",
    constructionYear:
      "10. Jh. v. Chr. (griechische Besiedlung), Hauptentwicklung 6. Jh. v. Chr. – 6. Jh. n. Chr.",
    description:
      "Die Geschichte von Ephesos erstreckt sich über drei Jahrtausende. Um das 10. Jahrhundert v. Chr. von ionischen griechischen Siedlern gegründet, wuchs Ephesos zu einer der bedeutendsten Städte der antiken Welt heran. Der hier errichtete Artemis-Tempel war eines der Sieben Weltwunder der Antike — viermal größer als der Parthenon in Athen.\n\nEphesos war eine Stadt der Premieren: Es beherbergte eine der ersten von Paulus gegründeten christlichen Gemeinden, wurde zur letzten Heimstatt der Jungfrau Maria, besaß die legendäre Celsus-Bibliothek — die drittgrößte Bibliothek der Antike — und verfügte über das größte Theater Anatoliens mit 25.000 Plätzen.\n\nDie Stadt spielte eine entscheidende Rolle in der frühchristlichen Geschichte. Der Apostel Paulus verbrachte hier drei Jahre und verfasste seinen berühmten «Brief an die Epheser». Das Johannesevangelium könnte hier geschrieben worden sein. Im Jahr 431 n. Chr. fand in Ephesos das Dritte Ökumenische Konzil statt, auf dem Maria zur «Theotokos» (Gottesgebärerin) erklärt wurde.\n\nFür den deutschsprachigen Raum besitzt Ephesos eine besondere Bedeutung: Österreichische Archäologen graben hier seit 1863 — es ist eine der längsten ununterbrochenen Grabungskampagnen der Welt. Das Österreichische Archäologische Institut hat Ephesos maßgeblich der Welt erschlossen.\n\nDurch Ephesos zu wandern bedeutet, die Schichten der Menschheitsgeschichte zu durchqueren: griechische Tempel, römische Straßen, byzantinische Kirchen und die Legenden jener Götter, Philosophen und Heiligen, die die westliche Zivilisation formten.",
    historicalSignificance:
      "Ephesos verkörpert den Höhepunkt antiker Stadtkultur. Auf dem Gipfel seiner Macht war es nach Rom selbst die zweitgrößte Stadt des Römischen Reiches. Die Stadt war Handels- und Kulturhauptstadt Kleinasiens, Endstation der Seidenstraße und Tor zwischen Orient und Okzident.\n\nDer Artemis-Tempel machte Ephesos jahrhundertelang zum Wallfahrtsort. Die ephesische Artemis war einzigartig — nicht die jungfräuliche Jägerin der griechischen Mythologie, sondern eine vielbrüstige Fruchtbarkeitsgöttin, die anatolische Muttergöttinnen-Traditionen widerspiegelte. Zerstörung und Wiederaufbau des Tempels wurden zu einer der berühmtesten Erzählungen der Antike.\n\nDie christliche Geschichte ist hier tief verwurzelt. Der Apostel Johannes brachte die Jungfrau Maria nach der Kreuzigung nach Ephesos. Die Predigt des Paulus löste einen berühmten Aufruhr aus, als Silberschmiede, die Artemis-Statuetten herstellten, um ihren Lebensunterhalt fürchteten. Die Stadt wurde eine der Sieben Gemeinden Asiens aus der Offenbarung des Johannes.\n\nDie deutschsprachige Welt hat einen einzigartigen Bezug zu Ephesos: Seit 1863 führt das Österreichische Archäologische Institut hier Grabungen durch — über 160 Jahre ununterbrochener Forschung. Österreichische Archäologen rekonstruierten die Fassade der Celsus-Bibliothek (1970–1978), die heute zu den ikonischsten Bildern der Antike gehört. Dennoch sind weniger als 20 % der antiken Stadt freigelegt. Jedes Jahr bringt neue Entdeckungen, und die Stätte offenbart weiterhin Geheimnisse der antiken Welt.",
    funFacts: [
      "Von der Celsus-Bibliothek führte ein unterirdischer Tunnel zum Bordell gegenüber — ein antiker Skandal!",
      "Das Theater fasste 25.000 Zuschauer — mehr als die meisten modernen Konzerthallen",
      "Ephesos wechselte im Laufe seiner Geschichte DREI Mal den Standort wegen der Verlandung des Hafens",
      "Das Wort «ephemer» könnte von Ephesos stammen — alles war so vergänglich wie die Stadt selbst",
      "Österreichische Archäologen haben erst 15–20 % der antiken Stadt freigelegt",
      "Die Hanghäuser offenbaren antike Fußbodenheizungen und Mosaike",
      "Kleopatra soll Ephesos zusammen mit Marcus Antonius besucht haben",
      "Die Stadt verfügte über öffentliche Toiletten mit fließendem Wasser und einer besonderen sozialen Sitzordnung",
    ],
    timeline: [
      "10. Jh. v. Chr. - Ionische Griechen gründen die Siedlung",
      "7. Jh. v. Chr. - Die Lyder erobern Ephesos",
      "560 v. Chr. - König Krösus finanziert den Artemis-Tempel",
      "356 v. Chr. - Herostratos legt in der Nacht von Alexanders Geburt Feuer im Artemis-Tempel",
      "334 v. Chr. - Alexander der Große befreit Ephesos von persischer Herrschaft",
      "129 v. Chr. - Wird Hauptstadt der römischen Provinz Asia",
      "53–57 n. Chr. - Der Apostel Paulus lebt drei Jahre in Ephesos",
      "262 n. Chr. - Die Goten zerstören den Artemis-Tempel",
      "431 n. Chr. - Drittes Ökumenisches Konzil (Maria wird zur Theotokos erklärt)",
      "614 n. Chr. - Persische Invasion verursacht schwere Zerstörungen",
      "1863 - Beginn der österreichischen archäologischen Ausgrabungen",
      "2015 - Aufnahme in die UNESCO-Welterbeliste",
    ],
    tags: [
      "ephesos",
      "efes",
      "antike-stadt",
      "unesco",
      "sieben-weltwunder",
      "artemis",
      "celsus-bibliothek",
      "römisch",
      "griechisch",
      "christlich",
      "jungfrau-maria",
      "siebenschläfer",
      "apostel-paulus",
      "izmir",
      "selçuk",
    ],
  },

  // ─────────────────────────── JAPANESE ───────────────────────────
  ja: {
    lang: "ja",
    SK: "LANG#ja",
    "GSI2-PK": "LANG#ja",
    "GSI2-SK": now,
    title: "エフェソス古代都市",
    nameLocal: "Efes Antik Kenti",
    shortDescription:
      "ユネスコ世界遺産——地中海沿岸で最も完全な姿を留めるギリシャ・ローマ都市。アルテミス神殿（世界七不思議）、ケルスス図書館、聖母マリアの家がある。",
    builder:
      "イオニア系ギリシャ人入植者が建設、リュディア王クロイソスおよびローマ皇帝たちが拡張",
    historicalPeriod: "複数時代（アルカイック期〜ビザンツ期）",
    constructionYear:
      "紀元前10世紀（ギリシャ人入植）、紀元前6世紀〜紀元後6世紀が主要発展期",
    description:
      "エフェソスの歴史は三千年に及ぶ。紀元前10世紀頃、イオニア系ギリシャ人入植者によって建設されたこの都市は、古代世界屈指の重要都市へと成長した。ここに建てられたアルテミス神殿は古代世界の七不思議の一つであり、アテネのパルテノン神殿の四倍の規模を誇った。\n\nエフェソスは「初めて」の都市であった。使徒パウロが築いた最初期のキリスト教共同体の一つを擁し、聖母マリアが晩年を過ごした地であり、古代世界第三の蔵書量を誇る伝説のケルスス図書館が建ち、アナトリア最大の25,000人収容の大劇場がそびえていた。\n\nこの都市は初期キリスト教の歴史において決定的な役割を果たした。使徒パウロは三年間にわたりここに滞在し、有名な「エフェソの信徒への手紙」を執筆した。「ヨハネによる福音書」がここで書かれた可能性がある。431年には第三回エフェソス公会議が開催され、マリアは「テオトコス」（神の母）と宣言された。\n\nエフェソスを歩くことは、人類の歴史の地層を歩くことに等しい。ギリシャの神殿、ローマの街路、ビザンツの教会、そして西洋文明を形作った神々、哲学者、聖人たちの伝説が幾重にも重なっている。",
    historicalSignificance:
      "エフェソスは古代都市文明の頂点を体現している。最盛期にはローマに次ぐローマ帝国第二の都市であった。小アジアの商業・文化の中心地にしてシルクロードの終着点であり、東と西を結ぶ門であった。\n\nアルテミス神殿はエフェソスを何世紀にもわたる巡礼の地とした。エフェソスのアルテミスは独特であった——ギリシャ神話の処女の狩猟女神ではなく、アナトリアの母神信仰を反映した多乳房の豊穣女神であった。神殿の破壊と再建は古代世界で最も有名な物語の一つとなった。\n\nキリスト教の歴史はここに深く根ざしている。使徒ヨハネは磔刑の後、聖母マリアをエフェソスに連れてきた。使徒パウロの説教は、アルテミス像を作る銀細工師たちが生計の危機を感じ、有名な暴動を引き起こした。この都市は「ヨハネの黙示録」に記されたアジアの七つの教会の一つとなった。\n\nオーストリアの考古学者たちが1863年以来エフェソスの発掘を続けているが、古代都市の20％にも満たない範囲しか明らかになっていない。毎年新たな発見がもたらされ、この遺跡は古代世界の秘密を明かし続けている。",
    funFacts: [
      "ケルスス図書館から向かいの娼館へ地下通路が通じていた——古代のスキャンダル！",
      "大劇場は25,000人を収容でき、現代のほとんどのコンサート会場を上回る規模であった",
      "エフェソスは港の堆積により歴史上三度も都市ごと移転した",
      "英語の「ephemeral（はかない）」はエフェソスに由来するかもしれない——絶えず変わりゆく都市のように",
      "オーストリアの考古学者たちはまだ古代都市の15〜20％しか発掘していない",
      "テラスハウスからは古代の床暖房システムとモザイクが発見されている",
      "クレオパトラがマルクス・アントニウスとともにエフェソスを訪れたと伝えられている",
      "都市には流水式の公衆トイレがあり、独特の社交的な座席配置がなされていた",
    ],
    timeline: [
      "紀元前10世紀 - イオニア系ギリシャ人が入植地を建設",
      "紀元前7世紀 - リュディア人がエフェソスを征服",
      "紀元前560年 - クロイソス王がアルテミス神殿の建設を出資",
      "紀元前356年 - ヘロストラトスがアレクサンドロス大王誕生の夜にアルテミス神殿に放火",
      "紀元前334年 - アレクサンドロス大王がエフェソスをペルシア支配から解放",
      "紀元前129年 - ローマのアシア属州の首都となる",
      "紀元後53〜57年 - 使徒パウロがエフェソスに三年間滞在",
      "紀元後262年 - ゴート族がアルテミス神殿を破壊",
      "紀元後431年 - 第三回公会議が開催（マリアがテオトコスと宣言される）",
      "紀元後614年 - ペルシアの侵攻により甚大な被害",
      "1863年 - オーストリアによる考古学的発掘が開始",
      "2015年 - ユネスコ世界遺産に登録",
    ],
    tags: [
      "エフェソス",
      "efes",
      "古代都市",
      "ユネスコ",
      "七不思議",
      "アルテミス",
      "ケルスス図書館",
      "ローマ",
      "ギリシャ",
      "キリスト教",
      "聖母マリア",
      "七人の眠り人",
      "使徒パウロ",
      "イズミル",
      "セルチュク",
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   PUSH TO DYNAMODB
   ═══════════════════════════════════════════════════════════════════════════ */

async function main() {
  const langs = Object.keys(translations);
  console.log(
    `\n${DRY_RUN ? "DRY RUN — " : ""}Pushing ${langs.length} language(s) for ephesus...\n`
  );

  for (const lang of langs) {
    const item = { ...base, ...translations[lang] };
    console.log(`  [${lang}] ${item.title}`);

    if (!DRY_RUN) {
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`       ✓ written`);
    } else {
      console.log(`       (skipped — dry run)`);
    }
  }

  console.log(`\nDone! ${langs.length} records ${DRY_RUN ? "would be " : ""}written.`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
