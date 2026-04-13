/**
 * Push "Empire of the Dead" story in Spanish, French, and German
 * to the Story DynamoDB table.
 *
 * Each version is a native retelling — not a translation.
 */

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (copied from the English record) ─────────────────────────
const shared = {
  siteId:             { S: "catacombs-of-paris" },
  storyId:            { S: "empire-of-the-dead" },
  icon:               { S: "💀" },
  tier:               { S: "A" },
  source:             { S: "Archives de Paris; Inspection Générale des Carrières records" },
  era:                { S: "Late 18th century (1786-1788)" },
  readingTimeMinutes: { N: "2" },
  image:              { S: "" },
  disabled:           { BOOL: false },
  thumbnail:          { S: "" },
  coordinates:        { M: { lng: { N: "2.3324" }, lat: { N: "48.8338" } } },
  hasAudio:           { BOOL: false },
  isFree:             { BOOL: true },
  storyCategory:      { S: "ghosts_curses" },
  updatedAt:          { N: String(now) },
};

// ═════════════════════════════════════════════════════════════════════════════
//  SPANISH
// ═════════════════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang:        { S: "es" },
  langStoryId: { S: "es#empire-of-the-dead" },

  title:    { S: "El imperio de los muertos — Seis millones de huesos hechos arte" },
  subtitle: { S: "Cuando París se quedó sin sitio para sus muertos, les construyó un palacio bajo tierra" },
  excerpt:  { S: "Dicen que toda paciencia tiene un límite. La de París con sus muertos duró mil años. Durante siglos, los parisinos enterraron cadáveres en los mismos cementerios, y el más grande — el de los Santos Inocentes — estaba en pleno centro de la ciudad." },

  moralOrLesson: { S: "La muerte es la gran igualadora — las jerarquías que construimos en vida no significan nada cuando todo se reduce a hueso." },

  characters: { L: [
    { S: "Ingenieros municipales de París" },
    { S: "Trabajadores nocturnos" },
    { S: "Seis millones de parisinos anónimos" },
    { S: "Inspector general de las canteras" },
  ]},

  paragraphs: { L: [
    { M: { text: { S:
      "Dicen que toda paciencia tiene un límite. La de París con sus muertos duró mil años. Durante siglos, los parisinos enterraron cadáveres en los mismos cementerios, y el más grande — el de los Santos Inocentes — estaba en pleno centro de la ciudad. Las tumbas se apilaban a diez niveles de profundidad. En 1780, el muro de un sótano junto al cementerio reventó, y una avalancha de restos en descomposición inundó la bodega de un vecino. La ciudad se pudría desde dentro."
    }}},
    { M: { text: { S:
      "En 1786, las autoridades tomaron la decisión más macabra de la historia de París: desenterrar todos los grandes cementerios y trasladar los huesos al subsuelo. Bajo la ciudad se extendían más de trescientos kilómetros de túneles abandonados — antiguas canteras de caliza que desde la Edad Media habían dado la piedra para construir Notre-Dame, el Louvre y esos palacios que hoy todo el mundo fotografía. Ahora, los túneles vacíos iban a acoger a seis millones de nuevos residentes."
    }}},
    { M: { text: { S:
      "El traslado solo ocurría después del anochecer. La Iglesia lo exigió: mover a los muertos era un acto sagrado. Cada noche, carretas cubiertas cargadas de huesos recorrían las calles a la luz de antorchas mientras sacerdotes caminaban al lado entonando oraciones. Imagina vivir en una de esas rutas: el chirrido de las ruedas sobre el empedrado, los rezos graves, y la certeza de lo que llevaban encima. Noche tras noche, año tras año. Seis millones de personas trasladadas una carreta a la vez."
    }}},
    { M: { text: { S:
      "Aquí la historia da su giro más increíble. En vez de amontonar los restos en un túnel y olvidarse, los trabajadores empezaron a disponerlos como si fuera arte. Fémures apilados en muros perfectos, fila tras fila, del suelo al techo. Cráneos colocados a intervalos regulares formando cruces, corazones y figuras geométricas. Los huesos dejaron de ser restos y se convirtieron en arquitectura. Y sobre la entrada, alguien grabó la frase que bautizó este lugar para siempre: «Detente. Este es el imperio de los muertos.»"
    }}},
    { M: { text: { S:
      "Lo que más impacta es esto: nadie clasificó los huesos. El fémur de un rey descansa junto al de un mendigo. El cráneo de una monja comparte pared con el de un criminal. París sobrevivió revoluciones, epidemias y siglos de guerras, y toda esa gente — los poderosos y los olvidados — terminó en el mismo muro, sin nombre. Seis millones de vidas, y ni un solo nombre sobrevivió. La muerte dejó claro lo que arriba nadie quiso aceptar: al final, nadie es más que nadie."
    }}},
    { M: { text: { S:
      "Hoy puedes recorrer un kilómetro y medio de este palacio subterráneo de huesos — una fracción mínima de la red completa de túneles bajo París. Los pasillos son estrechos, húmedos, y están forrados del suelo al techo con restos de personas que un día caminaron por las mismas calles que tú recorriste para llegar. Fueron panaderos, soldados, madres, criminales, sacerdotes. Ahora todos comparten el mismo tono blanco, dispuestos en patrones que son a la vez hermosos y profundamente inquietantes."
    }}},
    { M: { text: { S:
      "Las catacumbas de París no son un cementerio. Son un monumento a lo único que compartimos todos los seres humanos que hemos pisado este planeta. Puedes construir un imperio, escribir una obra maestra, pasarte la vida entera luchando porque el mundo recuerde tu nombre… y tus huesos van a acabar en una pared junto a los de un desconocido. Eso es lo más aterrador de París, o lo más honesto. Tú decides."
    }}},
  ]},
};

