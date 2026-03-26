import { Upload, Brain, Target } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Documents",
    description: "Drag and drop your tender documents. We support PDF, Word, Excel, and scanned documents.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI extracts requirements, identifies risks, and scores the opportunity based on your profile.",
  },
  {
    number: "03",
    icon: Target,
    title: "Win More Bids",
    description: "Use data-driven insights to prepare stronger bids and focus on the most promising opportunities.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-card/30 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From document upload to winning bid in three simple steps.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-px w-full bg-border lg:block lg:w-1/2 lg:translate-x-1/2" />
              )}
              <div className="relative rounded-xl border border-border bg-card p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/30">{step.number}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
