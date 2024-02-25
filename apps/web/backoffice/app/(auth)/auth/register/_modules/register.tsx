'use client';
import { FC, ReactElement } from 'react';
import { AuthRegisterPersonalModule } from './personal';
import { parseAsString, useQueryState } from 'next-usequerystate';
import { AuthRegisterOrganizationModule } from './organization';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@psu/web-component-templates';

const schemaPersonal = z.object({
  fullname: z.string().min(1, { message: 'Nama Lengkap wajib diisi' }),
  password: z.string().min(1, { message: 'Kata sandi wajib diisi' }),
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
    console.log(data);
  });

  return (
    <section className="flex overflow-y-hidden lg:flex-row flex-col justify-center items-center w-full h-full min-h-screen">
      <div className="w-full h-full px-6 md:px-0">
        <FormProvider {...methods}>
          <Form onSubmit={onSubmit}>
            {step === 'personal' && <AuthRegisterPersonalModule />}
            {step === 'organization' && <AuthRegisterOrganizationModule />}
          </Form>
        </FormProvider>
      </div>
    </section>
  );
};
