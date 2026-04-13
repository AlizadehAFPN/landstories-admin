/**
 * Push "The Fall of Croesus" story in zh, ja, ko to DynamoDB Story table.
 * Each language is a native recreation, NOT a translation.
 *
 * Proverbs woven in:
 *   zh: 聪明反被聪明误 (The clever are undone by their own cleverness)
 *   ja: 身から出た錆 (Rust from your own body — you brought it on yourself)
 *   ko: 제 꾀에 제가 넘어간다 (Tripped by your own cunning)
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───────────────────────────
const shared = {
  siteId: "delphi",
  storyId: "croesus-prophecy",
  icon: "\u{1F451}",
  tier: "S",
  source: "Herodotus\u2019s Histories (Book 1, chapters 46\u201391), Plutarch\u2019s Moralia",
  characters: ["Croesus of Lydia", "Cyrus the Great", "The Pythia", "Apollo"],
  era: "546 BCE",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 38.4824, lng: 22.501 },
  hasAudio: false,
  isFree: true,
  storyCategory: "lost_found",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════
//  CHINESE (zh) — Modern Mandarin, simplified characters
//  Proverb: 聪明反被聪明误
//  Register: Popular podcast / WeChat long-form article
// ═══════════════════════════════════════════════════════════════════════
const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#croesus-prophecy",
  title: `听错一句话，亡了一个国`,
  subtitle: `古代首富克洛伊索斯被一句神谕亲手葬送`,
  excerpt: `说到古代世界的首富，只有一个名字——克洛伊索斯。他是吕底亚的国王，王国就在今天土耳其西部，脚下踩着取之不尽的金矿。钱多到一定程度，人就开始觉得什么都能买，包括未来。`,
  moralOrLesson: `预言是用谜语包装的真话。聪明人追问，傲慢的人以为自己早就懂了。先认清自己，才能读懂命运的答案。`,
  paragraphs: [
    {
      text: `说到古代世界的首富，只有一个名字——克洛伊索斯。他是吕底亚的国王，王国就在今天土耳其西部，脚下踩着取之不尽的金矿。在古希腊，\u201c像克洛伊索斯一样有钱\u201d就相当于今天说\u201c富可敌国\u201d。钱多到一定程度，人就开始觉得什么都能买，包括未来。于是他给德尔菲神庙送去了天价供品：一尊两百多公斤重的纯金狮子、成堆的金碗，还有一百一十七根金条。目的只有一个——让神站在自己这边。`,
    },
    {
      text: `可公元前546年，一个天大的麻烦来了。波斯的居鲁士大帝，那个时代最可怕的军事天才，正在一个接一个地吞并王国。东边的米底帝国已经被灭了，现在他掉头向西，直奔吕底亚而来。克洛伊索斯必须做出选择：先发制人，还是坐等被打？他决定去问当时全世界最灵的预言家——德尔菲的神谕。`,
    },
    {
      text: `阿波罗神殿的女祭司皮提亚给了他一个注定载入史册的回答：\u201c你若渡过哈吕斯河，一个伟大的帝国将会覆灭。\u201d就这么一句话。没有细节，没有附加条件。就像一颗精心包装的炸弹，漂漂亮亮地递到了他手上。`,
    },
    {
      text: `克洛伊索斯听到的，恰好就是他想听到的。一个伟大的帝国覆灭？那肯定是波斯啊。他欢天喜地，又追加了一大批黄金送去德尔菲还愿，然后挥师东渡哈吕斯河——那条河正好是他和居鲁士领土之间的分界线。可他从头到尾都没问过那个本可以救他一命的问题：到底是哪个帝国？`,
    },
    {
      text: `第一仗打了个平手。克洛伊索斯退回首都萨第斯，打算熬过冬天、召集盟友、开春再战。可居鲁士不是那种给你喘息机会的对手。他一路追到萨第斯城下，围城仅仅十四天就攻了进去。古代世界的首富，就这样沦为了阶下囚。而神谕说会覆灭的那个伟大帝国——是他自己的。`,
    },
    {
      text: `据希腊历史学家希罗多德记载，居鲁士下令把克洛伊索斯绑上柴堆活活烧死。火焰升起的那一刻，克洛伊索斯朝天呼喊阿波罗的名字——就是那个他砸了无数黄金供奉的神，就是那个用神谕把他送上战场的神。然后，万里晴空之下，一场暴雨突然倾盆而下，浇灭了大火。居鲁士被这个神迹震住了，命人把克洛伊索斯从柴堆上拉下来，改封他做了王室顾问。`,
    },
    {
      text: `但克洛伊索斯咽不下这口气。他给德尔菲送去了最后一封质问：\u201c这就是阿波罗回报忠实信徒的方式吗？\u201d神谕的回答冷到骨头里：\u201c神说了，一个伟大的帝国会覆灭。你该问的是哪一个。你没听懂预言，也懒得多问一句。怪你自己，别怪神。\u201d`,
    },
    {
      text: `这就是定义了德尔菲数百年声望的故事。神谕从来没有撒谎——她只不过把真话说成了需要你先对自己诚实、才能听懂的样子。克洛伊索斯不是被骗了，是自己骗了自己。俗话说聪明反被聪明误，他带着早就写好的答案走进了神殿，只听见了合他心意的那几个字。两千五百年过去了，我们还在干一模一样的事——听自己想听的，然后把结果叫做命。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
//  JAPANESE (ja) — Natural modern Japanese
//  Proverb: 身から出た錆
//  Register: Compelling NHK documentary / popular nonfiction
// ═══════════════════════════════════════════════════════════════════════
const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#croesus-prophecy",
  title: `神託は嘘をつかない`,
  subtitle: `古代世界一の大富豪クロイソス——たった一言の神託に王国を賭け、すべてを失った`,
  excerpt: `古代世界でいちばんの金持ちといえば、リュディアの王クロイソス。今のトルコ西部にあった王国で、とんでもない量の金を手にしていた。それだけの富があると、人は何でも買えると思い始める——未来さえも。`,
  moralOrLesson: `神託とは、謎かけに包まれた真実だ。賢い者は確認を求め、傲慢な者は最初から分かったつもりでいる。まず己を知ること——それが神の言葉を理解する唯一の道だ。`,
  paragraphs: [
    {
      text: `古代世界でいちばんの金持ちといえば、リュディアの王クロイソス。今のトルコ西部にあった王国で、とんでもない量の金を手にしていた。「クロイソスのように裕福」という言い回しは、古代ギリシャ版の「億万長者」だ。それだけの富を持つと、人は何でも買えると思い始める——未来さえも。彼はデルフォイの神殿に途方もない贈り物を送った。200キロを超える純金のライオン像、金の杯の山、そして117本の金の延べ棒。狙いはただひとつ——神を味方につけること。`,
    },
    {
      text: `だが紀元前546年、巨大な脅威が迫っていた。ペルシアのキュロス大王——あの時代で最も恐るべき軍事指導者が、王国を次々と呑み込んでいたのだ。東のメディア帝国はすでに滅び、キュロスの矛先は西へ、つまりリュディアへ向かっていた。先に攻めるか、座して待つか。クロイソスは世界最高の「占い師」に答えを求めた——デルフォイの神託だ。`,
    },
    {
      text: `アポロン神殿の巫女ピュティアが告げた言葉は、歴史に永遠に刻まれることになる。「ハリュス川を渡れば、偉大なる帝国が滅ぶであろう」。それだけだ。補足なし、但し書きなし。たった一文の、完璧に包装された爆弾だった。`,
    },
    {
      text: `クロイソスの耳には、聞きたかった言葉だけが届いた。偉大なる帝国が滅ぶ？それはペルシアに決まっている。大喜びでさらに大量の金をデルフォイに送り、軍を率いてハリュス川を東へ渡った——リュディアとペルシアの国境だ。だが彼は最後まで、自分を救えたはずのたったひとつの問いを口にしなかった。「どちらの帝国が？」`,
    },
    {
      text: `最初の戦いは引き分けだった。クロイソスは首都サルディスに退き、冬を越して同盟軍を集め、春に再戦するつもりだった。だがキュロスは、相手に息つく暇を与えるような将軍ではない。そのままサルディスまで追撃し、わずか14日で城を落とした。古代世界の大富豪は、一転してキュロスの囚人となった。神託が告げた「滅びる偉大なる帝国」——それはクロイソス自身の国だった。`,
    },
    {
      text: `ギリシャの歴史家ヘロドトスによれば、キュロスはクロイソスを薪の山に縛りつけ、火あぶりにしようとした。炎が迫るなか、クロイソスはアポロンの名を叫んだ——あれほどの黄金を捧げた神、あの神託で戦場へ送り出した神を。すると晴天の空から突然、激しい雨が降り注ぎ、火を消した。この神のしるしに衝撃を受けたキュロスは、クロイソスを火の中から救い出し、王室の顧問に迎えた。`,
    },
    {
      text: `それでもクロイソスの怒りは収まらなかった。デルフォイへ最後の問いを送る。「アポロンは忠実な信者をこのように報いるのか」。返ってきた答えは容赦のないものだった。「神は偉大なる帝国が滅ぶと告げた。どちらの帝国か、聞くべきだった。予言を理解せず、確かめもしなかった。神を責めるな。己を責めよ」。`,
    },
    {
      text: `これこそ、何百年にもわたってデルフォイの名を世界に知らしめた物語だ。神託は一度も嘘をついていない——真実を、まず自分に正直でなければ読み解けない形で語っただけだ。クロイソスは騙されたのではない。自分で自分を騙したのだ。まさに身から出た錆。答えを先に決めてから神殿に足を踏み入れ、自分の思い込みに合う言葉だけを拾い上げた。2500年経った今も、私たちは同じことを繰り返している——聞きたいことだけを聞いて、結果が出てから「運命だった」と呟くのだ。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
//  KOREAN (ko) — Natural modern Korean
//  Proverb: 제 꾀에 제가 넘어간다
//  Register: Popular narrative nonfiction / quality podcast
// ═══════════════════════════════════════════════════════════════════════
const ko = {
  ...shared,
  lang: "ko",
  langStoryId: "ko#croesus-prophecy",
  title: `신탁은 거짓말하지 않았다`,
  subtitle: `고대 세계 최고의 부자 크로이소스, 한마디 예언에 제국을 통째로 잃다`,
  excerpt: `고대 세계에서 가장 부유한 사람. 바로 리디아의 왕 크로이소스다. 지금의 터키 서부에 자리 잡은 왕국으로, 말도 안 되는 양의 황금 위에 앉아 있었다. 돈이 그 정도면 뭐든 살 수 있다고 믿기 시작한다 — 미래까지도.`,
  moralOrLesson: `신탁은 수수께끼로 포장된 진실이다. 현명한 사람은 되묻고, 교만한 사람은 이미 답을 안다고 착각한다. 먼저 자기 자신을 알아야 신의 말도 제대로 들린다.`,
  paragraphs: [
    {
      text: `고대 세계에서 가장 부유한 사람을 떠올려 보자. 바로 리디아의 왕 크로이소스다. 지금의 터키 서부에 자리 잡은 왕국으로, 말도 안 되는 양의 황금 위에 앉아 있었다. 고대 그리스에서 \u201c크로이소스만큼 부자\u201d라는 말은 요즘으로 치면 \u201c재벌급\u201d이라는 뜻이었다. 돈이 그 정도면 뭐든 살 수 있다고 믿기 시작한다 — 미래까지도. 그래서 그는 델포이 신전에 상상을 초월하는 공물을 보냈다. 200킬로그램이 넘는 순금 사자상, 금 그릇 더미, 순금 막대 117개. 목적은 단 하나 — 신을 자기편으로 만드는 것.`,
    },
    {
      text: `그런데 기원전 546년, 거대한 위협이 다가왔다. 페르시아의 키루스 대왕 — 그 시대 가장 무서운 군사 지휘관이 왕국들을 하나둘 집어삼키고 있었다. 동쪽의 메디아 제국은 이미 무너졌고, 키루스의 칼끝은 서쪽, 바로 리디아를 향하고 있었다. 먼저 치느냐, 가만히 앉아서 기다리느냐. 크로이소스는 세상에서 가장 유명한 예언자에게 물어보기로 했다 — 델포이의 신탁.`,
    },
    {
      text: `아폴론 신전의 여사제 피티아가 내린 답은 역사에 영원히 남을 한마디였다. \u201c할리스 강을 건너면, 위대한 제국이 멸망할 것이다.\u201d 그게 전부였다. 부연도 없고, 단서도 없다. 한 문장짜리 폭탄이 예쁜 포장지에 싸여 온 것이다.`,
    },
    {
      text: `크로이소스는 듣고 싶은 말만 들었다. 위대한 제국이 멸망? 당연히 페르시아겠지. 기뻐하며 감사의 뜻으로 황금을 또 잔뜩 델포이에 보내고, 대군을 이끌고 할리스 강을 동쪽으로 건넜다 — 리디아와 페르시아의 국경선이었다. 끝까지 그는 자신을 구할 수 있었던 딱 한마디를 하지 않았다. \u201c어느 제국 말입니까?\u201d`,
    },
    {
      text: `첫 전투는 무승부였다. 크로이소스는 수도 사르디스로 돌아가 겨울을 나고, 동맹군을 모아 봄에 다시 싸울 작정이었다. 하지만 키루스는 상대에게 숨 돌릴 틈을 주는 장군이 아니었다. 사르디스까지 쫓아와 포위한 지 겨우 열나흘 만에 성을 무너뜨렸다. 고대 세계 최고의 부자가 키루스의 포로가 되었다. 신탁이 말한 멸망할 위대한 제국 — 그건 바로 자기 나라였다.`,
    },
    {
      text: `그리스 역사가 헤로도토스에 따르면, 키루스는 크로이소스를 장작더미 위에 묶고 산 채로 태우려 했다. 불길이 치솟는 순간, 크로이소스는 아폴론의 이름을 외쳤다 — 온갖 황금을 바친 그 신, 신탁으로 전쟁터에 내보낸 그 신의 이름을. 그러자 맑은 하늘에서 갑자기 폭우가 쏟아져 불을 꺼버렸다. 이 신의 징표에 놀란 키루스는 크로이소스를 장작더미에서 내리고, 왕실 고문으로 삼았다.`,
    },
    {
      text: `그래도 크로이소스는 분이 풀리지 않았다. 델포이에 마지막 항의를 보냈다. \u201c이것이 아폴론이 충실한 신자에게 내리는 보답입니까?\u201d 신탁의 대답은 싸늘했다. \u201c신은 위대한 제국이 멸망한다고 했다. 어느 제국인지 물어봤어야지. 예언을 이해하지도 못하고, 확인하려 하지도 않았다. 신을 탓하지 마라. 너 자신을 탓해라.\u201d`,
    },
    {
      text: `이것이 수백 년간 델포이를 빛낸 이야기다. 신탁은 단 한 번도 거짓말을 한 적이 없다 — 진실을 자기 자신에게 솔직한 사람만 알아들을 수 있게 말했을 뿐이다. 크로이소스는 속은 게 아니다. 제 꾀에 제가 넘어간 것이다. 답을 미리 정해놓고 신전에 들어가서, 자기 생각에 맞는 말만 골라 들었다. 2500년이 지난 지금도 우리는 똑같은 짓을 한다 — 듣고 싶은 것만 듣고, 일이 틀어지면 운명 탓을 한다.`,
    },
  ],
};

// ─── Push function ────────────────────────────────────────────────────
async function pushStory(item, label) {
  console.log(`\n${"═".repeat(60)}`);
  console.log(`  Pushing ${label} (${item.langStoryId})...`);
  console.log(`${"═".repeat(60)}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✓ SUCCESS: ${label} pushed as NEW record.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ⚠ Record already exists. Overwriting...`);
      await docClient.send(
        new PutCommand({
          TableName: TABLE,
          Item: item,
        })
      );
      console.log(`  ✓ SUCCESS: ${label} overwritten.`);
    } else {
      console.error(`  ✗ FAILED: ${label}`, err.message);
      throw err;
    }
  }

  // Verify the record was written
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: item.siteId, langStoryId: item.langStoryId },
    })
  );

  if (result.Item && result.Item.title === item.title) {
    console.log(`  ✓ VERIFIED: Record exists with correct title.`);
    console.log(`    Title: ${result.Item.title}`);
    console.log(`    Paragraphs: ${result.Item.paragraphs.length}`);
    console.log(`    updatedAt: ${result.Item.updatedAt}`);
  } else {
    console.error(`  ✗ VERIFICATION FAILED for ${label}`);
    throw new Error(`Verification failed for ${label}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  console.log(`\nTimestamp: ${now} (${new Date(now * 1000).toISOString()})`);
  console.log(`Table: ${TABLE}`);

  // Push sequentially, verifying each before moving on
  await pushStory(zh, "Chinese (zh)");
  await pushStory(ja, "Japanese (ja)");
  await pushStory(ko, "Korean (ko)");

  console.log(`\n${"═".repeat(60)}`);
  console.log(`  ALL 3 LANGUAGES PUSHED AND VERIFIED SUCCESSFULLY`);
  console.log(`${"═".repeat(60)}\n`);
}

main().catch((err) => {
  console.error("\nFATAL ERROR:", err.message);
  process.exit(1);
});
