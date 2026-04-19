import { prisma } from "../config/db.js";
import { cacheDelByPrefix, cacheGet, cacheSet } from "../utils/cache.js";
import { ok } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";
import { getPagination } from "../utils/pagination.js";

export const listProducts = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const { category, search, featured, sort = "newest" } = req.query;
  const cacheKey = `products:${JSON.stringify({ page, limit, category, search, featured, sort })}`;

  const cached = await cacheGet(cacheKey);
  if (cached) {
    return ok(res, cached, "Products fetched (cache)");
  }

  const where = {
    ...(category ? { category: { slug: category } } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(featured !== undefined ? { featured: featured === "true" } : {}),
  };

  const orderBy =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
        ? { price: "desc" }
        : { createdAt: "desc" };

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: { category: true },
    }),
    prisma.product.count({ where }),
  ]);

  const payload = {
    products,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };

  await cacheSet(cacheKey, payload, 180);
  return ok(res, payload);
});

export const getProductBySlug = catchAsync(async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: { category: true },
  });

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  return ok(res, product);
});

export const createProduct = catchAsync(async (req, res) => {
  const product = await prisma.product.create({ data: req.validated.body });
  await cacheDelByPrefix("products:");
  return ok(res, product, "Product created", 201);
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await prisma.product.update({
    where: { id: req.validated.params.id },
    data: req.validated.body,
  });
  await cacheDelByPrefix("products:");
  return ok(res, product, "Product updated");
});

export const deleteProduct = catchAsync(async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  await cacheDelByPrefix("products:");
  return ok(res, null, "Product deleted");
});