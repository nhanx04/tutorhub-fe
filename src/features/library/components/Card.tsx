import React from "react";
import { THEMES, type Variant } from "./theme";

type Props = React.PropsWithChildren<{
  className?: string;
  variant?: Variant;     
  tinted?: boolean;      
}>;

export default function Card({ className = "", children, variant, tinted = false }: Props) {
  const base = "rounded-xl p-6 shadow-sm border";
  if (!variant || !tinted) {
    return <div className={`${base} border-gray-200 bg-white ${className}`}>{children}</div>;
  }
  const t = THEMES[variant];
  return <div className={`${base} ${t.cardBorder} ${t.cardBg} ${className}`}>{children}</div>;
}
