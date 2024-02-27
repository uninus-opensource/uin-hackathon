import 'tailwindcss/tailwind.css';
import { WebAuthProvider } from '@psu/web-auth';
import { ReactQueryProvider } from '@psu/web-services';
import { Montserrat } from 'next/font/google';
import { FC, ReactElement } from 'react';

export const metadata = {
  title: 'OS Hub - Backoffice',
  description:
    'Organization Support HUB is a platform for organization support',
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
  icons: {
    icon: '/favicon.png',
  },
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
        <WebAuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </WebAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
