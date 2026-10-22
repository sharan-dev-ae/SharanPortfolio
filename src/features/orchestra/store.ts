"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Provider = "Codex" | "Claude Code" | "Antigravity" | "OpenRouter";
export type TaskStatus = "Backlog" | "Ready" | "Running" | "Review" | "Done";
export type SessionStatus = "running" | "paused" | "completed" | "failed" | "stopped";

export type OrchestraProject = { id:string; name:string; description:string; path:string; provider:Provider; model:string; budget:number; archived:boolean; createdAt:string };
export type OrchestraTask = { id:string; projectId:string; title:string; description:string; priority:"Low"|"Medium"|"High"; provider:Provider; status:TaskStatus; approved:boolean; dependencies:string[]; criteria:string[]; history:string[] };
export type OrchestraSession = { id:string; taskId:string; projectId:string; provider:Provider; model:string; status:SessionStatus; progress:number; inputTokens:number; outputTokens:number; cost:number; elapsed:number; attempt:number; logs:string[]; createdAt:string };
export type OrchestraActivity = { id:string; text:string; time:string; tone:"indigo"|"green"|"amber" };
export type OrchestraSettings = { defaultProvider:Provider; defaultModel:string; defaultBudget:number; speed:number; theme:"dark"|"system"; enabled:Record<Provider,boolean> };

export type Store = {
  projects: OrchestraProject[]; tasks: OrchestraTask[]; sessions: OrchestraSession[]; activity: OrchestraActivity[]; settings: OrchestraSettings;
  addProject:(data:Omit<OrchestraProject,"id"|"archived"|"createdAt">)=>void;
  updateProject:(id:string,data:Partial<OrchestraProject>)=>void; archiveProject:(id:string)=>void;
  generatePlan:(projectId:string,prompt:string)=>void; addTask:(projectId:string)=>void; updateTask:(id:string,data:Partial<OrchestraTask>)=>void; deleteTask:(id:string)=>void; reorderTask:(id:string,direction:-1|1)=>void;
  approveTask:(id:string)=>void; startSession:(taskId:string)=>void; sessionAction:(id:string,action:"pause"|"resume"|"stop"|"complete"|"retry")=>void; tick:()=>void; pauseRunning:()=>void;
  updateSettings:(data:Partial<OrchestraSettings>)=>void; reset:()=>void;
};

