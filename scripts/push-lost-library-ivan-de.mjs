import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "moscow-kremlin",
  langStoryId: "de#lost-library-ivan",
  lang: "de",
  storyId: "lost-library-ivan",
  title: "Die verschollene Bibliothek unter dem Kreml",
  subtitle: "Wie das gr\u00f6\u00dfte Wissensarchiv der Welt in Moskaus Untergrund verschwand",
  excerpt: "Im Jahr 1472 heiratet Sophia Palaiologina \u2014 die Nichte des letzten byzantinischen Kaisers \u2014 den russischen Gro\u00dff\u00fcrsten Iwan\u00a0III. Aber ihre eigentliche Mitgift war kein Gold und kein Land. Es waren Hunderte antike Handschriften auf Griechisch und Latein, vermutlich die letzten Reste der legend\u00e4ren Bibliothek von Konstantinopel. Texte von Homer, Aristoteles und Cicero, die der Rest der Welt l\u00e4ngst f\u00fcr verloren hielt.",
  moralOrLesson: "Manchmal ist das, was Machthaber am meisten f\u00fcrchten, nicht das Unbekannte \u2014 sondern die Wahrheit, die unter ihren F\u00fc\u00dfen liegt.",
  paragraphs: [
    { text: "Im Jahr 1472 heiratet Sophia Palaiologina \u2014 die Nichte des letzten byzantinischen Kaisers \u2014 den russischen Gro\u00dff\u00fcrsten Iwan\u00a0III. Aber ihre eigentliche Mitgift war kein Gold und kein Land. Es waren Hunderte antike Handschriften auf Griechisch und Latein, vermutlich die letzten Reste der legend\u00e4ren Bibliothek von Konstantinopel. Texte von Homer, Aristoteles und Cicero, die der Rest der Welt l\u00e4ngst f\u00fcr verloren hielt." },
    { text: "Iwan\u00a0III. lie\u00df die Sammlung in ein unterirdisches Gew\u00f6lbe unter dem Kreml bringen \u2014 gesch\u00fctzt vor den Br\u00e4nden, die Moskaus Holzh\u00e4user regelm\u00e4\u00dfig in Schutt und Asche legten. Entworfen haben soll das Ganze Aristotele Fioravanti, der italienische Architekt, der auch die ber\u00fchmte Mari\u00e4-Entschlafens-Kathedrale im Kreml gebaut hat. Jahrhunderte unersetzlichen Wissens, versiegelt im Herzen Russlands." },
    { text: "Unter Iwans Enkel wuchs die Sammlung weiter \u2014 Iwan\u00a0IV., besser bekannt als Iwan der Schreckliche. Einer der brutalsten Herrscher der Geschichte, aber besessen von B\u00fcchern. Er f\u00fcgte Hunderte B\u00e4nde hinzu, darunter seltene Texte \u00fcber Alchemie und j\u00fcdische Mystik. Um 1570 behauptete ein deutscher Pastor namens Johann Wetterman, man habe ihm die Bibliothek gezeigt. Er beschrieb Schriftrollen, \u201Edie mit keinem Schatz der Erde aufzuwiegen w\u00e4ren.\u201C" },
    { text: "Dann starb Iwan der Schreckliche 1584. Und die Bibliothek war einfach weg." },
    { text: "Niemand wei\u00df, was passiert ist. In seinen letzten Jahren wurde Iwan immer paranoider \u2014 vielleicht hat er das Gew\u00f6lbe versiegelt und den Ort mit ins Grab genommen. Andere glauben, die Sammlung wurde w\u00e4hrend der Smuta versteckt, Russlands verheerendem B\u00fcrgerkrieg von 1598 bis 1613, und jeder Mitwisser kam im Chaos um. Manche sagen, Moskaus unerbittliche Br\u00e4nde haben alles zerst\u00f6rt. Aber die Augenzeugenberichte und byzantinischen Aufzeichnungen deuten darauf hin, dass sie wirklich existiert hat." },
    { text: "Seitdem wird gesucht. 1724 schickte Zar Peter der Gro\u00dfe eine Expedition unter den Kreml. Ohne Ergebnis. 1894 verschrieb Professor Ignatius Stelletsky seine gesamte Karriere der Suche, kartierte Tunnel unter dem Kreml \u2014 bis die neue Sowjetregierung ihn stoppte. Und in den 1930ern lie\u00df Diktator Stalin selbst im Geheimen suchen. Seine Leute fanden Tunnel, die noch tiefer in den Untergrund f\u00fchrten. Stalins Reaktion? Er lie\u00df sie mit Beton zusch\u00fctten." },
    { text: "Man sagt ja: Wer sucht, der findet. Drei Machthaber haben gesucht \u2014 Peter, Stelletsky, Stalin \u2014 und keiner hat gefunden. Oder schlimmer: Einer hat vielleicht gefunden und es trotzdem zugemauert. Der m\u00e4chtigste Mann der Sowjetunion st\u00f6\u00dft auf Tunnel, die zur gr\u00f6\u00dften verschollenen Bibliothek der Geschichte f\u00fchren k\u00f6nnten \u2014 und statt sie zu erforschen, l\u00e4sst er sie versiegeln. Was war dort unten, das ihm mehr Angst machte als das Nichtwissen?" },
    { text: "Bis heute ist es verboten, unter bestimmten Teilen des Kremls zu graben. Wenn die Bibliothek noch existiert, liegt sie unter einem der bestbewachten Orte der Erde \u2014 hinter Jahrhunderten von Geheimnissen, Tonnen von Beton und Schichten staatlicher Sicherheit. Manche glauben: Wenn man sie eines Tages findet, wird es nicht einfach eine Sammlung alter B\u00fccher sein. Es wird das fehlende Kapitel der menschlichen Zivilisation sein." },
  ],
  icon: "\uD83D\uDCDA",
  tier: "A",
  source: "Johann Wetterman's account (c. 1570), Professor Stelletsky's research (1894-1930s), Byzantine marriage records",
  characters: ["Ivan III", "Sophia Palaiologina", "Ivan the Terrible", "Aristotele Fioravanti", "Johann Wetterman", "Professor Stelletsky", "Stalin"],
  era: "1472 - present",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lng: 37.6175, lat: 55.752 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "riddles_past",
  updatedAt: 1772124973,
};

async function main() {
  try {
    await docClient.send(new PutCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    }));
    console.log("\u2705 German (de) version pushed successfully!");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      await docClient.send(new PutCommand({
        TableName: "Story",
        Item: item,
      }));
      console.log("\u2705 German (de) version updated successfully!");
    } else {
      console.error("\u274c Error pushing German version:", err);
      process.exit(1);
    }
  }
}

main();
