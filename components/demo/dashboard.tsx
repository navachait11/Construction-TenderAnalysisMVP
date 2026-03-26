"use client"

import { useState } from "react"
import { Upload, FileText, TrendingUp, Clock, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react"
import { TenderUpload } from "./tender-upload"
import { TenderAnalysis } from "./tender-analysis"

const recentTenders = [
  {
    id: 1,
    name: "Highway Bridge Renovation - Phase 2",
    client: "State DOT",
    value: "$4.2M",
    deadline: "Apr 15, 2026",
    status: "analyzing",
    match: 92,
  },
  {
    id: 2,
    name: "Commercial Tower Foundation Work",
    client: "MetroDev Inc.",
    value: "$8.7M",
    deadline: "Apr 22, 2026",
    status: "ready",
    match: 78,
  },
  {
    id: 3,
    name: "Municipal Water Treatment Upgrade",
    client: "City of Riverside",
    value: "$12.1M",
    deadline: "May 1, 2026",
    status: "ready",
    match: 95,
  },
  {
    id: 4,
    name: "School Campus Expansion",
    client: "Unified School District",
    value: "$6.5M",
    deadline: "May 10, 2026",
    status: "draft",
    match: 84,
  },
]

const stats = [
  { label: "Active Tenders", value: "12", icon: FileText, change: "+3 this week" },
  { label: "Win Rate", value: "34%", icon: TrendingUp, change: "+5% vs last month" },
  { label: "Upcoming Deadlines", value: "4", icon: Clock, change: "Next: 5 days" },
  { label: "Risk Alerts", value: "2", icon: AlertTriangle, change: "Requires attention" },
]

export function Dashboard() {
  const [showUpload, setShowUpload] = useState(false)
  const [selectedTender, setSelectedTender] = useState<typeof recentTenders[0] | null>(null)

  if (selectedTender) {
    return <TenderAnalysis tender={selectedTender} onBack={() => setSelectedTender(null)} />
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back. Here is your tender overview.</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <Upload className="h-4 w-4" />
          Upload Tender
        </button>
      </div>

      {showUpload && <TenderUpload onClose={() => setShowUpload(false)} />}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Tenders</h2>
          <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            View all
          </button>
        </div>
        <div className="divide-y divide-border">
          {recentTenders.map((tender) => (
            <button
              key={tender.id}
              onClick={() => setSelectedTender(tender)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{tender.name}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{tender.client}</span>
                    <span>•</span>
                    <span>{tender.value}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden text-right sm:block">
                  <div className="flex items-center gap-2">
                    {tender.status === "ready" && (
                      <span className="flex items-center gap-1 text-sm text-primary">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Ready
                      </span>
                    )}
                    {tender.status === "analyzing" && (
                      <span className="flex items-center gap-1 text-sm text-yellow-500">
                        <Clock className="h-3.5 w-3.5" />
                        Analyzing
                      </span>
                    )}
                    {tender.status === "draft" && (
                      <span className="text-sm text-muted-foreground">Draft</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">Due: {tender.deadline}</div>
                </div>
                <div
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    tender.match >= 90
                      ? "bg-primary/20 text-primary"
                      : tender.match >= 80
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tender.match}% Match
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
