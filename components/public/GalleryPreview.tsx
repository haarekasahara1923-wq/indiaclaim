import React from "react";
import Link from "next/link";
import {
  FileText,
  Video,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface GalleryItem {
  id: number;
  type: "image" | "video" | "pdf";
  url: string;
  cloudinaryPublicId: string | null;
  caption: string | null;
  category: string | null;
  displayOrder: number;
}

interface GalleryPreviewProps {
  items: GalleryItem[];
}

export default function GalleryPreview({ items }: GalleryPreviewProps) {
  // If no items in DB, display default preview placeholders
  const displayItems =
    items && items.length > 0
      ? items.slice(0, 6)
      : [
          {
            id: 1,
            type: "image" as const,
            url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
            cloudinaryPublicId: null,
            caption: "Insurance Ombudsman Settlement Order",
            category: "Photos",
            displayOrder: 1,
          },
          {
            id: 2,
            type: "pdf" as const,
            url: "#",
            cloudinaryPublicId: null,
            caption: "₹12.5 Lakh Health Claim Approved Document",
            category: "Documents",
            displayOrder: 2,
          },
          {
            id: 3,
            type: "image" as const,
            url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
            cloudinaryPublicId: null,
            caption: "Mis-Selling Premium Refund Proof",
            category: "Photos",
            displayOrder: 3,
          },
        ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Proof of Settlements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Settlement Proofs &amp; Media
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl">
              Real sanction letters, claim approval documents, and client success milestones.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 transition shrink-0"
          >
            <span>View Full Proofs &amp; Documents</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => {
            const isPdf = item.type === "pdf";
            const isVideo = item.type === "video";

            return (
              <div
                key={item.id}
                className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Media Container */}
                <div className="relative aspect-video w-full bg-slate-800 flex items-center justify-center overflow-hidden">
                  {isPdf ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-slate-200">
                      <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                        <FileText className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded">
                        PDF Document
                      </span>
                    </div>
                  ) : isVideo ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-slate-200">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                        <Video className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded">
                        Video Evidence
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.caption || "Proof of claim settlement"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Badge */}
                  <span className="absolute top-3 right-3 text-[11px] font-bold bg-black/60 text-white px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {item.category || "Settlement"}
                  </span>
                </div>

                {/* Caption info */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {item.caption || "Verified Insurance Settlement"}
                  </h3>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Case
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
