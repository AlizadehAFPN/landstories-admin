// Push Chinese (zh), Japanese (ja), and Korean (ko) recreations of
// "The Funeral That United All Faiths" to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across all languages) ──────────────────────────
const shared = {
  siteId: "mevlana-museum",
  storyId: "funeral-all-faiths",
  icon: "\u{1F91D}",
  storyCategory: "prophets_pilgrims",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 37.8719, lng: 32.5047 },
  source: "Historical accounts, Aflaki",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 殊途同归 (different paths, same destination) — subverted: most of the
// time this is just a polite platitude, but Rumi made it flesh-and-blood real.
// Register: Modern Mandarin, WeChat/podcast storytelling. Punchy rhythmic prose.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#funeral-all-faiths",

  title: `让所有信仰落泪的葬礼`,

  subtitle: `穆斯林、基督徒、犹太人和拜火教徒，一起送别同一个人`,

  excerpt:
    `1273年12月17日，安纳托利亚古城科尼亚发生了一件不可思议的事——穆斯林、基督徒、犹太人和拜火教徒走上同一条街，送别同一个人。`,

  moralOrLesson:
    `真正的精神力量超越宗教的边界。爱是普世的语言，无论你走哪条路，心里的那束光都是同一个来源。`,

  characters: [
    `鲁米`,
    `穆斯林会葬者`,
    `基督徒会葬者`,
    `犹太人会葬者`,
    `拜火教徒会葬者`,
  ],

  era: `1273年12月17日`,

  paragraphs: [
    {
      text: `1273年12月17日，鲁米在科尼亚去世了。消息像野火一样传遍了这座安纳托利亚古城的每个角落。街道上很快挤满了前来送行的人——多到把路都堵死了。但让这一天真正被历史记住的，不是一位伟大诗人的离去，而是来送他的那些人。穆斯林来了，基督徒来了，犹太人来了，连拜火教徒也来了。他们各自捧着自己的经书，嘴里念着完全不同的祷词，却肩并肩走进了同一支送葬队伍。在中世纪的安纳托利亚，这种场面本不该存在。`,
    },
    {
      text: `有人忍不住去问那些非穆斯林的会葬者：他是伊斯兰教的圣人，你们为什么来？一位基督徒平静地回答：因为他让我们看见了一件事——所有的路，到最后都通向同一个地方。旁边一位犹太人也被问了同样的话。他说：他教会了我们，爱比宗教更大。他不只是你们的老师，也是我们的。`,
    },
    {
      text: `后来有人把那些非穆斯林会葬者的原话记录了下来。他们说：他也是我们的太阳。我们从他身上，比从自己的老师那里学到了更多关于自己经文的东西。我们在他身上看到了只有先知和圣者才有的光芒。——这番话，出自基督徒、犹太人和拜火教徒之口，说的是一位穆斯林苏菲大师。`,
    },
    {
      text: `送葬队伍本身就像一幅那个年代绝不该出现的画面。前面是伊斯兰传统的旗帜、便携香炉和古兰经箱，鲁米的遗体裹着白色裹尸布，安放在装饰过的灵架上。但往后看，你会看见基督教的十字架，听见犹太教的祈祷声，甚至辨认出拜火教的仪式符号。没有人觉得突兀。没有争论，没有谁试图说服谁。只有共同的悲伤，和发自心底的敬意。`,
    },
    {
      text: `中国人常说殊途同归。但说实话，大多数时候这不过是句安慰人的客套话。鲁米用他的一生，把这四个字变成了肉眼可见的事实。他生前说过一句话：我用同样的目光看待穆斯林、犹太人和基督徒。活着的时候，这是哲学；1273年12月17日，在科尼亚的街头，这句话变成了现实。`,
    },
    {
      text: `七百多年过去了，那场葬礼的故事至今让人心头一震。不是因为排场盛大，而是因为它回答了一个人类永远在问的问题：信仰不同的人，到底能不能真正走到一起？那天的科尼亚给出了答案——能。前提只有一个：得有一个人，先把爱活出来。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 袖振り合うも多生の縁 (even brushing sleeves is fate from past lives)
// — subverted: Rumi's bond with people of every faith was not a passing brush
// of sleeves; it was a lifetime of touching souls directly.
// Register: NHK documentary / popular nonfiction. Clean, precise, emotional
// at key moments. Natural balance of kanji and kana.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#funeral-all-faiths",

  title: `すべての祈りがひとつになった日`,

  subtitle: `イスラム教徒、キリスト教徒、ユダヤ教徒、ゾロアスター教徒が共に歩いた葬列`,

  excerpt:
    `1273年12月17日、アナトリアの古都コンヤで、あらゆる信仰の人々が同じ葬列を歩いた。中世にありえないその光景は、750年以上を経た今も語り継がれている。`,

  moralOrLesson:
    `本当の精神性は宗教の壁を越える。愛は誰にでも届く言葉であり、どの道を歩いていても、心に差し込む光の源はひとつだ。`,

  characters: [
    `ルーミー`,
    `ムスリムの会葬者たち`,
    `キリスト教徒の会葬者たち`,
    `ユダヤ教徒の会葬者たち`,
    `ゾロアスター教徒の会葬者たち`,
  ],

  era: `1273年12月17日`,

  paragraphs: [
    {
      text: `1273年12月17日、ルーミーがこの世を去った。アナトリアの古都コンヤに、その知らせは瞬く間に広がった。通りは見送りの人であふれ、身動きが取れないほどだった。だがこの日が歴史に刻まれたのは、偉大な詩人が亡くなったからではない。彼を送りに来た人々のせいだ。イスラム教徒、キリスト教徒、ユダヤ教徒、ゾロアスター教徒——それぞれが自分の聖典を手に、自分の祈りの言葉を唱えながら、同じ葬列に加わった。中世のアナトリアで、そんなことはありえないはずだった。`,
    },
    {
      text: `非ムスリムの会葬者たちに、誰かが尋ねた。彼はイスラムの聖者だ、なぜあなたがたが来たのか、と。あるキリスト教徒が静かに答えた。彼が見せてくれたからです——すべての道は、最後には同じ場所にたどり着くのだと。隣にいたユダヤ人も同じことを聞かれた。愛は宗教よりも大きい、それを教えてくれたのが彼でした。彼はあなたがたの師であると同時に、私たちの師でもあったのです。`,
    },
    {
      text: `後世の記録によれば、非ムスリムの会葬者たちはこう語ったという。「彼は私たちの太陽でもありました。自分たちの聖典について、自分の師から学んだ以上のことを彼から学びました。彼の中に、預言者と聖者だけが持つ光を見たのです。」——キリスト教徒が、ユダヤ教徒が、ゾロアスター教徒が、一人のムスリムの聖者についてそう語った。`,
    },
    {
      text: `葬列そのものが、あの時代にはありえない光景だった。先頭にはイスラムの旗印、携帯用の香炉、クルアーンの箱。ルーミーの遺体は白い布に包まれ、装飾された輿に載せられていた。だがその後ろには、キリスト教の十字架が掲げられ、ユダヤ教の祈りの声が響き、ゾロアスター教の儀式の印が見えた。誰も不思議に思わなかった。争いもなく、説得もなく、ただ共通の悲しみと、心からの敬意だけがあった。`,
    },
    {
      text: `「袖振り合うも多生の縁」という言葉がある。すれ違うだけでも前世からの縁だという意味だ。だがルーミーの場合、それはすれ違いなどではなかった。宗教も言葉も文化も超えて、人々の魂に直接触れた生涯だった。だからこそ、彼が去った日に、あらゆる信仰が同じ涙を流した。ルーミー自身の言葉がある——「私はムスリムも、ユダヤ教徒も、キリスト教徒も、同じ目で見た。」生きている間は哲学だったその言葉が、1273年12月17日、コンヤの通りの上で現実になった。`,
    },
    {
      text: `750年以上が経った今も、あの葬列の話は人の心を揺さぶる。壮大だったからではない。人類が繰り返し問い続けてきたひとつの問いに、答えを出したからだ。信仰の異なる人間は、本当にひとつになれるのか。あの日のコンヤが証明した。たった一つの条件がある——誰かが先に、愛を生きること。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// KOREAN (ko)
// Proverb: 백지장도 맞들면 낫다 (even a sheet of paper is lighter when held
// together) — subverted: on that day in Konya, it wasn't a sheet of paper that
// became lighter, but centuries of religious walls — made light as paper by one
// man's love.
// Register: Modern Korean popular nonfiction / podcast. Natural spoken-Korean
// rhythm. Favors native Korean words over Sino-Korean where natural.
// ═══════════════════════════════════════════════════════════════════════════════

const ko = {
  ...shared,
  lang: "ko",
  langStoryId: "ko#funeral-all-faiths",

  title: `모든 믿음이 함께 운 장례식`,

  subtitle: `무슬림, 기독교인, 유대인, 조로아스터교도가 한 사람을 보내며 함께 걸은 날`,

  excerpt:
    `1273년 12월 17일, 아나톨리아의 옛 도시 코냐에서 모든 믿음의 사람들이 한 사람의 장례 행렬에 함께 섰다. 중세에 있을 수 없던 그 일은 750년이 넘은 지금도 전해진다.`,

  moralOrLesson:
    `진정한 영적 힘은 종교의 경계를 넘어선다. 사랑은 모든 사람에게 닿는 언어이며, 어떤 길을 걷든 마음에 들어오는 빛의 근원은 하나다.`,

  characters: [
    `루미`,
    `무슬림 조문객들`,
    `기독교인 조문객들`,
    `유대인 조문객들`,
    `조로아스터교도 조문객들`,
  ],

  era: `1273년 12월 17일`,

  paragraphs: [
    {
      text: `1273년 12월 17일, 루미가 세상을 떠났다. 소식은 아나톨리아의 옛 도시 코냐 전체에 삽시간에 퍼졌다. 거리는 조문객으로 넘쳐 발 디딜 틈이 없었다. 하지만 이날을 역사에 남긴 건 위대한 시인의 죽음이 아니었다. 그를 보내러 온 사람들이었다. 무슬림이 왔다. 기독교인이 왔다. 유대인이 왔다. 조로아스터교도까지 왔다. 저마다 자기 경전을 들고, 자기 기도문을 읊으면서, 같은 장례 행렬에 나란히 섰다. 중세 아나톨리아에서, 이런 일은 일어날 수 없는 일이었다.`,
    },
    {
      text: `누군가 비무슬림 조문객들에게 물었다. 그분은 이슬람의 성인인데, 왜 오셨습니까? 한 기독교인이 차분하게 대답했다. 그분이 우리에게 보여줬기 때문입니다. 모든 길은 결국 같은 곳에 닿는다는 걸. 옆에 있던 유대인도 같은 질문을 받았다. 사랑은 종교보다 크다는 걸, 그분이 가르쳐주셨습니다. 그분은 당신들의 스승이면서, 우리 스승이기도 했습니다.`,
    },
    {
      text: `기록에 따르면, 비무슬림 조문객들의 말이 이렇게 남아 있다. 그분은 우리의 태양이기도 했습니다. 우리는 우리 스승에게서보다 그분에게서 우리 경전에 대해 더 많은 것을 배웠습니다. 그분에게서 예언자와 성자만이 가진 빛을 보았습니다. 기독교인이, 유대인이, 조로아스터교도가, 한 명의 무슬림 성자에 대해 이렇게 말한 것이다.`,
    },
    {
      text: `장례 행렬 자체가 그 시대에 있을 수 없는 풍경이었다. 맨 앞에는 이슬람 전통의 깃발과 향로, 꾸란 상자가 있었고, 루미의 시신은 흰 수의에 싸여 장식된 상여 위에 실려 있었다. 그런데 뒤를 돌아보면 기독교의 십자가가 보이고, 유대교의 기도 소리가 들리고, 조로아스터교의 의식 상징까지 있었다. 아무도 이상하게 여기지 않았다. 다툼도 없었고, 설득도 없었다. 오직 함께하는 슬픔과, 마음 깊은 곳에서 우러나온 경의만 있었다.`,
    },
    {
      text: `우리 속담에 백지장도 맞들면 낫다는 말이 있다. 함께 들면 가벼워진다는 뜻이다. 그런데 그날 코냐에서는 종이 한 장이 아니라 수백 년간 쌓여온 종교의 벽이 가벼워졌다. 아무도 설득하지 않았다. 아무도 개종을 요구하지 않았다. 한 사람이 평생을 사랑으로 살았고, 그 사랑이 모든 벽을 종이보다 가볍게 만든 것이다. 루미는 생전에 이렇게 말했다. 나는 무슬림도, 유대인도, 기독교인도, 같은 눈으로 바라보았다. 살아 있을 때, 이 말은 철학이었다. 그가 떠난 1273년 12월 17일, 코냐의 거리 위에서 이 말은 현실이 됐다.`,
    },
    {
      text: `750년이 넘게 지난 지금도, 그날의 이야기는 듣는 사람의 마음을 흔든다. 성대해서가 아니다. 인류가 끝없이 되묻는 질문 하나에 답을 내놓았기 때문이다. 믿음이 다른 사람들이 정말로 하나가 될 수 있는가? 그날의 코냐가 증명했다. 조건은 딱 하나다——누군가 먼저 사랑을 살아내는 것.`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23F3 Pushing ${label} ...`);

  // JSON round-trip validation
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Verify no paragraph has empty text
  for (let i = 0; i < record.paragraphs.length; i++) {
    if (!record.paragraphs[i].text || record.paragraphs[i].text.trim() === "") {
      throw new Error(`Empty paragraph text at index ${i} for ${label}`);
    }
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully (new record).`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `\u26A0\uFE0F  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`\u2705 ${label} overwritten successfully.`);
    } else {
      console.error(`\u274C Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══ Pushing Funeral All Faiths CJK recreations to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja, ko]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      totalChars += p.text.length;
    }
    console.log(
      `\n\uD83D\uDCCA ${rec.lang} "${rec.title}": ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
    if (totalChars < 600 || totalChars > 1800) {
      console.warn(
        `\u26A0\uFE0F  ${rec.lang} total chars (${totalChars}) outside target range [600-1800]`
      );
    }
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);
  await pushStory(ko);

  console.log("\n═══ All three CJK recreations pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
