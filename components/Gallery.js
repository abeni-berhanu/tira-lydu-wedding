'use client';

import { useEffect, useRef, useState } from 'react';

// Placeholder images — replace src with real engagement/wedding photography.
// Varied heights via picsum's fixed seeds create the masonry effect.
const PHOTOS = [
  { src: 'https://picsum.photos/seed/tl01/700/900', caption: 'Engagement, Entoto Hills' },
  { src: 'https://picsum.photos/seed/tl02/700/560', caption: 'Addis Ababa' },
  { src: 'https://picsum.photos/seed/tl03/700/820', caption: 'Coffee ceremony' },
  { src: 'https://picsum.photos/seed/tl04/700/700', caption: '' },
  { src: 'https://picsum.photos/seed/tl05/700/960', caption: 'Golden hour' },
  { src: 'https://picsum.photos/seed/tl06/700/600', caption: 'Together' },
  { src: 'https://picsum.photos/seed/tl07/700/880', caption: '' },
  { src: 'https://picsum.photos/seed/tl08/700/640', caption: 'The proposal' },
  { src: 'https://picsum.photos/seed/tl09/700/760', caption: '' },
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.15 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function close() { setOpenIndex(null); }
  function prev(e) { e.stopPropagation(); setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length); }
  function next(e) { e.stopPropagation(); setOpenIndex((i) => (i + 1) % PHOTOS.length); }

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-watermark" aria-hidden="true">Gallery</div>
      <div className="gallery-inner">
        <div className="section-header" style={{ maxWidth: '100%' }}>
          <div className="gallery-eyebrow">Wedding Gallery</div>
          <h2 className="gallery-heading">Moments before the day.</h2>
          <div className="rule"></div>
        </div>

        <div className="masonry">
          {PHOTOS.map((photo, i) => (
            <div
              className="masonry-item"
              key={photo.src}
              ref={(el) => (itemRefs.current[i] = el)}
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              onClick={() => setOpenIndex(i)}
            >
              <img src={photo.src} alt={photo.caption || 'Wedding gallery photo'} loading="lazy" />
              {photo.caption && <div className="masonry-caption">{photo.caption}</div>}
            </div>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <div className="lightbox-overlay" onClick={close}>
          <button className="lightbox-close" onClick={close}>CLOSE ✕</button>
          <button className="lightbox-nav prev" onClick={prev}>‹</button>
          <img className="lightbox-img" src={PHOTOS[openIndex].src} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-nav next" onClick={next}>›</button>
        </div>
      )}
    </section>
  );
}
