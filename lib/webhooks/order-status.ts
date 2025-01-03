import { OrderStatus } from "@/types/order";
import { updateOrderStatus } from "@/lib/services/orders";

export async function handleOrderStatusWebhook(req: Request) {
  try {
    const { orderId, status, signature } = await req.json();

    // In production:
    // 1. Verify webhook signature
    // 2. Validate payload
    // 3. Handle idempotency
    
    await updateOrderStatus(orderId, status as OrderStatus);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}