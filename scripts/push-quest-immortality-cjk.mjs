// Push Chinese (zh), Japanese (ja), Korean (ko) recreations of
// "The Emperor's Quest for Immortality" (quest-for-immortality)
// to the Story table.

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
  siteId: "terracotta-army",
  storyId: "quest-for-immortality",
  icon: "\u2697\uFE0F", // ⚗️
  storyCategory: "crowns_conquests",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.3841, lng: 109.2785 },
  source: `Sima Qian, "Records of the Grand Historian" (Shiji), ~100 BC; Ban Gu, "Book of Han"`,
  characters: [
    "Qin Shi Huang \u2014 First Emperor of China",
    "Xu Fu \u2014 the alchemist who sailed east",
    "Li Si \u2014 the chief minister who concealed the death",
    "Zhao Gao \u2014 the eunuch conspirator",
  ],
  era: "246-210 BC \u2014 Qin Dynasty",
  updatedAt: now,
};

// ═════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — Modern Mandarin · Simplified · WeChat/podcast register
//
// This is CHINESE history — every reader knows the basics. The challenge is
// making the familiar feel fresh. Register: like you're telling this to a
// friend over hotpot who somehow never heard the whole story.
//
// Proverb: 阎王叫你三更死，谁敢留你到五更
// (If the King of Hell calls you at midnight, who dares keep you till dawn)
// Subversion: Qin Shi Huang's answer — "I dare." But midnight came early.
// ═════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#quest-for-immortality",

  title: `万岁还不够`,

  subtitle: `他征服了天下，但征服不了一件事\u2014\u2014自己的死亡`,

  excerpt: `公元前221年，一个人干了所有人都没干成的事\u2014\u2014把六个国家捏成一个。他修了长城，统一了文字。但这些全不够。因为他怕死，怕到疯狂。`,

  moralOrLesson: `想征服死亡的人，往往最先被死亡征服。真正的不朽不在丹药里，而在你给这个世界留下的痕迹里。`,

  paragraphs: [
    {
      text: `嬴政做到了在他之前没人做到的事。到公元前221年，他灭了六国，把一盘散沙捏成了一个国家\u2014\u2014秦。他修了长城，统一了文字、货币，甚至车轮的宽度都给你定死。这个人基本上是\u201c中国\u201d的发明者。全天下管他叫万岁\u2014\u2014可万岁还不够。他想要的不是一万年，是永远。因为嬴政有一个怎么都打不赢的敌人：死亡。`,
    },
    {
      text: `于是他开始找解药。身边的方士告诉他，水银\u2014\u2014那种奇怪的会流动的液态金属\u2014\u2014藏着长生不老的秘密。皇帝开始每天吞水银丸，坚信自己离永生越来越近。据说到后来，他连\u201c死\u201d这个字都不准人在他面前提。但水银正从五脏六腑里一点一点地把他拆掉。他以为能救命的东西，正在一口一口地要他的命。`,
    },
    {
      text: `最疯狂的一次是一场远洋行动。公元前219年，他命令方士徐福率六十艘船、三千童男童女出海东行，去找传说中的仙岛\u2014\u2014岛上据说住着神仙，树上长着不死的果子。这是古代世界规模最大的远征之一。船队驶进茫茫大海，再也没有回头。`,
    },
    {
      text: `徐福没回来。不死药没有，船队没有，三千人一个都没回。传说他到了日本，在那儿扎了根，成了日本人的祖先之一。到今天，日本沿海好几个地方都说自己是徐福登陆的地方，纪念他的神社至今还立着。他被派去找永生\u2014\u2014讽刺的是，他的故事倒真成了永生的。`,
    },
    {
      text: `公元前210年，秦始皇在巡游途中死了\u2014\u2014到死都还在找灵丹妙药。接下来的事离谱到像编的。丞相李斯和赵高决定把皇帝的死瞒住，一瞒就是好几个月。尸体在马车里腐烂发臭，他们就在周围堆满了一车车咸鱼来压味儿。全天下最有权势的人，最后是被死鱼的腥味一路护送回家的。`,
    },
    {
      text: `但秦始皇有后手。活着做不成神仙，那就死后继续做皇帝。他的陵墓是一整个缩小版帝国：水银做的河流模拟中国的大江大河，铜和宝石镶嵌的穹顶再现了夜空，八千个真人大小的兵马俑永远替他站岗。他甚至在墓里装了弩弓机关\u2014\u2014谁闯进来就射谁。`,
    },
    {
      text: `最让人脊背发凉的是这个事实：毒死他的水银\u2014\u2014就是他喝了大半辈子以为能成仙的那个东西\u2014\u2014现在正流淌在他陵墓的地下河里。杀他的东西，成了他来世的核心。阎王叫你三更死，谁敢留你到五更\u2014\u2014嬴政的回答是：我敢。他灭六国，修长城，造八千兵马俑守门。但五更没到，三更就来了。他没找到永生。可他造了地球上最壮观的坟墓，两千多年过去了，我们还在聊他的事。`,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — Modern Japanese · NHK documentary / popular nonfiction
//
// Unique angle: Xu Fu is part of JAPANESE mythology. Towns along the coast
// claim him as an ancestor. This story speaks directly to Japanese readers
// through their own landscape.
//
// Proverb: 仏の顔も三度まで
// (Even Buddha's patience lasts only three times)
// Subversion: The First Emperor challenged heaven again and again. Heaven
// didn't even wait for the third time.
// ═════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#quest-for-immortality",

  title: `永遠という毒`,

  subtitle: `天下を統一しながら、死だけは征服できなかった男`,

  excerpt: `紀元前221年、一人の男が誰にもできなかったことをやってのけた\u2014\u2014六つの王国を一つの帝国に変えた。だがそれでも足りなかった。彼にはどうしても勝てない敵が一つだけあった。死である。`,

  moralOrLesson: `死を征服しようとする者は、しばしばその到来を早める。真の不朽は霊薬の中にではなく、この世界に刻んだ痕跡の中にある。`,

  paragraphs: [
    {
      text: `嬴政は、それまで誰にもできなかったことをやってのけた。紀元前221年、六つの王国を滅ぼし、ばらばらだった土地を一つの帝国に縫い合わせた\u2014\u2014秦。万里の長城を築き、文字を統一し、貨幣を統一し、車輪の幅まで揃えた。\u300c中国\u300dという国をこの世に生み出した男だ。だが、それでも足りなかった。嬴政にはどうしても勝てない敵が一つだけあった\u2014\u2014死である。`,
    },
    {
      text: `そこで彼は不死の薬を求めた。宮廷の方士たちは、水銀\u2014\u2014あの不思議な液体の金属\u2014\u2014に永遠の命の鍵があると告げた。皇帝は毎日水銀の丸薬を飲み始めた。不死に近づいていると信じて疑わなかった。だが現実は正反対だった。水銀は臓腑を少しずつ蝕んでいた。彼を救うはずのものが、一服ごとに彼を殺していたのだ。`,
    },
    {
      text: `最も壮大だったのは、海を越える大遠征だ。紀元前219年、徐福という方士に命じて六十隻の船と三千人の若い男女を東の海へ送り出した。目的地は伝説の仙人島\u2014\u2014不老不死の霊薬が木に実るという場所だった。古代世界でも最大級の船団が、そのまま未知の海へ消えていった。`,
    },
    {
      text: `徐福は二度と戻らなかった。霊薬も、船も、三千人も。中国の伝説では、彼は日本にたどり着き、そこに根を下ろしたとされる。実際、今も日本の沿岸各地に徐福の上陸地を名乗る町があり、彼を祀る神社が残っている。不死を探しに出た男の物語が二千年以上にわたって語り継がれている\u2014\u2014それ自体が、一つの永遠だ。`,
    },
    {
      text: `紀元前210年、始皇帝は各地を巡る旅の途中で死んだ。まだ奇跡の薬を探している最中だった。そして次に起きたことは、まるで作り話のようだ。丞相の李斯と側近の趙高は、皇帝の死を数ヶ月にわたって隠し通すことを決めた。腐敗する遺体の臭いを消すため、馬車の周囲に大量の塩漬けの魚を積ませた。天下の覇者は、魚の腐臭に紛れて都へ帰った。`,
    },
    {
      text: `ただし、始皇帝には備えがあった。生きて永遠を手にできないなら、死後も皇帝であり続ければいい。彼の陵墓は帝国の縮小版だった。水銀で造った川が中国の大河を模して流れ、銅と宝石を散りばめた天井が夜空を映し出す。八千体の等身大の兵馬俑が永遠の護衛として立ち並び、侵入者を射殺するための弩の罠まで仕掛けられていた。`,
    },
    {
      text: `最も背筋が凍るのは、この事実だ。彼を殺した水銀\u2014\u2014永遠の命を信じて何年も飲み続けたあの物質\u2014\u2014が、今もそのまま陵墓の地下を流れる河となっている。彼を殺したものが、死後の世界の中心を飾っている。仏の顔も三度までと言うが、始皇帝は天に何度も挑んだ。水銀を飲み、船団を送り出し、地下に帝国を造った。天は三度目すら待たなかった。彼は不死を手に入れられなかった。だが、地上で最も壮大な墓を造り上げた。二千年後の今も、私たちは彼の話をしている。`,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// KOREAN (ko) — Modern Korean · Narrative podcast register
//
// Proverb: 사람이 죽으면 이름을 남기고 호랑이가 죽으면 가죽을 남긴다
// (When a man dies he leaves his name; when a tiger dies it leaves its skin)
// Subversion: Qin Shi Huang didn't WANT to leave a name. He wanted to never
// die at all. But 2,000 years later, his name is still here.
// ═════════════════════════════════════════════════════════════════════════════

const ko = {
  ...shared,
  lang: "ko",
  langStoryId: "ko#quest-for-immortality",

  title: `황제는 죽기 싫었다`,

  subtitle: `천하를 정복하고도 정복할 수 없었던 단 하나\u2014\u2014자기 자신의 죽음`,

  excerpt: `기원전 221년, 한 남자가 아무도 못 한 일을 해냈다\u2014\u2014여섯 나라를 하나로 만들었다. 하지만 그것만으로는 안 됐다. 그에게는 이길 수 없는 적이 하나 있었다. 죽음이다.`,

  moralOrLesson: `죽음을 이기려 한 자는 오히려 죽음을 앞당긴다. 진정한 불멸은 약 속에 있지 않다. 이 세상에 남긴 흔적 속에 있다.`,

  paragraphs: [
    {
      text: `진시황 영정은 그 누구도 해내지 못한 일을 해냈다. 기원전 221년까지 여섯 나라를 전부 밟아뭉개고 하나로 꿰매 제국을 세웠다. 만리장성을 쌓고, 문자를 통일하고, 화폐를 통일하고, 수레바퀴 폭까지 맞췄다. 사실상 \u2018중국\u2019이라는 나라를 만든 사람이다. 하지만 그것만으로는 안 됐다. 진시황에게는 아무리 해도 이길 수 없는 적이 하나 있었다. 죽음이다.`,
    },
    {
      text: `그래서 해법을 찾기 시작했다. 궁정의 도사들이 말했다\u2014\u2014수은, 그 이상한 액체 금속 안에 영생의 비밀이 있다고. 황제는 매일 수은 알약을 삼키기 시작했다. 불사의 몸에 가까워지고 있다고 굳게 믿으면서. 현실은 반대였다. 수은이 안에서부터 장기를 하나씩 갉아먹고 있었다. 그를 살려줄 거라 믿었던 바로 그것이, 한 알 한 알 그를 죽이고 있었다.`,
    },
    {
      text: `가장 황당한 시도는 대규모 해상 원정이었다. 기원전 219년, 서복이라는 도사에게 배 예순 척과 젊은 남녀 삼천 명을 줘서 동쪽 바다로 보냈다. 목적지는 전설 속 신선들의 섬\u2014\u2014나무에 불로초가 열린다는 곳이었다. 고대 세계에서도 손꼽히는 규모의 선단이 미지의 바다로 사라졌다.`,
    },
    {
      text: `서복은 돌아오지 않았다. 불로초도, 선단도, 삼천 명도. 중국 전설에 따르면 그는 일본에 닿아 그곳에 뿌리를 내렸고, 일본인의 조상 가운데 한 사람이 되었다고 한다. 지금도 일본 해안 곳곳에 서복의 상륙지를 자처하는 마을이 있고, 그를 모신 신사가 서 있다. 영생을 찾으러 떠난 사람의 이야기가 2천 년 넘게 살아남았다. 그것 자체가, 일종의 영생이다.`,
    },
    {
      text: `기원전 210년, 진시황은 전국을 돌아다니던 중에 죽었다. 아직도 기적의 약을 찾고 있을 때였다. 그 다음 벌어진 일은 거의 소설 수준이다. 승상 이사와 환관 조고가 황제의 죽음을 몇 달째 숨기기로 했다. 마차 안에서 썩어가는 시신 냄새를 감추려고 주변에 절인 생선을 산더미처럼 실었다. 천하의 주인은 생선 비린내에 파묻혀 수도로 돌아왔다.`,
    },
    {
      text: `하지만 진시황에게는 대비책이 있었다. 살아서 영생을 못 얻으면, 죽어서라도 황제를 계속하면 된다. 그의 무덤은 제국의 축소판이었다. 수은으로 만든 강이 중국의 큰 강줄기를 본떠 흘렀고, 구리와 보석을 박은 천장이 밤하늘을 재현했다. 실물 크기의 병마용 팔천 구가 영원히 보초를 섰고, 침입자를 향해 쏘는 석궁 함정까지 갖추고 있었다.`,
    },
    {
      text: `소름 돋는 건 이 대목이다. 그를 죽인 수은\u2014\u2014영생을 믿고 몇 년이나 삼킨 그 물질\u2014\u2014이 지금 그의 무덤 지하를 흐르는 강이 되어 있다. 그를 죽인 것이 그의 사후 세계 한가운데를 차지하고 있는 것이다. 사람이 죽으면 이름을 남기고 호랑이가 죽으면 가죽을 남긴다고 했다. 진시황은 이름 따위를 남기고 싶지 않았다. 아예 죽지 않으려 했다. 하지만 2천 년이 지난 지금, 그의 이름은 여전히 여기 있다. 영생을 찾지는 못했지만, 지구에서 가장 장엄한 무덤을 남겼고, 우리는 아직도 그 이야기를 하고 있다.`,
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────────────

const stories = [
  { label: "Chinese (zh)", data: zh },
  { label: "Japanese (ja)", data: ja },
  { label: "Korean (ko)", data: ko },
];

for (const { label, data } of stories) {
  try {
    // Validate: every paragraph must have text
    for (let i = 0; i < data.paragraphs.length; i++) {
      if (!data.paragraphs[i].text || data.paragraphs[i].text.trim() === "") {
        throw new Error(`Paragraph ${i + 1} has empty text`);
      }
    }

    await doc.send(new PutCommand({ TableName: TABLE, Item: data }));
    console.log(`\u2705 ${label} pushed successfully (${data.langStoryId})`);
  } catch (err) {
    console.error(`\u274c ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log("\nAll three CJK stories pushed to Story table.");
