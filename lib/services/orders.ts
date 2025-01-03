import { supabase } from "@/lib/supabase";
import { OrderDetails, ContactDetails, OrderStatus } from "@/types/order";
import { uploadOrderImages } from "./storage";
import { sendOrderConfirmation, sendBusinessNotification } from "./email";

export async function createOrder(
  orderDetails: OrderDetails,
  contactDetails: ContactDetails,
  userId: string
) {
  try {
    // Create order record
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        type: orderDetails.type,
        servings: orderDetails.servings,
        occasion: orderDetails.occasion,
        delivery_date: orderDetails.deliveryDate,
        description: orderDetails.description,
        allergy_info: orderDetails.allergyInfo,
        status: "pending" as OrderStatus,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Handle image uploads
    if (orderDetails.referenceImages?.length) {
      const { results, errors } = await uploadOrderImages(
        order.id,
        orderDetails.referenceImages
      );

      // Store image references
      if (results.length > 0) {
        await supabase.from("order_images").insert(
          results.map((result) => ({
            order_id: order.id,
            image_url: result.url,
          }))
        );
      }
    }

    // Send notifications
    await Promise.all([
      sendOrderConfirmation(order.id, orderDetails, contactDetails),
      sendBusinessNotification(order.id, orderDetails, contactDetails),
    ]);

    return order;
  } catch (error) {
    console.error("Order creation failed:", error);
    throw error;
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId);

  if (error) throw error;
}