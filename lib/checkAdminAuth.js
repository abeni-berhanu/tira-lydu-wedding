import { cookies } from 'next/headers';

export function isAdminAuthed() {
  const session = cookies().get('admin_session')?.value;
  return Boolean(process.env.ADMIN_PASSWORD) && session === process.env.ADMIN_PASSWORD;
}
