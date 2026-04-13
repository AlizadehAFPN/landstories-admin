/**
 * Push "Philibert Aspairt Lost" story — RECREATED in Spanish, French, German
 * to the Story DynamoDB table.
 *
 * Each version is a native retelling, NOT a translation.
 *
 * Proverbs used (subverted):
 *   ES: "Dios aprieta pero no ahoga" → Under Paris, the darkness doesn't squeeze — it swallows you
 *   FR: "L'homme propose, Dieu dispose" → Under the quarries, man proposes, and the stone disposes
 *   DE: "Aller guten Dinge sind drei" → Aspairt needed exactly three things: light, a path, and luck. He had none.
 */

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (from the English record) ────────────────────────────────
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

  title:    { S: "A veinte metros de la luz" },
  subtitle: { S: "Philibert Aspairt bajó a las canteras de París en 1793 — lo encontraron once años después, muerto a un suspiro de la salvación" },
  excerpt:  { S: "La noche del 3 de noviembre de 1793, un hombre bajó al subsuelo de París y no volvió a subir. Se llamaba Philibert Aspairt." },

  moralOrLesson: { S: "La dirección lo es todo y la distancia no vale nada — Aspairt murió a veinte metros de su propia puerta, prueba de que la salvación puede estar al alcance de la mano y ser invisible en la oscuridad." },

  characters: { L: [
    { S: "Philibert Aspairt" },
    { S: "Obreros de la Inspección General de Canteras (descubridores)" },
  ]},

  paragraphs: { L: [
    { M: { text: { S:
      "La noche del 3 de noviembre de 1793, un hombre bajó al subsuelo de París y no volvió a subir. Se llamaba Philibert Aspairt. Once años después encontraron su cuerpo, y lo que convierte esta historia en una pesadilla es un solo dato: murió a veinte metros de una salida. Estaba ahí. Casi en casa. Pero bajo tierra, «casi» es la palabra más cruel que existe."
    }}},
    { M: { text: { S:
      "Aspairt era el portero del hospital militar de Val-de-Grâce, en la orilla izquierda del Sena. El edificio se levantaba sobre antiguas canteras, y todo el mundo en el hospital sabía que desde el sótano se podía bajar a una red de galerías. ¿Por qué se metió? La teoría que más convence: iba buscando la bodega de un convento cercano. A los monjes los habían echado con la Revolución y, según se decía, dejaron botellas de licor escondidas. Alcohol gratis, a unos pocos túneles de distancia."
    }}},
    { M: { text: { S:
      "Bajó con una vela. Una sola. Las canteras bajo París se extienden más de trescientos kilómetros: un laberinto de callejones sin salida, galerías inundadas, techos hundidos y bifurcaciones que se multiplican hasta que no sabes ni de dónde vienes. En 1793, casi nada estaba mapeado. Una vela te daba dos, tres metros de luz. Después de eso, nada. Negrura total. Esa oscuridad en la que levantas la mano y no la ves."
    }}},
    { M: { text: { S:
      "La vela se apagó."
    }}},
    { M: { text: { S:
      "Una corriente de aire, la cera que se acabó, un tropezón. Da lo mismo. Lo que importa es lo que vino después: un hombre solo, de pie en la oscuridad más absoluta, perdido en algún punto de trescientos kilómetros de piedra, sin luz, sin mapa y sin la menor idea de qué camino lo sacaba de ahí y cuál lo hundía más."
    }}},
    { M: { text: { S:
      "Caminó. Tuvo que caminar durante horas, quizá días, con las manos pegadas a las paredes de roca, eligiendo al azar en cada cruce, gritando en túneles que se tragaban su voz sin escupir eco. Dicen que Dios aprieta pero no ahoga. Bajo París, la oscuridad no aprieta: te traga. No dejó ni una marca en las paredes, ni un rastro. La piedra se lo comió entero."
    }}},
    { M: { text: { S:
      "Su cuerpo apareció en 1804. Once años. Unos obreros que estaban levantando planos de las galerías lo reconocieron por las llaves del hospital que todavía llevaba en el bolsillo. Estaba tirado en un pasadizo que conectaba, por un solo corredor, con el mismísimo sótano donde trabajaba. La salida le quedaba a veinte metros. Un giro a la izquierda en vez de a la derecha y habría salido caminando. Pero a ciegas, sin forma de distinguir la vida de la muerte, giró a la derecha."
    }}},
    { M: { text: { S:
      "Lo enterraron donde cayó. Su lápida sigue ahí abajo, en los túneles, y es una de las pocas tumbas con nombre en todas las catacumbas de París. Hoy, los que se cuelan en las galerías prohibidas le dejan velas y monedas sobre la piedra. La historia de Aspairt sobrevive porque nos toca donde más duele: la idea de estar tan cerca de salvarte que casi podrías tocar la puerta con los dedos, y no saberlo. Bajo París, veinte metros son veinte kilómetros. A la oscuridad le da igual lo cerca que estés."
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

  title:    { S: "À vingt mètres de la lumière" },
  subtitle: { S: "Philibert Aspairt s'est enfoncé dans les carrières en 1793 — retrouvé onze ans après, mort à vingt mètres du jour" },
  excerpt:  { S: "Dans la nuit du 3 novembre 1793, un homme s'est enfoncé dans les carrières sous Paris. Il s'appelait Philibert Aspairt, et il n'est jamais remonté." },

  moralOrLesson: { S: "Dans le labyrinthe, la direction est tout et la distance ne compte pas — Aspairt est mort à vingt mètres de la sortie, preuve que le salut peut être à portée de main et rester invisible dans le noir." },

  characters: { L: [
    { S: "Philibert Aspairt" },
    { S: "Ouvriers de l'Inspection générale des carrières (découvreurs)" },
  ]},

  paragraphs: { L: [
    { M: { text: { S:
      "Dans la nuit du 3 novembre 1793, un homme s'est enfoncé dans les carrières sous Paris. Il s'appelait Philibert Aspairt, et il n'est jamais remonté. On a retrouvé son corps onze ans plus tard — et voilà le détail qui transforme cette histoire en cauchemar : il gisait à vingt mètres d'une sortie. Vingt mètres. Il y était presque. Mais sous terre, dans le noir absolu, « presque » ne sauve personne."
    }}},
    { M: { text: { S:
      "Aspairt était portier au Val-de-Grâce, l'hôpital militaire de la rive gauche. Le bâtiment reposait sur d'anciennes carrières, et tout le personnel savait qu'on pouvait descendre dans les galeries depuis les caves. Pourquoi y est-il allé ? L'hypothèse la plus solide : il cherchait la cave à vin d'un couvent voisin. Les moines avaient été chassés par la Révolution et auraient laissé des réserves de liqueur quelque part sous terre. De l'alcool oublié, à quelques galeries de là."
    }}},
    { M: { text: { S:
      "Il avait une bougie. Une seule. Les carrières sous Paris, c'est plus de trois cents kilomètres de galeries — un dédale de culs-de-sac, de salles noyées, de plafonds effondrés et d'embranchements qui se divisent encore et encore jusqu'à ce qu'on perde tout repère. En 1793, presque rien n'était cartographié. Une bougie éclairait deux, trois mètres autour de soi. Au-delà, le noir. Pas le noir d'une chambre — le noir d'une tombe, celui où l'on ne distingue plus sa propre main."
    }}},
    { M: { text: { S:
      "La bougie s'est éteinte."
    }}},
    { M: { text: { S:
      "Un courant d'air. La cire qui s'est consumée. Un faux pas. Peu importe. Ce qui compte, c'est ce qui a suivi : un homme debout dans l'obscurité totale, quelque part dans trois cents kilomètres de pierre, sans lumière, sans repère, sans aucun moyen de distinguer le chemin qui mène à l'air libre de celui qui l'enfonce un peu plus dans le labyrinthe."
    }}},
    { M: { text: { S:
      "Il a marché. Des heures, peut-être des jours, les mains plaquées contre la roche, un choix aveugle à chaque bifurcation, des cris dans des couloirs qui buvaient sa voix sans rendre le moindre écho. L'homme propose, dit-on, et Dieu dispose. Sous les carrières de Paris, l'homme propose, et la pierre dispose. Aspairt n'a laissé aucune trace, aucune marque sur les parois. Le noir l'a avalé."
    }}},
    { M: { text: { S:
      "On a retrouvé son corps en 1804. Onze ans plus tard. Des ouvriers qui cartographiaient les galeries l'ont reconnu aux clés de l'hôpital encore dans sa poche. Il était étendu dans un passage qui menait, par un seul corridor, aux caves mêmes du Val-de-Grâce — l'endroit où il travaillait. La sortie était à vingt mètres. À gauche au lieu d'à droite, et il remontait vivant. Mais dans le noir absolu, quand rien ne distingue le chemin de la vie de celui de la mort, il a pris à droite."
    }}},
    { M: { text: { S:
      "On l'a enterré là où il gisait. Sa tombe est toujours dans les carrières — l'une des seules sépultures marquées de toutes les catacombes de Paris. Aujourd'hui, les cataphiles qui se glissent dans les galeries interdites déposent des bougies et des pièces sur sa pierre. L'histoire d'Aspairt survit parce qu'elle touche un nerf à vif : l'idée d'être si près du salut qu'on pourrait presque le sentir, et de ne jamais le savoir. Sous Paris, vingt mètres valent vingt kilomètres. Le noir ne fait pas la différence."
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

  title:    { S: "Zwanzig Meter vor dem Licht" },
  subtitle: { S: "Philibert Aspairt verschwand 1793 in den Steinbrüchen unter Paris — elf Jahre später fand man ihn, tot, zwanzig Meter von der Rettung entfernt" },
  excerpt:  { S: "In der Nacht des 3. November 1793 stieg ein Mann in die Steinbrüche unter Paris hinab. Sein Name: Philibert Aspairt. Er kam nie wieder herauf." },

  moralOrLesson: { S: "Im Labyrinth zählt allein die Richtung, nicht die Entfernung — Aspairt starb zwanzig Meter vom Ausgang entfernt, ein Beweis dafür, dass die Rettung zum Greifen nah und zugleich unsichtbar im Dunkeln sein kann." },

  characters: { L: [
    { S: "Philibert Aspairt" },
    { S: "Steinbrucharbeiter der Inspection générale des carrières (Entdecker)" },
  ]},

  paragraphs: { L: [
    { M: { text: { S:
      "In der Nacht des 3. November 1793 stieg ein Mann in die Steinbrüche unter Paris hinab. Sein Name: Philibert Aspairt. Er kam nie wieder herauf. Elf Jahre später fand man seine Leiche — und jetzt kommt das Detail, das einem den Schlaf raubt: Er lag zwanzig Meter von einem Ausgang entfernt. Er war fast draußen. Aber unter der Erde, in absoluter Finsternis, rettet «fast» niemanden."
    }}},
    { M: { text: { S:
      "Aspairt war Pförtner am Val-de-Grâce, einem Militärkrankenhaus am linken Seineufer. Das Gebäude stand auf alten Steinbrüchen, und das Personal wusste, dass man vom Keller aus in ein Netz von Gängen gelangte. Warum stieg er hinab? Die naheliegendste Erklärung: Er war hinter dem Weinkeller eines benachbarten Klosters her. Die Mönche waren in der Revolution vertrieben worden und hatten angeblich Flaschen mit Likör zurückgelassen. Gratis Alkohol, nur ein paar Tunnel entfernt."
    }}},
    { M: { text: { S:
      "Er hatte eine Kerze dabei. Eine einzige. Das Steinbruchnetz unter Paris erstreckt sich über dreihundert Kilometer — ein Gewirr aus Sackgassen, überfluteten Gängen, eingestürzten Decken und Abzweigungen, die sich immer weiter verzweigen, bis man jeden Orientierungssinn verliert. 1793 war fast nichts davon kartiert. Eine Kerze erhellte zwei, vielleicht drei Meter. Danach: nichts. Totale Schwärze. Die Art von Dunkelheit, in der man die eigene Hand vor dem Gesicht nicht sieht."
    }}},
    { M: { text: { S:
      "Die Kerze erlosch."
    }}},
    { M: { text: { S:
      "Ein Luftzug vielleicht. Das Wachs, das aufgebraucht war. Ein Stolpern. Es spielt keine Rolle. Was zählt, ist das Danach: Ein Mann, allein in absoluter Finsternis, irgendwo in dreihundert Kilometern Stein, ohne Licht, ohne Karte und ohne die geringste Ahnung, welcher Gang nach oben führte und welcher ihn tiefer ins Labyrinth zog."
    }}},
    { M: { text: { S:
      "Er lief. Stunden müssen es gewesen sein, vielleicht Tage. Die Hände an den rauen Kalksteinwänden, an jeder Kreuzung eine Wette mit dem Zufall, Schreie in Gänge, die seine Stimme schluckten, ohne ein Echo zurückzugeben. Aller guten Dinge sind drei, sagt man. Aspairt brauchte genau drei: Licht, einen Weg und Glück. Er hatte keines davon. Er hinterließ keine Markierung, keine Spur. Die Dunkelheit hat ihn einfach genommen."
    }}},
    { M: { text: { S:
      "Seinen Körper fand man 1804. Elf Jahre später. Arbeiter, die die Gänge kartierten, erkannten ihn an den Krankenhausschlüsseln in seiner Tasche. Er lag in einem Gang, der über einen einzigen Korridor zurück in den Keller seines eigenen Krankenhauses führte. Der Ausgang war zwanzig Meter entfernt. Einmal links statt rechts, und er wäre lebend herausgekommen. Aber in pechschwarzer Finsternis, ohne zu wissen, welche Richtung ins Leben und welche in den Tod führte, bog er rechts ab."
    }}},
    { M: { text: { S:
      "Man begrub ihn dort, wo er lag. Sein Grabstein steht noch heute in den Tunneln — eines der wenigen Gräber mit Inschrift in den gesamten Katakomben von Paris. Heute schleichen sich Neugierige in die gesperrten Gänge und legen Kerzen und Münzen auf seinen Stein. Die Geschichte von Aspairt überlebt, weil sie etwas berührt, das in jedem von uns steckt: die Angst, der Rettung so nah zu sein, dass man sie fast greifen könnte — und es nie zu erfahren. Unter Paris sind zwanzig Meter so gut wie zwanzig Kilometer. Der Dunkelheit ist es egal, wie nah du bist."
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
    console.log(`  ${label} pushed successfully (HTTP ${res.$metadata.httpStatusCode})`);
  } catch (err) {
    console.error(`  ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log(`\n══════════════════════════════════════`);
console.log(`All 3 stories pushed. updatedAt = ${now}`);
console.log(`══════════════════════════════════════`);
