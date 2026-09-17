"use client";

import React, { useState, useEffect } from "react";
import { getAboutContent, updateAboutContent } from "@/actions/about";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  UserCheck,
} from "lucide-react";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State
  const [founderName, setFounderName] = useState("Devesh Sharma");
  const [founderDesignation, setFounderDesignation] = useState("Founder, India Claim");
  const [founderBio, setFounderBio] = useState("");
  const [founderPhotoUrl, setFounderPhotoUrl] = useState("");
  const [storyRichtext, setStoryRichtext] = useState("");
  const [whyChooseUs, setWhyChooseUs] = useState<
    Array<{ title: string; description: string }>
  >([]);

  useEffect(() => {
    async function load() {
      const data = await getAboutContent();
      if (data) {
        setFounderName(data.founderName || "Devesh Sharma");
        setFounderDesignation(data.founderDesignation || "Founder, India Claim");
        setFounderBio(data.founderBio || "");
        setFounderPhotoUrl(data.founderPhotoUrl || "");
        setStoryRichtext(data.storyRichtext || "");
        setWhyChooseUs(data.whyChooseUs || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleAddWhy = () => {
    setWhyChooseUs([
      ...whyChooseUs,
      { title: "New Reason", description: "Why clients should choose India Claim..." },
    ]);
  };

  const handleUpdateWhy = (
    index: number,
    field: "title" | "description",
    val: string
  ) => {
    const next = [...whyChooseUs];
    next[index][field] = val;
    setWhyChooseUs(next);
  };

  const handleRemoveWhy = (index: number) => {
    setWhyChooseUs(whyChooseUs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    const res = await updateAboutContent({
      founderName,
      founderDesignation,
      founderBio,
      founderPhotoUrl,
      storyRichtext,
      whyChooseUs,
    });

    if (res.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError(res.error || "Failed to update About content");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <span className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Story &amp; Leadership</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            About Us &amp; Founder Profile
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage company story, Hindi copy, Founder Devesh Sharma profile, and key advantages.
          </p>
        </div>

        {success && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Live Updated!
          </span>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Founder Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              Founder Information Block
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Founder Name
              </label>
              <input
                type="text"
                required
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                placeholder="Devesh Sharma"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Designation
              </label>
              <input
                type="text"
                value={founderDesignation}
                onChange={(e) => setFounderDesignation(e.target.value)}
                placeholder="Founder, India Claim"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Founder Bio &amp; Legal Advisory Background
            </label>
            <textarea
              rows={4}
              value={founderBio}
              onChange={(e) => setFounderBio(e.target.value)}
              placeholder="Short bio explaining experience and mission..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <ImageUploader
            value={founderPhotoUrl}
            onChange={(url) => setFounderPhotoUrl(url)}
            label="Founder Portrait Photo (Cloudinary Upload)"
            accept="image/*"
          />
        </div>

        {/* Story Rich Text */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Company Story &amp; Hindi Copy (HTML Supported)
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Story / Mission Content
            </label>
            <textarea
              rows={6}
              value={storyRichtext}
              onChange={(e) => setStoryRichtext(e.target.value)}
              placeholder="<p>India Claim se khareedi gayi har prakar ki policy...</p>"
              className="w-full font-mono text-xs px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Supports HTML tags such as &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;.
            </p>
          </div>
        </div>

        {/* Why Choose Us Points */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                &ldquo;Why Choose Us&rdquo; Value Propositions
              </h2>
              <p className="text-xs text-slate-500">
                Key bullet items shown on the About Us page
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddWhy}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-xl text-xs font-bold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Point</span>
            </button>
          </div>

          <div className="space-y-4">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    Advantage #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveWhy(idx)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleUpdateWhy(idx, "title", e.target.value)}
                  placeholder="Title (e.g. No Win No Fee)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) =>
                    handleUpdateWhy(idx, "description", e.target.value)
                  }
                  placeholder="Detailed description..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg transition hover:scale-105"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Story &amp; Founder...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save About Content (Instant Live)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
