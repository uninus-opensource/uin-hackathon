import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import { AuthResetModule } from './_modules';
import { redirect } from 'next/navigation';

const AuthResetPage: NextPage = ({ searchParams }: any): ReactElement => {
  const accessToken = searchParams.accessToken as string;

  if (!accessToken) {
    redirect('/auth/login');
  }

  return (
    <section className="flex overflow-y-hidden lg:flex-row flex-col justify-center items-center w-full h-full min-h-screen">
      <div className="md:w-1/2 w-full h-full px-6 md:px-0">
        <AuthResetModule />
      </div>
    </section>
  );
};

export default AuthResetPage;
