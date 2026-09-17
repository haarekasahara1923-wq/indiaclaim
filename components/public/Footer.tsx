import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SiteSettings } from "@/lib/db/schema";

interface FooterProps {
  siteSettings?: SiteSettings | null;
}

export default function Footer({ siteSettings }: FooterProps) {
  const phone = siteSettings?.phone || "+91 75668 42783";
  const email = siteSettings?.email || "info@indiaclaim.com";
  const address =
    siteSettings?.address || "101, Mahipat Plaza, Thatipur, Gwalior – 474011";
  const businessHours =
    siteSettings?.businessHours ||
    "Mon – Sat: 10:00 AM – 7:00 PM (Sunday Closed)";
  const whatsappNumber = siteSettings?.whatsappNumber || "917566842783";

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 py-10 px-4 sm:px-6 lg:px-8 border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="bg-amber-400/20 text-amber-300 text-xs font-black uppercase px-3 py-1 rounded-full border border-amber-400/30">
              Claim Rejected or Delayed?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Don&apos;t Let Insurance Companies Keep Your Hard-Earned Money
            </h3>
            <p className="text-blue-200 text-sm mt-1 max-w-2xl">
              Talk to our Insurance &amp; Legal Law Adviser today. We fight for your rightful settlement on a <strong>No Win, No Fee</strong> basis.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-5 py-3 rounded-xl text-sm transition shadow-lg flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-700" />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hi India Claim, I need help with an insurance claim issue."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition shadow-lg flex items-center gap-2"
            >
              <span>WhatsApp Advice</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <ShieldAlert className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-xl font-black text-white">
                India<span className="text-blue-500">Claim</span>
              </span>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              &ldquo;India Claim se khareedi gayi har prakar ki policy par aapko claim guarantee sahayata pradan ki jaati hai. Hamare yahan sabhi prakar ke beema claim dilvaane evam aapko jhoothi jaankari dekar bechi gayi policy ka paisa vaapas karvaane se sambandhit karya kiye jaate hain.&rdquo;
            </p>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Trust Guarantee
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Fees only charged after the claim amount is credited to your bank account.
              </p>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Our Core Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>Insurance Claim Settlement</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>Mis-Selling &amp; Refund Recovery</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>Delay in Claim Process Action</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>Claim Short Settled Disputes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span>Legal Ombudsman Representation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Insurance Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Insurance Covered (सुविधा)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Term Insurance Claims</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Health Insurance (Mediclaim)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Life &amp; ULIP Insurance Recovery</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Motor (Car / Bike) Insurance</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Travel Insurance Emergency Claims</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Head Office &amp; Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="hover:text-white font-semibold"
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>
            &copy; {new Date().getFullYear()} India Claim (indiaclaim.com). All rights reserved. Founder: Devesh Sharma.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
            <Link
              href="/admin/login"
              className="text-slate-300 hover:text-white transition"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
