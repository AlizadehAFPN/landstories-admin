import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════════════
//  Shared fields (identical to English record)
// ═══════════════════════════════════════════════════════════════════════
const shared = {
  siteId: "baalbek",
  storyId: "when-the-djinn-went-on-strike",
  icon: "\uD83E\uDDDE",       // 🧞
  tier: "S",
  readingTimeMinutes: 4,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 36.2039, lat: 34.0069 },
  hasAudio: false,
  isFree: true,
  storyCategory: "gods_monsters",
  updatedAt: now,
};


// ═══════════════════════════════════════════════════════════════════════
//  SPANISH — La huelga de los djinn
//  Proverb subverted: «A la tercera va la vencida»
//  (Three builders, three attempts — the third time the "defeat"
//   was the stone itself.)
//  Register: Skilled modern storyteller. Podcast quality. Vivid, oral.
// ═══════════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#when-the-djinn-went-on-strike",

  title: "La huelga de los djinn",
  subtitle:
    "Las leyendas de Caín, Nimrod, Salomón y los constructores sobrenaturales de Baalbek — y la piedra que dejaron tirada",
  excerpt:
    "La gente del valle de la Bekaa, en Líbano, las llamaba la Ciudad de los Djinn. No rondadas por djinn, no construidas cerca de ellos — construidas POR ellos. Y a novecientos metros del templo, una piedra de mil toneladas sigue en una cantera como prueba de que hasta los constructores sobrenaturales tienen su límite.",
  moralOrLesson:
    "Cuando las obras de los mortales superan lo que los propios mortales se creen capaces de hacer, la imaginación inventa inmortales para atribuirles el mérito — y al hacerlo revela no los límites de la ingeniería humana, sino lo ilimitado de nuestro asombro.",
  source:
    "Corán, Sura Saba 34:12-13; Benjamín de Tudela, El itinerario (c. 1170); Idrisi, Nuzhat al-Mushtaq (c. 1154); manuscrito árabe hallado en Baalbek (fecha incierta), citado en Penn Museum Journal; Hajjar, Youssef. La triade d\u2019Héliopolis-Baalbek, 1977; Génesis 6:4 (Nefilim); leyendas de Baalbek recopiladas por el Instituto Arqueológico Alemán",
  characters: [
    "Rey Salomón (Suleimán, señor de los djinn)",
    "La reina de Saba (Bilqis)",
    "Caín, hijo de Adán",
    "Nimrod, el rey de los gigantes",
    "La mujer embarazada de la leyenda",
    "Jinn bin Jann (progenitor de todos los djinn)",
  ],
  era: "Legendario (tradiciones preislámicas e islámicas); siglo XII d.C. (relato de Benjamín de Tudela)",

  paragraphs: [
    {
      text: "La gente del valle de la Bekaa, en Líbano, no llamaba a estas ruinas por su nombre romano. Las llamaba la Ciudad de los Djinn. No habitada por djinn, no construida cerca de ellos — construida POR ellos. Porque cuando estás frente a bloques de piedra del tamaño de un camión, cortados con precisión milimétrica y apilados hasta trece pisos de altura, «un grupo de obreros lo hizo» no funciona como explicación.",
    },
    {
      text: "La leyenda más antigua se remonta al principio de todo. Después de que Caín matara a su hermano Abel —el primer asesinato de la historia humana—, huyó enloquecido hacia las montañas del Líbano. Allí levantó una fortaleza y la llenó de gigantes llamados Nefilim, seres colosales que aparecen en el Génesis. Arrancaron piedras tan enormes que ningún ser humano habría podido ni tocarlas. Luego Dios envió el Diluvio Universal. Los gigantes se ahogaron. Pero las piedras sobrevivieron.",
    },
    {
      text: "Cuando bajaron las aguas, un rey llamado Nimrod contempló aquellas ruinas y vio una oportunidad. Nimrod era bisnieto de Noé y el mismo rey que intentó construir la Torre de Babel para llegar al cielo. Mandó otra oleada de gigantes a reconstruir Baalbek, porque aquellas piedras eran demasiado grandes para cualquier equipo humano. Hablamos de un tipo que disparó flechas al cielo solo para demostrar que podía desafiar a Dios. Baalbek era su obra maestra.",
    },
    {
      text: "Pero la leyenda que todo el mundo recuerda es la de Salomón. Según el Corán, Dios le concedió poder sobre los djinn: seres creados de fuego sin humo, invisibles pero capaces de mover montañas. Con un anillo mágico llamado el Sello de Salomón, podía dar órdenes a cualquier djinn del mundo. Los usó para construir Baalbek como regalo de bodas para la reina de Saba. Bloques de mil toneladas, tallados y transportados sobre el viento. Quien viera aquel palacio terminado lo entendía: esto no lo hicieron manos humanas.",
    },
    {
      text: "A novecientos metros del templo, medio enterrada en una cantera, está la prueba de que hasta los djinn tenían un límite. Se llama Hajar el-Hibla —la Piedra de la Embarazada—: un bloque de mil toneladas que nunca llegó a su destino. Dicen que a las djinn embarazadas les asignaron moverla. Se pusieron de parto, lo dejaron todo y no volvieron jamás. A la tercera va la vencida, dice el refrán. Pues aquí, la vencida fue la piedra. Los djinn no renunciaron. Se plantaron.",
    },
    {
      text: "Hay otra versión del nombre. Una mujer embarazada le dijo al pueblo de Baalbek que ella conocía el secreto para mover la piedra, pero que no podía revelarlo con el estómago vacío. La ciudad entera la alimentó con lo mejor durante nueve meses. Cuando nació el bebé, confesó: no tenía ni la menor idea. Había engañado a toda una ciudad porque estaban tan desesperados por una respuesta que habrían creído a cualquiera.",
    },
    {
      text: "Los arqueólogos dicen que lo construyeron los romanos en el siglo I, con rodillos, rampas y trabajo organizado. Esa es la respuesta racional. Pero a lo largo de conquistas romanas, demoliciones cristianas, invasiones árabes, cruzados y el incendio que provocó Tamerlán en 1401, la leyenda de los djinn nunca murió. Porque nunca fue sobre ingeniería. Fue sobre lo que sientes al estar frente a algo tan imposible que tu cerebro busca lo sobrenatural — no porque la ciencia no lo explique, sino porque no le hace justicia.",
    },
    {
      text: "Decir que Baalbek lo construyeron los djinn no era un insulto a la habilidad humana. Era el mayor elogio que la imaginación podía ofrecer: una forma de decir que este lugar rompió las reglas de lo que la piedra puede hacer. Y dos mil años después, de pie en esa cantera junto a una roca que pesa más que dos Boeing 747 cargados, lo entiendes. Quizá los djinn existieron de verdad. Quizá siguen ahí, todavía de descanso.",
    },
  ],
};


