import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const galleryTypeEnum = pgEnum("gallery_type", [
  "image",
  "video",
  "pdf",
]);

export const enquirySourceEnum = pgEnum("enquiry_source", [
  "whatsapp_widget",
  "contact_form",
]);

export const enquiryStatusEnum = pgEnum("enquiry_status", [
  "new",
  "contacted",
  "closed",
]);

// ─── Tables ───────────────────────────────────────────────────────────────────

/** Admin users — supports multiple admins (v1 uses single account) */
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }).notNull().default("Admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Singleton site settings row (id = 1 always) */
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  logoUrl: text("logo_url"),
  siteTitle: varchar("site_title", { length: 255 })
    .notNull()
    .default("India Claim"),
  tagline: text("tagline").default(
    "All in One Insurance Solution Platform — Insurance & Claim Expert with Legal Law Adviser"
  ),
  phone: varchar("phone", { length: 20 }).default("+91 75668 42783"),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }).default(
    "917566842783"
  ),
  email: varchar("email", { length: 255 }).default("info@indiaclaim.com"),
  address: text("address").default(
    "101, Mahipat Plaza, Thatipur, Gwalior – 474011"
  ),
  businessHours: text("business_hours").default(
    "Mon–Sat: 10:00 AM – 7:00 PM"
  ),
  mapEmbedUrl: text("map_embed_url"),
  socialLinks: jsonb("social_links")
    .$type<Record<string, string>>()
    .default({}),
  metaDescription: text("meta_description").default(
    "India Claim — Your trusted insurance claim consultancy. We help with insurance claims, mis-selling, delayed claims, and short-settled claims across Term, Health, Life, Motor, and Travel insurance."
  ),
});

/** Singleton hero section settings */
export const heroSettings = pgTable("hero_settings", {
  id: serial("id").primaryKey(),
  headline: text("headline")
    .notNull()
    .default("India Claim — Your Insurance Claim Expert"),
  subheadline: text("subheadline").default(
    "All in One Insurance Solution Platform. We fight for your rightful claim — No Win, No Fee."
  ),
  heroImageUrl: text("hero_image_url"),
  ctaText: varchar("cta_text", { length: 100 }).default(
    "Free Claim Consultation"
  ),
  ctaLink: varchar("cta_link", { length: 255 }).default("/contact"),
  // Stats JSON: [{ label: "Claims Settled", value: "500+" }, ...]
  stats: jsonb("stats")
    .$type<Array<{ label: string; value: string }>>()
    .default([
      { label: "Claims Settled", value: "500+" },
      { label: "Happy Clients", value: "1000+" },
      { label: "Years Experience", value: "10+" },
    ]),
});

/** Insurance services offered */
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  iconUrl: text("icon_url"),
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

/** Insurance categories (Term/Health/Life/Motor/Travel etc.) */
export const insuranceCategories = pgTable("insurance_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  iconUrl: text("icon_url"),
  displayOrder: integer("display_order").notNull().default(0),
});

/** Gallery items — images, videos, PDFs */
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  type: galleryTypeEnum("type").notNull().default("image"),
  url: text("url").notNull(),
  cloudinaryPublicId: text("cloudinary_public_id"),
  caption: text("caption"),
  category: varchar("category", { length: 100 }).default("Photos"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Client testimonials */
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  photoUrl: text("photo_url"),
  message: text("message").notNull(),
  rating: integer("rating").default(5),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Singleton About Us content */
export const aboutContent = pgTable("about_content", {
  id: serial("id").primaryKey(),
  storyRichtext: text("story_richtext").default(
    "<p>India Claim se khareedi gayi har prakar ki policy par aapko claim guarantee sahayata pradan ki jaati hai. Hamare yahan sabhi prakar ke beema claim dilvaane evam aapko jhoothi jaankari dekar bechi gayi policy ka paisa vaapas karvaane se sambandhit karya kiye jaate hain.</p>"
  ),
  founderName: varchar("founder_name", { length: 255 }).default(
    "Devesh Sharma"
  ),
  founderDesignation: varchar("founder_designation", { length: 255 }).default(
    "Co-Founder, India Claim"
  ),
  founderPhotoUrl: text("founder_photo_url"),
  founderBio: text("founder_bio").default(
    "With years of experience in insurance advisory and legal claim processes, Devesh Sharma founded India Claim to empower policyholders and ensure they receive the rightful claim amounts they deserve."
  ),
  // Why choose us: [{ title: "...", description: "..." }, ...]
  whyChooseUs: jsonb("why_choose_us")
    .$type<Array<{ title: string; description: string }>>()
    .default([
      {
        title: "No Win No Fee",
        description:
          "We charge our fee only after your claim amount is credited to your account. Zero risk for you.",
      },
      {
        title: "Expert Claim Advisors",
        description:
          "Our team has deep expertise in insurance law and claim settlement across all insurance types.",
      },
      {
        title: "All Insurance Types",
        description:
          "Term, Health, Life, Motor, and Travel insurance — we handle claims across all categories.",
      },
      {
        title: "Legal Support",
        description:
          "We provide full legal advisory support including IRDAI complaints, consumer forum representation, and more.",
      },
    ]),
});

/** Enquiries from WhatsApp widget and contact form */
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  purpose: text("purpose"),
  message: text("message"),
  source: enquirySourceEnum("source").notNull().default("whatsapp_widget"),
  status: enquiryStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Admin = typeof admins.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type HeroSettings = typeof heroSettings.$inferSelect;
export type Service = typeof services.$inferSelect;
export type InsuranceCategory = typeof insuranceCategories.$inferSelect;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type AboutContent = typeof aboutContent.$inferSelect;
export type Enquiry = typeof enquiries.$inferSelect;

export type NewService = typeof services.$inferInsert;
export type NewInsuranceCategory = typeof insuranceCategories.$inferInsert;
export type NewGalleryItem = typeof galleryItems.$inferInsert;
export type NewTestimonial = typeof testimonials.$inferInsert;
export type NewEnquiry = typeof enquiries.$inferInsert;
