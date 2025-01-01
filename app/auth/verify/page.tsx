import { VerifyEmail } from "@/components/auth/verify-email";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <VerifyEmail />
      </div>
    </div>
  );
}