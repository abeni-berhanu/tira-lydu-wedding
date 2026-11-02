// One-time helper for the Telegram photo bot.
//
//   node --env-file=.env.local scripts/telegram.mjs find-group
//   node --env-file=.env.local scripts/telegram.mjs setup
//
// find-group: lists the chats the bot has seen, so you can copy your private
//             group's id into TELEGRAM_GROUP_CHAT_ID. Run it BEFORE "setup".
// setup:      points Telegram at your site and sets the bot's intro text.

const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tiraandlydu.com').replace(/\/$/, '');

if (!token) {
  console.error('Missing TELEGRAM_BOT_TOKEN in .env.local');
  process.exit(1);
}

async function tg(method, body = {}) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

const command = process.argv[2];

if (command === 'find-group') {
  const r = await tg('getUpdates');
  if (!r.ok) {
    console.error('Telegram said:', r.description);
    console.error('If you already ran "setup", Telegram sends updates to the website instead. Send a new message in the group and check the bot is a member.');
    process.exit(1);
  }
  const seen = new Map();
  for (const u of r.result) {
    const chat = (u.message || u.my_chat_member || u.channel_post || {}).chat;
    if (chat) seen.set(chat.id, `${chat.type}  ${chat.title || chat.first_name || ''}`);
  }
  if (!seen.size) {
    console.log('No chats found yet. Add the bot to your group, send any message in the group, then run this again.');
  }
  for (const [id, label] of seen) console.log(`${id}   ${label}`);
} else if (command === 'setup') {
  if (!secret) {
    console.error('Missing TELEGRAM_WEBHOOK_SECRET in .env.local');
    process.exit(1);
  }
  const hook = await tg('setWebhook', {
    url: `${site}/api/telegram`,
    secret_token: secret,
    allowed_updates: ['message'],
    drop_pending_updates: true,
  });
  console.log('setWebhook:', hook.ok ? 'ok' : hook.description);
  await tg('setMyShortDescription', {
    short_description: "Share your photos and videos from Tira & Lydu's wedding.",
  });
  await tg('setMyDescription', {
    description:
      "Share your photos and videos from Tira & Lydu's wedding. Tap Start, then send them here. We'd love to see our wedding through your eyes!",
  });
  await tg('setMyCommands', { commands: [{ command: 'start', description: 'How to share your photos' }] });
  const info = await tg('getWebhookInfo');
  console.log('Webhook URL:', info.result?.url || '(none)');
} else {
  console.log('Usage: node --env-file=.env.local scripts/telegram.mjs [find-group|setup]');
}
