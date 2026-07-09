import Link from "next/link";
import { ComponentType, ReactNode, SVGProps } from "react";

export function LedgerLabel({ children }: { children: ReactNode }) {
  return (
    <span className="block font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
      {children}
    </span>
  );
}

export function Ledger({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border-b border-line ${className}`}>{children}</div>;
}

export function LedgerRow({
  index,
  children,
  className = "",
}: {
  index?: string | number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex gap-6 border-t border-line py-6 first:border-t-0 ${className}`}>
      {index !== undefined && (
        <span className="shrink-0 pt-0.5 font-mono text-sm text-brand">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}

/** An interactive ledger row that links to a page, with an arrow that
 * shifts on hover, used for the full-practice list and services overview. */
export function LedgerLinkRow({
  index,
  href,
  label,
  description,
  icon: Icon,
}: {
  index?: string | number;
  href: string;
  label: string;
  description: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-6 border-t border-line py-6 first:border-t-0"
    >
      {Icon && (
        <span className="hidden shrink-0 items-center justify-center text-ink-muted transition-colors duration-200 ease-brand group-hover:text-brand sm:flex">
          <Icon className="h-6 w-6" />
        </span>
      )}
      {index !== undefined && (
        <span className="shrink-0 font-mono text-sm text-brand">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      )}
      <div className="flex-1">
        <LedgerLabel>{label}</LedgerLabel>
        <p className="mt-1 text-base text-ink">{description}</p>
      </div>
      <span
        aria-hidden="true"
        className="shrink-0 text-brand transition-transform duration-200 ease-brand group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}

export function LedgerPrice({ price, detail }: { price: string; detail: string }) {
  return (
    <p className="font-mono text-xl text-ink">
      {price}
      <span className="ml-2 text-sm font-normal text-ink-muted">{detail}</span>
    </p>
  );
}
