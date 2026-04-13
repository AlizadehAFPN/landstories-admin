const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

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

// ─── Shared fields (unchanged from English) ───────────────────────
const base = {
  siteId: "auschwitz-birkenau",
  storyId: "sonderkommando-uprising",
  coordinates: { lat: 50.034, lng: 19.1775 },
  disabled: false,
  hasAudio: false,
  icon: "\uD83D\uDD25",
  image: "",
  isFree: true,
  readingTimeMinutes: 3,
  source:
    "Auschwitz-Birkenau Memorial archives; Sonderkommando testimonies; Yad Vashem documentation",
  storyCategory: "crowns_conquests",
  thumbnail: "",
  tier: "A",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
// SPANISH (es) — La revuelta de los condenados
// Proverb: "No hay mal que cien a\u00f1os dure" — subverted in closing
// Register: modern storytelling, skilled narrator, popular nonfiction
// ═══════════════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#sonderkommando-uprising",
  era: "Segunda Guerra Mundial (7 de octubre de 1944)",

  title: "La revuelta de los condenados",
  subtitle:
    "La rebeli\u00f3n de quienes ya estaban muertos \u2014 y las cuatro mujeres que la hicieron posible",

  excerpt:
    "En Auschwitz hab\u00eda un grupo de presos con un destino peor que la muerte. Los llamaban Sonderkommando. Jud\u00edos a los que las SS obligaban a hacer lo impensable: llevar a otros jud\u00edos a las c\u00e1maras de gas, sacar los cad\u00e1veres, arrancarles los dientes de oro y meter los restos en los hornos crematorios. Las SS los manten\u00edan alimentados y apartados. No por compasi\u00f3n: los necesitaban con fuerzas para que la m\u00e1quina del exterminio no parara. Todos lo sab\u00edan. Cuando hubieran visto demasiado, ser\u00edan los siguientes.",

  moralOrLesson:
    "Incluso cuando la muerte es segura, la decisi\u00f3n de resistir \u2014 de pelear, de negarse a callar, de negarle a tu verdugo la victoria final de tu silencio \u2014 es el acto supremo de libertad.",

  characters: [
    "Ala Gertner",
    "Roza Robota",
    "Regina Safirsztajn",
    "Estera Wajcblum",
    "Los prisioneros del Sonderkommando",
  ],

  paragraphs: [
    {
      text: "En Auschwitz hab\u00eda un grupo de presos con un destino peor que la muerte. Los llamaban Sonderkommando. Jud\u00edos a los que las SS obligaban a hacer lo impensable: llevar a otros jud\u00edos a las c\u00e1maras de gas, sacar los cad\u00e1veres, arrancarles los dientes de oro y meter los restos en los hornos crematorios. Las SS los manten\u00edan alimentados y apartados. No por compasi\u00f3n: los necesitaban con fuerzas para que la m\u00e1quina del exterminio no parara. Todos lo sab\u00edan. Cuando hubieran visto demasiado, ser\u00edan los siguientes.",
    },
    {
      text: "En oto\u00f1o de 1944, la guerra se le ca\u00eda a pedazos a la Alemania nazi. El ej\u00e9rcito sovi\u00e9tico avanzaba desde el este y las SS empezaron a destruir pruebas del genocidio: desmontaban c\u00e1maras de gas, quemaban documentos. Los Sonderkommando sab\u00edan leer las se\u00f1ales. Les tocaba a ellos. Durante meses, un peque\u00f1o grupo hab\u00eda ido preparando en silencio algo imposible. No era un plan de fuga ni una misi\u00f3n de rescate. Era una revuelta. El \u00faltimo acto de desaf\u00edo de hombres que ya estaban sentenciados.",
    },
    {
      text: "Todo depend\u00eda de la p\u00f3lvora. Cuatro mujeres jud\u00edas \u2014 Ala Gertner, Roza Robota, Regina Safirsztajn y Estera Wajcblum \u2014 trabajaban en una f\u00e1brica de municiones junto al campo. Durante meses sacaron peque\u00f1as cantidades escondidas entre los pliegues de sus vestidos y en recipientes con doble fondo, pas\u00e1ndola de mano en mano a trav\u00e9s de una cadena de presos hasta los crematorios. Ninguna llegaba a los treinta. Sab\u00edan que si las descubr\u00edan, les esperaban la tortura y la muerte. Lo hicieron de todos modos.",
    },
    {
      text: "El 7 de octubre de 1944, los Sonderkommando del Crematorio IV recibieron la noticia: iban a matarlos ese mismo d\u00eda. As\u00ed que se adelantaron. Con la p\u00f3lvora acumulada, granadas caseras hechas con latas y cualquier herramienta a mano, atacaron a los guardias de las SS. Mataron a tres y prendieron fuego al Crematorio IV. Las llamas y una columna de humo negro se alzaron sobre Birkenau, visibles desde cada rinc\u00f3n del campo.",
    },
    {
      text: "Los presos del Crematorio II se sumaron a la lucha. Algunos cortaron las alambradas y huyeron a campo abierto. Pero las SS trajeron refuerzos enseguida: soldados, perros, potencia de fuego aplastante. A los fugitivos los cazaron y los mataron. En cuesti\u00f3n de horas, todo hab\u00eda terminado. Cuatrocientos cincuenta y un Sonderkommando murieron aquel d\u00eda. Algunos cayeron peleando. A la mayor\u00eda los ejecutaron despu\u00e9s de rendirse.",
    },
    {
      text: "Las SS rastrearon la p\u00f3lvora hasta la f\u00e1brica y de ah\u00ed hasta las cuatro mujeres. Ala, Roza, Regina y Estera fueron arrestadas y torturadas durante semanas. Las SS quer\u00edan nombres: cada eslab\u00f3n de la cadena. Ninguna de las cuatro se quebr\u00f3. No dieron un solo nombre. No pusieron en riesgo a un solo preso m\u00e1s.",
    },
    {
      text: "El 6 de enero de 1945 \u2014 apenas veinti\u00fan d\u00edas antes de que el ej\u00e9rcito sovi\u00e9tico liberara Auschwitz \u2014 las cuatro fueron ahorcadas delante de los prisioneros reunidos. Cuando le colocaron la soga al cuello, Roza Robota pronunci\u00f3 unas palabras que los supervivientes jam\u00e1s olvidar\u00edan: \u00abHazak v\u2019amatz\u00bb \u2014 en hebreo: \u00abSed fuertes y valientes\u00bb.",
    },
    {
      text: "Fueron de las \u00faltimas presas ejecutadas en Auschwitz. Tres semanas despu\u00e9s, el campo fue liberado. El crematorio que ellas ayudaron a destruir no se reconstruy\u00f3 jam\u00e1s. Dicen que no hay mal que cien a\u00f1os dure. Ellas no pensaban darle la oportunidad.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// FRENCH (fr) — La r\u00e9volte des condamn\u00e9s
// Proverb: "Tout vient \u00e0 point \u00e0 qui sait attendre" — subverted
// Register: France Inter longform, modern narrative nonfiction
// ═══════════════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#sonderkommando-uprising",
  era: "Seconde Guerre mondiale (7 octobre 1944)",

  title: "La r\u00e9volte des condamn\u00e9s",
  subtitle:
    "Le soul\u00e8vement des morts en sursis \u2014 et les quatre femmes qui l\u2019ont rendu possible",

  excerpt:
    "\u00c0 Auschwitz, il existait un groupe de d\u00e9tenus dont le destin \u00e9tait pire que la mort. On les appelait les Sonderkommando. Des Juifs que les SS for\u00e7aient \u00e0 accomplir l\u2019impensable : conduire d\u2019autres Juifs vers les chambres \u00e0 gaz, \u00e9vacuer les corps, arracher les dents en or des cadavres et jeter les restes dans les fours cr\u00e9matoires. Les SS les nourrissaient et les tenaient \u00e0 l\u2019\u00e9cart. Pas par humanit\u00e9 \u2014 ils avaient besoin d\u2019hommes assez solides pour faire tourner la machine d\u2019extermination. Chacun d\u2019eux le savait. Quand ils en auraient trop vu, ce serait leur tour.",

  moralOrLesson:
    "M\u00eame quand la mort est certaine, le choix de r\u00e9sister \u2014 de se battre, de refuser de se taire, de refuser \u00e0 son bourreau la victoire ultime de votre silence \u2014 est l\u2019acte supr\u00eame de libert\u00e9 humaine.",

  characters: [
    "Ala Gertner",
    "Roza Robota",
    "Regina Safirsztajn",
    "Estera Wajcblum",
    "Les prisonniers du Sonderkommando",
  ],

  paragraphs: [
    {
      text: "\u00c0 Auschwitz, il existait un groupe de d\u00e9tenus dont le destin \u00e9tait pire que la mort. On les appelait les Sonderkommando. Des Juifs que les SS for\u00e7aient \u00e0 accomplir l\u2019impensable : conduire d\u2019autres Juifs vers les chambres \u00e0 gaz, \u00e9vacuer les corps, arracher les dents en or des cadavres et jeter les restes dans les fours cr\u00e9matoires. Les SS les nourrissaient et les tenaient \u00e0 l\u2019\u00e9cart. Pas par humanit\u00e9 \u2014 ils avaient besoin d\u2019hommes assez solides pour faire tourner la machine d\u2019extermination. Chacun d\u2019eux le savait. Quand ils en auraient trop vu, ce serait leur tour.",
    },
    {
      text: "\u00c0 l\u2019automne 1944, l\u2019Allemagne nazie s\u2019effondrait. L\u2019Arm\u00e9e rouge avan\u00e7ait par l\u2019est, et les SS commenc\u00e8rent \u00e0 effacer les traces du g\u00e9nocide \u2014 d\u00e9montage des chambres \u00e0 gaz, destruction des archives. Les Sonderkommando lisaient les signes. Leur heure approchait. Depuis des mois, un petit groupe pr\u00e9parait en secret quelque chose d\u2019impensable. Pas une \u00e9vasion. Pas un sauvetage. Une r\u00e9volte. Le dernier geste de d\u00e9fi d\u2019hommes qui se savaient d\u00e9j\u00e0 condamn\u00e9s.",
    },
    {
      text: "Tout reposait sur de la poudre \u00e0 canon. Quatre jeunes femmes juives \u2014 Ala Gertner, Roza Robota, Regina Safirsztajn et Estera Wajcblum \u2014 travaillaient dans une usine de munitions \u00e0 c\u00f4t\u00e9 du camp. Pendant des mois, elles sortirent de minuscules quantit\u00e9s de poudre, cach\u00e9es dans les plis de leurs robes et dans des gamelles \u00e0 double fond, transmises de main en main jusqu\u2019aux cr\u00e9matoires. Aucune n\u2019avait trente ans. Elles savaient ce qui les attendait si elles se faisaient prendre. Elles l\u2019ont fait quand m\u00eame.",
    },
    {
      text: "Le 7 octobre 1944, les Sonderkommando du Cr\u00e9matoire IV apprirent qu\u2019ils allaient \u00eatre ex\u00e9cut\u00e9s le jour m\u00eame. Alors ils ont frapp\u00e9 les premiers. Avec la poudre accumul\u00e9e, des grenades artisanales faites de bo\u00eetes de conserve et tout ce qui pouvait servir d\u2019arme, ils attaqu\u00e8rent les gardes SS. Trois SS furent tu\u00e9s. Le Cr\u00e9matoire IV fut incendi\u00e9. Les flammes et une colonne de fum\u00e9e noire s\u2019\u00e9lev\u00e8rent au-dessus de Birkenau \u2014 visibles de chaque recoin du camp.",
    },
    {
      text: "Les d\u00e9tenus du Cr\u00e9matoire II rejoignirent le combat. Certains tranch\u00e8rent les barbel\u00e9s et s\u2019enfuirent dans la campagne. Mais les SS envoy\u00e8rent des renforts en un \u00e9clair \u2014 soldats, chiens, puissance de feu \u00e9crasante. Les fugitifs furent traqu\u00e9s et abattus. En quelques heures, tout \u00e9tait fini. Quatre cent cinquante et un Sonderkommando p\u00e9rirent ce jour-l\u00e0. Certains tomb\u00e8rent les armes \u00e0 la main. La plupart furent ex\u00e9cut\u00e9s apr\u00e8s s\u2019\u00eatre rendus.",
    },
    {
      text: "Les SS remont\u00e8rent la piste de la poudre jusqu\u2019\u00e0 l\u2019usine, puis jusqu\u2019aux quatre femmes. Ala, Roza, Regina et Estera furent arr\u00eat\u00e9es et tortur\u00e9es pendant des semaines. Les SS voulaient des noms \u2014 chaque maillon de la cha\u00eene. Aucune des quatre ne c\u00e9da. Pas un seul nom ne franchit leurs l\u00e8vres. Pas un seul autre d\u00e9tenu ne fut mis en danger.",
    },
    {
      text: "Le 6 janvier 1945 \u2014 vingt et un jours seulement avant la lib\u00e9ration d\u2019Auschwitz par les troupes sovi\u00e9tiques \u2014 les quatre femmes furent pendues devant les prisonniers rassembl\u00e9s. Quand la corde se serra autour de son cou, Roza Robota lan\u00e7a des mots que les survivants n\u2019oublieraient jamais : \u00ab\u202FHazak v\u2019amatz\u202F\u00bb \u2014 en h\u00e9breu : \u00ab\u202FSoyez forts et courageux\u202F\u00bb.",
    },
    {
      text: "Elles comptent parmi les derni\u00e8res d\u00e9tenues ex\u00e9cut\u00e9es \u00e0 Auschwitz. Trois semaines plus tard, le camp fut lib\u00e9r\u00e9. Le cr\u00e9matoire qu\u2019elles avaient aid\u00e9 \u00e0 d\u00e9truire ne fut jamais reconstruit. On dit que tout vient \u00e0 point \u00e0 qui sait attendre. Elles, elles avaient choisi de ne plus attendre.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// GERMAN (de) — Der Aufstand der Todgeweihten
// Proverb: "Gottes M\u00fchlen mahlen langsam" — devastatingly subverted
// Register: Spiegel/ZEIT narrative journalism, gripping modern prose
// ═══════════════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#sonderkommando-uprising",
  era: "Zweiter Weltkrieg (7. Oktober 1944)",

  title: "Der Aufstand der Todgeweihten",
  subtitle:
    "Die Revolte der lebenden Toten \u2014 und die vier Frauen, die sie m\u00f6glich machten",

  excerpt:
    "In Auschwitz gab es eine Gruppe von H\u00e4ftlingen, deren Schicksal schlimmer war als der Tod. Man nannte sie Sonderkommando. J\u00fcdische Gefangene, die von der SS gezwungen wurden, das Undenkbare zu tun: andere Juden in die Gaskammern zu f\u00fchren, die Leichen herauszutragen, den Toten die Goldz\u00e4hne zu brechen und die \u00dcberreste in die \u00d6fen zu schieben. Die SS hielt sie satt und isoliert \u2014 nicht aus Mitgef\u00fchl, sondern weil die Vernichtungsmaschinerie kr\u00e4ftige Arbeiter brauchte. Jeder von ihnen wusste, wie das enden w\u00fcrde. Sobald sie zu viel gesehen hatten, waren sie die N\u00e4chsten.",

  moralOrLesson:
    "Selbst wenn der Tod gewiss ist, bleibt die Entscheidung zu widerstehen \u2014 zu k\u00e4mpfen, sich zu weigern zu schweigen, dem Henker den letzten Triumph des eigenen Verstummens zu verweigern \u2014 der h\u00f6chste Akt menschlicher Freiheit.",

  characters: [
    "Ala Gertner",
    "Roza Robota",
    "Regina Safirsztajn",
    "Estera Wajcblum",
    "Die Sonderkommando-H\u00e4ftlinge",
  ],

  paragraphs: [
    {
      text: "In Auschwitz gab es eine Gruppe von H\u00e4ftlingen, deren Schicksal schlimmer war als der Tod. Man nannte sie Sonderkommando. J\u00fcdische Gefangene, die von der SS gezwungen wurden, das Undenkbare zu tun: andere Juden in die Gaskammern zu f\u00fchren, die Leichen herauszutragen, den Toten die Goldz\u00e4hne zu brechen und die \u00dcberreste in die \u00d6fen zu schieben. Die SS hielt sie satt und isoliert \u2014 nicht aus Mitgef\u00fchl, sondern weil die Vernichtungsmaschinerie kr\u00e4ftige Arbeiter brauchte. Jeder von ihnen wusste, wie das enden w\u00fcrde. Sobald sie zu viel gesehen hatten, waren sie die N\u00e4chsten.",
    },
    {
      text: "Im Herbst 1944 brach das nationalsozialistische Regime in sich zusammen. Die Rote Armee r\u00fcckte von Osten vor, und die SS begann fieberhaft, Spuren des V\u00f6lkermords zu beseitigen \u2014 Gaskammern wurden abgerissen, Akten verbrannt. Die Sonderkommando erkannten die Zeichen. Ihre Zeit lief ab. Seit Monaten hatte eine kleine Gruppe im Verborgenen das Unm\u00f6gliche vorbereitet. Keinen Fluchtplan. Keine Rettungsaktion. Einen Aufstand. Den letzten Akt des Widerstands von M\u00e4nnern, die bereits zum Tode verurteilt waren.",
    },
    {
      text: "Alles hing am Schie\u00dfpulver. Vier junge j\u00fcdische Frauen \u2014 Ala Gertner, Roza Robota, Regina Safirsztajn und Estera Wajcblum \u2014 arbeiteten in einer Munitionsfabrik direkt neben dem Lager. Monatelang schmuggelten sie winzige Mengen Pulver heraus, versteckt in den Falten ihrer Kleider und in Essgeschirr mit doppeltem Boden, weitergereicht von Hand zu Hand \u00fcber eine Kette von H\u00e4ftlingen bis zu den Krematorien. Keine von ihnen war drei\u00dfig. Sie wussten, dass Entdeckung Folter und Tod bedeutete. Sie taten es trotzdem.",
    },
    {
      text: "Am 7. Oktober 1944 erreichte die Sonderkommando am Krematorium IV die Nachricht: Sie sollten noch am selben Tag get\u00f6tet werden. Also schlugen sie zuerst zu. Mit dem geschmuggelten Pulver, selbstgebauten Granaten aus Konservendosen und allem, was sich als Waffe greifen lie\u00df, griffen sie die SS-Wachen an. Drei SS-M\u00e4nner wurden get\u00f6tet. Das Krematorium IV ging in Flammen auf. Schwarzer Rauch stieg \u00fcber Birkenau \u2014 sichtbar aus jedem Winkel des Lagers.",
    },
    {
      text: "Die H\u00e4ftlinge des Krematoriums II schlossen sich dem Kampf an. Einige durchschnitten den Stacheldraht und flohen in die umliegenden Felder. Doch die SS schickte in k\u00fcrzester Zeit Verst\u00e4rkung \u2014 Soldaten, Hunde, \u00fcberw\u00e4ltigende Feuerkraft. Die Fl\u00fcchtenden wurden aufgesp\u00fcrt und erschossen. Innerhalb weniger Stunden war alles vorbei. Vierhunderteinundf\u00fcnfzig Sonderkommando starben an diesem Tag. Manche fielen im Kampf. Die meisten wurden nach der Kapitulation hingerichtet.",
    },
    {
      text: "Die SS verfolgte die Spur des Pulvers zur\u00fcck zur Fabrik und von dort zu den vier Frauen. Ala, Roza, Regina und Estera wurden verhaftet und wochenlang gefoltert. Die SS wollte Namen \u2014 jedes Glied der Schmuggelkette. Keine der vier brach. Kein einziger Name kam \u00fcber ihre Lippen. Kein einziger weiterer H\u00e4ftling geriet durch sie in Gefahr.",
    },
    {
      text: "Am 6. Januar 1945 \u2014 nur einundzwanzig Tage, bevor sowjetische Truppen Auschwitz befreien sollten \u2014 wurden die vier Frauen vor den versammelten H\u00e4ftlingen geh\u00e4ngt. Als man ihr die Schlinge um den Hals legte, rief Roza Robota Worte, die die \u00dcberlebenden nie vergessen sollten: \u201eHazak v\u2019amatz\u201c \u2014 auf Hebr\u00e4isch: \u201eSeid stark und mutig.\u201c",
    },
    {
      text: "Sie geh\u00f6rten zu den letzten Gefangenen, die in Auschwitz hingerichtet wurden. Drei Wochen sp\u00e4ter war das Lager befreit. Das Krematorium, das sie zerst\u00f6ren halfen, wurde nie wieder aufgebaut. Man sagt, Gottes M\u00fchlen mahlen langsam. Die M\u00fchlen von Auschwitz mahlten schnell \u2014 aber selbst sie konnten den Willen dieser vier Frauen nicht zermalmen.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════
async function pushStory(record) {
  const label = `${record.lang} — ${record.title}`;
  console.log(`\nPushing ${label} ...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression:
          "attribute_not_exists(siteId) OR attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✓ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ⚠ ${label} already exists — overwriting ...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`  ✓ ${label} overwritten successfully.`);
    } else {
      console.error(`  ✗ ${label} FAILED:`, err);
      throw err;
    }
  }
}

(async () => {
  await pushStory(es);
  await pushStory(fr);
  await pushStory(de);
  console.log("\n=== All 3 language versions pushed successfully ===\n");
})();
