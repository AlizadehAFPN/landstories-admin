import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";

const baseItem = {
  siteId: "masada",
  storyId: "lots-of-the-ten",
  icon: "\u{1F52E}",
  tier: "A",
  source:
    "Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; Cohen, Shaye J.D. 'Masada: Literary Tradition, Archaeological Remains, and the Credibility of Josephus,' Journal of Jewish Studies 33, 1982; Ben-Yehuda, Nachman. The Masada Myth: Collective Memory and Mythmaking in Israel, University of Wisconsin Press, 1995; Ben-Yehuda, Nachman. Sacrificing Truth: Archaeology and the Myth of Masada, Humanity Books, 2002; Zias, Joe. 'Human Skeletal Remains from the Southern Cave at Masada,' in The Dead Sea Scrolls Fifty Years After Their Discovery, 2000; Sallon et al. 'Germination, Genetics, and Growth of an Ancient Date Seed,' Science 320, 2008",
  characters: [
    "Yigael Yadin -- archaeologist, former IDF Chief of Staff, excavator of Masada",
    "The woman with braided hair -- an unnamed 17-18 year old whose remains were found in the Northern Palace",
    "Nachman Ben-Yehuda -- Hebrew University sociologist who challenged the Masada myth",
    "Joe Zias -- physical anthropologist who questioned the identification of the bones",
    "Sarah Sallon -- scientist who germinated a 2,000-year-old seed from Masada",
  ],
  era: "1963-1965 (Yadin's excavation); 1969 (state funeral); 1982-2019 (scholarly debate)",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 35.3536, lat: 31.3156 },
  hasAudio: false,
  isFree: true,
  storyCategory: "riddles_past",
  updatedAt: Math.floor(Date.now() / 1000),
};

