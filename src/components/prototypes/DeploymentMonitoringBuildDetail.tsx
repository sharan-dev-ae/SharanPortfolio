"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle, ArrowLeft, Bot, Check, Copy,
  GitBranch, KeyRound, RefreshCw, RotateCcw,
  ShieldCheck, TerminalSquare,
} from "lucide-react";
import { mockBuilds, type BuildStatus } from "@/data/deploymentMonitoringPrototype";

const backendTimeline = [
  { name: "Source validated", time: "09:16:04", detail: "Commit 7d21ea4 resolved on main" },
  { name: "Build & tests", time: "09:18:31", detail: "128 tests passed · release publish created" },
  { name: "Artifact staged", time: "09:26:58", detail: "Immutable artifact ec-api-1837.zip recorded" },
  { name: "Approval verified", time: "Estimate", detail: "Waiting for authorized OTP approval" },
  { name: "Deploy to GREEN", time: "Estimate", detail: "Exact staged artifact; no rebuild" },
  { name: "Verify & report", time: "Estimate", detail: "Health verification before traffic decision" },
];

const frontendTimeline = [
  { name: "Commit resolved", time: "09:16:04", detail: "Exact pushed SHA resolved from the release branch" },
  { name: "Build & tests", time: "09:18:31", detail: "Dependencies installed, checks passed, bundle built once" },
  { name: "Production backup", time: "09:25:40", detail: "Current frontend bundle recorded for safe recovery" },
  { name: "Artifact verified", time: "09:26:58", detail: "Checksum and staged files validated" },
  { name: "OTP approval", time: "Estimate", detail: "Authorized approval for this exact artifact" },
  { name: "Deploy & verify", time: "Estimate", detail: "Publish artifact and run production checks" },
  { name: "Conditional rollback", time: "If required", detail: "Only after an actual deploy or verification failure" },
];

const logs = [
  "09:16:04  [source] Commit 7d21ea4 checked out from refs/heads/main",
  "09:17:12  [restore] Dependencies restored from lock file",
  "09:20:48  [test] 128 passed, 0 failed, 0 skipped",
  "09:25:34  [publish] Release output created for linux-x64",
  "09:26:41  [artifact] SHA-256 verified: 6f15…d91b",
  "09:26:58  [state] READY_FOR_APPROVAL",
];

const label = (value: BuildStatus) => value.replaceAll("_", " ");

