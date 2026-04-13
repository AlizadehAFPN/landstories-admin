// Push Spanish, French, and German recreations of "The Temple of Bel — From Gods to Dust"
// to the Story DynamoDB table.
//
// Cultural proverbs used:
//   es → "A la tercera va la vencida" (Third time's the charm) — subverted
//   fr → "Jamais deux sans trois" (Never two without three) — subverted
//   de → "Aller guten Dinge sind drei" (All good things come in threes) — subverted

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
  siteId: "palmyra",
  storyId: "temple-of-bel",
  icon: "\u{1F3DB}\u{FE0F}",
  storyCategory: "gods_monsters",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.5505, lng: 38.2684 },
  source:
    "Seyrig, Henri; Amy, Robert; Will, Ernest. Le Temple de Bel a Palmyre, 1968/1975; Teixidor, Javier. The Pantheon of Palmyra, 1979; UNOSAT satellite imagery analysis, August-September 2015; UNESCO World Heritage Site inscription, 1980; Gawlikowski, Micha\u0142, excavation reports on the Temple of Bel; Browning, Iain. Palmyra, 1979",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb: "A la tercera va la vencida" — subverted: three lives, all survived.
//          What killed it wasn't the third — it was something else entirely.
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#temple-of-bel",

  title: "El Templo de Bel \u2014 De los dioses al polvo",

  subtitle:
    "La historia del mayor templo en la encrucijada de civilizaciones: consagrado bajo Tiberio, convertido en iglesia, reconvertido en mezquita y reducido a escombros en segundos en 2015",

  excerpt:
    "Sobrevivi\u00f3 a las guerras civiles de Roma, a la ca\u00edda del Imperio, a la conquista \u00e1rabe, a las Cruzadas, a los mongoles, a los otomanos y a dos guerras mundiales. Hizo falta una ideolog\u00eda del siglo XXI para decidir que las piedras eran el enemigo.",

  moralOrLesson:
    "Un edificio que sobrevive dos mil a\u00f1os de conquistas, conversiones y abandono no es destruido por quienes odian la belleza, sino por quienes temen lo que la belleza revela: que antes de sus certezas existieron otras, y que la capacidad humana de asombro es m\u00e1s antigua y m\u00e1s resistente que cualquier pretensi\u00f3n de verdad absoluta.",

  characters: [
    "Bel (dios supremo de Palmira, equivalente al Marduk babil\u00f3nico)",
    "Yarhibol (dios del sol de la tr\u00edada palmirena)",
    "Aglibol (dios de la luna de la tr\u00edada palmirena)",
    "Los sacerdotes palmirenos y sus cofrad\u00edas de banquetes sagrados",
    "Milicianos del ISIS (destructores, agosto de 2015)",
  ],

  era: "32 d.C. (consagraci\u00f3n) \u2013 30 de agosto de 2015 (destrucci\u00f3n por el ISIS); sobrevivi\u00f3 1.983 a\u00f1os",

  paragraphs: [
    {
      text: "En el a\u00f1o 32 de nuestra era \u2014 la misma d\u00e9cada en que crucificaron a Jes\u00fas a las puertas de Jerusal\u00e9n \u2014 un grupo de sacerdotes termin\u00f3 de levantar en el desierto sirio el templo m\u00e1s ambicioso que su mundo hab\u00eda conocido. Lo dedicaron a Bel, el Se\u00f1or del Universo, un dios supremo que tomaba algo del babil\u00f3nico Marduk y algo del griego Zeus pero que era otra cosa. No reinaba solo. A su derecha, el dios del sol. A su izquierda, el de la luna. Tres dioses, un solo cielo.",
    },
    {
      text: "Desde fuera parec\u00eda un templo griego de manual: columnas doradas, todo muy can\u00f3nico. Pero bastaba cruzar la puerta para que las reglas saltaran por los aires. La entrada estaba en el lado contrario. El techo era plano. Ventanales enormes inundaban el interior de luz, algo que casi ning\u00fan templo antiguo permit\u00eda. Y sobre el santuario principal, una losa de piedra guardaba uno de los primeros zod\u00edacos tallados en un techo de la historia. El edificio entero era Palmira hecha piedra: una ciudad entre Oriente y Occidente que se neg\u00f3 a elegir bando.",
    },
    {
      text: "Aqu\u00ed no se ven\u00eda solo a rezar \u2014 se ven\u00eda a comer. El patio del templo estaba rodeado de comedores donde cientos de personas se sentaban a banquetes sagrados. Cordero, cabra, hasta camello. El vino pasaba de mano en mano mientras los sacerdotes quemaban incienso. Los ricos pagaban las fiestas y grababan sus nombres en las paredes para que nadie los olvidara. Miles de peque\u00f1as fichas de barro \u2014 b\u00e1sicamente entradas \u2014 han aparecido entre las ruinas. Cada una estuvo en la mano de alguien que caminaba hacia el olor de carne asada, a punto de sentarse a la mesa con sus dioses.",
    },
    {
      text: "Dicen que a la tercera va la vencida. El templo tuvo tres vidas y las sobrevivi\u00f3 todas. Cuando Roma se hizo cristiana, lo convirtieron en iglesia \u2014 y eso lo salv\u00f3. Cuando los \u00e1rabes conquistaron Siria, la iglesia pas\u00f3 a ser mezquita \u2014 y eso lo salv\u00f3 de nuevo. Un pueblo entero creci\u00f3 dentro de sus muros antiguos. A principios del siglo XXI era uno de los templos mejor conservados del planeta. La UNESCO lo declar\u00f3 el monumento m\u00e1s importante de Palmira. Hab\u00eda enterrado al Imperio Romano, a las Cruzadas, a los mongoles y a dos guerras mundiales. La tercera no fue la vencida.",
    },
    {
      text: "El 30 de agosto de 2015 \u2014 doce d\u00edas despu\u00e9s de que el ISIS decapitara a Khaled al-Asaad, el arque\u00f3logo de 83 a\u00f1os que llevaba medio siglo como guardi\u00e1n del templo \u2014 varios hombres llenaron el edificio de explosivos y apretaron el bot\u00f3n. Las im\u00e1genes por sat\u00e9lite confirmaron lo peor: el santuario interior ya no exist\u00eda. El zod\u00edaco tallado cuando el emperador Tiberio a\u00fan viv\u00eda era polvo. Las columnas, los relieves, los dioses de piedra \u2014 todo, borrado. Solo qued\u00f3 en pie el p\u00f3rtico de entrada, solo en medio de los escombros, enmarcando cielo vac\u00edo.",
    },
    {
      text: "Ese p\u00f3rtico se convirti\u00f3 en una de las im\u00e1genes de nuestro siglo: una puerta con nada detr\u00e1s. Un umbral entre el mundo que tuvo el Templo de Bel y el que ya no lo tiene. Las fichas de barro est\u00e1n en museos. Los retratos de los muertos miran desde vitrinas en Par\u00eds y Londres. Pero el lugar donde todo ocurr\u00eda \u2014 donde los sacerdotes quemaban incienso, los mercaderes cenaban con sus dioses y Oriente se encontraba con Occidente en cada columna \u2014 es un campo de escombros en el desierto sirio. Sobrevivi\u00f3 dos mil a\u00f1os de historia. No pudo sobrevivir una tarde de hombres con miedo.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb: "Jamais deux sans trois" — subverted: two conversions survived;
//          the third blow wasn't a conversion. It was an execution.
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#temple-of-bel",

  title: "Le Temple de Bel \u2014 Des dieux \u00e0 la poussi\u00e8re",

  subtitle:
    "L\u2019histoire du plus grand temple au carrefour des civilisations\u00a0: consacr\u00e9 sous Tib\u00e8re, converti en \u00e9glise, transform\u00e9 en mosqu\u00e9e, et r\u00e9duit en poussi\u00e8re en quelques secondes en 2015",

  excerpt:
    "Il a surv\u00e9cu aux guerres civiles de Rome, \u00e0 la chute de l\u2019Empire, \u00e0 la conqu\u00eate arabe, aux Croisades, aux Mongols, aux Ottomans et \u00e0 deux guerres mondiales. Il a fallu une id\u00e9ologie du XXIe si\u00e8cle pour d\u00e9cider que les pierres elles-m\u00eames \u00e9taient l\u2019ennemi.",

  moralOrLesson:
    "Un b\u00e2timent qui survit \u00e0 deux mille ans de conqu\u00eates, de conversions et d\u2019abandon n\u2019est pas d\u00e9truit par ceux qui ha\u00efssent la beaut\u00e9, mais par ceux qui craignent ce que la beaut\u00e9 r\u00e9v\u00e8le\u00a0: qu\u2019avant leurs certitudes, d\u2019autres certitudes ont fleuri, et que la capacit\u00e9 d\u2019\u00e9merveillement de l\u2019humanit\u00e9 est plus ancienne et plus tenace que toute pr\u00e9tention \u00e0 la v\u00e9rit\u00e9.",

  characters: [
    "Bel (divinit\u00e9 supr\u00eame de Palmyre, apparent\u00e9 au Marduk babylonien)",
    "Yarhibol (dieu du soleil de la triade palmyr\u00e9nienne)",
    "Aglibol (dieu de la lune de la triade palmyr\u00e9nienne)",
    "Les pr\u00eatres palmyr\u00e9niens et leurs confr\u00e9ries de banquets sacr\u00e9s",
    "Combattants de Daech (destructeurs, ao\u00fbt 2015)",
  ],

  era: "32 apr. J.-C. (cons\u00e9cration) \u2013 30 ao\u00fbt 2015 (destruction par Daech)\u00a0; a surv\u00e9cu 1\u00a0983 ans",

  paragraphs: [
    {
      text: "En l\u2019an 32 de notre \u00e8re \u2014 la m\u00eame d\u00e9cennie que la crucifixion de J\u00e9sus aux portes de J\u00e9rusalem \u2014 des pr\u00eatres achev\u00e8rent dans le d\u00e9sert syrien le temple le plus ambitieux que leur monde ait jamais connu. Ils le d\u00e9di\u00e8rent \u00e0 Bel, le Ma\u00eetre de l\u2019Univers, un dieu supr\u00eame qui empruntait \u00e0 Marduk de Babylone et au Zeus des Grecs sans \u00eatre ni l\u2019un ni l\u2019autre. Il ne r\u00e9gnait pas seul. Le dieu du soleil se tenait \u00e0 sa droite, celui de la lune \u00e0 sa gauche. Trois dieux, un seul ciel.",
    },
    {
      text: "De l\u2019ext\u00e9rieur, il avait tout du temple grec classique \u2014 hautes colonnes dor\u00e9es, le grand jeu. Mais d\u00e8s qu\u2019on franchissait le seuil, toutes les r\u00e8gles volaient en \u00e9clats. L\u2019entr\u00e9e \u00e9tait du mauvais c\u00f4t\u00e9. Le plafond \u00e9tait plat. De grandes fen\u00eatres inondaient l\u2019int\u00e9rieur de lumi\u00e8re, ce qu\u2019aucun temple antique ne se permettait. Et au-dessus du sanctuaire principal, un immense bloc de pierre portait l\u2019un des tout premiers zodiaques jamais sculpt\u00e9s sur un plafond. Le b\u00e2timent entier \u00e9tait Palmyre faite pierre \u2014 une cit\u00e9 entre Orient et Occident qui refusait de choisir son camp.",
    },
    {
      text: "On ne venait pas ici seulement prier \u2014 on venait festoyer. La cour du temple \u00e9tait bord\u00e9e de salles o\u00f9 des centaines de convives partageaient des repas sacr\u00e9s. Agneau, ch\u00e8vre, m\u00eame du chameau. Le vin circulait de main en main tandis que les pr\u00eatres br\u00fblaient de l\u2019encens. Les riches finan\u00e7aient ces banquets et gravaient leurs noms dans la pierre pour que nul ne les oublie. Des milliers de jetons d\u2019argile \u2014 des billets d\u2019entr\u00e9e, en somme \u2014 ont \u00e9t\u00e9 retrouv\u00e9s dans les ruines. Chacun a \u00e9t\u00e9 tenu par quelqu\u2019un qui marchait vers l\u2019odeur de viande grill\u00e9e, pr\u00eat \u00e0 s\u2019attabler avec ses dieux.",
    },
    {
      text: "Jamais deux sans trois, dit le proverbe. Le temple a v\u00e9cu deux vies et les a travers\u00e9es debout. Quand Rome devint chr\u00e9tienne, on en fit une \u00e9glise \u2014 \u00e7a le sauva. Quand les Arabes prirent la Syrie, l\u2019\u00e9glise devint mosqu\u00e9e \u2014 \u00e7a le sauva encore. Un village poussa dans ses murs. Au d\u00e9but du XXIe si\u00e8cle, c\u2019\u00e9tait l\u2019un des temples les mieux conserv\u00e9s au monde. L\u2019UNESCO le d\u00e9clara monument le plus important de Palmyre. Il avait enterr\u00e9 l\u2019Empire romain, les Croisades, les Mongols, deux guerres mondiales. Le troisi\u00e8me coup, quand il vint, ne fut pas une conversion. Ce fut une ex\u00e9cution.",
    },
    {
      text: "Le 30 ao\u00fbt 2015 \u2014 douze jours apr\u00e8s que Daech eut d\u00e9capit\u00e9 Khaled al-Asaad, l\u2019arch\u00e9ologue de 83 ans qui veillait sur le temple depuis un demi-si\u00e8cle \u2014 des hommes bourr\u00e8rent le b\u00e2timent d\u2019explosifs et appuy\u00e8rent sur le bouton. Les images satellite confirm\u00e8rent le pire\u00a0: le sanctuaire int\u00e9rieur n\u2019existait plus. Le zodiaque sculpt\u00e9 du vivant de l\u2019empereur Tib\u00e8re \u00e9tait poussi\u00e8re. Les colonnes, les reliefs, les dieux de pierre \u2014 tout, pulv\u00e9ris\u00e9. Une seule chose tenait encore debout\u00a0: le portique d\u2019entr\u00e9e, seul au milieu des d\u00e9combres, encadrant un rectangle de ciel vide.",
    },
    {
      text: "Ce portique est devenu une image de notre si\u00e8cle\u00a0: une porte qui ne donne sur rien. Un seuil entre le monde qui avait le Temple de Bel et celui qui ne l\u2019a plus. Les jetons d\u2019argile dorment dans des mus\u00e9es. Les portraits des morts nous fixent depuis des vitrines \u00e0 Paris et Londres. Mais le lieu o\u00f9 tout convergeait \u2014 pr\u00eatres, encens, marchands festoyant avec leurs dieux, Orient croisant l\u2019Occident dans chaque colonne \u2014 n\u2019est plus qu\u2019un champ de gravats dans le d\u00e9sert syrien. Il a tenu deux mille ans. Il n\u2019a pas tenu un apr\u00e8s-midi face \u00e0 des hommes qui avaient peur de ce qu\u2019il disait.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb: "Aller guten Dinge sind drei" — subverted: three lives, all survived.
//          What came next wasn't a fourth life. It was the end.
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#temple-of-bel",

  title: "Der Tempel des Bel \u2014 Von G\u00f6ttern zu Staub",

  subtitle:
    "Die Geschichte des gr\u00f6\u00dften Tempels am Scheideweg der Zivilisationen \u2014 geweiht unter Tiberius, zur Kirche umgewandelt, zur Moschee umfunktioniert und 2015 in Sekunden gesprengt",

  excerpt:
    "Er \u00fcberlebte Roms B\u00fcrgerkriege, den Untergang des Imperiums, die arabische Eroberung, die Kreuzz\u00fcge, die Mongolen, die Osmanen und zwei Weltkriege. Es brauchte eine Ideologie des 21. Jahrhunderts, um zu entscheiden, dass die Steine selbst der Feind waren.",

  moralOrLesson:
    "Ein Bauwerk, das zweitausend Jahre Eroberungen, Bekehrungen und Verfall \u00fcbersteht, wird nicht von denen zerst\u00f6rt, die Sch\u00f6nheit hassen, sondern von denen, die f\u00fcrchten, was Sch\u00f6nheit offenbart: dass vor ihren Gewissheiten andere Gewissheiten bl\u00fchten und dass die menschliche F\u00e4higkeit zum Staunen \u00e4lter und best\u00e4ndiger ist als jeder Anspruch auf alleinige Wahrheit.",

  characters: [
    "Bel (oberster Gott Palmyras, verwandt mit dem babylonischen Marduk)",
    "Yarhibol (Sonnengott der palmyrenischen Trias)",
    "Aglibol (Mondgott der palmyrenischen Trias)",
    "Die palmyrenischen Priester und ihre heiligen Bankettgemeinschaften",
    "IS-K\u00e4mpfer (Zerst\u00f6rer, August 2015)",
  ],

  era: "32 n. Chr. (Weihung) \u2013 30. August 2015 (Zerst\u00f6rung durch den IS); \u00fcberdauerte 1.983 Jahre",

  paragraphs: [
    {
      text: "Im Jahr 32 unserer Zeitrechnung \u2014 im selben Jahrzehnt, in dem Jesus vor den Toren Jerusalems gekreuzigt wurde \u2014 vollendeten Priester in der syrischen W\u00fcstenstadt Palmyra den gewaltigsten Tempel, den ihre Welt je gesehen hatte. Sie weihten ihn Bel, dem Herrn des Universums, einem h\u00f6chsten Gott, der sich bei Babylons Marduk und dem griechischen Zeus bediente, aber etwas ganz Eigenes war. Er herrschte nicht allein. Der Sonnengott stand zu seiner Rechten, der Mondgott zu seiner Linken. Drei G\u00f6tter, ein Himmel.",
    },
    {
      text: "Von au\u00dfen sah er aus wie ein griechischer Tempel aus dem Lehrbuch \u2014 hohe goldene S\u00e4ulen, das volle Programm. Aber wer durch das Tor trat, betrat eine andere Welt. Der Eingang lag auf der falschen Seite. Die Decke war flach. Gro\u00dfe Fenster fluteten den Raum mit Licht, was sich fast kein antiker Tempel erlaubte. Und \u00fcber dem Hauptheiligtum trug eine gewaltige Steinplatte einen der fr\u00fchesten Tierkreise, die je in eine Decke gemei\u00dfelt wurden. Das ganze Geb\u00e4ude war Palmyra in Stein \u2014 eine Stadt zwischen Orient und Okzident, die sich weigerte, eine Seite zu w\u00e4hlen.",
    },
    {
      text: "Hier wurde nicht nur gebetet \u2014 hier wurde gefeiert. Der riesige Tempelhof war ges\u00e4umt von Speises\u00e4len, in denen Hunderte zu heiligen Banketten zusammenkamen. Lamm, Ziege, sogar Kamel. Wein ging von Hand zu Hand, w\u00e4hrend Priester Weihrauch verbrannten. Reiche B\u00fcrger finanzierten diese Festm\u00e4hler und mei\u00dfelten ihre Namen in die W\u00e4nde, damit niemand sie verga\u00df. Tausende kleiner Tonmarken \u2014 im Grunde Eintrittskarten \u2014 wurden in den Ruinen gefunden. Jede einzelne lag einmal in der Hand von jemandem, der dem Duft von gegrilltem Fleisch folgte, um sich an den Tisch seiner G\u00f6tter zu setzen.",
    },
    {
      text: "Aller guten Dinge sind drei, sagt man. Der Tempel hatte drei Leben \u2014 und \u00fcberstand sie alle. Als Rom christlich wurde, machte man ihn zur Kirche \u2014 das rettete ihn. Als die Araber Syrien eroberten, wurde die Kirche zur Moschee \u2014 das rettete ihn wieder. Ein ganzes Dorf wuchs in seinen Mauern. Anfang des 21. Jahrhunderts war er einer der besterhaltenen antiken Tempel der Welt. Die UNESCO nannte ihn das wichtigste Bauwerk Palmyras. Er hatte das R\u00f6mische Reich \u00fcberlebt, die Kreuzz\u00fcge, die Mongolen, zwei Weltkriege. Drei Leben, alle \u00fcberstanden. Was dann kam, war kein viertes Leben. Es war das Ende.",
    },
    {
      text: "Am 30. August 2015 \u2014 zw\u00f6lf Tage nachdem der IS Khaled al-Asaad enthauptet hatte, den 83-j\u00e4hrigen Arch\u00e4ologen, der ein halbes Jahrhundert \u00fcber den Tempel gewacht hatte \u2014 f\u00fcllten M\u00e4nner das Geb\u00e4ude mit Sprengstoff und z\u00fcndeten ihn. Satellitenbilder best\u00e4tigten, was die Welt bef\u00fcrchtete: Das innere Heiligtum war ausgel\u00f6scht. Der Tierkreis, gemei\u00dfelt als Kaiser Tiberius noch lebte, war Staub. Die S\u00e4ulen, die Reliefs, die steinernen G\u00f6tter \u2014 alles weg. Nur eines stand noch: das Eingangsportal, allein zwischen den Tr\u00fcmmern. Es rahmte nichts als leeren Himmel.",
    },
    {
      text: "Dieses Portal wurde zum Bild unserer Zeit: ein Eingang, hinter dem nichts mehr ist. Eine Schwelle zwischen der Welt, die den Tempel des Bel hatte, und der, die ihn nicht mehr hat. Die Tonmarken liegen in Museen. Die Portr\u00e4ts der Toten starren aus Vitrinen in Paris und London. Aber der Ort, wo alles zusammenkam \u2014 Priester, Weihrauch, H\u00e4ndler an der Tafel ihrer G\u00f6tter, Orient und Okzident in jeder S\u00e4ule \u2014 ist ein Tr\u00fcmmerfeld in der syrischen W\u00fcste. Zweitausend Jahre hat er \u00fcberdauert. Einen Nachmittag nicht \u2014 mit M\u00e4nnern, die Angst hatten vor dem, was er erz\u00e4hlte.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23f3 Pushing ${label} ...`);

  // JSON validation: round-trip check
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Verify no paragraph exceeds 600 chars (500 + 20% tolerance)
  for (let i = 0; i < record.paragraphs.length; i++) {
    const chars = record.paragraphs[i].text.length;
    if (chars > 600) {
      throw new Error(
        `${label} paragraph ${i + 1} exceeds 600 chars: ${chars}`
      );
    }
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `\u26a0\ufe0f  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`\u2705 ${label} overwritten successfully.`);
    } else {
      console.error(`\u274c Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("=== Pushing Temple of Bel (es, fr, de) to DynamoDB ===");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [es, fr, de]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      const chars = p.text.length;
      totalChars += chars;
      if (chars > 500) {
        console.warn(
          `\u26a0\ufe0f  ${rec.lang} paragraph ${i + 1}: ${chars} chars (over 500 soft limit)`
        );
      }
    }
    console.log(
      `\n${rec.lang}: ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(es);
  await pushStory(fr);
  await pushStory(de);

  console.log(
    "\n=== All three versions pushed successfully ==="
  );
}

main().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
