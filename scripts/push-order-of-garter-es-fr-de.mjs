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
  siteId: 'windsor-castle',
  storyId: 'order-of-the-garter',
  icon: '\u{1F396}\uFE0F',
  tier: 'A',
  source: 'Jean Froissart\'s "Chroniques" (c. 1370s), Elias Ashmole\'s "The Institution, Laws and Ceremonies of the Most Noble Order of the Garter" (1672), Lisa Jefferson\'s scholarly research on the Order\'s founding, Historic Royal Palaces archives',
  era: '1348 AD \u2014 Present',
  readingTimeMinutes: 4,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: -0.6073, lat: 51.4838 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
//  SPANISH — «Seis palabras que duraron siete siglos»
//  Proverb: "No hay mal que por bien no venga"
//  — subverted: Edward didn't just find good in the bad;
//    he turned mockery itself into the highest honor
// ═══════════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#order-of-the-garter',
  title: 'Seis palabras que duraron siete siglos',
  subtitle: 'La jarretera caída de una dama que creó el club más exclusivo de la historia',
  excerpt: 'Hay una historia que empieza con un accidente de vestuario y termina con la orden de caballería más antigua del mundo. Estamos en 1348. Eduardo III de Inglaterra \u2014 un rey guerrero que acaba de aplastar a los franceses en la batalla de Crécy \u2014 organiza un gran baile en su castillo.',
  moralOrLesson: 'La verdadera caballerosidad está en defender el honor ajeno y transformar la burla en virtud \u2014 un solo acto de nobleza puede crear algo que perdure durante siglos',
  characters: [
    'Eduardo III \u2014 Rey de Inglaterra, fundador de la Orden de la Jarretera',
    'Juana, condesa de Salisbury (\u00abLa Bella Doncella de Kent\u00bb) \u2014 La dama cuya jarretera caída inspiró la Orden',
    'Eduardo, el Príncipe Negro \u2014 Caballero fundador y el guerrero más temido de Europa',
    'Enrique de Grosmont, duque de Lancaster \u2014 Caballero fundador',
    'Sir John Chandos \u2014 Caballero fundador y maestro estratega',
    'El Rey Arturo \u2014 El modelo mítico en cuya Mesa Redonda se basó la Orden',
  ],
  paragraphs: [
    {
      text: 'Hay una historia que empieza con un accidente de vestuario y termina con la orden de caballería más antigua del mundo. Estamos en 1348. Eduardo III de Inglaterra \u2014 un rey guerrero que acaba de aplastar a los franceses en la batalla de Crécy \u2014 organiza un gran baile en su castillo. La corte está llena de caballeros, nobles y las personas más poderosas del reino. El vino corre, la música suena, y algo está a punto de pasar que lo cambiará todo.',
    },
    {
      text: 'En la pista de baile está Juana de Kent, considerada la mujer más bella de Inglaterra y, según los rumores, la gran obsesión del rey. En plena danza, su jarretera \u2014 una cinta de seda que se llevaba bajo la rodilla para sujetar la media \u2014 se suelta y cae al suelo. Delante de todos. En el siglo XIV, una jarretera era ropa íntima. Verla en público era... bueno, imagina el peor accidente de vestuario posible. Toda la sala estalló en carcajadas.',
    },
    {
      text: 'Y entonces Eduardo hizo algo que nadie esperaba. Cruzó la sala, se agachó y recogió la jarretera. El silencio fue absoluto. Miró una por una cada cara burlona y, con toda la calma del mundo, se ató la cinta de seda azul en su propia pierna. Y pronunció seis palabras en francés que iban a resonar durante los siguientes siete siglos: \u00abHoni soit qui mal y pense\u00bb. Que la vergüenza caiga sobre quien piense mal de esto.',
    },
    {
      text: 'Con un solo gesto, le dio la vuelta a todo. Lo que había sido la humillación de una mujer se convirtió en el desafío de un rey. Anunció a la sala, todavía en shock, que esa jarretera sería el símbolo de una nueva orden de caballería \u2014 tan poderosa y tan respetada que todos los que se habían reído suplicarían algún día por llevarla. Dicen que no hay mal que por bien no venga, pero aquella noche Eduardo fue más lejos: convirtió la burla en la distinción más alta del reino.',
    },
    {
      text: 'Eduardo modeló su hermandad con la leyenda del Rey Arturo y su Mesa Redonda \u2014 y en el siglo XIV la gente se tomaba a Arturo muy en serio. Limitó la orden a 24 caballeros, como el mítico círculo artúrico, y eligió Windsor como sede. Pero no eran títulos decorativos. Los fundadores eran los mejores guerreros de Inglaterra, incluido su propio hijo, el Príncipe Negro, el soldado más temido de Europa. Honor ganado en combate, no en banquetes.',
    },
    {
      text: 'La sede espiritual de la Orden es la Capilla de San Jorge en Windsor, una joya del gótico donde descansan diez reyes y reinas. Dentro, las sillas talladas muestran los escudos de cada caballero desde 1348, con estandartes de colores sobre sus cabezas. Cada junio, los nuevos miembros desfilan con túnicas de terciopelo azul y sombreros con enormes plumas blancas, como salidos de una novela de fantasía. La multitud sigue aplaudiendo. La tradición no se ha roto en casi 700 años.',
    },
    {
      text: 'Y aquí viene lo más asombroso: a día de hoy, la Orden de la Jarretera es un regalo personal del monarca británico. Ningún primer ministro decide, ningún comité opina, ninguna política interfiere. Solo el rey o la reina elige quién la merece. Winston Churchill la llevó. También el Duque de Wellington, el hombre que derrotó a Napoleón. Todo empezó con un momento en una pista de baile \u2014 un rey que convirtió la vergüenza de una mujer en el mayor honor del reino y retó a cualquiera a decir una sola palabra.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  FRENCH — «Le soir où la honte changea de camp»
//  Proverb: "Qui rit le dernier rit le mieux"
//  — subverted: Edward didn't just laugh last;
//    he turned others' laughter into the highest distinction
// ═══════════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#order-of-the-garter',
  title: 'Le soir où la honte changea de camp',
  subtitle: 'Une jarretière tombée qui a forgé l\u2019ordre de chevalerie le plus ancien et le plus prestigieux au monde',
  excerpt: 'Voici l\u2019histoire d\u2019un incident vestimentaire qui a donné naissance au club le plus exclusif de l\u2019humanité. Nous sommes en 1348. Le roi Édouard III d\u2019Angleterre \u2014 un souverain guerrier qui vient d\u2019écraser les Français à la bataille de Crécy \u2014 organise un grand bal dans son château.',
  moralOrLesson: 'La vraie chevalerie réside dans la défense de l\u2019honneur et la transformation de la moquerie en vertu \u2014 un seul acte de grâce peut fonder une institution qui traverse les siècles',
  characters: [
    'Édouard III \u2014 Roi d\u2019Angleterre, fondateur de l\u2019Ordre de la Jarretière',
    'Jeanne, comtesse de Salisbury (\u00ab La Belle Demoiselle de Kent \u00bb) \u2014 La dame dont la jarretière tombée inspira l\u2019Ordre',
    'Édouard, le Prince Noir \u2014 Chevalier fondateur et guerrier le plus redouté d\u2019Europe',
    'Henri de Grosmont, duc de Lancastre \u2014 Chevalier fondateur',
    'Sir John Chandos \u2014 Chevalier fondateur et maître tacticien',
    'Le Roi Arthur \u2014 Le modèle mythique dont la Table ronde inspira la fondation de l\u2019Ordre',
  ],
  paragraphs: [
    {
      text: 'Voici l\u2019histoire d\u2019un incident vestimentaire qui a donné naissance au club le plus exclusif de l\u2019humanité. Nous sommes en 1348. Le roi Édouard III d\u2019Angleterre \u2014 un souverain guerrier qui vient d\u2019écraser les Français à la bataille de Crécy \u2014 organise un grand bal dans son château. La cour déborde de chevaliers, de nobles et des personnages les plus puissants du royaume. Le vin coule, la musique résonne. Et quelque chose va se produire qui changera le cours de l\u2019histoire.',
    },
    {
      text: 'Sur la piste danse Jeanne de Kent, réputée la plus belle femme d\u2019Angleterre \u2014 et celle dont le roi serait, dit-on, éperdument épris. En pleine danse, sa jarretière \u2014 un ruban de soie porté sous le genou pour maintenir le bas \u2014 glisse et tombe au sol. Là. Devant tout le monde. Au XIVe siècle, une jarretière était un sous-vêtement. La voir en public revenait à... disons, le pire accident vestimentaire imaginable. Toute la salle a éclaté de rire.',
    },
    {
      text: 'Et là, Édouard a fait ce que personne n\u2019attendait. Il a traversé la salle, s\u2019est penché et a ramassé la jarretière. Silence total. Il a balayé du regard chaque visage moqueur, puis, lentement, délibérément, il a noué le ruban de soie bleue autour de sa propre jambe. Et il a prononcé six mots qui allaient résonner pendant sept siècles : \u00ab Honi soit qui mal y pense. \u00bb Honni soit celui qui en pense du mal.',
    },
    {
      text: 'D\u2019un seul geste, il avait tout renversé. L\u2019humiliation d\u2019une femme était devenue le défi d\u2019un roi. Il annonça à la salle stupéfaite que cette jarretière deviendrait le symbole d\u2019un nouvel ordre de chevalerie \u2014 si prestigieux que tous ceux qui avaient ri supplieraient un jour de le porter. On dit que qui rit le dernier rit le mieux. Ce soir-là, Édouard n\u2019a pas simplement ri le dernier : il a transformé le rire des autres en la plus haute distinction du royaume.',
    },
    {
      text: 'Édouard a modelé sa confrérie sur la légende du roi Arthur et de sa Table ronde \u2014 et au XIVe siècle, on prenait Arthur très au sérieux. Il a limité l\u2019Ordre à 24 chevaliers, comme le cercle mythique d\u2019Arthur, et choisi le château de Windsor pour siège. Mais ce n\u2019étaient pas des titres honorifiques. Les chevaliers fondateurs étaient les meilleurs combattants d\u2019Angleterre, dont le propre fils d\u2019Édouard, le Prince Noir, le guerrier le plus redouté d\u2019Europe. L\u2019honneur se gagnait au combat, pas aux banquets.',
    },
    {
      text: 'Le c\u0153ur spirituel de l\u2019Ordre, c\u2019est la chapelle Saint-Georges à Windsor \u2014 un joyau gothique où reposent dix rois et reines. À l\u2019intérieur, des stalles sculptées portent les armoiries de chaque chevalier depuis 1348, surmontées de bannières colorées. Chaque juin, les nouveaux membres défilent en robes de velours bleu et chapeaux à plumes blanches immenses, comme sortis d\u2019un roman de chevalerie. La foule applaudit. La tradition n\u2019a jamais été rompue en près de sept siècles.',
    },
    {
      text: 'Et voici le plus fascinant : aujourd\u2019hui encore, l\u2019Ordre de la Jarretière est un don personnel du monarque britannique. Aucun Premier ministre ne décide, aucun comité ne délibère, aucune politique n\u2019intervient. Seul le roi ou la reine choisit. Winston Churchill l\u2019a porté. Le duc de Wellington aussi, celui qui a battu Napoléon. Tout remonte à un instant sur une piste de danse \u2014 un roi qui a transformé la honte d\u2019une femme en le plus grand honneur du royaume, et qui a défié quiconque d\u2019y trouver à redire.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  GERMAN — «Ein Strumpfband für die Ewigkeit»
//  Proverb: "Wer den Schaden hat, braucht für den Spott nicht zu sorgen"
//  — subverted: Edward flipped it — the one with "damage"
//    turned the mockers' scorn into the highest honor
// ═══════════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#order-of-the-garter',
  title: 'Ein Strumpfband für die Ewigkeit',
  subtitle: 'Ein herabgefallenes Strumpfband, das den ältesten und angesehensten Ritterorden der Welt begründete',
  excerpt: 'Dies ist die Geschichte einer Garderobenpanne, die den exklusivsten Klub der Menschheitsgeschichte begründete. Wir schreiben das Jahr 1348. Englands König Eduard III. \u2014 ein Kriegskönig, der gerade die Franzosen in der Schlacht von Crécy vernichtend geschlagen hat \u2014 gibt einen großen Ball in seinem Schloss.',
  moralOrLesson: 'Wahre Ritterlichkeit liegt in der Verteidigung der Ehre und der Verwandlung von Spott in Tugend \u2014 eine einzige Geste der Größe kann eine Institution schaffen, die Jahrhunderte überdauert',
  characters: [
    'Eduard III. \u2014 König von England, Gründer des Hosenbandordens',
    'Johanna, Gräfin von Salisbury (\u00abDie Schöne Maid von Kent\u00bb) \u2014 Die Dame, deren herabgefallenes Strumpfband den Orden inspirierte',
    'Eduard, der Schwarze Prinz \u2014 Gründungsritter und gefürchtetster Krieger Europas',
    'Heinrich von Grosmont, Herzog von Lancaster \u2014 Gründungsritter',
    'Sir John Chandos \u2014 Gründungsritter und Meisterstratege',
    'König Artus \u2014 Das mythische Vorbild, auf dessen Tafelrunde der Orden gegründet wurde',
  ],
  paragraphs: [
    {
      text: 'Dies ist die Geschichte einer Garderobenpanne, die den exklusivsten Klub der Menschheitsgeschichte begründete. Wir schreiben das Jahr 1348. Englands König Eduard III. \u2014 ein Kriegskönig, der gerade die Franzosen in der Schlacht von Crécy vernichtend geschlagen hat \u2014 gibt einen großen Ball in seinem Schloss. Der Saal ist voller Ritter, Adliger und der mächtigsten Menschen Englands. Der Wein fließt, die Musik spielt. Und dann passiert etwas, das alles verändern wird.',
    },
    {
      text: 'Auf der Tanzfläche steht Johanna von Kent \u2014 als schönste Frau Englands bekannt und, so die Gerüchte, die große Obsession des Königs. Mitten im Tanz löst sich ihr Strumpfband \u2014 ein Seidenband, das unterhalb des Knies getragen wurde, um den Strumpf zu halten \u2014 und fällt zu Boden. Vor aller Augen. Im 14. Jahrhundert galt ein Strumpfband als Unterwäsche. Es öffentlich zu sehen, war... sagen wir, die schlimmstmögliche Garderobenpanne. Der ganze Saal brach in Gelächter aus.',
    },
    {
      text: 'Und dann tat Eduard etwas, womit niemand gerechnet hatte. Er durchquerte den Saal, bückte sich und hob das Strumpfband auf. Totenstille. Er sah jedem einzelnen Spötter in die Augen, dann band er sich langsam und betont das blaue Seidenband um sein eigenes Bein. Und er sprach sechs Worte auf Französisch, die die nächsten sieben Jahrhunderte überdauern sollten: \u00abHoni soit qui mal y pense.\u00bb Schande über den, der Böses dabei denkt.',
    },
    {
      text: 'Mit einer einzigen Geste hatte er alles umgedreht. Die Demütigung einer Frau wurde zur Herausforderung eines Königs. Er verkündete dem fassungslosen Saal, dass dieses Strumpfband Symbol eines neuen Ritterordens werden würde \u2014 so erhaben, dass jeder, der gelacht hatte, eines Tages darum betteln würde, es tragen zu dürfen. Man sagt: Wer den Schaden hat, braucht für den Spott nicht zu sorgen. Doch an jenem Abend drehte Eduard den Spieß um und machte den Spott zur höchsten Ehre.',
    },
    {
      text: 'Eduard formte seine Bruderschaft nach dem Vorbild von König Artus und seiner Tafelrunde \u2014 und im 14. Jahrhundert nahm man die Artus-Sagen todernst. Er begrenzte den Orden auf 24 Ritter, genau wie Artus\u2019 mythischer Kreis, und wählte Schloss Windsor als Sitz. Aber das waren keine Ehrentitel für Höflinge. Die Gründungsritter waren die härtesten Kämpfer Englands, darunter Eduards eigener Sohn, der Schwarze Prinz, der gefürchtetste Krieger Europas. Diese Ehre wurde im Kampf verdient, nicht bei Banketten.',
    },
    {
      text: 'Das geistliche Herz des Ordens ist die St.-Georgs-Kapelle in Windsor \u2014 ein gotisches Meisterwerk, in dem zehn Könige und Königinnen ruhen. Geschnitzte Chorgestühle tragen die Wappen jedes Ritters seit 1348, darüber hängen farbige Banner. Jeden Juni schreiten neue Mitglieder in bodenlangen blauen Samtroben und Hüten mit gewaltigen weißen Federn durch die Schlossanlage \u2014 wie aus einem Fantasyfilm. Die Menge jubelt. Die Tradition wurde in fast 700 Jahren kein einziges Mal unterbrochen.',
    },
    {
      text: 'Und hier wird es wirklich erstaunlich: Bis heute ist der Hosenbandorden ein persönliches Geschenk des britischen Monarchen. Kein Premierminister, kein Komitee, keine Politik. Nur der König oder die Königin entscheidet. Winston Churchill trug ihn. Der Duke of Wellington ebenso \u2014 der Mann, der Napoleon schlug. Alles begann mit einem Moment auf einer Tanzfläche: ein König, der die Schande einer Frau in die höchste Ehre des Landes verwandelte und jeden herausforderte, ein Wort dagegen zu sagen.',
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
  for (const story of stories) {
    console.log(`--- ${story.lang.toUpperCase()} ---`);
    validate(story);
  }

  console.log('=== Pushing to DynamoDB ===\n');
  for (const story of stories) {
    await pushStory(story);
  }

  console.log('=== Order of the Garter (ES, FR, DE) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
