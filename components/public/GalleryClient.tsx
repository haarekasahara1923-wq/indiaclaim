"use client";

import React, { useState } from "react";
import {
  FileText,
  Video,
  ExternalLink,
  X,
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

interface GalleryClientProps {
  initialItems: GalleryItem[];
}

const TABS = ["All", "Photos", "Videos", "Documents"];

export default function GalleryClient({ initialItems }: GalleryClientProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Fallback items if database is empty
  const items =
    initialItems && initialItems.length > 0
      ? initialItems
      : [
          {
            id: 1,
            type: "image" as const,
            url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
            cloudinaryPublicId: null,
            caption: "Insurance Ombudsman Official Settlement Award",
            category: "Photos",
            displayOrder: 1,
          },
          {
            id: 2,
            type: "pdf" as const,
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            cloudinaryPublicId: null,
            caption: "Health Mediclaim Reimbursement Approval Letter (₹8.4 Lakh)",
            category: "Documents",
            displayOrder: 2,
          },
          {
            id: 3,
            type: "image" as const,
            url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
            cloudinaryPublicId: null,
            caption: "ULIP Mis-Selling Complete Premium Refund Order",
            category: "Photos",
            displayOrder: 3,
          },
          {
            id: 4,
            type: "pdf" as const,
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            cloudinaryPublicId: null,
            caption: "Term Insurance Death Claim Dispute Resolution Sanction",
            category: "Documents",
            displayOrder: 4,
          },
        ];

  const filteredItems = items.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Photos") return item.type === "image";
    if (activeTab === "Videos") return item.type === "video";
    if (activeTab === "Documents") return item.type === "pdf";
    return true;
  });

  const handleOpenItem = (item: GalleryItem) => {
    if (item.type === "pdf") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs ${
              activeTab === tab
                ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab === "All" && "All Media & Proofs"}
            {tab === "Photos" && "Settlement Photos"}
            {tab === "Videos" && "Video Explanations"}
            {tab === "Documents" && "Sanction Letters & PDFs"}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">
            No items found in category &ldquo;{activeTab}&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isPdf = item.type === "pdf";
            const isVideo = item.type === "video";

            return (
              <div
                key={item.id}
                onClick={() => handleOpenItem(item)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Container */}
                <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  {isPdf ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-slate-200">
                      <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                        <FileText className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider bg-red-600 text-white px-2.5 py-0.5 rounded">
                        View PDF Document
                      </span>
                    </div>
                  ) : isVideo ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-slate-200">
                      <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                        <Video className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider bg-blue-600 text-white px-2.5 py-0.5 rounded">
                        Watch Video
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.caption || "Settlement proof"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Badge */}
                  <span className="absolute top-3 right-3 text-[11px] font-bold bg-black/60 text-white px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {item.category || (isPdf ? "PDF" : isVideo ? "Video" : "Photo")}
                  </span>
                </div>

                {/* Caption & Action */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition">
                    {item.caption || "Verified Claim Settlement"}
                  </h3>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Official Proof
                    </span>
                    <span className="text-blue-700 font-bold flex items-center gap-1">
                      {isPdf ? "Open PDF" : isVideo ? "Watch" : "Enlarge"}
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal (Images & Videos) */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-slate-950/80 border-b border-slate-800 text-white">
              <h3 className="font-bold text-sm sm:text-base truncate pr-4">
                {selectedItem.caption || "Settlement Proof"}
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-2 bg-black min-h-[300px]">
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="max-h-[70vh] w-auto max-w-full rounded"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedItem.url}
                  alt={selectedItem.caption || "Settlement proof"}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span>Category: {selectedItem.category || "General"}</span>
              <a
                href={selectedItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
              >
                <span>Open Original File</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