// ═════════════════════════════════════════════════════════════════════════════
//  FRENCH
// ═════════════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang:        { S: "fr" },
  langStoryId: { S: "fr#empire-of-the-dead" },

  title:    { S: "L'Empire de la Mort — Six millions d'os devenus œuvres d'art" },
  subtitle: { S: "Quand Paris n'a plus eu de place pour ses morts, elle leur a bâti un palais sous terre" },
  excerpt:  { S: "Imaginez le Paris des années 1780. Pas la Ville Lumière — une ville qui suffoquait sous ses propres morts. Depuis plus de mille ans, on enterrait les défunts dans les mêmes cimetières. Le plus grand, les Saints-Innocents, se trouvait en plein cœur de Paris." },

  moralOrLesson: { S: "La mort est la grande égalisatrice — les hiérarchies que nous bâtissons de notre vivant n'ont plus aucun sens une fois réduits à l'os." },

  characters: { L: [
    { S: "Ingénieurs de la Ville de Paris" },
    { S: "Ouvriers de nuit" },
    { S: "Six millions de Parisiens anonymes" },
    { S: "Inspecteur général des carrières" },
  ]},

  paragraphs: { L: [
    { M: { text: { S:
      "Imaginez le Paris des années 1780. Pas la Ville Lumière — une ville qui suffoquait sous ses propres morts. Depuis plus de mille ans, on enterrait les défunts dans les mêmes cimetières. Le plus grand, les Saints-Innocents, se trouvait en plein cœur de Paris, les tombes empilées sur dix niveaux. Chassez le naturel, il revient au galop : en 1780, le mur d'une cave voisine a cédé et un torrent de restes en décomposition s'est déversé chez un riverain. La ville pourrissait de l'intérieur."
    }}},
    { M: { text: { S:
      "En 1786, les autorités ont pris une décision radicale : exhumer les grands cimetières de Paris et transférer tous les ossements sous terre. Sous la ville s'étendaient plus de trois cents kilomètres de galeries abandonnées — d'anciennes carrières de calcaire exploitées depuis le Moyen Âge pour bâtir Paris elle-même. Notre-Dame, le Louvre, ces façades en pierre de taille — tout venait de la roche d'en dessous. Désormais, les tunnels vides allaient accueillir six millions de nouveaux résidents."
    }}},
    { M: { text: { S:
      "Le transfert ne se faisait que de nuit. L'Église l'exigeait : déplacer les morts était un acte sacré. Chaque nuit, des chariots bâchés chargés d'ossements traversaient les rues à la lueur des torches, escortés par des prêtres récitant des prières pour les défunts. Imaginez habiter sur l'un de ces itinéraires. Le grincement des roues sur les pavés, les chants graves dans la nuit, la certitude de ce que transportaient ces convois. Nuit après nuit, année après année. Six millions de Parisiens, un chargement à la fois."
    }}},
    { M: { text: { S:
      "C'est là que l'histoire prend son tournant le plus étrange. Au lieu d'entasser les restes dans une galerie, les ouvriers se sont mis à les disposer comme une œuvre d'art. Des fémurs empilés en murs impeccables — rangée après rangée, du sol au plafond. Des crânes placés à intervalles réguliers, dessinant des croix, des cœurs, des motifs géométriques. Les os sont devenus de l'architecture. Et au-dessus de l'entrée, quelqu'un a gravé la phrase qui a baptisé ce lieu : « Arrête ! C'est ici l'Empire de la Mort. »"
    }}},
    { M: { text: { S:
      "Ce qui marque vraiment, c'est que personne n'a trié les os. Le fémur d'un roi repose à côté de celui d'un mendiant. Le crâne d'une religieuse côtoie celui d'un brigand. Paris a traversé des révolutions, des épidémies, des siècles de guerre, et tous ces gens — les puissants comme les oubliés — ont fini dans le même mur, parfaitement anonymes. Six millions de vies, et pas un seul nom n'a survécu. La mort se fiche bien de votre CV."
    }}},
    { M: { text: { S:
      "Aujourd'hui, on peut parcourir environ un kilomètre et demi de ce palais souterrain — une fraction infime du réseau complet sous Paris. Les couloirs sont étroits, humides, tapissés du sol au plafond de restes de gens qui ont un jour foulé les mêmes rues que vous pour arriver ici. Ils étaient boulangers, soldats, mères, criminels, curés. Maintenant, ils partagent tous la même teinte blanche, disposés en motifs qui sont à la fois magnifiques et profondément dérangeants."
    }}},
    { M: { text: { S:
      "Les catacombes de Paris ne sont pas un cimetière. C'est un monument dédié à la seule chose que partagent tous les êtres humains ayant jamais existé. On peut bâtir un empire, écrire un chef-d'œuvre, passer sa vie entière à graver son nom dans l'Histoire — nos os finiront quand même dans un mur, à côté de ceux d'un inconnu. C'est la chose la plus terrifiante de Paris, ou la plus honnête."
    }}},
  ]},
};

