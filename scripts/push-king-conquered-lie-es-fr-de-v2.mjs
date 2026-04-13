// Push recreated Spanish, French, and German versions of
// "The King Who Conquered the Lie" to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// French typography: curly apostrophes + non-breaking spaces before : ! ? ;
function frTypo(t) {
  return t
    .replace(/'/g, "\u2019")
    .replace(/ ([;:!?])/g, "\u00a0$1")
    .replace(/\u00ab /g, "\u00ab\u00a0")
    .replace(/ \u00bb/g, "\u00a0\u00bb");
}

const shared = {
  siteId: "persepolis",
  storyId: "king-who-conquered-the-lie",
  icon: "\u2694\uFE0F",
  storyCategory: "crowns_conquests",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 29.9342, lng: 52.8914 },
  source:
    "The Behistun Inscription (DB), Old Persian text translated in Kent, R.G., Old Persian: Grammar, Texts, Lexicon (1953); Herodotus, Histories III.61-88; Briant, Pierre, From Cyrus to Alexander (2002); Waters, Matt, Ancient Persia: A Concise History (2014); Hallock, R.T., Persepolis Fortification Tablets (1969)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb: "La mentira tiene las patas cortas" — subverted in P3
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#king-who-conquered-the-lie",
  title: "El rey que venci\u00f3 a la mentira",
  subtitle:
    "Hizo de la Verdad el pilar de su imperio. Puede que lo construyera sobre la mayor mentira de la historia.",
  excerpt:
    "En el 522 a.C., siete nobles persas entraron en una fortaleza y asesinaron al hombre que ocupaba el trono del mayor imperio del mundo. El asesino que sali\u00f3 de aquella c\u00e1mara ba\u00f1ada en sangre levantar\u00eda Pers\u00e9polis \u2014 y tallar\u00eda en roca la mentira m\u00e1s elaborada de la historia para justificarlo.",
  moralOrLesson:
    "El hombre que hizo de la Verdad el principio supremo de su imperio quiz\u00e1 lo levant\u00f3 sobre la mentira m\u00e1s exitosa de la historia. Y la civilizaci\u00f3n que fund\u00f3 sobre esa paradoja dur\u00f3 dos siglos, traz\u00f3 caminos entre continentes, pag\u00f3 a sus trabajadores con justicia y cre\u00f3 un arte de belleza sobrecogedora. A veces, las grandes verdades nacen de las ficciones m\u00e1s atrevidas.",
  era: "522\u2013518 a.C. (ascenso de Dar\u00edo); 1835\u20131847 (desciframiento de Behist\u00fan)",
  characters: [
    "Dar\u00edo I (el Grande)",
    "Gaumata / Bardiya (el rey en disputa)",
    "Otanes, Gobrias y los seis conspiradores",
    "Atosa (hija de Ciro el Grande)",
    "Henry Rawlinson (descifrador)",
  ],
  paragraphs: [
    {
      text: "En el 522 a.C., el Imperio persa iba de Libia a la India: el m\u00e1s grande jam\u00e1s visto. Su rey, Bardiya, hijo de Ciro el Grande, acababa de eliminar los impuestos. La gente lo adoraba. Hasta que una noche siete nobles se colaron en su fortaleza. En la oscuridad, uno inmoviliz\u00f3 al rey mientras Dar\u00edo dudaba, aterrado de herir a su compa\u00f1ero. El que lo sujetaba grit\u00f3: \u00ab\u00a1Dale, aunque nos mates a los dos!\u00bb. Dar\u00edo hundi\u00f3 la hoja. Le cortaron la cabeza y la mostraron al pueblo.",
    },
    {
      text: "Dar\u00edo no era heredero de nada: un noble menor que nadie hab\u00eda considerado. Lo que hizo despu\u00e9s lo cambi\u00f3 todo. En un precipicio del Zagros, cien metros sobre un camino antiguo, mand\u00f3 tallar la mayor inscripci\u00f3n real jam\u00e1s vista \u2014 en tres idiomas. Ah\u00ed reescribi\u00f3 la realidad. \u00bfEl hombre al que mataron? No era el verdadero Bardiya. Al pr\u00edncipe real lo hab\u00edan asesinado en secreto meses antes. Un sacerdote impostor llamado Gaumata rob\u00f3 el trono. Dar\u00edo, elegido por Dios, restaur\u00f3 la verdad.",
    },
    {
      text: "El problema: casi ning\u00fan historiador moderno se lo cree. Dar\u00edo es la \u00fanica fuente de su propia historia. Todo el imperio \u2014 incluidos los que conoc\u00edan a Bardiya \u2014 lo acept\u00f3 como leg\u00edtimo. Las rebajas de impuestos encajan con un gobernante real, no con un impostor desesperado. Tras el golpe, Dar\u00edo se cas\u00f3 con la hija de Ciro y la de Bardiya \u2014 eso se hace para absorber un linaje, no para restaurarlo. Dicen que la mentira tiene las patas cortas. Esta se tall\u00f3 en roca y camin\u00f3 dos mil a\u00f1os.",
    },
    {
      text: "El imperio tampoco se lo trag\u00f3. En un solo a\u00f1o estallaron diecinueve rebeliones en las provincias. Otro hombre se proclam\u00f3 Bardiya \u2014 lo que te dice cu\u00e1ntos persas pensaban que Dar\u00edo ment\u00eda. Los aplast\u00f3 a todos con violencia brutal. A un rebelde le cortaron nariz, orejas y lengua, le arrancaron un ojo y lo empalaron en p\u00fablico. Cada ejecuci\u00f3n llevaba el mismo mensaje: estos hombres segu\u00edan \u00abla Mentira\u00bb, el enemigo c\u00f3smico de la Verdad persa. Oponerse a Dar\u00edo era oponerse a Dios.",
    },
    {
      text: "Tras ganar a sangre y propaganda, Dar\u00edo levant\u00f3 una de las civilizaciones m\u00e1s avanzadas de la historia. En Pers\u00e9polis, trabajadores de decenas de naciones cobraban salario: nada de esclavos. Las mujeres ganaban igual. Embarazadas con raciones extra. Sus caminos eran tan r\u00e1pidos que Her\u00f3doto escribi\u00f3 que \u00abni la nieve, ni la lluvia, ni la noche\u00bb frenaban a sus mensajeros \u2014 frase que el correo de EE.UU. adopt\u00f3 como lema veinticuatro siglos despu\u00e9s. El mentiroso construy\u00f3 algo digno de creer.",
    },
    {
      text: "La inscripci\u00f3n qued\u00f3 ilegible dos mil a\u00f1os \u2014 hasta que en 1835 un oficial brit\u00e1nico llamado Henry Rawlinson empez\u00f3 a escalar. Copiaba los signos con una sola mano, colgado de una escalera contra el precipicio. Para las zonas m\u00e1s dif\u00edciles, baj\u00f3 a un chico kurdo con cuerdas. Tard\u00f3 doce a\u00f1os. Cuando descifr\u00f3 aquella escritura, abri\u00f3 las puertas de la civilizaci\u00f3n mesopot\u00e1mica \u2014 lo que la Piedra Rosetta hizo con los jerogl\u00edficos. Tras dos mil a\u00f1os de silencio, Dar\u00edo volv\u00eda a hablar.",
    },
    {
      text: "Hoy sigue ah\u00ed, tallado en la roca: un pie sobre la espalda de su enemigo, nueve reyes rebeldes encadenados ante \u00e9l. Pers\u00e9polis sigue en pie en las llanuras de Ir\u00e1n, sus columnas apuntando al cielo que Dar\u00edo dijo que su dios cre\u00f3. Y la paradoja no tiene respuesta limpia: un asesino que abander\u00f3 la Verdad, un propagandista que construy\u00f3 algo digno de admirar, un hombre que fund\u00f3 el mayor imperio del mundo sobre su mentira m\u00e1s elaborada \u2014 y dedic\u00f3 su vida a hacerla realidad.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb: "La vérité finit toujours par éclater" — subverted in P3
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#king-who-conquered-the-lie",
  title: frTypo("Le roi qui vainquit le mensonge"),
  subtitle: frTypo(
    "L'homme qui fit de la V\u00e9rit\u00e9 le principe sacr\u00e9 de son empire l'a peut-\u00eatre b\u00e2ti sur le mensonge le plus r\u00e9ussi de l'histoire"
  ),
  excerpt: frTypo(
    "En 522 av. J.-C., sept nobles perses p\u00e9n\u00e8trent dans une forteresse et assassinent l'homme sur le tr\u00f4ne du plus grand empire du monde. Le meurtrier qui sort de cette chambre ensanglant\u00e9e va b\u00e2tir Pers\u00e9polis \u2014 et graver dans la roche le plus audacieux des mensonges pour le justifier."
  ),
  moralOrLesson: frTypo(
    "L'homme qui fit de la V\u00e9rit\u00e9 le principe sacr\u00e9 de son empire l'a peut-\u00eatre b\u00e2ti sur le mensonge le plus r\u00e9ussi de l'histoire. La civilisation qu'il fonda sur ce paradoxe dura deux si\u00e8cles, tra\u00e7a des routes entre les continents, paya ses ouvriers \u00e9quitablement et produisit un art d'une beaut\u00e9 transcendante. Parfois, les plus grandes v\u00e9rit\u00e9s naissent des fictions les plus audacieuses."
  ),
  era: frTypo("522\u2013518 av. J.-C. (ascension de Darius) ; 1835\u20131847 (d\u00e9chiffrement de Behistoun)"),
  characters: [
    frTypo("Darius Ier (le Grand)"),
    frTypo("Gaumata / Bardiya (le roi contest\u00e9)"),
    frTypo("Otan\u00e8s, Gobryas et les six conspirateurs"),
    frTypo("Atossa (fille de Cyrus le Grand)"),
    frTypo("Henry Rawlinson (d\u00e9chiffreur)"),
  ],
  paragraphs: [
    {
      text: frTypo(
        "En 522 av. J.-C., l'Empire perse s'\u00e9tend de la Libye \u00e0 l'Inde \u2014 le plus vaste jamais connu. Bardiya, fils de Cyrus le Grand, vient de supprimer les imp\u00f4ts. Le peuple l'adore. Puis une nuit, sept nobles forcent sa forteresse. Dans le noir, l'un plaque le roi tandis que Darius h\u00e9site, terrifi\u00e9 de poignarder son alli\u00e9. Celui qui le tient hurle : \u00ab Frappe, m\u00eame si tu nous tues tous les deux ! \u00bb Darius enfonce sa lame. Ils lui tranchent la t\u00eate et la brandissent devant la foule."
      ),
    },
    {
      text: frTypo(
        "Darius n'a rien d'un h\u00e9ritier \u2014 un noble mineur auquel personne n'a song\u00e9. Ce qu'il fait ensuite change tout. Sur une falaise du Zagros, cent m\u00e8tres au-dessus d'une route antique, il fait graver la plus grande inscription royale jamais vue \u2014 en trois langues. Dedans, il r\u00e9\u00e9crit la r\u00e9alit\u00e9. L'homme qu'ils ont tu\u00e9 ? Pas le vrai Bardiya. Le prince avait \u00e9t\u00e9 assassin\u00e9 en secret. Un pr\u00eatre sosie nomm\u00e9 Gaumata avait usurp\u00e9 le tr\u00f4ne. Darius, choisi par Dieu, n'a fait que r\u00e9tablir la v\u00e9rit\u00e9."
      ),
    },
    {
      text: frTypo(
        "Le probl\u00e8me : presque aucun historien moderne ne le croit. Darius est la seule source de son histoire. L'empire \u2014 y compris des gens qui connaissaient Bardiya \u2014 avait accept\u00e9 ce roi sans broncher. Les baisses d'imp\u00f4ts collent mieux avec un vrai souverain qu'avec un imposteur paniqu\u00e9. Apr\u00e8s le coup d'\u00c9tat, Darius \u00e9pouse la fille de Cyrus et celle de Bardiya \u2014 pour absorber une lign\u00e9e, pas la restaurer. On dit que la v\u00e9rit\u00e9 finit toujours par \u00e9clater. Celle-ci a mis deux mille ans."
      ),
    },
    {
      text: frTypo(
        "L'empire ne l'a pas gob\u00e9 non plus. Dix-neuf r\u00e9voltes \u00e9clatent dans les grandes provinces en un an. Un deuxi\u00e8me homme pr\u00e9tend \u00eatre Bardiya \u2014 ce qui en dit long. Darius les \u00e9crase avec une violence terrifiante. Un rebelle se fait couper nez, oreilles et langue, arracher un \u0153il, puis empaler en public. Chaque ex\u00e9cution porte le m\u00eame message : ces hommes suivaient \u00ab le Mensonge \u00bb, ennemi cosmique de la V\u00e9rit\u00e9 dans la foi perse. S'opposer \u00e0 Darius, c'est s'opposer \u00e0 Dieu."
      ),
    },
    {
      text: frTypo(
        "Vainqueur par le sang et la propagande, Darius b\u00e2tit l'une des civilisations les plus avanc\u00e9es de l'histoire. \u00c0 Pers\u00e9polis, des ouvriers de dizaines de nations touchent un salaire : pas un esclave. Les femmes gagnent autant. Les enceintes ont des rations en plus. Ses routes sont si rapides qu'H\u00e9rodote \u00e9crit que \u00ab ni la neige, ni la pluie, ni la nuit \u00bb n'arr\u00eatent ses courriers \u2014 phrase que la poste am\u00e9ricaine adoptera vingt-quatre si\u00e8cles plus tard. Le menteur b\u00e2tit quelque chose digne d'y croire"
      ),
    },
    {
      text: frTypo(
        "L'inscription reste ind\u00e9chiffrable deux mille ans \u2014 jusqu'en 1835, quand un officier britannique nomm\u00e9 Rawlinson commence \u00e0 escalader. Il recopie les signes d'une main, suspendu \u00e0 une \u00e9chelle contre la paroi. Pour les passages les plus ardus, il fait descendre un jeune Kurde au bout d'une corde. Douze ans. Quand il perce le code, il ouvre la civilisation m\u00e9sopotamienne \u2014 ce que la pierre de Rosette avait fait pour les hi\u00e9roglyphes. Apr\u00e8s deux mille ans de silence, Darius reprend la parole."
      ),
    },
    {
      text: frTypo(
        "Aujourd'hui, il est toujours l\u00e0, grav\u00e9 dans la falaise : un pied sur le dos de son ennemi, neuf rois rebelles encha\u00een\u00e9s devant lui. Pers\u00e9polis se dresse dans les plaines d'Iran, colonnes tendues vers le ciel que Darius disait cr\u00e9\u00e9 par son dieu. Le paradoxe reste entier : un meurtrier champion de la V\u00e9rit\u00e9, un propagandiste qui a b\u00e2ti quelque chose de grand, un homme qui a fond\u00e9 le plus vaste empire du monde sur son mensonge le plus \u00e9labor\u00e9 \u2014 puis a pass\u00e9 sa vie \u00e0 le rendre vrai."
      ),
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb: "Wer einmal lügt, dem glaubt man nicht" — subverted in P3
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#king-who-conquered-the-lie",
  title: "Der K\u00f6nig, der die L\u00fcge besiegte",
  subtitle:
    "Der Mann, der die Wahrheit zum h\u00f6chsten Prinzip seines Reiches machte, hat es vielleicht auf der erfolgreichsten L\u00fcge der Geschichte errichtet",
  excerpt:
    "Im Jahr 522 v.\u00a0Chr. drangen sieben persische Adlige in eine Festung ein und ermordeten den Mann auf dem Thron des gr\u00f6\u00dften Reiches der Welt. Der M\u00f6rder, der aus jener blutgetr\u00e4nkten Kammer trat, sollte Persepolis erbauen \u2014 und die k\u00fchnste L\u00fcge der Geschichte in Stein mei\u00dfeln, um es zu rechtfertigen.",
  moralOrLesson:
    "Der Mann, der die Wahrheit zum h\u00f6chsten Prinzip seines Reiches machte, hat es vielleicht auf der erfolgreichsten L\u00fcge der Geschichte errichtet. Die Zivilisation, die er auf diesem Paradox gr\u00fcndete, bestand zwei Jahrhunderte, baute Stra\u00dfen zwischen Kontinenten, bezahlte ihre Arbeiter gerecht und schuf Kunst von zeitloser Sch\u00f6nheit. Manchmal entstehen die gr\u00f6\u00dften Wahrheiten aus den k\u00fchnsten Erfindungen.",
  era: "522\u2013518 v.\u00a0Chr. (Aufstieg des Darius); 1835\u20131847 (Entzifferung von Behistun)",
  characters: [
    "Darius I. (der Gro\u00dfe)",
    "Gaumata / Bardiya (der umstrittene K\u00f6nig)",
    "Otanes, Gobryas und die sechs Verschw\u00f6rer",
    "Atossa (Tochter von Kyros dem Gro\u00dfen)",
    "Henry Rawlinson (Entzifferer)",
  ],
  paragraphs: [
    {
      text: "522 v.\u00a0Chr.: Das Persische Reich reicht von Libyen bis Indien \u2014 das gr\u00f6\u00dfte der Welt. Sein K\u00f6nig Bardiya, Sohn von Kyros dem Gro\u00dfen, hat die Steuern abgeschafft. Das Volk liebt ihn. Dann brechen sieben Adlige nachts in seine Festung ein. Im Dunkeln ringt einer mit dem K\u00f6nig, w\u00e4hrend Darius z\u00f6gert \u2014 Angst, den Verb\u00fcndeten zu treffen. Der Mann br\u00fcllt: \u201eSto\u00df zu, selbst wenn du uns beide triffst!\u201c Darius st\u00f6\u00dft zu. Sie schlagen ihm den Kopf ab und zeigen ihn der Menge.",
    },
    {
      text: "Darius ist kein Thronfolger \u2014 ein Adliger, den niemand auf dem Zettel hat. Was er tut, ver\u00e4ndert alles. An einer Felswand im Zagros, hundert Meter \u00fcber einer antiken Stra\u00dfe, l\u00e4sst er die gr\u00f6\u00dfte Inschrift aller Zeiten mei\u00dfeln \u2014 in drei Sprachen. Darin schreibt er die Wirklichkeit um. Den Get\u00f6teten? Nicht der echte Bardiya. Der Prinz sei zuvor heimlich ermordet worden. Ein Priester namens Gaumata habe den Thron gestohlen. Darius, von Gott auserw\u00e4hlt, stellte die Wahrheit wieder her.",
    },
    {
      text: "Das Problem: Fast kein Historiker glaubt ihm. Darius ist die einzige Quelle seiner Geschichte. Das Reich \u2014 auch Leute, die Bardiya kannten \u2014 hatte den K\u00f6nig akzeptiert. Die Steuersenkungen passen zu einem echten Herrscher, nicht zu einem Betr\u00fcger. Nach dem Putsch heiratete Darius die Tochter von Kyros und die von Bardiya \u2014 Z\u00fcge, mit denen man eine Blutlinie schluckt, nicht wiederherstellt. Man sagt: Wer einmal l\u00fcgt, dem glaubt man nicht. Darius log einmal \u2014 und ihm glaubte man zweitausend Jahre.",
    },
    {
      text: "Das Reich kaufte es ihm nicht ab. Neunzehn Aufst\u00e4nde in einem Jahr. Ein zweiter Mann behauptete, Bardiya zu sein \u2014 was verr\u00e4t, wie viele Perser Darius f\u00fcr einen L\u00fcgner hielten. Er schlug sie alle nieder. Einem Rebellen schnitt man Nase, Ohren und Zunge ab, stach ein Auge aus und pf\u00e4hlte ihn \u00f6ffentlich. Jede Hinrichtung trug dieselbe Botschaft: Diese M\u00e4nner folgten \u201eder L\u00fcge\u201c, dem kosmischen Feind der Wahrheit im persischen Glauben. Wer sich gegen Darius stellte, stellte sich gegen Gott.",
    },
    {
      text: "Nach Sieg durch Blut und Propaganda baute Darius eine der fortschrittlichsten Zivilisationen der Geschichte. In Persepolis bekamen Arbeiter aus Dutzenden Nationen Lohn \u2014 kein Sklave. Frauen verdienten gleich viel. Schwangere bekamen Extrarationen. Seine Stra\u00dfen waren so schnell, dass Herodot schrieb, \u201eweder Schnee noch Regen noch die Nacht\u201c k\u00f6nnten seine Boten aufhalten \u2014 ein Satz, den die US-Post vierundzwanzig Jahrhunderte sp\u00e4ter \u00fcbernahm. Der L\u00fcgner baute etwas, woran zu glauben sich lohnte.",
    },
    {
      text: "Die Inschrift blieb zweitausend Jahre unlesbar \u2014 bis 1835 ein britischer Offizier namens Rawlinson zu klettern begann. Er kopierte die Zeichen einh\u00e4ndig, auf einer Leiter an der Felswand h\u00e4ngend. F\u00fcr die schwierigsten Stellen lie\u00df er einen kurdischen Jungen an Seilen hinunter. Zw\u00f6lf Jahre. Als er den Code knackte, erschloss er die Schrift des alten Mesopotamien \u2014 was der Stein von Rosetta f\u00fcr die Hieroglyphen getan hatte. Nach zweitausend Jahren Schweigen sprach Darius wieder.",
    },
    {
      text: "Heute steht er dort, in den Fels gemei\u00dfelt: ein Fu\u00df auf dem R\u00fccken seines Feindes, neun Rebellenk\u00f6nige in Ketten vor ihm. Persepolis erhebt sich noch aus den Ebenen des Iran, S\u00e4ulen greifen nach dem Himmel, den Darius seinem Gott zuschrieb. Das Paradox bleibt ohne saubere Antwort: ein M\u00f6rder, der die Wahrheit verfocht; ein Propagandist, der Gro\u00dfes schuf; ein Mann, der das gr\u00f6\u00dfte Reich der Welt auf seiner k\u00fchnsten L\u00fcge errichtete \u2014 und sein Leben damit verbrachte, sie wahr zu machen.",
    },
  ],
};

// ─── Validation ──────────────────────────────────────────────────────────────

const versions = [
  { label: "SPANISH (es)", data: es },
  { label: "FRENCH (fr)", data: fr },
  { label: "GERMAN (de)", data: de },
];

let allValid = true;

for (const { label, data } of versions) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Validating ${label}...`);
  let totalChars = 0;
  for (let i = 0; i < data.paragraphs.length; i++) {
    const text = data.paragraphs[i].text;
    const cc = text.length;
    const wc = text.split(/\s+/).length;
    totalChars += cc;
    const ok = cc <= 500 && wc <= 100;
    console.log(`  P${i + 1}: ${cc} chars, ${wc} words ${ok ? "\u2713" : "\u2717 OVER"}`);
    if (!ok) allValid = false;
  }
  console.log(`  Total: ${totalChars} chars, ${data.paragraphs.length} paragraphs`);
  const inRange = totalChars >= 2400 && totalChars <= 3600;
  console.log(`  Range: ${inRange ? "\u2713 IN RANGE" : "\u2717 OUT OF RANGE"}`);
  if (!inRange) allValid = false;
}

if (!allValid) {
  console.error("\n\u2717 Validation failed. Aborting.");
  process.exit(1);
}

console.log(`\n${"═".repeat(60)}`);
console.log("All validations passed. Pushing to DynamoDB...\n");

// ─── Push ────────────────────────────────────────────────────────────────────

for (const { label, data } of versions) {
  console.log(`Pushing ${label}...`);
  console.log(`  langStoryId: ${data.langStoryId}`);
  console.log(`  title:       ${data.title}`);

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  \u2705 pushed (new record).`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  \u26a0\ufe0f  exists \u2014 overwriting...`);
      await doc.send(new PutCommand({ TableName: TABLE, Item: data }));
      console.log(`  \u2705 overwritten.`);
    } else {
      console.error(`  \u274c FAILED: ${err.message}`);
      process.exit(1);
    }
  }
}

console.log(`\n${"═".repeat(60)}`);
console.log("Done. All three pushed.");
console.log(`Timestamp: ${now}`);
