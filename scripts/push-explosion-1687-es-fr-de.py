#!/usr/bin/env python3
"""
Push 'The Explosion of 1687' story in Spanish, French, and German.
Each version is a native recreation — not a translation.
"""

import boto3
import time
import json
import sys

dynamodb = boto3.resource("dynamodb", region_name="eu-north-1")
table = dynamodb.Table("Story")

now_ts = int(time.time())

# ---------- Shared fields (identical to English) ----------
shared = {
    "siteId": "acropolis-athens",
    "storyId": "venetian-explosion",
    "characters": ["Francesco Morosini", "Count Königsmark", "Ottoman defenders", "The 300 victims"],
    "coordinates": {"lng": "23.7267", "lat": "37.9715"},
    "disabled": False,
    "era": "September 26, 1687",
    "hasAudio": False,
    "icon": "😢",
    "image": "",
    "isFree": True,
    "readingTimeMinutes": 2,
    "source": "Contemporary accounts by Venetian officers, Cristoforo Ivanovich's Historia della Lega Santa, modern archaeological analysis",
    "storyCategory": "lost_found",
    "thumbnail": "",
    "tier": "A",
    "updatedAt": now_ts,
}

# ================================================================
#  SPANISH
# ================================================================
es_story = {
    **shared,
    "lang": "es",
    "langStoryId": "es#venetian-explosion",
    "title": "La noche que estalló el Partenón",
    "subtitle": "Cuando una bomba destruyó lo que dos mil años no pudieron",
    "excerpt": "Dicen que no hay mal que dure cien años. El Partenón duró más de veintiuno. Terremotos, incendios, ejércitos de medio mundo: nada pudo con él.",
    "moralOrLesson": "La guerra destruye lo que el tiempo no puede. El Partenón resistió más de dos mil años y una sola noche lo hizo pedazos. Lo que hemos heredado es valioso — y mucho más frágil de lo que creemos.",
    "paragraphs": [
        {
            "text": "Dicen que no hay mal que dure cien años. El Partenón duró más de veintiuno. Terremotos, incendios, ejércitos de medio mundo: nada pudo con él. De templo griego pasó a iglesia cristiana y después a mezquita otomana. Lo saquearon, lo despojaron, le borraron los colores originales. Pero seguía en pie. Sus huesos de mármol aguantaron todo. Hasta la noche del 26 de septiembre de 1687."
        },
        {
            "text": "Para entender lo que pasó hay que alejarse un momento de Atenas. Venecia y el Imperio otomano se disputaban el Mediterráneo oriental: islas, puertos, rutas de comercio. Una guerra de gigantes. Un general veneciano llamado Francesco Morosini llegó con su flota a Grecia y puso sitio a la ciudad. La guarnición otomana, en clara desventaja numérica, se replegó al único lugar donde todavía podía resistir: la Acrópolis, la fortaleza en la colina que llevaba milenios protegiendo a quien la ocupara."
        },
        {
            "text": "Entonces el comandante otomano tomó la decisión que lo cambiaría todo. Trasladó toda la pólvora — barriles y más barriles — al interior del Partenón. Su lógica tenía sentido: durante siglos, los ejércitos atacantes habían respetado el edificio porque había sido una iglesia cristiana. Apostó a que los venecianos, cristianos también, jamás se atreverían a bombardearlo. Era una apuesta razonable. Y fue un error fatal."
        },
        {
            "text": "Un oficial sueco al servicio de Venecia, el conde von Königsmark, apuntó sus cañones directo a la colina. Durante tres días, desde el 23 de septiembre, las balas de cañón destrozaron muros y templos antiguos. Hasta que, alrededor de las siete de la tarde del 26, un proyectil de mortero trazó un arco sobre las fortificaciones, atravesó el techo del Partenón y cayó justo encima de la pólvora."
        },
        {
            "text": "La explosión mató a trescientas personas en el acto: soldados, mujeres, niños que se habían refugiado dentro. El centro del edificio voló en pedazos. Ocho columnas del lado sur, seis del norte, la cámara interior entera — todo desapareció. Esculturas talladas en la época dorada de Atenas — estamos hablando del siglo V antes de Cristo, la era de Pericles — se hicieron añicos o salieron volando cientos de metros. Bloques de mármol de toneladas rodaron por la colina como dados lanzados por un gigante."
        },
        {
            "text": "Y como si la tragedia no bastara, llegó la humillación. Morosini entró en las ruinas y decidió llevarse un trofeo: los enormes caballos de piedra que decoraban el frontón. Sus hombres ataron cuerdas para bajarlos. Las cuerdas se rompieron. Los caballos se estrellaron contra el suelo y se hicieron pedazos. Los venecianos mantuvieron Atenas menos de un año antes de abandonarla. Su gran premio: unas ruinas que ellos mismos crearon y que ni siquiera supieron saquear."
        },
        {
            "text": "La próxima vez que veas una foto del Partenón — esa silueta famosa, la hilera de columnas, los huecos donde antes había techo — vas a estar mirando la cicatriz de una sola noche. Cada espacio vacío donde hubo una escultura, cada columna rota, cada tramo de muro que se corta en el aire: eso es el 26 de septiembre de 1687. La guerra destruyó en una tarde lo que veintiún siglos no pudieron."
        },
    ],
}

