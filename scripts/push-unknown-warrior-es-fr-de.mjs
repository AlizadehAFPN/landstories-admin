import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (from English record) ───
const shared = {
  siteId: { S: "westminster-abbey" },
  storyId: { S: "the-unknown-warrior" },
  storyCategory: { S: "crowns_conquests" },
  icon: { S: "🎖️" },
  tier: { S: "A" },
  era: { S: "1920 AD — Aftermath of the Great War" },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  coordinates: { M: { lng: { N: "-0.1273" }, lat: { N: "51.4993" } } },
  source: {
    S: "Westminster Abbey archives, Reverend David Railton's papers, Michael Gavaghan's \"The Story of the Unknown Warrior\" (1995), Imperial War Museum records, Hansard parliamentary debates (1920)",
  },
  characters: {
    L: [
      { S: "The Unknown Warrior — An unidentified British soldier of the Great War" },
      { S: "Reverend David Railton — Army chaplain who conceived the idea after seeing an unmarked grave in Armentières" },
      { S: "Brigadier General L.J. Wyatt — The officer who chose the body from six candidates at midnight" },
      { S: "King George V — Who walked behind the coffin and scattered French soil into the grave" },
      { S: "Herbert Ryle — Dean of Westminster, who championed the proposal and composed the inscription" },
      { S: "David Lloyd George — Prime Minister who gave final approval for the burial" },
    ],
  },
  updatedAt: { N: String(NOW) },
};

// ─── SPANISH ───
const es = {
  ...shared,
  lang: { S: "es" },
  langStoryId: { S: "es#the-unknown-warrior" },
  title: { S: "El soldado sin nombre" },
  subtitle: {
    S: "La tumba más sagrada de Inglaterra pertenece a alguien que nadie podrá identificar jamás",
  },
  excerpt: {
    S: "Le dieron madera de reyes a un hombre sin nombre. Le pusieron una espada de cruzado sobre el pecho a un soldado de la era de las ametralladoras. Y cerraron el ataúd para siempre.",
  },
  moralOrLesson: {
    S: "La verdadera grandeza no necesita nombre. A veces, el mayor honor es representar a todos los que nunca pudieron recibir uno.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "En 1916, un capellán del ejército británico llamado David Railton caminaba entre las tumbas improvisadas detrás del frente en Armentières, Francia. La Primera Guerra Mundial llevaba dos años devorando vidas. Una cruz lo detuvo en seco. Decía simplemente: «Un soldado británico desconocido.» Sin nombre. Sin rango. Sin pueblo natal. Solo un hombre que lo dio todo y desapareció en el barro. Esa imagen se le grabó a fuego. Años después, cambiaría para siempre la forma en que todo un país recuerda a sus muertos.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Cuando la guerra terminó en 1918, las cifras eran brutales. Casi un millón de soldados británicos muertos. Cientos de miles más habían desaparecido — destrozados por la artillería, tragados por el fango de las trincheras, perdidos sin dejar rastro. Miles de familias no tenían un cuerpo que enterrar ni una tumba que visitar. Entonces Railton escribió al Deán de la Abadía de Westminster con una idea audaz: traer a un soldado sin identificar y enterrarlo con los máximos honores que la nación pudiera dar. Entre los reyes.",
          },
        },
      },
      {
        M: {
          text: {
            S: "La noche del 7 de noviembre de 1920, seis cuerpos sin identificar fueron desenterrados en silencio de los campos de batalla de Francia y Bélgica. Cada uno fue colocado en un saco idéntico y llevado a una capilla en St Pol. A medianoche, el general Wyatt entró solo. Señaló uno. Eso fue todo. Los otros cinco fueron enterrados de nuevo con honores. A partir de ese momento, nadie podría saber jamás quién era el elegido. Y ese era exactamente el punto.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Le dieron madera de roble del Palacio de Hampton Court — madera de reyes para un hombre sin nombre. Sobre la tapa colocaron una espada de cruzado de la Torre de Londres. Un arma de la época de los caballeros, descansando sobre el pecho de un soldado de la era de las ametralladoras. Un escudo de hierro decía: «Un guerrero británico caído en la Gran Guerra 1914–1918, por el Rey y la Patria.» El ataúd fue sellado para siempre. Su nombre, su edad, la batalla que lo mató — todo quedó encerrado para siempre.",
          },
        },
      },
      {
        M: {
          text: {
            S: "El 11 de noviembre de 1920 — exactamente dos años después de que las armas callaran — el ataúd cruzó Londres sobre un carro de artillería tirado por seis caballos negros. El rey Jorge V caminaba detrás. Cientos de miles de personas llenaban las calles en silencio. Muchos lloraban. Algunos apretaban entre las manos fotos de sus propios hijos desaparecidos. En la Abadía de Westminster, soldados condecorados con la Cruz Victoria — el mayor honor militar británico — cargaron el ataúd por la gran puerta.",
          },
        },
      },
      {
        M: {
          text: {
            S: "El Rey esparció tierra francesa dentro de la tumba abierta. La llenaron con cien sacos de tierra de los campos de batalla de Francia y Bélgica, para que el Guerrero Desconocido descansara en el mismo suelo que murió defendiendo. Una losa de mármol negro belga fue colocada en el piso con unas palabras que se volverían célebres: «Lo enterraron entre los reyes porque había hecho el bien ante Dios y ante su casa.»",
          },
        },
      },
      {
        M: {
          text: {
            S: "Esa tumba se convirtió en el lugar más sagrado de Gran Bretaña. Es la única tumba de la Abadía que nadie puede pisar — ni turistas, ni sacerdotes, ni siquiera el Rey. En 1923, cuando Lady Elizabeth Bowes-Lyon se casó con el futuro Jorge VI, dejó su ramo de novia sobre la losa por su hermano, muerto en las trincheras. Desde entonces, cada novia real en la Abadía hace lo mismo. Estados Unidos le otorgó la Medalla de Honor, convirtiendo a un hombre sin nombre en uno de los soldados más condecorados de la historia.",
          },
        },
      },
      {
        M: {
          text: {
            S: "La Abadía de Westminster guarda los restos de reyes, reinas, científicos y poetas — siglos enteros de los nombres más grandes de Inglaterra. Pero el lugar más honrado del edificio pertenece a alguien cuyo nombre nadie conocerá jamás. Pudo haber sido un obrero, un maestro de escuela, el hijo de un granjero. Porque nadie es más que nadie — y precisamente por eso un desconocido ganó su lugar entre los reyes. No lo honran por quién fue. Lo honran por todos los que representa: cada vida truncada, cada nombre perdido en el barro, cada familia que nunca pudo despedirse.",
          },
        },
      },
    ],
  },
};

