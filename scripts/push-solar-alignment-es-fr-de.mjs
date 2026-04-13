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
  siteId: 'abu-simbel',
  storyId: 'solar-alignment-miracle',
  icon: '\u2600\uFE0F',
  tier: 'A',
  source: 'Desroches-Noblecourt, C. The Great Temple of Abu Simbel. Paris, 1968; UNESCO Technical Reports',
  characters: [
    'Ramesses II',
    'Amun-Ra',
    'Ra-Horakhty',
    'Ptah',
  ],
  era: 'New Kingdom (c. 1244 BC)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 31.6256, lat: 22.3369 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «El templo que atrapó al sol»
//  Proverb: «No hay dos sin tres»
// ═══════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: 'es',
  langStoryId: 'es#solar-alignment-miracle',
  title: 'El templo que atrapó al sol',
  subtitle: 'Dos veces al año, durante 3.200 años, el sol obedece a un faraón',
  excerpt:
    'En el sur de Egipto, un templo excavado en la roca guarda un secreto de tres mil años: dos veces al año, un rayo de sol cruza sesenta metros de piedra maciza para iluminar a tres dioses que esperan en la oscuridad.',
  moralOrLesson:
    'El arte más grande no es dominar la tecnología, sino entender el ritmo del universo. Lo que se construye con ese conocimiento dura más que cualquier imperio.',
  paragraphs: [
    {
      text: 'En el sur de Egipto, tallado en un acantilado a orillas del Nilo, hay un templo que lleva más de tres mil años guardando un secreto. Se llama Abu Simbel. Durante 363 días al año, su santuario más profundo permanece en oscuridad total. Pero el 22 de febrero y el 22 de octubre, al amanecer, un rayo de sol entra por la puerta oriental, cruza sesenta metros de roca maciza — salas, pasillos, cámaras — y llega hasta el corazón del templo. Allí, tres dioses de piedra esperan sentados en las tinieblas. Hasta que la luz los encuentra.',
    },
    {
      text: 'El rayo ilumina a tres figuras: Amón-Ra, rey de los dioses; Ra-Horajti, dios del sol naciente; y Ramsés II, el faraón que construyó Abu Simbel y tuvo la audacia de sentar su propia estatua entre los divinos. Los tres brillan en oro durante unos veinte minutos. Pero hay un cuarto — Ptah, el dios de la oscuridad — que permanece siempre en sombra. No es un fallo. Es el diseño. Hasta el sol sabe quién merece la luz y quién pertenece a la noche.',
    },
    {
      text: 'Lo que hace esto verdaderamente increíble es la fecha: alrededor de 1244 a.C. Sin telescopios. Sin ordenadores. Sin segunda oportunidad. Los ingenieros de Ramsés calcularon dónde saldría el sol en dos días concretos del año, determinaron el ángulo exacto y tallaron un templo entero en la montaña para que un hilo de luz recorriera sesenta metros y aterrizara justo donde tenía que aterrizar. No podías mover la montaña si te equivocabas. Tenías un intento. Y acertaron.',
    },
    {
      text: 'Las dos fechas — 22 de febrero y 22 de octubre — se asocian tradicionalmente con el cumpleaños de Ramsés II y el aniversario de su coronación. Los historiadores lo discuten, pero sinceramente, el debate no viene al caso. Alguien diseñó un edificio que hace que el sol rinda homenaje a un hombre según un calendario fijo. Y lleva haciéndolo más de tres mil años. Eso es un nivel de ambición que ningún arquitecto moderno ha igualado.',
    },
    {
      text: 'Cada año, miles de personas llegan a Abu Simbel antes del amanecer y esperan. Y cuando ocurre — cuando ese primer hilo de luz se cuela por la puerta y se arrastra sesenta metros por la piedra hasta que tres rostros antiguos arden en oro contra la negrura — no parece astronomía. Parece algo sagrado. Para los egipcios, eso era exactamente la idea: el dios Ra en persona, cruzando la puerta para visitar al faraón que se sentó entre los dioses.',
    },
    {
      text: 'En los años sesenta, la nueva presa de Asuán amenazó con sepultar Abu Simbel bajo las aguas. Y la UNESCO lanzó una de las operaciones de rescate más audaces de la historia: cortaron el templo entero en 1.036 bloques, lo elevaron 65 metros por el acantilado y lo reconstruyeron pieza a pieza en terreno más alto. Su mayor desafío no fue la ingeniería. Fue conservar una alineación astronómica que unos constructores antiguos habían fijado hacía más de tres milenios.',
    },
    {
      text: 'Dicen que no hay dos sin tres. Y es verdad: tres dioses, tres mil años, y un rayo de sol que nunca falla. Aunque... casi. Después del traslado, la luz llega un día tarde — el 21 de febrero y el 21 de octubre en vez de los originales. Un equipo moderno con toda la tecnología del mundo movió un templo entero dentro de una montaña y se equivocó por veinticuatro horas. Los constructores originales, con nada más que sus ojos, sus cálculos y su fe, lo clavaron a la primera. Tres mil años después, el sol sigue llegando puntual.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Le rendez-vous de trois mille ans»
//  Proverb: «L'exactitude est la politesse des rois»
// ═══════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: 'fr',
  langStoryId: 'fr#solar-alignment-miracle',
  title: 'Le rendez-vous de trois mille ans',
  subtitle: 'Deux fois par an, le soleil traverse la montagne pour honorer un pharaon',
  excerpt:
    "Au sud de l'Égypte, un temple taillé dans la roche garde un secret vieux de trois mille ans : deux fois par an, un rayon de soleil traverse soixante mètres de pierre pour illuminer trois dieux assis dans l'obscurité.",
  moralOrLesson:
    "Le plus grand art n'est pas de dompter la nature, mais de s'accorder à son rythme. Ce qui est bâti avec cette sagesse survit aux civilisations qui l'ont atteint.",
  paragraphs: [
    {
      text: "Au sud de l'Égypte, taillé dans une falaise au bord du Nil, il existe un temple qui garde le même rendez-vous depuis plus de trois mille ans. C'est Abou Simbel. Pendant 363 jours par an, son sanctuaire le plus profond reste plongé dans l'obscurité totale. Mais le 22 février et le 22 octobre, à l'aube, un rayon de soleil franchit la porte orientale, traverse soixante mètres de roche massive — salles, couloirs, chambres — et atteint le cœur du temple. Là, trois statues de pierre attendent dans le noir. Jusqu'à ce que la lumière vienne les chercher.",
    },
    {
      text: "Le rayon éclaire trois figures : Amon-Rê, roi des dieux ; Rê-Horakhty, dieu du soleil levant ; et Ramsès II lui-même — le pharaon qui a fait construire ce lieu et qui a eu l'audace de placer sa propre statue parmi les divins. Pendant une vingtaine de minutes, les trois resplendissent d'or. Mais un quatrième personnage — Ptah, dieu des ténèbres — reste dans l'ombre. Ce n'est pas un hasard. C'est le projet. Même le soleil sait qui mérite la lumière et qui appartient à la nuit.",
    },
    {
      text: "Et voilà ce qui rend la chose proprement stupéfiante. Cet alignement date d'environ 1244 avant notre ère. Pas de télescopes. Pas d'ordinateurs. Pas de GPS. Les ingénieurs de Ramsès ont calculé exactement où le soleil se lèverait deux jours précis de l'année, déterminé l'angle au degré près, et creusé un temple entier dans la montagne pour qu'un fil de lumière parcoure soixante mètres et tombe exactement là où il devait tomber. Impossible de déplacer la falaise en cas d'erreur. Un seul essai. Et ils ont réussi.",
    },
    {
      text: "Les deux dates — 22 février et 22 octobre — marqueraient l'anniversaire de naissance de Ramsès II et celui de son couronnement. Les historiens en débattent, mais franchement, là n'est pas la question. Quelqu'un a conçu un bâtiment qui oblige le soleil à rendre hommage à un homme selon un calendrier précis. Et il le fait, fidèlement, depuis plus de trente-deux siècles. C'est un niveau d'ambition qu'aucun architecte moderne n'a même osé approcher.",
    },
    {
      text: "Chaque année, des milliers de personnes arrivent à Abou Simbel avant l'aube et attendent. Et quand ça se produit — quand ce premier trait de lumière se glisse par la porte et rampe sur soixante mètres de pierre jusqu'à ce que trois visages antiques s'embrasent d'or dans les ténèbres — ça ne ressemble pas à de l'astronomie. Ça ressemble à du sacré. Pour les Égyptiens, c'était précisément l'idée : le dieu Rê en personne, franchissant le seuil pour visiter le pharaon qui s'était assis parmi les dieux.",
    },
    {
      text: "Dans les années 1960, le nouveau barrage d'Assouan menaçait d'engloutir Abou Simbel sous les eaux montantes. L'UNESCO a alors lancé l'une des opérations de sauvetage les plus audacieuses de l'histoire : découper le temple entier en 1 036 blocs, hisser l'ensemble à 65 mètres de hauteur et le reconstituer pièce par pièce sur un terrain plus élevé. Le plus grand défi n'était pas la taille des blocs. C'était de préserver un alignement astronomique fixé par des bâtisseurs anciens plus de trois mille ans auparavant.",
    },
    {
      text: "L'exactitude est la politesse des rois, dit-on. Et pendant trente-deux siècles, le soleil s'est montré d'une politesse irréprochable — fidèle au rendez-vous, à la minute près. Mais après le déplacement, la lumière arrive désormais avec un jour de retard : le 21 février et le 21 octobre au lieu des dates originales. Une équipe moderne, avec toute la technologie imaginable, a déplacé un temple entier et s'est trompée de vingt-quatre heures. Les bâtisseurs d'origine, armés de leurs yeux, de leurs calculs et de leur foi, avaient tout juste du premier coup. Trois mille ans plus tard, le soleil est toujours à l'heure — ou presque.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Dreitausend Jahre pünktlich»
//  Proverb: «Aller guten Dinge sind drei»
// ═══════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: 'de',
  langStoryId: 'de#solar-alignment-miracle',
  title: 'Dreitausend Jahre pünktlich',
  subtitle: 'Wie ein Sonnenstrahl seit 3.200 Jahren einem Pharao huldigt',
  excerpt:
    'Im Süden Ägyptens hütet ein in den Fels gehauener Tempel ein dreitausend Jahre altes Geheimnis: Zweimal im Jahr durchquert ein Sonnenstrahl sechzig Meter massiven Fels, um drei Götter zu erleuchten, die in völliger Dunkelheit sitzen.',
  moralOrLesson:
    'Die größte Leistung ist nicht, die Natur zu beherrschen, sondern ihren Rhythmus zu verstehen. Was mit diesem Wissen gebaut wird, überdauert die Zivilisationen, die es geschaffen haben.',
  paragraphs: [
    {
      text: 'Im Süden Ägyptens, in eine Felswand am Ufer des Nils gehauen, steht ein Tempel, der seit über dreitausend Jahren ein Geheimnis hütet. Abu Simbel. An 363 Tagen im Jahr liegt sein innerstes Heiligtum in völliger Dunkelheit. Doch am 22. Februar und am 22. Oktober geschieht bei Sonnenaufgang etwas, das eigentlich unmöglich sein sollte: Ein Lichtstrahl tritt durch das Ostportal, durchquert sechzig Meter massiven Fels — Hallen, Gänge, Kammern — und erreicht das Herz des Tempels. Dort sitzen drei steinerne Götter im Dunkeln. Bis das Licht sie findet.',
    },
    {
      text: 'Der Strahl trifft drei Figuren: Amun-Re, König der Götter. Re-Harachte, Gott der aufgehenden Sonne. Und Ramses II. selbst — der Pharao, der diesen Tempel bauen ließ und die Kühnheit besaß, seine eigene Statue neben die Götter zu setzen. Etwa zwanzig Minuten lang leuchten alle drei in goldenem Licht. Doch der Vierte — Ptah, Gott der Finsternis — bleibt im Schatten. Das ist kein Zufall. Das ist der Plan. Selbst die Sonne weiß, wer ins Licht gehört und wer in die Nacht.',
    },
    {
      text: 'Und hier wird es wirklich atemberaubend. Diese Anlage entstand um 1244 v. Chr. Keine Teleskope. Keine Computer. Kein GPS. Die Ingenieure des Ramses berechneten exakt, wo die Sonne an zwei bestimmten Tagen im Jahr aufgehen würde, ermittelten den präzisen Winkel und schlugen einen ganzen Tempel in den Berg, damit ein Lichtfaden sechzig Meter durch den Fels wandert und genau dort auftrifft, wo er auftreffen soll. Man kann einen Berg nicht verschieben, wenn man sich verrechnet. Ein einziger Versuch. Und sie trafen.',
    },
    {
      text: 'Die beiden Daten — 22. Februar und 22. Oktober — gelten traditionell als Geburtstag und Krönungstag von Ramses II. Historiker streiten darüber, aber ehrlich gesagt geht die Debatte am Wesentlichen vorbei. Jemand hat ein Bauwerk entworfen, das die Sonne selbst zwingt, einem einzelnen Menschen nach festem Zeitplan zu huldigen. Und sie tut es, verlässlich, seit über dreitausend Jahren. Das ist ein Maß an Größenwahn — oder Genialität —, dem kein moderner Architekt auch nur nahe gekommen ist.',
    },
    {
      text: 'Jedes Jahr kommen Tausende vor Sonnenaufgang nach Abu Simbel und warten. Und wenn es passiert — wenn sich der erste Lichtstreifen durch die Tür schiebt und sechzig Meter durch den Stein kriecht, bis drei uralte Gesichter plötzlich golden aufleuchten in der Schwärze — dann fühlt sich das nicht nach Astronomie an. Es fühlt sich heilig an. Für die alten Ägypter war genau das die Idee: der Sonnengott Re persönlich, der durch die Tür tritt, um den Pharao zu besuchen, der sich unter die Götter gesetzt hat.',
    },
    {
      text: 'In den 1960er-Jahren drohte der neue Assuan-Staudamm, Abu Simbel unter den steigenden Fluten zu begraben. Die UNESCO startete daraufhin eine der kühnsten Rettungsaktionen der Geschichte: Sie zerlegten den gesamten Tempel in 1.036 Blöcke, hoben alles 65 Meter den Fels hinauf und setzten ihn auf höherem Gelände Stück für Stück wieder zusammen. Die größte Herausforderung war nicht das Gewicht. Es war, eine astronomische Ausrichtung zu bewahren, die antike Baumeister vor über drei Jahrtausenden festgelegt hatten.',
    },
    {
      text: 'Aller guten Dinge sind drei, sagt man. Drei Götter im Licht. Drei Jahrtausende ohne Fehler. Und ein einziger Sonnenstrahl, der nie sein Ziel verfehlt hat. Oder fast nie. Nach dem Umzug trifft das Licht einen Tag zu spät ein — am 21. Februar und 21. Oktober statt an den Originaldaten. Ein modernes Team mit jeder denkbaren Technologie hat einen ganzen Bergtempel versetzt und sich um vierundzwanzig Stunden vertan. Die ursprünglichen Erbauer, bewaffnet mit nichts als ihren Augen, ihrer Mathematik und ihrem Glauben, lagen auf Anhieb richtig. Dreitausend Jahre später kommt die Sonne immer noch pünktlich.',
    },
  ],
};

// ─── Push all three ──────────────────────────────────────
const stories = [
  { label: 'SPANISH', data: es },
  { label: 'FRENCH', data: fr },
  { label: 'GERMAN', data: de },
];

for (const { label, data } of stories) {
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`  Pushing ${label}  →  ${data.langStoryId}`);
  console.log(`${'═'.repeat(50)}`);

  try {
    await docClient.send(
      new PutCommand({ TableName: TABLE, Item: data })
    );
    console.log(`  ✅  ${label} pushed successfully.`);
  } catch (err) {
    console.error(`  ❌  ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log('\n══════════════════════════════════════════════════');
console.log('  All three languages pushed successfully! 🎉');
console.log('══════════════════════════════════════════════════\n');
