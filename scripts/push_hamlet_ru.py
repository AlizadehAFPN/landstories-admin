#!/usr/bin/env python3
"""
Push Russian version of 'Shakespeare's Hamlet at Elsinore'
to the Story DynamoDB table as a NEW record.

Proverb: "Бог троицу любит" (God loves the Trinity / things come in threes)
Subverted: Hamlet didn't act on his first chance, nor his third, nor his hundredth.
"""

import boto3
import time
import json
import sys

# --- Configuration ---
TABLE_NAME = "Story"
REGION = "eu-north-1"
SITE_ID = "kronborg-castle"
STORY_ID = "shakespeares-hamlet"
TIMESTAMP = int(time.time())

# --- Build the Russian item ---
item = {
    # Shared / unchanged fields
    "siteId": {"S": SITE_ID},
    "storyId": {"S": STORY_ID},
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
    "icon": {"S": "\U0001f480"},
    "image": {"S": ""},
    "isFree": {"BOOL": True},
    "readingTimeMinutes": {"N": "3"},
    "source": {"S": "Shakespeare, William. The Tragedy of Hamlet, Prince of Denmark (c. 1601); Saxo Grammaticus, Gesta Danorum (c. 1200); Belleforest, Histoires Tragiques (1570)"},
    "storyCategory": {"S": "lost_found"},
    "thumbnail": {"S": ""},
    "tier": {"S": "S"},
    "updatedAt": {"N": str(TIMESTAMP)},

    # Russian-specific fields
    "lang": {"S": "ru"},
    "langStoryId": {"S": "ru#shakespeares-hamlet"},
    "title": {"S": "Призрак Эльсинора"},
    "subtitle": {"S": "Шекспир, датская крепость и трагедия, перевернувшая мировой театр"},
    "excerpt": {"S": (
        "«Подгнило что-то в Датском королевстве.» "
        "Эту фразу, произнесённую на продуваемых ветрами стенах Эльсинора, "
        "знает весь мир. Шекспир обнажил гниль в сердце королевства — "
        "и создал самую знаменитую трагедию в истории мировой литературы."
    )},
    "moralOrLesson": {"S": (
        "Места, где рождаются великие истории, перестают быть просто точками "
        "на карте. Они становятся хранилищами вопросов, которые определяют "
        "нас как людей. И нет на свете здания, которое несло бы на себе "
        "больше смысла, чем замок, который Шекспир выбрал для своей главной пьесы."
    )},
    "paragraphs": {"L": [
        # P1 — The famous line, the castle, the play
        {"M": {"text": {"S": (
            "«Подгнило что-то в Датском королевстве.» "
            "Эта фраза, произнесённая на ледяных стенах замка "
            "под названием Эльсинор, — одна из самых известных в истории театра. "
            "Пьеса — «Гамлет». Замок — настоящий: это Кронборг, "
            "массивная крепость на побережье Дании, там, где пролив "
            "между Данией и Швецией сужается до предела. "
            "Шекспир написал пьесу около 1600 года — "
            "и превратил военную крепость в самый легендарный замок на Земле."
        )}}},
        # P2 — Shakespeare never went there
        {"M": {"text": {"S": (
            "Самое поразительное — Шекспир, скорее всего, никогда "
            "не бывал в Кронборге. И не нуждался в этом. "
            "В 1585 году датский король Фредерик II пригласил английских "
            "актёров выступить в замке. Некоторые из них позже вошли "
            "в труппу Шекспира — крупнейшую в Лондоне. "
            "Они привезли рассказы о ледяных ветрах, каменных стенах "
            "в десять ростов и тумане, который поднимался с моря, "
            "будто замок был проклят. Шекспир выслушал. А потом написал."
        )}}},
        # P3 — Saxo Grammaticus and the source legend
        {"M": {"text": {"S": (
            "Историю он тоже не выдумал с нуля. "
            "Около 1200 года датский хронист Саксон Грамматик записал "
            "легенду об Амлете — принце, чей дядя убил его отца, "
            "женился на его матери и захватил трон. "
            "Амлет выжил, притворяясь безумным, пока не дождался часа мести. "
            "Легенда бродила по Европе несколько столетий "
            "и добралась до Шекспира через французский пересказ 1570 года. "
            "Те же кости. Совершенно другой зверь."
        )}}},
        # P4 — What Shakespeare added
        {"M": {"text": {"S": (
            "То, что Шекспир построил из этой старой легенды, — "
            "совсем другой масштаб. Он добавил призрак — убитый король "
            "является в полночь на крепостных стенах и требует отмщения. "
            "Придумал «Мышеловку» — спектакль внутри спектакля, "
            "который Гамлет ставит, чтобы проверить, правда ли дядя убил отца. "
            "Подарил нам Офелию, чьё безумие до сих пор разрывает "
            "зрителей на части. И дал Гамлету то, что сделало его "
            "бессмертным: принц, который слишком много думает, "
            "слишком глубоко чувствует и не способен действовать."
        )}}},
        # P5 — "To be or not to be"
        {"M": {"text": {"S": (
            "«Быть или не быть — вот в чём вопрос.» "
            "Эта фраза — не просто театр. Это момент, когда кто-то "
            "наконец нашёл слова для того, что чувствовал каждый: "
            "невыносимую тяжесть жизни, когда жить — больно. "
            "Гамлет не рассуждает холодно о конце — он спрашивает, "
            "что требует больше мужества: продолжать или остановиться. "
            "Шекспир написал это больше четырёхсот лет назад, "
            "и люди до сих пор хватаются за эти слова "
            "в самые тёмные минуты. Это не талант. Это вечность."
        )}}},
        # P6 — Yorick's skull
        {"M": {"text": {"S": (
            "А ещё — череп. Гамлет поднимает череп Йорика — "
            "придворного шута, который смешил его в детстве — "
            "и разговаривает с ним. Это момент, когда смерть "
            "перестаёт быть абстракцией и становится чем-то личным. "
            "Человек, которого он любил, теперь просто кость в его руках. "
            "Этот образ — мужчина с черепом, лицом к лицу с тем, "
            "что все, кого он знал, закончат так же — "
            "один из самых узнаваемых в истории искусства. "
            "Четыре века прошло. А он всё бьёт в цель."
        )}}},
        # P7 — Modern performances at Kronborg
        {"M": {"text": {"S": (
            "Сегодня в Кронборге ставят «Гамлета» прямо на территории замка. "
            "Лоуренс Оливье, Кеннет Брана и Джуд Лоу — "
            "все играли здесь принца, произнося шекспировские строки "
            "на настоящих крепостных стенах, над настоящим морем. "
            "Замок и пьеса срослись настолько, что одно без другого "
            "уже невозможно представить. Пройдитесь по этим стенам "
            "туманной ночью — и попробуйте сказать, "
            "что не чувствуете призрака."
        )}}},
        # P8 — Closing with proverb subversion ("Бог троицу любит")
        {"M": {"text": {"S": (
            "Шекспир никогда не был в Кронборге. "
            "Он написал о вымышленном принце в настоящем замке — "
            "и четыре столетия спустя этот принц кажется живее "
            "большинства королей, которые там ночевали. "
            "Бог троицу любит, говорят — но Гамлет не воспользовался "
            "ни первым шансом, ни третьим, ни сотым. "
            "Его вопросы — о справедливости, о горе, о том, "
            "можно ли вообще поступить правильно, когда у тебя нет сил "
            "встать с кровати — не датские и не английские. "
            "Они принадлежат каждому, кто хоть раз не спал до трёх ночи, "
            "пытаясь понять, зачем всё это."
        )}}},
    ]},
}


