const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "knossos",
  storyId: "bull-leaping",
  characters: ["Minoan bull-leapers", "The sacred bulls"],
  coordinates: { lng: 25.1631, lat: 35.2981 },
  disabled: false,
  era: "Minoan period (2000-1450 BCE)",
  hasAudio: false,
  icon: "\u{1F3C3}",
  image: "",
  isFree: true,
  readingTimeMinutes: 4,
  source:
    "Knossos frescoes, Minoan seal impressions, Sir Arthur Evans\u2019s Palace of Minos, modern archaeological analysis",
  storyCategory: "crowns_conquests",
  thumbnail: "",
  tier: "A",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════
// SPANISH \u2014 La danza del toro
// ═══════════════════════════════════════════════════════
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#bull-leaping",

  title: "La danza del toro",
  subtitle: "El salto mortal que defini\u00f3 a la Creta minoica",

  excerpt:
    "Imagina un toro del tama\u00f1o de un coche peque\u00f1o, a toda velocidad. Delante, un adolescente con los brazos abiertos. No para esquivarlo. No para huir. Para agarrar esos cuernos y volar por encima del lomo. Eso hac\u00edan los minoicos en Cnosos hace m\u00e1s de 3.500 a\u00f1os.",

  moralOrLesson:
    "El valor transforma el peligro en belleza. Los minoicos no huyeron de lo salvaje: bailaron con ello, convirtiendo el riesgo mortal en arte sagrado.",

  paragraphs: [
    {
      text: "Imagina un toro del tama\u00f1o de un coche peque\u00f1o, a toda velocidad. Delante, un adolescente con los brazos abiertos. No para esquivarlo. No para huir. Para agarrar esos cuernos y volar por encima del lomo como un gimnasta clavando la recepci\u00f3n. Hombres y mujeres por igual. Eso pintaron los minoicos en las paredes de Cnosos, su inmenso palacio de la Edad de Bronce en Creta, hace m\u00e1s de 3.500 a\u00f1os. El famoso Fresco del Salto del Toro lo captura todo: el agarre, el salto mortal, la ca\u00edda perfecta.",
    },
    {
      text: "As\u00ed funcionaba. El saltador corr\u00eda directo hacia el toro en plena carga, le agarraba los cuernos y usaba la sacudida natural de la cabeza como trampol\u00edn \u2014 lanz\u00e1ndose en un salto mortal por encima del lomo. Detr\u00e1s esperaban compa\u00f1eros listos para recibirlo o desviar al animal si algo sal\u00eda mal. Todo duraba segundos. No hab\u00eda margen de error. O lo clavabas, o el toro te clavaba a ti.",
    },
    {
      text: "No eran animales de granja. Los toros del arte minoico parecen los antepasados salvajes del ganado actual: bestias de media tonelada con cuernos capaces de matarte en un parpadeo. Atletas modernos han intentado recrear el salto y la mayor\u00eda ha fracasado. Los animales son demasiado r\u00e1pidos, demasiado impredecibles. Los minoicos que lo consegu\u00edan deb\u00edan entrenar desde ni\u00f1os, forjando reflejos sobrehumanos. Dicen que a la tercera va la vencida. Aqu\u00ed no hab\u00eda tercera. A veces, ni segunda.",
    },
    {
      text: "Pero lo fascinante es esto: los frescos no muestran miedo. Los saltadores parecen elegantes, casi alegres. Y a diferencia de las corridas de toros, donde el objetivo es dominar y matar al animal, el salto minoico era algo completamente distinto. No luchaban contra el toro \u2014 bailaban con \u00e9l. Cada imagen muestra al animal como un compa\u00f1ero magn\u00edfico y poderoso, no como un enemigo. No era conquista. Era respeto.",
    },
    {
      text: "Nadie sabe exactamente por qu\u00e9 lo hac\u00edan. Algunos historiadores creen que era un ritual de fertilidad: el toro representaba la fuerza bruta de la naturaleza, y el salto demostraba que el ser humano pod\u00eda convivir con esa fuerza sin destruirla. Otros piensan que era una prueba de madurez, el examen definitivo para demostrar que estabas listo para la vida adulta. Otros lo conectan con un antiguo dios-toro venerado en todo el Mediterr\u00e1neo. Sea cual sea la raz\u00f3n, el salto del toro fue el coraz\u00f3n de la cultura minoica durante siglos.",
    },
    {
      text: "Cuando el arque\u00f3logo brit\u00e1nico Arthur Evans desenterr\u00f3 el Fresco del Salto del Toro a principios del siglo XX, supo de inmediato que no era fantas\u00eda: mostraba una pr\u00e1ctica real. Public\u00f3 sus hallazgos en una obra llamada El Palacio de Minos, y el mundo no dej\u00f3 de debatir. \u00bfEra f\u00edsicamente posible? Los expertos discutieron durante d\u00e9cadas. Pero haza\u00f1as similares existen hoy: en partes de \u00c1frica Oriental y Espa\u00f1a, la gente todav\u00eda salta sobre reses vivas. Los minoicos simplemente lo hac\u00edan con la vida en juego.",
    },
    {
      text: "Y ahora, lo que no te va a dejar dormir. Algunos investigadores creen que el salto del toro es la historia real detr\u00e1s del Minotauro \u2014 el monstruo mitad hombre, mitad toro del laberinto bajo Cnosos. El mito dice que Atenas enviaba a sus j\u00f3venes a Creta como sacrificio. Pero \u00bfy si no los alimentaban a un monstruo, sino que los entrenaban como saltadores, y los que fallaban mor\u00edan en la arena? El \u00abLaberinto\u00bb podr\u00eda ser el propio palacio. Teseo \u00abmatando al Minotauro\u00bb podr\u00eda ser el recuerdo de un atleta que, por fin, venci\u00f3 al toro.",
    },
  ],
};

