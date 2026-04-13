#!/usr/bin/env python3
"""Push Korean version of The Vulture Stone story to DynamoDB."""

import boto3
import json
import sys

dynamodb = boto3.client("dynamodb", region_name="eu-north-1")

item = {
    "siteId": {"S": "gobeklitepe"},
    "langStoryId": {"S": "ko#vulture-stone"},
    "lang": {"S": "ko"},
    "storyId": {"S": "vulture-stone"},
    "title": {"S": "독수리 돌 — 하늘이 보낸 경고?"},
    "subtitle": {"S": "1만 2천 년 전, 누군가 우주의 재앙을 돌에 새겼다"},
    "excerpt": {
        "S": "1만 2천 년 전, 지금의 터키 남동부 어딘가에서 누군가 돌에 메시지를 남겼다. 글자가 아니라 그림으로. 둥근 원반을 움켜쥔 독수리 한 마리. 머리 없는 사람. 전갈. 지금까지 누구도 완전히 풀지 못한 기묘한 기호들. 이게 바로 괴베클리 테페의 43번 기둥, 사람들이 '독수리 돌'이라 부르는 것이다. 수천 년 동안 아무도 이걸 읽을 수 없었다. 그런데 이제, 읽힐 수도 있게 됐다."
    },
    "paragraphs": {
        "L": [
            {
                "M": {
                    "text": {
                        "S": "1만 2천 년 전, 지금의 터키 남동부 어딘가에서 누군가 돌에 메시지를 남겼다. 글자가 아니라 그림으로. 둥근 원반을 움켜쥔 독수리 한 마리. 머리 없는 사람. 전갈. 지금까지 누구도 완전히 풀지 못한 기묘한 기호들. 이게 바로 괴베클리 테페의 43번 기둥, 사람들이 '독수리 돌'이라 부르는 것이다. 수천 년 동안 아무도 이걸 읽을 수 없었다. 그런데 이제, 읽힐 수도 있게 됐다."
                    }
                }
            },
            {
                "M": {
                    "text": {
                        "S": "괴베클리 테페는 그 자체로 이미 말이 안 되는 곳이다. 기원전 9600년경에 세워진 거대한 석조 신전인데, 스톤헨지보다 6천 년, 이집트 피라미드보다 7천 년이나 앞선다. 그런데 이걸 지은 사람들? 수렵채집인이었다. 우리가 아는 상식으로는 이런 건축물을 절대 만들 수 없었을 사람들이다. 독수리 돌은 그 모든 기둥 중에서도 가장 풀리지 않는 수수께끼였다."
                    }
                }
            },
            {
                "M": {
                    "text": {
                        "S": "오랫동안 학자들은 이 조각이 장례 의식을 묘사한 거라고 봤다. 일부 고대 문화에서는 시신을 야외에 두어 독수리에게 맡기는 장례를 치렀는데, 지금도 티베트에서 이어지는 풍습이다. 독수리, 머리 없는 시체, 주변을 맴도는 동물들 — 죽음과 그 너머에 대해 깊이 고민한 사람들이 남긴 그림. 그렇게 보면 전부 앞뒤가 맞았다."
                    }
                }
            },
            {
                "M": {
                    "text": {
                        "S": "그런데 2017년, 에든버러 대학의 연구자 두 명이 판을 완전히 뒤집었다. 마틴 스웨트먼과 디미트리오스 치크릿시스. 이 두 사람이 조각 속 동물들을 고대 별자리 시뮬레이션에 대입해 본 거다. 결과는 소름 끼쳤다. 돌에 새겨진 동물 하나하나가 실제 별자리와 정확히 겹쳤다. 독수리는 궁수자리, 전갈은 전갈자리. 그리고 독수리가 쥐고 있던 그 둥근 원반? 태양이었다."
                    }
                }
            },
            {
                "M": {
                    "text": {
                        "S": "이걸 다 맞춰 보면, 독수리 돌은 기원전 약 10,950년경 밤하늘의 스냅샷이 된다. 그리고 이 시점이 예사롭지 않다. 과학자들이 '영거 드라이아스 충돌'이라 부르는 사건과 정확히 겹치기 때문이다. 혜성이나 그 파편이 지구와 충돌하면서 천 년 넘게 이어진 혹독한 한파가 시작됐다. 기온이 급락하고, 생태계가 무너지고, 수많은 삶의 방식이 한순간에 사라졌다."
                    }
                }
            },
            {
                "M": {
                    "text": {
                        "S": "잠깐, 이게 무슨 뜻인지 생각해 보자. 1만 2천 년 전, 우리가 늘 '원시인'이라고 치부했던 사람들이 밤하늘을 정밀하게 관측하고, 우주적 재앙의 기록을 돌에 남겼다는 거다. 그냥 하루하루 먹고사는 데 급급했던 게 아니다. 관찰하고, 계산하고, 기록했다. '하늘이 무너져도 솟아날 구멍이 있다'고 했는데, 이 사람들은 진짜로 하늘이 무너지는 걸 겪고도 살아남았을 뿐 아니라, 그 순간을 돌에 새겨서 후대가 절대 잊지 못하게 만들었다."
                    }
                }
            },
            {
                "M": {
                    "text": {
                        "S": "돌 한가운데 새겨진 머리 없는 사람? 아마 이런 뜻이다 — 이것 때문에 사람이 죽었다고. 이 기둥은 장식이 아니다. 경고다. 어쩌면 인류 역사상 가장 오래된 경고. 우리는 수천 년 동안 조상들을 얕봤다. 독수리 돌은 말하고 있다. 가장 오래된 메시지가, 사실은 가장 먼저 읽었어야 할 메시지였다고."
                    }
                }
            }
        ]
    },
    "moralOrLesson": {
        "S": "우리는 늘 조상들을 과소평가해 왔다 — 최초의 신전을 세운 사람들은 어쩌면 우리가 상상한 것보다 훨씬 더 우주를 이해하고 있었을지 모른다."
    },
    "characters": {
        "L": [
            {"S": "신석기 시대 천문학자/사제"},
            {"S": "독수리 (별자리 형상)"},
            {"S": "에든버러 대학 연구팀"},
            {"S": "클라우스 슈미트 (발굴 책임자)"}
        ]
    },
    "coordinates": {
        "M": {
            "lng": {"N": "38.92242"},
            "lat": {"N": "37.22332"}
        }
    },
    "disabled": {"BOOL": False},
    "era": {"S": "선토기 신석기 시대 (기원전 약 10,950년)"},
    "hasAudio": {"BOOL": False},
    "icon": {"S": "🦅"},
    "image": {"S": ""},
    "isFree": {"BOOL": True},
    "readingTimeMinutes": {"N": "2"},
    "source": {
        "S": "Sweatman & Tsikritsis, Mediterranean Archaeology and Archaeometry (2017); Schmidt, Klaus, Göbekli Tepe: A Stone Age Sanctuary"
    },
    "storyCategory": {"S": "riddles_past"},
    "thumbnail": {"S": ""},
    "tier": {"S": "A"},
    "updatedAt": {"N": "1773600865"}
}

# Validate the item by serializing to JSON first
try:
    json_str = json.dumps(item, ensure_ascii=False)
    print("JSON validation passed.")
    print(f"Total Korean text length check:")
    total_chars = 0
    for p in item["paragraphs"]["L"]:
        text = p["M"]["text"]["S"]
        total_chars += len(text)
        print(f"  Paragraph: {len(text)} chars")
    print(f"  Total paragraph chars: {total_chars}")
except Exception as e:
    print(f"JSON validation FAILED: {e}")
    sys.exit(1)

# Push to DynamoDB
try:
    response = dynamodb.put_item(
        TableName="Story",
        Item=item,
        ConditionExpression="attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)"
    )
    print(f"\nSUCCESS: Korean vulture-stone story pushed to DynamoDB.")
    print(f"  siteId: gobeklitepe")
    print(f"  langStoryId: ko#vulture-stone")
    print(f"  HTTP Status: {response['ResponseMetadata']['HTTPStatusCode']}")
except dynamodb.exceptions.ConditionalCheckFailedException:
    print("\nERROR: Item already exists! Use update or delete first.")
    sys.exit(1)
except Exception as e:
    print(f"\nERROR pushing to DynamoDB: {e}")
    sys.exit(1)
