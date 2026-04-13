import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// Base fields shared across all languages
const base = {
  siteId: { S: "palace-of-versailles" },
  storyId: { S: "man-in-iron-mask" },
  storyCategory: { S: "riddles_past" },
  icon: { S: "🎭" },
  tier: { S: "S" },
  source: { S: "Voltaire, Le Siècle de Louis XIV; Dumas, Le Vicomte de Bragelonne; French state archives" },
  era: { S: "Reign of Louis XIV (1669-1703)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  coordinates: {
    M: {
      lng: { N: "2.1204" },
      lat: { N: "48.8049" },
    },
  },
  characters: {
    L: [
      { S: "The masked prisoner" },
      { S: "King Louis XIV" },
      { S: "Saint-Mars (jailer)" },
      { S: "Voltaire" },
      { S: "Alexandre Dumas" },
    ],
  },
  updatedAt: { N: String(NOW) },
};

// ─────────────────────────────────────────────
// SPANISH (es)
// ─────────────────────────────────────────────
// Cultural proverb subverted: "No hay mal que dure cien años"
// (No evil lasts a hundred years) — subverted because this secret HAS lasted 300+ years.
// Register: skilled modern narrator, like a top-tier Spanish podcast or Carlos del Amor-style storytelling.
const es = {
  ...base,
  lang: { S: "es" },
  langStoryId: { S: "es#man-in-iron-mask" },
  title: { S: "El hombre de la máscara de hierro" },
  subtitle: { S: "El mayor misterio de Francia: el preso que un rey escondió durante 34 años" },
  excerpt: { S: "En 1669, un carruaje llegó a una fortaleza en los Alpes franceses con un preso al que nadie podía ver." },
  moralOrLesson: { S: "Hay secretos que se protegen con tanta fiereza que ocultarlos se vuelve más famoso que la verdad misma." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "En 1669, un carruaje atravesó los Alpes franceses y se detuvo frente a la fortaleza de Pignerol. Dentro viajaba un preso al que nadie tenía permitido ver. No llevaba la máscara de hierro que la leyenda le pondría después, sino una de terciopelo. Su carcelero, un hombre llamado Saint-Mars, tenía órdenes directas de Luis XIV, el rey más poderoso de Europa. Las instrucciones eran simples y escalofriantes: mantén a este hombre vivo, trátalo bien, y asegúrate de que nadie descubra jamás quién es.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Y no era una advertencia vacía. Los guardias tenían prohibido hablar con el preso de cualquier cosa que no fueran sus necesidades básicas. Sin visitas. Sin cartas. Si alguien intentaba averiguar su identidad, la pena era la muerte — no para él, sino para el curioso. Lo que fuera que este hombre sabía o representaba, la corona francesa lo consideraba lo bastante peligroso como para enterrarlo en vida.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Durante treinta y cuatro años, el preso enmascarado fue trasladado de prisión en prisión: de Pignerol a la fortaleza isleña de Sainte-Marguerite, frente a la costa sur de Francia, y finalmente a la Bastilla de París. Saint-Mars lo siguió en cada traslado, ascendido cada vez a director de la prisión que custodiaba a su cautivo más célebre. En 1703, el preso murió. Su celda fue vaciada de inmediato: las paredes raspadas, los muebles quemados, todo rastro de su existencia destruido.",
          },
        },
      },
      {
        M: {
          text: {
            S: "¿Y quién era? Esa pregunta lleva atormentando al mundo más de trescientos años. Voltaire, uno de los pensadores más influyentes del siglo XVIII, aseguró que el preso era el hermano gemelo secreto de Luis XIV, escondido porque su existencia amenazaba el derecho del rey al trono. Un siglo después, el novelista Alejandro Dumas convirtió esa idea en una de las novelas de aventuras más famosas de la historia. Así es como la mayoría conoce esta historia hoy.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Pero hay docenas de teorías más. Algunos historiadores creen que era un diplomático italiano llamado conde Matthioli, que traicionó a Luis XIV en una negociación secreta. Otros piensan que era un general francés caído en desgracia. ¿La teoría más descabellada? Que era el verdadero padre biológico del rey, lo que convertiría al mismísimo Rey Sol en ilegítimo. Cada teoría tiene indicios. Ninguna tiene pruebas.",
          },
        },
      },
      {
        M: {
          text: {
            S: "La hipótesis que más convence hoy a los historiadores es la más sencilla. Un hombre llamado Eustache Dauger — un simple criado — descubrió por accidente secretos de Estado mientras servía a un poderoso ministro francés. Secretos tan sensibles que el rey no podía arriesgarse a que hablara libremente. No lo bastante peligroso para ejecutarlo, pero demasiado peligroso para dejarlo libre. Así que le cubrieron el rostro y lo encerraron de por vida.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Dicen que no hay mal que dure cien años. Pero este secreto lleva más de trescientos, y sigue intacto. Luis XIV fue el hombre más poderoso de su tiempo: un rey que construyó Versalles, libró guerras por toda Europa y se hizo llamar el Rey Sol. Y ni siquiera él pudo hacer desaparecer a este preso. No podía matarlo, no podía liberarlo, no podía dejar que nadie viera su cara. Lo que había detrás de esa máscara era más poderoso que el rey que la puso ahí. Tres siglos después, lo sigue siendo.",
          },
        },
      },
    ],
  },
};

