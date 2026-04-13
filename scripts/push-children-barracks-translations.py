#!/usr/bin/env python3
"""
Push es/fr/de versions of "The Children's Barracks" to DynamoDB Story table.
Each version is recreated natively, not translated.
"""
import boto3
import time
import json
import sys

# AWS config
session = boto3.Session(region_name="eu-north-1")
dynamodb = session.resource("dynamodb")
table = dynamodb.Table("Story")

NOW = int(time.time())

# ============================================================
# Shared fields (identical across all languages)
# ============================================================
SHARED = {
    "siteId": "auschwitz-birkenau",
    "storyId": "children-of-auschwitz",
    "icon": "\U0001f54a\ufe0f",  # 🕊️
    "tier": "A",
    "storyCategory": "ghosts_curses",
    "source": "Eva Mozes Kor, Surviving the Angel of Death; Auschwitz-Birkenau Memorial archives; USC Shoah Foundation testimonies",
    "readingTimeMinutes": 4,
    "image": "",
    "thumbnail": "",
    "coordinates": {"lng": "19.179", "lat": "50.0345"},
    "hasAudio": False,
    "isFree": True,
    "disabled": False,
    "updatedAt": NOW,
}

# ============================================================
# SPANISH (es)
# ============================================================
# Cultural proverb: "Dios aprieta pero no ahorca"
# (God squeezes but doesn't strangle — meaning there's always hope)
# Subverted: In Auschwitz, many felt God wasn't even at the
# other end of the rope.
# ============================================================

es_story = {
    **SHARED,
    "lang": "es",
    "langStoryId": "es#children-of-auschwitz",
    "title": "El barracón de los niños",
    "subtitle": "Los gemelos de Mengele — y la superviviente que eligió el perdón como arma",
    "excerpt": "Durante la Segunda Guerra Mundial, los nazis levantaron Auschwitz-Birkenau en la Polonia ocupada: el campo de exterminio más grande de la historia. Enviaron allí a 232.000 niños. Más de 200.000 fueron asesinados el día que llegaron.",
    "moralOrLesson": "El perdón no es un veredicto sobre el verdugo, sino una declaración de libertad de la víctima. Elegir soltar las cadenas del odio es el último acto de supervivencia.",
    "era": "Segunda Guerra Mundial (1944-1945) y testimonios de posguerra",
    "characters": [
        "Eva Mozes Kor",
        "Miriam Mozes",
        "Josef Mengele",
        "Hans Münch",
        "Los 1.500 pares de gemelos",
    ],
    "paragraphs": [
        {
            "text": "Durante la Segunda Guerra Mundial, los nazis levantaron Auschwitz-Birkenau en la Polonia ocupada: el campo de exterminio más grande de la historia. Enviaron allí a 232.000 niños. Más de 200.000 fueron asesinados el día que llegaron, sacados de los trenes y llevados a las cámaras de gas junto a sus padres y abuelos. No por algo que hubieran hecho. Solo por quiénes eran."
        },
        {
            "text": "Pero algunos niños no iban a las cámaras de gas. Los apartaba Josef Mengele, un médico de las SS al que los presos llamaban el «Ángel de la Muerte». Mengele estaba obsesionado con los gemelos. Cuando los trenes llegaban a la plataforma de Birkenau, recorría las filas de familias aterradas gritando «Zwillinge! Zwillinge!» —gemelos, en alemán— y arrancaba a los niños de los brazos de sus madres para llevarlos a su barracón de experimentos."
        },
        {
            "text": "Por el barracón de Mengele pasaron unos 1.500 pares de gemelos. Lo que les hacía no era medicina: era tortura con bata blanca. Inyectaba tinte en los ojos de niños para cambiarles el color. Intercambiaba sangre entre gemelos de distintos tipos. Infectaba a uno con una enfermedad para compararlo con el sano. Cuando un gemelo moría —y muchos morían—, mataba al otro para comparar los cuerpos. Sobrevivieron menos de 200."
        },
        {
            "text": "Dos de esos supervivientes fueron Eva y Miriam Mozes, gemelas de diez años del pueblo de Portz, en Transilvania, en lo que hoy es Rumanía. Llegaron a Auschwitz en 1944. Sus padres y sus dos hermanas mayores fueron gaseados ese mismo día. A Eva y Miriam las llevaron al barracón de Mengele, donde durante meses soportaron inyecciones, extracciones de sangre y pruebas que no podían entender. Las inyecciones dañaron los riñones de Miriam, un daño que la acompañaría toda la vida."
        },
        {
            "text": "Cuando el Ejército Rojo liberó el campo en enero de 1945, Eva empezó a convivir con lo que Auschwitz le había hecho por dentro. Las pesadillas. La rabia. La culpa de sobrevivir cuando su familia no lo hizo. Dicen que Dios aprieta pero no ahorca — pero en Auschwitz, muchos sintieron que ni Dios quedaba al otro lado de la cuerda. Durante cincuenta años cargó con esas heridas. Hasta que en 1995 tomó una decisión que sacudió al mundo."
        },
        {
            "text": "Perdonó a los nazis."
        },
        {
            "text": "En Auschwitz, en el cincuenta aniversario de la liberación, junto a Hans Münch, un médico alemán que había trabajado en el campo, Eva leyó una declaración de perdón en voz alta y la firmó ante las cámaras. La reacción fue brutal. Otros supervivientes estaban furiosos. Algunos dijeron que solo los muertos podían perdonar, y los muertos callaban. Otros, que estaba dejando escapar a los asesinos."
        },
        {
            "text": "La respuesta de Eva nunca cambió: «No perdono porque lo merezcan, sino porque yo lo merezco. Merezco ser libre de este dolor». Para ella, perdonar no era excusar lo que pasó. Era negarse a que Mengele —muerto hacía años— siguiera controlando su vida. «La rabia y el odio son semillas de guerra», decía. «El perdón es la semilla de la paz». No le pedía a nadie que perdonara. Elegía su propia libertad."
        },
        {
            "text": "Eva Mozes Kor murió en 2019, a los ochenta y cinco años, durante una visita a Auschwitz. Había vuelto decenas de veces, guiando a estudiantes por las mismas puertas, contando su historia en los barracones donde la encerraron de niña. Todavía se discute si tenía razón. Pero su idea —que el perdón es algo que haces por ti, no por quien te hizo daño— es una de las cosas más poderosas que han salido del lugar más oscuro de la tierra."
        },
    ],
}

