const DATOS = [
  { valor: '24/7', texto: 'Monitoreo de accesos' },
  { valor: '+593', texto: 'Soporte local en Ecuador' },
  { valor: 'WCAG', texto: 'Formularios accesibles' },
]

function Hero() {
  return (
    <header id="inicio" className="hero text-white py-5">
      <div className="container py-lg-5">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-7 text-center text-lg-start">
            <span className="badge text-bg-primary mb-3">Gestión de identidad para empresas</span>
            <h1 className="display-5 fw-bold">Controla quién entra a tu organización</h1>
            <p className="lead text-white-50 my-4">
              NexusAuth centraliza el inicio de sesión de tu equipo, valida los datos en tiempo
              real y te ayuda a mantener seguros los accesos a tus sistemas.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-lg-start">
              <a href="#acceso" className="btn btn-primary btn-lg">
                Probar el acceso
              </a>
              <a href="#servicios" className="btn btn-outline-light btn-lg">
                Ver servicios
              </a>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="row g-3">
              {DATOS.map((dato) => (
                <div className="col-12 col-sm-4 col-lg-12" key={dato.texto}>
                  <div className="card bg-white bg-opacity-10 border-0 text-white text-center text-lg-start">
                    <div className="card-body">
                      <p className="h3 fw-bold mb-0">{dato.valor}</p>
                      <p className="mb-0 text-white-50">{dato.texto}</p>
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