def main():
    # ── Validate JSON ──
    try:
        serialized = json.dumps(item, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[FAIL] JSON serialization error: {e}")
        sys.exit(1)
    print("[OK] JSON serialization valid")

    # ── Print summary ──
    print(f"\n{'='*60}")
    print(f"  Russian (ru) — Призрак Эльсинора")
    print(f"{'='*60}")
    print(f"  Title:       {item['title']['S']}")
    print(f"  Subtitle:    {item['subtitle']['S']}")
    print(f"  langStoryId: {item['langStoryId']['S']}")
    paras = item['paragraphs']['L']
    print(f"  Paragraphs:  {len(paras)}")
    total_chars = 0
    for i, p in enumerate(paras, 1):
        text = p['M']['text']['S']
        chars = len(text)
        words = len(text.split())
        total_chars += chars
        status = "OK" if chars <= 500 and words <= 100 else "WARN"
        print(f"    P{i}: {chars} chars, {words} words [{status}]")
    print(f"  Total chars: {total_chars}")
    target_min, target_max = 2400, 3600
    in_range = "OK" if target_min <= total_chars <= target_max else "WARN"
    print(f"  Range check: {target_min}-{target_max} [{in_range}]")
    print(f"  Timestamp:   {TIMESTAMP}")

    # ── Push to DynamoDB ──
    client = boto3.client("dynamodb", region_name=REGION)

    print(f"\n  Pushing Russian (ru)...", end=" ", flush=True)
    try:
        response = client.put_item(
            TableName=TABLE_NAME,
            Item=item,
            ConditionExpression="attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
        )
        http_code = response["ResponseMetadata"]["HTTPStatusCode"]
        print(f"SUCCESS (HTTP {http_code})")
    except client.exceptions.ConditionalCheckFailedException:
        print("already exists, overwriting...", end=" ", flush=True)
        response = client.put_item(
            TableName=TABLE_NAME,
            Item=item,
        )
        http_code = response["ResponseMetadata"]["HTTPStatusCode"]
        print(f"OVERWRITTEN (HTTP {http_code})")
    except Exception as e:
        print(f"FAILED: {e}")
        sys.exit(1)

    # ── Verify by reading back ──
    print(f"\n  Verifying...", end=" ", flush=True)
    try:
        verify = client.get_item(
            TableName=TABLE_NAME,
            Key={
                "siteId": {"S": SITE_ID},
                "langStoryId": {"S": "ru#shakespeares-hamlet"},
            },
        )
        if "Item" in verify:
            v_title = verify["Item"]["title"]["S"]
            v_paras = len(verify["Item"]["paragraphs"]["L"])
            print(f"OK — title=\"{v_title}\", paragraphs={v_paras}")
        else:
            print("FAILED — item not found after push!")
            sys.exit(1)
    except Exception as e:
        print(f"VERIFY FAILED: {e}")
        sys.exit(1)

    print(f"\n{'='*60}")
    print(f"  Russian story pushed and verified successfully!")
    print(f"  Timestamp: {TIMESTAMP}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
