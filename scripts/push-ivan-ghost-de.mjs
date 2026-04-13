import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "moscow-kremlin",
  langStoryId: "de#ivan-terrible-ghost",
  lang: "de",
  storyId: "ivan-terrible-ghost",
  title: "Das Gespenst des Kreml",
  subtitle: "Der Zar, der seine Festung nie verließ",
  excerpt: "Iwan der Schreckliche wurde nicht als Ungeheuer geboren. 1547 wurde er zum allerersten Zaren Russlands gekrönt, und jahrelang regierte er beeindruckend: Er dehnte das Reich bis nach Sibirien aus, modernisierte die Gesetze und ließ die Basilius-Kathedrale in Moskau errichten. Dann starb 1560 seine erste Frau Anastasia — und etwas in ihm zerbrach. Iwan war überzeugt, dass die Bojaren, Russlands mächtigste Adelsfamilien, sie vergiftet hatten. Was danach kam, gab ihm seinen Namen für alle Zeiten.",
  moralOrLesson: "Die Sünden der Mächtigen hallen durch die Mauern der Orte wider, an denen sie herrschten",
  paragraphs: [
    {
      text: "Iwan der Schreckliche wurde nicht als Ungeheuer geboren. 1547 wurde er zum allerersten Zaren Russlands gekrönt, und jahrelang regierte er beeindruckend: Er dehnte das Reich bis nach Sibirien aus, modernisierte die Gesetze und ließ die Basilius-Kathedrale in Moskau errichten. Dann starb 1560 seine erste Frau Anastasia — und etwas in ihm zerbrach. Iwan war überzeugt, dass die Bojaren, Russlands mächtigste Adelsfamilien, sie vergiftet hatten. Was danach kam, gab ihm seinen Namen für alle Zeiten."
    },
    {
      text: "Er schuf eine Privatarmee, die Opritschnina: Tausende schwarz gekleidete Reiter, die abgeschlagene Hundeköpfe an ihre Sättel banden — als Zeichen, dass sie Verräter \u201Eaufsp\u00FCren\u201C w\u00FCrden. Vom Kreml aus entfesselte Iwan Jahre des reinen Terrors. Er ließ das Oberhaupt der orthodoxen Kirche erdrosseln. Er befahl die Vernichtung von Nowgorod, einer ganzen Stadt im Norden Russlands, wo in fünf Wochen Tausende starben. Niemand war sicher. Keine Priester, keine Adeligen, nicht einmal sein eigenes Blut."
    },
    {
      text: "Im November 1581 schlug Iwan seinen eigenen Sohn — der ebenfalls Iwan hieß — mit einem eisenbeschlagenen Stab während eines Streits. Der Schlag tötete ihn. Die Szene wurde in einem der verstörendsten Gemälde der russischen Kunst festgehalten: ein Vater mit irrem Blick, der seinen sterbenden Sohn in den Armen hält, während das Grauen über das, was er getan hat, über ihn hereinbricht. Seine letzten drei Jahre verbrachte er zwischen Ausbrüchen von Grausamkeit und verzweifelten Gebeten, auf den Knien durch die Kirchen des Kreml kriechend."
    },
    {
      text: "Am 28. März 1584 setzte sich Iwan zu einer Partie Schach. Er beendete sie nie. Man fand ihn erstarrt, sein Gesicht in einem Ausdruck, den Augenzeugen als \u201Eentsetzlich\u201C beschrieben."
    },
    {
      text: "Und dann begann der Spuk."
    },
    {
      text: "Seit über vierhundert Jahren berichten Menschen im Kreml immer dasselbe: eine hochgewachsene Gestalt in Mönchskutte, die nachts an den Festungsmauern entlanggleitet. Als Napoleons Truppen 1812 Moskau besetzten, schworen französische Soldaten, in den königlichen Gemächern eine eisige Präsenz gespürt zu haben — Kerzen, die von selbst erloschen, ihr Atem, der im September zu Nebel wurde. In der Sowjetzeit tauschten Kreml-Mitarbeiter hinter vorgehaltener Hand Geschichten aus: Schritte in versiegelten Gängen, Türen, die sich in Räumen öffneten, die seit Jahrzehnten verschlossen waren."
    },
    {
      text: "Man sagt, das Gespenst erscheine am häufigsten im November — dem Monat, in dem Iwan seinen Sohn erschlug. Wer es gespürt hat, beschreibt eine plötzliche Welle aus Trauer und Wut, als liefe man gegen eine unsichtbare Mauer aus purer Emotion. Manche sprechen von einer eiskalten Hand auf der Schulter und einer Stimme, die in einem Russisch flüstert, das so alt ist, dass es heute niemand mehr versteht. Gottes Mühlen mahlen langsam, sagt man. Aber manchmal mahlen sie so gründlich, dass nicht einmal der Tod das Leid beendet."
    },
    {
      text: "Man muss nicht an Gespenster glauben, um eines zu begreifen: Iwan der Schreckliche hat so viel Schmerz in diesen Mauern hinterlassen, dass man auch nach über vier Jahrhunderten die Gänge des Kreml nicht durchschreiten kann, ohne das Gefühl, dass jemand direkt hinter einem steht. Es gibt Orte, die Geschichte nicht nur bewahren — sie weigern sich, sie loszulassen."
    }
  ],
  icon: "👤",
  tier: "S",
  source: "Kremlin guard testimonies, historical folklore compilations, Russian ghost literature",
  characters: ["Ivan the Terrible (ghost)", "Kremlin guards through centuries"],
  era: "1584 - present",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lng: 37.6173, lat: 55.7508 },
  hasAudio: false,
  isFree: true,
  storyCategory: "ghosts_curses",
  disabled: false,
  updatedAt: 1772047253,
};

async function push() {
  try {
    const jsonStr = JSON.stringify(item);
    JSON.parse(jsonStr);
    console.log(`JSON valid. Size: ${jsonStr.length} bytes`);
    console.log(`Paragraphs: ${item.paragraphs.length}`);
    console.log(`Title: ${item.title}`);
    console.log(`langStoryId: ${item.langStoryId}`);

    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
      })
    );
    console.log("SUCCESS: German (de) version pushed to DynamoDB.");
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
