import { useState } from 'react';

export type DateRange = { from?: string; to?: string };

type Props = {
  initial?: DateRange;
  onApply?: (range: DateRange) => void;
};

export default function DateRangeFilter({ initial, onApply }: Props) {
  const [from, setFrom] = useState(initial?.from ?? '');
  const [to, setTo] = useState(initial?.to ?? '');

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="h-9 rounded border border-gray-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="h-9 rounded border border-gray-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={() => onApply?.({ from, to })}
        className="h-9 rounded bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
}
