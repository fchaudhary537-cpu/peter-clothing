import { prisma } from "../config/db.js";
import { ok } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";

export const listCategories = catchAsync(async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return ok(res, categories);
});

export const createCategory = catchAsync(async (req, res) => {
  const category = await prisma.category.create({ data: req.validated.body });
  return ok(res, category, "Category created", 201);
});

export const updateCategory = catchAsync(async (req, res) => {
  const category = await prisma.category.update({
    where: { id: req.validated.params.id },
    data: req.validated.body,
  });
  return ok(res, category, "Category updated");
});

export const deleteCategory = catchAsync(async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  return ok(res, null, "Category deleted");
});