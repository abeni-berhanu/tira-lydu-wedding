'use client';

import { useEffect, useRef } from 'react';

export default function OurWeddingDay() {
  const statementRef = useRef(null);
  const subRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const els = [statementRef.current, subRef.current, dividerRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.3 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="day-section" id="day">
      <div className="day-inner">
        <div className="day-eyebrow">OUR WEDDING DAY</div>
        <p className="day-statement" ref={statementRef}>
          Two people, two stories, one beginning.
        </p>
        <p className="day-sub" ref={subRef}>
          On the 21st of November, in Addis Ababa, our families become one. What
          began quietly between two people becomes, for one day, a celebration
          shared by everyone we love.
        </p>
        <div className="divider-line" ref={dividerRef}></div>
      </div>
    </section>
  );
}
