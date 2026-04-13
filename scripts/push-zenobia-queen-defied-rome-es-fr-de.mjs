// Push Spanish, French, and German recreations of "The Queen Who Defied Rome"
// to the Story DynamoDB table.
//
// Cultural proverbs used:
//   es → "A la tercera va la vencida" (third time's the charm)
//   fr → "Jamais deux sans trois" (never two without three)
//   de → "Aller guten Dinge sind drei" (all good things come in threes)

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across all languages) ──────────────────────────
const shared = {
  siteId: "palmyra",
  storyId: "zenobia-queen-who-defied-rome",
  icon: "👑",
  storyCategory: "crowns_conquests",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.5505, lng: 38.2684 },
  source:
    "Historia Augusta, 'The Thirty Pretenders' (Trebellius Pollio); Zosimus, New History; al-Tabari, History of the Prophets and Kings; Edward Gibbon, The Decline and Fall of the Roman Empire; Pat Southern, Empress Zenobia: Palmyra's Rebel Queen; Alaric Watson, Aurelian and the Third Century",
  characters: [
    "Queen Zenobia (Septimia Zenobia / Bat-Zabbai / az-Zabba')",
    "Emperor Aurelian (Lucius Domitius Aurelianus)",
    "Cassius Longinus (philosopher and advisor)",
    "General Zabdas",
    "Vaballathus (Zenobia's son)",
    "Odaenathus (Zenobia's husband)",
  ],
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPANISH (es)
// Proverb: "A la tercera va la vencida"
// ═══════════════════════════════════════════════════════════════════════════════

