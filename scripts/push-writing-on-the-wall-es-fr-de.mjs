import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Fields unchanged from English ───────────────────────────────────
const base = {
  siteId: "babylon",
  storyId: "writing-on-the-wall",
  icon: "\u270B",
  tier: "A",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 44.4209, lat: 32.5363 },
  hasAudio: false,
  isFree: true,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
  source: "Daniel 5 (biblical account of Belshazzar's feast); The Nabonidus Chronicle (BM 35382, British Museum); The Cyrus Cylinder (BM 90920, British Museum); Herodotus, Histories I.191 (fall of Babylon); Xenophon, Cyropaedia VII.5 (festival and river diversion); The Verse Account of Nabonidus (BM 38299); Beaulieu, Paul-Alain. The Reign of Nabonidus, King of Babylon 556-539 B.C., Yale University Press, 1989; Kuhrt, Am\u00e9lie. 'The Cyrus Cylinder and Achaemenid Imperial Policy,' Journal for the Study of the Old Testament 25, 1983; Collins, John J. Daniel: A Commentary on the Book of Daniel, Fortress Press, 1993",
  characters: [
    "Belshazzar -- crown prince of Babylon, regent in his father's absence",
    "Nabonidus -- the last king of Babylon, absent in Tayma for a decade",
    "Daniel -- Jewish exile who read the mysterious writing",
    "Cyrus the Great -- Persian king whose army conquered Babylon in a single night",
    "Gobryas (Ugbaru) -- Persian general who entered Babylon through the dry riverbed",
  ],
  era: "October 12, 539 BCE -- the night Babylon fell to Persia",
};

