import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: '2024', value: 24000, label: '약 2.4만' },
  { name: '2025', value: 36000, label: '약 3.6만' },
  { name: '2026(E)', value: 7145, label: '약 0.7만' },
];

const SupplyChart: React.FC = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
          />
          <YAxis 
            hide 
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1500}>
            {data.map((entry, index) => {
                // Highlight 2026 in Red, others in standard slate/blue
                let color = '#cbd5e1'; // Default 2024
                if (entry.name === '2025') color = '#60a5fa'; // Blue for 2025
                if (entry.name === '2026(E)') color = '#ef4444'; // Red for 2026
                return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SupplyChart;