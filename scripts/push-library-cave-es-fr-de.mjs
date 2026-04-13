// Push Spanish, French, and German recreations of "The Library Cave"
// to the Story DynamoDB table.
//
// Cultural proverbs subverted:
//   es → "No hay mal que cien años dure" (No evil lasts a hundred years)
//        — subverted: the treasure lasted 900 and vanished in a decade.
//   fr → "L'occasion fait le larron" (Opportunity makes the thief)
//        — subverted: here, opportunity made plunderers.
//   de → "Gelegenheit macht Diebe" (Opportunity makes thieves)
//        — subverted: here it made Plünderer, and the guardian never saw through it.

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
  siteId: "mogao-caves",
  storyId: "library-cave-sealed",
  icon: "\u{1F4DC}",
  storyCategory: "riddles_past",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 40.0362, lng: 94.8089 },
  source:
    'Aurel Stein, "Ruins of Desert Cathay" (1912); Paul Pelliot expedition records; International Dunhuang Project (IDP)',
  era: "~1002 AD (sealed) — 1900 AD (discovered)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#library-cave-sealed",

  title: "La Cueva Biblioteca: 50.000 manuscritos, novecientos años de silencio",

  subtitle:
    "El mayor hallazgo documental desde los Manuscritos del Mar Muerto",

  excerpt:
    "En 1900, un monje taoísta llamado Wang Yuanlu barría arena en un templo excavado en la roca, en pleno desierto del Gobi.",

  moralOrLesson:
    "La mayor amenaza para un tesoro no es el abandono ni la guerra, sino el momento en que aparece alguien que sabe exactamente lo que vale.",

  characters: [
    "Wang Yuanlu — el guardián taoísta que descubrió la cueva",
    "Aurel Stein — el explorador que se llevó los manuscritos",
    "Paul Pelliot — el sinólogo francés",
    "Los monjes desconocidos que sellaron la cueva hacia el año 1002",
  ],

  paragraphs: [
    {
      text: "En 1900, un monje taoísta llamado Wang Yuanlu barría arena en un templo excavado en la roca, en pleno desierto del Gobi. No era arqueólogo ni mucho menos: apenas un sacerdote autodidacta que se había propuesto cuidar las cuevas de Mogao, cerca de Dunhuang. Un día, mientras limpiaba un pasillo decorado con pinturas, notó una grieta en la pared. Detrás había una habitación sellada, de unos tres metros de lado, repleta de manuscritos del suelo al techo. Unos cincuenta mil.",
    },
    {
      text: "Nadie sabe con certeza quién selló esa habitación ni por qué. La teoría más aceptada es que unos monjes la cerraron hacia el año 1002, quizá para proteger los manuscritos de algún ejército invasor, quizá porque simplemente ya no cabía nada más. Fuera cual fuera la razón, tapiaron la entrada, la cubrieron con yeso, y el desierto hizo el resto. Durante casi novecientos años, el aire más seco del planeta conservó aquellos documentos en condiciones casi perfectas.",
    },
    {
      text: "Wang no entendía del todo la magnitud de su hallazgo, pero sabía que importaba. Avisó a las autoridades locales. Se encogieron de hombros. Escribió a los gobernadores provinciales. Le dijeron que lo volviera a sellar. Durante siete años, Wang suplicó a todo el que tuviera algo de poder que se interesara por lo que podría haber sido el mayor descubrimiento documental de la historia. Nadie le hizo caso.",
    },
    {
      text: "Entonces, en 1907, apareció Aurel Stein, un explorador húngaro-británico que había cruzado el desierto semanas enteras siguiendo un rumor. En cuanto vio la cueva, supo lo que tenía delante. Y jugó su carta con astucia: le dijo a Wang que era devoto seguidor de Xuanzang, el legendario monje budista del relato más famoso de China, «Viaje al Oeste». Le aseguró que el destino lo había enviado a llevar esos textos sagrados a occidente. Wang, hombre de fe profunda, le creyó cada palabra.",
    },
    {
      text: "Stein se marchó con veinticuatro cajas de manuscritos y cinco de pinturas: unos diez mil objetos. Le pagó a Wang casi nada. Un año después llegó el sinólogo francés Paul Pelliot, que seleccionó a mano otras seis mil de las mejores piezas. Tras él vinieron equipos japoneses, rusos y estadounidenses, cada uno llevándose lo que pudo. Para 1910, cuando el gobierno chino por fin reaccionó y envió lo que quedaba a Pekín, más de la mitad del contenido de la cueva estaba repartido por medio mundo.",
    },
    {
      text: "Y aquí es donde la historia duele de verdad. Wang gastó hasta la última moneda en restaurar las cuevas. Creía que estaba cambiando papel viejo por piedra sagrada, salvando el templo que amaba. Murió en 1931, enterrado junto a las cuevas que protegió toda su vida. Nunca entendió que lo que regaló valía más que todo lo que construyó. Dicen que no hay mal que cien años dure. Aquel tesoro duró novecientos — y bastó que alguien supiera su valor para que desapareciera en una década.",
    },
    {
      text: "Entre lo que Stein se llevó estaba el Sutra del Diamante, un texto budista impreso en el año 868, lo que lo convierte en el libro impreso con fecha más antiguo del mundo. Hoy se exhibe en la Biblioteca Británica de Londres. Su título completo se traduce del sánscrito como «El diamante que corta la ilusión». Un nombre perfecto para un texto arrebatado a un hombre que nunca logró ver a través de la ilusión en la que vivía.",
    },
    {
      text: "Hoy, para estudiar lo que salió de una sola cueva en el desierto chino, necesitarías billetes de avión a Londres, París, Tokio y San Petersburgo. La Cueva Biblioteca está vacía: una habitación pequeña y desnuda donde cincuenta mil voces permanecieron en la oscuridad durante nueve siglos. Al final, la mayor amenaza para un tesoro no es el abandono ni la guerra. Es el momento en que aparece alguien que sabe exactamente lo que vale.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#library-cave-sealed",

  title: "La Grotte-Bibliothèque : 50 000 manuscrits murés pendant 900 ans",

  subtitle:
    "La plus grande découverte documentaire depuis les manuscrits de la mer Morte",

  excerpt:
    "En 1900, un moine taoïste du nom de Wang Yuanlu balayait le sable dans un temple-grotte du désert de Gobi, en Chine.",

  moralOrLesson:
    "La plus grande menace pour un trésor, ce n'est ni l'oubli ni la guerre — c'est le moment où quelqu'un débarque qui sait exactement ce qu'il vaut.",

  characters: [
    "Wang Yuanlu — le gardien taoïste qui découvrit la grotte",
    "Aurel Stein — l'explorateur qui emporta les manuscrits",
    "Paul Pelliot — le sinologue français",
    "Les moines inconnus qui scellèrent la grotte vers l'an 1002",
  ],

  paragraphs: [
    {
      text: "En 1900, un moine taoïste du nom de Wang Yuanlu balayait le sable dans un temple-grotte du désert de Gobi, en Chine. Il n'avait rien d'un archéologue — c'était un prêtre autodidacte qui s'était donné pour mission d'entretenir les grottes de Mogao, près de Dunhuang. Un jour, en nettoyant un couloir orné de fresques, il remarqua une fissure dans la paroi. Derrière se trouvait une salle scellée, d'à peine trois mètres de côté, bourrée de manuscrits du sol au plafond. Environ cinquante mille.",
    },
    {
      text: "Personne ne sait exactement qui a muré cette pièce, ni pourquoi. L'hypothèse la plus probable : des moines l'ont scellée vers l'an 1002 — peut-être pour protéger les manuscrits d'armées ennemies, peut-être simplement parce que la grotte débordait. Quoi qu'il en soit, l'entrée fut maçonnée, recouverte d'enduit, et le désert fit le reste. Pendant près de neuf cents ans, l'air le plus sec de la planète conserva ces documents dans un état quasi parfait.",
    },
    {
      text: "Wang ne mesurait pas tout à fait l'ampleur de sa découverte, mais il savait que c'était important. Il prévint les autorités locales. Elles haussèrent les épaules. Il écrivit aux autorités provinciales. On lui répondit de tout refermer. Pendant sept ans, Wang supplia tous ceux qui détenaient un peu de pouvoir de s'intéresser à ce qui était peut-être la plus grande découverte documentaire de l'histoire. Personne ne bougea.",
    },
    {
      text: "Puis, en 1907, surgit Aurel Stein, un explorateur hungaro-britannique qui avait traversé le désert pendant des semaines sur la foi d'une rumeur. Dès qu'il vit la grotte, il comprit l'ampleur de la trouvaille. Sa manœuvre fut redoutable : il se présenta comme un disciple de Xuanzang, le moine légendaire du plus célèbre récit chinois, « Le Voyage en Occident ». Il dit que le destin l'envoyait porter ces textes sacrés vers l'ouest. Wang, homme de foi profonde, le crut sur parole.",
    },
    {
      text: "Stein repartit avec vingt-quatre caisses de manuscrits et cinq de peintures — environ dix mille pièces. Il paya Wang une somme dérisoire. Un an plus tard, le sinologue Paul Pelliot sélectionna à la main six mille des meilleures pièces. Des équipes japonaises, russes et américaines suivirent, se servant à leur tour. En 1910, quand le gouvernement chinois réagit enfin et fit expédier le reste à Pékin, plus de la moitié du contenu de la grotte était déjà dispersée à travers le monde.",
    },
    {
      text: "Et c'est là que l'histoire fait mal. Wang dépensa chaque centime pour restaurer les grottes. Il croyait sincèrement échanger du vieux papier contre de la pierre sacrée, sauver le temple qu'il aimait. Il mourut en 1931, enterré près des grottes qu'il avait protégées toute sa vie. Il ne comprit jamais que ce qu'il avait cédé valait bien plus que tout ce qu'il avait bâti. On dit que l'occasion fait le larron. Ici, l'occasion a fait le pilleur — et le gardien n'a jamais rien vu venir.",
    },
    {
      text: "Parmi ce que Stein emporta se trouvait le Sûtra du Diamant — un texte bouddhiste imprimé en 868, ce qui en fait le plus ancien livre imprimé daté au monde. Il est aujourd'hui conservé à la British Library de Londres. Son titre complet, traduit du sanskrit, signifie « Le diamant qui tranche l'illusion ». Un nom parfait pour un texte arraché à un homme qui n'a jamais percé l'illusion dans laquelle il vivait.",
    },
    {
      text: "Aujourd'hui, pour étudier ce qui provenait d'une seule grotte dans le désert chinois, il faudrait des billets d'avion pour Londres, Paris, Tokyo et Saint-Pétersbourg. La Grotte-Bibliothèque est vide désormais — une petite salle nue où cinquante mille voix sont restées dans le noir pendant neuf siècles. Au fond, la plus grande menace pour un trésor, ce n'est ni l'oubli ni la guerre. C'est le moment où quelqu'un débarque qui sait exactement ce qu'il vaut.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#library-cave-sealed",

  title: "Die Höhlenbibliothek: 50.000 Manuskripte, 900 Jahre versiegelt",

  subtitle:
    "Der größte Dokumentenfund seit den Schriftrollen vom Toten Meer",

  excerpt:
    "Im Jahr 1900 fegte ein taoistischer Wandermönch namens Wang Yuanlu Sand aus einem Höhlentempel in der chinesischen Wüste Gobi.",

  moralOrLesson:
    "Die größte Bedrohung für einen Schatz ist weder Verfall noch Krieg — sondern der Moment, in dem jemand auftaucht, der genau weiß, was er wert ist.",

  characters: [
    "Wang Yuanlu — der taoistische Hüter, der die Höhle entdeckte",
    "Aurel Stein — der Entdecker, der die Manuskripte mitnahm",
    "Paul Pelliot — der französische Sinologe",
    "Die unbekannten Mönche, die die Höhle um 1002 versiegelten",
  ],

  paragraphs: [
    {
      text: "Im Jahr 1900 fegte ein taoistischer Wandermönch namens Wang Yuanlu Sand aus einem Höhlentempel in der chinesischen Wüste Gobi. Er war kein Archäologe — nur ein Autodidakt, der es sich zur Aufgabe gemacht hatte, die verfallenden Mogao-Grotten bei Dunhuang zu pflegen. Beim Reinigen eines bemalten Korridors bemerkte er einen Riss in der Wand. Dahinter verbarg sich ein versiegelter Raum, kaum drei Meter im Quadrat, vom Boden bis zur Decke vollgestapelt mit Manuskripten. Rund fünfzigtausend Stück.",
    },
    {
      text: "Niemand weiß genau, wer diesen Raum versiegelt hat oder warum. Die wahrscheinlichste Erklärung: Mönche verschlossen ihn um das Jahr 1002 — vielleicht zum Schutz vor einfallenden Armeen, vielleicht schlicht, weil kein Platz mehr war. Wie auch immer — der Eingang wurde zugemauert und verputzt, und die Wüste erledigte den Rest. Fast neunhundert Jahre lang bewahrte die trockenste Luft der Erde diese Dokumente in nahezu perfektem Zustand.",
    },
    {
      text: "Wang verstand nicht ganz, was er gefunden hatte, aber er wusste, dass es wichtig war. Er meldete den Fund den örtlichen Behörden. Die zuckten mit den Schultern. Er schrieb an die Provinzregierung. Man sagte ihm, er solle alles wieder zumauern. Sieben Jahre lang flehte Wang jeden an, der auch nur ein wenig Macht besaß, sich für den womöglich größten Dokumentenfund der Geschichte zu interessieren. Niemand reagierte.",
    },
    {
      text: "Dann tauchte 1907 Aurel Stein auf, ein ungarisch-britischer Entdecker, der wochenlang durch die Wüste marschiert war — einem bloßen Gerücht folgend. Sobald er die Höhle sah, wusste er, was er vor sich hatte. Sein Vorgehen war raffiniert: Er gab sich als Anhänger von Xuanzang aus, dem legendären Mönch aus Chinas berühmtester Erzählung, der «Reise nach Westen». Das Schicksal habe ihn gesandt, diese heiligen Texte gen Westen zu tragen. Wang, ein tief gläubiger Mann, glaubte ihm jedes Wort.",
    },
    {
      text: "Stein verließ Dunhuang mit vierundzwanzig Kisten Manuskripte und fünf Kisten Gemälde — rund zehntausend Stücke. Er zahlte Wang fast nichts. Ein Jahr später kam der französische Sinologe Paul Pelliot und wählte von Hand sechstausend der besten Stücke aus. Japanische, russische und amerikanische Teams folgten, jedes bediente sich. Als die chinesische Regierung 1910 endlich eingriff und den Rest nach Peking bringen ließ, war mehr als die Hälfte des Höhleninhalts weltweit verstreut.",
    },
    {
      text: "Und hier wird die Geschichte schmerzhaft. Wang gab jede Münze, die er bekam, für die Restaurierung der Grotten aus. Er glaubte aufrichtig, altes Papier gegen heiligen Stein zu tauschen — den Tempel zu retten, den er liebte. Er starb 1931, begraben neben den Höhlen, die er sein Leben lang behütet hatte. Er verstand nie, dass das, was er hergab, mehr wert war als alles, was er je erbaute. Gelegenheit macht Diebe, sagt man. Hier machte sie Plünderer — und der Wächter durchschaute die Täuschung nie.",
    },
    {
      text: "Unter Steins Beute befand sich das Diamant-Sutra — ein buddhistischer Text, gedruckt im Jahr 868, damit das älteste datierte Druckwerk der Welt. Heute liegt es in der British Library in London. Sein vollständiger Titel lautet, aus dem Sanskrit übersetzt, «Der Diamant, der die Illusion durchschneidet». Ein perfekter Name für einen Text, der einem Mann abgenommen wurde, der die Illusion, in der er lebte, nie durchschaute.",
    },
    {
      text: "Heute bräuchte man Flugtickets nach London, Paris, Tokio und Sankt Petersburg, um zu studieren, was aus einer einzigen Höhle in der chinesischen Wüste stammt. Die Höhlenbibliothek selbst ist leer — ein kleiner, kahler Raum, in dem fünfzigtausend Stimmen neun Jahrhunderte lang im Dunkeln saßen. Am Ende ist die größte Bedrohung für einen Schatz weder Verfall noch Krieg. Es ist der Moment, in dem jemand auftaucht, der genau weiß, was er wert ist.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n⏳ Pushing ${label} ...`);

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
        // Safety: only write if this langStoryId does NOT already exist
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `⚠️  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`✅ ${label} overwritten successfully.`);
    } else {
      console.error(`❌ Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══ Pushing Library Cave story translations (es, fr, de) to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [es, fr, de]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      const chars = p.text.length;
      const words = p.text.split(/\s+/).length;
      totalChars += chars;
      if (chars > 500) {
        console.warn(
          `⚠️  ${rec.lang} paragraph ${i + 1}: ${chars} chars (over 500 limit)`
        );
      }
      if (words > 100) {
        console.warn(
          `⚠️  ${rec.lang} paragraph ${i + 1}: ${words} words (over 100 limit)`
        );
      }
    }
    console.log(
      `\n📊 ${rec.lang}: ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(es);
  await pushStory(fr);
  await pushStory(de);

  console.log("\n═══ All three translations pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err);
  process.exit(1);
});
