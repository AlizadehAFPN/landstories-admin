import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared (unchanged) fields from English record ───
const shared = {
  siteId: "pompeii",
  storyId: "villa-mysteries-initiation",
  storyCategory: "riddles_past",
  coordinates: { lat: 40.7505, lng: 14.477 },
  characters: [
    "The young initiate",
    "Dionysus/Bacchus (depicted)",
    "The winged flagellator",
    "Wealthy villa owner",
    "Priestess of the Mysteries",
  ],
  era: "Late Roman Republic (c. 60 BC), preserved by eruption of 79 AD",
  disabled: false,
  hasAudio: false,
  icon: "🍷",
  image: "",
  isFree: true,
  readingTimeMinutes: 2,
  source: "Maiuri, Alfonso, La Villa dei Misteri; Zanker, Paul, Pompeii: Public and Private Life",
  thumbnail: "",
  tier: "A",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════
// SPANISH (es)
// ═══════════════════════════════════════════════════════════
// Cultural proverb: "No hay secreto que cien años dure"
// (No secret lasts a hundred years)
// Subverted: This one lasted almost two thousand — and it
// wasn't time that betrayed it, it was a volcano.
// ═══════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#villa-mysteries-initiation",
  title: "La Villa de los Misterios",
  subtitle: "Un ritual prohibido, congelado en pintura durante dos mil años",
  excerpt:
    "A las afueras de Pompeya, bajo toneladas de ceniza volcánica, había una habitación que nadie debía volver a ver jamás.",
  moralOrLesson:
    "Las experiencias más poderosas son las que no pueden contarse — lo que debía permanecer en secreto fue preservado para siempre por una catástrofe.",
  paragraphs: [
    {
      text: "A las afueras de Pompeya, bajo toneladas de ceniza volcánica, había una habitación que nadie debía volver a ver jamás. Cuando los arqueólogos la destaparon a principios del siglo XX, se quedaron helados: veintinueve figuras de tamaño real, pintadas sobre paredes rojo sangre, representando paso a paso lo que parecía una iniciación en un culto antiguo y prohibido.",
    },
    {
      text: "Las pinturas son de alrededor del año 60 a.C. y envuelven tres paredes como una película panorámica. Cuentan una sola historia. Una joven entra con velo, claramente nerviosa. Una sacerdotisa lee un pergamino sagrado. Un niño recita mientras otra mujer prepara una ofrenda. Hasta ahí, podría ser cualquier ceremonia religiosa romana. Pero entonces la escena pega un giro brutal.",
    },
    {
      text: "Una mujer destapa una cesta y revela un objeto oculto — casi con seguridad un símbolo sagrado de Dioniso, el dios griego del vino, la locura y el éxtasis. Una figura alada levanta un látigo. La joven cae de rodillas, medio desnuda, preparándose para el golpe. A su lado, otra mujer baila como poseída, perdida en trance. Es placer y dolor chocando de frente, sin aviso y sin frenos.",
    },
    {
      text: "Ahora piensa en esto. En el año 186 a.C. — más de un siglo antes de que estas pinturas existieran — el Senado romano había declarado ilegal el culto a Baco, la versión romana de Dioniso. Acusaron a sus seguidores de conspiración, orgías y asesinato, y ejecutaron a miles por toda Italia. Fue una de las persecuciones religiosas más violentas de la historia de Roma.",
    },
    {
      text: "Y aun así, alguien — probablemente una mujer romana rica — pagó para que estos rituales prohibidos se pintaran con todo lujo de detalle en su comedor privado. Del suelo al techo. En una casa donde recibía invitados. O tenía un valor descomunal, o el culto se había hundido tanto bajo tierra que las autoridades ya no podían ni olerlo.",
    },
    {
      text: "Los expertos llevan más de cien años peleándose por estos frescos. Unos dicen que es el registro real de una iniciación auténtica. Otros creen que es algo más simbólico — el viaje del alma a través del miedo hasta la transformación. Algunos insisten en que es solo la preparación de una novia rica, disfrazada con imágenes religiosas para impresionar. La verdad honesta es que nadie lo sabe.",
    },
    {
      text: "Y ese era exactamente el punto. Los llamaban «los Misterios» porque los iniciados juraban no revelar jamás lo que ocurría — ni de palabra, ni por escrito, ni nunca. Dicen que no hay secreto que cien años dure. Este duró casi dos mil. Pero no fue el tiempo quien lo delató: fue el Vesubio, que en el año 79 d.C. sepultó esta sala en la oscuridad y, sin quererlo, conservó para siempre lo único que jamás debió salir a la luz.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// FRENCH (fr)
// ═══════════════════════════════════════════════════════════
// Cultural proverb: "Les murs ont des oreilles"
// (The walls have ears)
// Subverted: These walls didn't have ears — they had eyes.
// Twenty-nine pairs of painted eyes that stayed silent for
// almost two thousand years.
// ═══════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#villa-mysteries-initiation",
  title: "La Villa des Mystères",
  subtitle: "Un rituel interdit, figé dans la peinture depuis deux mille ans",
  excerpt:
    "Aux portes de Pompéi, sous des mètres de cendres volcaniques, il y avait une pièce que personne ne devait jamais revoir.",
  moralOrLesson:
    "Les expériences les plus puissantes sont celles qui ne peuvent être dites — ce qui devait rester secret a été préservé pour l'éternité par une catastrophe.",
  paragraphs: [
    {
      text: "Aux portes de Pompéi, sous des mètres de cendres volcaniques, il y avait une pièce que personne ne devait jamais revoir. Quand les archéologues l'ont mise au jour au début du XXe siècle, ils sont restés cloués sur place : vingt-neuf personnages grandeur nature, peints sur des murs rouge sang, mimant ce qui ressemble à une initiation étape par étape dans un culte ancien et interdit.",
    },
    {
      text: "Les peintures datent d'environ 60 avant J.-C. et enveloppent trois murs comme un film panoramique. Elles racontent une seule et même histoire. Une jeune femme entre, voilée, visiblement nerveuse. Une prêtresse lit un rouleau sacré. Un garçon récite quelque chose tandis qu'une autre femme dépose une offrande. Jusque-là, ça pourrait être n'importe quelle cérémonie romaine. Mais ensuite, tout bascule.",
    },
    {
      text: "Une femme soulève un tissu et dévoile un objet caché — très probablement un symbole sacré de Dionysos, le dieu grec du vin, de la folie et de l'extase. Une silhouette ailée brandit un fouet. La jeune femme tombe à genoux, à moitié nue, se préparant au coup. À côté d'elle, une autre danse comme possédée, perdue dans la transe. Plaisir et douleur qui se percutent de plein fouet, sans aucun filtre.",
    },
    {
      text: "Et voilà ce qui rend la scène stupéfiante. En 186 avant J.-C. — plus d'un siècle avant la création de ces fresques — le Sénat romain avait officiellement interdit le culte de Bacchus, le nom romain de Dionysos. Ses adeptes furent accusés de complot, d'orgies et de meurtre, puis des milliers de personnes furent traquées et exécutées à travers toute l'Italie. L'une des répressions religieuses les plus sanglantes de l'histoire romaine.",
    },
    {
      text: "Et pourtant, quelqu'un — sûrement une riche Romaine — a payé pour que ces rituels interdits soient peints dans le moindre détail sur les murs de sa salle à manger privée. Du sol au plafond. Dans une maison où elle recevait des invités. Soit elle avait un courage hors du commun, soit le culte s'était enfoncé si profondément dans la clandestinité que les autorités ne pouvaient tout simplement plus l'atteindre.",
    },
    {
      text: "Les spécialistes se disputent sur ces fresques depuis plus d'un siècle. Certains y voient le récit fidèle d'une vraie initiation. D'autres pensent que c'est plus symbolique — une métaphore du voyage de l'âme à travers la peur et la transformation. Quelques-uns affirment qu'il s'agit simplement de la préparation d'une mariée fortunée, habillée d'images religieuses spectaculaires. La vérité honnête, c'est que personne ne sait.",
    },
    {
      text: "Et c'est justement là tout le sens du mot. On les appelait « les Mystères » parce que les initiés juraient de ne jamais révéler ce qui s'y passait — ni par la parole, ni par l'écrit, jamais. On dit que les murs ont des oreilles. Ceux de Pompéi n'avaient pas d'oreilles — ils avaient des yeux, peints grandeur nature, muets depuis presque deux mille ans. Le Vésuve a enseveli cette pièce en l'an 79 et, sans le vouloir, a figé pour toujours le seul secret qui ne devait jamais voir le jour.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// GERMAN (de)
// ═══════════════════════════════════════════════════════════
// Cultural proverb: "Verbotene Früchte schmecken am besten"
// (Forbidden fruits taste the sweetest)
// Subverted: This woman didn't just taste the forbidden fruit
// — she painted it on her walls in full color.
// ═══════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#villa-mysteries-initiation",
  title: "Die Villa der Mysterien",
  subtitle: "Ein verbotenes Ritual, eingefroren in Farbe seit zweitausend Jahren",
  excerpt:
    "Direkt vor den Mauern von Pompeji, begraben unter Tonnen von Vulkanasche, lag ein Raum, den niemand jemals wieder sehen sollte.",
  moralOrLesson:
    "Die mächtigsten Erfahrungen sind jene, die sich nicht in Worte fassen lassen — was für immer geheim bleiben sollte, wurde durch eine Katastrophe für die Ewigkeit bewahrt.",
  paragraphs: [
    {
      text: "Direkt vor den Mauern von Pompeji, begraben unter Tonnen von Vulkanasche, lag ein Raum, den niemand jemals wieder sehen sollte. Als Archäologen ihn Anfang des 20. Jahrhunderts freilegten, verschlug es ihnen die Sprache: neunundzwanzig lebensgroße Figuren, gemalt auf blutrote Wände, die Schritt für Schritt eine Einweihung in einen uralten, verbotenen Kult darzustellen schienen.",
    },
    {
      text: "Die Malereien stammen aus der Zeit um 60 v. Chr. und ziehen sich über drei Wände wie ein Breitwandfilm. Sie erzählen eine einzige, zusammenhängende Geschichte. Eine junge Frau tritt ein, verschleiert, sichtlich nervös. Eine Priesterin liest von einer heiligen Schriftrolle. Ein Junge rezitiert etwas, während eine andere Frau eine Opfergabe darbringt. Bis hierhin könnte es jede beliebige römische Zeremonie sein. Doch dann kippt die Szene.",
    },
    {
      text: "Eine Frau hebt ein Tuch von einem Korb und enthüllt etwas Verborgenes — höchstwahrscheinlich ein heiliges Symbol des Dionysos, des griechischen Gottes des Weins, des Wahnsinns und der Ekstase. Eine geflügelte Gestalt hebt eine Peitsche. Die junge Frau sinkt auf die Knie, halb entblößt, und wartet auf den Schlag. Neben ihr tanzt eine andere wie in Trance, völlig entrückt. Lust und Schmerz, die ungebremst aufeinanderprallen.",
    },
    {
      text: "Und jetzt kommt der eigentliche Hammer. Im Jahr 186 v. Chr. — mehr als ein Jahrhundert bevor diese Fresken entstanden — hatte der römische Senat den Kult des Bacchus, die römische Version von Dionysos, offiziell verboten. Man beschuldigte seine Anhänger der Verschwörung, der Ausschweifung und des Mordes und ließ Tausende in ganz Italien hinrichten. Es war eine der brutalsten religiösen Verfolgungen der römischen Geschichte.",
    },
    {
      text: "Und trotzdem ließ jemand — vermutlich eine wohlhabende Römerin — diese verbotenen Rituale in aller Ausführlichkeit an die Wände ihres privaten Speisesaals malen. Vom Boden bis zur Decke. In einem Haus, in dem sie Gäste empfing. Man sagt ja: Verbotene Früchte schmecken am besten. Diese Frau hat sie nicht nur gekostet — sie hat sie in Farbe an die Wand gepinselt.",
    },
    {
      text: "Seit über hundert Jahren streiten sich Fachleute über diese Fresken. Manche sagen, es ist die Dokumentation einer echten Einweihung. Andere halten es für eher symbolisch — ein Bild für die Reise der Seele durch Angst hin zur Verwandlung. Einige glauben, es sei schlicht die Hochzeitsvorbereitung einer reichen Braut, verpackt in dramatische religiöse Bilder. Die ehrliche Antwort: Niemand weiß es.",
    },
    {
      text: `Und genau das war der Sinn der Sache. Man nannte diese Rituale \u201Edie Mysterien\u201C, weil die Eingeweihten schworen, niemals zu verraten, was geschah \u2014 nicht m\u00FCndlich, nicht schriftlich, niemals. Der einzige Grund, warum wir \u00FCberhaupt etwas davon wissen, ist, dass der Vesuv im Jahr 79 n. Chr. ausbrach und diesen Raum in Dunkelheit begrub \u2014 fast zweitausend Jahre lang. Der Vulkan, der Pompeji zerst\u00F6rte, hat ausgerechnet das eine bewahrt, was nie jemand sehen sollte.`,
    },
  ],
};

// ─── Push to DynamoDB ───

async function pushStory(story, label) {
  console.log(`\n⏳ Pushing ${label}...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: story,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log(`✅ ${label} pushed successfully (langStoryId: ${story.langStoryId})`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`⚠️  ${label} already exists — skipping to avoid overwrite.`);
      return false;
    }
    console.error(`❌ ${label} FAILED:`, err.message);
    throw err;
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Villa of Mysteries — Push es / fr / de");
  console.log("  Timestamp:", NOW);
  console.log("═══════════════════════════════════════════════════");

  // Validate paragraph constraints before pushing
  for (const [label, story] of [["es", es], ["fr", fr], ["de", de]]) {
    const totalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
    console.log(`\n📏 ${label.toUpperCase()} — ${story.paragraphs.length} paragraphs, ${totalChars} total chars`);
    for (let i = 0; i < story.paragraphs.length; i++) {
      const len = story.paragraphs[i].text.length;
      const words = story.paragraphs[i].text.split(/\s+/).length;
      const flag = len > 500 ? " ⚠️ OVER 500!" : "";
      const wflag = words > 100 ? " ⚠️ OVER 100 WORDS!" : "";
      console.log(`   P${i + 1}: ${len} chars, ${words} words${flag}${wflag}`);
    }
  }

  await pushStory(es, "🇪🇸 Spanish (es)");
  await pushStory(fr, "🇫🇷 French (fr)");
  await pushStory(de, "🇩🇪 German (de)");

  console.log("\n═══════════════════════════════════════════════════");
  console.log("  All done.");
  console.log("═══════════════════════════════════════════════════");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
