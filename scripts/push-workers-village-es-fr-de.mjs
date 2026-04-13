import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// Shared fields (unchanged from English)
const shared = {
  siteId: "great-pyramids-giza",
  storyId: "workers-village-discovery",
  storyCategory: "crowns_conquests",
  icon: "\u2692\uFE0F",
  tier: "A",
  source: "Lehner, Mark. The Complete Pyramids. Thames & Hudson, 1997; Hawass, Zahi. Mountains of the Pharaohs, 2006",
  characters: [
    "Mark Lehner (Archaeologist)",
    "Zahi Hawass (Egyptologist)",
    "The Pyramid Workers",
  ],
  era: "Old Kingdom (rediscovered 1990)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 29.971, lng: 31.135 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════
// SPANISH
// ═══════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#workers-village-discovery",
  title: "La Gran Mentira de las Pir\u00e1mides",
  subtitle: "La verdad enterrada bajo la arena de Guiza",
  excerpt:
    "Durante siglos, el mundo entero crey\u00f3 que las pir\u00e1mides se construyeron a latigazos. La realidad estaba enterrada a cuatrocientos metros de la Esfinge, esperando a que un caballo tropezara.",
  moralOrLesson:
    "La verdad puede tardar milenios en salir a la luz, y muchas veces la historia real es m\u00e1s inspiradora que el mito al que reemplaza.",
  paragraphs: [
    {
      text: "Durante siglos, el mundo entero se trag\u00f3 una mentira. Her\u00f3doto, un historiador griego que escribi\u00f3 dos mil a\u00f1os despu\u00e9s de la Gran Pir\u00e1mide, asegur\u00f3 que el fara\u00f3n Keops oblig\u00f3 a cien mil hombres a trabajar como esclavos. Hollywood hizo el resto: escenas de prisioneros arrastrados por el desierto a punta de l\u00e1tigo. La historia b\u00edblica de los israelitas en Egipto se mezcl\u00f3 con la leyenda. Para el siglo XX, todo el mundo \u00absab\u00eda\u00bb que las pir\u00e1mides se levantaron sobre el sufrimiento humano. Todo el mundo estaba equivocado.",
    },
    {
      text: "Y entonces, en 1990, un caballo tropez\u00f3. Una turista americana paseaba cerca de la Esfinge cuando el animal tropez\u00f3 con un muro bajo de adobe que asomaba entre la arena, a unos cuatrocientos metros al sur. No parec\u00eda gran cosa \u2014 otra ruina m\u00e1s en un desierto lleno de ellas. Pero ese tropiezo estaba a punto de demoler todo lo que el mundo cre\u00eda saber sobre qui\u00e9nes construyeron realmente las pir\u00e1mides.",
    },
    {
      text: "Los arque\u00f3logos Mark Lehner y Zahi Hawass empezaron a excavar, y lo que encontraron dejaba sin palabras. Una ciudad entera, planificada, sepultada bajo la arena. Dormitorios, panader\u00edas, cervecer\u00edas, talleres de cobre, instalaciones para procesar pescado y hasta un hospital con pruebas de cirug\u00edas realizadas con precisi\u00f3n. Aquello no era un campo de esclavos. Era un pueblo de verdad, dise\u00f1ado para alojar a veinte mil trabajadores y mantenerlos alimentados, sanos y rindiendo al m\u00e1ximo.",
    },
    {
      text: "Esos trabajadores com\u00edan carne de res \u2014 un lujo que en el antiguo Egipto ning\u00fan esclavo habr\u00eda visto jam\u00e1s en su plato. Recib\u00edan raciones generosas de pan y cerveza, la comida habitual de los trabajadores libres egipcios. Cuando se lesionaban, los atend\u00edan de verdad: fracturas correctamente inmovilizadas, incluso amputaciones tras las cuales sobreviv\u00edan a\u00f1os. Nadie invierte ese tiempo y esos recursos en reparar esclavos. Eso se hace por gente que te importa.",
    },
    {
      text: "Pero el detalle que cerr\u00f3 el caso fue otro. Muchos trabajadores fueron enterrados en tumbas propias \u2014 peque\u00f1as, pero dignas \u2014 justo al lado de las pir\u00e1mides. En el antiguo Egipto, enterrar a un esclavo cerca del cuerpo sagrado del fara\u00f3n habr\u00eda sido impensable. Y algunas tumbas llevaban inscripciones con nombres de equipos como \u00abAmigos de Keops\u00bb y \u00abLos Borrachos de Micerino\u00bb. Esos no son nombres de miseria. Son el tipo de apodo orgulloso que los compa\u00f1eros de trabajo se ponen desde el principio de los tiempos.",
    },
    {
      text: "La realidad era algo que nadie se esperaba. Las pir\u00e1mides fueron un proyecto nacional \u2014 m\u00e1s parecido a un servicio obligatorio que a una condena. Los trabajadores ven\u00edan de pueblos de todo Egipto, cumpl\u00edan turnos de tres meses como una especie de impuesto laboral. Compet\u00edan entre equipos, sent\u00edan un orgullo feroz por su oficio y volv\u00edan a casa sabiendo que hab\u00edan ayudado a levantar la estructura m\u00e1s sagrada de su civilizaci\u00f3n. No era un castigo. Era lo m\u00e1s cerca que un egipcio com\u00fan pod\u00eda estar de tocar lo divino.",
    },
    {
      text: "Dicen que no hay mentira que cien a\u00f1os dure. Esta dur\u00f3 dos mil quinientos. Pero bast\u00f3 el tropiezo de un caballo para que se viniera abajo. Las pir\u00e1mides no se construyeron con crueldad \u2014 se construyeron con fe, con destreza y con una organizaci\u00f3n que todav\u00eda asombra. Millones de personas no fueron azotadas para levantarlas. Hicieron fila por la oportunidad de ser parte de algo m\u00e1s grande que ellos mismos \u2014 y crearon monumentos que han sobrevivido a todos los imperios desde entonces.",
    },
  ],
};

