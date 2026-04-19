import { z } from "zod";

const decimal = z.coerce.number().positive();

export const productCreateSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    slug: z.string().min(3),
    description: z.string().min(10),
    price: decimal,
    compareAtPrice: decimal.optional(),
    categoryId: z.string().min(2),
    sizes: z.array(z.string()).min(1),
    colors: z.array(z.string()).min(1),
    stockQuantity: z.coerce.number().int().min(0),
    images: z.array(z.string().url()).min(1),
    featured: z.coerce.boolean().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const productUpdateSchema = z.object({
  body: productCreateSchema.shape.body.partial(),
  params: z.object({ id: z.string().min(2) }),
  query: z.object({}).optional(),
});

export const productListSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
    category: z.string().optional(),
    search: z.string().optional(),
    featured: z.enum(["true", "false"]).optional(),
    sort: z.enum(["newest", "price_asc", "price_desc"]).optional(),
  }),
});