import { z } from "zod";

// ─── Enquiry ─────────────────────────────────────────────────────────────────

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  whatsappNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  purpose: z.string().min(1, "Please select a purpose"),
  message: z.string().optional(),
  source: z
    .enum(["whatsapp_widget", "contact_form"])
    .default("whatsapp_widget"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

// ─── Contact Form ─────────────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  whatsappNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  purpose: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// ─── Service ─────────────────────────────────────────────────────────────────

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  iconUrl: z.string().url().optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

// ─── Insurance Category ───────────────────────────────────────────────────────

export const categorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  iconUrl: z.string().optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;

// ─── Testimonial ──────────────────────────────────────────────────────────────

export const testimonialSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  photoUrl: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Testimonial message is required"),
  rating: z.number().int().min(1).max(5).default(5),
  isActive: z.boolean().default(true),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

// ─── Admin Login ──────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─── Change Password ──────────────────────────────────────────────────────────

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
