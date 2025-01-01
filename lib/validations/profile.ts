import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});