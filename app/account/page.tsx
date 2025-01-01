"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { SettingsForm } from "@/components/account/settings-form";
import { DeleteAccount } from "@/components/account/delete-account";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="mt-2 text-gray-600">
              Update your profile information and preferences
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-6">
            <SettingsForm />
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
}