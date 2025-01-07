"use client";

import { format } from "date-fns";
import { Order } from "@/types/order";
import { OrderStatusBadge } from "./order-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  orders: Order[];
};

export function OrdersTable({ orders }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Occasion</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.order_number}</TableCell>
                <TableCell>
                  {format(new Date(order.created_at), "PPP")}
                </TableCell>
                <TableCell>{order.type}</TableCell>
                <TableCell>{order.occasion}</TableCell>
                <TableCell>
                  {format(new Date(order.delivery_date), "PPP")}
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details #{selectedOrder?.order_number}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Order Information</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Type</dt>
                    <dd>{selectedOrder.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Occasion</dt>
                    <dd>{selectedOrder.occasion}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Servings</dt>
                    <dd>{selectedOrder.servings}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Description</dt>
                    <dd>{selectedOrder.description || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Allergy Information</dt>
                    <dd>{selectedOrder.allergy_info || 'None provided'}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Delivery Information</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Delivery Date</dt>
                    <dd>{format(new Date(selectedOrder.delivery_date), "PPP")}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Contact Name</dt>
                    <dd>{selectedOrder.contact_name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Contact Email</dt>
                    <dd>{selectedOrder.contact_email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Contact Phone</dt>
                    <dd>{selectedOrder.contact_phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Delivery Address</dt>
                    <dd>{selectedOrder.delivery_address}</dd>
                  </div>
                </dl>
              </div>

              {selectedOrder.order_images && selectedOrder.order_images.length > 0 && (
                <div className="col-span-2">
                  <h3 className="font-semibold mb-2">Reference Images</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedOrder.order_images.map((image, index) => (
                      <img
                        key={index}
                        src={image.image_url}
                        alt={`Reference ${index + 1}`}
                        className="rounded-lg object-cover w-full h-32"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}