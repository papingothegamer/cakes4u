"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function VerifyEmail() {
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center space-y-4">
      <div className="mx-auto w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
        <Mail className="w-6 h-6 text-pink-500" />
      </div>
      <h2 className="text-2xl font-semibold">Check your email</h2>
      <p className="text-gray-600">
        We've sent you a verification link. Please check your email to verify your account.
      </p>
      <div className="pt-4">
        <Button
          variant="outline"
          onClick={() => router.push("/auth/login")}
          className="mx-auto"
        >
          Return to Login
        </Button>
      </div>
      {countdown > 0 && (
        <p className="text-sm text-gray-500">
          Didn't receive the email? You can request a new one in {countdown} seconds
        </p>
      )}
    </div>
  );
}