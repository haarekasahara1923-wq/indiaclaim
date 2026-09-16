"use server";

import { db } from "@/lib/db";
import { siteSettings, type SiteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const [settings] = await db.select().from(siteSettings).limit(1);
    return settings ?? null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export async function updateSiteSettings(data: {
  logoUrl?: string;
  siteTitle: string;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  businessHours?: string;
  mapEmbedUrl?: string;
  socialLinks?: Record<string, string>;
  metaDescription?: string;
}) {
  try {
    const existing = await getSiteSettings();

    if (existing) {
      await db
        .update(siteSettings)
        .set({
          logoUrl: data.logoUrl || null,
          siteTitle: data.siteTitle,
          tagline: data.tagline || null,
          phone: data.phone || null,
          whatsappNumber: data.whatsappNumber || null,
          email: data.email || null,
          address: data.address || null,
          businessHours: data.businessHours || null,
          mapEmbedUrl: data.mapEmbedUrl || null,
          socialLinks: data.socialLinks || {},
          metaDescription: data.metaDescription || null,
        })
        .where(eq(siteSettings.id, existing.id));
    } else {
      await db.insert(siteSettings).values({
        logoUrl: data.logoUrl || null,
        siteTitle: data.siteTitle,
        tagline: data.tagline || null,
        phone: data.phone || null,
        whatsappNumber: data.whatsappNumber || null,
        email: data.email || null,
        address: data.address || null,
        businessHours: data.businessHours || null,
        mapEmbedUrl: data.mapEmbedUrl || null,
        socialLinks: data.socialLinks || {},
        metaDescription: data.metaDescription || null,
      });
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin/site-settings");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating site settings:", error);
    return { success: false, error: error.message };
  }
}
