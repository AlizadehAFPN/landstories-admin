import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// Shared fields (unchanged from English)
const shared = {
  siteId: { S: "jerusalem-old-city" },
  storyId: { S: "temple-mount-three-faiths" },
  icon: { S: "\u{1F54A}\uFE0F" },
  tier: { S: "S" },
  source: {
    S: "Mishnah Yoma 5:2 (Foundation Stone dimensions); Josephus, The Jewish War (70 CE destruction); 1 Kings 6\u20138 (Solomon\u2019s Temple); Genesis 22 (Binding of Isaac); Quran 17:1 (Isra reference); Creswell, K.A.C., Early Muslim Architecture (Dome of the Rock); Ritmeyer, Leen, The Quest: Revealing the Temple Mount in Jerusalem; Grabar, Oleg, The Shape of the Holy; William of Tyre, Historia (Crusader accounts); Ibn al-Athir, The Complete History (Saladin\u2019s reconquest)",
  },
  characters: {
    L: [
      { S: "King Solomon" },
      { S: "Abraham / Ibrahim" },
      { S: "Caliph Umar ibn al-Khattab" },
      { S: "Emperor Titus" },
      { S: "Caliph Abd al-Malik ibn Marwan" },
      { S: "Saladin (Salah ad-Din)" },
    ],
  },
  era: {
    S: "c. 1000 BC \u2013 present (three millennia of continuous sacred significance)",
  },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "35.2355" },
      lat: { N: "31.7777" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "prophets_pilgrims" },
  updatedAt: { N: String(now) },
};

