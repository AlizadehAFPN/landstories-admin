import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "alhambra",
  storyId: "massacre-of-the-abencerrajes",
  icon: "⚔️",
  tier: "S",
  source:
    "Perez de Hita, Gines. Guerras civiles de Granada (Historia de los bandos de los Zegries y Abencerrajes), 1595-1619; Irving, Washington. Tales of the Alhambra, 1832; Anonymous. El Abencerraje y la hermosa Jarifa, c. 1561-1565 (ed. Antonio de Villegas, Inventario, 1565); Hernando de Baeza. Historia de los Reyes Moros de Granada, early 16th c.; Chateaubriand, Francois-Rene de. Les Aventures du dernier Abencerage, 1826; Ibn Zamrak, epigraphic poems of the Alhambra; Fortuny, Mariano. La matanza de los Abencerrajes, c. 1870 (Museu Nacional d\u2019Art de Catalunya)",
  era: "c. 1462-1482 (historical conflicts); legend set during the final decades of the Nasrid dynasty",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 37.1761, lng: -3.5881 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "crowns_conquests",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH — La matanza de los Abencerrajes
// Proverb: «El que siembra vientos, recoge tempestades»
// Subverted: El sultán sembró sangre y cosechó ruinas
// ═══════════════════════════════════════════════════════════════
const spanish = {
  ...shared,
  lang: "es",
  langStoryId: "es#massacre-of-the-abencerrajes",
  title: "La matanza de los Abencerrajes",
  subtitle:
    "Treinta y seis caballeros invitados a un festín bajo el techo más bello del mundo, donde la fuente de mármol aún guarda su sangre",
  excerpt:
    "Bajo el techo más extraordinario jamás tallado por manos humanas, treinta y seis caballeros fueron invitados a un festín. Uno a uno entraron en la sala. Ninguno salió con vida.",
  moralOrLesson:
    "La belleza más sublime y la crueldad más feroz pueden compartir la misma sala. La sangre desaparece del mármol, pero jamás de la memoria — y toda civilización que destruye a sus mejores familias desde dentro ya ha firmado su propia sentencia de muerte.",
  characters: [
    "Los Abencerrajes (Banu Sarraj) — la familia noble condenada",
    "El sultán (Abu l-Hasán Alí o un gobernante nazarí anterior)",
    "Los Zegríes — la familia rival que orquestó la conspiración",
    "El caballero abencerraje sin nombre — acusado de una relación con la sultana",
    "Ginés Pérez de Hita — el cronista que inmortalizó la leyenda",
  ],
  paragraphs: [
    {
      text: "Los Abencerrajes eran la familia más poderosa del último reino musulmán de Europa. En la Granada del siglo XV —cuando el resto de la península ya había caído ante los ejércitos cristianos— este clan de nobles norteafricanos decidía quién se sentaba en el trono y quién rodaba por las escaleras. Eran los que ponían y quitaban sultanes. Y alguien quería verlos muertos a todos.",
    },
    {
      text: "Los Zegríes, la familia rival, fabricaron una mentira tan simple que resultó perfecta. Le contaron al sultán que un caballero abencerraje se acostaba en secreto con la sultana. Daba igual si era verdad o invención. En una corte donde el honor lo era todo, la acusación ya era la sentencia. El sultán —envenenado por los celos y el terror de que sus nobles más poderosos lo hubieran humillado de la peor manera posible— decidió exterminar a toda la familia en una sola noche.",
    },
    {
      text: "Invitó a treinta y seis de sus mejores caballeros a un festín dentro de la Alhambra. Vinieron vestidos con sus mejores galas, porque en Granada la invitación de un sultán era el mayor honor que podía recibir un noble. Cruzaron el Patio de los Leones, pasaron junto a doce leones de piedra que sostienen una fuente de mármol, caminaron sobre canales de agua que imitaban los cuatro ríos del paraíso. No tenían ni la menor idea de que caminaban hacia su propia muerte.",
    },
    {
      text: "Uno a uno, los fueron llevando a una sala y los degollaron sobre la fuente de mármol que ocupaba el centro. El agua se llevaba la sangre, para que cada nuevo invitado no viera nada, no sospechara nada, hasta que el filo le encontraba el cuello. Uno a uno, la familia más noble de Granada entró en la sala más hermosa del palacio y no volvió a salir. Esa sala aún lleva su nombre: la Sala de los Abencerrajes.",
    },
    {
      text: "Sobre el lugar donde murieron se alza una obra maestra del arte islámico: cinco mil celdillas de mocárabes en estrella de ocho puntas, con la luz de dieciséis ventanas haciendo que el techo parezca respirar. Fue creado para parecer el cielo. Debajo, en la fuente, queda una mancha rojiza que nunca se ha ido. Los expertos dicen que es óxido de hierro. Pero los visitantes llevan quinientos años oyendo lo mismo: es la sangre de los treinta y seis, tan honda que ningún agua la borrará jamás.",
    },
    {
      text: "Dicen que el que siembra vientos recoge tempestades. El sultán sembró sangre y cosechó ruinas. Al destruir a los Abencerrajes, destruyó la única familia que sostenía su reino. Sin ellos, Granada se desgarró en guerras civiles, justo la debilidad que Fernando e Isabel necesitaban para acabar con el último bastión del islam en España. Un viejo romance lo resumió sin piedad: «Mataste a los Abencerrajes, que eran la flor de Granada.» En una generación, el reino desapareció para siempre.",
    },
    {
      text: "Hoy, millones de personas entran cada año en esa sala. Miran hacia arriba, al techo más intrincado que jamás han tallado manos humanas. Miran hacia abajo, a la mancha de la fuente. Y sienten lo que hace de la Alhambra un lugar distinto a cualquier otro palacio de la tierra. Belleza arriba. Sangre abajo. La mayor expresión de una civilización, suspendida exactamente sobre el punto donde esa misma civilización se destruyó a sí misma.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FRENCH — Le massacre des Abencérages
// Proverb: «La vengeance est un plat qui se sert froid»
// Subverted: Le sultan la servit glaciale — sur du marbre
// ═══════════════════════════════════════════════════════════════
const french = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#massacre-of-the-abencerrajes",
  title: "Le massacre des Abencérages",
  subtitle:
    "Trente-six chevaliers invités à un festin sous le plus beau plafond du monde — où la fontaine de marbre porte encore leur sang",
  excerpt:
    "Sous le plafond le plus extraordinaire jamais sculpté par des mains humaines, trente-six chevaliers furent invités à un festin. Un par un, ils entrèrent dans la salle. Aucun n'en ressortit vivant.",
  moralOrLesson:
    "La beauté la plus sublime et la cruauté la plus féroce peuvent cohabiter dans la même salle. Le sang s'efface du marbre, mais jamais de la mémoire — et toute civilisation qui détruit ses plus nobles familles de l'intérieur a déjà signé son propre arrêt de mort.",
  characters: [
    "Les Abencérages (Banu Sarraj) — la famille noble condamnée",
    "Le sultan (Abu l-Hasan Ali ou un souverain nasride antérieur)",
    "Les Zégries — la famille rivale qui orchestra la conspiration",
    "Le chevalier abencérage anonyme — accusé d'une liaison avec la sultane",
    "Ginés Pérez de Hita — le chroniqueur qui immortalisa la légende",
  ],
  paragraphs: [
    {
      text: "Les Abencérages étaient la famille la plus puissante du dernier royaume musulman d'Europe. Dans la Grenade du XVe siècle — alors que le reste de l'Espagne était déjà tombé aux mains des armées chrétiennes — ce clan de nobles nord-africains tirait toutes les ficelles du pouvoir. C'étaient eux qui décidaient qui montait sur le trône et qui en tombait. Des faiseurs de rois, au sens le plus littéral. Et quelqu'un voulait leur peau.",
    },
    {
      text: "Leurs rivaux, les Zégries, inventèrent un mensonge d'une simplicité presque élégante. Ils racontèrent au sultan qu'un chevalier abencérage couchait en secret avec la sultane elle-même. Peu importait que ce soit vrai ou faux. Dans une cour bâtie sur l'honneur, l'accusation seule valait condamnation à mort. Le sultan — dévoré par la jalousie et la terreur que ses plus puissants nobles l'aient humilié de la façon la plus intime qui soit — décida d'éliminer la famille entière en une seule nuit.",
    },
    {
      text: "Il convia trente-six de leurs meilleurs chevaliers à un festin dans l'Alhambra. Ils arrivèrent dans leurs plus beaux atours, car à Grenade, une invitation du sultan était le plus grand honneur qu'une famille noble pouvait recevoir. Ils traversèrent la Cour des Lions, passèrent devant douze lions de pierre soutenant une fontaine de marbre, longèrent des canaux d'eau conçus pour refléter les quatre fleuves du paradis. Ils ignoraient qu'ils marchaient vers leur propre mort.",
    },
    {
      text: "Un par un, on les conduisit dans une salle et on les décapita au-dessus d'une vasque de marbre au centre du sol. L'eau emportait le sang, pour que chaque nouvel invité ne voie rien, ne soupçonne rien — jusqu'à ce que la lame trouve son cou. Un par un, la plus noble famille de Grenade entra dans la plus belle salle du palais et n'en ressortit jamais. Cette salle porte encore leur nom : la Salle des Abencérages.",
    },
    {
      text: "Au-dessus du lieu où ils moururent se déploie un chef-d'œuvre de l'art islamique : cinq mille alvéoles de muqarnas en étoile à huit branches, la lumière de seize fenêtres donnant vie au plafond. Conçu pour ressembler au paradis. En dessous, dans la vasque, une tache rougeâtre n'a jamais disparu. Les scientifiques parlent d'oxyde de fer. Mais depuis cinq siècles, les visiteurs entendent toujours la même histoire : c'est le sang des trente-six, incrusté si profond que nulle eau ne l'effacera.",
    },
    {
      text: "On dit que la vengeance est un plat qui se sert froid. Le sultan la servit glaciale — sur du marbre, lors d'un festin. En détruisant les Abencérages, il détruisit la seule famille qui tenait son royaume. Grenade se déchira en guerres civiles — la brèche que Ferdinand et Isabelle attendaient pour achever le dernier bastion musulman d'Espagne. Une ballade résuma le verdict : « Tu as tué les Abencérages, qui étaient la fleur de Grenade. » En une génération, le royaume avait disparu.",
    },
    {
      text: "Aujourd'hui, des millions de visiteurs entrent chaque année dans cette salle. Ils lèvent les yeux vers le plafond — la chose la plus minutieuse que des mains humaines aient jamais sculptée. Ils baissent les yeux vers la tache dans la fontaine. Et ils ressentent ce qui rend l'Alhambra différent de tout autre palais sur terre. La beauté au-dessus. Le sang en dessous. L'expression la plus haute d'une civilisation, suspendue exactement au-dessus du point où cette même civilisation s'est détruite.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// GERMAN — Das Massaker der Abencerragen
// Proverb: «Gottes Mühlen mahlen langsam»
// Subverted: …aber sie mahlen.
// ═══════════════════════════════════════════════════════════════
const german = {
  ...shared,
  lang: "de",
  langStoryId: "de#massacre-of-the-abencerrajes",
  title: "Das Massaker der Abencerragen",
  subtitle:
    "Sechsunddreißig Ritter, eingeladen zu einem Festmahl unter der schönsten Decke der Welt — wo der Marmorbrunnen noch immer ihr Blut trägt",
  excerpt:
    "Unter der kunstvollsten Decke, die je von Menschenhand geschaffen wurde, wurden sechsunddreißig Ritter zu einem Festmahl geladen. Einer nach dem anderen betraten sie den Saal. Keiner kam lebend heraus.",
  moralOrLesson:
    "Die erhabenste Schönheit und die grausamste Brutalität können denselben Raum bewohnen. Das Blut verblasst auf dem Marmor, aber nie in der Erinnerung — und Zivilisationen, die ihre edelsten Familien von innen heraus zerstören, haben ihr eigenes Todesdatum bereits geschrieben.",
  characters: [
    "Die Abencerragen (Banu Sarraj) — die zum Untergang verurteilte Adelsfamilie",
    "Der Sultan (Abu l-Hasan Ali oder ein früherer Nasridenherrscher)",
    "Die Zegríes — die rivalisierende Familie, die die Verschwörung einfädelte",
    "Der namenlose Abencerragen-Ritter — beschuldigt einer Affäre mit der Sultanin",
    "Ginés Pérez de Hita — der Chronist, der die Legende unsterblich machte",
  ],
  paragraphs: [
    {
      text: "Die Abencerragen waren die mächtigste Familie im letzten muslimischen Königreich Europas. Im Granada des fünfzehnten Jahrhunderts — während der Rest Spaniens bereits an die christlichen Heere gefallen war — zog dieser Clan nordafrikanischer Adliger im Hintergrund sämtliche Fäden der Macht. Sie bestimmten, wer Sultan wurde und wer verschwand. Königsmacher im wahrsten Sinne des Wortes. Und jemand wollte sie alle tot sehen.",
    },
    {
      text: "Ihre Rivalen, die Zegríes, erfanden eine Lüge von bestechender Einfachheit. Sie erzählten dem Sultan, ein Abencerragen-Ritter schlafe heimlich mit der Sultanin. Ob es stimmte, spielte keine Rolle. An einem Hof, wo Ehre alles war, kam die bloße Anschuldigung einem Todesurteil gleich. Der Sultan — zerfressen von Eifersucht und der Angst, seine mächtigsten Adligen hätten ihn auf die denkbar demütigendste Weise bloßgestellt — beschloss, die gesamte Familie in einer einzigen Nacht auszulöschen.",
    },
    {
      text: "Er lud sechsunddreißig ihrer besten Ritter zu einem Festmahl in die Alhambra. Sie kamen in ihren prächtigsten Gewändern, denn in Granada war eine Einladung des Sultans die höchste Ehre, die eine Adelsfamilie empfangen konnte. Sie durchquerten den Löwenhof, gingen an zwölf steinernen Löwen vorbei, die einen Marmorbrunnen tragen, schritten über Wasserkanäle, die die vier Flüsse des Paradieses widerspiegeln sollten. Sie ahnten nicht, dass sie ihrem eigenen Tod entgegengingen.",
    },
    {
      text: "Einer nach dem anderen wurden sie in einen Saal geführt und über einem Marmorbecken in der Mitte des Raumes enthauptet. Das Wasser trug das Blut davon, damit jeder neue Gast nichts sehen, nichts ahnen würde — bis die Klinge seinen Hals fand. Einer nach dem anderen betrat die edelste Familie Granadas den schönsten Raum des Palastes und kam nie wieder heraus. Dieser Saal trägt noch heute ihren Namen: der Saal der Abencerragen.",
    },
    {
      text: "Über der Stelle, wo sie starben, erhebt sich ein Meisterwerk islamischer Kunst: fünftausend Wabenzellen aus Muqarnas in einem achtzackigen Stern, Licht aus sechzehn Fenstern lässt die Decke lebendig wirken. Geschaffen, um den Himmel darzustellen. Darunter im Becken sitzt ein rötlicher Fleck, der nie verschwand. Wissenschaftler sagen, Eisenoxid. Aber seit fünfhundert Jahren hören Besucher dieselbe Geschichte: das Blut der sechsunddreißig, so tief eingedrungen, dass kein Wasser es je abwäscht.",
    },
    {
      text: "Man sagt, Gottes Mühlen mahlen langsam — aber sie mahlen. Der Sultan hatte die einzige Familie vernichtet, die sein Königreich zusammenhielt. Ohne die Abencerragen zerriss sich Granada in Bürgerkriegen — genau die Schwäche, die Ferdinand und Isabella brauchten, um die letzte Bastion des Islam in Spanien zu schleifen. Eine Ballade fasste es zusammen: «Du hast die Abencerragen getötet, die die Blüte Granadas waren.» In einer Generation war das Königreich für immer verschwunden.",
    },
    {
      text: "Heute betreten jedes Jahr Millionen von Menschen diesen Saal. Sie blicken hinauf zur Decke — dem kunstvollsten Werk, das je von Menschenhand geschnitzt wurde. Sie blicken hinab auf den Fleck im Brunnen. Und sie spüren, was die Alhambra von jedem anderen Palast der Welt unterscheidet. Schönheit oben. Blut unten. Der höchste Ausdruck einer Zivilisation, schwebend genau über dem Punkt, an dem dieselbe Zivilisation sich selbst zerstörte.",
    },
  ],
};

// ─── Validation ───
function validate(item, label) {
  let totalChars = 0;
  let ok = true;
  console.log(`\n=== ${label} ===`);
  for (let i = 0; i < item.paragraphs.length; i++) {
    const p = item.paragraphs[i];
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
    if (chars > 500) {
      console.warn(`  ⚠️  P${i + 1} exceeds 500 char limit!`);
      ok = false;
    }
    if (words > 100) {
      console.warn(`  ⚠️  P${i + 1} exceeds 100 word limit!`);
      ok = false;
    }
  }
  console.log(`  Total: ${totalChars} chars, ${item.paragraphs.length} paragraphs`);
  console.log(`  Target: ~3000 chars (±20% = 2400-3600)`);
  if (totalChars < 2000 || totalChars > 4200) {
    console.error(`  ❌ Total character count way out of range!`);
    ok = false;
  }
  return ok;
}

// ─── Push ───
async function pushStory(item, label) {
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✓ ${label} pushed successfully (${item.langStoryId})`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ${label} already exists, overwriting...`);
      await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
      console.log(`✓ ${label} overwritten successfully (${item.langStoryId})`);
      return true;
    }
    console.error(`✗ ${label} FAILED:`, err.message);
    return false;
  }
}

async function main() {
  const esOk = validate(spanish, "Spanish (Español)");
  const frOk = validate(french, "French (Français)");
  const deOk = validate(german, "German (Deutsch)");

  if (!esOk || !frOk || !deOk) {
    console.error("\n❌ Validation failed. Aborting.");
    process.exit(1);
  }

  console.log(
    `\n─── Pushing 3 stories to table "${TABLE}" at ${new Date().toISOString()} ───\n`
  );

  const esPush = await pushStory(spanish, "Spanish (es)");
  const frPush = await pushStory(french, "French (fr)");
  const dePush = await pushStory(german, "German (de)");

  console.log("\n─── Summary ───");
  console.log(`Spanish: ${esPush ? "✓" : "✗"}`);
  console.log(`French:  ${frPush ? "✓" : "✗"}`);
  console.log(`German:  ${dePush ? "✓" : "✗"}`);

  if (!esPush || !frPush || !dePush) process.exit(1);
}

main();
