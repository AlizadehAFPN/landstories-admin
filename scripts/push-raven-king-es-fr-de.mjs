import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// --- Shared fields (unchanged from English) ---
const shared = {
  siteId: "buda-castle",
  storyId: "raven-king",
  coordinates: { lat: 47.4961, lng: 19.0398 },
  disabled: false,
  era: "1443",
  hasAudio: false,
  icon: "\u{1F985}",
  image: "",
  isFree: true,
  readingTimeMinutes: 2,
  source:
    "J\u00e1nos Thur\u00f3czy\u2019s Chronica Hungarorum; Hungarian folk tradition",
  storyCategory: "crowns_conquests",
  thumbnail: "",
  tier: "A",
  updatedAt: now,
};

// ======================================================================
//  SPANISH (es) — El cuervo que coron\u00f3 a un rey
//
//  Proverb subverted: "Cr\u00eda cuervos y te sacar\u00e1n los ojos"
//  (Raise ravens and they'll pluck your eyes out — ingratitude proverb)
//  \u2192 This raven didn't pluck anything. It returned a kingdom.
// ======================================================================

const esParagraphs = [
  `En la Hungr\u00eda del siglo XV, ser J\u00e1nos Hunyadi equival\u00eda a vivir con una diana en la espalda. Era el mejor general que el reino hab\u00eda conocido \u2014 el hombre que fren\u00f3 al Imperio otomano cuando amenazaba con tragarse media Europa. Ese nivel de poder no solo genera admiraci\u00f3n: genera enemigos. Los nobles conspiraban contra \u00e9l sin descanso. Los asesinos eran un peligro constante. As\u00ed que cuando en 1443 parti\u00f3 a una nueva campa\u00f1a, tom\u00f3 una decisi\u00f3n que parec\u00eda menor. No lo era.`,

  `Antes de marcharse, J\u00e1nos le entreg\u00f3 su anillo de sello a su esposa embarazada, Erzs\u00e9bet Szil\u00e1gyi. No era una joya: era un sello de oro con el que se firmaban tratados, se mov\u00edan ej\u00e9rcitos y se demostraba que una orden era leg\u00edtima. Quien ten\u00eda ese anillo hablaba con la voz del general m\u00e1s temido de Hungr\u00eda. En un mundo donde una carta falsificada pod\u00eda desatar una guerra, perderlo era impensable.`,

  `Semanas despu\u00e9s, Erzs\u00e9bet dio a luz a un ni\u00f1o: M\u00e1ty\u00e1s. Una ma\u00f1ana, mientras lo atend\u00eda en el castillo de Hunyad, dej\u00f3 el anillo en el borde de la cuna. De la nada, un cuervo negro entr\u00f3 por la ventana, atrap\u00f3 el anillo de oro en su pico y se pos\u00f3 en lo alto de una torre. En un instante, el objeto m\u00e1s valioso de la familia Hunyadi hab\u00eda desaparecido.`,

  `Erzs\u00e9bet entr\u00f3 en p\u00e1nico. Sin ese anillo, los enemigos de su marido pod\u00edan falsificar su sello, dar \u00f3rdenes falsas, volver a sus propios soldados en su contra. Pero lo que ocurri\u00f3 despu\u00e9s nadie supo explicarlo. El peque\u00f1o M\u00e1ty\u00e1s, con apenas semanas de vida, clav\u00f3 la mirada en el cuervo con una fijeza impropia de un reci\u00e9n nacido. El animal se qued\u00f3 inm\u00f3vil. Pasaron los minutos. Despu\u00e9s, el cuervo baj\u00f3, se pos\u00f3 en la cuna y dej\u00f3 caer el anillo sobre la manta del beb\u00e9.`,

  `La noticia corri\u00f3 como p\u00f3lvora. \u00abLos cuervos lo reconocen\u00bb, murmuraba la gente. \u00abEste ni\u00f1o est\u00e1 marcado.\u00bb Poco importaba si el p\u00e1jaro era domesticado o salvaje, o si la historia se adorn\u00f3 despu\u00e9s. Lo que importaba es que la gente lo cre\u00eda \u2014 y en la Hungr\u00eda del siglo XV, una creencia pod\u00eda golpear m\u00e1s fuerte que cualquier ej\u00e9rcito. Ya conoces el refr\u00e1n: cr\u00eda cuervos y te sacar\u00e1n los ojos. Pues bien, este cuervo no arranc\u00f3 nada. Devolvi\u00f3 un reino.`,

  `Y los que creyeron acertaron. En 1458, con solo quince a\u00f1os, M\u00e1ty\u00e1s fue elegido rey de Hungr\u00eda \u2014 por encima de rivales m\u00e1s ricos y mejor conectados, porque el pueblo llano as\u00ed lo exigi\u00f3. Adopt\u00f3 el cuervo como emblema personal y pas\u00f3 a la historia como Mat\u00edas Corvino \u2014 literalmente, \u00abMat\u00edas el Cuervo\u00bb. Su escudo de armas mostraba un cuervo negro con un anillo de oro en el pico. El mismo p\u00e1jaro. La misma historia.`,

  `Hoy, ese cuervo sigue vigilando Hungr\u00eda \u2014 tallado en piedra, grabado en monumentos, tejido en la identidad del pa\u00eds. El beb\u00e9 que le sostuvo la mirada a un p\u00e1jaro salvaje creci\u00f3 para plantarle cara al Imperio otomano, levantar una de las grandes cortes del Renacimiento europeo y convertirse en el mejor rey que Hungr\u00eda haya tenido. Que la leyenda sea cierta ya da igual. Hay historias que no describen la grandeza \u2014 la crean.`,
];

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#raven-king",
  title: "El cuervo que coron\u00f3 a un rey",
  subtitle: "La leyenda que dio nombre a Mat\u00edas Corvino",
  excerpt: esParagraphs[0],
  paragraphs: esParagraphs.map((text) => ({ text })),
  moralOrLesson:
    "El destino no siempre llega con trompetas. A veces llega con alas negras.",
  characters: [
    "Mat\u00edas Corvino (reci\u00e9n nacido)",
    "Erzs\u00e9bet Szil\u00e1gyi",
    "J\u00e1nos Hunyadi",
    "El cuervo",
  ],
};

