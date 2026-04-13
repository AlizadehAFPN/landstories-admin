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
  siteId: 'jerusalem-old-city',
  storyId: 'holy-fire-miracle',
  icon: '\u{1F525}',
  tier: 'S',
  source: 'Egeria, Itinerarium Egeriae (c. 385 CE); Bernard the Monk, Itinerarium (c. 870 CE); William of Tyre, Historia (12th century); Skarlakidis, Haris, Holy Fire: The Miracle of the Light of the Resurrection at the Tomb of Christ, 2011; Cohen, Raymond, Saving the Holy Sepulchre, 2008; Cust, L.G.A., The Status Quo in the Holy Places, 1929; Greek Orthodox Patriarchate of Jerusalem, church chronicles; Nusseibeh, Sari, Once Upon a Country, 2007',
  characters: [
    'Greek Orthodox Patriarch of Jerusalem',
    'Empress Helena (church founder)',
    'The Nusseibeh family (Muslim key-keepers since 637 CE)',
    'Tunom (Ottoman-era Muslim convert and martyr)',
    'Caliph Umar ibn al-Khattab',
    'Pilgrims across seventeen centuries',
  ],
  era: '4th century \u2013 present (annual ceremony since at least 385 CE)',
  readingTimeMinutes: 5,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 35.2296, lat: 31.7784 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  SPANISH \u2014 \u00abEl Fuego Sagrado\u00bb
