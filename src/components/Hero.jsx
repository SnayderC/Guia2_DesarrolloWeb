const DATOS = [
  { icono: 'fa-shield-halved', valor: '24/7', texto: 'Monitoreo de accesos' },
  { icono: 'fa-location-dot', valor: '+593', texto: 'Soporte local en Ecuador' },
  { icono: 'fa-universal-access', valor: 'WCAG 2.2', texto: 'Formularios accesibles' },
]

function Hero() {
  return (
    <header id="inicio" className="hero py-5">
      <div className="container py-lg-5">
        <div className="row align-items-center gy-5 gx-lg-5">
          <div className="col-12 col-lg-7 text-center text-lg-start">
            <span className="pildora-estado mb-4">
              <span className="punto-pulso" aria-hidden="true" />
              Sistemas seguros y activos
            </span>
            <h1 className="display-4 fw-bold font-display lh-sm">
              Controla quién entra a <span className="texto-degradado">tu organización</span>
            </h1>
            <p className="lead text-body-secondary my-4">
              NexusAuth centraliza el inicio de sesión de tu equipo, valida los datos en tiempo real y te
              ayuda a mantener seguros los accesos a tus sistemas.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <a href="#/register" className="btn btn-primary btn-lg px-4">
                Crear cuenta <i className="fa-solid fa-arrow-right ms-2" aria-hidden="true" />
              </a>
              <a href="#/login" className="btn btn-outline-light btn-lg px-4">
                Iniciar sesión
              </a>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="row g-3">
              {DATOS.map((dato) => (
                <div className="col-12 col-sm-4 col-lg-12" key={dato.texto}>
                  <div className="tarjeta-vidrio d-flex flex-column flex-lg-row align-items-center gap-3 p-3 text-center text-lg-start h-100">
                    <span className="caracteristica-icono" aria-hidden="true">
                      <i className={`fa-solid ${dato.icono}`} />
                    </span>
                    <div>
                      <p className="h4 fw-bold font-display mb-0">{dato.valor}</p>
                      <p className="mb-0 small text-body-secondary">{dato.texto}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
