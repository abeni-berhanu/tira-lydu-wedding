import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request) {
  if (!supabase) {
    return NextResponse.json(
      { error: 'The site is not yet connected to a database. Please try again later.' },
      { status: 503 }
    );
  }

  try {
    const { name, attending, wish } = await request.json();

    if (!name || !name.trim() || !['yes', 'no'].includes(attending)) {
      return NextResponse.json({ error: 'Name and attendance are required.' }, { status: 400 });
    }

    const { error: rsvpError } = await supabase
      .from('rsvps')
      .insert({ name: name.trim(), attending });

    if (rsvpError) throw rsvpError;

    if (wish && wish.trim()) {
      const { error: messageError } = await supabase
        .from('guestbook_messages')
        .insert({ name: name.trim(), message: wish.trim(), status: 'pending' });

      if (messageError) throw messageError;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('RSVP submission error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
