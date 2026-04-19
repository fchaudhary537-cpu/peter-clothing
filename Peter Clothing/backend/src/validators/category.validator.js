import { z } from "zod";

export const categoryCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().max(300).optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const categoryUpdateSchema = z.object({
  body: categoryCreateSchema.shape.body.partial(),
  params: z.object({ id: z.string().min(2) }),
  query: z.object({}).optional(),
});