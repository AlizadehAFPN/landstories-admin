import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `Under Budapest's Buda Castle, there's a maze of caves and tunnels — carved by underground rivers over millions of years, then expanded by people across centuries. Today, tourists stroll through with mood lighting and audio guides, snapping photos in the dim glow. What most of them don't realize is that one of the most terrifying men who ever lived once called these tunnels home.`,
  },
  {
    text: `His name was Vlad III — ruler of Wallachia, a small kingdom in what's now southern Romania. His father had been made a member of the Order of the Dragon, a Christian military brotherhood sworn to fight the Ottoman Turks. That earned his father the nickname Dracul — "the Dragon." Which made Vlad literally Dracula: the Dragon's Son. But the world would come to know him by a much darker name — Vlad the Impaler.`,
  },
  {
    text: `In 1462, Vlad's own ally — King Matthias Corvinus of Hungary — had him arrested. Why would a king turn on his fiercest warrior against the Ottomans? Maybe Vlad's extreme methods were becoming a political headache. Maybe Matthias wanted someone easier to control on Wallachia's throne. Whatever the reason, the Impaler was hauled to Buda and locked beneath the castle.`,
  },
  {
    text: `Here's the strange part — it wasn't a dungeon. Vlad was royalty, after all, so he was given comfortable chambers, servants, even books. He could walk certain sections of the tunnels freely. But armed guards stood at every exit. For twelve years, it was a gilded cage. Not quite torture. Not quite freedom. Just... waiting.`,
  },
  {
    text: `But Vlad couldn't just sit still. According to people who were actually there, he started catching rats and impaling them on tiny wooden sticks. Then spiders. Then birds the guards brought him. The man who'd ordered tens of thousands of real people onto real wooden stakes couldn't stop — even when his whole kingdom shrank to a set of underground rooms. Some habits aren't habits. They're who you are.`,
  },
  {
    text: `Think about that for a second. Twelve years underground. Outside those walls, empires clashed. The Ottoman Turks pushed deeper into Europe. Matthias fought wars, signed treaties, built one of the finest Renaissance courts right above Vlad's head. And the Impaler just sat there in the half-dark, sharpening sticks. Waiting for the world to need a monster again.`,
  },
  {
    text: `Eventually, Vlad played the long game. He converted from Orthodox Christianity to Catholicism — the price of freedom in fifteenth-century Hungary. He married a noblewoman connected to the royal family. By 1476, Matthias finally let him go and backed his return to the Wallachian throne. Vlad got it back. He held it for roughly two months. Then he was killed in battle. The Dragon's Son died the way he lived — violently.`,
  },
  {
    text: `Those chambers are still down there, deep under Buda Castle. Tour guides point them out, casually mentioning "a Wallachian prince" who once stayed here — they keep it vague. But if you know the full story, if you know what Vlad did in those rooms with his tiny sticks and his collection of dead things, the tunnels feel different. Darker. Like something down there never really left.`,
  },
];

const excerpt = `Under Budapest's Buda Castle, there's a maze of caves and tunnels — carved by underground rivers over millions of years, then expanded by people across centuries.`;

try {
  const result = await docClient.send(
    new UpdateCommand({
      TableName: 'Story',
      Key: {
        siteId: 'buda-castle',
        langStoryId: 'en#dracula-prisoner',
      },
      UpdateExpression: 'SET paragraphs = :p, excerpt = :e, updatedAt = :u',
      ExpressionAttributeValues: {
        ':p': paragraphs,
        ':e': excerpt,
        ':u': Math.floor(Date.now() / 1000),
      },
      ReturnValues: 'ALL_NEW',
    })
  );

  console.log('✅ Updated successfully!\n');
  console.log('Title:', result.Attributes.title);
  console.log('Paragraphs:', result.Attributes.paragraphs.length);
  console.log('Excerpt:', result.Attributes.excerpt);
  console.log('\n--- Full paragraphs ---');
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`\nP${i + 1} (${p.text.length} chars, ${p.text.split(/\s+/).length} words):`);
    console.log(p.text);
  });
} catch (err) {
  console.error('❌ Failed to update:', err.message);
  process.exit(1);
}
