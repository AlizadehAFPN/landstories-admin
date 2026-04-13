import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const TIMESTAMP = Math.floor(Date.now() / 1000);

// ─── Shared metadata (unchanged from English) ───
const shared = {
  siteId: { S: "sigiriya" },
  storyId: { S: "patricide-king" },
  icon: { S: "\u{1F451}" },
  tier: { S: "S" },
  era: { S: "473-495 CE" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lat: { N: "7.957" },
      lng: { N: "80.7603" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
  disabled: { BOOL: false },
  source: {
    S: "Culavamsa (chapters 38-39); Geiger, Wilhelm, trans. Culavamsa: Being the More Recent Part of the Mahavamsa, 1929; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; De Silva, K.M. A History of Sri Lanka, 1981; UNESCO World Heritage Nomination File 202",
  },
  updatedAt: { N: String(TIMESTAMP) },
};

function makeParagraphs(texts) {
  return {
    L: texts.map((t) => ({ M: { text: { S: t } } })),
  };
}

function makeCharacters(chars) {
  return { L: chars.map((c) => ({ S: c })) };
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// SPANISH \u2014 "El rey parricida"
// Proverb: "Dios tarda, pero no olvida" (subverted in P7)
// Register: Quality Spanish podcast / popular nonfiction
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const esItem = {
  ...shared,
  langStoryId: { S: "es#patricide-king" },
  lang: { S: "es" },
  title: { S: "El rey parricida" },
  subtitle: {
    S: "Un pr\u00edncipe asesina a su padre, levanta un palacio en lo alto de una roca imposible y descubre que ninguna fortaleza puede proteger a un hombre del pecado que ya vive dentro de \u00e9l",
  },
  excerpt: {
    S: "En el siglo V, un pr\u00edncipe que jam\u00e1s podr\u00eda ser rey asesin\u00f3 a su propio padre y despu\u00e9s construy\u00f3 su trono en el cielo, sobre una roca tan alta que hasta los dioses tendr\u00edan que levantar la vista para verlo.",
  },
  moralOrLesson: {
    S: "Un trono conquistado con la sangre de un padre no es un trono: es una c\u00e1rcel en el cielo. Y ninguna fortaleza, por alta que sea, puede proteger a un hombre del juicio que ya vive dentro de \u00e9l.",
  },
  characters: makeCharacters([
    "Rey Kashyapa I (el rey parricida)",
    "Rey Dhatusena (su padre)",
    "Pr\u00edncipe Moggallana (su medio hermano, heredero leg\u00edtimo)",
    "Migara (sobrino de Dhatusena, comandante del ej\u00e9rcito y conspirador)",
  ]),
  paragraphs: makeParagraphs([
    // P1 \u2014 The crime and context
    `En el a\u00f1o 473, un pr\u00edncipe llamado Kashyapa mat\u00f3 a su propio padre. Y despu\u00e9s intent\u00f3 huir de esa culpa construyendo un trono en el cielo. Su padre, el rey Dhatusena, gobernaba Anuradhapura, la capital m\u00e1s antigua de Sri Lanka. No era un rey cualquiera: fue el hombre que levant\u00f3 el Kala Wewa, un embalse colosal que cubr\u00eda miles de hect\u00e1reas y manten\u00eda vivos los arrozales de todo el reino. Pero la madre de Kashyapa era de casta baja. El trono le correspond\u00eda a su medio hermano menor, Moggallana, el hijo de la reina.`,

    // P2 \u2014 The conspiracy and the treasury scene
    `El rencor encontr\u00f3 un c\u00f3mplice. Migara, sobrino del rey y comandante del ej\u00e9rcito, quer\u00eda venganza: Dhatusena hab\u00eda mandado ejecutar a su madre. Juntos, volvieron al ej\u00e9rcito contra el rey. Encadenaron a Dhatusena. Y entonces lleg\u00f3 el momento que las cr\u00f3nicas no olvidaron jam\u00e1s. Kashyapa arrastr\u00f3 a su padre hasta el borde del Kala Wewa y le exigi\u00f3 que revelara d\u00f3nde estaba el tesoro. El viejo rey se arrodill\u00f3 junto al agua, recogi\u00f3 un poco con las manos encadenadas y dijo: \u00abToda mi riqueza es esta\u00bb.`,

    // P3 \u2014 The murder
    `Fue el \u00faltimo gesto de dignidad de un hombre que entend\u00eda que su verdadero legado era el agua que le hab\u00eda dado a su pueblo, no el oro. A Kashyapa le dio igual. Migara cobr\u00f3 su venganza. Desnudaron al viejo rey, lo encadenaron y lo emparedaron vivo. Dhatusena \u2014el hombre que construy\u00f3 embalses para dar vida\u2014 muri\u00f3 despacio, en la oscuridad, enterrado dentro del mismo tipo de muro que su propio genio le hab\u00eda ense\u00f1ado a construir a su gente.`,

    // P4 \u2014 The religious condemnation
    `En el budismo, matar a tu padre es lo peor que puede hacer un ser humano. Un pecado tan grave que ninguna oraci\u00f3n ni buena acci\u00f3n puede deshacerlo. Los monjes de Anuradhapura se negaron a aceptar a Kashyapa como rey. La gente lo llam\u00f3 \u00abKashyapa el Parricida\u00bb. Su medio hermano Moggallana escap\u00f3 cruzando el mar hacia el sur de India, donde empez\u00f3 a reunir un ej\u00e9rcito para recuperar el trono. Kashyapa ten\u00eda la corona, pero esa corona ya no val\u00eda nada.`,

    // P5 \u2014 The impossible rock
    `Entonces hizo algo que ning\u00fan rey hab\u00eda hecho en la historia. Abandon\u00f3 la capital sagrada por completo y traslad\u00f3 su reino a un lugar que apenas parec\u00eda real: una roca de granito que se levanta ciento ochenta metros en vertical sobre la selva, con una cima del tama\u00f1o de dos campos de f\u00fatbol. Monjes budistas llevaban siglos meditando en sus cuevas, pero nadie hab\u00eda intentado vivir all\u00ed arriba. Kashyapa mir\u00f3 esa roca y vio un trono al que ning\u00fan ej\u00e9rcito pod\u00eda llegar y ning\u00fan monje pod\u00eda juzgar.`,

    // P6 \u2014 What he built
    `Lo que levant\u00f3 en dieciocho a\u00f1os quita el aliento. En la base: jardines con fuentes tan precisas que siguen funcionando mil quinientos a\u00f1os despu\u00e9s. En la subida: frescos de mujeres celestiales pintados en la roca viva, un muro pulido como un espejo. Y arriba, la entrada: las fauces abiertas de un le\u00f3n de piedra de veinte metros. Los visitantes entraban por su boca para llegar a la cima. All\u00ed arriba, un palacio completo con una piscina del tama\u00f1o de una ol\u00edmpica, tallada directamente en la roca.`,

    // P7 \u2014 The god-king and the prison (proverb subverted)
    `Kashyapa se proclam\u00f3 rey-dios. Acu\u00f1\u00f3 monedas de oro, abri\u00f3 puertos de comercio y hasta don\u00f3 un monasterio a los mismos monjes que lo hab\u00edan rechazado. Cada diosa pintada, cada fuente imposible gritaba lo mismo: soy digno, merezco esto. Pero los cronistas lo vieron claro. Entendieron lo que Kashyapa nunca pudo entender: no hab\u00eda construido un para\u00edso. Hab\u00eda construido la c\u00e1rcel m\u00e1s hermosa del mundo. Dicen que Dios tarda, pero no olvida. El karma budista ni siquiera tarda. Y ninguna fortaleza, por alta que sea, protege a un hombre de lo que ya vive dentro de \u00e9l.`,
  ]),
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// FRENCH \u2014 "Le roi parricide"
// Proverb: "T\u00f4t ou tard, tout se paie" (subverted in P7)
// Register: Quality French podcast / popular nonfiction \u00e0 la Franck Ferrand
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const frItem = {
  ...shared,
  langStoryId: { S: "fr#patricide-king" },
  lang: { S: "fr" },
  title: { S: "Le roi parricide" },
  subtitle: {
    S: "Un prince assassine son p\u00e8re, b\u00e2tit un palais au sommet d\u2019un rocher impossible et d\u00e9couvre qu\u2019aucune forteresse ne peut prot\u00e9ger un homme du p\u00e9ch\u00e9 qui vit d\u00e9j\u00e0 en lui",
  },
  excerpt: {
    S: "Au Ve si\u00e8cle, un prince qui ne pouvait pas \u00eatre roi assassina son propre p\u00e8re \u2014 puis b\u00e2tit son tr\u00f4ne dans le ciel, sur un rocher si haut que m\u00eame les dieux auraient d\u00fb lever les yeux pour le voir.",
  },
  moralOrLesson: {
    S: "Un tr\u00f4ne conquis dans le sang d\u2019un p\u00e8re n\u2019est pas un tr\u00f4ne : c\u2019est une prison dans le ciel. Et aucune forteresse, aussi haute soit-elle, ne peut prot\u00e9ger un homme du jugement qui vit d\u00e9j\u00e0 en lui.",
  },
  characters: makeCharacters([
    "Roi Kashyapa Ier (le roi parricide)",
    "Roi Dhatusena (son p\u00e8re)",
    "Prince Moggallana (son demi-fr\u00e8re, h\u00e9ritier l\u00e9gitime)",
    "Migara (neveu de Dhatusena, commandant de l\u2019arm\u00e9e et conspirateur)",
  ]),
  paragraphs: makeParagraphs([
    // P1 \u2014 The crime and context
    `En 473 de notre \u00e8re, un prince du nom de Kashyapa a tu\u00e9 son propre p\u00e8re. Et ensuite, il a tent\u00e9 de fuir cette culpabilit\u00e9 en se b\u00e2tissant un tr\u00f4ne dans le ciel. Son p\u00e8re, le roi Dhatusena, r\u00e9gnait sur Anuradhapura, la plus ancienne capitale du Sri Lanka. Ce n\u2019\u00e9tait pas un roi ordinaire\u00a0: c\u2019est lui qui avait fait construire le Kala Wewa, un r\u00e9servoir colossal couvrant des milliers d\u2019hectares, qui alimentait les rizi\u00e8res de tout le royaume. Mais la m\u00e8re de Kashyapa \u00e9tait de basse caste. Le tr\u00f4ne revenait \u00e0 son demi-fr\u00e8re cadet, Moggallana, le fils de la reine.`,

    // P2 \u2014 The conspiracy and the treasury scene
    `L\u2019amertume a trouv\u00e9 un alli\u00e9. Migara, le neveu du roi et commandant de l\u2019arm\u00e9e, voulait se venger\u00a0: Dhatusena avait fait ex\u00e9cuter sa m\u00e8re. Ensemble, ils ont retourn\u00e9 l\u2019arm\u00e9e contre le roi. Dhatusena s\u2019est retrouv\u00e9 encha\u00een\u00e9. Et c\u2019est l\u00e0 qu\u2019arrive le moment que les chroniques n\u2019ont jamais oubli\u00e9. Kashyapa a tra\u00een\u00e9 son p\u00e8re au bord du Kala Wewa et lui a ordonn\u00e9 de r\u00e9v\u00e9ler o\u00f9 se trouvait le tr\u00e9sor. Le vieux roi s\u2019est agenouill\u00e9 au bord de l\u2019eau, a recueilli un peu d\u2019eau dans ses mains encha\u00een\u00e9es et a dit\u00a0: \u00ab\u00a0Voici toute la richesse que je poss\u00e8de.\u00a0\u00bb`,

    // P3 \u2014 The murder
    `C\u2019\u00e9tait le dernier geste de dignit\u00e9 d\u2019un roi qui avait compris que son vrai h\u00e9ritage, c\u2019\u00e9tait l\u2019eau qu\u2019il avait donn\u00e9e \u00e0 son peuple \u2014 pas l\u2019or. Kashyapa n\u2019en avait rien \u00e0 faire. Migara a pris sa revanche. Ils ont d\u00e9shabill\u00e9 le vieux roi, l\u2019ont encha\u00een\u00e9 et l\u2019ont mur\u00e9 vivant dans une paroi de briques. Dhatusena \u2014 l\u2019homme qui avait construit des r\u00e9servoirs pour donner la vie \u2014 est mort lentement, dans le noir, enferm\u00e9 dans le genre de mur que son propre g\u00e9nie avait appris \u00e0 son peuple \u00e0 construire.`,

    // P4 \u2014 The religious condemnation
    `Dans le bouddhisme, tuer son p\u00e8re est le pire acte qu\u2019un \u00eatre humain puisse commettre. Un p\u00e9ch\u00e9 si grave qu\u2019aucune pri\u00e8re, aucune bonne action ne peut l\u2019effacer. Les moines d\u2019Anuradhapura ont refus\u00e9 de reconna\u00eetre Kashyapa comme roi. Le peuple l\u2019a surnomm\u00e9 \u00ab\u00a0Kashyapa le Parricide\u00a0\u00bb. Son demi-fr\u00e8re Moggallana a fui par la mer jusqu\u2019au sud de l\u2019Inde, o\u00f9 il a commenc\u00e9 \u00e0 lever une arm\u00e9e pour reprendre le tr\u00f4ne. Kashyapa portait la couronne, mais cette couronne ne valait plus rien.`,

    // P5 \u2014 The impossible rock
    `Alors il a fait quelque chose qu\u2019aucun roi n\u2019avait jamais fait. Il a abandonn\u00e9 la capitale sacr\u00e9e et a d\u00e9plac\u00e9 son royaume vers un endroit qui semblait \u00e0 peine r\u00e9el\u00a0: un rocher de granit qui s\u2019\u00e9l\u00e8ve \u00e0 cent quatre-vingts m\u00e8tres au-dessus de la jungle plate, avec un sommet grand comme deux terrains de football. Des moines bouddhistes m\u00e9ditaient dans ses grottes depuis des si\u00e8cles, mais personne n\u2019avait jamais essay\u00e9 d\u2019y vivre. Kashyapa a regard\u00e9 ce rocher et y a vu un tr\u00f4ne qu\u2019aucune arm\u00e9e ne pouvait atteindre et qu\u2019aucun moine ne pouvait juger.`,

    // P6 \u2014 What he built
    `Ce qu\u2019il a construit en dix-huit ans est \u00e0 couper le souffle. \u00c0 la base\u00a0: des jardins d\u2019eau si pr\u00e9cis que leurs fontaines fonctionnent encore mille cinq cents ans plus tard. Le long de l\u2019ascension\u00a0: des fresques de femmes c\u00e9lestes peintes \u00e0 m\u00eame la falaise, un mur poli comme un miroir. Et tout en haut, l\u2019entr\u00e9e\u00a0: la gueule b\u00e9ante d\u2019un lion de pierre de vingt m\u00e8tres. Les visiteurs passaient par sa bouche pour atteindre le sommet. L\u00e0-haut\u00a0: un palais complet avec un bassin de la taille d\u2019une piscine olympique, taill\u00e9 \u00e0 m\u00eame le roc.`,

    // P7 \u2014 The god-king and the prison (proverb subverted)
    `Kashyapa s\u2019est proclam\u00e9 roi-dieu. Il a frapp\u00e9 des pi\u00e8ces d\u2019or, ouvert des ports et offert un monast\u00e8re aux moines qui l\u2019avaient rejet\u00e9. Chaque d\u00e9esse peinte, chaque fontaine impossible hurlait\u00a0: je suis digne, je m\u00e9rite cela. Mais les chroniqueurs ont compris ce que Kashyapa n\u2019a jamais pu saisir\u00a0: il n\u2019avait pas construit un paradis. Il avait construit la plus belle prison du monde. On dit que t\u00f4t ou tard, tout se paie. Pour Kashyapa, la facture a mis dix-huit ans \u2014 mais elle est arriv\u00e9e. Et aucune forteresse, aussi haute soit-elle, ne prot\u00e8ge un homme de ce qui vit d\u00e9j\u00e0 en lui.`,
  ]),
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// GERMAN \u2014 "Der Vaterm\u00f6rderk\u00f6nig"
// Proverb: "Gottes M\u00fchlen mahlen langsam" (subverted in P7)
// Register: Quality German history podcast / popular nonfiction
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const deItem = {
  ...shared,
  langStoryId: { S: "de#patricide-king" },
  lang: { S: "de" },
  title: { S: "Der Vaterm\u00f6rderk\u00f6nig" },
  subtitle: {
    S: "Ein Prinz ermordet seinen Vater, baut einen Palast auf einem unm\u00f6glichen Felsen und entdeckt, dass keine Festung einen Menschen vor der S\u00fcnde sch\u00fctzen kann, die bereits in ihm lebt",
  },
  excerpt: {
    S: "Im f\u00fcnften Jahrhundert ermordete ein Prinz, der niemals K\u00f6nig werden sollte, seinen eigenen Vater \u2014 und baute dann seinen Thron in den Himmel, auf einen Felsen so hoch, dass selbst die G\u00f6tter h\u00e4tten aufblicken m\u00fcssen, um ihn zu sehen.",
  },
  moralOrLesson: {
    S: "Ein Thron, der mit dem Blut des eigenen Vaters erkauft wurde, ist kein Thron \u2014 er ist ein Gef\u00e4ngnis im Himmel. Und keine Festung, so hoch sie auch sein mag, kann einen Menschen vor dem Urteil sch\u00fctzen, das bereits in ihm lebt.",
  },
  characters: makeCharacters([
    "K\u00f6nig Kashyapa I. (der Vaterm\u00f6rderk\u00f6nig)",
    "K\u00f6nig Dhatusena (sein Vater)",
    "Prinz Moggallana (sein Halbbruder, rechtm\u00e4\u00dfiger Thronfolger)",
    "Migara (Dhatusenas Neffe, Heerf\u00fchrer und Verschw\u00f6rer)",
  ]),
  paragraphs: makeParagraphs([
    // P1 \u2014 The crime and context
    `Im Jahr 473 t\u00f6tete ein Prinz namens Kashyapa seinen eigenen Vater. Und versuchte danach, der Schuld zu entkommen \u2014 indem er sich einen Thron im Himmel baute. Sein Vater, K\u00f6nig Dhatusena, herrschte \u00fcber Anuradhapura, die \u00e4lteste Hauptstadt Sri Lankas. Er war kein gew\u00f6hnlicher K\u00f6nig: Er hatte den Kala Wewa erschaffen, einen gewaltigen Stausee \u00fcber Tausende Hektar, der die Reisfelder des ganzen Reiches am Leben hielt. Aber Kashyapas Mutter war eine Frau niederer Kaste. Der Thron war seinem j\u00fcngeren Halbbruder Moggallana versprochen, dem Sohn der K\u00f6nigin.`,

    // P2 \u2014 The conspiracy and the treasury scene
    `Der Groll fand einen Verb\u00fcndeten. Migara, der Neffe des K\u00f6nigs und Befehlshaber der Armee, wollte Rache \u2014 Dhatusena hatte seine Mutter hinrichten lassen. Zusammen wandten sie das Heer gegen den K\u00f6nig. Dhatusena wurde in Ketten gelegt. Und dann kam der Moment, den die Chroniken nie vergessen haben. Kashyapa schleifte seinen Vater ans Ufer des Kala Wewa und verlangte zu wissen, wo der Schatz versteckt war. Der alte K\u00f6nig kniete sich ans Wasser, sch\u00f6pfte etwas davon mit seinen gefesselten H\u00e4nden und sagte: \u00abDas ist der ganze Reichtum, den ich besitze.\u00bb`,

    // P3 \u2014 The murder
    `Es war die letzte Geste der W\u00fcrde eines K\u00f6nigs, der begriffen hatte, dass sein wahres Verm\u00e4chtnis das Wasser war, das er seinem Volk gegeben hatte \u2014 nicht Gold. Kashyapa war das egal. Migara holte sich seine Rache. Sie zogen den alten K\u00f6nig nackt aus, legten ihn in Ketten und mauerten ihn bei lebendigem Leib in eine Ziegelwand ein. Dhatusena \u2014 der Mann, der Stauseen gebaut hatte, um Leben zu spenden \u2014 starb langsam, im Dunkeln, eingeschlossen in genau der Art von Mauer, die sein eigenes Genie sein Volk zu bauen gelehrt hatte.`,

    // P4 \u2014 The religious condemnation
    `Im Buddhismus ist der Mord am eigenen Vater das Schlimmste, was ein Mensch tun kann. Eine S\u00fcnde so schwer, dass kein Gebet und keine gute Tat sie ungeschehen machen kann. Die M\u00f6nche von Anuradhapura weigerten sich, Kashyapa als K\u00f6nig anzuerkennen. Das Volk nannte ihn \u00abKashyapa den Vaterm\u00f6rder\u00bb. Sein Halbbruder Moggallana floh \u00fcber das Meer nach S\u00fcdindien, wo er begann, ein Heer aufzustellen, um den Thron zur\u00fcckzuerobern. Kashyapa trug die Krone, aber die Krone trug keine Ehre mehr.`,

    // P5 \u2014 The impossible rock
    `Dann tat er etwas, was kein K\u00f6nig je zuvor getan hatte. Er verlie\u00df die heilige Hauptstadt vollst\u00e4ndig und verlegte sein Reich an einen Ort, der kaum real wirkte: ein Granitfelsen, der sich hundertachtzig Meter senkrecht aus dem flachen Dschungel erhebt, mit einem Gipfel etwa so gro\u00df wie zwei Fu\u00dfballfelder. Buddhistische M\u00f6nche hatten seit Jahrhunderten in seinen H\u00f6hlen meditiert, aber niemand hatte je versucht, dort oben zu leben. Kashyapa sah diesen Felsen und erkannte einen Thron, den kein Heer erreichen und kein M\u00f6nch richten konnte.`,

    // P6 \u2014 What he built
    `Was er in achtzehn Jahren dort baute, verschl\u00e4gt einem den Atem. Am Fu\u00df: Wasserg\u00e4rten, so pr\u00e4zise angelegt, dass ihre Font\u00e4nen f\u00fcnfzehnhundert Jahre sp\u00e4ter immer noch funktionieren. Am Aufstieg: Fresken himmlischer Frauen, direkt in die Felswand gemalt, eine Mauer, poliert wie ein Spiegel. Und ganz oben der Eingang: das aufgerissene Maul eines steinernen L\u00f6wen, zwanzig Meter hoch. Besucher gingen durch seinen Rachen, um den Gipfel zu erreichen. Dort oben: ein ganzer Palast mit einem Becken so gro\u00df wie ein olympisches Schwimmbecken \u2014 direkt aus dem Fels gehauen.`,

    // P7 \u2014 The god-king and the prison (proverb subverted)
    `Kashyapa erkl\u00e4rte sich zum Gottk\u00f6nig. Er lie\u00df Goldm\u00fcnzen pr\u00e4gen, er\u00f6ffnete H\u00e4fen und stiftete ein Kloster f\u00fcr die M\u00f6nche, die ihn abgelehnt hatten. Jede gemalte G\u00f6ttin, jede Font\u00e4ne schrie: Ich bin es wert. Ich verdiene das. Aber die Chronisten verstanden, was Kashyapa nie begreifen konnte: Er hatte kein Paradies gebaut \u2014 er hatte das sch\u00f6nste Gef\u00e4ngnis der Welt gebaut. Man sagt, Gottes M\u00fchlen mahlen langsam. Kashyapas Karma mahlte schneller. Keine Festung, so hoch sie auch sein mag, sch\u00fctzt einen Menschen vor dem, was schon in ihm lebt.`,
  ]),
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// PUSH
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const languages = [
  { code: "es", label: "Spanish", item: esItem },
  { code: "fr", label: "French", item: frItem },
  { code: "de", label: "German", item: deItem },
];

for (const { code, label, item } of languages) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Pushing ${label} (${code}) -> ${item.langStoryId.S}`);
  console.log(`${"=".repeat(60)}`);

  // Validate paragraph count and char limits
  const paragraphs = item.paragraphs.L;
  console.log(`  Paragraphs: ${paragraphs.length}`);
  let anyOver = false;
  for (let i = 0; i < paragraphs.length; i++) {
    const text = paragraphs[i].M.text.S;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    const status =
      chars > 600
        ? " !! OVER 600"
        : chars > 500
          ? " ~ slightly over 500"
          : " ok";
    if (chars > 600) anyOver = true;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words${status}`);
  }

  const totalChars = paragraphs.reduce((sum, p) => sum + p.M.text.S.length, 0);
  console.log(`  Total: ${totalChars} chars`);

  if (anyOver) {
    console.log(`  !! ${label} has paragraphs over 600 chars. Aborting.`);
    process.exit(1);
  }

  try {
    const cmd = new PutItemCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });
    const result = await client.send(cmd);
    console.log(
      `  SUCCESS: ${label} pushed (HTTP ${result.$metadata.httpStatusCode})`
    );

    // Verify by reading it back
    const verify = new GetItemCommand({
      TableName: TABLE,
      Key: {
        siteId: { S: "sigiriya" },
        langStoryId: { S: `${code}#patricide-king` },
      },
      ProjectionExpression: "title, lang, langStoryId",
    });
    const verifyResult = await client.send(verify);
    if (verifyResult.Item) {
      console.log(
        `  VERIFIED: "${verifyResult.Item.title.S}" (${verifyResult.Item.lang.S})`
      );
    } else {
      console.log(`  VERIFY FAILED: item not found after push`);
    }
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `  SKIPPED: ${label} already exists — not overwriting`
      );
    } else {
      console.error(`  FAILED: ${label}:`, err.message);
      process.exit(1);
    }
  }
}

console.log(`\n${"=".repeat(60)}`);
console.log("All done.");
console.log(`${"=".repeat(60)}`);
