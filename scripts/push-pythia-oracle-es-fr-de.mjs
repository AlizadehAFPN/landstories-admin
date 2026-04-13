import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const base = {
  siteId: "delphi",
  storyId: "pythia-oracle",
  icon: "\u{1F52E}",
  storyCategory: "riddles_past",
  era: "8th century BCE - 393 CE",
  tier: "S",
  isFree: true,
  hasAudio: false,
  coordinates: { lat: 38.4824, lng: 22.501 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 3,
  source: "Herodotus\u2019s Histories, Plutarch\u2019s Moralia (On the Pythian Oracles), Pausanias\u2019s Description of Greece, Diodorus Siculus\u2019s Bibliotheca Historica",
  updatedAt: now,
  disabled: false,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH
// Proverb: "El hombre propone y Dios dispone" — subverted in paragraph 5
// ═══════════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#pythia-oracle",
  title: "La Pitia \u2014 La voz de Apolo",
  subtitle: "La sacerdotisa que habl\u00f3 por un dios durante m\u00e1s de mil a\u00f1os",
  excerpt: "Durante m\u00e1s de mil a\u00f1os, la persona m\u00e1s poderosa del mundo antiguo no fue un rey ni un general. Fue una mujer, sola en lo m\u00e1s profundo de un templo, respirando los vapores que brotaban de una grieta en la roca.",
  characters: [
    "La Pitia",
    "Apolo",
    "Creso de Lidia",
    "Tem\u00edstocles",
    "Los Sacerdotes de Apolo",
  ],
  moralOrLesson: "El Or\u00e1culo nunca minti\u00f3. Solo se aseguraba de que la verdad tuviera siempre m\u00e1s de una cara. Para entender sus respuestas hac\u00eda falta exactamente lo que los griegos grabaron sobre la puerta de su templo: Con\u00f3cete a ti mismo.",
  paragraphs: [
    {
      text: "Durante m\u00e1s de mil a\u00f1os, la persona m\u00e1s poderosa del mundo antiguo no fue un rey ni un general. Fue una mujer. Sola, sentada sobre un tr\u00edpode de bronce en lo m\u00e1s profundo de un templo, respirando los vapores que brotaban de una grieta en la roca. Era la Pitia, el Or\u00e1culo de Delfos. Los griegos cre\u00edan que cuando ella hablaba, era Apolo, el dios de la profec\u00eda, quien lo hac\u00eda a trav\u00e9s de su boca. Reyes de todo el mundo cruzaban continentes y esperaban meses enteros por el privilegio de hacerle una sola pregunta.",
    },
    {
      text: "La Pitia siempre era una mujer de Delfos. Al principio deb\u00eda ser joven y soltera, hasta que un visitante agredi\u00f3 a una de ellas. Desde entonces, solo se eleg\u00edan mujeres mayores de cincuenta, aunque segu\u00edan vistiendo las t\u00fanicas blancas de doncella. El d\u00eda que era elegida lo dejaba todo: su casa, su familia, hasta su nombre. Desde ese momento, pertenec\u00eda a Apolo. Ser\u00eda su voz hasta el d\u00eda de su muerte.",
    },
    {
      text: "El ritual se celebraba una vez al mes, siempre el d\u00eda siete, el n\u00famero sagrado de Apolo. La Pitia ayunaba, se ba\u00f1aba en un manantial helado de monta\u00f1a y descend\u00eda hasta la c\u00e1mara m\u00e1s profunda y restringida del templo. All\u00ed se sentaba en su tr\u00edpode, justo encima de la grieta. Un gas dulz\u00f3n sub\u00eda desde las entra\u00f1as de la tierra y la dejaba mareada, como flotando. Masticaba hojas de laurel, beb\u00eda agua sagrada y, poco a poco, ca\u00eda en trance.",
    },
    {
      text: "Lo que pasaba despu\u00e9s era aterrador. La Pitia empezaba a temblar, a gritar, a hablar con una voz que los testigos juraban que no era la suya. Sus palabras sal\u00edan en bruto, desordenadas, imposibles de seguir. Pero los sacerdotes que la rodeaban captaban cada sonido y convert\u00edan aquellos gritos en profec\u00edas perfectamente medidas. Siempre eran acertijos. Porque el Or\u00e1culo nunca ment\u00eda \u2014 simplemente se aseguraba de que la verdad tuviera m\u00e1s de un significado.",
    },
    {
      text: "Esos acertijos cambiaron el mundo. Creso, rey de Lidia y el hombre m\u00e1s rico de su \u00e9poca, pregunt\u00f3 si deb\u00eda atacar Persia. La respuesta: \u00abSi cruzas el r\u00edo, un gran imperio caer\u00e1\u00bb. Creso march\u00f3 al este, seguro de su victoria. El imperio que cay\u00f3 fue el suyo. Ya lo dice el refr\u00e1n: el hombre propone y Dios dispone. Solo que con la Pitia, el dios te lo dec\u00eda en la cara y aun as\u00ed no te enterabas.",
    },
    {
      text: "Cuando Atenas enfrent\u00f3 una invasi\u00f3n persa masiva en el 480 a.C., el Or\u00e1culo pronunci\u00f3 otra de sus frases imposibles: \u00abConfiad en los muros de madera\u00bb. La mayor\u00eda pens\u00f3 en fortificaciones. Pero el general Tem\u00edstocles insisti\u00f3 en que Apolo se refer\u00eda a los barcos de guerra. Atenas lo apost\u00f3 todo a su flota y aplast\u00f3 a los persas en la batalla de Salamina. Quien supo descifrar las palabras del dios salv\u00f3 una civilizaci\u00f3n entera.",
    },
    {
      text: "\u00bfQu\u00e9 pasaba realmente en aquella cueva? En 2001, un equipo de ge\u00f3logos descubri\u00f3 que bajo las ruinas del templo se cruzan dos fallas geol\u00f3gicas. Esas grietas pudieron liberar etileno, un gas que en peque\u00f1as dosis produce exactamente lo que describen las fuentes antiguas: una sensaci\u00f3n de flotar, de desprenderte de tu propio cuerpo. Quiz\u00e1s la Pitia simplemente se intoxicaba con los vapores. O quiz\u00e1s hab\u00eda algo m\u00e1s. Lo que importa es esto: la gente cre\u00eda en ella, y esa fe movi\u00f3 ej\u00e9rcitos y derrib\u00f3 reinos.",
    },
    {
      text: "El final lleg\u00f3 en el 393 d.C. El emperador romano Teodosio, cristiano convencido, estaba decidido a acabar con toda la religi\u00f3n griega. Envi\u00f3 un mensajero a Delfos para preguntar si al Or\u00e1culo le quedaba algo por decir. La respuesta es una de las despedidas m\u00e1s sobrecogedoras de la historia: \u00abDecid al emperador que el gran templo ha ca\u00eddo. Apolo ya no tiene refugio, ni laurel sagrado, ni fuente que hable. Hasta el agua ha enmudecido\u00bb. Despu\u00e9s de m\u00e1s de mil a\u00f1os, la voz del dios call\u00f3 para siempre.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FRENCH
// Proverb: "Aide-toi, le ciel t'aidera" — subverted in paragraph 6
// ═══════════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#pythia-oracle",
  title: "La Pythie \u2014 La voix d\u2019Apollon",
  subtitle: "La pr\u00eatresse qui a parl\u00e9 au nom d\u2019un dieu pendant plus de mille ans",
  excerpt: "Pendant plus de mille ans, la personne la plus puissante du monde antique n\u2019\u00e9tait ni un roi ni un g\u00e9n\u00e9ral. C\u2019\u00e9tait une femme, seule dans les profondeurs d\u2019un temple, respirant les vapeurs qui montaient d\u2019une fissure dans la roche.",
  characters: [
    "La Pythie",
    "Apollon",
    "Cr\u00e9sus de Lydie",
    "Th\u00e9mistocle",
    "Les Pr\u00eatres d\u2019Apollon",
  ],
  moralOrLesson: "L\u2019Oracle n\u2019a jamais menti. Elle faisait simplement en sorte que la v\u00e9rit\u00e9 ait toujours plus d\u2019un sens. Pour comprendre ses r\u00e9ponses, il fallait la seule chose que les Grecs avaient grav\u00e9e au fronton de son temple : Connais-toi toi-m\u00eame.",
  paragraphs: [
    {
      text: "Pendant plus de mille ans, la personne la plus puissante du monde antique n\u2019\u00e9tait ni un roi ni un g\u00e9n\u00e9ral. C\u2019\u00e9tait une femme. Assise seule sur un tr\u00e9pied de bronze, dans les profondeurs d\u2019un temple souterrain, elle respirait les vapeurs qui montaient d\u2019une fissure dans la roche. On l\u2019appelait la Pythie, l\u2019Oracle de Delphes. Quand elle parlait, les Grecs \u00e9taient convaincus d\u2019entendre la voix d\u2019Apollon en personne, le dieu de la proph\u00e9tie. Des rois traversaient des continents et patientaient des mois pour le privil\u00e8ge de lui poser une seule question.",
    },
    {
      text: "La Pythie \u00e9tait toujours une femme du village de Delphes. Au d\u00e9but, elle devait \u00eatre jeune et vierge \u2014 jusqu\u2019au jour o\u00f9 un visiteur agressa l\u2019une d\u2019entre elles. Apr\u00e8s cela, seules les femmes de plus de cinquante ans furent choisies, m\u00eame si elles continuaient de porter la robe blanche des jeunes filles. Le jour de sa s\u00e9lection, elle abandonnait tout : sa maison, sa famille, jusqu\u2019\u00e0 son nom. Elle appartenait d\u00e9sormais \u00e0 Apollon. Elle serait sa voix jusqu\u2019\u00e0 son dernier souffle.",
    },
    {
      text: "Le rituel avait lieu une fois par mois, le septi\u00e8me jour \u2014 le chiffre sacr\u00e9 d\u2019Apollon. La Pythie je\u00fbnait, se baignait dans une source glac\u00e9e de montagne, puis descendait dans la chambre la plus profonde et la plus secr\u00e8te du temple. L\u00e0, elle s\u2019asseyait sur son tr\u00e9pied, plac\u00e9 juste au-dessus d\u2019une fissure dans la roche. Un gaz \u00e0 l\u2019odeur douce\u00e2tre montait des profondeurs et lui donnait le vertige, un sentiment d\u2019apesanteur. Elle m\u00e2chait des feuilles de laurier, buvait de l\u2019eau sacr\u00e9e et glissait peu \u00e0 peu dans la transe.",
    },
    {
      text: "Ce qui venait ensuite \u00e9tait aussi terrifiant que fascinant. La Pythie se mettait \u00e0 trembler, \u00e0 crier, \u00e0 parler d\u2019une voix que les t\u00e9moins juraient n\u2019\u00eatre pas la sienne. Ses paroles sortaient brutes, d\u00e9cousues, impossibles \u00e0 suivre. Mais les pr\u00eatres \u00e0 ses c\u00f4t\u00e9s captaient chaque son et fa\u00e7onnaient ces \u00e9clats en proph\u00e9ties soigneusement cisel\u00e9es. C\u2019\u00e9taient presque toujours des \u00e9nigmes. Car l\u2019Oracle ne mentait jamais \u2014 elle s\u2019assurait simplement que la v\u00e9rit\u00e9 ait plus d\u2019un visage.",
    },
    {
      text: "Ces \u00e9nigmes ont chang\u00e9 le cours de l\u2019histoire. Cr\u00e9sus, roi de Lydie et homme le plus riche de son \u00e9poque, demanda s\u2019il devait attaquer la Perse. La r\u00e9ponse : \u00ab Si tu traverses le fleuve, un grand empire tombera. \u00bb Cr\u00e9sus partit en guerre, certain de sa victoire. L\u2019empire qui tomba fut le sien. Le dieu avait dit la v\u00e9rit\u00e9. Cr\u00e9sus avait simplement entendu ce qu\u2019il voulait entendre.",
    },
    {
      text: "En 480 avant notre \u00e8re, une arm\u00e9e perse colossale mena\u00e7a d\u2019engloutir Ath\u00e8nes. L\u2019Oracle l\u00e2cha une phrase impossible : \u00ab Fiez-vous aux murailles de bois. \u00bb La plupart y virent des fortifications. Mais le g\u00e9n\u00e9ral Th\u00e9mistocle comprit que le dieu parlait des navires de guerre. Aide-toi, le ciel t\u2019aidera : Th\u00e9mistocle d\u00e9chiffra l\u2019\u00e9nigme, misa tout sur la flotte, et les Grecs \u00e9cras\u00e8rent les Perses \u00e0 Salamine. L\u2019homme qui sut \u00e9couter le dieu sauva une civilisation enti\u00e8re.",
    },
    {
      text: "Que se passait-il vraiment dans cette chambre souterraine ? En 2001, des g\u00e9ologues ont d\u00e9couvert que deux failles tectoniques se croisent sous les ruines du temple. Ces fissures auraient pu lib\u00e9rer de l\u2019\u00e9thyl\u00e8ne, un gaz qui, \u00e0 faible dose, provoque exactement ce que d\u00e9crivent les sources antiques : une sensation de flotter, de se d\u00e9tacher de son propre corps. La Pythie s\u2019intoxiquait-elle simplement ? Ou y avait-il autre chose ? Peu importe : les gens y croyaient, et cette croyance a d\u00e9plac\u00e9 des arm\u00e9es et fait tomber des royaumes.",
    },
    {
      text: "La fin vint en 393 de notre \u00e8re. L\u2019empereur romain Th\u00e9odose, chr\u00e9tien d\u00e9termin\u00e9 \u00e0 \u00e9teindre toute trace de l\u2019ancienne religion grecque, envoya un messager \u00e0 Delphes demander si l\u2019Oracle avait un dernier mot. Sa r\u00e9ponse est l\u2019un des adieux les plus bouleversants de l\u2019histoire : \u00ab Dites \u00e0 l\u2019empereur que le grand temple est tomb\u00e9. Apollon n\u2019a plus de refuge, plus de laurier sacr\u00e9, plus de source qui parle. M\u00eame l\u2019eau s\u2019est tue. \u00bb Apr\u00e8s plus de mille ans, la voix du dieu se tut \u2014 et ne parla plus jamais.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// GERMAN
// Proverb: "Der Mensch denkt, Gott lenkt" — subverted in paragraph 5
// ═══════════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#pythia-oracle",
  title: "Die Pythia \u2014 Stimme Apolls",
  subtitle: "Die Priesterin, die \u00fcber tausend Jahre lang f\u00fcr einen Gott sprach",
  excerpt: "\u00dcber tausend Jahre lang war die m\u00e4chtigste Person der antiken Welt kein K\u00f6nig und kein Feldherr. Es war eine Frau \u2014 allein in den Tiefen eines Tempels, umh\u00fcllt von D\u00e4mpfen, die aus einem Riss in der Erde stiegen.",
  characters: [
    "Die Pythia",
    "Apoll",
    "Kr\u00f6sus von Lydien",
    "Themistokles",
    "Die Priester Apolls",
  ],
  moralOrLesson: "Das Orakel hat nie gelogen. Es sorgte nur daf\u00fcr, dass die Wahrheit immer mehr als eine Bedeutung hatte. Um seine Antworten zu verstehen, brauchte man genau das, was die Griechen \u00fcber den Eingang ihres Tempels gemei\u00dfelt hatten: Erkenne dich selbst.",
  paragraphs: [
    {
      text: "\u00dcber tausend Jahre lang war die m\u00e4chtigste Person der antiken Welt kein K\u00f6nig und kein Feldherr. Es war eine Frau. Sie sa\u00df allein auf einem bronzenen Dreifu\u00df in den Tiefen eines unterirdischen Tempels und atmete D\u00e4mpfe ein, die aus einem Riss im Felsen aufstiegen. Man nannte sie die Pythia, das Orakel von Delphi. Wenn sie sprach, waren die Griechen \u00fcberzeugt, die Stimme Apolls selbst zu h\u00f6ren \u2014 des Gottes der Weissagung. K\u00f6nige \u00fcberquerten Kontinente und warteten monatelang, nur um ihr eine einzige Frage stellen zu d\u00fcrfen.",
    },
    {
      text: "Die Pythia war immer eine Frau aus Delphi. Anfangs musste sie jung und unverheiratet sein \u2014 bis ein Besucher eine von ihnen \u00fcberfiel. Danach wurden nur noch Frauen \u00fcber f\u00fcnfzig ausgew\u00e4hlt, obwohl sie weiterhin die wei\u00dfen Gew\u00e4nder einer Jungfrau trugen. Am Tag ihrer Wahl gab sie alles auf: ihr Zuhause, ihre Familie, sogar ihren Namen. Von diesem Moment an geh\u00f6rte sie Apoll. Sie w\u00fcrde seine Stimme sein bis zu ihrem letzten Atemzug.",
    },
    {
      text: "Das Ritual fand einmal im Monat statt, immer am siebten Tag \u2014 Apolls heilige Zahl. Die Pythia fastete, badete in einer eiskalten Bergquelle und stieg hinab in die tiefste und am strengsten geh\u00fctete Kammer des Tempels. Dort setzte sie sich auf ihren Dreifu\u00df, genau \u00fcber dem Riss im Gestein. Ein s\u00fc\u00dflich riechender Dampf stieg aus der Tiefe auf und machte sie benommen, fast schwerelos. Sie kaute Lorbeerbl\u00e4tter, trank heiliges Wasser und glitt langsam in Trance.",
    },
    {
      text: "Was dann geschah, war gleicherma\u00dfen furchterregend und faszinierend. Die Pythia begann zu zittern, zu schreien, mit einer Stimme zu sprechen, die \u2014 so schworen die Augenzeugen \u2014 nicht die ihre war. Ihre Worte kamen roh und wirr, unm\u00f6glich zu verstehen. Doch die Priester neben ihr fingen jeden Laut auf und formten das Chaos zu sorgf\u00e4ltig formulierten Prophezeiungen. Fast immer waren es R\u00e4tsel. Denn das Orakel log nie \u2014 es sorgte nur daf\u00fcr, dass die Wahrheit mehr als eine Bedeutung hatte.",
    },
    {
      text: "Diese R\u00e4tsel ver\u00e4nderten den Lauf der Geschichte. Kr\u00f6sus, K\u00f6nig von Lydien und der reichste Mann seiner Zeit, fragte, ob er Persien angreifen solle. Die Antwort: \u00abWenn du den Fluss \u00fcberquerst, wird ein gro\u00dfes Reich fallen.\u00bb Kr\u00f6sus zog in den Krieg, \u00fcberzeugt von seinem Sieg. Das Reich, das fiel, war sein eigenes. Der Mensch denkt, Gott lenkt. Bei der Pythia war es noch schlimmer: Der Gott sagte dir die Wahrheit ins Gesicht \u2014 und du hast sie trotzdem nicht begriffen.",
    },
    {
      text: "Als im Jahr 480 v. Chr. ein gewaltiges persisches Heer auf Athen zumarschierte, gab das Orakel eine seiner r\u00e4tselhaftesten Prophezeiungen: \u00abVertraut auf die h\u00f6lzernen Mauern.\u00bb Die meisten dachten an Befestigungen. Doch der Feldherr Themistokles erkannte, dass Apoll die Kriegsschiffe meinte. Athen setzte alles auf die Flotte \u2014 und vernichtete die Perser in der Schlacht von Salamis. Wer das R\u00e4tsel des Gottes l\u00f6ste, rettete eine ganze Zivilisation.",
    },
    {
      text: "Was geschah wirklich dort unten? Im Jahr 2001 entdeckten Geologen, dass sich unter den Ruinen des Tempels zwei Verwerfungslinien kreuzen. Durch diese Risse k\u00f6nnte Ethylen entwichen sein \u2014 ein Gas, das in geringen Dosen genau das ausl\u00f6st, was die antiken Quellen beschreiben: ein schwebendes Gef\u00fchl, als w\u00fcrde man den eigenen K\u00f6rper verlassen. Vielleicht war die Pythia einfach berauscht. Oder es steckte mehr dahinter. Was auch immer dort geschah \u2014 die Menschen glaubten ihr, und dieser Glaube bewegte Armeen und st\u00fcrzte K\u00f6nigreiche.",
    },
    {
      text: "Das Ende kam im Jahr 393 n. Chr. Der r\u00f6mische Kaiser Theodosius, ein \u00fcberzeugter Christ, war entschlossen, jede Spur der griechischen Religion auszul\u00f6schen. Er schickte einen Boten nach Delphi, um zu fragen, ob das Orakel noch etwas zu sagen habe. Die Antwort geh\u00f6rt zu den ersch\u00fctterndsten Abschieden der Geschichte: \u00abSagt dem Kaiser, die gro\u00dfe Halle ist gefallen. Apoll hat kein Dach mehr, keinen heiligen Lorbeer, keine sprechende Quelle. Selbst das Wasser ist verstummt.\u00bb Nach \u00fcber tausend Jahren schwieg die Stimme des Gottes \u2014 und sprach nie wieder.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PUSH ALL THREE
// ═══════════════════════════════════════════════════════════════
async function pushStory(item) {
  const cmd = new PutCommand({ TableName: TABLE, Item: item });
  await ddb.send(cmd);
  console.log(`\u2705  Pushed ${item.lang}#${item.storyId} (updatedAt: ${item.updatedAt})`);
}

(async () => {
  try {
    await pushStory(es);
    await pushStory(fr);
    await pushStory(de);
    console.log("\n\u2705  All three language versions pushed successfully.");
  } catch (err) {
    console.error("\u274c  Push failed:", err);
    process.exit(1);
  }
})();
