import { z } from "zod";

const password = z.string().min(8).max(100);

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password,
    phone: z.string().min(7).max(30).optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const forgotPasswordSchema = z.object({
  body: z.object({ email: z.string().email() }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const resetPasswordSchema = z.object({
  body: z.object({ token: z.string().min(20), password }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const verifyEmailSchema = z.object({
  body: z.object({ token: z.string().min(20) }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});