import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const now = Math.floor(Date.now() / 1000);

const item = {
  TableName: "Story",
  Item: {
    siteId: { S: "hermitage-winter-palace" },
    langStoryId: { S: "ja#storming-winter-palace" },
    lang: { S: "ja" },
    storyId: { S: "storming-winter-palace" },
    title: { S: "ロシアが変わった夜" },
    subtitle: { S: "冬宮殿「襲撃」の知られざる真実" },
    excerpt: {
      S: "映画が描いたのは壮絶な攻城戦。現実は？千の部屋で迷子になった武装集団、10万本のワインが引き起こした大混乱、そして食卓で静かに逮捕された政府閣僚たち。",
    },
    icon: { S: "⚔️" },
    tier: { S: "S" },
    paragraphs: {
      L: [
        {
          M: {
            text: {
              S: "こんなイメージを持っていないだろうか。武装した何千もの労働者が冬宮殿の門に殺到し、廊下を突破し、銃撃戦の末にロシア政府を打ち倒す\u2014\u2014。あの壮大な場面は、エイゼンシュテインが1927年に撮った映画『十月』から来ている。つまり、プロパガンダだ。ボリシェヴィキと呼ばれる共産主義革命家たちが権力を奪い、ツァーリと呼ばれるロシア皇帝の数百年に及ぶ支配を終わらせた1917年10月のあの夜、実際に起きたことは映画よりずっと奇妙で、ずっと間の抜けたものだった。",
            },
          },
        },
        {
          M: {
            text: {
              S: "宮殿を守っていたのは、わずか数百人。その大半は十代の士官候補生と、「決死大隊」と呼ばれる女性だけの義勇部隊だった\u2014\u2014彼女たちは第一次世界大戦の最前線で実戦を経験した本物の兵士だ。彼らが守っていたのは臨時政府、つまりニコライ二世がわずか八ヶ月前に退位した後に発足した、不安定な民主政権だった。だが時間が経つにつれ、守備兵たちは裏口からひとり、またひとりと消えていった。革命の最大の障害は、自分で立ち去ったのだ。",
            },
          },
        },
        {
          M: {
            text: {
              S: "ボリシェヴィキは「突入」したというより「忍び込んだ」と言ったほうが正しい。窓をよじ登り、使用人の通路から入り込み、ばらばらに宮殿の中へ潜り込んでいった。ところが冬宮殿には千以上の部屋がある。武装した労働者たちは、あちこちの廊下で完全に迷子になった。そしてそのとき、誰かがツァーリのワイン貯蔵庫を見つけてしまう\u2014\u2014ロシア最高級のワイン、約十万本。そこから先は想像がつくだろう。クーデターの真っ最中に大規模な宴会が始まり、革命は始まる前に終わりかけた。",
            },
          },
        },
        {
          M: {
            text: {
              S: "司令部は慌てた。鎮圧のために武装した衛兵を送り込んだが、その衛兵も一緒に飲み始めた。貯蔵庫を壁で塞ごうとしたが、壁は破られた。最終手段として、すべてのボトルを叩き割った。ワインは宮殿の排水溝を流れ、やがて通りへ\u2014\u2014首都の路上を赤い川が流れていった。その間、本物の政府、つまり臨時政府の閣僚たちは、小さな食堂のテーブルを囲んでいるところを発見された。一発の銃声もなく、全員が逮捕された。",
            },
          },
        },
        {
          M: {
            text: {
              S: "1917年10月26日の夜明け、レーニンは群衆の前に立ってこう宣言した。「臨時政府は打倒された」。こうしてロマノフ王朝三百年の権力の象徴だった冬宮殿は、一夜にして新しい体制の手に落ちた。すべてが約十二時間で終わり、そのなかで最も「激しかった」のは、おそらくワインをめぐる騒動だった。",
            },
          },
        },
        {
          M: {
            text: {
              S: "だが本当に驚くのはその後だ。帝国を倒したばかりの革命家たちは、帝国の宝を壊さなかった。冬宮殿には世界屈指の美術コレクション\u2014\u2014レンブラント、ルーベンス、レオナルド・ダ・ヴィンチ\u2014\u2014が眠っていた。皇室の贅沢の象徴として焼き払うこともできたはずだ。だが彼らはそうしなかった。代わりに門を大きく開け放った。冬宮殿はエルミタージュ美術館の中核となり、ツァーリの私的なコレクションは、すべての人のものになった。",
            },
          },
        },
        {
          M: {
            text: {
              S: "仏の顔も三度まで\u2014\u2014三世紀続いたロマノフ王朝にも、ついにその「三度目」が訪れた。そして史上最大級の権力交代劇は、暗い廊下での迷子と、ワイン貯蔵庫での大惨事と、食卓での静かな逮捕で幕を閉じた。二十世紀最大の革命は、雄叫びではなく、二日酔いとともに明けたのだ。",
            },
          },
        },
      ],
    },
    moralOrLesson: {
      S: "最強の帝国にも終わりは来る\u2014\u2014そしてその終わり方は、想像していたより、ずっと間が抜けていることがある。",
    },
    source: {
      S: "Bolshevik records, John Reed's \"Ten Days That Shook the World,\" Winter Palace garrison memoirs",
    },
    characters: {
      L: [
        { S: "Vladimir Lenin" },
        { S: "Alexander Kerensky (fled before the storming)" },
        { S: "Women's Battalion of Death" },
        { S: "Red Guards" },
        { S: "Provisional Government ministers" },
      ],
    },
    era: { S: "October 25-26, 1917" },
    readingTimeMinutes: { N: "2" },
    image: { S: "" },
    thumbnail: { S: "" },
    coordinates: {
      M: {
        lng: { N: "30.3146" },
        lat: { N: "59.9398" },
      },
    },
    hasAudio: { BOOL: false },
    isFree: { BOOL: true },
    disabled: { BOOL: false },
    storyCategory: { S: "crowns_conquests" },
    updatedAt: { N: String(now) },
  },
};

async function pushStory() {
  try {
    const command = new PutItemCommand(item);
    const result = await client.send(command);
    console.log("Successfully pushed Japanese (ja) story to DynamoDB!");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("Request ID:", result.$metadata.requestId);
    console.log(
      "Key: siteId=hermitage-winter-palace, langStoryId=ja#storming-winter-palace"
    );
  } catch (error) {
    console.error("Error pushing story:", error);
    process.exit(1);
  }
}

pushStory();
