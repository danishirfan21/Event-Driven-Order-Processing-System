export function Panel({ children, className = "" }) {
  return (
    <section className={`rounded-md border border-slate-700/55 bg-[#081827]/75 ${className}`}>
      {children}
    </section>
  );
}
