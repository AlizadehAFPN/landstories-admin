import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TIMESTAMP = Math.floor(Date.now() / 1000).toString();

// Shared fields (unchanged from English)
const shared = {
  siteId: { S: "wawel-castle" },
  storyId: { S: "smok-wawelski" },
  icon: { S: "\uD83D\uDC09" },
  tier: { S: "A" },
  source: { S: "Wincenty Kad\u0142ubek, Chronica seu originale regum et principum Poloniae (c. 1200); Polish oral tradition" },
  characters: {
    L: [
      { S: "The Wawel Dragon (Smok Wawelski)" },
      { S: "Skuba (Szewczyk Dratewka), cobbler's apprentice" },
      { S: "King Krakus" },
      { S: "The Princess" },
    ],
  },
  era: { S: "Legendary prehistory of Krak\u00f3w" },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: { M: { lng: { N: "19.9345" }, lat: { N: "50.0535" } } },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "gods_monsters" },
  updatedAt: { N: TIMESTAMP },
};

function makeParagraphs(texts) {
  return { L: texts.map((t) => ({ M: { text: { S: t } } })) };
}

// ──────────────────────────────────────────────
// SPANISH (es)
// ──────────────────────────────────────────────
const spanish = {
  ...shared,
  lang: { S: "es" },
  langStoryId: { S: "es#smok-wawelski" },

  title: { S: "El drag\u00f3n de Cracovia" },

  subtitle: { S: "La bestia que ning\u00fan ej\u00e9rcito pudo matar y el aprendiz que la venci\u00f3 con una oveja muerta" },

  excerpt: { S: "Antes de que Cracovia fuera capital de nada, algo viv\u00eda en la cueva bajo la colina de Wawel. Los polacos lo llamaban Smok Wawelski \u2014 el Drag\u00f3n de Wawel." },

  paragraphs: makeParagraphs([
    "Antes de que Cracovia fuera capital de nada, antes de que existiera el castillo de Wawel, algo viv\u00eda en la cueva bajo la colina. Los polacos lo llamaban Smok Wawelski \u2014 el Drag\u00f3n de Wawel. Escamas m\u00e1s duras que el hierro. Una boca capaz de tragarse un caballo entero. Un aliento que convert\u00eda aldeas en ceniza. Al principio se conformaba con el ganado \u2014 vacas, ovejas, lo que pillara. Pero cuando los animales se acabaron, el drag\u00f3n exigi\u00f3 algo peor: mujeres j\u00f3venes, abandonadas en la boca de la cueva como ofrendas a un dios que solo conoc\u00eda el hambre.",

    "El rey Krakus \u2014 el hombre que, seg\u00fan la leyenda, fund\u00f3 la ciudad y le dio su nombre \u2014 estaba desesperado. Cada semana, otra joven era conducida a la cueva al atardecer. A la ma\u00f1ana siguiente, solo quedaban tierra quemada y silencio. As\u00ed que el rey hizo una oferta: quien mate al drag\u00f3n se lleva la mitad del reino y la mano de mi hija. Vinieron guerreros de toda Europa \u2014 espadachines alemanes, caballeros franceses, mercenarios h\u00fangaros. Uno tras otro entraron en esa cueva con sus mejores armas. Ninguno volvi\u00f3 a salir.",

    "Entonces apareci\u00f3 un aprendiz de zapatero llamado Skuba. No era soldado \u2014 se ganaba la vida haciendo zapatos. Y su plan sonaba rid\u00edculo: pidi\u00f3 al rey una oveja muerta, un mont\u00f3n de azufre y un poco de hilo resistente. Toda la corte se rio. \u00bfUn zapatero contra un drag\u00f3n? Pero Krakus hab\u00eda visto fracasar a todos los campeones de Europa, as\u00ed que pens\u00f3: que lo intente el chico.",

    "Skuba trabaj\u00f3 toda la noche. Vaci\u00f3 la oveja por dentro, la rellen\u00f3 de azufre hasta los topes y la cosi\u00f3 con su hilo de zapatero \u2014 puntadas tan apretadas que cualquiera habr\u00eda jurado que el animal segu\u00eda respirando. Justo antes del amanecer, coloc\u00f3 la oveja falsa en la entrada de la cueva. Se apart\u00f3 entre las rocas. Y esper\u00f3.",

    "El drag\u00f3n sali\u00f3 con las primeras luces. Cabeza balance\u00e1ndose, fosas nasales bien abiertas. Vio la oveja, la atrap\u00f3 de un bocado y se la trag\u00f3 entera. Durante un segundo no pas\u00f3 nada. Entonces el azufre hizo contacto con el fuego que el drag\u00f3n llevaba dentro. La bestia solt\u00f3 un rugido que sacudi\u00f3 la colina de Wawel y espant\u00f3 a todos los p\u00e1jaros del V\u00edstula \u2014 el r\u00edo m\u00e1s grande de Polonia. El drag\u00f3n ard\u00eda por dentro, y solo pod\u00eda hacer una cosa: correr al agua y beber.",

    "Bebi\u00f3. Y bebi\u00f3. Y sigui\u00f3 bebiendo. Trag\u00f3 tanta agua que el nivel del V\u00edstula baj\u00f3 a lo largo de sus orillas. Pero el azufre tiene un problema: el agua no lo apaga. Cuanto m\u00e1s beb\u00eda, peor se pon\u00eda. La barriga se le fue hinchando hasta que las escamas empezaron a agrietarse. Y all\u00ed mismo, en la orilla del r\u00edo, el Drag\u00f3n de Wawel revent\u00f3. Escamas y huesos por todas partes. El monstruo que ning\u00fan ej\u00e9rcito pudo matar lo destruyeron una oveja muerta y un poco de azufre.",

    "Dicen que a la tercera va la vencida. Pero a Skuba le bast\u00f3 con la primera \u2014 una oveja y una idea que nadie vio venir. Cracovia qued\u00f3 libre. El aprendiz se cas\u00f3 con la princesa, no por ser el m\u00e1s fuerte ni el m\u00e1s valiente, sino por ser el m\u00e1s listo de todo el reino.",

    "Hoy, una estatua de bronce del drag\u00f3n se alza al pie de la colina de Wawel \u2014 y lo mejor: escupe fuego de verdad cada pocos minutos mientras los turistas se hacen selfis. La cueva del drag\u00f3n, Smocza Jama, sigue abierta. Baja por una escalera de caracol hasta la oscuridad fresca, y la gente del lugar te jurar\u00e1 que en las noches tranquilas todav\u00eda se nota un rastro de azufre en el aire.",
  ]),

  moralOrLesson: { S: "La astucia vence donde la fuerza bruta fracasa \u2014 el arma m\u00e1s afilada es el ingenio." },
};

