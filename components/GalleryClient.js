'use client';

import { useEffect, useRef, useState } from 'react';

// Tile shapes, repeated in order. Mixed on purpose so the gallery has an
// uneven, editorial rhythm (all kept portrait-friendly so crops stay mild).
const SHAPES = ['2 / 3', '1 / 1', '4 / 5', '3 / 5', '1 / 1', '3 / 4', '5 / 6'];

function columnCount(width) {
  if (width >= 1000) return 4;
  if (width >= 560) return 3;
  return 2;
}

export default function GalleryClient({ photos: PHOTOS }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [cols, setCols] = useState(2);
  const itemRefs = useRef([]);

  // Pick the number of columns from the screen width. Photos are dealt out to
  // the columns in order (1st, 2nd, 3rd ... then back to the 1st), and a photo
  // never moves to another column while you scroll.
  useEffect(() => {
    function update() { setCols(columnCount(window.innerWidth)); }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const columns = Array.from({ length: cols }, () => []);
  PHOTOS.forEach((photo, i) => columns[i % cols].push({ photo, i }));

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
  }, [cols, PHOTOS]);

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
          {columns.map((col, c) => (
            <div className="masonry-col" key={c}>
              {col.map(({ photo, i }) => (
                <div
                  className="masonry-item"
                  key={photo.src}
                  ref={(el) => (itemRefs.current[i] = el)}
                  style={{ aspectRatio: SHAPES[i % SHAPES.length], transitionDelay: `${(i % 3) * 90}ms` }}
                  onClick={() => setOpenIndex(i)}
                >
                  <img src={photo.src} alt={photo.caption || 'Wedding gallery photo'} loading="lazy" />
                  {photo.caption && <div className="masonry-caption">{photo.caption}</div>}
                </div>
              ))}
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
