import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface SparklineChartProps {
    prices: number[];
    positive: boolean;
}

export default function SparklineChart({ prices, positive }: SparklineChartProps) {
    const data = prices.map((p, i) => ({ i, p }));
    const color = positive ? "#34d399" : "#f87171";

    return (
        <ResponsiveContainer width={80} height={32}>
            <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                <defs>
                    <linearGradient id={`sg-${positive}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="p"
                    stroke={color}
                    strokeWidth={1.5}
                    fill={`url(#sg-${positive})`}
                    dot={false}
                    isAnimationActive={false}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
