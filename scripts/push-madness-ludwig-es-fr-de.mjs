import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "neuschwanstein-castle",
  storyId: "madness-of-king-ludwig",
  icon: "\u{1F451}",
  tier: "S",
  source:
    "McIntosh, Christopher. The Swan King: Ludwig II of Bavaria, 2012; Blunt, Wilfrid. The Dream King, 1970; Bavarian State Archives",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "lost_found",
  coordinates: { lat: 47.5576, lng: 10.7498 },
  updatedAt: now,
};

// ═══════════════════════════════════════════════
//  SPANISH (es)
// ═══════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#madness-of-king-ludwig",
  title: "La locura de un rey soñador",
  subtitle:
    "Un rey que eligió la belleza sobre el poder y construyó cuentos de hadas en piedra hasta que su propio reino se lo llevó",
  excerpt:
    "Ludwig tenía dieciocho años cuando lo coronaron rey de Baviera en 1864. Alto, moreno y sin el menor interés en gobernar. Lo suyo era la música. Le escribió a Richard Wagner una carta que parecía una declaración de amor, y así empezó una de las obsesiones más temerarias y hermosas de la historia.",
  characters: [
    "Luis II de Baviera",
    "Richard Wagner",
    "Ministros bávaros",
    "Dr. Bernhard von Gudden",
  ],
  era: "Siglo XIX (1864-1886)",
  moralOrLesson:
    "El mundo castiga a quienes eligen la belleza sobre el poder, pero sus creaciones sobreviven a todos los tronos que los juzgaron indignos de gobernar.",
  paragraphs: [
    {
      text: "Ludwig tenía dieciocho años cuando lo coronaron rey de Baviera en 1864. Alto, moreno y sin el menor interés en gobernar. Lo suyo era la música. Semanas después de la coronación, le escribió a Richard Wagner una carta que parecía una declaración de amor: «Quiero librarle para siempre del peso del trabajo. Usted es un dios para mí». Tenía dieciocho años. Wagner, cincuenta y uno. Fue el comienzo de una de las obsesiones más temerarias y hermosas de la historia.",
    },
    {
      text: "Ludwig vació las arcas de Baviera en el genio de Wagner. Le pagó todas las deudas, financió el teatro de Bayreuth —un sueño que el compositor arrastraba desde hacía décadas— y encargó funciones de ópera privadas para un público de uno: él solo, en un teatro a oscuras en Múnich, llorando con la música. Los políticos lo obligaron a echar a Wagner de la ciudad. Pero la devoción de Ludwig no se inmutó. El rey que no se molestaba en gobernar movía cielo y tierra por una partitura.",
    },
    {
      text: "Cuando el mundo real le falló, Ludwig construyó el suyo. Tres castillos de fantasía, cada uno más delirante que el anterior. Linderhof tenía una gruta subterránea donde flotaba en un bote dorado sobre un lago escondido mientras la música de Wagner rebotaba en las paredes de roca. Herrenchiemsee era una réplica de Versalles levantada en una isla, con un Salón de los Espejos más largo que el original. Y Neuschwanstein —colgado de un acantilado en los Alpes— era un castillo entero diseñado como escenario para las óperas de Wagner.",
    },
    {
      text: "Su comportamiento se volvía más extraño cada año. Invirtió el día y la noche: recorría los bosques en trineos dorados a las tres de la madrugada, iluminado por antorchas. Ponía la mesa para invitados que no existían —reyes franceses muertos como Luis XIV y María Antonieta— y hablaba con sus sillas vacías durante toda la cena. Dibujó planos para una máquina voladora y un castillo sobre una columna de roca al que solo se podría llegar en globo. Ninguno se construyó jamás.",
    },
    {
      text: "El 8 de junio de 1886, cuatro psiquiatras que jamás lo habían examinado en persona lo declararon demente. Dos días después, un grupo de funcionarios llegó a Neuschwanstein para arrestarlo. Sus guardias rechazaron al primer grupo, y durante unas horas frenéticas el rey defendió su castillo como un personaje de sus propias leyendas. El segundo intento tuvo éxito. Le quitaron la corona y lo llevaron al castillo de Berg, junto al lago Starnberg. El hombre que construía cuentos de hadas era ahora un prisionero.",
    },
    {
      text: "Tres días después, el 13 de junio, Ludwig y su psiquiatra, el doctor Bernhard von Gudden, salieron a caminar junto al lago al caer la tarde. Ninguno de los dos volvió. Encontraron sus cuerpos en aguas poco profundas esa misma noche. Ludwig tenía cuarenta años. El veredicto oficial fue ahogamiento, pero el agua donde lo hallaron apenas le llegaba a la cintura y Ludwig era un nadador experto. Nadie ha logrado explicar qué pasó realmente. El misterio lleva más de un siglo sin resolverse.",
    },
    {
      text: "Hoy, millón y medio de personas visitan Neuschwanstein cada año. Walt Disney lo vio y creó a su imagen el Castillo de la Bella Durmiente en Disneyland. Dicen que de poeta y de loco todos tenemos un poco — Ludwig lo tenía todo, y por eso ganó. Sus ministros cayeron en el olvido. Su gobierno es una nota al pie. Pero el sueño que intentaron destruir sigue en pie en aquel acantilado de los Alpes. Lo llamaron loco por elegir la belleza sobre el poder. El mundo terminó dándole la razón.",
    },
  ],
};

