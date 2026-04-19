import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    shippingAddress: z.object({
      line1: z.string().min(3),
      line2: z.string().optional(),
      city: z.string().min(2),
      state: z.string().min(2),
      postalCode: z.string().min(2),
      country: z.string().min(2),
    }),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    orderId: z.string().min(2),
    orderStatus: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});