// ═══════════════════════════════════════════════════════
// FRENCH \u2014 Le saut du taureau
// ═══════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#bull-leaping",

  title: "Le saut du taureau",
  subtitle: "L\u2019\u00e9preuve mortelle qui a d\u00e9fini la Cr\u00e8te minoenne",

  excerpt:
    "Imaginez un taureau de la taille d\u2019une petite voiture, lanc\u00e9 \u00e0 pleine vitesse. Devant lui, un adolescent \u2014 bras ouverts, immobile. Pas pour esquiver. Pas pour fuir. Pour attraper ces cornes et s\u2019envoler par-dessus l\u2019animal. C\u2019est ce que faisaient les Minoens \u00e0 Cnossos, il y a plus de 3\u202f500 ans.",

  moralOrLesson:
    "Le courage transforme le danger en beaut\u00e9. Les Minoens n\u2019ont pas fui le sauvage \u2014 ils ont dans\u00e9 avec, transformant le p\u00e9ril mortel en art sacr\u00e9.",

  paragraphs: [
    {
      text: "Imaginez un taureau de la taille d\u2019une petite voiture, lanc\u00e9 \u00e0 pleine vitesse. Devant lui, un adolescent \u2014 bras ouverts, immobile. Pas pour esquiver. Pas pour fuir. Pour attraper ces cornes et voltiger par-dessus le dos de l\u2019animal. Hommes et femmes, sans distinction. Voil\u00e0 ce que les Minoens ont peint sur les murs de Cnossos, leur immense palais de l\u2019\u00c2ge du Bronze en Cr\u00e8te, il y a plus de 3\u202f500 ans. La c\u00e9l\u00e8bre Fresque du Saut du Taureau fige toute la sc\u00e8ne\u00a0: la prise, le salto en plein vol, l\u2019atterrissage parfait.",
    },
    {
      text: "Voici comment \u00e7a se passait. Le sauteur courait droit vers le taureau en pleine charge, attrapait ses cornes, et utilisait le mouvement naturel de la t\u00eate \u2014 ce coup de balancier vers le haut \u2014 comme un tremplin pour se propulser en salto par-dessus le dos de la b\u00eate. Derri\u00e8re, des co\u00e9quipiers attendaient, pr\u00eats \u00e0 r\u00e9ceptionner le sauteur ou \u00e0 d\u00e9tourner l\u2019animal si \u00e7a tournait mal. Le tout durait quelques secondes. Aucune marge d\u2019erreur. Soit on r\u00e9ussissait, soit le taureau avait le dernier mot.",
    },
    {
      text: "Ce n\u2019\u00e9taient pas des b\u00eates de ferme. Les taureaux dans l\u2019art minoen ressemblent aux anc\u00eatres sauvages des bovins actuels\u00a0: des b\u00eates d\u2019une demi-tonne, avec des cornes capables de vous tuer en un battement de c\u0153ur. Des athl\u00e8tes modernes ont tent\u00e9 de reproduire le saut. La plupart ont \u00e9chou\u00e9. Les animaux sont trop rapides, trop impr\u00e9visibles, trop puissants. Les Minoens qui y arrivaient devaient s\u2019entra\u00eener depuis l\u2019enfance, forgeant des r\u00e9flexes surhumains. On dit \u00ab\u00a0jamais deux sans trois\u00a0\u00bb. Ici, il n\u2019y avait pas de troisi\u00e8me fois. Parfois, pas m\u00eame de deuxi\u00e8me.",
    },
    {
      text: "Mais voici ce qui fascine\u00a0: les fresques ne montrent aucune peur. Les sauteurs ont l\u2019air gracieux, presque joyeux. Et contrairement \u00e0 la corrida, o\u00f9 le but est de dominer et tuer l\u2019animal, le saut minoen \u00e9tait tout autre chose. Ils ne combattaient pas le taureau \u2014 ils dansaient avec lui. Chaque image montre l\u2019animal comme un partenaire magnifique et puissant, jamais comme un ennemi. Ce n\u2019\u00e9tait pas de la conqu\u00eate. C\u2019\u00e9tait du respect.",
    },
    {
      text: "Personne ne sait exactement pourquoi ils le faisaient. Certains historiens pensent qu\u2019il s\u2019agissait d\u2019un rituel de fertilit\u00e9\u00a0: le taureau incarnait la puissance brute de la nature, et le saut prouvait que l\u2019humain pouvait composer avec cette force sans la d\u00e9truire. D\u2019autres y voient un rite de passage, l\u2019\u00e9preuve ultime pour prouver qu\u2019on \u00e9tait pr\u00eat \u00e0 devenir adulte. D\u2019autres encore le rattachent \u00e0 un ancien dieu-taureau v\u00e9n\u00e9r\u00e9 dans tout le bassin m\u00e9diterran\u00e9en. Quelle qu\u2019en soit la raison, le saut du taureau fut au c\u0153ur de la civilisation minoenne pendant des si\u00e8cles.",
    },
    {
      text: "Quand l\u2019arch\u00e9ologue britannique Arthur Evans a mis au jour la Fresque du Saut du Taureau au d\u00e9but du XXe si\u00e8cle, il a tout de suite compris que ce n\u2019\u00e9tait pas de la fantaisie \u2014 c\u2019\u00e9tait une pratique r\u00e9elle. Il a publi\u00e9 ses d\u00e9couvertes dans un ouvrage intitul\u00e9 Le Palais de Minos, et le monde n\u2019a pas cess\u00e9 d\u2019en d\u00e9battre. \u00c9tait-ce physiquement possible\u00a0? Les sp\u00e9cialistes se sont disput\u00e9s pendant des d\u00e9cennies. Mais des exploits similaires existent encore aujourd\u2019hui \u2014 en Afrique de l\u2019Est et en Espagne, on saute par-dessus du b\u00e9tail vivant. Les Minoens, eux, le faisaient avec la mort comme seul arbitre.",
    },
    {
      text: "Et maintenant, le d\u00e9tail qui va vous hanter. Certains chercheurs pensent que le saut du taureau est la vraie histoire derri\u00e8re le Minotaure \u2014 ce monstre mi-homme, mi-taureau tapi dans le labyrinthe sous Cnossos. Le mythe raconte qu\u2019Ath\u00e8nes envoyait ses jeunes en Cr\u00e8te en sacrifice. Mais et s\u2019ils n\u2019\u00e9taient pas livr\u00e9s \u00e0 un monstre \u2014 mais form\u00e9s comme sauteurs, ceux qui \u00e9chouaient mourant dans l\u2019ar\u00e8ne\u00a0? Le \u00ab\u00a0Labyrinthe\u00a0\u00bb pourrait \u00eatre le palais lui-m\u00eame. Th\u00e9s\u00e9e \u00ab\u00a0tuant le Minotaure\u00a0\u00bb \u2014 peut-\u00eatre le souvenir d\u2019un athl\u00e8te qui, un jour, a enfin vaincu le taureau.",
    },
  ],
};

