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
  siteId: 'persepolis',
  storyId: 'women-who-ran-the-empire',
  icon: '\u{1F451}',
  tier: 'A',
  source: 'Hallock, R.T., Persepolis Fortification Tablets (1969); Henkelman, Wouter, The Other Gods Who Are (2008); Brosius, Maria, Women in Ancient Persia (1996); Koch, Heidemarie, Frauen und Schlangen (2002); Llewellyn-Jones, Lloyd, King and Court in Ancient Persia (2013); Herodotus, Histories III.133-134, VII.2-3; Aeschylus, The Persians (472 BCE); Briant, Pierre, From Cyrus to Alexander (2002)',
  characters: [
    'Atossa (daughter of Cyrus, kingmaker)',
    'Irdabama (wealthy estate owner)',
    'Artystone (Darius\'s favorite wife)',
    'The women supervisors of the Fortification Tablets',
    'Richard Hallock (decipherer of the tablets)',
  ],
  era: '509\u2013494 BCE (Fortification Tablets); broader Achaemenid period 550\u2013330 BCE',
  readingTimeMinutes: 4,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 52.8914, lat: 29.9342 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'lost_found',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «Las mujeres que movían los hilos del imperio»
//  Proverb: «A la tercera va la vencida» (Third time's the charm)
//  Subverted in §5: Atossa married three kings — and on the third, she struck.
// ═══════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: 'es',
  langStoryId: 'es#women-who-ran-the-empire',
  title: 'Las mujeres que movían los hilos del imperio',
  subtitle: 'Treinta mil tablillas de arcilla revelaron lo que ningún historiador griego se molestó en contar: un imperio que pagaba igual a las mujeres, les daba baja por maternidad y fue moldeado por reinas que decidían quién se sentaba en el trono',
  excerpt: 'Selladas en un muro de Persépolis durante veintitrés siglos, treinta mil tablillas de arcilla revelaron lo que ningún historiador griego se dignó a escribir: el mayor imperio del mundo pagaba igual a mujeres y hombres, protegía a las madres y estaba dirigido en la sombra por reinas que decidían quién ocupaba el trono.',
  moralOrLesson: 'Durante veinticuatro siglos, Occidente se contó a sí mismo que el Imperio persa era otro reino más donde las mujeres no pintaban nada. Entonces, treinta mil tablillas de arcilla rompieron ese mito en pedazos. Mostraron un imperio donde las mujeres cobraban lo mismo, recibían apoyo por maternidad, dirigían enormes propiedades y decidían quién se sentaba en el trono. La prueba siempre estuvo ahí: sellada en un muro, endurecida por el fuego, esperando a que alguien se molestara en leerla.',
  paragraphs: [
    {
      text: 'En los años treinta, unos arqueólogos abrieron un muro en Persépolis — capital del Imperio persa, en el actual Irán — y encontraron treinta mil tablillas de arcilla dentro. Registros contables. Quién cobraba, cuánto grano, cuántos trabajadores. Nada emocionante. Hasta que alguien se puso a leerlos. Entre esos recibos estaba la prueba de que el mayor imperio del mundo pagaba lo mismo a mujeres que a hombres por el mismo trabajo — veinticinco siglos antes de que nadie más lo intentara.',
    },
    {
      text: 'Las tablillas cubren quince años del reinado de Darío el Grande, hacia el 500 a.C. Listan trabajadores de todo el imperio — persas, babilonios, egipcios, griegos, indios — miles de nombres con su puesto y su sueldo. Cientos eran de mujeres. No esclavas. No sirvientas. Trabajadoras y supervisoras con sueldo. Cuando una mujer hacía el mismo trabajo que un hombre, cobraba lo mismo. No como excepción. En miles de registros, durante quince años. Era política de Estado.',
    },
    {
      text: 'Aquí la cosa se pone fuerte. Las tablillas muestran que las mujeres que acababan de dar a luz recibían paga extra — una baja por maternidad financiada por el Estado en el siglo V antes de Cristo. No en Atenas, donde las mujeres no podían tener propiedades ni salir solas de casa. Ni en Roma, donde eran tratadas como niñas toda su vida. En Persia. La civilización que los griegos llamaban «bárbara» creó un sistema de apoyo a las madres que Occidente no igualaría en dos mil años.',
    },
    {
      text: 'Y luego estaban las mujeres de arriba del todo. Una tal Irdabama aparece en decenas de tablillas dirigiendo enormes haciendas, al mando de cientos de trabajadores, firmando envíos con su propio sello — una imagen tallada de una mujer sentada en un trono. Comerciaba con grano, vino y ganado a una escala que rivalizaba con la de los gobernadores. En ningún registro aparece un marido o un padre aprobando sus decisiones. No le rendía cuentas a nadie más que al rey.',
    },
    {
      text: 'Pero la verdadera jugadora era Atossa. Hija de Ciro el Grande, fundador del Imperio persa. Se casó con tres reyes seguidos. A la tercera va la vencida, dicen — y Atossa lo cumplió al pie de la letra. Heródoto, que normalmente ignoraba a las persas, escribió que ella tenía «todo el poder» en la corte. Cuando Darío tuvo que elegir heredero, Atossa movió ficha: su hijo Jerjes merecía el trono por encima de sus hermanastros. Ganó. Una mujer decidió quién gobernaría el mayor imperio de la tierra.',
    },
    {
      text: 'Durante siglos, los estudiosos occidentales miraron Persépolis y vieron lo que esperaban: harenes, mujeres con velo, un imperio atrasado. Bautizaron un edificio como «el Harén de Jerjes» sin prueba alguna. Pero las tablillas cuentan otra historia. Las mujeres de la realeza viajaban entre provincias, organizaban banquetes, gestionaban propiedades y controlaban fortunas enormes. No estaban encerradas detrás de los muros. Gobernaban el imperio desde dentro de ellos.',
    },
    {
      text: 'Los griegos escribieron la historia, y Persia quedó pintada como tierra de tiranos sobre mujeres indefensas. La verdad estuvo sellada en un muro veintitrés siglos, endurecida por el fuego que Alejandro Magno prendió al arrasar Persépolis. Las tablillas acabaron en Chicago, donde Richard Hallock pasó décadas descifrando recibos de grano que resultaron ser los documentos más revolucionarios en la historia de los derechos de la mujer. No eran proclamas. Eran nóminas.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Celles qui dirigeaient l'Empire»
//  Proverb: «Tout vient à point à qui sait attendre»
//  Subverted in §5: Atossa didn't wait — she struck.
// ═══════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: 'fr',
  langStoryId: 'fr#women-who-ran-the-empire',
  title: 'Celles qui dirigeaient l\u2019Empire',
  subtitle: 'Trente mille tablettes d\u2019argile ont r\u00e9v\u00e9l\u00e9 ce qu\u2019aucun historien grec n\u2019a jamais racont\u00e9\u00a0: un empire qui payait les femmes autant que les hommes, leur accordait un cong\u00e9 maternit\u00e9 et o\u00f9 des reines d\u00e9cidaient qui monterait sur le tr\u00f4ne',
  excerpt: 'Scell\u00e9es dans un mur de Pers\u00e9polis pendant vingt-trois si\u00e8cles, trente mille tablettes d\u2019argile ont r\u00e9v\u00e9l\u00e9 ce qu\u2019aucun historien grec n\u2019a pris la peine d\u2019\u00e9crire\u00a0: le plus grand empire du monde payait les femmes autant que les hommes, soutenait les nouvelles m\u00e8res et \u00e9tait fa\u00e7onn\u00e9 au sommet par des reines qui d\u00e9cidaient qui s\u2019asseyait sur le tr\u00f4ne.',
  moralOrLesson: 'Pendant vingt-quatre si\u00e8cles, l\u2019Occident s\u2019est racont\u00e9 que l\u2019Empire perse n\u2019\u00e9tait qu\u2019un royaume de plus o\u00f9 les femmes n\u2019avaient aucun pouvoir. Puis trente mille tablettes d\u2019argile ont pulv\u00e9ris\u00e9 ce mythe. Elles ont montr\u00e9 un empire o\u00f9 les femmes touchaient le m\u00eame salaire, b\u00e9n\u00e9ficiaient d\u2019un soutien \u00e0 la maternit\u00e9, dirigeaient de vastes domaines et d\u00e9cidaient qui monterait sur le tr\u00f4ne. La preuve \u00e9tait l\u00e0 depuis toujours \u2014 scell\u00e9e dans un mur, durcie par le feu, attendant que quelqu\u2019un prenne enfin la peine de la lire.',
  paragraphs: [
    {
      text: 'Dans les ann\u00e9es\u00a01930, des arch\u00e9ologues ont ouvert un mur \u00e0 Pers\u00e9polis \u2014 capitale de l\u2019Empire perse, dans l\u2019Iran actuel \u2014 et d\u00e9couvert trente mille tablettes d\u2019argile scell\u00e9es \u00e0 l\u2019int\u00e9rieur. Des registres comptables. Qui \u00e9tait pay\u00e9, combien de grain, combien d\u2019ouvriers. Rien de palpitant. Jusqu\u2019\u00e0 ce que quelqu\u2019un les lise. Dans ces re\u00e7us se cachait la preuve que le plus grand empire du monde payait les femmes autant que les hommes \u2014 vingt-cinq si\u00e8cles avant que quiconque n\u2019ouvre le d\u00e9bat.',
    },
    {
      text: 'Les tablettes couvrent quinze ans sous Darius le Grand, vers 500 avant notre \u00e8re. Elles listent des travailleurs de tout l\u2019empire \u2014 Perses, Babyloniens, \u00c9gyptiens, Grecs, Indiens \u2014 des milliers de noms avec poste et salaire. Des centaines \u00e9taient des femmes. Pas des esclaves. Pas des servantes. Des travailleuses et responsables r\u00e9mun\u00e9r\u00e9es. Quand une femme faisait le m\u00eame travail qu\u2019un homme, elle touchait la m\u00eame paie. Sur des milliers de registres, quinze ans. C\u2019\u00e9tait une politique d\u2019\u00c9tat.',
    },
    {
      text: 'C\u2019est l\u00e0 que \u00e7a devient vertigineux. Les tablettes montrent que les femmes qui venaient d\u2019accoucher touchaient une prime \u2014 un cong\u00e9 maternit\u00e9 financ\u00e9 par l\u2019\u00c9tat au Ve\u00a0si\u00e8cle avant notre \u00e8re. Pas \u00e0 Ath\u00e8nes, o\u00f9 les femmes ne pouvaient ni poss\u00e9der de biens ni sortir sans un homme. Pas \u00e0 Rome, o\u00f9 elles \u00e9taient trait\u00e9es comme des mineures \u00e0 vie. En Perse. La civilisation que les Grecs appelaient \u00ab\u00a0barbare\u00a0\u00bb avait cr\u00e9\u00e9 un soutien aux m\u00e8res que l\u2019Occident ne rattraperait pas avant deux mille ans.',
    },
    {
      text: 'Et puis il y avait les femmes tout en haut. Une certaine Irdabama appara\u00eet dans des dizaines de tablettes \u00e0 la t\u00eate d\u2019immenses domaines agricoles, commandant des centaines de travailleurs, apposant son propre sceau sur les livraisons \u2014 un sceau grav\u00e9 montrant une femme assise sur un tr\u00f4ne. Elle faisait commerce de grain, de vin et de b\u00e9tail \u00e0 une \u00e9chelle qui rivalisait avec celle des gouverneurs. Aucun mari, aucun p\u00e8re n\u2019appara\u00eet pour valider ses d\u00e9cisions. Elle ne rendait de comptes qu\u2019au roi.',
    },
    {
      text: 'Mais la vraie joueuse, c\u2019\u00e9tait Atossa. Fille de Cyrus le Grand, fondateur de l\u2019Empire perse. Elle \u00e9pousa trois rois. On dit que tout vient \u00e0 point \u00e0 qui sait attendre \u2014 Atossa n\u2019a pas attendu, elle a provoqu\u00e9. H\u00e9rodote, qui ignorait les femmes perses, \u00e9crivit qu\u2019elle d\u00e9tenait \u00ab\u00a0tout le pouvoir\u00a0\u00bb \u00e0 la cour. Quand Darius dut choisir un h\u00e9ritier, elle imposa son fils Xerx\u00e8s sur le tr\u00f4ne, devant ses demi-fr\u00e8res a\u00een\u00e9s. Une seule femme d\u00e9cida qui gouvernerait le plus grand empire du monde.',
    },
    {
      text: 'Des si\u00e8cles durant, les \u00e9rudits occidentaux n\u2019ont vu \u00e0 Pers\u00e9polis que ce qu\u2019ils voulaient voir\u00a0: des harems, des femmes voil\u00e9es, un empire arri\u00e9r\u00e9. Ils ont baptis\u00e9 un b\u00e2timent \u00ab\u00a0le Harem de Xerx\u00e8s\u00a0\u00bb sans la moindre preuve. Mais les tablettes racontent une tout autre histoire. Les femmes royales circulaient entre les provinces, donnaient des banquets, g\u00e9raient des domaines et contr\u00f4laient des fortunes. Elles n\u2019\u00e9taient pas enferm\u00e9es derri\u00e8re des murs. Elles dirigeaient l\u2019empire depuis l\u2019int\u00e9rieur.',
    },
    {
      text: 'Les Grecs ont \u00e9crit l\u2019histoire, et la Perse fut d\u00e9peinte comme terre de tyrans r\u00e9gnant sur des femmes soumises. La v\u00e9rit\u00e9 est rest\u00e9e scell\u00e9e dans un mur vingt-trois si\u00e8cles, durcie par le feu qu\u2019Alexandre le Grand alluma en br\u00fblant Pers\u00e9polis. Les tablettes ont fini \u00e0 Chicago, o\u00f9 Richard Hallock passa des d\u00e9cennies \u00e0 d\u00e9chiffrer des re\u00e7us de grain \u2014 les documents les plus r\u00e9volutionnaires sur les droits des femmes. Ce n\u2019\u00e9taient pas des d\u00e9clarations solennelles. C\u2019\u00e9taient des fiches de paie.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Die Frauen, die das Weltreich lenkten»
//  Proverb: «Aller guten Dinge sind drei»
//  Subverted in §5: Atossa married three kings — proving the saying,
//  but not in the way anyone expected.
// ═══════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: 'de',
  langStoryId: 'de#women-who-ran-the-empire',
  title: 'Die Frauen, die das Weltreich lenkten',
  subtitle: 'Drei\u00dfigtausend Tontafeln enth\u00fcllten, was kein griechischer Historiker je festhielt: ein Imperium, das Frauen gleich bezahlte, Mutterschutz gew\u00e4hrte und von K\u00f6niginnen geformt wurde, die bestimmten, wer den Thron bestieg',
  excerpt: 'Dreiundzwanzig Jahrhunderte lang lagen drei\u00dfigtausend Tontafeln versiegelt in einer Mauer von Persepolis. Als man sie endlich las, enth\u00fcllten sie, was kein griechischer Geschichtsschreiber je aufschrieb: Das gr\u00f6\u00dfte Reich der Erde zahlte Frauen und M\u00e4nnern denselben Lohn, unterst\u00fctzte junge M\u00fctter und wurde an der Spitze von K\u00f6niginnen geformt, die bestimmten, wer auf dem Thron sa\u00df.',
  moralOrLesson: 'Vierundzwanzig Jahrhunderte lang erz\u00e4hlte sich die westliche Welt, das Persische Reich sei ein K\u00f6nigreich wie jedes andere gewesen \u2014 eines, in dem Frauen nichts zu sagen hatten. Dann sprengten drei\u00dfigtausend Tontafeln diesen Mythos. Sie zeigten ein Imperium, in dem Frauen denselben Lohn erhielten, Mutterschutz bekamen, riesige G\u00fcter verwalteten und bestimmten, wer auf dem Thron sa\u00df. Der Beweis war die ganze Zeit da \u2014 versiegelt in einer Mauer, geh\u00e4rtet durch Feuer, wartend darauf, dass jemand sich die M\u00fche machte, ihn zu lesen.',
  paragraphs: [
    {
      text: 'In den 1930er Jahren brachen Arch\u00e4ologen eine Mauer in Persepolis auf \u2014 Hauptstadt des Persischen Reiches im heutigen Iran \u2014 und fanden drei\u00dfigtausend Tontafeln darin versiegelt. Abrechnungen. Wer bezahlt wurde, wie viel Getreide, wie viele Arbeiter. Trockener Stoff. Bis jemand sie tats\u00e4chlich las. In diesen Quittungen steckte der Beweis, dass das gr\u00f6\u00dfte Reich der Erde Frauen f\u00fcr dieselbe Arbeit genauso bezahlte wie M\u00e4nner \u2014 f\u00fcnfundzwanzig Jahrhunderte bevor sonst jemand dar\u00fcber diskutierte.',
    },
    {
      text: 'Die Tafeln umfassen f\u00fcnfzehn Jahre unter Darius dem Gro\u00dfen, um 500 v.\u00a0Chr. Sie listen Arbeiter aus dem gesamten Reich \u2014 Perser, Babylonier, \u00c4gypter, Griechen, Inder \u2014 Tausende Namen, jeder mit Beruf und Lohnsatz. Hunderte geh\u00f6rten Frauen. Keine Sklavinnen. Keine Dienerinnen. Bezahlte Arbeiterinnen und Vorgesetzte. Wenn eine Frau dieselbe Arbeit wie ein Mann verrichtete, bekam sie denselben Lohn. Nicht als Ausnahme. \u00dcber Tausende Aufzeichnungen, f\u00fcnfzehn Jahre lang. Es war System.',
    },
    {
      text: 'Jetzt wird es richtig wild. Die Tafeln zeigen, dass Frauen nach der Geburt zus\u00e4tzlichen Lohn erhielten \u2014 staatlich finanzierter Mutterschutz im f\u00fcnften Jahrhundert vor Christus. Nicht in Athen, wo Frauen kein Eigentum besitzen und ohne Mann nicht vor die T\u00fcr durften. Nicht in Rom, wo sie wie Kinder behandelt wurden. In Persien. Die Zivilisation, die die Griechen \u201ebarbarisch\u201c nannten, hatte ein System f\u00fcr junge M\u00fctter geschaffen, das der Westen erst \u00fcber zweitausend Jahre sp\u00e4ter erreichen sollte.',
    },
    {
      text: 'Und dann waren da die Frauen ganz oben. Irdabama taucht in Dutzenden von Tafeln auf \u2014 Leiterin riesiger G\u00fcter, Befehlshaberin \u00fcber Hunderte von Arbeitern. Sie unterzeichnete Lieferungen mit ihrem eigenen Siegel: dem Bild einer Frau auf einem Thron. Sie handelte mit Getreide, Wein und Vieh in einem Ausma\u00df, das es mit Statthaltern aufnehmen konnte. Kein Ehemann, kein Vater wird je erw\u00e4hnt, um ihre Entscheidungen abzusegnen. Sie war niemandem Rechenschaft schuldig au\u00dfer dem K\u00f6nig.',
    },
    {
      text: 'Die wahre Machtspielerin war Atossa. Tochter von Kyros dem Gro\u00dfen, Gr\u00fcnder des Persischen Reiches. Sie heiratete drei K\u00f6nige nacheinander. Aller guten Dinge sind drei, sagt man \u2014 Atossa bewies es, nur anders als gedacht. Herodot, der Frauen sonst ignorierte, schrieb, sie habe \u201ealle Macht\u201c am Hof besessen. Als Darius seinen Erben w\u00e4hlen musste, schlug Atossa zu: Ihr Sohn Xerxes bekam den Thron \u2014 vor seinen \u00e4lteren Halbr\u00fcdern. Eine Frau entschied, wer das gr\u00f6\u00dfte Reich der Erde regieren w\u00fcrde.',
    },
    {
      text: 'Jahrhundertelang blickten westliche Gelehrte auf Persepolis und sahen, was sie erwarteten \u2014 Harems, verschleierte Frauen, ein r\u00fcckst\u00e4ndiges Reich. Sie tauften sogar ein Geb\u00e4ude \u201eden Harem des Xerxes\u201c, ohne jeden Beleg. Aber die Tafeln erz\u00e4hlen eine v\u00f6llig andere Geschichte. K\u00f6nigliche Frauen reisten frei zwischen Provinzen, gaben Festmahle, verwalteten G\u00fcter und kontrollierten enormen Reichtum. Sie waren nicht hinter Mauern eingesperrt. Sie lenkten das Reich von innen heraus.',
    },
    {
      text: 'Die Griechen schrieben die Geschichte, und Persien wurde als Land der Tyrannen \u00fcber hilflose Frauen gezeichnet. Die Wahrheit lag dreiundzwanzig Jahrhunderte in einer Mauer versiegelt, geh\u00e4rtet durch das Feuer, das Alexander der Gro\u00dfe legte, als er Persepolis niederbrannte. Die Tafeln landeten in Chicago, wo Richard Hallock Jahrzehnte Getreidequittungen entzifferte \u2014 die revolution\u00e4rsten Dokumente der Frauenrechtsgeschichte. Es waren keine Proklamationen. Es waren Lohnabrechnungen.',
    },
  ],
};

// ─── Validation ──────────────────────────────────────────
function validate(story, langLabel) {
  let ok = true;
  const paraTotalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`\n=== ${langLabel} ===`);
  console.log(`Title: ${story.title}`);
  console.log(`Paragraphs: ${story.paragraphs.length}`);
  console.log(`Total chars (paragraphs): ${paraTotalChars}`);

  story.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    const flag = chars > 500 ? ' \u26a0\ufe0f OVER 500c' : '';
    const wFlag = words > 100 ? ' \u26a0\ufe0f OVER 100w' : '';
    console.log(`  \u00a7${i + 1}: ${chars}c / ${words}w${flag}${wFlag}`);
    if (chars > 500) ok = false;
    if (words > 100) ok = false;
  });

  if (paraTotalChars > 3600) {
    console.log(`  \u26a0\ufe0f Total ${paraTotalChars}c exceeds 3600`);
    ok = false;
  }
  if (paraTotalChars < 2400) {
    console.log(`  \u26a0\ufe0f Total ${paraTotalChars}c below 2400`);
    ok = false;
  }

  return ok;
}

const allValid = [
  validate(es, 'SPANISH'),
  validate(fr, 'FRENCH'),
  validate(de, 'GERMAN'),
].every(Boolean);

if (!allValid) {
  console.error('\n\u274c Validation failed \u2014 fix issues above before pushing.');
  process.exit(1);
}
console.log('\n\u2705 All validations passed.\n');

// ─── Push ────────────────────────────────────────────────
for (const story of [es, fr, de]) {
  console.log(`Pushing ${story.lang}#${story.storyId} ...`);
  try {
    await docClient.send(new PutCommand({ TableName: TABLE, Item: story }));
    console.log(`  \u2705 ${story.lang} pushed successfully.`);
  } catch (err) {
    console.error(`  \u274c ${story.lang} FAILED:`, err);
    process.exit(1);
  }
}
console.log('\n\ud83c\udf89 All three languages pushed to DynamoDB.');
