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
  storyId: 'secret-chambers-void',
  icon: '\u{1F52E}',
  tier: 'A',
  source: 'Morishima, K. et al. "Discovery of a big void in Khufu\'s Pyramid," Nature 552, 386-390 (2017)',
  characters: [
    'ScanPyramids research team',
    'Pharaoh Khufu',
  ],
  era: 'Old Kingdom (discovered 2017)',
  readingTimeMinutes: 2,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 31.1342, lat: 29.9792 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'riddles_past',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH — «Las cámaras secretas»
//  Proverb: «La paciencia es la madre de la ciencia»
//  — subverted: 4,500 years is asking a lot, even for science
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#secret-chambers-void',
  title: 'Las cámaras secretas',
  subtitle: 'Un vacío de 30 metros sellado bajo la Gran Pirámide durante 4.500 años — y aún intacto',
  excerpt:
    'En 2017, un equipo de físicos apuntó detectores de partículas hacia la Gran Pirámide de Guiza y encontró algo que nadie esperaba. Dentro de 6,1 millones de toneladas de piedra caliza se escondía un enorme vacío de unos 30 metros, sellado desde hace más de 4.500 años.',
  moralOrLesson:
    'Hasta el monumento más estudiado de la Tierra puede esconder secretos, recordándonos que el conocimiento nunca está completo.',
  paragraphs: [
    {
      text: `En 2017, un equipo de físicos apuntó detectores de partículas hacia la Gran Pirámide de Guiza y encontró algo que nadie esperaba. Dentro de 6,1 millones de toneladas de piedra caliza, justo encima de un corredor llamado la Gran Galería, se escondía un espacio vacío de unos 30 metros. Sin túneles que llegaran hasta él. Sin conexión con ninguna sala conocida. Sellado desde que los obreros de Keops colocaron la última piedra hace más de 4.500 años. Una habitación secreta que nadie debía encontrar.`,
    },
    {
      text: `El método parece sacado de una novela de ciencia ficción. Se llama tomografía de muones: partículas subatómicas que llueven desde el espacio y atraviesan la roca como fantasmas. La piedra densa frena más partículas que el aire, así que midiendo dónde pasaban con facilidad, los investigadores dibujaron una especie de radiografía del interior de la pirámide. Y ahí estaba: en el monumento más estudiado del planeta, un hueco del tamaño de un avión comercial que llevaba cuarenta y cinco siglos sin que nadie lo viera.`,
    },
    {
      text: `Era el primer gran descubrimiento dentro de la pirámide en más de mil años. El último ocurrió alrededor del año 820, cuando el califa al-Mamún — gobernante del imperio islámico con sede en Bagdad — ordenó abrir un túnel a pico y martillo directamente a través de la piedra. Sus hombres encontraron el pasaje ascendente y la Cámara del Rey. Durante doce siglos después, todo el mundo dio por hecho que el plano de la pirámide estaba completo. Los muones demostraron que estaban espectacularmente equivocados.`,
    },
    {
      text: `El hallazgo encendió un debate feroz. Algunos expertos lo llamaron un simple hueco constructivo — una bolsa de aire que quedó durante la obra, nada más. Pero otros se negaron a aceptarlo. Un vacío de 30 metros justo encima de la Gran Galería no aparece por casualidad. ¿Una cámara funeraria desconocida? ¿Una cripta con textos sagrados? ¿Tal vez el verdadero lugar de descanso de Keops? Porque hay un detalle que poca gente sabe: la momia de este faraón nunca se ha encontrado.`,
    },
    {
      text: `Y aquí es donde la historia se vuelve desesperante. Sabemos que el vacío está ahí, pero no podemos ver qué hay dentro. Hay científicos que han propuesto enviar robots diminutos por microtúneles perforados en la piedra. Pero el gobierno egipcio se ha negado. No puedes ir taladrando agujeros en el monumento arqueológico más importante del planeta y cruzar los dedos para que salga bien. Así que el vacío sigue ahí: detectado pero intocable. Una sala que podemos sentir pero no pisar.`,
    },
    {
      text: `Piénsalo un momento. Vivimos en una era donde los satélites fotografían cada rincón de la Tierra. Hemos descifrado ADN antiguo y cartografiado el fondo del océano. Pero ahí mismo, en uno de los lugares más visitados del mundo — donde millones de turistas se hacen selfis cada año — hay un espacio sellado que lleva guardando su secreto cuarenta y cinco siglos. Nadie vivo sabe qué hay dentro.`,
    },
    {
      text: `Dicen que la paciencia es la madre de la ciencia. Pero 4.500 años es mucho pedir, incluso para la ciencia. La Gran Pirámide ha sobrevivido a saqueadores de tumbas, a exploradores con dinamita y al auge y caída de todos los imperios desde el antiguo Egipto. Lo que sea que descanse dentro de ese vacío oculto — aire vacío, un rey olvidado o algo que nadie ha imaginado todavía — lleva esperando cuatro milenios y medio. Puede esperar un poco más.`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH — «Le vide interdit»
//  Proverb: «Tout vient à point à qui sait attendre»
//  — subverted: 4,500 years is a lot to ask, even for a pyramid
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#secret-chambers-void',
  title: 'Le vide interdit',
  subtitle: 'Un espace de 30 mètres caché au cœur de la Grande Pyramide depuis 4 500 ans — toujours scellé',
  excerpt:
    'En 2017, des physiciens ont braqué des détecteurs de particules sur la Grande Pyramide de Gizeh et découvert l\'impensable. Au cœur de 6,1 millions de tonnes de calcaire se cachait un vide immense de 30 mètres de long, scellé depuis plus de 4 500 ans.',
  moralOrLesson:
    'Même le monument le plus étudié de la planète peut encore cacher des secrets — un rappel que la connaissance n\'est jamais complète.',
  paragraphs: [
    {
      text: `En 2017, une équipe de physiciens a braqué des détecteurs de particules sur la Grande Pyramide de Gizeh. Et trouvé l\u2019impensable. Au cœur de 6,1 millions de tonnes de calcaire, juste au-dessus de la Grande Galerie, se cachait un vide de 30 mètres de long. Aucun tunnel n\u2019y menait. Aucun passage ne le reliait à une salle connue. Scellé depuis que les bâtisseurs de Khéops ont posé la dernière pierre il y a plus de quarante-cinq siècles. Un espace secret que personne n\u2019était censé trouver.`,
    },
    {
      text: `La méthode semble sortie d\u2019un roman de science-fiction. On appelle ça la tomographie par muons — des particules subatomiques qui pleuvent depuis l\u2019espace et traversent la roche. La pierre dense en bloque davantage que le vide, donc en mesurant où les particules passaient facilement, les chercheurs ont dressé une sorte de radiographie de l\u2019intérieur de la pyramide. Résultat : dans le monument le plus étudié de la planète, un espace grand comme un avion de ligne, invisible depuis quarante-cinq siècles.`,
    },
    {
      text: `C\u2019était la première grande découverte à l\u2019intérieur de la pyramide depuis plus de mille ans. La dernière remontait aux alentours de 820, quand le calife al-Mamoun — souverain de l\u2019empire abbasside basé à Bagdad — avait fait creuser un tunnel à coups de burin directement dans la pierre. Ses hommes avaient trouvé le couloir ascendant et la Chambre du Roi. Pendant douze siècles, tout le monde a cru que le plan de la pyramide était complet. Les muons ont prouvé que tout le monde se trompait.`,
    },
    {
      text: `La découverte a déclenché une tempête. Certains experts ont parlé d\u2019un simple défaut de construction — une poche d\u2019air laissée pendant le chantier, sans importance. Mais d\u2019autres ont refusé de s\u2019en contenter. Un vide de 30 mètres pile au-dessus de la Grande Galerie, ça n\u2019arrive pas par accident. Une chambre funéraire inconnue ? Un coffre-fort de textes sacrés ? Peut-être même la vraie tombe de Khéops — parce qu\u2019il y a un détail que peu de gens connaissent : sa momie n\u2019a jamais été retrouvée.`,
    },
    {
      text: `Et c\u2019est là que l\u2019histoire devient frustrante. On sait que le vide est là, mais on ne peut pas voir ce qu\u2019il contient. Des scientifiques ont proposé d\u2019envoyer des micro-robots par de minuscules tunnels percés dans la pierre. Mais les autorités égyptiennes ont dit non. On ne perce pas des trous dans le monument archéologique le plus important de la planète en croisant les doigts. Alors le vide reste là : détecté mais intouchable. Une pièce qu\u2019on peut sentir mais où personne ne peut entrer.`,
    },
    {
      text: `Pensez-y une seconde. On vit à une époque où les satellites photographient chaque centimètre de la surface terrestre. On a décodé de l\u2019ADN vieux de milliers d\u2019années et cartographié le fond des océans. Mais là, dans l\u2019un des lieux les plus visités au monde — un endroit où des millions de touristes prennent des selfies chaque année — il y a un espace scellé qui garde son secret depuis quarante-cinq siècles. Personne de vivant ne sait ce qu\u2019il y a dedans.`,
    },
    {
      text: `On dit que tout vient à point à qui sait attendre. Mais quatre mille cinq cents ans, c\u2019est beaucoup demander — même pour une pyramide. La Grande Pyramide a survécu aux pilleurs de tombes, aux explorateurs armés de dynamite et à la chute de tous les empires depuis l\u2019Égypte ancienne. Ce qui repose dans ce vide caché — de l\u2019air, un roi oublié ou quelque chose que personne n\u2019a encore imaginé — attend là depuis quatre millénaires et demi. Ça peut attendre encore un peu.`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN — «Die geheimen Kammern»
//  Proverb: «Was lange währt, wird endlich gut»
//  — subverted: whether that still holds after 4,500 years
//    remains to be seen
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#secret-chambers-void',
  title: 'Die geheimen Kammern',
  subtitle: 'Ein 30 Meter langer Hohlraum, seit 4.500 Jahren versiegelt — und bis heute ungeöffnet',
  excerpt:
    'Im Jahr 2017 richtete ein Team von Physikern Teilchendetektoren auf die Cheops-Pyramide in Gizeh — und fand etwas, womit niemand gerechnet hatte. Tief in 6,1 Millionen Tonnen Kalkstein verbarg sich ein Hohlraum von 30 Metern Länge, versiegelt seit über 4.500 Jahren.',
  moralOrLesson:
    'Selbst das meisterforschte Bauwerk der Erde kann noch Geheimnisse bergen — eine Erinnerung daran, dass Wissen niemals vollständig ist.',
  paragraphs: [
    {
      text: `Im Jahr 2017 richtete ein Team von Physikern Teilchendetektoren auf die Cheops-Pyramide in Gizeh — und fand etwas, womit niemand gerechnet hatte. Tief in 6,1 Millionen Tonnen Kalkstein, direkt über einem Korridor namens Große Galerie, verbarg sich ein Hohlraum von etwa 30 Metern Länge. Kein Tunnel führte dorthin. Kein Gang verband ihn mit einem bekannten Raum. Versiegelt, seit die Arbeiter des Pharaos Cheops vor über 4.500 Jahren den letzten Stein gesetzt hatten. Ein geheimer Raum, den niemand finden sollte.`,
    },
    {
      text: `Die Methode klingt wie Science-Fiction. Sie heißt Myonen-Tomographie — dabei werden winzige Teilchen aus dem Weltall genutzt, die Fels durchdringen wie Röntgenstrahlen. Dichtes Gestein bremst mehr Teilchen ab als leere Räume. Indem die Forscher maßen, wo die Teilchen leicht hindurchkamen, zeichneten sie eine Art Röntgenbild des Pyramiden-Inneren. Und da war er: im meistuntersuchten Bauwerk der Erde ein Hohlraum so lang wie ein Passagierflugzeug, unsichtbar seit fünfundvierzig Jahrhunderten.`,
    },
    {
      text: `Es war die erste große Entdeckung im Inneren der Pyramide seit über tausend Jahren. Die letzte stammte von etwa 820 n. Chr., als Kalif al-Ma'mun — Herrscher des Abbasiden-Reichs mit Sitz in Bagdad — seinen Männern befahl, einen Tunnel geradewegs durch den Stein zu schlagen. Sie fanden den aufsteigenden Gang und die Königskammer. Zwölf Jahrhunderte lang glaubte danach die ganze Welt, der Grundriss der Pyramide sei vollständig bekannt. Die Myonen bewiesen, dass alle spektakulär falschlagen.`,
    },
    {
      text: `Die Entdeckung löste einen Sturm aus. Manche Experten nannten den Hohlraum eine sogenannte Baulücke — ein Luftpolster aus der Bauzeit, ohne Bedeutung. Aber andere widersprachen vehement. Ein 30-Meter-Hohlraum direkt über der Großen Galerie entsteht nicht zufällig. Eine unbekannte Grabkammer? Ein versiegeltes Archiv heiliger Texte? Vielleicht sogar die echte Ruhestätte von Cheops — denn hier kommt ein Detail, das kaum jemand kennt: Seine Mumie wurde nie gefunden.`,
    },
    {
      text: `Und hier wird die Geschichte frustrierend. Wir wissen, dass der Hohlraum da ist, aber wir können nicht hineinsehen. Wissenschaftler haben vorgeschlagen, winzige Roboter durch Mikrotunnel im Stein zu schicken. Aber die ägyptische Regierung hat abgelehnt. Man bohrt nicht einfach Löcher in das wichtigste archäologische Bauwerk der Welt und hofft auf das Beste. Also bleibt der Hohlraum: erkannt, aber unberührt. Ein Raum, den wir spüren, aber nicht betreten können.`,
    },
    {
      text: `Denk mal kurz darüber nach. Wir leben in einer Zeit, in der Satelliten jeden Quadratmeter der Erdoberfläche fotografieren. Wir haben uralte DNA entschlüsselt und den Meeresboden kartiert. Aber genau dort, an einem der meistbesuchten Orte der Welt — wo jedes Jahr Millionen von Touristen Selfies machen — gibt es einen versiegelten Raum, der sein Geheimnis seit fünfundvierzig Jahrhunderten bewahrt. Kein lebender Mensch weiß, was darin ist.`,
    },
    {
      text: `Man sagt: Was lange währt, wird endlich gut. Aber ob das auch nach 4.500 Jahren noch gilt, muss sich erst zeigen. Die Cheops-Pyramide hat Grabräuber überlebt, Forscher mit Dynamit und den Aufstieg und Fall jedes Imperiums seit dem alten Ägypten. Was auch immer in diesem verborgenen Hohlraum ruht — leere Luft, ein vergessener König oder etwas, das sich noch niemand vorstellen kann — es wartet dort seit viereinhalb Jahrtausenden. Es kann noch ein bisschen warten.`,
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
