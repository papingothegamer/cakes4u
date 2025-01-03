import { OrderDetails, ContactDetails } from "@/types/order";

export async function sendOrderEmails(
  orderId: string,
  orderDetails: OrderDetails,
  contactDetails: ContactDetails
) {
  const response = await fetch("/api/send-order-emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId,
      orderDetails,
      contactDetails,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to send order confirmation emails");
  }

  return response.json();
}

