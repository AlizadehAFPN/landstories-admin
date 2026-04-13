import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───────────────────────────
const shared = {
  siteId:             { S: "colosseum-rome" },
  storyId:            { S: "naumachia-sea-battles" },
  storyCategory:      { S: "crowns_conquests" },
  icon:               { S: "🚢" },
  tier:               { S: "A" },
  era:                { S: "Flavian Dynasty (80 AD)" },
  readingTimeMinutes: { N: "3" },
  image:              { S: "" },
  thumbnail:          { S: "" },
  disabled:           { BOOL: false },
  hasAudio:           { BOOL: false },
  isFree:             { BOOL: true },
  coordinates:        { M: { lat: { N: "41.8902" }, lng: { N: "12.4922" } } },
  source:             { S: "Martial, De Spectaculis (Liber Spectaculorum); Cassius Dio, Roman History LXVI; Suetonius, Lives of the Caesars" },
  updatedAt:          { N: String(NOW) },
};

// ═══════════════════════════════════════════════════════════════════════
//  SPANISH (es)
//  Proverb subverted: "Roma no se construyó en un día"
//  → "Pero en una sola mañana, Tito demostró que hasta el mar acataba sus órdenes."
// ═══════════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang:        { S: "es" },
  langStoryId: { S: "es#naumachia-sea-battles" },
  title:       { S: "El Coliseo se hizo océano" },
  subtitle:    { S: "Cuando Roma inundó su arena para librar guerras sobre el agua" },
  excerpt:     { S: "Imagínate esto: año 80 después de Cristo, el Coliseo acaba de inaugurarse en Roma y el emperador Tito decide que las peleas de gladiadores no están a la altura del estreno. ¿Su solución? Inundar la arena entera y montar una batalla naval con barcos de guerra reales. Armas afiladas. Muertos de verdad." },
  moralOrLesson: { S: "Los imperios más grandes buscan demostrar su poder no solo sobre las personas, sino sobre la propia naturaleza. Pero incluso los espectáculos más grandiosos acaban siendo imposibles cuando el progreso sigue su curso." },
  characters: { L: [
    { S: "Emperador Tito" },
    { S: "Emperador Domiciano" },
    { S: "Marcial (poeta)" },
    { S: "Dion Casio (historiador)" },
    { S: "Presos condenados" },
  ]},
  paragraphs: { L: [
    { M: { text: { S: "Imagínate esto: año 80 después de Cristo, el Coliseo acaba de inaugurarse en Roma y el emperador Tito decide que las peleas de gladiadores no están a la altura del estreno. ¿Su solución? Inundar la arena entera y montar una batalla naval con barcos de guerra reales. Armas afiladas. Muertos de verdad. Suena a fantasía de Hollywood, pero varios testigos presenciales lo dejaron por escrito y la arqueología moderna ha encontrado la ingeniería que lo hizo posible." }}},
    { M: { text: { S: "Un poeta llamado Marcial estaba entre el público aquel día. Vio todo con sus propios ojos y lo inmortalizó en una colección de poemas sobre los juegos inaugurales. Su mensaje para los que llegaban tarde fue algo así: no os dejéis engañar por el agua, esto era tierra firme esta mañana y lo será otra vez esta noche. Donde los gladiadores habían luchado sobre suelo sólido, ahora chocaban navíos de guerra. La arena pasaba de tierra a mar como si el edificio no supiera qué quería ser." }}},
    { M: { text: { S: "El historiador Dion Casio completó el cuadro. Tito no se conformó con poner un par de barcas a flotar: recreó batallas navales célebres de la historia griega, como Atenas contra Siracusa. Metió caballos y toros entrenados para el agua junto a los barcos. Y los combatientes eran presos condenados a muerte, con espadas reales, obligados a hacer de marineros antiguos. No había coreografía ni trucos. Las armas cortaban de verdad, la gente se ahogaba de verdad, y el agua se teñía de rojo." }}},
    { M: { text: { S: "La ingeniería detrás de todo esto sigue dejando boquiabiertos a los expertos. Bajo la arena, los romanos habían construido una red de canales conectados a los acueductos de la ciudad. Compuertas enormes controlaban el caudal y el suelo estaba sellado con hormigón impermeable para que no se filtrara nada a las salas inferiores. Cuando acababa el espectáculo, un sistema de drenaje vaciaba todo en cuestión de horas. Habían construido un estadio que funcionaba como piscina. Solo que esa piscina servía para matar." }}},
    { M: { text: { S: "Las batallas navales duraron apenas una década. Domiciano, hermano y sucesor de Tito, decidió que el espacio bajo la arena valía más como bastidores permanentes. Construyó un laberinto subterráneo de túneles, jaulas para animales y ascensores mecánicos — las mismas ruinas que hoy puedes ver si visitas el Coliseo. Con aquellos suelos de madera y toda esa maquinaria instalada, inundar la arena se volvió imposible. Así, sin más, el espectáculo más grandioso de Roma desapareció para siempre." }}},
    { M: { text: { S: "Pero lo que de verdad te atrapa es el porqué. Los romanos llamaban al Mediterráneo «Mare Nostrum» — Nuestro Mar. Al meter el océano dentro de su edificio más imponente, los emperadores decían algo imposible de ignorar: no solo mandamos en la tierra, también el agua nos obedece. Dicen que Roma no se construyó en un día. Pero en una sola mañana, Tito demostró que hasta el mar acataba sus órdenes. Para cincuenta mil espectadores, el mensaje fue un puñetazo: no existía nada fuera del alcance de Roma." }}},
  ]},
};

