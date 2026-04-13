/**
 * Push "Philibert Aspairt Lost" story in Spanish, French, and German
 * to the Story DynamoDB table.
 *
 * Each version is a native retelling — not a translation.
 *
 * Proverbs used (subverted):
 *   ES: "El que busca, encuentra" → He sought wine, found eternity
 *   FR: "La nuit, tous les chats sont gris" → Under Paris, the night never ends
 *   DE: "Der Krug geht so lange zum Brunnen, bis er bricht" → He went once into the depths
 */

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (copied from the English record) ─────────────────────────
const shared = {
  siteId:             { S: "catacombs-of-paris" },
  storyId:            { S: "philibert-aspairt-lost" },
  icon:               { S: "🕯️" },
  tier:               { S: "A" },
  source:             { S: `Inspection Générale des Carrières records; Héricart de Thury, "Description des Catacombes de Paris" (1815); cataphile oral tradition` },
  era:                { S: "November 3, 1793 (lost); 1804 (found)" },
  readingTimeMinutes: { N: "3" },
  image:              { S: "" },
  disabled:           { BOOL: false },
  thumbnail:          { S: "" },
  coordinates:        { M: { lng: { N: "2.34" }, lat: { N: "48.84" } } },
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
  langStoryId: { S: "es#philibert-aspairt-lost" },

  title:    { S: "El hombre que se perdió a veinte metros de la salida" },
  subtitle: { S: "Philibert Aspairt se adentró en los túneles bajo París en 1793 — lo encontraron once años después, muerto a un paso de la salvación" },
  excerpt:  { S: "La noche del 3 de noviembre de 1793, un hombre llamado Philibert Aspairt bajó a los túneles que se esconden bajo París. No volvió a salir." },

  moralOrLesson: { S: "En el laberinto, la dirección lo es todo y la distancia no significa nada — Aspairt murió a veinte metros de la salida, un recordatorio de que a veces la salvación está más cerca de lo que creemos, pero invisible en la oscuridad." },

  characters: { L: [
    { S: "Philibert Aspairt" },
    { S: "Obreros de la Inspección General de Canteras (descubridores)" },
  ]},

  paragraphs: { L: [
    { M: { text: { S:
      "La noche del 3 de noviembre de 1793, un hombre llamado Philibert Aspairt bajó a los túneles que se esconden bajo París. No volvió a salir. Once años después encontraron su cuerpo, y aquí viene el detalle que convierte esta historia en una pesadilla: murió a veinte metros de una salida. Estaba ahí mismo. Casi lo logra. Pero en la oscuridad total, «casi» no significa nada."
    }}},
    { M: { text: { S:
      "Aspairt era el portero del hospital militar de Val-de-Grâce, en la orilla izquierda del Sena. El edificio estaba construido justo encima de unas antiguas canteras, y todo el personal sabía que desde el sótano se podía acceder a una red de galerías subterráneas. ¿Por qué bajó? La teoría más aceptada: iba detrás del vino. Los monjes del convento vecino habían dejado una bodega oculta cuando los expulsaron durante la Revolución Francesa. Alcohol gratis, a unos cuantos túneles de distancia."
    }}},
    { M: { text: { S:
      "Llevaba una vela. Una sola. La red de canteras bajo París se extiende más de trescientos kilómetros: un laberinto de callejones sin salida, galerías inundadas, techos derrumbados y bifurcaciones que se multiplican hasta que pierdes todo sentido de la orientación. En 1793, casi nada estaba cartografiado. Una vela alumbraba dos o tres metros a tu alrededor. Más allá, negrura absoluta — esa oscuridad en la que no ves ni tu propia mano delante de la cara."
    }}},
    { M: { text: { S:
      "La vela de Aspairt se apagó."
    }}},
    { M: { text: { S:
      "Quizá fue una corriente de aire. Quizá se consumió hasta el final. Quizá tropezó. Da igual. Lo que importa es esto: un hombre estaba ahora de pie en la oscuridad total, en algún punto dentro de trescientos kilómetros de túneles, sin luz, sin mapa y sin forma de saber qué dirección llevaba a la superficie y cuál lo arrastraba más hondo en el laberinto."
    }}},
    { M: { text: { S:
      "Caminó. Tuvo que caminar horas, tal vez días, arrastrando las manos por las paredes de piedra caliza, adivinando en cada cruce, gritando en pasadizos que devoraban su voz sin devolver eco. No dejó marcas, ni rastro, nada. La oscuridad simplemente se lo llevó. Dicen que el que busca, encuentra. Aspairt buscó vino y encontró la eternidad."
    }}},
    { M: { text: { S:
      "Su cuerpo apareció en 1804 — once años después. Unos obreros que estaban cartografiando las canteras lo identificaron por las llaves del hospital que aún llevaba en el bolsillo. Estaba tumbado en un pasadizo que conectaba, a través de un solo corredor, directamente con el sótano del hospital donde trabajaba. La salida quedaba a veinte metros. Un giro a la izquierda en lugar de a la derecha, y habría salido con vida. Pero a ciegas, sin forma de distinguir el camino de la vida del camino de la muerte, giró a la derecha."
    }}},
    { M: { text: { S:
      "Lo enterraron justo donde cayó. Su lápida sigue ahí, en los túneles — una de las únicas tumbas marcadas en todas las catacumbas de París. Hoy, los que se cuelan en las galerías prohibidas dejan velas y monedas sobre su piedra. Su historia sobrevive porque toca algo que todos tememos: estar tan cerca de la salvación que casi podrías alargar la mano y tocarla, y no saberlo jamás. Bajo París, veinte metros pueden ser veinte kilómetros. A la oscuridad le da igual lo cerca que estés."
    }}},
  ]},
};

