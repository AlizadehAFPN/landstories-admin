import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const SITE_ID = "ephesus";
const STORY_ID = "library-celsus";
const NOW = Math.floor(Date.now() / 1000);

// Fields shared across all language versions (unchanged from English)
const shared = {
  siteId: SITE_ID,
  storyId: STORY_ID,
  icon: "\u{1F4DA}",
  tier: "A",
  source: "Archaeological excavations; dedicatory inscriptions; Austrian Archaeological Institute records",
  characters: [
    "Tiberius Julius Celsus Polemaeanus",
    "Gaius Julius Aquila",
    "Sophia",
    "Episteme",
    "Ennoia",
    "Arete",
  ],
  era: "117-125 AD",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 27.3403, lat: 37.9394 },
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  updatedAt: NOW,
};

// ============================================================
//  SPANISH  —  Proverb: "Obras son amores y no buenas razones"
// ============================================================
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#library-celsus",
  title: "La Biblioteca de Celso \u2014 Monumento al amor de un hijo",
  subtitle: "C\u00f3mo el dolor de un hijo se convirti\u00f3 en la mayor biblioteca del mundo antiguo",
  excerpt: "En el a\u00f1o 114 d.C., en la ciudad romana de \u00c9feso \u2014 una de las m\u00e1s grandes del mundo antiguo, en lo que hoy es la costa oeste de Turqu\u00eda \u2014 muri\u00f3 un hombre llamado Celso. Hab\u00eda sido senador romano, lleg\u00f3 a c\u00f3nsul, y termin\u00f3 gobernando toda la provincia de Asia. Su hijo Aquila podr\u00eda haberle dedicado una estatua o una placa. Pero eligi\u00f3 algo que nadie esperaba. Le construy\u00f3 a su padre la biblioteca m\u00e1s hermosa que el mundo hab\u00eda visto.",
  moralOrLesson: "Los grandes monumentos nacen del amor y de la p\u00e9rdida. Lo que construimos para honrar a quienes ya no est\u00e1n dice m\u00e1s de nosotros que de ellos.",
  paragraphs: [
    {
      text: "En el a\u00f1o 114 d.C., en la ciudad romana de \u00c9feso \u2014 una de las m\u00e1s grandes del mundo antiguo, en lo que hoy es la costa oeste de Turqu\u00eda \u2014 muri\u00f3 un hombre llamado Celso. Hab\u00eda sido senador romano, lleg\u00f3 a c\u00f3nsul, y termin\u00f3 gobernando toda la provincia de Asia. Su hijo Aquila podr\u00eda haberle dedicado una estatua o una placa. Pero eligi\u00f3 algo que nadie esperaba. Le construy\u00f3 a su padre la biblioteca m\u00e1s hermosa que el mundo hab\u00eda visto.",
    },
    {
      text: "La obra tard\u00f3 casi una d\u00e9cada y se termin\u00f3 alrededor del 125 d.C. La Biblioteca de Celso no solo era enorme \u2014 guardaba unos 12.000 pergaminos, lo que la convert\u00eda en la tercera m\u00e1s grande del mundo antiguo, solo por detr\u00e1s de la legendaria Biblioteca de Alejandr\u00eda y la de P\u00e9rgamo. Pero lo que la hac\u00eda especial no era su tama\u00f1o, sino su belleza. La fachada de dos pisos jugaba con tu mirada: las columnas exteriores eran un poco m\u00e1s bajas que las del centro, haciendo que todo pareciera a\u00fan m\u00e1s grandioso.",
    },
    {
      text: "Por dentro, los arquitectos resolvieron un problema que hab\u00eda destruido miles de textos antiguos: la humedad. Construyeron muros dobles con una c\u00e1mara de aire entre ellos \u2014 b\u00e1sicamente, un sistema de climatizaci\u00f3n de hace dos mil a\u00f1os \u2014 que manten\u00eda los pergaminos a salvo en sus nichos de piedra. En la entrada, cuatro estatuas representaban lo que Aquila m\u00e1s admiraba de su padre: Sabidur\u00eda, Conocimiento, Inteligencia y Virtud. No eran decoraci\u00f3n. Eran un hijo diciendo: \u00abAs\u00ed era mi padre\u00bb.",
    },
    {
      text: "Y aqu\u00ed la historia se vuelve personal. Bajo el suelo de la biblioteca, Aquila coloc\u00f3 el sarc\u00f3fago de m\u00e1rmol de su padre. Esto romp\u00eda una de las leyes m\u00e1s antiguas de Roma: enterrar a alguien dentro de las murallas de una ciudad estaba terminantemente prohibido. Que se hiciera una excepci\u00f3n dice mucho del respeto que \u00c9feso sent\u00eda por Celso. As\u00ed que el edificio no era solo una biblioteca. Era una tumba. Un hijo hab\u00eda convertido su dolor en un regalo para toda una ciudad.",
    },
    {
      text: "Durante m\u00e1s de un siglo, la biblioteca prosper\u00f3. Hasta que en el 262 d.C., guerreros godos \u2014 tribus germ\u00e1nicas del norte que alg\u00fan d\u00eda ayudar\u00edan a derribar al propio Imperio romano \u2014 atacaron \u00c9feso e incendiaron el interior. Los pergaminos se perdieron para siempre. Los terremotos de los siglos siguientes terminaron lo que las llamas empezaron, y poco a poco la biblioteca se fue desmoronando. Durante m\u00e1s de mil a\u00f1os, uno de los edificios m\u00e1s extraordinarios del mundo antiguo qued\u00f3 enterrado bajo tierra y piedra rota.",
    },
    {
      text: "En 1903, arque\u00f3logos austriacos empezaron a excavar el sitio. Entre la tierra encontraron fragmentos de la fachada \u2014 columnas, relieves, pedazos de aquellas cuatro estatuas. A partir de 1970, un equipo comenz\u00f3 a reconstruirlo todo, piedra por piedra, como un rompecabezas de dos mil a\u00f1os. Para 1978, la fachada volv\u00eda a estar en pie. No era una r\u00e9plica. Eran las piedras originales, devueltas al lugar exacto que hab\u00edan ocupado casi dos milenios antes.",
    },
    {
      text: "Hoy, la Biblioteca de Celso es la imagen de \u00c9feso \u2014 lo que todos vienen a ver. Millones de personas fotograf\u00edan esa fachada cada a\u00f1o, la mayor\u00eda sin saber que detr\u00e1s se esconde una de las historias de amor m\u00e1s grandes entre un padre y un hijo. No se construy\u00f3 para impresionar a un emperador ni para exhibir poder. Un hijo en duelo decidi\u00f3 que la mejor forma de honrar a su padre era regalarle al mundo un lugar para aprender. Porque obras son amores y no buenas razones. Y esta fue la m\u00e1s grande de todas.",
    },
  ],
};

