import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MainNav } from "@/components/nav"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UAE Property Lead Finder",
  description: "Find property owner details from UAE real estate portals",
  keywords: ["UAE", "property", "real estate", "scraper", "propertyfinder", "bayut", "dubizzle"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="relative flex min-h-screen flex-col">
          <MainNav />
          <div className="flex-1">{children}</div>
          <Toaster />
        </div>
      </body>
    </html>
  )
}
