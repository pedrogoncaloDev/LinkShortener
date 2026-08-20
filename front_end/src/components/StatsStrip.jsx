const STATS = [
  { num: '128M+', lbl: 'links encurtados' },
  { num: '99.98%', lbl: 'uptime nos últimos 12 meses' },
  { num: '<50ms', lbl: 'tempo de redirecionamento' },
  { num: '40k+', lbl: 'pessoas usando' },
]

export default function StatsStrip() {
  return (
    <div className="stats">
      {STATS.map((s) => (
        <div className="stat" key={s.lbl}>
          <div className="num">{s.num}</div>
          <div className="lbl">{s.lbl}</div>
        </div>
      ))}
    </div>
  )
}
