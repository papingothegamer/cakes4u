export type OrderDetails = {
  type: string;
  servings: number;
  occasion: string;
  deliveryDate: Date;
  description?: string;
  referenceImages?: File[];
  allergyInfo?: string;
};

export type ContactDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type OrderStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export type Order = {
  id: string;
  order_number: string; // Add this field
  user_id: string;
  type: string;
  servings: number;
  occasion: string;
  delivery_date: string;
  description?: string;
  allergy_info?: string;
  status: OrderStatus;
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  delivery_address: string;
  created_at: string;
  updated_at: string;
  order_images?: { image_url: string, image_key: string}[];
}

