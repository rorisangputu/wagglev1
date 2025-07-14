import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(10),
  address: z.string().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const verifyCodeSchema = z.object({
  email: z.email(),
  code: z.string().length(6),
});

const paymentSchema = z.object({
  productId: z.uuid(),
  email: z.email(),
});

export { signUpSchema, loginSchema, paymentSchema, verifyCodeSchema };
