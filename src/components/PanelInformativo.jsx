const CARACTERISTICAS = [
  {
    icono: 'fa-shield-halved',
    titulo: 'Mitigación defensiva XSS',
    texto: 'React escapa automáticamente todo el texto que se muestra en pantalla',
  },
  {
    icono: 'fa-universal-access',
    titulo: 'Accesibilidad WCAG 2.2 AA',
    texto: 'Navegación 100% por teclado, regiones ARIA y motion-safe',
  },
  {
    icono: 'fa-bolt',
    titulo: 'Arquitectura SPA sin recarga',
    texto: 'Vistas controladas por estado de React, sin recargar la página',
  },
]

const CUMPLIMIENTO = [
  { icono: 'fa-solid fa-lock', texto: 'TLS 1.3 Strict' },
  { icono: 'fa-solid fa-key', texto: 'OWASP ASVS v5' },
  { icono: 'fa-brands fa-react', texto: 'React + Bootstrap' },
]

// Panel lateral de la Guía 1 (.auth-hero-panel). Se oculta en pantallas pequeñas.
function PanelInformativo() {
  return (
    <aside
      className="panel-informativo d-none d-lg-flex flex-column justify-content-between p-5"
      aria-label="Información institucional y características del sistema"
    >
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <span className="logo-caja" aria-hidden="true">
            <i className="fa-solid fa-cube" />
          </span>
          <div className="lh-sm">
            <span className="d-block fw-bold fs-5 font-display">NexusAuth</span>
            <span className="logo-insignia">ENTERPRISE CORE</span>
          </div>
        </div>
        <span className="pildora-estado">
          <span className="punto-pulso" aria-hidden="true" />
          Sistemas seguros y activos
        </span>
      </div>

      <div className="my-5">
        <h2 className="font-display fw-bold lh-sm mb-3">
          Infraestructura de identidad &amp; control criptográfico.
        </h2>
        <p className="text-body-secondary">
          Arquitectura de validación perimetral con interfaz optimizada de alta densidad y cumplimiento
          estricto WCAG 2.2 AA.
        </p>

        <svg viewBox="0 0 400 150" fill="none" className="grafico-red my-4" aria-hidden="true">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
            </linearGradient>
            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </radialGradient>
          </defs>
          <g stroke="url(#lineGrad)" strokeWidth="1.5">
            <line x1="40" y1="75" x2="135" y2="30" strokeDasharray="4 4" />
            <line x1="135" y1="30" x2="265" y2="30" />
            <line x1="265" y1="30" x2="360" y2="75" strokeDasharray="4 4" />
            <line x1="135" y1="30" x2="200" y2="115" />
            <line x1="265" y1="30" x2="200" y2="115" />
            <line x1="40" y1="75" x2="200" y2="115" />
            <line x1="360" y1="75" x2="200" y2="115" />
          </g>
          <circle cx="40" cy="75" r="5" fill="#64748b" />
          <circle cx="135" cy="30" r="7.5" fill="url(#nodeGrad)" />
          <circle cx="265" cy="30" r="7.5" fill="url(#nodeGrad)" />
          <circle cx="360" cy="75" r="5" fill="#64748b" />
          <circle cx="200" cy="115" r="9" fill="#38bdf8" className="nodo-central" />
        </svg>

        <ul className="list-unstyled d-grid gap-3 mb-0">
          {CARACTERISTICAS.map((c) => (
            <li key={c.titulo} className="d-flex gap-3 align-items-start">
              <span className="caracteristica-icono" aria-hidden="true">
                <i className={`fa-solid ${c.icono}`} />
              </span>
              <div className="small">
                <strong className="d-block">{c.titulo}</strong>
                <span className="text-body-secondary">{c.texto}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="d-flex flex-wrap gap-3 small text-body-secondary border-top pt-3">
        {CUMPLIMIENTO.map((c) => (
          <span key={c.texto}>
            <i className={`${c.icono} me-1`} aria-hidden="true" />
            {c.texto}
          </span>
        ))}
      </div>
    </aside>
  )
}

export default PanelInformativo
