"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";
import { getUserOrders } from "@/lib/api/orders";
import { Order } from "@/types/order";
import { OrdersTable } from "@/components/dashboard/orders-table";
import { EmptyOrders } from "@/components/dashboard/empty-orders";

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/login");
      return;
    }

    async function loadOrders() {
      try {
        if (!user) return;
        const userOrders = await getUserOrders(user.id);
        setOrders(userOrders);
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : "An unknown error occurred while fetching orders";
        
        toast({
          title: "Error loading orders",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [user, authLoading, router, toast]);

  if (authLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (!user) {
    return <LoadingScreen message="Redirecting to login..." />;
  }

  const hasOrders = orders.length > 0;

  return (
    <div className="min-h-screen py-6 sm:py-12 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">My Orders</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            View and manage your cake orders
          </p>
        </div>

        {loading ? (
          <LoadingScreen message="Loading orders..." />
        ) : !hasOrders ? (
          <EmptyOrders />
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <OrdersTable orders={orders} />
          </div>
        )}
      </div>

      {hasOrders && (
        <div className="flex-grow flex items-center justify-center mt-2">
          <Button asChild className="w-2/4 sm:w-auto">
            <Link href="/order">Place New Order</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}

