import { z } from "zod";

export const orderFormSchema = z.object({
  type: z.string().min(1, "Cake type is required"),
  servings: z.number().min(1, "Number of servings is required"),
  occasion: z.string().min(1, "Occasion is required"),
  deliveryDate: z.date().min(new Date(), "Delivery date must be in the future"),
  description: z.string().min(10, "Please provide a detailed description"),
  allergyInfo: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(10, "Full delivery address is required"),
});