# ============================================================
# FRENCH (fr)
# ============================================================
# Cultural proverb: "Jamais deux sans trois"
# (Never two without three — bad things/good things come in threes)
# Subverted: Eva lost everything twice — family, then childhood.
# The third thing should have been despair. It was something
# else entirely.
# ============================================================

fr_story = {
    **SHARED,
    "lang": "fr",
    "langStoryId": "fr#children-of-auschwitz",
    "title": "La baraque des enfants",
    "subtitle": "Les jumeaux de Mengele — et la survivante qui a fait du pardon une arme",
    "excerpt": "Pendant la Seconde Guerre mondiale, les nazis ont bâti Auschwitz-Birkenau en Pologne occupée : le plus grand camp d'extermination de l'histoire. Environ 232 000 enfants y ont été envoyés. Plus de 200 000 ont été tués le jour de leur arrivée.",
    "moralOrLesson": "Le pardon n'est pas un verdict sur le bourreau, mais une déclaration de liberté de la victime. Choisir de se libérer de la prison de la haine est le dernier acte de survie.",
    "era": "Seconde Guerre mondiale (1944-1945) et témoignages d'après-guerre",
    "characters": [
        "Eva Mozes Kor",
        "Miriam Mozes",
        "Josef Mengele",
        "Hans Münch",
        "Les 1 500 paires de jumeaux",
    ],
    "paragraphs": [
        {
            "text": "Pendant la Seconde Guerre mondiale, les nazis ont bâti Auschwitz-Birkenau en Pologne occupée : le plus grand camp d'extermination de l'histoire. Environ 232 000 enfants y ont été envoyés. Plus de 200 000 ont été tués le jour de leur arrivée — conduits des trains aux chambres à gaz avec leurs parents, leurs grands-parents. Pas pour ce qu'ils avaient fait. Pour ce qu'ils étaient."
        },
        {
            "text": "Mais certains enfants échappaient aux chambres à gaz. Josef Mengele, médecin SS que les prisonniers surnommaient l'« Ange de la Mort », les repérait à l'arrivée. Obsédé par les jumeaux, il arpentait les rangs de familles terrorisées en criant « Zwillinge ! Zwillinge ! » — jumeaux, en allemand — et arrachait les enfants des bras de leurs mères pour les emmener dans sa baraque."
        },
        {
            "text": "Environ 1 500 paires de jumeaux sont passées par sa baraque. Ce qu'il leur faisait n'avait rien de médical : c'était de la torture en blouse blanche. Injections de colorant dans les yeux. Échanges de sang entre jumeaux de groupes différents. Infection volontaire de l'un pour le comparer à l'autre resté sain. Quand un jumeau mourait — et beaucoup mouraient —, il tuait l'autre sur-le-champ pour comparer les corps. Moins de 200 ont survécu."
        },
        {
            "text": "Parmi eux : Eva et Miriam Mozes, jumelles de dix ans d'un village de Transylvanie, dans l'actuelle Roumanie. Arrivées à Auschwitz en 1944. Leurs parents et deux grandes sœurs gazés le jour même. Pendant des mois, dans la baraque de Mengele, elles ont subi injections, prises de sang et tests incompréhensibles. Les injections ont détruit les reins de Miriam — des séquelles qui ne l'ont jamais quittée."
        },
        {
            "text": "Après la libération du camp par l'Armée rouge en janvier 1945, Eva a vécu cinquante ans avec ce qu'Auschwitz lui avait laissé. Les cauchemars. La rage. La culpabilité d'avoir survécu quand sa famille, non. Jamais deux sans trois, dit-on — Eva avait tout perdu deux fois : sa famille, puis son enfance. La troisième chose aurait dû être le désespoir. Ce fut tout autre chose."
        },
        {
            "text": "Elle a pardonné aux nazis."
        },
        {
            "text": "À Auschwitz, pour le cinquantième anniversaire de la libération, aux côtés d'un médecin allemand nommé Hans Münch, Eva a lu une déclaration de pardon et l'a signée devant les caméras. La réaction a été violente. D'autres survivants étaient furieux. Certains ont dit que seuls les morts pouvaient pardonner, et que les morts se taisaient à jamais. D'autres, qu'elle laissait les bourreaux s'en tirer."
        },
        {
            "text": "Sa réponse n'a jamais changé : « Je ne pardonne pas parce qu'ils le méritent, mais parce que moi, je le mérite. Je mérite d'être libre de cette douleur. » Pour elle, pardonner ne voulait pas dire excuser. C'était refuser que Mengele — mort depuis des années — continue de diriger sa vie. « La colère et la haine sont des graines de guerre. Le pardon est la graine de la paix. » Elle ne demandait à personne d'en faire autant. Elle choisissait sa liberté."
        },
        {
            "text": "Eva Mozes Kor est morte en 2019, à quatre-vingt-cinq ans, lors d'un retour à Auschwitz. Elle y était revenue des dizaines de fois, guidant des étudiants à travers les mêmes portes, racontant son histoire dans les mêmes baraques. On débat encore. Mais son idée — que le pardon, on le fait pour soi, pas pour celui qui nous a blessés — reste l'une des choses les plus puissantes sorties du lieu le plus sombre de la terre."
        },
    ],
}

