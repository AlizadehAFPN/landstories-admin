import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// Base fields shared across all versions
const base = {
  siteId: "rila-monastery",
  storyId: "wandering-relics",
  icon: "\u26B1\uFE0F",
  tier: "A",
  source: "Patriarch Euthymius, Vita; the Rila Charter; Bulgarian medieval chronicles",
  characters: [
    "Saint Ivan of Rila (relics)",
    "Tsar Samuel",
    "Asen dynasty rulers",
    "Three brothers of Kratovo",
  ],
  era: "Medieval Period (946-1469 AD)",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lat: 42.1333, lng: 23.34 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "crowns_conquests",
  updatedAt: now,
};

// ─────────────────────────────────────────────
// SPANISH
// ─────────────────────────────────────────────
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#wandering-relics",
  title: "Las reliquias errantes \u2014 Cinco siglos sin reposo",
  subtitle: "C\u00f3mo los restos de un ermita\u00f1o sostuvieron la identidad de todo un pueblo",
  excerpt:
    "En 946, un monje llamado Iv\u00e1n muri\u00f3 solo en una cueva perdida en las monta\u00f1as de Rila, en Bulgaria. Sus disc\u00edpulos subieron a buscarlo y se quedaron helados: el cuerpo estaba intacto. Ni rastro de descomposici\u00f3n.",
  moralOrLesson:
    "Lo sagrado puede sobrevivir a cualquier imperio \u2014 a veces, los restos de una sola persona bastan para mantener viva la identidad de un pueblo entero durante siglos.",
  paragraphs: [
    {
      text: "En 946, un monje llamado Iv\u00e1n muri\u00f3 solo en una cueva perdida en las monta\u00f1as de Rila, en Bulgaria. Sus disc\u00edpulos subieron a buscarlo y se quedaron helados: el cuerpo estaba intacto. Ni rastro de descomposici\u00f3n. En la tradici\u00f3n ortodoxa, eso solo pod\u00eda significar una cosa: santidad absoluta. Conservaron sus restos como reliquias sagradas. Pero el descanso eterno de Iv\u00e1n ya hab\u00eda terminado. Sus huesos estaban a punto de empezar un viaje de quinientos a\u00f1os por los Balcanes.",
    },
    {
      text: "Hacia el 980, el zar Samuel de Bulgaria necesitaba un golpe de efecto. El Imperio bizantino \u2014 la superpotencia con sede en Constantinopla, la actual Estambul \u2014 lo estaba asfixiando. Y en la pol\u00edtica medieval, poseer las reliquias de un santo famoso era como llevar el sello de aprobaci\u00f3n de Dios. As\u00ed que Samuel traslad\u00f3 los restos de Iv\u00e1n desde su cueva en la monta\u00f1a hasta su capital, Sredets \u2014 la ciudad que hoy conocemos como Sof\u00eda. Un ermita\u00f1o muerto se convirti\u00f3 en arma pol\u00edtica. Y donde iban sus huesos, iba el poder.",
    },
    {
      text: "Pero Bulgaria los perdi\u00f3 por completo. Hacia 1183, en plena guerra con el Reino de Hungr\u00eda, las reliquias acabaron en Esztergom, la capital h\u00fangara. Da igual si fueron bot\u00edn de guerra o parte de alg\u00fan pacto \u2014 el resultado fue el mismo: lo m\u00e1s sagrado que ten\u00eda Bulgaria estaba ahora en una iglesia extranjera, en un pa\u00eds extranjero. Para los b\u00falgaros, fue como si les arrancaran un pedazo del alma.",
    },
    {
      text: "Pero Bulgaria contraatac\u00f3. Los hermanos Asen \u2014 Iv\u00e1n y Pedro \u2014 lideraron una revuelta que sacudi\u00f3 el yugo extranjero y resucit\u00f3 el imperio b\u00falgaro. Hacia 1195, trajeron las reliquias del santo a su nueva capital, T\u00e1rnovo, en una procesi\u00f3n triunfal. La gente se agolpaba en los caminos, llorando y vitoreando al mismo tiempo. Recuperar a Iv\u00e1n no era solo un gesto religioso \u2014 era la prueba de que Bulgaria segu\u00eda viva. Los huesos de un monje que solo quer\u00eda rezar en paz se hab\u00edan convertido en el coraz\u00f3n de toda una naci\u00f3n.",
    },
    {
      text: "No dur\u00f3. En 1396, el Imperio otomano \u2014 esa potencia en expansi\u00f3n desde la actual Turqu\u00eda \u2014 aplast\u00f3 Bulgaria por completo. T\u00e1rnovo cay\u00f3. Las iglesias fueron destruidas o abandonadas. Durante d\u00e9cadas, las reliquias de Iv\u00e1n quedaron entre las ruinas de lo que hab\u00eda sido una capital orgullosa. Sin procesiones. Sin celebraciones. Solo silencio. Dicen que no hay mal que dure cien a\u00f1os \u2014 pero aquel silencio se trag\u00f3 casi cinco veces eso.",
    },
    {
      text: "Y aqu\u00ed la historia se vuelve incre\u00edble. En 1469 \u2014 m\u00e1s de setenta a\u00f1os bajo dominio otomano \u2014 tres hermanos de un pueblo llamado Kratovo decidieron traer a Iv\u00e1n de vuelta al Monasterio de Rila, donde hab\u00eda vivido y muerto. Cuando la procesi\u00f3n pas\u00f3 por Sof\u00eda, miles de b\u00falgaros inundaron las calles. Bajo ocupaci\u00f3n extranjera, celebrar abiertamente a un santo b\u00falgaro era un acto de rebeld\u00eda en silencio. El mensaje era claro: pueden quitarnos el pa\u00eds, pero no pueden quitarnos qui\u00e9nes somos.",
    },
    {
      text: "Las reliquias de Iv\u00e1n siguen hoy en el Monasterio de Rila \u2014 en las mismas monta\u00f1as donde eligi\u00f3 vivir y rezar hace m\u00e1s de mil a\u00f1os. Cada a\u00f1o, los b\u00falgaros celebran el d\u00eda en que sus huesos por fin volvieron a casa. Lo que empez\u00f3 con la muerte de un ermita\u00f1o solitario en una cueva se convirti\u00f3 en uno de los viajes m\u00e1s ins\u00f3litos de la historia europea \u2014 el cuerpo de un hombre muerto sosteniendo la identidad de todo un pueblo a lo largo de cinco siglos de guerras, conquistas y supervivencia.",
    },
  ],
};

