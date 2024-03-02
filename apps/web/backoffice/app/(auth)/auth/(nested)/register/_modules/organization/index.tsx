'use client';
import { Button } from '@psu/web-component-atoms';
import { ControlledFieldSelect } from '@psu/web-component-organisms';
import {
  FC,
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';
import { TRegisterOrganization } from '../register';
import { useGetOrganization } from '@psu/web-modules';
import {
  EorganizationLevel,
  EorganizationType,
  TMetaErrorResponse,
  TOption,
} from '@psu/entities';

export const AuthRegisterOrganizationModule: FC<{
  errorData: TMetaErrorResponse;
}> = (props): ReactElement => {
  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useFormContext<TRegisterOrganization>();

  const [error, setError] = useState<string | undefined>(undefined);

  const { data, isLoading } = useGetOrganization({
    organizationType: watch('organizationType') || '',
    organizationLevel:
      watch('organizationType') === EorganizationType.UKM
        ? null
        : watch('organizationLevel') || '',
  });

  const organizationOption = useMemo(() => {
    return data?.data?.map((data) => ({ label: data.name, value: data.id }));
  }, [data]) as Array<TOption>;

  const organizationLevelOptions = Object.values(EorganizationLevel).map(
    (data) => ({
      label: data,
      value: data,
    })
  );

  const organizationTypeOptions = Object.values(EorganizationType).map(
    (data) => ({
      label: data,
      value: data,
    })
  );

  useEffect(() => {
    setTimeout(() => {
      setError(props?.errorData?.response?.data?.message);
    }, 5000);
  }, [props.errorData, setError, error]);

  return (
    <Fragment>
      <Link href="/auth/register?step=personal">Kembali</Link>
      <h1
        data-testid="title"
        className="text-2xl font-bold text-black text-left"
      >
        Informasi Organisasi
      </h1>
      {error && (
        <span className="text-error bg-error-50 border-error border rounded-lg p-3">
          {error}
        </span>
      )}
      <section className="flex flex-col gap-y-6 mt-[18px]">
        <ControlledFieldSelect
          control={control}
          name="organizationType"
          label="Jenis Organisasi"
          size="sm"
          options={organizationTypeOptions}
          placeholder="Pilih Jenis Organisasi"
          status={errors.organizationType ? 'error' : 'default'}
          message={errors.organizationType?.message}
        />
        {watch('organizationType') !== EorganizationType.UKM && (
          <ControlledFieldSelect
            control={control}
            name="organizationLevel"
            label="Level Organisasi"
            size="sm"
            options={organizationLevelOptions}
            placeholder="Pilih Level Organisasi"
            status={errors.organizationLevel ? 'error' : 'default'}
            message={errors.organizationLevel?.message}
          />
        )}

        <ControlledFieldSelect
          control={control}
          name="organization"
          label="Organisasi Anda"
          size="sm"
          isSearchable
          options={organizationOption}
          placeholder="Pilih Organisasi Anda"
          status={errors.organization ? 'error' : 'default'}
          message={errors.organization?.message}
        />
      </section>
      <Button disabled={!isValid || isLoading} type="submit" size="lg">
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
