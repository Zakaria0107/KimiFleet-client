import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock Data for the chart
const data = [
  { name: 'Mon', utilization: 65, revenue: 2400 },
  { name: 'Tue', utilization: 72, revenue: 3800 },
  { name: 'Wed', utilization: 68, revenue: 3200 },
  { name: 'Thu', utilization: 85, revenue: 4900 },
  { name: 'Fri', utilization: 94, revenue: 5800 },
  { name: 'Sat', utilization: 98, revenue: 6200 },
  { name: 'Sun', utilization: 91, revenue: 5400 },
];

// Loaded lazily and client-only from AnalyticsSection: Recharts measures the DOM.
const AnalyticsChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
      <Tooltip
        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
      />
      <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
    </AreaChart>
  </ResponsiveContainer>
);

export default AnalyticsChart;
