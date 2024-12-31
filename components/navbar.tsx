"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cake, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Order", href: "/order" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Cake className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Cakes4U</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium",
                  pathname === item.href
                    ? "text-pink-500 border-b-2 border-pink-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium",
                  pathname === "/dashboard"
                    ? "text-pink-500 border-b-2 border-pink-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="text-gray-600"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="default"
                className="bg-pink-500 hover:bg-pink-600"
                asChild
              >
                <Link href="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block pl-3 pr-4 py-2 text-base font-medium",
                  pathname === item.href
                    ? "text-pink-500 bg-pink-50 border-l-4 border-pink-500"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  "block pl-3 pr-4 py-2 text-base font-medium",
                  pathname === "/dashboard"
                    ? "text-pink-500 bg-pink-50 border-l-4 border-pink-500"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                Dashboard
              </Link>
            )}
            <div className="px-3 py-2">
              {user ? (
                <Button onClick={handleSignOut} className="w-full">
                  Sign Out
                </Button>
              ) : (
                <Button className="w-full bg-pink-500 hover:bg-pink-600" asChild>
                  <Link href="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}