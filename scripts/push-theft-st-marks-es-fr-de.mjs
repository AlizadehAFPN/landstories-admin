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
  siteId: 'venice-st-marks-doges',
  storyId: 'theft-of-st-marks-body',
  icon: '\u{1F9A1}',
  tier: 'A',
  source: 'Translatio Sancti Marci (9th century account); Norwich, John Julius. A History of Venice, 1982; Brown, Patricia Fortini. Venice and Antiquity, 1996',
  characters: [
    'Buono da Malamocco',
    'Rustico da Torcello',
    'St. Mark the Evangelist',
    'Stauracio (Greek monk)',
    'Teodoro (Greek monk)',
    'Doge Giustiniano Partecipazio',
  ],
  era: '9th century (828 AD)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 12.3396, lat: 45.4345 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'tricksters_folk_tales',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «El robo de San Marcos»
//  Proverb: «A Dios rogando y con el mazo dando»
//  (Pray to God but keep hammering)
//  — subverted: Venice claimed divine will while doing
//    the dirty work themselves
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#theft-of-st-marks-body',
  title: 'El robo de San Marcos',
  subtitle: 'C\u00f3mo dos mercaderes escondieron un santo bajo cerdo y cambiaron el destino de una ciudad',
  excerpt: 'Venecia, 828. La ciudad crec\u00eda sin parar \u2014 rica del comercio, con una flota en expansi\u00f3n y un poder que ya se sent\u00eda en todo el Mediterr\u00e1neo. Pero ten\u00eda un problema: su santo patr\u00f3n era Teodoro, un soldado griego que no le dec\u00eda nada a nadie.',
  moralOrLesson: 'Una jugada audaz puede definir a una ciudad para siempre \u2014 y la historia que te cuentas sobre tus or\u00edgenes acaba marcando tu destino.',
  paragraphs: [
    { text: 'Venecia, 828. La ciudad crec\u00eda sin parar \u2014 rica del comercio, con una flota en expansi\u00f3n y un poder que ya se sent\u00eda en todo el Mediterr\u00e1neo. Pero ten\u00eda un problema: su santo patr\u00f3n era Teodoro, un soldado griego que no le dec\u00eda nada a nadie. Si Venecia quer\u00eda competir con Roma y Constantinopla, necesitaba un nombre m\u00e1s grande. Y dos mercaderes que comerciaban en Alejandr\u00eda \u2014 Buono da Malamocco y Rustico da Torcello \u2014 creyeron saber exactamente d\u00f3nde encontrarlo.' },
    { text: 'Su objetivo: San Marcos, uno de los cuatro evangelistas, el hombre que fund\u00f3 la Iglesia de Alejandr\u00eda. Su cuerpo llevaba siglos descansando en una iglesia de la ciudad. Los mercaderes no estaban all\u00ed para rezar. Estaban all\u00ed para robar un santo, meterlo en un barco y entreg\u00e1rselo a Venecia como nuevo protector. Era uno de los golpes m\u00e1s atrevidos de la historia \u2014 y el plan que idearon fue todav\u00eda m\u00e1s loco que la idea en s\u00ed.' },
    { text: 'Alejandr\u00eda estaba bajo dominio musulm\u00e1n, y las autoridades vigilaban las reliquias cristianas de cerca \u2014 sab\u00edan que los europeos har\u00edan lo que fuera por llev\u00e1rselas. Los mercaderes encontraron aliados dentro de la iglesia: dos monjes griegos, Stauracio y Teodoro, guardianes de la tumba de San Marcos. Los monjes ten\u00edan sus razones para ayudar: el califa llevaba tiempo demoliendo iglesias para reutilizar el m\u00e1rmol, y estaban convencidos de que la suya ser\u00eda la siguiente.' },
    { text: 'De noche, los cuatro abrieron el sarc\u00f3fago, sacaron los restos de Marcos y dejaron en su lugar el cuerpo de una santa menor, Claudia. Luego vino la jugada maestra: metieron el cuerpo en un cesto enorme y lo cubrieron con capas de cerdo y repollo. Cuando los inspectores musulmanes subieron al barco, los mercaderes destaparon el cesto gritando \u00ab\u00a1Khinzir! \u00a1Khinzir!\u00bb \u2014 cerdo en \u00e1rabe. Los oficiales, para quienes el cerdo era impuro, retrocedieron asqueados y dejaron pasar el barco sin mirar dos veces.' },
    { text: 'As\u00ed, una de las reliquias m\u00e1s sagradas del cristianismo sali\u00f3 de Egipto bajo la carne que sus guardianes ni pod\u00edan tocar. Cuando el cuerpo lleg\u00f3 a Venecia, la ciudad estall\u00f3 de j\u00fabilo. El dux Partecipazio orden\u00f3 levantar una bas\u00edlica de inmediato. La primera se termin\u00f3 hacia 832. La que hoy quita el aliento \u2014 la Bas\u00edlica de San Marcos \u2014 se construy\u00f3 entre 1063 y 1094. Y el le\u00f3n alado de San Marcos se convirti\u00f3 en el emblema de Venecia: estampado en banderas, tallado en muros, pintado en barcos de guerra.' },
    { text: 'Pero lo m\u00e1s incre\u00edble es esto: si visitas la bas\u00edlica hoy, mira el mosaico sobre la entrada del extremo izquierdo. Es del siglo XIII y muestra toda la escena del contrabando con todo detalle \u2014 los mercaderes cargando el cesto, los oficiales apart\u00e1ndose, el cuerpo del santo escondido bajo la carne prohibida. Probablemente sea la \u00fanica iglesia del mundo cuya fachada celebra un delito con orgullo.' },
    { text: 'Pero Venecia nunca lo llam\u00f3 delito. Lo llamaron translatio \u2014 una \u00abtransferencia sagrada\u00bb \u2014 e insistieron en que fue voluntad de Dios. Seg\u00fan su leyenda, siglos antes del robo, un \u00e1ngel se le apareci\u00f3 a Marcos mientras navegaba por la laguna veneciana y le susurr\u00f3: \u00abPaz a ti, Marcos. Aqu\u00ed descansar\u00e1 tu cuerpo.\u00bb El robo de 828, dec\u00edan, no fue un robo. Fue una profec\u00eda cumpli\u00e9ndose. A Dios rogando y con el mazo dando \u2014 y mil a\u00f1os de gloria veneciana se construyeron sobre esa historia.' },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Le vol de Saint-Marc»
//  Proverb: «Aide-toi, le Ciel t'aidera»
//  (Help yourself and Heaven will help you — La Fontaine)
//  — subverted: Venice "helped itself" to a saint's body,
//    then claimed Heaven was behind it all along
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#theft-of-st-marks-body',
  title: 'Le vol de Saint-Marc',
  subtitle: `Comment deux marchands ont cach\u00e9 un saint sous du porc et chang\u00e9 le destin d\u2019une ville \u00e0 jamais`,
  excerpt: `Venise, an 828. La ville explose \u2014 riche du commerce, une flotte qui grossit, un pouvoir qui commence \u00e0 compter en M\u00e9diterran\u00e9e. Mais elle a un probl\u00e8me : son saint patron, c\u2019est Th\u00e9odore, un soldat grec dont personne n\u2019a entendu parler.`,
  moralOrLesson: `Un seul coup d\u2019audace peut d\u00e9finir une ville pour toujours \u2014 et l\u2019histoire que l\u2019on raconte sur ses origines finit par tracer le chemin.`,
  paragraphs: [
    { text: `Venise, an 828. La ville explose \u2014 riche du commerce, une flotte qui grossit, un pouvoir qui commence \u00e0 compter en M\u00e9diterran\u00e9e. Mais elle a un probl\u00e8me : son saint patron, c\u2019est Th\u00e9odore, un soldat grec dont personne n\u2019a entendu parler. Si Venise veut rivaliser avec Rome et Constantinople, il lui faut un nom autrement plus grand. Et deux marchands v\u00e9nitiens install\u00e9s \u00e0 Alexandrie \u2014 Buono da Malamocco et Rustico da Torcello \u2014 pensent savoir exactement o\u00f9 en trouver un.` },
    { text: `Leur cible : saint Marc l\u2019\u00c9vang\u00e9liste \u2014 un des quatre auteurs des \u00c9vangiles, le fondateur de l\u2019\u00c9glise d\u2019Alexandrie. Son corps repose dans une \u00e9glise de la ville depuis des si\u00e8cles. Les marchands ne sont pas l\u00e0 pour prier. Ils sont l\u00e0 pour voler un saint, le faire passer en contrebande par la mer et l\u2019offrir \u00e0 Venise comme nouveau protecteur. C\u2019est l\u2019un des coups les plus audacieux de l\u2019Histoire \u2014 et le plan qu\u2019ils mettent au point est encore plus fou que l\u2019id\u00e9e elle-m\u00eame.` },
    { text: `Alexandrie est alors sous domination musulmane abbasside, et les autorit\u00e9s surveillent les reliques chr\u00e9tiennes de pr\u00e8s \u2014 elles savent que les Europ\u00e9ens seraient pr\u00eats \u00e0 tout pour s\u2019en emparer. Les marchands trouvent des alli\u00e9s \u00e0 l\u2019int\u00e9rieur de l\u2019\u00e9glise : deux moines grecs, Stauracio et Teodoro, gardiens du tombeau de saint Marc. Les moines ont leurs propres raisons d\u2019aider. Le calife fait d\u00e9molir des \u00e9glises pour r\u00e9cup\u00e9rer le marbre, et ils sont terrifi\u00e9s \u00e0 l\u2019id\u00e9e que celle de saint Marc soit la prochaine sur la liste.` },
    { text: `En pleine nuit, les quatre ouvrent le sarcophage, sortent les restes de Marc et les remplacent par le corps d\u2019une sainte mineure, Claudia. Puis vient le coup de g\u00e9nie : ils cachent le corps dans un immense panier sous des couches de porc et de chou. Quand les douaniers musulmans montent \u00e0 bord, les marchands ouvrent le panier en criant \u00ab Khinzir ! Khinzir ! \u00bb \u2014 porc en arabe. Les officiers, pour qui le porc est strictement interdit, reculent d\u00e9go\u00fbt\u00e9s et laissent passer le navire sans v\u00e9rifier.` },
    { text: `Et voil\u00e0 : l\u2019une des reliques les plus sacr\u00e9es de la chr\u00e9tient\u00e9 quitte l\u2019\u00c9gypte planqu\u00e9e sous la viande que la foi de ses gardiens leur interdit de toucher. Quand le corps arrive \u00e0 Venise, c\u2019est le d\u00e9lire. Le doge Partecipazio ordonne la construction d\u2019une basilique aussit\u00f4t. La premi\u00e8re est termin\u00e9e vers 832. Celle qui \u00e9blouit aujourd\u2019hui \u2014 la basilique Saint-Marc \u2014 sort de terre entre 1063 et 1094. Et le lion ail\u00e9 de saint Marc devient l\u2019embl\u00e8me de Venise : sur les drapeaux, les murs, les navires de guerre.` },
    { text: `Mais le plus dingue, c\u2019est \u00e7a : si vous visitez la basilique aujourd\u2019hui, levez les yeux vers la mosa\u00efque au-dessus de l\u2019entr\u00e9e tout \u00e0 gauche. Elle date du XIIIe si\u00e8cle et montre toute la sc\u00e8ne de contrebande en d\u00e9tail \u2014 les marchands avec le panier, les douaniers qui se d\u00e9tournent, le corps du saint cach\u00e9 sous la viande interdite. C\u2019est probablement la seule \u00e9glise au monde dont la fa\u00e7ade c\u00e9l\u00e8bre fi\u00e8rement un d\u00e9lit.` },
    { text: `Venise n\u2019a jamais appel\u00e9 \u00e7a un vol. Ils ont parl\u00e9 de translatio \u2014 un \u00ab transfert sacr\u00e9 \u00bb \u2014 et jur\u00e9 que c\u2019\u00e9tait la volont\u00e9 de Dieu. Selon leur l\u00e9gende, des si\u00e8cles avant le casse, un ange serait apparu \u00e0 Marc dans la lagune v\u00e9nitienne et lui aurait souffl\u00e9 : \u00ab Paix \u00e0 toi, Marc. Ici ton corps reposera. \u00bb Le coup de 828, disaient-ils, n\u2019\u00e9tait pas un crime. C\u2019\u00e9tait une proph\u00e9tie qui se r\u00e9alisait. Aide-toi, le Ciel t\u2019aidera \u2014 et mille ans de gloire v\u00e9nitienne se sont b\u00e2tis sur cette histoire.` },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Der Raub des Heiligen Markus»
//  Proverb: «Frech kommt weiter»
//  (Being brazen gets you places)
//  — subverted: Venice was brazen enough to steal a saint,
//    then wrapped it in divine legitimacy
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#theft-of-st-marks-body',
  title: 'Der Raub des Heiligen Markus',
  subtitle: `Wie zwei H\u00e4ndler einen Heiligen unter Schweinefleisch schmuggelten und Venedigs Schicksal f\u00fcr immer ver\u00e4nderten`,
  excerpt: `Venedig, 828. Die Stadt w\u00e4chst wie verr\u00fcckt \u2014 reich durch Handel, eine Flotte, die immer gr\u00f6\u00dfer wird, eine Macht, die man im ganzen Mittelmeer sp\u00fcrt. Aber sie hat ein Problem: Ihr Schutzpatron ist Theodorus, ein griechischer Soldatenheiliger, den au\u00dferhalb der Kirche kein Mensch kennt.`,
  moralOrLesson: `Ein einziger mutiger Schritt kann eine Stadt f\u00fcr immer pr\u00e4gen \u2014 und die Geschichte, die man sich \u00fcber seine Herkunft erz\u00e4hlt, bestimmt am Ende, wohin man geht.`,
  paragraphs: [
    { text: `Venedig, 828. Die Stadt w\u00e4chst wie verr\u00fcckt \u2014 reich durch Handel, eine Flotte, die immer gr\u00f6\u00dfer wird, eine Macht, die man im ganzen Mittelmeer sp\u00fcrt. Aber sie hat ein Problem: Ihr Schutzpatron ist Theodorus, ein griechischer Soldatenheiliger, den au\u00dferhalb der Kirche kein Mensch kennt. Will Venedig mit Rom und Konstantinopel mithalten, braucht es einen gr\u00f6\u00dferen Namen. Und zwei venezianische H\u00e4ndler in Alexandria \u2014 Buono da Malamocco und Rustico da Torcello \u2014 glauben genau zu wissen, wo sie einen finden.` },
    { text: `Ihr Ziel: der Heilige Markus \u2014 einer der vier Evangelisten und der Mann, der die Kirche von Alexandria gr\u00fcndete. Sein Leichnam ruht dort seit Jahrhunderten in einer Kirche. Die H\u00e4ndler sind nicht zum Beten da. Sie sind da, um einen Heiligen zu stehlen, ihn \u00fcber das Meer zu schmuggeln und Venedig als neuen Schutzpatron zu liefern. Einer der k\u00fchnsten Raubz\u00fcge der Geschichte \u2014 und der Plan, den sie sich ausdenken, ist noch verr\u00fcckter als die Idee selbst.` },
    { text: `Alexandria steht unter muslimischer Herrschaft der Abbasiden, und die Beh\u00f6rden behalten christliche Reliquien genau im Auge \u2014 sie wissen, dass Europ\u00e4er alles daf\u00fcr tun w\u00fcrden, sie in die H\u00e4nde zu bekommen. Also finden die H\u00e4ndler Verb\u00fcndete in der Kirche: zwei griechische M\u00f6nche namens Stauracio und Teodoro, die das Grab des Heiligen Markus bewachen. Die M\u00f6nche haben ihre eigenen Gr\u00fcnde: Der Kalif l\u00e4sst Kirchen abrei\u00dfen, um den Marmor wiederzuverwenden, und sie f\u00fcrchten, ihre Kirche sei als N\u00e4chste dran.` },
    { text: `In der Nacht \u00f6ffnen die vier den Sarkophag, holen die \u00dcberreste von Markus heraus und legen den Leichnam einer unbedeutenden Heiligen hinein \u2014 Claudia. Dann der geniale Schachzug: Sie packen den K\u00f6rper in einen riesigen Korb unter Schichten von Schweinefleisch und Kohl. Als muslimische Zollbeamte an Bord kommen, rei\u00dfen die H\u00e4ndler den Korb auf und br\u00fcllen: \u00abKhinzir! Khinzir!\u00bb \u2014 Schwein auf Arabisch. Die Beamten, denen Schweinefleisch streng verboten ist, weichen angewidert zur\u00fcck und winken das Schiff durch.` },
    { text: `Und so verl\u00e4sst eine der heiligsten Reliquien der Christenheit \u00c4gypten \u2014 versteckt unter dem Fleisch, das der Glaube ihrer W\u00e4chter ihnen zu ber\u00fchren verbietet. Als der Leichnam Venedig erreicht, dreht die Stadt durch. Doge Giustiniano Partecipazio befiehlt sofort den Bau einer Basilika. Die erste steht um 832. Die atemberaubende, die heute steht \u2014 der Markusdom \u2014 entsteht zwischen 1063 und 1094. Und der gefl\u00fcgelte L\u00f6we des Heiligen Markus wird Venedigs Wahrzeichen \u2014 auf Flaggen, Mauern und Kriegsschiffen.` },
    { text: `Das Verr\u00fcckteste aber kommt jetzt: Wer heute den Markusdom besucht, sollte nach oben schauen \u2014 \u00fcber dem Eingang ganz links. Dort ist ein Mosaik aus dem 13. Jahrhundert, das die gesamte Schmuggelszene zeigt. Die H\u00e4ndler mit dem Korb, die Beamten, die sich abwenden, der Leichnam des Heiligen unter dem verbotenen Fleisch. Es d\u00fcrfte die einzige Kirche der Welt sein, deren Fassade stolz ein Verbrechen feiert.` },
    { text: `Venedig hat es nie ein Verbrechen genannt. Sie sprachen von translatio \u2014 einer \u00abheiligen \u00dcberf\u00fchrung\u00bb \u2014 und bestanden darauf, Gott selbst habe es gewollt. Ihrer Legende nach erschien Markus Jahrhunderte vor dem Raub ein Engel in der Lagune und fl\u00fcsterte: \u00abFriede sei mit dir, Markus. Hier wird dein Leib ruhen.\u00bb Der Coup von 828 war kein Raub, sagten sie. Er war eine Prophezeiung, die sich erf\u00fcllte. Frech kommt weiter \u2014 und tausend Jahre venezianischer Glanz bauten auf genau dieser Geschichte.` },
  ],
};

// ─── Push each language version ─────────────────────────
async function push(langData) {
  const item = { ...base, ...langData };
  await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log(`\u2705 Pushed ${langData.lang} — ${langData.title}`);
}

async function main() {
  try {
    await push(es);
    await push(fr);
    await push(de);
    console.log('\n\u2705 All 3 language versions pushed successfully.');
  } catch (err) {
    console.error('\u274c Error:', err.message);
    process.exit(1);
  }
}

main();
