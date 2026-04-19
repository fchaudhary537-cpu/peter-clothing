import { z } from "zod";

export const addToCartSchema = z.object({
  body: z.object({
    productId: z.string().min(2),
    quantity: z.coerce.number().int().min(1).max(50),
    size: z.string().optional(),
    color: z.string().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const updateCartSchema = z.object({
  body: z.object({
    itemId: z.string().min(2),
    quantity: z.coerce.number().int().min(1).max(50),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const removeCartSchema = z.object({
  body: z.object({ itemId: z.string().min(2) }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const applyCouponSchema = z.object({
  body: z.object({ code: z.string().min(2) }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});