import { useState } from "react";
import { supabase } from "./supabaseClient";
import logo from "./assets/nexus-logo.png";

export default function AuthV2() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Cuenta creada correctamente.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      }
    }

    setLoading(false);
  }

  return (
<div className="relative min-h-screen overflow-hidden bg-[#05070b] text-white">
      {/* Fondo */}
    {/* Fondo Premium */}

<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,.08),transparent_45%)]" />

<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,.08),transparent_35%)]" />

<div className="absolute inset-0 opacity-[0.03]
bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),
linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
bg-[size:60px_60px]" />

<div className="absolute -left-48 top-10 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[180px]" />

<div className="absolute right-[-150px] bottom-[-150px] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[220px]" />  

      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[160px]" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* LADO IZQUIERDO */}

        <div className="hidden lg:flex flex-col justify-center px-20">

         
          

         {/* LADO IZQUIERDO */}

        <div className="hidden lg:flex flex-col justify-center px-20">

          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 mb-10">

            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

            <span className="text-xs tracking-[0.3em] text-emerald-300 uppercase">
              Secure Connection
            </span>

          </div>
          

          <div className="mb 9 flex items-center justify-center lg:justify-start">

  <div className="relative">

    <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-[70px]"></div>

    <img
      src={logo}
      alt="Nexus Logo"
     className="relative w-56 xl:w-60 select-none drop-shadow-[0_0_35px_rgba(34,211,238,.45)]"
      draggable={false}
    />
    

  </div>

</div>
<div className="space-y-2">

          </div>

          

<h1 className="text-7xl xl:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">
  NEXUS
</h1>
<div className="mt-6 h-px w-40 bg-gradient-to-r from-cyan-500 via-cyan-300 to-transparent"></div>

<h2 className="mt-3 text-cyan-400 uppercase tracking-[0.45em] text-lg font-semibold">
  P&L TERMINAL
</h2>
<div className="mt-10 flex items-center gap-4">

  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

  <span className="text-sm text-slate-400 uppercase tracking-[0.3em]">
    LIVE MARKET
  </span>

  <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/60 to-transparent"></div>

</div>
<div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">

<svg
viewBox="0 0 600 180"
className="w-full"
fill="none"
>

<path
d="M0 150
L50 140
L90 145
L130 100
L170 120
L220 70
L280 90
L340 50
L410 65
L470 30
L540 55
L600 20"
stroke="#22d3ee"
strokeWidth="4"
strokeLinecap="round"
strokeLinejoin="round"
/>

</svg>

</div>
<div className="mt-8 rounded-3xl border border-cyan-400/10 bg-slate-900/40 backdrop-blur-xl p-6">

  <div className="flex items-center justify-between">

    <div>

      <p className="text-slate-500 text-xs uppercase tracking-widest">
        Today's Performance
      </p>

      <h2 className="mt-3 text-4xl font-black text-emerald-400">
        +$1,842
      </h2>

    </div>

    <div className="rounded-full bg-emerald-500/15 px-4 py-2">

      <span className="text-emerald-400 font-semibold">
        ▲ +4.82%
      </span>

    </div>

  </div>

</div>
<div className="mt-6 flex justify-between text-center">

<div>

<p className="text-slate-500 text-xs uppercase">
ROI
</p>

<h3 className="text-2xl font-bold text-emerald-400">
+34%
</h3>

</div>

<div>

<p className="text-slate-500 text-xs uppercase">
Sharpe
</p>

<h3 className="text-2xl font-bold text-cyan-400">
2.84
</h3>

</div>

<div>

<p className="text-slate-500 text-xs uppercase">
Drawdown
</p>

<h3 className="text-2xl font-bold text-rose-400">
-4.2%
</h3>

</div>

</div>
<div className="mt-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/15bg-cyan-400/5 px-5 py-2">

  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

  <span className="text-xs uppercase tracking-[0.25em] text-cyan-300">

    Institutional Grade Analytics

  </span>

</div>
</div> 

          <p className="mt-8 max-w-lg text-slate-400 leading-8 text-lg">
          Professional Trading Journal built for disciplined traders.

Track every trade, measure your performance and master your edge with institutional-quality analytics. 
<div className="mt-10 flex items-center gap-4">

<div className="flex -space-x-2">

  <div className="h-10 w-10 rounded-full border-2 border-slate-900 bg-cyan-500"></div>

  <div className="h-10 w-10 rounded-full border-2 border-slate-900 bg-emerald-500"></div>

  <div className="h-10 w-10 rounded-full border-2 border-slate-900 bg-blue-500"></div>

</div>

<div>

  <p className="font-semibold">
    +2,500 Active Traders
  </p>

  <p className="text-sm text-slate-400">
    Trading every day with NEXUS
  </p>

</div>

</div>
          </p>

          <div className="grid grid-cols-2 gap-6 mt-14">

            <div className="group rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl backdrop-blur-xl p-6 hover:-translate-y-2 hover:border-cyan-400/30 transition-all duration-500">

              <p className="text-slate-500 text-xs uppercase tracking-widest">
                Net P&L
              </p>

              <h3 className="text-4xl mt-3 font-bold text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,.6)]">
                +24,580
              </h3>
              <div className="mt-10 flex items-center gap-3">

  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

  <span className="text-sm text-slate-400">
    Encrypted with Supabase Authentication
  </span>

