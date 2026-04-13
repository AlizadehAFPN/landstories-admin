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

// ─── Non-text fields (from English original) ────────────
const base = {
  siteId: 'great-pyramids-giza',
  storyId: 'curse-of-the-pharaohs-original',
  icon: '\u{1F441}\uFE0F',
  tier: 'S',
  source: 'Al-Maqrizi, al-Khitat wa al-Athar; medieval Arab historical literature',
  characters: [
    'The Beautiful Woman Guardian',
    'The Boy with Golden Eyes',
    'The Sand Whirlwind Spirit',
    'Al-Maqrizi (historian)',
  ],
  era: 'Medieval Arab Period (drawing on ancient traditions)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 31.1342, lat: 29.9792 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'ghosts_curses',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «La maldición original de los faraones»
//  Proverb: «No hay dos sin tres»
//  — subverted: three pyramids, three guardians,
//    and not a second chance for anyone who defied them
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#curse-of-the-pharaohs-original',
  title: 'La maldición original de los faraones',
  subtitle: 'Los guardianes que esperan en la oscuridad',
  excerpt:
    'Siglos antes de que la tumba de Tutankamón acaparara titulares, los sabios árabes del Cairo medieval escribían sobre algo mucho más antiguo en las pirámides: espíritus vivos encadenados a la piedra, esperando en la oscuridad a cualquier intruso.',
  moralOrLesson:
    'Los antiguos sabían que los mayores tesoros exigen la protección más temible, y que no todos los guardianes pueden verse.',
  paragraphs: [
    {
      text: 'Todo el mundo conoce la historia: en 1922, alguien abre la tumba de Tutankamón y la gente empieza a morir. Pero esa es la versión que Hollywood nos vendió. Siglos antes de que ningún arqueólogo europeo pisara una pirámide, los sabios árabes del Cairo medieval ya escribían sobre algo mucho más antiguo y mucho más inquietante. No hablaban de maldiciones grabadas en piedra. Hablaban de guardianes vivos — espíritus que los propios faraones habían encadenado a la roca, esperando en la oscuridad a cualquiera lo bastante necio como para entrar.',
    },
    {
      text: 'El relato más completo lo dejó al-Maqrizi, un historiador egipcio del siglo XV que recopiló tradiciones orales que ya eran antiquísimas en su época — historias que se remontaban a los tiempos de los propios faraones. Según lo que recogió, los reyes que levantaron las pirámides no eran solo arquitectos geniales. Dominaban algo más. Antes de sellar sus tumbas, realizaban rituales para invocar djinn — espíritus poderosos del mundo invisible — y los ataban a esos lugares como guardianes eternos.',
    },
    {
      text: 'El guardián más temido de la Gran Pirámide aparecía como una mujer de una belleza devastadora. Se mostraba a los hombres que entraban de noche, y verla los destruía. Salían sin poder hablar, incapaces de reconocer a sus propias familias. Algunos se perdían en el desierto y no volvían jamás. Los pocos que medio se recuperaban solo podían decir que aquella belleza estaba tan lejos de lo humano que la mente no podía soportarla. Como mirar al sol, pero peor: no te dejaba ciego. Te rompía por dentro.',
    },
    {
      text: 'El segundo guardián tenía forma de niño de piel color miel y ojos dorados que brillaban como lámparas en la oscuridad. Este djinn iba a por los saqueadores de tumbas. Aparecía justo delante de ellos en los túneles, siempre fuera de alcance, llevándolos cada vez más profundo por pasadizos que se cerraban y cambiaban de forma a sus espaldas. A algunos los encontraron años después, sellados en cámaras sin entrada visible. Pelo completamente blanco. La mente, perdida para siempre.',
    },
    {
      text: 'La tercera pirámide — la de Micerino, la más pequeña de Guiza — tenía su propio protector: una figura envuelta en una columna de arena giratoria. Cuando avanzaba por los corredores, todas las antorchas se apagaban de golpe. Oscuridad total. Y en esa oscuridad, voces en un idioma muerto hacía tres mil años. Ya saben lo que dicen: no hay dos sin tres. Tres pirámides, tres guardianes, y ni una segunda oportunidad para quien los desafiara. Los exploradores árabes recitaban el Corán antes de dar un solo paso dentro.',
    },
    {
      text: 'Los historiadores modernos descartan todo esto como folclore. Pero la gente que vive y trabaja a la sombra de las pirámides cuenta otra cosa. Los guardias hablan de puntos de frío inexplicable en cámaras selladas sin ventilación. Los trabajadores oyen piedra deslizándose contra piedra en salas donde nada se mueve. Y casi todos describen lo mismo: una sensación pesada, inconfundible, de que algo antiguo y consciente te observa. Cuatro mil quinientos años después, las pirámides siguen guardando sus secretos. Y quizá también a sus guardianes.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «La malédiction originelle des pharaons»
//  Proverb: «Jamais deux sans trois»
//  — subverted: three pyramids, three guardians,
//    not an ounce of mercy for those who dared enter
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#curse-of-the-pharaohs-original',
  title: 'La malédiction originelle des pharaons',
  subtitle: 'Les gardiens antiques qui brisaient les esprits',
  excerpt:
    'Des siècles avant que la tombe de Toutânkhamon ne fasse la une des journaux, les savants arabes du Caire médiéval écrivaient sur quelque chose de bien plus ancien au cœur des pyramides : des esprits vivants liés à la pierre, tapis dans l\'obscurité, attendant les imprudents.',
  moralOrLesson:
    'Les anciens savaient que les plus grands trésors exigent la plus redoutable des protections — et que tous les gardiens ne se voient pas.',
  paragraphs: [
    {
      text: 'Tout le monde connaît la malédiction de Toutânkhamon — la tombe ouverte en 1922, les morts mystérieuses. Mais c\'est la version d\'Hollywood. Des siècles avant qu\'un archéologue européen ne mette le pied dans une pyramide, les savants arabes du Caire médiéval écrivaient sur quelque chose de bien plus ancien. Pas des inscriptions maudites gravées dans les murs. Des gardiens vivants — des esprits que les pharaons eux-mêmes avaient liés à la pierre, tapis dans l\'obscurité, attendant quiconque serait assez fou pour entrer.',
    },
    {
      text: 'Le récit le plus détaillé nous vient d\'al-Maqrizi, un historien égyptien du XVe siècle qui a rassemblé des traditions orales déjà anciennes à son époque — des histoires remontant à l\'âge des pharaons eux-mêmes. D\'après ce qu\'il a consigné, les rois bâtisseurs de pyramides n\'étaient pas seulement des génies de l\'architecture. Ils maîtrisaient autre chose. Avant de sceller leurs tombes, ils accomplissaient des rituels pour invoquer des djinns — des esprits puissants du monde invisible — et les enchaîner à ces lieux comme gardiens éternels.',
    },
    {
      text: 'Le gardien le plus redouté de la Grande Pyramide prenait la forme d\'une femme d\'une beauté surnaturelle. Elle apparaissait aux hommes qui s\'aventuraient la nuit, et la voir suffisait à les détruire. Ils ressortaient muets, incapables de reconnaître leur propre famille. Certains s\'enfonçaient dans le désert et ne revenaient jamais. Les rares qui retrouvaient un semblant de raison ne pouvaient dire qu\'une chose : cette beauté dépassait tellement l\'humain que l\'esprit ne pouvait pas la contenir. Comme fixer le soleil — sauf que ça ne vous aveuglait pas. Ça vous brisait.',
    },
    {
      text: 'Le deuxième gardien avait l\'apparence d\'un garçon à la peau couleur de miel et aux yeux dorés qui brillaient comme des lanternes dans le noir. Ce djinn visait les pilleurs de tombes. Il apparaissait juste devant eux dans les tunnels, toujours hors de portée, les entraînant toujours plus profond dans des passages qui se refermaient et changeaient de forme derrière eux. On en a retrouvé certains des années plus tard — scellés dans des chambres sans entrée visible, les cheveux devenus blancs, l\'esprit définitivement perdu.',
    },
    {
      text: 'La troisième pyramide — celle de Mykérinos, la plus petite de Gizeh — avait son propre protecteur : une silhouette enveloppée dans une colonne de sable tourbillonnant. Quand elle avançait dans les couloirs, toutes les torches s\'éteignaient d\'un coup. Noir total. Et dans ce noir, des voix — dans une langue morte depuis trois mille ans. Comme on dit : jamais deux sans trois. Trois pyramides, trois gardiens, et pas la moindre pitié pour ceux qui osaient entrer. Les explorateurs arabes récitaient le Coran avant de faire un seul pas à l\'intérieur.',
    },
    {
      text: 'Les historiens modernes balaient tout ça — du folklore, rien de plus. Mais ceux qui vivent à l\'ombre des pyramides racontent autre chose. Les gardiens de nuit parlent de zones de froid inexplicable dans des chambres scellées. Les ouvriers entendent de la pierre glisser contre de la pierre dans des salles où rien ne bouge. Et presque tous décrivent la même chose : un sentiment lourd, impossible à ignorer, d\'être observé par quelque chose d\'ancien et de conscient. Quatre mille cinq cents ans plus tard, les pyramides gardent leurs secrets. Et peut-être aussi leurs gardiens.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Der Urfluch der Pharaonen»
//  Proverb: «Aller guten Dinge sind drei»
//  — subverted: but these three things were anything but good
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#curse-of-the-pharaohs-original',
  title: 'Der Urfluch der Pharaonen',
  subtitle: 'Die uralten Wächter, die den Verstand zerbrechen',
  excerpt:
    'Jahrhunderte bevor Tutanchamuns Grab Schlagzeilen machte, schrieben arabische Gelehrte im mittelalterlichen Kairo über etwas viel Älteres in den Pyramiden: lebendige Geister, an den Fels gebunden, wartend in der Dunkelheit auf jeden Eindringling.',
  moralOrLesson:
    'Die Alten wussten, dass die größten Schätze den furchtbarsten Schutz verlangen — und dass nicht alle Wächter mit bloßem Auge zu sehen sind.',
  paragraphs: [
    {
      text: 'Jeder kennt die Geschichte: 1922 wird Tutanchamuns Grab geöffnet, und die Leute, die dabei waren, sterben auf mysteriöse Weise. Aber das ist die Version, die uns Hollywood verkauft hat. Jahrhunderte bevor der erste europäische Archäologe je einen Fuß in eine Pyramide setzte, schrieben arabische Gelehrte im mittelalterlichen Kairo über etwas viel Älteres und viel Unheimlicheres. Keine in Stein gemeißelten Flüche. Lebendige Wächter — Geister, die die Pharaonen selbst an den Fels gebunden hatten, wartend in der Dunkelheit auf jeden, der dumm genug war, einzutreten.',
    },
    {
      text: 'Den ausführlichsten Bericht hinterließ al-Maqrizi, ein ägyptischer Historiker aus dem 15. Jahrhundert, der mündliche Überlieferungen sammelte, die schon zu seiner Zeit uralt waren — Geschichten, die bis in die Ära der Pharaonen selbst zurückreichten. Laut seinen Aufzeichnungen waren die Könige, die die Pyramiden errichteten, nicht nur geniale Baumeister. Sie beherrschten etwas anderes. Vor der Versiegelung ihrer Gräber führten sie Rituale durch, um Dschinn heraufzubeschwören — mächtige Geister der unsichtbaren Welt — und banden sie als ewige Wächter an diese Orte.',
    },
    {
      text: 'Der gefürchtetste Wächter der Großen Pyramide erschien als eine Frau von verheerender Schönheit. Sie zeigte sich Männern, die nachts eindrangen, und allein ihr Anblick zerstörte sie. Sie taumelten hinaus, unfähig zu sprechen, unfähig, ihre eigenen Familien zu erkennen. Manche liefen in die Wüste und kamen nie zurück. Die wenigen, die sich halbwegs erholten, konnten nur eines sagen: Diese Schönheit lag so weit jenseits alles Menschlichen, dass der Verstand sie nicht fassen konnte. Wie in die Sonne starren — nur schlimmer. Es machte nicht blind. Es zerbrach einen von innen.',
    },
    {
      text: 'Der zweite Wächter hatte die Gestalt eines Jungen mit honigfarbener Haut und goldenen Augen, die in der Dunkelheit wie Laternen leuchteten. Dieser Dschinn hatte es auf Grabräuber abgesehen. Er tauchte direkt vor ihnen in den Tunneln auf, immer außer Reichweite, und lockte sie immer tiefer in Gänge, die sich hinter ihnen verschoben und verschlossen. Einige dieser Eindringlinge wurden Jahre später gefunden — eingemauert in Kammern ohne sichtbaren Eingang. Die Haare schneeweiß. Der Verstand — unwiederbringlich verloren.',
    },
    {
      text: 'Die dritte Pyramide — die des Mykerinos, die kleinste in Gizeh — hatte ihren eigenen Beschützer: eine Gestalt, gehüllt in eine wirbelnde Säule aus Sand. Wenn sie sich durch die Gänge bewegte, erlosch jede Fackel. Absolute Finsternis. Und in dieser Finsternis Stimmen — in einer Sprache, die seit dreitausend Jahren tot war. Man sagt: Aller guten Dinge sind drei. Nur waren diese Dinge alles andere als gut. Drei Pyramiden, drei Wächter, kein Erbarmen. Die arabischen Entdecker rezitierten den Koran, bevor sie auch nur einen Fuß hineinsetzten.',
    },
    {
      text: 'Moderne Historiker tun all das als Folklore ab. Aber die Menschen, die im Schatten der Pyramiden leben und arbeiten, erzählen etwas anderes. Nachtwächter berichten von unerklärlichen Kältezonen in versiegelten Kammern ohne jede Belüftung. Arbeiter hören Stein auf Stein mahlen in Räumen, in denen sich nichts bewegt. Und fast alle beschreiben dasselbe: ein schweres, unverkennbares Gefühl, von etwas Uraltem und Wachem beobachtet zu werden. Viertausendfünfhundert Jahre später hüten die Pyramiden noch immer ihre Geheimnisse. Und vielleicht auch ihre Wächter.',
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

  console.log('=== All 3 languages pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
