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
const title = 'Tira and Lydu Wedding';
const description = 'We joyfully invite you to celebrate our marriage.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Wedding Invitation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${body.variable} ${pinyon.variable} ${ethiopic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
