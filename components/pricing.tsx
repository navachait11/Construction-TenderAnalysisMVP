import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    description: "For small contractors getting started with tender analysis.",
    features: [
      "Up to 10 tender analyses per month",
      "Basic document extraction",
      "Email support",
      "1 team member",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$799",
    period: "/month",
    description: "For growing teams that need advanced analysis capabilities.",
    features: [
      "Unlimited tender analyses",
      "Advanced AI insights",
      "Risk assessment scoring",
      "Priority support",
      "Up to 10 team members",
      "API access",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex requirements.",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "Unlimited team members",
      "On-premise deployment option",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your team size and tender volume.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-8 ${
                plan.highlighted
                  ? "border-primary bg-card"
                  : "border-border bg-card/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="ml-1 text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/demo"
                className={`block w-full rounded-md px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-border bg-transparent text-foreground hover:bg-secondary"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
