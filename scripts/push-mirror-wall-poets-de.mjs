import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "sigiriya",
  langStoryId: "de#mirror-wall-poets",

  // Identity
  storyId: "mirror-wall-poets",
  lang: "de",

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
    "Kiti (buddhistischer M\u00F6nch, der vor dem Begehren warnte)",
    "Deva, Ehefrau von Mahamata (eifers\u00FCchtig auf die gemalten Frauen)",
    "Eine anonyme Besucherin (die sich \u00FCber die m\u00E4nnlichen Dichter lustig machte)",
    "Senarath Paranavitana (Arch\u00E4ologe, der 685 Verse entzifferte)",
    "Hunderte anonymer Besucher \u00FCber acht Jahrhunderte",
  ],

  // === GERMAN TEXT ===

  title: "Die Dichter der Spiegelwand",

  subtitle:
    "Achthundert Jahre lang stiegen Besucher auf einen Felsen in Sri Lanka, blickten zu gemalten Frauen empor und ritzten Liebesgedichte in eine polierte Wand \u2014 so entstand die \u00E4lteste singhalesische Gedichtsammlung der Welt",

  excerpt:
    "Unter den gemalten Frauen war eine Wand so glatt poliert, dass sie die Bilder dar\u00FCber spiegelte. Und achthundert Jahre lang taten Besucher etwas, womit niemand gerechnet hatte \u2014 sie schrieben Gedichte.",

  moralOrLesson:
    "Wir glauben, Spuren zu hinterlassen sei etwas Modernes \u2014 Kommentare, Posts, Graffiti-Tags. Aber die Spiegelwand beweist das Gegenteil. Vor anderthalb Jahrtausenden sahen Menschen etwas Sch\u00F6nes und sp\u00FCrten genau das, was wir heute sp\u00FCren: den Drang, etwas zu sagen, es aufzuschreiben, es dauerhaft zu machen. Das menschliche Herz hat sich nicht ver\u00E4ndert. Wir fallen immer noch auf Bilder herein, schreiben immer noch Worte, die vielleicht niemand lesen wird, und glauben immer noch, dass Gef\u00FChle, einmal niedergeschrieben, irgendwie f\u00FCr immer halten.",

  paragraphs: [
    {
      text: "Im f\u00FCnften Jahrhundert lie\u00DF ein sri-lankischer K\u00F6nig namens Kashyapa eine Wand auf Sigiriya spiegelglatt polieren \u2014 einer Felsenfestung, die aus dem Dschungel ragt. Die Wand verlief direkt unterhalb der Wolkenm\u00E4dchen, jener in Gold gemalten Frauen, die zwischen Wolken schweben. Die Rezeptur war abenteuerlich: Kalk, Eiwei\u00DF, wilder Honig, gegl\u00E4ttet mit Bienenwachs. Wer daran entlangging, sah die gemalten Frauen neben sich \u2014 oben die echten, unten ihr Spiegelbild. Gebaut f\u00FCr das Vergn\u00FCgen eines K\u00F6nigs. Was daraus wurde, geh\u00F6rte allen.",
    },
    {
      text: "Als Kashyapa 495 fiel \u2014 get\u00F6tet im Kampf von seinem eigenen Bruder, der den Thron zur\u00FCckforderte \u2014 wurde die Festung ein buddhistisches Kloster. Die Wolkenm\u00E4dchen waren nicht mehr der private Schatz eines K\u00F6nigs. M\u00F6nche, Pilger, Soldaten, H\u00E4ndler, Bauern \u2014 jeder, der den Felsen bestieg, konnte sie sehen. Und dann geschah etwas, das niemand geplant hatte: Besucher, \u00FCberw\u00E4ltigt von dem, was sie sahen, zogen spitze Werkzeuge hervor und ritzten ihre Gef\u00FChle in die polierte Oberfl\u00E4che. Sie machten aus einem Spiegel ein Notizbuch.",
    },
    {
      text: "Achthundert Jahre lang \u2014 vom 6. bis zum 14. Jahrhundert \u2014 ritzten Besucher \u00FCber achtzehnhundert Inschriften in die Spiegelwand. Liebesgedichte, Lebensweisheiten, buddhistische Warnungen, Witze und schlichte Notizen, die kaum mehr sagten als 'Ich war hier.' In Singhalesisch, Sanskrit und Tamil. Kein geplantes Literaturprojekt. Purer menschlicher Instinkt: etwas Sch\u00F6nes sehen und etwas dazu sagen m\u00FCssen. Zusammen wurden diese eingeritzten Verse zur \u00E4ltesten bekannten Sammlung singhalesischer Dichtung.",
    },
    {
      text: "Die meisten Dichter waren M\u00E4nner, und ihr Thema war die Sehnsucht. 'Das M\u00E4dchen mit der goldenen Haut hat mir Verstand und Augen geraubt,' schrieb einer. Ein anderer gestand, die gemalten Frauen h\u00E4tten ihn ersch\u00FCttert: 'Von ihrem Seitenblick getroffen, lag ich flach am Boden.' Das waren keine Touristen im Vorbeigehen. Das waren M\u00E4nner, ehrlich \u00FCberw\u00E4ltigt \u2014 auf einem schmalen Gang, den Blick nach oben zu goldenen Frauen in gemalten Wolken gerichtet, ohne Worte gro\u00DF genug f\u00FCr das, was sie empfanden.",
    },
    {
      text: "Die Frauen hatten einen anderen Blick. Deva \u2014 nur bekannt als 'die Ehefrau von Mahamata' \u2014 hinterlie\u00DF einen Vers voller Eifersucht: 'Diese Reh\u00E4ugige auf der Klippe macht mich wahnsinnig. Sie baumelt mit ihren Perlen und flirtet mit meinem Mann.' Und eine anonyme Besucherin ritzte den sch\u00E4rfsten Satz der Wand: 'Als Frau tun mir die Gemalten leid. Ihr dummen M\u00E4nner, die ihr euch abm\u00FCht, Lieder zu schreiben. Keiner hat uns Rum und Sirup mitgebracht.' F\u00FCnfzehnhundert Jahre alt \u2014 und trifft immer noch.",
    },
    {
      text: "Und dann war da der M\u00F6nch Kiti, der sah, was die Verliebten nicht sehen konnten. Seine Inschrift liest sich wie eine Warnung: 'Wenn du hier verweilst, verliere nicht dein Herz. Vergn\u00FCgen f\u00FChrt zu Schmerz. Schmerz gleicht dem Vergn\u00FCgen.' Kiti hatte begriffen: Die Wolkenm\u00E4dchen waren selbst die Lektion \u2014 sch\u00F6n, begehrenswert, unerreichbar. Die Sehnsucht, die sie weckten, war die ganze Botschaft. Wer schreibt, der bleibt \u2014 achtzehnhundert Inschriften genau dieser Sehnsucht, in Stein gemei\u00DFelt, beweisen es.",
    },
    {
      text: "1956 ver\u00F6ffentlichte der Arch\u00E4ologe Senarath Paranavitana \u00DCbersetzungen von 685 dieser Verse \u2014 und gab Stimmen zur\u00FCck, die \u00FCber tausend Jahre geschwiegen hatten. Und hier kommt die letzte Wendung: Die Spiegelwand wurde gebaut, um Sch\u00F6nheit zu reflektieren. Doch die Zeit tr\u00FCbte den Spiegel. Das Spiegelbild verschwand. Was \u00FCberlebte, waren die Worte derer, die dort standen, wo einst das Spiegelbild gewesen war, und versuchten zu beschreiben, was sie sahen. Der Spiegel versagte. Die Dichtung blieb.",
    },
  ],

  updatedAt: Math.floor(Date.now() / 1000),
};

// Validate before push
console.log("=== PRE-PUSH VALIDATION (GERMAN) ===");
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
  console.log("SUCCESS! German story pushed.");
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
      Key: { siteId: "sigiriya", langStoryId: "de#mirror-wall-poets" },
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
