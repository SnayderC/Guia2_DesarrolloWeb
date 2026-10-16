const ANIO = new Date().getFullYear()

function Footer() {
  return (
    <footer className="bg-dark text-white-50 py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-2 text-center text-md-start">
        <p className="mb-0">© {ANIO} NexusAuth · Desarrollo Web, UNEMI</p>
        <p className="mb-0 small">Proyecto académico: el inicio de sesión es una simulación.</p>
      </div>
    </footer>
  )
}

export default Footer
