import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const base = {
  siteId: "delphi",
  storyId: "oedipus-prophecy",
  icon: "\u{1F441}\uFE0F",
  storyCategory: "lost_found",
  era: "Mythological Era (Theban Cycle)",
  tier: "A",
  isFree: true,
  hasAudio: false,
  characters: ["Oedipus", "Jocasta", "Laius", "The Pythia", "The Sphinx", "Antigone"],
  coordinates: { lat: 38.4824, lng: 22.501 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 3,
  source: "Sophocles\u2019s Oedipus Rex and Oedipus at Colonus, Apollodorus\u2019s Bibliotheca, Pausanias\u2019s Description of Greece",
  updatedAt: now,
  disabled: false,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH
// ═══════════════════════════════════════════════════════════════

const es = {
  ...base,
  lang: "es",
  langStoryId: "es#oedipus-prophecy",
  title: "La condena de Edipo",
  subtitle: "La profec\u00eda que nadie pudo evitar",
  excerpt: "Todo empez\u00f3 con una pregunta que jam\u00e1s debi\u00f3 hacerse. Layo, rey de la ciudad griega de Tebas, viaj\u00f3 hasta Delfos \u2014 el santuario m\u00e1s sagrado de toda Grecia \u2014 para consultarle al Or\u00e1culo si tendr\u00eda un heredero.",
  moralOrLesson: "No se puede huir del destino: muchas veces, el intento de escapar es justo lo que lo hace cumplirse. La verdadera sabidur\u00eda no est\u00e1 en evitar lo inevitable, sino en aceptarlo.",
  paragraphs: [
    {
      text: "Todo empez\u00f3 con una pregunta que jam\u00e1s debi\u00f3 hacerse. Layo, rey de la ciudad griega de Tebas, viaj\u00f3 hasta Delfos \u2014 el santuario m\u00e1s sagrado de toda Grecia \u2014 para consultarle al Or\u00e1culo si tendr\u00eda un heredero. La respuesta fue devastadora: s\u00ed, tendr\u00eda un hijo. Pero ese hijo le quitar\u00eda la vida y terminar\u00eda cas\u00e1ndose con su propia madre. Layo, fuera de s\u00ed, orden\u00f3 que al reci\u00e9n nacido le atravesaran los tobillos con un clavo y lo dejaran morir en la monta\u00f1a. De ah\u00ed su nombre: Edipo, \u00abel de los pies hinchados\u00bb."
    },
    {
      text: "Pero el sirviente no fue capaz. Le entreg\u00f3 al beb\u00e9 a un pastor que pasaba por all\u00ed, y este lo llev\u00f3 hasta Corinto, donde los reyes \u2014 una pareja sin hijos \u2014 lo adoptaron como propio. Edipo creci\u00f3 como un pr\u00edncipe: querido, seguro de s\u00ed mismo, sin sospechar ni por un segundo que toda su vida estaba construida sobre una mentira."
    },
    {
      text: "Hasta que una noche, en medio de un banquete, un borracho solt\u00f3 que Edipo no era hijo leg\u00edtimo de sus padres. Trastornado, fue directo a Delfos a buscar la verdad. Pero el Or\u00e1culo no le respondi\u00f3 lo que quer\u00eda saber. Le dijo algo mucho peor: la misma profec\u00eda que ya hab\u00eda escuchado Layo. Matar\u00eda a su padre. Se casar\u00eda con su madre."
    },
    {
      text: "Edipo hizo lo m\u00e1s l\u00f3gico del mundo \u2014 y fue el peor error de su vida. Para proteger a los padres que amaba en Corinto, jur\u00f3 no volver jam\u00e1s. Y tom\u00f3 el camino contrario: hacia Tebas. Directo a los brazos del destino que intentaba esquivar. Dicen que el hombre propone y Dios dispone. Edipo propuso huir, y el destino ya lo estaba esperando al otro lado del camino."
    },
    {
      text: "En un cruce estrecho, se top\u00f3 con un hombre mayor en un carro que intent\u00f3 sacarlo del camino a la fuerza. Edipo, lleno de rabia, lo mat\u00f3. No ten\u00eda forma de saberlo: ese hombre era Layo. Su verdadero padre. La profec\u00eda ya se hab\u00eda cumplido a medias, y Edipo no ten\u00eda ni la menor idea."
    },
    {
      text: "Al llegar a Tebas, la ciudad entera viv\u00eda aterrorizada por la Esfinge \u2014 un monstruo con cuerpo de le\u00f3n y rostro de mujer que devoraba a todo el que no pudiera resolver su acertijo. \u00ab\u00bfQu\u00e9 camina en cuatro patas por la ma\u00f1ana, en dos al mediod\u00eda y en tres por la tarde?\u00bb Edipo respondi\u00f3 sin dudar: el ser humano. La Esfinge, derrotada, se lanz\u00f3 al vac\u00edo. El pueblo, agradecido, lo coron\u00f3 rey y le dio como esposa a la reina viuda. Se llamaba Yocasta. Era su madre."
    },
    {
      text: "Durante a\u00f1os, Edipo gobern\u00f3 bien. Tuvo hijos con Yocasta. La vida era buena. Hasta que una plaga devastadora cay\u00f3 sobre la ciudad y el Or\u00e1culo declar\u00f3 que Tebas estaba maldita porque el asesino del antiguo rey Layo segu\u00eda libre. Edipo, como buen rey, lanz\u00f3 una investigaci\u00f3n a fondo. Jur\u00f3 encontrar al culpable costara lo que costara. Y lo encontr\u00f3. El asesino era \u00e9l mismo."
    },
    {
      text: "Cuando la verdad sali\u00f3 a la luz \u2014 qui\u00e9n era realmente, con qui\u00e9n se hab\u00eda casado, qu\u00e9 hab\u00eda hecho \u2014, Yocasta se ahorc\u00f3. Edipo, incapaz de soportar lo que ahora ve\u00eda con claridad, arranc\u00f3 los broches del vestido de ella y se los clav\u00f3 en los ojos. Abandon\u00f3 Tebas ciego y destrozado, guiado por su hija Ant\u00edgona. Un hombre que hab\u00eda hecho todo bien y lo hab\u00eda perdido todo. Cuanto m\u00e1s r\u00e1pido huy\u00f3 de su destino, m\u00e1s r\u00e1pido corri\u00f3 hacia \u00e9l."
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FRENCH
// ═══════════════════════════════════════════════════════════════

const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#oedipus-prophecy",
  title: "La chute d\u2019\u0152dipe",
  subtitle: "La proph\u00e9tie \u00e0 laquelle personne n\u2019\u00e9chappe",
  excerpt: "Tout commence par une question qui n\u2019aurait jamais d\u00fb \u00eatre pos\u00e9e. La\u00efos, roi de Th\u00e8bes, se rend \u00e0 Delphes \u2014 le sanctuaire le plus sacr\u00e9 de la Gr\u00e8ce antique \u2014 pour demander \u00e0 l\u2019Oracle s\u2019il aura un h\u00e9ritier.",
  moralOrLesson: "On ne fuit pas son destin \u2014 souvent, c\u2019est en essayant de lui \u00e9chapper qu\u2019on le r\u00e9alise. La vraie sagesse n\u2019est pas d\u2019\u00e9viter l\u2019in\u00e9vitable, mais de l\u2019accepter.",
  paragraphs: [
    {
      text: "Tout commence par une question qui n\u2019aurait jamais d\u00fb \u00eatre pos\u00e9e. La\u00efos, roi de Th\u00e8bes, se rend \u00e0 Delphes \u2014 le sanctuaire le plus sacr\u00e9 de la Gr\u00e8ce antique \u2014 pour demander \u00e0 l\u2019Oracle s\u2019il aura un h\u00e9ritier. La r\u00e9ponse le d\u00e9truit. Oui, il aura un fils. Mais ce fils le tuera et \u00e9pousera sa propre m\u00e8re. Terrifi\u00e9, La\u00efos fait percer les chevilles du nouveau-n\u00e9 avec des \u00e9pingles et ordonne qu\u2019on l\u2019abandonne en montagne. Le nom \u0152dipe signifie litt\u00e9ralement \u00ab\u00a0pieds enfl\u00e9s\u00a0\u00bb."
    },
    {
      text: "Mais le serviteur n\u2019a pas le c\u0153ur de le faire. Il confie le b\u00e9b\u00e9 \u00e0 un berger de passage, qui l\u2019emporte jusqu\u2019\u00e0 Corinthe. L\u00e0-bas, le roi et la reine \u2014 un couple sans enfants \u2014 l\u2019adoptent comme leur propre fils. \u0152dipe grandit en prince\u00a0: aim\u00e9, s\u00fbr de lui, sans jamais soup\u00e7onner que toute sa vie repose sur un mensonge."
    },
    {
      text: "Jusqu\u2019au soir o\u00f9, au beau milieu d\u2019un banquet, un convive ivre l\u00e2che qu\u2019\u0152dipe n\u2019est pas le vrai fils de ses parents. Boulevers\u00e9, il file droit \u00e0 Delphes chercher la v\u00e9rit\u00e9. Mais l\u2019Oracle ne r\u00e9pond pas \u00e0 sa question. Elle lui ass\u00e8ne quelque chose de bien pire \u2014 la m\u00eame proph\u00e9tie que celle de La\u00efos\u00a0: il tuera son p\u00e8re et \u00e9pousera sa m\u00e8re."
    },
    {
      text: "\u0152dipe prend la d\u00e9cision la plus logique du monde \u2014 et la pire de sa vie. Pour prot\u00e9ger les parents qu\u2019il aime \u00e0 Corinthe, il jure de ne jamais y retourner. Et il prend la route oppos\u00e9e, vers Th\u00e8bes. Droit dans les bras du destin qu\u2019il cherche \u00e0 fuir. Chaque pas qu\u2019il fait pour s\u2019\u00e9loigner de la proph\u00e9tie le rapproche d\u2019elle."
    },
    {
      text: "Sur une route \u00e9troite, il croise un homme \u00e2g\u00e9 dans un char qui tente de le pousser hors du chemin. \u0152dipe, furieux, le tue sur le coup. Il ne pouvait pas le savoir\u00a0: cet homme \u00e9tait La\u00efos. Son vrai p\u00e8re. La proph\u00e9tie \u00e9tait d\u00e9j\u00e0 \u00e0 moiti\u00e9 accomplie, et \u0152dipe n\u2019en avait pas la moindre id\u00e9e."
    },
    {
      text: "En arrivant \u00e0 Th\u00e8bes, il trouve une ville terroris\u00e9e par le Sphinx \u2014 un monstre au corps de lion et au visage de femme qui d\u00e9vore quiconque \u00e9choue \u00e0 r\u00e9soudre son \u00e9nigme. \u00ab\u00a0Qu\u2019est-ce qui marche \u00e0 quatre pattes le matin, \u00e0 deux le midi et \u00e0 trois le soir\u00a0?\u00a0\u00bb \u0152dipe r\u00e9pond sans h\u00e9siter\u00a0: l\u2019\u00eatre humain. Le Sphinx, vaincu, se jette dans le vide. Le peuple reconnaissant couronne \u0152dipe roi et lui offre la reine veuve pour \u00e9pouse. Elle s\u2019appelle Jocaste. C\u2019est sa m\u00e8re."
    },
    {
      text: "Pendant des ann\u00e9es, \u0152dipe r\u00e8gne avec sagesse. Il a des enfants avec Jocaste. La vie est belle. Puis une peste d\u00e9vastatrice s\u2019abat sur la ville, et l\u2019Oracle d\u00e9clare que Th\u00e8bes est maudite parce que le meurtrier de l\u2019ancien roi La\u00efos n\u2019a jamais \u00e9t\u00e9 retrouv\u00e9. \u0152dipe lance une enqu\u00eate acharn\u00e9e, jurant de retrouver le coupable co\u00fbte que co\u00fbte. Jamais deux sans trois\u00a0: apr\u00e8s la proph\u00e9tie et le meurtre, c\u2019est la v\u00e9rit\u00e9 qui vient frapper \u00e0 sa porte. Le meurtrier, c\u2019est lui."
    },
    {
      text: "Quand tout \u00e9clate \u2014 qui il est vraiment, qui il a \u00e9pous\u00e9, ce qu\u2019il a fait \u2014, Jocaste se pend. \u0152dipe, incapable de supporter ce qu\u2019il voit d\u00e9sormais avec une clart\u00e9 insoutenable, arrache les broches de la robe de Jocaste et se les enfonce dans les yeux. Il quitte Th\u00e8bes aveugle et bris\u00e9, guid\u00e9 par sa fille Antigone. Un homme qui avait tout fait pour bien faire et qui avait tout perdu. Plus il fuyait son destin, plus vite il courait vers lui."
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// GERMAN
// ═══════════════════════════════════════════════════════════════

const de = {
  ...base,
  lang: "de",
  langStoryId: "de#oedipus-prophecy",
  title: "Das Verh\u00e4ngnis des \u00d6dipus",
  subtitle: "Die Prophezeiung, der niemand entkam",
  excerpt: "Alles begann mit einer Frage, die nie h\u00e4tte gestellt werden d\u00fcrfen. Laios, K\u00f6nig der griechischen Stadt Theben, reiste nach Delphi \u2014 dem heiligsten Ort der Antike \u2014, um das Orakel zu fragen, ob er einen Erben haben w\u00fcrde.",
  moralOrLesson: "Dem Schicksal kann man nicht entfliehen \u2014 oft ist es gerade der Versuch zu fliehen, der die Prophezeiung erf\u00fcllt. Wahre Weisheit liegt nicht darin, das Unvermeidliche zu vermeiden, sondern es anzunehmen.",
  paragraphs: [
    {
      text: "Alles begann mit einer Frage, die nie h\u00e4tte gestellt werden d\u00fcrfen. Laios, K\u00f6nig der griechischen Stadt Theben, reiste nach Delphi \u2014 dem heiligsten Ort der Antike \u2014, um das Orakel zu fragen, ob er einen Erben haben w\u00fcrde. Die Antwort zerst\u00f6rte ihn. Ja, er w\u00fcrde einen Sohn bekommen. Aber dieser Sohn w\u00fcrde ihn t\u00f6ten und seine eigene Mutter heiraten. Laios lie\u00df dem Neugeborenen die Kn\u00f6chel durchbohren und befahl, es in den Bergen auszusetzen. Der Name \u00d6dipus bedeutet w\u00f6rtlich \u00abSchwellfu\u00df\u00bb."
    },
    {
      text: "Aber der Diener brachte es nicht \u00fcbers Herz. Er gab das Baby einem vorbeiziehenden Hirten, der es nach Korinth trug \u2014 zum dortigen K\u00f6nigspaar, das keine eigenen Kinder hatte. Sie zogen \u00d6dipus als ihren Sohn auf, und er hinterfragte es nie. Er wuchs als Prinz auf: geliebt, selbstbewusst, ohne auch nur zu ahnen, dass sein ganzes Leben auf einer L\u00fcge gebaut war."
    },
    {
      text: "Bis eines Abends bei einem Fest ein betrunkener Gast herausplatzte, \u00d6dipus sei gar nicht das leibliche Kind seiner Eltern. Ersch\u00fcttert reiste er sofort nach Delphi, um die Wahrheit zu erfahren. Doch das Orakel beantwortete seine Frage nicht. Stattdessen verk\u00fcndete es etwas viel Schlimmeres \u2014 dieselbe Prophezeiung, die schon Laios geh\u00f6rt hatte: Er w\u00fcrde seinen Vater t\u00f6ten und seine Mutter heiraten."
    },
    {
      text: "\u00d6dipus traf die logischste Entscheidung der Welt \u2014 und die schlimmste. Um die Eltern zu sch\u00fctzen, die er in Korinth liebte, schwor er, nie zur\u00fcckzukehren. Stattdessen schlug er die entgegengesetzte Richtung ein: nach Theben. Direkt in die Arme des Schicksals, vor dem er floh. Der Mensch denkt, Gott lenkt \u2014 und \u00d6dipus dachte, er h\u00e4tte einen Plan."
    },
    {
      text: "Auf einem engen Weg geriet er in Streit mit einem \u00e4lteren Mann in einem Wagen, der ihn von der Stra\u00dfe dr\u00e4ngen wollte. \u00d6dipus t\u00f6tete ihn im Zorn. Er konnte nicht wissen: Dieser Mann war Laios. Sein leiblicher Vater. Die Prophezeiung hatte sich bereits zur H\u00e4lfte erf\u00fcllt, und \u00d6dipus hatte nicht die geringste Ahnung."
    },
    {
      text: "Als er Theben erreichte, wurde die Stadt von der Sphinx terrorisiert \u2014 einem Ungeheuer mit dem K\u00f6rper eines L\u00f6wen und dem Gesicht einer Frau, das jeden verschlang, der sein R\u00e4tsel nicht l\u00f6sen konnte. \u00abWas geht am Morgen auf vier Beinen, am Mittag auf zweien und am Abend auf dreien?\u00bb \u00d6dipus antwortete ohne zu z\u00f6gern: der Mensch. Die Sphinx st\u00fcrzte sich in den Abgrund. Das dankbare Volk kr\u00f6nte ihn zum K\u00f6nig und gab ihm die verwitwete K\u00f6nigin zur Frau. Ihr Name war Iokaste. Sie war seine Mutter."
    },
    {
      text: "Jahrelang regierte \u00d6dipus gut. Er und Iokaste bekamen gemeinsam Kinder. Das Leben war gut. Dann brach eine verheerende Seuche \u00fcber die Stadt herein, und das Orakel erkl\u00e4rte, Theben sei verflucht, weil der M\u00f6rder des fr\u00fcheren K\u00f6nigs Laios nie gefunden wurde. \u00d6dipus startete eine gr\u00fcndliche Untersuchung und schwor, den Schuldigen zu finden, koste es, was es wolle. Er fand ihn. Der M\u00f6rder war er selbst."
    },
    {
      text: "Als die ganze Wahrheit ans Licht kam \u2014 wer er wirklich war, wen er geheiratet hatte, was er getan hatte \u2014, erh\u00e4ngte sich Iokaste. \u00d6dipus, unf\u00e4hig zu ertragen, was er nun mit brutaler Klarheit sah, riss die Spangen aus ihrem Kleid und stach sie sich in die Augen. Er verlie\u00df Theben blind und gebrochen, gef\u00fchrt von seiner Tochter Antigone. Ein Mann, der alles richtig gemacht hatte und trotzdem alles verlor. Je schneller er vor seinem Schicksal floh, desto schneller rannte er ihm entgegen."
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════

async function pushStory(story) {
  const label = `${story.lang} — ${story.title}`;
  console.log(`\nPushing: ${label}`);
  console.log(`  siteId: ${story.siteId}`);
  console.log(`  langStoryId: ${story.langStoryId}`);
  console.log(`  paragraphs: ${story.paragraphs.length}`);

  // Validate before push
  if (!story.siteId || !story.langStoryId || !story.lang || !story.title) {
    throw new Error(`Missing required fields for ${label}`);
  }
  if (!story.paragraphs || story.paragraphs.length < 6) {
    throw new Error(`Too few paragraphs for ${label}: ${story.paragraphs.length}`);
  }
  for (let i = 0; i < story.paragraphs.length; i++) {
    const p = story.paragraphs[i];
    if (!p.text || p.text.length === 0) {
      throw new Error(`Empty paragraph ${i} for ${label}`);
    }
    if (p.text.length > 550) {
      console.warn(`  WARNING: paragraph ${i} is ${p.text.length} chars (limit ~500)`);
    }
  }

  const totalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  total chars: ${totalChars}`);

  await ddb.send(new PutCommand({
    TableName: TABLE,
    Item: story,
    ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
  }));

  console.log(`  SUCCESS: ${label} pushed.`);
}

async function main() {
  const stories = [es, fr, de];

  for (const story of stories) {
    try {
      await pushStory(story);
    } catch (err) {
      if (err.name === "ConditionalCheckFailedException") {
        console.error(`  SKIPPED (already exists): ${story.langStoryId}`);
      } else {
        console.error(`  FAILED: ${story.lang} — ${err.message}`);
        throw err;
      }
    }
  }

  console.log("\n=== ALL DONE ===");
}

main().catch((err) => {
  console.error("\nFATAL:", err);
  process.exit(1);
});
