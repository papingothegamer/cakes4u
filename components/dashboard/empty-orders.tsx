import Link from "next/link";
import { CakeSlice } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyOrders() {
  return (
    <div className="text-center py-12">
      <CakeSlice className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-semibold text-gray-900">No orders yet</h3>
      <p className="mt-2 text-sm text-gray-600">
        Get started by creating your first custom cake order.
      </p>
      <Button asChild className="mt-6">
        <Link href="/order">Place Your First Order</Link>
      </Button>
    </div>
  );
}