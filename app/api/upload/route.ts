import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

// Allow up to 100 MB uploads (PDFs, videos, high-res images)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    // Require admin session for uploads
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "india-claim";

      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }

      // Convert file buffer to base64 data URI
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || "application/octet-stream";
      const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;

      const result = await uploadToCloudinary(base64Data, folder);
      return NextResponse.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
      });
    }

    // JSON payload with base64 string
    const body = await req.json();
    if (!body.file) {
      return NextResponse.json(
        { error: "No file content provided" },
        { status: 400 }
      );
    }

    const result = await uploadToCloudinary(
      body.file,
      body.folder || "india-claim"
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      format: result.format,
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