// ─────────────────────────────────────────────
// SPANISH
// ─────────────────────────────────────────────
const es = {
  ...shared,
  lang: { S: "es" },
  langStoryId: { S: "es#temple-mount-three-faiths" },
  title: { S: "La piedra que recuerda" },
  subtitle: {
    S: "Una roca, tres credos y tres mil a\u00f1os de oraci\u00f3n en el monte donde empez\u00f3 la creaci\u00f3n",
  },
  excerpt: {
    S: "Se cuenta \u2014y el relato es tan viejo como la propia piedra\u2014 que bajo la c\u00fapula dorada que corona Jerusal\u00e9n hay una losa de roca desnuda que asoma de la monta\u00f1a como un hueso de la tierra misma.",
  },
  moralOrLesson: {
    S: "La piedra no elige qui\u00e9n se arrodilla sobre ella. Soporta todas las oraciones por igual, en todas las lenguas, por cada nombre de Dios. Quiz\u00e1 los hijos de Abraham \u2014todos ellos\u2014 recuerden alg\u00fan d\u00eda que lloran sobre la misma roca, pidiendo la misma misericordia. No nos toca a nosotros terminar esa tarea. Pero tampoco somos libres de abandonarla.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Bajo la c\u00fapula dorada de Jerusal\u00e9n hay una losa de roca viva \u2014dieciocho metros de largo, trece de ancho\u2014 que brota de la monta\u00f1a como un hueso de la propia tierra. Los jud\u00edos la llaman la Piedra Fundamental. Los musulmanes, al-Sakhra. Y ambas tradiciones sostienen lo mismo: cuando Dios cre\u00f3 el mundo, empez\u00f3 aqu\u00ed. Puso esta roca en el vac\u00edo como quien coloca la primera piedra de un edificio, y todo lo dem\u00e1s \u2014cielo, mares, continentes\u2014 se despleg\u00f3 desde este \u00fanico punto.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Aqu\u00ed subi\u00f3 Abraham con su hijo para el sacrificio. Isaac, seg\u00fan la Tor\u00e1. Ismael, seg\u00fan el Cor\u00e1n. Pero la historia es la misma en ambos textos: Dios le pidi\u00f3 que entregara lo que m\u00e1s amaba en este mundo. Carg\u00f3 la le\u00f1a, tom\u00f3 al muchacho y camin\u00f3 tres d\u00edas hacia la monta\u00f1a. En alg\u00fan momento, el chico pregunt\u00f3 lo que ning\u00fan padre quiere o\u00edr: Padre, veo el fuego y la le\u00f1a, pero \u00bfd\u00f3nde est\u00e1 el cordero? Abraham solo dijo: Dios proveer\u00e1. Y siguieron subiendo en silencio \u2014un silencio m\u00e1s pesado que la monta\u00f1a entera.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Mil a\u00f1os despu\u00e9s, el rey David tom\u00f3 Jerusal\u00e9n. Su hijo Salom\u00f3n levant\u00f3 el Primer Templo sobre la roca \u2014cedro, oro, bronce. En su centro: el Sanctasanct\u00f3rum, donde solo entraba una persona al a\u00f1o, descalza \u2014el Sumo Sacerdote, susurrando el nombre verdadero de Dios. Cuatro siglos resisti\u00f3. Luego Nabucodonosor lo arras\u00f3. El Arca de la Alianza desapareci\u00f3 para siempre. Y los supervivientes, desde el exilio, juraron llorando: Si te olvido, Jerusal\u00e9n, que se seque mi mano derecha.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Los exiliados reconstruyeron un templo m\u00e1s humilde que hizo llorar a los ancianos de nostalgia. Herodes lo transform\u00f3 en una maravilla, ampliando la explanada con bloques tan enormes que algunos pesan quinientas toneladas. Jes\u00fas entr\u00f3, volc\u00f3 las mesas de los mercaderes y advirti\u00f3: No quedar\u00e1 piedra sobre piedra. En el a\u00f1o 70, el general romano Tito le dio la raz\u00f3n. Sus soldados lo incendiaron y desmontaron cada bloque buscando el oro derretido. Solo sobrevivi\u00f3 el Muro Occidental \u2014donde los jud\u00edos apoyan la frente en oraci\u00f3n desde hace dos mil a\u00f1os.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Durante seis siglos el monte qued\u00f3 en ruinas. Roma levant\u00f3 un templo pagano. Bizancio arroj\u00f3 basura sobre \u00e9l para humillar a los jud\u00edos. Pero en el 637, el califa \u00damar tom\u00f3 Jerusal\u00e9n sin derramar sangre. Cuando vio la inmundicia sobre la roca de Abraham, se arrodill\u00f3 y la limpi\u00f3 con sus propias manos. Medio siglo despu\u00e9s, el califa Abd al-Malik construy\u00f3 la C\u00fapula de la Roca \u2014ese santuario dorado que aparece en cada foto de Jerusal\u00e9n. Cost\u00f3 siete a\u00f1os de impuestos de Egipto. No le tembl\u00f3 el pulso. Estaba coronando la roca donde empez\u00f3 el mundo.",
          },
        },
      },
      {
        M: {
          text: {
            S: "En 1099, los cruzados asaltaron Jerusal\u00e9n y masacraron a casi todos sus habitantes. Pusieron una cruz sobre la c\u00fapula y un altar sobre la roca. Los Caballeros Templarios se instalaron en la mezquita de Al-Aqsa \u2014de ah\u00ed viene su nombre, del Templo. Ochenta y ocho a\u00f1os despu\u00e9s, Saladino recuper\u00f3 la ciudad. A diferencia de los cruzados, la perdon\u00f3. Retir\u00f3 la cruz, devolvi\u00f3 la media luna y lav\u00f3 la roca con agua de rosas tra\u00edda desde Damasco. La piedra no recuerda qui\u00e9n la conquist\u00f3. Solo recuerda qui\u00e9n llor\u00f3 sobre ella.",
          },
        },
      },
      {
        M: {
          text: {
            S: "A la tercera va la vencida, dicen. Pero a esta roca llegaron tres credos y ninguno venci\u00f3 \u2014ni falta que hace. Los jud\u00edos rezan junto al Muro Occidental sin pisar la explanada, demasiado sagrada. Los musulmanes oran en Al-Aqsa. Los cristianos recorren los pasos de Jes\u00fas. Tres religiones. Una roca. Tres mil a\u00f1os. Bajo la c\u00fapula, esa losa p\u00e1lida y \u00e1spera sigue donde siempre estuvo, indiferente a los imperios. Sobrevivi\u00f3 a Salom\u00f3n, a Tito, a los cruzados, a los otomanos. Sobrevivir\u00e1 a lo que venga despu\u00e9s. No habla. No elige. Pero recuerda cada oraci\u00f3n, en cada lengua, y jam\u00e1s ha rechazado ninguna.",
          },
        },
      },
    ],
  },
};