// ======================================================================
//  FRENCH (fr) — Le corbeau qui fit un roi
//
//  Proverb subverted: "Petit \u00e0 petit, l'oiseau fait son nid"
//  (Little by little, the bird builds its nest)
//  \u2192 This bird didn't build a nest \u2014 it made a king.
// ======================================================================

const frParagraphs = [
  `Dans la Hongrie du XVe si\u00e8cle, un homme concentrait sur lui toutes les haines et toutes les admirations\u00a0: J\u00e1nos Hunyadi. Le plus grand chef militaire que le royaume ait jamais connu \u2014 celui qui avait arr\u00eat\u00e9 l\u2019Empire ottoman aux portes de l\u2019Europe centrale. Ce genre de pouvoir, \u00e7a ne fait pas que des amis. Les nobles complotaient contre lui en permanence, les assassins n\u2019\u00e9taient jamais loin. Alors, quand il partit en campagne en 1443, il prit une d\u00e9cision qui semblait anodine. Elle ne l\u2019\u00e9tait pas.`,

  `Avant de partir, J\u00e1nos confia \u00e0 sa femme enceinte, Erzs\u00e9bet Szil\u00e1gyi, l\u2019objet le plus important qu\u2019il poss\u00e9dait\u00a0: son sceau \u2014 un lourd anneau d\u2019or qui servait \u00e0 signer les trait\u00e9s, commander les arm\u00e9es et prouver qu\u2019un ordre venait bien de lui. Celui qui tenait cet anneau parlait au nom du g\u00e9n\u00e9ral le plus redout\u00e9 de Hongrie. Dans un monde o\u00f9 une lettre falsifi\u00e9e pouvait d\u00e9clencher une guerre, le perdre \u00e9tait impensable.`,

  `Quelques semaines plus tard, Erzs\u00e9bet mit au monde un fils\u00a0: M\u00e1ty\u00e1s. Un matin, alors qu\u2019elle s\u2019occupait du b\u00e9b\u00e9 au ch\u00e2teau de Hunyad, elle posa l\u2019anneau sur le rebord du berceau. Surgi de nulle part, un corbeau noir fondit par la fen\u00eatre ouverte, saisit l\u2019anneau d\u2019or dans son bec et fila se percher en haut d\u2019une tour. En un instant, le bien le plus pr\u00e9cieux de la famille avait disparu.`,

  `Erzs\u00e9bet paniqua \u2014 \u00e0 raison. Sans ce sceau, les ennemis de son mari pouvaient forger de faux ordres et retourner ses propres soldats contre lui. Mais ce qui suivit, personne ne sut l\u2019expliquer. Le petit M\u00e1ty\u00e1s, quelques semaines \u00e0 peine, fixa le corbeau d\u2019un regard impossible pour un nouveau-n\u00e9 \u2014 un regard calme, immobile, presque souverain. L\u2019oiseau se figea. Les minutes pass\u00e8rent. Puis le corbeau descendit, se posa sur le berceau et laissa tomber l\u2019anneau sur la couverture du b\u00e9b\u00e9.`,

  `La nouvelle se r\u00e9pandit comme une tra\u00een\u00e9e de poudre. \u00ab\u00a0Les corbeaux le reconnaissent\u00a0\u00bb, chuchotait-on dans tout le royaume. \u00ab\u00a0Cet enfant est marqu\u00e9 par le destin.\u00a0\u00bb Peu importait que l\u2019oiseau f\u00fbt dress\u00e9 ou sauvage, ou que l\u2019histoire ait \u00e9t\u00e9 embellie apr\u00e8s coup. Ce qui comptait, c\u2019est que les gens y croyaient \u2014 et dans la Hongrie du XVe si\u00e8cle, une croyance pouvait frapper plus fort qu\u2019une arm\u00e9e. On dit que petit \u00e0 petit, l\u2019oiseau fait son nid. Celui-ci n\u2019a pas fait un nid \u2014 il a fait un roi.`,

  `Et ceux qui y croyaient avaient raison. En 1458, \u00e0 seulement quinze ans, M\u00e1ty\u00e1s fut \u00e9lu roi de Hongrie \u2014 devant des rivaux plus riches et mieux connect\u00e9s, parce que le peuple l\u2019avait exig\u00e9. Il prit le corbeau comme embl\u00e8me et entra dans l\u2019histoire sous le nom de Matthias Corvinus \u2014 litt\u00e9ralement, \u00ab\u00a0Matthias le Corbeau\u00a0\u00bb. Ses armoiries repr\u00e9sentaient un corbeau noir serrant un anneau d\u2019or dans son bec. Le m\u00eame oiseau. Le m\u00eame anneau. La m\u00eame l\u00e9gende.`,

  `Aujourd\u2019hui, ce corbeau veille toujours sur la Hongrie \u2014 sculpt\u00e9 dans la pierre, grav\u00e9 sur les monuments, tiss\u00e9 dans l\u2019identit\u00e9 du pays. Le b\u00e9b\u00e9 qui avait soutenu le regard d\u2019un oiseau sauvage a grandi pour tenir t\u00eate \u00e0 l\u2019Empire ottoman, b\u00e2tir l\u2019une des grandes cours de la Renaissance europ\u00e9enne et devenir le plus grand roi que la Hongrie ait connu. Que la l\u00e9gende soit vraie n\u2019a plus d\u2019importance. Certaines histoires ne racontent pas la grandeur \u2014 elles la fabriquent.`,
];

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#raven-king",
  title: "Le corbeau qui fit un roi",
  subtitle: "Comment Matthias Corvinus re\u00e7ut son nom",
  excerpt: frParagraphs[0],
  paragraphs: frParagraphs.map((text) => ({ text })),
  moralOrLesson:
    "Le destin ne frappe pas toujours \u00e0 la porte. Parfois, il entre par la fen\u00eatre.",
  characters: [
    "Matthias Corvinus (nourrisson)",
    "Erzs\u00e9bet Szil\u00e1gyi",
    "J\u00e1nos Hunyadi",
    "Le corbeau",
  ],
};

