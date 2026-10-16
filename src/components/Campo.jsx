import { useState } from 'react'

// Campo de formulario con icono, pista, mensaje de error y, si es contraseña,
// botón para mostrarla u ocultarla. Reemplaza el bloque .form-group de la Guía 1.
function Campo({
  id,
  name,
  label,
  icono,
  type = 'text',
  ayuda,
  error,
  className,
  inputRef,
  accion,
  etiquetaMostrar = 'contraseña',
  ...props
}) {
  const [visible, setVisible] = useState(false)
  const esPassword = type === 'password'
  const idAyuda = `ayuda-${id}`
  const idError = `error-${id}`

  return (
    <div className="campo">
      <div className="d-flex justify-content-between align-items-baseline gap-2">
        <label htmlFor={id} className="form-label">
          {label} <span className="text-danger" aria-hidden="true">*</span>
        </label>
        {accion}
      </div>

      <div className="input-group has-validation">
        <span className="input-group-text" aria-hidden="true">
          <i className={`fa-solid ${icono}`} />
        </span>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={esPassword && visible ? 'text' : type}
          className={className}
          required
          aria-required="true"
          aria-invalid={Boolean(error)}
          aria-describedby={`${idAyuda} ${idError}`}
          {...props}
        />
        {esPassword && (
          <button
            type="button"
            className="btn btn-campo"
            aria-label={`${visible ? 'Ocultar' : 'Mostrar'} ${etiquetaMostrar}`}
            aria-controls={id}
            onClick={() => setVisible((prev) => !prev)}
          >
            <i className={`fa-regular ${visible ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true" />
          </button>
        )}
        <div id={idError} className="invalid-feedback" role="alert">
          {error && (
            <>
              <i className="fa-solid fa-circle-exclamation me-1" aria-hidden="true" />
              {error}
            </>
          )}
        </div>
      </div>

      <div id={idAyuda} className="form-text">
        <i className="fa-solid fa-circle-info me-1" aria-hidden="true" />
        {ayuda}
      </div>
    </div>
  )
}

export default Campo