// ============================================================
//  FRENCH  —  Proverb: "Tel père, tel fils"
// ============================================================
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#library-celsus",
  title: "La Biblioth\u00e8que de Celsus \u2014 Un tombeau devenu merveille",
  subtitle: "Comment le chagrin d\u2019un fils donna naissance \u00e0 la plus belle biblioth\u00e8que du monde antique",
  excerpt: "En 114 apr\u00e8s J.-C., dans la cit\u00e9 romaine d\u2019\u00c9ph\u00e8se \u2014 l\u2019une des plus grandes villes du monde antique, sur la c\u00f4te ouest de l\u2019actuelle Turquie \u2014 un homme du nom de Celsus s\u2019\u00e9teignit. Il avait \u00e9t\u00e9 s\u00e9nateur romain, puis consul, avant de devenir gouverneur de toute la province d\u2019Asie. Son fils Aquila aurait pu lui \u00e9riger une statue ou graver une plaque. Il fit tout autre chose. Il offrit \u00e0 son p\u00e8re la plus belle biblioth\u00e8que que le monde ait jamais connue.",
  moralOrLesson: "Les plus grands monuments naissent souvent de l\u2019amour et de la perte. Ce que nous b\u00e2tissons pour honorer ceux qui partent en dit plus sur nous que sur eux.",
  paragraphs: [
    {
      text: "En 114 apr\u00e8s J.-C., dans la cit\u00e9 romaine d\u2019\u00c9ph\u00e8se \u2014 l\u2019une des plus grandes villes du monde antique, sur la c\u00f4te ouest de l\u2019actuelle Turquie \u2014 un homme du nom de Celsus s\u2019\u00e9teignit. Il avait \u00e9t\u00e9 s\u00e9nateur romain, puis consul, avant de devenir gouverneur de toute la province d\u2019Asie. Son fils Aquila aurait pu lui \u00e9riger une statue ou graver une plaque. Il fit tout autre chose. Il offrit \u00e0 son p\u00e8re la plus belle biblioth\u00e8que que le monde ait jamais connue.",
    },
    {
      text: "La construction prit pr\u00e8s d\u2019une d\u00e9cennie et s\u2019acheva vers 125 apr\u00e8s J.-C. La Biblioth\u00e8que de Celsus n\u2019\u00e9tait pas qu\u2019imposante \u2014 elle abritait environ 12\u202f000 rouleaux, ce qui en faisait la troisi\u00e8me plus grande du monde antique, derri\u00e8re la l\u00e9gendaire Biblioth\u00e8que d\u2019Alexandrie et celle de Pergame. Mais ce qui la distinguait, ce n\u2019\u00e9tait pas sa taille. C\u2019\u00e9tait sa beaut\u00e9. La fa\u00e7ade \u00e0 deux \u00e9tages jouait avec le regard\u00a0: les colonnes ext\u00e9rieures, l\u00e9g\u00e8rement plus courtes que celles du centre, donnaient \u00e0 l\u2019ensemble une grandeur presque irr\u00e9elle.",
    },
    {
      text: "\u00c0 l\u2019int\u00e9rieur, les architectes r\u00e9solurent un probl\u00e8me qui avait co\u00fbt\u00e9 la vie \u00e0 d\u2019innombrables textes anciens\u00a0: l\u2019humidit\u00e9. Des murs doubles avec un espace d\u2019air entre eux \u2014 une climatisation avant l\u2019heure \u2014 prot\u00e9geaient les rouleaux dans leurs niches de pierre. \u00c0 l\u2019entr\u00e9e, quatre statues incarnaient les qualit\u00e9s qu\u2019Aquila admirait chez son p\u00e8re\u00a0: Sagesse, Connaissance, Intelligence et Vertu. Ce n\u2019\u00e9tait pas de la d\u00e9coration. C\u2019\u00e9tait un fils qui disait au monde\u00a0: \u00ab\u00a0Voil\u00e0 qui \u00e9tait mon p\u00e8re.\u00a0\u00bb",
    },
    {
      text: "C\u2019est ici que l\u2019histoire devient intime. Sous le sol de la biblioth\u00e8que, Aquila fit d\u00e9poser le sarcophage en marbre de son p\u00e8re. Or, dans la Rome antique, enterrer quelqu\u2019un \u00e0 l\u2019int\u00e9rieur des murs d\u2019une cit\u00e9 \u00e9tait formellement interdit. Qu\u2019on ait fait une exception en dit long sur le respect que les habitants d\u2019\u00c9ph\u00e8se portaient \u00e0 Celsus. Ce b\u00e2timent n\u2019\u00e9tait donc pas qu\u2019une biblioth\u00e8que. C\u2019\u00e9tait un tombeau. Un fils avait transform\u00e9 son chagrin en cadeau pour toute une ville.",
    },
    {
      text: "Pendant plus d\u2019un si\u00e8cle, la biblioth\u00e8que prosp\u00e9ra. Puis, en 262, des guerriers goths \u2014 des tribus germaniques du nord qui contribueraient un jour \u00e0 la chute de Rome \u2014 attaqu\u00e8rent \u00c9ph\u00e8se et incendi\u00e8rent l\u2019int\u00e9rieur. Les rouleaux furent perdus \u00e0 jamais. Les s\u00e9ismes des si\u00e8cles suivants achev\u00e8rent ce que les flammes avaient commenc\u00e9, et la biblioth\u00e8que se r\u00e9duisit peu \u00e0 peu en ruines. Pendant plus de mille ans, l\u2019un des \u00e9difices les plus remarquables de l\u2019Antiquit\u00e9 resta enseveli sous la terre et les d\u00e9combres.",
    },
    {
      text: "En 1903, des arch\u00e9ologues autrichiens commenc\u00e8rent \u00e0 fouiller le site. Dans la terre, ils retrouv\u00e8rent des fragments de la fa\u00e7ade \u2014 colonnes, sculptures, morceaux de ces quatre statues. \u00c0 partir de 1970, une \u00e9quipe entreprit de tout reconstituer, pierre par pierre, comme un immense puzzle antique. En 1978, la fa\u00e7ade se dressait \u00e0 nouveau. Pas une copie. Les pierres d\u2019origine, replac\u00e9es \u00e0 l\u2019endroit exact qu\u2019elles occupaient pr\u00e8s de deux mille ans plus t\u00f4t.",
    },
    {
      text: "Aujourd\u2019hui, la Biblioth\u00e8que de Celsus est le symbole d\u2019\u00c9ph\u00e8se \u2014 ce que tout le monde vient voir. Des millions de visiteurs photographient cette fa\u00e7ade chaque ann\u00e9e, la plupart sans savoir qu\u2019elle cache l\u2019une des plus belles histoires d\u2019amour entre un p\u00e8re et un fils. Elle n\u2019a pas \u00e9t\u00e9 b\u00e2tie pour flatter un empereur ni pour afficher un pouvoir politique. Un fils endeuill\u00e9 a d\u00e9cid\u00e9 que la plus belle fa\u00e7on d\u2019honorer son p\u00e8re \u00e9tait d\u2019offrir au monde un lieu de savoir. Tel p\u00e8re, tel fils, dit-on. Mais ici, c\u2019est le fils qui a rendu le p\u00e8re \u00e9ternel.",
    },
  ],
};

