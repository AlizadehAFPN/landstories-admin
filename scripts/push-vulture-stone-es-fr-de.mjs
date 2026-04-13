import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TABLE_NAME = 'Story';
const TIMESTAMP = Math.floor(Date.now() / 1000).toString();

// Shared fields from the English original
const baseItem = {
  siteId: { S: 'gobeklitepe' },
  icon: { S: '🦅' },
  tier: { S: 'A' },
  source: { S: 'Sweatman & Tsikritsis, Mediterranean Archaeology and Archaeometry (2017); Schmidt, Klaus, Göbekli Tepe: A Stone Age Sanctuary' },
  era: { S: 'Pre-Pottery Neolithic (c. 10,950 BC)' },
  readingTimeMinutes: { N: '2' },
  image: { S: '' },
  updatedAt: { N: TIMESTAMP },
  disabled: { BOOL: false },
  thumbnail: { S: '' },
  coordinates: { M: { lng: { N: '38.92242' }, lat: { N: '37.22332' } } },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: 'riddles_past' },
  storyId: { S: 'vulture-stone' },
};

const makeParagraphs = (texts) => ({
  L: texts.map((t) => ({ M: { text: { S: t } } })),
});

// ═══════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb subversion: "No hay mal que cien años dure" → pero este duró diez veces más
// Register: modern Spanish storyteller, engaging podcast narrator
// ═══════════════════════════════════════════════════════════════

const es_paragraphs = [
  `Hace doce mil años, en lo que hoy es el sureste de Turquía, alguien dejó un mensaje tallado en piedra. No usó palabras — usó imágenes. Un buitre agarrando un disco redondo. Un cuerpo humano sin cabeza. Un escorpión. Símbolos que nadie ha sabido descifrar del todo. Esto es el Pilar 43 de Göbekli Tepe, y le llaman la Piedra del Buitre. Durante milenios, nadie entendió lo que decía. Ahora, puede que por fin lo sepamos.`,

  `Göbekli Tepe ya es, de por sí, uno de los lugares más alucinantes del planeta. Es un complejo de templos de piedra construido alrededor del 9600 a.C. — unos seis mil años antes que Stonehenge y siete mil antes que las pirámides de Egipto. Y lo levantaron cazadores-recolectores. Gente que, según todo lo que creíamos saber, no debería haber sido capaz de construir algo así. La Piedra del Buitre es la talla más enigmática de todo el conjunto.`,

  `Durante años, la mayoría de expertos pensó que los grabados representaban algún tipo de ritual funerario. Algunas culturas antiguas dejaban a sus muertos a la intemperie para que los buitres los devorasen — una práctica que todavía existe en partes del Tíbet, donde la llaman entierro celestial. El buitre, el cuerpo sin cabeza, los animales alrededor… todo encajaba. Una escena sobre la muerte y lo que viene después, tallada por gente que claramente pasaba mucho tiempo pensando en ello.`,

  `Entonces, en 2017, dos investigadores de la Universidad de Edimburgo le dieron la vuelta a todo. Martin Sweatman y Dimitrios Tsikritsis pasaron los grabados por modelos informáticos de posiciones estelares antiguas y descubrieron algo que te deja helado: cada animal de la piedra coincide con una constelación real. El buitre encaja con Sagitario. El escorpión, con Escorpio. ¿Y ese disco redondo que sujeta el buitre? Es el sol.`,

  `Junta todas las piezas y la Piedra del Buitre se convierte en una foto del cielo nocturno en un momento muy concreto: alrededor del 10.950 a.C. Y esa fecha no es cualquier cosa. Coincide con lo que los científicos llaman el impacto del Dryas Reciente, cuando un cometa o sus fragmentos probablemente chocaron contra la Tierra y desataron una ola de frío brutal que duró más de mil años. Dicen que no hay mal que cien años dure — pero este duró diez veces más.`,

  `Para un momento y piensa en lo que eso significa. Hace doce mil años, gente a la que siempre hemos llamado «primitiva» observaba las estrellas con suficiente precisión para rastrear un desastre cósmico — y luego lo grabó en piedra para que no se perdiera. No estaban solo sobreviviendo el día a día. Estaban observando, calculando, documentando. Querían asegurarse de que nadie olvidara lo que pasó.`,

  `¿Y esa figura sin cabeza en el centro? Puede que sea su forma de decir: esto mató gente. El pilar entero empieza a parecer menos una decoración y más una advertencia tallada en piedra por quienes lo vivieron en primera persona. Nos pasamos siglos creyendo que nuestros antepasados eran simples. La Piedra del Buitre dice lo contrario. A veces, el mensaje más antiguo de la sala es el que deberíamos haber estado leyendo desde el principio.`,
];

