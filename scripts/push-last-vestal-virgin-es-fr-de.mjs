import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ─────────────────────────────────
const shared = {
  siteId: "roman-forum-palatine",
  storyId: "last-vestal-virgin",
  icon: "\u{1F525}",
  tier: "A",
  source: "Plutarch, Life of Numa; Livy, Ab Urbe Condita; Aulus Gellius, Noctes Atticae; Ammianus Marcellinus",
  characters: [
    "The Vestal Virgins",
    "King Numa Pompilius",
    "Emperor Theodosius I",
    "Coelia Concordia (last Chief Vestal)",
    "Emperor Domitian",
  ],
  era: "7th century BC - 394 AD",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 41.8917, lng: 12.487 },
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "lost_found",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH — "Dicen que Dios aprieta pero no ahorca. Roma fue más creativa."
// ═══════════════════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#last-vestal-virgin",
  title: "La última vestal",
  subtitle: "Mil años de fuego sagrado que un emperador apagó de un plumazo",
  excerpt:
    "Durante más de mil años, seis mujeres custodiaron la llama sagrada de Roma. Eran intocables, poderosas, veneradas \u2014 y cualquiera de ellas podía acabar enterrada viva por romper un solo voto.",
  moralOrLesson:
    "Hasta la tradición más sagrada puede morir con una firma \u2014 y los mayores privilegios siempre cobran el precio más alto.",
  paragraphs: [
    {
      text: "Imagina una oferta de empleo en la antigua Roma: seis mujeres, elegidas de niñas, con una sola misión \u2014 mantener viva una llama. Si el fuego se apagaba, Roma caía. Así de simple, así de brutal. Durante más de mil años, del 700 a.C. al 394 d.C., las Vestales custodiaron el fuego sagrado de Vesta, diosa del hogar, en un templo en el corazón del Foro Romano. Eran las mujeres más poderosas del mundo antiguo. Y el precio de ese poder era su cuerpo, su libertad y, a veces, su vida.",
    },
    {
      text: "Las elegían entre los seis y los diez años, siempre de las familias más influyentes de Roma. Una vez seleccionada, la Vestal servía treinta años: diez aprendiendo los rituales, diez ejecutándolos y diez formando a la siguiente generación. Todo ese tiempo, tenía que mantenerse virgen. A cambio, recibía lo que ninguna otra romana tenía: poder de verdad. Podían tener propiedades, hacer testamento y declarar en juicio sin juramento. Si un condenado a muerte se cruzaba con una Vestal camino a su ejecución, quedaba libre en el acto.",
    },
    {
      text: "Por las calles de Roma, hasta los magistrados más importantes se apartaban al paso de una Vestal. Viajaban en un carruaje especial, un privilegio que normalmente solo tenía la emperatriz. En el Coliseo, se sentaban en primera fila, al lado del mismísimo emperador. En una sociedad que trataba a casi todas las mujeres como propiedad, las Vestales eran intocables. Y esto no es una metáfora: agredir a una se pagaba con la vida.",
    },
    {
      text: "Pero ese poder venía con una trampa aterradora. Dicen que Dios aprieta pero no ahorca. Roma fue más creativa. La ley prohibía derramar la sangre de una Vestal \u2014 eso ofendería a los dioses. Así que encontraron otra vía. A la acusada la vestían de luto, la paseaban por el Foro que una vez dominó y la llevaban al Campus Sceleratus, el \u00abCampo de la Maldad\u00bb. Allí bajaba a un cuarto diminuto con una lámpara, pan y agua. Sellaban la entrada con tierra. Roma no las mataba. Solo las... guardaba.",
    },
    {
      text: "Al menos diez Vestales fueron enterradas vivas a lo largo de los siglos. Y los cargos no siempre eran reales. Cuando Roma perdía batallas o sufría catástrofes, los gobernantes necesitaban una cabeza de turco, y acusar a una Vestal de romper su voto era la forma más fácil de convertir el pánico en sacrificio. Plutarco escribió sobre estos juicios sin ocultar sus dudas. Plinio el Joven describió un entierro ordenado por Domiciano \u2014 un emperador famoso por su crueldad \u2014 con un asco que apenas se molestó en disimular.",
    },
    {
      text: "Las Vestales no terminaron por un escándalo. Terminaron porque el mundo cambió a su alrededor. En el 382 d.C., el emperador Graciano \u2014 ya cristiano en un imperio cristiano \u2014 les cortó la financiación. Doce años después, Teodosio I cerró la orden y mandó apagar el fuego sagrado. Más de mil años ardiendo sin interrupción, y se acabó así, de un plumazo. Una de las tradiciones más largas de la historia, liquidada con la firma de un emperador.",
    },
    {
      text: "La última Vestal Mayor fue probablemente una mujer llamada Coelia Concordia. No sabemos si luchó contra la decisión o se fue en silencio. Pero lo que dejó atrás todavía habla. La Casa de las Vestales sigue en pie en el Foro Romano, con un patio lleno de pedestales que un día sostuvieron las estatuas de cada Vestal Mayor. Algunos están vacíos, destrozados por el tiempo o a propósito. Otros tienen los nombres raspados, borrados por la misma fe que las reemplazó. Mil años de devoción, reducidos a piedra muda y silencio.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH — "Tout vient à point à qui sait attendre. Les Vestales ont attendu
//           mille ans. Ce qui est venu, c'est un décret impérial et le silence."
// ═══════════════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#last-vestal-virgin",
  title: "La dernière vestale",
  subtitle: "Mille ans de flamme sacrée, éteinte d'un trait de plume",
  excerpt:
    "Pendant plus de mille ans, six femmes ont veillé sur la flamme sacrée de Rome. Intouchables, puissantes, vénérées \u2014 et chacune d'elles pouvait être enterrée vivante pour avoir trahi un seul v\u0153u.",
  moralOrLesson:
    "Même une tradition millénaire peut mourir d'un trait de plume \u2014 et les plus grands privilèges exigent toujours le prix le plus lourd.",
  paragraphs: [
    {
      text: "Imaginez une offre d'emploi dans la Rome antique\u00a0: six femmes, choisies enfants, avec une seule mission \u2014 garder une flamme allumée. Si le feu s'éteignait, Rome tombait. Aussi simple, aussi brutal que ça. Pendant plus de mille ans, de 700 avant J.-C. à 394 après J.-C., les Vestales ont veillé sur le feu sacré de Vesta, déesse du foyer, dans un temple au c\u0153ur du Forum romain. Elles étaient les femmes les plus puissantes du monde antique. Et le prix de ce pouvoir, c'était leur corps, leur liberté et parfois leur vie.",
    },
    {
      text: "On les choisissait entre six et dix ans, toujours dans les familles les plus influentes de Rome. Une fois sélectionnée, la Vestale servait trente ans\u00a0: dix à apprendre les rituels, dix à les accomplir, dix à former la génération suivante. Tout ce temps, elle devait rester vierge. En échange, elle obtenait ce qu'aucune autre Romaine n'avait\u00a0: un vrai pouvoir. Les Vestales pouvaient posséder des biens, rédiger un testament et témoigner en justice sans prêter serment. Si un condamné à mort croisait une Vestale en route vers son exécution, il était libéré sur-le-champ.",
    },
    {
      text: "Dans les rues de Rome, même les plus hauts magistrats s'écartaient au passage d'une Vestale. Elles circulaient dans un char spécial \u2014 un privilège normalement réservé à l'impératrice. Au Colisée, elles étaient au premier rang, juste à côté de l'empereur. Dans une société qui traitait la plupart des femmes comme des biens, les Vestales étaient intouchables. Et ce n'est pas une façon de parler\u00a0: s'en prendre à l'une d'elles était puni de mort.",
    },
    {
      text: "Mais ce pouvoir avait un prix terrifiant. Une Vestale qui brisait son v\u0153u subissait un châtiment pensé pour hanter les mémoires. La loi romaine interdisait de verser le sang d'une Vestale \u2014 les dieux ne l'auraient pas toléré. Alors Rome a trouvé une faille. L'accusée était vêtue de noir, promenée à travers le Forum qu'elle avait dominé, puis conduite au Campus Sceleratus \u2014 le \u00ab\u00a0Champ du Crime\u00a0\u00bb. Elle descendait dans une pièce minuscule avec une lampe, du pain et de l'eau. L'entrée était scellée avec de la terre. Rome ne l'avait pas tuée. Elle l'avait juste... rangée.",
    },
    {
      text: "Au moins dix Vestales ont été enterrées vivantes au fil des siècles. Et les accusations n'étaient pas toujours fondées. Quand Rome perdait des batailles ou essuyait des catastrophes, il fallait un coupable \u2014 et accuser une Vestale d'avoir trahi son v\u0153u, c'était le moyen le plus simple de transformer la panique en sacrifice. Plutarque a écrit sur ces procès avec un scepticisme affiché. Pline le Jeune a décrit un enterrement ordonné par Domitien \u2014 un empereur réputé pour sa cruauté \u2014 avec un dégoût qu'il a à peine cherché à dissimuler.",
    },
    {
      text: "Les Vestales n'ont pas disparu dans le scandale. Elles ont disparu parce que le monde a changé autour d'elles. En 382, l'empereur Gratien \u2014 désormais chrétien à la tête d'un empire chrétien \u2014 a coupé les financements de l'ordre. Douze ans plus tard, Théodose I\u1d49\u02b3 l'a dissous et a ordonné d'éteindre la flamme sacrée. On dit que tout vient à point à qui sait attendre. Les Vestales ont attendu mille ans. Ce qui est venu, c'est un décret impérial et le silence. Une des plus longues traditions de l'humanité, rayée d'un trait de plume.",
    },
    {
      text: "La dernière Grande Vestale était probablement une femme du nom de Coelia Concordia. On ne sait pas si elle s'est battue ou si elle est partie sans un mot. Mais ce qu'elle a laissé parle encore. La Maison des Vestales se dresse toujours dans le Forum romain, sa cour bordée de piédestaux qui portaient les statues de chaque Grande Vestale. Certains sont vides \u2014 brisés par le temps ou de main d'homme. D'autres portent des noms grattés, effacés par la foi même qui les a remplacées. Mille ans de dévotion, réduits à de la pierre muette et du silence.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN — "Der Krug geht zum Brunnen, bis er bricht. Dieser Krug ging
//           tausend Jahre zum Brunnen. Am Ende brauchte es keinen Bruch —
//           nur eine Unterschrift."
// ═══════════════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#last-vestal-virgin",
  title: "Die letzte Vestalin",
  subtitle: "Tausend Jahre heiliges Feuer, gelöscht mit einer Unterschrift",
  excerpt:
    "Über tausend Jahre lang hüteten sechs Frauen Roms heilige Flamme. Sie waren unantastbar, mächtig, verehrt \u2014 und jede von ihnen konnte bei lebendigem Leib begraben werden, wenn sie ein einziges Gelübde brach.",
  moralOrLesson:
    "Selbst eine tausendjährige Tradition kann mit einer einzigen Unterschrift enden \u2014 und die größten Privilegien fordern immer den höchsten Preis.",
  paragraphs: [
    {
      text: "Eine Stellenanzeige aus dem alten Rom: sechs Frauen, als Mädchen ausgewählt, mit einer einzigen Aufgabe \u2014 eine Flamme am Leben zu halten. Ging das Feuer aus, fiel Rom. So einfach, so brutal. Über tausend Jahre lang, von etwa 700 v.\u00a0Chr. bis 394 n.\u00a0Chr., hüteten die Vestalinnen das heilige Feuer der Vesta, Göttin des Herdes, in einem Tempel mitten im Forum Romanum. Sie waren die mächtigsten Frauen der antiken Welt. Und der Preis für diese Macht war ihr Körper, ihre Freiheit und manchmal ihr Leben.",
    },
    {
      text: "Ausgewählt wurden sie zwischen sechs und zehn Jahren, immer aus den einflussreichsten Familien Roms. Einmal bestimmt, diente eine Vestalin dreißig Jahre: zehn zum Lernen der Rituale, zehn zum Ausführen, zehn zum Weitergeben an die nächste Generation. Die ganze Zeit über musste sie Jungfrau bleiben. Dafür bekam sie etwas, das keine andere Römerin hatte: echte Macht. Vestalinnen durften Eigentum besitzen, ein Testament verfassen und vor Gericht ohne Eid aussagen. Wenn ein Verurteilter auf dem Weg zur Hinrichtung einer Vestalin begegnete, war er auf der Stelle frei.",
    },
    {
      text: "Auf Roms Straßen traten selbst die höchsten Beamten zur Seite, wenn eine Vestalin vorbeikam. Sie fuhren in einem besonderen Wagen \u2014 ein Privileg, das sonst nur der Kaiserin zustand. Im Kolosseum saßen sie in der ersten Reihe, direkt neben dem Kaiser. In einer Gesellschaft, die die meisten Frauen wie Besitz behandelte, waren die Vestalinnen unantastbar. Und das ist nicht bildlich gemeint: Wer einer von ihnen Gewalt antat, bezahlte mit dem Leben.",
    },
    {
      text: "Aber diese Macht hatte einen furchtbaren Haken. Eine Vestalin, die ihr Gelübde brach, traf eine Strafe, die sich ins Gedächtnis brennt. Römisches Recht verbot es, das Blut einer Vestalin zu vergießen \u2014 das hätte die Götter erzürnt. Also fand Rom ein Schlupfloch. Die Angeklagte wurde in Trauerkleidung gesteckt, durch das Forum geführt, das sie einst beherrscht hatte, und zum Campus Sceleratus gebracht \u2014 dem \u201eFeld der Schande\u201c. Dort stieg sie in einen winzigen Raum mit einer Öllampe, Brot und Wasser. Der Eingang wurde mit Erde versiegelt. Rom hatte sie nicht getötet. Rom hatte sie nur... weggeräumt.",
    },
    {
      text: "Mindestens zehn Vestalinnen wurden im Laufe der Jahrhunderte lebendig begraben. Und die Anklagen waren nicht immer echt. Wenn Rom Schlachten verlor oder Katastrophen erlitt, brauchten die Machthaber einen Sündenbock \u2014 und einer Vestalin vorzuwerfen, sie habe ihr Gelübde gebrochen, war der einfachste Weg, Panik in ein Opfer zu verwandeln. Plutarch schrieb über diese Prozesse mit offenem Zweifel. Plinius der Jüngere beschrieb eine Bestattung unter Kaiser Domitian \u2014 berüchtigt für seine Grausamkeit \u2014 mit kaum verhohlener Abscheu.",
    },
    {
      text: "Die Vestalinnen endeten nicht im Skandal. Sie endeten, weil sich die Welt um sie herum veränderte. 382 n.\u00a0Chr. strich Kaiser Gratian \u2014 inzwischen ein christlicher Herrscher eines christlichen Reiches \u2014 dem Orden die Mittel. Zwölf Jahre später löste Theodosius I. ihn auf und befahl, das heilige Feuer zu löschen. Man sagt, der Krug geht zum Brunnen, bis er bricht. Dieser Krug ging tausend Jahre zum Brunnen. Am Ende brauchte es keinen Bruch \u2014 nur eine Unterschrift.",
    },
    {
      text: "Die letzte Obervestalin war vermutlich eine Frau namens Coelia Concordia. Ob sie gegen die Entscheidung gekämpft oder sich wortlos gefügt hat, wissen wir nicht. Aber was sie hinterließ, spricht bis heute. Das Haus der Vestalinnen steht noch immer im Forum Romanum, sein Innenhof gesäumt von Sockeln, die einst die Statuen jeder Obervestalin trugen. Manche sind leer \u2014 vom Zahn der Zeit zerfressen oder mutwillig zerstört. Auf anderen wurden die Namen abgekratzt, ausgelöscht von genau dem Glauben, der sie ersetzte. Tausend Jahre Hingabe, reduziert auf stummen Stein und Stille.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════════════
const stories = [
  { data: es, label: "SPANISH" },
  { data: fr, label: "FRENCH" },
  { data: de, label: "GERMAN" },
];

for (const { data, label } of stories) {
  console.log(`\n────────────────────────────────────────`);
  console.log(`Pushing ${label} (${data.langStoryId})...`);

  // Validate JSON structure before push
  const jsonStr = JSON.stringify(data);
  try {
    JSON.parse(jsonStr);
    console.log(`  JSON valid (${jsonStr.length} bytes)`);
  } catch (e) {
    console.error(`  JSON INVALID: ${e.message}`);
    process.exit(1);
  }

  // Validate paragraph count & lengths
  console.log(`  Paragraphs: ${data.paragraphs.length}`);
  let totalChars = 0;
  for (let i = 0; i < data.paragraphs.length; i++) {
    const len = data.paragraphs[i].text.length;
    const words = data.paragraphs[i].text.split(/\s+/).length;
    totalChars += len;
    console.log(`    P${i + 1}: ${len} chars, ~${words} words`);
    if (len > 500) {
      console.warn(`    ⚠ Paragraph ${i + 1} exceeds 500 chars (${len})`);
    }
    if (words > 100) {
      console.warn(`    ⚠ Paragraph ${i + 1} exceeds 100 words (${words})`);
    }
  }
  console.log(`  Total story chars: ${totalChars}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
        ConditionExpression:
          "attribute_not_exists(siteId) OR langStoryId = :lsi",
        ExpressionAttributeValues: { ":lsi": data.langStoryId },
      })
    );
    console.log(`  ✅ ${label} pushed successfully.`);
  } catch (err) {
    console.error(`  ❌ ${label} FAILED: ${err.message}`);
    process.exit(1);
  }
}

console.log("\n════════════════════════════════════════");
console.log("All three languages pushed successfully.");
console.log("════════════════════════════════════════\n");
