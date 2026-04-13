import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId:             { S: "valley-of-the-kings" },
  storyId:            { S: "tomb-robbers-trials" },
  icon:               { S: "📜" },
  tier:               { S: "A" },
  source:             { S: "Peet, T. Eric. The Great Tomb Robberies of the Twentieth Egyptian Dynasty. Oxford, 1930; Papyrus Abbott, British Museum" },
  era:                { S: "Late New Kingdom (c. 1110 BC)" },
  readingTimeMinutes: { N: "4" },
  image:              { S: "" },
  disabled:           { BOOL: false },
  thumbnail:          { S: "" },
  coordinates:        { M: { lng: { N: "32.6014" }, lat: { N: "25.7402" } } },
  hasAudio:           { BOOL: false },
  isFree:             { BOOL: true },
  storyCategory:      { S: "ghosts_curses" },
  updatedAt:          { N: String(NOW) },
};

// ═══════════════════════════════════════════════
//  SPANISH (es)
// ═══════════════════════════════════════════════

const esItem = {
  ...shared,
  lang:        { S: "es" },
  langStoryId: { S: "es#tomb-robbers-trials" },

  title:    { S: "El juicio de los profanadores" },
  subtitle: { S: "«Fuimos a saquear las tumbas, como siempre hacíamos»" },
  excerpt:  { S: "Egipto, hacia el 1110 antes de Cristo. El Valle de los Reyes lleva siglos acumulando oro bajo tierra: tumbas llenas de joyas y todo lo que un faraón pudiera necesitar en la eternidad. Pero el Egipto de Ramsés IX ya no es lo que era." },

  moralOrLesson: { S: "Ningún tesoro, por sagrado que sea, está a salvo de quien tiene el estómago vacío. Y la línea entre el que protege y el que roba siempre ha sido más fina de lo que nos gustaría creer." },

  characters: {
    L: [
      { S: "Amenpnufer (saqueador de tumbas)" },
      { S: "Paser (alcalde de la Tebas oriental)" },
      { S: "Pawera (alcalde de la Tebas occidental)" },
      { S: "Ramsés IX (faraón)" },
    ],
  },

  paragraphs: {
    L: [
      { M: { text: { S: "Egipto, hacia el 1110 antes de Cristo. El Valle de los Reyes lleva siglos acumulando oro bajo tierra: tumbas enteras llenas de joyas, amuletos y todo lo que un faraón pudiera necesitar en la eternidad. Pero el Egipto de Ramsés IX ya no es lo que era. Las cosechas se pierden, los obreros llevan meses sin ver un grano de cebada, y al otro lado del río, bajo la arena, duerme más oro del que verán en toda su vida. Solo hacía falta que alguien se atreviera." } } },
      { M: { text: { S: "Todo estalló por culpa de dos alcaldes que se odiaban a muerte. Paser, el alcalde de la Tebas de los vivos —la orilla este— acusó a Pawera, el encargado de la orilla oeste donde estaban las tumbas, de hacer la vista gorda con los saqueadores. O peor: de quedarse con su parte. No era un simple escándalo político. En el antiguo Egipto, la tumba de un faraón era sagrada en un sentido que hoy nos cuesta entender. Profanarla no era solo un robo: era un ataque contra el orden del universo." } } },
      { M: { text: { S: "El gobierno envió inspectores al Valle. Lo que encontraron fue demoledor. Tumba tras tumba, forzadas. Sarcófagos destrozados. Momias arrancadas de sus vendajes, despojadas de cada anillo, cada amuleto, cada lámina de oro. Tesoros pensados para la eternidad, vendidos en los mercados de Tebas. Cuanto más investigaban, peor: canteros, sacerdotes, guardias, funcionarios cuyo trabajo era proteger esas tumbas. Todos metidos hasta el cuello." } } },
      { M: { text: { S: "Los juicios que siguieron dejaron algunos de los documentos más brutales de la historia antigua. Algunos confesaron por voluntad propia. A otros les arrancaron la verdad a golpes —les machacaban las plantas de los pies con varas hasta que hablaban—. La confesión más famosa fue la de un cantero llamado Amenpnufer, que describió cómo entró en la tumba del faraón Sobekemsaf II con la calma de quien cuenta qué desayunó esta mañana." } } },
      { M: { text: { S: "Sus palabras, conservadas en papiro durante más de tres mil años: «Fuimos a saquear las tumbas, como siempre hacíamos. Encontramos al dios en el fondo de su cámara funeraria. Recogimos el oro de la momia junto con sus amuletos y joyas. Prendimos fuego a sus ataúdes.» Como siempre hacíamos. Como si fuera un día más en la oficina. El botín se repartió en ocho partes iguales. Aquello no era un acto desesperado: era crimen organizado, versión faraónica." } } },
      { M: { text: { S: "A los cabecillas casi seguro los ejecutaron. Pero los robos no pararon. El hambre es mala consejera, dice el refrán — pero cuando llevas meses sin comer, es la única consejera que te queda. La economía se hundía, y para los obreros hambrientos de la orilla oeste, el oro de los muertos era la única forma de seguir vivos." } } },
      { M: { text: { S: "Al final, los sacerdotes encargados de custodiar los cuerpos reales se rindieron. En lugar de proteger las tumbas, sacaron las momias en secreto y las escondieron en dos lugares tan bien elegidos que nadie los encontró en casi tres mil años." } } },
      { M: { text: { S: "Cuando esos escondites se descubrieron en el siglo XIX, allí estaban los cuerpos de los faraones más legendarios de Egipto: Ramsés el Grande, Seti I, Tutmosis III. Apilados en ataúdes sencillos, despojados de todo su tesoro, pero intactos. Los sacerdotes los habían salvado de la destrucción total escondiéndolos de su propio pueblo." } } },
      { M: { text: { S: "Hace tres mil años, un cantero miró las tumbas más sagradas de la tierra y se encogió de hombros: ese oro no le sirve de nada a los muertos. Los Papiros del Robo de Tumbas son la prueba de que ningún tesoro, por sagrado que sea, está a salvo de gente lo bastante hambrienta. Y de que la línea entre el que protege y el que roba siempre ha sido más fina de lo que nos gustaría creer." } } },
    ],
  },
};

