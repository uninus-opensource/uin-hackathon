import 'tailwindcss/tailwind.css';
import { WebAuthProvider } from '@psu/web-auth';
import { Montserrat } from 'next/font/google';

export const metadata = {
  title: 'PSU',
  description: 'PSU',
  keywords: [
    'boilerplate',
    'NextJS14',
    'NodeJS',
    'Frontend',
    'React',
    'TRPC',
    'Drizzle',
    'NX',
    'TailwindCSS',
  ],
};

const montserrat = Montserrat({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <WebAuthProvider>{children}</WebAuthProvider>
      </body>
    </html>
  );
}
