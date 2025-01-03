import { OrderDetails, ContactDetails } from "@/types/order";

// In production, replace with actual SendGrid/AWS SES implementation
export async function sendOrderConfirmation(
  orderId: string,
  orderDetails: OrderDetails,
  contactDetails: ContactDetails
) {
  console.log("Sending order confirmation email", {
    to: contactDetails.email,
    orderId,
    orderDetails,
  });
}

export async function sendBusinessNotification(
  orderId: string,
  orderDetails: OrderDetails,
  contactDetails: ContactDetails
) {
  console.log("Sending business notification email", {
    to: "cakes4ufoods@gmail.com",
    orderId,
    orderDetails,
    contactDetails,
  });
}