// ═══════════════════════════════════════════════════════
// GERMAN \u2014 Die Stierspringer von Knossos
// ═══════════════════════════════════════════════════════
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#bull-leaping",

  title: "Die Stierspringer von Knossos",
  subtitle: "Der t\u00f6dliche Tanz, der die minoische Kultur pr\u00e4gte",

  excerpt:
    "Stell dir einen Stier vor, so gro\u00df wie ein Kleinwagen, in vollem Galopp. Direkt davor ein Teenager \u2014 Arme ausgestreckt, wartend. Nicht um auszuweichen. Nicht um zu fliehen. Um die H\u00f6rner zu packen und \u00fcber den R\u00fccken des Tieres zu fliegen. Genau das taten die Minoer auf Knossos vor \u00fcber 3.500 Jahren.",

  moralOrLesson:
    "Mut verwandelt Gefahr in Sch\u00f6nheit. Die Minoer flohen nicht vor dem Wilden \u2014 sie tanzten damit und machten aus t\u00f6dlicher Gefahr heilige Kunst.",

  paragraphs: [
    {
      text: "Stell dir einen Stier vor, so gro\u00df wie ein Kleinwagen, in vollem Galopp. Direkt davor ein Teenager \u2014 Arme ausgestreckt, regungslos. Nicht um auszuweichen. Nicht um zu fliehen. Um die H\u00f6rner zu packen und sich wie ein Turner \u00fcber den R\u00fccken des Tieres zu schwingen. M\u00e4nner und Frauen gleicherma\u00dfen. Genau das haben die Minoer an die W\u00e4nde von Knossos gemalt, ihrem gewaltigen Palast der Bronzezeit auf Kreta, vor \u00fcber 3.500 Jahren. Das ber\u00fchmte Stierspringer-Fresko h\u00e4lt den gesamten Ablauf fest: der Griff, der Salto in der Luft, die perfekte Landung.",
    },
    {
      text: "So lief es ab. Der Springer rannte direkt auf den anst\u00fcrmenden Stier zu, packte seine H\u00f6rner und nutzte den nat\u00fcrlichen Kopfwurf des Tieres als Sprungbrett \u2014 um sich in einem Salto \u00fcber den R\u00fccken zu katapultieren. Hinter dem Stier warteten Teamkollegen, bereit, den Springer aufzufangen oder das Tier abzulenken, falls etwas schiefging. Das Ganze dauerte Sekunden. Null Spielraum f\u00fcr Fehler. Entweder du hast es geschafft, oder der Stier hat dich erwischt.",
    },
    {
      text: "Das waren keine normalen Nutztiere. Die Stiere in der minoischen Kunst sehen aus wie die wilden Vorfahren heutiger Rinder: massive Kolosse von einer halben Tonne, mit H\u00f6rnern, die dich im Bruchteil einer Sekunde t\u00f6ten konnten. Moderne Sportler haben versucht, den Sprung nachzumachen. Die meisten sind gescheitert. Die Tiere sind zu schnell, zu unberechenbar, zu stark. Die Minoer, die das schafften, m\u00fcssen von Kindheit an trainiert haben und Reflexe entwickelt haben, die jenseits menschlicher Grenzen lagen. Man sagt: Aller guten Dinge sind drei. Hier gab es kein drittes Mal. Manchmal nicht mal ein zweites.",
    },
    {
      text: "Aber hier wird es richtig faszinierend: Die Fresken zeigen keine Angst. Die Springer wirken elegant, fast fr\u00f6hlich. Und anders als beim spanischen Stierkampf, wo es darum geht, das Tier zu bezwingen und zu t\u00f6ten, war der minoische Stiersprung etwas v\u00f6llig anderes. Sie k\u00e4mpften nicht gegen den Stier \u2014 sie tanzten mit ihm. Jede Darstellung zeigt das Tier als m\u00e4chtigen, majest\u00e4tischen Partner, niemals als Feind. Es ging nicht um Eroberung. Es ging um Respekt.",
    },
    {
      text: "Niemand wei\u00df genau, warum sie es taten. Manche Historiker glauben, es war ein Fruchtbarkeitsritual: Der Stier verk\u00f6rperte die rohe Kraft der Natur, und der Sprung bewies, dass der Mensch mit dieser Kraft leben konnte, ohne sie zu zerst\u00f6ren. Andere sehen darin eine Reifepr\u00fcfung \u2014 den ultimativen Test, ob man bereit f\u00fcr das Erwachsenenleben war. Wieder andere verbinden es mit einem uralten Stiergott, der im gesamten Mittelmeerraum verehrt wurde. Was auch immer der Grund war: Der Stiersprung stand jahrhundertelang im Zentrum der minoischen Kultur.",
    },
    {
      text: "Als der britische Arch\u00e4ologe Arthur Evans das Stierspringer-Fresko Anfang des 20. Jahrhunderts ausgrub, wusste er sofort: Das war keine Fantasie \u2014 es zeigte eine reale Praxis. Er ver\u00f6ffentlichte seine Erkenntnisse in einem Werk namens Der Palast von Minos, und die Welt diskutierte ohne Ende. War das physikalisch \u00fcberhaupt m\u00f6glich? Wissenschaftler stritten jahrzehntelang. Aber \u00e4hnliche Leistungen gibt es noch heute \u2014 in Teilen Ostafrikas und Spaniens springen Menschen \u00fcber lebendes Vieh. Die Minoer taten es nur mit dem denkbar h\u00f6chsten Einsatz: ihrem Leben.",
    },
    {
      text: "Und jetzt der Teil, der dich nachts nicht schlafen l\u00e4sst. Einige Forscher glauben, dass der Stiersprung die wahre Geschichte hinter dem Minotaurus ist \u2014 dem Mischwesen aus Mensch und Stier im Labyrinth unter Knossos. Der Mythos erz\u00e4hlt, Athen schickte seine Jugend als Opfer nach Kreta. Aber was, wenn sie nicht einem Ungeheuer vorgeworfen wurden, sondern als Springer ausgebildet \u2014 und wer scheiterte, starb in der Arena? Das \u201ELabyrinth\u201C k\u00f6nnte der Palast selbst sein. Theseus, der \u201Eden Minotaurus erschlug\u201C \u2014 vielleicht die Erinnerung an einen Athleten, der den Stier am Ende besiegte.",
    },
  ],
};

