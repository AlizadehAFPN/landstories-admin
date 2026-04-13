// Push Spanish, French, and German recreations of "The Wooden Walls of Athens"
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
  siteId: "delphi",
  storyId: "wooden-walls",
  icon: "\u2693",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 38.4824, lng: 22.501 },
  source:
    "Herodotus\u2019s Histories (Book 7, chapters 140-143), Plutarch\u2019s Life of Themistocles",
  era: "480 BCE",
  characters: [
    "Themistocles",
    "The Pythia",
    "Xerxes",
    "The Athenian Assembly",
    "Apollo",
  ],
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb: "No hay peor sordo que el que no quiere oír" — subverted
// Register: Skilled modern storyteller, vivid and direct
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#wooden-walls",

  title: "Las murallas de madera de Atenas",

  subtitle: "El enigma del Or\u00e1culo que salv\u00f3 a Grecia de los persas",

  excerpt:
    "En el a\u00f1o 480 a.\u00a0C., el imperio m\u00e1s poderoso del mundo march\u00f3 contra Grecia. El rey Jerjes de Persia tra\u00eda un ej\u00e9rcito tan descomunal que los escritores antiguos juraban que secaba r\u00edos enteros a su paso.",

  moralOrLesson:
    "El mismo Or\u00e1culo que arruin\u00f3 al rey Creso salv\u00f3 Atenas. La diferencia no fue el acertijo, sino qui\u00e9n lo escuchaba.",

  paragraphs: [
    {
      text: "En el a\u00f1o 480 a.\u00a0C., el imperio m\u00e1s poderoso del mundo march\u00f3 contra Grecia. El rey Jerjes de Persia tra\u00eda un ej\u00e9rcito tan descomunal que los escritores antiguos juraban que secaba r\u00edos enteros a su paso. Su padre Dar\u00edo lo hab\u00eda intentado diez a\u00f1os antes y hab\u00eda perdido en Marat\u00f3n. Jerjes no ven\u00eda solo a conquistar. Ven\u00eda a vengarse.",
    },
    {
      text: "Atenas estaba aterrada. Hicieron lo que todo griego hac\u00eda ante el desastre: enviar mensajeros al Or\u00e1culo de Delfos, la voz prof\u00e9tica m\u00e1s respetada del mundo antiguo. Pero la primera respuesta fue demoledora: huyan. Huyan al fin del mundo. Nada puede salvarlos. Los mensajeros se negaron a irse y suplicaron algo m\u00e1s \u2014 lo que fuera \u2014 que les dejara un hilo de esperanza.",
    },
    {
      text: "El Or\u00e1culo habl\u00f3 de nuevo, esta vez con un acertijo. Dijo que unas \u00abmurallas de madera\u00bb proteger\u00edan a Atenas, y llam\u00f3 a la isla de Salamina \u00abdivina\u00bb. Que la destrucci\u00f3n llegaba, eso estaba claro. Pero en las entra\u00f1as del enigma se escond\u00eda una salida. Todo el futuro de Atenas depend\u00eda ahora de una sola pregunta: \u00bfqu\u00e9 demonios significaban las \u00abmurallas de madera\u00bb?",
    },
    {
      text: "La Asamblea ateniense estall\u00f3. Los l\u00edderes m\u00e1s veteranos lo ten\u00edan clar\u00edsimo: las \u00abmurallas de madera\u00bb eran la empalizada que rodeaba la Acr\u00f3polis, la fortaleza sagrada de Atenas. Hay que refugiarse ah\u00ed arriba y rezar. Pero un general llamado Tem\u00edstocles ten\u00eda una lectura completamente distinta. Las \u00abmurallas\u00bb, insisti\u00f3, eran barcos. Atenas acababa de construir una enorme flota nueva. El Or\u00e1culo les estaba diciendo que abandonaran la ciudad y pelearan en el mar.",
    },
    {
      text: "Tem\u00edstocles ten\u00eda un argumento demoledor. El Or\u00e1culo llam\u00f3 a Salamina \u00abdivina\u00bb \u2014 no \u00abcruel\u00bb, no \u00abfunesta\u00bb. Si los griegos estuvieran destinados a morir all\u00ed, habr\u00eda elegido una palabra m\u00e1s oscura. \u00abDivina\u00bb significaba victoria. La Asamblea vot\u00f3. Tem\u00edstocles gan\u00f3.",
    },
    {
      text: "Atenas se vaci\u00f3 entera. Mujeres, ni\u00f1os, ancianos \u2014 todos huyeron a la isla de Salamina mientras el ej\u00e9rcito persa entraba en la ciudad y lo quemaba todo, incluidos los templos sagrados de la Acr\u00f3polis. Parec\u00eda la derrota total. Pero Tem\u00edstocles hab\u00eda tendido una trampa. Atrajo la flota persa a las aguas estrechas de Salamina, donde sus enormes barcos de guerra no pod\u00edan maniobrar. Los barcos griegos, m\u00e1s peque\u00f1os y r\u00e1pidos, los hicieron pedazos.",
    },
    {
      text: "Fue una de las batallas navales m\u00e1s decisivas de la historia. Las \u00abmurallas de madera\u00bb \u2014 la flota ateniense \u2014 no solo salvaron Atenas. Salvaron a toda Grecia. Sin armada para abastecer a su ej\u00e9rcito, Jerjes se retir\u00f3. En menos de un a\u00f1o, los persas que quedaban fueron aplastados en Platea, y la invasi\u00f3n termin\u00f3 para siempre.",
    },
    {
      text: "El mismo Or\u00e1culo que arruin\u00f3 al rey Creso con un acertijo salv\u00f3 a toda una civilizaci\u00f3n con otro. La diferencia no fue la profec\u00eda \u2014 fue qui\u00e9n escuchaba. Creso oy\u00f3 lo que quiso o\u00edr. Tem\u00edstocles oy\u00f3 lo que realmente se dec\u00eda. No hay peor sordo que el que no quiere o\u00edr, dice el refr\u00e1n. Pero Tem\u00edstocles demostr\u00f3 algo m\u00e1s: a veces la respuesta est\u00e1 delante de todos, y solo hace falta el valor de escucharla distinto.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb: "Aide-toi, le ciel t'aidera" — subverted
// Register: Grand récit populaire, vivant et immédiat
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#wooden-walls",

  title: "Les murs de bois d\u2019Ath\u00e8nes",

  subtitle: "L\u2019Oracle qui sauva la Gr\u00e8ce des Perses",

  excerpt:
    "En 480 avant notre \u00e8re, l\u2019empire le plus puissant du monde marcha sur la Gr\u00e8ce. Le roi Xerx\u00e8s de Perse amenait une arm\u00e9e si colossale que les auteurs anciens juraient qu\u2019elle ass\u00e9chait des fleuves entiers sur son passage.",

  moralOrLesson:
    "Le m\u00eame Oracle qui ruina Cr\u00e9sus sauva Ath\u00e8nes. La diff\u00e9rence n\u2019\u00e9tait pas l\u2019\u00e9nigme \u2014 mais celui qui l\u2019\u00e9coutait.",

  paragraphs: [
    {
      text: "En 480 avant notre \u00e8re, l\u2019empire le plus puissant du monde marcha sur la Gr\u00e8ce. Le roi Xerx\u00e8s de Perse amenait une arm\u00e9e si colossale que les auteurs anciens juraient qu\u2019elle ass\u00e9chait des fleuves entiers sur son passage. Son p\u00e8re Darius avait tent\u00e9 la conqu\u00eate dix ans plus t\u00f4t et s\u2019\u00e9tait fait \u00e9craser \u00e0 Marathon. Xerx\u00e8s ne venait pas simplement conqu\u00e9rir. Il venait se venger.",
    },
    {
      text: "Ath\u00e8nes \u00e9tait p\u00e9trifi\u00e9e. Les Ath\u00e9niens firent ce que tout Grec faisait face au d\u00e9sastre\u00a0: envoyer des messagers \u00e0 l\u2019Oracle de Delphes, la voix proph\u00e9tique la plus respect\u00e9e du monde antique. Mais la premi\u00e8re r\u00e9ponse fut gla\u00e7ante\u00a0: fuyez. Fuyez jusqu\u2019au bout de la terre. Rien ne peut vous sauver. Les messagers refus\u00e8rent de partir et suppli\u00e8rent qu\u2019on leur accorde autre chose \u2014 n\u2019importe quoi \u2014 qui ressemble \u00e0 un espoir.",
    },
    {
      text: "L\u2019Oracle parla de nouveau, cette fois sous forme d\u2019\u00e9nigme. Elle annon\u00e7a que des \u00ab\u00a0murs de bois\u00a0\u00bb prot\u00e9geraient Ath\u00e8nes et qualifia l\u2019\u00eele de Salamine de \u00ab\u00a0divine\u00a0\u00bb. Que la destruction approchait, personne n\u2019en doutait. Mais au c\u0153ur de l\u2019\u00e9nigme se cachait une issue. L\u2019avenir d\u2019Ath\u00e8nes tout entier reposait d\u00e9sormais sur une seule question\u00a0: que voulaient dire ces \u00ab\u00a0murs de bois\u00a0\u00bb\u00a0?",
    },
    {
      text: "L\u2019Assembl\u00e9e ath\u00e9nienne explosa. Les anciens pensaient que c\u2019\u00e9tait limpide\u00a0: les \u00ab\u00a0murs de bois\u00a0\u00bb, c\u2019\u00e9tait la palissade qui entourait l\u2019Acropole, la forteresse sacr\u00e9e d\u2019Ath\u00e8nes. Il fallait s\u2019y retrancher et prier les dieux. Mais un strat\u00e8ge nomm\u00e9 Th\u00e9mistocle avait une lecture radicalement diff\u00e9rente. Les \u00ab\u00a0murs de bois\u00a0\u00bb, martela-t-il, c\u2019\u00e9taient les navires. Ath\u00e8nes venait de b\u00e2tir une flotte immense. L\u2019Oracle leur commandait d\u2019abandonner la ville et de livrer bataille en mer.",
    },
    {
      text: "Th\u00e9mistocle avait un argument imparable. L\u2019Oracle avait dit Salamine \u00ab\u00a0divine\u00a0\u00bb \u2014 pas \u00ab\u00a0cruelle\u00a0\u00bb, pas \u00ab\u00a0funeste\u00a0\u00bb. Si les Grecs devaient y p\u00e9rir, elle aurait choisi un mot plus sombre. \u00ab\u00a0Divine\u00a0\u00bb signifiait victoire. L\u2019Assembl\u00e9e vota. Th\u00e9mistocle l\u2019emporta.",
    },
    {
      text: "Ath\u00e8nes se vida enti\u00e8rement. Femmes, enfants, vieillards \u2014 tout le monde s\u2019enfuit vers Salamine pendant que l\u2019arm\u00e9e perse p\u00e9n\u00e9trait dans la ville et br\u00fblait tout, y compris les temples sacr\u00e9s de l\u2019Acropole. On aurait dit la fin de tout. Mais Th\u00e9mistocle avait tendu un pi\u00e8ge. Il attira la flotte perse dans les eaux \u00e9troites de Salamine, l\u00e0 o\u00f9 leurs \u00e9normes navires ne pouvaient plus man\u0153uvrer. Les navires grecs, plus petits et plus rapides, les taill\u00e8rent en pi\u00e8ces.",
    },
    {
      text: "Ce fut l\u2019une des batailles navales les plus d\u00e9cisives de l\u2019histoire. Les \u00ab\u00a0murs de bois\u00a0\u00bb \u2014 la flotte ath\u00e9nienne \u2014 ne sauv\u00e8rent pas seulement Ath\u00e8nes. Ils sauv\u00e8rent la Gr\u00e8ce enti\u00e8re. Priv\u00e9 de marine pour ravitailler son arm\u00e9e, Xerx\u00e8s battit en retraite. En moins d\u2019un an, les forces perses restantes furent an\u00e9anties \u00e0 Plat\u00e9es, et l\u2019invasion prit fin pour de bon.",
    },
    {
      text: "Le m\u00eame Oracle qui avait ruin\u00e9 le roi Cr\u00e9sus avec une \u00e9nigme venait de sauver toute une civilisation avec une autre. La diff\u00e9rence, ce n\u2019\u00e9tait pas la proph\u00e9tie \u2014 c\u2019\u00e9tait celui qui \u00e9coutait. Cr\u00e9sus avait entendu ce qu\u2019il voulait entendre. Th\u00e9mistocle avait entendu ce qui se disait vraiment. Aide-toi, le ciel t\u2019aidera, dit le proverbe \u2014 encore faut-il comprendre ce que le ciel essaie de te dire. La r\u00e9ponse \u00e9tait l\u00e0, pour tout le monde. Il suffisait du courage de la lire autrement.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb: "Wer nicht wagt, der nicht gewinnt" — subverted
// Register: Fesselnder historischer Erzähler, lebendig und direkt
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#wooden-walls",

  title: "Die h\u00f6lzernen Mauern von Athen",

  subtitle: "Das Orakel, das Griechenland vor den Persern rettete",

  excerpt:
    "Im Jahr 480 v.\u00a0Chr. marschierte das m\u00e4chtigste Reich der Welt gegen Griechenland. K\u00f6nig Xerxes von Persien brachte ein Heer mit, so gewaltig, dass antike Autoren behaupteten, es trinke ganze Fl\u00fcsse leer.",

  moralOrLesson:
    "Dasselbe Orakel, das K\u00f6nig Kr\u00f6sus mit einem R\u00e4tsel ruinierte, rettete Athen. Der Unterschied lag nicht im R\u00e4tsel \u2014 sondern darin, wer zuh\u00f6rte.",

  paragraphs: [
    {
      text: "Im Jahr 480 v.\u00a0Chr. marschierte das m\u00e4chtigste Reich der Welt gegen Griechenland. K\u00f6nig Xerxes von Persien brachte ein Heer mit, so gewaltig, dass antike Autoren behaupteten, es trinke ganze Fl\u00fcsse leer. Sein Vater Darius hatte zehn Jahre zuvor dasselbe versucht \u2014 und bei Marathon eine vernichtende Niederlage kassiert. Xerxes kam nicht nur, um zu erobern. Er kam, um Rache zu nehmen.",
    },
    {
      text: "Athen war starr vor Angst. Die Athener taten, was Griechen in der Krise immer taten: Sie schickten Gesandte zum Orakel von Delphi, der angesehensten prophetischen Stimme der antiken Welt. Doch die erste Antwort war vernichtend: Flieht. Flieht bis ans Ende der Welt. Nichts kann euch retten. Die Gesandten weigerten sich zu gehen und flehten um irgendetwas \u2014 irgendeinen Funken Hoffnung.",
    },
    {
      text: "Das Orakel sprach erneut, diesmal in einem R\u00e4tsel. Es sagte, \u201eh\u00f6lzerne Mauern\u201c w\u00fcrden Athen besch\u00fctzen, und nannte die Insel Salamis \u201eg\u00f6ttlich\u201c. Dass die Zerst\u00f6rung kam \u2014 daran zweifelte niemand. Doch im Kern des R\u00e4tsels verbarg sich ein Ausweg. Die gesamte Zukunft Athens hing jetzt an einer einzigen Frage: Was bedeuteten die \u201eh\u00f6lzernen Mauern\u201c?",
    },
    {
      text: "Die Volksversammlung explodierte. Die \u00e4lteren Anf\u00fchrer fanden es offensichtlich: Die \u201eh\u00f6lzernen Mauern\u201c meinten den Holzzaun um die Akropolis, Athens heilige Festung. Man solle sich dort oben verschanzen und beten. Doch ein Feldherr namens Themistokles las das R\u00e4tsel v\u00f6llig anders. Die \u201eh\u00f6lzernen Mauern\u201c, beharrte er, seien Schiffe. Athen hatte gerade eine gewaltige neue Flotte gebaut. Das Orakel befahl ihnen, die Stadt aufzugeben und zur See zu k\u00e4mpfen.",
    },
    {
      text: "Themistokles hatte ein schlagendes Argument. Das Orakel nannte Salamis \u201eg\u00f6ttlich\u201c \u2014 nicht \u201egrausam\u201c, nicht \u201everh\u00e4ngnisvoll\u201c. W\u00e4ren die Griechen dort zum Sterben bestimmt gewesen, h\u00e4tte es ein dunkleres Wort gew\u00e4hlt. \u201eG\u00f6ttlich\u201c bedeutete Sieg. Die Versammlung stimmte ab. Themistokles gewann.",
    },
    {
      text: "Athen wurde vollst\u00e4ndig ger\u00e4umt. Frauen, Kinder, Alte \u2014 alle flohen auf die Insel Salamis, w\u00e4hrend das persische Heer in die Stadt einmarschierte und alles niederbrannte, auch die heiligen Tempel auf der Akropolis. Es sah nach einer totalen Niederlage aus. Doch Themistokles hatte eine Falle gestellt. Er lockte die persische Flotte in die engen Gew\u00e4sser rund um Salamis, wo ihre riesigen Kriegsschiffe nicht wenden konnten. Die kleineren, wendigeren griechischen Schiffe rammten sie in St\u00fccke.",
    },
    {
      text: "Es war eine der entscheidendsten Seeschlachten der Geschichte. Die \u201eh\u00f6lzernen Mauern\u201c \u2014 die athenische Flotte \u2014 retteten nicht nur Athen. Sie retteten ganz Griechenland. Ohne Marine, die sein Heer versorgen konnte, zog Xerxes sich zur\u00fcck. Innerhalb eines Jahres wurden die verbliebenen persischen Truppen bei Plataiai vernichtend geschlagen, und die Invasion war endg\u00fcltig vorbei.",
    },
    {
      text: "Dasselbe Orakel, das Jahre zuvor K\u00f6nig Kr\u00f6sus mit einem R\u00e4tsel ins Verderben gest\u00fcrzt hatte, rettete nun eine ganze Zivilisation mit einem anderen. Der Unterschied lag nicht in der Prophezeiung \u2014 sondern darin, wer zuh\u00f6rte. Kr\u00f6sus h\u00f6rte, was er h\u00f6ren wollte. Themistokles h\u00f6rte, was wirklich gesagt wurde. Wer nicht wagt, der nicht gewinnt, hei\u00dft es \u2014 aber wer nicht zuh\u00f6rt, versteht auch nichts. Die Antwort lag vor aller Augen. Es brauchte nur den Mut, sie anders zu lesen.",
    },
  ],
};

// ─── Push helper ─────────────────────────────────────────────────────────────
async function push(label, item) {
  console.log(`\n⏳  Pushing ${label}...`);
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`✅  ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
  } catch (err) {
    console.error(`❌  ${label} FAILED:`, err);
    process.exit(1);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  await push("Spanish (es)", es);
  await push("French (fr)", fr);
  await push("German (de)", de);
  console.log("\n🎉  All three languages pushed successfully!\n");
}

main();
