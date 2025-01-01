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
import { loginSchema } from "@/lib/validations/auth";
import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data.email, data.password);
      router.push("/dashboard");
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
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Sign In</Button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-pink-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
}