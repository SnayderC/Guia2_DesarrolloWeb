import { useRef } from 'react'
import PanelInformativo from './PanelInformativo'
import LoginForm from './LoginForm'
import RegistroForm from './RegistroForm'
import RecuperacionForm from './RecuperacionForm'
import Notificaciones from './Notificaciones'
import useVistaHash from '../hooks/useVistaHash'
import useNotificaciones from '../hooks/useNotificaciones'

// Metadatos de cada vista (viewMetadata en la Guía 1).
const VISTAS = {
  login: {
    titulo: 'Iniciar sesión',
    subtitulo: 'Ingresa tus credenciales corporativas para acceder',
    icono: 'fa-shield-halved',
    Formulario: LoginForm,
  },
  register: {
    titulo: 'Crear cuenta corporativa',
    subtitulo: 'Completa los campos requeridos para registrarte',
    icono: 'fa-user-plus',
    Formulario: RegistroForm,
  },
  recovery: {
    titulo: 'Recuperar contraseña',
    subtitulo: 'Ingresa tu correo @gmail.com para recibir el token de acceso',
    icono: 'fa-key',
    Formulario: RecuperacionForm,
  },
}

const PESTANAS = [
  { vista: 'login', texto: 'Iniciar sesión', icono: 'fa-arrow-right-to-bracket' },
  { vista: 'register', texto: 'Crear cuenta', icono: 'fa-user-plus' },
]

// Portal de acceso de la Guía 1: panel informativo + formularios con pestañas.
// Al cambiar de vista el formulario anterior se desmonta, así sus errores se limpian.
function Acceso() {
  const seccionRef = useRef(null)
  const [vista, cambiarVista] = useVistaHash(seccionRef)
  const { notificaciones, notificar, cerrar } = useNotificaciones()
  const { titulo, subtitulo, icono, Formulario } = VISTAS[vista]

  return (
    <section id="acceso" ref={seccionRef} className="seccion-acceso py-5">
      <div className="container py-lg-4">
        <div className={`tarjeta-acceso modo-${vista} mx-auto`}>
          <PanelInformativo />

          <div className="panel-formularios p-4 p-sm-5">
            <ul className="nav nav-pills nav-fill flex-nowrap pestanas mb-4" role="tablist" aria-label="Cambio de modo de acceso">
              {PESTANAS.map((p) => (
                <li className="nav-item" role="presentation" key={p.vista}>
                  <button
                    type="button"
                    id={`tab-${p.vista}`}
                    className={`nav-link${vista === p.vista ? ' active' : ''}`}
                    role="tab"
                    aria-selected={vista === p.vista}
                    aria-controls={`view-${p.vista}`}
                    onClick={() => cambiarVista(p.vista)}
                  >
                    <i className={`fa-solid ${p.icono} me-2`} aria-hidden="true" />
                    {p.texto}
                  </button>
                </li>
              ))}
            </ul>

            <header className="mb-4">
              <div className="d-flex align-items-center gap-3 mb-2">
                <span className="insignia-cabecera" aria-hidden="true">
                  <i className={`fa-solid ${icono}`} />
                </span>
                <h2 className="h3 font-display fw-bold mb-0" id="titulo-vista">
                  {titulo}
                </h2>
              </div>
              <p className="text-body-secondary mb-0">{subtitulo}</p>
            </header>

            <div
              id={`view-${vista}`}
              key={vista}
              className="vista-formulario"
              role="tabpanel"
              aria-labelledby={vista === 'recovery' ? 'titulo-vista' : `tab-${vista}`}
            >
              <Formulario notificar={notificar} cambiarVista={cambiarVista} />
            </div>
          </div>
        </div>
      </div>

      <Notificaciones notificaciones={notificaciones} onCerrar={cerrar} />
    </section>
  )
}

export default Acceso
