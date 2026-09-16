import React from "react";
import { getGalleryItems } from "@/actions/gallery";
import GalleryClient from "@/components/public/GalleryClient";
import { ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Settlement Proofs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Claim Recovery Gallery &amp; Documents
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Browse our verified insurance sanction letters, Ombudsman orders, client settlement proofs, and informational videos.
          </p>
        </div>
      </section>

      {/* Gallery Media Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryClient initialItems={items} />
        </div>
      </section>
    </div>
  );
}
