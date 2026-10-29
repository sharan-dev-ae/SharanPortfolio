"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CircleCheckBig, ExternalLink, Pause, Play, Plus, RefreshCcw, ShieldCheck, Timer, X } from "lucide-react";

type Status = "Pending" | "In Progress" | "On Hold" | "Completed";
type Task = { id: number; title: string; project: string; milestone: string; status: Status; minutes: number; elapsed: number };
const statuses: Status[] = ["Pending", "In Progress", "On Hold", "Completed"];
const seed: Task[] = [
  { id: 1, title: "Refine Product Lab introduction", project: "Portfolio Evolution", milestone: "Launch Product Lab", status: "Pending", minutes: 35, elapsed: 0 },
  { id: 2, title: "Build Invictus prototype", project: "Portfolio Evolution", milestone: "Launch Product Lab", status: "In Progress", minutes: 90, elapsed: 1458 },
  { id: 3, title: "Test mobile interactions", project: "Portfolio Evolution", milestone: "Launch Product Lab", status: "On Hold", minutes: 30, elapsed: 420 },
  { id: 4, title: "Publish production update", project: "Portfolio Evolution", milestone: "Publish Invictus story", status: "Completed", minutes: 25, elapsed: 1320 },
  { id: 5, title: "Review weekly outcomes", project: "Personal Operating System", milestone: "Weekly planning", status: "Completed", minutes: 20, elapsed: 1020 },
  { id: 6, title: "Select tomorrow’s focus", project: "Personal Operating System", milestone: "Weekly planning", status: "Pending", minutes: 15, elapsed: 0 },
  { id: 7, title: "Block deep-work session", project: "Personal Operating System", milestone: "Focus routine", status: "Pending", minutes: 10, elapsed: 0 },
  { id: 8, title: "Book annual health check", project: "Standalone", milestone: "No milestone", status: "Pending", minutes: 10, elapsed: 0 },
];

