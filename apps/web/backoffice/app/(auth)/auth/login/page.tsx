import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import { AuthLoginModule } from './_modules';

const AuthLoginPage: NextPage = (): ReactElement => {
  return (
    <section className="flex overflow-y-hidden lg:flex-row flex-col gap-y-5 lg:justify-between justify-center items-center w-full h-full min-h-screen">
      <div className=" hidden w-1/2 lg:flex flex-col justify-center item-center lg:items-start gap-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-black md:text-left text-center">
          Organization Support HUB
        </h1>
        <h2 className="text-1xl md:text-2xl font-medium text-black text-center md:text-left">
          Thats All ORMAWA NEEDS
        </h2>
      </div>
      <div className="md:w-1/2 w-full h-full px-6 md:px-0">
        <AuthLoginModule />
      </div>
    </section>
  );
};

export default AuthLoginPage;
