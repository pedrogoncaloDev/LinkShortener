const FEATURES = [
  {
    title: 'QR Code automático',
    desc: 'Todo link curto já sai com um QR Code pronto pra baixar e imprimir.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h3v3h-3zM19 14v3M14 19h3" />
      </svg>
    ),
  },
  {
    title: 'Analytics em tempo real',
    desc: 'Veja cliques, origem e dispositivo de quem acessou cada link.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M18 9l-5 5-3-3-4 4" />
      </svg>
    ),
  },
  {
    title: 'Alias personalizado',
    desc: 'Troque o código aleatório por algo que faça sentido pra sua marca.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 20h4L18.5 9.5a2.121 2.121 0 0 0-3-3L5 17v3z" />
      </svg>
    ),
  },
  {
    title: 'Expiração programável',
    desc: 'Links de campanha que se desativam sozinhos na data que você escolher.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: 'API para desenvolvedores',
    desc: 'Integre o encurtamento direto no seu fluxo, sem passar pela interface.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: 'Proteção contra spam',
    desc: 'Verificação automática pra bloquear links maliciosos antes de encurtar.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="section">
      <div className="section-head">
        <div className="section-eyebrow">Recursos</div>
        <h2>Mais do que só encurtar</h2>
        <p>Cada link vem com o essencial pra você acompanhar o que importa.</p>
      </div>

      <div className="features">
        {FEATURES.map((f) => (
          <div className="feature" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
