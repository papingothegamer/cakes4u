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
import { profileSchema } from "@/lib/validations/profile";
import { useAuth } from "@/lib/hooks/use-auth";
import { supabase } from "@/lib/supabase";

type FormData = {
  fullName: string;
  phone: string;
};

export function SettingsForm() {
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "", phone: "" },
  });

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, phone")
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
        });
      }
    }

    loadProfile();
  }, [user, form, toast]);

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          phone: data.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your profile has been updated",
      });
    } catch (error: any) {
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

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}