import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatPhone(phone: string): string {
  // Clean and format an Indian phone number
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    const local = cleaned.slice(2);
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  return phone;
}

/** Convert a 10-digit Indian mobile number to WhatsApp-compatible format (91XXXXXXXXXX) */
export function toWhatsAppNumber(number: string): string {
  const cleaned = number.replace(/\D/g, "");
  if (cleaned.length === 10) return `91${cleaned}`;
  if (cleaned.length === 12 && cleaned.startsWith("91")) return cleaned;
  return cleaned;
}

/** Star rating as an array for rendering */
export function getStarArray(rating: number, max = 5): boolean[] {
  return Array.from({ length: max }, (_, i) => i < rating);
}

/** Truncate text to a given length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/** Determine resource type from Cloudinary URL */
export function getResourceType(
  url: string
): "image" | "video" | "pdf" | "unknown" {
  if (!url) return "unknown";
  const lower = url.toLowerCase();
  if (lower.includes("/video/") || lower.match(/\.(mp4|webm|mov|avi)$/))
    return "video";
  if (lower.includes(".pdf") || lower.includes("/raw/")) return "pdf";
  return "image";
}
