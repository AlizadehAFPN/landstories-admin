import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "sigiriya",
  langStoryId: "es#mirror-wall-poets",

  // Identity
  storyId: "mirror-wall-poets",
  lang: "es",

  // Classification (unchanged from English)
  storyCategory: "living_heritage",
  tier: "A",
  icon: "\u270D\uFE0F",
  image: "",
  thumbnail: "",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 4,

  // Geo & metadata (unchanged)
  coordinates: { lat: 7.957, lng: 80.7603 },
  era: "6th-14th century CE (graffiti period); 1956 (Paranavitana's publication)",
  source:
    "Paranavitana, Senarath. Sigiri Graffiti: Being Sinhalese Verses of the Eighth, Ninth, and Tenth Centuries, 2 vols., Oxford University Press, 1956; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; MAP Academy, 'Desires, Reactions, Interpretations: Murals and Inscriptions from Sigiriya'; Bell, H.C.P. Archaeological Survey of Ceylon, Annual Reports 1896-1904",
  characters: [
    "Kiti (monje budista que advirtió contra el deseo)",
    "Deva, esposa de Mahamata (celosa de las mujeres pintadas)",
    "Una visitante anónima (que se burló de los poetas)",
    "Senarath Paranavitana (arqueólogo que descifró 685 versos)",
    "Cientos de visitantes anónimos a lo largo de ocho siglos",
  ],

  // === SPANISH TEXT ===

  title: "Los poetas del muro espejo",

  subtitle:
    "Durante ochocientos años, los visitantes de una fortaleza en Sri Lanka subieron a una roca, contemplaron unas mujeres pintadas entre nubes y grabaron poemas de amor en un muro pulido — creando sin quererlo la colección más antigua de poesía cingalesa",

  excerpt:
    "Bajo las mujeres pintadas, un muro pulido como un espejo reflejaba las figuras que flotaban entre nubes. Y durante ochocientos años, la gente hizo algo que nadie esperaba: escribir poesía.",

  moralOrLesson:
    "Creemos que dejar nuestra marca es algo moderno — comentarios, publicaciones, grafitis. Pero el muro espejo demuestra lo contrario. Hace mil quinientos años, la gente miró algo hermoso y sintió exactamente lo mismo que sentimos hoy: la urgencia de decir algo, escribirlo, hacerlo durar. El corazón humano no ha cambiado. Seguimos cayendo ante las imágenes, seguimos escribiendo palabras que quizá nadie lea, y seguimos creyendo que poner nuestros sentimientos por escrito los hará, de alguna forma, permanentes.",

  paragraphs: [
    {
      text: "En el siglo V, un rey de Sri Lanka llamado Kashyapa mandó pulir un muro hasta dejarlo como un espejo en Sigiriya, una fortaleza de roca que brota de la selva. El muro corría justo debajo de las Doncellas de las Nubes — unas mujeres pintadas en oro, flotando entre nubes. La mezcla era improbable: cal, claras de huevo, miel silvestre, todo pulido con cera de abejas. Al caminar junto a él, las mujeres aparecían a tu lado — reales arriba, reflejadas abajo. Fue construido para el placer de un rey. Pero terminaría perteneciendo a todos.",
    },
    {
      text: "Cuando Kashyapa cayó en el 495 — muerto en batalla a manos de su propio hermano, que venía a reclamar el trono — la fortaleza se convirtió en monasterio budista. Las Doncellas de las Nubes dejaron de ser el tesoro privado de un rey. Monjes, peregrinos, soldados, mercaderes, campesinos: cualquiera que subiera la roca podía verlas. Y entonces pasó algo que nadie planeó. Los visitantes, abrumados por lo que veían, sacaron herramientas afiladas y grabaron lo que sentían en esa superficie pulida. Convirtieron un espejo en un cuaderno.",
    },
    {
      text: "Durante ochocientos años — del siglo VI al XIV — los visitantes tallaron más de mil ochocientas inscripciones en el muro espejo. Poemas de amor, reflexiones sobre la vida, advertencias budistas, bromas y simples notas que apenas decían 'yo estuve aquí.' En cingalés, sánscrito y tamil. No fue un proyecto literario planificado. Fue puro instinto humano: ver algo hermoso y necesitar decir algo al respecto. Juntos, esos versos arañados en la piedra se convirtieron en la colección más antigua de poesía cingalesa que se conoce.",
    },
    {
      text: "La mayoría de los poetas eran hombres, y su tema era el deseo. 'La joven de piel dorada me robó la mente y los ojos,' escribió uno. Otro confesó que las mujeres pintadas lo dejaron temblando: 'Alcanzado por su mirada de reojo, caí tendido al suelo.' No eran turistas de paso. Eran hombres genuinamente desarmados por la belleza — parados en un pasillo estrecho, mirando hacia arriba, buscando en vano palabras lo bastante grandes para lo que sentían.",
    },
    {
      text: "Pero las mujeres que subieron la roca tenían otra lectura. Deva — identificada solo como 'la esposa de Mahamata' — dejó un verso cargado de celos: 'Esa de ojos de cierva en el acantilado me saca de quicio. Se cuelga sus perlas y le coquetea a mi marido.' Y una mujer anónima dejó la línea más afilada de todo el muro: 'Como mujer, siento lástima por las pintadas. Ustedes, hombres tontos, esforzándose tanto en escribir canciones. Ninguno nos trajo ron ni melaza.' Mil quinientos años después, sigue dando en el blanco.",
    },
    {
      text: "Y luego estaba el monje Kiti, que veía lo que los enamorados no podían. Su inscripción se lee como una advertencia para el siguiente en la fila: 'Si te quedas aquí, no pierdas el corazón. El placer lleva al dolor. El dolor se parece al placer.' Kiti entendió que las Doncellas de las Nubes eran la lección misma — hermosas, deseables, completamente inalcanzables. El anhelo que inspiraban era el punto. Y lo escrito, escrito está: mil ochocientas inscripciones de exactamente ese anhelo, talladas en piedra.",
    },
    {
      text: "En 1956, el arqueólogo Senarath Paranavitana publicó la traducción de 685 de esos versos, recuperando voces que habían estado en silencio más de mil años. Y aquí viene el giro final: el muro espejo fue construido para reflejar la belleza. Pero el tiempo nubló el espejo. El reflejo desapareció. Lo que sobrevivió fueron las palabras de quienes se pararon donde solía estar el reflejo y trataron de describir lo que veían. El espejo falló. La poesía perduró.",
    },
  ],

  updatedAt: Math.floor(Date.now() / 1000),
};

