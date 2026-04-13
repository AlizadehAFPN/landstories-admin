import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";

const baseItem = {
  siteId: "masada",
  storyId: "lots-of-the-ten",
  icon: "\uD83D\uDD2E",
  tier: "A",
  source:
    "Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; Cohen, Shaye J.D. 'Masada: Literary Tradition, Archaeological Remains, and the Credibility of Josephus,' Journal of Jewish Studies 33, 1982; Ben-Yehuda, Nachman. The Masada Myth: Collective Memory and Mythmaking in Israel, University of Wisconsin Press, 1995; Ben-Yehuda, Nachman. Sacrificing Truth: Archaeology and the Myth of Masada, Humanity Books, 2002; Zias, Joe. 'Human Skeletal Remains from the Southern Cave at Masada,' in The Dead Sea Scrolls Fifty Years After Their Discovery, 2000; Sallon et al. 'Germination, Genetics, and Growth of an Ancient Date Seed,' Science 320, 2008",
  characters: [
    "Yigael Yadin -- archaeologist, former IDF Chief of Staff, excavator of Masada",
    "The woman with braided hair -- an unnamed 17-18 year old whose remains were found in the Northern Palace",
    "Nachman Ben-Yehuda -- Hebrew University sociologist who challenged the Masada myth",
    "Joe Zias -- physical anthropologist who questioned the identification of the bones",
    "Sarah Sallon -- scientist who germinated a 2,000-year-old seed from Masada",
  ],
  era: "1963-1965 (Yadin's excavation); 1969 (state funeral); 1982-2019 (scholarly debate)",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 35.3536, lat: 31.3156 },
  hasAudio: false,
  isFree: true,
  storyCategory: "riddles_past",
  updatedAt: Math.floor(Date.now() / 1000),
};

