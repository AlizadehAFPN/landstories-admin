// Push Spanish, French, and German recreations of
// "The Fall of Croesus — When Prophecy Deceives"
// to the Story DynamoDB table.
//
// Proverbs subverted:
//   ES — "No hay peor sordo que el que no quiere oír"
//   FR — "L'homme propose, Dieu dispose"
//   DE — "Hochmut kommt vor dem Fall"

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
  siteId: "delphi",
  storyId: "croesus-prophecy",
  icon: "\u{1F451}",
  storyCategory: "lost_found",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 38.4824, lng: 22.501 },
  updatedAt: now,
};

// =============================================================================
// SPANISH (es)
// =============================================================================

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#croesus-prophecy",

  title: "Creso \u2014 La profec\u00EDa que nunca minti\u00F3",

  subtitle:
    "El rey m\u00E1s rico del mundo, destruido por sus propias ganas de creer",

  excerpt:
    "Imagin\u00E1te al hombre m\u00E1s rico del mundo antiguo. Ese era Creso, rey de Lidia \u2014 un reino en lo que hoy es el oeste de Turqu\u00EDa, sentado sobre monta\u00F1as de oro. Cuando tienes tanta riqueza, empiezas a creer que puedes comprarlo todo \u2014 hasta el destino.",

  moralOrLesson:
    "La profec\u00EDa es la verdad contada en acertijos. Los sabios piden que se la aclaren; los soberbios dan por hecho que ya la entienden. Con\u00F3cete a ti mismo y entender\u00E1s a los dioses.",

  characters: [
    "Creso de Lidia",
    "Ciro el Grande",
    "La Pitia",
    "Apolo",
  ],

  era: "546 a. C.",

  source:
    "Historias de Her\u00F3doto (Libro I, cap\u00EDtulos 46-91), Moralia de Plutarco",

  paragraphs: [
    {
      text: "Imagin\u00E1te al hombre m\u00E1s rico del mundo antiguo. Ese era Creso, rey de Lidia \u2014 un reino en lo que hoy es el oeste de Turqu\u00EDa, sentado sobre monta\u00F1as de oro. \u00ABRico como Creso\u00BB era la forma antigua de decir \u00ABmillonario\u00BB. Cuando tienes tanta riqueza, empiezas a creer que puedes comprarlo todo \u2014 hasta el destino. Envi\u00F3 al Or\u00E1culo de Delfos regalos descomunales: un le\u00F3n de oro macizo de doscientos kilos, copas doradas y ciento diecisiete lingotes. Su plan: poner a los dioses de su lado.",
    },
    {
      text: "Pero en el 546 a. C., Creso ten\u00EDa un problema enorme. Ciro el Grande, rey de Persia y el comandante militar m\u00E1s temido de su \u00E9poca, se estaba tragando reinos enteros. Ya hab\u00EDa derribado el Imperio medo y avanzaba hacia el oeste, directo hacia Lidia. Creso ten\u00EDa que decidir: atacar primero o sentarse a esperar que Ciro se detuviera. As\u00ED que acudi\u00F3 al adivino m\u00E1s famoso del mundo: el Or\u00E1culo de Delfos.",
    },
    {
      text: "La sacerdotisa de Apolo, la Pitia, le dio una respuesta que resonar\u00EDa durante siglos: \u00ABSi cruzas el r\u00EDo Halis, un gran imperio ser\u00E1 destruido\u00BB. Eso fue todo. Sin detalles. Sin letra peque\u00F1a. Una sola frase devastadora envuelta en misterio.",
    },
    {
      text: "Creso escuch\u00F3 exactamente lo que quer\u00EDa escuchar. \u00BFUn gran imperio destruido? Persia, obviamente. Celebr\u00F3, envi\u00F3 a\u00FAn m\u00E1s oro a Delfos como agradecimiento y march\u00F3 con su ej\u00E9rcito hacia el este, cruzando el r\u00EDo Halis \u2014 la frontera entre su reino y el territorio de Ciro. Nunca se detuvo a hacer la \u00FAnica pregunta que podr\u00EDa haberlo salvado todo: \u00BFcu\u00E1l imperio? Porque no hay peor sordo que el que no quiere o\u00EDr \u2014 y Creso llevaba a\u00F1os sin escuchar a nadie m\u00E1s que a s\u00ED mismo.",
    },
    {
      text: "La primera batalla qued\u00F3 en tablas. Creso se retir\u00F3 a su capital, Sardes, con la idea de reagruparse durante el invierno y volver en primavera con aliados. Pero Ciro no era el tipo de general que te da tiempo para recuperarte. Persigui\u00F3 a Creso hasta Sardes, rode\u00F3 la ciudad y la tom\u00F3 en solo catorce d\u00EDas. El rey m\u00E1s rico del mundo era ahora prisionero de Ciro. El gran imperio que el Or\u00E1culo prometi\u00F3 que caer\u00EDa... era el suyo.",
    },
    {
      text: "Seg\u00FAn el historiador griego Her\u00F3doto, Ciro orden\u00F3 que colocaran a Creso sobre una pira para quemarlo vivo. Mientras las llamas sub\u00EDan, Creso grit\u00F3 el nombre de Apolo \u2014 el dios al que hab\u00EDa cubierto de oro, el dios cuyo Or\u00E1culo lo hab\u00EDa mandado a la guerra. Entonces, de un cielo completamente despejado, una tormenta repentina cay\u00F3 y apag\u00F3 el fuego. Ciro qued\u00F3 tan impresionado por la se\u00F1al divina que sac\u00F3 a Creso de las llamas y lo convirti\u00F3 en su consejero real.",
    },
    {
      text: "Pero a Creso le quedaba la amargura. Envi\u00F3 un \u00FAltimo mensaje a Delfos: \u00AB\u00BFAs\u00ED es como Apolo paga a los que le son fieles?\u00BB. La respuesta del Or\u00E1culo fue helada: \u00ABEl dios dijo que un gran imperio caer\u00EDa. Debiste preguntar cu\u00E1l. No entendiste la profec\u00EDa y nunca te molestaste en pedir que te la aclararan. La culpa es tuya, no del dios\u00BB.",
    },
    {
      text: "Y esa es la historia que defini\u00F3 a Delfos durante siglos. El Or\u00E1culo nunca minti\u00F3 \u2014 dijo la verdad de una forma que te obligaba a ser honesto contigo mismo primero. A Creso no lo enga\u00F1aron. Se enga\u00F1\u00F3 solo. Entr\u00F3 a esa profec\u00EDa con la respuesta ya escrita y solo escuch\u00F3 lo que la confirmaba. Veinticinco siglos despu\u00E9s, seguimos haciendo exactamente lo mismo: o\u00EDmos lo que queremos o\u00EDr y le echamos la culpa al destino cuando todo sale mal.",
    },
  ],
};

