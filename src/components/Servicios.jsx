const SERVICIOS = [
  {
    titulo: 'Inicio de sesión centralizado',
    descripcion: 'Un único punto de acceso para todas las aplicaciones internas de tu empresa.',
  },
  {
    titulo: 'Validación en tiempo real',
    descripcion: 'Los formularios detectan datos incorrectos antes de enviarlos y explican cómo corregirlos.',
  },
  {
    titulo: 'Auditoría de accesos',
    descripcion: 'Registro de intentos de ingreso para detectar actividad sospechosa a tiempo.',
  },
  {
    titulo: 'Soporte especializado',
    descripcion: 'Acompañamiento en la configuración de cuentas y políticas de contraseñas.',
  },
]

function Servicios() {
  return (
    <section id="servicios" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Nuestros servicios</h2>
          <p className="text-secondary">Todo lo que necesitas para gestionar los accesos de tu equipo.</p>
        </div>

        <div className="row g-4">
          {SERVICIOS.map((servicio, indice) => (
            <div className="col-12 col-md-6 col-lg-3" key={servicio.titulo}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <span className="badge rounded-pill text-bg-primary mb-3">0{indice + 1}</span>
                  <h3 className="h5 card-title">{servicio.titulo}</h3>
                  <p className="card-text text-secondary">{servicio.descripcion}</p>
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
