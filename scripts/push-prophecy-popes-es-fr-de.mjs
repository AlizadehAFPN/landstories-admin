import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// Shared fields from the English record (unchanged)
const base = {
  siteId: "vatican-st-peters",
  storyId: "prophecy-of-the-popes",
  icon: "\u{1F4DC}",
  storyCategory: "riddles_past",
  era: "12th century prophecy (attributed); 1595 (published)",
  tier: "A",
  isFree: true,
  hasAudio: false,
  characters: [
    "Saint Malachy of Armagh",
    "Arnold Wion (publisher)",
    "Pope Benedict XVI",
    "Pope Francis",
    "Peter the Roman (prophesied)",
  ],
  coordinates: { lat: 41.9022, lng: 12.4539 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 3,
  source:
    "Wion, Arnold, Lignum Vitae (1595); attributed to Saint Malachy of Armagh",
  disabled: false,
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH
// Proverb: "No hay plazo que no se cumpla ni deuda que no se pague"
// Subverted: the deadline arrived, but the debt — the end of the world — was never collected.
// ═══════════════════════════════════════════════════════════════

const es = {
  ...base,
  lang: "es",
  langStoryId: "es#prophecy-of-the-popes",
  title: "La profec\u00eda de los papas",
  subtitle:
    "Una lista medieval que nombra a cada papa \u2014 y ya pasamos del \u00faltimo",
  excerpt:
    "Imagina que alguien escribi\u00f3 una lista con el nombre de cada papa que existir\u00e1. No los que ya pasaron \u2014 los que vendr\u00e1n. Eso hizo, supuestamente, un arzobispo irland\u00e9s llamado Malaqu\u00edas en 1139: una lista con 112 frases en lat\u00edn, una por cada papa, desde su \u00e9poca hasta el fin del mundo.",
  moralOrLesson:
    "El poder de una profec\u00eda no est\u00e1 en que sea cierta, sino en nuestra incapacidad de dejar de preguntarnos \u00ab\u00bfy si...?\u00bb \u2014 la pregunta es m\u00e1s poderosa que cualquier respuesta.",
  paragraphs: [
    {
      text: "Imagina que alguien escribi\u00f3 una lista con el nombre de cada papa que existir\u00e1. No los que ya pasaron \u2014 los que vendr\u00e1n. Eso hizo, supuestamente, un arzobispo irland\u00e9s llamado Malaqu\u00edas en 1139: una lista con 112 frases en lat\u00edn, una por cada papa, desde su \u00e9poca hasta el fin del mundo. La \u00faltima entrada no es una frase corta. Es un p\u00e1rrafo entero. Y termina con Roma en llamas.",
    },
    {
      text: "Hay un detalle que cambia todo. Nadie supo de esta lista durante m\u00e1s de cuatrocientos a\u00f1os. Un monje benedictino llamado Arnold Wion la public\u00f3 en 1595, asegurando que llevaba siglos guardada en los archivos. Los historiadores notaron algo enseguida: cada predicci\u00f3n anterior a 1595 encajaba con su papa de forma perfecta. Sospechosamente perfecta. Las de despu\u00e9s, en cambio, eran mucho m\u00e1s vagas y dif\u00edciles de conectar.",
    },
    {
      text: "Aun as\u00ed, hay coincidencias que cuesta ignorar. A P\u00edo X, papa entre 1903 y 1914, le toc\u00f3 \u00abIgnis ardens\u00bb \u2014 fuego ardiente \u2014 y dedic\u00f3 su papado entero a combatir las ideas modernistas en la Iglesia. A Juan Pablo I le correspondi\u00f3 \u00abDe medietate lunae\u00bb \u2014 de la media luna. Dur\u00f3 exactamente 33 d\u00edas como papa en 1978. Muri\u00f3 tan de repente que las teor\u00edas conspirativas lo persiguen hasta hoy.",
    },
    {
      text: "Y entonces lleg\u00f3 el momento que todos tem\u00edan. En 2013, Benedicto XVI hizo algo que ning\u00fan papa hab\u00eda hecho en seiscientos a\u00f1os: renunci\u00f3. En la lista de Malaqu\u00edas era el n\u00famero 111 de 112. Su frase: \u00abGloria olivae\u00bb \u2014 la gloria del olivo. Eligi\u00f3 el nombre Benedicto, y resulta que la orden benedictina tiene una rama llamada los olivetanos. \u00bfCoincidencia? El escalofr\u00edo fue real. Porque la entrada 112 era la \u00faltima.",
    },
    {
      text: "Esa \u00faltima entrada rompe todas las reglas. En vez de una frase corta, es un p\u00e1rrafo completo: \u00abEn la persecuci\u00f3n final de la Santa Iglesia, se sentar\u00e1 Pedro el Romano, que apacentar\u00e1 a sus ovejas entre muchas tribulaciones. Cuando todo se haya cumplido, la ciudad de las siete colinas ser\u00e1 destruida, y el Juez terrible juzgar\u00e1 a su pueblo. Fin.\u00bb La ciudad de las siete colinas es Roma. No hay entrada 113.",
    },
    {
      text: "Cuando el cardenal argentino Jorge Bergoglio fue elegido y escogi\u00f3 el nombre Francisco \u2014 no Pedro \u2014 los creyentes buscaron explicaciones. Que sus ra\u00edces italianas, que como obispo de Roma era \u00abPedro el Romano\u00bb por definici\u00f3n. Recontaron la lista una y otra vez. Luego Francisco muri\u00f3 en abril de 2025, los cardenales entraron a la Capilla Sixtina e hicieron lo de siempre: elegir otro papa. Robert Prevost se convirti\u00f3 en Le\u00f3n XIV. La lista se hab\u00eda acabado. La Iglesia, no.",
    },
    {
      text: "Dicen que no hay plazo que no se cumpla ni deuda que no se pague. El plazo se cumpli\u00f3: el papa 112 lleg\u00f3, vivi\u00f3 y muri\u00f3. Pero la deuda \u2014 el fin del mundo \u2014 qued\u00f3 sin cobrar. La profec\u00eda fue probablemente obra de un monje listo en los 1590, que falsific\u00f3 las primeras entradas y dej\u00f3 las \u00faltimas lo bastante vagas para encajar con cualquier cosa. Pero durante cinco siglos hizo que la gente contara papas como quien cuenta los d\u00edas para el final. Las profec\u00edas no necesitan ser ciertas. Solo necesitan hacerte una pregunta que no puedas sacarte de la cabeza.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FRENCH
// Proverb: "Qui vivra verra"
// Subverted: On a vécu. On a vu. The 112th pope came and went, and the world still turns.
// ═══════════════════════════════════════════════════════════════

const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#prophecy-of-the-popes",
  title: "La proph\u00e9tie des papes",
  subtitle:
    "Une liste m\u00e9di\u00e9vale qui nomme chaque pape \u2014 et on a d\u00e9j\u00e0 d\u00e9pass\u00e9 le dernier",
  excerpt:
    "Il existe un document qui pr\u00e9tend donner le nom de chaque pape qui existera. Pas ceux du pass\u00e9 \u2014 ceux qui viendront. On l\u2019attribue \u00e0 saint Malachie, un archev\u00eaque irlandais qui se serait rendu \u00e0 Rome en 1139 et aurait eu une vision de tous les papes \u00e0 venir.",
  moralOrLesson:
    "Le pouvoir d\u2019une proph\u00e9tie ne vient pas de sa v\u00e9rit\u00e9, mais de notre incapacit\u00e9 \u00e0 cesser de nous demander \u00ab et si... ? \u00bb \u2014 la question est plus puissante que toute r\u00e9ponse.",
  paragraphs: [
    {
      text: "Il existe un document qui pr\u00e9tend donner le nom de chaque pape qui existera. Pas ceux du pass\u00e9 \u2014 ceux qui viendront. On l\u2019attribue \u00e0 saint Malachie, un archev\u00eaque irlandais qui se serait rendu \u00e0 Rome en 1139 et aurait eu une vision de tous les papes \u00e0 venir. Le r\u00e9sultat : 112 courtes phrases en latin, une par pape, jusqu\u2019\u00e0 la fin des temps. La derni\u00e8re entr\u00e9e n\u2019est pas une simple phrase. C\u2019est un paragraphe entier. Et il se termine avec Rome en flammes.",
    },
    {
      text: "Mais il y a un d\u00e9tail qui change tout. Personne n\u2019avait entendu parler de cette liste pendant plus de quatre cents ans. C\u2019est un moine b\u00e9n\u00e9dictin du nom d\u2019Arnold Wion qui l\u2019a publi\u00e9e en 1595, en affirmant qu\u2019elle dormait dans les archives depuis des si\u00e8cles. Les historiens ont remarqu\u00e9 quelque chose imm\u00e9diatement : chaque pr\u00e9diction d\u2019avant 1595 correspondait parfaitement \u00e0 son pape. Trop parfaitement. Celles d\u2019apr\u00e8s cette date ? Beaucoup plus floues, beaucoup plus difficiles \u00e0 rattacher \u00e0 quiconque.",
    },
    {
      text: "Et pourtant, certaines co\u00efncidences sont troublantes. Pie X, pape de 1903 \u00e0 1914, avait h\u00e9rit\u00e9 de la mention \u00ab Ignis ardens \u00bb \u2014 feu ardent \u2014 et il a pass\u00e9 tout son pontificat \u00e0 combattre les id\u00e9es modernistes au sein de l\u2019\u00c9glise. Jean-Paul Ier portait l\u2019\u00e9tiquette \u00ab De medietate lunae \u00bb \u2014 de la moiti\u00e9 de la lune. Il n\u2019a r\u00e9gn\u00e9 que 33 jours en 1978. Sa mort a \u00e9t\u00e9 si soudaine que les th\u00e9ories du complot le poursuivent encore.",
    },
    {
      text: "Puis est arriv\u00e9 le moment que tout le monde redoutait. En 2013, Beno\u00eet XVI a fait quelque chose qu\u2019aucun pape n\u2019avait fait depuis six cents ans : il a renonc\u00e9. Sur la liste de Malachie, il \u00e9tait le num\u00e9ro 111 sur 112. Sa formule : \u00ab Gloria olivae \u00bb \u2014 la gloire de l\u2019olivier. Il avait choisi le nom de Beno\u00eet, et l\u2019ordre des B\u00e9n\u00e9dictins compte une branche appel\u00e9e les Oliv\u00e9tains. Co\u00efncidence ou proph\u00e9tie, le frisson \u00e9tait bien r\u00e9el. Parce que l\u2019entr\u00e9e 112 \u00e9tait la derni\u00e8re.",
    },
    {
      text: "Cette derni\u00e8re entr\u00e9e brise le sch\u00e9ma. Au lieu d\u2019une courte formule, c\u2019est un paragraphe entier : \u00ab Dans la derni\u00e8re pers\u00e9cution de la sainte \u00c9glise romaine si\u00e9gera Pierre le Romain, qui fera pa\u00eetre ses brebis \u00e0 travers de nombreuses tribulations. Quand tout sera accompli, la cit\u00e9 aux sept collines sera d\u00e9truite, et le Juge redoutable jugera son peuple. Fin. \u00bb La cit\u00e9 aux sept collines, c\u2019est Rome. Il n\u2019y a pas d\u2019entr\u00e9e 113.",
    },
    {
      text: "Quand le cardinal argentin Jorge Bergoglio a \u00e9t\u00e9 \u00e9lu et a choisi le nom de Fran\u00e7ois \u2014 pas Pierre \u2014 les croyants ont cherch\u00e9 des explications. Ses origines italiennes, son statut d\u2019\u00e9v\u00eaque de Rome, de successeur de saint Pierre : il \u00e9tait \u00ab Pierre le Romain \u00bb par d\u00e9finition, disaient-ils. On a recompt\u00e9 la liste encore et encore. Puis Fran\u00e7ois est mort en avril 2025, les cardinaux sont entr\u00e9s dans la chapelle Sixtine et ont fait ce qu\u2019ils ont toujours fait : \u00e9lire un autre pape. Robert Prevost est devenu L\u00e9on XIV. La liste \u00e9tait \u00e9puis\u00e9e. L\u2019\u00c9glise, elle, continuait.",
    },
    {
      text: "Qui vivra verra, dit le proverbe. On a v\u00e9cu. On a vu. Le 112e pape est pass\u00e9, et le monde tourne encore. La proph\u00e9tie des papes est probablement l\u2019\u0153uvre d\u2019un moine malin des ann\u00e9es 1590, qui a truqu\u00e9 les premi\u00e8res entr\u00e9es et laiss\u00e9 les derni\u00e8res assez vagues pour coller \u00e0 n\u2019importe quoi. Mais pendant cinq si\u00e8cles, elle a transform\u00e9 chaque conclave en compte \u00e0 rebours. Les proph\u00e9ties n\u2019ont pas besoin d\u2019\u00eatre vraies pour \u00eatre puissantes. Elles ont juste besoin de poser une question dont on n\u2019arrive pas \u00e0 se d\u00e9barrasser.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// GERMAN
// Proverb: "Man soll den Tag nicht vor dem Abend loben"
// Subverted: Maybe you shouldn't fear the day before evening either. The evening came — and the world kept turning.
// ═══════════════════════════════════════════════════════════════

const de = {
  ...base,
  lang: "de",
  langStoryId: "de#prophecy-of-the-popes",
  title: "Die Prophezeiung der P\u00e4pste",
  subtitle:
    "Eine mittelalterliche Liste, die jeden Papst benennt \u2014 und wir sind l\u00e4ngst am Ende angekommen",
  excerpt:
    "Es gibt ein Dokument, das behauptet, jeden Papst namentlich vorherzusagen, der je leben wird. Nicht die, die schon waren \u2014 die, die kommen. Es wird dem heiligen Malachias zugeschrieben, einem irischen Erzbischof, der 1139 nach Rom gereist sein soll.",
  moralOrLesson:
    "Die Macht einer Prophezeiung liegt nicht in ihrer Wahrheit, sondern in unserer Unf\u00e4higkeit, aufzuh\u00f6ren zu fragen: \u00abWas, wenn doch?\u00bb \u2014 die Frage ist m\u00e4chtiger als jede Antwort.",
  paragraphs: [
    {
      text: "Es gibt ein Dokument, das behauptet, jeden Papst namentlich vorherzusagen, der je leben wird. Nicht die, die schon waren \u2014 die, die kommen. Es wird dem heiligen Malachias zugeschrieben, einem irischen Erzbischof, der 1139 nach Rom gereist sein soll und dort eine Vision aller kommenden P\u00e4pste gehabt haben soll. Das Ergebnis: 112 kurze lateinische Formeln, eine pro Papst, bis zum Ende der Welt. Der letzte Eintrag ist keine kurze Formel. Es ist ein ganzer Absatz. Und er endet mit Rom in Flammen.",
    },
    {
      text: "Aber da ist ein Detail, das alles ver\u00e4ndert. Niemand hatte \u00fcber vierhundert Jahre von dieser Liste geh\u00f6rt. Erst 1595 ver\u00f6ffentlichte ein Benediktinerm\u00f6nch namens Arnold Wion sie und behauptete, sie sei seit Jahrhunderten in den Archiven verborgen gewesen. Historikern fiel sofort etwas auf: Jede Vorhersage vor 1595 passte perfekt zu ihrem Papst. Verd\u00e4chtig perfekt. Die Eintr\u00e4ge danach? Deutlich vager, deutlich schwerer zuzuordnen.",
    },
    {
      text: "Trotzdem gibt es Treffer, die man nicht einfach abtun kann. Pius X., Papst von 1903 bis 1914, trug die Bezeichnung \u00abIgnis ardens\u00bb \u2014 brennendes Feuer \u2014 und verbrachte sein gesamtes Pontifikat damit, modernistische Ideen in der Kirche zu bek\u00e4mpfen. Johannes Paul I. war \u00abDe medietate lunae\u00bb \u2014 von der H\u00e4lfte des Mondes. Er war nur 33 Tage Papst, im Jahr 1978. Sein Tod kam so pl\u00f6tzlich, dass die Verschw\u00f6rungstheorien bis heute nicht verstummt sind.",
    },
    {
      text: "Dann kam der Moment, vor dem sich alle gef\u00fcrchtet hatten. 2013 tat Benedikt XVI. etwas, was kein Papst seit sechshundert Jahren getan hatte: Er trat zur\u00fcck. Auf Malachias\u2019 Liste war er Nummer 111 von 112. Seine Formel: \u00abGloria olivae\u00bb \u2014 Ruhm des Olivenbaums. Er hatte den Namen Benedikt gew\u00e4hlt, und der Benediktinerorden hat einen Zweig namens Olivetaner. Zufall oder Prophezeiung \u2014 es lief einem kalt den R\u00fccken runter. Denn Eintrag 112 war der letzte.",
    },
    {
      text: "Dieser letzte Eintrag bricht mit dem Muster. Statt einer kurzen Formel ist es ein ganzer Absatz: \u00abIn der letzten Verfolgung der heiligen r\u00f6mischen Kirche wird Petrus der R\u00f6mer regieren, der seine Schafe durch viele Pr\u00fcfungen weiden wird. Wenn dies alles vollendet ist, wird die Stadt der sieben H\u00fcgel zerst\u00f6rt werden, und der furchtbare Richter wird sein Volk richten. Ende.\u00bb Die Stadt der sieben H\u00fcgel ist Rom. Einen Eintrag 113 gibt es nicht.",
    },
    {
      text: "Als der argentinische Kardinal Jorge Bergoglio gew\u00e4hlt wurde und den Namen Franziskus w\u00e4hlte \u2014 nicht Petrus \u2014 suchten die Gl\u00e4ubigen nach Erkl\u00e4rungen. Seine italienischen Wurzeln, sein Amt als Bischof von Rom, als Nachfolger des heiligen Petrus: Er sei \u00abPetrus der R\u00f6mer\u00bb per Definition, argumentierten sie. Man z\u00e4hlte die Liste immer wieder durch. Dann starb Franziskus im April 2025, die Kardin\u00e4le zogen in die Sixtinische Kapelle ein und taten, was sie immer getan haben: einen neuen Papst w\u00e4hlen. Robert Prevost wurde Leo XIV. Die Liste war am Ende. Die Kirche nicht.",
    },
    {
      text: "Man soll den Tag nicht vor dem Abend loben, sagt das Sprichwort. Vielleicht sollte man ihn auch nicht vor dem Abend f\u00fcrchten. Der Abend kam \u2014 der 112. Papst lebte und starb. Und die Welt dreht sich weiter. Die Prophezeiung war wahrscheinlich das Werk eines cleveren M\u00f6nchs aus den 1590ern, der die fr\u00fchen Eintr\u00e4ge f\u00e4lschte und die sp\u00e4teren vage genug hielt, um auf alles zu passen. Aber f\u00fcnf Jahrhunderte lang verwandelte sie jedes Konklave in einen Countdown. Prophezeiungen m\u00fcssen nicht wahr sein, um Macht zu haben. Sie m\u00fcssen nur eine Frage stellen, die man nicht mehr loswird.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════

const stories = [
  { label: "SPANISH (es)", data: es },
  { label: "FRENCH (fr)", data: fr },
  { label: "GERMAN (de)", data: de },
];

for (const { label, data } of stories) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId:      ${data.siteId}`);
  console.log(`  langStoryId: ${data.langStoryId}`);
  console.log(`  title:       ${data.title}`);
  console.log(`  paragraphs:  ${data.paragraphs.length}`);
  console.log(`  updatedAt:   ${data.updatedAt}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log(`  ✓ SUCCESS`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ⚠ Record already exists. Overwriting...`);
      await docClient.send(
        new PutCommand({
          TableName: TABLE,
          Item: data,
        })
      );
      console.log(`  ✓ OVERWRITTEN`);
    } else {
      console.error(`  ✗ FAILED:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\n═══ ALL DONE ═══\n");
