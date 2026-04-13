import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const base = {
  siteId: "ephesus",
  storyId: "saint-paul-riot",
  icon: "\u{1F3AD}",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  hasAudio: false,
  coordinates: { lat: 37.9392, lng: 27.3419 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 2,
  updatedAt: now,
  disabled: false,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH
// Proverb: "No se puede tapar el sol con un dedo"
// (You can't cover the sun with a finger — you can't stop the inevitable)
// Subverted: Éfeso lo aprendió a gritos.
// ═══════════════════════════════════════════════════════════════

const es = {
  ...base,
  lang: "es",
  langStoryId: "es#saint-paul-riot",
  title: "El motín del teatro",
  subtitle: "Cuando la predicación de San Pablo incendió Éfeso",
  source: "Hechos de los Apóstoles 19:23-41",
  era: "55-57 d.C.",
  characters: [
    "San Pablo",
    "Demetrio el platero",
    "Gayo",
    "Aristarco",
    "Secretario de la ciudad",
  ],
  excerpt:
    "En el siglo I, Éfeso era una de las ciudades más grandes del Imperio romano, y todo en ella giraba alrededor de una sola cosa: la diosa Artemisa. Su templo era una de las Siete Maravillas del Mundo Antiguo. Llegaban peregrinos de todo el Mediterráneo para adorar allí. Los comerciantes vendían santuarios de plata, los sacerdotes recogían ofrendas, y toda la ciudad vivía del negocio de la fe. Hasta que apareció un hombre llamado Pablo y empezó a decirle a la gente que sus dioses no existían.",
  moralOrLesson:
    "La fe puede mover montañas, pero también derribar mercados. Lo que empieza como una idea puede acabar transformando el mundo entero.",
  paragraphs: [
    {
      text: "En el siglo I, Éfeso era una de las ciudades más grandes del Imperio romano, y todo en ella giraba alrededor de una sola cosa: la diosa Artemisa. Su templo era una de las Siete Maravillas del Mundo Antiguo. Llegaban peregrinos de todo el Mediterráneo para adorar allí. Los comerciantes vendían santuarios de plata, los sacerdotes recogían ofrendas, y toda la ciudad vivía del negocio de la fe. Hasta que apareció un hombre llamado Pablo y empezó a decirle a la gente que sus dioses no existían.",
    },
    {
      text: "Pablo no estaba de paso. Se quedó en Éfeso casi tres años, entre el 53 y el 57 d.C., y fue demoledor. Los conversos se multiplicaban. La gente dejó de comprar estatuas de plata. Dejó de visitar el templo. Para los devotos de Artemisa, aquello era una molestia. Para los que se ganaban la vida vendiendo su imagen, era una catástrofe.",
    },
    {
      text: "Un platero llamado Demetrio decidió que ya era suficiente. Fabricaba réplicas en miniatura del santuario de Artemisa — un negocio redondo hasta que llegó Pablo. Reunió a todos los artesanos del gremio y les habló claro: este extranjero nos está arruinando. Va diciendo que los dioses hechos con manos humanas no son dioses de verdad. Y si esa idea prende, estamos acabados. Nuestro trabajo, nuestro templo, nuestra ciudad — todo se viene abajo.",
    },
    {
      text: "Funcionó. Los artesanos perdieron la cabeza. Agarraron a dos compañeros de viaje de Pablo — Gayo y Aristarco — y los arrastraron hasta el Gran Teatro de Éfeso, un anfiteatro colosal tallado en la ladera de una colina con capacidad para veinticinco mil personas. El lugar se llenó en un instante, y la multitud empezó a corear una sola frase, una y otra vez: «¡Grande es Artemisa de los efesios!». Así estuvieron dos horas seguidas.",
    },
    {
      text: "Pablo quiso entrar al teatro y enfrentarse a la turba. Los suyos no se lo permitieron. Funcionarios de la ciudad que lo conocían le enviaron un mensaje urgente: no entres ahí. Tenían razón — aquella multitud había pasado del enfado a algo más oscuro. La mayoría de los que estaban en el teatro ni siquiera sabían por qué habían ido. Solo sabían que estaban furiosos.",
    },
    {
      text: "Al final, fue un burócrata quien desactivó la bomba. El secretario de la ciudad — el cargo más alto de Éfeso — se plantó ante la multitud y soltó el discurso más pragmático de toda la Biblia. Si Artemisa es de verdad una diosa, les dijo, no necesita una turba para defenderla. Y si Roma se entera de este alboroto, nos quitan todos los privilegios. Lleven sus quejas a los tribunales. La multitud se fue a casa.",
    },
    {
      text: "Veinticinco mil personas gritando por una diosa cuyo templo hoy es escombros. Un platero defendiendo su sueldo en nombre de la religión. Un burócrata que entendió que los imperios no toleran el caos. Y Pablo — el hombre en el centro de todo — terminó dando forma a la fe que reemplazó todo aquello por lo que luchaban. Dicen que no se puede tapar el sol con un dedo — Éfeso lo aprendió a gritos. Ese teatro sigue en pie. Puedes sentarte en esas mismas gradas y sentirlo: el eco de miles de voces, coreando por un mundo que ya se les escapaba.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FRENCH
// Proverb: "Qui sème le vent récolte la tempête"
// (Who sows the wind reaps the storm)
// Subverted: mais parfois, c'est la tempête qui fait naître
// un monde nouveau.
// ═══════════════════════════════════════════════════════════════

const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#saint-paul-riot",
  title: "L\u2019émeute du théâtre",
  subtitle: "Quand la prédication de Saint Paul a embrasé Éphèse",
  source: "Actes des Apôtres 19:23-41",
  era: "55-57 apr. J.-C.",
  characters: [
    "Saint Paul",
    "Démétrius l\u2019orfèvre",
    "Gaïus",
    "Aristarque",
    "Greffier de la ville",
  ],
  excerpt:
    "Au premier siècle de notre ère, Éphèse était l\u2019une des plus grandes villes de l\u2019Empire romain \u2014 et presque tout y tournait autour d\u2019une seule chose\u00a0: la déesse Artémis. Son temple comptait parmi les Sept Merveilles du monde antique. Des pèlerins affluaient de toute la Méditerranée pour y prier. Les marchands vendaient des sanctuaires en argent, les prêtres recueillaient les offrandes, et toute la ville vivait au rythme de cette foi. Puis un homme appelé Paul est arrivé et a commencé à dire aux gens que leurs dieux n\u2019existaient pas.",
  moralOrLesson:
    "La foi peut ébranler des économies et des empires. Ce qui commence comme une conviction peut finir par redessiner le monde.",
  paragraphs: [
    {
      text: "Au premier siècle de notre ère, Éphèse était l\u2019une des plus grandes villes de l\u2019Empire romain \u2014 et presque tout y tournait autour d\u2019une seule chose\u00a0: la déesse Artémis. Son temple comptait parmi les Sept Merveilles du monde antique. Des pèlerins affluaient de toute la Méditerranée pour y prier. Les marchands vendaient des sanctuaires en argent, les prêtres recueillaient les offrandes, et toute la ville vivait au rythme de cette foi. Puis un homme appelé Paul est arrivé et a commencé à dire aux gens que leurs dieux n\u2019existaient pas.",
    },
    {
      text: "Paul n\u2019était pas de passage. Il est resté à Éphèse presque trois ans, entre 53 et 57 après J.-C., et il était d\u2019une efficacité redoutable. Les conversions s\u2019enchaînaient. Les gens arrêtaient d\u2019acheter des statuettes en argent. Ils ne venaient plus au temple. Pour les vrais dévots d\u2019Artémis, c\u2019était agaçant. Pour ceux qui gagnaient leur vie en vendant son image, c\u2019était la catastrophe.",
    },
    {
      text: "Un orfèvre du nom de Démétrius a décidé que ça suffisait. Il fabriquait des répliques miniatures du sanctuaire d\u2019Artémis \u2014 un commerce florissant jusqu\u2019à l\u2019arrivée de Paul. Il a réuni tous les artisans du métier et leur a parlé sans détour\u00a0: cet étranger est en train de nous ruiner. Il raconte partout que les dieux faits de main d\u2019homme ne sont pas des dieux. Et si cette idée prend racine, c\u2019est fini pour nous. Notre gagne-pain, notre temple, notre ville \u2014 tout.",
    },
    {
      text: "Ça a marché. Les artisans ont perdu la tête. Ils ont attrapé deux compagnons de voyage de Paul \u2014 Gaïus et Aristarque \u2014 et les ont traînés dans le Grand Théâtre d\u2019Éphèse, un amphithéâtre colossal taillé à flanc de colline, capable d\u2019accueillir vingt-cinq mille personnes. L\u2019endroit s\u2019est rempli en un éclair, et la foule s\u2019est mise à scander une seule phrase, encore et encore\u00a0: \u00ab\u00a0Grande est l\u2019Artémis des Éphésiens\u00a0!\u00a0\u00bb Pendant deux heures d\u2019affilée.",
    },
    {
      text: "Paul a voulu entrer dans ce théâtre et affronter la foule. Ses propres compagnons l\u2019en ont empêché. Des magistrats de la ville qui le connaissaient lui ont fait parvenir un message urgent\u00a0: n\u2019y va pas. Ils avaient raison \u2014 cette foule avait dépassé le stade des arguments pour basculer dans quelque chose de plus sombre. La plupart des gens présents ne savaient même pas pourquoi ils étaient là. Ils savaient juste qu\u2019ils étaient en colère.",
    },
    {
      text: "C\u2019est finalement un fonctionnaire qui a désamorcé la crise. Le greffier de la ville \u2014 le plus haut responsable local d\u2019Éphèse \u2014 s\u2019est avancé et a prononcé le discours le plus terre-à-terre de toute la Bible. Si Artémis est vraiment une déesse, leur a-t-il dit, elle n\u2019a pas besoin d\u2019une émeute pour la défendre. Et si Rome apprend ce qui se passe ici, on perdra tous nos privilèges. Portez vos plaintes devant les tribunaux. La foule est rentrée chez elle.",
    },
    {
      text: "Vingt-cinq mille personnes hurlant pour une déesse dont le temple n\u2019est plus que ruines. Un orfèvre défendant son gagne-pain au nom de la religion. Un fonctionnaire qui avait compris que les empires ne tolèrent pas le désordre. Et Paul \u2014 l\u2019homme au centre de tout \u2014 allait façonner la foi qui a remplacé tout ce pour quoi ils se battaient. On dit que qui sème le vent récolte la tempête \u2014 mais parfois, c\u2019est la tempête qui fait naître un monde nouveau. Ce théâtre est toujours debout à Éphèse. On peut s\u2019asseoir sur ces mêmes gradins et le sentir\u00a0: l\u2019écho de milliers de voix, scandant pour un monde qui leur échappait déjà.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// GERMAN
// Proverb: "Gottes Mühlen mahlen langsam"
// (God's mills grind slowly — but surely)
// Subverted: aber in Ephesos mahlten sie eine ganze Welt
// zu Staub.
// ═══════════════════════════════════════════════════════════════

const de = {
  ...base,
  lang: "de",
  langStoryId: "de#saint-paul-riot",
  title: "Aufruhr im Theater",
  subtitle: "Als die Predigt des Paulus Ephesos erschütterte",
  source: "Apostelgeschichte 19:23-41",
  era: "55-57 n. Chr.",
  characters: [
    "Paulus",
    "Demetrius der Silberschmied",
    "Gaius",
    "Aristarch",
    "Stadtschreiber",
  ],
  excerpt:
    "Im ersten Jahrhundert nach Christus war Ephesos eine der größten Städte des Römischen Reiches \u2014 und fast alles drehte sich dort um eine einzige Sache: die Göttin Artemis. Ihr Tempel zählte zu den Sieben Weltwundern der Antike. Pilger strömten aus dem gesamten Mittelmeerraum herbei, um dort zu beten. Händler verkauften silberne Schreine, Priester sammelten Opfergaben, und die ganze Stadt lebte vom Geschäft mit dem Glauben. Dann tauchte ein Mann namens Paulus auf und fing an, den Leuten zu erzählen, dass ihre Götter nicht existierten.",
  moralOrLesson:
    "Glaube kann Wirtschaften und Imperien ins Wanken bringen. Was als Überzeugung beginnt, kann die ganze Welt verändern.",
  paragraphs: [
    {
      text: "Im ersten Jahrhundert nach Christus war Ephesos eine der größten Städte des Römischen Reiches \u2014 und fast alles drehte sich dort um eine einzige Sache: die Göttin Artemis. Ihr Tempel zählte zu den Sieben Weltwundern der Antike. Pilger strömten aus dem gesamten Mittelmeerraum herbei, um dort zu beten. Händler verkauften silberne Schreine, Priester sammelten Opfergaben, und die ganze Stadt lebte vom Geschäft mit dem Glauben. Dann tauchte ein Mann namens Paulus auf und fing an, den Leuten zu erzählen, dass ihre Götter nicht existierten.",
    },
    {
      text: "Paulus war nicht auf der Durchreise. Er blieb fast drei Jahre in Ephesos, von etwa 53 bis 57 n.\u00a0Chr., und er war verheerend wirksam. Die Bekehrungen häuften sich. Die Leute kauften keine Silberstatuen mehr. Sie gingen nicht mehr zum Tempel. Für die wahren Artemis-Anhänger war das ärgerlich. Für diejenigen, die ihren Lebensunterhalt mit ihrem Bild verdienten, war es eine Katastrophe.",
    },
    {
      text: "Ein Silberschmied namens Demetrius hatte genug. Er stellte Miniatur-Nachbildungen des Artemis-Heiligtums her \u2014 ein solides Geschäft, bis Paulus kam. Er rief alle Handwerker der Branche zusammen und sprach Klartext: Dieser Fremde ruiniert uns. Er erzählt den Leuten, dass von Menschenhand gemachte Götter keine Götter sind. Und wenn sich diese Idee durchsetzt, sind wir erledigt. Unsere Arbeit, unser Tempel, unsere Stadt \u2014 alles.",
    },
    {
      text: "Es funktionierte. Die Handwerker rasteten aus. Sie schnappten sich zwei Reisegefährten von Paulus \u2014 Gaius und Aristarch \u2014 und zerrten sie in das Große Theater von Ephesos, ein gewaltiges Amphitheater, in den Hang gehauen, mit Platz für fünfundzwanzigtausend Menschen. Der Ort füllte sich im Nu, und die Menge begann, einen einzigen Satz zu skandieren, immer und immer wieder: \u201EGroß ist die Artemis der Epheser!\u201C Zwei Stunden lang, ohne Unterbrechung.",
    },
    {
      text: "Paulus wollte in das Theater gehen und sich der Menge stellen. Seine eigenen Leute ließen es nicht zu. Stadtbeamte, die ihn kannten, schickten ihm eine dringende Nachricht: Geh da nicht rein. Sie hatten recht \u2014 diese Menge war über jedes Argument hinaus in etwas Dunkleres abgeglitten. Die meisten Menschen im Theater wussten nicht einmal, warum sie dort waren. Sie wussten nur, dass sie wütend waren.",
    },
    {
      text: "Am Ende war es ein Beamter, der die Lage rettete. Der Stadtschreiber \u2014 der höchste lokale Amtsträger in Ephesos \u2014 trat vor und hielt die pragmatischste Rede der gesamten Bibel. Wenn Artemis wirklich eine Göttin ist, sagte er, dann braucht sie keinen Mob zu ihrem Schutz. Und wenn Rom von diesem Aufstand erfährt, werden sie unserer Stadt alle Privilegien entziehen. Bringt eure Beschwerden vor Gericht. Die Menge ging nach Hause.",
    },
    {
      text: "Fünfundzwanzigtausend Menschen, die für eine Göttin schrien, deren Tempel heute Schutt ist. Ein Silberschmied, der seinen Lohn im Namen der Religion verteidigte. Ein Beamter, der verstand, dass Imperien kein Chaos dulden. Und Paulus \u2014 der Mann im Zentrum von allem \u2014 sollte den Glauben formen, der alles ersetzte, wofür sie gekämpft hatten. Gottes Mühlen mahlen langsam, heißt es \u2014 aber in Ephesos mahlten sie eine ganze Welt zu Staub. Das Theater steht heute noch. Man kann sich in dieselben Reihen setzen und es spüren: das Echo tausender Stimmen, die für eine Welt riefen, die ihnen bereits entglitt.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════

async function pushStory(story) {
  const label = `${story.lang} — ${story.title}`;
  console.log(`\nPushing: ${label}`);
  console.log(`  siteId: ${story.siteId}`);
  console.log(`  langStoryId: ${story.langStoryId}`);
  console.log(`  paragraphs: ${story.paragraphs.length}`);

  // Validate before push
  if (!story.siteId || !story.langStoryId || !story.lang || !story.title) {
    throw new Error(`Missing required fields for ${label}`);
  }
  if (!story.paragraphs || story.paragraphs.length < 6) {
    throw new Error(
      `Too few paragraphs for ${label}: ${story.paragraphs.length}`
    );
  }
  for (let i = 0; i < story.paragraphs.length; i++) {
    const p = story.paragraphs[i];
    if (!p.text || p.text.length === 0) {
      throw new Error(`Empty paragraph ${i} for ${label}`);
    }
    if (p.text.length > 600) {
      console.warn(
        `  WARNING: paragraph ${i} is ${p.text.length} chars (limit ~500)`
      );
    }
  }

  const totalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  total chars: ${totalChars}`);

  // Char-count per paragraph
  story.paragraphs.forEach((p, i) => {
    console.log(`    p${i}: ${p.text.length} chars`);
  });

  await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: story,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );

  console.log(`  SUCCESS: ${label} pushed.`);
}

async function main() {
  const stories = [es, fr, de];

  for (const story of stories) {
    try {
      await pushStory(story);
    } catch (err) {
      if (err.name === "ConditionalCheckFailedException") {
        console.error(`  SKIPPED (already exists): ${story.langStoryId}`);
      } else {
        console.error(`  FAILED: ${story.lang} — ${err.message}`);
        throw err;
      }
    }
  }

  console.log("\n=== ALL DONE ===");
}

main().catch((err) => {
  console.error("\nFATAL:", err);
  process.exit(1);
});