const now = () => new Date().toISOString();
const uid = (prefix:string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
const activity = (text:string,tone:OrchestraActivity["tone"]="indigo"):OrchestraActivity => ({id:uid("act"),text,time:now(),tone});
const projectSeeds:OrchestraProject[] = [
  {id:"p-routewise",name:"RouteWise",description:"Smart route comparison experience for Dubai drivers.",path:"D:/Labs/routewise",provider:"Codex",model:"gpt-5.3-codex",budget:180000,archived:false,createdAt:"2026-10-18T08:00:00Z"},
  {id:"p-portfolio",name:"Portfolio",description:"Personal engineering portfolio and interactive product lab.",path:"D:/SharanPortfolio",provider:"Claude Code",model:"claude-sonnet-4.5",budget:120000,archived:false,createdAt:"2026-10-10T08:00:00Z"},
  {id:"p-orchestra",name:"Orchestra",description:"Local-first command center for AI development agents.",path:"D:/Labs/orchestra",provider:"Codex",model:"gpt-5.3-codex",budget:240000,archived:false,createdAt:"2026-10-22T08:00:00Z"},
];
const taskSeeds:OrchestraTask[] = [
  {id:"t1",projectId:"p-orchestra",title:"Design orchestration store",description:"Model typed project, task, session and usage state.",priority:"High",provider:"Codex",status:"Done",approved:true,dependencies:[],criteria:["Versioned persistence","Typed actions"],history:["Created from architecture prompt","Completed by Codex"]},
  {id:"t2",projectId:"p-routewise",title:"Improve mobile route cards",description:"Refine responsive comparison cards and selection states.",priority:"Medium",provider:"Claude Code",status:"Running",approved:true,dependencies:[],criteria:["Touch friendly","No horizontal overflow"],history:["Approved","Session started"]},
  {id:"t3",projectId:"p-portfolio",title:"Audit navigation accessibility",description:"Review keyboard and focus behavior across routes.",priority:"High",provider:"Codex",status:"Review",approved:true,dependencies:[],criteria:["Visible focus","Semantic labels"],history:["Execution completed","Awaiting review"]},
  {id:"t4",projectId:"p-orchestra",title:"Add provider settings",description:"Build provider preferences without API key inputs.",priority:"Low",provider:"OpenRouter",status:"Ready",approved:true,dependencies:["t1"],criteria:["No secrets collected"],history:["Plan generated","Approved"]},
];
const sessionSeeds:OrchestraSession[] = [
  {id:"s1",taskId:"t2",projectId:"p-routewise",provider:"Claude Code",model:"claude-sonnet-4.5",status:"paused",progress:62,inputTokens:18420,outputTokens:6210,cost:0.15,elapsed:438,attempt:1,logs:["Workspace context indexed","Component tree inspected","Responsive card patch prepared","Session paused after reload"],createdAt:"2026-10-22T07:44:00Z"},
  {id:"s3",taskId:"t4",projectId:"p-orchestra",provider:"OpenRouter",model:"qwen3-coder",status:"paused",progress:38,inputTokens:9120,outputTokens:2840,cost:0.06,elapsed:214,attempt:1,logs:["Provider preferences inspected","Settings schema generated","Session paused safely"],createdAt:"2026-10-22T08:18:00Z"},
  {id:"s2",taskId:"t3",projectId:"p-portfolio",provider:"Codex",model:"gpt-5.3-codex",status:"completed",progress:100,inputTokens:12880,outputTokens:4330,cost:0.09,elapsed:362,attempt:1,logs:["Routes enumerated","Focus states inspected","Accessibility report generated","Execution completed"],createdAt:"2026-10-21T15:22:00Z"},
];
const initialSettings:OrchestraSettings={defaultProvider:"Codex",defaultModel:"gpt-5.3-codex",defaultBudget:150000,speed:1,theme:"dark",enabled:{Codex:true,"Claude Code":true,Antigravity:true,OpenRouter:true}};
const initialActivity:OrchestraActivity[]=[activity("Orchestra workspace initialized","green"),activity("Navigation audit moved to review","amber"),activity("RouteWise agent session paused","indigo")];

const costFor=(input:number,output:number)=>Number(((input/1e6)*3+(output/1e6)*12).toFixed(4));

const useOrchestraStoreBase=create<Store>()(persist((set)=>({
  projects:projectSeeds,tasks:taskSeeds,sessions:sessionSeeds,activity:initialActivity,settings:initialSettings,
  addProject:data=>set(s=>({projects:[...s.projects,{...data,id:uid("p"),archived:false,createdAt:now()}],activity:[activity(`Project ${data.name} created`,"green"),...s.activity]})),
  updateProject:(id,data)=>set(s=>({projects:s.projects.map(p=>p.id===id?{...p,...data}:p),activity:[activity("Project settings updated"),...s.activity]})),
  archiveProject:id=>set(s=>({projects:s.projects.map(p=>p.id===id?{...p,archived:true}:p),activity:[activity("Project archived","amber"),...s.activity]})),
  generatePlan:(projectId,prompt)=>set(s=>{const lower=prompt.toLowerCase(); const topics=lower.includes("auth")?["Model authentication states","Build sign-in experience","Add route guards","Test session expiry"]:lower.includes("dashboard")?["Define dashboard metrics","Build responsive KPI grid","Add activity visualization","Validate empty states"]:lower.includes("mobile")?["Audit mobile breakpoints","Refine touch interactions","Optimize compact navigation","Test small-screen flows"]:["Analyze requested change","Design implementation approach","Implement core experience","Add validation and tests"]; const items=topics.map((title,i):OrchestraTask=>({id:uid(`t${i}`),projectId,title,description:`${title} for: ${prompt.slice(0,90)}`,priority:i===0?"High":"Medium",provider:s.settings.defaultProvider,status:"Backlog",approved:false,dependencies:i?[topics[i-1]]:[],criteria:["Matches the requested behavior","Handles responsive and empty states"],history:["Generated by deterministic demo planner"]})); return {tasks:[...s.tasks,...items],activity:[activity(`Simulated plan generated · ${items.length} tasks`,"green"),...s.activity]};}),
  addTask:projectId=>set(s=>({tasks:[...s.tasks,{id:uid("t"),projectId,title:"Untitled development task",description:"Add implementation details.",priority:"Medium",provider:s.settings.defaultProvider,status:"Backlog",approved:false,dependencies:[],criteria:["Define acceptance criteria"],history:["Task created manually"]}]})),
  updateTask:(id,data)=>set(s=>({tasks:s.tasks.map(t=>t.id===id?{...t,...data,history:[`${new Date().toLocaleTimeString()} · Task updated`,...t.history]}:t)})),
  deleteTask:id=>set(s=>({tasks:s.tasks.filter(t=>t.id!==id),activity:[activity("Task deleted","amber"),...s.activity]})),
  reorderTask:(id,direction)=>set(s=>{const tasks=[...s.tasks],i=tasks.findIndex(t=>t.id===id),j=i+direction;if(i<0||j<0||j>=tasks.length)return s;[tasks[i],tasks[j]]=[tasks[j],tasks[i]];return {tasks};}),
  approveTask:id=>set(s=>({tasks:s.tasks.map(t=>t.id===id?{...t,approved:true,status:"Ready",history:["Approved for simulated execution",...t.history]}:t),activity:[activity("Task approved and ready","green"),...s.activity]})),
  startSession:taskId=>set(s=>{const task=s.tasks.find(t=>t.id===taskId);if(!task||!task.approved)return s;const project=s.projects.find(p=>p.id===task.projectId)!;const session:OrchestraSession={id:uid("s"),taskId,projectId:task.projectId,provider:task.provider,model:project?.model||s.settings.defaultModel,status:"running",progress:3,inputTokens:240,outputTokens:60,cost:costFor(240,60),elapsed:0,attempt:1,logs:["Simulation started","Workspace metadata loaded"],createdAt:now()};return {sessions:[session,...s.sessions],tasks:s.tasks.map(t=>t.id===taskId?{...t,status:"Running"}:t),activity:[activity(`Agent started · ${task.title}`,"green"),...s.activity]};}),
  sessionAction:(id,action)=>set(s=>{const source=s.sessions.find(x=>x.id===id);if(!source)return s;if(action==="retry"){const retry={...source,id:uid("s"),status:"running" as const,progress:2,inputTokens:120,outputTokens:20,cost:costFor(120,20),elapsed:0,attempt:source.attempt+1,logs:[`Retry attempt ${source.attempt+1} started`],createdAt:now()};return {sessions:[retry,...s.sessions],tasks:s.tasks.map(t=>t.id===source.taskId?{...t,status:"Running"}:t),activity:[activity("Session retry started","amber"),...s.activity]};}const status:SessionStatus=action==="pause"?"paused":action==="resume"?"running":action==="complete"?"completed":"stopped";const progress=action==="complete"?100:source.progress;const taskStatus:TaskStatus=status==="running"?"Running":status==="completed"?"Review":status==="paused"?"Running":"Ready";return {sessions:s.sessions.map(x=>x.id===id?{...x,status,progress,logs:[`${action[0].toUpperCase()+action.slice(1)} action recorded`,...x.logs]}:x),tasks:s.tasks.map(t=>t.id===source.taskId?{...t,status:taskStatus}:t),activity:[activity(`Session ${status}`,status==="completed"?"green":"amber"),...s.activity]};}),
  tick:()=>set(s=>({sessions:s.sessions.map(x=>{if(x.status!=="running")return x;const addIn=180*s.settings.speed,addOut=70*s.settings.speed,progress=Math.min(100,x.progress+2*s.settings.speed);return {...x,progress,inputTokens:x.inputTokens+addIn,outputTokens:x.outputTokens+addOut,cost:costFor(x.inputTokens+addIn,x.outputTokens+addOut),elapsed:x.elapsed+2,status:progress>=100?"completed":"running",logs:Math.floor(progress)%20<3?[`Progress checkpoint ${Math.floor(progress)}%`,...x.logs].slice(0,12):x.logs};}),tasks:s.tasks.map(t=>s.sessions.some(x=>x.taskId===t.id&&x.status==="running"&&x.progress>=98)?{...t,status:"Review"}:t)})),
  pauseRunning:()=>set(s=>({sessions:s.sessions.map(x=>x.status==="running"?{...x,status:"paused",logs:["Restored safely in paused state",...x.logs]}:x)})),
  updateSettings:data=>set(s=>({settings:{...s.settings,...data},activity:[activity("Simulation preferences updated"),...s.activity]})),
  reset:()=>set({projects:projectSeeds,tasks:taskSeeds,sessions:sessionSeeds,activity:initialActivity,settings:initialSettings}),
}),{name:"orchestra-demo-v1",version:1}));

export function useOrchestraStore(): Store {
  return useOrchestraStoreBase();
}
