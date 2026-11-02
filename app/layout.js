import { Fraunces, Nunito, Pinyon_Script, Noto_Serif_Ethiopic } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const body = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

const ethiopic = Noto_Serif_Ethiopic({
  subsets: ['ethiopic'],
  weight: ['400', '600'],
  variable: '--font-ethiopic',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiraandlydu.com';
const title = 'Tira & Lydu · November 21, 2026';
const description =
  'Together with our families, we joyfully invite you to celebrate our marriage. Ethiopian Evangelical Lutheran Church, Addis Ababa.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Tira & Lydu',
    type: 'website',
    // Link preview image: the hero photo (public/images/hero-bg.jpg).
    images: [{ url: '/images/hero-bg.jpg', alt: 'Tira & Lydu' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/hero-bg.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${body.variable} ${pinyon.variable} ${ethiopic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
