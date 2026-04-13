// Push Spanish, French, and German recreations of "The Paradise Garden of the Old Man"
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
  siteId: "alamut-castle",
  storyId: "paradise-garden-legend",
  icon: "\u{1F33F}",
  storyCategory: "tricksters_folk_tales",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 36.4447, lng: 50.5861 },
  source:
    "Marco Polo, The Travels of Marco Polo (Yule-Cordier translation, Book 1, Ch. 24); Farhad Daftary, The Assassin Legends: Myths of the Isma'ilis (I.B. Tauris, 1994); Bernard Lewis, The Assassins: A Radical Sect in Islam (Weidenfeld & Nicolson, 1967); Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Sylvestre de Sacy, Academy of Inscriptions lecture, 1809; Encyclopaedia Iranica, 'HASAN SABBAH'",
  characters: [
    "Hassan-i Sabbah (the 'Old Man of the Mountain')",
    "Marco Polo (Venetian traveler who spread the legend)",
    "Rustichello da Pisa (who transcribed Polo's account)",
    "Rashid al-Din Sinan (Syrian 'Old Man of the Mountain')",
    "Farhad Daftary (modern scholar who debunked the myths)",
  ],
  era: "1090-1256 CE (Nizari Ismaili period); 1272 (Marco Polo's journey through Persia)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#paradise-garden-legend",

  title: "El jardín que nunca existió",

  subtitle:
    "La mentira más famosa sobre los Asesinos, y la verdad que enterró durante ochocientos años",

  excerpt:
    "Entre dos montañas, el Viejo de la Montaña había mandado construir el jardín más grande y hermoso jamás visto. En él había pabellones cubiertos de oro, arroyos de vino, leche y miel, y las doncellas más hermosas del mundo.",

  moralOrLesson:
    "Las historias más duraderas sobre un pueblo no siempre son las más verdaderas — las leyendas nacidas del miedo, los prejuicios y la imaginación de los extraños pueden eclipsar siglos de erudición, devoción y logros genuinos, hasta que el mito se vuelve más real que la historia que reemplazó.",

  paragraphs: [
    {
      text: "En 1272, un comerciante veneciano llamado Marco Polo cruzó las montañas del norte de Persia. Nunca pisó el castillo de Alamut — los mongoles lo habían destruido dieciséis años antes. Pero en los mercados de la Ruta de la Seda escuchó una historia tan descabellada que iba a sobrevivir ocho siglos. Un valle escondido entre dos montañas, convertido en el jardín más espectacular jamás creado: pabellones de oro, arroyos de vino y miel, y las mujeres más hermosas del mundo.",
    },
    {
      text: "La leyenda decía así. Hassan-i Sabbah — el líder que los cruzados llamaban «el Viejo de la Montaña» — elegía jóvenes de aldeas cercanas, los drogaba hasta dejarlos inconscientes y los llevaba a ese jardín. Al despertar, creían haber entrado literalmente al Paraíso. Mujeres hermosas, banquetes sin fin, todos los placeres imaginables. Días después, los drogaban otra vez y los sacaban. Entonces Hassan les decía: solo yo puedo devolverte allí. Obedéceme — aunque signifique morir — y será tuyo para siempre.",
    },
    {
      text: "Así fue como, según la leyenda, creó a los asesinos más temibles del mundo medieval. Hombres que no solo aceptaban la muerte — corrían hacia ella, convencidos de que una última misión les compraría la eternidad. Los cruzados veían cómo estos agentes se infiltraban en cortes reales disfrazados de monjes o soldados, atacaban con una sola daga a plena luz del día y nunca intentaban escapar. Sus rivales los llamaron hashishin — un insulto que significaba «consumidores de hachís». Cuando esa palabra llegó a Europa, se convirtió en «asesino».",
    },
    {
      text: "Pero nada de esto era verdad. El historiador Farhad Daftary, cuyo libro de 1994 se convirtió en el estudio definitivo de estos mitos, demostró que el jardín jamás existió. Ninguna fuente de la propia comunidad de Hassan lo menciona. Ningún escritor musulmán de la época habla de drogas. Cuando el cronista mongol Juvayni inspeccionó Alamut personalmente tras su captura en 1256, encontró almacenes, talleres y una biblioteca — pero ni pabellones dorados, ni vino, ni jardín. Polo repetía chismes de bazar sobre un lugar que nunca vio.",
    },
    {
      text: "El verdadero Hassan-i Sabbah no se parecía en nada a la leyenda. Era un erudito de disciplina feroz que ejecutó a su propio hijo por beber vino. Tomó Alamut — una fortaleza sobre un acantilado vertical en el norte de Irán — en 1090, supuestamente sin derramar una gota de sangre. Pasó treinta y cuatro años dentro sin salir jamás, construyendo una de las grandes bibliotecas del mundo islámico. Sus seguidores no eran zombis drogados. Eran hombres cultos que aprendían idiomas, estudiaban diplomacia y actuaban por convicción religiosa genuina.",
    },
    {
      text: "¿Los verdaderos «jardines» de Alamut? Terrazas agrícolas, regadas por canales tallados a mano y cisternas excavadas en los acantilados de piedra caliza. Ni pabellones de oro. Ni arroyos de miel. Solo ingeniería brillante que alimentó a una comunidad de estudiosos, soldados y familias en uno de los valles más remotos del planeta. Algunas de esas cisternas siguen reteniendo agua hoy, casi mil años después.",
    },
    {
      text: "Dicen que la mentira tiene las patas cortas. Pero esta lleva ocho siglos corriendo maratones. La historia de Polo — contada por un hombre que nunca estuvo allí, sobre hechos que nunca ocurrieron, dictada a un novelista en una celda — le dio al mundo la palabra «asesino» e inspiró Assassin's Creed. El verdadero Hassan — un erudito que tomó una fortaleza sin sangre y no salió en treinta y cuatro años — es casi un desconocido. El arma más peligrosa de la historia nunca fue una daga. Fue una historia que nadie se molestó en verificar.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#paradise-garden-legend",

  title: "Le Paradis qui n'a jamais existé",

  subtitle:
    "Le plus célèbre mensonge sur les Assassins — et la vérité qu'il a enterrée pendant huit cents ans",

  excerpt:
    "Entre deux montagnes, le Vieux de la Montagne avait fait aménager le plus grand et le plus beau jardin jamais vu. On y trouvait des pavillons couverts d'or, des ruisseaux de vin, de lait et de miel, et les plus belles demoiselles du monde.",

  moralOrLesson:
    "Les histoires les plus tenaces sur un peuple ne sont pas toujours les plus vraies — les légendes nées de la peur, des préjugés et de l'imagination des étrangers peuvent éclipser des siècles d'érudition, de dévotion et de réalisations authentiques, jusqu'à ce que le mythe devienne plus réel que l'histoire qu'il a remplacée.",

  paragraphs: [
    {
      text: "En 1272, un marchand vénitien du nom de Marco Polo traversa les montagnes du nord de la Perse. Il n'a jamais mis les pieds au château d'Alamut — les Mongols l'avaient rasé seize ans plus tôt. Mais sur les marchés de la Route de la Soie, il a entendu une histoire tellement folle qu'elle allait survivre huit siècles. Une vallée cachée entre deux montagnes, transformée en le plus beau jardin jamais créé : des pavillons couverts d'or, des ruisseaux de vin et de miel, et les plus belles femmes du monde.",
    },
    {
      text: "Voici la légende. Hassan-i Sabbah — que les croisés appelaient « le Vieux de la Montagne » — choisissait des jeunes dans les villages alentour, les droguait et les emmenait dans ce jardin. Au réveil, ils croyaient avoir mis les pieds au Paradis. Femmes magnifiques, festins sans fin, tous les plaisirs du monde. Quelques jours plus tard, on les droguait à nouveau et on les sortait. Alors Hassan leur disait : moi seul peux t'y renvoyer. Obéis-moi — même au prix de ta vie — et c'est à toi pour l'éternité.",
    },
    {
      text: "C'est ainsi, disait la légende, qu'il créa les tueurs les plus redoutables du Moyen Âge. Des hommes qui n'acceptaient pas simplement la mort — ils couraient vers elle, convaincus qu'une dernière mission leur ouvrirait les portes de l'éternité. Les croisés les voyaient s'infiltrer dans les cours royales déguisés en moines ou en soldats, frapper d'un seul coup de poignard en plein jour, sans jamais chercher à fuir. Leurs ennemis les surnommèrent hashishin — une insulte signifiant « drogués au haschisch ». Quand ce mot atteignit l'Europe, il devint « assassin ».",
    },
    {
      text: "Sauf que rien de tout cela n'était vrai. L'historien Farhad Daftary, dont le livre de 1994 est devenu la référence sur ces mythes, a démontré que le jardin n'a jamais existé. Aucune source du propre peuple de Hassan ne le mentionne. Aucun auteur musulman de l'époque ne parle de drogue. Quand le chroniqueur mongol Juvayni a inspecté Alamut en personne après sa prise en 1256, il a trouvé des entrepôts, des ateliers et une bibliothèque — mais ni pavillons dorés, ni vin, ni jardin. Polo répétait des ragots de bazar sur un endroit qu'il n'avait jamais vu.",
    },
    {
      text: "Le vrai Hassan-i Sabbah n'avait rien du personnage de la légende. C'était un érudit d'une discipline implacable, qui a fait exécuter son propre fils pour avoir bu du vin. Il a pris Alamut — une forteresse perchée sur une falaise verticale au nord de l'Iran — en 1090, sans verser une goutte de sang. Il y a passé trente-quatre ans sans jamais en sortir, bâtissant l'une des grandes bibliothèques du monde islamique. Ses disciples n'étaient pas des zombies drogués mais des hommes cultivés qui apprenaient des langues, étudiaient la diplomatie et agissaient par conviction religieuse.",
    },
    {
      text: "Les vrais « jardins » d'Alamut ? Des terrasses agricoles, irriguées par des canaux taillés à la main et des citernes creusées dans la roche calcaire. Pas de pavillons d'or. Pas de ruisseaux de miel. Juste une ingénierie brillante qui nourrissait une communauté de savants, de soldats et de familles dans l'une des vallées les plus isolées de la planète. Certaines de ces citernes retiennent encore l'eau aujourd'hui, presque mille ans plus tard.",
    },
    {
      text: "Beaumarchais avait raison : « Calomniez, il en restera toujours quelque chose. » Polo a calomnié tout un peuple — et huit siècles plus tard, il en reste le mot « assassin ». Son récit — dicté à un romancier dans une cellule par un homme qui n'y avait jamais mis les pieds — a inspiré jusqu'à Assassin's Creed. Le vrai Hassan — un érudit qui a pris une forteresse sans sang et n'en est pas sorti en trente-quatre ans — reste un parfait inconnu. L'arme la plus dangereuse de l'histoire n'a jamais été un poignard. C'était une histoire que personne n'a vérifiée.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#paradise-garden-legend",

  title: "Der Garten, den es nie gab",

  subtitle:
    "Die berühmteste Lüge über die Assassinen — und die Wahrheit, die sie achthundert Jahre lang begrub",

  excerpt:
    "Zwischen zwei Bergen hatte der Alte vom Berg den größten und schönsten Garten anlegen lassen, den man je gesehen hatte. Darin standen goldene Pavillons, es flossen Bäche aus Wein, Milch und Honig, und die schönsten Jungfrauen der Welt wandelten umher.",

  moralOrLesson:
    "Die langlebigsten Geschichten über ein Volk sind nicht immer die wahrsten — Legenden, geboren aus Angst, Vorurteilen und der Fantasie von Außenstehenden, können Jahrhunderte voller Gelehrsamkeit, Hingabe und echter Errungenschaften in den Schatten stellen, bis der Mythos realer wird als die Geschichte, die er verdrängt hat.",

  paragraphs: [
    {
      text: "Im Jahr 1272 durchquerte ein venezianischer Kaufmann namens Marco Polo die Berge Nordpersiens. Er hat die Festung Alamut nie betreten — die Mongolen hatten sie sechzehn Jahre zuvor zerstört. Aber auf den Märkten der Seidenstraße hörte er eine Geschichte, die so unglaublich war, dass sie acht Jahrhunderte überleben sollte. Ein verborgenes Tal zwischen zwei Bergen, verwandelt in den schönsten Garten, den die Welt je gesehen hatte: goldene Pavillons, Bäche aus Wein und Honig und die schönsten Frauen der Welt.",
    },
    {
      text: "So ging die Legende. Hassan-i Sabbah — der Anführer, den die Kreuzfahrer \u201Eden Alten vom Berg\u201C nannten — suchte junge Männer aus umliegenden Dörfern aus, betäubte sie und brachte sie in diesen Garten. Als sie aufwachten, glaubten sie, tatsächlich im Paradies gelandet zu sein. Wunderschöne Frauen, endlose Festmahle, jede erdenkliche Lust. Tage später wurden sie erneut betäubt und herausgebracht. Dann sagte Hassan ihnen: Nur ich kann dich zurückschicken. Gehorche mir — selbst wenn es den Tod bedeutet — und es gehört dir für immer.",
    },
    {
      text: "So schuf er laut der Legende die furchtlosesten Killer des Mittelalters. Männer, die den Tod nicht nur hinnahmen — sie rannten ihm entgegen, überzeugt, dass ein letzter Auftrag ihnen die Ewigkeit sichern würde. Die Kreuzfahrer sahen, wie diese Agenten als Mönche oder Soldaten verkleidet in königliche Höfe eindrangen, am helllichten Tag mit einem einzigen Dolch zuschlugen und nie versuchten zu fliehen. Ihre Feinde nannten sie Haschischin — ein Schimpfwort für \u201EHaschisch-Konsumenten\u201C. Als das Wort Europa erreichte, wurde daraus \u201EAssassine\u201C.",
    },
    {
      text: "Nur: Nichts davon stimmte. Der Historiker Farhad Daftary, dessen Buch von 1994 zur maßgeblichen Studie dieser Mythen wurde, bewies, dass der Garten nie existiert hat. Keine Quelle aus Hassans eigener Gemeinschaft erwähnt ihn. Kein muslimischer Autor jener Zeit spricht von Drogen. Als der mongolische Chronist Juvayni Alamut nach der Eroberung 1256 persönlich inspizierte, fand er Lagerräume, Werkstätten und eine Bibliothek — aber keine goldenen Pavillons, keinen Wein, keinen Garten. Polo gab Basargerüchte über einen Ort wieder, den er nie gesehen hatte.",
    },
    {
      text: "Der echte Hassan-i Sabbah hatte nichts mit der Legende gemein. Er war ein streng disziplinierter Gelehrter, der seinen eigenen Sohn hinrichten ließ, weil dieser Wein getrunken hatte. Er nahm Alamut — eine Festung auf einer senkrechten Klippe im Norden Irans — 1090 ein, angeblich ohne einen Tropfen Blut. Vierunddreißig Jahre lang verließ er die Mauern kein einziges Mal und baute eine der großen Bibliotheken der islamischen Welt auf. Seine Anhänger waren keine zugedröhnten Zombies, sondern gebildete Männer, die Sprachen lernten, Diplomatie studierten und aus religiöser Überzeugung handelten.",
    },
    {
      text: "Die echten \u201EGärten\u201C von Alamut? Landwirtschaftliche Terrassen, bewässert durch handgehauene Kanäle und Zisternen, tief in die Kalksteinfelsen geschlagen. Keine goldenen Pavillons. Keine Honigbäche. Nur brillante Ingenieurskunst, die eine Gemeinschaft aus Gelehrten, Soldaten und Familien in einem der abgelegensten Täler der Erde ernährte. Einige dieser Zisternen halten noch heute Wasser — fast tausend Jahre später.",
    },
    {
      text: "Man sagt: Papier ist geduldig. Das Papier, auf dem Polos Geschichte landete, war das geduldigste der Welt — es trug eine Lüge achthundert Jahre lang, ohne zu protestieren. Sein Bericht — diktiert von einem Mann, der nie dort war, an einen Romanautor in einer Gefängniszelle — gab der Welt das Wort \u201EAssassine\u201C und inspirierte Assassin's Creed. Der echte Hassan — ein Gelehrter, der eine Festung ohne Blut nahm und sie vierunddreißig Jahre nicht verließ — ist praktisch unbekannt. Die gefährlichste Waffe der Geschichte war nie ein Dolch. Es war eine Geschichte, die niemand überprüft hat.",
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
  console.log("═══ Pushing paradise-garden-legend translations to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [es, fr, de]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      const chars = p.text.length;
      totalChars += chars;
      if (chars > 600) {
        console.warn(
          `⚠️  ${rec.lang} paragraph ${i + 1}: ${chars} chars (over 600 limit)`
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
