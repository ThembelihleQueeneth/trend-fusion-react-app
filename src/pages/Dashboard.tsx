import { useState, useEffect } from "react";
import {
  TrendingUp,
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
import { api } from "../api/coingecko";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  market_cap_rank: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: { price: number[] };
}

interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    data?: { price_change_percentage_24h?: { usd?: number } };
  };
}

interface GlobalData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { btc: number };
  active_cryptocurrencies: number;
  market_cap_change_percentage_24h_usd: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n >= 1e12 ? `$${(n / 1e12).toFixed(2)}T`
  : n >= 1e9  ? `$${(n / 1e9).toFixed(2)}B`
  : n >= 1e6  ? `$${(n / 1e6).toFixed(2)}M`
  : `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const fmtPrice = (p: number) =>
  p < 1
    ? `$${p.toFixed(4)}`
    : `$${p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ChangeBadge = ({ val }: { val: number | null | undefined }) => {
  const v = val ?? 0;
  const up = v >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md
      ${up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
      {up ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      {Math.abs(v).toFixed(2)}%
    </span>
  );
};

const Sparkline = ({ data, up }: { data: number[]; up: boolean }) => {
  if (!data || data.length < 2) return <span className="text-slate-600 text-xs">—</span>;
  // Downsample to ~40 points for perf
  const step = Math.ceil(data.length / 40);
  const pts2 = data.filter((_, i) => i % step === 0);
  const min = Math.min(...pts2);
  const max = Math.max(...pts2);
  const range = max - min || 1;
  const w = 80, h = 32;
  const coords = pts2.map((v, i) => {
    const x = (i / (pts2.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 2) - 1;
    return `${x},${y}`;
  });
  const polyPts = coords.join(" ");
  const fillPts = `${polyPts} ${w},${h} 0,${h}`;
  const gradId = `sg-${up ? "u" : "d"}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={up ? "#34d399" : "#f87171"} stopOpacity="0.25" />
          <stop offset="100%" stopColor={up ? "#34d399" : "#f87171"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#${gradId})`} />
      <polyline points={polyPts} fill="none" stroke={up ? "#34d399" : "#f87171"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const SkeletonRow = () => (
  <tr className="border-b border-white/4">
    {Array.from({ length: 10 }).map((_, i) => (
      <td key={i} className="px-3 py-4">
        <div className="h-4 rounded bg-white/5 animate-pulse" style={{ width: `${40 + (i * 13) % 40}%` }} />
      </td>
    ))}
  </tr>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["bitcoin", "ethereum"]);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [sortBy, setSortBy] = useState<
    "market_cap_rank" | "current_price" | "price_change_percentage_24h_in_currency" | "market_cap"
  >("market_cap_rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [coins, setCoins] = useState<Coin[]>([]);
  const [trending, setTrending] = useState<TrendingCoin[]>([]);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [coinsRes, trendingRes, statsRes] = await Promise.all([
          api.get("/coins/markets", {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 50,
              page: 1,
              sparkline: true,
              price_change_percentage: "1h,24h,7d",
            },
          }),
          api.get("/search/trending"),
          api.get("/global"),
        ]);

        setCoins(coinsRes.data);
        setTrending(trendingRes.data.coins.slice(0, 4));
        setGlobalData(statsRes.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load market data. Check your API config and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (id: string) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const handleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const filtered = coins
    .filter(c => activeTab === "favorites" ? favorites.includes(c.id) : true)
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      return ((a[sortBy] ?? 0) - (b[sortBy] ?? 0)) * mult;
    });

  const SortIcon = ({ col }: { col: typeof sortBy }) =>
    sortBy === col
      ? sortDir === "asc"
        ? <ChevronUp size={12} className="text-emerald-400" />
        : <ChevronDown size={12} className="text-emerald-400" />
      : <ChevronUp size={12} className="text-slate-600" />;

  const statsCards = globalData ? [
    {
      label: "Market Cap",
      value: fmt(globalData.total_market_cap.usd),
      badge: `${globalData.market_cap_change_percentage_24h_usd >= 0 ? "+" : ""}${globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%`,
      icon: Globe,
      up: globalData.market_cap_change_percentage_24h_usd >= 0,
    },
    {
      label: "24h Volume",
      value: fmt(globalData.total_volume.usd),
      badge: "Rolling 24h",
      icon: Activity,
      up: true,
    },
    {
      label: "BTC Dominance",
      value: `${globalData.market_cap_percentage.btc.toFixed(1)}%`,
      badge: "Of total mkt",
      icon: DollarSign,
      up: globalData.market_cap_percentage.btc > 50,
    },
    {
      label: "Active Coins",
      value: globalData.active_cryptocurrencies.toLocaleString(),
      badge: "Tracked",
      icon: Layers,
      up: true,
    },
  ] : [];

  return (
    <div className="min-h-screen bg-[#070B14] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>

      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 h-full w-16 bg-[#0C1221] border-r border-white/5 flex flex-col items-center py-6 gap-6 z-40">
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
          <button key={label} title={label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
              ${active
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"}`}>
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
            <p className="text-xs text-slate-500 mt-0.5">
              {loading ? "Fetching live data…" : "Live · auto-refreshes every 60s"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search coins…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all w-52"
              />
            </div>
            <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all relative">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-black">
              DM
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-6 space-y-6">

          {/* Error banner */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
              ⚠️ {error}
            </div>
          )}

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-[#0C1221] border border-white/5 rounded-2xl p-5 animate-pulse">
                    <div className="h-9 w-9 rounded-xl bg-white/5 mb-3" />
                    <div className="h-7 w-24 rounded bg-white/5 mb-2" />
                    <div className="h-3 w-16 rounded bg-white/5" />
                  </div>
                ))
              : statsCards.map(({ label, value, badge, icon: Icon, up }) => (
                  <div key={label} className="bg-[#0C1221] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                        ${up ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}>
                        <Icon size={17} />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg
                        ${up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
                        {badge}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'DM Mono', monospace" }}>{value}</p>
                    <p className="text-xs text-slate-500 mt-1">{label}</p>
                  </div>
                ))
            }
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
                <span className="text-xs text-slate-500">CoinGecko trending</span>
              </div>
              {loading ? (
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {trending.map((t) => {
                    const change = t.item.data?.price_change_percentage_24h?.usd;
                    const isUp = (change ?? 0) >= 0;
                    return (
                      <div key={t.item.id}
                        className="flex items-center justify-between bg-white/3 rounded-xl px-4 py-3 hover:bg-white/5 transition-all cursor-pointer border border-white/5">
                        <div className="flex items-center gap-3">
                          <img src={t.item.thumb} alt={t.item.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="text-sm font-medium text-white">{t.item.name}</p>
                            <p className="text-xs text-slate-500 uppercase">{t.item.symbol}</p>
                          </div>
                        </div>
                        {change != null && (
                          <span className={`text-sm font-semibold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                            {isUp ? "+" : ""}{change.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Fear & Greed */}
            <div className="bg-[#0C1221] border border-white/5 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-amber-400" />
                <span className="text-sm font-semibold text-white">Fear & Greed Index</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-36 h-20 mb-3">
                  <svg viewBox="0 0 140 80" className="w-full h-full overflow-visible">
                    <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="greed-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none"
                      stroke="url(#greed-grad)" strokeWidth="12" strokeLinecap="round"
                      strokeDasharray="188.5" strokeDashoffset={188.5 * (1 - 0.72)} />
                    <line x1="70" y1="70" x2="70" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" transform="rotate(50 70 70)" />
                    <circle cx="70" cy="70" r="5" fill="#1e293b" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-emerald-400" style={{ fontFamily: "'DM Mono', monospace" }}>72</p>
                <p className="text-sm font-semibold text-white mt-1">Greed</p>
                <p className="text-xs text-slate-500 mt-1">Previous: 68 · Neutral</p>
              </div>
              <div className="flex justify-between text-xs text-slate-600 mt-3">
                <span>Fear</span><span>Neutral</span><span>Greed</span>
              </div>
            </div>
          </div>

          {/* ── Coin Table ── */}
          <div className="bg-[#0C1221] border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
                {(["all", "favorites"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all
                      ${activeTab === tab
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "text-slate-500 hover:text-slate-300"}`}>
                    {tab === "favorites" ? "⭐ Watchlist" : "All Coins"}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500">{loading ? "…" : `${filtered.length} coins`}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 text-xs text-slate-500 font-medium">
                    <th className="text-left px-6 py-3 w-8">#</th>
                    <th className="text-left px-3 py-3">Name</th>
                    <th className="text-right px-3 py-3 cursor-pointer hover:text-white transition-colors select-none"
                      onClick={() => handleSort("current_price")}>
                      <span className="flex items-center justify-end gap-1">Price <SortIcon col="current_price" /></span>
                    </th>
                    <th className="text-right px-3 py-3">1h %</th>
                    <th className="text-right px-3 py-3 cursor-pointer hover:text-white transition-colors select-none"
                      onClick={() => handleSort("price_change_percentage_24h_in_currency")}>
                      <span className="flex items-center justify-end gap-1">24h % <SortIcon col="price_change_percentage_24h_in_currency" /></span>
                    </th>
                    <th className="text-right px-3 py-3">7d %</th>
                    <th className="text-right px-3 py-3 cursor-pointer hover:text-white transition-colors select-none hidden lg:table-cell"
                      onClick={() => handleSort("market_cap")}>
                      <span className="flex items-center justify-end gap-1">Market Cap <SortIcon col="market_cap" /></span>
                    </th>
                    <th className="text-right px-3 py-3 hidden lg:table-cell">Volume (24h)</th>
                    <th className="text-center px-3 py-3 hidden md:table-cell">7d Chart</th>
                    <th className="px-6 py-3 w-8" />
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                    : filtered.map((coin, idx) => {
                        const isFav = favorites.includes(coin.id);
                        const up24h = (coin.price_change_percentage_24h_in_currency ?? 0) >= 0;
                        const sparkData = coin.sparkline_in_7d?.price ?? [];
                        return (
                          <tr key={coin.id}
                            className="border-b border-white/4 hover:bg-white/3 transition-all cursor-pointer"
                            style={{ animationDelay: `${idx * 20}ms` }}>
                            <td className="px-6 py-4 text-xs text-slate-500" style={{ fontFamily: "'DM Mono', monospace" }}>
                              {coin.market_cap_rank}
                            </td>
                            <td className="px-3 py-4">
                              <div className="flex items-center gap-3">
                                <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-white">{coin.name}</p>
                                  <p className="text-xs text-slate-500 uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>{coin.symbol}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-4 text-right">
                              <span className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
                                {fmtPrice(coin.current_price)}
                              </span>
                            </td>
                            <td className="px-3 py-4 text-right">
                              <ChangeBadge val={coin.price_change_percentage_1h_in_currency} />
                            </td>
                            <td className="px-3 py-4 text-right">
                              <ChangeBadge val={coin.price_change_percentage_24h_in_currency} />
                            </td>
                            <td className="px-3 py-4 text-right">
                              <ChangeBadge val={coin.price_change_percentage_7d_in_currency} />
                            </td>
                            <td className="px-3 py-4 text-right hidden lg:table-cell">
                              <span className="text-sm text-slate-300" style={{ fontFamily: "'DM Mono', monospace" }}>
                                {fmt(coin.market_cap)}
                              </span>
                            </td>
                            <td className="px-3 py-4 text-right hidden lg:table-cell">
                              <span className="text-sm text-slate-400" style={{ fontFamily: "'DM Mono', monospace" }}>
                                {fmt(coin.total_volume)}
                              </span>
                            </td>
                            <td className="px-3 py-4 hidden md:table-cell">
                              <div className="flex justify-center">
                                <Sparkline data={sparkData} up={up24h} />
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(coin.id); }}
                                className={`transition-all ${isFav ? "text-amber-400" : "text-slate-600 hover:text-amber-400"}`}>
                                <Star size={15} fill={isFav ? "currentColor" : "none"} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  }
                  {!loading && filtered.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-6 py-16 text-center text-slate-500 text-sm">
                        {activeTab === "favorites"
                          ? "No watchlisted coins yet. Star some coins to add them."
                          : `No coins found matching "${search}"`}
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