import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "babylon" },
  langStoryId: { S: "ko#madness-of-the-king" },
  lang: { S: "ko" },
  storyId: { S: "madness-of-the-king" },
  storyCategory: { S: "crowns_conquests" },

  title: { S: "풀을 뜯던 왕" },
  subtitle: {
    S: "지상 최강의 왕이 일곱 해를 짐승으로 살았다 — 사해 두루마리는 그게 진짜 누구의 이야기인지 묻는다",
  },
  excerpt: {
    S: "예루살렘을 불태우고 바빌론을 세계의 경이로 다시 세운 왕. 제국의 모든 벽돌에 이름을 새긴 남자. 어느 저녁 궁전 옥상에서 자기가 만든 도시를 내려다보다가, 정신을 잃었다. 일곱 해 동안 바빌론의 지배자는 들판에서 짐승처럼 살았다.",
  },

  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "네부카드네자르 2세는 바빌론을 통치한 게 아니다. 처음부터 다시 지었다. 전차가 나란히 달리는 이중 성벽, 푸른 유약이 빛나는 이슈타르 문, 유프라테스강 위의 다리. 궁전, 신전, 운하. 그리고 벽돌마다 이름을 새겼다. 수십만 개에. 지금도 대영박물관에서 그 벽돌을 볼 수 있다. 2,600년 된 글자 — \"바빌론의 왕, 네부카드네자르.\" 도시를 짓고 있던 게 아니었다. 자기 이름을 시간 속에 박으려 했다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그러다 꿈을 꾸었다. 하늘에 닿는 거대한 나무. 모든 새와 짐승이 그 그늘에 쉬었다. 그때 하늘에서 목소리가 울렸다. 베어라. 밑동만 남기고 쇠와 놋으로 묶어라. 마음을 짐승의 것으로 바꿔라. 바빌론 궁정에서 일하던 유대인 포로 다니엘이 해석을 맡았다. 이 꿈이 다른 사람의 것이길 바랐다. 아니었다. 그 나무가 왕 자신이었고, 판결은 이미 내려진 뒤였다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "다니엘은 간청했다. 행실을 바꾸고 가난한 자에게 자비를 베풀면, 하늘이 봐줄지 모른다고. 열두 달이 흘렀다. 아무 일도 없었다. 그러다 어느 저녁, 왕은 궁전 옥상에 서서 — 지금도 그 폐허가 남아 있는 바로 그 궁전이다 — 자기가 만든 도시를 내려다보며 말했다. \"내가 큰 능력으로 세운 이 위대한 바빌론이 아니냐.\" 그 말이 입술을 떠나기도 전에, 하늘에서 소리가 내려왔다. 나라가 네게서 떠났다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "세 번 찍어 안 넘어가는 나무 없다지만, 하늘은 단 한 번이면 됐다. 왕은 네 발로 엎드렸다. 소처럼 풀을 뜯었다. 머리카락은 새 깃털처럼 엉키고, 손톱은 발톱처럼 구부러졌다. 일곱 해 동안 세상에서 가장 강한 남자가 들판의 짐승으로 살았다. 불가능해 보이지만 현대 정신의학에도 같은 증상이 기록돼 있다. 성경은 그 칠 년간 누가 제국을 다스렸는지 한마디도 안 했다. 그 침묵이 더 무섭다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "여기서 이야기가 꼬인다. 1952년, 사해 근처 동굴에서 두루마리 조각이 나왔다. 거의 같은 이야기였다 — 바빌론 왕이 칠 년간 미치고 유대인 현자가 낫게 한다는. 그런데 이름이 달랐다. 나보니두스, 수십 년 뒤의 왕. 그리고 실제로 나보니두스는 바빌론을 버리고 아라비아 사막에서 십 년을 보냈다. 이유는 아무도 모른다. 많은 학자들은 이 광기가 원래 그의 이야기였다가 더 유명한 왕에게 옮겨 붙었다고 본다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "일곱 해 뒤, 왕이 하늘을 올려다보았다. 정신이 돌아왔다. 하늘의 신을 찬양하고, 왕좌에 복귀했으며, 권력은 전보다 더 커졌다고 한다. 해피엔딩 같다. 아니다. 기원전 562년에 죽었다. 아들은 2년 만에 궁정 쿠데타로 살해당했다. 대왕이 죽은 지 23년 만에 바빌론 자체가 페르시아의 키루스에게 무너졌다. 벽돌마다 이름을 새긴 남자는, 시간에는 새기지 못했다.",
          },
        },
      },
      {
        M: {
          text: {
            S: "그런데 반전이 있다. 제국은 무너졌다. 왕조도, 도시도 사라졌다. 하지만 벽돌은 남았다. 수십만 개가. 대영박물관이든 베를린 페르가몬 박물관이든, 직접 가서 손에 들고 읽을 수 있다. 2,600년 전 네부카드네자르가 젖은 흙에 눌러 찍은 이름을. 모든 걸 가지려 했던 남자가 결국 남긴 건 왕국도 왕조도 아니었다. 벽돌 한 장. 그리고 이상하게도, 그걸로 충분했다.",
          },
        },
      },
    ],
  },

  moralOrLesson: {
    S: "숲에서 가장 높은 나무가 도끼에 가장 먼저 보인다. 네부카드네자르의 광기는 무언가를 세운 벌이 아니었다. 그것이 자기 혼자의 힘이라 믿은 벌이었다. 바빌론의 모든 벽돌은 강둑의 흙을 사람의 손으로 빚고 사람의 불에 구운 것이었는데, 그 전부에 이름을 찍은 왕은 흙이 왕조보다 오래되었고 왕조보다 오래 남으리라는 걸 잊었다. 교만의 약은 굴욕이 아니라 깨달음이다 — 가장 위대한 건축가도 결국은 흙에서 온 하나의 존재에 지나지 않는다는 것.",
  },

  characters: {
    L: [
      { S: "네부카드네자르 2세 — 바빌론의 왕, 고대 세계 최고의 건축가" },
      { S: "다니엘 — 거대한 나무의 꿈을 해석한 유대인 예언자" },
      {
        S: "나보니두스 — 이 이야기의 실제 주인공일 수 있는 후대의 왕",
      },
      { S: "아멜마르두크 — 네부카드네자르의 아들이자 후계자" },
    ],
  },

  // Metadata fields — kept from English
  icon: { S: "👁️" },
  tier: { S: "A" },
  era: {
    S: "기원전 약 570–562년 (네부카드네자르의 말년); 4Q242 사해 두루마리 단편이 나보니두스 전승의 연대를 보여줌",
  },
  source: {
    S: "Daniel 4 (biblical account of Nebuchadnezzar's madness); 4Q242 Prayer of Nabonidus (Dead Sea Scrolls, Cave 4, Qumran); The Verse Account of Nabonidus (BM 38299, British Museum); 2 Kings 25:27-30 (Evil-Merodach releases Jehoiachin); Wiseman, D.J. Nebuchadrezzar and Babylon, Oxford University Press, 1985; Collins, John J. Daniel: A Commentary on the Book of Daniel, Hermeneia Series, Fortress Press, 1993; Beaulieu, Paul-Alain. The Reign of Nabonidus, King of Babylon 556-539 B.C., Yale University Press, 1989; Henze, Matthias. The Madness of King Nebuchadnezzar, Brill, 1999",
  },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "44.4209" },
      lat: { N: "32.5363" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  updatedAt: { N: "1772154151" },
};