// ═══════════════════════════════════════════════════════════════════════
//  SPANISH (es)
//  Proverb subverted: "No hay plazo que no se cumpla ni deuda que no
//  se pague" — every deadline is met, every debt collected.
// ═══════════════════════════════════════════════════════════════════════
const esItem = {
  ...base,
  lang: "es",
  langStoryId: "es#writing-on-the-wall",

  title: "La escritura en el muro",

  subtitle: "MENE, MENE, TEKEL, UPHARSIN \u2014 la noche en que una mano fantasma dict\u00f3 la sentencia de un imperio en la pared de un palacio",

  excerpt: "En la \u00faltima noche del Imperio babil\u00f3nico, el ej\u00e9rcito persa esperaba fuera de las murallas. Dentro, el pr\u00edncipe heredero organiz\u00f3 un banquete para mil invitados y sirvi\u00f3 vino en copas de oro robadas del Templo de Jerusal\u00e9n. Entonces una mano apareci\u00f3 de la nada y escribi\u00f3 la sentencia de muerte de su imperio en la pared.",

  paragraphs: [
    {
      text: "Hay un dato que deber\u00eda quitarle el sue\u00f1o a cualquier persona con poder: el imperio m\u00e1s grande del mundo antiguo no cay\u00f3 por un asedio. Cay\u00f3 durante una fiesta. La noche del 12 de octubre del 539 a.C., Babilonia \u2014 la ciudad m\u00e1s fortificada jam\u00e1s construida, con murallas tan anchas que los carros pod\u00edan correr encima \u2014 fue conquistada mientras sus gobernantes se emborrachaban. El ej\u00e9rcito persa esperaba fuera. \u00bfY dentro? Serv\u00edan vino.",
    },
    {
      text: "El problema real no era el enemigo de fuera, sino el rey que no estaba. Nab\u00f3nido, el \u00faltimo rey de Babilonia, hab\u00eda abandonado su propia capital diez a\u00f1os antes para irse a un oasis en el desierto llamado Tayma, a mil kil\u00f3metros. Dej\u00f3 a su hijo Baltasar al mando. El festival m\u00e1s sagrado \u2014 el que renovaba el derecho divino del rey \u2014 llevaba una d\u00e9cada sin celebrarse. Los sacerdotes, furiosos. El pueblo, aterrado. Y Persia cerraba el cerco.",
    },
    {
      text: "Aquella \u00faltima noche, Baltasar organiz\u00f3 un banquete para mil nobles. Y tom\u00f3 una decisi\u00f3n que a\u00fan resuena en la historia: mand\u00f3 traer las copas de oro y plata que Nabucodonosor \u2014 el m\u00e1s grande rey de Babilonia \u2014 hab\u00eda saqueado del Templo de Jerusal\u00e9n casi cincuenta a\u00f1os antes. Eran objetos sagrados, consagrados al Dios de Israel. Baltasar y sus invitados bebieron de ellas como vasos de fiesta, brindando por sus propios dioses de oro y piedra.",
    },
    {
      text: "Entonces pas\u00f3. Una mano humana \u2014 sin brazo, sin cuerpo, solo dedos \u2014 apareci\u00f3 de la nada y empez\u00f3 a escribir en la pared del palacio. Baltasar lo vio en directo. Se le fue el color de la cara. Las rodillas le fallaron. Llam\u00f3 a gritos a todos los sabios y astr\u00f3logos de Babilonia, prometiendo riquezas y poder a quien descifrase aquellas palabras. Nadie pudo.",
    },
    {
      text: "Al final, alguien se acord\u00f3 de Daniel \u2014 un exiliado jud\u00edo, ya anciano, tra\u00eddo a Babilonia como adolescente sesenta y seis a\u00f1os antes. Entr\u00f3, rechaz\u00f3 las recompensas y ley\u00f3 la pared: MENE, MENE, TEKEL, UPHARSIN. Eran palabras en arameo con doble filo. Como sustantivos, unidades de peso cada vez menores \u2014 mina, siclo, media mina \u2014 el valor menguante de los reyes de Babilonia. Como verbos, una sentencia de muerte: Contado. Pesado. Dividido. Tu reino se acab\u00f3. Persia se lo cobra esta noche.",
    },
    {
      text: "Esa misma noche, los persas actuaron. Ciro el Grande envi\u00f3 a sus ingenieros a desviar el r\u00edo \u00c9ufrates aguas arriba. El r\u00edo cruzaba Babilonia de lado a lado, entrando y saliendo por compuertas en las murallas. Cuando el agua baj\u00f3, los soldados persas caminaron por el cauce, se colaron bajo las compuertas sin vigilancia y tomaron la ciudad desde dentro. Babilonia cay\u00f3 sin que nadie luchase.",
    },
    {
      text: "Baltasar muri\u00f3 antes del amanecer. Ciro entr\u00f3 en Babilonia diecisiete d\u00edas despu\u00e9s \u2014 no como destructor, sino como libertador. Restaur\u00f3 los templos, honr\u00f3 a los dioses locales y firm\u00f3 un decreto que cambi\u00f3 la historia: los jud\u00edos pod\u00edan volver a casa y reconstruir su Templo en Jerusal\u00e9n. El Cautiverio Babil\u00f3nico \u2014 casi cincuenta a\u00f1os de exilio forzoso \u2014 hab\u00eda terminado. Las copas sagradas volver\u00edan a la ciudad de la que fueron robadas.",
    },
    {
      text: "Dicen que no hay plazo que no se cumpla ni deuda que no se pague, pero los imperios nunca escuchan. No anuncian su fin: organizan fiestas. Beben de copas robadas. Cuentan sus murallas y se convencen de que lo que lleva siglos en pie no puede caer en una sola noche. Pero la historia siempre pasa cuentas, y a todo reino le llega su balanza \u2014 mene, tekel, upharsin. La escritura siempre est\u00e1 en el muro. La pregunta es si alguien est\u00e1 lo bastante sobrio para leerla.",
    },
  ],

  moralOrLesson: "Los imperios no anuncian su final. Organizan banquetes. Beben de copas de oro. Cuentan sus murallas y se convencen de que lo que lleva siglos en pie no puede caer en una sola noche. Pero la historia siempre pasa cuentas, y a todo reino le llega la hora de ser pesado en la balanza \u2014 mene, tekel, upharsin \u2014 contado, pesado, dividido. La escritura siempre est\u00e1 en el muro. La pregunta es si alguien est\u00e1 lo bastante sobrio para leerla.",
};

