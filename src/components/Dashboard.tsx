export default function Dashboard() {
    return (
      <div className="min-h-screen bg-[#030712] text-white">
  
        {/* Fondo */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-950/20 via-slate-950 to-black"></div>
  
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/40 backdrop-blur-xl">
  
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
  
            <div>
  
              <h1 className="text-3xl font-black tracking-tight">
                NEXUS
              </h1>
  
              <p className="text-sm text-cyan-400 tracking-[0.25em] uppercase">
                P&L Terminal
              </p>
  
            </div>
  
            <div className="flex items-center gap-4">
  
              <div className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2">
  
                <span className="text-slate-300">
                  👤 Trader
                </span>
  
              </div>
  
            </div>
  
          </div>
  
        </header>
  
        {/* Contenido */}
  
        <main className="mx-auto max-w-7xl p-8">
  
          {/* KPIs */}
  
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
  
              <p className="text-slate-400 text-sm">
                Net Profit
              </p>
  
              <h2 className="mt-3 text-4xl font-black text-emerald-400">
                +$24,580
              </h2>
  
            </div>
  
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
  
              <p className="text-slate-400 text-sm">
                Win Rate
              </p>
  
              <h2 className="mt-3 text-4xl font-black text-cyan-400">
                78.2%
              </h2>
  
            </div>
  
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
  
              <p className="text-slate-400 text-sm">
                Risk / Reward
              </p>
  
              <h2 className="mt-3 text-4xl font-black">
                2.64
              </h2>
  
            </div>
  
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
  
              <p className="text-slate-400 text-sm">
                Trades
              </p>
  
              <h2 className="mt-3 text-4xl font-black">
                426
              </h2>
  
            </div>
  
          </div>
  
          {/* Equity */}
  
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
  
            <h2 className="mb-6 text-2xl font-bold">
              Equity Curve
            </h2>
  
            <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-cyan-500/20">
  
              <span className="text-slate-500">
                📈 Aquí irá el gráfico
              </span>
  
            </div>
  
          </div>
  
        </main>
  
      </div>
    );
  }