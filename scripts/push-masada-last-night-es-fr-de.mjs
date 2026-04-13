import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";

const baseItem = {
  siteId: "masada",
  storyId: "last-night-on-masada",
  icon: "\u2694\uFE0F",
  tier: "S",
  source: "Josephus, Flavius. Bellum Judaicum (The Jewish War), Book VII, chapters 252-406; Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; Magness, Jodi. Masada: From Jewish Revolt to Modern Myth, Princeton University Press, 2019; Cohen, Shaye J.D. 'Masada: Literary Tradition, Archaeological Remains, and the Credibility of Josephus,' Journal of Jewish Studies 33, 1982",
  characters: [
    "Eleazar ben Ya'ir -- leader of the Sicarii defenders",
    "Flavius Josephus -- Jewish-Roman historian, sole source of the account",
    "Two unnamed women -- survivors who hid in a cistern with five children",
    "Lucius Flavius Silva -- Roman commander of the besieging Tenth Legion",
    "The 960 defenders -- men, women, and children of the last Jewish stronghold",
  ],
  era: "73 or 74 CE -- the final chapter of the First Jewish-Roman War",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 35.3536, lat: 31.3156 },
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  updatedAt: Math.floor(Date.now() / 1000),
};

// ═══════════════════════════════════════════════════════
//  SPANISH (es)
// ═══════════════════════════════════════════════════════
const esItem = {
  ...baseItem,
  lang: "es",
  langStoryId: "es#last-night-on-masada",
  title: "La \u00FAltima noche en Masada",
  subtitle:
    "960 defensores jud\u00EDos eligieron la muerte antes que la esclavitud romana, sorteando qui\u00E9n acabar\u00EDa con sus vidas en la resistencia final m\u00E1s sobrecogedora de la historia",
  excerpt:
    "La \u00FAltima noche, con la rampa terminada y los muros abiertos, el l\u00EDder de los 960 defensores jud\u00EDos se levant\u00F3 para hablar. Lo que propuso resonar\u00EDa durante dos mil a\u00F1os.",
  moralOrLesson:
    "La libertad no es simplemente la ausencia de cadenas \u2014 es el derecho soberano a elegir tu propio destino, incluso cuando todos los caminos llevan a la oscuridad. La medida de un pueblo no es si sobrevive, sino si se niega a entregar aquello que hace que sobrevivir merezca la pena.",
  paragraphs: [
    {
      text: "Primavera del a\u00F1o 73. La D\u00E9cima Legi\u00F3n de Roma llevaba meses construyendo una rampa para alcanzar Masada, una fortaleza en lo alto de un acantilado sobre el Mar Muerto. Reventaron la muralla exterior. Los defensores levantaron otra de madera rellena de tierra. Roma le prendi\u00F3 fuego. El viento empuj\u00F3 las llamas contra la torre de asedio romana un instante, pero luego gir\u00F3. Al caer la noche, no quedaba nada. Diez mil soldados esperaban el amanecer. Ya no hab\u00EDa muros. Solo una decisi\u00F3n.",
    },
    {
      text: "No eran refugiados cualquiera. Eran los sicarios \u2014 los \u00ABhombres de la daga\u00BB \u2014 la facci\u00F3n rebelde jud\u00EDa m\u00E1s radical. Siete a\u00F1os antes, soldados romanos hab\u00EDan saqueado el Templo de Jerusal\u00E9n y masacrado civiles. Judea se levant\u00F3 en armas. Los rebeldes consiguieron victorias tempranas y destruyeron una legi\u00F3n entera. Roma respondi\u00F3 con sesenta mil soldados. Cayeron todas las fortalezas. Jerusal\u00E9n ardi\u00F3. El Templo fue destruido. Masada era el \u00FAltimo basti\u00F3n: 960 personas sobre una fortaleza junto al Mar Muerto, sobreviviendo con provisiones de un siglo que hab\u00EDa dejado el rey Herodes.",
    },
    {
      text: "Esa noche, su l\u00EDder Eleazar ben Ya\u2019ir reuni\u00F3 a todos en el palacio de Herodes. Todo lo que sabemos viene de Flavio Josefo \u2014 un comandante jud\u00EDo que se pas\u00F3 al bando romano y escribi\u00F3 la \u00FAnica cr\u00F3nica que sobrevivi\u00F3. Seg\u00FAn \u00E9l, Eleazar dio dos discursos. Describi\u00F3 lo que les esperaba: los hombres morir\u00EDan en minas y circos romanos, las mujeres ser\u00EDan violadas, los ni\u00F1os criados como esclavos. \u00ABQue nuestras esposas mueran sin ser ultrajadas\u00BB, dijo. \u00ABQue nuestros hijos no conozcan jam\u00E1s la esclavitud.\u00BB No les ped\u00EDa rendirse. Les ped\u00EDa tomar la \u00FAltima decisi\u00F3n libre que tendr\u00EDan en su vida.",
    },
    {
      text: "Hubo llanto. Hombres que abrazaban a sus mujeres y no pod\u00EDan soltarlas. Pero Eleazar insisti\u00F3. Mirad alrededor, les dijo: el muro ardiendo, los campamentos romanos cercando la base como una soga al cuello. No hab\u00EDa nada que negociar. Roma no perdonaba rebeldes. Roma daba ejemplo. Todos recordaban las crucifixiones tras la ca\u00EDda de Jerusal\u00E9n \u2014 tantas que a los soldados se les acab\u00F3 la madera para las cruces. Jud\u00EDos capturados hab\u00EDan sido paseados por las calles de Roma como trofeos. No fue de golpe. No fue sin l\u00E1grimas. Pero aceptaron.",
    },
    {
      text: "Lo que sigui\u00F3 fue met\u00F3dico. La ley jud\u00EDa proh\u00EDbe el suicidio, y ellos lo sab\u00EDan. As\u00ED que idearon un sistema en el que solo una persona tendr\u00EDa que quitarse la vida. Cada hombre fue con su familia, los abraz\u00F3 y los mat\u00F3. Quemaron todas sus posesiones, pero dejaron intactas las reservas de comida \u2014 un mensaje para Roma: no morimos de hambre, elegimos esto. Diez hombres fueron sorteados para matar al resto. Esos diez volvieron a echar suertes. El \u00FAltimo prendi\u00F3 fuego al palacio y se atraves\u00F3 con su propia espada.",
    },
    {
      text: "Al amanecer, los soldados entraron en tromba por la brecha \u2014 escudos trabados, espadas en alto, preparados para el peor combate de sus vidas. Encontraron silencio. Josefo lo describe como \u00ABuna soledad espantosa por todos lados, con un fuego dentro del palacio\u00BB. Gritaron. Golpearon los escudos con las espadas. Nada. Hasta que dos mujeres y cinco ni\u00F1os salieron arrastr\u00E1ndose de una cisterna oculta. Una era pariente de Eleazar. Les cont\u00F3 todo a los romanos. Aquellos veteranos \u2014 los mismos que hab\u00EDan incendiado el Templo de Jerusal\u00E9n \u2014 se quedaron sin palabras ante los muertos.",
    },
    {
      text: "Y aqu\u00ED viene lo extra\u00F1o: durante dos mil a\u00F1os, los rabinos que dieron forma al juda\u00EDsmo jam\u00E1s mencionaron Masada. Ni una sola vez. Eligieron otro h\u00E9roe \u2014 un sabio que negoci\u00F3 su salida de Jerusal\u00E9n sitiada y construy\u00F3 una tradici\u00F3n de estudio que sobrevivi\u00F3 sin templo ni patria. Las espadas y el fuego de Masada eran todo lo que rechazaban. Pero la historia sobrevivi\u00F3. Dicen que a la tercera va la vencida: Roma derrib\u00F3 un muro, quem\u00F3 otro, y a la tercera encontr\u00F3 silencio. Un silencio \u2014 el de un pueblo que prefiri\u00F3 morir a arrodillarse \u2014 que sigue resonando en la meseta, sin respuesta posible.",
    },
  ],
};

