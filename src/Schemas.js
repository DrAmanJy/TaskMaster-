import * as z from "zod";

const authBase = z.object({
  email: z
    .email({
      error: (iss) =>
        iss.input === "" ? "Email is required." : "Invalid email.",
    })
    .max(254, "Email is too long")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .trim()
    .min(6, {
      error: (iss) =>
        iss.input === "" ? "Password is required." : "Min 6 characters",
    })
    .max(256, "Password is too long"),
});

export const signInSchema = authBase;

export const signUpSchema = authBase
  .extend({
    name: z
      .string()
      .trim()
      .min(3, {
        error: (iss) =>
          iss.input === "" ? "Name is required" : "Min 3 characters",
      })
      .max(50, "Name is too long"),
    confirmPassword: z
      .string()
      .trim()
      .refine((val) => val !== "", { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
