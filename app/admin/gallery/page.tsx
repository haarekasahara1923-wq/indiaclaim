"use client";

import React, { useState, useEffect } from "react";
import {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from "@/actions/gallery";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  FileText,
  Video,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
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

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [type, setType] = useState<"image" | "video" | "pdf">("image");
  const [url, setUrl] = useState("");
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Photos");
  const [displayOrder, setDisplayOrder] = useState(0);

  const loadData = async () => {
    setLoading(true);
    const data = await getGalleryItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openUploadModal = () => {
    setType("image");
    setUrl("");
    setCloudinaryPublicId("");
    setCaption("");
    setCategory("Photos");
    setDisplayOrder(items.length + 1);
    setIsModalOpen(true);
    setError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMediaUploaded = (uploadedUrl: string, publicId?: string) => {
    setUrl(uploadedUrl);
    if (publicId) setCloudinaryPublicId(publicId);

    // Auto-detect type
    const lower = uploadedUrl.toLowerCase();
    if (lower.includes(".pdf") || lower.includes("/raw/")) {
      setType("pdf");
      setCategory("Documents");
    } else if (lower.includes("/video/") || lower.match(/\.(mp4|webm|mov)$/)) {
      setType("video");
      setCategory("Videos");
    } else {
      setType("image");
      setCategory("Photos");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError("Please upload a file first.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await createGalleryItem({
        type,
        url,
        cloudinaryPublicId,
        caption,
        category,
        displayOrder,
      });

      if (!res.success) throw new Error(res.error || "Failed to save item");

      setMessage("Media item saved to gallery!");
      setTimeout(() => setMessage(null), 4000);
      closeModal();
      await loadData();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!window.confirm("Are you sure you want to delete this media item?")) return;

    await deleteGalleryItem(item.id, item.cloudinaryPublicId, item.type);
    setMessage("Media item deleted.");
    setTimeout(() => setMessage(null), 3000);
    await loadData();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <ImageIcon className="w-4 h-4" />
            <span>Media &amp; Proofs</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Settlement Proofs &amp; Documents Gallery
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload photos, video evidence, and PDF sanction documents to Cloudinary.
          </p>
        </div>

        <button
          onClick={openUploadModal}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow transition hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Media</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Media Grid */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <span className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin inline-block" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          No gallery items uploaded yet. Click &quot;Upload Media&quot; above.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              {/* Media Preview */}
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                {item.type === "pdf" ? (
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <FileText className="w-12 h-12 text-red-400 mb-2" />
                    <span className="text-xs font-bold uppercase text-white bg-red-600 px-2 py-0.5 rounded">
                      PDF Document
                    </span>
                  </div>
                ) : item.type === "video" ? (
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <Video className="w-12 h-12 text-blue-400 mb-2" />
                    <span className="text-xs font-bold uppercase text-white bg-blue-600 px-2 py-0.5 rounded">
                      Video
                    </span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.caption || "Proof"}
                    className="w-full h-full object-cover"
                  />
                )}
                <span className="absolute top-2 right-2 text-[10px] font-bold bg-black/70 text-white px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Info & Delete */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  {item.caption || "Untitled Document"}
                </h4>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View File</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition"
                    title="Delete Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="font-black text-lg text-slate-900">
                Upload New Proof / Media
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <ImageUploader
                value={url}
                onChange={handleMediaUploaded}
                label="Select File to Upload to Cloudinary (Image, Video, or PDF)"
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Caption / Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. ₹10 Lakh Health Claim Approval Letter"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category Filter Tab
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Photos">Photos</option>
                    <option value="Videos">Videos</option>
                    <option value="Documents">Documents</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Resource Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value as "image" | "video" | "pdf")
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="image">Image (Photo)</option>
                    <option value="video">Video</option>
                    <option value="pdf">PDF Document</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !url}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-xl text-xs flex items-center gap-2 shadow"
                >
                  {saving ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : null}
                  <span>Save to Gallery</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
