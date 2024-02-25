'use client';
import { Button } from '@psu/web-component-atoms';
import { Form } from '@psu/web-component-templates';
import { ControlledFieldText } from '@psu/web-component-organisms';
import { useForm } from 'react-hook-form';
import { FC, ReactElement } from 'react';
import { FcGoogle } from 'react-icons/fc';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const schema = z.object({
  fullname: z.string().min(1, { message: 'Nama Lengkap wajib diisi' }),
  password: z.string().min(1, { message: 'Kata sandi wajib diisi' }),
  email: z.string().email({ message: 'Email tidak valid' }),
  nim: z.string().min(1, { message: 'NIM wajib diisi' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Konfirmasi kata sandi wajib diisi' })
    .refine((value) => value === 'password', {
      message: 'Konfirmasi kata sandi tidak sama',
      path: ['confirmPassword'],
    }),
});

export const AuthRegisterModule: FC = (): ReactElement => {
  const {
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
  });

  return (
    <Form>
      <h1 className="text-2xl font-bold text-black text-left">Registrasi</h1>
      <section className="flex flex-col gap-y-3 mt-[18px]">
        <Button variantType="outline" size="lg">
          <div className="flex items-center gap-x-3 justify-center">
            <FcGoogle size={27} />
            <span className="text-grey-400">Daftar Dengan Google</span>
          </div>
        </Button>

        <div className="relative">
          <span className="bg-white text-grey-300 p-2 font-medium absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            Atau
          </span>
          <hr className="border border-grey-300 my-4" />
        </div>

        <h1 className="text-1xl font-semibold text-black text-left">
          Informasi Pengguna
        </h1>

        <div className="flex md:flex-row flex-col gap-x-4 gap-y-4">
          <ControlledFieldText
            control={control}
            name="fullname"
            label="Nama Lengkap"
            size="md"
            placeholder="Masukkan Nama Lengkap"
            status={errors.fullname ? 'error' : 'default'}
            message={errors.fullname?.message}
          />
          <ControlledFieldText
            control={control}
            name="password"
            label="Kata Sandi"
            size="md"
            placeholder="Masukkan Kata Sandi"
            status={errors.password ? 'error' : 'default'}
            message={errors.password?.message}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-x-4 gap-y-4">
          <ControlledFieldText
            control={control}
            name="nim"
            label="NIM"
            size="md"
            placeholder="Contoh: 41037000***"
            status={errors.email ? 'error' : 'default'}
            message={errors.email?.message}
          />
          <ControlledFieldText
            control={control}
            name="confirmPassword"
            label="Konfirmasi Kata Sandi"
            size="md"
            placeholder="Masukkan Konfirmasi Kata Sandi"
            status={errors.confirmPassword ? 'error' : 'default'}
            message={errors.confirmPassword?.message}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-x-4">
          <ControlledFieldText
            control={control}
            name="email"
            label="Email"
            size="md"
            placeholder="Contoh: email@example.com"
            status={errors.email ? 'error' : 'default'}
            message={errors.email?.message}
          />
        </div>
      </section>
      <Button size="lg">Berikutnya</Button>
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
    </Form>
  );
};