const esItem = {
  ...baseItem,
  lang: { S: 'es' },
  langStoryId: { S: 'es#vulture-stone' },
  title: { S: 'La Piedra del Buitre — ¿Un aviso cósmico?' },
  subtitle: { S: 'Una piedra de 12.000 años que podría registrar el impacto de un cometa' },
  moralOrLesson: { S: 'Seguimos subestimando a nuestros antepasados — quienes construyeron los primeros templos quizá entendían el universo mucho mejor de lo que jamás imaginamos.' },
  characters: {
    L: [
      { S: 'Astrónomos y sacerdotes del Neolítico' },
      { S: 'El Buitre (figura de constelación)' },
      { S: 'Investigadores de la Universidad de Edimburgo' },
      { S: 'Klaus Schmidt (excavador)' },
    ],
  },
  excerpt: { S: es_paragraphs[0] },
  paragraphs: makeParagraphs(es_paragraphs),
};

// ═══════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb subversion: "Il n'y a pire sourd que celui qui ne veut pas entendre"
//   → the Vulture Stone has been speaking for 12,000 years; we just weren't listening
// Register: modern French storyteller, high-quality podcast / popular nonfiction
// ═══════════════════════════════════════════════════════════════

const fr_paragraphs = [
  `Il y a douze mille ans, dans ce qui est aujourd'hui le sud-est de la Turquie, quelqu'un a gravé un message dans la pierre. Pas des mots — des images. Un vautour serrant un disque rond. Un corps humain sans tête. Un scorpion. Des symboles que personne n'a jamais réussi à déchiffrer complètement. C'est le Pilier 43 de Göbekli Tepe, surnommé la Pierre du Vautour. Pendant des millénaires, personne ne comprenait ce que ça voulait dire. Aujourd'hui, on commence à avoir une idée.`,

  `Göbekli Tepe, c'est déjà en soi l'un des endroits les plus hallucinants de la planète. Un immense complexe de temples en pierre bâti vers 9600 av. J.-C. — environ six mille ans avant Stonehenge et sept mille avant les pyramides d'Égypte. Et il a été construit par des chasseurs-cueilleurs. Des gens qui, d'après tout ce qu'on croyait savoir, n'auraient jamais dû être capables de construire un truc pareil. La Pierre du Vautour est la gravure la plus mystérieuse de tout le site.`,

  `Pendant des années, la plupart des spécialistes pensaient que les gravures représentaient un rituel funéraire. Certaines cultures anciennes laissaient leurs morts en plein air pour que les vautours s'en chargent — une pratique qu'on trouve encore au Tibet aujourd'hui, les funérailles célestes. Le vautour, le corps décapité, les animaux tout autour… tout semblait coller. Une scène sur la mort et ce qui vient après, gravée par des gens qui passaient visiblement beaucoup de temps à y réfléchir.`,

  `Et puis en 2017, deux chercheurs de l'Université d'Édimbourg ont tout remis en question. Martin Sweatman et Dimitrios Tsikritsis ont passé les gravures au crible de modèles informatiques reproduisant les positions des étoiles dans l'Antiquité. Et là, surprise : chaque animal sur la pierre correspond à une vraie constellation. Le vautour, c'est le Sagittaire. Le scorpion, c'est le Scorpion. Et ce disque rond que le vautour tient entre ses serres ? C'est le soleil.`,

  `Mettez tout bout à bout et la Pierre du Vautour devient une photo du ciel nocturne à un moment très précis : autour de 10 950 av. J.-C. Et cette date n'a rien d'anodin. Elle correspond à ce que les scientifiques appellent l'impact du Dryas récent, quand une comète ou ses débris se sont probablement écrasés sur Terre, déclenchant un épisode glaciaire brutal qui a duré plus de mille ans. Les températures se sont effondrées. Des écosystèmes entiers ont disparu.`,

  `Arrêtez-vous une seconde et mesurez ce que ça implique. Il y a douze mille ans, des gens qu'on a toujours qualifiés de « primitifs » observaient les étoiles avec assez de précision pour identifier un cataclysme cosmique — puis l'ont gravé dans la pierre pour en garder la trace. Ils ne faisaient pas que survivre au jour le jour. Ils observaient, calculaient, documentaient. Ils voulaient que personne n'oublie ce qui s'était passé.`,

  `Et cette silhouette sans tête au centre ? C'est peut-être leur façon de dire : ça a tué des gens. Le pilier tout entier ressemble moins à une décoration qu'à un avertissement gravé dans la roche par ceux qui ont vécu la catastrophe. On dit qu'il n'y a pire sourd que celui qui ne veut pas entendre. Pendant douze mille ans, la Pierre du Vautour nous a parlé. Il était temps qu'on écoute.`,
];

