import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z
    .string()
    .regex(
      /^[A-Za-z0-9 -]{4,10}$/,
      "Postal code must be between 4 and 10 alphanumeric characters"
    ),
});
