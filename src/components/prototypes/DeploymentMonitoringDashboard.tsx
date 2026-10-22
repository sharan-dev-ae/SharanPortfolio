"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity, ArrowRight, CheckCircle2, ChevronDown,
  Clock3, Code2, Database, GitBranch, KeyRound,
  RefreshCw, Rocket, Search, ShieldCheck, TimerReset, X,
} from "lucide-react";
import {
  backendStages, backendWorkflow, frontendStages, frontendWorkflow, mockBuilds, weeklyRuns, workflowSteps,
  type AppKind, type BuildStatus, type MockBuild,
} from "@/data/deploymentMonitoringPrototype";

const statusStyle: Record<BuildStatus, string> = {
  RUNNING: "bg-[#fbe9e9] text-[#ad1f28] ring-[#d22630]/20",
  READY_FOR_APPROVAL: "bg-[#fff3df] text-[#8a5414] ring-[#bd7a22]/20",
  DEPLOYING: "bg-[#f5e7e8] text-[#9f1f28] ring-[#d22630]/20",
  SUCCESS: "bg-[#e9f2ed] text-[#256345] ring-[#3f7b5a]/20",
  FAILED: "bg-red-50 text-red-700 ring-red-600/15",
  DISPATCH_FAILED: "bg-orange-50 text-orange-800 ring-orange-600/15",
  ROLLED_BACK: "bg-slate-100 text-slate-700 ring-slate-600/15",
};

const prettyStatus = (status: BuildStatus) => status.replaceAll("_", " ");

function Status({ value }: { value: BuildStatus }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[.08em] ring-1 ring-inset ${statusStyle[value]}`}><span className={`h-1.5 w-1.5 rounded-full ${value === "SUCCESS" ? "bg-[#3f7b5a]" : value.includes("FAIL") ? "bg-[#d22630]" : "bg-current"}`} />{prettyStatus(value)}</span>;
}

function Metric({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Activity }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.04)]">
    <div className="flex items-start justify-between"><p className="text-xs font-semibold uppercase tracking-[.13em] text-slate-500">{label}</p><span className="rounded-lg bg-slate-50 p-2 text-slate-500"><Icon size={16} /></span></div>
    <p className="mt-4 text-3xl font-bold tracking-[-.04em] text-slate-950">{value}</p><p className="mt-1 text-xs text-slate-500">{note}</p>
  </article>;
}

function LatestBuild({ build, onDemo }: { build: MockBuild; onDemo: (build: MockBuild) => void }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.04)]">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-3"><span className={`rounded-xl p-2.5 ${build.app === "frontend" ? "bg-red-50 text-red-600" : "bg-slate-900 text-white"}`}>{build.app === "frontend" ? <Code2 size={19} /> : <Database size={19} />}</span><div><p className="font-bold text-slate-950">{build.name}</p><p className="text-xs text-slate-500">Latest build · {build.id}</p></div></div><Status value={build.status} />
    </div>
    <div className="mt-6 flex items-end justify-between"><div><p className="text-3xl font-bold tracking-[-.04em] text-slate-950">{build.progress}%</p><p className="text-xs text-slate-500">{build.duration} elapsed</p></div><button onClick={() => onDemo(build)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-600">Simulate state</button></div>
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all duration-700 ${build.app === "frontend" ? "bg-red-500" : "bg-slate-800"}`} style={{ width: `${build.progress}%` }} /></div>
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500"><span className="inline-flex items-center gap-1.5"><GitBranch size={13} />{build.branch}</span><code>{build.sha}</code></div>
    <Link href={`/prototypes/automated-deployment-monitoring/build/${build.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700">Open build details <ArrowRight size={15} /></Link>
  </article>;
}

function WeeklyChart() {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-bold text-slate-950">Weekly deployments</h2><p className="mt-1 text-xs text-slate-500">Successful and active runs · today included</p></div><div className="flex gap-4 text-xs text-slate-500"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-red-500" />Frontend</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-slate-800" />Backend</span></div></div>
    <div className="mt-7 grid h-44 grid-cols-7 items-end gap-2 sm:gap-4">{weeklyRuns.map((run) => <div key={run.day} className="flex h-full flex-col justify-end gap-2"><div className="flex h-full items-end justify-center gap-1"><div className="w-3 rounded-t bg-red-400 transition-all duration-700 sm:w-5" style={{ height: `${run.ui * 10}%` }} title={`${run.ui} frontend runs`} /><div className="w-3 rounded-t bg-slate-800 transition-all duration-700 sm:w-5" style={{ height: `${run.api * 10}%` }} title={`${run.api} backend runs`} /></div><p className={`text-center text-[10px] ${run.day === "Today" ? "font-bold text-red-600" : "text-slate-400"}`}>{run.day}</p></div>)}</div>
  </article>;
}

function StagePanel({ title, stages, accent }: { title: string; stages: {label: string; value: number}[]; accent: string }) {
  const max = Math.max(...stages.map((s) => s.value));
  return <article className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-950">{title}</h3><p className="mt-1 text-xs text-slate-500">Average stage duration · seconds</p><div className="mt-6 space-y-4">{stages.map((stage) => <div key={stage.label}><div className="mb-1.5 flex justify-between text-xs"><span className="font-medium text-slate-600">{stage.label}</span><span className="font-mono text-slate-500">{stage.value}s</span></div><div className="h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${accent}`} style={{ width: `${(stage.value/max)*100}%` }} /></div></div>)}</div></article>;
}

