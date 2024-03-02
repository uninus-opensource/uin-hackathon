import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import { AuthResetModule } from './_modules';
import { redirect } from 'next/navigation';

const AuthResetPage: NextPage = ({ searchParams }: any): ReactElement => {
  const accessToken = searchParams.accessToken as string;

  if (!accessToken) {
    redirect('/auth/login');
  }

  return <AuthResetModule />;
};

export default AuthResetPage;
