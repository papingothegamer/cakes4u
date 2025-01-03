"use client";

import { OrderDetails, ContactDetails } from "@/types/order";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Mail } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/api/orders";
import { sendOrderEmails } from "@/lib/email/send";

type Props = {
  orderDetails: OrderDetails;
  contactDetails: ContactDetails;
  onBack: () => void;
};

export function OrderSummary({ orderDetails, contactDetails, onBack }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to submit your order",
        variant: "destructive",
      });
      router.push("/auth/login");
      return;
    }

    try {
      // Create order in database
      const order = await createOrder(orderDetails, contactDetails, user.id);
      
      // Send confirmation emails
      await sendOrderEmails(order.id, orderDetails, contactDetails);
      
      toast({
        title: "Success",
        description: "Your order has been submitted successfully!",
      });
      
      router.push("/dashboard");
    } catch (error: any) {
      console.error('Order submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt className="text-gray-600">Type:</dt>
            <dd>{orderDetails.type}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Servings:</dt>
            <dd>{orderDetails.servings}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Occasion:</dt>
            <dd>{orderDetails.occasion}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Delivery Date:</dt>
            <dd>{format(orderDetails.deliveryDate, "PPP")}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt className="text-gray-600">Name:</dt>
            <dd>{contactDetails.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Email:</dt>
            <dd>{contactDetails.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Phone:</dt>
            <dd>{contactDetails.phone}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Address:</dt>
            <dd>{contactDetails.address}</dd>
          </div>
        </dl>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit} 
          className="w-full"
        >
          <Mail className="mr-2 h-4 w-4" />
          Submit Order
        </Button>
      </div>
    </div>
  );
}