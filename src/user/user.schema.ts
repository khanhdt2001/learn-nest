import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string(),
    dateOfBirth: z.string(),
    gender: z.string(),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
