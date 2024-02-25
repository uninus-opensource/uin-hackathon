'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { MdShowChart } from 'react-icons/md';
import { TLineChart } from '@psu/entities';

export const PieChart: FC<TLineChart> = ({ ...props }): ReactElement => {
  const chartRef = useRef();

  ChartJS.register(ArcElement, Tooltip, Legend);

  //   useEffect(() => {

  //   }, [chartType]);

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
      },
    },
  };

  const data = {
    labels: [
      'Kegiatan Berjalan',
      'Kegiatan Belum dilaporkan',
      'Kegiatan Sudah dilaporkan',
    ],
    datasets: [
      {
        label: 'Laporan Kegiatan',
        data: [20, 10, 30],
        backgroundColor: ['#1B81F7', '#FFB800', '#34B337'],
        hoverOffset: 4,
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
        </div>
        <div className="w-full pt-8 h-96">
          <Doughnut
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
