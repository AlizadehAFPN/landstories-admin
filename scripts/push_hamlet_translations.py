#!/usr/bin/env python3
"""
Push Spanish, French, and German versions of 'Shakespeare's Hamlet at Elsinore'
to the Story DynamoDB table as NEW records.
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

# --- Shared fields (unchanged from English) ---
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
    "icon": {"S": "\U0001f480"},
    "image": {"S": ""},
    "isFree": {"BOOL": True},
    "readingTimeMinutes": {"N": "3"},
    "siteId": {"S": SITE_ID},
    "source": {"S": "Shakespeare, William. The Tragedy of Hamlet, Prince of Denmark (c. 1601); Saxo Grammaticus, Gesta Danorum (c. 1200); Belleforest, Histoires Tragiques (1570)"},
    "storyCategory": {"S": "lost_found"},
    "storyId": {"S": STORY_ID},
    "thumbnail": {"S": ""},
    "tier": {"S": "S"},
    "updatedAt": {"N": str(TIMESTAMP)},
}


def make_paragraphs(texts):
    return {"L": [{"M": {"text": {"S": t}}} for t in texts]}


def build_item(lang, title, subtitle, excerpt, moral, paragraphs):
    item = dict(SHARED)
    item["lang"] = {"S": lang}
    item["langStoryId"] = {"S": f"{lang}#{STORY_ID}"}
    item["title"] = {"S": title}
    item["subtitle"] = {"S": subtitle}
    item["excerpt"] = {"S": excerpt}
    item["moralOrLesson"] = {"S": moral}
    item["paragraphs"] = make_paragraphs(paragraphs)
    return item


# ============================================================
# SPANISH (es)
# ============================================================
# Proverb: "A la tercera va la vencida" (Third time's the charm)
# Subverted: Hamlet had a hundred chances and let them all pass.

ES = build_item(
    lang="es",
    title="El fantasma de Elsinore",
    subtitle="Shakespeare, un castillo dan\u00e9s y la tragedia que lo cambi\u00f3 todo",
    excerpt=(
        "\u00abAlgo huele a podrido en Dinamarca.\u00bb Con esa frase, pronunciada "
        "en las almenas azotadas por el viento de Elsinore, Shakespeare anunci\u00f3 "
        "la corrupci\u00f3n en el coraz\u00f3n de un reino y cre\u00f3 la tragedia "
        "m\u00e1s c\u00e9lebre de la literatura universal."
    ),
    moral=(
        "Los lugares donde nacen las grandes historias dejan de ser simples "
        "sitios en un mapa. Se convierten en dep\u00f3sitos de las preguntas "
        "que nos definen como seres humanos. Y no hay edificio en el mundo "
        "que cargue con m\u00e1s significado que el castillo que Shakespeare "
        "eligi\u00f3 para su obra maestra."
    ),
    paragraphs=[
        # P1 — The famous line, the castle, the play
        (
            "\u00abAlgo huele a podrido en Dinamarca.\u00bb Esa frase, lanzada en "
            "las almenas heladas de un castillo llamado Elsinore, es una de las "
            "m\u00e1s famosas del teatro universal. La obra es Hamlet. El castillo "
            "existe: se llama Kronborg, una fortaleza imponente en la costa danesa, "
            "justo donde el mar se estrecha entre Dinamarca y Suecia. Shakespeare "
            "la escribi\u00f3 hacia 1600 y, con ella, convirti\u00f3 una base "
            "militar en el castillo m\u00e1s legendario del mundo."
        ),
        # P2 — Shakespeare never went there
        (
            "Lo m\u00e1s sorprendente es que Shakespeare probablemente nunca "
            "pis\u00f3 Kronborg. No le hizo falta. En 1585, el rey Federico II "
            "de Dinamarca invit\u00f3 a actores ingleses a actuar en el castillo. "
            "Algunos de ellos terminaron en la compa\u00f1\u00eda de Shakespeare, "
            "la m\u00e1s importante de Londres. Volvieron con historias de vientos "
            "cortantes, muros de piedra maciza y una niebla que sub\u00eda del mar "
            "como si el lugar estuviera encantado. Shakespeare escuch\u00f3. Y escribi\u00f3."
        ),
        # P3 — Saxo Grammaticus and the source legend
        (
            "Tampoco invent\u00f3 la historia de cero. Hacia 1200, un cronista "
            "dan\u00e9s llamado Saxo Grammaticus dej\u00f3 por escrito la leyenda "
            "de Amleth: un pr\u00edncipe cuyo t\u00edo asesin\u00f3 a su padre, "
            "se cas\u00f3 con su madre y le rob\u00f3 el trono. Amleth "
            "sobrevivi\u00f3 fingiendo estar loco hasta poder vengarse. La "
            "historia rebot\u00f3 por Europa durante siglos y lleg\u00f3 a "
            "Shakespeare a trav\u00e9s de una versi\u00f3n francesa de 1570. "
            "Los mismos huesos. Un animal completamente distinto."
        ),
        # P4 — What Shakespeare added
        (
            "Lo que Shakespeare construy\u00f3 con esa vieja leyenda no tiene "
            "comparaci\u00f3n. A\u00f1adi\u00f3 un fantasma \u2014el rey asesinado "
            "apareciendo a medianoche en las almenas, exigiendo venganza\u2014. "
            "Invent\u00f3 \u00abLa ratonera\u00bb, una obra dentro de la obra que "
            "Hamlet monta para descubrir si su t\u00edo realmente mat\u00f3 a su "
            "padre. Nos dio a Ofelia, cuya locura sigue destrozando al p\u00fablico "
            "hoy. Y le dio a Hamlet lo que lo hizo inmortal: un pr\u00edncipe que "
            "piensa demasiado, siente demasiado y no es capaz de actuar."
        ),
        # P5 — "To be or not to be"
        (
            "\u00abSer o no ser, esa es la cuesti\u00f3n.\u00bb Esa frase no es "
            "solo teatro. Es el momento en que alguien puso en palabras lo que "
            "todos hemos sentido alguna vez: el peso aplastante de estar vivo "
            "cuando vivir duele. Hamlet no est\u00e1 hablando de rendirse sin "
            "m\u00e1s: se pregunta si es m\u00e1s valiente seguir adelante o "
            "parar. Shakespeare escribi\u00f3 eso hace m\u00e1s de cuatrocientos "
            "a\u00f1os, y la gente sigue agarr\u00e1ndose a esas palabras en "
            "sus peores momentos. Eso no es buena escritura. Eso es permanente."
        ),
        # P6 — Yorick's skull
        (
            "Y luego est\u00e1 la calavera. Hamlet levanta el cr\u00e1neo de "
            "Yorick \u2014el buf\u00f3n de la corte que le hac\u00eda re\u00edr "
            "de ni\u00f1o\u2014 y le habla. Es el instante en que la muerte deja "
            "de ser una idea y se vuelve personal. Alguien a quien quiso ahora "
            "es solo hueso en sus manos. Esa imagen \u2014un hombre sosteniendo "
            "una calavera, enfrentando el hecho de que todo lo que ama "
            "terminar\u00e1 igual\u2014 es una de las m\u00e1s reconocibles del "
            "arte universal. Cuatro siglos, y sigue golpeando."
        ),
        # P7 — Modern performances at Kronborg
        (
            "Hoy, Kronborg acoge representaciones de Hamlet en sus propios muros. "
            "Laurence Olivier, Kenneth Branagh y Jude Law han dado vida al "
            "pr\u00edncipe aqu\u00ed, recitando los versos de Shakespeare sobre "
            "las almenas reales, frente al mar real. El castillo y la obra se han "
            "enredado tanto que es imposible pensar en uno sin el otro. Pasea por "
            "esas murallas en una noche de niebla y dime que no sientes al fantasma."
        ),
        # P8 — Closing with proverb subversion
        (
            "Shakespeare nunca pis\u00f3 Kronborg. Escribi\u00f3 sobre un "
            "pr\u00edncipe ficticio en un castillo real, y cuatro siglos "
            "despu\u00e9s, ese pr\u00edncipe parece m\u00e1s vivo que la "
            "mayor\u00eda de los reyes que durmieron all\u00ed. A la tercera "
            "va la vencida, dicen \u2014 pero Hamlet tuvo cien oportunidades y "
            "las dej\u00f3 pasar todas. Sus preguntas sobre la justicia, el dolor "
            "y si es posible hacer lo correcto cuando apenas puedes levantarte de "
            "la cama no son danesas ni inglesas. Son de cualquiera que haya estado "
            "despierto a las tres de la ma\u00f1ana pregunt\u00e1ndose qu\u00e9 "
            "sentido tiene todo."
        ),
    ],
)


# ============================================================
# FRENCH (fr)
# ============================================================
# Proverb: "Jamais deux sans trois" (Never two without three)
# Subverted: At Elsinore, death didn't stop at three.

FR = build_item(
    lang="fr",
    title="Le fant\u00f4me d\u2019Elsinore",
    subtitle="Shakespeare, un ch\u00e2teau danois et la pi\u00e8ce qui a tout chang\u00e9",
    excerpt=(
        "\u00abIl y a quelque chose de pourri au royaume du Danemark.\u00bb Avec "
        "ces mots, prononc\u00e9s sur les remparts battus par le vent d\u2019Elsinore, "
        "Shakespeare a d\u00e9nonc\u00e9 la corruption au c\u0153ur d\u2019un "
        "royaume \u2014 et cr\u00e9\u00e9 la trag\u00e9die la plus c\u00e9l\u00e8bre "
        "de la litt\u00e9rature universelle."
    ),
    moral=(
        "Les lieux o\u00f9 naissent les grandes histoires cessent d\u2019\u00eatre "
        "de simples endroits sur une carte. Ils deviennent les gardiens des questions "
        "qui d\u00e9finissent l\u2019existence humaine. Et aucun b\u00e2timent au "
        "monde ne porte un poids de sens plus lourd que le ch\u00e2teau que "
        "Shakespeare a choisi pour son chef-d\u2019\u0153uvre."
    ),
    paragraphs=[
        # P1 — The famous line, the castle, the play
        (
            "\u00abIl y a quelque chose de pourri au royaume du Danemark.\u00bb "
            "Cette r\u00e9plique, lanc\u00e9e sur les remparts glac\u00e9s d\u2019un "
            "ch\u00e2teau appel\u00e9 Elsinore, est l\u2019une des plus c\u00e9l\u00e8bres "
            "de l\u2019histoire du th\u00e9\u00e2tre. La pi\u00e8ce, c\u2019est Hamlet. "
            "Le ch\u00e2teau existe\u00a0: il s\u2019appelle Kronborg, une forteresse "
            "massive sur la c\u00f4te danoise, l\u00e0 o\u00f9 la mer se resserre "
            "entre le Danemark et la Su\u00e8de. Shakespeare l\u2019a \u00e9crite vers "
            "1600 et a fait d\u2019une forteresse militaire le ch\u00e2teau le plus "
            "l\u00e9gendaire de la plan\u00e8te."
        ),
        # P2 — Shakespeare never went there
        (
            "Le plus fou dans cette histoire, c\u2019est que Shakespeare n\u2019a "
            "probablement jamais mis les pieds \u00e0 Kronborg. Il n\u2019en avait "
            "pas besoin. En 1585, le roi Fr\u00e9d\u00e9ric\u00a0II de Danemark a "
            "invit\u00e9 des acteurs anglais \u00e0 jouer au ch\u00e2teau. Certains "
            "ont ensuite rejoint la troupe de Shakespeare, la plus importante de "
            "Londres. Ils sont revenus avec des r\u00e9cits de vents glacials, de "
            "murs de pierre massifs et d\u2019un brouillard montant de la mer comme "
            "si l\u2019endroit \u00e9tait hant\u00e9. Shakespeare a \u00e9cout\u00e9. "
            "Et il a \u00e9crit."
        ),
        # P3 — Saxo Grammaticus and the source legend
        (
            "Il n\u2019a pas non plus invent\u00e9 l\u2019histoire de toutes "
            "pi\u00e8ces. Vers 1200, un chroniqueur danois nomm\u00e9 Saxo "
            "Grammaticus a couch\u00e9 par \u00e9crit la l\u00e9gende d\u2019Amleth "
            "\u2014 un prince dont l\u2019oncle avait assassin\u00e9 le p\u00e8re, "
            "\u00e9pous\u00e9 la m\u00e8re et vol\u00e9 le tr\u00f4ne. Amleth a "
            "surv\u00e9cu en feignant la folie jusqu\u2019\u00e0 pouvoir se venger. "
            "Le r\u00e9cit a rebondi \u00e0 travers l\u2019Europe pendant des "
            "si\u00e8cles avant d\u2019atterrir chez Shakespeare via une version "
            "fran\u00e7aise de 1570. Les m\u00eames os. Une tout autre b\u00eate."
        ),
        # P4 — What Shakespeare added
        (
            "Ce que Shakespeare a b\u00e2ti \u00e0 partir de cette vieille "
            "l\u00e9gende, c\u2019est un tout autre monde. Il a ajout\u00e9 un "
            "fant\u00f4me \u2014 le roi assassin\u00e9 surgissant \u00e0 minuit "
            "sur les remparts pour r\u00e9clamer vengeance. Il a invent\u00e9 "
            "\u00abLa Sourici\u00e8re\u00bb, une pi\u00e8ce dans la pi\u00e8ce "
            "que Hamlet monte pour pi\u00e9ger son oncle. Il nous a donn\u00e9 "
            "Oph\u00e9lie, dont la folie bouleverse encore le public aujourd\u2019hui. "
            "Et il a offert \u00e0 Hamlet ce qui l\u2019a rendu immortel\u00a0: un "
            "prince qui r\u00e9fl\u00e9chit trop, ressent trop et n\u2019arrive "
            "pas \u00e0 passer \u00e0 l\u2019acte."
        ),
        # P5 — "To be or not to be"
        (
            "\u00ab\u00catre ou ne pas \u00eatre, telle est la question.\u00bb "
            "Cette phrase n\u2019est pas du th\u00e9\u00e2tre. C\u2019est le moment "
            "o\u00f9 quelqu\u2019un a enfin mis des mots sur ce que chacun de nous "
            "a ressenti\u00a0: le poids \u00e9crasant d\u2019\u00eatre en vie quand "
            "vivre fait mal. Hamlet ne parle pas de tout arr\u00eater froidement "
            "\u2014 il se demande s\u2019il faut plus de courage pour continuer ou "
            "pour s\u2019arr\u00eater. Shakespeare a \u00e9crit \u00e7a il y a plus "
            "de quatre cents ans, et les gens s\u2019y accrochent encore dans leurs "
            "pires moments. Ce n\u2019est pas du talent. C\u2019est de "
            "l\u2019\u00e9ternit\u00e9."
        ),
        # P6 — Yorick's skull
        (
            "Et puis il y a le cr\u00e2ne. Hamlet ramasse le cr\u00e2ne de Yorick "
            "\u2014 le bouffon de la cour qui le faisait rire quand il \u00e9tait "
            "enfant \u2014 et lui parle. C\u2019est l\u2019instant o\u00f9 la mort "
            "cesse d\u2019\u00eatre un concept et devient quelque chose de personnel. "
            "Quelqu\u2019un qu\u2019il a aim\u00e9 n\u2019est plus qu\u2019un os "
            "dans ses mains. Cette image \u2014 un homme tenant un cr\u00e2ne, "
            "confront\u00e9 au fait que tout ce qu\u2019il aime finira de la "
            "m\u00eame fa\u00e7on \u2014 est l\u2019une des plus marquantes de "
            "l\u2019histoire de l\u2019art. Quatre si\u00e8cles, et elle frappe "
            "toujours."
        ),
        # P7 — Modern performances at Kronborg
        (
            "Aujourd\u2019hui, le ch\u00e2teau de Kronborg accueille des "
            "repr\u00e9sentations d\u2019Hamlet sur ses propres murs. Laurence "
            "Olivier, Kenneth Branagh et Jude Law y ont incarn\u00e9 le prince, "
            "d\u00e9clamant les vers de Shakespeare sur les vrais remparts, face "
            "\u00e0 la vraie mer. Le ch\u00e2teau et la pi\u00e8ce sont devenus "
            "si indissociables qu\u2019on ne peut plus penser \u00e0 l\u2019un "
            "sans l\u2019autre. Marchez sur ces murailles par une nuit de "
            "brouillard, et dites-moi que vous ne sentez pas le fant\u00f4me."
        ),
        # P8 — Closing with proverb subversion
        (
            "Shakespeare n\u2019a jamais visit\u00e9 Kronborg. Il a \u00e9crit sur "
            "un prince fictif dans un ch\u00e2teau r\u00e9el, et quatre si\u00e8cles "
            "plus tard, ce prince semble plus vivant que la plupart des rois qui y "
            "ont dormi. Jamais deux sans trois, dit le proverbe \u2014 mais \u00e0 "
            "Elsinore, la mort ne s\u2019est pas arr\u00eat\u00e9e \u00e0 trois. "
            "Les questions que pose Hamlet \u2014 sur la justice, sur le deuil, sur "
            "la possibilit\u00e9 de faire ce qui est juste quand on arrive \u00e0 "
            "peine \u00e0 se lever le matin \u2014 ne sont ni danoises ni anglaises. "
            "Elles sont \u00e0 tout le monde."
        ),
    ],
)


# ============================================================
# GERMAN (de)
# ============================================================
# Proverb: "Aller guten Dinge sind drei" (All good things come in threes)
# Subverted: At Elsinore, they weren't good things — and it didn't stop at three.

DE = build_item(
    lang="de",
    title="Der Geist von Elsinore",
    subtitle="Shakespeare, eine d\u00e4nische Festung und das ber\u00fchmteste Drama der Welt",
    excerpt=(
        "\u00abEtwas ist faul im Staate D\u00e4nemark.\u00bb Mit diesen Worten, "
        "gesprochen auf den windgepeitschten Zinnen von Elsinore, enth\u00fcllte "
        "Shakespeare die F\u00e4ulnis im Herzen eines K\u00f6nigreichs \u2014 und "
        "schuf die ber\u00fchmteste Trag\u00f6die der Weltliteratur."
    ),
    moral=(
        "Die Orte, an denen gro\u00dfe Geschichten spielen, werden zu mehr als "
        "blo\u00dfen Schaupl\u00e4tzen \u2014 sie werden zu Gef\u00e4\u00dfen "
        "f\u00fcr die Fragen, die unser Dasein bestimmen. Und kein Geb\u00e4ude "
        "auf der Welt tr\u00e4gt eine schwerere Last an Bedeutung als die Burg, "
        "die Shakespeare f\u00fcr sein gr\u00f6\u00dftes Werk gew\u00e4hlt hat."
    ),
    paragraphs=[
        # P1 — The famous line, the castle, the play
        (
            "\u00abEtwas ist faul im Staate D\u00e4nemark.\u00bb Dieser Satz, "
            "gesprochen auf den eisigen Zinnen einer Burg namens Elsinore, "
            "geh\u00f6rt zu den ber\u00fchmtesten der Theatergeschichte. Das "
            "St\u00fcck hei\u00dft Hamlet. Die Burg gibt es wirklich \u2014 sie "
            "hei\u00dft Kronborg, eine m\u00e4chtige Festung an der d\u00e4nischen "
            "K\u00fcste, genau dort, wo das Meer sich zwischen D\u00e4nemark und "
            "Schweden verengt. Shakespeare schrieb das St\u00fcck um 1600 und "
            "machte damit eine Milit\u00e4rfestung zur legend\u00e4rsten Burg der Welt."
        ),
        # P2 — Shakespeare never went there
        (
            "Das Verr\u00fcckte daran: Shakespeare hat Kronborg wahrscheinlich nie "
            "betreten. Musste er auch nicht. 1585 lud der d\u00e4nische K\u00f6nig "
            "Friedrich\u00a0II. englische Schauspieler ein, auf der Burg aufzutreten. "
            "Einige von ihnen schlossen sich sp\u00e4ter Shakespeares Theatertruppe "
            "an, der gr\u00f6\u00dften in London. Sie brachten Geschichten mit von "
            "schneidenden Winden, gewaltigen Steinmauern und einem Nebel, der vom "
            "Meer aufstieg, als w\u00e4re der Ort verflucht. Shakespeare h\u00f6rte "
            "zu. Und dann schrieb er."
        ),
        # P3 — Saxo Grammaticus and the source legend
        (
            "Die Geschichte hat er sich auch nicht selbst ausgedacht. Um 1200 "
            "schrieb ein d\u00e4nischer Chronist namens Saxo Grammaticus die "
            "Legende von Amleth nieder \u2014 ein Prinz, dessen Onkel den Vater "
            "ermordet, die Mutter geheiratet und den Thron gestohlen hatte. Amleth "
            "\u00fcberlebte, indem er den Wahnsinnigen spielte, bis er sich r\u00e4chen "
            "konnte. Die Geschichte wanderte jahrhundertelang durch Europa und "
            "erreichte Shakespeare \u00fcber eine franz\u00f6sische "
            "Nacherz\u00e4hlung von 1570. Gleiche Knochen. V\u00f6llig anderes Tier."
        ),
        # P4 — What Shakespeare added
        (
            "Was Shakespeare aus dieser alten Legende machte, war etwas v\u00f6llig "
            "Neues. Er f\u00fcgte einen Geist hinzu \u2014 den ermordeten K\u00f6nig, "
            "der um Mitternacht auf den Zinnen erscheint und Rache fordert. Er "
            "erfand die \u00abMausefalle\u00bb, ein St\u00fcck im St\u00fcck, mit "
            "dem Hamlet seinen Onkel \u00fcberf\u00fchren will. Er schenkte uns "
            "Ophelia, deren Wahnsinn das Publikum bis heute ersch\u00fcttert. Und "
            "er gab Hamlet das, was ihn unsterblich machte: einen Prinzen, der zu "
            "viel denkt, zu tief f\u00fchlt und nicht handeln kann."
        ),
        # P5 — "To be or not to be"
        (
            "\u00abSein oder Nichtsein, das ist hier die Frage.\u00bb Dieser Satz "
            "ist nicht einfach Theater. Es ist der Moment, in dem jemand endlich "
            "in Worte gefasst hat, was jeder Mensch schon gef\u00fchlt hat: das "
            "erdr\u00fcckende Gewicht, am Leben zu sein, wenn das Leben wehtut. "
            "Hamlet fragt nicht n\u00fcchtern nach dem Ende \u2014 er fragt, ob es "
            "mutiger ist, weiterzumachen oder aufzuh\u00f6ren. Shakespeare schrieb "
            "das vor \u00fcber vierhundert Jahren, und Menschen klammern sich in "
            "ihren dunkelsten Stunden noch immer an diese Worte. Das ist kein gutes "
            "Schreiben. Das ist ewig."
        ),
        # P6 — Yorick's skull
        (
            "Und dann ist da der Sch\u00e4del. Hamlet hebt den Sch\u00e4del von "
            "Yorick auf \u2014 dem Hofnarren, der ihn als Kind zum Lachen brachte "
            "\u2014 und spricht mit ihm. Es ist der Moment, in dem der Tod "
            "aufh\u00f6rt, eine Idee zu sein, und pers\u00f6nlich wird. Jemand, "
            "den er geliebt hat, ist jetzt nur noch Knochen in seiner Hand. Dieses "
            "Bild \u2014 ein Mann, der einen Sch\u00e4del h\u00e4lt und begreift, "
            "dass alles, was er liebt, genauso enden wird \u2014 geh\u00f6rt zu "
            "den bekanntesten der gesamten Kunstgeschichte. Vier Jahrhunderte, und "
            "es trifft immer noch."
        ),
        # P7 — Modern performances at Kronborg
        (
            "Heute finden auf Schloss Kronborg Auff\u00fchrungen von Hamlet statt, "
            "direkt auf dem Gel\u00e4nde. Laurence Olivier, Kenneth Branagh und "
            "Jude Law haben hier den Prinzen gespielt und Shakespeares Verse auf "
            "den echten Zinnen gesprochen, \u00fcber dem echten Meer. Die Burg und "
            "das St\u00fcck sind so untrennbar verwoben, dass man an das eine nicht "
            "mehr denken kann, ohne das andere mitzudenken. Geh an einem nebligen "
            "Abend \u00fcber diese Mauern und sag mir, dass du den Geist nicht sp\u00fcrst."
        ),
        # P8 — Closing with proverb subversion
        (
            "Shakespeare war nie in Kronborg. Er schrieb \u00fcber einen erfundenen "
            "Prinzen in einer echten Burg, und vier Jahrhunderte sp\u00e4ter wirkt "
            "dieser Prinz lebendiger als die meisten K\u00f6nige, die dort "
            "geschlafen haben. Aller guten Dinge sind drei, hei\u00dft es \u2014 "
            "aber in Elsinore waren es keine guten Dinge, und es blieb nicht bei "
            "drei. Hamlets Fragen \u00fcber Gerechtigkeit, Trauer und ob das "
            "Richtige \u00fcberhaupt m\u00f6glich ist, wenn man kaum aus dem Bett "
            "kommt \u2014 die sind nicht d\u00e4nisch, nicht englisch. Die "
            "geh\u00f6ren uns allen."
        ),
    ],
)


# ============================================================
# PUSH TO DYNAMODB
# ============================================================

def main():
    client = boto3.client("dynamodb", region_name=REGION)

    stories = [
        ("es", "Spanish", ES),
        ("fr", "French", FR),
        ("de", "German", DE),
    ]

    # First validate all items by printing a summary
    for lang, name, item in stories:
        print(f"\n{'='*60}")
        print(f"  {name} ({lang})")
        print(f"{'='*60}")
        print(f"  Title:       {item['title']['S']}")
        print(f"  Subtitle:    {item['subtitle']['S']}")
        print(f"  langStoryId: {item['langStoryId']['S']}")
        print(f"  Paragraphs:  {len(item['paragraphs']['L'])}")
        total_chars = sum(len(p['M']['text']['S']) for p in item['paragraphs']['L'])
        print(f"  Total chars: {total_chars}")
        for i, p in enumerate(item['paragraphs']['L'], 1):
            text = p['M']['text']['S']
            words = len(text.split())
            print(f"    P{i}: {len(text)} chars, {words} words")

    # Validate JSON serialization
    for lang, name, item in stories:
        try:
            json.dumps(item, ensure_ascii=False)
            print(f"\n  [OK] {name} JSON valid")
        except Exception as e:
            print(f"\n  [FAIL] {name} JSON error: {e}")
            sys.exit(1)

    # Push each record
    for lang, name, item in stories:
        print(f"\n  Pushing {name} ({lang})...", end=" ", flush=True)
        try:
            response = client.put_item(
                TableName=TABLE_NAME,
                Item=item,
                ConditionExpression="attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
            )
            http_code = response["ResponseMetadata"]["HTTPStatusCode"]
            print(f"SUCCESS (HTTP {http_code})")
        except client.exceptions.ConditionalCheckFailedException:
            # Record already exists — overwrite with updated version
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

    print(f"\n{'='*60}")
    print(f"  All 3 stories pushed successfully!")
    print(f"  Timestamp: {TIMESTAMP}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