# ============================================================
# GERMAN (de)
# ============================================================
# Cultural proverb: "Aller guten Dinge sind drei"
# (All good things come in threes)
# Subverted: What hit Eva three times was nothing good — the
# loss of family, childhood, and trust in the world.
# ============================================================

de_story = {
    **SHARED,
    "lang": "de",
    "langStoryId": "de#children-of-auschwitz",
    "title": "Die Baracke der Kinder",
    "subtitle": "Mengeles Zwillinge — und die Überlebende, die Vergebung zu ihrer Waffe machte",
    "excerpt": "Während des Zweiten Weltkriegs errichteten die Nazis Auschwitz-Birkenau im besetzten Polen: das größte Vernichtungslager der Geschichte. Rund 232.000 Kinder wurden dorthin verschleppt. Mehr als 200.000 wurden am Tag ihrer Ankunft ermordet.",
    "moralOrLesson": "Vergebung ist kein Urteil über den Täter, sondern eine Freiheitserklärung des Opfers. Sich aus dem Gefängnis des Hasses zu befreien ist der letzte Akt des Überlebens.",
    "era": "Zweiter Weltkrieg (1944-1945) und Nachkriegszeugnisse",
    "characters": [
        "Eva Mozes Kor",
        "Miriam Mozes",
        "Josef Mengele",
        "Hans Münch",
        "Die 1.500 Zwillingspaare",
    ],
    "paragraphs": [
        {
            "text": "Während des Zweiten Weltkriegs errichteten die Nazis Auschwitz-Birkenau im besetzten Polen: das größte Vernichtungslager der Geschichte. Rund 232.000 Kinder wurden dorthin verschleppt. Mehr als 200.000 wurden am Tag ihrer Ankunft ermordet — von den Zügen direkt in die Gaskammern, zusammen mit ihren Eltern und Großeltern. Nicht für etwas, das sie getan hatten. Nur dafür, wer sie waren."
        },
        {
            "text": "Aber manche Kinder gingen nicht in die Gaskammern. Josef Mengele, ein SS-Arzt, den die Häftlinge den \u201eTodesengel\u201c nannten, fischte sie heraus. Mengele war besessen von Zwillingen. Wenn die überfüllten Züge an der Rampe von Birkenau hielten, ging er die Reihen verängstigter Familien ab und rief \u201eZwillinge! Zwillinge!\u201c — riss Kinder aus den Armen ihrer Mütter und brachte sie in seine Versuchsbaracke."
        },
        {
            "text": "Rund 1.500 Zwillingspaare durchliefen Mengeles Baracke. Was er ihnen antat, war keine Medizin — es war Folter im Arztkittel. Er spritzte Kindern Farbstoff in die Augen, um die Farbe zu ändern. Tauschte Blut zwischen Zwillingen verschiedener Blutgruppen. Infizierte einen, um ihn mit dem gesunden zu vergleichen. Starb ein Zwilling — und viele starben —, tötete er den anderen sofort zum Vergleich der Körper. Weniger als 200 überlebten."
        },
        {
            "text": "Zwei dieser Überlebenden waren Eva und Miriam Mozes — zehnjährige Zwillinge aus dem Dorf Portz in Siebenbürgen, im heutigen Rumänien. Sie kamen 1944 in Auschwitz an. Ihre Eltern und zwei älteren Schwestern wurden noch am selben Tag vergast. Eva und Miriam kamen in Mengeles Baracke, wo sie monatelang Spritzen, Blutentnahmen und Versuche ertrugen, die sie nicht verstehen konnten. Die Injektionen zerstörten Miriams Nieren — ein Schaden, der sie ihr Leben lang begleitete."
        },
        {
            "text": "Als die Rote Armee das Lager im Januar 1945 befreite, begann für Eva das Leben mit dem, was Auschwitz hinterlassen hatte. Die Albträume. Die Wut. Die Schuld, überlebt zu haben, während die Familie es nicht tat. Aller guten Dinge sind drei, heißt es — doch was Eva dreifach traf, war nichts Gutes: der Verlust der Familie, der Kindheit, des Vertrauens in die Welt. Fünfzig Jahre trug sie diese Wunden. Dann, 1995, traf sie eine Entscheidung, die die Welt erschütterte."
        },
        {
            "text": "Sie vergab den Nazis."
        },
        {
            "text": "In Auschwitz, am fünfzigsten Jahrestag der Befreiung, neben Hans Münch — einem deutschen Arzt, der im Lager gearbeitet hatte —, las Eva eine Erklärung der Vergebung vor und unterzeichnete sie vor laufenden Kameras. Die Reaktion war heftig. Andere Überlebende waren wütend. Manche sagten, nur die Toten könnten vergeben, und die Toten schwiegen. Andere sagten, sie lasse die Mörder davonkommen."
        },
        {
            "text": "Evas Antwort blieb immer dieselbe: \u201eIch vergebe nicht, weil sie es verdienen, sondern weil ich es verdiene. Ich verdiene es, frei von diesem Schmerz zu sein.\u201c Für sie hieß vergeben nicht, das Geschehene zu entschuldigen. Es hieß, sich zu weigern, dass Mengele — seit Jahren tot — weiter über ihr Leben bestimmte. \u201eWut und Hass sind die Saat des Krieges\u201c, sagte sie. \u201eVergebung ist die Saat des Friedens.\u201c Sie verlangte von niemandem, es ihr gleichzutun. Sie wählte ihre eigene Freiheit."
        },
        {
            "text": "Eva Mozes Kor starb 2019, mit fünfundachtzig, bei einer Rückkehr nach Auschwitz. Sie war dutzende Male zurückgekehrt, hatte Schüler durch dieselben Tore geführt, ihre Geschichte in denselben Baracken erzählt, in denen sie als Kind gefangen war. Man streitet noch, ob sie recht hatte. Aber ihre Idee — dass Vergebung etwas ist, das man für sich tut, nicht für den, der einem wehgetan hat — bleibt eine der kraftvollsten Aussagen, die je vom dunkelsten Ort der Welt kamen."
        },
    ],
}


