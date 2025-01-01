"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { profileSchema } from "@/lib/validations/profile"; // Ensure this schema is defined correctly
import { useAuth } from "@/lib/hooks/use-auth";
import { supabase } from "@/lib/supabase";

type FormData = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

export function SettingsForm() {
  const { user } = useAuth(); // Get the authenticated user
  const { toast } = useToast(); // Toast notifications

  const form = useForm<FormData>({
    resolver: zodResolver(profileSchema), // Use Zod for validation
    defaultValues: {
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  useEffect(() => {
    async function loadProfile() {
      if (!user) return; // Exit if no user is authenticated

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, phone, street, city, state, zip")
        .eq("id", user.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        form.reset({
          fullName: data.full_name || "",
          phone: data.phone || "",
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          zip: data.zip || "",
        });
      }
    }

    loadProfile();
  }, [user, form, toast]);

  const onSubmit = async (data: FormData) => {
    if (!user) return; // Exit if no user is authenticated

    console.log("Data to be sent:", {
      full_name: data.fullName,
      phone: data.phone,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
      updated_at: new Date().toISOString(),
    }); // Log the data being sent

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          phone: data.phone,
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip,
          updated_at: new Date().toISOString(), // Update timestamp
        })
        .eq("id", user.id);

      if (error) throw error; // Throw error if update fails

      toast({
        title: "Success",
        description: "Your profile has been updated",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error); // Log the error
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Delivery/Billing Address */}
        <h3 className="text-lg font-semibold">Delivery/Billing Address</h3>
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="Enter your street address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter your city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="Enter your state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP/Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter your ZIP/postal code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
