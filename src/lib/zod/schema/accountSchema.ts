import { z } from "zod";

export type CreateAccount = z.infer<typeof createAccountSchema>;
export const createAccountSchema = z.object({
  role: z.array(
    z.object({
      roleId: z.number(),
      roleName: z.string().optional(),
    })
  ),
  roleFieldValues: z.array(
    z.object({
      fieldId: z.number().optional(),
      value: z.union([z.string(), z.boolean(), z.coerce.date()]).optional(),
    })
  ),

  personalInfo: z.object({
    firstName: z.string().min(1, "Firstname is required"),
    lastName: z.string().min(1, "Lastname is required"),
    middleName: z.string().optional(),
    suffix: z.string().optional(),
    dob: z.coerce.date({}),
    contactNo: z.string().min(1, "Contact number is required"),
    email: z.string().email("Invalid email address"),
    sex: z.enum(["male", "female", "not-set"]),
  }),

  // --- Section 2: Address Information ---
  addressInfo: z.object({
    unitNo: z.string().optional(),
    building: z.string().optional(),
    houseNo: z.string().min(1, "House number is required"),
    street: z.string().min(1, "Street is required"),
    barangay: z.string().min(1, "Barangay is required"),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
  }),

  // --- Section 3: Emergency Contact (Labeled "Address Information" in UI typo) ---
  emergencyContact: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    contactNo: z.string().min(1, "Contact number is required"),
    relationship: z.enum([
      "parent",
      "sibling",
      "child",
      "spouse",
      "relative",
      "other",
    ]),
  }),
});

export type RoleDTO = z.infer<typeof roleSchema>;
export const roleSchema = z.array(
  z.object({
    roleId: z.number(),
    roleName: z.string().optional(),
  })
);

export type RoleFieldValueDTO = z.infer<typeof roleFieldValueSchema>;
export const roleFieldValueSchema = z.array(
  z.object({
    fieldId: z.number().optional(),
    value: z.union([z.string(), z.boolean(), z.coerce.date()]).optional(),
  })
);

export type EmergencyContactDTO = z.infer<typeof emergencyContactSchema>;
export const emergencyContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  contactNo: z.string().min(1, "Contact number is required"),
  relationship: z.enum([
    "parent",
    "sibling",
    "child",
    "spouse",
    "relative",
    "other",
  ]),
});
