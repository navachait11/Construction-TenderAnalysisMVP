import { DemoHeader } from "@/components/demo/demo-header"
import { Sidebar } from "@/components/demo/sidebar"
import { Dashboard } from "@/components/demo/dashboard"

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DemoHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
