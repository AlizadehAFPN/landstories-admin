import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const timestamp = Math.floor(Date.now() / 1000);

// ── Shared non-text fields ──────────────────────────────────────────
const base = {
  siteId: "baalbek",
  storyId: "stones-that-should-not-exist",
  characters: [
    "Jean-Pierre Adam (French architect-archaeologist)",
    "Dr. Jeanine Abdul Massih (Lebanese University archaeologist)",
    "The Roman engineers of Colonia Heliopolis",
    "The Pregnant Woman of the Legend",
    "Mark Twain (visiting author, 1867)",
  ],
  coordinates: { lat: 34.0069, lng: 36.2039 },
  disabled: false,
  era: "c. 27 BCE – 60 CE (Trilithon construction); 2014 (discovery of the largest carved stone in history)",
  hasAudio: false,
  icon: "\u{1FAA8}",
  image: "",
  isFree: true,
  readingTimeMinutes: 3,
  source:
    "Adam, Jean-Pierre. 'A propos du trilithon de Baalbek,' Syria Vol. 54, 1977; Abdul Massih, Jeanine & German Archaeological Institute, 2014 excavation reports; Kalayan, Haroutune. 'The Engraved Drawing on the Trilithon,' 1969; Twain, Mark. The Innocents Abroad, 1869; Archaeology Magazine, March/April 2015; Guinness World Records, Largest Megalith from Antiquity",
  storyCategory: "mysteries_enigmas",
  thumbnail: "",
  tier: "S",
  updatedAt: timestamp,
};

// ════════════════════════════════════════════════════════════════════
//  SPANISH
// ════════════════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#stones-that-should-not-exist",
  title: "Las piedras que no deberían existir",
  subtitle:
    "Los bloques de ochocientas toneladas que desafiaron toda explicación durante siglos — y la cantera que aún guarda la mayor piedra tallada de la historia",
  excerpt:
    "Tres piedras en un muro en el Líbano. Cada una pesa ochocientas toneladas. Encajan tan bien que una cuchilla no cabe entre ellas. Sin argamasa. Sin cemento. Y durante siglos, sin explicación.",
  moralOrLesson:
    "La verdadera medida de la ambición no es lo que terminas, sino lo que te atreves a empezar. Los romanos dejaron la mayor piedra jamás tallada abandonada en una cantera, y dos mil años después, seguimos preguntándonos para qué la estaban preparando.",
  paragraphs: [
    {
      text: "En Baalbek, en el corazón del Líbano, tres bloques de piedra caliza sostienen los restos del Templo de Júpiter, el edificio religioso más grande del Imperio romano. Cada uno pesa ochocientas toneladas. Encajan entre sí con una precisión que desafía la lógica: ni la hoja de una cuchilla cabe entre ellos. Sin argamasa. Sin cemento. Solo piedra contra piedra, sostenida por la gravedad y la destreza de ingenieros que nunca dejaron su nombre.",
    },
    {
      text: "Durante siglos, nadie supo explicar cómo llegaron ahí. El misterio era tan enorme que se tragaba cualquier respuesta racional. Una leyenda árabe decía que la ciudad la levantó Caín, el hijo de Adán, con la ayuda de gigantes. La tradición islámica hablaba de seres sobrenaturales llamados djinn, a las órdenes del rey Salomón. Y en el siglo XIX, un explorador inglés propuso muy en serio que se habían usado elefantes prehistóricos como grúas vivientes.",
    },
    {
      text: "Cuando Mark Twain pasó por allí en 1867, se quedó mirando el muro y escribió: 'Cómo esos bloques inmensos salieron de las canteras es un misterio que nadie ha resuelto.' No exageraba ni un poco. La cantera está a ochocientos metros. Bloques de ochocientas toneladas cruzaron esa distancia hace dos mil años — sin motores, sin acero, sin ruedas capaces de soportar semejante peso. Y sin embargo, ahí siguen.",
    },
    {
      text: "La respuesta llegó en 1977. Un arquitecto francés, Jean-Pierre Adam, se sentó a hacer los cálculos. Dieciséis cabrestantes giratorios, cada uno movido por treinta y dos hombres, conectados por cuerdas de cáñamo y poleas. Quinientos doce trabajadores en total. El terreno entre la cantera y el templo baja ligeramente — la gravedad echaba una mano. ¿Las juntas imposibles? Técnica romana: solo los bordes de cada bloque se pulían hasta quedar planos. Ni alienígenas. Ni gigantes. Solo Roma siendo Roma.",
    },
    {
      text: "Pero la cantera guardaba un secreto mayor. Medio enterrado donde llevaba dos mil años esperando, había un bloque a medio tallar conocido como la Piedra de la Mujer Embarazada. Mil toneladas — aún más pesado que los tres del muro. Estaba casi separado de la roca madre, pero nunca se movió. Quizá una grieta arruinó el trabajo. Quizá una epidemia. Quizá se acabó el dinero. Nadie lo sabe.",
    },
    {
      text: "El nombre viene de una leyenda local. Una mujer embarazada juró a los habitantes de Baalbek que conocía el secreto para mover la piedra imposible… con una condición: que la alimentaran hasta dar a luz. Aceptaron. Comió bien nueve meses. Cuando nació el bebé, confesó que no tenía la menor idea. Puede que sea el mayor farol en la historia del folclore.",
    },
    {
      text: "Dicen que no hay dos sin tres. En Baalbek, el tres no fue el final. En 2014, un equipo dirigido por la arqueóloga Jeanine Abdul Massih excavaba bajo la Mujer Embarazada cuando dieron con algo que nadie esperaba: otro bloque colosal. Casi veinte metros de largo. Seis de ancho. Más de cinco de alto. Mil seiscientas cincuenta toneladas — más que cuatro Boeing 747 cargados. La mayor piedra tallada en la historia de la humanidad, oculta bajo tierra desde la época de los césares.",
    },
    {
      text: "Ni siquiera habían llegado al fondo. Abdul Massih declaró desde la cantera: 'No conocemos la dimensión completa.' Hace dos mil años, unos ingenieros romanos miraron esa roca y pensaron: podemos usarla. La tallaron, alisaron sus caras, la prepararon para el transporte… y se marcharon para siempre. Lo que dejaron no es un monumento al fracaso. Es la prueba de que lo más grande que unas manos humanas arrancaron jamás de la roca iba destinado a algo aún mayor.",
    },
  ],
};

