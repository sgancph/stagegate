import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';
import '../styles.css';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });

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
    <html lang="en" data-brand="curiosity" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
