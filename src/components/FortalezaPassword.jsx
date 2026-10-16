import { evaluarFortaleza } from '../utils/validaciones'

const NIVELES = {
  1: { texto: 'Débil', color: 'danger', ancho: '33%' },
  2: { texto: 'Media', color: 'warning', ancho: '66%' },
  3: { texto: 'Fuerte', color: 'success', ancho: '100%' },
}

const REGLAS = [
  { clave: 'largo', texto: '8+ caracteres' },
  { clave: 'letra', texto: 'Letras' },
  { clave: 'numero', texto: 'Números' },
]

// Medidor de fortaleza de la Guía 1, calculado a partir del valor (sin estado propio).
function FortalezaPassword({ password }) {
  const resultado = evaluarFortaleza(password)
  const nivel = password ? NIVELES[resultado.puntaje] : null

  return (
    <div className="fortaleza mt-3" aria-live="polite">
      <div className="d-flex justify-content-between small mb-1">
        <span className="text-body-secondary">Fortaleza de la contraseña</span>
        {nivel && <span className={`fw-semibold text-${nivel.color}`}>{nivel.texto}</span>}
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-label="Fortaleza de la contraseña"
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuenow={password ? resultado.puntaje : 0}
      >
        <div
          className={`progress-bar ${nivel ? `bg-${nivel.color}` : ''}`}
          style={{ width: nivel ? nivel.ancho : '0%' }}
        />
      </div>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {REGLAS.map((regla) => (
          <span
            key={regla.clave}
            className={`badge rounded-pill regla ${resultado[regla.clave] ? 'regla-cumplida' : ''}`}
          >
            <i className="fa-solid fa-circle-check me-1" aria-hidden="true" />
            {regla.texto}
            <span className="visually-hidden">{resultado[regla.clave] ? ': cumplida' : ': pendiente'}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default FortalezaPassword
