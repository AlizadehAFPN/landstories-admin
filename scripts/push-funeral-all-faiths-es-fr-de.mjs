import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ── Shared fields (unchanged from English) ──────────────────────────────────
const base = {
  siteId: "mevlana-museum",
  storyId: "funeral-all-faiths",
  storyCategory: "prophets_pilgrims",
  icon: "\u{1F91D}",
  tier: "A",
  source: "Historical accounts, Aflaki",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  hasAudio: false,
  disabled: false,
  isFree: true,
  coordinates: { lat: 37.8719, lng: 32.5047 },
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════════════════════
//  SPANISH (es)
// ═══════════════════════════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#funeral-all-faiths",
  title: "El funeral que unió a todas las religiones",
  subtitle: "Cuando musulmanes, cristianos, judíos y zoroastrianos lloraron juntos",
  excerpt:
    "El 17 de diciembre de 1273, algo imposible ocurrió en Konya. Murió Rumi, y las calles se llenaron de gente de todas las religiones. Nadie los convocó. Simplemente vinieron.",
  moralOrLesson:
    "La verdadera espiritualidad no conoce fronteras religiosas. El amor es universal, y lo divino habla a todos los corazones sin importar el camino que sigan.",
  era: "17 de diciembre de 1273",
  characters: [
    "Rumi",
    "Fieles musulmanes",
    "Fieles cristianos",
    "Fieles judíos",
    "Fieles zoroastrianos",
  ],
  paragraphs: [
    {
      text: "El 17 de diciembre de 1273, algo imposible ocurrió en Konya, una ciudad de la Anatolia medieval —lo que hoy es Turquía central. Murió Rumi, el poeta y místico más célebre del mundo islámico, y las calles se desbordaron de gente. Pero no solo de musulmanes. Cristianos, judíos y zoroastrianos —seguidores de la antigua religión persa— acudieron en masa a llorar su muerte. Nadie los convocó. Nadie los obligó. Simplemente vinieron.",
    },
    {
      text: "En medio del cortejo fúnebre, un sacerdote cristiano se acercó a un erudito musulmán y le preguntó: «¿Por qué estás aquí? Era un santo musulmán.» La respuesta fue sencilla y directa: «Vinimos a honrar a un hombre que nos demostró que todos los caminos llevan a la misma verdad.» Un judío, ante la misma pregunta, contestó sin dudar: «Nos enseñó que el amor está por encima de cualquier religión. También fue nuestro maestro.»",
    },
    {
      text: "Cuando alguien presionó aún más a los no musulmanes —pero de verdad, ¿por qué están aquí?— la respuesta fue demoledora: «Él también fue nuestro sol. Aprendimos más de nuestras propias escrituras gracias a él que de nuestros propios maestros. Encontramos en él las señales de un profeta y de un santo.» No era retórica. No era cortesía. Lo decían con la convicción de quien ha tocado algo sagrado.",
    },
    {
      text: "El cortejo fúnebre era un espectáculo que desafiaba toda lógica de la época. Adelante iban los portaestandartes, los recitadores del Corán y los incensarios portátiles, con el cuerpo de Rumi envuelto en un sudario blanco sobre un féretro decorado. Pero justo detrás marchaban cruces cristianas. Se escuchaban oraciones judías. Se veían símbolos zoroastrianos. Cada grupo rezaba a su manera, y sin embargo, todos rezaban por lo mismo.",
    },
    {
      text: "Hay un dicho que dice: «Dios los cría y ellos se juntan», y se usa para hablar de gente parecida que se encuentra. Pero aquel día en Konya, Dios los había criado distintos —cuatro religiones, cuatro lenguas sagradas, cuatro maneras de entender lo divino— y aun así, se juntaron. Porque el amor que sentían por aquel hombre era más fuerte que cualquier frontera que sus propias tradiciones habían levantado entre ellos.",
    },
    {
      text: "La propia filosofía de Rumi lo explica mejor que cualquier crónica: «Miré con los mismos ojos al musulmán, al judío y al cristiano.» No fue solo una frase bonita. Fue algo que vivió con tanta intensidad que convenció a miles de personas de cuatro religiones distintas de que él los entendía mejor que sus propios líderes espirituales.",
    },
    {
      text: "Ese funeral no fue un milagro religioso. Fue algo más raro todavía: un milagro humano. En plena Edad Media, en tiempos de cruzadas y guerras santas, un poeta sufí logró lo que ningún tratado de paz había conseguido. No unió a las religiones con argumentos. Las unió con algo mucho más simple y mucho más difícil: amor sin condiciones. Y por un día, en una sola ciudad, las fronteras entre religiones simplemente dejaron de existir.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
//  FRENCH (fr)
// ═══════════════════════════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#funeral-all-faiths",
  title: "Les funérailles qui ont réuni toutes les religions",
  subtitle:
    "Quand musulmans, chrétiens, juifs et zoroastriens ont pleuré ensemble",
  excerpt:
    "Le 17 décembre 1273, quelque chose d'inédit s'est produit à Konya. Rumi venait de mourir, et des fidèles de toutes les religions sont venus spontanément lui rendre hommage.",
  moralOrLesson:
    "La vraie spiritualité transcende les frontières religieuses. L'amour est universel, et le divin parle à tous les cœurs, quel que soit leur chemin.",
  era: "17 décembre 1273",
  characters: [
    "Rumi",
    "Fidèles musulmans",
    "Fidèles chrétiens",
    "Fidèles juifs",
    "Fidèles zoroastriens",
  ],
  paragraphs: [
    {
      text: "Le 17 décembre 1273, quelque chose d'inédit s'est produit dans les rues de Konya, une ville d'Anatolie médiévale — l'actuelle Turquie. Rumi, le plus grand poète et mystique du monde islamique, venait de mourir. Et la ville entière a pleuré. Mais pas seulement les musulmans. Des chrétiens, des juifs et des zoroastriens — fidèles de l'ancienne religion perse — sont venus spontanément se joindre au deuil. Personne ne les avait invités. Ils sont venus d'eux-mêmes.",
    },
    {
      text: "Au milieu de la procession funéraire, un prêtre chrétien s'est approché d'un érudit musulman : « Pourquoi êtes-vous là ? C'était un saint musulman. » La réponse fut simple : « Nous sommes venus honorer un homme qui nous a montré que tous les chemins mènent à la même vérité. » Un juif, face à la même question, a répondu sans hésiter : « Il nous a appris que l'amour dépasse toute religion. Il était notre maître à nous aussi. »",
    },
    {
      text: "Quand on a insisté auprès des non-musulmans — mais enfin, pourquoi êtes-vous vraiment là ? — la réponse a été saisissante : « Il était notre soleil à nous aussi. Nous avons appris davantage sur nos propres écritures grâce à lui que grâce à nos propres maîtres. Nous avons vu en lui les signes d'un prophète et d'un saint. » Ce n'était pas de la politesse. C'était une conviction profonde.",
    },
    {
      text: "Le cortège funèbre défiait toute logique de l'époque. En tête marchaient les porte-étendards et les récitants du Coran, avec des encensoirs et le corps de Rumi enveloppé d'un linceul blanc sur un brancard décoré. Mais juste derrière suivaient des croix chrétiennes. On entendait des prières juives. On apercevait des symboles zoroastriens. Chaque groupe priait à sa façon, et pourtant, tous priaient pour la même chose.",
    },
    {
      text: "On dit « jamais deux sans trois ». Ce jour-là à Konya, il fallait aller plus loin : jamais trois sans quatre. Quatre religions, quatre langues sacrées, quatre manières de comprendre le divin — réunies autour d'un seul cercueil. Parce que l'amour qu'ils portaient à cet homme était plus fort que toutes les frontières que leurs propres traditions avaient dressées entre eux.",
    },
    {
      text: "La philosophie de Rumi résume mieux cette journée que n'importe quelle chronique : « J'ai regardé avec les mêmes yeux le musulman, le juif et le chrétien. » Ce n'était pas qu'une belle formule. C'était une réalité vécue avec une telle intensité qu'elle a convaincu des milliers de fidèles de quatre religions différentes qu'il les comprenait mieux que leurs propres guides spirituels.",
    },
    {
      text: "Ces funérailles ne furent pas un miracle religieux. Ce fut quelque chose de plus rare encore : un miracle humain. En plein Moyen Âge, à l'époque des croisades et des guerres saintes, un poète soufi a accompli ce qu'aucun traité de paix n'avait réussi. Il n'a pas uni les religions par des arguments. Il les a unies par quelque chose de bien plus simple et de bien plus difficile : un amour sans conditions. Et ce jour-là, dans une seule ville, les frontières entre les religions ont tout simplement cessé d'exister.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
//  GERMAN (de)
// ═══════════════════════════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#funeral-all-faiths",
  title: "Das Begräbnis, das alle Religionen vereinte",
  subtitle: "Als Muslime, Christen, Juden und Zoroastrier gemeinsam trauerten",
  excerpt:
    "Am 17. Dezember 1273 geschah in Konya etwas, das es so noch nie gegeben hatte. Rumi war gestorben — und Trauernde aller Religionen kamen, um gemeinsam Abschied zu nehmen.",
  moralOrLesson:
    "Wahre Spiritualität kennt keine religiösen Grenzen. Die Liebe ist universal, und das Göttliche spricht zu allen Herzen — unabhängig davon, welchen Weg sie gehen.",
  era: "17. Dezember 1273",
  characters: [
    "Rumi",
    "Muslimische Trauernde",
    "Christliche Trauernde",
    "Jüdische Trauernde",
    "Zoroastrische Trauernde",
  ],
  paragraphs: [
    {
      text: "Am 17. Dezember 1273 geschah in Konya — einer Stadt im mittelalterlichen Anatolien, der heutigen Türkei — etwas, das es so noch nie gegeben hatte. Rumi, der berühmteste Dichter und Mystiker der islamischen Welt, war gestorben. Und die Straßen füllten sich mit Trauernden. Aber nicht nur mit Muslimen. Christen, Juden und Zoroastrier — Anhänger der alten persischen Religion — kamen, um gemeinsam zu trauern. Niemand hatte sie eingeladen. Sie kamen einfach.",
    },
    {
      text: "Mitten im Trauerzug sprach ein christlicher Priester einen muslimischen Gelehrten an: \u201EWarum seid Ihr hier? Er war ein muslimischer Heiliger.\u201C Die Antwort war schlicht: \u201EWir sind gekommen, um einen Mann zu ehren, der uns gezeigt hat, dass alle Wege zur selben Wahrheit führen.\u201C Ein Jude, dem dieselbe Frage gestellt wurde, antwortete ohne zu zögern: \u201EEr hat uns gelehrt, dass die Liebe über jeder Religion steht. Er war auch unser Lehrer.\u201C",
    },
    {
      text: "Als man die Nicht-Muslime noch direkter fragte — aber warum seid ihr wirklich hier? —, war die Antwort überwältigend: \u201EEr war auch unsere Sonne. Wir haben durch ihn mehr über unsere eigenen Schriften gelernt als durch unsere eigenen Lehrer. Wir haben in ihm die Zeichen eines Propheten und eines Heiligen erkannt.\u201C Das war keine Höflichkeit. Das war tiefste Überzeugung.",
    },
    {
      text: "Der Trauerzug selbst war ein Bild, das jeder Logik der Zeit widersprach. Vorne gingen die Fahnenträger, begleitet von Koranrezitationen, mit tragbaren Weihrauchgefäßen und Rumis Leichnam in einem weißen Leichentuch auf einer geschmückten Bahre. Doch direkt dahinter folgten christliche Kreuze. Man hörte jüdische Gebete. Man sah zoroastrische Symbole. Jede Gruppe betete auf ihre Weise — und doch beteten alle für dasselbe.",
    },
    {
      text: "Man sagt: Aller guten Dinge sind drei. An jenem Tag in Konya waren es vier. Vier Religionen, vier heilige Sprachen, vier Wege, das Göttliche zu verstehen — vereint vor einem einzigen Sarg. Denn die Liebe, die sie für diesen Mann empfanden, war stärker als alle Grenzen, die ihre eigenen Traditionen zwischen ihnen errichtet hatten.",
    },
    {
      text: "Rumis eigene Philosophie fasst diesen Tag besser zusammen als jede Chronik: \u201EIch habe mit denselben Augen auf den Muslim, den Juden und den Christen geblickt.\u201C Das war nicht bloß ein schöner Satz. Es war eine Haltung, die er so intensiv lebte, dass Tausende Menschen aus vier verschiedenen Religionen überzeugt waren: Dieser Mann versteht uns besser als unsere eigenen geistlichen Führer.",
    },
    {
      text: "Dieses Begräbnis war kein religiöses Wunder. Es war etwas noch Selteneres: ein menschliches Wunder. Mitten im Mittelalter, in einer Zeit der Kreuzzüge und Glaubenskriege, gelang einem sufischen Dichter, was kein Friedensvertrag geschafft hatte. Er einte die Religionen nicht mit Argumenten. Er einte sie mit etwas viel Einfacherem und viel Schwererem: bedingungsloser Liebe. Und an diesem einen Tag, in dieser einen Stadt, hörten die Grenzen zwischen den Religionen einfach auf zu existieren.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
//  PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════
async function pushStory(story) {
  const label = `${story.lang.toUpperCase()} → ${story.langStoryId}`;
  console.log(`\n⏳ Pushing ${label} ...`);

  // Validate JSON structure before pushing
  const requiredFields = [
    "siteId", "langStoryId", "lang", "title", "subtitle",
    "excerpt", "moralOrLesson", "paragraphs", "storyId",
  ];
  for (const f of requiredFields) {
    if (!story[f]) throw new Error(`Missing required field: ${f}`);
  }
  if (!Array.isArray(story.paragraphs) || story.paragraphs.length === 0) {
    throw new Error("paragraphs must be a non-empty array");
  }
  for (let i = 0; i < story.paragraphs.length; i++) {
    if (!story.paragraphs[i].text) {
      throw new Error(`paragraph[${i}] is missing .text`);
    }
    if (story.paragraphs[i].text.length > 500) {
      console.warn(`  ⚠️  paragraph[${i}] is ${story.paragraphs[i].text.length} chars (limit 500)`);
    }
  }

  await docClient.send(
    new PutCommand({ TableName: TABLE, Item: story })
  );

  console.log(`✅ ${label} pushed successfully (${story.paragraphs.length} paragraphs, updatedAt=${story.updatedAt})`);
}

async function main() {
  try {
    await pushStory(es);
    await pushStory(fr);
    await pushStory(de);
    console.log("\n🎉 All 3 language versions pushed successfully!\n");
  } catch (err) {
    console.error("\n❌ PUSH FAILED:", err.message);
    console.error(err);
    process.exit(1);
  }
}

main();
