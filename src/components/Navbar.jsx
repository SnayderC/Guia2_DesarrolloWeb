import { useState } from 'react'

const ENLACES = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#servicios', texto: 'Servicios' },
  { href: '#acceso', texto: 'Acceso' },
]

// El menú colapsable se controla con estado, sin el JavaScript de Bootstrap.
function Navbar() {
  const [abierto, setAbierto] = useState(false)

  const cerrarMenu = () => setAbierto(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio" onClick={cerrarMenu}>
          NexusAuth
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${abierto ? ' show' : ''}`} id="menu-principal">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {ENLACES.map((enlace) => (
              <li className="nav-item" key={enlace.href}>
                <a className="nav-link" href={enlace.href} onClick={cerrarMenu}>
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary ms-lg-3" href="#acceso" onClick={cerrarMenu}>
            Iniciar sesión
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