// ═══════════════════════════════════════════════════════════════════════
//  FRENCH (fr)
//  Proverb subverted: "Apr\u00e8s moi, le d\u00e9luge" \u2014 but the deluge
//  (river diversion) didn't wait. It came for him while he drank.
// ═══════════════════════════════════════════════════════════════════════
const frItem = {
  ...base,
  lang: "fr",
  langStoryId: "fr#writing-on-the-wall",

  title: "L'\u00e9criture sur le mur",

  subtitle: "MENE, MENE, TEKEL, UPHARSIN \u2014 la nuit o\u00f9 une main fant\u00f4me \u00e9crivit l'arr\u00eat de mort d'un empire sur le mur d'un palais",

  excerpt: "La derni\u00e8re nuit de l'Empire babylonien, une arm\u00e9e perse attendait devant les murailles. \u00c0 l'int\u00e9rieur, le prince h\u00e9ritier offrait un festin \u00e0 mille convives et servait du vin dans les coupes d'or pill\u00e9es au Temple de J\u00e9rusalem. C'est alors qu'une main surgit de nulle part et inscrivit sur le mur l'arr\u00eat de mort de son empire.",

  paragraphs: [
    {
      text: "Il y a un fait qui devrait hanter toute personne au pouvoir\u00a0: le plus grand empire du monde antique n'est pas tomb\u00e9 apr\u00e8s un si\u00e8ge. Il est tomb\u00e9 pendant une f\u00eate. La nuit du 12 octobre 539 av. J.-C., Babylone \u2014 la ville la plus fortifi\u00e9e jamais b\u00e2tie, avec des murailles si larges que des chars pouvaient y rouler c\u00f4te \u00e0 c\u00f4te \u2014 a \u00e9t\u00e9 conquise pendant que ses dirigeants se so\u00fblaient. L'arm\u00e9e perse campait devant les portes. Et \u00e0 l'int\u00e9rieur\u00a0? On servait du vin.",
    },
    {
      text: "Le vrai probl\u00e8me n'\u00e9tait pas l'ennemi dehors \u2014 c'\u00e9tait le roi absent. Nabonide, dernier roi de Babylone, avait quitt\u00e9 sa capitale dix ans plus t\u00f4t pour une oasis du d\u00e9sert appel\u00e9e Tayma, \u00e0 mille kilom\u00e8tres de l\u00e0. Son fils Balthazar g\u00e9rait l'empire. La f\u00eate la plus sacr\u00e9e \u2014 celle qui renouvelait le droit divin du roi \u2014 n'avait pas eu lieu depuis une d\u00e9cennie. Les pr\u00eatres \u00e9taient furieux. Le peuple, terrifi\u00e9. Et la Perse resserrait l'\u00e9tau.",
    },
    {
      text: "Cette derni\u00e8re nuit, Balthazar offre un festin \u00e0 mille nobles. Puis il prend une d\u00e9cision qui r\u00e9sonne encore aujourd'hui\u00a0: il fait apporter les coupes d'or et d'argent que Nabuchodonosor \u2014 le plus grand roi de Babylone \u2014 avait pill\u00e9es au Temple de J\u00e9rusalem pr\u00e8s de cinquante ans plus t\u00f4t. Des vases sacr\u00e9s, consacr\u00e9s au Dieu d'Isra\u00ebl. Balthazar et ses convives boivent dedans comme dans de vulgaires gobelets, trinquant \u00e0 leurs dieux d'or et de pierre.",
    },
    {
      text: "C'est l\u00e0 que \u00e7a arrive. Une main humaine \u2014 sans bras, sans corps, juste des doigts \u2014 appara\u00eet de nulle part et se met \u00e0 \u00e9crire sur le mur du palais. Balthazar la voit en direct. Son visage bl\u00eamit. Ses genoux l\u00e2chent. Il appelle \u00e0 grands cris tous les sages et astrologues de Babylone, promettant richesses et pouvoir \u00e0 quiconque d\u00e9chiffrera ces mots. Personne n'y parvient.",
    },
    {
      text: "Quelqu'un finit par se souvenir de Daniel \u2014 un exil\u00e9 juif, d\u00e9sormais un vieil homme, amen\u00e9 \u00e0 Babylone adolescent soixante-six ans plus t\u00f4t. Il entre, refuse les r\u00e9compenses et lit le mur\u00a0: MENE, MENE, TEKEL, UPHARSIN. Des mots aram\u00e9ens \u00e0 double tranchant. Comme noms, des unit\u00e9s de poids d\u00e9croissantes \u2014 mine, sicle, demi-mine \u2014 tra\u00e7ant la valeur d\u00e9clinante des rois de Babylone. Comme verbes, un arr\u00eat de mort\u00a0: Compt\u00e9. Pes\u00e9. Divis\u00e9. Ton royaume est fini. La Perse le prend cette nuit.",
    },
    {
      text: "Cette m\u00eame nuit, les Perses passent \u00e0 l'action. Cyrus le Grand envoie ses ing\u00e9nieurs d\u00e9tourner l'Euphrate en amont. Le fleuve traversait Babylone de part en part, entrant et sortant par des portes dans les remparts. Quand le niveau baisse, les soldats perses remontent le lit \u00e0 pied, se glissent sous les portes fluviales sans surveillance et prennent la ville de l'int\u00e9rieur. Babylone tombe sans combattre.",
    },
    {
      text: "Balthazar est mort avant l'aube. Cyrus entre dans Babylone dix-sept jours plus tard \u2014 pas en conqu\u00e9rant, mais en lib\u00e9rateur. Il restaure les temples, honore les dieux locaux et publie un d\u00e9cret qui change l'histoire\u00a0: les Juifs exil\u00e9s peuvent rentrer chez eux et reconstruire leur Temple \u00e0 J\u00e9rusalem. La captivit\u00e9 babylonienne \u2014 pr\u00e8s de cinquante ans d'exil forc\u00e9 \u2014 est termin\u00e9e. Les coupes sacr\u00e9es retourneront \u00e0 la ville d'o\u00f9 elles avaient \u00e9t\u00e9 vol\u00e9es.",
    },
    {
      text: "Balthazar croyait pouvoir dire \u00ab\u00a0apr\u00e8s moi, le d\u00e9luge\u00a0\u00bb. Mais le d\u00e9luge n'a pas attendu\u00a0: il est venu le chercher pendant qu'il buvait. Les empires n'annoncent jamais leur fin. Ils donnent des f\u00eates. Ils boivent dans des coupes vol\u00e9es. Ils comptent leurs murailles et se persuadent que ce qui tient debout depuis des si\u00e8cles ne peut pas tomber en une nuit. Mais l'histoire rend toujours son verdict \u2014 mene, tekel, upharsin. L'\u00e9criture est toujours sur le mur. Encore faut-il \u00eatre assez sobre pour la lire.",
    },
  ],

  moralOrLesson: "Les empires n'annoncent jamais leur fin. Ils donnent des f\u00eates. Ils boivent dans des coupes d'or. Ils comptent leurs murailles et se persuadent que ce qui tient debout depuis des si\u00e8cles ne peut pas tomber en une nuit. Mais l'histoire rend toujours son verdict, et chaque royaume finit par \u00eatre pes\u00e9 dans la balance \u2014 mene, tekel, upharsin \u2014 compt\u00e9, pes\u00e9, divis\u00e9. L'\u00e9criture est toujours sur le mur. La question est de savoir si quelqu'un est assez sobre pour la lire.",
};

