'use client';

// TODO: replace with the real bot username once created via BotFather.
const TELEGRAM_BOT_URL = 'https://t.me/tiraandlydu_bot';

export default function SharePhotos() {
  return (
    <div className="share-strip">
      <p className="share-sub">You capture it. We keep it.</p>
      <a
        className="share-cta"
        href={TELEGRAM_BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        SHARE YOUR PHOTOS →
      </a>
    </div>
  );
}