// ═══════════════════════════════════════════════════════════════════════
//  FRENCH (fr)
//  Proverb subverted: "Impossible n'est pas français"
//  → "Deux mille ans plus tôt, Titus avait prouvé qu'impossible n'était pas romain."
// ═══════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang:        { S: "fr" },
  langStoryId: { S: "fr#naumachia-sea-battles" },
  title:       { S: "Le jour où le Colisée prit la mer" },
  subtitle:    { S: "Quand Rome inonda son arène pour y mener de vraies batailles navales" },
  excerpt:     { S: "Imaginez la scène : nous sommes en 80 après Jésus-Christ, le Colisée vient tout juste d'ouvrir ses portes, et l'empereur Titus décide que les combats de gladiateurs ne sont pas à la hauteur de l'événement. Sa réponse ? Inonder l'arène tout entière et y organiser une bataille navale grandeur nature. De vrais navires de guerre. De vraies armes. De vrais morts." },
  moralOrLesson: { S: "Les plus grands empires cherchent à démontrer leur pouvoir non seulement sur les hommes, mais sur la nature elle-même — pourtant, même les spectacles les plus grandioses finissent par céder devant la marche du progrès." },
  characters: { L: [
    { S: "Empereur Titus" },
    { S: "Empereur Domitien" },
    { S: "Martial (poète)" },
    { S: "Cassius Dion (historien)" },
    { S: "Condamnés à mort" },
  ]},
  paragraphs: { L: [
    { M: { text: { S: "Imaginez la scène : nous sommes en 80 après Jésus-Christ, le Colisée vient tout juste d'ouvrir ses portes, et l'empereur Titus décide que les combats de gladiateurs ne sont pas à la hauteur de l'événement. Sa réponse ? Inonder l'arène tout entière et y organiser une bataille navale grandeur nature. De vrais navires de guerre. De vraies armes. De vrais morts. Ça ressemble à du délire, mais plusieurs témoins l'ont raconté par écrit, et les archéologues modernes ont retrouvé le système qui rendait la chose possible." }}},
    { M: { text: { S: "Un poète du nom de Martial était dans les gradins ce jour-là. Il a tout vu et l'a immortalisé dans un recueil sur les jeux inauguraux. Son message aux retardataires tenait en une phrase : ne vous fiez pas à l'océan, c'était de la terre ferme ce matin et ça le redeviendra ce soir. Là où des gladiateurs s'étaient battus sur un sol dur quelques heures plus tôt, des navires s'entrechoquaient. L'arène basculait entre terre et mer comme si le bâtiment lui-même hésitait sur sa nature." }}},
    { M: { text: { S: "L'historien Cassius Dion a fourni les détails qui glacent le sang. Titus ne s'était pas contenté de mettre deux bateaux à flot — il avait reconstitué de célèbres batailles navales grecques, comme Athènes contre Syracuse. Des chevaux et des taureaux dressés pour l'eau accompagnaient les navires. Quant aux combattants, c'étaient des condamnés à mort, armés d'épées bien réelles, forcés de jouer les marins de l'Antiquité. Pas de cascade, pas de filet de sécurité. Les lames tranchaient, les hommes se noyaient, et l'eau virait au rouge." }}},
    { M: { text: { S: "Le génie technique derrière tout ça laisse encore les experts sans voix. Sous l'arène, les Romains avaient bâti un réseau de canaux reliés aux aqueducs de la ville. D'immenses vannes contrôlaient le débit, et le sol était scellé avec du béton étanche pour que rien ne filtre vers les salles en dessous. Une fois le spectacle terminé, un système de drainage vidait tout en quelques heures. Ils avaient construit un stade qui servait aussi de piscine. Sauf que dans cette piscine-là, on venait mourir." }}},
    { M: { text: { S: "Les batailles navales n'ont duré qu'une dizaine d'années. Domitien, frère et successeur de Titus, a jugé que l'espace sous l'arène valait mieux en coulisses permanentes. Il y a fait construire un labyrinthe de tunnels, de cages à bêtes et d'ascenseurs mécaniques — les ruines que l'on visite aujourd'hui au Colisée. Une fois ces structures en place, avec leurs planchers en bois et toute cette machinerie, inonder l'arène est devenu impossible. Le spectacle le plus fou de l'histoire romaine a disparu pour toujours." }}},
    { M: { text: { S: "Mais ce qui reste, c'est le message. Les Romains appelaient la Méditerranée «Mare Nostrum» — Notre Mer. En traînant l'océan dans leur plus grand monument, les empereurs disaient une chose impossible à ignorer : nous ne régnons pas seulement sur la terre, nous commandons les eaux. On dit qu'impossible n'est pas français. Deux mille ans plus tôt, Titus avait prouvé qu'impossible n'était pas romain. Pour cinquante mille spectateurs voyant des navires s'écraser au cœur de leur ville, le message était limpide : rien au monde n'échappait à Rome." }}},
  ]},
};

