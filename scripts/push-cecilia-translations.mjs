import { readFileSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// Load .env.local
const env = {};
for (const line of readFileSync('.env.local', 'utf-8').split('\n')) {
  const idx = line.indexOf('=');
  if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
}

const client = new DynamoDBClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = env.DYNAMO_TABLE_STORY || 'Story';
const now = Math.floor(Date.now() / 1000);

// ─── Non-text fields (identical across all languages) ───
const base = {
  siteId: 'catacombs-rome',
  storyId: 'st-cecilias-incorrupt-body',
  icon: '\u{1F3B5}',
  tier: 'A',
  source: "Acta Sanctorum; Maderno's sculpture documentation; De Rossi, Giovanni Battista. Roma Sotterranea, 1864-77",
  characters: [
    'Saint Cecilia',
    'Cardinal Paolo Emilio Sfondrato',
    'Stefano Maderno (sculptor)',
    'Pope Urban I',
    'Pope Paschal I',
  ],
  era: 'Martyrdom c. 230 AD; rediscovery 1599',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 12.5135, lat: 41.8579 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — "La santa que Roma no pudo callar"
//  Proverb: "A la tercera va la vencida" (Third time's the charm)
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#st-cecilias-incorrupt-body',
  title: 'La santa que Roma no pudo callar',
  subtitle: 'Patrona de la m\u00fasica, hallada intacta tras trece siglos bajo tierra',
  excerpt: 'En 1599, unos obreros abrieron un sarc\u00f3fago bajo una iglesia de Roma. Llevaba sellado casi ochocientos a\u00f1os. Lo que encontraron dentro desafiaba toda explicaci\u00f3n.',
  moralOrLesson: 'Hay historias que se niegan a morir. Los que intentaron silenciar a Cecilia llevan siglos olvidados, pero ella sigue aqu\u00ed \u2014 en el m\u00e1rmol, en la m\u00fasica, en cada sala de conciertos que lleva su nombre. A veces, la voz m\u00e1s callada es la que m\u00e1s lejos llega.',
  paragraphs: [
    {
      text: 'En 1599, bajo una iglesia del barrio romano de Trastevere, unos obreros abrieron un sarc\u00f3fago de piedra. Llevaba sellado casi ochocientos a\u00f1os. Dentro hab\u00eda una mujer joven, tumbada de costado, con las rodillas recogidas y los brazos extendidos. No era un esqueleto. No era polvo. Despu\u00e9s de trece siglos, parec\u00eda que acababa de quedarse dormida. Se llamaba Cecilia, y la historia de c\u00f3mo lleg\u00f3 hasta ah\u00ed es una de las m\u00e1s incre\u00edbles de toda Roma.',
    },
    {
      text: 'Cecilia era una noble romana, nacida hacia el a\u00f1o 230 d.C., cuando ser cristiano era una sentencia de muerte. El imperio cazaba creyentes sin piedad, y ella se hab\u00eda convertido en secreto. Convenci\u00f3 incluso a su marido pagano, Valeriano, de abrazar la misma fe. Cuando las autoridades lo descubrieron, no les bast\u00f3 con castigarla. Quer\u00edan hacer un escarmiento.',
    },
    {
      text: 'La encerraron en el ba\u00f1o de vapor de su propia casa y subieron la temperatura hasta niveles mortales. La idea era cocerla viva sin ponerle un dedo encima. Sobrevivi\u00f3 un d\u00eda y una noche entera. Entonces mandaron un verdugo. La ley romana solo permit\u00eda tres golpes de espada. A la tercera va la vencida, dicen. Pero nadie se lo dijo a Cecilia. Tres tajos en el cuello, y ninguno la mat\u00f3. Cay\u00f3 desangr\u00e1ndose, pero viva. Resisti\u00f3 tres d\u00edas m\u00e1s.',
    },
    {
      text: 'La noticia corri\u00f3 como la p\u00f3lvora por Roma: una mujer agonizaba tras una ejecuci\u00f3n chapucera, y no paraba de predicar. La gente acudi\u00f3 en masa. Cientos se convirtieron al verla. Recog\u00edan su sangre en trapos y frascos como reliquias sagradas. Cuando por fin muri\u00f3, el papa Urbano I la enterr\u00f3 en las catacumbas de San Calixto, junto a las tumbas de los propios papas.',
    },
    {
      text: 'Su cuerpo permaneci\u00f3 bajo tierra seis siglos. En el a\u00f1o 821, el papa Pascual I traslad\u00f3 sus restos a una iglesia construida en su honor: Santa Cecilia in Trastevere, al otro lado del T\u00edber. El sarc\u00f3fago qued\u00f3 sellado bajo el altar. Y ah\u00ed estuvo, intocable, casi ochocientos a\u00f1os, hasta que en 1599 un cardenal llamado Sfondrato orden\u00f3 unas reformas y decidi\u00f3 abrirlo.',
    },
    {
      text: 'El cuerpo no se hab\u00eda descompuesto. No como cabr\u00eda esperar despu\u00e9s de trece siglos. Cecilia yac\u00eda de costado, con las rodillas juntas, los brazos extendidos hacia delante y el rostro vuelto hacia el suelo. Parec\u00eda dormida. Y en el cuello, tres cortes profundos, todav\u00eda visibles. Las mismas tres marcas del verdugo que no pudo silenciarla. El cardenal llam\u00f3 al escultor Stefano Maderno para que inmortalizara lo que ve\u00edan antes de volver a sellar el sarc\u00f3fago.',
    },
    {
      text: 'Maderno tall\u00f3 una figura de m\u00e1rmol a tama\u00f1o real, reproduciendo cada detalle: la postura serena, el rostro girado, las tres heridas en el cuello. La termin\u00f3 en 1600, y hoy sigue exactamente donde la colocaron, bajo el mismo altar de Trastevere. Es una de las obras m\u00e1s impactantes de Roma, no por ser espectacular, sino por lo quieta que es. No hay gesto heroico. Solo una mujer tumbada, tal como la encontraron. M\u00e1s de cuatro siglos despu\u00e9s, la gente sigue par\u00e1ndose en seco al verla.',
    },
    {
      text: 'Y aqu\u00ed viene lo mejor. Mucho antes de encontrar su cuerpo, Cecilia ya era una de las santas m\u00e1s queridas del cristianismo: la patrona de la m\u00fasica. En su boda forzada con Valeriano, mientras los instrumentos romanos sonaban a su alrededor, ella cant\u00f3 a Dios en silencio, solo en su coraz\u00f3n. Esa imagen cal\u00f3 para siempre. Hoy, salas de conciertos y conservatorios de todo el mundo llevan su nombre. La mujer que Roma intent\u00f3 callar se convirti\u00f3 en la santa por la que el mundo entero canta.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — "Le corps que la mort a oublié"
//  Proverb: "Jamais deux sans trois" (Never two without three)
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#st-cecilias-incorrupt-body',
  title: 'Le corps que la mort a oubli\u00e9',
  subtitle: 'Patronne de la musique, retrouv\u00e9e intacte apr\u00e8s treize si\u00e8cles sous terre',
  excerpt: 'En 1599, des ouvriers ont ouvert un sarcophage scell\u00e9 sous une \u00e9glise de Rome. Il \u00e9tait rest\u00e9 ferm\u00e9 pendant pr\u00e8s de huit cents ans. Ce qu\u2019ils ont trouv\u00e9 \u00e0 l\u2019int\u00e9rieur d\u00e9fiait toute logique.',
  moralOrLesson: 'Certaines histoires refusent de mourir. Ceux qui ont voulu faire taire C\u00e9cile sont oubli\u00e9s depuis des si\u00e8cles, mais elle est toujours l\u00e0 \u2014 dans le marbre, dans la musique, dans chaque salle de concert qui porte son nom. Parfois, la voix la plus silencieuse est celle qui porte le plus loin.',
  paragraphs: [
    {
      text: 'En 1599, sous une \u00e9glise du quartier romain du Trastevere, des ouvriers ont ouvert un sarcophage de pierre. Il \u00e9tait scell\u00e9 depuis presque huit cents ans. \u00c0 l\u2019int\u00e9rieur, une jeune femme couch\u00e9e sur le c\u00f4t\u00e9, les genoux repli\u00e9s, les bras tendus vers l\u2019avant. Pas un squelette. Pas de la poussi\u00e8re. Apr\u00e8s treize si\u00e8cles, on aurait dit qu\u2019elle venait de s\u2019endormir. Elle s\u2019appelait C\u00e9cile \u2014 et l\u2019histoire qui l\u2019a men\u00e9e jusque-l\u00e0 est l\u2019une des plus folles de toute la ville \u00e9ternelle.',
    },
    {
      text: 'C\u00e9cile \u00e9tait une noble romaine, n\u00e9e vers 230 apr\u00e8s J\u00e9sus-Christ \u2014 une \u00e9poque o\u00f9 \u00eatre chr\u00e9tien pouvait vous co\u00fbter la vie. L\u2019Empire traquait les croyants sans rel\u00e2che, et C\u00e9cile s\u2019\u00e9tait convertie en secret. Elle avait m\u00eame convaincu son mari pa\u00efen, Val\u00e9rien, d\u2019embrasser sa foi. Quand les autorit\u00e9s l\u2019ont d\u00e9couvert, elles n\u2019ont pas voulu simplement la punir. Elles ont voulu en faire un exemple.',
    },
    {
      text: 'On l\u2019a enferm\u00e9e dans les bains de sa propre maison et on a pouss\u00e9 la chaleur \u00e0 un niveau mortel. L\u2019id\u00e9e\u00a0: la cuire vivante sans la toucher. Elle a tenu un jour et une nuit enti\u00e8re. Alors on a envoy\u00e9 un bourreau. La loi romaine n\u2019autorisait que trois coups d\u2019\u00e9p\u00e9e. Jamais deux sans trois, dit le proverbe \u2014 mais pour C\u00e9cile, m\u00eame le troisi\u00e8me coup n\u2019a pas suffi. Trois entailles profondes dans le cou, aucune mortelle. Elle s\u2019est effondr\u00e9e, en sang, mais vivante. Elle a tenu encore trois jours.',
    },
    {
      text: 'La nouvelle s\u2019est r\u00e9pandue comme une tra\u00een\u00e9e de poudre\u00a0: une femme agonisait apr\u00e8s une ex\u00e9cution rat\u00e9e, et elle continuait de pr\u00eacher. Les foules se sont press\u00e9es pour la voir. Des centaines de personnes se sont converties sur place. On recueillait son sang dans des linges et des fioles comme des reliques sacr\u00e9es. Quand elle est finalement morte, le pape Urbain Ier l\u2019a enterr\u00e9e dans les catacombes de Saint-Calixte, juste \u00e0 c\u00f4t\u00e9 des tombeaux des papes eux-m\u00eames.',
    },
    {
      text: 'Son corps est rest\u00e9 sous terre pendant six si\u00e8cles. En 821, le pape Pascal Ier a transf\u00e9r\u00e9 ses restes dans une \u00e9glise b\u00e2tie en son honneur\u00a0: Santa Cecilia in Trastevere, de l\u2019autre c\u00f4t\u00e9 du Tibre. Le sarcophage a \u00e9t\u00e9 scell\u00e9 sous l\u2019autel. Et il est rest\u00e9 l\u00e0, intact, pendant pr\u00e8s de huit cents ans \u2014 jusqu\u2019\u00e0 ce qu\u2019en 1599, un cardinal du nom de Sfondrato ordonne des travaux et d\u00e9cide de l\u2019ouvrir.',
    },
    {
      text: 'Le corps ne s\u2019\u00e9tait pas d\u00e9compos\u00e9. Pas comme on l\u2019aurait imagin\u00e9 apr\u00e8s treize si\u00e8cles. C\u00e9cile reposait sur le c\u00f4t\u00e9 droit, les genoux joints, les bras tendus, le visage tourn\u00e9 vers le sol. On aurait jur\u00e9 qu\u2019elle dormait. Et sur son cou\u00a0: trois entailles profondes, toujours visibles. Les m\u00eames marques laiss\u00e9es par le bourreau qui n\u2019avait pas r\u00e9ussi \u00e0 la faire taire. Le cardinal a fait venir le sculpteur Stefano Maderno pour immortaliser la sc\u00e8ne avant de refermer le sarcophage.',
    },
    {
      text: 'Maderno a sculpt\u00e9 une figure en marbre grandeur nature, reproduisant chaque d\u00e9tail\u00a0: la pose paisible, le visage d\u00e9tourn\u00e9, les trois blessures au cou. Il l\u2019a achev\u00e9e en 1600, et elle repose toujours au m\u00eame endroit, sous le m\u00eame autel du Trastevere. C\u2019est l\u2019une des \u0153uvres les plus saisissantes de Rome \u2014 pas parce qu\u2019elle est spectaculaire, mais parce qu\u2019elle est d\u2019un calme absolu. Pas de geste h\u00e9ro\u00efque. Juste une femme allong\u00e9e, telle qu\u2019on l\u2019a trouv\u00e9e. Quatre si\u00e8cles plus tard, les gens s\u2019arr\u00eatent encore net devant elle.',
    },
    {
      text: 'Et voil\u00e0 le plus beau. Bien avant qu\u2019on retrouve son corps, C\u00e9cile \u00e9tait d\u00e9j\u00e0 l\u2019une des saintes les plus aim\u00e9es de la chr\u00e9tient\u00e9\u00a0: la patronne de la musique. Lors de son mariage forc\u00e9 avec Val\u00e9rien, tandis que les instruments romains jouaient autour d\u2019elle, elle a chant\u00e9 pour Dieu en silence, dans son c\u0153ur seulement. Cette image ne l\u2019a jamais quitt\u00e9e. Aujourd\u2019hui, des salles de concert et des conservatoires du monde entier portent son nom. La femme que Rome a voulu faire taire est devenue la sainte pour laquelle le monde entier chante.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — "Der Körper, den die Zeit vergaß"
//  Proverb: "Aller guten Dinge sind drei" (All good things come in threes)
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#st-cecilias-incorrupt-body',
  title: 'Der K\u00f6rper, den die Zeit verga\u00df',
  subtitle: 'Schutzpatronin der Musik \u2014 nach dreizehn Jahrhunderten unversehrt aufgefunden',
  excerpt: 'Im Jahr 1599 \u00f6ffneten Arbeiter einen Steinsarg unter einer Kirche in Rom. Er war fast achthundert Jahre lang versiegelt gewesen. Was sie darin fanden, h\u00e4tte es nicht geben d\u00fcrfen.',
  moralOrLesson: 'Manche Geschichten weigern sich zu sterben. Die Menschen, die C\u00e4cilia zum Schweigen bringen wollten, sind l\u00e4ngst vergessen \u2014 aber sie ist immer noch da. Im Marmor, in der Musik, in jedem Konzertsaal, der ihren Namen tr\u00e4gt. Manchmal ist die leiseste Stimme im Raum die, die am l\u00e4ngsten nachhallt.',
  paragraphs: [
    {
      text: 'Im Jahr 1599 \u00f6ffneten Arbeiter unter einer Kirche im r\u00f6mischen Viertel Trastevere einen Steinsarg, der fast achthundert Jahre lang versiegelt gewesen war. Darin lag eine junge Frau auf der Seite, die Knie angezogen, die Arme nach vorn gestreckt. Kein Skelett. Kein Staub. Nach dreizehn Jahrhunderten sah sie aus, als w\u00e4re sie gerade eingeschlafen. Ihr Name war C\u00e4cilia \u2014 und die Geschichte, wie sie dort gelandet war, geh\u00f6rt zu den wildesten, die Rom zu bieten hat.',
    },
    {
      text: 'C\u00e4cilia war eine r\u00f6mische Adlige, geboren um das Jahr 230 nach Christus \u2014 eine Zeit, in der man als Christ sein Leben riskierte. Rom jagte Gl\u00e4ubige ohne Erbarmen, und C\u00e4cilia hatte sich heimlich bekehrt. Sie hatte sogar ihren heidnischen Ehemann Valerian \u00fcberzeugt, denselben Glauben anzunehmen. Als die Beh\u00f6rden davon erfuhren, wollten sie nicht einfach strafen. Sie wollten ein Exempel statuieren.',
    },
    {
      text: 'Man sperrte sie im Dampfbad ihres eigenen Hauses ein und drehte die Hitze auf t\u00f6dliches Niveau. Die Idee: sie bei lebendigem Leib kochen, ohne sie anzufassen. Sie \u00fcberlebte einen Tag und eine Nacht. Also schickte man einen Henker. R\u00f6misches Recht erlaubte drei Schwerthiebe \u2014 nicht mehr. Aller guten Dinge sind drei, sagt man. Das galt an diesem Tag auch f\u00fcr C\u00e4cilia. Nur anders, als der Henker gehofft hatte. Drei Hiebe in den Hals, keiner t\u00f6dlich. Sie fiel blutend zu Boden, aber sie lebte. Drei weitere Tage lang.',
    },
    {
      text: 'Die Nachricht verbreitete sich wie ein Lauffeuer durch Rom: Eine Frau lag im Sterben nach einer verpfuschten Hinrichtung \u2014 und sie predigte weiter. Die Menschen str\u00f6mten herbei. Hunderte bekehrten sich auf der Stelle. Man sammelte ihr Blut in T\u00fcchern und Gef\u00e4\u00dfen als heilige Reliquien. Als sie schlie\u00dflich starb, bestattete Papst Urban I. sie in den Katakomben von San Callisto \u2014 direkt neben den Gr\u00e4bern der P\u00e4pste selbst.',
    },
    {
      text: 'Ihr K\u00f6rper blieb sechs Jahrhunderte unter der Erde. Im Jahr 821 lie\u00df Papst Paschalis I. ihre \u00dcberreste in eine Kirche \u00fcberf\u00fchren, die zu ihren Ehren errichtet worden war: Santa Cecilia in Trastevere, jenseits des Tiber. Der Sarg wurde unter dem Altar versiegelt. Dort blieb er, unber\u00fchrt, fast achthundert Jahre \u2014 bis 1599 ein Kardinal namens Sfondrato Renovierungen anordnete und beschloss, ihn zu \u00f6ffnen.',
    },
    {
      text: 'Der K\u00f6rper war nicht verwest. Nicht so, wie man es nach dreizehn Jahrhunderten erwarten w\u00fcrde. C\u00e4cilia lag auf der rechten Seite, die Knie zusammen, die Arme nach vorn gestreckt, das Gesicht zum Boden gewandt. Sie sah aus wie eine Schlafende. Und an ihrem Hals: drei tiefe Schnitte, immer noch sichtbar. Die Spuren des Henkers, der sie nicht zum Schweigen hatte bringen k\u00f6nnen. Der Kardinal rief den Bildhauer Stefano Maderno, um festzuhalten, was sie sahen, bevor der Sarg wieder geschlossen wurde.',
    },
    {
      text: 'Maderno schuf eine lebensgro\u00dfe Marmorfigur und hielt jedes Detail fest: die ruhige Haltung, das abgewandte Gesicht, die drei Wunden am Hals. Er vollendete sie im Jahr 1600, und sie liegt bis heute genau dort \u2014 unter demselben Altar in Trastevere. Es ist eines der eindrucksvollsten Kunstwerke Roms. Nicht weil es dramatisch w\u00e4re, sondern weil es so still ist. Keine heroische Geste. Nur eine liegende Frau, genau so, wie man sie fand. \u00dcber vierhundert Jahre sp\u00e4ter bleiben Menschen immer noch wie angewurzelt davor stehen.',
    },
    {
      text: 'Und jetzt kommt der eigentliche Clou. Lange bevor man ihren K\u00f6rper fand, war C\u00e4cilia bereits eine der beliebtesten Heiligen der Christenheit: die Schutzpatronin der Musik. Bei ihrer Zwangshochzeit mit Valerian, w\u00e4hrend die r\u00f6mischen Instrumente um sie herum spielten, sang sie lautlos zu Gott \u2014 nur in ihrem Herzen. Dieses Bild hat sich f\u00fcr immer eingebrannt. Heute tragen Konzerts\u00e4le und Musikakademien auf der ganzen Welt ihren Namen. Die Frau, die Rom zum Schweigen bringen wollte, wurde zur Heiligen, f\u00fcr die die ganze Welt singt.',
    },
  ],
};

// ─── Validation ──────────────────────────────────────────
function validate(story) {
  const label = story.lang.toUpperCase();
  let totalChars = 0;
  const pCount = story.paragraphs.length;

  if (pCount < 6 || pCount > 10) {
    throw new Error(`[${label}] Paragraph count ${pCount} out of range (6-10)`);
  }

  for (let i = 0; i < pCount; i++) {
    const text = story.paragraphs[i].text;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    totalChars += chars;

    if (chars > 600) {
      throw new Error(`[${label}] P${i + 1}: ${chars} chars exceeds 600 (500 + 20%)`);
    }
    if (words > 120) {
      throw new Error(`[${label}] P${i + 1}: ${words} words exceeds 120 (100 + 20%)`);
    }
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  }

  console.log(`  Total: ${totalChars} chars (target: 2400-3600)`);
  if (totalChars < 2000 || totalChars > 4200) {
    throw new Error(`[${label}] Total ${totalChars} chars outside acceptable range`);
  }
  console.log(`  [${label}] Validation passed.\n`);
}

// ─── Push ────────────────────────────────────────────────
async function pushStory(story) {
  const item = { ...base, ...story };
  const label = story.lang.toUpperCase();

  console.log(`Pushing ${label} to DynamoDB...`);
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression: 'attribute_not_exists(siteId) OR lang <> :en',
      ExpressionAttributeValues: { ':en': 'en' },
    })
  );
  console.log(`\u2713 ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
}

async function main() {
  const stories = [es, fr, de];

  console.log('=== Validating all stories ===\n');
  for (const s of stories) {
    console.log(`--- ${s.lang.toUpperCase()} ---`);
    validate(s);
  }

  console.log('=== Pushing to DynamoDB ===\n');
  for (const s of stories) {
    await pushStory(s);
  }

  console.log('=== All 3 stories pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
