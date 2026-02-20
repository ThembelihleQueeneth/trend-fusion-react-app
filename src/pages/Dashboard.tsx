import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Bell,
  Settings,
  ChevronUp,
  ChevronDown,
  Globe,
  Zap,
  BarChart2,
  Star,
  LogOut,
  Activity,
  DollarSign,
  Layers,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const COINS = [
  {
    rank: 1, id: "bitcoin", symbol: "BTC", name: "Bitcoin",
    price: 67420.50, change1h: 0.42, change24h: 2.81, change7d: 5.34,
    marketCap: 1324000000000, volume: 28400000000,
    sparkline: [62000, 63500, 61800, 64200, 65100, 66300, 67420],
    color: "#F7931A",
  },
  {
    rank: 2, id: "ethereum", symbol: "ETH", name: "Ethereum",
    price: 3542.18, change1h: -0.18, change24h: 1.94, change7d: 3.21,
    marketCap: 425000000000, volume: 14200000000,
    sparkline: [3300, 3380, 3250, 3420, 3480, 3510, 3542],
    color: "#627EEA",
  },
  {
    rank: 3, id: "tether", symbol: "USDT", name: "Tether",
    price: 1.000, change1h: 0.01, change24h: -0.02, change7d: 0.01,
    marketCap: 114000000000, volume: 52000000000,
    sparkline: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
    color: "#26A17B",
  },
  {
    rank: 4, id: "bnb", symbol: "BNB", name: "BNB",
    price: 592.30, change1h: 0.65, change24h: -1.12, change7d: 2.44,
    marketCap: 86000000000, volume: 1900000000,
    sparkline: [570, 578, 562, 581, 588, 585, 592],
    color: "#F3BA2F",
  },
  {
    rank: 5, id: "solana", symbol: "SOL", name: "Solana",
    price: 178.45, change1h: 1.23, change24h: 4.56, change7d: 12.80,
    marketCap: 82000000000, volume: 3800000000,
    sparkline: [142, 151, 148, 158, 165, 172, 178],
    color: "#9945FF",
  },
  {
    rank: 6, id: "xrp", symbol: "XRP", name: "XRP",
    price: 0.6124, change1h: -0.31, change24h: -2.14, change7d: 1.05,
    marketCap: 33000000000, volume: 1200000000,
    sparkline: [0.59, 0.61, 0.60, 0.62, 0.61, 0.63, 0.61],
    color: "#00AAE4",
  },
  {
    rank: 7, id: "usdc", symbol: "USDC", name: "USD Coin",
    price: 1.000, change1h: 0.00, change24h: 0.01, change7d: -0.01,
    marketCap: 32000000000, volume: 6400000000,
    sparkline: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
    color: "#2775CA",
  },
  {
    rank: 8, id: "cardano", symbol: "ADA", name: "Cardano",
    price: 0.4832, change1h: 0.88, change24h: 3.20, change7d: -4.11,
    marketCap: 17000000000, volume: 420000000,
    sparkline: [0.52, 0.50, 0.48, 0.46, 0.47, 0.48, 0.48],
    color: "#0033AD",
  },
  {
    rank: 9, id: "avalanche", symbol: "AVAX", name: "Avalanche",
    price: 38.72, change1h: 1.50, change24h: 5.88, change7d: 8.20,
    marketCap: 15800000000, volume: 680000000,
    sparkline: [32, 33, 34, 35, 36, 38, 38.72],
    color: "#E84142",
  },
  {
    rank: 10, id: "dogecoin", symbol: "DOGE", name: "Dogecoin",
    price: 0.1542, change1h: -0.44, change24h: -1.80, change7d: 2.10,
    marketCap: 22000000000, volume: 950000000,
    sparkline: [0.16, 0.15, 0.16, 0.15, 0.15, 0.16, 0.154],
    color: "#C2A633",
  },
];

const TRENDING = [
  { name: "Solana", symbol: "SOL", change: "+12.8%", color: "#9945FF" },
  { name: "Avalanche", symbol: "AVAX", change: "+8.2%", color: "#E84142" },
  { name: "Bitcoin", symbol: "BTC", change: "+5.3%", color: "#F7931A" },
  { name: "Ethereum", symbol: "ETH", change: "+3.2%", color: "#627EEA" },
];

