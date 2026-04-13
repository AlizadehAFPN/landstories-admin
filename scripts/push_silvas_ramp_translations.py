#!/usr/bin/env python3
"""
Push Silva's Ramp story translations (es, fr, de) to DynamoDB.
Each version is a native recreation, not a translation.
"""

import json
import time
import boto3

# AWS config
dynamodb = boto3.client("dynamodb", region_name="eu-north-1")

TABLE = "Story"
SITE_ID = "masada"
STORY_ID = "silvas-ramp"
NOW_TS = str(int(time.time()))

# ── Shared fields (unchanged from English) ──────────────────────────────────

SHARED = {
    "siteId": {"S": SITE_ID},
    "storyId": {"S": STORY_ID},
    "icon": {"S": "\U0001f6e1\ufe0f"},
    "tier": {"S": "A"},
    "source": {
        "S": "Josephus, Flavius. Bellum Judaicum, Book VII, chapters 275-406; "
        "Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; "
        "Richmond, I.A. 'The Roman Siege-Works of Masada, Israel,' Journal of Roman Studies 52, 1962; "
        "Roth, Jonathan. 'The Length of the Siege of Masada,' Scripta Classica Israelica 14, 1995; "
        "UNESCO World Heritage Nomination Dossier #1040, 2001"
    },
    "characters": {
        "L": [
            {"S": "Lucius Flavius Silva Nonius Bassus -- Roman governor of Judaea and commander of the siege"},
            {"S": "Legio X Fretensis -- the Tenth Legion 'of the Strait,' Rome's instrument of destruction"},
            {"S": "Eleazar ben Ya'ir -- leader of the Jewish defenders watching from the summit"},
            {"S": "Thousands of Jewish prisoners of war -- forced to carry water and build the ramp"},
        ]
    },
    "era": {"S": "73 or 74 CE -- the siege lasted approximately two to seven months"},
    "readingTimeMinutes": {"N": "8"},
    "image": {"S": ""},
    "thumbnail": {"S": ""},
    "disabled": {"BOOL": False},
    "coordinates": {"M": {"lng": {"N": "35.3536"}, "lat": {"N": "31.3156"}}},
    "hasAudio": {"BOOL": False},
    "isFree": {"BOOL": True},
    "storyCategory": {"S": "crowns_conquests"},
    "updatedAt": {"N": NOW_TS},
}


def paragraphs(texts: list[str]) -> dict:
    return {"L": [{"M": {"text": {"S": t}}} for t in texts]}


# ═══════════════════════════════════════════════════════════════════════════════
# SPANISH (es)
# Proverb subverted: "A la tercera va la vencida"
# ═══════════════════════════════════════════════════════════════════════════════

