#!/usr/bin/env python3
"""
Push Chinese, Japanese, and Korean versions of the Caryatids story to DynamoDB.
Each version is a native-born retelling, not a translation.
"""

import json
import os
import subprocess
import sys
import time

TIMESTAMP = str(int(time.time()))
TABLE = "Story"
REGION = "eu-north-1"

def make_paragraph(text):
    return {"M": {"text": {"S": text}}}

def build_item(lang_code, title, subtitle, excerpt, moral, paragraphs):
    return {
        "siteId": {"S": "acropolis-athens"},
        "langStoryId": {"S": f"{lang_code}#caryatids"},
        "lang": {"S": lang_code},
        "title": {"S": title},
        "subtitle": {"S": subtitle},
        "excerpt": {"S": excerpt},
        "moralOrLesson": {"S": moral},
        "paragraphs": {"L": [make_paragraph(p) for p in paragraphs]},
        "icon": {"S": "\U0001f469"},
        "tier": {"S": "A"},
        "source": {"S": "Vitruvius\u2019s De Architectura, Pausanias\u2019s Description of Greece, modern archaeological analysis"},
        "characters": {"L": [
            {"S": "The Six Caryatids"},
            {"S": "The women of Caryae"},
            {"S": "Alkamenes (possible sculptor)"}
        ]},
        "era": {"S": "421-406 BCE (Erechtheion construction)"},
        "readingTimeMinutes": {"N": "3"},
        "image": {"S": ""},
        "updatedAt": {"N": TIMESTAMP},
        "disabled": {"BOOL": False},
        "thumbnail": {"S": ""},
        "coordinates": {"M": {
            "lng": {"N": "23.7263"},
            "lat": {"N": "37.9722"}
        }},
        "hasAudio": {"BOOL": False},
        "isFree": {"BOOL": True},
        "storyCategory": {"S": "lost_found"},
        "storyId": {"S": "caryatids"}
    }

# ═══════════════════════════════════════════════════════════════
# CHINESE (zh) — Modern Mandarin, podcast/WeChat article register
# Proverb: 事不过三 (nothing goes beyond three / patience has limits)
# Subversion: These women endured far more than three calamities
# ═══════════════════════════════════════════════════════════════
zh_item = build_item(
    lang_code="zh",
    title="少女柱——用身体撑起天空的女人们",
    subtitle="卡里亚的女人，化为永恒之石",
    excerpt="雅典卫城上有六个女人，已经站了两千五百年。不是摆在展柜里的雕像——她们就是柱子本身。头顶扛着屋顶，身体撑起整座门廊。",
    moral="美可以把惩罚变成优雅。女像柱本该铭记耻辱，却成了力量与永恒之美的象征。",
    paragraphs=[
        "雅典卫城上有六个女人，已经站了两千五百年。不是摆在展柜里的雕像——她们就是柱子本身。头顶扛着屋顶，身体撑起整座门廊。她们是厄瑞克忒翁神庙的女像柱，人类建筑史上最著名的六根柱子。她们为什么在那里？这背后，是一个关于战争、背叛，和美如何从耻辱中诞生的故事。",

        "公元前480年，波斯大军入侵希腊。南部伯罗奔尼撒有个小城叫卡里亚，站错了队——投靠了波斯人。结果希腊赢了。其他城邦的报复很直接：男人杀掉，女人沦为奴隶。但光这样还不够。雅典的雕刻师把这些女人刻成了石柱，让她们永远举着屋顶，永远不能放下双手。至少，这是罗马建筑师维特鲁威在四百年后讲的版本。",

        "但还有另一个说法，几乎完全相反。有些学者认为，这些女像柱代表的是\u201c阿雷弗洛伊\u201d——从雅典最显赫的家族中选出的少女，在卫城上住满一年，专门侍奉雅典娜女神。她们的任务是为女神编织一件圣袍，在全城最盛大的节日上献出。再看看她们的站姿：挺拔、从容，一只脚微微向前，像在参加某种庄严的游行。那是虔诚，不是惩罚。",

        "不管哪个版本是真的，设计者做到了一件前无古人的事：用真人的形态替代了石柱，而且结构上完全成立。六个女人各有不同——头的倾斜角度、髋部的重心、衣褶的走向。但那厚重的编发辫不只是发型，它加固了脖颈最受力的部位。飘逸的长袍纹路模仿了普通石柱的凹槽。她们在做真正的承重工作，却看起来毫不费力。",

        "俗话说\u201c事不过三\u201d，可这六个女人经历的远不止三次劫难。今天，六个里有五个站在卫城博物馆里，躲避雅典的空气污染。第六个在1803年被英国外交官额尔金勋爵拆走，连同卫城大量石雕一起运回了英国。她至今孤零零地站在大英博物馆里——与姐妹们隔着两千五百公里和两百年的政治争论。厄瑞克忒翁神庙上如今立着复制品，而那个空缺的位置，大概是全世界最优雅的抗议。",

        "两千五百年。战争、帝国更迭、基督教传入、奥斯曼统治、现代污染——她们都扛过来了。她们本是为了铭记耻辱而生，但不知什么时候，意义翻转了。没有人去看她们是为了想起卡里亚的背叛。人们去，是因为六个石头女人竟然比大多数血肉之躯都更鲜活。女像柱证明了一件事：美不只是经受住了惩罚，它让所有人忘了惩罚才是最初的目的。"
    ]
)

