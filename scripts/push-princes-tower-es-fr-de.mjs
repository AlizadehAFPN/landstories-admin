import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "tower-of-london",
  storyId: "princes-in-the-tower",
  coordinates: { lat: 51.5081, lng: -0.0759 },
  disabled: false,
  era: "1483 AD - Wars of the Roses",
  hasAudio: false,
  icon: "\u{1F47B}",
  image: "",
  isFree: true,
  readingTimeMinutes: 4,
  source:
    'Sir Thomas More\'s "History of King Richard III", Dominic Mancini\'s contemporary account, Polydore Vergil\'s "Anglica Historia", 1933 forensic examination report',
  storyCategory: "ghosts_curses",
  thumbnail: "",
  tier: "S",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
//  SPANISH — Los pr\u00edncipes de la Torre
//  Proverb subverted: "A r\u00edo revuelto, ganancia de pescadores"
// ═══════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#princes-in-the-tower",
  title: "Los pr\u00edncipes de la Torre",
  subtitle: "El misterio m\u00e1s oscuro de la corona inglesa",
  excerpt:
    "En la primavera de 1483, un ni\u00f1o de doce a\u00f1os se convirti\u00f3 en rey de Inglaterra. Eduardo V acababa de perder a su padre, y lo enviaron a la Torre de Londres junto con su hermano Ricardo, de nueve a\u00f1os.",
  moralOrLesson:
    "El poder devora hasta a los inocentes, y hay verdades que quiz\u00e1 nadie encuentre jam\u00e1s \u2014 porque a nadie le conviene buscarlas",
  characters: [
    "Edward V - The boy king, aged 12",
    "Richard Duke of York - His younger brother, aged 9",
    "Richard III - Their uncle, Lord Protector turned King",
    "Sir James Tyrrell - Alleged assassin",
    "Elizabeth Woodville - The princes' mother",
    "Perkin Warbeck - Pretender claiming to be Prince Richard",
  ],
  paragraphs: [
    {
      text: "En la primavera de 1483, un ni\u00f1o de doce a\u00f1os se convirti\u00f3 en rey de Inglaterra. Eduardo V acababa de perder a su padre, y lo enviaron a la Torre de Londres junto con su hermano Ricardo, que ten\u00eda nueve a\u00f1os. La Torre, en aquella \u00e9poca, todav\u00eda era un palacio real, no la prisi\u00f3n siniestra que imaginamos hoy. Su t\u00edo, Ricardo de Gloucester, fue nombrado protector hasta que Eduardo fuera mayor de edad. Durante semanas, la gente los vio jugar en los jardines, tirar con arco. Y de repente, dejaron de verlos. Para el verano, los dos pr\u00edncipes hab\u00edan desaparecido.",
    },
    {
      text: "El t\u00edo no perdi\u00f3 el tiempo. Declar\u00f3 ileg\u00edtimos a los dos ni\u00f1os alegando que el matrimonio de sus padres no era v\u00e1lido: su padre, Eduardo IV, ya estaba comprometido en secreto con otra mujer antes de casarse con su madre. Con los ni\u00f1os borrados del mapa de un plumazo, se coron\u00f3 como Ricardo III. Los rumores volaron por toda Europa. El canciller de Francia lo acus\u00f3 p\u00fablicamente de haber matado a sus propios sobrinos. Todo el mundo se hac\u00eda la misma pregunta: \u00bfqu\u00e9 les pas\u00f3 a los pr\u00edncipes?",
    },
    {
      text: "El relato m\u00e1s conocido lo escribi\u00f3 Tom\u00e1s Moro, unos treinta a\u00f1os despu\u00e9s de los hechos. Seg\u00fan \u00e9l, Ricardo envi\u00f3 a un tal Sir James Tyrrell a la Torre con la orden de matar a los ni\u00f1os. Tyrrell contrat\u00f3 a dos hombres que se colaron de noche en la habitaci\u00f3n de los pr\u00edncipes y los asfixiaron con sus propias almohadas mientras dorm\u00edan. Tyrrell supuestamente confes\u00f3 antes de su ejecuci\u00f3n en 1502. Pero esa confesi\u00f3n jam\u00e1s ha aparecido. El documento no existe. Y quien m\u00e1s se benefici\u00f3 de su \"descubrimiento\" fue Enrique VII \u2014 el nuevo rey.",
    },
    {
      text: "Casi dos siglos despu\u00e9s, en 1674, unos obreros que demol\u00edan una escalera dentro de la Torre encontraron un cofre de madera enterrado bajo las piedras. Dentro: los esqueletos de dos ni\u00f1os, con los huesos entrelazados. Carlos II orden\u00f3 sellar los restos en una urna de m\u00e1rmol en la Abad\u00eda de Westminster. En 1933, unos m\u00e9dicos examinaron los huesos y concluyeron que correspond\u00edan a ni\u00f1os de unas doce y diez a\u00f1os \u2014 las edades de los pr\u00edncipes. Una prueba de ADN podr\u00eda resolverlo hoy. La Abad\u00eda se ha negado a abrir la urna cada vez que alguien lo ha pedido.",
    },
    {
      text: "Entonces, \u00bfqui\u00e9n fue? Algunos historiadores apuntan a Enrique VII, no a Ricardo. Enrique tom\u00f3 el trono tras derrotar a Ricardo en la batalla de Bosworth en 1485, la que puso fin a la Guerra de las Rosas \u2014 treinta a\u00f1os de guerra civil que desangraron a Inglaterra. Los pr\u00edncipes eran una amenaza mayor para Enrique que para Ricardo. Otros se\u00f1alan al duque de Buckingham, un noble ambicioso con sus propios planes para la corona. A r\u00edo revuelto, ganancia de pescadores \u2014 y en aquella corte, todos pescaban.",
    },
    {
      text: "Y luego viene el giro m\u00e1s extra\u00f1o. En la d\u00e9cada de 1490, un joven llamado Perkin Warbeck apareci\u00f3 en las cortes europeas asegurando ser el pr\u00edncipe Ricardo \u2014 el hermano menor, vivo, fugado. Era tan convincente que los reyes de Francia y Escocia respaldaron su causa. Lanz\u00f3 dos invasiones contra Inglaterra antes de ser capturado y ejecutado. \u00bfEra realmente el pr\u00edncipe perdido? Casi seguro que no. Pero nadie pudo demostrarlo entonces, y nadie puede demostrarlo ahora.",
    },
    {
      text: "M\u00e1s de quinientos a\u00f1os despu\u00e9s, dos peque\u00f1os esqueletos descansan en una urna de m\u00e1rmol en Westminster, y seguimos sin saber de qui\u00e9n son. No sabemos qui\u00e9n dio la orden. Ni siquiera sabemos con certeza si los pr\u00edncipes fueron asesinados. La Torre de Londres ha guardado mil secretos a lo largo de los siglos, pero este es el que nunca ha soltado. Algunos misterios sobreviven no porque se hayan perdido las pruebas \u2014 sino porque a nadie con poder le conviene que aparezcan.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  FRENCH — Les princes de la Tour
//  Proverb subverted: "L'app\u00e9tit vient en mangeant"
// ═══════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#princes-in-the-tower",
  title: "Les princes de la Tour",
  subtitle: "Le myst\u00e8re le plus gla\u00e7ant de la couronne d'Angleterre",
  excerpt:
    "Au printemps 1483, un gar\u00e7on de douze ans est devenu roi d'Angleterre. \u00c9douard V venait de perdre son p\u00e8re, et on l'a envoy\u00e9 \u00e0 la Tour de Londres avec son fr\u00e8re cadet Richard, qui avait neuf ans.",
  moralOrLesson:
    "Le pouvoir d\u00e9vore jusqu'aux innocents, et certaines v\u00e9rit\u00e9s ne seront peut-\u00eatre jamais d\u00e9couvertes \u2014 parce que personne au pouvoir ne veut les trouver",
  characters: [
    "Edward V - The boy king, aged 12",
    "Richard Duke of York - His younger brother, aged 9",
    "Richard III - Their uncle, Lord Protector turned King",
    "Sir James Tyrrell - Alleged assassin",
    "Elizabeth Woodville - The princes' mother",
    "Perkin Warbeck - Pretender claiming to be Prince Richard",
  ],
  paragraphs: [
    {
      text: "Au printemps 1483, un gar\u00e7on de douze ans est devenu roi d'Angleterre. \u00c9douard V venait de perdre son p\u00e8re, et on l'a envoy\u00e9 \u00e0 la Tour de Londres avec son fr\u00e8re cadet Richard, qui avait neuf ans. \u00c0 l'\u00e9poque, la Tour n'\u00e9tait pas la prison sinistre qu'on imagine \u2014 c'\u00e9tait un palais royal. Leur oncle, Richard de Gloucester, a \u00e9t\u00e9 nomm\u00e9 protecteur en attendant que le jeune roi soit en \u00e2ge de gouverner. On les voyait jouer dans les jardins, tirer \u00e0 l'arc. Puis un jour, plus personne ne les a vus. \u00c0 l'\u00e9t\u00e9, les deux princes avaient disparu.",
    },
    {
      text: "On dit que l'app\u00e9tit vient en mangeant. Richard de Gloucester a d'abord go\u00fbt\u00e9 au pouvoir \u2014 puis il a d\u00e9vor\u00e9 sa propre famille. Il a d\u00e9clar\u00e9 les deux gar\u00e7ons ill\u00e9gitimes, sous pr\u00e9texte que le mariage de leurs parents \u00e9tait nul : leur p\u00e8re, \u00c9douard IV, avait d\u00e9j\u00e0 promis sa main en secret \u00e0 une autre femme. Les enfants ray\u00e9s d'un trait de plume, il s'est fait couronner sous le nom de Richard III. Les rumeurs ont travers\u00e9 l'Europe. Le chancelier de France l'a accus\u00e9 publiquement d'avoir assassin\u00e9 ses propres neveux. Partout, la m\u00eame question : qu'est-il arriv\u00e9 aux princes ?",
    },
    {
      text: "Le r\u00e9cit le plus c\u00e9l\u00e8bre est celui de Thomas More, \u00e9crit une trentaine d'ann\u00e9es apr\u00e8s les faits. Selon lui, Richard a envoy\u00e9 un certain Sir James Tyrrell \u00e0 la Tour avec l'ordre d'\u00e9liminer les gar\u00e7ons. Tyrrell a engag\u00e9 deux hommes qui se sont gliss\u00e9s la nuit dans la chambre des princes et les ont \u00e9touff\u00e9s avec leurs oreillers pendant qu'ils dormaient. Tyrrell aurait avou\u00e9 avant sa propre ex\u00e9cution en 1502. Mais personne n'a jamais retrouv\u00e9 cet aveu. Le document n'existe pas. Et celui qui avait le plus int\u00e9r\u00eat \u00e0 ce que cette \"confession\" existe ? Henri VII \u2014 le nouveau roi.",
    },
    {
      text: "Pr\u00e8s de deux si\u00e8cles plus tard, en 1674, des ouvriers qui d\u00e9molissaient un escalier dans la Tour ont d\u00e9couvert un coffre en bois enfoui sous les pierres. Dedans : les squelettes de deux enfants, les os emm\u00eal\u00e9s. Charles II a fait sceller les restes dans une urne en marbre \u00e0 l'abbaye de Westminster. En 1933, des m\u00e9decins ont examin\u00e9 les os et conclu qu'ils correspondaient \u00e0 des enfants d'environ douze et dix ans \u2014 l'\u00e2ge des princes. Un test ADN pourrait trancher aujourd'hui. L'abbaye a refus\u00e9 chaque demande d'ouverture de l'urne.",
    },
    {
      text: "Alors, qui a fait le coup ? Certains historiens pointent du doigt Henri VII, pas Richard. Henri a pris le tr\u00f4ne apr\u00e8s avoir vaincu Richard \u00e0 la bataille de Bosworth en 1485, celle qui a mis fin \u00e0 la guerre des Deux-Roses \u2014 trente ans de guerre civile sanglante. Les princes mena\u00e7aient davantage la l\u00e9gitimit\u00e9 d'Henri que celle de Richard. D'autres accusent le duc de Buckingham, un noble ambitieux qui lorgnait la couronne. \u00c0 cette table du pouvoir, tout le monde avait un couteau cach\u00e9 sous la nappe.",
    },
    {
      text: "Et puis il y a le retournement le plus \u00e9trange. Dans les ann\u00e9es 1490, un jeune homme du nom de Perkin Warbeck s'est pr\u00e9sent\u00e9 dans les cours europ\u00e9ennes en affirmant \u00eatre le prince Richard \u2014 le cadet, vivant, \u00e9chapp\u00e9. Il \u00e9tait assez convaincant pour que les rois de France et d'\u00c9cosse soutiennent sa cause. Il a lanc\u00e9 deux invasions de l'Angleterre avant d'\u00eatre captur\u00e9 et ex\u00e9cut\u00e9. \u00c9tait-il vraiment le prince disparu ? Presque certainement pas. Mais personne n'a pu le prouver alors, et personne ne le peut aujourd'hui.",
    },
    {
      text: "Plus de cinq cents ans apr\u00e8s, deux petits squelettes reposent dans une urne de marbre \u00e0 Westminster, et on ne sait toujours pas \u00e0 qui appartiennent ces os. On ne sait pas qui a donn\u00e9 l'ordre. On ne sait m\u00eame pas avec certitude si les princes ont \u00e9t\u00e9 assassin\u00e9s. La Tour de Londres a gard\u00e9 mille secrets au fil des si\u00e8cles, mais celui-ci est le seul qu'elle n'a jamais l\u00e2ch\u00e9. Certains myst\u00e8res survivent non pas parce que les preuves ont disparu \u2014 mais parce que personne au pouvoir n'a jamais voulu qu'on les retrouve.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  GERMAN — Die Prinzen im Tower
//  Proverb subverted: "Totgesagte leben l\u00e4nger"
// ═══════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#princes-in-the-tower",
  title: "Die Prinzen im Tower",
  subtitle: "Das dunkelste R\u00e4tsel der englischen Krone",
  excerpt:
    "Im Fr\u00fchling 1483 wurde ein zw\u00f6lfj\u00e4hriger Junge K\u00f6nig von England. Eduard V. hatte gerade seinen Vater verloren, und man schickte ihn zusammen mit seinem neunj\u00e4hrigen Bruder Richard in den Tower von London.",
  moralOrLesson:
    "Macht verschlingt selbst die Unschuldigsten, und manche Wahrheiten werden vielleicht nie gefunden \u2014 weil niemand an der Macht sie finden will",
  characters: [
    "Edward V - The boy king, aged 12",
    "Richard Duke of York - His younger brother, aged 9",
    "Richard III - Their uncle, Lord Protector turned King",
    "Sir James Tyrrell - Alleged assassin",
    "Elizabeth Woodville - The princes' mother",
    "Perkin Warbeck - Pretender claiming to be Prince Richard",
  ],
  paragraphs: [
    {
      text: "Im Fr\u00fchling 1483 wurde ein zw\u00f6lfj\u00e4hriger Junge K\u00f6nig von England. Eduard V. hatte gerade seinen Vater verloren, und man schickte ihn zusammen mit seinem neunj\u00e4hrigen Bruder Richard in den Tower von London \u2014 der damals noch ein k\u00f6niglicher Palast war, nicht das d\u00fcstere Gef\u00e4ngnis, das wir uns heute vorstellen. Ihr Onkel, Richard von Gloucester, \u00fcbernahm die Regentschaft, bis Eduard alt genug w\u00e4re, selbst zu herrschen. Man sah die Jungen in den G\u00e4rten spielen, Pfeile schie\u00dfen. Dann h\u00f6rten die Sichtungen auf. Bis zum Sommer waren beide Prinzen verschwunden.",
    },
    {
      text: "Der Onkel handelte schnell. Er erkl\u00e4rte beide Jungen f\u00fcr illegitim \u2014 mit der Begr\u00fcndung, die Ehe ihrer Eltern sei ung\u00fcltig gewesen, weil ihr Vater Eduard IV. bereits heimlich einer anderen Frau die Ehe versprochen hatte. Die Kinder per Federstrich beseitigt, kr\u00f6nte er sich selbst als Richard III. Die Ger\u00fcchte jagten durch Europa. Der franz\u00f6sische Kanzler beschuldigte Richard \u00f6ffentlich, seine eigenen Neffen ermordet zu haben. \u00dcberall dieselbe Frage: Was ist mit den Prinzen geschehen?",
    },
    {
      text: "Der ber\u00fchmteste Bericht stammt von Thomas Morus, geschrieben rund drei\u00dfig Jahre nach den Ereignissen. Laut Morus schickte Richard einen gewissen Sir James Tyrrell in den Tower, um die Jungen zu t\u00f6ten. Tyrrell heuerte zwei M\u00e4nner an, die sich nachts in das Zimmer der Prinzen schlichen und sie im Schlaf mit ihren Kissen erstickten. Tyrrell soll vor seiner eigenen Hinrichtung 1502 gestanden haben. Nur hat dieses Gest\u00e4ndnis nie jemand gefunden. Das Dokument existiert nicht. Und wer am meisten von dieser \u201eEnth\u00fcllung\u201c profitierte? Heinrich VII. \u2014 der neue K\u00f6nig.",
    },
    {
      text: "Fast zwei Jahrhunderte sp\u00e4ter, 1674, stie\u00dfen Arbeiter beim Abriss einer Treppe im Tower auf eine Holzkiste unter den Steinen. Darin: die Skelette zweier Kinder, die Knochen ineinander verschlungen. K\u00f6nig Karl II. lie\u00df die \u00dcberreste in einer Marmorurne in der Westminster Abbey versiegeln. 1933 untersuchten \u00c4rzte die Knochen und kamen zu dem Schluss, dass sie zu Kindern von etwa zw\u00f6lf und zehn Jahren passten \u2014 dem Alter der Prinzen. Ein DNA-Test k\u00f6nnte das R\u00e4tsel heute l\u00f6sen. Die Abbey hat jeden Antrag auf \u00d6ffnung der Urne abgelehnt.",
    },
    {
      text: "Wer war es also wirklich? Manche Historiker zeigen nicht auf Richard, sondern auf Heinrich VII. Heinrich nahm den Thron ein, nachdem er Richard in der Schlacht von Bosworth 1485 besiegt hatte \u2014 der Schlacht, die die Rosenkriege beendete, drei\u00dfig Jahre B\u00fcrgerkrieg in England. Die Prinzen waren f\u00fcr Heinrichs Thronanspruch eine weit gr\u00f6\u00dfere Bedrohung als f\u00fcr Richards. Andere beschuldigen den Herzog von Buckingham, einen machthungrigen Adligen mit eigenen Ambitionen. An Motiven hat es in dieser Geschichte niemandem gefehlt.",
    },
    {
      text: "Und dann die seltsamste Wendung von allen. Totgesagte leben l\u00e4nger, sagt man \u2014 und tats\u00e4chlich tauchte in den 1490er-Jahren ein junger Mann namens Perkin Warbeck an den H\u00f6fen Europas auf. Er behauptete, der Prinz Richard zu sein \u2014 der j\u00fcngere Bruder, am Leben, geflohen. Er war \u00fcberzeugend genug, dass die K\u00f6nige von Frankreich und Schottland seine Sache unterst\u00fctzten. Er startete zwei Invasionen Englands, bevor man ihn fasste und hinrichtete. War er wirklich der verlorene Prinz? Fast sicher nicht. Aber beweisen konnte es damals niemand \u2014 und heute auch nicht.",
    },
    {
      text: "Mehr als f\u00fcnfhundert Jahre sp\u00e4ter ruhen zwei kleine Skelette in einer Marmorurne in Westminster, und wir wissen immer noch nicht, wessen Knochen das sind. Wir wissen nicht, wer den Befehl gab. Wir wissen nicht einmal mit Sicherheit, ob die Prinzen \u00fcberhaupt ermordet wurden. Der Tower von London hat im Lauf der Jahrhunderte tausend Geheimnisse geh\u00fctet \u2014 aber dieses ist das eine, das er nie preisgegeben hat. Manche R\u00e4tsel \u00fcberdauern nicht, weil die Beweise verschwunden sind \u2014 sondern weil niemand an der Macht sie jemals finden wollte.",
    },
  ],
};

// ─── Push to DynamoDB ───
async function pushStory(item, label) {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      // Item already exists — overwrite it
      await docClient.send(
        new PutCommand({
          TableName: "Story",
          Item: item,
        })
      );
      console.log(
        `\u2705 ${label} pushed successfully (overwritten) (langStoryId: ${item.langStoryId})`
      );
    } else {
      console.error(`\u274c ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("\n\u2550\u2550\u2550 Pushing Princes in the Tower \u2014 es, fr, de \u2550\u2550\u2550\n");
  console.log(`Timestamp: ${now}\n`);

  await pushStory(es, "SPANISH (es)");
  await pushStory(fr, "FRENCH  (fr)");
  await pushStory(de, "GERMAN  (de)");

  console.log("\n\u2550\u2550\u2550 All done \u2550\u2550\u2550\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
