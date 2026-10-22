"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  ArrowRight,
  Bell,
  Check,
  Clock3,
  Fuel,
  Gauge,
  History,
  LocateFixed,
  MapPin,
  Navigation,
  Route,
  Settings,
  ShieldCheck,
  Sparkles,
  Smartphone,
  WalletCards,
} from "lucide-react";
import {
  routeOptions,
  vehicles,
  type RouteId,
  type VehicleId,
} from "@/data/routeWisePrototype";

const money = (value: number) => `AED ${value.toFixed(2)}`;
const RouteWiseMap = dynamic(() => import("@/components/prototypes/RouteWiseMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#0b111b]" />,
});

export function RouteWiseDashboard() {
  const [showIntro, setShowIntro] = useState(true);
  const [origin, setOrigin] = useState("Downtown Dubai");
  const [destination, setDestination] = useState("Dubai International Airport");
  const [departure, setDeparture] = useState("08:30");
  const [vehicle, setVehicle] = useState<VehicleId>("sedan");
  const [efficiency, setEfficiency] = useState(vehicles.sedan.efficiency);
  const [fuelPrice, setFuelPrice] = useState(2.72);
  const [timeValue, setTimeValue] = useState(45);
  const [selected, setSelected] = useState<RouteId>("balanced");
  const [comparisonCount, setComparisonCount] = useState(0);

  const calculated = useMemo(
    () =>
      routeOptions.map((route) => {
        const fuel = (route.distance / Math.max(efficiency, 1)) * fuelPrice;
        const total = fuel + route.salik;
        const score = total + (route.minutes / 60) * timeValue;
        return { ...route, fuel, total, score };
      }),
    [efficiency, fuelPrice, timeValue],
  );
  const recommended = calculated.reduce((best, route) =>
    route.score < best.score ? route : best,
  );
  const highestTotal = Math.max(...calculated.map((route) => route.total));
  const selectedRoute = calculated.find((route) => route.id === selected)!;

  function chooseVehicle(id: VehicleId) {
    setVehicle(id);
    setEfficiency(vehicles[id].efficiency);
  }

  function swapLocations() {
    setOrigin(destination);
    setDestination(origin);
  }

  return (
    <main
      id="main-content"
      className="prototype-fullscreen routewise-theme fixed inset-0 z-[60] min-h-screen w-screen overflow-y-auto bg-[#080b12] text-[#eef3fb]"
    >
      {showIntro && <RouteWiseIntro onClose={() => setShowIntro(false)} />}
      <div className="min-h-screen xl:grid xl:grid-cols-[88px_340px_minmax(420px,1fr)_370px]">
        <aside className="hidden border-r border-[#222b3b] bg-[#0a0e16] xl:flex xl:flex-col xl:items-center xl:py-6">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#3772ff] shadow-[0_0_28px_rgba(55,114,255,.3)]">
            <Navigation size={21} fill="currentColor" />
          </div>
          <nav className="mt-14 flex flex-1 flex-col gap-3" aria-label="Prototype navigation">
            {([
              { icon: Route, label: "Route planner", active: true },
              { icon: WalletCards, label: "Saved journeys", active: false },
              { icon: History, label: "Trip history", active: false },
              { icon: Settings, label: "Settings", active: false },
            ] satisfies { icon: LucideIcon; label: string; active: boolean }[]).map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                title={label}
                className={`grid h-11 w-11 place-items-center rounded-xl transition ${active ? "bg-[#3772ff]/15 text-[#70a1ff]" : "text-[#536078] hover:bg-white/5 hover:text-[#94a3b8]"}`}
              >
                <Icon size={19} />
              </button>
            ))}
          </nav>
          <div className="grid h-10 w-10 place-items-center rounded-full border border-[#2c3850] bg-gradient-to-br from-[#3772ff] to-[#a879ff] text-xs font-bold">
            SK
          </div>
        </aside>

        <header className="flex items-center justify-between border-b border-[#222b3b] bg-[#0d1119] px-4 py-3 xl:hidden">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#3772ff]"><Navigation size={18} fill="currentColor" /></span>
            <div><p className="text-sm font-bold">RouteWise</p><p className="text-[9px] uppercase tracking-[.16em] text-[#536078]">Smart route intelligence</p></div>
          </div>
        </header>

        <section className="border-r border-[#222b3b] bg-[#0d1119] p-5 sm:p-6 xl:h-screen xl:overflow-y-auto">
          <div className="hidden xl:block">
            <p className="text-lg font-bold tracking-tight">RouteWise</p>
            <p className="mt-1 text-[10px] uppercase tracking-[.18em] text-[#536078]">Smart route intelligence</p>
          </div>
          <div className="mt-2 flex items-end justify-between xl:mt-10">
            <div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#70a1ff]">Plan a journey</p><h1 className="mt-2 text-2xl font-semibold tracking-[-.04em]">Where to next?</h1></div>
          </div>

          <div className="relative mt-7 space-y-3">
            <LocationInput label="From" value={origin} onChange={setOrigin} accent="#33D69F" />
            <button onClick={swapLocations} title="Swap origin and destination" className="absolute right-4 top-[66px] z-10 grid h-8 w-8 place-items-center rounded-lg border border-[#2b3649] bg-[#111722] text-[#70a1ff] transition hover:rotate-180 hover:border-[#3772ff]"><ArrowLeftRight size={14} /></button>
            <LocationInput label="To" value={destination} onChange={setDestination} accent="#3772FF" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="rounded-xl border border-[#222b3b] bg-[#0a0f17] px-3 py-2.5"><span className="block text-[9px] uppercase tracking-[.14em] text-[#536078]">Departure</span><span className="mt-1 flex items-center gap-2"><Clock3 size={14} className="text-[#70a1ff]"/><input type="time" value={departure} onChange={(e) => setDeparture(e.target.value)} className="min-w-0 bg-transparent text-xs font-semibold text-[#eef3fb] outline-none [color-scheme:dark]"/></span></label>
            <label className="rounded-xl border border-[#222b3b] bg-[#0a0f17] px-3 py-2.5"><span className="block text-[9px] uppercase tracking-[.14em] text-[#536078]">Vehicle</span><select value={vehicle} onChange={(e) => chooseVehicle(e.target.value as VehicleId)} className="mt-1 w-full bg-transparent text-xs font-semibold text-[#eef3fb] outline-none [color-scheme:dark]">{Object.entries(vehicles).map(([id, item]) => <option key={id} value={id}>{item.name}</option>)}</select></label>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <NumberField label="Fuel economy" value={efficiency} suffix="km/L" onChange={setEfficiency}/>
            <NumberField label="Fuel price" value={fuelPrice} suffix="AED/L" step="0.01" onChange={setFuelPrice}/>
          </div>

          <div className="mt-6 rounded-2xl border border-[#222b3b] bg-[#111722] p-4">
            <div className="flex items-center justify-between"><div><p className="text-xs font-semibold">Value of your time</p><p className="mt-1 text-[10px] text-[#536078]">Balances speed against expense</p></div><span className="text-sm font-bold text-[#70a1ff]">AED {timeValue}/hr</span></div>
            <input aria-label="Value of time" type="range" min="0" max="150" step="5" value={timeValue} onChange={(e) => setTimeValue(Number(e.target.value))} className="mt-5 w-full accent-[#3772ff]"/>
            <div className="mt-1 flex justify-between text-[9px] text-[#536078]"><span>Save money</span><span>Save time</span></div>
          </div>

          <button onClick={() => { setSelected(recommended.id); setComparisonCount((count) => count + 1); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3772ff] px-4 py-3.5 text-sm font-bold shadow-[0_12px_32px_rgba(55,114,255,.25)] transition hover:bg-[#4b80ff] active:scale-[.99]"><Sparkles size={16}/>Compare routes</button>
          <p className="mt-3 text-center text-[9px] leading-4 text-[#536078]">Demo estimate only · mock traffic, toll and fuel data</p>
        </section>

        <section className="relative min-h-[440px] overflow-hidden border-b border-[#222b3b] bg-[#090e15] xl:h-screen xl:border-b-0 xl:border-r">
          <div className="absolute inset-0"><RouteWiseMap selected={selected} onSelect={setSelected}/></div>
          <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-xl border border-[#2a3446] bg-[#0d1119]/90 px-3 py-2 text-[10px] text-[#94a3b8] backdrop-blur"><LocateFixed size={14} className="text-[#70a1ff]"/>Dubai · live preview</div>
          <button onClick={() => setShowIntro(true)} className="absolute right-5 top-5 z-20 hidden items-center gap-2 rounded-xl border border-[#3772ff]/30 bg-[#0d1119]/90 px-3 py-2 text-[10px] font-semibold text-[#70a1ff] shadow-[0_0_24px_rgba(55,114,255,.12)] backdrop-blur transition hover:border-[#70a1ff] sm:flex"><Smartphone size={14}/>Mobile app preview</button>
          <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="rounded-2xl border border-[#2a3446] bg-[#0d1119]/92 p-4 shadow-2xl backdrop-blur-xl"><p className="text-[9px] uppercase tracking-[.15em] text-[#536078]">Selected journey</p><div className="mt-2 flex items-end gap-5"><div><p className="text-xl font-bold">{selectedRoute.minutes} min</p><p className="mt-1 text-[10px] text-[#94a3b8]">{selectedRoute.distance} km · {selectedRoute.via}</p></div><div><p className="text-xl font-bold text-[#70a1ff]">{money(selectedRoute.total)}</p><p className="mt-1 text-[10px] text-[#536078]">estimated trip</p></div></div></div>
            <div className="flex flex-wrap gap-2 rounded-xl border border-[#2a3446] bg-[#0d1119]/92 p-2 backdrop-blur-xl">{calculated.map((route) => <button key={route.id} onClick={() => setSelected(route.id)} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-semibold transition ${selected === route.id ? "bg-white/10 text-white" : "text-[#536078] hover:text-white"}`}><span className="h-2 w-2 rounded-full" style={{background: route.color}}/>{route.name}</button>)}</div>
          </div>
        </section>

        <section className="bg-[#0d1119] p-5 sm:p-6 xl:h-screen xl:overflow-y-auto">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#70a1ff]">Route comparison</p><h2 className="mt-2 text-xl font-semibold">3 routes found</h2></div><Gauge className="text-[#536078]" size={20}/></div>
          <div className="mt-6 space-y-3">{calculated.map((route) => {
            const isSelected = selected === route.id;
            const isRecommended = recommended.id === route.id;
            return <button key={route.id} onClick={() => setSelected(route.id)} className={`w-full rounded-2xl border p-4 text-left transition ${isSelected ? "border-[#3772ff] bg-[#3772ff]/[.08] shadow-[0_0_24px_rgba(55,114,255,.1)]" : "border-[#222b3b] bg-[#111722] hover:border-[#35425a]"}`}>
              <div className="flex items-start justify-between"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl" style={{background:`${route.color}18`, color: route.color}}><Route size={17}/></span><div><div className="flex items-center gap-2"><h3 className="text-sm font-bold">{route.name}</h3>{isRecommended && <span className="rounded-full bg-[#33d69f]/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#33d69f]">Recommended</span>}</div><p className="mt-1 text-[10px] text-[#536078]">{route.via} · {route.traffic}</p></div></div>{isSelected && <Check size={16} className="text-[#70a1ff]"/>}</div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-y border-[#222b3b] py-3"><Metric icon={Clock3} value={`${route.minutes} min`} label="Duration"/><Metric icon={Fuel} value={money(route.fuel)} label="Fuel"/><Metric icon={WalletCards} value={money(route.salik)} label="Salik"/></div>
              <div className="mt-3 flex items-end justify-between"><div><p className="text-[9px] uppercase tracking-wider text-[#536078]">{route.distance} km · Total</p><p className="mt-1 text-lg font-bold">{money(route.total)}</p></div><div className="text-right"><p className="text-[9px] uppercase tracking-wider text-[#536078]">Estimated saving</p><p className="mt-1 text-xs font-bold text-[#33d69f]">{money(highestTotal - route.total)}</p></div></div>
            </button>;
          })}</div>
          <div className="mt-4 rounded-2xl border border-[#3772ff]/30 bg-[linear-gradient(145deg,rgba(55,114,255,.13),rgba(168,121,255,.06))] p-4">
            <div className="flex items-center gap-2 text-[#70a1ff]"><Sparkles size={16}/><p className="text-[10px] font-bold uppercase tracking-[.15em]">Smart recommendation</p></div>
            <p className="mt-3 text-sm font-semibold">Take the {recommended.name.toLowerCase()} route</p>
            <p className="mt-2 text-xs leading-5 text-[#94a3b8]">At AED {timeValue}/hour, {recommended.via} gives you the best combined trip cost and travel-time value.</p>
            <div className="mt-4 flex items-center justify-between border-t border-[#3772ff]/20 pt-3"><span className="text-[10px] text-[#536078]">Expense + time value</span><span className="font-mono text-xs font-bold text-[#70a1ff]">{money(recommended.score)}</span></div>
            {comparisonCount > 0 && <p className="mt-3 flex items-center gap-1.5 text-[9px] text-[#33d69f]"><Check size={11}/>Recommendation refreshed just now</p>}
          </div>
          <p className="mt-5 text-center text-[9px] leading-4 text-[#536078]">Illustrative route geometry and demo estimates.<br/>No live navigation data is used.</p>
        </section>
      </div>
    </main>
  );
}

function RouteWiseIntro({ onClose }: { onClose: () => void }) {
  return <section className="routewise-intro fixed inset-0 z-[90] overflow-y-auto bg-[#060910] px-5 py-8 sm:px-8" aria-label="RouteWise product introduction">
    <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#3772ff]/20 blur-[120px]"/><div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#a879ff]/15 blur-[140px]"/><div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#263247_1px,transparent_1px),linear-gradient(90deg,#263247_1px,transparent_1px)] [background-size:64px_64px]"/></div>
    <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#3772ff]/30 bg-[#3772ff]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#70a1ff]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#33d69f]"/>Desktop dashboard + mobile companion</div>
        <h1 className="mt-7 text-5xl font-semibold leading-[.94] tracking-[-.07em] text-[#f8fbff] [text-shadow:0_4px_34px_rgba(0,0,0,.9)] sm:text-7xl">The smarter way<br/>to move through <span className="text-[#79a8ff]">Dubai.</span></h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-[#94a3b8] sm:text-base">RouteWise looks beyond arrival time. Compare fuel, Salik, traffic, and the value of your time—then take the recommendation with you on mobile.</p>
        <div className="mt-8 flex flex-wrap gap-3"><button onClick={onClose} className="group flex items-center gap-2 rounded-xl bg-[#3772ff] px-5 py-3.5 text-sm font-bold text-white shadow-[0_16px_50px_rgba(55,114,255,.3)] transition hover:bg-[#4b80ff]">Explore live dashboard <ArrowRight size={16} className="transition group-hover:translate-x-1"/></button><div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3"><Smartphone size={17} className="text-[#33d69f]"/><div><p className="text-[10px] font-semibold">Designed for every screen</p><p className="text-[9px] text-[#536078]">Mobile app experience included</p></div></div></div>
        <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6"><IntroFact value="3" label="Routes compared"/><IntroFact value="4" label="Cost signals"/><IntroFact value="1" label="Smart choice"/></div>
      </div>

      <div className="relative mx-auto flex w-full max-w-lg items-center justify-center py-4 lg:justify-end">
        <div className="absolute left-0 top-12 hidden w-52 rounded-2xl border border-white/10 bg-[#111722]/85 p-4 shadow-2xl backdrop-blur-xl sm:block lg:-left-8"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#33d69f]/10 text-[#33d69f]"><ShieldCheck size={15}/></span><div><p className="text-[10px] font-bold">Best value found</p><p className="mt-0.5 text-[9px] text-[#536078]">Save AED 7.56 today</p></div></div></div>
        <div className="routewise-phone relative w-[270px] rounded-[2.8rem] border-[7px] border-[#222b3b] bg-[#080b12] p-2 shadow-[0_35px_100px_rgba(0,0,0,.65),0_0_60px_rgba(55,114,255,.16)]">
          <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[#05070b]"/>
          <div className="overflow-hidden rounded-[2.15rem] border border-white/5 bg-[#0d1119]">
            <div className="flex items-center justify-between px-5 pb-3 pt-8 text-[8px] font-semibold"><span>8:30</span><span className="flex items-center gap-1 text-[#536078]"><span className="h-1.5 w-1.5 rounded-full bg-[#33d69f]"/>LIVE</span></div>
            <div className="px-4"><div className="flex items-center justify-between"><div><p className="text-[8px] uppercase tracking-[.16em] text-[#70a1ff]">Good morning</p><h2 className="mt-1 text-base font-bold">Where are you going?</h2></div><span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#3772ff] to-[#a879ff] text-[8px] font-bold">SK</span></div></div>
            <div className="relative mt-4 h-56 overflow-hidden border-y border-[#222b3b] bg-[#090e15]"><div className="absolute inset-0 opacity-35 [background-image:linear-gradient(#263247_1px,transparent_1px),linear-gradient(90deg,#263247_1px,transparent_1px)] [background-size:30px_30px]"/><svg viewBox="0 0 260 224" className="absolute inset-0 h-full w-full"><path d="M22 190 C60 172 62 118 112 128 S170 80 236 34" fill="none" stroke="#1a315f" strokeWidth="13" strokeLinecap="round"/><path d="M22 190 C60 172 62 118 112 128 S170 80 236 34" fill="none" stroke="#3772ff" strokeWidth="5" strokeLinecap="round"/><circle cx="22" cy="190" r="7" fill="#080b12" stroke="#33d69f" strokeWidth="3"/><circle cx="236" cy="34" r="7" fill="#080b12" stroke="#3772ff" strokeWidth="3"/></svg><div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-[#0d1119]/90 p-3 backdrop-blur"><p className="text-[7px] uppercase tracking-wider text-[#536078]">Downtown → DXB</p><div className="mt-1.5 flex items-end justify-between"><p className="text-sm font-bold">26 min</p><p className="text-xs font-bold text-[#70a1ff]">AED 7.73</p></div></div></div>
            <div className="p-4"><div className="flex items-center justify-between"><div><p className="text-[8px] font-bold uppercase tracking-wider text-[#33d69f]">Smart pick</p><p className="mt-1 text-xs font-bold">Balanced via Airport Rd</p></div><span className="grid h-8 w-8 place-items-center rounded-full bg-[#3772ff]"><Navigation size={13} fill="currentColor"/></span></div><div className="mt-4 grid grid-cols-3 gap-2">{[["26m","Time"],["AED 4","Salik"],["17.1","km"]].map(([value,label]) => <div key={label} className="rounded-lg bg-white/[.04] p-2 text-center"><p className="text-[10px] font-bold">{value}</p><p className="mt-1 text-[7px] text-[#536078]">{label}</p></div>)}</div><div className="mt-3 rounded-xl border border-[#a879ff]/20 bg-[#a879ff]/[.07] p-2.5"><p className="text-[7px] font-bold uppercase tracking-[.14em] text-[#b895ff]">Live trip insight</p><p className="mt-1 text-[8px] leading-3 text-[#aeb9ca]">Traffic is easing. Stay on this route to arrive by 8:56 AM.</p></div></div>
            <div className="flex items-center justify-around border-t border-[#222b3b] px-3 py-3 text-[#536078]"><Navigation size={14} className="text-[#70a1ff]"/><Route size={14}/><Bell size={14}/><Settings size={14}/></div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function IntroFact({ value, label }: { value: string; label: string }) {
  return <div><p className="text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-[9px] uppercase tracking-[.14em] text-[#536078]">{label}</p></div>;
}

function LocationInput({ label, value, onChange, accent }: { label: string; value: string; onChange: (value: string) => void; accent: string }) {
  return <label className="flex items-center gap-3 rounded-xl border border-[#222b3b] bg-[#0a0f17] p-3 focus-within:border-[#3772ff]"><MapPin size={16} style={{color: accent}}/><span className="min-w-0 flex-1"><span className="block text-[9px] uppercase tracking-[.14em] text-[#536078]">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full bg-transparent text-xs font-semibold text-[#eef3fb] outline-none"/></span></label>;
}

function NumberField({ label, value, suffix, step = "0.1", onChange }: { label: string; value: number; suffix: string; step?: string; onChange: (value: number) => void }) {
  return <label className="rounded-xl border border-[#222b3b] bg-[#0a0f17] px-3 py-2.5"><span className="block text-[9px] uppercase tracking-[.14em] text-[#536078]">{label}</span><span className="mt-1 flex items-baseline gap-1"><input type="number" min="0" step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-[#eef3fb] outline-none"/><span className="text-[9px] text-[#536078]">{suffix}</span></span></label>;
}

function Metric({ icon: Icon, value, label }: { icon: typeof Clock3; value: string; label: string }) {
  return <div><span className="flex items-center gap-1 text-[10px] font-semibold text-[#eef3fb]"><Icon size={11} className="text-[#536078]"/>{value}</span><p className="mt-1 text-[8px] uppercase tracking-wider text-[#536078]">{label}</p></div>;
}