const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#zenobia-queen-who-defied-rome",

  title: "La reina contra Roma",

  subtitle:
    "Cómo una reina del desierto conquistó un tercio del imperio, cabalgó a la guerra y obligó hasta a su vencedor a hablar de ella con respeto",

  excerpt:
    "En el año 267, en un banquete en la ciudad siria de Emesa, asesinaron al hombre más poderoso de Oriente. De aquella sangre emergió una mujer que levantaría un imperio desde el Nilo hasta Ankara.",

  moralOrLesson:
    "Los imperios no los levantan solo quienes nacen entre púrpuras. A veces el trono más peligroso es el que toma una mujer a la que el mundo entero subestimó — y la verdadera medida de la rebeldía no es si ganas o pierdes, sino si tu enemigo se ve obligado a admitir que estuviste a su altura.",

  era: "267–274 d. C. (regencia de Zenobia, sus conquistas y su derrota a manos de Aureliano)",

  paragraphs: [
    {
      text: "En el año 267, en un banquete en la ciudad siria de Emesa, mataron al hombre más poderoso del Oriente romano. Septimio Odenato — rey guerrero, el puño de Roma en el desierto — cayó junto a su hijo mayor, asesinado por su propio sobrino por lo que las crónicas llaman una venganza mezquina. Pero la verdadera protagonista de esta historia salió viva de aquella masacre. Su segunda esposa. Se llamaba Zenobia. Y estaba a punto de poner al mundo entero patas arriba.",
    },
    {
      text: "Todas las fuentes antiguas la describen como alguien que no debería haber existido. Hablaba cuatro idiomas. Estudió filosofía con uno de los grandes pensadores de su época. Montaba a caballo al frente de sus ejércitos, marchaba kilómetros a pie con sus soldados y era capaz de beber más que los reyes persas en la mesa. Decía ser descendiente de Cleopatra. Con su marido muerto y su hijo pequeño como rey de nombre, Zenobia no gobernaba en nombre de nadie. Gobernaba y punto.",
    },
    {
      text: "Y entonces hizo lo que nadie esperaba. En el 270, Zenobia lanzó setenta mil soldados contra Egipto — la provincia cuyo grano alimentaba a Roma. Aplastó a las legiones y se apoderó de la tierra más rica del mundo antiguo. Al mismo tiempo, sus tropas barrieron Siria y llegaron hasta la actual Turquía. En su momento cumbre, su imperio cubría un tercio del territorio romano. Puso su cara en las monedas y borró la del emperador. Eso no era ambición. Era una declaración de guerra.",
    },
    {
      text: "Roma mandó a su mejor hombre. Aureliano — soldado brutal y brillante que ya había recosido la mitad occidental del imperio — marchó al este en el 272. Zenobia le mandó una de las cartas más soberbias de la historia: «Exiges mi rendición como si no supieras que Cleopatra prefirió morir reina a vivir sometida.» Aureliano no se inmutó. Atrajo a su caballería pesada al sol de Siria hasta que el calor hizo lo que las espadas no pudieron. Su ejército se derrumbó. Zenobia huyó hacia Palmira.",
    },
    {
      text: "Aureliano rodeó Palmira y esperó. Dentro de las murallas se acabó la comida. Los refuerzos persas que Zenobia había prometido nunca llegaron. Cuando supo que todo había terminado, escapó de noche en un camello de carreras — el animal más rápido del desierto — rumbo al Éufrates y a la seguridad de Persia. La caballería romana la alcanzó en la orilla, subiendo a un barco, con la libertad a la vista. La capturaron con un pie en el agua y el otro en la historia.",
    },
    {
      text: "Lo que pasó después depende de a quién le creas. Una fuente romana dice que desfiló por Roma cargada de cadenas de oro tan pesadas de joyas que necesitaba sirvientes para sostenerlas — y que luego le dieron una villa donde vivió tranquila como esposa de senador. Otra dice que se dejó morir de hambre en el camino, eligiendo irse como la Cleopatra que siempre dijo ser. La tradición árabe le da la mejor salida: mordió un veneno escondido en un anillo y dijo: «Por mi propia mano, no por la de mi enemigo.»",
    },
    {
      text: "Cuando los senadores se burlaron de Aureliano por gastar legiones contra una mujer, respondió: «Los que me critican me aplaudirían si supieran qué clase de mujer es.» Dicen que a la tercera va la vencida, pero Roma tuvo que vaciarse entera para vencerla, y ni así pudo borrarla. Hoy su estatua se alza en Damasco. Su cara aparece en los billetes sirios. Y las ruinas de Palmira — su capital del desierto, golpeada por siglos y guerras — siguen en pie como los restos de algo que se negó a arrodillarse.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// FRENCH (fr)
// Proverb: "Jamais deux sans trois"
// ═══════════════════════════════════════════════════════════════════════════════

const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#zenobia-queen-who-defied-rome",

  title: "La reine qui fit trembler Rome",

  subtitle:
    "Comment une reine du désert conquit un tiers de l'Empire romain, mena ses armées au combat et força son propre vainqueur à parler d'elle avec admiration",

  excerpt:
    "En l'an 267, lors d'un banquet dans la ville syrienne d'Émèse, un roi et son fils aîné furent assassinés. De l'ombre de ce sang émergea une femme qui allait bâtir un empire du Nil jusqu'en Anatolie.",

  moralOrLesson:
    "On ne bâtit pas un empire qu'en naissant dans la pourpre. Parfois, le trône le plus redoutable est celui que saisit une femme que le monde entier a sous-estimée — et la vraie mesure de la rébellion n'est pas de vaincre, mais de forcer son ennemi à reconnaître qu'on méritait le combat.",

  era: "267–274 apr. J.-C. (régence de Zénobie, ses conquêtes et sa défaite face à Aurélien)",

  paragraphs: [
    {
      text: "En 267 après J.-C., lors d'un banquet dans la ville syrienne d'Émèse, l'homme le plus puissant de l'Orient romain fut assassiné. Septimius Odænat — roi guerrier, bras armé de Rome dans le désert — tomba avec son fils aîné, poignardé par son propre neveu pour une querelle que les chroniqueurs qualifient de mesquine. Mais la vraie histoire sortit vivante du massacre. Sa seconde épouse. Elle s'appelait Zénobie, et elle était sur le point de devenir la femme la plus dangereuse du monde antique.",
    },
    {
      text: "Chaque source antique la décrit comme quelqu'un qui n'aurait pas dû exister. Elle parlait quatre langues. Elle étudiait la philosophie avec l'un des grands penseurs de son époque. Elle chevauchait en tête de ses troupes, marchait à pied avec ses soldats, et tenait tête aux rois perses verre après verre. Elle se disait descendante de Cléopâtre. Son mari mort et son fils en bas âge sur le trône, Zénobie ne gouvernait pour personne d'autre. Elle régnait, point final.",
    },
    {
      text: "Puis elle fit ce que personne n'avait vu venir. En 270, elle lança soixante-dix mille soldats sur l'Égypte — la province dont le blé nourrissait Rome. Elle écrasa les légions et s'empara de la terre la plus riche du monde antique. Ses armées remontèrent la Syrie et pénétrèrent jusqu'en Turquie actuelle. À son apogée, son empire couvrait un tiers du territoire romain. Elle fit graver son visage sur les pièces et effaça celui de l'empereur. Ce n'était pas de l'ambition. C'était une déclaration de guerre.",
    },
    {
      text: "Rome envoya son meilleur. Aurélien — soldat brutal et brillant qui avait déjà recousu l'Occident — marcha vers l'est en 272. Zénobie lui envoya l'une des plus belles lettres de refus de l'histoire : « Tu exiges ma reddition comme si tu ignorais que Cléopâtre a préféré mourir reine plutôt que vivre soumise. » Aurélien ne broncha pas. Il attira sa cavalerie lourde sous le soleil syrien jusqu'à ce que la chaleur fasse le travail des épées. Son armée s'effondra. Zénobie fuit vers Palmyre.",
    },
    {
      text: "Aurélien encercla Palmyre et attendit. Derrière les murs, la nourriture manqua. Les renforts perses promis par Zénobie ne vinrent jamais. Quand elle comprit que tout était perdu, elle s'échappa de nuit sur un chameau de course — l'animal le plus rapide du désert — cap sur l'Euphrate et la Perse au-delà. La cavalerie romaine la rattrapa sur la rive, au moment où elle montait dans une barque, la liberté en ligne de mire. On la captura un pied dans l'eau, l'autre dans l'histoire.",
    },
    {
      text: "Ce qui suivit dépend de qui on écoute. Une source romaine dit qu'elle défila dans Rome sous des chaînes d'or si lourdes de joyaux que des serviteurs devaient les soutenir — puis qu'on lui donna une villa où elle vieillit en épouse de sénateur. Une autre raconte qu'elle se laissa mourir de faim, partant comme la Cléopâtre qu'elle revendiquait. La tradition arabe lui donne la plus belle sortie : elle mordit un poison caché dans une bague et dit : « De ma main — pas de celle de mon ennemi. »",
    },
    {
      text: "Quand des sénateurs raillèrent Aurélien pour avoir mobilisé ses légions contre une femme, il répondit : « Ceux qui me blâment me loueraient s'ils savaient quel genre de femme elle est. » On dit jamais deux sans trois — l'histoire lui a offert trois fins, parce qu'une seule aurait été indigne d'elle. Sa statue se dresse à Damas. Son visage est sur la monnaie syrienne. Et les ruines de Palmyre — sa capitale du désert — se dressent encore dans le sable, comme les os de quelque chose qui a refusé de plier.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// GERMAN (de)
// Proverb: "Aller guten Dinge sind drei"
// ═══════════════════════════════════════════════════════════════════════════════

const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#zenobia-queen-who-defied-rome",

  title: "Die Königin, die Rom trotzte",

  subtitle:
    "Wie eine palmyrenische Königin ein Drittel des Römischen Reiches eroberte, in Rüstung in den Krieg ritt und selbst ihren Bezwinger zu Respekt zwang",

  excerpt:
    "Im Jahr 267, bei einem Bankett in der syrischen Stadt Emesa, wurden ein Kriegerkönig und sein ältester Sohn ermordet. Aus dem Blutbad trat eine Frau hervor, die ein Reich vom Nil bis Ankara errichten sollte.",

  moralOrLesson:
    "Imperien werden nicht nur von denen erbaut, die in den Purpur hineingeboren werden. Manchmal ist der gefährlichste Thron der, den eine Frau ergreift, die die Welt unterschätzt hat — und das wahre Maß der Auflehnung ist nicht, ob man siegt, sondern ob der Feind gezwungen wird zuzugeben, dass man den Kampf wert war.",

  era: "267–274 n. Chr. (Zenobias Regentschaft, ihre Eroberungen und ihre Niederlage gegen Aurelian)",

  paragraphs: [
    {
      text: "Im Jahr 267 wurde bei einem Bankett in der syrischen Stadt Emesa der mächtigste Mann des römischen Ostens ermordet. Septimius Odaenathus — Kriegerkönig, Roms starker Arm in der Wüste — fiel gemeinsam mit seinem ältesten Sohn, niedergestochen von seinem eigenen Neffen wegen einer Fehde, die die Quellen als kleinlich beschreiben. Aber die eigentliche Geschichte überlebte das Blutbad. Seine zweite Frau. Ihr Name war Zenobia. Und sie war dabei, die gefährlichste Frau der antiken Welt zu werden.",
    },
    {
      text: "Jede antike Quelle beschreibt sie, als hätte es sie nicht geben dürfen. Sie sprach vier Sprachen. Sie studierte Philosophie bei einem der größten Denker ihrer Zeit. Sie ritt an der Spitze ihrer Armeen, marschierte kilometerweit zu Fuß neben ihren Soldaten und konnte persische Könige unter den Tisch trinken. Sie behauptete, von Kleopatra abzustammen. Mit ihrem toten Mann und ihrem kleinen Sohn offiziell auf dem Thron regierte Zenobia nicht in dessen Namen. Sie regierte. Punkt.",
    },
    {
      text: "Dann tat sie, womit niemand gerechnet hatte. 270 schickte Zenobia siebzigtausend Soldaten gegen Ägypten — die Provinz, deren Getreide Rom ernährte. Sie zerschlug die Legionen und nahm sich das reichste Land der antiken Welt. Gleichzeitig fegten ihre Armeen durch Syrien bis in die heutige Türkei. Auf dem Höhepunkt umfasste ihr Reich ein Drittel des römischen Territoriums. Sie prägte Münzen mit ihrem Gesicht und strich das des Kaisers. Das war kein Ehrgeiz. Das war eine Kriegserklärung.",
    },
    {
      text: "Rom schickte seinen Besten. Aurelian — brutaler, brillanter Soldat, der den Westen bereits zusammengeflickt hatte — marschierte 272 nach Osten. Zenobia sandte ihm eine der größten Absagen der Geschichte: «Du forderst meine Kapitulation, als wüsstest du nicht, dass Kleopatra lieber als Königin starb, als unterwürfig weiterzuleben.» Aurelian lockte ihre Panzerreiterei in die syrische Sonne, bis die Hitze erledigte, was die Schwerter nicht schafften. Ihr Heer zerbrach. Zenobia floh nach Palmyra.",
    },
    {
      text: "Aurelian umzingelte Palmyra und wartete. Hinter den Mauern ging das Essen aus. Die persischen Verstärkungen, die Zenobia versprochen hatte, kamen nie. Als sie wusste, dass es vorbei war, ritt sie bei Nacht auf einem Rennkamel davon — dem schnellsten Tier der Wüste — Richtung Euphrat und die Sicherheit Persiens dahinter. Römische Reiter holten sie am Flussufer ein, als sie gerade ein Boot bestieg, die Freiheit in Sichtweite. Man ergriff sie mit einem Fuß im Wasser und dem anderen in der Geschichte.",
    },
    {
      text: "Was danach geschah, hängt davon ab, wem man glaubt. Eine römische Quelle sagt, sie wurde in goldenen Ketten durch Rom geführt — so schwer von Edelsteinen, dass Diener sie stützen mussten — dann bekam sie eine Villa, wo sie als Senatorengattin lebte. Eine andere: Sie hungerte sich auf dem Weg zu Tode und ging wie die Kleopatra, die sie immer für sich beansprucht hatte. Die arabische Überlieferung gibt ihr das beste Ende: Sie biss auf Gift in einem Ring und sagte: «Von meiner Hand — nicht von der meines Feindes.»",
    },
    {
      text: "Als Senatoren Aurelian verspotteten, Legionen gegen eine Frau verschwendet zu haben, antwortete er: «Wer mich tadelt, würde mich loben, wüsste er, was für eine Frau sie ist.» Aller guten Dinge sind drei — sie nahm drei Provinzen, die Geschichte gab ihr drei Enden, und fast zweitausend Jahre später weiß niemand, wer wirklich gewonnen hat. Ihre Statue steht in Damaskus. Ihr Gesicht ziert syrische Geldscheine. Und Palmyras Ruinen ragen aus dem Sand wie die Knochen von etwas, das sich weigerte zu knien.",
    },
  ],
};

// ─── Push ────────────────────────────────────────────────────────────────────

async function push(label, item) {
  console.log(`\n⏳ Pushing ${label}…`);
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`✅ ${label} pushed successfully (langStoryId: ${item.langStoryId})`);
  } catch (err) {
    console.error(`❌ ${label} FAILED:`, err);
    process.exit(1);
  }
}

await push("Spanish (es)", es);
await push("French (fr)", fr);
await push("German (de)", de);

console.log("\n🎉 All three languages pushed successfully.");