ES = {
    **SHARED,
    "lang": {"S": "es"},
    "langStoryId": {"S": "es#silvas-ramp"},
    "title": {"S": "La rampa de Silva"},
    "subtitle": {
        "S": (
            "Roma levantó una de las mayores obras de asedio de la historia "
            "para alcanzar a 960 personas en un acantilado — y arriba solo encontró silencio"
        )
    },
    "excerpt": {
        "S": (
            "Para llegar a 960 rebeldes en la cima de una montaña, Roma desplegó "
            "su mayor legión, levantó ocho campamentos, cercó la fortaleza con un "
            "muro de casi cinco kilómetros y construyó una rampa de asedio tan "
            "colosal que sigue en pie dos mil años después."
        )
    },
    "moralOrLesson": {
        "S": (
            "El poder de un imperio no se mide solo por lo que puede destruir, "
            "sino por lo lejos que está dispuesto a llegar para alcanzar lo que "
            "lo desafía. Roma podría haberse dado la vuelta ante una roca en el "
            "desierto. En cambio, movió una montaña para demostrar que nada — ni "
            "la geografía, ni la determinación, ni la voluntad de hombres "
            "desesperados en un acantilado — podía quedar fuera de su alcance. "
            "La rampa sigue ahí, como prueba de que los imperios gastan más en "
            "dar ejemplo que lo que el ejemplo jamás vale."
        )
    },
    "paragraphs": paragraphs([
        (
            "En el invierno del año 73, el general Flavio Silva se plantó al pie "
            "de un acantilado y miró hacia arriba. Cuatrocientos metros sobre él, "
            "en una meseta de roca llamada Masada, 960 rebeldes judíos ocupaban "
            "la última fortaleza que seguía en pie contra Roma. Jerusalén había "
            "caído tres años antes. El Segundo Templo —corazón de la fe judía— "
            "ardió hasta los cimientos. Todo se había rendido. Todo menos aquella "
            "roca en el desierto de Judea."
        ),
        (
            "Silva no tenía prisa. Era un militar de carrera que luego llegaría "
            "a cónsul, uno de los cargos más altos de Roma, y dirigió aquel "
            "asedio con una paciencia aterradora. Primero, selló la montaña. Sus "
            "hombres levantaron un muro de casi cinco kilómetros alrededor de la "
            "base, con torres y ocho campamentos fortificados. Nadie entraba ni "
            "salía. Esos campamentos aún se ven desde la cima: contornos en el "
            "suelo del desierto como un ejército fantasma congelado en piedra."
        ),
        (
            "Ahora el verdadero problema: ¿cómo subes un ejército por un "
            "acantilado de cuatrocientos metros? El camino del este era demasiado "
            "estrecho. Pero en la cara oeste, una cornisa natural sobresalía cien "
            "metros por debajo de la cima. Los ingenieros de Silva decidieron "
            "construir una rampa desde allí hasta la muralla: setenta y cinco "
            "metros de tierra apisonada, roca triturada y madera, lo bastante "
            "ancha para un ariete. Fue una de las obras más ambiciosas que Roma "
            "intentó jamás."
        ),
        (
            "Aquí la historia se vuelve oscura. Los que cargaban piedras cuesta "
            "arriba no eran solo soldados. Eran prisioneros de guerra judíos, "
            "capturados en batallas anteriores, forzados a construir el arma que "
            "mataría a los suyos. Los defensores los veían desde la cima. Y Roma "
            "lo sabía. Al colocar a los prisioneros en los puntos más expuestos, "
            "nadie arriba podía defenderse sin matar a su propia gente. Era "
            "crueldad calculada disfrazada de ingeniería."
        ),
        (
            "Durante meses, la rampa creció. Con un calor por encima de los "
            "cuarenta grados y agua traída desde manantiales a diez kilómetros, "
            "la obra no paraba. Los defensores solo podían mirar. Cada mañana, "
            "la rampa estaba un poco más cerca. Cada noche, su futuro era un "
            "poco más corto. No iba a llegar ningún rescate. Solo la certeza "
            "lenta y aplastante de que Roma los alcanzaría — no por velocidad "
            "ni sorpresa, sino por pura y aterradora paciencia."
        ),
        (
            "Cuando la rampa llegó al muro, Silva subió una torre de asedio "
            "blindada con hierro y empezó a golpear con un ariete. El muro "
            "exterior cayó. Detrás, los defensores habían rellenado tierra entre "
            "vigas para absorber los golpes. El ariete rebotó. Silva lo incendió. "
            "El viento giró una vez hacia los romanos. Luego cambió de dirección, "
            "y la última barrera ardió hasta desaparecer. Al caer la noche, solo "
            "aire separaba a Roma de Masada."
        ),
        (
            "Al amanecer, la Décima Legión cruzó la brecha. Encontraron silencio. "
            "Según el historiador Josefo, los 960 defensores se habían quitado la "
            "vida antes que rendirse. Dicen que a la tercera va la vencida — "
            "Jerusalén cayó, cada fortaleza se rindió, y Masada era la última "
            "pieza. Pero aquella vencida fue de todos. Silva gastó meses y un "
            "ejército entero para llegar a la cima. Cuando la rampa lo llevó "
            "arriba, no quedaba nadie a quien conquistar."
        ),
        (
            "Esa rampa sigue en pie. Dos mil años de viento, riadas y terremotos "
            "no han podido con ella. Con los campamentos y el muro, forma el "
            "sistema de asedio romano más completo jamás encontrado — mejor "
            "conservado que las obras de César en Alesia. Hoy puedes caminar a "
            "su lado, mirar desde la cima y ver la obsesión de un imperio grabada "
            "en el desierto. Roma gastó más en demostrar algo que lo que esa "
            "demostración jamás valió."
        ),
    ]),
}


