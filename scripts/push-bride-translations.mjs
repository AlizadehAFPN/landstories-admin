import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Base fields (unchanged from English) ───────────────────────────────────
const base = {
  siteId: "palmyra",
  storyId: "bride-of-the-desert",
  icon: "\u{1F42A}",
  storyCategory: "builders_wonders",
  era: "c. 2nd millennium BC (earliest mention) \u2013 3rd century AD (golden age); 137 AD (the Palmyra Tariff)",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.5505, lng: 38.2684 },
  characters: [
    "The Palmyrene merchant caravaneers (synodiarchs)",
    "Bel, Yarhibol, and Aglibol (the divine triad)",
    "Pliny the Elder (Roman naturalist)",
    "King Solomon (legendary builder of Tadmor)",
    "Male son of Yarhai (caravan leader, honored 135 AD)",
  ],
  source:
    "Pliny the Elder, Naturalis Historia V.88; Josephus, Antiquities of the Jews VIII.6.1; The Palmyra Tariff inscription (CIS II 3913), 137 AD, Hermitage Museum, St. Petersburg; Starcky, Jean, \u2018Palmyre,\u2019 Supplement au Dictionnaire de la Bible, 1966; Browning, Iain, Palmyra, 1979; Smith, Andrew M. II, Roman Palmyra: Identity, Community, and State Formation, 2013; Stoneman, Richard, Palmyra and Its Empire, 1994",
  updatedAt: NOW,
};

