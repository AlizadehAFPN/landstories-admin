/**
 * Push German (de) recreation of "The Library That Burned for Seven Days"
 * siteId: alamut-castle
 * langStoryId: de#library-burned-seven-days
 *
 * Cultural proverb subverted:
 *   "Dort, wo man Bücher verbrennt, verbrennt man am Ende auch Menschen" — Heinrich Heine
 *   Subversion: At Alamut the sequence was reversed — they killed the people first, then burned their books.
 *
 * Register: Florian Illies / Geschichten aus der Geschichte — precise, paratactic, Sachlichkeit
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Story record ────────────────────────────────────────────────────────────

const de = {
  siteId: "alamut-castle",
  storyId: "library-burned-seven-days",
  langStoryId: "de#library-burned-seven-days",
  lang: "de",

  title: "Sieben Tage Asche",
  subtitle:
    "Vierhunderttausend Bücher, ein Feuer, das eine Woche lang brannte — und das Wissen, das nie zurückkam",
  excerpt:
    "Im Jahr 1256 erreicht die mongolische Armee eine Festung in den Bergen Nordirans. Drinnen: eine der größten Bibliotheken der Welt. Was dann passiert, dauert sieben Tage und sieben Nächte — und ist bis heute nicht rückgängig zu machen.",
  moralOrLesson:
    "Mauern kann man wieder hochziehen. Reiche kann man neu gründen. Aber ein verbranntes Buch kommt nicht zurück. Die eigentliche Tragödie von Alamut ist nicht, was verloren ging — sondern dass wir nie erfahren werden, was verloren ging.",

  icon: "\u{1F4DA}",
  storyCategory: "lost_found",
  era: "1090–1256 CE",
  tier: "S",
  isFree: true,
  isFeatured: false,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 36.4447, lng: 50.5861 },
  source:
    "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); S. J. Badakhchani (trans.), Nasir al-Din Tusi — Contemplation and Action (2012); Peter Willey, Eagle's Nest: Ismaili Castles in Iran and Syria (2005)",
  characters: [
    "Hassan-i Sabbah (Gründer der Festung Alamut, Gelehrter und Sammler)",
    "Nasir al-Din al-Tusi (Universalgelehrter, der über dreißig Jahre in Alamut lebte)",
    "Hülegü Khan (Enkel von Dschingis Khan, Zerstörer von Alamut)",
    "Ata-Malik Dschuwayni (Historiker, der die Bibliothek vor dem Brand durchging)",
    "Rukn al-Din Khurshah (letzter Anführer von Alamut)",
  ],
  updatedAt: now,

  paragraphs: [
    {
      text: "Im Jahr 1090 gelingt einem Gelehrten namens Hassan-i Sabbah etwas Unglaubliches. Er nimmt die Festung Alamut ein — hoch oben auf einem Felsen im Alborz-Gebirge im Norden Irans. Ohne einen einzigen Tropfen Blut. Dann schließt er sich ein. Vierunddreißig Jahre lang verlässt er die Burg kaum. Was er dort tut? Er liest. Er sammelt. Er baut eine der größten Bibliotheken auf, die die islamische Welt je gesehen hat.",
    },
    {
      text: "Über hundertundsechzig Jahre lang erweitert jeder Anführer nach Hassan die Sammlung. Um 1250 umfasst die Bibliothek rund vierhunderttausend Bände. Theologie, Philosophie, Astronomie, Medizin, Dichtung. Gelehrte aus der gesamten muslimischen Welt nehmen den langen Weg in dieses abgelegene Bergtal auf sich, nur um dort zu studieren. Das ist keine Büchersammlung. Das ist eines der großen Wissenszentren der Erde.",
    },
    {
      text: "Einer dieser Gelehrten heißt Nasir al-Din al-Tusi — vermutlich der brillanteste wissenschaftliche Kopf der islamischen Welt im dreizehnten Jahrhundert. Über dreißig Jahre lebt er in Alamut. In dieser Zeit schreibt er bahnbrechende Arbeiten zur Astronomie, die Jahrhunderte später Kopernikus erreichen werden. Er nutzt die Bibliothek so, wie nur ein Genie es kann: nicht nur lesen, sondern Ideen aus verschiedenen Feldern verbinden.",
    },
    {
      text: "1256 kommen die Mongolen. Hülegü Khan — Enkel von Dschingis Khan — marschiert mit über hunderttausend Soldaten in die Berge. Ein Ziel: die Gemeinschaft auslöschen, die Alamut seit fast zwei Jahrhunderten hält. Der letzte Anführer, ein junger Mann namens Rukn al-Din, versucht zu verhandeln. Er lässt sogar seine eigenen Burgmauern abreißen, um seinen Willen zur Kapitulation zu zeigen. Es nützt nichts. Hülegü will totale Zerstörung.",
    },
    {
      text: "Und hier wird es unerträglich. Bevor das Feuer gelegt wird, darf ein Historiker namens Dschuwayni — er reist mit der mongolischen Armee — durch die Bibliothek gehen. Er ist ein gebildeter Mann. Er versteht genau, was vor ihm liegt. Er rettet die Korane. Er rettet die astronomischen Instrumente. Er liest sogar Hassans Autobiografie — den einzigen Bericht aus erster Hand über die Gründung von Alamut. Dann zündet er alles andere an. Die Bibliothek brennt sieben Tage und sieben Nächte.",
    },
    {
      text: "Al-Tusi überlebt. Er wechselt die Seite — ob aus Verrat oder Überlebensinstinkt, weiß niemand. Er wird Hülegüs oberster Wissenschaftsberater. Er überzeugt den Kriegsherrn, ein Observatorium in Maragha zu bauen, gefüllt mit vierhunderttausend Büchern aus eroberten Städten. Die Arbeit dort wird Kopernikus erreichen. Manches, was in al-Tusis Kopf lebte, hat das Feuer überstanden. Aber nur manches.",
    },
    {
      text: "Heinrich Heine schrieb: Dort, wo man Bücher verbrennt, verbrennt man am Ende auch Menschen. In Alamut war es umgekehrt. Erst töteten sie die Menschen. Dann verbrannten sie, was diese Menschen gedacht hatten. Das ist schlimmer als Heines Warnung. Heute stehen nur noch Ruinen im Alborz-Gebirge. Die Bibliothek ist weg. Vierhunderttausend Bände. Wir wissen, was ein kluger Mann in seinem Kopf hinausgetragen hat. Wir werden nie erfahren, was verbrannt ist.",
    },
  ],
};

// ─── Validation ──────────────────────────────────────────────────────────────

let totalChars = 0;
let allValid = true;

for (let i = 0; i < de.paragraphs.length; i++) {
  const t = de.paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  totalChars += chars;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  console.log(
    `P${i + 1}: ${chars} chars, ${words} words ${charOk ? "✓" : "✗ OVER 500 CHARS"} ${wordOk ? "✓" : "✗ OVER 100 WORDS"}`
  );

  if (!charOk || !wordOk) allValid = false;
}

console.log(`\nTotal: ${totalChars} chars across ${de.paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allValid) {
  console.error("\n❌ Validation failed — aborting.");
  process.exit(1);
}

if (totalChars < 2400 || totalChars > 3600) {
  console.error("\n❌ Total character count out of range — aborting.");
  process.exit(1);
}

// ─── Required fields check ───────────────────────────────────────────────────

const requiredFields = [
  "siteId", "langStoryId", "storyId", "lang", "title", "subtitle",
  "excerpt", "icon", "storyCategory", "era", "tier", "isFree",
  "hasAudio", "characters", "moralOrLesson", "paragraphs", "source",
  "updatedAt",
];
const missing = requiredFields.filter((f) => de[f] === undefined);
if (missing.length > 0) {
  console.error(`\n❌ Missing fields: ${missing.join(", ")}`);
  process.exit(1);
}

// ─── Push to DynamoDB ────────────────────────────────────────────────────────

console.log(`\n⏳ Pushing de#library-burned-seven-days ...`);
console.log(`  siteId:      ${de.siteId}`);
console.log(`  langStoryId: ${de.langStoryId}`);
console.log(`  title:       ${de.title}`);
console.log(`  paragraphs:  ${de.paragraphs.length}`);

try {
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: de,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );
  console.log(`✅ de#library-burned-seven-days pushed successfully.`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.log(`⚠️  de#library-burned-seven-days already exists — overwriting...`);
    await docClient.send(new PutCommand({ TableName: TABLE, Item: de }));
    console.log(`✅ de#library-burned-seven-days overwritten successfully.`);
  } else {
    console.error(`❌ Failed:`, err.message);
    process.exit(1);
  }
}

console.log(`\n═══════════════════════════════════════`);
console.log(`German story pushed successfully.`);
console.log(`Timestamp: ${now} (${new Date(now * 1000).toISOString()})`);
console.log(`═══════════════════════════════════════\n`);
