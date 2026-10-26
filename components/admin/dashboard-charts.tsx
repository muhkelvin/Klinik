'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#C85A32', '#2A4A3E', '#D9A443', '#6B7280'];

interface ChartsProps {
  weeklyTrends: { week: string; bookings: number; selesai: number }[];
  sourceBreakdown: { name: string; value: number }[];
}

export function DashboardCharts({ weeklyTrends, sourceBreakdown }: ChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 4-Week Trend */}
      <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs">
        <div className="mb-4">
          <h3 className="font-serif text-base font-semibold text-[#202522]">
            Tren Kunjungan & Booking (4 Minggu Terakhir)
          </h3>
          <p className="text-xs text-[#6F7A72]">
            Perbandingan total permintaan booking dan kunjungan yang telah selesai.
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEBE1" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6F7A72' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6F7A72' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E3DDD1',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="bookings" name="Total Booking" fill="#E2DDD2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="selesai" name="Kunjungan Selesai" fill="#C85A32" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Booking Sources */}
      <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-base font-semibold text-[#202522]">
            Sumber Booking
          </h3>
          <p className="text-xs text-[#6F7A72] mb-4">
            Distribusi asal pengunjung yang mengajukan janji temu.
          </p>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sourceBreakdown}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={4}
              >
                {sourceBreakdown.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E3DDD1',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
