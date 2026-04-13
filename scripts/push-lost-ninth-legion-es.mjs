// Push Spanish recreation of "The Lost Ninth Legion" to the Story DynamoDB table.
// Proverb used: "No hay dos sin tres" — subverted (the Ninth never got a third chance)

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "hadrians-wall",
  langStoryId: "es#lost-ninth-legion",

  // Identity
  storyId: "lost-ninth-legion",
  lang: "es",

  // Classification (unchanged from English)
  storyCategory: "riddles_past",
  tier: "A",
  icon: "⚔️",
  image: "",
  thumbnail: "",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 3,

  // Geo & metadata (unchanged)
  coordinates: { lat: 55.0265, lng: -2.3615 },
  era: "Early 2nd century AD (c. AD 108-120)",
  source:
    'Rosemary Sutcliff, "The Eagle of the Ninth" (1954); Cassius Dio, "Roman History"; Duncan B. Campbell, "The Fate of the Ninth" (2018); Miles Russell, "The Lost Legions of Fromelles" (2019); Film: "The Eagle" (2011, dir. Kevin Macdonald)',
  characters: [
    "Legio IX Hispana",
    "Emperor Hadrian",
    "The Picts of Caledonia",
    "Marcus Flavius Aquila (fictional, Sutcliff)",
    "Rosemary Sutcliff",
  ],

  // === SPANISH TEXT ===

  title: "La legión que se tragó la niebla",

  subtitle:
    "Cinco mil soldados romanos marcharon hacia el norte y nunca volvieron",

  excerpt:
    "La Novena Legión — Legio IX Hispana — no era una unidad cualquiera. Estos soldados combatieron bajo las órdenes de Julio César durante la conquista de la Galia.",

  moralOrLesson:
    "Hasta los imperios más poderosos tienen un límite. A veces cinco mil hombres cruzan ese límite — y lo único que regresa es el silencio.",

  paragraphs: [
    {
      text: "La Novena Legión — Legio IX Hispana — no era un ejército cualquiera. Estos tipos pelearon con Julio César en la Galia, lo siguieron en la guerra civil que enterró la República y parió el Imperio. Para el año 43 d.C., cuando el emperador Claudio los mandó a invadir Britania, llevaban más de un siglo combatiendo. Cinco mil veteranos curtidos en batalla, estacionados en York — la capital militar del norte de Inglaterra — sosteniendo la frontera más peligrosa de Roma.",
    },
    {
      text: "Y entonces desaparecieron.",
    },
    {
      text: "La última prueba de que la Novena existió es una inscripción en York fechada en el 108 d.C. Después: nada. Ni órdenes de traslado, ni lápidas, ni una mención en los registros militares romanos, que eran obsesivamente detallados. Cuando Adriano llegó en el 122 para construir su Muro, la Novena ya no estaba. Mandaron otra legión desde Germania a cubrir su puesto. Roma rastreaba cada unidad en tres continentes. ¿Que una legión entera desaparezca del papeleo? Algo salió terriblemente mal.",
    },
    {
      text: "La teoría más famosa es la más escalofriante. La Novena marchó al norte, a Caledonia — la Escocia actual — para aplastar a los pictos, guerreros que Roma llamaba «el pueblo pintado». Imagínate cinco mil hombres en las Tierras Altas: montañas empapadas de niebla, bosques cerrados, pantanos sin fin. Una pesadilla para soldados de terreno llano. Los pictos conocían cada risco y cada río. Emboscaron la columna, cortaron el suministro y los aniquilaron. Cinco mil hombres tragados por la bruma.",
    },
    {
      text: "Pero aquí viene el giro. En los años cincuenta, unos arqueólogos encontraron tejas con el sello de la Novena en Nijmegen, Países Bajos — prueba de que parte de la legión llegó al continente después del 108. Algunos historiadores creen que no murió en Escocia sino en otra guerra, quizá la brutal revuelta judía en Judea hacia el 132, donde Roma perdió unidades enteras. Un misterio reemplaza a otro. Y el silencio en los registros sigue siendo ensordecedor.",
    },
    {
      text: "Dicen que no hay dos sin tres, pero a la Novena no le dieron ni la tercera. Esta desaparición se volvió leyenda. Rosemary Sutcliff la convirtió en «El águila de la Novena» en 1954, una novela sobre un oficial romano que cruza el Muro de Adriano buscando la legión perdida de su padre. Generaciones de británicos crecieron con ese libro, que inspiró la película «The Eagle» en 2011. La versión de Sutcliff — la Novena resistiendo hasta el final en las Tierras Altas — es la que todos llevan grabada.",
    },
    {
      text: "Puede que nunca sepamos qué pasó. Las pruebas son lo bastante incompletas para seguir especulando y lo bastante sólidas para no poder mirar a otro lado. Pero algo es seguro: Adriano construyó su Muro porque algo catastrófico ocurrió en el norte. Ya descanse la Novena bajo el brezo escocés o la arena de Oriente Medio, su desaparición trazó esa línea a través de Britania para siempre. El imperio más poderoso del mundo antiguo perdió cinco mil hombres — y jamás supo cómo.",
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
  if (chars > 500) {
    console.warn(`  ⚠ P${i + 1} exceeds 500 char limit!`);
    valid = false;
  }
  if (words > 100) {
    console.warn(`  ⚠ P${i + 1} exceeds 100 word limit!`);
    valid = false;
  }
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

if (!valid) {
  console.error(
    "\n❌ Validation failed — fix paragraph lengths before pushing."
  );
  process.exit(1);
}

if (totalChars < 2400 || totalChars > 3600) {
  console.error(
    `\n❌ Total chars ${totalChars} outside acceptable range (2400-3600). Aborting.`
  );
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
  const verify = await doc.send(
    new GetCommand({
      TableName: "Story",
      Key: {
        siteId: "hadrians-wall",
        langStoryId: "es#lost-ninth-legion",
      },
    })
  );
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
