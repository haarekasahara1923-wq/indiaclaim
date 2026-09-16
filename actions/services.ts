"use server";

import { db } from "@/lib/db";
import { services, type NewService } from "@/lib/db/schema";
import { serviceSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getServices(activeOnly = false) {
  if (activeOnly) {
    return db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(services.displayOrder);
  }
  return db.select().from(services).orderBy(services.displayOrder);
}

export async function createService(formData: unknown) {
  const parsed = serviceSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const newService: NewService = {
    ...parsed.data,
    iconUrl: parsed.data.iconUrl || null,
    description: parsed.data.description || null,
  };

  await db.insert(services).values(newService);
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function updateService(id: number, formData: unknown) {
  const parsed = serviceSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  await db
    .update(services)
    .set({
      ...parsed.data,
      iconUrl: parsed.data.iconUrl || null,
      description: parsed.data.description || null,
    })
    .where(eq(services.id, id));

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteService(id: number) {
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}
