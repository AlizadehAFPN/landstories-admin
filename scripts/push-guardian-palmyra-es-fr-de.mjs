// Push Spanish, French, and German recreations of "The Guardian of Palmyra"
// to the Story DynamoDB table.
//
// Cultural proverbs used:
//   es → "Dios aprieta pero no ahoga" (God squeezes but doesn't strangle)
//   fr → "Patience et longueur de temps font plus que force ni que rage" (La Fontaine)
//   de → "Gottes Mühlen mahlen langsam" (God's mills grind slowly)

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across all languages) ──────────────────────────
const shared = {
  siteId: "palmyra",
  storyId: "guardian-of-palmyra",
  icon: "\u{1F4DC}",
  storyCategory: "prophets_pilgrims",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.5505, lng: 38.2684 },
  source:
    "UNESCO statements, August 18-20, 2015; Abdulkarim, Maamoun, interviews on Syrian heritage evacuation efforts; The Guardian, New York Times, BBC reporting, August 2015; Gawlikowski, Micha\u0142, tributes and interviews; ASOR Cultural Heritage Initiatives documentation of Palmyra destruction; UNOSAT satellite imagery analysis, 2015-2017",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb: "Dios aprieta pero no ahoga"
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#guardian-of-palmyra",

  title: "El guardi\u00e1n de Palmira",

  subtitle:
    "El arque\u00f3logo de 83 a\u00f1os que protegi\u00f3 Palmira durante medio siglo \u2014 y eligi\u00f3 la muerte antes que entregarla a quienes vinieron a destruirlo todo",

  excerpt:
    "Hab\u00eda pasado cincuenta a\u00f1os recorriendo las columnatas. Conoc\u00eda cada inscripci\u00f3n, cada tumba, cada columna rota por su nombre. Cuando llegaron los hombres armados, sus colegas le suplicaron que se fuera. Se neg\u00f3.",

  moralOrLesson:
    "Hay quienes destruyen porque temen lo que el pasado revela sobre la amplitud de lo posible \u2014 y hay quienes mueren antes que traicionarlo. Las piedras se reconstruir\u00e1n o no, pero la decisi\u00f3n de un anciano con gafas, en silencio ante sus verdugos, es un monumento que ning\u00fan explosivo puede alcanzar.",

  characters: [
    "Khaled al-Asaad (director de antig\u00fcedades, 1963\u20132003)",
    "Maamoun Abdulkarim (director general de Antig\u00fcedades de Siria)",
    "Micha\u0142 Gawlikowski (arque\u00f3logo polaco)",
    "Irina Bokova (directora general de la UNESCO)",
  ],

  era: "1963\u20132015 (carrera de al-Asaad); mayo\u2013agosto de 2015 (ocupaci\u00f3n del ISIS y su martirio)",

  paragraphs: [
    {
      text: "Khaled al-Asaad pas\u00f3 cincuenta a\u00f1os recorriendo las mismas ruinas cada d\u00eda. Naci\u00f3 en 1932 en Tadmor \u2014 el pueblo sirio que vive a la sombra de la antigua Palmira \u2014 y creci\u00f3 tratando las columnatas como si fueran el patio de su casa. Estudi\u00f3 historia en Damasco, volvi\u00f3, y en 1963 se convirti\u00f3 en director de antig\u00fcedades de Palmira. Cuarenta a\u00f1os en el cargo. Cuando se jubil\u00f3 en 2003, nada cambi\u00f3: segu\u00eda apareciendo cada ma\u00f1ana. A su hija le puso Zenobia, como la reina guerrera de Palmira. Las ruinas no eran su lugar de trabajo. Eran \u00e9l.",
    },
    {
      text: "Todos los equipos internacionales que excavaron en Palmira \u2014 polacos, alemanes, franceses, japoneses, americanos \u2014 pasaron por \u00e9l. Dirigi\u00f3 excavaciones en el Templo de Bel y en el Valle de las Tumbas. Tradujo miles de inscripciones en arameo palmireno, la clave para descifrar el pasado de la ciudad. Le llamaban \u00abSe\u00f1or Palmira\u00bb y era capaz de recorrer las ruinas con cualquiera \u2014 catedr\u00e1tico o turista \u2014 compartiendo historias de medio siglo de dedicaci\u00f3n. No estudiaba la historia. Era el puente vivo hacia ella.",
    },
    {
      text: "En la primavera de 2015, el ISIS avanzaba. Ya hab\u00edan destrozado ante las c\u00e1maras las piezas del Museo de Mosul y arrasado ciudades asirias milenarias. Todo el mundo sab\u00eda lo que significar\u00eda la ca\u00edda de Palmira. Al-Asaad y Maamoun Abdulkarim, director general de antig\u00fcedades de Siria, organizaron un rescate contrarreloj: cargaron cientos de piezas \u2014 estatuas, relieves, retratos funerarios \u2014 en camiones rumbo a Damasco. Cuando se acab\u00f3 el tiempo, al-Asaad decidi\u00f3 qu\u00e9 se salvaba. Conoc\u00eda cada pieza por su nombre.",
    },
    {
      text: "Palmira cay\u00f3 el 20 de mayo de 2015. El pueblo se vaci\u00f3. Sus colegas le suplicaron que se marchara: ten\u00eda ochenta y tres a\u00f1os, hab\u00eda hecho todo lo humanamente posible, sus hijos lo esperaban. Se neg\u00f3. Hab\u00eda pasado toda su vida adulta all\u00ed. El ISIS lo captur\u00f3 casi de inmediato. Durante un mes lo interrogaron y lo torturaron. Quer\u00edan dos cosas: el oro que cre\u00edan enterrado bajo las ruinas y la ubicaci\u00f3n de las piezas evacuadas. No les dio nada. Ni una palabra.",
    },
    {
      text: "El 18 de agosto de 2015, el ISIS ejecut\u00f3 p\u00fablicamente a Khaled al-Asaad en su propia ciudad. Colgaron su cuerpo de un poste con las gafas puestas \u2014 la marca del estudioso convertida en burla. Un cartel enumeraba sus \u00abcr\u00edmenes\u00bb: asistir a congresos internacionales, colaborar con gobiernos extranjeros, ser \u00abel director de la idolatr\u00eda\u00bb. Cada pieza rescatada, cada inscripci\u00f3n traducida, cada colega al que dio la bienvenida: toda su vida fue la prueba en su contra. Ten\u00eda ochenta y tres a\u00f1os.",
    },
    {
      text: "Despu\u00e9s, el ISIS hizo exactamente lo que todos tem\u00edan. Volaron el Templo de Baalshamin. Dinamitaron el Templo de Bel \u2014 un edificio del a\u00f1o 32 que hab\u00eda sobrevivido dos mil a\u00f1os de guerras, imperios y religiones. Destruyeron el Arco Monumental. Derribaron las torres funerarias. Destrozaron el Le\u00f3n de Al-lat. Usaron el teatro romano para ejecuciones masivas. Quer\u00edan borrar Palmira del mapa y de la memoria.",
    },
    {
      text: "Cuando las fuerzas sirias recuperaron Palmira en marzo de 2016, la Gran Columnata y el teatro romano segu\u00edan en pie. En Damasco, cada pieza que al-Asaad hab\u00eda salvado \u2014 bustos funerarios, inscripciones, rostros tallados hace dos mil a\u00f1os \u2014 estaba donde \u00e9l las hab\u00eda enviado. A salvo. El equipo polaco que trabaj\u00f3 a su lado durante d\u00e9cadas volvi\u00f3 y reconstruy\u00f3 el Le\u00f3n de Al-lat a partir de sus fragmentos. Una orquesta rusa toc\u00f3 en el teatro herido. Las piedras recordaban.",
    },
    {
      text: "Dicen que Dios aprieta pero no ahoga. El ISIS apret\u00f3 con todo lo que ten\u00eda: armas, explosivos, un mes de poder absoluto sobre un viejo indefenso. Apretaron hasta matarlo \u2014 pero no lograron ahogar lo que de verdad importaba. Un arque\u00f3logo de ochenta y tres a\u00f1os con gafas, que jam\u00e1s toc\u00f3 un arma, los venci\u00f3. Las piezas siguen a salvo. Los tesoros que exig\u00edan jam\u00e1s aparecieron. No solo protegi\u00f3 unas ruinas. Demostr\u00f3 que quienes recuerdan son m\u00e1s dif\u00edciles de destruir que aquello que recuerdan.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb: "Patience et longueur de temps font plus que force ni que rage"
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#guardian-of-palmyra",

  title: "Le Gardien de Palmyre",

  subtitle:
    "L\u2019arch\u00e9ologue de 83 ans qui a prot\u00e9g\u00e9 Palmyre pendant cinquante ans \u2014 et choisi la mort plut\u00f4t que de la livrer \u00e0 ceux qui voulaient tout d\u00e9truire",

  excerpt:
    "Il avait pass\u00e9 cinquante ans \u00e0 arpenter les colonnades. Il connaissait chaque inscription, chaque tombe, chaque colonne bris\u00e9e par son nom. Quand les hommes arm\u00e9s sont arriv\u00e9s, ses coll\u00e8gues l\u2019ont suppli\u00e9 de partir. Il a refus\u00e9.",

  moralOrLesson:
    "Il y a ceux qui d\u00e9truisent parce qu\u2019ils craignent ce que le pass\u00e9 r\u00e9v\u00e8le sur l\u2019\u00e9tendue du possible humain \u2014 et ceux qui meurent plut\u00f4t que de le trahir. Les pierres seront reconstruites ou non, mais le choix d\u2019un vieil homme \u00e0 lunettes, silencieux devant ses bourreaux, est un monument qu\u2019aucun explosif ne peut atteindre.",

  characters: [
    "Khaled al-Asaad (directeur des antiquit\u00e9s, 1963\u20132003)",
    "Maamoun Abdulkarim (directeur g\u00e9n\u00e9ral des Antiquit\u00e9s syriennes)",
    "Micha\u0142 Gawlikowski (arch\u00e9ologue polonais)",
    "Irina Bokova (directrice g\u00e9n\u00e9rale de l\u2019UNESCO)",
  ],

  era: "1963\u20132015 (carri\u00e8re d\u2019al-Asaad) ; mai\u2013ao\u00fbt 2015 (occupation par Daech et son martyre)",

  paragraphs: [
    {
      text: "Khaled al-Asaad a pass\u00e9 cinquante ans \u00e0 arpenter les m\u00eames ruines chaque jour. N\u00e9 en 1932 \u00e0 Tadmor, la ville syrienne adoss\u00e9e \u00e0 l\u2019antique Palmyre, il a grandi parmi les colonnades comme d\u2019autres dans une cour d\u2019\u00e9cole. \u00c9tudes d\u2019histoire \u00e0 Damas, retour au pays, et en 1963, le voil\u00e0 directeur des antiquit\u00e9s de Palmyre. Quarante ans. \u00c0 sa retraite en 2003, rien ne change\u00a0: il est l\u00e0 chaque matin. Il a pr\u00e9nomm\u00e9 sa fille Z\u00e9nobie, comme la reine guerri\u00e8re. Ces ruines, ce n\u2019\u00e9tait pas son travail. C\u2019\u00e9tait lui.",
    },
    {
      text: "Toutes les \u00e9quipes internationales venues fouiller Palmyre \u2014 polonaises, allemandes, fran\u00e7aises, japonaises, am\u00e9ricaines \u2014 sont pass\u00e9es par lui. Il a dirig\u00e9 les fouilles au Temple de B\u00eal et dans la Vall\u00e9e des Tombeaux, d\u00e9chiffr\u00e9 des milliers d\u2019inscriptions en aram\u00e9en palmyr\u00e9nien. On l\u2019appelait \u00ab\u00a0Monsieur Palmyre\u00a0\u00bb. Il guidait n\u2019importe qui dans les ruines \u2014 professeur ou touriste \u2014 avec les m\u00eames histoires puis\u00e9es dans cinquante ans de d\u00e9votion. Il n\u2019\u00e9tudiait pas l\u2019histoire. Il en \u00e9tait le pont vivant.",
    },
    {
      text: "Au printemps 2015, Daech avan\u00e7ait. Ils avaient d\u00e9j\u00e0 saccag\u00e9 le mus\u00e9e de Mossoul devant les cam\u00e9ras et ras\u00e9 des cit\u00e9s assyriennes mill\u00e9naires. Tout le monde savait ce que la chute de Palmyre signifierait. Al-Asaad et Maamoun Abdulkarim, directeur g\u00e9n\u00e9ral des antiquit\u00e9s syriennes, ont organis\u00e9 une \u00e9vacuation contre la montre\u00a0: des centaines de pi\u00e8ces \u2014 statues, reliefs, portraits fun\u00e9raires \u2014 charg\u00e9es sur des camions vers Damas. Quand le temps a manqu\u00e9, c\u2019est al-Asaad qui a tranch\u00e9. Il connaissait chaque objet.",
    },
    {
      text: "Palmyre est tomb\u00e9e le 20 mai 2015. La ville s\u2019est vid\u00e9e. Ses coll\u00e8gues l\u2019ont suppli\u00e9 de partir \u2014 il avait quatre-vingt-trois ans, il avait fait tout ce qu\u2019un homme pouvait faire, ses enfants l\u2019attendaient. Il a refus\u00e9. Il avait pass\u00e9 toute sa vie d\u2019adulte ici. Daech l\u2019a captur\u00e9 presque imm\u00e9diatement. Pendant un mois, ils l\u2019ont interrog\u00e9 et tortur\u00e9. Ils voulaient deux choses\u00a0: l\u2019or qu\u2019ils croyaient enfoui sous les ruines et l\u2019emplacement des pi\u00e8ces \u00e9vacu\u00e9es. Il ne leur a rien donn\u00e9. Pas un mot.",
    },
    {
      text: "Le 18 ao\u00fbt 2015, Daech a ex\u00e9cut\u00e9 publiquement Khaled al-Asaad dans sa propre ville. Ils ont suspendu son corps \u00e0 un poteau, lunettes toujours sur le nez \u2014 l\u2019attribut du lettr\u00e9 transform\u00e9 en moquerie. Une pancarte autour de son cou \u00e9num\u00e9rait ses \u00ab\u00a0crimes\u00a0\u00bb\u00a0: avoir particip\u00e9 \u00e0 des colloques internationaux, collabor\u00e9 avec des gouvernements \u00e9trangers, \u00e9t\u00e9 \u00ab\u00a0le directeur de l\u2019idol\u00e2trie\u00a0\u00bb. Chaque pi\u00e8ce sauv\u00e9e, chaque inscription traduite, chaque coll\u00e8gue \u00e9tranger accueilli\u00a0: l\u2019\u0153uvre de sa vie \u00e9tait le r\u00e9quisitoire contre lui.",
    },
    {
      text: "Puis Daech a fait exactement ce que tout le monde redoutait. Ils ont dynamit\u00e9 le Temple de Baalshamin. Fait sauter le Temple de B\u00eal \u2014 un \u00e9difice de l\u2019an 32 qui avait travers\u00e9 deux mille ans de guerres, d\u2019empires et de religions. D\u00e9truit l\u2019Arc monumental. Abattu les tours fun\u00e9raires. Pulv\u00e9ris\u00e9 le Lion d\u2019Al-lat. Transform\u00e9 le th\u00e9\u00e2tre romain en lieu d\u2019ex\u00e9cutions. Ils voulaient effacer Palmyre de la m\u00e9moire du monde.",
    },
    {
      text: "Quand les forces syriennes ont repris Palmyre en mars 2016, la Grande Colonnade et le th\u00e9\u00e2tre romain tenaient encore debout. \u00c0 Damas, chaque pi\u00e8ce qu\u2019al-Asaad avait sauv\u00e9e \u2014 bustes fun\u00e9raires, inscriptions, visages sculpt\u00e9s il y a deux mill\u00e9naires \u2014 reposait l\u00e0 o\u00f9 il les avait envoy\u00e9es. Intactes. L\u2019\u00e9quipe polonaise qui avait travaill\u00e9 \u00e0 ses c\u00f4t\u00e9s pendant des d\u00e9cennies est revenue reconstituer le Lion d\u2019Al-lat fragment par fragment. Un orchestre russe a jou\u00e9 dans le th\u00e9\u00e2tre meurtri. Les pierres se souvenaient.",
    },
    {
      text: "Patience et longueur de temps font plus que force ni que rage, \u00e9crivait La Fontaine. Daech avait la force, la rage, les armes et un mois de pouvoir absolu sur un vieil homme seul. Et un arch\u00e9ologue de quatre-vingt-trois ans \u00e0 lunettes \u2014 qui n\u2019avait jamais tenu une arme \u2014 les a vaincus. Les pi\u00e8ces sont en s\u00e9curit\u00e9. Les tr\u00e9sors exig\u00e9s n\u2019ont jamais \u00e9t\u00e9 livr\u00e9s. Il n\u2019a pas seulement prot\u00e9g\u00e9 des ruines. Il a prouv\u00e9 que ceux qui se souviennent sont plus difficiles \u00e0 d\u00e9truire que ce dont ils se souviennent.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb: "Gottes Mühlen mahlen langsam"
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#guardian-of-palmyra",

  title: "Der W\u00e4chter von Palmyra",

  subtitle:
    "Der 83-j\u00e4hrige Arch\u00e4ologe, der Palmyra f\u00fcnfzig Jahre lang besch\u00fctzte \u2014 und lieber starb, als es an jene zu verraten, die kamen, um alles zu zerst\u00f6ren",

  excerpt:
    "Er hatte f\u00fcnfzig Jahre zwischen den Kolonnaden verbracht. Er kannte jede Inschrift, jedes Grab, jede gebrochene S\u00e4ule beim Namen. Als die Bewaffneten kamen, flehten ihn seine Kollegen an zu gehen. Er weigerte sich.",

  moralOrLesson:
    "Es gibt jene, die zerst\u00f6ren, weil sie f\u00fcrchten, was die Vergangenheit \u00fcber die Weite menschlicher M\u00f6glichkeiten offenbart \u2014 und jene, die lieber sterben, als sie zu verraten. Die Steine werden wiederaufgebaut oder auch nicht, aber die Entscheidung eines alten Mannes mit Brille, schweigend vor seinen Henkern, ist ein Denkmal, das kein Sprengstoff erreichen kann.",

  characters: [
    "Khaled al-Asaad (Direktor der Altert\u00fcmer, 1963\u20132003)",
    "Maamoun Abdulkarim (Generaldirektor der syrischen Altert\u00fcmerverwaltung)",
    "Micha\u0142 Gawlikowski (polnischer Arch\u00e4ologe)",
    "Irina Bokova (UNESCO-Generaldirektorin)",
  ],

  era: "1963\u20132015 (al-Asaads Laufbahn); Mai\u2013August 2015 (IS-Besatzung und sein Martyrium)",

  paragraphs: [
    {
      text: "Khaled al-Asaad verbrachte f\u00fcnfzig Jahre damit, jeden Tag dieselben Ruinen abzulaufen. 1932 in Tadmor geboren \u2014 der syrischen Kleinstadt neben dem antiken Palmyra \u2014, wuchs er zwischen Kolonnaden auf wie andere Kinder im Hinterhof. Geschichte in Damaskus studiert, zur\u00fcckgekommen, 1963 Direktor der Altert\u00fcmer von Palmyra. Vierzig Jahre. Als er 2003 in Rente ging, \u00e4nderte sich nichts \u2014 er war jeden Morgen da. Seine Tochter nannte er Zenobia, nach Palmyras Krieger\u00f6nigin. Die Ruinen waren nicht sein Arbeitsplatz. Sie waren er selbst.",
    },
    {
      text: "Jedes internationale Grabungsteam in Palmyra \u2014 polnisch, deutsch, franz\u00f6sisch, japanisch, amerikanisch \u2014 lief \u00fcber ihn. Er leitete Ausgrabungen am Bel-Tempel und im Tal der Gr\u00e4ber. Er \u00fcbersetzte Tausende Inschriften in palmyrenischem Aram\u00e4isch, den Schl\u00fcssel zur Vergangenheit der Stadt. Man nannte ihn \u201eMr. Palmyra\u201c. Er f\u00fchrte jeden durch die Ruinen \u2014 Professor oder Tourist \u2014 mit Geschichten aus f\u00fcnfzig Jahren Hingabe. Er studierte Geschichte nicht. Er war die lebende Br\u00fccke zu ihr.",
    },
    {
      text: "Im Fr\u00fchjahr 2015 r\u00fcckte der IS n\u00e4her. Sie hatten vor laufenden Kameras das Museum von Mossul zerschlagen und assyrische St\u00e4dte dem Erdboden gleichgemacht. Jeder wusste, was Palmyras Fall bedeuten w\u00fcrde. Al-Asaad und Maamoun Abdulkarim, Syriens Generaldirektor f\u00fcr Altert\u00fcmer, organisierten eine Rettung gegen die Uhr: Hunderte St\u00fccke \u2014 Statuen, Reliefs, Grabportr\u00e4ts \u2014 auf Lastwagen nach Damaskus. Als die Zeit ablief, entschied al-Asaad, was mitging. Er kannte jedes St\u00fcck.",
    },
    {
      text: "Palmyra fiel am 20. Mai 2015. Die Stadt leerte sich. Kollegen flehten ihn an zu gehen \u2014 er war dreiundachtzig, er hatte alles getan, was ein Mensch tun konnte, seine Kinder warteten. Er weigerte sich. Sein ganzes Erwachsenenleben hatte hier stattgefunden. Der IS nahm ihn fast sofort gefangen. Einen Monat lang verh\u00f6rten und folterten sie ihn. Sie wollten zwei Dinge: das Gold, das sie unter den Ruinen vermuteten, und den Verbleib der evakuierten Artefakte. Er gab ihnen nichts. Kein einziges Wort.",
    },
    {
      text: "Am 18. August 2015 enthauptete der IS Khaled al-Asaad \u00f6ffentlich in seiner Heimatstadt. Sie h\u00e4ngten seinen Leichnam an einen Pfahl, Brille noch auf der Nase \u2014 das Merkmal des Gelehrten als Verh\u00f6hnung. Ein Schild listete seine \u201eVerbrechen\u201c: Teilnahme an internationalen Konferenzen, Zusammenarbeit mit ausl\u00e4ndischen Regierungen, \u201eDirektor der G\u00f6tzenanbetung\u201c. Jedes gerettete St\u00fcck, jede \u00fcbersetzte Inschrift, jeder willkommen gehei\u00dfene Kollege \u2014 sein Lebenswerk war die Anklage gegen ihn. Er war dreiundachtzig.",
    },
    {
      text: "Dann tat der IS genau das, was alle bef\u00fcrchtet hatten. Sie sprengten den Baalshamin-Tempel. Sie sprengten den Bel-Tempel \u2014 ein Bauwerk aus dem Jahr 32 nach Christus, das zweitausend Jahre Kriege, Imperien und Religionswechsel \u00fcberstanden hatte. Sie zerst\u00f6rten den Monumentalbogen. St\u00fcrzten Grabt\u00fcrme. Zertr\u00fcmmerten den L\u00f6wen von Al-lat. Das r\u00f6mische Theater machten sie zur Hinrichtungsst\u00e4tte. Sie versuchten, Palmyra aus der Geschichte zu l\u00f6schen.",
    },
    {
      text: "Als syrische Truppen Palmyra im M\u00e4rz 2016 zur\u00fcckeroberten, standen die Gro\u00dfe Kolonnade und das Theater noch. In Damaskus lagerte jedes St\u00fcck, das al-Asaad gerettet hatte \u2014 Grabb\u00fcsten, Inschriften, zweitausend Jahre alte Steingesichter \u2014 genau dort, wo er es hingeschickt hatte. Unversehrt. Das polnische Team, das Jahrzehnte an seiner Seite gegraben hatte, kam zur\u00fcck und setzte den L\u00f6wen von Al-lat Fragment f\u00fcr Fragment zusammen. Ein russisches Orchester spielte im verwundeten Theater. Die Steine erinnerten sich.",
    },
    {
      text: "Man sagt, Gottes M\u00fchlen mahlen langsam \u2014 aber sie mahlen. Der IS hatte Waffen, Sprengstoff und einen Monat absoluter Macht \u00fcber einen wehrlosen alten Mann. Und ein dreiundachtzigj\u00e4hriger Arch\u00e4ologe mit Brille \u2014 der nie im Leben eine Waffe in der Hand gehalten hatte \u2014 hat sie besiegt. Die Artefakte sind bis heute sicher. Die Sch\u00e4tze, die sie forderten, wurden nie gefunden. Er hat nicht nur Ruinen besch\u00fctzt. Er hat bewiesen, dass die, die sich erinnern, schwerer zu zerst\u00f6ren sind als das, woran sie sich erinnern.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23f3 Pushing ${label} ...`);

  // JSON validation: round-trip check
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Verify no paragraph exceeds 600 chars (500 + 20% tolerance)
  for (let i = 0; i < record.paragraphs.length; i++) {
    const chars = record.paragraphs[i].text.length;
    if (chars > 600) {
      throw new Error(
        `${label} paragraph ${i + 1} exceeds 600 chars: ${chars}`
      );
    }
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `\u26a0\ufe0f  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`\u2705 ${label} overwritten successfully.`);
    } else {
      console.error(`\u274c Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("\u2550\u2550\u2550 Pushing Guardian of Palmyra translations to DynamoDB \u2550\u2550\u2550");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [es, fr, de]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      const chars = p.text.length;
      totalChars += chars;
      if (chars > 500) {
        console.warn(
          `\u26a0\ufe0f  ${rec.lang} paragraph ${i + 1}: ${chars} chars (over 500 soft limit)`
        );
      }
    }
    console.log(
      `\n\ud83d\udcca ${rec.lang}: ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(es);
  await pushStory(fr);
  await pushStory(de);

  console.log(
    "\n\u2550\u2550\u2550 All three translations pushed successfully \u2550\u2550\u2550"
  );
}

main().catch((err) => {
  console.error("\n\ud83d\udca5 Fatal error:", err);
  process.exit(1);
});
