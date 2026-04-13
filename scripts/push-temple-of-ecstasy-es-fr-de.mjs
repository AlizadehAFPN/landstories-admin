// Push Spanish, French, and German recreations of "The Temple of Ecstasy"
// to the Story DynamoDB table.
//
// Cultural proverbs used:
//   es → "A la tercera va la vencida" — subverted: the three sacred substances
//        don't conquer obstacles; they conquer YOU.
//   fr → "Jamais deux sans trois" — subverted: the third substance doesn't complete
//        a set; it shatters the self.
//   de → "Aller guten Dinge sind drei" — subverted: these three weren't meant to
//        strengthen you, but to destroy you.

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
  siteId: "baalbek",
  storyId: "temple-of-ecstasy",
  icon: "🍇",
  storyCategory: "gods_monsters",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 8,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.0069, lng: 36.2039 },
  source:
    "Macrobius, Saturnalia I.23; Euripides, The Bacchae; Ovid, Metamorphoses; Villa of the Mysteries, Pompeii (fresco cycle); Puchstein, Otto & Wiegand, Theodor. Baalbek: Ergebnisse der Ausgrabungen, 1921-1925; Halliburton, Richard. Complete Book of Marvels; Hajjar, Youssef. La triade d'Héliopolis-Baalbek, 1977; Pococke, Richard. A Description of the East, 1745",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb: "A la tercera va la vencida" — subverted: Wine, grain, poppies —