// ════════════════════════════════════════════════════════════════════
//  FRENCH
// ════════════════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#stones-that-should-not-exist",
  title: "Les pierres qui ne devraient pas exister",
  subtitle:
    "Les blocs de huit cents tonnes qui ont défié toute explication pendant des siècles — et la carrière qui garde encore la plus grande pierre taillée de l'histoire",
  excerpt:
    "Trois pierres dans un mur au Liban. Chacune pèse huit cents tonnes. Si parfaitement ajustées qu'une lame de rasoir ne passe pas entre elles. Pas de mortier. Pas de ciment. Et pendant des siècles, aucune explication.",
  moralOrLesson:
    "La vraie mesure de l'ambition, ce n'est pas ce qu'on termine — c'est ce qu'on ose commencer. Les Romains ont laissé la plus grande pierre jamais taillée inachevée dans une carrière, et deux mille ans plus tard, on se demande encore ce qu'ils avaient en tête.",
  paragraphs: [
    {
      text: "Trois pierres sont posées dans un mur à Baalbek, au Liban. Chacune pèse huit cents tonnes. Elles forment les fondations du temple de Jupiter — le plus grand édifice religieux jamais bâti par l'Empire romain. Elles s'emboîtent si parfaitement qu'une lame de rasoir ne passe pas entre elles. Pas de mortier. Pas de ciment. Rien que du calcaire contre du calcaire, maintenu par la gravité et le savoir-faire d'ingénieurs qui n'ont jamais laissé leur nom.",
    },
    {
      text: "Pendant des siècles, personne n'a eu la moindre idée de comment elles étaient arrivées là. Le mystère était si colossal qu'il avalait toute réponse rationnelle. Une légende arabe racontait que la ville avait été construite par Caïn — le fils d'Adam — avec l'aide de géants. La tradition islamique évoquait des êtres surnaturels appelés djinns, aux ordres du roi Salomon. Au XIXe siècle, un explorateur anglais a sérieusement proposé que des éléphants préhistoriques avaient servi de grues vivantes.",
    },
    {
      text: "Quand Mark Twain est passé par là en 1867, il a fixé le mur et écrit : « Comment ces blocs immenses ont pu quitter les carrières reste un mystère que personne n'a résolu. » Il n'exagérait pas. La carrière se trouve à huit cents mètres. Des blocs de huit cents tonnes ont parcouru cette distance il y a deux mille ans — sans moteur, sans acier, sans roues capables de supporter un tel poids. Et pourtant, les pierres sont toujours là.",
    },
    {
      text: "La réponse est venue en 1977 d'un architecte français, Jean-Pierre Adam. Il a fait les calculs. Seize cabestans rotatifs, chacun actionné par trente-deux hommes, reliés par des cordes de chanvre et des poulies. Cinq cent douze ouvriers au total. Le terrain entre la carrière et le temple descend légèrement — la gravité donnait un coup de main. Les joints impossibles ? Une technique romaine : seuls les bords de chaque bloc étaient polis jusqu'à être parfaitement plats. Pas d'extraterrestres. Pas de géants. Juste Rome, fidèle à elle-même.",
    },
    {
      text: "Mais la carrière cachait un secret plus grand encore. À moitié enfoui là où il reposait depuis deux mille ans se trouvait un bloc partiellement taillé connu sous le nom de Pierre de la Femme Enceinte. Mille tonnes — encore plus lourd que les trois pierres du mur. Il était presque détaché de la roche mère, mais n'a jamais bougé. Une fissure pendant l'extraction a peut-être tout arrêté. Ou une épidémie. Ou le manque d'argent. Personne ne sait.",
    },
    {
      text: "Le nom vient d'une légende locale. Une femme enceinte a juré aux habitants de Baalbek qu'elle connaissait le secret pour déplacer la pierre impossible — à une condition : qu'on la nourrisse jusqu'à l'accouchement. Marché conclu. Elle a mangé à sa faim pendant neuf mois. Quand le bébé est arrivé, elle a avoué qu'elle n'en avait pas la moindre idée. C'est peut-être le plus beau bluff de l'histoire du folklore.",
    },
    {
      text: "Jamais deux sans trois, dit le proverbe. À Baalbek, le trois n'était qu'un début. En 2014, une équipe dirigée par l'archéologue Jeanine Abdul Massih creusait sous la Pierre de la Femme Enceinte quand elle est tombée sur quelque chose d'inimaginable : un nouveau bloc, plus grand que tout ce que des mains humaines avaient jamais taillé. Près de vingt mètres de long. Six de large. Plus de cinq de haut. Mille six cent cinquante tonnes — plus lourd que quatre Boeing 747 chargés à bloc. La plus grande pierre ouvrée de l'histoire de l'humanité, enfouie depuis l'époque des Césars.",
    },
    {
      text: "Ils n'avaient même pas atteint le fond. Abdul Massih a déclaré depuis la carrière : « Nous ne connaissons pas la dimension complète. » Il y a deux mille ans, des ingénieurs romains ont regardé cette roche et se sont dit : on peut en faire quelque chose. Ils l'ont taillée, poli ses surfaces, préparée pour le transport… puis ils sont partis pour toujours. Ce qu'ils ont laissé derrière eux n'est pas un monument à l'échec. C'est la preuve que la plus grande chose jamais arrachée à la roche par des mains humaines était destinée à quelque chose de plus grand encore.",
    },
  ],
};

