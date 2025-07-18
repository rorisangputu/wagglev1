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

const bookingSchema = z.object({
  dogName: z.string().min(2, "Dog's name must be at least 2 characters"),
  address: z.string().min(1, "Address is required"),
  date: z.iso.datetime({ offset: true }),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

const paymentSchema = z.object({
  productId: z.uuid(),
  email: z.email(),
});

export {
  signUpSchema,
  loginSchema,
  bookingSchema,
  paymentSchema,
  verifyCodeSchema,
};
