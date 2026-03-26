const stats = [
  { value: "40%", label: "Time saved", sublabel: "on tender analysis" },
  { value: "3x", label: "Faster", sublabel: "bid preparation" },
  { value: "25%", label: "Higher", sublabel: "win rate" },
  { value: "500+", label: "Tenders", sublabel: "analyzed monthly" },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-card/50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-foreground lg:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm font-medium text-foreground">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
