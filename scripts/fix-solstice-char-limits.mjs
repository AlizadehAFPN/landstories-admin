import { readFileSync, existsSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const envFile = existsSync('.env') ? '.env' : '.env.local';
const env = {};
for (const line of readFileSync(envFile, 'utf-8').split('\n')) {
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

// ─── Fixes: only paragraphs that were > 500 chars ────────

const fixes = [
  // ── ES P4 (was 509) ──
  {
    lang: 'es',
    index: 3,
    text: 'Entonces la cosa se torci\u00f3. A principios de los ochenta, el Festival Libre de Stonehenge \u2014 m\u00fasica, vida alternativa \u2014 reun\u00eda a decenas de miles. Las autoridades lo prohibieron, preocupadas por las piedras. El 1 de junio de 1985, la polic\u00eda intercept\u00f3 a unos seiscientos viajeros de camino. Lo que sigui\u00f3 fue brutal: ventanillas reventadas, familias arrancadas de autobuses, 537 detenidos \u2014 la mayor detenci\u00f3n masiva en Inglaterra desde la Segunda Guerra Mundial. Se llam\u00f3 la Batalla del Beanfield.',
  },
  // ── ES P6 (was 525) ──
  {
    lang: 'es',
    index: 5,
    text: 'La alineaci\u00f3n tambi\u00e9n atrajo a la ciencia. En 1965, el astr\u00f3nomo Gerald Hawkins public\u00f3 Stonehenge Decoded y sostuvo que funcionaba como un ordenador prehist\u00f3rico para predecir eclipses. Algunas conclusiones no aguantaron el an\u00e1lisis, pero la idea de fondo se mantuvo: Stonehenge rastrea el sol y la luna con una precisi\u00f3n que deja sin palabras. El propio terreno ayuda \u2014 una cresta natural en la roca caliza apunta al amanecer del solsticio, como si la tierra hubiera marcado el sitio.',
  },
  // ── FR P4 (was 525) ──
  {
    lang: 'fr',
    index: 3,
    text: "Et puis tout a d\u00e9rap\u00e9. Au d\u00e9but des ann\u00e9es quatre-vingt, le Stonehenge Free Festival \u2014 musique, vie alternative \u2014 attirait des dizaines de milliers. Les autorit\u00e9s l\u2019ont interdit par crainte pour les pierres. Le 1er\u00a0juin 1985, la police intercepte six cents voyageurs en route. Ce qui suit est brutal\u00a0: vitres fracass\u00e9es, familles arrach\u00e9es des bus, 537\u00a0arrestations \u2014 la plus grande interpellation de masse en Angleterre depuis la Seconde Guerre mondiale. On l\u2019a appel\u00e9e la Bataille du Beanfield.",
  },
  // ── FR P6 (was 508) ──
  {
    lang: 'fr',
    index: 5,
    text: "L\u2019alignement a aussi s\u00e9duit la science. En 1965, l\u2019astronome Gerald Hawkins publie Stonehenge Decoded et avance que le monument fonctionnait comme un calculateur antique pour pr\u00e9dire les \u00e9clipses. Certaines th\u00e8ses n\u2019ont pas tenu, mais l\u2019essentiel est rest\u00e9\u00a0: Stonehenge suit la course du soleil et de la lune avec une pr\u00e9cision stup\u00e9fiante. Le terrain y est pour quelque chose \u2014 une cr\u00eate naturelle dans la craie pointe droit vers le lever du solstice, comme si la terre avait d\u00e9j\u00e0 choisi l\u2019endroit.",
  },
  // ── DE P1 (was 505) ──
  {
    lang: 'de',
    index: 0,
    text: 'Stonehenge steht nicht zuf\u00e4llig dort, wo es steht. Die Hauptachse des Monuments zeigt exakt auf den Sonnenaufgang zur Sommersonnenwende und den Sonnenuntergang zur Wintersonnenwende. Wer sich am 21.\u00a0Juni \u2014 dem l\u00e4ngsten Tag des Jahres \u2014 in die Mitte stellt, sieht die Sonne direkt \u00fcber einem gewaltigen Stein aufgehen, dem Heel Stone. Die ersten goldenen Strahlen schie\u00dfen mitten durchs Herz der Anlage. So eine Pr\u00e4zision ist kein Zufall. Jemand hat das vor f\u00fcnftausend Jahren genau so gewollt.',
  },
  // ── DE P2 (was 544) ──
  {
    lang: 'de',
    index: 1,
    text: 'In den 1720er-Jahren ver\u00e4nderte ein Mann namens William Stukeley den Blick der Welt auf Stonehenge f\u00fcr immer. Der englische Arzt war der Erste, der die Anlage systematisch verma\u00df und kartierte. Als er die Ausrichtung auf die Sonnenwende entdeckte, packte ihn eine Idee: Das musste das Werk der Druiden sein \u2014 jener m\u00e4chtigen Priester, die Julius C\u00e4sar als geistige F\u00fchrer des keltischen Britannien beschrieb. Stukeley war so \u00fcberzeugt, dass er sich zum \u201EPrinz der Druiden\u201C ernannte.',
  },
  // ── DE P4 (was 524) ──
  {
    lang: 'de',
    index: 3,
    text: 'Dann eskalierte es. Anfang der Achtziger zog das Stonehenge Free Festival \u2014 ein wildes Fest aus Musik und alternativem Leben \u2014 Zehntausende an. Die Beh\u00f6rden verboten es, aus Sorge um die Steine. Am 1.\u00a0Juni 1985 stoppte die Polizei rund sechshundert Reisende unterwegs. Was folgte, war brutal: Beamte schlugen Scheiben ein, zerrten Familien aus Bussen und nahmen 537\u00a0Menschen fest \u2014 die gr\u00f6\u00dfte Massenfestnahme in England seit dem Zweiten Weltkrieg. Man nannte es die Schlacht am Bohnenfeld.',
  },
  // ── DE P5 (was 527) ──
  {
    lang: 'de',
    index: 4,
    text: 'Nach jahrelangen Verhandlungen kam ein Kompromiss zustande. Seit dem Jahr 2000 \u00f6ffnet Stonehenge seinen Steinkreis zu beiden Sonnenwenden \u2014 kostenlos. Jeden Sommer versammeln sich 20.000 bis 37.000 Menschen in der Dunkelheit: Druiden in Wei\u00df, Touristen mit Smartphones, Familien mit Kindern. Gemeinsam warten sie auf die D\u00e4mmerung. Wenn die Sonne \u00fcber den Heel Stone steigt und den Kreis in Licht taucht, bricht Jubel aus. Derselbe Sonnenaufgang, den Menschen hier vor f\u00fcnftausend Jahren sahen.',
  },
  // ── DE P6 (was 515) ──
  {
    lang: 'de',
    index: 5,
    text: 'Die Ausrichtung zog auch die Wissenschaft an. 1965 ver\u00f6ffentlichte der Astronom Gerald Hawkins Stonehenge Decoded und behauptete, das Monument habe als urzeitlicher Rechner zur Vorhersage von Finsternissen gedient. Nicht alle Thesen hielten stand, doch der Kern blieb: Stonehenge verfolgt Sonne und Mond mit verbl\u00fcffender Genauigkeit. Das Gel\u00e4nde half \u2014 ein nat\u00fcrlicher Grat im Kalkstein zeigt zum Sonnenaufgang der Sonnenwende, als h\u00e4tte die Erde selbst die Stelle markiert.',
  },
];

// ─── Apply fixes per language ────────────────────────────
const byLang = {};
for (const f of fixes) {
  if (!byLang[f.lang]) byLang[f.lang] = [];
  byLang[f.lang].push(f);
}

for (const [lang, langFixes] of Object.entries(byLang)) {
  const key = {
    siteId: 'stonehenge',
    langStoryId: `${lang}#solstice-druid-mysteries`,
  };

  // Build update expression for each paragraph index
  const exprParts = [];
  const exprValues = {};
  for (const f of langFixes) {
    exprParts.push(`paragraphs[${f.index}].#t = :p${f.index}`);
    exprValues[`:p${f.index}`] = f.text;
  }
  exprParts.push('updatedAt = :ts');
  exprValues[':ts'] = now;

  console.log(`\n  Fixing ${lang.toUpperCase()}: ${langFixes.length} paragraph(s)...`);

  try {
    await docClient.send(
      new UpdateCommand({
        TableName: TABLE,
        Key: key,
        UpdateExpression: `SET ${exprParts.join(', ')}`,
        ExpressionAttributeNames: { '#t': 'text' },
        ExpressionAttributeValues: exprValues,
      })
    );
    console.log(`  OK  ${lang.toUpperCase()} fixed.`);
  } catch (err) {
    console.error(`  FAIL  ${lang.toUpperCase()}:`, err.message);
    process.exit(1);
  }
}

console.log('\n  All fixes applied.\n');
