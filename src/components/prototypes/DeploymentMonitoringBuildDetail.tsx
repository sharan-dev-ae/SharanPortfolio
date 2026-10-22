"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle, Bot, Check, Copy,
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
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [notice, setNotice] = useState("This build is ready for an authorized production decision.");
  const [copied, setCopied] = useState(false);
  const [logError, setLogError] = useState(false);
  const activeIndex = status === "RUNNING" ? 1 : status === "READY_FOR_APPROVAL" || status === "DISPATCH_FAILED" ? 2 : status === "DEPLOYING" ? 4 : 5;
  const isBackend = source.app === "backend";
  const timeline = isBackend ? backendTimeline : frontendTimeline;

  const verify = () => {
    if (otp !== "246810") { setNotice("Demo OTP not recognized. Use the clearly labelled demo code 246810."); return; }
    setStatus("DEPLOYING");
    setApprovalOpen(false);
    setNotice("Approval verified locally. Deployment of the exact staged artifact is now simulated.");
  };

  return <main id="main-content" className="prototype-fullscreen fixed inset-0 z-[60] min-h-screen w-screen overflow-y-auto text-[#111318]">
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl"><div className="flex w-full items-center justify-between gap-4 px-5 py-4 pr-28 sm:px-8 sm:pr-44"><span className="text-sm font-semibold text-slate-700">Deployment build detail</span><span className="hidden shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-blue-700 sm:inline-flex">Prototype simulation</span></div></div>
    <div className="w-full px-5 py-10 sm:px-8 lg:px-12">
      <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><div className="flex flex-wrap items-center gap-3"><h1 className="text-4xl font-bold tracking-[-.05em] sm:text-5xl">{source.id}</h1><span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold tracking-[.08em] text-amber-800 ring-1 ring-amber-200">{label(status)}</span></div><p className="mt-4 text-lg text-slate-600">{source.name} · {source.message}</p><div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500"><span className="inline-flex items-center gap-1.5"><GitBranch size={13}/>{source.branch}</span><code>{source.sha}</code><span>by {source.author}</span></div></div><div className="rounded-2xl border border-slate-200 bg-white p-4 lg:min-w-72"><p className="text-xs text-slate-500">Estimated completion</p><p className="mt-1 text-2xl font-bold">10:01 GST</p><p className="mt-1 text-[11px] text-slate-400">Estimate · ± 2 min, based on 20 successful runs</p></div></header>

      <section className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs text-slate-500">Started</p><p className="mt-2 text-sm font-bold">{source.started}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs text-slate-500">Build ended</p><p className="mt-2 text-sm font-bold">{source.ended ?? "Still running"}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs text-slate-500">Approval</p><p className="mt-2 inline-flex items-center gap-2 text-sm font-bold"><ShieldCheck size={16} className="text-amber-600"/>{status === "READY_FOR_APPROVAL" ? "OTP required" : status === "DEPLOYING" || status === "SUCCESS" ? "Verified" : "Pending"}</p></div></section>

      {isBackend ? <section className="mt-5 rounded-2xl border border-[#d22630]/20 bg-white p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#d22630]">Backend zero-downtime deployment · BLUE/GREEN</p><div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-[#e8e3dc] bg-[#faf9f7] p-4"><p className="text-xs text-[#77716b]">Last successfully published slot</p><p className="mt-2 text-xl font-bold">GREEN</p><p className="mt-1 text-xs text-[#77716b]">Artifact API-1836 · verified independently</p></div><div className="rounded-xl border border-[#e8e3dc] bg-[#faf9f7] p-4"><p className="text-xs text-[#77716b]">Active production traffic slot</p><p className="mt-2 text-xl font-bold">BLUE</p><p className="mt-1 text-xs text-[#77716b]">Publishing GREEN never implies traffic switched</p></div></div></section> : <section className="mt-5 rounded-2xl border border-[#ded9d2] bg-white p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#d22630]">Frontend deployment model</p><p className="mt-2 text-sm font-bold">Commit → Build → Backup → Verify → Approve → Deploy → Conditional rollback</p><p className="mt-2 text-xs leading-5 text-[#77716b]">Frontend publishes a verified immutable bundle. It does not use BLUE/GREEN deployment slots.</p></section>}

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#b70000]">Live deployment timeline</p><h2 className="mt-2 text-2xl font-bold text-slate-950">Exact-artifact journey</h2><p className="mt-2 max-w-xl text-xs leading-5 text-slate-500">A chronological view of the exact build artifact as it moves from source validation to production verification.</p></div><div className="flex shrink-0 items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800"><span className="h-2 w-2 animate-pulse rounded-full bg-blue-600"/>Monitoring locally</div></div><div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#b70000] transition-all" style={{ width: `${Math.max(8, ((activeIndex + 1) / timeline.length) * 100)}%` }}/></div><ol className="mt-6 divide-y divide-slate-100">{timeline.map((step, index) => { const done = index < activeIndex; const current = index === activeIndex; return <li key={step.name} className="flex min-w-0 gap-4 py-4 first:pt-0 last:pb-0"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold ${done ? "bg-emerald-600 text-white" : current ? "bg-[#b70000] text-white" : "bg-slate-100 text-slate-500"}`}>{done ? <Check size={16}/> : index + 1}</span><div className="min-w-0 flex-1 sm:grid sm:grid-cols-[minmax(0,1fr)_7rem] sm:gap-4"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className={`text-sm font-bold ${current ? "text-[#b70000]" : "text-slate-900"}`}>{step.name}</p>{current && <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[.08em] text-[#b70000]">Current</span>}</div><p className="mt-1 break-words text-xs leading-5 text-slate-600">{step.detail}</p></div><p className={`mt-2 font-mono text-[10px] sm:mt-0 sm:text-right ${done ? "text-emerald-700" : current ? "text-[#b70000]" : "text-slate-400"}`}>{step.time}</p></div></li>})}</ol></section>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
        <section className="overflow-hidden rounded-2xl bg-slate-950 text-white"><div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex items-center gap-2"><TerminalSquare size={16} className="text-red-400"/><h2 className="text-sm font-bold">Build logs</h2></div><div className="flex gap-2"><button onClick={() => setLogError(!logError)} className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-slate-400">{logError ? "Restore logs" : "Simulate error"}</button><button onClick={() => { navigator.clipboard?.writeText(logs.join("\n")); setCopied(true); }} className="rounded-md bg-white/5 p-1.5 text-slate-400" aria-label="Copy logs">{copied ? <Check size={13}/> : <Copy size={13}/>}</button></div></div>{logError ? <div className="grid min-h-72 place-items-center p-8 text-center"><div><AlertTriangle className="mx-auto text-amber-400"/><p className="mt-3 text-sm font-bold">Log telemetry unavailable</p><p className="mt-2 text-xs leading-5 text-slate-400">The workflow state remains intact. A telemetry failure never triggers rollback.</p></div></div> : <pre className="min-h-72 overflow-x-auto p-5 font-mono text-[11px] leading-7 text-slate-300">{logs.join("\n")}</pre>}</section>
        <div className="grid gap-5">
          <section className="relative overflow-hidden rounded-2xl border border-blue-200 bg-blue-50 p-5"><div className="relative"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white"><Bot size={18}/></span><h2 className="text-sm font-bold text-slate-950">AI deployment watch</h2></div><span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] text-blue-700 ring-1 ring-blue-200">Simulated</span></div><p className="mt-5 text-xs leading-6 text-slate-700">Duration is within its normal range. The publish stage is trending <strong className="text-blue-700">9% faster</strong>, with no anomaly requiring intervention.</p><div className="mt-4 flex items-center gap-2 border-t border-blue-200 pt-4 text-[10px] font-semibold uppercase tracking-[.1em] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600"/>Prototype insight · not live AI analysis</div></div></section>
          {status === "READY_FOR_APPROVAL" && <button onClick={() => setApprovalOpen(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b70000] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#8f0000]"><ShieldCheck size={14}/>Open production approval</button>}
          <p className="text-[11px] leading-5 text-slate-600">{notice}</p>
          {status === "DISPATCH_FAILED" && <button onClick={() => { setStatus("DEPLOYING"); setNotice("Dispatch retried for the same approved artifact—no repeat OTP needed."); }} className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-bold text-white"><RefreshCw size={14}/>Retry approved dispatch</button>}
          <div className="grid grid-cols-2 gap-2"><button onClick={() => {setStatus("DISPATCH_FAILED"); setNotice("Dispatch failed after approval. Safe retry is available.");}} className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700"><AlertTriangle size={15} className="mx-auto mb-2 text-orange-500"/>Dispatch failure</button><button onClick={() => {setStatus("ROLLED_BACK"); setNotice("Rollback simulated after a deployment verification failure.");}} className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700"><RotateCcw size={15} className="mx-auto mb-2 text-slate-500"/>Rollback</button></div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-400">Frontend-only demonstration. No API, OTP service, deployment runner, email, or GitHub action is connected.</p>
    </div>
    {approvalOpen && <div className="fixed inset-0 z-[120] grid place-items-center bg-black/75 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="detail-approval-title"><div className="w-full max-w-md rounded-2xl border border-[#344567] bg-[#0c1220] p-6 shadow-[0_30px_100px_rgba(0,0,0,.7)]"><div className="grid h-12 w-12 place-items-center rounded-xl bg-[#7c3aed]/20 text-[#c4b5fd]"><KeyRound size={22}/></div><p className="mt-5 text-[10px] font-bold uppercase tracking-[.16em] text-[#67e8f9]">Production approval required</p><h3 id="detail-approval-title" className="mt-2 text-2xl font-bold text-white">Approve {source.id}</h3><p className="mt-3 text-sm leading-6 text-[#a7b7d1]">Enter the demo OTP to deploy this exact staged artifact without rebuilding.</p><div className="mt-5 rounded-xl border border-[#2a3a58] bg-[#111a2e] px-4 py-3"><p className="text-[10px] uppercase tracking-[.12em] text-[#71829e]">Demo OTP</p><p className="mt-1 font-mono text-lg font-bold tracking-[.2em] text-white">246810</p></div><input autoFocus value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} onKeyDown={(event) => { if (event.key === "Enter") verify(); }} inputMode="numeric" maxLength={6} aria-label="Demo OTP" placeholder="Enter 6-digit OTP" className="mt-4 w-full rounded-xl border border-[#344567] bg-[#070b14] px-4 py-3 text-center font-mono text-lg tracking-[.25em] text-white outline-none focus:border-[#7c3aed]"/><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={() => setApprovalOpen(false)} className="rounded-xl border border-[#344567] px-4 py-3 text-sm font-bold text-[#a7b7d1]">Cancel</button><button onClick={verify} className="rounded-xl bg-[#7c3aed] px-4 py-3 text-sm font-bold text-white">Verify & deploy</button></div><p className="mt-3 text-center text-[11px] text-[#8fa1bd]">Local prototype only. No real OTP or deployment is triggered.</p></div></div>}
  </main>;
}
