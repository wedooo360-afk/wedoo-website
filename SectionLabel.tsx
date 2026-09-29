/** Small editorial marker, e.g. "(02) Selected work". */
export default function SectionLabel({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`t-label flex gap-3 ${className}`}>
      {index && <span className="tnum t-muted">({index})</span>}
      <span>{children}</span>
    </p>
  );
}