// ──────────────────────────────────────────────
// FRENCH (fr)
// ──────────────────────────────────────────────
const french = {
  ...shared,
  lang: { S: "fr" },
  langStoryId: { S: "fr#smok-wawelski" },

  title: { S: "Le Dragon du Wawel" },

  subtitle: { S: "La b\u00eate qu\u2019aucune arm\u00e9e n\u2019a pu vaincre \u2014 tu\u00e9e par un apprenti cordonnier et un mouton" },

  excerpt: { S: "Bien avant que Cracovie ne devienne une capitale, quelque chose vivait dans la grotte sous la colline. Les Polonais l\u2019appelaient Smok Wawelski \u2014 le Dragon du Wawel." },

  paragraphs: makeParagraphs([
    "Bien avant que Cracovie ne devienne une capitale, avant m\u00eame qu\u2019on pose la premi\u00e8re pierre du ch\u00e2teau, quelque chose vivait dans la grotte sous la colline du Wawel. Les Polonais l\u2019appelaient Smok Wawelski \u2014 le Dragon du Wawel. \u00c9cailles plus dures que le fer. Gueule capable d\u2019engloutir un cheval entier. Souffle qui r\u00e9duisait les villages en cendres. Au d\u00e9but, il se contentait du b\u00e9tail. Mais quand les b\u00eates vinrent \u00e0 manquer, le dragon exigea pire : des jeunes femmes, abandonn\u00e9es devant la grotte comme offrandes \u00e0 un dieu qui ne connaissait que la faim.",

    "Le roi Krakus \u2014 celui qui, d\u2019apr\u00e8s la l\u00e9gende, fonda la ville et lui donna son nom \u2014 \u00e9tait au d\u00e9sespoir. Chaque semaine, une fille \u00e9tait conduite \u00e0 la grotte au coucher du soleil. Au matin, il ne restait que terre br\u00fbl\u00e9e et silence. Alors il lan\u00e7a un d\u00e9fi : tuez le dragon, et vous aurez la moiti\u00e9 de mon royaume et la main de ma fille. Des guerriers accoururent de toute l\u2019Europe \u2014 \u00e9p\u00e9istes allemands, chevaliers fran\u00e7ais, mercenaires hongrois. Un par un, ils entr\u00e8rent dans la grotte avec leurs meilleures armes. Aucun n\u2019en ressortit.",

    "C\u2019est alors qu\u2019un apprenti cordonnier du nom de Skuba se pr\u00e9senta. Pas un soldat \u2014 il gagnait sa vie en fabriquant des chaussures. Et son plan avait l\u2019air compl\u00e8tement absurde : il demanda au roi un mouton mort, un tas de soufre et du fil solide. Toute la cour \u00e9clata de rire. Un cordonnier contre un dragon ? Mais Krakus avait vu \u00e9chouer tous les champions d\u2019Europe. Alors il se dit : laissons le gamin tenter sa chance.",

    "Skuba travailla toute la nuit. Il vida le mouton, le bourra de soufre et le recousit avec son fil de cordonnier \u2014 des points si serr\u00e9s qu\u2019on aurait jur\u00e9 que l\u2019animal respirait encore. Juste avant l\u2019aube, il d\u00e9posa le faux mouton devant l\u2019entr\u00e9e de la grotte. Puis il recula dans l\u2019ombre. Et attendit.",

    "Le dragon sortit aux premi\u00e8res lueurs. T\u00eate balan\u00e7ante, narines grandes ouvertes. Il rep\u00e9ra le mouton, le happa d\u2019un coup de m\u00e2choire et l\u2019avala tout rond. Pendant une seconde \u2014 rien. Puis le soufre rencontra le feu qui br\u00fblait dans les entrailles de la b\u00eate. Le dragon poussa un rugissement qui fit trembler la colline du Wawel et dispersa tous les oiseaux le long de la Vistule \u2014 le plus grand fleuve de Pologne. Il br\u00fblait de l\u2019int\u00e9rieur, et il n\u2019avait plus qu\u2019une option : courir vers le fleuve et boire.",

    "Il but. Encore. Et encore. Le dragon avala tant d\u2019eau que le niveau de la Vistule baissa \u00e0 vue d\u2019\u0153il. Mais le soufre a un d\u00e9faut que la b\u00eate ignorait : l\u2019eau ne l\u2019\u00e9teint pas. Plus il buvait, pire c\u2019\u00e9tait. Son ventre gonfla jusqu\u2019\u00e0 ce que les \u00e9cailles commencent \u00e0 se fissurer. Et l\u00e0, sur la berge, le Dragon du Wawel explosa. \u00c9cailles et os partout. Le monstre qu\u2019aucune arm\u00e9e n\u2019avait pu vaincre \u2014 d\u00e9truit par un mouton mort et une poign\u00e9e de soufre.",

    "On dit bien jamais deux sans trois. Mais Skuba n\u2019a eu besoin ni de deux ni de trois \u2014 juste d\u2019un mouton et d\u2019une id\u00e9e que personne n\u2019avait vue venir. Cracovie \u00e9tait libre. L\u2019apprenti \u00e9pousa la princesse, non pour sa force ni son courage, mais parce qu\u2019il avait \u00e9t\u00e9 tout simplement le plus malin.",

    "Aujourd\u2019hui, une statue de bronze du dragon se dresse au pied du Wawel \u2014 et le meilleur dans tout \u00e7a, c\u2019est qu\u2019elle crache du vrai feu toutes les quelques minutes pendant que les touristes prennent des selfies. La grotte du dragon, Smocza Jama, est toujours ouverte. On descend un escalier en colima\u00e7on dans la fra\u00eecheur de l\u2019obscurit\u00e9, et les gens du coin vous jureront que certains soirs, on sent encore une trace de soufre dans l\u2019air.",
  ]),

  moralOrLesson: { S: "La ruse triomphe l\u00e0 o\u00f9 la force \u00e9choue \u2014 l\u2019arme la plus redoutable est l\u2019intelligence." },
};

