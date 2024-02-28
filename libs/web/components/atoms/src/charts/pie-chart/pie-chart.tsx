'use client';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FC, ReactElement, useRef } from 'react';
import { TChartResponse } from '@psu/entities';

export const PieChart: FC<TChartResponse> = ({ ...props }): ReactElement => {
  const chartRef = useRef();

  ChartJS.register(ArcElement, Tooltip, Legend, ...registerables);


  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
      
      </div>
      <div className="w-full pt-8 h-96">
        <Doughnut
          ref={chartRef}
          datasetIdKey="id"
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                align: 'start',
                labels: { boxWidth: 40, boxHeight: 20, padding: 15 },
              },
            },
          }}
          data={props.data}
        />
      </div>
    </div>
  );
};
