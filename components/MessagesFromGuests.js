'use client';

import { useState } from 'react';

// TODO: replace with real approved messages fetched from Supabase
// (status = 'approved'), ordered newest first.
const MESSAGES = [
  { text: 'Wishing you both a lifetime of love and happiness. So excited to celebrate with you!', from: 'Sarah' },
  { text: 'From two stories to one — what a beautiful thing to witness.', from: 'Daniel & Hana' },
  { text: 'Tira & Lydu, may your home always be full of laughter.', from: 'Bethlehem' },
  { text: 'Counting down the days! See you in Addis.', from: 'Marcus' },
  { text: "Watching you two find each other has been one of my favorite things.", from: 'Selam' },
  { text: 'Congratulations to the most patient, kind couple I know.', from: 'Yonas' },
];

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

  return (
    <section className="messages-section">
      <div className="messages-inner">
        <div className="messages-eyebrow">Shared With Love</div>
        <h2 className="messages-heading">Messages From Guests</h2>
        <div className="messages-rule"></div>
      </div>

      <div className="messages-marquee-wrap">
        <div className="messages-marquee">
          {/* Rendered twice back-to-back so the CSS loop (-50%) is seamless */}
          {[...MESSAGES, ...MESSAGES].map((m, i) => (
            <MessageCard key={i} text={m.text} from={m.from} />
          ))}
        </div>
      </div>

      <div className="messages-inner">
        <button className="messages-show-all" onClick={() => setShowAll(true)}>
          SHOW ALL MESSAGES
        </button>
      </div>

      {showAll && (
        <div className="messages-modal-overlay" onClick={() => setShowAll(false)}>
          <div className="messages-modal" onClick={(e) => e.stopPropagation()}>
            <button className="messages-modal-close" onClick={() => setShowAll(false)}>
              CLOSE ✕
            </button>
            <h3 className="messages-modal-heading">All Messages</h3>
            <div className="messages-modal-grid">
              {MESSAGES.map((m, i) => (
                <MessageCard key={i} text={m.text} from={m.from} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
