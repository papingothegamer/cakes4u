import { OrderDetails, ContactDetails } from "@/types/order";
import { format } from "date-fns";

export function generateMailtoLink(
  orderDetails: OrderDetails,
  contactDetails: ContactDetails
) {
  const subject = encodeURIComponent(`New Cake Order - ${orderDetails.occasion}`);
  
  const body = encodeURIComponent(`
Order Details:
- Type: ${orderDetails.type}
- Servings: ${orderDetails.servings}
- Occasion: ${orderDetails.occasion}
- Delivery Date: ${format(orderDetails.deliveryDate, "PPP")}
${orderDetails.allergyInfo ? `- Allergy Information: ${orderDetails.allergyInfo}` : ''}

Contact Information:
- Name: ${contactDetails.name}
- Email: ${contactDetails.email}
- Phone: ${contactDetails.phone}
- Address: ${contactDetails.address}
  `);

  return `mailto:cakes4ufoods@gmail.com?subject=${subject}&body=${body}`;
}