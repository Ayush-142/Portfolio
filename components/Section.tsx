type SectionProps = {
  label: string;
  labelClassName?: string;
  children: React.ReactNode;
};

export default function Section({
  label,
  labelClassName,
  children,
}: SectionProps) {
  return (
    <section className="relative mt-10 border-t border-rule pt-6 first:mt-0 first:border-t-0 first:pt-0">
      <div
        className={`label mb-3 text-muted lg:absolute lg:top-0 lg:right-full lg:mb-0 lg:w-32 lg:pr-8 lg:text-right ${labelClassName ?? ""}`}
      >
        {label}
      </div>
      <div>{children}</div>
    </section>
  );
}
