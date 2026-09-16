import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "India Claim — Insurance Claim & Legal Law Adviser",
    template: "%s | India Claim",
  },
  description:
    "India Claim is an All in One Insurance Solution Platform providing expert claim recovery and legal advisory for delayed, rejected, short-settled, and mis-sold insurance policies.",
  keywords: [
    "India Claim",
    "Insurance Claim Expert",
    "Insurance Claim Consultant",
    "Mis-Selling Policy Refund",
    "Delayed Insurance Claim",
    "Short Settled Claim",
    "No Win No Fee Claim",
    "Gwalior Insurance Consultant",
    "Devesh Sharma India Claim",
    "Health Insurance Claim Rejection",
    "Term Insurance Claim Settlement",
  ],
  authors: [{ name: "Devesh Sharma" }],
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || "https://www.indiaclaim.com"
  ),
  openGraph: {
    title: "India Claim — Insurance Claim & Legal Law Adviser",
    description:
      "No Win No Fee: We only charge our fee after your claim amount is credited to your bank account.",
    url: "https://www.indiaclaim.com",
    siteName: "India Claim",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900 min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
