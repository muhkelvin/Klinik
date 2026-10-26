import { cookies } from 'next/headers';

const DEMO_EMAIL = process.env.ADMIN_EMAIL || 'admin@klinikdemo.com';
const DEMO_PASSWORD = process.env.ADMIN_PASSWORD || 'klinikdemo2026';
const SESSION_COOKIE_NAME = 'klinik_admin_session';

export async function verifyAdminCredentials(email: string, pass: string): Promise<boolean> {
  return email.trim().toLowerCase() === DEMO_EMAIL.toLowerCase() && pass === DEMO_PASSWORD;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, 'authenticated_' + Date.now(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return Boolean(session?.value?.startsWith('authenticated_'));
}

export function getDemoCredentialsInfo() {
  return {
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  };
}
