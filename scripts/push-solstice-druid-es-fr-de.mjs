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
  siteId: 'stonehenge',
  storyId: 'solstice-druid-mysteries',
  icon: '\u2600\uFE0F',
  tier: 'A',
  source: 'William Stukeley, "Stonehenge: A Temple Restor\'d to the British Druids" (1740); Gerald Hawkins, "Stonehenge Decoded" (1965); Andy Worthington, "Stonehenge: Celebration and Subversion" (2004); Christopher Chippindale, "Stonehenge Complete" (4th ed., 2012)',
  characters: [
    'William Stukeley',
    'Gerald Hawkins',
    'The Ancient Order of Druids',
    'The New Age travelers of the 1980s',
    'Modern solstice celebrants',
  ],
  era: 'Neolithic origins (c. 3000 BC) to modern revival (18th century - present)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: -1.8262, lat: 51.1789 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «Las piedras que atraparon el sol»
//  Proverb: «A la tercera va la vencida»
//  Register: skilled modern storyteller, popular nonfiction
// ═══════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: 'es',
  langStoryId: 'es#solstice-druid-mysteries',
  title: 'Las piedras que atraparon el sol',
  subtitle: 'Astronomía, sacerdotes antiguos y peregrinaje moderno en Stonehenge',
  excerpt:
    'Stonehenge no está donde está por casualidad. Su eje principal se alinea con el amanecer del solsticio de verano y el atardecer del solsticio de invierno. Esa precisión no es casualidad.',
  moralOrLesson:
    'La alineación de piedra y estrella habla del anhelo más profundo del ser humano: encontrar orden en el cosmos, marcar el paso del tiempo y reunirse en los umbrales de la luz y la oscuridad para compartir el asombro.',
  paragraphs: [
    {
      text: 'Stonehenge no está donde está por casualidad. Su eje principal apunta exactamente al amanecer del solsticio de verano y al atardecer del solsticio de invierno. Si te colocas en el centro el día más largo del año —alrededor del 21 de junio— verás el sol aparecer justo sobre una piedra enorme llamada Heel Stone, lanzando sus primeros rayos al corazón del monumento. Esa precisión no se consigue por accidente. Alguien, hace cinco mil años, lo diseñó así a propósito.',
    },
    {
      text: 'En la década de 1720, un médico y clérigo inglés llamado William Stukeley cambió para siempre la forma en que el mundo miraba Stonehenge. Fue el primero que midió y cartografió el lugar con rigor. Cuando descubrió la alineación con el solsticio, una idea lo atrapó: aquello tenía que ser obra de los druidas, los sacerdotes que el general romano Julio César había descrito como líderes espirituales de la antigua Britania celta. Se lo creyó tanto que empezó a llamarse a sí mismo «Príncipe de los Druidas».',
    },
    {
      text: 'El problema es que Stukeley se equivocaba. Los druidas vivieron miles de años después de que Stonehenge se construyera. Pero su idea cobró vida propia. Para el siglo XIX, grupos que se llamaban druidas celebraban ceremonias al amanecer vestidos con túnicas blancas. A mediados del siglo XX, el solsticio de verano se había convertido en una peregrinación que atraía desde paganos y místicos hasta viajeros curiosos que simplemente querían tocar algo antiguo y verdadero.',
    },
    {
      text: 'Entonces la cosa se torció. A principios de los ochenta, el Festival Libre de Stonehenge —música, vida alternativa— reunía a decenas de miles. Las autoridades lo prohibieron por miedo a daños en las piedras. El 1 de junio de 1985, la policía interceptó a unos seiscientos viajeros de camino al lugar. Lo que siguió fue brutal: ventanillas rotas, familias sacadas a rastras de los autobuses, 537 detenidos. Fue la mayor detención masiva en Inglaterra desde la Segunda Guerra Mundial. Lo llamaron la Batalla del Beanfield.',
    },
    {
      text: 'Tras años de negociaciones, se alcanzó un acuerdo. Desde el año 2000, Stonehenge abre su círculo de piedra en ambos solsticios. Cada verano, entre veinte mil y treinta y siete mil personas se reúnen en la oscuridad —druidas con túnicas blancas, turistas con móviles, familias con niños— y esperan juntos el amanecer. Cuando el sol asoma sobre la Heel Stone e inunda el círculo de luz, estalla un rugido. A la tercera va la vencida: lo levantaron los constructores, lo reclamó Stukeley, y al final fuimos todos los que completamos el círculo.',
    },
    {
      text: 'La alineación también atrajo a la ciencia. En 1965, el astrónomo Gerald Hawkins publicó Stonehenge Decoded, donde sostenía que el monumento funcionaba como un ordenador prehistórico capaz de predecir eclipses de sol y de luna. Algunas conclusiones no resistieron el escrutinio, pero la idea central se mantuvo: Stonehenge rastrea el sol y la luna con una precisión asombrosa. Incluso el terreno ayudaba — una cresta natural en la roca caliza apunta justo al amanecer del solsticio, como si la tierra ya estuviera señalando el camino.',
    },
    {
      text: 'Los druidas no construyeron Stonehenge. Eso está claro. Pero Stukeley acertó en algo: este es un lugar donde la gente siempre ha mirado al cielo. Cinco mil años después, seguimos haciéndolo. De pie en el mismo círculo, contemplando el mismo sol, sintiendo el mismo impulso que llevó a alguien a arrastrar piedras desde más de doscientos kilómetros y colocarlas en línea perfecta con las estrellas.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Le rendez-vous de cinq mille ans»
//  Proverb: «Chassez le naturel, il revient au galop»
//  Register: récit de vulgarisation historique haut de gamme
// ═══════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: 'fr',
  langStoryId: 'fr#solstice-druid-mysteries',
  title: 'Le rendez-vous de cinq mille ans',
  subtitle: "Astronomie, druides et pèlerinage au cœur de Stonehenge",
  excerpt:
    "Stonehenge n'a pas été posé là au hasard. Son axe principal s'aligne avec le lever du soleil au solstice d'été et son coucher au solstice d'hiver. Ce genre de précision ne doit rien au hasard.",
  moralOrLesson:
    "L'alignement de la pierre et de l'étoile traduit l'aspiration la plus profonde de l'être humain : trouver un ordre dans le cosmos, marquer le passage du temps et se rassembler aux seuils de la lumière et de l'obscurité dans un émerveillement partagé.",
  paragraphs: [
    {
      text: "Stonehenge n'a pas été posé là au hasard. Son axe principal s'aligne exactement avec le lever du soleil au solstice d'été et le coucher au solstice d'hiver. Placez-vous au centre le jour le plus long de l'année — autour du 21 juin — et le soleil apparaît pile au-dessus d'une pierre massive appelée la Heel Stone, projetant ses premiers rayons dorés en plein cœur du monument. Ce genre de précision ne doit rien au hasard. Quelqu'un, il y a cinq mille ans, a voulu ça exactement comme ça.",
    },
    {
      text: "Dans les années 1720, un médecin et pasteur anglais nommé William Stukeley a changé à jamais le regard du monde sur Stonehenge. Il a été le premier à mesurer et cartographier le site avec méthode. Quand il a découvert l'alignement solsticial, une idée l'a obsédé : ce monument ne pouvait être que l'œuvre des druides, ces prêtres puissants que le général romain Jules César décrivait comme les chefs spirituels de l'ancienne Bretagne celtique. Stukeley y a tellement cru qu'il s'est proclamé lui-même « Prince des Druides ».",
    },
    {
      text: "Le problème, c'est que Stukeley avait tort. Les druides ont vécu des milliers d'années après la construction de Stonehenge. Mais son idée a pris une vie propre. Au XIXe siècle, des groupes se revendiquant druides tenaient des cérémonies à l'aube, en robes blanches. Au milieu du XXe siècle, le solstice d'été était devenu un véritable pèlerinage — païens, mystiques et simples voyageurs s'y retrouvaient pour toucher du doigt quelque chose d'ancien et d'authentique.",
    },
    {
      text: "Et puis tout a dérapé. Au début des années 1980, le Stonehenge Free Festival — un rassemblement sauvage mêlant musique et vie alternative — attirait des dizaines de milliers de personnes. Les autorités l'ont interdit par crainte de dégradations. Le 1er juin 1985, la police a intercepté environ six cents voyageurs en route vers le site. Ce qui a suivi fut violent : vitres brisées, familles arrachées de leurs bus, 537 arrestations — la plus grande arrestation de masse en Angleterre depuis la Seconde Guerre mondiale. On l'a appelée la Bataille du Beanfield.",
    },
    {
      text: "Mais chassez le naturel, il revient au galop — et à Stonehenge, le naturel, c'est le soleil. Après des années de négociations, un compromis a été trouvé. Depuis l'an 2000, le cercle de pierres s'ouvre gratuitement aux deux solstices. Chaque été, entre vingt mille et trente-sept mille personnes se rassemblent dans l'obscurité — druides en blanc, touristes smartphone en main, familles avec enfants — et attendent l'aube ensemble. Quand le soleil franchit la Heel Stone et inonde le cercle de lumière, une clameur immense s'élève.",
    },
    {
      text: "L'alignement a aussi attiré la science. En 1965, l'astronome Gerald Hawkins a publié Stonehenge Decoded, affirmant que le monument fonctionnait comme un ordinateur préhistorique capable de prédire les éclipses solaires et lunaires. Certaines conclusions n'ont pas tenu, mais l'idée centrale est restée : Stonehenge suit la course du soleil et de la lune avec une précision stupéfiante. Le paysage lui-même y contribuait — une crête naturelle dans la craie du sous-sol pointe vers le lever du solstice, comme si la terre avait déjà marqué l'endroit.",
    },
    {
      text: "Les druides n'ont pas bâti Stonehenge. La question est tranchée. Mais Stukeley avait raison sur un point : c'est un lieu où les humains ont toujours levé les yeux vers le ciel. Cinq mille ans plus tard, on continue — debout dans le même cercle, face au même soleil, portés par le même élan qui a poussé quelqu'un à traîner des pierres sur plus de deux cents kilomètres pour les aligner avec les étoiles.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Fünftausend Jahre Sonnenaufgang»
//  Proverb: «Aller guten Dinge sind drei»
//  Register: hochwertiger populärwissenschaftlicher Erzählton
// ═══════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: 'de',
  langStoryId: 'de#solstice-druid-mysteries',
  title: 'Fünftausend Jahre Sonnenaufgang',
  subtitle: 'Astronomie, Druiden und Pilgertum am Steinkreis von Stonehenge',
  excerpt:
    'Stonehenge steht nicht zufällig dort, wo es steht. Die Hauptachse zeigt exakt auf den Sonnenaufgang zur Sommersonnenwende und den Sonnenuntergang zur Wintersonnenwende. So eine Präzision passiert nicht zufällig.',
  moralOrLesson:
    'Die Ausrichtung von Stein und Stern spricht das tiefste menschliche Verlangen an: Ordnung im Kosmos zu finden, den Lauf der Zeit zu markieren und sich an den Schwellen von Licht und Dunkelheit gemeinsam dem Staunen hinzugeben.',
  paragraphs: [
    {
      text: 'Stonehenge steht nicht zufällig dort, wo es steht. Die Hauptachse des Monuments zeigt exakt auf den Sonnenaufgang zur Sommersonnenwende und den Sonnenuntergang zur Wintersonnenwende. Wer sich am längsten Tag des Jahres — um den 21. Juni — in die Mitte des Kreises stellt, sieht die Sonne direkt über einem gewaltigen Stein aufgehen, dem sogenannten Heel Stone. Die ersten Strahlen schießen mitten durch das Herz der Anlage. So eine Präzision passiert nicht zufällig. Jemand hat das vor fünftausend Jahren genau so geplant.',
    },
    {
      text: 'In den 1720er Jahren veränderte ein Mann namens William Stukeley den Blick der Welt auf Stonehenge für immer. Der englische Arzt und Geistliche war der Erste, der die Anlage sorgfältig vermaß und kartierte. Als er die Ausrichtung auf die Sonnenwende entdeckte, ließ ihn eine Idee nicht mehr los: Das musste das Werk der Druiden sein — jener mächtigen Priester, die der römische Feldherr Julius Caesar als geistliche Führer des keltischen Britannien beschrieben hatte. Stukeley glaubte so fest daran, dass er sich selbst zum \u201EPrinzen der Druiden\u201C ernannte.',
    },
    {
      text: 'Das Problem: Stukeley lag falsch. Die Druiden lebten Tausende von Jahren nach dem Bau von Stonehenge. Aber seine Idee entwickelte ein Eigenleben. Im 19. Jahrhundert hielten Gruppen, die sich Druiden nannten, Zeremonien bei Sonnenaufgang in weißen Gewändern ab. Mitte des 20. Jahrhunderts war die Sommersonnenwende zur regelrechten Wallfahrt geworden — Heiden, Mystiker und neugierige Reisende kamen, um etwas Uraltes und Echtes zu spüren.',
    },
    {
      text: 'Dann wurde es hässlich. Anfang der 1980er zog das Stonehenge Free Festival — ein wildes Fest aus Musik und alternativem Leben — Zehntausende an. Die Behörden verboten es aus Sorge um die Steine. Am 1. Juni 1985 stoppte die Polizei rund sechshundert Reisende auf dem Weg dorthin. Was folgte, war brutal: Beamte schlugen Scheiben ein, zerrten Familien aus Bussen und nahmen 537 Menschen fest — die größte Massenverhaftung in England seit dem Zweiten Weltkrieg. Man nannte es die Schlacht am Bohnenfeld.',
    },
    {
      text: 'Nach Jahren des Verhandelns fand sich ein Kompromiss. Seit dem Jahr 2000 öffnet Stonehenge seinen Steinkreis an beiden Sonnenwenden kostenlos. Jeden Sommer versammeln sich zwischen zwanzigtausend und siebenunddreißigtausend Menschen in der Dunkelheit — Druiden in Weiß, Touristen mit Handys, Familien mit Kindern — und warten gemeinsam auf die Dämmerung. Wenn die Sonne den Heel Stone übersteigt und den Kreis in Licht taucht, bricht Jubel aus. Aller guten Dinge sind drei, heißt es: Die Erbauer schufen den Kreis, Stukeley gab ihm einen Mythos, und am Ende waren es wir alle, die ihn schlossen.',
    },
    {
      text: 'Die Ausrichtung zog auch die Wissenschaft an. 1965 veröffentlichte der Astronom Gerald Hawkins Stonehenge Decoded und behauptete, das Monument habe als prähistorischer Computer funktioniert, mit dem sich Sonnen- und Mondfinsternisse vorhersagen ließen. Einige Thesen hielten der Überprüfung nicht stand, aber der Kern blieb: Stonehenge verfolgt den Lauf von Sonne und Mond mit verblüffender Genauigkeit. Selbst die Landschaft half — ein natürlicher Grat im Kalkstein weist auf den Sonnenaufgang zur Sonnenwende, als hätte die Erde den Punkt schon markiert.',
    },
    {
      text: 'Die Druiden haben Stonehenge nicht gebaut. Das ist geklärt. Aber Stukeley hatte in einem Punkt recht: Dies ist ein Ort, an dem Menschen schon immer zum Himmel aufgeblickt haben. Fünftausend Jahre später tun wir es noch — stehen im selben Kreis, schauen auf dieselbe Sonne und spüren denselben Drang, der jemanden dazu brachte, Steine über mehr als zweihundert Kilometer zu schleppen und in perfekter Linie mit den Sternen aufzustellen.',
    },
  ],
};

// ─── Push all three ──────────────────────────────────────
const stories = [
  { label: 'SPANISH', data: es },
  { label: 'FRENCH', data: fr },
  { label: 'GERMAN', data: de },
];

for (const { label, data } of stories) {
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`  Pushing ${label}  →  ${data.langStoryId}`);
  console.log(`${'═'.repeat(50)}`);

  try {
    await docClient.send(
      new PutCommand({ TableName: TABLE, Item: data })
    );
    console.log(`  ✅  ${label} pushed successfully.`);
  } catch (err) {
    console.error(`  ❌  ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log('\n══════════════════════════════════════════════════');
console.log('  All three languages pushed successfully!');
console.log('══════════════════════════════════════════════════\n');
