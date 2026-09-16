"use server";

import { db } from "@/lib/db";
import { enquiries, type NewEnquiry } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createEnquiry(formData: unknown) {
  const parsed = enquirySchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const { name, whatsappNumber, email, purpose, message, source } =
    parsed.data;

  const newEnquiry: NewEnquiry = {
    name,
    whatsappNumber,
    email: email || null,
    purpose,
    message: message || null,
    source,
    status: "new",
  };

  await db.insert(enquiries).values(newEnquiry);
  revalidatePath("/admin/enquiries");

  return { success: true };
}

export async function updateEnquiryStatus(
  id: number,
  status: "new" | "contacted" | "closed"
) {
  await db
    .update(enquiries)
    .set({ status })
    .where(eq(enquiries.id, id));
  revalidatePath("/admin/enquiries");
  return { success: true };
}

export async function deleteEnquiry(id: number) {
  await db.delete(enquiries).where(eq(enquiries.id, id));
  revalidatePath("/admin/enquiries");
  return { success: true };
}

export async function getEnquiries(
  status?: "new" | "contacted" | "closed"
) {
  if (status) {
    return db
      .select()
      .from(enquiries)
      .where(eq(enquiries.status, status))
      .orderBy(enquiries.createdAt);
  }
  return db.select().from(enquiries).orderBy(enquiries.createdAt);
}
