import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// Fields shared across all language versions (from English original)
const shared = {
  siteId: "babylon",
  storyId: "tower-of-babel",
  storyCategory: "prophets_pilgrims",
  characters: [
    "Nebuchadnezzar II -- king who rebuilt the ziggurat Etemenanki to its full glory",
    "Herodotus -- Greek historian who visited and described the tower around 460 BCE",
    "Alexander the Great -- ordered 10,000 men to clear its rubble in 331 BCE",
    "Robert Koldewey -- German archaeologist who excavated its foundations (1899-1917)",
    "Andrew George -- Assyriologist who published the Tower of Babel stele (2011)",
  ],
  coordinates: { lat: 32.5363, lng: 44.4209 },
  disabled: false,
  era: "c. 610-562 BCE (Nebuchadnezzar's reconstruction); Genesis account undated; archaeological remains excavated 1899-1917",
  hasAudio: false,
  icon: "\u{1F5FC}",
  image: "",
  isFree: true,
  readingTimeMinutes: 9,
  source:
    "Genesis 11:1-9 (Tower of Babel narrative); George, Andrew R. 'A Stele of Nebuchadnezzar II,' Cuneiform Royal Inscriptions and Related Texts in the Schøyen Collection, Cornell University Studies in Assyriology and Sumerology 17, 2011; Herodotus, Histories, Book I.178-183; The Esagila Tablet (AO 6555, Louvre); 'Enmerkar and the Lord of Aratta' (Sumerian poem, c. 2100 BCE); Koldewey, Robert. The Excavations at Babylon, 1914; George, Andrew R. Babylonian Topographical Texts, Orientalia Lovaniensia Analecta 40, 1992; Strabo, Geography XVI.1.5 (Alexander's clearing of the ziggurat); Wiseman, D.J. Nebuchadrezzar and Babylon, Oxford University Press, 1985",
  thumbnail: "",
  tier: "S",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb subverted: "El hombre propone y Dios dispone"
// ═══════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#tower-of-babel",
  title: "La torre que desafió al cielo",
  subtitle:
    "El zigurat real detrás del relato bíblico más famoso sobre la ambición humana \u2014 y por qué Dios bajó en persona a detenerla",
  excerpt:
    "En el corazón de la antigua Babilonia, donde el Éufrates dividía la ciudad más grande de la Tierra, se alzó hacia el cielo una estructura que se convertiría en el edificio inacabado más famoso de la historia \u2014 no porque a sus constructores les faltara habilidad, sino porque, según el relato más antiguo jamás contado sobre la ambición humana, Dios mismo bajó a detenerlos.",
  paragraphs: [
    {
      text: "Imagina un mundo donde todos hablan el mismo idioma. Así empieza el Génesis, capítulo 11. Los descendientes de Noé llegan a una llanura en lo que hoy es el sur de Irak. No hay piedra ni madera. Solo barro. Moldean arcilla del río en ladrillos, los cuecen hasta endurecerlos y los pegan con betún, un alquitrán natural que todavía brota del suelo iraquí. Entonces dicen la frase que lo cambia todo: \u00ABVamos a construir una torre que llegue al cielo.\u00BB",
    },
    {
      text: "Y esa torre existió. Se llamaba Etemenanki \u2014 en sumerio, \u00ABTemplo del Cimiento del Cielo y la Tierra\u00BB. Estaba en Babilonia, y cuando el arqueólogo alemán Robert Koldewey la desenterró en 1899, encontró exactamente lo que describe el Génesis: una base cuadrada enorme, de 91 metros por lado, hecha de ladrillos cocidos y betún. Reconstruida durante siglos, alcanzó su esplendor con el rey Nabucodonosor II, alrededor del 600 a.\u00A0C. Sus propias inscripciones lo dicen claro: \u00ABAlcé su cima para rivalizar con el cielo.\u00BB",
    },
    {
      text: "Siete niveles. Ladrillos esmaltados en azul brillando bajo el sol en la cúspide. Un templo al dios Marduk en lo más alto. Unos 91 metros de altura \u2014 más o menos como la Estatua de la Libertad. En una llanura plana como una mesa, se veía desde 50 kilómetros. Era una montaña hecha por el hombre en un país sin montañas. El historiador griego Heródoto la visitó hacia el 460 a.\u00A0C. y describió a una sacerdotisa que dormía sola en la cumbre cada noche, esperando al dios en persona. Hasta los griegos se quedaron con la boca abierta.",
    },
    {
      text: "El nombre \u00ABBabel\u00BB es un insulto disfrazado. Los babilonios llamaban a su ciudad \u00ABBab-ili\u00BB, que significa \u00ABPuerta de Dios\u00BB. Pero los autores hebreos le dieron la vuelta y lo vincularon a \u00ABbalal\u00BB: confundir. La Puerta de Dios se convirtió en el Lugar de la Confusión. Y aquí viene lo fuerte: ni siquiera fue idea hebrea. Un poema sumerio del 2100 a.\u00A0C., mil años antes del Génesis, ya contaba la misma historia: hubo un tiempo en que todos hablaban una sola lengua, hasta que los dioses la mezclaron. La confusión de las lenguas era una memoria mesopotámica mucho antes de que la Biblia la recogiera.",
    },
    {
      text: "Y tenemos un retrato del hombre que la construyó. En 2011, el investigador Andrew George publicó una estela de piedra negra de la época de Nabucodonosor que muestra al rey de pie junto a su torre, sosteniendo un bastón de constructor, con la cara inclinada hacia la cima. Es la única imagen de la torre terminada que se ha encontrado jamás. Ahí está Nabucodonosor \u2014 el hombre más poderoso del planeta \u2014 mirando hacia arriba lo que construyó con una expresión que solo puedes llamar orgullo convertido en piedra.",
    },
    {
      text: "Dicen que el hombre propone y Dios dispone. Pero la torre no cayó porque Dios la fulminara. Cayó por algo mucho más común: el tiempo. Cuando Alejandro Magno entró en Babilonia en el 331 a.\u00A0C. tras aplastar al Imperio persa, la torre ya se desmoronaba. Los persas la habían dejado pudrirse dos siglos. Alejandro mandó a diez mil soldados a limpiar los escombros. Trabajaron dos meses y apenas avanzaron. Luego él murió de fiebre en el propio palacio de Nabucodonosor, en el 323 a.\u00A0C. Tenía treinta y dos años. Nadie volvió a intentarlo.",
    },
    {
      text: "Hoy solo queda un foso inundado a 85 kilómetros al sur de Bagdad \u2014 un agujero cuadrado donde se levantó la torre más famosa del mundo antiguo. La UNESCO lo declaró Patrimonio de la Humanidad en 2019. Pero el verdadero monumento de la torre no está en Irak. Está en cada idioma que se habla en la Tierra. Está en el hecho de que un chico en Seúl y una chica en Buenos Aires pueden ver el mismo atardecer sin una sola palabra en común para describirlo. Los ladrillos desaparecieron. El betún se deshizo hace siglos. Pero la confusión\u2026 esa es para siempre.",
    },
  ],
  moralOrLesson:
    "La torre nunca fue cuestión de altura \u2014 fue cuestión de unidad, y del terror que provocaba lo que una humanidad unida podía lograr. Cada idioma en la Tierra es un fragmento de aquella totalidad original, y cada acto de traducción es un intento de reconstruir lo que Dios decidió romper. Quizá la lección no es que los humanos no deban aspirar al cielo, sino que el esfuerzo importa más que la llegada \u2014 y que nuestras lenguas dispersas, con toda su confusión, han producido más belleza en su diversidad que cualquier idioma único jamás podría.",
};

