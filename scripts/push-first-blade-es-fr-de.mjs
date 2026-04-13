// Push "The First Blade" story in Spanish, French, and German
// Source: English record siteId=alamut-castle, langStoryId=en#murder-of-nizam-al-mulk

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───────────────────────
const shared = {
  siteId: "alamut-castle",
  storyId: "murder-of-nizam-al-mulk",
  icon: "\u{1F5E1}\uFE0F",
  storyCategory: "crowns_conquests",
  era: "October 14, 1092 CE (10 Ramadan 485 AH)",
  tier: "A",
  isFree: true,
  isFeatured: false,
  hasAudio: false,
  coordinates: { lat: 36.4447, lng: 50.5861 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 3,
  source:
    "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Nizam al-Mulk, Siyasatnama (Book of Government, c.1091); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Bernard Lewis, The Assassins: A Radical Sect in Islam (1967); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); World History Encyclopedia",
  disabled: false,
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
// SPANISH (es)
// ═══════════════════════════════════════════════════════════════════
const es = {
  ...shared,
  lang: "es",
  langStoryId: "es#murder-of-nizam-al-mulk",
  title: "La Primera Daga",
  subtitle:
    "El asesinato que destruyó el Imperio selyúcida y presentó a los Asesinos ante el mundo",
  excerpt:
    "En el camino de Isfahán a Bagdad, cerca de Nahavand, una figura con los harapos de un derviche se acercó a la comitiva del hombre más poderoso del Imperio selyúcida. No traía ninguna petición. Traía una daga.",
  moralOrLesson:
    "Una sola daga en la mano de un verdadero devoto puede lograr lo que un ejército de cien mil no alcanza — y los poderosos que se creen intocables aprenden, demasiado tarde, que ningún muro de soldados puede proteger a un hombre de una idea cuyo momento ha llegado.",
  characters: [
    "Hassan-i Sabbah (señor de Alamut que ordenó el asesinato)",
    "Nizam al-Mulk (Abu Ali al-Hasan ibn Ali al-Tusi, visir del Imperio selyúcida)",
    "Abu Tahir Arrani (el fidai que ejecutó el asesinato)",
    "Sultán Malik-Shah I (sultán selyúcida, murió 35 días después)",
    "Sultán Alp Arslan (padre de Malik-Shah, a quien Nizam también sirvió)",
  ],
  paragraphs: [
    {
      text: "En 1092, Nizam al-Mulk era el hombre más poderoso del mundo islámico. Llevaba treinta años como gran visir —ministro principal— del Imperio selyúcida, primero bajo el sultán Alp Arslan y después bajo su hijo Malik-Shah I. Su dominio se extendía desde las fronteras de China hasta el Mediterráneo. Fundó escuelas por todo el territorio para frenar lo que veía como una amenaza mortal: los musulmanes ismailíes. Y un solo hombre, desde una fortaleza en las montañas llamada Alamut, decidió que tenía que morir.",
    },
    {
      text: "Ese hombre era Hassan-i Sabbah, líder de los ismailíes nizaríes y señor de Alamut. Hassan tenía una filosofía brutal: mejor matar a un tirano que oprime a millones que enviar miles de soldados a morir en guerra abierta. Sus armas eran los fidai —«los devotos»—, operativos entrenados durante años en combate, disfraz y protocolo cortesano. Siempre usaban daga. Siempre atacaban en público. Y nunca intentaban huir. La misión era un viaje sin retorno, asumido como sacrificio.",
    },
    {
      text: "14 de octubre de 1092, mes sagrado de Ramadán. La caravana del visir viajaba de Isfahán a Bagdad, cerca de Nahavand. Nizam al-Mulk, ya pasados los setenta, acababa de romper el ayuno con la cena. Una figura envuelta en harapos se acercó arrastrando los pies, pidiendo audiencia. El visir era conocido por recibir a cualquiera. Se inclinó hacia delante. El hombre se llamaba Abu Tahir Arrani. No traía ninguna petición. Traía una daga.",
    },
    {
      text: "Un solo golpe, y el hombre más poderoso del imperio cayó. Abu Tahir intentó correr pero tropezó con la cuerda de una tienda. Los guardias lo mataron en el acto —segundos después de que cayera su objetivo. Murió como todo fidai esperaba morir. Menos de un minuto. Pero lo que vino después cambiaría Oriente Medio durante más de un siglo.",
    },
    {
      text: "Treinta y cinco días después, el sultán Malik-Shah I también estaba muerto —en circunstancias tan sospechosas que muchos historiadores creen que fue otro asesinato. Sin visir ni sultán, el imperio se hundió en guerra civil entre los hijos de Malik-Shah. Ninguno podía permitirse enviar ejércitos contra las fortalezas ismailíes en las montañas. Fue exactamente el cálculo de Hassan: eliminar a uno o dos hombres neutralizó la mayor amenaza militar contra su pueblo y les compró décadas de respiro.",
    },
    {
      text: "Tras la muerte del visir, el terror se apoderó de cada corte de la región. El sultán Sanjar —uno de los hijos de Malik-Shah— lo aprendió en carne propia. Una mañana despertó con una daga clavada en el suelo junto a su cama y una nota de Hassan: «Si esta hoja hubiera estado en tu pecho en vez de en la tierra, nada te habría salvado». El guerrero más temido de los selyúcidas no volvió a molestar a los ismailíes.",
    },
    {
      text: "A la tercera va la vencida, dice el refrán. El visir, el sultán, la daga junto a su cama: tres golpes bastaron para doblegar al imperio más poderoso de su tiempo. La hoja que mató a Nizam al-Mulk en el camino a Bagdad no acabó solo con una vida. Demostró algo que todavía resuena: quien está dispuesto a darlo todo —comodidad, seguridad, la vida misma— puede hacer temblar al más poderoso.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// FRENCH (fr)
// ═══════════════════════════════════════════════════════════════════
const fr = {
  ...shared,
  lang: "fr",
  langStoryId: "fr#murder-of-nizam-al-mulk",
  title: "La Première Lame",
  subtitle:
    "L'assassinat qui brisa l'Empire seldjoukide et révéla les Assassins au monde",
  excerpt:
    "Sur la route d'Ispahan à Bagdad, près de Nahavand, une silhouette en haillons de derviche s'approcha du convoi de l'homme le plus puissant de l'Empire seldjoukide. Il ne portait aucune requête. Il portait un poignard.",
  moralOrLesson:
    "Une seule lame dans la main d'un véritable croyant peut accomplir ce qu'une armée de cent mille ne saurait — et les puissants qui se croient intouchables apprennent, trop tard, qu'aucun mur de soldats ne protège un homme d'une idée dont l'heure est venue.",
  characters: [
    "Hassan-i Sabbah (maître d'Alamut qui ordonna l'assassinat)",
    "Nizam al-Mulk (Abu Ali al-Hasan ibn Ali al-Tusi, vizir seldjoukide)",
    "Abu Tahir Arrani (le fidaï qui exécuta l'assassinat)",
    "Sultan Malik-Shah Ier (sultan seldjoukide, mort 35 jours plus tard)",
    "Sultan Alp Arslan (père de Malik-Shah, que Nizam servit également)",
  ],
  paragraphs: [
    {
      text: "En 1092, Nizam al-Mulk était l'homme le plus puissant du monde islamique. Pendant trente ans, il avait servi comme grand vizir — premier ministre — de l'Empire seldjoukide, d'abord sous le sultan Alp Arslan, puis sous son fils Malik-Shah Ier. Son autorité s'étendait des frontières de la Chine jusqu'à la Méditerranée. Il avait fondé des écoles à travers l'empire pour combattre ce qu'il voyait comme une menace mortelle : les musulmans ismaéliens. Et un seul homme, depuis une forteresse perchée dans les montagnes appelée Alamut, avait décidé qu'il devait mourir.",
    },
    {
      text: "Cet homme, c'était Hassan-i Sabbah, chef des Ismaéliens nizârites et maître d'Alamut. Sa philosophie était redoutable : mieux vaut éliminer un seul tyran qui opprime des millions que d'envoyer des milliers de soldats mourir en bataille. Ses armes, c'étaient les fidaï — « les dévoués » — des agents formés des années durant au combat, au déguisement et au protocole de cour. Toujours un poignard. Toujours en public. Et jamais de tentative de fuite. La mission était un aller simple, assumé comme un sacrifice.",
    },
    {
      text: "14 octobre 1092, mois sacré du Ramadan. Le convoi du vizir faisait route d'Ispahan vers Bagdad, non loin de la ville de Nahavand. Nizam al-Mulk, qui avait passé les soixante-dix ans, venait de rompre le jeûne avec le repas du soir. Une silhouette en haillons — un derviche errant — s'approcha en traînant les pieds, réclamant une audience. Le vizir était connu pour accueillir ce genre de visiteurs. Il se pencha en avant. L'homme s'appelait Abu Tahir Arrani. Il ne portait aucune requête. Il portait un poignard.",
    },
    {
      text: "Un seul coup, et l'homme le plus puissant de l'empire s'effondra. Abu Tahir tenta de fuir mais trébucha sur une corde de tente. Les gardes l'abattirent sur place — quelques secondes après la chute de sa cible. Il mourut exactement comme chaque fidaï s'attendait à mourir. L'affaire dura moins d'une minute. Mais ce qui suivit allait redessiner le Moyen-Orient pendant plus d'un siècle.",
    },
    {
      text: "Trente-cinq jours plus tard, le sultan Malik-Shah Ier était mort lui aussi — dans des circonstances si troubles que de nombreux historiens y voient un second assassinat. Sans vizir ni sultan, l'empire sombra dans la guerre civile. Les fils de Malik-Shah se déchirèrent pour le trône. Aucun ne pouvait se permettre de lancer des armées contre les forteresses ismaéliennes dans les montagnes. Le calcul de Hassan avait fonctionné : éliminer un homme — peut-être deux — neutralisa la plus grande menace militaire contre son peuple et lui offrit des décennies de répit.",
    },
    {
      text: "Après le meurtre du vizir, la terreur s'installa dans chaque cour de la région. Le sultan Sanjar — l'un des fils de Malik-Shah — l'apprit à ses dépens. Un matin, il se réveilla pour découvrir un poignard planté dans le sol au pied de son lit, accompagné d'un message de Hassan : « Si cette lame s'était trouvée dans ta poitrine plutôt que dans la terre, rien ne t'aurait sauvé. » Sanjar, le plus redoutable guerrier de la dynastie seldjoukide, ne s'en prit plus jamais aux Ismaéliens.",
    },
    {
      text: "Jamais deux sans trois, dit le proverbe. Le vizir d'abord, le sultan ensuite, puis une lame plantée au pied du lit le plus gardé de l'empire. La lame qui tua Nizam al-Mulk sur la route de Bagdad n'a pas seulement mis fin à une vie. Elle a prouvé un principe qui résonne encore : celui qui est prêt à tout donner — confort, sécurité, sa vie même — peut faire plier le plus puissant empire du monde.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// GERMAN (de)
// ═══════════════════════════════════════════════════════════════════
const de = {
  ...shared,
  lang: "de",
  langStoryId: "de#murder-of-nizam-al-mulk",
  title: "Die Erste Klinge",
  subtitle:
    "Das Attentat, das das Seldschukenreich zerbrach und die Assassinen der Welt bekannt machte",
  excerpt:
    "Auf dem Weg von Isfahan nach Bagdad, nahe der Stadt Nahavand, näherte sich eine Gestalt in den Lumpen eines Derwischs dem Konvoi des mächtigsten Mannes im Seldschukenreich. Er trug keine Bittschrift. Er trug einen Dolch.",
  moralOrLesson:
    "Eine einzige Klinge in der Hand eines wahren Gläubigen kann vollbringen, was ein Heer von hunderttausend nicht vermag — und die Mächtigen, die sich für unantastbar halten, lernen zu spät, dass keine Mauer aus Soldaten einen Menschen vor einer Idee schützen kann, deren Zeit gekommen ist.",
  characters: [
    "Hassan-i Sabbah (Herr von Alamut, der das Attentat in Auftrag gab)",
    "Nizam al-Mulk (Abu Ali al-Hasan ibn Ali al-Tusi, Großwesir der Seldschuken)",
    "Abu Tahir Arrani (der Fidai, der das Attentat ausführte)",
    "Sultan Malik-Shah I. (Seldschuken-Sultan, starb 35 Tage später)",
    "Sultan Alp Arslan (Malik-Shahs Vater, dem Nizam ebenfalls diente)",
  ],
  paragraphs: [
    {
      text: "Im Jahr 1092 war Nizam al-Mulk der mächtigste Mann der islamischen Welt. Dreißig Jahre lang hatte er als Großwesir — oberster Minister — des Seldschukenreichs gedient, erst unter Sultan Alp Arslan, dann unter dessen Sohn Malik-Shah I. Sein Einfluss reichte von den Grenzen Chinas bis ans Mittelmeer. Er gründete Schulen im ganzen Reich, um zu bekämpfen, was er als tödliche Gefahr sah: die ismailitischen Muslime. Und ein einziger Mann, in einer Bergfestung namens Alamut, beschloss, dass er sterben musste.",
    },
    {
      text: "Dieser Mann war Hassan-i Sabbah, Anführer der nizaritischen Ismailiten und Herr von Alamut. Seine Philosophie war brutal einfach: Besser einen Tyrannen töten, der Millionen unterdrückt, als tausende Soldaten in offener Schlacht sterben lassen. Seine Waffen waren die Fidai — »die Hingebungsvollen« — Agenten, jahrelang trainiert in Kampf, Tarnung und höfischem Auftreten. Immer ein Dolch. Immer öffentlich. Und niemals der Versuch zu fliehen. Der Auftrag war ein Weg ohne Rückkehr, angenommen als Opfer.",
    },
    {
      text: "14. Oktober 1092, heiliger Monat Ramadan. Der Konvoi des Wesirs war auf dem Weg von Isfahan nach Bagdad, in der Nähe der Stadt Nahavand. Nizam al-Mulk, inzwischen über siebzig, hatte gerade das abendliche Fastenbrechen hinter sich. Eine Gestalt in zerlumpten Gewändern — ein wandernder Derwisch — schlurfte auf ihn zu und rief, er habe eine Bittschrift. Der Wesir war dafür bekannt, solche Besucher zu empfangen. Er beugte sich vor. Der Mann hieß Abu Tahir Arrani. Er trug keine Bittschrift. Er trug einen Dolch.",
    },
    {
      text: "Ein einziger Stoß, und der mächtigste Mann des Reiches brach zusammen. Abu Tahir versuchte zu fliehen, stolperte aber über ein Zeltseil. Die Leibwache erschlug ihn auf der Stelle — Sekunden nachdem sein Ziel gefallen war. Er starb genau so, wie jeder Fidai erwartete zu sterben. Das Ganze dauerte weniger als eine Minute. Aber was danach kam, sollte den Nahen Osten für über ein Jahrhundert prägen.",
    },
    {
      text: "Fünfunddreißig Tage später war auch Sultan Malik-Shah I. tot — unter so verdächtigen Umständen, dass viele Historiker ein weiteres Attentat vermuten. Ohne Wesir und Sultan versank das Reich im Bürgerkrieg. Malik-Shahs Söhne kämpften um den Thron. Keiner konnte es sich leisten, Armeen gegen die ismailitischen Bergfestungen zu schicken. Genau darauf hatte Hassan gesetzt: Einen oder zwei Männer zu beseitigen neutralisierte die größte militärische Bedrohung seines Volkes und verschaffte ihm Jahrzehnte Luft.",
    },
    {
      text: "Nach dem Mord am Wesir legte sich der Schrecken über jeden Herrscherhof der Region. Sultan Sanjar — einer von Malik-Shahs Söhnen — erfuhr es am eigenen Leib. Eines Morgens erwachte er und fand einen Dolch neben seinem Bett in den Boden gerammt, daneben eine Nachricht von Hassan: »Hätte diese Klinge in deiner Brust gesteckt statt in der Erde, nichts hätte dich retten können.« Sanjar, der gefürchtetste Krieger der Seldschuken-Dynastie, ließ die Ismailiten von da an in Ruhe.",
    },
    {
      text: "Aller guten Dinge sind drei, sagt man. Der Wesir, der Sultan, der Dolch am Bett: Drei Schläge genügten, um das mächtigste Reich seiner Zeit in die Knie zu zwingen. Die Klinge, die Nizam al-Mulk auf dem Weg nach Bagdad das Leben nahm, beendete nicht nur eine Existenz. Sie bewies etwas, das bis heute nachwirkt: Wer bereit ist, alles zu geben — Bequemlichkeit, Sicherheit, das eigene Leben —, kann die größte Macht der Welt ins Wanken bringen.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════
const stories = [
  { label: "Spanish (es)", data: es },
  { label: "French (fr)", data: fr },
  { label: "German (de)", data: de },
];

for (const { label, data } of stories) {
  // Validate JSON structure before push
  const requiredFields = [
    "siteId", "langStoryId", "storyId", "lang", "title", "subtitle",
    "excerpt", "icon", "storyCategory", "era", "tier", "isFree",
    "hasAudio", "characters", "moralOrLesson", "paragraphs", "source",
    "updatedAt",
  ];
  const missing = requiredFields.filter((f) => data[f] === undefined);
  if (missing.length > 0) {
    console.error(`✗ ${label}: Missing fields: ${missing.join(", ")}`);
    process.exit(1);
  }

  // Validate paragraphs
  for (let i = 0; i < data.paragraphs.length; i++) {
    const p = data.paragraphs[i];
    if (!p.text || typeof p.text !== "string") {
      console.error(`✗ ${label}: Paragraph ${i} has invalid text`);
      process.exit(1);
    }
    if (p.text.length > 600) {
      console.warn(`⚠ ${label}: Paragraph ${i} is ${p.text.length} chars (target ≤500)`);
    }
  }

  console.log(`\n⟶ Pushing ${label}...`);
  console.log(`  siteId:      ${data.siteId}`);
  console.log(`  langStoryId: ${data.langStoryId}`);
  console.log(`  title:       ${data.title}`);
  console.log(`  paragraphs:  ${data.paragraphs.length}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: data,
        ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✓ ${label} pushed successfully`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ⚠ ${label} already exists — overwriting...`);
      await docClient.send(new PutCommand({ TableName: TABLE, Item: data }));
      console.log(`  ✓ ${label} overwritten successfully`);
    } else {
      console.error(`  ✗ ${label} FAILED:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\n═══════════════════════════════════════");
console.log("All 3 language versions pushed successfully.");
console.log(`Timestamp: ${now} (${new Date(now * 1000).toISOString()})`);
console.log("═══════════════════════════════════════\n");
