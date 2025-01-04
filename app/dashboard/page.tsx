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
    // Don't do anything while auth is loading
    if (authLoading) {
      return;
    }

    // Redirect if no user
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

  // Show loading state while auth is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Checking authentication...</div>
      </div>
    );
  }

  // Show loading state while redirecting
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="mt-2 text-gray-600">
              View and manage your cake orders
            </p>
          </div>
          <Button asChild>
            <Link href="/order">Place New Order</Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading orders...</div>
        ) : orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <OrdersTable orders={orders} />
        )}
      </div>
    </div>
  );
}