// ─────────────────────────────────────────────
// FRENCH
// ─────────────────────────────────────────────
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#wandering-relics",
  title: "Les reliques errantes \u2014 Cinq si\u00e8cles de voyage",
  subtitle: "Comment les restes d\u2019un ermite ont tenu un peuple debout pendant cinq si\u00e8cles",
  excerpt:
    "En 946, un moine ermite du nom d\u2019Ivan meurt seul dans une grotte perch\u00e9e dans les montagnes de Rila, en Bulgarie. Quand ses disciples montent le chercher, ce qu\u2019ils d\u00e9couvrent les laisse sans voix\u00a0: le corps est intact.",
  moralOrLesson:
    "Ce qui est sacr\u00e9 peut survivre \u00e0 n\u2019importe quel empire \u2014 parfois, les restes d\u2019une seule personne suffisent \u00e0 maintenir l\u2019identit\u00e9 de tout un peuple \u00e0 travers les si\u00e8cles.",
  paragraphs: [
    {
      text: "En 946, un moine ermite du nom d\u2019Ivan meurt seul dans une grotte perch\u00e9e dans les montagnes de Rila, en Bulgarie. Quand ses disciples montent le chercher, ce qu\u2019ils d\u00e9couvrent les laisse sans voix\u00a0: le corps est intact. Pas la moindre trace de d\u00e9composition. Dans la tradition orthodoxe, un corps qui refuse de pourrir, c\u2019est la preuve ultime de saintet\u00e9. Alors ils conservent ses restes comme des reliques sacr\u00e9es. Mais le repos \u00e9ternel d\u2019Ivan, c\u2019est d\u00e9j\u00e0 fini. Ses os sont sur le point d\u2019entamer un voyage de cinq si\u00e8cles \u00e0 travers les Balkans.",
    },
    {
      text: "Vers 980, le tsar Samuel de Bulgarie a besoin d\u2019un coup d\u2019\u00e9clat. L\u2019Empire byzantin \u2014 la superpuissance install\u00e9e \u00e0 Constantinople, l\u2019actuelle Istanbul \u2014 \u00e9touffe la Bulgarie de toutes parts. Et au Moyen \u00c2ge, poss\u00e9der les reliques d\u2019un saint c\u00e9l\u00e8bre, c\u2019est comme brandir un sceau d\u2019approbation divine. Samuel fait donc transf\u00e9rer les restes d\u2019Ivan de sa grotte perdue vers sa capitale, Sredets \u2014 la ville qu\u2019on appelle aujourd\u2019hui Sofia. Un ermite mort devient une arme politique. L\u00e0 o\u00f9 vont ses os, le pouvoir suit.",
    },
    {
      text: "Et puis la Bulgarie les perd. Compl\u00e8tement. Vers 1183, en pleine guerre contre le Royaume de Hongrie, les reliques d\u2019Ivan atterrissent \u00e0 Esztergom \u2014 la capitale royale hongroise. Butin de guerre ou monnaie d\u2019\u00e9change, peu importe le d\u00e9tail\u00a0: le r\u00e9sultat est le m\u00eame. Ce que la Bulgarie avait de plus sacr\u00e9 se retrouve dans une \u00e9glise \u00e9trang\u00e8re, dans un pays \u00e9tranger. Pour les Bulgares, c\u2019est comme si on leur avait arrach\u00e9 un bout d\u2019\u00e2me.",
    },
    {
      text: "Mais la Bulgarie ne l\u00e2che rien. Les fr\u00e8res Asen \u2014 Ivan et Pierre \u2014 m\u00e8nent une r\u00e9volte qui brise le joug \u00e9tranger et fait rena\u00eetre l\u2019Empire bulgare. Vers 1195, ils ram\u00e8nent les reliques du saint dans leur nouvelle capitale, Tarnovo, au milieu d\u2019une procession triomphale. Les gens se massent au bord des routes, pleurent, acclament. R\u00e9cup\u00e9rer Ivan, ce n\u2019est pas qu\u2019un geste religieux \u2014 c\u2019est la preuve que la Bulgarie respire encore. Les os d\u2019un moine qui ne demandait qu\u2019\u00e0 prier seul dans sa grotte sont devenus le c\u0153ur battant de toute une nation.",
    },
    {
      text: "\u00c7a n\u2019a pas tenu. En 1396, l\u2019Empire ottoman \u2014 la grande puissance qui s\u2019\u00e9tend depuis l\u2019actuelle Turquie \u2014 \u00e9crase la Bulgarie. Tarnovo tombe. Les \u00e9glises sont d\u00e9truites ou laiss\u00e9es \u00e0 l\u2019abandon. Pendant des d\u00e9cennies, les reliques d\u2019Ivan restent l\u00e0, dans les d\u00e9combres de ce qui avait \u00e9t\u00e9 une capitale fi\u00e8re. Plus de processions. Plus de f\u00eates. Rien que le silence. On dit que chassez le naturel, il revient au galop \u2014 mais ce galop-l\u00e0 a mis soixante-dix ans avant de se faire entendre.",
    },
    {
      text: "Et c\u2019est l\u00e0 que l\u2019histoire devient folle. En 1469 \u2014 plus de soixante-dix ans sous domination ottomane \u2014 trois fr\u00e8res d\u2019une petite ville appel\u00e9e Kratovo d\u00e9cident de ramener Ivan chez lui. Au monast\u00e8re de Rila, l\u00e0 o\u00f9 il avait v\u00e9cu, l\u00e0 o\u00f9 il \u00e9tait mort. Ils organisent le voyage. Et quand le cort\u00e8ge traverse Sofia, des milliers de Bulgares envahissent les rues. Sous l\u2019occupation, c\u00e9l\u00e9brer ouvertement un saint bulgare, c\u2019est un acte de r\u00e9sistance silencieuse. Le message\u00a0: vous pouvez nous prendre notre pays, mais pas ce que nous sommes.",
    },
    {
      text: "Les reliques d\u2019Ivan reposent toujours au monast\u00e8re de Rila \u2014 dans ces m\u00eames montagnes o\u00f9 il s\u2019\u00e9tait retir\u00e9 pour prier, il y a plus de mille ans. Chaque ann\u00e9e, les Bulgares c\u00e9l\u00e8brent le jour o\u00f9 ses os sont enfin rentr\u00e9s chez eux. Ce qui avait commenc\u00e9 par la mort d\u2019un ermite solitaire dans une grotte de montagne est devenu l\u2019un des p\u00e9riples les plus \u00e9tranges de l\u2019histoire europ\u00e9enne \u2014 le corps d\u2019un homme mort tenant ensemble l\u2019identit\u00e9 de tout un peuple \u00e0 travers cinq si\u00e8cles de guerres, de conqu\u00eates et de survie.",
    },
  ],
};