// ═══════════════════════════════════════════════
// FRENCH
// ═══════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#workers-village-discovery",
  title: "Le Grand Mensonge des Pyramides",
  subtitle: "La v\u00e9rit\u00e9 enfouie sous le sable de Gizeh",
  excerpt:
    "Pendant des si\u00e8cles, le monde a cru que les pyramides avaient \u00e9t\u00e9 b\u00e2ties \u00e0 coups de fouet. La v\u00e9rit\u00e9 dormait \u00e0 quatre cents m\u00e8tres du Sphinx \u2014 il a fallu un cheval au galop pour la r\u00e9veiller.",
  moralOrLesson:
    "La v\u00e9rit\u00e9 peut mettre des mill\u00e9naires \u00e0 remonter \u00e0 la surface, et la vraie histoire est souvent plus inspirante que le mythe qu\u2019elle remplace.",
  paragraphs: [
    {
      text: "Pendant des si\u00e8cles, le monde entier a gob\u00e9 un mensonge. H\u00e9rodote, un historien grec qui \u00e9crivait deux mille ans apr\u00e8s la construction de la Grande Pyramide, a affirm\u00e9 que le pharaon Kh\u00e9ops avait forc\u00e9 cent mille hommes \u00e0 travailler comme esclaves. Hollywood a fait le reste\u00a0: des prisonniers fouett\u00e9s, tra\u00eenant des pierres dans le d\u00e9sert, encha\u00een\u00e9s. L\u2019histoire biblique de l\u2019esclavage des Isra\u00e9lites en \u00c9gypte s\u2019est m\u00eal\u00e9e \u00e0 la l\u00e9gende. Au XX\u1d49 si\u00e8cle, tout le monde \u00ab\u00a0savait\u00a0\u00bb que les pyramides avaient \u00e9t\u00e9 b\u00e2ties dans la souffrance. Tout le monde avait tort.",
    },
    {
      text: "Et puis en 1990, un cheval a tr\u00e9buch\u00e9. Une touriste am\u00e9ricaine se promenait \u00e0 cheval pr\u00e8s du Sphinx quand sa monture a but\u00e9 sur un muret de briques crues qui d\u00e9passait du sable, \u00e0 environ quatre cents m\u00e8tres au sud. Rien de spectaculaire \u2014 une ruine de plus dans un d\u00e9sert qui en regorge. Mais ce faux pas allait pulv\u00e9riser tout ce que le monde croyait savoir sur les v\u00e9ritables b\u00e2tisseurs des pyramides.",
    },
    {
      text: "Les arch\u00e9ologues Mark Lehner et Zahi Hawass ont commenc\u00e9 \u00e0 creuser \u2014 et ce qu\u2019ils ont mis au jour \u00e9tait sid\u00e9rant. Une cit\u00e9 enti\u00e8re, planifi\u00e9e, ensevelie sous le sable. Des dortoirs, des boulangeries, des brasseries, des ateliers de cuivre, des installations de traitement du poisson, et m\u00eame un h\u00f4pital avec des traces d\u2019interventions chirurgicales parfaitement ex\u00e9cut\u00e9es. Ce n\u2019\u00e9tait pas un camp d\u2019esclaves. C\u2019\u00e9tait une vraie ville, con\u00e7ue pour loger vingt mille ouvriers et les maintenir nourris, soign\u00e9s et au sommet de leur forme.",
    },
    {
      text: "Ces ouvriers mangeaient du b\u0153uf \u2014 un luxe qu\u2019aucun esclave n\u2019aurait jamais vu dans son assiette en \u00c9gypte ancienne. Ils recevaient des rations g\u00e9n\u00e9reuses de pain et de bi\u00e8re, les repas courants des travailleurs libres \u00e9gyptiens. Quand ils se blessaient, on leur prodiguait de vrais soins\u00a0: fractures correctement immobilis\u00e9es, amputations apr\u00e8s lesquelles les ouvriers survivaient des ann\u00e9es. On ne consacre pas autant de temps et de ressources \u00e0 des esclaves. On fait \u00e7a pour des gens qui comptent.",
    },
    {
      text: "Mais le d\u00e9tail qui a tout scell\u00e9, c\u2019est celui-ci\u00a0: beaucoup d\u2019ouvriers ont \u00e9t\u00e9 enterr\u00e9s dans leurs propres tombes \u2014 modestes, mais dignes \u2014 juste \u00e0 c\u00f4t\u00e9 des pyramides. Dans l\u2019\u00c9gypte ancienne, enterrer un esclave pr\u00e8s du corps sacr\u00e9 du pharaon aurait \u00e9t\u00e9 impensable. Et certaines tombes portaient des noms d\u2019\u00e9quipes grav\u00e9s dans la pierre\u00a0: \u00ab\u00a0Les Amis de Kh\u00e9ops\u00a0\u00bb ou \u00ab\u00a0Les Ivrognes de Myk\u00e9rinos\u00a0\u00bb. Ce ne sont pas des noms de mis\u00e8re. Ce sont exactement le genre de surnoms que des coll\u00e8gues se donnent entre eux depuis la nuit des temps.",
    },
    {
      text: "La r\u00e9alit\u00e9, personne ne l\u2019avait vue venir. Les pyramides \u00e9taient un projet national \u2014 bien plus proche du service civil que d\u2019une condamnation. Les ouvriers venaient de villages de tout le pays, effectuaient des rotations de trois mois, une sorte d\u2019imp\u00f4t sur le travail. Ils rivalisaient entre \u00e9quipes, tiraient une fiert\u00e9 immense de leur savoir-faire et rentraient chez eux en sachant qu\u2019ils avaient contribu\u00e9 au monument le plus sacr\u00e9 de leur civilisation. Ce n\u2019\u00e9tait pas une punition. C\u2019\u00e9tait ce qu\u2019un \u00c9gyptien ordinaire pouvait faire de plus proche pour toucher le divin.",
    },
    {
      text: "Chassez le naturel, il revient au galop \u2014 et cette fois, c\u2019est litt\u00e9ralement au galop d\u2019un cheval qu\u2019il est revenu. Un faux pas, et un mensonge vieux de deux mille cinq cents ans s\u2019est effondr\u00e9. Les pyramides n\u2019ont pas \u00e9t\u00e9 b\u00e2ties par la cruaut\u00e9, mais par la foi, le savoir-faire et une organisation \u00e0 couper le souffle. Des millions de gens n\u2019ont pas \u00e9t\u00e9 fouett\u00e9s pour les construire. Ils se sont battus pour avoir la chance de participer \u00e0 quelque chose de plus grand qu\u2019eux \u2014 et ils ont \u00e9rig\u00e9 des monuments qui ont surv\u00e9cu \u00e0 tous les empires depuis.",
    },
  ],
};

