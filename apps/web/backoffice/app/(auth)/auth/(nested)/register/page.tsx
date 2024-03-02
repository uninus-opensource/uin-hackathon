import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import { AuthRegisterModule } from './_modules';

const AuthRegisterPage: NextPage = (): ReactElement => {
  return <AuthRegisterModule />;
};

export default AuthRegisterPage;
