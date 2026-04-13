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
  siteId: 'jerusalem-old-city',
  storyId: 'night-journey-isra-miraj',
  icon: '🌙',
  tier: 'S',
  source: 'Quran, Surah Al-Isra 17:1; Sahih al-Bukhari, Book of Merits of the Helpers, Hadith 3887 (Night Journey account); Sahih Muslim, Book of Faith, Hadith 162; Ibn Hisham, Al-Sirah al-Nabawiyyah (Life of the Prophet); al-Tabari, Tarikh al-Rusul wa\'l-Muluk (History of Prophets and Kings); Creswell, K.A.C., Early Muslim Architecture (Dome of the Rock); Colby, Frederick, Narrating Muhammad\'s Night Journey, 2008; Vuckovic, Brooke Olson, Heavenly Journeys, Earthly Concerns, 2005',
  characters: [
    'Prophet Muhammad',
    'Angel Jibril (Gabriel)',
    'The Buraq (celestial steed)',
    'Prophet Musa (Moses)',
    'Prophet Ibrahim (Abraham)',
    'Abu Bakr al-Siddiq',
  ],
  era: 'c. 621 CE (the Isra and Mi\'raj); 691 CE (Dome of the Rock construction)',
  readingTimeMinutes: 10,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 35.2355, lat: 31.7777 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «El Viaje Nocturno»
