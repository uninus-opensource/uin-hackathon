'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { MdShowChart } from 'react-icons/md';
import { InputSelect } from '../..';
import { optionsMonth, optionStatus } from '../store';
import { TLineChart } from '@psu/entities';

export const LineChart: FC<TLineChart> = ({ ...props }): ReactElement => {
  const chartRef = useRef();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const [chartType, setChartType] = useState<string>(props.chartType);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    setLabels(['Minggu-1', 'Minggu-2', 'Minggu-3', 'Minggu-4']);
  }, [chartType]);

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Kegiatan Diajukan',
        backgroundColor: '#AFFFD4',
        borderColor: '#AFFFD4',
        pointBackgroundColor: '#AFFFD4',
        pointBorderColor: '#02E56D',
        pointBorderWidth: 2,
        data: [20, 10, 5, 15],
        tention: 0.2,
      },
      {
        label: 'Kegiatan Disetujui',
        backgroundColor: '#FFF986',
        borderColor: '#FFF986',
        pointBorderColor: '#F8BF02',
        pointBorderWidth: 2,
        data: [5, 10, 12, 7],
        pointBackgroundColor: '#FFF986',
        tention: 0.2,
      },
      {
        label: 'Kegiatan Ditolak',
        backgroundColor: '#FFCDA8',
        borderColor: '#FFCDA8',
        pointBorderColor: '#FF601C',
        pointBorderWidth: 2,
        pointBackgroundColor: '#FFCDA8',
        data: [4, 9, 15, 10],
        tention: 0.2,
      },
    ],
  };
  return (
    <section>
      <div className="w-full rounded-lg bg-white p-4 my-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <h1 className="text-xl font-semibold ">{props.title}</h1>
          </div>
          <div className="flex items-center gap-x-2">
            <InputSelect
              options={optionsMonth}
              placeholder="Semua"
              size="lg"
              onChange={(e) => setChartType(e)}
            />
            <InputSelect
              options={optionStatus}
              placeholder="Semua"
              size="lg"
              onChange={(e) => setChartType(e)}
            />
          </div>
        </div>
        <div className="w-full pt-8 h-96">
          <Line
            ref={chartRef}
            datasetIdKey="id"
            options={options}
            data={props.data || data}
          />
        </div>
      </div>
    </section>
  );
};
