import { z } from 'zod';
import {
  EPermission,
  EorganizationType,
  EorganizationLevel,
} from '../../enums';

export const VSCreateRole = z.object({
  name: z.string({ required_error: 'Nama tidak boleh kosong' }),
  permissions: z.array(
    z.enum(Object.values(EPermission) as [string, ...string[]])
  ),
});

export const VSUpdateRole = z.object({
  name: z.string({ required_error: 'Nama tidak boleh kosong' }).optional(),
  permissions: z
    .array(z.enum(Object.values(EPermission) as [string, ...string[]]))
    .optional(),
});

export const VSCreateOrganization = z.object({
  name: z.string({ required_error: 'Nama tidak boleh kosong' }),
  organizationType: z.enum(
    Object.values(EorganizationType) as [string, ...string[]]
  ),
  organizationLevel: z.enum(
    Object.values(EorganizationLevel) as [string, ...string[]]
  ),
});

export const VSUpdateOrganization = z.object({
  name: z.string({ required_error: 'Nama tidak boleh kosong' }).optional(),
  organizationType: z
    .enum(Object.values(EorganizationType) as [string, ...string[]])
    .optional(),
  organizationLevel: z
    .enum(Object.values(EorganizationLevel) as [string, ...string[]])
    .optional(),
});

export const VSCreateFaculty = z.object({
  name: z.string({ required_error: 'Nama tidak boleh kosong' }),
});

export const VSUpdateFaculty = z.object({
  name: z.string({ required_error: 'Nama tidak boleh kosong' }).optional(),
});

export const VSCreateDepartment = z.object({
  name: z.string({ required_error: 'Nama tidak boleh kosong' }),
  facultyId: z.string().uuid(),
});

export const VSUpdateDepartment = z.object({
  name: z.string({ required_error: 'Nama tidak boleh kosong' }).optional(),
  acultyId: z.string().uuid().optional(),
});

export type TVSCreateDepartment = z.infer<typeof VSCreateDepartment>;
export type TVSUpdateDepartment = z.infer<typeof VSUpdateDepartment>;

export type TVSCreateFaculty = z.infer<typeof VSCreateFaculty>;
export type TVSUpdateFaculty = z.infer<typeof VSUpdateFaculty>;
export type TVSCreateRole = z.infer<typeof VSCreateRole>;
export type TVSUpdateRole = z.infer<typeof VSUpdateRole>;
export type TVSCreateOrganization = z.infer<typeof VSCreateOrganization>;
export type TVSUpdateOrganization = z.infer<typeof VSUpdateOrganization>;
