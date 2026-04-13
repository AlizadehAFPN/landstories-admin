import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───────────────────────────
const shared = {
  siteId: "babylon",
  storyId: "hanging-gardens",
  icon: "\u{1F33F}",
  tier: "S",
  source:
    "Josephus, Contra Apionem I.19 (quoting Berossus, Babyloniaca c. 290 BCE); Diodorus Siculus, Bibliotheca Historica II.10; Strabo, Geography XVI.1.5; Philo of Byzantium, De Septem Orbis Spectaculis; Dalley, Stephanie. The Mystery of the Hanging Garden of Babylon, Oxford University Press, 2013; Koldewey, Robert. The Excavations at Babylon, 1914; Finkel, Irving. The Ark Before Noah, Hodder & Stoughton, 2014; Reade, Julian. 'Alexander the Great and the Hanging Gardens of Babylon,' Iraq 62, 2000",
  era: "c. 600 BCE (traditional date); first written accounts c. 290 BCE; archaeological debate ongoing",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lng: 44.4209, lat: 32.5363 },
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "love_heartbreak",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════
// SPANISH
// Proverb subverted: "A la tercera va la vencida"
// ═══════════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#hanging-gardens",
  title: "Los jardines que nadie encontr\u00f3",
  subtitle:
    "La \u00fanica maravilla del mundo antiguo construida por amor \u2014 y la \u00fanica que quiz\u00e1 nunca existi\u00f3",
  excerpt:
    "De las Siete Maravillas del Mundo Antiguo, seis est\u00e1n localizadas. La Gran Pir\u00e1mide sigue en pie. De las otras se hallaron ruinas. Pero los Jardines Colgantes de Babilonia \u2014 la \u00fanica maravilla construida no para un dios ni para la gloria, sino por amor \u2014 no han aparecido jam\u00e1s.",
  characters: [
    "Nabucodonosor II \u2014 el rey que supuestamente construy\u00f3 los jardines por amor",
    "Amitis de Media \u2014 su reina nost\u00e1lgica que a\u00f1oraba las monta\u00f1as verdes de su tierra",
    "Beroso \u2014 sacerdote babilonio cuyo relato perdido (c. 290 a.C.) es la fuente m\u00e1s antigua",
    "Stephanie Dalley \u2014 asiri\u00f3loga de Oxford que argument\u00f3 que los jardines estaban en N\u00ednive",
    "Robert Koldewey \u2014 arque\u00f3logo que crey\u00f3 haber encontrado los cimientos del jard\u00edn en 1899",
  ],
  moralOrLesson:
    "El jard\u00edn m\u00e1s hermoso de la historia quiz\u00e1 nunca existi\u00f3 \u2014 o quiz\u00e1 existi\u00f3 en otro lugar, construido por otro rey por razones que nada ten\u00edan que ver con el amor. Pero la historia perdura porque responde a algo m\u00e1s profundo de lo que la arqueolog\u00eda puede alcanzar: la convicci\u00f3n de que el amor, cuando es suficientemente grande, puede hacer florecer lo imposible. Da igual si las terrazas estaban en Babilonia o en N\u00ednive, si la reina fue Amitis o una invenci\u00f3n de siglos posteriores. Los Jardines Colgantes siguen siendo el monumento m\u00e1s antiguo de la humanidad a una idea: que construimos nuestras mayores maravillas no para nosotros mismos, sino para quienes no soportamos ver infelices.",
  paragraphs: [
    {
      text: "De las Siete Maravillas del Mundo Antiguo, seis est\u00e1n localizadas. La Gran Pir\u00e1mide sigue en pie. Del resto se encontraron ruinas, cimientos, algo. Pero de los Jardines Colgantes de Babilonia no ha aparecido nada. Ni una piedra. Ni una ra\u00edz. Ni un solo ladrillo. Son el jard\u00edn m\u00e1s famoso de la historia de la humanidad y es perfectamente posible que jam\u00e1s hayan existido.",
    },
    {
      text: "La historia va as\u00ed. Hacia el a\u00f1o 600 a.C., Nabucodonosor II, el rey m\u00e1s poderoso del mundo, se cas\u00f3 con Amitis, una princesa de Media, lo que hoy es Ir\u00e1n. Ella hab\u00eda crecido entre arroyos y valles que reverdec\u00edan tras cada lluvia. Luego lleg\u00f3 a Babilonia: llanura parda, veranos de cincuenta grados, nada salvo palmeras datileras y canales. Estaba consumida por la nostalgia. Entonces su marido \u2014 un hombre que hab\u00eda conquistado naciones y reducido a cenizas el Templo de Jerusal\u00e9n \u2014 decidi\u00f3 arreglarlo. Le construir\u00eda una monta\u00f1a.",
    },
    {
      text: "Los escritores antiguos se desbordaron con las descripciones. Diodoro de Sicilia, siglos despu\u00e9s, asegur\u00f3 que los jardines med\u00edan 120 metros por lado y se elevaban en terrazas de veinte metros de alto. Cada nivel estaba impermeabilizado con ca\u00f1as, ladrillos y plomo, y despu\u00e9s cubierto con tierra suficiente para sostener \u00e1rboles adultos. El agua se bombeaba desde el \u00c9ufrates hasta la cima mediante un mecanismo de tornillo y luego ca\u00eda en cascada por canales. Un autor lo llam\u00f3 \u00abuna primavera eterna suspendida sobre quienes caminaban abajo\u00bb.",
    },
    {
      text: "El problema: nada de eso se sostiene. Nabucodonosor dej\u00f3 cientos de inscripciones sobre sus obras \u2014 murallas, puertas, templos, palacios. Jam\u00e1s mencion\u00f3 un jard\u00edn. Ni una sola vez. Her\u00f3doto visit\u00f3 Babilonia un siglo despu\u00e9s y describi\u00f3 la ciudad con todo detalle. Tampoco habla de jardines. El primer relato conocido es de tres siglos despu\u00e9s de la muerte del rey. Los arque\u00f3logos excavaron Babilonia durante dieciocho a\u00f1os desde 1899 y no encontraron nada. Dicen que a la tercera va la vencida, pero estos jardines llevan veintis\u00e9is siglos sin dejarse encontrar.",
    },
    {
      text: "En 2013, la investigadora de Oxford Stephanie Dalley puso todo patas arriba. Los jardines existieron, dijo, pero no en Babilonia. Estaban en N\u00ednive, 450 kil\u00f3metros al norte, construidos por el rey asirio Senaquerib un siglo antes. Sus inscripciones describen jardines en terrazas alimentados por tornillos de bronce y un acueducto de ochenta kil\u00f3metros desde las monta\u00f1as. Un relieve de su palacio, hoy en el Museo Brit\u00e1nico, muestra jardines sobre columnas que encajan perfectamente con las descripciones antiguas. Los autores cl\u00e1sicos, seg\u00fan Dalley, simplemente confundieron las ciudades.",
    },
    {
      text: "Hasta el nombre enga\u00f1a. \u00abColgantes\u00bb viene del griego kremastos, que no significa suspendidos en el aire. Significa que sobresalen, como una terraza derram\u00e1ndose sobre la siguiente. Imagina una colina escalonada de \u00e1rboles y flores, cada nivel vertiendo verde sobre el borde del anterior, todo alz\u00e1ndose desde el desierto como algo que no deber\u00eda existir. No era un jard\u00edn en el cielo. Era un bosque haci\u00e9ndose pasar por monta\u00f1a.",
    },
    {
      text: "Quiz\u00e1 el debate no se resuelva nunca. Quiz\u00e1 los jardines est\u00e9n en Babilonia, bajo el nivel fre\u00e1tico donde nadie puede excavar. Quiz\u00e1 en N\u00ednive. Quiz\u00e1 fueron un collage de relatos de viajeros y nunca existieron como un solo lugar. Pero hay algo que no se ha borrado en veintis\u00e9is siglos: la historia de un rey que mir\u00f3 la ciudad m\u00e1s poderosa del mundo, pens\u00f3 \u00abella es infeliz\u00bb, y luego intent\u00f3 levantar una monta\u00f1a para remediarlo. Los jardines desaparecieron. La historia de amor, no. Quiz\u00e1 esa sea la verdadera maravilla.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// FRENCH
// Proverb subverted: "L'homme propose, Dieu dispose"
// ═══════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#hanging-gardens",
  title: "Les jardins qu\u2019on n\u2019a jamais trouv\u00e9s",
  subtitle:
    "La seule merveille du monde antique b\u00e2tie par amour \u2014 et la seule qui n\u2019a peut-\u00eatre jamais exist\u00e9",
  excerpt:
    "Des Sept Merveilles du monde antique, six ont \u00e9t\u00e9 retrouv\u00e9es. La Grande Pyramide est toujours debout. Des autres, on a retrouv\u00e9 des ruines. Mais les Jardins suspendus de Babylone \u2014 la seule merveille construite non pour un dieu ni pour la gloire, mais par amour \u2014 n\u2019ont jamais \u00e9t\u00e9 retrouv\u00e9s.",
  characters: [
    "Nabuchodonosor II \u2014 le roi qui aurait b\u00e2ti les jardins par amour",
    "Amytis de M\u00e9die \u2014 sa reine nostalgique qui languissait apr\u00e8s les montagnes vertes de sa terre natale",
    "B\u00e9rose \u2014 pr\u00eatre babylonien dont le r\u00e9cit perdu (v. 290 av. J.-C.) est la source la plus ancienne",
    "Stephanie Dalley \u2014 assyriologue d\u2019Oxford qui a soutenu que les jardins se trouvaient \u00e0 Ninive",
    "Robert Koldewey \u2014 arch\u00e9ologue qui crut avoir trouv\u00e9 les fondations du jardin en 1899",
  ],
  moralOrLesson:
    "Le plus beau jardin de l\u2019histoire n\u2019a peut-\u00eatre jamais exist\u00e9 \u2014 ou peut-\u00eatre a-t-il exist\u00e9 ailleurs, b\u00e2ti par un autre roi pour des raisons qui n\u2019avaient rien \u00e0 voir avec l\u2019amour. Mais l\u2019histoire perdure parce qu\u2019elle r\u00e9pond \u00e0 quelque chose de plus profond que ce que l\u2019arch\u00e9ologie peut atteindre : la conviction que l\u2019amour, quand il est assez grand, peut faire fleurir l\u2019impossible. Que les terrasses aient \u00e9t\u00e9 \u00e0 Babylone ou \u00e0 Ninive, que la reine ait \u00e9t\u00e9 Amytis ou une invention des si\u00e8cles suivants, les Jardins suspendus restent le plus ancien monument de l\u2019humanit\u00e9 \u00e0 une id\u00e9e : nous b\u00e2tissons nos plus grandes merveilles non pour nous-m\u00eames, mais pour ceux que nous ne supportons pas de voir malheureux.",
  paragraphs: [
    {
      text: "Des Sept Merveilles du monde antique, six ont \u00e9t\u00e9 retrouv\u00e9es. La Grande Pyramide est toujours debout. Des autres, on a retrouv\u00e9 des ruines, des fondations, quelque chose. Mais les Jardins suspendus de Babylone n\u2019ont jamais \u00e9t\u00e9 retrouv\u00e9s. Pas une pierre. Pas une racine. Pas une seule brique. Ce sont les jardins les plus c\u00e9l\u00e8bres de l\u2019histoire, et il est tout \u00e0 fait possible qu\u2019ils n\u2019aient jamais exist\u00e9.",
    },
    {
      text: "L\u2019histoire est la suivante. Vers 600 avant notre \u00e8re, Nabuchodonosor II \u2014 le roi le plus puissant de la plan\u00e8te \u2014 \u00e9pousa Amytis, une princesse de M\u00e9die, dans l\u2019actuel Iran. Elle avait grandi au milieu de ruisseaux frais et de vall\u00e9es qui verdissaient apr\u00e8s chaque pluie. Puis elle arriva \u00e0 Babylone : une plaine aride, des \u00e9t\u00e9s \u00e0 cinquante degr\u00e9s, rien que des palmiers-dattiers et des canaux. Le mal du pays la rongeait. Alors son mari \u2014 un homme qui avait conquis des nations et r\u00e9duit en cendres le Temple de J\u00e9rusalem \u2014 d\u00e9cida d\u2019y rem\u00e9dier. Il allait lui construire une montagne.",
    },
    {
      text: "Les auteurs antiques ne se sont pas retenus. Diodore de Sicile, \u00e9crivant des si\u00e8cles plus tard, d\u00e9crivit des jardins de 120 m\u00e8tres de c\u00f4t\u00e9, montant en terrasses de vingt m\u00e8tres de haut. Chaque niveau \u00e9tait rendu \u00e9tanche avec des roseaux, des briques et du plomb, puis rempli d\u2019assez de terre pour supporter des arbres adultes. L\u2019eau de l\u2019Euphrate montait au sommet gr\u00e2ce \u00e0 un m\u00e9canisme \u00e0 vis, puis redescendait en cascades \u00e0 travers des canaux. Un auteur parla d\u2019\u00ab un printemps \u00e9ternel, suspendu au-dessus de ceux qui marchaient en contrebas \u00bb.",
    },
    {
      text: "Le probl\u00e8me : rien de tout cela ne tient. Nabuchodonosor a laiss\u00e9 des centaines d\u2019inscriptions sur ses chantiers \u2014 murailles, portes, temples, palais. Il n\u2019a jamais mentionn\u00e9 un jardin. Pas une seule fois. H\u00e9rodote a visit\u00e9 Babylone un si\u00e8cle plus tard et a d\u00e9crit la ville dans les moindres d\u00e9tails. Aucun jardin. Le premier r\u00e9cit connu date de trois si\u00e8cles apr\u00e8s la mort du roi. Des arch\u00e9ologues ont fouill\u00e9 Babylone pendant dix-huit ans \u00e0 partir de 1899 et n\u2019ont rien trouv\u00e9. L\u2019homme propose, Dieu dispose \u2014 et apparemment, Dieu a dispos\u00e9 de toute trace.",
    },
    {
      text: "En 2013, la chercheuse d\u2019Oxford Stephanie Dalley a tout remis en question. Les jardins ont bien exist\u00e9, affirma-t-elle, mais pas \u00e0 Babylone. Ils se trouvaient \u00e0 Ninive, 450 kilom\u00e8tres plus au nord, construits par le roi assyrien Sennach\u00e9rib un si\u00e8cle plus t\u00f4t. Ses inscriptions d\u00e9crivent des jardins en terrasses aliment\u00e9s par des vis en bronze et un aqueduc de quatre-vingts kilom\u00e8tres depuis les montagnes. Un bas-relief de son palais, aujourd\u2019hui au British Museum, montre des jardins sur colonnes qui correspondent parfaitement aux descriptions antiques. Les auteurs anciens, selon Dalley, avaient simplement confondu les villes.",
    },
    {
      text: "M\u00eame le nom est trompeur. \u00ab Suspendus \u00bb vient du grec kremastos, qui ne signifie pas accroch\u00e9s dans le vide. Cela signifie en surplomb \u2014 comme une terrasse qui d\u00e9borde sur la suivante. Imaginez une colline en gradins couverte d\u2019arbres et de fleurs, chaque niveau laissant retomber sa verdure par-dessus le bord, le tout s\u2019\u00e9levant depuis le d\u00e9sert plat comme quelque chose qui n\u2019aurait pas d\u00fb exister. Ce n\u2019\u00e9tait pas un jardin dans le ciel. C\u2019\u00e9tait une for\u00eat qui se faisait passer pour une montagne.",
    },
    {
      text: "Le d\u00e9bat ne sera peut-\u00eatre jamais tranch\u00e9. Les jardins sont peut-\u00eatre \u00e0 Babylone, enfouis sous la nappe phr\u00e9atique, hors de port\u00e9e de toute fouille. Peut-\u00eatre \u00e0 Ninive. Peut-\u00eatre n\u2019\u00e9taient-ils qu\u2019un patchwork de r\u00e9cits de voyageurs, un lieu qui n\u2019a jamais exist\u00e9 en un seul endroit. Mais il y a une chose que vingt-six si\u00e8cles n\u2019ont pas effac\u00e9e : l\u2019histoire d\u2019un roi qui a regard\u00e9 la ville la plus puissante du monde et s\u2019est dit : elle est malheureuse \u2014 puis a essay\u00e9 de faire surgir une montagne pour y rem\u00e9dier. Les jardins ont disparu. L\u2019histoire d\u2019amour, elle, est rest\u00e9e. C\u2019est peut-\u00eatre \u00e7a, la vraie merveille.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// GERMAN
// Proverb subverted: "Gottes Mühlen mahlen langsam"
// ═══════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#hanging-gardens",
  title: "Die G\u00e4rten, die niemand fand",
  subtitle:
    "Das einzige Weltwunder, das aus Liebe gebaut wurde \u2014 und das einzige, das vielleicht nie existierte",
  excerpt:
    "Von den Sieben Weltwundern der Antike sind sechs nachgewiesen. Die Gro\u00dfe Pyramide steht noch. Von den anderen hat man Ruinen gefunden. Aber die H\u00e4ngenden G\u00e4rten von Babylon \u2014 das einzige Weltwunder, das nicht f\u00fcr einen Gott oder f\u00fcr den Ruhm, sondern aus Liebe gebaut wurde \u2014 sind nie aufgetaucht.",
  characters: [
    "Nebukadnezar II. \u2014 der K\u00f6nig, der die G\u00e4rten angeblich aus Liebe erbauen lie\u00df",
    "Amytis von Medien \u2014 seine von Heimweh geplagte K\u00f6nigin, die sich nach den gr\u00fcnen Bergen ihrer Heimat sehnte",
    "Berossos \u2014 babylonischer Priester, dessen verlorener Bericht (ca. 290 v. Chr.) die \u00e4lteste Quelle ist",
    "Stephanie Dalley \u2014 Oxford-Assyriologin, die argumentierte, die G\u00e4rten seien in Ninive gewesen",
    "Robert Koldewey \u2014 Ausgr\u00e4ber, der 1899 glaubte, die Fundamente des Gartens gefunden zu haben",
  ],
  moralOrLesson:
    "Der sch\u00f6nste Garten der Geschichte hat vielleicht nie existiert \u2014 oder er existierte an einem ganz anderen Ort, erbaut von einem anderen K\u00f6nig aus Gr\u00fcnden, die nichts mit Liebe zu tun hatten. Aber die Geschichte \u00fcberdauert, weil sie etwas beantwortet, das tiefer reicht als jede Ausgrabung: die \u00dcberzeugung, dass Liebe, wenn sie gro\u00df genug ist, das Unm\u00f6gliche zum Bl\u00fchen bringen kann. Ob die Terrassen in Babylon standen oder in Ninive, ob die K\u00f6nigin Amytis hie\u00df oder eine Erfindung sp\u00e4terer Jahrhunderte war \u2014 die H\u00e4ngenden G\u00e4rten bleiben das \u00e4lteste Denkmal der Menschheit f\u00fcr eine Idee: dass wir unsere gr\u00f6\u00dften Wunder nicht f\u00fcr uns selbst erschaffen, sondern f\u00fcr die Menschen, die wir nicht ungl\u00fccklich sehen k\u00f6nnen.",
  paragraphs: [
    {
      text: "Von den Sieben Weltwundern der Antike sind sechs nachgewiesen. Die Gro\u00dfe Pyramide steht noch. Von den anderen hat man Ruinen gefunden, Fundamente, irgendetwas. Aber die H\u00e4ngenden G\u00e4rten von Babylon sind nie aufgetaucht. Kein Stein. Keine Wurzel. Nicht ein einziger Ziegel. Sie sind der ber\u00fchmteste Garten der Menschheitsgeschichte, und es ist gut m\u00f6glich, dass es sie nie gegeben hat.",
    },
    {
      text: "Die Geschichte geht so. Um 600 v. Chr. heiratete Nebukadnezar II. \u2014 der m\u00e4chtigste K\u00f6nig der Erde \u2014 Amytis, eine Prinzessin aus Medien, dem heutigen Iran. Sie war unter k\u00fchlen B\u00e4chen und T\u00e4lern aufgewachsen, die nach jedem Regen gr\u00fcn leuchteten. Dann kam sie nach Babylon: flaches, braunes Land, Sommer mit f\u00fcnfzig Grad, nichts als Dattelpalmen und Kan\u00e4le. Das Heimweh fra\u00df sie auf. Also beschloss ihr Mann \u2014 ein Mann, der Nationen erobert und den Tempel von Jerusalem niedergebrannt hatte \u2014 das Problem zu l\u00f6sen. Er w\u00fcrde ihr einen Berg bauen.",
    },
    {
      text: "Die antiken Autoren \u00fcberschlugen sich mit Beschreibungen. Diodor von Sizilien, Jahrhunderte sp\u00e4ter, berichtete von G\u00e4rten mit 120 Metern Seitenl\u00e4nge, die in Terrassen zwanzig Meter hoch aufstiegen. Jede Ebene war mit Schilf, Ziegeln und Blei abgedichtet, dann mit genug Erde gef\u00fcllt, um ausgewachsene B\u00e4ume zu tragen. Wasser wurde mit einer Art Schraubenmechanismus aus dem Euphrat nach oben gepumpt und floss dann in Kaskaden durch Kan\u00e4le hinab. Ein Autor nannte es \u201eeinen ewigen Fr\u00fchling, der \u00fcber den K\u00f6pfen derer schwebte, die unten wandelten.\u201c",
    },
    {
      text: "Das Problem: Nichts davon l\u00e4sst sich belegen. Nebukadnezar hinterlie\u00df Hunderte Inschriften \u00fcber seine Bauprojekte \u2014 Mauern, Tore, Tempel, Pal\u00e4ste. Er erw\u00e4hnte keinen Garten. Kein einziges Mal. Herodot besuchte Babylon ein Jahrhundert sp\u00e4ter und beschrieb die Stadt ausf\u00fchrlich. Keine G\u00e4rten. Der fr\u00fcheste Bericht stammt aus der Zeit dreihundert Jahre nach dem Tod des K\u00f6nigs. Arch\u00e4ologen gruben ab 1899 achtzehn Jahre lang in Babylon. Sie fanden nichts. Gottes M\u00fchlen mahlen langsam \u2014 aber nach sechsundzwanzig Jahrhunderten haben sie von diesen G\u00e4rten nicht einmal Staub \u00fcbrig gelassen.",
    },
    {
      text: "2013 stellte die Oxford-Forscherin Stephanie Dalley alles auf den Kopf. Die G\u00e4rten h\u00e4tten tats\u00e4chlich existiert, argumentierte sie \u2014 nur nicht in Babylon. Sie befanden sich in Ninive, 450 Kilometer n\u00f6rdlich, erbaut vom assyrischen K\u00f6nig Sanherib ein Jahrhundert zuvor. Seine Inschriften beschreiben Terrasseng\u00e4rten, gespeist von bronzenen Wasserschrauben und einem achtzig Kilometer langen Aqu\u00e4dukt aus den Bergen. Ein Relief aus seinem Palast, heute im British Museum, zeigt G\u00e4rten auf S\u00e4ulen, die perfekt zu den antiken Beschreibungen passen. Die alten Autoren, so Dalley, h\u00e4tten schlicht die St\u00e4dte verwechselt.",
    },
    {
      text: "Sogar der Name f\u00fchrt in die Irre. \u201eH\u00e4ngend\u201c stammt vom griechischen Wort kremastos, das nicht \u201ean Ketten baumelnd\u201c bedeutet. Es bedeutet \u00fcberh\u00e4ngend \u2014 wie eine Terrasse, die \u00fcber die n\u00e4chste hinausragt. Man stelle sich eine gestufte H\u00fcgellandschaft aus B\u00e4umen und Blumen vor, jede Ebene l\u00e4sst ihr Gr\u00fcn \u00fcber den Rand der darunterliegenden fallen, alles erhebt sich aus der flachen W\u00fcste wie etwas, das es nicht geben d\u00fcrfte. Kein Garten am Himmel. Ein Wald, der sich als Berg ausgab.",
    },
    {
      text: "Vielleicht wird die Frage nie gekl\u00e4rt. Vielleicht liegen die G\u00e4rten in Babylon, unter dem Grundwasserspiegel, wo niemand graben kann. Vielleicht in Ninive. Vielleicht waren sie ein Mosaik aus Reiseberichten und haben als ein einziger Ort nie existiert. Aber eines hat sechsundzwanzig Jahrhunderte \u00fcberdauert: die Geschichte eines K\u00f6nigs, der die m\u00e4chtigste Stadt der Welt betrachtete und dachte \u2014 sie ist ungl\u00fccklich \u2014 und dann versuchte, einen Berg aus dem Boden zu heben, um das zu \u00e4ndern. Die G\u00e4rten sind verschwunden. Die Liebesgeschichte nicht. Vielleicht ist das das eigentliche Weltwunder.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════
const items = [
  { label: "Spanish (es)", data: es },
  { label: "French (fr)", data: fr },
  { label: "German (de)", data: de },
];

for (const { label, data } of items) {
  console.log(`\n━━━ Pushing ${label} ━━━`);
  console.log(`  siteId:      ${data.siteId}`);
  console.log(`  langStoryId: ${data.langStoryId}`);
  console.log(`  title:       ${data.title}`);
  console.log(`  paragraphs:  ${data.paragraphs.length}`);
  console.log(`  chars total: ${data.paragraphs.reduce((s, p) => s + p.text.length, 0)}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log(`  ✓ SUCCESS — ${label} pushed to Story table`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ⚠ Record already exists. Overwriting...`);
      await docClient.send(new PutCommand({ TableName: TABLE, Item: data }));
      console.log(`  ✓ SUCCESS — ${label} overwritten in Story table`);
    } else {
      console.error(`  ✗ FAILED — ${label}:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\n══════════════════════════════════════════");
console.log("All three language versions pushed successfully.");
console.log("══════════════════════════════════════════\n");
