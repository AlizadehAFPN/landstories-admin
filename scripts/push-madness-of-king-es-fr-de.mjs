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
  siteId: "babylon",
  storyId: "madness-of-the-king",
  icon: "👁️",
  tier: "A",
  source:
    "Daniel 4 (biblical account of Nebuchadnezzar's madness); 4Q242 Prayer of Nabonidus (Dead Sea Scrolls, Cave 4, Qumran); The Verse Account of Nabonidus (BM 38299, British Museum); 2 Kings 25:27-30 (Evil-Merodach releases Jehoiachin); Wiseman, D.J. Nebuchadrezzar and Babylon, Oxford University Press, 1985; Collins, John J. Daniel: A Commentary on the Book of Daniel, Hermeneia Series, Fortress Press, 1993; Beaulieu, Paul-Alain. The Reign of Nabonidus, King of Babylon 556-539 B.C., Yale University Press, 1989; Henze, Matthias. The Madness of King Nebuchadnezzar, Brill, 1999",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  coordinates: { lat: 32.5363, lng: 44.4209 },
  updatedAt: now,
};

// ═══════════════════════════════════════════════
//  SPANISH (es)
// ═══════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#madness-of-the-king",
  title: "La locura del rey",
  subtitle:
    "El hombre más poderoso del mundo perdió la razón y vivió como un animal durante siete años. Un manuscrito del Mar Muerto podría revelar de quién es realmente esta historia",
  excerpt:
    "Era el hombre más poderoso de su época: el rey que arrasó Jerusalén, reconstruyó Babilonia como la maravilla del mundo y grabó su nombre en cada ladrillo de su imperio. Entonces, una noche, contemplando la ciudad desde la azotea de su palacio, perdió la razón. Durante siete años, el soberano de Babilonia vivió como un animal.",
  characters: [
    "Nabucodonosor II — rey de Babilonia, el mayor constructor del mundo antiguo",
    "Daniel — profeta judío que interpretó el sueño del gran árbol",
    "Nabónido — rey posterior cuya misteriosa enfermedad podría ser la base histórica del relato",
    "Amel-Marduk (Evil-Merodach) — hijo y sucesor de Nabucodonosor",
  ],
  era: "c. 570-562 a.C. (últimos años de Nabucodonosor); el fragmento 4Q242 del Mar Muerto documenta la tradición paralela de Nabónido",
  moralOrLesson:
    "El árbol más alto del bosque es el primero que ve el hacha. La locura de Nabucodonosor no fue un castigo por construir, sino por creer que lo construido era solo suyo. Cada ladrillo de Babilonia fue moldeado con arcilla del río por manos humanas y cocido con esfuerzo humano, y el rey que estampó su nombre en todos ellos olvidó que la arcilla era más antigua que su dinastía y le sobreviviría. La cura del orgullo no es la humillación, sino la perspectiva: saber que hasta el mayor constructor es, al final, solo otra criatura de la tierra.",
  paragraphs: [
    {
      text: "Nabucodonosor II no se conformó con gobernar Babilonia: la reconstruyó de cero. Murallas dobles tan anchas que cabían carros de guerra. La mítica Puerta de Ishtar. Templos, palacios, canales, un puente de piedra sobre el Éufrates. Y en cada ladrillo —cada uno— grabó su nombre. Los arqueólogos han encontrado cientos de miles. En el Museo Británico puedes tomar uno en la mano y leer la inscripción: «Nabucodonosor, rey de Babilonia». No estaba construyendo una ciudad. Estaba intentando hacerse eterno.",
    },
    {
      text: "Entonces llegó el sueño. Un árbol tan alto que rozaba el cielo, visible desde cualquier rincón del mundo, que daba refugio a todas las aves y bestias. Hasta que una voz cayó del cielo: córtalo. Dejad solo el tronco, atado con hierro y bronce. Que su mente se vuelva la de un animal. Daniel —un profeta judío exiliado en la corte babilónica— fue llamado a interpretar. Hubiera preferido que el sueño fuera sobre otro. Pero no: el árbol era Nabucodonosor. Y la sentencia ya estaba dictada.",
    },
    {
      text: "Daniel le suplicó: cambia, muestra piedad, quizá Dios te perdone. Pasaron doce meses. Nada. Entonces el rey subió una noche a la azotea de su palacio —cuyas ruinas aún se alzan— y contempló la ciudad que había levantado. «¿No es esta la gran Babilonia», dijo, «que yo edifiqué con mi poder y para gloria de mi majestad?» Tanto va el cántaro a la fuente que al final se rompe: las palabras no habían terminado de salir de su boca cuando una voz cayó del cielo. El reino te ha sido quitado.",
    },
    {
      text: "Lo que vino después parece imposible, pero psiquiatras modernos lo han documentado en pacientes reales. El rey cayó a cuatro patas. Comió hierba como el ganado. Su pelo creció salvaje y enmarañado. Sus uñas se curvaron como garras. Durante siete años, el hombre más poderoso del mundo vivió como un animal al raso. La Biblia jamás explica quién gobernó el imperio mientras tanto. Ese silencio lo dice todo: siete años de vacío, como si alguien hubiera borrado al rey de su propio reino.",
    },
    {
      text: "Aquí la historia da un giro inesperado. En 1952, un fragmento de pergamino apareció en una cueva junto al Mar Muerto. Contaba casi la misma historia —un rey babilónico enloquecido siete años, sanado por un hombre santo judío— pero nombraba a otro rey: Nabónido, que reinó décadas después de Nabucodonosor. Y Nabónido sí abandonó Babilonia y desapareció en el desierto de Arabia durante diez años. Nadie sabe por qué. Muchos expertos creen hoy que la locura fue suya, atribuida después al rey más famoso.",
    },
    {
      text: "Según Daniel, al cabo de siete años el rey alzó la vista al cielo y su cordura regresó. Alabó al Dios del cielo, sus consejeros lo restauraron en el trono y su poder creció aún más. Parece un final feliz. No lo fue. Murió en el 562 a.C. Su hijo no duró ni dos años antes de ser asesinado en un golpe palaciego. En apenas veintitrés años tras la muerte del gran rey, la propia Babilonia cayó ante Ciro de Persia. El hombre que grabó su nombre en cada ladrillo no pudo grabarlo en el tiempo.",
    },
    {
      text: "Pero ahí viene el giro final. El imperio se desmoronó. La dinastía se esfumó. La ciudad se convirtió en polvo. Pero los ladrillos —cientos de miles— siguen aquí. Puedes entrar al Museo Británico o al Museo de Pérgamo en Berlín, sostener uno y leer el nombre que Nabucodonosor presionó en arcilla húmeda hace veintiséis siglos. Quiso ser dueño de todo. Al final dejó lo que nadie esperaba: ni un reino, ni una dinastía. Solo un ladrillo. Y de algún modo, con eso bastó.",
    },
  ],
};

