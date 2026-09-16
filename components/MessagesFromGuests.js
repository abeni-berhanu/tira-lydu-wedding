'use client';

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

export default function MessagesFromGuests() {
  return (
    <section className="messages-section">
      <div className="messages-inner">
        <div className="messages-eyebrow">MESSAGES FROM GUESTS</div>
        <div className="messages-grid">
          {MESSAGES.map((m, i) => (
            <div className="message-card" key={i}>
              “{m.text}”
              <div className="message-from">— {m.from}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
