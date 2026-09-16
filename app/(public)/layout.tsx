import React from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import TrustBadge from "@/components/public/TrustBadge";
import WhatsAppWidget from "@/components/public/WhatsAppWidget";
import { getSiteSettings } from "@/actions/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  const phone = settings?.phone || "+91 75668 42783";
  const whatsappNumber = settings?.whatsappNumber || "917566842783";
  const siteTitle = settings?.siteTitle || "India Claim";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        phone={phone}
        whatsappNumber={whatsappNumber}
        siteTitle={siteTitle}
      />
      <TrustBadge />
      <main className="flex-1">{children}</main>
      <Footer siteSettings={settings} />
      <WhatsAppWidget />
    </div>
  );
}
