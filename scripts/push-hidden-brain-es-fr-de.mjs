import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "vatican-st-peters",
  storyId: "hidden-brain-creation-adam",
  icon: "\u{1F9E0}",
  tier: "A",
  source: 'Meshberger, Frank. "An Interpretation of Michelangelo\'s Creation of Adam Based on Neuroanatomy," JAMA 264:14, 1990; Suk and Tamargo, Neurosurgery, 2010',
  characters: ["Michelangelo Buonarroti", "Frank Meshberger", "Ian Suk", "Rafael Tamargo"],
  era: "1508-1512 (discovered 1990)",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lat: 41.9022, lng: 12.4539 },
  hasAudio: false,
  isFree: true,
  storyCategory: "riddles_past",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb subverted: "Ojos que no ven, corazón que no siente"
// ═══════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#hidden-brain-creation-adam",
  title: "El cerebro escondido en La creación de Adán",
  subtitle: "Un mensaje secreto de quinientos años oculto en la pintura más famosa del mundo",
  moralOrLesson: "El verdadero genio esconde capas de significado que sobreviven siglos y solo se revelan a quienes están preparados para verlas",
  paragraphs: [
    {
      text: "Durante casi quinientos años, millones de personas entraron a la Capilla Sixtina, levantaron la vista y creyeron entender lo que veían. La creación de Adán muestra a Dios extendiendo la mano hacia Adán, rodeado de ángeles y envuelto en un manto rojo. Es probablemente la imagen más reconocida del planeta. La has visto en camisetas, en memes, en portadas de libros. Todo el mundo la conoce. Pero nadie —durante cinco siglos— notó lo que estaba escondido a plena vista.",
    },
    {
      text: "En 1990, un médico llamado Frank Meshberger publicó un artículo en el Journal of the American Medical Association —una de las revistas médicas más prestigiosas del mundo— y lo cambió todo. Su teoría era extraordinaria: la forma que rodea a Dios y a los ángeles no es un simple manto. Es un corte transversal anatómicamente exacto del cerebro humano.",
    },
    {
      text: "Las coincidencias son asombrosas. El manto rojo sigue el contorno exterior del cerebro. Un ángel bajo el brazo de Dios encaja con el tronco encefálico. Un pañuelo verde que ondea traza el recorrido exacto de una arteria principal. Una pequeña figura junto al pie izquierdo de Dios se ubica justo donde estaría una glándula hormonal clave. Punto por punto, la anatomía coincide con una precisión que no puede ser casualidad.",
    },
    {
      text: "Y Miguel Ángel tenía los conocimientos para hacerlo. De joven, en Florencia, pasó años diseccionando cadáveres en la iglesia del Santo Spirito —el prior le permitía estudiar los cuerpos a cambio de un crucifijo que talló a mano—. Antes de cumplir treinta, entendía el cuerpo humano mejor que la mayoría de los médicos de su época.",
    },
    {
      text: "¿Y cuál era el mensaje? La lectura más poderosa es esta: Dios no le está dando solo vida a Adán, le está dando una mente. La forma del cerebro significa que el verdadero regalo divino no es un corazón que late. Es la conciencia. El pensamiento. La capacidad de preguntarte por qué existes. En esta versión, Dios habita dentro de la inteligencia humana.",
    },
    {
      text: "Pero hay una lectura mucho más peligrosa. Miguel Ángel odiaba este encargo. El papa Julio II —más guerrero que sacerdote— lo obligó a pintar el techo, y los dos chocaban sin parar. Entonces, ¿y si el mensaje es al revés? Si Dios aparece dentro de un cerebro, quizá Miguel Ángel estaba diciendo que Dios es una creación de la mente humana, no al contrario. Eso lo convertiría en una de las ideas más radicales de la historia —pintada justo sobre la cabeza del papa.",
    },
    {
      text: "En 2010, los investigadores Ian Suk y Rafael Tamargo publicaron un estudio en la revista Neurosurgery que revelaba una segunda lección de anatomía oculta en el mismo techo. En el panel donde Dios separa la luz de la oscuridad, su cuello y pecho forman una imagen precisa del tronco encefálico y la médula espinal. Miguel Ángel lo hizo más de una vez.",
    },
    {
      text: "Nadie sabe con certeza qué quiso decir. ¿Celebraba la conciencia como el mayor regalo divino? ¿Se rebelaba en silencio contra un papa al que despreciaba? Dicen que ojos que no ven, corazón que no siente. Pero Miguel Ángel demostró lo contrario: lo que no vimos durante cinco siglos era precisamente lo más importante. El techo más famoso del mundo sigue revelando secretos que nadie pensó en buscar.",
    },
  ],
};
es.excerpt = es.paragraphs[0].text;

