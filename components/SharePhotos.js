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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.6"/></svg>
        Our day, through your eyes
      </a>
      <p className="share-desc">
        Upload the photos and videos you take and share the memories with us.
        We'd love to see our wedding through your eyes!
      </p>
    </div>
  );
}
