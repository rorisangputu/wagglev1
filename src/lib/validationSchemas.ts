import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const paymentSchema = z.object({
  productId: z.uuid(),
  email: z.email(),
});

export { loginSchema, paymentSchema };