export function DeploymentMonitoringBuildDetail({ buildId }: { buildId: string }) {
  const source = useMemo(() => mockBuilds.find((item) => item.id === buildId) ?? mockBuilds[1], [buildId]);
  const [status, setStatus] = useState<BuildStatus>(source.status);
  const [otp, setOtp] = useState("");
  const [notice, setNotice] = useState("This build is ready for an authorized production decision.");
  const [copied, setCopied] = useState(false);
  const [logError, setLogError] = useState(false);
  const activeIndex = status === "RUNNING" ? 1 : status === "READY_FOR_APPROVAL" || status === "DISPATCH_FAILED" ? 2 : status === "DEPLOYING" ? 4 : 5;
  const isBackend = source.app === "backend";
  const timeline = isBackend ? backendTimeline : frontendTimeline;

  const verify = () => {
    if (otp !== "246810") { setNotice("Demo OTP not recognized. Use the clearly labelled demo code 246810."); return; }
    setStatus("DEPLOYING");
    setNotice("Approval verified locally. Deployment of the exact staged artifact is now simulated.");
  };

  return <main id="main-content" className="fixed inset-0 z-[60] min-h-screen overflow-y-auto bg-[#f5f2ee] text-[#19191c]">
    <div className="sticky top-0 z-40 border-b border-white/10 bg-[#19191c]/95 text-white backdrop-blur-xl"><div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8"><Link href="/prototypes/automated-deployment-monitoring" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ded9d2] hover:text-white"><ArrowLeft size={16}/>Deployment dashboard</Link><span className="rounded-full bg-[#d22630]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#ee6f76]">Prototype simulation</span></div></div>
    <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8">
      <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><div className="flex flex-wrap items-center gap-3"><h1 className="text-4xl font-bold tracking-[-.05em] sm:text-5xl">{source.id}</h1><span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold tracking-[.08em] text-amber-800 ring-1 ring-amber-200">{label(status)}</span></div><p className="mt-4 text-lg text-slate-600">{source.name} · {source.message}</p><div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500"><span className="inline-flex items-center gap-1.5"><GitBranch size={13}/>{source.branch}</span><code>{source.sha}</code><span>by {source.author}</span></div></div><div className="rounded-2xl border border-slate-200 bg-white p-4 lg:min-w-72"><p className="text-xs text-slate-500">Estimated completion</p><p className="mt-1 text-2xl font-bold">10:01 GST</p><p className="mt-1 text-[11px] text-slate-400">Estimate · ± 2 min, based on 20 successful runs</p></div></header>

      <section className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs text-slate-500">Started</p><p className="mt-2 text-sm font-bold">{source.started}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs text-slate-500">Build ended</p><p className="mt-2 text-sm font-bold">{source.ended ?? "Still running"}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs text-slate-500">Approval</p><p className="mt-2 inline-flex items-center gap-2 text-sm font-bold"><ShieldCheck size={16} className="text-amber-600"/>{status === "READY_FOR_APPROVAL" ? "OTP required" : status === "DEPLOYING" || status === "SUCCESS" ? "Verified" : "Pending"}</p></div></section>

      {isBackend ? <section className="mt-5 rounded-2xl border border-[#d22630]/20 bg-white p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#d22630]">Backend zero-downtime deployment · BLUE/GREEN</p><div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-[#e8e3dc] bg-[#faf9f7] p-4"><p className="text-xs text-[#77716b]">Last successfully published slot</p><p className="mt-2 text-xl font-bold">GREEN</p><p className="mt-1 text-xs text-[#77716b]">Artifact API-1836 · verified independently</p></div><div className="rounded-xl border border-[#e8e3dc] bg-[#faf9f7] p-4"><p className="text-xs text-[#77716b]">Active production traffic slot</p><p className="mt-2 text-xl font-bold">BLUE</p><p className="mt-1 text-xs text-[#77716b]">Publishing GREEN never implies traffic switched</p></div></div></section> : <section className="mt-5 rounded-2xl border border-[#ded9d2] bg-white p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#d22630]">Frontend deployment model</p><p className="mt-2 text-sm font-bold">Commit → Build → Backup → Verify → Approve → Deploy → Conditional rollback</p><p className="mt-2 text-xs leading-5 text-[#77716b]">Frontend publishes a verified immutable bundle. It does not use BLUE/GREEN deployment slots.</p></section>}

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-red-600">Live deployment timeline</p><h2 className="mt-2 text-2xl font-bold">Exact-artifact journey</h2></div><div className="flex items-center gap-2 text-xs text-slate-500"><span className="h-2 w-2 animate-pulse rounded-full bg-red-500"/>Monitoring locally</div></div><div className="mt-9 grid gap-0 lg:grid-cols-6">{timeline.map((step, index) => { const done = index <= activeIndex; const current = index === activeIndex; return <div key={step.name} className="relative flex gap-4 pb-7 lg:block lg:pb-0"><div className={`absolute left-[11px] top-6 h-full w-px lg:left-6 lg:top-3 lg:h-px lg:w-full ${done ? "bg-red-300" : "bg-slate-200"}`}/><span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full ring-4 ring-white ${done ? "bg-red-600 text-white" : "bg-slate-200 text-slate-400"}`}>{done && !current ? <Check size={13}/> : current ? <span className="h-2 w-2 animate-pulse rounded-full bg-white"/> : <span className="h-1.5 w-1.5 rounded-full bg-slate-400"/>}</span><div className="lg:mt-5 lg:pr-4"><p className={`text-xs font-bold ${done ? "text-slate-900" : "text-slate-400"}`}>{step.name}</p><p className="mt-1 font-mono text-[10px] text-red-500">{step.time}</p><p className="mt-2 text-[11px] leading-5 text-slate-500">{step.detail}</p></div></div>})}</div></section>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
        <section className="overflow-hidden rounded-2xl bg-slate-950 text-white"><div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex items-center gap-2"><TerminalSquare size={16} className="text-red-400"/><h2 className="text-sm font-bold">Build logs</h2></div><div className="flex gap-2"><button onClick={() => setLogError(!logError)} className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-slate-400">{logError ? "Restore logs" : "Simulate error"}</button><button onClick={() => { navigator.clipboard?.writeText(logs.join("\n")); setCopied(true); }} className="rounded-md bg-white/5 p-1.5 text-slate-400" aria-label="Copy logs">{copied ? <Check size={13}/> : <Copy size={13}/>}</button></div></div>{logError ? <div className="grid min-h-72 place-items-center p-8 text-center"><div><AlertTriangle className="mx-auto text-amber-400"/><p className="mt-3 text-sm font-bold">Log telemetry unavailable</p><p className="mt-2 text-xs leading-5 text-slate-400">The workflow state remains intact. A telemetry failure never triggers rollback.</p></div></div> : <pre className="min-h-72 overflow-x-auto p-5 font-mono text-[11px] leading-7 text-slate-300">{logs.join("\n")}</pre>}</section>
        <div className="grid gap-5">
          <section className="rounded-2xl border border-[#d22630]/20 bg-gradient-to-br from-[#fbefef] to-white p-5"><div className="flex items-center gap-2 text-[#ad1f28]"><Bot size={18}/><h2 className="text-sm font-bold">AI is monitoring this deployment</h2></div><p className="mt-4 text-xs leading-6 text-[#625d58]"><strong className="text-[#19191c]">Prototype simulation:</strong> build duration is within its normal range. The publish stage is trending 9% faster. No anomaly requires intervention.</p><p className="mt-3 text-[10px] font-semibold uppercase tracking-[.1em] text-[#ad1f28]">Simulated insight · not live AI analysis</p></section>
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="flex items-center gap-2 text-amber-900"><KeyRound size={16}/><h2 className="text-sm font-bold">Production approval</h2></div><p className="mt-3 text-xs leading-5 text-amber-800">Demo OTP: <strong className="font-mono">246810</strong></p><input value={otp} onChange={(event) => setOtp(event.target.value)} placeholder="Enter demo OTP" maxLength={6} className="mt-3 w-full rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-400"/><button onClick={verify} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-2.5 text-xs font-bold text-white"><ShieldCheck size={14}/>Verify & deploy staged build</button><p className="mt-3 text-[11px] leading-5 text-amber-800">{notice}</p></section>
          {status === "DISPATCH_FAILED" && <button onClick={() => { setStatus("DEPLOYING"); setNotice("Dispatch retried for the same approved artifact—no repeat OTP needed."); }} className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-bold text-white"><RefreshCw size={14}/>Retry approved dispatch</button>}
          <div className="grid grid-cols-2 gap-2"><button onClick={() => {setStatus("DISPATCH_FAILED"); setNotice("Dispatch failed after approval. Safe retry is available.");}} className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700"><AlertTriangle size={15} className="mx-auto mb-2 text-orange-500"/>Dispatch failure</button><button onClick={() => {setStatus("ROLLED_BACK"); setNotice("Rollback simulated after a deployment verification failure.");}} className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700"><RotateCcw size={15} className="mx-auto mb-2 text-slate-500"/>Rollback</button></div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-400">Frontend-only demonstration. No API, OTP service, deployment runner, email, or GitHub action is connected.</p>
    </div>
  </main>;
}
