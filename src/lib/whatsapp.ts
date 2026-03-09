import type { CartLineItem } from "@/features/cart/store/cart.store";
import { formatPrice } from "@/lib/utils";

/**
 * Set NEXT_PUBLIC_WHATSAPP_PHONE in your .env.local file.
 * Include the country code without + or spaces, e.g. "14155552671"
 */
const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "1234567890";

export function generateWhatsAppCheckout(items: CartLineItem[]): string {
  const lineItems = items
    .map((item) => {
      const size = item.size ? ` — Size: ${item.size}` : "";
      const lineTotal = formatPrice(item.product.price * item.quantity);
      return `• ${item.product.name}${size}\n  Qty: ${item.quantity}  |  ${lineTotal}`;
    })
    .join("\n\n");

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const message = [
    "Hello! I want to order:",
    "",
    lineItems,
    "",
    `Total: ${formatPrice(total)}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