# ================================================================
#  FRENCH
# ================================================================
fr_story = {
    **shared,
    "lang": "fr",
    "langStoryId": "fr#venetian-explosion",
    "title": "Le soir où le Parthénon a explosé",
    "subtitle": "Quand une bombe a détruit ce que deux mille ans avaient préservé",
    "excerpt": "Pendant plus de deux mille ans, le Parthénon avait résisté à tout. Tremblements de terre. Incendies. Armées venues des quatre coins du monde.",
    "moralOrLesson": "La guerre détruit ce que le temps épargne. Le Parthénon a tenu plus de deux mille ans avant de voler en éclats en une seule soirée. Ce que nous avons hérité est précieux — et bien plus fragile qu'on ne le croit.",
    "paragraphs": [
        {
            "text": "Pendant plus de deux mille ans, le Parthénon avait résisté à tout. Tremblements de terre. Incendies. Armées venues des quatre coins du monde. De temple grec, il était devenu église chrétienne, puis mosquée ottomane. On l'avait pillé, dépouillé de ses sculptures, vidé de ses couleurs d'origine. Mais il tenait debout. Ses os de marbre refusaient de plier. Jusqu'au soir du 26 septembre 1687, où un seul obus a effacé vingt et un siècles d'histoire."
        },
        {
            "text": "Pour comprendre ce qui s'est passé, il faut prendre du recul. Venise et l'Empire ottoman se disputaient la Méditerranée orientale : îles, ports, routes commerciales. Une guerre de titans. Un général vénitien, Francesco Morosini, débarqua en Grèce avec sa flotte et mit le siège devant Athènes. La garnison ottomane, largement dépassée en nombre, se replia sur le seul endroit encore imprenable : l'Acropole, la forteresse perchée sur la colline qui protégeait ses occupants depuis des millénaires."
        },
        {
            "text": "C'est alors que le commandant ottoman prit la décision qui allait hanter l'histoire. Il fit transporter toute sa réserve de poudre — des tonneaux et encore des tonneaux — à l'intérieur du Parthénon. Sa logique se tenait : depuis des siècles, les armées assaillantes avaient épargné le bâtiment parce qu'il avait été une église chrétienne. Il pariait que les Vénitiens, chrétiens eux aussi, n'oseraient jamais le bombarder. Un pari raisonnable. Et une erreur mortelle."
        },
        {
            "text": "Un officier suédois au service de Venise, le comte von Königsmark, pointa ses canons droit sur la colline. Pendant trois jours, à partir du 23 septembre, les boulets s'acharnèrent sur les murs et les temples antiques. Jamais deux sans trois, dit le proverbe — sauf que cette fois, le troisième soir n'apporta rien de bon. Vers sept heures, le 26, un obus de mortier décrivit un arc par-dessus les fortifications, creva le toit du Parthénon et atterrit en plein sur la poudre."
        },
        {
            "text": "L'explosion tua trois cents personnes sur le coup : soldats, femmes, enfants qui avaient cherché refuge à l'intérieur. Le centre du bâtiment fut soufflé. Huit colonnes côté sud, six côté nord, la chambre intérieure tout entière — volatilisées. Des sculptures taillées à l'âge d'or d'Athènes — on parle du Ve siècle avant notre ère, l'époque de Périclès — furent réduites en miettes ou projetées à des centaines de mètres. Des blocs de marbre de plusieurs tonnes roulèrent sur la colline comme des dés lancés par un géant."
        },
        {
            "text": "Et puis vint l'humiliation par-dessus la catastrophe. Morosini entra dans les décombres et décida de repartir avec un trophée : les immenses chevaux de pierre qui ornaient le fronton. Ses hommes installèrent des cordes pour les descendre. Les cordes lâchèrent. Les chevaux s'écrasèrent au sol et volèrent en éclats. Les Vénitiens gardèrent Athènes moins d'un an avant d'abandonner la ville. Leur grand butin : des ruines qu'ils avaient eux-mêmes créées et qu'ils n'avaient même pas su piller."
        },
        {
            "text": "La prochaine fois que vous verrez une photo du Parthénon — cette silhouette célèbre, la rangée de colonnes, les trous là où il y avait un toit — sachez que vous regardez la cicatrice d'un seul soir. Chaque espace vide où se dressait une sculpture, chaque colonne brisée, chaque pan de mur qui s'arrête net dans le vide : c'est le 26 septembre 1687. La guerre a détruit en une soirée ce que vingt et un siècles n'avaient pas réussi à entamer."
        },
    ],
}

