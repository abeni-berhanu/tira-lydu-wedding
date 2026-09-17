'use client';

const CHURCH_ADDRESS = '2PVV+HWW, Addis Ababa, Ethiopia';

export default function ChurchLocation() {
  const mapQuery = encodeURIComponent(CHURCH_ADDRESS);

  return (
    <section className="church-section" id="place">
      <div className="church-inner">
        <div className="church-eyebrow">The Ceremony</div>
        <h2 className="church-name">Ethiopian Evangelical Lutheran Church</h2>
        <div className="church-time">1:45 PM</div>

        <div className="church-map-wrap">
          <iframe
            title="Church location map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          className="church-cta"
          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          GET DIRECTIONS →
        </a>
      </div>
    </section>
  );
}