// ═══════════════════════════════════════════════════════════════════════
//  GERMAN (de)
//  Proverb subverted: "Was nicht passt, wird passend gemacht"
//  → "Die Römer machten das Meer passend für ein Stadion."
// ═══════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang:        { S: "de" },
  langStoryId: { S: "de#naumachia-sea-battles" },
  title:       { S: "Als das Kolosseum zum Meer wurde" },
  subtitle:    { S: "Wie Rom seine Arena flutete, um echte Seeschlachten auszutragen" },
  excerpt:     { S: "Stellt euch das vor: Wir schreiben das Jahr 80 nach Christus, das nagelneue Kolosseum in Rom hat gerade eröffnet, und Kaiser Titus entscheidet, dass Gladiatorenkämpfe für die Eröffnungsnacht nicht spektakulär genug sind. Seine Lösung? Die gesamte Arena fluten und eine echte Seeschlacht darin austragen. Echte Kriegsschiffe. Echte Waffen. Echte Tote." },
  moralOrLesson: { S: "Die mächtigsten Reiche streben danach, ihre Macht nicht nur über Menschen, sondern über die Natur selbst zu demonstrieren — doch selbst die gewaltigsten Spektakel werden irgendwann vom Fortschritt unmöglich gemacht." },
  characters: { L: [
    { S: "Kaiser Titus" },
    { S: "Kaiser Domitian" },
    { S: "Martial (Dichter)" },
    { S: "Cassius Dio (Historiker)" },
    { S: "Zum Tode Verurteilte" },
  ]},
  paragraphs: { L: [
    { M: { text: { S: "Stellt euch das vor: Wir schreiben das Jahr 80 nach Christus, das nagelneue Kolosseum in Rom hat gerade eröffnet, und Kaiser Titus entscheidet, dass Gladiatorenkämpfe für die Eröffnungsnacht nicht spektakulär genug sind. Seine Lösung? Die gesamte Arena fluten und eine echte Seeschlacht darin austragen. Echte Kriegsschiffe. Echte Waffen. Echte Tote. Klingt nach Größenwahn — aber mehrere Augenzeugen haben es schriftlich festgehalten, und moderne Archäologen haben die Technik gefunden, die es möglich machte." }}},
    { M: { text: { S: "Ein Dichter namens Martial saß an jenem Tag im Publikum. Er hat alles mit eigenen Augen gesehen und in einer Gedichtsammlung über die Eröffnungsspiele verewigt. Seine Botschaft an Nachzügler war sinngemäß: Lasst euch vom Meer nicht täuschen — heute Morgen war hier noch trockener Boden, und heute Abend wird er es wieder sein. Wo Gladiatoren Stunden zuvor auf festem Grund gekämpft hatten, krachten jetzt Kriegsschiffe ineinander. Die Arena wechselte zwischen Land und See, als könnte sich das Gebäude selbst nicht entscheiden." }}},
    { M: { text: { S: "Der Historiker Cassius Dio lieferte die Details, die einem den Atem nehmen. Titus hatte nicht einfach ein paar Boote aufs Wasser gesetzt — er stellte berühmte griechische Seeschlachten nach, wie Athen gegen Syrakus. Pferde und Stiere, für den Wassereinsatz trainiert, begleiteten die Schiffe. Und die Kämpfer? Zum Tode verurteilte Gefangene, mit echten Schwertern bewaffnet, gezwungen, antike Seeleute zu spielen. Kein Showkampf, kein Sicherheitsnetz. Die Klingen waren scharf, das Ertrinken real, und das Wasser färbte sich rot." }}},
    { M: { text: { S: "Die Technik dahinter versetzt bis heute Experten in Staunen. Unter der Arena hatten die Römer ein Netz aus Wasserkanälen gebaut, die an die Aquädukte der Stadt angeschlossen waren. Riesige Schleusen kontrollierten den Zufluss, und der Boden war mit wasserdichtem Beton versiegelt, damit nichts in die Räume darunter sickerte. Nach der Vorstellung konnte ein Drainagesystem die gesamte Arena in wenigen Stunden leeren. Was nicht passt, wird passend gemacht — und die Römer machten das Meer passend für ein Stadion." }}},
    { M: { text: { S: "Die Seeschlachten dauerten nur etwa ein Jahrzehnt. Domitian, Bruder und Nachfolger von Titus, entschied, dass der Platz unter der Arena als feste Kulisse wertvoller war. Er baute ein unterirdisches Labyrinth aus Tunneln, Tierkäfigen und mechanischen Aufzügen — dieselben Ruinen, die man heute noch im Kolosseum besichtigen kann. Sobald das stand, mit seinen Holzböden und der ganzen Maschinerie, war eine Flutung unmöglich. Einfach so verschwand die spektakulärste Show der römischen Geschichte für immer." }}},
    { M: { text: { S: "Aber was diese Geschichte wirklich unvergesslich macht, ist die Botschaft dahinter. Die Römer nannten das Mittelmeer «Mare Nostrum» — Unser Meer. Indem sie den Ozean in ihr größtes Bauwerk zerrten, sendeten die Kaiser eine Nachricht, die niemand überhören konnte: Wir herrschen nicht nur über das Land, wir befehlen auch dem Wasser. Für die fünfzigtausend Zuschauer, die Kriegsschiffe mitten in ihrer Stadt aufeinanderprallen sahen, traf diese Botschaft wie ein Faustschlag: Es gab nichts auf der Welt, das Rom nicht kontrollieren konnte." }}},
  ]},
};

