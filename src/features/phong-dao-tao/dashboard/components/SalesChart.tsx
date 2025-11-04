import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';
import type { SalesPoint } from '../mock-data/sales';

type Props = {
  title?: string;
  data: SalesPoint[];
};

export default function SalesChart({ title = 'My sales', data }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-center text-base font-semibold">{title}</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 90, left: 70, bottom: 30 }}
          >
            <CartesianGrid stroke="#e5e7eb" vertical={false} />

            <XAxis dataKey="month" tick={{ fill: '#374151' }} tickMargin={8} />

            <YAxis
              yAxisId="left"
              width={64}
              ticks={[0, 40, 80, 120, 160]}
              domain={[0, 160]}
              tick={{ fill: '#374151' }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            >
              <Label
                value="Units Sold"
                angle={-90}
                position="left"
                offset={18}
                style={{ fill: '#111827', fontWeight: 600 }}
              />
            </YAxis>

            <YAxis
              yAxisId="right"
              orientation="right"
              width={88}
              ticks={[0, 2000, 4000, 6000, 8000]}
              domain={[0, 8000]}
              tickMargin={8}
              tick={{ fill: '#374151' }}
              tickFormatter={(v) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(v as number)
              }
            >
              <Label
                value="Total Transactions"
                angle={90}
                position="right"
                offset={18}
                style={{ fill: '#111827', fontWeight: 600 }}
              />
            </YAxis>

            <Tooltip
              contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb' }}
              labelStyle={{ color: '#111827', fontWeight: 600 }}
              formatter={(value: any, name) =>
                name === 'totalUSD'
                  ? new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(value)
                  : value
              }
            />

            <Legend verticalAlign="bottom" align="center" height={24} />

            <Bar
              yAxisId="left"
              dataKey="units"
              name="Units Sold"
              fill="#0070C0"
              barSize={36}
              radius={[4, 4, 0, 0]}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalUSD"
              name="Total Transaction"
              stroke="#ED7D31"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