// ═══════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb subverted: "Qui trop embrasse mal étreint"
// ═══════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#tower-of-babel",
  title: "La tour qui voulait toucher le ciel",
  subtitle:
    "La véritable ziggourat derrière le récit biblique le plus célèbre sur l'ambition humaine \u2014 et pourquoi Dieu en personne est descendu l'arrêter",
  excerpt:
    "Au c\u0153ur de l'antique Babylone, là où l'Euphrate divisait la plus grande cité du monde, une structure s'est élevée vers le ciel pour devenir le bâtiment inachevé le plus célèbre de l'histoire \u2014 non pas parce que ses bâtisseurs manquaient de talent, mais parce que, selon le plus ancien récit jamais raconté sur l'ambition humaine, Dieu Lui-même est descendu pour les arrêter.",
  paragraphs: [
    {
      text: "Imagine un monde où tout le monde parle la même langue. C'est comme ça que commence la Genèse, chapitre 11. Les descendants de Noé arrivent dans une plaine de ce qui est aujourd'hui le sud de l'Irak \u2014 entre le Tigre et l'Euphrate. Pas de pierre. Pas de bois. Rien que de la boue. Alors ils façonnent l'argile du fleuve en briques, les font cuire et les collent avec du bitume \u2014 du goudron naturel qui suinte encore du sol irakien aujourd'hui. Puis ils prononcent la phrase qui change tout : \u00AB\u00A0Bâtissons une tour dont le sommet touche le ciel.\u00A0\u00BB",
    },
    {
      text: "Et cette tour a vraiment existé. Elle s'appelait Etemenanki \u2014 en sumérien, \u00AB\u00A0Temple des Fondations du Ciel et de la Terre\u00A0\u00BB. Elle se dressait à Babylone, et quand l'archéologue allemand Robert Koldewey l'a mise au jour en 1899, il a trouvé exactement ce que décrit la Genèse : une base carrée gigantesque de 91 mètres de côté, en briques cuites et en bitume. Reconstruite au fil des siècles, elle a atteint son apogée sous Nabuchodonosor II, vers 600 avant notre ère. Ses propres inscriptions ne laissent aucun doute : \u00AB\u00A0J'ai élevé son sommet pour rivaliser avec le ciel.\u00A0\u00BB",
    },
    {
      text: "Sept niveaux. Des briques émaillées bleu vif qui captaient le soleil au sommet. Un temple dédié au dieu Mardouk tout en haut. Environ 91 mètres de hauteur \u2014 à peu près la taille de la statue de la Liberté. Sur une plaine plate comme la main, on la voyait à 50 kilomètres. C'était une montagne fabriquée par l'homme dans un pays qui n'en avait aucune. L'historien grec Hérodote l'a vue vers 460 avant notre ère et a décrit une prêtresse qui dormait seule au sommet chaque nuit, attendant la visite du dieu en personne. Même les Grecs en sont restés bouche bée.",
    },
    {
      text: "Le nom \u00AB\u00A0Babel\u00A0\u00BB est un affront déguisé. Les Babyloniens appelaient leur ville \u00AB\u00A0Bab-ili\u00A0\u00BB \u2014 la \u00AB\u00A0Porte de Dieu\u00A0\u00BB. Mais les auteurs hébreux ont retourné le mot et l'ont rattaché à \u00AB\u00A0balal\u00A0\u00BB : confondre. La Porte de Dieu est devenue le Lieu de la Confusion. Et voilà le plus surprenant : ce n'était même pas une idée hébraïque. Un poème sumérien de 2100 avant notre ère, mille ans avant la Genèse, raconte déjà la même chose : un jour, tous les peuples parlaient une seule langue, puis les dieux l'ont brouillée. La confusion des langues était une mémoire mésopotamienne bien avant que la Bible ne s'en empare.",
    },
    {
      text: "Et on a un portrait de l'homme qui l'a bâtie. En 2011, le chercheur Andrew George a publié une stèle de pierre noire datant de l'époque de Nabuchodonosor. Elle montre le roi debout à côté de sa tour, bâton de bâtisseur en main, le visage levé vers le sommet. C'est la seule image de la tour achevée jamais retrouvée. Nabuchodonosor \u2014 l'homme le plus puissant de la planète \u2014 qui contemple son \u0153uvre avec un regard qu'on ne peut décrire que d'une seule façon : l'orgueil gravé dans la pierre.",
    },
    {
      text: "On dit que qui trop embrasse mal étreint. Mais la tour n'est pas tombée parce que Dieu l'a foudroyée. Elle est tombée à cause de quelque chose de bien plus banal : le temps. Quand Alexandre le Grand est entré dans Babylone en 331 avant notre ère, après avoir écrasé l'Empire perse, la tour s'écroulait déjà. Les Perses l'avaient laissée pourrir pendant deux siècles. Alexandre a envoyé dix mille soldats déblayer les décombres. Ils ont travaillé deux mois pour un résultat dérisoire. Puis il est mort de fièvre dans le palais même de Nabuchodonosor, en 323. Il avait trente-deux ans. Personne n'a réessayé.",
    },
    {
      text: "Aujourd'hui, il ne reste qu'une fosse inondée à 85 kilomètres au sud de Bagdad \u2014 un trou carré là où s'est dressée la plus célèbre tour du monde antique. L'UNESCO l'a inscrite au Patrimoine mondial en 2019. Mais le vrai monument n'est pas en Irak. Il est dans chaque langue parlée sur Terre. Il est dans le fait qu'un gamin à Séoul et un gamin à Marseille peuvent regarder le même coucher de soleil sans un seul mot en commun pour le décrire. Les briques ont disparu. Le bitume s'est effrité il y a des siècles. Mais la confusion\u00A0? Elle, c'est pour toujours.",
    },
  ],
  moralOrLesson:
    "La tour n'a jamais été une question de hauteur \u2014 c'était une question d'unité, et de la terreur qu'inspirait le potentiel d'une humanité unie. Chaque langue sur Terre est un éclat de cette totalité originelle, et chaque acte de traduction est une tentative de reconstruire ce que Dieu a jugé bon de briser. Peut-être que la leçon n'est pas que les humains ne devraient jamais tendre vers le ciel, mais que c'est l'élan qui compte plus que l'arrivée \u2014 et que nos langues dispersées, malgré toute leur confusion, ont produit plus de beauté dans leur diversité qu'aucune langue unique n'aurait jamais pu le faire.",
};