// ═══════════════════════════════════════════════
//  FRENCH (fr)
// ═══════════════════════════════════════════════

const frItem = {
  ...shared,
  lang:        { S: "fr" },
  langStoryId: { S: "fr#tomb-robbers-trials" },

  title:    { S: "Le procès des pilleurs" },
  subtitle: { S: "« Nous sommes allés piller les tombes, comme c'est notre habitude »" },
  excerpt:  { S: "Égypte, vers 1110 avant notre ère. Depuis des siècles, les pharaons remplissent la Vallée des Rois d'or et de bijoux. Mais sous le règne de Ramsès IX, l'empire est à genoux — et juste à côté des villages les plus pauvres dort plus d'or que quiconque n'en verra jamais." },

  moralOrLesson: { S: "Aucun trésor, aussi sacré soit-il, n'est à l'abri de gens assez affamés pour tout oser — et la frontière entre le gardien et le voleur a toujours été plus fine qu'on ne voudrait le croire." },

  characters: {
    L: [
      { S: "Amenpnufer (pilleur de tombes)" },
      { S: "Paser (maire de Thèbes-Est)" },
      { S: "Pawéra (maire de Thèbes-Ouest)" },
      { S: "Ramsès IX (pharaon)" },
    ],
  },

  paragraphs: {
    L: [
      { M: { text: { S: "Égypte, vers 1110 avant notre ère. Depuis des siècles, les pharaons remplissent la Vallée des Rois d'or, de bijoux et de tout ce qu'un roi-dieu pourrait désirer dans l'au-delà. Mais sous le règne de Ramsès IX, l'empire est à genoux. Les récoltes sont mauvaises, les ouvriers n'ont pas été payés depuis des mois, et juste à côté des villages les plus pauvres de Thèbes dort plus d'or que n'importe qui n'en verra jamais. Ce n'était qu'une question de temps." } } },
      { M: { text: { S: "Tout a commencé par une querelle entre deux maires qui se détestaient. Paser, maire de Thèbes-Est — la ville des vivants — a accusé Pawéra, responsable de la rive ouest et des tombes royales, de fermer les yeux sur les pillages. Voire d'en tirer profit. Ce n'était pas un simple règlement de comptes. Dans l'Égypte ancienne, la tombe d'un pharaon était sacrée d'une manière qu'on peine à concevoir. La profaner, ce n'était pas du vol — c'était une attaque contre l'ordre même de l'univers." } } },
      { M: { text: { S: "Le gouvernement a envoyé des inspecteurs. Ce qu'ils ont trouvé était accablant. Tombe après tombe, forcées. Sarcophages fracassés. Momies dépouillées de chaque bague, chaque amulette, chaque gramme d'or. Des trésors conçus pour l'éternité, revendus sur les marchés de Thèbes comme de la pacotille. Plus l'enquête avançait, plus le tableau noircissait : tailleurs de pierre, prêtres, gardes, fonctionnaires chargés de protéger ces tombes. Tous mouillés jusqu'au cou." } } },
      { M: { text: { S: "Les procès qui ont suivi ont laissé des archives judiciaires à couper le souffle. Certains ont avoué de leur plein gré. D'autres ont parlé sous les coups — on leur frappait la plante des pieds à coups de bâton jusqu'à ce qu'ils craquent. La confession la plus célèbre est celle d'un tailleur de pierre nommé Amenpnufer, qui a décrit son intrusion dans la tombe du pharaon Sobekemsaf II avec le détachement de quelqu'un qui raconte sa journée au bureau." } } },
      { M: { text: { S: "Ses mots, conservés sur papyrus depuis plus de trois mille ans : « Nous sommes allés piller les tombes, comme c'est notre habitude. Nous avons trouvé le dieu au fond de sa chambre funéraire. Nous avons récupéré l'or de la momie avec ses amulettes et bijoux. Nous avons mis le feu à leurs cercueils. » Comme c'est notre habitude. Comme on dirait « on a fait les courses ». Le butin a été partagé en huit parts égales. Pas un acte désespéré — du crime organisé, version pharaonique." } } },
      { M: { text: { S: "On dit que ventre affamé n'a point d'oreilles. Mais ici, ventre affamé n'avait ni oreilles, ni respect pour les dieux, ni peur de la mort. Les meneurs ont sans doute été exécutés, mais les vols n'ont jamais cessé. L'économie s'effondrait, et pour les ouvriers affamés de la rive ouest, l'or des morts était le seul moyen de rester en vie." } } },
      { M: { text: { S: "Les prêtres chargés de veiller sur les dépouilles royales ont fini par renoncer. Plutôt que de défendre les tombes, ils ont secrètement déplacé les momies dans deux cachettes si bien choisies que personne ne les a retrouvées pendant près de trois mille ans." } } },
      { M: { text: { S: "Quand ces cachettes ont été découvertes au XIXe siècle, on y a trouvé les corps des pharaons les plus légendaires d'Égypte : Ramsès le Grand, Séthi Ier, Thoutmôsis III. Empilés dans des cercueils ordinaires, dépouillés de tout leur trésor, mais intacts. Les prêtres les avaient sauvés de la destruction totale en les cachant de leur propre peuple." } } },
      { M: { text: { S: "Il y a trois mille ans, un tailleur de pierre a regardé les tombes les plus sacrées de la terre et a haussé les épaules : cet or ne sert plus à rien aux morts. Les Papyrus des vols de tombes sont la preuve qu'aucun trésor, aussi sacré soit-il, n'est à l'abri de gens assez affamés pour tout oser — et que la frontière entre le gardien et le voleur a toujours été plus fine qu'on ne voudrait le croire." } } },
    ],
  },
};