# ============================================================
# Validation & Push
# ============================================================

def validate_story(story, lang_code):
    """Validate constraints before pushing."""
    errors = []

    # Check required fields
    required = ["siteId", "langStoryId", "lang", "title", "subtitle",
                "excerpt", "moralOrLesson", "paragraphs", "storyId"]
    for field in required:
        if field not in story or not story[field]:
            errors.append(f"Missing or empty field: {field}")

    # Check langStoryId format
    expected_prefix = f"{lang_code}#"
    if not story.get("langStoryId", "").startswith(expected_prefix):
        errors.append(f"langStoryId must start with '{expected_prefix}'")

    # Check lang
    if story.get("lang") != lang_code:
        errors.append(f"lang must be '{lang_code}'")

    # Check paragraph constraints
    paragraphs = story.get("paragraphs", [])
    if not (6 <= len(paragraphs) <= 10):
        errors.append(f"Expected 6-10 paragraphs, got {len(paragraphs)}")

    total_chars = 0
    for i, p in enumerate(paragraphs):
        text = p.get("text", "")
        char_count = len(text)
        word_count = len(text.split())
        total_chars += char_count

        if char_count > 500:
            errors.append(f"Paragraph {i+1}: {char_count} chars (max 500)")
        if word_count > 100:
            errors.append(f"Paragraph {i+1}: {word_count} words (max 100)")

    # ~3000 chars ±20% => 2400–3600
    if total_chars < 2400:
        errors.append(f"Total chars too low: {total_chars} (min ~2400)")
    if total_chars > 3600:
        errors.append(f"Total chars too high: {total_chars} (max ~3600)")

    return errors, total_chars, len(paragraphs)


