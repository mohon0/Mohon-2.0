import { z } from "zod";

export const SingInSchema = z.object({
  email: z.string().refine(
    (value) =>
      /\S+@\S+\.\S+/.test(value) || // Check for valid email format
      /^01[0-9]{9}$/.test(value), // Check for valid Bangladeshi phone number without country code
    {
      message: "Please enter a valid email or phone number",
    },
  ),
  password: z
    .string()
    .min(6, "Password must be 6 characters long")
    .max(15, "Password cannot be more than 15 characters"),
});

export const SignUpSchema = z.object({
  name: z.string().min(4, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10,15}$/.test(value),
      {
        message: "Must be a valid email or phone number.",
      },
    ),
  password: z
    .string()
    .min(6, "Password must be 6 characters long")
    .max(15, "Password can not be more than 15 characters"),
  code: z.string().optional(),
});
