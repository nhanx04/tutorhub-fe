import type { StatRow } from '../mock-data/stats';

type Props = {
  title: string;
  dateBadge?: string; // e.g., "01/01/2025 - 31/12/2025"
  rows: StatRow[];
};

export default function StatsTable({ title, dateBadge, rows }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-indigo-600 text-xs font-bold text-white">∎</span>
          <h4 className="text-sm font-semibold">{title}</h4>
        </div>
        {dateBadge && (
          <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
            {dateBadge}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Faculty</th>
              <th className="px-4 py-2">Tutor</th>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Group</th>
              <th className="px-4 py-2">Consultation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.id} className={idx % 2 ? 'bg-white' : 'bg-gray-50/60'}>
                <td className="px-4 py-2">{r.id}</td>
                <td className="px-4 py-2">{r.faculty}</td>
                <td className="px-4 py-2">{r.tutor ?? ''}</td>
                <td className="px-4 py-2">{r.student ?? ''}</td>
                <td className="px-4 py-2">{r.group ?? ''}</td>
                <td className="px-4 py-2">{r.consultation ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
