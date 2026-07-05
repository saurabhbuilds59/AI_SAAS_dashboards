import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function UsageChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="signalFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6C5CE0" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#6C5CE0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.08} vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8B93A7' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#8B93A7' }} axisLine={false} tickLine={false} width={40} />
        <Tooltip
          contentStyle={{ background: '#151822', border: '1px solid #232838', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#EDEFF5' }}
        />
        <Area type="monotone" dataKey="requests" stroke="#6C5CE0" strokeWidth={2} fill="url(#signalFill)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
