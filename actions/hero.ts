"use server";

import { db } from "@/lib/db";
import { heroSettings, type HeroSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getHeroSettings(): Promise<HeroSettings | null> {
  try {
    const [hero] = await db.select().from(heroSettings).limit(1);
    return hero ?? null;
  } catch (error) {
    console.error("Error fetching hero settings:", error);
    return null;
  }
}

export async function updateHeroSettings(data: {
  headline: string;
  subheadline: string;
  heroImageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  stats?: Array<{ label: string; value: string }>;
}) {
  try {
    const existing = await getHeroSettings();

    if (existing) {
      await db
        .update(heroSettings)
        .set({
          headline: data.headline,
          subheadline: data.subheadline,
          heroImageUrl: data.heroImageUrl || null,
          ctaText: data.ctaText || "Free Claim Consultation",
          ctaLink: data.ctaLink || "/contact",
          stats: data.stats || [],
        })
        .where(eq(heroSettings.id, existing.id));
    } else {
      await db.insert(heroSettings).values({
        headline: data.headline,
        subheadline: data.subheadline,
        heroImageUrl: data.heroImageUrl || null,
        ctaText: data.ctaText || "Free Claim Consultation",
        ctaLink: data.ctaLink || "/contact",
        stats: data.stats || [],
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating hero settings:", error);
    return { success: false, error: error.message };
  }
}
