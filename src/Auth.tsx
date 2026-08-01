import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AuthV2() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 mb-10">

            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

            <span className="text-xs tracking-[0.3em] text-emerald-300 uppercase">
              Secure Connection
            </span>

          </div>

          <div className="mb-8">

            <svg
              width="70"
              height="70"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M20 80 L50 20 L80 80"
                stroke="#22d3ee"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M35 55 L65 55"
                stroke="#67e8f9"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>

          </div>

          <div className="space-y-2">

<h1 className="text-7xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">
  NEXUS
</h1>

<h2 className="text-4xl font-light tracking-[0.35em] text-cyan-400 uppercase">
  P&L TERMINAL
</h2>

</div> 

          <p className="mt-8 max-w-lg text-slate-400 leading-8 text-lg">
          Professional Trading Journal built for disciplined traders.

Track every trade, measure your performance and master your edge with institutional-quality analytics. 
          </p>

          <div className="grid grid-cols-2 gap-6 mt-14">

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl backdrop-blur-xl p-6">

              <p className="text-slate-500 text-xs uppercase tracking-widest">
                Net P&L
              </p>

              <h3 className="text-4xl mt-3 font-bold text-emerald-400">
                +24,580
              </h3>

            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl backdrop-blur-xl p-6">

              <p className="text-slate-500 text-xs uppercase tracking-widest">
                Win Rate
              </p>

              <h3 className="text-4xl mt-3 font-bold text-cyan-400">
                78.2%
              </h3>

            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl backdrop-blur-xl p-6">

              <p className="text-slate-500 text-xs uppercase tracking-widest">
                Trades
              </p>

              <h3 className="text-4xl mt-3 font-bold">
                426
              </h3>

            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl backdrop-blur-xl p-6">

              <p className="text-slate-500 text-xs uppercase tracking-widest">
                Status
              </p>

              <h3 className="text-4xl mt-3 font-bold text-emerald-400">
                ONLINE
              </h3>

            </div>

          </div>

        </div>

        {/* LADO DERECHO */}

        <div className="flex items-center justify-center p-8">

          <div className="relative w-full max-w-md">

            <div className="absolute -inset-2 rounded-[40px] bg-cyan-500/10 blur-3xl"></div>

            <div className="relative rounded-[40px] border border-cyan-400/10 bg-white/[0.05] backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,.6)] p-10">

              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Login Terminal
              </p>

              <h2 className="text-4xl font-black mt-4">
                Welcome Back
              </h2>

              <p className="text-slate-400 mt-3">
                Access your trading workspace.
              </p>

              <form
                onSubmit={handleAuth}
                className="space-y-6 mt-10"
              >
                              <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                {message && (
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-bold tracking-widest transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(34,211,238,.45)] disabled:opacity-50"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {loading
                      ? "CONNECTING..."
                      : isSignUp
                      ? "CREATE ACCOUNT"
                      : "ACCESS TERMINAL →"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setMessage("");
                  }}
                  className="w-full text-center text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  {isSignUp
                    ?"Already have an account? Sign In"
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