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
  storyId: 'wedding-of-the-sea',
  icon: '\u{1F48D}',
  tier: 'A',
  source: 'Da Canal, Martin. Les Estoires de Venise (13th c.); Muir, Edward. Civic Ritual in Renaissance Venice, 1981; Lane, Frederic. Venice: A Maritime Republic, 1973',
  characters: [
    'Doge Pietro II Orseolo',
    'Pope Alexander III',
    'Emperor Frederick Barbarossa',
    'Napoleon Bonaparte',
    'The Doges of Venice',
  ],
  era: 'Medieval to Modern (1000 AD-present)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 12.3388, lat: 45.4343 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «La boda del mar»
//  Proverb: «Agua que no has de beber, déjala correr»
//  (Water you won't drink, let it flow)
//  — subverted: Venice didn't let the water flow — it put
//    a ring on the very sea that could swallow it whole
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#wedding-of-the-sea',
  title: 'La boda del mar',
  subtitle: 'La rep\u00fablica que se cas\u00f3 con el oc\u00e9ano y lo gobern\u00f3 durante mil a\u00f1os',
  excerpt: 'Una vez al a\u00f1o, durante casi ochocientos a\u00f1os, el l\u00edder de Venecia hac\u00eda algo que ning\u00fan otro gobernante en la historia intent\u00f3 jam\u00e1s: casarse con el oc\u00e9ano.',
  moralOrLesson: 'La soberan\u00eda es un acto de voluntad continua: un pacto que se renueva cada a\u00f1o entre un pueblo, los elementos y su propia determinaci\u00f3n de seguir en pie.',
  paragraphs: [
    { text: 'Una vez al a\u00f1o, durante casi ochocientos a\u00f1os, el l\u00edder de Venecia hac\u00eda algo que ning\u00fan otro gobernante en la historia intent\u00f3 jam\u00e1s: casarse con el oc\u00e9ano. No en broma. No como s\u00edmbolo. Como acto oficial de gobierno. El Dux, gobernante elegido de por vida, sub\u00eda a una barcaza dorada, navegaba hasta el Adri\u00e1tico abierto, se quitaba un anillo de oro y lo dejaba caer entre las olas. Sus palabras: \u00abTe desposamos, oh Mar, en se\u00f1al de dominio verdadero y perpetuo\u00bb. Y lo dec\u00eda completamente en serio.' },
    { text: 'Todo empez\u00f3 alrededor del a\u00f1o 1000. Venecia era una ciudad joven, levantada sobre pilotes en medio de una laguna, y los piratas de la costa croata estaban asfixiando sus rutas comerciales. El Dux Pietro Orseolo II cruz\u00f3 el Adri\u00e1tico con toda la flota, aplast\u00f3 a los piratas y se qued\u00f3 con la costa entera. Volvi\u00f3 el d\u00eda de la Ascensi\u00f3n y lo celebr\u00f3 navegando a mar abierto para reclamar el agua como propiedad veneciana. Cada Dux despu\u00e9s de \u00e9l repiti\u00f3 ese juramento. Mismo d\u00eda. Cada a\u00f1o.' },
    { text: 'La cosa subi\u00f3 de nivel en 1177. El papa Alejandro III andaba huyendo del emperador del Sacro Imperio, Federico Barbarroja \u2014el hombre m\u00e1s poderoso de Europa en ese momento\u2014 y Venecia le dio refugio y negoci\u00f3 la paz. El Papa, agradecido, le entreg\u00f3 al Dux un anillo de oro y declar\u00f3 que Venecia ten\u00eda la bendici\u00f3n de Dios para \u00abdesposarse\u00bb con el Adri\u00e1tico cada a\u00f1o. Lo llamaron Sposalizio del Mare: la boda del mar. Ya no era solo un gesto de poder. Era algo sagrado.' },
    { text: 'Pero lo que de verdad quitaba el aliento era el Bucintoro, la barcaza ceremonial del Dux. La \u00faltima versi\u00f3n, de 1729, med\u00eda 35 metros, iba cubierta de pan de oro, envuelta en seda roja y la mov\u00edan 168 remeros. Los diplom\u00e1ticos extranjeros escrib\u00edan a sus reyes que nada en Europa \u2014ninguna coronaci\u00f3n, ni los espect\u00e1culos de Versalles\u2014 pod\u00eda compararse con aquel barco dorado desliz\u00e1ndose sobre el agua, seguido por cientos de botes, el Dux de pie en la proa como un novio caminando al altar.' },
    { text: 'La \u00faltima ceremonia real fue el d\u00eda de la Ascensi\u00f3n de 1797. Doce d\u00edas despu\u00e9s, Napole\u00f3n entr\u00f3 en Venecia y la rep\u00fablica vot\u00f3 disolverse: 1.100 a\u00f1os de autogobierno, borrados de un plumazo. Napole\u00f3n sab\u00eda exactamente qu\u00e9 hacer. Mand\u00f3 arrancar todo el oro del Bucintoro, lo fundi\u00f3 y prendi\u00f3 fuego a lo que quedaba. Las cenizas del barco m\u00e1s espectacular jam\u00e1s construido acabaron flotando en la misma agua donde hab\u00eda navegado triunfante. No solo conquist\u00f3 Venecia. Le quem\u00f3 el vestido de novia.' },
    { text: 'Dice el refr\u00e1n que agua que no has de beber, d\u00e9jala correr. Venecia hizo justo lo contrario: al agua que pod\u00eda tragarla, le puso un anillo. La ceremonia volvi\u00f3 en el siglo XX y sigue viva \u2014ahora es el alcalde, no un Dux, quien lanza el anillo\u2014. Piensa en lo que eso significa: en alg\u00fan lugar del fondo del Adri\u00e1tico hay unos ochocientos anillos de oro hundidos en el barro. El precio que una rep\u00fablica pag\u00f3, a\u00f1o tras a\u00f1o, por seguir casada con el mar. Y durante mil a\u00f1os, Venecia cumpli\u00f3 sus votos.' },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Les noces de la mer»
//  Proverb: «La fortune sourit aux audacieux»
//  (Fortune favors the bold)
//  — subverted: Venice went beyond boldness — it married
//    danger itself and put a ring on its finger
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#wedding-of-the-sea',
  title: 'Les noces de la mer',
  subtitle: `La r\u00e9publique qui \u00e9pousa l\u2019oc\u00e9an et le gouverna pendant mille ans`,
  excerpt: `Une fois par an, pendant pr\u00e8s de huit cents ans, le dirigeant de Venise a fait quelque chose qu\u2019aucun autre chef d\u2019\u00c9tat n\u2019a jamais tent\u00e9 : \u00e9pouser l\u2019oc\u00e9an.`,
  moralOrLesson: `La souverainet\u00e9 est un acte de volont\u00e9 continue \u2014 un pacte renouvel\u00e9 chaque ann\u00e9e entre un peuple, les \u00e9l\u00e9ments et sa propre d\u00e9termination \u00e0 durer.`,
  paragraphs: [
    { text: `Une fois par an, pendant pr\u00e8s de huit cents ans, le dirigeant de Venise a fait quelque chose qu\u2019aucun autre chef d\u2019\u00c9tat n\u2019a jamais tent\u00e9 : \u00e9pouser l\u2019oc\u00e9an. Pas pour rire. Pas comme symbole. Comme acte officiel de gouvernement. Le Doge, \u00e9lu \u00e0 vie, montait sur une immense barge dor\u00e9e, naviguait jusqu\u2019au large de l\u2019Adriatique, \u00f4tait un anneau d\u2019or de son doigt et le laissait tomber dans les vagues. Ses mots : \u00ab Nous t\u2019\u00e9pousons, \u00f4 Mer, en signe de domination v\u00e9ritable et \u00e9ternelle. \u00bb Chaque mot pes\u00e9. Chaque mot sinc\u00e8re.` },
    { text: `Tout a commenc\u00e9 vers l\u2019an 1000. Venise \u00e9tait une jeune cit\u00e9 sur pilotis dans une lagune, et les pirates croates \u00e9tranglaient ses routes commerciales. Le Doge Pietro Orseolo II a travers\u00e9 l\u2019Adriatique avec toute sa flotte, \u00e9cras\u00e9 les pirates et pris la c\u00f4te. Il est rentr\u00e9 le jour de l\u2019Ascension et a f\u00eat\u00e9 sa victoire en naviguant au large pour revendiquer la mer comme territoire v\u00e9nitien. Chaque Doge apr\u00e8s lui a renouvel\u00e9 le serment. M\u00eame jour. Chaque ann\u00e9e. Pendant huit si\u00e8cles.` },
    { text: `En 1177, la c\u00e9r\u00e9monie a chang\u00e9 de dimension. Le pape Alexandre III fuyait l\u2019empereur Fr\u00e9d\u00e9ric Barberousse \u2014 l\u2019homme le plus puissant d\u2019Europe \u2014 et Venise lui a offert refuge et n\u00e9goci\u00e9 la paix. Reconnaissant, le Pape a remis au Doge un anneau d\u2019or et d\u00e9clar\u00e9 que Venise avait d\u00e9sormais la b\u00e9n\u00e9diction de Dieu pour \u00ab \u00e9pouser \u00bb l\u2019Adriatique chaque ann\u00e9e. On a appel\u00e9 \u00e7a le Sposalizio del Mare \u2014 les noces de la mer. Ce n\u2019\u00e9tait plus un geste de pouvoir. C\u2019\u00e9tait sacr\u00e9.` },
    { text: `Le vrai spectacle, c\u2019\u00e9tait le Bucentaure \u2014 la barge de c\u00e9r\u00e9monie du Doge. Sa derni\u00e8re version, de 1729, mesurait 35 m\u00e8tres, recouverte de feuilles d\u2019or, drap\u00e9e de soie rouge, mue par 168 rameurs. Les diplomates \u00e9trangers \u00e9crivaient chez eux que rien en Europe \u2014 aucun couronnement, pas m\u00eame les f\u00eates de Versailles \u2014 n\u2019\u00e9galait ce vaisseau dor\u00e9 glissant sur l\u2019eau, suivi de centaines de barques, le Doge debout \u00e0 la proue comme un mari\u00e9 remontant l\u2019all\u00e9e.` },
    { text: `La derni\u00e8re vraie c\u00e9r\u00e9monie a eu lieu \u00e0 l\u2019Ascension 1797. Douze jours plus tard, Napol\u00e9on entrait dans Venise et la r\u00e9publique votait sa propre dissolution \u2014 1 100 ans d\u2019ind\u00e9pendance, ray\u00e9s d\u2019un trait. Napol\u00e9on savait exactement quoi faire. Il a fait arracher l\u2019or du Bucentaure, l\u2019a fondu, puis a br\u00fbl\u00e9 la coque. Les cendres du plus beau navire jamais construit ont fini dans les m\u00eames eaux o\u00f9 il avait navigu\u00e9 en triomphe. Il n\u2019a pas juste conquis Venise. Il lui a br\u00fbl\u00e9 sa robe de mari\u00e9e.` },
    { text: `On dit que la fortune sourit aux audacieux. Venise a fait plus fort : elle a \u00e9pous\u00e9 le danger et lui a pass\u00e9 la bague au doigt. La c\u00e9r\u00e9monie a \u00e9t\u00e9 relanc\u00e9e au XXe si\u00e8cle et continue chaque ann\u00e9e \u2014 c\u2019est le maire, d\u00e9sormais, qui lance l\u2019anneau. R\u00e9fl\u00e9chissez : quelque part au fond de l\u2019Adriatique, dans la vase au large de Venise, reposent environ huit cents bagues en or. Le prix qu\u2019une r\u00e9publique a pay\u00e9, ann\u00e9e apr\u00e8s ann\u00e9e, pour rester mari\u00e9e \u00e0 la mer. Et pendant mille ans, Venise a tenu ses v\u0153ux.` },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Die Hochzeit mit dem Meer»
//  Proverb: «Steter Tropfen höhlt den Stein»
//  (Constant dripping wears away the stone)
//  — subverted: Venice's drops were made of gold — 800
//    rings, one per year, wearing the sea into submission
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#wedding-of-the-sea',
  title: 'Die Hochzeit mit dem Meer',
  subtitle: 'Eine Republik, die das Meer heiratete und es tausend Jahre lang beherrschte',
  excerpt: 'Einmal im Jahr, fast achthundert Jahre lang, tat der Herrscher Venedigs etwas, das sonst kein Staatsoberhaupt je gewagt hat: Er heiratete das Meer.',
  moralOrLesson: 'Souver\u00e4nit\u00e4t ist ein Akt des best\u00e4ndigen Willens \u2014 ein Bund, der jedes Jahr erneuert wird zwischen einem Volk, den Elementen und dem eigenen Willen zu bestehen.',
  paragraphs: [
    { text: 'Einmal im Jahr, fast achthundert Jahre lang, tat der Herrscher Venedigs etwas, das sonst kein Staatsoberhaupt je gewagt hat: Er heiratete das Meer. Kein Scherz. Keine Metapher. Ein offizieller Staatsakt. Der Doge, auf Lebenszeit gew\u00e4hlt, bestieg eine riesige goldene Barke, fuhr auf die offene Adria hinaus, zog einen Goldring vom Finger und lie\u00df ihn in die Wellen fallen. Seine Worte: \u201eWir verm\u00e4hlen uns mit dir, oh Meer, als Zeichen wahrer und ewiger Herrschaft.\u201c Er meinte jedes Wort.' },
    { text: 'Es begann um das Jahr 1000. Venedig war eine junge Stadt auf Holzpf\u00e4hlen mitten in einer Lagune, und Piraten von der kroatischen K\u00fcste w\u00fcrgten ihre Handelsrouten ab. Also segelte Doge Pietro Orseolo II. mit der gesamten Flotte \u00fcber die Adria, zerschlug die Piraten und nahm die K\u00fcste ein. Er kehrte am Himmelfahrtstag zur\u00fcck und feierte, indem er aufs offene Meer hinausfuhr und es zum venezianischen Eigentum erkl\u00e4rte. Jeder Doge nach ihm wiederholte diesen Schwur. Gleicher Tag. Jedes Jahr.' },
    { text: '1177 bekam die Zeremonie ein Upgrade. Papst Alexander III. war auf der Flucht vor Kaiser Friedrich Barbarossa \u2014 dem m\u00e4chtigsten Mann Europas \u2014 und Venedig bot ihm Zuflucht und vermittelte einen Frieden. Der dankbare Papst \u00fcberreichte dem Dogen einen goldenen Ring und erkl\u00e4rte, Venedig habe von nun an Gottes Segen, sich jedes Jahr mit der Adria zu \u201everm\u00e4hlen\u201c. Man nannte es Sposalizio del Mare \u2014 die Hochzeit mit dem Meer. Es war kein Machtspiel mehr. Es war heilig.' },
    { text: 'Das wahre Spektakel war aber der Bucintoro \u2014 die Zeremonialbarke des Dogen. Die letzte Version von 1729 ma\u00df 35 Meter, war mit Blattgold \u00fcberzogen, in rote Seide geh\u00fcllt und wurde von 168 Ruderern angetrieben. Diplomaten schrieben nach Hause, nichts in ganz Europa \u2014 keine Kr\u00f6nung, nicht einmal die Feste von Versailles \u2014 k\u00f6nne es mit diesem goldenen Schiff aufnehmen, das \u00fcbers Wasser glitt, gefolgt von Hunderten Booten, der Doge vorne stehend wie ein Br\u00e4utigam auf dem Weg zum Altar.' },
    { text: 'Die letzte echte Zeremonie fand an Himmelfahrt 1797 statt. Zw\u00f6lf Tage sp\u00e4ter marschierte Napoleons Armee in Venedig ein, und die Republik l\u00f6ste sich selbst auf \u2014 nach 1.100 Jahren ununterbrochener Selbstverwaltung. Napoleon wusste genau, was als N\u00e4chstes kam. Er lie\u00df das Gold vom Bucintoro rei\u00dfen, einschmelzen und den Rest anz\u00fcnden. Die Asche des pr\u00e4chtigsten Schiffs, das je gebaut wurde, landete im selben Wasser, auf dem es einst triumphiert hatte. Er hat Venedig nicht nur erobert. Er hat ihm das Hochzeitskleid verbrannt.' },
    { text: 'Man sagt: Steter Tropfen h\u00f6hlt den Stein. Venedigs Tropfen waren aus Gold \u2014 achthundert Ringe, einer pro Jahr, ins Meer geworfen. Die Zeremonie lebt bis heute weiter, nur wirft jetzt der B\u00fcrgermeister den Ring statt eines Dogen. Denk mal dar\u00fcber nach: Irgendwo am Grund der Adria, im Schlamm vor Venedigs K\u00fcste, liegen rund achthundert Goldringe. Der Preis, den eine Republik zahlte, Jahr f\u00fcr Jahr, um mit dem Meer verheiratet zu bleiben. Und tausend Jahre lang hielt Venedig sein Eheversprechen.' },
  ],
};

// ─── Push each language version ─────────────────────────
async function push(langData) {
  const item = { ...base, ...langData };
  await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log(`\u2705 Pushed ${langData.lang} \u2014 ${langData.title}`);
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