# ═══════════════════════════════════════════════════════════════
# JAPANESE (ja) — NHK documentary / popular nonfiction register
# Proverb: 仏の顔も三度まで (even Buddha loses patience after three times)
# Subversion: These women never lost composure, not after three, not after thousands
# ═══════════════════════════════════════════════════════════════
ja_item = build_item(
    lang_code="ja",
    title="カリアティード——天を支え続けた六人の乙女",
    subtitle="カリュアイの女たちが石に変わった日",
    excerpt="アテネのアクロポリスに、六人の女性が二千五百年、立ち続けている。飾り棚に置かれた彫像ではない。彼女たち自身が柱なのだ。",
    moral="美は罰を恩寵に変えることができる。カリアティードは恥辱の記憶として刻まれたが、永遠の強さと気品の象徴になった。",
    paragraphs=[
        "アテネのアクロポリスに、六人の女性が二千五百年、立ち続けている。博物館のケースに収まった彫刻ではない——彼女たち自身が柱だ。頭で屋根を支え、体で建物を成り立たせている。エレクテイオン神殿のカリアティード。人類の建築史上、もっとも有名な柱だろう。なぜ彼女たちはそこに立っているのか。それは、戦争と裏切り、そして恥辱がいかにして美に変わるかという物語だ。",

        "紀元前四八〇年、ペルシアの大軍がギリシアに攻め込んだ。南部ペロポネソスにカリュアイという小さな町があった。この町は、ペルシア側についた。ギリシアが勝った後、報復は苛烈だった。男たちは殺され、女たちは奴隷にされた。しかしそれだけでは済まなかった。アテネの彫刻家たちは、その女たちを石の柱に刻んだ。永遠に屋根を掲げ続ける姿に。——少なくとも、ローマの建築家ウィトルウィウスが約四百年後にそう書き残している。",

        "だが、まったく逆の説もある。カリアティードはアレフォロイ——アテネの名門から選ばれた少女たちの姿だというのだ。彼女たちはアクロポリスで一年間暮らし、女神アテナに仕えた。聖なる衣を織り、アテネ最大の祭典に奉納する。あの立ち姿を見てほしい。背筋は伸び、片足がわずかに前へ出ている。まるで荘厳な行列を歩いているかのようだ。あれは罰ではない。祈りだ。",

        "どちらの説が正しくても、設計者は前例のないことを成し遂げた。無機質な石柱を人の姿に置き換え、しかも構造として完璧に機能させたのだ。六人はそれぞれ微妙に異なる——首の傾き、腰の重心、衣のひだ。だが太く編み込まれた髪はただの装飾ではない。荷重がかかる首を補強している。流れる衣の縦線は、通常の円柱に刻まれる溝そのものだ。本物の構造材でありながら、涼しい顔をしている。",

        "「仏の顔も三度まで」と言うが、この六人はどうだろう。戦争、帝国の興亡、宗教の交代、大気汚染——三度どころではない。現在、オリジナルの六体のうち五体はアクロポリス博物館に移されている。残る一体は一八〇三年、イギリスの外交官エルギン卿が持ち去った。彼女は今も大英博物館に一人で立っている。姉妹たちから二千五百キロ、二百年の政治論争を隔てて。神殿にはレプリカが置かれ、彼女がいた場所の空白は、世界でもっとも静かな抗議になっている。",

        "二千五百年。あらゆる時代の嵐をくぐり抜けて、彼女たちはまだ立っている。元々は裏切りの記憶として刻まれたはずだった。けれどいつの間にか、意味が反転した。カリュアイの恥辱を思い出すために訪れる人はいない。人々が足を運ぶのは、石でできた六人の女性が、生身の人間よりも生き生きとして見えるからだ。カリアティードが証明したのはこういうことだ——美は罰を耐え抜くだけでなく、罰こそが目的だったという事実さえ忘れさせてしまう。"
    ]
)