// ─────────────────────────────────────────────
// FRENCH (fr)
// ─────────────────────────────────────────────
// Cultural proverb subverted: "Jamais deux sans trois" (never two without three)
// — subverted because after 300+ years and countless theories, we still don't have the third element: the truth.
// Register: this is THEIR story, their cultural legend. Think a France Inter documentary narrator or
// a Patrick Boucheron-style public intellectual telling a gripping tale.
const fr = {
  ...base,
  lang: { S: "fr" },
  langStoryId: { S: "fr#man-in-iron-mask" },
  title: { S: "L'homme au masque de fer" },
  subtitle: { S: "Le plus grand mystère de France — le prisonnier qu'un roi a caché pendant 34 ans" },
  excerpt: { S: "En 1669, un carrosse arriva dans une forteresse des Alpes françaises, transportant un prisonnier que personne n'avait le droit de voir." },
  moralOrLesson: { S: "Certains secrets sont protégés avec une telle férocité que les cacher devient plus célèbre que la vérité elle-même." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "En 1669, un carrosse s'arrêta devant la forteresse de Pignerol, dans les Alpes. À l'intérieur, un prisonnier que personne n'avait le droit de voir. Son visage n'était pas couvert du masque de fer que la légende lui prêterait plus tard, mais d'un masque de velours. Son geôlier, un certain Saint-Mars, avait reçu ses ordres directement de Louis XIV, le souverain le plus puissant d'Europe. Des ordres d'une simplicité glaçante : gardez cet homme en vie, traitez-le correctement, et faites en sorte que personne ne sache jamais qui il est.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Et ce n'étaient pas des paroles en l'air. Les gardes avaient interdiction formelle de parler au prisonnier en dehors de ses besoins élémentaires. Pas de visiteurs. Pas de courrier. Quiconque cherchait à découvrir l'identité du captif risquait la mort — non pas lui, mais celui qui posait la question. Ce que cet homme savait ou représentait, la couronne le jugeait assez dangereux pour l'enterrer vivant.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Pendant trente-quatre ans, le prisonnier masqué fut transféré de prison en prison : de Pignerol à la forteresse insulaire de Sainte-Marguerite, au large de la côte sud, puis finalement à la Bastille, en plein Paris. Saint-Mars le suivit à chaque étape, promu à chaque fois gouverneur de la prison qui abritait son captif le plus célèbre. En 1703, le prisonnier mourut. Sa cellule fut immédiatement vidée : les murs grattés, le mobilier brûlé, toute trace de son passage effacée.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Alors, qui était-il ? Cette question hante les esprits depuis plus de trois cents ans. Voltaire, dans Le Siècle de Louis XIV, affirma que le prisonnier était le frère jumeau secret du roi, caché parce que son existence menaçait la légitimité du trône. Un siècle plus tard, Alexandre Dumas transforma cette hypothèse en l'un des plus grands romans d'aventures jamais écrits. C'est ainsi que la plupart des gens connaissent cette histoire aujourd'hui.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Mais les théories ne manquent pas. Certains historiens pensent qu'il s'agissait du comte Matthioli, un diplomate italien qui avait trahi Louis XIV lors d'une négociation secrète. D'autres y voient un général français tombé en disgrâce. La théorie la plus folle ? Que le prisonnier était le véritable père biologique du roi — ce qui ferait du tout-puissant Roi-Soleil un enfant illégitime. Chaque théorie a ses indices. Aucune n'a de preuve.",
          },
        },
      },
      {
        M: {
          text: {
            S: "L'hypothèse qui convainc le plus les historiens aujourd'hui est aussi la plus simple. Un homme nommé Eustache Dauger — un modeste valet — aurait surpris des secrets d'État en servant un puissant ministre. Des secrets si sensibles que le roi ne pouvait pas prendre le risque de le laisser parler. Pas assez dangereux pour être exécuté, mais bien trop dangereux pour être libéré. Alors on lui a couvert le visage et on l'a enfermé pour le restant de ses jours.",
          },
        },
      },
      {
        M: {
          text: {
            S: "On dit jamais deux sans trois. Trois siècles de théories, trois siècles de recherches — et toujours pas de vérité. Louis XIV était l'homme le plus puissant de son époque. Un roi qui a bâti Versailles, mené des guerres à travers toute l'Europe et s'est fait appeler le Roi-Soleil. Et même lui n'a pas pu faire disparaître ce prisonnier. Il ne pouvait pas le tuer, pas le libérer, pas laisser quiconque voir son visage. Ce qu'il y avait derrière ce masque était plus puissant que le roi qui l'y avait mis. Trois cents ans plus tard, ça l'est toujours.",
          },
        },
      },
    ],
  },
};

