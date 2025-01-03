import { OrderDetails, ContactDetails } from "@/types/order";
import { format } from "date-fns";

export function generateCustomerEmail(
  orderId: string,
  orderDetails: OrderDetails,
  contactDetails: ContactDetails
) {
  return {
    subject: `Order Confirmation - Cakes4U #${orderId}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order has been received and is being processed.</p>
      
      <h2>Order Details</h2>
      <ul>
        <li>Order ID: ${orderId}</li>
        <li>Type: ${orderDetails.type}</li>
        <li>Servings: ${orderDetails.servings}</li>
        <li>Occasion: ${orderDetails.occasion}</li>
        <li>Delivery Date: ${format(orderDetails.deliveryDate, "PPP")}</li>
      </ul>

      <h2>Delivery Information</h2>
      <p>
        ${contactDetails.name}<br />
        ${contactDetails.phone}<br />
        ${contactDetails.address}
      </p>

      <p>We'll keep you updated on the status of your order.</p>
      
      <p>Best regards,<br />The Cakes4U Team</p>
    `,
  };
}

export function generateBusinessEmail(
  orderId: string,
  orderDetails: OrderDetails,
  contactDetails: ContactDetails
) {
  return {
    subject: `New Order Received - #${orderId}`,
    html: `
      <h1>New Order Received</h1>
      
      <h2>Order Details</h2>
      <ul>
        <li>Order ID: ${orderId}</li>
        <li>Type: ${orderDetails.type}</li>
        <li>Servings: ${orderDetails.servings}</li>
        <li>Occasion: ${orderDetails.occasion}</li>
        <li>Delivery Date: ${format(orderDetails.deliveryDate, "PPP")}</li>
        <li>Description: ${orderDetails.description}</li>
        <li>Allergy Information: ${orderDetails.allergyInfo || "None provided"}</li>
      </ul>

      <h2>Customer Information</h2>
      <ul>
        <li>Name: ${contactDetails.name}</li>
        <li>Email: ${contactDetails.email}</li>
        <li>Phone: ${contactDetails.phone}</li>
        <li>Address: ${contactDetails.address}</li>
      </ul>
    `,
  };
}