// ═══════════════════════════════════════════════
//  FRENCH (fr)
// ═══════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#madness-of-the-king",
  title: "La folie du roi",
  subtitle:
    "Le roi le plus puissant du monde a perdu la raison et vécu comme un animal pendant sept ans — un manuscrit de la mer Morte pourrait révéler à qui cette histoire appartient vraiment",
  excerpt:
    "C'était l'homme le plus puissant de son époque — le roi qui avait brûlé Jérusalem, reconstruit Babylone en merveille du monde et gravé son nom sur chaque brique de son empire. Puis, debout sur la terrasse de son palais, contemplant la ville qu'il avait bâtie, il a perdu la raison. Pendant sept ans, le souverain de Babylone a vécu comme un animal.",
  characters: [
    "Nabuchodonosor II — roi de Babylone, le plus grand bâtisseur du monde antique",
    "Daniel — prophète juif qui interpréta le songe du grand arbre",
    "Nabonide — roi ultérieur dont la mystérieuse maladie pourrait être la source historique du récit",
    "Amel-Marduk (Évil-Merodach) — fils et successeur de Nabuchodonosor",
  ],
  era: "v. 570-562 av. J.-C. (dernières années de Nabuchodonosor) ; le fragment 4Q242 de la mer Morte documente la tradition parallèle de Nabonide",
  moralOrLesson:
    "L'arbre le plus haut de la forêt est le premier que la hache repère. La folie de Nabuchodonosor n'était pas un châtiment pour avoir bâti, mais pour avoir cru que ce qu'il bâtissait n'appartenait qu'à lui. Chaque brique de Babylone fut façonnée dans l'argile du fleuve par des mains humaines et cuite par le labeur humain, et le roi qui y apposa son nom oublia que l'argile était plus ancienne que sa dynastie et lui survivrait. Le remède à l'orgueil n'est pas l'humiliation mais la perspective : savoir que même le plus grand bâtisseur n'est, au bout du compte, qu'une créature de la terre.",
  paragraphs: [
    {
      text: "Nabuchodonosor II n'a pas seulement régné sur Babylone — il l'a reconstruite de fond en comble. Des murailles doubles assez larges pour y faire rouler des chars. La légendaire porte d'Ishtar. Des temples, des palais, des canaux, un pont de pierre sur l'Euphrate. Et sur chaque brique, il a fait graver son nom. Les archéologues en ont retrouvé des centaines de milliers. Au British Museum, on peut en prendre une, passer le doigt sur l'inscription : « Nabuchodonosor, roi de Babylone. » Il ne bâtissait pas une ville. Il essayait de rendre son nom éternel.",
    },
    {
      text: "Puis vint le songe. Un arbre si haut qu'il touchait le ciel, visible depuis chaque coin de la terre, offrant refuge à tous les oiseaux et toutes les bêtes. Jusqu'à ce qu'une voix tombe du ciel : abattez-le. Ne laissez que la souche, liée de fer et de bronze. Que son esprit devienne celui d'un animal. Daniel — un prophète juif en exil à la cour babylonienne — fut appelé pour interpréter. Il aurait voulu que le songe concerne quelqu'un d'autre. Mais l'arbre, c'était Nabuchodonosor. Et la sentence était déjà prononcée.",
    },
    {
      text: "Daniel supplia le roi : changez, montrez de la clémence, peut-être Dieu vous épargnera. Douze mois passèrent. Rien. Puis un soir, le roi monta sur la terrasse de son palais — celui dont les ruines se dressent encore — et contempla la ville qu'il avait bâtie. « N'est-ce pas là Babylone la grande, que j'ai construite par ma puissance et pour la gloire de ma majesté ? » L'orgueil précède la chute, dit le proverbe. Personne n'avait précisé que la chute durerait sept ans. Les mots flottaient encore quand une voix tomba du ciel : le royaume t'a été retiré.",
    },
    {
      text: "Ce qui suivit semble impossible — mais des psychiatres l'ont documenté chez des patients modernes. Le roi tomba à quatre pattes. Il mangeait de l'herbe comme du bétail. Ses cheveux poussèrent en masse emmêlée. Ses ongles se recourbèrent comme des griffes. Pendant sept ans, l'homme le plus puissant du monde vécut comme une bête en plein air. La Bible n'explique jamais qui gouverna l'empire pendant ce temps. Ce silence est assourdissant — sept ans de néant, comme si quelqu'un avait effacé le roi de son propre royaume.",
    },
    {
      text: "C'est ici que l'histoire bascule. En 1952, un fragment de manuscrit est apparu dans une grotte près de la mer Morte. Presque le même récit — un roi babylonien frappé de folie sept ans, guéri par un saint homme juif — mais avec un autre nom : Nabonide, qui régna des décennies après Nabuchodonosor. Or Nabonide a bel et bien quitté Babylone pour disparaître dans le désert d'Arabie pendant dix ans. Personne ne sait pourquoi. Nombre d'experts pensent aujourd'hui que la folie était la sienne, attribuée plus tard au roi le plus célèbre.",
    },
    {
      text: "Au bout de sept ans, raconte Daniel, le roi leva les yeux vers le ciel — et sa raison revint. Il loua le Dieu du ciel, ses conseillers le rétablirent sur le trône, et sa puissance grandit encore. On dirait une fin heureuse. Ce n'en était pas une. Il mourut en 562 avant notre ère. Son fils ne tint que deux ans avant d'être assassiné dans un coup de palais. En vingt-trois ans à peine après la mort du grand roi, Babylone elle-même tomba aux mains de Cyrus le Perse. Celui qui avait gravé son nom sur chaque brique n'a pas pu le graver dans le temps.",
    },
    {
      text: "Mais voici le dernier retournement. L'empire s'est écroulé. La dynastie a disparu. La ville est devenue poussière. Mais les briques — des centaines de milliers — sont toujours là. On peut entrer au British Museum ou au musée de Pergame à Berlin, en prendre une dans la main et lire le nom que Nabuchodonosor a pressé dans l'argile humide il y a vingt-six siècles. Il a voulu posséder le monde. Au bout du compte, il a laissé ce que personne n'attendait : ni un empire, ni une dynastie. Juste une brique. Et bizarrement, ça a suffi.",
    },
  ],
};