// ═══════════════════════════════════════════════
//  FRENCH (fr)
// ═══════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#madness-of-king-ludwig",
  title: "La folie du roi Ludwig",
  subtitle:
    "Un roi qui a choisi la beauté plutôt que le pouvoir et bâti des contes de fées en pierre, jusqu\u2019à ce que son royaume le lui fasse payer",
  excerpt:
    "Ludwig a dix-huit ans quand on le fait roi de Bavière, en 1864. Grand, brun, et totalement indifférent au pouvoir. Ce qui l\u2019intéresse, c\u2019est la musique. Il envoie à Richard Wagner une lettre qui ressemble à une déclaration d\u2019amour, et c\u2019est le début de l\u2019une des obsessions les plus folles et les plus belles de l\u2019histoire.",
  characters: [
    "Louis II de Bavière",
    "Richard Wagner",
    "Ministres bavarois",
    "Dr. Bernhard von Gudden",
  ],
  era: "XIXe siècle (1864-1886)",
  moralOrLesson:
    "Le monde punit ceux qui choisissent la beauté plutôt que le pouvoir — mais leurs créations survivent à tous les trônes qui les ont jugés indignes de régner.",
  paragraphs: [
    {
      text: "Ludwig a dix-huit ans quand on le fait roi de Bavière, en 1864. Grand, brun, et totalement indifférent au pouvoir. Ce qui l\u2019intéresse, c\u2019est la musique. Quelques semaines après le couronnement, il envoie au compositeur Richard Wagner une lettre qui ressemble à une déclaration d\u2019amour : \u00AB\u00A0Je veux vous libérer à jamais du poids du quotidien. Vous êtes un dieu pour moi.\u00A0\u00BB Il a dix-huit ans. Wagner en a cinquante et un. C\u2019est le début de l\u2019une des obsessions les plus téméraires et les plus belles de l\u2019histoire.",
    },
    {
      text: "Ludwig vide les caisses de la Bavière au profit du génie de Wagner. Il éponge toutes ses dettes, finance le Festspielhaus de Bayreuth \u2014 un rêve que le compositeur porte en lui depuis des décennies \u2014 et commande des représentations d\u2019opéra privées pour un public d\u2019une seule personne : lui, seul dans un théâtre plongé dans le noir à Munich, en larmes devant la musique. Les politiques sont furieux. Ils chassent Wagner de la ville. Mais la dévotion de Ludwig ne vacille pas. Le roi qui ne daigne pas gouverner remue ciel et terre pour une partition.",
    },
    {
      text: "Quand le monde réel le déçoit, Ludwig bâtit le sien. Trois châteaux féeriques, chacun plus extravagant que le précédent. Linderhof cache une grotte souterraine où il glisse dans une barque dorée sur un lac secret, bercé par la musique de Wagner. Herrenchiemsee est une réplique de Versailles construite sur une île, sa galerie des Glaces plus longue que l\u2019originale. Et Neuschwanstein \u2014 perché sur une falaise dans les Alpes \u2014 est un château entier conçu comme un décor pour les opéras de Wagner.",
    },
    {
      text: "Son comportement devient de plus en plus étrange. Il inverse le jour et la nuit, sillonne les forêts dans des traîneaux dorés à trois heures du matin, escorté de flambeaux. Il dresse des couverts pour des convives qui n\u2019existent pas \u2014 des souverains français disparus comme Louis\u00A0XIV et Marie-Antoinette \u2014 et leur parle à travers les chaises vides pendant tout le repas. Il dessine les plans d\u2019une machine volante et d\u2019un château posé sur un pilier de roche, accessible uniquement en montgolfière. Ni l\u2019un ni l\u2019autre ne verra le jour.",
    },
    {
      text: "Le 8 juin 1886, quatre psychiatres qui ne l\u2019ont jamais examiné en personne le déclarent aliéné. Deux jours plus tard, des officiels se présentent à Neuschwanstein pour l\u2019arrêter. Ses gardes repoussent le premier groupe, et pendant quelques heures fiévreuses, le roi défend son château comme un personnage sorti de ses propres légendes. La deuxième tentative réussit. On lui retire la couronne et on le transfère au château de Berg, au bord du lac de Starnberg. L\u2019homme qui bâtissait des rêves est désormais prisonnier.",
    },
    {
      text: "Trois jours plus tard, le 13 juin, Ludwig et son psychiatre, le docteur Bernhard von Gudden, partent marcher au bord du lac en fin de journée. Aucun des deux ne revient. On retrouve leurs corps dans les eaux peu profondes le soir même. Ludwig a quarante ans. Le verdict officiel\u00A0: noyade. Mais l\u2019eau à l\u2019endroit où on l\u2019a trouvé lui arrivait à peine à la taille, et Ludwig était un excellent nageur. Personne n\u2019a jamais expliqué ce qui s\u2019est réellement passé. Le mystère hante la Bavière depuis plus d\u2019un siècle.",
    },
    {
      text: "Aujourd\u2019hui, un million et demi de visiteurs se pressent à Neuschwanstein chaque année. Walt Disney l\u2019a vu et en a fait le modèle du Château de la Belle au Bois Dormant. On dit qu\u2019il n\u2019y a pas de génie sans un grain de folie \u2014 Ludwig en avait bien plus qu\u2019un grain, et c\u2019est pour ça que ses châteaux tiennent encore. Ses ministres sont tombés dans l\u2019oubli. Son gouvernement, une note de bas de page. Mais le rêve qu\u2019ils ont voulu détruire tient toujours, accroché à sa falaise alpine. On l\u2019a traité de fou parce qu\u2019il a choisi le beau. L\u2019histoire lui a donné raison.",
    },
  ],
};

