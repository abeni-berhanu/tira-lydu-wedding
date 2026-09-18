'use client';

import { useEffect, useRef, useState } from 'react';

// id: null means "scroll to top" (Home); others match section ids in the page.
const LINKS = [
  { id: null, label: 'Home' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'notes', label: 'Notes' },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    function onScroll() {
      const cur = window.scrollY;
      if (cur > lastScroll.current && cur > 40) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = cur;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  // Scrolls to a section without touching the URL hash, so a page refresh
  // always lands back at the top instead of jumping to the last section.
  function goTo(id) {
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      <nav className={`site-nav ${hidden && !menuOpen ? 'hidden' : ''}`}>
        <span className="nav-name">T &amp; L</span>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href="#"
              onClick={(e) => { e.preventDefault(); goTo(l.id); }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" aria-label="Close menu" onClick={closeMenu}>
          CLOSE ✕
        </button>
        {LINKS.map((l) => (
          <a
            key={l.label}
            href="#"
            onClick={(e) => { e.preventDefault(); closeMenu(); goTo(l.id); }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
