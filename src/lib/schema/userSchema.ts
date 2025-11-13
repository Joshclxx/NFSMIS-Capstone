import {z} from "zod"

export type UserDTO = z.infer<typeof userSchema>

//finalize later
export const userSchema = z.object({
  userId: z.string(),
  fullName: z.string(),
  birthDate: z.union([z.iso.date(), z.literal("not-set")]),
  sex: z.enum(["male", "female", "not-set"]),
  phone: z.string(),
  email: z.email(),
  passwordHash: z.string(),
  address: z.string(),
  emergencyName: z.string(),
  emergencyPhone: z.string(),
  role: z.string(),
  status: z.string()
});