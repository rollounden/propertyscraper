'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      requireAuth: true
    },
    {
      href: "/dashboard/history",
      label: "History",
      requireAuth: true
    },
    {
      href: "/dashboard/credits",
      label: "Credits",
      requireAuth: true
    }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Property Scraper</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {user && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button
                variant="outline"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            pathname !== "/auth/signin" && (
              <Button asChild>
                <Link href="/auth/signin">
                  Sign In
                </Link>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  )
}