// ═══════════════════════════════════════════════════════
//  FRENCH (fr)
// ═══════════════════════════════════════════════════════
const frItem = {
  ...baseItem,
  lang: "fr",
  langStoryId: "fr#last-night-on-masada",
  title: "La derni\u00E8re nuit \u00E0 Masada",
  subtitle:
    "960 d\u00E9fenseurs juifs ont choisi la mort plut\u00F4t que l\u2019esclavage romain, tirant au sort les ex\u00E9cuteurs dans la r\u00E9sistance finale la plus gla\u00E7ante de l\u2019Histoire",
  excerpt:
    "La derni\u00E8re nuit, la rampe achev\u00E9e et les murs perc\u00E9s, le chef des 960 d\u00E9fenseurs juifs se leva pour parler. Ce qu\u2019il proposa allait r\u00E9sonner pendant deux mille ans.",
  moralOrLesson:
    "La libert\u00E9 n\u2019est pas simplement l\u2019absence de cha\u00EEnes \u2014 c\u2019est le droit souverain de choisir son propre destin, m\u00EAme quand tous les chemins m\u00E8nent \u00E0 l\u2019obscurit\u00E9. La mesure d\u2019un peuple ne tient pas \u00E0 sa survie, mais \u00E0 son refus d\u2019abandonner ce qui rend cette survie digne d\u2019\u00EAtre v\u00E9cue.",
  paragraphs: [
    {
      text: "Printemps de l\u2019an 73. La Dixi\u00E8me L\u00E9gion de Rome venait de passer des mois \u00E0 b\u00E2tir une rampe pour atteindre les remparts de Masada, une forteresse perch\u00E9e au sommet d\u2019une falaise au-dessus de la mer Morte. Quand ils perc\u00E8rent enfin la muraille ext\u00E9rieure, les d\u00E9fenseurs dress\u00E8rent un second mur de bois et de terre. Les Romains y mirent le feu. Le vent poussa bri\u00E8vement les flammes vers leur propre tour de si\u00E8ge \u2014 puis il tourna. \u00C0 la tomb\u00E9e de la nuit, le mur n\u2019\u00E9tait plus. Dix mille soldats attendaient l\u2019aube. Plus de remparts. Seulement un choix.",
    },
    {
      text: "Ces gens n\u2019\u00E9taient pas des r\u00E9fugi\u00E9s ordinaires. C\u2019\u00E9taient les Sicaires \u2014 les \u00AB hommes au poignard \u00BB \u2014 la faction rebelle juive la plus radicale. Sept ans plus t\u00F4t, des soldats romains avaient pill\u00E9 le Temple de J\u00E9rusalem et massacr\u00E9 des civils. La Jud\u00E9e s\u2019\u00E9tait soulev\u00E9e. Les rebelles remport\u00E8rent les premi\u00E8res batailles, an\u00E9antissant une l\u00E9gion enti\u00E8re. Rome envoya soixante mille hommes. Toutes les forteresses tomb\u00E8rent. J\u00E9rusalem br\u00FBla. Le Temple fut d\u00E9truit. Masada restait le dernier bastion : 960 personnes dans une forteresse au-dessus de la mer Morte, survivant gr\u00E2ce \u00E0 des r\u00E9serves vieilles d\u2019un si\u00E8cle laiss\u00E9es par le roi H\u00E9rode.",
    },
    {
      text: "Cette nuit-l\u00E0, leur chef \u00C9l\u00E9azar ben Ya\u00EFr rassembla tout le monde dans le palais d\u2019H\u00E9rode. Tout ce que nous savons vient de Flavius Jos\u00E8phe \u2014 un commandant juif pass\u00E9 du c\u00F4t\u00E9 romain, auteur du seul r\u00E9cit parvenu jusqu\u2019\u00E0 nous. Selon lui, \u00C9l\u00E9azar pronon\u00E7a deux discours. Il d\u00E9crivit ce qui les attendait : les hommes mourraient dans les mines et les ar\u00E8nes, les femmes seraient viol\u00E9es, les enfants \u00E9lev\u00E9s comme esclaves. \u00AB Que nos femmes meurent sans \u00EAtre souill\u00E9es, dit-il. Que nos enfants ne connaissent jamais l\u2019esclavage. \u00BB Il ne leur demandait pas d\u2019abandonner. Il leur proposait le dernier acte libre de leur existence.",
    },
    {
      text: "Des hommes pleur\u00E8rent. Certains serraient leurs femmes contre eux, incapables de les l\u00E2cher. Mais \u00C9l\u00E9azar insista. Regardez autour de vous, leur dit-il \u2014 le mur en flammes, les camps romains encerclant la base comme un n\u0153ud coulant. Il n\u2019y avait rien \u00E0 n\u00E9gocier. Rome ne montrait aucune piti\u00E9 aux rebelles. Rome faisait des exemples. Tout le monde se souvenait des crucifixions apr\u00E8s la chute de J\u00E9rusalem \u2014 si nombreuses que les soldats manqu\u00E8rent de bois pour les croix. Les prisonniers juifs avaient \u00E9t\u00E9 exhib\u00E9s dans les rues de Rome comme des troph\u00E9es. Pas d\u2019un seul coup. Pas sans larmes. Mais ils accept\u00E8rent.",
    },
    {
      text: "Ce qui suivit fut m\u00E9thodique. La loi juive interdit le suicide, et ils le savaient. Ils con\u00E7urent donc un syst\u00E8me o\u00F9 une seule personne aurait \u00E0 se donner la mort. Chaque homme rejoignit sa famille, la prit dans ses bras et la tua. Ils br\u00FBl\u00E8rent tous leurs biens mais laiss\u00E8rent les r\u00E9serves de nourriture intactes \u2014 un message pour Rome : nous ne sommes pas morts de faim, nous avons choisi. Dix hommes furent tir\u00E9s au sort pour achever les autres. Ces dix tir\u00E8rent \u00E0 nouveau. Le dernier mit le feu au palais et retourna son \u00E9p\u00E9e contre lui-m\u00EAme.",
    },
    {
      text: "\u00C0 l\u2019aube, les soldats se ru\u00E8rent dans la br\u00E8che \u2014 boucliers serr\u00E9s, \u00E9p\u00E9es au clair, pr\u00EAts au pire combat de leur vie. Ils trouv\u00E8rent le silence. Jos\u00E8phe parle d\u2019\u00AB une solitude effroyable de toutes parts, avec un incendie \u00E0 l\u2019int\u00E9rieur du palais \u00BB. Ils cri\u00E8rent. Frapp\u00E8rent leurs boucliers du plat de l\u2019\u00E9p\u00E9e. Rien. Puis deux femmes et cinq enfants \u00E9merg\u00E8rent d\u2019une citerne cach\u00E9e. L\u2019une \u00E9tait parente d\u2019\u00C9l\u00E9azar. Elle raconta tout aux Romains. Ces v\u00E9t\u00E9rans \u2014 les m\u00EAmes qui avaient br\u00FBl\u00E9 le Temple de J\u00E9rusalem \u2014 rest\u00E8rent muets devant les morts.",
    },
    {
      text: "Jamais deux sans trois, dit le proverbe. Rome abattit un mur, en br\u00FBla un second \u2014 et au troisi\u00E8me, ne trouva que du silence. Voici l\u2019\u00E9trange : pendant deux mille ans, les rabbins qui fa\u00E7onn\u00E8rent le juda\u00EFsme ne mentionn\u00E8rent jamais Masada. Pas une seule fois. Ils choisirent un autre h\u00E9ros \u2014 un sage qui n\u00E9gocia sa sortie de J\u00E9rusalem assi\u00E9g\u00E9e et b\u00E2tit une tradition d\u2019\u00E9tude qui surv\u00E9cut sans temple ni patrie. Les \u00E9p\u00E9es et le feu de Masada, c\u2019\u00E9tait tout ce qu\u2019ils rejetaient. Mais l\u2019histoire surv\u00E9cut. Ce silence \u2014 celui d\u2019un peuple qui pr\u00E9f\u00E9ra mourir debout plut\u00F4t que vivre \u00E0 genoux \u2014 r\u00E9sonne encore sur le plateau, sans r\u00E9ponse possible.",
    },
  ],
};

