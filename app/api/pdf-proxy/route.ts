import { NextRequest, NextResponse } from "next/server";

/**
 * PDF Proxy Route
 * Fetches a PDF from any external URL (e.g. Cloudinary) and re-serves it
 * with inline headers so browsers render it instead of downloading.
 * This bypasses X-Frame-Options restrictions on Cloudinary.
 *
 * Usage: /api/pdf-proxy?url=<encoded_pdf_url>
 */
export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return new NextResponse("Missing ?url parameter", { status: 400 });
  }

  let pdfUrl: string;
  try {
    pdfUrl = decodeURIComponent(rawUrl);
    // Basic security: only allow Cloudinary and known safe domains
    const allowed = ["res.cloudinary.com", "www.w3.org"];
    const hostname = new URL(pdfUrl).hostname;
    if (!allowed.some((h) => hostname.endsWith(h))) {
      return new NextResponse("URL not allowed", { status: 403 });
    }
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  try {
    const upstream = await fetch(pdfUrl, {
      headers: { "User-Agent": "Mozilla/5.0 IndiaClaimBot/1.0" },
    });

    if (!upstream.ok) {
      return new NextResponse(`Upstream error: ${upstream.status}`, {
        status: 502,
      });
    }

    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // inline = render in browser, not download
        "Content-Disposition": "inline",
        // Allow this route to be embedded in our own iframe
        "X-Frame-Options": "SAMEORIGIN",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    });
  } catch (err: any) {
    console.error("[pdf-proxy] fetch error:", err);
    return new NextResponse("Failed to fetch PDF from upstream", {
      status: 502,
    });
  }
}
