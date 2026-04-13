import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ── Russian story content ──────────────────────────────────────

const title = "Кинжал на подушке Саладина";

const subtitle =
  "Три покушения на самого могущественного султана — и ночь, когда тень доказала, что власть — это ещё не безопасность";

const excerpt =
  "Саладин проснулся в шатре и увидел тень, скользнувшую во мрак. Рядом с подушкой — горячие лепёшки, какие пекли только ассасины, и кинжал, пронзивший записку с угрозами. К нему приходила сама смерть — и решила не забирать.";

const moralOrLesson =
  "Даже самый могущественный завоеватель должен признать пределы своей власти: того, кого не могут убить армии, способна достать тихая рука, проходящая сквозь любую охрану. И мудрость — в умении понять, что враг, которого нельзя уничтожить, станет лучшим союзником.";

const paragraphs = [
  {
    text: "В 1174 году Саладин был самым могущественным человеком на Ближнем Востоке. Он захватил Египет, объединил его с Сирией под единой властью и готовился к великому походу — тому самому, что в итоге вернёт Иерусалим из рук крестоносцев. Ни одна армия не могла ему ничего противопоставить. Но был один враг, который обходился без армий. Он сидел в горной крепости Масьяф и вёл свои войны не полками, а одним клинком — всаженным между рёбер правителя в глухую ночь.",
  },
  {
    text: "Его звали Рашид ад-Дин Синан — крестоносцы прозвали его Старцем Горы. Он возглавлял сирийских ассасинов — секту, которая довела искусство прицельного убийства до совершенства в персидской крепости Аламут. Их люди с детства учились проникать в любой двор, носить любую личину и бить один раз — зная, что живыми не уйдут. У Синана с Саладином были личные счёты: султан уничтожил в Египте халифат, на котором выросла вера ассасинов, и уже примеривался к их горным крепостям.",
  },
  {
    text: "В 1174 году Синан отправил тринадцать своих людей в лагерь Саладина — убить султана. Тринадцать — необычно много для одного задания, и уже одно это говорит о том, насколько серьёзной считали цель. Они почти добрались. Но местный эмир Хумартакин, правивший замком по соседству с территорией ассасинов, узнал лазутчиков раньше, чем те успели нанести удар. Поднялась тревога. Все тринадцать схвачены. Первая попытка провалилась — но Синан не из тех, кто сдаётся с одного раза.",
  },
  {
    text: "22 мая 1176 года Синан попробовал снова. Во время осады Саладином крепости Азаз на севере Сирии ассасины в форме султанских солдат бросились на самого Саладина. Один ударил клинком в голову — лезвие соскользнуло со стальной шапки, спрятанной под тюрбаном. Другой полоснул по горлу — кольчуга под одеждой приняла удар. Саладин дрался с ними врукопашную, пока не подоспела стража. Все нападавшие были убиты. Но послание дошло яснее любого клинка: они могут до него добраться.",
  },
  {
    text: "Саладин двинул армию на Масьяф и осадил крепость. Вокруг шатра он рассыпал мел и золу — чтобы любой шаг оставлял след, — расставил стражу и зажёг масляные лампы по периметру. Все меры, какие мог придумать военный ум. А потом однажды ночью султан проснулся и увидел тень, скользнувшую через полог. Рядом с подушкой: тёплые лепёшки, какие пекли только ассасины, отравленный кинжал и записка от Синана. Хлеб ещё тёплый. Ни единого следа на меле.",
  },
  {
    text: "Вдумайтесь на секунду. Кто-то прошёл через вооружённый лагерь, мимо каждого караульного, по земле, устланной мелом, — встал над самым могущественным человеком на Ближнем Востоке, пока тот спал, — и решил оставить доказательство вместо трупа. Мог перерезать горло. Оставил выпечку. Говорят, Бог троицу любит. Третий визит и правда оказался решающим — только кинжал на подушке был не покушением. Это была визитная карточка.",
  },
  {
    text: "Саладин снял осаду через несколько дней. Больше он никогда не нападал на крепости ассасинов. Было заключено перемирие, и — в одном из самых удивительных поворотов эпохи Крестовых походов — люди Синана в итоге встали плечом к плечу с Саладином против крестоносцев. Клинок, оставленный рядом с подушкой, а не вонзённый в сердце султана, сделал то, чего не смогло бы ни одно убийство. Он превратил врага в союзника. Иногда самое сильное оружие — то, которым решаешь не воспользоваться.",
  },
];

// ── Validation ─────────────────────────────────────────────────

console.log("=== Paragraph validation ===\n");
let totalChars = 0;
let hasError = false;

for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].text.length;
  const words = paragraphs[i].text.split(/\s+/).length;
  totalChars += chars;
  const charFlag = chars > 500 ? " ⚠ OVER 500!" : "";
  const wordFlag = words > 100 ? " ⚠ OVER 100!" : "";
  console.log(`P${i + 1}: ${chars} chars, ${words} words${charFlag}${wordFlag}`);
  if (chars > 500 || words > 100) hasError = true;
}

console.log(`\nTotal: ${totalChars} chars across ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);

if (hasError) {
  console.error("\n❌ Validation failed — fix paragraphs before pushing.");
  process.exit(1);
}

if (totalChars < 2400 || totalChars > 3600) {
  console.warn(`\n⚠ Total chars ${totalChars} outside ±20% range`);
}

// ── Fetch English record and create Russian version ────────────

async function main() {
  console.log("\n=== Fetching English record ===\n");

  const enResult = await docClient.send(
    new GetCommand({
      TableName: "Story",
      Key: {
        siteId: "alamut-castle",
        langStoryId: "en#dagger-on-saladins-pillow",
      },
    })
  );

  if (!enResult.Item) {
    console.error("❌ English record not found!");
    process.exit(1);
  }

  const enRecord = enResult.Item;
  console.log(`Found: "${enRecord.title}" (${enRecord.paragraphs.length} paragraphs)`);

  // Build Russian record: copy ALL English fields, override text + meta
  const ruRecord = {
    ...enRecord,
    lang: "ru",
    langStoryId: "ru#dagger-on-saladins-pillow",
    title,
    subtitle,
    excerpt,
    moralOrLesson,
    paragraphs,
    updatedAt: Math.floor(Date.now() / 1000),
  };

  console.log("\n=== Pushing Russian record ===\n");

  await docClient.send(
    new PutCommand({
      TableName: "Story",
      Item: ruRecord,
      ConditionExpression: "attribute_not_exists(siteId)",
    })
  );

  console.log("✅ Russian version pushed successfully!");
  console.log(`   siteId: ${ruRecord.siteId}`);
  console.log(`   langStoryId: ${ruRecord.langStoryId}`);
  console.log(`   title: ${ruRecord.title}`);
  console.log(`   paragraphs: ${ruRecord.paragraphs.length}`);
  console.log(`   updatedAt: ${ruRecord.updatedAt}`);
}

main().catch((err) => {
  if (err.name === "ConditionalCheckFailedException") {
    console.error("❌ Russian record already exists! Use UpdateCommand to modify.");
    process.exit(1);
  }
  console.error("❌ Push failed:", err.message);
  process.exit(1);
});
