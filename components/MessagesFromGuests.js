'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function MessageCard({ text, from }) {
  return (
    <div className="message-card">
      “{text}”
      <div className="message-from">— {from}</div>
    </div>
  );
}

export default function MessagesFromGuests() {
  const [showAll, setShowAll] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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
            No messages yet — be the first to leave a wish above.
          </p>
        </div>
      ) : (
        <>
          <div className="messages-marquee-wrap">
            <div className="messages-marquee">
              {/* Rendered twice back-to-back so the CSS loop (-50%) is seamless */}
              {[...messages, ...messages].map((m, i) => (
                <MessageCard key={i} text={m.text} from={m.from} />
              ))}
            </div>
          </div>

          <div className="messages-inner">
            <button className="messages-show-all" onClick={() => setShowAll(true)}>
              SHOW ALL MESSAGES
            </button>
          </div>
        </>
      )}

      {showAll && (
        <div className="messages-modal-overlay" onClick={() => setShowAll(false)}>
          <div className="messages-modal" onClick={(e) => e.stopPropagation()}>
            <button className="messages-modal-close" onClick={() => setShowAll(false)}>
              CLOSE ✕
            </button>
            <h3 className="messages-modal-heading">All Messages</h3>
            <div className="messages-modal-grid">
              {messages.map((m, i) => (
                <MessageCard key={i} text={m.text} from={m.from} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
