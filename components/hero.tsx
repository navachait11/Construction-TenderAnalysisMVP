import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-balance">Win more construction tenders.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">
              TenderIQ is the AI-powered platform for analyzing construction tenders. 
              Extract key requirements, compare bids, and make data-driven decisions faster.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Try the demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-border bg-card p-1">
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-primary/60" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-md bg-card p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-primary/20" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Highway Bridge Renovation</div>
                        <div className="text-xs text-muted-foreground">Analyzed 2 hours ago</div>
                      </div>
                    </div>
                    <div className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                      92% Match
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-card p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-primary/20" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Commercial Tower Phase 2</div>
                        <div className="text-xs text-muted-foreground">Analyzed 5 hours ago</div>
                      </div>
                    </div>
                    <div className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs font-medium text-yellow-500">
                      78% Match
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-card p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-primary/20" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Municipal Water Plant</div>
                        <div className="text-xs text-muted-foreground">Analyzed yesterday</div>
                      </div>
                    </div>
                    <div className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                      95% Match
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Trusted by construction teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {["BuildCorp", "StructurePro", "CivicWorks", "MetroBuild", "ApexConstruction"].map((company) => (
              <span key={company} className="text-lg font-semibold text-muted-foreground/60">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
