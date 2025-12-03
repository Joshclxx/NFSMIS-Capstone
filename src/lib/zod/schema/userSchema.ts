import { z } from "zod";

export type UserRecord = z.infer<typeof userRecordSchema>;
export type UserDTO = z.infer<typeof userRecordSchema.omit({passwordHash: true})>;
export type CreateUser = z.infer<typeof createdUserTableSchema>;
export const userRecordSchema = z.object({
  userId: z.string(),
  fullname: z.string(),
  sex: z.enum(["male", "female", "not-set"]),
  email: z.email(),
  passwordHash: z.string(),
  role: z.string().transform((val) => {
    if (val === "not-set" || val === "") return [];
    return val.split(", ");
  }),
  status: z.string(),
});

export const createdUserTableSchema = z.object({
  firstName: z.string().min(1, "Firstname is required"),
  lastName: z.string().min(1, "Lastname is required"),
  middleName: z.string().optional(),
  suffix: z.string().optional(),
  dob: z.coerce.date({}),
  contactNo: z.string().min(1, "Contact number is required"),
  sex: z.enum(["male", "female", "not-set"]),
});

export type AddressDTO = z.infer<typeof addressSchema>
export const addressSchema = z.object({
  unitNo: z.string().optional(),
  building: z.string().optional(),
  houseNo: z.string().optional(),
  street: z.string().min(1, "Street is required"),
  barangay: z.string().min(1, "Barangay is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
});