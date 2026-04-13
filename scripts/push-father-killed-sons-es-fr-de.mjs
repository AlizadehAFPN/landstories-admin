// Push "The Father Who Killed His Sons" — es, fr, de
// Recreated as native-born storytelling, not translations.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ──────────────────────────
const shared = {
  siteId: "alamut-castle",
  storyId: "father-who-killed-his-sons",
  icon: "⚖️",
  storyCategory: "riddles_past",
  era: "c.1100-1120 CE (during Hassan-i Sabbah's rule of Alamut)",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  coordinates: { lat: 36.4447, lng: 50.5861 },
  thumbnail: "",
  image: "",
  disabled: false,
  source:
    "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Bernard Lewis, The Assassins: A Radical Sect in Islam (1967); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); Marshall Hodgson, The Order of Assassins (1955); Encyclopaedia Iranica, 'HASAN SABBAH'",
  updatedAt: now,
};

// =====================================================================
//  SPANISH  (es)
// =====================================================================
// Proverb subverted: "A la tercera va la vencida" — but Hassan didn't
// need a third time. Two sons were enough.
// Register: skilled modern storyteller, popular nonfiction, gripping.

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#father-who-killed-his-sons",
  title: "El padre que mató a sus hijos",
  subtitle:
    "El señor de Alamut que ejecutó a sus dos hijos para demostrar que ninguna sangre está por encima de la ley",
  excerpt:
    "Hassan-i Sabbah gobernó el Nido del Águila con una sola regla de hierro: nadie estaba por encima de la ley. Cuando sus propios hijos la rompieron, demostró que hablaba en serio — al precio más alto que un padre puede pagar.",
  moralOrLesson:
    "La verdadera justicia exige más de quien más poder tiene. Un líder que exime a su propia sangre de la ley no tiene ley alguna, y el precio terrible de un principio absoluto es que no perdona nada — ni siquiera el corazón de quien lo impone.",
  characters: [
    "Hassan-i Sabbah (señor de Alamut que condenó a sus propios hijos)",
    "Muhammad (hijo de Hassan, ejecutado por beber vino)",
    "Ustad Husayn (hijo de Hassan, ejecutado por presunto asesinato)",
    "Husayn Qaini (comandante ismaelita presuntamente asesinado por Ustad Husayn)",
  ],
  paragraphs: [
    {
      text: "En 1090, un hombre llamado Hassan-i Sabbah se apoderó del castillo de Alamut — una fortaleza clavada en un acantilado del norte de Persia, tan alta que la llamaban el Nido del Águila. Desde allí levantó una de las redes más temidas de la Edad Media: los nizaríes ismaelitas, una rama del islam chií que eliminaba a los hombres más poderosos de Oriente Medio. Pero Hassan no vivía como un señor de la guerra. Ropa sencilla, comida simple, días enteros leyendo. Y una sola regla de hierro: nadie — fuera quien fuera — estaba por encima de la ley.",
    },
    {
      text: "Y lo demostró enseguida. Cuando pillaron a un hombre tocando la flauta en vez de llamar al rezo — ni siquiera una falta grave — Hassan lo desterró para siempre. Cuando descubrieron a otro bebiendo vino a escondidas, lo mandó matar. En Alamut, el vino estaba prohibido bajo pena de muerte. No destierro. No castigo. Muerte. Todo el que vivía dentro de esos muros sabía a qué atenerse. Lo que nadie imaginaba era hasta dónde llegaría.",
    },
    {
      text: "Hassan tenía dos hijos: Muhammad y Ustad Husayn. En cualquier reino normal, habrían sido sus herederos. Pero Hassan siempre insistió en que no estaba fundando una dinastía. Decía que solo custodiaba Alamut en nombre del Imán oculto — un líder espiritual que, según los nizaríes, un día regresaría. Si Hassan pasaba el poder a sus hijos, todo se derrumbaba. Sería un caudillo más usando la religión para su beneficio. Sus enemigos ya murmuraban exactamente eso.",
    },
    {
      text: "Entonces su hijo Muhammad cometió el único error que no tenía perdón. Lo pillaron bebiendo vino dentro de la fortaleza — el mismo delito por el que su padre ya había matado a otro hombre. No hay registro de un juicio ni de una súplica. Lo que recogen las fuentes es el resultado: Hassan-i Sabbah mandó ejecutar a su propio hijo. El hombre que había ordenado la muerte de los funcionarios más poderosos del mundo islámico aplicó la misma vara a su propia sangre.",
    },
    {
      text: "El segundo golpe fue aún más oscuro. Ustad Husayn, el único hijo que le quedaba, fue acusado de participar en el asesinato de Husayn Qaini — un comandante ismaelita de confianza que dirigía las operaciones en el este de Persia. ¿Era cierta la acusación o la fabricaron rivales de la corte? No lo sabremos nunca. El historiador Bernard Lewis, tras estudiar cada fuente que sobrevivió, dijo que la historia era «probablemente auténtica». Daba igual: Hassan ejecutó a su segundo hijo. Los dos herederos. Desaparecidos.",
    },
    {
      text: "Dicen que a la tercera va la vencida. Pero Hassan no necesitó una tercera vez. Le bastaron dos hijos para que nadie volviera a dudar de su palabra. Nada parecido había ocurrido jamás en el mundo islámico. Ningún gobernante había matado a sus dos hijos — ni por traición, ni por rebelión, y desde luego no por beber vino. Puedes leerlo de dos formas: o Hassan era un monstruo que no sentía nada, o estaba dispuesto a destruir lo que más quería para demostrar que sus principios eran reales.",
    },
    {
      text: "Cuando Hassan agonizaba en junio de 1124, no nombró a un sobrino ni a un primo. Convocó a sus cuatro comandantes más leales y designó a Kiya Buzurg-Ummid — un soldado fiel sin ningún vínculo familiar — como nuevo señor de Alamut. Su última instrucción: servir juntos «hasta que el Imán venga a tomar posesión de su reino». Se había asegurado, al precio más alto que un padre puede pagar, de que nadie llamara a aquello un negocio familiar.",
    },
    {
      text: "Murió solo en su estudio, a la sombra del Nido del Águila — un hombre que renunció a su comodidad, a su linaje y quizá a su propia humanidad por una sola idea: que nadie está por encima de la ley. Ni tus soldados. Ni tus aliados. Ni tus hijos.",
    },
  ],
};