// ═══════════════════════════════════════════════
// GERMAN
// ═══════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#workers-village-discovery",
  title: "Die Gro\u00dfe L\u00fcge der Pyramiden",
  subtitle: "Die Wahrheit unter dem Sand von Gizeh",
  excerpt:
    "Jahrhundertelang glaubte die Welt, die Pyramiden seien mit Peitschen gebaut worden. Die Wahrheit lag vierhundert Meter von der Sphinx entfernt \u2014 und brauchte ein stolperndes Pferd, um ans Licht zu kommen.",
  moralOrLesson:
    "Die Wahrheit kann Jahrtausende brauchen, um ans Licht zu kommen, und die wahre Geschichte ist oft inspirierender als der Mythos, den sie ersetzt.",
  paragraphs: [
    {
      text: "Jahrhundertelang hat die ganze Welt eine L\u00fcge geschluckt. Der griechische Geschichtsschreiber Herodot \u2014 der zweitausend Jahre nach dem Bau der Gro\u00dfen Pyramide schrieb \u2014 behauptete, Pharao Cheops habe hunderttausend M\u00e4nner als Sklaven zur Arbeit gezwungen. Hollywood erledigte den Rest: Gefangene in Ketten, die unter Peitschenhieben Steine durch die W\u00fcste schleppen. Die biblische Geschichte der israelitischen Sklaverei in \u00c4gypten vermischte sich mit der Pyramidenlegende. Im 20.\u00a0Jahrhundert \u201ewusste\u201c jeder, dass die Pyramiden auf menschlichem Leid errichtet worden waren. Jeder lag falsch.",
    },
    {
      text: "Dann stolperte 1990 ein Pferd. Eine amerikanische Touristin ritt in der N\u00e4he der Sphinx, als ihr Pferd \u00fcber eine niedrige Lehmziegelmauer stolperte, die etwa vierhundert Meter s\u00fcdlich aus dem Sand ragte. Nichts Besonderes \u2014 nur eine weitere Ruine in einer W\u00fcste voller Ruinen. Doch dieses Stolpern sollte alles zum Einsturz bringen, was die Welt \u00fcber die wahren Erbauer der Pyramiden zu wissen glaubte.",
    },
    {
      text: "Die Arch\u00e4ologen Mark Lehner und Zahi Hawass begannen zu graben \u2014 und was sie fanden, war atemberaubend. Eine komplette, durchgeplante Stadt, unter dem Sand begraben. Schlafr\u00e4ume, B\u00e4ckereien, Brauereien, Kupferwerkst\u00e4tten, Fischverarbeitungsanlagen und sogar ein Krankenhaus mit Spuren fachkundig durchgef\u00fchrter Operationen. Das war kein Sklavenlager. Das war eine echte Stadt, gebaut f\u00fcr bis zu zwanzigtausend Arbeiter \u2014 damit sie satt, gesund und leistungsf\u00e4hig blieben.",
    },
    {
      text: "Diese Arbeiter a\u00dfen Rindfleisch \u2014 im alten \u00c4gypten ein Luxus, den kein Sklave jemals auf seinem Teller gesehen h\u00e4tte. Sie bekamen gro\u00dfz\u00fcgige Rationen Brot und Bier, die Standardmahlzeiten freier \u00e4gyptischer Arbeiter. Wenn sie sich verletzten, erhielten sie echte medizinische Versorgung: sauber geschiente Knochenbr\u00fcche, sogar Amputationen, die die Arbeiter um Jahre \u00fcberlebten. So viel Zeit und Aufwand steckt man nicht in Sklaven. Das tut man f\u00fcr Menschen, die einem etwas wert sind.",
    },
    {
      text: "Aber ein Detail besiegelte alles. Viele Arbeiter wurden in eigenen Gr\u00e4bern bestattet \u2014 klein, aber w\u00fcrdevoll \u2014 direkt neben den Pyramiden. Im alten \u00c4gypten w\u00e4re es undenkbar gewesen, einen Sklaven in der N\u00e4he des heiligen Leichnams des Pharaos zu begraben. Und manche Gr\u00e4ber trugen Inschriften mit Teamnamen wie \u201eFreunde des Cheops\u201c und \u201eDie Trinker des Mykerinos\u201c. Das sind keine Namen des Elends. Das sind genau die Art von stolzen Spitznamen, die sich Arbeitskollegen seit Anbeginn der Zeit geben.",
    },
    {
      text: "Die Wirklichkeit war etwas, womit niemand gerechnet hatte. Die Pyramiden waren ein nationales Gro\u00dfprojekt \u2014 eher vergleichbar mit einer Dienstpflicht als mit einem Todesurteil. Arbeiter kamen aus D\u00f6rfern im ganzen Land und leisteten dreimonatige Schichten als eine Art Arbeitssteuer. Sie wetteiferten zwischen den Teams, waren m\u00e4chtig stolz auf ihr Handwerk und gingen nach Hause im Wissen, am heiligsten Bauwerk ihrer Zivilisation mitgewirkt zu haben. Das war keine Strafe. Es war das N\u00e4chste, was ein gew\u00f6hnlicher \u00c4gypter dem G\u00f6ttlichen kommen konnte.",
    },
    {
      text: "Man sagt, L\u00fcgen haben kurze Beine. Diese L\u00fcge ist zweitausendf\u00fcnfhundert Jahre gelaufen. Doch es brauchte nur ein stolperndes Pferd, um sie zu Fall zu bringen. Die Pyramiden wurden nicht durch Grausamkeit errichtet \u2014 sondern durch Glauben, K\u00f6nnen und eine Organisation, die einem den Atem raubt. Millionen von Menschen wurden nicht zur Arbeit gepeitscht. Sie haben sich darum gerissen, Teil von etwas Gr\u00f6\u00dferem zu sein \u2014 und sie schufen Monumente, die jedes Imperium seither \u00fcberdauert haben.",
    },
  ],
};