// ═════════════════════════════════════════════════════════════════════════════
//  FRENCH
// ═════════════════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang:        { S: "fr" },
  langStoryId: { S: "fr#philibert-aspairt-lost" },

  title:    { S: "L'homme perdu à vingt mètres de la sortie" },
  subtitle: { S: "Philibert Aspairt s'est enfoncé dans les carrières en 1793 — retrouvé onze ans plus tard, mort à un pas de la lumière" },
  excerpt:  { S: "Dans la nuit du 3 novembre 1793, un homme du nom de Philibert Aspairt est descendu dans les carrières sous Paris. Il n'est jamais remonté." },

  moralOrLesson: { S: "Dans le labyrinthe, la direction est tout et la distance ne compte pas — Aspairt est mort à vingt mètres de la sortie, rappel que parfois le salut est plus proche qu'on ne le croit, mais invisible dans le noir." },

  characters: { L: [
    { S: "Philibert Aspairt" },
    { S: "Ouvriers de l'Inspection générale des carrières (découvreurs)" },
  ]},

  paragraphs: { L: [
    { M: { text: { S:
      "Dans la nuit du 3 novembre 1793, un homme du nom de Philibert Aspairt est descendu dans les carrières sous Paris. Il n'est jamais remonté. Son corps a été retrouvé onze ans plus tard — et c'est le détail qui rend cette histoire inoubliable : il est mort à vingt mètres d'une sortie. Il y était presque. Mais dans le noir total, « presque » ne veut rien dire."
    }}},
    { M: { text: { S:
      "Aspairt était portier à l'hôpital militaire du Val-de-Grâce, rive gauche. Le bâtiment reposait sur d'anciennes carrières, et le personnel connaissait les passages qui menaient sous terre depuis les caves. Pourquoi est-il descendu ? L'hypothèse la plus probable : il cherchait la cave à vin d'un couvent voisin. Les moines avaient été chassés pendant la Révolution et auraient laissé derrière eux une réserve de liqueur. De l'alcool gratuit, à quelques galeries de là."
    }}},
    { M: { text: { S:
      "Il avait une bougie. Une seule. Le réseau de carrières sous Paris s'étend sur plus de trois cents kilomètres : un enchevêtrement de culs-de-sac, de galeries inondées, de plafonds effondrés et de bifurcations qui se multiplient jusqu'à ce que tout sens de l'orientation disparaisse. En 1793, presque rien n'était cartographié. Une bougie éclairait deux ou trois mètres autour de soi. Au-delà, le noir — ce noir absolu où l'on ne voit pas sa propre main devant son visage."
    }}},
    { M: { text: { S:
      "La bougie d'Aspairt s'est éteinte."
    }}},
    { M: { text: { S:
      "Un courant d'air, peut-être. La cire qui a fini par fondre. Un faux pas. Peu importe. Ce qui compte, c'est ceci : un homme se tenait debout dans l'obscurité totale, quelque part au milieu de trois cents kilomètres de galeries, sans lumière, sans carte, sans aucun moyen de savoir quel chemin menait à l'air libre et lequel l'enfonçait plus profond dans le labyrinthe."
    }}},
    { M: { text: { S:
      "Il a marché. Il a dû marcher des heures, peut-être des jours, traînant ses mains le long des parois de calcaire, devinant à chaque embranchement, criant dans des galeries qui avalaient sa voix sans renvoyer d'écho. On dit que la nuit, tous les chats sont gris. Sous Paris, la nuit ne finit jamais — et toutes les galeries se ressemblent. Il n'a laissé aucune marque, aucune trace. L'obscurité l'a simplement englouti."
    }}},
    { M: { text: { S:
      "On a retrouvé son corps en 1804 — onze ans plus tard. Des ouvriers qui cartographiaient les galeries l'ont identifié grâce aux clés de l'hôpital qu'il avait encore dans sa poche. Il gisait dans un passage qui rejoignait, par un seul corridor, les caves mêmes de l'hôpital où il travaillait. La sortie était à vingt mètres. Un virage à gauche au lieu d'un virage à droite, et il remontait vivant. Mais dans le noir absolu, sans rien pour distinguer le chemin de la vie de celui de la mort, il a tourné à droite."
    }}},
    { M: { text: { S:
      "On l'a enterré là où il est tombé. Sa tombe est toujours dans les carrières — l'une des seules sépultures marquées de toutes les catacombes. Aujourd'hui, les cataphiles qui s'aventurent dans les galeries interdites déposent des bougies et des pièces sur sa pierre. Son histoire survit parce qu'elle touche ce que nous redoutons tous : être si près du salut qu'on pourrait presque le toucher, et ne jamais le savoir. Sous Paris, vingt mètres valent vingt kilomètres. Le noir se fiche de savoir à quel point vous êtes près."
    }}},
  ]},
};

