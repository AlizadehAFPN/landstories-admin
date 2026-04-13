import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const client = new DynamoDBClient({ region: process.env.AWS_REGION ?? "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";
const now = Math.floor(Date.now() / 1000);

// ── Shared fields (unchanged from English) ──────────────────────────
const shared = {
  siteId: "cologne-cathedral",
  storyId: "shrine-of-the-three-magi",
  icon: "\u{1F451}",
  tier: "A",
  source: "Cardini, Franco. The Three Magi: History and Legend; Wolff, Arnold. The Cologne Cathedral; Kessel, Johann Hubert. Antiquitates Colonienses, 1863",
  characters: [
    "Rainald von Dassel (Archbishop of Cologne)",
    "Emperor Frederick Barbarossa",
    "Nicholas of Verdun (goldsmith)",
    "The Three Magi (Caspar, Melchior, Balthasar)",
    "Empress Helena",
  ],
  era: "12th-13th century (1164-1225)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 50.9413, lng: 6.9583 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════
// SPANISH
// ═══════════════════════════════════════════════════════════════════════
// Proverb: "No hay mal que dure cien años" — subverted: Milan waited eight hundred.
// Register: skilled modern storyteller, popular nonfiction / high-quality podcast voice.

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#shrine-of-the-three-magi",
  title: "El robo de los Reyes Magos",
  subtitle: "Cómo unos huesos robados en Milán convirtieron a Colonia en la capital de peregrinaciones del norte de Europa",
  excerpt: "En 1164, una columna de jinetes armados sacó un cofre dorado de Milán, lo arrastró por los Alpes y lo bajó por el Rin hasta Colonia. Al frente iba Rainaldo de Dassel, arzobispo de Colonia y mano derecha del emperador Federico Barbarroja.",
  moralOrLesson: "Los tesoros más sagrados suelen nacer del saqueo. Y una ciudad que levantó su santidad sobre huesos robados no puede escapar de esa verdad.",
  paragraphs: [
    {
      text: "En 1164, una columna de jinetes armados sacó un cofre dorado de Milán, lo arrastró por los Alpes y lo bajó por el Rin hasta Colonia. Al frente iba Rainaldo de Dassel, arzobispo de Colonia y mano derecha del emperador Federico Barbarroja. Dentro del cofre, aseguraba Rainaldo, viajaban los restos de los Reyes Magos: aquellos tres sabios de Oriente que siguieron una estrella hasta Belén y le llevaron oro, incienso y mirra al niño Jesús.",
    },
    {
      text: "¿Y cómo habían llegado los restos de tres sabios de Oriente Medio a una iglesia italiana? Eso hay que buscarlo en el siglo IV, cuando la emperatriz Helena — madre de Constantino, el primer emperador romano cristiano — se dedicó a recorrer el mundo antiguo coleccionando reliquias sagradas. Encontró los restos de los Magos en Persia y los envió a Constantinopla. De ahí acabaron en Milán, en la iglesia de Sant'Eustorgio, donde llevaban casi ochocientos años. Nadie los había tocado. Hasta que apareció Barbarroja.",
    },
    {
      text: "Milán llevaba años plantándole cara al emperador. En 1162, tras un asedio de dos años, el ejército de Barbarroja tomó la ciudad. Y no se conformó con vencerla: la arrasó entera. Muros derribados. Edificios convertidos en escombros. Vecinos expulsados. Un aviso brutal para cada ciudad del norte de Italia: no te metas con el emperador. Y como golpe de gracia, Rainaldo se llevó lo más sagrado que tenía Milán — los huesos de los Tres Reyes — y se los cargó camino de Colonia. Fue el mayor robo de reliquias de la Edad Media.",
    },
    {
      text: "El efecto fue fulminante. Peregrinos de toda Europa se lanzaron a Colonia. La catedral vieja se quedó pequeña, así que levantaron una nueva — la catedral gótica que sigue en pie — construida para una sola cosa: custodiar esos huesos. Para el relicario contrataron a Nicolás de Verdún, el mejor orfebre de su tiempo. Hacia 1225 había terminado el relicario de oro más grande del mundo occidental: un cofre de plata y cobre dorados, de más de dos metros, con más de mil piedras preciosas y figuras de profetas, apóstoles y reyes.",
    },
    {
      text: "Los huesos robados hicieron rica a Colonia. Los peregrinos necesitaban camas, comida, recuerdos. La ciudad puso tres coronas doradas en su escudo. La Epifanía — el día en que los cristianos celebran la visita de los Magos al niño Jesús — se convirtió en la gran fiesta de la ciudad. Toda la identidad de Colonia se construyó sobre esos restos: huesos arrebatados a una ciudad vencida por un político sin escrúpulos, metidos en un cofre de oro y venerados por millones. La ciudad más santa del norte de Europa debía su gloria al mayor robo que había cometido.",
    },
    {
      text: "Dicen que no hay mal que dure cien años. Milán esperó ocho. Ocho siglos reclamando sus reliquias. En 1903, el arzobispo de Milán consiguió que Colonia devolviera unos pocos fragmentos de hueso. Volvieron a Sant'Eustorgio, donde siguen hoy. Pero el grueso del tesoro nunca se movió. Sigue dentro del relicario de Nicolás de Verdún, tras el altar de la catedral que se levantó para protegerlo. Ocho siglos después, los huesos robados de tres reyes legendarios siguen atrayendo fieles hasta el Rin.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// FRENCH
// ═══════════════════════════════════════════════════════════════════════
// Proverb: "Bien mal acquis ne profite jamais" — subverted: Cologne proves otherwise.
// Register: présent de narration, quality documentary / podcast storytelling.

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#shrine-of-the-three-magi",
  title: "Le vol des Rois Mages",
  subtitle: "Comment des ossements volés à Milan ont fait de Cologne la capitale des pèlerinages du nord de l'Europe",
  excerpt: "En 1164, une colonne de cavaliers armés sort de Milan avec un coffre en or, traverse les Alpes et descend le Rhin jusqu'à Cologne. À leur tête : Rainald von Dassel, archevêque de Cologne et bras droit de l'empereur Frédéric Barberousse.",
  moralOrLesson: "Les plus grands trésors de la foi sont souvent des butins de guerre — et une ville qui a bâti sa sainteté sur des os volés ne peut jamais vraiment l'oublier.",
  paragraphs: [
    {
      text: "En 1164, une colonne de cavaliers armés sort de Milan avec un coffre en or, traverse les Alpes et descend le Rhin jusqu'à Cologne. À leur tête : Rainald von Dassel, archevêque de Cologne et bras droit de l'empereur Frédéric Barberousse. Dans ce coffre, affirme Rainald, reposent les ossements des Rois Mages — ces trois sages d'Orient qui, selon l'Évangile, ont suivi une étoile jusqu'à Bethléem pour offrir or, encens et myrrhe à l'enfant Jésus.",
    },
    {
      text: "Comment les ossements de trois sages du Moyen-Orient se sont-ils retrouvés en Italie ? Il faut remonter au IVe siècle, quand l'impératrice Hélène — mère de Constantin, l'empereur romain qui a légalisé le christianisme — parcourait le monde antique à la recherche de reliques sacrées. Elle aurait retrouvé les restes des Mages en Perse et les aurait expédiés à Constantinople. De là, ils ont atterri à Milan, dans l'église Sant'Eustorgio, où ils sont restés près de huit cents ans. Personne n'y a touché. Jusqu'à l'arrivée de Barberousse.",
    },
    {
      text: "Milan défiait l'empereur depuis des années. En 1162, après deux ans de siège, l'armée de Barberousse prend la ville. Et il ne se contente pas de la conquérir : il la rase. Murailles abattues. Bâtiments aplatis. Habitants chassés. Un message pour chaque ville du nord de l'Italie : ne défiez pas l'empereur. Et l'humiliation finale ? Rainald s'empare du trésor le plus sacré de Milan — les ossements des Trois Rois — et les emporte vers le nord, à Cologne. C'est le plus grand vol de reliques du Moyen Âge.",
    },
    {
      text: "L'effet est immédiat. Les pèlerins affluent de toute l'Europe. L'ancienne cathédrale ne suffit plus, alors on en construit une nouvelle — la cathédrale gothique qui se dresse encore aujourd'hui — conçue pour abriter ces ossements. On fait appel à un maître orfèvre, Nicolas de Verdun. Vers 1225, il achève le plus grand reliquaire en or du monde occidental : un coffre d'argent et de cuivre dorés, long de plus de deux mètres, incrusté de plus de mille pierres précieuses et orné de figures de prophètes, d'apôtres et de rois.",
    },
    {
      text: "Les os volés rendent Cologne riche. Les pèlerins ont besoin de lits, de repas, de souvenirs. La ville place trois couronnes d'or sur ses armoiries. L'Épiphanie — le jour où les chrétiens célèbrent la visite des Mages à l'enfant Jésus — devient la plus grande fête de la ville. Toute l'identité de Cologne repose sur ces restes : des os arrachés à une cité vaincue par un politicien impitoyable, enfermés dans un coffre d'or et vénérés par des millions de fidèles.",
    },
    {
      text: "On dit que bien mal acquis ne profite jamais. Cologne prouve le contraire depuis huit siècles. Milan n'a jamais digéré ce vol. Pendant huit cents ans, la ville a réclamé ses reliques. En 1903, l'archevêque de Milan a finalement obtenu que Cologne restitue quelques fragments d'os. Ils sont retournés à Sant'Eustorgio, où ils se trouvent encore. Mais l'essentiel n'a jamais bougé. Les ossements reposent toujours dans le reliquaire de Nicolas de Verdun, derrière l'autel de la cathédrale bâtie pour les protéger. Huit siècles plus tard, les os volés de trois rois légendaires attirent toujours les fidèles au bord du Rhin.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// GERMAN
// ═══════════════════════════════════════════════════════════════════════
// Proverb: "Aller guten Dinge sind drei" — subverted with "mitgehen lassen" (colloquial for stealing).
// Register: quality Spiegel Geschichte / podcast narration, historisches Präsens.

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#shrine-of-the-three-magi",
  title: "Kölns heiliger Raub",
  subtitle: "Wie gestohlene Gebeine aus Mailand Köln zur Pilgerhauptstadt des Nordens machten",
  excerpt: "Im Jahr 1164 schleppt ein bewaffneter Reitertrupp eine goldene Truhe aus Mailand, über die Alpen und den Rhein hinunter nach Köln. Angeführt wird der Zug von Rainald von Dassel, Erzbischof von Köln und rechte Hand von Kaiser Friedrich Barbarossa.",
  moralOrLesson: "Die größten Schätze des Glaubens sind oft nichts als Kriegsbeute — und eine Stadt, die ihre Heiligkeit auf gestohlenen Gebeinen errichtet hat, wird diese Wahrheit nie ganz los.",
  paragraphs: [
    {
      text: "Im Jahr 1164 schleppt ein bewaffneter Reitertrupp eine goldene Truhe aus Mailand, über die Alpen und den Rhein hinunter nach Köln. Angeführt wird der Zug von Rainald von Dassel, Erzbischof von Köln und rechte Hand von Kaiser Friedrich Barbarossa. In der Truhe, so behauptet Rainald, liegen die Gebeine der Heiligen Drei Könige — jener Weisen aus dem Morgenland, die laut der Weihnachtsgeschichte einem Stern nach Bethlehem folgten und dem neugeborenen Jesus Gold, Weihrauch und Myrrhe brachten.",
    },
    {
      text: "Aber wie waren die Überreste dreier orientalischer Gelehrter überhaupt nach Italien gelangt? Dafür muss man ins 4. Jahrhundert zurückgehen, als Kaiserin Helena — die Mutter Konstantins, des ersten christlichen römischen Kaisers — durch die antike Welt reiste und heilige Reliquien sammelte. Sie soll die Gebeine der Magier in Persien gefunden und nach Konstantinopel geschickt haben. Von dort gelangten sie nach Mailand, in die Kirche Sant'Eustorgio, wo sie rund achthundert Jahre lagen. Niemand rührte sie an — bis Barbarossa kam.",
    },
    {
      text: "Mailand hatte sich jahrelang gegen den Kaiser aufgelehnt. 1162, nach zweijähriger Belagerung, nahm Barbarossas Heer die Stadt ein. Und er begnügte sich nicht damit, sie zu besiegen — er machte sie dem Erdboden gleich. Mauern niedergerissen. Gebäude geschleift. Einwohner vertrieben. Eine brutale Warnung an jede Stadt in Norditalien: Legt euch nicht mit dem Kaiser an. Und als letzte Demütigung griff sich Rainald Mailands heiligstes Gut — die Gebeine der Drei Könige — und schleppte sie nach Köln. Es war der größte Reliquienraub des Mittelalters.",
    },
    {
      text: "Die Wirkung war sofort spürbar. Pilger strömten aus ganz Europa nach Köln. Der alte Dom reichte nicht mehr aus, also plante man einen neuen — den gotischen Dom, der bis heute steht — gebaut für einen einzigen Zweck: diese Gebeine zu beherbergen. Für den Schrein holte man den besten Goldschmied der Zeit, Nikolaus von Verdun. Um 1225 hatte er den größten goldenen Schrein der westlichen Welt vollendet: eine Truhe aus vergoldetem Silber und Kupfer, über zwei Meter lang, besetzt mit mehr als tausend Edelsteinen und goldenen Figuren von Propheten, Aposteln und Königen.",
    },
    {
      text: "Aller guten Dinge sind drei, heißt es. Köln hat das wörtlich genommen — und drei davon aus Mailand mitgehen lassen. Die gestohlenen Gebeine machten die Stadt reich. Pilger brauchten Betten, Mahlzeiten, Andenken. Die Stadt setzte drei goldene Kronen in ihr Wappen. Der Dreikönigstag wurde zum größten Feiertag der Stadt. Kölns gesamte Identität gründete auf diesen Überresten: Knochen, die einer besiegten Stadt von einem skrupellosen Politiker entrissen, in Gold gesperrt und von Millionen verehrt wurden.",
    },
    {
      text: "Mailand hat das nie verwunden. Achthundert Jahre lang forderte die Stadt ihre Reliquien zurück. Erst 1903 konnte der Erzbischof von Mailand Köln dazu bewegen, einige wenige Knochenfragmente herauszugeben. Sie kehrten nach Sant'Eustorgio zurück, wo sie noch heute liegen. Aber der Großteil blieb, wo er war — im goldenen Schrein des Nikolaus von Verdun, hinter dem Altar des Doms, der eigens dafür erbaut wurde. Achthundert Jahre später ziehen die gestohlenen Gebeine dreier legendärer Könige noch immer Gläubige an den Rhein.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PUSH SEQUENTIALLY
// ═══════════════════════════════════════════════════════════════════════

const versions = [
  { label: "SPANISH (es)", data: es },
  { label: "FRENCH (fr)", data: fr },
  { label: "GERMAN (de)", data: de },
];

for (const { label, data } of versions) {
  console.log(`\n── Pushing ${label} ──`);
  console.log(`   langStoryId: ${data.langStoryId}`);
  console.log(`   title: ${data.title}`);
  console.log(`   paragraphs: ${data.paragraphs.length}`);

  try {
    const result = await docClient.send(
      new PutCommand({ TableName: TABLE, Item: data })
    );
    console.log(`   ✓ SUCCESS — HTTP ${result.$metadata.httpStatusCode}`);
  } catch (err) {
    console.error(`   ✗ FAILED — ${err.message}`);
    process.exit(1);
  }
}

console.log("\n══ All 3 language versions pushed successfully ══\n");
