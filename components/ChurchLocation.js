'use client';

const ADDRESS = '2PVV+HWW, Addis Ababa, Ethiopia';
const MAPS_QUERY = encodeURIComponent(ADDRESS);

export default function ChurchLocation() {
  return (
    <section className="church-section" id="place">
      <div className="church-inner">
        <div className="church-eyebrow">THE CEREMONY</div>
        <h2 className="church-name">Ethiopian Evangelical Lutheran Church</h2>
        <p className="church-detail">{ADDRESS}</p>
        <div className="church-time">1:45 PM</div>

        <div className="church-map-wrap">
          <iframe
            title="Church location map"
            src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          className="church-cta"
          href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          GET DIRECTIONS →
        </a>
      </div>
    </section>
  );
}
