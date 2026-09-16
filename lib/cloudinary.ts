import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  width?: number;
  height?: number;
}

/**
 * Upload a file (buffer or base64 data URI) to Cloudinary.
 * @param file  - base64 data URI or remote URL
 * @param folder - Cloudinary folder path
 */
export async function uploadToCloudinary(
  file: string,
  folder: string = "india-claim"
): Promise<CloudinaryUploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "auto",
  });
  return result as CloudinaryUploadResult;
}

/**
 * Delete a Cloudinary asset by its public_id.
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

/**
 * Generate a signed upload URL for direct browser → Cloudinary uploads.
 */
export function generateSignedUploadParams(folder: string = "india-claim") {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = { folder, timestamp };
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );
  return {
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    folder,
  };
}
