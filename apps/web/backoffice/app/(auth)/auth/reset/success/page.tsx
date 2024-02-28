import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import { AuthResetSuccessModule } from '../_modules/success';

const AuthResetSuccessPage: NextPage = (): ReactElement => {
  return (
    <section className="flex overflow-y-hidden lg:flex-row flex-col justify-center items-center w-full h-full min-h-screen">
      <div className="md:w-1/2 w-full h-full px-6 md:px-0">
        <AuthResetSuccessModule />
      </div>
    </section>
  );
};

export default AuthResetSuccessPage;
