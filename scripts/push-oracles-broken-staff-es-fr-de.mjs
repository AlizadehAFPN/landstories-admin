import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════
// SHARED FIELDS (unchanged from English)
// ═══════════════════════════════════════════════════════════════

const base = {
  siteId: "baalbek",
  storyId: "oracles-broken-staff",
  icon: "\u{1F52E}",
  storyCategory: "prophecies_curses",
  era: "114 CE (Trajan\u2019s consultation); c. 400 CE (Macrobius\u2019s account); 391 CE (temple closure)",
  tier: "S",
  isFree: true,
  hasAudio: false,
  characters: [
    "Emperor Trajan (Marcus Ulpius Traianus)",
    "Jupiter Heliopolitanus (the oracle god)",
    "Macrobius (Roman author who recorded the prophecy)",
    "Baal-Hadad (the Canaanite storm god beneath Jupiter\u2019s mask)",
    "Emperor Theodosius I (who silenced the oracle forever)",
  ],
  coordinates: { lat: 34.0069, lng: 36.2039 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 4,
  source:
    "Macrobius, Saturnalia I.23 (c. 400 CE); Cassius Dio, Roman History LXVIII.29; Hajjar, Youssef. La triade d\u2019H\u00e9liopolis-Baalbek, 1977; Kropp & Lohmann, Temple Construction at Baalbek, 2011; Butcher, Kevin. Roman Syria and the Near East, 2003",
  updatedAt: now,
  disabled: false,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH
// Proverb: "Dios aprieta pero no ahorca" — subverted:
//   the god of Baalbek did something worse than strangling.
// Register: skilled modern storyteller, popular nonfiction.
// ═══════════════════════════════════════════════════════════════

const es = {
  ...base,
  lang: "es",
  langStoryId: "es#oracles-broken-staff",
  title: "La profec\u00eda del bast\u00f3n roto",
  subtitle:
    "El emperador que puso a prueba al or\u00e1culo con una carta en blanco y recibi\u00f3 el presagio de su propia muerte envuelto en un bast\u00f3n de mando partido",
  excerpt:
    "Antes de marchar al este para conquistar Partia, el hombre m\u00e1s poderoso del mundo envi\u00f3 una carta sellada al or\u00e1culo de Baalbek. La carta estaba en blanco. Era una trampa.",
  moralOrLesson:
    "Hasta los hombres m\u00e1s poderosos buscan el consejo de fuerzas mayores que ellos \u2014 y las profec\u00edas m\u00e1s aterradoras no son las que predicen el desastre, sino las que prometen la victoria total y esconden el precio en un acertijo que nadie puede descifrar hasta que ya es demasiado tarde.",
  paragraphs: [
    {
      text: "En el a\u00f1o 114, Trajano era el hombre m\u00e1s poderoso de la Tierra. El Senado lo hab\u00eda nombrado Optimus, el mejor de todos. Hab\u00eda conquistado naciones y levantado monumentos que siguen en pie. Pero quedaba una cuenta pendiente: Partia, el imperio oriental que humillaba a Roma desde hac\u00eda siglos. La herida m\u00e1s famosa fue Carras, donde Craso perdi\u00f3 su ej\u00e9rcito entero. Trajano iba a cerrar esa deuda. Pero antes de mover un soldado, hizo algo inesperado. Le escribi\u00f3 una carta a un dios.",
    },
    {
      text: "Y no a cualquier dios. Eligi\u00f3 al or\u00e1culo de Baalbek, un templo colosal en lo que hoy es L\u00edbano. Bajo su nombre romano, J\u00fapiter Heliopolitano, se escond\u00eda Baal, el antiguo dios de la tormenta, adorado en esa colina milenios antes de Roma. El or\u00e1culo funcionaba as\u00ed: los sacerdotes cargaban una estatua dorada en una plataforma, y cuando alguien preguntaba, la estatua se mov\u00eda sola \u2014 giraba, se sacud\u00eda, retroced\u00eda. Los sacerdotes le\u00edan esos movimientos como la voz del dios.",
    },
    {
      text: "Pero Trajano no era de los que conf\u00edan f\u00e1cil. Era un soldado que hab\u00eda llegado a la cima por m\u00e9rito, no por linaje, con el instinto de un comandante que verifica cada informe. As\u00ed que le tendi\u00f3 una trampa al dios. Sell\u00f3 una carta en blanco con el sello imperial y la envi\u00f3 al templo. Demu\u00e9strame que eres real. Los sacerdotes hicieron sus rituales. Y el or\u00e1culo respondi\u00f3 con un pergamino vac\u00edo. Nada escrito. Un espejo perfecto. La trampa no fall\u00f3: se convirti\u00f3 en prueba.",
    },
    {
      text: "Convencido, Trajano hizo su verdadera pregunta \u2014 la que no lo dejaba dormir. \u00bfTriunfar\u00eda su invasi\u00f3n? \u00bfVolver\u00eda vivo a casa? El or\u00e1culo no respondi\u00f3 con palabras. Los sacerdotes tomaron el bast\u00f3n de un centuri\u00f3n \u2014 la vara de madera que los oficiales romanos llevaban como s\u00edmbolo de mando \u2014 y lo partieron en pedazos. Envolvieron los fragmentos en un pa\u00f1o y se los mandaron al emperador. Era un acertijo. Y tardar\u00eda tres a\u00f1os en resolverse.",
    },
    {
      text: "Al principio, la campa\u00f1a fue una obra maestra. Trajano arras\u00f3 Mesopotamia, tom\u00f3 Ctesifonte \u2014 la capital parta \u2014 y lleg\u00f3 al golfo P\u00e9rsico, m\u00e1s al este que cualquier legi\u00f3n romana. En la orilla, lament\u00f3 no ser joven para seguir a Alejandro hasta la India. Despu\u00e9s, todo se derrumb\u00f3. Estallaron revueltas. Su salud se quebr\u00f3. En el 117, navegando a casa, sufri\u00f3 un derrame cerebral y muri\u00f3. Sus cenizas volvieron a Roma en una urna de oro, bajo la columna que lleva su nombre.",
    },
    {
      text: "Un bast\u00f3n partido y envuelto en tela. Un cuerpo partido y enviado de vuelta a casa. El or\u00e1culo hab\u00eda respondido con una precisi\u00f3n brutal: lo conquistar\u00e1s todo. Y no volver\u00e1s con vida. Dicen que Dios aprieta pero no ahorca. El dios de Baalbek hizo algo peor: le dio exactamente lo que pidi\u00f3 y escondi\u00f3 el precio en un acertijo que nadie supo leer hasta que fue demasiado tarde.",
    },
    {
      text: "El dios que hizo esa predicci\u00f3n sobrevivi\u00f3 a Trajano por siglos. Peregrinos cruzaban el imperio entero para preguntarle sobre el amor, la guerra y la muerte. Hasta que en el 391, el emperador cristiano Teodosio \u2014 que ve\u00eda a los dioses antiguos como demonios \u2014 prohibi\u00f3 todo culto pagano en Roma. Los fuegos de Baalbek se apagaron. La estatua dorada fue destruida. El or\u00e1culo que una vez predijo la muerte de emperadores enmudeci\u00f3 para siempre.",
    },
    {
      text: "Hoy, seis columnas enormes siguen en pie en Baalbek \u2014 las m\u00e1s altas que sobreviven del mundo antiguo. Son los \u00faltimos testigos de un dios lo bastante poderoso para que los emperadores lo escucharan, y lo bastante honesto para decirles lo que no quer\u00edan o\u00edr. El bast\u00f3n ya no existe. La profec\u00eda se cumpli\u00f3.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FRENCH
// Proverb: "L'homme propose, Dieu dispose" — subverted:
//   the god of Baalbek did something worse: he granted everything.
// Register: skilled modern storyteller, popular nonfiction.
// ═══════════════════════════════════════════════════════════════

const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#oracles-broken-staff",
  title: "Le b\u00e2ton bris\u00e9 de l\u2019oracle",
  subtitle:
    "L\u2019empereur qui testa l\u2019oracle avec une lettre vierge \u2014 et re\u00e7ut l\u2019annonce de sa propre mort envelopp\u00e9e dans le b\u00e2ton bris\u00e9 d\u2019un centurion",
  excerpt:
    "Avant de marcher vers l\u2019est pour conqu\u00e9rir la Parthie, l\u2019homme le plus puissant du monde envoya une lettre scell\u00e9e \u00e0 l\u2019oracle de Baalbek. La lettre \u00e9tait vierge. C\u2019\u00e9tait un pi\u00e8ge.",
  moralOrLesson:
    "M\u00eame les hommes les plus puissants cherchent le conseil de forces qui les d\u00e9passent \u2014 et les proph\u00e9ties les plus terrifiantes ne sont pas celles qui annoncent la d\u00e9faite, mais celles qui promettent une victoire totale en dissimulant le prix dans une \u00e9nigme que personne ne peut d\u00e9chiffrer avant qu\u2019il ne soit trop tard.",
  paragraphs: [
    {
      text: "En 114, Trajan \u00e9tait l\u2019homme le plus puissant du monde. Le S\u00e9nat l\u2019avait honor\u00e9 d\u2019un titre unique\u00a0: Optimus, le meilleur des princes. Il avait conquis des nations, b\u00e2ti des monuments encore debout. Mais il restait un objectif\u00a0: la Parthie \u2014 l\u2019empire oriental qui humiliait Rome depuis deux si\u00e8cles. La pire humiliation\u00a0? Carrhes, o\u00f9 Crassus perdit son arm\u00e9e. Trajan allait achever ce que Rome n\u2019avait jamais pu. Avant de d\u00e9placer un soldat, il fit l\u2019impensable. Il \u00e9crivit une lettre \u00e0 un dieu.",
    },
    {
      text: "Pas n\u2019importe quel dieu. Il choisit l\u2019oracle de Baalbek \u2014 un temple colossal dans l\u2019actuel Liban. Sous son nom romain, Jupiter H\u00e9liopolitain \u00e9tait en r\u00e9alit\u00e9 Baal, le dieu de la temp\u00eate, v\u00e9n\u00e9r\u00e9 sur cette colline des mill\u00e9naires avant Rome. L\u2019oracle fonctionnait ainsi\u00a0: les pr\u00eatres portaient une statue dor\u00e9e sur une plateforme, et \u00e0 chaque question, la statue bougeait toute seule \u2014 tournait, vacillait, reculait. Les pr\u00eatres lisaient ces mouvements comme la voix du dieu.",
    },
    {
      text: "Mais Trajan n\u2019\u00e9tait pas du genre cr\u00e9dule. Un soldat mont\u00e9 au sommet par le m\u00e9rite, pas par le sang, avec les r\u00e9flexes d\u2019un commandant qui v\u00e9rifie chaque rapport. Alors il tendit un pi\u00e8ge au dieu. Il scella une lettre vierge avec le sceau imp\u00e9rial et l\u2019envoya au temple. Prouve-moi que tu es r\u00e9el. Les pr\u00eatres accomplirent leurs rituels. L\u2019oracle renvoya un rouleau vierge. Rien d\u2019\u00e9crit. Le miroir parfait de ce que Trajan avait envoy\u00e9. Le pi\u00e8ge n\u2019avait pas \u00e9chou\u00e9. Il s\u2019\u00e9tait retourn\u00e9 en preuve.",
    },
    {
      text: "Convaincu, Trajan posa sa vraie question \u2014 celle qui l\u2019emp\u00eachait de dormir. Son invasion r\u00e9ussirait-elle\u00a0? Rentrerait-il vivant\u00a0? L\u2019oracle ne r\u00e9pondit pas avec des mots. Les pr\u00eatres prirent le b\u00e2ton d\u2019un centurion \u2014 la canne de bois que les officiers romains portaient comme symbole de commandement \u2014 et le bris\u00e8rent en morceaux. Ils envelopp\u00e8rent les fragments dans un tissu et envoy\u00e8rent le paquet \u00e0 l\u2019empereur. C\u2019\u00e9tait une \u00e9nigme. Et il faudrait trois ans pour la r\u00e9soudre.",
    },
    {
      text: "Au d\u00e9but, la campagne fut un chef-d\u2019\u0153uvre. Trajan balaya la M\u00e9sopotamie, prit Ct\u00e9siphon \u2014 la capitale parthe \u2014 et atteignit le golfe Persique, plus \u00e0 l\u2019est qu\u2019aucune arm\u00e9e romaine n\u2019irait jamais. Sur le rivage, il regretta de ne pas \u00eatre assez jeune pour suivre Alexandre jusqu\u2019en Inde. Puis tout s\u2019effondra. R\u00e9voltes. Maladie. En 117, sur la route du retour, une attaque foudroyante le terrassa. Ses cendres furent ramen\u00e9es \u00e0 Rome dans une urne d\u2019or, sous la colonne qui porte encore son nom.",
    },
    {
      text: "Un b\u00e2ton bris\u00e9, envelopp\u00e9 dans un tissu. Un corps bris\u00e9, ramen\u00e9 chez lui. L\u2019oracle avait r\u00e9pondu avec une pr\u00e9cision implacable\u00a0: tu conquerras tout. Et tu ne reviendras jamais vivant. On dit que l\u2019homme propose et Dieu dispose. Le dieu de Baalbek fit quelque chose de pire\u00a0: il accorda tout ce que Trajan demandait et cacha le prix dans une \u00e9nigme que personne ne sut d\u00e9chiffrer \u00e0 temps.",
    },
    {
      text: "Le dieu qui avait fait cette pr\u00e9diction surv\u00e9cut \u00e0 Trajan de plusieurs si\u00e8cles. Des p\u00e8lerins traversaient l\u2019empire pour l\u2019interroger sur l\u2019amour, la guerre et la mort. Puis, en 391, l\u2019empereur chr\u00e9tien Th\u00e9odose \u2014 qui voyait les anciens dieux comme des d\u00e9mons \u2014 interdit tout culte pa\u00efen \u00e0 travers l\u2019Empire romain. Les feux de Baalbek s\u2019\u00e9teignirent. La statue dor\u00e9e fut d\u00e9truite. L\u2019oracle qui avait un jour pr\u00e9dit la mort d\u2019empereurs se tut \u00e0 jamais.",
    },
    {
      text: "Aujourd\u2019hui, six colonnes massives se dressent encore \u00e0 Baalbek \u2014 les plus hautes colonnes antiques encore debout au monde. Ce sont les derniers t\u00e9moins d\u2019un dieu assez puissant pour que les empereurs l\u2019\u00e9coutent, et assez honn\u00eate pour leur dire ce qu\u2019ils ne voulaient pas entendre. Le b\u00e2ton a disparu. La proph\u00e9tie, elle, s\u2019est accomplie.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// GERMAN
// Proverb: "Der Mensch denkt, Gott lenkt" — subverted:
//   the god of Baalbek did something worse: he gave everything
//   and hid the price in an unsolvable riddle.
// Register: skilled modern storyteller, popular nonfiction.
// ═══════════════════════════════════════════════════════════════

const de = {
  ...base,
  lang: "de",
  langStoryId: "de#oracles-broken-staff",
  title: "Der zerbrochene Stab",
  subtitle:
    "Der Kaiser, der das Orakel mit einem leeren Brief auf die Probe stellte \u2014 und die Prophezeiung seines eigenen Todes erhielt, eingewickelt in den zerbrochenen Stab eines Zenturio",
  excerpt:
    "Bevor er nach Osten marschierte, um Parthien zu erobern, schickte der m\u00e4chtigste Mann der Welt einen versiegelten Brief an das Orakel von Baalbek. Der Brief war leer. Es war ein Test.",
  moralOrLesson:
    "Selbst die m\u00e4chtigsten Menschen suchen den Rat von Kr\u00e4ften, die gr\u00f6\u00dfer sind als sie selbst \u2014 und die furchtbarsten Prophezeiungen sind nicht jene, die Niederlage voraussagen, sondern jene, die den vollst\u00e4ndigen Sieg versprechen und den Preis in einem R\u00e4tsel verbergen, das niemand rechtzeitig l\u00f6sen kann.",
  paragraphs: [
    {
      text: "Im Jahr 114 war Trajan der m\u00e4chtigste Mann der Welt. Der Senat nannte ihn Optimus \u2014 den Besten. Er hatte V\u00f6lker unterworfen und Bauwerke errichtet, die noch stehen. Doch da war eine offene Rechnung: Parthien, das Ostreich, das Rom seit Jahrhunderten dem\u00fctigte. Die gr\u00f6\u00dfte Schmach? Carrhae, wo Crassus sein Heer verlor. Trajan wollte beenden, was Rom nie geschafft hatte. Doch bevor er einen Soldaten losschickte, tat er etwas Unerwartetes. Er schrieb einen Brief \u2014 an einen Gott.",
    },
    {
      text: "Nicht an irgendeinen Gott. Er w\u00e4hlte das Orakel von Baalbek \u2014 einen gewaltigen Tempel im heutigen Libanon. Hinter dem r\u00f6mischen Namen Jupiter Heliopolitanus verbarg sich Baal, der uralte Sturmgott, seit Jahrtausenden auf diesem H\u00fcgel verehrt. Das Orakel funktionierte einzigartig: Priester trugen eine goldene Statue auf einer Plattform, und bei jeder Frage bewegte sie sich von allein \u2014 drehte sich, schwankte, wich zur\u00fcck. Die Priester deuteten diese Bewegungen als die Stimme des Gottes.",
    },
    {
      text: "Aber Trajan war kein leichtgl\u00e4ubiger Mann. Ein Soldat, aufgestiegen durch Leistung, nicht Abstammung, mit dem Instinkt eines Kommandeurs, der jeden Bericht pr\u00fcft. Also stellte er dem Gott eine Falle. Er versiegelte einen leeren Brief mit dem kaiserlichen Siegel und schickte ihn zum Tempel. Beweise mir, dass du echt bist. Die Priester vollzogen ihre Rituale. Das Orakel antwortete \u2014 mit einer leeren Schriftrolle. Ein perfekter Spiegel. Die Falle war nicht gescheitert. Sie war zum Beweis geworden.",
    },
    {
      text: "\u00dcberzeugt stellte Trajan seine eigentliche Frage \u2014 die, die ihn nachts wachhielt. W\u00fcrde seine Invasion gelingen? W\u00fcrde er lebend nach Hause kommen? Das Orakel antwortete nicht mit Worten. Die Priester nahmen den Stab eines Zenturio \u2014 den Holzstock, den r\u00f6mische Offiziere als Zeichen ihrer Befehlsgewalt trugen \u2014 und zerbrachen ihn in St\u00fccke. Sie wickelten die Fragmente in ein Tuch und schickten das B\u00fcndel dem Kaiser. Es war ein R\u00e4tsel. Und es w\u00fcrde drei Jahre dauern, bis es sich l\u00f6ste.",
    },
    {
      text: "Anfangs war der Feldzug ein Meisterwerk. Trajan fegte durch Mesopotamien, nahm Ktesiphon \u2014 die parthische Hauptstadt \u2014 und erreichte den Persischen Golf, weiter \u00f6stlich als je ein r\u00f6misches Heer. Am Ufer bedauerte er, nicht jung genug zu sein, um Alexander bis nach Indien zu folgen. Dann brach alles zusammen. Aufst\u00e4nde. Krankheit. Im Jahr 117, auf der Heimreise, erlitt er einen Schlaganfall und starb. Seine Asche kam in einer goldenen Urne nach Rom \u2014 unter die S\u00e4ule, die seinen Namen tr\u00e4gt.",
    },
    {
      text: "Ein Stab, zerbrochen und in Tuch gewickelt. Ein K\u00f6rper, zerbrochen und nach Hause gebracht. Das Orakel hatte mit gnadenloser Pr\u00e4zision geantwortet: Du wirst alles erobern. Und du wirst nie lebend zur\u00fcckkehren. Man sagt, der Mensch denkt und Gott lenkt. Der Gott von Baalbek tat etwas Schlimmeres: Er gab Trajan alles, was er sich w\u00fcnschte \u2014 und versteckte den Preis in einem R\u00e4tsel, das niemand rechtzeitig l\u00f6sen konnte.",
    },
    {
      text: "Der Gott, der diese Prophezeiung gemacht hatte, \u00fcberlebte Trajan um Jahrhunderte. Pilger durchquerten das gesamte Reich, um ihn nach Liebe, Krieg und Tod zu befragen. Dann, im Jahr 391, verbot der christliche Kaiser Theodosius \u2014 der die alten G\u00f6tter f\u00fcr D\u00e4monen hielt \u2014 jeglichen heidnischen Kult im R\u00f6mischen Reich. Die Feuer von Baalbek erloschen. Die goldene Statue wurde zerst\u00f6rt. Das Orakel, das einst den Tod von Kaisern vorausgesagt hatte, verstummte f\u00fcr immer.",
    },
    {
      text: "Heute stehen noch sechs gewaltige S\u00e4ulen in Baalbek \u2014 die h\u00f6chsten erhaltenen S\u00e4ulen der antiken Welt. Sie sind die letzten Zeugen eines Gottes, der m\u00e4chtig genug war, dass Kaiser ihm zuh\u00f6rten, und ehrlich genug, ihnen zu sagen, was sie nicht h\u00f6ren wollten. Der Stab ist verschwunden. Die Prophezeiung hat sich erf\u00fcllt.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// VALIDATION + PUSH
// ═══════════════════════════════════════════════════════════════

function validate(story) {
  const label = `${story.lang} \u2014 ${story.title}`;
  console.log(`\n\u2550\u2550\u2550 Validating: ${label} \u2550\u2550\u2550`);

  let totalChars = 0;
  let allOk = true;

  for (let i = 0; i < story.paragraphs.length; i++) {
    const p = story.paragraphs[i].text;
    const chars = p.length;
    const words = p.split(/\s+/).length;
    totalChars += chars;

    const charOk = chars <= 500;
    const wordOk = words <= 100;
    if (!charOk || !wordOk) allOk = false;

    console.log(
      `  P${i + 1}: ${chars} chars, ${words} words ${charOk ? "\u2713" : "\u26a0\ufe0f OVER 500 CHARS"} ${wordOk ? "\u2713" : "\u26a0\ufe0f OVER 100 WORDS"}`
    );
  }

  console.log(
    `  Total: ${story.paragraphs.length} paragraphs, ${totalChars} characters`
  );
  const inRange = totalChars >= 2400 && totalChars <= 4200;
  console.log(
    `  Target: ~3000 chars \u00b120%. ${inRange ? "\u2713 IN RANGE" : "\u26a0\ufe0f OUT OF RANGE"}`
  );

  if (!allOk) {
    console.error(`  \u274c Validation FAILED for ${label}`);
  }
  return allOk;
}

async function pushStory(story) {
  const label = `${story.lang}#oracles-broken-staff`;
  console.log(`\n\u27a1\ufe0f  Pushing: ${label}`);

  const result = await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: story,
    })
  );

  console.log(
    `  \u2705 SUCCESS: ${label} (HTTP ${result.$metadata.httpStatusCode})`
  );
}

async function main() {
  const stories = [es, fr, de];

  // Validate all first
  let allValid = true;
  for (const story of stories) {
    if (!validate(story)) allValid = false;
  }

  if (!allValid) {
    console.error("\n\u274c Some stories failed validation. Aborting.");
    process.exit(1);
  }

  console.log("\n\u2713 All validations passed. Pushing to DynamoDB...\n");

  // Push sequentially, confirm each before continuing
  for (const story of stories) {
    try {
      await pushStory(story);
    } catch (err) {
      console.error(
        `\n\u274c FAILED to push ${story.lang}#oracles-broken-staff: ${err.message}`
      );
      throw err;
    }
  }

  console.log("\n\u2550\u2550\u2550 ALL 3 LANGUAGES PUSHED SUCCESSFULLY \u2550\u2550\u2550\n");
}

main().catch((err) => {
  console.error("\nFATAL:", err);
  process.exit(1);
});