# ═══════════════════════════════════════════════════════════════════════════════
# FRENCH (fr)
# Proverb subverted: "Petit à petit, l'oiseau fait son nid"
# ═══════════════════════════════════════════════════════════════════════════════

FR = {
    **SHARED,
    "lang": {"S": "fr"},
    "langStoryId": {"S": "fr#silvas-ramp"},
    "title": {"S": "La rampe de Silva"},
    "subtitle": {
        "S": (
            "Rome a bâti l'un des plus grands ouvrages de siège de l'histoire "
            "pour atteindre 960 personnes sur une falaise — et n'a trouvé que "
            "le silence au sommet"
        )
    },
    "excerpt": {
        "S": (
            "Pour atteindre 960 rebelles retranchés au sommet d'une montagne, "
            "Rome a déployé sa plus grande légion, bâti huit camps, encerclé la "
            "forteresse d'un mur de cinq kilomètres et érigé une rampe de siège "
            "si massive qu'elle tient encore debout deux mille ans plus tard."
        )
    },
    "moralOrLesson": {
        "S": (
            "La puissance d'un empire ne se mesure pas seulement à ce qu'il peut "
            "détruire, mais à ce qu'il est prêt à entreprendre pour atteindre ce "
            "qui le défie. Rome aurait pu tourner le dos à un rocher dans le "
            "désert. Elle a choisi de déplacer une montagne pour prouver que "
            "rien — ni la géographie, ni la détermination, ni la volonté d'hommes "
            "désespérés sur une falaise — ne pouvait échapper à son emprise. La "
            "rampe est toujours là, témoignant que les empires dépensent plus "
            "pour faire un exemple que l'exemple n'en vaut."
        )
    },
    "paragraphs": paragraphs([
        (
            "En l'hiver de l'an 73, un général romain du nom de Flavius Silva "
            "se tenait au pied d'une falaise et levait les yeux. Quatre cents "
            "mètres au-dessus de lui, sur un plateau rocheux nommé Massada, "
            "960 rebelles juifs occupaient la dernière forteresse encore debout "
            "face à Rome. Jérusalem était tombée trois ans plus tôt. Le Second "
            "Temple — le cœur du culte juif — avait brûlé jusqu'aux fondations. "
            "Chaque bastion s'était rendu. Sauf ce rocher au milieu du désert "
            "de Judée."
        ),
        (
            "Silva n'était pas pressé. Militaire de carrière qui deviendrait "
            "consul, il mena ce siège avec une patience terrifiante. D'abord, "
            "il verrouilla la montagne. Ses hommes bâtirent un mur de cinq "
            "kilomètres autour de la base, avec des tours et huit camps fortifiés. "
            "Personne n'entrait ni ne sortait. Ces camps se voient encore depuis "
            "le sommet : des empreintes dans le désert, comme une armée fantôme "
            "figée dans la pierre."
        ),
        (
            "Restait le vrai problème : comment faire monter une armée sur une "
            "falaise de quatre cents mètres ? Le sentier est était trop étroit. "
            "Mais sur le flanc ouest, un éperon rocheux naturel s'avançait à "
            "cent mètres sous le sommet. Les ingénieurs de Silva décidèrent de "
            "bâtir une rampe de là jusqu'au rempart : soixante-quinze mètres de "
            "terre tassée, de pierre concassée et de bois, assez large pour un "
            "bélier. Ce fut l'un des chantiers les plus ambitieux que Rome ait "
            "jamais entrepris."
        ),
        (
            "C'est là que l'histoire bascule. Ceux qui charriaient des pierres "
            "sur cette pente n'étaient pas que des soldats. C'étaient des "
            "prisonniers de guerre juifs, capturés dans des batailles précédentes, "
            "contraints de construire l'arme qui tuerait les leurs. Les défenseurs "
            "les voyaient depuis le sommet. Et Rome le savait. En plaçant ces "
            "prisonniers aux endroits les plus exposés, personne là-haut ne "
            "pouvait riposter sans tuer les siens. C'était de la cruauté calculée "
            "déguisée en génie militaire."
        ),
        (
            "Pendant des mois, la rampe monta. Sous un soleil à plus de quarante "
            "degrés, avec de l'eau acheminée depuis dix kilomètres, le chantier "
            "ne s'arrêtait jamais. Les défenseurs ne pouvaient que regarder. "
            "Chaque matin, la rampe était un peu plus proche. Chaque soir, leur "
            "avenir un peu plus court. Aucun secours ne viendrait. Rien que la "
            "certitude écrasante que Rome les atteindrait — pas par la vitesse, "
            "mais par une patience terrifiante."
        ),
        (
            "Quand la rampe atteignit le rempart, Silva fit monter une tour de "
            "siège bardée de fer et lança un bélier contre le mur. La muraille "
            "extérieure céda. Derrière, les défenseurs avaient tassé de la terre "
            "entre des poutres pour amortir ce que la pierre ne pouvait pas. Le "
            "bélier rebondit. Alors Silva y mit le feu. Le vent tourna une fois "
            "vers les Romains. Puis il changea, et la dernière barrière partit "
            "en fumée. À la tombée de la nuit, seul l'air séparait Rome de "
            "Massada."
        ),
        (
            "À l'aube, la dixième légion franchit la brèche. Elle trouva le "
            "silence. Selon l'historien Josèphe, les 960 défenseurs s'étaient "
            "donné la mort plutôt que de se rendre. On dit que petit à petit, "
            "l'oiseau fait son nid. Rome a bâti le sien pierre après pierre, "
            "jour après jour — sauf qu'au sommet, le nid était vide. Silva avait "
            "dépensé des mois et une légion entière. Quand la rampe le porta "
            "là-haut, il ne restait personne à conquérir."
        ),
        (
            "Cette rampe tient toujours. Deux mille ans de vent, de crues et de "
            "séismes n'en sont pas venus à bout. Avec les camps et le mur, elle "
            "forme le système de siège romain le plus complet jamais découvert "
            "— mieux conservé que les ouvrages de César à Alésia. On peut la "
            "longer aujourd'hui, regarder depuis le sommet et voir l'obsession "
            "d'un empire gravée dans le désert. Rome a dépensé plus pour faire "
            "un exemple que l'exemple n'en valait."
        ),
    ]),
}