// ═════════════════════════════════════════════════════════════════════════════
// SPANISH
// Proverb: "Quien mucho abarca, poco aprieta"
// ═════════════════════════════════════════════════════════════════════════════
const es = {
  ...base,
  lang: "es",
  langStoryId: "es#bride-of-the-desert",
  title: "La novia del desierto",
  subtitle:
    "C\u00f3mo un manantial en el desierto sirio dio vida a la ciudad caravanera m\u00e1s rica de la Ruta de la Seda \u2014 y por qu\u00e9 una ley fiscal de cinco metros tallada en piedra cuenta la historia de toda una civilizaci\u00f3n",
  excerpt:
    "En el desierto sirio, a doscientos kil\u00f3metros del mar m\u00e1s cercano, un manantial caliente brot\u00f3 entre las rocas. Alrededor de esa fuente, contra toda l\u00f3gica, naci\u00f3 una de las ciudades m\u00e1s ricas de la Tierra.",
  moralOrLesson:
    "Las grandes fortunas no las construyen quienes conquistan territorios, sino quienes traducen entre mundos \u2014 y el poder m\u00e1s duradero no pertenece al imperio que exige obediencia, sino al cruce de caminos que se hace indispensable para todos.",
  paragraphs: [
    {
      text: "Desierto sirio, doscientos kil\u00f3metros hasta el mar m\u00e1s cercano. Arena y roca hasta donde alcanza la vista. Y de pronto, un manantial caliente brota entre las piedras. Unas palmeras datileras. Un oasis. Y alrededor de ese oasis, una de las ciudades m\u00e1s ricas del mundo antiguo. Los \u00e1rabes la llamaron Tadmor, \u00abciudad de palmeras\u00bb. Los griegos, Palmira. La Biblia dice que la fund\u00f3 Salom\u00f3n. Seguramente no \u2014 pero era tan rica que solo el hombre m\u00e1s sabio de la historia parec\u00eda un fundador a la altura.",
    },
    {
      text: "Lo que hizo rica a Palmira no fue ning\u00fan misterio: ubicaci\u00f3n y agallas. Estaba exactamente a medio camino entre Roma y Persia, dos superpotencias que necesitaban comerciar pero no se soportaban. Las alternativas eran pasos de monta\u00f1a lej\u00edsimos al norte o desierto brutal al sur. Palmira era el \u00fanico oasis lo bastante grande para mantener viva una caravana en la ruta directa. Sus mercaderes se convirtieron en los intermediarios definitivos \u2014 sin pertenecer a ning\u00fan imperio, sirviendo a ambos, haci\u00e9ndose ricos a costa de todos.",
    },
    {
      text: "Y lo que pasaba por all\u00ed era de v\u00e9rtigo. Seda de China, pimienta y canela de la India, incienso de Arabia, perlas del golfo P\u00e9rsico, marfil de \u00c1frica. De vuelta iba vino y cristal romano. Palmira no fabricaba nada \u2014 simplemente mov\u00eda las mercanc\u00edas, las gravaba con impuestos y se quedaba con un porcentaje de cada operaci\u00f3n. Sus familias de comerciantes fueron los primeros operadores log\u00edsticos globales de la historia, controlando un imperio comercial sin levantar jam\u00e1s un ej\u00e9rcito.",
    },
    {
      text: "Los jefes de caravana eran mitad financieros, mitad soldados, mitad directores generales. Financiaban cientos de camellos, contrataban ej\u00e9rcitos privados y cruzaban semanas de desierto donde un error de ruta significaba la muerte. Cuando uno tra\u00eda la carga a salvo, la ciudad le conced\u00eda su m\u00e1ximo honor: una estatua de bronce en la avenida principal. Esa avenida ten\u00eda m\u00e1s de un kil\u00f3metro y 750 columnas, cada una con la figura de un mercader. En Roma, una estatua por ganar una guerra. En Palmira, por entregar la seda.",
    },
    {
      text: "En el a\u00f1o 137 d.C., los mercaderes se hartaron de recaudadores corruptos que inventaban tasas sobre la marcha. As\u00ed que tallaron el c\u00f3digo fiscal entero en una losa de caliza de cinco metros \u2014 en arameo y en griego \u2014 y la plantaron en la plaza p\u00fablica. Cada producto, cada tarifa, visible y permanente. Transparencia fiscal literalmente grabada en piedra. Esa losa sigue existiendo hoy, en el Museo del Hermitage de San Petersburgo \u2014 una de las inscripciones antiguas m\u00e1s largas jam\u00e1s encontradas.",
    },
    {
      text: "En su apogeo, en el siglo III, cien mil personas viv\u00edan all\u00ed. La piedra arenisca dorada atrapaba la luz del desierto. El Templo de Bel era uno de los mayores de Oriente Medio. Fuera de las murallas, torres funerarias de cinco pisos albergaban a los muertos, cuyos retratos mostraban mujeres cubiertas de perlas y oro. Todo en Palmira era traducci\u00f3n \u2014 mercanc\u00edas entre imperios, inscripciones en dos lenguas, dioses tomados de una docena de culturas y fundidos en algo nuevo.",
    },
    {
      text: "Pero en el 272, una reina palmirena llamada Zenobia hizo una apuesta fatal. Decidi\u00f3 que su ciudad no deb\u00eda seguir siendo intermediaria \u2014 deb\u00eda ser un imperio. Conquist\u00f3 Egipto, arrebat\u00f3 territorio a Roma y declar\u00f3 la independencia. Quien mucho abarca, poco aprieta: el emperador Aureliano march\u00f3 al este con sus legiones y la aplast\u00f3. La ciudad que hab\u00eda prosperado durante siglos por no ser de nadie se vino abajo en el momento en que quiso ser alguien.",
    },
    {
      text: "Algunas de esas columnas siguen en pie en el desierto sirio, sin sus estatuas, los mercaderes de bronce desaparecidos hace siglos. Pero la piedra del impuesto perdura en su vitrina de San Petersburgo. Y si lees sus filas de cifras y mercanc\u00edas, todav\u00eda puedes sentir el pulso de una ciudad que crey\u00f3 en algo radical: que el verdadero poder no era un ej\u00e9rcito, sino plantarte entre dos mundos y ser el \u00fanico capaz de hablar con ambos.",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// FRENCH
// Proverb: "Qui trop embrasse mal étreint"
// ═════════════════════════════════════════════════════════════════════════════
const fr = {
  ...base,
  lang: "fr",
  langStoryId: "fr#bride-of-the-desert",
  title: "La fianc\u00e9e du d\u00e9sert",
  subtitle:
    "Comment une source chaude dans le d\u00e9sert syrien a donn\u00e9 naissance \u00e0 la plus riche cit\u00e9 caravani\u00e8re de la Route de la Soie \u2014 et pourquoi un code fiscal de cinq m\u00e8tres grav\u00e9 dans la pierre raconte l\u2019histoire de toute une civilisation",
  excerpt:
    "Dans le d\u00e9sert syrien, \u00e0 deux cents kilom\u00e8tres de la mer la plus proche, une source chaude jaillit de la roche. Autour de cette source, contre toute logique, naquit l\u2019une des villes les plus riches de la Terre.",
  moralOrLesson:
    "Les plus grandes fortunes ne sont pas b\u00e2ties par ceux qui conqu\u00e8rent des territoires, mais par ceux qui traduisent entre les mondes \u2014 et le pouvoir le plus durable n\u2019appartient pas \u00e0 l\u2019empire qui impose l\u2019ob\u00e9issance, mais au carrefour qui se rend indispensable \u00e0 tous.",
  paragraphs: [
    {
      text: "D\u00e9sert syrien, deux cents kilom\u00e8tres jusqu\u2019\u00e0 la c\u00f4te la plus proche. Sable et roche \u00e0 perte de vue. Et l\u00e0, une source chaude jaillit de la pierre. Des palmiers-dattiers. Une oasis. Puis, contre toute logique, l\u2019une des villes les plus riches du monde antique. Les Arabes l\u2019appel\u00e8rent Tadmor \u2014 \u00ab\u202fla cit\u00e9 des palmiers\u202f\u00bb. Les Grecs la rebaptis\u00e8rent Palmyre. La Bible dit que Salomon la b\u00e2tit. Presque certainement faux \u2014 mais l\u2019endroit \u00e9tait si fabuleux que seul le roi le plus sage de l\u2019Histoire semblait un fondateur \u00e0 la hauteur.",
    },
    {
      text: "Ce qui fit la fortune de Palmyre tenait en deux mots\u202f: g\u00e9ographie et culot. La ville se trouvait \u00e0 mi-chemin entre Rome et la Perse \u2014 deux superpuissances qui devaient commercer mais se d\u00e9testaient. Les alternatives\u202f? Des cols montagneux loin au nord ou un d\u00e9sert mortel au sud. Palmyre \u00e9tait la seule oasis assez grande pour garder une caravane en vie sur la route directe. Ses marchands devinrent les interm\u00e9diaires ultimes \u2014 n\u2019appartenant \u00e0 aucun empire, servant les deux, s\u2019enrichissant sur le dos de tout le monde.",
    },
    {
      text: "Les marchandises qui y transitaient donnent le vertige. Soie de Chine, poivre et cannelle d\u2019Inde, encens d\u2019Arabie, perles du golfe Persique, ivoire d\u2019Afrique. En retour, du vin et du verre romains partaient vers l\u2019est. Palmyre ne fabriquait rien \u2014 elle d\u00e9pla\u00e7ait la marchandise, la taxait et pr\u00e9levait sa part sur chaque transaction. Ses familles de n\u00e9gociants furent les premiers logisticiens mondiaux de l\u2019Histoire, g\u00e9rant un empire commercial sans jamais lever une arm\u00e9e.",
    },
    {
      text: "Les chefs de caravane \u00e9taient un m\u00e9lange de banquiers, de soldats et de PDG. Ils finan\u00e7aient des centaines de chameaux, engageaient des arm\u00e9es priv\u00e9es et traversaient des semaines de d\u00e9sert o\u00f9 une erreur signifiait la mort. Quand l\u2019un d\u2019eux ramenait la cargaison intacte, la ville lui offrait son plus grand honneur\u202f: une statue de bronze sur l\u2019avenue principale. Plus d\u2019un kilom\u00e8tre de long, 750 colonnes, chacune portant l\u2019effigie d\u2019un marchand. \u00c0 Rome, on \u00e9rigeait des statues pour les g\u00e9n\u00e9raux. \u00c0 Palmyre, pour ceux qui livraient la soie.",
    },
    {
      text: "En 137 apr\u00e8s J.-C., les marchands en eurent assez des collecteurs corrompus qui inventaient les taux. Ils grav\u00e8rent tout le code fiscal sur une dalle de calcaire de cinq m\u00e8tres \u2014 en aram\u00e9en et en grec \u2014 et l\u2019install\u00e8rent sur la place publique. Chaque produit, chaque tarif, visible et permanent. La transparence fiscale litt\u00e9ralement grav\u00e9e dans la pierre. Cette dalle existe encore, au mus\u00e9e de l\u2019Ermitage \u00e0 Saint-P\u00e9tersbourg \u2014 l\u2019une des plus longues inscriptions antiques jamais d\u00e9couvertes.",
    },
    {
      text: "\u00c0 son apog\u00e9e, au IIIe si\u00e8cle, cent mille personnes vivaient l\u00e0. Le gr\u00e8s dor\u00e9 captait la lumi\u00e8re du d\u00e9sert. Le temple de B\u00eal comptait parmi les plus grands du Moyen-Orient. Hors les murs, des tours fun\u00e9raires de cinq \u00e9tages abritaient les morts, dont les portraits montrent des femmes couvertes de perles et d\u2019or. Tout ici \u00e9tait traduction \u2014 marchandises entre empires, inscriptions en deux langues, dieux emprunt\u00e9s \u00e0 une douzaine de cultures et fondus en quelque chose de nouveau.",
    },
    {
      text: "Puis en 272, une reine palmyr\u00e9nienne du nom de Z\u00e9nobie fit un pari fatal. Elle d\u00e9cida que sa ville ne devait plus se contenter d\u2019\u00eatre interm\u00e9diaire \u2014 elle devait devenir un empire. Elle conquit l\u2019\u00c9gypte, arracha des territoires \u00e0 Rome et d\u00e9clara l\u2019ind\u00e9pendance. Mais qui trop embrasse mal \u00e9treint\u202f: l\u2019empereur Aur\u00e9lien marcha vers l\u2019est avec ses l\u00e9gions et l\u2019\u00e9crasa. La cit\u00e9 qui avait prosp\u00e9r\u00e9 pendant des si\u00e8cles en n\u2019appartenant \u00e0 personne fut an\u00e9antie le jour o\u00f9 elle voulut devenir quelqu\u2019un.",
    },
    {
      text: "Quelques-unes de ces colonnes se dressent encore dans le d\u00e9sert syrien, sans leurs statues, les marchands de bronze disparus depuis des si\u00e8cles. Mais la pierre du tarif demeure dans sa vitrine \u00e0 Saint-P\u00e9tersbourg. Et si vous lisez ses rang\u00e9es de chiffres et de marchandises, vous entendez encore battre le c\u0153ur d\u2019une ville qui croyait en une chose\u202f: que le vrai pouvoir n\u2019est pas une arm\u00e9e, mais se tenir entre deux mondes et \u00eatre le seul \u00e0 pouvoir parler aux deux.",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// GERMAN
// Proverb: "Hochmut kommt vor dem Fall"
// ═════════════════════════════════════════════════════════════════════════════
const de = {
  ...base,
  lang: "de",
  langStoryId: "de#bride-of-the-desert",
  title: "Die Braut der W\u00fcste",
  subtitle:
    "Wie eine warme Quelle in der syrischen W\u00fcste die reichste Karawanenstadt der Seidenstra\u00dfe hervorbrachte \u2014 und warum ein f\u00fcnf Meter langes Steuergesetz in Stein die Geschichte einer ganzen Zivilisation erz\u00e4hlt",
  excerpt:
    "In der syrischen W\u00fcste, zweihundert Kilometer von der n\u00e4chsten K\u00fcste entfernt, sprudelte eine warme Quelle aus dem Fels. Um diese Quelle herum entstand, gegen jede Logik, eine der reichsten St\u00e4dte der Erde.",
  moralOrLesson:
    "Die gr\u00f6\u00dften Verm\u00f6gen werden nicht von denen aufgebaut, die Territorien erobern, sondern von denen, die zwischen Welten \u00fcbersetzen \u2014 und die dauerhafteste Macht geh\u00f6rt nicht dem Imperium, das Gehorsam erzwingt, sondern der Kreuzung, die sich f\u00fcr alle unentbehrlich macht.",
  paragraphs: [
    {
      text: "Syrische W\u00fcste, zweihundert Kilometer bis zur n\u00e4chsten K\u00fcste. Sand und Fels, soweit das Auge reicht. Und mitten im Nichts sprudelt eine warme Quelle aus dem Gestein. Dattelpalmen wachsen drumherum. Eine Oase. Dann, gegen jede Logik, eine der reichsten St\u00e4dte der Antike. Die Araber nannten sie Tadmor \u2014 \u201eStadt der Dattelpalmen\u201c. Die Griechen tauften sie Palmyra. Die Bibel behauptet, Salomo habe sie erbaut. Fast sicher falsch \u2014 aber der Ort war so sagenhaft reich, dass nur der weiseste K\u00f6nig der Geschichte als Gr\u00fcnder glaubhaft schien.",
    },
    {
      text: "Was Palmyra reich machte, war im Grunde simpel: Lage und Chuzpe. Die Stadt lag genau auf halbem Weg zwischen Rom und Persien \u2014 zwei Superm\u00e4chte, die miteinander handeln mussten, sich aber nicht ausstehen konnten. Die Alternativen? Gebirgsp\u00e4sse weit im Norden oder gnadenlose W\u00fcste im S\u00fcden. Palmyra war die einzige Oase, die gro\u00df genug war, um eine Karawane auf der direkten Route am Leben zu halten. Ihre H\u00e4ndler wurden die ultimativen Mittelsm\u00e4nner \u2014 keinem Reich zugeh\u00f6rig, beide bedienend, an allen verdienend.",
    },
    {
      text: "Und was da durchlief, ist schwindelerregend. Seide aus China, Pfeffer und Zimt aus Indien, Weihrauch aus Arabien, Perlen aus dem Persischen Golf, Elfenbein aus Afrika. In die andere Richtung flossen r\u00f6mischer Wein und Glas. Palmyra stellte nichts davon her \u2014 die Stadt bewegte die Waren, besteuerte sie und strich bei jedem Gesch\u00e4ft ihren Anteil ein. Ihre Kaufmannsfamilien waren die weltweit ersten Logistikkonzerne: ein Handelsimperium, ohne je eine Armee aufzustellen.",
    },
    {
      text: "Die Karawanenanf\u00fchrer waren Bankier, Soldat und Vorstandschef in einer Person. Sie finanzierten Hunderte Kamele, heuerten Privatarmeen an und durchquerten wochenlang offene W\u00fcste, wo ein falscher Abzweig den Tod bedeutete. Brachte einer die Fracht heil zur\u00fcck, verlieh die Stadt ihre h\u00f6chste Ehre: eine Bronzestatue an der Hauptstra\u00dfe. \u00dcber einen Kilometer lang, ges\u00e4umt von 750 S\u00e4ulen, jede mit dem Bildnis eines H\u00e4ndlers. In Rom gab es Statuen f\u00fcr gewonnene Kriege. In Palmyra f\u00fcr gelieferte Seide.",
    },
    {
      text: "Im Jahr 137 n.\u202fChr. hatten die H\u00e4ndler genug von korrupten Steuereintreibern, die Tarife nach Gutd\u00fcnken erfanden. Sie mei\u00dfelten das gesamte Steuergesetz in eine f\u00fcnf Meter hohe Kalksteinplatte \u2014 auf Aram\u00e4isch und Griechisch \u2014 und stellten sie auf den Marktplatz. Jedes Produkt, jeder Satz, sichtbar und dauerhaft. Steuertransparenz buchst\u00e4blich in Stein gemei\u00dfelt. Die Platte existiert noch heute, in der Eremitage in Sankt Petersburg \u2014 eine der l\u00e4ngsten antiken Inschriften, die je gefunden wurden.",
    },
    {
      text: "Auf dem H\u00f6hepunkt im 3.\u202fJahrhundert lebten hunderttausend Menschen hier. Goldener Sandstein fing das W\u00fcstenlicht ein. Der Bel-Tempel z\u00e4hlte zu den gr\u00f6\u00dften im Nahen Osten. Vor den Mauern ragten f\u00fcnfst\u00f6ckige Grabt\u00fcrme auf, vollgepackt mit Toten, deren Portr\u00e4ts Frauen in Perlen und Gold zeigen. Alles in Palmyra war \u00dcbersetzung \u2014 Waren zwischen Imperien, Inschriften in zwei Sprachen, G\u00f6tter aus einem Dutzend Kulturen, verschmolzen zu etwas Neuem.",
    },
    {
      text: "Dann, 272, wagte die palmyrenische K\u00f6nigin Zenobia eine fatale Wette. Ihre Stadt sollte nicht l\u00e4nger Vermittlerin sein \u2014 sondern Imperium. Sie eroberte \u00c4gypten, riss sich r\u00f6misches Territorium unter den Nagel und erkl\u00e4rte die Unabh\u00e4ngigkeit. Doch Hochmut kommt vor dem Fall: Kaiser Aurelian marschierte mit seinen Legionen gen Osten und zerschmetterte sie. Die Stadt, die jahrhundertelang gediehen war, weil sie niemandem geh\u00f6rte, ging unter, als sie jemand sein wollte.",
    },
    {
      text: "Einige dieser S\u00e4ulen stehen noch in der syrischen W\u00fcste, ohne ihre Statuen, die Bronzeh\u00e4ndler seit Jahrhunderten verschwunden. Aber der Steuerstein \u00fcberdauert in seiner Vitrine in Sankt Petersburg. Und wer seine Reihen aus Zahlen und Waren liest, kann noch immer den Herzschlag einer Stadt sp\u00fcren, die an etwas Radikales glaubte: dass wahre Macht keine Armee ist \u2014 sondern zwischen zwei Welten zu stehen und der Einzige zu sein, der mit beiden sprechen kann.",
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// PUSH
// ═════════════════════════════════════════════════════════════════════════════
const records = [
  { label: "SPANISH (es)", data: es },
  { label: "FRENCH  (fr)", data: fr },
  { label: "GERMAN  (de)", data: de },
];

for (const { label, data } of records) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Pushing ${label}  →  ${data.langStoryId}`);
  console.log(`${"=".repeat(60)}`);

  // Validate JSON before pushing
  try {
    const json = JSON.stringify(data);
    JSON.parse(json); // round-trip validation
    console.log(`  ✓ JSON valid  (${json.length} bytes)`);
  } catch (e) {
    console.error(`  ✗ JSON validation FAILED:`, e.message);
    process.exit(1);
  }

  // Validate paragraph constraints
  for (let i = 0; i < data.paragraphs.length; i++) {
    const p = data.paragraphs[i].text;
    const chars = p.length;
    const words = p.split(/\s+/).length;
    const ok = chars <= 550 && words <= 110; // ±20% tolerance
    console.log(
      `  P${i + 1}: ${chars} chars, ${words} words ${ok ? "✓" : "✗ OVER LIMIT"}`
    );
    if (!ok) {
      console.error(`  ✗ Paragraph ${i + 1} exceeds limits!`);
      process.exit(1);
    }
  }

  // Check the record doesn't already exist
  const existing = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: data.siteId, langStoryId: data.langStoryId },
    })
  );
  if (existing.Item) {
    console.log(`  ⚠ Record already exists — will overwrite.`);
  }

  // Push to DynamoDB
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
      })
    );
    console.log(`  ✓ PUSHED SUCCESSFULLY`);
  } catch (e) {
    console.error(`  ✗ PUSH FAILED:`, e.message);
    process.exit(1);
  }

  // Verify by reading back
  const verify = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: data.siteId, langStoryId: data.langStoryId },
    })
  );
  if (verify.Item && verify.Item.title === data.title) {
    console.log(`  ✓ VERIFIED — title: "${verify.Item.title}"`);
  } else {
    console.error(`  ✗ VERIFICATION FAILED`);
    process.exit(1);
  }
}

console.log(`\n${"=".repeat(60)}`);
console.log("ALL 3 RECORDS PUSHED AND VERIFIED SUCCESSFULLY");
console.log(`updatedAt: ${NOW} (${new Date(NOW * 1000).toISOString()})`);
console.log(`${"=".repeat(60)}\n`);