// ═══════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb subverted: "Il n'est pire aveugle que celui qui ne
//   veut pas voir"
// ═══════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#hidden-brain-creation-adam",
  title: "Le cerveau caché dans La Création d'Adam",
  subtitle: "Un message secret vieux de cinq siècles dans le tableau le plus célèbre du monde",
  moralOrLesson: "Le vrai génie cache des niveaux de sens qui survivent aux siècles et ne se révèlent qu'à ceux qui sont prêts à les voir",
  paragraphs: [
    {
      text: "Pendant près de cinq cents ans, des millions de personnes sont entrées dans la chapelle Sixtine, ont levé les yeux et ont cru comprendre ce qu'elles voyaient. La Création d'Adam montre Dieu tendant la main vers Adam, entouré d'anges et drapé dans un manteau rouge. C'est sans doute l'image la plus connue au monde. Vous l'avez vue sur des affiches, des coques de téléphone, des mèmes. Tout le monde connaît cette fresque. Mais personne — pendant cinq siècles — n'a remarqué ce qui se cachait sous leurs yeux.",
    },
    {
      text: "En 1990, un médecin du nom de Frank Meshberger a publié un article dans le Journal of the American Medical Association — l'une des revues médicales les plus respectées au monde — et a tout remis en question. Sa thèse était stupéfiante\u00A0: la forme qui entoure Dieu et les anges n'est pas un simple manteau. C'est une coupe transversale anatomiquement exacte du cerveau humain.",
    },
    {
      text: "Les correspondances sont saisissantes. Le manteau rouge épouse la surface externe du cerveau. L'ange blotti sous le bras de Dieu correspond précisément au tronc cérébral. Une écharpe verte qui flotte suit le trajet exact d'une artère principale irriguant le cerveau. Une petite figure près du pied gauche de Dieu se trouve pile à l'emplacement d'une glande hormonale essentielle. Point par point, l'anatomie coïncide avec une précision qui ne doit rien au hasard.",
    },
    {
      text: "Et Michel-Ange avait parfaitement les connaissances pour réaliser cela. Jeune artiste à Florence, il a passé des années à disséquer des cadavres à l'église Santo Spirito — le prieur lui donnait accès aux corps en échange d'un crucifix que Michel-Ange avait sculpté de ses mains. Avant trente ans, il maîtrisait l'anatomie humaine mieux que la plupart des médecins de son époque.",
    },
    {
      text: "Alors, quel était le message\u00A0? L'interprétation la plus forte est celle-ci\u00A0: Dieu ne donne pas seulement la vie à Adam — il lui donne un esprit. La forme du cerveau signifie que le véritable cadeau divin n'est pas un cœur qui bat. C'est la conscience. La pensée. La capacité de se demander pourquoi on existe. Dans cette lecture, Dieu réside à l'intérieur même de l'intelligence humaine.",
    },
    {
      text: "Mais il existe une lecture bien plus dangereuse. Michel-Ange détestait ce travail. Le pape Jules II — davantage guerrier que prêtre — l'avait pratiquement forcé à peindre ce plafond, et les deux hommes s'affrontaient sans cesse. Et si le message était inversé\u00A0? Si Dieu apparaît à l'intérieur d'un cerveau, peut-être que Michel-Ange disait que Dieu est une création de l'esprit humain, et non l'inverse. Ce serait l'une des idées les plus subversives de l'histoire — peinte directement au-dessus de la tête du pape.",
    },
    {
      text: "L'histoire s'est enrichie en 2010, quand les chercheurs Ian Suk et Rafael Tamargo ont publié une étude dans la revue Neurosurgery révélant une deuxième leçon d'anatomie cachée sur le même plafond. Dans le panneau où Dieu sépare la lumière des ténèbres, son cou et sa poitrine dessinent une image précise du tronc cérébral et de la moelle épinière. Michel-Ange l'avait fait plus d'une fois.",
    },
    {
      text: "Personne ne sait avec certitude ce que Michel-Ange voulait dire. Célébrait-il la conscience comme le plus grand don de Dieu\u00A0? Se rebellait-il en silence contre un pape qu'il méprisait\u00A0? On dit qu'il n'est pire aveugle que celui qui ne veut pas voir. Mais pendant cinq siècles, personne n'a même su qu'il y avait quelque chose à chercher. Le plafond le plus célèbre du monde livre encore des secrets que nul n'avait songé à y trouver.",
    },
  ],
};
fr.excerpt = fr.paragraphs[0].text;

