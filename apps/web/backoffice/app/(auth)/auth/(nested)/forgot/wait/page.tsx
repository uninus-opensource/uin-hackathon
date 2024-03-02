import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import { AuthForgotWaitModule } from '../_modules/wait';

const AuthForgotWaitPage: NextPage = (): ReactElement => {
  return <AuthForgotWaitModule />;
};

export default AuthForgotWaitPage;
