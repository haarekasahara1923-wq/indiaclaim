"use client";

import React, { useState, useEffect } from "react";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialActive,
} from "@/actions/testimonials";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  Quote,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

interface TestimonialItem {
  id: number;
  clientName: string;
  photoUrl: string | null;
  message: string;
  rating: number | null;
  isActive: boolean;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [clientName, setClientName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [testimonialMessage, setTestimonialMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isActive, setIsActive] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await getTestimonials();
    setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setClientName("");
    setPhotoUrl("");
    setTestimonialMessage("");
    setRating(5);
    setIsActive(true);
    setIsCreating(true);
    setError(null);
  };

  const openEditModal = (item: TestimonialItem) => {
    setIsCreating(false);
    setEditingItem(item);
    setClientName(item.clientName);
    setPhotoUrl(item.photoUrl || "");
    setTestimonialMessage(item.message);
    setRating(item.rating || 5);
    setIsActive(item.isActive);
    setError(null);
  };

  const closeModal = () => {
    setIsCreating(false);
    setEditingItem(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isCreating) {
        const res = await createTestimonial({
          clientName,
          photoUrl,
          message: testimonialMessage,
          rating,
          isActive,
        });
        if (!res.success) throw new Error("Failed to create testimonial");
      } else if (editingItem) {
        const res = await updateTestimonial(editingItem.id, {
          clientName,
          photoUrl,
          message: testimonialMessage,
          rating,
          isActive,
        });
        if (!res.success) throw new Error("Failed to update testimonial");
      }

      setMessage("Testimonial saved!");
      setTimeout(() => setMessage(null), 4000);
      closeModal();
      await loadData();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    await deleteTestimonial(id);
    setMessage("Testimonial deleted.");
    setTimeout(() => setMessage(null), 3000);
    await loadData();
  };

  const handleToggle = async (id: number, current: boolean) => {
    await toggleTestimonialActive(id, !current);
    await loadData();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <Quote className="w-4 h-4" />
            <span>Social Proof</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Client Testimonials
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add or edit client success feedback and star ratings.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow transition hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <span className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin inline-block" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          No testimonials yet. Click &quot;Add Testimonial&quot; above.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (t.rating || 5)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleToggle(t.id, t.isActive)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      t.isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {t.isActive ? (
                      <>
                        <Eye className="w-3 h-3" /> Live
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" /> Hidden
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{t.message}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">
                    {t.clientName}
                  </h4>
                  <span className="text-[10px] text-slate-400">Verified Client</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(t)}
                    className="text-blue-700 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-50 transition"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="font-black text-lg text-slate-900">
                {isCreating ? "Add Testimonial" : "Edit Testimonial"}
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
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Rajesh Verma"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Testimonial Review Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={testimonialMessage}
                  onChange={(e) => setTestimonialMessage(e.target.value)}
                  placeholder="Share details of the claim settlement or refund..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value) || 5)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                    <option value="3">⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={isActive ? "true" : "false"}
                    onChange={(e) => setIsActive(e.target.value === "true")}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="true">Published (Live)</option>
                    <option value="false">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <ImageUploader
                value={photoUrl}
                onChange={(url) => setPhotoUrl(url)}
                label="Client Photo (Optional Cloudinary Upload)"
                accept="image/*"
              />

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
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-xl text-xs flex items-center gap-2 shadow"
                >
                  {saving ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