// ─── FRENCH ───
const fr = {
  ...shared,
  lang: { S: "fr" },
  langStoryId: { S: "fr#the-unknown-warrior" },
  title: { S: "Le Soldat sans nom" },
  subtitle: {
    S: "Comment un inconnu est devenu le mort le plus honoré de Grande-Bretagne",
  },
  excerpt: {
    S: "On l'a enterré parmi les rois — parce que personne ne saura jamais son nom. Il pourrait être n'importe qui. Il est donc tout le monde.",
  },
  moralOrLesson: {
    S: "La grandeur n'a pas besoin de nom. Parfois, c'est l'anonymat qui rend un hommage universel.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "En 1916, un aumônier britannique du nom de David Railton traverse un cimetière de fortune près d'Armentières. La guerre dure depuis deux ans. Les morts s'entassent. Une croix l'arrête net. Elle dit simplement : « Un soldat britannique inconnu. » Pas de nom. Pas de grade. Pas de village natal. Juste un homme effacé par la boue. Nous, en France, on connaît ce vertige — notre Soldat inconnu repose sous l'Arc de Triomphe. Mais cette histoire-là est celle des Britanniques. Et elle commence ici, dans la boue du Nord.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Quand le silence revient en 1918, le bilan est monstrueux. Près d'un million de soldats britanniques sont morts. Des centaines de milliers ont disparu — pulvérisés par les obus, avalés par la terre des tranchées. Des familles entières n'ont ni corps à pleurer, ni tombe à fleurir. Alors Railton écrit au doyen de l'abbaye de Westminster avec une idée folle : ramener un seul soldat non identifié et lui offrir des funérailles dignes d'un roi. Littéralement — l'enterrer parmi les rois.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Le 7 novembre 1920, à la nuit tombée, six corps de soldats inconnus sont exhumés des champs de bataille de France et de Belgique. Six sacs identiques, alignés dans une chapelle de Saint-Pol-sur-Ternoise. À minuit, le général Wyatt entre seul. Il désigne un corps. C'est tout. Les cinq autres sont réinhumés avec les honneurs. À partir de cet instant, personne ne pourra jamais savoir qui est cet homme. Et c'est précisément le but.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Le cercueil est taillé dans du chêne de Hampton Court — du bois royal pour un homme sans nom. Sur le couvercle, on dépose une épée de croisé venue de la Tour de Londres. Une arme du temps des chevaliers, posée sur la poitrine d'un soldat de l'ère des mitrailleuses. Un bouclier de fer porte ces mots : « Un guerrier britannique tombé lors de la Grande Guerre, pour le Roi et la Patrie. » Puis le cercueil est scellé. Pour toujours. Son nom, son âge, la bataille qui l'a tué — enfermés à jamais.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Le 11 novembre 1920, deux ans jour pour jour après l'armistice, le cercueil traverse Londres sur un affût de canon tiré par six chevaux noirs. Le roi George V marche derrière. Des centaines de milliers de personnes bordent les rues en silence. Beaucoup pleurent. Certains serrent contre eux la photo d'un fils disparu. À Westminster, des titulaires de la Victoria Cross — la plus haute distinction militaire britannique — portent le cercueil à travers la grande porte ouest.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Le roi jette de la terre française dans la fosse ouverte. Cent sacs de sable remplis de terre des champs de bataille de France et de Belgique comblent la tombe. Le Guerrier inconnu reposera dans le sol même qu'il est mort en défendant. Une dalle de marbre noir de Belgique est posée, gravée de mots devenus célèbres : « On l'a enterré parmi les rois, car il avait bien agi envers Dieu et envers sa maison. »",
          },
        },
      },
      {
        M: {
          text: {
            S: "Cette tombe est devenue le lieu le plus sacré de Grande-Bretagne. C'est la seule dans l'abbaye sur laquelle personne n'a le droit de marcher — ni les touristes, ni les prêtres, ni même le roi. En 1923, Lady Elizabeth Bowes-Lyon y a déposé son bouquet de mariée en mémoire de son frère, tué dans les tranchées. Depuis, chaque mariée royale fait pareil. Les États-Unis lui ont décerné leur Medal of Honor. Un homme sans nom est devenu l'un des soldats les plus décorés de l'histoire.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Westminster abrite les tombes de rois, de reines, de savants et de poètes — des siècles de gloire britannique gravés dans la pierre. Mais l'endroit le plus honoré de tout l'édifice appartient à quelqu'un dont personne ne connaîtra jamais le nom. Il était peut-être ouvrier, instituteur, fils de fermier. C'est exactement le but. On dit que les petits ruisseaux font les grandes rivières — ici, c'est l'inverse. Un fleuve entier de deuil, condensé dans un seul homme. Il n'est pas honoré pour ce qu'il était. Il l'est pour tous ceux qu'il représente.",
          },
        },
      },
    ],
  },
};

