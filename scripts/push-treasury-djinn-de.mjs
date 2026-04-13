import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "petra" },
  langStoryId: { S: "de#treasury-carved-by-djinn" },
  lang: { S: "de" },
  storyId: { S: "treasury-carved-by-djinn" },
  title: { S: "Die Schatzkammer der Geister" },
  subtitle: { S: "Wie Dschinn einen Felsentempel schufen \u2014 und warum Generationen auf eine L\u00fcge schossen" },
  excerpt: { S: "Die Beduinen schworen, dass kein Mensch dieses Bauwerk je ber\u00fchrt hat. Erbaut in einer einzigen Nacht von Geistern aus rauchlosem Feuer \u2014 mit dem gestohlenen Gold eines Pharaos im steinernen Gef\u00e4\u00df ganz oben." },
  moralOrLesson: { S: "Manchmal ist das, was wir am meisten suchen, nie dort gewesen \u2014 und trotzdem hat die Suche alles ver\u00e4ndert." },
  icon: { S: "\u{1F3DB}\uFE0F" },
  tier: { S: "S" },
  storyCategory: { S: "gods_monsters" },
  era: { S: "c. 1st century BC \u2013 1st century AD (construction); 1812 (Burckhardt\u2019s rediscovery)" },
  readingTimeMinutes: { N: "7" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  coordinates: { M: { lng: { N: "35.4513" }, lat: { N: "30.3216" } } },
  source: { S: "Burckhardt, Johann Ludwig. Travels in Syria and the Holy Land, 1822; Farajat, Suleiman. Excavations at al-Khazneh (2003); Diodorus Siculus, Bibliotheca Historica XIX.94-95; McKenzie, Judith. The Architecture of Petra, 1990; Joukowsky, Martha Sharp. Petra Great Temple, Brown University Excavations; Madain Project, al-Khazneh Burial Crypt documentation" },
  characters: { L: [
    { S: "The Pharaoh (legendary)" },
    { S: "The Djinn (supernatural builders)" },
    { S: "King Aretas IV Philopatris" },
    { S: "Johann Ludwig Burckhardt (Sheikh Ibrahim)" },
    { S: "King Solomon (Suleiman, lord of the djinn)" }
  ]},
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  paragraphs: { L: [
    { M: { text: { S: "Die Beduinen nannten es nie ein Grab. F\u00fcr sie war es Khaznat al-Firaun \u2014 die Schatzkammer des Pharaos. Kein Mensch habe das je gebaut, sagten sie. Die Legende ging so: Der Pharao ertrank nicht im Roten Meer, als er Moses jagte. Er \u00fcberlebte, folgte ihm s\u00fcdw\u00e4rts in die Berge, Wagenladungen voll gestohlenem Gold im Schlepptau. Als die Schlucht zu eng wurde f\u00fcr seine Streitwagen, tat er, was ein Zauberk\u00f6nig eben tut. Er rief die Dschinn." }}},
    { M: { text: { S: "Dschinn \u2014 das sind im Islam Wesen aus rauchlosem Feuer, m\u00e4chtige Geister zwischen unserer Welt und dem G\u00f6ttlichen. Schon K\u00f6nig Salomon soll sie befohlen haben, seinen Tempel in Jerusalem zu bauen. Jetzt rief der Pharao dieselbe Macht an. Und die Dschinn gehorchten. In einer einzigen Nacht schlugen sie eine vierzig Meter hohe Fassade aus dem nackten Fels. S\u00e4ulen, G\u00f6tterstatuen, verborgene Kammern \u2014 alles aus einem St\u00fcck Stein. Ganz oben setzten sie eine Urne und versiegelten das Gold darin." }}},
    { M: { text: { S: "Jahrhundertelang glaubten die Beduinen, das Gold sei wirklich dort oben. Das war kein Gerede am Lagerfeuer \u2014 sie haben drauf geschossen. Reisende im 18. und 19. Jahrhundert fanden die Urne \u00fcbers\u00e4t mit Hunderten Einschussl\u00f6chern. Generation um Generation hatte versucht, sie aufzubrechen. Die Sache ist nur: Die Urne ist massiver Fels, direkt aus der Klippe gehauen. Da war nie etwas drin. Aber die Einsch\u00fcsse sind bis heute zu sehen \u2014 ein Denkmal daf\u00fcr, wie sehr Menschen wollten, dass die Legende stimmt." }}},
    { M: { text: { S: "Man sagt: Geld regiert die Welt. Hier regierte das Geld, das nie existierte, eine ganze W\u00fcste. Doch die echten Erbauer waren beeindruckender als jeder Geist. Um das erste Jahrhundert herum mei\u00dfelten die Nabat\u00e4er \u2014 arabische Nomaden, die zu den reichsten H\u00e4ndlern des Nahen Ostens aufgestiegen waren \u2014 dieses Grab f\u00fcr ihren gr\u00f6\u00dften K\u00f6nig, Aretas den Vierten. Griechische S\u00e4ulen, G\u00f6tter als W\u00e4chter des Jenseits, Adler, die Seelen gen Himmel tragen. Wer durch die enge Schlucht nach Petra kam, sah es als Erstes \u2014 und wusste, wessen Reich er gerade betreten hatte." }}},
    { M: { text: { S: "Tausend Jahre lang hatte kein Europ\u00e4er es gesehen. 1812 schlich sich der Schweizer Johann Ludwig Burckhardt hinein, verkleidet als Scheich Ibrahim. Drei Jahre hatte er Arabisch gelernt und den Koran studiert \u2014 alles f\u00fcr diesen Moment. Sein Vorwand: eine Ziege am Grab des Propheten Aaron zu opfern. Sein F\u00fchrer brachte ihn durch eine neunzig Meter tiefe Schlucht. Als sie herauskamen, stand die Schatzkammer vor ihm. \u201eIch sehe, du bist ein Ungl\u00e4ubiger\u201c, sagte der F\u00fchrer. Burckhardt zog sich zur\u00fcck \u2014 aber er hatte gerade eine der gr\u00f6\u00dften verlorenen St\u00e4dte der Welt gefunden." }}},
    { M: { text: { S: "2003 gruben Arch\u00e4ologen unter der Schatzkammer und fanden, was die Legende immer verborgen hatte. Kein Gold \u2014 Gr\u00e4ber. Sechs Meter tief stie\u00dfen sie auf Kammern mit den \u00dcberresten von mindestens elf Menschen, daneben Keramik und Weihrauch. 2024 fand ein weiteres Team zw\u00f6lf Skelette ganz in der N\u00e4he, unber\u00fchrt seit zweitausend Jahren. Die Schatzkammer war nie ein Tresor. Von Anfang an war sie ein Grab f\u00fcr die wichtigsten Menschen des K\u00f6nigreichs \u2014 genau dort, wo jeder Besucher vorbeikam." }}},
    { M: { text: { S: "Die Legende will einfach nicht sterben. Steven Spielberg machte die Schatzkammer zum Versteck des Heiligen Grals in Indiana Jones. Die echten R\u00e4ume hinter der Fassade? Klein, kahl, schmucklos \u2014 nichts wie im Film. Aber das ist egal. Es gibt etwas an der Art, wie das erste Morgenlicht auf den Sandstein f\u00e4llt und ihn in die Farbe von lebendigem Feuer taucht, das selbst den gr\u00f6\u00dften Skeptiker still werden l\u00e4sst. Vielleicht gab es die Dschinn wirklich. Vielleicht liegt das Gold noch da drin \u2014 tiefer, als je jemand gegraben hat." }}}
  ]}
};

try {
  await client.send(new PutItemCommand({ TableName: "Story", Item: item }));
  console.log("SUCCESS: de#treasury-carved-by-djinn pushed to DynamoDB");
} catch (err) {
  console.error("FAILED:", err.message);
  process.exit(1);
}
