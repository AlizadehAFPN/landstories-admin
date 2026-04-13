/**
 * Push "The Boy King's Murder Mystery" recreated in es, fr, de
 * to the Story DynamoDB table.
 *
 * Run: node scripts/push-boy-king-translations.mjs
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
  siteId: "valley-of-the-kings",
  storyId: "boy-king-murder-mystery",
  characters: [
    "Tutankhamun",
    "Ankhesenamun (Queen)",
    "Ay (Vizier)",
    "Horemheb (General)",
    "Prince Zannanza (Hittite)",
    "Suppiluliuma I (Hittite King)",
  ],
  coordinates: { lng: 32.6014, lat: 25.7402 },
  disabled: false,
  era: "New Kingdom (c. 1323 BC)",
  hasAudio: false,
  icon: "🗡️",
  image: "",
  isFree: true,
  readingTimeMinutes: 3,
  source:
    'Hawass, Z. et al. "Ancestry and Pathology in King Tutankhamun\'s Family," JAMA 303:7 (2010); Hittite archives, Bogazkoy',
  storyCategory: "ghosts_curses",
  thumbnail: "",
  tier: "A",
  updatedAt: NOW,
};

// ═════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb subverted: "A la tercera va la vencida"
// ═════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#boy-king-murder-mystery",
  title: "El misterio del faraón niño",
  subtitle: "¿Quién mató a Tutankamón y silenció a su reina para siempre?",
  excerpt:
    "Tutankamón tenía diecinueve años cuando murió, hacia el 1323 a.\u00A0C., en pleno apogeo del antiguo Egipto. Un faraón adolescente, supuestamente un dios viviente, muerto antes siquiera de que le creciera la barba. Durante más de tres mil años, nadie supo por qué.",
  moralOrLesson:
    "El poder silencia a los que no lo tienen, y las cartas desesperadas de una joven reina resuenan a través de los milenios como testimonio de la crueldad política.",
  paragraphs: [
    {
      text: "Tutankamón tenía diecinueve años cuando murió, hacia el 1323 a.\u00A0C., en pleno apogeo del antiguo Egipto. Un faraón adolescente, supuestamente un dios viviente, muerto antes siquiera de que le creciera la barba. Durante más de tres mil años, nadie supo por qué. Hasta que en el siglo XX metieron su momia en máquinas de rayos X y escáneres — y lo que encontraron desató uno de los mayores misterios criminales de la historia.",
    },
    {
      text: "En 1968, las radiografías del cráneo de Tut mostraron fragmentos de hueso sueltos y algo que parecía un golpe en la base — la marca que deja un objeto pesado. La noticia fue una bomba. Y la lista de sospechosos se escribía sola. El padre de Tut, Akenatón, había sumido a Egipto en el caos al prohibir a los dioses tradicionales e imponer el culto al disco solar, Atón. Cuando Tut heredó el trono con nueve años, heredó también enemigos que querían verlo muerto.",
    },
    {
      text: "Dos nombres encabezaban la lista. Ay, el consejero de Tut — un viejo zorro que, por pura casualidad, se convirtió en faraón en cuanto Tut estuvo bajo tierra. Y Horemheb, el general más poderoso de Egipto, que sucedió a Ay y luego borró a Tut, a Ay y a Akenatón de cada monumento del país. Ambos tenían los medios, el motivo y el acceso.",
    },
    {
      text: "Pero lo más desgarrador no tiene que ver con Tut, sino con su esposa. Tras su muerte, la joven reina Anjesenamón fue obligada a casarse con Ay — el hombre al que probablemente sospechaba de haber matado a su marido. Hizo algo sin precedentes: escribió al rey del mayor enemigo de Egipto, el hitita Suppiluliuma, suplicándole un hijo como esposo. Sus palabras exactas sobreviven: «Mi esposo ha muerto y no tengo hijos. Jamás elegiré a un sirviente como esposo. Tengo miedo.»",
    },
    {
      text: "El rey hitita no daba crédito. Envió un emisario a verificar. Anjesenamón volvió a escribir, más desesperada: «Si tuviera un hijo, ¿habría expuesto mi vergüenza y la de mi país ante una tierra extranjera?» Eso lo convenció. Envió a su hijo, el príncipe Zannanza, rumbo a Egipto. Fue asesinado en la frontera. Nunca llegó a conocer a su prometida. Dicen que a la tercera va la vencida — pero para esta reina, la tercera carta nunca existió.",
    },
    {
      text: "En 2005, la historia dio un giro inesperado. Un escáner completo de la momia reveló algo distinto. ¿Los fragmentos del cráneo? Consecuencia del embalsamamiento, no de un golpe. Lo que sí encontraron fue una fractura grave en la pierna izquierda que se infectó, más evidencia de malaria. Hoy la ciencia dice que Tut murió por una tormenta perfecta: pierna destrozada, malaria y problemas genéticos de generaciones de endogamia real. Sus padres eran hermano y hermana.",
    },
    {
      text: "Pero aunque la enfermedad matara al faraón niño, el encubrimiento político es innegable. Alguien interceptó el grito de auxilio de su viuda. Alguien ordenó asesinar al príncipe hitita en la frontera. Y alguien obligó a Anjesenamón a casarse con el hombre que más ganó con la muerte de su esposo. Tras esa boda, ella desapareció. Sin tumba. Sin registros. Su nombre fue arrancado de cada monumento — como si jamás hubiera existido.",
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
  langStoryId: "fr#boy-king-murder-mystery",
  title: "L\u2019énigme du roi enfant",
  subtitle:
    "Qui a tué Toutânkhamon — et réduit sa reine au silence pour toujours\u00A0?",
  excerpt:
    "Toutânkhamon avait dix-neuf ans quand il est mort — vers 1323 av. J.-C., à l\u2019apogée de l\u2019Égypte ancienne. Un pharaon adolescent, censé être un dieu vivant, mort avant même d\u2019avoir eu le temps de devenir adulte. Pendant plus de trois mille ans, personne n\u2019a su pourquoi.",
  moralOrLesson:
    "Le pouvoir réduit au silence ceux qui n\u2019en ont pas, et les lettres désespérées d\u2019une jeune reine résonnent à travers les millénaires comme un témoignage de la cruauté politique.",
  paragraphs: [
    {
      text: "Toutânkhamon avait dix-neuf ans quand il est mort — vers 1323 av. J.-C., à l\u2019apogée de l\u2019Égypte ancienne. Un pharaon adolescent, censé être un dieu vivant, mort avant même d\u2019avoir eu le temps de devenir adulte. Pendant plus de trois mille ans, personne n\u2019a su pourquoi. Et puis, au XXe\u00A0siècle, des scientifiques ont glissé sa momie sous des rayons\u00A0X et des scanners — et ce qu\u2019ils ont trouvé a déclenché l\u2019une des plus grandes enquêtes criminelles de l\u2019histoire.",
    },
    {
      text: "En 1968, des radiographies du crâne de Toutânkhamon révèlent des fragments d\u2019os et ce qui ressemble à un enfoncement à la base — le genre de marque que laisse un coup violent. La nouvelle fait l\u2019effet d\u2019une bombe. Et la liste des suspects s\u2019écrit d\u2019elle-même. Le père de Toutânkhamon, Akhenaton, avait plongé l\u2019Égypte dans le chaos en interdisant les dieux traditionnels pour imposer le culte d\u2019un seul — le disque solaire, Aton. Quand Toutânkhamon a hérité du trône à neuf ans, il a aussi hérité d\u2019ennemis puissants qui avaient toutes les raisons de vouloir sa mort.",
    },
    {
      text: "Deux noms en tête de liste. D\u2019abord Aÿ, le conseiller principal de Toutânkhamon — un vieux renard de la politique qui, par le plus grand des hasards, est devenu pharaon dès que Toutânkhamon a été mis en terre. Ensuite Horemheb, le plus puissant général d\u2019Égypte, qui a succédé à Aÿ et s\u2019est ensuite appliqué à effacer Toutânkhamon, Aÿ et Akhenaton de chaque monument et chaque archive du pays. Les deux avaient les moyens, le mobile et l\u2019accès.",
    },
    {
      text: "Mais le plus déchirant dans cette affaire ne concerne pas Toutânkhamon — c\u2019est l\u2019histoire de sa femme. Après sa mort, la jeune reine Ânkhésenamon s\u2019est retrouvée face à un mariage forcé avec Aÿ, l\u2019homme qu\u2019elle soupçonnait probablement d\u2019avoir tué son mari. Elle a fait quelque chose qu\u2019aucune reine d\u2019Égypte n\u2019avait jamais osé\u00A0: elle a écrit au roi du plus grand ennemi de l\u2019Égypte, le souverain hittite Suppiluliuma, pour le supplier de lui envoyer un fils à épouser. Ses mots exacts nous sont parvenus\u00A0: «\u00A0Mon époux est mort et je n\u2019ai pas de fils. Jamais je ne prendrai un de mes serviteurs pour époux. J\u2019ai peur.\u00A0»",
    },
    {
      text: "Le roi hittite n\u2019en revient pas — et flaire un piège. Il envoie un émissaire vérifier. Ânkhésenamon écrit une seconde fois, plus désespérée encore\u00A0: «\u00A0Si j\u2019avais un fils, aurais-je exposé ma honte et celle de mon pays à une terre étrangère\u00A0?\u00A0» Convaincu, il envoie son fils, le prince Zannanza, vers le sud. Le prince est assassiné à la frontière. Il n\u2019atteindra jamais sa promise. On dit «\u00A0jamais deux sans trois\u00A0» — mais pour cette reine, il n\u2019y a jamais eu de troisième lettre.",
    },
    {
      text: "En 2005, l\u2019affaire prend un tournant. Un scanner complet de la momie raconte une tout autre histoire. Les fragments du crâne\u00A0? Sans doute causés par l\u2019embaumement, pas par un coup. Ce que le scanner révèle, c\u2019est une fracture grave de la jambe gauche, infectée, et des traces ADN de paludisme. La science estime aujourd\u2019hui que Toutânkhamon est mort d\u2019une combinaison fatale\u00A0: une jambe brisée, le paludisme et des problèmes génétiques liés à des générations de consanguinité royale — ses parents étaient frère et sœur.",
    },
    {
      text: "Mais même si c\u2019est la maladie qui a tué le roi enfant, le complot politique est indéniable. Quelqu\u2019un a intercepté l\u2019appel au secours de sa veuve. Quelqu\u2019un a fait assassiner le prince hittite à la frontière. Et quelqu\u2019un a forcé Ânkhésenamon à épouser l\u2019homme qui avait le plus à gagner de la mort de son mari. Après ce mariage avec Aÿ, elle a disparu de l\u2019histoire. Aucune tombe. Aucun document. Son nom a été gratté de chaque monument — comme si elle n\u2019avait jamais existé.",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb subverted: "Aller guten Dinge sind drei"
// ═════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#boy-king-murder-mystery",
  title: "Das Rätsel des Kindkönigs",
  subtitle:
    "Wer tötete Tutanchamun — und brachte seine Königin für immer zum Schweigen?",
  excerpt:
    "Tutanchamun war neunzehn, als er starb — um 1323 v.\u00A0Chr., auf dem Höhepunkt der ägyptischen Macht. Ein Pharao im Teenageralter, angeblich ein lebender Gott, tot, bevor er überhaupt richtig erwachsen war. Über dreitausend Jahre lang wusste niemand, warum.",
  moralOrLesson:
    "Macht bringt die Machtlosen zum Schweigen, und die verzweifelten Briefe einer jungen Königin hallen über die Jahrtausende als Zeugnis politischer Grausamkeit.",
  paragraphs: [
    {
      text: "Tutanchamun war neunzehn, als er starb — um 1323 v.\u00A0Chr., auf dem Höhepunkt der ägyptischen Macht. Ein Pharao im Teenageralter, angeblich ein lebender Gott, tot, bevor er überhaupt richtig erwachsen war. Über dreitausend Jahre lang wusste niemand, warum. Dann, im zwanzigsten Jahrhundert, schoben Wissenschaftler seine Mumie in Röntgengeräte und CT-Scanner — und was sie fanden, löste eines der größten Kriminalrätsel der Geschichte aus.",
    },
    {
      text: "1968 zeigten Röntgenaufnahmen von Tuts Schädel lose Knochenfragmente und etwas, das wie eine Delle an der Schädelbasis aussah — die Art Spur, die ein schwerer Schlag hinterlässt. Die Nachricht schlug ein wie eine Bombe. Und die Verdächtigenliste schrieb sich praktisch von selbst. Tuts Vater, Pharao Echnaton, hatte Ägypten ins Chaos gestürzt, indem er die alten Götter abschaffte und alle zwang, nur noch den Sonnengott Aton anzubeten. Als der neunjährige Tut den Thron erbte, erbte er auch mächtige Feinde, die ihn lieber tot gesehen hätten.",
    },
    {
      text: "Zwei Namen standen ganz oben. Erstens: Eje, Tuts engster Berater — ein alter Fuchs der Politik, der rein zufällig der nächste Pharao wurde, sobald Tut unter der Erde lag. Zweitens: Horemheb, Ägyptens oberster General, der nach Eje den Thron bestieg und dann systematisch Tut, Eje und Echnaton von jedem Denkmal und jeder Urkunde im Land tilgte. Beide hatten Mittel, Motiv und Zugang.",
    },
    {
      text: "Doch das Erschütterndste an dieser Geschichte betrifft nicht Tut — sondern seine Frau. Nach seinem Tod sollte die junge Königin Anchesenamun zur Ehe mit Eje gezwungen werden, dem Mann, den sie vermutlich verdächtigte, ihren Gatten umgebracht zu haben. Sie tat etwas, was keine ägyptische Königin jemals gewagt hatte: Sie schrieb dem König von Ägyptens größtem Feind, dem Hethiterkönig Šuppiluliuma, und flehte ihn an, ihr einen Sohn als Ehemann zu schicken. Ihre genauen Worte sind überliefert: \u201EMein Gemahl ist gestorben und ich habe keinen Sohn. Niemals werde ich einen meiner Diener zu meinem Gemahl machen. Ich habe Angst.\u201C",
    },
    {
      text: "Der Hethiterkönig traute der Sache nicht — und witterte eine Falle. Er schickte einen Gesandten, um die Lage zu prüfen. Anchesenamun schrieb ein zweites Mal, noch verzweifelter: \u201EHätte ich einen Sohn, hätte ich dann die Schande meines Landes vor einem fremden Volk ausgebreitet?\u201C Das überzeugte ihn. Er schickte seinen Sohn, Prinz Zannanza, nach Süden, Richtung Ägypten. Der Prinz wurde an der Grenze ermordet. Er erreichte seine Braut nie. Man sagt, aller guten Dinge sind drei — doch für diese Königin gab es keinen dritten Brief.",
    },
    {
      text: "2005 nahm die Geschichte eine unerwartete Wendung. Ein vollständiger CT-Scan der Mumie erzählte eine ganz andere Geschichte. Die Knochenfragmente im Schädel? Wahrscheinlich eine Folge der Einbalsamierung, nicht eines Schlags. Was der Scan tatsächlich zeigte, war ein schwerer Bruch des linken Beins, der sich infiziert hatte, dazu DNA-Spuren von Malaria. Die Wissenschaft geht heute davon aus, dass Tut an einem fatalen Zusammenspiel starb: ein zerschmettertes Bein, Malaria und genetische Schäden durch Generationen königlicher Inzucht — seine Eltern waren Geschwister.",
    },
    {
      text: "Doch selbst wenn Krankheit den Kindkönig tötete — die politische Vertuschung ist unbestreitbar. Jemand fing den Hilferuf seiner Witwe ab. Jemand ließ den Hethiterprinzen an der Grenze ermorden. Und jemand zwang Anchesenamun zur Ehe mit dem Mann, der am meisten vom Tod ihres Gatten profitierte. Nach dieser Hochzeit mit Eje verschwand sie aus der Geschichte. Kein Grab. Keine Aufzeichnungen. Ihr Name wurde von jedem Denkmal geschlagen — als hätte es sie nie gegeben.",
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────

async function pushItem(item) {
  const label = `${item.lang} — "${item.title}"`;
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) OR attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅  ${label} — pushed successfully.`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      // Record already exists — overwrite it
      console.log(`⚠️  ${label} — record exists, overwriting…`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`✅  ${label} — overwritten successfully.`);
      return true;
    }
    console.error(`❌  ${label} — FAILED:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`\nTimestamp: ${NOW} (${new Date(NOW * 1000).toISOString()})\n`);

  for (const item of [es, fr, de]) {
    const ok = await pushItem(item);
    if (!ok) process.exit(1);
  }

  console.log("\n🏁  All three language versions pushed.\n");
}

main();
