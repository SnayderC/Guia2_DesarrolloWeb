const ANIO = new Date().getFullYear()

function Footer() {
  return (
    <footer className="pie py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-2 text-center text-md-start small text-body-secondary">
        <p className="mb-0">
          <i className="fa-solid fa-cube me-1" aria-hidden="true" /> © {ANIO} NexusAuth · Desarrollo Web, UNEMI
        </p>
        <p className="mb-0">Proyecto académico: el inicio de sesión es una simulación.</p>
      </div>
    </footer>
  )
}

export default Footer
