import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "moscow-kremlin",
  langStoryId: "es#lost-library-ivan",
  lang: "es",
  storyId: "lost-library-ivan",
  title: "La biblioteca que nadie puede encontrar",
  subtitle: "Bajo el Kremlin duerme un secreto que tres imperios intentaron desenterrar",
  excerpt: "En 1472, Sofía Paleóloga — sobrina del último emperador de Bizancio — se casó con Iván III, Gran Príncipe de Rusia. Pero lo que trajo no fue oro ni tierras. Fue cientos de manuscritos antiguos en griego y latín, posiblemente los últimos restos de la legendaria Biblioteca de Constantinopla. Textos de Homero, Aristóteles y Cicerón que el resto del mundo daba por perdidos para siempre.",
  moralOrLesson: "A veces lo que se esconde no se pierde — simplemente espera a que el mundo esté listo para encontrarlo.",
  paragraphs: [
    { text: "En 1472, Sofía Paleóloga — sobrina del último emperador de Bizancio — se casó con Iván III, Gran Príncipe de Rusia. Pero lo que trajo no fue oro ni tierras. Fue cientos de manuscritos antiguos en griego y latín, posiblemente los últimos restos de la legendaria Biblioteca de Constantinopla. Textos de Homero, Aristóteles y Cicerón que el resto del mundo daba por perdidos para siempre." },
    { text: "Iván III mandó encerrar la colección en una bóveda subterránea bajo el Kremlin, lejos de los incendios que arrasaban Moscú cada dos por tres. La bóveda la diseñó, según cuentan, Aristotele Fioravanti, el arquitecto italiano que también construyó la Catedral de la Asunción del Kremlin. Siglos enteros de conocimiento irrepetible, sellados bajo tierra en el corazón de Rusia." },
    { text: "La colección creció con su nieto, Iván IV — el famoso Iván el Terrible. A pesar de ser uno de los gobernantes más brutales de la historia, el hombre estaba obsesionado con los libros. Sumó cientos de volúmenes, incluidos textos raros sobre alquimia y misticismo. Hacia 1570, un pastor alemán llamado Johann Wetterman juró que le habían enseñado la biblioteca y describió pergaminos «que no se podían valorar con ningún tesoro de la tierra»." },
    { text: "En 1584, Iván el Terrible murió. Y la biblioteca se esfumó. Así, sin más." },
    { text: "Nadie sabe qué pasó. Iván pasó sus últimos años cada vez más paranoico — puede que sellara la bóveda y se llevara su ubicación a la tumba. Otros creen que la escondieron durante los llamados Años Turbulentos, una guerra civil devastadora entre 1598 y 1613, y que todos los que sabían murieron en el caos. Algunos dicen que los incendios de Moscú acabaron con ella. Pero los testimonios y los registros bizantinos dicen que existió de verdad." },
    { text: "Desde entonces, todo el mundo la ha buscado. En 1724, el zar Pedro el Grande mandó una expedición bajo el Kremlin. Nada. En 1894, el profesor Stelletsky dedicó toda su carrera a buscarla, mapeando túneles hasta que el gobierno soviético lo paró en seco. Y en los años treinta, Stalin ordenó su propia búsqueda secreta. Sus hombres encontraron túneles que bajaban aún más. Dicen que quien busca encuentra — pero aquí, cada uno que buscó se fue con las manos vacías." },
    { text: "Y ahora viene lo mejor. Stalin — el hombre más poderoso de la Unión Soviética — encontró túneles que podían llevar a la mayor biblioteca perdida de la historia. ¿Y qué hizo? Los rellenó de hormigón. Piénsalo. ¿Qué había ahí abajo que le daba más miedo que no saber?" },
    { text: "A día de hoy, excavar bajo ciertas zonas del Kremlin está prohibido. Si la biblioteca sigue ahí, descansa bajo uno de los lugares más vigilados del planeta, sepultada tras siglos de secretos, toneladas de hormigón y capas de seguridad estatal. Hay quien cree que cuando se encuentre, no será solo una colección de libros viejos — será el capítulo perdido de la civilización humana." },
  ],
  icon: "📚",
  tier: "A",
  source: "Johann Wetterman's account (c. 1570), Professor Stelletsky's research (1894-1930s), Byzantine marriage records",
  characters: ["Ivan III", "Sophia Palaiologina", "Ivan the Terrible", "Aristotele Fioravanti", "Johann Wetterman", "Professor Stelletsky", "Stalin"],
  era: "1472 - present",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lng: 37.6175, lat: 55.752 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "riddles_past",
  updatedAt: 1772124973,
};

async function main() {
  try {
    await docClient.send(new PutCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    }));
    console.log("✅ Spanish (es) version pushed successfully!");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      // Record already exists, update it
      await docClient.send(new PutCommand({
        TableName: "Story",
        Item: item,
      }));
      console.log("✅ Spanish (es) version updated successfully!");
    } else {
      console.error("❌ Error pushing Spanish version:", err);
      process.exit(1);
    }
  }
}

main();
