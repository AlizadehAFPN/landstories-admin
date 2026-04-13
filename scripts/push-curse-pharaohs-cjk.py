#!/usr/bin/env python3
"""
Push zh/ja/ko versions of "The Curse of the Pharaohs (Original)" to DynamoDB.
Each version is a native retelling, not a translation.
"""

import boto3
import time
import json
import sys
import os
from decimal import Decimal

# Load data from JSON file
script_dir = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(script_dir, "curse-pharaohs-cjk-data.json")

with open(data_path, "r", encoding="utf-8") as f:
    data = json.load(f)

dynamodb = boto3.resource("dynamodb", region_name="eu-north-1")

table = dynamodb.Table("Story")
now_ts = int(time.time())

# Shared (unchanged) fields
shared = {
    "siteId":             "great-pyramids-giza",
    "storyId":            "curse-of-the-pharaohs-original",
    "storyCategory":      "ghosts_curses",
    "tier":               "S",
    "isFree":             True,
    "disabled":           False,
    "hasAudio":           False,
    "icon":               "\U0001F441\uFE0F",
    "image":              "",
    "thumbnail":          "",
    "readingTimeMinutes": Decimal("3"),
    "coordinates":        {"lat": Decimal("29.9792"), "lng": Decimal("31.1342")},
    "source":             "Al-Maqrizi, al-Khitat wa al-Athar; medieval Arab historical literature",
    "era":                "Medieval Arab Period (drawing on ancient traditions)",
    "updatedAt":          Decimal(str(now_ts)),
}


def validate_item(item, lang_label):
    errors = []
    for field in ["title", "subtitle", "excerpt", "moralOrLesson", "lang", "langStoryId"]:
        if not item.get(field):
            errors.append(f"Missing {field}")
    if not item.get("paragraphs") or len(item["paragraphs"]) < 5:
        errors.append(f"Too few paragraphs: {len(item.get('paragraphs', []))}")
    for i, p in enumerate(item.get("paragraphs", [])):
        if not p.get("text") or len(p["text"].strip()) == 0:
            errors.append(f"Empty paragraph at index {i}")

    total_chars = sum(len(p["text"]) for p in item.get("paragraphs", []))
    print(f"  [{lang_label}] Total paragraph characters: {total_chars}")
    print(f"  [{lang_label}] Number of paragraphs: {len(item['paragraphs'])}")

    if errors:
        print(f"  [{lang_label}] VALIDATION FAILED:")
        for e in errors:
            print(f"    - {e}")
        return False
    print(f"  [{lang_label}] Validation passed.")
    return True


def push_item(item, lang_label):
    try:
        table.put_item(Item=item)
        print(f"  [{lang_label}] Successfully pushed to DynamoDB.")
        return True
    except Exception as e:
        print(f"  [{lang_label}] PUSH FAILED: {e}")
        return False


def verify_item(site_id, lang_story_id, lang_label):
    try:
        resp = table.get_item(Key={"siteId": site_id, "langStoryId": lang_story_id})
        item = resp.get("Item")
        if item and item.get("title"):
            print(f'  [{lang_label}] Verified: title = "{item["title"]}"')
            return True
        else:
            print(f"  [{lang_label}] Verification FAILED: item not found")
            return False
    except Exception as e:
        print(f"  [{lang_label}] Verification FAILED: {e}")
        return False


if __name__ == "__main__":
    all_ok = True

    for lang_code in ["zh", "ja", "ko"]:
        print(f"\n{'='*50}")
        print(f"  Processing: {lang_code}")
        print(f"{'='*50}")

        lang_data = data[lang_code]
        item = {**shared, **lang_data}

        if not validate_item(item, lang_code):
            all_ok = False
            continue

        if not push_item(item, lang_code):
            all_ok = False
            continue

        if not verify_item(item["siteId"], item["langStoryId"], lang_code):
            all_ok = False
            continue

    print(f"\n{'='*50}")
    if all_ok:
        print("ALL THREE LANGUAGES PUSHED AND VERIFIED SUCCESSFULLY.")
    else:
        print("SOME PUSHES FAILED. Check output above.")
        sys.exit(1)
    print(f"{'='*50}")
