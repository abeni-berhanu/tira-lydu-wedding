'use client';

import { useState } from 'react';

export default function FinalRSVP() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState('1');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    // TODO: replace with a real POST to Supabase once the backend is wired up.
    console.log('RSVP submitted:', { name, attending, guests });

    setSubmitted(true);
  }

  return (
    <section className="final-section" id="rsvp">
      <div className="final-names">Tira & Lydu</div>
      <div className="final-date">21 · 11 · 2026</div>
      <p className="final-message">
        However near or far, thank you for being part of our story. We can't
        wait to celebrate this day with you.
      </p>

      {!submitted ? (
        <div className="rsvp-box">
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="rsvp-field">
              <label htmlFor="rsvp-name">Your name</label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="rsvp-field">
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
            {attending === 'yes' && (
              <div className="rsvp-field">
                <label htmlFor="rsvp-guests">Number of guests</label>
                <input
                  id="rsvp-guests"
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            )}
            <button type="submit" className="rsvp-submit">CONFIRM RSVP</button>
          </form>
        </div>
      ) : (
        <div className="rsvp-box">
          <p className="rsvp-confirm">
            Thank you, {name} — your RSVP has been received.
          </p>
        </div>
      )}
    </section>
  );
}