# ================================================================
#  GERMAN
# ================================================================
de_story = {
    **shared,
    "lang": "de",
    "langStoryId": "de#venetian-explosion",
    "title": "Als der Parthenon zerbrach",
    "subtitle": "Als eine Bombe zerstörte, was zweitausend Jahre überdauert hatte",
    "excerpt": "Über zweitausend Jahre lang hatte der Parthenon alles überlebt, was die Geschichte ihm entgegenwarf. Erdbeben. Brände. Armeen aus einem halben Dutzend Imperien.",
    "moralOrLesson": "Krieg zerstört, was die Zeit nicht kann. Der Parthenon stand über zweitausend Jahre — und wurde an einem einzigen Abend in Stücke gesprengt. Was wir geerbt haben, ist kostbar — und viel zerbrechlicher, als wir glauben.",
    "paragraphs": [
        {
            "text": "Über zweitausend Jahre lang hatte der Parthenon alles überlebt, was die Geschichte ihm entgegenwarf. Erdbeben. Brände. Armeen aus einem halben Dutzend Imperien. Er wandelte sich vom griechischen Tempel zur christlichen Kirche, dann zur osmanischen Moschee. Man plünderte ihn, raubte seine Skulpturen, löschte seine ursprünglichen Farben aus. Aber er stand. Seine Knochen aus Marmor hielten allem stand. Bis zum Abend des 26. September 1687."
        },
        {
            "text": "Um zu verstehen, was geschah, muss man den Blick von Athen weglenken. Venedig und das Osmanische Reich kämpften um das östliche Mittelmeer: Inseln, Häfen, Handelsrouten. Ein Krieg der Giganten. Ein venezianischer General namens Francesco Morosini segelte mit seiner Flotte nach Griechenland und belagerte Athen. Die osmanische Garnison, zahlenmäßig hoffnungslos unterlegen, zog sich auf den einzigen Ort zurück, der noch zu halten war: die Akropolis — die Festung auf dem Hügel, die seit Jahrtausenden jeden schützte, der sie hielt."
        },
        {
            "text": "Dann traf der osmanische Kommandant die Entscheidung, die alles verändern sollte. Er ließ sein gesamtes Pulver — Fass um Fass — in den Parthenon schaffen. Seine Logik war nachvollziehbar: Jahrhundertelang hatten angreifende Armeen das Gebäude verschont, weil es eine christliche Kirche gewesen war. Er setzte darauf, dass die Venezianer als Christen niemals darauf schießen würden. Eine vernünftige Wette. Und ein tödlicher Irrtum."
        },
        {
            "text": "Graf von Königsmark, ein schwedischer Offizier im Dienste Venedigs, richtete seine Kanonen direkt auf den Hügel. Drei Tage lang, ab dem 23. September, hämmerten Kanonenkugeln auf antike Mauern und Tempel ein. Was lange währt, wird endlich gut — so heißt es. Aber manchmal reicht ein einziger Abend, um alles zu zerstören. Gegen sieben Uhr am 26. September beschrieb eine Mörsergranate einen Bogen über die Festungsmauern, schlug durch das Dach des Parthenon und landete mitten im Pulver."
        },
        {
            "text": "Die Explosion tötete dreihundert Menschen auf der Stelle: Soldaten, Frauen, Kinder, die im Inneren Schutz gesucht hatten. Das Zentrum des Gebäudes wurde aufgerissen. Acht Säulen auf der Südseite, sechs auf der Nordseite, die gesamte Innenkammer — alles weg. Skulpturen aus der Blütezeit Athens — wir reden vom fünften Jahrhundert vor Christus, der Ära des Perikles — wurden zertrümmert oder hunderte Meter weit geschleudert. Marmorblöcke von mehreren Tonnen rollten über den Hügel wie Würfel, geworfen von einem Riesen."
        },
        {
            "text": "Und als wäre die Katastrophe nicht genug, kam die Demütigung obendrauf. Morosini betrat die Trümmer und beschloss, eine Trophäe mitzunehmen: die gewaltigen steinernen Pferde, die den Giebel schmückten. Seine Leute spannten Seile, um sie herunterzulassen. Die Seile rissen. Die Pferde krachten zu Boden und zerbrachen in Stücke. Die Venezianer hielten Athen weniger als ein Jahr, bevor sie die Stadt aufgaben. Ihre große Beute: Ruinen, die sie selbst geschaffen hatten und nicht einmal ordentlich plündern konnten."
        },
        {
            "text": "Wenn du das nächste Mal ein Foto des Parthenon siehst — diese berühmte Silhouette, die Säulenreihe, die Lücken, wo einmal das Dach war — dann weißt du: Du schaust auf die Narbe eines einzigen Abends. Jede leere Stelle, wo einst eine Skulptur stand, jede gebrochene Säule, jede Mauer, die einfach im Nichts endet — das ist der 26. September 1687. Der Krieg zerstörte an einem Abend, was einundzwanzig Jahrhunderte nicht geschafft hatten."
        },
    ],
}

