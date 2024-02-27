'use client';
import { FC, ReactElement } from 'react';
import { AuthRegisterPersonalModule } from './personal';
import { parseAsString, useQueryState } from 'next-usequerystate';
import { AuthRegisterOrganizationModule } from './organization';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@psu/web-component-templates';
import { useRegister } from '@psu/web-auth';
import { useRouter } from 'next/navigation';
import { TMetaErrorResponse } from '@psu/entities';

const schemaPersonal = z.object({
  fullname: z.string().min(1, { message: 'Nama Lengkap wajib diisi' }),
  password: z
    .string({ required_error: 'Password harus diisi' })
    .min(8, { message: 'Password minimal 8 karakter' })
    .refine((data) => data.match(/[A-Z]/g), {
      message: 'Password harus ada huruf besar',
    })
    .refine((data) => data.match(/[0-9]/g), {
      message: 'Password harus ada angka',
    }),
  email: z.string().email({ message: 'Email tidak valid' }),
  nim: z.string().min(1, { message: 'NIM wajib diisi' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Konfirmasi kata sandi wajib diisi' }),
});

const schemaOrganization = z.object({
  organization: z.string().min(1, { message: 'Organisasi wajib diisi' }),
  organizationType: z
    .string()
    .min(1, { message: 'Jenis Organisasi wajib diisi' }),
  organizationLevel: z
    .string()
    .min(1, { message: 'Level Organisasi wajib diisi' }),
});

const mergedSchema = schemaOrganization.merge(schemaPersonal);

export type TRegisterPersonal = z.infer<typeof schemaPersonal>;
export type TRegisterOrganization = z.infer<typeof schemaOrganization>;

export const AuthRegisterModule: FC = (): ReactElement => {
  const [step] = useQueryState('step', parseAsString.withDefault('personal'));
  const { push } = useRouter();
  const { mutate, error } = useRegister();

  const methods = useForm<TRegisterPersonal & TRegisterOrganization>({
    resolver: zodResolver(
      step === 'personal'
        ? schemaPersonal.superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword !== password) {
              ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Konfirmasi Kata sandi harus sama dengan Kata sandi',
              });
            }
          })
        : mergedSchema
    ),
    mode: 'all',
    defaultValues: {
      fullname: '',
      nim: '',
      email: '',
      password: '',
      confirmPassword: '',
      organization: '',
      organizationType: '',
      organizationLevel: '',
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutate(
      {
        organizationId: data.organization,
        email: data.email,
        nim: data.nim,
        fullname: data.fullname,
        password: data.password,
      },
      {
        onSuccess: () => {
          methods.reset();
          push('/auth/login');
        },
      }
    );
  });

  return (
    <section className="flex overflow-y-hidden lg:flex-row flex-col justify-center items-center w-full h-full min-h-screen">
      <div className="w-full h-full px-6 md:px-0">
        <FormProvider {...methods}>
          <Form onSubmit={onSubmit}>
            {step === 'personal' && <AuthRegisterPersonalModule />}
            {step === 'organization' && (
              <AuthRegisterOrganizationModule
                errorData={error as TMetaErrorResponse}
              />
            )}
          </Form>
        </FormProvider>
      </div>
    </section>
  );
};
