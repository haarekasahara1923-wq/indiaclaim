"use server";

import { db } from "@/lib/db";
import { aboutContent, type AboutContent } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    const [about] = await db.select().from(aboutContent).limit(1);
    return about ?? null;
  } catch (error) {
    console.error("Error fetching about content:", error);
    return null;
  }
}

export async function updateAboutContent(data: {
  storyRichtext?: string;
  founderName?: string;
  founderDesignation?: string;
  founderPhotoUrl?: string;
  founderBio?: string;
  whyChooseUs?: Array<{ title: string; description: string }>;
}) {
  try {
    const existing = await getAboutContent();

    if (existing) {
      await db
        .update(aboutContent)
        .set({
          storyRichtext: data.storyRichtext || null,
          founderName: data.founderName || "Devesh Sharma",
          founderDesignation:
            data.founderDesignation || "Co-Founder, India Claim",
          founderPhotoUrl: data.founderPhotoUrl || null,
          founderBio: data.founderBio || null,
          whyChooseUs: data.whyChooseUs || [],
        })
        .where(eq(aboutContent.id, existing.id));
    } else {
      await db.insert(aboutContent).values({
        storyRichtext: data.storyRichtext || null,
        founderName: data.founderName || "Devesh Sharma",
        founderDesignation:
          data.founderDesignation || "Co-Founder, India Claim",
        founderPhotoUrl: data.founderPhotoUrl || null,
        founderBio: data.founderBio || null,
        whyChooseUs: data.whyChooseUs || [],
      });
    }

    revalidatePath("/about");
    revalidatePath("/");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating about content:", error);
    return { success: false, error: error.message };
  }
}
