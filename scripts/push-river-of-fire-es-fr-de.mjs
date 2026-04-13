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
  siteId: 'buda-castle',
  storyId: 'great-siege-1686',
  icon: '\u2694\uFE0F',
  tier: 'A',
  source: 'Habsburg military archives; Ottoman defteris; European gazettes',
  characters: [
    'Charles of Lorraine',
    'Abdurrahman Abdi Pasha (Ottoman Commander)',
    'Eugene of Savoy',
  ],
  era: 'June 18 - September 2, 1686',
  readingTimeMinutes: 2,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 19.039, lat: 47.497 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «El río en llamas»
//  Proverb: «No hay mal que cien años dure» (No evil lasts
//  a hundred years) — subverted: Ottoman rule lasted 145.
// ═══════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: 'es',
  langStoryId: 'es#great-siege-1686',
  title: 'El río en llamas',
  subtitle: '78 días para acabar con 145 años de dominio otomano',
  excerpt: 'Dicen que no hay mal que cien años dure. Pero el dominio otomano sobre Buda —la antigua capital de Hungría, encaramada',
  moralOrLesson: 'La libertad a veces cuesta más que la tiranía.',
  paragraphs: [
    {
      text: 'Dicen que no hay mal que cien años dure. Pero el dominio otomano sobre Buda —la antigua capital de Hungría, encaramada en lo alto de una colina sobre el Danubio— duró 145. En 1686, media Europa decidió que ya bastaba. Un ejército descomunal formado por tropas de Austria, Baviera, Brandeburgo y una docena de estados más se plantó a orillas del río con un solo objetivo: recuperar la ciudad. Lo que vino después fueron 78 días de fuego que convirtieron el Danubio en un espejo de llamas.',
    },
    {
      text: 'El asedio empezó a mediados de junio y el ruido no paró. Los cañones disparaban día y noche —sin tregua, sin descanso— hasta que los soldados dejaron de oír. Cuando los muros de Buda se agrietaban, los atacantes se lanzaban por las brechas, pero los otomanos conocían cada rincón, cada azotea, cada ángulo muerto. El castillo se alzaba sobre un acantilado de piedra caliza. Llegar hasta allí ya era casi imposible. Sobrevivir dentro era otra historia.',
    },
    {
      text: 'Para agosto, las enfermedades mataban más rápido que las balas otomanas. Las trincheras se habían convertido en fosas comunes al aire libre. Los cirujanos se quedaron sin vendas y empezaron a arrancar tela de los uniformes de los muertos. Carlos de Lorena, el general al mando, se enfrentó a una verdad brutal: si Buda no caía antes del invierno, su ejército se desmoronaría solo.',
    },
    {
      text: 'El 2 de septiembre, Carlos lo apostó todo a una última jugada. A media tarde, los soldados cargaban desde todas las direcciones, trepando por los escombros de lo que un día fueron murallas. La lucha fue calle por calle, puerta por puerta, sin cuartel de ningún bando. La ciudad baja cayó en horas. Pero el castillo —encaramado en su roca sobre la ciudad en llamas— se negaba a caer.',
    },
    {
      text: 'Hasta que los muros del castillo cedieron. Los soldados húngaros encabezaron el asalto final —aquella era su capital, y llevaban 145 años esperando este momento. El gobernador otomano, Abdurrahman Abdi Pachá, podía haberse rendido. Eligió morir con la espada en la mano, defendiendo la fortaleza que había jurado proteger. De los diez mil soldados otomanos que defendieron Buda, menos de quinientos salieron con vida.',
    },
    {
      text: 'Pero la palabra «victoria» le queda grande a lo que quedó. Más de veinte mil atacantes yacían muertos entre trincheras y escombros. La ciudad estaba destripada. La Biblioteca Corvina —una de las mayores colecciones de libros de Europa, reunida por el rey Matías dos siglos antes— era solo ceniza. No liberaron una ciudad. Liberaron un cementerio.',
    },
    {
      text: 'Y aun así, el 2 de septiembre de 1686 se convirtió en una de las fechas más celebradas de la historia de Hungría. Las campanas repicaron por todo el país cuando llegó la noticia. Después de casi siglo y medio bajo control otomano, Buda volvía a ser húngara. El precio fue todo lo que la ciudad había sido. Pero para un pueblo que aún recordaba lo que significaba ser libre, hasta las ruinas valían más que el palacio de otro.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Le fleuve en feu»
//  Proverb: «Tout vient à point à qui sait attendre»
//  (Everything comes to those who wait) — subverted:
//  Hungary waited 145 years; what came was ruins.
// ═══════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: 'fr',
  langStoryId: 'fr#great-siege-1686',
  title: 'Le fleuve en feu',
  subtitle: '78 jours pour mettre fin à 145 ans de domination ottomane',
  excerpt: 'Pendant 145 ans, l\u2019Empire ottoman a tenu Buda \u2014 l\u2019ancienne capitale perchée de la Hongrie \u2014 comme l\u2019un de ses',
  moralOrLesson: 'La liberté coûte parfois plus cher que la tyrannie.',
  paragraphs: [
    {
      text: 'Pendant 145 ans, l\u2019Empire ottoman a tenu Buda \u2014 l\u2019ancienne capitale de la Hongrie, perchée sur sa colline au-dessus du Danube \u2014 comme l\u2019un de ses avant-postes les plus précieux en Occident. En 1686, l\u2019Europe a dit stop. Une coalition massive \u2014 Autrichiens, Bavarois, Brandebourgeois et une dizaine d\u2019autres \u2014 s\u2019est rassemblée le long du Danube avec une seule mission\u00A0: reprendre la ville. Ce qui a suivi, ce sont 78 jours d\u2019enfer qui ont transformé le fleuve en miroir de flammes.',
    },
    {
      text: 'Le siège a commencé mi-juin dans un fracas sans fin. Les canons tiraient jour et nuit \u2014 sans relâche, sans pause \u2014 au point que des soldats sont devenus sourds en quelques semaines. Quand des pans de muraille s\u2019effondraient, les assaillants se ruaient dans les brèches. Mais les Ottomans connaissaient chaque recoin, chaque toit, chaque angle mort. Le château dominait le Danube du haut de sa falaise calcaire. Y arriver était déjà un exploit. Rester en vie à l\u2019intérieur, c\u2019était autre chose.',
    },
    {
      text: 'En août, la maladie tuait plus vite que les armes ottomanes. Les tranchées étaient devenues des charniers à ciel ouvert. Les chirurgiens n\u2019avaient plus de bandages \u2014 ils découpaient les uniformes des morts pour panser les vivants. Charles de Lorraine, le général à la tête de ce siège colossal, faisait face à une évidence brutale\u00A0: si Buda ne tombait pas avant l\u2019hiver, son armée s\u2019effondrerait toute seule.',
    },
    {
      text: 'Le 2 septembre, Charles a joué son va-tout. En début d\u2019après-midi, les soldats chargeaient de tous les côtés, escaladant les monceaux de gravats qui avaient été des remparts. Les combats se sont faits rue par rue, porte par porte, sans quartier d\u2019aucun côté. La ville basse est tombée en quelques heures. Mais le château \u2014 dressé sur sa falaise au-dessus de la ville en flammes \u2014 refusait de céder.',
    },
    {
      text: 'Puis les murs du château ont lâché. Les soldats hongrois ont mené l\u2019assaut final \u2014 c\u2019était leur capitale, et ils attendaient ce moment depuis 145 ans. Le gouverneur ottoman, Abdurrahman Abdi Pacha, aurait pu se rendre. Il a choisi de mourir l\u2019épée à la main, en défendant la forteresse qu\u2019il avait juré de tenir. Sur les dix mille soldats ottomans qui défendaient Buda, moins de cinq cents ont survécu.',
    },
    {
      text: 'Mais «\u00A0victoire\u00A0» est un bien grand mot pour ce qu\u2019il restait. Plus de vingt mille assaillants gisaient dans les tranchées et les décombres. La ville était éventrée. La Bibliothèque Corvina \u2014 l\u2019une des plus grandes collections de livres d\u2019Europe, rassemblée par le roi Matthias deux siècles plus tôt \u2014 n\u2019était plus que cendres. On dit que tout vient à point à qui sait attendre. La Hongrie a attendu 145 ans. Ce qui est venu, c\u2019étaient des ruines.',
    },
    {
      text: 'Et pourtant, le 2 septembre 1686 est devenu l\u2019une des dates les plus célébrées de l\u2019histoire hongroise. Les cloches ont sonné dans tout le pays à l\u2019annonce de la nouvelle. Après presque un siècle et demi sous domination ottomane, Buda redevenait hongroise. Le prix, c\u2019était tout ce que la ville avait été. Mais pour un peuple qui n\u2019avait jamais oublié le goût de la liberté, même des ruines valaient plus que le palais d\u2019un autre.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Der Fluss aus Feuer»
//  Proverb: «Was lange währt, wird endlich gut»
//  (What takes long will finally turn out well) — subverted:
//  After 145 years, what came was a graveyard.
// ═══════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: 'de',
  langStoryId: 'de#great-siege-1686',
  title: 'Der Fluss aus Feuer',
  subtitle: '78 Tage, die 145 Jahre osmanischer Herrschaft beendeten',
  excerpt: '145 Jahre lang hielt das Osmanische Reich Buda \u2014 die alte ungarische Hauptstadt auf dem Hügel über der Donau \u2014 als',
  moralOrLesson: 'Freiheit kostet manchmal mehr, als Tyrannei es je tat.',
  paragraphs: [
    {
      text: '145 Jahre lang hielt das Osmanische Reich Buda \u2014 die alte ungarische Hauptstadt auf dem Hügel über der Donau \u2014 als einen seiner wertvollsten Vorposten im Westen. 1686 hatte Europa genug. Eine gewaltige Allianz aus Österreichern, Bayern, Brandenburgern und einem Dutzend weiterer Staaten versammelte sich an der Donau mit einem einzigen Ziel: die Stadt zurückzuholen. Was folgte, waren 78 Tage Inferno, die den Fluss in einen Spiegel aus Flammen verwandelten.',
    },
    {
      text: 'Die Belagerung begann Mitte Juni mit einem Lärm, der nicht mehr aufhörte. Kanonen feuerten Tag und Nacht \u2014 pausenlos, erbarmungslos \u2014 bis Soldaten innerhalb von Wochen taub wurden. Wenn Mauerabschnitte einstürzten, stürmten Angreifer durch die Lücken, nur um von Osmanen niedergemäht zu werden, die jeden Winkel kannten, jedes Dach, jeden toten Winkel. Die Burg thronte auf einem Kalksteinfelsen hoch über der Donau. Dort hinaufzukommen war schwer genug. Drinnen zu überleben war etwas völlig anderes.',
    },
    {
      text: 'Im August töteten Seuchen die Angreifer schneller, als osmanische Waffen es je konnten. Die Gräben waren zu offenen Massengräbern geworden. Die Chirurgen hatten keine Verbände mehr und rissen den Toten die Uniformen vom Leib, um die Lebenden zu versorgen. Karl von Lothringen, der General an der Spitze dieser gewaltigen Belagerung, stand vor einer brutalen Wahrheit: Wenn Buda nicht vor dem Winter fiel, würde seine Armee von selbst zerfallen.',
    },
    {
      text: 'Am 2. September setzte Karl alles auf eine Karte. Am frühen Nachmittag stürmten Soldaten von allen Seiten, kletterten über Trümmer, die einmal Mauern gewesen waren. Gekämpft wurde Straße für Straße, Tür für Tür \u2014 Gnade gab es auf keiner Seite. Die Unterstadt fiel innerhalb von Stunden. Aber die Burg selbst \u2014 hoch oben auf ihrer Klippe über der brennenden Stadt \u2014 weigerte sich zu fallen.',
    },
    {
      text: 'Dann brachen die Burgmauern. Ungarische Soldaten führten den letzten Sturm an \u2014 das hier war ihre Hauptstadt, und sie hatten 145 Jahre auf diesen Moment gewartet. Der osmanische Gouverneur Abdurrahman Abdi Pascha hätte sich ergeben können. Er entschied sich, mit dem Schwert in der Hand zu sterben und die Festung zu verteidigen, die er geschworen hatte zu halten. Von den zehntausend osmanischen Soldaten in Buda überlebten weniger als fünfhundert.',
    },
    {
      text: 'Aber \u201ESieg\u201C ist ein großzügiges Wort für das, was übrig blieb. Über zwanzigtausend Angreifer lagen tot in den Gräben und Trümmern. Die Stadt war ausgeweidet. Die Corvina-Bibliothek \u2014 eine der größten Büchersammlungen Europas, zusammengetragen von König Matthias zwei Jahrhunderte zuvor \u2014 war nur noch Asche. Man sagt, was lange währt, wird endlich gut. Buda hatte 145 Jahre gewartet. Was kam, war ein Friedhof.',
    },
    {
      text: 'Und trotzdem wurde der 2. September 1686 zu einem der meistgefeierten Tage der ungarischen Geschichte. Kirchenglocken läuteten im ganzen Land, als die Nachricht eintraf. Nach fast anderthalb Jahrhunderten unter osmanischer Herrschaft war Buda wieder ungarisch. Der Preis war alles, was die Stadt einmal gewesen war. Aber für ein Volk, das nie vergessen hatte, wie sich Freiheit anfühlt, waren selbst Ruinen mehr wert als der Palast eines Fremden.',
    },
  ],
};

// ─── Push each language ──────────────────────────────────
async function push(item) {
  const label = `${item.lang.toUpperCase()} — "${item.title}"`;
  console.log(`\nPushing ${label} ...`);

  // Validate JSON structure
  if (!item.siteId || !item.langStoryId || !item.paragraphs?.length) {
    throw new Error(`Invalid item structure for ${label}`);
  }

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression: 'attribute_not_exists(siteId) OR lang <> :en',
      ExpressionAttributeValues: { ':en': 'en' },
    })
  );
  console.log(`  ✓ ${label} pushed successfully (${item.paragraphs.length} paragraphs)`);
}

(async () => {
  try {
    await push(es);
    await push(fr);
    await push(de);
    console.log('\n══════════════════════════════════════');
    console.log('  All 3 languages pushed successfully');
    console.log('══════════════════════════════════════\n');
  } catch (err) {
    console.error('\n✗ FAILED:', err.message);
    process.exit(1);
  }
})();
