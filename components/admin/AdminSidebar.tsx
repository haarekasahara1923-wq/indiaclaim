"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  Settings,
  FileCheck2,
  FolderTree,
  Image as ImageIcon,
  Quote,
  FileText,
  UserCheck,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Enquiries & Leads", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Hero & Counters", href: "/admin/hero", icon: Sparkles },
  { name: "Site & Contact Info", href: "/admin/site-settings", icon: Settings },
  { name: "Services", href: "/admin/services", icon: FileCheck2 },
  { name: "Insurance Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Gallery & Proofs", href: "/admin/gallery", icon: ImageIcon },
  { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { name: "About Us & Story", href: "/admin/about", icon: FileText },
  { name: "Admin Security", href: "/admin/users", icon: UserCheck },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes (mobile nav click)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  const SidebarContent = () => (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-base font-black text-white block leading-none">
              India<span className="text-blue-500">Claim</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Control Panel
            </span>
          </div>
        </Link>
        {/* Close button — only on mobile */}
        <button
          className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
        >
          <span>View Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleSignOut}
          type="button"
          className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* ── DESKTOP: always-visible sidebar ── */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:min-h-screen lg:shrink-0">
        <SidebarContent />
      </div>

      {/* ── MOBILE: hamburger button (shown in header via portal / passed up) ── */}
      {/* We expose the trigger button — it lives inside layout.tsx mobile header */}
      {/* Drawer backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Hamburger toggle — fixed top-left on mobile */}
      <button
        className="lg:hidden fixed top-3 left-3 z-50 bg-slate-900 border border-slate-700 text-white p-2 rounded-xl shadow-lg"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </>
  );
}