// ═════════════════════════════════════════════════════════════════════════════
//  GERMAN
// ═════════════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang:        { S: "de" },
  langStoryId: { S: "de#empire-of-the-dead" },

  title:    { S: "Das Reich der Toten — Sechs Millionen Knochen wurden Kunst" },
  subtitle: { S: "Als Paris keinen Platz mehr für seine Toten hatte, baute es ihnen einen Palast unter der Erde" },
  excerpt:  { S: "Man sagt, irgendwann ist das Maß voll. Im Fall von Paris dauerte es tausend Jahre. Jahrhundertelang hatten die Pariser ihre Toten auf denselben Friedhöfen begraben, und der größte — der Cimetière des Saints-Innocents — lag mitten im Stadtzentrum." },

  moralOrLesson: { S: "Der Tod ist der große Gleichmacher — die Hierarchien, die wir zu Lebzeiten aufbauen, sind bedeutungslos, wenn alles auf Knochen reduziert wird." },

  characters: { L: [
    { S: "Stadtingenieure von Paris" },
    { S: "Nachtarbeiter" },
    { S: "Sechs Millionen anonyme Pariser" },
    { S: "Generalinspektor der Steinbrüche" },
  ]},

  paragraphs: { L: [
    { M: { text: { S:
      "Man sagt, irgendwann ist das Maß voll. Im Fall von Paris dauerte es tausend Jahre. Jahrhundertelang hatten die Pariser ihre Toten auf denselben Friedhöfen begraben, und der größte — der Cimetière des Saints-Innocents — lag mitten im Stadtzentrum. Gräber waren zehn Schichten tief gestapelt. 1780 brach die Kellerwand eines Nachbargebäudes ein, und eine Lawine verwesender Überreste ergoss sich in jemandes Keller. Die Stadt verrottete von innen heraus."
    }}},
    { M: { text: { S:
      "1786 trafen die Behörden eine drastische Entscheidung: Sämtliche großen Friedhöfe von Paris sollten geräumt und alle Knochen in den Untergrund verlegt werden. Unter der Stadt erstreckten sich über dreihundert Kilometer verlassener Stollen — ehemalige Kalksteinbrüche, seit dem Mittelalter ausgebeutet, um Paris zu erbauen. Notre-Dame, der Louvre, all diese prächtigen Steinbauten — alles aus dem Fels unter ihren Füßen. Jetzt sollten die leeren Tunnel sechs Millionen neue Bewohner aufnehmen."
    }}},
    { M: { text: { S:
      "Die Arbeit fand ausschließlich nachts statt. Die katholische Kirche bestand darauf — dies war heilige Arbeit. Jede Nacht rollten verhüllte Wagen voller Knochen im Fackelschein durch die Straßen, begleitet von Priestern, die Gebete für die Toten sprachen. Stell dir vor, du wohnst an einer dieser Routen. Das Knarren der Holzräder auf dem Kopfsteinpflaster, das dumpfe Murmeln der Gebete, das sichere Wissen, was diese Wagen geladen hatten. Nacht für Nacht, Jahr für Jahr. Sechs Millionen Menschen, eine Wagenladung nach der anderen."
    }}},
    { M: { text: { S:
      "Hier nimmt die Geschichte ihre seltsamste Wendung. Statt die Überreste einfach in einen Tunnel zu kippen, begannen die Arbeiter, sie kunstvoll anzuordnen. Oberschenkelknochen zu makellosen Wänden gestapelt — Reihe um Reihe, vom Boden bis zur Decke. Schädel in regelmäßigen Abständen platziert, die Kreuze, Herzen und geometrische Muster bildeten. Die Knochen wurden zu Architektur. Und über dem Eingang meißelte jemand die Worte, die diesem Ort seinen Namen gaben: «Halt. Dies ist das Reich der Toten.»"
    }}},
    { M: { text: { S:
      "Was einen wirklich nicht mehr loslässt: Niemand hat die Knochen sortiert. Der Oberschenkel eines Königs liegt neben dem eines Bettlers. Der Schädel einer Nonne ruht neben dem eines Verbrechers. Paris überlebte Revolutionen, Seuchen und Jahrhunderte voller Krieg, und all diese Menschen — Mächtige wie Vergessene — landeten in derselben Wand, vollkommen anonym. Sechs Millionen Leben, und kein einziger Name hat überdauert. Der Tod kümmert sich nicht um deinen Lebenslauf."
    }}},
    { M: { text: { S:
      "Heute kann man etwa anderthalb Kilometer dieses unterirdischen Knochenpalastes begehen — ein winziger Bruchteil des gesamten Tunnelnetzes unter Paris. Die Gänge sind eng, feucht und vom Boden bis zur Decke mit den Überresten von Menschen ausgekleidet, die einst dieselben Straßen entlangliefen, über die man selbst gerade hierhergekommen ist. Sie waren Bäcker, Soldaten, Mütter, Verbrecher, Priester. Jetzt teilen sie alle denselben weißen Farbton, angeordnet in Mustern, die zugleich schön und zutiefst verstörend sind."
    }}},
    { M: { text: { S:
      "Die Pariser Katakomben sind kein Friedhof. Sie sind ein Denkmal für das Einzige, was jeder Mensch, der je gelebt hat, mit allen anderen teilt. Du kannst ein Imperium errichten, ein Meisterwerk schreiben, dein ganzes Leben dafür kämpfen, dass die Welt deinen Namen behält — deine Knochen landen trotzdem in einer Wand neben denen eines Fremden. Das ist entweder das Erschreckendste an Paris oder das Ehrlichste."
    }}},
  ]},
};

// ═════════════════════════════════════════════════════════════════════════════
//  PUSH
// ═════════════════════════════════════════════════════════════════════════════
const stories = [
  { label: "SPANISH (es)", item: es },
  { label: "FRENCH  (fr)", item: fr },
  { label: "GERMAN  (de)", item: de },
];

for (const { label, item } of stories) {
  console.log(`\n─── Pushing ${label} ───`);
  try {
    const cmd = new PutItemCommand({ TableName: TABLE, Item: item });
    const res = await client.send(cmd);
    console.log(`✅  ${label} pushed successfully (HTTP ${res.$metadata.httpStatusCode})`);
  } catch (err) {
    console.error(`❌  ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log(`\n══════════════════════════════════════`);
console.log(`All 3 stories pushed. updatedAt = ${now}`);
console.log(`══════════════════════════════════════`);
