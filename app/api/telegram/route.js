import { NextResponse } from 'next/server';

// Telegram bot webhook. Guests send photos and videos to the bot, and it
// copies each one into a private Telegram group that only the couple can see.
// Nothing is stored on this site, so there is no storage to manage.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const GROUP_ID = process.env.TELEGRAM_GROUP_CHAT_ID;

const WELCOME =
  "Welcome to Tira & Lydu's wedding photo album.\n\n" +
  'Send me the photos and videos you take on the day and I will pass them straight to the couple. ' +
  'You can send as many as you like.\n\n' +
  'Tip: to keep the full quality, choose "File" instead of "Photo" when you attach them.\n\n' +
  "We'd love to see our wedding through your eyes!";

const NUDGE = 'Send me your photos and videos and I will pass them to Tira & Lydu.';

async function tg(method, body) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json().catch(() => ({ ok: false }));
}

function senderLabel(from) {
  if (!from) return 'A guest';
  const name = [from.first_name, from.last_name].filter(Boolean).join(' ').trim();
  const handle = from.username ? ` (@${from.username})` : '';
  return `${name || 'A guest'}${handle}`;
}

function hasMedia(m) {
  return Boolean(m.photo || m.video || m.document || m.video_note || m.animation);
}

export async function POST(request) {
  if (!TOKEN || !SECRET || !GROUP_ID) {
    return NextResponse.json({ ok: false, error: 'Bot is not configured' }, { status: 500 });
  }
  // Only accept requests that really come from Telegram.
  if (request.headers.get('x-telegram-bot-api-secret-token') !== SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let update;
  try {
    update = await request.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const msg = update.message;
  if (!msg || msg.chat?.type !== 'private') return NextResponse.json({ ok: true });

  const chatId = msg.chat.id;

  if (typeof msg.text === 'string') {
    const isStart = msg.text.startsWith('/start') || msg.text.startsWith('/help');
    await tg('sendMessage', { chat_id: chatId, text: isStart ? WELCOME : NUDGE });
    return NextResponse.json({ ok: true });
  }

  if (hasMedia(msg)) {
    const label = `From ${senderLabel(msg.from)}`;
    const caption = msg.caption ? `${label}\n${msg.caption}` : label;
    const copied = await tg('copyMessage', {
      chat_id: GROUP_ID,
      from_chat_id: chatId,
      message_id: msg.message_id,
      caption,
    });

    if (copied.ok) {
      // A quiet heart reaction instead of a reply, so albums don't flood the chat.
      const reacted = await tg('setMessageReaction', {
        chat_id: chatId,
        message_id: msg.message_id,
        reaction: [{ type: 'emoji', emoji: '❤' }],
      });
      if (!reacted.ok && !msg.media_group_id) {
        await tg('sendMessage', { chat_id: chatId, text: 'Thank you! Your photo is with Tira & Lydu.' });
      }
    } else {
      await tg('sendMessage', {
        chat_id: chatId,
        text: 'Sorry, that one did not go through. Please try sending it again.',
      });
    }
    return NextResponse.json({ ok: true });
  }

  await tg('sendMessage', { chat_id: chatId, text: NUDGE });
  return NextResponse.json({ ok: true });
}

// Opening the URL in a browser just confirms the route exists.
export async function GET() {
  return NextResponse.json({ ok: true, service: 'telegram-webhook' });
}
