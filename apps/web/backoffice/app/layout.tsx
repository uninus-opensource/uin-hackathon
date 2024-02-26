import 'tailwindcss/tailwind.css';
import { WebAuthProvider } from '@psu/web-auth';
import { Montserrat } from 'next/font/google';
import { FC, ReactElement } from 'react';

export const metadata = {
  title: 'PSU Backoffice',
  description: 'PSU Backoffice',
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
  weight: ['400', '700', '900', '500', '600'],
  subsets: ['latin'],
});

type TChildrenProps = {
  children: JSX.Element;
};

const RootLayout: FC<TChildrenProps> = ({ children }): ReactElement => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <WebAuthProvider>{children}</WebAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