// ═══════════════════════════════════════════════════════════════════════
//  FRENCH — Quand les djinns ont fait grève
//  Proverb subverted: «À l'impossible nul n'est tenu»
//  (No one is bound to the impossible — not even a djinn,
//   apparently.)
//  Register: Compelling French narrator. Franck Ferrand tone.
//  Told, not read.
// ═══════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#when-the-djinn-went-on-strike",

  title: "Quand les djinns ont fait grève",
  subtitle:
    "Les légendes de Caïn, Nimrod, Salomon et des bâtisseurs surnaturels de Baalbek — et de la pierre qu\u2019ils ont laissée derrière eux",
  excerpt:
    "Les gens de la Bekaa, au Liban, les appelaient la Cité des Djinns. Pas hantée par les djinns — construite PAR eux. Et à neuf cents mètres du temple, un bloc de mille tonnes repose dans une carrière, preuve que même les bâtisseurs surnaturels avaient leurs limites.",
  moralOrLesson:
    "Quand les œuvres des mortels dépassent ce que les mortels se croient capables de faire, l\u2019imagination humaine invente des immortels pour s\u2019en attribuer le mérite — révélant non pas les limites de l\u2019ingénierie, mais l\u2019immensité de notre émerveillement.",
  source:
    "Coran, Sourate Saba 34:12-13 ; Benjamin de Tudèle, L\u2019Itinéraire (v. 1170) ; Idrisi, Nuzhat al-Mushtaq (v. 1154) ; manuscrit arabe trouvé à Baalbek (date incertaine), cité dans le Penn Museum Journal ; Hajjar, Youssef. La triade d\u2019Héliopolis-Baalbek, 1977 ; Genèse 6:4 (Néphilim) ; légendes de Baalbek collectées par le Deutsches Archäologisches Institut",
  characters: [
    "Roi Salomon (Suleiman, maître des djinns)",
    "La reine de Saba (Bilqis)",
    "Caïn, fils d\u2019Adam",
    "Nimrod, le roi des géants",
    "La femme enceinte de la légende",
    "Jinn bin Jann (ancêtre de tous les djinns)",
  ],
  era: "Légendaire (traditions préislamiques et islamiques) ; XIIe siècle (récit de Benjamin de Tudèle)",

  paragraphs: [
    {
      text: "Les gens de la Bekaa, au Liban, avaient leur propre nom pour ces ruines. Ils les appelaient la Cité des Djinns. Pas hantée par des djinns, pas construite à côté — construite PAR eux. Parce que quand tu te retrouves face à des blocs de pierre de la taille d\u2019un bus, taillés au millimètre et empilés sur treize étages, « des ouvriers l\u2019ont fait » ne suffit pas comme explication.",
    },
    {
      text: "La plus vieille légende remonte aux origines. Après avoir tué son frère Abel — le premier meurtre de l\u2019histoire humaine — Caïn s\u2019est enfui dans les montagnes du Liban, fou de culpabilité. Il y a bâti une forteresse, remplie de géants appelés Néphilim, des êtres colossaux mentionnés dans la Genèse. Ils ont extrait des pierres si énormes qu\u2019aucun humain n\u2019aurait pu les soulever. Puis Dieu a envoyé le Déluge. Les géants se sont noyés. Mais les pierres, elles, ont survécu.",
    },
    {
      text: "Quand les eaux se sont retirées, un roi nommé Nimrod a contemplé ces ruines et y a vu un défi. Nimrod, arrière-petit-fils de Noé, même roi qui a voulu bâtir la Tour de Babel pour atteindre le ciel. Il a envoyé une nouvelle vague de géants reconstruire Baalbek — les pierres étaient trop massives pour des humains. On parle d\u2019un type qui tirait des flèches vers le ciel juste pour prouver qu\u2019il pouvait défier Dieu. Baalbek, c\u2019était son chef-d\u2019œuvre.",
    },
    {
      text: "Mais la légende que tout le monde retient, c\u2019est celle de Salomon. Le Coran dit que Dieu lui a donné pouvoir sur les djinns — des êtres de feu sans fumée, invisibles mais capables de remuer des montagnes. Avec le Sceau de Salomon, un anneau magique, il pouvait commander n\u2019importe quel djinn vivant. Il les a envoyés bâtir Baalbek comme cadeau de mariage pour la reine de Saba. Mille tonnes de pierre, taillées et portées sur le vent. Quiconque voyait ce palais comprenait : des mains humaines n\u2019ont jamais fait ça.",
    },
    {
      text: "À neuf cents mètres du temple, à moitié enterré dans une carrière, se trouve la preuve que même les djinns avaient leurs limites. On l\u2019appelle Hajar el-Hibla — la Pierre de la Femme Enceinte — un bloc unique de mille tonnes qui n\u2019est jamais arrivé à destination. La légende dit que des djinns enceintes devaient le déplacer. Elles ont accouché en route, tout lâché, et ne sont jamais revenues. À l\u2019impossible nul n\u2019est tenu, dit le proverbe. Même quand on est un djinn, apparemment.",
    },
    {
      text: "Il existe une autre version du nom. Une femme enceinte a affirmé aux habitants de Baalbek qu\u2019elle connaissait le secret pour déplacer la pierre — mais pas le ventre vide. La ville entière l\u2019a nourrie de ses meilleurs plats pendant neuf mois. Quand le bébé est arrivé, elle a avoué : elle n\u2019en avait pas la moindre idée. Elle avait bluffé toute une cité parce que les gens étaient tellement désespérés qu\u2019ils auraient cru n\u2019importe qui.",
    },
    {
      text: "Les archéologues disent que ce sont les Romains, au premier siècle : rouleaux, rampes, main-d\u2019œuvre organisée. Voilà la réponse rationnelle. Mais à travers conquêtes romaines, démolitions chrétiennes, invasions arabes, croisades et l\u2019incendie de Tamerlan en 1401, la légende des djinns n\u2019a jamais disparu. Parce qu\u2019elle n\u2019a jamais été une question de technique. C\u2019est ce qu\u2019on ressent devant quelque chose de si fou que le cerveau cherche le surnaturel — pas parce que la science n\u2019explique rien, mais parce qu\u2019elle ne rend pas justice à l\u2019émerveillement.",
    },
    {
      text: "Dire que Baalbek a été bâti par les djinns, ce n\u2019était pas une insulte au savoir-faire humain. C\u2019était le plus beau compliment que l\u2019imagination pouvait offrir : une façon de dire que cet endroit avait brisé les règles de ce que la pierre est censée pouvoir faire. Et deux mille ans plus tard, debout dans cette carrière à côté d\u2019un bloc qui pèse plus lourd que deux 747 chargés à ras bord, on comprend. Peut-être que les djinns étaient réels. Peut-être qu\u2019ils sont toujours en pause.",
    },
  ],
};