// ─────────────────────────────────────────────
// FRENCH
// ─────────────────────────────────────────────
const fr = {
  ...shared,
  lang: { S: "fr" },
  langStoryId: { S: "fr#temple-mount-three-faiths" },
  title: { S: "La pierre qui se souvient" },
  subtitle: {
    S: "Une roche, trois religions et trois mille ans de pri\u00e8re sur le mont o\u00f9 la cr\u00e9ation a commenc\u00e9",
  },
  excerpt: {
    S: "On raconte \u2014et le r\u00e9cit est aussi ancien que la pierre elle-m\u00eame\u2014 que sous le d\u00f4me dor\u00e9 qui couronne J\u00e9rusalem se trouve une dalle de roche nue, affleurant de la montagne comme un os de la terre.",
  },
  moralOrLesson: {
    S: "La pierre ne choisit pas qui s\u2019agenouille devant elle. Elle supporte toutes les pri\u00e8res \u00e9galement, dans toutes les langues, pour chaque nom de Dieu. Peut-\u00eatre que les enfants d\u2019Abraham \u2014tous autant qu\u2019ils sont\u2014 se souviendront un jour qu\u2019ils pleurent sur la m\u00eame roche, implorant la m\u00eame mis\u00e9ricorde. Il ne nous appartient pas d\u2019achever cette t\u00e2che. Mais nous ne sommes pas libres de l\u2019abandonner.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Sous le d\u00f4me dor\u00e9 de J\u00e9rusalem affleure une dalle de roche brute \u2014dix-huit m\u00e8tres de long, treize de large\u2014 qui \u00e9merge de la montagne comme un os de la terre elle-m\u00eame. Les juifs l\u2019appellent la Pierre de fondation. Les musulmans, al-Sakhra. Et les deux traditions affirment la m\u00eame chose, \u00e0 couper le souffle : quand Dieu a cr\u00e9\u00e9 le monde, c\u2019est ici qu\u2019il a commenc\u00e9. Il a pos\u00e9 cette roche dans le vide comme on pose une pierre angulaire, et tout le reste \u2014toute la cr\u00e9ation\u2014 s\u2019est d\u00e9ploy\u00e9 \u00e0 partir de ce seul point.",
          },
        },
      },
      {
        M: {
          text: {
            S: "C\u2019est ici qu\u2019Abraham a gravi la montagne avec son fils pour le sacrifier. Isaac, selon la Torah. Isma\u00ebl, selon le Coran. L\u2019histoire est la m\u00eame des deux c\u00f4t\u00e9s : Dieu lui a demand\u00e9 de renoncer \u00e0 ce qu\u2019il aimait le plus au monde. Alors il a charg\u00e9 le bois, pris l\u2019enfant et march\u00e9 trois jours. \u00c0 un moment, le gar\u00e7on a pos\u00e9 la question qu\u2019aucun p\u00e8re ne veut entendre : P\u00e8re, je vois le feu et le bois, mais o\u00f9 est l\u2019agneau ? Abraham a r\u00e9pondu : Dieu y pourvoira. Et ils ont continu\u00e9 \u00e0 monter \u2014le silence entre eux plus lourd que la montagne.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Mille ans plus tard, le roi David s\u2019empare de J\u00e9rusalem. Son fils Salomon \u00e9l\u00e8ve le Premier Temple au-dessus de cette roche \u2014c\u00e8dre, or et bronze. En son c\u0153ur : le Saint des Saints, o\u00f9 une seule personne entrait une fois par an, pieds nus \u2014le Grand Pr\u00eatre, murmurant le vrai nom de Dieu. Le Temple a tenu quatre si\u00e8cles. Puis Nabuchodonosor l\u2019a r\u00e9duit en cendres. L\u2019Arche d\u2019alliance a disparu. En exil, les survivants ont jur\u00e9 en pleurant : Si je t\u2019oublie, J\u00e9rusalem, que ma main droite se dess\u00e8che.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Les exil\u00e9s ont reconstruit \u2014un temple plus humble qui a fait pleurer les anciens de nostalgie. H\u00e9rode l\u2019a transform\u00e9 en merveille, \u00e9largissant l\u2019esplanade avec des blocs si colossaux que certains p\u00e8sent cinq cents tonnes. J\u00e9sus y est entr\u00e9, a renvers\u00e9 les tables des marchands et a pr\u00e9venu : Il ne restera pas pierre sur pierre. En l\u2019an 70, le g\u00e9n\u00e9ral romain Titus lui a donn\u00e9 raison. Ses soldats ont mis le feu au Temple et d\u00e9mont\u00e9 chaque bloc pour r\u00e9cup\u00e9rer l\u2019or fondu. Seul a surv\u00e9cu le Mur occidental \u2014o\u00f9 les juifs posent le front en pri\u00e8re depuis deux mille ans.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Pendant six si\u00e8cles, le mont est rest\u00e9 en ruines. Rome y a dress\u00e9 un temple pa\u00efen. Byzance y a d\u00e9vers\u00e9 des ordures pour humilier les juifs. Puis en 637, le calife Omar prend J\u00e9rusalem sans violence. Quand il d\u00e9couvre l\u2019immondice qui recouvre la roche d\u2019Abraham, il s\u2019agenouille et la nettoie de ses propres mains. Cinquante ans plus tard, le calife Abd al-Malik b\u00e2tit le D\u00f4me du Rocher \u2014ce sanctuaire dor\u00e9 qu\u2019on voit sur chaque photo de J\u00e9rusalem. Il y a englouti sept ans de recettes fiscales de l\u2019\u00c9gypte. Sans h\u00e9siter. Il couronnait la roche o\u00f9 le monde a commenc\u00e9.",
          },
        },
      },
      {
        M: {
          text: {
            S: "En 1099, les crois\u00e9s prennent J\u00e9rusalem d\u2019assaut et massacrent presque tous ses habitants. Ils plantent une croix sur le d\u00f4me, un autel sur la roche. Les Templiers s\u2019installent dans la mosqu\u00e9e Al-Aqsa \u2014c\u2019est de l\u00e0 que vient leur nom, du Temple. Quatre-vingt-huit ans plus tard, Saladin reprend la ville. Contrairement aux crois\u00e9s, il l\u2019\u00e9pargne. Il retire la croix, r\u00e9tablit le croissant et lave la roche \u00e0 l\u2019eau de rose de Damas. La pierre ne se souvient pas de qui l\u2019a conquise. Elle se souvient de qui a pleur\u00e9 sur elle.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Jamais deux sans trois, dit-on. Quand deux croyances ont r\u00e9clam\u00e9 cette roche, la troisi\u00e8me devait suivre. Mais aucune n\u2019a triomph\u00e9 \u2014et c\u2019est peut-\u00eatre la le\u00e7on. Les juifs prient au Mur occidental sans monter sur l\u2019esplanade, trop sacr\u00e9e. Les musulmans prient \u00e0 Al-Aqsa. Les chr\u00e9tiens marchent l\u00e0 o\u00f9 J\u00e9sus enseignait. Trois religions. Une roche. Trois mille ans. Sous le d\u00f4me, cette dalle p\u00e2le et rugueuse est toujours l\u00e0, indiff\u00e9rente aux empires. Elle a surv\u00e9cu \u00e0 Salomon, \u00e0 Titus, aux crois\u00e9s, aux Ottomans. Elle survivra \u00e0 ce qui viendra. La pierre ne parle pas. Ne choisit pas. Mais elle se souvient de chaque pri\u00e8re, dans chaque langue \u2014et n\u2019en a jamais refus\u00e9 aucune.",
          },
        },
      },
    ],
  },
};