// =============================================================================
// FRENCH (fr)
// =============================================================================

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#croesus-prophecy",

  title: "Cr\u00E9sus \u2014 L\u2019oracle n\u2019a jamais menti",

  subtitle:
    "Le roi le plus riche du monde, d\u00E9truit par ce qu\u2019il a voulu entendre",

  excerpt:
    "Imaginez l\u2019homme le plus riche du monde antique. C\u2019\u00E9tait Cr\u00E9sus, roi de Lydie \u2014 un royaume dans l\u2019ouest de la Turquie actuelle, assis sur des montagnes d\u2019or. Quand on est riche \u00E0 ce point, on finit par croire qu\u2019on peut tout acheter \u2014 m\u00EAme l\u2019avenir.",

  moralOrLesson:
    "La proph\u00E9tie, c\u2019est la v\u00E9rit\u00E9 racont\u00E9e en \u00E9nigmes. Les sages demandent des \u00E9claircissements\u00A0; les orgueilleux croient avoir d\u00E9j\u00E0 compris. Connais-toi toi-m\u00EAme, et tu comprendras les dieux.",

  characters: [
    "Cr\u00E9sus de Lydie",
    "Cyrus le Grand",
    "La Pythie",
    "Apollon",
  ],

  era: "546 av. J.-C.",

  source:
    "Histoires d\u2019H\u00E9rodote (Livre I, chapitres 46-91), Moralia de Plutarque",

  paragraphs: [
    {
      text: "Imaginez l\u2019homme le plus riche du monde antique. C\u2019\u00E9tait Cr\u00E9sus, roi de Lydie \u2014 un royaume dans l\u2019ouest de la Turquie actuelle, assis sur des montagnes d\u2019or. \u00AB\u00A0Riche comme Cr\u00E9sus\u00A0\u00BB, on le dit encore aujourd\u2019hui. Quand on est riche \u00E0 ce point, on finit par croire qu\u2019on peut tout acheter \u2014 m\u00EAme l\u2019avenir. Alors il a envoy\u00E9 des offrandes folles \u00E0 l\u2019Oracle de Delphes\u00A0: un lion en or massif de plus de deux cents kilos, des coupes en or, cent dix-sept lingots. Son but\u00A0: mettre les dieux de son c\u00F4t\u00E9.",
    },
    {
      text: "Mais en 546 avant notre \u00E8re, Cr\u00E9sus avait un probl\u00E8me \u2014 et pas un petit. Cyrus le Grand, roi de Perse et commandant militaire le plus redoutable de son \u00E9poque, avalait les royaumes les uns apr\u00E8s les autres. Il avait d\u00E9j\u00E0 fait tomber l\u2019Empire m\u00E8de \u00E0 l\u2019est et progressait vers l\u2019ouest, droit sur la Lydie. Cr\u00E9sus devait choisir\u00A0: frapper le premier ou attendre en esp\u00E9rant que Cyrus s\u2019arr\u00EAte. Il a d\u00E9cid\u00E9 de consulter l\u2019oracle le plus c\u00E9l\u00E8bre au monde\u00A0: l\u2019Oracle de Delphes.",
    },
    {
      text: "La pr\u00EAtresse d\u2019Apollon, qu\u2019on appelait la Pythie, lui a donn\u00E9 une r\u00E9ponse qui allait traverser les si\u00E8cles\u00A0: \u00AB\u00A0Si tu traverses le fleuve Halys, un grand empire sera d\u00E9truit.\u00A0\u00BB C\u2019est tout. Pas de d\u00E9tails. Pas de conditions. Une seule phrase \u2014 d\u00E9vastatrice \u2014 envelopp\u00E9e de myst\u00E8re.",
    },
    {
      text: "Cr\u00E9sus a entendu exactement ce qu\u2019il voulait entendre. Un grand empire d\u00E9truit\u00A0? La Perse, \u00E9videmment. Il a f\u00EAt\u00E9 la nouvelle, envoy\u00E9 encore plus d\u2019or \u00E0 Delphes, et lanc\u00E9 son arm\u00E9e vers l\u2019est en traversant le fleuve Halys \u2014 la fronti\u00E8re entre son royaume et le territoire de Cyrus. Pas une seule fois il ne s\u2019est arr\u00EAt\u00E9 pour poser la question qui aurait tout chang\u00E9\u00A0: quel empire\u00A0? L\u2019homme propose, Dieu dispose \u2014 sauf que pour Cr\u00E9sus, le dieu c\u2019\u00E9tait Apollon. Et Apollon ne lui devait rien.",
    },
    {
      text: "La premi\u00E8re bataille n\u2019a rien donn\u00E9. Cr\u00E9sus s\u2019est repli\u00E9 sur sa capitale, Sardes, avec l\u2019id\u00E9e de se regrouper pendant l\u2019hiver et de revenir au printemps avec des alli\u00E9s. Mais Cyrus n\u2019\u00E9tait pas le genre de g\u00E9n\u00E9ral qui vous laisse souffler. Il a poursuivi Cr\u00E9sus jusqu\u2019\u00E0 Sardes, encercl\u00E9 la ville et l\u2019a prise en seulement quatorze jours. Le roi le plus riche du monde \u00E9tait d\u00E9sormais prisonnier de Cyrus. Le grand empire que l\u2019Oracle avait promis de voir tomber\u00A0? C\u2019\u00E9tait le sien.",
    },
    {
      text: "Selon l\u2019historien grec H\u00E9rodote, Cyrus a fait placer Cr\u00E9sus sur un b\u00FBcher pour le br\u00FBler vif. Pendant que les flammes montaient, Cr\u00E9sus a cri\u00E9 le nom d\u2019Apollon \u2014 le dieu qu\u2019il avait couvert d\u2019or, celui dont l\u2019Oracle l\u2019avait envoy\u00E9 \u00E0 la guerre. Et l\u00E0, en plein ciel bleu, un orage a surgi de nulle part et \u00E9teint le feu. Cyrus a \u00E9t\u00E9 tellement secou\u00E9 par ce signe des dieux qu\u2019il a fait retirer Cr\u00E9sus des flammes et l\u2019a nomm\u00E9 conseiller royal.",
    },
    {
      text: "Mais l\u2019amertume rongeait Cr\u00E9sus. Il a envoy\u00E9 un dernier message \u00E0 Delphes\u00A0: \u00AB\u00A0C\u2019est comme \u00E7a qu\u2019Apollon r\u00E9compense ses fid\u00E8les\u00A0?\u00A0\u00BB La r\u00E9ponse de l\u2019Oracle a \u00E9t\u00E9 glaciale\u00A0: \u00AB\u00A0Le dieu a dit qu\u2019un grand empire tomberait. Tu aurais d\u00FB demander lequel. Tu n\u2019as pas compris la proph\u00E9tie, et tu n\u2019as jamais pris la peine de demander des pr\u00E9cisions. Ne bl\u00E2me pas le dieu. Bl\u00E2me-toi.\u00A0\u00BB",
    },
    {
      text: "Et c\u2019est cette histoire qui a d\u00E9fini Delphes pendant des si\u00E8cles. L\u2019Oracle n\u2019a jamais menti \u2014 il disait la v\u00E9rit\u00E9 d\u2019une mani\u00E8re qui exigeait d\u2019abord d\u2019\u00EAtre honn\u00EAte avec soi-m\u00EAme. Cr\u00E9sus n\u2019a pas \u00E9t\u00E9 pi\u00E9g\u00E9. Il s\u2019est pi\u00E9g\u00E9 tout seul. Il est entr\u00E9 dans cette proph\u00E9tie avec sa r\u00E9ponse d\u00E9j\u00E0 \u00E9crite et n\u2019a entendu que ce qui la confirmait. Vingt-cinq si\u00E8cles plus tard, on fait encore exactement la m\u00EAme chose \u2014 on entend ce qu\u2019on veut, et on accuse le destin quand \u00E7a tourne mal.",
    },
  ],
};