# ═══════════════════════════════════════════════════════════════════════════════
# GERMAN (de)
# Proverb subverted: "Steter Tropfen höhlt den Stein"
# ═══════════════════════════════════════════════════════════════════════════════

DE = {
    **SHARED,
    "lang": {"S": "de"},
    "langStoryId": {"S": "de#silvas-ramp"},
    "title": {"S": "Silvas Rampe"},
    "subtitle": {
        "S": (
            "Rom errichtete eines der größten Belagerungswerke der Geschichte, "
            "um 960 Menschen auf einer Klippe zu erreichen — und fand oben nur "
            "Stille"
        )
    },
    "excerpt": {
        "S": (
            "Um 960 Rebellen auf einem Berggipfel zu erreichen, setzte Rom seine "
            "stärkste Legion ein, errichtete acht Lager, umschloss die Festung "
            "mit einer fünf Kilometer langen Mauer und baute eine Belagerungsrampe, "
            "die so gewaltig war, dass sie zweitausend Jahre später noch steht."
        )
    },
    "moralOrLesson": {
        "S": (
            "Die Macht eines Imperiums misst sich nicht nur an dem, was es "
            "zerstören kann, sondern daran, wie weit es geht, um das zu "
            "erreichen, was ihm trotzt. Rom hätte einem Felsen in der Wüste den "
            "Rücken kehren können. Stattdessen versetzte es einen Berg, um zu "
            "beweisen, dass nichts — nicht die Geographie, nicht die "
            "Entschlossenheit, nicht der Wille verzweifelter Menschen auf einer "
            "Klippe — sich seinem Zugriff entziehen konnte. Die Rampe steht noch, "
            "als Beweis dafür, dass Imperien mehr ausgeben, um ein Zeichen zu "
            "setzen, als das Zeichen je wert ist."
        )
    },
    "paragraphs": paragraphs([
        (
            "Im Winter des Jahres 73 stand ein römischer General namens Flavius "
            "Silva am Fuß einer Klippe und blickte hinauf. Vierhundert Meter "
            "über ihm hielten 960 jüdische Rebellen auf einem Felsplateau namens "
            "Masada die letzte Festung, die sich Rom widersetzte. Jerusalem war "
            "drei Jahre zuvor gefallen. Der Zweite Tempel — das Herz des "
            "jüdischen Glaubens — war niedergebrannt. Jede Stellung hatte "
            "kapituliert. Nur dieser Felsen in der Wüste Judäas weigerte sich."
        ),
        (
            "Silva hatte keine Eile. Er war Berufssoldat, der später Konsul "
            "werden sollte, und er führte diese Belagerung mit einer Geduld, die "
            "das Blut gefrieren ließ. Zuerst riegelte er den Berg ab. Seine "
            "Männer bauten eine Mauer von fast fünf Kilometern um die Basis, mit "
            "Wachtürmen und acht befestigten Lagern. Niemand kam rein, niemand "
            "raus. Diese Lager sind heute noch von Masadas Gipfel zu sehen: "
            "Umrisse im Wüstenboden wie eine Geisterarmee, erstarrt in Stein."
        ),
        (
            "Nun das eigentliche Problem: Wie bringt man eine Armee eine "
            "vierhundert Meter hohe Klippe hinauf? Der Pfad im Osten war zu "
            "schmal. Aber auf der Westseite ragte ein natürlicher Felsvorsprung "
            "hundert Meter unter dem Gipfel heraus. Silvas Ingenieure beschlossen, "
            "von dort eine Rampe zur Mauer zu bauen: fünfundsiebzig Meter Erde, "
            "Stein und Holz, breit genug für einen Rammbock. Es war eines der "
            "ehrgeizigsten Bauprojekte, die Rom je in Angriff nahm."
        ),
        (
            "Hier wird die Geschichte finster. Die Arbeiter auf der Rampe waren "
            "nicht nur Soldaten. Es waren jüdische Kriegsgefangene — in früheren "
            "Schlachten gefangen, gezwungen, die Waffe zu bauen, die ihre eigenen "
            "Leute töten würde. Die Verteidiger sahen sie vom Gipfel. Und Rom "
            "wusste das. Indem man die Gefangenen an die exponiertesten Stellen "
            "stellte, konnte sich oben niemand wehren, ohne die eigenen Leute zu "
            "töten. Kalkulierte Grausamkeit, verkleidet als Ingenieurskunst."
        ),
        (
            "Monatelang wuchs die Rampe. Bei Hitze über vierzig Grad, mit "
            "Wasser, das von Quellen zehn Kilometer entfernt herangeschafft "
            "werden musste, stand die Arbeit nie still. Die Verteidiger konnten "
            "nur zusehen. Jeden Morgen war die Rampe ein Stück näher. Jeden "
            "Abend ihre Zukunft ein Stück kürzer. Keine Rettung würde kommen. "
            "Nur die langsame, erdrückende Gewissheit, dass Rom sie erreichen "
            "würde — nicht durch Schnelligkeit oder Überraschung, sondern durch "
            "schiere, furchteinflößende Geduld."
        ),
        (
            "Als die Rampe die Mauer erreichte, rollte Silva einen mit Eisen "
            "gepanzerten Belagerungsturm hinauf und ließ den Rammbock hämmern. "
            "Die äußere Mauer brach. Dahinter hatten die Verteidiger Erde "
            "zwischen Balken gestampft, um die Schläge abzufangen. Der Rammbock "
            "prallte ab. Silva legte Feuer. Der Wind drehte einmal Richtung "
            "Römer. Dann wechselte er, und die letzte Barriere ging in Flammen "
            "auf. Bei Einbruch der Nacht trennte nur Luft Rom von Masada."
        ),
        (
            "Im Morgengrauen stürmte die Zehnte Legion durch die Bresche. Sie "
            "fand Stille. Laut dem Historiker Josephus hatten sich die 960 "
            "Verteidiger das Leben genommen, statt sich zu ergeben. Steter "
            "Tropfen höhlt den Stein, sagt man — Rom war dieser Tropfen, geduldig "
            "und unerbittlich, Tag um Tag. Am Ende war der Stein ausgehöhlt. Aber "
            "innen war nichts. Silva hatte Monate und eine ganze Legion "
            "aufgewendet. Als die Rampe ihn hinauftrug, war niemand mehr da."
        ),
        (
            "Diese Rampe steht noch. Zweitausend Jahre Wind, Sturzfluten und "
            "Erdbeben haben sie nicht bezwungen. Mit den Lagern und der Mauer "
            "bildet sie das vollständigste römische Belagerungssystem, das je "
            "gefunden wurde — besser erhalten als Caesars berühmte Anlagen bei "
            "Alesia. Man kann heute neben ihr hergehen, vom Gipfel schauen und "
            "die Besessenheit eines Imperiums sehen, noch immer eingebrannt in "
            "den Wüstenboden. Rom gab mehr aus, um ein Zeichen zu setzen, als "
            "das Zeichen je wert war."
        ),
    ]),
}


