#!/usr/bin/env python3
"""
Push Chinese (zh), Japanese (ja), Korean (ko) recreations of
Shakespeare's Hamlet at Elsinore to DynamoDB Story table.
"""

import json
import subprocess
import time
import sys
import os
import tempfile

AWS_ENV = {
    "AWS_REGION": "eu-north-1",
}

TABLE = "Story"
SITE_ID = "kronborg-castle"
STORY_ID = "shakespeares-hamlet"
NOW_TS = int(time.time())

# ── Shared fields (unchanged from English) ─────────────────────────
SHARED = {
    "characters": {"L": [
        {"S": "Prince Hamlet"},
        {"S": "King Claudius"},
        {"S": "Queen Gertrude"},
        {"S": "The Ghost of King Hamlet"},
        {"S": "Ophelia"},
        {"S": "Horatio"},
        {"S": "William Shakespeare"},
    ]},
    "coordinates": {"M": {
        "lng": {"N": "12.6217"},
        "lat": {"N": "56.0389"},
    }},
    "disabled": {"BOOL": False},
    "era": {"S": "Elizabethan England (c. 1600-1601), set in medieval Denmark"},
    "hasAudio": {"BOOL": False},
    "icon": {"S": "\U0001f480"},       # 💀
    "image": {"S": ""},
    "isFree": {"BOOL": True},
    "readingTimeMinutes": {"N": "3"},
    "siteId": {"S": SITE_ID},
    "source": {"S": "Shakespeare, William. The Tragedy of Hamlet, Prince of Denmark (c. 1601); Saxo Grammaticus, Gesta Danorum (c. 1200); Belleforest, Histoires Tragiques (1570)"},
    "storyCategory": {"S": "lost_found"},
    "storyId": {"S": STORY_ID},
    "thumbnail": {"S": ""},
    "tier": {"S": "S"},
    "updatedAt": {"N": str(NOW_TS)},
}

def make_paragraphs(texts):
    return {"L": [{"M": {"text": {"S": t}}} for t in texts]}

