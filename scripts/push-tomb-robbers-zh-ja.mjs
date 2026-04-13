// Push Chinese (zh) and Japanese (ja) recreations of
// "The Tomb Robbers' Trials" to the Story DynamoDB table.

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
  siteId: "valley-of-the-kings",
  storyId: "tomb-robbers-trials",
  icon: "\u{1F4DC}",
  storyCategory: "ghosts_curses",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 25.7402, lng: 32.6014 },
  source:
    "Peet, T. Eric. The Great Tomb Robberies of the Twentieth Egyptian Dynasty. Oxford, 1930; Papyrus Abbott, British Museum",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 饥寒起盗心 (hunger and cold breed thoughts of theft) — subverted:
// even the tomb guardians themselves became the grave robbers.
// Register: Modern Mandarin, WeChat long-read / popular podcast. Punchy,
// conversational, vivid. Direct address to reader.
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#tomb-robbers-trials",

  title: `帝王谷大盗案`,

  subtitle: `\u201c我们照常去盗墓\u201d\u2014\u2014写在莎草纸上的供词`,

  excerpt: `公元前1110年左右，埃及。法老们在帝王谷埋了好几百年的死人了，每座墓穴都塞满了黄金。但到拉美西斯九世登基时，帝国穷得叮当响。偏偏最穷的村子旁边，就堆着普通人一辈子都见不到的黄金。你说，能不出事吗？`,

  moralOrLesson: `再神圣的宝藏，也挡不住饿疯了的人。而守护者和窃贼之间那条线，从来都比我们愿意相信的要薄得多。`,

  characters: [
    `阿蒙普努费尔（盗墓者）`,
    `帕塞尔（东底比斯市长）`,
    `帕维拉（西底比斯市长）`,
    `拉美西斯九世（法老）`,
  ],

  era: `新王国末期（约公元前1110年）`,

  paragraphs: [
    {
      text: `公元前1110年左右，埃及。法老们在帝王谷埋了好几百年的死人了\u2014\u2014每座地下墓穴都塞满了黄金、珠宝，还有各种神王在来世可能用得上的东西。但到拉美西斯九世登基的时候，帝国穷得叮当响。庄稼歉收，工人几个月没领到工钱。偏偏底比斯最穷的村子旁边，就堆着普通人这辈子都见不到的黄金。你说，能不出事吗？`,
    },
    {
      text: `事情的导火索，是两个互相看不顺眼的市长。东底比斯\u2014\u2014活人住的地界\u2014\u2014的市长帕塞尔，直接把西岸管着王陵的市长帕维拉给告了：你放任盗贼洗劫皇家墓穴，搞不好自己也分了一杯羹吧？这可不是一般的官场扯皮。在古埃及，法老的陵墓神圣到什么地步？盗掘皇家墓葬不叫偷东西\u2014\u2014那叫冒犯宇宙秩序。`,
    },
    {
      text: `朝廷派人下去查。结果触目惊心：一座接一座的墓被撬开，棺材砸得稀烂，木乃伊身上扒得精光\u2014\u2014戒指、护身符、金片，一件不剩。那些本该永世长存的陪葬品，转天就出现在了集市上。调查深入到工匠村之后，越查越离谱。石匠、祭司、守卫，甚至那些专职保护陵墓的官员\u2014\u2014全都有份。`,
    },
    {
      text: `接下来的审判，留下了人类历史上最炸裂的庭审记录。有人痛快招了，也有人是被打出来的\u2014\u2014审讯方式简单粗暴：拿棍子抽你脚底板，抽到你开口为止。最出名的那份供词，来自一个叫阿蒙普努费尔的石匠。他描述自己闯入法老索贝克姆萨夫二世墓穴的全过程，语气平静得像在说昨天中午吃了什么。`,
    },
    {
      text: `他的原话，写在莎草纸上，保存了三千多年：\u201c我们照常前去盗墓。我们发现神躺在墓室深处。我们取走了木乃伊身上的黄金，连同护身符和珠宝。然后我们放火烧了棺材。\u201d\u2014\u2014照常。就好像每天上班打个卡而已。偷来的黄金平分成八份。这可不是什么饿急了铤而走险，这是古代版的有组织犯罪。`,
    },
    {
      text: `俗话说\u201c饥寒起盗心\u201d，可谁能想到，连守墓的人自己都成了盗墓贼。主犯几乎可以肯定被处死了，但盗墓这事从来没停过。经济在崩，西底比斯的工人快饿死了\u2014\u2014皇家黄金是他们活下去的唯一指望。到最后，守护皇家亡灵的祭司们彻底放弃了保卫陵墓。他们换了个思路：偷偷把木乃伊搬出来，藏到了两个极其隐蔽的地方\u2014\u2014隐蔽到将近三千年后才被人发现。`,
    },
    {
      text: `十九世纪，这两处藏尸点终于重见天日。埃及最传奇的那些法老\u2014\u2014拉美西斯大帝、塞提一世、图特摩斯三世\u2014\u2014全被塞在简陋的棺材里，挤在一起。陪葬品早就没了，但遗体完好无损。祭司们用最寒酸的方式保住了他们\u2014\u2014把神王藏起来，藏得连自己人都找不到。`,
    },
    {
      text: `三千年前，一个石匠看着地球上最神圣的陵墓，耸了耸肩：那些黄金搁死人身上也是浪费。盗墓纸草卷证明了一件事\u2014\u2014再神圣的宝藏，也挡不住饿疯了的人。而守护者和窃贼之间那条线，从来都比我们愿意相信的要薄得多。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 衣食足りて礼節を知る (when you have enough to eat and wear, you
// learn propriety) — subverted: when food runs out, even the sacred loses
// all meaning.
// Register: NHK documentary / popular nonfiction. Clean, precise, restrained
// emotion that lets facts carry the drama.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#tomb-robbers-trials",

  title: `盗掘者たちの裁き`,

  subtitle: `「いつものように墓を荒らしに行った」——パピルスに残された告白`,

  excerpt: `紀元前1110年頃、エジプト。ファラオたちは何百年もの間、王家の谷に黄金を詰め込んだ墓を築いてきた。だがラメセス9世の時代、帝国の財政は破綻していた。最も貧しい村のすぐ隣に、目もくらむ黄金が眠っている。何が起きたかは、想像に難くない。`,

  moralOrLesson: `どれほど神聖な財宝も、飢えた人間の前では無力である。そして守る側と盗む側の境界線は、私たちが信じたいよりもずっと薄い。`,

  characters: [
    `アメンプヌフェル（墓泥棒）`,
    `パセル（東テーベ市長）`,
    `パウェラ（西テーベ市長）`,
    `ラメセス9世（ファラオ）`,
  ],

  era: `新王国時代末期（紀元前1110年頃）`,

  paragraphs: [
    {
      text: `紀元前1110年頃、エジプト。ファラオたちは何百年にもわたって、王家の谷に死者を葬ってきた。地下の墓には黄金や宝石が積み上げられ、神にして王である者が来世で必要とするすべてが揃えられていた。だがラメセス9世が王位に就いた頃、帝国はもう限界だった。不作が続き、労働者たちは何ヶ月も賃金をもらっていない。そしてテーベで最も貧しい村のすぐ隣に、一般人が一生かかっても目にできないほどの黄金が眠っている。何が起きたかは、説明するまでもないだろう。`,
    },
    {
      text: `事件の発端は、犬猿の仲だった二人の市長だった。東テーベ——生きている人間の街——の市長パセルが、王家の墓を管轄する西岸の市長パウェラを告発した。墓泥棒を黙認している、それどころか上前をはねているのではないか、と。これは単なる政治抗争ではない。古代エジプトにおいて、ファラオの墓は現代人の想像を絶するほど神聖だった。王の墓を荒らすのは窃盗ではなく、宇宙の秩序そのものへの冒涜だった。`,
    },
    {
      text: `政府は役人を送り、墓を調べさせた。結果は惨憺たるものだった。墓という墓が暴かれていた。棺は叩き壊され、ミイラは布を剥がれ、指輪もお守りも黄金も一切合切持ち去られていた。永遠に残るはずだった副葬品が、地元の市場で売りさばかれていたのだ。捜査が職人の村に及ぶと、掘るほどに事態は深刻さを増した。石工、神官、警備兵、そして墓を守ることが仕事の役人たちまで——全員、手を染めていた。`,
    },
    {
      text: `その後の裁判は、人類史上最も衝撃的な法廷記録を残すことになる。自ら口を開いた者もいた。だが多くは拷問で白状させられた——足の裏を棒で何度も打ちつけ、話すまでやめない。最も有名な自白をしたのは、アメンプヌフェルという名の石工だった。ファラオ・ソベクエムサフ2世の墓に押し入った顛末を、まるで朝食の献立でも話すかのように淡々と語った。`,
    },
    {
      text: `彼の言葉は、パピルスに記されて3000年以上の時を超えた。「いつものように墓を荒らしに行った。奥の埋葬室に神が横たわっていた。ミイラから黄金を集め、お守りや宝石も回収した。棺には火をつけた」——いつものように。まるでいつもの出勤と変わらない口ぶりだ。盗んだ黄金は八等分された。追い詰められた末の犯行ではない。これは古代の組織犯罪だった。`,
    },
    {
      text: `「衣食足りて礼節を知る」と昔から言う。だがこの事件はその裏側を証明した——衣食が足りなければ、神聖さすら意味を失うのだと。首謀者たちはほぼ確実に処刑された。しかし盗掘は止まらなかった。経済は崩壊し、西テーベの飢えた労働者にとって、王家の黄金こそが唯一の命綱だった。ついに王家の遺体を守る神官たちは、墓の防衛を諦めた。代わりに密かにミイラを運び出し、二つの場所に隠した——あまりにも巧みに隠したため、約3000年間、誰の目にも触れなかった。`,
    },
    {
      text: `1800年代、ついにその隠し場所が見つかった。エジプト史上最も偉大なファラオたち——ラメセス大王、セティ1世、トトメス3世——が、飾りもない粗末な棺に詰め込まれた状態で発見された。副葬品はすべて消えていたが、遺体は無傷だった。神官たちはファラオを自国の民から隠すことで、完全な消滅から救ったのだ。`,
    },
    {
      text: `3000年前、一人の石工は地上で最も神聖な墓を眺めて、こう思った——あの黄金、死人には何の役にも立たない。盗掘パピルスが伝えているのはシンプルな真実だ。どれほど神聖な財宝も、飢えた人間の前では無力である。そして守る側と盗む側の境界線は、私たちが信じたいよりも、ずっと薄い。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23F3 Pushing ${label} ...`);

  // JSON round-trip validation
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Verify no paragraph has empty text
  for (let i = 0; i < record.paragraphs.length; i++) {
    if (!record.paragraphs[i].text || record.paragraphs[i].text.trim() === "") {
      throw new Error(`Empty paragraph text at index ${i} for ${label}`);
    }
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully (new record).`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `\u26A0\uFE0F  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`\u2705 ${label} overwritten successfully.`);
    } else {
      console.error(`\u274C Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══ Pushing Tomb Robbers' Trials zh/ja recreations to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      totalChars += p.text.length;
    }
    console.log(
      `\n\uD83D\uDCCA ${rec.lang} "${rec.title}": ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
    if (totalChars < 800 || totalChars > 2000) {
      console.warn(
        `\u26A0\uFE0F  ${rec.lang} total chars (${totalChars}) outside target range [800-2000]`
      );
    }
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);

  console.log("\n═══ Both zh/ja recreations pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
