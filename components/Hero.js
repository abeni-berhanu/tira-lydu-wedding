'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Wedding moment: November 21, 2026, 6:00 AM Ethiopian Time (EAT = UTC+3)
const TARGET = new Date('2026-11-21T06:00:00+03:00').getTime();

// Floating gold dust (fixed values so server and browser render the same).
const DUST = [
  { x: '25%', s: 6, d: 26, t: -13, dx: '36px' },
  { x: '40%', s: 6, d: 28, t: -6, dx: '15px' },
  { x: '69%', s: 4, d: 23, t: -16, dx: '-15px' },
  { x: '4%', s: 3, d: 20, t: -18, dx: '9px' },
  { x: '12%', s: 4, d: 27, t: -24, dx: '-16px' },
  { x: '33%', s: 9, d: 15, t: -13, dx: '49px' },
  { x: '56%', s: 7, d: 22, t: -1, dx: '-3px' },
  { x: '73%', s: 6, d: 26, t: -3, dx: '38px' },
  { x: '51%', s: 3, d: 17, t: -23, dx: '-34px' },
  { x: '19%', s: 3, d: 22, t: -5, dx: '25px' },
  { x: '47%', s: 6, d: 22, t: -4, dx: '-22px' },
  { x: '89%', s: 3, d: 22, t: -7, dx: '-36px' },
  { x: '29%', s: 4, d: 25, t: -21, dx: '51px' },
  { x: '78%', s: 9, d: 16, t: -3, dx: '26px' },
  { x: '64%', s: 7, d: 28, t: -12, dx: '-20px' },
  { x: '47%', s: 4, d: 23, t: -13, dx: '-8px' },
  { x: '50%', s: 6, d: 23, t: -12, dx: '-5px' },
  { x: '66%', s: 6, d: 19, t: 0, dx: '-34px' },
];

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
          style={{ objectFit: 'cover', objectPosition: '40% 60%' }}
        />
      </div>
      <div className="hero-scrim"></div>

      <div className="hero-dust" aria-hidden="true">
        {DUST.map((p, i) => (
          <span
            key={i}
            style={{ '--x': p.x, '--s': `${p.s}px`, '--d': `${p.d}s`, '--t': `${p.t}s`, '--dx': p.dx }}
          />
        ))}
      </div>

      <div className="hero-frame" aria-hidden="true"></div>

      <div className="hero-scroll" aria-hidden="true">
        <span>SCROLL</span>
        <i></i>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">WE ARE GETTING MARRIED</div>

        <h1 className="hero-names">
          <span className="word"><span>Tira</span></span>{' '}
          <span className="word"><span>&amp; Lydu</span></span>
        </h1>

        <div className="hero-ornament" aria-hidden="true"><i></i></div>

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

        <a
          className="hero-cta"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          YOU ARE INVITED
        </a>
      </div>
    </section>
  );
}