# ═══════════════════════════════════════════════════════════════
# KOREAN (ko) — Popular nonfiction / 인문학 article register
# Proverb: 세 번 찍어 안 넘어가는 나무 없다 (no tree stands after three strikes)
# Subversion: These women were struck thousands of times and still stand
# ═══════════════════════════════════════════════════════════════
ko_item = build_item(
    lang_code="ko",
    title="카리아티드 — 하늘을 떠받친 여섯 여인",
    subtitle="카리아이의 여인들, 돌이 되다",
    excerpt="아테네 아크로폴리스 위에 여섯 명의 여인이 서 있다. 이천오백 년째다. 박물관 유리 안에 모셔둔 조각상이 아니다——그녀들 자체가 기둥이다.",
    moral="아름다움은 벌을 품격으로 바꿀 수 있다. 카리아티드는 수치의 기념물로 새겨졌지만, 영원한 힘과 우아함의 상징이 되었다.",
    paragraphs=[
        "아테네 아크로폴리스 위에 여섯 명의 여인이 서 있다. 이천오백 년째다. 박물관 유리 안에 모셔둔 조각상이 아니다——그녀들 자체가 기둥이다. 머리로 지붕을 받치고, 몸으로 건물을 지탱한다. 에레크테이온 신전의 카리아티드. 인류 건축사에서 가장 유명한 기둥 여섯 개. 왜 그녀들이 거기 서 있는 걸까? 이건 전쟁과 배신, 그리고 수치가 어떻게 아름다움으로 바뀌는지에 대한 이야기다.",

        "기원전 480년, 페르시아 대군이 그리스를 침공했다. 남쪽 펠로폰네소스에 카리아이라는 작은 도시가 있었다. 이 도시가 편을 잘못 섰다. 페르시아 편에 붙은 것이다. 그리스가 이기자 보복은 가혹했다. 남자들은 죽고, 여자들은 노예가 됐다. 하지만 그걸로 끝이 아니었다. 아테네의 조각가들이 그 여인들을 돌기둥에 새겼다. 영원히 지붕을 떠받드는 모습으로. 적어도 로마 건축가 비트루비우스가 약 사백 년 뒤에 남긴 기록은 그렇다.",

        "그런데 정반대 이론도 있다. 카리아티드는 아레포로이——아테네 최고 명문가에서 뽑힌 소녀들의 모습이라는 것이다. 그녀들은 일 년간 아크로폴리스에 머물며 여신 아테나를 섬겼다. 성스러운 옷을 짜서 아테네 최대 축제에 바쳤다. 그 자세를 보라. 등은 곧고, 한 발이 살짝 앞으로 나와 있다. 장엄한 행렬을 걷는 듯한 모습이다. 저건 벌이 아니다. 헌신이다.",

        "어느 쪽이 맞든, 설계자는 누구도 해본 적 없는 일을 해냈다. 밋밋한 돌기둥을 사람의 형상으로 바꾸면서, 구조적으로도 완벽하게 작동시킨 것이다. 여섯 사람은 저마다 미묘하게 다르다——고개의 기울기, 골반의 무게중심, 옷 주름의 방향. 하지만 두툼하게 땋은 머리카락은 그냥 멋이 아니다. 하중이 집중되는 목 부분을 보강하고 있다. 흘러내리는 옷의 세로 주름은 보통 기둥에 파인 홈과 똑같은 역할을 한다. 진짜 구조재이면서, 아무렇지도 않은 얼굴을 하고 있다.",

        "\u201c세 번 찍어 안 넘어가는 나무 없다\u201d고 했다. 하지만 이 여섯 여인은 세 번이 아니라 수천 번을 맞고도 서 있다. 전쟁, 제국의 교체, 종교의 변화, 대기오염까지. 현재 원본 여섯 중 다섯은 아크로폴리스 박물관에 옮겨져 있다. 나머지 하나는 1803년 영국 외교관 엘긴 경이 가져갔다. 그녀는 지금도 대영박물관에 홀로 서 있다. 자매들과 이천오백 킬로미터, 이백 년의 정치 논쟁만큼 떨어진 채. 신전에는 복제본이 세워졌고, 그녀가 서 있던 빈자리는 아마 세상에서 가장 품위 있는 항의일 것이다.",

        "이천오백 년. 전쟁, 제국의 흥망, 종교의 교체, 오스만 지배, 현대의 매연——다 견뎠다. 원래는 배신의 기억으로 새겨졌을 것이다. 하지만 어느 순간 의미가 뒤집혔다. 카리아이의 수치를 떠올리려고 찾아가는 사람은 아무도 없다. 사람들이 가는 이유는, 돌로 만든 여섯 여인이 살아 있는 사람보다 더 생생해 보이기 때문이다. 카리아티드가 증명한 건 이것이다——아름다움은 벌을 견디는 데 그치지 않는다. 벌이 목적이었다는 사실마저 잊게 만든다."
    ]
)

