import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// --- Shared fields (unchanged from English) ---
const shared = {
  siteId: "tower-of-london",
  storyId: "ravens-of-the-tower",
  coordinates: { lat: 51.5085, lng: -0.0763 },
  disabled: false,
  era: "Ancient prophecy - Present day",
  hasAudio: false,
  icon: "\u{1F426}\u{200D}\u{2B1B}",
  image: "",
  isFree: true,
  readingTimeMinutes: 3,
  source:
    "Tower of London official history, Ravenmaster Christopher Skaife's memoir \"The Ravenmaster\", Historic Royal Palaces archives, Churchill war cabinet records",
  storyCategory: "gods_monsters",
  thumbnail: "",
  tier: "A",
  updatedAt: now,
  characters: [
    "Charles II - The King who chose ravens over astronomy",
    "John Flamsteed - First Astronomer Royal, ousted by birds",
    "Winston Churchill - Ordered the ravens replenished during WWII",
    "Grip - The sole surviving raven of the Blitz",
    "Merlina - The beloved raven who vanished in 2021",
    "The Ravenmaster - Dedicated Yeoman Warder guardian",
  ],
};

// ======================================================================
//  SPANISH (es) — Los cuervos de la Torre
//
//  Proverb subverted: "No hay que tentar al diablo"
//  (Don't tempt the devil — universal caution proverb)
//  → Nobody believes birds hold up a monarchy… but nobody's
//    willing to tempt the devil either.
// ======================================================================

const esParagraphs = [
  `Ahora mismo, dentro de una fortaleza que Guillermo el Conquistador levantó hace casi mil años, seis cuervos negros pasean por el césped de la Torre de Londres como si el lugar les perteneciera. Y en cierto modo, así es. Existe una profecía antigua —nadie sabe exactamente cuánto— que dice que si los cuervos abandonan la Torre, la Corona caerá y Gran Bretaña con ella. Suena absurdo. Pero durante más de tres siglos, el gobierno británico no ha querido arriesgarse.`,

  `La primera prueba llegó con Carlos II, en la década de 1670. Su Astrónomo Real, John Flamsteed, había instalado un telescopio en la Torre y los cuervos se lo estaban destrozando todo. Ensuciaban los instrumentos y armaban un escándalo infernal. Flamsteed exigió que los echaran. Pero cuando el rey escuchó la profecía, tomó una decisión que aún resuena: los cuervos se quedaron y el astrónomo se marchó. Lo enviaron a Greenwich, donde el Observatorio Real sigue en pie — su ubicación decidida por unos pájaros ruidosos.`,

  `A partir de ahí, nadie volvió a cuestionar a los cuervos. Con el paso de los siglos, la Torre nombró guardianes dedicados exclusivamente a cuidarlos, convirtiendo una vieja superstición en política oficial. Una colonia de pájaros negros y brillantes lleva más de trescientos años en esos terrenos, sobreviviendo a monarcas, guerras y al auge y caída del propio Imperio británico. La profecía dejó de ser una cuestión de fe. Se convirtió en parte del trabajo.`,

  `La verdadera prueba de fuego llegó en la Segunda Guerra Mundial. Las bombas alemanas machacaron Londres durante el Blitz —los devastadores bombardeos de 1940 y 1941— y la Torre recibió impactos directos. Los cuervos, aterrados, huyeron o murieron. Al final de la guerra solo quedaba uno: Grip, tan traumatizado que no se movía de su rincón. Cuando informaron a Churchill, ordenó reponerlos de inmediato. Lo entendía: si dejas que la profecía se cumpla, rompes algo en la gente que las bombas jamás podrían.`,

  `Hoy, la Torre mantiene exactamente siete cuervos: seis para honrar la profecía y uno de reserva. Cada pájaro tiene nombre, personalidad y seguidores. Ha habido alborotadores como Jubilee y Harris, famosos por robar los sándwiches de los visitantes directamente de sus manos. Estaba Merlina, ferozmente independiente, que desapareció a principios de 2021 y fue llorada como una figura nacional. Responden a sus nombres, juegan entre ellos y algunos hasta han aprendido a decir «hello» a los turistas que pasan.`,

  `De todos ellos se encarga una sola persona: el Ravenmaster, un Yeoman Warder —uno de los guardias ceremoniales de la Torre— que alimenta a los pájaros con carne cruda, galletas empapadas en sangre y algún huevo de vez en cuando. Les recorta las plumas de vuelo para que puedan revolotear por los jardines pero no escapar. Lleva un cuaderno donde registra la personalidad, las manías y la historia de cada cuervo desde hace décadas. No es un documento oficial. Es más bien una biblia familiar, escrita en graznidos.`,

  `Y quizá eso sea lo que importa de verdad. Nadie cree realmente que un puñado de pájaros sostenga la monarquía británica. Pero nadie quiere tentar al diablo. Los cuervos son la prueba de que hay historias más poderosas que la lógica — de que una nación construida sobre mil años de tradición seguirá alimentando a sus pájaros, recortándoles las alas y repitiendo la vieja profecía, porque el día que dejas de creer en los símbolos, pierdes aquello que representan.`,
];

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#ravens-of-the-tower",
  title: "Los cuervos de la Torre",
  subtitle: "La profecía que ata un reino a sus pájaros",
  excerpt:
    "Ahora mismo, dentro de una fortaleza que Guillermo el Conquistador levantó hace casi mil años, seis cuervos negros pasean por el césped de la Torre de Londres como si el lugar les perteneciera. Y en cierto modo, así es.",
  paragraphs: esParagraphs.map((text) => ({ text })),
  moralOrLesson:
    "Hay historias más poderosas que la lógica — el día que dejas de creer en los símbolos, pierdes aquello que representan",
};

