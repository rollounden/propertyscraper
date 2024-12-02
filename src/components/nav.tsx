import Link from 'next/link'
import { Button } from './ui/button'

export function MainNav() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          Property Scraper
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Link href="/dashboard/history">
          <Button variant="ghost">History</Button>
        </Link>
        <Link href="/dashboard/credits">
          <Button variant="ghost">Credits</Button>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline">Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </nav>
  )
}
