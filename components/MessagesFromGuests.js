'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Marquee settings: the speed is constant (pixels per second), so it no
// longer depends on how many messages there are.
const CARD_W = 260;
const GAP = 20;
// Scroll speed in pixels per second. Lower number = slower.
const SPEED_PHONE = 14;
const SPEED_DESKTOP = 23;

function MessageCard({ text, from, onOpen }) {
  const textRef = useRef(null);
  const [cut, setCut] = useState(false);

  // True when the text is longer than the card, so a "Read more" link is needed.
  useEffect(() => {
    const el = textRef.current;
    if (el && onOpen) setCut(el.scrollHeight > el.clientHeight + 1);
  }, [text, onOpen]);

  const open = cut ? () => onOpen({ text, from }) : undefined;

  return (
    <div
      className={`message-card ${cut ? 'is-cut' : ''}`}
      onClick={open}
      onKeyDown={open ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } } : undefined}
      role={open ? 'button' : undefined}
      tabIndex={open ? 0 : undefined}
    >
      <div className="message-text" ref={textRef}>“{text}”</div>
      <div className="message-foot">
        <span className="message-from">{from}</span>
        {cut && <span className="message-more">Read more</span>}
      </div>
    </div>
  );
}

export default function MessagesFromGuests() {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marquee, setMarquee] = useState({ copies: 1, duration: 40 });
  const [inView, setInView] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('guestbook_messages')
        .select('name, message, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!cancelled) {
        if (!error && data) {
          setMessages(data.map((m) => ({ text: m.message, from: m.name })));
        }
        setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!messages.length) return;
    function calc() {
      const speed = window.innerWidth < 640 ? SPEED_PHONE : SPEED_DESKTOP;
      const setWidth = messages.length * (CARD_W + GAP);
      // Repeat the set until it is wider than the screen, so there is never a gap.
      const copies = Math.max(1, Math.ceil((window.innerWidth * 1.5) / setWidth));
      const duration = Math.round(((copies * setWidth) / speed) * 10) / 10;
      // Phones fire resize when the address bar hides; skip if nothing changed.
      setMarquee((prev) => (prev.copies === copies && prev.duration === duration ? prev : { copies, duration }));
    }
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [messages.length]);

  // Only run the scrolling while the strip is on screen. Phones can drop the
  // drawing of an animation that has been running off screen for a long time,
  // which made the notes look empty when you finally scrolled down to them.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '150px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [messages.length]);

  const track = Array.from({ length: marquee.copies * 2 }).flatMap(() => messages);

  return (
    <section className="messages-section" id="notes">
      <div className="messages-inner">
        <div className="messages-eyebrow">Shared With Love</div>
        <h2 className="messages-heading">Messages From Guests</h2>
        <div className="messages-rule"></div>
      </div>

      {loading ? null : messages.length === 0 ? (
        <div className="messages-inner">
          <p style={{ textAlign: 'center', fontSize: 13, color: '#8a8377' }}>
            No messages yet. Be the first to leave a wish above.
          </p>
        </div>
      ) : (
        <>
          <div className="messages-marquee-wrap" ref={wrapRef}>
            <div
              className={`messages-marquee ${inView ? '' : 'is-paused'}`}
              style={{ animationDuration: `${marquee.duration}s` }}
            >
              {/* The set is repeated an even number of times so the -50% loop is seamless */}
              {track.map((m, i) => (
                <MessageCard key={i} text={m.text} from={m.from} onOpen={setActive} />
              ))}
            </div>
          </div>

          <div className="messages-inner">
            <button className="messages-show-all" onClick={() => setShowAll(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.7 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>
              SHOW ALL MESSAGES
            </button>
          </div>
        </>
      )}

      {active && (
        <div className="messages-modal-overlay" onClick={() => setActive(null)}>
          <div className="messages-modal message-single" onClick={(e) => e.stopPropagation()}>
            <button className="messages-modal-close" onClick={() => setActive(null)}>
              CLOSE ✕
            </button>
            <div className="message-single-text">“{active.text}”</div>
            <div className="message-single-from">{active.from}</div>
          </div>
        </div>
      )}

      {showAll && (
        <div className="messages-modal-overlay" onClick={() => setShowAll(false)}>
          <div className="messages-modal messages-modal-all" onClick={(e) => e.stopPropagation()}>
            <div className="messages-modal-head">
              <h3 className="messages-modal-heading">All Messages</h3>
              <button className="messages-modal-close" onClick={() => setShowAll(false)}>
                CLOSE ✕
              </button>
            </div>
            <ul className="messages-list">
              {messages.map((m, i) => (
                <li className="messages-list-item" key={i}>
                  <p className="messages-list-text">“{m.text}”</p>
                  <span className="messages-list-from">{m.from}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
