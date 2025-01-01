"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/hooks/use-auth";

export function DeleteAccount() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteAccount } = useAuth(); // Get the deleteAccount method from AuthContext
  const { toast } = useToast(); // Toast notifications
  const router = useRouter();

  const handleDelete = async () => {
    if (!deleteAccount) {
      toast({
        title: "Error",
        description: "Delete account function is unavailable.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDeleting(true);
      await deleteAccount(); // Call the deleteAccount function
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });
      router.push("/"); // Redirect to the home page
    } catch (error: any) {
      console.error("Error deleting account:", error); // Log the error
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border-t pt-6 mt-6">
      <h3 className="text-lg font-medium text-red-600 mb-4">Delete Account</h3>
      <p className="text-sm text-gray-600 mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