// ═══════════════════════════════════════════════════════
//  CHINESE (zh) — 十人之签
// ═══════════════════════════════════════════════════════
const zhItem = {
  ...baseItem,
  lang: "zh",
  langStoryId: "zh#lots-of-the-ten",
  title: `十人之签`,
  subtitle: `十一块陶片、三具遗骸、一缕编好的头发——那些既证实又动摇马萨达传说的考古发现`,
  excerpt: `考古学家发现了十一块刻有名字的陶片，其中一块写着\u201c本\u00b7亚尔\u201d。他们以为找到了马萨达最后一夜的抽签。真相远比想象复杂。`,
  moralOrLesson: `发现过去与构建过去之间的界限，比我们愿意承认的要薄得多。每一个从泥土中取出文物的考古学家，都在替那件文物选择它要讲的故事——而我们最希望是真的那个故事，恰恰是最需要审视的。编好的头发、刻字的陶片、散落的遗骨，都是真的。它们意味着什么，是我们自己决定的。`,
  paragraphs: [
    {
      text: `1963年，雅盖尔\u00b7亚丁带着来自二十八个国家的上千名志愿者，登上了马萨达。亚丁不只是个考古学家——他曾在1948年独立战争中指挥过以色列军队。如今他要发掘的，是死海边的这座沙漠要塞。公元73年，将近一千名犹太起义者在这里宁死不降罗马。古代史家约瑟夫斯记载，最后一夜，十个人被抽签选出，负责杀死所有同伴。亚丁想找到那些签。`,
    },
    {
      text: `他找到了不可思议的东西。南门附近，团队从泥土中挖出了十一块陶片，每块上面刻着一个名字。其中一块写着\u201c本\u00b7亚尔\u201d——正是那位说服众人\u201c宁死不做奴隶\u201d的指挥官以利亚撒\u00b7本\u00b7亚尔的名字。亚丁写道：\u201c我们可以想象，那个抽到签的人是什么心情。\u201d消息传出，全世界为之震动：犹太历史上最壮烈一夜的实物证据，就躺在尘土里。`,
    },
    {
      text: `但学者们毫不客气。陶片是十一块，不是约瑟夫斯说的十块。\u201c本\u00b7亚尔\u201d在一世纪是个烂大街的名字——找到它就像在现代工地挖出块写着\u201c张伟\u201d的碎瓷片，什么也证明不了。马萨达各处还出土了几百块类似的陶片，全是排班表和口粮分配单。更何况，约瑟夫斯写书时的老板，恰恰就是摧毁耶路撒冷的那位罗马皇帝。一场悲壮的集体赴死，远比一个混乱不堪的结局更有故事价值。`,
    },
    {
      text: `然后是那些遗骸。北宫浴室的废墟中，发掘者找到了三具骨骼：一个二十岁上下的年轻男子，一个大约十八岁的女子，还有一个孩子。女子身旁有一缕编好的头发——在死海边极度干燥的空气中完整保存了两千年。她是在明知自己即将赴死的时候编好了头发的。这个画面让人久久无法释怀。但就在旁边，出土了猪骨。犹太人不养猪，罗马人养。所以这些遗骸，到底是守卫者的，还是罗马士兵的？`,
    },
    {
      text: `以色列用政治给出了答案，而不是科学。1969年，二十七组遗骸在马萨达山坡举行了正式军葬——覆盖国旗的棺椁、仪仗队、鸣枪致敬。这场典礼把考古学无法证实的东西当成了板上钉钉的事实。社会学家本-耶胡达后来揭示了教科书悄悄抹去的一段历史：那些守卫者算不上英雄。逃上山之前，他们在附近村庄屠杀了七百名同胞犹太人。神话比真相好用得多。`,
    },
    {
      text: `但这次发掘也出土了争议无法撼动的东西。废墟中的卷轴里有一段《以西结书》第37章的残片——先知看见一片枯骨遍地的山谷，上帝问道：\u201c这些枯骨能复活吗？\u201d一段关于民族重生的经文，偏偏出现在这个民族做出最后抵抗然后覆灭的地方。而在2005年，科学家种下了亚丁发掘时找到的一颗椰枣种子。两千年了。它发了芽，长成了树，人们给它取名\u201c玛土撒拉\u201d。`,
    },
    {
      text: `中国人说\u201c枯木逢春\u201d，但这颗种子等了整整两千年才等来它的春天。那些陶片也许不是签，那些遗骸也许不是守卫者，那些慷慨激昂的演说也许从未被讲出口。但卷轴是真的——真实的人，在一座真实山顶的真实会堂里，读过这些文字。那颗种子也是真的，在废墟下沉睡了两千年，只等有人给它一点水和一点光。枯骨能复活吗？在马萨达，连种子都在点头。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════
//  JAPANESE (ja) — 十人のくじ
// ═══════════════════════════════════════════════════════
const jaItem = {
  ...baseItem,
  lang: "ja",
  langStoryId: "ja#lots-of-the-ten",
  title: `十人のくじ`,
  subtitle: `11枚の陶片、3体の遺骨、編まれたままの髪——マサダの伝説を証明し、同時に揺るがした考古学的発見`,
  excerpt: `名前が刻まれた11枚の陶片。その1枚には「ベン・ヤイル」とあった。考古学者たちは、マサダ最後の夜に引かれたくじを見つけたと信じた。だが真実は、はるかに複雑だった。`,
  moralOrLesson: `過去を「発見する」ことと「作り上げる」ことの境界線は、私たちが思っているよりずっと薄い。土から遺物を掘り出すたびに、考古学者はそれが語る物語を選んでいる。そして、最も真実であってほしい物語こそ、最も厳しく検証しなければならない。編まれた髪も、刻まれた陶片も、散らばった骨も、すべて本物だ。それが何を意味するかを決めるのは、私たちなのだ。`,
  paragraphs: [
    {
      text: `1963年、イガエル・ヤディンは28カ国から集まった数千人のボランティアとともに、マサダに登った。ヤディンはただの考古学者ではない。1948年の独立戦争でイスラエル軍を率いた元参謀総長だ。彼が発掘しようとしていたのは、死海を見下ろす砂漠の要塞。紀元73年、ここでおよそ千人のユダヤ人反乱者がローマへの降伏を拒み、死を選んだ。古代の歴史家ヨセフスの記録によれば、最後の夜、くじで選ばれた十人が仲間全員の命を絶った。ヤディンは、そのくじを見つけたかった。`,
    },
    {
      text: `そして、驚くべきものが出てきた。南門の近くから、名前が刻まれた11枚の陶片が見つかったのだ。そのうちの1枚には「ベン・ヤイル」と書かれていた。「奴隷になるくらいなら死を選ぼう」と人々を説いた指揮官、エレアザル・ベン・ヤイルの名前だ。ヤディンは記している。「くじを引いた者の気持ちを、われわれは想像できるだろうか」。世界中が息を呑んだ。ユダヤ史上最も壮絶な夜の物証が、砂の中から現れたのだ。`,
    },
    {
      text: `だが、学界からの反論は容赦なかった。陶片は11枚であり、ヨセフスが記した10枚とは合わない。「ベン・ヤイル」は1世紀のユダヤ社会ではごくありふれた名前で、現代の遺跡から「田中」と書かれた札が出てきたようなものだ。マサダの他の場所からも同じような陶片が何百枚と出土しており、作業の割り当てや食料配給に使われていた。そもそもヨセフスは、エルサレムを滅ぼした当のローマ皇帝に雇われて書いていた。高潔な集団自決の方が、泥沼の最期よりも、ずっと「いい話」になる。`,
    },
    {
      text: `さらに、遺骨の問題があった。北宮殿の浴場跡から3体の骨が見つかった。20歳前後の青年、18歳ほどの女性、そして子供。女性のそばには、編まれたままの髪が残されていた。死海のからからに乾いた空気のおかげで、2千年もの間、その姿を保っていたのだ。自分がまもなく死ぬとわかっていて、髪を編んだ。忘れられない光景だ。だが、すぐ近くから豚の骨が出た。ユダヤ人は豚を飼わない。ローマ人は飼う。この遺骨は守備兵のものなのか、それともローマ兵のものなのか。`,
    },
    {
      text: `イスラエルは科学ではなく、政治で答えを出した。1969年、27組の遺骨がマサダの斜面で正式な軍葬を受けた。国旗で覆われた棺、儀仗兵、弔砲。考古学が証明できなかったことを、国家の式典が既成事実に変えてしまった。社会学者ベン＝イェフダは後に、教科書がひっそりと消していた事実を暴いた。この守備兵たちは英雄などではなかった。山に逃げ込む前に、近隣の村で同胞のユダヤ人700人を虐殺していたのだ。神話の方が、現実より使い勝手がよかったということだ。`,
    },
    {
      text: `しかし、この発掘はどんな論争にも揺るがない発見ももたらした。瓦礫の中の巻物に、エゼキエル書37章の断片があった。預言者が干からびた骨で埋め尽くされた谷を見る場面だ。神が問いかける。「これらの骨は生き返ることができるか」。民族の復活を語る聖句が、まさにその民族の最後の抵抗が潰えた場所から出てきた。そして2005年、ヤディンの発掘時に回収されたナツメヤシの種を科学者が植えた。2千年前の種だ。芽が出た。木になった。その木は「メトシェラ」と名づけられた。`,
    },
    {
      text: `「死人に口なし」と言う。だがマサダでは、沈黙そのものが雄弁だ。あの陶片はくじではないかもしれない。あの骨は守備兵のものではないかもしれない。あの演説は一度も語られなかったかもしれない。それでも巻物は本物だ——本物の人々が、本物の山頂にある本物の会堂で読んでいた。あの種も本物だ。2千年、瓦礫の下で眠り続け、ただ水と光を待っていた。枯れた骨は生き返れるのか。マサダでは、種子さえもが「はい」と答えている。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════
//  PUSH
// ═══════════════════════════════════════════════════════
async function pushItem(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\nPushing ${label}...`);

  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`Missing required fields for ${label}`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(
      `Unexpected paragraph count (${item.paragraphs.length}) for ${label}`
    );
  }

  // Validate no empty paragraphs
  for (let i = 0; i < item.paragraphs.length; i++) {
    if (!item.paragraphs[i].text || item.paragraphs[i].text.trim() === "") {
      throw new Error(`Empty paragraph at index ${i} for ${label}`);
    }
  }

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );
  console.log(`  \u2713 ${label} pushed successfully.`);
}

(async () => {
  try {
    await pushItem(zhItem);
    await pushItem(jaItem);
    console.log("\n=== Both stories (zh, ja) pushed successfully. ===\n");
  } catch (err) {
    console.error("\n\u2717 ERROR:", err.message || err);
    if (err.name === "ConditionalCheckFailedException") {
      console.error(
        "  A record with this siteId+langStoryId already exists. Delete it first or remove the condition."
      );
    }
    process.exit(1);
  }
})();
