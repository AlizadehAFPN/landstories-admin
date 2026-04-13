import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TIMESTAMP = Math.floor(Date.now() / 1000).toString();

// Shared fields (unchanged from English)
const shared = {
  siteId: { S: "neuschwanstein-castle" },
  storyId: { S: "swan-knight-lohengrin" },
  icon: { S: "\uD83E\uDDA2" },
  tier: { S: "A" },
  source: {
    S: "Wagner, Richard. Lohengrin, WWV 75, premiered 1850; Wolfram von Eschenbach, Parzival (c. 1200-1210); McIntosh, Christopher. The Swan King, 2012",
  },
  characters: {
    L: [
      { S: "Lohengrin (the Swan Knight)" },
      { S: "Elsa of Brabant" },
      { S: "Parsifal (Lohengrin's father)" },
      { S: "Ortrud (the sorceress)" },
      { S: "King Ludwig II of Bavaria" },
      { S: "Richard Wagner" },
    ],
  },
  era: { S: "Medieval legend, 19th century revival" },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: { M: { lng: { N: "10.7498" }, lat: { N: "47.5576" } } },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "love_heartbreak" },
  updatedAt: { N: TIMESTAMP },
};

function makeParagraphs(texts) {
  return { L: texts.map((t) => ({ M: { text: { S: t } } })) };
}

// ──────────────────────────────────────────────
// SPANISH (es)
// Proverb: "Más vale malo conocido que bueno por conocer"
// ──────────────────────────────────────────────
const spanish = {
  ...shared,
  lang: { S: "es" },
  langStoryId: { S: "es#swan-knight-lohengrin" },

  title: { S: "El caballero del cisne" },

  subtitle: {
    S: "La leyenda medieval que obsesionó a un rey y se convirtió en castillo",
  },

  excerpt: {
    S: "La historia es medieval, pero la versión que lo cambió todo llegó en 1850, cuando Richard Wagner la convirtió en ópera y la clavó en la memoria de Europa para siempre.",
  },

  paragraphs: makeParagraphs([
    "La historia es medieval, pero la versión que lo cambió todo llegó en 1850, cuando Richard Wagner la convirtió en ópera y la clavó en la memoria de Europa para siempre. Estamos en el año 933. Una joven noble llamada Elsa de Brabante es acusada de asesinar a su propio hermano. Es mentira — su hermano fue convertido en cisne por una hechicera llamada Ortrud, que mueve los hilos en la sombra. Pero nadie lo sabe. Elsa está sola, sin defensor, y la condena a muerte ya está dictada.",

    "Entonces aparece un bote en el río. No lo mueven remos ni viento — lo arrastra un cisne blanco. De pie en la proa hay un caballero con armadura de plata que parece llegar de otro mundo. Desembarca, se declara campeón de Elsa y gana el combate. Se casan. Pero hay una condición, y no admite discusión: ella nunca puede preguntarle quién es ni de dónde viene. Si lo hace, él desaparece para siempre.",

    "Durante un tiempo, todo funciona. El caballero gobierna Brabante con sabiduría y ama a Elsa de verdad. Pero Ortrud no ha terminado. Noche tras noche le susurra lo mismo: ¿Quién es este hombre? ¿Qué esposa no sabe ni el nombre de su marido? Ya se sabe — más vale malo conocido que bueno por conocer. Ortrud convirtió ese refrán en un arma. La duda empieza como un murmullo, pero los murmullos que no paran terminan gritando.",

    "La noche de bodas, Elsa se quiebra. Hace la pregunta prohibida: ¿Quién eres? ¿De dónde vienes? El rostro del caballero se llena de tristeza. Se llama Lohengrin — hijo de Parsifal, caballero del Santo Grial, la orden más sagrada de la cristiandad. El Grial lo envió a protegerla, pero su poder necesita una sola cosa: fe ciega. Cuando dudas, la magia muere. Lohengrin llama al bote, reza sobre el cisne, que se transforma en el hermano perdido de Elsa — vivo. Después se aleja para siempre. Elsa muere de pena.",

    "En 1861, un príncipe bávaro de quince años llamado Ludwig se sentó en un teatro de Múnich y vio el Lohengrin de Wagner por primera vez. Salió destrozado. Lloró durante toda la función y después escribió que fue la experiencia que le definió la juventud. Pero Ludwig no solo admiró a Lohengrin — se convirtió en él. También era extraño, hermoso e imposible de explicar. También ponía condiciones imposibles al amor. También habría preferido desaparecer antes que dejar que el mundo lo desnudara.",

    "Ludwig fue coronado rey de Baviera en 1864, con dieciocho años. Y la leyenda saltó de su cabeza a la piedra. Construyó Neuschwanstein — un castillo de cuento colgado de un acantilado en los Alpes — y lo llenó de cisnes. Pintados en paredes, tallados en muebles, esculpidos en fuentes. El nombre significa «Nueva Piedra del Cisne». No era decoración. Era una declaración: el caballero del cisne renacido, pidiendo solo que lo dejaran a solas con la belleza — listo para desaparecer en cuanto el mundo exigiera explicaciones.",

    "Y el mundo las exigió. En 1886, su propio gobierno lo declaró demente y lo apartó del trono. Días después apareció muerto en las aguas poco profundas del lago Starnberg — ahogado en circunstancias que nadie ha logrado explicar del todo. Como Lohengrin, se desvaneció. Dejó atrás un castillo blanco en la cima de una montaña y una pregunta que sigue sin respuesta.",
  ]),

  moralOrLesson: {
    S: "La fe pide que no hagas ciertas preguntas. Pero la naturaleza humana te obliga a hacerlas. La tragedia no está en preguntar — está en que el amor construido sobre el misterio no sobrevive a la verdad.",
  },
};