// ═══════════════════════════════════════════════
//  GERMAN (de)
// ═══════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#madness-of-the-king",
  title: "Der Wahnsinn des Königs",
  subtitle:
    "Der mächtigste König der Erde verlor den Verstand und lebte sieben Jahre lang wie ein Tier — eine Schriftrolle vom Toten Meer könnte verraten, wessen Geschichte es wirklich war",
  excerpt:
    "Er war der mächtigste Mann seiner Zeit — der König, der Jerusalem niederbrannte, Babylon zum Weltwunder machte und seinen Namen auf jeden Ziegel seines Reiches prägte. Dann, auf dem Dach seines Palastes stehend und über die Stadt blickend, die er erschaffen hatte, verlor er den Verstand. Sieben Jahre lang lebte der Herrscher von Babylon wie ein Tier.",
  characters: [
    "Nebukadnezar II. — König von Babylon, der größte Bauherr der antiken Welt",
    "Daniel — jüdischer Prophet, der den Traum vom großen Baum deutete",
    "Nabonid — späterer König, dessen rätselhafte Krankheit die historische Grundlage der Erzählung sein könnte",
    "Amel-Marduk (Evil-Merodach) — Nebukadnezars Sohn und Nachfolger",
  ],
  era: "ca. 570–562 v. Chr. (Nebukadnezars letzte Jahre); das Schriftfragment 4Q242 vom Toten Meer dokumentiert die parallele Nabonid-Überlieferung",
  moralOrLesson:
    "Der höchste Baum im Wald ist der erste, den die Axt sieht. Nebukadnezars Wahnsinn war keine Strafe fürs Bauen — sondern dafür, dass er glaubte, das Gebaute gehöre ihm allein. Jeder Ziegel Babylons wurde aus Flusslehm geformt und von Menschenhänden gebrannt, und der König, der seinen Namen auf jeden einzelnen presste, vergaß, dass der Lehm älter war als seine Dynastie und sie überdauern würde. Das Heilmittel gegen Hochmut ist nicht Demütigung, sondern Perspektive: das Wissen, dass selbst der größte Baumeister am Ende nur ein Geschöpf der Erde ist.",
  paragraphs: [
    {
      text: "Nebukadnezar II. hat Babylon nicht einfach regiert — er hat es von Grund auf neu gebaut. Gewaltige Doppelmauern, breit genug für Streitwagen. Das legendäre Ischtar-Tor. Tempel, Paläste, Kanäle, eine steinerne Brücke über den Euphrat. Und auf jeden einzelnen Ziegel ließ er seinen Namen prägen. Archäologen haben Hunderttausende davon gefunden. Im British Museum kann man einen in die Hand nehmen und die Inschrift lesen: „Nebukadnezar, König von Babylon.“ Er baute keine Stadt. Er versuchte, seinen Namen unsterblich zu machen.",
    },
    {
      text: "Dann kam der Traum. Ein Baum, so hoch, dass er den Himmel berührte, sichtbar von jedem Winkel der Erde, Zuflucht für alle Vögel und Tiere. Bis eine Stimme vom Himmel befahl: Fällt ihn. Lasst nur den Stumpf, gebunden in Eisen und Bronze. Sein Verstand soll der eines Tieres werden. Daniel — ein jüdischer Prophet im babylonischen Exil — wurde gerufen, um zu deuten. Er hätte sich gewünscht, der Traum handelte von jemand anderem. Tat er nicht. Der Baum war Nebukadnezar. Und das Urteil war bereits gesprochen.",
    },
    {
      text: "Daniel flehte den König an: Ändert Euch, zeigt Barmherzigkeit, vielleicht verschont Euch Gott. Zwölf Monate vergingen. Nichts geschah. Dann stieg der König eines Abends aufs Dach seines Palastes — dessen Ruinen noch heute stehen — und blickte über die Stadt, die er gebaut hatte. „Ist das nicht das große Babylon“, sagte er, „das ich erbaut habe durch meine Macht und zu Ehren meiner Herrlichkeit?“ Hochmut kommt vor dem Fall, sagt man. Niemand hatte gesagt, dass der Fall sieben Jahre dauern würde. Die Worte hingen noch in der Luft, als eine Stimme vom Himmel fiel: Das Reich ist dir genommen.",
    },
    {
      text: "Was dann geschah, klingt unmöglich — doch Psychiater haben es bei modernen Patienten dokumentiert. Der König fiel auf alle viere. Er fraß Gras wie Vieh. Sein Haar wuchs lang und verfilzt. Seine Nägel krümmten sich zu Klauen. Sieben Jahre lang lebte der mächtigste Mann der Welt wie ein Tier unter freiem Himmel. Die Bibel erklärt nie, wer in dieser Zeit das Reich regierte. Dieses Schweigen ist ohrenbetäubend — sieben Jahre Nichts, als hätte jemand den König aus seinem eigenen Königreich gelöscht.",
    },
    {
      text: "Hier wird es seltsam. 1952 tauchte in einer Höhle am Toten Meer ein Schriftfragment auf. Fast dieselbe Geschichte — ein babylonischer König, sieben Jahre im Wahn, geheilt von einem jüdischen Gelehrten — aber mit einem anderen Namen: Nabonid, der Jahrzehnte nach Nebukadnezar regierte. Und Nabonid hat Babylon tatsächlich verlassen und ist zehn Jahre in der arabischen Wüste verschwunden. Niemand weiß warum. Viele Forscher glauben heute, der Wahnsinn war ursprünglich seiner — später dem berühmteren König zugeschrieben.",
    },
    {
      text: "Nach sieben Jahren, so Daniel, hob der König den Blick zum Himmel — und sein Verstand kehrte zurück. Er pries den Gott des Himmels, seine Berater setzten ihn wieder auf den Thron, und seine Macht wuchs sogar. Klingt nach einem guten Ende. War es nicht. Er starb 562 v. Chr. Sein Sohn hielt keine zwei Jahre, bevor er bei einem Palastputsch ermordet wurde. Dreiundzwanzig Jahre nach dem Tod des großen Königs fiel Babylon selbst an Kyros von Persien. Der Mann, der seinen Namen auf jeden Ziegel geprägt hatte, konnte ihn nicht in die Zeit prägen.",
    },
    {
      text: "Aber hier kommt die letzte Wendung. Das Reich zerfiel. Die Dynastie verschwand. Die Stadt wurde zu Staub. Doch die Ziegel — Hunderttausende davon — sind noch da. Man kann ins British Museum oder ins Pergamonmuseum in Berlin gehen, einen in die Hand nehmen und den Namen lesen, den Nebukadnezar vor sechsundzwanzig Jahrhunderten in feuchten Ton gedrückt hat. Er wollte alles besitzen. Am Ende hinterließ er, womit niemand gerechnet hatte: kein Reich, keine Dynastie. Nur einen Ziegel. Und irgendwie war das genug.",
    },
  ],
};

// ─── Push all three ───
async function pushAll() {
  for (const [label, item] of [["ES", es], ["FR", fr], ["DE", de]]) {
    try {
      await docClient.send(
        new PutCommand({
          TableName: TABLE,
          Item: item,
          ConditionExpression:
            "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
        })
      );
      console.log(`✓ ${label} pushed successfully  →  ${item.langStoryId}`);
    } catch (err) {
      if (err.name === "ConditionalCheckFailedException") {
        console.log(
          `⚠ ${label} already exists (${item.langStoryId}), overwriting…`
        );
        await docClient.send(
          new PutCommand({ TableName: TABLE, Item: item })
        );
        console.log(`✓ ${label} overwritten  →  ${item.langStoryId}`);
      } else {
        console.error(`✗ ${label} FAILED:`, err.message);
        process.exit(1);
      }
    }
  }
  console.log("\nDone. All three language versions pushed.");
}

pushAll();
