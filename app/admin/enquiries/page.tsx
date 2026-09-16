"use client";

import React, { useState, useEffect } from "react";
import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/actions/enquiries";
import {
  MessageSquare,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EnquiryItem {
  id: number;
  name: string;
  whatsappNumber: string;
  email: string | null;
  purpose: string | null;
  message: string | null;
  source: "whatsapp_widget" | "contact_form";
  status: "new" | "contacted" | "closed";
  createdAt: Date | string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "new" | "contacted" | "closed"
  >("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(
    null
  );

  const loadData = async () => {
    setLoading(true);
    const data = await getEnquiries();
    setEnquiries(data as EnquiryItem[]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (
    id: number,
    newStatus: "new" | "contacted" | "closed"
  ) => {
    await updateEnquiryStatus(id, newStatus);
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    await deleteEnquiry(id);
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry(null);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter === "all") return true;
    return e.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Incoming Leads</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Enquiries &amp; Consultations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Leads received from the WhatsApp Floating Widget and Website Contact Form.
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "new", "contacted", "closed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition ${
                statusFilter === status
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status} (
              {status === "all"
                ? enquiries.length
                : enquiries.filter((e) => e.status === status).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Table + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <span className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin inline-block" />
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No enquiries found in &ldquo;{statusFilter}&rdquo; status.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Client</th>
                    <th className="px-5 py-3.5">WhatsApp Mobile</th>
                    <th className="px-5 py-3.5">Purpose / Issue</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredEnquiries.map((e) => (
                    <tr
                      key={e.id}
                      onClick={() => setSelectedEnquiry(e)}
                      className={`cursor-pointer transition ${
                        selectedEnquiry?.id === e.id
                          ? "bg-blue-50/80"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {e.name}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-emerald-700 font-semibold">
                          +91 {e.whatsappNumber}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 max-w-xs truncate">
                        {e.purpose || "General Advice"}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            e.status === "new"
                              ? "bg-emerald-100 text-emerald-800"
                              : e.status === "contacted"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-400">
                        {formatDate(e.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Enquiry Inspector */}
        <div className="lg:col-span-4">
          {selectedEnquiry ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-black text-slate-900 text-base">
                  Enquiry Details
                </h3>
                <button
                  onClick={() => handleDelete(selectedEnquiry.id)}
                  className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Client Info */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">
                    Client Name
                  </span>
                  <p className="font-black text-slate-900 text-sm">
                    {selectedEnquiry.name}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">
                    WhatsApp Number
                  </span>
                  <p className="font-bold text-emerald-700 text-sm">
                    +91 {selectedEnquiry.whatsappNumber}
                  </p>
                </div>

                {selectedEnquiry.email && (
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">
                      Email Address
                    </span>
                    <p className="text-slate-800">{selectedEnquiry.email}</p>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">
                    Source
                  </span>
                  <p className="text-slate-800 uppercase font-semibold">
                    {selectedEnquiry.source === "whatsapp_widget"
                      ? "Floating WhatsApp Widget"
                      : "Website Contact Form"}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">
                    Service / Purpose
                  </span>
                  <p className="font-bold text-slate-900">
                    {selectedEnquiry.purpose}
                  </p>
                </div>

                {selectedEnquiry.message && (
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">
                      Client Message / Details
                    </span>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed mt-1">
                      {selectedEnquiry.message}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div className="pt-3 border-t border-slate-100">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Update Lead Status
                </label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedEnquiry.id,
                      e.target.value as "new" | "contacted" | "closed"
                    )
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="new">🟢 New (Uncontacted)</option>
                  <option value="contacted">🔵 Contacted / In Review</option>
                  <option value="closed">⚪ Closed / Settled</option>
                </select>
              </div>

              {/* WhatsApp Deep Link Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/91${selectedEnquiry.whatsappNumber}?text=${encodeURIComponent(
                    `Hi ${selectedEnquiry.name}, this is Devesh Sharma from India Claim. We received your consultation request regarding ${selectedEnquiry.purpose}. How can we assist you today?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition"
                >
                  <span>Reply on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center text-slate-400 text-xs">
              Select any lead from the list to inspect details and respond.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
