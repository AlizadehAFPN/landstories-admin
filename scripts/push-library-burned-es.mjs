import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "alamut-castle" },
  langStoryId: { S: "es#library-burned-seven-days" },
  lang: { S: "es" },
  storyId: { S: "library-burned-seven-days" },
  title: { S: "Siete noches en llamas" },
  subtitle: { S: "Cuatrocientos mil libros, una fortaleza en las nubes y el fuego que nos robó lo que nunca sabremos" },
  excerpt: { S: "En 1090, un hombre tomó un castillo sin derramar una gota de sangre. Después se encerró a leer durante treinta y cuatro años y construyó una de las bibliotecas más grandes del mundo islámico. Siglo y medio después, los mongoles la quemaron durante siete días." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "En 1090, un erudito llamado Hassan-i Sabbah hizo algo que nadie creía posible: tomó el castillo de Alamut —una fortaleza clavada en una roca en las montañas Alborz, al norte de Irán— sin derramar una sola gota de sangre. Y luego hizo algo todavía más raro. Se encerró. Apenas salió en treinta y cuatro años. ¿Qué hacía ahí dentro? Leía. Coleccionaba. Construyó una de las bibliotecas más grandes que el mundo islámico había visto jamás."
          },
        },
      },
      {
        M: {
          text: {
            S: "Durante más de ciento sesenta años, cada líder que vino después de Hassan sumó a esa colección. Para mediados del siglo trece, la biblioteca guardaba unos cuatrocientos mil volúmenes: teología, filosofía, astronomía, medicina, poesía. Eruditos de todo el mundo musulmán hacían el largo viaje hasta ese valle remoto solo para estudiar ahí. Decimos que el saber no ocupa lugar. En Alamut, el saber ocupaba una fortaleza entera."
          },
        },
      },
      {
        M: {
          text: {
            S: "Uno de esos eruditos fue Nasir al-Din al-Tusi, probablemente la mente científica más brillante del siglo trece en el mundo islámico. Vivió en Alamut más de treinta años. Ahí escribió trabajos sobre astronomía que siglos después llegarían hasta Copérnico en la Europa del Renacimiento. Usaba la biblioteca como solo puede hacerlo un genio: no solo leía, sino que conectaba ideas entre disciplinas y empujaba los límites de lo que se creía posible."
          },
        },
      },
      {
        M: {
          text: {
            S: "En 1256 llegaron los mongoles. Hulagu Khan —nieto de Gengis Khan— marchó con más de cien mil soldados montaña arriba con un solo objetivo: borrar del mapa a la comunidad que había sostenido Alamut durante casi dos siglos. El último líder, un joven llamado Rukn al-Din Khurshah, intentó negociar. Hasta empezó a derribar sus propias murallas para demostrar que se rendía. No sirvió de nada. Hulagu quería destrucción total."
          },
        },
      },
      {
        M: {
          text: {
            S: "Y aquí viene lo que más duele. Antes de que encendieran el fuego, un historiador llamado Juvayni —que viajaba con el ejército mongol— pudo caminar por la biblioteca. Era un hombre educado. Entendía perfectamente lo que estaba viendo. Salvó los Coranes. Salvó los instrumentos astronómicos. Incluso leyó la autobiografía de Hassan-i Sabbah, el único relato en primera persona de cómo se fundó Alamut. Y después prendió fuego a todo lo demás. La biblioteca ardió siete días con sus siete noches."
          },
        },
      },
      {
        M: {
          text: {
            S: "Al-Tusi sobrevivió. Cambió de bando —por traición o por instinto de supervivencia, nadie lo sabe— y se convirtió en el consejero científico de Hulagu Khan. Convenció al guerrero de construir un observatorio en Maragha, Irán, y lo llenó con cuatrocientos mil libros tomados de ciudades conquistadas. El trabajo que se produjo ahí llegaría a Copérnico siglos después. Algo de lo que vivía en la mente de al-Tusi sobrevivió al fuego. Pero solo algo."
          },
        },
      },
      {
        M: {
          text: {
            S: "Hoy, apenas un tercio de la estructura original de Alamut sobrevive como ruinas en esa misma roca de las montañas Alborz. Los arqueólogos han encontrado canales de agua que siguen funcionando después de ocho siglos. La gente volvió cuando los mongoles se fueron —siempre vuelven—. Pero la biblioteca no. Cuatrocientos mil volúmenes. Siglos de pensamiento y poesía convertidos en ceniza en una sola semana. Sabemos lo que un hombre brillante se llevó en la memoria. Lo que ardió, no lo sabremos nunca."
          },
        },
      },
    ],
  },
  moralOrLesson: { S: "Se pueden reconstruir murallas. Se pueden restaurar reinos. Pero un libro quemado no se puede des-quemar. La mayor tragedia de Alamut no es lo que se perdió. Es que nunca sabremos qué fue lo que se perdió." },
  icon: { S: "🔥" },
  tier: { S: "S" },
  storyCategory: { S: "lost_found" },
  readingTimeMinutes: { N: "7" },
  image: { S: "" },
  thumbnail: { S: "" },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  isFeatured: { BOOL: false },
  disabled: { BOOL: false },
  coordinates: {
    M: {
      lat: { N: "36.4447" },
      lng: { N: "50.5861" },
    },
  },
  era: { S: "November-December 1256 CE (Mongol destruction of Alamut)" },
  source: { S: "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); Peter Willey, Eagle's Nest: Ismaili Castles in Iran and Syria (I.B. Tauris, 2005); Encyclopaedia Iranica; Hamideh Chubak, Alamut archaeological reports (2004)" },
  characters: {
    L: [
      { S: "Nasir al-Din al-Tusi (polímata que sobrevivió a la destrucción)" },
      { S: "Hulagu Khan (comandante mongol que ordenó la destrucción)" },
      { S: "Ata-Malik Juvayni (historiador que quemó la biblioteca)" },
      { S: "Rukn al-Din Khurshah (último señor de Alamut)" },
      { S: "Hassan-i Sabbah (fundador que construyó la biblioteca)" },
    ],
  },
  updatedAt: { N: "1772123916" },
};

async function push() {
  try {
    await client.send(new PutItemCommand({ TableName: "Story", Item: item }));
    console.log("✅ Spanish story pushed successfully: es#library-burned-seven-days");
  } catch (err) {
    console.error("❌ Failed to push Spanish story:", err);
    process.exit(1);
  }
}

push();
