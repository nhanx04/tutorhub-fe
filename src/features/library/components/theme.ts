export type Variant = "blue" | "green" | "purple" | "amber" | "rose" | "teal";

export const VARIANTS: Variant[] = ["blue", "green", "purple", "amber", "rose", "teal"];

export const THEMES: Record<
  Variant,
  { cardBg: string; cardBorder: string; iconText: string; button: string; buttonHover: string }
> = {
  blue:   { cardBg: "bg-blue-50",   cardBorder: "border-blue-200",  iconText: "text-blue-600",   button: "bg-blue-600",  buttonHover: "hover:bg-blue-700" },
  green:  { cardBg: "bg-green-50",  cardBorder: "border-green-200", iconText: "text-green-600",  button: "bg-green-600", buttonHover: "hover:bg-green-700" },
  purple: { cardBg: "bg-purple-50", cardBorder: "border-purple-200",iconText: "text-purple-600", button: "bg-purple-600",buttonHover: "hover:bg-purple-700" },
  amber:  { cardBg: "bg-amber-50",  cardBorder: "border-amber-200", iconText: "text-amber-600",  button: "bg-amber-600", buttonHover: "hover:bg-amber-700" },
  rose:   { cardBg: "bg-rose-50",   cardBorder: "border-rose-200",  iconText: "text-rose-600",   button: "bg-rose-600",  buttonHover: "hover:bg-rose-700" },
  teal:   { cardBg: "bg-teal-50",   cardBorder: "border-teal-200",  iconText: "text-teal-600",   button: "bg-teal-600",  buttonHover: "hover:bg-teal-700" },
};

export function getVariantForBook(book: any): Variant {
  if (book?.color && (VARIANTS as string[]).includes(book.color)) return book.color;
  const key = String(book?.id ?? book?.title ?? "");
  let sum = 0;
  for (let i = 0; i < key.length; i++) sum = (sum + key.charCodeAt(i)) % 997;
  return VARIANTS[sum % VARIANTS.length];
}
