import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "moscow-kremlin",
  langStoryId: "fr#lost-library-ivan",
  lang: "fr",
  storyId: "lost-library-ivan",
  title: "La biblioth\u00e8que enfouie du Kremlin",
  subtitle: "Des si\u00e8cles de savoir enfouis sous la forteresse la plus surveill\u00e9e au monde",
  excerpt: "En 1472, une femme arrive \u00e0 Moscou pour \u00e9pouser le grand-prince Ivan\u00a0III. Elle s\u2019appelle Sophie Pal\u00e9ologue, c\u2019est la ni\u00e8ce du dernier empereur de Byzance. Sa dot n\u2019est ni de l\u2019or ni des terres. Ce sont des centaines de manuscrits grecs et latins \u2014 peut-\u00eatre les derniers vestiges de la l\u00e9gendaire biblioth\u00e8que de Constantinople. Des textes d\u2019Hom\u00e8re, d\u2019Aristote, de Cic\u00e9ron. Des \u0153uvres que le reste du monde croyait perdues \u00e0 jamais.",
  moralOrLesson: "Parfois, le savoir ne dispara\u00eet pas. Il attend. Et ceux qui ont le pouvoir de le retrouver pr\u00e9f\u00e8rent le laisser dans l\u2019ombre.",
  paragraphs: [
    { text: "En 1472, une femme arrive \u00e0 Moscou pour \u00e9pouser le grand-prince Ivan\u00a0III. Elle s\u2019appelle Sophie Pal\u00e9ologue, c\u2019est la ni\u00e8ce du dernier empereur de Byzance. Sa dot n\u2019est ni de l\u2019or ni des terres. Ce sont des centaines de manuscrits grecs et latins \u2014 peut-\u00eatre les derniers vestiges de la l\u00e9gendaire biblioth\u00e8que de Constantinople. Des textes d\u2019Hom\u00e8re, d\u2019Aristote, de Cic\u00e9ron. Des \u0153uvres que le reste du monde croyait perdues \u00e0 jamais." },
    { text: "Ivan\u00a0III fait enfermer la collection dans un caveau souterrain, sous le Kremlin, \u00e0 l\u2019abri des incendies qui ravagent r\u00e9guli\u00e8rement le Moscou de bois. Le caveau aurait \u00e9t\u00e9 con\u00e7u par Aristot\u00e8le Fioravanti \u2014 l\u2019architecte italien qui a aussi b\u00e2ti la cath\u00e9drale de la Dormition au Kremlin. Des si\u00e8cles de savoir irremplaçable, scell\u00e9s sous la terre, au c\u0153ur m\u00eame de la Russie." },
    { text: "La collection grandit sous le petit-fils d\u2019Ivan\u00a0III \u2014 Ivan\u00a0IV, qu\u2019on conna\u00eet mieux sous le nom d\u2019Ivan le Terrible. Malgr\u00e9 sa r\u00e9putation de tyran sanguinaire, l\u2019homme \u00e9tait d\u00e9vor\u00e9 par les livres. Il ajoute des centaines de volumes, dont des textes rares sur l\u2019alchimie et la mystique juive. Vers 1570, un pasteur allemand, Johann Wetterman, affirme avoir vu la biblioth\u00e8que de ses propres yeux. Il d\u00e9crit des rouleaux \u00ab\u00a0qu\u2019aucun tr\u00e9sor sur terre ne pourrait \u00e9galer\u00a0\u00bb." },
    { text: "Puis Ivan le Terrible meurt, en 1584. Et la biblioth\u00e8que dispara\u00eet." },
    { text: "Personne ne sait ce qui s\u2019est pass\u00e9. Ivan a fini sa vie parano\u00efaque \u2014 il a peut-\u00eatre scell\u00e9 le caveau et emport\u00e9 le secret dans sa tombe. D\u2019autres pensent que la collection a \u00e9t\u00e9 cach\u00e9e pendant le Temps des Troubles, une guerre civile qui a ravag\u00e9 la Russie de 1598 \u00e0 1613, et que tous ceux qui savaient sont morts dans le chaos. D\u2019autres accusent les incendies qui ont d\u00e9truit Moscou tant de fois. Mais les t\u00e9moignages et les archives byzantines sont formels\u00a0: cette biblioth\u00e8que a exist\u00e9." },
    { text: "On dit\u00a0: cherche et tu trouveras. Sauf qu\u2019ici, tout le monde a cherch\u00e9 et personne n\u2019a rien trouv\u00e9. En 1724, Pierre le Grand envoie une exp\u00e9dition sous le Kremlin. Rien. En 1894, le professeur Stelletsky y consacre toute sa carri\u00e8re, cartographiant des tunnels oubli\u00e9s \u2014 avant que le r\u00e9gime sovi\u00e9tique ne l\u2019arr\u00eate. Dans les ann\u00e9es 1930, Staline lance sa propre recherche secr\u00e8te. Ses hommes trouvent des tunnels qui s\u2019enfoncent encore plus loin. Sa r\u00e9action\u00a0? Il les fait combler de b\u00e9ton." },
    { text: "Arr\u00eatez-vous l\u00e0 une seconde. L\u2019homme le plus puissant d\u2019Union sovi\u00e9tique d\u00e9couvre des tunnels qui m\u00e8nent peut-\u00eatre \u00e0 la plus grande biblioth\u00e8que disparue de l\u2019histoire \u2014 et au lieu d\u2019aller voir, il fait tout boucher. Qu\u2019est-ce qui pouvait bien se trouver l\u00e0-dessous pour qu\u2019il pr\u00e9f\u00e8re ne pas savoir\u00a0?" },
    { text: "Aujourd\u2019hui encore, il est interdit de creuser sous certaines parties du Kremlin. Si la biblioth\u00e8que existe toujours, elle se trouve sous l\u2019un des lieux les plus gard\u00e9s de la plan\u00e8te, derri\u00e8re des si\u00e8cles de secrets, des tonnes de b\u00e9ton et des couches de s\u00e9curit\u00e9 d\u2019\u00c9tat. Certains pensent que le jour o\u00f9 on la retrouvera, ce ne sera pas juste une collection de vieux livres. Ce sera le chapitre manquant de la civilisation humaine." },
  ],
  icon: "\uD83D\uDCDA",
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
    console.log("\u2705 French (fr) version pushed successfully!");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      await docClient.send(new PutCommand({
        TableName: "Story",
        Item: item,
      }));
      console.log("\u2705 French (fr) version updated successfully!");
    } else {
      console.error("\u274c Error pushing French version:", err);
      process.exit(1);
    }
  }
}

main();
