#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Push recreated versions of "The Black Taj Mahal" story to DynamoDB
in Spanish (es), French (fr), and German (de).

Uses Unicode escape sequences to avoid file-encoding pitfalls.
"""

import boto3
import time
import sys

# Unicode helpers
EM = "\u2014"       # em dash
LG = "\u00ab"       # left guillemet
RG = "\u00bb"       # right guillemet
GQ_OPEN = "\u201e"  # German open quote
GQ_CLOSE = "\u201c" # German close quote

# Config
TABLE_NAME = "Story"
REGION = "eu-north-1"
SITE_ID = "taj-mahal"
STORY_ID = "black-taj-moonlight-twin"
TIMESTAMP = int(time.time())

session = boto3.Session(region_name=REGION)
dynamodb = session.client("dynamodb")


# Shared fields (identical across all languages)
SHARED = {
    "siteId":             {"S": SITE_ID},
    "storyId":            {"S": STORY_ID},
    "icon":               {"S": "\U0001f319"},
    "tier":               {"S": "A"},
    "source":             {"S": "Jean-Baptiste Tavernier, Les Six Voyages (1676, trans. V. Ball 1889); A.C.L. Carlleyle, Archaeological Survey of India Reports (1871); Elizabeth B. Moynihan et al., The Moonlight Garden: New Discoveries at the Taj Mahal, Smithsonian/University of Washington Press (2000); Ebba Koch, The Complete Taj Mahal and the Riverfront Gardens of Agra (2006); R. Nath, The Taj Mahal and Its Incarnation (1985); Wayne E. Begley, 'The Myth of the Taj Mahal and a New Theory of its Symbolic Meaning,' The Art Bulletin Vol. 61 No. 1 (1979)"},
    "readingTimeMinutes": {"N": "3"},
    "image":              {"S": ""},
    "updatedAt":          {"N": str(TIMESTAMP)},
    "disabled":           {"BOOL": False},
    "thumbnail":          {"S": ""},
    "coordinates":        {"M": {"lng": {"N": "78.0421"}, "lat": {"N": "27.1751"}}},
    "hasAudio":           {"BOOL": False},
    "isFree":             {"BOOL": True},
    "storyCategory":      {"S": "riddles_past"},
}


def P(texts):
    """Build DynamoDB paragraph list."""
    return {"L": [{"M": {"text": {"S": t}}} for t in texts]}


def C(chars):
    """Build DynamoDB character list."""
    return {"L": [{"S": c} for c in chars]}


# ============================================================================
# SPANISH (es)
# ============================================================================

es_p1 = (
    "En 1665, un comerciante franc\u00e9s de piedras preciosas llamado "
    "Jean-Baptiste Tavernier lleg\u00f3 a Agra. Hab\u00eda cruzado el mundo "
    "seis veces persiguiendo diamantes y se hab\u00eda ganado la confianza "
    "de la corte mogol. Junto al r\u00edo Yamuna, sus gu\u00edas le contaron "
    "algo extraordinario: el emperador Shah Jahan no se hab\u00eda conformado "
    "con el Taj Mahal blanco para su esposa muerta. Hab\u00eda planeado uno "
    f"id\u00e9ntico de m\u00e1rmol negro {EM} su propia tumba {EM} al otro "
    "lado del r\u00edo."
)

es_p2 = (
    "Tavernier lo public\u00f3 en sus memorias de 1676, pero aqu\u00ed "
    "viene lo interesante: nunca mencion\u00f3 el m\u00e1rmol negro. "
    f"Escribi\u00f3 una sola l\u00ednea {EM} que Shah Jahan empez\u00f3 a "
    "construir su tumba enfrente y que una guerra entre sus hijos lo detuvo. "
    "Nada m\u00e1s. Con los siglos, los escritores fueron a\u00f1adiendo "
    "detalles: la piedra negra, el dise\u00f1o espejo, un puente de plata "
    "uniendo ambos mausoleos. La leyenda se volvi\u00f3 tan hermosa que "
    "todo el mundo la dio por cierta."
)

es_p3 = (
    "En 1871, el arque\u00f3logo brit\u00e1nico A.C.L. Carlleyle pareci\u00f3 "
    f"demostrarlo. Excavaba un jard\u00edn en ruinas llamado Mehtab Bagh {EM} "
    f"el {LG}Jard\u00edn de la Luna{RG} {EM} justo enfrente del Taj. Bajo "
    "siglos de barro encontr\u00f3 piedras ennegrecidas y cimientos enormes. "
    "Declar\u00f3 que hab\u00eda descubierto el Taj Negro. Durante un siglo "
    "nadie lo cuestion\u00f3. Los turistas cruzaban el r\u00edo para pisar "
    "lo que cre\u00edan los restos del sue\u00f1o de Shah Jahan."
)

es_p4 = (
    "En los noventa, los arque\u00f3logos pusieron la leyenda a prueba. "
    "El Servicio Arqueol\u00f3gico de India pas\u00f3 seis a\u00f1os "
    "excavando, removiendo noventa mil metros c\u00fabicos de tierra. Lo "
    f"que encontraron destruy\u00f3 el mito. \u00bfLas {LG}piedras negras"
    f"{RG}? M\u00e1rmol blanco {EM} el mismo del Taj {EM} oscurecido por "
    "siglos de inundaciones y musgo. Los an\u00e1lisis lo confirmaron. Los "
    "cimientos eran pabellones de jard\u00edn alrededor de una piscina. "
    "Sin residuos de cantera, sin escombros. Nada."
)

es_p5 = (
    "Los registros hist\u00f3ricos no dejan dudas. Los cronistas de Shah "
    "Jahan documentaban cada proyecto con obsesi\u00f3n {EM} materiales, "
    "salarios, transporte. Su cr\u00f3nica oficial, el Padshahnama, no dice "
    "nada de una segunda tumba. Ni una palabra. Y el calendario lo hace casi "
    "imposible: el Taj se termin\u00f3 hacia 1653, Shah Jahan enferm\u00f3 "
    "en 1657 y su hijo Aurangzeb lo derroc\u00f3 poco despu\u00e9s. Cuatro "
    f"a\u00f1os {EM} para un monumento que tard\u00f3 veintid\u00f3s en "
    "construirse."
).replace("{EM}", EM)

es_p6 = (
    "Pero lo que s\u00ed encontraron en Mehtab Bagh es m\u00e1s po\u00e9tico "
    "que cualquier leyenda. El jard\u00edn lo hab\u00eda construido Babur, "
    "fundador de la dinast\u00eda mogol, y Shah Jahan lo restaur\u00f3 como "
    "mirador nocturno. Ten\u00eda una piscina octogonal con veinticinco "
    "fuentes, rodeada de flores que solo abr\u00edan de noche. En 2006, los "
    "investigadores llenaron la piscina y esperaron la oscuridad. El Taj "
    f"apareci\u00f3 reflejado en el agua quieta {EM} un gemelo tembloroso "
    "hecho solo de luz de luna."
)

es_p7 = (
    "Dicen que no hay dos sin tres. Pero en esta historia no hubo ni "
    f"dos {EM} solo un hombre, su dolor y un sue\u00f1o que el mundo "
    "invent\u00f3 por \u00e9l. La leyenda sobrevive porque la necesitamos: "
    "un emperador tan roto por el amor que un monumento no bastaba, detenido "
    "solo por la traici\u00f3n de su hijo. Esa versi\u00f3n convierte el "
    f"Taj en algo m\u00e1s que una tumba {EM} un monumento a la ambici\u00f3n "
    "imposible. Y eso golpea m\u00e1s fuerte."
)

es_p8 = (
    "Pero la verdad es mejor. En las noches de luna, Shah Jahan "
    f"{EM} incluso desde su prisi\u00f3n en el Fuerte de Agra {EM} "
    "pod\u00eda ver c\u00f3mo el Yamuna convert\u00eda el Taj blanco en "
    "su propio reflejo oscuro. Algo que no puedes tocar, ni entrar, ni "
    "conservar. Aparece cuando el agua est\u00e1 quieta y desaparece en "
    "cuanto se mueve. Quiz\u00e1s ese sea el monumento m\u00e1s fiel al "
    f"duelo {EM} no permanente, sino tembloroso y vivo. El Taj Negro nunca "
    "se construy\u00f3 porque nunca hizo falta. El r\u00edo lo constru\u00eda "
    "cada noche."
)

ES = {
    **SHARED,
    "lang":        {"S": "es"},
    "langStoryId": {"S": "es#black-taj-moonlight-twin"},
    "title":       {"S": "El Taj Negro"},
    "subtitle":    {"S": "El chisme de un joyero franc\u00e9s, el error de un arque\u00f3logo victoriano y la leyenda arquitect\u00f3nica m\u00e1s hermosa que jam\u00e1s existi\u00f3"},
    "excerpt":     {"S": f"En una noche de 1665, un comerciante franc\u00e9s de gemas se detuvo junto al r\u00edo Yamuna y escuch\u00f3 una historia que perseguir\u00eda al mundo durante cuatro siglos: que Shah Jahan hab\u00eda planeado construir un segundo Taj Mahal {EM} de m\u00e1rmol negro."},
    "era":         {"S": "1665 (visita de Tavernier); 1871 (excavaci\u00f3n de Carlleyle); 1994\u20132006 (desmentido arqueol\u00f3gico)"},
    "characters":  C([
        "Jean-Baptiste Tavernier (comerciante franc\u00e9s de gemas)",
        "Shah Jahan (emperador)",
        "A.C.L. Carlleyle (arque\u00f3logo brit\u00e1nico)",
        "Aurangzeb (hijo y usurpador)",
        "Ebba Koch (historiadora del arte, Universidad de Viena)",
    ]),
    "paragraphs":  P([es_p1, es_p2, es_p3, es_p4, es_p5, es_p6, es_p7, es_p8]),
    "moralOrLesson": {"S": f"Las leyendas que m\u00e1s duran no son las verdaderas, sino las demasiado hermosas para abandonar {EM} y a veces el reflejo de una obra maestra, temblando sobre el agua oscura, es m\u00e1s conmovedor que cualquier monumento que las manos humanas puedan construir."},
}


# ============================================================================
# FRENCH (fr)
# ============================================================================

fr_p1 = (
    "En 1665, un marchand de pierres pr\u00e9cieuses nomm\u00e9 "
    "Jean-Baptiste Tavernier arriva \u00e0 Agra. Il avait travers\u00e9 "
    "le globe six fois pour des diamants et r\u00e9ussi \u00e0 se frayer "
    "un chemin jusqu\u2019\u00e0 la cour moghole. Au bord de la Yamuna, "
    "ses guides lui racont\u00e8rent quelque chose d\u2019incroyable : "
    "l\u2019empereur Shah Jahan ne s\u2019\u00e9tait pas content\u00e9 "
    "du Taj Mahal blanc pour son \u00e9pouse d\u00e9funte. Il en avait "
    f"pr\u00e9vu un deuxi\u00e8me {EM} identique, mais en marbre noir "
    f"{EM} pour sa propre tombe, sur l\u2019autre rive."
)

fr_p2 = (
    "Tavernier publia \u00e7a dans ses m\u00e9moires de 1676. Mais "
    "attention : il n\u2019a jamais mentionn\u00e9 de marbre noir. Il a "
    f"\u00e9crit une seule phrase {EM} que Shah Jahan avait commenc\u00e9 "
    "\u00e0 b\u00e2tir son tombeau en face, et qu\u2019une guerre entre "
    "ses fils l\u2019en avait emp\u00each\u00e9. Point. Au fil des "
    "si\u00e8cles, les auteurs ont brod\u00e9 : la pierre noire, le plan "
    "en miroir, un pont d\u2019argent reliant les deux mausol\u00e9es. "
    "La l\u00e9gende est devenue si belle que tout le monde l\u2019a "
    "prise pour argent comptant."
)

fr_p3 = (
    "En 1871, l\u2019arch\u00e9ologue britannique A.C.L. Carlleyle "
    "sembla le confirmer. Il fouillait un jardin en ruines nomm\u00e9 "
    f"Mehtab Bagh {EM} le {LG} Jardin du Clair de Lune {RG} {EM} pile "
    "en face du Taj. Sous des si\u00e8cles de boue, il trouva des "
    "pierres noircies et des fondations qui \u00e9voquaient la base de "
    "quelque chose d\u2019immense. Il annon\u00e7a avoir d\u00e9couvert "
    "le Taj Noir. Pendant un si\u00e8cle, personne ne le contesta. Les "
    "touristes traversaient le fleuve pour marcher sur ce qu\u2019ils "
    "croyaient \u00eatre les vestiges du r\u00eave de Shah Jahan."
)

fr_p4 = (
    "Dans les ann\u00e9es 1990, les arch\u00e9ologues test\u00e8rent "
    "enfin la l\u00e9gende. Le Service arch\u00e9ologique indien passa "
    "six ans \u00e0 fouiller le site, d\u00e9pla\u00e7ant quatre-vingt-dix "
    "mille m\u00e8tres cubes de terre. Ce qu\u2019ils trouv\u00e8rent "
    f"tua le mythe net. Les fameuses {LG} pierres noires {RG} ? Du marbre "
    f"blanc {EM} exactement le m\u00eame que celui du Taj {EM} noirci par "
    "des si\u00e8cles d\u2019inondations et de mousse. Les analyses de "
    "laboratoire le confirm\u00e8rent. Les fondations \u00e9taient des "
    "pavillons de jardin autour d\u2019un bassin. Aucun d\u00e9chet de "
    "carri\u00e8re. Rien."
)

fr_p5 = (
    "Les archives le confirment. Les chroniqueurs de Shah Jahan "
    "consignaient chaque projet avec une obsession maniaque "
    f"{EM} mat\u00e9riaux, salaires, main-d\u2019\u0153uvre, transport. "
    "Leur chronique, le Padshahnama, ne mentionne aucun second tombeau. "
    "Pas un mot. Et le calendrier rend la chose quasi impossible : le "
    "Taj ne fut termin\u00e9 que vers 1653, Shah Jahan tomba malade en "
    "1657, et son fils Aurangzeb le renversa dans la foul\u00e9e. Quatre "
    f"ans {EM} pour un monument qui en avait demand\u00e9 vingt-deux."
)

fr_p6 = (
    "Mais ce qu\u2019on a vraiment trouv\u00e9 \u00e0 Mehtab Bagh est "
    "plus beau que toutes les l\u00e9gendes. Le jardin avait \u00e9t\u00e9 "
    "cr\u00e9\u00e9 par Babur, fondateur de la dynastie moghole, et Shah "
    "Jahan l\u2019avait restaur\u00e9 comme terrasse contemplative au "
    "clair de lune. Il y avait un bassin octogonal avec vingt-cinq "
    "fontaines, entour\u00e9 de fleurs qui ne s\u2019ouvraient que la "
    "nuit. En 2006, des chercheurs remplirent le bassin et attendirent "
    f"l\u2019obscurit\u00e9. Le Taj apparut dans l\u2019eau immobile {EM} "
    "un double tremblant, fait de rien d\u2019autre que de lumi\u00e8re."
)

fr_p7 = (
    "On dit jamais deux sans trois. Mais ici, il n\u2019y a m\u00eame "
    f"jamais eu de deux {EM} juste un homme, son chagrin, et un r\u00eave "
    "que le monde a invent\u00e9 \u00e0 sa place. La l\u00e9gende survit "
    "parce qu\u2019on en a besoin : un empereur si bris\u00e9 par "
    "l\u2019amour qu\u2019un seul monument ne suffisait pas, arr\u00eat\u00e9 "
    "uniquement par la trahison de son fils. Cette version transforme le "
    f"Taj en plus qu\u2019un tombeau {EM} en monument \u00e0 l\u2019ambition "
    "impossible. Et \u00e7a frappe bien plus fort."
)

fr_p8 = (
    "Mais la v\u00e9rit\u00e9 est plus belle. Les nuits de lune, Shah "
    f"Jahan {EM} m\u00eame depuis sa prison au Fort d\u2019Agra {EM} "
    "pouvait regarder la Yamuna transformer le Taj blanc en son propre "
    "reflet obscur. Quelque chose qu\u2019on ne peut ni toucher, ni "
    "p\u00e9n\u00e9trer, ni garder. Il appara\u00eet quand l\u2019eau "
    "est calme et s\u2019efface d\u00e8s qu\u2019elle fr\u00e9mit. "
    "C\u2019est peut-\u00eatre le monument le plus juste au deuil "
    f"{EM} pas \u00e9ternel, mais tremblant et vivant. Le Taj Noir "
    "n\u2019a jamais \u00e9t\u00e9 construit parce qu\u2019il n\u2019en "
    "a jamais eu besoin. Le fleuve le b\u00e2tissait chaque nuit."
)

FR = {
    **SHARED,
    "lang":        {"S": "fr"},
    "langStoryId": {"S": "fr#black-taj-moonlight-twin"},
    "title":       {"S": "Le Taj Noir"},
    "subtitle":    {"S": "Le ragot d\u2019un joaillier fran\u00e7ais, l\u2019erreur d\u2019un arch\u00e9ologue victorien et la plus belle l\u00e9gende architecturale qui n\u2019ait jamais exist\u00e9"},
    "excerpt":     {"S": f"Par une nuit de 1665, un marchand de pierres pr\u00e9cieuses fran\u00e7ais se tenait au bord de la Yamuna et entendit une histoire qui allait hanter le monde pendant quatre si\u00e8cles : Shah Jahan avait pr\u00e9vu de construire un second Taj Mahal {EM} en marbre noir."},
    "era":         {"S": "1665 (visite de Tavernier) ; 1871 (fouilles de Carlleyle) ; 1994\u20132006 (d\u00e9menti arch\u00e9ologique)"},
    "characters":  C([
        "Jean-Baptiste Tavernier (marchand de pierres pr\u00e9cieuses fran\u00e7ais)",
        "Shah Jahan (empereur)",
        "A.C.L. Carlleyle (arch\u00e9ologue britannique)",
        "Aurangzeb (fils et usurpateur)",
        "Ebba Koch (historienne de l\u2019art, Universit\u00e9 de Vienne)",
    ]),
    "paragraphs":  P([fr_p1, fr_p2, fr_p3, fr_p4, fr_p5, fr_p6, fr_p7, fr_p8]),
    "moralOrLesson": {"S": f"Les l\u00e9gendes les plus durables ne sont pas les plus vraies, mais celles qu\u2019on trouve trop belles pour abandonner {EM} et parfois le reflet d\u2019un chef-d\u2019\u0153uvre, tremblant sur l\u2019eau sombre, est plus saisissant que n\u2019importe quel monument b\u00e2ti de main d\u2019homme."},
}


# ============================================================================
# GERMAN (de)
# ============================================================================

de_p1 = (
    "Im Jahr 1665 kam ein franz\u00f6sischer Edelsteinh\u00e4ndler "
    "namens Jean-Baptiste Tavernier nach Agra. Er hatte die Welt sechs "
    "Mal auf der Jagd nach Diamanten durchquert und sich bis an den "
    "Mogulhof vorgearbeitet. Am Ufer der Yamuna erz\u00e4hlten ihm "
    "seine F\u00fchrer etwas Unglaubliches: Kaiser Shah Jahan hatte "
    "sich nicht mit dem wei\u00dfen Taj Mahal f\u00fcr seine "
    "verstorbene Frau begn\u00fcgt. Er hatte ein zweites geplant "
    f"{EM} identisch, aber komplett aus schwarzem Marmor {EM} als "
    "sein eigenes Grab auf der anderen Flussseite."
)

de_p2 = (
    "Tavernier ver\u00f6ffentlichte das in seinen Memoiren von 1676. "
    "Aber hier wird es interessant: Er erw\u00e4hnte nie schwarzen "
    f"Marmor. Er schrieb genau einen Satz {EM} dass Shah Jahan "
    "angefangen hatte, sein Grab gegen\u00fcber zu errichten, und dass "
    "ein Krieg zwischen seinen S\u00f6hnen ihn daran hinderte. Mehr "
    "nicht. Im Laufe der Jahrhunderte schm\u00fcckten Autoren die "
    "Geschichte aus: der schwarze Stein, der Spiegelentwurf, eine "
    "silberne Br\u00fccke zwischen beiden Mausoleen. Die Legende wurde "
    "so sch\u00f6n, dass sie jeder f\u00fcr wahr hielt."
)

de_p3 = (
    "1871 schien der britische Arch\u00e4ologe A.C.L. Carlleyle den "
    "Beweis zu liefern. Er grub in einem verfallenen Garten namens "
    f"Mehtab Bagh {EM} dem {GQ_OPEN}Mondlichtgarten{GQ_CLOSE} {EM} "
    "direkt gegen\u00fcber vom Taj. Unter Jahrhunderten von Schlamm "
    "fand er geschw\u00e4rzte Steine und Fundamente, die nach etwas "
    "Gewaltigem aussahen. Er erkl\u00e4rte, das Schwarze Taj gefunden "
    "zu haben. Ein Jahrhundert lang widersprach ihm niemand. Touristen "
    "\u00fcberquerten den Fluss, um auf den vermeintlichen Ruinen von "
    "Shah Jahans Traum zu stehen."
)

de_p4 = (
    "In den Neunzigern stellten Arch\u00e4ologen die Legende endlich "
    "auf die Probe. Indiens Arch\u00e4ologischer Dienst verbrachte "
    "sechs Jahre mit Ausgrabungen und bewegte neunzigtausend Kubikmeter "
    "Erde. Was sie fanden, zerst\u00f6rte den Mythos. Die "
    f"{GQ_OPEN}schwarzen Steine{GQ_CLOSE}? Wei\u00dfer Marmor {EM} "
    f"derselbe wie beim Taj {EM} durch Jahrhunderte von "
    "\u00dcberschwemmungen und Moos verf\u00e4rbt. Laboranalysen "
    "best\u00e4tigten es. Die Fundamente waren Gartenpavillons um ein "
    "Becken. Kein Steinbruchabfall, kein Schutt. Nichts."
)

de_p5 = (
    "Die historischen Aufzeichnungen best\u00e4tigen das. Shah Jahans "
    "Chronisten dokumentierten jedes Projekt geradezu besessen "
    f"{EM} Materialien, L\u00f6hne, Arbeitskraft, Transport. Ihre "
    "Chronik, das Padshahnama, erw\u00e4hnt kein zweites Grab. Kein "
    "einziges Wort. Und der Zeitrahmen macht es fast unm\u00f6glich: "
    "Das Taj wurde erst um 1653 fertig, Shah Jahan erkrankte 1657, und "
    "sein Sohn Aurangzeb st\u00fcrzte ihn kurz darauf. Vier Jahre "
    f"{EM} f\u00fcr ein Bauwerk, das zweiundzwanzig gebraucht hatte."
)

de_p6 = (
    "Aber was man tats\u00e4chlich in Mehtab Bagh fand, ist poetischer "
    "als jede Legende. Den Garten hatte Babur angelegt, der "
    "Gr\u00fcnder der Moguldynastie, und Shah Jahan hatte ihn als "
    "Aussichtsterrasse f\u00fcr Mondn\u00e4chte restauriert. Da war "
    "ein achteckiges Becken mit f\u00fcnfundzwanzig Font\u00e4nen, "
    "umgeben von Blumen, die nur nachts aufgingen. 2006 f\u00fcllten "
    "Forscher das Becken und warteten auf die Dunkelheit. Das Taj "
    f"erschien im stillen Wasser {EM} ein zitterndes Ebenbild, gemacht "
    "aus nichts als Mondlicht."
)

de_p7 = (
    "Man sagt, aller guten Dinge sind drei. Aber manchmal reicht eins "
    f"{EM} wenn der Fluss das zweite baut. Die Legende \u00fcberlebt, "
    "weil wir sie brauchen: ein Kaiser, so gebrochen vor Liebe, dass "
    "ein einziges Monument nicht reichte, aufgehalten nur durch den "
    "Verrat seines Sohnes. Diese Version macht das Taj zu mehr als "
    f"einem Grab {EM} zu einem Denkmal f\u00fcr unm\u00f6glichen "
    "Ehrgeiz. Und das trifft h\u00e4rter."
)

de_p8 = (
    "Aber die Wahrheit ist besser. In Mondn\u00e4chten konnte Shah "
    f"Jahan {EM} selbst aus seinem Gef\u00e4ngnis im Fort von Agra "
    f"{EM} zusehen, wie die Yamuna das wei\u00dfe Taj in sein eigenes "
    "dunkles Spiegelbild verwandelte. Etwas, das man nicht "
    "ber\u00fchren, nicht betreten, nicht behalten kann. Es erscheint, "
    "wenn das Wasser still ist, und verschwindet, sobald es sich "
    "bewegt. Vielleicht ist das das treueste Denkmal f\u00fcr Trauer "
    f"{EM} nicht dauerhaft, sondern zitternd und lebendig. Das "
    "Schwarze Taj wurde nie gebaut, weil es nie n\u00f6tig war. "
    "Der Fluss baute es jede Nacht."
)

DE = {
    **SHARED,
    "lang":        {"S": "de"},
    "langStoryId": {"S": "de#black-taj-moonlight-twin"},
    "title":       {"S": "Das Schwarze Taj"},
    "subtitle":    {"S": f"Der Klatsch eines franz\u00f6sischen Juwelenh\u00e4ndlers, der Irrtum eines viktorianischen Arch\u00e4ologen und die sch\u00f6nste Architekturlegende, die nie existiert hat"},
    "excerpt":     {"S": f"In einer stillen Nacht im Jahr 1665 stand ein franz\u00f6sischer Edelsteinh\u00e4ndler am Ufer der Yamuna und h\u00f6rte eine Geschichte, die die Welt vier Jahrhunderte lang verfolgen sollte: Shah Jahan habe einen zweiten Taj Mahal geplant {EM} aus schwarzem Marmor."},
    "era":         {"S": "1665 (Taverniers Besuch); 1871 (Carlleyles Ausgrabung); 1994\u20132006 (arch\u00e4ologische Widerlegung)"},
    "characters":  C([
        "Jean-Baptiste Tavernier (franz\u00f6sischer Edelsteinh\u00e4ndler)",
        "Shah Jahan (Kaiser)",
        "A.C.L. Carlleyle (britischer Arch\u00e4ologe)",
        "Aurangzeb (Sohn und Usurpator)",
        "Ebba Koch (Kunsthistorikerin, Universit\u00e4t Wien)",
    ]),
    "paragraphs":  P([de_p1, de_p2, de_p3, de_p4, de_p5, de_p6, de_p7, de_p8]),
    "moralOrLesson": {"S": f"Die best\u00e4ndigsten Legenden sind nicht die wahren, sondern die, die zu sch\u00f6n sind, um sie aufzugeben {EM} und manchmal ist das Spiegelbild eines Meisterwerks, zitternd auf dunklem Wasser, ergreifender als jedes Bauwerk, das Menschenh\u00e4nde je errichten k\u00f6nnten."},
}


# ============================================================================
# Validation & Push
# ============================================================================

def validate_item(item, lang):
    errors = []
    required = [
        "siteId", "langStoryId", "lang", "title", "subtitle", "excerpt",
        "paragraphs", "moralOrLesson", "characters", "storyId", "era",
        "source", "icon", "tier", "coordinates",
    ]
    for key in required:
        if key not in item:
            errors.append(f"Missing key: {key}")

    if item["lang"]["S"] != lang:
        errors.append(f"lang mismatch: expected {lang}, got {item['lang']['S']}")
    expected_lsid = f"{lang}#black-taj-moonlight-twin"
    if item["langStoryId"]["S"] != expected_lsid:
        errors.append(f"langStoryId mismatch: expected {expected_lsid}")

    paras = item["paragraphs"]["L"]
    if not (6 <= len(paras) <= 10):
        errors.append(f"Paragraph count {len(paras)} not in range 6-10")

    for i, p in enumerate(paras):
        text = p["M"]["text"]["S"]
        cc = len(text)
        wc = len(text.split())
        if cc > 600:
            errors.append(f"P{i+1}: {cc} chars (max 600)")
        if wc > 120:
            errors.append(f"P{i+1}: {wc} words (max 120)")

    total = sum(len(p["M"]["text"]["S"]) for p in paras)
    if total < 1800 or total > 4500:
        errors.append(f"Total chars {total} outside 1800-4500 range")

    return errors


def push_item(item, lang):
    print(f"\n{'='*60}")
    print(f"  PUSHING: {lang.upper()} \u2014 {item['title']['S']}")
    print(f"{'='*60}")

    errors = validate_item(item, lang)
    if errors:
        print(f"  VALIDATION FAILED for {lang}:")
        for e in errors:
            print(f"    \u2717 {e}")
        return False

    paras = item["paragraphs"]["L"]
    total = sum(len(p["M"]["text"]["S"]) for p in paras)
    print(f"  Paragraphs: {len(paras)}")
    print(f"  Total chars (paragraphs): {total}")
    for i, p in enumerate(paras):
        t = p["M"]["text"]["S"]
        print(f"    P{i+1}: {len(t)} chars, {len(t.split())} words")

    try:
        dynamodb.put_item(
            TableName=TABLE_NAME,
            Item=item,
            ConditionExpression="attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
        )
        print(f"\n  \u2713 SUCCESS: {lang}#black-taj-moonlight-twin pushed to DynamoDB")
        return True
    except dynamodb.exceptions.ConditionalCheckFailedException:
        print(f"\n  \u26a0 Record already exists for {lang}#black-taj-moonlight-twin")
        print(f"    Overwriting with updated version...")
        try:
            dynamodb.put_item(TableName=TABLE_NAME, Item=item)
            print(f"  \u2713 SUCCESS: {lang}#black-taj-moonlight-twin overwritten")
            return True
        except Exception as e:
            print(f"  \u2717 FAILED to overwrite {lang}: {e}")
            return False
    except Exception as e:
        print(f"  \u2717 FAILED to push {lang}: {e}")
        return False


# Main
if __name__ == "__main__":
    # Print a sample paragraph per language for visual verification
    print("="*60)
    print("  SAMPLE OUTPUT (last paragraph per language)")
    print("="*60)
    for lang, item in [("es", ES), ("fr", FR), ("de", DE)]:
        last = item["paragraphs"]["L"][-1]["M"]["text"]["S"]
        print(f"\n  [{lang}] {last[:120]}...")

    print("\n")

    results = {}
    for lang, item in [("es", ES), ("fr", FR), ("de", DE)]:
        results[lang] = push_item(item, lang)

    print(f"\n{'='*60}")
    print("  SUMMARY")
    print(f"{'='*60}")
    all_ok = True
    for lang, ok in results.items():
        status = "\u2713 OK" if ok else "\u2717 FAILED"
        print(f"  {lang}: {status}")
        if not ok:
            all_ok = False

    if not all_ok:
        print("\n  Some pushes failed. Check errors above.")
        sys.exit(1)
    else:
        print(f"\n  All three languages pushed successfully.")
        print(f"  updatedAt: {TIMESTAMP}")
        sys.exit(0)