async function push() {
  try {
    // Validate JSON structure
    const textFields = [
      item.title.S,
      item.subtitle.S,
      item.excerpt.S,
      item.moralOrLesson.S,
    ];
    for (const field of textFields) {
      if (!field || field.length === 0) {
        throw new Error("Empty text field detected");
      }
    }
    for (const para of item.paragraphs.L) {
      if (!para.M.text.S || para.M.text.S.length === 0) {
        throw new Error("Empty paragraph detected");
      }
    }

    // Count total paragraph characters
    const totalChars = item.paragraphs.L.reduce(
      (sum, p) => sum + p.M.text.S.length,
      0
    );
    console.log(`Total paragraph characters: ${totalChars}`);
    console.log(`Paragraph count: ${item.paragraphs.L.length}`);

    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });

    const result = await client.send(cmd);
    console.log("SUCCESS — Korean story pushed to DynamoDB");
    console.log(`  siteId: ${item.siteId.S}`);
    console.log(`  langStoryId: ${item.langStoryId.S}`);
    console.log(`  title: ${item.title.S}`);
    console.log(`  HTTP status: ${result.$metadata.httpStatusCode}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("RECORD ALREADY EXISTS — aborting to avoid overwrite");
    } else {
      console.error("PUSH FAILED:", err.message);
    }
    process.exit(1);
  }
}

push();