// Validate before push
console.log("=== PRE-PUSH VALIDATION (SPANISH) ===");
console.log("siteId:", item.siteId);
console.log("langStoryId:", item.langStoryId);
console.log("lang:", item.lang);
console.log("title:", item.title);
console.log("subtitle:", item.subtitle.length, "chars");
console.log("paragraphs:", item.paragraphs.length);

let totalChars = 0;
let totalWords = 0;
item.paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;
  console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  \u26A0 P${i + 1} exceeds 500 char limit!`);
  if (words > 100) console.warn(`  \u26A0 P${i + 1} exceeds 100 word limit!`);
});
console.log(
  `  TOTAL: ${totalChars} chars, ${totalWords} words across ${item.paragraphs.length} paragraphs`
);
console.log("excerpt:", item.excerpt.length, "chars");
console.log("moralOrLesson:", item.moralOrLesson.length, "chars");
console.log("updatedAt:", item.updatedAt);
console.log("");

// Validate JSON serialization
try {
  const json = JSON.stringify(item);
  JSON.parse(json);
  console.log("JSON validation: PASSED (" + json.length + " bytes)");
} catch (e) {
  console.error("JSON validation FAILED:", e.message);
  process.exit(1);
}

// Push to DynamoDB
console.log("\n=== PUSHING TO DYNAMODB ===");
try {
  const result = await doc.send(
    new PutCommand({
      TableName: "Story",
      Item: item,
    })
  );
  console.log("SUCCESS! Spanish story pushed.");
  console.log("HTTP status:", result.$metadata.httpStatusCode);
} catch (err) {
  console.error("PUSH FAILED:", err.message);
  console.error(err);
  process.exit(1);
}

// Verify by reading back
console.log("\n=== VERIFICATION READ ===");
try {
  const verify = await doc.send(
    new GetCommand({
      TableName: "Story",
      Key: { siteId: "sigiriya", langStoryId: "es#mirror-wall-poets" },
    })
  );
  if (verify.Item) {
    console.log("VERIFIED! Record exists in DynamoDB.");
    console.log("  title:", verify.Item.title);
    console.log("  lang:", verify.Item.lang);
    console.log("  langStoryId:", verify.Item.langStoryId);
    console.log("  paragraphs:", verify.Item.paragraphs.length);
    console.log("  updatedAt:", verify.Item.updatedAt);
  } else {
    console.error("VERIFICATION FAILED: Record not found after push!");
    process.exit(1);
  }
} catch (err) {
  console.error("VERIFICATION READ FAILED:", err.message);
  process.exit(1);
}
