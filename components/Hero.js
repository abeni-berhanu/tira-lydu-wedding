'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Wedding moment: November 21, 2026, 6:00 AM Ethiopian Time (EAT = UTC+3)
const TARGET = new Date('2026-11-21T06:00:00+03:00').getTime();

function getRemaining() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

export default function Hero() {
  const [remaining, setRemaining] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="hero">
      <div className="hero-bg">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '32% 45%' }}
        />
      </div>
      <div className="hero-scrim"></div>

      <div className="hero-content">
        <svg className="motif" viewBox="0 0 120 120">
          <path d="M10 60 L60 10 L110 60 L60 110 Z" />
          <path d="M60 10 L60 110 M10 60 L110 60" />
        </svg>

        <div className="hero-eyebrow">WE ARE GETTING MARRIED</div>

        <h1 className="hero-names">
          <span className="word"><span>Tira</span></span>{' '}
          <span className="word"><span>&amp; Lydu</span></span>
        </h1>

        <div className="hero-rule"></div>

        <div className="hero-venue">
          NOVEMBER 21, 2026<br />
          ETHIOPIAN EVANGELICAL LUTHERAN CHURCH · ADDIS ABABA
        </div>

        {mounted && remaining ? (
          <div className="countdown">
            <div className="unit">
              <div className="num">{pad(remaining.days)}</div>
              <div className="label">DAYS</div>
            </div>
            <div className="unit">
              <div className="num">{pad(remaining.hours)}</div>
              <div className="label">HRS</div>
            </div>
            <div className="unit">
              <div className="num">{pad(remaining.mins)}</div>
              <div className="label">MIN</div>
            </div>
            <div className="unit">
              <div className="num">{pad(remaining.secs)}</div>
              <div className="label">SEC</div>
            </div>
          </div>
        ) : mounted && !remaining ? (
          <div className="countdown">
            <div className="unit">
              <div className="num" style={{ fontSize: 'clamp(18px,2.8vw,26px)', letterSpacing: '0.04em' }}>
                TODAY IS THE DAY.
              </div>
            </div>
          </div>
        ) : (
          <div className="countdown" aria-hidden="true" />
        )}

        <a className="hero-cta" href="#rsvp">YOU ARE INVITED</a>
      </div>
    </section>
  );
}