// ═══════════════════════════════════════════════
//  GERMAN (de)
// ═══════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#madness-of-king-ludwig",
  title: "Der Wahnsinn des Märchenkönigs",
  subtitle:
    "Ein König, der die Schönheit über die Macht stellte und Märchen in Stein baute — bis sein Königreich ihn holte",
  excerpt:
    "Ludwig ist achtzehn, als man ihn 1864 zum König von Bayern macht. Groß, dunkelhaarig und an Macht nicht im Geringsten interessiert. Was ihn bewegt, ist die Musik. Er schreibt Richard Wagner einen Brief, der sich liest wie ein Liebesgeständnis — der Beginn einer der waghalsigsten und schönsten Obsessionen der Geschichte.",
  characters: [
    "König Ludwig II. von Bayern",
    "Richard Wagner",
    "Bayerische Minister",
    "Dr. Bernhard von Gudden",
  ],
  era: "19. Jahrhundert (1864\u20131886)",
  moralOrLesson:
    "Die Welt bestraft jene, die Schönheit über Macht stellen — doch ihre Schöpfungen überdauern jeden Thron, der sie für unwürdig erklärte.",
  paragraphs: [
    {
      text: "Ludwig ist achtzehn, als man ihn 1864 zum König von Bayern macht. Groß, dunkelhaarig und an Macht nicht im Geringsten interessiert. Was ihn bewegt, ist die Musik. Wenige Wochen nach der Krönung schreibt er dem Komponisten Richard Wagner einen Brief, der sich liest wie ein Liebesgeständnis: \u201EIch will Sie für immer von der Last des Alltags befreien. Sie sind mir ein Gott.\u201C Er ist achtzehn. Wagner einundfünfzig. Es ist der Beginn einer der waghalsigsten und schönsten Obsessionen der Geschichte.",
    },
    {
      text: "Ludwig leert die bayerische Staatskasse für Wagners Genie. Er tilgt sämtliche Schulden des Komponisten, finanziert das Festspielhaus in Bayreuth \u2014 einen Traum, den Wagner seit Jahrzehnten verfolgt \u2014 und bestellt private Opernvorstellungen für ein Publikum von einer einzigen Person: sich selbst, allein in einem verdunkelten Münchner Theater, in Tränen aufgelöst. Die Politiker sind außer sich. Sie jagen Wagner aus der Stadt. Doch Ludwigs Hingabe wankt nicht. Der König, dem das Regieren lästig ist, bewegt Himmel und Erde für eine Partitur.",
    },
    {
      text: "Als die Wirklichkeit ihn enttäuscht, baut Ludwig sich seine eigene. Drei Schlösser, jedes maßloser als das letzte \u2014 aller guten Dinge sind drei, und Ludwig nimmt das wörtlich. In Linderhof gleitet er in einem goldenen Boot durch eine unterirdische Grotte, während Wagners Musik von den Felswänden hallt. Herrenchiemsee ist eine Kopie von Versailles auf einer Insel, sein Spiegelsaal länger als das Original. Und Neuschwanstein \u2014 auf einer Klippe in den Alpen \u2014 ist ein ganzes Schloss als Bühnenbild für Wagners Opern.",
    },
    {
      text: "Ludwigs Verhalten wird von Jahr zu Jahr seltsamer. Er dreht Tag und Nacht um, fährt um drei Uhr morgens in goldenen Schlitten durch die Wälder, Fackeln im Gefolge. Er deckt den Tisch für Gäste, die nicht existieren \u2014 tote französische Monarchen wie Ludwig\u00A0XIV. und Marie Antoinette \u2014 und spricht die leeren Stühle an, den ganzen Abend lang. Er zeichnet Pläne für eine Flugmaschine und ein Schloss auf einer Felssäule, erreichbar nur per Heißluftballon. Beides wird nie gebaut.",
    },
    {
      text: "Am 8.\u00A0Juni 1886 erklären vier Psychiater, die Ludwig nie persönlich untersucht haben, ihn für geisteskrank. Zwei Tage später erscheinen Beamte in Neuschwanstein, um ihn festzunehmen. Seine Wachen weisen die erste Gruppe ab, und für einige atemlose Stunden verteidigt der König sein Schloss wie eine Figur aus seinen eigenen Legenden. Beim zweiten Versuch gelingt es. Man nimmt ihm die Krone und bringt ihn nach Schloss Berg am Starnberger See. Der Mann, der Märchen in Stein baute, ist jetzt ein Gefangener.",
    },
    {
      text: "Drei Tage später, am 13.\u00A0Juni, gehen Ludwig und sein Psychiater Dr.\u00A0Bernhard von Gudden am Abend am Seeufer spazieren. Keiner der beiden kommt zurück. Man findet ihre Leichen noch in derselben Nacht im flachen Uferwasser. Ludwig ist vierzig Jahre alt. Das offizielle Urteil: Ertrinken. Aber das Wasser an der Fundstelle reicht ihm kaum bis zur Hüfte, und Ludwig ist ein guter Schwimmer. Was wirklich geschah, hat nie jemand klären können. Das Rätsel verfolgt Bayern seit über hundert Jahren.",
    },
    {
      text: "Heute besuchen 1,4\u00A0Millionen Menschen Neuschwanstein jedes Jahr. Walt Disney sah es und machte es zum Vorbild für das Dornröschenschloss in Disneyland. Das Märchenschloss, das einem König den Thron kostete, wurde zum berühmtesten Schloss der Welt. Ludwigs Minister sind längst vergessen. Seine Regierung eine Fußnote. Aber der Traum, den sie zerstören wollten, steht noch immer auf seiner Klippe in den Alpen. Sie nannten ihn wahnsinnig, weil er die Schönheit wählte. Wer zuletzt lacht, lacht am besten \u2014 und Ludwig lacht noch immer.",
    },
  ],
};