// ═══════════════════════════════════════════════════════════════════════
//  GERMAN — Als die Dschinn streikten
//  Proverb subverted: «Aller guten Dinge sind drei»
//  (All good things come in threes — three builders, three
//   attempts, and the stone is still lying there.)
//  Register: Quality Spiegel/ZEIT feature. Vivid, spoken, direct.
// ═══════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#when-the-djinn-went-on-strike",

  title: "Als die Dschinn streikten",
  subtitle:
    "Die Legenden von Kain, Nimrod, Salomo und den übernatürlichen Baumeistern von Baalbek — und der Stein, den sie zurückließen",
  excerpt:
    "Die Leute im Bekaa-Tal nannten es die Stadt der Dschinn. Nicht von Dschinn heimgesucht, nicht neben Dschinn erbaut — VON ihnen erbaut. Und neunhundert Meter vom Tempel entfernt liegt ein tausend Tonnen schwerer Stein in einem Steinbruch als Beweis, dass selbst übernatürliche Baumeister ihre Grenzen haben.",
  moralOrLesson:
    "Wenn die Werke der Sterblichen das übersteigen, was Sterbliche sich selbst zutrauen, erfindet die menschliche Vorstellungskraft Unsterbliche, um ihnen die Ehre zu geben — und offenbart damit nicht die Grenzen menschlicher Ingenieurskunst, sondern die Grenzenlosigkeit menschlichen Staunens.",
  source:
    "Koran, Sure Saba 34:12-13; Benjamin von Tudela, Das Itinerarium (ca. 1170); Idrisi, Nuzhat al-Mushtaq (ca. 1154); arabisches Manuskript aus Baalbek (Datum ungewiss), zitiert im Penn Museum Journal; Hajjar, Youssef. La triade d\u2019Héliopolis-Baalbek, 1977; Genesis 6:4 (Nephilim); Baalbek-Legenden gesammelt vom Deutschen Archäologischen Institut",
  characters: [
    "König Salomo (Suleiman, Herr der Dschinn)",
    "Die Königin von Saba (Bilqis)",
    "Kain, Sohn Adams",
    "Nimrod, der Riesenkönig",
    "Die schwangere Frau der Legende",
    "Jinn bin Jann (Urvater aller Dschinn)",
  ],
  era: "Legendär (vorislamische und islamische Traditionen); 12. Jahrhundert n. Chr. (Bericht von Benjamin von Tudela)",

  paragraphs: [
    {
      text: "Die Leute im Bekaa-Tal im Libanon gaben diesen Ruinen nicht ihren römischen Namen. Sie nannten sie die Stadt der Dschinn. Nicht von Dschinn heimgesucht, nicht in ihrer Nähe erbaut — VON ihnen erbaut. Denn wenn du vor Steinblöcken stehst, groß wie ein Bus, millimetergenau geschnitten und dreizehn Stockwerke hoch gestapelt, dann reicht \u201Eein paar Arbeiter haben das gemacht\u201C als Erklärung einfach nicht.",
    },
    {
      text: "Die älteste Legende reicht zurück an den Anfang. Nachdem Kain seinen Bruder Abel erschlagen hatte — der erste Mord der Menschheitsgeschichte — floh er in die Berge des Libanon, wahnsinnig vor Schuld. Dort baute er eine Festung, gefüllt mit Riesen: den Nephilim aus dem Buch Genesis. Sie brachen Steine aus dem Berg, so gewaltig, dass kein Mensch sie hätte bewegen können. Dann schickte Gott die Sintflut. Die Riesen ertranken. Aber die Steine blieben.",
    },
    {
      text: "Als das Wasser zurückging, betrachtete ein König namens Nimrod die Ruinen und sah eine Herausforderung. Nimrod war Noahs Urenkel und derselbe König, der den Turm von Babel bauen wollte, um den Himmel zu erreichen. Er schickte eine neue Welle von Riesen los, Baalbek wiederaufzubauen — die Steine waren schlicht zu massiv für Menschen. Wir reden von einem Typen, der Pfeile in den Himmel schoss, nur um zu beweisen, dass er Gott herausfordern konnte. Baalbek war sein Meisterstück.",
    },
    {
      text: "Aber die Legende, die jeder kennt, ist die von Salomo. Laut Koran gab Gott ihm Macht über die Dschinn — Wesen aus rauchlosem Feuer, unsichtbar, aber stark genug, Berge zu versetzen. Mit dem Siegel Salomos, einem magischen Ring, konnte er jeden Dschinn der Welt befehligen. Er ließ sie Baalbek als Hochzeitsgeschenk für die Königin von Saba errichten. Tausend Tonnen schwere Blöcke, gemeißelt und auf dem Wind herbeigetragen. Wer den fertigen Palast sah, wusste: Das waren keine Menschenhände.",
    },
    {
      text: "Neunhundert Meter vom Tempel entfernt, halb vergraben in einem Steinbruch, liegt der Beweis, dass selbst die Dschinn Grenzen hatten. Man nennt ihn Hajar el-Hibla — den Stein der Schwangeren. Ein einzelner Block, tausend Tonnen, der nie sein Ziel erreichte. Die Legende sagt, schwangere Dschinn sollten ihn transportieren. Sie bekamen Wehen, ließen alles fallen und kamen nie zurück. Aller guten Dinge sind drei, sagt man. Drei Bauherren, drei Versuche — und am Ende blieb der Stein einfach liegen.",
    },
    {
      text: "Es gibt noch eine andere Version des Namens. Eine schwangere Frau behauptete, sie kenne das Geheimnis, den Stein zu bewegen — aber nicht mit leerem Magen. Die ganze Stadt verwöhnte sie neun Monate lang mit dem besten Essen. Als das Baby kam, gestand sie: Sie hatte nicht die geringste Ahnung. Sie hatte eine ganze Stadt hereingelegt, weil die Leute so verzweifelt nach einer Antwort suchten, dass sie jedem geglaubt hätten.",
    },
    {
      text: "Archäologen sagen: die Römer, erstes Jahrhundert, mit Walzen, Rampen und organisierter Arbeitskraft. Das ist die rationale Erklärung. Aber durch römische Eroberung, christlichen Abriss, arabische Invasion, Kreuzzüge und Tamerlans Brand von 1401 hindurch — die Legende der Dschinn ist nie verschwunden. Weil es nie um Ingenieurskunst ging. Es ging um das Gefühl, vor etwas so Unmöglichem zu stehen, dass der Verstand nach dem Übernatürlichen greift — nicht weil die Wissenschaft es nicht erklären kann, sondern weil sie dem Staunen nicht gerecht wird.",
    },
    {
      text: "Zu sagen, Baalbek sei von Dschinn erbaut, war keine Beleidigung menschlichen Könnens. Es war das größte Kompliment, das die Vorstellungskraft aussprechen konnte: eine Art zu sagen, dieser Ort hat die Regeln gebrochen, was Stein können sollte. Und zweitausend Jahre später, wenn du in diesem Steinbruch stehst, neben einem Felsen, der mehr wiegt als zwei voll beladene 747 — dann verstehst du es. Vielleicht waren die Dschinn real. Vielleicht machen sie einfach nur Pause.",
    },
  ],
};