// ═══════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════
async function validate(label, item) {
  const json = JSON.stringify(item);
  JSON.parse(json); // round-trip check
  const paraCount = item.paragraphs.length;
  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(
    `  [VALID] ${label}: ${json.length} bytes, ${paraCount} paragraphs, ~${totalChars} chars of story text`
  );
  for (let i = 0; i < paraCount; i++) {
    const len = item.paragraphs[i].text.length;
    if (len > 550) {
      console.warn(`    WARNING: P${i + 1} is ${len} chars (soft limit 500)`);
    }
  }
}

async function pushItem(label, item) {
  const cmd = new PutCommand({ TableName: TABLE, Item: item });
  const res = await docClient.send(cmd);
  console.log(
    `  [OK] ${label} pushed (HTTP ${res.$metadata.httpStatusCode})`
  );
}

(async () => {
  console.log("=== Bull-Leaping Story: es / fr / de ===");
  console.log(`Table: ${TABLE} | Timestamp: ${now}\n`);

  try {
    // Validate all before pushing
    await validate("Spanish (es)", es);
    await validate("French  (fr)", fr);
    await validate("German  (de)", de);
    console.log();

    // Push sequentially, confirm each
    await pushItem("es#bull-leaping", es);
    await pushItem("fr#bull-leaping", fr);
    await pushItem("de#bull-leaping", de);

    console.log("\nAll 3 records pushed successfully.");
  } catch (err) {
    console.error("\nFAILED:", err);
    process.exit(1);
  }
})();