// =====================================================================
//  FRENCH  (fr)
// =====================================================================
// Proverb subverted: "Jamais deux sans trois" — but there was no third
// time, because there was no one left to sacrifice.
// Register: historical present throughout (présent de narration) —
// gripping, immediate, very podcast / popular nonfiction.

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#father-who-killed-his-sons",
  title: "Le père qui tua ses fils",
  subtitle:
    "Le maître d'Alamut qui fit exécuter ses deux fils pour prouver que nul sang n'est au-dessus de la loi",
  excerpt:
    "Hassan-i Sabbah règne sur le Nid de l'Aigle avec une règle d'airain : personne n'est au-dessus de la loi. Quand ses propres fils l'enfreignent, il prouve qu'il ne plaisante pas — au prix le plus terrible qu'un père puisse jamais payer.",
  moralOrLesson:
    "La vraie justice exige le plus de celui qui détient le plus de pouvoir. Un chef qui exempte son propre sang de la loi n'a aucune loi, et le prix terrible d'un principe absolu est qu'il n'épargne rien — pas même le cœur de celui qui l'impose.",
  characters: [
    "Hassan-i Sabbah (maître d'Alamut qui condamna ses propres fils)",
    "Muhammad (fils de Hassan, exécuté pour avoir bu du vin)",
    "Ustad Husayn (fils de Hassan, exécuté pour meurtre présumé)",
    "Husayn Qaini (commandant ismaélien prétendument assassiné par Ustad Husayn)",
  ],
  paragraphs: [
    {
      text: "En 1090, un homme nommé Hassan-i Sabbah s'empare du château d'Alamut — une forteresse sur une falaise du nord de la Perse, si haute qu'on l'appelle le Nid de l'Aigle. De là, il bâtit l'un des réseaux les plus redoutés du Moyen Âge : les nizârites ismaéliens, une branche dissidente du chiisme qui élimine les plus puissants du Proche-Orient. Mais Hassan ne vit pas comme un seigneur de guerre. Vêtements simples, repas frugaux, journées d'étude. Et une règle d'airain : personne — absolument personne — n'est au-dessus de la loi.",
    },
    {
      text: "Il le prouve très vite. Un muezzin surpris à jouer de la flûte — même pas une faute grave — est banni à jamais. Un autre, pris à boire du vin en cachette, est mis à mort. À Alamut, le vin est interdit sous peine de mort. Pas l'exil. Pas le fouet. La mort. Tous ceux qui vivent entre ces murs connaissent la règle. Ce que personne ne mesure encore, c'est jusqu'où il ira pour la faire respecter.",
    },
    {
      text: "Hassan a deux fils : Muhammad et Ustad Husayn. Dans n'importe quel royaume ordinaire, ils seraient ses héritiers. Mais Hassan répète qu'il ne bâtit pas une dynastie. Il dit garder Alamut au nom de l'Imam caché — un guide spirituel que les nizârites attendent. S'il transmet le pouvoir à ses fils, tout s'effondre. Il devient un chef de guerre de plus, instrumentalisant la religion. Ses ennemis le murmurent déjà.",
    },
    {
      text: "Puis son fils Muhammad commet l'erreur fatale. On le surprend à boire du vin dans la forteresse — le même crime pour lequel son père a déjà fait tuer un homme. Aucune trace d'un procès, aucune trace d'une supplique. Ce que les sources rapportent, c'est le verdict : Hassan-i Sabbah fait exécuter son propre fils. L'homme qui a ordonné l'assassinat des plus hauts dignitaires du monde islamique applique la même loi à sa propre chair.",
    },
    {
      text: "Le second coup est plus sombre encore. Ustad Husayn, son dernier fils, est accusé d'avoir participé au meurtre de Husayn Qaini — un commandant ismaélien de confiance en Perse orientale. L'accusation est-elle fondée ou montée par des rivaux ? Nul ne le saura jamais. L'historien Bernard Lewis qualifie l'histoire de « probablement authentique ». Peu importe : Hassan fait exécuter son second fils. Les deux héritiers. Disparus.",
    },
    {
      text: "On dit jamais deux sans trois. Mais il n'y a pas de troisième fois — parce qu'il ne reste plus personne à sacrifier. Rien de comparable n'a jamais eu lieu dans le monde islamique. Aucun souverain n'a fait tuer ses deux fils — ni pour trahison, ni pour rébellion, et certainement pas pour du vin. On peut y lire deux choses : soit Hassan est un monstre sans cœur, soit il est prêt à détruire ce qu'il a de plus cher pour prouver que ses principes ne sont pas des mots creux.",
    },
    {
      text: "Quand Hassan agonise en juin 1124, il ne désigne ni neveu ni cousin. Il convoque ses quatre commandants les plus fidèles et nomme Kiya Buzurg-Ummid — un soldat loyal sans aucun lien de sang — nouveau maître d'Alamut. Sa dernière consigne : servir ensemble « jusqu'à ce que l'Imam vienne prendre possession de son royaume ». Il s'est assuré, au prix le plus terrible qu'un père puisse payer, que personne n'appellera cela une affaire de famille.",
    },
    {
      text: "Il meurt seul dans son bureau, à l'ombre du Nid de l'Aigle — un homme qui a renoncé à son confort, à sa lignée, et peut-être à son humanité pour une seule idée : que nul n'est au-dessus de la loi. Ni tes soldats. Ni tes alliés. Ni tes fils.",
    },
  ],
};

