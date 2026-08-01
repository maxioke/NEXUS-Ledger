import React, { useState, useEffect } from 'react';

interface LedgerEntry {
  id: string;
  date: string;
  amount: number;
  status: 'WIN' | 'LOSS' | 'BREAKEVEN';
  notes: string;
  screenshot?: string;
  timestamp: number;
}

type Language = 'es' | 'en';
type Theme = 'dark' | 'light' | 'minimal' | 'luxury' | 'spiderman';

const translations = {
  es: {
    proTerminal: 'PRO TERMINAL',
    dashboard: 'DASHBOARD',
    analytics: 'ANALYTICS',
    calendar: 'CALENDARIO',
    settings: 'CONFIGURACIÓN',
    timeZone: 'ZONA HORARIA',
    netPnL: 'NET P&L ACUMULADO',
    winRate: 'WIN RATE (EFECTIVIDAD)',
    executions: 'EJECUCIONES',
    ops: 'ops',
    targetGoal: 'TARGET // OBJETIVO FINANCIERO',
    setTarget: 'CONFIGURAR TARGET',
    set: 'FIJAR',
    accumulated: 'ACUMULADO',
    remaining: 'RESTANTE',
    metGoal: '⚡ METAS SUPERADAS',
    addTrade: '[+] INGRESO DE TRADE',
    opDate: 'Fecha Operativa',
    pnlResult: 'Resultado P&L ($)',
    executionStatus: 'Estado de Ejecución',
    notesLabel: 'Notas / Bitácora',
    notesPlaceholder: 'Estrategia, setup, errores...',
    screenshotLabel: 'Screenshot Técnico',
    registerTrade: 'REGISTRAR OPERACIÓN',
    equityCurve: 'CURVA DE EQUIDAD',
    noChartData: 'SIN DATOS REGISTRADOS PARA GENERAR MATRIZ.',
    historyTitle: 'HISTORIAL DE OPERACIONES',
    thDate: 'FECHA',
    thStatus: 'ESTADO',
    thResult: 'RESULTADO',
    thNotes: 'NOTAS',
    thScreenshot: 'CAPTURA',
    thActions: 'ACCIONES',
    noRecords: 'SISTEMA LIMPIO // SIN REGISTROS',
    screenshotBtn: '🖼️ CAPTURA',
    deleteBtn: 'ELIMINAR',
    metricsTitle: 'MÉTRICAS Y AVANZADOS (ANALYTICS)',
    metricsSubtitle: 'DESGLOSE CUANTITATIVO DEL RENDIMIENTO',
    profitFactor: 'PROFIT FACTOR',
    profitFactorDesc: 'Ganancias Brutas / Pérdidas Brutas',
    avgWin: 'PROMEDIO WIN',
    avgWinDesc: 'Ganancia media por trade',
    avgLoss: 'PROMEDIO LOSS',
    avgLossDesc: 'Pérdida media por trade',
    ratioWinLoss: 'RATIO WIN/LOSS',
    ratioWinLossDesc: 'Distribución de resultados',
    bestWorstTitle: 'MEJOR Y PEOR TRADE',
    bestTrade: 'MEJOR OPERACIÓN:',
    worstTrade: 'PEOR OPERACIÓN:',
    grossBalanceTitle: 'BALANCE BRUTO ACUMULADO',
    grossProfit: 'GANANCIAS BRUTAS:',
    grossLoss: 'PÉRDIDAS BRUTAS:',
    marketDays: 'LUNES A VIERNES // MARKET DAYS',
    prevMonth: '◀ ANTERIOR',
    nextMonth: 'SIGUIENTE ▶',
    registerPrompt: '+ REGISTRAR',
    settingsTitle: 'CONFIGURACIÓN DEL SISTEMA',
    settingsSubtitle: 'PERSONALIZACIÓN VISUAL, IDIOMA Y PREFERENCIAS',
    appearanceTitle: 'APARIENCIA VISUAL',
    appearanceDesc: 'Selecciona el tema de color que mejor se adapte a tu entorno de trading.',
    darkTheme: 'CYBER DARK (TERMINAL)',
    darkDesc: 'Estética oscura neón inspirada en terminales cuantitativas.',
    lightTheme: 'APPLE CLEAN LIGHT',
    lightDesc: 'Diseño minimalista blanco, pulido y ultramoderno estilo macOS.',
    minimalTheme: 'MINIMAL OVALADO',
    minimalDesc: 'Diseño orgánico con formas suavemente ovaladas, tonos neutros y sombras sutiles.',
    luxuryTheme: 'LUXURY GOLD',
    luxuryDesc: 'Estética de alta gama con detalles dorados, destellos brillantes y distinción exclusiva.',
    spidermanTheme: 'SPIDER-VERSE (MULTIVERSE)',
    spidermanDesc: 'Estética heroica inspirada en el multiverso arácnido con rojos intensos, azules eléctricos y acentos cibernéticos.',
    active: '✓ ACTIVO',
    languageTitle: 'IDIOMA DE INTERFAZ / LANGUAGE',
    languageDesc: 'Selecciona el idioma preferido para la plataforma.',
    closeModal: '✕ CERRAR',
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']
  },
  en: {
    proTerminal: 'PRO TERMINAL',
    dashboard: 'DASHBOARD',
    analytics: 'ANALYTICS',
    calendar: 'CALENDAR',
    settings: 'SETTINGS',
    timeZone: 'TIMEZONE',
    netPnL: 'ACCUMULATED NET P&L',
    winRate: 'WIN RATE',
    executions: 'EXECUTIONS',
    ops: 'trades',
    targetGoal: 'TARGET // FINANCIAL GOAL',
    setTarget: 'SET TARGET',
    set: 'SAVE',
    accumulated: 'ACCUMULATED',
    remaining: 'REMAINING',
    metGoal: '⚡ GOALS ACHIEVED',
    addTrade: '[+] NEW TRADE ENTRY',
    opDate: 'Trade Date',
    pnlResult: 'P&L Result ($)',
    executionStatus: 'Execution Status',
    notesLabel: 'Notes / Log',
    notesPlaceholder: 'Strategy, setup, mistakes...',
    screenshotLabel: 'Technical Screenshot',
    registerTrade: 'LOG TRADE',
    equityCurve: 'EQUITY CURVE',
    noChartData: 'NO DATA RECORDED TO GENERATE MATRIX.',
    historyTitle: 'TRADE HISTORY',
    thDate: 'DATE',
    thStatus: 'STATUS',
    thResult: 'RESULT',
    thNotes: 'NOTES',
    thScreenshot: 'SCREENSHOT',
    thActions: 'ACTIONS',
    noRecords: 'CLEAN SYSTEM // NO RECORDS',
    screenshotBtn: '🖼️ SCREENSHOT',
    deleteBtn: 'DELETE',
    metricsTitle: 'ADVANCED METRICS (ANALYTICS)',
    metricsSubtitle: 'QUANTITATIVE PERFORMANCE BREAKDOWN',
    profitFactor: 'PROFIT FACTOR',
    profitFactorDesc: 'Gross Profit / Gross Loss',
    avgWin: 'AVERAGE WIN',
    avgWinDesc: 'Average profit per trade',
    avgLoss: 'AVERAGE LOSS',
    avgLossDesc: 'Average loss per trade',
    ratioWinLoss: 'WIN/LOSS RATIO',
    ratioWinLossDesc: 'Result distribution',
    bestWorstTitle: 'BEST & WORST TRADE',
    bestTrade: 'BEST TRADE:',
    worstTrade: 'WORST TRADE:',
    grossBalanceTitle: 'ACCUMULATED GROSS BALANCE',
    grossProfit: 'GROSS PROFIT:',
    grossLoss: 'GROSS LOSS:',
    marketDays: 'MONDAY TO FRIDAY // MARKET DAYS',
    prevMonth: '◀ PREVIOUS',
    nextMonth: 'NEXT ▶',
    registerPrompt: '+ ADD ENTRY',
    settingsTitle: 'SYSTEM SETTINGS',
    settingsSubtitle: 'VISUAL CUSTOMIZATION, LANGUAGE & PREFERENCES',
    appearanceTitle: 'VISUAL APPEARANCE',
    appearanceDesc: 'Select the color theme that best fits your trading environment.',
    darkTheme: 'CYBER DARK (TERMINAL)',
    darkDesc: 'Dark neon aesthetics inspired by quantitative trading terminals.',
    lightTheme: 'APPLE CLEAN LIGHT',
    lightDesc: 'Minimalist clean white design, polished macOS style.',
    minimalTheme: 'MINIMAL OVAL',
    minimalDesc: 'Organic design featuring smooth oval shapes, warm neutral tones, and subtle shadows.',
    luxuryTheme: 'LUXURY GOLD',
    luxuryDesc: 'High-end aesthetic featuring gold accents, shining glows, and exclusive prestige.',
    spidermanTheme: 'SPIDER-VERSE (MULTIVERSE)',
    spidermanDesc: 'Heroic multi-dimensional aesthetic featuring scarlet red, electric blue accents, and comic energy.',
    active: '✓ ACTIVE',
    languageTitle: 'INTERFACE LANGUAGE / IDIOMA',
    languageDesc: 'Select your preferred language for the platform.',
    closeModal: '✕ CLOSE',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  }
};

