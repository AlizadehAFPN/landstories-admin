import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "knossos",
  storyId: "theseus-ariadne",
  icon: "\u{1F9F5}",
  tier: "A",
  source:
    "Plutarch\u2019s Life of Theseus, Apollodorus\u2019s Bibliotheca, Catullus 64, Ovid\u2019s Heroides",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lng: 25.1631, lat: 35.2981 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "love_heartbreak",
  updatedAt: NOW,
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// SPANISH
// Proverb: "A la tercera va la vencida" (the third time's the charm)
// \u2014 subverted: the third tribute was the one that brought the hero.
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

const spanish = {
  ...shared,
  lang: "es",
  langStoryId: "es#theseus-ariadne",
  era: "Era mitol\u00f3gica",
  title: "Teseo, Ariadna y el hilo",
  subtitle: "Amor, traici\u00f3n y la muerte del monstruo",
  excerpt:
    "Cada nueve a\u00f1os, Atenas pagaba una deuda de sangre. Catorce j\u00f3venes \u2014 siete chicos, siete chicas \u2014 cruzaban el mar hasta Creta para servir de alimento a un monstruo.",
  moralOrLesson:
    "Hasta los h\u00e9roes tienen defectos. Teseo salv\u00f3 a Atenas, pero traicion\u00f3 a quien lo salv\u00f3 y provoc\u00f3 la muerte de su padre por un simple olvido. La victoria muchas veces llega acompa\u00f1ada de p\u00e9rdida.",
  characters: [
    "Teseo",
    "Ariadna",
    "El Minotauro",
    "Rey Minos",
    "Rey Egeo",
    "Dioniso",
  ],
  paragraphs: [
    {
      text: "Cada nueve a\u00f1os, Atenas pagaba una deuda de sangre. Catorce j\u00f3venes \u2014 siete chicos, siete chicas \u2014 cruzaban el mar hasta Creta para servir de alimento al Minotauro, una bestia mitad hombre, mitad toro que viv\u00eda en el coraz\u00f3n de un laberinto bajo el palacio de Cnosos. Nadie que entraba sal\u00eda con vida. Era el precio que el rey Minos impuso tras vencer a Atenas en la guerra. Pero dicen que a la tercera va la vencida: cuando lleg\u00f3 el tercer tributo, un pr\u00edncipe llamado Teseo dijo basta. \u00abIr\u00e9 yo. Y lo matar\u00e9\u00bb.",
    },
    {
      text: "Su padre, el rey Egeo, le suplic\u00f3 que no fuera. Pero Teseo era de los que no dan marcha atr\u00e1s. Antes de zarpar, Egeo le hizo prometer algo: el barco partir\u00eda con velas negras, color de luto. Si Teseo sobreviv\u00eda, deb\u00eda cambiarlas por velas blancas durante el regreso, para que su padre pudiera ver la buena noticia desde los acantilados antes de que el barco tocara puerto. Teseo lo jur\u00f3. Y naveg\u00f3 hacia Creta.",
    },
    {
      text: "Cuando los cautivos atenienses llegaron a Creta, los pasearon ante el rey Minos y su corte \u2014 muertos andantes, para el que quisiera verlo. Pero alguien en la multitud no pod\u00eda apartar la mirada. Ariadna, la propia hija del rey, vio a Teseo y se enamor\u00f3 al instante. \u00c9l caminaba erguido, con la mirada intacta, desafiante incluso encadenado. Esa noche, Ariadna baj\u00f3 a su celda con dos regalos que lo cambiar\u00edan todo: una espada afilada y un ovillo de hilo.",
    },
    {
      text: "El plan era de una sencillez brillante. \u00abAta el hilo a la entrada del laberinto\u00bb, le dijo. \u00abVe solt\u00e1ndolo a medida que avances. Cuando mates a la bestia, sigue el hilo de vuelta\u00bb. Nadie lo hab\u00eda pensado antes \u2014 o quiz\u00e1 nadie hab\u00eda querido lo suficiente a un prisionero como para ayudarlo. A cambio, Teseo jur\u00f3 llevarla a Atenas y hacerla su reina. Ella lo apostaba todo por un desconocido. \u00c9l le dio su palabra.",
    },
    {
      text: "Al amanecer, Teseo at\u00f3 el hilo de Ariadna a la entrada y se adentr\u00f3 en la oscuridad total. Callejones sin salida, giros falsos, pasillos que volv\u00edan sobre s\u00ed mismos \u2014 el laberinto estaba dise\u00f1ado para destrozarte. Pero \u00e9l sigui\u00f3 avanzando, con el hilo desenroll\u00e1ndose a sus espaldas, su \u00fanico camino de regreso. En la c\u00e1mara m\u00e1s profunda encontr\u00f3 al Minotauro. La pelea fue brutal. La bestia embisti\u00f3 con los cuernos por delante, rugiendo. Pero Teseo luchaba por cada joven que Atenas hab\u00eda enviado all\u00ed a morir. Le clav\u00f3 la espada en el coraz\u00f3n. Despu\u00e9s, silencio.",
    },
    {
      text: "Sigui\u00f3 el hilo de vuelta a trav\u00e9s de la oscuridad y sali\u00f3 a la luz del d\u00eda, donde Ariadna lo esperaba. Liberaron a los dem\u00e1s cautivos, corrieron al puerto y zarparon hacia Atenas. Ariadna cre\u00eda que navegaba hacia su nueva vida como reina. Se equivocaba. En la isla de Naxos, Teseo la abandon\u00f3. Si fue olvido, desinter\u00e9s o una orden de los dioses, nadie lo sabe. Ella despert\u00f3 sola en una playa, viendo c\u00f3mo el barco se hac\u00eda cada vez m\u00e1s peque\u00f1o en el horizonte hasta desaparecer.",
    },
    {
      text: "Pero la historia no hab\u00eda terminado con Ariadna. El dios Dioniso la encontr\u00f3 en esa misma playa, se enamor\u00f3 de ella y la convirti\u00f3 en su esposa inmortal. Tom\u00f3 la corona de su cabeza y la lanz\u00f3 al cielo, donde se transform\u00f3 en una constelaci\u00f3n que todav\u00eda puedes ver en las noches de verano: la Corona Boreal. La chica que un h\u00e9roe abandon\u00f3 termin\u00f3 casada con un dios.",
    },
    {
      text: "Teseo, mientras tanto, estaba a punto de pagar por su descuido. En la euforia de la victoria \u2014 o quiz\u00e1 aplastado por la culpa de haber dejado a Ariadna \u2014 olvid\u00f3 cambiar las velas negras por blancas. Su padre Egeo vigilaba desde los acantilados del cabo Suni\u00f3n, escudri\u00f1ando el horizonte en busca de un destello blanco. Solo vio negro. Crey\u00f3 que su hijo hab\u00eda muerto. El viejo rey se arroj\u00f3 al mar, que desde entonces lleva su nombre: el mar Egeo. El h\u00e9roe que mat\u00f3 al monstruo volvi\u00f3 a casa solo para descubrir que hab\u00eda destruido a su propio padre.",
    },
  ],
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// FRENCH
// Proverb: "Jamais deux sans trois" (never two without three)
// \u2014 subverted: Athens paid twice, and the third time brought change.
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

const french = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#theseus-ariadne",
  era: "\u00c8re mythologique",
  title: "Th\u00e9s\u00e9e, Ariane et le fil",
  subtitle: "Amour, trahison et la mort du monstre",
  excerpt:
    "Tous les neuf ans, Ath\u00e8nes payait un tribut de sang. Quatorze jeunes \u2014 sept gar\u00e7ons, sept filles \u2014 \u00e9taient envoy\u00e9s en Cr\u00e8te pour nourrir un monstre.",
  moralOrLesson:
    "M\u00eame les h\u00e9ros ont leurs failles. Th\u00e9s\u00e9e a sauv\u00e9 Ath\u00e8nes, mais il a trahi celle qui l\u2019avait sauv\u00e9 et caus\u00e9 la mort de son p\u00e8re par simple oubli. La victoire s\u2019accompagne souvent d\u2019une perte.",
  characters: [
    "Th\u00e9s\u00e9e",
    "Ariane",
    "Le Minotaure",
    "Roi Minos",
    "Roi \u00c9g\u00e9e",
    "Dionysos",
  ],
  paragraphs: [
    {
      text: "Tous les neuf ans, Ath\u00e8nes payait un tribut de sang. Quatorze jeunes \u2014 sept gar\u00e7ons, sept filles \u2014 \u00e9taient envoy\u00e9s en Cr\u00e8te pour nourrir un monstre. Le Minotaure, mi-homme, mi-taureau, vivait au c\u0153ur d\u2019un d\u00e9dale appel\u00e9 le Labyrinthe, sous le palais de Cnossos. Personne n\u2019en revenait jamais. C\u2019\u00e9tait le prix impos\u00e9 par le roi Minos apr\u00e8s sa victoire sur Ath\u00e8nes. Mais jamais deux sans trois\u00a0: quand vint le troisi\u00e8me tribut, un prince du nom de Th\u00e9s\u00e9e en avait assez. Il dit \u00e0 son p\u00e8re, le roi \u00c9g\u00e9e\u00a0: \u00ab\u00a0J\u2019irai moi-m\u00eame. Et je le tuerai.\u00a0\u00bb",
    },
    {
      text: "Son p\u00e8re le supplia de rester. Mais Th\u00e9s\u00e9e ne reculait devant rien. Avant le d\u00e9part, \u00c9g\u00e9e lui arracha une promesse. Le navire partirait sous des voiles noires \u2014 couleur de deuil. Si Th\u00e9s\u00e9e survivait, il devrait les remplacer par des voiles blanches au retour, pour que son p\u00e8re puisse apercevoir la bonne nouvelle depuis les falaises, avant m\u00eame que le navire n\u2019atteigne le port. Th\u00e9s\u00e9e jura. Puis il mit le cap sur la Cr\u00e8te.",
    },
    {
      text: "\u00c0 leur arriv\u00e9e en Cr\u00e8te, on fit d\u00e9filer les captifs ath\u00e9niens devant le roi Minos et sa cour \u2014 des morts en sursis, aux yeux de tous. Mais quelqu\u2019un dans la foule ne pouvait d\u00e9tacher son regard. Ariane, la propre fille du roi, vit Th\u00e9s\u00e9e et tomba amoureuse sur-le-champ. Il marchait droit, le regard intact, d\u00e9fiant m\u00eame encha\u00een\u00e9. Cette nuit-l\u00e0, elle se glissa jusqu\u2019\u00e0 sa cellule avec deux cadeaux qui allaient tout changer\u00a0: une \u00e9p\u00e9e tranchante et une pelote de fil.",
    },
    {
      text: "Son plan \u00e9tait d\u2019une simplicit\u00e9 redoutable. \u00ab\u00a0Attache le fil \u00e0 l\u2019entr\u00e9e du Labyrinthe, lui dit-elle. D\u00e9roule-le au fur et \u00e0 mesure. Quand tu auras tu\u00e9 la b\u00eate, suis le fil pour revenir.\u00a0\u00bb Personne n\u2019y avait jamais pens\u00e9 \u2014 ou peut-\u00eatre que personne n\u2019avait assez aim\u00e9 un prisonnier pour l\u2019aider. En \u00e9change, Th\u00e9s\u00e9e jura de l\u2019emmener \u00e0 Ath\u00e8nes et d\u2019en faire sa reine. Elle mettait tout en jeu pour un inconnu. Il lui donna sa parole.",
    },
    {
      text: "\u00c0 l\u2019aube, Th\u00e9s\u00e9e attacha le fil d\u2019Ariane \u00e0 l\u2019entr\u00e9e et s\u2019enfon\u00e7a dans l\u2019obscurit\u00e9 totale. Impasses, faux virages, couloirs qui revenaient sur eux-m\u00eames \u2014 le labyrinthe \u00e9tait con\u00e7u pour vous briser. Il avan\u00e7a, le fil se d\u00e9roulant derri\u00e8re lui, son unique chemin de retour. Dans la chambre la plus profonde, il trouva le Minotaure. Le combat fut brutal. La b\u00eate chargea, cornes en avant, en hurlant. Mais Th\u00e9s\u00e9e se battait pour chaque jeune qu\u2019Ath\u00e8nes avait envoy\u00e9 mourir ici. Il plongea l\u2019\u00e9p\u00e9e dans le c\u0153ur du monstre. Puis \u2014 le silence.",
    },
    {
      text: "Il suivit le fil \u00e0 travers les t\u00e9n\u00e8bres et \u00e9mergea en plein jour, l\u00e0 o\u00f9 Ariane l\u2019attendait. Ils lib\u00e9r\u00e8rent les autres captifs, coururent au port et mirent les voiles vers Ath\u00e8nes. Ariane croyait voguer vers sa nouvelle vie de reine. Elle se trompait. Sur l\u2019\u00eele de Naxos, Th\u00e9s\u00e9e la laissa derri\u00e8re lui. Oubli, lassitude ou ordre des dieux \u2014 personne ne le sait. Elle se r\u00e9veilla seule sur une plage, regardant le navire rapetisser \u00e0 l\u2019horizon jusqu\u2019\u00e0 n\u2019\u00eatre plus qu\u2019un point, puis rien.",
    },
    {
      text: "Mais l\u2019histoire n\u2019en avait pas fini avec Ariane. Le dieu Dionysos la trouva sur cette plage, tomba amoureux et fit d\u2019elle son \u00e9pouse immortelle. Il prit la couronne qu\u2019elle portait et la lan\u00e7a dans le ciel, o\u00f9 elle devint une constellation visible encore aujourd\u2019hui par les nuits d\u2019\u00e9t\u00e9\u00a0: la Couronne bor\u00e9ale. La fille qu\u2019un h\u00e9ros avait abandonn\u00e9e finit mari\u00e9e \u00e0 un dieu.",
    },
    {
      text: "Th\u00e9s\u00e9e, pendant ce temps, allait payer le prix de sa n\u00e9gligence. Dans l\u2019ivresse de la victoire \u2014 ou peut-\u00eatre \u00e9cras\u00e9 par la culpabilit\u00e9 d\u2019avoir abandonn\u00e9 Ariane \u2014 il oublia de troquer les voiles noires contre des blanches. Son p\u00e8re \u00c9g\u00e9e se tenait au bord des falaises du cap Sounion, scrutant l\u2019horizon en qu\u00eate d\u2019un \u00e9clat blanc. Il ne vit que du noir. Il crut son fils mort. Le vieux roi se jeta dans la mer \u2014 qui porte son nom depuis\u00a0: la mer \u00c9g\u00e9e. Le h\u00e9ros qui avait tu\u00e9 le monstre rentra chez lui pour d\u00e9couvrir qu\u2019il avait d\u00e9truit son propre p\u00e8re.",
    },
  ],
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// GERMAN
// Proverb: "Aller guten Dinge sind drei" (all good things come in threes)
// \u2014 subverted: the third tribute was the one that brought the end.
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

const german = {
  ...shared,
  lang: "de",
  langStoryId: "de#theseus-ariadne",
  era: "Mythologisches Zeitalter",
  title: "Theseus, Ariadne und der Faden",
  subtitle: "Liebe, Verrat und der Tod des Monsters",
  excerpt:
    "Alle neun Jahre zahlte Athen einen Blutpreis. Vierzehn junge Menschen \u2014 sieben Jungen, sieben M\u00e4dchen \u2014 wurden nach Kreta geschickt, um einem Monster zum Fra\u00df vorgeworfen zu werden.",
  moralOrLesson:
    "Selbst Helden haben Schw\u00e4chen. Theseus rettete Athen, verriet aber seine Retterin und verursachte den Tod seines Vaters durch blo\u00dfe Vergesslichkeit. Sieg und Verlust liegen oft nah beieinander.",
  characters: [
    "Theseus",
    "Ariadne",
    "Der Minotaurus",
    "K\u00f6nig Minos",
    "K\u00f6nig \u00c4geus",
    "Dionysos",
  ],
  paragraphs: [
    {
      text: "Alle neun Jahre zahlte Athen einen Blutpreis. Vierzehn junge Menschen \u2014 sieben Jungen, sieben M\u00e4dchen \u2014 wurden nach Kreta geschickt, um einem Monster zum Fra\u00df vorgeworfen zu werden. Der Minotaurus, halb Mensch, halb Stier, hauste tief in einem Labyrinth unter dem Palast von Knossos. Niemand, der hineinging, kam je zur\u00fcck. Das war der Preis, den K\u00f6nig Minos verlangte, nachdem er Athen im Krieg besiegt hatte. Aber aller guten Dinge sind drei: Als der dritte Tribut f\u00e4llig wurde, hatte ein Prinz namens Theseus genug. Er sagte seinem Vater, K\u00f6nig \u00c4geus: \u201eIch gehe selbst. Und ich werde es t\u00f6ten.\u201c",
    },
    {
      text: "Sein Vater flehte ihn an, es nicht zu tun. Aber Theseus kannte kein Zur\u00fcck. Bevor das Schiff ablegte, verlangte \u00c4geus ein Versprechen. Das Schiff w\u00fcrde unter schwarzen Segeln fahren \u2014 der Farbe der Trauer. Sollte Theseus \u00fcberleben, musste er sie auf der Heimfahrt gegen wei\u00dfe Segel tauschen, damit sein Vater die gute Nachricht schon von den Klippen aus erkennen konnte, noch bevor das Schiff den Hafen erreichte. Theseus schwor es. Dann segelte er nach Kreta.",
    },
    {
      text: "Als die athenischen Gefangenen in Kreta ankamen, wurden sie vor K\u00f6nig Minos und seinem Hof vorgef\u00fchrt \u2014 wandelnde Tote, f\u00fcr alle Anwesenden. Doch jemand in der Menge konnte den Blick nicht abwenden. Ariadne, die Tochter des K\u00f6nigs selbst, sah Theseus und verliebte sich auf der Stelle. Er ging aufrecht, ungebrochen, trotzig selbst in Ketten. In dieser Nacht schlich sie sich zu seiner Zelle hinunter. Sie brachte zwei Geschenke mit, die alles ver\u00e4ndern sollten: ein scharfes Schwert und ein Kn\u00e4uel Faden.",
    },
    {
      text: "Ihr Plan war von bestechender Einfachheit. \u201eBinde den Faden am Eingang des Labyrinths fest\u201c, sagte sie ihm. \u201eLass ihn abrollen, w\u00e4hrend du tiefer gehst. Wenn du die Bestie get\u00f6tet hast, folge dem Faden zur\u00fcck.\u201c Niemand war je darauf gekommen \u2014 oder vielleicht hatte nie jemand einen Gefangenen genug geliebt, um ihm zu helfen. Im Gegenzug schwor Theseus, sie nach Athen mitzunehmen und zu seiner K\u00f6nigin zu machen. Sie setzte alles auf einen Fremden. Er gab ihr sein Wort.",
    },
    {
      text: "Im Morgengrauen band Theseus Ariadnes Faden am Eingang fest und trat in die v\u00f6llige Dunkelheit. Sackgassen, falsche Abzweigungen, G\u00e4nge, die sich im Kreis drehten \u2014 das Labyrinth war gebaut, um dich zu brechen. Er ging weiter, der Faden rollte sich hinter ihm ab, sein einziger Weg zur\u00fcck. In der tiefsten Kammer fand er den Minotaurus. Der Kampf war brutal. Die Bestie st\u00fcrmte auf ihn zu, mit gesenkten H\u00f6rnern, br\u00fcllend. Aber Theseus k\u00e4mpfte f\u00fcr jedes Kind, das Athen jemals hierher zum Sterben geschickt hatte. Er rammte das Schwert in sein Herz. Dann \u2014 Stille.",
    },
    {
      text: "Er folgte dem Faden zur\u00fcck durch die Dunkelheit und trat ins Tageslicht, wo Ariadne auf ihn wartete. Sie befreiten die anderen Gefangenen, rannten zum Hafen und segelten Richtung Athen. Ariadne glaubte, sie segelte in ihr neues Leben als K\u00f6nigin. Sie irrte sich. Auf der Insel Naxos lie\u00df Theseus sie zur\u00fcck. Ob er sie verga\u00df, das Interesse verlor oder von den G\u00f6ttern dazu gezwungen wurde \u2014 niemand wei\u00df es. Sie erwachte allein an einem Strand und sah zu, wie sein Schiff am Horizont immer kleiner wurde, bis es verschwand.",
    },
    {
      text: "Aber die Geschichte war noch nicht fertig mit Ariadne. Der Gott Dionysos fand sie an diesem Strand, verliebte sich in sie und machte sie zu seiner unsterblichen Frau. Er nahm die Krone von ihrem Haupt und schleuderte sie in den Himmel, wo sie zu einem Sternbild wurde, das man in Sommern\u00e4chten noch heute sehen kann \u2014 die N\u00f6rdliche Krone, Corona Borealis. Das M\u00e4dchen, das ein Held verlassen hatte, wurde am Ende die Frau eines Gottes.",
    },
    {
      text: "Theseus aber sollte f\u00fcr seine Nachl\u00e4ssigkeit bezahlen. Im Rausch des Sieges \u2014 oder vielleicht belastet von der Schuld, Ariadne verlassen zu haben \u2014 verga\u00df er, die schwarzen Segel gegen wei\u00dfe zu tauschen. Sein Vater \u00c4geus stand auf den Klippen von Kap Sounion und suchte den Horizont nach einem wei\u00dfen Schimmer ab. Er sah nur Schwarz. Er glaubte, sein Sohn sei tot. Der alte K\u00f6nig st\u00fcrzte sich ins Meer \u2014 das seither seinen Namen tr\u00e4gt: die \u00c4g\u00e4is. Der Held, der das Monster get\u00f6tet hatte, kam nach Hause \u2014 nur um festzustellen, dass er seinen eigenen Vater zerst\u00f6rt hatte.",
    },
  ],
};

// ─── Push function ───
async function pushStory(item, label) {
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2713 ${label} pushed successfully (${item.langStoryId})`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ${label} already exists, overwriting...`);
      await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
      console.log(`\u2713 ${label} overwritten successfully (${item.langStoryId})`);
      return true;
    }
    console.error(`\u2717 ${label} FAILED:`, err.message);
    return false;
  }
}

async function main() {
  console.log(
    `Pushing 3 stories to table "${TABLE}" at ${new Date().toISOString()}...\n`
  );

  // ── JSON validation ──
  for (const [label, item] of [
    ["Spanish", spanish],
    ["French", french],
    ["German", german],
  ]) {
    const json = JSON.stringify(item);
    JSON.parse(json); // throws if malformed
    console.log(`  ${label} JSON valid (${json.length} bytes)`);
  }
  console.log();

  const esOk = await pushStory(spanish, "Spanish (es)");
  const frOk = await pushStory(french, "French (fr)");
  const deOk = await pushStory(german, "German (de)");

  console.log("\n\u2500\u2500\u2500 Summary \u2500\u2500\u2500");
  console.log(`Spanish: ${esOk ? "\u2713" : "\u2717"}`);
  console.log(`French:  ${frOk ? "\u2713" : "\u2717"}`);
  console.log(`German:  ${deOk ? "\u2713" : "\u2717"}`);

  if (!esOk || !frOk || !deOk) process.exit(1);
}

main();
