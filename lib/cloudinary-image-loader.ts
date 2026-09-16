"use client";

// Custom Next.js image loader for Cloudinary
// Used in next.config.ts: loader: "custom", loaderFile: "./lib/cloudinary-image-loader.ts"

interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: LoaderProps): string {
  // If it's already a full Cloudinary URL, apply transformations
  if (src.startsWith("https://res.cloudinary.com")) {
    const parts = src.split("/upload/");
    if (parts.length === 2) {
      const transforms = `w_${width},q_${quality ?? 75},f_auto`;
      return `${parts[0]}/upload/${transforms}/${parts[1]}`;
    }
    return src;
  }
  // Fallback for non-Cloudinary images
  return src;
}