// ============================================================
//  GERMAN  —  Proverb: "Die Liebe ist stärker als der Tod"
// ============================================================
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#library-celsus",
  title: "Die Celsus-Bibliothek \u2014 Denkmal einer Sohnesliebe",
  subtitle: "Wie die Trauer eines Sohnes die sch\u00f6nste Bibliothek der Antike erschuf",
  excerpt: "Im Jahr 114 n.\u00a0Chr. starb in Ephesos \u2014 einer der gr\u00f6\u00dften St\u00e4dte der antiken Welt, an der Westk\u00fcste der heutigen T\u00fcrkei \u2014 ein Mann namens Celsus. Er war r\u00f6mischer Senator gewesen, hatte es bis zum Konsul gebracht und schlie\u00dflich die gesamte Provinz Asia regiert. Sein Sohn Aquila h\u00e4tte ihm eine Statue oder eine Gedenktafel widmen k\u00f6nnen. Stattdessen tat er etwas, womit niemand gerechnet hatte. Er baute seinem Vater die sch\u00f6nste Bibliothek, die die Welt je gesehen hatte.",
  moralOrLesson: "Die gr\u00f6\u00dften Denkm\u00e4ler entstehen oft aus Liebe und Verlust. Was wir f\u00fcr die Toten errichten, sagt mehr \u00fcber uns als \u00fcber sie.",
  paragraphs: [
    {
      text: "Im Jahr 114 n.\u00a0Chr. starb in Ephesos \u2014 einer der gr\u00f6\u00dften St\u00e4dte der antiken Welt, an der Westk\u00fcste der heutigen T\u00fcrkei \u2014 ein Mann namens Celsus. Er war r\u00f6mischer Senator gewesen, hatte es bis zum Konsul gebracht und schlie\u00dflich die gesamte Provinz Asia regiert. Sein Sohn Aquila h\u00e4tte ihm eine Statue oder eine Gedenktafel widmen k\u00f6nnen. Stattdessen tat er etwas, womit niemand gerechnet hatte. Er baute seinem Vater die sch\u00f6nste Bibliothek, die die Welt je gesehen hatte.",
    },
    {
      text: "Der Bau dauerte fast ein Jahrzehnt und wurde um 125 n.\u00a0Chr. fertiggestellt. Die Celsus-Bibliothek war nicht einfach nur gro\u00df \u2014 sie beherbergte rund 12.000 Schriftrollen und war damit die drittgr\u00f6\u00dfte Bibliothek der antiken Welt, nur \u00fcbertroffen von der legend\u00e4ren Bibliothek von Alexandria und der Sammlung in Pergamon. Doch was sie besonders machte, war nicht ihre Gr\u00f6\u00dfe. Es war ihre Sch\u00f6nheit. Die zweist\u00f6ckige Fassade spielte mit dem Auge: Die \u00e4u\u00dferen S\u00e4ulen waren etwas k\u00fcrzer als die mittleren, was das Ganze noch gewaltiger wirken lie\u00df.",
    },
    {
      text: "Im Inneren l\u00f6sten die Architekten ein Problem, das unz\u00e4hlige antike Texte zerst\u00f6rt hatte: Feuchtigkeit. Sie bauten doppelte W\u00e4nde mit einer Luftschicht dazwischen \u2014 im Grunde eine antike Klimaanlage \u2014, die die Schriftrollen in ihren steinernen Nischen sch\u00fctzte. Am Eingang standen vier Statuen f\u00fcr die Eigenschaften, die Aquila an seinem Vater am meisten bewunderte: Weisheit, Wissen, Verstand und Tugend. Das war keine Dekoration. Das war ein Sohn, der sagte: \u201eSo war mein Vater.\u201c",
    },
    {
      text: "Hier wird die Geschichte pers\u00f6nlich. Unter dem Boden der Bibliothek lie\u00df Aquila den Marmorsarkophag seines Vaters aufstellen. Das brach eine der \u00e4ltesten Regeln Roms \u2014 Bestattungen innerhalb der Stadtmauern waren streng verboten. Dass man eine Ausnahme machte, zeigt, wie tief der Respekt der Menschen in Ephesos f\u00fcr Celsus war. Das Geb\u00e4ude war also nicht nur eine Bibliothek. Es war ein Grab. Ein Sohn hatte seine Trauer in ein Geschenk an eine ganze Stadt verwandelt.",
    },
    {
      text: "\u00dcber ein Jahrhundert lang bl\u00fchte die Bibliothek. Dann, im Jahr 262, griffen gotische Krieger an \u2014 germanische St\u00e4mme aus dem Norden, die eines Tages zum Untergang Roms beitragen sollten. Sie \u00fcberfielen Ephesos und setzten das Innere in Brand. Die Schriftrollen waren f\u00fcr immer verloren. Erdbeben in den folgenden Jahrhunderten vollendeten, was die Flammen begonnen hatten, und langsam zerfiel die Bibliothek zu Schutt. \u00dcber tausend Jahre lang lag eines der gro\u00dfartigsten Bauwerke der Antike unter Erde und Gestein begraben.",
    },
    {
      text: "1903 begannen \u00f6sterreichische Arch\u00e4ologen mit Ausgrabungen. In der Erde fanden sie Fragmente der Fassade \u2014 S\u00e4ulen, Reliefs, Bruchst\u00fccke jener vier Statuen. Ab 1970 machte sich ein Team daran, alles wieder zusammenzusetzen, Stein f\u00fcr Stein, wie ein gewaltiges antikes Puzzle. 1978 stand die Fassade wieder. Keine Nachbildung. Die Originalsteine, zur\u00fcck an genau der Position, die sie fast zweitausend Jahre zuvor eingenommen hatten.",
    },
    {
      text: "Heute ist die Celsus-Bibliothek das Wahrzeichen von Ephesos \u2014 das, wof\u00fcr alle kommen. Millionen fotografieren diese Fassade jedes Jahr, die meisten ohne zu ahnen, dass sich dahinter eine der gr\u00f6\u00dften Liebesgeschichten zwischen Vater und Sohn verbirgt. Sie wurde nicht gebaut, um einen Kaiser zu beeindrucken. Ein trauernder Sohn beschloss, seinen Vater zu ehren, indem er der Welt einen Ort des Lernens schenkte. Man sagt, die Liebe sei st\u00e4rker als der Tod. Hier steht der Beweis \u2014 seit fast zweitausend Jahren.",
    },
  ],
};

