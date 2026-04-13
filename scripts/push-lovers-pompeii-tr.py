#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Push Turkish version of 'The Lovers of Pompeii' to DynamoDB."""

import boto3
import time
import json
from decimal import Decimal

dynamodb = boto3.resource("dynamodb", region_name="eu-north-1")
table = dynamodb.Table("Story")

item = {
    "siteId": "pompeii",
    "langStoryId": "tr#lovers-of-pompeii",
    "storyId": "lovers-of-pompeii",
    "lang": "tr",
    "title": "Pompeii\u2019nin A\u015f\u0131klar\u0131",
    "subtitle": "Bir yanarda\u011f\u0131 bile yenen kucakla\u015fma \u2014 ve y\u00fcz y\u0131l s\u00fcren yan\u0131lg\u0131m\u0131z",
    "excerpt": "MS 79\u2019da Vez\u00fcv Yanarda\u011f\u0131 patlad\u0131\u011f\u0131nda Pompeii k\u00fcl ve k\u0131zg\u0131n gaz\u0131n alt\u0131na g\u00f6m\u00fcld\u00fc. Binlerce insan tek ad\u0131m bile atamadan \u00f6ld\u00fc.",
    "icon": "\U0001f494",
    "image": "",
    "thumbnail": "",
    "isFree": True,
    "disabled": False,
    "hasAudio": False,
    "tier": "A",
    "era": "79 AD (reanalyzed 2017)",
    "storyCategory": "lost_found",
    "readingTimeMinutes": 3,
    "source": "Lazer, Estelle. Resurrecting Pompeii, 2009; University of Florence DNA study, 2017; National Geographic coverage",
    "characters": ["The Two Embracing Figures (unidentified males, ages 18-20)"],
    "coordinates": {
        "lat": Decimal("40.749"),
        "lng": Decimal("14.4875"),
    },
    "updatedAt": int(time.time()),
    "moralOrLesson": (
        "Sevgi ne \u015fekle girerse girsin, her \u015fey y\u0131k\u0131l\u0131rken en son "
        "tutundu\u011fumuz \u015fey odur. Ve \u00f6l\u00fcler hakk\u0131nda anlatt\u0131\u011f\u0131m\u0131z "
        "hik\u00e2yeler, onlardan \u00e7ok bizi anlat\u0131r."
    ),
    "paragraphs": [
        {
            "text": (
                "MS 79 y\u0131l\u0131nda Vez\u00fcv Yanarda\u011f\u0131 patlad\u0131 ve Pompeii\u2019yi "
                "volkanik k\u00fcl ile k\u0131zg\u0131n gaz yuttu. Binlerce insan tek ad\u0131m bile "
                "atamadan \u00f6ld\u00fc. Y\u00fczy\u0131llar sonra arkeologlar sertle\u015fmi\u015f k\u00fcl\u00fcn "
                "i\u00e7inde garip bir \u015fey fark etti: cesetler \u00e7oktan yok olmu\u015ftu ama insan "
                "\u015feklinde bo\u015fluklar kalm\u0131\u015ft\u0131. Bu bo\u015fluklara al\u00e7\u0131 d\u00f6k\u00fcnce "
                "insanlar tam o son anlar\u0131ndaki halleriyle yeniden belirdi. Y\u00fczlerce kal\u0131b\u0131n "
                "aras\u0131ndan bir tanesi herkesi oldu\u011fu yerde dondurdu: iki ki\u015fi birbirine "
                "sar\u0131lm\u0131\u015f \u2014 biri di\u011ferini korur gibi, her \u015fey biterken bile b\u0131rakmam\u0131\u015f."
            )
        },
        {
            "text": (
                "Y\u00fcz y\u0131l\u0131 a\u015fk\u0131n s\u00fcre boyunca herkes onlara \u201c\u0130ki Bakire\u201d dedi. "
                "Hik\u00e2ye belli gibiydi: iki gen\u00e7 kad\u0131n \u2014 belki k\u0131z karde\u015f, belki anne "
                "k\u0131z \u2014 \u00f6l\u00fcm gelirken birbirine tutunmu\u015f. Duru\u015flar\u0131 zarif, bedenleri "
                "narin g\u00f6r\u00fcn\u00fcyordu. 1800\u2019lerde onlar\u0131 inceleyen ara\u015ft\u0131rmac\u0131lar "
                "sorgulamaya gerek bile duymad\u0131. Nesiller boyunca rehberler ayn\u0131 hik\u00e2yeyi "
                "tekrarlad\u0131. \u201c\u0130ki Bakire\u201d Pompeii\u2019nin en bilinen simgelerinden biri "
                "oldu \u2014 k\u00fcle g\u00f6m\u00fclm\u00fc\u015f bir sadakat tablosu."
            )
        },
        {
            "text": (
                "Sonra 2017 geldi. Floransa \u00dcniversitesi\u2019nden bir ekip kal\u0131plara BT "
                "taramas\u0131 ve DNA testi uygulad\u0131 \u2014 fig\u00fcrler ilk bulundu\u011funda hayal bile "
                "edilemeyecek teknolojiler. Sonu\u00e7lar y\u00fcz y\u0131l\u0131 a\u015fk\u0131n varsay\u0131m\u0131 yerle "
                "bir etti. \u0130ki Bakire, bakire de\u011fildi. \u0130kisi de erkekti. \u0130kisi de gen\u00e7 \u2014 "
                "on sekiz ile yirmi ya\u015f aras\u0131nda. \u0130ki delikanl\u0131, yanarda\u011f \u00e7evrelerindeki "
                "herkesi \u00f6ld\u00fcr\u00fcrken birbirine sar\u0131lm\u0131\u015f."
            )
        },
        {
            "text": (
                "Haber her yere bomba gibi d\u00fc\u015ft\u00fc. Herkesin akl\u0131na ayn\u0131 soru geldi: "
                "bu iki gen\u00e7 adam birbirine neydi? Bilim buna cevap veremedi. Karde\u015f "
                "olabilirlerdi. Yak\u0131n arkada\u015f. Sevgili. Antik Roma\u2019da erkekler aras\u0131ndaki "
                "romantik ili\u015fkiler yayg\u0131n ve a\u00e7\u0131k\u00e7a kabul g\u00f6ren bir \u015feydi \u2014 toplumun "
                "s\u0131n\u0131f ve stat\u00fcye dayal\u0131 kat\u0131 kurallar\u0131 olsa da. Bu ikisi birbirine her "
                "\u015fey olabilirdi. K\u00fcl bedenlerini korudu, hik\u00e2yelerini de\u011fil."
            )
        },
        {
            "text": (
                "\u201cDost kara g\u00fcnde belli olur\u201d derler. Ama o sabah kara olan sadece g\u00fcn "
                "de\u011fildi \u2014 g\u00f6ky\u00fcz\u00fcn\u00fcn kendisi karanl\u0131\u011fa g\u00f6m\u00fcld\u00fc, hava zehre d\u00f6nd\u00fc. "
                "Ve bu iki gen\u00e7 adam birbirini b\u0131rakmay\u0131 reddetti. Biri di\u011ferinin \u00fczerine "
                "kapanm\u0131\u015f, y\u00fcz\u00fcn\u00fc bedenine g\u00f6mm\u00fc\u015f, kollar\u0131n\u0131 s\u0131ms\u0131k\u0131 sarm\u0131\u015f. Bu "
                "duru\u015fun bir etikete ihtiyac\u0131 yok. Karde\u015fler b\u00f6yle yapar. Dostlar b\u00f6yle "
                "yapar. A\u015f\u0131klar b\u00f6yle yapar. Sevdi\u011fin birinin yaln\u0131z \u00f6lmesine izin "
                "vermemek \u2014 i\u015fte bu."
            )
        },
        {
            "text": (
                "Y\u00fczy\u0131ll\u0131k hata ba\u015fl\u0131 ba\u015f\u0131na bir ders oldu: insan g\u00f6rmek istedi\u011fini "
                "g\u00f6r\u00fcr. 1800\u2019lerin ara\u015ft\u0131rmac\u0131lar\u0131 \u015fefkat g\u00f6rd\u00fc, \u201ckad\u0131n\u201d varsayd\u0131. "
                "\u0130ki erke\u011fin birbirine b\u00f6yle sar\u0131labilece\u011fi ak\u0131llar\u0131n\u0131n ucundan bile "
                "ge\u00e7medi. Bu yanl\u0131\u015f, k\u00fcldeki iki fig\u00fcrden \u00e7ok onlara bakanlara dair bir "
                "\u015fey s\u00f6yl\u00fcyordu."
            )
        },
        {
            "text": (
                "Bug\u00fcn onlara bazen \u201cPompeii\u2019nin A\u015f\u0131klar\u0131\u201d deniyor \u2014 ama resmi bir "
                "isim, kesin bir tan\u0131m yok. Her nesil bu kucakla\u015fmay\u0131 kendi penceresinden "
                "okuyor. G\u00f6r\u00fcnt\u00fc de\u011fi\u015fmiyor ama. \u0130ki gen\u00e7 adam, yirmisine bile basmam\u0131\u015f, "
                "hayatlar\u0131n\u0131n son sabah\u0131nda birbirine sar\u0131lm\u0131\u015f. \u0130ster karde\u015flik deyin, "
                "ister dostluk, ister a\u015fk \u2014 k\u00fcl\u00fcn umurunda de\u011fil. B\u0131rakmad\u0131lar. "
                "Hik\u00e2yenin tamam\u0131 bu."
            )
        },
    ],
}

