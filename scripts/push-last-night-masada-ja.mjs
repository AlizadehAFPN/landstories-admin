import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "masada",
  langStoryId: "ja#last-night-on-masada",
  lang: "ja",
  storyId: "last-night-on-masada",
  title: "マサダ最後の夜",
  subtitle:
    "960人のユダヤ人守備隊がローマの奴隷となることを拒み、くじ引きで最期を託し合った——史上最も壮絶な最後の砦",
  excerpt:
    "城壁は破られ、夜が明ければ一万のローマ兵が押し寄せる。その夜、指導者は立ち上がり、全員に問いかけた。彼の言葉は二千年の時を超え、今も響き続けている。",
  paragraphs: [
    {
      text: "紀元73年の春、ローマ第十軍団がついにマサダの外壁を突破した。何か月もかけて断崖に攻城用の坂道を築き上げ、ようやく壁に到達したのだ。守備側は木材と土を詰めた急造の壁で応じた。破城槌で崩せないと見るや、ローマ兵は火を放った。一瞬、風がローマ側の攻城塔へ炎を吹きつけた——が、すぐに向きが変わった。日が暮れる頃には壁は消えていた。夜明けに何が起きるか、全員がわかっていた。一万の兵士が突入口から雪崩れ込む。もう壁はない。残されたのは、ひとつの選択だけだった。",
    },
    {
      text: "彼らはただの避難民ではなかった。「シカリ」——「短剣の男たち」と呼ばれた、ユダヤ反乱軍の中で最も過激な一派だ。七年前、ローマ兵がエルサレムの神殿を略奪し、市民を虐殺した。ユダヤ全土が蜂起した。反乱軍は緒戦で鮮やかな勝利を収め、ローマの一個軍団を丸ごと壊滅させた。ローマは六万の大軍を送り込んだ。拠点はひとつ、またひとつと陥落した。エルサレムは焼かれ、神殿は瓦礫と化した。マサダは最後に残された砦だった——死海を見下ろす断崖の要塞に立てこもる960人。百年前にヘロデ王が蓄えた食料で、かろうじて生き延びていた。",
    },
    {
      text: "その夜、指導者エルアザル・ベン・ヤイルが全員をヘロデ王の宮殿に集めた。ヨセフス——ローマに投降したユダヤ人司令官であり、この出来事を記録した唯一の人物——によれば、エルアザルは二度にわたって語りかけた。降伏した先に何が待っているか。男は鉱山か闘技場で死に、女は辱められ、子どもは生まれながらの奴隷として育てられる。「妻たちを辱めから守ろう」と彼は言った。「子どもたちに、奴隷の意味を知らせないまま逝かせよう」。彼は降参しろと言っているのではない。最後に残された自由な決断を、自分たちの手で下そうと言っているのだ。",
    },
    {
      text: "男たちは泣いた。妻を抱きしめたまま、腕をほどけない者もいた。それでもエルアザルは続けた。周りを見てくれ、と。燃え落ちた城壁を。麓を絞め上げるように囲むローマの野営地を。交渉の余地などどこにもない。ローマは反乱者に慈悲をかけない。見せしめにするだけだ。エルサレム陥落後の十字架刑を、全員が知っていた——磔にする人間が多すぎて、木材が足りなくなったほどだ。捕虜はローマの大通りを戦利品のように引き回された。「仏の顔も三度まで」という言葉がある。だがこの人々は、三度どころではなかった。神殿を穢され、聖都を焼かれ、最後の壁まで崩された。もう耐える先に何も残っていなかった。一度にではなく、涙なしにではなく——だが、全員が頷いた。",
    },
    {
      text: "次に起きたことは、整然としていた。ユダヤの律法は自殺を禁じている。それは全員が知っていた。だから、たった一人だけが自らの手で命を絶てばよい方法を考え出した。一人ひとりの男が家族のもとへ歩み寄り、抱きしめ、そして手を下した。持ち物はすべて焼いた。ただし食料の貯蔵庫だけは手つかずで残した——ローマへの伝言だ。我々は飢えたのではない。自ら選んだのだ、と。十人がくじで選ばれ、残りの者たちを手にかけた。その十人がまたくじを引いた。最後の一人が宮殿に火を放ち、自分の剣に身を貫いた。",
    },
    {
      text: "夜が明けた。ローマ兵が突入口に殺到した——盾を固め、剣を抜き、壮絶な白兵戦を覚悟して。だが、待っていたのは静寂だった。ヨセフスはこう記している。「あらゆる方向に恐ろしいほどの孤独が広がり、宮殿の中にはただ炎があるばかりだった」。兵士たちは叫んだ。剣で盾を打ち鳴らした。応答は何もなかった。やがて、二人の女性と五人の子どもが、隠れていた貯水槽から這い出てきた。一人はエルアザルの親族だった。彼女がすべてを語った。歴戦の兵士たち——エルサレムの神殿を自らの手で焼いた者たち——は、死者を前に立ち尽くし、声を失った。",
    },
    {
      text: "不思議なことがある。その後二千年にわたり、ユダヤ教を形づくったラビたちは、マサダについて一切語らなかった。一度も。彼らが選んだ英雄は別の人物だった——包囲下のエルサレムから交渉で脱出し、神殿も国土もなくても存続できる「学び」の伝統を打ち立てた一人の学者だ。マサダの剣と炎は、ラビたちが退けたものそのものだった。だが、物語は消えなかった。ローマ兵が山頂で出会ったあの沈黙——膝を屈するくらいなら死を選んだ人々の沈黙——は、二千年を経た今もこの高原に漂っている。誰にも答えられない。誰にも覆せない。",
    },
  ],
  moralOrLesson:
    "自由とは、鎖がないことだけではない。すべての道が闇に通じていても、自らの運命を自らの手で選ぶ権利のことだ。民の真価は、生き延びたかどうかではなく、生きるに値する何かを手放すことを拒んだかどうかで決まる。",
  icon: "⚔️",
  tier: "S",
  source:
    "Josephus, Flavius. Bellum Judaicum (The Jewish War), Book VII, chapters 252-406; Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; Magness, Jodi. Masada: From Jewish Revolt to Modern Myth, Princeton University Press, 2019; Cohen, Shaye J.D. 'Masada: Literary Tradition, Archaeological Remains, and the Credibility of Josephus,' Journal of Jewish Studies 33, 1982",
  characters: [
    "Eleazar ben Ya'ir -- leader of the Sicarii defenders",
    "Flavius Josephus -- Jewish-Roman historian, sole source of the account",
    "Two unnamed women -- survivors who hid in a cistern with five children",
    "Lucius Flavius Silva -- Roman commander of the besieging Tenth Legion",
    "The 960 defenders -- men, women, and children of the last Jewish stronghold",
  ],
  era: "73 or 74 CE -- the final chapter of the First Jewish-Roman War",
  readingTimeMinutes: 3,
  image: "",
  updatedAt: 1772116624,
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 35.3536, lat: 31.3156 },
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
};

async function push() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log("✅ Japanese (ja) version pushed successfully!");
    console.log(`   siteId: ${item.siteId}`);
    console.log(`   langStoryId: ${item.langStoryId}`);
    console.log(`   title: ${item.title}`);
    console.log(`   paragraphs: ${item.paragraphs.length}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log("⚠️  Record already exists. Overwriting...");
      await docClient.send(
        new PutCommand({ TableName: "Story", Item: item })
      );
      console.log("✅ Japanese (ja) version overwritten successfully!");
    } else {
      console.error("❌ Failed to push Japanese version:", err);
      process.exit(1);
    }
  }
}

push();