# ═══════════════════════════════════════════════════════════════════════════════
# VALIDATION & PUSH
# ═══════════════════════════════════════════════════════════════════════════════

def validate_item(item: dict, lang: str) -> None:
    """Validate constraints before pushing."""
    paras = item["paragraphs"]["L"]
    total_chars = 0

    for i, p in enumerate(paras):
        text = p["M"]["text"]["S"]
        char_count = len(text)
        word_count = len(text.split())
        total_chars += char_count

        if char_count > 500:
            print(f"  WARNING [{lang}] P{i+1}: {char_count} chars (max 500)")
        if word_count > 100:
            print(f"  WARNING [{lang}] P{i+1}: {word_count} words (max 100)")

    para_count = len(paras)
    print(f"  [{lang}] {para_count} paragraphs, {total_chars} total chars")

    if para_count < 6 or para_count > 10:
        print(f"  WARNING [{lang}] paragraph count {para_count} outside 6-10 range")
    if total_chars < 2400 or total_chars > 4200:
        print(f"  WARNING [{lang}] total chars {total_chars} outside expected range")

    # Validate JSON serialization (catches encoding issues)
    json.dumps(item, ensure_ascii=False)
    print(f"  [{lang}] JSON serialization OK")


def push_item(item: dict, lang: str) -> None:
    """Push a single item to DynamoDB."""
    print(f"\nPushing {lang}...")
    validate_item(item, lang)

    response = dynamodb.put_item(TableName=TABLE, Item=item)
    status = response["ResponseMetadata"]["HTTPStatusCode"]
    if status == 200:
        print(f"  [{lang}] SUCCESS (HTTP {status}) -> {item['langStoryId']['S']}")
    else:
        print(f"  [{lang}] FAILED (HTTP {status})")
        print(f"  Response: {json.dumps(response, indent=2)}")


if __name__ == "__main__":
    print("=" * 60)
    print("Pushing Silva's Ramp translations to DynamoDB")
    print(f"Table: {TABLE} | Site: {SITE_ID} | Timestamp: {NOW_TS}")
    print("=" * 60)

    for lang, item in [("es", ES), ("fr", FR), ("de", DE)]:
        push_item(item, lang)

    print("\n" + "=" * 60)
    print("All done.")
    print("=" * 60)
