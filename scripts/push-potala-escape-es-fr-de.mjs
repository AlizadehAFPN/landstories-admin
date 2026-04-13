import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// Shared fields from English original
const base = {
  siteId: "potala-palace",
  storyId: "dalai-lama-escape-1959",
  icon: "\u{1F3D4}\uFE0F",
  tier: "A",
  source: 'Dalai Lama, "Freedom in Exile" (autobiography, 1990); Jamyang Norbu, "Warriors of Tibet"; CIA declassified records',
  characters: [
    "Fourteenth Dalai Lama (Tenzin Gyatso) \u2014 the escaped god-king",
    "Tibetan resistance fighters who protected him",
    "CIA operatives who may have assisted the escape",
  ],
  era: "s Republic of China period",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 91.1169, lat: 29.6575 },
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  updatedAt: now,
};

// ──────────────────────────────────────────────
// SPANISH
// ──────────────────────────────────────────────
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#dalai-lama-escape-1959",
  title: "La huida del Potala",
  subtitle: "La noche en que un dios tuvo que escapar de su propio palacio",
  excerpt: "En marzo de 1959, un monje de veintitr\u00e9s a\u00f1os ten\u00eda el destino de toda una religi\u00f3n en sus manos. Se llamaba Tenzin Gyatso \u2014 el decimocuarto dal\u00e1i lama \u2014 y el ej\u00e9rcito chino acababa de rodear su ciudad, Lhasa, la capital del T\u00edbet. Su exigencia: que se presentara solo en un campamento militar para asistir a un \u00abespect\u00e1culo cultural\u00bb. Nadie en todo el T\u00edbet se trag\u00f3 esa mentira.",
  moralOrLesson: "A veces lo m\u00e1s valiente es irse \u2014 no para abandonar, sino para que una tradici\u00f3n viva sobreviva a todo lo que intent\u00f3 destruirla.",
  paragraphs: [
    { text: "En marzo de 1959, un monje de veintitr\u00e9s a\u00f1os ten\u00eda el destino de toda una religi\u00f3n en sus manos. Se llamaba Tenzin Gyatso \u2014 el decimocuarto dal\u00e1i lama \u2014 y el ej\u00e9rcito chino acababa de rodear su ciudad, Lhasa, la capital del T\u00edbet. Su exigencia: que se presentara solo en un campamento militar para asistir a un \u00abespect\u00e1culo cultural\u00bb. Nadie en todo el T\u00edbet se trag\u00f3 esa mentira." },
    { text: "Treinta mil tibetanos intentaron salvarlo. Llegaron en masa al Norbulingka, su palacio de verano, y formaron un muro humano a su alrededor: campesinos, monjes, madres con sus hijos en brazos. Se plantaron hombro con hombro, desafiando al ej\u00e9rcito chino a pasar por encima de ellos. Era ese tipo de valent\u00eda que te parte el alma, porque todos los que estaban ah\u00ed sab\u00edan perfectamente c\u00f3mo iba a terminar aquello." },
    { text: "As\u00ed que la noche del 17 de marzo, la persona m\u00e1s reconocible del T\u00edbet se esfum\u00f3. Se quit\u00f3 los h\u00e1bitos de monje y las gafas, se colg\u00f3 un rifle al hombro y sali\u00f3 vestido de soldado raso. Cruz\u00f3 el r\u00edo Kyichu en la oscuridad y pas\u00f3 justo por delante de la multitud que hab\u00eda venido a protegerlo. Ni una sola persona reconoci\u00f3 a su l\u00edder espiritual. Dicen que Dios aprieta pero no ahoga \u2014 pero aquella noche, para no ahogarse, un dios tuvo que huir." },
    { text: "Lo que sigui\u00f3 fueron dos semanas de infierno por el Himalaya. Pasos de monta\u00f1a a m\u00e1s de cinco mil metros \u2014 m\u00e1s altos que cualquier cumbre de Europa \u2014 entre ventiscas cegadoras y un fr\u00edo que se met\u00eda hasta los huesos. Los aviones militares chinos peinaban el cielo, busc\u00e1ndolo. El dal\u00e1i lama estaba enfermo, agotado, sin apenas comer. Quince d\u00edas arrastr\u00e1ndose por el techo del mundo, sin saber si el siguiente valle les traer\u00eda la libertad o un pelot\u00f3n de fusilamiento." },
    { text: "Cruz\u00f3 la frontera con India el 31 de marzo. El primer ministro Nehru le concedi\u00f3 asilo, y el dal\u00e1i lama estableci\u00f3 un gobierno tibetano en el exilio en Dharamsala, un pueblo tranquilo en las monta\u00f1as del norte de India. Ese gobierno sigue funcionando hoy, m\u00e1s de sesenta a\u00f1os despu\u00e9s. En el T\u00edbet, el levantamiento fue aplastado. Decenas de miles de tibetanos murieron, el Palacio de Potala se convirti\u00f3 en museo y trescientos a\u00f1os de gobierno de los dal\u00e1i lamas se acabaron de la noche a la ma\u00f1ana." },
    { text: "Nunca ha vuelto. Ahora, con noventa a\u00f1os, ha sugerido que quiz\u00e1 sea el \u00faltimo dal\u00e1i lama \u2014 o que el pr\u00f3ximo podr\u00eda nacer fuera del T\u00edbet, tal vez incluso ser mujer. Una l\u00ednea ininterrumpida de l\u00edderes espirituales que se remonta al siglo XVII podr\u00eda terminar con el hombre que sali\u00f3 por la puerta de un palacio a los veintitr\u00e9s." },
    { text: "Y sin embargo, cada d\u00eda, los peregrinos tibetanos caminan en el sentido de las agujas del reloj alrededor del Potala, girando sus ruedas de oraci\u00f3n y susurrando las mismas palabras: \u00abQue Su Santidad vuelva en esta vida.\u00bb M\u00e1s de sesenta a\u00f1os con esa oraci\u00f3n. M\u00e1s de sesenta a\u00f1os creyendo. A veces lo m\u00e1s valiente que puede hacer un l\u00edder es irse \u2014 no para abandonar a su pueblo, sino para que su fe sobreviva a todo lo que intent\u00f3 destruirla." },
  ],
};