// ============================================================
//  PUSH — sequential, with verification
// ============================================================
async function pushAndVerify(record, lang) {
  console.log(`\n--- Pushing ${lang.toUpperCase()} ---`);
  console.log(`  langStoryId: ${record.langStoryId}`);
  console.log(`  title: ${record.title}`);
  console.log(`  paragraphs: ${record.paragraphs.length}`);

  await docClient.send(
    new PutCommand({ TableName: TABLE, Item: record })
  );
  console.log(`  PUT succeeded.`);

  // Verify by reading it back
  const { Item } = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: SITE_ID, langStoryId: record.langStoryId },
    })
  );

  if (!Item) {
    throw new Error(`Verification FAILED for ${lang} — record not found after put.`);
  }
  if (Item.title !== record.title) {
    throw new Error(`Verification FAILED for ${lang} — title mismatch.`);
  }
  if (Item.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`Verification FAILED for ${lang} — paragraph count mismatch.`);
  }

  console.log(`  VERIFIED: ${lang} record exists with correct title and ${Item.paragraphs.length} paragraphs.`);
  return true;
}

async function main() {
  console.log(`Timestamp (updatedAt): ${NOW}`);

  await pushAndVerify(es, "es");
  await pushAndVerify(fr, "fr");
  await pushAndVerify(de, "de");

  console.log("\n=== ALL THREE LANGUAGES PUSHED AND VERIFIED ===");
}

main().catch((err) => {
  console.error("\nFATAL ERROR:", err.message);
  process.exit(1);
});
