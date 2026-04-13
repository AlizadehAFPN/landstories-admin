// Push Chinese, Japanese, and Korean recreations of
// "The Discovery of St. Peter's Tomb" to the Story DynamoDB table.

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
  siteId: "vatican-st-peters",
  storyId: "st-peters-tomb-discovery",
  icon: "⛏️",
  storyCategory: "prophets_pilgrims",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 41.9022, lng: 12.4536 },
  source:
    "Guarducci, Margherita. The Tomb of St. Peter, 1960; Toynbee and Ward-Perkins, The Shrine of St. Peter, 1956; Walsh, John Evangelist. The Bones of St. Peter, 1982",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — 圣彼得在此
// ═══════════════════════════════════════════════════════════════════════════════
// Register: Modern Mandarin — popular WeChat longform / podcast style
// Proverb subverted: 踏破铁鞋无觅处 (wear out iron shoes searching only to
//   find it effortlessly) → flipped: the answer never moved, WE took 2000 years
//   to look down.

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#st-peters-tomb-discovery",

  title: "圣彼得在此",

  subtitle:
    "1939年，梵蒂冈工人无意中打开了一个沉睡一千六百年的秘密",

  excerpt:
    "1939年，梵蒂冈的工人在圣彼得大教堂地下施工时，大理石地板突然塌了。他们跌入漆黑一片——落进了一个一千六百年没见过天日的世界。",

  moralOrLesson:
    "信仰和考古有时会走向同一个真相，只不过路径不同",

  characters: [
    "教皇庇护十二世",
    "教皇保禄六世",
    "玛格丽特·瓜尔杜奇",
    "安东尼奥·费鲁阿",
    "君士坦丁大帝",
  ],

  era: "1939-1968",

  paragraphs: [
    {
      text: "1939年，几个工人在圣彼得大教堂的地下施工。任务很简单——给刚去世的教皇腾个墓位。结果一铲子下去，大理石地板塌了，人直接跌进一片漆黑。等灰尘散去，他们发现自己站在一个一千六百年没见过光的地方。而这个意外，要么能证明这座教堂存在的终极理由——要么彻底推翻它。",
    },
    {
      text: "他们掉进的，是一座罗马时代的地下墓城，大约公元320年被彻底封死。干这件事的人是君士坦丁大帝——罗马帝国第一个信基督教的皇帝。他下令把整片墓地用土填平，贵族的墓也好，奴隶的墓也好，统统埋掉。原因只有一个：他相信这片土地下面，埋着一个比任何人都重要的人。",
    },
    {
      text: "当时的教皇庇护十二世——那位在二战中掌舵天主教会的人——悄悄批准了一次秘密发掘。整整十年，一支小型考古队在大教堂地下的窄道里匍匐前进，一座一座地打开古墓。壁画、马赛克、拉丁文铭刻……有些墓的年代追溯到公元一世纪，比基督教本身还要古老。",
    },
    {
      text: "越往西挖，越靠近主祭坛的正下方，墓葬就越简陋、越破旧、越古老。考古队意识到，他们进入了梵蒂冈山上曾经埋葬穷人和死刑犯的区域——恰恰是一个来自加利利小镇、被钉十字架的渔夫最可能的长眠之地。",
    },
    {
      text: "就在教皇祭坛的正下方，他们找到了一座小石龛，建于大约公元160年。这与一份古文献完全吻合：公元200年前后，一位叫盖乌斯的罗马教士写道，他可以带人去梵蒂冈山看使徒彼得的「纪念碑」。石龛旁的墙上刻满了早期基督徒的祈祷词。其中一句穿越了十几个世纪，直击人心——「Petros eni」，彼得在此。",
    },
    {
      text: "墙的背后，一个大理石衬里的小空间里，躺着一具人骨，裹在紫色织金布中——只有皇室或最高圣职才配使用的材料。解剖学家鉴定后认为，这是一个体格健壮的男性，死亡时六十到七十岁之间。和使徒彼得的形象，惊人地吻合。",
    },
    {
      text: "然而争论也随之而来。考古队负责人费鲁阿在石龛正下方的土里也发现了一组骸骨，他坚信那才是真品。而古文字学家瓜尔杜奇力挺墙后那具——她翻遍梵蒂冈档案，认为那些骨骸在更早的施工中被人悄悄移到了安全的地方。两位学者互不相让，争了几十年。",
    },
    {
      text: "1968年，教皇保禄六世对全世界说了一句极其讲究的话：「圣彼得的遗骸已被鉴定，其方式我们认为是令人信服的。」注意他的措辞——「我们认为」。这不是教义。直到今天，没有任何天主教徒被要求必须相信那就是彼得的骨头。",
    },
    {
      text: "那具骸骨到底是不是两千年前跟随耶稣的加利利渔夫？也许永远无法证明。但有一件事谁也否认不了：从一世纪的一座简陋坟墓，到二世纪的石龛，到君士坦丁的大教堂，再到今天这座文艺复兴杰作——两千年的信仰，全部指向同一小片罗马泥土。都说踏破铁鞋无觅处，但这个答案从来就没挪过地方。是我们花了两千年，才终于低下头，看了一眼自己脚下。",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — ペトロ、ここにあり
// ═══════════════════════════════════════════════════════════════════════════════
// Register: Modern Japanese — NHK documentary / popular nonfiction
// Proverb subverted: 灯台下暗し (it's darkest right under the lighthouse)
//   → never in human history has such an enormous lighthouse kept its base
//     shrouded in darkness for this long.

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#st-peters-tomb-discovery",

  title: "ペトロ、ここにあり",

  subtitle:
    "1939年、バチカンの地下で偶然発見された1600年の秘密",

  excerpt:
    "1939年、サン・ピエトロ大聖堂の地下で工事をしていた作業員が、大理石の床を突き破って暗闇に落ちた。そこには1600年間、誰の目にも触れなかった秘密が眠っていた。",

  moralOrLesson:
    "信仰と考古学は、異なる道を歩みながらも、同じ真実にたどり着くことがある",

  characters: [
    "教皇ピウス12世",
    "教皇パウロ6世",
    "マルゲリータ・グアルドゥッチ",
    "アントニオ・フェルーア",
    "コンスタンティヌス大帝",
  ],

  era: "1939-1968",

  paragraphs: [
    {
      text: "1939年のある日、バチカンのサン・ピエトロ大聖堂——世界最大の教会——で、ちょっとした工事が始まった。亡くなった教皇のために墓所を広げる、それだけの作業だ。ところが床を掘った瞬間、大理石の地面がごっそり抜け落ちた。暗闇に放り出された作業員たちが目にしたのは、1600年ものあいだ封印されていた世界だった。しかもそこには、この大聖堂の存在意義そのものを揺るがしかねない秘密が眠っていた。",
    },
    {
      text: "彼らが落ちた先は、ローマ時代の地下墓地だった。西暦320年頃、コンスタンティヌス大帝——ローマ皇帝として初めてキリスト教を受け入れた人物——がこの墓地を丸ごと土で埋め、その上に教会を建てるよう命じた。貴族の墓も、元奴隷の墓も、すべて。なぜか。この土の下に、誰よりも大切な一人の人間が眠っていると信じたからだ。",
    },
    {
      text: "当時の教皇ピウス12世は、第二次世界大戦の荒波の中で教会を率いた人物だ。彼は極秘の発掘調査を許可した。以後10年にわたり、少人数の考古学チームが大聖堂の地下に張り巡らされた狭いトンネルを這い進み、次々と古代の墓を開いていった。壁画、モザイク、1世紀にまで遡るラテン語の碑文——キリスト教そのものよりも古い遺物だった。",
    },
    {
      text: "西へ掘り進むほど——つまり主祭壇の真下に近づくほど——墓は質素になり、貧しくなり、古くなった。チームはある事実に気づく。ここはかつてバチカンの丘で、身寄りのない者や処刑された者が葬られた場所だ。ガリラヤの小さな町から来て、十字架にかけられた一人の漁師が埋葬されるとしたら、まさにこういう場所だろう。",
    },
    {
      text: "教皇の祭壇のちょうど真下で、それは見つかった。西暦160年頃に造られた小さな石の祠だ。西暦200年頃、ローマの司祭ガイウスが「バチカンの丘で使徒ペトロの『記念碑』を見せることができる」と記した文献と、完全に一致した。祠のそばの漆喰壁には、初期キリスト教徒たちの祈りがびっしりと刻まれていた。そしてその中に、何世紀もの時を超えて胸を打つ一行があった。「Petros eni」——ペトロ、ここにあり。",
    },
    {
      text: "その壁の裏側、大理石で囲まれた小さな空間に、人骨が納められていた。金糸を織り込んだ紫の布で丁寧に包まれている。紫に金——王族か最高位の聖職者にのみ許された格式だ。鑑定の結果、がっしりとした体格の男性で、死亡時の年齢は60代から70代。使徒ペトロの人物像と、驚くほど一致していた。",
    },
    {
      text: "だが発見は論争も呼んだ。発掘責任者フェルーアは祠の真下の土中から別の骨を発見しており、そちらこそ本物だと主張した。一方、古代碑文の専門家グアルドゥッチは壁の裏の骨を支持し、バチカンの記録を徹底的に調べ上げた。かつての工事の際に、骨が安全な場所へ密かに移されたのだと。二人の学者は一歩も引かず、論争は数十年に及んだ。",
    },
    {
      text: "1968年、教皇パウロ6世は世界に向けてこう語った。「聖ペトロの遺骨は、我々が確信に足ると考える方法で同定されました」。注目すべきは「我々が確信に足ると考える」という慎重な言い回しだ。これは教義ではない。今日に至るまで、カトリック信者がこの骨をペトロのものと信じる義務はない。",
    },
    {
      text: "あの骨が本当に、イエスとともに歩いたガリラヤの漁師のものかどうか——永遠に証明できないかもしれない。しかし否定しようのない事実がある。1世紀の素朴な墓から、2世紀の石の祠へ、コンスタンティヌスの大聖堂へ、そして今のルネサンスの傑作へ。2000年にわたる祈りのすべてが、ローマの土のわずか数平方メートルを指し続けてきた。「灯台下暗し」という言葉があるが、これほど巨大な灯台の足元が、これほど長く暗かった例は、人類史にもそうないだろう。",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// KOREAN (ko) — 베드로는 거기 있었다
// ═══════════════════════════════════════════════════════════════════════════════
// Register: Modern Korean — popular history podcast / Naver longform style
// Proverb subverted: 등잔 밑이 어둡다 (it's darkest under the lamp)
//   → never in human history has such an enormous lamp hidden what lay
//     beneath it for this long.

const ko = {
  ...shared,
  lang: "ko",
  langStoryId: "ko#st-peters-tomb-discovery",

  title: "베드로는 거기 있었다",

  subtitle:
    "1939년, 세계 최대 성당 바닥 아래에서 열린 1,600년의 비밀",

  excerpt:
    "1939년, 성 베드로 대성당 지하에서 공사를 하던 인부들의 발밑이 꺼졌다. 캄캄한 어둠 속에 1,600년 동안 봉인되어 있던 세계가 드러났다.",

  moralOrLesson:
    "믿음과 고고학은 다른 길을 걸으면서도 같은 진실에 도달할 수 있다",

  characters: [
    "교황 비오 12세",
    "교황 바오로 6세",
    "마르게리타 과르두치",
    "안토니오 페루아",
    "콘스탄티누스 대제",
  ],

  era: "1939-1968",

  paragraphs: [
    {
      text: "1939년, 바티칸의 성 베드로 대성당에서 간단한 공사가 시작됐다. 세상을 떠난 교황을 위한 묘소를 넓히는 작업이었다. 그런데 인부들이 대리석 바닥을 파 들어가는 순간, 바닥이 통째로 꺼졌다. 캄캄한 어둠 속으로 떨어진 그들 앞에 펼쳐진 건 1,600년 동안 빛을 본 적 없는 세계였다. 이 대성당이 왜 하필 여기에 서 있는지, 그 이유 자체를 흔들 수 있는 비밀이 거기 잠들어 있었다.",
    },
    {
      text: "그들이 떨어진 곳은 로마 시대의 지하 묘지였다. 서기 320년경, 콘스탄티누스 대제가 이 묘지를 통째로 흙으로 덮어버리라고 명령했다. 로마 황제 중 처음으로 기독교를 받아들인 사람이었다. 귀족의 무덤이든 노예의 무덤이든 가리지 않았다. 이유는 하나, 이 땅 아래 그 누구보다 중요한 한 사람이 묻혀 있다고 믿었기 때문이다. 그래서 그 위에 교회를 세웠다.",
    },
    {
      text: "당시 교황 비오 12세는 제2차 세계대전의 소용돌이 속에서 가톨릭 교회를 이끈 인물이다. 그가 극비리에 발굴을 허가했다. 이후 10년 동안 소규모 고고학 팀이 대성당 지하 좁은 통로를 기어 다니며 고대 무덤을 하나씩 열어 나갔다. 벽화, 모자이크, 1세기까지 거슬러 올라가는 라틴어 비문. 기독교 자체보다 오래된 유물이었다.",
    },
    {
      text: "서쪽으로 파 들어갈수록—교황의 제단 바로 아래로 다가갈수록—무덤은 점점 단순해지고, 낡고, 오래됐다. 여기는 한때 바티칸 언덕에서 가난한 사람과 사형수를 묻던 구역이었다. 갈릴리의 작은 마을에서 온, 십자가에 못 박힌 어부가 묻힐 곳이 있다면 바로 이런 곳이었을 것이다.",
    },
    {
      text: "교황 제단 바로 아래에서 놀라운 것이 나왔다. 서기 160년경에 세워진 작은 석조 성소였다. 서기 200년경 로마 사제 가이우스가 \"바티칸 언덕에서 사도 베드로의 '기념비'를 보여줄 수 있다\"고 적은 기록과 정확히 일치했다. 성소 옆 회벽에는 초기 기독교인들이 새겨 넣은 기도문이 빼곡했다. 그중에 수백 년을 뚫고 나온 한 줄이 있었다. \"Petros eni.\" 베드로, 여기 있다.",
    },
    {
      text: "그 벽 뒤, 대리석으로 마감된 작은 공간에 유골이 있었다. 금실을 넣어 짠 자줏빛 천으로 정성스럽게 감싸져 있었다. 자줏빛에 금실—왕족이나 최고위 성직자에게만 허락된 격식이다. 감정 결과, 체격이 건장한 남성으로 사망 당시 60대에서 70대 사이. 사도 베드로의 모습과 놀라울 만큼 들어맞았다.",
    },
    {
      text: "그러나 발견은 곧 논쟁이 됐다. 발굴 책임자 페루아는 성소 바로 아래 흙에서 다른 뼈를 찾아냈고, 그게 진짜라고 주장했다. 반면 고대 비문 전문가 과르두치는 벽 뒤의 유골을 지지했다. 바티칸 기록을 샅샅이 뒤져, 이 뼈가 예전 공사 때 안전한 곳으로 옮겨진 것이라고 주장했다. 두 학자는 한 치도 물러서지 않았고, 논쟁은 수십 년간 이어졌다.",
    },
    {
      text: "1968년, 교황 바오로 6세가 세계를 향해 말했다. \"성 베드로의 유해가 우리가 납득할 만한 방식으로 확인되었습니다.\" 핵심은 '우리가 납득할 만한'이라는 표현이다. 교리로 선포한 게 아니었다. 지금까지도 어떤 가톨릭 신자도 이 뼈가 베드로의 것이라고 반드시 믿어야 할 의무는 없다.",
    },
    {
      text: "그 뼈가 정말 예수와 함께 걸었던 갈릴리의 어부인지, 영원히 증명할 수 없을지도 모른다. 하지만 부정할 수 없는 게 하나 있다. 1세기의 소박한 무덤에서 2세기의 석조 성소로, 콘스탄티누스의 대성당으로, 그리고 오늘날의 르네상스 걸작으로—2천 년의 경배가 모두 같은 몇 평방미터의 로마 땅을 가리켜 왔다. 등잔 밑이 어둡다고 했던가. 인류 역사상 이만큼 거대한 등잔이, 이만큼 오래 자기 발밑을 숨겨왔던 적은 없었을 것이다.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n⏳ Pushing ${label} ...`);

  // JSON round-trip validation
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Verify CJK characters survived encoding
  const titleAfter = parsed.title;
  if (titleAfter !== record.title) {
    throw new Error(`Title encoding mismatch for ${label}`);
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `⚠️  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`✅ ${label} overwritten successfully.`);
    } else {
      console.error(`❌ Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══ Pushing St. Peter's Tomb — zh / ja / ko ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  // Pre-push validation: character counts
  for (const rec of [zh, ja, ko]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      totalChars += p.text.length;
    }
    console.log(
      `\n📊 ${rec.lang}: ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
    console.log(`   Title: ${rec.title}`);
    console.log(`   Subtitle: ${rec.subtitle}`);
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);
  await pushStory(ko);

  console.log("\n═══ All three CJK versions pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err);
  process.exit(1);
});
