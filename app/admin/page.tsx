import React from "react";
import Link from "next/link";
import { getEnquiries } from "@/actions/enquiries";
import { getServices } from "@/actions/services";
import { getTestimonials } from "@/actions/testimonials";
import { getGalleryItems } from "@/actions/gallery";
import {
  MessageSquare,
  FileCheck2,
  Quote,
  Image as ImageIcon,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [allEnquiries, services, testimonials, galleryItems] = await Promise.all([
    getEnquiries(),
    getServices(),
    getTestimonials(),
    getGalleryItems(),
  ]);

  const newEnquiries = allEnquiries.filter((e) => e.status === "new");
  const recentEnquiries = allEnquiries.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-black">
          Welcome to India Claim Control Panel
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
          Manage all website content, claim services, settlement proofs, and incoming leads in real time without redeploying the app.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Enquiries */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Leads / Enquiries
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {allEnquiries.length}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {newEnquiries.length} New Uncontacted
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Services
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {services.length}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Core Claim Offerings
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Client Testimonials
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {testimonials.length}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Public Reviews
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Quote className="w-6 h-6" />
          </div>
        </div>

        {/* Proofs & Media */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Gallery Media
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {galleryItems.length}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Settlement Proofs &amp; PDFs
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-black text-slate-900">
          Quick Content Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
          <Link
            href="/admin/enquiries"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition flex flex-col justify-between h-24"
          >
            <span className="text-slate-700">Manage Enquiries</span>
            <span className="text-blue-700 flex items-center gap-1">
              View Leads <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
          <Link
            href="/admin/services"
            className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition flex flex-col justify-between h-24"
          >
            <span className="text-slate-700">Add / Edit Services</span>
            <span className="text-emerald-700 flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
          <Link
            href="/admin/gallery"
            className="p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 transition flex flex-col justify-between h-24"
          >
            <span className="text-slate-700">Upload Settlement Proof</span>
            <span className="text-purple-700 flex items-center gap-1">
              Cloudinary <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
          <Link
            href="/admin/site-settings"
            className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition flex flex-col justify-between h-24"
          >
            <span className="text-slate-700">Update Phone &amp; Hours</span>
            <span className="text-amber-700 flex items-center gap-1">
              Settings <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-black text-slate-900 text-lg">
              Recent Leads &amp; Consultations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enquiries captured via the Floating WhatsApp widget and Contact page
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>View All ({allEnquiries.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No enquiries received yet. Test the floating WhatsApp widget on the homepage!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Client Name</th>
                  <th className="px-6 py-3.5">WhatsApp Mobile</th>
                  <th className="px-6 py-3.5">Issue / Purpose</th>
                  <th className="px-6 py-3.5">Source</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {enquiry.name}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://wa.me/91${enquiry.whatsappNumber}?text=${encodeURIComponent(
                          `Hi ${enquiry.name}, this is Devesh Sharma from India Claim regarding your enquiry for ${enquiry.purpose}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>+91 {enquiry.whatsappNumber}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {enquiry.purpose || "General Claim Enquiry"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                        {enquiry.source === "whatsapp_widget"
                          ? "WhatsApp Widget"
                          : "Contact Form"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          enquiry.status === "new"
                            ? "bg-emerald-100 text-emerald-800"
                            : enquiry.status === "contacted"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href="/admin/enquiries"
                        className="text-blue-700 hover:text-blue-900 font-bold"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
