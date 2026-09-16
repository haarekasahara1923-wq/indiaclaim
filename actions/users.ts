"use server";

import { db } from "@/lib/db";
import { admins } from "@/lib/db/schema";
import { changePasswordSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function changeAdminPassword(formData: unknown) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const parsed = changePasswordSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors };
    }

    const adminId = parseInt(session.user.id, 10);
    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.id, adminId))
      .limit(1);

    if (!admin) {
      return { success: false, error: "Admin user not found" };
    }

    const isValidCurrent = await bcrypt.compare(
      parsed.data.currentPassword,
      admin.passwordHash
    );
    if (!isValidCurrent) {
      return {
        success: false,
        error: { currentPassword: ["Current password is incorrect"] },
      };
    }

    const newHash = await bcrypt.hash(parsed.data.newPassword, 10);
    await db
      .update(admins)
      .set({ passwordHash: newHash })
      .where(eq(admins.id, adminId));

    return { success: true };
  } catch (error: any) {
    console.error("Error changing password:", error);
    return { success: false, error: error.message };
  }
}

export async function getAdminProfile() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const adminId = parseInt(session.user.id, 10);
  const [admin] = await db
    .select({
      id: admins.id,
      name: admins.name,
      email: admins.email,
      createdAt: admins.createdAt,
    })
    .from(admins)
    .where(eq(admins.id, adminId))
    .limit(1);

  return admin ?? null;
}
