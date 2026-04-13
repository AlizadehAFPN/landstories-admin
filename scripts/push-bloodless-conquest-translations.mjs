import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───────────────────────────
const shared = {
  siteId: "alamut-castle",
  storyId: "bloodless-conquest",
  icon: "\u{1F985}",
  storyCategory: "crowns_conquests",
  era: "1081-1090 CE (Nine years of planning and infiltration)",
  tier: "S",
  isFree: true,
  isFeatured: false,
  hasAudio: false,
  readingTimeMinutes: 6,
  image: "",
  thumbnail: "",
  coordinates: { lat: 36.4447, lng: 50.5861 },
  disabled: false,
  source:
    "Hassan-i Sabbah, Sarguzasht-i Sayyidna (autobiography, preserved in fragments by Juvayni); Ata-Malik Juvayni, Tarikh-i Jahangushay (History of the World Conqueror, c.1260); Rashid al-Din Hamadani, Jami al-Tawarikh (Compendium of Chronicles, c.1310); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge University Press, 2007); Encyclopaedia Iranica, \u2018HASAN SABBAH\u2019 (Vol. XII, 1996)",
  characters: [
    "Hassan-i Sabbah (founder of the Nizari Ismaili state)",
    "Mahdi (Zaydi lord of Alamut Castle)",
    "Nizam al-Mulk (Seljuq vizier who hunted Hassan)",
    "Amira Zarrab (Ismaili missionary who converted Hassan)",
    "Ibn Attash (chief Ismaili da\u2019i of Persia)",
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb subverted: "M\u00e1s vale ma\u00f1a que fuerza"
// ═══════════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#bloodless-conquest",
  updatedAt: NOW,

  title: "La conquista silenciosa",
  subtitle:
    "C\u00f3mo un solo hombre tom\u00f3 la fortaleza m\u00e1s protegida de Persia sin desenvainar una espada",
  excerpt:
    "El 4 de septiembre de 1090, un hombre cruz\u00f3 las puertas de la fortaleza m\u00e1s protegida de Persia. Sin ej\u00e9rcito. Sin espada. Sin una sola gota de sangre.",
  moralOrLesson:
    "Las fortalezas m\u00e1s grandes no se conquistan con arietes ni ej\u00e9rcitos, sino con paciencia, inteligencia y la lenta construcci\u00f3n de confianza \u2014 un solo hombre con una idea puede lograr lo que diez mil soldados no consiguen.",

  paragraphs: [
    {
      text: "El 4 de septiembre de 1090, un hombre cruz\u00f3 las puertas de la fortaleza m\u00e1s protegida de Persia. Sin ej\u00e9rcito. Sin espada. Sin una sola gota de sangre. La fortaleza era Alamut: un castillo construido sobre una cresta de roca a doscientos metros sobre un valle tan remoto que los cart\u00f3grafos tardar\u00edan ocho siglos en dibujarlo bien. El hombre era Hassan-i Sabbah. Y lo que hizo aquella noche podr\u00eda ser la toma m\u00e1s brillante de toda la Edad Media.",
    },
    {
      text: "Hassan naci\u00f3 hacia 1050 en Qom, en lo que hoy es Ir\u00e1n, y desde joven devor\u00f3 todo lo que cay\u00f3 en sus manos: filosof\u00eda, matem\u00e1ticas, astronom\u00eda. Hasta que un predicador local lo introdujo al islam ismail\u00ed, una rama que se opon\u00eda a los turcos selyu\u0301cidas \u2014 el imperio que dominaba Oriente Medio. Hassan se convirti\u00f3 y jur\u00f3 lealtad al califa fatim\u00ed en El Cairo. De la noche a la ma\u00f1ana, pas\u00f3 a ser un hombre buscado. El gran visir selyu\u0301cida orden\u00f3 su captura personalmente.",
    },
    {
      text: "Hassan huy\u00f3 a El Cairo. Estudi\u00f3 en la legendaria Casa de la Sabidur\u00eda, se gan\u00f3 la confianza del califa y ascendi\u00f3 r\u00e1pido. Pero las intrigas palaciegas lo alcanzaron: se enemist\u00f3 con quien no deb\u00eda, termin\u00f3 preso y fue expulsado de Egipto. Naufrag\u00f3 de vuelta, sobrevivi\u00f3 y lleg\u00f3 a Persia en 1081. Y entonces, en lugar de esconderse, pas\u00f3 nueve a\u00f1os cruzando monta\u00f1as disfrazado, tejiendo una red clandestina de seguidores con un \u00fanico objetivo: encontrar una fortaleza imposible de tomar.",
    },
    {
      text: "La encontr\u00f3 en el valle de Alamut: una franja de verde encajonada entre picos de tres mil metros, con un solo paso que la nieve cerraba medio a\u00f1o. En el centro, sobre una cresta de roca dentada, se levantaba el castillo. Hassan no reclut\u00f3 un ej\u00e9rcito. Envi\u00f3 predicadores a las aldeas cercanas. Infiltr\u00f3 conversos como guardias y sirvientes dentro de la fortaleza. \u00c9l mismo se instal\u00f3 cerca como maestro de escuela y durante dos a\u00f1os se gan\u00f3 la confianza de todos. Cada pieza, colocada con paciencia de cirujano.",
    },
    {
      text: "Aquella noche de septiembre, Hassan cruz\u00f3 las puertas como quien vuelve a casa. Los guardias lo conoc\u00edan. Los sirvientes, tambi\u00e9n. El due\u00f1o del castillo, un se\u00f1or llamado Mahdi, estaba de viaje. Cuando volvi\u00f3, sus propios hombres obedec\u00edan a otro. Hassan le entreg\u00f3 un pagar\u00e9 por tres mil dinares de oro \u2014 una fortuna \u2014 como pago por la fortaleza. Rodeado de hombres que ya no le segu\u00edan, Mahdi tom\u00f3 el dinero y se fue. Dicen que m\u00e1s vale ma\u00f1a que fuerza. Hassan demostr\u00f3 que con suficiente ma\u00f1a, la fuerza ni siquiera hace falta.",
    },
    {
      text: "Hassan no volvi\u00f3 a salir de Alamut. Durante treinta y cuatro a\u00f1os, hasta su muerte en 1124, permaneci\u00f3 dentro. Solo abandon\u00f3 su habitaci\u00f3n dos veces, ambas para subir a la azotea. Levant\u00f3 una de las mayores bibliotecas del mundo isl\u00e1mico, expandi\u00f3 su red a m\u00e1s de doscientas fortalezas de monta\u00f1a y form\u00f3 a los agentes cuyas eliminaciones selectivas grabaron para siempre su nombre \u2014 los Asesinos \u2014 en todas las lenguas de Europa. Vivi\u00f3 como un monje y muri\u00f3 como fundador de un Estado.",
    },
    {
      text: "Hassan no conquist\u00f3 un castillo. Hizo que el castillo descubriera que ya le pertenec\u00eda. Y el nido del \u00e1guila que se convirti\u00f3 en su hogar \u2014 Alamut, del persa antiguo \u00abLa ense\u00f1anza del \u00e1guila\u00bb \u2014 nunca olvid\u00f3 a su due\u00f1o. Durante ciento sesenta y seis a\u00f1os tras aquella noche de septiembre, ning\u00fan imperio de la tierra logr\u00f3 recuperarlo.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb subverted: "Tout vient \u00e0 point \u00e0 qui sait attendre"
// ═══════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#bloodless-conquest",
  updatedAt: NOW,

  title: "La conqu\u00eate silencieuse",
  subtitle:
    "Comment un seul homme s\u2019est empar\u00e9 de la forteresse la plus imprenable de Perse sans d\u00e9gainer une seule \u00e9p\u00e9e",
  excerpt:
    "Le 4 septembre 1090, un homme a franchi les portes de la forteresse la mieux gard\u00e9e de Perse. Pas d\u2019arm\u00e9e derri\u00e8re lui. Pas d\u2019\u00e9p\u00e9e \u00e0 la main. Pas une seule goutte de sang par terre.",
  moralOrLesson:
    "Les plus grandes forteresses ne tombent pas sous les coups des b\u00e9liers ou des arm\u00e9es, mais sous la patience, l\u2019intelligence et la lente construction de la confiance \u2014 un seul homme arm\u00e9 d\u2019une id\u00e9e peut accomplir ce que dix mille soldats ne peuvent pas.",

  paragraphs: [
    {
      text: "Le 4 septembre 1090, un homme a franchi les portes de la forteresse la mieux gard\u00e9e de Perse. Pas d\u2019arm\u00e9e derri\u00e8re lui. Pas d\u2019\u00e9p\u00e9e \u00e0 la main. Pas une seule goutte de sang par terre. Cette forteresse, c\u2019\u00e9tait Alamut \u2014 un ch\u00e2teau perch\u00e9 sur une lame de roche \u00e0 deux cents m\u00e8tres au-dessus d\u2019une vall\u00e9e si isol\u00e9e que les cartographes ont mis huit si\u00e8cles \u00e0 la dessiner correctement. L\u2019homme, c\u2019\u00e9tait Hassan-i Sabbah. Et ce qu\u2019il a r\u00e9ussi cette nuit-l\u00e0, c\u2019est peut-\u00eatre le coup de force le plus brillant de tout le Moyen \u00c2ge.",
    },
    {
      text: "Hassan est n\u00e9 vers 1050 \u00e0 Qom, dans l\u2019Iran d\u2019aujourd\u2019hui, et depuis tout petit, il d\u00e9vorait tout : philosophie, maths, astronomie, tout ce qui lui tombait sous la main. Et puis un jour, un pr\u00e9dicateur local lui a fait d\u00e9couvrir l\u2019islam isma\u00e9lien \u2014 un courant qui s\u2019opposait frontalement aux Turcs seldjoukides, l\u2019empire qui tenait le Moyen-Orient dans son poing. Hassan s\u2019est converti et a jur\u00e9 fid\u00e9lit\u00e9 au calife fatimide du Caire. Du jour au lendemain, il est devenu un homme traqu\u00e9. Le grand vizir seldjoukide a ordonn\u00e9 sa capture en personne.",
    },
    {
      text: "Hassan s\u2019est enfui au Caire. Il a \u00e9tudi\u00e9 dans la c\u00e9l\u00e8bre Maison de la Sagesse, gagn\u00e9 la confiance du calife et grimp\u00e9 les \u00e9chelons \u00e0 une vitesse folle. Mais les intrigues de palais l\u2019ont rattrap\u00e9 : il s\u2019est fait les mauvais ennemis, a atterri en prison et s\u2019est fait expulser d\u2019\u00c9gypte. Il a fait naufrage sur le chemin du retour, a surv\u00e9cu et a regagn\u00e9 la Perse en 1081. Et l\u00e0, au lieu de se terrer, il a pass\u00e9 neuf ans \u00e0 traverser des montagnes sous de fausses identit\u00e9s, en tissant un r\u00e9seau clandestin de fid\u00e8les avec un seul objectif : trouver une forteresse imprenable.",
    },
    {
      text: "Il l\u2019a trouv\u00e9e dans la vall\u00e9e d\u2019Alamut \u2014 un ruban de verdure coinc\u00e9 entre des sommets de trois mille m\u00e8tres, avec un seul col ferm\u00e9 par la neige six mois par an. Au milieu, sur une ar\u00eate de roche d\u00e9chiquet\u00e9e, se dressait le ch\u00e2teau. Hassan n\u2019a pas lev\u00e9 d\u2019arm\u00e9e. Il a envoy\u00e9 des pr\u00e9dicateurs dans les villages alentour. Il a plac\u00e9 des convertis comme gardes et serviteurs \u00e0 l\u2019int\u00e9rieur. Lui-m\u00eame s\u2019est install\u00e9 \u00e0 c\u00f4t\u00e9 en se faisant passer pour un professeur, et pendant deux ans, il a gagn\u00e9 la confiance de tout le monde. Chaque pi\u00e8ce pos\u00e9e avec une patience chirurgicale.",
    },
    {
      text: "Cette nuit de septembre, Hassan a franchi les portes comme s\u2019il rentrait chez lui. Les gardes le connaissaient. Les serviteurs aussi. Le propri\u00e9taire du ch\u00e2teau, un seigneur du nom de Mahdi, \u00e9tait en d\u00e9placement. Quand il est revenu, ses propres hommes ob\u00e9issaient \u00e0 quelqu\u2019un d\u2019autre. Hassan lui a tendu une traite de trois mille dinars d\u2019or \u2014 une fortune \u2014 en guise de paiement. Cern\u00e9 par des hommes qui ne r\u00e9pondaient plus \u00e0 ses ordres, Mahdi a pris l\u2019argent et il est parti. On dit que tout vient \u00e0 point \u00e0 qui sait attendre. Hassan a attendu neuf ans. Et tout est venu.",
    },
    {
      text: "Hassan n\u2019a plus jamais quitt\u00e9 Alamut. Pendant trente-quatre ans, jusqu\u2019\u00e0 sa mort en 1124, il est rest\u00e9 \u00e0 l\u2019int\u00e9rieur. Il n\u2019est sorti de sa chambre que deux fois, les deux fois pour monter sur le toit. Il a b\u00e2ti l\u2019une des plus grandes biblioth\u00e8ques du monde islamique, \u00e9tendu son r\u00e9seau \u00e0 plus de deux cents forteresses de montagne et form\u00e9 des agents dont les \u00e9liminations cibl\u00e9es ont grav\u00e9 leur nom \u2014 les Assassins \u2014 dans toutes les langues europ\u00e9ennes. Il a v\u00e9cu en moine et il est mort en fondateur d\u2019\u00c9tat.",
    },
    {
      text: "Hassan n\u2019a pas conquis un ch\u00e2teau. Il lui a fait comprendre qu\u2019il lui appartenait d\u00e9j\u00e0. Et le nid d\u2019aigle devenu son foyer \u2014 Alamut, du vieux persan pour \u00ab l\u2019Enseignement de l\u2019Aigle \u00bb \u2014 n\u2019a jamais oubli\u00e9 son ma\u00eetre. Pendant cent soixante-six ans apr\u00e8s cette nuit de septembre, aucun empire au monde n\u2019a r\u00e9ussi \u00e0 le reprendre.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb subverted: "Gut Ding will Weile haben"
// ═══════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#bloodless-conquest",
  updatedAt: NOW,

  title: "Die lautlose Eroberung",
  subtitle:
    "Wie ein einzelner Mann die bestgesicherte Festung Persiens \u00fcbernahm \u2014 ohne ein einziges Schwert zu ziehen",
  excerpt:
    "Am 4. September 1090 ging ein Mann durch die Tore der bestgesicherten Festung Persiens. Keine Armee im R\u00fccken. Kein Schwert in der Hand. Kein einziger Tropfen Blut am Boden.",
  moralOrLesson:
    "Die gr\u00f6\u00dften Festungen werden nicht mit Belagerungsmaschinen oder Armeen bezwungen, sondern mit Geduld, Intelligenz und dem langsamen Aufbau von Vertrauen \u2014 ein einzelner Mann mit einer Idee kann erreichen, was zehntausend Soldaten nicht schaffen.",

  paragraphs: [
    {
      text: "Am 4. September 1090 ging ein Mann durch die Tore der bestgesicherten Festung Persiens. Keine Armee im R\u00fccken. Kein Schwert in der Hand. Kein einziger Tropfen Blut am Boden. Die Festung hie\u00df Alamut \u2014 eine Burg auf einem Felsgrat, zweihundert Meter \u00fcber einem Tal, das so abgelegen war, dass Kartografen noch achthundert Jahre brauchten, um es richtig einzuzeichnen. Der Mann hie\u00df Hassan-i Sabbah. Und was er in dieser Nacht vollbrachte, war wom\u00f6glich die genialste verdeckte Macht\u00fcbernahme des gesamten Mittelalters.",
    },
    {
      text: "Hassan wurde um 1050 in Qom geboren, im heutigen Iran, und war von klein auf besessen von Wissen: Philosophie, Mathematik, Astronomie \u2014 alles, was er in die Finger bekam. Dann machte ihn ein lokaler Prediger mit dem ismailitischen Islam bekannt, einer Str\u00f6mung, die sich gegen die Seldschuken stellte \u2014 das t\u00fcrkische Gro\u00dfreich, das den Nahen Osten beherrschte. Hassan konvertierte und schwor dem fatimidischen Kalifen im fernen Kairo die Treue. \u00dcber Nacht wurde er zum Gejagten. Der seldschukische Gro\u00dfwesir ordnete pers\u00f6nlich seine Festnahme an.",
    },
    {
      text: "Hassan floh nach Kairo. Er studierte im legend\u00e4ren Haus der Weisheit, gewann das Vertrauen des Kalifen und stieg rasant auf. Doch die Palastintrigen holten ihn ein: Er legte sich mit den Falschen an, landete im Kerker und wurde aus \u00c4gypten geworfen. Auf der R\u00fcckreise erlitt er Schiffbruch, \u00fcberlebte und erreichte Persien 1081. Und dann tat er das Letzte, womit irgendjemand gerechnet h\u00e4tte. Statt sich zu verstecken, zog er neun Jahre lang verkleidet durch die Berge und baute ein geheimes Netzwerk von Anh\u00e4ngern auf \u2014 mit einem einzigen Ziel: eine uneinnehmbare Festung zu finden.",
    },
    {
      text: "Er fand sie im Tal von Alamut \u2014 ein schmaler gr\u00fcner Streifen, eingekeilt zwischen Gipfeln von dreitausend Metern, mit einem einzigen Pass, den der Schnee ein halbes Jahr lang unpassierbar machte. In der Mitte, auf einem zerkl\u00fcfteten Felsr\u00fccken, thronte die Burg. Hassan stellte keine Armee auf. Er schickte Prediger in die umliegenden D\u00f6rfer. Er schleuste Konvertiten als Wachen und Diener in die Festung ein. Er selbst lie\u00df sich als Lehrer in der N\u00e4he nieder und verbrachte zwei Jahre damit, das Vertrauen aller zu gewinnen. Jede Figur gesetzt mit chirurgischer Geduld.",
    },
    {
      text: "In jener Septembernacht ging Hassan durch die Tore, als k\u00e4me er nach Hause. Die Wachen kannten ihn. Die Diener auch. Der Burgherr, ein F\u00fcrst namens Mahdi, war verreist. Als er zur\u00fcckkam, gehorchten seine eigenen Leute bereits einem anderen. Hassan \u00fcberreichte ihm einen Wechsel \u00fcber dreitausend Golddinar \u2014 ein Verm\u00f6gen \u2014 als Bezahlung f\u00fcr die Burg. Umringt von M\u00e4nnern, die nicht mehr ihm folgten, nahm Mahdi das Geld und ging. Man sagt ja: Gut Ding will Weile haben. Neun Jahre Weile \u2014 und die bestgesicherte Festung Persiens wechselte den Besitzer, ohne dass ein einziges Schwert die Scheide verlie\u00df.",
    },
    {
      text: "Hassan verlie\u00df Alamut nie wieder. Vierunddrei\u00dfig Jahre lang, bis zu seinem Tod 1124, blieb er drinnen. Er verlie\u00df sein Zimmer nur zweimal \u2014 beide Male, um aufs Dach zu steigen. Er baute eine der gr\u00f6\u00dften Bibliotheken der islamischen Welt auf, weitete sein Netzwerk auf \u00fcber zweihundert Bergfestungen aus und bildete ergebene Agenten aus, deren gezielte Anschl\u00e4ge ihrem Namen \u2014 den Assassinen \u2014 einen festen Platz in jeder europ\u00e4ischen Sprache sicherten. Er lebte wie ein M\u00f6nch und starb wie ein Staatsgr\u00fcnder.",
    },
    {
      text: "Hassan hat keine Burg erobert. Er hat ihr klargemacht, dass sie ihm l\u00e4ngst geh\u00f6rte. Und das Adlernest, das sein Zuhause wurde \u2014 Alamut, aus dem Altpersischen f\u00fcr \u201eLehre des Adlers\u201c \u2014 hat seinen Herrn nie vergessen. Hundertsechsundsechzig Jahre lang nach jener Septembernacht konnte kein Imperium der Welt es zur\u00fcckerobern.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════
async function pushStory(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\nPushing ${label} ...`);

  // Validate JSON structure before pushing
  const required = [
    "siteId", "langStoryId", "storyId", "lang", "title", "subtitle",
    "excerpt", "moralOrLesson", "paragraphs", "icon", "storyCategory",
    "era", "tier", "isFree", "hasAudio", "readingTimeMinutes",
    "source", "characters", "updatedAt",
  ];
  for (const key of required) {
    if (item[key] === undefined || item[key] === null) {
      throw new Error(`Missing required field: ${key}`);
    }
  }
  if (!Array.isArray(item.paragraphs) || item.paragraphs.length === 0) {
    throw new Error("paragraphs must be a non-empty array");
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    if (!item.paragraphs[i].text || typeof item.paragraphs[i].text !== "string") {
      throw new Error(`paragraphs[${i}].text is missing or not a string`);
    }
  }

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) OR attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  SUCCESS: ${label} pushed to ${TABLE}`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  WARN: ${label} already exists. Overwriting...`);
      await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
      console.log(`  SUCCESS: ${label} overwritten in ${TABLE}`);
      return true;
    }
    console.error(`  FAILED: ${label} — ${err.message}`);
    throw err;
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Pushing Bloodless Conquest translations to DynamoDB");
  console.log(`  Timestamp: ${NOW}`);
  console.log("═══════════════════════════════════════════════════");

  const results = [];

  for (const item of [es, fr, de]) {
    const ok = await pushStory(item);
    results.push({ lang: item.lang, ok });
  }

  console.log("\n═══ SUMMARY ═══════════════════════════════════════");
  for (const r of results) {
    console.log(`  ${r.lang}: ${r.ok ? "OK" : "FAILED"}`);
  }
  console.log("═══════════════════════════════════════════════════");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
