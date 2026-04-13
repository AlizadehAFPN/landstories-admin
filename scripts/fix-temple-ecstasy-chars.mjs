// Fix incorrect Unicode characters in zh and ja versions of "The Temple of Ecstasy"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";

// Character replacements: wrong -> correct
const zhFixes = [
  ["\u814E\u5C3C\u57FA", "\u8153\u5C3C\u57FA"],   // 腎尼基 -> 腓尼基
  ["\u8DEC\u7740", "\u8DEA\u7740"],                 // 跬着 -> 跪着
  ["\u8DEB\u7740", "\u8DEA\u7740"],                 // 跫着 -> 跪着
  ["\u8DEC\u5728", "\u8DEA\u5728"],                 // 跬在 -> 跪在
  ["\u8DEB\u5728", "\u8DEA\u5728"],                 // 跫在 -> 跪在
  ["\u7591\u72C2", "\u75AF\u72C2"],                 // 疑狂 -> 疯狂
  ["\u7194\u8FC7", "\u71AC\u8FC7"],                 // 熔过 -> 熬过
  ["\u95E8\u6941", "\u95E8\u6963"],                 // 门X -> 门楣
  ["\u95E8\u6979", "\u95E8\u6963"],                 // 门楹 -> 门楣
];

const jaFixes = [
  ["\u96D9\u9593", "\u9699\u9593"],                 // 雙間 -> 隙間
  ["\u8DEB\u304F", "\u8DEA\u304F"],                 // X く -> 跪く
  ["\u8DEC\u304F", "\u8DEA\u304F"],                 // 跬く -> 跪く
  ["\u8F9F\u308A\u7740", "\u8FBF\u308A\u7740"],    // 辟り着 -> 辿り着
];

function applyFixes(item, fixes) {
  const json = JSON.stringify(item);
  let fixed = json;
  for (const [wrong, correct] of fixes) {
    if (fixed.includes(wrong)) {
      console.log(`  Fixing: "${wrong}" (${[...wrong].map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase()).join(' ')}) -> "${correct}"`);
      fixed = fixed.split(wrong).join(correct);
    }
  }
  return JSON.parse(fixed);
}

async function fixRecord(langStoryId, fixes, label) {
  console.log(`\n--- ${label} ---`);

  const { Item } = await doc.send(new GetCommand({
    TableName: TABLE,
    Key: { siteId: "baalbek", langStoryId },
  }));

  if (!Item) {
    console.error(`Record not found: ${langStoryId}`);
    return;
  }

  const fixed = applyFixes(Item, fixes);
  fixed.updatedAt = Math.floor(Date.now() / 1000);

  await doc.send(new PutCommand({ TableName: TABLE, Item: fixed }));
  console.log(`\u2705 ${label} fixed and pushed successfully`);
}

(async () => {
  await fixRecord("zh#temple-of-ecstasy", zhFixes, "Chinese (zh)");
  await fixRecord("ja#temple-of-ecstasy", jaFixes, "Japanese (ja)");
  console.log("\nAll fixes applied.");
})();
