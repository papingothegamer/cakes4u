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

type Props = {
  orders: Order[];
};

export function OrdersTable({ orders }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Occasion</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}