import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome to Cakes4U</h2>
          <p className="mt-2 text-gray-600">Sign in to your account or create a new one</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}