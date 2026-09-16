"use server";

import { db } from "@/lib/db";
import { galleryItems, type NewGalleryItem } from "@/lib/db/schema";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getGalleryItems(filters?: {
  type?: "image" | "video" | "pdf";
  category?: string;
}) {
  try {
    const conditions = [];
    if (filters?.type) {
      conditions.push(eq(galleryItems.type, filters.type));
    }
    if (filters?.category && filters.category !== "All") {
      conditions.push(eq(galleryItems.category, filters.category));
    }

    if (conditions.length > 0) {
      return await db
        .select()
        .from(galleryItems)
        .where(and(...conditions))
        .orderBy(galleryItems.displayOrder, galleryItems.createdAt);
    }

    return await db
      .select()
      .from(galleryItems)
      .orderBy(galleryItems.displayOrder, galleryItems.createdAt);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
}

export async function createGalleryItem(data: {
  type: "image" | "video" | "pdf";
  url: string;
  cloudinaryPublicId?: string;
  caption?: string;
  category?: string;
  displayOrder?: number;
}) {
  try {
    const newItem: NewGalleryItem = {
      type: data.type,
      url: data.url,
      cloudinaryPublicId: data.cloudinaryPublicId || null,
      caption: data.caption || null,
      category: data.category || "Photos",
      displayOrder: data.displayOrder || 0,
    };

    await db.insert(galleryItems).values(newItem);
    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating gallery item:", error);
    return { success: false, error: error.message };
  }
}

export async function updateGalleryItem(
  id: number,
  data: {
    caption?: string;
    category?: string;
    displayOrder?: number;
  }
) {
  try {
    await db
      .update(galleryItems)
      .set({
        caption: data.caption || null,
        category: data.category || "Photos",
        displayOrder: data.displayOrder || 0,
      })
      .where(eq(galleryItems.id, id));

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteGalleryItem(
  id: number,
  cloudinaryPublicId?: string | null,
  type?: "image" | "video" | "pdf"
) {
  try {
    if (cloudinaryPublicId) {
      const resourceType = type === "video" ? "video" : type === "pdf" ? "raw" : "image";
      try {
        await deleteFromCloudinary(cloudinaryPublicId, resourceType);
      } catch (cloudErr) {
        console.warn("Could not delete from Cloudinary:", cloudErr);
      }
    }

    await db.delete(galleryItems).where(eq(galleryItems.id, id));
    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