// ======================================================================
//  FRENCH (fr) — Les Corbeaux de la Tour
//
//  Proverb subverted: "Mieux vaut prévenir que guérir"
//  (Better safe than sorry — universal caution proverb)
//  → Especially when "the cure" would cost you a kingdom.
// ======================================================================

const frParagraphs = [
  `En ce moment même, dans une forteresse que Guillaume le Conquérant a bâtie il y a près de mille ans, six corbeaux noirs se prélassent sur la pelouse de la Tour de Londres comme si l'endroit leur appartenait. Et d'une certaine manière, c'est le cas. Il existe une vieille prophétie — personne ne sait exactement depuis quand — qui dit que si les corbeaux quittent la Tour, la Couronne tombera et la Grande-Bretagne avec. Ça paraît absurde. Mais depuis plus de trois siècles, le gouvernement britannique refuse de prendre le risque.`,

  `La première épreuve est arrivée sous Charles II, dans les années 1670. Son Astronome Royal, John Flamsteed, avait installé un télescope dans la Tour — et les corbeaux lui gâchaient tout. Ils salissaient ses instruments et faisaient un vacarme infernal. Flamsteed a exigé qu'on s'en débarrasse. Mais quand le roi a entendu la prophétie, il a tranché : les corbeaux restent, l'astronome part. On a envoyé Flamsteed à Greenwich, où l'Observatoire Royal se dresse toujours — son emplacement décidé par des oiseaux bruyants.`,

  `Après ça, plus personne n'a remis les corbeaux en question. Au fil des siècles, la Tour a nommé des gardiens exclusivement chargés de veiller sur eux, transformant une vieille superstition en politique officielle. Une colonie de grands corbeaux noirs aux plumes luisantes occupe ces lieux depuis plus de trois cents ans, survivant aux monarques, aux guerres et à l'ascension puis la chute de l'Empire britannique. La prophétie a cessé d'être une question de foi. Elle est devenue une fiche de poste.`,

  `L'épreuve décisive est venue avec la Seconde Guerre mondiale. Les bombes allemandes ont pilonné Londres durant le Blitz — les raids dévastateurs de 1940 et 1941 — et la Tour a pris des coups directs. Les corbeaux, terrorisés, ont fui ou sont morts. À la fin de la guerre, il n'en restait qu'un : Grip, si choqué qu'il ne bougeait plus de son coin. Churchill, prévenu, a ordonné de reconstituer la colonie sur-le-champ. Il avait compris : laissez la prophétie se réaliser, et vous brisez quelque chose que les bombes n'auraient jamais atteint.`,

  `Aujourd'hui, la Tour héberge exactement sept corbeaux : six pour honorer la prophétie, plus un en réserve. Chaque oiseau a un nom, un caractère et ses admirateurs. Il y a eu des fauteurs de trouble comme Jubilee et Harris, célèbres pour voler les sandwiches des visiteurs directement dans leurs mains. Il y avait Merlina, farouchement indépendante, disparue début 2021 et pleurée comme une figure nationale. Ils répondent à leur nom, jouent entre eux, et certains ont même appris à dire « hello » aux touristes de passage.`,

  `Une seule personne veille sur eux tous : le Ravenmaster, un Yeoman Warder — l'un des gardes cérémoniels de la Tour — qui nourrit les oiseaux de viande crue, de biscuits imbibés de sang et d'un œuf de temps en temps. Il leur taille les plumes de vol pour qu'ils puissent voleter dans l'enceinte sans pouvoir s'échapper. Il tient un registre où il consigne la personnalité, les manies et l'histoire de chaque corbeau depuis des décennies. Ce n'est pas un document administratif. C'est plutôt une bible de famille, rédigée en croassements.`,

  `Et c'est peut-être là l'essentiel. Personne ne croit vraiment qu'une poignée d'oiseaux maintient la monarchie britannique debout. Mais mieux vaut prévenir que guérir — surtout quand la guérison pourrait coûter un royaume. Les corbeaux sont la preuve que certaines histoires sont plus fortes que la raison — qu'une nation bâtie sur mille ans de tradition continuera de nourrir ses oiseaux, de leur rogner les ailes et de murmurer la vieille prophétie, parce que le jour où l'on cesse de croire aux symboles, on perd ce qu'ils représentent.`,
];

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#ravens-of-the-tower",
  title: "Les Corbeaux de la Tour",
  subtitle: "La prophétie qui enchaîne un royaume à ses oiseaux",
  excerpt:
    "En ce moment même, dans une forteresse que Guillaume le Conquérant a bâtie il y a près de mille ans, six corbeaux noirs se prélassent sur la pelouse de la Tour de Londres comme si l'endroit leur appartenait. Et d'une certaine manière, c'est le cas.",
  paragraphs: frParagraphs.map((text) => ({ text })),
  moralOrLesson:
    "Certaines histoires sont plus fortes que la raison — le jour où l'on cesse de croire aux symboles, on perd ce qu'ils représentent",
};

