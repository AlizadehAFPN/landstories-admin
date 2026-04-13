import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const fixedParagraph7 = "Bugün Celsus Kütüphanesi Efes'in simgesidir — herkesin görmeye geldiği yapı. Her yıl milyonlarca kişi o cepheyi fotoğraflıyor; çoğu muhtemelen arkasında tarihinin en etkileyici baba-oğul hikâyelerinden birinin yattığından habersiz. Bu bina ne bir imparatora yaranmak ne de siyasi güç gösterisi için yapılmıştı. Yası tutan bir oğul, babasını onurlandırmanın en iyi yolunun dünyaya öğrenecek bir yer bırakmak olduğuna karar verdi. İki bin yıl sonra hâlâ işe yarıyor.";

const command = new UpdateItemCommand({
  TableName: "Story",
  Key: {
    siteId: { S: "ephesus" },
    langStoryId: { S: "tr#library-celsus" },
  },
  UpdateExpression: "SET paragraphs[6].#t = :val, updatedAt = :ts",
  ExpressionAttributeNames: { "#t": "text" },
  ExpressionAttributeValues: {
    ":val": { S: fixedParagraph7 },
    ":ts": { N: String(Math.floor(Date.now() / 1000)) },
  },
});

try {
  await client.send(command);
  console.log("Fixed typo in paragraph 7: fotoğralıyor → fotoğraflıyor");
} catch (err) {
  console.error("Error:", err);
  process.exit(1);
}
