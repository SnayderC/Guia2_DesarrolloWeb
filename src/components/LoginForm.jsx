import { useEffect, useRef, useState } from 'react'
import Campo from './Campo'
import useFormulario from '../hooks/useFormulario'
import { VALIDADORES_LOGIN } from '../utils/validaciones'

const FORM_INICIAL = { email: '', password: '', recordar: false }
const DEMORA_ENVIO_MS = 1000

function LoginForm({ notificar, cambiarVista }) {
  const { form, errores, handleChange, handleBlur, validarTodo, reiniciar, claseCampo, registrar } =
    useFormulario(FORM_INICIAL, VALIDADORES_LOGIN, { recortar: ['email'] })
  const [enviando, setEnviando] = useState(false)
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (enviando) return

    if (!validarTodo()) {
      notificar('danger', 'Error de validación', 'Verifica los campos señalados antes de ingresar.')
      return
    }

    // Autenticación simulada: no hay backend ni se guardan credenciales.
    const email = form.email.trim()
    setEnviando(true)
    temporizador.current = setTimeout(() => {
      setEnviando(false)
      reiniciar()
      notificar('success', 'Autenticación exitosa', `Sesión iniciada correctamente para: ${email}`)
    }, DEMORA_ENVIO_MS)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset disabled={enviando} className="d-grid gap-3">
        <Campo
          id="login-email"
          name="email"
          type="email"
          label="Correo corporativo (@gmail.com)"
          icono="fa-envelope"
          placeholder="usuario@gmail.com"
          autoComplete="email"
          ayuda="Dominio requerido: usuario@gmail.com"
          value={form.email}
          error={errores.email}
          className={claseCampo('email')}
          inputRef={registrar('email')}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Campo
          id="login-password"
          name="password"
          type="password"
          label="Contraseña de acceso"
          icono="fa-lock"
          placeholder="••••••••••••"
          autoComplete="current-password"
          ayuda="Clave de acceso previamente registrada"
          value={form.password}
          error={errores.password}
          className={claseCampo('password')}
          inputRef={registrar('password')}
          onChange={handleChange}
          onBlur={handleBlur}
          accion={
            <button
              type="button"
              className="btn btn-link btn-sm p-0 text-decoration-none"
              onClick={() => cambiarVista('recovery')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          }
        />

        {/* Solo visual, como en la Guía 1: no se guarda nada en el navegador. */}
        <div className="form-check">
          <input
            type="checkbox"
            id="login-remember"
            name="recordar"
            className="form-check-input"
            checked={form.recordar}
            onChange={handleChange}
          />
          <label htmlFor="login-remember" className="form-check-label">
            Recordar este dispositivo de confianza
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-100 mt-1">
          {enviando ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              <span role="status">Verificando…</span>
            </>
          ) : (
            <>
              Acceder al portal <i className="fa-solid fa-arrow-right ms-2" aria-hidden="true" />
            </>
          )}
        </button>

        <div className="insignia-seguridad d-flex align-items-center gap-3 p-3 rounded-3" aria-hidden="true">
          <span className="insignia-icono">
            <i className="fa-solid fa-shield-halved" />
          </span>
          <div className="small">
            <strong className="d-block">Acceso protegido y cifrado</strong>
            <span className="text-body-secondary">
              Sesión resguardada con aislamiento estricto de credenciales.
            </span>
          </div>
        </div>
      </fieldset>

      <p className="text-center text-body-secondary small mt-4 mb-0">
        ¿No dispones de credenciales activas?{' '}
        <button type="button" className="btn btn-link btn-sm p-0 align-baseline" onClick={() => cambiarVista('register')}>
          Registrar nueva cuenta de usuario
        </button>
      </p>
    </form>
  )
}

export default LoginForm
