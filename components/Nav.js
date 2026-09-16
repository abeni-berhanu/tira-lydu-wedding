'use client';

import { useEffect, useRef, useState } from 'react';

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    function onScroll() {
      const cur = window.scrollY;
      if (cur > lastScroll.current && cur > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = cur;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`site-nav ${hidden ? 'hidden' : ''}`}>
      <span className="nav-name">Tira & Lydu</span>
      <div className="nav-links">
        <a href="#day">Day</a>
        <a href="#place">Place</a>
        <a href="#gallery">Gallery</a>
        <a href="#notes">Notes</a>
        <a href="#rsvp">RSVP</a>
      </div>
    </nav>
  );
}