const frItem = {
  ...baseItem,
  lang: { S: 'fr' },
  langStoryId: { S: 'fr#vulture-stone' },
  title: { S: 'La Pierre du Vautour — Un message venu du cosmos ?' },
  subtitle: { S: `Une pierre vieille de 12 000 ans qui pourrait enregistrer l'impact d'une comète` },
  moralOrLesson: { S: `On sous-estime toujours nos ancêtres — ceux qui ont bâti les premiers temples comprenaient peut-être l'univers bien mieux qu'on ne l'a jamais imaginé.` },
  characters: {
    L: [
      { S: 'Astronomes et prêtres du Néolithique' },
      { S: 'Le Vautour (figure de constellation)' },
      { S: `Chercheurs de l'Université d'Édimbourg` },
      { S: 'Klaus Schmidt (archéologue)' },
    ],
  },
  excerpt: { S: fr_paragraphs[0] },
  paragraphs: makeParagraphs(fr_paragraphs),
};

// ═══════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb subversion: "Wer nicht hören will, muss fühlen"
//   → the builders of Göbekli Tepe felt the disaster, called out to us,
//     and for 12,000 years we didn't listen
// Register: modern German storyteller, engaging Wissen-podcast narrator
// ═══════════════════════════════════════════════════════════════

const de_paragraphs = [
  `Vor zwölftausend Jahren hat jemand im heutigen Südosten der Türkei eine Nachricht in Stein gehauen. Keine Wörter — Bilder. Ein Geier, der eine runde Scheibe umklammert. Ein kopfloser menschlicher Körper. Ein Skorpion. Seltsame Symbole, die bis heute niemand vollständig entschlüsselt hat. Das ist Pfeiler 43 in Göbekli Tepe, bekannt als der Geierstein. Jahrtausendelang hatte niemand eine Ahnung, was er bedeutet. Jetzt vielleicht schon.`,

  `Göbekli Tepe ist für sich genommen schon einer der atemberaubendsten Orte der Welt. Ein riesiger Tempelkomplex aus Stein, gebaut um 9600 v. Chr. — rund sechstausend Jahre vor Stonehenge und siebentausend vor den ägyptischen Pyramiden. Und gebaut von Jägern und Sammlern. Von Menschen, die nach allem, was wir zu wissen glaubten, so etwas eigentlich gar nicht hätten bauen können. Der Geierstein ist die rätselhafteste Gravur des gesamten Komplexes.`,

  `Jahrelang gingen die meisten Experten davon aus, dass die Schnitzereien ein Totenritual darstellten. Manche antiken Kulturen legten ihre Toten unter freiem Himmel aus — für die Geier. Ein Brauch, den es in Teilen Tibets heute noch gibt: die Himmelsbestattung. Der Geier, der kopflose Körper, die Tiere ringsum — alles schien zu passen. Eine Szene über den Tod und was danach kommt, eingeritzt von Menschen, die offenbar viel Zeit damit verbrachten, darüber nachzudenken.`,

  `Dann kamen 2017 zwei Forscher der Universität Edinburgh und stellten alles auf den Kopf. Martin Sweatman und Dimitrios Tsikritsis ließen die Gravuren durch Computermodelle antiker Sternenpositionen laufen — und machten eine Entdeckung, die einem den Atem nimmt: Jedes Tier auf dem Stein entspricht einem echten Sternbild. Der Geier passt zum Schützen. Der Skorpion zum Skorpion. Und diese runde Scheibe, die der Geier hält? Das ist die Sonne.`,

  `Setzt man alles zusammen, wird der Geierstein zu einem Schnappschuss des Nachthimmels an einem ganz bestimmten Zeitpunkt — um 10.950 v. Chr. Und dieses Datum hat es in sich. Es deckt sich mit dem sogenannten Jüngere-Dryas-Einschlag, als ein Komet oder seine Bruchstücke vermutlich auf die Erde krachten und eine brutale Kältephase auslösten, die über tausend Jahre dauerte. Temperaturen stürzten ab, ganze Ökosysteme brachen zusammen.`,

  `Haltet kurz inne und denkt darüber nach, was das bedeutet. Vor zwölftausend Jahren beobachteten Menschen, die wir immer als \u201Eprimitiv\u201C abgestempelt haben, die Sterne präzise genug, um eine kosmische Katastrophe zu dokumentieren — und meißelten das Ganze dann in Stein, damit es nicht verloren geht. Die haben nicht einfach nur von Tag zu Tag überlebt. Die haben beobachtet, gerechnet, festgehalten. Sie wollten sicherstellen, dass niemand vergisst, was passiert ist.`,

  `Und die kopflose Figur in der Mitte? Vielleicht ihre Art zu sagen: Das hier hat Menschen getötet. Der ganze Pfeiler sieht plötzlich weniger nach Dekoration aus und mehr nach einer Warnung — in Stein gehauen von denen, die es selbst erlebt haben. Man sagt: Wer nicht hören will, muss fühlen. Die Erbauer von Göbekli Tepe haben gefühlt — und uns zugerufen. Zwölftausend Jahre lang haben wir nicht zugehört.`,
];

