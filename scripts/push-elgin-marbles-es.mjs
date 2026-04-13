import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "acropolis-athens",
  langStoryId: "es#elgin-marbles",

  // Identity
  storyId: "elgin-marbles",
  lang: "es",

  // Classification (unchanged)
  storyCategory: "lost_found",
  tier: "A",
  icon: "\u{1F3FA}",
  image: "",
  thumbnail: "",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 2,

  // Geo & metadata (unchanged)
  coordinates: { lat: 37.9715, lng: 23.7267 },
  era: "1801-1812 (removal), debate ongoing",
  source:
    "House of Commons Select Committee Report (1816), modern scholarly analysis, British Museum and Greek government statements",
  characters: [
    "Thomas Bruce, 7th Earl of Elgin",
    "Giovanni Battista Lusieri (Elgin's agent)",
    "Ottoman authorities",
    "Greek witnesses",
  ],

  // === SPANISH TEXT ===

  title: "Los mármoles de la discordia",

  subtitle: "Las esculturas que aún esperan volver a casa",

  excerpt:
    "Imagínate: es 1801 y Grecia no les pertenece a los griegos. Un noble escocés llega con permiso para dibujar el Partenón. Lo que hizo después encendió una pelea que lleva más de dos siglos sin apagarse.",

  moralOrLesson:
    "¿De quién es realmente el pasado? El debate sobre las esculturas del Partenón plantea si los tesoros culturales pertenecen a las naciones que los crearon — o a quien tuvo el poder de llevárselos.",

  paragraphs: [
    {
      text: "Imagínate: es 1801 y Grecia no les pertenece a los griegos. El Imperio otomano lleva más de 350 años mandando allí. En ese momento aparece Thomas Bruce, un noble escocés más conocido como el conde de Elgin, recién nombrado embajador británico ante la corte otomana. Llega a Atenas con un permiso para dibujar y hacer moldes de yeso de las esculturas del Partenón. Lo que hizo después encendió una pelea que lleva más de dos siglos sin apagarse.",
    },
    {
      text: "Elgin no se conformó con dibujar. Trajo equipos de obreros que serraron el mármol, arrancaron estatuas con palancas y enviaron a Inglaterra casi la mitad de las esculturas que quedaban en el Partenón. Hablamos de 75 metros de friso tallado, 15 escenas de batalla y 17 figuras más grandes que una persona. Hasta se llevaron una Cariátide — una de esas famosas columnas con forma de mujer — del edificio de al lado.",
    },
    {
      text: "Los griegos, sometidos bajo ocupación otomana, no pudieron impedirlo, pero tampoco se callaron. Los obreros partían juntas milenarias y las piezas se estrellaban contra el suelo durante el desmontaje. Un testigo griego dejó una frase que todavía duele: «Los turcos no lloraron, pero nosotros sí». Hasta en Inglaterra, Lord Byron montó en cólera: llamó a Elgin saqueador y le dedicó un poema entero maldiciéndolo por arrancarle el alma a Atenas.",
    },
    {
      text: "Elgin envió todo a Londres y exhibió las esculturas en su casa. Pero la operación casi lo arruina, así que en 1816 le vendió la colección al gobierno británico. El Parlamento debatió si la compra era ética y votó que sí de todas formas. Desde entonces, las esculturas están en el Museo Británico, donde millones las ven cada año. Grecia lleva pidiéndolas de vuelta prácticamente desde que logró su independencia en 1832.",
    },
    {
      text: "El argumento del Museo Británico: las salvamos. Sin Elgin, la contaminación o las guerras las habrían destruido — y en Londres, cualquiera las ve gratis. Grecia responde: se las llevaron mientras un imperio extranjero ocupaba nuestra tierra. Ningún gobierno griego dio jamás su permiso. Pertenecen al Partenón, para el que fueron talladas hace 2.500 años. En casa del herrero, cuchillo de palo: el gran defensor del patrimonio mundial se niega a devolver el ajeno.",
    },
    {
      text: "En 2009, Grecia jugó su carta más fuerte — no con abogados, sino con arquitectura. Atenas inauguró el nuevo Museo de la Acrópolis, un edificio de cristal impresionante justo al pie del Partenón. Dentro hay una sala con las dimensiones exactas del templo original. Las esculturas que Grecia conserva están en su posición original. Donde deberían estar las piezas de Londres, hay espacios vacíos. Sin carteles ni explicaciones. Los huecos lo dicen todo.",
    },
    {
      text: "Hasta el nombre es un campo de batalla. Di «mármoles de Elgin» y estás reconociendo a un lord británico como su dueño. Di «esculturas del Partenón» y las devuelves a Atenas. Estas tallas de 2.500 años fueron creadas para contar historias de dioses y héroes. Ahora cuentan otra muy distinta — sobre imperios, posesión y una pregunta que nadie ha resuelto: cuando le arrebatas algo hermoso a un pueblo conquistado, ¿puedes llamarlo tuyo alguna vez?",
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
console.log("subtitle:", item.subtitle);
console.log("paragraphs:", item.paragraphs.length);

let totalChars = 0;
let totalWords = 0;
let valid = true;
item.paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;
  console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) { console.warn(`  ⚠ P${i + 1} exceeds 500 char limit!`); valid = false; }
  if (words > 100) { console.warn(`  ⚠ P${i + 1} exceeds 100 word limit!`); valid = false; }
});
console.log(`  TOTAL: ${totalChars} chars, ${totalWords} words across ${item.paragraphs.length} paragraphs`);
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

if (!valid) {
  console.error("\n❌ Validation failed — fix paragraph lengths before pushing.");
  process.exit(1);
}

// Push to DynamoDB
console.log("\n=== PUSHING TO DYNAMODB ===");
try {
  const result = await doc.send(new PutCommand({
    TableName: "Story",
    Item: item,
  }));
  console.log("✅ SUCCESS! Spanish story pushed.");
  console.log("HTTP status:", result.$metadata.httpStatusCode);
} catch (err) {
  console.error("❌ PUSH FAILED:", err.message);
  console.error(err);
  process.exit(1);
}

// Verify by reading back
console.log("\n=== VERIFICATION READ ===");
try {
  const verify = await doc.send(new GetCommand({
    TableName: "Story",
    Key: { siteId: "acropolis-athens", langStoryId: "es#elgin-marbles" },
  }));
  if (verify.Item) {
    console.log("✅ VERIFIED! Record exists in DynamoDB.");
    console.log("  title:", verify.Item.title);
    console.log("  lang:", verify.Item.lang);
    console.log("  langStoryId:", verify.Item.langStoryId);
    console.log("  paragraphs:", verify.Item.paragraphs.length);
    console.log("  updatedAt:", verify.Item.updatedAt);
  } else {
    console.error("❌ VERIFICATION FAILED: Record not found after push!");
    process.exit(1);
  }
} catch (err) {
  console.error("❌ VERIFICATION READ FAILED:", err.message);
  process.exit(1);
}
