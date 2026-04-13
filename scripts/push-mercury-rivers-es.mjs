import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "terracotta-army",
  langStoryId: "es#mercury-rivers-underworld",
  lang: "es",
  storyId: "mercury-rivers-underworld",
  title: "Los ríos de mercurio del inframundo",
  subtitle: "Un emperador que construyó el cosmos bajo tierra",
  excerpt: "Hacia el año 100 a.C., un historiador chino llamado Sima Qian hizo una afirmación que sonaba a locura total. Dijo que la tumba del primer emperador de China contenía ríos de mercurio líquido en movimiento. No era una metáfora. Mercurio real, circulando por canales que reproducían los ríos del imperio.",
  paragraphs: [
    {
      text: "Hacia el año 100 a.C., un historiador chino llamado Sima Qian hizo una afirmación que sonaba a locura total. Dijo que la tumba de Qin Shi Huang —el primer emperador de China, el tipo que mandó construir la Gran Muralla y el Ejército de Terracota— contenía ríos de mercurio líquido en su interior. No era poesía ni exageración. Mercurio real, circulando por canales diseñados para imitar los ríos del imperio.",
    },
    {
      text: "Lo dejó por escrito en el Shiji, la gran crónica histórica de China. Según él, el mercurio «reproducía los cien ríos, el Yangtsé, el Río Amarillo y el gran mar, todo puesto en movimiento por mecanismos». El techo estaba cubierto de gemas que imitaban el cielo nocturno. El suelo era un mapa a escala del imperio. Estrellas arriba, ríos abajo: un universo privado para un solo hombre muerto.",
    },
    {
      text: "Durante dos mil años, casi todo el mundo asumió que exageraba. ¿Ríos de mercurio? ¿Constelaciones bajo tierra? Sonaba a mitología, no a historia. La tumba siempre estuvo ahí —una colina de 76 metros cubierta de granados cerca de Xi'an—, pero nadie podía demostrar qué escondía sin abrirla.",
    },
    {
      text: "En 2003, un equipo de científicos chinos analizó el suelo justo encima de la tumba. Los resultados fueron demoledores: los niveles de mercurio sobre la cámara funeraria eran hasta cien veces superiores a los del terreno circundante. Y no estaban repartidos al azar. Se concentraban a lo largo de trazados que coincidían exactamente con la posición real de los grandes ríos de China.",
    },
    {
      text: "Sima Qian no exageraba. Iba en serio, al pie de la letra. Qin Shi Huang había construido un cosmos completo bajo tierra: ríos de mercurio calcando los cauces de su imperio, constelaciones de piedras preciosas sobre su cabeza, ballestas automáticas montando guardia como ejércitos fantasma. A 76 metros de profundidad, creó una China eterna donde los ríos nunca se secaban, las estrellas nunca se apagaban y el emperador seguía reinando.",
    },
    {
      text: "Y aquí viene el giro: China se niega a abrir la tumba. El mercurio mata bacterias y frena la descomposición, así que funciona como un conservante extraordinario. Todo lo que hay dentro lleva más de 2.200 años sellado en vapor de mercurio. Los científicos creen que abrirla podría destruir el contenido en minutos. Dicen que la verdad siempre sale a la luz, pero esta verdad lleva dos milenios prefiriendo la oscuridad.",
    },
    {
      text: "Algunos investigadores creen que la tumba guarda manuscritos capaces de reescribir lo que sabemos de la antigua China. Qin Shi Huang estandarizó la escritura china: ¿por qué no iba a llevarse libros al otro lado? Si están ahí dentro, llevan dos mil años perfectamente sellados en la oscuridad del mercurio. Y no podemos tocarlos.",
    },
    {
      text: "La tumba sigue ahí, a plena vista. Cientos de miles de turistas pasan cada año. Fotografían a los guerreros de terracota, compran recuerdos y caminan junto a esa colina verde sin mirarla dos veces. Bajo sus pies, en la oscuridad, los ríos de mercurio del primer emperador tal vez sigan fluyendo.",
    },
  ],
  moralOrLesson: "A veces lo que suena a mito durante milenios resulta ser más asombroso que cualquier ficción.",
  characters: [
    "Qin Shi Huang — el emperador que construyó el inframundo",
    "Sima Qian — el historiador que lo describió",
    "Científicos modernos que confirmaron el mercurio",
  ],
  era: "210 a.C. — Dinastía Qin",
  source: 'Sima Qian, "Shiji"; 2003 Chinese Academy of Sciences mercury survey; Archaeological Institute of Shaanxi Province',
  icon: "\u{1F30A}",
  tier: "A",
  storyCategory: "riddles_past",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 34.3812, lng: 109.2541 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  updatedAt: Math.floor(Date.now() / 1000),
};

try {
  await docClient.send(
    new PutCommand({ TableName: "Story", Item: item })
  );
  console.log("SUCCESS: Spanish (es) story pushed to DynamoDB");
  console.log(`  siteId: ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title: ${item.title}`);
  console.log(`  paragraphs: ${item.paragraphs.length}`);
} catch (err) {
  console.error("FAILED to push Spanish story:", err);
  process.exit(1);
}
