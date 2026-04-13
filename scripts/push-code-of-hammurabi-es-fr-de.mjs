// Push "The Law Written in Stone" (code-of-hammurabi) in es, fr, de
// Each version is a native-born recreation, not a translation.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared (unchanged) fields from the English record ───────────────────────
const shared = {
  siteId: "babylon",
  storyId: "code-of-hammurabi",
  icon: "\u2696\uFE0F",
  tier: "A",
  readingTimeMinutes: 9,
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  coordinates: { lat: 32.5363, lng: 44.4209 },
  era: "c. 1755-1750 BCE (code\u2019s promulgation); discovered at Susa, Iran, in 1901-1902",
  source:
    "The Code of Hammurabi (Louvre, Sb 8); Scheil, Jean-Vincent. M\u00e9moires de la D\u00e9l\u00e9gation en Perse, vol. 4, 1902 (first translation); Roth, Martha T. Law Collections from Mesopotamia and Asia Minor, Scholars Press, 1995; Van De Mieroop, Marc. King Hammurabi of Babylon: A Biography, Blackwell, 2005; Richardson, Seth. \u2018On Seeing and Believing: Liver Divination and the Era of Warring States,\u2019 in Divination and Interpretation of Signs in the Ancient World, Oriental Institute, 2010; Driver, G.R. and Miles, John C. The Babylonian Laws, 2 vols., Oxford, 1952-1955; Charpin, Dominique. Hammurabi of Babylon, I.B. Tauris, 2012; Laws of Ur-Nammu (c. 2100 BCE); Laws of Eshnunna (c. 1930 BCE)",
  characters: [
    "Hammurabi -- sixth king of the First Babylonian Dynasty (r. 1792-1750 BCE)",
    "Shamash -- the sun god of justice, depicted handing Hammurabi the rod and ring of kingship",
    "Shutruk-Nahhunte -- Elamite king who looted the stele as war booty around 1158 BCE",
    "Jacques de Morgan -- French archaeologist who discovered the stele at Susa in 1901-1902",
    "Jean-Vincent Scheil -- Dominican friar who translated the code and revealed it to the modern world",
  ],
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH  (es)
// Proverb: "A la tercera va la vencida" — subverted: in Babylon there was no
// third chance; the first time was the last.
// ═══════════════════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#code-of-hammurabi",
  title: "La ley que nadie pudo borrar",
  subtitle:
    "C\u00f3mo un rey babilonio grab\u00f3 282 leyes en piedra negra y cambi\u00f3 para siempre el significado de la justicia",
  excerpt:
    "Hace casi cuatro mil a\u00f1os, un rey babilonio grab\u00f3 282 leyes en una columna de piedra negra y la puso en un templo para que todos la vieran. Entre esas leyes hab\u00eda un principio que resonar\u00eda en cada sistema legal del planeta: ojo por ojo, diente por diente.",
  moralOrLesson:
    "Antes de Hammurabi, la justicia era lo que el fuerte le impon\u00eda al d\u00e9bil. Despu\u00e9s de Hammurabi, la justicia estaba \u2014 al menos en principio \u2014 escrita, visible y aplicable a todos. El c\u00f3digo no era justo seg\u00fan los est\u00e1ndares modernos. Distingu\u00eda entre clases, castigaba m\u00e1s duramente al pobre que al rico y prescrib\u00eda crueldades que hoy no tolerar\u00edamos. Pero estableci\u00f3 una idea revolucionaria: la ley existe antes del crimen, el castigo debe ser proporcional, y hasta un rey est\u00e1 sometido a algo m\u00e1s grande que su propia voluntad. Esa idea, grabada en piedra negra en un idioma que ser\u00eda ilegible durante tres mil a\u00f1os, result\u00f3 ser indestructible.",
  paragraphs: [
    {
      text: "Hacia 1755 antes de Cristo, un rey de Babilonia hizo algo que ning\u00fan gobernante hab\u00eda intentado. Hammurabi tom\u00f3 282 leyes \u2014 normas sobre asesinatos, robos, divorcios, hasta sobre construcciones mal hechas \u2014 y las hizo tallar en una columna de piedra negra de m\u00e1s de dos metros, tan dura que apenas se pod\u00eda trabajar. Despu\u00e9s la coloc\u00f3 en un templo, a la vista de todos. El mensaje era revolucionario: la ley no es un secreto de los poderosos. La ley es de todos.",
    },
    {
      text: "En la parte superior de la columna hay una escena que lo dice todo. Hammurabi aparece de pie frente a Shamash, el dios del sol babilonio \u2014 aquel que lo ve\u00eda todo y no dejaba pasar ninguna mentira. Shamash le entrega una vara y un anillo, s\u00edmbolos antiguos de autoridad divina. El mensaje era claro: estas no son las ocurrencias de un rey cualquiera. Llevan el peso del cielo. Debajo de esa imagen, cuarenta y nueve columnas de escritura cuneiforme regulan casi cada rinc\u00f3n de la vida cotidiana.",
    },
    {
      text: "Hammurabi no era un fil\u00f3sofo. Era un conquistador. Cuando lleg\u00f3 al trono hacia 1792 antes de Cristo, Babilonia era un reino peque\u00f1o rodeado de enemigos. En treinta a\u00f1os los aplast\u00f3 a todos, incluyendo Mari, una rica ciudad comercial del \u00c9ufrates cuya destrucci\u00f3n sacudi\u00f3 al mundo antiguo. Sus cartas, que todav\u00eda se conservan, muestran a un rey que personalmente resolv\u00eda disputas por el agua de riego y persegu\u00eda a funcionarios corruptos. El c\u00f3digo fue la obra maestra de un obseso del control.",
    },
    {
      text: "La ley m\u00e1s famosa es la n\u00famero 196: destruyes el ojo de un hombre libre, te destruyen el tuyo. Ojo por ojo \u2014 un principio que resuena en la Biblia, el Cor\u00e1n y cada tribunal del planeta. A la tercera va la vencida, dice el refr\u00e1n. Pero en Babilonia no hab\u00eda tercera oportunidad: la primera vez era la \u00faltima. Y eso s\u00ed, la justicia depend\u00eda de tu clase. Ciega a un rico, pierdes tu ojo. Ciega a un pobre, pagas multa. Ciega a un esclavo, le pagas al due\u00f1o. La ley era para todos. Igual para todos, eso ya era otra historia.",
    },
    {
      text: "Algunas leyes eran asombrosamente modernas. Si un constructor hac\u00eda mal su trabajo y la casa se derrumbaba matando al due\u00f1o, el constructor mor\u00eda. Si tu marido ca\u00eda prisionero en la guerra, pod\u00edas volver a casarte \u2014 y si \u00e9l regresaba, t\u00fa eleg\u00edas con qui\u00e9n quedarte. Una esposa que demostrara que su marido la humillaba constantemente pod\u00eda tomar su dinero e irse. Hace cuatro mil a\u00f1os, las mujeres en Babilonia ten\u00edan protecci\u00f3n legal contra el maltrato emocional.",
    },
    {
      text: "La columna sobrevivi\u00f3 seis siglos en su templo. Entonces, hacia 1158 antes de Cristo, un rey llamado Shutruk-Nahhunte invadi\u00f3 desde lo que hoy es el suroeste de Ir\u00e1n, saque\u00f3 la ciudad de Sippar y se llev\u00f3 la piedra como trofeo de guerra. Empez\u00f3 a borrar el nombre de Hammurabi para grabar el suyo \u2014 pero nunca termin\u00f3. La columna qued\u00f3 enterrada m\u00e1s de tres mil a\u00f1os, olvidada por cada civilizaci\u00f3n que naci\u00f3 y muri\u00f3 encima de ella.",
    },
    {
      text: "En diciembre de 1901, un arque\u00f3logo franc\u00e9s llamado Jacques de Morgan la desenterr\u00f3 en lo que hoy es Shush, en Ir\u00e1n. El hallazgo fue una bomba. Cuando un erudito llamado Jean-Vincent Scheil tradujo el texto al a\u00f1o siguiente, los parecidos con las leyes b\u00edblicas \u2014 sobre todo con el libro del \u00c9xodo \u2014 eran imposibles de ignorar. Los estudiosos que cre\u00edan que las leyes de Mois\u00e9s eran completamente originales tuvieron que aceptar que un rey babilonio hab\u00eda escrito normas muy parecidas mil a\u00f1os antes.",
    },
    {
      text: "Hoy la columna sigue en pie en el Louvre de Par\u00eds, todav\u00eda apuntando hacia el cielo. Sus leyes no son justas seg\u00fan nuestros est\u00e1ndares \u2014 favorec\u00edan a los ricos y permit\u00edan crueldades que hoy no tolerar\u00edamos. Pero Hammurabi le dio al mundo una idea que sobrevivi\u00f3 a todos los imperios: la ley existe antes del crimen, el castigo debe ser proporcional y hasta un rey responde ante algo m\u00e1s grande que \u00e9l mismo. Grab\u00f3 esa idea en la piedra m\u00e1s dura que encontr\u00f3. Cuatro mil a\u00f1os despu\u00e9s, nadie la ha podido borrar.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH  (fr)
// Proverb: "Jamais deux sans trois" — subverted: in Babylon there wasn't even
// a second chance, let alone a third.
// ═══════════════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#code-of-hammurabi",
  title: "Grav\u00e9 dans la pierre",
  subtitle:
    "Comment un roi babylonien a fait graver 282 lois dans la pierre noire et chang\u00e9 \u00e0 jamais le sens de la justice",
  excerpt:
    "Il y a pr\u00e8s de quatre mille ans, un roi de Babylone fit graver 282 lois dans un pilier de pierre noire et le pla\u00e7a dans un temple pour que tous puissent le voir. Parmi ces lois figurait un principe qui allait traverser chaque syst\u00e8me juridique de la plan\u00e8te\u00a0: \u0153il pour \u0153il, dent pour dent.",
  moralOrLesson:
    "Avant Hammurabi, la justice \u00e9tait ce que le fort imposait au faible. Apr\u00e8s Hammurabi, la justice \u00e9tait \u2014 au moins en principe \u2014 \u00e9crite, visible et applicable \u00e0 tous. Le code n\u2019\u00e9tait pas juste selon nos crit\u00e8res modernes. Il distinguait les classes, punissait le pauvre plus s\u00e9v\u00e8rement que le riche et prescrivait des cruaut\u00e9s que nous ne tol\u00e9rerions pas. Mais il a \u00e9tabli une id\u00e9e r\u00e9volutionnaire\u00a0: la loi existe avant le crime, la peine doit \u00eatre proportionnelle, et m\u00eame le roi est soumis \u00e0 quelque chose de plus grand que sa propre volont\u00e9. Cette id\u00e9e, grav\u00e9e dans la pierre noire dans une langue qui resterait illisible pendant trois mille ans, s\u2019est av\u00e9r\u00e9e indestructible.",
  paragraphs: [
    {
      text: "Vers 1755 avant notre \u00e8re, un roi de Babylone fit quelque chose qu\u2019aucun souverain n\u2019avait os\u00e9 avant lui. Hammurabi prit 282 lois \u2014 des r\u00e8gles sur le meurtre, le vol, le divorce, m\u00eame sur les malfa\u00e7ons \u2014 et les fit graver dans un pilier de pierre noire de plus de deux m\u00e8tres, un basalte si dur qu\u2019il \u00e9tait presque impossible \u00e0 travailler. Puis il le pla\u00e7a dans un temple, \u00e0 la vue de tous. Le message \u00e9tait radical\u00a0: la loi n\u2019est pas un secret. Elle appartient \u00e0 tout le monde.",
    },
    {
      text: "Au sommet de la st\u00e8le, une sc\u00e8ne sculpt\u00e9e dit tout ce qu\u2019il faut savoir. Hammurabi se tient debout face \u00e0 Shamash, le dieu solaire babylonien \u2014 celui qui voyait tout et ne laissait passer aucun mensonge. Shamash lui remet un b\u00e2ton et un anneau, symboles anciens de l\u2019autorit\u00e9 divine. Le message est limpide\u00a0: ces lois ne sont pas les caprices d\u2019un monarque. Elles portent le poids du ciel. En dessous, quarante-neuf colonnes de signes cun\u00e9iformes r\u00e9glementent presque chaque aspect de la vie quotidienne.",
    },
    {
      text: "Hammurabi n\u2019\u00e9tait pas un philosophe. C\u2019\u00e9tait un conqu\u00e9rant. Quand il monta sur le tr\u00f4ne vers 1792 avant notre \u00e8re, Babylone \u00e9tait un petit royaume cern\u00e9 de rivaux. En trente ans, il les \u00e9crasa tous \u2014 y compris Mari, riche cit\u00e9 marchande de l\u2019Euphrate dont la destruction stup\u00e9fia le monde antique. Ses lettres, qui nous sont parvenues, montrent un roi qui r\u00e9glait personnellement les conflits d\u2019irrigation et traquait les fonctionnaires corrompus. Le code fut le chef-d\u2019\u0153uvre d\u2019un maniaque du contr\u00f4le.",
    },
    {
      text: "La loi la plus c\u00e9l\u00e8bre porte le num\u00e9ro 196\u00a0: cr\u00e8ve l\u2019\u0153il d\u2019un homme libre, on te cr\u00e8ve le tien. \u0152il pour \u0153il \u2014 un principe qui r\u00e9sonne dans la Bible, le Coran et chaque tribunal du monde. Jamais deux sans trois, dit-on. Pas \u00e0 Babylone\u00a0: une seule fois suffisait. Mais la justice d\u00e9pendait du rang. Aveugle un riche, tu perds ton \u0153il. Aveugle un pauvre, tu paies une amende. Aveugle un esclave, tu indemnises son ma\u00eetre. La loi \u00e9tait l\u00e0 pour tous. L\u2019\u00e9galit\u00e9, elle, pas encore.",
    },
    {
      text: "Certaines lois \u00e9taient \u00e9tonnamment modernes. Si un ma\u00e7on b\u00e2clait son travail et que la maison s\u2019\u00e9croulait sur son propri\u00e9taire, le ma\u00e7on \u00e9tait ex\u00e9cut\u00e9. Si ton mari \u00e9tait captur\u00e9 \u00e0 la guerre, tu pouvais te remarier \u2014 et s\u2019il revenait, c\u2019est toi qui choisissais lequel garder. Une \u00e9pouse qui prouvait que son mari l\u2019humiliait constamment pouvait r\u00e9cup\u00e9rer sa dot et partir. Il y a quatre mille ans, les femmes de Babylone b\u00e9n\u00e9ficiaient d\u2019une protection l\u00e9gale contre la maltraitance.",
    },
    {
      text: "Le pilier surv\u00e9cut six si\u00e8cles dans son temple. Puis, vers 1158 avant notre \u00e8re, un roi nomm\u00e9 Shutruk-Nahhunte d\u00e9barqua depuis ce qui est aujourd\u2019hui le sud-ouest de l\u2019Iran, pilla la ville de Sippar et emporta la st\u00e8le comme butin de guerre. Il commen\u00e7a \u00e0 effacer le nom d\u2019Hammurabi pour y graver le sien \u2014 mais il ne termina jamais. La pierre resta enfouie plus de trois mille ans, oubli\u00e9e par chaque civilisation qui naissait et mourait au-dessus d\u2019elle.",
    },
    {
      text: "En d\u00e9cembre 1901, un arch\u00e9ologue fran\u00e7ais du nom de Jacques de Morgan la d\u00e9terra \u00e0 Suse, dans ce qui est aujourd\u2019hui l\u2019Iran. La d\u00e9couverte fit l\u2019effet d\u2019une bombe. Quand un \u00e9rudit nomm\u00e9 Jean-Vincent Scheil traduisit le texte l\u2019ann\u00e9e suivante, les parall\u00e8les avec la loi biblique \u2014 en particulier le livre de l\u2019Exode \u2014 sautaient aux yeux. Les savants qui tenaient les lois de Mo\u00efse pour enti\u00e8rement originales durent admettre qu\u2019un roi babylonien avait \u00e9dict\u00e9 des r\u00e8gles \u00e9trangement similaires plus d\u2019un mill\u00e9naire avant.",
    },
    {
      text: "Aujourd\u2019hui, la st\u00e8le se dresse au Louvre, \u00e0 Paris, toujours tourn\u00e9e vers le ciel. Ses lois ne sont pas justes selon nos crit\u00e8res \u2014 elles favorisaient les riches et autorisaient des cruaut\u00e9s que nous n\u2019accepterions plus. Mais Hammurabi a donn\u00e9 au monde une id\u00e9e qui a surv\u00e9cu \u00e0 tous les empires\u00a0: la loi existe avant le crime, la peine doit \u00eatre proportionnelle, et m\u00eame un roi r\u00e9pond devant quelque chose de plus grand que lui. Il a grav\u00e9 cette id\u00e9e dans la pierre la plus dure qu\u2019il ait trouv\u00e9e. Quatre mille ans plus tard, personne n\u2019a fait mieux.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN  (de)
// Proverb: "Papier ist geduldig" — subverted: Hammurabi didn't trust paper;
// he chose the hardest stone. Four thousand years later, the stone was right.
// ═══════════════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#code-of-hammurabi",
  title: "In Stein gemei\u00dfelt",
  subtitle:
    "Wie ein babylonischer K\u00f6nig 282 Gesetze in schwarzen Stein mei\u00dfeln lie\u00df und die Bedeutung von Gerechtigkeit f\u00fcr immer ver\u00e4nderte",
  excerpt:
    "Vor fast viertausend Jahren lie\u00df ein K\u00f6nig in Babylon 282 Gesetze in eine S\u00e4ule aus schwarzem Stein mei\u00dfeln und stellte sie in einen Tempel, damit jeder sie sehen konnte. Unter diesen Gesetzen war ein Prinzip, das durch jedes Rechtssystem der Erde hallen sollte: Auge um Auge, Zahn um Zahn.",
  moralOrLesson:
    "Vor Hammurabi war Gerechtigkeit das, was der Starke dem Schwachen aufzwang. Nach Hammurabi war Gerechtigkeit \u2014 zumindest dem Grundsatz nach \u2014 niedergeschrieben, sichtbar und auf alle anwendbar. Der Kodex war nach modernen Ma\u00dfst\u00e4ben nicht gerecht. Er unterschied zwischen den St\u00e4nden, bestrafte den Armen h\u00e4rter als den Reichen und schrieb Grausamkeiten vor, die wir nicht dulden w\u00fcrden. Aber er begr\u00fcndete eine revolution\u00e4re Idee: Das Gesetz existiert vor dem Verbrechen, die Strafe muss verh\u00e4ltnism\u00e4\u00dfig sein, und selbst der K\u00f6nig ist etwas Gr\u00f6\u00dferem unterworfen als seinem eigenen Willen. Diese Idee, in schwarzen Stein gemei\u00dfelt in einer Sprache, die dreitausend Jahre lang unlesbar sein w\u00fcrde, erwies sich als unzerst\u00f6rbar.",
  paragraphs: [
    {
      text: "Um 1755 vor Christus tat ein K\u00f6nig in Babylon etwas, das kein Herrscher vor ihm gewagt hatte. Hammurabi nahm 282 Gesetze \u2014 Regeln \u00fcber Mord, Diebstahl, Scheidung, sogar \u00fcber Pfusch am Bau \u2014 und lie\u00df sie in eine \u00fcber zwei Meter hohe S\u00e4ule aus schwarzem Stein mei\u00dfeln, so hart, dass man ihn kaum bearbeiten konnte. Dann stellte er sie in einen Tempel, f\u00fcr jeden sichtbar. Die Botschaft war revolution\u00e4r: Das Gesetz ist kein Geheimnis der M\u00e4chtigen. Es geh\u00f6rt allen.",
    },
    {
      text: "Oben auf der Stele ist eine Szene eingemei\u00dfelt, die alles sagt. Hammurabi steht vor Shamash, dem babylonischen Sonnengott \u2014 demjenigen, der alles sah und keine L\u00fcge durchgehen lie\u00df. Shamash \u00fcberreicht ihm Stab und Ring, uralte Symbole g\u00f6ttlicher Autorit\u00e4t. Die Botschaft ist unmissverst\u00e4ndlich: Das hier sind nicht die Launen irgendeines K\u00f6nigs. Sie tragen das Gewicht des Himmels. Darunter legen neunundvierzig Spalten Keilschrift Regeln f\u00fcr fast jeden Bereich des t\u00e4glichen Lebens fest.",
    },
    {
      text: "Hammurabi war kein Philosoph. Er war ein Eroberer. Als er um 1792 vor Christus den Thron bestieg, war Babylon ein kleines K\u00f6nigreich, umgeben von Feinden. In drei\u00dfig Jahren zerschlug er sie alle \u2014 darunter Mari, eine reiche Handelsstadt am Euphrat, deren Zerst\u00f6rung die antike Welt ersch\u00fctterte. Seine erhaltenen Briefe zeigen einen K\u00f6nig, der pers\u00f6nlich Bew\u00e4sserungsstreitigkeiten schlichtete und korrupte Beamte aufsp\u00fcrte. Der Kodex war das Meisterwerk eines Kontrollfreaks.",
    },
    {
      text: "Das ber\u00fchmteste Gesetz ist Nummer 196: Zerst\u00f6rst du das Auge eines freien Mannes, wird deines zerst\u00f6rt. Auge um Auge \u2014 ein Prinzip, das durch Bibel, Koran und jedes Gericht der Welt hallt. Aber was man gern vergisst: Gerechtigkeit in Babylon hing vom Stand ab. Blendest du einen Reichen, verlierst du dein Auge. Blendest du einen einfachen Mann, zahlst du Geld. Blendest du einen Sklaven, zahlst du dem Besitzer. Das Gesetz galt f\u00fcr alle \u2014 gleich behandelt hat es trotzdem nicht alle.",
    },
    {
      text: "Manche Gesetze waren verbl\u00fcffend modern. Wenn ein Baumeister schlampig arbeitete und das Haus einst\u00fcrzte und den Besitzer t\u00f6tete, wurde der Baumeister hingerichtet. Wenn dein Mann in Kriegsgefangenschaft geriet, durftest du wieder heiraten \u2014 und wenn er zur\u00fcckkam, konntest du w\u00e4hlen, bei wem du bleiben wolltest. Eine Frau, die nachwies, dass ihr Mann sie st\u00e4ndig erniedrigte, durfte ihr Geld nehmen und gehen. Vor viertausend Jahren hatten Frauen in Babylon rechtlichen Schutz vor seelischer Misshandlung.",
    },
    {
      text: "Die Stele \u00fcberlebte sechs Jahrhunderte in ihrem Tempel. Dann, um 1158 vor Christus, fiel ein K\u00f6nig namens Shutruk-Nahhunte aus dem heutigen S\u00fcdwestiran ein, pl\u00fcnderte die Stadt Sippar und schleppte den Stein als Kriegsbeute ab. Er begann, Hammurabis Namen abzumei\u00dfeln, um seinen eigenen einzugravieren \u2014 doch er wurde nie fertig. Die Stele lag \u00fcber dreitausend Jahre in der Erde, vergessen von jeder Zivilisation, die \u00fcber ihr aufstieg und unterging.",
    },
    {
      text: "Im Dezember 1901 grub ein franz\u00f6sischer Arch\u00e4ologe namens Jacques de Morgan sie in Susa aus, im heutigen Iran. Die Entdeckung schlug ein wie eine Bombe. Als ein Gelehrter namens Jean-Vincent Scheil den Text im darauffolgenden Jahr \u00fcbersetzte, waren die Parallelen zum biblischen Recht \u2014 besonders zum Buch Exodus \u2014 nicht zu \u00fcbersehen. Wissenschaftler, die geglaubt hatten, die Gesetze Moses seien v\u00f6llig eigenst\u00e4ndig, mussten sich mit einem babylonischen K\u00f6nig auseinandersetzen, der verbl\u00fcffend \u00e4hnliche Regeln \u00fcber tausend Jahre fr\u00fcher niedergeschrieben hatte.",
    },
    {
      text: "Heute steht die Stele im Louvre in Paris, noch immer gen Himmel gerichtet. Ihre Gesetze sind nach heutigen Ma\u00dfst\u00e4ben nicht gerecht \u2014 sie bevorzugten die Reichen und erlaubten Grausamkeiten, die wir nicht mehr dulden w\u00fcrden. Aber Hammurabi gab der Welt eine Idee, die jedes Imperium \u00fcberlebt hat: Das Gesetz existiert vor dem Verbrechen, die Strafe muss verh\u00e4ltnism\u00e4\u00dfig sein, und selbst ein K\u00f6nig steht unter etwas Gr\u00f6\u00dferem als seinem eigenen Willen. Man sagt, Papier ist geduldig. Hammurabi traute dem Papier nicht \u2014 er nahm den h\u00e4rtesten Stein, den er finden konnte. Viertausend Jahre sp\u00e4ter hat der Stein recht behalten.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════════════
const items = [
  { label: "SPANISH (es)", data: es },
  { label: "FRENCH  (fr)", data: fr },
  { label: "GERMAN  (de)", data: de },
];

for (const { label, data } of items) {
  console.log(`\n── Pushing ${label} ──`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
        ConditionExpression:
          "attribute_not_exists(siteId) OR attribute_not_exists(langStoryId)",
      })
    );
    console.log(`   ✓ ${label} pushed successfully  (langStoryId: ${data.langStoryId})`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`   ⚠ ${label} already exists — overwriting...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: data })
      );
      console.log(`   ✓ ${label} overwritten successfully`);
    } else {
      console.error(`   ✗ ${label} FAILED:`, err.message);
      process.exit(1);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERIFY
// ═══════════════════════════════════════════════════════════════════════════════
import { GetCommand } from "@aws-sdk/lib-dynamodb";

console.log("\n── Verifying ──");
for (const { label, data } of items) {
  const res = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: data.siteId, langStoryId: data.langStoryId },
    })
  );
  if (res.Item && res.Item.title === data.title) {
    console.log(`   ✓ ${label} verified  (title: "${res.Item.title}", paragraphs: ${res.Item.paragraphs.length})`);
  } else {
    console.error(`   ✗ ${label} verification FAILED`);
    process.exit(1);
  }
}

console.log("\n── All done ──\n");
