import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", phq9: 12, gad7: 10, ghq12: 6 },
  { month: "Feb", phq9: 10, gad7: 8, ghq12: 5 },
  { month: "Mar", phq9: 9, gad7: 7, ghq12: 4 },
  { month: "Apr", phq9: 8, gad7: 6, ghq12: 3 },
  { month: "May", phq9: 7, gad7: 5, ghq12: 3 },
  { month: "Jun", phq9: 8, gad7: 5, ghq12: 3 },
];

export function ProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="month" 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="phq9" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          name="PHQ-9"
          dot={{ fill: "hsl(var(--primary))" }}
        />
        <Line 
          type="monotone" 
          dataKey="gad7" 
          stroke="hsl(var(--success))" 
          strokeWidth={2}
          name="GAD-7"
          dot={{ fill: "hsl(var(--success))" }}
        />
        <Line 
          type="monotone" 
          dataKey="ghq12" 
          stroke="hsl(var(--purple))" 
          strokeWidth={2}
          name="GHQ-12"
          dot={{ fill: "hsl(var(--purple))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