# ═══════════════════════════════════════════════════════════════════
#  CHINESE  (zh)  —  Modern Mandarin, Simplified characters
# ═══════════════════════════════════════════════════════════════════
ZH = {
    **SHARED,
    "lang": {"S": "zh"},
    "langStoryId": {"S": "zh#shakespeares-hamlet"},
    "title": {"S": "克伦堡的幽灵"},
    "subtitle": {"S": "城墙上的鬼魂，和世界上最伟大的一出戏"},
    "excerpt": {"S": "\u201c丹麦这个国家，一定出了什么问题。\u201d\u2014\u2014就凭城墙上的这句台词，莎士比亚把一座军事要塞变成了世界上最传奇的城堡，也写出了人类文学史上最伟大的悲剧。"},
    "moralOrLesson": {"S": "伟大故事落脚的地方，最终会超越建筑本身\u2014\u2014它变成了人类永恒追问的容器。世界上没有哪座建筑，比莎士比亚为他最伟大的戏剧选中的这座城堡，承载着更沉重的意义。"},
    "paragraphs": make_paragraphs([

        # P1 — Opening hook
        "\u201c丹麦这个国家，一定出了什么问题。\u201d\u2014\u2014这大概是整个戏剧史上最出名的一句台词了。说这话的人站在一座叫\u201c埃尔西诺\u201d的城堡的城墙上，深更半夜，寒风刺骨。这出戏叫《哈姆雷特》。而这座城堡，是真实存在的\u2014\u2014它叫克伦堡，丹麦海岸上的一座巨型要塞，正好卡在丹麦和瑞典之间海峡最窄的地方。1600年前后，莎士比亚写下了这个故事，一下子把一座军事堡垒变成了全世界最具传奇色彩的城堡。",

        # P2 — Shakespeare never visited
        "最离谱的是：莎士比亚本人大概率压根儿没去过克伦堡。但他不需要去。1585年，丹麦国王弗雷德里克二世请了一批英国演员到城堡里演出\u2014\u2014这些演员后来加入了莎士比亚自己的剧团，当时伦敦最火的那个。他们带回来了故事：刺骨的海风、厚重的石墙、海面上翻涌过来的浓雾，整座城堡看着就像闹鬼一样。莎士比亚听了，然后\u2014\u2014动笔了。",

        # P3 — Origin: Saxo Grammaticus
        "这个故事也不是他凭空编的。大约在1200年，丹麦有个历史学家叫萨克索\u00b7格拉玛提库斯，他记录了一个叫\u201c阿姆莱斯\u201d的王子的传说\u2014\u2014叔叔杀了他父亲，娶了他母亲，霸占了王位。阿姆莱斯靠装疯卖傻活了下来，一直等到复仇的机会。这个传说在欧洲流传了好几百年，最后通过1570年一个法国人的改编版本传到了莎士比亚手里。骨架一样，但到了莎士比亚笔下，变成了完全不同的东西。",

        # P4 — What Shakespeare built
        "莎士比亚在这个老传说的基础上搭了一个全新的世界。他加了一个幽灵\u2014\u2014被害的老国王午夜现身城墙，要求儿子替他复仇。他创造了\u201c捕鼠器\u201d\u2014\u2014一出戏中戏，哈姆雷特用来试探叔叔是不是真的动了杀心。他写出了奥菲莉亚，她的心碎和疯狂到今天还能让观众哭出来。但最要命的，是他给了哈姆雷特一个致命的性格：想得太多，感受太深，却怎么也下不了那个决心。",

        # P5 — "To be or not to be" + proverb 事不过三
        "\u201c生存还是毁灭，这是个问题。\u201d这句话早就不只是戏剧台词了。它是人类第一次把一种感受说出了口：活着太疼的时候，到底还要不要撑下去。哈姆雷特不是在讨论哲学，他是在问，硬扛下去和就此了断，哪个才算勇敢。中国人说\u201c事不过三\u201d\u2014\u2014命运给了机会，就该抓住。可哈姆雷特呢？鬼魂现身是一次，戏中戏坐实了真相是第二次，叔叔毫无防备跪在那儿祈祷是第三次。三次机会摆在面前，他一次都没抓住。不是不想，是下不了手。四百多年了，人们在最难熬的时候还是会想起这句话。这不是文笔好能解释的\u2014\u2014这是真正碰到了人心里最疼的那个地方。",

        # P6 — Yorick's skull
        "然后就是那个骷髅。哈姆雷特在墓地里捡起了约里克的头骨\u2014\u2014约里克是宫廷小丑，小时候总逗他笑的那个人。他捧着这颗头骨说话的瞬间，死亡从一个概念变成了一张曾经熟悉的脸。一个让他笑过的人，如今只是手里的一把枯骨。这个画面\u2014\u2014一个人手捧骷髅，直面所有人都会变成这样的事实\u2014\u2014成了全世界最有辨识度的艺术形象之一。四百年了，冲击力一点没减。",

        # P7 — Modern performances
        "今天，克伦堡城堡就在自家院子里上演《哈姆雷特》。劳伦斯\u00b7奥利弗、肯尼思\u00b7布拉纳、裘德\u00b7洛都在这儿演过王子，站在真正的城墙上，面对真正的大海，念出莎士比亚的台词。城堡和这出戏已经彻底长在一起了\u2014\u2014你想到一个，就一定会想到另一个。雾天的晚上走在那些城墙上，你试试，看你敢不敢说自己一点都没觉得有鬼。",

        # P8 — Closing: universal meaning
        "莎士比亚从没去过克伦堡。他写了一个虚构的王子放进一座真实的城堡，四百年过去了，这个王子比大多数真实的历史人物都要鲜活。石头是丹麦的，故事是英国的。但哈姆雷特提出的那些问题\u2014\u2014关于正义、关于悲伤、关于你连床都不想下的时候还能不能做对的事情\u2014\u2014那些问题，属于每一个人。",
    ]),
}