//          the third time conquers, but what's conquered is you yourself.
// Register: Skilled modern storyteller. Think popular history podcast in Spain.
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#temple-of-ecstasy",

  title: "El Templo del Éxtasis",

  subtitle:
    "En el templo romano mejor conservado del mundo, los iniciados morían y renacían en rituales que fundían a Baco con el Adonis fenicio",

  excerpt:
    "Los lugareños lo llamaban la Corte de la Felicidad. Tras la puerta más ornamentada de la antigüedad, los iniciados pasaban por una muerte ritual — y volvían a nacer.",

  moralOrLesson:
    "Todas las civilizaciones han buscado lo mismo: una puerta entre la muerte y la vida, una forma de morir y volver, de perderse a uno mismo y encontrarse transformado. Las ruinas del Templo de Baco son la prueba de que, durante un breve momento de la historia, en un valle del Líbano, miles de personas creyeron haberla encontrado.",

  characters: [
    "Baco/Dioniso (el dios que muere y renace)",
    "Adonis (el joven fenicio cuya sangre tiñó el río de rojo)",
    "Las ménades (seguidoras extáticas del dios del vino)",
    "Otto Puchstein (arqueólogo alemán, 1898-1905)",
    "Richard Halliburton (escritor y aventurero estadounidense)",
  ],

  era: "c. 150 d.C. (construcción bajo Antonino Pío); era fenicia (orígenes del culto a Adonis)",

  paragraphs: [
    {
      text: "Hay un templo en Líbano más grande que el Partenón. Treinta y un metros de alto, columnas que casi duplican las de Atenas, y es el templo romano mejor conservado que existe. Casi nadie lo conoce. El Templo de Baco en Baalbek se levantó hacia el año 150 d.C., y durante siglos los lugareños lo llamaron «la Corte de la Felicidad». El aventurero Richard Halliburton, que llegó hasta allí en los años treinta, adoptó ese nombre. Pero felicidad no describe ni de lejos lo que pasaba dentro.",
    },
    {
      text: "La puerta lo delata todo. Trece metros de alto, la entrada más ornamentada de toda la arquitectura antigua. Cada centímetro está tallado con parras, mujeres danzando con el pelo suelto — las ménades, seguidoras extáticas del dios del vino — y entre las hojas, si miras bien, aparecen amapolas. Vino. Grano. Amapolas. Eran las tres sustancias sagradas de los cultos mistéricos, talladas en la puerta como un aviso: lo que pasa dentro de este edificio te va a cambiar.",
    },
    {
      text: "Este era un templo de Baco, el nombre que Roma le dio a Dioniso: dios del vino, de la locura y del renacimiento. Aquí no se rezaba. Aquí se vivía una iniciación. Los candidatos ayunaban diez días y después entraban de noche, vestidos de púrpura y coronados de hiedra. Un largo pasillo de columnas talladas los guiaba hasta el adytum, el santuario más profundo, elevado sobre el suelo, reservado solo a los iniciados. Bajo sus pies, una cámara oculta donde los sacerdotes susurraban profecías.",
    },
    {
      text: "El momento culminante era una muerte. No en un sentido cómodo ni simbólico. El iniciado se convertía en Baco, el dios que según el mito fue despedazado por los Titanes siendo niño, devorado, y devuelto a la vida por Zeus. Sacerdotes con máscaras de Titán rodeaban al candidato arrodillado. Las pinturas de la Villa de los Misterios de Pompeya muestran una figura alada azotando una espalda desnuda. No era castigo. Era la destrucción del yo anterior — la muerte que tiene que llegar antes del renacimiento.",
    },
    {
      text: "Después venía el vino — la sangre del dios. El vino antiguo era más suave que el de hoy, así que seguramente iba mezclado con hierbas, miel y opio de las amapolas de la puerta. El iniciado bebía y el yo se disolvía. Vino, grano, amapolas: a la tercera va la vencida — y lo vencido era uno mismo. Llegaba entonces la resurrección. Roto y llorando, el candidato era «devuelto a la vida entre gran alegría». Los griegos lo llamaban ekstasis — «estar fuera de uno mismo». De ahí viene éxtasis.",
    },
    {
      text: "Pero el dios de aquí no era del todo griego ni del todo romano. Mucho antes de Roma, los fenicios ya adoraban en este mismo suelo a un dios que moría y resucitaba: Adonis, de una palabra cananea que significa «señor». Cada primavera, el río cercano se tiñe de rojo por los sedimentos de hierro de las montañas. Los antiguos veían la sangre de su dios. Cuando Roma llegó, superpuso a Baco sobre Adonis — dos dioses que mueren, un solo templo, y una verdad que cada civilización de este valle descubrió por su cuenta: el misterio no es la vida ni la muerte, sino el cruce entre ambas.",
    },
    {
      text: "El templo sigue en pie. Su puerta aún conserva las parras y las amapolas talladas. La cripta sigue bajo el suelo donde los iniciados se arrodillaban, en la misma oscuridad. Nadie ha rezado aquí en dieciséis siglos, pero ha sobrevivido a todos los imperios que lo reclamaron: romano, bizantino, árabe, otomano, francés. A las piedras les dan igual los imperios. Las tallaron manos que creían estar dando forma a una puerta entre mundos. Y las puertas, incluso las abandonadas, conservan la forma de lo que alguna vez pasó por ellas.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb: "Jamais deux sans trois" — subverted: the third of the three sacred
//          substances is the blow that shatters what you thought was yourself.
// Register: Skilled modern storyteller. Think France Inter documentary.
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#temple-of-ecstasy",

  title: "Le Temple de l'Extase",

  subtitle:
    "Dans le temple romain le mieux conservé au monde, des initiés mouraient et renaissaient dans des rites mêlant Bacchus grec et Adonis phénicien",

  excerpt:
    "Les habitants l'appelaient la Cour du Bonheur. Derrière l'entrée la plus ornementée de l'Antiquité, des initiés vivaient une mort rituelle — et renaissaient.",

  moralOrLesson:
    "Toutes les civilisations ont cherché la même chose impossible — un passage entre la mort et la vie, un moyen de mourir et de revenir, de se perdre et de se retrouver transformé. Les ruines du Temple de Bacchus sont la preuve que pendant un bref instant de l'histoire, dans une vallée du Liban, des milliers de personnes ont cru l'avoir trouvé.",

  characters: [
    "Bacchus/Dionysos (le dieu qui meurt et renaît)",
    "Adonis (le jeune Phénicien dont le sang rougit la rivière)",
    "Les ménades (adeptes en extase du dieu du vin)",
    "Otto Puchstein (archéologue allemand, 1898-1905)",
    "Richard Halliburton (écrivain-aventurier américain)",
  ],

  era: "v. 150 apr. J.-C. (construction sous Antonin le Pieux) ; époque phénicienne (origines du culte d'Adonis)",

  paragraphs: [
    {
      text: "Il existe au Liban un temple romain plus grand que le Parthénon — et presque personne n'en parle. Le Temple de Bacchus à Baalbek s'élève à trente et un mètres de haut, avec des colonnes qui font presque le double de celles d'Athènes. Construit vers 150 après J.-C., c'est le temple romain le mieux conservé au monde. L'aventurier Richard Halliburton, qui s'y est rendu dans les années 1930, l'a surnommé « la Cour du Bonheur » — un nom que les habitants utilisaient depuis des siècles. Mais le mot bonheur est loin de suffire.",
    },
    {
      text: "La porte dit tout. Treize mètres de haut : l'entrée la plus ornementée de l'architecture antique. Chaque surface est sculptée de vignes, de femmes dansant cheveux au vent — les ménades, adeptes en transe du dieu du vin. Et entre les feuilles, en regardant de près, des pavots. Vin. Blé. Pavots. C'étaient les trois substances sacrées des cultes à mystères, gravées dans la pierre comme un avertissement : ce qui se passe derrière cette porte va vous transformer.",
    },
    {
      text: "C'était un temple dédié à Bacchus — le nom que les Romains donnaient à Dionysos, dieu du vin, de la folie et de la renaissance. Ici, on ne priait pas. On était initié. Les candidats jeûnaient dix jours, puis entraient de nuit, vêtus de pourpre et couronnés de lierre. Une longue salle bordée de colonnes sculptées menait à l'adyton — le sanctuaire le plus secret, surélevé, réservé aux seuls initiés. En dessous, une chambre souterraine où les prêtres murmuraient des prophéties.",
    },
    {
      text: "Le point culminant était une mort. Pas symbolique dans un sens rassurant. L'initié devenait Bacchus — le dieu qui, selon le mythe, avait été mis en pièces par les Titans enfant, dévoré, puis ramené à la vie par Zeus. Des prêtres masqués en Titans encerclaient le candidat agenouillé. Les fresques de la Villa des Mystères à Pompéi montrent une figure ailée frappant un dos nu d'un coup de fouet. Ce n'était pas une punition. C'était la destruction de l'ancien soi — la mort qui précède toute renaissance.",
    },
    {
      text: "Ensuite venait le vin — le sang du dieu. Le vin antique était plus léger que le nôtre : on pense qu'il était coupé d'herbes, de miel, peut-être d'opium tiré des pavots de la porte. L'initié buvait et le moi se dissolvait. Vin, blé, pavots : jamais deux sans trois — et le troisième coup brisait ce qu'on croyait être soi. Alors venait la résurrection. Brisé, en larmes, le candidat était « rendu à la vie dans une grande joie ». Les Grecs avaient un mot pour ça : ekstasis — « se tenir hors de soi-même ». C'est l'origine du mot extase.",
    },
    {
      text: "Mais le dieu d'ici n'était ni grec ni romain. Bien avant Rome, les Phéniciens vénéraient sur ce sol un dieu qui mourait et renaissait : Adonis, d'un mot cananéen pour « seigneur ». Chaque printemps, la rivière voisine se teinte de rouge — sédiments de fer des montagnes. Les anciens y voyaient le sang de leur dieu. Quand Rome est arrivée, elle a superposé Bacchus à Adonis — deux dieux qui meurent, un seul temple, et une vérité que chaque civilisation de cette vallée a trouvée seule : le mystère, ce n'est ni la vie ni la mort, c'est le passage entre les deux.",
    },
    {
      text: "Le temple est toujours debout. Sa porte arbore encore ses vignes et ses pavots. La crypte court toujours dans l'obscurité sous le sol où les initiés s'agenouillaient. Plus personne n'a prié ici depuis seize siècles, mais il a survécu à tous les empires qui l'ont revendiqué — romain, byzantin, arabe, ottoman, français. Les pierres se moquent des empires. Elles ont été taillées par des mains qui croyaient façonner un passage entre les mondes. Et les passages, même abandonnés, gardent la forme de ce qui les a un jour traversés.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb: "Aller guten Dinge sind drei" — subverted: all good things come in
//          threes, except these three were meant to destroy you, not strengthen.
// Register: Skilled modern storyteller. Think quality German history podcast.
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#temple-of-ecstasy",

  title: "Der Tempel der Ekstase",

  subtitle:
    "Im besterhaltenen römischen Tempel der Welt durchlebten Eingeweihte Tod und Wiedergeburt in Ritualen, die den griechischen Bacchus mit dem phönizischen Adonis verschmolzen",

  excerpt:
    "Die Einheimischen nannten ihn den Hof des Glücks. Hinter dem kunstvollsten Eingang der Antike durchlebten Eingeweihte einen rituellen Tod — und wurden wiedergeboren.",

  moralOrLesson:
    "Jede Zivilisation hat dasselbe Unmögliche gesucht — eine Pforte zwischen Tod und Leben, einen Weg zu sterben und zurückzukehren, sich selbst zu verlieren und verwandelt wiederzufinden. Die Ruinen des Bacchus-Tempels sind der Beweis, dass für einen kurzen Moment der Geschichte, in einem Tal im Libanon, Tausende von Menschen glaubten, genau das gefunden zu haben.",

  characters: [
    "Bacchus/Dionysos (der sterbende und wiedergeborene Gott)",
    "Adonis (der phönizische Jüngling, dessen Blut den Fluss rot färbte)",
    "Die Mänaden (ekstatische Anhängerinnen des Weingottes)",
    "Otto Puchstein (deutscher Archäologe, 1898–1905)",
    "Richard Halliburton (amerikanischer Abenteurer und Autor)",
  ],

  era: "ca. 150 n. Chr. (Bau unter Antoninus Pius); phönizische Epoche (Ursprünge des Adonis-Kults)",

  paragraphs: [
    {
      text: "Im Libanon steht ein römischer Tempel, der größer ist als der Parthenon — und fast niemand kennt ihn. Der Bacchus-Tempel in Baalbek ragt einunddreißig Meter in die Höhe, mit Säulen, die fast doppelt so hoch sind wie die in Athen. Erbaut um 150 n. Chr., ist er der besterhaltene römische Tempel der Welt. Der Abenteurer Richard Halliburton nannte ihn in den 1930er-Jahren den »Hof des Glücks« — ein Name, den die Einheimischen seit Jahrhunderten benutzten. Aber Glück trifft nicht annähernd, was hier geschah.",
    },
    {
      text: "Die Tür verrät alles. Dreizehn Meter hoch, gilt sie als der kunstvollste Eingang der antiken Welt. Jede Fläche ist bedeckt mit Weinranken, mit tanzenden Frauen mit offenem Haar — den Mänaden, den ekstatischen Anhängerinnen des Weingottes. Dazwischen, wer genau hinsieht, entdeckt Mohnblumen. Wein. Korn. Mohn. Das waren die drei heiligen Substanzen der antiken Mysterienkulte, in Stein gemeißelt wie eine Warnung: Was hinter dieser Tür passiert, wird dich verändern.",
    },
    {
      text: "Dies war ein Tempel des Bacchus — so nannten die Römer Dionysos, den Gott des Weins, des Wahnsinns und der Wiedergeburt. Hier wurde nicht gebetet. Hier wurde man eingeweiht. Die Kandidaten fasteten zehn Tage, dann betraten sie den Tempel bei Nacht, in purpurnen Gewändern und mit Efeukränzen. Ein langer Saal gesäumt von Säulen führte zum Adyton — dem innersten Heiligtum, über dem Boden erhöht, nur Eingeweihten zugänglich. Darunter lag eine verborgene Kammer, in der Priester den Gläubigen darüber Prophezeiungen zuflüsterten.",
    },
    {
      text: "Der Höhepunkt war ein Tod. Nicht symbolisch in irgendeinem harmlosen Sinn. Der Eingeweihte wurde zu Bacchus — dem Gott, der laut Mythos als Säugling von den Titanen zerrissen, verschlungen und von Zeus wieder zum Leben erweckt wurde. Priester mit Titanenmasken umringten den knienden Kandidaten. Wandmalereien in der Villa dei Misteri in Pompeji zeigen eine geflügelte Gestalt, die mit einer Peitsche auf einen nackten Rücken einschlägt. Das war keine Strafe. Es war die Zerstörung des alten Selbst — der Tod, der vor jeder Wiedergeburt kommen muss.",
    },
    {
      text: "Dann kam der Wein — das Blut des Gottes. Antiker Wein war schwächer als unserer, vermutlich versetzt mit Kräutern, Honig und Opium aus den Mohnblumen an der Tür. Der Eingeweihte trank, und das Ich löste sich auf. Wein, Korn, Mohn: Aller guten Dinge sind drei — nur dass diese drei dich nicht stärken sollten, sondern zerstören. Dann die Auferstehung. Gebrochen und weinend wurde der Kandidat »ins Leben zurückgeholt«. Die Griechen nannten es ekstasis — »außerhalb seiner selbst stehen«. Daher unser Wort Ekstase.",
    },
    {
      text: "Der Gott hier war aber weder ganz griechisch noch ganz römisch. Lange vor Rom verehrten die Phönizier an dieser Stelle einen Gott, der starb und auferstand: Adonis, von einem kanaanäischen Wort für »Herr«. Jeden Frühling färbt sich der nahe Fluss rot — Eisensediment aus den Bergen. Die Alten sahen das Blut ihres Gottes. Als Rom kam, legte es Bacchus über Adonis — zwei sterbende Götter, ein Tempel, eine Wahrheit, die jede Zivilisation dieses Tals für sich fand: Das Geheimnis ist nicht Leben oder Tod, sondern der Übergang dazwischen.",
    },
    {
      text: "Der Tempel steht noch. Seine Tür trägt noch die Weinranken und Mohnblumen. Die Krypta liegt im Dunkel unter dem Boden, wo die Eingeweihten knieten. Seit sechzehn Jahrhunderten betet hier niemand mehr, aber er hat jedes Imperium überlebt, das ihn beanspruchte — das römische, byzantinische, arabische, osmanische, französische. Steine kümmern sich nicht um Imperien. Sie wurden von Händen geformt, die glaubten, eine Pforte zwischen Welten zu schaffen. Und Pforten, selbst verlassene, bewahren die Form dessen, was einst durch sie hindurchging.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n⏳ Pushing ${label} ...`);

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
    console.log(`✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `⚠️  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`✅ ${label} overwritten successfully.`);
    } else {
      console.error(`❌ Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("=== Pushing Temple of Ecstasy (es, fr, de) to DynamoDB ===");
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
          `⚠️  ${rec.lang} paragraph ${i + 1}: ${chars} chars (over 500 soft limit)`
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