// ═══════════════════════════════════════════════════════════════════════
//  GERMAN (de)
//  Proverb subverted: "Das Ma\u00df ist voll" \u2014 but in Babylon, the
//  measure wasn't just full. It was weighed \u2014 and found too light.
// ═══════════════════════════════════════════════════════════════════════
const deItem = {
  ...base,
  lang: "de",
  langStoryId: "de#writing-on-the-wall",

  title: "Die Schrift an der Wand",

  subtitle: "MENE, MENE, TEKEL, UPHARSIN \u2014 die Nacht, in der eine Geisterhand das Todesurteil eines Imperiums an eine Palastwand schrieb",

  excerpt: "In der letzten Nacht des Babylonischen Reiches wartete eine persische Armee vor den Mauern. Drinnen gab der Kronprinz ein Festmahl f\u00fcr tausend G\u00e4ste und schenkte Wein in goldene Becher, die aus dem Tempel von Jerusalem geraubt worden waren. Da erschien eine Hand aus dem Nichts und schrieb das Todesurteil seines Reiches an die Wand.",

  paragraphs: [
    {
      text: "Es gibt eine Tatsache, die jeden M\u00e4chtigen dieser Welt um den Schlaf bringen sollte: Das gr\u00f6\u00dfte Imperium der antiken Welt fiel nicht durch eine Belagerung. Es fiel w\u00e4hrend eines Festes. In der Nacht des 12. Oktober 539 v. Chr. wurde Babylon \u2014 die am st\u00e4rksten befestigte Stadt, die je gebaut wurde, mit Mauern so breit, dass Streitwagen darauf fahren konnten \u2014 erobert, w\u00e4hrend seine Herrscher sich betranken. Drau\u00dfen lagerte die persische Armee. Und drinnen? Wurde Wein eingeschenkt.",
    },
    {
      text: "Das eigentliche Problem war nicht der Feind vor den Toren \u2014 es war der K\u00f6nig, der fehlte. Nabonid, letzter K\u00f6nig Babylons, hatte seine Hauptstadt zehn Jahre zuvor verlassen und lebte in Tayma, einer W\u00fcstenoase tausend Kilometer entfernt. Sein Sohn Belsazar f\u00fchrte die Gesch\u00e4fte. Das heiligste Fest \u2014 jenes, das den g\u00f6ttlichen Herrschaftsanspruch des K\u00f6nigs erneuerte \u2014 war seit einem Jahrzehnt ausgefallen. Die Priester waren w\u00fctend. Das Volk ver\u00e4ngstigt. Und Persien r\u00fcckte n\u00e4her.",
    },
    {
      text: "In dieser letzten Nacht gab Belsazar ein Festmahl f\u00fcr tausend Adlige. Dann traf er eine Entscheidung, die bis heute nachhallt: Er lie\u00df die goldenen und silbernen Becher bringen, die Nebukadnezar \u2014 Babylons gr\u00f6\u00dfter K\u00f6nig \u2014 fast f\u00fcnfzig Jahre zuvor aus dem j\u00fcdischen Tempel in Jerusalem geraubt hatte. Heilige Gef\u00e4\u00dfe, dem Gott Israels geweiht. Belsazar und seine G\u00e4ste tranken daraus wie aus Partybechern und stie\u00dfen auf ihre eigenen G\u00f6tter aus Gold und Stein an.",
    },
    {
      text: "Dann geschah es. Eine menschliche Hand \u2014 kein Arm, kein K\u00f6rper, nur Finger \u2014 erschien aus dem Nichts und begann, an die Palastwand zu schreiben. Belsazar sah es in Echtzeit. Sein Gesicht wurde kreidebleich. Seine Knie gaben nach. Er schrie nach jedem Weisen und Astrologen Babylons und versprach Reichtum und Macht, wer immer die Worte entziffern k\u00f6nnte. Niemand konnte es.",
    },
    {
      text: "Schlie\u00dflich erinnerte man sich an Daniel \u2014 ein j\u00fcdischer Verbannter, inzwischen ein alter Mann, als Jugendlicher vor sechsundsechzig Jahren nach Babylon verschleppt. Er kam, lehnte die Belohnungen ab und las die Wand: MENE, MENE, TEKEL, UPHARSIN. Aram\u00e4ische Worte mit doppeltem Boden. Als Gewichte: Mine, Schekel, halbe Mine \u2014 der schwindende Wert babylonischer K\u00f6nige. Als Verben: ein Todesurteil. Gez\u00e4hlt. Gewogen. Geteilt. Dein Reich ist am Ende. Persien holt es sich noch heute Nacht.",
    },
    {
      text: "In derselben Nacht schlugen die Perser zu. Kyros der Gro\u00dfe schickte seine Ingenieure flussaufw\u00e4rts, um den Euphrat umzuleiten. Der Fluss floss mitten durch Babylon, durch Tore in den gewaltigen Mauern hinein und wieder hinaus. Als der Wasserstand sank, wateten persische Soldaten durch das flache Flussbett, schl\u00fcpften unter den unbewachten Flusstoren hindurch und nahmen die Stadt von innen. Babylon fiel ohne einen einzigen Kampf.",
    },
    {
      text: "Belsazar war tot vor Sonnenaufgang. Kyros betrat Babylon siebzehn Tage sp\u00e4ter \u2014 nicht als Zerst\u00f6rer, sondern als Befreier. Er stellte die Tempel wieder her, ehrte die lokalen G\u00f6tter und erlie\u00df ein Dekret, das Geschichte schrieb: Die verbannten Juden durften heimkehren und ihren Tempel in Jerusalem wieder aufbauen. Die Babylonische Gefangenschaft \u2014 fast f\u00fcnfzig Jahre Zwangsexil \u2014 war vorbei. Die heiligen Becher w\u00fcrden in die Stadt zur\u00fcckkehren, aus der sie gestohlen worden waren.",
    },
    {
      text: "Man sagt: Das Ma\u00df ist voll. Aber in Babylon war es schlimmer \u2014 das Ma\u00df wurde gewogen und f\u00fcr zu leicht befunden. Imperien k\u00fcndigen ihr Ende nicht an. Sie feiern Feste. Sie trinken aus gestohlenen Bechern. Sie z\u00e4hlen ihre Mauern und reden sich ein, was Jahrhunderte steht, f\u00e4llt nicht in einer Nacht. Doch die Geschichte f\u00fchrt eigene B\u00fccher, und jedes Reich wird gewogen \u2014 mene, tekel, upharsin. Die Schrift steht immer an der Wand. Die Frage ist nur, ob jemand n\u00fcchtern genug ist, sie zu lesen.",
    },
  ],

  moralOrLesson: "Imperien k\u00fcndigen ihr Ende nicht an. Sie feiern Feste. Sie trinken aus goldenen Bechern. Sie z\u00e4hlen ihre Mauern und reden sich ein, dass etwas, das seit Jahrhunderten steht, nicht in einer Nacht fallen kann. Aber die Geschichte f\u00fchrt ihre eigene Rechnung, und jedes Reich wird am Ende gewogen \u2014 mene, tekel, upharsin \u2014 gez\u00e4hlt, gewogen, geteilt. Die Schrift steht immer an der Wand. Die Frage ist nur, ob jemand n\u00fcchtern genug ist, sie zu lesen.",
};

