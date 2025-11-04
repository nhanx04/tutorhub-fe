
import { MainLayout } from 'src/layouts';

import { useMemo, useState } from 'react';
import DateRangeFilter, { type DateRange } from './components/DateRangeFilter';
import SalesChart from './components/SalesChart';
import StatsTable from './components/StatsTable';

import { salesData } from './mock-data/sales';
import { facultyStats, topicStats } from './mock-data/stats';
import { inRangeInclusive, toBadge } from './utils/date';

export const PDTDashboardPage = () => {
  const [range, setRange] = useState<DateRange>({
    from: '2025-01-01',
    to: '2025-12-31',
  });

  const filteredFaculty = useMemo(
    () => facultyStats.filter((r) => inRangeInclusive(r.date, range.from, range.to)),
    [range],
  );
  const filteredTopic = useMemo(
    () => topicStats.filter((r) => inRangeInclusive(r.date, range.from, range.to)),
    [range],
  );

  const filteredSales = useMemo(() => salesData, [range]);

  const badge = `${toBadge(range.from)} - ${toBadge(range.to)}`;

  return (
    <MainLayout>
      <div className="p-6">
        {/* Filter */}
        <div className="mb-4">
          <DateRangeFilter initial={range} onApply={(r) => setRange(r)} />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <SalesChart title="My sales" data={filteredSales} />
          <SalesChart title="My sales" data={filteredSales} />
        </div>

        {/* Tables (đã lọc) */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <StatsTable title="Faculty Statistic" dateBadge={badge} rows={filteredFaculty} />
          <StatsTable title="Topic Statistic" dateBadge={badge} rows={filteredTopic} />
        </div>
      </div>
    </MainLayout>
  );
};
