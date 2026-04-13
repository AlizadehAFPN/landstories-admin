import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

const updatedAt = Math.floor(Date.now() / 1000);

const baseItem = {
  siteId: 'hermitage-winter-palace',
  storyId: 'storming-winter-palace',
  icon: '⚔️',
  tier: 'S',
  source: 'Bolshevik records, John Reed\'s "Ten Days That Shook the World," Winter Palace garrison memoirs',
  characters: [
    'Vladimir Lenin',
    'Alexander Kerensky (fled before the storming)',
    'Women\'s Battalion of Death',
    'Red Guards',
    'Provisional Government ministers',
  ],
  era: 'October 25-26, 1917',
  readingTimeMinutes: 2,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 30.3146, lat: 59.9398 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt,
};

// ═══════════════════════════════════════════════════════════════
// SPANISH — "La noche que cayó un imperio"
// Proverb: "Tanto va el cántaro a la fuente que al final se rompe"
// (The pitcher goes to the well so often it finally breaks)
// Subverted: here 100,000 broke at once
// ═══════════════════════════════════════════════════════════════

const esItem = {
  ...baseItem,
  lang: 'es',
  langStoryId: 'es#storming-winter-palace',
  title: 'La noche que cayó un imperio',
  subtitle: 'El asalto al Palacio de Invierno que nadie recuerda como fue',
  excerpt: 'La película muestra una batalla épica. ¿La realidad? Un tropezón a ciegas por mil habitaciones, cien mil botellas de vino y un arresto tranquilo a la hora de cenar.',
  moralOrLesson: 'Las grandes revoluciones no siempre llegan con un grito de guerra — a veces llegan con resaca.',
  paragraphs: [
    { text: 'Seguro que te imaginas esto: miles de obreros armados asaltando las puertas del Palacio de Invierno, abriéndose paso a tiros entre salón y salón hasta derrocar al gobierno ruso. Esa versión la inventó Eisenstein en su película «Octubre» de 1927, y era pura propaganda. Lo que pasó de verdad la noche del 25 de octubre de 1917, cuando los bolcheviques de Lenin tomaron el poder y acabaron con siglos de zares, fue mucho más raro, más caótico y, siendo honestos, bastante ridículo.' },
    { text: 'El palacio lo defendían unos cientos de soldados, la mayoría cadetes adolescentes y miembros del Batallón Femenino de la Muerte, una unidad de voluntarias que ya había combatido en el frente de la Primera Guerra Mundial. Protegían al Gobierno Provisional, esa democracia frágil que había surgido cuando el zar Nicolás II abdicó ocho meses antes. Pero a medida que pasaban las horas, los guardias fueron escurriéndose por las puertas traseras. El mayor obstáculo de la revolución simplemente se fue a casa.' },
    { text: 'Los bolcheviques no asaltaron nada: entraron por las ventanas y las puertas de servicio como quien se cuela en una fiesta. El Palacio de Invierno tenía más de mil habitaciones, y grupos de obreros armados se perdieron por los pasillos sin más. Hasta que algunos dieron con la bodega del zar: unas cien mil botellas del mejor vino de Rusia. Lo que vino después casi acaba con la revolución antes de empezar: una borrachera monumental en pleno golpe de Estado.' },
    { text: 'Los comandantes bolcheviques entraron en pánico. Mandaron guardias a cerrar la bodega, pero los guardias se pusieron a beber. Tapiaron la entrada; la echaron abajo. Al final, reventaron cada botella. Dicen que tanto va el cántaro a la fuente que al final se rompe: aquí se rompieron cien mil de golpe. El vino corría por las canaletas del palacio y salía a la calle, un río rojo cruzando la capital.' },
    { text: 'Mientras el vino inundaba los desagües, alguien encontró a los ministros del Gobierno Provisional acurrucados alrededor de una mesa en un pequeño comedor. Los arrestaron sin disparar un solo tiro. Al amanecer del 26 de octubre, Lenin se plantó ante una multitud y anunció: «El Gobierno Provisional ha sido derrocado». Así, sin más. El Palacio de Invierno — sede del poder de los Romanov durante tres siglos — cambió de dueño en unas doce horas. Y lo más sangriento de todo fue el vino.' },
    { text: 'Ahora viene lo que nadie espera. Los revolucionarios que acababan de derribar un imperio no destruyeron sus tesoros. El palacio albergaba una de las colecciones de arte más importantes del mundo: Rembrandt, Rubens, Leonardo da Vinci. El nuevo gobierno soviético podría haber quemado todo como símbolo del exceso imperial. En vez de eso, abrieron las puertas de par en par. El palacio se convirtió en el corazón del Museo del Hermitage, y las obras maestras del zar pasaron a ser de todos.' },
    { text: 'Así que el palacio que los Romanov construyeron para presumir de su riqueza acabó exhibiendo su caída. Y la revolución que debía ser una batalla épica resultó ser un tropezón a oscuras por pasillos interminables, un desastre etílico y un arresto tranquilo a la hora de cenar. El mayor cambio de poder del siglo XX no llegó con un rugido, sino con resaca.' },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FRENCH — "La nuit où la Russie a basculé"
// Proverb: "Quand le vin est tiré, il faut le boire"
// (When the wine is drawn, you must drink it)
// Subverted: that night they had to DESTROY it to save the revolution
// ═══════════════════════════════════════════════════════════════

const frItem = {
  ...baseItem,
  lang: 'fr',
  langStoryId: 'fr#storming-winter-palace',
  title: 'La nuit où la Russie a basculé',
  subtitle: "Le coup d'État au Palais d'Hiver qui a mis fin à un empire",
  excerpt: "Le film montre une bataille épique. La réalité ? Une errance dans mille pièces, cent mille bouteilles de vin et une arrestation tranquille à l'heure du dîner.",
  moralOrLesson: "Les plus grandes révolutions n'arrivent pas toujours dans un cri de guerre — parfois, elles arrivent avec une gueule de bois.",
  paragraphs: [
    { text: "Tu connais sûrement la version officielle : des milliers d'ouvriers armés qui chargent les grilles du Palais d'Hiver et renversent le pouvoir russe dans un bain de sang. C'est Eisenstein qui l'a fabriquée dans son film « Octobre » en 1927 — de la propagande pure. La vraie nuit du 25 octobre 1917, quand les bolcheviks ont pris le pouvoir et mis fin à des siècles de tsars, c'était plus étrange, plus chaotique et, franchement, assez ridicule." },
    { text: "Le palais était défendu par quelques centaines de soldats — surtout des cadets adolescents et des membres du Bataillon féminin de la Mort, des volontaires qui avaient déjà combattu sur le front de la Première Guerre mondiale. Ils protégeaient le Gouvernement provisoire, cette démocratie fragile née après l'abdication du tsar Nicolas II, huit mois plus tôt. Mais au fil des heures, les gardes se sont éclipsés un par un par les portes de service. Le plus grand obstacle de la révolution s'est tout simplement volatilisé." },
    { text: "Les bolcheviks n'ont rien pris d'assaut. Ils sont entrés par les fenêtres et les entrées de service, presque sur la pointe des pieds. Le Palais d'Hiver comptait plus de mille pièces, et des petits groupes d'ouvriers armés se sont purement et simplement perdus dans les couloirs. Jusqu'à ce que certains tombent sur la cave à vin du tsar : environ cent mille bouteilles des meilleurs crus de Russie. Ce qui a suivi a failli tuer la révolution dans l'œuf — une beuverie monumentale en plein coup d'État." },
    { text: "Les commandants bolcheviks ont paniqué. Ils ont envoyé des gardes armés fermer la cave — les gardes se sont mis à boire aussi. Ils ont muré l'entrée — on l'a défoncée. Finalement, ils ont fracassé chaque bouteille. On dit « quand le vin est tiré, il faut le boire » — sauf que cette nuit-là, il a fallu le détruire pour sauver la révolution. Le vin coulait dans les gouttières du palais et se déversait dans la rue : un fleuve rouge traversant la capitale." },
    { text: "Pendant que le vin inondait les caniveaux, quelqu'un a retrouvé les ministres du Gouvernement provisoire, serrés autour d'une table dans un petit salon. Ils ont été arrêtés sans qu'un seul coup de feu ne soit tiré. À l'aube du 26 octobre, Lénine a pris la parole devant la foule : « Le Gouvernement provisoire est renversé. » Le Palais d'Hiver — siège du pouvoir des Romanov pendant trois siècles — avait changé de mains en une douzaine d'heures. Et le moment le plus sanglant, c'était peut-être le vin." },
    { text: "Et voilà ce que personne n'attendait. Les révolutionnaires qui venaient de faire tomber un empire n'ont pas détruit ses trésors. Le palais abritait l'une des plus grandes collections d'art au monde : Rembrandt, Rubens, Léonard de Vinci. Le nouveau pouvoir soviétique aurait pu tout brûler comme symbole de l'excès royal. Au lieu de ça, ils ont ouvert les portes en grand. Le palais est devenu le cœur du musée de l'Ermitage, et les chefs-d'œuvre privés du tsar sont devenus ceux de tout le monde." },
    { text: "Le palais que les Romanov avaient bâti pour étaler leur richesse a fini par exposer leur chute. Et la révolution qui devait être une bataille épique s'est résumée à une errance dans des couloirs sombres, une catastrophe éthylique et une arrestation tranquille à l'heure du dîner. Le plus grand basculement de pouvoir du vingtième siècle ne s'est pas fait dans un fracas d'armes — mais dans un lendemain de cuite." },
  ],
};

// ═══════════════════════════════════════════════════════════════
// GERMAN — "Die Nacht, in der ein Imperium fiel"
// Proverb: "Der Krug geht so lange zum Brunnen, bis er bricht"
// (The pitcher goes to the well until it breaks)
// Subverted: that night 100,000 broke at once
// ═══════════════════════════════════════════════════════════════

const deItem = {
  ...baseItem,
  lang: 'de',
  langStoryId: 'de#storming-winter-palace',
  title: 'Die Nacht, in der ein Imperium fiel',
  subtitle: 'Der Sturm auf den Winterpalast, der ein Imperium beendete',
  excerpt: 'Der Film zeigt eine epische Schlacht. Die Wahrheit? Ein Stolpern durch tausend Räume, hunderttausend Flaschen Wein und eine stille Verhaftung beim Abendessen.',
  moralOrLesson: 'Die größten Revolutionen kommen nicht immer mit einem Schlachtruf — manchmal kommen sie mit einem Kater.',
  paragraphs: [
    { text: 'Du kennst wahrscheinlich diese Version: Tausende bewaffnete Arbeiter stürmen die Tore des Winterpalasts, kämpfen sich Saal für Saal vor und stürzen die russische Regierung in einem Kugelhagel. Diese Version stammt aus Eisensteins Film „Oktober" von 1927 — reine Propaganda. Was in der Nacht vom 25. Oktober 1917 wirklich geschah, als Lenins Bolschewiki die Macht übernahmen und Jahrhunderte der Zarenherrschaft beendeten, war deutlich seltsamer, chaotischer und, ehrlich gesagt, ziemlich absurd.' },
    { text: 'Verteidigt wurde der Palast von ein paar hundert Soldaten — größtenteils jugendliche Kadetten und Mitglieder des Weiblichen Todesbataillons, einer Freiwilligeneinheit, die bereits an der Front des Ersten Weltkriegs gekämpft hatte. Sie schützten die Provisorische Regierung, jene wacklige Demokratie, die nach der Abdankung von Zar Nikolaus II. acht Monate zuvor entstanden war. Doch im Laufe der Nacht verschwanden die Wachen stillschweigend durch die Hintertüren. Das größte Hindernis der Revolution ging einfach nach Hause.' },
    { text: 'Die Bolschewiki stürmten nichts. Sie kletterten durch Fenster und Dienstboteneingänge, fast wie ungebetene Gäste auf einer Party. Der Winterpalast hatte über tausend Räume, und kleine Gruppen bewaffneter Arbeiter verirrten sich hoffnungslos in den Fluren. Bis einige von ihnen den Weinkeller des Zaren fanden: rund hunderttausend Flaschen der besten Weine Russlands. Was dann folgte, hätte die Revolution beinahe beendet, bevor sie begonnen hatte — ein unkontrollierbares Trinkgelage mitten im Staatsstreich.' },
    { text: 'Die bolschewistischen Kommandeure gerieten in Panik. Sie schickten bewaffnete Wachen, um den Keller zu schließen — die Wachen fingen selbst an zu trinken. Sie mauerten den Eingang zu — er wurde eingeschlagen. Am Ende zerschlugen sie jede einzelne Flasche. Man sagt, der Krug geht so lange zum Brunnen, bis er bricht — in dieser Nacht brachen hunderttausend auf einmal. Der Wein strömte durch die Rinnen des Palasts hinaus auf die Straße: ein roter Fluss durch die Hauptstadt.' },
    { text: 'Während der Wein die Gossen füllte, fand man die Minister der Provisorischen Regierung zusammengekauert an einem Tisch in einem kleinen Speisezimmer. Sie wurden verhaftet, ohne dass ein einziger Schuss fiel. Im Morgengrauen des 26. Oktober trat Lenin vor die Menge und verkündete: „Die Provisorische Regierung ist gestürzt." Der Winterpalast — drei Jahrhunderte lang Sitz der Macht der Romanows — hatte in etwa zwölf Stunden den Besitzer gewechselt. Und das Blutigste an der ganzen Sache war womöglich der Wein.' },
    { text: 'Jetzt kommt der Teil, mit dem niemand rechnet. Die Revolutionäre, die gerade ein Imperium gestürzt hatten, zerstörten seine Schätze nicht. Der Palast beherbergte eine der bedeutendsten Kunstsammlungen der Welt: Rembrandt, Rubens, Leonardo da Vinci. Die neue Sowjetregierung hätte alles verbrennen können — als Symbol für den Überfluss der Krone. Stattdessen öffneten sie die Türen weit. Der Palast wurde zum Herzstück der Eremitage, und die privaten Meisterwerke des Zaren gehörten plötzlich allen.' },
    { text: 'So wurde der Palast, den die Romanows gebaut hatten, um ihren Reichtum zur Schau zu stellen, zum Schauplatz ihres Untergangs. Und die Revolution, die eine epische Schlacht hätte sein sollen, entpuppte sich als ein Stolpern durch dunkle Flure, eine Weinkatastrophe und eine stille Verhaftung beim Abendessen. Der größte Machtwechsel des zwanzigsten Jahrhunderts kam nicht mit einem Donnerschlag — sondern mit einem Kater.' },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PUSH SEQUENTIALLY — confirm each before moving to the next
// ═══════════════════════════════════════════════════════════════

const stories = [esItem, frItem, deItem];

for (const story of stories) {
  try {
    console.log(`\nPushing ${story.lang.toUpperCase()} version: "${story.title}"...`);
    console.log(`  langStoryId: ${story.langStoryId}`);
    console.log(`  siteId: ${story.siteId}`);
    console.log(`  paragraphs: ${story.paragraphs.length}`);
    console.log(`  updatedAt: ${story.updatedAt}`);

    await docClient.send(new PutCommand({
      TableName: 'Story',
      Item: story,
    }));

    console.log(`  ✅ ${story.lang.toUpperCase()} pushed successfully!`);
  } catch (error) {
    console.error(`  ❌ Failed to push ${story.lang.toUpperCase()}:`, error.message);
    process.exit(1);
  }
}

console.log('\n════════════════════════════════════════');
console.log('🎉 All three language versions pushed successfully!');
console.log('════════════════════════════════════════');
console.log(`  ES: es#storming-winter-palace`);
console.log(`  FR: fr#storming-winter-palace`);
console.log(`  DE: de#storming-winter-palace`);
console.log(`  Table: Story`);
console.log(`  Site: hermitage-winter-palace`);
