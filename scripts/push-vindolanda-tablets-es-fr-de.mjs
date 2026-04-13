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
  siteId: 'hadrians-wall',
  storyId: 'vindolanda-tablets',
  icon: '\u{1F4DC}',
  tier: 'A',
  source: 'Robin Birley, "Vindolanda: A Roman Frontier Fort on Hadrian\'s Wall" (2009); Alan K. Bowman, "Life and Letters on the Roman Frontier: Vindolanda and its People" (2003); Tab. Vindol. II 291 (Claudia Severa\'s birthday invitation); British Museum Vindolanda Tablets Online (vindolanda.csad.ox.ac.uk)',
  characters: [
    'Robin Birley',
    'Andrew Birley',
    'Claudia Severa',
    'Sulpicia Lepidina',
    'Flavius Cerialis (Prefect of the Ninth Cohort of Batavians)',
    'The unnamed soldier requesting socks and underpants',
  ],
  era: 'Late 1st to early 2nd century AD (c. AD 85-130)',
  readingTimeMinutes: 4,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: -2.3615, lat: 55.0265 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «Vindolanda — Voces del fin del mundo»
//  Proverb: «Las palabras se las lleva el viento»
//  — subverted: "Dicen que las palabras se las lleva el
//    viento. Pero estas las guardó el barro."
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#vindolanda-tablets',
  title: 'Vindolanda — Voces del fin del mundo',
  subtitle: 'Finas láminas de madera que hablan tras dos mil años de silencio',
  excerpt: 'Primavera de 1973. Robin Birley, arqueólogo británico, excavaba en el barro empapado de Vindolanda, un fuerte romano justo al sur del Muro de Adriano, en el norte de Inglaterra.',
  moralOrLesson: 'Los descubrimientos históricos más poderosos no son siempre tesoros de oro ni inscripciones monumentales. A veces son las palabras más pequeñas y cotidianas las que nos recuerdan, a través de milenios, que siempre hemos sido lo mismo: seres que necesitan abrigo, amistad y alguien con quien celebrar un cumpleaños.',
  paragraphs: [
    {
      text: 'Primavera de 1973. Robin Birley, arqueólogo británico, excavaba en el barro empapado de Vindolanda, un fuerte romano justo al sur del Muro de Adriano, en el norte de Inglaterra. Entre el lodo encontró unas láminas finísimas de madera de abedul. Pensó que eran restos de algún taller. Hasta que las puso a contraluz y vio palabras en latín, escritas con tinta sobre una superficie más fina que una postal. Tenían casi mil novecientos años. Y estaban a punto de hacer hablar a los muertos.',
    },
    {
      text: 'Birley había encontrado una cápsula del tiempo. El fuerte se reconstruyó varias veces desde el año 85 d.C., y cada obra enterró la capa anterior bajo tierra húmeda sin oxígeno — justo la condición en la que la madera y la tinta sobreviven. Su hijo Andrew siguió excavando durante décadas. Entre los dos, han sacado más de mil seiscientas tablillas del barro. No eran decretos de emperadores ni discursos solemnes. Eran notas del día a día entre soldados, esposas y oficiales. Y eso es justamente lo que las hace extraordinarias.',
    },
    {
      text: 'La tablilla más famosa es una invitación de cumpleaños. Claudia Severa, esposa de un oficial de un fuerte cercano, le escribe a su amiga Sulpicia Lepidina en Vindolanda: «Te invito con todo cariño a que vengas, para que tu llegada haga mi día más feliz». La carta la redactó un escriba. Pero al final, con su propia letra temblorosa, Claudia añadió seis palabras: «Te estaré esperando, hermana». Esas seis palabras son el texto en latín más antiguo escrito por una mujer en todo el mundo romano.',
    },
    {
      text: 'Y luego está la carta de un soldado — probablemente un recluta extranjero al servicio de Roma — que escribe a casa para pedir provisiones: «Te envío... pares de calcetines, dos pares de sandalias y dos pares de calzoncillos». Así es: esta es la primera mención de ropa interior en toda la historia de Britania. Olvídate de armaduras de bronce y gritos de batalla. Era un tipo muerto de frío en una frontera empapada de lluvia, pidiendo calcetines limpios a su familia. Eso no es mito. Eso es un martes cualquiera.',
    },
    {
      text: 'Otras tablillas son igual de reveladoras. Una es una súplica: «Los soldados no tienen cerveza. Que envíen un poco, por favor». Otra es un informe: de 752 soldados asignados a una unidad, solo 296 estaban presentes y en condiciones. El resto, enfermos, heridos o destinados a otro sitio. Y hay una nota de inteligencia que llama a los locales «Brittunculi» — algo así como «los británicos de pacotilla» — y se ríe de que ni siquiera llevan armadura de verdad. Suena a chat militar: pura chulería y cero respeto.',
    },
    {
      text: 'Dicen que las palabras se las lleva el viento. Pero estas las guardó el barro. Y lo que cuentan golpea fuerte. Aquellos soldados no eran romanos de Roma. Eran bátavos de lo que hoy son los Países Bajos, tungrios de Bélgica, galos de Francia — hombres reclutados en tierras conquistadas y enviados a una isla fría y gris en el confín del mundo conocido. Sus cartas están llenas de pequeños actos desesperados de conexión: una madre que envía calcetines a su hijo, amigos que organizan cumpleaños, oficiales que intercambian chismes.',
    },
    {
      text: 'A las tablillas las llaman «los emails romanos», y es una descripción perfecta. Son breves, desordenadas, llenas de abreviaturas y profundamente personales. Las excavaciones en Vindolanda siguen: el equipo de Andrew Birley saca tablillas nuevas del barro cada temporada. Y todas dicen lo mismo: la distancia entre nosotros y la gente que vivió hace dos mil años es mucho más pequeña de lo que creemos. Ellos necesitaban ropa de abrigo, cerveza fría y alguien con quien celebrar un cumpleaños. Nosotros también.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Vindolanda — Voix du bout du monde»
//  Proverb: «Les paroles s'envolent, les écrits restent»
//  — subverted: nobody expected it to apply to scraps of
//    birch wood buried in mud for two thousand years
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#vindolanda-tablets',
  title: 'Vindolanda — Voix du bout du monde',
  subtitle: 'De fines lamelles de bois qui parlent après deux mille ans de silence',
  excerpt: `Printemps 1973. Un archéologue britannique du nom de Robin Birley fouillait la boue noire et gorgée d'eau de Vindolanda — un fort militaire romain juste au sud du mur d'Hadrien, dans le nord de l'Angleterre.`,
  moralOrLesson: `Les découvertes historiques les plus marquantes ne sont pas toujours des trésors d'or ou des inscriptions monumentales — parfois ce sont les mots les plus ordinaires qui nous rappellent, à travers les millénaires, que nous avons toujours été les mêmes : des êtres qui ont besoin de chaleur, d'amitié et de quelqu'un avec qui fêter un anniversaire.`,
  paragraphs: [
    {
      text: `Printemps 1973. Un archéologue britannique du nom de Robin Birley fouillait la boue noire et gorgée d'eau de Vindolanda — un fort militaire romain juste au sud du mur d'Hadrien, dans le nord de l'Angleterre. Il a repéré de fines lamelles de bois dans la vase et les a prises pour des chutes d'atelier. Puis il en a levé une vers la lumière. Des mots en latin y étaient tracés à l'encre, sur du bois de bouleau plus fin qu'une carte postale. Cette lamelle avait presque mille neuf cents ans. Et elle allait faire parler les morts.`,
    },
    {
      text: `Birley avait mis la main sur une capsule temporelle. Le fort avait été reconstruit plusieurs fois à partir de 85 après J.-C., et chaque chantier avait enfoui la couche précédente sous un sol gorgé d'eau, sans oxygène — la seule condition où le bois et l'encre survivent. Son fils Andrew a pris la relève. À eux deux, ils ont sorti du sol plus de mille six cents tablettes. Pas des décrets d'empereurs. Pas de discours solennels. Juste des petits mots entre soldats, épouses et officiers. Et c'est justement ce qui les rend extraordinaires.`,
    },
    {
      text: `La tablette la plus célèbre est une invitation d'anniversaire. Claudia Severa, femme d'un officier d'un fort voisin, écrit à son amie Sulpicia Lepidina, à Vindolanda : « Je t'invite chaleureusement à venir, pour que ta présence rende ma journée plus agréable. » Un scribe a rédigé le gros de la lettre. Mais tout en bas, de sa propre écriture maladroite, Claudia a ajouté six mots : « Je t'attendrai, ma sœur. » Ces six mots sont le plus ancien texte en latin écrit de la main d'une femme dans tout l'Empire romain.`,
    },
    {
      text: `Et puis il y a la lettre d'un soldat — sûrement une recrue étrangère au service de Rome — qui écrit chez lui pour réclamer des fournitures : « Je t'ai envoyé… des paires de chaussettes, deux paires de sandales et deux paires de caleçons. » Oui, vous avez bien lu : c'est la toute première mention de sous-vêtements dans l'histoire de la Bretagne romaine. Oubliez les armures de bronze et les cris de guerre. C'était un gars qui crevait de froid sur une frontière trempée de pluie et qui demandait des chaussettes propres à sa famille. Ça, c'est pas de la légende. C'est juste le quotidien.`,
    },
    {
      text: `D'autres tablettes sont tout aussi parlantes. L'une est un appel au secours : « Les soldats n'ont plus de bière — faites-en envoyer, s'il vous plaît. » Une autre est un rapport de troupes : sur 752 soldats affectés à une unité, seuls 296 étaient présents et aptes — les autres malades, blessés ou mutés ailleurs. Et il y a cette note de renseignement qui qualifie les autochtones de « Brittunculi » — en gros, « ces minables petits Bretons » — et se moque qu'ils ne portent même pas de vraie armure. On dirait un groupe WhatsApp militaire : rien que de l'arrogance, zéro respect.`,
    },
    {
      text: `On dit que les paroles s'envolent, les écrits restent. Personne n'imaginait que ça vaudrait pour des bouts de bois enfouis dans la boue pendant deux mille ans. Ces soldats n'étaient pas des Romains de Rome. C'étaient des Bataves de l'actuelle Hollande, des Tongres de Belgique, des Gaulois — des hommes recrutés dans des terres conquises et envoyés sur une île froide et grise au bout du monde connu. Leurs lettres débordent de petits gestes pour garder le lien : une mère qui envoie des chaussettes à son fils, des amis qui planifient un anniversaire, des officiers qui échangent des ragots.`,
    },
    {
      text: `On surnomme ces tablettes « les e-mails de l'Antiquité », et franchement, c'est parfait. Elles sont courtes, brouillonnes, pleines d'abréviations et profondément personnelles. Les fouilles à Vindolanda continuent — l'équipe d'Andrew Birley sort de nouvelles tablettes de la terre chaque saison. Et chacune dit la même chose : le fossé entre nous et ceux qui vivaient il y a deux mille ans est bien plus mince qu'on ne le croit. Ils avaient besoin de vêtements chauds, de bière fraîche et de quelqu'un avec qui fêter un anniversaire. Nous aussi.`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Vindolanda — Stimmen vom Rand der Welt»
//  Proverb: «Papier ist geduldig»
//  — subverted: "Papier ist geduldig, sagen wir. Birkenholz,
//    wie sich zeigt, noch geduldiger — 1900 Jahre lang."
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#vindolanda-tablets',
  title: 'Vindolanda — Stimmen vom Rand der Welt',
  subtitle: 'Hauchdünne Holztäfelchen, die nach zweitausend Jahren Schweigen sprechen',
  excerpt: 'Frühling 1973. Ein britischer Archäologe namens Robin Birley grub sich durch den schwarzen, durchnässten Schlamm von Vindolanda — einem römischen Militärlager direkt südlich des Hadrianswalls im Norden Englands.',
  moralOrLesson: 'Die bedeutendsten historischen Entdeckungen sind nicht immer goldene Schätze oder monumentale Inschriften — manchmal sind es die alltäglichsten menschlichen Worte, die uns über Jahrtausende hinweg daran erinnern, dass wir immer gleich waren: Wesen, die Wärme, Freundschaft und jemanden zum Geburtstagfeiern brauchen.',
  paragraphs: [
    {
      text: 'Frühling 1973. Ein britischer Archäologe namens Robin Birley grub sich durch den schwarzen, durchnässten Schlamm von Vindolanda — einem römischen Militärlager direkt südlich des Hadrianswalls im Norden Englands. Im Matsch entdeckte er hauchdünne Holzsplitter und hielt sie für Abfälle einer Tischlerwerkstatt. Dann hob er einen gegen das Licht. Da standen Worte — blasse lateinische Buchstaben, mit Tinte auf Birkenholz geschrieben, dünner als eine Postkarte. Das Stück Holz war fast neunzehnhundert Jahre alt. Und es war dabei, die Toten zum Sprechen zu bringen.',
    },
    {
      text: 'Was Birley gefunden hatte, war eine Zeitkapsel. Das Fort war ab etwa 85 n. Chr. mehrfach umgebaut worden, und jeder Umbau begrub die darunterliegende Schicht unter feuchtem, sauerstofffreiem Boden — genau die Bedingung, unter der Holz, Leder und Tinte überdauern. Sein Sohn Andrew setzte die Grabungen fort. Zusammen haben sie über eintausendsechshundert Holztäfelchen aus der Erde geholt. Keine Kaiserdekrete. Keine feierlichen Reden. Einfach Soldaten, Ehefrauen und Offiziere, die sich Alltagsnotizen schrieben. Und genau das macht sie so außergewöhnlich.',
    },
    {
      text: 'Die berühmteste Tafel ist eine Geburtstagseinladung. Claudia Severa, Frau eines Offiziers aus einem Nachbarfort, schreibt an ihre Freundin Sulpicia Lepidina in Vindolanda: „Ich lade dich herzlich ein zu kommen, damit dein Besuch meinen Tag schöner macht." Den Brief hat ein Schreiber verfasst. Aber ganz unten, in ihrer eigenen unsicheren Handschrift, fügte Claudia sechs Worte hinzu: „Ich werde auf dich warten, Schwester." Diese sechs Worte sind der älteste lateinische Text, den eine Frau in der gesamten römischen Welt geschrieben hat.',
    },
    {
      text: 'Dann ist da der Brief eines Soldaten — wahrscheinlich ein ausländischer Rekrut im Dienst Roms — der nach Hause schreibt und um Nachschub bittet: „Ich habe dir geschickt… Paar Socken, zwei Paar Sandalen und zwei Paar Unterhosen." Richtig gelesen: Das ist die allererste Erwähnung von Unterwäsche in der gesamten Geschichte Britanniens. Vergiss Bronzerüstungen und Schlachtrufe. Das war ein Typ, der auf einem verregneten, eiskalten Grenzposten festsaß und seine Familie um saubere Socken bat. Das ist kein Mythos. Das ist Alltag.',
    },
    {
      text: 'Andere Tafeln sind genauso aufschlussreich. Eine ist ein Hilferuf: „Die Soldaten haben kein Bier mehr — bitte welches schicken lassen." Eine andere ist ein Truppenbericht: Von 752 Soldaten einer Einheit waren nur 296 anwesend und einsatzfähig — der Rest krank, verwundet oder woanders abgestellt. Und dann gibt es die Geheimdienstnotiz, die die Einheimischen als „Brittunculi" bezeichnet — ungefähr: „die erbärmlichen kleinen Briten" — und sich darüber lustig macht, dass sie nicht mal richtige Rüstungen tragen. Das liest sich wie ein Militär-Gruppenchat: pure Arroganz, null Respekt.',
    },
    {
      text: 'Papier ist geduldig, sagen wir. Birkenholz, wie sich zeigt, noch geduldiger — neunzehnhundert Jahre lang. Und was diese Tafeln erzählen, trifft ins Mark. Die Soldaten waren keine Römer aus Rom. Es waren Bataver aus den heutigen Niederlanden, Tungrer aus Belgien, Gallier aus Frankreich — Männer, die in eroberten Gebieten eingezogen und an eine kalte, graue Insel am Rand der bekannten Welt geschickt wurden. Ihre Briefe stecken voller verzweifelter Versuche, den Kontakt zu halten: eine Mutter, die Socken schickt, Freunde, die Geburtstage planen, Offiziere, die Klatsch austauschen.',
    },
    {
      text: 'Man nennt die Tafeln „die E-Mails der Antike", und ehrlich gesagt passt das perfekt. Sie sind kurz, unordentlich, voller Abkürzungen und zutiefst persönlich. Die Ausgrabungen in Vindolanda gehen weiter — Andrew Birleys Team holt jede Saison neue Tafeln aus der Erde. Und jede sagt dasselbe: Der Abstand zwischen uns und den Menschen vor zweitausend Jahren ist viel kleiner, als wir denken. Sie brauchten warme Kleidung, kaltes Bier und jemanden, mit dem sie einen Geburtstag feiern konnten. Wir auch.',
    },
  ],
};

// ─── Push all three ─────────────────────────────────────
async function push(langObj, label) {
  const item = { ...base, ...langObj };
  try {
    await docClient.send(
      new PutCommand({ TableName: TABLE, Item: item })
    );
    console.log(`✅  ${label} pushed successfully (langStoryId: ${langObj.langStoryId})`);
  } catch (err) {
    console.error(`❌  ${label} FAILED:`, err.message);
    throw err;
  }
}

(async () => {
  console.log(`\nPushing Vindolanda Tablets stories (updatedAt: ${now})\n`);
  await push(es, 'SPANISH');
  await push(fr, 'FRENCH');
  await push(de, 'GERMAN');
  console.log('\n🎉  All three languages pushed successfully!\n');
})();
