'use client';

// TODO: replace with the real bot username once created via BotFather.
const TELEGRAM_BOT_URL = 'https://t.me/tiraandlydu_bot';

export default function SharePhotos() {
  return (
    <div className="share-strip">
      <a
        className="share-cta"
        href={TELEGRAM_BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Our day, through your eyes
      </a>
      <p className="share-desc">
        Upload the photos and videos you take and share the memories with us.
        We'd love to see our wedding through your eyes!
      </p>
    </div>
  );
}