// ─────────────────────────────────────────────
// GERMAN (de)
// ─────────────────────────────────────────────
// Cultural proverb subverted: "Aller guten Dinge sind drei"
// (All good things come in threes) — subverted: three centuries, three prisons, but never the third thing you need: the truth.
// Register: think Mirko Drotschmann (MrWissen2Go) meets a good Spiegel Geschichte feature —
// authoritative but gripping, no stuffiness.
const de = {
  ...base,
  lang: { S: "de" },
  langStoryId: { S: "de#man-in-iron-mask" },
  title: { S: "Der Mann in der eisernen Maske" },
  subtitle: { S: "Frankreichs größtes Rätsel — der Gefangene, den ein König 34 Jahre lang versteckte" },
  excerpt: { S: "Im Jahr 1669 erreichte eine Kutsche eine Festung in den französischen Alpen — mit einem Gefangenen, den niemand sehen durfte." },
  moralOrLesson: { S: "Manche Geheimnisse werden so erbittert gehütet, dass ihre Verheimlichung berühmter wird als die Wahrheit selbst." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Im Jahr 1669 hielt eine Kutsche vor der Festung Pignerol in den französischen Alpen. Darin saß ein Gefangener, den niemand sehen durfte. Sein Gesicht war bedeckt — nicht mit der eisernen Maske, die ihm die Legende später andichten sollte, sondern mit einer Maske aus Samt. Sein Kerkermeister, ein Mann namens Saint-Mars, hatte seine Befehle direkt von Ludwig XIV., dem mächtigsten Herrscher Europas. Die Anweisungen waren einfach und erschreckend zugleich: Halte diesen Mann am Leben, behandle ihn anständig, und sorge dafür, dass niemals jemand erfährt, wer er ist.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Und das war keine leere Drohung. Den Wachen war es verboten, mit dem Gefangenen über irgendetwas zu sprechen, das über seine Grundbedürfnisse hinausging. Keine Besucher. Keine Briefe. Wer versuchte herauszufinden, wer der Gefangene war, dem drohte der Tod — nicht ihm, sondern dem Neugierigen. Was auch immer dieser Mann wusste oder darstellte, die französische Krone hielt es für gefährlich genug, ihn bei lebendigem Leib zu begraben.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Vierunddreißig Jahre lang wurde der maskierte Gefangene von Gefängnis zu Gefängnis verlegt: von Pignerol zur Inselfestung Sainte-Marguerite vor der Südküste Frankreichs und schließlich in die Bastille mitten in Paris. Saint-Mars folgte ihm bei jeder Verlegung und wurde jedes Mal zum Kommandanten der neuen Anstalt befördert. 1703 starb der Gefangene. Seine Zelle wurde sofort ausgeräumt — die Wände abgekratzt, die Möbel verbrannt, jede Spur seiner Existenz ausgelöscht.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Wer war er also? Diese Frage lässt die Menschen seit über dreihundert Jahren nicht los. Voltaire, einer der einflussreichsten Denker des 18. Jahrhunderts, behauptete, der Gefangene sei der geheime Zwillingsbruder Ludwigs XIV. gewesen — versteckt, weil seine bloße Existenz den Thronanspruch des Königs gefährdet hätte. Ein Jahrhundert später machte der Romancier Alexandre Dumas aus dieser Idee einen der größten Abenteuerromane aller Zeiten. So kennen die meisten Menschen diese Geschichte heute.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Aber es gibt Dutzende weiterer Theorien. Manche Historiker glauben, er war ein italienischer Diplomat namens Graf Matthioli, der Ludwig XIV. bei einer geheimen Verhandlung hintergangen hatte. Andere halten ihn für einen in Ungnade gefallenen französischen General. Die wildeste Behauptung? Dass er der leibliche Vater des Königs war — was den mächtigen Sonnenkönig selbst zum unehelichen Kind gemacht hätte. Jede Theorie hat Indizien. Keine hat Beweise.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Die Theorie, die heute unter Historikern am meisten überzeugt, ist zugleich die einfachste. Ein Mann namens Eustache Dauger — ein einfacher Diener — soll zufällig auf Staatsgeheimnisse gestoßen sein, während er einem mächtigen französischen Minister diente. Geheimnisse, die so brisant waren, dass der König es nicht riskieren konnte, ihn jemals frei reden zu lassen. Nicht gefährlich genug, um ihn hinzurichten, aber viel zu gefährlich, um ihn freizulassen. Also bedeckten sie sein Gesicht und sperrten ihn für den Rest seines Lebens weg.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Aller guten Dinge sind drei, sagt man. Drei Gefängnisse, drei Jahrhunderte voller Theorien — aber die eine Sache, die fehlt, ist die Wahrheit. Ludwig XIV. war der mächtigste Mann seiner Zeit. Ein König, der Versailles erbaute, Kriege quer durch Europa führte und sich den Sonnenkönig nannte. Und selbst er konnte diesen Gefangenen nicht einfach verschwinden lassen. Er konnte ihn nicht töten, nicht freilassen und nicht zulassen, dass irgendjemand sein Gesicht sah. Was hinter dieser Maske steckte, war mächtiger als der König, der sie dort angebracht hatte. Dreihundert Jahre später ist es das immer noch.",
          },
        },
      },
    ],
  },
};

// ─────────────────────────────────────────────
// PUSH TO DYNAMODB
// ─────────────────────────────────────────────
const stories = [
  { label: "Spanish (es)", data: es },
  { label: "French (fr)", data: fr },
  { label: "German (de)", data: de },
];

for (const { label, data } of stories) {
  try {
    console.log(`Pushing ${label}...`);
    await client.send(
      new PutItemCommand({
        TableName: TABLE,
        Item: data,
      })
    );
    console.log(`  ✓ ${label} pushed successfully.`);
  } catch (err) {
    console.error(`  ✗ ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log("\nAll three languages pushed successfully.");
