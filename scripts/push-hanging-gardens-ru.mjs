import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // === Keys ===
  siteId: "babylon",
  langStoryId: "ru#hanging-gardens",
  lang: "ru",
  storyId: "hanging-gardens",

  // === Russian text ===
  title: "Сады, которых не было",
  subtitle: "Единственное чудо света ради любви — и единственное, которого, возможно, не было вовсе",
  excerpt: "Из семи чудес древнего мира шесть мы нашли. Пирамида стоит. От остальных остались хотя бы руины. Но Висячие сады Вавилона — единственное чудо, построенное не для бога и не для славы, а для любви — не найдены до сих пор. Ни камня, ни фундамента. Самый знаменитый сад в истории, возможно, никогда не существовал.",

  paragraphs: [
    {
      text: "Из семи чудес древнего мира шесть мы нашли. Пирамида стоит. От остальных — хотя бы руины, хотя бы фундамент. А вот Висячие сады Вавилона — единственное чудо, которое якобы построили не ради бога и не ради славы, а ради любви — не нашли вообще. Ни камня, ни корня, ни единого кирпича. Самый знаменитый сад в истории человечества, возможно, никогда не существовал."
    },
    {
      text: "История такая. Примерно в 600 году до нашей эры Навуходоносор II — самый могущественный правитель на планете — женился на Амитис, принцессе из горной Мидии, с территории нынешнего Ирана. Она выросла среди прохладных ручьёв и зелёных долин. А попала в Вавилон — плоский, пыльный, с пятидесятиградусной жарой и финиковыми пальмами до горизонта. Она тосковала по дому. И тогда царь, который сжигал храмы и покорял народы, задумал невозможное — построить ей гору."
    },
    {
      text: "Античные авторы описывали сады взахлёб. Историк Диодор, писавший спустя века, утверждал: сто двадцать метров в длину и ширину, террасы высотой в двадцать метров. Каждый ярус запечатан тростником, кирпичом и свинцом, а сверху — столько земли, что росли взрослые деревья. Воду из Евфрата поднимали наверх винтовым механизмом, и она каскадом стекала по каналам. Один автор назвал это «вечной весной, парящей над головами тех, кто шёл внизу»."
    },
    {
      text: "Проблема в том, что ничего не сходится. Навуходоносор оставил сотни надписей о своих стройках — стены, ворота, дворцы, храмы. Про сад — ни слова. Историк Геродот побывал в Вавилоне через сто лет и подробно описал город. Садов не упомянул. Первое письменное свидетельство появилось через триста лет после смерти царя. Археологи копали Вавилон восемнадцать лет начиная с 1899 года — и не нашли ничего. Самый знаменитый сад в истории не оставил ни единого следа."
    },
    {
      text: "В 2013 году оксфордский ассириолог Стефани Далли перевернула всё. Сады существовали — только не в Вавилоне. Они были в Ниневии, четыреста пятьдесят километров к северу, и построил их ассирийский царь Синаххериб на столетие раньше. Его надписи описывают террасные сады с бронзовыми водоподъёмниками и акведуком длиной в восемьдесят километров. Рельеф из его дворца, хранящийся в Британском музее, изображает сады на колоннах — точь-в-точь как в античных описаниях. Древние авторы просто перепутали города."
    },
    {
      text: "Даже название — обман. «Висячие» — от греческого «кремастос», и это не «подвешенные на цепях», а «свисающие», как одна терраса нависает над другой. Представьте ступенчатый склон из деревьев и цветов, где зелень каждого яруса переливается через край на нижний — и всё это посреди плоской пустыни, как нечто, чего здесь быть не должно. Не сад в небе — а лес, притворяющийся горой."
    },
    {
      text: "Бог, говорят, троицу любит. У этой загадки ровно три разгадки — и все три могут оказаться неправдой. Может, сады погребены под Вавилоном, где грунтовые воды не дают копать. Может, они стояли в Ниневии. А может, их сшили из рассказов путешественников, и как единое место они не существовали никогда."
    },
    {
      text: "Но вот что не исчезло за двадцать шесть веков: история о царе, который посмотрел на самый могущественный город на земле и подумал — она несчастна. И попытался вырастить для неё гору. Сады исчезли. Любовь — нет. Может быть, это и есть настоящее чудо света."
    }
  ],

  moralOrLesson: "Самый прекрасный сад в истории, возможно, никогда не существовал — или существовал совсем в другом месте, построенный другим царём и совсем не ради любви. Но история не умирает, потому что отвечает на вопрос глубже, чем способна копнуть любая археология: может ли любовь заставить расцвести невозможное? Были ли террасы в Вавилоне или в Ниневии, была ли царица Амитис реальной или выдумкой поздних летописцев — Висячие сады остаются самым древним памятником идее о том, что величайшие чудеса мы строим не для себя, а для тех, кого не можем видеть несчастными.",

  // === Unchanged fields from English ===
  characters: [
    "Nebuchadnezzar II -- the king who allegedly built the gardens for love",
    "Amytis of Media -- his homesick queen who longed for the green mountains of her homeland",
    "Berossus -- Babylonian priest whose lost account (c. 290 BCE) is the earliest source",
    "Stephanie Dalley -- Oxford Assyriologist who argued the gardens were actually in Nineveh",
    "Robert Koldewey -- excavator who believed he found the garden foundations in 1899"
  ],
  source: "Josephus, Contra Apionem I.19 (quoting Berossus, Babyloniaca c. 290 BCE); Diodorus Siculus, Bibliotheca Historica II.10; Strabo, Geography XVI.1.5; Philo of Byzantium, De Septem Orbis Spectaculis; Dalley, Stephanie. The Mystery of the Hanging Garden of Babylon, Oxford University Press, 2013; Koldewey, Robert. The Excavations at Babylon, 1914; Finkel, Irving. The Ark Before Noah, Hodder & Stoughton, 2014; Reade, Julian. 'Alexander the Great and the Hanging Gardens of Babylon,' Iraq 62, 2000",
  era: "c. 600 BCE (traditional date); first written accounts c. 290 BCE; archaeological debate ongoing",
  icon: "🌿",
  tier: "S",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lng: 44.4209, lat: 32.5363 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "love_heartbreak",
  updatedAt: Math.floor(Date.now() / 1000),
};