# Validate
print("=== TURKISH STORY VALIDATION ===")
print(f"Title: {item['title']}")
print(f"Subtitle: {item['subtitle']}")
print(f"Excerpt: {item['excerpt']}")
print(f"Moral: {item['moralOrLesson']}")
print(f"Paragraphs: {len(item['paragraphs'])}")
for i, p in enumerate(item['paragraphs']):
    t = p['text']
    print(f"\nP{i+1} ({len(t)} chars, ~{len(t.split())} words):")
    print(t)

total = sum(len(p['text']) for p in item['paragraphs'])
print(f"\n=== Total paragraph chars: {total} ===")

# Push
print("\n=== PUSHING TO DYNAMODB ===")
response = table.put_item(Item=item)
status = response['ResponseMetadata']['HTTPStatusCode']
print(f"PUT status: {status}")
if status == 200:
    print("SUCCESS: Turkish story pushed!")
else:
    print(f"UNEXPECTED: {status}")

# Verify
print("\n=== VERIFICATION ===")
v = table.get_item(Key={"siteId": "pompeii", "langStoryId": "tr#lovers-of-pompeii"})
if 'Item' in v:
    rec = v['Item']
    print(f"Title: {rec['title']}")
    print(f"Lang: {rec['lang']}")
    print(f"Paragraphs: {len(rec['paragraphs'])}")
    print(f"storyId: {rec['storyId']}")
    print("VERIFIED OK!")
else:
    print("ERROR: Record not found!")
