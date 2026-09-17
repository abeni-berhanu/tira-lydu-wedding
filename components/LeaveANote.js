'use client';

import { useState } from 'react';

export default function LeaveANote() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // TODO: replace with a real POST to Supabase (status: 'pending')
    // once the backend is wired up. For now this only confirms in the UI.
    console.log('New note submitted:', { name, message });

    setSubmitted(true);
    setName('');
    setMessage('');
  }

  return (
    <section className="note-section" id="notes">
      <div className="note-inner">
        <div className="note-eyebrow">Leave a Note</div>
        <h2 className="note-heading">Leave a little love for Tira & Lydu.</h2>
        <div className="note-rule"></div>

        {!submitted ? (
          <form className="note-form" onSubmit={handleSubmit}>
            <div className="note-field">
              <label htmlFor="note-name">Your name</label>
              <input
                id="note-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="note-field">
              <label htmlFor="note-message">Your message</label>
              <textarea
                id="note-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="note-submit">SEND LOVE ♡</button>
          </form>
        ) : (
          <p className="note-confirm">
            Thank you — your note has been sent and will appear below once
            Tira &amp; Lydu have had a chance to read it.
          </p>
        )}
      </div>
    </section>
  );
}