// ═══════════════════════════════════════════════
//  PUSH
// ═══════════════════════════════════════════════
async function pushStory(item, label) {
  console.log(`\n── Pushing ${label} ──`);

  // Validate JSON structure
  if (!item.siteId || !item.langStoryId || !item.lang) {
    throw new Error(`Missing required keys for ${label}`);
  }
  if (!item.paragraphs || item.paragraphs.length < 6) {
    throw new Error(`Too few paragraphs for ${label}: ${item.paragraphs.length}`);
  }

  // Validate paragraph lengths
  for (let i = 0; i < item.paragraphs.length; i++) {
    const text = item.paragraphs[i].text;
    if (text.length > 550) {
      console.warn(`  WARNING: paragraph ${i + 1} is ${text.length} chars (limit 500)`);
    }
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 110) {
      console.warn(`  WARNING: paragraph ${i + 1} is ${wordCount} words (limit 100)`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  Total paragraph chars: ${totalChars}`);
  console.log(`  Paragraphs: ${item.paragraphs.length}`);

  const cmd = new PutCommand({ TableName: TABLE, Item: item });
  const result = await docClient.send(cmd);
  console.log(`  SUCCESS: ${label} pushed (HTTP ${result.$metadata.httpStatusCode})`);
  return result;
}

async function main() {
  try {
    await pushStory(es, "SPANISH (es)");
    await pushStory(fr, "FRENCH (fr)");
    await pushStory(de, "GERMAN (de)");
    console.log("\n All 3 stories pushed successfully.\n");
  } catch (err) {
    console.error("\n FAILED:", err.message);
    process.exit(1);
  }
}

main();
