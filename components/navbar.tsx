"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cake, Menu, X, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Cake className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Cakes4U</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === item.href
                    ? "text-pink-500 bg-pink-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/dashboard"
                    ? "text-pink-500 bg-pink-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/account">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                className="bg-pink-500 hover:bg-pink-600 text-white"
                asChild
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "text-pink-500 bg-pink-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === "/dashboard"
                    ? "text-pink-500 bg-pink-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {user && (
              <Link
                href="/account-settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Account Settings
              </Link>
            )}
            <div className="px-3 py-2">
              {user ? (
                <Button onClick={handleSignOut} className="w-full">
                  Sign Out
                </Button>
              ) : (
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white" asChild>
                  <Link href="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

