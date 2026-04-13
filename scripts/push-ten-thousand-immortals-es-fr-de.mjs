// Push Spanish (es), French (fr), and German (de) recreations of
// "The Ten Thousand Immortals" (ten-thousand-immortals)
// to the Story table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across all languages) ─────────────────────────
const shared = {
  siteId: "persepolis",
  storyId: "ten-thousand-immortals",
  icon: "\uD83D\uDEE1\uFE0F",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  isFeatured: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 29.9342, lng: 52.8914 },
  source: `Herodotus, Histories VII.41, VII.61, VII.83, VII.211, VII.218; Arrian, Anabasis Alexandri 3.11.5; Shahbazi, A. Sh., 'Army i. Pre-Islamic Iran,' Encyclopaedia Iranica; Briant, Pierre, From Cyrus to Alexander (2002); Sekunda, Nicholas, The Persian Army 560-330 BC (Osprey, 1992); Root, Margaret Cool, The King and Kingship in Achaemenid Art (1979)`,
  updatedAt: now,
};

// ═════════════════════════════════════════════════════════════════════════════
// SPANISH (es) — Modern Castilian · Podcast / popular nonfiction register
//
// Register: a skilled modern storyteller narrating a historical legend.
// Think a top-tier Spanish podcast or popular history book.
// Conversational, punchy, vivid — never academic, never casual texting.
//
// Proverb: A la tercera va la vencida
// (Third time's the charm)
// Subversion: The Immortals didn't need three tries. They were pushed
// back once — just once — and instead of insisting, they crossed
// the entire mountain at night. Sometimes you don't need la tercera.
// ═════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#ten-thousand-immortals",

  title: `Los Inmortales`,

  subtitle: `Los guerreros de oro que jam\u00e1s mor\u00edan \u2014 y la marcha nocturna entre monta\u00f1as que decidi\u00f3 la batalla m\u00e1s famosa de la historia`,

  excerpt: `Los llamaban Inmortales, no porque fueran invencibles, sino porque cada vez que uno ca\u00eda, otro ocupaba su lugar al instante. La unidad siempre sumaba exactamente diez mil: siempre completa, siempre intacta, siempre eterna.`,

  moralOrLesson: `La historia recuerda las Term\u00f3pilas como la gesta de trescientos espartanos, pero la verdadera historia es la de diez mil persas que cruzaron monta\u00f1as en la oscuridad y convirtieron un punto muerto en victoria. Los Inmortales no perdieron en las Term\u00f3pilas. Ganaron. Lo que perdieron fue el relato.`,

  era: `550\u2013330 a.\u00a0C.; Batalla de las Term\u00f3pilas, 480 a.\u00a0C.`,

  characters: [
    `Hidarnes (comandante de los Inmortales en las Term\u00f3pilas)`,
    `Jerjes I (el Gran Rey de Persia)`,
    `Le\u00f3nidas de Esparta`,
    `Efialtes (el traidor)`,
    `Los Portadores de la Manzana (Meloforoi)`,
  ],

  paragraphs: [
    {
      text: `Imag\u00ednate diez mil soldados cubiertos de oro. Oro de verdad: brazaletes, pendientes, contrapesos de oro en las lanzas. T\u00fanicas de p\u00farpura y azafr\u00e1n sobre armaduras de escamas. Sus arcos mataban a doscientos cincuenta metros. Los mil mejores \u2014 los Portadores de la Manzana \u2014 llevaban lanzas con una granada de oro en la punta. El resto, de plata. Eran los Inmortales persas: la fuerza de combate m\u00e1s letal del mundo antiguo, dise\u00f1ada para aterrorizarte antes de empezar a pelear.`,
    },
    {
      text: `\u00bfPor qu\u00e9 \u00abInmortales\u00bb? Por un truco genial. Cada vez que uno mor\u00eda \u2014en combate, por enfermedad, daba igual\u2014 su sustituto ya estaba esperando. La unidad siempre ten\u00eda exactamente diez mil hombres. Siempre. Desde el otro lado, parec\u00eda que no pod\u00edas matarlos. Ve\u00edas caer a uno y otro aparec\u00eda en su lugar al instante, como si la muerte no fuera con ellos. Hay quien cree que fue una confusi\u00f3n: en persa, \u00abcompa\u00f1eros\u00bb sonaba parecido a \u00abinmortales\u00bb para o\u00eddos griegos. Pero el nombre se qued\u00f3 para siempre.`,
    },
    {
      text: `Su gran momento: las Term\u00f3pilas, 480 a.\u00a0C. La batalla que crees conocer por la pel\u00edcula 300 \u2014 solo que Hollywood se dej\u00f3 algo en el tintero. Cuando Jerjes invadi\u00f3 Grecia, siete mil griegos bloquearon un desfiladero costero, las Puertas Calientes: quince metros de ancho. Los Inmortales cargaron y fueron rechazados. No porque fueran malos soldados, sino porque el terreno anulaba todas sus ventajas. Sin espacio para las flechas, sin forma de usar sus n\u00fameros. Solo combate cuerpo a cuerpo contra armaduras m\u00e1s pesadas y lanzas m\u00e1s largas.`,
    },
    {
      text: `Pero los Inmortales no perdieron en las Term\u00f3pilas. Ganaron. Un traidor griego llamado Efialtes \u2014cuyo nombre significa \u00abpesadilla\u00bb\u2014 revel\u00f3 a Jerjes un sendero oculto que rodeaba las l\u00edneas griegas. Jerjes envi\u00f3 a los diez mil al caer la noche. Subieron entre bosques de robles en total oscuridad, esquivaron a los vig\u00edas de la cumbre y al amanecer aparecieron a espaldas de los griegos. Diez mil hombres en silencio, de noche, monta\u00f1a arriba: una de las maniobras m\u00e1s brillantes de la historia antigua.`,
    },
    {
      text: `Cuando los griegos vieron a los Inmortales a su espalda, todo acab\u00f3. Le\u00f3nidas mand\u00f3 a casa al grueso de sus aliados y resisti\u00f3 con trescientos espartanos y un millar de voluntarios. Pelearon con lanzas hasta romperlas, luego con espadas, luego a pu\u00f1o limpio. Pero el resultado estaba sellado desde que completaron aquella marcha. A la tercera va la vencida, dicen \u2014 pero ellos no necesitaron ni dos. Los frenaron una vez, y en vez de insistir, cruzaron la monta\u00f1a de noche. Occidente recuerda a trescientos muertos. De los diez mil que ganaron, casi nadie sabe sus nombres.`,
    },
    {
      text: `En Pers\u00e9polis \u2014la capital ceremonial del imperio persa, en el actual Ir\u00e1n\u2014 los Inmortales est\u00e1n tallados en piedra a lo largo de escalinatas monumentales. Fila tras fila de guerreros id\u00e9nticos, lanzas perfectamente verticales, extendi\u00e9ndose por muros enteros. La repetici\u00f3n es el mensaje. Un solo soldado impone respeto. Diez mil soldados id\u00e9nticos ya no son un ej\u00e9rcito: son una declaraci\u00f3n. No est\u00e1s mirando hombres. Est\u00e1s mirando una m\u00e1quina.`,
    },
    {
      text: `Hoy, ese guardia tallado en piedra es uno de los s\u00edmbolos m\u00e1s reconocidos de la cultura iran\u00ed: en billetes, sellos, joyas y paredes de hogares iran\u00edes por todo el mundo. Cuando la pel\u00edcula 300 los convirti\u00f3 en monstruos sin cara, Ir\u00e1n se indign\u00f3. No por una pel\u00edcula, sino porque Occidente lleva siglos convirtiendo en villano de cart\u00f3n a una civilizaci\u00f3n que construy\u00f3 carreteras de Egipto a la India. Los Inmortales no eran una horda brutal. Eran guerreros orgullosos, cubiertos de oro, para quienes servir a su rey era el mayor honor.`,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// FRENCH (fr) — Modern French · Podcast / popular nonfiction register
//
// Register: a compelling French storyteller — think Franck Ferrand or
// a high-quality podcast. Conversational tu-form, vivid, authoritative
// but never dry or academic.
//
// Proverb: Jamais deux sans trois
// (Never two without three)
// Subversion: The Immortals were pushed back once. Just once. They
// didn't even need a second try, let alone a third. They went over
// the mountain instead. Jamais deux sans trois? They didn't even
// need deux.
// ═════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#ten-thousand-immortals",

  title: `Les Immortels`,

  subtitle: `Les guerriers d\u2019or qui ne mouraient jamais \u2014 et la marche nocturne \u00e0 travers les montagnes qui a d\u00e9cid\u00e9 de la plus c\u00e9l\u00e8bre bataille de l\u2019Histoire`,

  excerpt: `On les appelait les Immortels \u2014 non parce qu\u2019ils \u00e9taient invincibles, mais parce que chaque fois que l\u2019un d\u2019eux tombait, un autre prenait aussit\u00f4t sa place. L\u2019unit\u00e9 comptait toujours exactement dix mille hommes : toujours au complet, toujours intacte, toujours \u00e9ternelle.`,

  moralOrLesson: `L\u2019histoire des Thermopyles, en Occident, c\u2019est celle de trois cents Spartiates. Mais la vraie histoire, c\u2019est celle de dix mille Perses qui ont travers\u00e9 des for\u00eats de montagne dans le noir pour transformer un blocage en victoire. Les Immortels n\u2019ont pas perdu aux Thermopyles. Ils ont gagn\u00e9. Ce qu\u2019ils ont perdu, c\u2019est le r\u00e9cit.`,

  era: `550\u2013330 av. J.-C. ; Bataille des Thermopyles, 480 av. J.-C.`,

  characters: [
    `Hydarn\u00e8s (commandant des Immortels aux Thermopyles)`,
    `Xerx\u00e8s Ier (le Grand Roi de Perse)`,
    `L\u00e9onidas de Sparte`,
    `\u00c9phialte (le tra\u00eetre)`,
    `Les Porteurs de Pomme (M\u00e9lophores)`,
  ],

  paragraphs: [
    {
      text: `Imagine dix mille soldats couverts d\u2019or. De l\u2019or v\u00e9ritable. Bracelets, boucles d\u2019oreilles, contrepoids dor\u00e9s aux lances. Sous leurs robes pourpres et safran, une armure d\u2019\u00e9cailles cach\u00e9e. Leurs arcs tuaient \u00e0 deux cent cinquante m\u00e8tres. Les mille plus redoutables \u2014 les Porteurs de Pomme \u2014 avaient des lances \u00e0 pointe de grenade en or. Les autres, en argent. C\u2019\u00e9taient les Immortels de Perse, la force de frappe la plus redoutable de l\u2019Antiquit\u00e9, con\u00e7ue pour te glacer le sang avant le premier coup.`,
    },
    {
      text: `Pourquoi \u00ab\u00a0Immortels\u00a0\u00bb ? \u00c0 cause d\u2019un tour de g\u00e9nie. Chaque fois que l\u2019un d\u2019eux tombait \u2014 au combat, de maladie, peu importe \u2014 son rempla\u00e7ant \u00e9tait d\u00e9j\u00e0 pr\u00eat. L\u2019unit\u00e9 comptait toujours exactement dix mille hommes. Toujours. Vu d\u2019en face, on aurait dit qu\u2019ils \u00e9taient impossibles \u00e0 tuer. Tu en voyais un s\u2019effondrer et un autre prenait sa place aussit\u00f4t, comme si la mort glissait sur eux. Certains pensent que c\u2019est un malentendu : en perse, \u00ab\u00a0compagnons\u00a0\u00bb ressemblait \u00e0 \u00ab\u00a0immortels\u00a0\u00bb pour des Grecs. Mais le nom est rest\u00e9.`,
    },
    {
      text: `Leur heure de gloire : les Thermopyles, 480 avant notre \u00e8re. La bataille que tu crois conna\u00eetre gr\u00e2ce au film 300 \u2014 sauf que Hollywood a oubli\u00e9 un d\u00e9tail. Quand Xerx\u00e8s a envahi la Gr\u00e8ce, sept mille Grecs ont bloqu\u00e9 un d\u00e9fil\u00e9 c\u00f4tier appel\u00e9 les Portes Chaudes : quinze m\u00e8tres de large. Les Immortels ont charg\u00e9. Repouss\u00e9s. Pas par manque de valeur \u2014 le terrain annulait tout. Pas de place pour les archers, impossible d\u2019exploiter le surnombre. Rien que du corps \u00e0 corps contre des armures plus lourdes et des lances plus longues.`,
    },
    {
      text: `Mais les Immortels n\u2019ont pas perdu aux Thermopyles. Ils ont gagn\u00e9. Un tra\u00eetre grec du nom d\u2019\u00c9phialte \u2014 dont le nom signifie \u00ab\u00a0cauchemar\u00a0\u00bb \u2014 a r\u00e9v\u00e9l\u00e9 \u00e0 Xerx\u00e8s un sentier de montagne cach\u00e9 qui contournait les lignes grecques. Xerx\u00e8s y a envoy\u00e9 les dix mille \u00e0 la tomb\u00e9e de la nuit. Ils ont gravi des for\u00eats de ch\u00eanes dans l\u2019obscurit\u00e9 totale, \u00e9vit\u00e9 les sentinelles au sommet et surgi \u00e0 l\u2019aube dans le dos des Grecs. Dix mille hommes, en silence, de nuit, \u00e0 travers la montagne \u2014 l\u2019une des man\u0153uvres les plus audacieuses de l\u2019Antiquit\u00e9.`,
    },
    {
      text: `Quand les Grecs ont vu les Immortels dans leur dos, c\u2019\u00e9tait pli\u00e9. L\u00e9onidas a renvoy\u00e9 ses alli\u00e9s et tenu avec trois cents Spartiates et un millier de volontaires. Ils se sont battus \u00e0 la lance, puis \u00e0 l\u2019\u00e9p\u00e9e, puis \u00e0 mains nues. Mais l\u2019issue \u00e9tait scell\u00e9e depuis la marche. Jamais deux sans trois, dit-on \u2014 mais les Immortels n\u2019ont m\u00eame pas eu besoin de deux. Repouss\u00e9s une seule fois, ils ont franchi la montagne dans le noir. L\u2019Occident se souvient des trois cents. Les dix mille vainqueurs ? Personne ne conna\u00eet leurs noms.`,
    },
    {
      text: `\u00c0 Pers\u00e9polis \u2014 capitale de c\u00e9r\u00e9monie de l\u2019Empire perse, dans l\u2019Iran actuel \u2014 les Immortels sont grav\u00e9s dans la pierre le long d\u2019escaliers monumentaux. Rang\u00e9e apr\u00e8s rang\u00e9e de guerriers identiques, lances parfaitement verticales, sur toute la longueur des murs. La r\u00e9p\u00e9tition est le message. Un soldat, c\u2019est impressionnant. Dix mille soldats identiques, ce n\u2019est plus une arm\u00e9e : c\u2019est une d\u00e9claration. Tu ne regardes pas des hommes. Tu regardes une machine.`,
    },
    {
      text: `Aujourd\u2019hui, ce garde immortel grav\u00e9 dans la pierre est l\u2019un des symboles les plus forts de la culture iranienne : billets, timbres, bijoux, murs de foyers iraniens partout dans le monde. Quand le film 300 en a fait des monstres sans visage, l\u2019Iran s\u2019est indign\u00e9. Pas pour un film \u2014 mais parce que l\u2019Occident s\u2019obstine \u00e0 caricaturer une civilisation qui a b\u00e2ti des routes de l\u2019\u00c9gypte \u00e0 l\u2019Inde. Les Immortels n\u2019\u00e9taient pas une horde brutale. Des guerriers fiers, couverts d\u2019or, pour qui servir leur roi \u00e9tait le plus grand honneur.`,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// GERMAN (de) — Modern German · Podcast / popular nonfiction register
//
// Register: a compelling German storyteller — think a quality podcast
// or Terra X documentary, but more conversational. Du-form, vivid,
// punchy. Never dry or academic.
//
// Proverb: Aller guten Dinge sind drei
// (All good things come in threes)
// Subversion: The Immortals were pushed back once. "Aller guten Dinge
// sind drei"? They didn't even need two. One setback, one night march,
// one victory. The West remembers dreihundert. The ten thousand who
// won? Barely a footnote.
// ═════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#ten-thousand-immortals",

  title: `Die Unsterblichen`,

  subtitle: `Die goldenen Krieger, die niemals starben \u2014 und der Nachtmarsch \u00fcber die Berge, der die ber\u00fchmteste Schlacht der Geschichte entschied`,

  excerpt: `Man nannte sie die Unsterblichen \u2014 nicht weil sie unverwundbar waren, sondern weil jedes Mal, wenn einer fiel, sofort ein anderer an seine Stelle trat. Die Einheit z\u00e4hlte immer genau zehntausend Mann \u2014 immer vollst\u00e4ndig, immer intakt, immer ewig.`,

  moralOrLesson: `Die Geschichte der Thermopylen wird im Westen als Legende von dreihundert Spartanern erz\u00e4hlt. Aber die wahre Geschichte handelt von zehntausend Persern, die nachts durch Bergw\u00e4lder marschierten und eine Pattsituation in einen Sieg verwandelten. Die Unsterblichen haben die Thermopylen nicht verloren. Sie haben gewonnen. Was sie verloren haben, ist das Narrativ.`,

  era: `550\u2013330 v.\u00a0Chr.; Schlacht an den Thermopylen, 480 v.\u00a0Chr.`,

  characters: [
    `Hydarnes (Befehlshaber der Unsterblichen an den Thermopylen)`,
    `Xerxes I. (der Gro\u00dfk\u00f6nig von Persien)`,
    `Leonidas von Sparta`,
    `Ephialtes (der Verr\u00e4ter)`,
    `Die Apfeltr\u00e4ger (Melophoroi)`,
  ],

  paragraphs: [
    {
      text: `Stell dir zehntausend Soldaten vor, in Gold geh\u00fcllt. Kein Symbol \u2014 echtes Gold. Armreife, Ohrringe, goldene Gegengewichte an den Lanzen. Unter purpur- und safranfarbenen Gew\u00e4ndern trugen sie versteckte Schuppenpanzer. Ihre B\u00f6gen t\u00f6teten auf zweihundertf\u00fcnfzig Meter. Die tausend Besten \u2014 die Apfeltr\u00e4ger \u2014 f\u00fchrten Lanzen mit goldenen Granat\u00e4pfeln an der Spitze. Der Rest: Silber. Das waren die persischen Unsterblichen, die schlagkr\u00e4ftigste Truppe der Antike, gebaut, um den Feind zu brechen, bevor es losging.`,
    },
    {
      text: `Woher der Name \u201eUnsterbliche\u201c? Von einem genialen Trick. Jedes Mal, wenn einer fiel \u2014 im Kampf, durch Krankheit, egal wie \u2014, stand sein Ersatzmann schon bereit. Die Einheit z\u00e4hlte immer genau zehntausend. Immer. Von au\u00dfen wirkten sie, als k\u00f6nne man sie nicht t\u00f6ten. Du sahst einen fallen, und sofort stand ein anderer an seiner Stelle, als ginge der Tod an ihnen vorbei. Manche glauben, es war ein Missverst\u00e4ndnis \u2014 das persische Wort f\u00fcr \u201eGef\u00e4hrten\u201c klang in fremden Ohren wie \u201eUnsterbliche\u201c. Der Name blieb.`,
    },
    {
      text: `Ihr gr\u00f6\u00dfter Auftritt: die Thermopylen, 480 v.\u00a0Chr. \u2014 die Schlacht, die du aus dem Film 300 zu kennen glaubst. Aber Hollywood hat etwas verschwiegen. Als Xerxes in Griechenland einfiel, blockierten siebentausend Griechen einen K\u00fcstenpass: die Hei\u00dfen Tore, f\u00fcnfzehn Meter breit. Die Unsterblichen griffen an und wurden zur\u00fcckgeschlagen. Nicht weil sie schlecht k\u00e4mpften \u2014 das Terrain machte jeden Vorteil zunichte. Kein Platz f\u00fcr Bogensch\u00fctzen, keine Chance, die \u00dcberzahl zu nutzen. Nur Nahkampf gegen schwerere R\u00fcstungen und l\u00e4ngere Speere.`,
    },
    {
      text: `Aber die Unsterblichen haben die Thermopylen nicht verloren. Sie haben gewonnen. Ein griechischer Verr\u00e4ter namens Ephialtes \u2014 sein Name bedeutet \u201eAlbtraum\u201c \u2014 verriet Xerxes einen verborgenen Bergpfad hinter den Griechen. Xerxes schickte alle zehntausend bei Einbruch der Dunkelheit auf diesen Weg. Sie stiegen durch Eichenw\u00e4lder in v\u00f6lliger Finsternis, umgingen die Wachposten auf dem Gipfel und tauchten im Morgengrauen im R\u00fccken der Griechen auf. Zehntausend Mann, lautlos, nachts, \u00fcber die Berge \u2014 eines der k\u00fchnsten Man\u00f6ver der Antike.`,
    },
    {
      text: `Als die Griechen die Unsterblichen in ihrem R\u00fccken sahen, war alles vorbei. Leonidas schickte seine Verb\u00fcndeten heim und hielt mit dreihundert Spartanern und rund tausend Freiwilligen stand. Speere, bis sie brachen. Schwerter. Blo\u00dfe F\u00e4uste. Aber das Ergebnis stand fest, seit der Marsch vollendet war. Aller guten Dinge sind drei, sagt man \u2014 die Unsterblichen brauchten nicht mal zwei. Einmal zur\u00fcckgeschlagen, und sie nahmen den Berg in der Nacht. Der Westen erinnert sich an dreihundert Tote. Die zehntausend Sieger? Kaum eine Fu\u00dfnote.`,
    },
    {
      text: `In Persepolis \u2014 der Zeremonienhauptstadt des Perserreichs im heutigen Iran \u2014 sind die Unsterblichen in Stein gemei\u00dfelt, an monumentalen Treppen entlang. Reihe um Reihe identischer Krieger, die Lanzen kerzengerade, \u00fcber ganze Mauerl\u00e4ngen. Die Wiederholung ist die Botschaft. Ein Soldat beeindruckt. Zehntausend identische Soldaten sind kein Heer mehr \u2014 das ist eine Ansage. Du schaust nicht auf Menschen. Du schaust auf eine Maschine.`,
    },
    {
      text: `Heute ist diese steinerne Leibgarde eines der bekanntesten Symbole Irans \u2014 auf Geldscheinen, Briefmarken, Schmuck und an W\u00e4nden iranischer Wohnungen weltweit. Als der Film 300 sie zu gesichtslosen Monstern machte, war Iran emp\u00f6rt. Nicht wegen eines Films, sondern weil der Westen seit Jahrhunderten eine Zivilisation, die Stra\u00dfen von \u00c4gypten bis Indien baute, zum B\u00f6sewicht degradiert. Die Unsterblichen waren keine hirnlose Horde. Sie waren stolze, goldgeschm\u00fcckte Krieger, f\u00fcr die der Dienst am K\u00f6nig die h\u00f6chste Ehre war.`,
    },
  ],
};

// ─── Validation & Push ──────────────────────────────────────────────────────

const stories = [
  { label: "Spanish (es)", data: es },
  { label: "French (fr)", data: fr },
  { label: "German (de)", data: de },
];

for (const { label, data } of stories) {
  console.log(`\n─── ${label} ───`);

  // Validate required text fields
  for (const field of ["title", "subtitle", "excerpt", "moralOrLesson"]) {
    if (!data[field] || data[field].trim() === "") {
      console.error(`\u274c ${label}: Missing or empty field: ${field}`);
      process.exit(1);
    }
  }

  // Paragraph validation
  let totalChars = 0;
  for (let i = 0; i < data.paragraphs.length; i++) {
    const text = data.paragraphs[i].text;
    if (!text || text.trim() === "") {
      console.error(`\u274c ${label}: Paragraph ${i + 1} has empty text`);
      process.exit(1);
    }
    if (text.length > 600) {
      console.error(
        `\u274c ${label}: Paragraph ${i + 1} exceeds 600 chars (${text.length})`
      );
      process.exit(1);
    }
    totalChars += text.length;
    console.log(`  P${i + 1}: ${text.length} chars`);
  }
  console.log(`  Total: ${totalChars} chars (target: ~3000)`);
  console.log(`  Paragraphs: ${data.paragraphs.length} (target: 6-8)`);

  if (data.paragraphs.length < 6 || data.paragraphs.length > 10) {
    console.error(
      `\u274c ${label}: Paragraph count ${data.paragraphs.length} outside range (6-10)`
    );
    process.exit(1);
  }

  if (totalChars < 2400 || totalChars > 3600) {
    console.error(
      `\u274c ${label}: Total chars ${totalChars} outside acceptable range (2400-3600)`
    );
    process.exit(1);
  }

  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: data }));
    console.log(`\u2705 ${label} pushed successfully (${data.langStoryId})`);
  } catch (err) {
    console.error(`\u274c ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log("\n\u2705 All three stories pushed to Story table.");
