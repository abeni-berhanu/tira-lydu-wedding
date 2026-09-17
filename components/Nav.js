'use client';

import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { href: '#timeline', label: 'Day' },
  { href: '#place', label: 'Place' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#notes', label: 'Notes' },
  { href: '#rsvp', label: 'RSVP' },
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

  return (
    <>
      <nav className={`site-nav ${hidden && !menuOpen ? 'hidden' : ''}`}>
        <span className="nav-name">T &amp; L</span>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
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
          <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
        ))}
      </div>
    </>
  );
}
