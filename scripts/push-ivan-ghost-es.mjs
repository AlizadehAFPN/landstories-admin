import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "moscow-kremlin",
  langStoryId: "es#ivan-terrible-ghost",
  lang: "es",
  storyId: "ivan-terrible-ghost",
  title: "El fantasma del Kremlin",
  subtitle: "El zar que nunca dejó su fortaleza",
  excerpt: "Iván el Terrible no nació siendo un monstruo. En 1547 se convirtió en el primer zar de toda Rusia, y durante años gobernó con mano firme pero brillante: expandió el imperio hasta Siberia, modernizó las leyes y ordenó construir la catedral de San Basilio en Moscú. Pero en 1560 murió su esposa Anastasia, y algo dentro de él se quebró. Iván se convenció de que los boyardos — las grandes familias nobles rusas — la habían envenenado. Lo que vino después le dio nombre para siempre.",
  moralOrLesson: "Los pecados del poder resuenan en las piedras de los lugares donde se ejerció",
  paragraphs: [
    {
      text: "Iván el Terrible no nació siendo un monstruo. En 1547 se convirtió en el primer zar de toda Rusia, y durante años gobernó con mano firme pero brillante: expandió el imperio hasta Siberia, modernizó las leyes y ordenó construir la catedral de San Basilio en Moscú. Pero en 1560 murió su esposa Anastasia, y algo dentro de él se quebró. Iván se convenció de que los boyardos — las grandes familias nobles rusas — la habían envenenado. Lo que vino después le dio nombre para siempre."
    },
    {
      text: "Creó un ejército personal llamado la oprichnina: miles de jinetes vestidos de negro que llevaban cabezas de perro colgadas de las monturas, señal de que \"olfatearían\" a los traidores. Desde el corazón del Kremlin, Iván desató años de terror puro. Mandó estrangular al patriarca de la Iglesia ortodoxa. Arrasó Nóvgorod, una ciudad entera del norte, donde miles murieron en cinco semanas de pesadilla. Nadie estaba a salvo. Ni sacerdotes, ni nobles, ni su propia sangre."
    },
    {
      text: "En noviembre de 1581, Iván golpeó a su propio hijo — que también se llamaba Iván — con un bastón de punta de hierro durante una discusión. El golpe lo mató. La escena quedó inmortalizada en uno de los cuadros más estremecedores del arte ruso: un padre con los ojos desencajados, sosteniendo a su hijo moribundo mientras el horror de lo que había hecho le caía encima. Los tres últimos años de su vida los pasó entre arranques de crueldad y rezos desesperados, arrastrándose de rodillas por las iglesias del Kremlin."
    },
    {
      text: "El 28 de marzo de 1584, Iván se sentó a jugar al ajedrez. No terminó la partida. Lo encontraron rígido, con una expresión que los testigos describieron como \"espantosa\"."
    },
    {
      text: "Y entonces empezaron las apariciones."
    },
    {
      text: "Durante más de cuatrocientos años, la gente del Kremlin cuenta lo mismo: una figura alta con hábito de monje, deslizándose a lo largo de las murallas en la oscuridad. Cuando Napoleón ocupó Moscú en 1812, sus soldados juraron sentir una presencia helada en los aposentos reales — velas que se apagaban solas, el aliento convertido en niebla en pleno septiembre. En la era soviética, los funcionarios del Kremlin se pasaban historias en voz baja: pasos en pasillos sellados, puertas abriéndose en habitaciones cerradas con llave desde hacía décadas."
    },
    {
      text: "Dicen que el fantasma aparece sobre todo en noviembre — el mismo mes en que Iván mató a su hijo. Quienes lo han sentido describen una oleada repentina de rabia y dolor, como chocar contra un muro invisible de emociones puras. Algunos hablan de una mano helada en el hombro y una voz susurrando en un ruso tan antiguo que nadie vivo puede entenderlo. Dice el refrán que Dios aprieta pero no ahoga. Pero a Iván, ni la muerte lo dejó en paz."
    },
    {
      text: "No hace falta creer en fantasmas para entender algo: Iván el Terrible dejó tanto dolor entre esos muros que, más de cuatro siglos después, no se puede recorrer el Kremlin sin sentir que alguien camina justo detrás de ti. Hay lugares que no solo guardan la historia. Se niegan a dejarla ir."
    }
  ],
  icon: "👤",
  tier: "S",
  source: "Kremlin guard testimonies, historical folklore compilations, Russian ghost literature",
  characters: ["Ivan the Terrible (ghost)", "Kremlin guards through centuries"],
  era: "1584 - present",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lng: 37.6173, lat: 55.7508 },
  hasAudio: false,
  isFree: true,
  storyCategory: "ghosts_curses",
  disabled: false,
  updatedAt: 1772047253,
};

async function push() {
  try {
    // Validate
    const jsonStr = JSON.stringify(item);
    JSON.parse(jsonStr); // round-trip validation
    console.log(`JSON valid. Size: ${jsonStr.length} bytes`);
    console.log(`Paragraphs: ${item.paragraphs.length}`);
    console.log(`Title: ${item.title}`);
    console.log(`langStoryId: ${item.langStoryId}`);

    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
      })
    );
    console.log("SUCCESS: Spanish (es) version pushed to DynamoDB.");
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