//  Proverb: «Dios aprieta pero no ahoga»
//  — subverted: God squeezed to the absolute limit…
//    and then opened the sky
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#night-journey-isra-miraj',
  title: 'El Viaje Nocturno',
  subtitle: 'Un profeta roto, un corcel alado y un ascenso por siete cielos que cambió el mundo para siempre',
  excerpt: 'Corría el año 619. Los musulmanes lo llaman el Año de la Tristeza, y el nombre se queda corto. Muhammad llevaba años predicando un mensaje que incomodaba a los poderosos de La Meca.',
  moralOrLesson: 'Las revelaciones más profundas no llegan en los momentos de triunfo, sino en los de absoluta desesperación — cuando todo lo que nos sostenía ha sido arrancado. A Muhammad no le fue dado el cielo cuando era victorioso, sino cuando estaba roto; no cuando el mundo lo celebraba, sino cuando le arrojaba piedras. El Viaje Nocturno enseña que el dolor, soportado con fe, puede convertirse en la puerta hacia lo infinito.',
  paragraphs: [
    {
      text: 'Corría el año 619. Los musulmanes lo llaman el Año de la Tristeza, y el nombre se queda corto. Muhammad llevaba años predicando un mensaje que incomodaba a los poderosos de La Meca. Pero tenía dos escudos: su tío Abu Talib, que lo protegía por puro orgullo de sangre, y su esposa Jadiya, la primera persona que le creyó cuando bajó temblando de una cueva diciendo que un ángel le había hablado. Ese año los perdió a los dos. Sin protector. Sin refugio. Intentó buscar aliados en la ciudad de Taif. Lo recibieron a pedradas.',
    },
    {
      text: 'Dicen que Dios aprieta pero no ahoga. Aquella noche apretó hasta el límite — y luego abrió el cielo. En su momento más oscuro, con cincuenta años y la sangre aún seca en las sandalias, apareció el ángel Yibril con una criatura llamada Buraq: un corcel alado cuyo paso cubría el horizonte. En un instante cruzaron mil doscientos kilómetros de desierto hasta Jerusalén, hasta el Monte del Templo — la colina donde Abraham levantó el cuchillo sobre su hijo y Salomón construyó su templo.',
    },
    {
      text: 'Dentro del santuario lo esperaba algo imposible: todos los profetas que Dios había enviado desde el principio de los tiempos. Yibril le dijo que dirigiera la oración. El último profeta guió a los primeros. Después, desde la misma roca donde estuvo el Sanctasanctórum judío, Muhammad ascendió por siete cielos. En cada uno lo recibió un profeta. Adán en el primero, llorando por las almas perdidas. Jesús y Juan Bautista en el segundo. José en el tercero, al que Dios le había dado «la mitad de toda la belleza».',
    },
    {
      text: 'Moisés lo esperaba en el sexto cielo, llorando porque la comunidad de Muhammad sería más numerosa que la suya. En el séptimo, Abraham — padre de las tres grandes religiones — estaba recostado contra la Kaaba celestial y le sonrió. Pero el viaje no había terminado. Muhammad siguió solo. Ni siquiera Yibril pudo acompañarlo: «Un paso más y me consumo». Llegó al Árbol del Loto del Límite Extremo, el borde mismo de la creación. Allí, frente a frente con Dios, recibió una orden: cincuenta oraciones diarias.',
    },
    {
      text: 'Aceptó sin rechistar. Pero al bajar, Moisés lo frenó. «Conozco a la gente. No van a poder con eso — yo lo intenté con los israelitas.» Muhammad volvió a subir. Cuarenta. Moisés negó con la cabeza. Treinta. Veinte. Diez. Al final quedaron cinco, cada una con el valor de diez. Moisés insistió en que pidiera menos. Muhammad respondió: «He pedido tantas veces que me da vergüenza. Acepto cinco.» Esas cinco oraciones siguen marcando el día de dos mil millones de personas.',
    },
    {
      text: 'Cuando volvió a La Meca, su cama todavía estaba tibia. No había pasado ni una noche. Los líderes se rieron: ¿un viaje de ida y vuelta a Jerusalén en unas horas? Le exigieron que describiera una ciudad que jamás había visitado. Dios puso una visión ante sus ojos y describió puertas, murallas y edificios con exactitud perfecta. La mayoría lo llamó mentiroso. Pero su amigo más cercano, Abu Bakr, no dudó ni un segundo: «Si él dice que pasó, pasó.» Desde ese día lo conocieron como al-Siddiq — el Confirmador.',
    },
    {
      text: 'Setenta años después, el califa Abd al-Malik levantó la Cúpula de la Roca sobre la piedra desde la que Muhammad subió al cielo. El muro occidental del Monte del Templo — el Muro de los Lamentos para los judíos — los musulmanes lo llaman el Muro del Buraq, por el corcel que lo llevó entre las estrellas. Una sola noche convirtió a Jerusalén en la tercera ciudad más sagrada del islam. Una roca. Tres religiones. Y la misma búsqueda antigua e inacabada de tocar el cielo.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Le Voyage Nocturne»
//  Proverb: «Jamais deux sans trois»
//  — subverted: Three blows came, as the proverb promised.
//    But the proverb says nothing about what comes AFTER
//    the third. That night, heaven opened.
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#night-journey-isra-miraj',
  title: 'Le Voyage Nocturne',
  subtitle: 'Un prophète brisé, une monture ailée et une ascension à travers sept cieux qui a changé le monde à jamais',
  excerpt: 'On est en 619. Les musulmans appellent ça l\'Année du Chagrin — et le mot est faible. Muhammad prêchait depuis des années un message qui dérangeait les puissants de La Mecque.',
  moralOrLesson: 'Les révélations les plus profondes ne viennent pas dans les moments de triomphe, mais dans ceux de désespoir absolu — quand tout ce qui nous soutenait a été arraché. Le ciel n\'a pas été offert à Muhammad quand il était victorieux, mais quand il était brisé ; pas quand le monde le célébrait, mais quand on lui jetait des pierres. Le Voyage Nocturne enseigne que le chagrin, enduré avec foi, peut devenir la porte vers l\'infini.',
  paragraphs: [
    {
      text: 'On est en 619. Les musulmans appellent ça l\'Année du Chagrin — et le mot est faible. Muhammad prêchait depuis des années un message qui dérangeait les puissants de La Mecque. Il avait deux remparts : son oncle Abu Talib, qui le protégeait par pur honneur familial, et sa femme Khadija — la première à l\'avoir cru quand il était redescendu d\'une grotte, tremblant, en disant qu\'un ange lui avait parlé. Cette année-là, il les a perdus tous les deux. Plus de protecteur. Plus de refuge. Il a tenté sa chance à Taïf. On l\'a accueilli à coups de pierres.',
    },
    {
      text: 'Jamais deux sans trois, dit le proverbe. Il avait perdu son protecteur, puis son amour, puis sa dignité sous les pierres de Taïf. Trois coups, comme prévu. Mais le proverbe ne dit pas ce qui vient après le troisième. Cette nuit-là, c\'est le ciel qui s\'est ouvert. L\'ange Jibril est apparu avec une monture ailée appelée le Buraq, dont chaque foulée couvrait l\'horizon. En un instant, ils ont traversé mille deux cents kilomètres de désert jusqu\'à Jérusalem, jusqu\'au Mont du Temple — là où Abraham leva le couteau et Salomon bâtit son temple.',
    },
    {
      text: 'Dans le sanctuaire, l\'impossible l\'attendait : tous les prophètes que Dieu avait envoyés depuis l\'aube des temps. Jibril lui a dit de diriger la prière. Le dernier prophète a guidé les premiers. Depuis la Pierre de la Fondation — le rocher où se trouvait le Saint des Saints du temple juif — Muhammad est monté à travers sept cieux. Dans chacun, un prophète l\'accueillait. Adam dans le premier, en pleurs pour les âmes perdues. Jésus et Jean-Baptiste dans le deuxième. Joseph dans le troisième, « celui à qui Dieu avait donné la moitié de toute beauté ».',
    },
    {
      text: 'Moïse l\'attendait au sixième ciel, en larmes parce que la communauté de Muhammad serait plus grande que la sienne. Au septième, Abraham — le père des trois religions — était adossé à la Kaaba céleste et lui a souri. Mais le voyage n\'était pas fini. Muhammad a continué seul. Même Jibril n\'a pas pu le suivre : « Un pas de plus et je brûle. » Il a atteint le Lotus de la Limite Ultime, la frontière de la création. Là, face à Dieu, il a reçu un ordre : cinquante prières par jour.',
    },
    {
      text: 'Il a accepté. Mais en redescendant, Moïse l\'a arrêté. « Je connais les gens. Ils ne tiendront pas — j\'ai essayé avec les Israélites. » Muhammad est remonté. Quarante. Moïse a secoué la tête. Trente. Vingt. Dix. Finalement cinq, chacune comptant pour dix. Moïse a insisté pour qu\'il demande encore moins. Muhammad a répondu : « J\'ai demandé tant de fois que j\'en ai honte. J\'accepte cinq. » Ces cinq prières rythment encore aujourd\'hui la vie de deux milliards de personnes.',
    },
    {
      text: 'Quand il est revenu à La Mecque, son lit était encore tiède. La nuit n\'était même pas finie. Les chefs ont ri : un aller-retour à Jérusalem en quelques heures ? Ils lui ont demandé de décrire une ville qu\'il n\'avait jamais vue. Dieu a placé une vision devant ses yeux, et il a décrit les portes, les murailles, les bâtiments avec une précision parfaite. La plupart l\'ont traité de menteur. Mais son ami le plus proche, Abu Bakr, n\'a pas hésité : « S\'il dit que c\'est arrivé, c\'est arrivé. » Ce jour-là, on lui a donné le titre d\'al-Siddiq — le Confirmateur.',
    },
    {
      text: 'Soixante-dix ans plus tard, le calife Abd al-Malik a érigé le Dôme du Rocher au-dessus de la pierre d\'où Muhammad s\'était élevé. Le mur ouest du Mont du Temple — que les juifs appellent le Mur des Lamentations — les musulmans le nomment le Mur du Buraq, en mémoire de la monture qui traversa le ciel. Une seule nuit a fait de Jérusalem la troisième ville sainte de l\'islam. Un rocher. Trois religions. Et la même quête ancienne, inachevée, de toucher le ciel.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Die Nachtreise»
//  Proverb: «Wenn die Not am größten, ist Gottes Hilfe
//            am nächsten»
//  — deployed literally: that night, the proverb
//    became the truth
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#night-journey-isra-miraj',
  title: 'Die Nachtreise',
  subtitle: 'Ein gebrochener Prophet, ein geflügeltes Reittier und ein Aufstieg durch sieben Himmel, der die Welt für immer veränderte',
  excerpt: 'Es war das Jahr 619. Die Muslime nennen es das Jahr der Trauer — und selbst das wird dem nicht gerecht. Muhammad predigte seit Jahren eine Botschaft, die den Mächtigen von Mekka gefährlich wurde.',
  moralOrLesson: 'Die tiefsten Offenbarungen kommen nicht in Momenten des Triumphes, sondern in Momenten völliger Verzweiflung — wenn alles, was uns getragen hat, weggerissen wurde. Muhammad wurde der Himmel nicht geschenkt, als er siegreich war, sondern als er gebrochen war; nicht als die Welt ihn feierte, sondern als sie ihn mit Steinen bewarf. Die Nachtreise lehrt, dass Schmerz, mit Glauben ertragen, zum Tor ins Unendliche werden kann.',
  paragraphs: [
    {
      text: 'Es war das Jahr 619. Die Muslime nennen es das Jahr der Trauer — und selbst das wird dem nicht gerecht. Muhammad predigte seit Jahren eine Botschaft, die den Mächtigen von Mekka gefährlich wurde. Zwei Menschen hielten ihn am Leben: sein Onkel Abu Talib, der ihn aus reinem Familienstolz beschützte, und seine Frau Chadidscha — die Erste, die ihm glaubte, als er zitternd aus einer Höhle kam und sagte, ein Engel habe zu ihm gesprochen. In diesem Jahr verlor er beide. Keinen Beschützer. Keine Zuflucht. Er versuchte sein Glück in Taif. Man empfing ihn mit Steinen.',
    },
    {
      text: 'Es gibt ein altes Sprichwort: Wenn die Not am größten, ist Gottes Hilfe am nächsten. In dieser Nacht wurde es wörtlich wahr. Gebrochen, blutend, fünfzig Jahre alt, den Staub von Taif noch auf den Sandalen — da erschien der Engel Dschibril mit einem geflügelten Reittier namens Buraq, dessen Schritt den Horizont überspannte. In einem Augenblick durchquerten sie zwölfhundert Kilometer Wüste bis nach Jerusalem, bis zum Tempelberg — dem Hügel, auf dem Abraham das Messer über seinem Sohn erhob und Salomo seinen Tempel baute.',
    },
    {
      text: 'Im Heiligtum erwartete ihn das Unmögliche: Sämtliche Propheten, die Gott je gesandt hatte, standen dort. Dschibril sagte ihm, er solle das Gebet leiten. Der letzte Prophet führte die ersten. Dann stieg Muhammad von dem Felsen auf, auf dem einst das Allerheiligste des jüdischen Tempels gestanden hatte — und durchquerte sieben Himmel. In jedem empfing ihn ein Prophet. Adam im ersten, weinend über verlorene Seelen. Jesus und Johannes der Täufer im zweiten. Josef im dritten, dem „die Hälfte aller Schönheit" gegeben worden war.',
    },
    {
      text: 'Moses wartete im sechsten Himmel, in Tränen, weil Muhammads Gemeinde größer sein würde als seine eigene. Im siebten lehnte Abraham — Stammvater aller drei Religionen — an der himmlischen Kaaba und lächelte. Doch die Reise war nicht vorbei. Muhammad ging allein weiter. Selbst Dschibril konnte nicht folgen: „Einen Schritt weiter, und ich verbrenne." Er erreichte den Lotusbaum der äußersten Grenze, den Rand der Schöpfung. Dort, vor Gott, empfing er einen Befehl: fünfzig Gebete am Tag.',
    },
    {
      text: 'Er nahm an. Doch auf dem Rückweg hielt Moses ihn auf. „Ich kenne die Menschen. Das schaffen sie nicht — ich habe es mit den Israeliten versucht." Muhammad ging zurück. Vierzig. Moses schüttelte den Kopf. Dreißig. Zwanzig. Zehn. Am Ende fünf, jedes mit dem Wert von zehn. Moses drängte weiter. Muhammad antwortete: „Ich habe so oft gefragt, dass es mir peinlich ist. Ich nehme fünf." Diese fünf Gebete bestimmen bis heute den Tagesrhythmus von zwei Milliarden Menschen.',
    },
    {
      text: 'Als er nach Mekka zurückkehrte, war sein Bett noch warm. Die Nacht war nicht einmal vorbei. Die Anführer lachten: eine Reise nach Jerusalem und zurück in einer einzigen Nacht? Sie verlangten, dass er eine Stadt beschreibe, die er nie gesehen hatte. Gott legte ihm ein Bild vor Augen, und er beschrieb Tore, Mauern und Gebäude mit makelloser Genauigkeit. Die meisten nannten ihn einen Lügner. Aber sein engster Freund Abu Bakr zögerte keine Sekunde: „Wenn er sagt, es ist geschehen, dann ist es geschehen." Seitdem trug er den Titel al-Siddiq — der Bestätiger.',
    },
    {
      text: 'Siebzig Jahre später errichtete Kalif Abd al-Malik den Felsendom über dem Stein, von dem Muhammad aufgestiegen war. Die Westmauer des Tempelbergs — die Juden nennen sie die Klagemauer — heißt bei den Muslimen die Buraq-Mauer, nach dem Reittier, das Muhammad durch den Himmel trug. Eine einzige Nacht machte Jerusalem zur drittheiligsten Stadt des Islam. Ein Felsen. Drei Religionen. Und derselbe uralte, unvollendete Griff nach dem Himmel.',
    },
  ],
};

// ─── Push helper ─────────────────────────────────────────
async function push(item) {
  const record = { ...base, ...item };
  await docClient.send(new PutCommand({ TableName: TABLE, Item: record }));
  console.log(`✓ ${item.lang} pushed — langStoryId: ${item.langStoryId}`);
}

// ─── Execute sequentially ────────────────────────────────
try {
  await push(es);
  await push(fr);
  await push(de);
  console.log('\n✅ All 3 languages pushed successfully.');
} catch (err) {
  console.error('❌ Push failed:', err);
  process.exit(1);
}
