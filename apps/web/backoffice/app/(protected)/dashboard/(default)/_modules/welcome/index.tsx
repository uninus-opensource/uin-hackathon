'use client';
import { FC, ReactElement } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { TUser } from '@psu/entities';

export const DashboardWelcomeModule: FC = (): ReactElement => {
  const { data } = useSession();
  const user = data?.user as TUser;
  return (
    <section className="flex items-center gap-x-6 h-[170px] bg-white rounded-lg w-full px-6 py-4 shadow-md">
      <figure>
        <Image
          src={'/asset1.svg'}
          width={150}
          height={150}
          alt="Welcome"
          priority
        />
      </figure>
      <div>
        <h1 className="text-2xl font-bold ">
          Selamat Datang, {user?.organization?.name}
        </h1>
        <p className="text-base text-grey">
          Lihat perkembangan terkini, pengajuan kegiatan organisasi anda
        </p>
      </div>
    </section>
  );
};
