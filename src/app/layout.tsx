import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pokémon Finder',
  description: 'Discover and explore your favorite Pokémon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}