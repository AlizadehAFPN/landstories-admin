// Push Spanish, French, and German recreations of "The Oldest Living City"
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
  siteId: "varanasi",
  storyId: "oldest-living-city",
  icon: "\u{1F549}\uFE0F",
  storyCategory: "place_names",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 25.3109, lng: 83.0107 },
  source:
    "Twain, Mark. Following the Equator, 1897, Ch. LVIII; Eck, Diana L. Banaras: City of Light, Princeton University Press, 1982; Narain, A.K. and Roy, T.N. Excavations at Rajghat, Banaras Hindu University, 1976; Skanda Purana, Kashi Khanda (12th-14th century CE); Dhammacakkappavattana Sutta (Samyutta Nikaya 56.11); Xuanzang, Da Tang Xiyu Ji (Great Tang Records on the Western Regions, 7th century CE)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb subverted: "No hay mal que dure cien años"
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#oldest-living-city",

  title: "La ciudad que nunca se apagó",

  subtitle:
    "Tres mil años rezando al mismo río, quemando a sus muertos en la misma orilla \u2014 la ciudad que se niega a desaparecer",

  excerpt:
    "Mark Twain escribió que Benarés es más antigua que la historia, más antigua que la tradición, más antigua incluso que la leyenda. No exageraba ni un poco.",

  moralOrLesson:
    "Una ciudad no sobrevive tres mil años por sus murallas ni por sus ejércitos, sino por lo que significa para el alma humana. Los lugares que más perduran no son los construidos sobre piedra, sino los levantados sobre una idea tan profunda que cada generación elige, libre y fieramente, reconstruirla.",

  era: "c. 1800 a. C. \u2013 presente (más de 3000 años de habitación continua)",

  characters: [
    "Mark Twain (escritor estadounidense que visitó la ciudad en 1896)",
    "Buda (Siddhartha Gautama, predicó en la cercana Sarnath)",
    "Xuanzang (peregrino budista chino, siglo VII d. C.)",
    "Ustad Bismillah Khan (maestro del shehnai, 1916\u20132006)",
    "Kabir (poeta y tejedor místico, c. 1398\u20131518)",
    "Tulsidas (autor del Ramcharitmanas, c. 1532\u20131623)",
  ],

  paragraphs: [
    {
      text: "Mark Twain llegó al Ganges en barco en 1896 y escribió que Varanasi era \u00abmás antigua que la historia, más antigua que la tradición, más antigua incluso que la leyenda, y parece el doble de vieja que todas ellas juntas\u00bb. Lo que vio llevaba miles de años ahí: escalinatas de piedra bajando al río, templos sobre cada azotea, hogueras funerarias que no se apagan desde hace siglos. Muchas ciudades presumen de ser las más antiguas del mundo. Varanasi no presume. Simplemente nunca dejó de existir.",
    },
    {
      text: "Los arqueólogos excavaron donde dos ríos se encuentran y hallaron cerámica de alrededor de 1800 a. C. Debajo de esa capa: nada. Encima: capa tras capa tras capa, cada época de la historia india apilada como un calendario hecho de tierra y piedra. Sin huecos. Sin abandonos. Sin silencios. El Rigveda, uno de los textos sagrados más antiguos del mundo, llama a este lugar Kashi: \u00abla Ciudad de la Luz\u00bb. Mientras otras ciudades antiguas fueron abandonadas y redescubiertas siglos después, Kashi nunca dejó de brillar.",
    },
    {
      text: "Hacia el 528 a. C., Buda caminó hasta Sarnath, a las afueras de Varanasi, para dar su primer sermón. No eligió el lugar al azar: Varanasi ya era la capital intelectual del mundo conocido. Frente a cinco seguidores que lo habían dado por perdido, expuso las ideas que transformarían medio continente: el Camino Medio, las Cuatro Nobles Verdades, el fin del sufrimiento. Cuando nació el budismo, la ciudad que lo vio nacer ya tenía mil años.",
    },
    {
      text: "Los conquistadores vinieron una y otra vez. En 1194, ejércitos invasores destruyeron casi mil templos. En 1669, el emperador mogol Aurangzeb derribó el templo de Shiva más sagrado de India y levantó una mezquita sobre sus cimientos. Le cambió el nombre a la ciudad. Nadie usó el nombre nuevo. En 1780, una reina guerrera llamada Ahilyabai Holkar construyó un templo nuevo justo al lado. Un rey sij cubrió su cúpula de oro. Dicen que no hay mal que dure cien años. Varanasi lleva tres mil demostrando que no hay luz que se pueda apagar.",
    },
    {
      text: "Lo que hace a Varanasi verdaderamente distinta es una idea. Las escrituras hindúes dicen que la ciudad descansa sobre el tridente de Shiva, suspendida entre el cielo y la tierra. Cuando el universo sea destruido al final de los tiempos, Shiva la levantará por encima del diluvio. Lo sagrado es el suelo, no los edificios. Por eso puedes arrasar cada templo y Varanasi sigue siendo Varanasi. Los hindúes creen que quien muere dentro de sus límites escapa para siempre del ciclo de reencarnaciones. Puedes destruir la casa de Dios. No puedes destruir el suelo donde se levanta.",
    },
    {
      text: "Pero Varanasi no es un museo. Camina por sus callejones \u2014tan estrechos que apenas caben dos personas\u2014 y compartirás el paso con vacas, motos, procesiones funerarias y niños camino al colegio, todo a la vez. Esta es la ciudad que le dio al mundo a Kabir, el poeta rebelde cuyos versos todavía citan hindúes, musulmanes y sijs por igual. Aquí Bismillah Khan tocó música junto al Ganges cada amanecer durante setenta años y se negó a irse, diciendo que jamás podría abandonar su río ni a su dios.",
    },
    {
      text: "Cada noche en Dashashwamedh Ghat, los sacerdotes hacen girar enormes lámparas de bronce en la oscuridad mientras miles observan desde las escalinatas y desde botes sobre el agua negra. Cada mañana, antes de que el sol asome por la otra orilla, los bañistas bajan al río en la penumbra gris. Y la ciudad hace lo que ha hecho cada día durante tres mil años: gira su rostro hacia el agua, reza, quema a sus muertos y sigue viviendo.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb subverted: "Tout passe, tout lasse, tout casse"
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#oldest-living-city",

  title: "La ville qui refuse de mourir",

  subtitle:
    "Trois mille ans à prier le même fleuve, brûler ses morts sur les mêmes marches \u2014 la cité qui ne s\u2019est jamais éteinte",

  excerpt:
    "Mark Twain a écrit que Bénarès est plus ancienne que l\u2019histoire, plus ancienne que la tradition, plus ancienne même que la légende. Il n\u2019exagérait pas le moins du monde.",

  moralOrLesson:
    "Une ville ne survit pas trois mille ans grâce à ses murailles ou ses armées, mais grâce à ce qu\u2019elle représente pour l\u2019âme humaine. Les lieux qui traversent le mieux le temps ne sont pas ceux bâtis sur la pierre, mais ceux bâtis sur une idée si profonde que chaque génération choisit, librement et farouchement, de la reconstruire.",

  era: "v. 1800 av. J.-C. \u2013 présent (plus de 3 000 ans d\u2019habitation continue)",

  characters: [
    "Mark Twain (écrivain américain qui visita la ville en 1896)",
    "Le Bouddha (Siddhartha Gautama, prêcha à Sarnath, tout près)",
    "Xuanzang (pèlerin bouddhiste chinois, VIIe siècle)",
    "Ustad Bismillah Khan (maître du shehnai, 1916\u20132006)",
    "Kabir (poète-tisserand mystique, v. 1398\u20131518)",
    "Tulsidas (auteur du Ramcharitmanas, v. 1532\u20131623)",
  ],

  paragraphs: [
    {
      text: "Mark Twain a remonté le Gange en bateau en 1896 et a écrit que Varanasi était \u00ab\u202Fplus ancienne que l\u2019histoire, plus ancienne que la tradition, plus ancienne même que la légende\u202F\u00bb. Ce qu\u2019il a vu existait depuis des millénaires\u202F: des escaliers de pierre plongeant dans le fleuve, des temples sur chaque toit, des bûchers funéraires allumés sans interruption depuis des siècles. Beaucoup de villes prétendent être les plus anciennes du monde. Varanasi, elle, n\u2019a simplement jamais cessé d\u2019exister.",
    },
    {
      text: "Les archéologues ont creusé au confluent de deux rivières et trouvé des poteries datant d\u2019environ 1800 av. J.-C. En dessous\u202F: rien. Au-dessus\u202F: couche après couche après couche, chaque époque de l\u2019histoire indienne empilée comme un calendrier fait de terre et de pierre. Aucun vide. Aucun abandon. Aucun silence. Le Rigveda, l\u2019un des textes sacrés les plus anciens au monde, appelle cet endroit Kashi\u202F: \u00ab\u202Fla Cité de Lumière\u202F\u00bb. Pendant que d\u2019autres villes antiques tombaient dans l\u2019oubli, Kashi continuait de briller.",
    },
    {
      text: "Vers 528 av. J.-C., le Bouddha a marché jusqu\u2019à Sarnath, aux portes de Varanasi, pour prononcer son tout premier sermon. Il n\u2019a pas choisi l\u2019endroit au hasard\u202F: Varanasi était déjà la capitale intellectuelle du monde connu. Devant cinq disciples qui l\u2019avaient abandonné, il a exposé les idées qui allaient transformer la moitié de l\u2019Asie\u202F: la Voie du Milieu, les Quatre Nobles Vérités, la fin de la souffrance. Quand le bouddhisme est né, la ville qui l\u2019a vu naître avait déjà mille ans.",
    },
    {
      text: "Les conquérants sont venus et revenus. En 1194, des armées ont détruit près de mille temples. En 1669, l\u2019empereur moghol Aurangzeb a rasé le temple de Shiva le plus sacré d\u2019Inde et bâti une mosquée sur ses fondations. Il a rebaptisé la ville. Personne n\u2019a utilisé le nouveau nom. En 1780, une reine guerrière nommée Ahilyabai Holkar a construit un nouveau temple juste à côté. Un roi sikh a recouvert son dôme d\u2019or. On dit que tout passe, tout lasse, tout casse. Personne n\u2019a prévenu Varanasi.",
    },
    {
      text: "Ce qui rend Varanasi différente, c\u2019est une idée. Les textes hindous disent que la ville repose sur le trident de Shiva, suspendue entre ciel et terre. À la fin des temps, Shiva la soulèvera au-dessus du déluge. Le sol est sacré, pas les bâtiments. On peut raser chaque temple\u202F: Varanasi reste Varanasi. Les hindous croient que quiconque meurt dans ses limites échappe pour toujours au cycle des renaissances. On peut détruire la maison de Dieu. Pas le sol sur lequel elle se dresse.",
    },
    {
      text: "Mais Varanasi n\u2019est pas un musée. Marchez dans ses ruelles \u2014\u202Fsi étroites que deux personnes passent à peine\u202F\u2014 et vous croiserez des vaches, des motos, des cortèges funéraires et des écoliers, tout à la fois. C\u2019est la ville qui a donné au monde Kabir, le poète rebelle dont les vers sont encore cités par hindous, musulmans et sikhs. Bismillah Khan y a joué de la musique face au Gange chaque aube pendant soixante-dix ans, refusant de partir\u202F: jamais il ne quitterait son fleuve ni son dieu.",
    },
    {
      text: "Chaque soir à Dashashwamedh Ghat, des prêtres font tournoyer d\u2019immenses lampes de bronze dans l\u2019obscurité tandis que des milliers de personnes regardent depuis les marches de pierre et depuis des barques sur l\u2019eau noire. Chaque matin, avant que le soleil ne franchisse la rive opposée, des baigneurs descendent vers le fleuve dans la lumière grise. Et la ville fait ce qu\u2019elle fait chaque jour depuis trois mille ans\u202F: elle tourne son visage vers l\u2019eau, elle prie, elle brûle ses morts, et elle vit.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb subverted: "Steter Tropfen höhlt den Stein"
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#oldest-living-city",

  title: "Die Stadt, die niemals stirbt",

  subtitle:
    "Dreitausend Jahre am selben Fluss gebetet, die Toten auf denselben Stufen verbrannt \u2014 und nie aufgehört zu leben",

  excerpt:
    "Mark Twain schrieb, Benares sei älter als die Geschichte, älter als die Tradition, älter sogar als die Legende. Er hat nicht übertrieben.",

  moralOrLesson:
    "Eine Stadt überdauert nicht dreitausend Jahre wegen ihrer Mauern oder ihrer Armeen, sondern wegen dem, was sie für die menschliche Seele bedeutet. Die Orte, die am längsten bestehen, sind nicht die aus Stein gebauten, sondern die auf einer Idee errichteten \u2014 einer Idee so tiefgreifend, dass jede Generation sich frei und leidenschaftlich entscheidet, sie neu aufzubauen.",

  era: "ca. 1800 v. Chr. \u2013 Gegenwart (über 3.000 Jahre ununterbrochener Besiedlung)",

  characters: [
    "Mark Twain (amerikanischer Schriftsteller, besuchte die Stadt 1896)",
    "Der Buddha (Siddhartha Gautama, predigte im nahen Sarnath)",
    "Xuanzang (chinesischer buddhistischer Pilger, 7. Jh. n. Chr.)",
    "Ustad Bismillah Khan (Shehnai-Meister, 1916\u20132006)",
    "Kabir (mystischer Dichter und Weber, ca. 1398\u20131518)",
    "Tulsidas (Autor des Ramcharitmanas, ca. 1532\u20131623)",
  ],

  paragraphs: [
    {
      text: "Mark Twain erreichte 1896 per Boot den Ganges und schrieb, Varanasi sei \u201eälter als die Geschichte, älter als die Tradition, älter sogar als die Legende \u2014 und sehe doppelt so alt aus wie alle drei zusammen\u201c. Was er sah, stand seit Jahrtausenden dort: Steinstufen zum Fluss, Tempel auf jedem Dach, Scheiterhaufen, die seit Jahrhunderten ohne Pause brennen. Viele Städte behaupten, die älteste der Welt zu sein. Varanasi behauptet gar nichts. Sie hat einfach nie aufgehört zu existieren.",
    },
    {
      text: "Archäologen gruben dort, wo zwei Flüsse zusammenfließen, und fanden Keramik aus der Zeit um 1800 v. Chr. Darunter: nichts. Darüber: Schicht um Schicht um Schicht, jede Epoche der indischen Geschichte aufgestapelt wie ein Kalender aus Erde und Stein. Keine Lücke. Kein Abbruch. Keine Stille. Der Rigveda, einer der ältesten heiligen Texte der Menschheit, nennt diesen Ort Kashi \u2014 \u201edie Stadt des Lichts\u201c. Während andere antike Städte verlassen und irgendwann wiederentdeckt wurden, leuchtete Kashi einfach weiter.",
    },
    {
      text: "Um 528 v. Chr. ging der Buddha nach Sarnath, direkt vor den Toren von Varanasi, um seine allererste Predigt zu halten. Er wählte den Ort nicht zufällig \u2014 Varanasi war bereits die intellektuelle Hauptstadt der bekannten Welt. Vor fünf Anhängern, die ihn eigentlich aufgegeben hatten, legte er die Ideen dar, die halb Asien verändern sollten: den Mittleren Weg, die Vier Edlen Wahrheiten, das Ende des Leidens. Als der Buddhismus geboren wurde, war die Stadt, die seine Geburt erlebte, bereits tausend Jahre alt.",
    },
    {
      text: "Eroberer kamen immer wieder. 1194 zerstörten Armeen fast tausend Tempel. 1669 ließ der Mogulkaiser Aurangzeb den heiligsten Shiva-Tempel Indiens abreißen und eine Moschee auf sein Fundament bauen. Er gab der Stadt einen neuen Namen. Niemand benutzte ihn. 1780 baute die Kriegerkönigin Ahilyabai Holkar einen neuen Tempel direkt nebenan. Ein Sikh-König überzog die Kuppel mit Gold. Steter Tropfen höhlt den Stein, sagt man. Am Ganges fließt das Wasser seit dreitausend Jahren \u2014 und der Stein steht noch.",
    },
    {
      text: "Was Varanasi einzigartig macht, ist eine Idee. Hinduistische Schriften sagen, die Stadt ruhe auf Shivas Dreizack, schwebend zwischen Himmel und Erde. Wenn das Universum am Ende der Zeit untergeht, hebt Shiva die Stadt über die Flut. Heilig ist der Boden, nicht die Gebäude. Man kann jeden Tempel niederbrennen \u2014 Varanasi bleibt Varanasi. Hindus glauben, wer innerhalb der Stadtgrenzen stirbt, entkommt für immer dem Kreislauf der Wiedergeburt. Man kann das Haus Gottes zerstören. Nicht den Boden, auf dem es steht.",
    },
    {
      text: "Aber Varanasi ist kein Museum. Geh durch die Gassen \u2014 so schmal, dass kaum zwei Menschen aneinander vorbeikommen \u2014 und du teilst den Weg mit Kühen, Motorrädern, Trauerzügen und Schulkindern, alles gleichzeitig. Das ist die Stadt, die der Welt Kabir schenkte, den rebellischen Dichter, dessen Verse noch heute von Hindus, Muslimen und Sikhs zitiert werden. Hier spielte Bismillah Khan siebzig Jahre lang jeden Morgen am Ganges Musik und weigerte sich zu gehen \u2014 er könne seinen Fluss und seinen Gott niemals verlassen.",
    },
    {
      text: "Jeden Abend an Dashashwamedh Ghat schwingen Priester riesige Messinglampen durch die Dunkelheit, während Tausende von den Steinstufen und von Booten auf dem schwarzen Wasser zusehen. Jeden Morgen, bevor die Sonne das andere Ufer übersteigt, steigen Badende im grauen Zwielicht zum Fluss hinab. Und die Stadt tut, was sie jeden einzelnen Tag seit dreitausend Jahren tut: Sie wendet ihr Gesicht dem Wasser zu, sie betet, sie verbrennt ihre Toten \u2014 und sie lebt.",
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────────────

async function push(item, label) {
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`✅  ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
  } catch (err) {
    console.error(`❌  ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

(async () => {
  await push(es, "Spanish (es)");
  await push(fr, "French (fr)");
  await push(de, "German (de)");
  console.log("\n🎉  All three languages pushed successfully.");
})();
