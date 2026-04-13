#!/usr/bin/env python3
"""Push Russian version of 'The Origin of the Order of the Garter' to DynamoDB."""

import boto3
import json
import time
from decimal import Decimal

dynamodb = boto3.resource("dynamodb", region_name="eu-north-1")
table = dynamodb.Table("Story")

item = {
    "siteId": "windsor-castle",
    "langStoryId": "ru#order-of-the-garter",
    "lang": "ru",
    "storyId": "order-of-the-garter",
    "title": "Подвязка короля",
    "subtitle": "Как один конфуз на балу породил старейший рыцарский орден в мире",
    "excerpt": "Вот вам история о том, как один конфуз с дамской одеждой породил самый закрытый клуб в истории человечества. Год 1348-й. Английский король Эдуард III — тот, который только что разгромил французов в битве при Креси — устраивает грандиозный бал в своём замке.",
    "paragraphs": [
        {
            "text": "Вот вам история о том, как один конфуз с дамской одеждой породил самый закрытый клуб в истории человечества. Год 1348-й. Английский король Эдуард III — тот, который только что разгромил французов в битве при Креси — устраивает грандиозный бал в своём замке. Залы набиты рыцарями, знатью, всеми сливками Англии. Вино льётся рекой, гремит музыка. И тут происходит то, что перевернёт всё."
        },
        {
            "text": "На танцевальном полу — Джоан Кентская, она же «Прекрасная дева Кента», первая красавица Англии. Поговаривают, сам король от неё без ума. И вот в разгар танца у неё с ноги соскальзывает подвязка — шёлковая лента, которой дамы крепили чулок ниже колена. Падает на пол. Прямо при всех. А в XIV веке увидеть подвязку на публике — это примерно как сегодня пережить самый страшный кошмар с одеждой, какой можно представить. Зал взорвался хохотом."
        },
        {
            "text": "Говорят, хорошо смеётся тот, кто смеётся последним. Но Эдуард не стал смеяться — он заставил замолчать всех. Король прошёл через весь зал, нагнулся и поднял подвязку. Мёртвая тишина. Он обвёл взглядом каждое ухмыляющееся лицо — и медленно, демонстративно повязал голубую шёлковую ленту себе на ногу. А потом произнёс шесть слов по-французски, которые будут звучать следующие семь веков: «Honi soit qui mal y pense» — «Позор тому, кто дурно об этом подумает»."
        },
        {
            "text": "Одним жестом он перевернул всё. Секунду назад это было унижение женщины — теперь это вызов короля. Эдуард объявил оцепеневшему залу: эта подвязка станет символом нового рыцарского ордена — настолько могущественного и почётного, что каждый, кто сейчас смеялся, будет мечтать его носить. И он не бросал слов на ветер. Так появился Орден Подвязки — и спустя почти семьсот лет он остаётся старейшим и самым престижным рыцарским орденом на Земле."
        },
        {
            "text": "Образцом Эдуард взял Круглый стол короля Артура — и в XIV веке легенды о нём воспринимали абсолютно серьёзно. Число рыцарей ограничил двадцатью четырьмя — ровно как в мифическом кругу Артура. Домом Ордена стал Виндзорский замок. Но это не были почётные титулы для придворных. Среди основателей — отборные бойцы: Чёрный Принц, сын Эдуарда, самый грозный воин Европы, и лучшие полководцы королевства. Эту честь добывали в бою, а не на банкетах."
        },
        {
            "text": "Духовный дом Ордена — часовня Святого Георгия в Виндзоре, шедевр готической архитектуры, где покоятся десять королей и королев. Внутри — резные кресла с гербами каждого кавалера Ордена начиная с 1348 года, а над ними — яркие знамёна. Каждый июнь новые рыцари идут через замковый парк в бархатных синих мантиях до пола и шляпах с огромными белыми перьями — зрелище как из фэнтези-романа. Толпы до сих пор рукоплещут. Традиция не прервалась ни разу за почти семьсот лет."
        },
        {
            "text": "И вот что по-настоящему удивительно: до сих пор Орден Подвязки — личный дар британского монарха. Никаких премьер-министров, комитетов или политических торгов. Только король или королева решают, кто достоин. Этот орден носил Уинстон Черчилль. Носил герцог Веллингтон, разбивший Наполеона. И всё восходит к одному мгновению на танцевальном полу — когда король превратил чужой конфуз в высшую честь королевства. И попробуй скажи хоть слово."
        }
    ],
    "moralOrLesson": "Настоящее благородство — это умение превратить насмешку в честь. Один-единственный жест может создать то, что переживёт столетия.",
    "characters": [
        "Эдуард III — король Англии, основатель Ордена Подвязки",
        "Джоан Кентская («Прекрасная дева Кента») — дама, чья упавшая подвязка вдохновила создание Ордена",
        "Эдуард Чёрный Принц — рыцарь-основатель, самый грозный воин Европы",
        "Генри Гросмонт, герцог Ланкастерский — рыцарь-основатель",
        "Сэр Джон Чандос — рыцарь-основатель и блестящий тактик",
        "Король Артур — легендарный образец, по чьему Круглому столу был создан Орден"
    ],
    "coordinates": {"lat": Decimal("51.4838"), "lng": Decimal("-0.6073")},
    "disabled": False,
    "era": "1348 AD — Present",
    "hasAudio": False,
    "icon": "\U0001F396\uFE0F",
    "image": "",
    "isFree": True,
    "readingTimeMinutes": 4,
    "source": "Jean Froissart's \"Chroniques\" (c. 1370s), Elias Ashmole's \"The Institution, Laws and Ceremonies of the Most Noble Order of the Garter\" (1672), Lisa Jefferson's scholarly research on the Order's founding, Historic Royal Palaces archives",
    "storyCategory": "crowns_conquests",
    "thumbnail": "",
    "tier": "A",
    "updatedAt": int(time.time())
}

