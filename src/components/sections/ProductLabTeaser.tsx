import Link from "next/link";
import { Activity, ArrowRight, FlaskConical, Navigation, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";

export function ProductLabTeaser() {
  return (
    <section aria-labelledby="product-lab-title" className="relative overflow-hidden border-b border-[#22283a] bg-[#070a11] py-20 text-[#f5f7fb] sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(#2a3347_1px,transparent_1px),linear-gradient(90deg,#2a3347_1px,transparent_1px)] [background-size:54px_54px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"/>
      <div className="pointer-events-none absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-[#3772ff]/15 blur-[130px]"/>
      <div className="pointer-events-none absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[#a879ff]/10 blur-[150px]"/>

      <Container className="relative">
        <FadeIn className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3772ff]/25 bg-[#3772ff]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#8cb2ff]"><FlaskConical size={13}/>Product lab · Live experiments</div>
            <h2 id="product-lab-title" className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-.06em] sm:text-6xl">Some ideas deserve more<br className="hidden sm:block"/> than a case study.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#aab5c7] sm:text-lg">A small collection of product questions turned into working interfaces. The details are intentionally hidden—the interesting part starts when you click.</p>
          </div>
          <Link href="/prototypes" className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#405170] bg-[#111722] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(0,0,0,.35)] transition hover:-translate-y-0.5 hover:border-[#70a1ff] hover:bg-[#162033]">Enter the Product Lab <span className="grid h-7 w-7 place-items-center rounded-full bg-[#3772ff] transition group-hover:translate-x-1"><ArrowRight size={14}/></span></Link>
        </FadeIn>

        <FadeIn className="mt-14 sm:mt-18">
          <Link href="/prototypes" aria-label="Explore interactive product prototypes" className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0f18] p-3 shadow-[0_40px_100px_rgba(0,0,0,.45)] transition duration-500 hover:border-[#70a1ff]/40 sm:p-5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#70a1ff]/70 to-transparent"/>
            <div className="absolute right-7 top-7 z-20 hidden items-center gap-2 rounded-full border border-[#818cf8]/30 bg-[#11131b]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[.13em] text-[#a5b4fc] shadow-xl backdrop-blur md:flex"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#818cf8]"/>03 · Agent orchestration online</div>
            <div className="grid min-h-[480px] gap-3 lg:grid-cols-[1.2fr_.8fr]">
              <div className="relative min-h-[390px] overflow-hidden rounded-[1.35rem] border border-[#263147] bg-[#080d15]">
                <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(#25334a_1px,transparent_1px),linear-gradient(90deg,#25334a_1px,transparent_1px)] [background-size:44px_44px]"/>
                <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-[#30405d] bg-[#0d1420]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[.14em] text-[#9fb1ca]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#33d69f]"/>Signal acquired</div>
                <svg viewBox="0 0 680 420" className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.025]" aria-hidden="true"><path d="M-20 390 C80 340 105 248 214 278 S350 185 450 152 S574 118 710 24" fill="none" stroke="#182b50" strokeWidth="18" strokeLinecap="round"/><path d="M-20 390 C80 340 105 248 214 278 S350 185 450 152 S574 118 710 24" fill="none" stroke="#3772ff" strokeWidth="7" strokeLinecap="round"/><path d="M-20 390 C62 286 170 355 246 238 S390 232 496 136 S610 80 710 24" fill="none" stroke="#a879ff" strokeWidth="4" strokeLinecap="round" opacity=".72"/><circle cx="214" cy="278" r="7" fill="#070a11" stroke="#33d69f" strokeWidth="4"/><circle cx="450" cy="152" r="7" fill="#070a11" stroke="#70a1ff" strokeWidth="4"/></svg>
                <div className="absolute bottom-5 left-5 right-5 z-10 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <div className="rounded-2xl border border-white/10 bg-[#0c121d]/92 p-4 backdrop-blur-xl"><p className="text-[9px] uppercase tracking-[.16em] text-[#8292aa]">A better route is not always the fastest</p><div className="mt-3 flex items-end gap-7"><div><p className="text-2xl font-bold">26 min</p><p className="mt-1 text-[10px] text-[#9aa9bf]">One decision · four signals</p></div><p className="text-xl font-bold text-[#70a1ff]">AED 7.72</p></div></div>
                  <div className="flex items-center gap-3 rounded-2xl border border-[#3772ff]/25 bg-[#0c121d]/92 px-4 py-3 backdrop-blur-xl"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#3772ff]/15 text-[#70a1ff]"><Navigation size={17}/></span><div><p className="text-[9px] uppercase tracking-[.14em] text-[#8292aa]">What if?</p><p className="mt-1 text-xs font-semibold">Cost could navigate.</p></div></div>
                </div>
              </div>

              <div className="relative min-h-[390px] overflow-hidden rounded-[1.35rem] border border-[#292d38] bg-[#111318] p-5 sm:p-7">
                <div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-red-500/10 text-red-400"><Activity size={18}/></span><div><p className="text-[9px] uppercase tracking-[.15em] text-[#8d96a8]">Experiment 02</p><p className="mt-1 text-xs font-semibold">A safer path to production</p></div></div><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"/></div>
                <div className="mt-8 grid grid-cols-3 gap-2">{[["1,284","runs"],["96.8%","safe"],["02","active"]].map(([value,label]) => <div key={label} className="rounded-xl border border-white/[.07] bg-white/[.035] p-3"><p className="text-base font-bold sm:text-lg">{value}</p><p className="mt-1 text-[8px] uppercase tracking-wider text-[#8893a7]">{label}</p></div>)}</div>
                <div className="mt-8 space-y-4">{[["Build exact commit",72,"#ef5962"],["Verify evidence",96,"#a3adbd"],["Await approval",48,"#f5a94f"]].map(([label,width,color]) => <div key={String(label)}><div className="mb-2 flex justify-between text-[9px] text-[#aab4c4]"><span>{label}</span><span>•••</span></div><div className="h-2 overflow-hidden rounded-full bg-white/[.06]"><div className="h-full rounded-full transition-all duration-700 group-hover:brightness-125" style={{width:`${width}%`,background:String(color)}}/></div></div>)}</div>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-red-400/15 bg-red-400/[.06] p-4 sm:bottom-7 sm:left-7 sm:right-7"><div className="flex items-start gap-3"><Sparkles size={15} className="mt-0.5 shrink-0 text-red-300"/><div><p className="text-[9px] font-bold uppercase tracking-[.14em] text-red-300">One unresolved question</p><p className="mt-2 text-xs leading-5 text-[#bcc5d3]">Can deployment confidence be designed—not just documented?</p></div></div></div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070a11] to-transparent"/>
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-[#eef3fb] px-5 py-3 text-xs font-bold text-[#080b12] shadow-2xl transition group-hover:-translate-y-1">Open the experiments <ArrowRight size={14}/></div>
          </Link>
        </FadeIn>

        <FadeIn className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[.16em] text-[#748198]"><p>Frontend-only · Mock data · Fully interactive</p><p className="flex items-center gap-2 text-[#9aa9bf]"><span className="h-1 w-1 rounded-full bg-[#33d69f]"/>Built to be explored, not just viewed</p></FadeIn>
      </Container>
    </section>
  );
}
