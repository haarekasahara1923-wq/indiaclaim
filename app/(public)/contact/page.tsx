import React from "react";
import { getSiteSettings } from "@/actions/settings";
import ContactForm from "@/components/public/ContactForm";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Scale,
} from "lucide-react";

export const revalidate = 0;

interface ContactPageProps {
  searchParams: {
    service?: string;
    category?: string;
  };
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const settings = await getSiteSettings();

  const phone = settings?.phone || "+91 75668 42783";
  const whatsappNumber = settings?.whatsappNumber || "917566842783";
  const email = settings?.email || "info@indiaclaim.com";
  const address =
    settings?.address || "101, Mahipat Plaza, Thatipur, Gwalior – 474011";
  const businessHours =
    settings?.businessHours || "Mon – Sat: 10:00 AM – 7:00 PM (Sunday Closed)";
  const mapEmbedUrl =
    settings?.mapEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.5488172901977!2d78.1993214!3d26.2113337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6bbd7c67fa7%3A0x633519d5c80a221f!2sThatipur%2C%20Gwalior%2C%20Madhya%20Pradesh%20474011!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  const initialService = searchParams?.service;
  const initialCategory = searchParams?.category;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-amber-400/30">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Direct Claim Consultation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Contact India Claim Experts
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Reach out via phone, WhatsApp, or submit your case details below. We examine claim papers with zero upfront fee.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
            {/* Left Column: Contact Cards & Office Details */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Touchpoints */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                  Direct Touchpoints
                </h3>

                {/* Click to Call */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Call Expert Directly
                    </h4>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-base sm:text-lg font-black text-slate-900 hover:text-blue-700 transition"
                    >
                      {phone}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Available during business hours
                    </p>
                  </div>
                </div>

                {/* Click to WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      WhatsApp Quick Chat
                    </h4>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        "Hi India Claim, I need help with an insurance claim issue."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-black text-emerald-600 hover:underline"
                    >
                      +91 {whatsappNumber.slice(2)}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fast response &amp; document sharing
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Email Inquiries
                    </h4>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm sm:text-base font-bold text-slate-900 hover:text-purple-600 transition"
                    >
                      {email}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Send policy documents &amp; rejection letters
                    </p>
                  </div>
                </div>

                {/* Head Office */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Head Office Address
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {address}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Working Hours
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {businessHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badge Reminder */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <span>Our &ldquo;No Win, No Fee&rdquo; Commitment</span>
                </div>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  You never pay any consultation fees upfront. We only charge our fee after your insurance claim amount is credited into your bank account.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm
                initialService={initialService}
                initialCategory={initialCategory}
              />
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="mt-16 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Locate Our Head Office
                </h3>
                <p className="text-xs text-slate-500">
                  {address}
                </p>
              </div>
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                Thatipur, Gwalior
              </span>
            </div>

            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="India Claim Office Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
