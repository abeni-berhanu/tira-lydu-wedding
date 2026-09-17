'use client';

import { useEffect, useRef } from 'react';

const EVENTS = [
  {
    time: '8:00 AM',
    title: 'Groom & Bride Houses',
    desc: "Morning photo sessions at both groom's and bride's houses.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 18h16M6 18V9l6-4 6 4v9" />
        <path d="M10 18v-5h4v5" />
      </svg>
    ),
  },
  {
    time: '11:30 AM',
    title: "Bride's House",
    desc: "Guests gather and move to the bride's house.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="8" cy="9" r="2.5" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 19c0-2.8 2.2-5 5-5s5 2.2 5 5M11 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      </svg>
    ),
  },
  {
    time: '1:45 PM',
    title: 'Church Ceremony',
    desc: 'Holy matrimony ceremony at the church.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2v4M10 4h4" />
        <path d="M6 21V11l6-5 6 5v10" />
        <path d="M10 21v-6h4v6" />
      </svg>
    ),
  },
  {
    time: '4:00 PM',
    title: 'Dinner & Cake',
    desc: 'Dinner program, cake cutting and worship at Mekonenoch Hall.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 21h16v-6a3 3 0 00-3-3H7a3 3 0 00-3 3v6z" />
        <path d="M12 8V5M12 5c-1 0-1.5-.8-1.5-1.5S11 2 12 2s1.5.8 1.5 1.5S13 5 12 5z" />
      </svg>
    ),
  },
];

export default function Timeline() {
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.4 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));

    let rafId = null;
    function updateLine() {
      rafId = null;
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!track || !fill) return;
      const rect = track.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.65;
      const scrolled = triggerPoint - rect.top;
      const progress = Math.min(Math.max(scrolled / rect.height, 0), 1);
      fill.style.height = `${progress * 100}%`;
    }
    function onScroll() {
      if (rafId == null) rafId = requestAnimationFrame(updateLine);
    }
    updateLine();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="timeline-section" id="timeline">
      <div className="section-header">
        <div className="accent">The Day Unfolds</div>
        <h2>Wedding Timeline</h2>
        <div className="rule"></div>
      </div>

      <div className="timeline-track" ref={trackRef}>
        <div className="timeline-line-bg"></div>
        <div className="timeline-line-fill" ref={fillRef}></div>

        {EVENTS.map((ev, i) => (
          <div
            className="timeline-item"
            key={ev.time}
            ref={(el) => (itemRefs.current[i] = el)}
          >
            <div className="timeline-icon">{ev.icon}</div>
            <div className="timeline-time">{ev.time}</div>
            <div className="timeline-title">{ev.title}</div>
            <div className="timeline-desc">{ev.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
