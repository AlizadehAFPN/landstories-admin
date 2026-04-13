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
  siteId: 'persepolis',
  storyId: 'twenty-three-nations',
  icon: '\u{1F3DB}\uFE0F',
  tier: 'A',
  source: 'Schmidt, Erich F., Persepolis I: Structures, Reliefs, Inscriptions (1953); Root, Margaret Cool, The King and Kingship in Achaemenid Art (1979); Briant, Pierre, From Cyrus to Alexander (2002); Garrison, Mark and Root, Margaret Cool, Seals on the Persepolis Fortification Tablets (2001\u2013); Kuhrt, Am\u00e9lie, The Persian Empire: A Corpus of Sources (2007)',
  era: '515\u2013465 BCE (construction); 1931\u20131939 (excavation)',
  readingTimeMinutes: 4,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lat: 29.9342, lng: 52.8914 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'riddles_past',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «Nadie se arrodilló»
//
//  Proverb: «La unión hace la fuerza»
//  (Unity makes strength)
//  — subverted: It was the conqueror, not the conquered,
//    who understood this 25 centuries before it became
//    anyone's motto — and buried the proof in the
//    foundations.
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#twenty-three-nations',
  title: 'Nadie se arrodilló',
  subtitle: `El mayor imperio del mundo antiguo talló en piedra una idea impensable: pueblos conquistados caminando con dignidad ante su rey`,
  excerpt: `Tallado en la escalera del mayor salón de audiencias del mundo antiguo, un desfile eterno de veintitrés pueblos — cada uno con su ropa, sus ofrendas y su dignidad intacta. La declaración política más radical que la Antigüedad dejó grabada en piedra.`,
  moralOrLesson: `El verdadero poder no se demuestra aplastando a los que están debajo, sino permitiéndoles estar de pie en tu presencia — los relieves de la Apadana son el argumento más hermoso de la historia: la grandeza de un imperio no se mide por la uniformidad que impone, sino por la diversidad que sostiene.`,
  characters: [
    'Darío I (el Gran Rey)',
    'Jerjes I (quien completó la Apadana)',
    'Las 23 naciones sometidas',
    'Artesanos griegos y egipcios',
    'Ernst Herzfeld (arqueólogo)',
  ],
  paragraphs: [
    {
      text: `En el sur de Irán, entre las ruinas de lo que fue la capital ceremonial más impresionante del mundo antiguo, hay una escalera tallada en piedra que cambió para siempre lo que entendemos por poder. Se llama Persépolis. Y en esa escalera, veintitrés pueblos del mayor imperio que había conocido la humanidad caminan en procesión hacia su rey. Cada uno con su ropa. Cada uno con su regalo. Cada uno con su identidad intacta. Nadie de rodillas. Nadie encadenado. En el mundo antiguo, eso era impensable.`,
    },
    {
      text: `Los detalles quitan el aliento. Elamitas del suroeste de Irán cargan una leona con dos cachorros — se le marcan los músculos bajo la piel. Armenios llevan un caballo tallado con tal precisión que puedes ver las borlas de su brida. Babilonios traen telas con cada fleco cincelado uno a uno en la roca, y un toro con joroba. Lidios — del reino de Creso, donde los ríos arrastraban oro — ofrecen brazaletes de oro y un carro en miniatura. Etíopes cargan colmillos de elefante. Cada pueblo se ve exactamente como es. No se borró ni una diferencia.`,
    },
    {
      text: `Para entender lo que significa esto, hay que saber qué había antes. Los asirios — la superpotencia de Oriente Medio durante siglos — decoraban sus palacios con escenas de enemigos empalados, decapitados, desollados vivos. Así demostraban poder los imperios: con terror puro. En todos los relieves de Persépolis no hay un solo acto de violencia contra una persona. Ni uno. Cada extranjero camina erguido, con regalos en vez de cadenas. Los persas conocieron la brutalidad asiria de cerca. Y eligieron exactamente lo contrario.`,
    },
    {
      text: `Y los persas no solo tallaron la idea — la construyeron. Darío el Grande enterró tablillas de oro y plata bajo los cimientos del edificio, y en ellas dejó escrito quién lo había levantado: los canteros eran griegos y lidios, los orfebres eran medos y egipcios, los albañiles eran babilonios. El edificio más grande del imperio lo hicieron manos de todos sus rincones. Dicen que la unión hace la fuerza. Darío lo entendió veinticinco siglos antes de que nadie lo convirtiera en eslogan — y lo dejó grabado en los cimientos.`,
    },
    {
      text: `En el centro del relieve está sentado el Rey de Reyes — casi seguro Darío I — con una flor de loto y un cetro en las manos. Detrás de él, su hijo Jerjes está de pie a la misma altura: una promesa de que la dinastía continuará. Pero la imagen más misteriosa está en la escalera de enfrente: un león clavando los colmillos en un toro. Los expertos creen que es un mapa del cielo — Leo devorando a Tauro en el momento exacto del equinoccio de primavera. Es el Nowruz, el Año Nuevo persa. Toda la procesión es un calendario tallado en piedra.`,
    },
    {
      text: `¿Y todo esto era real? Los historiadores llevan décadas discutiendo. Los «regalos» eran impuestos. La «participación voluntaria» la respaldaba un ejército. Las sonrisas eran propaganda. Pero hasta los más escépticos admiten que los persas eran diferentes de verdad. Ciro el Grande, el fundador del imperio, promulgó un decreto que permitía a los pueblos vencidos conservar sus dioses y costumbres — uno de los primeros actos de tolerancia religiosa de la historia. El arte exagera, claro. Pero exagera algo que existía de verdad.`,
    },
    {
      text: `Cuando Alejandro Magno incendió Persépolis en el 330 a. C. — probablemente borracho, sin duda mandando un mensaje — los escombros enterraron la escalera oriental y, sin querer, la salvaron. Trece de las setenta y dos columnas originales siguen en pie hoy. Y cada primavera, trescientos millones de personas celebran el Nowruz — un ritual que fue tallado en esta escalera hace dos mil quinientos años. La procesión sigue caminando. No ha llegado. No llegará nunca. Esa es la idea.`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Aucun genou à terre»
//
//  Proverb: «Diviser pour mieux régner»
//  (Divide and conquer)
//  — subverted: The entire Apadana staircase is a
//    2,500-year-old demolition of France's most famous
//    political maxim. Darius did the inverse — and his
//    staircase is still standing.
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#twenty-three-nations',
  title: 'Aucun genou à terre',
  subtitle: `Le plus grand empire du monde antique a gravé dans la pierre une idée impensable : des peuples conquis marchant tête haute devant leur roi`,
  excerpt: `Gravé sur l'escalier de la plus grande salle d'audience du monde antique, un cortège de vingt-trois peuples défile pour l'éternité — chacun dans ses habits, portant ses offrandes, la dignité intacte. La déclaration politique la plus radicale que l'Antiquité ait gravée dans la pierre.`,
  moralOrLesson: `La vraie puissance ne se prouve pas en écrasant les plus faibles, mais en leur permettant de se tenir debout en votre présence — les reliefs de l'Apadana sont le plus bel argument de l'histoire : la grandeur d'un empire ne se mesure pas à l'uniformité qu'il impose, mais à la diversité qu'il embrasse.`,
  characters: [
    'Darius Ier (le Grand Roi)',
    `Xerxès Ier (bâtisseur de l'Apadana)`,
    'Les 23 peuples tributaires',
    'Artisans grecs et égyptiens',
    'Ernst Herzfeld (archéologue)',
  ],
  paragraphs: [
    {
      text: `Dans le sud de l'Iran, au milieu des ruines de ce qui fut la plus grande capitale cérémonielle du monde antique, il y a un escalier gravé dans la pierre qui a changé notre façon de comprendre le pouvoir. Persépolis. Sur cet escalier, vingt-trois peuples venus de tous les coins du plus vaste empire que l'humanité ait jamais connu défilent en procession vers leur roi. Chacun porte ses habits. Chacun apporte ses offrandes. Chacun garde son identité. Personne n'est à genoux. Personne n'est enchaîné. Dans l'Antiquité, c'était du jamais-vu.`,
    },
    {
      text: `Les détails coupent le souffle. Des Élamites du sud-ouest de l'Iran portent une lionne et deux lionceaux — on distingue les muscles sous sa peau. Des Arméniens mènent un cheval sculpté si finement qu'on voit les pompons de sa bride. Des Babyloniens apportent des étoffes dont chaque frange est ciselée une à une dans la roche, avec un taureau à bosse. Des Lydiens — du pays de Crésus, où les rivières charriaient de l'or — offrent des bracelets en or et un char miniature. Des Éthiopiens portent des défenses d'éléphant. Chaque peuple ressemble exactement à lui-même.`,
    },
    {
      text: `Pour mesurer ce que ça représente, il faut savoir ce qui existait avant. Les Assyriens — la puissance dominante au Moyen-Orient pendant des siècles — décoraient leurs palais avec des ennemis empalés, décapités, écorchés vifs. C'était comme ça que les empires montraient leur force : par la terreur pure. Dans tous les reliefs de Persépolis, pas un seul acte de violence contre un être humain. Pas un seul. Chaque étranger marche droit, portant des offrandes au lieu de chaînes. Les Perses avaient vu la brutalité assyrienne de près. Ils ont choisi l'exact inverse.`,
    },
    {
      text: `Et les Perses n'ont pas seulement gravé cette idée — ils l'ont construite. Darius le Grand a enterré des tablettes d'or et d'argent sous les fondations, et dessus il a inscrit qui avait bâti l'édifice : les tailleurs de pierre étaient grecs et lydiens, les orfèvres étaient mèdes et égyptiens, les briquetiers étaient babyloniens. Le plus grand monument de l'empire avait été bâti par des gens venus de chacune de ses provinces. On dit « diviser pour mieux régner ». Darius a fait l'inverse — et son escalier est toujours debout.`,
    },
    {
      text: `Au centre de la scène trône le Roi des Rois — presque certainement Darius Ier — tenant un lotus et un sceptre. Derrière lui, son fils Xerxès se tient debout à la même hauteur : la promesse que la lignée tiendra. Mais l'image la plus mystérieuse est sur l'escalier d'en face : un lion plonge ses crocs dans un taureau. Les spécialistes pensent que c'est une carte céleste — le Lion dévorant le Taureau au moment précis de l'équinoxe de printemps. C'est Norouz, le Nouvel An perse. Toute la procession est un calendrier gravé dans la pierre.`,
    },
    {
      text: `Est-ce que tout ça était vrai ? Les historiens en débattent depuis des décennies. Les « offrandes » étaient des impôts. La « participation volontaire » était soutenue par une armée. Les sourires, c'était de la propagande. Mais même les plus sceptiques admettent que les Perses étaient vraiment différents. Le fondateur de l'empire, Cyrus le Grand, a publié un décret permettant aux peuples conquis de garder leurs dieux et leurs coutumes — l'un des tout premiers actes de tolérance religieuse de l'histoire. L'art exagère, oui. Mais il exagère quelque chose qui existait réellement.`,
    },
    {
      text: `Quand Alexandre le Grand a brûlé Persépolis en 330 avant notre ère — probablement ivre, certainement pour faire passer un message — les décombres ont enseveli l'escalier oriental et l'ont protégé sans le vouloir. Treize des soixante-douze colonnes d'origine sont encore debout aujourd'hui. Et chaque printemps, trois cents millions de personnes célèbrent Norouz — un rituel gravé sur cet escalier il y a deux mille cinq cents ans. Le cortège marche encore. Il n'est pas arrivé. Il n'arrivera jamais. C'est ça, l'idée.`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Niemand kniete»
//
//  Proverb: «Einigkeit macht stark»
//  (Unity makes strength — echoes the national anthem
//   "Einigkeit und Recht und Freiheit")
//  — subverted: German Einigkeit was one people finding
//    each other. Darius achieved the harder kind:
//    twenty-three peoples with nothing in common walking
//    in the same direction.
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#twenty-three-nations',
  title: 'Niemand kniete',
  subtitle: `Das größte Reich der Antike meißelte eine Idee in Stein, die niemand gewagt hätte: Eroberte Völker schreiten aufrecht vor ihren König`,
  excerpt: `In die Treppe des größten Audienzsaals der antiken Welt gemeißelt, schreiten dreiundzwanzig Völker in ewiger Prozession — jedes in eigener Tracht, mit eigenen Gaben, in unversehrter Würde. Die radikalste politische Aussage, die die Antike je in Stein verewigt hat.`,
  moralOrLesson: `Wahre Macht zeigt sich nicht darin, die Schwächeren zu zermalmen, sondern darin, ihnen zu erlauben, aufrecht vor einem zu stehen — die Reliefs der Apadana sind das schönste Argument der Geschichte: Die Größe eines Reiches misst sich nicht an der Gleichförmigkeit, die es erzwingt, sondern an der Vielfalt, die es trägt.`,
  characters: [
    'Darius I. (der Großkönig)',
    'Xerxes I. (Vollender der Apadana)',
    'Die 23 Untertanenvölker',
    'Griechische und ägyptische Handwerker',
    'Ernst Herzfeld (Ausgräber)',
  ],
  paragraphs: [
    {
      text: `Im Süden des Iran, inmitten der Ruinen einer Stadt, die einst die größte Zeremonialhauptstadt der antiken Welt war, gibt es eine in Stein gemeißelte Treppe, die unser Verständnis von Macht für immer verändert hat. Persepolis. Auf dieser Treppe schreiten dreiundzwanzig Völker aus dem größten Reich, das die Menschheit je gesehen hatte, in steinerner Prozession auf ihren König zu. Jedes trägt seine eigene Kleidung. Jedes bringt seine eigenen Gaben. Jedes bewahrt seine eigene Identität. Niemand kniet. Niemand ist in Ketten. In der Antike war das beispiellos.`,
    },
    {
      text: `Die Details sind atemberaubend. Elamiter aus dem Südwesten des Iran tragen eine Löwin mit zwei Jungen — man kann die Muskeln unter ihrer Haut zählen. Armenier führen ein Pferd, so fein gemeißelt, dass man die Quasten am Zaumzeug erkennt. Babylonier bringen Stoffe, deren Fransen einzeln in den Stein gehauen wurden, dazu einen Buckelstier. Lyder — aus dem Land des Krösus, wo die Flüsse Gold führten — bieten goldene Armreifen und einen Miniaturwagen. Äthiopier tragen Stoßzähne von Elefanten. Jedes Volk sieht genau so aus, wie es ist. Kein einziger Unterschied wurde getilgt.`,
    },
    {
      text: `Um zu verstehen, was das bedeutet, muss man wissen, was vorher da war. Die Assyrer — die beherrschende Macht im Nahen Osten über Jahrhunderte — schmückten ihre Paläste mit Szenen von Feinden, die gepfählt, enthauptet und bei lebendigem Leib gehäutet wurden. So zeigten Imperien ihre Stärke: durch nackten Terror. In sämtlichen Reliefs von Persepolis gibt es keinen einzigen Akt der Gewalt gegen einen Menschen. Nicht einen einzigen. Jeder Fremde geht aufrecht, trägt Gaben statt Ketten. Die Perser hatten die assyrische Brutalität aus nächster Nähe gesehen. Sie wählten das genaue Gegenteil.`,
    },
    {
      text: `Und die Perser haben diese Idee nicht nur gemeißelt — sie haben sie gebaut. Darius der Große vergrub Gold- und Silbertafeln unter dem Fundament und ließ darauf festhalten, wer das Gebäude errichtet hatte: Die Steinmetze waren Griechen und Lyder. Die Goldschmiede waren Meder und Ägypter. Die Ziegelarbeiter waren Babylonier. Das bedeutendste Bauwerk des Reiches wurde von Händen aus jedem seiner Winkel geschaffen. Einigkeit macht stark — so sagt man. Aber die Einigkeit, die Darius schuf, war die schwierigere Art: dreiundzwanzig Völker, die nichts verband, gingen in dieselbe Richtung.`,
    },
    {
      text: `Im Zentrum sitzt der König der Könige — mit großer Sicherheit Darius I. — mit Lotusblüte und Zepter in den Händen. Hinter ihm steht sein Sohn Xerxes auf gleicher Höhe: das Versprechen, dass die Linie halten wird. Aber das rätselhafteste Bild befindet sich auf der gegenüberliegenden Treppe: ein Löwe, der seine Zähne in einen Stier schlägt. Forscher vermuten, es ist eine Sternkarte — der Löwe verschlingt den Stier im exakten Moment der Frühlings-Tagundnachtgleiche. Das ist Nouruz, das persische Neujahrsfest. Die gesamte Prozession ist ein Kalender aus Stein.`,
    },
    {
      text: `War irgendetwas davon echt? Historiker streiten seit Jahrzehnten darüber. Die «Geschenke» waren in Wahrheit Steuern. Die «freiwillige Teilnahme» wurde von einer Armee gestützt. Das Lächeln war Propaganda. Aber selbst die größten Skeptiker geben zu: Die Perser waren wirklich anders. Der Reichsgründer Kyros der Große erließ ein berühmtes Dekret, das eroberten Völkern erlaubte, ihre Götter und Bräuche zu behalten — einer der ersten Akte religiöser Toleranz in der Geschichte. Die Kunst übertreibt, ja. Aber sie übertreibt etwas, das tatsächlich da war.`,
    },
    {
      text: `Als Alexander der Große Persepolis im Jahr 330 v. Chr. niederbrannte — vermutlich betrunken, auf jeden Fall mit einer Botschaft — begrub der Schutt die östliche Treppe und bewahrte sie unbeabsichtigt. Dreizehn der ursprünglich zweiundsiebzig Säulen stehen noch heute. Und jeden Frühling feiern dreihundert Millionen Menschen auf der Welt Nouruz — ein Ritual, das auf dieser Treppe vor zweieinhalbtausend Jahren in Stein gemeißelt wurde. Die Prozession läuft noch immer. Sie ist nicht angekommen. Sie wird nie ankommen. Das ist der Punkt.`,
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
  console.log('=== Validating stories ===\n');

  console.log('--- ES (Spanish) ---');
  validate(es);

  console.log('--- FR (French) ---');
  validate(fr);

  console.log('--- DE (German) ---');
  validate(de);

  console.log('=== Pushing to DynamoDB ===\n');
  await pushStory(es);
  await pushStory(fr);
  await pushStory(de);

  console.log('=== Twenty-Three Nations (ES + FR + DE) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
