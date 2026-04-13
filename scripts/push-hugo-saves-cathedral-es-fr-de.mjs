import { readFileSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// ─── Load .env.local ─────────────────────────────────────
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

// ─── Shared fields (from English original) ───────────────
const base = {
  siteId: 'notre-dame-de-paris',
  storyId: 'hugo-saves-cathedral',
  icon: '\u{1F4D6}',
  tier: 'S',
  source:
    'Victor Hugo, "Notre-Dame de Paris" (1831); French National Assembly records on monument preservation; architectural history of Notre-Dame restoration',
  characters: [
    'Victor Hugo',
    'Quasimodo (fictional)',
    'Esmeralda (fictional)',
    'Eugène Viollet-le-Duc',
  ],
  era: '1831',
  readingTimeMinutes: 2,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 2.3499, lat: 48.853 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «El escritor que salvó Notre-Dame»
//
//  Proverb subverted: "Las palabras se las lleva el viento"
//  (Words are carried away by the wind)
//  → Hugo's words didn't blow away — they nailed a whole
//    cathedral into a nation's heart.
//
//  Register: modern storyteller, like a top-tier history
//  podcast in Spanish — vivid, direct, conversational.
// ═══════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: 'es',
  langStoryId: 'es#hugo-saves-cathedral',
  title: 'El escritor que salvó Notre-Dame',
  subtitle: '...un jorobado ficticio impidió la destrucción real de Notre-Dame',
  excerpt:
    'En los años 1820, Notre-Dame se moría. La catedral que llevaba seis siglos dominando el cielo de París se desmoronaba, y a nadie le importaba.',
  moralOrLesson:
    'Una historia bien contada puede salvar lo que ni ejércitos ni leyes consiguen — la ficción tiene el poder de hacernos amar lo que estábamos a punto de destruir.',
  paragraphs: [
    {
      text: 'En los años 1820, Notre-Dame se moría. La catedral que llevaba seis siglos dominando el cielo de París se desmoronaba, y a nadie le importaba. Durante la Revolución, las turbas habían reventado los vitrales, decapitado 28 estatuas de reyes bíblicos —confundiéndolos con monarcas franceses— y fundido las campanas para hacer balas de cañón. Hasta la rebautizaron «Templo de la Razón». Cuando Napoleón se coronó emperador ahí dentro en 1804, tuvieron que colgar tapices para tapar la ruina.',
    },
    {
      text: 'Y lo peor estaba por venir. Los funcionarios de París ya no discutían cómo reparar Notre-Dame, sino cuándo tirarla abajo. Por toda Francia, los edificios medievales se desmantelaban para aprovechar los materiales o se demolían como vergüenzas de la «Edad Oscura». Una de las catedrales más extraordinarias del mundo tenía los días contados, y casi nadie movía un dedo para salvarla.',
    },
    {
      text: 'Entonces un novelista de 29 años decidió plantarle cara a la piqueta. Victor Hugo ya era uno de los escritores más famosos de Francia, y estaba furioso. Veía cómo los edificios medievales desaparecían piedra a piedra y sabía que los discursos y las peticiones no iban a cambiar nada. Así que intentó algo que nadie había hecho: escribir una novela para que un país entero se enamorara de un edificio.',
    },
    {
      text: 'En 1831 publicó «Notre-Dame de Paris», la novela que probablemente conoces como «El jorobado de Notre-Dame». Cuenta la historia de Quasimodo, un campanero sordo y solitario que habita en las torres, y de Esmeralda, la bailarina a la que ama desde las sombras. Pero la verdadera protagonista no es ninguno de los dos: es la catedral. Hugo le dedicó capítulos enteros a la piedra, los rosetones, los arbotantes, hasta que el lector sentía que el edificio respiraba.',
    },
    {
      text: 'El libro fue un terremoto. De pronto, toda Francia hablaba de Notre-Dame — no como un estorbo ruinoso, sino como un tesoro nacional. Gente que jamás había pisado la catedral sentía que conocía cada gárgola por su nombre. Dicen que las palabras se las lleva el viento, pero las de Hugo le clavaron una catedral entera en el corazón a todo un país. La amenaza de demolición se esfumó de un día para otro.',
    },
    {
      text: 'En 1844, el gobierno lanzó una restauración monumental dirigida por el arquitecto Eugène Viollet-le-Duc. Durante dos décadas, reconstruyó la aguja, añadió las famosas gárgolas y le devolvió a Notre-Dame la imagen que hoy reconoce el mundo entero. Todo gracias a un libro.',
    },
    {
      text: 'Piensa en lo que hizo Hugo. Un solo escritor, armado únicamente con tinta e imaginación, salvó uno de los edificios más emblemáticos del planeta. No aprobó una ley ni levantó un ejército. Inventó a un jorobado de ficción y consiguió que toda una nación viera belleza donde antes solo veía escombros. A veces, la pluma puede más que la bola de demolición.',
    },
    {
      text: 'Cuando Notre-Dame ardió el 15 de abril de 2019, casi mil millones de personas siguieron las llamas en directo. Desconocidos se quedaron de pie a orillas del Sena con lágrimas en la cara. Y, lo supieran o no, todos estaban llorando por algo que Victor Hugo les había enseñado a querer casi doscientos años antes. Una sola historia, bien contada, había hecho inmortal a un edificio.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Le roman qui a sauvé Notre-Dame»
//
//  Proverb subverted: "Les paroles s'envolent, les écrits
//  restent" (Spoken words fly away, writings remain)
//  → Hugo's writings didn't just remain — they saved a
//    whole cathedral.
//
//  NOTE: This story is ABOUT France. The French reader owns
//  this history. The tone is intimate, proud, and direct —
//  not explaining France to outsiders, but telling a French
//  reader their own story with fresh eyes.
// ═══════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: 'fr',
  langStoryId: 'fr#hugo-saves-cathedral',
  title: 'Le roman qui a sauvé Notre-Dame',
  subtitle: '...un bossu de fiction a empêché la destruction de Notre-Dame',
  excerpt:
    'Dans les années 1820, Notre-Dame agonisait. La cathédrale qui veillait sur Paris depuis six siècles tombait en ruine, et tout le monde s\u2019en fichait.',
  moralOrLesson:
    'Une histoire bien racontée peut sauver ce que ni les armées ni les lois ne peuvent — la fiction a le pouvoir de nous faire aimer ce que nous étions sur le point de détruire.',
  paragraphs: [
    {
      text: 'Dans les années 1820, Notre-Dame agonisait. La cathédrale qui veillait sur Paris depuis six siècles tombait en ruine, et tout le monde s\u2019en fichait. Pendant la Révolution, des foules déchaînées avaient fracassé les vitraux, décapité 28 statues de rois bibliques — les prenant pour des monarques français — et fondu les grandes cloches pour en faire des boulets de canon. On l\u2019avait même rebaptisée « Temple de la Raison ». Quand Napoléon s\u2019y est fait couronner empereur en 1804, il a fallu tendre des tapisseries pour masquer le désastre.',
    },
    {
      text: 'Et le pire restait à venir. À l\u2019Hôtel de Ville, on ne débattait plus de la restauration de Notre-Dame — on débattait de sa démolition. Partout en France, les bâtiments médiévaux étaient dépecés pour leurs matériaux ou tout simplement rasés, reliques honteuses d\u2019un « Moyen Âge obscur ». L\u2019une des plus grandes cathédrales jamais bâties allait disparaître, et presque personne ne s\u2019y opposait.',
    },
    {
      text: 'C\u2019est alors qu\u2019un romancier de 29 ans a décidé de se dresser face aux démolisseurs. Victor Hugo était déjà l\u2019un des écrivains les plus célèbres du pays, et il bouillait de rage. Il voyait les édifices médiévaux disparaître pierre après pierre et savait que les discours et les pétitions n\u2019y changeraient rien. Alors il a tenté quelque chose d\u2019inédit : écrire un roman capable de faire tomber tout un pays amoureux d\u2019un bâtiment.',
    },
    {
      text: 'En 1831, il publie « Notre-Dame de Paris ». L\u2019histoire de Quasimodo, un sonneur de cloches sourd et solitaire qui vit dans les tours, et d\u2019Esmeralda, la danseuse qu\u2019il aime en secret. Mais le vrai personnage principal, ce n\u2019est ni l\u2019un ni l\u2019autre — c\u2019est la cathédrale elle-même. Hugo consacre des chapitres entiers à la pierre, aux rosaces, aux arcs-boutants, jusqu\u2019à donner au lecteur l\u2019impression que l\u2019édifice respire.',
    },
    {
      text: 'Le livre a fait l\u2019effet d\u2019une bombe. Du jour au lendemain, toute la France parlait de Notre-Dame — plus comme d\u2019une ruine encombrante, mais comme d\u2019un trésor national. Des gens qui n\u2019y avaient jamais mis les pieds avaient l\u2019impression de connaître chaque gargouille par son prénom. On dit que les paroles s\u2019envolent et que les écrits restent — mais ceux de Hugo ont fait bien plus que rester : ils ont sauvé une cathédrale.',
    },
    {
      text: 'En 1844, le gouvernement lance une restauration d\u2019envergure, confiée à l\u2019architecte Eugène Viollet-le-Duc. Pendant vingt ans, il reconstruit la flèche, ajoute les célèbres gargouilles et redonne à Notre-Dame le visage que le monde entier lui connaît aujourd\u2019hui. Tout ça grâce à un roman.',
    },
    {
      text: 'Mesurez ce que Hugo a accompli. Un seul homme, armé d\u2019encre et d\u2019imagination, a sauvé l\u2019un des monuments les plus emblématiques de la planète. Pas de loi votée, pas d\u2019armée levée. Il a inventé un bossu de fiction — et a ouvert les yeux de toute une nation sur la beauté de pierres qu\u2019elle s\u2019apprêtait à réduire en poussière. Parfois, la plume est vraiment plus forte que le marteau du démolisseur.',
    },
    {
      text: 'Quand Notre-Dame a pris feu le 15 avril 2019, près d\u2019un milliard de personnes ont suivi les flammes en direct. Des inconnus se sont figés sur les quais de Seine, les larmes aux joues. Et sans forcément le savoir, tous pleuraient quelque chose que Victor Hugo leur avait appris à aimer presque deux siècles plus tôt. Une seule histoire, bien racontée, avait rendu un bâtiment immortel.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Der Roman, der Notre-Dame rettete»
//
//  Proverb subverted: "Totgesagte leben länger"
//  (Those declared dead live longer)
//  → Notre-Dame was "declared dead" — sentenced to
//    demolition — and here it stands, almost 200 years on.
//
//  Register: engaging modern narrator — the voice of a
//  skilled German history podcast host. Direct, vivid,
//  with punch.
// ═══════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: 'de',
  langStoryId: 'de#hugo-saves-cathedral',
  title: 'Der Roman, der Notre-Dame rettete',
  subtitle: '...ein fiktiver Glöckner verhinderte den Abriss von Notre-Dame',
  excerpt:
    'In den 1820er Jahren lag Notre-Dame im Sterben. Die Kathedrale, die sechs Jahrhunderte lang über Paris gewacht hatte, bröckelte vor sich hin — und niemanden kümmerte es.',
  moralOrLesson:
    'Eine gut erzählte Geschichte kann retten, was weder Armeen noch Gesetze vermögen — Fiktion hat die Kraft, Menschen dazu zu bringen, etwas zu lieben, das sie gerade zerstören wollten.',
  paragraphs: [
    {
      text: 'In den 1820er Jahren lag Notre-Dame im Sterben. Die Kathedrale, die sechs Jahrhunderte lang über Paris gewacht hatte, bröckelte vor sich hin — und niemanden kümmerte es. Während der Französischen Revolution hatten Mobs die Glasfenster zerschlagen, 28 Steinfiguren biblischer Könige enthauptet — sie hielten sie für französische Monarchen — und die großen Glocken zu Kanonenkugeln eingeschmolzen. Man taufte das Gebäude sogar in „Tempel der Vernunft" um. Als Napoleon sich 1804 dort zum Kaiser krönte, mussten Wandteppiche aufgehängt werden, um die Verwüstung zu verbergen.',
    },
    {
      text: 'Und es sollte noch schlimmer kommen. Die Pariser Stadtverwaltung diskutierte längst nicht mehr darüber, wie man Notre-Dame retten könnte — sondern wann man sie abreißen sollte. Überall in Frankreich wurden mittelalterliche Gebäude ausgeschlachtet oder als peinliche Überbleibsel der „finsteren Jahrhunderte" abgerissen. Eine der größten Kathedralen, die je gebaut worden waren, stand vor dem Aus, und fast niemand wehrte sich dagegen.',
    },
    {
      text: 'Dann beschloss ein 29-jähriger Schriftsteller, sich der Abrissbirne in den Weg zu stellen. Victor Hugo war bereits einer der berühmtesten Autoren Frankreichs, und er kochte vor Wut. Er sah, wie die mittelalterlichen Bauwerke Stein für Stein verschwanden, und wusste, dass Reden und Petitionen nichts daran ändern würden. Also versuchte er etwas, das noch niemand gewagt hatte: einen Roman zu schreiben, der ein ganzes Land dazu bringen sollte, sich in ein Gebäude zu verlieben.',
    },
    {
      text: '1831 erschien „Notre-Dame de Paris" — bekannt als „Der Glöckner von Notre-Dame". Die Geschichte von Quasimodo, einem tauben, einsamen Glöckner, der in den Türmen lebt, und Esmeralda, der Tänzerin, die er aus dem Schatten heraus liebt. Doch die eigentliche Hauptfigur ist keiner von beiden — es ist das Gebäude selbst. Hugo widmete ganze Kapitel dem Mauerwerk, den Rosettenfenstern, den Strebepfeilern, bis man als Leser das Gefühl hatte, die Kathedrale atme.',
    },
    {
      text: 'Das Buch schlug ein wie eine Bombe. Plötzlich sprach ganz Frankreich über Notre-Dame — nicht mehr als baufälligen Schandfleck, sondern als nationales Heiligtum. Menschen, die nie einen Fuß in die Kathedrale gesetzt hatten, glaubten, jeden Wasserspeier mit Namen zu kennen. Man sagt ja: Totgesagte leben länger. Aber dass ein Roman allein eine Kathedrale von der Abrissliste holen kann — das hatte niemand für möglich gehalten.',
    },
    {
      text: '1844 startete die Regierung eine umfassende Restaurierung unter der Leitung des Architekten Eugène Viollet-le-Duc. Zwanzig Jahre lang baute er die Turmspitze wieder auf, fügte die berühmten Wasserspeier hinzu und gab Notre-Dame das Gesicht zurück, das die Welt heute kennt. Alles wegen eines einzigen Buchs.',
    },
    {
      text: 'Man muss sich klarmachen, was Hugo da geschafft hat. Ein einzelner Schriftsteller, bewaffnet mit nichts als Tinte und Fantasie, rettete eines der berühmtesten Bauwerke der Erde. Kein Gesetz, keine Armee. Er erfand einen fiktiven Glöckner — und brachte eine ganze Nation dazu, Schönheit in Steinen zu sehen, die sie gerade zu Schutt machen wollte. Manchmal ist die Feder tatsächlich mächtiger als die Abrissbirne.',
    },
    {
      text: 'Als Notre-Dame am 15. April 2019 brannte, verfolgten fast eine Milliarde Menschen die Flammen live. Fremde standen am Ufer der Seine, Tränen im Gesicht. Und ob sie es wussten oder nicht — sie alle trauerten um etwas, das Victor Hugo sie fast zweihundert Jahre zuvor lieben gelehrt hatte. Eine einzige Geschichte, gut erzählt, hatte ein Gebäude unsterblich gemacht.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════

async function pushStory(record, label) {
  console.log(`\n── Pushing ${label} ──`);
  console.log(`   siteId:      ${record.siteId}`);
  console.log(`   langStoryId: ${record.langStoryId}`);
  console.log(`   title:       ${record.title}`);
  console.log(`   paragraphs:  ${record.paragraphs.length}`);

  // Validate before push
  if (!record.siteId || !record.langStoryId || !record.lang) {
    throw new Error(`Missing required keys for ${label}`);
  }
  if (!record.paragraphs || record.paragraphs.length < 6) {
    throw new Error(`Too few paragraphs for ${label}: ${record.paragraphs.length}`);
  }
  for (let i = 0; i < record.paragraphs.length; i++) {
    const p = record.paragraphs[i];
    if (!p.text || p.text.length === 0) {
      throw new Error(`Empty paragraph ${i} in ${label}`);
    }
    if (p.text.length > 600) {
      console.warn(`   ⚠ Paragraph ${i + 1} is ${p.text.length} chars (target ≤500)`);
    }
  }

  const totalChars = record.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`   total chars: ${totalChars}`);

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: record,
    })
  );
  console.log(`   ✓ ${label} pushed successfully`);
}

(async () => {
  try {
    await pushStory(es, 'SPANISH (es)');
    await pushStory(fr, 'FRENCH (fr)');
    await pushStory(de, 'GERMAN (de)');
    console.log('\n══ All 3 languages pushed successfully ══\n');
  } catch (err) {
    console.error('\n✗ PUSH FAILED:', err.message);
    console.error(err);
    process.exit(1);
  }
})();