// ═══════════════════════════════════════════════════════════════════════
//  Validation & Push
// ═══════════════════════════════════════════════════════════════════════
async function pushStory(item, label) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Pushing ${label}...`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Required-field validation
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`${label}: Missing required fields`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(
      `${label}: Paragraph count ${item.paragraphs.length} out of range`
    );
  }

  // Per-paragraph validation
  for (let i = 0; i < item.paragraphs.length; i++) {
    const t = item.paragraphs[i].text;
    if (!t || t.length === 0) {
      throw new Error(`${label}: Paragraph ${i} is empty`);
    }
    const words = t.split(/\s+/).length;
    if (t.length > 600) {
      console.warn(`  \u26A0 P${i}: ${t.length} chars (target <500)`);
    } else {
      console.log(`  P${i}: ${t.length} chars, ${words} words \u2713`);
    }
    if (words > 110) {
      console.warn(`  \u26A0 P${i}: ${words} words (target <100)`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  totalChars:  ${totalChars}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  \u2705 ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  \u274C ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  \u274C ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═".repeat(60));
  console.log("When the Djinn Went on Strike — es / fr / de push");
  console.log(`Timestamp: ${now}`);
  console.log("═".repeat(60));

  await pushStory(es, "SPANISH (es)");
  await pushStory(fr, "FRENCH (fr)");
  await pushStory(de, "GERMAN (de)");

  console.log("\n" + "═".repeat(60));
  console.log("\u2705 All three language versions pushed successfully.");
  console.log("═".repeat(60));
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err.message);
  process.exit(1);
});