// ═══════════════════════════════════════════════════════
//  GERMAN (de)
// ═══════════════════════════════════════════════════════
const deItem = {
  ...baseItem,
  lang: "de",
  langStoryId: "de#last-night-on-masada",
  title: "Die letzte Nacht auf Masada",
  subtitle:
    "960 j\u00FCdische Verteidiger w\u00E4hlten den Tod statt r\u00F6mischer Versklavung \u2014 sie losten aus, wer ihr Leben beenden sollte, in der ersch\u00FCtterndsten letzten Stellung der Geschichte",
  excerpt:
    "In der letzten Nacht, die Belagerungsrampe vollendet und die Mauern durchbrochen, erhob sich der Anf\u00FChrer der 960 j\u00FCdischen Verteidiger, um zu sprechen. Was er vorschlug, sollte zweitausend Jahre nachhallen.",
  moralOrLesson:
    "Freiheit ist nicht blo\u00DF die Abwesenheit von Ketten \u2014 sie ist das souver\u00E4ne Recht, \u00FCber sein eigenes Schicksal zu bestimmen, selbst wenn jeder Weg ins Dunkel f\u00FChrt. Das Ma\u00DF eines Volkes ist nicht, ob es \u00FCberlebt, sondern ob es sich weigert, das preiszugeben, was das \u00DCberleben erst lebenswert macht.",
  paragraphs: [
    {
      text: "Fr\u00FChling des Jahres 73. Die Zehnte Legion Roms hatte monatelang eine gewaltige Rampe aufgesch\u00FCttet, um die Mauern von Masada zu erreichen \u2014 einer Festung auf einem Felsplateau hoch \u00FCber dem Toten Meer. Als sie endlich die \u00E4u\u00DFere Mauer durchbrachen, errichteten die Verteidiger eine Notmauer aus Holz und Erde. Die R\u00F6mer steckten sie in Brand. Der Wind trieb die Flammen kurz gegen Roms eigenen Belagerungsturm \u2014 dann drehte er. Bei Einbruch der Nacht war die Mauer verschwunden. Zehntausend Soldaten warteten auf die Morgend\u00E4mmerung. Keine Mauern mehr. Nur noch eine Entscheidung.",
    },
    {
      text: "Das waren keine gew\u00F6hnlichen Fl\u00FCchtlinge. Es waren die Sikarier \u2014 die \u201EDolchm\u00E4nner\u201C \u2014 die radikalste j\u00FCdische Rebellenfraktion. Sieben Jahre zuvor hatten r\u00F6mische Soldaten den Tempel in Jerusalem gepl\u00FCndert und Zivilisten niedergemetzelt. Jud\u00E4a erhob sich. Die Rebellen errangen fr\u00FChe Siege und vernichteten eine komplette Legion. Rom schickte sechzigtausend Mann. Jede Festung fiel. Jerusalem brannte. Der Tempel wurde zerst\u00F6rt. Masada war die letzte Bastion: 960 Menschen in einer Festung \u00FCber dem Toten Meer, die von hundert Jahre alten Vorr\u00E4ten lebten, die K\u00F6nig Herodes einst angelegt hatte.",
    },
    {
      text: "In jener Nacht versammelte ihr Anf\u00FChrer Eleazar ben Ya\u2019ir alle im Palast des Herodes. Alles, was wir wissen, stammt von Flavius Josephus \u2014 einem j\u00FCdischen Kommandanten, der zu den R\u00F6mern \u00FCbergelaufen war und den einzigen erhaltenen Bericht verfasste. Laut Josephus hielt Eleazar zwei Reden. Er beschrieb, was sie erwartete: die M\u00E4nner w\u00FCrden in Minen und Arenen sterben, die Frauen gesch\u00E4ndet, die Kinder als Sklaven aufgezogen. \u201ELasst unsere Frauen ungesch\u00E4ndet sterben\u201C, sagte er. \u201EUnsere Kinder, ohne je Sklaverei zu kennen.\u201C Er bat sie nicht, aufzugeben. Er bat sie, die letzte freie Entscheidung ihres Lebens zu treffen.",
    },
    {
      text: "M\u00E4nner weinten. Manche hielten ihre Frauen fest und konnten nicht loslassen. Aber Eleazar lie\u00DF nicht nach. Seht euch um, sagte er \u2014 die brennende Mauer, die r\u00F6mischen Lager, die den Berg umschlie\u00DFen wie eine Schlinge. Es gab nichts zu verhandeln. Rom zeigte Rebellen keine Gnade. Rom statuierte Exempel. Alle erinnerten sich an die Kreuzigungen nach dem Fall Jerusalems \u2014 so viele, dass den Soldaten das Holz f\u00FCr die Kreuze ausging. Gefangene Juden waren wie Troph\u00E4en durch Roms Stra\u00DFen gef\u00FChrt worden. Nicht auf einmal. Nicht ohne Tr\u00E4nen. Aber sie stimmten zu.",
    },
    {
      text: "Was dann kam, war systematisch. Das j\u00FCdische Gesetz verbietet Selbstmord, und das wussten sie. Also erdachten sie ein Verfahren, bei dem nur ein Einziger sich das Leben nehmen musste. Jeder Mann ging zu seiner Familie, nahm sie in den Arm und t\u00F6tete sie. Sie verbrannten ihren Besitz, lie\u00DFen aber die Lebensmittel unangetastet \u2014 eine Botschaft an Rom: Wir sind nicht verhungert. Wir haben gew\u00E4hlt. Zehn M\u00E4nner wurden ausgelost, um die \u00DCbrigen zu t\u00F6ten. Diese zehn losten erneut. Der Letzte legte Feuer an den Palast und stie\u00DF sich das Schwert in die Brust.",
    },
    {
      text: "Im Morgengrauen st\u00FCrmten die Soldaten durch die Bresche \u2014 Schilde geschlossen, Schwerter gezogen, gefasst auf den h\u00E4rtesten Kampf ihres Lebens. Stattdessen: Stille. Josephus beschreibt \u201Eeine grauenvolle Einsamkeit auf allen Seiten, mit einem Feuer im Inneren des Palastes\u201C. Sie schrien. Schlugen Schwerter gegen Schilde. Nichts. Dann krochen zwei Frauen und f\u00FCnf Kinder aus einer verborgenen Zisterne. Eine war mit Eleazar verwandt. Sie erz\u00E4hlte den R\u00F6mern alles. Diese Veteranen \u2014 M\u00E4nner, die den Tempel Jerusalems niedergebrannt hatten \u2014 standen sprachlos vor den Toten.",
    },
    {
      text: "Lieber ein Ende mit Schrecken als ein Schrecken ohne Ende \u2014 genau das w\u00E4hlten sie. Doch zweitausend Jahre lang erw\u00E4hnten die Rabbiner, die das Judentum formten, Masada mit keinem Wort. Nicht ein einziges Mal. Sie w\u00E4hlten einen anderen Helden \u2014 einen Gelehrten, der sich aus dem belagerten Jerusalem herausverhandelt und eine Tradition des Lernens begr\u00FCndet hatte, die ohne Tempel und Heimat \u00FCberlebte. Schwerter und Feuer waren alles, was sie ablehnten. Aber die Geschichte \u00FCberlebte. Und der Schrecken? Der endete nie. Die Stille, die Rom an jenem Morgen fand \u2014 die eines Volkes, das lieber starb als zu knien \u2014 hallt noch heute \u00FCber das Plateau, ohne Antwort und absolut.",
    },
  ],
};

// ═══════════════════════════════════════════════════════
//  PUSH ALL THREE
// ═══════════════════════════════════════════════════════
async function pushItem(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\nPushing ${label}...`);

  // Validate key fields
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`Missing required fields for ${label}`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(
      `Unexpected paragraph count (${item.paragraphs.length}) for ${label}`
    );
  }

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );
  console.log(`  ✓ ${label} pushed successfully.`);
}

(async () => {
  try {
    await pushItem(esItem);
    await pushItem(frItem);
    await pushItem(deItem);
    console.log("\n=== All three stories pushed successfully. ===\n");
  } catch (err) {
    console.error("\n✗ ERROR:", err.message || err);
    if (err.name === "ConditionalCheckFailedException") {
      console.error(
        "  A record with this siteId+langStoryId already exists. Delete it first or remove the condition."
      );
    }
    process.exit(1);
  }
})();