// ──────────────────────────────────────────────
// FRENCH
// ──────────────────────────────────────────────
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#dalai-lama-escape-1959",
  title: "La fuite du Potala",
  subtitle: "La nuit o\u00f9 un dieu vivant a fui son propre palais",
  excerpt: "En mars 1959, un moine de vingt-trois ans tenait le destin d\u2019une religion enti\u00e8re entre ses mains. Il s\u2019appelait Tenzin Gyatso \u2014 le quatorzi\u00e8me dala\u00ef-lama \u2014 et l\u2019arm\u00e9e chinoise venait d\u2019encercler sa ville de Lhassa, la capitale du Tibet. Leur exigence\u00a0: qu\u2019il se rende seul dans un camp militaire pour assister \u00e0 un \u00ab\u00a0spectacle culturel\u00a0\u00bb. Personne au Tibet n\u2019a \u00e9t\u00e9 dupe.",
  moralOrLesson: "Parfois l\u2019acte le plus courageux est de partir \u2014 non pas pour abandonner, mais pour qu\u2019une tradition vivante survive \u00e0 tout ce qui a tent\u00e9 de la d\u00e9truire.",
  paragraphs: [
    { text: "En mars 1959, un moine de vingt-trois ans tenait le destin d\u2019une religion enti\u00e8re entre ses mains. Il s\u2019appelait Tenzin Gyatso \u2014 le quatorzi\u00e8me dala\u00ef-lama \u2014 et l\u2019arm\u00e9e chinoise venait d\u2019encercler sa ville de Lhassa, la capitale du Tibet. Leur exigence\u00a0: qu\u2019il se rende seul dans un camp militaire pour assister \u00e0 un \u00ab\u00a0spectacle culturel\u00a0\u00bb. Personne au Tibet n\u2019a \u00e9t\u00e9 dupe." },
    { text: "Trente mille Tib\u00e9tains ont essay\u00e9 de le sauver. Ils ont converg\u00e9 vers le Norbulingka, son palais d\u2019\u00e9t\u00e9, et ont form\u00e9 un mur humain autour de lui \u2014 paysans, moines, m\u00e8res serrant leurs enfants contre elles. Ils se sont tenus \u00e9paule contre \u00e9paule, d\u00e9fiant l\u2019arm\u00e9e chinoise de passer. C\u2019\u00e9tait le genre de courage qui vous serre la gorge, parce que tous ceux qui \u00e9taient l\u00e0 savaient exactement comment \u00e7a allait finir." },
    { text: "Alors, dans la nuit du 17 mars, la personne la plus reconnaissable du Tibet a disparu. Il a retir\u00e9 ses robes de moine, enlev\u00e9 ses lunettes, jet\u00e9 un fusil sur son \u00e9paule et il est sorti d\u00e9guis\u00e9 en simple soldat. Il a travers\u00e9 le fleuve Kyichu dans l\u2019obscurit\u00e9 et il est pass\u00e9 devant la foule venue le prot\u00e9ger. Pas une seule personne n\u2019a reconnu son guide spirituel. On dit \u00ab\u00a0Aide-toi, le ciel t\u2019aidera.\u00a0\u00bb Mais cette nuit-l\u00e0, c\u2019est le ciel lui-m\u00eame qui a d\u00fb se sauver." },
    { text: "Ce qui a suivi, c\u2019est deux semaines d\u2019enfer \u00e0 travers l\u2019Himalaya. Des cols \u00e0 plus de cinq mille m\u00e8tres \u2014 plus hauts que n\u2019importe quel sommet d\u2019Europe \u2014 dans des temp\u00eates de neige aveuglantes et un froid \u00e0 vous briser les os. Les avions militaires chinois ratissaient le ciel. Le dala\u00ef-lama \u00e9tait malade, \u00e9puis\u00e9, ne mangeait presque plus. Quinze jours \u00e0 avancer sur le toit du monde, sans jamais savoir si la vall\u00e9e suivante cachait la libert\u00e9 ou un peloton d\u2019ex\u00e9cution." },
    { text: "Il a franchi la fronti\u00e8re indienne le 31 mars. Le Premier ministre Nehru lui a accord\u00e9 l\u2019asile, et le dala\u00ef-lama a install\u00e9 un gouvernement tib\u00e9tain en exil \u00e0 Dharamsala, une petite ville tranquille dans les montagnes du nord de l\u2019Inde. Ce gouvernement fonctionne encore aujourd\u2019hui \u2014 plus de soixante ans apr\u00e8s. Au Tibet, le soul\u00e8vement a \u00e9t\u00e9 \u00e9cras\u00e9. Des dizaines de milliers de Tib\u00e9tains ont \u00e9t\u00e9 tu\u00e9s, le palais du Potala est devenu un mus\u00e9e, et trois si\u00e8cles de r\u00e8gne des dala\u00ef-lamas ont pris fin du jour au lendemain." },
    { text: "Il n\u2019est jamais revenu. Aujourd\u2019hui \u00e2g\u00e9 de quatre-vingt-dix ans, il a sugg\u00e9r\u00e9 qu\u2019il pourrait \u00eatre le dernier dala\u00ef-lama \u2014 ou que le prochain pourrait na\u00eetre hors du Tibet, peut-\u00eatre m\u00eame une femme. Une lign\u00e9e ininterrompue de guides spirituels remontant au XVIIe si\u00e8cle pourrait s\u2019\u00e9teindre avec l\u2019homme qui est sorti d\u2019un palais \u00e0 vingt-trois ans." },
    { text: "Et pourtant, chaque jour, des p\u00e8lerins tib\u00e9tains marchent dans le sens des aiguilles d\u2019une montre autour du Potala, font tourner leurs moulins \u00e0 pri\u00e8res et murmurent les m\u00eames mots\u00a0: \u00ab\u00a0Que Sa Saintet\u00e9 revienne de notre vivant.\u00a0\u00bb Plus de soixante ans de cette pri\u00e8re. Plus de soixante ans de foi. Parfois, l\u2019acte le plus courageux d\u2019un guide est de partir \u2014 pas pour abandonner son peuple, mais pour que sa foi survive \u00e0 tout ce qui a tent\u00e9 de la d\u00e9truire." },
  ],
};

