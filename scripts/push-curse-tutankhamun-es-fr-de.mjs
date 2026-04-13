import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const base = {
  siteId: "valley-of-the-kings",
  storyId: "curse-of-tutankhamun",
  icon: "\u2620\uFE0F",
  tier: "S",
  source:
    "Carter, Howard. The Tomb of Tutankhamen (1923-1933); Tyldesley, Joyce. Tutankhamen\u2019s Curse (2012)",
  era: "Discovery period (1922-1929)",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 32.6014, lat: 25.7402 },
  hasAudio: false,
  isFree: true,
  storyCategory: "ghosts_curses",
  updatedAt: now,
};

// ─────────────────────────────────────────────
// SPANISH
// ─────────────────────────────────────────────
// Proverb: "No hay dos sin tres" (there's never two without three)
// Subverted: "No hubo dos sin tres… ni tres sin once."
// Register: modern Spanish storyteller — Iker Jiménez / high-quality podcast

const es = {
  ...base,
  lang: "es",
  langStoryId: "es#curse-of-tutankhamun",
  title: "La maldici\u00f3n de Tutankam\u00f3n",
  subtitle: "La tumba que mat\u00f3 a quienes la abrieron",
  excerpt:
    "En 1922, Howard Carter encontr\u00f3 la tumba de un fara\u00f3n con su tesoro intacto. En cuesti\u00f3n de meses, quienes hab\u00edan estado dentro empezaron a morir \u2014 y naci\u00f3 la maldici\u00f3n m\u00e1s famosa del mundo.",
  moralOrLesson:
    "Los muertos merecen su descanso, y quienes lo perturban \u2014 ya sea por ira ancestral o por su propia culpa \u2014 siempre terminan pagando un precio.",
  characters: [
    "Howard Carter",
    "Lord Carnarvon",
    "Tutankam\u00f3n",
    "Sir Arthur Conan Doyle",
  ],
  paragraphs: [
    {
      text: "En noviembre de 1922, el arque\u00f3logo brit\u00e1nico Howard Carter logr\u00f3 lo que nadie hab\u00eda conseguido en tres mil a\u00f1os: encontrar la tumba de un fara\u00f3n con todo su tesoro dentro. Tutankam\u00f3n, un rey egipcio muerto a los diecinueve a\u00f1os, llevaba sellado en el Valle de los Reyes, cerca de Luxor, desde hac\u00eda m\u00e1s de tres milenios. La m\u00e1scara de oro, los sarc\u00f3fagos encajados uno dentro de otro, miles de objetos brillando bajo la luz de las l\u00e1mparas\u2026 El mundo nunca hab\u00eda visto nada igual. Pero en cuesti\u00f3n de meses, el mayor hallazgo de la arqueolog\u00eda empez\u00f3 a cobrar vidas.",
    },
    {
      text: "Lord Carnarvon, el arist\u00f3crata ingl\u00e9s que hab\u00eda financiado la b\u00fasqueda de Carter durante a\u00f1os, estuvo presente cuando se abri\u00f3 la tumba. Cinco meses despu\u00e9s, estaba muerto. Un mosquito le pic\u00f3 en El Cairo; se cort\u00f3 la picadura al afeitarse, se infect\u00f3, y el 5 de abril de 1923 la infecci\u00f3n lo mat\u00f3. En el momento exacto de su muerte, seg\u00fan testigos, todas las luces de El Cairo se apagaron de golpe \u2014 un apag\u00f3n en toda la ciudad que nadie supo explicar. En su finca de Inglaterra, su perra Susie aull\u00f3 una sola vez y cay\u00f3 muerta.",
    },
    {
      text: "La prensa enloqueci\u00f3. Arthur Conan Doyle \u2014 el creador de Sherlock Holmes y firme creyente en lo sobrenatural \u2014 declar\u00f3 p\u00fablicamente que Carnarvon hab\u00eda sido v\u00edctima de una maldici\u00f3n antigua. Los peri\u00f3dicos inventaron una advertencia supuestamente tallada sobre la entrada de la tumba: \u00abLa muerte vendr\u00e1 con alas veloces para quien perturbe el descanso del Rey\u00bb. Esa inscripci\u00f3n jam\u00e1s existi\u00f3. Pero la historia era demasiado perfecta, y nadie iba a dejar que la realidad la estropeara.",
    },
    {
      text: "Y entonces empezaron a morir m\u00e1s. George Jay Gould, un millonario estadounidense que visit\u00f3 la tumba, muri\u00f3 de neumon\u00eda a los pocos meses. El pr\u00edncipe Ali Fahmy, un acaudalado egipcio presente en la apertura, fue abatido por su esposa en el hotel Savoy de Londres. El radi\u00f3logo que examin\u00f3 la momia muri\u00f3 de un mal inexplicable. Para 1929, once personas vinculadas al descubrimiento hab\u00edan muerto antes de tiempo. No hubo dos sin tres\u2026 ni tres sin once. Y los peri\u00f3dicos llevaban la cuenta con un entusiasmo macabro.",
    },
    {
      text: "Pero hay un dato que deber\u00eda haber acabado con la historia de un plumazo: Howard Carter \u2014 el hombre que abri\u00f3 la tumba, toc\u00f3 cada objeto y pas\u00f3 diez a\u00f1os catalogando su contenido \u2014 vivi\u00f3 diecisiete a\u00f1os m\u00e1s. Muri\u00f3 en 1939, a los sesenta y cuatro, de causas naturales. Si el esp\u00edritu de Tutankam\u00f3n quer\u00eda vengarse de quienes perturbaron su descanso, se salt\u00f3 al principal responsable. Si la maldici\u00f3n era real, ten\u00eda una punter\u00eda p\u00e9sima.",
    },
    {
      text: "La ciencia ha ofrecido respuestas m\u00e1s terrenales. Investigadores encontraron moho peligroso en tumbas egipcias selladas \u2014 del tipo que puede provocar infecciones mortales en alguien con la salud debilitada, que era exactamente el caso de Carnarvon. Y las famosas \u00abmuertes de la maldici\u00f3n\u00bb no resisten un an\u00e1lisis serio. Muchas personas vinculadas al descubrimiento vivieron vidas largas y saludables. Solo que nunca salieron en los peri\u00f3dicos, porque \u00abHombre visita tumba antigua y no le pasa nada\u00bb no vende ni una portada.",
    },
    {
      text: "Y sin embargo, la maldici\u00f3n de Tutankam\u00f3n se niega a morir \u2014 no porque alguien crea de verdad en faraones vengativos, sino porque la historia toca algo que todos llevamos dentro. Tres mil a\u00f1os de silencio, rotos en una tarde. Y en el fondo, casi todos sentimos que ese silencio deber\u00eda haberse respetado. Quiz\u00e1 la verdadera maldici\u00f3n nunca fue sobrenatural. Quiz\u00e1 es solo la advertencia m\u00e1s antigua del mundo: hay cosas que se enterraron por algo.",
    },
  ],
};

