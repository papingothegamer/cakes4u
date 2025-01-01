"use client";

import { useRouter } from "next/navigation";
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
import { signupSchema } from "@/lib/validations/auth";
import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignupForm() {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data.email, data.password);
      toast({
        title: "Success!",
        description: "Please check your email to verify your account.",
      });
      router.push("/auth/verify");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Sign Up</Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-pink-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
}