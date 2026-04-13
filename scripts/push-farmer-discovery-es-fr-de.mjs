import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const timestamp = Math.floor(Date.now() / 1000);

// ── Shared fields (unchanged from English) ──────────────────────────────────
const base = {
  siteId: "terracotta-army",
  storyId: "farmer-discovery",
  icon: "\u{1F573}\uFE0F",
  tier: "A",
  source: 'Yang Zhifa interviews, Shaanxi Provincial Institute reports, "The Terracotta Warriors" by John Man',
  characters: [
    "Yang Zhifa \u2014 the farmer who changed history",
    "Yang Quanyi and Yang Peiyan \u2014 fellow villagers",
    "Yuan Zhongyi \u2014 the archaeologist who led excavation",
  ],
  era: "1974 AD \u2014 Modern discovery",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 109.2785, lat: 34.3841 },
  hasAudio: false,
  isFree: true,
  storyCategory: "tricksters_folk_tales",
  updatedAt: timestamp,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH
// ═══════════════════════════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#farmer-discovery",
  title: "El campesino que desenterr\u00f3 un imperio",
  subtitle: "C\u00f3mo la b\u00fasqueda de un pozo destap\u00f3 el mayor hallazgo arqueol\u00f3gico de la historia",
  excerpt:
    "Marzo de 1974. En un pueblo polvoriento a las afueras de Xi\u2019an, en China, un campesino llamado Yang Zhifa y dos de sus vecinos salieron a cavar un pozo. Una sequ\u00eda brutal estaba arrasando sus cosechas y necesitaban agua. Solo agua. Nada m\u00e1s.",
  moralOrLesson:
    "Los mayores descubrimientos no llegan buscando, sino de la mano del gesto m\u00e1s humilde: cubrir una necesidad sencilla.",
  paragraphs: [
    {
      text: "Marzo de 1974. En un pueblo polvoriento a las afueras de Xi\u2019an, en China, un campesino llamado Yang Zhifa y dos de sus vecinos salieron a cavar un pozo. Una sequ\u00eda brutal estaba arrasando sus cosechas y necesitaban agua. Solo agua. Nada m\u00e1s. Unos cuatro metros bajo tierra, la pala de Yang golpe\u00f3 algo duro. Pens\u00f3 que era una piedra. Se equivocaba.",
    },
    {
      text: "De la tierra fue saliendo un trozo de arcilla cocida. Luego otro. Y luego algo que parec\u00eda una cabeza humana: ojos serenos, una sonrisa apenas esbozada, el pelo esculpido con un detalle inquietante. Todo hecho de terracota. Los campesinos se quedaron helados. En la tradici\u00f3n popular china, desenterrar figuras puede despertar esp\u00edritus malignos. El instinto de Yang le gritaba que lo devolviera todo a la tierra y se largara de ah\u00ed.",
    },
    {
      text: "Pero la curiosidad \u2014 y ese sentido pr\u00e1ctico que solo tiene la gente del campo \u2014 ganaron la partida. Carg\u00f3 los fragmentos en su carretilla y los llev\u00f3 a la oficina local de patrimonio cultural. \u00bfSu recompensa por el viaje? Diez yuanes. Menos de dos d\u00f3lares. Ese fue el precio que se le puso al mayor hallazgo arqueol\u00f3gico del siglo veinte.",
    },
    {
      text: "En cuesti\u00f3n de semanas llegaron arque\u00f3logos del Instituto Provincial de Shaanxi. En cuesti\u00f3n de meses, el panorama completo sali\u00f3 a la luz: bajo esos campos de trigo se escond\u00eda un ej\u00e9rcito entero. M\u00e1s de ocho mil soldados de tama\u00f1o real, caballos y carros de guerra, todos construidos hace m\u00e1s de dos mil a\u00f1os para custodiar la tumba de Qin Shi Huang, el primer emperador que unific\u00f3 China en una sola naci\u00f3n.",
    },
    {
      text: "El descubrimiento lo cambi\u00f3 todo. El pueblo silencioso de Yang se convirti\u00f3 en uno de los sitios arqueol\u00f3gicos m\u00e1s visitados del planeta. Xi\u2019an pas\u00f3 de ser una ciudad olvidada del interior a un destino de clase mundial. China gan\u00f3 un s\u00edmbolo nacional tan poderoso como la Gran Muralla: la prueba viviente de que su civilizaci\u00f3n antigua a\u00fan pod\u00eda dejar al mundo moderno con la boca abierta.",
    },
    {
      text: "Pero hay una parte que casi nadie cuenta. La familia de Yang perdi\u00f3 sus tierras de cultivo por las excavaciones, confiscadas casi sin compensaci\u00f3n. Los funcionarios locales intentaron borrarlo de la historia y atribuirse el m\u00e9rito del hallazgo. El hombre que hab\u00eda desenterrado literalmente el ej\u00e9rcito de un emperador no pod\u00eda ni demostrar que estuvo ah\u00ed cuando ocurri\u00f3.",
    },
    {
      text: "A\u00f1os despu\u00e9s, el museo le dio un puesto en la tienda de recuerdos firmando libros sobre los Guerreros de Terracota para los turistas. Imag\u00ednalo: un campesino de m\u00e1s de setenta a\u00f1os, el rostro curtido por d\u00e9cadas de sol, sentado en un escritorio peque\u00f1o escribiendo \u00abYang Zhifa \u2014 descubridor de los Guerreros de Terracota\u00bb mientras ocho mil soldados inmortales esperaban en filas silenciosas al otro lado del muro.",
    },
    {
      text: "Yang Zhifa muri\u00f3 en 2024, a los noventa y un a\u00f1os. Nunca se hizo rico. Nunca fue famoso m\u00e1s all\u00e1 de esa mesa en la tienda de regalos. Pero dicen que \u00abel que busca, encuentra\u00bb \u2014 y Yang demostr\u00f3 que a veces el que no busca encuentra mucho m\u00e1s. Cuando los visitantes le preguntaban c\u00f3mo hab\u00eda descubierto un imperio, se encog\u00eda de hombros. \u00abEstaba cavando un pozo\u00bb, dec\u00eda. \u00abTen\u00eda sed.\u00bb",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH
// ═══════════════════════════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#farmer-discovery",
  title: "Le paysan qui a d\u00e9terr\u00e9 un empire",
  subtitle: "Comment un simple puits a r\u00e9v\u00e9l\u00e9 la plus grande d\u00e9couverte arch\u00e9ologique de l\u2019histoire",
  excerpt:
    "Mars 1974. Dans un village poussi\u00e9reux pr\u00e8s de Xi\u2019an, en Chine, un paysan du nom de Yang Zhifa et deux de ses voisins partent creuser un puits. Une s\u00e9cheresse terrible est en train de tuer leurs r\u00e9coltes et ils ont besoin d\u2019eau. Juste de l\u2019eau. Rien d\u2019autre.",
  moralOrLesson:
    "Les plus grandes d\u00e9couvertes ne viennent pas de ceux qui cherchent, mais du geste le plus simple\u00a0: r\u00e9pondre \u00e0 un besoin ordinaire.",
  paragraphs: [
    {
      text: "Mars 1974. Dans un village poussi\u00e9reux pr\u00e8s de Xi\u2019an, en Chine, un paysan du nom de Yang Zhifa et deux de ses voisins partent creuser un puits. Une s\u00e9cheresse terrible est en train de tuer leurs r\u00e9coltes et ils ont besoin d\u2019eau. Juste de l\u2019eau. Rien d\u2019autre. \u00c0 environ quatre m\u00e8tres de profondeur, la pelle de Yang heurte quelque chose de dur. Il pense que c\u2019est un caillou. Il se trompe.",
    },
    {
      text: "Il remonte un morceau d\u2019argile cuite. Puis un autre. Puis ce qui ressemble \u00e0 une t\u00eate humaine\u00a0: des yeux calmes, un l\u00e9ger sourire, des cheveux sculpt\u00e9s avec une pr\u00e9cision troublante. Le tout en terre cuite. Les paysans se figent. Dans les croyances populaires chinoises, d\u00e9terrer des figurines peut r\u00e9veiller des esprits mal\u00e9fiques. Tout l\u2019instinct de Yang lui crie de tout remettre en terre et de filer.",
    },
    {
      text: "Mais la curiosit\u00e9 \u2014 et ce bon sens brut qu\u2019ont les gens de la terre \u2014 l\u2019emporte. Il charge les fragments sur sa brouette et les emm\u00e8ne au bureau local du patrimoine. Sa r\u00e9compense\u00a0? Dix yuans. M\u00eame pas deux dollars. C\u2019est le prix qu\u2019on a mis sur ce qui allait devenir la plus grande d\u00e9couverte arch\u00e9ologique du vingti\u00e8me si\u00e8cle.",
    },
    {
      text: "En quelques semaines, des arch\u00e9ologues de l\u2019Institut provincial du Shaanxi d\u00e9barquent et commencent \u00e0 fouiller. En quelques mois, l\u2019ampleur du site \u00e9clate au grand jour\u00a0: sous ces champs de bl\u00e9 secs dormait une arm\u00e9e enti\u00e8re. Plus de huit mille soldats grandeur nature, des chevaux et des chars de guerre, tous fa\u00e7onn\u00e9s il y a plus de deux mille ans pour garder la tombe de Qin Shi Huang, le premier empereur \u00e0 avoir unifi\u00e9 la Chine.",
    },
    {
      text: "La d\u00e9couverte fait tout basculer. Le petit village de Yang devient l\u2019un des sites arch\u00e9ologiques les plus visit\u00e9s de la plan\u00e8te. Xi\u2019an passe de ville oubli\u00e9e de l\u2019int\u00e9rieur \u00e0 destination de classe mondiale. La Chine gagne un symbole national aussi puissant que la Grande Muraille \u2014 la preuve vivante que sa civilisation antique pouvait encore clouer sur place le monde moderne.",
    },
    {
      text: "Mais il y a une partie de l\u2019histoire qu\u2019on raconte rarement. La famille de Yang a perdu ses terres agricoles au profit des fouilles, saisies pratiquement sans compensation. Les autorit\u00e9s locales ont tent\u00e9 de l\u2019effacer du r\u00e9cit et de s\u2019attribuer le m\u00e9rite de la trouvaille. L\u2019homme qui avait litt\u00e9ralement d\u00e9terr\u00e9 l\u2019arm\u00e9e d\u2019un empereur ne pouvait m\u00eame pas prouver qu\u2019il \u00e9tait l\u00e0 quand \u00e7a s\u2019est pass\u00e9.",
    },
    {
      text: "Des ann\u00e9es plus tard, le mus\u00e9e finit par lui donner un poste \u00e0 la boutique de souvenirs, o\u00f9 il signe des livres pour les touristes. Imaginez la sc\u00e8ne\u00a0: un vieux paysan de plus de soixante-dix ans, le visage burin\u00e9 par des d\u00e9cennies de soleil, assis \u00e0 un petit bureau, \u00e9crivant \u00ab\u00a0Yang Zhifa \u2014 d\u00e9couvreur des Guerriers de terre cuite\u00a0\u00bb pendant que huit mille soldats immortels se tenaient en rangs silencieux de l\u2019autre c\u00f4t\u00e9 du mur.",
    },
    {
      text: "Yang Zhifa est mort en 2024, \u00e0 quatre-vingt-onze ans. Il n\u2019est jamais devenu riche. Il n\u2019a jamais \u00e9t\u00e9 c\u00e9l\u00e8bre au-del\u00e0 de cette petite table. On dit que \u00ab\u00a0qui cherche, trouve\u00a0\u00bb \u2014 mais Yang a prouv\u00e9 que parfois, c\u2019est celui qui ne cherche rien qui trouve tout. Quand les visiteurs lui demandaient comment il avait d\u00e9couvert un empire, il haussait les \u00e9paules. \u00ab\u00a0Je creusais un puits\u00a0\u00bb, disait-il. \u00ab\u00a0J\u2019avais soif.\u00a0\u00bb",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN
// ═══════════════════════════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#farmer-discovery",
  title: "Der Bauer, der ein Imperium ausgrub",
  subtitle: "Wie die Suche nach Wasser den gr\u00f6\u00dften arch\u00e4ologischen Fund der Geschichte ans Licht brachte",
  excerpt:
    "M\u00e4rz 1974. In einem staubigen Dorf vor den Toren von Xi\u2019an in China machen sich ein Bauer namens Yang Zhifa und zwei seiner Nachbarn daran, einen Brunnen zu graben. Eine erbarmungslose D\u00fcrre vernichtet ihre Ernte und sie brauchen Wasser. Nur Wasser. Sonst nichts.",
  moralOrLesson:
    "Die gr\u00f6\u00dften Entdeckungen kommen nicht von denen, die suchen, sondern aus der einfachsten Geste: einem schlichten Bed\u00fcrfnis nachzugehen.",
  paragraphs: [
    {
      text: "M\u00e4rz 1974. In einem staubigen Dorf vor den Toren von Xi\u2019an in China machen sich ein Bauer namens Yang Zhifa und zwei seiner Nachbarn daran, einen Brunnen zu graben. Eine erbarmungslose D\u00fcrre vernichtet ihre Ernte und sie brauchen Wasser. Nur Wasser. Sonst nichts. Etwa vier Meter tief st\u00f6\u00dft Yangs Schaufel auf etwas Hartes. Er denkt, es ist ein Stein. Er irrt sich.",
    },
    {
      text: "Er zieht ein St\u00fcck gebrannten Ton aus der Erde. Dann noch eins. Dann etwas, das aussieht wie ein menschlicher Kopf: ruhige Augen, ein angedeutetes L\u00e4cheln, sorgf\u00e4ltig modelliertes Haar \u2014 alles aus Terrakotta. Die Bauern erstarren. Im chinesischen Volksglauben kann das Ausgraben vergrabener Figuren b\u00f6se Geister wecken. Yangs Bauchgef\u00fchl schreit ihn an, das Ding zur\u00fcckzuwerfen und zu verschwinden.",
    },
    {
      text: "Aber die Neugier \u2014 und dieser n\u00fcchterne Pragmatismus, den nur Leute vom Land haben \u2014 gewinnt. Er l\u00e4dt die Bruchst\u00fccke auf seine Schubkarre und bringt sie zur \u00f6rtlichen Denkmalschutzstelle. Seine Belohnung? Zehn Yuan. Umgerechnet etwa anderthalb Dollar. Das war der Preis f\u00fcr den gr\u00f6\u00dften arch\u00e4ologischen Fund des zwanzigsten Jahrhunderts.",
    },
    {
      text: "Innerhalb weniger Wochen r\u00fccken Arch\u00e4ologen vom Provinzinstitut Shaanxi an und beginnen zu graben. Innerhalb weniger Monate wird das ganze Ausma\u00df klar: Unter diesen trockenen Weizenfeldern lag eine komplette Armee verborgen. \u00dcber achttausend lebensgroße Soldaten, Pferde und Kriegswagen \u2014 alle vor mehr als zweitausend Jahren gebaut, um das Grab von Qin Shi Huang zu bewachen, dem ersten Kaiser, der China zu einem einzigen Reich vereinte.",
    },
    {
      text: "Die Entdeckung stellt alles auf den Kopf. Yangs stilles Bauerndorf wird zu einer der meistbesuchten Ausgrabungsst\u00e4tten der Welt. Xi\u2019an verwandelt sich von einer vergessenen Provinzstadt in ein Reiseziel von Weltrang. China gewinnt ein Nationalsymbol, das so m\u00e4chtig ist wie die Gro\u00dfe Mauer selbst \u2014 der lebende Beweis, dass seine antike Zivilisation die moderne Welt noch immer zum Staunen bringen kann.",
    },
    {
      text: "Aber da ist ein Teil der Geschichte, den kaum jemand erz\u00e4hlt. Yangs Familie verlor ihr Ackerland an die Ausgrabungen \u2014 enteignet, praktisch ohne Entsch\u00e4digung. Lokale Beamte versuchten, ihn aus der Geschichte zu streichen und sich selbst den Fund zuzuschreiben. Der Mann, der buchst\u00e4blich die Armee eines Kaisers ausgegraben hatte, konnte nicht einmal beweisen, dass er dabei gewesen war.",
    },
    {
      text: "Jahre sp\u00e4ter gab ihm das Museum schlie\u00dflich einen Posten im Souvenirladen, wo er f\u00fcr Touristen B\u00fccher signierte. Stell dir das vor: ein alter Bauer, \u00fcber siebzig, das Gesicht gegerbt von Jahrzehnten in der Sonne, sitzt an einem kleinen Tisch und schreibt \u201eYang Zhifa \u2014 Entdecker der Terrakotta-Krieger\u201c, w\u00e4hrend achttausend unsterbliche Soldaten in stillen Reihen hinter der Wand stehen.",
    },
    {
      text: "Yang Zhifa starb 2024 mit einundneunzig Jahren. Er wurde nie reich. Er wurde nie ber\u00fchmt \u00fcber diesen kleinen Tisch hinaus. Man sagt: \u201eWer sucht, der findet\u201c \u2014 doch Yang bewies, dass manchmal der am meisten findet, der gar nicht sucht. Wenn Besucher ihn fragten, wie er ein Imperium entdeckt hatte, zuckte er nur mit den Schultern. \u201eIch hab einen Brunnen gegraben\u201c, sagte er. \u201eIch hatte Durst.\u201c",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════
async function pushStory(story) {
  const label = `${story.lang.toUpperCase()} → ${story.langStoryId}`;
  console.log(`\nPushing ${label}...`);

  // Validate JSON structure
  if (!story.siteId || !story.langStoryId || !story.paragraphs?.length) {
    throw new Error(`Validation failed for ${label}: missing required fields`);
  }
  if (story.paragraphs.some((p) => !p.text || p.text.length === 0)) {
    throw new Error(`Validation failed for ${label}: empty paragraph text`);
  }

  // Character/word count checks
  for (let i = 0; i < story.paragraphs.length; i++) {
    const p = story.paragraphs[i];
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    if (chars > 500) {
      console.warn(`  ⚠ Paragraph ${i + 1}: ${chars} chars (limit 500)`);
    }
    if (words > 100) {
      console.warn(`  ⚠ Paragraph ${i + 1}: ${words} words (limit 100)`);
    }
  }

  const totalChars = story.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  Total: ${story.paragraphs.length} paragraphs, ${totalChars} characters`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: story,
        ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✅ ${label} pushed successfully`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      // Record already exists — overwrite it
      console.log(`  Record exists, overwriting...`);
      await docClient.send(
        new PutCommand({
          TableName: "Story",
          Item: story,
        })
      );
      console.log(`  ✅ ${label} overwritten successfully`);
    } else {
      console.error(`  ❌ ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Pushing farmer-discovery: ES, FR, DE");
  console.log(`  Timestamp: ${timestamp} (${new Date(timestamp * 1000).toISOString()})`);
  console.log("═══════════════════════════════════════════════════════");

  await pushStory(es);
  await pushStory(fr);
  await pushStory(de);

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  All three languages pushed successfully ✅");
  console.log("═══════════════════════════════════════════════════════");
}

main().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