// ─── GERMAN ───
const de = {
  ...shared,
  lang: { S: "de" },
  langStoryId: { S: "de#the-unknown-warrior" },
  title: { S: "Der Soldat ohne Namen" },
  subtitle: {
    S: "Wie ein Namenloser zum meistgeehrten Toten Großbritanniens wurde",
  },
  excerpt: {
    S: "Man bettete ihn zwischen Könige — weil niemand wusste, wer er war. Genau das war der Sinn.",
  },
  moralOrLesson: {
    S: "Wahre Größe braucht keinen Namen. Manchmal ehrt man einen Einzelnen am meisten, indem man ihn für alle stehen lässt.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Frankreich, 1916. Der britische Militärpfarrer David Railton geht über einen Friedhof hinter der Front bei Armentières. Überall Gräber, hastig ausgehoben, namenlose Kreuze. Eines bringt ihn zum Stehen. Darauf steht nur: „Ein unbekannter britischer Soldat.” Kein Name. Kein Rang. Kein Heimatort. Nur ein Mensch, der alles gegeben hat und im Schlamm verschwunden ist. Dieses Bild ließ Railton nie wieder los. Es sollte verändern, wie eine ganze Nation ihrer Toten gedenkt.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Als der Krieg 1918 endete, waren die Zahlen unfassbar. Fast eine Million britische Soldaten tot. Hunderttausende spurlos verschwunden — zerrissen von Granaten, verschluckt vom Schlamm der Schützengräben. Familien ohne Leichnam, ohne Grab, ohne Abschied. Der Krieg hatte auf allen Seiten dasselbe angerichtet — ob in London oder Berlin, die Trauer war die gleiche. Railton schrieb dem Dekan von Westminster Abbey: Man solle einen unbekannten Soldaten heimholen und ihn mit höchsten Ehren beisetzen. Zwischen den Königen.",
          },
        },
      },
      {
        M: {
          text: {
            S: "In der Nacht des 7. November 1920 wurden sechs nicht identifizierte britische Gefallene von Schlachtfeldern in Frankreich und Belgien geborgen. Jeder kam in einen identischen Sack, gebracht in eine Kapelle bei St. Pol. Um Mitternacht betrat Brigadegeneral Wyatt den Raum. Allein. Er zeigte auf einen. Das war's. Die anderen fünf wurden mit Ehren wieder bestattet. Ab diesem Moment konnte niemand mehr wissen, wen er gewählt hatte. Und genau darum ging es.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Der Sarg wurde aus Eichenholz von Hampton Court Palace gefertigt — königliches Holz für einen Mann ohne Namen. Auf den Deckel legte man ein Kreuzritterschwert aus dem Tower of London. Eine Waffe aus der Zeit der Ritter, auf der Brust eines Soldaten aus der Zeit der Maschinengewehre. Ein eiserner Schild trug die Inschrift: „Ein britischer Krieger, gefallen im Großen Krieg 1914–1918.” Der Sarg wurde für immer versiegelt. Name, Alter, die Schlacht, die ihn tötete — auf ewig verschlossen.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Am 11. November 1920 — genau zwei Jahre, nachdem die Waffen schwiegen — rollte der Sarg auf einer Lafette durch London, gezogen von sechs schwarzen Pferden. König George V. ging zu Fuß dahinter. Hunderttausende säumten die Straßen, still, viele weinend, manche mit Fotos ihrer eigenen vermissten Söhne in den Händen. An der Westminster Abbey trugen Träger des Victoria Cross — der höchsten britischen Auszeichnung für Tapferkeit — den Sarg durch das große Westtor.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Der König streute französische Erde ins offene Grab. Hundert Sandsäcke mit Erde von den Schlachtfeldern Frankreichs und Belgiens füllten es auf — damit der Unbekannte Krieger in genau dem Boden ruhen würde, für den er gestorben war. Der Tod hatte sie alle gleich gemacht — die Offiziere und die einfachen Soldaten, die Helden und die Vergessenen. Doch dieses eine Grab machte aus der Gleichheit etwas Heiliges. In den Boden wurde schwarzer belgischer Marmor eingelassen, mit Worten, die seither jeder Brite kennt.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Dieses Grab wurde zum heiligsten Ort Großbritanniens. Es ist das einzige Grab in der Abbey, über das niemand gehen darf — kein Tourist, kein Priester, nicht einmal der König. Als Lady Elizabeth 1923 den späteren König George VI. heiratete, legte sie ihren Brautstrauß darauf — für ihren Bruder, gefallen in den Schützengräben. Seitdem tun es alle königlichen Bräute ihr nach. Die USA verliehen dem Namenlosen ihre Medal of Honor. Ein Mann ohne Identität wurde einer der meistgeehrten Soldaten der Geschichte.",
          },
        },
      },
      {
        M: {
          text: {
            S: "In Westminster Abbey liegen Könige, Königinnen, Wissenschaftler, Dichter — Jahrhunderte britischer Größe, vereint unter einem Dach. Doch der am meisten geehrte Platz gehört jemandem, dessen Namen niemand je erfahren wird. Er könnte ein Fabrikarbeiter gewesen sein, ein Lehrer, ein Bauernsohn. Man bettete ihn zwischen Könige — nicht für das, was er war, sondern für alle, die er vertritt. Jedes Leben, das zu früh endete. Jeden Namen, den der Schlamm verschlang. Jede Familie, die sich nie verabschieden konnte.",
          },
        },
      },
    ],
  },
};

// ─── Push all three ───
async function pushStory(item, langLabel) {
  try {
    await client.send(
      new PutItemCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${langLabel} pushed successfully`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(
        `⚠️  ${langLabel} already exists — skipping to avoid overwrite`
      );
    } else {
      console.error(`❌ ${langLabel} FAILED:`, err.message);
      process.exit(1);
    }
  }
}

async function main() {
  console.log(`Timestamp: ${NOW}`);
  console.log("Pushing 3 language versions of 'The Unknown Warrior'...\n");

  await pushStory(es, "ES (Spanish)");
  await pushStory(fr, "FR (French)");
  await pushStory(de, "DE (German)");

  console.log("\nDone.");
}

main();