//  Proverb: \u00abDios aprieta pero no ahoga\u00bb
//  \u2014 subverted: God goes further here \u2014 He extinguishes
//    every light, then casually lights it back up
// ═══════════════════════════════════════════════════════════
const es = {
  lang: 'es',
  langStoryId: 'es#holy-fire-miracle',
  title: 'El Fuego Sagrado',
  subtitle: 'Diecisiete siglos lleva una llama apareciendo en el sepulcro de Cristo cada S\u00e1bado Santo \u2014 y nadie ha logrado explicar c\u00f3mo',
  excerpt: 'La v\u00edspera de Pascua, toda llama en la Iglesia del Santo Sepulcro se apaga. Cada l\u00e1mpara, cada vela \u2014 extinguida. Diez mil peregrinos permanecen en esa oscuridad absoluta, aferrados a treinta y tres velas sin encender, una por cada a\u00f1o que Cristo camin\u00f3 sobre la tierra. Esperan como siempre han esperado quienes conocen la p\u00e9rdida: con el recuerdo de la luz y la fe de que volver\u00e1.',
  moralOrLesson: 'Milagro o misterio, el Fuego Sagrado responde a algo m\u00e1s profundo que la prueba. Durante diecisiete siglos, la gente ha regresado a la misma tumba de piedra porque lleva dentro un saber antiguo: la oscuridad nunca tiene la \u00faltima palabra. La luz vuelve \u2014 si estamos dispuestos a permanecer juntos en lo oscuro el tiempo suficiente para recibirla.',
  paragraphs: [
    {
      text: 'La v\u00edspera de Pascua, toda llama en la Iglesia del Santo Sepulcro se apaga. Cada l\u00e1mpara, cada vela \u2014 extinguida. La iglesia queda a oscuras como una tumba sellada. Diez mil peregrinos permanecen en esa oscuridad absoluta, aferrados a treinta y tres velas sin encender \u2014 una por cada a\u00f1o que Cristo camin\u00f3 sobre la tierra. Han venido de Atenas y Addis Abeba, de Mosc\u00fa y Tbilisi. Esperan como siempre han esperado quienes conocen la p\u00e9rdida: con el recuerdo de la luz y la fe de que volver\u00e1.',
    },
    {
      text: 'El Patriarca entra en el Ed\u00edculo, el peque\u00f1o santuario de m\u00e1rmol que cubre la tumba donde fue sepultado Cristo y, seg\u00fan los creyentes, resucit\u00f3. Lo han registrado ante la multitud: ni cerillas, ni encendedor, nada que produzca fuego terrenal. La puerta se sella. Cae el silencio. Entonces una luz parpadea tras las ventanitas ovaladas de la tumba. El Patriarca sale con dos antorchas encendidas y la iglesia estalla. El fuego salta de mecha en mecha, de mano en mano, hasta que diez mil llamas devoran la oscuridad entera.',
    },
    {
      text: 'Esto lleva pasando diecisiete siglos. Una viajera romana llamada Egeria lo describi\u00f3 hacia el a\u00f1o 385. D\u00e9cadas antes, Helena, madre de Constantino, encontr\u00f3 el lugar de la crucifixi\u00f3n bajo un templo romano, y el emperador levant\u00f3 una bas\u00edlica sobre la tumba. La iglesia fue destruida y reconstruida una y otra vez: por persas, por un califa egipcio, por terremotos, por el tiempo. Pero cada S\u00e1bado Santo, el fuego regres\u00f3. Dicen que Dios aprieta pero no ahoga. Aqu\u00ed fue m\u00e1s lejos: apag\u00f3 toda luz y luego, como quien no quiere la cosa, la volvi\u00f3 a encender.',
    },
    {
      text: 'En 1579, los armenios consiguieron permiso otomano para dirigir la ceremonia, y el Patriarca griego qued\u00f3 fuera, a las puertas. Rezaba junto a una columna de m\u00e1rmol. Dentro, los armenios esperaban. El fuego no lleg\u00f3. Pero afuera, la columna se parti\u00f3 con un estruendo de trueno y una llama brot\u00f3 de la grieta ante el Patriarca desterrado. Esa grieta sigue ah\u00ed hoy, ennegrecida por el fuego, visible para cualquiera que entre. La piedra recuerda lo que pas\u00f3, aunque los hombres lo olviden.',
    },
    {
      text: 'Entre los testigos estaba un oficial otomano llamado Tunom. Al ver fuego brotar de la piedra, declar\u00f3 su fe en Cristo en el acto. Lo apresaron y lo quemaron vivo por abandonar el islam \u2014 consumido por fuego terrenal por creer en uno celestial. La Iglesia lo venera como m\u00e1rtir hasta hoy. Los otomanos, sacudidos por lo ocurrido, devolvieron a los griegos el derecho de dirigir la ceremonia. Ese derecho no ha sido cuestionado en cuatro siglos y medio.',
    },
    {
      text: 'La iglesia es una par\u00e1bola de la naturaleza humana. Seis confesiones la comparten bajo reglas tan precisas que mover una silla puede provocar una pelea a pu\u00f1etazos entre monjes. Una escalera de madera lleva apoyada en la fachada desde 1728, sin que nadie la toque, porque ninguna confesi\u00f3n tiene autoridad para cambiar nada. \u00bfY la llave de la puerta principal? La guardan dos familias musulmanas desde el a\u00f1o 637, porque los cristianos no fueron capaces de confi\u00e1rsela entre ellos. Solo en Jerusal\u00e9n puede existir un arreglo as\u00ed: absurdo, hermoso y todav\u00eda en pie.',
    },
    {
      text: 'Hoy, vuelos ch\u00e1rter llevan la llama de Jerusal\u00e9n a Atenas, Mosc\u00fa, Bucarest y Addis Abeba en cuesti\u00f3n de horas. Trabajadores de aeropuerto la reciben con aplausos. Presidentes la esperan en pista. Un fuego encendido en una tumba de piedra el s\u00e1bado por la tarde alcanza cuatro continentes el domingo por la ma\u00f1ana. Los peregrinos pasan las manos por la llama y juran que no quema. Los esc\u00e9pticos niegan con la cabeza. Pero todos vuelven cada a\u00f1o a quedarse juntos en la oscuridad \u2014 porque eso es lo que los seres humanos han hecho siempre.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  FRENCH \u2014 \u00abLe Feu Sacr\u00e9\u00bb
//  Proverb: \u00abAide-toi, le ciel t\u2019aidera\u00bb
//  \u2014 subverted: here there is nothing you can do \u2014
//    the fire needs no help, it returns on its own
// ═══════════════════════════════════════════════════════════
const fr = {
  lang: 'fr',
  langStoryId: 'fr#holy-fire-miracle',
  title: 'Le Feu Sacr\u00e9',
  subtitle: 'Depuis dix-sept si\u00e8cles, une flamme appara\u00eet dans le tombeau du Christ le Samedi Saint \u2014 et personne n\u2019a jamais su expliquer comment',
  excerpt: 'La veille de P\u00e2ques, toutes les flammes de l\u2019\u00e9glise du Saint-S\u00e9pulcre sont \u00e9teintes. Chaque lampe, chaque bougie \u2014 souffl\u00e9e. Dix mille p\u00e8lerins se tiennent dans une obscurit\u00e9 absolue, serrant dans leurs mains trente-trois bougies \u00e9teintes, une pour chaque ann\u00e9e que le Christ a pass\u00e9e sur terre. Ils attendent comme ont toujours attendu ceux qui connaissent le deuil\u00a0: avec le souvenir de la lumi\u00e8re, et la foi qu\u2019elle reviendra.',
  moralOrLesson: 'Miracle ou myst\u00e8re, le Feu Sacr\u00e9 r\u00e9pond \u00e0 quelque chose de plus profond que la preuve. Depuis dix-sept si\u00e8cles, les gens reviennent au m\u00eame tombeau de pierre parce qu\u2019ils portent en eux un savoir ancien\u00a0: l\u2019obscurit\u00e9 n\u2019a jamais le dernier mot. La lumi\u00e8re revient \u2014 \u00e0 condition d\u2019accepter de rester ensemble dans le noir assez longtemps pour la recevoir.',
  paragraphs: [
    {
      text: 'La veille de P\u00e2ques, toutes les flammes de l\u2019\u00e9glise du Saint-S\u00e9pulcre sont \u00e9teintes. Chaque lampe, chaque bougie \u2014 souffl\u00e9e. L\u2019\u00e9glise plonge dans une obscurit\u00e9 de tombeau. Dix mille p\u00e8lerins se tiennent dans ce noir absolu, serrant dans leurs mains trente-trois bougies \u00e9teintes \u2014 une pour chaque ann\u00e9e que le Christ a pass\u00e9e sur terre. Ils sont venus d\u2019Ath\u00e8nes et d\u2019Addis-Abeba, de Moscou et de Tbilissi. Ils attendent comme ont toujours attendu ceux qui connaissent le deuil\u00a0: avec le souvenir de la lumi\u00e8re, et la foi qu\u2019elle reviendra.',
    },
    {
      text: 'Le Patriarche entre dans l\u2019\u00c9dicule, le sanctuaire de marbre au-dessus du tombeau o\u00f9 le Christ fut enseveli et, selon les croyants, ressuscit\u00e9. On l\u2019a fouill\u00e9 devant la foule\u00a0: pas d\u2019allumette, pas de briquet, aucun feu terrestre. La porte est scell\u00e9e. Le silence tombe. Puis une lueur vacille derri\u00e8re les fen\u00eatres ovales du tombeau. Le Patriarche sort avec deux torches enflamm\u00e9es et l\u2019\u00e9glise explose. Le feu bondit de m\u00e8che en m\u00e8che, de main en main, jusqu\u2019\u00e0 ce que dix mille flammes engloutissent les t\u00e9n\u00e8bres.',
    },
    {
      text: 'Cela dure depuis dix-sept si\u00e8cles. Une voyageuse romaine nomm\u00e9e \u00c9g\u00e9rie en fit le r\u00e9cit vers 385. Avant elle, H\u00e9l\u00e8ne, m\u00e8re de l\u2019empereur Constantin, avait retrouv\u00e9 le lieu de la crucifixion sous un temple romain, et Constantin fit \u00e9riger une basilique sur le tombeau. L\u2019\u00e9glise fut d\u00e9truite et reb\u00e2tie, d\u00e9truite et reb\u00e2tie \u2014 par les Perses, par un calife, par des s\u00e9ismes, par le temps. On dit \u00ab\u00a0aide-toi, le ciel t\u2019aidera\u00a0\u00bb. Le feu, lui, n\u2019a besoin d\u2019aucune aide. Chaque Samedi Saint, il revient seul.',
    },
    {
      text: 'En 1579, les Arm\u00e9niens obtiennent l\u2019autorisation ottomane de diriger la c\u00e9r\u00e9monie, et le Patriarche grec se retrouve enferm\u00e9 dehors. Il prie contre une colonne de marbre, pr\u00e8s de l\u2019entr\u00e9e. \u00c0 l\u2019int\u00e9rieur, les Arm\u00e9niens attendent. Le feu ne vient pas. Mais dehors, la colonne se fend dans un fracas de tonnerre et une flamme jaillit de la fissure devant le Patriarche exil\u00e9. Cette fissure est toujours l\u00e0, noircie par le feu, visible de quiconque franchit la porte. La pierre se souvient de ce que les hommes oublient.',
    },
    {
      text: 'Parmi les t\u00e9moins, un officier ottoman nomm\u00e9 Tunom. En voyant le feu jaillir de la pierre, il d\u00e9clare sa foi dans le Christ sur-le-champ. On l\u2019arr\u00eate et on le br\u00fble vif pour avoir quitt\u00e9 l\u2019islam \u2014 consum\u00e9 par un feu terrestre pour avoir cru en un feu c\u00e9leste. L\u2019\u00c9glise l\u2019honore comme martyr jusqu\u2019\u00e0 ce jour. Les Ottomans, \u00e9branl\u00e9s, rendent aux Grecs le droit de diriger la c\u00e9r\u00e9monie. Ce droit n\u2019a plus \u00e9t\u00e9 contest\u00e9 depuis quatre si\u00e8cles et demi.',
    },
    {
      text: 'L\u2019\u00e9glise est une parabole de la condition humaine. Six confessions la partagent sous des r\u00e8gles si pr\u00e9cises qu\u2019une chaise d\u00e9plac\u00e9e peut d\u00e9clencher une bagarre entre moines. Une \u00e9chelle en bois est appuy\u00e9e sur la fa\u00e7ade depuis 1728 \u2014 personne n\u2019y touche, car aucune confession n\u2019a l\u2019autorit\u00e9 de rien changer. La cl\u00e9 de la porte principale\u00a0? Gard\u00e9e par deux familles musulmanes depuis 637, parce que les chr\u00e9tiens n\u2019ont jamais r\u00e9ussi \u00e0 se la confier. Seule J\u00e9rusalem peut produire un arrangement pareil\u00a0: absurde, magnifique, et toujours debout.',
    },
    {
      text: 'Aujourd\u2019hui, des vols charters emportent la flamme vers Ath\u00e8nes, Moscou, Bucarest, Addis-Abeba en quelques heures. Des agents d\u2019a\u00e9roport l\u2019accueillent sous les applaudissements. Des pr\u00e9sidents l\u2019attendent sur le tarmac. Un feu allum\u00e9 dans un tombeau de pierre le samedi apr\u00e8s-midi atteint quatre continents le dimanche matin. Les p\u00e8lerins passent les mains dans la flamme et jurent qu\u2019elle ne br\u00fble pas. Les sceptiques haussent les \u00e9paules. Mais tous reviennent chaque ann\u00e9e se tenir ensemble dans le noir \u2014 parce que c\u2019est ce que les humains ont toujours fait.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  GERMAN \u2014 \u00abDas Heilige Feuer\u00bb
//  Proverb: \u00abGottes M\u00fchlen mahlen langsam\u00bb
//  \u2014 subverted: on Holy Saturday, God\u2019s mills
//    don\u2019t grind at all \u2014 they catch fire
// ═══════════════════════════════════════════════════════════
const de = {
  lang: 'de',
  langStoryId: 'de#holy-fire-miracle',
  title: 'Das Heilige Feuer',
  subtitle: 'Seit siebzehn Jahrhunderten erscheint eine Flamme in Christi Grab am Karsamstag \u2014 und niemand konnte je erkl\u00e4ren, wie',
  excerpt: 'Am Vorabend von Ostern wird jede Flamme in der Grabeskirche gel\u00f6scht. Jede Lampe, jede Kerze \u2014 aus. Zehntausend Pilger stehen in absoluter Dunkelheit, jeder mit dreiunddrei\u00dfig unangez\u00fcndeten Kerzen in den H\u00e4nden, eine f\u00fcr jedes Lebensjahr Christi. Sie warten, wie alle Trauernden seit jeher gewartet haben: mit nichts als der Erinnerung an das Licht und dem Glauben, dass es zur\u00fcckkehrt.',
  moralOrLesson: 'Ob Wunder oder R\u00e4tsel \u2014 das Heilige Feuer beantwortet etwas Tieferes als die Frage nach dem Beweis. Seit siebzehn Jahrhunderten kehren Menschen zum selben steinernen Grab zur\u00fcck, weil sie ein uraltes Wissen in sich tragen: Dunkelheit hat nie das letzte Wort. Das Licht kommt zur\u00fcck \u2014 wenn wir bereit sind, lange genug gemeinsam im Dunkeln auszuharren, um es zu empfangen.',
  paragraphs: [
    {
      text: 'Am Vorabend von Ostern wird jede Flamme in der Grabeskirche gel\u00f6scht. Jede Lampe, jede Kerze \u2014 aus. Die Kirche versinkt in einer Dunkelheit wie ein versiegeltes Grab. Zehntausend Pilger stehen in dieser Schw\u00e4rze, jeder mit dreiunddrei\u00dfig unangez\u00fcndeten Kerzen in den H\u00e4nden \u2014 eine f\u00fcr jedes Lebensjahr Christi. Sie sind aus Athen und Addis Abeba gekommen, aus Moskau und Tiflis. Sie warten, wie alle Trauernden seit jeher gewartet haben: mit nichts als der Erinnerung an das Licht und dem Glauben, dass es zur\u00fcckkehrt.',
    },
    {
      text: 'Der Patriarch betritt die \u00c4dikula, den Marmorbau \u00fcber dem Grab, in dem Christus bestattet wurde und \u2014 so der Glaube \u2014 auferstand. Man hat ihn vor der Menge durchsucht: kein Streichholz, kein Feuerzeug, kein irdisches Feuer. Die T\u00fcr wird versiegelt. Stille. Dann flackert Licht hinter den ovalen Fenstern des Grabes. Der Patriarch tritt heraus mit zwei brennenden Fackeln, und die Kirche bricht los. Feuer springt von Docht zu Docht, von Hand zu Hand, bis zehntausend Flammen die Dunkelheit verschlingen.',
    },
    {
      text: 'Das geschieht seit siebzehn Jahrhunderten. Eine r\u00f6mische Reisende namens Egeria beschrieb es um 385. Davor hatte Helena, Mutter Kaiser Konstantins, die Kreuzigungsst\u00e4tte unter einem r\u00f6mischen Tempel entdeckt, und Konstantin lie\u00df eine Basilika \u00fcber dem Grab errichten. Die Kirche wurde zerst\u00f6rt und wieder aufgebaut, zerst\u00f6rt und wieder aufgebaut \u2014 von Persern, einem Kalifen, von Erdbeben, von der Zeit. Gottes M\u00fchlen mahlen langsam, sagt man. Aber am Karsamstag, in diesem steinernen Grab, mahlen sie nicht. Sie fangen Feuer.',
    },
    {
      text: 'Im Jahr 1579 erwirkten die Armenier beim osmanischen Sultan das Recht, die Zeremonie zu leiten. Der griechische Patriarch wurde ausgesperrt. Er stand betend an einer Marmors\u00e4ule neben dem Eingang. Drinnen warteten die Armenier. Das Feuer kam nicht. Doch drau\u00dfen \u2014 die S\u00e4ule spaltete sich mit einem Donnerschlag, und eine Flamme brach aus dem Riss hervor, direkt vor dem verbannten Patriarchen. Der Riss ist heute noch da, schwarz versengt, f\u00fcr jeden sichtbar, der eintritt. Der Stein erinnert sich, auch wenn die Menschen vergessen.',
    },
    {
      text: 'Unter den Zeugen war ein osmanischer Offizier namens Tunom. Als er sah, wie Feuer aus Stein brach, bekannte er sich auf der Stelle zu Christus. Man ergriff ihn und verbrannte ihn bei lebendigem Leib, weil er den Islam verlassen hatte \u2014 verzehrt von irdischem Feuer, weil er an ein himmlisches glaubte. Die Kirche ehrt ihn bis heute als M\u00e4rtyrer. Die Osmanen, ersch\u00fcttert, gaben den Griechen das Recht zur\u00fcck, die Zeremonie zu f\u00fchren. Dieses Recht ist seit viereinhalb Jahrhunderten unangefochten.',
    },
    {
      text: 'Die Grabeskirche ist ein Gleichnis \u00fcber die menschliche Natur. Sechs Konfessionen teilen sie sich nach Regeln, die so genau sind, dass ein verschobener Stuhl eine Schl\u00e4gerei zwischen M\u00f6nchen ausl\u00f6sen kann. Eine Holzleiter lehnt seit 1728 an der Fassade \u2014 unangetastet, weil keine Konfession die Befugnis hat, irgendetwas zu ver\u00e4ndern. Und der Schl\u00fcssel zur Eingangst\u00fcr? Den h\u00fcten zwei muslimische Familien seit 637, weil die Christen einander nicht damit vertrauten. Nur in Jerusalem kann so etwas funktionieren: absurd, sch\u00f6n und immer noch bestehend.',
    },
    {
      text: 'Heute bringen Charterfl\u00fcge die Flamme von Jerusalem nach Athen, Moskau, Bukarest und Addis Abeba \u2014 in wenigen Stunden. Flughafenmitarbeiter empfangen sie mit Jubel. Staatspr\u00e4sidenten stehen auf dem Rollfeld bereit. Ein Feuer, das am Samstagnachmittag in einem steinernen Grab entz\u00fcndet wird, erreicht vier Kontinente am Sonntagmorgen. Pilger fahren mit den H\u00e4nden durch die Flamme und schw\u00f6ren, sie verbrenne nicht. Skeptiker sch\u00fctteln den Kopf. Aber alle kommen jedes Jahr zur\u00fcck, um gemeinsam im Dunkeln zu stehen \u2014 weil Menschen das seit jeher tun.',
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

  console.log(`  Total: ${totalChars} chars (target: 2400\u20133600)`);
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

// ─── Main ────────────────────────────────────────────────
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

  console.log('=== Holy Fire (ES, FR, DE) \u2014 all pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
