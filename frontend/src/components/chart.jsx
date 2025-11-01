import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
export function SpendingChart({ className }) {
  const data = [
    { month: "Jul", spending: 120 },
    { month: "Aug", spending: 145 },
    { month: "Sep", spending: 132 },
    { month: "Oct", spending: 158 },
    { month: "Nov", spending: 165 },
    { month: "Dec", spending: 172 },
  ];
  return (
    <div
      className={`${className} flex items-baseline flex-col border border-border gap-2 p-4 rounded-2xl mt-2`}
    >
      <h3 className="text-2xl font-bold">Monthly Spending</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="month"
            stroke="var(--color-muted-foreground)"
            tick={{ fill: "var(--color-muted-foreground)" }}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-background)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.5rem",
              color: "var(--color-foreground)",
            }}
          />
          <Legend />
          <Bar
            type="monotone"
            dataKey="spending"
            fill="var(--color-primary)"
            strokeWidth={3}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