const getLocalDateString = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'analytics' | 'calendar' | 'settings'>('dashboard');
  
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('pnl-theme');
      return (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'minimal' || savedTheme === 'luxury' || savedTheme === 'spiderman') ? savedTheme : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [lang, setLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('pnl-lang');
      return (savedLang === 'en' || savedLang === 'es') ? savedLang : 'es';
    } catch {
      return 'es';
    }
  });

  const t = translations[lang];

  const [entries, setEntries] = useState<LedgerEntry[]>(() => {
    try {
      const saved = localStorage.getItem('pnl-entries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [targetGoal, setTargetGoal] = useState<number>(() => {
    try {
      const savedGoal = localStorage.getItem('pnl-target-goal');
      return savedGoal ? parseFloat(savedGoal) : 2500;
    } catch {
      return 2500;
    }
  });

  const [inputGoal, setInputGoal] = useState<string>(targetGoal.toString());
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);

  // Formulario
  const [date, setDate] = useState(() => getLocalDateString());
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'WIN' | 'LOSS' | 'BREAKEVEN'>('WIN');
  const [notes, setNotes] = useState('');
  const [screenshot, setScreenshot] = useState<string | undefined>(undefined);

  // Modal Captura
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('pnl-entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('pnl-target-goal', targetGoal.toString());
  }, [targetGoal]);

  useEffect(() => {
    localStorage.setItem('pnl-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pnl-lang', lang);
  }, [lang]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const parsedAmount = parseFloat(amount);
    const finalAmount = status === 'LOSS' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);
    const safeId = Date.now().toString(36) + Math.random().toString(36).substring(2);

    const newEntry: LedgerEntry = {
      id: safeId,
      date,
      amount: status === 'BREAKEVEN' ? 0 : finalAmount,
      status,
      notes,
      screenshot,
      timestamp: Date.now()
    };

    setEntries([newEntry, ...entries]);
    setAmount('');
    setNotes('');
    setScreenshot(undefined);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(inputGoal);
    if (!isNaN(parsed) && parsed > 0) {
      setTargetGoal(parsed);
      setIsEditingGoal(false);
    }
  };

  // KPIs
  const totalPnL = entries.reduce((acc, e) => acc + e.amount, 0);
  const totalDays = entries.length;
  const winEntries = entries.filter(e => e.amount > 0);
  const lossEntries = entries.filter(e => e.amount < 0);
  const wins = winEntries.length;
  const losses = lossEntries.length;
  const winRate = totalDays > 0 ? ((wins / totalDays) * 100).toFixed(1) : '0';

  const grossProfit = winEntries.reduce((acc, e) => acc + e.amount, 0);
  const grossLoss = Math.abs(lossEntries.reduce((acc, e) => acc + e.amount, 0));
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? '∞' : '0.00';

  const avgWin = wins > 0 ? (grossProfit / wins).toFixed(2) : '0.00';
  const avgLoss = losses > 0 ? (grossLoss / losses).toFixed(2) : '0.00';

  const bestTrade = entries.length > 0 ? Math.max(...entries.map(e => e.amount)) : 0;
  const worstTrade = entries.length > 0 ? Math.min(...entries.map(e => e.amount)) : 0;

  const progressPercent = targetGoal > 0 ? Math.min(Math.max((totalPnL / targetGoal) * 100, 0), 100) : 0;
  const remainingGoal = targetGoal - totalPnL;

  const chronologicalEntries = [...entries].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return (a.timestamp || 0) - (b.timestamp || 0);
  });

  let cumulative = 0;
  const chartData = chronologicalEntries.map((e) => {
    cumulative += e.amount;
    return { date: e.date, val: cumulative };
  });

  const values = chartData.map(d => d.val);
  const minVal = Math.min(0, ...values);
  const maxVal = Math.max(0, ...values);
  const range = (maxVal - minVal) || 100;
  
  const W = 600;
  const H = 220;
  const pad = 45;

  const pointsArray = chartData.map((d, i) => {
    const x = chartData.length > 1 ? pad + (i / (chartData.length - 1)) * (W - pad * 2) : W / 2;
    const y = H - pad - ((d.val - minVal) / range) * (H - pad * 2);
    return { x, y, val: d.val, date: d.date };
  });

  const polylinePoints = pointsArray.map(p => `${p.x},${p.y}`).join(' ');
  const zeroY = H - pad - ((0 - minVal) / range) * (H - pad * 2);
  const areaPoints = pointsArray.length > 0 
    ? `${pointsArray[0].x},${zeroY} ${polylinePoints} ${pointsArray[pointsArray.length - 1].x},${zeroY}`
    : '';

  // Calendario Vertical Modificado (Columnas reducidas a 5 días hábiles)
  const getTradingCalendarGrid = (year: number, month: number) => {
    const items: Array<{ type: 'empty'; id: string } | { type: 'day'; dateString: string; dayNumber: number }> = [];
    const firstDayOfMonth = new Date(year, month, 1, 12, 0, 0);
    let firstDayOfWeek = firstDayOfMonth.getDay();

    if (firstDayOfWeek === 0) firstDayOfWeek = 1; 
    if (firstDayOfWeek === 6) firstDayOfWeek = 1; 

    const emptySlots = firstDayOfWeek - 1;
    for (let i = 0; i < emptySlots; i++) {
      items.push({ type: 'empty', id: `empty-start-${i}` });
    }

    const dateObj = new Date(year, month, 1, 12, 0, 0);
    while (dateObj.getMonth() === month) {
      const dayOfWeek = dateObj.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { 
        items.push({
          type: 'day',
          dateString: getLocalDateString(dateObj),
          dayNumber: dateObj.getDate()
        });
      }
      dateObj.setDate(dateObj.getDate() + 1);
    }

    return items;
  };

  const calendarItems = getTradingCalendarGrid(
    currentMonthDate.getFullYear(), 
    currentMonthDate.getMonth()
  );

  const prevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1, 12, 0, 0));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1, 12, 0, 0));
  };

  const selectDateFromCalendar = (selectedDate: string) => {
    setDate(selectedDate);
    setCurrentView('dashboard');
  };

  const isDark = theme === 'dark';
  const isMinimal = theme === 'minimal';
  const isLuxury = theme === 'luxury';
  const isSpiderman = theme === 'spiderman';

  const containerBg = isDark
    ? 'bg-[#030712] text-slate-100'
    : isMinimal
    ? 'bg-[#f4f3ef] text-[#2c2b29]'
    : isLuxury
    ? 'bg-[#090806] text-[#fbf7ee]'
    : isSpiderman
    ? 'bg-[#08030a] text-[#f3f0f7]'
    : 'bg-[#f8fafc] text-slate-800';

  const cardStyle = isDark
    ? 'bg-slate-900/60 border-slate-800/80 rounded-3xl shadow-xl backdrop-blur-xl'
    : isMinimal
    ? 'bg-[#ffffff]/80 border-[#e5e2da] rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] backdrop-blur-md'
    : isLuxury
    ? 'bg-[#14120e]/90 border-[#d4af37]/30 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.08)] backdrop-blur-xl'
    : isSpiderman
    ? 'bg-[#120718]/95 border-[#e11d48]/40 rounded-2xl shadow-[0_10px_35px_rgba(225,29,72,0.15)] backdrop-blur-xl'
    : 'bg-white/80 border-slate-200/80 rounded-3xl shadow-slate-200/50 shadow-xl backdrop-blur-xl';

  return (
    <div className={`min-h-screen flex flex-col md:flex-row p-4 md:p-6 gap-6 font-sans transition-colors duration-300 selection:bg-rose-500 selection:text-white ${containerBg}`}>
      
      {/* Fondos dinámicos */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
      )}
      {theme === 'light' && (
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
      )}
      {isMinimal && (
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#d5d1c8_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
      )}
      {isLuxury && (
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.04),transparent_70%)]" />
      )}
      {isSpiderman && (
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(225,29,72,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.08),transparent_50%)]" />
      )}

      {/* MENU LATERAL IZQUIERDO */}
      <aside className={`w-full md:w-72 backdrop-blur-2xl border p-6 flex flex-col justify-between shrink-0 relative z-20 transition-all ${
        isDark 
          ? 'bg-slate-900/60 border-slate-800/80 rounded-3xl shadow-2xl shadow-black/50' 
          : isMinimal
          ? 'bg-[#ffffff]/90 border-[#e5e2da] rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)]'
          : isLuxury
          ? 'bg-[#12100c]/95 border-[#d4af37]/40 rounded-2xl shadow-2xl shadow-black'
          : isSpiderman
          ? 'bg-[#0e0414]/95 border-[#e11d48]/50 rounded-2xl shadow-2xl shadow-rose-950/30'
          : 'bg-white/70 border-slate-200/80 rounded-3xl shadow-2xl shadow-slate-200/50'
      }`}>
        <div className="space-y-8">
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <div className={`w-3.5 h-3.5 rounded-full ${isMinimal ? 'bg-[#3b3a36]' : isLuxury ? 'bg-[#d4af37]' : isSpiderman ? 'bg-rose-600' : 'bg-rose-500/80'}`} />
            <div className={`w-3.5 h-3.5 rounded-full ${isMinimal ? 'bg-[#938f85]' : isLuxury ? 'bg-[#aa7c11]' : isSpiderman ? 'bg-cyan-400' : 'bg-amber-500/80'}`} />
            <div className={`w-3.5 h-3.5 rounded-full ${isMinimal ? 'bg-[#d0ccc3]' : isLuxury ? 'bg-[#f3e5ab]' : isSpiderman ? 'bg-blue-600' : 'bg-emerald-500/80'}`} />
          </div>

          {/* Logo Brand */}
          <div className="px-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-cyan-400' : isMinimal ? 'bg-[#8c7a6b]' : isLuxury ? 'bg-[#d4af37]' : isSpiderman ? 'bg-rose-500' : 'bg-blue-600'
                }`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isDark ? 'bg-cyan-500' : isMinimal ? 'bg-[#6b5c50]' : isLuxury ? 'bg-[#f3e5ab]' : isSpiderman ? 'bg-rose-600' : 'bg-blue-600'
                }`} />
              </span>
              <span className={`text-[10px] font-mono tracking-widest font-bold uppercase ${
                isDark ? 'text-cyan-400' : isMinimal ? 'text-[#8c7a6b]' : isLuxury ? 'text-[#d4af37] tracking-widest' : isSpiderman ? 'text-rose-400 font-extrabold' : 'text-blue-600'
              }`}>{t.proTerminal}</span>
            </div>
            <h1 className={`text-2xl font-black tracking-tight ${
              isDark 
                ? 'bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent' 
                : isMinimal
                ? 'text-[#2c2b29] font-serif'
                : isLuxury
                ? 'bg-gradient-to-r from-[#fbf7ee] via-[#d4af37] to-[#aa7c11] bg-clip-text text-transparent font-serif tracking-wide'
                : isSpiderman
                ? 'bg-gradient-to-r from-rose-500 via-rose-300 to-cyan-400 bg-clip-text text-transparent tracking-wider'
                : 'text-slate-900'
            }`}>
              NEXUS P&L
            </h1>
          </div>

          {/* Navegación */}
          <nav className="space-y-2.5">
            {[
              { id: 'dashboard', label: t.dashboard, icon: '📊' },
              { id: 'analytics', label: t.analytics, icon: '📈' },
              { id: 'calendar', label: t.calendar, icon: '📅' }
            ].map((nav) => {
              const isActive = currentView === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => setCurrentView(nav.id as any)}
                  className={`w-full text-left px-5 py-3.5 font-mono text-xs font-bold transition-all flex items-center gap-3 ${
                    isMinimal ? 'rounded-full' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
                  } ${
                    isActive
                      ? isDark 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]' 
                        : isMinimal
                        ? 'bg-[#2c2b29] text-[#f4f3ef] shadow-md scale-[1.02]'
                        : isLuxury
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#090806] shadow-[0_0_25px_rgba(212,175,55,0.3)] font-black scale-[1.02]'
                        : isSpiderman
                        ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-[0_0_25px_rgba(225,29,72,0.5)] font-black scale-[1.02]'
                        : 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                      : isDark 
                        ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' 
                        : isMinimal
                        ? 'text-[#7a766f] hover:bg-[#f4f3ef] hover:text-[#2c2b29]'
                        : isLuxury
                        ? 'text-[#b3a896] hover:bg-[#201c15] hover:text-[#fbf7ee]'
                        : isSpiderman
                        ? 'text-slate-300 hover:bg-rose-950/40 hover:text-rose-300'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="text-base">{nav.icon}</span>
                  <span>{nav.label}</span>
                </button>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="space-y-4 pt-6">
          <button
            onClick={() => setCurrentView('settings')}
            className={`w-full text-left px-5 py-3.5 font-mono text-xs font-bold transition-all flex items-center gap-3 ${
              isMinimal ? 'rounded-full' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
            } ${
              currentView === 'settings'
                ? isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]' 
                  : isMinimal
                  ? 'bg-[#2c2b29] text-[#f4f3ef] shadow-md scale-[1.02]'
                  : isLuxury
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#090806] shadow-[0_0_25px_rgba(212,175,55,0.3)] font-black scale-[1.02]'
                  : isSpiderman
                  ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-[0_0_25px_rgba(225,29,72,0.5)] font-black scale-[1.02]'
                  : 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                : isDark 
                  ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' 
                  : isMinimal
                  ? 'text-[#7a766f] hover:bg-[#f4f3ef] hover:text-[#2c2b29]'
                  : isLuxury
                  ? 'text-[#b3a896] hover:bg-[#201c15] hover:text-[#fbf7ee]'
                  : isSpiderman
                  ? 'text-slate-300 hover:bg-rose-950/40 hover:text-rose-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span className="text-base">⚙️</span>
            <span>{t.settings}</span>
          </button>

          <div className={`pt-4 border-t px-2 space-y-1 ${
            isDark ? 'border-slate-800/60' : isMinimal ? 'border-[#e5e2da]' : isLuxury ? 'border-[#d4af37]/20' : isSpiderman ? 'border-rose-900/40' : 'border-slate-200'
          }`}>
            <p className="text-[10px] font-mono text-slate-400 uppercase">{t.timeZone}</p>
            <p className={`text-xs font-mono font-bold ${
              isDark ? 'text-slate-300' : isMinimal ? 'text-[#2c2b29]' : isLuxury ? 'text-[#d4af37]' : isSpiderman ? 'text-cyan-400' : 'text-slate-700'
            }`}>GMT-5 (BOGOTÁ)</p>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 space-y-6 relative z-10 max-w-6xl">
        
        {/* VISTA 1: DASHBOARD */}
        {currentView === 'dashboard' && (
          <>
            {/* METRICAS KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-6 border relative overflow-hidden transition-all ${cardStyle}`}>
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${
                  isLuxury ? 'from-transparent via-[#d4af37] to-transparent opacity-90' : isSpiderman ? 'from-transparent via-rose-600 to-transparent opacity-90' : 'from-transparent via-emerald-500 to-transparent opacity-60'
                }`} />
                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">{t.netPnL}</p>
                <h2 className={`text-4xl font-mono font-black mt-2 tracking-tight ${
                  totalPnL >= 0 
                    ? isLuxury ? 'text-[#f3e5ab] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]' : isSpiderman ? 'text-rose-400 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]' : 'text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                    : 'text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                }`}>
                  ${totalPnL.toFixed(2)}
                </h2>
              </div>

              <div className={`p-6 border relative overflow-hidden transition-all ${cardStyle}`}>
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${
                  isLuxury ? 'from-transparent via-[#aa7c11] to-transparent opacity-90' : isSpiderman ? 'from-transparent via-cyan-400 to-transparent opacity-90' : 'from-transparent via-blue-500 to-transparent opacity-60'
                }`} />
                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">{t.winRate}</p>
                <h2 className={`text-4xl font-mono font-black mt-2 tracking-tight ${
                  isDark ? 'text-cyan-400' : isMinimal ? 'text-[#8c7a6b]' : isLuxury ? 'text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]' : isSpiderman ? 'text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-blue-600'
                }`}>
                  {winRate}%
                </h2>
              </div>

              <div className={`p-6 border relative overflow-hidden transition-all ${cardStyle}`}>
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${
                  isLuxury ? 'from-transparent via-[#fbf7ee] to-transparent opacity-90' : isSpiderman ? 'from-transparent via-blue-600 to-transparent opacity-90' : 'from-transparent via-indigo-500 to-transparent opacity-60'
                }`} />
                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">{t.executions}</p>
                <h2 className={`text-4xl font-mono font-black mt-2 tracking-tight ${
                  isDark ? 'text-slate-100' : isMinimal ? 'text-[#2c2b29]' : isLuxury ? 'text-[#fbf7ee]' : isSpiderman ? 'text-blue-400' : 'text-slate-900'
                }`}>
                  {totalDays} <span className="text-xs text-slate-400 font-sans font-normal">{t.ops}</span>
                </h2>
              </div>
            </div>

            {/* BARRA OBJETIVO / TARGET */}
            <div className={`p-6 border space-y-4 ${cardStyle}`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className={`text-xs font-mono font-bold tracking-wider uppercase ${
                    isDark ? 'text-slate-300' : isMinimal ? 'text-[#2c2b29]' : isLuxury ? 'text-[#d4af37]' : isSpiderman ? 'text-rose-400' : 'text-slate-700'
                  }`}>
                    {t.targetGoal}
                  </h3>
                </div>
                
                {!isEditingGoal ? (
                  <button 
                    onClick={() => setIsEditingGoal(true)}
                    className={`text-xs font-mono px-4 py-1.5 rounded-full border transition-all ${
                      isDark 
                        ? 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200' 
                        : isMinimal
                        ? 'bg-[#f4f3ef] hover:bg-[#e8e5dc] border-[#e5e2da] text-[#2c2b29]'
                        : isLuxury
                        ? 'bg-[#1e1a12] hover:bg-[#282218] border-[#d4af37]/40 text-[#f3e5ab] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                        : isSpiderman
                        ? 'bg-[#1b0a24] hover:bg-[#270e34] border-rose-600/40 text-rose-300 shadow-[0_0_12px_rgba(225,29,72,0.2)]'
                        : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                    }`}
                  >
                    {t.setTarget} (${targetGoal})
                  </button>
                ) : (
                  <form onSubmit={handleSaveGoal} className="flex items-center gap-2">
                    <input
                      type="number"
                      value={inputGoal}
                      onChange={e => setInputGoal(e.target.value)}
                      className={`w-28 border rounded-full px-3 py-1 text-xs font-mono focus:outline-none ${
                        isDark ? 'bg-[#050811] border-cyan-500 text-white' : isLuxury ? 'bg-[#0a0907] border-[#d4af37] text-[#fbf7ee]' : isSpiderman ? 'bg-[#08030a] border-rose-600 text-white' : 'bg-white border-blue-500 text-slate-900'
                      }`}
                    />
                    <button
                      type="submit"
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${isLuxury ? 'bg-[#d4af37] text-black hover:bg-[#e6c553]' : isSpiderman ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-emerald-500 text-white hover:bg-emerald-400'}`}
                    >
                      {t.set}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingGoal(false)}
                      className="text-xs font-mono bg-slate-400 text-white px-2 py-1 rounded-full hover:bg-slate-500"
                    >
                      ✕
                    </button>
                  </form>
                )}
              </div>

              <div className="flex justify-between items-end text-xs font-mono">
                <div>
                  <span className="text-slate-400">{t.accumulated}: </span>
                  <span className={`font-bold ${
                    isDark ? 'text-slate-200' : isMinimal ? 'text-[#2c2b29]' : isLuxury ? 'text-[#f3e5ab]' : isSpiderman ? 'text-rose-300' : 'text-slate-800'
                  }`}>${totalPnL.toFixed(2)}</span>
                  <span className="text-slate-400"> / ${targetGoal.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className={`font-bold ${
                    isDark ? 'text-cyan-400' : isMinimal ? 'text-[#8c7a6b]' : isLuxury ? 'text-[#d4af37]' : isSpiderman ? 'text-cyan-400' : 'text-blue-600'
                  }`}>{progressPercent.toFixed(1)}%</span>
                  <span className="text-[10px] text-slate-400 block">
                    {remainingGoal > 0 ? `${t.remaining}: $${remainingGoal.toFixed(2)}` : t.metGoal}
                  </span>
                </div>
              </div>

              <div className={`w-full h-3 rounded-full overflow-hidden border p-0.5 ${
                isDark ? 'bg-[#050811] border-slate-800' : isMinimal ? 'bg-[#f4f3ef] border-[#e5e2da]' : isLuxury ? 'bg-[#0a0907] border-[#d4af37]/30' : isSpiderman ? 'bg-[#08030a] border-rose-900/40' : 'bg-slate-100 border-slate-200'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    progressPercent >= 100 
                      ? isLuxury ? 'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] shadow-[0_0_12px_rgba(212,175,55,0.6)]' : isSpiderman ? 'bg-gradient-to-r from-rose-600 via-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(225,29,72,0.6)]' : 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500' 
                      : totalPnL < 0 
                      ? 'bg-rose-500' 
                      : isMinimal
                      ? 'bg-[#8c7a6b]'
                      : isLuxury
                      ? 'bg-gradient-to-r from-[#aa7c11] to-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.4)]'
                      : isSpiderman
                      ? 'bg-gradient-to-r from-rose-600 to-blue-600 shadow-[0_0_8px_rgba(225,29,72,0.4)]'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* FORMULARIO + GRÁFICO CON NÚMEROS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Formulario */}
              <div className={`p-6 border ${cardStyle}`}>
                <h3 className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${
                  isLuxury ? 'text-[#d4af37]' : isSpiderman ? 'text-rose-500' : 'text-emerald-500'
                }`}>
                  <span>[+]</span> {t.addTrade}
                </h3>
                <form onSubmit={handleAdd} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">{t.opDate}</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className={`w-full border p-3 text-xs font-mono focus:outline-none ${
                        isMinimal ? 'rounded-full px-4' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
                      } ${
                        isDark 
                          ? 'bg-[#050811] border-slate-800 text-white focus:border-cyan-500' 
                          : isMinimal
                          ? 'bg-[#f4f3ef] border-[#e5e2da] text-[#2c2b29] focus:border-[#8c7a6b]'
                          : isLuxury
                          ? 'bg-[#0a0907] border-[#d4af37]/30 text-[#fbf7ee] focus:border-[#d4af37]'
                          : isSpiderman
                          ? 'bg-[#08030a] border-rose-900/40 text-white focus:border-rose-600'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">{t.pnlResult}</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className={`w-full border p-3 text-xs font-mono focus:outline-none ${
                        isMinimal ? 'rounded-full px-4' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
                      } ${
                        isDark 
                          ? 'bg-[#050811] border-slate-800 text-white focus:border-cyan-500' 
                          : isMinimal
                          ? 'bg-[#f4f3ef] border-[#e5e2da] text-[#2c2b29] focus:border-[#8c7a6b]'
                          : isLuxury
                          ? 'bg-[#0a0907] border-[#d4af37]/30 text-[#fbf7ee] focus:border-[#d4af37]'
                          : isSpiderman
                          ? 'bg-[#08030a] border-rose-900/40 text-white focus:border-rose-600'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">{t.executionStatus}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WIN', 'LOSS', 'BREAKEVEN'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setStatus(st)}
                          className={`py-2 text-[10px] font-mono font-bold border transition-all ${
                            isMinimal ? 'rounded-full' : isLuxury || isSpiderman ? 'rounded-lg' : 'rounded-xl'
                          } ${
                            status === st
                              ? st === 'WIN' 
                                ? isLuxury ? 'bg-[#d4af37]/20 text-[#f3e5ab] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)]' : isSpiderman ? 'bg-rose-600/20 text-rose-400 border-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.3)]' : 'bg-emerald-500/20 text-emerald-500 border-emerald-500' 
                                : st === 'LOSS'
                                ? 'bg-rose-500/20 text-rose-500 border-rose-500'
                                : 'bg-slate-500/20 text-slate-400 border-slate-500'
                              : isDark 
                              ? 'bg-[#050811] text-slate-500 border-slate-800' 
                              : isMinimal
                              ? 'bg-[#f4f3ef] text-[#7a766f] border-[#e5e2da]'
                              : isLuxury
                              ? 'bg-[#0a0907] text-[#a39885] border-[#d4af37]/20 hover:border-[#d4af37]/50'
                              : isSpiderman
                              ? 'bg-[#08030a] text-slate-400 border-rose-900/30 hover:border-rose-600/50'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}
                        >
                          {st === 'BREAKEVEN' ? 'EVEN' : st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">{t.notesLabel}</label>
                    <textarea
                      rows={2}
                      placeholder={t.notesPlaceholder}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className={`w-full border p-3 text-xs focus:outline-none resize-none ${
                        isMinimal ? 'rounded-2xl' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
                      } ${
                        isDark 
                          ? 'bg-[#050811] border-slate-800 text-white focus:border-cyan-500' 
                          : isMinimal
                          ? 'bg-[#f4f3ef] border-[#e5e2da] text-[#2c2b29] focus:border-[#8c7a6b]'
                          : isLuxury
                          ? 'bg-[#0a0907] border-[#d4af37]/30 text-[#fbf7ee] focus:border-[#d4af37]'
                          : isSpiderman
                          ? 'bg-[#08030a] border-rose-900/40 text-white focus:border-rose-600'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">{t.screenshotLabel}</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className={`w-full text-xs font-mono file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold ${
                        isDark 
                          ? 'file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 text-slate-400' 
                          : isMinimal
                          ? 'file:bg-[#e5e2da] file:text-[#2c2b29] hover:file:bg-[#d8d4c9] text-[#7a766f]'
                          : isLuxury
                          ? 'file:bg-[#201c15] file:text-[#f3e5ab] hover:file:bg-[#2e271d] text-[#b3a896]'
                          : isSpiderman
                          ? 'file:bg-rose-950 file:text-rose-300 hover:file:bg-rose-900 text-slate-400'
                          : 'file:bg-slate-200 file:text-slate-800 hover:file:bg-slate-300 text-slate-600'
                      }`}
                    />
                    {screenshot && (
                      <div className={`mt-2 text-[10px] font-mono ${isLuxury ? 'text-[#f3e5ab]' : isSpiderman ? 'text-rose-400' : 'text-emerald-500'}`}>
                        ✓ Imagen adjuntada con éxito
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 font-mono text-xs font-bold transition-all shadow-lg ${
                      isMinimal ? 'rounded-full' : isLuxury ? 'rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]' : isSpiderman ? 'rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)]' : 'rounded-2xl'
                    } ${
                      isDark 
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:opacity-90 shadow-emerald-500/10' 
                        : isMinimal
                        ? 'bg-[#2c2b29] text-[#f4f3ef] hover:bg-[#42403d] shadow-md'
                        : isLuxury
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#090806] hover:opacity-95'
                        : isSpiderman
                        ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-blue-600 text-white hover:opacity-95'
                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
                    }`}
                  >
                    {t.registerTrade}
                  </button>
                </form>
              </div>

              {/* Curva de Equidad / Gráfico Vectorial SVG con Números */}
              <div className={`lg:col-span-2 p-6 border flex flex-col justify-between ${cardStyle}`}>
                <div>
                  <h3 className={`text-xs font-mono font-bold tracking-wider uppercase mb-2 ${
                    isDark ? 'text-slate-300' : isMinimal ? 'text-[#2c2b29]' : isLuxury ? 'text-[#d4af37]' : isSpiderman ? 'text-rose-400' : 'text-slate-700'
                  }`}>
                    📈 {t.equityCurve}
                  </h3>
                </div>

                <div className="w-full h-64 flex items-center justify-center my-4 overflow-hidden relative">
                  {chartData.length > 0 ? (
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={isDark ? '#06b6d4' : isMinimal ? '#8c7a6b' : isLuxury ? '#d4af37' : isSpiderman ? '#e11d48' : '#2563eb'} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={isDark ? '#06b6d4' : isMinimal ? '#8c7a6b' : isLuxury ? '#d4af37' : isSpiderman ? '#2563eb' : '#2563eb'} stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Línea Base de Cero */}
                      <line
                        x1={pad}
                        y1={zeroY}
                        x2={W - pad}
                        y2={zeroY}
                        stroke={isDark ? '#334155' : isMinimal ? '#e5e2da' : isLuxury ? '#3a3223' : isSpiderman ? '#2d1538' : '#cbd5e1'}
                        strokeDasharray="4 4"
                      />

                      {/* Área rellena bajo la curva */}
                      <polygon points={areaPoints} fill="url(#equityGradient)" />

                      {/* Línea principal */}
                      <polyline
                        fill="none"
                        stroke={isDark ? '#06b6d4' : isMinimal ? '#8c7a6b' : isLuxury ? '#d4af37' : isSpiderman ? '#e11d48' : '#2563eb'}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={polylinePoints}
                      />

                      {/* Nodos e Indicadores de Valor Numérico */}
                      {pointsArray.map((p, idx) => (
                        <g key={idx}>
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r="5"
                            className={`${p.val >= 0 ? isLuxury ? 'fill-[#f3e5ab]' : isSpiderman ? 'fill-rose-400' : 'fill-emerald-400' : 'fill-rose-500'} stroke-2 ${
                              isDark ? 'stroke-slate-900' : isMinimal ? 'stroke-[#ffffff]' : isLuxury ? 'stroke-[#14120e]' : isSpiderman ? 'stroke-[#120718]' : 'stroke-white'
                            }`}
                          />
                          <text
                            x={p.x}
                            y={p.y - 12}
                            textAnchor="middle"
                            className={`text-[10px] font-mono font-bold ${
                              p.val >= 0 
                                ? isLuxury ? 'fill-[#f3e5ab]' : isSpiderman ? 'fill-rose-300' : 'fill-emerald-400' 
                                : 'fill-rose-500'
                            }`}
                          >
                            ${p.val.toFixed(0)}
                          </text>
                        </g>
                      ))}
                    </svg>
                  ) : (
                    <div className="text-center font-mono text-xs text-slate-500">
                      {t.noChartData}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t pt-3 border-slate-800/40">
                  <span>START: $0.00</span>
                  <span>CURRENT: ${totalPnL.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* TABLA HISTORIAL */}
            <div className={`p-6 border ${cardStyle}`}>
              <h3 className={`text-xs font-mono font-bold tracking-wider uppercase mb-4 ${
                isDark ? 'text-slate-300' : isMinimal ? 'text-[#2c2b29]' : isLuxury ? 'text-[#d4af37]' : isSpiderman ? 'text-rose-400' : 'text-slate-700'
              }`}>
                📋 {t.historyTitle}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] font-mono text-slate-400 ${
                      isDark ? 'border-slate-800' : isMinimal ? 'border-[#e5e2da]' : isLuxury ? 'border-[#d4af37]/20' : isSpiderman ? 'border-rose-950' : 'border-slate-200'
                    }`}>
                      <th className="p-3">{t.thDate}</th>
                      <th className="p-3">{t.thStatus}</th>
                      <th className="p-3">{t.thResult}</th>
                      <th className="p-3">{t.thNotes}</th>
                      <th className="p-3">{t.thScreenshot}</th>
                      <th className="p-3 text-right">{t.thActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 font-mono text-xs">
                    {entries.length > 0 ? (
                      entries.map((item) => (
                        <tr key={item.id} className={`transition-colors ${
                          isDark ? 'hover:bg-slate-800/30' : isMinimal ? 'hover:bg-[#f4f3ef]' : isLuxury ? 'hover:bg-[#1a1711]' : isSpiderman ? 'hover:bg-rose-950/20' : 'hover:bg-slate-50'
                        }`}>
                          <td className="p-3 whitespace-nowrap">{item.date}</td>
                          <td className="p-3">
                            <span className={`px-3 py-1 text-[10px] font-bold ${
                              isMinimal ? 'rounded-full' : isLuxury || isSpiderman ? 'rounded' : 'rounded-md'
                            } ${
                              item.status === 'WIN' 
                                ? isLuxury ? 'bg-[#d4af37]/10 text-[#f3e5ab] border border-[#d4af37]/30 shadow-[0_0_8px_rgba(212,175,55,0.15)]' : isSpiderman ? 'bg-rose-600/15 text-rose-400 border border-rose-600/40 shadow-[0_0_8px_rgba(225,29,72,0.2)]' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                : item.status === 'LOSS' 
                                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className={`p-3 font-bold ${
                            item.amount > 0 ? isLuxury ? 'text-[#f3e5ab]' : isSpiderman ? 'text-rose-400' : 'text-emerald-500' : item.amount < 0 ? 'text-rose-500' : 'text-slate-400'
                          }`}>
                            ${item.amount.toFixed(2)}
                          </td>
                          <td className="p-3 max-w-xs truncate text-slate-400">{item.notes || '-'}</td>
                          <td className="p-3">
                            {item.screenshot ? (
                              <button
                                onClick={() => setActiveImageModal(item.screenshot || null)}
                                className={`text-[10px] border px-3 py-1 ${
                                  isMinimal ? 'rounded-full' : isLuxury || isSpiderman ? 'rounded-lg' : 'rounded-lg'
                                } ${
                                  isMinimal
                                    ? 'bg-[#f4f3ef] text-[#2c2b29] border-[#e5e2da]'
                                    : isLuxury
                                    ? 'bg-[#d4af37]/10 text-[#f3e5ab] border-[#d4af37]/30 hover:bg-[#d4af37]/20 shadow-[0_0_8px_rgba(212,175,55,0.15)]'
                                    : isSpiderman
                                    ? 'bg-rose-600/15 text-rose-300 border-rose-600/30 hover:bg-rose-600/25 shadow-[0_0_8px_rgba(225,29,72,0.15)]'
                                    : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20'
                                }`}
                              >
                                {t.screenshotBtn}
                              </button>
                            ) : (
                              <span className="text-slate-600">-</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-rose-500 hover:text-rose-400 text-[10px] font-bold"
                            >
                              {t.deleteBtn}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500 text-xs">
                          {t.noRecords}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* VISTA 2: ANALYTICS */}
        {currentView === 'analytics' && (
          <div className="space-y-6">
            <div className={`p-6 border ${cardStyle}`}>
              <h2 className="text-xl font-black font-mono tracking-tight">{t.metricsTitle}</h2>
              <p className="text-xs text-slate-400 font-mono mt-1">{t.metricsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-6 border ${cardStyle}`}>
                <span className="text-[10px] font-mono text-slate-400 uppercase">{t.profitFactor}</span>
                <h3 className={`text-3xl font-mono font-black mt-2 ${isMinimal ? 'text-[#8c7a6b]' : isLuxury ? 'text-[#d4af37]' : isSpiderman ? 'text-rose-400' : 'text-cyan-400'}`}>{profitFactor}</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1">{t.profitFactorDesc}</p>
              </div>

              <div className={`p-6 border ${cardStyle}`}>
                <span className="text-[10px] font-mono text-slate-400 uppercase">{t.avgWin}</span>
                <h3 className={`text-3xl font-mono font-black mt-2 ${isLuxury ? 'text-[#f3e5ab]' : isSpiderman ? 'text-rose-400' : 'text-emerald-500'}`}>${avgWin}</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1">{t.avgWinDesc}</p>
              </div>

              <div className={`p-6 border ${cardStyle}`}>
                <span className="text-[10px] font-mono text-slate-400 uppercase">{t.avgLoss}</span>
                <h3 className="text-3xl font-mono font-black text-rose-500 mt-2">${avgLoss}</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1">{t.avgLossDesc}</p>
              </div>

              <div className={`p-6 border ${cardStyle}`}>
                <span className="text-[10px] font-mono text-slate-400 uppercase">{t.ratioWinLoss}</span>
                <h3 className={`text-3xl font-mono font-black mt-2 ${isMinimal ? 'text-[#2c2b29]' : isLuxury ? 'text-[#fbf7ee]' : isSpiderman ? 'text-cyan-400' : 'text-blue-500'}`}>{wins}W / {losses}L</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1">{t.ratioWinLossDesc}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 border ${cardStyle}`}>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-4">{t.bestWorstTitle}</h4>
                <div className="space-y-3 font-mono text-sm">
                  <div className={`flex justify-between items-center p-3 border ${
                    isLuxury ? 'bg-[#d4af37]/10 border-[#d4af37]/30 shadow-[0_0_10px_rgba(212,175,55,0.1)]' : isSpiderman ? 'bg-rose-600/10 border-rose-600/30 shadow-[0_0_10px_rgba(225,29,72,0.15)]' : 'bg-emerald-500/10 border-emerald-500/20'
                  } ${isMinimal ? 'rounded-full px-5' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'}`}>
                    <span className={`${isLuxury ? 'text-[#f3e5ab]' : isSpiderman ? 'text-rose-300' : 'text-emerald-500'} font-bold`}>{t.bestTrade}</span>
                    <span className={`${isLuxury ? 'text-[#f3e5ab]' : isSpiderman ? 'text-rose-400' : 'text-emerald-500'} font-black`}>${bestTrade.toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 border bg-rose-500/10 border-rose-500/20 ${isMinimal ? 'rounded-full px-5' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'}`}>
                    <span className="text-rose-500 font-bold">{t.worstTrade}</span>
                    <span className="text-rose-500 font-black">${worstTrade.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className={`p-6 border ${cardStyle}`}>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-4">{t.grossBalanceTitle}</h4>
                <div className="space-y-3 font-mono text-sm">
                  <div className={`flex justify-between items-center p-3 border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/50' : isMinimal ? 'bg-[#f4f3ef] border-[#e5e2da]' : isLuxury ? 'bg-[#1b1710] border-[#d4af37]/20' : isSpiderman ? 'bg-[#180824] border-rose-600/20' : 'bg-slate-100 border-slate-200'
                  } ${isMinimal ? 'rounded-full px-5' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'}`}>
                    <span className={isMinimal ? 'text-[#2c2b29]' : isLuxury ? 'text-[#b3a896]' : isSpiderman ? 'text-slate-300' : 'text-slate-300'}>{t.grossProfit}</span>
                    <span className={`${isLuxury ? 'text-[#f3e5ab]' : isSpiderman ? 'text-rose-400' : 'text-emerald-400'} font-bold`}>${grossProfit.toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/50' : isMinimal ? 'bg-[#f4f3ef] border-[#e5e2da]' : isLuxury ? 'bg-[#1b1710] border-[#d4af37]/20' : isSpiderman ? 'bg-[#180824] border-rose-600/20' : 'bg-slate-100 border-slate-200'
                  } ${isMinimal ? 'rounded-full px-5' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'}`}>
                    <span className={isMinimal ? 'text-[#2c2b29]' : isLuxury ? 'text-[#b3a896]' : isSpiderman ? 'text-slate-300' : 'text-slate-300'}>{t.grossLoss}</span>
                    <span className="text-rose-400 font-bold">${grossLoss.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 3: CALENDARIO DE TRADING (MÁS VERTICAL Y FONDO MÁS OSCURO) */}
        {currentView === 'calendar' && (
          <div className="space-y-6">
            <div className={`p-6 border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${cardStyle}`}>
              <div>
                <h2 className="text-xl font-black font-mono tracking-tight uppercase">
                  {currentMonthDate.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">{t.marketDays}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevMonth}
                  className={`px-4 py-2 font-mono text-xs font-bold border transition-all ${
                    isMinimal ? 'rounded-full' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
                  } ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                      : isMinimal
                      ? 'bg-[#f4f3ef] border-[#e5e2da] text-[#2c2b29] hover:bg-[#e8e5dc]'
                      : isLuxury
                      ? 'bg-[#1e1a12] border-[#d4af37]/40 text-[#f3e5ab] hover:bg-[#282218] shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                      : isSpiderman
                      ? 'bg-[#180824] border-rose-600/40 text-rose-300 hover:bg-[#220b32] shadow-[0_0_10px_rgba(225,29,72,0.15)]'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {t.prevMonth}
                </button>
                <button
                  onClick={nextMonth}
                  className={`px-4 py-2 font-mono text-xs font-bold border transition-all ${
                    isMinimal ? 'rounded-full' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
                  } ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                      : isMinimal
                      ? 'bg-[#f4f3ef] border-[#e5e2da] text-[#2c2b29] hover:bg-[#e8e5dc]'
                      : isLuxury
                      ? 'bg-[#1e1a12] border-[#d4af37]/40 text-[#f3e5ab] hover:bg-[#282218] shadow-[0_0_10px_rgba(212,175,55,0.15)]'
                      : isSpiderman
                      ? 'bg-[#180824] border-rose-600/40 text-rose-300 hover:bg-[#220b32] shadow-[0_0_10px_rgba(225,29,72,0.15)]'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {t.nextMonth}
                </button>
              </div>
            </div>

            {/* Matriz del Calendario Vertical y Fondeo más Oscuro (grid-cols-5 y celdas más altas h-36/h-40) */}
            <div className={`p-6 border ${cardStyle}`}>
              <div className="grid grid-cols-5 gap-3 mb-4 text-center font-mono text-xs font-bold text-slate-400">
                {t.days.map((day, idx) => (
                  <div key={idx} className="py-1 uppercase">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-3">
                {calendarItems.map((item) => {
                  if (item.type === 'empty') {
                    return <div key={item.id} className="h-40 rounded-2xl bg-transparent" />;
                  }

                  const dayEntries = entries.filter(e => e.date === item.dateString);
                  const dayPnL = dayEntries.reduce((acc, e) => acc + e.amount, 0);
                  const hasEntries = dayEntries.length > 0;

                  return (
                    <div
                      key={item.dateString}
                      onClick={() => selectDateFromCalendar(item.dateString)}
                      className={`h-40 p-3.5 border flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] ${
                        isMinimal ? 'rounded-[1.5rem]' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
                      } ${
                        hasEntries
                          ? dayPnL > 0
                            ? isLuxury ? 'bg-[#0a0805]/95 border-[#d4af37]/60 text-[#f3e5ab] shadow-[0_0_15px_rgba(212,175,55,0.2)]' : isSpiderman ? 'bg-[#080206]/95 border-rose-600/60 text-rose-300 shadow-[0_0_15px_rgba(225,29,72,0.2)]' : 'bg-[#010804]/95 border-emerald-500/50 text-emerald-400 shadow-inner'
                            : dayPnL < 0
                            ? 'bg-[#0a0203]/95 border-rose-500/50 text-rose-400 shadow-inner'
                            : isLuxury ? 'bg-[#080705] border-[#d4af37]/30 text-[#b3a896]' : isSpiderman ? 'bg-[#05010a] border-rose-900/30 text-slate-300' : 'bg-[#020408] border-slate-700 text-slate-300 shadow-inner'
                          : isDark
                          ? 'bg-[#010307]/98 border-slate-950 hover:border-slate-800 text-slate-600'
                          : isMinimal
                          ? 'bg-[#e5e1d8]/80 border-[#d0ccc2] hover:border-[#b0aca2] text-[#5e5a52]'
                          : isLuxury
                          ? 'bg-[#030202] border-[#d4af37]/10 hover:border-[#d4af37]/30 text-[#594f41]'
                          : isSpiderman
                          ? 'bg-[#020004] border-rose-950/60 hover:border-rose-800/60 text-slate-600'
                          : 'bg-[#020408]/95 border-slate-900 hover:border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex justify-between items-start font-mono text-xs">
                        <span className="font-bold">{item.dayNumber}</span>
                        {hasEntries && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                            isMinimal ? 'bg-[#2c2b29] text-[#f4f3ef]' : isLuxury ? 'bg-[#d4af37] text-black font-bold shadow-[0_0_6px_rgba(212,175,55,0.4)]' : isSpiderman ? 'bg-rose-600 text-white font-bold shadow-[0_0_8px_rgba(225,29,72,0.5)]' : 'bg-black/70 text-white'
                          }`}>
                            {dayEntries.length} {t.ops}
                          </span>
                        )}
                      </div>

                      <div className="font-mono text-right">
                        {hasEntries ? (
                          <span className="text-xs font-black">
                            ${dayPnL.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-[10px] opacity-40 hover:opacity-100">
                            {t.registerPrompt}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VISTA 4: CONFIGURACIÓN / SETTINGS */}
        {currentView === 'settings' && (
          <div className="space-y-6">
            <div className={`p-6 border ${cardStyle}`}>
              <h2 className="text-xl font-black font-mono tracking-tight">{t.settingsTitle}</h2>
              <p className="text-xs text-slate-400 font-mono mt-1">{t.settingsSubtitle}</p>
            </div>

            {/* SECCIÓN APARIENCIA */}
            <div className={`p-6 border space-y-4 ${cardStyle}`}>
              <div>
                <h3 className="text-sm font-mono font-bold uppercase">{t.appearanceTitle}</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">{t.appearanceDesc}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {/* Cyber Dark */}
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-5 rounded-2xl border text-left font-mono transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-cyan-400">{t.darkTheme}</span>
                    {theme === 'dark' && <span className="text-[10px] text-cyan-400 font-bold">{t.active}</span>}
                  </div>
                  <p className="text-[11px] text-slate-400">{t.darkDesc}</p>
                </button>

                {/* Apple Light */}
                <button
                  onClick={() => setTheme('light')}
                  className={`p-5 rounded-2xl border text-left font-mono transition-all ${
                    theme === 'light'
                      ? 'bg-white border-blue-600 shadow-lg text-slate-900'
                      : 'bg-slate-100/50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-blue-600">{t.lightTheme}</span>
                    {theme === 'light' && <span className="text-[10px] text-blue-600 font-bold">{t.active}</span>}
                  </div>
                  <p className="text-[11px] text-slate-500">{t.lightDesc}</p>
                </button>

                {/* Minimal Ovalado */}
                <button
                  onClick={() => setTheme('minimal')}
                  className={`p-5 rounded-[2rem] border text-left font-mono transition-all ${
                    theme === 'minimal'
                      ? 'bg-[#ffffff] border-[#2c2b29] shadow-md text-[#2c2b29]'
                      : 'bg-[#f4f3ef]/50 border-[#e5e2da] text-[#7a766f] hover:border-[#d0ccc3]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#2c2b29]">{t.minimalTheme}</span>
                    {theme === 'minimal' && <span className="text-[10px] text-[#8c7a6b] font-bold">{t.active}</span>}
                  </div>
                  <p className="text-[11px] text-[#7a766f]">{t.minimalDesc}</p>
                </button>

                {/* Luxury Gold */}
                <button
                  onClick={() => setTheme('luxury')}
                  className={`p-5 rounded-xl border text-left font-mono transition-all ${
                    theme === 'luxury'
                      ? 'bg-[#181510] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] text-[#fbf7ee]'
                      : 'bg-[#0f0d0a]/50 border-[#d4af37]/30 text-[#b3a896] hover:border-[#d4af37]/60'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#f3e5ab] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">{t.luxuryTheme}</span>
                    {theme === 'luxury' && <span className="text-[10px] text-[#d4af37] font-bold">{t.active}</span>}
                  </div>
                  <p className="text-[11px] text-[#b3a896]">{t.luxuryDesc}</p>
                </button>

                {/* Spider-Verse */}
                <button
                  onClick={() => setTheme('spiderman')}
                  className={`p-5 rounded-xl border text-left font-mono transition-all ${
                    theme === 'spiderman'
                      ? 'bg-[#180824] border-rose-600 shadow-[0_0_20px_rgba(225,29,72,0.4)] text-[#f3f0f7]'
                      : 'bg-[#0c0412]/50 border-rose-600/30 text-slate-400 hover:border-rose-600/60'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-rose-400 drop-shadow-[0_0_8px_rgba(225,29,72,0.6)]">{t.spidermanTheme}</span>
                    {theme === 'spiderman' && <span className="text-[10px] text-rose-500 font-bold">{t.active}</span>}
                  </div>
                  <p className="text-[11px] text-slate-400">{t.spidermanDesc}</p>
                </button>
              </div>
            </div>

            {/* SECCIÓN IDIOMA */}
            <div className={`p-6 border space-y-4 ${cardStyle}`}>
              <div>
                <h3 className="text-sm font-mono font-bold uppercase">{t.languageTitle}</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">{t.languageDesc}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setLang('es')}
                  className={`px-6 py-3 font-mono text-xs font-bold border transition-all ${
                    isMinimal ? 'rounded-full' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
                  } ${
                    lang === 'es'
                      ? isDark
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : isMinimal
                        ? 'bg-[#2c2b29] text-[#f4f3ef] border-[#2c2b29] shadow-md'
                        : isLuxury
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#090806] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] font-black'
                        : isSpiderman
                        ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white border-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.4)] font-black'
                        : 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                      : isMinimal
                      ? 'bg-[#f4f3ef] border-[#e5e2da] text-[#7a766f] hover:bg-[#e8e5dc]'
                      : isLuxury
                      ? 'bg-[#181510] border-[#d4af37]/30 text-[#b3a896] hover:bg-[#201c15]'
                      : isSpiderman
                      ? 'bg-[#14061e] border-rose-600/30 text-slate-300 hover:bg-[#1f0930]'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  🇪🇸 Español (ES)
                </button>

                <button
                  onClick={() => setLang('en')}
                  className={`px-6 py-3 font-mono text-xs font-bold border transition-all ${
                    isMinimal ? 'rounded-full' : isLuxury || isSpiderman ? 'rounded-xl' : 'rounded-2xl'
                  } ${
                    lang === 'en'
                      ? isDark
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : isMinimal
                        ? 'bg-[#2c2b29] text-[#f4f3ef] border-[#2c2b29] shadow-md'
                        : isLuxury
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#090806] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] font-black'
                        : isSpiderman
                        ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white border-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.4)] font-black'
                        : 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : isDark
                      ? 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                      : isMinimal
                      ? 'bg-[#f4f3ef] border-[#e5e2da] text-[#7a766f] hover:bg-[#e8e5dc]'
                      : isLuxury
                      ? 'bg-[#181510] border-[#d4af37]/30 text-[#b3a896] hover:bg-[#201c15]'
                      : isSpiderman
                      ? 'bg-[#14061e] border-rose-600/30 text-slate-300 hover:bg-[#1f0930]'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  🇺🇸 English (EN)
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL DE CAPTURA */}
      {activeImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`max-w-4xl w-full p-4 border shadow-2xl relative ${
            isMinimal ? 'rounded-[2.5rem]' : isLuxury || isSpiderman ? 'rounded-2xl' : 'rounded-3xl'
          } ${
            isDark ? 'bg-slate-900 border-slate-800' : isMinimal ? 'bg-[#ffffff] border-[#e5e2da]' : isLuxury ? 'bg-[#14120e] border-[#d4af37]/50 shadow-[0_0_30px_rgba(212,175,55,0.2)]' : isSpiderman ? 'bg-[#120718] border-rose-600/60 shadow-[0_0_30px_rgba(225,29,72,0.3)]' : 'bg-white border-slate-200'
          }`}>
            <div className="flex justify-between items-center mb-4 px-2">
              <span className={`text-xs font-mono font-bold ${isLuxury ? 'text-[#d4af37]' : isSpiderman ? 'text-rose-400' : 'text-slate-400'}`}>{t.screenshotLabel}</span>
              <button
                onClick={() => setActiveImageModal(null)}
                className="text-xs font-mono font-bold text-rose-500 hover:text-rose-400"
              >
                {t.closeModal}
              </button>
            </div>
            <div className={`overflow-hidden border ${isMinimal ? 'rounded-[2rem] border-[#e5e2da]' : isLuxury ? 'rounded-xl border-[#d4af37]/30' : isSpiderman ? 'rounded-xl border-rose-600/30' : 'rounded-2xl border-slate-800/50'}`}>
              <img
                src={activeImageModal}
                alt="Trade Screenshot"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}