import { z } from 'zod';
import { EActivityStatus } from '../../enums';
export const VSCreateActivity = z.object({
  name: z.string({ required_error: 'Nama kegiatan tidak boleh kosong' }),
  lead: z.string({ required_error: 'Penanggung jawab tidak boleh kosong' }),
  proposal: z.string({ required_error: 'Proposal tidak boleh kosong' }),
  description: z.string({ required_error: 'Deskripsi tidak boleh kosong' }),
  location: z.string({ required_error: 'Lokasi tidak boleh kosong' }),
  startDate: z.date({ required_error: 'Tanggal mulai tidak boleh kosong' }),
  endDate: z.date({ required_error: 'Tanggal selesai tidak boleh kosong' }),
  budget: z.string({ required_error: 'Anggaran tidak boleh kosong' }),
  reviewers: z.array(z.string()).optional(),
});

export const VSUpdateActivity = z.object({
  name: z.string().optional(),
  lead: z.string().optional(),
  proposal: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  budget: z.string().optional(),
  reviewers: z.array(z.string()).optional(),
  applicantId: z.string().optional(),
  status: z
    .enum(Object.values(EActivityStatus) as [string, ...string[]])
    .optional(),
});

export type TVSUpdateActivity = z.infer<typeof VSUpdateActivity>;

export type TVSCreateActivity = z.infer<typeof VSCreateActivity>;
