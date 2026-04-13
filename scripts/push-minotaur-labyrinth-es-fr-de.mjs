import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const base = {
  siteId: "knossos",
  storyId: "minotaur-labyrinth",
  icon: "\u{1F402}",
  storyCategory: "ghosts_curses",
  era: "Mythological Era (Minoan period)",
  tier: "S",
  isFree: true,
  hasAudio: false,
  coordinates: { lat: 35.2981, lng: 25.1631 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 3,
  source: "Apollodorus\u2019s Bibliotheca, Ovid\u2019s Metamorphoses, Plutarch\u2019s Life of Theseus",
  updatedAt: now,
  disabled: false,
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// SPANISH
// Proverb: "Dios castiga sin palo ni piedra" (God punishes without
// stick or stone) \u2014 subverted: what came was worse than any stone.
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

const es = {
  ...base,
  lang: "es",
  langStoryId: "es#minotaur-labyrinth",
  title: "La bestia del laberinto",
  subtitle: "El monstruo que naci\u00f3 de una promesa rota",
  excerpt: "Cuando Minos quiso el trono de Creta, la ambici\u00f3n no le bastaba. Necesitaba una se\u00f1al divina, algo que cerrara bocas y doblara rodillas.",
  moralOrLesson: "No se puede huir de las consecuencias de una promesa rota. Minos intent\u00f3 enga\u00f1ar a un dios y cre\u00f3 un monstruo que devor\u00f3 el honor de su reino \u2014 y a los hijos de otros.",
  characters: [
    "El Minotauro (Asteri\u00f3n)",
    "El rey Minos",
    "La reina Pas\u00edfae",
    "Poseid\u00f3n",
    "D\u00e9dalo",
    "El Toro Blanco",
  ],
  paragraphs: [
    {
      text: "Cuando Minos quiso el trono de Creta, la ambici\u00f3n no le bastaba. Necesitaba una se\u00f1al divina, algo que cerrara bocas y doblara rodillas. As\u00ed que le rez\u00f3 a Poseid\u00f3n, dios del mar, y le propuso un trato: m\u00e1ndame una se\u00f1al y te sacrifico lo que me env\u00edes. Poseid\u00f3n respondi\u00f3. Del oleaje surgi\u00f3 un toro blanco tan perfecto que parec\u00eda esculpido por los propios dioses. Los cretenses lo vieron salir del agua y no les qued\u00f3 duda: ese hombre ten\u00eda el cielo de su lado.",
    },
    {
      text: "Pero Minos mir\u00f3 al toro y no pudo. Era demasiado hermoso para matarlo. As\u00ed que hizo lo que hacen los que se creen m\u00e1s listos que todos: cambi\u00f3 las reglas. Sacrific\u00f3 un toro cualquiera y se qued\u00f3 con el divino. Total, \u00bfqu\u00e9 iba a saber Poseid\u00f3n? Dicen que Dios castiga sin palo ni piedra \u2014 pero lo que vino fue peor que cualquier piedra. Poseid\u00f3n no mand\u00f3 tormentas ni plagas. Mand\u00f3 locura: una maldici\u00f3n sobre Pas\u00edfae, la esposa de Minos, que torci\u00f3 su mente hasta convertirla en una obsesi\u00f3n enfermiza por el toro blanco.",
    },
    {
      text: "Desesperada y fuera de s\u00ed, Pas\u00edfae acudi\u00f3 a la \u00fanica persona capaz de ayudarla: D\u00e9dalo, un inventor genial de Atenas que viv\u00eda en la corte cretense. Lo que construy\u00f3 para ella fue perturbador \u2014 una vaca de madera hueca, cubierta con piel aut\u00e9ntica, tan realista que enga\u00f1\u00f3 al propio animal. De ese encuentro naci\u00f3 algo imposible: una criatura con cuerpo humano y cabeza de toro. Lo llamaron el Minotauro. Su verdadero nombre era Asteri\u00f3n \u2014 \u00abel de las estrellas\u00bb. Hasta los monstruos reciben nombres hermosos.",
    },
    {
      text: "Pas\u00edfae intent\u00f3 criarlo como a cualquier hijo. Durante un tiempo, casi funcion\u00f3. Pero a medida que crec\u00eda, tambi\u00e9n crec\u00eda su hambre \u2014 y no era hambre de pan. El Minotauro devoraba carne humana. Cuando empezaron las muertes, Minos se enfrent\u00f3 a la pesadilla que \u00e9l mismo hab\u00eda creado. No pod\u00eda matar a la criatura \u2014 era el hijo de su esposa. Tampoco pod\u00eda dejarla suelta. As\u00ed que volvi\u00f3 a D\u00e9dalo con el encargo m\u00e1s dif\u00edcil de su vida: construir una jaula de la que nadie pudiera escapar jam\u00e1s.",
    },
    {
      text: "D\u00e9dalo no construy\u00f3 una jaula. Construy\u00f3 algo peor. Bajo el palacio de Cnosos dise\u00f1\u00f3 el Laberinto \u2014 un entramado de pasillos tan enrevesado que quien entraba no volv\u00eda a ver la luz. Escaleras que bajaban a la nada y sub\u00edan de vuelta al mismo sitio. Callejones sin salida por todas partes. Y en el centro, solo en la oscuridad, el Minotauro esperaba.",
    },
    {
      text: "Su alimento llegaba desde Atenas. Cuando el hijo de Minos, Androgeo, fue asesinado all\u00ed \u2014 metido en l\u00edos pol\u00edticos, probablemente eliminado por envidia \u2014, Minos llev\u00f3 su flota y aplast\u00f3 a los atenienses. Las condiciones de paz fueron espantosas: cada nueve a\u00f1os, Atenas deb\u00eda enviar siete j\u00f3venes y siete doncellas al Laberinto. Sin armas, sin mapa, sin salida. Solo el Minotauro en la oscuridad.",
    },
    {
      text: "Durante generaciones, los padres atenienses vivieron con el peor miedo que puedas imaginar: que su hijo fuera uno de los catorce condenados a morir en el laberinto. Todo porque un rey en una isla lejana rompi\u00f3 su promesa a un dios. Las ruinas de Cnosos siguen en pie \u2014 cientos de habitaciones, pasillos serpenteantes, callejones sin salida. Unos dicen que el palacio inspir\u00f3 la leyenda. Otros, que la leyenda vino primero. Da igual. El mensaje lleva tres mil a\u00f1os intacto: cuando haces un trato con los dioses, lo cumples.",
    },
  ],
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// FRENCH
// Proverb: "\u00c0 malin, malin et demi" (To a cunning one, one and a
// half times as cunning) \u2014 subverted: when you try to outsmart a
// god, you always lose.
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#minotaur-labyrinth",
  title: "La B\u00eate du labyrinthe",
  subtitle: "Le monstre au c\u0153ur du labyrinthe",
  excerpt: "Quand Minos a voulu le tr\u00f4ne de Cr\u00e8te, il savait qu\u2019il lui fallait plus que de l\u2019ambition \u2014 il lui fallait un miracle.",
  moralOrLesson: "On n\u2019\u00e9chappe pas aux cons\u00e9quences d\u2019une promesse trahie. Minos a voulu tromper un dieu et a engendr\u00e9 un monstre qui a d\u00e9vor\u00e9 l\u2019honneur de son royaume \u2014 et les enfants des autres.",
  characters: [
    "Le Minotaure (Ast\u00e9rion)",
    "Le roi Minos",
    "La reine Pasipha\u00e9",
    "Pos\u00e9idon",
    "D\u00e9dale",
    "Le Taureau Blanc",
  ],
  paragraphs: [
    {
      text: "Quand Minos a voulu le tr\u00f4ne de Cr\u00e8te, il savait qu\u2019il lui fallait plus que de l\u2019ambition \u2014 il lui fallait un miracle. Il a pri\u00e9 Pos\u00e9idon, dieu de la mer, et propos\u00e9 un march\u00e9 simple\u00a0: envoie-moi un signe, et je te sacrifie ce que tu m\u2019enverras. La r\u00e9ponse est venue des vagues. Un taureau blanc en est sorti, si parfait qu\u2019on aurait dit une sculpture vivante. Les Cr\u00e9tois ont regard\u00e9 cet animal marcher sur le sable mouill\u00e9, et tout le monde a compris\u00a0: Minos \u00e9tait l\u2019\u00e9lu des dieux.",
    },
    {
      text: "Mais Minos a regard\u00e9 ce taureau et n\u2019a pas pu s\u2019en s\u00e9parer. Trop beau pour l\u2019autel. Alors il a fait ce que font les malins \u2014 il a trich\u00e9. Un taureau ordinaire sacrifi\u00e9, le divin gard\u00e9 pour lui. Le proverbe dit vrai\u00a0: \u00e0 malin, malin et demi. Et quand on essaie de rouler un dieu, la facture arrive toujours. Pos\u00e9idon n\u2019a envoy\u00e9 ni temp\u00eate ni fl\u00e9au. Il a envoy\u00e9 la folie \u2014 une mal\u00e9diction sur Pasipha\u00e9, la femme de Minos, qui a transform\u00e9 son esprit en une obsession monstrueuse pour le taureau blanc.",
    },
    {
      text: "Hors d\u2019elle, Pasipha\u00e9 s\u2019est tourn\u00e9e vers le seul homme capable de l\u2019aider\u00a0: D\u00e9dale, un inventeur de g\u00e9nie venu d\u2019Ath\u00e8nes qui vivait \u00e0 la cour cr\u00e9toise. Ce qu\u2019il a construit pour elle reste difficile \u00e0 raconter \u2014 une vache en bois creuse, couverte d\u2019une vraie peau, assez r\u00e9aliste pour tromper l\u2019animal. De cette union est n\u00e9e une cr\u00e9ature impossible\u00a0: un corps humain surmont\u00e9 d\u2019une t\u00eate de taureau. On l\u2019a appel\u00e9 le Minotaure. Son vrai nom \u00e9tait Ast\u00e9rion \u2014 \u00ab\u00a0celui des \u00e9toiles\u00a0\u00bb. M\u00eame les monstres ont de beaux noms.",
    },
    {
      text: "Pasipha\u00e9 a essay\u00e9 de l\u2019\u00e9lever comme n\u2019importe quel enfant. Pendant un temps, \u00e7a a presque march\u00e9. Mais en grandissant, sa faim a chang\u00e9 de nature \u2014 et ce n\u2019\u00e9tait pas du pain qu\u2019il r\u00e9clamait. Le Minotaure d\u00e9vorait de la chair humaine. Quand les premiers morts sont apparus, Minos a fait face au cauchemar qu\u2019il avait lui-m\u00eame cr\u00e9\u00e9. Impossible de tuer la cr\u00e9ature \u2014 c\u2019\u00e9tait le fils de sa femme. Impossible de la laisser en libert\u00e9. Il est retourn\u00e9 voir D\u00e9dale avec la mission la plus terrible de sa carri\u00e8re.",
    },
    {
      text: "Construis-moi une prison dont personne ne sortira jamais. D\u00e9dale n\u2019a pas construit une prison. Il a construit quelque chose de pire. Sous le palais de Cnossos, il a con\u00e7u le Labyrinthe \u2014 un d\u00e9dale de couloirs si tortueux que quiconque y entrait ne retrouvait jamais la sortie. Des escaliers qui descendaient dans le noir pour remonter aussit\u00f4t. Des impasses partout. Et tout au centre, seul dans l\u2019obscurit\u00e9, le Minotaure attendait qu\u2019on lui apporte \u00e0 manger.",
    },
    {
      text: "Sa nourriture venait d\u2019Ath\u00e8nes. Quand le fils de Minos, Androg\u00e9e, a \u00e9t\u00e9 tu\u00e9 l\u00e0-bas \u2014 m\u00eal\u00e9 \u00e0 des intrigues politiques, probablement assassin\u00e9 par jalousie \u2014, Minos a envoy\u00e9 sa flotte et \u00e9cras\u00e9 les Ath\u00e9niens. Ses conditions de paix \u00e9taient effroyables\u00a0: tous les neuf ans, Ath\u00e8nes devait envoyer sept jeunes hommes et sept jeunes femmes dans le Labyrinthe. Sans armes, sans plan, sans issue. Rien que le Minotaure dans le noir.",
    },
    {
      text: "Pendant des g\u00e9n\u00e9rations, les parents ath\u00e9niens ont v\u00e9cu avec la pire angoisse qui soit\u00a0: que leur enfant fasse partie des quatorze envoy\u00e9s mourir dans le labyrinthe. Tout \u00e7a parce qu\u2019un roi, sur une \u00eele lointaine, avait trahi sa parole. Les ruines de Cnossos sont toujours l\u00e0 \u2014 des centaines de salles, des couloirs sinueux, des culs-de-sac partout. Certains disent que le palais a inspir\u00e9 la l\u00e9gende. D\u2019autres, que la l\u00e9gende est venue en premier. Peu importe. Le message tient depuis trois mille ans\u00a0: quand on passe un march\u00e9 avec les dieux, on le respecte.",
    },
  ],
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// GERMAN
// Proverb: "Gottes M\u00fchlen mahlen langsam, aber fein" (God's mills
// grind slowly, but finely) \u2014 subverted: what Poseidon devised was
// crueler than any natural disaster.
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

const de = {
  ...base,
  lang: "de",
  langStoryId: "de#minotaur-labyrinth",
  title: "Die Bestie im Labyrinth",
  subtitle: "Das Ungeheuer, das ein K\u00f6nig erschuf",
  excerpt: "Als Minos den Thron von Kreta wollte, reichte Ehrgeiz allein nicht aus. Er brauchte ein Zeichen von oben \u2014 etwas, das jeden Zweifler zum Schweigen bringt.",
  moralOrLesson: "Den Folgen eines gebrochenen Versprechens entkommt niemand. Minos versuchte, einen Gott zu betr\u00fcgen, und schuf ein Ungeheuer, das die Ehre seines Reiches verschlang \u2014 und die Kinder anderer.",
  characters: [
    "Der Minotaurus (Asterion)",
    "K\u00f6nig Minos",
    "K\u00f6nigin Pasipha\u00eb",
    "Poseidon",
    "Daedalus",
    "Der Wei\u00dfe Stier",
  ],
  paragraphs: [
    {
      text: "Als Minos den Thron von Kreta wollte, reichte Ehrgeiz allein nicht aus. Er brauchte ein Zeichen von oben \u2014 etwas, das jeden Zweifler zum Schweigen bringt. Also betete er zu Poseidon, dem Gott des Meeres, und schlug einen Handel vor: Schick mir ein Zeichen, und ich opfere dir, was du schickst. Poseidon antwortete. Aus den Wellen stieg ein wei\u00dfer Stier, so vollkommen, dass er nicht real aussah. Die Kreter sahen ihn aus dem Meer steigen und wussten: Dieser Mann ist von den G\u00f6ttern auserw\u00e4hlt.",
    },
    {
      text: "Aber Minos schaute den Stier an und konnte es nicht tun. Zu sch\u00f6n zum Schlachten. Also tat er, was Leute tun, die sich f\u00fcr schlauer halten als alle anderen: Er tauschte ihn aus. Einen gew\u00f6hnlichen Stier geopfert, den g\u00f6ttlichen behalten. Poseidon w\u00fcrde es schon nicht merken. Fataler Irrtum. Gottes M\u00fchlen mahlen langsam, aber fein \u2014 und was Poseidon sich ausdachte, war grausamer als jede Naturkatastrophe. Der Fluch traf Pasipha\u00eb, Minos\u2019 Frau, und verwandelte ihren Verstand in eine krankhafte Besessenheit f\u00fcr den wei\u00dfen Stier.",
    },
    {
      text: "Verzweifelt wandte sich Pasipha\u00eb an den Einzigen, der klug genug war zu helfen: Daedalus, ein genialer Erfinder aus Athen am kretischen Hof. Was er f\u00fcr sie baute, ist schwer zu erz\u00e4hlen \u2014 eine hohle Holzkuh, \u00fcberzogen mit echter Haut, so lebensecht, dass sie das Tier t\u00e4uschte. Aus dieser Begegnung wurde etwas Unm\u00f6gliches geboren: ein Wesen mit menschlichem K\u00f6rper und dem Kopf eines Stiers. Man nannte ihn den Minotaurus. Sein wahrer Name war Asterion \u2014 \u201eder Sternengleiche\u201c. Selbst Monster bekommen sch\u00f6ne Namen.",
    },
    {
      text: "Pasipha\u00eb versuchte, ihn gro\u00dfzuziehen wie jedes andere Kind. Eine Weile ging das fast gut. Aber je gr\u00f6\u00dfer der Minotaurus wurde, desto gr\u00f6\u00dfer wurde sein Hunger \u2014 und es war kein Hunger nach Brot. Er verlangte nach Menschenfleisch. Als die ersten Toten auftauchten, stand Minos vor dem Albtraum, den er selbst geschaffen hatte. Er konnte das Wesen nicht t\u00f6ten \u2014 es war der Sohn seiner Frau. Aber er konnte es auch nicht frei herumlaufen lassen.",
    },
    {
      text: "Also ging er zur\u00fcck zu Daedalus und gab ihm den schlimmsten Auftrag seines Lebens: Bau mir ein Gef\u00e4ngnis, aus dem niemand je entkommen kann. Daedalus baute kein Gef\u00e4ngnis. Er baute etwas Schlimmeres. Unter dem Palast von Knossos entwarf er das Labyrinth \u2014 ein Gewirr aus G\u00e4ngen, so verschlungen, dass jeder, der hineinging, nie wieder herausfand. Treppen, die ins Nichts f\u00fchrten. Sackgassen \u00fcberall. Und ganz im Zentrum, allein im Dunkeln, wartete der Minotaurus.",
    },
    {
      text: "Sein Futter kam aus Athen. Als Minos\u2019 Sohn Androgeos dort get\u00f6tet wurde \u2014 verstrickt in politische Machtk\u00e4mpfe, vermutlich aus Eifersucht ermordet \u2014, segelte Minos mit seiner Flotte nach Athen und zerschmetterte die Stadt. Seine Friedensbedingungen waren entsetzlich: Alle neun Jahre musste Athen sieben junge M\u00e4nner und sieben junge Frauen ins Labyrinth schicken. Ohne Waffen, ohne Karte, ohne Ausweg. Nur der Minotaurus in der Dunkelheit.",
    },
    {
      text: "Generationen von Athener Eltern lebten mit der schlimmsten Angst: dass ihr Kind zu den Vierzehn geh\u00f6ren w\u00fcrde, die im Labyrinth sterben. Alles, weil ein K\u00f6nig auf einer fernen Insel sein Wort brach. Die Ruinen von Knossos stehen noch \u2014 Hunderte von R\u00e4umen, verwinkelte G\u00e4nge, Sackgassen. Manche sagen, der Palast inspirierte die Legende. Andere meinen, die Legende war zuerst da. Egal. Die Botschaft \u00fcberlebt seit dreitausend Jahren: Wenn du einen Handel mit den G\u00f6ttern machst, dann halte dich daran.",
    },
  ],
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// PUSH TO DYNAMODB
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

async function pushStory(story) {
  const label = `${story.lang} \u2014 ${story.title}`;
  console.log(`\nPushing: ${label}`);
  console.log(`  siteId: ${story.siteId}`);
  console.log(`  langStoryId: ${story.langStoryId}`);
  console.log(`  paragraphs: ${story.paragraphs.length}`);

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
        console.error(`  FAILED: ${story.lang} \u2014 ${err.message}`);
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
