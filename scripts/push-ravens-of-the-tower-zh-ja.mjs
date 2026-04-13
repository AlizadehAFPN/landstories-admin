import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (from English record) ─────────────────────────────────────
const shared = {
  siteId: "tower-of-london",
  storyId: "ravens-of-the-tower",
  coordinates: { lat: 51.5085, lng: -0.0763 },
  disabled: false,
  era: "Ancient prophecy - Present day",
  hasAudio: false,
  icon: "🐦‍⬛",
  image: "",
  isFree: true,
  readingTimeMinutes: 2,
  source:
    "Tower of London official history, Ravenmaster Christopher Skaife's memoir \"The Ravenmaster\", Historic Royal Palaces archives, Churchill war cabinet records",
  storyCategory: "gods_monsters",
  thumbnail: "",
  tier: "A",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
//  CHINESE (zh) — 伦敦塔的乌鸦
//
//  Proverb subverted: 宁可信其有，不可信其无
//  (Better to believe it exists than to dismiss it)
//  → The British didn't just hedge their bets — they turned the saying
//    into state policy, feeding superstition raw meat every morning.
// ═══════════════════════════════════════════════════════════════════════════════
const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#ravens-of-the-tower",
  title: `伦敦塔的乌鸦`,
  subtitle: `一个没人信、但没人敢试的预言`,
  excerpt: `此刻，在征服者威廉将近一千年前修建的城堡里，六只乌黑的大乌鸦正在伦敦塔的草坪上大摇大摆\u2014\u2014那架势，好像这地方归它们管。说起来，还真没说错。`,
  moralOrLesson: `有些故事比逻辑更强大\u2014\u2014一旦你不再相信那些符号，你失去的就不只是迷信，而是符号所守护的一切`,
  characters: [
    `查理二世\u2014\u2014选择乌鸦、赶走天文学家的国王`,
    `约翰\u00b7弗拉姆斯蒂德\u2014\u2014被乌鸦赶走的第一任皇家天文学家`,
    `温斯顿\u00b7丘吉尔\u2014\u2014二战中下令补充乌鸦的首相`,
    `格里普\u2014\u2014伦敦大轰炸中唯一幸存的乌鸦`,
    `梅林娜\u2014\u20142021年失踪、举国惋惜的乌鸦`,
    `渡鸦官\u2014\u2014伦敦塔乌鸦的专职守护者`,
  ],
  paragraphs: [
    {
      text: `此刻，在征服者威廉将近一千年前修建的城堡里，六只乌黑的大乌鸦正在伦敦塔的草坪上大摇大摆\u2014\u2014那架势，好像这地方归它们管。说起来，还真没说错。有一个古老的预言，没人说得清到底有多老，内容是这样的：如果乌鸦离开伦敦塔，王冠就会坠落，英国也跟着完蛋。听上去荒唐得很。但三百多年来，英国政府硬是没敢试试看。`,
    },
    {
      text: `第一次考验出现在1670年代。查理二世的皇家天文学家约翰\u00b7弗拉姆斯蒂德在塔里架起望远镜搞天文观测，结果乌鸦把一切搅得天翻地覆\u2014\u2014弄脏仪器不说，还叫声震天。弗拉姆斯蒂德要求把乌鸦赶走。但查理二世听了那个预言之后，做了一个至今仍在回响的决定：乌鸦留下，天文学家走人。弗拉姆斯蒂德被打发到了格林尼治\u2014\u2014皇家天文台至今还矗立在那里。而那个台址，全拜一群聒噪的乌鸦所赐。`,
    },
    {
      text: `从那以后，没人再提赶走乌鸦的事。几百年间，伦敦塔专门设了看护人来照料它们，把民间迷信变成了官方制度。一群毛色油亮的大黑鸟在这块地盘上驻扎了三百多年\u2014\u2014熬走了一代代君主，扛过了一场场战争，甚至目睹了大英帝国从崛起到衰落的整个过程。预言不再是信不信的问题，它变成了工作的一部分。`,
    },
    {
      text: `真正的生死考验发生在二战。1940到1941年的伦敦大轰炸期间，德军炸弹如雨点般砸向城市，伦敦塔被直接命中。乌鸦不是吓跑了就是炸死了。战争结束时，只剩下一只幸存者\u2014\u2014一只叫\u201c格里普\u201d的乌鸦，被吓得死死趴在原地，一步也不肯挪。丘吉尔听说乌鸦只剩一只，立刻下令补充。他太明白了：让预言成真，你摧毁的将是炸弹永远摧毁不了的东西。`,
    },
    {
      text: `如今，伦敦塔精确地养着七只乌鸦\u2014\u2014六只守预言，外加一只备用。每只都有名字、有性格、有粉丝。出过像\u201c朱比利\u201d和\u201c哈里斯\u201d这样的捣蛋鬼，最擅长从游客手里抢走三明治。还有一只叫\u201c梅林娜\u201d的，性情特别独立，2021年初突然失踪，举国惋惜，就好像走失的不是一只鸟，而是一位公众人物。它们能听懂自己的名字，会玩耍，有几只甚至学会了对路过的游客说一声\u201chello\u201d。`,
    },
    {
      text: `所有乌鸦都归一个人管\u2014\u2014渡鸦官。这是一位专门指派的伦敦塔仪仗卫兵，每天负责喂乌鸦吃生肉、泡过血的饼干，偶尔加个鸡蛋。他会修剪乌鸦的飞羽，让它们能在院子里扑腾几下，但飞不远。他还有一本日志，记录了每只乌鸦几十年来的性格、怪癖和生平。这不是什么政府档案\u2014\u2014更像一本家谱，用乌鸦的语言写成的家谱。`,
    },
    {
      text: `中国有句老话，\u201c宁可信其有，不可信其无\u201d。英国人不光信了\u2014\u2014他们把这句话活成了国策。没人真觉得几只鸟能撑得住一个王朝。但也没人敢拿这事做实验。这些乌鸦证明了一件事：有些故事比逻辑更强大。一个靠千年传统立足的国家，会一直养着它的鸟，剪着它们的翅膀，念叨着那个古老的预言\u2014\u2014因为一旦你不再相信那些符号，你失去的就不只是一个迷信，而是符号所守护的一切。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
//  JAPANESE (ja) — ロンドン塔のカラス
//
//  Proverb subverted: 触らぬ神に祟りなし
//  (If you don't touch the god, there's no curse)
//  → The British don't just leave the god alone — they feed it raw meat
//    every morning, trim its feathers, and call it by name.
// ═══════════════════════════════════════════════════════════════════════════════
const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#ravens-of-the-tower",
  title: `ロンドン塔のカラス`,
  subtitle: `王冠をつなぎとめる、ひとつの予言`,
  excerpt: `今この瞬間にも、征服王ウィリアムが千年近く前に築いた要塞の中で、六羽の大きな黒いカラスがロンドン塔の芝生を我が物顔で歩き回っている。実のところ、ある意味ではここは彼らの城だ。`,
  moralOrLesson: `論理より強い物語がある——象徴を信じることをやめた瞬間、象徴が守ってきたものまで失われる`,
  characters: [
    `チャールズ二世——天文学よりカラスを選んだ国王`,
    `ジョン・フラムスティード——カラスに追い出された初代王室天文官`,
    `ウィンストン・チャーチル——大戦中、カラスの補充を命じた首相`,
    `グリップ——大空襲を生き延びたたった一羽のカラス`,
    `マーリナ——2021年に姿を消し、国中に惜しまれたカラス`,
    `レイヴンマスター——カラスに生涯を捧げる専任の衛兵`,
  ],
  paragraphs: [
    {
      text: `今この瞬間にも、征服王ウィリアムが千年近く前に築いた要塞の中で、六羽の大きな黒いカラスがロンドン塔の芝生を我が物顔で歩き回っている。実のところ、ある意味ではここは彼らの城だ。古い予言がある。いつから伝わるのか、誰も正確には知らない。カラスがロンドン塔を去れば、王冠は落ち、イギリスは滅びる。馬鹿げた話に聞こえるだろう。だが三百年以上、イギリス政府はこの予言を試す気になれなかった。`,
    },
    {
      text: `最初の危機は1670年代、チャールズ二世の時代に訪れた。初代王室天文官ジョン・フラムスティードが塔の中に望遠鏡を据えたのだが、カラスがすべてを台無しにした。器具を汚し、耳をつんざく鳴き声で観測を妨げる。フラムスティードはカラスの排除を要求した。だがチャールズ二世は予言のことを知り、ひとつの判断を下す——今なお語り継がれる判断だ。カラスは残り、天文官が去った。フラムスティードはグリニッジへ送られ、王立天文台は今もそこに建っている。その場所を決めたのは、やかましいカラスの群れだった。`,
    },
    {
      text: `以来、カラスの存在が問われることは二度となかった。塔は何世紀にもわたって専任の飼育係を置き、古い迷信を公式な制度へと変えた。艶やかな黒い大鳥たちがこの敷地に三百年以上居座り続けた——何代もの王より長く、数々の戦争より長く、大英帝国そのものの興亡よりも長く。予言は信じるか信じないかの問題ではなくなった。それは「業務」になったのだ。`,
    },
    {
      text: `予言が本当に試されたのは、第二次世界大戦だった。1940年から41年にかけてのロンドン大空襲で、ドイツ軍の爆弾が街に降り注ぎ、塔も直撃を受けた。カラスたちは怯えて逃げるか、命を落とした。終戦時、生き残りはたった一羽——「グリップ」という名のカラスで、恐怖のあまり自分のいる地面から動けなくなっていた。群れが一羽にまで減ったと聞いたチャーチルは、即座に補充を命じた。彼にはわかっていた。予言を現実にしてしまえば、爆弾では決して壊せなかったものが壊れる、と。`,
    },
    {
      text: `現在、ロンドン塔には七羽のカラスがいる。予言のための六羽と、予備が一羽。一羽ずつに名前があり、性格があり、ファンがいる。「ジュビリー」や「ハリス」のように、観光客の手からサンドイッチをかすめ取ることで知られた問題児もいた。2021年初頭に突然姿を消した「マーリナ」は、まるで国民的な著名人が去ったかのように惜しまれた。カラスたちは名前に反応し、遊びを覚え、通りかかる観光客に「ハロー」と声をかける個体までいる。`,
    },
    {
      text: `このすべてを一人で担うのが「レイヴンマスター」——特別に任命されたヨーマン・ウォーダー、つまり塔の儀仗兵だ。毎日、生肉と血に浸したビスケット、時には卵を与える。風切羽を刈り込んで、敷地内は動けるが遠くへは飛べないようにする。何十年にもわたるカラス一羽一羽の性格、癖、来歴を記した日誌もつけている。政府の公文書ではない。いわば家族の記録だ。カラス語で綴られた。`,
    },
    {
      text: `「触らぬ神に祟りなし」という言葉がある。だがイギリス人は正反対のことをしている。毎朝、神に生肉を供え、羽を整え、名前を呼んで話しかけているのだ。誰も本気で、数羽の鳥が王政を支えているとは思っていない。だが誰もそれを確かめようとはしない。このカラスたちが証明しているのは、論理より強い物語がこの世にはあるということだ。千年の伝統に立つ国は、鳥を養い続け、翼を手入れし、古い予言をささやき続ける——象徴を信じることをやめた瞬間、象徴が守ってきたものまで失われるからだ。`,
    },
  ],
};

// ─── Validation ──────────────────────────────────────────────────────────────
function validate(item, label) {
  console.log(`\n=== ${label} VALIDATION ===\n`);

  let totalChars = 0;
  let allPass = true;

  for (let i = 0; i < item.paragraphs.length; i++) {
    const text = item.paragraphs[i].text;
    const chars = text.length;
    totalChars += chars;

    const charOk = chars <= 350;
    if (!charOk) allPass = false;

    console.log(
      `  P${i + 1}: ${chars} chars ${charOk ? "✓" : "✗ OVER 350"}`
    );
  }

  console.log(
    `\n  Total: ${totalChars} chars | ${item.paragraphs.length} paragraphs`
  );
  console.log(`  Target: ~1000-1500 chars (±20% = 800–1800)`);
  console.log(
    `  Status: ${totalChars >= 800 && totalChars <= 1800 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
  );

  // Verify JSON round-trip
  try {
    const json = JSON.stringify(item);
    JSON.parse(json);
    console.log(`  JSON: ✓ valid`);
  } catch (err) {
    console.error(`  JSON: ✗ INVALID — ${err.message}`);
    allPass = false;
  }

  return allPass;
}

const zhOk = validate(zh, "Chinese (zh)");
const jaOk = validate(ja, "Japanese (ja)");

if (!zhOk || !jaOk) {
  console.error("\n✗ Validation failed. Aborting.");
  process.exit(1);
}

// ─── Push ────────────────────────────────────────────────────────────────────
async function push(item, label) {
  try {
    await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`\n✓ ${label} pushed successfully (${item.langStoryId})`);
  } catch (err) {
    console.error(`\n✗ ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

async function main() {
  console.log(`\n─── Pushing ravens-of-the-tower (updatedAt: ${now}) ───`);
  await push(zh, "Chinese (zh)");
  await push(ja, "Japanese (ja)");
  console.log("\n✓ Done. Both records pushed to Story table.\n");
}

main();
