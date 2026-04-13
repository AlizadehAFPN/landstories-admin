// Push Spanish, French, and German recreations of "The Lovers of Pompeii"
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
  siteId: "pompeii",
  storyId: "lovers-of-pompeii",
  icon: "\u{1F494}", // 💔
  storyCategory: "lost_found",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 40.749, lng: 14.4875 },
  source:
    "Lazer, Estelle. Resurrecting Pompeii, 2009; University of Florence DNA study, 2017; National Geographic coverage",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb subverted: "No hay mal que cien años dure"
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#lovers-of-pompeii",

  title: "Los amantes de Pompeya",

  subtitle:
    "Un abrazo que sobrevivió al volcán — y al siglo que tardamos en entenderlo",

  excerpt:
    "En el año 79, el Vesubio reventó y sepultó Pompeya bajo ceniza volcánica y gases ardientes. Miles murieron sin tiempo siquiera de dar un paso.",

  moralOrLesson:
    "Da igual la forma que tome el cariño: es lo último que buscamos cuando todo se derrumba — y las historias que contamos sobre los muertos dicen más de nosotros que de ellos.",

  era: "79 d. C. (reanalizado en 2017)",

  characters: [
    "Las dos figuras abrazadas (varones no identificados, 18-20 años)",
  ],

  paragraphs: [
    {
      text: "En el año 79, el Vesubio reventó. Una avalancha de ceniza y gases a cientos de grados sepultó Pompeya en cuestión de horas. Miles murieron sin tiempo siquiera de dar un paso. Siglos después, los arqueólogos descubrieron que los cuerpos habían dejado huecos en la ceniza petrificada. Al rellenarlos con yeso, podían recrear a los muertos justo como cayeron. De entre cientos de esos moldes, uno dejó al mundo sin aliento: dos figuras abrazadas, una protegiendo a la otra, aferradas mientras todo se acababa.",
    },
    {
      text: "Durante más de cien años, todo el mundo las llamó «Las Dos Doncellas». La historia parecía obvia: dos mujeres jóvenes — quizá hermanas, quizá madre e hija — abrazándose mientras llegaba la muerte. La pose era tierna, los cuerpos parecían delicados, y los estudiosos del siglo XIX nunca se plantearon cuestionarlo. Generaciones de guías turísticos repitieron lo mismo. Las Dos Doncellas se convirtieron en uno de los símbolos más famosos de Pompeya: una imagen de devoción congelada en ceniza.",
    },
    {
      text: "Entonces, en 2017, un equipo de la Universidad de Florencia les hizo tomografías y análisis de ADN — tecnología que simplemente no existía cuando las figuras se descubrieron. Los resultados demolieron más de un siglo de certezas. Las Dos Doncellas no eran doncellas. Ni siquiera eran mujeres. Ambas figuras eran hombres jóvenes, de entre dieciocho y veinte años. Dos chicos abrazados mientras el volcán mataba a todos a su alrededor.",
    },
    {
      text: "La noticia dio la vuelta al mundo. La pregunta obvia llegó enseguida: ¿qué eran el uno para el otro? La ciencia no podía responder eso. Podían haber sido hermanos. Amigos íntimos. Amantes. En la Roma antigua, las relaciones sentimentales y sexuales entre hombres eran habituales y se vivían abiertamente — aunque la sociedad imponía reglas estrictas según la clase social. Estos dos podían haber sido cualquier cosa entre sí. La ceniza conservó sus cuerpos, no su historia.",
    },
    {
      text: "Pero hay algo que la pose dice por sí sola: cuando el cielo se volvió negro y el aire se convirtió en veneno, estos dos no salieron corriendo cada uno por su lado. Se buscaron. Uno se enroscó alrededor del otro, con la cara pegada a su cuerpo, los brazos bien apretados. Es un gesto que no necesita etiqueta. Los hermanos hacen esto. Los amigos hacen esto. Los amantes hacen esto. Dos personas que se niegan a dejar morir solo a alguien que quieren — eso es lo que hay aquí.",
    },
    {
      text: "Dicen que no hay mal que cien años dure. Pero este error duró más de cien. Y resultó ser una lección en sí mismo: una historia sobre cómo vemos lo que esperamos ver. Los académicos del siglo XIX vieron ternura y asumieron «mujeres». Ni se les pasó por la cabeza que dos hombres pudieran abrazarse así. La confusión dice más de quienes interpretaron que de las dos figuras en la ceniza.",
    },
    {
      text: "Hoy los llaman a veces «Los Amantes de Pompeya», aunque ningún nombre oficial se atreve a tanto. Cada generación lee ese abrazo con sus propios ojos. Pero la imagen no cambia. Dos hombres jóvenes, apenas pasada la adolescencia, enroscados el uno en el otro la última mañana de sus vidas. Da igual cómo lo llames — hermandad, amistad, amor — a la ceniza le da igual. Se aferraron. Y esa es toda la historia.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb subverted: "On ne voit bien qu'avec le cœur" (Le Petit Prince)
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#lovers-of-pompeii",

  title: "Les Amants de Pompéi",

  subtitle:
    "Une étreinte qui a survécu au volcan — et au siècle qui l'a mal comprise",

  excerpt:
    "En l'an 79, le Vésuve a explosé et a enseveli Pompéi sous les cendres et les gaz brûlants. Des milliers de gens sont morts sans avoir le temps de faire un pas.",

  moralOrLesson:
    "Peu importe la forme que prend l'amour : c'est la dernière chose qu'on cherche quand tout s'effondre — et les histoires qu'on raconte sur les morts en disent plus sur nous que sur eux.",

  era: "79 apr. J.-C. (réanalysé en 2017)",

  characters: [
    "Les deux silhouettes enlacées (hommes non identifiés, 18-20 ans)",
  ],

  paragraphs: [
    {
      text: "En l'an 79, le Vésuve a explosé. Une avalanche de cendres et de gaz brûlants a enseveli Pompéi en quelques heures. Des milliers de gens sont morts sans avoir le temps de faire un pas. Des siècles plus tard, les archéologues ont découvert que les corps avaient laissé des creux dans la cendre durcie — et qu'en y coulant du plâtre, on pouvait reconstituer les morts tels qu'ils étaient tombés. Parmi des centaines de ces moulages, un seul a coupé le souffle au monde : deux silhouettes enlacées, l'une protégeant l'autre, agrippées tandis que tout prenait fin.",
    },
    {
      text: "Pendant plus d'un siècle, tout le monde les a appelées « Les Deux Jeunes Filles ». L'histoire semblait évidente : deux femmes — peut-être des sœurs, peut-être une mère et sa fille — serrées l'une contre l'autre face à la mort. La pose était tendre, les corps semblaient délicats, et les savants du XIXe siècle n'ont jamais songé à remettre ça en question. Des générations de guides ont répété la même chose. Les Deux Jeunes Filles sont devenues l'un des symboles les plus célèbres de Pompéi — une image de tendresse figée dans la cendre.",
    },
    {
      text: "Et puis, en 2017, une équipe de l'université de Florence a soumis les moulages à des scanners et des analyses ADN — des technologies qui n'existaient tout simplement pas à l'époque de leur découverte. Les résultats ont fait voler en éclats plus d'un siècle de certitudes. Les Deux Jeunes Filles n'étaient pas des jeunes filles. Pas même des femmes. Les deux silhouettes étaient des hommes, jeunes — autour de dix-huit à vingt ans. Deux garçons enlacés pendant que le volcan tuait tout le monde autour d'eux.",
    },
    {
      text: "La nouvelle a fait le tour du monde. La question évidente est tombée aussitôt : qu'étaient-ils l'un pour l'autre ? La science ne pouvait pas répondre. Ils pouvaient être frères. Amis proches. Amants. Dans la Rome antique, les relations amoureuses et sexuelles entre hommes étaient courantes et assumées — même si la société imposait des règles strictes selon le rang social. Ces deux-là pouvaient être n'importe quoi l'un pour l'autre. La cendre a conservé leurs corps, pas leur histoire.",
    },
    {
      text: "Mais il y a ce que la pose elle-même raconte : quand le ciel est devenu noir et que l'air s'est changé en poison, ces deux-là n'ont pas fui chacun de son côté. Ils se sont cherchés. L'un s'est enroulé autour de l'autre, le visage pressé contre son corps, les bras serrés. C'est un geste qui n'a pas besoin d'étiquette. Des frères font ça. Des amis font ça. Des amants font ça. Deux personnes qui refusent de laisser quelqu'un qu'elles aiment mourir seul — voilà ce que c'est.",
    },
    {
      text: "« On ne voit bien qu'avec le cœur », disait le renard du Petit Prince. Mais pendant cent ans, même le cœur n'a rien vu. Les savants du XIXe siècle ont vu de la tendresse et en ont conclu « des femmes ». Il ne leur est jamais venu à l'esprit que deux hommes puissent s'étreindre ainsi. L'erreur de cent ans est devenue sa propre leçon : elle en dit plus sur ceux qui ont interprété que sur les deux silhouettes dans la cendre.",
    },
    {
      text: "Aujourd'hui, on les appelle parfois « Les Amants de Pompéi », même si aucun nom officiel ne s'y engage. Chaque génération lit cette étreinte à travers ses propres yeux. Mais l'image, elle, ne change pas. Deux jeunes hommes, à peine sortis de l'adolescence, enroulés l'un autour de l'autre le dernier matin de leur vie. Peu importe le mot qu'on y met — fraternité, amitié, amour — la cendre s'en fiche. Ils ne se sont pas lâchés. C'est toute l'histoire.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb subverted: "Der Schein trügt"
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#lovers-of-pompeii",

  title: "Die Liebenden von Pompeji",

  subtitle:
    "Eine Umarmung, die den Vulkan überdauerte — und das Jahrhundert, das sie falsch verstand",

  excerpt:
    "Im Jahr 79 explodierte der Vesuv und begrub Pompeji unter Vulkanasche und glühend heißen Gasen. Tausende starben, ohne auch nur einen Schritt tun zu können.",

  moralOrLesson:
    "Egal, welche Form Liebe annimmt — sie ist das Letzte, wonach wir greifen, wenn alles andere verloren ist. Und die Geschichten, die wir über die Toten erzählen, sagen mehr über uns als über sie.",

  era: "79 n. Chr. (neu analysiert 2017)",

  characters: [
    "Die zwei umschlungenen Gestalten (nicht identifizierte Männer, 18–20 Jahre)",
  ],

  paragraphs: [
    {
      text: "Im Jahr 79 explodierte der Vesuv. Eine Lawine aus Vulkanasche und glühend heißen Gasen begrub Pompeji innerhalb weniger Stunden. Tausende starben, ohne auch nur einen Schritt tun zu können. Jahrhunderte später entdeckten Archäologen, dass die Körper Hohlräume in der erhärteten Asche hinterlassen hatten — und dass man durch Ausgießen mit Gips die Toten genau so nachbilden konnte, wie sie gefallen waren. Unter Hunderten dieser verstörenden Abgüsse war einer, der die Welt innehalten ließ: zwei Gestalten in einer Umarmung, eine die andere schützend, aneinander geklammert, während alles endete.",
    },
    {
      text: "Über hundert Jahre lang nannte man sie \u201EDie zwei Mädchen\u201C. Die Geschichte schien offensichtlich: zwei junge Frauen — vielleicht Schwestern, vielleicht Mutter und Tochter — die sich aneinanderklammerten, als der Tod kam. Die Haltung wirkte zärtlich, die Körper wirkten zierlich, und die Gelehrten des 19. Jahrhunderts kamen nie auf die Idee, das infrage zu stellen. Generationen von Stadtführern erzählten dasselbe. Die Zwei Mädchen wurden zu einem der berühmtesten Symbole Pompejis — ein Bild der Hingabe, eingefroren in Asche.",
    },
    {
      text: "Dann, 2017, unterzog ein Team der Universität Florenz die Abgüsse CT-Scans und DNA-Tests — Technologie, die es bei ihrer Entdeckung schlicht nicht gab. Die Ergebnisse zertrümmerten mehr als ein Jahrhundert an Gewissheiten. Die Zwei Mädchen waren keine Mädchen. Nicht einmal Frauen. Beide Gestalten waren Männer. Jung — zwischen achtzehn und zwanzig Jahre alt. Zwei junge Männer, die sich umarmten, während der Vulkan alle um sie herum tötete.",
    },
    {
      text: "Die Nachricht ging um die Welt. Die naheliegende Frage kam sofort: Was waren diese beiden füreinander? Die Wissenschaft konnte das nicht beantworten. Sie könnten Brüder gewesen sein. Enge Freunde. Liebende. Im antiken Rom waren romantische und sexuelle Beziehungen zwischen Männern verbreitet und offen anerkannt — auch wenn die Gesellschaft strenge Regeln nach Stand und Klasse hatte. Diese beiden konnten alles füreinander gewesen sein. Die Asche hat ihre Körper bewahrt, nicht ihre Geschichte.",
    },
    {
      text: "Aber die Haltung selbst erzählt etwas: Als der Himmel schwarz wurde und die Luft zu Gift, rannten diese beiden nicht in verschiedene Richtungen davon. Sie suchten einander. Einer legte sich schützend um den anderen, das Gesicht an seinen Körper gepresst, die Arme fest um ihn geschlungen. Es ist eine Geste, die kein Etikett braucht. Brüder tun das. Freunde tun das. Liebende tun das. Zwei Menschen, die jemanden, der ihnen etwas bedeutet, nicht allein sterben lassen — das ist es, was hier vor uns liegt.",
    },
    {
      text: "Man sagt, der Schein trügt. Diesmal hat er ein ganzes Jahrhundert lang getrogen — und der Irrtum wurde zur eigenen Lektion. Eine Geschichte darüber, wie wir sehen, was wir erwarten. Die Gelehrten des 19. Jahrhunderts sahen Zärtlichkeit und schlossen auf \u201EFrauen\u201C. Es kam ihnen nicht einmal in den Sinn, dass zwei Männer sich so halten könnten. Die Verwechslung sagt mehr über die Betrachter als über die zwei Gestalten in der Asche.",
    },
    {
      text: "Heute nennt man sie manchmal \u201EDie Liebenden von Pompeji\u201C, auch wenn kein offizieller Name sich so weit vorwagt. Jede Generation liest diese Umarmung mit eigenen Augen. Aber das Bild ändert sich nicht. Zwei junge Männer, kaum über die Jugend hinaus, ineinander verschlungen am letzten Morgen ihres Lebens. Egal, wie man es nennt — Brüderlichkeit, Freundschaft, Liebe — der Asche ist es gleich. Sie hielten sich fest. Das ist die ganze Geschichte.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23F3 Pushing ${label} ...`);

  // Quick JSON validation: make sure it round-trips cleanly
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
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
  console.log("\u2550\u2550\u2550 Pushing Lovers of Pompeii translations to DynamoDB \u2550\u2550\u2550");
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
          `\u26A0\uFE0F  ${rec.lang} paragraph ${i + 1}: ${chars} chars (over 500 limit)`
        );
      }
    }
    console.log(
      `\n\uD83D\uDCCA ${rec.lang}: ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(es);
  await pushStory(fr);
  await pushStory(de);

  console.log("\n\u2550\u2550\u2550 All three translations pushed successfully \u2550\u2550\u2550");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
