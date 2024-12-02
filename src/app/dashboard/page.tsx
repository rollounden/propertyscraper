import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PropertySearchForm } from "@/components/property-search-form"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Property Search Dashboard</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Property URL</CardTitle>
              <CardDescription>
                Enter a property URL from propertyfinder.ae, bayut.com, or dubizzle.com
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PropertySearchForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
              <CardDescription>
                Your recent property searches will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">No recent searches</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
