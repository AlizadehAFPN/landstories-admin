// Push Chinese (zh) and Japanese (ja) recreations of
// "The Origin of the Order of the Garter" to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical to English record) ─────────────────────────────
const shared = {
  siteId: "windsor-castle",
  storyId: "order-of-the-garter",
  icon: "\u{1F396}\uFE0F",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 51.4838, lng: -0.6073 },
  source:
    "Jean Froissart's \"Chroniques\" (c. 1370s), Elias Ashmole's \"The Institution, Laws and Ceremonies of the Most Noble Order of the Garter\" (1672), Lisa Jefferson's scholarly research on the Order's founding, Historic Royal Palaces archives",
  characters: [
    "Edward III — King of England, founder of the Order of the Garter",
    "Joan, Countess of Salisbury (\"The Fair Maid of Kent\") — The lady whose fallen garter inspired the Order",
    "Edward the Black Prince — Founding Knight and the most feared warrior in Europe",
    "Henry of Grosmont, Duke of Lancaster — Founding Knight",
    "Sir John Chandos — Founding Knight and master tactician",
    "King Arthur — The mythic model upon whose Round Table the Order was consciously based",
  ],
  era: "1348 AD — Present",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 事不过三 (things don't go past three / three strikes and you're out)
// — subverted: Edward didn't even give them a second chance to laugh.
// Register: Modern Mandarin, WeChat-article / popular-podcast storytelling.
// Short punchy rhythms, conversational asides, zero classical Chinese.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#order-of-the-garter",

  title: `一条袜带改写的七百年`,

  subtitle: `一个女人掉落的袜带，催生了世界上最古老、最尊贵的骑士勋章`,

  excerpt: `这是一个关于\u201C社死现场\u201D如何创造了史上最牛俱乐部的故事。1348年，英格兰国王爱德华三世\u2014\u2014一个刚在克雷西战役中把法国人打得落花流水的狠角色\u2014\u2014在城堡里大摆宴席。`,

  moralOrLesson: `真正的骑士精神，在于用优雅化解羞辱\u2014\u2014一个瞬间的担当，足以创造延续七个世纪的传奇。`,

  paragraphs: [
    {
      text: `这是一个关于\u201C社死现场\u201D如何创造了史上最牛俱乐部的故事。1348年，英格兰国王爱德华三世\u2014\u2014一个刚在克雷西战役中把法国人打得落花流水的狠角色\u2014\u2014在城堡里大摆宴席。骑士、贵族、全英格兰最有权势的人物齐聚一堂，酒杯不停，音乐不断。然后，一件改变一切的事情发生了。`,
    },
    {
      text: `舞池中央是肯特的琼\u2014\u2014公认的全英格兰第一美人，传说国王对她神魂颠倒。跳着跳着，她腿上固定丝袜的袜带突然滑落，啪的一声掉在了地上。就那么当着所有人的面。14世纪的袜带属于贴身衣物，在公开场合掉出来，大约相当于你能想到的最严重的走光事故。整个大厅瞬间炸了，哄堂大笑。`,
    },
    {
      text: `然后爱德华做了一件没人料到的事。他穿过舞池，弯下腰，把那条袜带捡了起来。全场死寂。他环顾四周每一张还挂着笑意的脸，慢慢地、一丝不苟地把那条蓝色丝带系在了自己腿上。然后他用法语说了一句话，这句话将回响整整七个世纪：\u201CHoni soit qui mal y pense\u201D\u2014\u2014心怀邪念者，自取其辱。`,
    },
    {
      text: `都说事不过三，可爱德华连笑第二次的机会都没给任何人。一个动作，他就把整个局面彻底翻转。原本是一个女人的耻辱，转眼变成一个国王的宣战。他告诉在场所有目瞪口呆的人：这条袜带将成为一个全新骑士团的标志\u2014\u2014尊贵到今天笑过的每一个人，终有一日会跪着求一条同款。他说到做到。嘉德骑士团就此诞生，近七百年后的今天，它依然是这个星球上最古老、最崇高的骑士荣誉。`,
    },
    {
      text: `爱德华用亚瑟王的圆桌骑士做蓝本\u2014\u2014在14世纪，亚瑟王传说可不是故事书里的东西，人们深信不疑。他把成员上限定为24人，和传说中圆桌骑士的数目一模一样，并选定温莎城堡作为骑士团的永久驻地。但别以为这是什么荣誉虚职。创始骑士个个是英格兰最能打的人，其中就包括爱德华的亲儿子\u2014\u2014\u201C黑太子\u201D爱德华，全欧洲最令人闻风丧胆的战士。这份荣耀，是在战场上拿命换来的，不是在酒桌上喝出来的。`,
    },
    {
      text: `骑士团的精神圣殿是温莎城堡里的圣乔治礼拜堂\u2014\u2014一座让人屏住呼吸的哥特式建筑杰作，安葬着十位英国国王和女王。堂内精雕细刻的席位上陈列着自1348年以来每一位嘉德骑士的家族纹章，头顶悬挂着色彩斑斓的旗帜。每年六月，新晋骑士身披拖地的蓝色天鹅绒长袍，头戴巨大白色羽毛装饰的礼帽，穿过城堡庭院\u2014\u2014活脱脱从奇幻小说里走出来的画面。围观群众照样欢呼。这个传统，近七百年来一次都没断过。`,
    },
    {
      text: `最绝的是：直到今天，嘉德勋章仍然由英国君主亲自授予\u2014\u2014不经首相，不过委员会，不搞政治博弈。就国王或女王一个人拍板，谁够格就给谁。丘吉尔佩戴过嘉德勋章。打败拿破仑的威灵顿公爵也佩戴过。而这一切的源头，不过是舞池上的一个瞬间\u2014\u2014一个国王把一个女人的难堪变成了这片土地上至高无上的荣耀，然后放话：谁敢说三道四，试试看。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 仏の顔も三度まで (even Buddha's patience has limits at three times)
// — subverted: Edward didn't tolerate even a single laugh.
// Register: Modern Japanese, NHK-documentary / popular-nonfiction storytelling.
// Balanced kanji-kana mix, no 文語 (classical Japanese).
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#order-of-the-garter",

  title: `ガーター勲章の誕生`,

  subtitle: `ある女性の落としたガーターが、世界最古にして最高格の騎士勲章を生んだ`,

  excerpt: `衣装の\u300C事故\u300Dが、史上もっとも格式の高いクラブを生んだ\u2014\u2014と聞いたら、信じられるだろうか。1348年、イングランド国王エドワード3世は盛大な舞踏会を開いていた。`,

  moralOrLesson: `真の騎士道精神とは、嘲りを誇りに変える気高さのこと\u2014\u2014たった一瞬の決断が、七世紀を超える伝統を生んだ。`,

  paragraphs: [
    {
      text: `衣装の\u300C事故\u300Dが、史上もっとも格式の高いクラブを生んだ\u2014\u2014と聞いたら、信じられるだろうか。1348年、イングランド国王エドワード3世は盛大な舞踏会を開いていた。クレシーの戦いでフランス軍を叩きのめしたばかりの戦士王だ。城には騎士、貴族、国中の実力者が集まり、ワインが注がれ、音楽が鳴り響いていた。そして、すべてを変える一瞬が訪れる。`,
    },
    {
      text: `舞踏会の華は、ジョアン・オブ・ケント。イングランド随一の美女と謳われ、国王が夢中だという噂の絶えない女性だった。踊りの最中、彼女の脚からガーター\u2014\u2014ストッキングを留める絹のバンド\u2014\u2014がするりと滑り落ちた。満場の前で。14世紀、ガーターは下着同然だ。現代に置き換えれば、考えうる最悪の\u300C放送事故\u300D。大広間は一瞬にして嘲笑で満たされた。`,
    },
    {
      text: `次の瞬間、エドワードは誰も予想しなかった行動に出た。フロアを横切り、腰をかがめ、ガーターを拾い上げたのだ。笑い声がぴたりと止まった。王はにやついた顔を一つ一つ見回し、ゆっくりと、見せつけるように、青い絹のリボンを自分の脚に結んだ。そしてフランス語で告げた\u2014\u2014\u300CHoni soit qui mal y pense\u300D。邪な心で見る者にこそ、恥あれ。この一言は、七百年の時を越えて響き続けることになる。`,
    },
    {
      text: `\u300C仏の顔も三度まで\u300Dと言うが、エドワードは一度きりの笑いすら見逃さなかった。たった一つの所作で、場の空気を完全にひっくり返したのだ。女性の屈辱が、王の宣戦布告に変わった。このガーターを新たな騎士団の象徴とする\u2014\u2014今夜笑った者たちが、いずれひざまずいてこの名誉を請う日が来る、と。そして彼は有言実行の男だった。こうして創設されたガーター勲章は、約700年を経た現在も、世界最古にして最高格の騎士勲章であり続けている。`,
    },
    {
      text: `エドワードはアーサー王と円卓の騎士を手本にこの騎士団を設計した。14世紀において、アーサー王伝説はおとぎ話ではなく、人々が真剣に信じる歴史そのものだった。定員は伝説の円卓と同じ24名。本拠地にはウィンザー城が選ばれた。ただし、名誉職ではない。創設メンバーはイングランド最強の猛者ぞろいで、王の息子エドワード\u2014\u2014\u300C黒太子\u300Dの異名を持つ、ヨーロッパ全土を震え上がらせた武人\u2014\u2014もその一人だった。この称号は戦場で勝ち取るものであり、宴席で手に入るものではなかった。`,
    },
    {
      text: `騎士団の聖地は、ウィンザー城内の聖ジョージ礼拝堂だ。息を呑むゴシック建築の傑作で、十人の国王・女王が眠っている。堂内には1348年以来すべてのガーター騎士の紋章が刻まれた席が並び、頭上には色鮮やかな旗がはためく。毎年6月、新たな騎士が深い青のビロードのローブをまとい、巨大な白い羽飾りの帽子をかぶって城内を練り歩く。まるでファンタジー小説から抜け出してきたかのような光景だ。観衆は今も歓声を送り、この儀式は約700年間、ただの一度も途絶えたことがない。`,
    },
    {
      text: `そして何より驚くべきことがある。今日に至るまで、ガーター勲章は英国君主が個人の判断で授ける。首相の推薦も、委員会の審査も、政治的な駆け引きも一切介在しない。王か女王がただ一人で決める。ウィンストン・チャーチルがこの勲章を受けた。ナポレオンを破ったウェリントン公爵も受けた。そのすべての始まりは、あの舞踏会のたった一瞬に遡る\u2014\u2014女性の恥辱を国の最高栄誉に変え、文句があるなら言ってみろと世界に啖呵を切った、一人の王の決断に。`,
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────────────

async function push(item, label) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId      : ${item.siteId}`);
  console.log(`  langStoryId : ${item.langStoryId}`);
  console.log(`  paragraphs  : ${item.paragraphs.length}`);

  // Validate JSON serialization (catches encoding issues)
  const serialized = JSON.stringify(item);
  const parsed = JSON.parse(serialized);
  if (parsed.paragraphs.length !== item.paragraphs.length) {
    throw new Error(`JSON round-trip failed for ${label}`);
  }

  await doc.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );
  console.log(`  ✓ ${label} pushed successfully`);
}

async function main() {
  try {
    await push(zh, "Chinese (zh)");
    await push(ja, "Japanese (ja)");
    console.log("\n All records pushed successfully.");
  } catch (err) {
    console.error("\n PUSH FAILED:", err);
    process.exit(1);
  }
}

main();