// ======================================================================
//  GERMAN (de) — Die Raben vom Tower
//
//  Proverb subverted: "Der Glaube versetzt Berge"
//  (Faith moves mountains — universal proverb)
//  → In London, faith doesn't move mountains.
//    It just keeps six ravens on a lawn.
// ======================================================================

const deParagraphs = [
  `Gerade jetzt, in einer Festung, die Wilhelm der Eroberer vor fast tausend Jahren errichten ließ, sitzen sechs schwarze Raben auf dem Rasen des Tower of London, als gehöre ihnen der ganze Ort. Und in gewisser Weise tut er das auch. Es gibt eine alte Prophezeiung — niemand weiß genau, wie alt — die besagt: Wenn die Raben den Tower jemals verlassen, fällt die Krone, und Großbritannien gleich mit. Klingt absurd. Aber seit über drei Jahrhunderten weigert sich die britische Regierung, es darauf ankommen zu lassen.`,

  `Die erste Bewährungsprobe kam unter Charles II. in den 1670ern. Sein Hofastronom John Flamsteed hatte ein Teleskop im Tower aufgestellt — und die Raben machten ihm alles kaputt. Sie beschmutzten seine Instrumente und veranstalteten Höllenlärm. Flamsteed forderte, sie loszuwerden. Doch als der König von der Prophezeiung erfuhr, traf er eine Entscheidung, die bis heute nachhallt: Die Raben blieben, der Astronom ging. Man schickte Flamsteed nach Greenwich, wo das Royal Observatory noch heute steht — sein Standort bestimmt von ein paar lärmenden Vögeln.`,

  `Danach hat niemand die Raben je wieder infrage gestellt. Im Lauf der Jahrhunderte ernannte der Tower eigene Wärter, die sich ausschließlich um sie kümmerten — aus altem Aberglauben wurde offizielle Politik. Eine Kolonie großer, glänzend schwarzer Vögel lebt seit über dreihundert Jahren auf diesem Gelände und hat Monarchen, Kriege und den Aufstieg und Fall des Britischen Empire überdauert. Die Prophezeiung war keine Glaubensfrage mehr. Sie wurde Teil der Stellenbeschreibung.`,

  `Die echte Feuerprobe kam im Zweiten Weltkrieg. Deutsche Bomben hämmerten während des Blitz auf London ein — den verheerenden Luftangriffen von 1940 und 1941 — und der Tower wurde direkt getroffen. Die Raben flohen in Panik oder starben. Am Kriegsende hatte nur einer überlebt: Grip, so verstört, dass er seinen Fleck Erde nicht mehr verließ. Als man Churchill informierte, ordnete er sofortige Aufstockung an. Er verstand: Lass die Prophezeiung wahr werden, und du zerbrichst etwas in den Menschen, das Bomben niemals treffen könnten.`,

  `Heute hält der Tower genau sieben Raben — sechs zu Ehren der Prophezeiung, plus einen in Reserve. Jeder Vogel hat einen Namen, einen eigenen Charakter und Fans. Es gab Unruhestifter wie Jubilee und Harris, berüchtigt dafür, Besuchern die Sandwiches direkt aus der Hand zu stehlen. Da war Merlina, eine wild unabhängige Rabendame, die Anfang 2021 verschwand und betrauert wurde wie eine nationale Persönlichkeit. Sie reagieren auf ihre Namen, spielen miteinander, und manche haben sogar gelernt, vorbeilaufenden Touristen ein „Hello" zuzurufen.`,

  `Für sie alle ist ein einziger Mensch verantwortlich: der Ravenmaster, ein Yeoman Warder — einer der Zeremonialgardisten des Towers — der die Vögel mit rohem Fleisch, blutgetränkten Keksen und gelegentlich einem Ei füttert. Er stutzt ihre Schwungfedern, damit sie über das Gelände flattern, aber nicht davonfliegen können. Er führt ein Logbuch, in dem Persönlichkeit, Eigenheiten und Lebensgeschichte jedes Raben seit Jahrzehnten festgehalten sind. Kein Behördendokument. Eher eine Familienchronik, geschrieben in Krächzlauten.`,

  `Und das ist vielleicht der springende Punkt. Niemand glaubt ernsthaft, dass ein paar Vögel die britische Monarchie am Leben halten. Aber der Glaube versetzt Berge — und manchmal hält er einfach sechs Raben auf einem Rasen. Die Raben beweisen, dass manche Geschichten stärker sind als jede Logik — dass eine Nation auf tausend Jahren Tradition ihre Vögel weiter füttern, ihnen die Flügel stutzen und die alte Prophezeiung flüstern wird. Denn sobald man aufhört, an die Symbole zu glauben, verliert man das, wofür sie stehen.`,
];

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#ravens-of-the-tower",
  title: "Die Raben vom Tower",
  subtitle: "Die Prophezeiung, die ein Königreich an seine Vögel bindet",
  excerpt:
    "Gerade jetzt, in einer Festung, die Wilhelm der Eroberer vor fast tausend Jahren errichten ließ, sitzen sechs schwarze Raben auf dem Rasen des Tower of London, als gehöre ihnen der ganze Ort. Und in gewisser Weise tut er das auch.",
  paragraphs: deParagraphs.map((text) => ({ text })),
  moralOrLesson:
    "Manche Geschichten sind stärker als jede Logik — an dem Tag, an dem man aufhört, an die Symbole zu glauben, verliert man das, wofür sie stehen",
};