async function pushItem(item, langLabel) {
  console.log(`\nPushing ${langLabel} version...`);
  console.log(`  siteId: ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title: ${item.title}`);
  console.log(`  paragraphs: ${item.paragraphs.length}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✅ ${langLabel} pushed successfully!`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `  ⚠️  ${langLabel} already exists. Overwriting with updated version...`
      );
      await docClient.send(
        new PutCommand({
          TableName: TABLE,
          Item: item,
        })
      );
      console.log(`  ✅ ${langLabel} overwritten successfully!`);
      return true;
    }
    console.error(`  ❌ ${langLabel} FAILED:`, err.message);
    return false;
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("Pushing Workers' Village Discovery — ES, FR, DE");
  console.log(`Timestamp: ${NOW}`);
  console.log("═══════════════════════════════════════════════");

  const results = [];
  results.push(await pushItem(es, "SPANISH (es)"));
  results.push(await pushItem(fr, "FRENCH (fr)"));
  results.push(await pushItem(de, "GERMAN (de)"));

  console.log("\n═══════════════════════════════════════════════");
  if (results.every(Boolean)) {
    console.log("🎉 All 3 languages pushed successfully!");
  } else {
    console.log("⚠️  Some pushes failed. See errors above.");
    process.exit(1);
  }
}

main();
