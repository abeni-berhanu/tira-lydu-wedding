'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Browsers restore the previous scroll position on refresh by default —
    // override that so the page always reopens at the Hero.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Clean up any leftover #hash from an old link/bookmark, then jump to top.
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