// ======================================================================
//  GERMAN (de) — Der Rabe, der einen K\u00f6nig machte
//
//  Proverb subverted: "Aller guten Dinge sind drei"
//  (All good things come in threes)
//  \u2192 Here, one was enough: one raven, one look, one moment.
// ======================================================================

const deParagraphs = [
  `Im Ungarn des 15. Jahrhunderts lebte kein Mensch gef\u00e4hrlicher als J\u00e1nos Hunyadi. Er war der gr\u00f6\u00dfte Feldherr, den das K\u00f6nigreich je gesehen hatte \u2014 der Mann, der das Osmanische Reich aufhielt, als es Mitteleuropa zu verschlingen drohte. So viel Macht macht nicht nur Freunde. Adlige verschworen sich gegen ihn, Attent\u00e4ter waren eine st\u00e4ndige Gefahr. Als er 1443 zu einem neuen Feldzug aufbrach, traf er eine Entscheidung, die unbedeutend wirkte. War sie aber nicht.`,

  `Vor seinem Aufbruch \u00fcbergab J\u00e1nos seiner schwangeren Frau Erzs\u00e9bet Szil\u00e1gyi seinen Siegelring. Das war kein Schmuckst\u00fcck. Es war ein schwerer Goldring, mit dem man Vertr\u00e4ge besiegelte, Armeen befehligte und bewies, dass ein Befehl echt war. Wer diesen Ring besa\u00df, sprach mit der Stimme des m\u00e4chtigsten Generals in Ungarn. In einer Welt, in der ein gef\u00e4lschter Brief einen Krieg ausl\u00f6sen konnte, war es undenkbar, ihn zu verlieren.`,

  `Wochen sp\u00e4ter hatte Erzs\u00e9bet einen Sohn zur Welt gebracht: M\u00e1ty\u00e1s. An einem Morgen auf der Burg Hunyad legte sie den Ring auf den Rand der Wiege, w\u00e4hrend sie sich um das Baby k\u00fcmmerte. Aus dem Nichts schoss ein schwarzer Rabe durchs offene Fenster, schnappte den Goldring mit dem Schnabel und flog auf einen hohen Turm. In einem Augenblick war der wichtigste Gegenstand der Familie Hunyadi verschwunden.`,

  `Erzs\u00e9bet geriet in Panik \u2014 zu Recht. Ohne diesen Ring konnten die Feinde ihres Mannes sein Siegel f\u00e4lschen, falsche Befehle ausgeben, seine eigenen Soldaten gegen ihn aufhetzen. Doch was dann geschah, konnte niemand erkl\u00e4ren. Der kleine M\u00e1ty\u00e1s, gerade ein paar Wochen alt, fixierte den Raben mit einem Blick, der f\u00fcr einen S\u00e4ugling unm\u00f6glich schien \u2014 ruhig, unersch\u00fctterlich, fast herrschaftlich. Der Vogel erstarrte. Minuten vergingen. Dann h\u00fcpfte der Rabe herab, landete auf dem Rand der Wiege und lie\u00df den Ring auf die Decke des Babys fallen.`,

  `Die Geschichte verbreitete sich wie ein Lauffeuer. \u201eDie Raben erkennen ihn\u201c, fl\u00fcsterten die Leute. \u201eDieses Kind ist f\u00fcr Gro\u00dfes bestimmt.\u201c Ob der Rabe zahm war oder wild, ob die Geschichte sp\u00e4ter ausgeschm\u00fcckt wurde \u2014 das spielte keine Rolle. Was z\u00e4hlte, war der Glaube daran. Und im Ungarn des 15. Jahrhunderts konnte ein Glaube h\u00e4rter zuschlagen als jede Armee. Aller guten Dinge sind drei, hei\u00dft es. Hier reichte eins: ein Rabe, ein Blick, ein Moment \u2014 und ein Schicksal war besiegelt.`,

  `Und wer es glaubte, behielt recht. 1458, mit gerade f\u00fcnfzehn Jahren, wurde M\u00e1ty\u00e1s zum K\u00f6nig von Ungarn gew\u00e4hlt \u2014 gegen reichere, besser vernetzte Rivalen, weil das einfache Volk es so verlangte. Er machte den Raben zu seinem Wappen und ging als Matthias Corvinus in die Geschichte ein \u2014 w\u00f6rtlich: \u201eMatthias der Rabe\u201c. Sein Wappen zeigte einen schwarzen Raben mit einem goldenen Ring im Schnabel. Derselbe Vogel. Derselbe Ring. Dieselbe Geschichte.`,

  `Heute wacht dieser Rabe noch immer \u00fcber Ungarn \u2014 in Stein gemei\u00dfelt, auf Denkm\u00e4ler gepr\u00e4gt, fest verwoben mit der Identit\u00e4t des Landes. Das Baby, das einem wilden Vogel standhielt, wuchs heran, um dem Osmanischen Reich die Stirn zu bieten, einen der gro\u00dfen Renaissanceh\u00f6fe Europas zu errichten und der bedeutendste K\u00f6nig zu werden, den Ungarn je hatte. Ob die Legende stimmt? Das spielt l\u00e4ngst keine Rolle mehr. Manche Geschichten beschreiben Gr\u00f6\u00dfe nicht \u2014 sie erschaffen sie.`,
];

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#raven-king",
  title: "Der Rabe, der einen K\u00f6nig machte",
  subtitle: "Wie Matthias Corvinus zu seinem Namen kam",
  excerpt: deParagraphs[0],
  paragraphs: deParagraphs.map((text) => ({ text })),
  moralOrLesson:
    "Das Schicksal k\u00fcndigt sich nicht immer mit Fanfaren an. Manchmal fliegt es durchs offene Fenster.",
  characters: [
    "Matthias Corvinus (S\u00e4ugling)",
    "Erzs\u00e9bet Szil\u00e1gyi",
    "J\u00e1nos Hunyadi",
    "Der Rabe",
  ],
};