</div>

            </div>

            <div className="group rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl backdrop-blur-xl p-6 hover:-translate-y-2 hover:border-cyan-400/30 transition-all duration-500">

              <p className="text-slate-500 text-xs uppercase tracking-widest">
                Win Rate
              </p>

              <h3 className="text-4xl mt-3 font-bold text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,.6)]">
                78.2%
              </h3>
              <div className="mt-10 flex items-center gap-3">

  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

  <span className="text-sm text-slate-400">
    Encrypted with Supabase Authentication
  </span>

</div>

            </div>

            <div className="group rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl backdrop-blur-xl p-6 hover:-translate-y-2 hover:border-cyan-400/30 transition-all duration-500">

              <p className="text-slate-500 text-xs uppercase tracking-widest">
                Trades
              </p>

              <h3 className="text-4xl mt-3 font-bold">
                426
              </h3>
              <div className="mt-10 flex items-center gap-3">

  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

  <span className="text-sm text-slate-400">
    Encrypted with Supabase Authentication
  </span>

</div>

            </div>

            <div className="group rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl backdrop-blur-xl p-6 hover:-translate-y-2 hover:border-cyan-400/30 transition-all duration-500">

              <p className="text-slate-500 text-xs uppercase tracking-widest">
                Status
              </p>

              <h3 className="text-4xl mt-3 font-bold text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,.6)]">
                ONLINE
              </h3>
              <div className="mt-10 flex items-center gap-3">

  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

  <span className="text-sm text-slate-400">
    Encrypted with Supabase Authentication
  </span>

</div>

            </div>

          </div>

        </div>

        {/* LADO DERECHO */}

        <div className="flex items center justify-center p-8">

        <div
  className="relative w-full max-w-xl transition-all duration-700 hover:scale-[1.015]"
>
<div className="absolute -inset-8 rounded-[50px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-transparent blur-[80px] animate-pulse"></div>

            <div className="absolute -inset-0 rounded-[40px] bg-cyan-500/10 blur-3xl"></div>

            <div className="relative overflow-hidden rounded-[40px] border border-cyan-400/20 bg-slate-900/50 backdrop-blur-3xl shadow-[0_0_80px_rgba(6,182,212,0.08)] shadow-[0_30px_80px_rgba(0,0,0,.6)] p-10 hover:border-cyan-400/30">

            <div className="-mx-14 -mt-16 mb-10 h-[3px] rounded-t-[40px] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600"></div>
            <div className="flex items-center gap-3">

<div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

<p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
  Secure Terminal
</p>

</div>

<h2 className="
text-3xl
xl:text-5xl
leading-tight
font-black
tracking-tight
bg-gradient-to-r
from-white
via-cyan-200
to-cyan-500
bg-clip-text
text-transparent
break-words
">
  {isSignUp ? "Create Account" : "Welcome Back"}
</h2>

              <p className="text-slate-400 mt-3">
              {isSignUp
  ? "Create your secure trading account and start tracking your performance."
  : "Access your professional trading journal and continue improving your edge."}
              </p>

              <div className="mt-8 mb-8 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              <form
                onSubmit={handleAuth}
                className="space-y-7 mt-12"
              >
                              <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Email
                  </label>

                  <div className="relative">

  <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Correo electrónico"
    className="peer w-full rounded-2xl border border-slate-700 bg-[#0b1220]/70 px-5 py-4 text-white placeholder:text-slate-500 transition-all duration-300 outline-none focus:border-cyan-400 focus:bg-[#0f172a] focus:shadow-[0_0_25px_rgba(34,211,238,.15)]"
  />

</div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Password
                  </label>

                  <div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Contraseña"
    className="peer w-full rounded-2xl border border-slate-700 bg-[#0b1220]/70 px-5 py-4 text-white placeholder:text-slate-500 transition-all duration-300 outline-none focus:border-cyan-400 focus:bg-[#0f172a] focus:shadow-[0_0_25px_rgba(34,211,238,.15)]"
  />
  <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,.6)] transition-colors"
>
  {showPassword ? "🙈" : "👁"}
</button>

</div>
</div>
                    

                {message && (
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-300 backdrop-blur-xl">
                    {message}
                  </div>
                )}

<button
  type="submit"
  disabled={loading}
  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 py-4 font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,.45)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {/* Brillo que cruza el botón */}
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

  <span className="relative z-10 flex items-center justify-center gap-3">
  {loading ? (
  <>
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
    CONNECTING...
  </>
) : isSignUp ? (
  "CREATE ACCOUNT"
) : (
  <>
    ACCESS TERMINAL
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </>
)}
  </span>
</button>

                <button
  type="button"
  onClick={() => {
    setIsSignUp(!isSignUp);
    setMessage("");
  }}
  className="mt-6 w-full rounded-2xl border border-cyan-500/20 bg-cyan-500/5 py-4 text-center font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white"
>
  {isSignUp
    ? "Already have an account? Sign In"
    : "Don't have an account? Create one"}
</button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}