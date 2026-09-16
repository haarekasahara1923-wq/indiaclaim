import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";
import bcrypt from "bcryptjs";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is missing!");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Starting database seed for India Claim...");

  try {
    // ── 1. Admin User ──────────────────────────────────────────────────────────
    console.log("Creating default admin user...");
    const hashedPassword = await bcrypt.hash("IndiaClAim@2024", 10);
    const existingAdmins = await db.select().from(schema.admins).limit(1);

    if (existingAdmins.length === 0) {
      await db.insert(schema.admins).values({
        email: "admin@indiaclaim.com",
        passwordHash: hashedPassword,
        name: "India Claim Admin",
      });
      console.log("✅ Admin created: admin@indiaclaim.com");
    } else {
      console.log("ℹ️ Admin already exists, skipping creation.");
    }

    // ── 2. Site Settings ───────────────────────────────────────────────────────
    console.log("Creating site settings...");
    const existingSettings = await db.select().from(schema.siteSettings).limit(1);

    if (existingSettings.length === 0) {
      await db.insert(schema.siteSettings).values({
        siteTitle: "India Claim",
        tagline:
          "All in One Insurance Solution Platform — Insurance & Claim Expert with Legal Law Adviser",
        phone: "+91 75668 42783",
        whatsappNumber: "917566842783",
        email: "info@indiaclaim.com",
        address: "101, Mahipat Plaza, Thatipur, Gwalior – 474011",
        businessHours: "Mon – Sat: 10:00 AM – 7:00 PM (Sunday Closed)",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.5488172901977!2d78.1993214!3d26.2113337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6bbd7c67fa7%3A0x633519d5c80a221f!2sThatipur%2C%20Gwalior%2C%20Madhya%20Pradesh%20474011!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        socialLinks: {
          facebook: "https://facebook.com/indiaclaim",
          instagram: "https://instagram.com/indiaclaim",
          linkedin: "https://linkedin.com/company/indiaclaim",
          twitter: "https://twitter.com/indiaclaim",
        },
        metaDescription:
          "India Claim is an All in One Insurance Solution Platform and Claim Expert with Legal Law Advisory. We resolve delayed, short-settled, and mis-sold claims across Term, Health, Life, Motor, and Travel Insurance.",
      });
      console.log("✅ Site settings seeded.");
    } else {
      console.log("ℹ️ Site settings already exist, skipping.");
    }

    // ── 3. Hero Settings ───────────────────────────────────────────────────────
    console.log("Creating hero settings...");
    const existingHero = await db.select().from(schema.heroSettings).limit(1);

    if (existingHero.length === 0) {
      await db.insert(schema.heroSettings).values({
        headline: "India Claim — All in One Insurance Solution Platform",
        subheadline:
          "Insurance & Claim Expert with Legal Law Adviser. We help you recover your rightful claim money — No Win, No Fee.",
        ctaText: "Free Claim Consultation",
        ctaLink: "/contact",
        stats: [
          { label: "Claims Settled", value: "500+" },
          { label: "Claim Recovery Rate", value: "98%" },
          { label: "Years Experience", value: "10+" },
          { label: "Happy Clients", value: "1,200+" },
        ],
      });
      console.log("✅ Hero settings seeded.");
    } else {
      console.log("ℹ️ Hero settings already exist, skipping.");
    }

    // ── 4. Core Services ───────────────────────────────────────────────────────
    console.log("Creating core services...");
    const existingServices = await db.select().from(schema.services).limit(1);

    if (existingServices.length === 0) {
      const coreServices = [
        {
          title: "Insurance Claim",
          description:
            "Complete assistance and legal consultation for filing, processing, and settling all types of insurance claims with maximum approved amount.",
          displayOrder: 1,
          isActive: true,
        },
        {
          title: "Mis-Selling",
          description:
            "Sold an inappropriate policy or false promises made by an agent? We assist you in getting a 100% refund of your invested premium.",
          displayOrder: 2,
          isActive: true,
        },
        {
          title: "Delay in Claim Process",
          description:
            "Is the insurance company needlessly delaying your claim settlement? We take immediate legal and ombudsman action to expedite approval.",
          displayOrder: 3,
          isActive: true,
        },
        {
          title: "Claim Short Settled",
          description:
            "Did the insurer approve only a fraction of your claim citing vague exclusions? We dispute wrongful deductions and recover the remaining balance.",
          displayOrder: 4,
          isActive: true,
        },
      ];

      for (const service of coreServices) {
        await db.insert(schema.services).values(service);
      }
      console.log("✅ 4 Core services seeded.");
    } else {
      console.log("ℹ️ Services already exist, skipping.");
    }

    // ── 5. Insurance Categories ────────────────────────────────────────────────
    console.log("Creating insurance categories...");
    const existingCats = await db
      .select()
      .from(schema.insuranceCategories)
      .limit(1);

    if (existingCats.length === 0) {
      const categories = [
        {
          name: "Term Insurance",
          description:
            "Death claim rejection assistance, non-disclosure disputes, and delayed claim resolution for high-cover term plans.",
          displayOrder: 1,
        },
        {
          name: "Health Insurance",
          description:
            "Cashless denial, reimbursement rejection, pre-existing disease disputes, room rent deductions, and claim settlement.",
          displayOrder: 2,
        },
        {
          name: "Life Insurance",
          description:
            "Traditional endowment, ULIPs, money-back policy mis-selling refund, and death benefit claim assistance.",
          displayOrder: 3,
        },
        {
          name: "Motor Insurance",
          description:
            "Own damage claims, total loss disputes, surveyor discrepancy resolutions, and third-party liability claims.",
          displayOrder: 4,
        },
        {
          name: "Travel Insurance",
          description:
            "Overseas medical emergency claims, baggage loss, flight cancellation, and repatriation dispute resolutions.",
          displayOrder: 5,
        },
      ];

      for (const cat of categories) {
        await db.insert(schema.insuranceCategories).values(cat);
      }
      console.log("✅ 5 Insurance categories seeded.");
    } else {
      console.log("ℹ️ Insurance categories already exist, skipping.");
    }

    // ── 6. About Us Content ────────────────────────────────────────────────────
    console.log("Creating about content...");
    const existingAbout = await db.select().from(schema.aboutContent).limit(1);

    if (existingAbout.length === 0) {
      await db.insert(schema.aboutContent).values({
        storyRichtext: `<h2>Who We Are</h2>
<p>India Claim se khareedi gayi har prakar ki policy par aapko claim guarantee sahayata pradan ki jaati hai. Hamare yahan sabhi prakar ke beema claim dilvaane evam aapko jhoothi jaankari dekar bechi gayi policy ka paisa vaapas karvaane se sambandhit karya kiye jaate hain.</p>
<p>India Claim is India's dedicated insurance claim consultancy and legal advisory platform. We bridge the gap between policyholders and complex insurance companies, fighting tooth and nail to secure the compensation you legally deserve.</p>
<h3>Our Guarantee: No Win, No Fee</h3>
<p><strong>Vishesh:</strong> Jab aapka paisa aapke khaate mein aa jaata hai, uske baad hi hum fees lete hain. (We only charge our consultation fee after your claim money is credited to your bank account.)</p>`,
        founderName: "Devesh Sharma",
        founderDesignation: "Co-Founder, India Claim",
        founderPhotoUrl: null,
        founderBio:
          "Devesh Sharma is an experienced Insurance & Claim Expert with Legal Law Advisory background. Having witnessed countless policyholders struggle with wrongful claim denials and fraudulent agent mis-selling, he established India Claim in Gwalior to provide accessible, fear-free, and result-oriented claim recovery assistance across India.",
        whyChooseUs: [
          {
            title: "No Win — No Fee",
            description:
              "Zero upfront consultation fees. We charge our nominal fee only when your claim amount is credited into your bank account.",
          },
          {
            title: "Legal & Ombudsman Expertise",
            description:
              "Our team includes legal advisers well-versed with IRDAI regulations, Insurance Ombudsman procedures, and Consumer Court processes.",
          },
          {
            title: "All 5 Insurance Verticals",
            description:
              "Specialized claim expertise across Term, Health, Life, Motor, and Travel insurance policies.",
          },
          {
            title: "Pan-India Dedicated Support",
            description:
              "Quick resolution via WhatsApp, phone, and online tracking, serving policyholders nationwide from our central office in Gwalior.",
          },
        ],
      });
      console.log("✅ About content seeded.");
    } else {
      console.log("ℹ️ About content already exists, skipping.");
    }

    // ── 7. Testimonials ────────────────────────────────────────────────────────
    console.log("Creating initial testimonials...");
    const existingTestimonials = await db
      .select()
      .from(schema.testimonials)
      .limit(1);

    if (existingTestimonials.length === 0) {
      const sampleTestimonials = [
        {
          clientName: "Rajesh Verma",
          photoUrl: null,
          message:
            "Mera 8 lakh ka health insurance claim company ne reject kar diya tha. India Claim ki team ne IRDAI guidelines ke tehat case file kiya aur 3 hafte mein poora paisa account mein aa gaya!",
          rating: 5,
          isActive: true,
        },
        {
          clientName: "Sunita Gupta",
          photoUrl: null,
          message:
            "Agent ne galat ULIP policy bech di thi guarantee returns bol kar. Devesh ji aur India Claim ne mera 3 saal ka premium 100% refund karwaya. Truly grateful for their legal expertise!",
          rating: 5,
          isActive: true,
        },
        {
          clientName: "Amitabh Dubey",
          photoUrl: null,
          message:
            "Motor claim mein company ne 40% depreciation lagakar claim short-settle kiya tha. India Claim ne appeal ki aur baaki ka ₹65,000 bhi dila diya. Sabse achhi baat — unhone pehle koi fees nahi li!",
          rating: 5,
          isActive: true,
        },
      ];

      for (const t of sampleTestimonials) {
        await db.insert(schema.testimonials).values(t);
      }
      console.log("✅ Testimonials seeded.");
    } else {
      console.log("ℹ️ Testimonials already exist, skipping.");
    }

    console.log("\n🎉 Database seed completed successfully!");
  } catch (error) {
    console.error("❌ Error during seed:", error);
    process.exit(1);
  }
}

seed();
