import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const TIMESTAMP = Math.floor(Date.now() / 1000);

// ─── Shared metadata (unchanged from English) ───
const shared = {
  siteId: { S: "sigiriya" },
  storyId: { S: "kings-downfall" },
  icon: { S: "⚔️" },
  tier: { S: "S" },
  era: { S: "495 CE" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lat: { N: "7.957" },
      lng: { N: "80.7603" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "ghosts_curses" },
  disabled: { BOOL: false },
  source: {
    S: "Culavamsa, chapters 38-39 (Geiger translation, 1929); De Silva, K.M. A History of Sri Lanka, 1981; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; Gunawardana, R.A.L.H. Robe and Plough: Monasticism and Economic Interest in Early Medieval Sri Lanka, 1979; UNESCO World Heritage Nomination File 202",
  },
  updatedAt: { N: String(TIMESTAMP) },
};

function makeParagraphs(texts) {
  return {
    L: texts.map((t) => ({ M: { text: { S: t } } })),
  };
}

function makeCharacters(chars) {
  return { L: chars.map((c) => ({ S: c })) };
}

// ═══════════════════════════════════════════════════════════════════
// SPANISH — "La caída del rey"
// Proverb: "Quien a hierro mata, a hierro muere" (subverted in P5)
// ═══════════════════════════════════════════════════════════════════
const esItem = {
  ...shared,
  langStoryId: { S: "es#kings-downfall" },
  lang: { S: "es" },
  title: { S: "La caída del rey" },
  subtitle: {
    S: "Tras dieciocho años en su fortaleza del cielo, el rey que asesinó a su padre bajó a enfrentar al ejército de su hermano — y en un instante terrible, lo perdió todo",
  },
  excerpt: {
    S: "Durante dieciocho años, un rey que asesinó a su propio padre gobernó desde una fortaleza que ningún ejército podía alcanzar. Entonces su hermano volvió con un ejército — y Kashyapa bajó del cielo a su encuentro. Todo se desmoronó en minutos.",
  },
  moralOrLesson: {
    S: "Kashyapa construyó su fortaleza para escapar de lo que había hecho. Pero no fueron los muros los que fallaron — fue el crimen mismo. Un ejército que sirve a un hombre que mató a su propio padre es un ejército esperando el momento de irse. Y en su último instante, cuando se cortó la garganta y envainó la daga, Kashyapa demostró que lo único que realmente gobernó fue a sí mismo.",
  },
  characters: makeCharacters([
    "Rey Kashyapa I (el rey condenado)",
    "Rey Moggallana I (su medio hermano, el heredero que regresó)",
    "Migara (el traidor que cambió de bando)",
    "General Sulaksmana (comandante de la guarnición de Sigiriya)",
  ]),
  paragraphs: makeParagraphs([
    // P1 — The patricide
    "Kashyapa mató a su propio padre. Así de simple empieza esta historia. En el año 477, derrocó al rey Dhatusena de Sri Lanka — lo mandó encerrar vivo dentro de un muro — y se apoderó del trono. Pero su medio hermano Moggallana, el heredero legítimo, escapó esa misma noche. Un príncipe adolescente corriendo en la oscuridad hacia el sur de India. Kashyapa sabía que volvería. Así que construyó un palacio en la cima de una roca de doscientos metros en medio de la selva. Una fortaleza donde ningún ejército pudiera llegar.",

    // P2 — Eighteen years of preparation
    "Durante dieciocho años, Kashyapa gobernó desde las alturas. Rodeó Sigiriya de fosos, talló un león gigante en la roca como puerta principal y pintó las paredes con diosas doradas. Cada escalera, cada pasadizo estrecho, cada muro estaba diseñado para una sola cosa: el día en que su hermano volviera con un ejército. Y cuando ese día llegó, en el año 495 — Moggallana marchando con tropas del sur de India y un trono que reclamar — Kashyapa hizo lo último que nadie esperaba.",

    // P3 — He came down
    "Bajó. En vez de esperar detrás de las murallas que había pasado dos décadas construyendo, Kashyapa sacó a su ejército a la llanura abierta. Quizá creyó que ganaría rápido. Quizá sabía que esconderse lo haría ver débil. O quizá — después de dieciocho años viviendo con lo que había hecho — solo quería que todo terminara. El hombre que construyó una fortaleza en el cielo eligió pelear en el suelo.",

    // P4 — The elephant and the betrayal
    "Los ejércitos chocaron al pie de la roca. Kashyapa iba montado en su elefante de guerra en el centro, visible para todos. Entonces pasó. El elefante pisó terreno pantanoso y giró buscando suelo firme. Un animal esquivando barro, nada más. Pero sus soldados vieron a su rey dándose la vuelta — y vieron una retirada. Migara, el mismo comandante que había ayudado a Kashyapa a matar a su padre, llevaba años esperando justo este momento. Dio la orden de retirada y todo el ejército se desmoronó. En minutos, Kashyapa estaba completamente solo.",

    // P5 — The death (with subverted proverb)
    "Lo que pasó después es la muerte más famosa de la historia de Sri Lanka. Dicen que quien a hierro mata, a hierro muere — Kashyapa no esperó a que otro empuñara el acero. Sacó una daga enjoyada de su cintura, se la llevó al cuello y cortó. Pero hay un detalle que lleva atormentando a la gente mil quinientos años: después de cortarse la garganta, levantó la daga ensangrentada para que todo el campo de batalla la viera. Y la envainó. Envainó la daga porque la pelea había terminado. La cuenta estaba saldada.",

    // P6 — The aftermath
    "Moggallana tomó el trono y devolvió la capital a Anuradhapura, la antigua ciudad sagrada. Sigiriya — esa fortaleza imposible, ese monumento a la culpa y al genio — fue entregada a monjes budistas. El palacio de placer de un parricida se convirtió en monasterio. Las diosas pintadas contemplaban cabezas rapadas. Las fuentes se callaron. El león se desmoronó. Durante catorce siglos, los únicos sonidos en esa roca fueron cantos de monjes y visitantes grabando poemas de amor en el Muro Espejo.",

    // P7 — The moral
    "Los budistas tienen una lectura brutal y sencilla de Kashyapa: el karma no espera a tu próxima vida. Era brillante. Su fortaleza era una maravilla. Pero el crimen lo alcanzó igual — no a través de las murallas que había levantado, sino a través de la lealtad que nunca pudo ganarse. El ejército que se desbandó ese día jamás había seguido de verdad a un rey que mató a su propio padre. Puedes construir tu fortaleza tan alto como quieras. La caída siempre está esperando.",
  ]),
};

// ═══════════════════════════════════════════════════════════════════
// FRENCH — "La chute du roi"
// Proverb: "La roche Tarpéienne est proche du Capitole" (subverted in P7)
// ═══════════════════════════════════════════════════════════════════
const frItem = {
  ...shared,
  langStoryId: { S: "fr#kings-downfall" },
  lang: { S: "fr" },
  title: { S: "La chute du roi" },
  subtitle: {
    S: "Après dix-huit ans dans sa forteresse céleste, le roi qui avait tué son père est descendu affronter l'armée de son frère — et en un instant terrible, il a tout perdu",
  },
  excerpt: {
    S: "Pendant dix-huit ans, un roi qui avait assassiné son propre père a régné depuis une forteresse qu'aucune armée ne pouvait atteindre. Puis son frère est revenu avec une armée — et Kashyapa est descendu du ciel à sa rencontre. Tout s'est effondré en quelques minutes.",
  },
  moralOrLesson: {
    S: "Kashyapa a bâti sa forteresse pour fuir ce qu'il avait fait. Mais ce ne sont pas les murs qui l'ont trahi — c'est le crime lui-même. Une armée qui sert un homme qui a tué son propre père est une armée qui attend le moment de partir. Et dans son dernier instant, quand il s'est tranché la gorge et a rengainé le poignard, Kashyapa a prouvé que la seule chose qu'il ait jamais vraiment gouvernée, c'était lui-même.",
  },
  characters: makeCharacters([
    "Roi Kashyapa Ier (le roi condamné)",
    "Roi Moggallana Ier (son demi-frère, l'héritier de retour)",
    "Migara (le traître qui changea de camp)",
    "Général Sulaksmana (commandant de la garnison de Sigiriya)",
  ]),
  paragraphs: makeParagraphs([
    // P1 — The patricide
    "Kashyapa a tué son propre père. C'est par là que tout commence. En 477 de notre ère, il a renversé le roi Dhatusena du Sri Lanka — l'a fait murer vivant — et s'est emparé du trône. Mais son demi-frère Moggallana, l'héritier légitime, s'est enfui cette nuit-là. Un prince adolescent courant dans le noir vers le sud de l'Inde. Kashyapa savait qu'il reviendrait. Alors il a bâti un palais au sommet d'un rocher de deux cents mètres, en pleine jungle. Une forteresse qu'aucune armée ne pouvait atteindre.",

    // P2 — Eighteen years of preparation
    "Pendant dix-huit ans, Kashyapa a régné depuis les hauteurs. Il a entouré Sigiriya de douves, sculpté un lion géant dans la roche en guise de porte d'entrée, et fait peindre les murs de déesses dorées. Chaque escalier, chaque meurtrière, chaque passage étroit : tout était conçu pour un seul jour — celui où son frère reviendrait avec une armée. Et quand ce jour est arrivé, en 495 — Moggallana en marche avec des troupes du sud de l'Inde et un trône à reprendre — Kashyapa a fait ce que personne n'attendait.",

    // P3 — He came down
    "Il est descendu. Au lieu de rester derrière les murailles qu'il avait passé vingt ans à construire, Kashyapa a conduit son armée dans la plaine. Peut-être qu'il pensait l'emporter vite. Peut-être qu'il savait que se cacher le ferait passer pour un lâche. Ou peut-être — après dix-huit ans à vivre avec ce qu'il avait fait — il voulait juste que ça s'arrête. L'homme qui avait bâti une forteresse dans le ciel a choisi de se battre au sol.",

    // P4 — The elephant and the betrayal
    "Les armées se sont affrontées au pied du rocher. Kashyapa menait depuis son éléphant de guerre, au centre, visible de tous. Et puis c'est arrivé. L'éléphant a posé le pied dans un terrain marécageux et a pivoté pour trouver un sol plus stable. Un animal qui évite la boue, rien de plus. Mais ses soldats ont vu leur roi faire demi-tour — et ils ont vu une retraite. Migara, le même commandant qui avait aidé Kashyapa à tuer son père, attendait exactement ce moment. Il a sonné la retraite, et toute l'armée s'est effondrée. En quelques minutes, Kashyapa était complètement seul.",

    // P5 — The death
    "Ce qui s'est passé ensuite est la mort la plus célèbre de l'histoire du Sri Lanka. Kashyapa a tiré un poignard serti de pierres précieuses de sa ceinture, l'a porté à sa gorge et a tranché. Mais voici le détail qui hante les gens depuis quinze siècles : après s'être ouvert la gorge, il a brandi le poignard ensanglanté au-dessus de sa tête pour que tout le champ de bataille puisse le voir. Puis il l'a remis dans son fourreau. Et il est tombé. Il a rengainé parce que le combat était terminé. Le compte était soldé.",

    // P6 — The aftermath
    "Moggallana a pris le trône et ramené la capitale à Anuradhapura, l'ancienne cité sacrée. Sigiriya — cette forteresse impossible, ce monument à la culpabilité et au génie — a été confiée à des moines bouddhistes. Le palais des plaisirs d'un parricide est devenu un monastère. Les déesses peintes contemplaient des têtes rasées. Les fontaines se sont tues. Le lion s'est effondré. Pendant quatorze siècles, les seuls sons sur ce rocher ont été les chants des moines et les poèmes d'amour que les visiteurs gravaient sur le Mur Miroir.",

    // P7 — The moral (with subverted proverb)
    "La lecture bouddhiste de Kashyapa est brutale et limpide : le karma n'attend pas ta prochaine vie. On dit que la roche Tarpéienne est proche du Capitole — pour Kashyapa, c'était le même rocher. Il était brillant. Sa forteresse était un prodige. Mais le crime l'a rattrapé quand même — pas à travers les murs qu'il avait érigés, mais à travers la loyauté qu'il n'a jamais pu gagner. L'armée qui s'est débandée ce jour-là n'avait jamais vraiment suivi un roi qui avait tué son propre père. Tu peux bâtir ta forteresse aussi haut que tu veux. La chute est toujours là qui attend.",
  ]),
};

// ═══════════════════════════════════════════════════════════════════
// GERMAN — "Der Sturz des Königs"
// Proverb: "Hochmut kommt vor dem Fall" (subverted in P7)
// ═══════════════════════════════════════════════════════════════════
const deItem = {
  ...shared,
  langStoryId: { S: "de#kings-downfall" },
  lang: { S: "de" },
  title: { S: "Der Sturz des Königs" },
  subtitle: {
    S: "Nach achtzehn Jahren in seiner Himmelsfestung ritt der König, der seinen Vater ermordet hatte, hinab, um sich der Armee seines Bruders zu stellen — und verlor in einem schrecklichen Moment alles",
  },
  excerpt: {
    S: "Achtzehn Jahre lang herrschte ein König, der seinen eigenen Vater ermordet hatte, von einer Festung, die kein Heer erreichen konnte. Dann kam sein Bruder mit einer Armee zurück — und Kashyapa ritt vom Himmel herab, ihm entgegen. Alles zerbrach in Minuten.",
  },
  moralOrLesson: {
    S: "Kashyapa baute seine Festung, um dem zu entkommen, was er getan hatte. Aber es waren nicht die Mauern, die versagten — es war das Verbrechen selbst. Ein Heer, das einem Mann dient, der seinen eigenen Vater getötet hat, ist ein Heer, das auf den Moment wartet zu gehen. Und in seinem letzten Augenblick, als er sich die Kehle aufschnitt und den Dolch zurück in die Scheide schob, bewies Kashyapa, dass das Einzige, was er jemals wirklich beherrscht hatte, er selbst war.",
  },
  characters: makeCharacters([
    "König Kashyapa I. (der dem Untergang geweihte König)",
    "König Moggallana I. (sein Halbbruder, der zurückgekehrte Erbe)",
    "Migara (der Verräter, der die Seiten wechselte)",
    "General Sulaksmana (Befehlshaber der Garnison von Sigiriya)",
  ]),
  paragraphs: makeParagraphs([
    // P1 — The patricide
    "Kashyapa tötete seinen eigenen Vater. So beginnt diese Geschichte. Im Jahr 477 stürzte er König Dhatusena von Sri Lanka — ließ ihn bei lebendigem Leib in eine Mauer einmauern — und riss den Thron an sich. Aber sein Halbbruder Moggallana, der rechtmäßige Erbe, floh noch in derselben Nacht. Ein junger Prinz, der durch die Dunkelheit Richtung Südindien rannte. Kashyapa wusste, dass er zurückkommen würde. Also baute er einen Palast auf einem zweihundert Meter hohen Felsen mitten im Dschungel. Eine Festung, die kein Heer erreichen konnte.",

    // P2 — Eighteen years of preparation
    "Achtzehn Jahre lang regierte Kashyapa vom Himmel. Er umgab Sigiriya mit Wassergräben, ließ einen gewaltigen Löwen in den Fels meißeln als Haupttor und schmückte die Wände mit goldenen Göttinnen. Jede Treppe, jede Schießscharte, jeder Engpass — alles war für einen einzigen Tag gebaut: den Tag, an dem sein Bruder mit einer Armee zurückkehren würde. Und als dieser Tag im Jahr 495 endlich kam — Moggallana im Anmarsch mit südindischen Truppen und einem Thron, den er zurückfordern wollte — tat Kashyapa das Letzte, womit irgendjemand gerechnet hätte.",

    // P3 — He came down
    "Er stieg hinab. Statt hinter den Mauern zu warten, die er zwanzig Jahre lang gebaut hatte, führte Kashyapa seine Armee in die offene Ebene. Vielleicht dachte er, er würde schnell siegen. Vielleicht wusste er, dass Verstecken ihn schwach aussehen ließe. Oder vielleicht — nach achtzehn Jahren mit dem, was er getan hatte — wollte er einfach nur, dass es vorbei war. Der Mann, der eine Festung im Himmel gebaut hatte, wählte den Kampf am Boden.",

    // P4 — The elephant and the betrayal
    "Die Armeen prallten am Fuß des Felsens aufeinander. Kashyapa ritt auf seinem Kriegselefanten in der Mitte, für alle sichtbar. Dann passierte es. Sein Elefant geriet in sumpfiges Gelände und drehte sich zur Seite, um festeren Boden zu finden. Ein Tier, das Schlamm ausweicht — nicht mehr. Aber seine Soldaten sahen ihren König sich abwenden — und sie sahen einen Rückzug. Migara, derselbe Befehlshaber, der Kashyapa geholfen hatte, seinen Vater zu töten, hatte genau auf diesen Moment gewartet. Er rief den Rückzug aus, und das gesamte Heer brach auseinander. Innerhalb von Minuten war Kashyapa vollkommen allein.",

    // P5 — The death
    "Was dann geschah, ist der berühmteste Tod in der Geschichte Sri Lankas. Kashyapa zog einen juwelenbesetzten Dolch aus seinem Gürtel, setzte ihn an die Kehle und schnitt zu. Aber es gibt ein Detail, das die Menschen seit fünfzehnhundert Jahren nicht loslässt: Nachdem er sich die Kehle aufgeschlitzt hatte, hob er den blutigen Dolch über seinen Kopf, damit das ganze Schlachtfeld es sehen konnte. Dann schob er ihn zurück in die Scheide. Und fiel. Er steckte die Klinge weg, weil der Kampf vorbei war. Die Rechnung war beglichen.",

    // P6 — The aftermath
    "Moggallana bestieg den Thron und verlegte die Hauptstadt zurück nach Anuradhapura, die uralte heilige Stadt. Sigiriya — diese unmögliche Festung, dieses Denkmal aus Schuld und Genie — wurde buddhistischen Mönchen übergeben. Der Lustpalast eines Vatermörders wurde ein Kloster. Die gemalten Göttinnen blickten auf kahlgeschorene Köpfe herab. Die Brunnen verstummten. Der Löwe zerfiel. Vierzehn Jahrhunderte lang waren die einzigen Geräusche auf diesem Felsen Mönchsgesänge und Besucher, die Liebesgedichte in die polierte Spiegelwand ritzten.",

    // P7 — The moral (with subverted proverb)
    "Die buddhistische Deutung von Kashyapa ist brutal und schlicht: Karma wartet nicht auf dein nächstes Leben. Man sagt, Hochmut kommt vor dem Fall. Bei Kashyapa war es nicht Hochmut — es war Schuld. Und der Fall war zweihundert Meter tief. Er war brillant. Seine Festung war ein Wunderwerk. Aber das Verbrechen holte ihn trotzdem ein — nicht durch die Mauern, die er errichtet hatte, sondern durch die Treue, die er nie gewinnen konnte. Das Heer, das an diesem Tag zerbrach, hatte nie wirklich einem König gefolgt, der seinen eigenen Vater getötet hatte. Du kannst deine Festung so hoch bauen, wie du willst. Der Fall wartet immer schon.",
  ]),
};

// ═══════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════
const languages = [
  { code: "es", label: "Spanish", item: esItem },
  { code: "fr", label: "French", item: frItem },
  { code: "de", label: "German", item: deItem },
];

for (const { code, label, item } of languages) {
  console.log(`\n${"═".repeat(60)}`);
  console.log(`Pushing ${label} (${code}) → ${item.langStoryId.S}`);
  console.log(`${"═".repeat(60)}`);

  // Validate paragraph count and char limits
  const paragraphs = item.paragraphs.L;
  console.log(`  Paragraphs: ${paragraphs.length}`);
  for (let i = 0; i < paragraphs.length; i++) {
    const text = paragraphs[i].M.text.S;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    const status =
      chars > 600 ? " ⚠️ OVER 600" : chars > 500 ? " ⚠ slightly over 500" : " ✓";
    console.log(`  P${i + 1}: ${chars} chars, ${words} words${status}`);
  }

  const totalChars = paragraphs.reduce((sum, p) => sum + p.M.text.S.length, 0);
  console.log(`  Total: ${totalChars} chars`);

  try {
    const cmd = new PutItemCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });
    const result = await client.send(cmd);
    console.log(
      `  ✅ ${label} pushed successfully (HTTP ${result.$metadata.httpStatusCode})`
    );

    // Verify by reading it back
    const verify = new GetItemCommand({
      TableName: TABLE,
      Key: {
        siteId: { S: "sigiriya" },
        langStoryId: { S: `${code}#kings-downfall` },
      },
      ProjectionExpression: "title, lang, langStoryId",
    });
    const verifyResult = await client.send(verify);
    if (verifyResult.Item) {
      console.log(
        `  ✅ Verified: "${verifyResult.Item.title.S}" (${verifyResult.Item.lang.S})`
      );
    } else {
      console.log(`  ❌ Verification FAILED — item not found after push`);
    }
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ⚠️ ${label} already exists — skipping to avoid overwrite`);
    } else {
      console.error(`  ❌ ${label} FAILED:`, err.message);
      process.exit(1);
    }
  }
}

console.log(`\n${"═".repeat(60)}`);
console.log("All done.");
console.log(`${"═".repeat(60)}`);
