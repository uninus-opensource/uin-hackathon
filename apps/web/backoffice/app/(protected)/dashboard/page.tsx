import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import { DashboardModules } from './_modules';

const DashboardPage: NextPage = (): ReactElement => {
  return <DashboardModules />;
};

export default DashboardPage;
