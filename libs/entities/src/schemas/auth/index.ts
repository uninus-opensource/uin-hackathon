import { z } from 'zod';

export const VSLogin = z.object({
  email: z
    .string({ required_error: 'Email tidak boleh kosong' })
    .email({
      message: 'Email tidak valid',
    })
    .min(1, {
      message: 'Email tidak boleh kosong',
    }),
  password: z.string({ required_error: 'Password tidak boleh kosong' }).min(1, {
    message: 'Password tidak boleh kosong',
  }),
});

export const VSRegister = z.object({
  email: z.string({ required_error: 'Email harus diisi' }).email({
    message: 'Email harus valid',
  }),
  fullname: z
    .string({ required_error: 'Nama Lengkap harus diisi' })
    .min(2, { message: 'Nama Lengkap harus diisi' }),
  password: z
    .string({ required_error: 'Password harus diisi' })
    .min(8, { message: 'Password minimal 8 karakter' })
    .refine((data) => data.match(/[A-Z]/g), {
      message: 'Password harus ada huruf besar',
    })
    .refine((data) => data.match(/[0-9]/g), {
      message: 'Password harus ada angka',
    }),
});

export type TVSRegister = z.infer<typeof VSRegister>;

export type TVSLogin = z.infer<typeof VSLogin>;
