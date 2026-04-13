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
  siteId: 'mevlana-museum',
  storyId: 'reed-flute',
  icon: '\u{1F3B5}',
  tier: 'A',
  source: 'Rumi, Masnavi-ye-Ma\u2019navi, Book I; Franklin Lewis, Rumi: Past and Present, East and West',
  era: 'Seljuk Period (c. 1258 AD)',
  readingTimeMinutes: 2,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lat: 37.8719, lng: 32.5047 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'love_heartbreak',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «La flauta que llora»
//  Proverb: "Nadie sabe lo que tiene hasta que lo pierde"
//  — subverted: the reed DOES know what it had.
//    That's why it never stops weeping.
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#reed-flute',
  title: 'La flauta que llora',
  subtitle: 'El poema que dio voz a la nostalgia m\u00e1s antigua del mundo',
  excerpt: 'Konya, Turqu\u00eda, 1258. Un poeta destrozado por el dolor se sienta a escribir. Se llama Rumi, y lo que saldr\u00e1 de su pluma ser\u00e1 el lamento de una flauta de ca\u00f1a: las primeras l\u00edneas del poema m\u00e1s importante en lengua persa.',
  moralOrLesson: 'Toda a\u00f1oranza humana es el alma recordando su origen divino \u2014 nuestra tristeza m\u00e1s profunda es la nostalgia de un hogar que hemos olvidado.',
  characters: [
    'Mevlana Jalaluddin Rumi',
    'Shams de Tabriz',
    'La flauta de ca\u00f1a (ney)',
    'Derviches mevlev\u00edes',
  ],
  paragraphs: [
    {
      text: 'Konya, Turqu\u00eda, 1258. Un poeta destrozado por el dolor se sienta a escribir. Se llama Rumi, y lo que saldr\u00e1 de su pluma no ser\u00e1 filosof\u00eda ni teolog\u00eda. Ser\u00e1 un sonido: el lamento de una flauta de ca\u00f1a. Con esas primeras l\u00edneas nace el Masnavi, el poema m\u00e1s importante jam\u00e1s escrito en lengua persa. Y todo empieza con un instrumento hecho de una simple ca\u00f1a hueca.',
    },
    {
      text: '\u00abEscucha a la ca\u00f1a, c\u00f3mo se queja\u00bb, escribi\u00f3 Rumi. La flauta \u2014llamada ney\u2014 se fabrica con una ca\u00f1a arrancada de la orilla de un r\u00edo. Una vez cortada, jam\u00e1s puede volver a su lugar. Y cada nota que emite, cada sonido que sale de ella, es un grito de a\u00f1oranza. El ney no hace m\u00fasica. Llora. Est\u00e1 de luto por el lugar donde creci\u00f3, por la tierra que le fue arrebatada.',
    },
    {
      text: 'La met\u00e1fora es de una simplicidad brutal. La ca\u00f1a es el alma humana. La orilla del r\u00edo es lo divino \u2014Dios, el origen, ese lugar de donde venimos antes de nacer\u2014. Cada vez que sientes una inquietud que no sabes explicar, cada vez que te invade una tristeza sin motivo aparente, eso es la ca\u00f1a dentro de ti. Es tu alma recordando un hogar del que fue arrancada.',
    },
    {
      text: 'Rumi no escribi\u00f3 esto desde la teor\u00eda. Antes del Masnavi, hab\u00eda sufrido la p\u00e9rdida que le parti\u00f3 la vida en dos. Un m\u00edstico errante llamado Shams de Tabriz irrumpi\u00f3 en su mundo y lo puso todo patas arriba. Shams no era un maestro convencional: retaba a Rumi, lo provocaba, le arranc\u00f3 todo lo que cre\u00eda saber sobre Dios y sobre el amor. Y un d\u00eda desapareci\u00f3. Quiz\u00e1 lo asesinaron. Rumi nunca volvi\u00f3 a verlo.',
    },
    {
      text: 'Ese dolor lo abri\u00f3 en canal. Rumi pas\u00f3 de ser un respetado acad\u00e9mico religioso a convertirse en uno de los poetas m\u00e1s grandes de la historia. La p\u00e9rdida de Shams fue el motor de todo lo que escribi\u00f3. Cuando compuso el Masnavi \u2014seis libros tan venerados que los suf\u00edes lo llaman \u00abel Cor\u00e1n en persa\u00bb\u2014 lo abri\u00f3 con la flauta de ca\u00f1a. Porque dicen que nadie sabe lo que tiene hasta que lo pierde, pero la ca\u00f1a s\u00ed lo sabe. Y por eso no deja de llorar.',
    },
    {
      text: 'Ese poema dio origen a toda una pr\u00e1ctica espiritual. Los seguidores de Rumi fundaron la orden mevlev\u00ed: los derviches gir\u00f3vagos, esos hombres de blanco que giran sobre s\u00ed mismos en una danza hipn\u00f3tica. En sus ceremonias, siempre suena primero el ney. Las primeras notas son deliberadamente crudas, desgarradas, como el grito original de la ca\u00f1a. Despu\u00e9s empiezan a girar los derviches, con una palma hacia el cielo y la otra hacia la tierra. No act\u00faan. Rezan con el cuerpo.',
    },
    {
      text: 'Hoy, casi ocho siglos despu\u00e9s, Rumi es el poeta m\u00e1s vendido en Estados Unidos. Sus versos aparecen en tazas de caf\u00e9, tatuajes y publicaciones de Instagram. Pero esa imagen inicial \u2014la flauta de ca\u00f1a llorando porque recuerda de d\u00f3nde viene\u2014 sigue siendo la que m\u00e1s cala. Da igual lo que creas. Todo el mundo ha sentido alguna vez esa punzada, esa atracci\u00f3n hacia algo que no sabe nombrar.',
    },
    {
      text: 'La genialidad de Rumi fue condensar todo eso en unas pocas l\u00edneas sobre un trozo de madera hueca. Todos sentimos nostalgia de un hogar que no recordamos del todo, y la flauta de ca\u00f1a es el sonido de esa nostalgia hecha voz.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «La plainte du roseau»
//  Proverb: "Le c\u0153ur a ses raisons que la raison
//            ne conna\u00eet point" (Pascal)
//  — subverted: Pascal would have said that. Rumi
//    didn't need words. He had a reed to prove it.
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#reed-flute',
  title: 'La plainte du roseau',
  subtitle: 'Le po\u00e8me qui a donn\u00e9 une voix \u00e0 l\u2019exil de l\u2019\u00e2me',
  excerpt: 'Konya, Turquie, 1258. Un po\u00e8te ravag\u00e9 par le chagrin prend sa plume et \u00e9crit les premiers vers de ce qui deviendra le plus grand po\u00e8me jamais \u00e9crit en langue persane. Il s\u2019appelle Rumi.',
  moralOrLesson: 'Chaque aspiration humaine est l\u2019\u00e2me se souvenant de son origine divine \u2014 notre tristesse la plus profonde est la nostalgie d\u2019un foyer que nous avons oubli\u00e9.',
  characters: [
    'Mevlana Jalaluddin Rumi',
    'Shams de Tabriz',
    'La fl\u00fbte de roseau (ney)',
    'Derviches Mevlevis',
  ],
  paragraphs: [
    {
      text: 'Konya, Turquie, 1258. Un po\u00e8te ravag\u00e9 par le chagrin prend sa plume et couche sur le papier les premiers vers de ce qui deviendra le plus grand po\u00e8me jamais \u00e9crit en langue persane. Il s\u2019appelle Rumi. Et il ne commence ni par la sagesse, ni par la philosophie. Il commence par un son\u00a0: la plainte d\u2019une fl\u00fbte de roseau.',
    },
    {
      text: '\u00ab\u00a0\u00c9coute le roseau, \u00e9coute sa plainte\u00a0\u00bb, \u00e9crit Rumi. Cette fl\u00fbte \u2014\u00a0le ney\u00a0\u2014 est taill\u00e9e dans un roseau arrach\u00e9 \u00e0 la berge d\u2019une rivi\u00e8re. Une fois coup\u00e9, le roseau ne retrouvera jamais sa terre. Et chaque note qu\u2019il produit, chaque son qui s\u2019\u00e9chappe de lui, est un cri de manque. Le ney ne joue pas de la musique. Il pleure. Il porte le deuil du sol qui l\u2019a vu na\u00eetre.',
    },
    {
      text: 'La m\u00e9taphore est d\u2019une brutalit\u00e9 limpide. Le roseau, c\u2019est l\u2019\u00e2me humaine. La berge, c\u2019est le divin \u2014\u00a0Dieu, la source, l\u2019endroit d\u2019o\u00f9 nous venons avant de na\u00eetre. Chaque fois qu\u2019un malaise sans nom vous envahit, chaque fois qu\u2019une tristesse vous tombe dessus sans pr\u00e9venir, c\u2019est le roseau en vous. C\u2019est votre \u00e2me qui se souvient d\u2019un foyer dont elle a \u00e9t\u00e9 arrach\u00e9e.',
    },
    {
      text: 'Rumi n\u2019a pas invent\u00e9 \u00e7a dans le confort de son bureau. Avant le Masnavi, il avait travers\u00e9 la perte qui a bris\u00e9 sa vie en deux. Un mystique errant nomm\u00e9 Shams de Tabriz avait surgi dans son existence et tout boulevers\u00e9. Shams n\u2019\u00e9tait pas un ma\u00eetre ordinaire\u00a0: il d\u00e9fiait Rumi, le poussait dans ses retranchements, lui arrachait toutes ses certitudes sur Dieu et sur l\u2019amour. Puis il a disparu. Peut-\u00eatre assassin\u00e9. Rumi ne l\u2019a jamais revu.',
    },
    {
      text: 'Ce deuil l\u2019a ouvert comme une plaie. Rumi est pass\u00e9 d\u2019universitaire religieux respect\u00e9 \u00e0 l\u2019un des plus grands po\u00e8tes de l\u2019histoire. La perte de Shams est devenue le moteur de tout ce qu\u2019il a \u00e9crit. Quand il a compos\u00e9 le Masnavi \u2014\u00a0une \u00e9pop\u00e9e en six livres si v\u00e9n\u00e9r\u00e9e que les soufis l\u2019appellent \u00ab\u00a0le Coran en persan\u00a0\u00bb\u00a0\u2014, il l\u2019a ouvert avec la fl\u00fbte de roseau. Pascal dirait que le c\u0153ur a ses raisons que la raison ne conna\u00eet point. Rumi, lui, avait un roseau pour le prouver.',
    },
    {
      text: 'Ce po\u00e8me a engendr\u00e9 toute une tradition spirituelle. Les disciples de Rumi ont fond\u00e9 l\u2019ordre des Mevlevis \u2014\u00a0les derviches tourneurs, ces hommes en blanc qui pivotent sur eux-m\u00eames dans une danse envo\u00fbtante. Dans leurs c\u00e9r\u00e9monies, c\u2019est toujours le ney qui ouvre. Les premi\u00e8res notes sont volontairement rauques, d\u00e9chirantes, comme le cri originel du roseau. Puis les derviches commencent \u00e0 tourner, une paume vers le ciel, l\u2019autre vers la terre. Ils ne dansent pas. Ils prient avec leur corps.',
    },
    {
      text: 'Aujourd\u2019hui, pr\u00e8s de huit si\u00e8cles plus tard, Rumi est le po\u00e8te le plus vendu aux \u00c9tats-Unis. Ses vers se retrouvent sur des tasses, des tatouages, des posts Instagram. Mais cette image fondatrice \u2014\u00a0la fl\u00fbte de roseau qui pleure parce qu\u2019elle se souvient d\u2019o\u00f9 elle vient\u00a0\u2014 reste celle qui touche le plus profond\u00e9ment. Peu importe ce que vous croyez. Tout le monde a ressenti un jour cette douleur sourde, cet appel vers quelque chose qu\u2019on ne sait pas nommer.',
    },
    {
      text: 'Le g\u00e9nie de Rumi tient dans ces quelques vers sur un morceau de bois creux. Nous portons tous la nostalgie d\u2019un foyer que nous avons oubli\u00e9 \u2014\u00a0et la fl\u00fbte de roseau est le son de cette nostalgie qui a enfin trouv\u00e9 une voix.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Die Klage der Fl\u00f6te»
//  Cultural anchor: "Sehnsucht" — the untranslatable German
//  word for an intense longing for something absent.
//  Subverted: "Germans have a word for what Rumi described:
//  Sehnsucht. But Rumi didn't need a word. A flute was enough."
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#reed-flute',
  title: 'Die Klage der Fl\u00f6te',
  subtitle: 'Das Gedicht, das der Sehnsucht eine Stimme gab',
  excerpt: 'Konya, T\u00fcrkei, 1258. Ein Dichter, dem der Schmerz das Herz zerrissen hat, greift zur Feder und schreibt die ersten Zeilen dessen, was das bedeutendste Gedicht der persischen Sprache werden soll. Sein Name: Rumi.',
  moralOrLesson: 'Jede menschliche Sehnsucht ist die Erinnerung der Seele an ihren g\u00f6ttlichen Ursprung \u2014 unsere tiefste Trauer ist Heimweh nach einem Zuhause, das wir vergessen haben.',
  characters: [
    'Mevlana Dschalaluddin Rumi',
    'Schams-e Tabrizi',
    'Die Rohrfl\u00f6te (Ney)',
    'Mevlevi-Derwische',
  ],
  paragraphs: [
    {
      text: 'Konya, T\u00fcrkei, das Jahr 1258. Ein Dichter, dem der Schmerz das Herz zerrissen hat, greift zur Feder und schreibt die ersten Zeilen dessen, was das bedeutendste Gedicht der persischen Sprache werden soll. Sein Name: Rumi. Und er beginnt nicht mit Weisheit, nicht mit Philosophie. Er beginnt mit einem Klang \u2014 dem Klagen einer Rohrfl\u00f6te.',
    },
    {
      text: '\u201eH\u00f6r dem Rohr zu, wie es klagt\u201c, schrieb Rumi. Die Fl\u00f6te \u2014 im Persischen Ney genannt \u2014 wird aus einem Schilfrohr geschnitzt, das vom Ufer eines Flusses gerissen wurde. Einmal abgeschnitten, findet es nie wieder zur\u00fcck. Und jeder Ton, den es von sich gibt, jeder wehm\u00fctige Laut, ist ein Schrei der Sehnsucht. Das Ney macht keine Musik. Es trauert. Es beweint die Erde, aus der es gerissen wurde.',
    },
    {
      text: 'Die Metapher ist von brutaler Einfachheit. Das Rohr ist die menschliche Seele. Das Flussufer ist das G\u00f6ttliche \u2014 Gott, der Ursprung, der Ort, von dem wir kommen, bevor wir geboren werden. Jedes Mal, wenn dich eine Unruhe packt, die du dir nicht erkl\u00e4ren kannst, jedes Mal, wenn eine grundlose Traurigkeit \u00fcber dich hereinbricht \u2014 das ist das Rohr in dir. Deine Seele, die sich an eine Heimat erinnert, aus der sie vertrieben wurde.',
    },
    {
      text: 'Rumi hat sich das nicht am Schreibtisch ausgedacht. Vor dem Masnavi hatte er den Verlust erlebt, der sein Leben in zwei H\u00e4lften spaltete. Ein wandernder Mystiker namens Schams-e Tabrizi war in seine Welt eingebrochen und hatte alles auf den Kopf gestellt. Schams war kein gew\u00f6hnlicher Lehrer \u2014 er forderte Rumi heraus, provozierte ihn, riss ihm alles weg, was er \u00fcber Gott und Liebe zu wissen glaubte. Dann verschwand er. Vielleicht ermordet. Rumi hat ihn nie wiedergesehen.',
    },
    {
      text: 'Dieser Schmerz hat Rumi aufgebrochen. Er verwandelte sich vom angesehenen Religionsgelehrten in einen der gr\u00f6\u00dften Dichter der Menschheitsgeschichte. Der Verlust von Schams wurde zum Motor seines gesamten Werks. Als er das Masnavi verfasste \u2014 ein sechsb\u00e4ndiges Epos, so verehrt, dass die Sufis es \u201eden Koran auf Persisch\u201c nennen \u2014, er\u00f6ffnete er es mit der Rohrfl\u00f6te. Die Deutschen haben ein Wort f\u00fcr das, was Rumi beschrieb: Sehnsucht. Aber Rumi brauchte kein Wort. Ihm gen\u00fcgte eine Fl\u00f6te.',
    },
    {
      text: 'Dieses Gedicht brachte eine ganze spirituelle Tradition hervor. Rumis Anh\u00e4nger gr\u00fcndeten den Mevlevi-Orden \u2014 die Derwische, die sich in ihren wei\u00dfen Gew\u00e4ndern im Kreis drehen, bis alles andere verschwindet. In ihren Zeremonien erklingt immer zuerst das Ney. Die ersten T\u00f6ne sind absichtlich rau und klagend, wie der Urschrei des Rohrs. Dann beginnen die Derwische zu wirbeln, eine Handfl\u00e4che zum Himmel, die andere zur Erde. Sie tanzen nicht. Sie beten mit dem K\u00f6rper.',
    },
    {
      text: 'Heute, fast acht Jahrhunderte sp\u00e4ter, ist Rumi der meistverkaufte Dichter in den USA. Seine Verse landen auf Kaffeetassen, Tattoos und Instagram-Posts. Aber dieses Anfangsbild \u2014 die Rohrfl\u00f6te, die weint, weil sie wei\u00df, woher sie kommt \u2014 bleibt das, was am tiefsten trifft. Es spielt keine Rolle, woran du glaubst. Jeder hat diesen Stich schon gesp\u00fcrt, dieses Ziehen zu etwas, das man nicht benennen kann.',
    },
    {
      text: 'Rumis Genie lag darin, all das in ein paar Zeilen \u00fcber ein hohles St\u00fcck Holz zu fassen. Wir alle tragen Heimweh nach einem Ort, an den wir uns nicht ganz erinnern \u2014 und die Rohrfl\u00f6te ist der Klang dieses Heimwehs, dem endlich eine Stimme gegeben wurde.',
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
  console.log('=== Validating stories ===\n');

  console.log('--- ES ---');
  validate(es);

  console.log('--- FR ---');
  validate(fr);

  console.log('--- DE ---');
  validate(de);

  console.log('=== Pushing to DynamoDB ===\n');

  await pushStory(es);
  await pushStory(fr);
  await pushStory(de);

  console.log('=== Reed Flute (ES, FR, DE) — all pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
