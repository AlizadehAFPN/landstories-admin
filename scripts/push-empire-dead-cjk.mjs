import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const updatedAt = Math.floor(Date.now() / 1000);

const base = {
  siteId: "catacombs-of-paris",
  storyId: "empire-of-the-dead",
  icon: "💀",
  storyCategory: "ghosts_curses",
  era: "Late 18th century (1786-1788)",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lat: 48.8338, lng: 2.3324 },
  source: "Archives de Paris; Inspection Générale des Carrières records",
  disabled: false,
  updatedAt,
};

// ═══════════════════════════════════════════════════════════════════
// CHINESE (zh) — Simplified Mandarin
// Proverb: 入土为安 (entering earth brings peace) — subverted
// Register: WeChat article / popular Chinese podcast
// ═══════════════════════════════════════════════════════════════════

const zh = {
  ...base,
  lang: "zh",
  langStoryId: "zh#empire-of-the-dead",
  title: `亡者帝国：六百万副白骨，被拼成了艺术`,
  subtitle: `当巴黎再也埋不下自己的死者，它在地下为他们建了一座宫殿`,
  excerpt: `你想象一下1780年代的巴黎。不是浪漫的灯火之城——而是一座快被死人撑爆的城市。一千多年来，巴黎人一直把遗体往那几座老墓地里塞，其中最大的那座就在市中心正当中。`,
  characters: [
    `巴黎市政工程师`,
    `夜间搬运工人`,
    `六百万无名巴黎人`,
    `采石场总监`,
  ],
  moralOrLesson: `死亡面前人人平等——生前建立的所有等级和身份，化为白骨之后毫无意义。`,
  paragraphs: [
    { text: `你想象一下1780年代的巴黎。不是浪漫的灯火之城——而是一座快被死人撑爆的城市。一千多年来，巴黎人一直把遗体往那几座老墓地里塞，其中最大的那座就在市中心正当中。坟叠着坟，最深的地方堆了十层。直到1780年，隔壁一栋楼的地下室墙扛不住了，哗啦一声塌了——一堆正在腐烂的遗骸直接灌进人家的地窖。整座城市，正在从里往外烂掉。` },
    { text: `1786年，市政府做了个疯狂的决定：把巴黎所有大型墓地全部挖开，把骨头统统搬到地下。说来也巧，巴黎脚下正好有三百多公里的废弃隧道——从中世纪就开始开采的石灰岩矿道。巴黎圣母院、卢浮宫，那些漂亮的石头建筑，全是从脚下挖出来的。现在，这些空荡荡的地道即将迎来六百万位新住户。` },
    { text: `搬运工作全在夜里进行。天主教会坚持——这是神圣的事，不能见天日。每天一入夜，盖着布的马车载满骨头，在火把光里缓缓穿过街道。神父跟在旁边，一路念着安魂祷词。想想住在那条路上的人是什么感受——石板路上木轮碾过的吱呀声，低沉的诵经声，心知肚明车上拉的是什么。夜复一夜，年复一年。六百万人，一车一车地运。` },
    { text: `故事到这里才真正离奇。工人们没有把骨头随便往隧道里一倒——他们开始把遗骨摆成艺术品。大腿骨被整整齐齐地码成墙壁，一排排从地面砌到天花板。头骨均匀嵌入其中，拼出十字架、爱心和几何图案。骨头变成了建筑材料。而在入口处，有人刻下了那句给这个地方命名的话：\u201C止步。这里是亡者的帝国。\u201D` },
    { text: `最让人心头一紧的是：没人分拣过这些骨头。国王的大腿骨挨着乞丐的，修女的头骨靠着囚犯的。巴黎经历了大革命、瘟疫、几百年的战争，所有这些人——权倾一时的也好，默默无闻的也罢——最后全进了同一面墙，彻底匿名。都说入土为安，可这六百万人入了土之后，等来的不是安息——是被整整齐齐码成了墙。六百万条命，一个名字都没留下。死亡面前，你的简历一文不值。` },
    { text: `今天你能走过大约一公里半的地下骨宫——只是巴黎地下隧道的很小一部分。通道又窄又潮，从地板到天花板全是人骨。这些人曾经走过你刚走过的那条街。他们当中有面包师、有士兵、有母亲、有罪犯、有神父。现在全变成了同一种苍白色，排成了说不上是恐怖还是美的图案——只是让你一句话都说不出来。` },
    { text: `巴黎地下墓穴其实不是墓地。它是一座纪念碑，纪念人类唯一的共同点。你可以建帝国、写杰作、花一辈子让全世界记住你的名字——你的骨头最后还是会跟一个陌生人的挤在一面墙里。这要么是巴黎最令人不安的事实，要么是最诚实的。` },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// JAPANESE (ja) — Modern Japanese
// Proverb: 仏の顔も三度 (even Buddha's patience runs out after 3)
//   — subverted with double meaning of 仏 (Buddha / the deceased)
// Register: NHK documentary / popular nonfiction
// ═══════════════════════════════════════════════════════════════════

const ja = {
  ...base,
  lang: "ja",
  langStoryId: "ja#empire-of-the-dead",
  title: `死者の帝国——六百万の骨が芸術になった`,
  subtitle: `パリが死者を埋めきれなくなったとき、地下に宮殿が築かれた`,
  excerpt: `1780年代のパリを想像してほしい。華の都でも、恋人たちの街でもない。死者に押しつぶされそうな街だ。千年以上もの間、パリの人々は同じ墓地に遺体を埋め続け、最大の墓地は街の真ん中にあった。`,
  characters: [
    `パリ市の技術者たち`,
    `夜間の作業員たち`,
    `六百万人の無名のパリ市民`,
    `採石場監督官`,
  ],
  moralOrLesson: `死は究極の平等だ——生前に築いた社会的序列は、骨になれば何の意味もない。`,
  paragraphs: [
    { text: `1780年代のパリを想像してほしい。華の都でも、恋人たちの街でもない。死者に押しつぶされそうな街だ。千年以上もの間、パリの人々は同じ墓地に遺体を埋め続けてきた。中でも最大の墓地は、街の真ん中にあった。墓は十層にも重なっていた。そして1780年、ついに限界が来る。隣の建物の地下室の壁が崩落し、腐敗した遺体が雪崩のように誰かの地下室に流れ込んだ。街そのものが、内側から腐りかけていた。` },
    { text: `1786年、当局はとんでもない決断を下す。パリの主要な墓地をすべて掘り起こし、骨を地下に移すというのだ。都合のいいことに、パリの地下には300キロを超える廃坑道が広がっていた。中世以来、石灰岩を切り出してきた採石場の跡だ。ノートルダム大聖堂もルーヴル宮殿も——あの壮麗な石造りの建物はすべて、この地下の岩から生まれた。そして今、空っぽの坑道が六百万人の新たな住人を迎えることになる。` },
    { text: `作業はすべて夜に行われた。カトリック教会がそう求めたのだ——これは神聖な仕事であり、人目にさらすものではない、と。毎晩、布で覆われた荷車が骨を満載し、松明の明かりの中を街路を進んでいく。その横を神父が歩き、死者への祈りを唱え続けた。その通り沿いに暮らす人々のことを想像してみてほしい。石畳の上を軋む車輪の音。低く響く祈りの声。荷台に何が積まれているか、わかっている重さ。夜また夜、年また年。六百万人を、一台の荷車ずつ運んだのだ。` },
    { text: `物語はここから予想もしない方向に進む。作業員たちは骨をただ坑道に放り込んだわけではなかった——並べ始めたのだ。芸術として。大腿骨は整然と積み上げられ、床から天井まで隙間のない壁になった。頭蓋骨は等間隔に配置され、十字架やハート、幾何学模様を描いた。骨が、建築になった。そして入口には、こう刻まれた——「止まれ。ここは死者たちの帝国である」。` },
    { text: `一番胸に突き刺さるのは、誰も骨を仕分けなかったということだ。王の大腿骨が物乞いの隣にある。修道女の頭蓋骨が犯罪者の横に並ぶ。「仏の顔も三度」と言う。だがここでは、仏も罪人も同じ白い壁の一部だ。パリは革命も疫病も何世紀もの戦争も生き延びた。そのすべての人々が——権力者も無名の者も——同じ壁に収まり、完全に匿名になった。六百万の人生。名前は一つも残っていない。` },
    { text: `今日、この地下の骨の宮殿のうち、約1.5キロを歩くことができる——パリの地下に広がるトンネル網のほんの一部だ。通路は狭く、湿り気を帯び、床から天井まで人骨で埋め尽くされている。パン屋、兵士、母親、犯罪者、司祭——かつて、あなたがここに来るために歩いたのと同じ通りを歩いた人々だ。今はみな同じ白に変わり、美しくも不穏な模様の一部になっている。` },
    { text: `パリのカタコンブは墓地ではない。人間なら誰もが共有する、たった一つのことを刻んだ場所だ。帝国を築こうが、傑作を書こうが、一生をかけて名を残そうが——あなたの骨は結局、見知らぬ誰かの隣に並ぶ。それがパリで最も怖い真実か、最も正直な真実か。答えは、あなた次第だ。` },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// KOREAN (ko) — Modern Korean
// Proverb: 세 번 찍어 안 넘어가는 나무 없다
//   (No tree stands after three strikes) — subverted
// Register: Modern Korean narrative / popular nonfiction
// ═══════════════════════════════════════════════════════════════════

const ko = {
  ...base,
  lang: "ko",
  langStoryId: "ko#empire-of-the-dead",
  title: `망자의 제국 — 600만 명의 뼈가 예술이 되다`,
  subtitle: `파리가 더 이상 죽은 자를 묻을 곳이 없어졌을 때, 지하에 궁전을 지었다`,
  excerpt: `1780년대 파리를 떠올려 보자. \u2018빛의 도시\u2019, 연인들의 도시 — 그런 파리가 아니다. 죽은 사람들 때문에 숨이 막혀가던 도시였다.`,
  characters: [
    `파리 시 기술자들`,
    `야간 작업자들`,
    `600만 명의 무명 파리 시민`,
    `채석장 감독관`,
  ],
  moralOrLesson: `죽음은 궁극의 평등이다 — 살아서 쌓아올린 모든 서열과 지위는, 뼈가 되면 아무 의미가 없다.`,
  paragraphs: [
    { text: `1780년대 파리를 떠올려 보자. \u2018빛의 도시\u2019, 연인들의 도시 — 그런 파리가 아니다. 죽은 사람들 때문에 숨이 막혀가던 도시였다. 천 년이 넘도록 파리 사람들은 같은 묘지에 시신을 묻어왔다. 가장 큰 묘지는 도심 한복판에 있었는데, 무덤이 열 겹으로 쌓여 있을 정도였다. 1780년, 옆 건물의 지하실 벽이 무너졌다. 썩어가는 유골이 눈사태처럼 누군가의 지하실로 쏟아졌다. 도시가 안에서부터 무너지고 있었다.` },
    { text: `세 번 찍어 안 넘어가는 나무 없다지만, 파리는 천 년을 버텼다 — 죽은 자의 무게로 지반이 무너질 때까지. 1786년, 시 당국은 마침내 극단적인 결정을 내린다. 파리의 모든 주요 묘지를 파헤쳐서 뼈를 전부 지하로 옮기기로 한 것이다. 마침 파리 지하에는 300킬로미터가 넘는 폐광이 있었다. 중세부터 석회암을 캐내던 채석장 터였다. 노트르담 대성당, 루브르 궁전 — 파리의 석조 건물들은 전부 이 지하의 돌로 지은 것이었다. 이제 텅 빈 그 터널에 600만 명의 새 입주자가 들어올 차례였다.` },
    { text: `작업은 오직 밤에만 이루어졌다. 가톨릭교회의 요구였다 — 이건 신성한 일이니 대낮에 할 수 없다고 했다. 매일 밤, 천으로 덮인 수레가 뼈를 가득 싣고 횃불 아래 거리를 지나갔다. 옆에서는 신부가 죽은 이들을 위한 기도를 읊었다. 그 길가에 살던 사람들을 상상해 보라. 돌길 위로 나무 바퀴가 삐걱대는 소리, 낮은 기도 소리, 수레 위에 실린 게 뭔지 다 아는 무게감. 밤이면 밤마다, 해가 바뀌고 또 바뀌어도. 600만 명을, 수레 한 대씩.` },
    { text: `이야기는 여기서 기이한 방향으로 흘러간다. 작업자들은 뼈를 그냥 터널에 쏟아붓지 않았다. 배열하기 시작한 것이다 — 예술 작품처럼. 넓적다리뼈는 정교하게 쌓여 바닥에서 천장까지 빈틈없는 벽이 됐다. 두개골은 일정한 간격으로 배치돼 십자가, 하트, 기하학적 문양을 이루었다. 뼈가 건축 재료가 된 것이다. 그리고 입구에는 이 장소에 이름을 준 문구가 새겨졌다. \u201C멈춰라. 여기는 망자의 제국이다.\u201D` },
    { text: `가장 섬뜩한 건 이거다 — 아무도 뼈를 분류하지 않았다는 것. 왕의 넓적다리뼈 옆에 거지의 뼈가 놓여 있다. 수녀의 두개골이 범죄자의 것과 나란하다. 파리는 혁명도, 전염병도, 수백 년의 전쟁도 견뎌냈고, 그 모든 사람들은 — 권력자든 이름 없는 자든 — 결국 같은 벽 속에 들어갔다. 완전한 무명으로. 600만 개의 인생에서 살아남은 이름은 단 하나도 없다. 죽음 앞에서는 이력서 따위 아무 쓸모가 없다.` },
    { text: `오늘날, 이 지하 뼈의 궁전 중 약 1.5킬로미터를 걸어볼 수 있다 — 파리 지하 터널 전체에 비하면 극히 일부다. 통로는 좁고 축축하며, 바닥부터 천장까지 사람의 뼈로 빼곡하다. 빵집 주인, 군인, 엄마, 범죄자, 신부 — 그들은 당신이 여기 오려고 방금 걸었던 바로 그 거리를 걸었던 사람들이다. 지금은 모두 같은 하얀색이 되어, 아름다우면서도 불편한 무늬의 일부가 되어 있다.` },
    { text: `파리 카타콤은 사실 묘지가 아니다. 인간이라면 누구나 공유하는 단 하나의 사실을 기리는 곳이다. 제국을 세우든, 걸작을 남기든, 평생을 바쳐 세상에 이름을 새기든 — 당신의 뼈는 결국 낯선 사람의 뼈 옆에 놓인다. 이것이 파리에서 가장 무서운 진실인지, 가장 솔직한 진실인지는 당신이 정하면 된다.` },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════

async function pushStory(record, label) {
  console.log(`\n━━━ Pushing ${label} (${record.langStoryId}) ...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log(`✅ ${label} pushed successfully!`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`⚠️  ${label} already exists. Overwriting...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`✅ ${label} overwritten successfully!`);
      return true;
    }
    console.error(`❌ ${label} FAILED:`, err.message);
    return false;
  }
}

async function main() {
  console.log("=== Empire of the Dead — CJK Push ===");
  console.log(`Timestamp: ${updatedAt}`);
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${base.siteId}\n`);

  // Validate paragraph counts and char lengths
  for (const [label, rec] of [["zh", zh], ["ja", ja], ["ko", ko]]) {
    const totalChars = rec.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
    console.log(`${label}: ${rec.paragraphs.length} paragraphs, ~${totalChars} chars`);
  }

  // Push sequentially — confirm each before moving on
  const zhOk = await pushStory(zh, "Chinese (zh)");
  const jaOk = await pushStory(ja, "Japanese (ja)");
  const koOk = await pushStory(ko, "Korean (ko)");

  console.log("\n=== Summary ===");
  console.log(`Chinese:  ${zhOk ? "✅" : "❌"}`);
  console.log(`Japanese: ${jaOk ? "✅" : "❌"}`);
  console.log(`Korean:   ${koOk ? "✅" : "❌"}`);

  if (zhOk && jaOk && koOk) {
    console.log("\n🎉 All three languages pushed successfully!");
  }
}

main().catch(console.error);