async function push() {
  // Validate JSON structure
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error("Missing required fields");
  }
  if (!item.paragraphs || item.paragraphs.length < 6) {
    throw new Error("Too few paragraphs");
  }
  for (const [i, p] of item.paragraphs.entries()) {
    if (!p.text || p.text.length === 0) {
      throw new Error(`Paragraph ${i} has empty text`);
    }
    if (p.text.length > 550) {
      throw new Error(`Paragraph ${i} exceeds 550 chars: ${p.text.length}`);
    }
  }

  // Check it doesn't already exist
  const existing = await docClient.send(new GetCommand({
    TableName: "Story",
    Key: { siteId: "babylon", langStoryId: "ru#hanging-gardens" },
  }));
  if (existing.Item) {
    console.log("⚠️  Russian version already exists. Overwriting...");
  }

  // Push
  await docClient.send(new PutCommand({
    TableName: "Story",
    Item: item,
  }));

  // Verify
  const verify = await docClient.send(new GetCommand({
    TableName: "Story",
    Key: { siteId: "babylon", langStoryId: "ru#hanging-gardens" },
  }));

  if (verify.Item && verify.Item.title === item.title) {
    console.log("✅ Push successful!");
    console.log(`   siteId:      ${verify.Item.siteId}`);
    console.log(`   langStoryId: ${verify.Item.langStoryId}`);
    console.log(`   lang:        ${verify.Item.lang}`);
    console.log(`   title:       ${verify.Item.title}`);
    console.log(`   paragraphs:  ${verify.Item.paragraphs.length}`);
    console.log(`   updatedAt:   ${verify.Item.updatedAt}`);

    // Print character counts
    console.log("\n   Paragraph lengths:");
    let total = 0;
    for (const [i, p] of verify.Item.paragraphs.entries()) {
      console.log(`     [${i+1}] ${p.text.length} chars`);
      total += p.text.length;
    }
    console.log(`   Total: ${total} chars`);
  } else {
    throw new Error("Verification failed — item not found after push");
  }
}

push().catch(err => {
  console.error("❌ Push failed:", err.message);
  process.exit(1);
});
