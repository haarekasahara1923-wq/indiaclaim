CREATE TYPE "public"."enquiry_source" AS ENUM('whatsapp_widget', 'contact_form');--> statement-breakpoint
CREATE TYPE "public"."enquiry_status" AS ENUM('new', 'contacted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."gallery_type" AS ENUM('image', 'video', 'pdf');--> statement-breakpoint
CREATE TABLE "about_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"story_richtext" text DEFAULT '<p>India Claim se khareedi gayi har prakar ki policy par aapko claim guarantee sahayata pradan ki jaati hai. Hamare yahan sabhi prakar ke beema claim dilvaane evam aapko jhoothi jaankari dekar bechi gayi policy ka paisa vaapas karvaane se sambandhit karya kiye jaate hain.</p>',
	"founder_name" varchar(255) DEFAULT 'Devesh Sharma',
	"founder_designation" varchar(255) DEFAULT 'Co-Founder, India Claim',
	"founder_photo_url" text,
	"founder_bio" text DEFAULT 'With years of experience in insurance advisory and legal claim processes, Devesh Sharma founded India Claim to empower policyholders and ensure they receive the rightful claim amounts they deserve.',
	"why_choose_us" jsonb DEFAULT '[{"title":"No Win No Fee","description":"We charge our fee only after your claim amount is credited to your account. Zero risk for you."},{"title":"Expert Claim Advisors","description":"Our team has deep expertise in insurance law and claim settlement across all insurance types."},{"title":"All Insurance Types","description":"Term, Health, Life, Motor, and Travel insurance — we handle claims across all categories."},{"title":"Legal Support","description":"We provide full legal advisory support including IRDAI complaints, consumer forum representation, and more."}]'::jsonb
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"name" varchar(255) DEFAULT 'Admin' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"whatsapp_number" varchar(20) NOT NULL,
	"email" varchar(255),
	"purpose" text,
	"message" text,
	"source" "enquiry_source" DEFAULT 'whatsapp_widget' NOT NULL,
	"status" "enquiry_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "gallery_type" DEFAULT 'image' NOT NULL,
	"url" text NOT NULL,
	"cloudinary_public_id" text,
	"caption" text,
	"category" varchar(100) DEFAULT 'Photos',
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"headline" text DEFAULT 'India Claim — Your Insurance Claim Expert' NOT NULL,
	"subheadline" text DEFAULT 'All in One Insurance Solution Platform. We fight for your rightful claim — No Win, No Fee.',
	"hero_image_url" text,
	"cta_text" varchar(100) DEFAULT 'Free Claim Consultation',
	"cta_link" varchar(255) DEFAULT '/contact',
	"stats" jsonb DEFAULT '[{"label":"Claims Settled","value":"500+"},{"label":"Happy Clients","value":"1000+"},{"label":"Years Experience","value":"10+"}]'::jsonb
);
--> statement-breakpoint
CREATE TABLE "insurance_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"icon_url" text,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"icon_url" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo_url" text,
	"site_title" varchar(255) DEFAULT 'India Claim' NOT NULL,
	"tagline" text DEFAULT 'All in One Insurance Solution Platform — Insurance & Claim Expert with Legal Law Adviser',
	"phone" varchar(20) DEFAULT '+91 75668 42783',
	"whatsapp_number" varchar(20) DEFAULT '917566842783',
	"email" varchar(255) DEFAULT 'info@indiaclaim.com',
	"address" text DEFAULT '101, Mahipat Plaza, Thatipur, Gwalior – 474011',
	"business_hours" text DEFAULT 'Mon–Sat: 10:00 AM – 7:00 PM',
	"map_embed_url" text,
	"social_links" jsonb DEFAULT '{}'::jsonb,
	"meta_description" text DEFAULT 'India Claim — Your trusted insurance claim consultancy. We help with insurance claims, mis-selling, delayed claims, and short-settled claims across Term, Health, Life, Motor, and Travel insurance.'
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_name" varchar(255) NOT NULL,
	"photo_url" text,
	"message" text NOT NULL,
	"rating" integer DEFAULT 5,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
