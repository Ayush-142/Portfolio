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
  const color = labelClassName ?? "text-muted";

  return (
    <section className="relative mt-10 border-t border-rule pt-6 first:mt-0 first:border-t-0 first:pt-0">
      <h2
        className={`label mb-3 ${color} lg:absolute lg:top-0 lg:right-full lg:mb-0 lg:w-32 lg:pr-8 lg:text-right`}
      >
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}
