// Push Korean recreation of "The Temple of Ecstasy" to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════════════════════
// KOREAN (ko) — "황홀의 신전"
// Proverb subverted: 세 번 찍어 안 넘어가는 나무 없다
// (No tree survives three chops — but here, falling was the beginning)
// ═══════════════════════════════════════════════════════════════════════════════

const ko = {
  siteId: "baalbek",
  storyId: "temple-of-ecstasy",
  langStoryId: "ko#temple-of-ecstasy",
  lang: "ko",

  title: "황홀의 신전",

  subtitle:
    "지구에서 가장 잘 보존된 로마 신전, 그 안에서 입문자들은 죽었다 다시 태어났다—그리스의 바쿠스와 페니키아의 아도니스가 하나로 만난 곳",

  excerpt:
    "사람들은 그곳을 '행복의 궁전'이라 불렀다. 고대 세계에서 가장 화려한 문 너머, 입문자들은 의식 속에서 죽고 다시 태어났다.",

  icon: "\u{1F347}",
  storyCategory: "gods_monsters",
  tier: "S",
  isFree: true,
  isFeatured: false,
  hasAudio: false,
  readingTimeMinutes: 8,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.0069, lng: 36.2039 },
  source:
    "Macrobius, Saturnalia I.23; Euripides, The Bacchae; Ovid, Metamorphoses; Villa of the Mysteries, Pompeii (fresco cycle); Puchstein, Otto & Wiegand, Theodor. Baalbek: Ergebnisse der Ausgrabungen, 1921-1925; Halliburton, Richard. Complete Book of Marvels; Hajjar, Youssef. La triade d\u2019H\u00e9liopolis-Baalbek, 1977; Pococke, Richard. A Description of the East, 1745",
  updatedAt: now,

  characters: [
    "바쿠스/디오니소스 (죽었다 살아나는 신)",
    "아도니스 (피가 강을 붉게 물들인 페니키아의 젊은 신)",
    "마이나데스 (디오니소스의 광란의 여신도들)",
    "오토 푸흐슈타인 (독일 고고학자, 1898-1905)",
    "리처드 핼리버턴 (미국 탐험가 겸 작가)",
  ],

  era: "서기 150년경 (안토니누스 피우스 치세 건설); 페니키아 시대 (아도니스 숭배의 기원)",

  moralOrLesson:
    "모든 문명은 같은 것을 갈망했다—죽음과 삶 사이의 문, 자아를 잃었다가 다른 존재로 돌아오는 길. 바쿠스 신전의 폐허는 역사의 어느 한 순간, 레바논의 한 계곡에서 수천 명이 그 문을 찾았다고 믿었다는 증거로 서 있다.",

  paragraphs: [
    {
      text: "레바논에 파르테논보다 큰 로마 신전이 있다. 대부분 모른다. 바알베크의 바쿠스 신전—높이 31미터, 기둥 하나가 파르테논의 거의 두 배다. 서기 150년경에 세워졌고, 현존하는 로마 신전 중 보존 상태가 가장 좋다. 1930년대에 이곳을 찾은 탐험가 리처드 핼리버턴은 '행복의 궁전'이라 불렀다. 현지인들이 수백 년 동안 써온 이름이었다. 하지만 여기서 벌어진 일을 행복이라는 말로 담기엔, 그 깊이가 달랐다.",
    },
    {
      text: "입구를 보면 안다. 높이 13미터. 고대 건축 사상 가장 화려한 문이다. 표면 전체가 포도넝쿨과 머리를 풀어헤친 춤추는 여인들—디오니소스의 광란의 여신도, 마이나데스—로 빼곡히 새겨져 있다. 자세히 보면 넝쿨 사이사이에 양귀비꽃이 숨어 있다. 술, 곡물, 양귀비. 고대 비밀 의식의 세 가지 성물이 문에 새겨진 것이다. 일종의 선언이었다. 이 안에 들어서면 당신은 달라진다.",
    },
    {
      text: "바쿠스. 그리스 이름으로는 디오니소스. 술과 광기와 부활의 신이다. 이곳에서의 숭배는 기도가 아니라 입문이었다. 후보자는 열흘을 굶었다. 밤이 되면 보라색 옷을 입고 담쟁이 관을 쓴 채 안으로 들어갔다. 기둥이 양옆으로 늘어선 긴 복도 끝에 아디톤이 있었다. 입문자만 들어갈 수 있는 가장 깊은 성소. 그 아래에는 숨겨진 지하 공간이 있어, 사제들이 어둠 속에서 위의 신도들에게 신탁을 속삭였다.",
    },
    {
      text: "의식의 절정은 죽음이었다. 비유가 아니다. 입문자는 바쿠스 자신이 되었다. 신화 속 바쿠스는 갓난아기 때 티탄들에게 갈기갈기 찢기고 삼켜졌다가, 제우스가 되살린 신이다. 티탄 가면을 쓴 사제들이 무릎 꿇은 입문자를 에워쌌다. 폼페이에서 발견된 벽화에는 날개 달린 존재가 맨등을 채찍으로 내리치는 장면이 남아 있다. 벌이 아니었다. 옛 자아를 부수는 것. 부활 전에 반드시 오는 죽음이었다.",
    },
    {
      text: "그다음은 술이었다. 신의 피. 고대 포도주는 오늘날보다 약해서, 약초와 꿀, 아마 그 양귀비에서 뽑은 아편까지 섞었을 것이다. 마시면 자아가 녹았다. 세 번 찍어 안 넘어가는 나무 없다지만, 이 신전에서는 넘어지는 게 끝이 아니라 시작이었다. 금식, 채찍, 술—세 번의 도끼질에 옛 나는 무너졌고, 그 자리에서 부활이 왔다. 입문자는 큰 기쁨 속에 다시 태어났다. 그리스어로 이걸 엑스타시스라 불렀다. '자기 바깥에 서는 것.' 우리가 아는 그 단어, 엑스터시의 시작이 바로 여기다.",
    },
    {
      text: "하지만 이곳의 신은 순수한 그리스나 로마 것이 아니었다. 로마보다 훨씬 전, 페니키아인들은 이 땅에서 아도니스를 섬겼다. 죽었다 돌아오는 신. 가나안어로 '주님'이라는 뜻이다. 매년 봄, 근처 강이 산에서 쓸려 내려온 철 성분 때문에 붉게 물든다. 고대인들은 그것을 신의 피라 보았다. 로마가 오면서 바쿠스를 아도니스 위에 얹었다. 죽었다 살아나는 신 둘, 신전 하나. 이 계곡의 모든 문명이 같은 곳에 닿았다. 가장 깊은 비밀은 삶도 죽음도 아닌, 그 사이를 건너는 순간이라는 것.",
    },
    {
      text: "신전은 아직 서 있다. 포도넝쿨과 양귀비가 새겨진 문도, 입문자들이 무릎 꿇던 바닥 아래 지하 통로도 그대로다. 16세기 넘게 아무도 이곳에서 예배하지 않았지만, 신전은 자기를 차지한 모든 제국—로마, 비잔틴, 아랍, 오스만, 프랑스—보다 오래 버텼다. 돌은 제국 따위 신경 쓰지 않는다. 이 돌을 다듬은 손들은 두 세계 사이의 문을 만든다고 믿었다. 그리고 문이란, 아무도 지나지 않게 된 뒤에도, 한때 그 사이를 지나간 것의 형상을 간직하는 법이다.",
    },
  ],
};

async function push() {
  console.log(`Pushing ko#temple-of-ecstasy …`);
  await doc.send(
    new PutCommand({
      TableName: TABLE,
      Item: ko,
      ConditionExpression: "attribute_not_exists(siteId)",
    })
  );
  console.log("✅  ko#temple-of-ecstasy pushed successfully.");
}

push().catch((err) => {
  if (err.name === "ConditionalCheckFailedException") {
    console.log("⚠️  Record already exists. Overwriting…");
    doc
      .send(new PutCommand({ TableName: TABLE, Item: ko }))
      .then(() => console.log("✅  ko#temple-of-ecstasy overwritten successfully."))
      .catch((e) => {
        console.error("❌  Failed:", e);
        process.exit(1);
      });
  } else {
    console.error("❌  Failed:", err);
    process.exit(1);
  }
});
