import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared (unchanged) fields ───────────────────────────────────────────────
const shared = {
  siteId:            { S: "petra" },
  storyId:           { S: "nabataean-water-wizards" },
  icon:              { S: "💧" },
  tier:              { S: "S" },
  source:            { S: "Diodorus Siculus, Bibliotheca Historica XIX.94-95 (c. 60-30 BC); Ortloff, Charles R. 'The Water Supply and Distribution System of the Nabataean City of Petra,' Cambridge Archaeological Journal 15:1, 2005; Bedal, Leigh-Ann. 'A Pool Complex in Petra's City Center,' BASOR 324, 2001; Jungmann, Niklas. 'Rediscovering the Ain Braq Aqueduct,' Levant, 2025; National Geographic, 'Petra's Ancient Technology and Climate Change,' 2024" },
  characters:        { L: [
    { S: "The Nabataean engineers (anonymous geniuses)" },
    { S: "King Aretas IV Philopatris" },
    { S: "Diodorus Siculus (Greek historian)" },
    { S: "Antigonus I Monophthalmus (failed invader)" },
    { S: "Leigh-Ann Bedal (archaeologist)" },
  ]},
  era:               { S: "c. 300 BC – AD 363 (Nabataean water system); 312 BC (Antigonus invasion); 1963 (flash flood disaster)" },
  readingTimeMinutes:{ N: "4" },
  image:             { S: "" },
  thumbnail:         { S: "" },
  coordinates:       { M: { lng: { N: "35.4444" }, lat: { N: "30.3285" } } },
  hasAudio:          { BOOL: false },
  isFree:            { BOOL: true },
  storyCategory:     { S: "builders_wonders" },
  disabled:          { BOOL: false },
  updatedAt:         { N: String(now) },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH
// ═══════════════════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang:        { S: "es" },
  langStoryId: { S: "es#nabataean-water-wizards" },
  title:       { S: "Los magos del agua de Petra" },
  subtitle:    { S: "Cómo un pueblo nómada construyó el sistema hidráulico más avanzado del mundo antiguo — y lo mantuvo en secreto" },
  excerpt:     { S: "Petra recibe menos lluvia que partes del Sáhara. Y sin embargo, hace dos mil años, los nabateos construyeron allí una ciudad de treinta mil personas — con fuentes, piscinas y jardines. No encontraron agua — la inventaron." },
  moralOrLesson: { S: "Las grandes civilizaciones no se construyen sobre la conquista o el oro, sino sobre el dominio de lo invisible — y la riqueza más peligrosa no es el tesoro que tus enemigos pueden ver, sino el recurso secreto que jamás encontrarán." },
  paragraphs:  { L: [
    { M: { text: { S: "Petra recibe menos lluvia que buena parte del Sáhara: apenas ciento cincuenta milímetros al año. Y aun así, hace dos mil años, los nabateos levantaron una ciudad de treinta mil personas con fuentes, piscinas y jardines. Sin río. Sin lago. En pleno desierto. No encontraron agua: la inventaron. Con una tecnología tan avanzada que los científicos modernos descubrieron que habían dominado la dinámica de fluidos siglos antes de que Occidente le pusiera nombre." }}},
    { M: { text: { S: "Su primera arma no fue la ingeniería: fue el secreto. En el 312 a.C., un ejército griego atacó para robar sus riquezas. Los nabateos los persiguieron y los destrozaron. Cuando llegó un ejército más grande, desaparecieron en el desierto. Los griegos, muriéndose de sed, suplicaron la paz y se fueron. ¿El truco? Tanques de agua enterrados por todo el desierto, sellados y camuflados para que solo ellos los encontraran. El desierto no era su debilidad — era su fortaleza." }}},
    { M: { text: { S: "La arteria de Petra era Ain Musa — el Manantial de Moisés — a siete kilómetros. Lo canalizaron por el Siq, el cañón de un kilómetro que era la única entrada a la ciudad, con un sistema doble: canal tallado en la roca a un lado, tuberías de terracota con juntas de precisión al otro. En la boca del cañón, una presa desviaba las riadas. En 1963, una de esas riadas mató a veintidós turistas en el Siq — prueba de que los nabateos ya habían resuelto ese problema dos mil años antes." }}},
    { M: { text: { S: "Pero sobrevivir no era suficiente: querían presumir. En 1998, la arqueóloga Leigh-Ann Bedal empezó a excavar un punto que los mapas antiguos llamaban «el mercado bajo». No era un mercado. Era un jardín del paraíso con una piscina de cuarenta y tres metros de largo y un pabellón en una isla al que solo se llegaba nadando. Un lago con isla — en el desierto. Cualquier funcionario romano habría entendido el mensaje: si esta gente puede construir esto aquí, ni se te ocurra meterte con ellos." }}},
    { M: { text: { S: "En el centro de la ciudad, una fuente pública llamada Ninfeo abastecía a los treinta mil habitantes. En 2025, el investigador Niklas Jungmann, de la Universidad Humboldt, descubrió algo en las montañas: una tubería presurizada de plomo de ciento dieciséis metros que funcionaba como sifón invertido — empujando agua cuesta arriba para dejarla caer por el otro lado. Los ingenieros creían que eso solo existía dentro de edificios romanos. Los nabateos lo hicieron en plena naturaleza dos mil años antes." }}},
    { M: { text: { S: "Cuando Roma conquistó Petra en el 106 d.C., hicieron algo inaudito: mantuvieron el sistema nabateo en lugar de imponer el suyo. Roma, que estampaba su ingeniería en cada territorio que pisaba, miró Petra y admitió lo impensable: no podemos hacerlo mejor. Durante dos siglos más, las tuberías nabateas siguieron fluyendo. Ya lo dice el refrán: el agua mansa rompe la roca. Los nabateos no necesitaron ejércitos — les bastó con tuberías." }}},
    { M: { text: { S: "El 19 de mayo del 363 d.C., un terremoto masivo lo destrozó todo. Tuberías reventadas. Canales hundidos. Cinco siglos de ingeniería destruidos en minutos. Podría haberse reconstruido, pero el mundo había cambiado. Las rutas comerciales se habían ido al mar. Las caravanas dejaron de llegar. Sin dinero ni gente, nadie reparó nada. Sin agua, Petra murió. Las piscinas se llenaron de arena y el desierto recuperó lo que los nabateos le habían robado." }}},
    { M: { text: { S: "Hoy, las riadas siguen arrasando el Siq. En 2022, seis meses de lluvia cayeron en un solo día y hubo que evacuar a mil setecientos turistas. Las presas antiguas ya son ruinas, testigos mudos de un pueblo que entendió algo que la mayoría de las civilizaciones aprende demasiado tarde: el agua no es solo algo que bebes. Es poder. Es secreto. Es la diferencia entre un reino y una ruina." }}},
  ]},
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH
// ═══════════════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang:        { S: "fr" },
  langStoryId: { S: "fr#nabataean-water-wizards" },
  title:       { S: "Les magiciens de l'eau de Pétra" },
  subtitle:    { S: "Comment un peuple nomade a bâti le système hydraulique le plus avancé du monde antique — et l'a gardé secret" },
  excerpt:     { S: "Pétra reçoit moins de pluie que le Sahara. Pourtant, il y a deux mille ans, les Nabatéens y ont bâti une cité de trente mille habitants — avec fontaines, bassins et jardins. Ils n'ont pas trouvé l'eau — ils l'ont inventée." },
  moralOrLesson: { S: "Les grandes civilisations ne se bâtissent pas sur la conquête ou l'or, mais sur la maîtrise de l'invisible — et la richesse la plus dangereuse n'est pas le trésor que vos ennemis peuvent voir, mais la ressource secrète qu'ils ne trouveront jamais." },
  paragraphs:  { L: [
    { M: { text: { S: "Pétra reçoit moins de pluie que certaines zones du Sahara : à peine cent cinquante millimètres par an. Pourtant, il y a deux mille ans, les Nabatéens y ont bâti une cité de trente mille habitants avec fontaines, bassins et jardins. Pas de fleuve. Pas de lac. Le désert. Ils n'ont pas trouvé l'eau — ils l'ont inventée, avec une technologie si avancée que les scientifiques modernes ont découvert qu'ils maîtrisaient la dynamique des fluides bien avant que l'Occident lui donne un nom." }}},
    { M: { text: { S: "Leur première arme, ce n'était pas la plomberie — c'était le secret. En 312 av. J.-C., une armée grecque a attaqué pour voler leurs richesses. Les Nabatéens les ont poursuivis et anéantis. Quand une force plus grande est arrivée, ils ont disparu dans le désert. Les Grecs, mourant de soif, ont supplié la paix. L'astuce ? Des citernes enterrées dans le désert, scellées et camouflées pour qu'eux seuls les trouvent. Le désert n'était pas leur faiblesse — c'était leur forteresse." }}},
    { M: { text: { S: "L'artère de Pétra, c'était Aïn Moussa — la Source de Moïse — à sept kilomètres. Ils l'ont canalisée à travers le Siq, le canyon d'un kilomètre servant d'unique entrée, avec un double système : canal taillé dans la roche d'un côté, conduites en terre cuite à joints de précision de l'autre. À l'entrée du canyon, un barrage détournait les crues. En 1963, une de ces crues a tué vingt-deux touristes dans le Siq — preuve que les Nabatéens avaient résolu ce problème deux mille ans avant." }}},
    { M: { text: { S: "Mais survivre ne suffisait pas — ils voulaient impressionner. En 1998, l'archéologue Leigh-Ann Bedal a fouillé un endroit que les cartes anciennes appelaient « le marché bas ». Ce n'était pas un marché. C'était un jardin avec un bassin de quarante-trois mètres et un pavillon sur une île accessible uniquement à la nage. Un lac avec une île — en plein désert. N'importe quel dignitaire romain aurait compris : si ces gens peuvent bâtir ça ici, n'essayez même pas." }}},
    { M: { text: { S: "Au cœur de la ville, une fontaine publique — le Nymphée — alimentait trente mille habitants. En 2025, Niklas Jungmann de l'Université Humboldt a découvert dans les montagnes une conduite en plomb de cent seize mètres fonctionnant comme un siphon inversé : elle poussait l'eau vers le haut avant de la laisser redescendre. Les ingénieurs pensaient que ça n'existait que dans les bâtiments romains. Les Nabatéens l'avaient fait en pleine nature deux mille ans avant." }}},
    { M: { text: { S: "Quand Rome a pris Pétra en 106, les conquérants ont fait quelque chose d'inédit : garder le système nabatéen au lieu d'imposer le leur. Rome, qui écrasait tout de son génie civil, a regardé Pétra et admis l'impensable : on ne peut pas faire mieux. On dit qu'il n'est pire eau que l'eau qui dort. Pendant deux siècles, l'eau des Nabatéens a dormi dans ses conduites — et elle a tenu en respect le plus grand empire du monde." }}},
    { M: { text: { S: "Puis le 19 mai 363, un séisme massif a tout détruit. Conduites éclatées. Canaux effondrés. Cinq siècles d'ingénierie anéantis en quelques minutes. On aurait pu reconstruire, mais le monde avait changé. Les routes commerciales avaient pris la mer. Les caravanes ne venaient plus. Sans argent ni habitants, personne n'a réparé. Sans eau, Pétra est morte. Les bassins se sont remplis de sable, et le désert a repris ce que les Nabatéens lui avaient volé." }}},
    { M: { text: { S: "Aujourd'hui, les crues déchirent encore le Siq — en 2022, six mois de pluie sont tombés en un jour et mille sept cents touristes ont dû être évacués. Les barrages antiques sont des ruines, témoins muets d'un peuple qui avait compris ce que la plupart des civilisations apprennent trop tard : l'eau n'est pas juste ce qu'on boit. C'est le pouvoir. C'est le secret. C'est ce qui sépare un royaume d'une ruine." }}},
  ]},
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN
// ═══════════════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang:        { S: "de" },
  langStoryId: { S: "de#nabataean-water-wizards" },
  title:       { S: "Die Wassermagier von Petra" },
  subtitle:    { S: "Wie Wüstennomaden das fortschrittlichste Wassersystem der Antike bauten — und es geheim hielten" },
  excerpt:     { S: "Petra bekommt weniger Regen als Teile der Sahara. Und doch bauten die Nabatäer hier vor zweitausend Jahren eine Stadt für dreißigtausend Menschen — mit Brunnen, Becken und Gärten. Sie fanden kein Wasser — sie erschufen es." },
  moralOrLesson: { S: "Die größten Zivilisationen werden nicht auf Eroberung oder Gold gebaut, sondern auf der Beherrschung des Unsichtbaren — und der gefährlichste Reichtum ist nicht der Schatz, den deine Feinde sehen können, sondern die geheime Ressource, die sie niemals finden werden." },
  paragraphs:  { L: [
    { M: { text: { S: "Petra bekommt weniger Regen als Teile der Sahara — gerade mal hundertfünfzig Millimeter im Jahr. Trotzdem bauten die Nabatäer hier vor zweitausend Jahren eine Stadt für dreißigtausend Menschen mit Brunnen, Becken und Gärten. Kein Fluss. Kein See. Mitten in der Wüste. Sie haben Wasser nicht gefunden — sie haben es erfunden, mit Technik so fortschrittlich, dass moderne Wissenschaftler staunten: Die beherrschten die Strömungslehre Jahrhunderte, bevor der Westen ihr einen Namen gab." }}},
    { M: { text: { S: "Ihre erste Waffe war nicht Ingenieurskunst — es war Geheimhaltung. 312 v. Chr. überfiel ein griechisches Heer die Nabatäer. Es gelang, aber die Nabatäer jagten die Angreifer und vernichteten sie. Als ein größeres Heer kam, verschwanden sie in der Wüste. Die Griechen, am Verdursten, bettelten um Frieden und zogen ab. Der Trick? Zisternen, überall in der Wüste vergraben und getarnt, sodass nur sie sie fanden. Die Wüste war nicht ihre Schwäche — sie war ihre Festung." }}},
    { M: { text: { S: "Petras Lebensader war Ain Musa — die Mosesquelle — sieben Kilometer entfernt. Sie leiteten sie durch den Siq, die kilometerlange Schlucht am einzigen Stadtzugang, mit einem Doppelsystem: Kanal im Fels auf der einen Seite, Terrakottarohre mit Präzisionsfugen auf der anderen. Am Eingang lenkte ein Damm die Sturzfluten um. 1963 tötete eine solche Flut zweiundzwanzig Touristen im Siq — Beweis, dass die Nabatäer das Problem zweitausend Jahre früher gelöst hatten." }}},
    { M: { text: { S: "Aber Überleben reichte ihnen nicht — sie wollten angeben. 1998 begann die Archäologin Leigh-Ann Bedal eine Stelle auszugraben, die alte Karten als \u201EUnterer Markt\u201C bezeichneten. Es war kein Markt. Es war ein Paradiesgarten mit einem dreiundvierzig Meter langen Becken und einem Pavillon auf einer Insel, die man nur schwimmend erreichen konnte. Ein See mit Insel — in der Wüste. Jeder römische Beamte hätte die Botschaft verstanden: Wer das hier bauen kann, dem legt man sich besser nicht an." }}},
    { M: { text: { S: "Im Stadtzentrum versorgte ein öffentlicher Brunnen — das Nymphäum — dreißigtausend Einwohner. 2025 entdeckte Niklas Jungmann von der Humboldt-Universität in den Bergen eine Bleileitung von hundertsechzehn Metern, die als umgekehrter Siphon funktionierte: Wasser wurde bergauf gedrückt, bevor es auf der anderen Seite hinabfloss. Ingenieure dachten, das gab es nur in römischen Gebäuden. Die Nabatäer bauten es in offener Wildnis — zweitausend Jahre früher." }}},
    { M: { text: { S: "Als Rom 106 n. Chr. Petra eroberte, taten die Eroberer etwas Beispielloses: Sie behielten das nabatäische System, statt ihr eigenes aufzudrücken. Rom, das seine Technik jedem Gebiet überstülpte, sah Petra und gab zu: Besser geht es nicht. Man sagt, stille Wasser sind tief. Die Nabatäer bewiesen: Stille Wasser sind tiefer als jedes Imperium — zwei Jahrhunderte lang floss ihr System, während Rom nur staunen konnte." }}},
    { M: { text: { S: "Dann kam der 19. Mai 363: ein gewaltiges Erdbeben. Leitungen barsten. Kanäle stürzten ein. Fünf Jahrhunderte Ingenieurskunst — zerstört in Minuten. Man hätte alles wieder aufbauen können, aber die Welt hatte sich verändert. Die Handelsrouten waren aufs Meer gewandert, die Karawanen kamen nicht mehr. Ohne Geld reparierte niemand das System. Ohne Wasser starb Petra. Die Becken füllten sich mit Sand, und die Wüste holte sich zurück, was die Nabatäer ihr gestohlen hatten." }}},
    { M: { text: { S: "Heute reißen Sturzfluten immer noch durch den Siq — 2022 fiel der Regen eines halben Jahres an einem einzigen Tag, und siebzehnhundert Touristen mussten evakuiert werden. Die antiken Dämme sind nur noch Ruinen, stumme Zeugen eines Volkes, das etwas begriffen hatte, was die meisten Zivilisationen zu spät lernen: Wasser ist nicht nur etwas, das man trinkt. Es ist Macht. Es ist Geheimnis. Es ist der Unterschied zwischen einem Königreich und einer Ruine." }}},
  ]},
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════════════

async function pushItem(label, item) {
  console.log(`\n⏳ Pushing ${label}...`);
  try {
    const cmd = new PutItemCommand({ TableName: TABLE, Item: item });
    const res = await client.send(cmd);
    console.log(`✅ ${label} pushed successfully (HTTP ${res.$metadata.httpStatusCode})`);
    return true;
  } catch (err) {
    console.error(`❌ ${label} FAILED:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`Timestamp: ${now}`);
  console.log(`Table: ${TABLE}`);
  console.log(`siteId: petra`);
  console.log(`storyId: nabataean-water-wizards`);

  const results = [];

  // Push sequentially to confirm each before next
  results.push(await pushItem("SPANISH (es#nabataean-water-wizards)", es));
  results.push(await pushItem("FRENCH  (fr#nabataean-water-wizards)", fr));
  results.push(await pushItem("GERMAN  (de#nabataean-water-wizards)", de));

  console.log("\n════════════════════════════════");
  if (results.every(Boolean)) {
    console.log("🎉 All 3 languages pushed successfully!");
  } else {
    console.log("⚠️  Some pushes failed — check above for details.");
  }
}

main();
