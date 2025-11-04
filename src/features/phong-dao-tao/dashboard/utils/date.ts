export const toBadge = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const inRangeInclusive = (iso: string, from?: string, to?: string) => {
  const t = new Date(iso).getTime();
  const f = from ? new Date(from).getTime() : -Infinity;
  const tt = to ? new Date(to).getTime() : Infinity;
  return t >= f && t <= tt;
};
