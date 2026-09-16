"use server";

import { db } from "@/lib/db";
import { testimonials, type NewTestimonial } from "@/lib/db/schema";
import { testimonialSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTestimonials(activeOnly = false) {
  if (activeOnly) {
    return db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(testimonials.createdAt);
  }
  return db.select().from(testimonials).orderBy(testimonials.createdAt);
}

export async function createTestimonial(formData: unknown) {
  const parsed = testimonialSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const newTestimonial: NewTestimonial = {
    ...parsed.data,
    photoUrl: parsed.data.photoUrl || null,
  };

  await db.insert(testimonials).values(newTestimonial);
  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function updateTestimonial(id: number, formData: unknown) {
  const parsed = testimonialSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  await db
    .update(testimonials)
    .set({ ...parsed.data, photoUrl: parsed.data.photoUrl || null })
    .where(eq(testimonials.id, id));

  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: number) {
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function toggleTestimonialActive(
  id: number,
  isActive: boolean
) {
  await db
    .update(testimonials)
    .set({ isActive })
    .where(eq(testimonials.id, id));
  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  return { success: true };
}
