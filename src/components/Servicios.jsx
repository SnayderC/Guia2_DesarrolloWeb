const SERVICIOS = [
  {
    icono: 'fa-right-to-bracket',
    titulo: 'Inicio de sesión centralizado',
    descripcion: 'Un único punto de acceso para todas las aplicaciones internas de tu empresa.',
  },
  {
    icono: 'fa-list-check',
    titulo: 'Validación en tiempo real',
    descripcion: 'Los formularios detectan datos incorrectos antes de enviarlos y explican cómo corregirlos.',
  },
  {
    icono: 'fa-magnifying-glass-chart',
    titulo: 'Auditoría de accesos',
    descripcion: 'Registro de intentos de ingreso para detectar actividad sospechosa a tiempo.',
  },
  {
    icono: 'fa-headset',
    titulo: 'Soporte especializado',
    descripcion: 'Acompañamiento en la configuración de cuentas y políticas de contraseñas.',
  },
]

function Servicios() {
  return (
    <section id="servicios" className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold small text-uppercase">Servicios</span>
          <h2 className="display-6 fw-bold font-display mt-2">Todo lo que necesitas para gestionar accesos</h2>
          <p className="text-body-secondary">Herramientas pensadas para equipos que se toman en serio la seguridad.</p>
        </div>

        <div className="row g-4">
          {SERVICIOS.map((servicio) => (
            <div className="col-12 col-md-6 col-lg-3" key={servicio.titulo}>
              <div className="card tarjeta-servicio h-100">
                <div className="card-body p-4">
                  <span className="caracteristica-icono mb-3" aria-hidden="true">
                    <i className={`fa-solid ${servicio.icono}`} />
                  </span>
                  <h3 className="h5 card-title font-display">{servicio.titulo}</h3>
                  <p className="card-text text-body-secondary small">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Servicios
