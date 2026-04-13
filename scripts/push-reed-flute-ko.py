#!/usr/bin/env python3
"""Push Korean version of The Reed Flute story to DynamoDB."""

import boto3
import json
import time

dynamodb = boto3.resource('dynamodb', region_name='eu-north-1')
table = dynamodb.Table('Story')

item = {
    "siteId": "mevlana-museum",
    "langStoryId": "ko#reed-flute",
    "lang": "ko",
    "storyId": "reed-flute",
    "title": "갈대 피리",
    "subtitle": "800년째 울리는 그리움의 소리",
    "excerpt": "1258년, 터키 코냐. 사랑하는 사람을 잃고 무너진 한 시인이 펜을 들었다. 페르시아 문학사에서 가장 위대한 시의 첫 줄이 그렇게 시작됐다. 그의 이름은 루미.",
    "paragraphs": [
        {
            "text": "1258년, 터키 코냐. 사랑하는 사람을 잃고 무너진 한 시인이 펜을 들었다. 그리고 페르시아어로 쓰인 시 중 가장 위대하다고 불리게 될 작품의 첫 줄을 써 내려갔다. 그의 이름은 잘랄루딘 루미. 그는 지혜로운 말이나 철학으로 시작하지 않았다. 소리 하나로 시작했다 — 갈대 피리의 울음."
        },
        {
            "text": "\"갈대의 이야기를 들어보라, 이별을 노래하는 그 소리를.\" 루미가 쓴 첫 구절이다. 네이라고 불리는 이 피리는 강가에서 자라던 갈대를 잘라 만든다. 한번 뿌리에서 잘려 나가면 갈대는 다시는 돌아갈 수 없다. 그래서 네이가 내는 모든 소리, 그 구슬픈 울림 하나하나는 음악이 아니다. 그건 통곡이다."
        },
        {
            "text": "비유는 놀라울 만큼 단순하다. 갈대는 인간의 영혼이고, 강가는 우리가 태어나기 전에 머물었던 곳 — 신이든, 우주든, 뭐라 부르든 — 그곳이다. 이유 없이 마음이 허전할 때, 설명할 수 없는 슬픔이 밀려올 때, 그게 바로 당신 안의 갈대다. 어딘가에서 왔지만 어디인지 기억 못 하는 곳을 그리워하는 영혼의 소리."
        },
        {
            "text": "루미가 이 비유를 갑자기 떠올린 건 아니다. 그 전에 그의 인생을 송두리째 바꿔놓은 만남이 있었다. 샴스 타브리지라는 떠돌이 신비주의자가 어느 날 불쑥 나타나 루미가 알던 모든 것을 뒤흔들어 놓았다. 신에 대해, 사랑에 대해, 학문에 대해 루미가 확신하던 모든 것을. 그리고 어느 날 샴스는 사라졌다. 살해당했을 수도 있다. 루미는 다시는 그를 보지 못했다."
        },
        {
            "text": "참을 인 세 번이면 못 참을 게 없다지만, 샴스의 부재는 참아서 지울 수 있는 종류의 아픔이 아니었다. 그 상실이 루미를 완전히 무너뜨렸고, 바로 그 균열 사이로 시가 쏟아져 나왔다. 존경받는 종교학자에서 역사상 가장 위대한 시인으로 변모한 건 깨달음이 아니라 감당할 수 없는 그리움 때문이었다. 그가 쓰기 시작한 《마스나비》는 수피즘 — 이슬람의 신비주의 전통 — 에서 '페르시아어의 꾸란'이라 불리는 여섯 권의 대서사시다. 그 첫 줄에 루미는 갈대 피리를 놓았다. 인간의 가장 깊은 진실은 기쁨이 아니라 그리움이기 때문이다."
        },
        {
            "text": "그 시는 하나의 영적 전통을 만들었다. 루미를 따르는 이들은 메블레비 교단이 되었다. 하얀 옷을 입고 빙글빙글 도는 수피 무용수들 — 사진이나 영상에서 한 번쯤 본 적 있을 것이다. 그 의식에서 언제나 네이 연주자가 가장 먼저 소리를 낸다. 첫 음은 일부러 거칠고 슬프게 분다. 갈대가 뿌리에서 잘려 나간 그 순간의 비명을 재현하는 것이다. 그러면 수피들은 돌기 시작한다. 한 손은 하늘을, 한 손은 땅을 향해. 공연이 아니다. 온몸으로 하는 기도다."
        },
        {
            "text": "그로부터 거의 800년. 루미는 지금 미국에서 가장 많이 팔리는 시인이다. 그의 말은 머그컵에도, 타투에도, SNS 피드에도 넘쳐난다. 하지만 그 모든 인용구 중에서 갈대 피리의 울음 — 자신이 어디에서 왔는지 기억하기에 울 수밖에 없는 그 소리 — 이 가장 깊이 남는다. 무엇을 믿든 상관없다. 누구나 한 번은 느껴봤을 테니까. 이름 붙일 수 없는 그 끌림, 그 허전함."
        },
        {
            "text": "루미의 천재성은 그 모든 걸 텅 빈 갈대 한 줄기의 이야기에 담았다는 데 있다. 우리는 모두 기억나지 않는 고향을 그리워하고 있다 — 갈대 피리는 바로 그 그리움이 소리가 된 것이다."
        }
    ],
    "moralOrLesson": "모든 그리움은 영혼이 자신의 근원을 기억하는 것이다 — 가장 깊은 슬픔은 잊어버린 고향을 향한 그리움이다.",
    "icon": "🎵",
    "tier": "A",
    "source": "Rumi, Masnavi-ye-Ma'navi, Book I; Franklin Lewis, Rumi: Past and Present, East and West",
    "characters": [
        "Mevlana Jalaluddin Rumi",
        "Shams-i-Tabrizi (referenced)",
        "The reed flute (ney)",
        "Mevlevi dervishes"
    ],
    "era": "Seljuk Period (c. 1258 AD)",
    "readingTimeMinutes": 2,
    "image": "",
    "thumbnail": "",
    "coordinates": {
        "lat": 37.8719,
        "lng": 32.5047
    },
    "hasAudio": False,
    "isFree": True,
    "disabled": False,
    "storyCategory": "love_heartbreak",
    "updatedAt": int(time.time())
}

