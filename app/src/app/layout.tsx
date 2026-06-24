import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../styles.css';

export const metadata: Metadata = {
  title: 'Stage Gate Intelligence',
  description:
    'Stage Gate Intelligence: AI-powered stage gate reporting and quality assurance for capital investment projects.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#001B72',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-brand="curiosity">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
