"use client";

import React, { useState, useEffect } from "react";
import { getHeroSettings, updateHeroSettings } from "@/actions/hero";
import ImageUploader from "@/components/admin/ImageUploader";
import { Sparkles, Save, CheckCircle2, AlertCircle, Plus, Trash2 } from "lucide-react";

export default function AdminHeroPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [stats, setStats] = useState<Array<{ label: string; value: string }>>([]);

  useEffect(() => {
    async function load() {
      const data = await getHeroSettings();
      if (data) {
        setHeadline(data.headline || "");
        setSubheadline(data.subheadline || "");
        setHeroImageUrl(data.heroImageUrl || "");
        setCtaText(data.ctaText || "Free Claim Consultation");
        setCtaLink(data.ctaLink || "/contact");
        setStats(data.stats || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleAddStat = () => {
    setStats([...stats, { label: "New Stat", value: "100+" }]);
  };

  const handleUpdateStat = (
    index: number,
    field: "label" | "value",
    val: string
  ) => {
    const next = [...stats];
    next[index][field] = val;
    setStats(next);
  };

  const handleRemoveStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    const res = await updateHeroSettings({
      headline,
      subheadline,
      heroImageUrl,
      ctaText,
      ctaLink,
      stats,
    });

    if (res.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError(res.error || "Failed to update hero settings");
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
            <Sparkles className="w-4 h-4" />
            <span>Homepage Section</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Hero &amp; Stat Counters
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Changes made here reflect immediately on the live homepage.
          </p>
        </div>

        {success && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Copy */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Hero Headline &amp; Subheadline
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Main Headline
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="India Claim — All in One Insurance Solution Platform"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Subheadline / Description
            </label>
            <textarea
              rows={3}
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              placeholder="Insurance & Claim Expert with Legal Law Adviser..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Button Text
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="Free Claim Consultation"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Button Link
              </label>
              <input
                type="text"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                placeholder="/contact"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Cloudinary Hero Banner Upload */}
          <div className="pt-2">
            <ImageUploader
              value={heroImageUrl}
              onChange={(url) => setHeroImageUrl(url)}
              label="Hero Banner Image (Cloudinary Upload)"
              accept="image/*"
            />
          </div>
        </div>

        {/* Stats Counters */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Stat Counters Strip
              </h2>
              <p className="text-xs text-slate-500">
                Shown below the hero section on the homepage
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddStat}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-xl text-xs font-bold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Counter</span>
            </button>
          </div>

          <div className="space-y-3">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) =>
                      handleUpdateStat(idx, "value", e.target.value)
                    }
                    placeholder="Value (e.g. 500+)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>
                <div className="flex-2">
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) =>
                      handleUpdateStat(idx, "label", e.target.value)
                    }
                    placeholder="Label (e.g. Claims Settled)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveStat(idx)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Remove counter"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg transition hover:scale-105"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Live Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Hero Settings (Instant Live)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