// ═══════════════════════════════════════════════════════════════════════
//  VALIDATION
// ═══════════════════════════════════════════════════════════════════════
function validate(item, label) {
  const errors = [];

  if (!item.siteId) errors.push("missing siteId");
  if (!item.langStoryId) errors.push("missing langStoryId");
  if (!item.lang) errors.push("missing lang");
  if (!item.storyId) errors.push("missing storyId");
  if (!item.title) errors.push("missing title");
  if (!item.subtitle) errors.push("missing subtitle");
  if (!item.excerpt) errors.push("missing excerpt");
  if (!item.moralOrLesson) errors.push("missing moralOrLesson");
  if (!Array.isArray(item.paragraphs) || item.paragraphs.length === 0)
    errors.push("missing or empty paragraphs");

  // Check paragraph constraints
  for (let i = 0; i < item.paragraphs.length; i++) {
    const p = item.paragraphs[i];
    if (!p.text) {
      errors.push(`paragraph ${i + 1}: missing text`);
      continue;
    }
    if (p.text.length > 600) {
      errors.push(`paragraph ${i + 1}: ${p.text.length} chars (soft limit 500)`);
    }
  }

  // Check langStoryId matches lang
  if (!item.langStoryId.startsWith(item.lang + "#")) {
    errors.push(`langStoryId "${item.langStoryId}" doesn't start with "${item.lang}#"`);
  }

  if (errors.length > 0) {
    console.error(`\n\u274c VALIDATION FAILED for ${label}:`);
    errors.forEach((e) => console.error(`   - ${e}`));
    return false;
  }

  console.log(`\u2705 ${label} validation passed (${item.paragraphs.length} paragraphs)`);

  // Print char counts
  let totalChars = 0;
  item.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    totalChars += chars;
    console.log(`   P${i + 1}: ${chars} chars`);
  });
  console.log(`   Total paragraph chars: ${totalChars}`);

  return true;
}