// =============================================================================
// GERMAN (de)
// =============================================================================

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#croesus-prophecy",

  title: "Kr\u00F6sus \u2014 Das Orakel log nie",

  subtitle:
    "Der reichste K\u00F6nig der Welt, zerst\u00F6rt von seiner eigenen Selbstt\u00E4uschung",

  excerpt:
    "Stell dir den reichsten Mann der antiken Welt vor. Das war Kr\u00F6sus, K\u00F6nig von Lydien \u2014 einem Reich im Westen der heutigen T\u00FCrkei, das auf absurden Mengen Gold sa\u00DF. Wenn man so reich ist, f\u00E4ngt man an zu glauben, man k\u00F6nne sich alles kaufen \u2014 sogar die Zukunft.",

  moralOrLesson:
    "Prophezeiung ist Wahrheit, erz\u00E4hlt in R\u00E4tseln. Die Weisen bitten um Klarheit; die Hochm\u00FCtigen glauben, sie h\u00E4tten schon verstanden. Erkenne dich selbst, dann wirst du die G\u00F6tter verstehen.",

  characters: [
    "Kr\u00F6sus von Lydien",
    "Kyros der Gro\u00DFe",
    "Die Pythia",
    "Apollon",
  ],

  era: "546 v. Chr.",

  source:
    "Herodots Historien (Buch 1, Kapitel 46\u201391), Plutarchs Moralia",

  paragraphs: [
    {
      text: "Stell dir den reichsten Mann der antiken Welt vor. Das war Kr\u00F6sus, K\u00F6nig von Lydien \u2014 einem Reich im Westen der heutigen T\u00FCrkei, das auf absurden Mengen Gold sa\u00DF. \u201EReich wie Kr\u00F6sus\u201C sagt man bis heute. Wenn man so reich ist, f\u00E4ngt man an zu glauben, man k\u00F6nne sich alles kaufen \u2014 sogar die Zukunft. Also schickte er dem Orakel von Delphi Geschenke, die jede Vorstellung sprengen: einen L\u00F6wen aus purem Gold, goldene Schalen und hundertsiebenzehn Barren. Sein Ziel: die G\u00F6tter auf seine Seite ziehen.",
    },
    {
      text: "Aber 546 v. Chr. hatte Kr\u00F6sus ein Problem \u2014 und zwar ein gewaltiges. Kyros der Gro\u00DFe, K\u00F6nig von Persien und der gef\u00E4hrlichste Feldherr seiner Zeit, fra\u00DF ein K\u00F6nigreich nach dem anderen. Er hatte bereits das Mederreich im Osten gest\u00FCrzt und r\u00FCckte nach Westen vor, direkt auf Lydien zu. Kr\u00F6sus musste sich entscheiden: zuerst zuschlagen oder abwarten und hoffen, dass Kyros von selbst aufh\u00F6rt? Er beschloss, den ber\u00FChmtesten Wahrsager der Welt zu befragen \u2014 das Orakel von Delphi.",
    },
    {
      text: "Die Priesterin des Apollon, die Pythia, gab ihm eine Antwort, die durch die Jahrhunderte hallen sollte: \u201EWenn du den Fluss Halys \u00FCberschreitest, wirst du ein gro\u00DFes Reich zerst\u00F6ren.\u201C Das war alles. Keine Details. Kein Kleingedrucktes. Ein einziger vernichtender Satz, eingeh\u00FCllt in R\u00E4tselhaftigkeit.",
    },
    {
      text: "Kr\u00F6sus h\u00F6rte genau das, was er h\u00F6ren wollte. Ein gro\u00DFes Reich zerst\u00F6rt? Persien, nat\u00FCrlich. Er feierte, schickte noch mehr Gold nach Delphi als Dankesch\u00F6n und marschierte mit seinem Heer nach Osten, \u00FCber den Halys \u2014 die Grenze zwischen seinem Reich und dem Gebiet von Kyros. Nicht eine Sekunde hielt er inne, um die eine Frage zu stellen, die alles h\u00E4tte retten k\u00F6nnen: welches Reich? Man sagt, Hochmut kommt vor dem Fall. Bei Kr\u00F6sus kam er vor dem Untergang eines ganzen Imperiums.",
    },
    {
      text: "Die erste Schlacht endete unentschieden. Kr\u00F6sus zog sich in seine Hauptstadt Sardes zur\u00FCck, um \u00FCber den Winter neue Kr\u00E4fte zu sammeln und im Fr\u00FChling mit Verb\u00FCndeten zur\u00FCckzukehren. Aber Kyros war nicht der Typ General, der einem Zeit zur Erholung l\u00E4sst. Er verfolgte Kr\u00F6sus bis nach Sardes, umzingelte die Stadt und nahm sie in nur vierzehn Tagen ein. Der reichste K\u00F6nig der Welt war jetzt Kyros\u2019 Gefangener. Das gro\u00DFe Reich, dessen Fall das Orakel vorausgesagt hatte? Es war sein eigenes.",
    },
    {
      text: "Laut dem griechischen Historiker Herodot lie\u00DF Kyros Kr\u00F6sus auf einen Scheiterhaufen stellen, um ihn lebendig zu verbrennen. Als die Flammen stiegen, schrie Kr\u00F6sus den Namen Apollons \u2014 des Gottes, den er mit Gold \u00FCbersch\u00FCttet hatte, dessen Orakel ihn in den Krieg geschickt hatte. Da brach aus heiterem Himmel ein Wolkenbruch los und l\u00F6schte das Feuer. Kyros war so ersch\u00FCttert von diesem g\u00F6ttlichen Zeichen, dass er Kr\u00F6sus aus den Flammen holen und zu seinem k\u00F6niglichen Berater machen lie\u00DF.",
    },
    {
      text: "Doch Kr\u00F6sus blieb verbittert. Er schickte eine letzte Botschaft nach Delphi: \u201ESo belohnt Apollon die Treuen?\u201C Die Antwort des Orakels war eiskalt: \u201EDer Gott hat gesagt, ein gro\u00DFes Reich werde fallen. Du h\u00E4ttest fragen sollen, welches. Du hast die Prophezeiung nicht verstanden, und du hast dir nie die M\u00FChe gemacht nachzufragen. Gib nicht dem Gott die Schuld. Gib sie dir selbst.\u201C",
    },
    {
      text: "Und das ist die Geschichte, die Delphi \u00FCber Jahrhunderte definiert hat. Das Orakel hat nie gelogen \u2014 es hat die Wahrheit so gesagt, dass man zuerst ehrlich mit sich selbst sein musste. Kr\u00F6sus wurde nicht get\u00E4uscht. Er hat sich selbst get\u00E4uscht. Er ging in diese Prophezeiung mit einer fertigen Antwort im Kopf und h\u00F6rte nur, was sie best\u00E4tigte. F\u00FCnfundzwanzig Jahrhunderte sp\u00E4ter machen wir immer noch genau dasselbe \u2014 h\u00F6ren, was wir h\u00F6ren wollen, und nennen es Schicksal, wenn es schiefgeht.",
    },
  ],
};

// =============================================================================
// PUSH TO DYNAMODB
// =============================================================================

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23F3 Pushing ${label} ...`);

  // JSON round-trip validation
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Validate paragraph constraints
  let totalChars = 0;
  for (let i = 0; i < record.paragraphs.length; i++) {
    const chars = record.paragraphs[i].text.length;
    totalChars += chars;
    if (chars > 500) {
      console.warn(
        `\u26A0\uFE0F  ${label} paragraph ${i + 1}: ${chars} chars (over 500 limit)`
      );
    }
  }
  console.log(
    `\uD83D\uDCCA ${label}: ${record.paragraphs.length} paragraphs, ${totalChars} total chars`
  );

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully (new record).`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `\u26A0\uFE0F  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`\u2705 ${label} overwritten successfully.`);
    } else {
      console.error(`\u274C Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("=== Pushing Croesus story: ES, FR, DE ===");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  // Push sequentially to confirm each before proceeding
  await pushStory(es);
  await pushStory(fr);
  await pushStory(de);

  console.log("\n=== All three translations pushed successfully ===");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
