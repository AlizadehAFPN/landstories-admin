// Push Chinese (zh) and Japanese (ja) recreations of "The King's Downfall"
// (storyId: madness-of-the-king, siteId: babylon) to the Story DynamoDB table.
// This OVERWRITES existing zh/ja records with fully native-born recreations.

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
  siteId: "babylon",
  storyId: "madness-of-the-king",
  icon: "👁️",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 32.5363, lng: 44.4209 },
  source:
    "Daniel 4 (biblical account of Nebuchadnezzar's madness); 4Q242 Prayer of Nabonidus (Dead Sea Scrolls, Cave 4, Qumran); The Verse Account of Nabonidus (BM 38299, British Museum); 2 Kings 25:27-30 (Evil-Merodach releases Jehoiachin); Wiseman, D.J. Nebuchadrezzar and Babylon, Oxford University Press, 1985; Collins, John J. Daniel: A Commentary on the Book of Daniel, Hermeneia Series, Fortress Press, 1993; Beaulieu, Paul-Alain. The Reign of Nabonidus, King of Babylon 556-539 B.C., Yale University Press, 1989; Henze, Matthias. The Madness of King Nebuchadnezzar, Brill, 1999",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — fully native recreation
// Proverb: 天欲其亡，必令其狂 (subverted: heaven didn't want him dead — it wanted his mind)
// Register: modern Mandarin, popular podcast / WeChat longform article
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#madness-of-the-king",

  title: `王的陨落`,

  subtitle: `他在每块砖上都刻了名字，却花了七年忘记自己是人\u2014\u2014一份死海古卷暗示，这个故事的真正主角另有其人`,

  excerpt: `他烧了耶路撒冷，把巴比伦建成世界奇迹，还在帝国几十万块砖上刻下自己的名字。有天傍晚他站在宫殿屋顶，话还没说完就疯了。接下来七年，地球上最有权势的人像牛一样吃草。`,

  moralOrLesson: `\u201c天欲其亡，必令其狂\u201d\u2014\u2014但尼布甲尼撒的疯狂不是因为他建造了太多，而是因为他以为一切都是自己建的。巴比伦的每块砖都取自河泥，由人手塑形，由人力烧制。而那个在每块砖上刻了名字的王忘了一件事：泥土比他的王朝更古老，也比他的王朝更长久。骄傲的解药不是羞辱，而是视角\u2014\u2014哪怕是最伟大的建设者，归根到底也不过是大地上的一个生灵。`,

  characters: [
    `尼布甲尼撒二世\u2014\u2014巴比伦之王，古代世界最疯狂的建设者`,
    `但以理\u2014\u2014解读国王大树之梦的犹太先知`,
    `拿波尼度\u2014\u2014后来的巴比伦王，其神秘行为可能才是这个故事的历史原型`,
    `以未米罗达\u2014\u2014尼布甲尼撒之子与继任者`,
  ],

  era: `约公元前570\u2013562年（尼布甲尼撒的最后岁月）；死海古卷4Q242残片记录了关于拿波尼度的平行传说`,

  paragraphs: [
    {
      text: `公元前六世纪的巴比伦，是当时地球上最大的城市。把它变成奇迹的人，叫尼布甲尼撒二世。他修了双层城墙，厚到据说能让四匹马拉的战车在墙顶掉头。他造了伊什塔尔门和游行大道，修复了马尔杜克神殿，在幼发拉底河上架起石桥，盖了三座宫殿。但最离谱的是他对署名的执念：他让工匠在每一块烧制的砖上都刻同一句话\u2014\u2014巴比伦之王尼布甲尼撒。不是几百块，是几十万块。你在巴比伦随便站在哪里，脚下都踩着他的名字。`,
    },
    {
      text: `然后他做了个梦。一棵巨树，高到顶着天，地球哪个角落都能看见。飞鸟在枝头筑巢，走兽在树荫下歇脚。忽然天使从天降下，一声令下：砍。砍掉枝叶，打散果实，赶走鸟兽。但树桩留在地里，用铁箍铜圈钉住，天上的露水淋着它，然后把它的心从人心换成兽心\u2014\u2014\u201c直到七个时期过去。\u201d`,
    },
    {
      text: `先知但以理被叫来解梦，一听完就变了脸色。那棵树就是国王自己。天的判决是：逐出人间，跟野兽为伍，像牛一样吃草，直到他认清天下不是他说了算。但以理求他赶紧改过行善，也许还来得及。十二个月过去了，什么也没发生。某天傍晚，尼布甲尼撒走上宫殿屋顶，俯瞰自己一手打造的城市，开口说了一句：\u201c这大巴比伦不是我用自己的力量建造、为自己的荣耀装点的吗？\u201d`,
    },
    {
      text: `中国人有句老话叫\u201c天欲其亡，必令其狂\u201d。但老话这回只说对了一半\u2014\u2014天没有要他亡，天要的是他的心智。话音未落，天上就传来声音：\u201c王位离开你了。\u201d经文记载他立刻被赶出人群。他像牛一样四肢着地吃草，身体被露水打湿，头发长得像鹰的羽毛，指甲变成了鸟爪。现代医学给这种病起了个名字叫\u201c牛化妄想症\u201d\u2014\u2014患者坚信自己是牛，用四肢走路，拒绝一切人类接触，极其罕见。整整七年，世界上最有权势的人像野兽一样活着。帝国在这七年里怎么运转的？谁在管事？经文一个字没提。仿佛这个在每块砖上刻名字的人，从自己建造的世界里被彻底抹去了。`,
    },
    {
      text: `故事到这里已经够震撼了。但真正让事情变得诡异的，是一份死海古卷。上世纪中叶，学者们在以色列的库姆兰山洞里发现了一份残破的古代手稿，叫\u300a拿波尼度的祈祷\u300b。剧情几乎一模一样：一位巴比伦国王得了七年怪病，一位犹太圣人把他治好了，然后他承认了以色列之神的至高地位。但主角不是尼布甲尼撒\u2014\u2014是后来的巴比伦王拿波尼度。历史上拿波尼度确实是个怪人，莫名其妙丢下王位跑到阿拉伯沙漠住了十年，连自己手下的祭司都不知道他在搞什么。不少学者因此认为：这个疯王的传说本来说的就是拿波尼度，后来被安到更有名气的尼布甲尼撒头上了。`,
    },
    {
      text: `七年后，尼布甲尼撒抬头望天。神志回来了。\u201c我赞美至高者，\u201d他说，\u201c他的权柄是永远的。\u201d大臣们把他扶回了王位。但历史给了一个比疯狂本身更冷酷的结局：尼布甲尼撒死于公元前562年。他儿子继位两年就被人杀了。他父亲开创的王朝，在他死后二十三年彻底灭亡。巴比伦本身在公元前539年被波斯人攻陷。那个在每块砖上刻了名字的帝国，连一代人都没撑过去。`,
    },
    {
      text: `但砖还在。你今天可以在大英博物馆拿起一块，用手指摸过上面的楔形文字，读出\u201c巴比伦之王尼布甲尼撒\u201d。然后想象一下那个画面：站在世界上最宏伟的宫殿屋顶，看着自己亲手建造的一切，张嘴准备夸耀自己的丰功伟绩\u2014\u2014最后一个清醒的念头就像一只鸟，扑棱一下飞走了。七年，都没飞回来。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — fully native recreation
// Proverb: 驕れる者は久しからず (subverted: the Heike lost power; Nebuchadnezzar lost his humanity)
// Register: modern Japanese, NHK documentary / popular nonfiction
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#madness-of-the-king",

  title: "王の転落",

  subtitle:
    "すべてのレンガに名を刻んだ王は七年間、獣として生きた\u2014\u2014死海文書が語る、もう一つの真実",

  excerpt:
    "エルサレムを焼き、バビロンを世界の驚異に変え、帝国中のレンガに名を刻んだ男。ある夕暮れ、宮殿の屋上から自らの都を見下ろし栄光を口にした瞬間、正気を失った。その後七年、地上最強の王は獣として生きた。",

  moralOrLesson:
    "\u300c驕れる者は久しからず\u300d\u2014\u2014だがネブカドネザルの狂気は、建てすぎたことへの罰ではなかった。すべてを自分ひとりで建てたと信じたことへの罰だった。バビロンのレンガはすべて川の粘土から生まれ、人の手で形作られ、人の労力で焼かれた。そのすべてに名を刻んだ王は忘れていた\u2014\u2014粘土は王朝より古く、王朝より長く残ることを。驕りの処方箋は屈辱ではない。視座だ。最も偉大な建設者もまた、大地が生んだ一つの命にすぎないと知ること。",

  characters: [
    "ネブカドネザル二世\u2014\u2014バビロン王、古代世界最大の建設者",
    "ダニエル\u2014\u2014王の大樹の夢を解いたユダヤの預言者",
    "ナボニドス\u2014\u2014後のバビロン王。その謎の行動が物語の歴史的原型かもしれない",
    "アメル・マルドゥク\u2014\u2014ネブカドネザルの息子にして後継者",
  ],

  era: "紀元前約570\u2013562年（ネブカドネザルの晩年）；死海文書4Q242がナボニドスについての並行伝承を記録",

  paragraphs: [
    {
      text: "紀元前六世紀、バビロンは世界最大の都市だった。その都を奇跡に変えた男がネブカドネザル二世だ。二重城壁はヘロドトスが\u300c四頭立ての戦車が方向転換できるほど幅がある\u300dと書き残したほど巨大で、イシュタル門、マルドゥク神殿、ユーフラテス川の石橋、三つの宮殿を次々と築いた。だが何より常軌を逸していたのは、レンガへの執着だった。焼成レンガの一枚一枚に\u300cバビロン王ネブカドネザル\u300dと刻ませたのだ。数百枚ではない。数十万枚だ。バビロンのどこに立っても、足元にはこの王の名前があった。",
    },
    {
      text: "ある夜、王は夢を見た。天に届くほどの巨木。地の果てからも見え、鳥は枝に巣を作り、獣は木陰で憩う。そこへ天使が降りてきて命じた\u2014\u2014切り倒せ。ただし切り株は鉄と銅の輪で地に留め、天の露に打たせ、その心を人から獣に変えよ。\u300c七つの時が過ぎるまで\u300d。",
    },
    {
      text: "預言者ダニエルが解釈を求められた。聞き終えた瞬間、血の気が引いた。あの巨木はネブカドネザルそのものだった。天の判決\u2014\u2014人の世から追放され、獣と共に暮らし、牛のように草を食む。至高の神が人間の王国を支配していると認めるまで。ダニエルは懇願した。今すぐ悔い改めれば、まだ間に合うかもしれない、と。十二ヶ月が過ぎた。何も起きなかった。ある夕暮れ、ネブカドネザルは宮殿の屋上に立ち、眼下に広がる自らの都を見渡して言った。\u300cこの大バビロンは、私の力で築き、私の栄光のために造ったものではないか\u300d",
    },
    {
      text: "\u300c驕れる者は久しからず\u300dと\u300e平家物語\u300fは語る。だが平家が失ったのは権力だった。ネブカドネザルが失ったのは、人間であること、そのものだ。言葉がまだ唇を離れぬうちに、天から声が降った。\u300c王国はお前から去った\u300d。記録によれば、王はただちに人の世界から追われた。草を食み、露に打たれ、髪は鷲の羽のように伸び、爪は鳥の鉤爪と化した。現代の精神医学はこの状態を\u300c牛化妄想症\u300dと呼ぶ。自分が牛だと確信し、四つ這いで歩き、人との接触を一切拒む、極めてまれな疾患だ。七年間、この世で最も強大な男が獣として生きた。その間、帝国がどう機能していたのか、聖書は一切語らない。すべてのレンガに名を刻んだ男が、自分の造った世界から消えたかのように。",
    },
    {
      text: "だがこの話には、もう一つの層がある。二十世紀半ば、イスラエルのクムラン洞窟群から一片のアラム語断片が発見された。\u300cナボニドスの祈り\u300dと呼ばれるその文書は、驚くほど同じ筋書きを語っている。バビロンの王が七年間、神の罰による病に苦しみ、ユダヤ人の聖者に癒され、イスラエルの神の至高性を認めさせられる。ただし主人公の名はネブカドネザルではない。後のバビロン王ナボニドスだ。歴史上のナボニドスは実在の風変わりな王で、理由も告げずアラビアの砂漠に十年間住み着き、自国の神官たちすら困惑させた。多くの研究者はこう考えている\u2014\u2014この物語はもともとナボニドスについて語られ、後により劇的なネブカドネザルの名に置き換えられた、と。",
    },
    {
      text: "七年が過ぎ、ネブカドネザルは天を仰いだ。正気が戻った。\u300c永遠に生きる方を讃え、崇めた\u300dと記されている\u2014\u2014聖書はこの章だけ、まるで王自身が語っているかのような筆致で書かれている。家臣たちは王座に戻し、以前にもまさる威厳が与えられた。だが歴史の結末は容赦がない。紀元前562年にネブカドネザルは没した。在位四十三年。息子は二年で暗殺。父が興した王朝は大王の死から二十三年で断絶した。バビロンそのものが紀元前539年、ペルシアのキュロスに陥落する。あらゆるレンガに名を刻んだ帝国は、一世代すら持ちこたえなかった。",
    },
    {
      text: "だがレンガは残っている。大英博物館で、今日も手に取ることができる。指先で楔形文字をなぞれば\u300cバビロン王ネブカドネザル\u300dと読める。そして想像してほしい。世界最大の宮殿の屋上に立ち、自分が造ったすべてを見渡し、栄光を口にしようとしたその瞬間\u2014\u2014最後のまともな思考が、鳥のように頭から飛び立って、七年間、戻ってこなかったとしたら。",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH (overwrites existing records)
// ═══════════════════════════════════════════════════════════════════════════════

async function push(label, item) {
  console.log(`\n⏳ Pushing ${label}...`);

  // Validate JSON serialization before push
  const json = JSON.stringify(item);
  JSON.parse(json); // will throw if malformed
  console.log(`   ✅ JSON valid (${json.length} bytes)`);

  // Count characters in paragraphs
  const allText = item.paragraphs.map((p) => p.text).join("");
  console.log(`   📏 Paragraph text length: ${allText.length} characters`);

  await doc.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );

  console.log(`   ✅ ${label} pushed successfully!`);
}

async function main() {
  try {
    await push("zh (Chinese)", zh);
    await push("ja (Japanese)", ja);
    console.log("\n🎉 All done. Both languages pushed to DynamoDB.\n");
  } catch (err) {
    console.error("\n❌ Error:", err.message);
    process.exit(1);
  }
}

main();
