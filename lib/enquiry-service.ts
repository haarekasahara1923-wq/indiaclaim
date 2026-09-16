/**
 * enquiry-service.ts
 *
 * Isolated "send enquiry notification" logic.
 * Currently implements wa.me deep-link approach (zero-cost, instant).
 *
 * TO SWAP TO WHATSAPP CLOUD API:
 *   1. Replace the `sendEnquiryNotification` function body with a fetch()
 *      call to the WhatsApp Cloud API messages endpoint.
 *   2. Add WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_TOKEN to .env.
 *   3. No other files need to change.
 */

export interface EnquiryData {
  name: string;
  whatsappNumber: string;
  purpose: string;
  adminWhatsapp?: string;
}

/**
 * Build the wa.me URL that pre-fills a message to the admin's WhatsApp.
 * This opens WhatsApp on the user's device with the message ready to send.
 */
export function buildWhatsAppDeepLink(data: EnquiryData): string {
  const adminNumber =
    data.adminWhatsapp ??
    process.env.NEXT_PUBLIC_ADMIN_WHATSAPP ??
    "917566842783";

  const message = encodeURIComponent(
    `Hi India Claim, my name is ${data.name}. I need help with: ${data.purpose}. Please contact me on ${data.whatsappNumber}.`
  );

  return `https://wa.me/${adminNumber}?text=${message}`;
}

/**
 * Server-side notification (currently a no-op — wa.me is client-side only).
 * Replace this function's body to integrate WhatsApp Cloud API.
 */
export async function sendEnquiryNotification(
  _data: EnquiryData
): Promise<{ success: boolean; message: string }> {
  // Void parameter to avoid unused var warning while keeping signature ready for API integration
  void _data;
  return { success: true, message: "Enquiry saved. wa.me link will open client-side." };
}
