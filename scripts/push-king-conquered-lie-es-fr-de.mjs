// Push Spanish, French, and German recreations of "The King Who Conquered the Lie"
// to the Story DynamoDB table.

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
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#king-who-conquered-the-lie",

  title: "El rey que venció a la mentira",

  subtitle:
    "El hombre que hizo de la Verdad el pilar de su imperio quizá lo construyó sobre la mentira más audaz de la historia",

  excerpt:
    "En el 522 a.C., siete nobles persas irrumpieron en una fortaleza y asesinaron al hombre sentado en el trono del mayor imperio del mundo. El asesino que salió de aquella cámara ensangrentada construiría Persépolis — y tallaría en roca la mentira más elaborada de la historia para justificarlo.",

  moralOrLesson:
    "El hombre que hizo de la Verdad el principio supremo de su imperio quizá lo construyó sobre la mentira más exitosa de la historia. Y la civilización que fundó sobre esa paradoja perduró dos siglos, trazó caminos que conectaron continentes, pagó a sus trabajadores con justicia y produjo un arte de belleza trascendente. A veces las grandes verdades nacen de las ficciones más audaces.",

  era: "522\u2013518 a.C. (ascenso de Darío); 1835\u20131847 (desciframiento de Behistún)",

  characters: [
    "Darío I (el Grande)",
    "Gaumata / Bardiya (el rey en disputa)",
    "Otanes, Gobrias y los seis conspiradores",
    "Atosa (hija de Ciro el Grande)",
    "Henry Rawlinson (descifrador)",
  ],

  paragraphs: [
    {
      text: "En el 522 a.C., el Imperio persa se extendía de Libia a la India: el más grande que el mundo había visto. Su rey, Bardiya, hijo de Ciro el Grande, acababa de eliminar los impuestos en todas las provincias. El pueblo lo adoraba. Hasta que una noche, siete nobles irrumpieron en su fortaleza. En la oscuridad, uno sujetó al rey mientras Darío dudaba, aterrado de apuñalar a su propio aliado. El que lo inmovilizaba gritó: «¡Clava el cuchillo, aunque nos mates a los dos!». Darío hundió la hoja. Le cortaron la cabeza y la mostraron al pueblo.",
    },
    {
      text: "Darío no era heredero de nada: un noble menor en quien nadie había pensado para el trono. Lo que hizo después lo cambió todo. En un acantilado de los montes Zagros, a cien metros sobre un camino antiguo, mandó tallar la inscripción real más grande jamás vista, en tres idiomas. En ella reescribió la realidad. ¿El hombre al que mataron? No era el verdadero Bardiya. El príncipe auténtico había sido asesinado en secreto meses antes. Un sacerdote impostor llamado Gaumata había robado el trono. Darío, elegido por Dios, restauró la verdad.",
    },
    {
      text: "El problema: casi ningún historiador moderno le cree. Darío es la única fuente de su propia historia. Todo el imperio — incluida gente que conocía a Bardiya en persona — aceptó al rey como auténtico. Las rebajas de impuestos tienen más sentido viniendo de un gobernante legítimo que de un impostor desesperado. Tras el golpe, Darío se casó con la hija de Ciro y con la hija de Bardiya — movimientos para absorber un linaje, no para restaurarlo. Dicen que la mentira tiene las patas cortas. Esta caminó durante dos mil años.",
    },
    {
      text: "El imperio tampoco se lo tragó. Diecinueve rebeliones estallaron en todas las provincias importantes en un solo año. Un segundo hombre incluso aseguró ser Bardiya, lo que dice mucho de cuántos persas pensaban que Darío mentía. Los aplastó a todos con una violencia aterradora. A un rebelde le cortaron la nariz, las orejas y la lengua, le arrancaron un ojo y lo empalaron a la vista de todos. Cada ejecución llevaba el mismo mensaje: estos hombres seguían «la Mentira», el enemigo cósmico de la Verdad en la fe persa. Oponerse a Darío era oponerse a Dios.",
    },
    {
      text: "Tras ganar a sangre y propaganda, Darío construyó una de las civilizaciones más avanzadas de la historia. En Persépolis, trabajadores de decenas de naciones cobraban un salario: nadie era esclavo. Las mujeres ganaban lo mismo que los hombres. Las embarazadas recibían raciones extra. Sus caminos eran tan rápidos que Heródoto escribió que «ni la nieve, ni la lluvia, ni el calor, ni la noche» frenaban a sus mensajeros — una frase que el correo de Estados Unidos adoptó como lema veinticuatro siglos después. El mentiroso construyó algo digno de creer.",
    },
    {
      text: "La inscripción permaneció ilegible durante dos mil años, hasta que en 1835 un oficial británico llamado Henry Rawlinson empezó a escalar. Copió los signos antiguos con una sola mano, colgado de una escalera contra la pared del acantilado. Bajó a un chico kurdo con cuerdas para alcanzar las secciones más difíciles. Tardó doce años. Cuando descifró la escritura, abrió la puerta a toda la civilización mesopotámica — lo que la Piedra Rosetta hizo por los jeroglíficos. Después de dos mil años de silencio, Darío volvía a hablar.",
    },
    {
      text: "Hoy sigue ahí, tallado en la roca: un pie sobre la espalda de su enemigo, nueve reyes rebeldes encadenados ante él. Persépolis sigue alzándose en las llanuras de Irán, con sus columnas apuntando al cielo que Darío dijo que su dios había creado. Y la paradoja no tiene respuesta limpia: un asesino que defendió la Verdad, un propagandista que construyó algo digno de admirar, un hombre que fundó el mayor imperio del mundo sobre su mentira más elaborada — y después dedicó su vida a hacerla realidad.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#king-who-conquered-the-lie",

  title: "Le roi qui vainquit le mensonge",

  subtitle:
    "L\u2019homme qui fit de la V\u00e9rit\u00e9 le principe supr\u00eame de son empire l\u2019a peut-\u00eatre b\u00e2ti sur le mensonge le plus audacieux de l\u2019histoire",

  excerpt:
    "En 522 av. J.-C., sept nobles perses p\u00e9n\u00e9tr\u00e8rent dans une forteresse et assassin\u00e8rent l\u2019homme assis sur le tr\u00f4ne du plus grand empire du monde. Le meurtrier qui sortit de cette chambre ensanglant\u00e9e allait b\u00e2tir Pers\u00e9polis \u2014 et graver dans la roche le mensonge le plus \u00e9labor\u00e9 de l\u2019histoire pour le justifier.",

  moralOrLesson:
    "L\u2019homme qui fit de la V\u00e9rit\u00e9 le principe supr\u00eame de son empire l\u2019a peut-\u00eatre b\u00e2ti sur le mensonge le plus r\u00e9ussi de l\u2019histoire. La civilisation qu\u2019il fonda sur ce paradoxe dura deux si\u00e8cles, tra\u00e7a des routes entre les continents, paya ses ouvriers justement et produisit un art d\u2019une beaut\u00e9 transcendante. Parfois, les plus grandes v\u00e9rit\u00e9s naissent des fictions les plus audacieuses.",

  era: "522\u2013518 av. J.-C. (ascension de Darius) ; 1835\u20131847 (d\u00e9chiffrement de Behistoun)",

  characters: [
    "Darius Ier (le Grand)",
    "Gaumata / Bardiya (le roi contest\u00e9)",
    "Otan\u00e8s, Gobryas et les six conspirateurs",
    "Atossa (fille de Cyrus le Grand)",
    "Henry Rawlinson (d\u00e9chiffreur)",
  ],

  paragraphs: [
    {
      text: "En 522 avant notre \u00e8re, l\u2019Empire perse s\u2019\u00e9tirait de la Libye \u00e0 l\u2019Inde \u2014 le plus vaste que le monde ait connu. Son roi, Bardiya, fils de Cyrus le Grand, venait de supprimer les imp\u00f4ts. Le peuple l\u2019adorait. Puis une nuit, sept nobles firent irruption dans sa forteresse. Dans le noir, l\u2019un d\u2019eux plaqua le roi au sol tandis que Darius h\u00e9sitait, terrifi\u00e9 de poignarder son propre alli\u00e9. Celui qui maintenait le roi hurla\u00a0: \u00ab\u00a0Frappe, m\u00eame si tu nous tues tous les deux\u00a0!\u00a0\u00bb Darius enfon\u00e7a sa lame. Ils tranch\u00e8rent la t\u00eate du roi et la brandirent devant la foule.",
    },
    {
      text: "Darius n\u2019avait rien d\u2019un h\u00e9ritier \u2014 un noble mineur auquel personne n\u2019avait song\u00e9 pour le tr\u00f4ne. Ce qu\u2019il fit ensuite changea tout. Sur une falaise des monts Zagros, \u00e0 cent m\u00e8tres au-dessus d\u2019une route antique, il fit graver la plus grande inscription royale jamais r\u00e9alis\u00e9e \u2014 en trois langues. Il y r\u00e9\u00e9crivit la r\u00e9alit\u00e9. L\u2019homme qu\u2019ils avaient tu\u00e9\u00a0? Pas le vrai Bardiya. Le vrai prince avait \u00e9t\u00e9 assassin\u00e9 en secret des mois plus t\u00f4t. Un pr\u00eatre sosie nomm\u00e9 Gaumata avait usurp\u00e9 le tr\u00f4ne. Darius, \u00e9lu de Dieu, avait restaur\u00e9 la v\u00e9rit\u00e9.",
    },
    {
      text: "Le probl\u00e8me\u00a0: presque aucun historien moderne ne le croit. Darius est la seule source de sa propre histoire. L\u2019empire entier \u2014 y compris des gens qui connaissaient Bardiya personnellement \u2014 avait accept\u00e9 ce roi comme authentique. Les baisses d\u2019imp\u00f4ts s\u2019expliquent bien mieux par un souverain l\u00e9gitime que par un imposteur paniqu\u00e9. Apr\u00e8s le coup d\u2019\u00c9tat, Darius \u00e9pousa la fille de Cyrus et celle de Bardiya \u2014 des man\u0153uvres pour absorber une lign\u00e9e, pas la restaurer. On dit que la v\u00e9rit\u00e9 finit toujours par \u00e9clater. Celle de Darius a mis deux mille ans.",
    },
    {
      text: "L\u2019empire ne l\u2019a pas cru non plus. Dix-neuf r\u00e9voltes \u00e9clat\u00e8rent dans toutes les provinces majeures en une seule ann\u00e9e. Un deuxi\u00e8me homme pr\u00e9tendit m\u00eame \u00eatre Bardiya \u2014 ce qui en dit long sur le nombre de Perses convaincus que Darius mentait. Il les \u00e9crasa tous avec une violence terrifiante. Un rebelle eut le nez, les oreilles et la langue coup\u00e9s, un \u0153il arrach\u00e9, puis fut empal\u00e9 \u00e0 la vue de tous. Chaque ex\u00e9cution portait le m\u00eame message\u00a0: ces hommes suivaient \u00ab\u00a0le Mensonge\u00a0\u00bb, l\u2019ennemi cosmique de la V\u00e9rit\u00e9 dans la foi perse. S\u2019opposer \u00e0 Darius, c\u2019\u00e9tait s\u2019opposer \u00e0 Dieu.",
    },
    {
      text: "Puis, vainqueur par le sang et la propagande, Darius b\u00e2tit une des civilisations les plus avanc\u00e9es de l\u2019histoire. \u00c0 Pers\u00e9polis, des ouvriers de dizaines de nations touchaient un salaire \u2014 aucun esclave. Les femmes gagnaient autant que les hommes. Les femmes enceintes recevaient des rations en plus. Ses routes \u00e9taient si rapides qu\u2019H\u00e9rodote \u00e9crivit que \u00ab\u00a0ni la neige, ni la pluie, ni la nuit\u00a0\u00bb n\u2019arr\u00eataient ses messagers \u2014 une formule que la poste am\u00e9ricaine adopta comme devise vingt-quatre si\u00e8cles plus tard. Le menteur b\u00e2tit quelque chose qui m\u00e9ritait qu\u2019on y croie.",
    },
    {
      text: "L\u2019inscription resta ind\u00e9chiffrable pendant deux mille ans \u2014 jusqu\u2019en 1835, quand un officier britannique nomm\u00e9 Henry Rawlinson commen\u00e7a l\u2019escalade. Il recopiait les signes anciens d\u2019une seule main, suspendu \u00e0 une \u00e9chelle contre la paroi. Il fit descendre un gar\u00e7on kurde au bout d\u2019une corde pour atteindre les sections les plus difficiles. Il lui fallut douze ans. Quand il per\u00e7a le code, il ouvrit les portes de toute la civilisation m\u00e9sopotamienne \u2014 ce que la pierre de Rosette avait fait pour les hi\u00e9roglyphes. Apr\u00e8s deux mille ans de silence, Darius reprenait la parole.",
    },
    {
      text: "Aujourd\u2019hui, il est toujours l\u00e0, grav\u00e9 dans la falaise\u00a0: un pied sur le dos de son ennemi, neuf rois rebelles encha\u00een\u00e9s devant lui. Pers\u00e9polis se dresse encore dans les plaines d\u2019Iran, ses colonnes tendues vers le ciel que Darius disait cr\u00e9\u00e9 par son dieu. Et le paradoxe reste entier\u00a0: un meurtrier champion de la V\u00e9rit\u00e9, un propagandiste qui construisit quelque chose de grand, un homme qui fonda le plus vaste empire du monde sur son mensonge le plus \u00e9labor\u00e9 \u2014 et passa sa vie \u00e0 le rendre vrai.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#king-who-conquered-the-lie",

  title: "Der K\u00f6nig, der die L\u00fcge besiegte",

  subtitle:
    "Der Mann, der die Wahrheit zum h\u00f6chsten Prinzip seines Reiches machte, hat es vielleicht auf der erfolgreichsten L\u00fcge der Geschichte errichtet",

  excerpt:
    "Im Jahr 522 v.\u00a0Chr. drangen sieben persische Adlige in eine Festung ein und ermordeten den Mann auf dem Thron des gr\u00f6\u00dften Reiches der Welt. Der M\u00f6rder, der aus jener blutgetr\u00e4nkten Kammer trat, sollte Persepolis erbauen \u2014 und die aufwendigste L\u00fcge der Geschichte in Stein mei\u00dfeln, um alles zu rechtfertigen.",

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
      text: "522 vor Christus erstreckte sich das Persische Reich von Libyen bis Indien \u2014 das gr\u00f6\u00dfte, das die Welt je gesehen hatte. Sein K\u00f6nig Bardiya, Sohn von Kyros dem Gro\u00dfen, hatte gerade die Steuern im ganzen Reich abgeschafft. Das Volk liebte ihn. Dann brachen eines Nachts sieben Adlige in seine Festung ein. Im Dunkeln rang einer den K\u00f6nig nieder, w\u00e4hrend Darius z\u00f6gerte, seinen eigenen Verb\u00fcndeten zu treffen. Der Mann, der den K\u00f6nig festhielt, br\u00fcllte: \u201eSto\u00df zu, selbst wenn du uns beide triffst!\u201c Darius stie\u00df zu. Sie schlugen dem K\u00f6nig den Kopf ab und zeigten ihn dem Volk.",
    },
    {
      text: "Darius war kein Thronfolger \u2014 ein unbedeutender Adliger, an den niemand gedacht hatte. Was er dann tat, ver\u00e4nderte alles. An einer Felswand im Zagros-Gebirge, hundert Meter \u00fcber einer antiken Stra\u00dfe, lie\u00df er die gr\u00f6\u00dfte k\u00f6nigliche Inschrift aller Zeiten einmei\u00dfeln \u2014 in drei Sprachen. Darin schrieb er die Wirklichkeit um. Der Mann, den sie get\u00f6tet hatten? Nicht der echte Bardiya. Der wahre Prinz sei Monate zuvor heimlich ermordet worden. Ein Doppelg\u00e4nger-Priester namens Gaumata habe den Thron gestohlen. Darius, auserw\u00e4hlt von Gott, habe die Wahrheit wiederhergestellt.",
    },
    {
      text: "Das Problem: Kaum ein moderner Historiker glaubt ihm. Darius ist die einzige Quelle seiner eigenen Geschichte. Das ganze Reich \u2014 auch Leute, die Bardiya pers\u00f6nlich kannten \u2014 hatte den K\u00f6nig als echt akzeptiert. Die Steuersenkungen passen zu einem echten Herrscher, nicht zu einem verzweifelten Betr\u00fcger. Nach dem Putsch heiratete Darius die Tochter von Kyros und die von Bardiya \u2014 Z\u00fcge, um eine Blutlinie zu schlucken, nicht wiederherzustellen. Man sagt: Wer einmal l\u00fcgt, dem glaubt man nicht. Darius log einmal \u2014 und die Welt glaubte ihm zweitausend Jahre.",
    },
    {
      text: "Das Reich glaubte ihm auch nicht. Neunzehn Aufst\u00e4nde brachen in einem einzigen Jahr \u00fcber alle gro\u00dfen Provinzen herein. Ein zweiter Mann behauptete sogar, Bardiya zu sein \u2014 was zeigt, wie viele Perser Darius f\u00fcr einen L\u00fcgner hielten. Er schlug sie alle mit brutaler Gewalt nieder. Einem Rebellen schnitt man Nase, Ohren und Zunge ab, stach ihm ein Auge aus und pf\u00e4hlte ihn \u00f6ffentlich. Jede Hinrichtung trug dieselbe Botschaft: Diese M\u00e4nner folgten \u201eder L\u00fcge\u201c, dem kosmischen Feind der Wahrheit im persischen Glauben. Wer sich gegen Darius stellte, stellte sich gegen Gott.",
    },
    {
      text: "Dann \u2014 nach dem Sieg durch Blut und Propaganda \u2014 baute Darius eine der fortschrittlichsten Zivilisationen der Geschichte. In Persepolis erhielten Arbeiter aus Dutzenden Nationen Lohn \u2014 kein einziger Sklave. Frauen verdienten so viel wie M\u00e4nner. Schwangere bekamen Extrarationen. Seine Stra\u00dfen waren so schnell, dass Herodot schrieb: \u201eWeder Schnee noch Regen noch Hitze noch die Nacht\u201c k\u00f6nnten seine Boten bremsen \u2014 ein Satz, den die US-Post vierundzwanzig Jahrhunderte sp\u00e4ter als Motto \u00fcbernahm. Der L\u00fcgner baute etwas, an das es sich zu glauben lohnte.",
    },
    {
      text: "Die Inschrift blieb zweitausend Jahre lang unlesbar \u2014 bis 1835 ein britischer Offizier namens Henry Rawlinson zu klettern begann. Er kopierte die alten Zeichen mit einer Hand, auf einer Leiter an der Felswand h\u00e4ngend. Einen kurdischen Jungen lie\u00df er an Seilen hinab, um die schwierigsten Stellen zu erreichen. Es dauerte zw\u00f6lf Jahre. Als er den Code knackte, erschloss er die Schrift des alten Mesopotamien \u2014 was der Stein von Rosetta f\u00fcr die Hieroglyphen getan hatte. Nach zweitausend Jahren Schweigen sprach Darius wieder.",
    },
    {
      text: "Heute steht er immer noch dort, in den Fels gemei\u00dfelt: ein Fu\u00df auf dem R\u00fccken seines Feindes, neun Rebellenk\u00f6nige gefesselt vor ihm. Persepolis erhebt sich noch aus den Ebenen des Iran, seine S\u00e4ulen greifen nach dem Himmel, den Darius seinem Gott zuschrieb. Und das Paradox bleibt ohne saubere Antwort: ein M\u00f6rder, der die Wahrheit predigte; ein Propagandist, der Gro\u00dfes schuf; ein Mann, der das gr\u00f6\u00dfte Reich der Welt auf seiner k\u00fchnsten L\u00fcge errichtete \u2014 und dann sein Leben damit verbrachte, sie wahr zu machen.",
    },
  ],
};

// ─── Push all three ──────────────────────────────────────────────────────────

const versions = [
  { label: "SPANISH (es)", data: es },
  { label: "FRENCH (fr)", data: fr },
  { label: "GERMAN (de)", data: de },
];

for (const { label, data } of versions) {
  console.log(`\n${"═".repeat(60)}`);
  console.log(`Pushing ${label}...`);
  console.log(`  siteId:      ${data.siteId}`);
  console.log(`  langStoryId: ${data.langStoryId}`);
  console.log(`  title:       ${data.title}`);
  console.log(`  paragraphs:  ${data.paragraphs.length}`);

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ⚠️  Record already exists. Overwriting...`);
      await doc.send(new PutCommand({ TableName: TABLE, Item: data }));
      console.log(`  ✅ ${label} overwritten successfully.`);
    } else {
      console.error(`  ❌ FAILED: ${err.message}`);
      process.exit(1);
    }
  }
}

console.log(`\n${"═".repeat(60)}`);
console.log("All three language versions pushed successfully.");
console.log(`Timestamp: ${now}`);
