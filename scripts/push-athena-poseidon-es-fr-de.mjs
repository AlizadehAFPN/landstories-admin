/**
 * Push es/fr/de recreations of "The Contest of Athena and Poseidon"
 * to the Story DynamoDB table.
 *
 * Run:  node scripts/push-athena-poseidon-es-fr-de.mjs
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical to the English record) ────────────────────────

const shared = {
  siteId: "acropolis-athens",
  storyId: "athena-poseidon-contest",
  icon: "\u{1FAD2}",
  storyCategory: "gods_monsters",
  era: "Mythological Era",
  tier: "S",
  isFree: true,
  isFeatured: false,
  hasAudio: false,
  characters: ["Athena", "Poseidon", "King Cecrops", "The Athenians"],
  coordinates: { lat: 37.9722, lng: 23.7263 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 2,
  source:
    "Apollodorus\u2019s Bibliotheca, Pausanias\u2019s Description of Greece (Book 1), Herodotus\u2019s Histories, Ovid\u2019s Metamorphoses",
  disabled: false,
};

// ═════════════════════════════════════════════════════════════════════════════
//  SPANISH  (es)
//
//  Proverb subverted: "M\u00e1s vale ma\u00f1a que fuerza"
//    → "M\u00e1s vale ra\u00edz que llama"
//
//  Register: skilled modern storyteller — think high-quality Spanish podcast
//  narrating a historical legend. Conversational, vivid, never academic.
// ═════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#athena-poseidon-contest",
  updatedAt: now,

  title: "La batalla por Atenas",
  subtitle: "La rivalidad divina que le dio nombre a Atenas",
  excerpt:
    "Dos dioses quer\u00edan la misma ciudad. Atenea, diosa de la sabidur\u00eda, y Poseid\u00f3n, dios del mar, pusieron los ojos en la misma colina rocosa de Grecia \u2014 la futura Acr\u00f3polis de Atenas \u2014 y los dos dijeron lo mismo: esta ciudad es m\u00eda.",

  moralOrLesson:
    "La sabidur\u00eda dura m\u00e1s que la fuerza bruta. Atenas eligi\u00f3 el regalo discreto sobre el llamativo, y eso los convirti\u00f3 en una de las grandes civilizaciones de la historia.",

  paragraphs: [
    {
      text: "Dos dioses quer\u00edan la misma ciudad. Atenea, diosa de la sabidur\u00eda, y Poseid\u00f3n, dios del mar, pusieron los ojos en la misma colina rocosa de Grecia \u2014 la futura Acr\u00f3polis de Atenas \u2014 y los dos dijeron lo mismo: esta ciudad es m\u00eda. Ninguno iba a ceder. As\u00ed que Zeus, rey de los dioses, organiz\u00f3 lo que probablemente sea el concurso con m\u00e1s en juego de toda la mitolog\u00eda: cada dios le ofrecer\u00eda un regalo a la ciudad, y los habitantes elegir\u00edan al ganador. Quien diera el mejor regalo se convertir\u00eda en su protector. Para siempre.",
    },
    {
      text: "Poseid\u00f3n fue primero, y la sutileza no era lo suyo. Levant\u00f3 su tridente \u2014 un arma enorme de tres puntas \u2014 y lo clav\u00f3 en la roca desnuda de la Acr\u00f3polis. La piedra se parti\u00f3 y de la grieta brot\u00f3 agua salada, un manantial conectado directamente al oc\u00e9ano. Su propuesta era puro m\u00fasculo: el\u00edjanme a m\u00ed y dominar\u00e1n los mares. Sus barcos controlar\u00e1n todas las rutas comerciales. Su armada ser\u00e1 invencible. Fue ruidoso, espectacular e imposible de ignorar.",
    },
    {
      text: "Despu\u00e9s se adelant\u00f3 Atenea. Sin terremotos, sin teatralidad. Se arrodill\u00f3, hundi\u00f3 las manos en la tierra pedregosa y plant\u00f3 una sola semilla. Un olivo creci\u00f3 ah\u00ed mismo \u2014 hojas verde plata brillando al sol, ramas ya cargadas de fruto. No era tan espectacular como un g\u00e9iser de agua salada, est\u00e1 claro. Pero piensa en lo que un solo olivo te da: comida, aceite para cocinar, combustible para las l\u00e1mparas que iluminan la noche, madera para construir. Un \u00e1rbol, y pod\u00edas alimentar a una familia durante generaciones.",
    },
    {
      text: "El primer rey legendario de la ciudad \u2014 C\u00e9crope, descrito en los mitos como mitad hombre, mitad serpiente \u2014 eligi\u00f3 el olivo. La ciudad tom\u00f3 el nombre de Atenea, y as\u00ed naci\u00f3 Atenas. Poseid\u00f3n no se tom\u00f3 bien la derrota. Inund\u00f3 las llanuras cercanas y maldijo la regi\u00f3n con sequ\u00edas. Pero el olivo sigui\u00f3 creciendo en aquella colina, mucho despu\u00e9s de que su furia se apagara. Los atenienses lo trataron como sagrado durante m\u00e1s de mil a\u00f1os.",
    },
    {
      text: "Y aqu\u00ed es donde la historia se pone seria. En el 480 a.C., el Imperio persa \u2014 la fuerza m\u00e1s poderosa del mundo antiguo \u2014 invadi\u00f3 Grecia y arras\u00f3 la Acr\u00f3polis hasta los cimientos. El olivo sagrado de Atenea ardi\u00f3 con todo lo dem\u00e1s. Todo lo que la ciudad ten\u00eda por sagrado, borrado en una sola noche. Pero a la ma\u00f1ana siguiente, los atenienses que trepaban entre las ruinas humeantes encontraron un brote verde asomando del tronco carbonizado. M\u00e1s vale ma\u00f1a que fuerza, dice el refr\u00e1n. Pero a veces, m\u00e1s vale ra\u00edz que llama.",
    },
    {
      text: "Atenas resurgi\u00f3. Los griegos derrotaron a los persas y la ciudad entr\u00f3 en su edad de oro \u2014 la era que le dio al mundo la democracia, la filosof\u00eda y algunas de las obras de arte m\u00e1s extraordinarias jam\u00e1s creadas. Reconstruyeron la Acr\u00f3polis m\u00e1s grande y m\u00e1s bella que antes, coron\u00e1ndola con el Parten\u00f3n. Y en su fachada occidental tallaron la escena de este mismo concurso: el momento en que su ciudad eligi\u00f3 la sabidur\u00eda por encima de la fuerza bruta.",
    },
    {
      text: "Hoy puedes visitar los dos lugares. El Erecte\u00edn, un templo construido en la Acr\u00f3polis hacia el 420 a.C., se levanta justo sobre las marcas que supuestamente dej\u00f3 el tridente de Poseid\u00f3n en la roca. Y a su lado, un olivo crece en el mismo lugar donde Atenea plant\u00f3 el suyo \u2014 replantado y cuidado durante m\u00e1s de dos mil a\u00f1os. Atenas eligi\u00f3 el regalo silencioso sobre el ruidoso, la visi\u00f3n a largo plazo sobre la victoria r\u00e1pida. Y sinceramente, eligieron bien.",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
//  FRENCH  (fr)
//
//  Proverb subverted: "La raison du plus fort est toujours la meilleure"
//    (La Fontaine, Le Loup et l'Agneau)
//    → "la raison du plus tenace"
//
//  Register: Franck Ferrand meets a top-tier podcast — warm, precise,
//  passé composé throughout, zero passé simple.
// ═════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#athena-poseidon-contest",
  updatedAt: now,

  title: "Le duel pour Ath\u00e8nes",
  subtitle: "La rivalit\u00e9 divine qui a donn\u00e9 son nom \u00e0 Ath\u00e8nes",
  excerpt:
    "Deux dieux voulaient la m\u00eame ville. Ath\u00e9na, d\u00e9esse de la sagesse, et Pos\u00e9idon, dieu des mers, avaient tous les deux jet\u00e9 leur d\u00e9volu sur la m\u00eame colline rocheuse de Gr\u00e8ce \u2014 la future Acropole d\u2019Ath\u00e8nes \u2014 et chacun avait dit la m\u00eame chose\u00a0: celle-l\u00e0, c\u2019est la mienne.",

  moralOrLesson:
    "La sagesse survit \u00e0 la force brute. Ath\u00e8nes a choisi le cadeau discret plut\u00f4t que le spectaculaire, et ce choix en a fait l\u2019une des plus grandes civilisations de l\u2019histoire.",

  paragraphs: [
    {
      text: "Deux dieux voulaient la m\u00eame ville. Ath\u00e9na, d\u00e9esse de la sagesse, et Pos\u00e9idon, dieu des mers, avaient tous les deux jet\u00e9 leur d\u00e9volu sur la m\u00eame colline rocheuse de Gr\u00e8ce \u2014 la future Acropole d\u2019Ath\u00e8nes \u2014 et chacun avait dit la m\u00eame chose\u00a0: celle-l\u00e0, c\u2019est la mienne. Aucun des deux ne voulait c\u00e9der. Alors Zeus, roi des dieux, a organis\u00e9 ce qui est peut-\u00eatre le concours aux enjeux les plus d\u00e9mesur\u00e9s de toute la mythologie\u00a0: chaque dieu offrirait un cadeau \u00e0 la ville, et les habitants choisiraient le vainqueur. Le meilleur cadeau l\u2019emportait \u2014 et avec lui, la protection \u00e9ternelle de la cit\u00e9.",
    },
    {
      text: "Pos\u00e9idon a jou\u00e9 en premier, et la discr\u00e9tion n\u2019\u00e9tait pas son genre. Il a soulev\u00e9 son trident \u2014 une arme massive \u00e0 trois pointes \u2014 et l\u2019a plant\u00e9 dans la roche nue de l\u2019Acropole. La pierre s\u2019est fendue et de l\u2019eau sal\u00e9e a jailli, une source reli\u00e9e directement \u00e0 l\u2019oc\u00e9an. Son argument, c\u2019\u00e9tait la puissance brute\u00a0: choisissez-moi et vous dominerez les mers. Vos navires contr\u00f4leront toutes les routes commerciales. Votre flotte sera intouchable. C\u2019\u00e9tait spectaculaire, fracassant, impossible \u00e0 ignorer.",
    },
    {
      text: "Puis Ath\u00e9na s\u2019est avanc\u00e9e. Pas de s\u00e9isme, pas de mise en sc\u00e8ne. Elle s\u2019est agenouill\u00e9e, a enfonc\u00e9 ses mains dans la terre rocailleuse et a plant\u00e9 une seule graine. Un olivier a pouss\u00e9 l\u00e0, sur place \u2014 des feuilles vert argent\u00e9 qui captaient la lumi\u00e8re du soleil, des branches d\u00e9j\u00e0 lourdes de fruits. Moins impressionnant qu\u2019un geyser d\u2019eau sal\u00e9e, c\u2019est vrai. Mais r\u00e9fl\u00e9chissez \u00e0 ce qu\u2019un seul olivier peut donner\u00a0: de la nourriture, de l\u2019huile pour cuisiner, du combustible pour s\u2019\u00e9clairer la nuit, du bois pour construire. Un arbre, et vous pouviez nourrir une famille pendant des g\u00e9n\u00e9rations.",
    },
    {
      text: "Le premier roi l\u00e9gendaire de la ville \u2014 C\u00e9crops, d\u00e9crit dans les mythes comme mi-homme, mi-serpent \u2014 a choisi l\u2019olivier. La ville a pris le nom d\u2019Ath\u00e9na, et Ath\u00e8nes est n\u00e9e. Pos\u00e9idon l\u2019a tr\u00e8s mal pris. Il a inond\u00e9 les plaines alentour et frapp\u00e9 la r\u00e9gion de s\u00e9cheresse. Mais l\u2019olivier a continu\u00e9 de pousser sur cette colline, bien apr\u00e8s que sa col\u00e8re se soit \u00e9teinte. Les Ath\u00e9niens l\u2019ont v\u00e9n\u00e9r\u00e9 comme sacr\u00e9 pendant plus de mille ans.",
    },
    {
      text: "Et c\u2019est l\u00e0 que l\u2019histoire devient s\u00e9rieuse. En 480 avant notre \u00e8re, l\u2019Empire perse \u2014 la force la plus redoutable du monde antique \u2014 a envahi la Gr\u00e8ce et ras\u00e9 l\u2019Acropole. L\u2019olivier sacr\u00e9 d\u2019Ath\u00e9na a br\u00fbl\u00e9 avec tout le reste. Tout ce que la ville avait de sacr\u00e9, effac\u00e9 en une seule nuit. Mais le lendemain matin, les Ath\u00e9niens qui grimpaient dans les ruines fumantes ont trouv\u00e9 une pousse verte qui per\u00e7ait le tronc calcin\u00e9. On dit que la raison du plus fort est toujours la meilleure. Cette nuit-l\u00e0, c\u2019est la raison du plus tenace qui l\u2019a emport\u00e9.",
    },
    {
      text: "Ath\u00e8nes s\u2019est relev\u00e9e. Les Grecs ont vaincu les Perses, et la ville est entr\u00e9e dans son \u00e2ge d\u2019or \u2014 l\u2019\u00e9poque qui a donn\u00e9 au monde la d\u00e9mocratie, la philosophie et certaines des plus grandes \u0153uvres d\u2019art jamais cr\u00e9\u00e9es. Ils ont reconstruit l\u2019Acropole plus grande et plus belle qu\u2019avant, et l\u2019ont couronn\u00e9e du Parth\u00e9non. Sur sa fa\u00e7ade ouest, ils ont sculpt\u00e9 la sc\u00e8ne de ce fameux concours\u00a0: le moment o\u00f9 leur cit\u00e9 a choisi la sagesse plut\u00f4t que la force.",
    },
    {
      text: "On peut encore voir les deux endroits aujourd\u2019hui. L\u2019\u00c9rechth\u00e9ion, un temple b\u00e2ti sur l\u2019Acropole vers 420 avant notre \u00e8re, se dresse exactement sur les marques que le trident de Pos\u00e9idon aurait laiss\u00e9es dans la roche. Et juste \u00e0 c\u00f4t\u00e9, un olivier pousse au m\u00eame endroit o\u00f9 Ath\u00e9na avait plant\u00e9 le sien \u2014 replant\u00e9 et entretenu depuis plus de deux mille ans. Ath\u00e8nes a choisi le cadeau discret plut\u00f4t que le spectaculaire, la patience plut\u00f4t que la puissance. Et franchement\u00a0? Ils ont eu raison.",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
//  GERMAN  (de)
//
//  Proverb subverted: "In der Ruhe liegt die Kraft"
//    → applied to the olive tree's quiet survival
//
//  Register: Terra X narrator meets quality podcast — warm authority,
//  direct address ("denk mal nach"), zero Konjunktiv I news-speak.
// ═════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#athena-poseidon-contest",
  updatedAt: now,

  title: "Der Wettstreit um Athen",
  subtitle: "Der g\u00f6ttliche Streit, der Athen seinen Namen gab",
  excerpt:
    "Zwei G\u00f6tter wollten dieselbe Stadt. Athene, G\u00f6ttin der Weisheit, und Poseidon, Gott des Meeres, hatten beide denselben felsigen H\u00fcgel in Griechenland ins Auge gefasst \u2014 die k\u00fcnftige Akropolis von Athen \u2014 und jeder sagte dasselbe: Die geh\u00f6rt mir.",

  moralOrLesson:
    "Weisheit \u00fcberdauert rohe Gewalt. Athen w\u00e4hlte das stille Geschenk statt das laute \u2014 und wurde damit zu einer der gr\u00f6\u00dften Zivilisationen der Geschichte.",

  paragraphs: [
    {
      text: "Zwei G\u00f6tter wollten dieselbe Stadt. Athene, G\u00f6ttin der Weisheit, und Poseidon, Gott des Meeres, hatten beide denselben felsigen H\u00fcgel in Griechenland ins Auge gefasst \u2014 die k\u00fcnftige Akropolis von Athen \u2014 und jeder sagte dasselbe: Die geh\u00f6rt mir. Keiner wollte nachgeben. Also richtete Zeus, K\u00f6nig der G\u00f6tter, das ein, was wohl der Wettstreit mit den h\u00f6chsten Eins\u00e4tzen der gesamten Mythologie war: Jeder Gott w\u00fcrde der Stadt ein Geschenk machen, und die Bewohner w\u00fcrden den Gewinner w\u00e4hlen. Wer das bessere Geschenk brachte, wurde Schutzgott der Stadt. F\u00fcr immer.",
    },
    {
      text: "Poseidon machte den Anfang \u2014 und Zur\u00fcckhaltung war nicht sein Ding. Er hob seinen Dreizack \u2014 eine gewaltige dreizackige Waffe \u2014 und rammte ihn in den nackten Fels der Akropolis. Der Stein barst, und Salzwasser schoss empor, eine Quelle, die direkt mit dem Ozean verbunden war. Sein Angebot war rohe Macht: W\u00e4hlt mich, und ihr beherrscht die Meere. Eure Schiffe werden jede Handelsroute dominieren. Eure Flotte wird unangreifbar sein. Laut, dramatisch, unm\u00f6glich zu \u00fcbersehen.",
    },
    {
      text: "Dann trat Athene vor. Kein Erdbeben, kein Theater. Sie kniete nieder, dr\u00fcckte ihre H\u00e4nde in den steinigen Boden und pflanzte einen einzigen Samen. Ein Olivenbaum wuchs an Ort und Stelle \u2014 silbergr\u00fcne Bl\u00e4tter, die das Sonnenlicht einfingen, \u00c4ste, die sich bereits unter der Last der Fr\u00fcchte bogen. Nicht so spektakul\u00e4r wie eine Salzwasserfont\u00e4ne, klar. Aber denk mal nach, was ein einziger Olivenbaum dir alles gibt: Nahrung, \u00d6l zum Kochen, Brennstoff f\u00fcr Lampen in der Nacht, Holz zum Bauen. Ein Baum \u2014 und du konntest eine Familie \u00fcber Generationen ern\u00e4hren.",
    },
    {
      text: "Der legend\u00e4re erste K\u00f6nig der Stadt \u2014 Kekrops, in den Mythen als halb Mensch, halb Schlange beschrieben \u2014 entschied sich f\u00fcr den Olivenbaum. Die Stadt \u00fcbernahm Athenes Namen, und Athen war geboren. Poseidon nahm die Niederlage schlecht auf. Er \u00fcberschwemmte die umliegenden Ebenen und verfluchte die Region mit D\u00fcrre. Aber der Olivenbaum wuchs weiter auf jenem H\u00fcgel, lange nachdem sein Zorn verraucht war. Die Athener hielten ihn \u00fcber tausend Jahre lang f\u00fcr heilig.",
    },
    {
      text: "Und hier wird es ernst. 480 v.\u00a0Chr. \u00fcberfiel das Perserreich \u2014 die m\u00e4chtigste Streitmacht der antiken Welt \u2014 Griechenland und brannte die Akropolis bis auf die Grundmauern nieder. Athenes heiliger Olivenbaum verbrannte mit allem anderen. Alles, was die Stadt f\u00fcr heilig hielt, in einer einzigen Nacht ausgel\u00f6scht. Aber am n\u00e4chsten Morgen fanden Athener, die durch die rauchenden Tr\u00fcmmer kletterten, einen frischen gr\u00fcnen Trieb, der aus dem verkohlten Stumpf hervorbrach. Man sagt: In der Ruhe liegt die Kraft. Dieser Baum hat es bewiesen.",
    },
    {
      text: "Athen erhob sich wieder. Die Griechen besiegten die Perser, und die Stadt trat in ihr goldenes Zeitalter ein \u2014 die Epoche, die der Welt die Demokratie, die Philosophie und einige der gr\u00f6\u00dften Kunstwerke aller Zeiten schenkte. Sie bauten die Akropolis gr\u00f6\u00dfer und sch\u00f6ner wieder auf als zuvor und kr\u00f6nten sie mit dem Parthenon. An seiner Westseite mei\u00dfelten sie die Szene dieses Wettstreits in den Stein: den Moment, in dem ihre Stadt die Weisheit \u00fcber die rohe Gewalt stellte.",
    },
    {
      text: "Beide Orte kann man heute noch besuchen. Das Erechtheion, ein Tempel auf der Akropolis aus der Zeit um 420 v.\u00a0Chr., steht genau \u00fcber den Spuren, die Poseidons Dreizack angeblich im Fels hinterlassen hat. Und direkt daneben w\u00e4chst ein Olivenbaum an derselben Stelle, wo Athene einst ihren pflanzte \u2014 nachgepflanzt und gepflegt seit \u00fcber zweitausend Jahren. Athen w\u00e4hlte das leise Geschenk statt das laute, den langen Atem statt den schnellen Sieg. Und ehrlich gesagt? Sie haben richtig gew\u00e4hlt.",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
//  PUSH TO DYNAMODB
// ═════════════════════════════════════════════════════════════════════════════

async function pushAndVerify(label, data) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  Pushing: ${label}  \u2192  ${data.langStoryId}`);
  console.log(`${"=".repeat(60)}`);

  // JSON round-trip validation
  const json = JSON.stringify(data);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== data.paragraphs.length) {
    throw new Error(`JSON round-trip failed for ${label}`);
  }
  console.log(`  \u2713  JSON valid (${json.length} bytes, ${data.paragraphs.length} paragraphs)`);

  // Character-count validation
  let totalChars = 0;
  for (let i = 0; i < data.paragraphs.length; i++) {
    const len = data.paragraphs[i].text.length;
    totalChars += len;
    if (len > 600) {
      // 500 + 20% tolerance
      console.warn(`  \u26a0  Paragraph ${i + 1}: ${len} chars (exceeds 500+20%)`);
    }
  }
  console.log(`  \u2713  Total characters: ${totalChars}`);

  // Push
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: data }));
    console.log(`  \u2713  PUT succeeded`);
  } catch (err) {
    console.error(`  \u2717  PUT FAILED: ${err.message}`);
    throw err;
  }

  // Verify
  const verify = await doc.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: data.siteId, langStoryId: data.langStoryId },
    })
  );

  if (verify.Item && verify.Item.title === data.title) {
    console.log(`  \u2713  Verified: title = "${verify.Item.title}"`);
    console.log(`  \u2713  Verified: paragraphs = ${verify.Item.paragraphs.length}`);
    console.log(`  \u2713  Verified: updatedAt = ${verify.Item.updatedAt}`);
  } else {
    throw new Error(`Verification failed for ${label} — record not found or title mismatch`);
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n\u2550".repeat(60));
  console.log("  Athena & Poseidon \u2014 pushing es / fr / de to DynamoDB");
  console.log(`  Table: ${TABLE}  |  Timestamp: ${now}`);
  console.log("\u2550".repeat(60));

  await pushAndVerify("Spanish (es)", es);
  await pushAndVerify("French (fr)", fr);
  await pushAndVerify("German (de)", de);

  console.log(`\n${"=".repeat(60)}`);
  console.log("  ALL 3 STORIES PUSHED AND VERIFIED SUCCESSFULLY");
  console.log(`${"=".repeat(60)}\n`);
}

main().catch((err) => {
  console.error(`\n\u2717 Fatal error: ${err.message}`);
  process.exit(1);
});