# ═══════════════════════════════════════════════════════════════════
#  JAPANESE  (ja)  —  Modern Japanese, natural kanji-kana balance
# ═══════════════════════════════════════════════════════════════════
JA = {
    **SHARED,
    "lang": {"S": "ja"},
    "langStoryId": {"S": "ja#shakespeares-hamlet"},
    "title": {"S": "クロンボーの亡霊"},
    "subtitle": {"S": "城壁に立つ幽霊と、史上最も有名な戯曲の物語"},
    "excerpt": {"S": "「デンマークでは何かが腐っている」\u2014\u2014城壁の上で語られたこの一言で、シェイクスピアはひとつの軍事要塞を世界でもっとも伝説的な城に変え、人類の文学史に最高の悲劇を刻んだ。"},
    "moralOrLesson": {"S": "偉大な物語が語られた場所は、やがて建物以上の存在になる\u2014\u2014人間の存在を定義する問いを受け止める器となるのだ。シェイクスピアが最高傑作の舞台に選んだこの城ほど、重い意味を背負った建物は世界のどこにもない。"},
    "paragraphs": make_paragraphs([

        # P1 — Opening hook
        "「デンマークでは何かが腐っている」\u2014\u2014この台詞は、演劇史上もっとも有名なセリフのひとつだ。舞台は、エルシノアと呼ばれる城の城壁の上、凍てつく深夜。芝居の名は『ハムレット』。そしてこの城は実在する。クロンボー城\u2014\u2014デンマークの海岸に立つ巨大な要塞で、デンマークとスウェーデンの間の海峡がもっとも狭くなる場所に位置している。シェイクスピアが1600年頃にこの物語を書いたとき、ひとつの軍事拠点は世界でもっとも伝説的な城へと変貌した。",

        # P2 — Shakespeare never visited
        "驚くべきことに、シェイクスピア本人はクロンボー城を訪れたことがおそらくない。だが、行く必要がなかった。1585年、デンマーク王フレゼリク2世がイギリスの俳優たちを城に招いて公演をさせている。その俳優たちの一部は、のちにシェイクスピアの劇団\u2014\u2014当時ロンドン最大の劇団\u2014\u2014に加わった。彼らが持ち帰ったのは、骨まで凍みる海風、分厚い石壁、海から這い上がってくる霧、そして城全体が幽霊でも出そうな空気に包まれていたという話。シェイクスピアはそれを聞いた。そして、書いた。",

        # P3 — Origin: Saxo Grammaticus
        "もっとも、この物語をゼロから作り上げたわけではない。1200年頃、デンマークの歴史家サクソ・グラマティクスが「アムレス」という王子の伝説を記録している。叔父が父を殺し、母を奪い、王位を盗んだ。アムレスは狂人のふりをして生き延び、復讐の機会を待った。この物語はヨーロッパを数世紀にわたって旅し、1570年のフランス語版を経て、最終的にシェイクスピアの手に届いた。骨格は同じ。だが、まったく別の生き物になった。",

        # P4 — What Shakespeare built
        "シェイクスピアがこの古い伝説から作り上げたものは、次元が違った。殺された王が真夜中に城壁に現れ、息子に復讐を求める亡霊。ハムレットが叔父の犯行を暴くために仕掛ける劇中劇「ねずみ捕り」。心を砕かれ、正気を失っていくオフィーリア。そして何より、ハムレットという人物に宿った致命的な性質\u2014\u2014考えすぎる。感じすぎる。なのに、動けない。",

        # P5 — "To be or not to be" + proverb 仏の顔も三度まで
        "「生きるべきか、死ぬべきか、それが問題だ」。この台詞はもはや芝居の枠を超えている。生きることが苦しいとき、それでも続けるべきなのか\u2014\u2014人類がずっと抱えてきた問いを、初めて正確な言葉にした瞬間だ。日本には「仏の顔も三度まで」ということわざがある。どんなに慈悲深い存在でも、三度目には堪忍袋の緒が切れる。ハムレットの場合、亡霊が現れたのが一度目。劇中劇で真実が確定したのが二度目。叔父が無防備に祈っていたのが三度目。仏でさえ見切りをつける三度の好機を、ハムレットはすべて逃した。臆病だったのではない。考えることをやめられなかったのだ。四百年以上前の言葉が、いまも人がもっともつらいときに頭をよぎる。名文だからではない。人間のいちばん痛い場所に、正確に触れているからだ。",

        # P6 — Yorick's skull
        "そして、あの頭蓋骨がある。ハムレットは墓地でヨリックの骸骨を手に取る。ヨリックは宮廷の道化師で、幼い頃のハムレットをいつも笑わせてくれた人物だ。その骨を手にした瞬間、「死」は概念であることをやめ、かつて愛した人間の顔になる。笑わせてくれた人が、いまは手のひらの上の骨でしかない。頭蓋骨を手にした人間が、誰もがいつかこうなるという事実と向き合う\u2014\u2014あのイメージは、世界でもっとも知られた芸術的場面のひとつになった。四百年経っても、衝撃は少しも薄れていない。",

        # P7 — Modern performances
        "現在、クロンボー城では城の敷地内で『ハムレット』が上演されている。ローレンス・オリヴィエ、ケネス・ブラナー、ジュード・ロウ\u2014\u2014名優たちがここで王子を演じ、本物の城壁の上で、本物の海を前にして、シェイクスピアの台詞を語ってきた。城と芝居はもう切り離せない。霧の夜にあの城壁を歩けば、亡霊の気配を感じずにいるほうが難しいだろう。",

        # P8 — Closing: universal meaning
        "シェイクスピアはクロンボーを訪れたことがない。架空の王子を実在の城に置き、四百年後、その王子はほとんどの実在の歴史上の人物よりも生き生きとしている。石はデンマークのもの。物語はイギリスのもの。だがハムレットが投げかけた問い\u2014\u2014正義について、悲しみについて、ベッドから起き上がることさえままならないとき、正しいことなどできるのかについて\u2014\u2014それは、すべての人間に属している。",
    ]),
}