// =====================================================================
//  GERMAN  (de)
// =====================================================================
// Proverb subverted: "Aller guten Dinge sind drei" — but Hassan didn't
// need a third chance. Two sons were enough to silence all doubt.
// Register: Präteritum (narrative past tense), natural German
// storytelling voice, modern nonfiction / podcast quality.

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#father-who-killed-his-sons",
  title: "Der Vater, der seine Söhne tötete",
  subtitle:
    "Der Herr von Alamut, der beide Söhne hinrichten ließ, um zu beweisen, dass kein Blut über dem Gesetz steht",
  excerpt:
    "Hassan-i Sabbah herrschte über das Adlernest mit einer eisernen Regel: Niemand stand über dem Gesetz. Als seine eigenen Söhne dagegen verstießen, bewies er, dass er jedes Wort ernst meinte — zum höchsten Preis, den ein Vater je zahlen kann.",
  moralOrLesson:
    "Wahre Gerechtigkeit fordert am meisten von denen, die die meiste Macht besitzen. Ein Anführer, der sein eigenes Blut vom Gesetz ausnimmt, hat kein Gesetz — und der furchtbare Preis eines absoluten Prinzips ist, dass es nichts verschont, nicht einmal das Herz dessen, der es durchsetzt.",
  characters: [
    "Hassan-i Sabbah (Herr von Alamut, der seine eigenen Söhne verurteilte)",
    "Muhammad (Hassans Sohn, hingerichtet wegen Weintrinkens)",
    "Ustad Husayn (Hassans Sohn, hingerichtet wegen mutmaßlichen Mordes)",
    "Husayn Qaini (ismailitischer Kommandant, mutmaßlich von Ustad Husayn ermordet)",
  ],
  paragraphs: [
    {
      text: "Im Jahr 1090 eroberte ein Mann namens Hassan-i Sabbah die Festung Alamut — eine Burg auf einer Klippe im Norden Persiens, so hoch, dass man sie das Adlernest nannte. Von dort baute er eines der gefürchtetsten Netzwerke des Mittelalters auf: die Nizariten, einen abtrünnigen Zweig des schiitischen Islams, der die mächtigsten Männer des Nahen Ostens ausschaltete. Aber Hassan lebte nicht wie ein Kriegsherr. Schlichte Kleidung, einfaches Essen, ganze Tage über Büchern. Und eine eiserne Regel: Niemand — ganz gleich wer — stand über dem Gesetz.",
    },
    {
      text: "Und er bewies es sofort. Als ein Muezzin beim Flötespielen erwischt wurde — nicht einmal ein schweres Vergehen — verbannte Hassan ihn für immer. Als ein anderer heimlich Wein trank, ließ er ihn hinrichten. In Alamut war Wein bei Todesstrafe verboten. Keine Verbannung. Keine Prügel. Der Tod. Jeder innerhalb dieser Mauern kannte die Spielregeln. Was niemand ahnte: wie weit er tatsächlich gehen würde.",
    },
    {
      text: "Hassan hatte zwei Söhne: Muhammad und Ustad Husayn. In jedem normalen Königreich wären sie seine Erben gewesen. Doch Hassan bestand darauf, keine Dynastie zu gründen. Er sagte, er verwalte Alamut nur im Namen des verborgenen Imam — eines geistlichen Führers, den die Nizariten erwarteten. Hätte er die Macht an seine Söhne gegeben, wäre alles zusammengebrochen. Er wäre nur ein weiterer Kriegsherr gewesen, der Religion für eigene Zwecke missbrauchte. Seine Feinde flüsterten genau das.",
    },
    {
      text: "Dann beging sein Sohn Muhammad den einen Fehler, den man in Alamut nicht überlebte. Man erwischte ihn beim Weintrinken in der Festung — dasselbe Vergehen, für das sein Vater bereits einen Mann hatte töten lassen. Es gibt keinen Bericht über ein Verfahren, kein Gnadengesuch. Was die Quellen festhalten, ist das Ergebnis: Hassan-i Sabbah ließ seinen eigenen Sohn hinrichten. Der Mann, der den Tod der mächtigsten Beamten der islamischen Welt befohlen hatte, maß sein eigenes Fleisch und Blut mit demselben Maß.",
    },
    {
      text: "Der zweite Schlag war noch finsterer. Ustad Husayn, Hassans letzter Sohn, wurde beschuldigt, am Mord an Husayn Qaini mitgewirkt zu haben — einem vertrauten ismailitischen Kommandanten in Ostpersien. War die Anklage echt oder von Rivalen erfunden? Wir werden es nie erfahren. Der Historiker Bernard Lewis nannte die Geschichte nach dem Studium aller Quellen \u201Ewahrscheinlich authentisch\u201C. Egal: Hassan ließ seinen zweiten Sohn hinrichten. Beide Erben. Weg.",
    },
    {
      text: "Man sagt: Aller guten Dinge sind drei. Aber Hassan brauchte keine dritte Chance — zwei Söhne reichten, damit niemand je wieder zweifelte. Nichts Vergleichbares war in der islamischen Welt geschehen. Kein Herrscher hatte beide Söhne getötet — nicht wegen Verrats, nicht wegen Aufstands, schon gar nicht wegen Weins. Man konnte es auf zwei Arten lesen: Entweder war Hassan ein Ungeheuer ohne Gefühl — oder er war bereit, das zu zerstören, was er am meisten liebte, um zu beweisen, dass seine Prinzipien echt waren.",
    },
    {
      text: "Als Hassan im Juni 1124 im Sterben lag, benannte er keinen Neffen und keinen Cousin. Er rief seine vier treuesten Kommandanten zusammen und ernannte Kiya Buzurg-Ummid — einen loyalen Soldaten ohne jede Blutsverwandtschaft — zum neuen Herrn von Alamut. Seine letzte Anweisung: gemeinsam dienen, \u201Ebis der Imam kommt, um sein Reich in Besitz zu nehmen\u201C. Er hatte sichergestellt — zum höchsten Preis, den ein Vater je zahlen kann —, dass niemand das hier je ein Familiengeschäft nennen würde.",
    },
    {
      text: "Er starb allein in seiner Kammer, im Schatten des Adlernests — ein Mann, der seinen Komfort, seine Blutlinie und vielleicht seine eigene Menschlichkeit für eine einzige Idee aufgab: dass niemand über dem Gesetz steht. Nicht deine Soldaten. Nicht deine Verbündeten. Nicht deine Söhne.",
    },
  ],
};

// ─── Push ─────────────────────────────────────────────────────────────

const stories = [
  { label: "SPANISH (es)", data: es },
  { label: "FRENCH (fr)", data: fr },
  { label: "GERMAN (de)", data: de },
];

for (const { label, data } of stories) {
  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅  ${label} pushed successfully  →  ${data.langStoryId}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      // Record already exists — overwrite with latest version
      await doc.send(new PutCommand({ TableName: TABLE, Item: data }));
      console.log(
        `✅  ${label} updated (overwritten)  →  ${data.langStoryId}`
      );
    } else {
      console.error(`❌  ${label} FAILED:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\nDone. All three language versions pushed.");
