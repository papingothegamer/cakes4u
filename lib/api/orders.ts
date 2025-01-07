import { supabase } from '@/lib/supabase';
import { Order, OrderDetails, ContactDetails } from '@/types/order';

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}${random}`;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_images (
        id,
        image_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }

  return data || [];
}

export async function createOrder(
  orderDetails: OrderDetails,
  contactDetails: ContactDetails,
  userId: string
) {
  try {
    const orderNumber = generateOrderNumber();
    
    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
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
      await uploadOrderImages(order.id, orderDetails.referenceImages);
    }

    return order;
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
}

async function uploadOrderImages(orderId: string, files: File[]) {
  const imagePromises = files.map(async (file) => {
    const fileName = `${orderId}/${file.name}`;
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
        order_id: orderId,
        image_url: publicUrl,
      });
  });

  await Promise.allSettled(imagePromises);
}