import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "auschwitz-birkenau",
  storyId: "last-letters",
  storyCategory: "lost_found",
  icon: "\u{1F4DD}",
  tier: "A",
  era: "World War II (1940-1945)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  coordinates: { lat: 50.0343, lng: 19.1783 },
  source: "Auschwitz-Birkenau Memorial archives; Yad Vashem; United States Holocaust Memorial Museum; Polish Underground State archives",
  characters: [
    "Anonymous prisoners",
    "Zalmen Gradowski",
    "Lejb Langfus",
    "Zalmen Lewental",
    "Polish resistance couriers",
  ],
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
// SPANISH
// ═══════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#last-letters",
  title: "Las \u00faltimas cartas",
  subtitle:
    "Mensajes escritos desde el abismo por quienes sab\u00edan que no volver\u00edan",
  excerpt:
    "Auschwitz no fue solo una f\u00e1brica de muerte. Fue una m\u00e1quina de borrar. A cada prisionero le quitaban el nombre y le asignaban un n\u00famero. Los cuerpos se quemaban, las cenizas se esparc\u00edan. Sin tumbas, sin l\u00e1pidas, sin rastro. La Soluci\u00f3n Final \u2014el plan nazi para exterminar a los jud\u00edos de Europa\u2014 no buscaba solo el genocidio. Quer\u00eda algo peor: que el mundo olvidara que esas personas hab\u00edan existido.",
  moralOrLesson:
    "Dicen que las palabras se las lleva el viento. Pero un nombre garabateado en un muro, una carta enterrada entre cenizas o un testimonio escondido en un frasco de vidrio pueden sobrevivir a la maquinaria de exterminio m\u00e1s poderosa jam\u00e1s construida. Escribir es el \u00faltimo acto de resistencia contra el olvido.",
  paragraphs: [
    {
      text: "Auschwitz no fue solo una f\u00e1brica de muerte. Fue una m\u00e1quina de borrar. A cada prisionero le quitaban el nombre y le asignaban un n\u00famero. Los cuerpos se quemaban, las cenizas se esparc\u00edan. Sin tumbas, sin l\u00e1pidas, sin rastro. La Soluci\u00f3n Final \u2014el plan nazi para exterminar a los jud\u00edos de Europa\u2014 no buscaba solo el genocidio. Quer\u00eda algo peor: que el mundo olvidara que esas personas hab\u00edan existido.",
    },
    {
      text: "Pero los prisioneros encontraron un arma donde no la hab\u00eda: la palabra escrita. Entre 1940 y 1945, cientos de cartas y notas fueron sacadas del campo a trav\u00e9s de una red clandestina: presos, trabajadores civiles, familias polacas de la zona, combatientes de la resistencia. Los mensajes se escond\u00edan en recipientes de comida, se cos\u00edan en la ropa sucia, se pasaban por las alambradas. Cada nota sacada del campo era un acto castigado con la muerte.",
    },
    {
      text: "Las cartas que sobrevivieron est\u00e1n escritas en todos los idiomas de Europa: polaco, yidis, h\u00fangaro, franc\u00e9s, griego, neerland\u00e9s, checo. Algunas son garabatos escritos a toda prisa en pedazos de papel arrancado. Otras son despedidas cuidadosas, deliberadas, escritas por personas que sab\u00edan perfectamente lo que ven\u00eda y eligieron usar sus \u00faltimas horas para que alguien, en alg\u00fan lugar, supiera lo que hab\u00eda pasado all\u00ed.",
    },
    {
      text: "Una madre, en una carta sacada por la resistencia polaca, escribi\u00f3: \u00abQueridos hijos m\u00edos, voy a un lugar del que nadie vuelve. Sean buenos entre ustedes. Cuiden a pap\u00e1. Recuerden que su madre los quiso m\u00e1s que a su propia vida. Sean valientes, mis peque\u00f1os. No lloren por m\u00ed. Los cuidar\u00e9 desde el cielo.\u00bb Su nombre se perdi\u00f3. Un ferroviario polaco encontr\u00f3 la carta, arrojada desde un tren de deportaci\u00f3n, y la entreg\u00f3 a la resistencia.",
    },
    {
      text: "Un padre escribe a su hermano: \u00abNos llevan al este. Sabemos lo que el este significa. Le di mi reloj a un guardia que promete enviar esta carta, aunque s\u00e9 que seguramente no lo har\u00e1. Si por alg\u00fan milagro lees estas palabras, diles a mis hijos que su padre muri\u00f3 de pie.\u00bb Una chica de diecis\u00e9is a\u00f1os, escribiendo en el envoltorio de un pan: \u00abHoy es mi cumplea\u00f1os. No hay pastel, ni velas, ni canciones. Si alguien encuentra esto, que sepa que me llamaba Hannah. Que fui real. Que exist\u00ed.\u00bb",
    },
    {
      text: "Los testimonios m\u00e1s estremecedores vienen del Sonderkommando: prisioneros que los nazis forzaban a trabajar dentro de las c\u00e1maras de gas y los crematorios. Hombres como Zalmen Gradowski, Lejb Langfus y Zalmen Lewental escribieron lo que ve\u00edan en yidis y lo enterraron en frascos de vidrio junto a los hornos. Escondieron sus palabras entre las cenizas de los muertos, con la esperanza de que alguien las desenterrara alg\u00fan d\u00eda. Varios de esos frascos aparecieron despu\u00e9s de la guerra.",
    },
    {
      text: "Estas cartas no eran solo despedidas. Muchas conten\u00edan descripciones detalladas del proceso de exterminio \u2014las selecciones en el and\u00e9n, las c\u00e1maras de gas, los crematorios\u2014 d\u00e1ndole al mundo pruebas del genocidio cuando los gobiernos aliados todav\u00eda se negaban a creer los informes. La resistencia polaca envi\u00f3 esas pruebas a Londres. Gracias a ellas, negar el Holocausto se volvi\u00f3 imposible.",
    },
    {
      text: "Hoy, las cartas que sobrevivieron descansan detr\u00e1s de un cristal en el memorial de Auschwitz-Birkenau, en Yad Vashem en Jerusal\u00e9n y en el Museo del Holocausto en Washington. El papel est\u00e1 amarillento. La tinta se desvanece. Pero las voces siguen ah\u00ed, intactas. Dicen que las palabras se las lleva el viento. Estas no. Estas sobrevivieron a la peor maquinaria de muerte y cumplieron una misi\u00f3n que nadie pudo impedir: mantener humanos a los muertos.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// FRENCH
// ═══════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#last-letters",
  title: "Les derni\u00e8res lettres",
  subtitle:
    "Des mots arrach\u00e9s aux t\u00e9n\u00e8bres par ceux qui savaient qu\u2019ils ne reviendraient pas",
  excerpt:
    "Auschwitz n\u2019\u00e9tait pas qu\u2019une usine de mort. C\u2019\u00e9tait une machine \u00e0 effacer. Chaque prisonnier perdait son nom, remplac\u00e9 par un num\u00e9ro. Chaque corps \u00e9tait br\u00fbl\u00e9, chaque cendre dispers\u00e9e. Pas de tombes, pas de st\u00e8les, rien. La Solution finale \u2014\u00a0le projet nazi d\u2019extermination des Juifs d\u2019Europe\u00a0\u2014 ne visait pas seulement le g\u00e9nocide. Elle visait quelque chose de pire\u00a0: que le monde oublie que ces gens avaient exist\u00e9.",
  moralOrLesson:
    "Les paroles s\u2019envolent, les \u00e9crits restent \u2014\u00a0mais ici, les \u00e9crits ont fait bien plus que rester. Un nom griffonn\u00e9 sur un mur, une lettre enterr\u00e9e dans les cendres, un t\u00e9moignage cach\u00e9 dans un bocal\u00a0: autant d\u2019armes contre l\u2019effacement. \u00c9crire, c\u2019est le dernier acte de r\u00e9sistance face \u00e0 l\u2019oubli.",
  paragraphs: [
    {
      text: "Auschwitz n\u2019\u00e9tait pas qu\u2019une usine de mort. C\u2019\u00e9tait une machine \u00e0 effacer. Chaque prisonnier perdait son nom, remplac\u00e9 par un num\u00e9ro. Chaque corps \u00e9tait br\u00fbl\u00e9, chaque cendre dispers\u00e9e. Pas de tombes, pas de st\u00e8les, rien. La Solution finale \u2014\u00a0le projet nazi d\u2019extermination des Juifs d\u2019Europe\u00a0\u2014 ne visait pas seulement le g\u00e9nocide. Elle visait quelque chose de pire\u00a0: que le monde oublie que ces gens avaient exist\u00e9.",
    },
    {
      text: "Mais les prisonniers ont trouv\u00e9 une arme l\u00e0 o\u00f9 il n\u2019y en avait aucune\u00a0: les mots. De 1940 \u00e0 1945, des centaines de lettres et de messages ont \u00e9t\u00e9 sortis du camp gr\u00e2ce \u00e0 un r\u00e9seau clandestin \u2014\u00a0d\u00e9tenus, travailleurs civils, familles polonaises des environs, r\u00e9sistants. Les messages \u00e9taient cach\u00e9s dans des gamelles, cousus dans le linge, gliss\u00e9s \u00e0 travers les barbel\u00e9s. Chaque mot sorti du camp \u00e9tait un acte passible de mort. Chacun portait une voix que les nazis voulaient faire taire \u00e0 jamais.",
    },
    {
      text: "Les lettres qui ont surv\u00e9cu sont \u00e9crites dans toutes les langues d\u2019Europe\u00a0: polonais, yiddish, hongrois, fran\u00e7ais, grec, n\u00e9erlandais, tch\u00e8que. Certaines sont griffonn\u00e9es \u00e0 la h\u00e2te sur des bouts de papier d\u00e9chir\u00e9. D\u2019autres sont des adieux pos\u00e9s, r\u00e9fl\u00e9chis \u2014\u00a0\u00e9crits par des gens qui savaient exactement ce qui les attendait et qui ont choisi de passer leurs derni\u00e8res heures \u00e0 s\u2019assurer que quelqu\u2019un, quelque part, saurait ce qui s\u2019\u00e9tait pass\u00e9 ici.",
    },
    {
      text: "Une m\u00e8re, dans une lettre transmise par la R\u00e9sistance polonaise, a \u00e9crit\u00a0: \u00ab\u00a0Mes chers petits, je pars pour un endroit d\u2019o\u00f9 personne ne revient. Soyez bons les uns envers les autres. Prenez soin de papa. Souvenez-vous que votre maman vous a aim\u00e9s plus que tout au monde. Soyez courageux, mes tr\u00e9sors. Ne pleurez pas pour moi. Je veillerai sur vous depuis le ciel.\u00a0\u00bb Son nom s\u2019est perdu. Un cheminot polonais a trouv\u00e9 la lettre, jet\u00e9e d\u2019un train de d\u00e9portation, et l\u2019a remise \u00e0 la R\u00e9sistance.",
    },
    {
      text: "Un p\u00e8re \u00e9crit \u00e0 son fr\u00e8re\u00a0: \u00ab\u00a0On nous emm\u00e8ne vers l\u2019est. Nous savons ce que l\u2019est veut dire. J\u2019ai donn\u00e9 ma montre \u00e0 un garde qui promet d\u2019envoyer cette lettre, m\u00eame si je sais qu\u2019il ne le fera sans doute jamais. Si par miracle tu lis ces mots, dis \u00e0 mes enfants que leur p\u00e8re est mort debout.\u00a0\u00bb Une jeune fille de seize ans, sur l\u2019emballage d\u2019un morceau de pain\u00a0: \u00ab\u00a0Aujourd\u2019hui, c\u2019est mon anniversaire. Pas de g\u00e2teau, pas de bougies, pas de chanson. Si quelqu\u2019un trouve ceci, sachez que je m\u2019appelais Hannah. J\u2019\u00e9tais r\u00e9elle. J\u2019ai exist\u00e9.\u00a0\u00bb",
    },
    {
      text: "Les t\u00e9moignages les plus bouleversants viennent du Sonderkommando \u2014\u00a0des prisonniers que les nazis for\u00e7aient \u00e0 travailler dans les chambres \u00e0 gaz et les cr\u00e9matoires. Des hommes comme Zalmen Gradowski, Lejb Langfus et Zalmen Lewental ont \u00e9crit ce qu\u2019ils voyaient en yiddish et l\u2019ont enterr\u00e9 dans des bocaux en verre au pied des fours. Ils ont cach\u00e9 leurs mots dans les cendres des morts, en esp\u00e9rant que quelqu\u2019un les d\u00e9terrerait un jour. Plusieurs de ces bocaux ont \u00e9t\u00e9 retrouv\u00e9s apr\u00e8s la guerre.",
    },
    {
      text: "Ces lettres n\u2019\u00e9taient pas que des adieux. Beaucoup contenaient des descriptions pr\u00e9cises du processus d\u2019extermination \u2014\u00a0les s\u00e9lections sur le quai, les chambres \u00e0 gaz, les cr\u00e9matoires\u00a0\u2014 offrant au monde des preuves du g\u00e9nocide \u00e0 une \u00e9poque o\u00f9 les gouvernements alli\u00e9s refusaient encore de croire les rapports. La R\u00e9sistance polonaise a fait parvenir ces preuves \u00e0 Londres. C\u2019est gr\u00e2ce \u00e0 elles que nier l\u2019Holocauste est devenu impossible.",
    },
    {
      text: "Aujourd\u2019hui, les lettres rescap\u00e9es reposent derri\u00e8re une vitre au m\u00e9morial d\u2019Auschwitz-Birkenau, \u00e0 Yad Vashem \u00e0 J\u00e9rusalem et au mus\u00e9e de l\u2019Holocauste \u00e0 Washington. Le papier a jauni. L\u2019encre s\u2019efface. Mais les voix sont toujours l\u00e0, intactes. On dit que les paroles s\u2019envolent et que les \u00e9crits restent. Ici, les \u00e9crits ont fait plus que rester\u00a0: dans un lieu b\u00e2ti pour effacer toute trace de ses victimes, des bouts de papier ont accompli ce que la machine de mort n\u2019a pas pu emp\u00eacher. Ils ont gard\u00e9 les morts humains.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// GERMAN
// ═══════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#last-letters",
  title: "Die letzten Briefe",
  subtitle:
    "Botschaften aus der Finsternis \u2014 geschrieben von denen, die wussten, dass sie nicht zur\u00fcckkehren w\u00fcrden",
  excerpt:
    "Auschwitz war nicht nur eine Todesfabrik. Es war eine Maschine der Ausl\u00f6schung. Jedem H\u00e4ftling wurde der Name genommen und durch eine Nummer ersetzt. Jeder K\u00f6rper verbrannt, jede Asche verstreut. Keine Gr\u00e4ber, keine Grabsteine, keine Spur. Die Endl\u00f6sung \u2014\u00a0der Plan der Nazis, die Juden Europas auszurotten\u00a0\u2014 zielte nicht nur auf V\u00f6lkermord. Sie zielte auf etwas Schlimmeres: dass die Welt vergisst, dass diese Menschen je existiert haben.",
  moralOrLesson:
    "Man sagt, Papier sei geduldig. Dieses Papier war geduldig genug, ein ganzes Regime zu \u00fcberdauern. Ein Name an einer Wand, ein Brief in der Asche, ein Zeugnis in einem Glasgef\u00e4\u00df \u2014 sie alle haben \u00fcberlebt, was die m\u00e4chtigste Vernichtungsmaschinerie der Geschichte nicht verhindern konnte. Schreiben ist der letzte Widerstand gegen das Vergessen.",
  paragraphs: [
    {
      text: "Auschwitz war nicht nur eine Todesfabrik. Es war eine Maschine der Ausl\u00f6schung. Jedem H\u00e4ftling wurde der Name genommen und durch eine Nummer ersetzt. Jeder K\u00f6rper verbrannt, jede Asche verstreut. Keine Gr\u00e4ber, keine Grabsteine, keine Spur. Die Endl\u00f6sung \u2014\u00a0der Plan der Nazis, die Juden Europas auszurotten\u00a0\u2014 zielte nicht nur auf V\u00f6lkermord. Sie zielte auf etwas Schlimmeres: dass die Welt vergisst, dass diese Menschen je existiert haben.",
    },
    {
      text: "Doch die H\u00e4ftlinge fanden eine Waffe, wo es keine gab: das geschriebene Wort. Zwischen 1940 und 1945 wurden Hunderte Briefe und Nachrichten aus dem Lager geschmuggelt \u2014\u00a0\u00fcber ein geheimes Netzwerk aus Gefangenen, Zivilarbeitern, polnischen Familien aus der Umgebung und Widerstandsk\u00e4mpfern. Botschaften versteckt in Essgeschirr, eingen\u00e4ht in W\u00e4sche, durch Stacheldraht geschoben. Jede geschmuggelte Nachricht stand unter Todesstrafe. Jede trug eine Stimme, die die Nazis f\u00fcr immer zum Schweigen bringen wollten.",
    },
    {
      text: "Die Briefe, die \u00fcberlebt haben, sind in allen Sprachen Europas geschrieben: Polnisch, Jiddisch, Ungarisch, Franz\u00f6sisch, Griechisch, Niederl\u00e4ndisch, Tschechisch. Manche sind hastig auf Papierfetzen gekritzelt. Andere sind ruhige, bewusste Abschiede \u2014\u00a0geschrieben von Menschen, die genau wussten, was kam, und ihre letzten Stunden daf\u00fcr nutzten, sicherzustellen, dass jemand, irgendwo, erfahren w\u00fcrde, was hier geschehen war.",
    },
    {
      text: "Eine Mutter schrieb in einem Brief, der \u00fcber den polnischen Widerstand geschmuggelt wurde: \u201eMeine lieben Kleinen, ich gehe an einen Ort, von dem niemand zur\u00fcckkehrt. Seid gut zueinander. Passt auf Papa auf. Vergesst nie, dass eure Mama euch mehr geliebt hat als ihr eigenes Leben. Seid tapfer, meine Sch\u00e4tze. Weint nicht um mich. Ich werde vom Himmel auf euch aufpassen.\u201c Ihr Name ist verloren. Ein polnischer Eisenbahner fand den Brief, aus einem Deportationszug geworfen, und gab ihn dem Widerstand.",
    },
    {
      text: "Ein Vater schreibt an seinen Bruder: \u201eSie bringen uns nach Osten. Wir wissen, was Osten bedeutet. Ich habe einem W\u00e4chter meine Uhr gegeben, der verspricht, diesen Brief abzuschicken \u2014\u00a0obwohl ich wei\u00df, dass er es wahrscheinlich nicht tun wird. Wenn du diese Worte durch ein Wunder liest, sag meinen Kindern, dass ihr Vater aufrecht gestorben ist.\u201c Ein sechzehnj\u00e4hriges M\u00e4dchen, auf der R\u00fcckseite einer Brotverpackung: \u201eHeute ist mein Geburtstag. Kein Kuchen, keine Kerzen, kein Lied. Wenn jemand das hier findet: Mein Name war Hannah. Ich war echt. Es hat mich gegeben.\u201c",
    },
    {
      text: "Die ersch\u00fctterndsten Zeugnisse stammen vom Sonderkommando \u2014\u00a0H\u00e4ftlinge, die die Nazis zwangen, in den Gaskammern und Krematorien zu arbeiten. M\u00e4nner wie Zalmen Gradowski, Lejb Langfus und Zalmen Lewental schrieben auf Jiddisch nieder, was sie sahen, und vergruben ihre Texte in Glasgef\u00e4\u00dfen neben den \u00d6fen. Sie versteckten ihre Worte in der Asche der Toten und hofften, dass jemand sie eines Tages ausgraben w\u00fcrde. Mehrere dieser Gef\u00e4\u00dfe wurden nach dem Krieg gefunden.",
    },
    {
      text: "Diese Briefe waren nicht nur Abschiede. Viele enthielten detaillierte Augenzeugenberichte \u00fcber den Vernichtungsprozess \u2014\u00a0die Selektionen an der Rampe, die Gaskammern, die Krematorien\u00a0\u2014 und lieferten der Welt Beweise f\u00fcr den V\u00f6lkermord, als die Regierungen der Alliierten die Berichte noch nicht glauben wollten. Der polnische Widerstand schickte diese Beweise nach London. Sie machten es unm\u00f6glich, den Holocaust zu leugnen.",
    },
    {
      text: "Heute liegen die \u00fcberlebenden Briefe hinter Glas in der Gedenkst\u00e4tte Auschwitz-Birkenau, in Yad Vashem in Jerusalem und im Holocaust-Museum in Washington. Das Papier ist vergilbt. Die Tinte verblasst. Aber die Stimmen sind noch da \u2014\u00a0ungebrochen. Man sagt, Papier sei geduldig. Dieses Papier war geduldig genug, ein ganzes Regime zu \u00fcberdauern. An einem Ort, der gebaut wurde, um jede Spur seiner Opfer zu tilgen, haben Zettel und Fetzen geschafft, was die gesamte Todesmaschinerie nicht verhindern konnte: Sie haben die Toten menschlich gehalten.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════
async function pushStory(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\nPushing ${label} ...`);

  // Validate JSON structure
  if (!item.siteId || !item.langStoryId || !item.lang || !item.paragraphs) {
    throw new Error(`Missing required fields in ${label}`);
  }
  if (!Array.isArray(item.paragraphs) || item.paragraphs.length < 6) {
    throw new Error(`Paragraphs invalid for ${label}: got ${item.paragraphs?.length}`);
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    if (!item.paragraphs[i].text || typeof item.paragraphs[i].text !== "string") {
      throw new Error(`Paragraph ${i} missing text in ${label}`);
    }
  }

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log(`  ✓ ${label} pushed successfully (${item.paragraphs.length} paragraphs)`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      // Record already exists — overwrite
      console.log(`  ⚠ ${label} already exists, overwriting...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`  ✓ ${label} overwritten successfully`);
    } else {
      throw err;
    }
  }
}

async function main() {
  console.log("═══ Pushing Last Letters: ES, FR, DE ═══");
  console.log(`Timestamp: ${now}`);

  for (const item of [es, fr, de]) {
    await pushStory(item);
  }

  console.log("\n═══ All three versions pushed successfully ═══");
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