// ─────────────────────────────────────────────
// FRENCH
// ─────────────────────────────────────────────
// Proverb: "Jamais deux sans trois" (never two without three)
// Subverted: "Jamais deux sans trois, dit-on. Sauf qu'ici, il n'y eut jamais trois sans onze."
// Register: modern French storyteller — Frank Ferrand / Patrick Baud (Axolot)

const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#curse-of-tutankhamun",
  title: "La mal\u00e9diction de Tout\u00e2nkhamon",
  subtitle: "La tombe qui tuait ceux qui l\u2019ouvraient",
  excerpt:
    "En 1922, Howard Carter d\u00e9couvre la tombe d\u2019un pharaon encore intacte. En quelques mois, ceux qui y sont entr\u00e9s commencent \u00e0 mourir \u2014 et la mal\u00e9diction la plus c\u00e9l\u00e8bre au monde voit le jour.",
  moralOrLesson:
    "Les morts m\u00e9ritent leur repos, et ceux qui le troublent \u2014 que ce soit par la col\u00e8re des anciens ou par leur propre culpabilit\u00e9 \u2014 finissent toujours par en payer le prix.",
  characters: [
    "Howard Carter",
    "Lord Carnarvon",
    "Tout\u00e2nkhamon",
    "Sir Arthur Conan Doyle",
  ],
  paragraphs: [
    {
      text: "En novembre 1922, l\u2019arch\u00e9ologue britannique Howard Carter r\u00e9ussit ce que personne n\u2019avait accompli en trois mille ans\u00a0: trouver la tombe d\u2019un pharaon avec son tr\u00e9sor encore \u00e0 l\u2019int\u00e9rieur. Tout\u00e2nkhamon, un roi \u00e9gyptien mort \u00e0 dix-neuf ans, reposait scell\u00e9 dans la Vall\u00e9e des Rois, pr\u00e8s de Louxor, depuis plus de trois mill\u00e9naires. Le masque fun\u00e9raire en or, les sarcophages embo\u00eet\u00e9s, des milliers d\u2019objets scintillant \u00e0 la lueur des lampes \u2014 le monde n\u2019avait jamais rien vu de pareil. Mais en l\u2019espace de quelques mois, la plus grande d\u00e9couverte de l\u2019arch\u00e9ologie a commenc\u00e9 \u00e0 tuer.",
    },
    {
      text: "Lord Carnarvon, l\u2019aristocrate anglais qui finan\u00e7ait les recherches de Carter depuis des ann\u00e9es, \u00e9tait pr\u00e9sent quand on a ouvert la tombe. Cinq mois plus tard, il \u00e9tait mort. Un moustique l\u2019avait piqu\u00e9 au Caire\u00a0; il avait entaill\u00e9 la piq\u00fbre en se rasant, elle s\u2019\u00e9tait infect\u00e9e, et le 5 avril 1923, l\u2019infection l\u2019avait emport\u00e9. \u00c0 l\u2019instant pr\u00e9cis de sa mort, selon les t\u00e9moins, toutes les lumi\u00e8res du Caire se sont \u00e9teintes d\u2019un coup \u2014 une panne g\u00e9ante que personne n\u2019a jamais expliqu\u00e9e. Dans son domaine en Angleterre, sa chienne Susie aurait pouss\u00e9 un unique hurlement avant de s\u2019effondrer, morte.",
    },
    {
      text: "La presse a perdu la t\u00eate. Arthur Conan Doyle \u2014 le p\u00e8re de Sherlock Holmes et fervent adepte du surnaturel \u2014 a d\u00e9clar\u00e9 publiquement que Carnarvon avait \u00e9t\u00e9 tu\u00e9 par une mal\u00e9diction antique. Les journaux ont invent\u00e9 un avertissement pr\u00e9tendument grav\u00e9 au-dessus de l\u2019entr\u00e9e\u00a0: \u00ab\u00a0La mort viendra sur ses ailes rapides pour celui qui trouble le repos du Roi.\u00a0\u00bb Cette inscription n\u2019a jamais exist\u00e9. Mais l\u2019histoire \u00e9tait trop belle, et personne n\u2019allait laisser les faits g\u00e2cher un aussi bon r\u00e9cit.",
    },
    {
      text: "Et puis d\u2019autres sont morts. George Jay Gould, un millionnaire am\u00e9ricain venu visiter la tombe, emport\u00e9 par une pneumonie en quelques mois. Le prince Ali Fahmy, un riche \u00c9gyptien pr\u00e9sent lors de l\u2019ouverture, abattu par sa femme au Savoy de Londres. Le radiologue qui avait examin\u00e9 la momie aux rayons X, fauch\u00e9 par un mal inexpliqu\u00e9. En 1929, onze personnes li\u00e9es \u00e0 la d\u00e9couverte \u00e9taient mortes avant l\u2019heure. Jamais deux sans trois, dit-on. Sauf qu\u2019ici, il n\u2019y eut jamais trois sans onze \u2014 et les journaux tenaient le d\u00e9compte avec une d\u00e9lectation morbide.",
    },
    {
      text: "Mais voil\u00e0 le d\u00e9tail qui aurait d\u00fb enterrer cette histoire une bonne fois pour toutes\u00a0: Howard Carter lui-m\u00eame \u2014 l\u2019homme qui a ouvert le tombeau, touch\u00e9 chaque objet, pass\u00e9 dix ans \u00e0 en cataloguer le contenu \u2014 a v\u00e9cu encore dix-sept ans. Il est mort en 1939, \u00e0 soixante-quatre ans, de causes naturelles. Si l\u2019esprit de Tout\u00e2nkhamon voulait se venger de ceux qui avaient troubl\u00e9 son repos, il a oubli\u00e9 le principal coupable. Si la mal\u00e9diction \u00e9tait r\u00e9elle, elle avait un s\u00e9rieux probl\u00e8me de vis\u00e9e.",
    },
    {
      text: "La science a fourni des explications plus terre \u00e0 terre. Des chercheurs ont trouv\u00e9 des moisissures dangereuses dans des tombes \u00e9gyptiennes scell\u00e9es \u2014 le genre capable de provoquer des infections mortelles chez quelqu\u2019un \u00e0 la sant\u00e9 d\u00e9j\u00e0 fragile, ce qui \u00e9tait pr\u00e9cis\u00e9ment le cas de Carnarvon. Et les fameuses \u00ab\u00a0morts de la mal\u00e9diction\u00a0\u00bb ne r\u00e9sistent pas \u00e0 l\u2019analyse. De nombreuses personnes li\u00e9es \u00e0 la d\u00e9couverte ont v\u00e9cu longtemps et en bonne sant\u00e9. Sauf qu\u2019elles n\u2019ont jamais fait la une, parce que \u00ab\u00a0Un homme visite une tombe ancienne, il ne se passe rien\u00a0\u00bb n\u2019a jamais fait vendre un seul journal.",
    },
    {
      text: "Et pourtant, la mal\u00e9diction de Tout\u00e2nkhamon refuse de mourir \u2014 non parce que quiconque croit vraiment aux pharaons vengeurs, mais parce que cette histoire touche quelque chose de profond en chacun de nous. Trois mille ans de silence, bris\u00e9s en un apr\u00e8s-midi. Et quelque part, tout au fond, on sent tous que ce silence aurait d\u00fb \u00eatre respect\u00e9. Peut-\u00eatre que la vraie mal\u00e9diction n\u2019a jamais \u00e9t\u00e9 surnaturelle. Peut-\u00eatre que c\u2019est simplement l\u2019avertissement le plus ancien du monde\u00a0: certaines choses ont \u00e9t\u00e9 enterr\u00e9es pour une bonne raison.",
    },
  ],
};