// ──────────────────────────────────────────────
// GERMAN
// ──────────────────────────────────────────────
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#dalai-lama-escape-1959",
  title: "Die Flucht aus dem Potala",
  subtitle: "Die Nacht, in der ein lebender Gott aus seinem eigenen Palast floh",
  excerpt: "Im M\u00e4rz 1959 hielt ein dreiundzwanzigj\u00e4hriger M\u00f6nch das Schicksal einer ganzen Religion in seinen H\u00e4nden. Sein Name: Tenzin Gyatso \u2014 der vierzehnte Dalai Lama \u2014 und die chinesische Armee hatte gerade seine Stadt Lhasa eingekreist, die Hauptstadt Tibets. Ihre Forderung: Er solle allein in ein Milit\u00e4rlager kommen, zu einer angeblichen \u201eKulturveranstaltung\u201c. Niemand in Tibet glaubte auch nur ein Wort davon.",
  moralOrLesson: "Manchmal ist der mutigste Schritt zu gehen \u2014 nicht um aufzugeben, sondern damit eine lebendige Tradition alles \u00fcberlebt, was versucht hat, sie zu zerst\u00f6ren.",
  paragraphs: [
    { text: "Im M\u00e4rz 1959 hielt ein dreiundzwanzigj\u00e4hriger M\u00f6nch das Schicksal einer ganzen Religion in seinen H\u00e4nden. Sein Name: Tenzin Gyatso \u2014 der vierzehnte Dalai Lama \u2014 und die chinesische Armee hatte gerade seine Stadt Lhasa eingekreist, die Hauptstadt Tibets. Ihre Forderung: Er solle allein in ein Milit\u00e4rlager kommen, zu einer angeblichen \u201eKulturveranstaltung\u201c. Niemand in Tibet glaubte auch nur ein Wort davon." },
    { text: "Drei\u00dfigtausend Tibeter versuchten, ihn zu retten. Sie str\u00f6mten zum Norbulingka, seinem Sommerpalast, und bildeten eine menschliche Mauer um ihn herum \u2014 Bauern, M\u00f6nche, M\u00fctter mit ihren Kindern auf dem Arm. Schulter an Schulter stellten sie sich der chinesischen Armee entgegen. Es war die Art von Mut, die einem das Herz zerrei\u00dft, weil jeder Einzelne dort wusste, wie das enden w\u00fcrde." },
    { text: "Also verschwand in der Nacht des 17. M\u00e4rz die bekannteste Person Tibets. Er legte seine M\u00f6nchsroben und seine Brille ab, warf sich ein Gewehr \u00fcber die Schulter und ging als einfacher Soldat verkleidet hinaus. Er \u00fcberquerte den Fluss Kyichu im Dunkeln und lief direkt an der Menge vorbei, die gekommen war, um ihn zu besch\u00fctzen. Kein einziger Mensch erkannte seinen geistlichen F\u00fchrer. Man sagt: \u201eDer Mensch denkt, Gott lenkt.\u201c Aber in jener Nacht musste ein lebender Gott selbst fliehen \u2014 und einfache Menschen wiesen ihm den Weg." },
    { text: "Was folgte, waren zwei Wochen H\u00f6lle durch den Himalaja. Gebirgsp\u00e4sse auf \u00fcber f\u00fcnftausend Metern \u2014 h\u00f6her als alles in Europa \u2014 in blendenden Schneest\u00fcrmen und einer K\u00e4lte, die bis auf die Knochen ging. Chinesische Milit\u00e4rflugzeuge durchk\u00e4mmten den Himmel auf der Suche nach ihm. Der Dalai Lama war krank, ersch\u00f6pft, a\u00df kaum noch etwas. F\u00fcnfzehn Tage lang schleppte er sich \u00fcber das Dach der Welt, ohne je zu wissen, ob das n\u00e4chste Tal die Freiheit brachte oder ein Erschie\u00dfungskommando." },
    { text: "Am 31. M\u00e4rz \u00fcberquerte er die Grenze nach Indien. Premierminister Nehru gew\u00e4hrte ihm Asyl, und der Dalai Lama gr\u00fcndete eine tibetische Exilregierung in Dharamsala, einer ruhigen Kleinstadt in den Bergen Nordindiens. Diese Regierung arbeitet noch heute \u2014 \u00fcber sechzig Jahre sp\u00e4ter. In Tibet wurde der Aufstand niedergeschlagen. Zehntausende Tibeter kamen ums Leben, der Potala-Palast wurde zum Museum, und dreihundert Jahre Herrschaft der Dalai Lamas endeten \u00fcber Nacht." },
    { text: "Er ist nie zur\u00fcckgekehrt. Heute, mit neunzig Jahren, hat er angedeutet, dass er vielleicht der letzte Dalai Lama sein k\u00f6nnte \u2014 oder dass der n\u00e4chste au\u00dferhalb Tibets gefunden werden k\u00f6nnte, vielleicht sogar eine Frau. Eine ununterbrochene Linie geistlicher F\u00fchrer, die bis ins 17. Jahrhundert zur\u00fcckreicht, k\u00f6nnte mit dem Mann enden, der mit dreiundzwanzig durch ein Palasttor nach drau\u00dfen ging." },
    { text: "Und trotzdem laufen jeden Tag tibetische Pilger im Uhrzeigersinn um den Potala, drehen ihre Gebetsm\u00fchlen und fl\u00fcstern immer dieselben Worte: \u201eM\u00f6ge Seine Heiligkeit in diesem Leben zur\u00fcckkehren.\u201c \u00dcber sechzig Jahre lang dieses Gebet. \u00dcber sechzig Jahre lang dieser Glaube. Manchmal ist das Mutigste, was ein Anf\u00fchrer tun kann, zu gehen \u2014 nicht um sein Volk im Stich zu lassen, sondern damit sein Glaube alles \u00fcberlebt, was versucht hat, ihn zu zerst\u00f6ren." },
  ],
};