// ═══════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb subverted: "Hochmut kommt vor dem Fall"
// ═══════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#tower-of-babel",
  title: "Der Turm, der den Himmel berühren wollte",
  subtitle:
    "Die echte Zikkurat hinter der berühmtesten biblischen Erzählung über menschlichen Ehrgeiz \u2014 und warum Gott persönlich herunterkam, um sie aufzuhalten",
  excerpt:
    "Im Herzen des antiken Babylon, wo der Euphrat die größte Stadt der Erde teilte, erhob sich ein Bauwerk gen Himmel, das zum berühmtesten unvollendeten Gebäude der Menschheitsgeschichte werden sollte \u2014 nicht weil es seinen Erbauern an Können mangelte, sondern weil laut der ältesten je erzählten Geschichte über menschlichen Ehrgeiz Gott selbst herabstieg, um sie aufzuhalten.",
  paragraphs: [
    {
      text: "Stell dir eine Welt vor, in der alle die gleiche Sprache sprechen. So beginnt Genesis, Kapitel 11. Die Nachkommen Noahs erreichen eine flache Ebene im heutigen Südirak \u2014 das Land zwischen Tigris und Euphrat. Kein Stein. Kein Holz. Nur Schlamm. Also formen sie Flussschlamm zu Ziegeln, brennen sie hart und kleben sie mit Bitumen zusammen \u2014 natürlichem Teer, der bis heute im Irak aus dem Boden blubbert. Dann sagen sie den Satz, der alles verändert: \u201ELasst uns einen Turm bauen, dessen Spitze bis an den Himmel reicht.\u201C",
    },
    {
      text: "Und dieser Turm war real. Er hieß Etemenanki \u2014 sumerisch für \u201ETempel des Fundaments von Himmel und Erde\u201C. Er stand in Babylon, und als der deutsche Archäologe Robert Koldewey ihn 1899 ausgrub, fand er genau das, was die Genesis beschreibt: ein gewaltiges quadratisches Fundament, 91 Meter auf jeder Seite, gebaut aus gebrannten Ziegeln und Bitumen. Über Jahrhunderte immer wieder aufgebaut, erreichte er seinen Höhepunkt unter König Nebukadnezar II. um 600 v.\u00A0Chr. Seine eigenen Inschriften sagen alles: \u201EIch erhob seine Spitze, um mit dem Himmel zu wetteifern.\u201C",
    },
    {
      text: "Sieben Stockwerke. Blau glasierte Ziegel, die in der Sonne leuchteten. Ein Tempel für den Gott Marduk ganz oben. Etwa 91 Meter hoch \u2014 ungefähr so hoch wie die Freiheitsstatue. In einer Ebene, flach wie ein Tisch, konnte man ihn aus 50 Kilometern Entfernung sehen. Ein von Menschen gebauter Berg in einem Land ohne Berge. Der griechische Historiker Herodot sah ihn um 460 v.\u00A0Chr. und beschrieb eine Priesterin, die jede Nacht allein auf der Spitze schlief und auf den Gott persönlich wartete. Selbst die Griechen waren beeindruckt.",
    },
    {
      text: "Der Name \u201EBabel\u201C ist ein versteckter Seitenhieb. Die Babylonier nannten ihre Stadt \u201EBab-ili\u201C \u2014 \u201ETor Gottes\u201C. Aber die hebräischen Autoren drehten das Wort um und verbanden es mit \u201Ebalal\u201C \u2014 verwirren. Das Tor Gottes wurde zum Ort der Verwirrung. Und jetzt kommt\u2019s: Das war nicht mal eine hebräische Idee. Ein sumerisches Gedicht von 2100 v.\u00A0Chr., tausend Jahre vor der Genesis, erzählt dieselbe Geschichte: Einst sprachen alle Menschen eine Sprache, dann verwirrten die Götter sie. Die Sprachverwirrung war eine mesopotamische Erinnerung, lange bevor die Bibel sie aufgriff.",
    },
    {
      text: "Und wir haben ein Porträt des Mannes, der ihn gebaut hat. 2011 veröffentlichte der Forscher Andrew George eine Stele aus schwarzem Stein aus der Zeit Nebukadnezars. Sie zeigt den König neben seinem Turm, einen Baustab in der Hand, das Gesicht nach oben zur Spitze gerichtet. Es ist das einzige Bild des fertigen Turms, das je gefunden wurde. Da steht Nebukadnezar \u2014 der mächtigste Mann der Welt \u2014 und blickt auf sein Werk mit einem Ausdruck, den man nur eines nennen kann: Stolz, in Stein gemeißelt.",
    },
    {
      text: "Hochmut kommt vor dem Fall, heißt es. Aber der Turm fiel nicht, weil Gott ihn niederschmetterte. Er fiel durch etwas viel Gewöhnlicheres: die Zeit. Als Alexander der Große 331 v.\u00A0Chr. nach dem Sieg über das Perserreich in Babylon einzog, bröckelte der Turm bereits. Die Perser hatten ihn zwei Jahrhunderte lang verrotten lassen. Alexander befahl zehntausend Soldaten, den Schutt wegzuräumen. Sie arbeiteten zwei Monate und kamen kaum voran. Dann starb er 323 v.\u00A0Chr. an Fieber in Nebukadnezars eigenem Palast. Er war zweiunddreißig. Niemand versuchte es je wieder.",
    },
    {
      text: "Heute ist da nur noch eine überschwemmte Grube, 85 Kilometer südlich von Bagdad \u2014 ein quadratisches Loch, wo einst der gewaltigste Turm der Antike stand. Die UNESCO erklärte ihn 2019 zum Weltkulturerbe. Aber das wahre Denkmal steht nicht im Irak. Es steckt in jeder Sprache, die auf der Erde gesprochen wird. Es steckt darin, dass ein Kind in Seoul und ein Kind in München denselben Sonnenuntergang betrachten können, ohne ein einziges gemeinsames Wort dafür zu haben. Die Ziegel sind weg. Das Bitumen zerfiel vor Jahrhunderten. Aber die Verwirrung? Die bleibt für immer.",
    },
  ],
  moralOrLesson:
    "Beim Turm ging es nie um Höhe \u2014 es ging um Einheit und um die Angst vor dem, was eine geeinte Menschheit werden könnte. Jede Sprache auf der Erde ist ein Splitter jener ursprünglichen Ganzheit, und jede Übersetzung ist der Versuch, das wieder aufzubauen, was Gott zu zerbrechen beschloss. Vielleicht lautet die Lektion nicht, dass Menschen niemals nach dem Himmel greifen sollten, sondern dass das Greifen wichtiger ist als das Ankommen \u2014 und dass unsere verstreuten Sprachen in all ihrer Verwirrung mehr Schönheit hervorgebracht haben, als es eine einzige Sprache je gekonnt hätte.",
};

// ═══════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════

const versions = [
  { lang: "es", item: es },
  { lang: "fr", item: fr },
  { lang: "de", item: de },
];

for (const { lang, item } of versions) {
  try {
    console.log(`\n━━━ Pushing ${lang.toUpperCase()} version ━━━`);
    console.log(`  siteId:      ${item.siteId}`);
    console.log(`  langStoryId: ${item.langStoryId}`);
    console.log(`  title:       ${item.title}`);
    console.log(`  paragraphs:  ${item.paragraphs.length}`);
    console.log(`  updatedAt:   ${item.updatedAt}`);

    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
      })
    );

    console.log(`  ✓ ${lang.toUpperCase()} pushed successfully`);
  } catch (err) {
    console.error(`  ✗ ${lang.toUpperCase()} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log("\n═══ All 3 languages pushed successfully ═══\n");
