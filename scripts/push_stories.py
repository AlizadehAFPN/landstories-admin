#!/usr/bin/env python3
"""
Push zh/ja/ko versions of 'The Betrayal of Ephialtes' to DynamoDB Story table.
"""

import boto3
import sys
import time

# AWS config
session = boto3.Session(region_name="eu-north-1")
dynamodb = session.resource("dynamodb")
table = dynamodb.Table("Story")

TIMESTAMP = int(time.time())

# ─── Shared fields (unchanged from English) ───
BASE = {
    "siteId": "thermopylae",
    "storyId": "ephialtes-betrayal",
    "icon": "🐍",
    "tier": "A",
    "source": "Herodotus's Histories (Book 7, chapters 213-218), Plutarch's Moralia",
    "era": "480 BCE",
    "readingTimeMinutes": 2,
    "image": "",
    "thumbnail": "",
    "coordinates": {"lng": "22.5367", "lat": "38.7967"},
    "hasAudio": False,
    "isFree": True,
    "disabled": False,
    "storyCategory": "ghosts_curses",
    "updatedAt": TIMESTAMP,
}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CHINESE (zh) — Modern Mandarin, popular-history podcast voice
# Proverb: 事不过三 (things don't go past three / three strikes)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

zh_item = {
    **BASE,
    "lang": "zh",
    "langStoryId": "zh#ephialtes-betrayal",
    "title": "出卖温泉关的人",
    "subtitle": "一个叛徒，一条暗道，三百勇士的结局",
    "excerpt": "温泉关之战——人类史上最悲壮的死守——不是输在战场上的。三百名斯巴达人挡住了整个波斯帝国，两天没让对方前进一步。真正击垮他们的，是一个认路的本地人。",
    "moralOrLesson": "背叛是战场上最致命的武器——比任何军队都可怕。一个人的出卖，毁掉了三百名斯巴达勇士用生命换来的一切。",
    "characters": [
        "厄菲阿尔特斯",
        "薛西斯",
        "波斯不死军",
        "佛基斯守军",
        "斯巴达国王列奥尼达",
    ],
    "paragraphs": [
        {
            "text": "公元前480年的夏末，有一条海边的隘口，叫温泉关。一边是山崖，一边是大海，中间窄得只够几个人并排站。对于防守方来说，这个地形堪称完美——不管你带了多少兵，冲到面前的永远只有几个。波斯国王薛西斯带着号称百万的大军，浩浩荡荡杀到了隘口。但在这条窄路面前，百万大军和一万，没有任何区别。"
        },
        {
            "text": '斯巴达国王列奥尼达率领三百名斯巴达精兵和几千希腊盟军，在隘口死守了整整两天。波斯人潮水般涌上来，又潮水般被打回去。薛西斯祭出了自己最后的底牌——\u201c不死军\u201d，一万名永远满编的王牌战士，阵亡一个立刻补一个，因此得名。但即便是这支部队，冲上去也被打了回来。'
        },
        {
            "text": "俗话说事不过三，薛西斯的耐心见了底。就在这时，一个叫厄菲阿尔特斯的本地人悄悄摸进了波斯大营。他没什么了不起的身份，就是个对这片山了如指掌的当地人。他带来的东西比任何武器都致命：群山深处藏着一条暗道，走到头，就是希腊人的后方。他要的也很简单——黄金，越多越好。"
        },
        {
            "text": "薛西斯连犹豫都没有。当天深夜，一万名不死军跟着这个带路人钻进了漆黑的山道。列奥尼达倒不是没考虑过这一层——他提前在暗道上安排了佛基斯地区的一千名士兵把守。可黎明时分不死军突然从树林里杀出来的时候，这一千人直接崩了。他们慌忙逃上山顶自保，暗道就这么大敞四开。"
        },
        {
            "text": "天亮了。列奥尼达看清了局面——波斯人随时会出现在身后，首尾夹击之下全军必死。于是他做了那个让两千五百年后我们还在讲这个故事的决定：命令大部分希腊军队撤退保命，自己带着三百名斯巴达人和约七百名来自忒斯庇亚城的志愿兵留了下来。任务很简单，也根本不可能完成——死守隘口，为撤退争取时间。"
        },
        {
            "text": "他们守住了。长矛断了换短剑，短剑飞了用拳头，最后一个不剩，全部战死。但他们的命没有白送。撤走的希腊大军安全脱险，重整旗鼓，在接下来的一年里接连击败波斯。三百人的死，换来了一个文明的存续。"
        },
        {
            "text": "厄菲阿尔特斯呢？全希腊悬赏通缉，赏金高到他后半辈子都在亡命天涯。他逃到了北方的色萨利，可整个希腊世界都在找他。据历史学家希罗多德记载，他最后死于一场毫不相干的私人恩怨。但斯巴达人听说之后，照样赏了那个杀他的人。正义就是正义——哪怕拐了个弯才到。"
        },
        {
            "text": '两千五百年了。\u201c厄菲阿尔特斯\u201d在现代希腊语中的意思，是\u201c噩梦\u201d。三百名斯巴达战士变成了永恒的传说，而出卖他们的人，变成了一个让人从梦中惊醒的词。事不过三——可惜对叛徒来说，只需要一次就够了。'
        },
    ],
}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# JAPANESE (ja) — NHK-documentary / compelling popular-nonfiction voice
# Proverb: 仏の顔も三度まで (Even Buddha loses patience after three times)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ja_item = {
    **BASE,
    "lang": "ja",
    "langStoryId": "ja#ephialtes-betrayal",
    "title": "エフィアルテスの裏切り",
    "subtitle": "ペルシアの黄金でギリシアを売った男",
    "excerpt": "テルモピュライの戦い——歴史上もっとも壮絶な最後の抵抗——は、戦場で敗れたのではない。三百人のスパルタ兵がペルシア帝国全軍を食い止めた。その守りを破ったのは、山道を知る一人の男だった。",
    "moralOrLesson": "裏切りは、いかなる軍隊よりも恐ろしい武器だ。たった一人の密告が、三百人のスパルタ兵の勇気を無にした。",
    "characters": [
        "エフィアルテス",
        "クセルクセス",
        "ペルシア不死隊",
        "ポキスの守備兵",
        "スパルタ王レオニダス",
    ],
    "paragraphs": [
        {
            "text": "テルモピュライの戦いについて、ひとつはっきりさせておきたいことがある。歴史上もっとも有名な「最後の抵抗」と呼ばれるこの戦い——戦場で負けたのではない。三百人のスパルタ兵と数千のギリシア連合軍が、ペルシア帝国の大軍を狭い海沿いの隘路で食い止めた。二日間、ペルシア軍は一歩も前に進めなかった。この防衛線を崩したのは、より強い軍隊ではない。山道を知っていた、たった一人の男だ。"
        },
        {
            "text": "紀元前四八〇年の夏の終わり。ペルシア王クセルクセスは、古代の歴史家が「通り過ぎるだけで川を飲み干す」と記したほどの大軍を率いてギリシアに侵攻した。だがテルモピュライの隘路では、兵力の差は意味をなさなかった。崖と海に挟まれた細い道は、一度に数人しか戦えない。そしてその最前線に立っていたのは、古代世界最強の兵士たち——スパルタの精鋭だった。"
        },
        {
            "text": "二日間の戦闘で、ペルシア軍は波のように押し寄せ、波のように打ち返された。クセルクセスは最後の切り札を投入する。「不死隊」——戦死者が出れば即座に補充され、常に一万の兵力を保つ精鋭中の精鋭だ。だが、彼らですらこの隘路は突破できなかった。"
        },
        {
            "text": "仏の顔も三度までという。クセルクセスの忍耐はとうに限界を超えていた。そこに現れたのが、エフィアルテスという地元の男だった。軍人でも策士でもない。ただ、この山を隅々まで知っている人間だった。彼が売り込んだのは、山中に隠された間道——抜ければギリシア軍の背後に出られる秘密の道だ。対価はペルシアの黄金。大量の黄金。"
        },
        {
            "text": "クセルクセスは即決した。その夜、一万の不死隊がエフィアルテスに導かれ、暗闇の山道に入った。スパルタ王レオニダスも無策ではなかった——間道にはポキス地方の兵士千人を配置していた。だが夜明けに不死隊が森から姿を現すと、彼らは恐慌に陥り、山頂へ逃げた。道は、がら空きになった。"
        },
        {
            "text": "朝が来て、レオニダスはすべてを悟った。背後からペルシア軍が迫っている。挟撃されれば全滅は避けられない。そこで彼は、この戦いを二千五百年語り継がれる伝説に変えた決断を下す——ギリシア軍の大半を南へ撤退させ、自らは三百人のスパルタ兵と約七百人のテスピアイの義勇兵とともに残った。使命はただひとつ。味方が逃げ切るまで、この隘路を守り抜くこと。"
        },
        {
            "text": "彼らは守り抜いた。槍が折れれば剣で、剣を失えば素手で戦い、一人残らず死んだ。だがその犠牲は実を結んだ——撤退したギリシア軍は無事に生き延び、態勢を立て直し、翌年にかけてペルシアを打ち破っていく。三百人の命が、ギリシアという文明を救った。"
        },
        {
            "text": "エフィアルテスにはギリシア全土から莫大な懸賞金がかけられた。北のテッサリアに逃げたが、ギリシア世界から逃げ切ることはできなかった。歴史家ヘロドトスによれば、最後はまったく無関係な私怨で殺されたという。それでもスパルタは殺した者に褒賞を与えた。正義は正義だ——たとえ偶然の姿で届いたとしても。"
        },
        {
            "text": "二千五百年が過ぎた今も、「エフィアルテス」は現代ギリシア語で「悪夢」を意味する。三百人の戦士は不滅の存在になった。彼らを裏切った男は、人を夜中に叫ばせる一語になった。仏の顔も三度というが——裏切りには、たった一度で十分だ。"
        },
    ],
}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# KOREAN (ko) — Popular Korean history podcast / nonfiction voice
# Proverb: 세 번 찍어 안 넘어가는 나무 없다
#          (No tree stands after being struck three times)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ko_item = {
    **BASE,
    "lang": "ko",
    "langStoryId": "ko#ephialtes-betrayal",
    "title": "에피알테스의 배신",
    "subtitle": "페르시아 황금에 그리스를 팔아넘긴 남자",
    "excerpt": "테르모필레 전투 — 인류 역사상 가장 처절한 최후의 항전 — 는 전장에서 진 게 아니다. 삼백 명의 스파르타 전사가 페르시아 대군을 막아냈다. 그 방어선을 무너뜨린 건 적군이 아니라, 산길을 아는 한 사람이었다.",
    "moralOrLesson": "배신은 전쟁에서 가장 치명적인 무기다 — 어떤 군대보다 무섭다. 한 사람의 밀고가 삼백 명의 스파르타 전사가 목숨으로 지킨 모든 것을 무너뜨렸다.",
    "characters": [
        "에피알테스",
        "크세르크세스",
        "페르시아 불사부대",
        "포키스 수비대",
        "스파르타 왕 레오니다스",
    ],
    "paragraphs": [
        {
            "text": "테르모필레 전투에 대해 한 가지 짚고 넘어갈 게 있다. 역사상 가장 유명한 최후의 항전으로 불리는 이 전투는, 전장에서 진 게 아니다. 삼백 명의 스파르타 전사와 수천 명의 그리스 연합군이 좁은 해안 길목에서 페르시아 제국의 대군을 막아냈다. 이틀 동안 페르시아군은 단 한 발짝도 나아가지 못했다. 이 방어선을 무너뜨린 건 더 강한 군대가 아니었다. 산길을 아는 한 사람이었다."
        },
        {
            "text": "기원전 480년, 여름이 끝나갈 무렵. 페르시아의 왕 크세르크세스는 고대 역사가들이 \"지나가는 것만으로 강을 말려버렸다\"고 기록할 정도의 대군을 이끌고 그리스로 밀려왔다. 하지만 테르모필레의 좁은 길목 앞에서 병력의 차이는 아무 의미가 없었다. 절벽과 바다 사이에 낀 이 좁은 통로는 한 번에 몇 명밖에 싸울 수 없었다. 그리고 그 최전방에 서 있던 건 고대 세계 최강의 전사들, 스파르타 정예병이었다."
        },
        {
            "text": "이틀간 페르시아군은 밀려왔다가 밀려갔다. 파도처럼. 크세르크세스는 마지막 카드를 꺼냈다 — '불사부대'. 전사자가 나오면 즉시 충원되어 항상 만 명을 유지하는, 그래서 '죽지 않는 군단'이라는 이름을 얻은 최정예 부대였다. 하지만 그들마저 좁은 길목 앞에서 밀려났다."
        },
        {
            "text": "세 번 찍어 안 넘어가는 나무 없다고 했던가. 크세르크세스의 인내심은 바닥을 드러냈다. 바로 그때, 에피알테스라는 이름의 현지인 한 명이 페르시아 진영에 나타났다. 군인도 아니고 전략가도 아니었다. 그저 이 산을 손바닥 보듯 아는 사람이었을 뿐이다. 그가 가져온 정보는 어떤 무기보다 치명적이었다 — 산속 깊은 곳에 숨겨진 샛길이 있고, 그 길을 따라가면 그리스군의 뒤통수에 닿는다는 것. 그가 원한 대가는 간단했다. 황금. 가능한 한 많이."
        },
        {
            "text": "크세르크세스는 망설이지 않았다. 그날 밤, 만 명의 불사부대가 에피알테스의 안내를 받으며 캄캄한 산길로 들어섰다. 스파르타의 왕 레오니다스도 이 가능성을 아예 무시한 건 아니었다 — 그 샛길에 포키스 지역 출신 병사 천 명을 배치해 두었다. 하지만 새벽녘 불사부대가 숲에서 쏟아져 나왔을 때, 그 천 명은 무너졌다. 허겁지겁 산꼭대기로 도망쳤고, 길은 활짝 열렸다."
        },
        {
            "text": "날이 밝자 레오니다스는 모든 걸 알아챘다. 페르시아군이 곧 뒤에서 나타날 것이다. 앞뒤로 포위당하면 전멸은 시간문제다. 그래서 그는, 이 전투를 이천오백 년이 지난 지금까지 전해지는 전설로 만든 결정을 내렸다 — 그리스군 대부분을 남쪽으로 후퇴시키고, 자신은 삼백 명의 스파르타 전사와 약 칠백 명의 테스피아이 자원병과 함께 남았다. 임무는 하나. 아군이 빠져나갈 때까지 이 길목을 지키는 것."
        },
        {
            "text": "그들은 지켜냈다. 창이 부러지면 칼을 들었고, 칼을 잃으면 맨손으로 싸웠다. 한 명도 남지 않았다. 전원 전사. 하지만 그 희생은 헛되지 않았다. 후퇴한 그리스 연합군은 무사히 살아남아 전열을 가다듬었고, 이듬해에 걸쳐 페르시아를 연이어 격파했다. 삼백 명의 목숨이 하나의 문명을 살렸다."
        },
        {
            "text": "에피알테스에게는 그리스 전역에서 거액의 현상금이 걸렸다. 그는 북쪽 테살리아로 도주했지만, 그리스 세계 전체의 눈을 피할 수는 없었다. 역사가 헤로도토스의 기록에 따르면, 결국 배신과는 전혀 관계없는 개인적 원한으로 죽임을 당했다. 그런데도 스파르타는 그를 죽인 자에게 포상을 내렸다. 정의는 정의다 — 설령 우연히 찾아왔더라도."
        },
        {
            "text": "이천오백 년이 흘렀다. '에피알테스'는 현대 그리스어로 '악몽'이라는 뜻이다. 삼백 명의 전사는 영원히 사라지지 않을 이름이 되었다. 그들을 팔아넘긴 남자는, 사람을 한밤중에 비명 지르게 만드는 단어가 되었다. 세 번 찍어 안 넘어가는 나무 없다지만 — 배신의 도끼는, 단 한 번이면 충분했다."
        },
    ],
}


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PUSH TO DYNAMODB
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def convert_coordinates(item):
    """Ensure coordinates use Decimal-compatible values for DynamoDB."""
    coords = item.get("coordinates", {})
    from decimal import Decimal
    if coords:
        item["coordinates"] = {
            "lng": Decimal(coords["lng"]),
            "lat": Decimal(coords["lat"]),
        }
    return item


