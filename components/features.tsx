import { FileText, BarChart3, Shield, Zap, Users, Clock } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Document Extraction",
    description: "Upload tender documents in any format. Our AI extracts key requirements, deadlines, and specifications automatically.",
  },
  {
    icon: BarChart3,
    title: "Bid Comparison",
    description: "Compare multiple tender opportunities side-by-side. Identify the best-fit projects based on your capabilities.",
  },
  {
    icon: Shield,
    title: "Compliance Checking",
    description: "Automatically verify that your bid meets all mandatory requirements before submission.",
  },
  {
    icon: Zap,
    title: "Risk Assessment",
    description: "AI-powered risk scoring helps you identify potential issues and hidden costs in tender documents.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Assign tasks, share insights, and coordinate bid preparation across your team in real-time.",
  },
  {
    icon: Clock,
    title: "Deadline Tracking",
    description: "Never miss a submission deadline with automated reminders and timeline management.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to win more bids
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful tools designed specifically for construction tender analysis and bid management.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
