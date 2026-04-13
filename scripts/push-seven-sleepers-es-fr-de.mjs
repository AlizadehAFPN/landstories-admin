import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "ephesus",
  storyId: "seven-sleepers",
  icon: "\u{1F634}",
  tier: "A",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 27.3419, lat: 37.9392 },
  hasAudio: false,
  isFree: true,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
  source:
    "Gregory of Tours; Jacobus de Voragine, Golden Legend; Quran, Surah 18 (Al-Kahf)",
};

// ═══════════════════════════════════════════════════════════════════
//  SPANISH — Los Siete Durmientes de Éfeso
//  Register: Modern Spanish storyteller — skilled podcast / popular
//    nonfiction voice. Think Ángel Martín or a good Podium podcast.
//  Proverb subverted: «No hay mal que cien años dure»
//    → "pero la fe de estos siete duró el doble y salió intacta."
// ═══════════════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#seven-sleepers",
  title: "Los Siete Durmientes de Éfeso",
  subtitle:
    "Siete jóvenes que cerraron los ojos y despertaron dos siglos después",
  excerpt:
    "Imagina quedarte dormido el peor día de tu vida y despertar doscientos años después. Eso es lo que miles de millones de personas creen que les ocurrió a siete jóvenes en la antigua Éfeso.",
  moralOrLesson:
    "Una fe capaz de sobrevivir a imperios puede unir incluso a quienes nunca se ponen de acuerdo.",
  characters: [
    "Los Siete Durmientes (Maximiano, Jámblico, Martiniano, Juan, Dionisio, Exacustodiano, Antonino)",
    "Emperador Decio",
    "Emperador Teodosio II",
    "El panadero",
  ],
  era: "Período imperial romano (250 d.C.) al período bizantino (~450 d.C.)",
  paragraphs: [
    {
      text: "Imagina que te duermes después del peor día de tu vida y despiertas doscientos años después. Todo lo que conocías ya no existe. Todos los que querías son polvo. Y tú no has envejecido ni un solo día. Eso es exactamente lo que pasó — o lo que miles de millones de creyentes de dos de las mayores religiones del mundo creen que pasó — a siete jóvenes en la antigua ciudad de Éfeso, en lo que hoy es el oeste de Turquía.",
    },
    {
      text: "Alrededor del año 250, el emperador romano Decio lanzó una de las persecuciones más feroces contra los cristianos que el imperio había conocido. En cada provincia, la gente tenía que hacer un sacrificio público a los dioses romanos o enfrentarse a la muerte. En Éfeso, una de las ciudades más ricas y poderosas del mundo antiguo, siete jóvenes se negaron. No iban a arrodillarse. No iban a quemar incienso ante dioses en los que no creían. Y sabían perfectamente lo que eso significaba.",
    },
    {
      text: "Así que huyeron. Subieron el monte Pion, justo al otro lado de las murallas, y se escondieron en lo profundo de una cueva. Pero Decio se enteró. En lugar de arrastrarlos de vuelta para ejecutarlos en público, ordenó sellar la entrada con piedras enormes. Los enterró vivos en la oscuridad. Para el emperador, el asunto estaba cerrado. Siete alborotadores, emparedados en una montaña, olvidados para siempre.",
    },
    {
      text: "Casi doscientos años después — alrededor del 450 — un campesino de la zona abrió esa misma cueva buscando refugio para su ganado. Lo que encontró dentro desafiaba toda lógica. Siete jóvenes, vivos, desperezándose como si hubieran echado una siesta cualquiera de media tarde. No tenían la menor idea de que el Imperio romano se había transformado por completo. El imperio que antes cazaba cristianos ahora era oficialmente cristiano.",
    },
    {
      text: "Uno de los durmientes, un hombre llamado Jámblico, bajó a Éfeso a comprar pan. Entregó sus monedas y el panadero se quedó de piedra. Las monedas tenían casi doscientos años, acuñadas con el rostro del emperador Decio, un gobernante en el que nadie había pensado en generaciones. La noticia corrió como la pólvora por toda la ciudad. Las autoridades llegaron corriendo a la cueva y encontraron a los otros seis: jóvenes, aturdidos, preguntando qué día era.",
    },
    {
      text: "La noticia llegó hasta el emperador Teodosio II, que viajó a Éfeso para verlos con sus propios ojos. Para él y para todo el mundo cristiano, aquello no era una curiosidad: era un milagro. La prueba viviente de que Dios podía preservar un cuerpo, de que la fe podía sobrevivir a los imperios, de que la muerte no tiene la última palabra. Dicen que no hay mal que cien años dure — pero la fe de estos siete duró el doble y salió intacta. Poco después, los jóvenes murieron en paz, como si solo los hubieran mantenido con vida el tiempo justo para demostrar algo.",
    },
    {
      text: "Su historia no murió con ellos. Se convirtió en uno de los relatos más contados del mundo antiguo, sagrado para los cristianos durante siglos, hasta que apareció en el Corán, en la sura Al-Kahf — «La Caverna» — convirtiendo a los Siete Durmientes en una de las poquísimas historias veneradas tanto por el cristianismo como por el islam. Dos religiones, un mismo milagro, y una pregunta que sigue en el aire: ¿qué harías si despertaras y el mundo entero hubiera seguido adelante sin ti?",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  FRENCH — Les Sept Dormants d'Éphèse
//  Register: Modern French storyteller — the voice of a great
//    France Culture documentary or a high-end Louie Media podcast.
//  Proverb subverted: «Tout vient à point à qui sait attendre»
//    → "eux n'ont même pas eu besoin d'attendre. Ils ont fermé
//       les yeux, et le monde a changé pour eux."
// ═══════════════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#seven-sleepers",
  title: "Les Sept Dormants d'Éphèse",
  subtitle:
    "Sept jeunes hommes qui ont fermé les yeux et se sont réveillés deux siècles plus tard",
  excerpt:
    "Imagine : tu t'endors après le pire jour de ta vie et tu te réveilles deux cents ans plus tard. C'est ce que des milliards de croyants tiennent pour vrai au sujet de sept jeunes hommes dans l'antique Éphèse.",
  moralOrLesson:
    "Une foi capable de survivre aux empires peut unir ceux que tout sépare.",
  characters: [
    "Les Sept Dormants (Maximilien, Jamblique, Martinien, Jean, Denys, Exacustodien, Antonin)",
    "Empereur Dèce",
    "Empereur Théodose II",
    "Le boulanger",
  ],
  era: "Période impériale romaine (250 apr. J.-C.) à la période byzantine (~450 apr. J.-C.)",
  paragraphs: [
    {
      text: "Imagine : tu t'endors après le pire jour de ta vie et tu te réveilles deux cents ans plus tard. Le monde que tu connaissais a disparu. Tous ceux que tu aimais sont poussière. Et toi, tu n'as pas pris une seule ride. C'est exactement ce qui serait arrivé — ou ce que des milliards de croyants de deux des plus grandes religions du monde tiennent pour vrai — à sept jeunes hommes dans la cité antique d'Éphèse, dans l'ouest de la Turquie actuelle.",
    },
    {
      text: "Aux alentours de l'an 250, l'empereur romain Dèce lança l'une des persécutions les plus brutales que l'Empire ait jamais connues contre les chrétiens. Dans chaque province, chaque habitant devait accomplir un sacrifice public aux dieux romains — sous peine de mort. À Éphèse, l'une des cités les plus riches du monde antique, sept jeunes hommes refusèrent. Pas question de plier le genou. Pas question de brûler de l'encens pour des dieux auxquels ils ne croyaient pas. Et ils savaient exactement ce que ça leur coûterait.",
    },
    {
      text: "Alors ils ont fui. Ils ont gravi le mont Pion, juste derrière les murailles, et se sont enfoncés dans une grotte. Mais Dèce l'a appris. Au lieu de les traîner sur la place publique pour les exécuter, il a fait murer l'entrée sous des blocs de pierre massifs — les enterrant vivants dans le noir. Pour l'empereur, l'affaire était classée. Sept agitateurs, emmurés dans une montagne, oubliés.",
    },
    {
      text: "Près de deux siècles plus tard — vers l'an 450 — un paysan du coin a ouvert cette même grotte pour y abriter son bétail. Ce qu'il a trouvé à l'intérieur défiait tout ce qu'il croyait savoir du monde. Sept jeunes hommes, vivants, s'étirant comme après une simple sieste. Ils n'avaient aucune idée que l'Empire romain s'était entièrement métamorphosé autour d'eux. L'empire qui traquait les chrétiens était désormais lui-même chrétien.",
    },
    {
      text: "L'un des dormants, un certain Jamblique, est descendu en ville acheter du pain. Il a tendu ses pièces — et le boulanger s'est figé. Les pièces avaient près de deux cents ans, frappées à l'effigie de l'empereur Dèce, un souverain que plus personne n'avait évoqué depuis des générations. La nouvelle s'est répandue comme une traînée de poudre. Les autorités ont foncé jusqu'à la grotte et trouvé les six autres : jeunes, déboussolés, demandant quel jour on était.",
    },
    {
      text: "La nouvelle est remontée jusqu'à l'empereur Théodose II, qui a fait le voyage jusqu'à Éphèse pour les voir de ses propres yeux. Pour lui et pour le monde chrétien, ce n'était pas une curiosité — c'était un miracle. La preuve que Dieu pouvait préserver un corps, que la foi pouvait survivre aux empires, que la mort n'avait pas le dernier mot. On dit que tout vient à point à qui sait attendre — eux n'ont même pas eu besoin d'attendre. Ils ont fermé les yeux, et le monde a changé pour eux. Peu après, ils sont morts paisiblement — comme si on ne les avait gardés en vie que pour prouver quelque chose.",
    },
    {
      text: "Leur histoire ne s'est pas éteinte avec eux. Elle est devenue l'un des récits les plus repris du monde antique, sacré pour les chrétiens pendant des siècles — avant d'apparaître dans le Coran, dans la sourate Al-Kahf, « La Caverne », faisant des Sept Dormants l'une des très rares histoires vénérées à la fois par le christianisme et par l'islam. Deux religions, un seul miracle, et une question qui résonne encore : que ferais-tu si tu te réveillais et que le monde entier avait continué sans toi ?",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  GERMAN — Die Siebenschläfer von Ephesus
//  Register: Modern German storyteller — the voice of a great
//    ZEIT Geschichte feature or a high-quality Deutschlandfunk Kultur
//    podcast. Engaged, vivid, never stiff.
//  Proverb subverted: «Was lange währt, wird endlich gut»
//    → "aber zweihundert Jahre? Das sprengt jede Vorstellungskraft."
// ═══════════════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#seven-sleepers",
  title: "Die Siebenschläfer von Ephesus",
  subtitle:
    "Sieben junge Männer, die einschliefen und zwei Jahrhunderte später aufwachten",
  excerpt:
    "Stell dir vor, du schläfst nach dem schlimmsten Tag deines Lebens ein und wachst zweihundert Jahre später auf. Milliarden von Menschen glauben, dass genau das sieben jungen Männern im antiken Ephesus passiert ist.",
  moralOrLesson:
    "Ein Glaube, der Imperien überdauert, kann selbst die vereinen, die sich in allem anderen widersprechen.",
  characters: [
    "Die Siebenschläfer (Maximilian, Jamblicus, Martinianus, Johannes, Dionysius, Exacustodianus, Antoninus)",
    "Kaiser Decius",
    "Kaiser Theodosius II.",
    "Der Bäcker",
  ],
  era: "Römische Kaiserzeit (250 n. Chr.) bis Byzantinische Periode (~450 n. Chr.)",
  paragraphs: [
    {
      text: "Stell dir vor, du schläfst nach dem schlimmsten Tag deines Lebens ein — und wachst zweihundert Jahre später wieder auf. Alles, was du kanntest, ist verschwunden. Alle, die du je geliebt hast, sind Staub. Und du selbst bist keinen einzigen Tag gealtert. Genau das soll passiert sein — oder zumindest glauben das Milliarden von Menschen zweier Weltreligionen — sieben jungen Männern in der antiken Stadt Ephesus, im Westen der heutigen Türkei.",
    },
    {
      text: "Um das Jahr 250 startete der römische Kaiser Decius eine der brutalsten Christenverfolgungen, die das Imperium je erlebt hatte. In jeder Provinz mussten die Menschen öffentlich den römischen Göttern opfern — oder sterben. In Ephesus, einer der reichsten und mächtigsten Städte der antiken Welt, weigerten sich sieben junge Männer. Sie würden nicht niederknien. Sie würden keinen Weihrauch für Götter verbrennen, an die sie nicht glaubten. Und sie wussten genau, was das bedeutete.",
    },
    {
      text: "Also flohen sie. Sie stiegen auf den Berg Pion, direkt vor den Stadtmauern, und versteckten sich tief in einer Höhle. Aber Decius erfuhr davon. Statt sie für eine öffentliche Hinrichtung zurückzuschleppen, ließ er den Eingang der Höhle mit gewaltigen Steinblöcken versiegeln — lebendig begraben in der Dunkelheit. Für den Kaiser war die Sache erledigt. Sieben Unruhestifter, eingemauert in einem Berg, vergessen.",
    },
    {
      text: "Fast zweihundert Jahre später — um das Jahr 450 — brach ein Bauer aus der Gegend dieselbe Höhle auf, um sein Vieh unterzustellen. Was er drinnen fand, stellte alles auf den Kopf, was er über die Welt zu wissen glaubte. Sieben junge Männer, am Leben, sich reckend und streckend, als hätten sie nur ein Mittagsschläfchen gehalten. Sie hatten keine Ahnung, dass sich das Römische Reich komplett verwandelt hatte. Das Imperium, das einst Christen jagte, war nun selbst christlich.",
    },
    {
      text: "Einer der Schläfer, ein Mann namens Jamblicus, ging nach Ephesus hinunter, um Brot zu kaufen. Er legte seine Münzen auf die Theke — und der Bäcker erstarrte. Die Münzen waren fast zweihundert Jahre alt, geprägt mit dem Gesicht von Kaiser Decius, einem Herrscher, an den seit Generationen niemand mehr gedacht hatte. Die Nachricht verbreitete sich wie ein Lauffeuer. Die Behörden stürmten zur Höhle und fanden die anderen sechs: jung, verwirrt, fragend, welcher Tag es sei.",
    },
    {
      text: "Die Nachricht drang bis zu Kaiser Theodosius II. vor, der persönlich nach Ephesus reiste, um sie mit eigenen Augen zu sehen. Für ihn und die christliche Welt war das keine Kuriosität — es war ein Wunder. Der lebende Beweis, dass Gott den Körper bewahren konnte, dass Glaube Imperien überdauerte, dass der Tod nicht das letzte Wort hatte. Man sagt: Was lange währt, wird endlich gut — aber zweihundert Jahre? Das sprengt jede Vorstellungskraft. Kurz darauf starben die sieben Männer friedlich — als hätte man sie nur am Leben gehalten, um etwas zu beweisen.",
    },
    {
      text: "Ihre Geschichte starb nicht mit ihnen. Sie wurde zu einer der meisterzählten Geschichten der antiken Welt, jahrhundertelang heilig für die Christen — bis sie im Koran auftauchte, in der Sure Al-Kahf, \u201EDie Höhle\u201C, und die Siebenschläfer zu einer der ganz wenigen Erzählungen machte, die sowohl im Christentum als auch im Islam verehrt werden. Zwei Religionen, ein Wunder, und eine Frage, die bis heute nachhallt: Was würdest du tun, wenn du aufwachst und die ganze Welt ohne dich weitergegangen ist?",
    },
  ],
};

// ─── Push each language ───
async function pushStory(item, label) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Validate
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`${label}: Missing required fields`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(
      `${label}: Paragraph count ${item.paragraphs.length} out of range`
    );
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    const t = item.paragraphs[i].text;
    if (!t || t.length === 0) {
      throw new Error(`${label}: Paragraph ${i} is empty`);
    }
    const words = t.split(/\s+/).length;
    console.log(`  P${i}: ${t.length} chars, ~${words} words`);
    if (t.length > 600) {
      console.warn(`  ⚠ Paragraph ${i} exceeds 500-char target (${t.length})`);
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
    console.log(`  ✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  ❌ ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  ❌ ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("The Seven Sleepers of Ephesus — es / fr / de push");
  console.log(`Timestamp: ${now}`);
  console.log("═══════════════════════════════════════════════");

  await pushStory(es, "SPANISH");
  await pushStory(fr, "FRENCH");
  await pushStory(de, "GERMAN");

  console.log("\n✅ All three languages pushed successfully.");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});
