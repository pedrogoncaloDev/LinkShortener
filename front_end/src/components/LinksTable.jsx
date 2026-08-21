export default function LinksTable({ links }) {
  const handleCopy = (link) => {
    navigator.clipboard?.writeText(link.shortUrl || `https://${link.short}`)
  }

  return (
    <section className="section" style={{ paddingBottom: '40px' }}>
      <div className="section-head">
        <div className="section-eyebrow">Meus Links</div>
        <h2>Tudo organizado num só lugar</h2>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Links recentes</h3>
          <a href="#">Ver todos →</a>
        </div>

        <div className="row head">
          <div>Link curto</div>
          <div>Destino</div>
          <div>Cliques</div>
          <div>Criado em</div>
          <div></div>
        </div>

        {links.map((link) => (
          <div className="row" key={link.short}>
            <div className="short">
              {link.shortUrl ? (
                <a href={link.shortUrl} target="_blank" rel="noreferrer">
                  {link.short}
                </a>
              ) : (
                link.short
              )}
            </div>
            <div className="original">{link.original}</div>
            <div className="clicks">{link.clicks}</div>
            <div className="date">{link.date}</div>
            <div
              className="copy-btn"
              onClick={() => handleCopy(link)}
              title="Copiar link"
            >
              ⧉
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
