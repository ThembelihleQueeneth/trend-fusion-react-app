import { useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_7d_in_currency: number;
    sparkline_in_7d: { price: number[] };
}

interface Props {
    coins: Coin[];
}

const fmtPrice = (p: number) =>
    p < 1
        ? `$${p.toFixed(4)}`
        : `$${p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Build hourly labels for the past 7 days (168 hours)
const buildLabels = (count: number) => {
    const labels: string[] = [];
    const now = Date.now();
    const step = (7 * 24 * 60 * 60 * 1000) / (count - 1);
    for (let i = 0; i < count; i++) {
        const d = new Date(now - (count - 1 - i) * step);
        labels.push(
            d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        );
    }
    return labels;
};

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0C1221] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
                <p className="text-slate-400 mb-0.5">{label}</p>
                <p className="font-bold text-white font-mono">{fmtPrice(payload[0].value)}</p>
            </div>
        );
    }
    return null;
};

export default function CoinPriceChart({ coins }: Props) {
    const [selectedId, setSelectedId] = useState(coins[0]?.id ?? "");

    const coin = coins.find((c) => c.id === selectedId) ?? coins[0];
    if (!coin) return null;

    const prices = coin.sparkline_in_7d?.price ?? [];
    const labels = buildLabels(prices.length);

    const data = prices.map((p, i) => ({
        label: i % 24 === 0 ? labels[i] : "",       // show day label every 24 pts
        fullLabel: labels[i],
        price: p,
    }));

    const up = (coin.price_change_percentage_7d_in_currency ?? 0) >= 0;
    const color = up ? "#34d399" : "#f87171";

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const pad = (max - min) * 0.05;

    return (
        <div className="bg-[#0C1221] border border-white/5 rounded-2xl p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <img src={coin.image} className="w-8 h-8 rounded-full" alt={coin.name} />
                    <div>
                        <p className="font-bold text-sm">{coin.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{coin.symbol.toUpperCase()} · 7D</p>
                    </div>
                    <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded-lg font-semibold ${up ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
                            }`}
                    >
                        {up ? "+" : ""}{(coin.price_change_percentage_7d_in_currency ?? 0).toFixed(2)}%
                    </span>
                </div>

                {/* Coin selector */}
                <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                >
                    {coins.slice(0, 20).map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#0C1221]">
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Current price */}
            <p className="text-2xl font-bold font-mono mb-4">{fmtPrice(coin.current_price)}</p>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="cpGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 10, fill: "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        domain={[min - pad, max + pad]}
                        tick={{ fontSize: 10, fill: "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                        width={60}
                        tickFormatter={(v) => fmtPrice(v)}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: "4 4" }} />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        strokeWidth={2}
                        fill="url(#cpGrad)"
                        dot={false}
                        activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