def push_item(item, lang_label):
    """Push a single item to DynamoDB and confirm success."""
    item = convert_coordinates(item)
    try:
        response = table.put_item(Item=item)
        status = response["ResponseMetadata"]["HTTPStatusCode"]
        if status == 200:
            print(f"  ✓ {lang_label} pushed successfully (langStoryId: {item['langStoryId']})")
            return True
        else:
            print(f"  ✗ {lang_label} FAILED — HTTP {status}")
            print(f"    Response: {response}")
            return False
    except Exception as e:
        print(f"  ✗ {lang_label} FAILED — {type(e).__name__}: {e}")
        return False


def verify_item(site_id, lang_story_id, lang_label):
    """Read back the item to confirm it was written correctly."""
    try:
        response = table.get_item(
            Key={"siteId": site_id, "langStoryId": lang_story_id}
        )
        item = response.get("Item")
        if item:
            title = item.get("title", "???")
            para_count = len(item.get("paragraphs", []))
            print(f"  ✓ {lang_label} verified — title: \"{title}\", paragraphs: {para_count}")
            return True
        else:
            print(f"  ✗ {lang_label} verification FAILED — item not found")
            return False
    except Exception as e:
        print(f"  ✗ {lang_label} verification FAILED — {type(e).__name__}: {e}")
        return False


if __name__ == "__main__":
    all_ok = True

    items = [
        (zh_item, "Chinese (zh)"),
        (ja_item, "Japanese (ja)"),
        (ko_item, "Korean (ko)"),
    ]

    print("=" * 60)
    print("PUSHING STORIES TO DYNAMODB")
    print("=" * 60)

    for item, label in items:
        print(f"\n▸ {label}:")
        ok = push_item(item, label)
        if not ok:
            all_ok = False
            continue
        # Verify
        ok = verify_item(item["siteId"], item["langStoryId"], label)
        if not ok:
            all_ok = False

    print("\n" + "=" * 60)
    if all_ok:
        print("ALL 3 STORIES PUSHED AND VERIFIED SUCCESSFULLY")
    else:
        print("SOME OPERATIONS FAILED — SEE ABOVE")
        sys.exit(1)
    print("=" * 60)