// ═══════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb subverted: "Der Teufel steckt im Detail"
// ═══════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#hidden-brain-creation-adam",
  title: "Das verborgene Gehirn in der Erschaffung Adams",
  subtitle: "Eine fünfhundert Jahre alte geheime Botschaft im berühmtesten Gemälde der Welt",
  moralOrLesson: "Wahres Genie verbirgt Bedeutungsebenen, die Jahrhunderte überdauern und sich nur denen offenbaren, die bereit sind, sie zu sehen",
  paragraphs: [
    {
      text: "Fast fünfhundert Jahre lang betraten Millionen Menschen die Sixtinische Kapelle, blickten nach oben und glaubten zu verstehen, was sie sahen. Die Erschaffung Adams zeigt Gott, wie er seine Hand nach Adam ausstreckt, umgeben von Engeln und gehüllt in einen wallenden roten Mantel. Es ist wohl das bekannteste Bild der Welt. Man kennt es von Postern, Handyhüllen, Memes. Jeder hat es schon gesehen. Aber niemandem — fünf Jahrhunderte lang — fiel auf, was direkt vor aller Augen verborgen war.",
    },
    {
      text: "1990 veröffentlichte ein Arzt namens Frank Meshberger einen Artikel im Journal of the American Medical Association — einer der renommiertesten medizinischen Fachzeitschriften der Welt — und stellte alles auf den Kopf. Seine These war außergewöhnlich: Die Form, die Gott und die Engel umgibt, ist kein bloßer Mantel. Sie ist ein anatomisch exakter Querschnitt des menschlichen Gehirns.",
    },
    {
      text: "Die Übereinstimmungen sind verblüffend. Der rote Mantel folgt der äußeren Oberfläche des Gehirns. Ein Engel unter Gottes Arm entspricht exakt dem Hirnstamm. Ein wehender grüner Schal zeichnet den genauen Verlauf einer Hauptarterie nach, die das Gehirn versorgt. Eine kleine Figur neben Gottes linkem Fuß befindet sich genau dort, wo eine wichtige Hormondrüse sitzen würde. Punkt für Punkt stimmt die Anatomie — mit einer Genauigkeit, die kein Zufall sein kann.",
    },
    {
      text: "Und Michelangelo hatte das Wissen dafür. Als junger Künstler in Florenz verbrachte er Jahre damit, Leichen in der Kirche Santo Spirito zu sezieren — der Prior gewährte ihm Zugang zu den Körpern im Austausch gegen ein Kruzifix, das Michelangelo eigenhändig geschnitzt hatte. Mit dreißig verstand er den menschlichen Körper besser als die meisten Ärzte seiner Zeit.",
    },
    {
      text: "Was also war die Botschaft? Die eindrucksvollste Deutung lautet: Gott schenkt Adam nicht nur das Leben — er schenkt ihm einen Geist. Die Form des Gehirns bedeutet, dass das wahre göttliche Geschenk kein schlagendes Herz ist. Es ist das Bewusstsein. Das Denken. Die Fähigkeit, sich zu fragen, warum man existiert. In dieser Lesart wohnt Gott im Inneren der menschlichen Intelligenz selbst.",
    },
    {
      text: "Doch es gibt eine weit gefährlichere Deutung. Michelangelo hasste diesen Auftrag. Papst Julius II. — mehr Krieger als Priester — hatte ihn praktisch gezwungen, die Decke zu bemalen, und die beiden gerieten ständig aneinander. Was, wenn die Botschaft genau andersherum gemeint war? Wenn Gott innerhalb eines Gehirns erscheint, sagte Michelangelo vielleicht, dass Gott eine Schöpfung des menschlichen Geistes ist — und nicht umgekehrt. Das wäre eine der radikalsten Ideen der Geschichte, gemalt direkt über dem Kopf des Papstes.",
    },
    {
      text: "2010 wurde es noch spannender: Die Forscher Ian Suk und Rafael Tamargo veröffentlichten eine Studie in der Fachzeitschrift Neurosurgery, die eine zweite verborgene Anatomielektion an derselben Decke enthüllte. In dem Feld, in dem Gott Licht von Dunkelheit trennt, formen sein Hals und seine Brust ein präzises Abbild des Hirnstamms und des Rückenmarks. Michelangelo hatte es mehr als einmal getan.",
    },
    {
      text: "Niemand weiß mit Sicherheit, was Michelangelo sagen wollte. Feierte er das Bewusstsein als größtes Geschenk Gottes? Rebellierte er im Stillen gegen einen Papst, den er verachtete? Man sagt, der Teufel stecke im Detail. Aber bei Michelangelo war es nicht der Teufel, der sich in den Details versteckte — es war Gott. Fünfhundert Jahre später gibt die berühmteste Decke der Welt immer noch Geheimnisse preis, nach denen niemand zu suchen dachte.",
    },
  ],
};
de.excerpt = de.paragraphs[0].text;

// ─── Push to DynamoDB ───
async function pushItem(item) {
  const label = `${item.lang}#${item.storyId}`;
  try {
    await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`\u2705  ${label} — pushed successfully`);
    return true;
  } catch (err) {
    console.error(`\u274C  ${label} — FAILED:`, err.message);
    return false;
  }
}

console.log(`\nPushing 3 language versions to table "${TABLE}"...`);
console.log(`updatedAt = ${now}\n`);

const results = [];
for (const item of [es, fr, de]) {
  const ok = await pushItem(item);
  results.push({ lang: item.lang, ok });
  if (!ok) {
    console.error(`Stopping — fix the error above before retrying.\n`);
    process.exit(1);
  }
}

console.log("\n─── Summary ───");
for (const r of results) {
  console.log(`  ${r.ok ? "\u2705" : "\u274C"} ${r.lang}`);
}
console.log("");
