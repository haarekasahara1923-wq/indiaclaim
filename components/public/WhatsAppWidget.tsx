"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageSquare, X, Send, CheckCircle2 } from "lucide-react";
import { createEnquiry } from "@/actions/enquiries";
import { buildWhatsAppDeepLink } from "@/lib/enquiry-service";

const widgetSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  whatsappNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  purpose: z.string().min(1, "Please select a purpose"),
});

type WidgetFormValues = z.infer<typeof widgetSchema>;

const PURPOSES = [
  "Insurance Claim Assistance",
  "Mis-Selling / Policy Refund",
  "Delay in Claim Process",
  "Claim Short Settled",
  "Health Insurance Dispute",
  "Term / Life Claim Rejection",
  "Motor Insurance Claim Issue",
  "Other Legal & Claim Advisory",
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WidgetFormValues>({
    resolver: zodResolver(widgetSchema),
    defaultValues: {
      purpose: "Insurance Claim Assistance",
    },
  });

  const onSubmit = async (values: WidgetFormValues) => {
    setIsSubmitting(true);
    try {
      // 1. Save enquiry to database
      await createEnquiry({
        name: values.name,
        whatsappNumber: values.whatsappNumber,
        purpose: values.purpose,
        source: "whatsapp_widget",
      });

      // 2. Build and trigger wa.me deep link
      const waUrl = buildWhatsAppDeepLink({
        name: values.name,
        whatsappNumber: values.whatsappNumber,
        purpose: values.purpose,
      });

      // Open WhatsApp in a new tab/window
      window.open(waUrl, "_blank", "noopener,noreferrer");

      // 3. Show success state
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 300);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
        {/* Helper tooltip badge on desktop */}
        {!isOpen && (
          <div className="hidden sm:flex items-center bg-white border border-emerald-200 text-slate-800 text-xs font-semibold py-1.5 px-3 rounded-full shadow-lg animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-ping" />
            Direct Claim Help on WhatsApp
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp Claim Consultation"
          className="relative group bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ring-4 ring-emerald-400/30"
        >
          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 0C5.405 0 .027 5.378.027 12.004c0 2.116.551 4.183 1.6 6.002L.034 24l6.166-1.583a11.96 11.96 0 005.831 1.517h.005c6.626 0 12.004-5.378 12.004-12.004C24.04 5.378 18.657 0 12.031 0zm0 21.996h-.004a9.96 9.96 0 01-5.074-1.385l-.364-.216-3.766.966.99-3.666-.237-.377a9.948 9.948 0 01-1.528-5.314c0-5.508 4.482-9.99 9.988-9.99 2.668 0 5.176 1.039 7.062 2.925a9.932 9.932 0 012.926 7.065c0 5.508-4.482 9.99-9.995 9.99zm5.478-7.487c-.3-.15-1.777-.876-2.052-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.411-1.488-.891-.795-1.492-1.777-1.667-2.077-.175-.3-.019-.462.131-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525s-.675-1.626-.925-2.227c-.244-.585-.492-.506-.675-.515-.175-.009-.375-.011-.575-.011s-.525.075-.8.375c-.275.3-1.05 1.026-1.05 2.502 0 1.476 1.075 2.902 1.225 3.102.15.2 2.116 3.231 5.127 4.532.716.31 1.275.495 1.71.633.72.229 1.375.197 1.892.12.578-.086 1.777-.727 2.027-1.429.25-.702.25-1.303.175-1.429-.075-.126-.275-.201-.575-.351z" />
            </svg>
          )}
        </button>
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 pb-20 sm:pb-24 p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg leading-tight">
                      Chat with Claim Expert
                    </h3>
                    <p className="text-xs text-emerald-100 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block animate-pulse" />
                      Devesh Sharma (Co-Founder) Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3 bg-emerald-800/40 rounded-lg p-2 text-xs text-emerald-50 border border-emerald-500/30">
                🔒 <strong>No Win No Fee:</strong> Free consultation. Fees only after your claim is credited to your bank account.
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800">
                    Redirecting to WhatsApp...
                  </h4>
                  <p className="text-sm text-slate-600 mt-2">
                    Your enquiry has been saved. WhatsApp will open with your pre-filled message.
                  </p>
                  <div className="mt-6 flex flex-col gap-2">
                    <button
                      onClick={handleClose}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-slate-500 hover:underline"
                    >
                      Send another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      {...register("name")}
                      className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.name ? "border-red-400 bg-red-50/50" : "border-slate-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        {...register("whatsappNumber")}
                        className={`w-full px-3.5 py-2.5 border rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.whatsappNumber
                            ? "border-red-400 bg-red-50/50"
                            : "border-slate-300"
                        }`}
                      />
                    </div>
                    {errors.whatsappNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.whatsappNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Select Your Issue / Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("purpose")}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      {PURPOSES.map((purpose) => (
                        <option key={purpose} value={purpose}>
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:shadow-emerald-600/30"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Start Free WhatsApp Chat
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-2">
                    By submitting, you consent to receive claim assistance via WhatsApp.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
