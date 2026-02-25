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
import { api } from "../api/coingecko"; // Ensure this axios instance is configured
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
    market_cap_rank: number;
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
    <span className={`inline-flex items-center gap-0.5 text-[10px] md:text-xs font-semibold px-1.5 py-0.5 rounded-md
      ${up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
      {up ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      {Math.abs(v).toFixed(2)}%
    </span>
  );
};

const Sparkline = ({ data, up }: { data: number[]; up: boolean }) => {
  if (!data || data.length < 2) return <span className="text-slate-600 text-xs">—</span>;
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
    {Array.from({ length: 5 }).map((_, i) => (
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

  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) navigate("/");
      else setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coinsRes, trendingRes, statsRes] = await Promise.all([
          api.get("/coins/markets", {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 50,
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
        setError("API rate limit reached or network error.");
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
    sortBy === col ? (
      sortDir === "asc" ? <ChevronUp size={12} className="text-emerald-400" /> : <ChevronDown size={12} className="text-emerald-400" />
    ) : <ChevronUp size={12} className="text-slate-600" />;

  const statsCards = globalData ? [
    { label: "Market Cap", value: fmt(globalData.total_market_cap.usd), badge: `${globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%`, icon: Globe, up: globalData.market_cap_change_percentage_24h_usd >= 0 },
    { label: "24h Volume", value: fmt(globalData.total_volume.usd), badge: "Live", icon: Activity, up: true },
    { label: "BTC Dominance", value: `${globalData.market_cap_percentage.btc.toFixed(1)}%`, badge: "High", icon: DollarSign, up: true },
    { label: "Active Coins", value: globalData.active_cryptocurrencies.toLocaleString(), badge: "Verified", icon: Layers, up: true },
  ] : [];

  if (authLoading) return <div className="min-h-screen bg-[#070B14] flex items-center justify-center text-emerald-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#070B14] text-white pb-20 md:pb-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>

      {/* ── Sidebar/Bottom Nav ── */}
      <aside className="fixed bottom-0 md:top-0 left-0 z-50 w-full md:w-16 h-16 md:h-full bg-[#0C1221] border-t md:border-t-0 md:border-r border-white/5 flex flex-row md:flex-col items-center justify-around md:justify-start py-0 md:py-6 gap-0 md:gap-6">
        <div className="hidden md:flex h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 items-center justify-center mb-4">
          <Zap size={18} className="text-emerald-400" />
        </div>
        {[
          { icon: BarChart2, label: "Home", active: true },
          { icon: TrendingUp, label: "Trending" },
          { icon: Star, label: "List" },
          { icon: Globe, label: "Data" },
        ].map(({ icon: Icon, active }) => (
          <button key={Math.random()} className={`p-3 rounded-xl transition-all ${active ? "bg-emerald-500/10 text-emerald-400" : "text-slate-500 hover:text-slate-200"}`}>
            <Icon size={20} />
          </button>
        ))}
        <div className="md:mt-auto flex flex-row md:flex-col gap-4">
          <button onClick={handleLogout} className="p-3 text-slate-500 hover:text-red-400"><LogOut size={20} /></button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="md:ml-16 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h1 className="text-lg font-bold">Market</h1>
            <div className="sm:hidden w-8 h-8 rounded-full bg-emerald-500/20" />
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 bg-white/5 rounded-2xl animate-pulse" />)
              : statsCards.map(({ label, value, badge, icon: Icon, up }) => (
                <div key={label} className="bg-[#0C1221] border border-white/5 rounded-2xl p-5">
                  <div className="flex justify-between mb-4">
                    <Icon size={18} className={up ? "text-emerald-400" : "text-red-400"} />
                    <span className={`text-[10px] px-2 py-0.5 rounded ${up ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}>{badge}</span>
                  </div>
                  <p className="text-xl font-bold font-mono">{value}</p>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter">{label}</p>
                </div>
              ))}
          </div>

          {/* Trending + Chart Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#0C1221] border border-white/5 rounded-2xl p-6">
              <h3 className="text-sm font-semibold mb-4">Trending Today</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trending.map(t => (
                  <div key={t.item.id} className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <img src={t.item.thumb} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm font-bold truncate w-24">{t.item.name}</p>
                        <p className="text-[10px] text-slate-500">#{t.item.market_cap_rank}</p>
                      </div>
                    </div>
                    <Star size={14} className="text-slate-700" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#0C1221] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
               <Activity className="text-amber-500 mb-2" />
               <p className="text-3xl font-bold text-emerald-400 font-mono">72</p>
               <p className="text-xs font-semibold uppercase text-slate-400">Greed Index</p>
               <div className="w-full bg-white/5 h-1.5 rounded-full mt-6"><div className="bg-emerald-500 h-full rounded-full w-[72%]" /></div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#0C1221] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/5 flex gap-2">
              <button onClick={() => setActiveTab("all")} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${activeTab === "all" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-500"}`}>All</button>
              <button onClick={() => setActiveTab("favorites")} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${activeTab === "favorites" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-500"}`}>Watchlist</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] uppercase text-slate-500 border-b border-white/5">
                    <th className="px-6 py-4 text-left w-12">#</th>
                    <th className="px-3 py-4 text-left">Asset</th>
                    <th className="px-3 py-4 text-right">Price</th>
                    <th className="px-3 py-4 text-right">24h</th>
                    <th className="px-3 py-4 text-right hidden md:table-cell">Market Cap</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/4">
                  {loading ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                    : filtered.map(coin => (
                      <tr key={coin.id} className="hover:bg-white/3 transition-colors">
                        <td className="px-6 py-5 text-[10px] font-mono text-slate-500">{coin.market_cap_rank}</td>
                        <td className="px-3 py-5">
                          <div className="flex items-center gap-3">
                            <img src={coin.image} className="w-7 h-7" />
                            <div className="min-w-0">
                              <p className="text-sm font-bold truncate w-20 sm:w-auto">{coin.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{coin.symbol.toUpperCase()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-5 text-right font-mono text-sm">{fmtPrice(coin.current_price)}</td>
                        <td className="px-3 py-5 text-right"><ChangeBadge val={coin.price_change_percentage_24h_in_currency} /></td>
                        <td className="px-3 py-5 text-right hidden md:table-cell font-mono text-xs text-slate-400">{fmt(coin.market_cap)}</td>
                        <td className="px-6 py-5 text-right">
                          <button onClick={() => toggleFavorite(coin.id)} className={favorites.includes(coin.id) ? "text-amber-400" : "text-slate-700"}><Star size={14} fill={favorites.includes(coin.id) ? "currentColor" : "none"} /></button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}