const STATS = [
  { label: "Market Cap", value: "$2.42T", sub: "+3.2% today", icon: Globe, up: true },
  { label: "24h Volume", value: "$112.4B", sub: "+18.5% vs avg", icon: Activity, up: true },
  { label: "BTC Dominance", value: "54.7%", sub: "-0.4% today", icon: DollarSign, up: false },
  { label: "Active Coins", value: "14,832", sub: "+28 new today", icon: Layers, up: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number, decimals = 2) =>
  n >= 1e12 ? `$${(n / 1e12).toFixed(2)}T`
  : n >= 1e9 ? `$${(n / 1e9).toFixed(2)}B`
  : n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M`
  : `$${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

const fmtPrice = (p: number) =>
  p < 1 ? `$${p.toFixed(4)}` : `$${p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ChangeBadge = ({ val }: { val: number }) => {
  const up = val >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md
      ${up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
      {up ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      {Math.abs(val).toFixed(2)}%
    </span>
  );
};

// Mini sparkline SVG
const Sparkline = ({ data, color, up }: { data: number[]; color: string; up: boolean }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80, h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  const fill = `${data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ")} ${w},${h} 0,${h}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`g-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={up ? "#34d399" : "#f87171"} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={up ? "#34d399" : "#f87171"} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={fill} fill={`url(#g-${color.replace("#","")})`} />
      <polyline points={pts} fill="none" stroke={up ? "#34d399" : "#f87171"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["bitcoin", "ethereum"]);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [sortBy, setSortBy] = useState<"rank" | "price" | "change24h" | "marketCap">("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const toggleFavorite = (id: string) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const handleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const filtered = COINS
    .filter(c => activeTab === "favorites" ? favorites.includes(c.id) : true)
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      return (a[sortBy] - b[sortBy]) * mult;
    });

  const SortIcon = ({ col }: { col: typeof sortBy }) =>
    sortBy === col
      ? sortDir === "asc" ? <ChevronUp size={12} className="text-emerald-400" /> : <ChevronDown size={12} className="text-emerald-400" />
      : <ChevronUp size={12} className="text-slate-600" />;

  return (
    <div className="min-h-screen bg-[#070B14] text-white font-['DM_Sans',sans-serif]">
      {/* Font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>

      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 h-full w-16 bg-[#0C1221] border-r border-white/5 flex flex-col items-center py-6 gap-6 z-40">
        {/* Logo */}
        <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <Zap size={18} className="text-emerald-400" />
        </div>

        <div className="w-full h-px bg-white/5" />

        {[
          { icon: BarChart2, label: "Dashboard", active: true },
          { icon: TrendingUp, label: "Trending" },
          { icon: Star, label: "Watchlist" },
          { icon: Globe, label: "Markets" },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            title={label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
              ${active
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"}`}
          >
            <Icon size={18} />
          </button>
        ))}

        <div className="mt-auto flex flex-col items-center gap-4">
          <button title="Settings" className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all">
            <Settings size={18} />
          </button>
          <button title="Log out" className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="ml-16 min-h-screen flex flex-col">

        {/* ── Top Bar ── */}
        <header className="sticky top-0 z-30 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white tracking-tight">Market Overview</h1>
            <p className="text-xs text-slate-500 mt-0.5">Last updated: Feb 20, 2026 · 14:32 UTC</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search coins…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all w-52"
              />
            </div>

            {/* Bell */}
            <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all relative">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-black">
              DM
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-6 space-y-6">

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ label, value, sub, icon: Icon, up }) => (
              <div key={label} className="bg-[#0C1221] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                    ${up ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}>
                    <Icon size={17} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg
                    ${up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
                    {up ? "↑" : "↓"} {sub.split(" ")[0]}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight font-['DM_Mono']">{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Middle Row: Trending + Fear/Greed ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Trending */}
            <div className="lg:col-span-2 bg-[#0C1221] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-400" />
                  <span className="text-sm font-semibold text-white">Trending Today</span>
                </div>
                <span className="text-xs text-slate-500">Top gainers 24h</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {TRENDING.map((t) => (
                  <div key={t.symbol} className="flex items-center justify-between bg-white/3 rounded-xl px-4 py-3 hover:bg-white/5 transition-all cursor-pointer border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: `${t.color}20`, color: t.color }}>
                        {t.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.symbol}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-emerald-400">{t.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fear & Greed */}
            <div className="bg-[#0C1221] border border-white/5 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-amber-400" />
                <span className="text-sm font-semibold text-white">Fear & Greed Index</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Gauge */}
                <div className="relative w-36 h-20 mb-3">
                  <svg viewBox="0 0 140 80" className="w-full h-full overflow-visible">
                    {/* Track */}
                    <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="#1e293b" strokeWidth="12" strokeLinecap="round"/>
                    {/* Fill — 72/100 = green */}
                    <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none"
                      stroke="url(#greed-grad)" strokeWidth="12" strokeLinecap="round"
                      strokeDasharray="188.5" strokeDashoffset={188.5 * (1 - 0.72)}/>
                    <defs>
                      <linearGradient id="greed-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ef4444"/>
                        <stop offset="50%" stopColor="#f59e0b"/>
                        <stop offset="100%" stopColor="#34d399"/>
                      </linearGradient>
                    </defs>
                    {/* Needle */}
                    <line x1="70" y1="70" x2="70" y2="18"
                      stroke="white" strokeWidth="2" strokeLinecap="round"
                      transform="rotate(50 70 70)"/>
                    <circle cx="70" cy="70" r="5" fill="#1e293b" stroke="white" strokeWidth="1.5"/>
                  </svg>
                </div>
                <p className="text-3xl font-bold text-emerald-400 font-['DM_Mono']">72</p>
                <p className="text-sm font-semibold text-white mt-1">Greed</p>
                <p className="text-xs text-slate-500 mt-1">Previous: 68 · Neutral</p>
              </div>
              <div className="flex justify-between text-xs text-slate-600 mt-3">
                <span>Fear</span>
                <span>Neutral</span>
                <span>Greed</span>
              </div>
            </div>
          </div>

          {/* ── Coin Table ── */}
          <div className="bg-[#0C1221] border border-white/5 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
                {(["all", "favorites"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize
                      ${activeTab === tab ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    {tab === "favorites" ? "⭐ Watchlist" : "All Coins"}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500">{filtered.length} coins</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 text-xs text-slate-500 font-medium">
                    <th className="text-left px-6 py-3 w-8">#</th>
                    <th className="text-left px-3 py-3">Name</th>
                    <th className="text-right px-3 py-3 cursor-pointer hover:text-white transition-colors select-none" onClick={() => handleSort("price")}>
                      <span className="flex items-center justify-end gap-1">Price <SortIcon col="price" /></span>
                    </th>
                    <th className="text-right px-3 py-3">1h %</th>
                    <th className="text-right px-3 py-3 cursor-pointer hover:text-white transition-colors select-none" onClick={() => handleSort("change24h")}>
                      <span className="flex items-center justify-end gap-1">24h % <SortIcon col="change24h" /></span>
                    </th>
                    <th className="text-right px-3 py-3">7d %</th>
                    <th className="text-right px-3 py-3 cursor-pointer hover:text-white transition-colors select-none hidden lg:table-cell" onClick={() => handleSort("marketCap")}>
                      <span className="flex items-center justify-end gap-1">Market Cap <SortIcon col="marketCap" /></span>
                    </th>
                    <th className="text-right px-3 py-3 hidden lg:table-cell">Volume (24h)</th>
                    <th className="text-center px-3 py-3 hidden md:table-cell">7d Chart</th>
                    <th className="px-6 py-3 w-8" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((coin, idx) => {
                    const isFav = favorites.includes(coin.id);
                    const up24h = coin.change24h >= 0;
                    return (
                      <tr
                        key={coin.id}
                        className="border-b border-white/4 hover:bg-white/3 transition-all group cursor-pointer"
                        style={{ animationDelay: `${idx * 30}ms` }}
                      >
                        <td className="px-6 py-4 text-xs text-slate-500 font-['DM_Mono']">{coin.rank}</td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{ background: `${coin.color}20`, color: coin.color }}>
                              {coin.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{coin.name}</p>
                              <p className="text-xs text-slate-500 font-['DM_Mono']">{coin.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-right">
                          <span className="text-sm font-semibold text-white font-['DM_Mono']">{fmtPrice(coin.price)}</span>
                        </td>
                        <td className="px-3 py-4 text-right"><ChangeBadge val={coin.change1h} /></td>
                        <td className="px-3 py-4 text-right"><ChangeBadge val={coin.change24h} /></td>
                        <td className="px-3 py-4 text-right"><ChangeBadge val={coin.change7d} /></td>
                        <td className="px-3 py-4 text-right hidden lg:table-cell">
                          <span className="text-sm text-slate-300 font-['DM_Mono']">{fmt(coin.marketCap)}</span>
                        </td>
                        <td className="px-3 py-4 text-right hidden lg:table-cell">
                          <span className="text-sm text-slate-400 font-['DM_Mono']">{fmt(coin.volume)}</span>
                        </td>
                        <td className="px-3 py-4 hidden md:table-cell">
                          <div className="flex justify-center">
                            <Sparkline data={coin.sparkline} color={coin.color} up={up24h} />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(coin.id); }}
                            className={`transition-all ${isFav ? "text-amber-400" : "text-slate-600 hover:text-amber-400"}`}
                          >
                            <Star size={15} fill={isFav ? "currentColor" : "none"} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-6 py-16 text-center text-slate-500 text-sm">
                        No coins found matching "{search}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}