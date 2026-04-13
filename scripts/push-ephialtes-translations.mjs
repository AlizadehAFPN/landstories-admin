/**
 * Push "The Betrayal of Ephialtes" — Spanish, French, German
 * Each version recreated from scratch as a native-born story.
 *
 * Usage: node scripts/push-ephialtes-translations.mjs
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// Load .env.local
const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";
const TIMESTAMP = Math.floor(Date.now() / 1000);

// Shared fields (unchanged from English)
const shared = {
  siteId: "thermopylae",
  storyId: "ephialtes-betrayal",
  characters: [
    "Ephialtes of Trachis",
    "Xerxes",
    "The Persian Immortals",
    "The Phocian guard",
    "King Leonidas",
  ],
  coordinates: { lng: 22.5367, lat: 38.7967 },
  disabled: false,
  era: "480 BCE",
  hasAudio: false,
  icon: "\u{1F40D}",
  image: "",
  isFree: true,
  readingTimeMinutes: 2,
  source: "Herodotus\u2019s Histories (Book 7, chapters 213-218), Plutarch\u2019s Moralia",
  storyCategory: "ghosts_curses",
  thumbnail: "",
  tier: "A",
  updatedAt: TIMESTAMP,
};

function makeParagraphs(texts) {
  return texts.map((text) => ({ text }));
}

// ──────────────────────────────────────────────
// SPANISH (es)
// Proverb: "A la tercera va la vencida" — subverted
// ──────────────────────────────────────────────
const spanish = {
  ...shared,
  lang: "es",
  langStoryId: "es#ephialtes-betrayal",

  title: "La traición de las Termópilas",

  subtitle: "El hombre que vendió a Grecia por oro persa",

  excerpt:
    "Lo que más impresiona de la Batalla de las Termópilas no es la resistencia de trescientos espartanos contra un imperio. Es que esa resistencia no cayó en combate. La rompió un solo hombre: un tipo de la zona llamado Efialtes, que conocía un camino secreto entre las montañas.",

  paragraphs: makeParagraphs([
    "Lo que hay que entender de las Termópilas es esto: la resistencia más famosa de la historia no cayó en combate. Trescientos espartanos y unos cuantos miles de aliados griegos defendieron un desfiladero costero contra todo el Imperio persa, y los persas no pudieron pasar. Lo que acabó con aquella defensa no fue un ejército mejor. Fue un solo hombre \u2014 un tipo de la zona llamado Efialtes \u2014 que conocía un camino secreto entre las montañas.",

    "Durante dos días en el verano del 480 a.C., los griegos hicieron pagar a los persas cada centímetro de aquel paso. El rey Jerjes había traído un ejército tan descomunal que los historiadores antiguos decían que secaba los ríos al beber. Pero en las Termópilas nada de eso importaba. El desfiladero era tan estrecho que solo un puñado de hombres podía luchar a la vez \u2014 y los espartanos de primera línea eran los mejores soldados del mundo antiguo.",

    "Jerjes estaba desesperado. Sus tropas de élite, los Inmortales \u2014 diez mil guerreros escogidos a dedo que recibían ese nombre porque cada caído se reemplazaba al instante \u2014, ya habían cargado contra la línea griega y habían sido rechazados. Entonces apareció Efialtes en el campamento persa. Un tipo de la zona que conocía cada rincón de aquellas montañas y tenía algo que vender: un sendero oculto que rodeaba la posición griega. ¿El precio? Oro. Mucho.",

    "Jerjes no lo dudó. Esa noche mandó a los diez mil Inmortales tras Efialtes por el sendero oculto. Los griegos no estaban del todo desprevenidos: Leónidas había dejado mil soldados de una región vecina, Fócide, vigilando aquel camino. Pero cuando los Inmortales surgieron entre los árboles al amanecer, los guardias entraron en pánico, huyeron colina arriba para salvar el pellejo y dejaron el paso abierto de par en par.",

    "Al amanecer, Leónidas supo que aquello se había acabado. Los persas pronto estarían a su espalda y su fuerza quedaría rodeada. Tomó entonces la decisión que convirtió esta batalla en leyenda: envió al grueso del ejército griego al sur, a ponerse a salvo, y se quedó con sus trescientos espartanos y unos setecientos voluntarios de la ciudad griega de Tespias. Su misión era simple e imposible: aguantar el paso el tiempo suficiente para que los demás escaparan.",

    "Aguantaron. Lucharon hasta que las lanzas se rompieron, luego con las espadas, luego con las manos. Murieron todos hasta el último. Y funcionó: el ejército griego que se retiró sobrevivió, se reagrupó y acabó derrotando a Persia en las batallas que siguieron. Los trescientos murieron para que Grecia viviera.",

    "Dicen que a la tercera va la vencida. Jerjes lo intentó dos veces de frente y fracasó. Pero su victoria no llegó al tercer asalto: llegó por la puerta de atrás, comprada con oro a un traidor. ¿Y Efialtes? Los griegos pusieron tal precio a su cabeza que pasó la vida huyendo. Escapó al norte, a Tesalia, pero no puedes esconderte de toda Grecia. Según Heródoto, acabaron matándolo \u2014 ni siquiera por la traición, sino en una pelea cualquiera. Los espartanos recompensaron a su asesino igual.",

    "Han pasado dos mil quinientos años y el nombre de Efialtes no se ha recuperado. En griego moderno significa literalmente \u00ABpesadilla.\u00BB Ese es el precio de vender a quienes se quedaron a luchar por ti. Trescientos espartanos se hicieron inmortales. El hombre que los traicionó se convirtió en la palabra que describe lo que te despierta gritando en mitad de la noche.",
  ]),

  moralOrLesson:
    "La traición es la fuerza más destructiva en una guerra \u2014 más letal que cualquier ejército. La cobardía de un solo hombre deshizo lo que el valor de trescientos espartanos había logrado.",
};

// ──────────────────────────────────────────────
// FRENCH (fr)
// Proverb: "Jamais deux sans trois" — subverted
// ──────────────────────────────────────────────
const french = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#ephialtes-betrayal",

  title: "La trahison des Thermopyles",

  subtitle: "L\u2019homme qui a vendu la Grèce pour de l\u2019or perse",

  excerpt:
    "Ce qui frappe le plus dans la bataille des Thermopyles \u2014 la dernière résistance la plus célèbre de l\u2019histoire \u2014 c\u2019est qu\u2019elle n\u2019a pas été perdue au combat. Elle a été perdue à cause d\u2019un seul homme, quelqu\u2019un du coin nommé Éphialtès, qui connaissait un sentier secret à travers la montagne.",

  paragraphs: makeParagraphs([
    "Ce qu\u2019il faut retenir des Thermopyles, c\u2019est que la résistance la plus célèbre de l\u2019histoire n\u2019est pas tombée au combat. Trois cents Spartiates et quelques milliers d\u2019alliés grecs ont tenu un défilé côtier contre tout l\u2019Empire perse, et les Perses n\u2019arrivaient pas à passer. Ce qui a tout fait basculer, ce n\u2019était pas une armée supérieure. C\u2019était un seul homme \u2014 un type du coin nommé Éphialtès \u2014 qui connaissait un passage secret à travers la montagne.",

    "Pendant deux jours, en plein été 480 avant notre ère, les Grecs ont fait payer chaque mètre de ce défilé aux Perses. Le roi Xerxès avait amené une armée si colossale que les historiens antiques prétendaient qu\u2019elle asséchait les rivières en buvant. Mais aux Thermopyles, tout ça ne servait à rien. Le passage était si étroit que seule une poignée d\u2019hommes pouvait se battre en même temps \u2014 et les Spartiates en première ligne étaient les meilleurs soldats du monde antique.",

    "Xerxès était au bord du gouffre. Ses troupes d\u2019élite, les Immortels \u2014 dix mille guerriers triés sur le volet, surnommés ainsi parce que chaque soldat tombé était immédiatement remplacé \u2014 avaient déjà chargé la ligne grecque et s\u2019étaient fait repousser. C\u2019est à ce moment-là qu\u2019Éphialtès est apparu dans le camp perse. Un homme du coin qui connaissait chaque recoin de ces montagnes et qui avait quelque chose à vendre : un sentier caché contournant la position grecque. Le prix ? De l\u2019or. Beaucoup.",

    "Xerxès n\u2019a pas hésité une seconde. Dans la nuit, il a envoyé les dix mille Immortels suivre Éphialtès par le sentier caché. Les Grecs n\u2019étaient pas totalement pris au dépourvu : Léonidas avait posté mille soldats d\u2019une région voisine, la Phocide, pour surveiller ce passage. Mais quand les Immortels ont surgi des arbres à l\u2019aube, ces gardes ont paniqué, se sont enfuis sur les hauteurs pour sauver leur peau et ont laissé le chemin grand ouvert.",

    "Au lever du soleil, Léonidas a compris que c\u2019était fini. Les Perses allaient bientôt être dans son dos et sa petite troupe serait encerclée. Alors il a pris la décision qui a transformé cette bataille en légende : il a renvoyé le gros de l\u2019armée grecque vers le sud et il est resté avec ses trois cents Spartiates et environ sept cents volontaires de la cité grecque de Thespies. Leur mission : tenir le passage assez longtemps pour que les autres s\u2019en sortent.",

    "Ils ont tenu. Ils se sont battus jusqu\u2019à ce que leurs lances se brisent, puis avec leurs épées, puis à mains nues. Ils sont morts jusqu\u2019au dernier. Et leur sacrifice a fonctionné : l\u2019armée grecque en retraite a survécu, s\u2019est regroupée et a fini par vaincre la Perse dans les batailles qui ont suivi. Les trois cents sont morts pour que la Grèce vive.",

    "On dit \u00AB jamais deux sans trois \u00BB \u2014 et Xerxès avait bel et bien échoué deux fois de front. Mais le troisième coup n\u2019a pas été un assaut : c\u2019était une trahison achetée à prix d\u2019or. Éphialtès ? Les Grecs ont mis sa tête à prix. Il a fui vers le nord, en Thessalie, mais personne ne se cache du monde grec entier. Selon Hérodote, il a fini par être tué \u2014 même pas pour sa trahison, mais dans une querelle banale. Les Spartiates ont récompensé son meurtrier quand même.",

    "Deux mille cinq cents ans ont passé, et le nom d\u2019Éphialtès ne s\u2019en est jamais remis. En grec moderne, il signifie littéralement \u00AB cauchemar. \u00BB C\u2019est le prix qu\u2019on paie quand on vend ceux qui sont restés debout pour se battre. Trois cents Spartiates sont devenus immortels. L\u2019homme qui les a trahis est devenu le mot qui désigne ce qui vous réveille en hurlant au milieu de la nuit.",
  ]),

  moralOrLesson:
    "La trahison est la force la plus destructrice à la guerre \u2014 plus meurtrière que n\u2019importe quelle armée. La lâcheté d\u2019un seul homme a défait ce que le courage de trois cents Spartiates avait accompli.",
};

// ──────────────────────────────────────────────
// GERMAN (de)
// Proverb: "Aller guten Dinge sind drei" — subverted
// ──────────────────────────────────────────────
const german = {
  ...shared,
  lang: "de",
  langStoryId: "de#ephialtes-betrayal",

  title: "Der Verrat an den Thermopylen",

  subtitle: "Der Mann, der Griechenland für persisches Gold verkaufte",

  excerpt:
    "Was an der Schlacht bei den Thermopylen am meisten beeindruckt, ist nicht der Widerstand von dreihundert Spartanern gegen ein Weltreich. Es ist, dass dieser Widerstand nicht im Kampf gebrochen wurde. Ihn brach ein einziger Mann \u2014 jemand aus der Gegend namens Ephialtes, der einen geheimen Pfad durch die Berge kannte.",

  paragraphs: makeParagraphs([
    "Was man über die Thermopylen verstehen muss: Der berühmteste letzte Widerstand der Geschichte ist nicht im Kampf gefallen. Dreihundert Spartaner und ein paar tausend griechische Verbündete hielten einen schmalen Küstenpass gegen das gesamte Persische Reich \u2014 und die Perser kamen nicht durch. Was diese Verteidigung am Ende brach, war kein besseres Heer. Es war ein einziger Mann \u2014 jemand aus der Gegend namens Ephialtes \u2014, der einen geheimen Pfad durch die Berge kannte.",

    "Zwei Tage lang im Spätsommer 480 v.\u00A0Chr. ließen die Griechen die Perser für jeden Zentimeter dieses Passes bezahlen. König Xerxes von Persien hatte ein Heer mitgebracht, das so gewaltig war, dass antike Historiker behaupteten, es trinke ganze Flüsse leer. Aber an den Thermopylen spielte das keine Rolle. Der Pass war so eng, dass nur eine Handvoll Männer gleichzeitig kämpfen konnte \u2014 und die Spartaner in der ersten Reihe waren die am besten ausgebildeten Soldaten der antiken Welt.",

    "Xerxes war verzweifelt. Seine Elitetruppe, die Unsterblichen \u2014 zehntausend handverlesene Krieger, die so hießen, weil jeder Gefallene sofort ersetzt wurde \u2014 war bereits gegen die griechische Linie angerannt und zurückgeschlagen worden. Dann tauchte Ephialtes im persischen Lager auf. Jemand aus der Gegend, der jeden Winkel dieser Berge kannte und etwas zu verkaufen hatte: einen verborgenen Pfad, der hinter die griechische Stellung führte. Der Preis? Gold. Sehr viel Gold.",

    "Xerxes griff sofort zu. In dieser Nacht schickte er die zehntausend Unsterblichen hinter Ephialtes her über den verborgenen Pfad. Die Griechen waren nicht völlig unvorbereitet: König Leonidas hatte tausend Soldaten aus der Nachbarregion Phokis abgestellt, um den Pfad zu bewachen. Aber als die Unsterblichen im Morgengrauen zwischen den Bäumen auftauchten, gerieten die Wachen in Panik, flohen den Hügel hinauf und ließen den Weg sperrangelweit offen.",

    "Bei Sonnenaufgang wusste Leonidas, dass es vorbei war. Die Perser würden bald in seinem Rücken stehen und seine kleine Truppe wäre eingekreist. Also traf er die Entscheidung, die diese Schlacht zur Legende machte: Er schickte den Großteil des griechischen Heeres nach Süden in Sicherheit und blieb selbst mit seinen dreihundert Spartanern und etwa siebenhundert Freiwilligen aus der griechischen Stadt Thespiae. Ihr Auftrag war einfach und unmöglich: den Pass halten, bis die anderen entkommen waren.",

    "Sie hielten ihn. Sie kämpften, bis die Speere brachen, dann mit den Schwertern, dann mit bloßen Händen. Jeder einzelne von ihnen starb. Und ihr Opfer wirkte: Das griechische Heer, das sich zurückzog, überlebte, formierte sich neu und besiegte Persien in den Schlachten, die im nächsten Jahr folgten. Die Dreihundert starben, damit Griechenland leben konnte.",

    "Man sagt: \u201EAller guten Dinge sind drei.\u201C Xerxes war zweimal am Pass gescheitert. Aber das dritte Mal war nichts Gutes \u2014 es war Verrat, erkauft mit Gold. Und Ephialtes? Die Griechen setzten ein Kopfgeld auf ihn, so hoch, dass er den Rest seines Lebens floh. Laut Herodot wurde er am Ende getötet \u2014 nicht einmal wegen des Verrats, sondern wegen irgendeines banalen Streits. Die Spartaner belohnten seinen Mörder trotzdem. Gerechtigkeit bleibt Gerechtigkeit, auch wenn sie durch Zufall kommt.",

    "Zweieinhalbtausend Jahre sind vergangen, und der Name Ephialtes hat sich nie davon erholt. Im modernen Griechisch bedeutet er wörtlich \u201EAlbtraum.\u201C Das ist der Preis dafür, die zu verraten, die geblieben sind und gekämpft haben. Dreihundert Spartaner wurden unsterblich. Der Mann, der sie verriet, wurde zu dem Wort für das, was dich nachts schreiend aus dem Schlaf reißt.",
  ]),

  moralOrLesson:
    "Verrat ist die zerstörerischste Kraft im Krieg \u2014 tödlicher als jedes Heer. Die Feigheit eines einzigen Mannes machte zunichte, was der Mut von dreihundert Spartanern errungen hatte.",
};

// ──────────────────────────────────────────────
// VALIDATION
// ──────────────────────────────────────────────

function validate(item, label) {
  const errors = [];

  if (!item.siteId) errors.push("missing siteId");
  if (!item.langStoryId) errors.push("missing langStoryId");
  if (!item.lang) errors.push("missing lang");
  if (!item.title) errors.push("missing title");
  if (!item.subtitle) errors.push("missing subtitle");
  if (!item.excerpt) errors.push("missing excerpt");
  if (!item.moralOrLesson) errors.push("missing moralOrLesson");
  if (!item.storyId) errors.push("missing storyId");
  if (!item.paragraphs || item.paragraphs.length === 0) errors.push("missing paragraphs");

  // Check langStoryId format
  if (!item.langStoryId.startsWith(item.lang + "#")) {
    errors.push(`langStoryId "${item.langStoryId}" doesn't start with "${item.lang}#"`);
  }

  // Check paragraph structure
  for (let i = 0; i < (item.paragraphs || []).length; i++) {
    const p = item.paragraphs[i];
    if (!p.text || typeof p.text !== "string") {
      errors.push(`paragraph ${i} missing or invalid text`);
    } else {
      if (p.text.length > 600) {
        errors.push(`paragraph ${i} too long: ${p.text.length} chars (max 500, soft limit 600)`);
      }
    }
  }

  // Check total character count
  const totalChars = (item.paragraphs || []).reduce((sum, p) => sum + (p.text?.length || 0), 0);
  if (totalChars < 2000 || totalChars > 4500) {
    errors.push(`total paragraph chars ${totalChars} outside acceptable range (2000-4500)`);
  }

  if (errors.length > 0) {
    console.error(`\n  VALIDATION FAILED for ${label}:`);
    errors.forEach((e) => console.error(`    - ${e}`));
    return false;
  }

  console.log(`  ${label}: ${item.paragraphs.length} paragraphs, ${totalChars} total chars \u2714`);
  return true;
}

// ──────────────────────────────────────────────
// VERIFY ENGLISH RECORD EXISTS (safety check)
// ──────────────────────────────────────────────

console.log("\n\u{1F50D} Verifying English source record exists...");
const englishCheck = await docClient.send(
  new GetCommand({
    TableName: TABLE,
    Key: { siteId: "thermopylae", langStoryId: "en#ephialtes-betrayal" },
    ProjectionExpression: "siteId, langStoryId, title, lang",
  })
);

if (!englishCheck.Item) {
  console.error("\u274C English source record not found! Aborting.");
  process.exit(1);
}
console.log(`  English record confirmed: "${englishCheck.Item.title}" \u2714\n`);

// ──────────────────────────────────────────────
// VALIDATE ALL
// ──────────────────────────────────────────────

console.log("\u{1F9EA} Validating JSON records...");
const items = [
  { label: "Spanish (es)", item: spanish },
  { label: "French (fr)", item: french },
  { label: "German (de)", item: german },
];

let allValid = true;
for (const { label, item } of items) {
  if (!validate(item, label)) allValid = false;
}

if (!allValid) {
  console.error("\n\u274C Validation failed. Fix errors above before pushing.");
  process.exit(1);
}

console.log("\n\u2705 All records valid.\n");

// ──────────────────────────────────────────────
// PUSH TO DYNAMODB
// ──────────────────────────────────────────────

for (const { label, item } of items) {
  console.log(`Pushing ${label}...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
      })
    );
    console.log(`  \u2705 ${label} pushed successfully: "${item.title}"`);
  } catch (err) {
    console.error(`  \u274C FAILED for ${label}: ${err.message}`);
    console.error(`     Full error:`, err);
    process.exit(1);
  }
}

console.log("\n\u{1F3C1} All three language versions pushed successfully.");
console.log(`   Updated at: ${TIMESTAMP} (${new Date(TIMESTAMP * 1000).toISOString()})`);
