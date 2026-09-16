"use server";

import { db } from "@/lib/db";
import {
  insuranceCategories,
  type NewInsuranceCategory,
} from "@/lib/db/schema";
import { categorySchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    return await db
      .select()
      .from(insuranceCategories)
      .orderBy(insuranceCategories.displayOrder);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createCategory(formData: unknown) {
  const parsed = categorySchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const newCategory: NewInsuranceCategory = {
    ...parsed.data,
    description: parsed.data.description || null,
    iconUrl: parsed.data.iconUrl || null,
  };

  await db.insert(insuranceCategories).values(newCategory);
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/categories");
  return { success: true };
}

export async function updateCategory(id: number, formData: unknown) {
  const parsed = categorySchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  await db
    .update(insuranceCategories)
    .set({
      ...parsed.data,
      description: parsed.data.description || null,
      iconUrl: parsed.data.iconUrl || null,
    })
    .where(eq(insuranceCategories.id, id));

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/categories");
  return { success: true };
}

export async function deleteCategory(id: number) {
  await db
    .delete(insuranceCategories)
    .where(eq(insuranceCategories.id, id));
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/categories");
  return { success: true };
}
