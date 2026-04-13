import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "moscow-kremlin",
  langStoryId: "fr#ivan-terrible-ghost",
  lang: "fr",
  storyId: "ivan-terrible-ghost",
  title: "Le spectre du Kremlin",
  subtitle: "Le tsar qui hante encore sa forteresse",
  excerpt: "Ivan le Terrible n'est pas né monstre. En 1547, il est devenu le tout premier tsar de Russie, et pendant des années, il a été un dirigeant remarquable : il a étendu l'empire jusqu'en Sibérie, modernisé les lois, fait construire la cathédrale Saint-Basile à Moscou. Puis sa première femme, Anastasia, est morte en 1560. Ivan s'est convaincu que les boïars — les grandes familles nobles russes — l'avaient empoisonnée. Quelque chose en lui s'est brisé. Ce qui a suivi a gravé son nom dans l'histoire.",
  moralOrLesson: "Les péchés du pouvoir résonnent dans les pierres mêmes des lieux où ils furent commis",
  paragraphs: [
    {
      text: "Ivan le Terrible n'est pas né monstre. En 1547, il est devenu le tout premier tsar de Russie, et pendant des années, il a été un dirigeant remarquable : il a étendu l'empire jusqu'en Sibérie, modernisé les lois, fait construire la cathédrale Saint-Basile à Moscou. Puis sa première femme, Anastasia, est morte en 1560. Ivan s'est convaincu que les boïars — les grandes familles nobles russes — l'avaient empoisonnée. Quelque chose en lui s'est brisé. Ce qui a suivi a gravé son nom dans l'histoire."
    },
    {
      text: "Il a créé une armée privée, l'opritchnina : des milliers de cavaliers vêtus de noir qui accrochaient des têtes de chien à leurs selles pour montrer qu'ils « flaireront » les traîtres. Depuis le Kremlin, Ivan a déchaîné des années de terreur absolue. Il a fait étrangler le chef de l'Église orthodoxe. Il a ordonné la destruction de Novgorod, une ville entière du nord de la Russie, où des milliers de personnes sont mortes en cinq semaines. Personne n'était à l'abri. Ni les prêtres, ni les nobles, ni son propre sang."
    },
    {
      text: "En novembre 1581, Ivan a frappé son propre fils — qui portait aussi le nom d'Ivan — avec un bâton à pointe de fer, au cours d'une dispute. Le coup l'a tué. La scène a été immortalisée dans l'une des toiles les plus terrifiantes de l'art russe : un père aux yeux égarés, serrant son fils mourant contre lui, submergé par l'horreur de ce qu'il venait de faire. Ses trois dernières années, il les a passées entre accès de cruauté et prières désespérées, rampant à genoux dans les églises du Kremlin."
    },
    {
      text: "Le 28 mars 1584, Ivan s'est assis pour jouer aux échecs. Il n'a jamais fini la partie. On l'a retrouvé raide, le visage figé dans une expression que les témoins ont qualifiée d'« épouvantable »."
    },
    {
      text: "Et c'est là que tout a commencé."
    },
    {
      text: "Depuis plus de quatre cents ans, ceux qui vivent et travaillent au Kremlin racontent la même chose : une silhouette haute en robe de moine, glissant le long des remparts dans l'obscurité. Quand les troupes de Napoléon ont occupé Moscou en 1812, des soldats français ont juré avoir ressenti une présence glaciale dans les appartements royaux — des bougies qui s'éteignaient toutes seules, leur souffle devenu brouillard en plein mois de septembre. À l'époque soviétique, les employés du Kremlin échangeaient à voix basse des histoires de pas dans des couloirs murés et de portes s'ouvrant dans des pièces verrouillées depuis des décennies."
    },
    {
      text: "On dit que le spectre apparaît surtout en novembre — le mois où Ivan a tué son fils. Ceux qui l'ont ressenti décrivent une vague soudaine de chagrin et de rage, comme si on marchait dans un mur d'émotions brutes. Certains parlent d'une main glacée sur l'épaule et d'une voix murmurant dans un russe si ancien que personne aujourd'hui ne peut le comprendre. On dit bien : chassez le naturel, il revient au galop. Mais le fantôme d'Ivan, lui, n'est jamais parti."
    },
    {
      text: "Pas besoin de croire aux fantômes pour comprendre une chose : Ivan le Terrible a laissé tellement de souffrance entre ces murs que, plus de quatre siècles plus tard, on ne peut pas traverser les couloirs du Kremlin sans sentir que quelqu'un se tient juste derrière soi. Il y a des lieux qui ne se contentent pas de garder l'histoire. Ils refusent de la laisser partir."
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
    const jsonStr = JSON.stringify(item);
    JSON.parse(jsonStr);
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
    console.log("SUCCESS: French (fr) version pushed to DynamoDB.");
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
