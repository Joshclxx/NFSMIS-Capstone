import { z } from "zod";

export type LoginDTO = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/),
  ip: z.union([z.ipv4(), z.ipv6()]),
  deviceHash: z.string(),
  contentType: z.string()
});
