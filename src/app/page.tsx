import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">UAE Property Lead Finder</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your essential tool for real estate professionals in UAE
          </p>
          <div className="max-w-md mx-auto">
            <Link href="/dashboard">
              <Button className="w-full" size="lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>For Real Estate Agents</CardTitle>
              <CardDescription>
                Find property details instantly and connect with owners directly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Save hours of manual research and focus on closing deals with accurate property owner information and unit details.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Property Managers</CardTitle>
              <CardDescription>
                Access comprehensive property information and unit details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Streamline your property management workflow with instant access to unit numbers and property specifics.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Real Estate Companies</CardTitle>
              <CardDescription>
                Scale your operations with automated lead generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Integrate with your CRM and automate your lead generation process for better conversion rates.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 space-y-8">
          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                <p>Submit any property URL from UAE's top real estate portals</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                <p>Get instant access to property owner details and unit information</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                <p>Connect with property owners and close deals faster</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
