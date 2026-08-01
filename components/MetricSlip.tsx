type MetricSlipProps = {
  label: string;
  value: string;
  unit?: string;
};

export default function MetricSlip({ label, value, unit }: MetricSlipProps) {
  return (
    <div className="rounded-[10px] border border-rule bg-paper px-4 py-3">
      <div className="label text-muted">{label}</div>
      <div className="data text-2xl text-ink">
        <span className="text-accept">{value}</span>
        {unit ? <span> {unit}</span> : null}
      </div>
    </div>
  );
}
