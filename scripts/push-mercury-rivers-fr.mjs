import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "terracotta-army",
  langStoryId: "fr#mercury-rivers-underworld",
  lang: "fr",
  storyId: "mercury-rivers-underworld",
  title: "Les fleuves de mercure de l'au-del\u00e0",
  subtitle: "L'empereur qui a b\u00e2ti un univers sous terre",
  excerpt: "Aux alentours de 100 avant notre \u00e8re, un historien chinois du nom de Sima Qian a \u00e9crit quelque chose qui avait tout l'air d'un d\u00e9lire. Il affirmait que le tombeau du premier empereur de Chine contenait des fleuves de mercure liquide en mouvement. Pas une image. Du vrai mercure, propuls\u00e9 dans des canaux pour reproduire les cours d'eau de l'empire.",
  paragraphs: [
    {
      text: "Aux alentours de 100 avant notre \u00e8re, un historien chinois du nom de Sima Qian a \u00e9crit quelque chose qui avait tout l'air d'un d\u00e9lire. Il affirmait que le tombeau de Qin Shi Huang \u2014 le premier empereur de Chine, celui qui a fait b\u00e2tir la Grande Muraille et l'Arm\u00e9e de terre cuite \u2014 contenait des fleuves de mercure liquide en mouvement. Pas une image. Du vrai mercure, propuls\u00e9 dans des canaux pour reproduire les cours d'eau de l'empire.",
    },
    {
      text: "Il l'a consign\u00e9 dans le Shiji, la grande chronique historique de la Chine. D'apr\u00e8s lui, le mercure \u00ab reproduisait les cent rivi\u00e8res, le Yangts\u00e9, le fleuve Jaune et la grande mer, le tout mis en mouvement par des m\u00e9canismes \u00bb. Le plafond \u00e9tait incrust\u00e9 de gemmes imitant le ciel \u00e9toil\u00e9. Le sol formait une carte de l'empire \u00e0 l'\u00e9chelle. Les \u00e9toiles au-dessus, les fleuves en dessous : un univers personnel b\u00e2ti pour un seul mort.",
    },
    {
      text: "Pendant deux mille ans, \u00e0 peu pr\u00e8s personne n'y a cru. Des fleuves de mercure ? Des constellations souterraines ? \u00c7a ressemblait \u00e0 de la mythologie, pas \u00e0 de l'histoire. Le tombeau a toujours \u00e9t\u00e9 l\u00e0 \u2014 une colline de 76 m\u00e8tres couverte de grenadiers, pr\u00e8s de la ville de Xi'an \u2014 mais impossible de prouver ce qu'il cachait sans l'ouvrir.",
    },
    {
      text: "En 2003, des scientifiques chinois ont analys\u00e9 le sol juste au-dessus du tombeau. Les r\u00e9sultats ont \u00e9t\u00e9 stup\u00e9fiants : les concentrations de mercure au-dessus de la chambre fun\u00e9raire \u00e9taient jusqu'\u00e0 cent fois sup\u00e9rieures \u00e0 celles du terrain environnant. Et le mercure n'\u00e9tait pas r\u00e9parti au hasard. Il se concentrait le long de trac\u00e9s qui correspondaient exactement \u00e0 la position des grands fleuves chinois sur une carte.",
    },
    {
      text: "Sima Qian n'exag\u00e9rait pas. Il \u00e9tait litt\u00e9ral. Qin Shi Huang avait b\u00e2ti un cosmos entier sous terre : des fleuves de mercure reproduisant les cours d'eau de son empire, des constellations de pierres pr\u00e9cieuses au plafond, des arbal\u00e8tes automatiques montant la garde comme des arm\u00e9es fant\u00f4mes. Tout vient \u00e0 point \u00e0 qui sait attendre \u2014 et il aura fallu deux mill\u00e9naires pour que la science donne raison \u00e0 l'histoire.",
    },
    {
      text: "Mais voil\u00e0 le paradoxe : la Chine refuse d'ouvrir le tombeau. Le mercure tue les bact\u00e9ries et stoppe la d\u00e9composition, ce qui en fait un conservateur hors pair. Tout ce qui se trouve \u00e0 l'int\u00e9rieur est scell\u00e9 dans des vapeurs de mercure depuis plus de 2 200 ans. Les scientifiques redoutent que l'ouverture d\u00e9truise tout en quelques minutes. Le plus grand myst\u00e8re arch\u00e9ologique de la plan\u00e8te est l\u00e0, sous nos yeux, intouchable.",
    },
    {
      text: "Certains chercheurs pensent que le tombeau renferme des manuscrits capables de r\u00e9\u00e9crire ce que l'on sait de la Chine antique. Qin Shi Huang a standardis\u00e9 l'\u00e9criture chinoise elle-m\u00eame \u2014 pourquoi n'aurait-il pas emport\u00e9 des livres dans l'au-del\u00e0 ? S'ils sont l\u00e0, ils dorment depuis deux mille ans dans l'obscurit\u00e9 satur\u00e9e de mercure. Et on ne peut pas y toucher.",
    },
    {
      text: "Le tombeau est toujours l\u00e0 aujourd'hui, en pleine vue. Des centaines de milliers de touristes le visitent chaque ann\u00e9e. Ils photographient les c\u00e9l\u00e8bres guerriers de terre cuite, ach\u00e8tent des souvenirs et passent devant cette colline verdoyante sans y pr\u00eater attention. Sous leurs pieds, dans le noir, les fleuves de mercure du premier empereur coulent peut-\u00eatre encore.",
    },
  ],
  moralOrLesson: "Parfois, ce que l'on prend pour un mythe pendant des mill\u00e9naires se r\u00e9v\u00e8le plus stup\u00e9fiant que n'importe quelle fiction.",
  characters: [
    "Qin Shi Huang \u2014 l'empereur qui a b\u00e2ti le monde souterrain",
    "Sima Qian \u2014 l'historien qui l'a d\u00e9crit",
    "Les scientifiques modernes qui ont confirm\u00e9 le mercure",
  ],
  era: "210 av. J.-C. \u2014 Dynastie Qin",
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
  console.log("SUCCESS: French (fr) story pushed to DynamoDB");
  console.log(`  siteId: ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title: ${item.title}`);
  console.log(`  paragraphs: ${item.paragraphs.length}`);
} catch (err) {
  console.error("FAILED to push French story:", err);
  process.exit(1);
}
