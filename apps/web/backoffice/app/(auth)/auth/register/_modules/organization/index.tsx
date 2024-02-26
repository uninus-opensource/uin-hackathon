'use client';
import { Button } from '@psu/web-component-atoms';
import { ControlledFieldSelect } from '@psu/web-component-organisms';
import { FC, Fragment, ReactElement } from 'react';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';
import { TRegisterOrganization } from '../register';

export const AuthRegisterOrganizationModule: FC = (): ReactElement => {
  const {
    control,
    formState: { errors, isValid },
  } = useFormContext<TRegisterOrganization>();

  const dummyOrganizations = [
    { label: 'Organisasi 1', value: 'Organisasi 1' },
    { label: 'Organisasi 2', value: 'Organisasi 2' },
    { label: 'Organisasi 3', value: 'Organisasi 3' },
    { label: 'Organisasi 4', value: 'Organisasi 4' },
    { label: 'Organisasi 5', value: 'Organisasi 5' },
  ];

  const dummyLevels = [
    { label: 'Level 1', value: 'Level 1' },
    { label: 'Level 2', value: 'Level 2' },
    { label: 'Level 3', value: 'Level 3' },
    { label: 'Level 4', value: 'Level 4' },
    { label: 'Level 5', value: 'Level 5' },
  ];

  const dummyTypes = [
    { label: 'Tipe 1', value: 'Tipe 1' },
    { label: 'Tipe 2', value: 'Tipe 2' },
    { label: 'Tipe 3', value: 'Tipe 3' },
    { label: 'Tipe 4', value: 'Tipe 4' },
    { label: 'Tipe 5', value: 'Tipe 5' },
  ];

  return (
    <Fragment>
      <Link href="/auth/register?step=personal">Kembali</Link>
      <h1
        data-testid="title"
        className="text-2xl font-bold text-black text-left"
      >
        Informasi Organisasi
      </h1>
      <section className="flex flex-col gap-y-6 mt-[18px]">
        <ControlledFieldSelect
          control={control}
          name="organizationType"
          label="Jenis Organisasi"
          size="sm"
          options={dummyTypes}
          placeholder="Pilih Jenis Organisasi"
          status={errors.organizationType ? 'error' : 'default'}
          message={errors.organizationType?.message}
        />
        <ControlledFieldSelect
          control={control}
          name="organizationLevel"
          label="Level Organisasi"
          size="sm"
          options={dummyLevels}
          placeholder="Pilih Level Organisasi"
          status={errors.organizationLevel ? 'error' : 'default'}
          message={errors.organizationLevel?.message}
        />
        <ControlledFieldSelect
          control={control}
          name="organization"
          label="Organisasi Anda"
          size="sm"
          options={dummyOrganizations}
          placeholder="Pilih Organisasi Anda"
          status={errors.organization ? 'error' : 'default'}
          message={errors.organization?.message}
        />
      </section>
      <Button disabled={!isValid} type="submit" size="lg">
        Daftar Sekarang
      </Button>
      <div className="w-full flex justify-between">
        <h1 className="font-regular text-xs sm:text-sm text-grey">
          Sudah punya akun?
        </h1>
        <Link
          href="/auth/login"
          className="font-semibold text-xs sm:text-sm underline text-primary"
        >
          Klik untuk masuk
        </Link>
      </div>
    </Fragment>
  );
};
