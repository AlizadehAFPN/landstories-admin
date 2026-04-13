/**
 * Translate mont-saint-michel site record to 10 languages and push to DynamoDB.
 *
 * Usage: node scripts/translate-mont-saint-michel.mjs [--dry-run]
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
  const match = line.match(/^(\w+)=(.+)$/);
  if (match) process.env[match[1]] = match[2];
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
  PK: "SITE#mont-saint-michel",
  category: "sacred_grounds",
  cityId: "mont-saint-michel",
  constructionYear: "708",
  countryId: "FR",
  "GSI1-PK": "CAT#sacred_grounds",
  "GSI1-SK": now,
  lat: 48.6361,
  lng: -1.5115,
  siteId: "mont-saint-michel",
  thumbnail:
    "https://landstories-images.s3.eu-north-1.amazonaws.com/images/sites/mont-saint-michel/1771147077807.webp",
  unesco: false,
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
    title: "Mont Saint-Michel",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "Una milagrosa abadía en una isla mareal en Normandía, coronada por una maravilla gótica que se eleva 92 metros sobre traicioneras arenas movedizas — la Maravilla invicta del Mundo Occidental.",
    builder: "Obispo Aubert de Avranches (fundado en 708 d.C.)",
    historicalPeriod: "Medieval (siglos VIII-XVI)",
    description:
      "Mont Saint-Michel es una comuna insular de mareas en Normandía, coronada por una impresionante abadía gótico-románica que se eleva como una visión surgida del mar — uno de los monumentos más reconocibles y espiritualmente cargados de toda la civilización occidental. Conocido como «La Merveille de l'Occident» (La Maravilla del Mundo Occidental) desde la Edad Media, la isla se alza 92 metros sobre las traicioneras llanuras de marea de la bahía, con su silueta dominada por la imponente iglesia abacial y la estatua dorada del Arcángel Miguel matando al dragón en lo alto de su aguja de 156 metros.\n\nFundado en 708 d.C. cuando el obispo Aubert de Avranches recibió una orden divina del Arcángel Miguel para construir una iglesia en el islote rocoso entonces llamado Mont-Tombe, el lugar evolucionó durante ocho siglos desde un simple oratorio hasta uno de los logros arquitectónicos más ambiciosos de la Edad Media. El complejo de la abadía es una obra maestra de la ingeniería medieval — una ciudad vertical construida sobre un pináculo de granito, con edificios apilados sobre edificios, sostenidos por enormes criptas y contrafuertes que parecen desafiar la gravedad.\n\nDurante la Guerra de los Cien Años, Mont Saint-Michel se convirtió en el único lugar del norte de Francia que nunca fue capturado por los ingleses; su pequeña guarnición de 119 caballeros resistió durante más de 30 años contra repetidos asedios y bloqueos. Esta resistencia milagrosa convirtió al Mont en un símbolo de la identidad nacional francesa y de la protección divina. La propia bahía servía como defensa natural — sus mareas, entre las más altas de Europa con hasta 15 metros, podían llegar «tan rápido como un caballo al galope» según Victor Hugo, tragándose a los peregrinos desprevenidos en arenas movedizas y aislando a los ejércitos sitiadores.\n\nHoy en día, Mont Saint-Michel y su bahía son Patrimonio de la Humanidad de la UNESCO, recibiendo más de 3 millones de visitantes al año. La reciente eliminación de la calzada y su sustitución por un puente peatonal ha comenzado a restaurar el carácter marítimo de la isla, permitiendo que el mar vuelva a rodear este monumento eterno a la fe, el coraje y el genio arquitectónico.",
    historicalSignificance:
      "Mont Saint-Michel representa uno de los logros supremos de la arquitectura medieval occidental y uno de los lugares de peregrinación más importantes de la Cristiandad. La abadía es una obra maestra de la arquitectura románica y gótica construida bajo condiciones extraordinarias — enclavada en una roca de granito en una bahía con algunas de las mareas más extremas de Europa.\n\nLa importancia del lugar es múltiple. Arquitectónicamente, «La Merveille» (La Maravilla), la sección gótica construida entre 1211 y 1228, está considerada uno de los mejores ejemplos de arquitectura del siglo XIII, con su complejo de tres pisos compuesto por la Sala de la Limosna, la Sala de Huéspedes, la Sala de los Caballeros, el Refectorio y el Claustro apilados verticalmente en la cara norte de la roca. La ingeniería necesaria para construir esto en un pináculo de granito inclinado era tan avanzada que los contemporáneos la atribuyeron a la intervención divina.\n\nMilitarmente, la exitosa resistencia de Mont Saint-Michel durante la Guerra de los Cien Años (1337-1453) lo convirtió en un poderoso símbolo de la resiliencia francesa. La guarnición que defendió el Mont cuando toda Normandía había caído en manos inglesas se hizo legendaria, y la defensa del lugar inspiró directamente a Juana de Arco, quien escuchó la voz del Arcángel Miguel ordenándole salvar Francia.\n\nEspiritualmente, el Mont fue uno de los tres grandes destinos de peregrinación medievales (junto con Roma y Santiago de Compostela). La peligrosa travesía de la bahía — donde las mareas podían matar a los incautos — se convirtió en una metáfora del viaje espiritual, un cruce del mundo profano al sagrado. Los peregrinos que sobrevivían a la travesía y ascendían hasta la abadía sentían que verdaderamente habían ganado su salvación.",
    funFacts: [
      "Las mareas en la bahía pueden variar hasta 15 metros — entre las más altas de la Europa continental",
      "Victor Hugo escribió que la marea llega «tan rápido como un caballo al galope» — aproximadamente 6 km/h",
      "La abadía está construida sobre una roca de granito llamada Mont-Tombe, que se eleva 92 metros sobre el nivel del mar",
      "Durante la Guerra de los Cien Años, una guarnición de solo 119 caballeros defendió el Mont contra toda Inglaterra",
      "La estatua dorada de San Miguel en lo alto de la aguja fue colocada en 1897 y se encuentra a 156 metros sobre el nivel del mar",
      "Más de 3 millones de personas visitan Mont Saint-Michel cada año, convirtiéndolo en el sitio más visitado fuera de París",
      "Cuando se usó como prisión (1793-1863), fue apodada «la Bastilla de los Mares»",
      "El jardín del claustro de la abadía, suspendido entre el mar y el cielo, tiene 227 columnas de piedra caliza de Caen",
      "Mont Saint-Michel fue la inspiración para Minas Tirith en El Señor de los Anillos de Tolkien",
      "Las arenas movedizas de la bahía han cobrado innumerables vidas a lo largo de los siglos — los guías siguen siendo esenciales hoy en día",
    ],
    timeline: [
      "708 - El obispo Aubert de Avranches construye el primer oratorio tras una visión del Arcángel Miguel",
      "966 - Monjes benedictinos fundan la abadía bajo el duque Ricardo I de Normandía",
      "1017-1144 - Construcción de la iglesia abacial románica",
      "1204 - Los aliados bretones de Felipe Augusto incendian la ciudad; la abadía resulta parcialmente destruida",
      "1211-1228 - Construcción del complejo gótico «La Merveille» (La Maravilla) — obra maestra de la arquitectura medieval",
      "1337-1453 - Guerra de los Cien Años: Mont Saint-Michel nunca cae ante los ingleses pese a más de 30 años de asedio",
      "1421 - El coro románico se derrumba; reconstruido en estilo gótico flamígero (completado en 1521)",
      "1469 - Luis XI establece la Orden de San Miguel en la abadía",
      "1622 - Reforma benedictina por la Congregación de San Mauro",
      "1790 - Revolución Francesa: los monjes son expulsados, la abadía se convierte en prisión («Bastilla de los Mares»)",
      "1874 - Clasificado como monumento histórico; comienza la restauración",
      "1897 - La estatua dorada del Arcángel Miguel se coloca en lo alto de la aguja",
      "1979 - Inscrito como Patrimonio de la Humanidad de la UNESCO",
      "2014 - Un nuevo puente peatonal reemplaza la calzada, restaurando el carácter marítimo de la isla",
    ],
    tags: [
      "medieval",
      "abadía",
      "isla mareal",
      "normandía",
      "peregrinación",
      "gótico",
      "arcángel",
      "guerra de los cien años",
      "arenas movedizas",
      "unesco",
      "francia",
    ],
  },

  // ─────────────────────────── CHINESE ───────────────────────────
  zh: {
    lang: "zh",
    SK: "LANG#zh",
    "GSI2-PK": "LANG#zh",
    "GSI2-SK": now,
    title: "圣米歇尔山",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "诺曼底一座神奇的潮汐岛屿修道院，哥特式奇迹耸立于危险的流沙潮汐之上92米——从未被攻克的西方世界奇观。",
    builder: "阿夫朗什主教奥贝尔（始建于公元708年）",
    historicalPeriod: "中世纪（8至16世纪）",
    description:
      "圣米歇尔山是诺曼底的一座潮汐岛屿市镇，山顶矗立着一座令人叹为观止的哥特-罗马式修道院，宛如海中幻境般拔地而起——它是整个西方文明中最令人瞩目、最具精神感召力的地标之一。自中世纪以来就被称为「西方世界的奇迹」（La Merveille de l'Occident），这座岛屿在海湾凶险的潮汐滩涂上方92米处巍然耸立，其轮廓由高耸的修道院教堂和156米尖塔顶端大天使米迦勒斩龙的镀金雕像所主宰。\n\n公元708年，阿夫朗什主教奥贝尔接到大天使米迦勒的神谕，命他在这座当时被称为「坟山」（Mont-Tombe）的岩石小岛上建造一座教堂。此后八个世纪间，这里从一座简朴的祈祷堂发展成为中世纪最雄心勃勃的建筑成就之一。修道院建筑群是中世纪工程学的杰作——一座建在花岗岩尖峰上的垂直城市，建筑层层叠叠，由巨大的地窖和扶壁支撑，似乎在挑战万有引力。\n\n百年战争期间，圣米歇尔山成为法国北部唯一从未被英格兰人攻陷的地方，其仅有119名骑士的小型驻军在长达30余年的反复围攻和封锁中坚守不屈。这一奇迹般的抵抗使圣米歇尔山成为法兰西民族认同和神圣庇护的象征。海湾本身就是天然的防御屏障——其潮差高达15米，是欧洲最高的潮汐之一。正如维克多·雨果所写，潮水涌来「如奔马之速」，将毫无防备的朝圣者吞没在流沙之中，并切断围城大军的退路。\n\n如今，圣米歇尔山及其海湾是联合国教科文组织世界遗产，每年接待超过300万游客。近年来拆除堤道并以步行桥取代的举措，已开始恢复这座岛屿的海洋特性，让大海再次环绕这座献给信仰、勇气和建筑天才的永恒丰碑。",
    historicalSignificance:
      "圣米歇尔山代表了中世纪西方建筑的最高成就之一，也是基督教世界最重要的朝圣地之一。修道院是罗马式和哥特式建筑的杰作，在极其艰难的条件下建成——矗立在欧洲潮差最极端的海湾中的花岗岩上。\n\n该遗址的重要性是多层次的。在建筑方面，「奇迹楼」（La Merveille）——1211年至1228年间建造的哥特式部分——被认为是13世纪建筑最优秀的范例之一。它的三层建筑群包括施济堂、宾客厅、骑士厅、食堂和回廊，垂直叠建在岩石北面。在倾斜的花岗岩尖峰上完成如此工程所需的技术如此超前，以至于同时代的人将其归因于神的干预。\n\n在军事方面，圣米歇尔山在百年战争（1337-1453）期间的成功抵抗使其成为法兰西坚韧精神的有力象征。当整个诺曼底都已沦陷于英格兰人之手时，坚守圣米歇尔山的驻军成为了传奇，而该地的防御直接激励了圣女贞德——她听到大天使米迦勒的声音，命令她拯救法兰西。\n\n在精神层面，圣米歇尔山是中世纪三大朝圣目的地之一（另外两个是罗马和圣地亚哥-德孔波斯特拉）。穿越海湾的危险旅程——潮水随时可能夺命——成为精神朝圣之旅的隐喻，是从世俗世界向神圣世界的跨越。那些挺过渡海之险并登上修道院的朝圣者，感到自己真正赢得了救赎。",
    funFacts: [
      "海湾的潮差可达15米——位居欧洲大陆之首",
      "维克多·雨果写道，潮水涌来「如奔马之速」——大约每小时6公里",
      "修道院建在一块名为「坟山」的花岗岩上，海拔92米",
      "百年战争期间，仅119名骑士的驻军就抵挡住了整个英格兰的进攻",
      "尖塔顶端的大天使米迦勒镀金雕像于1897年安置，海拔156米",
      "每年超过300万人参观圣米歇尔山，使其成为巴黎以外最受欢迎的景点",
      "当它被用作监狱时（1793-1863），人们给它起了个绰号——「海上巴士底狱」",
      "修道院的回廊花园悬浮于海天之间，拥有227根卡昂石灰岩柱",
      "圣米歇尔山是托尔金《指环王》中米那斯提力斯的灵感来源",
      "几个世纪以来，海湾中的流沙已夺去无数生命——至今仍需向导带领",
    ],
    timeline: [
      "708年 - 阿夫朗什主教奥贝尔在大天使米迦勒显灵后建造第一座祈祷堂",
      "966年 - 本笃会修士在诺曼底公爵理查一世的支持下建立修道院",
      "1017-1144年 - 罗马式修道院教堂建造完成",
      "1204年 - 腓力·奥古斯都的布列塔尼盟军纵火焚城；修道院部分被毁",
      "1211-1228年 - 哥特式「奇迹楼」（La Merveille）建成——中世纪建筑杰作",
      "1337-1453年 - 百年战争：圣米歇尔山在长达30余年的围攻中从未落入英格兰人之手",
      "1421年 - 罗马式唱诗班席坍塌；以火焰哥特式风格重建（1521年完工）",
      "1469年 - 路易十一在修道院设立圣米迦勒骑士团",
      "1622年 - 圣莫尔修会进行本笃会改革",
      "1790年 - 法国大革命：修士被驱逐，修道院沦为监狱（「海上巴士底狱」）",
      "1874年 - 被列为历史古迹；修复工程开始",
      "1897年 - 大天使米迦勒镀金雕像安置于尖塔顶端",
      "1979年 - 被列入联合国教科文组织世界遗产名录",
      "2014年 - 新建步行桥取代堤道，恢复岛屿的海洋特性",
    ],
    tags: [
      "中世纪",
      "修道院",
      "潮汐岛",
      "诺曼底",
      "朝圣",
      "哥特式",
      "大天使",
      "百年战争",
      "流沙",
      "联合国教科文组织",
      "法国",
    ],
  },

  // ─────────────────────────── FRENCH ───────────────────────────
  fr: {
    lang: "fr",
    SK: "LANG#fr",
    "GSI2-PK": "LANG#fr",
    "GSI2-SK": now,
    title: "Mont Saint-Michel",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "Une abbaye miraculeuse sur une île de marée en Normandie, couronnée d'une merveille gothique s'élevant à 92 mètres au-dessus de sables mouvants traîtres — la Merveille invaincue du monde occidental.",
    builder: "Évêque Aubert d'Avranches (fondé en 708 apr. J.-C.)",
    historicalPeriod: "Médiéval (VIIIe-XVIe siècle)",
    description:
      "Le Mont Saint-Michel est une commune insulaire de marée en Normandie, couronnée par une époustouflante abbaye gothique-romane qui s'élève telle une vision surgissant de la mer — l'un des monuments les plus reconnaissables et les plus chargés de spiritualité de toute la civilisation occidentale. Surnommé « La Merveille de l'Occident » depuis le Moyen Âge, l'îlot s'élève à 92 mètres au-dessus des grèves traîtresses de la baie, sa silhouette dominée par l'église abbatiale élancée et la statue dorée de l'archange Michel terrassant le dragon au sommet de sa flèche culminant à 156 mètres.\n\nFondé en 708 apr. J.-C. lorsque l'évêque Aubert d'Avranches reçut l'ordre divin de l'archange Michel de bâtir un sanctuaire sur l'îlot rocheux alors nommé Mont-Tombe, le site a évolué durant huit siècles, passant d'un simple oratoire à l'une des réalisations architecturales les plus ambitieuses du Moyen Âge. L'ensemble abbatial est un chef-d'œuvre d'ingénierie médiévale — une cité verticale édifiée sur un piton granitique, avec des bâtiments superposés les uns aux autres, soutenus par d'imposantes cryptes et des contreforts qui semblent défier les lois de la pesanteur.\n\nDurant la guerre de Cent Ans, le Mont Saint-Michel devint le seul bastion du nord de la France à n'avoir jamais été pris par les Anglais : sa modeste garnison de 119 chevaliers résista pendant plus de trente ans à des sièges et des blocus répétés. Cette résistance miraculeuse fit du Mont un symbole de l'identité nationale française et de la protection divine. La baie elle-même servait de défense naturelle — ses marées, parmi les plus hautes d'Europe avec jusqu'à 15 mètres de marnage, pouvaient arriver « à la vitesse d'un cheval au galop » selon Victor Hugo, engloutissant les pèlerins imprudents dans les sables mouvants et isolant les armées assiégeantes.\n\nAujourd'hui, le Mont Saint-Michel et sa baie sont inscrits au patrimoine mondial de l'UNESCO et accueillent plus de 3 millions de visiteurs par an. La suppression récente de la digue-route et son remplacement par une passerelle piétonne ont commencé à redonner à l'île son caractère maritime, permettant à la mer de ceindre à nouveau ce monument éternel dédié à la foi, au courage et au génie architectural.",
    historicalSignificance:
      "Le Mont Saint-Michel représente l'une des réalisations suprêmes de l'architecture médiévale occidentale et l'un des lieux de pèlerinage les plus importants de la chrétienté. L'abbaye est un chef-d'œuvre d'architecture romane et gothique bâti dans des conditions extraordinaires — perché sur un rocher granitique dans une baie aux marées parmi les plus extrêmes d'Europe.\n\nL'importance du site est multiple. Sur le plan architectural, « La Merveille », la section gothique édifiée entre 1211 et 1228, est considérée comme l'un des plus beaux exemples d'architecture du XIIIe siècle, avec son complexe à trois niveaux comprenant l'Aumônerie, la Salle des Hôtes, la Salle des Chevaliers, le Réfectoire et le Cloître, superposés verticalement sur la face nord du rocher. L'ingénierie requise pour bâtir cet ensemble sur un piton granitique incliné était si avancée que les contemporains l'attribuèrent à une intervention divine.\n\nSur le plan militaire, la résistance victorieuse du Mont Saint-Michel durant la guerre de Cent Ans (1337-1453) en fit un puissant symbole de la résilience française. La garnison qui tint le Mont alors que toute la Normandie était tombée aux mains des Anglais devint légendaire, et la défense du site inspira directement Jeanne d'Arc, qui entendit la voix de l'archange Michel lui ordonnant de sauver la France.\n\nSur le plan spirituel, le Mont comptait parmi les trois grandes destinations de pèlerinage médiévales (avec Rome et Saint-Jacques-de-Compostelle). La périlleuse traversée de la baie — où les marées pouvaient emporter les imprudents — devint une métaphore du voyage spirituel, un passage du monde profane au monde sacré. Les pèlerins qui survivaient à la traversée et gravissaient les marches de l'abbaye avaient le sentiment d'avoir véritablement mérité leur salut.",
    funFacts: [
      "Les marées dans la baie peuvent atteindre un marnage de 15 mètres — parmi les plus hautes d'Europe continentale",
      "Victor Hugo écrivit que la marée monte « à la vitesse d'un cheval au galop » — soit environ 6 km/h",
      "L'abbaye est bâtie sur un rocher granitique appelé Mont-Tombe, culminant à 92 mètres au-dessus du niveau de la mer",
      "Durant la guerre de Cent Ans, une garnison de seulement 119 chevaliers défendit le Mont contre toute l'Angleterre",
      "La statue dorée de saint Michel au sommet de la flèche fut installée en 1897, à 156 mètres au-dessus du niveau de la mer",
      "Plus de 3 millions de personnes visitent le Mont Saint-Michel chaque année, ce qui en fait le site le plus visité hors de Paris",
      "Lorsqu'il servit de prison (1793-1863), il fut surnommé « la Bastille des Mers »",
      "Le jardin du cloître de l'abbaye, suspendu entre mer et ciel, compte 227 colonnes en calcaire de Caen",
      "Le Mont Saint-Michel a inspiré la Minas Tirith du Seigneur des Anneaux de Tolkien",
      "Les sables mouvants de la baie ont englouti d'innombrables vies au fil des siècles — les guides restent indispensables aujourd'hui",
    ],
    timeline: [
      "708 - L'évêque Aubert d'Avranches édifie le premier oratoire après une vision de l'archange Michel",
      "966 - Des moines bénédictins fondent l'abbaye sous le duc Richard Ier de Normandie",
      "1017-1144 - Construction de l'église abbatiale romane",
      "1204 - Les alliés bretons de Philippe Auguste incendient la ville ; l'abbaye est partiellement détruite",
      "1211-1228 - Construction de « La Merveille », le complexe gothique — chef-d'œuvre de l'architecture médiévale",
      "1337-1453 - Guerre de Cent Ans : le Mont Saint-Michel ne tombe jamais aux mains des Anglais malgré plus de 30 ans de siège",
      "1421 - Le chœur roman s'effondre ; reconstruit en style gothique flamboyant (achevé en 1521)",
      "1469 - Louis XI institue l'Ordre de Saint-Michel dans l'abbaye",
      "1622 - Réforme bénédictine par la Congrégation de Saint-Maur",
      "1790 - Révolution française : les moines sont expulsés, l'abbaye devient une prison (« Bastille des Mers »)",
      "1874 - Classé monument historique ; début des travaux de restauration",
      "1897 - La statue dorée de l'archange Michel est placée au sommet de la flèche",
      "1979 - Inscription au patrimoine mondial de l'UNESCO",
      "2014 - Une nouvelle passerelle piétonne remplace la digue-route, rendant à l'île son caractère maritime",
    ],
    tags: [
      "médiéval",
      "abbaye",
      "île de marée",
      "normandie",
      "pèlerinage",
      "gothique",
      "archange",
      "guerre de cent ans",
      "sables mouvants",
      "unesco",
      "france",
    ],
  },

  // ─────────────────────────── ARABIC ───────────────────────────
  ar: {
    lang: "ar",
    SK: "LANG#ar",
    "GSI2-PK": "LANG#ar",
    "GSI2-SK": now,
    title: "مون سان ميشيل",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "دير عجائبي على جزيرة مدّية في نورماندي، تتوّجه تحفة قوطية ترتفع 92 متراً فوق رمال متحركة غادرة — أعجوبة العالم الغربي التي لم تُقهر قط.",
    builder: "الأسقف أوبير من أفرانش (تأسس عام 708 م)",
    historicalPeriod: "العصور الوسطى (القرن الثامن - السادس عشر)",
    description:
      "مون سان ميشيل هي بلدة جزيرة مدّية في نورماندي، تتوّجها كنيسة دير قوطية-رومانية مذهلة ترتفع كالرؤيا من عرض البحر — واحدة من أكثر المعالم شهرةً وروحانيةً في الحضارة الغربية بأسرها. عُرفت منذ القرون الوسطى بـ«أعجوبة الغرب» (La Merveille de l'Occident)، وترتفع الجزيرة 92 متراً فوق السبخات المدّية الغادرة في الخليج، يسيطر على أفقها برج الدير الشاهق وتمثال رئيس الملائكة ميخائيل المذهّب وهو يصرع التنين فوق قمة البرج على ارتفاع 156 متراً.\n\nتأسست عام 708 ميلادية حين تلقى الأسقف أوبير من أفرانش أمراً إلهياً من رئيس الملائكة ميخائيل ببناء كنيسة على الجزيرة الصخرية التي كانت تُعرف حينها بـ«جبل القبر» (Mont-Tombe). تطوّر الموقع على مدى ثمانية قرون من مصلّى بسيط إلى واحد من أكثر الإنجازات المعمارية طموحاً في العصور الوسطى. مجمع الدير تحفة من تحف الهندسة في القرون الوسطى — مدينة عمودية بُنيت على قمة من الغرانيت، بمبانٍ مكدّسة فوق بعضها البعض، تسندها سراديب وأكتاف ضخمة تبدو كأنها تتحدى الجاذبية.\n\nخلال حرب المئة عام، أصبح مون سان ميشيل المكان الوحيد في شمال فرنسا الذي لم يسقط في أيدي الإنجليز قط؛ صمدت حاميته الصغيرة المؤلفة من 119 فارساً لأكثر من ثلاثين عاماً في وجه حصارات وحصارات بحرية متكررة. جعلت هذه المقاومة المعجزية من الجبل رمزاً للهوية الوطنية الفرنسية والحماية الإلهية. كان الخليج نفسه بمثابة دفاع طبيعي — إذ يمكن أن يصل ارتفاع المد فيه إلى 15 متراً، وهو من أعلى الموجات المدّية في أوروبا. وقد كتب فيكتور هوغو أن المد يأتي «بسرعة حصان في عدوه»، يبتلع الحجاج الغافلين في الرمال المتحركة ويقطع الجيوش المحاصِرة.\n\nاليوم، يُعدّ مون سان ميشيل وخليجه موقعاً للتراث العالمي لليونسكو، ويستقبل أكثر من 3 ملايين زائر سنوياً. وقد بدأت إزالة الجسر البري مؤخراً واستبداله بجسر للمشاة في استعادة الطابع البحري للجزيرة، مما يسمح للبحر بأن يحيط مجدداً بهذا الصرح الخالد المكرّس للإيمان والشجاعة وعبقرية العمارة.",
    historicalSignificance:
      "يمثل مون سان ميشيل أحد أسمى إنجازات العمارة الغربية في القرون الوسطى وأحد أهم مواقع الحج في العالم المسيحي. الدير تحفة معمارية رومانية وقوطية شُيّدت في ظروف استثنائية — متربّعة على صخرة من الغرانيت في خليج يشهد بعضاً من أشد الموجات المدّية تطرفاً في أوروبا.\n\nأهمية الموقع متعددة الأبعاد. معمارياً، تُعتبر «الأعجوبة» (La Merveille) — القسم القوطي الذي بُني بين عامي 1211 و1228 — من أروع نماذج العمارة في القرن الثالث عشر، بمجمّعها المكوّن من ثلاثة طوابق يضم قاعة الصدقات وقاعة الضيوف وقاعة الفرسان والمائدة والدير، مكدّسة عمودياً على الوجه الشمالي للصخرة. كانت الهندسة اللازمة لتشييد هذا البناء على قمة غرانيتية مائلة متقدمة لدرجة أن المعاصرين نسبوها إلى تدخل إلهي.\n\nعسكرياً، جعلت المقاومة الناجحة لمون سان ميشيل خلال حرب المئة عام (1337-1453) منه رمزاً قوياً لصمود فرنسا. أصبحت الحامية التي صمدت في الجبل حين سقطت كل نورماندي بيد الإنجليز أسطورة، وألهم الدفاع عن الموقع جان دارك مباشرةً، التي سمعت صوت رئيس الملائكة ميخائيل يأمرها بإنقاذ فرنسا.\n\nروحانياً، كان الجبل أحد وجهات الحج الكبرى الثلاث في العصور الوسطى (إلى جانب روما وسانتياغو دي كومبوستيلا). أصبحت العبور الخطير عبر الخليج — حيث يمكن أن تقتل الأمواج المدّية الغافلين — استعارة للرحلة الروحانية، عبوراً من العالم الدنيوي إلى المقدس. شعر الحجاج الذين نجوا من العبور وصعدوا إلى الدير بأنهم حقاً نالوا خلاصهم.",
    funFacts: [
      "يمكن أن يصل فرق المد والجزر في الخليج إلى 15 متراً — من بين الأعلى في أوروبا القارية",
      "كتب فيكتور هوغو أن المد يأتي «بسرعة حصان في عدوه» — أي نحو 6 كم/ساعة",
      "بُني الدير على صخرة غرانيتية تُسمى «جبل القبر»، ترتفع 92 متراً فوق سطح البحر",
      "خلال حرب المئة عام، صدّت حامية من 119 فارساً فقط هجمات إنجلترا بأكملها",
      "التمثال المذهّب للقديس ميخائيل فوق البرج وُضع عام 1897 على ارتفاع 156 متراً فوق سطح البحر",
      "يزور أكثر من 3 ملايين شخص مون سان ميشيل كل عام، مما يجعله أكثر المواقع زيارةً خارج باريس",
      "حين استُخدم كسجن (1793-1863)، لُقّب بـ«باستيل البحار»",
      "حديقة دير الأروقة، المعلّقة بين البحر والسماء، تضم 227 عموداً من حجر كان الجيري",
      "كان مون سان ميشيل مصدر إلهام لميناس تيريث في سيد الخواتم لتولكين",
      "ابتلعت الرمال المتحركة في الخليج أرواحاً لا تُحصى عبر القرون — ولا يزال المرشدون ضرورة حتى اليوم",
    ],
    timeline: [
      "708 - الأسقف أوبير من أفرانش يبني أول مصلّى بعد رؤيا رئيس الملائكة ميخائيل",
      "966 - رهبان بندكتيون يؤسسون الدير في عهد الدوق ريشار الأول من نورماندي",
      "1017-1144 - تشييد كنيسة الدير الرومانية",
      "1204 - حلفاء بريتون لفيليب أوغسطس يضرمون النار في البلدة؛ الدير يتضرر جزئياً",
      "1211-1228 - بناء المجمع القوطي «الأعجوبة» (La Merveille) — تحفة العمارة الوسيطة",
      "1337-1453 - حرب المئة عام: مون سان ميشيل لا يسقط أبداً بيد الإنجليز رغم أكثر من 30 عاماً من الحصار",
      "1421 - انهيار الجوقة الرومانية؛ أُعيد بناؤها بالأسلوب القوطي المشتعل (اكتمل 1521)",
      "1469 - لويس الحادي عشر يؤسس وسام القديس ميخائيل في الدير",
      "1622 - إصلاح بندكتي على يد جماعة القديس مور",
      "1790 - الثورة الفرنسية: طرد الرهبان وتحويل الدير إلى سجن («باستيل البحار»)",
      "1874 - تصنيفه معلماً تاريخياً؛ بدء أعمال الترميم",
      "1897 - وضع التمثال المذهّب لرئيس الملائكة ميخائيل فوق البرج",
      "1979 - إدراجه ضمن مواقع التراث العالمي لليونسكو",
      "2014 - جسر مشاة جديد يحل محل الجسر البري، ليعيد للجزيرة طابعها البحري",
    ],
    tags: [
      "القرون الوسطى",
      "دير",
      "جزيرة مدّية",
      "نورماندي",
      "حج",
      "قوطي",
      "رئيس الملائكة",
      "حرب المئة عام",
      "رمال متحركة",
      "يونسكو",
      "فرنسا",
    ],
  },

  // ─────────────────────────── PERSIAN (FARSI) ───────────────────────────
  fa: {
    lang: "fa",
    SK: "LANG#fa",
    "GSI2-PK": "LANG#fa",
    "GSI2-SK": now,
    title: "مون سن‌میشل",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "صومعه‌ای شگفت‌انگیز بر جزیره‌ای جزرومدی در نرماندی، با شاهکار گوتیکی که ۹۲ متر بالاتر از شن‌های روان خائنانه سر بر می‌آورد — عجایب شکست‌ناپذیر جهان غرب.",
    builder: "اسقف اوبر از اورانش (بنا شده در سال ۷۰۸ میلادی)",
    historicalPeriod: "قرون وسطی (قرن هشتم تا شانزدهم)",
    description:
      "مون سن‌میشل یک شهرک جزیره‌ای جزرومدی در نرماندی است که بر فرازش صومعه‌ای گوتیک-رومانسک خیره‌کننده چون رؤیایی از دل دریا سر برآورده — یکی از شناخته‌شده‌ترین و معنوی‌ترین نشانه‌های سرزمینی در تمامی تمدن غربی. از قرون وسطی با نام «شگفتی غرب» (La Merveille de l'Occident) شناخته می‌شود. این جزیره ۹۲ متر بالاتر از پهنه‌های جزرومدی خطرناک خلیج قد برافراشته و نمای آن را کلیسای صومعه بلند و مجسمه طلاکاری‌شده فرشته مقرب میکائیل در حال کشتن اژدها بر فراز مناره ۱۵۶ متری‌اش تعریف می‌کند.\n\nدر سال ۷۰۸ میلادی، هنگامی که اسقف اوبر از اورانش فرمانی الهی از فرشته مقرب میکائیل برای بنای کلیسایی بر صخره‌ای که آن زمان «کوه گور» (Mont-Tombe) نام داشت دریافت کرد، بنیان این مکان نهاده شد. در طول هشت قرن، این مکان از نمازخانه‌ای ساده به یکی از بلندپروازانه‌ترین دستاوردهای معماری قرون وسطی تبدیل شد. مجموعه صومعه شاهکاری از مهندسی قرون‌وسطایی است — شهری عمودی بر فراز قله‌ای گرانیتی، با ساختمان‌هایی روی هم انباشته، که بر سردابه‌ها و پشتوانه‌های عظیم استوار است و گویی از قوانین گرانش سرپیچی می‌کند.\n\nدر جریان جنگ صد ساله، مون سن‌میشل تنها نقطه‌ای در شمال فرانسه بود که هرگز به دست انگلیسی‌ها نیفتاد؛ پادگان کوچکش با تنها ۱۱۹ شوالیه بیش از ۳۰ سال در برابر محاصره‌ها و انسدادهای پیاپی ایستادگی کرد. این مقاومت معجزه‌آسا مون سن‌میشل را به نمادی از هویت ملی فرانسه و حمایت الهی بدل ساخت. خود خلیج سپر دفاعی طبیعی بود — جزرومدش که تا ۱۵ متر می‌رسید، از بلندترین‌ها در اروپا بود. ویکتور هوگو نوشت که جزرومد «به سرعت اسبی در تاخت» می‌آید، زائران بی‌خبر را در شن‌های روان می‌بلعد و لشکرهای محاصره‌کننده را محاصره می‌کند.\n\nامروزه مون سن‌میشل و خلیجش میراث جهانی یونسکو هستند و سالانه بیش از ۳ میلیون بازدیدکننده را پذیرا می‌شوند. برداشتن اخیر جاده‌سد و جایگزینی آن با پل عابر پیاده، بازگرداندن خصلت دریایی جزیره را آغاز کرده و اجازه می‌دهد دریا بار دیگر این یادمان جاودانه ایمان، شجاعت و نبوغ معماری را در آغوش بگیرد.",
    historicalSignificance:
      "مون سن‌میشل یکی از والاترین دستاوردهای معماری غربی قرون وسطی و یکی از مهم‌ترین مقاصد زیارتی جهان مسیحیت را نمایندگی می‌کند. صومعه شاهکاری از معماری رومانسک و گوتیک است که در شرایطی استثنایی ساخته شده — بر فراز صخره‌ای گرانیتی در خلیجی با شدیدترین جزرومدهای اروپا.\n\nاهمیت این مکان چندوجهی است. از نظر معماری، «شگفتی» (La Merveille) — بخش گوتیکی که بین سال‌های ۱۲۱۱ تا ۱۲۲۸ ساخته شد — یکی از بهترین نمونه‌های معماری قرن سیزدهم به شمار می‌رود، با مجموعه سه‌طبقه‌اش شامل تالار صدقه، تالار مهمان، تالار شوالیه‌ها، غذاخوری و صحن، که عمودی بر دیواره شمالی صخره روی هم چیده شده‌اند. مهندسی لازم برای ساختن این بنا بر قله‌ای شیب‌دار گرانیتی آن‌قدر پیشرفته بود که معاصران آن را به مداخله الهی نسبت دادند.\n\nاز نظر نظامی، مقاومت موفقیت‌آمیز مون سن‌میشل در جنگ صد ساله (۱۳۳۷-۱۴۵۳) آن را به نماد نیرومندی از تاب‌آوری فرانسه بدل کرد. پادگانی که مون سن‌میشل را نگه داشت در حالی که تمام نرماندی به دست انگلیسی‌ها افتاده بود، افسانه‌ای شد و دفاع از این مکان مستقیماً ژاندارک را الهام بخشید — او صدای فرشته مقرب میکائیل را شنید که فرمان نجات فرانسه را می‌داد.\n\nاز نظر معنوی، مون سن‌میشل یکی از سه مقصد بزرگ زیارتی قرون وسطی بود (در کنار رم و سانتیاگو د کمپوستلا). عبور خطرناک از خلیج — جایی که جزرومد می‌توانست جان بی‌احتیاطان را بگیرد — استعاره‌ای از سفر معنوی شد، عبوری از جهان دنیوی به جهان مقدس. زائرانی که از عبور جان سالم به در می‌بردند و تا صومعه بالا می‌رفتند، احساس می‌کردند رستگاری خود را به‌حق به دست آورده‌اند.",
    funFacts: [
      "جزرومد در خلیج می‌تواند تا ۱۵ متر تغییر کند — از بلندترین‌ها در اروپای قاره‌ای",
      "ویکتور هوگو نوشت که جزرومد «به سرعت اسبی در تاخت» می‌آید — حدود ۶ کیلومتر بر ساعت",
      "صومعه بر صخره‌ای گرانیتی به نام «کوه گور» ساخته شده که ۹۲ متر بالاتر از سطح دریاست",
      "در جنگ صد ساله، پادگانی تنها با ۱۱۹ شوالیه در برابر تمام انگلستان ایستاد",
      "مجسمه طلاکاری‌شده فرشته مقرب میکائیل بر فراز مناره در سال ۱۸۹۷ نصب شد و ۱۵۶ متر بالاتر از سطح دریا قرار دارد",
      "سالانه بیش از ۳ میلیون نفر از مون سن‌میشل بازدید می‌کنند و آن را پربازدیدترین مکان خارج از پاریس ساخته‌اند",
      "هنگامی که به عنوان زندان استفاده می‌شد (۱۷۹۳-۱۸۶۳)، لقب «باستیل دریاها» را گرفت",
      "باغ صحن صومعه، معلق میان دریا و آسمان، دارای ۲۲۷ ستون از سنگ آهک کان است",
      "مون سن‌میشل الهام‌بخش میناس تیریث در ارباب حلقه‌ها اثر تالکین بود",
      "شن‌های روان خلیج در طول قرن‌ها جان‌های بی‌شماری را گرفته‌اند — راهنماها هنوز هم ضروری هستند",
    ],
    timeline: [
      "۷۰۸ - اسقف اوبر از اورانش پس از رؤیت فرشته مقرب میکائیل نخستین نمازخانه را بنا می‌کند",
      "۹۶۶ - راهبان بندیکتن صومعه را در دوره دوک ریشار اول نرماندی تأسیس می‌کنند",
      "۱۰۱۷-۱۱۴۴ - ساخت کلیسای صومعه رومانسک",
      "۱۲۰۴ - متحدان برتون فیلیپ اوگوست شهر را به آتش می‌کشند؛ صومعه تا حدی ویران می‌شود",
      "۱۲۱۱-۱۲۲۸ - ساخت مجموعه گوتیک «شگفتی» (La Merveille) — شاهکار معماری قرون وسطی",
      "۱۳۳۷-۱۴۵۳ - جنگ صد ساله: مون سن‌میشل هرگز به دست انگلیسی‌ها نمی‌افتد با وجود بیش از ۳۰ سال محاصره",
      "۱۴۲۱ - کُر رومانسک فرو می‌ریزد؛ به سبک گوتیک شعله‌ور بازسازی می‌شود (تکمیل ۱۵۲۱)",
      "۱۴۶۹ - لویی یازدهم نشان سن‌میشل را در صومعه تأسیس می‌کند",
      "۱۶۲۲ - اصلاحات بندیکتن توسط جماعت سن‌مور",
      "۱۷۹۰ - انقلاب فرانسه: راهبان اخراج می‌شوند، صومعه به زندان تبدیل می‌شود («باستیل دریاها»)",
      "۱۸۷۴ - به عنوان بنای تاریخی ثبت می‌شود؛ مرمت آغاز می‌گردد",
      "۱۸۹۷ - مجسمه طلاکاری‌شده فرشته مقرب میکائیل بر فراز مناره نصب می‌شود",
      "۱۹۷۹ - در فهرست میراث جهانی یونسکو ثبت می‌شود",
      "۲۰۱۴ - پل عابر پیاده جدید جایگزین جاده‌سد می‌شود و خصلت دریایی جزیره را بازمی‌گرداند",
    ],
    tags: [
      "قرون وسطی",
      "صومعه",
      "جزیره جزرومدی",
      "نرماندی",
      "زیارت",
      "گوتیک",
      "فرشته مقرب",
      "جنگ صد ساله",
      "شن‌های روان",
      "یونسکو",
      "فرانسه",
    ],
  },

  // ─────────────────────────── TURKISH ───────────────────────────
  tr: {
    lang: "tr",
    SK: "LANG#tr",
    "GSI2-PK": "LANG#tr",
    "GSI2-SK": now,
    title: "Mont Saint-Michel",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "Normandiya'da bir gelgit adasının tepesindeki mucizevi manastır; hain bataklıkların 92 metre üzerinde yükselen Gotik bir şaheser — Batı Dünyasının fethedilmemiş harikası.",
    builder: "Avranches Piskoposu Aubert (708 yılında kurulmuştur)",
    historicalPeriod: "Ortaçağ (8.-16. yüzyıl)",
    description:
      "Mont Saint-Michel, Normandiya'da bir gelgit adası komünüdür; tepesinde, denizden bir hayal gibi yükselen nefes kesici bir Gotik-Romanesk manastır yer alır — tüm Batı uygarlığının en tanınmış ve ruhani açıdan en derin anlamlı simgelerinden biri. Orta Çağ'dan bu yana «La Merveille de l'Occident» (Batı Dünyasının Harikası) olarak anılan ada, körfezin tehlikeli gelgit düzlüklerinin 92 metre üzerinde yükselir; siluetini heybetli manastır kilisesi ve 156 metredeki kulesinin tepesinde ejderhayı öldüren Başmelek Mikail'in yaldızlı heykeli belirler.\n\nMS 708'de Avranches Piskoposu Aubert, Başmelek Mikail'den o dönemde Mont-Tombe olarak bilinen kayalık adacık üzerinde bir kilise inşa etmesi için ilahi bir emir aldığında temeli atılan yer, sekiz yüzyıl boyunca basit bir ibadethaneden Orta Çağ'ın en iddialı mimari başarılarından birine dönüştü. Manastır kompleksi, ortaçağ mühendisliğinin bir şaheseridir — bir granit sivri tepe üzerine inşa edilmiş dikey bir şehir; binalar binaların üzerine yığılmış, yerçekimine meydan okurcasına devasa mahzenler ve payandalarla desteklenmiştir.\n\nYüzyıl Savaşları sırasında Mont Saint-Michel, kuzey Fransa'da İngilizler tarafından asla ele geçirilemeyen tek yer oldu; 119 şövalyeden oluşan küçük garnizonu, tekrarlanan kuşatma ve ablukaya karşı 30 yıldan fazla direndi. Bu mucizevi direniş, Mont'u Fransız ulusal kimliğinin ve ilahi korumanın simgesi haline getirdi. Körfez doğal bir savunma hattı işlevi görüyordu — Avrupa'nın en yüksekleri arasında yer alan 15 metreye varan gelgitleri, Victor Hugo'nun deyişiyle «dörtnala koşan bir at kadar hızlı» gelebilir, dikkatsiz hacıları bataklığa yutabilir ve kuşatma ordularını kesebilirdi.\n\nBugün Mont Saint-Michel ve körfezi UNESCO Dünya Mirası Alanı olup yılda 3 milyondan fazla ziyaretçi ağırlamaktadır. Yakın zamanda karayolu setinin kaldırılarak yerine yaya köprüsü yapılması, adanın denizcilik karakterini yeniden kazandırmaya başlamış ve denizin bu inanç, cesaret ve mimari deha anıtını bir kez daha kucaklamasını sağlamıştır.",
    historicalSignificance:
      "Mont Saint-Michel, ortaçağ Batı mimarisinin en üstün başarılarından birini ve Hristiyanlığın en önemli hac merkezlerinden birini temsil eder. Manastır, olağanüstü koşullar altında inşa edilmiş Romanesk ve Gotik mimari şaheseridir — Avrupa'nın en aşırı gelgitlerinden bazılarını barındıran bir körfezde granit bir kaya üzerine konumlandırılmıştır.\n\nAlanın önemi çok katmanlıdır. Mimari açıdan, 1211-1228 yılları arasında inşa edilen Gotik bölüm olan «La Merveille» (Harika), Sadaka Salonu, Konuk Salonu, Şövalyeler Salonu, Yemekhane ve Manastır Avlusunun kayanın kuzey yüzünde dikey olarak üst üste yığıldığı üç katlı kompleksiyle 13. yüzyıl mimarisinin en güzel örneklerinden biri kabul edilir. Eğimli bir granit sivri tepe üzerinde bunu inşa etmek için gereken mühendislik o kadar ileri düzeydeydi ki çağdaşları bunu ilahi müdahaleye bağlamışlardır.\n\nAskeri açıdan, Mont Saint-Michel'in Yüzyıl Savaşları (1337-1453) sırasındaki başarılı direnişi onu Fransız dayanıklılığının güçlü bir simgesi haline getirdi. Tüm Normandiya İngilizlerin eline düşmüşken Mont'u tutan garnizonu efsaneleşti ve alanın savunması doğrudan Jeanne d'Arc'a ilham verdi — o, Başmelek Mikail'in Fransa'yı kurtarmasını emreden sesini duymuştu.\n\nManevi açıdan Mont, ortaçağın üç büyük hac destinasyonundan biriydi (Roma ve Santiago de Compostela ile birlikte). Körfezin tehlikeli geçişi — gelgitlerin dikkatsizleri öldürebildiği yer — ruhani yolculuğun bir metaforu, dünyevi olandan kutsala bir geçiş haline geldi. Geçişten sağ çıkan ve manastıra tırmanan hacılar, kurtuluşlarını gerçekten hak ettiklerini hissettiler.",
    funFacts: [
      "Körfezdeki gelgit farkı 15 metreye kadar çıkabilir — kıta Avrupa'sının en yüksekleri arasında",
      "Victor Hugo, gelgitin «dörtnala koşan bir at kadar hızlı» geldiğini yazmıştır — yaklaşık saatte 6 km",
      "Manastır, deniz seviyesinden 92 metre yükselen Mont-Tombe adlı bir granit kaya üzerine inşa edilmiştir",
      "Yüzyıl Savaşları sırasında yalnızca 119 şövalyeden oluşan bir garnizonu tüm İngiltere'ye karşı Mont'u savundu",
      "Kulenin tepesindeki yaldızlı Aziz Mikail heykeli 1897'de yerleştirilmiştir ve deniz seviyesinden 156 metre yüksektedir",
      "Her yıl 3 milyondan fazla kişi Mont Saint-Michel'i ziyaret eder; bu onu Paris dışındaki en çok ziyaret edilen yer yapar",
      "Hapishane olarak kullanıldığında (1793-1863), «Denizlerin Bastille'i» lakabını almıştır",
      "Manastırın deniz ile gökyüzü arasında asılı kalan avlu bahçesi, 227 Caen kireçtaşı sütununa sahiptir",
      "Mont Saint-Michel, Tolkien'in Yüzüklerin Efendisi'ndeki Minas Tirith'e ilham kaynağı olmuştur",
      "Körfezdeki bataklıklar yüzyıllar boyunca sayısız can almıştır — rehberler bugün hâlâ zorunludur",
    ],
    timeline: [
      "708 - Avranches Piskoposu Aubert, Başmelek Mikail'in görünmesinden sonra ilk ibadethaneyi inşa eder",
      "966 - Benedikten rahipleri, Normandiya Dükü I. Richard döneminde manastırı kurar",
      "1017-1144 - Romanesk manastır kilisesi inşa edilir",
      "1204 - Philippe Auguste'un Breton müttefikleri kasabayı ateşe verir; manastır kısmen yıkılır",
      "1211-1228 - Gotik «La Merveille» (Harika) kompleksi inşa edilir — ortaçağ mimarisinin şaheseri",
      "1337-1453 - Yüzyıl Savaşları: Mont Saint-Michel, 30 yılı aşkın kuşatmaya rağmen İngilizlerin eline düşmez",
      "1421 - Romanesk koro çöker; Flamboyan Gotik tarzda yeniden inşa edilir (1521'de tamamlanır)",
      "1469 - XI. Louis, manastırda Aziz Mikail Nişanı'nı kurar",
      "1622 - Saint-Maur Cemaati tarafından Benedikten reformu",
      "1790 - Fransız Devrimi: rahipler sürülür, manastır hapishaneye dönüştürülür («Denizlerin Bastille'i»)",
      "1874 - Tarihi anıt olarak tescillenir; restorasyon başlar",
      "1897 - Başmelek Mikail'in yaldızlı heykeli kulenin tepesine yerleştirilir",
      "1979 - UNESCO Dünya Mirası Listesi'ne yazılır",
      "2014 - Yeni yaya köprüsü karayolu setinin yerini alarak adanın denizcilik karakterini geri kazandırır",
    ],
    tags: [
      "ortaçağ",
      "manastır",
      "gelgit adası",
      "normandiya",
      "hac",
      "gotik",
      "başmelek",
      "yüzyıl savaşları",
      "bataklık",
      "unesco",
      "fransa",
    ],
  },

  // ─────────────────────────── RUSSIAN ───────────────────────────
  ru: {
    lang: "ru",
    SK: "LANG#ru",
    "GSI2-PK": "LANG#ru",
    "GSI2-SK": now,
    title: "Мон-Сен-Мишель",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "Чудесное аббатство на приливном острове в Нормандии, увенчанное готическим шедевром, возвышающимся на 92 метра над коварными зыбучими песками — непокорённое Чудо Западного мира.",
    builder: "Епископ Обер Авраншский (основано в 708 г. н.э.)",
    historicalPeriod: "Средневековье (VIII–XVI века)",
    description:
      "Мон-Сен-Мишель — это приливная островная коммуна в Нормандии, увенчанная потрясающим готическо-романским аббатством, которое вырастает, словно видение, из морской глади — один из самых узнаваемых и духовно значимых памятников всей западной цивилизации. С эпохи Средневековья известный как «La Merveille de l'Occident» (Чудо Западного мира), остров возвышается на 92 метра над коварными приливными отмелями залива, а его силуэт определяют величественная аббатская церковь и позолоченная статуя Архангела Михаила, поражающего дракона, на вершине 156-метрового шпиля.\n\nОснованный в 708 году н.э., когда епископ Обер Авраншский получил божественное повеление от Архангела Михаила воздвигнуть храм на скалистом островке, тогда именовавшемся Мон-Томб, этот памятник на протяжении восьми столетий превратился из простой молельни в одно из самых грандиозных архитектурных свершений Средневековья. Комплекс аббатства — шедевр средневековой инженерии: вертикальный город, возведённый на гранитном пике, где здания громоздятся одно на другое, поддерживаемые мощными криптами и контрфорсами, словно бросающими вызов силе тяжести.\n\nВо время Столетней войны Мон-Сен-Мишель стал единственным местом на севере Франции, так и не захваченным англичанами: его малочисленный гарнизон из 119 рыцарей держал оборону более 30 лет, отражая бесчисленные осады и блокады. Это чудесное сопротивление сделало Мон символом французской национальной идентичности и божественного покровительства. Сам залив служил природной крепостью — его приливы, достигающие 15 метров и входящие в число самых высоких в Европе, набегали, по словам Виктора Гюго, «со скоростью скачущей лошади», поглощая неосторожных паломников в зыбучих песках и отрезая осаждающие армии.\n\nСегодня Мон-Сен-Мишель и его залив — объект Всемирного наследия ЮНЕСКО, принимающий более 3 миллионов посетителей в год. Недавний снос дамбы и её замена пешеходным мостом положили начало восстановлению морского характера острова, позволяя морю вновь обнимать этот вечный памятник вере, мужеству и архитектурному гению.",
    historicalSignificance:
      "Мон-Сен-Мишель представляет собой одно из высочайших достижений средневековой западной архитектуры и одно из важнейших мест паломничества в христианском мире. Аббатство — шедевр романской и готической архитектуры, возведённый в исключительных условиях — на гранитной скале в заливе с одними из самых экстремальных приливов в Европе.\n\nЗначение памятника многогранно. С архитектурной точки зрения «Ла Мервей» (Чудо) — готическая секция, построенная между 1211 и 1228 годами — считается одним из лучших образцов архитектуры XIII века. Её трёхуровневый комплекс, включающий Зал милостыни, Гостевой зал, Рыцарский зал, Трапезную и Клуатр, вертикально расположен на северном склоне скалы. Инженерное мастерство, потребовавшееся для возведения этого сооружения на наклонной гранитной вершине, было столь совершенным, что современники приписали его божественному вмешательству.\n\nВ военном отношении успешное сопротивление Мон-Сен-Мишеля в годы Столетней войны (1337–1453) превратило его в мощный символ французской стойкости. Гарнизон, удерживавший Мон, когда вся Нормандия пала под натиском англичан, стал легендой, а оборона этого места непосредственно вдохновила Жанну д'Арк, услышавшую голос Архангела Михаила, повелевающего ей спасти Францию.\n\nВ духовном плане Мон был одним из трёх великих средневековых мест паломничества (наряду с Римом и Сантьяго-де-Компостела). Опасная переправа через залив — где приливы могли погубить неосторожных — стала метафорой духовного странствия, перехода из мирского мира в священный. Паломники, пережившие переправу и поднявшиеся к аббатству, чувствовали, что действительно заслужили своё спасение.",
    funFacts: [
      "Приливы в заливе могут достигать перепада в 15 метров — одни из самых высоких в континентальной Европе",
      "Виктор Гюго писал, что прилив приходит «со скоростью скачущей лошади» — около 6 км/ч",
      "Аббатство построено на гранитной скале Мон-Томб, возвышающейся на 92 метра над уровнем моря",
      "Во время Столетней войны гарнизон всего из 119 рыцарей выдерживал натиск всей Англии",
      "Позолоченная статуя Архангела Михаила на вершине шпиля была установлена в 1897 году на высоте 156 метров над уровнем моря",
      "Более 3 миллионов человек ежегодно посещают Мон-Сен-Мишель, что делает его самым посещаемым местом за пределами Парижа",
      "Когда он использовался как тюрьма (1793–1863), его прозвали «Морской Бастилией»",
      "Сад клуатра аббатства, парящий между морем и небом, украшен 227 колоннами из каннского известняка",
      "Мон-Сен-Мишель послужил прообразом Минас-Тирита из «Властелина колец» Толкина",
      "Зыбучие пески залива веками уносили бесчисленные жизни — проводники необходимы и по сей день",
    ],
    timeline: [
      "708 - Епископ Обер Авраншский возводит первую молельню после видения Архангела Михаила",
      "966 - Бенедиктинские монахи основывают аббатство при герцоге Ричарде I Нормандском",
      "1017–1144 - Возведение романской аббатской церкви",
      "1204 - Бретонские союзники Филиппа Августа поджигают город; аббатство частично разрушено",
      "1211–1228 - Построен готический комплекс «Ла Мервей» (Чудо) — шедевр средневековой архитектуры",
      "1337–1453 - Столетняя война: Мон-Сен-Мишель ни разу не пал перед англичанами за более чем 30 лет осады",
      "1421 - Обрушение романского хора; перестроен в стиле пламенеющей готики (завершён в 1521)",
      "1469 - Людовик XI учреждает Орден Святого Михаила в аббатстве",
      "1622 - Бенедиктинская реформа конгрегации Святого Мавра",
      "1790 - Великая французская революция: монахи изгнаны, аббатство превращено в тюрьму («Морская Бастилия»)",
      "1874 - Признан историческим памятником; начало реставрации",
      "1897 - Позолоченная статуя Архангела Михаила установлена на шпиле",
      "1979 - Включён в список Всемирного наследия ЮНЕСКО",
      "2014 - Новый пешеходный мост заменяет дамбу, возвращая острову его морской характер",
    ],
    tags: [
      "средневековье",
      "аббатство",
      "приливной остров",
      "нормандия",
      "паломничество",
      "готика",
      "архангел",
      "столетняя война",
      "зыбучие пески",
      "юнеско",
      "франция",
    ],
  },

  // ─────────────────────────── KOREAN ───────────────────────────
  ko: {
    lang: "ko",
    SK: "LANG#ko",
    "GSI2-PK": "LANG#ko",
    "GSI2-SK": now,
    title: "몽생미셸",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "노르망디의 조수 섬 위에 우뚝 솟은 기적의 수도원, 위험한 유사 위 92미터에 솟아오른 고딕 건축의 경이 — 결코 정복되지 않은 서방 세계의 불가사의.",
    builder: "아브랑슈의 주교 오베르 (서기 708년 건립)",
    historicalPeriod: "중세 (8~16세기)",
    description:
      "몽생미셸은 노르망디에 위치한 조수 섬 코뮌으로, 바다에서 솟아오른 환영처럼 장엄한 고딕-로마네스크 양식의 수도원이 정상을 장식하고 있습니다 — 서양 문명 전체에서 가장 잘 알려지고 영적으로 깊은 의미를 지닌 랜드마크 중 하나입니다. 중세 이래로 «라 메르베유 드 록시당» (서방 세계의 경이)이라 불리는 이 섬은 만의 위험한 갯벌 위 92미터 높이로 솟아 있으며, 웅장한 수도원 성당과 156미터 첨탑 꼭대기에서 용을 무찌르는 대천사 미카엘의 금빛 조각상이 그 윤곽을 지배합니다.\n\n서기 708년 아브랑슈의 주교 오베르가 대천사 미카엘로부터 당시 몽-톰브라 불리던 바위섬에 성당을 세우라는 신의 명령을 받았을 때 시작된 이곳은, 8세기에 걸쳐 소박한 기도처에서 중세 시대 가장 야심 찬 건축 업적 중 하나로 발전했습니다. 수도원 단지는 중세 공학의 걸작입니다 — 화강암 봉우리 위에 세워진 수직 도시로, 건물 위에 건물이 쌓이고, 거대한 지하 예배당과 버트레스가 중력을 거스르는 듯 이를 지탱합니다.\n\n백년전쟁 기간 동안 몽생미셸은 북부 프랑스에서 영국군에게 결코 함락되지 않은 유일한 곳이 되었습니다. 119명의 기사로 구성된 소규모 수비대가 30년 넘게 반복되는 포위와 봉쇄에 맞서 버텼습니다. 이 기적적인 저항은 몽생미셸을 프랑스 국가 정체성과 신의 보호의 상징으로 만들었습니다. 만 자체가 천연 방어벽 역할을 했습니다 — 유럽에서 가장 높은 수준인 최대 15미터에 달하는 조수는 빅토르 위고의 표현대로 «질주하는 말처럼 빠르게» 밀려와 부주의한 순례자를 유사에 삼키고 포위군을 차단했습니다.\n\n오늘날 몽생미셸과 만은 유네스코 세계문화유산으로 지정되어 있으며 연간 300만 명 이상의 방문객을 맞이합니다. 최근 둑길을 철거하고 보행자 다리로 교체한 덕분에 섬의 해양 특성이 되살아나기 시작했으며, 바다가 다시 한번 이 영원한 신앙, 용기, 건축 천재성의 기념비를 감싸안게 되었습니다.",
    historicalSignificance:
      "몽생미셸은 중세 서양 건축의 최고 업적 중 하나이자 기독교 세계에서 가장 중요한 순례지 중 하나를 대표합니다. 수도원은 유럽에서 가장 극단적인 조수를 가진 만의 화강암 바위 위에 비범한 조건 속에서 건설된 로마네스크-고딕 건축의 걸작입니다.\n\n이곳의 중요성은 다층적입니다. 건축적으로 1211년에서 1228년 사이에 지어진 고딕 구역 «라 메르베유» (경이)는 13세기 건축의 가장 뛰어난 사례 중 하나로 꼽히며, 구호의 방, 접견실, 기사의 방, 식당, 회랑이 바위 북면에 수직으로 쌓인 3층 복합체입니다. 경사진 화강암 봉우리 위에 이것을 건설하는 데 필요한 공학 기술이 너무 앞서 있어 당대 사람들은 이를 신의 개입으로 돌렸습니다.\n\n군사적으로 백년전쟁(1337~1453) 동안 몽생미셸의 성공적인 저항은 프랑스 불굴의 의지를 상징하는 강력한 상징이 되었습니다. 노르망디 전체가 영국군 수중에 떨어졌을 때도 몽생미셸을 지킨 수비대는 전설이 되었으며, 이곳의 방어는 잔 다르크에게 직접적인 영감을 주었습니다 — 그녀는 대천사 미카엘이 프랑스를 구하라 명하는 목소리를 들었습니다.\n\n영적으로 몽생미셸은 중세의 3대 순례지(로마, 산티아고 데 콤포스텔라와 함께) 중 하나였습니다. 조수가 부주의한 이들의 목숨을 앗아갈 수 있는 만의 위험한 횡단은 영적 여정의 은유, 즉 세속에서 신성으로의 전환이 되었습니다. 횡단에서 살아남아 수도원까지 올라간 순례자들은 진정으로 구원을 얻었다고 느꼈습니다.",
    funFacts: [
      "만의 조수 차이는 최대 15미터에 달하며, 이는 유럽 대륙에서 가장 높은 수준입니다",
      "빅토르 위고는 조수가 '질주하는 말처럼 빠르게' 온다고 썼습니다 — 시속 약 6km",
      "수도원은 해발 92미터 높이의 몽-톰브라 불리는 화강암 바위 위에 지어졌습니다",
      "백년전쟁 동안 겨우 119명의 기사로 이루어진 수비대가 전 영국에 맞서 몽생미셸을 지켰습니다",
      "첨탑 꼭대기의 금빛 성 미카엘 조각상은 1897년에 설치되었으며 해발 156미터에 위치합니다",
      "매년 300만 명 이상이 몽생미셸을 방문하여 파리 외 가장 많이 방문하는 명소로 만들었습니다",
      "감옥으로 사용되었을 때(1793~1863), '바다의 바스티유'라는 별명을 얻었습니다",
      "수도원의 회랑 정원은 바다와 하늘 사이에 떠 있으며, 캉 석회암으로 된 227개의 기둥을 갖추고 있습니다",
      "몽생미셸은 톨킨의 반지의 제왕에 나오는 미나스 티리스의 영감이 되었습니다",
      "만의 유사는 수세기에 걸쳐 수많은 생명을 앗아갔으며, 오늘날에도 가이드 동행이 필수입니다",
    ],
    timeline: [
      "708 - 아브랑슈의 주교 오베르가 대천사 미카엘의 현현 후 첫 기도처를 세움",
      "966 - 노르망디 공작 리샤르 1세 치하에서 베네딕도회 수도사들이 수도원 설립",
      "1017-1144 - 로마네스크 양식의 수도원 성당 건설",
      "1204 - 필리프 오귀스트의 브르타뉴 동맹군이 도시에 방화; 수도원 일부 파괴",
      "1211-1228 - 고딕 양식의 '라 메르베유' (경이) 복합체 건설 — 중세 건축의 걸작",
      "1337-1453 - 백년전쟁: 30년 넘는 포위에도 몽생미셸은 결코 영국군에게 함락되지 않음",
      "1421 - 로마네스크 성가대석 붕괴; 화려한 고딕 양식으로 재건 (1521년 완공)",
      "1469 - 루이 11세가 수도원에서 성 미카엘 기사단을 창설",
      "1622 - 생-모르 수도회에 의한 베네딕도회 개혁",
      "1790 - 프랑스 혁명: 수도사 추방, 수도원이 감옥으로 전환 ('바다의 바스티유')",
      "1874 - 역사 기념물로 지정; 복원 착수",
      "1897 - 대천사 미카엘의 금빛 조각상이 첨탑 꼭대기에 설치",
      "1979 - 유네스코 세계문화유산 등재",
      "2014 - 새 보행자 다리가 둑길을 대체하여 섬의 해양 특성 복원",
    ],
    tags: [
      "중세",
      "수도원",
      "조수섬",
      "노르망디",
      "순례",
      "고딕",
      "대천사",
      "백년전쟁",
      "유사",
      "유네스코",
      "프랑스",
    ],
  },

  // ─────────────────────────── GERMAN ───────────────────────────
  de: {
    lang: "de",
    SK: "LANG#de",
    "GSI2-PK": "LANG#de",
    "GSI2-SK": now,
    title: "Mont Saint-Michel",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "Eine wundersame Gezeiteninseln-Abtei in der Normandie, gekrönt von einem gotischen Meisterwerk, das sich 92 Meter über tückischen Treibsandfluten erhebt — das unbezwungene Weltwunder des Abendlandes.",
    builder: "Bischof Aubert von Avranches (gegründet 708 n. Chr.)",
    historicalPeriod: "Mittelalter (8.–16. Jahrhundert)",
    description:
      "Der Mont Saint-Michel ist eine Gezeiteninselgemeinde in der Normandie, gekrönt von einer atemberaubenden gotisch-romanischen Abtei, die sich wie eine Vision aus dem Meer erhebt — eines der bekanntesten und spirituell aufgeladensten Wahrzeichen der gesamten westlichen Zivilisation. Seit dem Mittelalter als «La Merveille de l'Occident» (Das Wunder der westlichen Welt) bekannt, ragt die Insel 92 Meter über den tückischen Gezeitenwatten der Bucht empor, ihre Silhouette geprägt von der aufragenden Abteikirche und der vergoldeten Statue des Erzengels Michael, der auf der Spitze des 156 Meter hohen Turms den Drachen erschlägt.\n\nGegründet im Jahr 708 n. Chr., als Bischof Aubert von Avranches einen göttlichen Auftrag des Erzengels Michael erhielt, auf der felsigen Insel, die damals Mont-Tombe hieß, eine Kirche zu errichten, entwickelte sich die Stätte über acht Jahrhunderte von einem schlichten Bethaus zu einer der ehrgeizigsten architektonischen Leistungen des Mittelalters. Der Abteikomplex ist ein Meisterwerk mittelalterlicher Ingenieurskunst — eine vertikale Stadt, erbaut auf einem Granitfelsen, mit Gebäuden, die sich übereinandertürmen, gestützt von gewaltigen Krypten und Strebepfeilern, die der Schwerkraft zu trotzen scheinen.\n\nWährend des Hundertjährigen Krieges wurde der Mont Saint-Michel zum einzigen Ort in Nordfrankreich, der niemals von den Engländern eingenommen wurde: Seine kleine Garnison von nur 119 Rittern hielt über 30 Jahre lang wiederholten Belagerungen und Blockaden stand. Dieser wundersame Widerstand machte den Mont zum Symbol der französischen nationalen Identität und des göttlichen Schutzes. Die Bucht selbst diente als natürliche Verteidigung — ihre Gezeiten, die mit bis zu 15 Metern zu den höchsten in Europa zählen, konnten laut Victor Hugo «so schnell wie ein galoppierendes Pferd» hereinbrechen, ahnungslose Pilger im Treibsand verschlingen und Belagerungsheere abschneiden.\n\nHeute sind der Mont Saint-Michel und seine Bucht UNESCO-Welterbestätte und empfangen jährlich über 3 Millionen Besucher. Der kürzliche Abriss des Damms und sein Ersatz durch eine Fußgängerbrücke haben begonnen, den maritimen Charakter der Insel wiederherzustellen und dem Meer zu ermöglichen, dieses ewige Denkmal des Glaubens, des Mutes und der architektonischen Genialität erneut zu umspülen.",
    historicalSignificance:
      "Der Mont Saint-Michel stellt eine der höchsten Errungenschaften der mittelalterlichen westlichen Architektur und eine der bedeutendsten Pilgerstätten der Christenheit dar. Die Abtei ist ein Meisterwerk romanischer und gotischer Baukunst, errichtet unter außergewöhnlichen Bedingungen — auf einem Granitfelsen in einer Bucht mit einigen der extremsten Gezeiten Europas.\n\nDie Bedeutung der Stätte ist vielschichtig. Architektonisch gilt «La Merveille» (Das Wunder), der gotische Abschnitt, der zwischen 1211 und 1228 erbaut wurde, als eines der schönsten Beispiele der Architektur des 13. Jahrhunderts. Sein dreigeschossiger Komplex aus Almosensaal, Gästesaal, Rittersaal, Refektorium und Kreuzgang ist vertikal an der Nordflanke des Felsens übereinandergestapelt. Die Ingenieurskunst, die nötig war, um dies auf einem geneigten Granitfelsen zu errichten, war so fortschrittlich, dass Zeitgenossen sie göttlicher Fügung zuschrieben.\n\nMilitärisch machte der erfolgreiche Widerstand des Mont Saint-Michel während des Hundertjährigen Krieges (1337–1453) ihn zu einem mächtigen Symbol französischer Widerstandskraft. Die Garnison, die den Mont hielt, als ganz Normandie an die Engländer gefallen war, wurde legendär, und die Verteidigung der Stätte inspirierte unmittelbar Jeanne d'Arc, die die Stimme des Erzengels Michael hörte, der ihr befahl, Frankreich zu retten.\n\nIn spiritueller Hinsicht war der Mont eines der drei großen mittelalterlichen Pilgerziele (neben Rom und Santiago de Compostela). Die gefährliche Überquerung der Bucht — wo Gezeiten Unvorsichtigen das Leben kosten konnten — wurde zur Metapher für die geistliche Reise, ein Übergang von der profanen in die heilige Welt. Pilger, die die Überquerung überlebten und zur Abtei aufstiegen, empfanden, dass sie sich ihr Seelenheil wahrlich verdient hatten.",
    funFacts: [
      "Der Gezeitenunterschied in der Bucht kann bis zu 15 Meter betragen — einer der höchsten im kontinentalen Europa",
      "Victor Hugo schrieb, die Flut komme «so schnell wie ein galoppierendes Pferd» — mit etwa 6 km/h",
      "Die Abtei ist auf einem Granitfelsen namens Mont-Tombe erbaut, der sich 92 Meter über den Meeresspiegel erhebt",
      "Während des Hundertjährigen Krieges hielt eine Garnison von nur 119 Rittern den Mont gegen ganz England",
      "Die vergoldete Statue des Hl. Michael auf der Turmspitze wurde 1897 aufgestellt und befindet sich 156 Meter über dem Meeresspiegel",
      "Über 3 Millionen Menschen besuchen den Mont Saint-Michel jährlich — die meistbesuchte Sehenswürdigkeit außerhalb von Paris",
      "Als er als Gefängnis diente (1793–1863), erhielt er den Spitznamen «Bastille der Meere»",
      "Der Kreuzgang-Garten der Abtei, schwebend zwischen Meer und Himmel, besitzt 227 Säulen aus Caen-Kalkstein",
      "Der Mont Saint-Michel diente als Inspiration für Minas Tirith in Tolkiens Herr der Ringe",
      "Der Treibsand in der Bucht hat über die Jahrhunderte unzählige Menschenleben gefordert — Führer sind bis heute unerlässlich",
    ],
    timeline: [
      "708 - Bischof Aubert von Avranches errichtet das erste Bethaus nach einer Vision des Erzengels Michael",
      "966 - Benediktinermönche gründen die Abtei unter Herzog Richard I. der Normandie",
      "1017–1144 - Bau der romanischen Abteikirche",
      "1204 - Bretonische Verbündete Philipps II. setzen die Stadt in Brand; die Abtei wird teilweise zerstört",
      "1211–1228 - Bau des gotischen Komplexes «La Merveille» (Das Wunder) — Meisterwerk mittelalterlicher Architektur",
      "1337–1453 - Hundertjähriger Krieg: Der Mont Saint-Michel fällt trotz über 30-jähriger Belagerung nie an die Engländer",
      "1421 - Der romanische Chor stürzt ein; wird im flamboyanten Gotikstil wiederaufgebaut (vollendet 1521)",
      "1469 - Ludwig XI. stiftet den Orden des Heiligen Michael in der Abtei",
      "1622 - Benediktinerreform durch die Kongregation von Saint-Maur",
      "1790 - Französische Revolution: Mönche vertrieben, Abtei wird zum Gefängnis («Bastille der Meere»)",
      "1874 - Als historisches Denkmal eingestuft; Restaurierung beginnt",
      "1897 - Die vergoldete Statue des Erzengels Michael wird auf der Turmspitze aufgestellt",
      "1979 - Aufnahme in die Liste des UNESCO-Welterbes",
      "2014 - Neue Fußgängerbrücke ersetzt den Damm und gibt der Insel ihren maritimen Charakter zurück",
    ],
    tags: [
      "mittelalter",
      "abtei",
      "gezeiteninsel",
      "normandie",
      "pilgerfahrt",
      "gotik",
      "erzengel",
      "hundertjähriger krieg",
      "treibsand",
      "unesco",
      "frankreich",
    ],
  },

  // ─────────────────────────── JAPANESE ───────────────────────────
  ja: {
    lang: "ja",
    SK: "LANG#ja",
    "GSI2-PK": "LANG#ja",
    "GSI2-SK": now,
    title: "モン・サン＝ミシェル",
    nameLocal: "Mont Saint-Michel",
    shortDescription:
      "ノルマンディーの潮汐島にそびえる奇跡の修道院。危険な流砂の潮流の上92メートルに聳えるゴシック建築の驚異——不落の西洋の驚嘆。",
    builder: "アヴランシュ司教オベール（西暦708年創建）",
    historicalPeriod: "中世（8～16世紀）",
    description:
      "モン・サン＝ミシェルはノルマンディーに位置する潮汐島のコミューンで、海から立ち現れた幻のように壮麗なゴシック・ロマネスク様式の修道院が頂を飾っています。西洋文明全体の中で最も知られ、最も霊的な意味を帯びたランドマークの一つです。中世以来「ラ・メルヴェイユ・ド・ロクシダン」（西洋世界の驚異）と称されるこの島は、湾の危険な干潟の上方92メートルにそびえ立ち、荘厳な修道院聖堂と、156メートルの尖塔の頂で龍を退治する大天使ミカエルの金色の像がそのシルエットを印象づけます。\n\n西暦708年、アヴランシュ司教オベールが大天使ミカエルから、当時モン・トンブと呼ばれていた岩の小島に教会を建てよという神託を受けたことに始まり、この地は8世紀にわたって素朴な祈祷所から中世で最も野心的な建築の偉業の一つへと発展しました。修道院群は中世工学の傑作です——花崗岩の尖峰の上に築かれた垂直の都市で、建物の上に建物が積み重ねられ、巨大な地下聖堂と控壁によって重力に逆らうかのように支えられています。\n\n百年戦争の間、モン・サン＝ミシェルは北フランスでイギリス軍に一度も陥落しなかった唯一の場所となりました。わずか119名の騎士からなる小さな守備隊が、30年以上にわたる繰り返しの包囲と封鎖に耐え抜いたのです。この奇跡的な抵抗は、モン・サン＝ミシェルをフランスの国民的アイデンティティと神の加護の象徴としました。湾そのものが天然の防壁でした。ヨーロッパでも屈指の最大15メートルに達する潮汐は、ヴィクトル・ユゴーの言葉によれば「駆ける馬のように速く」押し寄せ、不注意な巡礼者を流砂に飲み込み、包囲軍を孤立させました。\n\n今日、モン・サン＝ミシェルとその湾はユネスコ世界遺産に登録され、年間300万人以上の訪問者を迎えています。近年の堤防道路の撤去と歩道橋への架け替えにより、島の海洋的性格の復活が始まり、海が再びこの信仰、勇気、建築の天才に捧げられた永遠の記念碑を抱くようになりました。",
    historicalSignificance:
      "モン・サン＝ミシェルは、中世西洋建築の最高の偉業の一つであり、キリスト教世界で最も重要な巡礼地の一つを体現しています。修道院は、ヨーロッパでも最も極端な潮汐を持つ湾の花崗岩の上に、驚異的な条件のもとで建設されたロマネスク・ゴシック建築の傑作です。\n\nこの遺跡の重要性は多層的です。建築的には、1211年から1228年にかけて建設されたゴシック部分「ラ・メルヴェイユ」（驚異）は、13世紀建築の最も優れた例の一つと見なされています。施善の間、賓客の間、騎士の間、食堂、回廊からなる三層の建築群が岩の北面に垂直に積み上げられています。傾斜した花崗岩の尖峰の上にこれを建設するために必要だった工学技術は極めて高度であり、同時代の人々は神の介在に帰しました。\n\n軍事的には、百年戦争（1337～1453年）中のモン・サン＝ミシェルの防衛の成功は、フランスの不屈の精神の力強い象徴となりました。ノルマンディー全土がイギリス軍の手に落ちたにもかかわらずモン・サン＝ミシェルを守り抜いた守備隊は伝説となり、この地の防衛はジャンヌ・ダルクに直接的な霊感を与えました。彼女は大天使ミカエルがフランスを救えと命じる声を聞いたのです。\n\n霊的には、モン・サン＝ミシェルは中世の三大巡礼地の一つでした（ローマ、サンティアゴ・デ・コンポステーラと並んで）。潮汐が不注意な者の命を奪いかねない湾の危険な横断は、霊的な旅路の隠喩——俗世から聖なる世界への渡り——となりました。横断を生き延び、修道院まで登り詰めた巡礼者たちは、自らの救済を真に勝ち取ったと感じたのです。",
    funFacts: [
      "湾の潮位差は最大15メートルに達し、ヨーロッパ大陸で最も大きい部類に入ります",
      "ヴィクトル・ユゴーは潮が「駆ける馬のように速く」押し寄せると書きました——時速約6キロメートル",
      "修道院は海抜92メートルにそびえるモン・トンブと呼ばれる花崗岩の上に建てられています",
      "百年戦争中、わずか119名の騎士からなる守備隊がイングランド全軍に対してモン・サン＝ミシェルを守り抜きました",
      "尖塔頂部の金色の聖ミカエル像は1897年に設置され、海抜156メートルに位置しています",
      "毎年300万人以上がモン・サン＝ミシェルを訪れ、パリ以外で最も人気のある観光地となっています",
      "監獄として使用されていた時代（1793～1863年）には「海のバスティーユ」と呼ばれていました",
      "修道院の回廊庭園は海と空の間に浮かぶように佇み、カーン産石灰岩の柱227本を有しています",
      "モン・サン＝ミシェルはトールキンの『指輪物語』に登場するミナス・ティリスの着想源となりました",
      "湾の流砂は何世紀にもわたって数え切れない命を奪ってきました——今日でもガイドの同行は不可欠です",
    ],
    timeline: [
      "708年 - アヴランシュ司教オベールが大天使ミカエルの出現を受けて最初の祈祷所を建立",
      "966年 - ノルマンディー公リシャール1世のもとでベネディクト会修道士が修道院を設立",
      "1017～1144年 - ロマネスク様式の修道院聖堂が建設される",
      "1204年 - フィリップ2世のブルターニュ同盟軍が町に放火；修道院が部分的に破壊される",
      "1211～1228年 - ゴシック様式の「ラ・メルヴェイユ」（驚異）が建設される——中世建築の傑作",
      "1337～1453年 - 百年戦争：30年以上の包囲にもかかわらずモン・サン＝ミシェルはイングランドに落ちず",
      "1421年 - ロマネスク様式の聖歌隊席が崩壊；フランボワイアン・ゴシック様式で再建（1521年完成）",
      "1469年 - ルイ11世が修道院に聖ミカエル騎士団を設立",
      "1622年 - サン＝モール修道会によるベネディクト会改革",
      "1790年 - フランス革命：修道士が追放され、修道院は監獄に転用される（「海のバスティーユ」）",
      "1874年 - 歴史的建造物に指定；修復が始まる",
      "1897年 - 大天使ミカエルの金色の像が尖塔頂部に設置される",
      "1979年 - ユネスコ世界遺産に登録",
      "2014年 - 新しい歩道橋が堤防道路に代わり、島の海洋的性格を復活させる",
    ],
    tags: [
      "中世",
      "修道院",
      "潮汐島",
      "ノルマンディー",
      "巡礼",
      "ゴシック",
      "大天使",
      "百年戦争",
      "流砂",
      "ユネスコ",
      "フランス",
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */

async function main() {
  const langs = Object.keys(translations);
  console.log(
    `${DRY_RUN ? "[DRY RUN] " : ""}Pushing ${langs.length} translations for mont-saint-michel to table "${TABLE}"...\n`
  );

  for (const [lang, data] of Object.entries(translations)) {
    const item = { ...base, ...data };
    console.log(`  ${DRY_RUN ? "[skip] " : ""}${lang} — ${item.title}`);

    if (!DRY_RUN) {
      await docClient.send(
        new PutCommand({
          TableName: TABLE,
          Item: item,
        })
      );
      console.log(`    ✓ pushed`);
    }
  }

  console.log(`\nDone. ${langs.length} languages processed. updatedAt = ${now}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
