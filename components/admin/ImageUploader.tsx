"use client";

import React, { useState } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";

interface ImageUploaderProps {
  value?: string | null;
  onChange: (url: string, publicId?: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  folder = "india-claim",
  accept = "image/*,video/*,application/pdf",
  label = "Upload Media (Image / Video / PDF)",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url, data.publicId);
    } catch (err: any) {
      setError(err.message || "Upload failed. Check Cloudinary credentials.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}
      </label>

      {value ? (
        <div className="relative border border-slate-300 rounded-xl p-3 bg-slate-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            {value.match(/\.(jpg|jpeg|png|webp|gif)$/i) || value.includes("/image/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Uploaded asset"
                className="w-14 h-14 object-cover rounded-lg border border-slate-200"
              />
            ) : (
              <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold text-xs">
                FILE
              </div>
            )}
            <div className="truncate">
              <span className="text-xs font-semibold text-slate-800 block truncate">
                {value}
              </span>
              <span className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
                Uploaded to Cloudinary
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
            title="Remove media"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center bg-slate-50/50 hover:bg-blue-50/20 transition cursor-pointer">
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              {isUploading ? (
                <span className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
              ) : (
                <UploadCloud className="w-5 h-5" />
              )}
            </div>
            <div className="text-xs font-bold text-slate-700">
              {isUploading ? "Uploading to Cloudinary..." : "Click or drag file to upload"}
            </div>
            <p className="text-[11px] text-slate-400">
              Supports Images (JPG, PNG), Videos (MP4), and Documents (PDF)
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-xs text-red-600 flex items-center gap-1.5 mt-1 bg-red-50 p-2 rounded-lg border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