# Validate JSON serialization
json_str = json.dumps(item, ensure_ascii=False, indent=2, default=str)
print("=== JSON VALIDATION ===")
print(f"Title: {item['title']}")
print(f"Subtitle: {item['subtitle']}")
print(f"Lang: {item['lang']}")
print(f"langStoryId: {item['langStoryId']}")
print(f"Paragraphs: {len(item['paragraphs'])}")
for i, p in enumerate(item['paragraphs']):
    text = p['text']
    print(f"  P{i+1}: {len(text)} chars, ~{len(text.split())} words")
total_chars = sum(len(p['text']) for p in item['paragraphs'])
print(f"Total text chars: {total_chars}")
print(f"Characters: {len(item['characters'])}")
print(f"updatedAt: {item['updatedAt']}")
print()

# Push to DynamoDB
print("=== PUSHING TO DYNAMODB ===")
try:
    response = table.put_item(Item=item)
    http_code = response['ResponseMetadata']['HTTPStatusCode']
    print(f"HTTP Status: {http_code}")
    if http_code == 200:
        print("SUCCESS: Russian story pushed to DynamoDB.")
    else:
        print(f"UNEXPECTED STATUS: {http_code}")
        print(json.dumps(response, indent=2, default=str))
except Exception as e:
    print(f"ERROR: {e}")
    raise

# Verify by reading it back
print()
print("=== VERIFICATION ===")
verify = table.get_item(Key={"siteId": "windsor-castle", "langStoryId": "ru#order-of-the-garter"})
if "Item" in verify:
    v = verify["Item"]
    print(f"Title: {v['title']}")
    print(f"Lang: {v['lang']}")
    print(f"Paragraphs: {len(v['paragraphs'])}")
    print(f"First paragraph starts: {v['paragraphs'][0]['text'][:80]}...")
    print("VERIFIED: Record exists in DynamoDB.")
else:
    print("ERROR: Record not found after push!")