// ─────────────────────────────────────────────
// GERMAN
// ─────────────────────────────────────────────
const de = {
  ...shared,
  lang: { S: "de" },
  langStoryId: { S: "de#temple-mount-three-faiths" },
  title: { S: "Der Stein, der sich erinnert" },
  subtitle: {
    S: "Ein Fels, drei Religionen und dreitausend Jahre Gebet auf dem Berg, an dem die Sch\u00f6pfung begann",
  },
  excerpt: {
    S: "Man erz\u00e4hlt \u2014und die Erz\u00e4hlung selbst ist uralt\u2014, dass unter der goldenen Kuppel, die Jerusalem kr\u00f6nt, eine raue, helle Steinplatte liegt, die aus dem Berg ragt wie ein Knochen aus der Erde selbst.",
  },
  moralOrLesson: {
    S: "Der Stein w\u00e4hlt nicht, wer vor ihm kniet. Er tr\u00e4gt alle Gebete gleicherma\u00dfen, in allen Sprachen, f\u00fcr jeden Namen Gottes. Vielleicht werden die Kinder Abrahams \u2014alle miteinander\u2014 eines Tages erkennen, dass sie auf demselben Fels weinen, um dieselbe Gnade flehen. Es ist nicht an uns, dieses Werk zu vollenden. Aber wir sind auch nicht frei, es aufzugeben.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Unter der goldenen Kuppel von Jerusalem ragt eine nackte Steinplatte aus dem Berg \u2014achtzehn Meter lang, dreizehn breit\u2014 wie ein Knochen aus der Erde selbst. Die Juden nennen sie den Grundstein. Die Muslime al-Sakhra. Und beide Traditionen behaupten dasselbe: Als Gott die Welt erschuf, fing er hier an. Er setzte diesen Fels in die Leere wie ein Baumeister seinen Grundstein, und alles andere \u2014die gesamte Sch\u00f6pfung\u2014 breitete sich von diesem einen Punkt aus.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Hierher f\u00fchrte Abraham seinen Sohn, um ihn zu opfern. Isaak, laut der Tora. Ismael, laut dem Koran. Die Geschichte ist in beiden Texten dieselbe: Gott verlangte von ihm, das herzugeben, was er am meisten liebte. Also lud Abraham das Holz auf, nahm den Jungen und wanderte drei Tage. Irgendwann stellte der Junge die Frage, die kein Vater h\u00f6ren will: Vater, ich sehe das Feuer und das Holz \u2014aber wo ist das Lamm? Abraham antwortete: Gott wird daf\u00fcr sorgen. Und sie gingen weiter \u2014die Stille zwischen ihnen schwerer als der Berg.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Tausend Jahre sp\u00e4ter erobert K\u00f6nig David Jerusalem. Sein Sohn Salomo errichtet den Ersten Tempel \u00fcber dem Stein \u2014Zedernholz, Gold, Bronze. In seinem Innersten: das Allerheiligste, das nur eine Person betrat, einmal im Jahr, barfu\u00df \u2014der Hohepriester, der den wahren Namen Gottes fl\u00fcsterte. Vier Jahrhunderte hielt er stand. Dann brannte ihn Nebukadnezar nieder. Die Bundeslade verschwand. Im Exil schworen die \u00dcberlebenden unter Tr\u00e4nen: Wenn ich dich vergesse, Jerusalem, so verdorre meine rechte Hand.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Die Verbannten bauten wieder auf \u2014einen bescheideneren Tempel, bei dessen Anblick die Alten vor Wehmut weinten. K\u00f6nig Herodes machte ihn zum Weltwunder und erweiterte den Tempelberg mit Steinbl\u00f6cken, von denen manche f\u00fcnfhundert Tonnen wiegen. Jesus betrat ihn, stie\u00df die Tische der H\u00e4ndler um und warnte: Kein Stein wird auf dem anderen bleiben. Im Jahr 70 gab ihm der r\u00f6mische General Titus recht. Seine Soldaten setzten alles in Brand und rissen jeden Block auseinander, um das geschmolzene Gold herauszuholen. Nur die Westmauer blieb stehen \u2014an der Juden seit zweitausend Jahren ihre Stirn zum Gebet anlegen.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Sechs Jahrhunderte lang lag der Berg in Tr\u00fcmmern. Rom errichtete einen heidnischen Tempel. Byzanz kippte Abfall darauf, um die Juden zu dem\u00fctigen. Dann, im Jahr 637, nimmt Kalif Umar Jerusalem ohne Blutvergie\u00dfen ein. Als er den Dreck auf Abrahams Fels sieht, kniet er nieder und s\u00e4ubert ihn mit eigenen H\u00e4nden. F\u00fcnfzig Jahre sp\u00e4ter baut Kalif Abd al-Malik den Felsendom \u2014jenes goldene Heiligtum, das auf jedem Foto von Jerusalem zu sehen ist. Es verschlang sieben Jahre \u00e4gyptischer Steuereinnahmen. Er z\u00f6gerte nicht. Er kr\u00f6nte den Fels, an dem die Welt begonnen hatte.",
          },
        },
      },
      {
        M: {
          text: {
            S: "1099 st\u00fcrmen die Kreuzfahrer Jerusalem und metzeln fast alle Einwohner nieder. Sie setzen ein Kreuz auf die Kuppel, einen Altar auf den Stein. Die Tempelritter ziehen in die Al-Aqsa-Moschee ein \u2014daher ihr Name, vom Tempel. Achtundachtzig Jahre sp\u00e4ter nimmt Saladin die Stadt zur\u00fcck. Anders als die Kreuzfahrer verschont er sie. Er entfernt das Kreuz, bringt den Halbmond zur\u00fcck und w\u00e4scht den Fels mit Rosenwasser aus Damaskus. Der Stein erinnert sich nicht daran, wer ihn erobert hat. Er erinnert sich daran, wer auf ihm geweint hat.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Steter Tropfen h\u00f6hlt den Stein, hei\u00dft es. Aber dreitausend Jahre Gebete haben diesen Fels nicht ausgeh\u00f6hlt \u2014sie haben ihn geheiligt. Juden beten an der Westmauer, ohne den Berg zu betreten, zu heilig. Muslime beten in der Al-Aqsa. Christen gehen die Wege, die Jesus lehrte. Drei Religionen. Ein Stein. Drei Jahrtausende. Unter der Kuppel liegt diese blasse, raue Platte, gleichg\u00fcltig gegen\u00fcber Imperien. Sie \u00fcberstand Salomo, Titus, die Kreuzfahrer, die Osmanen. Sie wird \u00fcberstehen, was auch immer noch kommt. Der Stein spricht nicht. Er w\u00e4hlt nicht. Aber er erinnert sich an jedes Gebet, in jeder Sprache \u2014und hat nie eines abgewiesen.",
          },
        },
      },
    ],
  },
};

// ─────────────────────────────────────────────
// PUSH
// ─────────────────────────────────────────────
const versions = [
  { lang: "es", item: es },
  { lang: "fr", item: fr },
  { lang: "de", item: de },
];

for (const { lang, item } of versions) {
  try {
    const cmd = new PutItemCommand({ TableName: TABLE, Item: item });
    const result = await client.send(cmd);
    console.log(
      `[${lang.toUpperCase()}] SUCCESS — pushed ${item.langStoryId.S} (HTTP ${result.$metadata.httpStatusCode})`
    );
  } catch (err) {
    console.error(`[${lang.toUpperCase()}] FAILED:`, err.message);
    process.exit(1);
  }
}

console.log("\nAll 3 versions pushed successfully.");
