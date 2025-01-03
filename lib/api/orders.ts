import { supabase } from '@/lib/supabase';
import { OrderDetails, ContactDetails } from '@/types/order';

export async function createOrder(
  orderDetails: OrderDetails,
  contactDetails: ContactDetails,
  userId: string
) {
  try {
    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        type: orderDetails.type,
        servings: orderDetails.servings,
        occasion: orderDetails.occasion,
        delivery_date: orderDetails.deliveryDate.toISOString(),
        description: orderDetails.description,
        allergy_info: orderDetails.allergyInfo,
        status: 'pending',
        contact_email: contactDetails.email,
        contact_name: contactDetails.name,
        contact_phone: contactDetails.phone,
        delivery_address: contactDetails.address
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      throw new Error('Failed to create order');
    }

    // Handle image uploads if present
    if (orderDetails.referenceImages?.length) {
      const imagePromises = orderDetails.referenceImages.map(async (file) => {
        const fileName = `${order.id}/${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('order-images')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Image upload error:', uploadError);
          return null;
        }

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

      await Promise.allSettled(imagePromises);
    }

    return order;
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
}