# ================================================================
#  PUSH TO DYNAMODB
# ================================================================
stories = [
    ("es", "Spanish", es_story),
    ("fr", "French", fr_story),
    ("de", "German", de_story),
]

for lang_code, lang_name, story_data in stories:
    print(f"\n{'='*60}")
    print(f"  Pushing {lang_name} ({lang_code}) version...")
    print(f"{'='*60}")

    # Validate JSON structure before pushing
    try:
        json.dumps(story_data, ensure_ascii=False)
        print(f"  ✓ JSON validation passed")
    except Exception as e:
        print(f"  ✗ JSON validation FAILED: {e}")
        sys.exit(1)

    # Validate paragraph count and character limits
    paragraphs = story_data["paragraphs"]
    print(f"  ✓ Paragraphs: {len(paragraphs)}")
    total_chars = 0
    for i, p in enumerate(paragraphs):
        char_count = len(p["text"])
        word_count = len(p["text"].split())
        total_chars += char_count
        status = "✓" if char_count <= 500 and word_count <= 100 else "✗ OVER LIMIT"
        print(f"    P{i+1}: {char_count} chars, {word_count} words {status}")
    print(f"  ✓ Total characters: {total_chars}")

    # Push to DynamoDB
    try:
        table.put_item(Item=story_data)
        print(f"  ✓ Successfully pushed to DynamoDB")
    except Exception as e:
        print(f"  ✗ Push FAILED: {e}")
        sys.exit(1)

    # Verify by reading back
    try:
        response = table.get_item(
            Key={"siteId": "acropolis-athens", "langStoryId": f"{lang_code}#venetian-explosion"}
        )
        item = response.get("Item")
        if item and item.get("title") == story_data["title"]:
            print(f"  ✓ Verification passed — title: \"{item['title']}\"")
        else:
            print(f"  ✗ Verification FAILED — item not found or title mismatch")
            sys.exit(1)
    except Exception as e:
        print(f"  ✗ Verification FAILED: {e}")
        sys.exit(1)

print(f"\n{'='*60}")
print(f"  ALL THREE LANGUAGES PUSHED SUCCESSFULLY")
print(f"  Timestamp: {now_ts}")
print(f"{'='*60}\n")