# ═══════════════════════════════════════════════════════════════════
#  KOREAN  (ko)  —  Modern Korean, natural narrative register
# ═══════════════════════════════════════════════════════════════════
KO = {
    **SHARED,
    "lang": {"S": "ko"},
    "langStoryId": {"S": "ko#shakespeares-hamlet"},
    "title": {"S": "크론보르의 유령"},
    "subtitle": {"S": "성벽 위의 유령, 그리고 역사상 가장 유명한 희곡"},
    "excerpt": {"S": "\u201c덴마크에 뭔가 썩은 게 있다.\u201d 성벽 위에서 나온 이 한마디로, 셰익스피어는 군사 요새를 세상에서 가장 전설적인 성으로 바꾸었고, 인류 문학사에서 가장 위대한 비극을 만들어냈다."},
    "moralOrLesson": {"S": "위대한 이야기가 깃든 장소는 단순한 건물을 넘어, 인간의 존재를 규정하는 질문들을 담는 그릇이 된다. 셰익스피어가 자신의 가장 위대한 작품을 위해 선택한 이 성보다 더 무거운 의미를 짊어진 건물은 세상 어디에도 없다."},
    "paragraphs": make_paragraphs([

        # P1 — Opening hook
        "\u201c덴마크에 뭔가 썩은 게 있다.\u201d 이 대사는 연극 역사상 가장 유명한 대사 중 하나다. 엘시노어라 불리는 성의 성벽 위, 살을 에는 한겨울 밤에 나온 말이다. 이 연극의 이름은 \u300e햄릿\u300f. 그리고 이 성은 실제로 존재한다. 크론보르 성\u2014\u2014덴마크 해안에 자리 잡은 거대한 요새로, 덴마크와 스웨덴 사이 해협이 가장 좁아지는 바로 그 지점에 서 있다. 셰익스피어가 1600년 무렵 이 이야기를 썼을 때, 하나의 군사 요새가 지구상에서 가장 전설적인 성으로 탈바꿈했다.",

        # P2 — Shakespeare never visited
        "놀라운 건, 셰익스피어 본인은 크론보르에 가본 적이 아마 없다는 거다. 하지만 갈 필요가 없었다. 1585년, 덴마크 왕 프레데리크 2세가 영국 배우들을 성으로 초청해서 공연을 시켰다. 그 배우들 중 일부가 나중에 셰익스피어의 극단에 합류했는데, 당시 런던에서 가장 잘나가는 극단이었다. 그들이 가져온 건 이야기였다. 뼈까지 스미는 바닷바람, 육중한 돌벽, 바다에서 기어오르는 안개\u2014\u2014성 전체가 귀신이라도 나올 것 같은 분위기였다고. 셰익스피어는 그 이야기를 들었다. 그리고 펜을 들었다.",

        # P3 — Origin: Saxo Grammaticus
        "물론 이야기를 처음부터 지어낸 건 아니다. 1200년경, 덴마크의 역사가 삭소 그라마티쿠스가 \u2018아믈레스\u2019라는 왕자의 전설을 기록해 놓았다. 삼촌이 아버지를 죽이고, 어머니를 빼앗고, 왕위를 차지했다. 아믈레스는 미친 척하며 살아남아 복수할 날을 기다렸다. 이 전설은 수백 년 동안 유럽을 떠돌다가, 1570년 프랑스어 번역본을 거쳐 셰익스피어 손에 들어갔다. 뼈대는 같았다. 하지만 완전히 다른 생물이 됐다.",

        # P4 — What Shakespeare built
        "셰익스피어가 이 오래된 전설에서 만들어낸 것은 차원이 달랐다. 살해당한 왕이 한밤중 성벽에 나타나 아들에게 복수를 요구하는 유령. 햄릿이 삼촌의 범행을 확인하려고 꾸미는 극중극 \u2018쥐덫\u2019. 마음이 산산이 부서지고 미쳐가는 오필리어. 그리고 무엇보다, 햄릿에게 깃든 치명적인 성격\u2014\u2014너무 많이 생각하고, 너무 깊이 느끼면서도, 정작 행동으로는 옮기지 못하는 왕자.",

        # P5 — "To be or not to be" + proverb 참을 인 자 셋이면 살인도 면한다
        "\u201c사느냐 죽느냐, 그것이 문제로다.\u201d 이 대사는 이미 연극의 틀을 넘어섰다. 살아 있는 게 고통일 때, 그래도 버텨야 하는 건지\u2014\u2014그 질문을 인류 역사상 처음으로 정확한 말로 꺼낸 순간이다. 우리 속담에 \u201c참을 인 자 셋이면 살인도 면한다\u201d는 말이 있다. 세 번만 참으면 최악의 사태도 피할 수 있다는 뜻이다. 그런데 햄릿은 어땠나. 유령이 나타나 진실을 알려준 게 한 번, 극중극으로 삼촌의 죄가 확정된 게 두 번, 삼촌이 무방비 상태로 기도하고 있던 게 세 번. 세 번의 기회가 왔는데, 세 번 다 참아버렸다. 참을 인 자를 너무 많이 쓴 거다. 결국 살인을 면하기는커녕, 무대 위의 모든 사람이 죽었다. 400년도 더 전에 쓰인 이 대사를 사람들이 가장 힘든 순간에 떠올리는 건, 글솜씨가 좋아서가 아니다. 사람 마음의 가장 아픈 데를 정확히 건드리기 때문이다.",

        # P6 — Yorick's skull
        "그리고 그 해골이 있다. 햄릿은 묘지에서 요릭의 두개골을 집어 든다. 요릭은 궁정 광대였고, 어린 시절 햄릿을 늘 웃겨주던 사람이었다. 그 뼈를 손에 든 순간, 죽음은 머릿속 개념이기를 멈추고 한때 사랑했던 사람의 얼굴이 된다. 자기를 웃게 해주던 사람이 이제는 손바닥 위의 뼈일 뿐이다. 해골을 든 한 남자가 모든 인간의 끝을 직시하는 그 장면은, 세계에서 가장 유명한 예술적 이미지 중 하나가 됐다. 400년이 지났는데도 그 충격은 하나도 줄지 않았다.",

        # P7 — Modern performances
        "오늘날 크론보르 성에서는 실제로 \u300e햄릿\u300f 공연이 열린다. 로렌스 올리비에, 케네스 브래너, 주드 로 같은 배우들이 이곳에서 왕자를 연기했다. 진짜 성벽 위에서, 진짜 바다를 앞에 두고, 셰익스피어의 대사를 말했다. 성과 이 연극은 이제 떼려야 뗄 수 없을 만큼 하나가 됐다. 안개 낀 밤에 저 성벽을 걸어 보라. 유령의 기척을 느끼지 않을 자신이 있는가.",

        # P8 — Closing: universal meaning
        "셰익스피어는 크론보르에 간 적이 없다. 허구의 왕자를 실재하는 성에 넣었을 뿐인데, 400년이 지난 지금 그 왕자는 대부분의 실존 인물보다 더 생생하게 살아 있다. 돌은 덴마크 것이다. 이야기는 영국 것이다. 하지만 햄릿이 던진 질문들\u2014\u2014정의에 대해, 슬픔에 대해, 침대에서 일어나는 것조차 버거울 때 옳은 일을 할 수 있느냐에 대해\u2014\u2014그건 모든 사람의 것이다.",
    ]),
}