// ═══════════════════════════════════════════════════════════════
//  SPANISH (es)
//  Proverb subverted: "La suerte está echada" → nobody knows
//  if anyone actually cast the lots
// ═══════════════════════════════════════════════════════════════
const esItem = {
  ...baseItem,
  lang: "es",
  langStoryId: "es#lots-of-the-ten",
  title: "El sorteo de los diez",
  subtitle:
    "Once fragmentos de cerámica, tres esqueletos y una trenza: los hallazgos que confirmaron y cuestionaron a la vez la leyenda de Masada",
  excerpt:
    "Cuando los arqueólogos encontraron once fragmentos de cerámica con nombres grabados — uno de ellos con la inscripción 'Ben Ya'ir' — creyeron haber hallado las suertes reales de la última noche de Masada. La verdad resultó ser mucho más compleja.",
  moralOrLesson:
    "La línea entre descubrir el pasado y construirlo es más fina de lo que nos gusta creer. Cada arqueólogo que levanta un objeto de la tierra decide qué historia cuenta — y las historias que más queremos que sean verdad son las que debemos examinar con más cuidado. La trenza, los fragmentos grabados, los huesos dispersos: son reales. Lo que significan es algo que decidimos nosotros.",
  paragraphs: [
    {
      text: "En 1963, Yigael Yadin subió a Masada con miles de voluntarios de veintiocho países. No era un arqueólogo cualquiera: había comandado el ejército israelí durante la guerra de independencia de 1948. Ahora buscaba algo más antiguo. En el año 73 de nuestra era, casi mil rebeldes judíos habían preferido morir antes que rendirse a Roma. Según el historiador Flavio Josefo, la última noche eligieron a diez hombres por sorteo para acabar con todos los demás. Yadin quería encontrar esas suertes.",
    },
    {
      text: "Y encontró algo extraordinario. Cerca de la puerta sur, su equipo desenterró once fragmentos de cerámica, cada uno con un nombre grabado a mano. Uno decía «Ben Ya'ir» — el nombre de Eleazar ben Ya'ir, el líder que convenció a su gente de elegir la muerte antes que la esclavitud. «Podemos imaginar lo que sintió el hombre que sacó su suerte», escribió Yadin. El mundo quedó fascinado. Ahí estaba, en el polvo del desierto, la prueba física de la noche más dramática de la historia judía.",
    },
    {
      text: "Pero la academia no se dejó impresionar. Eran once fragmentos, no diez, como decía Josefo. «Ben Ya'ir» era un apellido tan común en el siglo I como «García» hoy: encontrarlo no probaba nada. Cientos de fragmentos similares habían aparecido por toda Masada, usados para listas de turnos y raciones. Y un detalle incómodo: Josefo escribía al servicio de los mismos emperadores romanos que destruyeron Jerusalén. Un suicidio noble hacía mejor historia que un final caótico.",
    },
    {
      text: "Y luego estaban los cuerpos. En las ruinas del baño del Palacio Norte aparecieron tres esqueletos: un hombre joven de unos veinte años, una mujer de unos dieciocho y un niño. Junto a la mujer encontraron algo que dejó a todos sin aliento: una trenza intacta después de dos mil años, conservada por el aire seco del desierto. Se había trenzado el pelo sabiendo que iba a morir. Pero justo al lado aparecieron huesos de cerdo. Los judíos no criaban cerdos. Los romanos sí.",
    },
    {
      text: "La suerte está echada, dice el refrán, pero aquí nadie sabe si alguien la echó. Israel respondió con política, no con ciencia. En 1969, veintisiete conjuntos de restos recibieron funeral militar en Masada: ataúdes con bandera, guardia de honor, salvas de cañón. Se trataba como hecho lo que la arqueología no podía probar. Y el sociólogo Nachman Ben-Yehuda reveló lo que los libros callaban: antes de refugiarse en la montaña, esos «héroes» habían masacrado a setecientos judíos en una aldea cercana. El mito era más útil que el desastre.",
    },
    {
      text: "Pero la excavación también descubrió algo que ninguna controversia podía tocar. Entre los pergaminos hallados en las ruinas apareció un fragmento de Ezequiel 37: la visión del profeta sobre un valle lleno de huesos secos, donde Dios pregunta «¿Podrán vivir estos huesos?». Un texto sobre resurrección nacional, encontrado en el lugar exacto donde murió la última resistencia de un pueblo. Y en 2005, científicos plantaron una semilla de palmera datilera recuperada de la excavación de Yadin. Tenía dos mil años. Germinó, creció, y la llamaron Matusalén.",
    },
    {
      text: "Los fragmentos quizá no sean las suertes. Los huesos quizá no sean de defensores. Los discursos quizá nunca se pronunciaron. Pero los pergaminos eran reales — leídos por personas reales en una sinagoga real en la cima de una montaña real. Y esa semilla era real, enterrada dos mil años bajo los escombros, esperando que alguien le diera agua y luz. ¿Podrán vivir estos huesos? En Masada, hasta las semillas dicen que sí.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  FRENCH (fr)
//  Proverb subverted: "Les morts ont toujours tort" → at Masada
//  that's literally true: the dead can't tell their own story
// ═══════════════════════════════════════════════════════════════
const frItem = {
  ...baseItem,
  lang: "fr",
  langStoryId: "fr#lots-of-the-ten",
  title: "Le tirage des dix",
  subtitle:
    "Onze tessons de poterie, trois squelettes et une tresse de femme — les découvertes qui ont à la fois confirmé et remis en question la légende de Masada",
  excerpt:
    "Quand les archéologues ont découvert onze tessons inscrits de noms — dont un portant 'Ben Ya'ir' — ils ont cru tenir la preuve du dernier tirage au sort de Masada. La vérité s'est révélée bien plus complexe.",
  moralOrLesson:
    "La frontière entre découvrir le passé et le fabriquer est plus mince qu'on ne le croit. Chaque archéologue qui sort un objet de la terre choisit l'histoire qu'il raconte — et les histoires auxquelles on veut le plus croire sont celles qu'il faut examiner avec le plus de soin. La tresse, les tessons gravés, les ossements épars : tout cela est réel. Ce qu'ils signifient, c'est nous qui en décidons.",
  paragraphs: [
    {
      text: "En 1963, Yigael Yadin a gravi Masada avec des milliers de volontaires venus de vingt-huit pays. Ce n'était pas un archéologue comme les autres : il avait commandé l'armée israélienne pendant la guerre d'indépendance de 1948. Cette fois, il cherchait quelque chose de bien plus ancien. En l'an 73, près d'un millier de rebelles juifs avaient choisi la mort plutôt que la soumission à Rome. L'historien Flavius Josèphe raconte que la dernière nuit, dix hommes ont été désignés par le sort pour tuer tous les autres. Yadin voulait retrouver ces sorts.",
    },
    {
      text: "Et il a trouvé quelque chose d'extraordinaire. Près de la porte sud, son équipe a déterré onze tessons de poterie, chacun gravé d'un nom. L'un d'eux portait l'inscription « Ben Ya'ir » — le nom d'Éléazar ben Ya'ir, le chef qui avait convaincu son peuple de choisir la mort plutôt que l'esclavage. « On peut imaginer ce qu'a ressenti l'homme qui a tiré son sort », a écrit Yadin. Le monde entier était captivé : la preuve physique de la nuit la plus dramatique de l'histoire juive, là, dans la poussière du désert.",
    },
    {
      text: "Mais les universitaires ont vite douché l'enthousiasme. Onze tessons, pas dix comme chez Josèphe. « Ben Ya'ir » était aussi courant au premier siècle que « Dupont » aujourd'hui — ça ne prouvait rien. Des centaines de tessons similaires avaient été trouvés partout sur le site, pour des choses aussi banales que des listes de corvées et des rations. Et un détail gênant : Josèphe écrivait sous le patronage des empereurs romains qui avaient détruit Jérusalem. Un suicide noble faisait une bien meilleure histoire qu'une fin chaotique.",
    },
    {
      text: "Et puis il y avait les corps. Dans les ruines du bain du Palais Nord, les fouilleurs ont découvert trois squelettes : un jeune homme d'environ vingt ans, une femme d'à peine dix-huit ans, et un enfant. Près de la femme, quelque chose a coupé le souffle à tout le monde : une tresse intacte après deux mille ans, préservée par l'air sec du désert. Elle s'était tressé les cheveux en sachant qu'elle allait mourir. Mais juste à côté, des os de porc. Les Juifs n'élevaient pas de porcs. Les Romains, si.",
    },
    {
      text: "On dit que les morts ont toujours tort — à Masada, c'est littéralement vrai : les morts ne peuvent pas raconter leur version. Israël a répondu par la politique. En 1969, vingt-sept dépouilles ont eu droit à des funérailles militaires : cercueils drapés du drapeau, garde d'honneur, salves au pied de la forteresse. On traitait comme un fait ce que la science ne pouvait prouver. Le sociologue Nachman Ben-Yehuda a révélé ce que les manuels taisaient : ces « héros » avaient massacré sept cents Juifs dans un village voisin avant de fuir vers la montagne. Le mythe était plus utile que la réalité.",
    },
    {
      text: "Mais la fouille a aussi livré quelque chose d'incontestable. Parmi les rouleaux, un fragment d'Ézéchiel 37 : la vision du prophète devant une vallée d'ossements, où Dieu demande « Ces os pourront-ils revivre ? ». Un texte sur la résurrection nationale, trouvé à l'endroit exact où la dernière résistance d'un peuple s'est éteinte. Et en 2005, des scientifiques ont planté une graine de palmier-dattier récupérée lors des fouilles de Yadin. Deux mille ans d'âge. Elle a germé, grandi, et on l'a baptisée Mathusalem.",
    },
    {
      text: "Les tessons ne sont peut-être pas les sorts. Les os ne sont peut-être pas ceux des défenseurs. Les discours n'ont peut-être jamais été prononcés. Mais les rouleaux étaient réels — lus par des gens réels, dans une synagogue réelle, au sommet d'une vraie montagne. Et cette graine était réelle, enfouie deux mille ans sous les décombres, attendant que quelqu'un lui donne de l'eau et de la lumière. Ces os pourront-ils revivre ? À Masada, même les graines répondent oui.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  GERMAN (de)
//  Proverb subverted: "Totgesagte leben länger" → at Masada,
//  even 2000-year-old seeds prove it
// ═══════════════════════════════════════════════════════════════
const deItem = {
  ...baseItem,
  lang: "de",
  langStoryId: "de#lots-of-the-ten",
  title: "Das Los der Zehn",
  subtitle:
    "Elf Tonscherben, drei Skelette und der Zopf einer Frau — die archäologischen Funde, die die Legende von Masada zugleich bestätigten und in Frage stellten",
  excerpt:
    "Als Archäologen elf Tonscherben mit eingeritzten Namen fanden — darunter eine mit der Inschrift 'Ben Ya'ir' — glaubten sie, die tatsächlichen Lose der letzten Nacht von Masada gefunden zu haben. Die Wahrheit erwies sich als weit komplizierter.",
  moralOrLesson:
    "Die Grenze zwischen dem Entdecken der Vergangenheit und ihrem Erfinden ist dünner, als wir wahrhaben wollen. Jeder Archäologe, der einen Fund aus der Erde hebt, entscheidet, welche Geschichte er erzählt — und die Geschichten, die wir am liebsten für wahr halten wollen, sind die, die wir am sorgfältigsten prüfen müssen. Der geflochtene Zopf, die eingeritzten Scherben, die verstreuten Knochen: Sie sind real. Was sie bedeuten, entscheiden wir.",
  paragraphs: [
    {
      text: "1963 stieg Yigael Yadin mit Tausenden Freiwilligen aus achtundzwanzig Ländern auf den Masada-Felsen. Yadin war kein gewöhnlicher Archäologe — er hatte im Unabhängigkeitskrieg 1948 die israelische Armee kommandiert. Jetzt suchte er nach etwas viel Älterem. Im Jahr 73 unserer Zeitrechnung hatten fast tausend jüdische Rebellen den Tod der Unterwerfung unter Rom vorgezogen. Der antike Historiker Flavius Josephus berichtet, dass in der letzten Nacht zehn Männer durch das Los bestimmt wurden, die Übrigen zu töten. Yadin wollte diese Lose finden.",
    },
    {
      text: "Und er fand etwas Außergewöhnliches. Nahe dem Südtor grub sein Team elf Tonscherben aus dem Boden — jede mit einem eingeritzten Namen. Auf einer stand « Ben Ya'ir ». Das war der Name von Eleazar ben Ya'ir, dem Anführer, der sein Volk überzeugt hatte, den Tod statt der Sklaverei zu wählen. « Man kann sich die Gefühle des Mannes vorstellen, der sein Los zog », schrieb Yadin. Die Welt war elektrisiert: ein physischer Beweis für die dramatischste Nacht der jüdischen Geschichte, direkt dort im Wüstenstaub.",
    },
    {
      text: "Aber die Fachwelt bremste die Begeisterung. Es waren elf Scherben, nicht zehn, wie Josephus schrieb. « Ben Ya'ir » war im ersten Jahrhundert so verbreitet wie « Müller » heute — der Fund bewies nichts. Hunderte ähnlicher Namensscherben waren überall auf Masada aufgetaucht, benutzt für so banale Dinge wie Dienstpläne und Essensrationen. Und dann war da ein unangenehmes Detail: Josephus schrieb im Auftrag genau der römischen Kaiser, die Jerusalem zerstört hatten. Ein edler Freitod machte eine deutlich bessere Geschichte als ein chaotisches Ende.",
    },
    {
      text: "Und dann waren da die Leichen. In den Ruinen des Badehauses am Nordpalast fanden die Ausgräber drei Skelette: einen jungen Mann um die zwanzig, eine Frau von etwa achtzehn und ein Kind. Neben der Frau lag etwas, das allen den Atem nahm: ein geflochtener Zopf, nach zweitausend Jahren noch intakt, konserviert durch die knochentrockene Wüstenluft. Sie hatte sich die Haare geflochten, obwohl sie wusste, dass sie sterben würde. Aber direkt daneben lagen Schweineknochen. Juden hielten keine Schweine. Römer schon.",
    },
    {
      text: "Israel antwortete mit Politik statt Wissenschaft. 1969 erhielten siebenundzwanzig Überreste ein Militärbegräbnis an Masadas Hängen: Särge unter der Flagge, Ehrenwache, Salutschüsse. Die Zeremonie behandelte als Tatsache, was die Archäologie nicht beweisen konnte. Der Soziologe Nachman Ben-Yehuda zeigte später, wie Schulbücher eine unbequeme Wahrheit verschwiegen: Die Verteidiger waren keine Helden — sie hatten siebenhundert jüdische Landsleute in einem Nachbardorf massakriert, bevor sie auf den Berg flohen. Der Mythos war nützlicher als die Wahrheit.",
    },
    {
      text: "Aber die Grabung förderte auch etwas zutage, das keine Kontroverse erschüttern konnte. Unter den Schriftrollen lag ein Fragment aus Ezechiel 37 — die Vision des Propheten von einem Tal voller verdorrter Gebeine, wo Gott fragt: « Können diese Gebeine wieder lebendig werden? » Ein Text über nationale Auferstehung, gefunden genau dort, wo der letzte Widerstand eines Volkes erlosch. Und 2005 pflanzten Wissenschaftler einen Dattelpalmen-Samen aus Yadins Grabung ein. Zweitausend Jahre alt. Er trieb aus, wuchs, und sie nannten den Baum Methusalem.",
    },
    {
      text: "Die Scherben sind vielleicht nicht die Lose. Die Knochen gehören vielleicht nicht den Verteidigern. Die Reden wurden vielleicht nie gehalten. Aber die Schriftrollen waren echt — gelesen von echten Menschen in einer echten Synagoge auf einem echten Berg. Und dieser Samen war echt, zweitausend Jahre unter Trümmern begraben, wartend auf jemanden, der ihm Wasser und Licht gibt. Totgesagte leben länger — in Masada gilt das sogar für Samen. Können diese Gebeine leben? Selbst die Samen sagen ja.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  VALIDATION & PUSH
// ═══════════════════════════════════════════════════════════════
function validate(item) {
  const label = `${item.lang}#${item.storyId}`;
  const errors = [];

  if (!item.siteId) errors.push("missing siteId");
  if (!item.langStoryId) errors.push("missing langStoryId");
  if (!item.lang) errors.push("missing lang");
  if (!item.title) errors.push("missing title");
  if (!item.subtitle) errors.push("missing subtitle");
  if (!item.excerpt) errors.push("missing excerpt");
  if (!item.moralOrLesson) errors.push("missing moralOrLesson");
  if (!item.paragraphs || item.paragraphs.length < 6)
    errors.push(`too few paragraphs (${item.paragraphs?.length})`);
  if (item.paragraphs?.length > 10)
    errors.push(`too many paragraphs (${item.paragraphs.length})`);

  // Check each paragraph
  for (let i = 0; i < item.paragraphs.length; i++) {
    const p = item.paragraphs[i];
    if (!p.text) {
      errors.push(`paragraph ${i}: missing text`);
      continue;
    }
    if (p.text.length > 600) {
      errors.push(`paragraph ${i}: ${p.text.length} chars (max 600)`);
    }
    const words = p.text.split(/\s+/).length;
    if (words > 120) {
      errors.push(`paragraph ${i}: ${words} words (max 120)`);
    }
  }

  // Total characters
  const total = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  if (total < 2000 || total > 4200) {
    errors.push(`total chars: ${total} (expected 2400-4200)`);
  }

  if (errors.length > 0) {
    console.error(`\n✗ VALIDATION FAILED for ${label}:`);
    errors.forEach((e) => console.error(`  - ${e}`));
    throw new Error(`Validation failed for ${label}`);
  }

  console.log(
    `  ✓ ${label} validated: ${item.paragraphs.length} paragraphs, ${total} total chars`
  );
}

async function pushItem(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\nPushing ${label}...`);

  validate(item);

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );
  console.log(`  ✓ ${label} pushed successfully to DynamoDB.`);
}

(async () => {
  try {
    await pushItem(esItem);
    await pushItem(frItem);
    await pushItem(deItem);
    console.log("\n=== All three stories pushed successfully. ===\n");
  } catch (err) {
    console.error("\n✗ ERROR:", err.message || err);
    process.exit(1);
  }
})();
