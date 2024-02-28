'use client';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { FaDesktop } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const sidebarMenu = [
  {
    name: 'Dashboard',
    icon: <FaDesktop />,
    path: '/dashboard',
    active: true,
  },

  {
    name: 'Pengajuan',
    icon: <FaDesktop />,
    path: '/dashboard/submission',
    active: false,
  },

  {
    name: 'Laporan Kegiatan',
    icon: <FaDesktop />,
    path: '/dashboard/activity',
    active: false,
  },
];

export const Sidebar: FC = (): ReactElement => {
  const pathname = usePathname();

  const className = (url: string) =>
    clsx('text-primary flex gap-x-4 hover:bg-primary-50 p-2 items-center', {
      'bg-primary-50': pathname === url,
    });

  return (
    <aside
      className={
        'min-h-screen h-full bg-white shadow-md w-1/6 flex flex-col p-4'
      }
    >
      <figure className="flex w-full">
        <figcaption className="w-full text-1xl font-semibold">
          OS Hub
        </figcaption>
      </figure>

      <ul className="mt-6 flex flex-col gap-y-1 cursor-pointer w-full">
        {sidebarMenu.map((menu) => (
          <li className={className(menu.path)}>
            {menu.icon}
            <Link className="font-medium text-[13px]" href={menu.path}>
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
