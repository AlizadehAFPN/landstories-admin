import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "persepolis",
  langStoryId: "ja#women-who-ran-the-empire",
  storyId: "women-who-ran-the-empire",
  lang: "ja",
  title: `帝国を動かした女たち`,
  subtitle: `三万枚の粘土板が明かした、ギリシアの歴史家が一度も記録しなかった真実\u2014\u2014男女同一賃金、産休制度、そして王を決めた女王たち`,
  excerpt: `ペルセポリスの壁の中に二十三世紀もの間封じ込められていた三万枚の粘土板。それが明かしたのは、ギリシアの歴史家が誰一人として書き残さなかった事実だった。地上最大の帝国は女性に男性と同じ給与を払い、出産後の母親を支援し、その頂点では女王たちが次の王を決めていた。`,
  moralOrLesson: `二十四世紀もの間、西洋世界はペルシア帝国を女性に発言権のないただの王朝だと信じてきた。それを三万枚の粘土板が打ち砕いた。男女同一賃金、出産手当、広大な領地の経営、そして王位を左右した女王たち。証拠はずっとそこにあった\u2014\u2014壁の中に封じられ、炎に焼き固められ、誰かが読み解く日をただ静かに待っていた。`,
  icon: "\uD83D\uDC51",
  tier: "A",
  source: "Hallock, R.T., Persepolis Fortification Tablets (1969); Henkelman, Wouter, The Other Gods Who Are (2008); Brosius, Maria, Women in Ancient Persia (1996); Koch, Heidemarie, Frauen und Schlangen (2002); Llewellyn-Jones, Lloyd, King and Court in Ancient Persia (2013); Herodotus, Histories III.133-134, VII.2-3; Aeschylus, The Persians (472 BCE); Briant, Pierre, From Cyrus to Alexander (2002)",
  era: "509\u2013494 BCE (Fortification Tablets); broader Achaemenid period 550\u2013330 BCE",
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  coordinates: { lng: 52.8914, lat: 29.9342 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "lost_found",
  updatedAt: Math.floor(Date.now() / 1000),
  characters: [
    "Atossa (daughter of Cyrus, kingmaker)",
    "Irdabama (wealthy estate owner)",
    "Artystone (Darius\u2019s favorite wife)",
    "The women supervisors of the Fortification Tablets",
    "Richard Hallock (decipherer of the tablets)",
  ],
  paragraphs: [
    {
      text: `1930年代、考古学者たちがペルセポリスの壁をこじ開けた。現在のイランにある、古代ペルシア帝国の首都だ。壁の中から出てきたのは三万枚の粘土板。中身はただの帳簿\u2014\u2014誰がどんな仕事をして、穀物をいくらもらったか。退屈な経理記録にしか見えなかった。誰かが本気で読み始めるまでは。そこに眠っていたのは、二千五百年前、地上最大の帝国が女性に男性とまったく同じ賃金を払っていたという事実だった。`,
    },
    {
      text: `粘土板はダレイオス大王の治世、紀元前500年頃のおよそ十五年間を記録していた。帝国各地から集まった労働者の名簿\u2014\u2014ペルシア人、バビロニア人、エジプト人、ギリシア人\u2014\u2014それぞれに職種と給与が記されている。そのうち数百人が女性だった。奴隷ではない。正規の賃金労働者であり、管理者だ。同じ仕事であれば、男女で給与に差はない。一度や二度の例外ではなく、十五年間、数千件の記録すべてがそうだった。制度だった。`,
    },
    {
      text: `さらに驚く事実がある。粘土板によると、出産直後の女性には追加の報酬が支給されていた。紀元前五世紀の産休手当だ。同じ時代のアテネでは、女性は財産を持てず、男性の付き添いなしには外出もできなかった。ローマでは、女性は法的に一生子ども扱いだった。ギリシア人が\u300c野蛮\u300dと呼んだペルシアこそが、出産後の母親を支える仕組みを整えていた。西洋がそこに追いつくまで、二千年以上かかることになる。`,
    },
    {
      text: `帝国の上層にも女性の名がある。粘土板に繰り返し登場するイルダバマという女性は、広大な農園を経営し、数百人の労働者を束ねていた。穀物やワイン、家畜の取引規模は地方長官に並ぶほどだ。彼女は自分だけの印章を持っていた\u2014\u2014玉座に座る女性が彫り込まれたものだ。すべての命令書に自ら押印している。夫や父親の承認を示す記録は一切ない。彼女が仕えたのは、王ただ一人だった。`,
    },
    {
      text: `だが、真の権力者はアトッサだった。ペルシア帝国をゼロから築いたキュロス大王の娘だ。生涯で三人の王と結婚した女性。ペルシアの女性にほとんど関心を示さなかったギリシアの歴史家ヘロドトスですら、彼女が宮廷で\u300cすべての権力を握っていた\u300dと記している。ダレイオスが後継者を決めるとき、アトッサは動いた。年上の異母兄弟たちを差し置き、自分の息子クセルクセスを王位に推した。そして勝った。たった一人の女性が、地上最大の帝国の次の支配者を決めたのだ。`,
    },
    {
      text: `何百年もの間、西洋の学者たちはペルセポリスに自分たちの先入観を重ねた\u2014\u2014ハーレム、ベールの女たち、遅れた帝国。ある建物には\u300cクセルクセスのハーレム\u300dという名前までつけられた。根拠はゼロだ。だが粘土板が語るのは、まったく別の物語だった。王家の女性たちは各地を自由に行き来し、宴を催し、領地を経営し、巨大な富を動かしていた。彼女たちは壁の向こうに閉じ込められていたのではない。壁の内側から帝国を動かしていた。`,
    },
    {
      text: `歴史を書いたのがギリシア人だったから、ペルシアは暴君と無力な女たちの国として語り継がれた。真実は壁の中に二十三世紀もの間、封じられていた。石の上にも三年と言うが、この真実は石の中で二千三百年を耐え抜いた。アレクサンドロス大王がペルセポリスを焼き払った炎が、皮肉にも粘土板を硬く焼き固めて証拠を永久に保存した。板はやがてシカゴに渡り、リチャード・ハロックという学者が数十年をかけて一枚一枚解読した。女性の権利の歴史を書き換えたのは、崇高な宣言ではなかった。二千五百年前の給与明細だった。`,
    },
  ],
};

async function main() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log("SUCCESS: Japanese (ja) story pushed to DynamoDB");
    console.log(`  siteId: ${item.siteId}`);
    console.log(`  langStoryId: ${item.langStoryId}`);
    console.log(`  title: ${item.title}`);
    console.log(`  paragraphs: ${item.paragraphs.length}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists! Use update instead.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

main();
