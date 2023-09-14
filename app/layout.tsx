import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import StyledJsxRegistry from './registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js head starter kit with gluestack-ui',
  description: 'A comprehensive starter kit to kick-start your next.js application using gluestack-ui - your one-stop solution for faster, smoother, and better web development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="gs">
      <body className={inter.className}>
        <Providers>
          <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </Providers>
      </body>
    </html>
  );
}
