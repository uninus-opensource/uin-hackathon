import { z } from 'zod';

export const VSUpdateProfile = z.object({
  fullname: z.string().optional(),
});

export const VSUpdateUser = z.object({
  email: z.string().optional(),
  fullname: z.string().optional(),
  password: z
    .string()
    .refine((data) => data.match(/[A-Z]/g), {
      message: 'Password harus ada huruf besar',
    })
    .refine((data) => data.match(/[0-9]/g), {
      message: 'Password harus ada angka',
    })
    .optional(),
});

export const VSCreateUser = z.object({
  email: z.string({ required_error: 'Email tidak boleh kosong' }).email({
    message: 'Email tidak valid',
  }),
  fullname: z.string({ required_error: 'Nama lengkap tidak boleh kosong' }),
  password: z
    .string({ required_error: 'Password tidak boleh kosong' })

    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        'Password harus memiliki setidaknya 6 karakter dan mengandung setidaknya 1 huruf kecil, 1 huruf besar, dan 1 angka. Tidak boleh mengandung simbol ',
    }),
  roleId: z.number().min(1),
});

export type TVSCreateUser = z.infer<typeof VSCreateUser>;

export type TVSUpdateUser = z.infer<typeof VSUpdateUser>;

export type TVSUpdateProfile = z.infer<typeof VSUpdateProfile>;
