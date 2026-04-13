import { readFileSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// Load .env.local
const env = {};
for (const line of readFileSync('.env.local', 'utf-8').split('\n')) {
  const idx = line.indexOf('=');
  if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
}

const client = new DynamoDBClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = env.DYNAMO_TABLE_STORY || 'Story';
const now = Math.floor(Date.now() / 1000);

// ─── Non-text fields (from English original) ────────────
const base = {
  siteId: 'sigiriya',
  storyId: 'lion-gate-sky-fortress',
  icon: '\u{1F981}',
  tier: 'A',
  source: 'Bell, H.C.P. Report on the Sigiriya Excavations, Archaeological Survey of Ceylon Annual Reports 1896-1904; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; Mahavamsa, chapter 6 (Vijaya legend); Culavamsa, chapters 38-39; UNESCO World Heritage Nomination File 202; Paranavitana, Senarath. History of Ceylon, vol. 1, 1959',
  characters: [
    'King Kashyapa I (the builder)',
    'Prince Vijaya (legendary founder of the Sinhalese people, born from a lion)',
    'H.C.P. Bell (British archaeologist who excavated the lion paws in 1898)',
    'The unnamed engineers and laborers who built the fortress',
  ],
  era: '477-495 CE (construction); 1898 (Bell\u2019s excavation)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 80.7603, lat: 7.957 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'builders_wonders',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «La Boca del León»
//  Proverb: "No hay plazo que no se cumpla, ni deuda que no se pague"
//  (Every deadline arrives, every debt gets paid)
//  — subverted: Kashyapa knew the debt was coming, so he built
//    a wall the debt collector couldn't climb
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#lion-gate-sky-fortress',
  title: 'La Boca del León',
  subtitle: 'Un rey parricida esculpió un león colosal en un acantilado y obligó a cada visitante a cruzar sus fauces para llegar a su palacio en el cielo',
  excerpt: 'Para llegar al rey que gobernaba desde las nubes, primero tenías que entrar por la boca abierta de un león tan enorme que su cuerpo de ladrillo y estuco se alzaba veinte metros sobre la roca, y subir por una escalera a través de su garganta.',
  moralOrLesson: 'Los constructores de Sigiriya entendieron algo que la arquitectura moderna ha olvidado: que un edificio no es solo una estructura, sino una experiencia, una historia contada en piedra, espacio, miedo y asombro. La Puerta del León no era una puerta. Era una transformación: entrabas como mortal, subías por el cuerpo de una bestia y salías al reino de un dios.',
  paragraphs: [
    {
      text: 'Imagínate esto. Sri Lanka, siglo V. Estás subiendo un acantilado de granito que brota doscientos metros en vertical de la selva. A mitad del camino, la escalera se acaba. Lo único que queda delante es la boca abierta de un león tan descomunal que su cuerpo de ladrillo y estuco trepa treinta y cinco metros por la pared de roca. Eso no era decoración. Era la puerta de entrada. Y para llegar al palacio del rey, tenías que meterte por las fauces.',
    },
    {
      text: 'El rey que levantó ese león tenía las manos manchadas de sangre. Hacia el 477, Kashyapa le arrebató el trono de Sri Lanka a su propio padre y lo mató. Su medio hermano Moggallana \u2014el heredero legítimo\u2014 huyó al sur de la India a reunir un ejército. Dicen que no hay plazo que no se cumpla ni deuda que no se pague, y Kashyapa lo sabía. Así que abandonó la capital y llevó su corte a la cima de una roca en mitad de la selva llamada Sigiriya. Si no puedes borrar la deuda, levanta un muro que el cobrador no pueda escalar.',
    },
    {
      text: 'Pero el león no era solo ingeniería militar. Era un manifiesto político tallado en ladrillo. Los cingaleses se llaman a sí mismos \u00ABel pueblo del león\u00BB: su mito fundacional dice que el príncipe Vijaya, el primer poblador de la isla, era nieto de un león de verdad. \u00ABSinhala\u00BB significa literalmente \u00ABgente del león\u00BB. Cuando Kashyapa esculpió un león colosal en la roca, el mensaje era imposible de ignorar: yo soy el heredero legítimo de la sangre del león. Mi trono es el que cuenta.',
    },
    {
      text: 'La escala era de otro mundo. A juzgar por las garras que sobreviven y las cicatrices en la piedra, el león medía unos treinta y cinco metros de alto y veintiuno de ancho: ladrillo y estuco sobre un esqueleto de madera y hierro anclado al granito. Entre las garras \u2014cada una de varios metros, con dedos esculpidos uno a uno\u2014 arrancaba una escalera que se metía directa por la boca abierta. Subías por la garganta y salías en la cima. No pasabas al lado del león. Lo atravesabas.',
    },
    {
      text: 'El efecto era justo lo que Kashyapa buscaba. Cada embajador, cada general, cada persona que quisiera audiencia tenía que caminar hacia las fauces de un depredador. A nivel instintivo, eso activaba algo primitivo: el terror ancestral a ser devorado. Simbólicamente, eras engullido y renacías: entrabas como persona común y salías al palacio del cielo transformado. \u00BFY el mensaje político? Más simple todavía. Tú eres la presa. El rey es el depredador.',
    },
    {
      text: 'Pero el león era solo el espectáculo. Toda la roca era una máquina de guerra disfrazada de paraíso. Un foso \u2014según se cuenta, lleno de cocodrilos\u2014 rodeaba jardines acuáticos donde los estanques elegantes servían de reservas de agua y los prados abiertos se convertían en campos de tiro. El único camino hacia arriba estaba tallado en la roca, lo bastante estrecho para que solo cupieran dos personas. Cada detalle servía a dos amos: la belleza y la supervivencia.',
    },
    {
      text: 'En 1898, el arqueólogo británico H.C.P. Bell excavó entre siglos de escombros en la terraza del león y encontró dos zarpas enormes: ladrillo sobre piedra tallada, con un detalle tal que se distinguían las garras retraídas. Más arriba, la roca aún mostraba las cicatrices: agujeros de anclaje, restos de estuco descolorido, el fantasma de algo imposiblemente grande. El cuerpo había desaparecido: la madera podrida, el estuco deshecho, el ladrillo vencido por quince siglos de tormentas tropicales.',
    },
    {
      text: 'Hoy, una escalera metálica atornillada al acantilado ocupa el lugar donde estuvo el cuerpo del león. Los turistas se agarran a la barandilla contra el viento, con la selva allá abajo. Pero las garras siguen ahí: dos zarpas enormes y pacientes apoyadas en la terraza, como si el león se hubiera tumbado a dormir y el resto de su cuerpo estuviera escondido dentro de la piedra. Mil quinientos años después, sigues sin poder llegar arriba sin pasar entre ellas. Kashyapa construyó una puerta que sobrevivió a su propio reino.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «La Gueule du Lion»
//  Proverb: "Tout vient à point à qui sait attendre"
//  (Everything comes to those who wait)
//  — subverted: Moggallana proved the proverb right;
//    Kashyapa, who refused to wait, built walls instead
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#lion-gate-sky-fortress',
  title: 'La Gueule du Lion',
  subtitle: `Un roi parricide a bâti un lion colossal à flanc de falaise \u2014 et chaque visiteur devait traverser sa gueule pour atteindre son palais dans les nuages`,
  excerpt: `Pour atteindre le roi qui régnait depuis le ciel, il fallait d\u2019abord s\u2019avancer dans la gueule béante d\u2019un lion si colossal que son corps de brique et de stuc s\u2019élevait à vingt mètres au-dessus de la roche \u2014 et grimper un escalier à travers sa gorge.`,
  moralOrLesson: `Les bâtisseurs de Sigiriya avaient compris quelque chose que l\u2019architecture moderne a largement oublié : qu\u2019un bâtiment n\u2019est pas seulement une structure, mais une expérience \u2014 une histoire racontée en pierre, en espace, en peur et en émerveillement. La Porte du Lion n\u2019était pas une porte. C\u2019était une transformation : on entrait en mortel, on grimpait à travers le corps d\u2019une bête, et on émergeait dans le royaume d\u2019un dieu.`,
  paragraphs: [
    {
      text: `Imagine la scène. Sri Lanka, cinquième siècle. Tu grimpes une falaise de granit qui s\u2019élève à deux cents mètres au-dessus de la jungle, verticale comme un mur. À mi-chemin, l\u2019escalier s\u2019arrête net \u2014 et la seule issue, c\u2019est la gueule ouverte d\u2019un lion si colossal que son corps de brique et de stuc escalade la paroi sur trente-cinq mètres. Ce lion n\u2019était pas là pour faire joli. C\u2019était la porte d\u2019entrée. Et pour atteindre le palais du roi, il fallait y entrer par les crocs.`,
    },
    {
      text: `Le roi derrière ce lion avait du sang sur les mains. Vers 477, Kashyapa s\u2019est emparé du trône de Sri Lanka en tuant son propre père. Son demi-frère Moggallana \u2014 l\u2019héritier légitime \u2014 a fui vers le sud de l\u2019Inde pour lever une armée. On dit que tout vient à point à qui sait attendre. Moggallana allait donner raison au proverbe. Kashyapa, lui, n\u2019a pas attendu : il a abandonné la capitale et installé toute sa cour au sommet d\u2019un pic de granit perdu dans la jungle, Sigiriya. Quand la loyauté se refuse, on bâtit des murs.`,
    },
    {
      text: `Mais ce lion n\u2019était pas qu\u2019une prouesse militaire \u2014 c\u2019était un manifeste politique en brique. Les Cinghalais se disent \u00AB peuple du lion \u00BB : leur mythe fondateur raconte que le prince Vijaya, premier habitant de l\u2019île, était le petit-fils d\u2019un vrai lion. \u00AB Sinhala \u00BB signifie littéralement \u00AB les gens du lion \u00BB. Quand Kashyapa a sculpté un fauve colossal dans la falaise, le message était limpide : je suis le véritable héritier du sang du lion. Mon trône est légitime.`,
    },
    {
      text: `Les proportions étaient vertigineuses. D\u2019après les pattes encore visibles et les cicatrices dans la roche, le lion mesurait environ trente-cinq mètres de haut sur vingt et un de large : brique et stuc plaqués sur une ossature de bois et de fer boulonnée au granit. Entre les pattes \u2014 chacune haute de plusieurs mètres, griffes sculptées une par une \u2014 un escalier plongeait droit dans la gueule ouverte. On montait par la gorge et on ressortait au sommet. On ne passait pas devant le lion. On le traversait.`,
    },
    {
      text: `L\u2019effet était exactement celui que Kashyapa recherchait. Chaque ambassadeur, chaque général, chaque personne demandant audience devait marcher vers la gueule d\u2019un prédateur. Au niveau instinctif, ça réveillait quelque chose de primitif : cette peur viscérale d\u2019être dévoré. Symboliquement, tu étais englouti puis tu renaissais : tu entrais en simple mortel et tu émergeais dans un palais céleste, transformé. Le message politique ? Plus simple encore. Tu es la proie. Le roi est le prédateur.`,
    },
    {
      text: `Le lion n\u2019était que la vitrine. Toute la roche était une machine de guerre déguisée en paradis. Des douves \u2014 peuplées de crocodiles, dit-on \u2014 cernaient des jardins aquatiques où les bassins servaient de réservoirs et les pelouses devenaient des champs de tir. Le seul chemin vers le haut était taillé à même la falaise, assez large pour deux personnes seulement. Chaque détail servait deux maîtres : la beauté et la survie.`,
    },
    {
      text: `En 1898, l\u2019archéologue britannique H.C.P. Bell a fouillé des siècles de décombres sur la terrasse du lion et mis au jour deux pattes massives \u2014 brique sur pierre sculptée, si détaillées qu\u2019on distinguait encore les griffes rétractiles. Au-dessus, la roche portait encore les traces : trous d\u2019ancrage, restes de stuc délavé, le fantôme de quelque chose d\u2019invraisemblablement grand. Le corps avait disparu \u2014 le bois pourri, le stuc effondré, la brique usée par quinze siècles de tempêtes tropicales.`,
    },
    {
      text: `Aujourd\u2019hui, un escalier métallique boulonné à la falaise remplace le corps du lion. Les touristes s\u2019accrochent aux rampes face au vent, la jungle en contrebas à perte de vue. Mais les pattes sont toujours là : deux pattes félines massives et patientes, posées sur la terrasse comme si le lion s\u2019était simplement couché et que le reste de son corps se cachait dans la pierre. Quinze siècles plus tard, impossible d\u2019atteindre le sommet sans passer entre elles. Kashyapa a construit une porte qui a survécu à son royaume.`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Das Löwentor»
//  Proverb: "Gottes Mühlen mahlen langsam, aber fein"
//  (God's mills grind slowly, but finely)
//  — subverted: Kashyapa knew divine justice was coming,
//    so he tried to outrun it with architecture
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#lion-gate-sky-fortress',
  title: 'Das Löwentor',
  subtitle: 'Ein Vatermörder baute einen kolossalen Löwen an eine Felswand \u2014 und zwang jeden Besucher, durch sein Maul zu gehen, um den Himmelspalast darüber zu erreichen',
  excerpt: 'Um den König zu erreichen, der über den Wolken herrschte, musste man erst in das aufgerissene Maul eines Löwen treten, der so gewaltig war, dass sein Körper aus Ziegel und Stuck zwanzig Meter über die Felswand aufragte \u2014 und eine Treppe durch seinen Schlund hinaufsteigen.',
  moralOrLesson: 'Die Erbauer von Sigiriya verstanden etwas, das die moderne Architektur weitgehend vergessen hat \u2014 dass ein Gebäude nicht nur ein Bauwerk ist, sondern ein Erlebnis, eine Geschichte, erzählt in Stein und Raum und Furcht und Staunen. Das Löwentor war kein Tor. Es war eine Verwandlung: Man betrat es als Sterblicher, stieg durch den Körper einer Bestie und trat heraus ins Reich eines Gottes.',
  paragraphs: [
    {
      text: 'Stell dir das vor. Sri Lanka, fünftes Jahrhundert. Du kletterst eine Granitwand hinauf, die zweihundert Meter senkrecht aus dem Dschungel schießt. Auf halber Höhe endet die Treppe \u2014 und der einzige Weg nach oben führt durch das aufgerissene Maul eines Löwen, so gewaltig, dass sein Körper aus Ziegel und Stuck fünfunddreißig Meter die Felswand hinaufklettert. Das war keine Verzierung. Das war die Eingangstür. Und um zum König zu gelangen, musstest du hindurch.',
    },
    {
      text: 'Der König hinter diesem Löwen hatte Blut an den Händen. Um 477 riss Kashyapa den Thron an sich, indem er seinen eigenen Vater ermordete. Sein Halbbruder Moggallana \u2014 der rechtmäßige Erbe \u2014 floh nach Südindien und stellte eine Armee auf. Gottes Mühlen mahlen langsam, sagt man, aber fein \u2014 und Kashyapa wusste das genau. Also verlegte er seinen gesamten Hof auf die Spitze eines Granitfelsens im Dschungel: Sigiriya. Wer keine Treue gewinnen kann, baut eine Festung, die niemand erklimmen kann.',
    },
    {
      text: 'Aber der Löwe war nicht nur Militärtechnik \u2014 er war ein politisches Manifest aus Ziegel. Die Singhalesen nennen sich selbst \u201EVolk des Löwen\u201C: Ihr Gründungsmythos erzählt, dass Prinz Vijaya, der erste Siedler der Insel, der Enkel eines echten Löwen war. \u201ESinhala\u201C bedeutet wörtlich \u201ELöwenvolk\u201C. Als Kashyapa einen kolossalen Löwen in den Felsen meißelte, war die Botschaft unmissverständlich: Ich bin der wahre Erbe des Löwenbluts. Mein Thron ist legitim.',
    },
    {
      text: 'Das Ausmaß war atemberaubend. Den erhaltenen Pranken und den Narben im Fels nach zu urteilen, war der Löwe etwa fünfunddreißig Meter hoch und einundzwanzig Meter breit \u2014 Ziegel und Stuck über einem Skelett aus Holz und Eisen, in den Granit verbolzt. Zwischen den Pranken \u2014 jede mehrere Meter hoch, mit einzeln herausgearbeiteten Zehen \u2014 führte eine Treppe direkt ins aufgerissene Maul. Man stieg durch den Schlund und kam am Gipfel heraus. Man ging nicht am Löwen vorbei. Man ging durch ihn hindurch.',
    },
    {
      text: 'Die Wirkung war genau die, die Kashyapa wollte. Jeder Gesandte, jeder General, jeder, der eine Audienz suchte, musste in das Maul eines Raubtiers hineinlaufen. Auf einer tiefen, ursprünglichen Ebene löste das etwas Archaisches aus: die Urangst, verschlungen zu werden. Symbolisch wurde man gefressen und wiedergeboren \u2014 man betrat den Löwen als gewöhnlicher Mensch und stieg als Verwandelter in einen Himmelspalast empor. Die politische Botschaft? Denkbar einfach. Du bist die Beute. Der König ist das Raubtier.',
    },
    {
      text: 'Der Löwe war nur die Fassade. Der ganze Fels war eine Kriegsmaschine im Gewand eines Paradieses. Ein Graben \u2014 angeblich voller Krokodile \u2014 umgab Wassergärten, in denen elegante Becken als Reservoire dienten und offene Rasenflächen zu Schussfeldern wurden. Der einzige Weg nach oben war in die Felswand gehauen, gerade breit genug für zwei Personen. Jedes Detail diente zwei Herren: der Schönheit und dem Überleben.',
    },
    {
      text: '1898 grub der britische Archäologe H.C.P. Bell sich durch Jahrhunderte von Schutt auf der Löwenterrasse und stieß auf zwei massive Pranken \u2014 Ziegel auf behauenem Stein, so detailliert, dass man die eingezogenen Krallen erkennen konnte. Darüber trug der Fels noch die Spuren: Ankerlöcher, verblasster Stuck, das Phantom von etwas unfassbar Großem. Der Körper war verschwunden \u2014 das Holz verrottet, der Stuck zerfallen, das Mauerwerk zermürbt von fünfzehn Jahrhunderten tropischer Stürme.',
    },
    {
      text: 'Heute führt eine Metalltreppe, in den Fels geschraubt, dort entlang, wo einst der Löwenkörper stand. Touristen klammern sich an die Geländer gegen den Wind, den Dschungel weit unter sich. Aber die Pranken sind noch da: zwei massive, geduldige Katzenpranken auf der Terrasse, als hätte der Löwe sich nur hingelegt und der Rest seines Körpers stecke im Felsen. Fünfzehnhundert Jahre später führt noch immer kein Weg an ihnen vorbei. Kashyapa baute ein Tor, das sein Königreich überdauerte.',
    },
  ],
};

// ─── Validation ──────────────────────────────────────────
function validate(story) {
  const label = story.lang.toUpperCase();
  let totalChars = 0;
  const pCount = story.paragraphs.length;

  if (pCount < 6 || pCount > 10) {
    throw new Error(`[${label}] Paragraph count ${pCount} out of range (6-10)`);
  }

  for (let i = 0; i < pCount; i++) {
    const text = story.paragraphs[i].text;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    totalChars += chars;

    if (chars > 600) {
      throw new Error(`[${label}] P${i + 1}: ${chars} chars exceeds 600 (500 + 20%)`);
    }
    if (words > 120) {
      throw new Error(`[${label}] P${i + 1}: ${words} words exceeds 120 (100 + 20%)`);
    }
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  }

  console.log(`  Total: ${totalChars} chars (target: 2400-3600)`);
  if (totalChars < 2000 || totalChars > 4200) {
    throw new Error(`[${label}] Total ${totalChars} chars outside acceptable range`);
  }
  console.log(`  [${label}] Validation passed.\n`);
}

// ─── Push ────────────────────────────────────────────────
async function pushStory(story) {
  const item = { ...base, ...story };
  const label = story.lang.toUpperCase();

  console.log(`Pushing ${label} to DynamoDB...`);
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression: 'attribute_not_exists(siteId) OR lang <> :en',
      ExpressionAttributeValues: { ':en': 'en' },
    })
  );
  console.log(`\u2713 ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
}

async function main() {
  const stories = [es, fr, de];

  console.log('=== Validating all stories ===\n');
  for (const story of stories) {
    console.log(`--- ${story.lang.toUpperCase()} ---`);
    validate(story);
  }

  console.log('=== Pushing to DynamoDB ===\n');
  for (const story of stories) {
    await pushStory(story);
  }

  console.log('=== Lion Gate (ES, FR, DE) — all pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
