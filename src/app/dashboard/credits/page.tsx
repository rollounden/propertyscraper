import { Button } from "@/components/ui/button"

export default function CreditsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Credits</h1>
        
        <div className="grid gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Balance</h2>
            <div className="text-4xl font-bold mb-4">0 Credits</div>
            <Button>Purchase Credits</Button>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Credit Usage History</h2>
            <div className="space-y-4">
              {/* We'll add the credit history here */}
              <p className="text-gray-500">No credit usage history</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
