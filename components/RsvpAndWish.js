'use client';

import { useState } from 'react';

export default function RsvpAndWish() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [wish, setWish] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), attending, wish }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="note-section" id="rsvp">
      <div className="note-inner">
        <div className="note-eyebrow">RSVP</div>
        <h2 className="note-heading">Let us know you&rsquo;re coming.</h2>
        <div className="note-rule"></div>

        {!submitted ? (
          <div className="note-box">
            <form className="note-form" onSubmit={handleSubmit}>
              <div className="note-field">
                <label htmlFor="rsvp-name">Your name</label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="note-field">
                <label htmlFor="rsvp-attending">Will you be attending?</label>
                <select
                  id="rsvp-attending"
                  value={attending}
                  onChange={(e) => setAttending(e.target.value)}
                >
                  <option value="yes">Joyfully attending</option>
                  <option value="no">Regretfully declining</option>
                </select>
              </div>

              <div className="note-field">
                <label htmlFor="rsvp-wish">Leave a wish for the couple (optional)</label>
                <textarea
                  id="rsvp-wish"
                  rows={3}
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                />
              </div>

              <button type="submit" className="note-submit" disabled={submitting}>
                {submitting ? 'SENDING…' : 'CONFIRM RSVP'}
              </button>

              {error && (
                <p style={{ fontSize: 12, color: '#A65F48', marginTop: -6 }}>{error}</p>
              )}
            </form>
          </div>
        ) : (
          <div className="note-box">
            <p className="note-confirm">
              Thank you, {name} — your RSVP has been received
              {wish.trim() ? ', and your wish will appear below once approved.' : '.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