def push_story(story, lang_code):
    """Validate and push a single story to DynamoDB."""
    print(f"\n{'='*60}")
    print(f"  {lang_code.upper()} — \"{story['title']}\"")
    print(f"{'='*60}")

    errors, total_chars, para_count = validate_story(story, lang_code)

    # Print stats
    print(f"  Paragraphs: {para_count}")
    print(f"  Total chars: {total_chars}")
    for i, p in enumerate(story["paragraphs"]):
        t = p["text"]
        print(f"    P{i+1}: {len(t)} chars, {len(t.split())} words")

    if errors:
        print(f"\n  VALIDATION FAILED:")
        for e in errors:
            print(f"    - {e}")
        return False

    print(f"\n  Validation passed. Pushing to DynamoDB...")

    # Build the DynamoDB item
    item = {
        "siteId": story["siteId"],
        "langStoryId": story["langStoryId"],
        "lang": story["lang"],
        "title": story["title"],
        "subtitle": story["subtitle"],
        "excerpt": story["excerpt"],
        "moralOrLesson": story["moralOrLesson"],
        "icon": story["icon"],
        "tier": story["tier"],
        "storyCategory": story["storyCategory"],
        "storyId": story["storyId"],
        "source": story["source"],
        "era": story["era"],
        "readingTimeMinutes": story["readingTimeMinutes"],
        "image": story["image"],
        "thumbnail": story["thumbnail"],
        "coordinates": {
            "lng": story["coordinates"]["lng"],
            "lat": story["coordinates"]["lat"],
        },
        "hasAudio": story["hasAudio"],
        "isFree": story["isFree"],
        "disabled": story["disabled"],
        "updatedAt": story["updatedAt"],
        "characters": story["characters"],
        "paragraphs": [{"text": p["text"]} for p in story["paragraphs"]],
    }

    try:
        response = table.put_item(Item=item)
        http_status = response["ResponseMetadata"]["HTTPStatusCode"]
        if http_status == 200:
            print(f"  SUCCESS (HTTP {http_status})")
            return True
        else:
            print(f"  UNEXPECTED STATUS: HTTP {http_status}")
            print(f"  Response: {json.dumps(response, indent=2)}")
            return False
    except Exception as e:
        print(f"  PUSH FAILED: {e}")
        return False


# ============================================================
# Main
# ============================================================
if __name__ == "__main__":
    print(f"Timestamp: {NOW}")
    print(f"Table: Story")
    print(f"Site: auschwitz-birkenau")
    print(f"Story slug: children-of-auschwitz")

    all_ok = True
    for story, code in [(es_story, "es"), (fr_story, "fr"), (de_story, "de")]:
        if not push_story(story, code):
            all_ok = False
            print(f"\n  STOPPING — fix {code.upper()} errors before retrying.")
            sys.exit(1)

    if all_ok:
        print(f"\n{'='*60}")
        print(f"  ALL 3 STORIES PUSHED SUCCESSFULLY")
        print(f"{'='*60}")
        print(f"  es#children-of-auschwitz  ✓")
        print(f"  fr#children-of-auschwitz  ✓")
        print(f"  de#children-of-auschwitz  ✓")
        print(f"{'='*60}")