// ─────────────────────────────────────────────
// GERMAN
// ─────────────────────────────────────────────
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#wandering-relics",
  title: "Die wandernden Reliquien \u2014 F\u00fcnf Jahrhunderte unterwegs",
  subtitle: "Wie die \u00dcberreste eines Einsiedlers ein ganzes Volk \u00fcber f\u00fcnf Jahrhunderte zusammenhielten",
  excerpt:
    "Im Jahr 946 stirbt ein Einsiedlerm\u00f6nch namens Iwan allein in einer H\u00f6hle hoch oben im Rila-Gebirge, in Bulgarien. Als seine Anh\u00e4nger ihn finden, trauen sie ihren Augen nicht: Der K\u00f6rper ist vollkommen unversehrt.",
  moralOrLesson:
    "Was heilig ist, kann jedes Imperium \u00fcberdauern \u2014 manchmal reichen die \u00dcberreste eines einzigen Menschen, um die Identit\u00e4t eines ganzen Volkes \u00fcber Jahrhunderte hinweg lebendig zu halten.",
  paragraphs: [
    {
      text: "Im Jahr 946 stirbt ein Einsiedlerm\u00f6nch namens Iwan allein in einer H\u00f6hle hoch oben im Rila-Gebirge, in Bulgarien. Als seine Anh\u00e4nger ihn finden, trauen sie ihren Augen nicht: Der K\u00f6rper ist vollkommen unversehrt. Kein Anzeichen von Verwesung. In der orthodoxen Tradition gibt es daf\u00fcr nur eine Erkl\u00e4rung \u2014 absolute Heiligkeit. Also bewahren sie seine \u00dcberreste als heilige Reliquien auf. Doch Iwans ewige Ruhe in dieser Bergh\u00f6hle? Die war schon vorbei. Seine Gebeine standen kurz davor, gestohlen, umk\u00e4mpft und f\u00fcnfhundert Jahre lang quer \u00fcber den Balkan getragen zu werden.",
    },
    {
      text: "Um 980 braucht Bulgariens Zar Samuil einen Machtzug. Das Byzantinische Reich \u2014 die Supermacht mit Sitz in Konstantinopel, dem heutigen Istanbul \u2014 schn\u00fcrt Bulgarien die Luft ab. Im Mittelalter war der Besitz heiliger Reliquien wie ein g\u00f6ttlicher Freifahrtschein: Wer die Knochen eines Heiligen hatte, hatte Gottes Segen auf seiner Seite. Also l\u00e4sst Samuil Iwans \u00dcberreste aus der abgelegenen H\u00f6hle in seine Hauptstadt Sredez bringen \u2014 die Stadt, die wir heute Sofia nennen. Ein toter Einsiedler wird zur politischen Waffe. Und wohin seine Knochen gehen, folgt die Macht.",
    },
    {
      text: "Dann verliert Bulgarien sie komplett. Um 1183, mitten im Krieg gegen das K\u00f6nigreich Ungarn, landen Iwans Reliquien in Esztergom \u2014 der ungarischen K\u00f6nigshauptstadt. Ob als Kriegsbeute geraubt oder als Teil eines Deals \u00fcbergeben \u2014 das Ergebnis ist dasselbe: Bulgariens heiligstes Gut steht jetzt in einer fremden Kirche, in einem fremden Land. F\u00fcr die Bulgaren f\u00fchlt es sich an, als h\u00e4tte man ihnen ein St\u00fcck ihrer Seele geraubt.",
    },
    {
      text: "Doch Bulgarien schl\u00e4gt zur\u00fcck. Die Asen-Br\u00fcder \u2014 Iwan und Peter \u2014 f\u00fchren einen gewaltigen Aufstand an, der die Fremdherrschaft absch\u00fcttelt und das Bulgarische Reich wiederauferstehen l\u00e4sst. Um 1195 bringen sie die Reliquien des Heiligen in ihre neue Hauptstadt Tarnowo \u2014 in einem Triumphzug, der das ganze Land mitrei\u00dft. Menschen s\u00e4umen die Stra\u00dfen, weinen und jubeln. Iwan zur\u00fcckzuholen ist nicht nur ein religi\u00f6ser Akt \u2014 es ist der Beweis, dass Bulgarien noch lebt. Die Gebeine eines M\u00f6nchs, der nur in Ruhe beten wollte, sind zum Herzschlag einer ganzen Nation geworden.",
    },
    {
      text: "Es h\u00e4lt nicht. 1396 erobert das Osmanische Reich \u2014 die Gro\u00dfmacht, die sich von der heutigen T\u00fcrkei aus ausbreitet \u2014 Bulgarien vollst\u00e4ndig. Tarnowo f\u00e4llt. Kirchen werden zerst\u00f6rt oder aufgegeben. Jahrzehntelang liegen Iwans Reliquien in den Tr\u00fcmmern dessen, was einmal eine stolze Hauptstadt war. Keine Prozessionen mehr. Keine Feiern. Nur Stille. Die Nation ist am Boden, und die Gebeine des Heiligen verstauben neben den Tr\u00fcmmern zerbrochener Hoffnungen.",
    },
    {
      text: "Und hier wird die Geschichte unglaublich. 1469 \u2014 \u00fcber siebzig Jahre unter osmanischer Herrschaft \u2014 beschlie\u00dfen drei Br\u00fcder aus der Kleinstadt Kratowo, Iwan nach Hause zu bringen. Zum Rila-Kloster, wo er gelebt hatte und gestorben war. Sie organisieren die Reise, und als der Zug durch Sofia kommt, str\u00f6men Tausende Bulgaren auf die Stra\u00dfen. Unter Fremdherrschaft einen bulgarischen Heiligen offen zu feiern \u2014 das ist stiller Widerstand. Man sagt ja: Was lange w\u00e4hrt, wird endlich gut. F\u00fcnfhundert Jahre \u2014 das ist lang, selbst f\u00fcr eine Heiligengeschichte.",
    },
    {
      text: "Iwans Reliquien ruhen bis heute im Rila-Kloster \u2014 in denselben Bergen, in denen er sich vor \u00fcber tausend Jahren zum Beten zur\u00fcckzog. Jedes Jahr feiern die Bulgaren den Tag, an dem seine Gebeine endlich nach Hause kamen. Was mit dem Tod eines einsamen Einsiedlers in einer Bergh\u00f6hle begann, wurde zu einer der ungew\u00f6hnlichsten Reisen der europ\u00e4ischen Geschichte \u2014 der K\u00f6rper eines Toten, der ein ganzes Volk \u00fcber f\u00fcnf Jahrhunderte voller Krieg, Eroberung und \u00dcberleben zusammenhielt.",
    },
  ],
};

async function pushStory(story, label) {
  console.log(`\nPushing ${label}...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: story,
        ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ${label} already exists. Overwriting...`);
      await docClient.send(new PutCommand({ TableName: TABLE, Item: story }));
      console.log(`  ${label} overwritten successfully.`);
    } else {
      console.error(`  FAILED to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  // Validate paragraph counts
  for (const [label, story] of [["ES", es], ["FR", fr], ["DE", de]]) {
    console.log(`${label}: ${story.paragraphs.length} paragraphs`);
    for (let i = 0; i < story.paragraphs.length; i++) {
      const len = story.paragraphs[i].text.length;
      console.log(`  P${i + 1}: ${len} chars`);
    }
  }

  await pushStory(es, "Spanish (es)");
  await pushStory(fr, "French (fr)");
  await pushStory(de, "German (de)");

  console.log("\nAll three languages pushed successfully!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
