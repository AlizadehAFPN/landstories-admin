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

// ─── Shared non-text fields (from English original) ─────
const base = {
  siteId: 'persepolis',
  storyId: 'night-persepolis-burned',
  icon: '\u{1F525}',
  tier: 'S',
  source: 'Diodorus Siculus, Bibliotheca Historica XVII.70-72; Plutarch, Life of Alexander 37-38; Arrian, Anabasis Alexandri 3.18; Quintus Curtius Rufus, Historiae Alexandri Magni 5.6-7; Schmidt, Erich F., Persepolis I-III (Oriental Institute, 1953-1970); Briant, Pierre, From Cyrus to Alexander (2002)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 52.8914, lat: 29.9342 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «La noche que ardió Persépolis»
//  Proverb: "No hay mal que por bien no venga"
//  — subverted: nobody imagined the "mal" would be an
//    empire in flames and the "bien" its memory intact
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#night-persepolis-burned',
  title: 'La noche que ardió Persépolis',
  subtitle: 'El discurso de una cortesana, un rey borracho y el incendio que destruyó un imperio — y lo salvó para siempre',
  excerpt: 'En una noche cálida de mayo del 330 a.\u00A0C., al final de un banquete descontrolado en el palacio más grandioso del mundo, una mujer se puso de pie y pronunció un discurso que destruiría dos siglos de civilización en una sola hora.',
  moralOrLesson: 'Lo que tarda generaciones en construirse puede destruirse en una sola noche de furia — y la ironía más cruel es que el fuego destinado a borrar la memoria de un imperio terminó preservándola, cociendo treinta mil tablillas de arcilla hasta convertirlas en piedra eterna y transformando unas ruinas en el monumento más poderoso a la grandeza persa que Alejandro jamás habría imaginado.',
  era: '330 a.\u00A0C. (enero–mayo)',
  characters: [
    'Alejandro Magno',
    'Tais (cortesana ateniense)',
    'Parmenión (general veterano de Alejandro)',
    'Ptolomeo (general, futuro faraón de Egipto)',
    'Jerjes I (cuyo palacio fue incendiado)',
  ],
  paragraphs: [
    {
      text: 'Mayo del 330 a.\u00A0C. Alejandro Magno celebra un banquete en un palacio que no le pertenece. Persépolis — el corazón ceremonial del Imperio persa, el complejo arquitectónico más espectacular de la Tierra — lleva cuatro meses en sus manos. El vino corre sin freno. Las antorchas parpadean contra muros tallados con imágenes de veintitrés naciones trayendo ofrendas al Rey de Reyes. Entonces una mujer llamada Tais se levanta. Y con un solo discurso, lo cambia todo.',
    },
    {
      text: 'Tais era ateniense — brillante, culta, compañera del general Ptolomeo, uno de los hombres más poderosos del círculo de Alejandro. Y no se anduvo con rodeos. Ciento cincuenta años antes, el rey persa Jerjes había invadido Grecia y quemado los templos sagrados de Atenas hasta los cimientos. Y ahora ahí estaban ellos, sentados en su palacio, bebiendo su vino. Lo más grande que Alejandro podía hacer, dijo, era dejar que una mujer de Atenas encendiera la primera llama. La sala de soldados macedonios borrachos estalló en gritos.',
    },
    {
      text: 'Alejandro agarra una antorcha. Lo que viene después es un desfile de borrachos por pasillos construidos para las ceremonias más sagradas del mundo — guirnaldas, flautas, un río de fuego. Apuntan primero al palacio de Jerjes. No al tesoro. No al salón del trono. A la casa del hombre que quemó Atenas. Las vigas de cedro del Líbano prenden al instante — el cedro está lleno de resina y arde rápido y brutal. En minutos, el fuego ya no se puede apagar. Plutarco cuenta que Alejandro gritó que lo detuvieran. Demasiado tarde.',
    },
    {
      text: 'No todos celebran. Parmenión, el general más veterano de Alejandro — un hombre que ya servía a su padre —, le suplica que no lo haga. Estás quemando tu propia propiedad. Asia jamás seguirá a alguien que destruye en vez de construir. Vas a parecer un saqueador, no un rey. Alejandro lo ignora. En menos de un año, Parmenión está muerto por orden suya. Algunos historiadores creen que la fiesta fue una tapadera — que Alejandro quemó Persépolis a sangre fría, como un mensaje helado a Grecia: la deuda está saldada.',
    },
    {
      text: 'La destrucción es total. Dos siglos de arquitectura se esfuman en horas. Los techos se desploman, los muros ceden, la ceniza se acumula metros de profundidad. Su ejército ya había saqueado el tesoro: tres mil toneladas de plata y oro, arrastradas por mulas y camellos. Y después quema el edificio que lo guardaba. Pero los escombros sepultan los relieves tallados en las escalinatas. Cuando los arqueólogos los desentierran en los años treinta, los rizos de las barbas y los pliegues de las telas siguen nítidos tras dos mil quinientos años.',
    },
    {
      text: 'Pero el fuego escondía un regalo que nadie esperaba. Ocultas en los muros de Persépolis había treinta mil tablillas de arcilla — papeleo de gobierno, básicamente. Raciones de trabajadores, permisos de viaje, ofrendas religiosas. Revelaron que el Imperio persa pagaba igual a hombres y mujeres por el mismo trabajo y daba comida extra a las madres recientes. La arcilla sin cocer se deshace con los siglos. El fuego de Alejandro coció esas tablillas duras como piedra. Dicen que no hay mal que por bien no venga — pero nadie imaginó que el mal sería un imperio en llamas y el bien, su memoria intacta.',
    },
    {
      text: 'Los iraníes aún lo llaman Eskandar-e Goyastak — Alejandro el Maldito. Persépolis nunca se reconstruyó. Pero sus ruinas se convirtieron en algo que un palacio en pie jamás habría sido: un monumento que habla a través del tiempo. Trece columnas siguen en pie. Toros alados custodian la puerta. Los relieves muestran veintitrés pueblos caminando hacia un trono que hoy está vacío. Lo que tarda generaciones en construirse puede arder en una noche de borrachera — pero la ironía más cruel es que el fuego que pretendía borrar un imperio es la razón por la que lo recordamos.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «La nuit où Persépolis a brûlé»
//  Proverb: "L'homme propose, Dieu dispose"
//  — subverted: and sometimes God disposes with fire
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#night-persepolis-burned',
  title: 'La nuit où Persépolis a brûlé',
  subtitle: `Le discours d'une courtisane, un roi ivre et l'incendie qui a détruit un empire — avant de le sauver pour l'éternité`,
  excerpt: `Par une nuit tiède de mai 330 avant J.-C., à l'issue d'un banquet qui avait mal tourné dans le plus grandiose palais du monde, une femme s'est levée et a prononcé un discours qui allait réduire deux siècles de civilisation en cendres en l'espace d'une heure.`,
  moralOrLesson: `Ce qui prend des générations à bâtir peut être anéanti en une seule nuit de fureur — et l'ironie la plus cruelle est que le feu censé effacer la mémoire d'un empire l'a au contraire préservée, cuisant trente mille tablettes d'argile aussi dures que la pierre et transformant des ruines en un monument à la grandeur perse qu'Alexandre n'aurait jamais voulu ériger.`,
  era: '330 av. J.-C. (janvier–mai)',
  characters: [
    'Alexandre le Grand',
    'Thaïs (courtisane athénienne)',
    `Parménion (général chevronné d'Alexandre)`,
    `Ptolémée (général, futur pharaon d'Égypte)`,
    'Xerxès Ier (dont le palais fut incendié)',
  ],
  paragraphs: [
    {
      text: `Mai 330 avant J.-C. Alexandre le Grand donne un banquet dans un palais qui ne lui appartient pas. Persépolis — le cœur cérémoniel de l'Empire perse, le complexe architectural le plus somptueux sur terre — est entre ses mains depuis quatre mois. Le vin coule à flots. Les torches vacillent sur des murs gravés de vingt-trois nations apportant leurs offrandes au Roi des Rois. C'est alors qu'une femme nommée Thaïs se lève. Et d'un seul discours, fait basculer l'histoire.`,
    },
    {
      text: `Thaïs est athénienne — brillante, lettrée, compagne de Ptolémée, l'un des principaux généraux d'Alexandre. Son argument va droit au but. Cent cinquante ans plus tôt, le roi perse Xerxès avait envahi la Grèce et réduit en cendres les temples sacrés d'Athènes. Et maintenant, les voilà assis dans son palais, buvant son vin. La plus belle chose qu'Alexandre puisse faire, dit-elle, c'est laisser une femme d'Athènes allumer la première flamme. La salle pleine de soldats macédoniens ivres explose.`,
    },
    {
      text: `Alexandre saisit une torche. Ce qui suit est un cortège d'ivrognes à travers des couloirs bâtis pour les cérémonies les plus sacrées du monde — guirlandes, flûtes, une rivière de feu. Ils visent d'abord le palais de Xerxès. Pas le trésor. Pas la salle du trône. La demeure de celui qui avait brûlé Athènes. Les poutres de cèdre du Liban prennent instantanément — le cèdre est gorgé de résine, il brûle vite et sans pitié. En quelques minutes, le feu est hors de contrôle. Plutarque raconte qu'Alexandre hurle d'arrêter. Trop tard.`,
    },
    {
      text: `Tout le monde n'applaudit pas. Parménion, le général le plus expérimenté d'Alexandre — un vétéran au service de son père —, le supplie de renoncer. Tu brûles ton propre bien. L'Asie ne suivra jamais un homme qui détruit au lieu de bâtir. Tu auras l'air d'un pillard, pas d'un roi. Alexandre l'ignore. Moins d'un an plus tard, Parménion est mort sur son ordre. Certains historiens pensent que la beuverie n'était qu'une façade — qu'Alexandre a brûlé Persépolis de sang-froid, un message glacial à la Grèce : la dette est réglée.`,
    },
    {
      text: `La destruction est totale. Deux siècles d'architecture partent en fumée en quelques heures. Les toits s'effondrent, les murs cèdent, la cendre s'accumule sur des mètres. Son armée avait déjà vidé le trésor : trois mille tonnes d'argent et d'or, convoyées par des mules et des chameaux. Puis il brûle le bâtiment qui les abritait. Mais les décombres ensevelissent les sculptures des escaliers. Quand les archéologues les dégagent dans les années 1930, les boucles des barbes et les plis des étoffes sont encore nets — après deux mille cinq cents ans.`,
    },
    {
      text: `L'homme propose, Dieu dispose — et parfois, il dispose avec du feu. Cachées dans les murs de Persépolis, trente mille tablettes d'argile attendaient — de la paperasse administrative, en somme. Rations d'ouvriers, laissez-passer, offrandes religieuses. Elles révèlent que l'Empire perse payait les femmes autant que les hommes pour un travail égal et accordait un supplément de nourriture aux jeunes mères. L'argile crue s'effrite au fil des siècles. Le feu d'Alexandre les a cuites dures comme la pierre. L'incendie censé effacer un empire est devenu ce qui l'a sauvé.`,
    },
    {
      text: `Les Iraniens l'appellent encore Eskandar-e Gojastak — Alexandre le Maudit. Persépolis n'a jamais été reconstruite. Mais ses ruines sont devenues ce qu'un palais debout n'aurait jamais été : un monument qui traverse les siècles. Treize colonnes se dressent encore. Des taureaux ailés gardent toujours la porte. Des bas-reliefs montrent vingt-trois peuples marchant vers un trône désormais vide. Ce qui prend des générations à bâtir peut brûler en une nuit d'ivresse — mais l'ironie la plus cruelle, c'est que le feu censé effacer un empire est la raison même pour laquelle on s'en souvient.`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Die Nacht, in der Persepolis brannte»
//  Proverb: "Der Mensch denkt, Gott lenkt"
//  — subverted: and sometimes He steers with fire
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#night-persepolis-burned',
  title: 'Die Nacht, in der Persepolis brannte',
  subtitle: 'Die Rede einer Kurtisane, ein betrunkener König und das Feuer, das ein Imperium zerstörte — und es für die Ewigkeit bewahrte',
  excerpt: 'In einer warmen Mainacht des Jahres 330 v.\u00A0Chr. erhob sich am Ende eines ausufernden Banketts im prächtigsten Palast der Erde eine Frau und hielt eine Rede, die zwei Jahrhunderte Zivilisation innerhalb einer Stunde in Asche verwandeln sollte.',
  moralOrLesson: 'Was Generationen braucht, um errichtet zu werden, kann in einer einzigen Nacht der Raserei zerstört werden — und die grausamste Ironie ist, dass das Feuer, das die Erinnerung an ein Imperium auslöschen sollte, sie stattdessen bewahrte, indem es dreißigtausend Tontafeln zu Stein brannte und Ruinen in das mächtigste Denkmal persischer Größe verwandelte, das Alexander nie beabsichtigt hatte.',
  era: '330 v.\u00A0Chr. (Januar–Mai)',
  characters: [
    'Alexander der Große',
    'Thaïs (athenische Kurtisane)',
    'Parmenion (Alexanders erfahrenster General)',
    'Ptolemaios (General, künftiger Pharao von Ägypten)',
    'Xerxes I. (dessen Palast angezündet wurde)',
  ],
  paragraphs: [
    {
      text: 'Mai 330 v.\u00A0Chr. Alexander der Große gibt ein Bankett in einem Palast, der ihm nicht gehört. Persepolis — das zeremonielle Herz des Persischen Reiches, die prächtigste Palastanlage der Erde — ist seit vier Monaten in seiner Hand. Der Wein fließt in Strömen. Fackeln flackern über Wände, in die Bilder von dreiundzwanzig Völkern gemeißelt sind, die dem König der Könige Gaben bringen. Da erhebt sich eine Frau namens Thaïs. Und mit einer einzigen Rede verändert sie alles.',
    },
    {
      text: 'Thaïs ist Athenerin — klug, gebildet, Gefährtin von Ptolemaios, einem der mächtigsten Generäle Alexanders. Und ihr Argument trifft wie ein Schwerthieb. Hundertfünfzig Jahre zuvor hatte der persische König Xerxes Griechenland überfallen und die heiligen Tempel Athens niedergebrannt. Und jetzt sitzen sie hier, in seinem Palast, trinken seinen Wein. Das Größte, was Alexander tun könne, sagt sie, sei es, einer Frau aus Athen die erste Fackel entzünden zu lassen. Der Saal voller betrunkener makedonischer Soldaten bricht in Jubel aus.',
    },
    {
      text: 'Alexander greift zur Fackel. Was folgt, ist ein Zug Betrunkener durch Korridore, die für die heiligsten Zeremonien der Welt errichtet wurden — Girlanden, Flöten, ein Strom aus Feuer. Sie zielen zuerst auf den Palast des Xerxes. Nicht auf die Schatzkammer. Nicht auf den Thronsaal. Auf das Haus des Mannes, der Athen verbrannt hatte. Die Zedernbalken aus dem Libanon fangen sofort Feuer — Zedernholz steckt voller Harz und brennt schnell und gnadenlos. Innerhalb von Minuten ist der Brand nicht mehr zu löschen. Plutarch schreibt, Alexander habe geschrien, man solle aufhören. Zu spät.',
    },
    {
      text: 'Nicht alle jubeln. Parmenion, Alexanders erfahrenster General — ein Veteran, der schon seinem Vater gedient hatte —, fleht ihn an, es nicht zu tun. Du verbrennst dein eigenes Eigentum. Asien wird niemals einem Mann folgen, der zerstört statt aufzubauen. Du wirst wie ein Plünderer wirken, nicht wie ein König. Alexander ignoriert ihn. Innerhalb eines Jahres ist Parmenion auf seinen Befehl hin tot. Manche Historiker glauben, die Geschichte vom Trinkgelage sei nur Tarnung — dass Alexander Persepolis eiskalt anzündete, als nüchterne Botschaft an Griechenland: Die Schuld ist beglichen.',
    },
    {
      text: 'Die Zerstörung ist total. Zwei Jahrhunderte Architektur gehen in Stunden in Flammen auf. Dächer stürzen ein, Mauern brechen zusammen, Asche türmt sich meterhoch. Sein Heer hatte den Schatz bereits geplündert: dreitausend Tonnen Silber und Gold, abtransportiert mit Maultieren und Kamelen. Dann verbrennt er das Gebäude, das ihn beherbergt hatte. Doch die Trümmer begraben die steinernen Reliefs der Treppen. Als Archäologen sie in den 1930er-Jahren freilegen, sind die Locken der Bärte und die Falten der Gewänder noch gestochen scharf — nach zweieinhalbtausend Jahren.',
    },
    {
      text: 'Der Mensch denkt, Gott lenkt — und manchmal lenkt er mit Feuer. Verborgen in den Mauern von Persepolis lagen dreißigtausend Tontafeln — Verwaltungsdokumente, im Grunde. Arbeiterrationen, Reisegenehmigungen, religiöse Opfergaben. Sie offenbaren, dass das Persische Reich Frauen für gleiche Arbeit gleich bezahlte und jungen Müttern zusätzliche Nahrung gewährte. Ungebrannter Ton zerfällt über die Jahrhunderte. Alexanders Feuer brannte diese Tafeln hart wie Stein — wie Keramik in einem Brennofen. Das Feuer, das ein Reich auslöschen sollte, wurde zu dem, was es für die Nachwelt rettete.',
    },
    {
      text: 'Iraner nennen ihn bis heute Eskandar-e Gojastak — Alexander den Verfluchten. Persepolis wurde nie wieder aufgebaut. Doch seine Ruinen wurden, was ein stehender Palast nie gewesen wäre: ein Monument, das durch die Zeiten spricht. Dreizehn Säulen stehen noch. Geflügelte Stiere bewachen das Tor. Reliefs zeigen dreiundzwanzig Völker auf dem Weg zu einem Thron, der heute leer ist. Was Generationen braucht, kann in einer betrunkenen Nacht verbrennen — doch die grausamste Ironie ist, dass das Feuer, das ein Imperium auslöschen sollte, der Grund ist, warum wir uns daran erinnern.',
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
  for (const s of stories) {
    console.log(`--- ${s.lang.toUpperCase()} ---`);
    validate(s);
  }

  console.log('=== Pushing to DynamoDB ===\n');
  for (const s of stories) {
    await pushStory(s);
  }

  console.log('=== All 3 languages pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
