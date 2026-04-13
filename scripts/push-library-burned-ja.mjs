import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const item = {
  siteId: "alamut-castle",
  langStoryId: "ja#library-burned-seven-days",
  lang: "ja",
  storyId: "library-burned-seven-days",
  title: `七日七晩燃え続けた図書館`,
  subtitle: `四十万冊の書物、七日七晩の炎、永遠に知ることのできない喪失`,
  excerpt: `ひとりの歴史家がアルボルズ山脈の奥深くにある図書館を歩き、何を残すかを選んだ。コーランは救い出した。天文観測機器も持ち出した。そして、残りのすべてに火を放った。アラムートの炎は七日七晩燃え続けた。`,
  moralOrLesson: `城壁は建て直せる。王国も再興できる。だが、一度燃えた本は二度と戻らない。アラムート最大の悲劇は、何が失われたかではない——何が失われたのか、永遠にわからないということだ。`,
  paragraphs: [
    {
      text: `1090年、ハサン・サッバーフという学者が中世史に残る大胆な行動に出た。イラン北部、アルボルズ山脈の断崖の上にそびえるアラムート城。この難攻不落の要塞を、一滴の血も流さずに手に入れたのだ。そして彼は城に閉じこもり、34年間ほとんど外に出なかった。戦の準備をしていたのではない。本を読み、本を集め、イスラム世界でも指折りの図書館を築き上げていたのだ。`,
    },
    {
      text: `その後160年以上にわたって、歴代の指導者たちがこの蔵書を増やし続けた。13世紀半ばには約40万冊に達していた。神学、哲学、天文学、医学、詩。当時の人類の知のほぼすべてがここにあった。イスラム世界各地から学者たちが、この辺境の山あいの谷を目指して旅をした。ただの書庫ではない。当時の世界で最も重要な知の拠点のひとつだった。`,
    },
    {
      text: `その中に、30年以上ここで暮らした学者がいた。ナスィール・アッディーン・トゥースィー。13世紀のイスラム世界でおそらく最も優れた科学的頭脳の持ち主だ。彼がアラムートで書いた天文学の研究は、やがてルネサンス期のヨーロッパに届き、コペルニクスに影響を与えることになる。彼の図書館の使い方は、天才にしかできないものだった。ただ読むのではなく、異なる分野の知識をつなぎ合わせ、人間の理解の限界を押し広げていた。`,
    },
    {
      text: `1256年、モンゴル軍がやってきた。フレグ・ハン——チンギス・ハンの孫——が10万を超える兵を率いて山に入った。目的はただひとつ。約200年間アラムートを守り続けた勢力を、跡形もなく消し去ることだった。最後の城主ルクヌッディーンは交渉を試み、降伏の証に自ら城壁を壊し始めた。無駄だった。フレグが求めていたのは、降伏ではなく消滅だった。`,
    },
    {
      text: `本当に胸が痛むのは、ここからだ。火が放たれる前、モンゴル軍に同行していた歴史家ジュヴァイニーが、図書館の中を歩くことを許された。教養のある人物だった。自分の目の前にあるものの価値を、正確に理解していた。彼はコーランを救い出し、天文観測機器を持ち出した。ハサン・サッバーフの自伝まで読んだ——アラムート建国の唯一の一次資料だ。そして、残りのすべてに火を放った。炎は七日七晩燃え続けた。「知らぬが仏」とこの国では言う。だがこの場合、知りようがないのだ。それこそが、この話で最も残酷なところだった。`,
    },
    {
      text: `トゥースィーは生き延びた。モンゴル側についたのだ——裏切りだったのか、それとも生き残るための決断だったのか、今となっては誰にもわからない。フレグの首席科学顧問となった彼は、イランのマラーゲに天文台を建てるよう進言し、征服した各都市から40万冊の書物を集めてそこに収めた。その研究は数世紀後、コペルニクスのもとに届くことになる。トゥースィーの頭の中にあったものの一部は、あの炎をくぐり抜けた。だが、あくまで一部にすぎなかった。`,
    },
    {
      text: `現在、アラムート城はアルボルズ山脈の同じ岩の上に、全体のおよそ3分の1が廃墟として残っている。考古学者たちは、800年前に造られた水路に今も水が流れていることを発見した。モンゴルが去った後、人々は戻ってきた。人はいつだって戻ってくる。だが、図書館は戻らない。40万冊の書物。何世紀にもわたる思索と詩が、たった一週間で灰になった。ひとりの天才が記憶の中に持ち出したものはわかっている。だが、燃えてしまったものが何だったのか——それは、永遠にわからない。`,
    },
  ],
  characters: [
    `ナスィール・アッディーン・トゥースィー（破壊を生き延びた博学者）`,
    `フレグ・ハン（破壊を命じたモンゴルの司令官）`,
    `アタ・マリク・ジュヴァイニー（図書館を焼いた歴史家）`,
    `ルクヌッディーン・フルシャー（アラムート最後の城主）`,
    `ハサン・サッバーフ（図書館を築いた創設者）`,
  ],
  icon: "🔥",
  tier: "S",
  source:
    "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); Peter Willey, Eagle's Nest: Ismaili Castles in Iran and Syria (I.B. Tauris, 2005); Encyclopaedia Iranica; Hamideh Chubak, Alamut archaeological reports (2004)",
  era: "November-December 1256 CE (Mongol destruction of Alamut)",
  readingTimeMinutes: 5,
  image: "",
  thumbnail: "",
  coordinates: { lng: 50.5861, lat: 36.4447 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "lost_found",
  updatedAt: Math.floor(Date.now() / 1000),
};

async function push() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
      })
    );
    console.log("SUCCESS: Japanese (ja) story pushed to DynamoDB");
    console.log(`  siteId: ${item.siteId}`);
    console.log(`  langStoryId: ${item.langStoryId}`);
    console.log(`  title: ${item.title}`);
    console.log(`  paragraphs: ${item.paragraphs.length}`);
    console.log(`  updatedAt: ${item.updatedAt}`);
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
