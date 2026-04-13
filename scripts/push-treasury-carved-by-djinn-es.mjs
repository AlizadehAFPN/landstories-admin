import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════════
//  SPANISH — El Tesoro que Tallaron los Djinn
//  Proverb subverted: «No es oro todo lo que reluce»
//  (What doesn't shine, everyone wanted to be gold.)
//  Register: Modern Spanish storyteller — quality podcast tone.
//  Told, not read.
// ═══════════════════════════════════════════════════════════════════
const es = {
  siteId: "petra",
  storyId: "treasury-carved-by-djinn",
  lang: "es",
  langStoryId: "es#treasury-carved-by-djinn",
  icon: "\uD83C\uDFDB\uFE0F",
  tier: "S",
  readingTimeMinutes: 7,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 35.4513, lat: 30.3216 },
  hasAudio: false,
  isFree: true,
  storyCategory: "gods_monsters",
  updatedAt: now,

  title: "El Tesoro que Tallaron los Djinn",
  subtitle:
    "La fachada imposible de Petra y la leyenda que nadie quiso soltar",
  excerpt:
    "Los beduinos juraban que ninguna mano humana había tocado esa fachada. Decían que los djinn la tallaron en una sola noche para esconder el oro de un faraón. Siglos después, las balas en la piedra demuestran hasta dónde llega la codicia por una leyenda.",
  moralOrLesson:
    "A veces lo que buscamos con más fuerza es justo lo que nunca estuvo ahí.",
  source:
    "Burckhardt, Johann Ludwig. Travels in Syria and the Holy Land, 1822; Farajat, Suleiman. Excavaciones de Al-Khazneh (2003); Diodoro Sículo, Bibliotheca Historica XIX.94-95; McKenzie, Judith. The Architecture of Petra, 1990; Joukowsky, Martha Sharp. Petra Great Temple, excavaciones de Brown University; Madain Project, documentación del hipogeo de Al-Khazneh",
  characters: [
    "El Faraón (legendario)",
    "Los Djinn (constructores sobrenaturales)",
    "Rey Aretas IV",
    "Johann Ludwig Burckhardt (Jeque Ibrahim)",
    "Rey Salomón (señor de los djinn)",
  ],
  era: "Siglo I a.C. – Siglo I d.C. (construcción); 1812 (redescubrimiento de Burckhardt)",

  paragraphs: [
    {
      text: "Los beduinos nunca la llamaron tumba. La llamaban Khaznat al-Firaun — el Tesoro del Faraón — y juraban que ninguna mano humana la había tocado jamás. La leyenda decía que el faraón de Egipto no se ahogó persiguiendo a Moisés por el Mar Rojo. Sobrevivió. Siguió a Moisés hacia el sur, arrastrando carretas llenas de oro robado. Cuando el desfiladero se volvió demasiado estrecho para sus carros, hizo lo que cualquier rey hechicero haría: llamó a los djinn.",
    },
    {
      text: "En la tradición islámica, los djinn son seres hechos de fuego sin humo — espíritus poderosos entre el mundo humano y lo divino. El Corán dice que el rey Salomón los usó para construir su templo en Jerusalén. Ahora el faraón invocaba ese mismo poder. Y los djinn respondieron. En una sola noche tallaron una fachada de cuarenta metros en la roca viva. Columnas, estatuas de dioses, cámaras ocultas. Arriba del todo colocaron una urna de piedra con el oro dentro. Y desaparecieron.",
    },
    {
      text: "Durante siglos, los beduinos creyeron que el oro seguía ahí arriba. Y no era solo un cuento junto al fuego: le estaban disparando. Viajeros de los siglos XVIII y XIX encontraron la urna cubierta de cientos de agujeros de bala, disparados por generaciones de hombres intentando reventarla. El detalle: la urna es roca maciza, tallada directamente del acantilado. Nunca hubo nada dentro. Pero esas cicatrices siguen ahí — un monumento a las ganas de creer.",
    },
    {
      text: "Dicen que no es oro todo lo que reluce, pero aquí el problema fue al revés: lo que no relucía, todos querían que fuera oro. Los verdaderos constructores eran más impresionantes que cualquier espíritu. Hacia el siglo I, los nabateos — nómadas árabes convertidos en los comerciantes más ricos de Oriente Medio — tallaron esto como tumba real para su mayor rey, Aretas IV. Columnas griegas, esculturas de dioses guardianes, águilas para llevar las almas al cielo. Puesta justo donde todo el que entrara a Petra por el cañón la viera primero.",
    },
    {
      text: "Ningún europeo la había visto en mil años. En 1812, el explorador suizo Johann Ludwig Burckhardt se coló disfrazado de jeque Ibrahim. Llevaba tres años aprendiendo árabe y el Corán para ese momento. Su excusa: sacrificar una cabra en la tumba del profeta Aarón. Su guía lo llevó por un cañón de noventa metros de profundidad. Cuando salieron, el Tesoro llenó todo lo que veía. «Ya veo que eres un infiel», dijo el guía. Burckhardt se retiró, pero acababa de encontrar una de las ciudades perdidas más grandes de la Tierra.",
    },
    {
      text: "En 2003, los arqueólogos excavaron bajo el Tesoro y encontraron lo que la leyenda siempre había ocultado. No era oro — eran tumbas. A seis metros de profundidad descubrieron cámaras con los restos de al menos once personas, vasijas de cerámica e incienso a su lado. En 2024, otro equipo halló doce esqueletos más cerca, intactos durante dos mil años. El Tesoro nunca fue una cámara acorazada. Desde el principio fue una tumba para la gente más importante del reino.",
    },
    {
      text: "La leyenda sigue sin morir. Steven Spielberg convirtió el Tesoro en el escondite del Santo Grial en Indiana Jones y la Última Cruzada. Las salas reales detrás de esa fachada son pequeñas, vacías, sin nada especial. Pero da igual. Hay algo en la forma en que la luz del amanecer golpea esa piedra arenisca y la convierte en color de fuego vivo que hace que hasta el más escéptico se detenga. Quizá los djinn fueron reales. Quizá el oro sigue ahí, más profundo de lo que nadie ha cavado jamás.",
    },
  ],
};

// ─── Validation & Push ───
async function pushStory(item, label) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Field validation
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
    if (t.length > 600) {
      console.warn(`  ⚠ Paragraph ${i} is ${t.length} chars (target <500)`);
    } else {
      console.log(`  P${i}: ${t.length} chars ✓`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  totalChars:  ${totalChars}`);

  // Word count per paragraph
  for (let i = 0; i < item.paragraphs.length; i++) {
    const words = item.paragraphs[i].text.split(/\s+/).length;
    if (words > 100) {
      console.warn(`  ⚠ Paragraph ${i} has ${words} words (target <100)`);
    }
  }

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
  console.log("═══════════════════════════════════════════════════");
  console.log("Treasury Carved by Djinn — Spanish (es) push");
  console.log(`Timestamp: ${now}`);
  console.log("═══════════════════════════════════════════════════");

  await pushStory(es, "SPANISH");

  console.log("\n✅ Spanish version pushed successfully.");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});
