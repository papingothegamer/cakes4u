import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an account</h2>
          <p className="mt-2 text-gray-600">Join Cakes4U today</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}