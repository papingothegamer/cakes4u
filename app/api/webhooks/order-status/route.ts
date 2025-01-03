import { handleOrderStatusWebhook } from "@/lib/webhooks/order-status";

export async function POST(req: Request) {
  return handleOrderStatusWebhook(req);
}