// ═══════════════════════════════════════════════
//  GERMAN (de)
// ═══════════════════════════════════════════════

const deItem = {
  ...shared,
  lang:        { S: "de" },
  langStoryId: { S: "de#tomb-robbers-trials" },

  title:    { S: "Der Prozess der Grabräuber" },
  subtitle: { S: "\u201EWir gingen die Gräber ausrauben, wie wir es gewöhnlich tun\u201C" },
  excerpt:  { S: "Ägypten, um 1110 vor Christus. Seit Jahrhunderten bestatten die Pharaonen ihre Toten im Tal der Könige \u2014 Grabkammern voller Gold und Edelsteine. Aber als Ramses IX. den Thron besteigt, ist das Reich am Ende." },

  moralOrLesson: { S: "Kein Schatz, egal wie heilig, ist sicher vor Menschen, die hungrig genug sind \u2014 und die Grenze zwischen Beschützer und Dieb war schon immer dünner, als wir es wahrhaben wollen." },

  characters: {
    L: [
      { S: "Amenpnufer (Grabräuber)" },
      { S: "Paser (Bürgermeister von Ost-Theben)" },
      { S: "Pawera (Bürgermeister von West-Theben)" },
      { S: "Ramses IX. (Pharao)" },
    ],
  },

  paragraphs: {
    L: [
      { M: { text: { S: "Ägypten, um 1110 vor Christus. Seit Jahrhunderten bestatten die Pharaonen ihre Toten im Tal der Könige \u2014 Grabkammern voller Gold, Juwelen und allem, was ein Gottkönig im Jenseits brauchen könnte. Aber als Ramses IX. den Thron besteigt, ist das Reich am Ende. Die Ernten fallen aus, die Arbeiter seit Monaten unbezahlt, und direkt neben den ärmsten Dörfern von Theben liegt mehr Gold, als irgendjemand je zu Gesicht bekommen wird. Es war nur eine Frage der Zeit." } } },
      { M: { text: { S: "Den Stein ins Rollen brachten zwei Bürgermeister, die sich bis aufs Blut hassten. Paser, Bürgermeister von Ost-Theben \u2014 der Stadt der Lebenden \u2014 beschuldigte Pawera, den Hüter der Königsgräber am Westufer, die Plünderungen zu dulden. Vielleicht sogar mitzukassieren. Das war kein gewöhnlicher Machtkampf. Im alten Ägypten war das Grab eines Pharaos heilig auf eine Weise, die wir uns kaum vorstellen können. Es auszurauben war kein Diebstahl \u2014 es war ein Angriff auf die Ordnung des Universums." } } },
      { M: { text: { S: "Die Regierung schickte Beamte, um die Gräber zu inspizieren. Was sie fanden, war verheerend. Grab um Grab, aufgebrochen. Sarkophage zerschlagen. Mumien ausgewickelt und bis auf den letzten Ring, das letzte Amulett geplündert. Schätze für die Ewigkeit \u2014 auf den Märkten von Theben verhökert. Je tiefer die Ermittlungen gingen, desto schlimmer: Steinmetze, Priester, Wachen, Beamte, deren Aufgabe es war, genau diese Gräber zu schützen. Alle steckten mit drin." } } },
      { M: { text: { S: "Die Prozesse, die folgten, hinterließen einige der erschütterndsten Gerichtsakten der antiken Welt. Manche gestanden freiwillig. Anderen wurde das Geständnis herausgeprügelt \u2014 man schlug ihnen mit Stöcken auf die Fußsohlen, bis sie redeten. Das berühmteste Geständnis stammt von einem Steinmetz namens Amenpnufer, der seinen Einbruch in das Grab von Pharao Sobekemsaf II. mit der Gelassenheit schilderte, als erzähle er von seinem Frühstück." } } },
      { M: { text: { S: "Seine Worte, auf Papyrus bewahrt seit über dreitausend Jahren: \u201EWir gingen die Gräber ausrauben, wie wir es gewöhnlich tun. Wir fanden den Gott hinten in seiner Grabkammer. Wir sammelten das Gold von der Mumie zusammen mit den Amuletten und Juwelen. Wir setzten die Särge in Brand.\u201C Wie wir es gewöhnlich tun. Als wäre es ein ganz normaler Arbeitstag. Die Beute wurde in acht gleiche Teile aufgeteilt \u2014 keine Verzweiflungstat. Organisiertes Verbrechen, Pharaonenzeit-Edition." } } },
      { M: { text: { S: "Not kennt kein Gebot, sagt man \u2014 und schon gar kein heiliges. Die Rädelsführer wurden mit ziemlicher Sicherheit hingerichtet. Aber die Raubzüge hörten nie auf. Die Wirtschaft brach zusammen, und für die hungernden Arbeiter am Westufer war das Gold der Toten der einzige Weg zu überleben." } } },
      { M: { text: { S: "Am Ende gaben die Priester, die über die königlichen Toten wachten, den Kampf auf. Statt die Gräber zu verteidigen, brachten sie die Mumien heimlich in zwei Verstecke, die so gut gewählt waren, dass sie fast dreitausend Jahre lang unentdeckt blieben." } } },
      { M: { text: { S: "Als diese Verstecke im 19. Jahrhundert gefunden wurden, lagen dort die Körper der legendärsten Pharaonen Ägyptens: Ramses der Große, Sethos I., Thutmosis III. Aufeinandergestapelt in schlichten Särgen, ihres gesamten Schatzes beraubt, aber unversehrt. Die Priester hatten sie vor der völligen Zerstörung gerettet, indem sie sie vor ihrem eigenen Volk versteckten." } } },
      { M: { text: { S: "Vor dreitausend Jahren schaute ein Steinmetz auf die heiligsten Gräber der Erde und zuckte die Achseln: Das Gold nützt den Toten nichts mehr. Die Grabräuber-Papyri sind der Beweis, dass kein Schatz, egal wie heilig, sicher ist vor Menschen, die hungrig genug sind \u2014 und dass die Grenze zwischen Beschützer und Dieb schon immer dünner war, als wir es wahrhaben wollen." } } },
    ],
  },
};

// ═══════════════════════════════════════════════
//  PUSH
// ═══════════════════════════════════════════════

async function push(label, item) {
  console.log(`\n══ Pushing ${label} ══`);
  try {
    const res = await client.send(
      new PutItemCommand({ TableName: TABLE, Item: item })
    );
    console.log(`✅  ${label} pushed successfully (HTTP ${res.$metadata.httpStatusCode})`);
    return true;
  } catch (err) {
    console.error(`❌  ${label} FAILED:`, err.message);
    return false;
  }
}

(async () => {
  const esOk = await push("Spanish (es#tomb-robbers-trials)", esItem);
  const frOk = await push("French  (fr#tomb-robbers-trials)", frItem);
  const deOk = await push("German  (de#tomb-robbers-trials)", deItem);
  console.log("\n── Summary ──");
  console.log(`Spanish: ${esOk ? "✅" : "❌"}`);
  console.log(`French:  ${frOk ? "✅" : "❌"}`);
  console.log(`German:  ${deOk ? "✅" : "❌"}`);
  if (!esOk || !frOk || !deOk) process.exit(1);
})();