# Validate JSON serialization
try:
    json_str = json.dumps(item, ensure_ascii=False, indent=2)
    print("JSON validation passed.")
    print(f"Total paragraphs: {len(item['paragraphs'])}")

    # Count total characters in paragraphs
    total_chars = sum(len(p['text']) for p in item['paragraphs'])
    print(f"Total paragraph characters: {total_chars}")
    print(f"Timestamp: {item['updatedAt']}")
    print()

    # Print the story for review
    print(f"Title: {item['title']}")
    print(f"Subtitle: {item['subtitle']}")
    print(f"Excerpt: {item['excerpt']}")
    print()
    for i, p in enumerate(item['paragraphs'], 1):
        print(f"P{i}: {p['text']}")
        print()
    print(f"Moral: {item['moralOrLesson']}")
    print()

except Exception as e:
    print(f"JSON validation FAILED: {e}")
    exit(1)

# Push to DynamoDB
try:
    from decimal import Decimal
    # Convert floats to Decimal for DynamoDB
    item['coordinates']['lat'] = Decimal(str(item['coordinates']['lat']))
    item['coordinates']['lng'] = Decimal(str(item['coordinates']['lng']))

    table.put_item(Item=item)
    print("SUCCESS: Korean version pushed to DynamoDB.")
    print(f"  siteId: {item['siteId']}")
    print(f"  langStoryId: {item['langStoryId']}")
except Exception as e:
    print(f"PUSH FAILED: {e}")
    exit(1)