// ======================================================================
//  VALIDATION & PUSH
// ======================================================================

function validate(item, label) {
  const json = JSON.stringify(item);
  JSON.parse(json); // throws if invalid

  const charTotal = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  const wordTotal = item.paragraphs.reduce(
    (sum, p) => sum + p.text.split(/\s+/).length,
    0
  );

  console.log(`\n--- ${label} ---`);
  console.log(`  Title:       ${item.title}`);
  console.log(`  Subtitle:    ${item.subtitle}`);
  console.log(`  Paragraphs:  ${item.paragraphs.length}`);
  console.log(`  Total chars: ${charTotal}`);
  console.log(`  Total words: ${wordTotal}`);
  console.log(`  JSON size:   ${json.length} bytes`);
  console.log(`  JSON valid:  OK`);

  item.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    const flag =
      chars > 550 ? " *** OVER 500 chars" : words > 110 ? " *** OVER 100 words" : "";
    console.log(`    P${i + 1}: ${chars} chars, ${words} words${flag}`);
  });
}

async function pushItem(item, label) {
  validate(item, label);

  console.log(`  Pushing to DynamoDB...`);
  const cmd = new PutCommand({ TableName: TABLE, Item: item });
  const result = await docClient.send(cmd);
  const status = result.$metadata.httpStatusCode;

  if (status === 200) {
    console.log(`  PUSHED: ${item.langStoryId} -> ${TABLE} table`);
  } else {
    throw new Error(`Unexpected HTTP status: ${status}`);
  }
}

async function main() {
  console.log(`Pushing raven-king stories in es, fr, de`);
  console.log(`updatedAt: ${now} (${new Date(now * 1000).toISOString()})\n`);

  await pushItem(es, "Spanish (es)");
  await pushItem(fr, "French (fr)");
  await pushItem(de, "German (de)");

  console.log(`\n${"=".repeat(50)}`);
  console.log(`All 3 records pushed successfully.`);
}

main().catch((err) => {
  console.error("\nFATAL:", err);
  process.exit(1);
});