# ═══════════════════════════════════════════════════════════════
# VALIDATION & PUSH
# ═══════════════════════════════════════════════════════════════
stories = [
    ("zh", zh_item),
    ("ja", ja_item),
    ("ko", ko_item),
]

# Validate JSON first
for lang, item in stories:
    try:
        json_str = json.dumps(item, ensure_ascii=False)
        # Re-parse to verify
        json.loads(json_str)
        print(f"[{lang}] JSON valid ({len(json_str)} bytes)")
    except Exception as e:
        print(f"[{lang}] JSON INVALID: {e}")
        sys.exit(1)

# Count characters per language
for lang, item in stories:
    total_chars = sum(len(p["M"]["text"]["S"]) for p in item["paragraphs"]["L"])
    print(f"[{lang}] Total paragraph characters: {total_chars}")

# Push each item
for lang, item in stories:
    json_str = json.dumps(item, ensure_ascii=False)

    # Write to temp file to avoid shell escaping issues with CJK
    tmp_file = f"/tmp/caryatids_{lang}.json"
    with open(tmp_file, "w", encoding="utf-8") as f:
        f.write(json_str)

    cmd = [
        "aws", "dynamodb", "put-item",
        "--table-name", TABLE,
        "--region", REGION,
        "--item", f"file://{tmp_file}",
        "--return-consumed-capacity", "TOTAL"
    ]

    print(f"\n[{lang}] Pushing to DynamoDB...")
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        env={**os.environ, "AWS_REGION": REGION},
    )

    if result.returncode == 0:
        print(f"[{lang}] SUCCESS")
        if result.stdout.strip():
            print(f"    {result.stdout.strip()}")
    else:
        print(f"[{lang}] FAILED (exit code {result.returncode})")
        print(f"    stderr: {result.stderr}")
        sys.exit(1)

# Verify all three exist
print("\n" + "=" * 60)
print("VERIFICATION: Scanning for all caryatids stories...")
verify_cmd = [
    "aws", "dynamodb", "scan",
    "--table-name", TABLE,
    "--region", REGION,
    "--filter-expression", "storyId = :sid",
    "--expression-attribute-values", '{ ":sid": {"S": "caryatids"} }',
    "--projection-expression", "langStoryId, lang, title",
    "--output", "json"
]

result = subprocess.run(
    verify_cmd,
    capture_output=True,
    text=True,
    env={**os.environ, "AWS_REGION": REGION},
)

if result.returncode == 0:
    data = json.loads(result.stdout)
    print(f"Found {data['Count']} caryatids records:")
    for item in data["Items"]:
        lang = item["lang"]["S"]
        title = item["title"]["S"]
        lsid = item["langStoryId"]["S"]
        print(f"  [{lang}] {lsid} -> {title}")
else:
    print(f"Verification scan failed: {result.stderr}")

print("\nDone.")