// ──────────────────────────────────────────────
// FRENCH (fr)
// Proverb: "La curiosité est un vilain défaut"
// ──────────────────────────────────────────────
const french = {
  ...shared,
  lang: { S: "fr" },
  langStoryId: { S: "fr#swan-knight-lohengrin" },

  title: { S: "Le Chevalier au cygne" },

  subtitle: {
    S: "La légende médiévale qui a poussé un roi à bâtir un château de conte de fées",
  },

  excerpt: {
    S: "L'histoire remonte au Moyen Âge, mais c'est Richard Wagner qui l'a gravée dans la mémoire de l'Europe en 1850, en la transformant en opéra.",
  },

  paragraphs: makeParagraphs([
    "L'histoire remonte au Moyen Âge, mais c'est Richard Wagner qui l'a gravée dans la mémoire de l'Europe en 1850, en la transformant en opéra. On est en 933. Une jeune noble, Elsa de Brabant, est accusée d'avoir tué son propre frère. C'est faux — son frère a été changé en cygne par une sorcière du nom d'Ortrud, qui tire les ficelles dans l'ombre. Mais personne ne le sait. Elsa est seule, sans défenseur, et sa condamnation à mort est déjà scellée.",

    "C'est alors qu'une barque apparaît sur le fleuve. Ni rames, ni voile — un cygne blanc la tire. Debout à la proue, un chevalier en armure d'argent, lumineux comme s'il venait d'un autre monde. Il débarque, se déclare champion d'Elsa et remporte le combat. Il l'épouse. Mais il pose une condition, et elle est non négociable : elle ne doit jamais lui demander son nom ni d'où il vient. Le jour où elle le fera, il disparaîtra pour toujours.",

    "Pendant un temps, ça marche. Le chevalier gouverne le Brabant avec sagesse et aime Elsa sincèrement. Mais Ortrud n'en a pas fini. Nuit après nuit, elle distille le même poison : Qui est cet homme que tu as épousé ? Quelle femme ne connaît même pas le nom de son mari ? On dit bien que la curiosité est un vilain défaut. Ortrud, elle, en avait fait une arme. Le doute commence comme un murmure. Mais un murmure qui ne s'arrête jamais finit toujours par exploser.",

    "Le soir des noces, Elsa cède. Elle pose la question interdite : Qui es-tu ? D'où viens-tu ? Le visage du chevalier se voile de tristesse. Son nom est Lohengrin — fils de Parsifal, chevalier du Saint-Graal. Le Graal l'a envoyé protéger Elsa, mais sa magie ne tient qu'à une chose : la foi absolue. Au premier doute, tout s'effondre. Lohengrin rappelle la barque, prie sur le cygne — qui redevient le frère perdu d'Elsa, vivant. Puis il s'éloigne pour toujours. Elsa le regarde disparaître et meurt de chagrin.",

    "En 1861, un prince bavarois de quinze ans du nom de Ludwig assiste au Lohengrin de Wagner dans un théâtre de Munich. Il en ressort ravagé. Il pleure pendant tout le spectacle et écrira plus tard que ce fut l'expérience fondatrice de sa jeunesse. Mais Ludwig ne s'est pas contenté d'admirer Lohengrin — il est devenu Lohengrin. Lui aussi était étrange, beau et impossible à cerner. Lui aussi posait des conditions impossibles à l'amour. Lui aussi préférait disparaître plutôt que de se laisser mettre à nu.",

    "Ludwig devient roi de Bavière en 1864, à dix-huit ans. La légende quitte son esprit pour prendre forme dans la pierre. Il bâtit Neuschwanstein — un château de conte perché sur une falaise alpine — et le remplit de cygnes. Peints sur les murs, sculptés dans les meubles, taillés en fontaines. Le nom signifie « Nouvelle Pierre du Cygne ». Ce n'était pas de la décoration. C'était un manifeste : le chevalier au cygne renaissait, ne demandant qu'à rester seul avec la beauté — prêt à s'évanouir dès que le monde poserait la moindre question.",

    "Et le monde a posé ses questions. En 1886, son propre gouvernement le déclare fou et le destitue. Quelques jours plus tard, on retrouve son corps dans les eaux peu profondes du lac de Starnberg — noyé dans des circonstances que personne n'a jamais vraiment élucidées. Comme Lohengrin, il a disparu — laissant derrière lui un château blanc au sommet d'une montagne et une question qui n'a toujours pas de réponse.",
  ]),

  moralOrLesson: {
    S: "La foi exige de ne pas poser certaines questions. Mais la nature humaine exige de les poser. La tragédie n'est pas dans la question — c'est que l'amour bâti sur le mystère ne survit jamais à la vérité.",
  },
};

