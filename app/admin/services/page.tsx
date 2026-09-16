"use client";

import React, { useState, useEffect } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/actions/services";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  FileCheck2,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  description: string | null;
  iconUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setTitle("");
    setDescription("");
    setIconUrl("");
    setDisplayOrder(services.length + 1);
    setIsActive(true);
    setIsCreating(true);
    setError(null);
  };

  const openEditModal = (service: ServiceItem) => {
    setIsCreating(false);
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description || "");
    setIconUrl(service.iconUrl || "");
    setDisplayOrder(service.displayOrder);
    setIsActive(service.isActive);
    setError(null);
  };

  const closeModal = () => {
    setIsCreating(false);
    setEditingService(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isCreating) {
        const res = await createService({
          title,
          description,
          iconUrl,
          displayOrder,
          isActive,
        });
        if (!res.success) throw new Error("Failed to create service");
      } else if (editingService) {
        const res = await updateService(editingService.id, {
          title,
          description,
          iconUrl,
          displayOrder,
          isActive,
        });
        if (!res.success) throw new Error("Failed to update service");
      }

      setMessage("Service saved successfully (Live on website)!");
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
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    await deleteService(id);
    setMessage("Service deleted.");
    setTimeout(() => setMessage(null), 3000);
    await loadData();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" />
            <span>Offerings</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Manage Core Claim Services
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, edit, or toggle active state of services shown on the public site.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow transition hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <span className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin inline-block" />
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No services configured. Click &quot;Add New Service&quot; above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Order</th>
                  <th className="px-6 py-3.5">Service Title</th>
                  <th className="px-6 py-3.5">Description</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-400">
                      #{service.displayOrder}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                      {service.title}
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-md truncate">
                      {service.description}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          service.isActive
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {service.isActive ? (
                          <>
                            <Eye className="w-3 h-3" /> Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="text-blue-700 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-50 transition"
                        title="Edit Service"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {(isCreating || editingService) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="font-black text-lg text-slate-900">
                {isCreating ? "Add New Core Service" : "Edit Service Details"}
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
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Insurance Claim"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of the claim assistance provided..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Visibility Status
                  </label>
                  <select
                    value={isActive ? "true" : "false"}
                    onChange={(e) => setIsActive(e.target.value === "true")}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="true">Active (Visible)</option>
                    <option value="false">Hidden (Inactive)</option>
                  </select>
                </div>
              </div>

              {/* Media Icon Upload */}
              <ImageUploader
                value={iconUrl}
                onChange={(url) => setIconUrl(url)}
                label="Custom Service Icon / Graphic (Optional)"
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
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