// ════════════════════════════════════════════════════════════════════
//  GERMAN
// ════════════════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#stones-that-should-not-exist",
  title: "Die Steine, die es nicht geben dürfte",
  subtitle:
    "Die achthundert Tonnen schweren Bausteine, die jahrhundertelang jede Erklärung sprengten — und der Steinbruch, der den größten behauenen Stein der Menschheitsgeschichte bewahrt",
  excerpt:
    "Drei Steine in einer Mauer im Libanon. Jeder wiegt achthundert Tonnen. So präzise zusammengefügt, dass keine Rasierklinge dazwischen passt. Kein Mörtel. Kein Zement. Und jahrhundertelang keine Erklärung.",
  moralOrLesson:
    "Das wahre Maß von Ambition ist nicht, was man vollendet — sondern was man zu beginnen wagt. Die Römer ließen den größten je behauenen Stein unvollendet in einem Steinbruch zurück, und zweitausend Jahre später fragen wir uns immer noch, wofür er bestimmt war.",
  paragraphs: [
    {
      text: "In Baalbek im Libanon stecken drei Steinblöcke in einer Mauer. Jeder wiegt achthundert Tonnen. Sie bilden das Fundament des Jupitertempels — des größten Sakralbaus, den das Römische Reich je errichtet hat. Sie passen so exakt zusammen, dass keine Rasierklinge zwischen sie passt. Kein Mörtel. Kein Zement. Nur Kalkstein auf Kalkstein, gehalten von der Schwerkraft und dem Können von Ingenieuren, die nie ihren Namen hinterließen.",
    },
    {
      text: "Jahrhundertelang hatte niemand die geringste Ahnung, wie sie dorthin gelangt waren. Das Rätsel war so gewaltig, dass es jede rationale Antwort verschluckte. Eine arabische Legende besagte, Kain — Adams Sohn — habe die Stadt mit Hilfe von Riesen erbaut. Die islamische Überlieferung sprach von übernatürlichen Wesen namens Dschinn, die König Salomon gehorchten. Im 19. Jahrhundert schlug ein englischer Entdecker allen Ernstes vor, prähistorische Elefanten hätten als lebende Kräne gedient.",
    },
    {
      text: "Als Mark Twain 1867 vor der Mauer stand, schrieb er: \u201EWie diese gewaltigen Blöcke je aus den Steinbrüchen geschafft wurden, ist ein Rätsel, das kein Mensch gelöst hat.\u201C Er übertrieb kein bisschen. Der Steinbruch liegt achthundert Meter entfernt. Achthundert-Tonnen-Blöcke legten diese Strecke vor zweitausend Jahren zurück — ohne Motoren, ohne Stahl, ohne Räder, die dieses Gewicht tragen konnten. Und trotzdem stehen die Steine da.",
    },
    {
      text: "Die Antwort kam 1977 von einem französischen Architekten namens Jean-Pierre Adam. Er rechnete nach. Sechzehn rotierende Seilwinden, jede von zweiunddreißig Männern gedreht, verbunden durch Hanfseile und Flaschenzüge. Fünfhundertzwölf Arbeiter insgesamt. Das Gelände zwischen Steinbruch und Tempel fällt leicht ab — die Schwerkraft half mit. Die unmöglichen Fugen? Römische Technik: Nur die Kanten jedes Blocks wurden perfekt plangeschliffen. Keine Außerirdischen. Keine Riesen. Einfach Rom in Höchstform.",
    },
    {
      text: "Doch der Steinbruch hütete ein noch größeres Geheimnis. Halb begraben, so wie er seit zweitausend Jahren dalag, ruhte ein teilweise behauener Block mit dem Namen Stein der Schwangeren Frau. Tausend Tonnen — schwerer als die drei Steine in der Mauer. Er war fast vom Fels gelöst, wurde aber nie bewegt. Vielleicht zerstörte ein Riss das Vorhaben. Vielleicht kam eine Seuche. Vielleicht ging das Geld aus. Niemand weiß es.",
    },
    {
      text: "Der Name stammt aus einer lokalen Legende. Eine schwangere Frau behauptete gegenüber den Einwohnern von Baalbek, sie kenne das Geheimnis, den unmöglichen Stein zu bewegen — unter einer Bedingung: Man solle sie ernähren, bis sie ihr Kind zur Welt brächte. Sie willigten ein. Neun Monate lang aß sie bestens. Als das Baby kam, gestand sie, dass sie nicht die leiseste Ahnung hatte. Es dürfte der größte Bluff in der Geschichte der Folklore sein.",
    },
    {
      text: "Aller guten Dinge sind drei, sagt man. In Baalbek hörte es bei drei nicht auf. 2014 grub ein Team unter Leitung der Archäologin Jeanine Abdul Massih unter dem Stein der Schwangeren Frau, als sie auf etwas stießen, womit niemand gerechnet hatte: noch einen Block, größer als alles, was Menschenhände je aus Fels geschlagen hatten. Fast zwanzig Meter lang. Sechs Meter breit. Über fünf Meter hoch. Tausendsechshundertfünfzig Tonnen — schwerer als vier voll beladene Boeing 747. Der größte bearbeitete Stein der Menschheitsgeschichte, seit der Zeit der Caesaren unter der Erde verborgen.",
    },
    {
      text: "Sie hatten nicht einmal den Boden erreicht. Abdul Massih erklärte im Steinbruch: \u201EWir kennen die vollständige Dimension nicht.\u201C Vor zweitausend Jahren sahen römische Ingenieure diesen Fels und dachten: Den können wir gebrauchen. Sie formten ihn, glätteten seine Flächen, bereiteten ihn für den Transport vor — und gingen für immer. Was sie hinterließen, ist kein Denkmal des Scheiterns. Es ist der Beweis, dass das Größte, was Menschenhände je aus Stein gehauen haben, für etwas noch Größeres bestimmt war.",
    },
  ],
};

