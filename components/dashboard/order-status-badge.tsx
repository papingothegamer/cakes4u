"use client";

import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/order";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

type Props = {
  status: OrderStatus;
};

export function OrderStatusBadge({ status }: Props) {
  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}