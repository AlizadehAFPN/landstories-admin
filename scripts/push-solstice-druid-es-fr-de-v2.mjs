import { readFileSync, existsSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// ─── Load env ────────────────────────────────────────────
const envFile = existsSync('.env') ? '.env' : '.env.local';
const env = {};
for (const line of readFileSync(envFile, 'utf-8').split('\n')) {
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

// ─── Shared non-text fields ─────────────────────────────
const base = {
  siteId: 'stonehenge',
  storyId: 'solstice-druid-mysteries',
  icon: '\u2600\uFE0F',
  tier: 'A',
  source:
    'William Stukeley, "Stonehenge: A Temple Restor\'d to the British Druids" (1740); Gerald Hawkins, "Stonehenge Decoded" (1965); Andy Worthington, "Stonehenge: Celebration and Subversion" (2004); Christopher Chippindale, "Stonehenge Complete" (4th ed., 2012)',
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

// ═══════════════════════════════════════════════════════════════════
//  SPANISH — «Cinco mil a\u00f1os mirando al sol»
//  Proverb: \u00abA la tercera va la vencida\u00bb (subverted in P7)
//  Register: skilled modern storyteller, popular nonfiction / podcast
// ═══════════════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: 'es',
  langStoryId: 'es#solstice-druid-mysteries',
  era: 'Or\u00edgenes neol\u00edticos (ca. 3000 a.\u00a0C.) hasta el renacimiento moderno (siglo XVIII \u2013 actualidad)',
  characters: [
    'William Stukeley',
    'Gerald Hawkins',
    'La Antigua Orden de los Druidas',
    'Los viajeros alternativos de los a\u00f1os ochenta',
    'Los peregrinos modernos del solsticio',
  ],
  title: 'Cinco mil a\u00f1os mirando al sol',
  subtitle: 'Astronom\u00eda, druidas y peregrinaci\u00f3n en Stonehenge',
  excerpt:
    'Stonehenge no se coloc\u00f3 al azar. Su eje principal apunta exactamente a la salida del sol en pleno verano. Ese nivel de precisi\u00f3n no ocurre por casualidad.',
  moralOrLesson:
    'La alineaci\u00f3n de piedra y estrella habla de lo que m\u00e1s anhelamos: encontrar orden en el cosmos, marcar el paso del tiempo y reunirnos en los umbrales de luz y oscuridad para compartir el mismo asombro.',
  paragraphs: [
    {
      text: 'Stonehenge no se coloc\u00f3 al azar. Su eje principal apunta exactamente a la salida del sol en pleno verano y a la puesta en pleno invierno. Pl\u00e1ntate en el centro un 21 de junio \u2014 el d\u00eda m\u00e1s largo del a\u00f1o \u2014 y ver\u00e1s c\u00f3mo el sol aparece justo encima de una piedra enorme llamada Heel Stone, disparando sus primeros rayos dorados al coraz\u00f3n del monumento. Nadie consigue ese nivel de precisi\u00f3n por accidente. Alguien, hace cinco mil a\u00f1os, lo dise\u00f1\u00f3 as\u00ed a prop\u00f3sito.',
    },
    {
      text: 'En la d\u00e9cada de 1720, un m\u00e9dico ingl\u00e9s llamado William Stukeley le cambi\u00f3 la vida a Stonehenge para siempre. Fue el primero en medir y mapear el lugar con m\u00e9todo. Cuando descubri\u00f3 la alineaci\u00f3n con el solsticio, una obsesi\u00f3n se apoder\u00f3 de \u00e9l: aquello ten\u00eda que ser obra de los druidas, los sacerdotes que el general romano Julio C\u00e9sar hab\u00eda descrito como gu\u00edas espirituales de la antigua Britania celta. Stukeley se la crey\u00f3 tanto que acab\u00f3 autoproclam\u00e1ndose \u00abPr\u00edncipe de los Druidas\u00bb.',
    },
    {
      text: 'Pero resulta que Stukeley estaba equivocado. Los druidas vivieron miles de a\u00f1os despu\u00e9s de que Stonehenge se construyera. Da igual: su idea cobr\u00f3 vida propia. Para el siglo XIX, grupos que se hac\u00edan llamar druidas celebraban rituales al amanecer vestidos con t\u00fanicas blancas. A mediados del XX, el solsticio de verano ya era una peregrinaci\u00f3n en toda regla: paganos, m\u00edsticos y viajeros curiosos que simplemente quer\u00edan tocar algo antiguo y verdadero.',
    },
    {
      text: 'Y entonces la cosa se torci\u00f3. A principios de los ochenta, el Festival Libre de Stonehenge \u2014 m\u00fasica, vida alternativa \u2014 reun\u00eda a decenas de miles. Las autoridades lo prohibieron por miedo a da\u00f1ar las piedras. El 1 de junio de 1985, la polic\u00eda intercept\u00f3 a unos seiscientos viajeros de camino. Lo que sigui\u00f3 fue brutal: ventanillas reventadas, familias arrancadas de los autobuses, 537 detenidos \u2014 la mayor detenci\u00f3n masiva en Inglaterra desde la Segunda Guerra Mundial. Lo bautizaron la Batalla del Beanfield.',
    },
    {
      text: 'Tras a\u00f1os de negociaci\u00f3n, lleg\u00f3 el acuerdo. Desde el a\u00f1o 2000, Stonehenge abre su c\u00edrculo de piedras de forma gratuita en ambos solsticios. Cada verano, entre veinte mil y treinta y siete mil personas se re\u00fanen en la oscuridad \u2014 druidas de blanco, turistas con el m\u00f3vil en alto, familias con ni\u00f1os \u2014 y esperan juntos el amanecer. Cuando el sol asoma sobre la Heel Stone e inunda el c\u00edrculo de luz, estalla un rugido colectivo. Es el mismo amanecer que contemplaba la gente aqu\u00ed hace cinco mil a\u00f1os.',
    },
    {
      text: 'La alineaci\u00f3n tambi\u00e9n atrajo a la ciencia. En 1965, el astr\u00f3nomo Gerald Hawkins public\u00f3 Stonehenge Decoded y sostuvo que el monumento funcionaba como un ordenador prehist\u00f3rico capaz de predecir eclipses. Algunas de sus conclusiones no aguantaron el an\u00e1lisis, pero la idea de fondo se mantuvo: Stonehenge rastrea el sol y la luna con una precisi\u00f3n que deja sin palabras. Hasta el propio terreno ayuda \u2014 una cresta natural en la roca caliza apunta justo al amanecer del solsticio, como si la tierra ya hubiera marcado el punto.',
    },
    {
      text: 'Los druidas no construyeron Stonehenge. Eso ya est\u00e1 claro. Pero Stukeley acert\u00f3 en algo: este es un lugar donde siempre hemos buscado el cielo. Dicen que a la tercera va la vencida \u2014 pero aqu\u00ed no hay vencida que valga: llevamos cinco mil a\u00f1os volviendo al mismo c\u00edrculo, mirando el mismo sol, sintiendo el mismo impulso que empuj\u00f3 a alguien a arrastrar piedras desde 240 kil\u00f3metros y plantarlas en l\u00ednea perfecta con las estrellas.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  FRENCH — \u00abLe solstice des druides\u00bb
//  Proverb: \u00abChassez le naturel, il revient au galop\u00bb (P5 pivot)
//  Register: r\u00e9cit de vulgarisation historique, style France Inter
// ═══════════════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: 'fr',
  langStoryId: 'fr#solstice-druid-mysteries',
  era: "Origines n\u00e9olithiques (v.\u00a03000 av.\u00a0J.-C.) au renouveau moderne (XVIIIe si\u00e8cle \u2013 aujourd\u2019hui)",
  characters: [
    'William Stukeley',
    'Gerald Hawkins',
    "L\u2019Ancien Ordre des Druides",
    'Les voyageurs New Age des ann\u00e9es 1980',
    'Les c\u00e9l\u00e9brants modernes du solstice',
  ],
  title: 'Le solstice des druides',
  subtitle: "Astronomie, pr\u00eatrise antique et p\u00e8lerinage moderne au c\u0153ur de Stonehenge",
  excerpt:
    "Stonehenge n\u2019a rien d\u2019al\u00e9atoire. Son axe principal s\u2019aligne avec le lever du soleil au c\u0153ur de l\u2019\u00e9t\u00e9. Ce genre de pr\u00e9cision ne tombe pas du ciel.",
  moralOrLesson:
    "L\u2019alignement de la pierre et de l\u2019\u00e9toile parle de ce qui nous habite au plus profond\u00a0: trouver un ordre dans le cosmos, marquer le passage du temps et se rassembler aux fronti\u00e8res de la lumi\u00e8re et de l\u2019ombre dans un m\u00eame \u00e9merveillement.",
  paragraphs: [
    {
      text: "Stonehenge n\u2019a rien d\u2019al\u00e9atoire. Son axe principal s\u2019aligne parfaitement avec le lever du soleil au c\u0153ur de l\u2019\u00e9t\u00e9 et son coucher au c\u0153ur de l\u2019hiver. Placez-vous au centre le 21\u00a0juin \u2014 le jour le plus long de l\u2019ann\u00e9e \u2014 et vous verrez le soleil appara\u00eetre pile au-dessus d\u2019une pierre massive appel\u00e9e la Heel Stone, projetant ses premiers rayons dor\u00e9s droit au c\u0153ur du monument. Ce genre de pr\u00e9cision ne tombe pas du ciel. Il y a cinq mille ans, quelqu\u2019un a voulu exactement \u00e7a.",
    },
    {
      text: "Dans les ann\u00e9es 1720, un m\u00e9decin anglais du nom de William Stukeley transforme \u00e0 jamais le regard pos\u00e9 sur Stonehenge. C\u2019est lui qui, le premier, mesure et cartographie le site avec m\u00e9thode. En d\u00e9couvrant l\u2019alignement solsticial, une id\u00e9e l\u2019obs\u00e8de\u00a0: le monument ne peut \u00eatre que l\u2019\u0153uvre des druides, ces pr\u00eatres puissants que le g\u00e9n\u00e9ral romain Jules C\u00e9sar d\u00e9crivait comme les guides spirituels de la Bretagne celtique. Stukeley y croit tellement qu\u2019il finit par se proclamer \u00ab\u00a0Prince des Druides\u00a0\u00bb.",
    },
    {
      text: "Sauf que Stukeley se trompait. Les druides ont v\u00e9cu des milliers d\u2019ann\u00e9es apr\u00e8s la construction de Stonehenge. Mais son id\u00e9e a pris une vie propre. D\u00e8s le XIXe\u00a0si\u00e8cle, des groupes se r\u00e9clamant des druides c\u00e9l\u00e9braient des rituels \u00e0 l\u2019aube, drap\u00e9s de blanc. Au milieu du XXe, le solstice d\u2019\u00e9t\u00e9 \u00e9tait devenu un v\u00e9ritable p\u00e8lerinage \u2014 pa\u00efens, mystiques et simples curieux s\u2019y retrouvaient, tous en qu\u00eate d\u2019un lien avec quelque chose d\u2019ancien et d\u2019authentique.",
    },
    {
      text: "Et puis tout a d\u00e9rap\u00e9. Au d\u00e9but des ann\u00e9es quatre-vingt, le Stonehenge Free Festival \u2014 musique, vie alternative, libert\u00e9 \u2014 attirait des dizaines de milliers de personnes. Les autorit\u00e9s l\u2019ont interdit, inqui\u00e8tes pour les pierres. Le 1er\u00a0juin 1985, la police intercepte quelque six cents voyageurs en route. Ce qui suit est brutal\u00a0: vitres fracass\u00e9es, familles arrach\u00e9es des bus, 537\u00a0arrestations \u2014 la plus grande interpellation de masse en Angleterre depuis la Seconde Guerre mondiale. On l\u2019a appel\u00e9e la Bataille du Beanfield.",
    },
    {
      text: "Mais chassez le naturel, il revient au galop. Apr\u00e8s des ann\u00e9es de n\u00e9gociation, un compromis voit le jour. Depuis l\u2019an 2000, le cercle de pierres s\u2019ouvre gratuitement aux deux solstices. Chaque \u00e9t\u00e9, vingt mille \u00e0 trente-sept mille personnes se rassemblent dans le noir \u2014 druides en blanc, touristes smartphone en main, familles avec enfants. Quand le soleil franchit la Heel Stone et inonde le cercle de lumi\u00e8re, une clameur immense s\u2019\u00e9l\u00e8ve. Le m\u00eame lever de soleil qu\u2019ici, il y a cinq mille ans.",
    },
    {
      text: "L\u2019alignement a aussi s\u00e9duit la science. En 1965, l\u2019astronome Gerald Hawkins publie Stonehenge Decoded et avance que le monument fonctionnait comme un calculateur antique pour pr\u00e9dire les \u00e9clipses. Certaines th\u00e8ses n\u2019ont pas tenu, mais l\u2019essentiel est rest\u00e9\u00a0: Stonehenge suit la course du soleil et de la lune avec une pr\u00e9cision stup\u00e9fiante. Le terrain lui-m\u00eame y est pour quelque chose \u2014 une cr\u00eate naturelle dans la craie pointe droit vers le lever du solstice, comme si la terre avait d\u00e9j\u00e0 choisi l\u2019endroit.",
    },
    {
      text: "Les druides n\u2019ont pas b\u00e2ti Stonehenge. C\u2019est un fait \u00e9tabli. Mais Stukeley avait vu juste sur un point\u00a0: c\u2019est un lieu o\u00f9 les humains ont toujours cherch\u00e9 le ciel. Cinq mille ans plus tard, on est toujours l\u00e0 \u2014 debout dans le m\u00eame cercle, face au m\u00eame soleil, port\u00e9s par le m\u00eame \u00e9lan qui a pouss\u00e9 quelqu\u2019un \u00e0 tra\u00eener des pierres sur plus de deux cents kilom\u00e8tres et \u00e0 les dresser en ligne parfaite avec les \u00e9toiles.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  GERMAN — \u00abSteine, Sterne, Sonnenwende\u00bb
//  Proverb: \u00abAller guten Dinge sind drei\u00bb (subverted in P7)
//  Register: hochwertiger popul\u00e4rwissenschaftlicher Erz\u00e4hlton
// ═══════════════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: 'de',
  langStoryId: 'de#solstice-druid-mysteries',
  era: 'Neolithische Urspr\u00fcnge (ca. 3000 v.\u00a0Chr.) bis zur modernen Wiederbelebung (18.\u00a0Jh. \u2013 Gegenwart)',
  characters: [
    'William Stukeley',
    'Gerald Hawkins',
    'Der Alte Orden der Druiden',
    'Die New-Age-Reisenden der 1980er-Jahre',
    'Moderne Sonnenwende-Feiernde',
  ],
  title: 'Steine, Sterne, Sonnenwende',
  subtitle: 'Astronomie, Druidenkult und Pilgertum am Steinkreis von Stonehenge',
  excerpt:
    'Stonehenge steht nicht zuf\u00e4llig dort, wo es steht. Die Hauptachse zeigt exakt auf den Sonnenaufgang zur Sommersonnenwende. So eine Pr\u00e4zision ist kein Zufall.',
  moralOrLesson:
    'Die Ausrichtung von Stein und Stern spricht von der tiefsten menschlichen Sehnsucht: Ordnung im Kosmos zu finden, den Lauf der Zeit zu markieren und sich an den Schwellen von Licht und Dunkelheit in gemeinsamem Staunen zu versammeln.',
  paragraphs: [
    {
      text: 'Stonehenge steht nicht zuf\u00e4llig dort, wo es steht. Die Hauptachse des Monuments zeigt exakt auf den Sonnenaufgang zur Sommersonnenwende und den Sonnenuntergang zur Wintersonnenwende. Wer sich am 21.\u00a0Juni \u2014 dem l\u00e4ngsten Tag des Jahres \u2014 in die Mitte stellt, sieht die Sonne direkt \u00fcber einem gewaltigen Stein aufgehen, dem sogenannten Heel Stone. Die ersten goldenen Strahlen schie\u00dfen mitten durchs Herz der Anlage. So eine Pr\u00e4zision ist kein Zufall. Jemand hat das vor f\u00fcnftausend Jahren genau so gewollt.',
    },
    {
      text: 'In den 1720er-Jahren \u00e4nderte ein Mann namens William Stukeley den Blick der Welt auf Stonehenge f\u00fcr immer. Der englische Arzt und Geistliche war der Erste, der die Anlage systematisch verma\u00df und kartierte. Als er die Ausrichtung auf die Sonnenwende entdeckte, lie\u00df ihn eine Idee nicht mehr los: Das musste das Werk der Druiden sein \u2014 jener m\u00e4chtigen Priester, die der r\u00f6mische Feldherr Julius C\u00e4sar als geistige F\u00fchrer des keltischen Britannien beschrieben hatte. Stukeley war so \u00fcberzeugt, dass er sich selbst zum \u201EPrinz der Druiden\u201C ernannte.',
    },
    {
      text: 'Das Problem: Stukeley lag falsch. Die Druiden lebten Jahrtausende nach dem Bau von Stonehenge. Aber seine Idee entwickelte ein Eigenleben. Schon im 19.\u00a0Jahrhundert feierten Gruppen in wei\u00dfen Gew\u00e4ndern, die sich Druiden nannten, Zeremonien im Morgengrauen. Mitte des 20.\u00a0Jahrhunderts war die Sommersonnenwende zur regelrechten Pilgerfahrt geworden \u2014 Heiden, Mystiker und neugierige Reisende, alle auf der Suche nach einer Verbindung zu etwas Uraltem und Echtem.',
    },
    {
      text: 'Dann eskalierte es. Anfang der Achtziger zog das Stonehenge Free Festival \u2014 ein wildes Fest aus Musik und alternativem Lebensstil \u2014 Zehntausende an. Die Beh\u00f6rden verboten es, aus Sorge um die Steine. Am 1.\u00a0Juni 1985 stoppte die Polizei rund sechshundert Reisende auf dem Weg dorthin. Was folgte, war brutal: Beamte schlugen Scheiben ein, zerrten Familien aus Bussen und nahmen 537\u00a0Menschen fest \u2014 die gr\u00f6\u00dfte Massenfestnahme in England seit dem Zweiten Weltkrieg. Es ging als die Schlacht am Bohnenfeld in die Geschichte ein.',
    },
    {
      text: 'Nach jahrelangen Verhandlungen kam ein Kompromiss zustande. Seit dem Jahr 2000 \u00f6ffnet Stonehenge seinen Steinkreis zu beiden Sonnenwenden \u2014 kostenlos. Jeden Sommer versammeln sich zwanzigtausend bis siebenunddrei\u00dfigtausend Menschen in der Dunkelheit: Druiden in Wei\u00df, Touristen mit Smartphones, Familien mit kleinen Kindern. Gemeinsam warten sie auf die D\u00e4mmerung. Wenn die Sonne \u00fcber den Heel Stone steigt und den Kreis in Licht taucht, bricht Jubel aus. Derselbe Sonnenaufgang, den Menschen hier vor f\u00fcnftausend Jahren sahen.',
    },
    {
      text: 'Die Ausrichtung zog auch die Wissenschaft an. 1965 ver\u00f6ffentlichte der Astronom Gerald Hawkins Stonehenge Decoded und behauptete, das Monument habe als urzeitlicher Rechner zur Vorhersage von Finsternissen gedient. Nicht alle Thesen hielten stand, aber der Kern blieb: Stonehenge verfolgt die Bahnen von Sonne und Mond mit verbl\u00fcffender Genauigkeit. Selbst das Gel\u00e4nde spielte mit \u2014 ein nat\u00fcrlicher Grat im Kalkstein zeigt genau Richtung Sonnenaufgang zur Sonnenwende, als h\u00e4tte die Erde selbst die Stelle markiert.',
    },
    {
      text: 'Die Druiden haben Stonehenge nicht gebaut. So viel ist klar. Aber in einem Punkt hatte Stukeley recht: Dies ist ein Ort, an dem Menschen schon immer den Himmel gesucht haben. Man sagt, aller guten Dinge sind drei \u2014 aber hier sind es keine drei. Es sind f\u00fcnftausend Jahre, in denen wir zum selben Kreis zur\u00fcckkehren, dieselbe Sonne betrachten und denselben Drang sp\u00fcren, der einst jemanden antrieb, Steine \u00fcber 240\u00a0Kilometer zu schleppen und in perfekter Linie mit den Sternen aufzurichten.',
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
  console.log(`\n${'='.repeat(56)}`);
  console.log(`  Pushing ${label}  ->  ${data.langStoryId}`);
  console.log(`  Title: "${data.title}"`);
  console.log(`  Paragraphs: ${data.paragraphs.length}`);
  console.log(`${'='.repeat(56)}`);

  try {
    await docClient.send(
      new PutCommand({ TableName: TABLE, Item: data })
    );
    console.log(`  OK  ${label} pushed successfully.`);
  } catch (err) {
    console.error(`  FAIL  ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log('\n========================================================');
console.log('  All three languages pushed successfully!');
console.log(`  Timestamp: ${now}`);
console.log('========================================================\n');