function WorkflowTrack({ title, subtitle, steps, backend = false }: { title: string; subtitle: string; steps: { label: string; detail: string }[]; backend?: boolean }) {
  return <article className="rounded-2xl border border-[#ded9d2] bg-white p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#d22630]">Release workflow</p><h3 className="mt-2 text-lg font-bold text-[#19191c]">{title}</h3><p className="mt-1 text-xs text-[#77716b]">{subtitle}</p></div>{backend && <span className="rounded-full bg-[#19191c] px-3 py-1.5 text-[10px] font-bold text-white">BLUE / GREEN · BACKEND ONLY</span>}</div>
    <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-7">{steps.map((step, index) => <div key={step.label} className={`relative rounded-xl border p-3 ${backend && (step.label.includes("GREEN") || step.label === "Traffic decision") ? "border-[#d22630]/30 bg-[#fbefef]" : "border-[#e8e3dc] bg-[#faf9f7]"}`}><div className="flex items-center gap-2"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#19191c] text-[9px] font-bold text-white">{index + 1}</span><p className="text-xs font-bold text-[#252326]">{step.label}</p></div><p className="mt-2 text-[10px] leading-4 text-[#77716b]">{step.detail}</p></div>)}</div>
  </article>;
}

function BuildHistory({ app, query }: { app: AppKind; query: string }) {
  const builds = mockBuilds.filter((b) => b.app === app && [b.id, b.branch, b.sha, b.message, b.author].join(" ").toLowerCase().includes(query.toLowerCase()));
  return <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h3 className="font-bold text-slate-950">{app === "frontend" ? "Frontend Application" : "Backend API"} history</h3><p className="mt-1 text-xs text-slate-500">{builds.length} matching builds</p></div>{app === "frontend" ? <Code2 className="text-red-500" size={18} /> : <Database className="text-slate-700" size={18} />}</div>
    {builds.length ? <div className="divide-y divide-slate-100">{builds.map((build) => <Link key={build.id} href={`/prototypes/automated-deployment-monitoring/build/${build.id}`} className="grid gap-3 p-4 transition hover:bg-slate-50 sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold text-slate-900">{build.id}</span><Status value={build.status} /></div><p className="mt-1 truncate text-xs text-slate-500">{build.message} · <span className="font-mono">{build.sha}</span></p></div><div className="text-left sm:text-right"><p className="text-xs font-medium text-slate-700">{build.duration}</p><p className="mt-1 text-[10px] text-slate-400">{build.started.split(", ")[0]}</p></div></Link>)}</div> : <div className="flex min-h-48 flex-col items-center justify-center px-5 text-center"><Search className="text-slate-300" /><p className="mt-3 text-sm font-semibold text-slate-700">No builds found</p><p className="mt-1 text-xs text-slate-400">Try a build ID, branch, SHA, or author.</p></div>}
  </article>;
}

function DemoPanel({ build, close }: { build: MockBuild; close: () => void }) {
  const [state, setState] = useState<BuildStatus>(build.status);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("Choose a local simulation state.");
  const actions: { label: string; value: BuildStatus }[] = [
    {label:"Running",value:"RUNNING"},{label:"Awaiting approval",value:"READY_FOR_APPROVAL"},{label:"Deploying",value:"DEPLOYING"},{label:"Success",value:"SUCCESS"},{label:"Dispatch failed",value:"DISPATCH_FAILED"},{label:"Rollback",value:"ROLLED_BACK"},
  ];
  const approve = () => { if (otp === "246810") { setState("DEPLOYING"); setMessage("OTP verified. Exact staged artifact dispatched locally in this demo."); } else setMessage("That demo OTP is not valid. Use 246810."); };
  return <div className="fixed inset-0 z-[100] grid place-items-end bg-slate-950/30 p-0 backdrop-blur-sm sm:place-items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Build state simulator"><div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
    <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-red-600">Browser-only simulation</p><h2 className="mt-2 text-xl font-bold text-slate-950">{build.id} control room</h2></div><button onClick={close} className="rounded-full bg-slate-100 p-2 text-slate-500" aria-label="Close simulator"><X size={18} /></button></div>
    <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between"><span className="text-xs text-slate-500">Current state</span><Status value={state} /></div><p className="mt-3 text-xs leading-5 text-slate-600">{message}</p></div>
    <p className="mt-6 text-xs font-bold uppercase tracking-[.12em] text-slate-500">Simulate lifecycle</p><div className="mt-3 grid grid-cols-2 gap-2">{actions.map((action) => <button key={action.value} onClick={() => { setState(action.value); setMessage(`${action.label} state applied locally. No workflow was called.`); }} className="rounded-lg border border-slate-200 px-3 py-2.5 text-left text-xs font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50">{action.label}</button>)}</div>
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"><div className="flex items-center gap-2 text-xs font-bold text-amber-900"><KeyRound size={15} />Demo approval safeguard</div><p className="mt-2 text-xs text-amber-800">Demo OTP: <strong className="font-mono">246810</strong></p><div className="mt-3 flex gap-2"><input value={otp} onChange={(e) => setOtp(e.target.value)} inputMode="numeric" maxLength={6} placeholder="Enter demo OTP" className="min-w-0 flex-1 rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-red-400"/><button onClick={approve} className="rounded-lg bg-slate-950 px-4 py-2 text-xs font-bold text-white">Verify & approve</button></div></div>
    {state === "DISPATCH_FAILED" && <button onClick={() => { setState("DEPLOYING"); setMessage("Dispatch retried for the already-approved staged build. OTP was not repeated."); }} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-bold text-white"><RefreshCw size={15} />Retry approved build</button>}
  </div></div>;
}

export function DeploymentMonitoringDashboard() {
  const [query, setQuery] = useState("");
  const [demo, setDemo] = useState<MockBuild | null>(null);
  const [architectureOpen, setArchitectureOpen] = useState(true);
  const latest = useMemo(() => [mockBuilds.find((b) => b.app === "frontend")!, mockBuilds.find((b) => b.app === "backend")!], []);
  return <main id="main-content" className="fixed inset-0 z-[60] min-h-screen overflow-y-auto bg-[#f5f2ee] text-[#19191c]">
    <div className="sticky top-0 z-40 border-b border-white/10 bg-[#19191c]/95 text-white backdrop-blur-xl"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 sm:px-8"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#d22630] text-xs font-black text-white">AD</span><div><p className="text-sm font-bold">Automated Deployment Monitoring</p><p className="text-[10px] text-[#aaa39c]">Interactive portfolio prototype · mock data</p></div></div><div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-[#ded9d2] sm:flex"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d22630]" />All systems observable</div><Link href="/prototypes" className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10">Back to portfolio</Link></div></div></div>
    <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:py-14">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div className="max-w-3xl"><div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-red-700"><ShieldCheck size={13}/>Production visibility, without the risk</div><h1 className="mt-5 text-4xl font-bold tracking-[-.055em] sm:text-6xl">One view of every build.<br/><span className="text-slate-400">One safe path to production.</span></h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">A frontend-only demonstration of how two independent CI/CD workflows become an observable, approval-gated release system. Every value and interaction on this page is simulated.</p></div><a href="#how-it-works" className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">Explore architecture <ArrowRight size={16}/></a></div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"><Metric label="Total deployments" value="1,284" note="+38 this month" icon={Rocket}/><Metric label="Success rate" value="96.8%" note="Last 90 days" icon={CheckCircle2}/><Metric label="In progress" value="2" note="Across both apps" icon={Activity}/><Metric label="Frontend avg" value="8m 14s" note="Angular application" icon={Code2}/><Metric label="Backend avg" value="12m 41s" note=".NET API" icon={Database}/></div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">{latest.map((build) => <LatestBuild key={build.id} build={build} onDemo={setDemo}/>)}</div>
      <div className="mt-8 grid gap-5 lg:grid-cols-3"><WeeklyChart/><div className="grid gap-4"><div className="group rounded-2xl bg-[#19191c] p-5 text-white"><TimerReset className="text-[#ee6f76] transition group-hover:rotate-12"/><p className="mt-8 text-xs text-[#aaa39c]">Longest stage</p><p className="mt-1 text-xl font-bold">.NET publish · 3m 32s</p><p className="mt-2 text-xs text-[#77716b]">18s faster than last week</p></div><div className="rounded-2xl border border-[#ded9d2] bg-white p-5"><Rocket className="text-[#d22630]"/><p className="mt-8 text-xs text-[#77716b]">Deployment speed</p><p className="mt-1 text-xl font-bold">14% faster</p><p className="mt-2 text-xs text-[#8f252c]">Artifact reuse removed rebuild time</p></div><div className="rounded-2xl border border-[#e7cba8] bg-[#fff8ee] p-5"><Clock3 className="animate-pulse text-[#a4651f]"/><p className="mt-8 text-xs text-[#8a5414]">Approval queue</p><p className="mt-1 text-xl font-bold text-[#412a12]">1 build waiting</p><p className="mt-2 text-xs text-[#8a5414]">API-1837 · waiting 16 minutes</p></div></div></div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2"><StagePanel title="Frontend pipeline timing" stages={frontendStages} accent="bg-[#d22630]"/><StagePanel title="Backend pipeline timing" stages={backendStages} accent="bg-[#252326]"/></div>
      <section className="mt-8 space-y-4"><WorkflowTrack title="Frontend release lifecycle" subtitle="Full artifact lifecycle with backup and guarded rollback—no deployment slots." steps={frontendWorkflow}/><WorkflowTrack title="Backend zero-downtime lifecycle" subtitle="BLUE/GREEN slots isolate publishing from the production traffic decision." steps={backendWorkflow} backend/></section>
      <section className="mt-14"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-red-600">Build history</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Two apps. Clearly separated.</h2></div><label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 sm:max-w-xs"><Search size={15} className="text-slate-400"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ID, branch, SHA…" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"/></label></div><div className="mt-5 grid gap-5 lg:grid-cols-2"><BuildHistory app="frontend" query={query}/><BuildHistory app="backend" query={query}/></div></section>
      <section id="how-it-works" className="mt-20 rounded-3xl bg-[#19191c] px-5 py-8 text-white sm:px-8 sm:py-12"><button onClick={() => setArchitectureOpen(!architectureOpen)} className="flex w-full items-center justify-between text-left"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#ee6f76]">How it works</p><h2 className="mt-3 text-3xl font-bold tracking-tight">Two workflows. One exact artifact.</h2></div><ChevronDown className={`transition ${architectureOpen ? "rotate-180" : ""}`}/></button>{architectureOpen && <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{workflowSteps.map((step) => <article key={step.n} className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><span className="font-mono text-xs text-[#ee6f76]">{step.n}</span><h3 className="mt-5 font-bold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#aaa39c]">{step.body}</p></article>)}</div>}<div className="mt-6 rounded-2xl border border-[#d22630]/30 bg-[#d22630]/10 p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#ee6f76]">Backend zero-downtime facts · not used by frontend</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="text-xs text-[#aaa39c]">Last successfully published backend slot</p><p className="mt-1 font-bold">GREEN · API-1836</p></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="text-xs text-[#aaa39c]">Active production traffic slot</p><p className="mt-1 font-bold">BLUE · verified independently</p></div></div></div></section>
      <section className="mt-16 grid gap-8 border-t border-slate-200 pt-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-red-600">Why this product exists</p><h2 className="mt-3 text-3xl font-bold tracking-tight">Confidence between commit and customer.</h2></div><div className="grid gap-5 text-sm leading-7 text-slate-600 sm:grid-cols-2"><p><strong className="text-slate-900">The problem.</strong> Split application stacks create fragmented release context, manual approval gaps, and ambiguity about what actually reached production.</p><p><strong className="text-slate-900">The architecture.</strong> Independent build and deploy workflows keep artifacts immutable while one dashboard unifies progress and evidence.</p><p><strong className="text-slate-900">The safeguard.</strong> Authorized OTP approval gates production access, while safe retry preserves approval for the same exact staged build.</p><p><strong className="text-slate-900">The insight.</strong> Timing, history, verification, and simulated AI observations make bottlenecks and risk visible before they become incidents.</p></div></section>
    </section>
    {demo && <DemoPanel build={demo} close={() => setDemo(null)}/>}
  </main>;
}
