'use client';

import { useEffect, useRef } from 'react';

const EVENTS = [
  {
    time: '8:00 AM',
    title: 'GROOM & BRIDE HOUSES',
    desc: "Morning photo sessions at both groom's and bride's houses.",
  },
  {
    time: '11:30 AM',
    title: "BRIDE'S HOUSE",
    desc: "Guests gather and move to the bride's house.",
  },
  {
    time: '1:45 PM',
    title: 'CHURCH CEREMONY',
    desc: 'Holy matrimony ceremony at the church.',
  },
  {
    time: '4:00 PM',
    title: 'DINNER & CAKE',
    desc: 'Dinner program, cake cutting and worship at Mekonenoch Hall.',
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
      <div className="timeline-inner">
        <div className="timeline-eyebrow">THE DAY UNFOLDS</div>
        <div className="timeline-track" ref={trackRef}>
          <div className="timeline-line-bg"></div>
          <div className="timeline-line-fill" ref={fillRef}></div>

          {EVENTS.map((ev, i) => (
            <div
              className="timeline-item"
              key={ev.time}
              ref={(el) => (itemRefs.current[i] = el)}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-time">{ev.time}</div>
              <div className="timeline-title">{ev.title}</div>
              <div className="timeline-desc">{ev.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
