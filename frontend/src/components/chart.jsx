import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
export function SpendingChart({ className }) {
  const spendingData = [
    { month: "Jul", spending: 120 },
    { month: "Aug", spending: 145 },
    { month: "Sep", spending: 132 },
    { month: "Oct", spending: 158 },
    { month: "Nov", spending: 165 },
    { month: "Dec", spending: 172 },
  ];
  return (
    <div
      className={`${className} flex items-baseline flex-col border border-border gap-2 p-4 rounded-2xl`}
    >
      <h3 className="text-2xl font-bold">Monthly Spending</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={spendingData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="month"
            stroke="var(--color-muted-foreground)"
            tick={{ fill: "var(--color-muted-foreground)" }}
          />
          <YAxis dataKey={"spending"} />
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

export function CategoryPie({ className }) {
  const categoriesData = [
    { name: "Streaming", value: 320 },
    { name: "Productivity", value: 180 },
    { name: "Storage", value: 140 },
    { name: "Education", value: 200 },
    { name: "Gaming", value: 160 },
  ];
  const colors = ["#4973fb", "#5d81fb", "#7190fc", "#87a0fd", "#9cb0fe"];
  return (
    <div
      className={`${className}  border border-border gap-2 p-4 items-baseline rounded-2xl flex flex-col`}
    >
      <h3 className="text-2xl font-bold">Spending by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoriesData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="75%"
            innerRadius="40%"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {categoriesData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-foreground)",
              color: "var(--color-background)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