// ──────────────────────────────────────────────
// GERMAN (de)
// Proverb: "Vertrauen ist gut, Kontrolle ist besser"
// ──────────────────────────────────────────────
const german = {
  ...shared,
  lang: { S: "de" },
  langStoryId: { S: "de#swan-knight-lohengrin" },

  title: { S: "Der Schwanenritter" },

  subtitle: {
    S: "Die mittelalterliche Sage, die einen König dazu trieb, ein Märchenschloss zu bauen",
  },

  excerpt: {
    S: "Die Geschichte stammt aus dem Mittelalter, doch die Version, die alles veränderte, kam 1850 — als Richard Wagner sie in eine seiner größten Opern verwandelte.",
  },

  paragraphs: makeParagraphs([
    "Die Geschichte stammt aus dem Mittelalter, doch die Version, die alles veränderte, kam 1850 — als Richard Wagner sie in eine seiner größten Opern verwandelte. Wir schreiben das Jahr 933. Eine junge Adlige namens Elsa von Brabant wird beschuldigt, ihren eigenen Bruder ermordet zu haben. Die Anklage ist erlogen — ihr Bruder wurde von der Zauberin Ortrud in einen Schwan verwandelt. Aber das weiß niemand. Elsa steht allein da, ohne Verteidiger, und das Todesurteil ist so gut wie gesprochen.",

    "Da erscheint ein Boot auf dem Fluss. Keine Ruder, kein Segel — ein einzelner weißer Schwan zieht es. Aufrecht im Bug steht ein Ritter in silberner Rüstung, strahlend wie aus einer anderen Welt. Er geht an Land, erklärt sich zu Elsas Kämpfer und gewinnt den Zweikampf. Er heiratet sie. Aber es gibt eine Bedingung, und die ist absolut: Sie darf niemals fragen, wer er ist oder woher er kommt. In dem Moment, in dem sie es tut, ist er für immer verschwunden.",

    "Eine Weile funktioniert es. Der Ritter regiert Brabant mit Weisheit und liebt Elsa aufrichtig. Doch Ortrud ist noch nicht fertig. Nacht für Nacht flüstert sie dasselbe Gift: Wer ist dieser Mann? Was für eine Ehefrau kennt nicht einmal den Namen ihres Mannes? Man sagt ja: Vertrauen ist gut, Kontrolle ist besser. Und Ortrud wusste genau, an welcher Stelle sie den Hebel ansetzen musste. Der Zweifel beginnt als Flüstern. Aber Flüstern, das nie aufhört, wird irgendwann zum Schrei.",

    "In der Hochzeitsnacht bricht Elsa. Sie stellt die verbotene Frage: Wer bist du? Das Gesicht des Ritters verfinstert sich. Sein Name ist Lohengrin — Sohn des Parsifal, Ritter des Heiligen Grals. Der Gral sandte ihn, Elsa zu beschützen, doch seine Macht braucht eines: bedingungslosen Glauben. Wer zweifelt, zerstört den Zauber. Lohengrin ruft das Boot zurück, betet über den Schwan — der sich in Elsas verlorenen Bruder verwandelt, lebendig. Dann segelt er davon. Für immer. Elsa sieht ihm nach und stirbt vor Kummer.",

    "1861 sitzt ein fünfzehnjähriger bayerischer Prinz namens Ludwig in einem Münchner Theater und sieht Wagners Lohengrin zum ersten Mal. Es trifft ihn wie ein Blitz. Er weint die ganze Vorstellung durch und schreibt später, es sei das prägendste Erlebnis seiner Jugend gewesen. Doch Ludwig bewunderte Lohengrin nicht nur — er wurde Lohengrin. Auch er war seltsam, schön und unmöglich zu erklären. Auch er stellte unmögliche Bedingungen an die Liebe. Auch er wäre lieber verschwunden, als sich der Welt auszuliefern.",

    "1864 wird Ludwig mit achtzehn König von Bayern. Und dann springt die Legende aus seinem Kopf in Stein. Er baut Neuschwanstein — ein Märchenschloss auf einer Felsklippe in den Alpen — und füllt es mit Schwänen. Gemalt an Wände, geschnitzt in Möbel, geformt zu Brunnen. Der Name bedeutet \u201ENeuer Schwanstein\u201C. Das war keine Dekoration. Das war ein Manifest: der Schwanenritter, wiedergeboren — er bat nur darum, mit der Schönheit allein gelassen zu werden. Bereit zu verschwinden, sobald die Welt Antworten verlangte.",

    "Und die Welt verlangte Antworten. 1886 erklärte ihn seine eigene Regierung für geisteskrank und entmachtete ihn. Wenige Tage später fand man ihn tot im seichten Wasser des Starnberger Sees — ertrunken unter Umständen, die bis heute niemand restlos aufgeklärt hat. Wie Lohengrin verschwand er — und hinterließ ein weißes Schloss auf einem Berggipfel und eine Frage, die immer noch keine Antwort hat.",
  ]),

  moralOrLesson: {
    S: "Der Glaube verlangt, bestimmte Fragen nicht zu stellen. Doch die menschliche Natur verlangt genau das. Die Tragödie liegt nicht im Fragen — sie liegt darin, dass Liebe, die auf Geheimnissen gebaut ist, die Wahrheit niemals überlebt.",
  },
};

