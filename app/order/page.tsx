import { OrderSteps } from "@/components/order/order-steps";

export default function OrderPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Create Your Custom Order</h1>
          <p className="mt-4 text-gray-600">
            Tell us about your dream cake and we'll make it a reality
          </p>
        </div>
        <OrderSteps />
      </div>
    </div>
  );
}