// ─────────────────────────────────────────────
// GERMAN
// ─────────────────────────────────────────────
// Proverb: "Aller guten Dinge sind drei" (all good things come in threes)
// Subverted: "Aller guten Dinge sind drei, sagt man. Hier waren es elf."
// Register: modern German storyteller — Terra X / Harald Lesch level

const de = {
  ...base,
  lang: "de",
  langStoryId: "de#curse-of-tutankhamun",
  title: "Der Fluch des Tutanchamun",
  subtitle: "Das Grab, das seine Entdecker t\u00f6tete",
  excerpt:
    "1922 fand Howard Carter ein Pharaonengrab, noch immer voller Sch\u00e4tze. Innerhalb weniger Monate begannen die Beteiligten zu sterben \u2014 und der ber\u00fchmteste Fluch der Welt war geboren.",
  moralOrLesson:
    "Die Toten verdienen ihre Ruhe \u2014 und wer sie st\u00f6rt, ob durch antiken Zorn oder das eigene Gewissen, zahlt am Ende immer einen Preis.",
  characters: [
    "Howard Carter",
    "Lord Carnarvon",
    "Tutanchamun",
    "Sir Arthur Conan Doyle",
  ],
  paragraphs: [
    {
      text: "Im November 1922 gelang dem britischen Arch\u00e4ologen Howard Carter, was niemandem in dreitausend Jahren gelungen war: Er fand das Grab eines Pharaos \u2014 mit dem gesamten Schatz noch darin. Tutanchamun, ein \u00e4gyptischer K\u00f6nig, der mit gerade einmal neunzehn Jahren gestorben war, lag versiegelt im Tal der K\u00f6nige bei Luxor. Die goldene Totenmaske, die ineinander verschachtelten Sarkophage, Tausende Artefakte, die im Lampenlicht schimmerten \u2014 die Welt hatte so etwas noch nie gesehen. Doch innerhalb weniger Monate forderte die gr\u00f6\u00dfte Entdeckung der Arch\u00e4ologie ihre ersten Toten.",
    },
    {
      text: "Lord Carnarvon, der wohlhabende englische Aristokrat, der Carters Suche jahrelang finanziert hatte, war dabei, als das Grab ge\u00f6ffnet wurde. F\u00fcnf Monate sp\u00e4ter war er tot. Ein M\u00fcckenstich in Kairo; beim Rasieren ritzte er die Stelle auf, sie entz\u00fcndete sich, und am 5. April 1923 t\u00f6tete ihn die Infektion. Im genauen Moment seines Todes, so die Augenzeugen, gingen in ganz Kairo s\u00e4mtliche Lichter aus \u2014 ein stadtweiter Stromausfall, den niemand erkl\u00e4ren konnte. Auf seinem Landsitz in England soll seine H\u00fcndin Susie einmal aufgeheult haben \u2014 und dann tot umgefallen sein.",
    },
    {
      text: "Die Presse drehte durch. Arthur Conan Doyle \u2014 Sch\u00f6pfer von Sherlock Holmes und \u00fcberzeugter Anh\u00e4nger des \u00dcbersinnlichen \u2014 erkl\u00e4rte \u00f6ffentlich, Carnarvon sei von einem uralten Fluch get\u00f6tet worden. Zeitungen erfanden eine Warnung, die angeblich \u00fcber dem Grabeingang gemei\u00dfelt stand: \u201eDer Tod wird auf schnellen Schwingen zu dem kommen, der die Ruhe des K\u00f6nigs st\u00f6rt.\u201c Diese Inschrift hat nie existiert. Aber die Geschichte war zu gut, und niemand wollte sich von ein paar Fakten die Schlagzeile verderben lassen.",
    },
    {
      text: "Und dann starben weitere. George Jay Gould, ein amerikanischer Million\u00e4r, der das Grab besichtigt hatte \u2014 wenige Monate sp\u00e4ter tot an einer Lungenentz\u00fcndung. Prinz Ali Fahmy, ein reicher \u00c4gypter, der bei der \u00d6ffnung dabei gewesen war \u2014 von seiner Frau im Londoner Savoy erschossen. Der Radiologe, der Tutanchamuns Mumie ger\u00f6ntgt hatte \u2014 an einer r\u00e4tselhaften Krankheit gestorben. Bis 1929 waren elf Menschen, die mit der Entdeckung zu tun hatten, vorzeitig tot. Aller guten Dinge sind drei, sagt man. Hier waren es elf \u2014 und die Zeitungen f\u00fchrten Buch mit grimmiger Begeisterung.",
    },
    {
      text: "Aber da ist ein Detail, das die ganze Geschichte h\u00e4tte begraben m\u00fcssen: Howard Carter selbst \u2014 der Mann, der das Grab aufgebrochen, jedes Artefakt ber\u00fchrt und zehn Jahre mit der Katalogisierung verbracht hatte \u2014 lebte noch siebzehn weitere Jahre. Er starb 1939 mit vierundsechzig, eines nat\u00fcrlichen Todes. Wenn Tutanchamuns Geist Rache an jenen wollte, die seine Ruhe gest\u00f6rt hatten, dann hat er ausgerechnet den Hauptverantwortlichen \u00fcbersprungen. Wenn der Fluch echt war, hatte er eine miserable Trefferquote.",
    },
    {
      text: "Die Wissenschaft hat n\u00fcchternere Antworten geliefert. Forscher fanden gef\u00e4hrliche Schimmelpilze in versiegelten \u00e4gyptischen Gr\u00e4bern \u2014 die Art, die bei jemandem mit angeschlagener Gesundheit t\u00f6dliche Infektionen ausl\u00f6sen kann. Und genau das war bei Carnarvon der Fall. Die ber\u00fchmten \u201eFluchtode\u201c halten einer \u00dcberpr\u00fcfung nicht stand. Zahlreiche Personen, die mit der Entdeckung in Verbindung standen, lebten lang und gesund. Nur schaffte es keiner von ihnen in die Zeitung \u2014 weil \u201eMann besucht altes Grab, nichts passiert\u201c keine Schlagzeile ist.",
    },
    {
      text: "Und trotzdem weigert sich der Fluch des Tutanchamun zu sterben \u2014 nicht weil irgendjemand ernsthaft an rachs\u00fcchtige Pharaonen glaubt, sondern weil diese Geschichte etwas trifft, das tief in uns allen steckt. Dreitausend Jahre Stille, an einem einzigen Nachmittag gebrochen. Und irgendwo ganz tief drinnen sp\u00fcren die meisten von uns: Diese Stille h\u00e4tte man in Ruhe lassen sollen. Vielleicht war der wahre Fluch nie \u00fcbernat\u00fcrlich. Vielleicht ist er einfach die \u00e4lteste Warnung der Welt: Manche Dinge wurden aus gutem Grund begraben.",
    },
  ],
};

// ─────────────────────────────────────────────
// PUSH TO DYNAMODB
// ─────────────────────────────────────────────

const stories = [
  { label: "Spanish (es)", data: es },
  { label: "French (fr)", data: fr },
  { label: "German (de)", data: de },
];

for (const { label, data } of stories) {
  console.log(`\nPushing ${label}...`);
  console.log(`  langStoryId: ${data.langStoryId}`);
  console.log(`  title: ${data.title}`);
  console.log(`  paragraphs: ${data.paragraphs.length}`);

  // Validate before pushing
  const jsonStr = JSON.stringify(data);
  try {
    JSON.parse(jsonStr); // round-trip validation
  } catch (err) {
    console.error(`  JSON VALIDATION FAILED for ${label}:`, err.message);
    process.exit(1);
  }
  console.log(`  JSON valid (${jsonStr.length} chars)`);

  try {
    const result = await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
      })
    );
    console.log(`  SUCCESS (HTTP ${result.$metadata.httpStatusCode})`);
  } catch (err) {
    console.error(`  FAILED for ${label}:`, err.message);
    process.exit(1);
  }
}

console.log("\nAll three languages pushed successfully.");
