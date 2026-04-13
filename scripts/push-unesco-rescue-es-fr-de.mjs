import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// Shared fields (unchanged from English)
const shared = {
  siteId: "abu-simbel",
  storyId: "unesco-rescue-moving-mountains",
  icon: "\u{1F3D7}\uFE0F",
  tier: "A",
  source:
    "Desroches-Noblecourt, C. et al. The Rescue of Abu Simbel. UNESCO, 1968; Säve-Söderbergh, T. Temples and Tombs of Ancient Nubia. Thames & Hudson, 1987",
  characters: [
    "UNESCO",
    "Gamal Abdel Nasser",
    "VBB Engineering (Sweden)",
    "International community of 50 nations",
  ],
  era: "Modern (1964-1968)",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 31.6256, lat: 22.3369 },
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb: "La fe mueve montañas" — subverted with cranes
// ═══════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#unesco-rescue-moving-mountains",
  title: "El rescate que movió montañas",
  subtitle: "La historia de cómo 50 países salvaron un templo de 3.200 años",
  excerpt:
    "En 1960, Egipto tenía un problema enorme. El presidente Nasser estaba construyendo la presa de Asuán, un proyecto descomunal para controlar las crecidas del Nilo y darle energía al país. Pero la presa iba a crear el lago Nasser, uno de los lagos artificiales más grandes del planeta, inundando 500 kilómetros del valle del Nilo.",
  moralOrLesson:
    "Cuando la humanidad se une más allá de sus diferencias para proteger lo que de verdad importa, hasta las montañas se mueven.",
  paragraphs: [
    {
      text: "En 1960, Egipto tenía un problema enorme. El presidente Nasser estaba construyendo la presa de Asuán, un proyecto descomunal para controlar las crecidas del Nilo y darle energía al país. Pero la presa iba a crear el lago Nasser, uno de los lagos artificiales más grandes del planeta, inundando 500 kilómetros del valle del Nilo. Decenas de templos milenarios iban a quedar bajo el agua — entre ellos Abu Simbel, dos templos que Ramsés II mandó tallar en la roca hace más de 3.200 años.",
    },
    {
      text: "La UNESCO hizo algo que nadie había intentado jamás: pidió ayuda al mundo entero. Salven estos templos o desaparecen para siempre. Y el mundo respondió. Cincuenta países, incluidos rivales de la Guerra Fría que no se ponían de acuerdo en nada, enviaron dinero, ingenieros y maquinaria. Suecia, un país sin ningún vínculo con Egipto, se convirtió en uno de los mayores donantes. El coste: unos 40 millones de dólares de la época — más de 360 millones actuales. El rescate arqueológico más caro de la historia.",
    },
    {
      text: "Y aquí es donde la cosa se pone de locos. Abu Simbel no era un edificio que pudieras desmontar y llevarte. Los templos estaban tallados directamente en un acantilado de arenisca. Así que una empresa sueca llamada VBB propuso un plan descabellado: cortar todo el complejo en 1.036 bloques de entre 20 y 30 toneladas cada uno, subirlos 65 metros y moverlos 200 metros tierra adentro. Después, reconstruirlo todo sobre una colina artificial idéntica al acantilado original.",
    },
    {
      text: "Las obras empezaron en 1964, con el lago avanzando ya hacia los templos. Los trabajadores levantaron un dique temporal para contener el agua y ganar tiempo. Y ahora viene lo que de verdad impresiona: no podían usar herramientas eléctricas. Las vibraciones habrían agrietado la piedra milenaria. Así que cada corte se hizo a mano, con precisión milimétrica. Cada bloque fue numerado, levantado con grúas y colocado en su posición exacta — el puzle más arriesgado jamás montado.",
    },
    {
      text: "Dentro de la nueva colina, los ingenieros construyeron una de las cúpulas de hormigón más grandes del mundo para proteger la piedra de la humedad que el lago Nasser traía al desierto. Después moldearon el paisaje hasta que fuera casi indistinguible del terreno original, roca a roca. Alguien caminando hacia Abu Simbel vería prácticamente lo mismo que vieron los súbditos de Ramsés hace más de treinta siglos.",
    },
    {
      text: "El 22 de septiembre de 1968, Abu Simbel abrió sus puertas en su nueva ubicación. Y los ingenieros habían logrado un último milagro. Dos veces al año, un rayo de sol penetra hasta el fondo del templo e ilumina las estatuas de los dioses — un truco de precisión que los constructores originales diseñaron hace 32 siglos. En la nueva ubicación, esa alineación solar se conservó con apenas un día de diferencia. Dicen que la fe mueve montañas. Aquí, cincuenta países lo demostraron con grúas.",
    },
    {
      text: "Pero lo más grande que Abu Simbel le dio al mundo no fueron los templos. Fue la prueba de que gente de todos los rincones del planeta podía dejar de lado sus diferencias para salvar algo que nos pertenece a todos. Ese esfuerzo llevó directamente a la Convención del Patrimonio Mundial de 1972, que hoy protege más de 1.100 lugares. Desde Machu Picchu hasta la Gran Muralla, cada sitio protegido existe porque cincuenta naciones demostraron que hay cosas por las que vale la pena mover montañas.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb: "À l'impossible nul n'est tenu" — subverted with
//          "sauf quand cinquante nations décident ensemble que si"
// ═══════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#unesco-rescue-moving-mountains",
  title: "Abu Simbel : Déplacer l'impossible",
  subtitle: "Quand 50 pays ont sauvé un temple vieux de 3 200 ans",
  excerpt:
    "En 1960, l'Égypte se retrouve face à un choix impossible. Le président Nasser construit le haut barrage d'Assouan — un projet colossal pour dompter les crues du Nil et alimenter le pays en énergie. Mais le barrage va créer le lac Nasser, l'un des plus grands lacs artificiels au monde, noyant 500 kilomètres de la vallée du Nil.",
  moralOrLesson:
    "Quand l'humanité s'unit au-delà de ses divisions pour protéger ce qui compte vraiment, même les montagnes se déplacent.",
  paragraphs: [
    {
      text: "En 1960, l'Égypte se retrouve face à un choix impossible. Le président Nasser construit le haut barrage d'Assouan — un projet colossal pour dompter les crues du Nil et alimenter le pays en énergie. Mais le barrage va créer le lac Nasser, l'un des plus grands lacs artificiels au monde, noyant 500 kilomètres de la vallée du Nil. Des dizaines de temples millénaires vont disparaître sous les eaux — dont Abu Simbel, deux temples que Ramsès II a fait tailler dans la falaise il y a plus de 3 200 ans.",
    },
    {
      text: "L'UNESCO tente alors quelque chose d'inédit : demander de l'aide au monde entier. Sauvez ces temples, ou ils disparaissent à jamais. Et le monde répond. Cinquante pays, y compris des rivaux de la Guerre froide incapables de s'entendre sur quoi que ce soit, envoient de l'argent, des ingénieurs et du matériel. La Suède, un pays sans aucun lien historique avec l'Égypte, devient l'un des plus gros contributeurs. La facture : environ 40 millions de dollars de l'époque — soit plus de 360 millions aujourd'hui.",
    },
    {
      text: "Et c'est là que ça devient complètement dingue. Abu Simbel, ce n'est pas un bâtiment qu'on peut démonter et transporter. Les temples sont sculptés à même la falaise de grès. Alors une entreprise suédoise, VBB, propose un plan de fou : découper l'ensemble en 1 036 blocs de 20 à 30 tonnes chacun, les monter de 65 mètres et les déplacer de 200 mètres vers l'intérieur des terres. Puis tout remonter sur une colline artificielle imitant parfaitement la falaise d'origine.",
    },
    {
      text: "Les travaux démarrent en 1964, alors que le lac avance déjà vers les temples. Les ouvriers dressent un barrage temporaire pour retenir l'eau et gagner du temps. Et voilà ce qui donne le vertige : pas question d'utiliser des outils électriques. Les vibrations auraient fissuré le grès millénaire. Chaque découpe est faite à la main, au millimètre près. Chaque bloc est numéroté, soulevé par grue et replacé exactement à sa place — le puzzle le plus risqué jamais assemblé.",
    },
    {
      text: "À l'intérieur de la nouvelle colline, les ingénieurs construisent l'un des plus grands dômes en béton au monde pour protéger la pierre de l'humidité que le lac Nasser apporte désormais au désert. Puis ils remodèlent le paysage alentour pour qu'il soit fidèle au terrain d'origine, mètre par mètre. Quelqu'un marchant vers Abu Simbel verrait quasiment la même chose que les sujets de Ramsès il y a plus de trente siècles.",
    },
    {
      text: "Le 22 septembre 1968, Abu Simbel rouvre au public sur son nouveau site. Et les ingénieurs ont réussi un dernier tour de force. Deux fois par an, un rayon de soleil pénètre jusqu'au fond du temple et illumine les statues des dieux — une prouesse d'alignement que les bâtisseurs avaient calculée il y a 32 siècles. Sur le nouveau site, cet alignement solaire a été préservé à un jour près. À l'impossible, nul n'est tenu — sauf quand cinquante nations décident ensemble que si.",
    },
    {
      text: "Mais le plus beau cadeau d'Abu Simbel au monde, ce ne sont pas les temples. C'est la preuve que des gens de partout sur la planète peuvent mettre leurs différences de côté pour sauver ce qui appartient à tous. Cet effort a mené droit à la Convention du patrimoine mondial de 1972, qui protège aujourd'hui plus de 1 100 sites. Du Machu Picchu à la Grande Muraille, chaque lieu protégé existe parce que cinquante nations ont prouvé que certaines choses valent qu'on déplace des montagnes.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb: "Der Glaube versetzt Berge" — subverted with
//          "Hier waren es fünfzig Nationen — und 1.036 Kräne."
// ═══════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#unesco-rescue-moving-mountains",
  title: "Als die Welt Berge versetzte",
  subtitle:
    "Wie 50 Länder einen 3.200 Jahre alten Tempel vor dem Untergang retteten",
  excerpt:
    "1960 stand Ägypten vor einer unmöglichen Entscheidung. Präsident Nasser ließ den Assuan-Staudamm bauen — ein gewaltiges Projekt, um die Nilfluten zu bändigen und das Land mit Energie zu versorgen. Aber der Damm würde den Nassersee schaffen, einen der größten Stauseen der Welt, und dabei 500 Kilometer Niltal überfluten.",
  moralOrLesson:
    "Wenn die Menschheit sich über alle Grenzen hinweg zusammentut, um zu schützen, was wirklich zählt, lassen sich selbst Berge versetzen.",
  paragraphs: [
    {
      text: "1960 stand Ägypten vor einer unmöglichen Entscheidung. Präsident Nasser ließ den Assuan-Staudamm bauen — ein gewaltiges Projekt, um die Nilfluten zu bändigen und das Land mit Energie zu versorgen. Aber der Damm würde den Nassersee schaffen, einen der größten Stauseen der Welt, und dabei 500 Kilometer Niltal überfluten. Dutzende jahrtausendealte Tempel würden für immer verschwinden — darunter Abu Simbel, zwei Felsentempel, die Ramses II. vor über 3.200 Jahren in eine Klippe meißeln ließ.",
    },
    {
      text: "Die UNESCO versuchte etwas, das es noch nie gegeben hatte: Sie bat die ganze Welt um Hilfe. Rettet diese Tempel — oder seht zu, wie sie für immer verschwinden. Und die Welt kam tatsächlich. Fünfzig Länder, darunter Rivalen des Kalten Krieges, die sich sonst auf nichts einigen konnten, schickten Geld, Ingenieure und Maschinen. Schweden, ein Land ohne jede Verbindung zu Ägypten, wurde einer der größten Geldgeber. Die Rechnung: rund 40 Millionen Dollar — heute über 360 Millionen.",
    },
    {
      text: "Und jetzt wird es richtig verrückt. Abu Simbel war kein Gebäude, das man einfach abtragen konnte. Die Tempel waren direkt in eine Sandsteinklippe gehauen. Also schlug die schwedische Firma VBB einen irrwitzigen Plan vor: den gesamten Komplex in 1.036 Blöcke von je 20 bis 30 Tonnen zersägen, alles 65 Meter nach oben und 200 Meter landeinwärts schaffen — und dann Block für Block auf einem künstlichen Hügel wieder zusammensetzen, der aussehen sollte wie die ursprüngliche Klippe.",
    },
    {
      text: "Die Arbeiten begannen 1964, während der See bereits auf die Tempel vorrückte. Die Arbeiter errichteten einen provisorischen Damm, um das Wasser aufzuhalten und sich gerade genug Zeit zu verschaffen. Und jetzt kommt der Teil, der einen sprachlos macht: Elektrowerkzeuge waren tabu. Die Vibrationen hätten den jahrtausendealten Sandstein zerstört. Jeder Schnitt wurde von Hand gesetzt, millimetergenau. Jeder Block nummeriert, per Kran gehoben und exakt an seinen Platz gesetzt — das riskanteste Puzzle aller Zeiten.",
    },
    {
      text: "Im Inneren des neuen Hügels errichteten die Ingenieure eine der größten Betonkuppeln der Welt, um den Stein vor der Feuchtigkeit zu schützen, die der Nassersee in die Wüste brachte. Danach formten sie die Landschaft ringsum so originalgetreu nach, Meter für Meter, dass der Unterschied kaum zu erkennen war. Wer heute auf Abu Simbel zugeht, sieht fast genau dasselbe, was die Untertanen von Ramses vor über dreißig Jahrhunderten sahen.",
    },
    {
      text: "Am 22. September 1968 wurde Abu Simbel an seinem neuen Standort wiedereröffnet. Den Ingenieuren war ein letztes Wunder gelungen. Zweimal im Jahr dringt ein Sonnenstrahl bis ins Allerheiligste des Tempels und beleuchtet die Götterstatuen — ein Präzisionskunststück, das die Erbauer vor 32 Jahrhunderten berechnet hatten. Am neuen Standort blieb diese Sonnenausrichtung bis auf einen einzigen Tag erhalten. Man sagt, der Glaube versetzt Berge. Hier waren es fünfzig Nationen — und 1.036 Kräne.",
    },
    {
      text: "Aber das Größte, was Abu Simbel der Welt geschenkt hat, sind nicht die Tempel. Es ist der Beweis, dass Menschen aus allen Ecken der Erde ihre Differenzen beiseitelegen können, um etwas zu retten, das uns allen gehört. Dieser Einsatz führte direkt zur UNESCO-Welterbekonvention von 1972, die heute über 1.100 Stätten schützt. Von Machu Picchu bis zur Großen Mauer — jeder geschützte Ort existiert, weil fünfzig Nationen bewiesen haben, dass manche Dinge es wert sind, Berge zu versetzen.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════
const items = [
  { lang: "es", item: es },
  { lang: "fr", item: fr },
  { lang: "de", item: de },
];

for (const { lang, item } of items) {
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${lang.toUpperCase()} pushed successfully — ${item.langStoryId}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(
        `⚠️  ${lang.toUpperCase()} already exists — ${item.langStoryId}. Skipping.`
      );
    } else {
      console.error(`❌ ${lang.toUpperCase()} FAILED:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\n🎉 All done. Verifying...\n");

// Quick verification scan
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
const verify = await docClient.send(
  new QueryCommand({
    TableName: TABLE,
    KeyConditionExpression:
      "siteId = :sid AND begins_with(langStoryId, :prefix)",
    ExpressionAttributeValues: {
      ":sid": "abu-simbel",
      ":prefix": "unesco-rescue",
    },
  })
);

// Show all language versions for this story
for (const rec of verify.Items ?? []) {
  const charCount = rec.paragraphs.reduce(
    (sum, p) => sum + (p.text?.length ?? 0),
    0
  );
  console.log(
    `  ${rec.lang.toUpperCase()} | "${rec.title}" | ${rec.paragraphs.length} paragraphs | ${charCount} chars`
  );
}
