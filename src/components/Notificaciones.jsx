import { useEffect, useState } from 'react'

const DURACION_MS = 4000
const DURACION_TRAS_HOVER_MS = 1500

const ICONOS = {
  success: 'fa-circle-check',
  danger: 'fa-circle-exclamation',
  warning: 'fa-triangle-exclamation',
}

// Toast de Bootstrap controlado por estado: se cierra solo, se pausa con el
// mouse encima y se cierra 1,5 s después de retirarlo (como en la Guía 1).
function Toast({ id, tipo, titulo, mensaje, onCerrar }) {
  const [pausado, setPausado] = useState(false)
  const [restante, setRestante] = useState(DURACION_MS)
  const [ciclo, setCiclo] = useState(0)

  useEffect(() => {
    if (pausado) return
    const temporizador = setTimeout(() => onCerrar(id), restante)
    return () => clearTimeout(temporizador)
  }, [pausado, restante, ciclo, id, onCerrar])

  return (
    <div
      className={`toast show notificacion notificacion-${tipo}`}
      role={tipo === 'danger' ? 'alert' : 'status'}
      aria-atomic="true"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => {
        setPausado(false)
        setRestante(DURACION_TRAS_HOVER_MS)
        setCiclo((prev) => prev + 1)
      }}
    >
      <div className="d-flex align-items-start gap-3 p-3">
        <i className={`fa-solid ${ICONOS[tipo]} fs-5 text-${tipo} mt-1`} aria-hidden="true" />
        <div className="flex-grow-1">
          <p className="fw-semibold mb-1">{titulo}</p>
          <p className="mb-0 small text-body-secondary">{mensaje}</p>
        </div>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Cerrar notificación"
          onClick={() => onCerrar(id)}
        />
      </div>
      <div className="notificacion-progreso">
        <div
          key={ciclo}
          className={`bg-${tipo}`}
          style={{ animationDuration: `${restante}ms`, animationPlayState: pausado ? 'paused' : 'running' }}
        />
      </div>
    </div>
  )
}

function Notificaciones({ notificaciones, onCerrar }) {
  return (
    <div
      className="toast-container contenedor-notificaciones position-fixed p-3"
      aria-live="polite"
      aria-label="Notificaciones del sistema"
    >
      {notificaciones.map((n) => (
        <Toast key={n.id} {...n} onCerrar={onCerrar} />
      ))}
    </div>
  )
}

export default Notificaciones
