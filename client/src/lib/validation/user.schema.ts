import * as z from "zod"

const createUserValidationSchema = z
  .object({
    username: z.string().trim().min(2).max(50),
    email: z.string().trim().email().min(2).max(50),
    password: z.string().trim().min(8).max(50),
    password_confirmation: z.string().trim().min(8).max(50),
    firstName: z.string().trim().min(1).max(50),
    lastName: z.string().trim().min(1).max(50),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  })
  .refine((data) => data.password.length >= 8, {
    message: "Password must be at least 8 characters long",
    path: ["password"],
  })
  .refine((data) => data.password.length <= 50, {
    message: "Password must be at most 50 characters long",
    path: ["password"],
  })

export { createUserValidationSchema }