# ═══════════════════════════════════════════════════════════════════
#  PUSH TO DYNAMODB
# ═══════════════════════════════════════════════════════════════════
def put_item(item, lang_label):
    """Write a single item to DynamoDB via AWS CLI."""
    # Validate JSON first
    json_str = json.dumps(item, ensure_ascii=False)
    # Re-parse to confirm roundtrip
    reparsed = json.loads(json_str)
    assert reparsed == item, f"JSON roundtrip failed for {lang_label}"

    # Write to temp file
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".json", delete=False, encoding="utf-8"
    ) as f:
        json.dump(item, f, ensure_ascii=False)
        tmp_path = f.name

    try:
        env = {**os.environ, **AWS_ENV}
        cmd = [
            "aws", "dynamodb", "put-item",
            "--table-name", TABLE,
            "--item", f"file://{tmp_path}",
            "--region", "eu-north-1",
            "--return-consumed-capacity", "TOTAL",
        ]
        result = subprocess.run(
            cmd, capture_output=True, text=True, env=env, timeout=30
        )
        if result.returncode != 0:
            print(f"  ERROR pushing {lang_label}: {result.stderr.strip()}")
            return False
        print(f"  SUCCESS: {lang_label} pushed. {result.stdout.strip()}")
        return True
    finally:
        os.unlink(tmp_path)