// ======================================================================
//  VALIDATION & PUSH
// ======================================================================

function validate(item, label) {
  const json = JSON.stringify(item);
  JSON.parse(json); // throws if invalid

  const charTotal = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  const wordTotal = item.paragraphs.reduce(
    (sum, p) => sum + p.text.split(/\s+/).length,
    0
  );

  console.log(`\n--- ${label} ---`);
  console.log(`  Title:       ${item.title}`);
  console.log(`  Subtitle:    ${item.subtitle}`);
  console.log(`  Paragraphs:  ${item.paragraphs.length}`);
  console.log(`  Total chars: ${charTotal}`);
  console.log(`  Total words: ${wordTotal}`);
  console.log(`  JSON size:   ${json.length} bytes`);
  console.log(`  JSON valid:  OK`);

  item.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    const flag =
      chars > 550 ? " *** OVER 500 chars" : words > 110 ? " *** OVER 100 words" : "";
    console.log(`    P${i + 1}: ${chars} chars, ${words} words${flag}`);
  });
}

async function pushItem(item, label) {
  validate(item, label);

  console.log(`  Pushing to DynamoDB...`);
  const cmd = new PutCommand({ TableName: TABLE, Item: item });
  const result = await docClient.send(cmd);
  const status = result.$metadata.httpStatusCode;

  if (status === 200) {
    console.log(`  ✓ PUSHED: ${item.langStoryId} -> ${TABLE} table`);
  } else {
    throw new Error(`Unexpected HTTP status: ${status}`);
  }
}

async function main() {
  console.log(`Pushing ravens-of-the-tower stories in es, fr, de`);
  console.log(`updatedAt: ${now} (${new Date(now * 1000).toISOString()})\n`);

  await pushItem(es, "Spanish (es)");
  await pushItem(fr, "French (fr)");
  await pushItem(de, "German (de)");

  console.log(`\n${"=".repeat(50)}`);
  console.log(`All 3 records pushed successfully.`);
}

main().catch((err) => {
  console.error("\nFATAL:", err);
  process.exit(1);
});
