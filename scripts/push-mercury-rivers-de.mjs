import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "terracotta-army",
  langStoryId: "de#mercury-rivers-underworld",
  lang: "de",
  storyId: "mercury-rivers-underworld",
  title: "Die Quecksilberfl\u00fcsse der Unterwelt",
  subtitle: "Ein Kaiser, der den Kosmos unter der Erde erbaute",
  excerpt: "Um das Jahr 100 vor Christus schrieb ein chinesischer Historiker namens Sima Qian etwas, das v\u00f6llig irre klang. Er behauptete, das Grab des ersten Kaisers von China enthalte Fl\u00fcsse aus fl\u00fcssigem Quecksilber. Keine Metapher. Echtes Quecksilber, das durch Kan\u00e4le gepumpt wurde, um die Wasserl\u00e4ufe des Reiches nachzubilden.",
  paragraphs: [
    {
      text: "Um das Jahr 100 vor Christus schrieb ein chinesischer Historiker namens Sima Qian etwas, das v\u00f6llig irre klang. Er behauptete, das Grab von Qin Shi Huang \u2014 dem ersten Kaiser von China, dem Mann hinter der Gro\u00dfen Mauer und der Terrakotta-Armee \u2014 enthalte Fl\u00fcsse aus fl\u00fcssigem Quecksilber. Keine Metapher. Echtes Quecksilber, das durch Kan\u00e4le gepumpt wurde, um die tats\u00e4chlichen Wasserl\u00e4ufe des Reiches nachzubilden.",
    },
    {
      text: "Er hielt es fest im Shiji, Chinas gro\u00dfer historischer Chronik. Dort beschrieb er, wie Quecksilber \u201edie hundert Fl\u00fcsse nachbildete, den Jangtsekiang, den Gelben Fluss und das gro\u00dfe Meer, alles durch Mechanismen in Bewegung gesetzt\u201c. Die Decke war mit Edelsteinen besetzt, die den Nachthimmel imitierten. Der Boden zeigte eine ma\u00dfstabsgetreue Karte des Reiches. Sterne oben, Fl\u00fcsse unten \u2014 ein privates Universum, gebaut f\u00fcr einen einzigen Toten.",
    },
    {
      text: "Zweitausend Jahre lang nahm das kaum jemand ernst. Quecksilberfl\u00fcsse? Unterirdische Sternbilder? Das klang nach Mythos, nicht nach Geschichte. Das Grab war die ganze Zeit da \u2014 ein 76 Meter hoher H\u00fcgel voller Granatapfelb\u00e4ume bei der Stadt Xi\u2019an \u2014, aber niemand konnte beweisen, was darin lag, ohne es zu \u00f6ffnen.",
    },
    {
      text: "Dann, im Jahr 2003, untersuchten chinesische Wissenschaftler den Boden direkt \u00fcber dem Grab. Die Ergebnisse waren atemberaubend: Die Quecksilberwerte \u00fcber der Grabkammer lagen bis zu hundertmal h\u00f6her als in der Umgebung. Und das Quecksilber war nicht zuf\u00e4llig verteilt. Es konzentrierte sich entlang von Linien, die exakt den Positionen der gro\u00dfen chinesischen Fl\u00fcsse auf einer Karte entsprachen.",
    },
    {
      text: "Sima Qian hatte nicht \u00fcbertrieben. Er hatte es wortw\u00f6rtlich gemeint. Qin Shi Huang hatte einen kompletten Kosmos unter der Erde errichtet: Quecksilberfl\u00fcsse, die die Wasserl\u00e4ufe seines Reiches nachzeichneten, Sternbilder aus Edelsteinen an der Decke, automatische Armbr\u00fcste als W\u00e4chter wie Geisterarmeen. Was lange w\u00e4hrt, wird endlich gut \u2014 auch wenn es zweitausend Jahre dauert, bis die Wissenschaft einem Historiker recht gibt.",
    },
    {
      text: "Aber hier kommt der Haken: China weigert sich, das Grab zu \u00f6ffnen. Quecksilber t\u00f6tet Bakterien und stoppt den Zerfall \u2014 es wirkt wie ein perfektes Konservierungsmittel. Alles, was dort drinnen liegt, ist seit \u00fcber 2.200 Jahren in Quecksilberdampf versiegelt. Wissenschaftler bef\u00fcrchten, dass eine \u00d6ffnung alles binnen Minuten zerst\u00f6ren k\u00f6nnte. Das gr\u00f6\u00dfte arch\u00e4ologische R\u00e4tsel der Welt steht einfach da. Unber\u00fchrt.",
    },
    {
      text: "Manche Forscher glauben, dass das Grab Schriftrollen enth\u00e4lt, die unser Bild vom antiken China grundlegend ver\u00e4ndern k\u00f6nnten. Qin Shi Huang hat die chinesische Schrift vereinheitlicht \u2014 warum h\u00e4tte er keine B\u00fccher mit ins Jenseits nehmen sollen? Falls sie dort drin sind, liegen sie seit zwei Jahrtausenden perfekt versiegelt in quecksilberges\u00e4ttigter Dunkelheit. Und wir k\u00f6nnen sie nicht anr\u00fchren.",
    },
    {
      text: "Das Grab steht heute noch da, f\u00fcr jeden sichtbar. Hunderttausende Touristen kommen jedes Jahr. Sie fotografieren die ber\u00fchmten Terrakotta-Krieger, kaufen Souvenirs und gehen an diesem stillen gr\u00fcnen H\u00fcgel vorbei, ohne zweimal hinzuschauen. Unter ihren F\u00fc\u00dfen, im Dunkeln, flie\u00dfen die Quecksilberfl\u00fcsse des ersten Kaisers vielleicht immer noch.",
    },
  ],
  moralOrLesson: "Manchmal stellt sich heraus, dass das, was jahrtausendelang als Mythos galt, erstaunlicher ist als jede Fiktion.",
  characters: [
    "Qin Shi Huang \u2014 der Kaiser, der die Unterwelt erbaute",
    "Sima Qian \u2014 der Historiker, der sie beschrieb",
    "Moderne Wissenschaftler, die das Quecksilber best\u00e4tigten",
  ],
  era: "210 v. Chr. \u2014 Qin-Dynastie",
  source: 'Sima Qian, "Shiji"; 2003 Chinese Academy of Sciences mercury survey; Archaeological Institute of Shaanxi Province',
  icon: "\u{1F30A}",
  tier: "A",
  storyCategory: "riddles_past",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 34.3812, lng: 109.2541 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  updatedAt: Math.floor(Date.now() / 1000),
};

try {
  await docClient.send(
    new PutCommand({ TableName: "Story", Item: item })
  );
  console.log("SUCCESS: German (de) story pushed to DynamoDB");
  console.log(`  siteId: ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title: ${item.title}`);
  console.log(`  paragraphs: ${item.paragraphs.length}`);
} catch (err) {
  console.error("FAILED to push German story:", err);
  process.exit(1);
}
