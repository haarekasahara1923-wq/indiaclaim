# India Claim — All in One Insurance Solution Platform

A full-stack web application for **India Claim** — an insurance claim consultancy and legal law advisory service that helps clients recover delayed, rejected, short-settled, and mis-sold insurance claims across Term, Health, Life, Motor, and Travel insurance.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Neon PostgreSQL**, **Drizzle ORM**, **NextAuth v5 (Credentials)**, **Cloudinary Media**, and **Tailwind CSS**.

---

## 🌟 Key Features

### Public Marketing Pages
- **Home (`/`)**: Hero section with editable headline/subheadline, stat counters, "विशेष गारंटी" (*No Win No Fee*) banner, 4 core service cards, insurance categories strip, client reviews carousel, settlement proofs preview, and emergency CTAs.
- **About Us (`/about`)**: Company story, Co-Founder **Devesh Sharma** bio and photo, Hindi description copy, and editable "Why Choose Us" value propositions.
- **Services (`/services`)**: Full breakdown of 4 core services (*Insurance Claim, Mis-Selling, Delay in Claim Process, Claim Short Settled*) + 5 insurance categories (*Term, Health, Life, Motor, Travel*).
- **Gallery (`/gallery`)**: Masonry grid supporting images, videos, and PDFs with filter tabs (*Photos | Videos | Documents*) and custom lightbox.
- **Testimonials (`/testimonials`)**: Client reviews with star ratings and verified case settlement badges.
- **Contact Us (`/contact`)**: Interactive consultation form with 10-digit Indian mobile number validation, embedded Google Map of Thatipur, Gwalior head office, and click-to-call / click-to-WhatsApp buttons.

### Floating WhatsApp Enquiry Widget (Every Page)
- Persistent floating WhatsApp icon on all public pages.
- Modal captures **Name**, **WhatsApp Number**, and **Purpose**.
- Automatically saves the enquiry to the Neon database (`enquiries` table).
- Triggers a `wa.me` deep link redirect pre-filled with:
  ```
  Hi India Claim, my name is {Name}. I need help with: {Purpose}. Please contact me on {WhatsAppNumber}.
  ```
  sent to admin's WhatsApp number (`+91 75668 42783`).
- Notification logic isolated in `lib/enquiry-service.ts` for instant zero-effort swap to WhatsApp Cloud API when needed.

### Admin Control Panel (`/admin`)
Protected by NextAuth v5 credentials login (`/admin/login`).
- **Dashboard**: Real-time stats (total leads, uncontacted leads, active services, media count) and recent enquiries list.
- **Enquiries & Leads (`/admin/enquiries`)**: Full list with status filtering (`new`, `contacted`, `closed`), details inspector, and **"Reply on WhatsApp"** button.
- **Hero & Counters (`/admin/hero`)**: Edit headline, subheadline, CTAs, hero banner (Cloudinary), and manage stat counters.
- **Site Settings (`/admin/site-settings`)**: Manage phone numbers, WhatsApp destination, official email, office address, working hours, and Google Maps iframe embed.
- **Services CRUD (`/admin/services`)**: Add, edit, delete, reorder, and toggle visibility of service cards.
- **Insurance Categories (`/admin/categories`)**: Manage Term, Health, Life, Motor, and Travel verticals.
- **Gallery & Proofs (`/admin/gallery`)**: Upload and manage images, videos, and PDF sanction documents stored in Cloudinary.
- **Testimonials (`/admin/testimonials`)**: Add/edit client reviews with star ratings and visibility toggles.
- **About Us (`/admin/about`)**: Edit Hindi description copy, Devesh Sharma's bio and photo, and key advantage points.
- **Admin Security (`/admin/users`)**: Update admin password with bcrypt hashing.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Database**: Neon PostgreSQL (Serverless)
- **ORM**: Drizzle ORM + Drizzle Kit
- **Authentication**: NextAuth v5 (credentials-only, Edge-safe middleware)
- **Media Storage**: Cloudinary (Images, Videos, PDFs)
- **Styling**: Tailwind CSS (mobile-first, fully responsive)
- **Forms & Validation**: React Hook Form + Zod
- **Real-Time Updates**: Next.js Server Actions with `revalidatePath`

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/haarekasahara1923-wq/indiaclaim.git
cd indiaclaim
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```
Fill in your configuration:
```ini
# Neon PostgreSQL
DATABASE_URL="postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth v5 (generate secret with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Public WhatsApp destination number for leads
NEXT_PUBLIC_ADMIN_WHATSAPP="917566842783"
```

### 4. Apply Database Migrations & Seed Content
```bash
# Push schema tables to Neon
npm run db:push

# Seed default admin and brand content
npm run db:seed
```

Default Admin Credentials:
- **Email**: `admin@indiaclaim.com`
- **Password**: `indiaclaim@123`

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
Admin login is at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

---

## 📦 Deployment to Vercel

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete India Claim platform"
   git push origin main
   ```
2. In [Vercel](https://vercel.com), click **Add New Project** and import the `indiaclaim` repository.
3. Configure the **Environment Variables**:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (e.g. `https://www.indiaclaim.com` or your `.vercel.app` domain)
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NEXT_PUBLIC_ADMIN_WHATSAPP` (`917566842783`)
4. Click **Deploy**. Vercel will automatically build and deploy the app with CI/CD on every push to `main`.

---

## 📄 License
© 2024 India Claim (indiaclaim.com). All rights reserved.
Co-Founder: Devesh Sharma.