// ═════════════════════════════════════════════════════════════════════════════
//  GERMAN
// ═════════════════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang:        { S: "de" },
  langStoryId: { S: "de#philibert-aspairt-lost" },

  title:    { S: "Der Mann, der zwanzig Meter vor dem Ausgang starb" },
  subtitle: { S: "Philibert Aspairt verschwand 1793 in den Tunneln unter Paris — elf Jahre später fand man ihn, tot, fast am Ziel" },
  excerpt:  { S: "In der Nacht des 3. November 1793 stieg ein Mann namens Philibert Aspairt in die Tunnel unter Paris hinab. Er kam nie wieder herauf." },

  moralOrLesson: { S: "Im Labyrinth ist die Richtung alles und die Entfernung bedeutungslos — Aspairt starb zwanzig Meter vom Ausgang entfernt, eine Mahnung, dass Rettung manchmal näher ist, als wir ahnen, aber unsichtbar im Dunkeln." },

  characters: { L: [
    { S: "Philibert Aspairt" },
    { S: "Steinbrucharbeiter der Inspection générale des carrières (Entdecker)" },
  ]},

  paragraphs: { L: [
    { M: { text: { S:
      "In der Nacht des 3. November 1793 stieg ein Mann namens Philibert Aspairt in die Tunnel unter Paris hinab. Er kam nie wieder herauf. Elf Jahre später fand man seine Leiche — und hier kommt das Detail, das diese Geschichte unvergesslich macht: Er starb zwanzig Meter von einem Ausgang entfernt. Er war fast da. Aber in völliger Dunkelheit bedeutet «fast» gar nichts."
    }}},
    { M: { text: { S:
      "Aspairt war Pförtner am Militärkrankenhaus Val-de-Grâce, linkes Seineufer. Das Gebäude stand direkt über alten Steinbrüchen, und das Personal wusste, dass man vom Keller in ein Netz unterirdischer Gänge gelangte. Warum stieg er hinab? Die wahrscheinlichste Erklärung: Er suchte den Weinkeller eines nahegelegenen Klosters. Die Mönche waren während der Französischen Revolution vertrieben worden und hatten angeblich einen Vorrat an Likör zurückgelassen. Gratis Alkohol, ein paar Tunnel weiter."
    }}},
    { M: { text: { S:
      "Er hatte eine Kerze dabei. Eine einzige. Das Steinbruchnetz unter Paris erstreckt sich über dreihundert Kilometer — ein Gewirr aus Sackgassen, überfluteten Hallen, eingestürzten Decken und Abzweigungen, die sich immer weiter verzweigen, bis jeder Orientierungssinn verloren geht. 1793 war fast nichts davon kartiert. Eine Kerze beleuchtete zwei, vielleicht drei Meter um einen herum. Dahinter? Absolute, erdrückende Finsternis — die Art von Dunkelheit, in der man die eigene Hand nicht vor dem Gesicht sieht."
    }}},
    { M: { text: { S:
      "Aspairts Kerze erlosch."
    }}},
    { M: { text: { S:
      "Vielleicht blies ein Luftzug sie aus. Vielleicht brannte sie einfach herunter. Vielleicht stolperte er. Es spielt keine Rolle. Was zählt, ist dies: Ein Mann stand in völliger Dunkelheit, irgendwo in dreihundert Kilometern Tunnel, ohne Licht, ohne Karte und ohne jede Möglichkeit zu wissen, welcher Weg nach oben führte und welcher ihn tiefer ins Labyrinth zog."
    }}},
    { M: { text: { S:
      "Er lief. Er muss stundenlang gelaufen sein, vielleicht tagelang, die Hände an den rauen Kalksteinwänden entlang, an jeder Kreuzung ratend, schreiend in Gänge hinein, die seine Stimme schluckten, ohne ein Echo zurückzugeben. Man sagt, der Krug geht so lange zum Brunnen, bis er bricht. Aspairt ging ein einziges Mal in die Tiefe — und die Tiefe gab ihn nicht zurück. Er hinterließ keine Markierungen, keine Spur, nichts. Die Dunkelheit nahm ihn einfach."
    }}},
    { M: { text: { S:
      "Man fand seinen Körper 1804 — elf Jahre später. Steinbrucharbeiter, die die Gänge kartierten, erkannten ihn an den Krankenhausschlüsseln in seiner Tasche. Er lag in einem Gang, der über einen einzigen Korridor zurück in den Keller seines Krankenhauses führte. Der Ausgang war zwanzig Meter entfernt. Links statt rechts, und er wäre lebend herausgekommen. Aber im pechschwarzen Dunkel, ohne zu wissen, welcher Weg ins Leben und welcher in den Tod führte, bog er rechts ab."
    }}},
    { M: { text: { S:
      "Man begrub ihn dort, wo er lag. Sein Grabstein steht noch heute in den Tunneln — eines der wenigen markierten Gräber in den gesamten Katakomben. Heute schleichen sich Neugierige in die gesperrten Gänge und legen Kerzen und Münzen auf seinen Stein. Seine Geschichte überlebt, weil sie etwas berührt, das wir alle fürchten: der Rettung so nah zu sein, dass man sie fast greifen könnte — und es nie zu erfahren. Unter Paris sind zwanzig Meter so gut wie zwanzig Kilometer. Der Dunkelheit ist es egal, wie nah du bist."
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