// ════════════════════════════════════════════════════════════════════
//  PUSH TO DYNAMODB
// ════════════════════════════════════════════════════════════════════
const TABLE = "Story";

async function push(label, item) {
  console.log(`\n⏳ Pushing ${label} (${item.langStoryId}) ...`);
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`✅ ${label} pushed successfully.`);
  } catch (err) {
    console.error(`❌ ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

async function verify(label, siteId, langStoryId) {
  const { DynamoDBDocumentClient: _, GetCommand } = await import(
    "@aws-sdk/lib-dynamodb"
  );
  const { GetCommand: Get } = await import("@aws-sdk/lib-dynamodb");
  const res = await doc.send(
    new Get({
      TableName: TABLE,
      Key: { siteId, langStoryId },
    })
  );
  if (res.Item) {
    console.log(
      `   ✔ Verified ${label}: title = "${res.Item.title}", paragraphs = ${res.Item.paragraphs.length}`
    );
  } else {
    console.error(`   ✘ Verification FAILED for ${label} — item not found!`);
    process.exit(1);
  }
}

(async () => {
  console.log(`Timestamp: ${timestamp}`);

  await push("Spanish", es);
  await verify("Spanish", es.siteId, es.langStoryId);

  await push("French", fr);
  await verify("French", fr.siteId, fr.langStoryId);

  await push("German", de);
  await verify("German", de.siteId, de.langStoryId);

  console.log("\n🎉 All three languages pushed and verified successfully!");
})();
