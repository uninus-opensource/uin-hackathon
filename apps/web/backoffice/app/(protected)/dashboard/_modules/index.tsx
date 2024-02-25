import { FC, ReactElement } from 'react';
import { DashboardWelcomeModule } from './welcome';
import {
  DashboardChartDoughnutModule,
  DashboardChartLineModule,
} from './chart';

export const DashboardModule: FC = (): ReactElement => {
  return (
    <section className="flex flex-col w-full gap-y-6 h-full">
      <DashboardWelcomeModule />
      <div className="flex gap-x-6 h-full w-full">
        <DashboardChartLineModule />
        <DashboardChartDoughnutModule />
      </div>
    </section>
  );
};
