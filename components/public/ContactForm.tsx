"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { createEnquiry } from "@/actions/enquiries";
import { buildWhatsAppDeepLink } from "@/lib/enquiry-service";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  whatsappNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  purpose: z.string().min(1, "Please select an issue type"),
  message: z.string().min(10, "Please describe your issue in at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  initialService?: string;
  initialCategory?: string;
}

export default function ContactForm({
  initialService,
  initialCategory,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState<FormValues | null>(null);

  const defaultPurpose =
    initialService || initialCategory || "Insurance Claim Assistance";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: defaultPurpose,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await createEnquiry({
        name: values.name,
        whatsappNumber: values.whatsappNumber,
        email: values.email || undefined,
        purpose: values.purpose,
        message: values.message,
        source: "contact_form",
      });

      if (res.success) {
        setIsSuccess(true);
        setLastSubmitted(values);
        reset();
      } else {
        setErrorMsg("Failed to send consultation request. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 border border-amber-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>No Win — No Fee Consultation</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Get Free Claim Consultation
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Submit your insurance claim or dispute details. Our legal and claim advisory team will review your case and contact you within 2-4 hours.
        </p>
      </div>

      {isSuccess ? (
        <div className="text-center py-8 bg-emerald-50/60 rounded-2xl border border-emerald-200 p-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h4 className="text-xl font-bold text-slate-900">
            Consultation Request Received!
          </h4>
          <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
            Thank you, {lastSubmitted?.name}. We have logged your request in our system. Our legal advisor Devesh Sharma and team will review your case documents shortly.
          </p>

          {lastSubmitted && (
            <div className="mt-6">
              <a
                href={buildWhatsAppDeepLink({
                  name: lastSubmitted.name,
                  whatsappNumber: lastSubmitted.whatsappNumber,
                  purpose: `${lastSubmitted.purpose}: ${lastSubmitted.message}`,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md transition hover:scale-105"
              >
                <span>Instant Connect on WhatsApp</span>
              </a>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="mt-4 text-xs font-semibold text-slate-500 hover:underline block mx-auto"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Kumar"
              {...register("name")}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.name ? "border-red-400 bg-red-50/50" : "border-slate-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                WhatsApp Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit number"
                  {...register("whatsappNumber")}
                  className={`w-full px-4 py-3 border rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
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

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                placeholder="ramesh@example.com"
                {...register("email")}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Purpose / Service */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Service / Issue Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("purpose")}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Insurance Claim Assistance">Insurance Claim Assistance</option>
              <option value="Mis-Selling / Premium Refund">Mis-Selling / Policy Refund</option>
              <option value="Delay in Claim Process">Delay in Claim Process</option>
              <option value="Claim Short Settled">Claim Short Settled / Deduction Dispute</option>
              <option value="Health Insurance (Mediclaim)">Health Insurance Dispute</option>
              <option value="Term Insurance Rejection">Term Insurance Rejection</option>
              <option value="Life Insurance / ULIP Dispute">Life Insurance Dispute</option>
              <option value="Motor Insurance Own Damage">Motor Insurance Issue</option>
              <option value="Other Legal Advisory">Other Legal Advisory</option>
            </select>
          </div>

          {/* Message / Details */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Case Details / Insurance Company Name <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Describe your policy type, claim amount, insurance company name, and reason cited for rejection or delay..."
              {...register("message")}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.message ? "border-red-400 bg-red-50/50" : "border-slate-300"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 disabled:opacity-70 text-white font-extrabold py-3.5 px-6 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting Request...
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Free Consultation Request
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-slate-400">
            🔒 Strictly confidential. We will never share your personal information.
          </p>
        </form>
      )}
    </div>
  );
}
