import * as z from "zod"

const createUserValidationSchema = z.object({
  username: z.string().trim().min(2).max(50),
  email: z.string().trim().email().min(2).max(50),
  password: z.string().trim().min(8).max(50),
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
})

const signinUserValidationSchema = z.object({
  email: z.string().trim().email().min(2).max(50),
  password: z.string().trim().min(8).max(50),
})

export { createUserValidationSchema, signinUserValidationSchema }
