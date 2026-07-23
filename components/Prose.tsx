type ProseProps = {
  children: React.ReactNode;
};

export default function Prose({ children }: ProseProps) {
  return <div className="text-ink">{children}</div>;
}