// ──────────────────────────────────────────────
// VALIDATION
// ──────────────────────────────────────────────
function validate(label, item) {
  const paragraphs = item.paragraphs.L;
  let totalChars = 0;
  let ok = true;

  for (let i = 0; i < paragraphs.length; i++) {
    const text = paragraphs[i].M.text.S;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    totalChars += chars;

    if (chars > 550) {
      console.error(`  [WARN] ${label} P${i + 1}: ${chars} chars (over 550)`);
      ok = false;
    }
    if (words > 110) {
      console.error(`  [WARN] ${label} P${i + 1}: ${words} words (over 110)`);
      ok = false;
    }
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  }

  console.log(`  Total: ${totalChars} chars, ${paragraphs.length} paragraphs`);
  console.log(`  Title: ${item.title.S}`);
  console.log(`  Subtitle: ${item.subtitle.S}`);
  console.log(`  Moral: ${item.moralOrLesson.S.substring(0, 80)}...`);

  return ok;
}

console.log("=== VALIDATION ===\n");

console.log("Spanish (es):");
const esOk = validate("es", spanish);

console.log("\nFrench (fr):");
const frOk = validate("fr", french);

console.log("\nGerman (de):");
const deOk = validate("de", german);

if (!esOk || !frOk || !deOk) {
  console.error("\n[ERROR] Validation failed. Fix before pushing.");
  process.exit(1);
}

// ──────────────────────────────────────────────
// PUSH TO DYNAMODB
// ──────────────────────────────────────────────
console.log("\n=== PUSHING TO DYNAMODB ===\n");

const items = [
  { label: "Spanish (es)", item: spanish },
  { label: "French (fr)", item: french },
  { label: "German (de)", item: german },
];

for (const { label, item } of items) {
  console.log(`Pushing ${label}...`);
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });
    const result = await client.send(cmd);
    console.log(
      `  ${label} pushed successfully. HTTP ${result.$metadata.httpStatusCode}`
    );
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ${label} record already exists. Overwriting...`);
      const cmd2 = new PutItemCommand({
        TableName: "Story",
        Item: item,
      });
      const result2 = await client.send(cmd2);
      console.log(
        `  ${label} overwritten successfully. HTTP ${result2.$metadata.httpStatusCode}`
      );
    } else {
      console.error(`  FAILED for ${label}:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\nAll three language versions pushed successfully.");
