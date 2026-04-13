// Push Spanish (es), French (fr), and German (de) recreations of
// "The Vision of a Thousand Golden Buddhas" to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across all languages) ──────────────────────────
const shared = {
  siteId: "mogao-caves",
  storyId: "yuezun-thousand-buddhas",
  icon: "\u{1F64F}",
  storyCategory: "prophets_pilgrims",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 40.0362, lng: 94.8089 },
  source:
    "Dunhuang Academy historical records; Li Daoyuan, Commentary on the Water Classic",
  era: "Eastern Jin Dynasty (366 AD) through Yuan Dynasty (14th century)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb: "La fe mueve montañas" — subverted: faith doesn't always move
// mountains — sometimes it sculpts them from the inside, cave by cave.
// Register: Modern Spanish storyteller — warm, vivid, conversational.
// Think quality podcast narration (Leyendas, Relatos de la Historia).
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#yuezun-thousand-buddhas",

  title: "La visión de los mil budas dorados",

  subtitle:
    "La visión de un monje errante dio origen a mil años de arte sagrado",

  excerpt:
    "Estamos en el año 366. Un monje budista llamado Yuezun camina solo por el desierto del Gobi, siguiendo la Ruta de la Seda, esa red de caminos que conectaba China con el resto del mundo conocido.",

  moralOrLesson:
    "Un solo instante de visión, sostenido por la fe, puede inspirar mil años de creación.",

  characters: [
    "Monje Yuezun (Lè Zūn)",
    "Monje Faliang",
    "Mercaderes de la Ruta de la Seda",
    "Generaciones de artesanos budistas",
  ],

  paragraphs: [
    {
      text: "Estamos en el año 366. Un monje budista llamado Yuezun camina solo por el desierto del Gobi, siguiendo la Ruta de la Seda, esa red de caminos que conectaba China con el resto del mundo conocido. Lleva días sin ver a nadie. El sol le golpea la cara, el viento le llena los ojos de arena, y todo lo que tiene delante es más desierto. Pero al llegar a un acantilado de piedra cerca del oasis de Dunhuang, justo cuando el sol empieza a caer, su vida cambia para siempre.",
    },
    {
      text: "La última luz del día golpea la arenisca y el acantilado entero parece incendiarse en oro. Y en ese resplandor, Yuezun ve algo que lo deja clavado al suelo: mil budas, enormes, brillantes, llenos de compasión, mirándolo desde la roca. ¿Fue una visión mística? ¿Fue el sol del desierto jugando con la piedra? Da igual. Yuezun cayó de rodillas y, ahí mismo, hizo un juramento.",
    },
    {
      text: "Iba a convertir ese acantilado en algo sagrado. Con sus propias manos, Yuezun talló la primera cueva de meditación en la roca viva. Poco después llegó otro monje, Faliang, y talló una segunda justo al lado. Dos cuevas pequeñas en un acantilado perdido en el desierto. Así empezó todo.",
    },
    {
      text: "Y aquí es donde la historia se vuelve increíble. La noticia corrió por la Ruta de la Seda y la gente no paró de llegar: monjes, artistas, mercaderes, peregrinos. Durante los siguientes mil años, generación tras generación talló y pintó casi quinientas cuevas en ese mismo acantilado. Dunhuang estaba en el cruce de la red comercial más importante del planeta. Los mercaderes ricos financiaban cuevas enteras como ofrenda para pedir protección en la travesía del desierto.",
    },
    {
      text: "No eran simples habitaciones. Cada cueva era una obra maestra. Paredes cubiertas de suelo a techo con pinturas de budas, espíritus y escenas de la vida cotidiana en la Ruta de la Seda. Techos llenos de figuras celestiales en pleno vuelo. Estatuas gigantes de Buda talladas directamente en la roca, la más alta de más de treinta metros. En total, las cuevas de Mogao guardan más de 45.000 metros cuadrados de pinturas murales. Suficiente arte para cubrir unos seis campos de fútbol.",
    },
    {
      text: "Pero la Ruta de la Seda murió. Para el siglo XV, las rutas marítimas habían sustituido al comercio terrestre, y Dunhuang se vació. Las cuevas quedaron a merced del desierto. La arena se amontonó contra las entradas. Las pinturas se quedaron en la oscuridad. Durante casi quinientos años, una de las mayores colecciones de arte jamás creadas estuvo ahí, en silencio, completamente olvidada.",
    },
    {
      text: "En 1900, un sacerdote taoísta llamado Wang Yuanlu estaba limpiando la arena de una de las cuevas cuando encontró una puerta oculta. Detrás había una cámara sellada repleta de más de 50.000 manuscritos antiguos, pinturas y estandartes de seda, algunos con más de mil años de antigüedad. Fue uno de los descubrimientos más importantes de la historia, y las cuevas de Mogao volvieron por fin a la luz.",
    },
    {
      text: "Hoy son Patrimonio de la Humanidad y una de las colecciones de arte más importantes del mundo. Y todo empezó con un monje agotado, solo en el desierto al atardecer, viendo la luz golpear una roca y distinguiendo algo que nadie más podía ver. Dicen que la fe mueve montañas. A veces no. A veces la fe las esculpe por dentro, cueva a cueva, durante mil años.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb: "Petit à petit, l'oiseau fait son nid" — subverted: here the nest
// has 500 caves and the birds took a thousand years.
// Register: Modern French storyteller — fluid, elegant but accessible.
// Think Franck Ferrand, quality France Inter podcast narration.
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#yuezun-thousand-buddhas",

  title: "La vision des mille bouddhas d'or",

  subtitle:
    "La vision d'un moine errant a donné naissance à mille ans d'art sacré",

  excerpt:
    "On est en 366 après Jésus-Christ. Un moine bouddhiste du nom de Yuezun marche seul à travers le désert de Gobi, le long de la Route de la Soie \u2014 ce réseau de pistes commerciales qui reliait la Chine au reste du monde connu.",

  moralOrLesson:
    "Un seul instant de vision, porté par la foi, peut inspirer mille ans de création.",

  characters: [
    "Moine Yuezun (Lè Zūn)",
    "Moine Faliang",
    "Marchands de la Route de la Soie",
    "Générations d'artisans bouddhistes",
  ],

  paragraphs: [
    {
      text: "On est en 366 après Jésus-Christ. Un moine bouddhiste du nom de Yuezun marche seul à travers le désert de Gobi, le long de la Route de la Soie \u2014 ce réseau de pistes commerciales qui reliait la Chine au reste du monde connu. Il est épuisé, brûlé par le soleil, et totalement seul. Puis il arrive au pied d'une falaise de grès, près de la ville-oasis de Dunhuang, juste au moment où le soleil commence à décliner. Et là, tout bascule.",
    },
    {
      text: "La dernière lumière du jour frappe la roche, et la falaise entière semble s'embraser d'une lueur dorée. Dans cette lumière, Yuezun voit quelque chose qui le cloue sur place\u00A0: mille bouddhas, immenses, rayonnants, vibrants de compassion. Était-ce une vision mystique\u00A0? Était-ce simplement le soleil du désert jouant avec la pierre\u00A0? Peu importe. Yuezun est tombé à genoux et a fait un serment, là, dans le sable.",
    },
    {
      text: "Il allait transformer cette falaise en lieu sacré. De ses propres mains, Yuezun a creusé la première grotte de méditation dans la roche. Peu après, un autre moine, Faliang, est arrivé et en a creusé une deuxième juste à côté. Deux petites grottes dans une falaise du désert. C'est comme ça que tout a commencé.",
    },
    {
      text: "Et c'est là que l'histoire devient folle. La nouvelle s'est répandue le long de la Route de la Soie, et les gens n'ont cessé d'affluer\u00A0: moines, artistes, marchands, pèlerins. Pendant mille ans, génération après génération a creusé et peint près de cinq cents grottes dans cette même falaise. Dunhuang était un carrefour majeur du plus grand réseau commercial au monde. Des marchands fortunés finançaient des grottes entières pour implorer une traversée du désert sans encombre.",
    },
    {
      text: "Ce n'étaient pas de simples salles. Chaque grotte était un chef-d'œuvre. Des murs couverts du sol au plafond de peintures de bouddhas, d'esprits et de scènes de la vie sur la Route de la Soie. Des plafonds peuplés de figures célestes en plein vol. Des statues géantes de Bouddha taillées à même la roche, la plus haute dépassant les trente mètres. Au total, les grottes de Mogao abritent plus de 45\u00A0000 mètres carrés de peintures murales. Assez d'art pour recouvrir six terrains de football.",
    },
    {
      text: "Puis la Route de la Soie est morte. Au XVe siècle, les routes maritimes avaient remplacé le commerce terrestre, et Dunhuang s'est vidée. Les grottes ont été abandonnées au désert. Le sable s'est amoncelé contre les entrées. Les peintures sont restées dans le noir. Pendant près de cinq cents ans, l'une des plus grandes collections d'art jamais créées est restée là, dans le silence, totalement oubliée.",
    },
    {
      text: "En 1900, un prêtre taoïste nommé Wang Yuanlu déblayait le sable d'une des grottes quand il a découvert une porte cachée. Derrière se trouvait une chambre scellée, remplie de plus de 50\u00A0000 manuscrits anciens, de peintures et de bannières de soie \u2014 certains vieux de plus de mille ans. C'était l'une des découvertes les plus importantes de l'histoire, et les grottes de Mogao retrouvaient enfin la lumière.",
    },
    {
      text: "Aujourd'hui, elles sont classées au patrimoine mondial de l'UNESCO et comptent parmi les collections d'art les plus importantes de la planète. On dit que petit à petit, l'oiseau fait son nid. Ici, le nid fait cinq cents grottes, et les oiseaux ont mis mille ans. Mais tout remonte à un seul moine épuisé, debout dans le désert au coucher du soleil, regardant la lumière frapper la roche et voyant ce que personne d'autre ne pouvait voir.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb: "Steter Tropfen höhlt den Stein" — subverted: here it wasn't water,
// but faith — and the stone wasn't hollowed out, but transformed into art.
// Register: Modern German storyteller — engaging, warm, clear.
// Think Terra X narration or quality Deutschlandfunk podcast.
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#yuezun-thousand-buddhas",

  title: "Die Vision der tausend goldenen Buddhas",

  subtitle:
    "Die Vision eines wandernden Mönchs gab den Anstoß für tausend Jahre sakraler Kunst",

  excerpt:
    "Wir schreiben das Jahr 366. Ein buddhistischer Mönch namens Yuezun wandert allein durch die Wüste Gobi, entlang der Seidenstraße \u2014 jenem legendären Handelsnetz, das China mit dem Rest der bekannten Welt verband.",

  moralOrLesson:
    "Ein einziger Augenblick der Vision, getragen vom Glauben, kann tausend Jahre der Schöpfung entfachen.",

  characters: [
    "Mönch Yuezun (Lè Zūn)",
    "Mönch Faliang",
    "Händler der Seidenstraße",
    "Generationen buddhistischer Kunsthandwerker",
  ],

  paragraphs: [
    {
      text: "Wir schreiben das Jahr 366. Ein buddhistischer Mönch namens Yuezun wandert allein durch die Wüste Gobi, entlang der Seidenstraße \u2014 jenem legendären Handelsnetz, das China mit dem Rest der bekannten Welt verband. Er ist erschöpft, von der Sonne verbrannt, völlig auf sich gestellt. Dann erreicht er eine Felswand nahe der Oasenstadt Dunhuang, genau in dem Moment, als die Sonne zu sinken beginnt. Und in diesem Augenblick ändert sich alles.",
    },
    {
      text: "Das letzte Licht des Tages trifft den Sandstein, und die gesamte Felswand scheint in goldenem Feuer aufzulodern. In diesem Leuchten sieht Yuezun etwas, das ihn erstarren lässt: tausend Buddhas, riesig, strahlend, voller Mitgefühl, die ihn aus dem Fels heraus anblicken. War es eine spirituelle Vision? War es einfach die Wüstensonne, die etwas Unglaubliches mit dem Stein anstellte? Es spielte keine Rolle. Yuezun fiel auf die Knie und legte auf der Stelle ein Gelübde ab.",
    },
    {
      text: "Er würde diese Felswand in etwas Heiliges verwandeln. Mit seinen eigenen Händen meißelte Yuezun die erste Meditationshöhle in den Fels. Kurz darauf kam ein anderer Mönch namens Faliang und meißelte eine zweite direkt daneben. Zwei kleine Höhlen in einer Felswand mitten in der Wüste. So fing alles an.",
    },
    {
      text: "Und jetzt wird es richtig verrückt. Die Nachricht verbreitete sich entlang der Seidenstraße, und die Menschen hörten nicht auf zu kommen: Mönche, Künstler, Händler, Pilger. Über die nächsten tausend Jahre meißelten und bemalten Generation um Generation fast fünfhundert Höhlen in dieselbe Felswand. Dunhuang lag an einem der wichtigsten Knotenpunkte des größten Handelsnetzes der Erde. Reiche Kaufleute finanzierten ganze Höhlen als Gebete um sichere Passage durch die Wüste.",
    },
    {
      text: "Das waren keine leeren Räume. Jede Höhle war ein Meisterwerk. Wände vom Boden bis zur Decke bedeckt mit Malereien von Buddhas, Geistern und Alltagsszenen entlang der Seidenstraße. Decken voller schwebender Himmelsfiguren. Riesige Buddha-Statuen \u2014 die größte über dreißig Meter hoch \u2014 direkt aus dem Fels gehauen. Insgesamt beherbergen die Mogao-Höhlen über 45.000 Quadratmeter Wandmalerei. Genug Kunst, um etwa sechs Fußballfelder zu bedecken.",
    },
    {
      text: "Dann starb die Seidenstraße. Im 15. Jahrhundert hatten Seerouten den Überlandhandel ersetzt, und Dunhuang leerte sich. Die Höhlen blieben der Wüste überlassen. Sand türmte sich vor den Eingängen. Die Malereien lagen in der Dunkelheit. Fast fünfhundert Jahre lang stand eine der größten Kunstsammlungen, die je geschaffen wurde, einfach da \u2014 in der Stille, völlig vergessen.",
    },
    {
      text: "Im Jahr 1900 räumte ein taoistischer Priester namens Wang Yuanlu Sand aus einer der Höhlen, als er eine verborgene Tür entdeckte. Dahinter lag eine versiegelte Kammer, vollgepackt mit über 50.000 alten Handschriften, Gemälden und Seidenbannern \u2014 manche mehr als tausend Jahre alt. Es war eine der bedeutendsten Entdeckungen der Geschichte, und die Mogao-Höhlen kehrten endlich ins Licht zurück.",
    },
    {
      text: "Heute sind sie UNESCO-Weltkulturerbe und eine der wichtigsten Kunstsammlungen der Welt. Man sagt, steter Tropfen höhlt den Stein. Hier war es kein Wasser, sondern Glaube \u2014 und er hat den Stein nicht ausgehöhlt, sondern in Kunst verwandelt. Und alles begann mit einem einzigen erschöpften Mönch, der bei Sonnenuntergang allein in der Wüste stand und im Licht auf dem Fels etwas sah, das sonst niemand sehen konnte.",
    },
  ],
};

// ─── Push all three ──────────────────────────────────────────────────────────
const items = [
  { label: "Spanish (es)", data: es },
  { label: "French (fr)", data: fr },
  { label: "German (de)", data: de },
];

for (const { label, data } of items) {
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: data }));
    console.log(`✅  ${label} pushed successfully  →  ${data.langStoryId}`);
  } catch (err) {
    console.error(`❌  ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log("\n🎉  All three language versions pushed to DynamoDB.");