const deItem = {
  ...baseItem,
  lang: { S: 'de' },
  langStoryId: { S: 'de#vulture-stone' },
  title: { S: 'Der Geierstein — Eine kosmische Botschaft?' },
  subtitle: { S: 'Ein 12.000 Jahre alter Stein, der einen Kometeneinschlag dokumentiert haben könnte' },
  moralOrLesson: { S: 'Wir unterschätzen unsere Vorfahren immer wieder — die Menschen, die die ersten Tempel bauten, verstanden das Universum vielleicht besser, als wir es uns je vorgestellt haben.' },
  characters: {
    L: [
      { S: 'Astronomen und Priester der Jungsteinzeit' },
      { S: 'Der Geier (Sternbildfigur)' },
      { S: 'Forscher der Universität Edinburgh' },
      { S: 'Klaus Schmidt (Ausgräber)' },
    ],
  },
  excerpt: { S: de_paragraphs[0] },
  paragraphs: makeParagraphs(de_paragraphs),
};

// ═══════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════

const items = [
  { lang: 'es', item: esItem },
  { lang: 'fr', item: frItem },
  { lang: 'de', item: deItem },
];

for (const { lang, item } of items) {
  try {
    // Validate paragraph count
    const pCount = item.paragraphs.L.length;
    if (pCount < 6 || pCount > 10) {
      throw new Error(`Paragraph count ${pCount} outside 6-10 range`);
    }

    // Validate each paragraph length
    for (let i = 0; i < pCount; i++) {
      const text = item.paragraphs.L[i].M.text.S;
      if (text.length > 600) {
        throw new Error(`Paragraph ${i + 1} is ${text.length} chars (max 500+20% = 600)`);
      }
      const wordCount = text.split(/\s+/).length;
      if (wordCount > 120) {
        throw new Error(`Paragraph ${i + 1} has ${wordCount} words (max 100+20% = 120)`);
      }
    }

    // Validate total character count
    const totalChars = item.paragraphs.L.reduce((sum, p) => sum + p.M.text.S.length, 0);
    if (totalChars > 4200) {
      throw new Error(`Total chars ${totalChars} exceeds 3000+40% limit`);
    }

    console.log(`[${lang}] Validation passed: ${pCount} paragraphs, ${totalChars} total chars`);

    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: item,
      ConditionExpression: 'attribute_not_exists(siteId)',
    });

    const result = await client.send(command);
    console.log(`[${lang}] ✅ Push successful (HTTP ${result.$metadata.httpStatusCode})`);
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      console.log(`[${lang}] ⚠️  Record already exists — overwriting...`);
      const overwrite = new PutItemCommand({
        TableName: TABLE_NAME,
        Item: item,
      });
      const result = await client.send(overwrite);
      console.log(`[${lang}] ✅ Overwrite successful (HTTP ${result.$metadata.httpStatusCode})`);
    } else {
      console.error(`[${lang}] ❌ FAILED:`, error.message);
      process.exit(1);
    }
  }
}

console.log('\n🎉 All three language versions pushed successfully.');
