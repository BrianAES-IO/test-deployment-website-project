export type FaqItem = { question: string; answer: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-b border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-t border-line py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-body text-base font-semibold text-ink marker:content-none">
            {item.question}
            <span className="mt-1 shrink-0 text-brand transition-transform duration-200 ease-brand group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-base text-ink-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