// ═══════════════════════════════════════════════════════════════════════
//  PUSH & VERIFY
// ═══════════════════════════════════════════════════════════════════════
async function pushAndVerify(item, label) {
  console.log(`\n--- Pushing ${label} ---`);
  await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log(`\u2705 ${label} pushed to DynamoDB.`);

  // Verify with GetItem
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: item.siteId, langStoryId: item.langStoryId },
    })
  );

  if (result.Item && result.Item.title === item.title) {
    console.log(
      `\u2705 ${label} verified: title="${result.Item.title}", ` +
        `paragraphs=${result.Item.paragraphs.length}, ` +
        `lang="${result.Item.lang}"`
    );
  } else {
    throw new Error(`${label} verification FAILED \u2014 item not found or title mismatch`);
  }
}

// ═══════════════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════════════
async function main() {
  console.log("=== Writing on the Wall \u2014 es/fr/de push ===\n");
  console.log(`Timestamp: ${now}\n`);

  // Validate all three before pushing anything
  const esOk = validate(esItem, "Spanish (es)");
  const frOk = validate(frItem, "French (fr)");
  const deOk = validate(deItem, "German (de)");

  if (!esOk || !frOk || !deOk) {
    console.error("\nAborting: fix validation errors first.");
    process.exit(1);
  }

  // Push Spanish
  await pushAndVerify(esItem, "Spanish (es)");

  // Push French
  await pushAndVerify(frItem, "French (fr)");

  // Push German
  await pushAndVerify(deItem, "German (de)");

  console.log("\n\ud83c\udf89 All done! es, fr, and de records pushed and verified.");
}

main().catch((err) => {
  console.error("\n\u274c Fatal error:", err);
  process.exit(1);
});
