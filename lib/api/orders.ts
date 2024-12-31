import { supabase } from '@/lib/supabase';
import { OrderDetails, ContactDetails } from '@/types/order';

export async function createOrder(
  orderDetails: OrderDetails,
  contactDetails: ContactDetails,
  userId: string
) {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      type: orderDetails.type,
      servings: orderDetails.servings,
      occasion: orderDetails.occasion,
      delivery_date: orderDetails.deliveryDate,
      description: orderDetails.description,
      allergy_info: orderDetails.allergyInfo,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Handle image uploads if present
  if (orderDetails.referenceImages?.length) {
    const imagePromises = orderDetails.referenceImages.map(async (file) => {
      const fileName = `${order.id}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('order-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('order-images')
        .getPublicUrl(fileName);

      return supabase
        .from('order_images')
        .insert({
          order_id: order.id,
          image_url: publicUrl,
        });
    });

    await Promise.all(imagePromises);
  }

  // Send email notification
  await sendOrderNotification(order.id, orderDetails, contactDetails);

  return order;
}

export async function getUserOrders(userId: string) {
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_images (
        image_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return orders;
}

async function sendOrderNotification(
  orderId: string,
  orderDetails: OrderDetails,
  contactDetails: ContactDetails
) {
  // In a real application, you would integrate with an email service
  // For now, we'll use mailto as specified
  const subject = `New Cake Order - ${orderDetails.type} for ${orderDetails.occasion}`;
  const body = `
Order #${orderId}

Order Details:
- Type: ${orderDetails.type}
- Servings: ${orderDetails.servings}
- Occasion: ${orderDetails.occasion}
- Delivery Date: ${orderDetails.deliveryDate.toLocaleDateString()}
- Description: ${orderDetails.description}
- Allergy Information: ${orderDetails.allergyInfo || 'None provided'}

Contact Information:
- Name: ${contactDetails.name}
- Email: ${contactDetails.email}
- Phone: ${contactDetails.phone}
- Address: ${contactDetails.address}
  `;

  // For development, return the email content
  return { subject, body };
}