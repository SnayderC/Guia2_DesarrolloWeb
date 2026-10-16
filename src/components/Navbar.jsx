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
    <nav className="navbar navbar-expand-lg sticky-top barra-navegacion">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2 fw-bold font-display" href="#inicio" onClick={cerrarMenu}>
          <span className="logo-caja logo-caja-sm" aria-hidden="true">
            <i className="fa-solid fa-cube" />
          </span>
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
          <ul className="navbar-nav ms-auto mb-3 mb-lg-0">
            {ENLACES.map((enlace) => (
              <li className="nav-item" key={enlace.href}>
                <a className="nav-link" href={enlace.href} onClick={cerrarMenu}>
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
          <div className="d-flex flex-column flex-lg-row gap-2 ms-lg-3 pb-3 pb-lg-0">
            <a className="btn btn-outline-light" href="#/login" onClick={cerrarMenu}>
              Iniciar sesión
            </a>
            <a className="btn btn-primary" href="#/register" onClick={cerrarMenu}>
              Crear cuenta
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
