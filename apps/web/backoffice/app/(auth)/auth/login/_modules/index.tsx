'use client';
import { Button } from '@psu/web-component-atoms';
import { Form } from '@psu/web-component-templates';
import { ControlledFieldText } from '@psu/web-component-organisms';
import { useForm } from 'react-hook-form';
import { TLoginRequest } from '@psu/entities';
import { FC, ReactElement } from 'react';
import { FcGoogle } from 'react-icons/fc';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const schema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z
    .string({ required_error: 'Kata sandi wajib diisi' })
    .min(6, { message: 'Kata sandi minimal 6 karakter' }),
});

export const AuthLoginModule: FC = (): ReactElement => {
  const {
    control,
    formState: { errors },
  } = useForm<TLoginRequest>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form>
      <h1 className="text-2xl md:text-3xl font-bold text-black text-center">
        OS HUB
      </h1>
      <section className="flex flex-col gap-y-3 mt-[18px]">
        <ControlledFieldText
          control={control}
          name="email"
          label="Email"
          size="md"
          placeholder="Contoh: email@example.com"
          status={errors.email ? 'error' : 'default'}
          message={errors.email?.message}
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
      </section>
      <div className="w-full my-4 flex justify-end">
        <Link href="/auth/forgot" className="font-semibold text-primary-2">
          Lupa Kata Sandi
        </Link>
      </div>
      <Button size="lg">Masuk</Button>
      <div className="w-full flex justify-between">
        <h1 className="font-regular text-xs sm:text-sm text-grey">
          Belum mempunyai akun?
        </h1>
        <Link
          href="/auth/register"
          className="font-semibold text-xs sm:text-sm underline text-primary"
        >
          Klik untuk daftar
        </Link>
      </div>

      <div className="relative">
        <span className="bg-white text-grey-300 p-2 font-medium absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Atau
        </span>
        <hr className="border border-grey-300 my-4" />
      </div>

      <Button variantType="outline" size="lg">
        <div className="flex items-center gap-x-3 justify-center">
          <FcGoogle size={27} />
          <span data-testid="btn-google" className="text-grey-400">
            Masuk Dengan Google
          </span>
        </div>
      </Button>
    </Form>
  );
};

export default AuthLoginModule;