export function InvictusDashboard() {
  const [tasks, setTasks] = useState(seed);
  const [project, setProject] = useState("All projects");
  const [milestone, setMilestone] = useState("All milestones");
  const [editing, setEditing] = useState<Task | null>(null);
  const [creating, setCreating] = useState(false);
  const [running, setRunning] = useState<number | null>(2);
  const [dragging, setDragging] = useState<number | null>(null);

  useEffect(() => {
    if (running === null) return;
    const tick = window.setInterval(() => setTasks(items => items.map(task => task.id === running ? { ...task, elapsed: task.elapsed + 1 } : task)), 1000);
    return () => window.clearInterval(tick);
  }, [running]);

  const visible = useMemo(() => tasks.filter(task => (project === "All projects" || task.project === project) && (milestone === "All milestones" || task.milestone === milestone)), [tasks, project, milestone]);
  const move = (id: number, status: Status) => setTasks(items => items.map(task => task.id === id ? { ...task, status } : task));
  const reset = () => { setTasks(seed); setProject("All projects"); setMilestone("All milestones"); setRunning(2); };

  return <main id="main-content" className="min-h-screen bg-[#08090e] text-[#f7f7fb]">
    <section className="relative overflow-hidden border-b border-[#252837] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(129,140,248,.18),transparent_34%)]" />
      <div className="relative mx-auto max-w-[1500px]"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#a78bfa]"><ShieldCheck size={16} /> Personal execution system · Live product</div><div className="mt-8 grid gap-10 lg:grid-cols-[1fr_430px] lg:items-end"><div><h1 className="max-w-4xl text-5xl font-semibold tracking-[-.065em] sm:text-7xl">Turn ambition into forward motion.</h1><p className="mt-6 max-w-2xl text-base leading-8 text-[#8b8e9c]">Invictus brings goals, projects, milestones, and daily tasks into one focused workspace—helping you decide what matters and keep moving.</p><a href="https://invictus.sharan-ks.com/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#818cf8] px-6 py-3 text-xs font-bold text-[#08090e] transition hover:-translate-y-0.5">Explore the real product <ExternalLink size={14} /></a></div><div className="grid grid-cols-3 gap-3">{[["4","workflow states"],["8","active tasks"],["72%","momentum"]].map(([value,label])=><div key={label} className="rounded-xl border border-[#252837] bg-[#10121a] p-4"><p className="text-2xl font-semibold">{value}</p><p className="mt-2 text-[9px] text-[#8b8e9c]">{label}</p></div>)}</div></div></div>
    </section>

    <section className="border-b border-emerald-300/20 bg-emerald-300/[.06] px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" /></span>
          <p className="text-xs font-semibold text-emerald-100"><span className="font-bold">Invictus is live.</span> This page is an interactive preview of the fully available product.</p>
        </div>
        <a href="https://invictus.sharan-ks.com/" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-bold text-emerald-200 hover:text-white">Open live Invictus <ExternalLink size={13} /></a>
      </div>
    </section>

    <section className="px-5 py-10 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1500px]">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#818cf8]">Interactive prototype · local demo state</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.04em]">Today&apos;s execution board</h2></div><div className="flex flex-wrap gap-2"><select aria-label="Filter by project" value={project} onChange={e => { setProject(e.target.value); setMilestone("All milestones"); }} className="rounded-lg border border-[#252837] bg-[#10121a] px-3 py-2 text-[10px] outline-none"><option>All projects</option><option>Portfolio Evolution</option><option>Personal Operating System</option><option>Standalone</option></select><select aria-label="Filter by milestone" value={milestone} onChange={e => setMilestone(e.target.value)} className="rounded-lg border border-[#252837] bg-[#10121a] px-3 py-2 text-[10px] outline-none"><option>All milestones</option>{[...new Set(tasks.filter(t => project === "All projects" || t.project === project).map(t => t.milestone))].map(m => <option key={m}>{m}</option>)}</select><button onClick={() => setCreating(true)} className="flex items-center gap-2 rounded-lg bg-[#818cf8] px-4 py-2 text-[10px] font-bold text-[#08090e]"><Plus size={13} />New task</button><button onClick={reset} className="grid h-9 w-9 place-items-center rounded-lg border border-[#252837] text-[#8b8e9c]" aria-label="Reset demo"><RefreshCcw size={13} /></button></div></div>
      <div className="mt-6 overflow-x-auto pb-4"><div className="grid min-w-[1050px] grid-cols-4 gap-3">{statuses.map(status => <section key={status} onDragOver={e => e.preventDefault()} onDrop={() => { if (dragging !== null) move(dragging, status); setDragging(null); }} className="min-h-[420px] rounded-xl border border-[#252837] bg-[#10121a] p-3"><div className="flex items-center justify-between px-1 pb-3"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#8b8e9c]">{status}</p><span className="rounded-full bg-[#171925] px-2 py-1 text-[8px] text-[#8b8e9c]">{visible.filter(t => t.status === status).length}</span></div><div className="space-y-2">{visible.filter(t => t.status === status).map(task => <article key={task.id} draggable onDragStart={() => setDragging(task.id)} onClick={() => setEditing(task)} className={`cursor-pointer rounded-xl border bg-[#171925] p-4 transition hover:-translate-y-0.5 ${running === task.id ? "border-[#818cf8]/70 shadow-[0_0_28px_rgba(129,140,248,.12)]" : "border-[#252837]"}`}><p className="text-xs font-semibold leading-5">{task.title}</p><p className="mt-3 text-[8px] text-[#8b8e9c]">{task.project} · {task.milestone}</p><div className="mt-4 flex items-center justify-between"><span className="flex items-center gap-1 text-[8px] text-[#8b8e9c]"><Timer size={10} />{task.minutes}m estimate</span>{task.elapsed > 0 && <span className="font-mono text-[9px] text-[#a78bfa]">{clock(task.elapsed)}</span>}</div><div className="mt-3 flex gap-1">{statuses.filter(s => s !== status).slice(0,2).map(s => <button key={s} onClick={e => { e.stopPropagation(); move(task.id, s); }} className="rounded bg-white/[.04] px-2 py-1 text-[7px] text-[#8b8e9c]">→ {s}</button>)}</div></article>)}</div></section>)}</div></div>
    </div></section>

    <section className="border-y border-[#252837] bg-[#10121a] px-5 py-14 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1500px] gap-4 md:grid-cols-3">{[["01","Flexible hierarchy","Project → Milestone → Task, with standalone tasks when structure is unnecessary."],["02","Live effort tracking","Estimated duration and active timers keep planned effort visible."],["03","A repeatable rhythm","Capture → Structure → Prioritize → Execute → Review."]].map(([n,title,body])=><div key={n} className="rounded-xl border border-[#252837] bg-[#171925] p-6"><p className="text-[9px] text-[#818cf8]">{n}</p><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-3 text-xs leading-6 text-[#8b8e9c]">{body}</p></div>)}</div></section>
    <section className="px-5 py-16 text-center sm:px-8"><h2 className="text-3xl font-semibold tracking-[-.04em]">Build momentum beyond the prototype.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#8b8e9c]">This experience presents the core Invictus workflow. Open the live application to create an account, manage real plans, and track your progress.</p><a href="https://invictus.sharan-ks.com/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#818cf8]/50 px-6 py-3 text-xs font-bold text-[#a78bfa]">View live application <ArrowRight size={14} /></a></section>
    {(editing || creating) && <TaskModal task={editing} close={() => { setEditing(null); setCreating(false); }} save={task => { if (editing) setTasks(items => items.map(t => t.id === task.id ? task : t)); else setTasks(items => [...items, { ...task, id: Date.now() }]); setEditing(null); setCreating(false); }} running={running} setRunning={setRunning} />}
  </main>;
}

function TaskModal({ task, close, save, running, setRunning }: { task: Task | null; close: () => void; save: (task: Task) => void; running: number | null; setRunning: (id: number | null) => void }) {
  const [draft, setDraft] = useState<Task>(task ?? { id: 0, title: "", project: "Portfolio Evolution", milestone: "Launch Product Lab", status: "Pending", minutes: 30, elapsed: 0 });
  return <div className="fixed inset-0 z-[150] grid place-items-end bg-black/70 p-0 sm:place-items-center sm:p-4" onClick={close}><form onSubmit={e => { e.preventDefault(); if (draft.title.trim()) save(draft); }} onClick={e => e.stopPropagation()} className="w-full max-w-lg rounded-t-2xl border border-[#252837] bg-[#10121a] p-6 shadow-2xl sm:rounded-2xl"><div className="flex items-start justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#818cf8]">{task ? "Task detail" : "Capture next move"}</p><h2 className="mt-2 text-xl font-semibold">{task ? "Refine the task" : "Create a task"}</h2></div><button type="button" onClick={close} aria-label="Close"><X size={18} /></button></div><label className="mt-6 block text-[9px] uppercase text-[#8b8e9c]">Task title<input autoFocus value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} className="mt-2 w-full rounded-lg border border-[#252837] bg-[#171925] p-3 text-xs outline-none focus:border-[#818cf8]" /></label><div className="mt-4 grid grid-cols-2 gap-3"><label className="text-[9px] uppercase text-[#8b8e9c]">Status<select value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value as Status })} className="mt-2 w-full rounded-lg border border-[#252837] bg-[#171925] p-3 text-xs">{statuses.map(s => <option key={s}>{s}</option>)}</select></label><label className="text-[9px] uppercase text-[#8b8e9c]">Estimate (minutes)<input type="number" min="5" step="5" value={draft.minutes} onChange={e => setDraft({ ...draft, minutes: Number(e.target.value) })} className="mt-2 w-full rounded-lg border border-[#252837] bg-[#171925] p-3 text-xs" /></label></div>{task && <div className="mt-5 flex items-center justify-between rounded-xl border border-[#252837] bg-[#171925] p-4"><div><p className="text-[8px] uppercase text-[#8b8e9c]">Focused time</p><p className="mt-1 font-mono text-lg text-[#a78bfa]">{clock(draft.elapsed)}</p></div><button type="button" onClick={() => setRunning(running === task.id ? null : task.id)} className="flex items-center gap-2 rounded-lg bg-[#818cf8] px-4 py-2 text-[10px] font-bold text-[#08090e]">{running === task.id ? <Pause size={13} /> : <Play size={13} />}{running === task.id ? "Pause" : draft.elapsed ? "Resume" : "Start"}</button></div>}<div className="mt-6 flex gap-2"><button className="flex-1 rounded-lg bg-[#818cf8] py-3 text-[10px] font-bold text-[#08090e]">Save task</button>{task && <button type="button" onClick={() => save({ ...draft, status: "Completed" })} className="flex items-center gap-2 rounded-lg border border-emerald-400/30 px-4 text-[10px] text-emerald-300"><CircleCheckBig size={13} />Complete</button>}</div></form></div>;
}

function clock(seconds: number) { const h = Math.floor(seconds / 3600); const m = Math.floor((seconds % 3600) / 60); const s = seconds % 60; return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`; }
