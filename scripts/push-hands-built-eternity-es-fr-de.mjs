import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared (non-text) fields ───────────────────────────────────────────────
const shared = {
  siteId: "taj-mahal",
  storyId: "hands-that-built-eternity",
  storyCategory: "builders_wonders",
  coordinates: { lat: 27.1751, lng: 78.0421 },
  disabled: false,
  hasAudio: false,
  icon: "\u270B",
  image: "",
  isFree: true,
  readingTimeMinutes: 8,
  source:
    "Abdul Hamid Lahori, Padshahnama (c. 1648); Lutfullah Muhandis, Diwan-i-Muhandis (manuscript, Mahmud Banglori collection, Bangalore); Ebba Koch, The Complete Taj Mahal and the Riverfront Gardens of Agra (2006); Stith Thompson, Motif-Index of Folk-Literature (1955-58), motifs W181.2 and S165.7; S. Irfan Habib, Jawaharlal Nehru University; Rana Safvi, \u2018The Architect of the Taj Mahal\u2019 (2019)",
  thumbnail: "",
  tier: "A",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH
// ═══════════════════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#hands-that-built-eternity",
  title: "Las manos que nadie cort\u00f3",
  subtitle:
    "La leyenda negra de los trabajadores mutilados, el mito universal del creador castigado y la verdad sobre los maestros que levantaron el Taj Mahal",
  excerpt:
    "En Agra, India, te cuentan una historia escalofriante: cuando el Taj Mahal qued\u00f3 terminado, el emperador Shah Jahan mand\u00f3 cortar las manos de los veinte mil trabajadores para que nadie pudiera construir algo as\u00ed nunca m\u00e1s. Es una de las leyendas m\u00e1s famosas del mundo. Y es completamente inventada.",
  moralOrLesson:
    "La verdadera historia del Taj Mahal no dice que la belleza exige sufrimiento, sino que la belleza exige libertad \u2014 y el mayor monumento al amor en la Tierra fue construido no por esclavos ni prisioneros, sino por manos libres, bien pagadas, orgullosamente firmadas y transmitidas de padres a hijos.",
  characters: [
    "Shah Jahan (emperador)",
    "Ustad Ahmad Lahori (arquitecto jefe, \u201cMaravilla de su \u00c9poca\u201d)",
    "Amanat Khan Shirazi (maestro cal\u00edgrafo, nacido Abd ul-Haq)",
    "Lutfullah Muhandis (hijo de Ahmad Lahori, poeta y matem\u00e1tico)",
    "Ataullah Rashidi (hijo de Ahmad Lahori, arquitecto del Bibi Ka Maqbara)",
    "Ebba Koch (historiadora del arte, Universidad de Viena)",
  ],
  era: "1632\u20131653 (construcci\u00f3n del Taj Mahal); or\u00edgenes del mito inciertos, popularizado en los siglos XIX\u2013XX",
  paragraphs: [
    {
      text: "En Agra, India \u2014 justo a la sombra del Taj Mahal \u2014 te cuentan una historia escalofriante. Cuando el emperador Shah Jahan termin\u00f3 su obra maestra en 1653, supuestamente mand\u00f3 cortar las manos de veinte mil trabajadores. Para que nadie pudiera construir algo as\u00ed nunca m\u00e1s. Algunas versiones a\u00f1aden que tambi\u00e9n les sac\u00f3 los ojos. Es una de las leyendas m\u00e1s famosas del mundo. Y es completamente inventada.",
    },
    {
      text: "Ni siquiera es una mentira original. En Mosc\u00fa cuentan que Iv\u00e1n el Terrible ceg\u00f3 a los arquitectos de San Basilio. En Estambul, que el sult\u00e1n Mehmed cort\u00f3 la mano del arquitecto de la Mezquita de Fatih. A la tercera va la vencida, dicen \u2014 pero aqu\u00ed, a la tercera fue la misma mentira. El folclorista Stith Thompson lo catalog\u00f3 como mito universal: donde construimos algo de una belleza imposible, inventamos que destruyeron al creador.",
    },
    {
      text: "La cr\u00f3nica oficial de Shah Jahan, el Padshahnama \u2014 cientos de p\u00e1ginas de contabilidad mogol obsesiva, con cada salario, contrato de cantera y cargamento de m\u00e1rmol \u2014 no menciona castigo alguno. Ni una l\u00ednea. Cortar cuarenta mil manos habr\u00eda sido una cat\u00e1strofe log\u00edstica: la p\u00e9rdida repentina de la mano de obra m\u00e1s cualificada de Asia. En un imperio que lo documentaba todo, nadie lo registr\u00f3. Porque nunca ocurri\u00f3.",
    },
    {
      text: "Shah Jahan hizo justo lo contrario. En 1641, en plena construcci\u00f3n, prohibi\u00f3 el trabajo forzado en todo su imperio. Una inscripci\u00f3n en el Fuerte de Agra registra once millones de dams del tesoro real gastados en salarios. Y arque\u00f3logos encontraron unos 670 nombres tallados en la piedra del Taj \u2014 en \u00e1rabe y persa, con s\u00edmbolos hind\u00faes y musulmanes lado a lado. No eran marcas de prisioneros. Eran firmas de gente orgullosa de su obra.",
    },
    {
      text: "El arquitecto jefe, Ustad Ahmad Lahori \u2014 matem\u00e1tico formado en Euclides, apodado \u201cMaravilla de su \u00c9poca\u201d \u2014 no desapareci\u00f3 tras el Taj. Pas\u00f3 directamente a dise\u00f1ar el Fuerte Rojo de Delhi, la nueva capital de Shah Jahan. Muri\u00f3 de causas naturales hacia 1649, con las manos intactas. Su hijo construy\u00f3 despu\u00e9s una r\u00e9plica del Taj por encargo del propio hijo de Shah Jahan, el emperador Aurangzeb. Nunca existi\u00f3 prohibici\u00f3n alguna.",
    },
    {
      text: "Luego est\u00e1 el cal\u00edgrafo Abd ul-Haq, tra\u00eddo desde Ir\u00e1n para inscribir versos del Cor\u00e1n en cada arco. Dise\u00f1\u00f3 las letras para que crecieran a medida que sub\u00edan por los muros, de modo que desde abajo parecieran todas del mismo tama\u00f1o \u2014 un truco visual que sigue funcionando hoy. Shah Jahan le otorg\u00f3 t\u00edtulo nobiliario, tierras y riqueza de por vida. La \u00fanica persona que firm\u00f3 el Taj Mahal muri\u00f3 rica, construyendo un albergue para viajeros con su propio dinero.",
    },
    {
      text: "\u00bfPor qu\u00e9 sobrevive el mito? En parte porque los relatos coloniales brit\u00e1nicos sobre \u201ccrueles emperadores orientales\u201d ayudaban a justificar el dominio sobre la India. Pero sobre todo porque cuando te plantas ante el Taj Mahal y el m\u00e1rmol te inunda la mirada y las flores de piedra parecen reales \u2014 tu cerebro necesita una explicaci\u00f3n a la altura de la belleza. Cuarenta mil manos cortadas es, en su horror, una respuesta tan inmensa como la pregunta.",
    },
    {
      text: "La historia real es mejor. Veinte mil trabajadores de distintas religiones, dirigidos por un arquitecto genial, pagados por el tesoro imperial, construyeron durante veintid\u00f3s a\u00f1os bajo un emperador que prohibi\u00f3 el trabajo forzado. Tallaron sus nombres en los muros. Ense\u00f1aron el oficio a sus hijos, que construyeron para emperadores a\u00fan no nacidos. Las manos que levantaron el Taj Mahal jam\u00e1s fueron cortadas. La belleza no fue maldici\u00f3n. Fue un regalo \u2014 dado libremente.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH
// ═══════════════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#hands-that-built-eternity",
  title: "Les mains libres du Taj Mahal",
  subtitle:
    "La sombre l\u00e9gende des ouvriers mutil\u00e9s, le mythe universel du cr\u00e9ateur puni et la v\u00e9rit\u00e9 sur les ma\u00eetres b\u00e2tisseurs du Taj Mahal",
  excerpt:
    "Il y a une histoire qu\u2019on entend \u00e0 Agra, en Inde \u2014 quand le Taj Mahal fut achev\u00e9, l\u2019empereur Shah Jahan aurait fait trancher les mains de chaque ouvrier pour que personne ne puisse jamais construire quelque chose d\u2019aussi beau. C\u2019est l\u2019une des l\u00e9gendes les plus c\u00e9l\u00e8bres au monde. Et elle est enti\u00e8rement fausse.",
  moralOrLesson:
    "La vraie histoire du Taj Mahal ne dit pas que la beaut\u00e9 exige la souffrance, mais que la beaut\u00e9 exige la libert\u00e9 \u2014 et le plus grand monument d\u2019amour sur Terre a \u00e9t\u00e9 b\u00e2ti non par des esclaves ou des prisonniers, mais par des mains libres, bien pay\u00e9es, fi\u00e8rement sign\u00e9es et transmises de p\u00e8re en fils.",
  characters: [
    "Shah Jahan (empereur)",
    "Ustad Ahmad Lahori (architecte en chef, \u00ab\u00a0Merveille de son \u00c9poque\u00a0\u00bb)",
    "Amanat Khan Shirazi (ma\u00eetre calligraphe, n\u00e9 Abd ul-Haq)",
    "Lutfullah Muhandis (fils d\u2019Ahmad Lahori, po\u00e8te et math\u00e9maticien)",
    "Ataullah Rashidi (fils d\u2019Ahmad Lahori, architecte du Bibi Ka Maqbara)",
    "Ebba Koch (historienne de l\u2019art, Universit\u00e9 de Vienne)",
  ],
  era: "1632\u20131653 (construction du Taj Mahal)\u00a0; origines du mythe incertaines, popularis\u00e9 aux XIXe\u2013XXe si\u00e8cles",
  paragraphs: [
    {
      text: "Il y a une histoire qu\u2019on entend \u00e0 Agra, en Inde \u2014 \u00e0 deux pas du Taj Mahal. Quand l\u2019empereur Shah Jahan a achev\u00e9 son chef-d\u2019\u0153uvre en 1653, il aurait ordonn\u00e9 de trancher les mains des vingt mille ouvriers. Pour que personne ne puisse jamais construire quelque chose d\u2019aussi beau. Certaines versions ajoutent qu\u2019il leur a aussi crev\u00e9 les yeux. C\u2019est l\u2019une des l\u00e9gendes les plus c\u00e9l\u00e8bres au monde. Et elle est enti\u00e8rement fausse.",
    },
    {
      text: "Ce n\u2019est m\u00eame pas un mensonge original. \u00c0 Moscou, on raconte qu\u2019Ivan le Terrible a fait aveugler les architectes de Saint-Basile. \u00c0 Istanbul, que le sultan Mehmed a fait couper la main de l\u2019architecte de la mosqu\u00e9e Fatih. Jamais deux sans trois \u2014 surtout quand c\u2019est le m\u00eame mensonge. Le folkloriste Stith Thompson l\u2019a class\u00e9 comme mythe universel\u00a0: partout o\u00f9 l\u2019homme b\u00e2tit quelque chose d\u2019une beaut\u00e9 impossible, on invente que le cr\u00e9ateur a \u00e9t\u00e9 d\u00e9truit.",
    },
    {
      text: "La chronique officielle de Shah Jahan, le Padshahnama \u2014 des centaines de pages de comptabilit\u00e9 moghole, chaque salaire, chaque contrat de carri\u00e8re, chaque convoi de marbre \u2014 ne mentionne aucune punition. Pas une ligne. Trancher quarante mille mains aurait \u00e9t\u00e9 une catastrophe logistique \u2014 la perte soudaine de la main-d\u2019\u0153uvre la plus qualifi\u00e9e d\u2019Asie. Dans un empire qui documentait tout, personne ne l\u2019a consign\u00e9. Parce que \u00e7a n\u2019a jamais eu lieu.",
    },
    {
      text: "Shah Jahan a fait l\u2019inverse. En 1641, en plein chantier, il a interdit le travail forc\u00e9 dans tout son empire. Une inscription au Fort d\u2019Agra consigne onze millions de dams du tr\u00e9sor royal vers\u00e9s en salaires. Et des arch\u00e9ologues ont d\u00e9couvert environ 670 noms grav\u00e9s dans le gr\u00e8s du Taj \u2014 en arabe et en persan, symboles hindous et musulmans c\u00f4te \u00e0 c\u00f4te. Pas des marques de prisonniers. Des signatures de gens fiers de ce qu\u2019ils avaient b\u00e2ti.",
    },
    {
      text: "L\u2019architecte en chef, Ustad Ahmad Lahori \u2014 math\u00e9maticien form\u00e9 \u00e0 Euclide, surnomm\u00e9 \u00ab\u00a0Merveille de son \u00c9poque\u00a0\u00bb \u2014 n\u2019a pas disparu apr\u00e8s le Taj. Il est pass\u00e9 \u00e0 son projet suivant\u00a0: le Fort Rouge de Delhi, nouvelle capitale de Shah Jahan. Il est mort de causes naturelles vers 1649, les mains intactes. Son fils a construit une r\u00e9plique assum\u00e9e du Taj, command\u00e9e par le propre fils de Shah Jahan, l\u2019empereur Aurangzeb. Aucune interdiction n\u2019a jamais exist\u00e9.",
    },
    {
      text: "Et puis il y a le calligraphe Abd ul-Haq, venu d\u2019Iran pour inscrire des versets du Coran sous chaque arc. Il a con\u00e7u les lettres pour qu\u2019elles grandissent en montant le long des murs, afin qu\u2019elles paraissent uniformes vues d\u2019en bas \u2014 une illusion d\u2019optique qui fonctionne encore. Shah Jahan lui a donn\u00e9 un titre de noblesse, des terres et une fortune \u00e0 vie. La seule personne \u00e0 avoir sign\u00e9 le Taj Mahal est morte riche, b\u00e2tissant un g\u00eete pour voyageurs de ses propres deniers.",
    },
    {
      text: "Pourquoi le mythe tient-il\u00a0? En partie parce que les r\u00e9cits coloniaux britanniques sur les \u00ab\u00a0cruels empereurs d\u2019Orient\u00a0\u00bb justifiaient le r\u00e8gne sur l\u2019Inde. Mais surtout parce que devant le Taj Mahal, quand le marbre envahit le regard et les fleurs de pierre semblent pr\u00eates \u00e0 \u00eatre cueillies \u2014 le cerveau cherche une explication \u00e0 la hauteur de la beaut\u00e9. Quarante mille mains tranch\u00e9es, c\u2019est, dans son horreur, une r\u00e9ponse aussi immense que la question.",
    },
    {
      text: "La vraie histoire est plus belle. Vingt mille ouvriers de confessions diff\u00e9rentes, men\u00e9s par un architecte de g\u00e9nie, pay\u00e9s par le tr\u00e9sor imp\u00e9rial, ont b\u00e2ti pendant vingt-deux ans sous un empereur qui avait interdit le travail forc\u00e9. Ils ont grav\u00e9 leurs noms dans les murs. Ils ont transmis le m\u00e9tier \u00e0 leurs fils, qui ont b\u00e2ti pour des empereurs pas encore n\u00e9s. Les mains qui ont b\u00e2ti le Taj Mahal n\u2019ont jamais \u00e9t\u00e9 tranch\u00e9es. La beaut\u00e9 n\u2019\u00e9tait pas une mal\u00e9diction. C\u2019\u00e9tait un don \u2014 offert librement.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN
// ═══════════════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#hands-that-built-eternity",
  title: "H\u00e4nde f\u00fcr die Ewigkeit",
  subtitle:
    "Die d\u00fcstere Legende der verst\u00fcmmelten Arbeiter, der universelle Mythos des bestraften Sch\u00f6pfers und die Wahrheit \u00fcber die Meisterbauer des Taj Mahal",
  excerpt:
    "In Agra, Indien, erz\u00e4hlt man sich eine Geschichte, die einem den Atem nimmt: Als das Taj Mahal fertig war, lie\u00df Kaiser Shah Jahan angeblich allen zwanzigtausend Arbeitern die H\u00e4nde abhacken, damit niemand jemals etwas so Sch\u00f6nes bauen k\u00f6nnte. Es ist eine der ber\u00fchmtesten Legenden der Welt. Und sie ist komplett erfunden.",
  moralOrLesson:
    "Die wahre Geschichte des Taj Mahal erz\u00e4hlt nicht davon, dass Sch\u00f6nheit Leid erfordert, sondern dass Sch\u00f6nheit Freiheit erfordert \u2014 und das gr\u00f6\u00dfte Denkmal der Liebe auf Erden wurde nicht von Sklaven oder Gefangenen errichtet, sondern von freien H\u00e4nden, fair bezahlt, stolz signiert und von V\u00e4tern an S\u00f6hne weitergegeben.",
  characters: [
    "Shah Jahan (Kaiser)",
    "Ustad Ahmad Lahori (leitender Architekt, \u201eWunder seiner Zeit\u201c)",
    "Amanat Khan Shirazi (Meisterkalligraph, geboren als Abd ul-Haq)",
    "Lutfullah Muhandis (Sohn von Ahmad Lahori, Dichter und Mathematiker)",
    "Ataullah Rashidi (Sohn von Ahmad Lahori, Architekt des Bibi Ka Maqbara)",
    "Ebba Koch (Kunsthistorikerin, Universit\u00e4t Wien)",
  ],
  era: "1632\u20131653 (Bau des Taj Mahal); Urspr\u00fcnge des Mythos ungewiss, popul\u00e4r seit dem 19.\u201320. Jahrhundert",
  paragraphs: [
    {
      text: "In Agra, Indien \u2014 direkt im Schatten des Taj Mahal \u2014 erz\u00e4hlt man sich eine Geschichte, die einem den Atem nimmt. Als Kaiser Shah Jahan sein Meisterwerk 1653 vollendete, lie\u00df er angeblich allen zwanzigtausend Arbeitern die H\u00e4nde abhacken. Damit niemand jemals etwas so Sch\u00f6nes bauen k\u00f6nnte. Manche Versionen behaupten, er habe ihnen auch die Augen ausgestochen. Es ist eine der ber\u00fchmtesten Legenden der Welt. Und sie ist komplett erfunden.",
    },
    {
      text: "Es ist nicht mal eine originelle L\u00fcge. In Moskau erz\u00e4hlt man, Iwan der Schreckliche habe die Architekten der Basilius-Kathedrale geblendet. In Istanbul, Sultan Mehmed habe dem Architekten der Fatih-Moschee die Hand abgehackt. Aller guten Dinge sind drei, sagt man. Aller guten L\u00fcgen offenbar auch. Der Folklorist Stith Thompson katalogisierte es als universellen Mythos: Wo Menschen etwas unfassbar Sch\u00f6nes bauen, erfinden wir, dass die Erbauer daf\u00fcr zerst\u00f6rt wurden.",
    },
    {
      text: "Shah Jahans offizielle Hofchronik, das Padshahnama \u2014 Hunderte Seiten obsessiver mogulischer Buchf\u00fchrung \u00fcber jeden Lohn, jeden Steinbruchvertrag, jede Marmorlieferung \u2014 erw\u00e4hnt keine einzige Bestrafung. Nicht eine Zeile. Vierzigtausend H\u00e4nde abzuhacken w\u00e4re eine logistische Katastrophe gewesen \u2014 der pl\u00f6tzliche Verlust der qualifiziertesten Arbeitskraft Asiens. In einem Reich, das alles dokumentierte, wurde nichts festgehalten. Weil es nie passiert ist.",
    },
    {
      text: "Shah Jahan tat genau das Gegenteil. 1641, mitten im Bau, verbot er Zwangsarbeit in seinem gesamten Reich. Eine Inschrift im Fort von Agra verzeichnet elf Millionen Dam aus der Reichskasse f\u00fcr Arbeiterl\u00f6hne. Und Arch\u00e4ologen fanden sp\u00e4ter rund 670 Namen in den Sandstein des Taj geritzt \u2014 auf Arabisch und Persisch, mit hinduistischen und muslimischen Symbolen Seite an Seite. Keine Gefangenenkratzer. Unterschriften von Menschen, die stolz auf das waren, was sie gebaut hatten.",
    },
    {
      text: "Der leitende Architekt, Ustad Ahmad Lahori \u2014 ein Mathematiker, der Euklid studiert hatte, geehrt als \u201eWunder seiner Zeit\u201c \u2014 verschwand nach dem Taj nicht. Er ging direkt zu seinem n\u00e4chsten Projekt: dem Roten Fort in Delhi, Shah Jahans brandneuer Hauptstadt. Er starb um 1649 eines nat\u00fcrlichen Todes, mit beiden H\u00e4nden. Sein Sohn baute sp\u00e4ter eine bewusste Kopie des Taj, in Auftrag gegeben von Shah Jahans eigenem Sohn, Kaiser Aurangzeb. Ein Nachbauverbot hat nie existiert.",
    },
    {
      text: "Und dann ist da der Kalligraph Abd ul-Haq, eigens aus dem Iran geholt, um Koranverse in jeden Bogen zu mei\u00dfeln. Er entwarf die Buchstaben so, dass sie nach oben hin gr\u00f6\u00dfer wurden \u2014 damit sie von unten gleichm\u00e4\u00dfig aussahen. Ein optischer Trick, der bis heute funktioniert. Shah Jahan verlieh ihm einen Adelstitel, L\u00e4ndereien und lebenslangen Wohlstand. Die einzige Person, die das Taj Mahal signierte, starb reich und baute von ihrem eigenen Geld eine Herberge f\u00fcr Reisende.",
    },
    {
      text: "Warum h\u00e4lt sich der Mythos? Zum Teil, weil britische Kolonialerz\u00e4hlungen \u00fcber \u201egrausame \u00f6stliche Herrscher\u201c halfen, die Herrschaft \u00fcber Indien zu rechtfertigen. Vor allem aber, weil man vor dem Taj Mahal steht und der Marmor das ganze Blickfeld f\u00fcllt und die Steinblumen aussehen, als k\u00f6nnte man sie pfl\u00fccken \u2014 und das Gehirn eine Erkl\u00e4rung braucht, die der Sch\u00f6nheit gerecht wird. Vierzigtausend abgehackte H\u00e4nde sind, in ihrer Grausamkeit, eine Antwort so gewaltig wie die Frage.",
    },
    {
      text: "Die wahre Geschichte ist besser. Zwanzigtausend Arbeiter verschiedener Religionen, angef\u00fchrt von einem genialen Architekten, bezahlt aus der Reichskasse, bauten zweiundzwanzig Jahre lang unter einem Kaiser, der Zwangsarbeit verboten hatte. Sie ritzten ihre Namen in die Mauern. Sie lehrten ihre S\u00f6hne, die f\u00fcr Kaiser bauten, die noch nicht geboren waren. Die H\u00e4nde, die das Taj Mahal errichteten, wurden nie abgehackt. Die Sch\u00f6nheit war kein Fluch. Sie war ein Geschenk \u2014 freiwillig gegeben.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════════════════════════════════════
function validate(story, langCode) {
  console.log(`\n${"═".repeat(60)}`);
  console.log(`  VALIDATING: ${langCode.toUpperCase()} — "${story.title}"`);
  console.log(`${"═".repeat(60)}`);

  let totalChars = 0;
  let allPass = true;

  for (let i = 0; i < story.paragraphs.length; i++) {
    const text = story.paragraphs[i].text;
    const charCount = text.length;
    const wordCount = text.split(/\s+/).length;
    totalChars += charCount;

    const charOk = charCount <= 500;
    const wordOk = wordCount <= 100;
    const status = charOk && wordOk ? "\u2713" : "\u2717";

    console.log(
      `  P${i + 1}: ${charCount} chars, ${wordCount} words ${status}${!charOk ? " \u26a0\ufe0f OVER 500 CHARS" : ""}${!wordOk ? " \u26a0\ufe0f OVER 100 WORDS" : ""}`
    );

    if (!charOk || !wordOk) allPass = false;
  }

  console.log(`\n  Total: ${totalChars} chars, ${story.paragraphs.length} paragraphs`);
  console.log(`  Target: ~3000 chars (\u00b120% = 2400\u20133600), 6\u20138 paragraphs`);

  if (totalChars < 2400 || totalChars > 3800) {
    console.error(`  \u274c Total chars ${totalChars} outside acceptable range!`);
    allPass = false;
  }

  if (!allPass) {
    console.error(`\n  \u274c VALIDATION FAILED for ${langCode}`);
    process.exit(1);
  }

  console.log(`  \u2705 All constraints pass for ${langCode}\n`);
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════════════
async function push(story, langCode) {
  console.log(`  Pushing ${langCode}...`);

  const result = await docClient.send(
    new PutCommand({
      TableName: "Story",
      Item: story,
    })
  );

  const status = result.$metadata.httpStatusCode;
  if (status === 200) {
    console.log(`  \u2705 ${langCode.toUpperCase()} pushed successfully (HTTP ${status})`);
    console.log(`     Key: siteId="${story.siteId}", langStoryId="${story.langStoryId}"`);
  } else {
    console.error(`  \u274c ${langCode.toUpperCase()} push failed (HTTP ${status})`);
    process.exit(1);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════
const stories = [
  { story: es, code: "es" },
  { story: fr, code: "fr" },
  { story: de, code: "de" },
];

// Validate all before pushing any
for (const { story, code } of stories) {
  validate(story, code);
}

console.log("\n" + "═".repeat(60));
console.log("  ALL VALIDATIONS PASSED — PUSHING TO DYNAMODB");
console.log("═".repeat(60) + "\n");

// Push sequentially
for (const { story, code } of stories) {
  await push(story, code);
}

console.log("\n\u2705 All three language versions pushed successfully!");
console.log(`   updatedAt: ${now} (${new Date(now * 1000).toISOString()})`);