// ──────────────────────────────────────────────
// PUSH
// ──────────────────────────────────────────────
async function pushStory(story) {
  const label = `${story.lang} — "${story.title}"`;
  try {
    // Validate critical fields
    if (!story.siteId || !story.langStoryId || !story.lang || !story.title) {
      throw new Error(`Missing required field in ${label}`);
    }
    if (!story.paragraphs || story.paragraphs.length < 6) {
      throw new Error(`Too few paragraphs in ${label}`);
    }
    for (const [i, p] of story.paragraphs.entries()) {
      if (!p.text || p.text.length > 550) {
        throw new Error(`Paragraph ${i + 1} in ${label} is empty or exceeds 550 chars (${p.text?.length})`);
      }
    }

    await docClient.send(new PutCommand({
      TableName: TABLE,
      Item: story,
      ConditionExpression: "attribute_not_exists(siteId)",
    }));
    console.log(`[OK] ${label}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`[SKIP] ${label} — record already exists. Use overwrite flag if intended.`);
    } else {
      console.error(`[FAIL] ${label} — ${err.message}`);
    }
    throw err;
  }
}

(async () => {
  console.log(`Pushing 3 stories (timestamp: ${now})...\n`);
  for (const story of [es, fr, de]) {
    await pushStory(story);
  }
  console.log("\nAll 3 stories pushed successfully.");
})();
