'use client';

import { useEffect, useRef } from 'react';

export default function OurWeddingDay() {
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="invite-section" id="day">
      <div className="invite-inner" ref={innerRef}>
        <h2 className="invite-heading">Dear Family &amp; Friends</h2>

        <p className="invite-quote">
          "Two are better than one, because they have a good reward for their toil."
        </p>
        <p className="invite-citation">Ecclesiastes 4:9</p>

        <p className="invite-body">
          Together with our families, we joyfully invite you to celebrate our
          marriage on <strong>November 21, 2026</strong>. The ceremony will be
          held at the <strong>Ethiopian Evangelical Lutheran Church</strong>,
          Addis Ababa, from <strong>1:45 PM</strong>.
        </p>

        <p className="invite-closing">
          We would be honored to have you share this day with us.
        </p>

        <div className="invite-ring">💍</div>
      </div>
    </section>
  );
}
