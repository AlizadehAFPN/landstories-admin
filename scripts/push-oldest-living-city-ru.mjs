import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // ── Keys & identifiers (unchanged from English) ──
  siteId: "varanasi",
  langStoryId: "ru#oldest-living-city",
  storyId: "oldest-living-city",
  lang: "ru",

  // ── Russian text fields ──
  title: "Город старше легенд",
  subtitle:
    "Старше истории, старше преданий — и ни одного дня тишины за три тысячи лет",
  excerpt:
    "Марк Твен писал, что Варанаси старше истории, старше преданий, старше даже легенд — и выглядит вдвое старше всего этого вместе взятого. Он не преувеличивал.",
  moralOrLesson:
    "Город стоит три тысячи лет не благодаря стенам или армиям, а благодаря тому, что он значит для человеческой души. Дольше всего живут не те места, что построены на камне, а те, что построены на идее настолько глубокой, что каждое поколение по собственной воле — яростно и свободно — решает их отстроить заново.",

  paragraphs: [
    {
      text: "Марк Твен написал, что Варанаси «старше истории, старше преданий, старше даже легенд — и выглядит вдвое старше всего этого, вместе взятого». Когда в 1896 году он подплыл к городу по Гангу, перед ним стояло то, что было здесь тысячелетиями: каменные ступени, уходящие в реку, храмы на каждой крыше, погребальные костры, не гаснущие веками. Многие города называют себя древнейшими на земле. У Варанаси аргумент другой — он ни разу не переставал быть собой.",
    },
    {
      text: "Археологи копали у слияния двух рек и нашли керамику примерно 1800 года до нашей эры. Ниже — пусто. А выше — слой за слоем за слоем, вся история Индии, сложенная из глины и камня. Ни одного пробела. Ни одного перерыва. Ни одной тишины. Ригведа — один из древнейших священных текстов человечества — называет это место Каши, «Город света». Другие великие города забрасывали и через века находили заново. Каши просто продолжал светить.",
    },
    {
      text: "Около 528 года до нашей эры Будда пришёл в Сарнатх — пригород Варанаси — и произнёс свою первую проповедь. Место он выбрал не случайно: Варанаси уже тогда считался интеллектуальной столицей мира. Перед пятью учениками, которые к тому моменту в нём разуверились, он изложил идеи, перевернувшие половину Азии: Срединный путь, Четыре благородные истины, путь к концу страданий. Городу тогда было уже за тысячу лет. Он был древним ещё до рождения буддизма.",
    },
    {
      text: "За Варанаси приходили снова и снова. В 1194 году завоеватели уничтожили почти тысячу храмов. В 1669-м могольский император Аурангзеб снёс главный храм Шивы в Индии и построил на его месте мечеть. Он переименовал город. Новое имя не прижилось. В 1780-м воительница Ахильябай Холкар возвела новый храм — прямо по соседству. Сикхский махараджа покрыл его купол золотом. Индуистская царица построила. Сикхский царь увенчал. Говорят, Бог троицу любит — а этот город он не отпускает уже три тысячи лет.",
    },
    {
      text: "А вот что делает Варанаси по-настоящему особенным. По индуистским писаниям, город стоит на трезубце Шивы, подвешенный между небом и землёй. Когда вселенная будет уничтожена в конце времён, Шива поднимет его над потопом. Священна здесь не постройка — священна земля. Вот почему можно сжечь каждый храм, а Варанаси останется Варанаси. Индуисты верят: тот, кто умрёт в его пределах, навсегда вырвется из круга перерождений. Дом бога можно снести. Землю, на которой он стоит, — нельзя.",
    },
    {
      text: "Но Варанаси — не музей. Пройдите по его переулкам — таким узким, что двое едва разойдутся — и окажетесь в одном потоке с коровами, мотоциклами, похоронными процессиями и школьниками. Это город, подаривший миру Кабира — поэта-бунтаря, которого и сегодня цитируют и индуисты, и мусульмане, и сикхи. Здесь музыкант Бисмилла Хан семьдесят лет играл на рассвете у Ганга и отказывался уезжать, говоря, что не бросит свою реку и своего бога.",
    },
    {
      text: "Каждый вечер на Дашашвамедх-гхате — главной набережной Варанаси — жрецы раскачивают огромные бронзовые лампы в темноте, а тысячи людей смотрят со ступеней и с лодок на чёрной воде. Каждое утро, когда солнце ещё не показалось над дальним берегом, люди спускаются к реке в серых предрассветных сумерках. И город делает то, что делал каждый день последние три тысячи лет: поворачивается лицом к воде, молится, сжигает своих мёртвых — и живёт.",
    },
  ],

  // ── Metadata (unchanged from English) ──
  icon: "🕉️",
  tier: "S",
  storyCategory: "place_names",
  era: "c. 1800 BCE – present (over 3,000 years of continuous habitation)",
  isFree: true,
  hasAudio: false,
  disabled: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 25.3109, lng: 83.0107 },
  characters: [
    "Mark Twain (American author who visited in 1896)",
    "The Buddha (Siddhartha Gautama, who preached at nearby Sarnath)",
    "Xuanzang (Chinese Buddhist pilgrim, 7th century CE)",
    "Ustad Bismillah Khan (shehnai maestro, 1916-2006)",
    "Kabir (mystic poet-weaver, c. 1398-1518)",
    "Tulsidas (author of the Ramcharitmanas, c. 1532-1623)",
  ],
  source:
    "Twain, Mark. Following the Equator, 1897, Ch. LVIII; Eck, Diana L. Banaras: City of Light, Princeton University Press, 1982; Narain, A.K. and Roy, T.N. Excavations at Rajghat, Banaras Hindu University, 1976; Skanda Purana, Kashi Khanda (12th-14th century CE); Dhammacakkappavattana Sutta (Samyutta Nikaya 56.11); Xuanzang, Da Tang Xiyu Ji (Great Tang Records on the Western Regions, 7th century CE)",
  updatedAt: Math.floor(Date.now() / 1000),
};

async function push() {
  console.log("Pushing Russian story: ru#oldest-living-city");
  console.log("siteId:", item.siteId);
  console.log("langStoryId:", item.langStoryId);
  console.log("title:", item.title);
  console.log("paragraphs:", item.paragraphs.length);
  console.log("updatedAt:", item.updatedAt);
  console.log("");

  // Validate paragraph constraints
  for (let i = 0; i < item.paragraphs.length; i++) {
    const p = item.paragraphs[i];
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    console.log(`  P${i}: ${chars} chars, ${words} words`);
    if (chars > 500) console.warn(`  ⚠️  P${i} exceeds 500 char limit!`);
    if (words > 100) console.warn(`  ⚠️  P${i} exceeds 100 word limit!`);
  }

  const totalChars = item.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`\n  Total: ${totalChars} chars across ${item.paragraphs.length} paragraphs`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log("\n✅ Successfully pushed ru#oldest-living-city to Story table.");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        "\n⚠️  Record already exists. Overwriting with updated version..."
      );
      await docClient.send(
        new PutCommand({ TableName: "Story", Item: item })
      );
      console.log("✅ Successfully overwrote ru#oldest-living-city.");
    } else {
      console.error("\n❌ Push failed:", err);
      throw err;
    }
  }
}

push();