def verify_item(lang_code):
    """Read back the item to confirm it exists."""
    env = {**os.environ, **AWS_ENV}
    key_json = json.dumps({
        "siteId": {"S": SITE_ID},
        "langStoryId": {"S": f"{lang_code}#shakespeares-hamlet"},
    })
    cmd = [
        "aws", "dynamodb", "get-item",
        "--table-name", TABLE,
        "--key", key_json,
        "--projection-expression", "langStoryId,title,lang",
        "--region", "eu-north-1",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, env=env, timeout=15)
    if result.returncode != 0:
        print(f"  VERIFY FAILED for {lang_code}: {result.stderr.strip()}")
        return False
    data = json.loads(result.stdout)
    if "Item" not in data:
        print(f"  VERIFY FAILED for {lang_code}: Item not found after push!")
        return False
    title = data["Item"]["title"]["S"]
    print(f"  VERIFIED: {lang_code} \u2192 \"{title}\"")
    return True


if __name__ == "__main__":
    items = [
        (ZH, "zh (Chinese)"),
        (JA, "ja (Japanese)"),
        (KO, "ko (Korean)"),
    ]

    print(f"Timestamp: {NOW_TS}")
    print(f"Target table: {TABLE}")
    print(f"Site ID: {SITE_ID}")
    print()

    all_ok = True
    for item, label in items:
        lang_code = item["lang"]["S"]
        n_paragraphs = len(item["paragraphs"]["L"])
        print(f"[{label}]  title=\"{item['title']['S']}\"  paragraphs={n_paragraphs}")

        # Push
        ok = put_item(item, label)
        if not ok:
            all_ok = False
            print(f"  ABORTING remaining pushes due to error on {label}.")
            sys.exit(1)

        # Verify
        ok = verify_item(lang_code)
        if not ok:
            all_ok = False
            sys.exit(1)
        print()

    if all_ok:
        print("ALL 3 LANGUAGE VERSIONS PUSHED AND VERIFIED SUCCESSFULLY.")
    else:
        print("SOME PUSHES FAILED. See errors above.")
        sys.exit(1)
