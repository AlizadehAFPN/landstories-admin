/**
 * Push "Where Death Is Liberation" (Manikarnika Ghat, Varanasi) recreated in es, fr, de
 * to the Story DynamoDB table.
 *
 * Spanish proverb subverted: "Donde hubo fuego, cenizas quedan"
 *   → But at Manikarnika, where the fire never goes out, what remains isn't ashes — it's freedom.
 *
 * French proverb subverted: "Jamais deux sans trois"
 *   → But here the cycle of rebirths doesn't need a third time. One flame is enough.
 *
 * German proverb subverted: "Ende gut, alles gut"
 *   → In Varanasi they took it literally — the end isn't just good. It's everything.
 *
 * Run: node scripts/push-manikarnika-death-liberation-es-fr-de.mjs
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared (unchanged) fields from the English record ───────────────
const shared = {
  siteId: "varanasi",
  storyId: "manikarnika-death-liberation",
  coordinates: { lat: 25.3109, lng: 83.0107 },
  disabled: false,
  hasAudio: false,
  icon: "🔥",
  image: "",
  isFree: true,
  readingTimeMinutes: 4,
  source:
    "Parry, Jonathan P. Death in Banaras, Cambridge University Press, 1994; Eck, Diana L. Banaras: City of Light, Princeton University Press, 1982; Justice, Christopher. Dying the Good Death: The Pilgrimage to Die in India\u2019s Holy City, SUNY Press, 1997; Skanda Purana, Kashi Khanda (12th-14th century CE); Markandeya Purana (Harishchandra legend); Bhutiani, Shubhashish. Hotel Salvation (Mukti Bhawan), 2016 film, Venice Film Festival",
  storyCategory: "prophets_pilgrims",
  thumbnail: "",
  tier: "S",
  updatedAt: NOW,
};

// ═════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb subverted: "Donde hubo fuego, cenizas quedan"
// ═════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#manikarnika-death-liberation",

  title: "Donde la muerte es libertad",

  subtitle:
    "En la hoguera eterna del Ganges, un intocable guarda la llama que libera cada alma \u2014 y morir es el acto m\u00e1s sagrado de la ciudad m\u00e1s sagrada del mundo",

  excerpt:
    "Las hogueras de Manikarnika nunca se han apagado. Ni una sola vez. A cualquier hora, los cuerpos arden sobre las escalinatas de piedra junto al Ganges, en Benar\u00e9s \u2014 la ciudad m\u00e1s sagrada del hinduismo. Aqu\u00ed, la muerte es la puerta a la libertad total.",

  era: "Or\u00edgenes mitol\u00f3gicos hasta la actualidad (las hogueras arden sin interrupci\u00f3n desde hace siglos)",

  characters: [
    "Shiva (el dios hind\u00fa que susurra la liberaci\u00f3n a los moribundos)",
    "El Dom Raja (guardi\u00e1n de la llama eterna, de la casta m\u00e1s baja de la India)",
    "Kabir (el poeta del siglo XV que abandon\u00f3 Benar\u00e9s para morir)",
  ],

  moralOrLesson:
    "Benar\u00e9s construy\u00f3 su lugar m\u00e1s sagrado no alrededor de un templo, sino alrededor de una hoguera funeraria \u2014 y descubri\u00f3 algo que el resto del mundo pasa la vida entera intentando evitar: la \u00fanica forma de ser verdaderamente libre es dejar de tenerle miedo al fuego.",

  paragraphs: [
    {
      text: "Las hogueras de Manikarnika nunca se han apagado. Ni una sola vez. A cualquier hora del d\u00eda, los cuerpos arden sobre las escalinatas de piedra junto al Ganges, en Benar\u00e9s \u2014 la ciudad m\u00e1s sagrada del hinduismo. Doce piras a la vez, cientos de cuerpos cada d\u00eda. El humo sube, las cenizas caen al r\u00edo. Pero lo que hace \u00fanico este lugar es una creencia radical: morir aqu\u00ed no solo acaba con tu vida. Acaba con el ciclo entero de muertes y renacimientos. Aqu\u00ed, la muerte es la puerta a la libertad total.",
    },
    {
      text: "Los textos sagrados explican por qu\u00e9. Dicen que Shiva \u2014 el dios de la destrucci\u00f3n y la transformaci\u00f3n en el hinduismo \u2014 est\u00e1 de pie junto a cada cuerpo que arde aqu\u00ed. Cuando las llamas suben, le susurra al moribundo una palabra secreta: un mantra que abre las puertas de la liberaci\u00f3n. No importa qui\u00e9n fuiste. Rico o pobre, santo o pecador, de la casta m\u00e1s alta o la m\u00e1s baja \u2014 el fuego se lleva el cuerpo, el r\u00edo se lleva las cenizas y el susurro de Shiva lleva el alma al otro lado. Nadie queda fuera.",
    },
    {
      text: "Pero aqu\u00ed viene el giro. La persona m\u00e1s poderosa en este lugar sagrado no es un sacerdote ni un rey. Es el Dom Raja, l\u00edder de los Dom, considerados \u00abintocables\u00bb durante miles de a\u00f1os \u2014 lo m\u00e1s bajo de la sociedad india. \u00c9l controla la llama eterna. Cada pira debe encenderse con su fuego. Sin excepciones. Cada familia le paga por la chispa que libera a su ser querido. El hombre m\u00e1s despreciado del sistema de castas tiene en sus manos lo \u00fanico que toda alma necesita para alcanzar a Dios.",
    },
    {
      text: "El ritual no ha cambiado en siglos. El cuerpo llega por callejones estrechos mientras la familia canta \u00abRam Naam Satya Hai\u00bb \u2014 \u00abSolo el nombre de Dios es verdad.\u00bb Lo sumergen en el Ganges por \u00faltima vez. Apilan la le\u00f1a, colocan el cuerpo. El hijo mayor enciende la pira con la llama del Dom, dando cinco vueltas \u2014 una por cada elemento: tierra, agua, fuego, aire, espacio. Luego quiebra el cr\u00e1neo con una vara de bamb\u00fa para liberar el alma. Ese crujido seco sobre el agua \u2014 ese es el sonido de la libertad.",
    },
    {
      text: "No todos pasan por el fuego. Algunos son demasiado puros. Los ni\u00f1os menores de cinco a\u00f1os van directo al r\u00edo \u2014 su inocencia basta. Tambi\u00e9n los santos que ya murieron simb\u00f3licamente al renunciar al mundo. Y las embarazadas, porque el beb\u00e9 no carga pecado que quemar. Se dice que donde hubo fuego, cenizas quedan. Pero en Manikarnika, donde el fuego no se apaga nunca, lo que queda no son cenizas \u2014 es libertad. Hasta las reglas del fuego tienen excepciones, y cada una revela qu\u00e9 significa pureza de verdad.",
    },
    {
      text: "Cerca de las piras est\u00e1 Mukti Bhawan \u2014 la Casa de la Liberaci\u00f3n \u2014 un hospedaje donde la gente viene a morir. Te dan una habitaci\u00f3n, un catre y textos sagrados. Tienes quince d\u00edas. Si la muerte no llega, te vas y vuelves a hacer fila. Hay lista de espera. El encargado ha acompa\u00f1ado a m\u00e1s de doce mil personas en su \u00faltimo momento. El patr\u00f3n siempre se repite: los que sueltan sus rencores mueren en paz. Los que se aferran, sufren. Una buena muerte no es la que evitas \u2014 es la que miras de frente.",
    },
    {
      text: "Pero lo m\u00e1s radical lo hizo alguien que se neg\u00f3 a morir all\u00ed. Kabir, poeta del siglo XV que cuestionaba toda regla religiosa, abandon\u00f3 Benar\u00e9s en su lecho de muerte. Se fue a Magahar, donde la tradici\u00f3n dec\u00eda que morir significaba renacer como burro. Quer\u00eda demostrar que Dios no pertenece a ninguna ciudad, que la libertad real vive en el coraz\u00f3n. Cuando levantaron su mortaja, solo encontraron flores. La muerte, enfrentada sin miedo, no es un final. Es donde empieza la verdadera historia.",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb subverted: "Jamais deux sans trois"
// ═════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#manikarnika-death-liberation",

  title: "L\u00e0 o\u00f9 la mort lib\u00e8re",

  subtitle:
    "Au b\u00fbcher \u00e9ternel du Gange, un intouchable garde la flamme qui lib\u00e8re chaque \u00e2me \u2014 et mourir est l\u2019acte le plus sacr\u00e9 de la ville la plus sacr\u00e9e du monde",

  excerpt:
    "Les b\u00fbchers de Manikarnika ne se sont jamais \u00e9teints. Pas une seule fois. \u00c0 toute heure, des corps br\u00fblent sur les marches de pierre au bord du Gange, \u00e0 Varanasi \u2014 la ville la plus sacr\u00e9e de l\u2019hindouisme. Ici, la mort est la porte vers la libert\u00e9 absolue.",

  era: "Des origines mythologiques \u00e0 nos jours (les b\u00fbchers br\u00fblent sans interruption depuis des si\u00e8cles)",

  characters: [
    "Shiva (le dieu hindou qui murmure la lib\u00e9ration aux mourants)",
    "Le Dom Raja (gardien de la flamme \u00e9ternelle, issu de la caste la plus basse d\u2019Inde)",
    "Kabir (le po\u00e8te du XVe si\u00e8cle qui a quitt\u00e9 Varanasi pour mourir)",
  ],

  moralOrLesson:
    "Varanasi a b\u00e2ti son lieu le plus sacr\u00e9 non pas autour d\u2019un temple, mais autour d\u2019un b\u00fbcher fun\u00e9raire \u2014 et a d\u00e9couvert ce que le reste du monde passe sa vie \u00e0 fuir : la seule fa\u00e7on d\u2019\u00eatre vraiment libre, c\u2019est de ne plus avoir peur du feu.",

  paragraphs: [
    {
      text: "Les b\u00fbchers de Manikarnika ne se sont jamais \u00e9teints. Pas une seule fois. \u00c0 toute heure, des corps br\u00fblent sur les marches de pierre au bord du Gange, \u00e0 Varanasi \u2014 la ville la plus sacr\u00e9e de l\u2019hindouisme. Douze b\u00fbchers en m\u00eame temps, des centaines de corps chaque jour. La fum\u00e9e monte, les cendres tombent dans le fleuve. Ce qui rend cet endroit unique au monde : les hindous croient que mourir ici ne termine pas seulement une vie. \u00c7a brise le cycle entier des morts et des renaissances. Ici, la mort est la porte vers la libert\u00e9 absolue.",
    },
    {
      text: "Les textes sacr\u00e9s expliquent pourquoi. Shiva \u2014 le dieu de la destruction et de la transformation dans l\u2019hindouisme \u2014 se tient au c\u00f4t\u00e9 de chaque corps qui br\u00fble ici. Quand les flammes montent, il murmure un mot secret \u00e0 l\u2019oreille du mourant : un mantra qui ouvre les portes de la lib\u00e9ration. Peu importe qui tu \u00e9tais. Riche ou pauvre, saint ou p\u00e9cheur, caste la plus haute ou la plus basse \u2014 le feu prend le corps, le fleuve prend les cendres, et le murmure de Shiva emporte l\u2019\u00e2me. Personne n\u2019est refus\u00e9.",
    },
    {
      text: "Mais voici le retournement. La personne la plus puissante \u00e0 Manikarnika n\u2019est ni un pr\u00eatre ni un roi. C\u2019est le Dom Raja \u2014 chef des Dom, \u00e9tiquet\u00e9s \u00ab\u202fintouchables\u202f\u00bb depuis des mill\u00e9naires, tout en bas de l\u2019\u00e9chelle sociale indienne. Il contr\u00f4le la flamme \u00e9ternelle. Chaque b\u00fbcher doit \u00eatre allum\u00e9 avec son feu. Sans exception. Chaque famille en deuil le paie pour l\u2019\u00e9tincelle qui lib\u00e8re son proche. L\u2019homme le plus m\u00e9pris\u00e9 du syst\u00e8me d\u00e9tient la seule chose dont chaque \u00e2me a besoin pour atteindre Dieu.",
    },
    {
      text: "Le rituel n\u2019a pas chang\u00e9 depuis des si\u00e8cles. Le corps arrive par les ruelles \u00e9troites \u2014 les proches scandent \u00ab\u202fRam Naam Satya Hai\u202f\u00bb : \u00ab\u202fSeul le nom de Dieu est v\u00e9rit\u00e9.\u202f\u00bb On le plonge une derni\u00e8re fois dans le Gange. Bois empil\u00e9, corps par-dessus. Le fils a\u00een\u00e9 allume le b\u00fbcher avec la flamme du Dom, cinq tours \u2014 un pour chaque \u00e9l\u00e9ment : terre, eau, feu, air, espace. Puis il brise le cr\u00e2ne avec un b\u00e2ton de bambou pour lib\u00e9rer l\u2019\u00e2me. Ce craquement sec au-dessus de l\u2019eau \u2014 c\u2019est le bruit d\u2019une \u00e2me qu\u2019on lib\u00e8re.",
    },
    {
      text: "Tout le monde ne passe pas par le feu. Certains sont trop purs. Les enfants de moins de cinq ans vont directement dans le Gange \u2014 leur innocence suffit. Les saints qui ont renonc\u00e9 au monde aussi. Et les femmes enceintes, parce que l\u2019enfant \u00e0 na\u00eetre ne porte aucun p\u00e9ch\u00e9 \u00e0 br\u00fbler. On dit \u00ab\u202fjamais deux sans trois\u202f\u00bb. Mais ici, le cycle des renaissances n\u2019a pas besoin d\u2019une troisi\u00e8me fois. Une seule flamme suffit. Chaque exception aux r\u00e8gles du feu r\u00e9v\u00e8le ce que cette culture entend vraiment par puret\u00e9.",
    },
    {
      text: "Pr\u00e8s des b\u00fbchers se trouve Mukti Bhawan \u2014 la Maison de la Lib\u00e9ration \u2014 une pension o\u00f9 l\u2019on vient mourir. On vous donne une chambre, un lit, des textes sacr\u00e9s. Quinze jours. Si la mort ne vient pas, vous partez et vous refaites la queue. Il y a une liste d\u2019attente. Le g\u00e9rant a accompagn\u00e9 plus de douze mille personnes. Le sch\u00e9ma ne change jamais : ceux qui l\u00e2chent leurs ranc\u0153urs meurent en paix. Ceux qui s\u2019accrochent souffrent. Une bonne mort, ce n\u2019est pas celle qu\u2019on \u00e9vite \u2014 c\u2019est celle qu\u2019on regarde en face.",
    },
    {
      text: "Mais le geste le plus radical vient d\u2019un homme qui a refus\u00e9 de mourir ici. Kabir, po\u00e8te du XVe si\u00e8cle qui remettait en question chaque r\u00e8gle, a quitt\u00e9 Varanasi sur son lit de mort. Direction Magahar \u2014 un village o\u00f9 la tradition disait que mourir signifiait rena\u00eetre en \u00e2ne. Il voulait prouver que Dieu n\u2019appartient \u00e0 aucune ville, que la vraie libert\u00e9 vit dans le c\u0153ur. Quand on a soulev\u00e9 son linceul, on n\u2019a trouv\u00e9 que des fleurs. La mort, affront\u00e9e sans peur, n\u2019est pas une fin. C\u2019est l\u00e0 que commence la vraie histoire.",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb subverted: "Ende gut, alles gut"
// ═════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#manikarnika-death-liberation",

  title: "Wo der Tod befreit",

  subtitle:
    "Am Verbrennungsplatz, wo die Feuer nie erloschen sind, h\u00fctet ein Unber\u00fchrbarer die Flamme, die jede Seele befreit \u2014 und der Tod ist die heiligste Handlung der heiligsten Stadt der Welt",

  excerpt:
    "Die Feuer von Manikarnika sind nie erloschen. Kein einziges Mal. Zu jeder Stunde brennen Scheiterhaufen auf den Steinstufen am Ganges in Varanasi \u2014 der heiligsten Stadt des Hinduismus. Hier ist der Tod das Tor zur absoluten Freiheit.",

  era: "Von mythologischen Urspr\u00fcngen bis heute (die Feuer brennen seit Jahrhunderten ununterbrochen)",

  characters: [
    "Shiva (der Hindu-Gott, der den Sterbenden die Befreiung zufl\u00fcstert)",
    "Der Dom Raja (H\u00fcter der ewigen Flamme, aus Indiens niedrigster Kaste)",
    "Kabir (der Dichter des 15. Jahrhunderts, der Varanasi zum Sterben verlie\u00df)",
  ],

  moralOrLesson:
    "Varanasi hat seinen heiligsten Ort nicht um einen Tempel gebaut, sondern um einen Scheiterhaufen \u2014 und dabei etwas entdeckt, vor dem der Rest der Welt ein Leben lang davonl\u00e4uft: Der einzige Weg, wirklich frei zu sein, ist aufzuh\u00f6ren, sich vor dem Feuer zu f\u00fcrchten.",

  paragraphs: [
    {
      text: "Die Feuer von Manikarnika sind nie erloschen. Kein einziges Mal. Zu jeder Stunde brennen Scheiterhaufen auf den Steinstufen am Ganges in Varanasi \u2014 der heiligsten Stadt des Hinduismus. Zw\u00f6lf Leichen gleichzeitig, Hunderte am Tag. Der Rauch steigt, die Asche treibt in den Fluss. Was diesen Ort einzigartig macht: Hindus glauben, dass der Tod hier nicht nur ein Leben beendet. Er bricht den gesamten Kreislauf aus Tod und Wiedergeburt. Hier ist der Tod das Tor zur absoluten Freiheit.",
    },
    {
      text: "Die heiligen Texte erkl\u00e4ren, warum. Shiva \u2014 der Gott der Zerst\u00f6rung und Verwandlung im Hinduismus \u2014 steht neben jedem K\u00f6rper, der hier brennt. Wenn die Flammen aufsteigen, fl\u00fcstert er dem Sterbenden ein geheimes Wort ins Ohr: ein Mantra, das die Tore zur Befreiung \u00f6ffnet. Es spielt keine Rolle, wer du warst. Reich oder arm, heilig oder s\u00fcndig, h\u00f6chste Kaste oder niedrigste \u2014 das Feuer nimmt den K\u00f6rper, der Fluss nimmt die Asche, und Shivas Fl\u00fcstern tr\u00e4gt die Seele hin\u00fcber. Niemand wird abgewiesen.",
    },
    {
      text: "Aber hier kommt die Wendung. Die m\u00e4chtigste Person an diesem heiligen Ort ist kein Priester und kein K\u00f6nig. Es ist der Dom Raja \u2014 Oberhaupt der Dom-Kaste, seit Jahrtausenden als \u201eunber\u00fchrbar\u201c gebrandmarkt, ganz unten in Indiens Gesellschaft. Er kontrolliert die ewige Flamme. Jeder Scheiterhaufen muss mit seinem Feuer entz\u00fcndet werden. Jede trauernde Familie zahlt ihm f\u00fcr den Funken, der ihre Liebsten befreit. Der verachtetste Mann im Kastensystem h\u00e4lt das Einzige in H\u00e4nden, was jede Seele braucht, um Gott zu erreichen.",
    },
    {
      text: "Das Ritual ist seit Jahrhunderten dasselbe. Der Leichnam kommt durch enge Gassen \u2014 die Angeh\u00f6rigen rufen \u201eRam Naam Satya Hai\u201c: \u201eNur Gottes Name ist Wahrheit.\u201c Ein letztes Eintauchen in den Ganges. Holz gestapelt, K\u00f6rper darauf. Der \u00e4lteste Sohn entz\u00fcndet den Scheiterhaufen mit der Flamme des Dom, f\u00fcnf Umrundungen \u2014 eine f\u00fcr jedes Element: Erde, Wasser, Feuer, Luft, Raum. Dann zerschl\u00e4gt er den Sch\u00e4del mit einem Bambusstock, um die Seele freizusetzen. Dieses Knacken \u00fcber dem Wasser \u2014 das ist der Klang der Befreiung.",
    },
    {
      text: "Nicht jeder geht durch das Feuer. Manche sind zu rein daf\u00fcr. Kinder unter f\u00fcnf Jahren kommen direkt in den Ganges \u2014 ihre Unschuld reicht. Ebenso Heilige, die der Welt bereits entsagt haben. Und schwangere Frauen, weil das ungeborene Kind keine S\u00fcnde tr\u00e4gt, die verbrannt werden m\u00fcsste. Man sagt: Ende gut, alles gut. In Varanasi haben sie das w\u00f6rtlich genommen \u2014 das Ende ist nicht nur gut. Es ist alles. Jede Ausnahme von den Regeln des Feuers zeigt, was diese Kultur wirklich unter Reinheit versteht.",
    },
    {
      text: "Nahe den Scheiterhaufen steht Mukti Bhawan \u2014 das Haus der Befreiung. Eine Herberge, in die Menschen kommen, um zu sterben. Ein Zimmer, ein Bett, heilige Schriften. F\u00fcnfzehn Tage. Kommt der Tod nicht, geht man und stellt sich wieder an. Es gibt eine Warteliste. Der Verwalter hat \u00fcber zw\u00f6lftausend Menschen begleitet. Das Muster ist immer gleich: Wer lossl\u00e4sst, stirbt in Frieden. Wer sich klammert, leidet. Ein guter Tod ist nicht der, den man vermeidet \u2014 sondern der, dem man ins Auge blickt.",
    },
    {
      text: "Das Radikalste aber tat ein Mann, der sich weigerte, hier zu sterben. Kabir, ein Dichter des 15. Jahrhunderts, der jede religi\u00f6se Regel hinterfragte, verlie\u00df Varanasi auf seinem Sterbebett. Er ging nach Magahar \u2014 ein Dorf, wo man glaubte, wer dort stirbt, wird als Esel wiedergeboren. Er wollte beweisen, dass Gott keiner Stadt geh\u00f6rt, dass wahre Freiheit im Herzen lebt. Als man sein Leichentuch hob, fand man nur Blumen. Der Tod, ohne Angst angenommen, ist kein Ende. Er ist der Anfang der eigentlichen Geschichte.",
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────
async function push(item, label) {
  console.log(`\n\u23f3 Pushing ${label}...`);

  // Validate JSON structure before pushing
  const json = JSON.stringify(item);
  JSON.parse(json); // will throw if malformed
  console.log(`   \u2713 JSON valid (${json.length} bytes)`);

  await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log(
    `   \u2705 ${label} pushed successfully (langStoryId: ${item.langStoryId})`
  );
}

(async () => {
  try {
    await push(es, "Spanish (es)");
    await push(fr, "French (fr)");
    await push(de, "German (de)");
    console.log("\n\ud83c\udf89 All done \u2014 all three records pushed to DynamoDB.");
  } catch (err) {
    console.error("\n\u274c Error:", err);
    process.exit(1);
  }
})();
