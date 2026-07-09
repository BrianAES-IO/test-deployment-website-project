import Link from "next/link";
import type { Service } from "@/config/offers";
import { LedgerLabel, LedgerPrice } from "./Ledger";

export function OfferCard({ offer, index }: { offer: Service; index: number }) {
  const Icon = offer.icon;
  return (
    <Link
      href={offer.href}
      className="group flex flex-col border border-line bg-white/40 p-8 transition-colors duration-200 ease-brand hover:border-brand"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-brand">{String(index).padStart(2, "0")}</span>
        <Icon className="h-7 w-7 text-ink-muted transition-colors duration-200 ease-brand group-hover:text-brand" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{offer.name}</h3>
      <LedgerLabel>{offer.tagline}</LedgerLabel>
      <p className="mt-4 flex-1 text-base text-ink-muted">{offer.promise}</p>
      <div className="mt-6 border-t border-line pt-4">
        <LedgerPrice price={offer.price} detail={offer.priceDetail} />
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          View {offer.name}
          <span className="transition-transform duration-200 ease-brand group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
