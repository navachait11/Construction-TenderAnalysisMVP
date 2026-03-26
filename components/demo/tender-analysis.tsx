"use client"

import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Clock, DollarSign, Users, MapPin } from "lucide-react"

interface TenderAnalysisProps {
  tender: {
    id: number
    name: string
    client: string
    value: string
    deadline: string
    status: string
    match: number
  }
  onBack: () => void
}

const requirements = [
  { label: "ISO 9001 Certification", met: true },
  { label: "Minimum 10 years experience", met: true },
  { label: "Previous government projects", met: true },
  { label: "Local workforce requirement (70%)", met: false },
  { label: "Performance bond ($2M)", met: true },
]

const risks = [
  { level: "high", description: "Tight timeline with liquidated damages clause" },
  { level: "medium", description: "Material cost escalation not covered" },
  { level: "low", description: "Weather delay provisions limited to 10 days" },
]

const keyTerms = [
  { label: "Contract Type", value: "Lump Sum" },
  { label: "Duration", value: "18 months" },
  { label: "Retention", value: "5%" },
  { label: "Payment Terms", value: "Net 30" },
  { label: "Warranty Period", value: "24 months" },
  { label: "Insurance Required", value: "$5M General Liability" },
]

export function TenderAnalysis({ tender, onBack }: TenderAnalysisProps) {
  return (
    <div className="p-6 lg:p-8">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{tender.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {tender.client}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {tender.value}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Due: {tender.deadline}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                California, USA
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tender.match >= 90
                ? "bg-primary/20 text-primary"
                : tender.match >= 80
                ? "bg-yellow-500/20 text-yellow-500"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {tender.match}% Match Score
          </div>
          <button className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90">
            Start Bid
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">AI Summary</h2>
            <p className="text-muted-foreground leading-relaxed">
              This tender involves the renovation of an existing highway bridge structure, including deck replacement, 
              structural reinforcement, and seismic retrofitting. The project requires specialized experience in 
              bridge construction and DOT compliance. Key considerations include the tight 18-month timeline with 
              significant liquidated damages provisions. Your company profile matches well with the technical 
              requirements, but attention is needed for the local workforce provision.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Requirements Compliance</h2>
            <div className="space-y-3">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <span className="text-sm text-foreground">{req.label}</span>
                  {req.met ? (
                    <span className="flex items-center gap-1 text-sm text-primary">
                      <CheckCircle className="h-4 w-4" />
                      Met
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      Action Required
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Risk Assessment</h2>
            <div className="space-y-3">
              {risks.map((risk, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <div
                    className={`mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${
                      risk.level === "high"
                        ? "bg-destructive"
                        : risk.level === "medium"
                        ? "bg-yellow-500"
                        : "bg-primary"
                    }`}
                  />
                  <div>
                    <span className="text-xs font-medium uppercase text-muted-foreground">
                      {risk.level} risk
                    </span>
                    <p className="text-sm text-foreground">{risk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Key Terms</h2>
            <div className="space-y-3">
              {keyTerms.map((term, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{term.label}</span>
                  <span className="text-sm font-medium text-foreground">{term.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Documents</h2>
            <div className="space-y-2">
              {["RFP Document.pdf", "Technical Specs.pdf", "Contract Draft.docx", "BOQ.xlsx"].map((doc) => (
                <button
                  key={doc}
                  className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 text-left transition-colors hover:bg-secondary"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{doc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Questions Due</div>
                  <div className="text-xs text-muted-foreground">April 5, 2026</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">Site Visit</div>
                  <div className="text-xs text-muted-foreground">April 8, 2026</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">Bid Submission</div>
                  <div className="text-xs text-muted-foreground">April 15, 2026</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">Award Date</div>
                  <div className="text-xs text-muted-foreground">May 1, 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