// ──────────────────────────────────────────────
// GERMAN (de)
// ──────────────────────────────────────────────
const german = {
  ...shared,
  lang: { S: "de" },
  langStoryId: { S: "de#smok-wawelski" },

  title: { S: "Der Drache vom Wawel" },

  subtitle: { S: "Die Bestie, die keine Armee besiegen konnte \u2014 und der Lehrling, der es mit einem Schaf schaffte" },

  excerpt: { S: "Bevor Krakau eine Hauptstadt war, bevor der erste Stein der Wawel-Burg gelegt wurde, lebte etwas in der H\u00f6hle unter dem H\u00fcgel. Die Polen nannten es Smok Wawelski \u2014 den Wawel-Drachen." },

  paragraphs: makeParagraphs([
    "Bevor Krakau eine Hauptstadt war, bevor der erste Stein der Wawel-Burg gelegt wurde, lebte etwas in der H\u00f6hle unter dem H\u00fcgel. Die Polen nannten es Smok Wawelski \u2014 den Wawel-Drachen. Schuppen h\u00e4rter als Eisen. Ein Maul, gro\u00df genug, ein ganzes Pferd zu verschlingen. Atem, der D\u00f6rfer in Asche verwandelte. Anfangs begn\u00fcgte er sich mit Vieh \u2014 Rinder, Schafe, alles, was er kriegen konnte. Doch als die Tiere ausgingen, verlangte der Drache etwas Schlimmeres: junge Frauen, vor dem H\u00f6hleneingang abgelegt wie Opfergaben an einen Gott, der nur Hunger kannte.",

    "K\u00f6nig Krakus \u2014 der Mann, der der Legende nach die Stadt gr\u00fcndete und ihr seinen Namen gab \u2014 war verzweifelt. Jede Woche wurde eine Tochter bei Sonnenuntergang zur H\u00f6hle gef\u00fchrt. Am Morgen blieb nur verbrannte Erde und Stille. Also machte der K\u00f6nig ein Angebot: Wer den Drachen t\u00f6tet, bekommt die H\u00e4lfte meines Reichs und die Hand meiner Tochter. Krieger kamen von \u00fcberall \u2014 deutsche Schwertk\u00e4mpfer, franz\u00f6sische Ritter, ungarische S\u00f6ldner. Einer nach dem anderen marschierte in die H\u00f6hle. Keiner kam zur\u00fcck.",

    "Dann trat ein Schusterlehrling namens Skuba vor. Kein Soldat \u2014 er verdiente sein Brot mit Schuhen. Und sein Plan klang v\u00f6llig absurd: Er bat den K\u00f6nig um ein totes Schaf, einen Haufen Schwefel und etwas festes Garn. Der ganze Hof lachte. Ein Schuster gegen einen Drachen? Aber Krakus hatte jeden Champion Europas scheitern sehen. Also dachte er sich: Soll der Junge es halt versuchen.",

    "Skuba arbeitete die ganze Nacht durch. Er h\u00f6hlte das Schaf aus, stopfte es bis zum Rand mit Schwefel und n\u00e4hte es mit seinem Schustergarn zu \u2014 so saubere Stiche, dass man geschworen h\u00e4tte, das Tier atme noch. Kurz vor Morgengrauen legte er das falsche Schaf direkt vor den H\u00f6hleneingang. Dann trat er zur\u00fcck ins Dunkel. Und wartete.",

    "Der Drache kam bei Tagesanbruch heraus. Kopf schwingend, N\u00fcstern weit aufgerissen. Er ersp\u00e4hte das Schaf, schnappte es mit einem Biss und verschlang es im Ganzen. F\u00fcr eine Sekunde \u2014 nichts. Dann traf der Schwefel auf das Feuer im Bauch der Bestie. Der Drache stie\u00df ein Br\u00fcllen aus, das den Wawel-H\u00fcgel erzittern lie\u00df und jeden Vogel an der Weichsel \u2014 Polens gr\u00f6\u00dfter Fluss \u2014 in den Himmel jagte. Das Tier brannte von innen, und es gab nur eins, was es tun konnte: zum Fluss rennen und trinken.",

    "Er trank. Und trank. Und trank. Der Drache schluckte so viel Flusswasser, dass der Pegel der Weichsel sichtbar sank. Doch Schwefel hat eine Eigenschaft: Wasser l\u00f6scht ihn nicht. Je mehr der Drache trank, desto schlimmer wurde es. Sein Bauch schwoll an, bis die Schuppen aufzuplatzen begannen. Und dann, direkt am Flussufer, explodierte der Wawel-Drache. Schuppen und Knochen \u00fcberall. Das Monster, das keine Armee besiegen konnte \u2014 vernichtet von einem toten Schaf und einer Handvoll Schwefel.",

    "Man sagt, aller guten Dinge sind drei. Aber Skuba brauchte keine drei Versuche \u2014 ihm reichte einer. Ein totes Schaf und eine Idee, auf die kein Ritter gekommen war. Krakau war frei. Der Lehrling heiratete die Prinzessin \u2014 nicht weil er der St\u00e4rkste oder Tapferste war, sondern weil er der Kl\u00fcgste im ganzen K\u00f6nigreich war.",

    "Heute steht eine Bronzestatue des Drachen am Fu\u00df des Wawel-H\u00fcgels \u2014 und das Beste daran: Sie spuckt alle paar Minuten echtes Feuer, w\u00e4hrend Touristen Selfies machen. Die Drachenh\u00f6hle, Smocza Jama, ist immer noch ge\u00f6ffnet. Man steigt eine Wendeltreppe in die k\u00fchle Dunkelheit hinab, und die Einheimischen schw\u00f6ren, dass man an stillen Abenden noch einen Hauch von Schwefel in der Luft riechen kann.",
  ]),

  moralOrLesson: { S: "Klugheit besiegt, woran rohe Kraft scheitert \u2014 die sch\u00e4rfste Waffe ist der Verstand." },
};

// ──────────────────────────────────────────────
// PUSH TO DYNAMODB
// ──────────────────────────────────────────────

const items = [
  { label: "Spanish (es)", item: spanish },
  { label: "French (fr)", item: french },
  { label: "German (de)", item: german },
];

for (const { label, item } of items) {
  console.log(`\nPushing ${label}...`);
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });
    const result = await client.send(cmd);
    console.log(
      `  ${label} pushed successfully. HTTP ${result.$metadata.httpStatusCode}`
    );
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ${label} record already exists. Overwriting...`);
      const cmd2 = new PutItemCommand({
        TableName: "Story",
        Item: item,
      });
      const result2 = await client.send(cmd2);
      console.log(
        `  ${label} overwritten successfully. HTTP ${result2.$metadata.httpStatusCode}`
      );
    } else {
      console.error(`  FAILED for ${label}:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\nAll three language versions pushed successfully.");
