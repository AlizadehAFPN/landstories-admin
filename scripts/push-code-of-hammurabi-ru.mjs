// Push "The Law Written in Stone" → Russian recreation: "Высечено навечно"
// Proverb: "Бог троицу любит" — subverted: Babylonian god Shamash didn't
// favor threes; one time was enough.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

const ru = {
  // ── Identity ───────────────────────────────────────────────────────────────
  siteId: "babylon",
  storyId: "code-of-hammurabi",
  lang: "ru",
  langStoryId: "ru#code-of-hammurabi",
  updatedAt: NOW,

  // ── Text fields (Russian recreation) ───────────────────────────────────────
  title: "Высечено навечно",

  subtitle:
    "Как вавилонский царь высек 282 закона на чёрном камне и навсегда изменил понятие справедливости",

  excerpt:
    "Почти четыре тысячи лет назад царь Вавилона высек 282 закона на столбе из чёрного камня и поставил его в храме — чтобы каждый мог их увидеть. Среди этих законов был принцип, который отзовётся в каждой правовой системе планеты: око за око, зуб за зуб.",

  moralOrLesson:
    "До Хаммурапи справедливость была тем, что сильный навязывал слабому. После Хаммурапи справедливость — по крайней мере в теории — стала записанной, видимой и обязательной для всех. Кодекс не был справедливым по современным меркам. Он различал сословия, карал бедных строже, чем богатых, и предписывал жестокости, которых мы бы не потерпели. Но он утвердил революционную идею: закон существует до преступления, наказание должно быть соразмерным, и даже царь подчиняется чему-то большему, чем его собственная воля. Эта идея, высеченная на чёрном камне на языке, который три тысячи лет никто не мог прочесть, оказалась неразрушимой.",

  paragraphs: [
    {
      text: "Около 1755 года до нашей эры царь Вавилона сделал то, на что ни один правитель до него не решался. Хаммурапи взял 282 закона — об убийствах, кражах, разводах, даже о халтурном строительстве — и приказал высечь их на столбе из чёрного камня высотой больше двух метров, настолько твёрдого, что его почти невозможно было обработать. А потом поставил столб в храме, на виду у всех. Посыл был революционным: закон — не тайна избранных. Закон принадлежит каждому.",
    },
    {
      text: "На вершине столба высечена сцена, которая говорит обо всём. Хаммурапи стоит перед Шамашем — вавилонским богом солнца, тем, кто видел всё и не прощал ни одной лжи. Шамаш вручает ему жезл и кольцо — древние символы божественной власти. Смысл предельно ясен: это не прихоти какого-то царя. За этими законами стоит небо. Ниже — сорок девять колонок клинописи, регулирующих почти каждый уголок повседневной жизни.",
    },
    {
      text: "Хаммурапи не был философом. Он был завоевателем. Когда он взошёл на трон около 1792 года до нашей эры, Вавилон был маленьким царством, окружённым врагами. За тридцать лет он разгромил их всех — включая Мари, богатый торговый город на Евфрате, чьё разрушение потрясло древний мир. Дошедшие до нас письма показывают царя, который лично разбирал споры за воду и выслеживал продажных чиновников. Кодекс стал шедевром одержимого контролем.",
    },
    {
      text: "Самый знаменитый закон — номер 196: выбьешь глаз свободному человеку — выбьют тебе. Око за око — принцип, который звучит в Библии, Коране и каждом суде планеты. Бог троицу любит — так у нас говорят. В Вавилоне бог Шамаш троицу не жаловал: хватало и одного раза. Но справедливость зависела от сословия. Ослепишь богатого — лишишься глаза. Ослепишь простолюдина — заплатишь штраф. Ослепишь раба — заплатишь хозяину. Закон был для всех. Равным для всех он не был.",
    },
    {
      text: "Некоторые законы поражают своей современностью. Если строитель схалтурил и дом рухнул, убив хозяина, — строителя казнили. Если муж попал в плен на войне, жена могла выйти замуж снова — а если он возвращался, она сама выбирала, с кем остаться. Жена, доказавшая, что муж её постоянно унижал, могла забрать свои деньги и уйти. Четыре тысячи лет назад женщины в Вавилоне имели законную защиту от эмоционального насилия.",
    },
    {
      text: "Столб простоял в храме шесть веков. А потом, около 1158 года до нашей эры, царь по имени Шутрук-Наххунте вторгся с территории нынешнего юго-западного Ирана, разграбил город Сиппар и утащил камень как военный трофей. Он начал сбивать имя Хаммурапи, чтобы высечь своё — но так и не закончил. Столб пролежал в земле больше трёх тысяч лет, забытый каждой цивилизацией, которая рождалась и умирала над ним.",
    },
    {
      text: "В декабре 1901 года французский археолог Жак де Морган откопал его в городе Шуш на территории нынешнего Ирана. Находка стала сенсацией. Когда учёный по имени Жан-Венсан Шей перевёл текст на следующий год, параллели с библейскими законами — особенно с книгой Исход — бросались в глаза. Исследователям, считавшим законы Моисея полностью оригинальными, пришлось признать: вавилонский царь записал поразительно похожие правила на тысячу с лишним лет раньше.",
    },
    {
      text: "Сегодня столб стоит в Лувре в Париже, по-прежнему устремлённый к небу. Его законы несправедливы по нашим меркам — они защищали богатых и допускали жестокости, которых мы бы не потерпели. Но Хаммурапи подарил миру идею, пережившую все империи: закон существует до преступления, наказание должно быть соразмерным, и даже царь подчиняется чему-то большему, чем собственная воля. Он высек эту идею на самом твёрдом камне, какой смог найти. Четыре тысячи лет спустя никто не смог её стереть.",
    },
  ],

  // ── Unchanged fields (from English record) ─────────────────────────────────
  icon: "\u2696\uFE0F",
  tier: "A",
  readingTimeMinutes: 9,
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  coordinates: { lat: 32.5363, lng: 44.4209 },
  era: "c. 1755-1750 BCE (code\u2019s promulgation); discovered at Susa, Iran, in 1901-1902",
  source:
    "The Code of Hammurabi (Louvre, Sb 8); Scheil, Jean-Vincent. M\u00e9moires de la D\u00e9l\u00e9gation en Perse, vol. 4, 1902 (first translation); Roth, Martha T. Law Collections from Mesopotamia and Asia Minor, Scholars Press, 1995; Van De Mieroop, Marc. King Hammurabi of Babylon: A Biography, Blackwell, 2005; Richardson, Seth. \u2018On Seeing and Believing: Liver Divination and the Era of Warring States,\u2019 in Divination and Interpretation of Signs in the Ancient World, Oriental Institute, 2010; Driver, G.R. and Miles, John C. The Babylonian Laws, 2 vols., Oxford, 1952-1955; Charpin, Dominique. Hammurabi of Babylon, I.B. Tauris, 2012; Laws of Ur-Nammu (c. 2100 BCE); Laws of Eshnunna (c. 1930 BCE)",
  characters: [
    "Hammurabi -- sixth king of the First Babylonian Dynasty (r. 1792-1750 BCE)",
    "Shamash -- the sun god of justice, depicted handing Hammurabi the rod and ring of kingship",
    "Shutruk-Nahhunte -- Elamite king who looted the stele as war booty around 1158 BCE",
    "Jacques de Morgan -- French archaeologist who discovered the stele at Susa in 1901-1902",
    "Jean-Vincent Scheil -- Dominican friar who translated the code and revealed it to the modern world",
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATE
// ═══════════════════════════════════════════════════════════════════════════════
console.log("── Pre-push validation ──");
console.log(`   title:       "${ru.title}"`);
console.log(`   langStoryId: "${ru.langStoryId}"`);
console.log(`   paragraphs:  ${ru.paragraphs.length}`);
console.log(`   updatedAt:   ${ru.updatedAt}`);

// Check paragraph lengths
for (let i = 0; i < ru.paragraphs.length; i++) {
  const t = ru.paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  const ok = chars <= 600 && words <= 120; // 500 + 20% tolerance
  console.log(
    `   P${i + 1}: ${chars} chars, ${words} words ${ok ? "✓" : "✗ OVER LIMIT"}`
  );
  if (!ok) {
    console.error(`   ABORT: paragraph ${i + 1} exceeds limits`);
    process.exit(1);
  }
}

// Verify JSON is valid by round-tripping
try {
  JSON.parse(JSON.stringify(ru));
  console.log("   JSON:        valid ✓");
} catch (e) {
  console.error("   JSON validation FAILED:", e.message);
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════════════
console.log("\n── Pushing RUSSIAN (ru) ──");
try {
  await docClient.send(new PutCommand({ TableName: TABLE, Item: ru }));
  console.log("   ✓ Pushed successfully");
} catch (err) {
  console.error("   ✗ Push FAILED:", err.message);
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERIFY
// ═══════════════════════════════════════════════════════════════════════════════
console.log("\n── Verifying ──");
const res = await docClient.send(
  new GetCommand({
    TableName: TABLE,
    Key: { siteId: "babylon", langStoryId: "ru#code-of-hammurabi" },
  })
);

if (res.Item && res.Item.title === ru.title && res.Item.paragraphs.length === 8) {
  console.log(`   ✓ Verified (title: "${res.Item.title}", paragraphs: ${res.Item.paragraphs.length})`);
  console.log(`   ✓ excerpt starts: "${res.Item.excerpt.substring(0, 60)}..."`);
  console.log(`   ✓ lang: "${res.Item.lang}"`);
} else {
  console.error("   ✗ Verification FAILED — record mismatch");
  process.exit(1);
}

// Confirm English record is untouched
const en = await docClient.send(
  new GetCommand({
    TableName: TABLE,
    Key: { siteId: "babylon", langStoryId: "en#code-of-hammurabi" },
  })
);
if (en.Item && en.Item.title === "The Law Written in Stone") {
  console.log('   ✓ English record untouched ("The Law Written in Stone")');
} else {
  console.error("   ✗ WARNING: English record may have been altered!");
}

console.log("\n── Done ──\n");
