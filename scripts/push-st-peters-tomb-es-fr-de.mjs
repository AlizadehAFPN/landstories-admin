// Push Spanish, French, and German recreations of "The Discovery of St. Peter's Tomb"
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
  siteId: "vatican-st-peters",
  storyId: "st-peters-tomb-discovery",
  icon: "⛏️",
  storyCategory: "prophets_pilgrims",
  era: "1939-1968",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 41.9022, lng: 12.4536 },
  source:
    "Guarducci, Margherita. The Tomb of St. Peter, 1960; Toynbee and Ward-Perkins, The Shrine of St. Peter, 1956; Walsh, John Evangelist. The Bones of St. Peter, 1982",
  characters: [
    "Pope Pius XII",
    "Pope Paul VI",
    "Margherita Guarducci",
    "Antonio Ferrua",
    "Emperor Constantine",
  ],
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb: "A la tercera va la vencida" (Third time's the charm)
// Register: Skilled modern storyteller — podcast/popular nonfiction voice
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#st-peters-tomb-discovery",

  title: "El secreto bajo San Pedro",

  subtitle:
    "Cómo una obra rutinaria destapó un misterio de dos mil años bajo la iglesia más grande del mundo",

  excerpt:
    "En 1939, unos obreros del Vaticano rompieron el suelo de mármol de la Basílica de San Pedro y cayeron en la oscuridad total. Acababan de tropezar con un secreto que llevaba mil seiscientos años enterrado.",

  moralOrLesson:
    "La fe y la arqueología pueden llegar a la misma verdad, aunque caminen por senderos distintos",

  paragraphs: [
    {
      text: "1939. Unos obreros excavaban bajo la Basílica de San Pedro para hacer sitio a una nueva tumba papal. El suelo de mármol cedió y cayeron en la oscuridad total. Cuando se asentó el polvo, estaban en un lugar que no veía la luz del sol desde hacía mil seiscientos años. Sin quererlo, habían abierto la puerta a un secreto capaz de confirmar —o destruir— la razón por la que esa iglesia existía.",
    },
    {
      text: "Habían caído en una ciudad de muertos: un cementerio romano sellado desde el año 320. El emperador Constantino, el primer gobernante romano en abrazar el cristianismo, había mandado rellenar todo el camposanto con tierra y aplanarlo —nobles y esclavos por igual— para construir su iglesia encima de la única tumba que, según él, importaba más que todas las demás.",
    },
    {
      text: "El papa Pío XII autorizó una excavación secreta. Durante diez años, un pequeño equipo de arqueólogos se arrastró por túneles estrechos bajo la basílica, desenterrando una tumba tras otra: pinturas antiguas, mosaicos, inscripciones en latín del siglo I. Las tumbas bordeaban una calzada romana más vieja que el propio cristianismo.",
    },
    {
      text: "A medida que avanzaban hacia el oeste —hacia el punto justo bajo el altar mayor—, las tumbas se volvían más sencillas, más humildes, más antiguas. Estaban entrando en una zona de la colina Vaticana donde se enterraba a gente corriente y a criminales ejecutados. Justo el tipo de lugar donde habría acabado un pescador crucificado de un pueblo pequeño de Galilea.",
    },
    {
      text: "Bajo el altar papal encontraron algo extraordinario: un santuario de piedra del año 160. Coincidía con un texto de un sacerdote romano llamado Cayo, que hacia el año 200 escribió que podía mostrar a los visitantes el «trofeo» del apóstol Pedro en la colina Vaticana. El santuario estaba adosado a un muro cubierto de oraciones cristianas grabadas a mano. Y un mensaje atravesó los siglos: «Petros eni.» Pedro está aquí dentro.",
    },
    {
      text: "Detrás de ese muro, en un hueco revestido de mármol, encontraron huesos humanos envueltos en tela púrpura con hilos de oro —un tejido reservado para la realeza o el máximo honor sagrado—. Un anatomista determinó que pertenecían a un hombre de constitución fuerte, muerto entre los sesenta y los setenta años. El perfil encajaba de forma inquietante con el del apóstol.",
    },
    {
      text: "Pero el hallazgo encendió una batalla feroz. El arqueólogo jefe, Antonio Ferrua, había encontrado otros huesos directamente bajo el santuario y estaba convencido de que esos eran los verdaderos restos. Fue Margherita Guarducci, experta en inscripciones antiguas, quien defendió los huesos del muro. Rastreó su historia en los archivos vaticanos y argumentó que habían sido trasladados para protegerlos durante obras anteriores.",
    },
    {
      text: "En 1968, el papa Pablo VI se dirigió al mundo midiendo cada palabra: «Las reliquias de San Pedro han sido identificadas de un modo que consideramos convincente.» Se quedó a un paso de convertirlo en doctrina oficial. Hasta hoy, ningún católico está obligado a creer que esos huesos son de Pedro.",
    },
    {
      text: "¿Son realmente los restos de aquel pescador de Galilea que caminó con Jesús? Quizá no se pruebe nunca. Pero hay algo indiscutible: desde una tumba sencilla del siglo I, pasando por un santuario del siglo II, hasta la basílica de Constantino y la obra maestra renacentista que hoy se alza sobre ella —dos mil años de devoción apuntando al mismo puñado de metros cuadrados—. Dicen que a la tercera va la vencida. Aquí fueron veinte siglos, y la fe no se movió ni un centímetro.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb: "Jamais deux sans trois" (Never two without three)
// Register: Engaging raconteur — France Inter documentary / Arte narrator voice
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#st-peters-tomb-discovery",

  title: "Le secret sous la basilique",

  subtitle:
    "Comment de simples travaux ont révélé un mystère vieux de deux mille ans sous la plus grande église du monde",

  excerpt:
    "En 1939, des ouvriers du Vatican ont percé le sol de marbre de la basilique Saint-Pierre et sont tombés dans le noir complet. Ils venaient de mettre au jour un secret enfoui depuis seize siècles.",

  moralOrLesson:
    "La foi et l'archéologie peuvent converger vers la même vérité, même si elles empruntent des chemins différents",

  paragraphs: [
    {
      text: "En 1939, des ouvriers creusaient sous la basilique Saint-Pierre pour aménager un caveau pontifical. Le sol de marbre a cédé et ils ont basculé dans le noir. Quand la poussière est retombée, ils se tenaient dans un lieu privé de lumière depuis seize cents ans. Ils venaient d\u2019ouvrir la porte d\u2019un secret capable de confirmer ou d\u2019anéantir la raison même de l\u2019existence de cette église.",
    },
    {
      text: "Ils avaient atterri dans une cité des morts\u00A0: un cimetière romain scellé depuis l\u2019an 320 environ. L\u2019empereur Constantin, premier dirigeant romain à embrasser le christianisme, avait fait combler le cimetière entier de terre et tout aplanir — tombes de nobles et d\u2019esclaves confondues — pour bâtir son église par-dessus la seule sépulture qui, à ses yeux, comptait plus que toutes les autres.",
    },
    {
      text: "Le pape Pie\u00A0XII autorisa des fouilles secrètes. Pendant dix ans, une petite équipe d\u2019archéologues rampa dans d\u2019étroits tunnels sous la basilique, mettant au jour tombe après tombe\u00A0: peintures antiques, mosaïques, inscriptions latines du premier siècle. Les sépultures bordaient une voie romaine plus ancienne que le christianisme lui-même.",
    },
    {
      text: "À mesure qu\u2019ils progressaient vers l\u2019ouest — vers le point exact sous le maître-autel —, les tombes devenaient plus simples, plus modestes, plus anciennes. Ils pénétraient dans une zone de la colline du Vatican autrefois réservée aux gens du peuple et aux condamnés à mort. Exactement le genre d\u2019endroit où aurait fini un pêcheur crucifié venu d\u2019un petit village de Galilée.",
    },
    {
      text: "Juste sous l\u2019autel pontifical, ils découvrirent quelque chose de remarquable\u00A0: un petit sanctuaire de pierre bâti vers l\u2019an 160. Il correspondait au témoignage d\u2019un prêtre romain nommé Caïus, qui vers l\u2019an 200 écrivait pouvoir montrer aux visiteurs le «\u00A0trophée\u00A0» de l\u2019apôtre Pierre sur la colline du Vatican. Le sanctuaire s\u2019adossait à un mur couvert de prières chrétiennes gravées à la main. Et un message traversait les siècles\u00A0: «\u00A0Petros eni.\u00A0» Pierre est ici.",
    },
    {
      text: "Derrière ce mur, dans un espace tapissé de marbre, ils trouvèrent des ossements humains enveloppés dans un tissu pourpre rehaussé de fils d\u2019or — un textile réservé à la royauté ou aux plus hauts honneurs sacrés. Un anatomiste établit qu\u2019ils appartenaient à un homme de forte constitution, mort entre soixante et soixante-dix ans. Le profil correspondait de façon troublante à celui de l\u2019apôtre Pierre.",
    },
    {
      text: "La découverte déclencha une querelle féroce. L\u2019archéologue en chef, Antonio Ferrua, avait trouvé d\u2019autres ossements sous le sanctuaire et restait convaincu que c\u2019étaient les vraies reliques. C\u2019est Margherita Guarducci, spécialiste des inscriptions anciennes, qui défendit les os du mur. Elle retraça leur parcours dans les archives vaticanes et soutint qu\u2019on les avait déplacés pour les protéger lors de travaux antérieurs.",
    },
    {
      text: "En 1968, le pape Paul\u00A0VI s\u2019adressa au monde en pesant chaque mot\u00A0: «\u00A0Les reliques de saint Pierre ont été identifiées d\u2019une manière que nous estimons convaincante.\u00A0» Il s\u2019arrêta à un cheveu d\u2019en faire un dogme officiel. Aujourd\u2019hui encore, aucun catholique n\u2019est tenu de croire que ces ossements sont ceux de Pierre.",
    },
    {
      text: "Ces os sont-ils vraiment ceux du pêcheur de Galilée\u00A0? On ne le prouvera peut-être jamais. Mais une chose est indiscutable\u00A0: d\u2019une tombe du Iᵉʳ siècle à un sanctuaire du IIᵉ, puis de la basilique de Constantin au chef-d\u2019œuvre de la Renaissance qui se dresse aujourd\u2019hui — deux mille ans de dévotion pointant vers les mêmes quelques mètres carrés de terre romaine. On dit jamais deux sans trois. Ici, c\u2019est vingt siècles sans faillir, et la foi n\u2019a pas bougé d\u2019un millimètre.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb: "Aller guten Dinge sind drei" (All good things come in threes)
// Register: Gripping documentary narrator — ZDF/Stern feature voice
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#st-peters-tomb-discovery",

  title: "Das Geheimnis unter dem Petersdom",

  subtitle:
    "Wie eine Routinegrabung ein zweitausend Jahre altes Geheimnis unter der größten Kirche der Welt ans Licht brachte",

  excerpt:
    "1939 brachen Arbeiter im Vatikan durch den Marmorboden des Petersdoms und stürzten in absolute Dunkelheit. Sie waren gerade über ein Geheimnis gestolpert, das seit sechzehn Jahrhunderten begraben lag.",

  moralOrLesson:
    "Glaube und Archäologie können zur selben Wahrheit gelangen, auch wenn sie verschiedene Wege nehmen",

  paragraphs: [
    {
      text: "1939 gruben Arbeiter unter dem Petersdom, um Platz für eine neue Papstgruft zu schaffen. Der Marmorboden gab nach und sie stürzten in die Finsternis. Als sich der Staub legte, standen sie an einem Ort, der seit sechzehnhundert Jahren kein Tageslicht gesehen hatte. Ohne es zu ahnen, hatten sie die Tür zu einem Geheimnis aufgestoßen, das den Grund für die Existenz dieser Kirche bestätigen — oder zerstören konnte.",
    },
    {
      text: "Sie waren in eine Totenstadt gestürzt: einen römischen Friedhof, versiegelt seit etwa 320 nach Christus. Kaiser Konstantin, der erste römische Herrscher, der sich zum Christentum bekannte, hatte den Friedhof mit Erde füllen und einebnen lassen — Gräber von Adligen wie von Sklaven — um seine Kirche über dem einen Grab zu errichten, das für ihn mehr zählte als alle anderen.",
    },
    {
      text: "Papst Pius\u00A0XII. genehmigte eine geheime Grabung. Zehn Jahre lang kroch ein kleines Archäologenteam durch enge Tunnel unter der Basilika und legte ein Grab nach dem anderen frei: antike Malereien, Mosaike, lateinische Inschriften aus dem ersten Jahrhundert. Die Gräber säumten eine römische Straße, die älter war als das Christentum selbst.",
    },
    {
      text: "Je weiter sie nach Westen vordrangen — genau auf den Punkt unter dem Hochaltar zu —, desto einfacher, bescheidener und älter wurden die Gräber. Sie betraten einen Abschnitt des Vatikanhügels, der einst als Begräbnisstätte für einfache Leute und hingerichtete Verbrecher diente. Genau die Art von Ort, an dem ein gekreuzigter Fischer aus einem kleinen Dorf in Galiläa gelandet wäre.",
    },
    {
      text: "Direkt unter dem Papstaltar fanden sie etwas Außergewöhnliches: einen kleinen Steinschrein aus der Zeit um 160. Er stimmte mit dem Bericht eines römischen Priesters namens Gaius überein, der um 200 schrieb, er könne Besuchern das \u201ESiegeszeichen\u201C des Apostels Petrus auf dem Vatikanhügel zeigen. Der Schrein lehnte an einer Wand voller eingeritzter christlicher Gebete. Und eine Botschaft durchschnitt die Jahrhunderte: \u201EPetros eni.\u201C Petrus ist hier drinnen.",
    },
    {
      text: "Hinter dieser Wand, in einer marmorverkleideten Nische, fanden sie menschliche Knochen, eingewickelt in purpurnen Stoff, durchwoben mit Goldfäden — ein Gewebe, das Königen oder höchsten sakralen Ehren vorbehalten war. Ein Anatom stellte fest, dass sie einem kräftig gebauten Mann gehörten, der zwischen sechzig und siebzig gestorben war. Das Profil passte auf beunruhigende Weise zu dem des Apostels Petrus.",
    },
    {
      text: "Der Fund entfachte einen erbitterten Streit. Der leitende Archäologe Antonio Ferrua hatte andere Knochen direkt unter dem Schrein gefunden und war überzeugt, die echten Reliquien in Händen zu halten. Margherita Guarducci, Spezialistin für antike Inschriften, verteidigte die Knochen hinter der Wand. Sie verfolgte deren Spur durch die vatikanischen Archive und war sicher: Man hatte sie bei früheren Bauarbeiten heimlich in Sicherheit gebracht.",
    },
    {
      text: "1968 wandte sich Papst Paul\u00A0VI. mit sorgfältig gewählten Worten an die Welt: \u201EDie Reliquien des heiligen Petrus wurden auf eine Weise identifiziert, die wir für überzeugend halten.\u201C Er blieb einen Schritt davor stehen, es zur offiziellen Kirchenlehre zu erklären. Bis heute ist kein Katholik verpflichtet zu glauben, dass diese Knochen Petrus gehören.",
    },
    {
      text: "Gehören diese Knochen wirklich dem Fischer aus Galiläa? Vielleicht wird es nie bewiesen. Aber eines ist unbestreitbar: Vom schlichten Grab im ersten Jahrhundert über einen Schrein im zweiten bis zu Konstantins Basilika und dem Renaissance-Meisterwerk von heute — zweitausend Jahre Hingabe, gerichtet auf dieselben wenigen Quadratmeter römischer Erde. Man sagt, aller guten Dinge sind drei. Hier waren es zwanzig Jahrhunderte, und der Glaube hat sich keinen Millimeter bewegt.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n⏳ Pushing ${label} ...`);

  // JSON round-trip validation
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
  console.log("═══ Pushing St. Peter's Tomb translations to DynamoDB ═══");
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
