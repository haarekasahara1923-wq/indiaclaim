"use client";

import React, { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "@/actions/settings";
import ImageUploader from "@/components/admin/ImageUploader";
import { Settings, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminSiteSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [siteTitle, setSiteTitle] = useState("India Claim");
  const [tagline, setTagline] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [phone, setPhone] = useState("+91 75668 42783");
  const [whatsappNumber, setWhatsappNumber] = useState("917566842783");
  const [email, setEmail] = useState("info@indiaclaim.com");
  const [address, setAddress] = useState("101, Mahipat Plaza, Thatipur, Gwalior – 474011");
  const [businessHours, setBusinessHours] = useState("Mon – Sat: 10:00 AM – 7:00 PM (Sunday Closed)");
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      if (data) {
        setSiteTitle(data.siteTitle || "India Claim");
        setTagline(data.tagline || "");
        setLogoUrl(data.logoUrl || "");
        setPhone(data.phone || "+91 75668 42783");
        setWhatsappNumber(data.whatsappNumber || "917566842783");
        setEmail(data.email || "info@indiaclaim.com");
        setAddress(data.address || "101, Mahipat Plaza, Thatipur, Gwalior – 474011");
        setBusinessHours(data.businessHours || "Mon – Sat: 10:00 AM – 7:00 PM");
        setMapEmbedUrl(data.mapEmbedUrl || "");
        setMetaDescription(data.metaDescription || "");
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    const res = await updateSiteSettings({
      siteTitle,
      tagline,
      logoUrl,
      phone,
      whatsappNumber,
      email,
      address,
      businessHours,
      mapEmbedUrl,
      metaDescription,
    });

    if (res.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError(res.error || "Failed to update site settings");
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
            <Settings className="w-4 h-4" />
            <span>Global Configuration</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Site &amp; Contact Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Phone numbers, WhatsApp number, office address, map embed, and branding.
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
        {/* Brand & Logo */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Brand Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Site Title
              </label>
              <input
                type="text"
                required
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Tagline / Sub-Brand Title
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="All in One Insurance Solution Platform — Insurance & Claim Expert with Legal Law Adviser"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <ImageUploader
            value={logoUrl}
            onChange={(url) => setLogoUrl(url)}
            label="Brand Logo (Cloudinary Upload)"
            accept="image/*"
          />
        </div>

        {/* Contact Numbers & WhatsApp */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Touchpoints &amp; WhatsApp Configuration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Public Phone Number (Display &amp; Call)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 75668 42783"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                WhatsApp Destination Number (Format: 91XXXXXXXXXX)
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="917566842783"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                The floating widget pre-fills and sends WhatsApp messages to this number.
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Physical Office Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="101, Mahipat Plaza, Thatipur, Gwalior – 474011"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Business Working Hours
            </label>
            <input
              type="text"
              value={businessHours}
              onChange={(e) => setBusinessHours(e.target.value)}
              placeholder="Mon – Sat: 10:00 AM – 7:00 PM (Sunday Closed)"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Google Map & SEO */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Google Maps Embed &amp; SEO
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Google Maps Embed URL (Iframe src link)
            </label>
            <input
              type="text"
              value={mapEmbedUrl}
              onChange={(e) => setMapEmbedUrl(e.target.value)}
              placeholder="https://www.google.com/maps/embed?..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Global Meta Description (SEO)
            </label>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="India Claim is an All in One Insurance Solution Platform..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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
                <span>Saving Site Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Site Settings (Instant Live)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