// ─── Push helper ──────────────────────────────────────────────────────
async function pushStory(label, item) {
  console.log(`\n▸ Pushing ${label}...`);

  // Validate paragraph count
  const pCount = item.paragraphs.L.length;
  if (pCount < 6 || pCount > 10) {
    throw new Error(`${label}: paragraph count ${pCount} outside 6-10 range`);
  }

  // Validate total character count (~3000 ±20%)
  const totalChars = item.paragraphs.L.reduce((sum, p) => sum + p.M.text.S.length, 0);
  if (totalChars < 2400 || totalChars > 3600) {
    console.warn(`  ⚠ ${label}: total chars = ${totalChars} (target ~3000 ±20%)`);
  } else {
    console.log(`  ✓ Total characters: ${totalChars}`);
  }

  // Validate individual paragraph lengths
  item.paragraphs.L.forEach((p, i) => {
    const chars = p.M.text.S.length;
    const words = p.M.text.S.split(/\s+/).length;
    if (chars > 500) console.warn(`  ⚠ P${i+1}: ${chars} chars (max 500)`);
    if (words > 100) console.warn(`  ⚠ P${i+1}: ${words} words (max 100)`);
    console.log(`  P${i+1}: ${chars} chars, ${words} words`);
  });

  const cmd = new PutItemCommand({ TableName: TABLE, Item: item });
  const result = await client.send(cmd);
  console.log(`  ✓ ${label} pushed successfully (HTTP ${result.$metadata.httpStatusCode})`);
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  Naumachia — Pushing es, fr, de to DynamoDB");
  console.log("═══════════════════════════════════════════════");

  await pushStory("SPANISH (es)", es);
  await pushStory("FRENCH (fr)",  fr);
  await pushStory("GERMAN (de)",  de);

  console.log("\n══════════════════════════════════════");
  console.log("  ✓ All 3 languages pushed successfully");
  console.log("══════════════════════════════════════\n");
}

main().catch(err => {
  console.error("✗ FAILED:", err.message);
  process.exit(1);
});
