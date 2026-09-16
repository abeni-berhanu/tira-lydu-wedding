'use client';

// TODO: replace with the real bot username once created via BotFather.
const TELEGRAM_BOT_URL = 'https://t.me/tiraandlydu_bot';

export default function SharePhotos() {
  return (
    <section className="share-section">
      <div className="share-eyebrow">SHARE YOUR MOMENTS</div>
      <h2 className="share-statement">You capture it.<br />We keep it.</h2>
      <p className="share-sub">Send us your photos and videos from the day — straight to Telegram.</p>
      <a
        className="share-cta"
        href={TELEGRAM_BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        SHARE YOUR PHOTOS →
      </a>
    </section>
  );
}
