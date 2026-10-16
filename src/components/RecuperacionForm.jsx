import { useEffect, useRef, useState } from 'react'
import Campo from './Campo'
import useFormulario from '../hooks/useFormulario'
import { VALIDADORES_RECUPERACION, validarEmail } from '../utils/validaciones'

const FORM_INICIAL = { email: '' }
const DEMORA_ENVIO_MS = 1000
const DEMORA_REDIRECCION_MS = 1800

function RecuperacionForm({ notificar, cambiarVista }) {
  const { form, errores, handleChange, handleBlur, validarTodo, reiniciar, claseCampo, registrar } =
    useFormulario(FORM_INICIAL, VALIDADORES_RECUPERACION, { recortar: ['email'] })
  const [enviando, setEnviando] = useState(false)
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (enviando) return

    if (!validarTodo()) {
      notificar('danger', 'Error en correo', validarEmail(form.email))
      return
    }

    // Recuperación simulada: no se envía ningún correo.
    const email = form.email.trim()
    setEnviando(true)
    temporizador.current = setTimeout(() => {
      setEnviando(false)
      reiniciar()
      notificar('success', 'Instrucciones emitidas', `Se ha generado un token de recuperación para: ${email}`)
      temporizador.current = setTimeout(() => cambiarVista('login'), DEMORA_REDIRECCION_MS)
    }, DEMORA_ENVIO_MS)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset disabled={enviando} className="d-grid gap-3">
        <div className="alert alert-info d-flex gap-3 align-items-start mb-0">
          <i className="fa-solid fa-key mt-1" aria-hidden="true" />
          <p className="mb-0 small">
            Introduce el correo registrado. Generaremos un token seguro con caducidad temporal para el
            restablecimiento de tu contraseña.
          </p>
        </div>

        <Campo
          id="recovery-email"
          name="email"
          type="email"
          label="Correo institucional (@gmail.com)"
          icono="fa-envelope"
          placeholder="tu-correo@gmail.com"
          autoComplete="email"
          ayuda="Correo @gmail.com vinculado donde recibirás el enlace temporal"
          value={form.email}
          error={errores.email}
          className={claseCampo('email')}
          inputRef={registrar('email')}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <button type="submit" className="btn btn-primary btn-lg w-100 mt-1">
          {enviando ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              <span role="status">Enviando…</span>
            </>
          ) : (
            <>
              Emitir instrucciones de recuperación <i className="fa-solid fa-paper-plane ms-2" aria-hidden="true" />
            </>
          )}
        </button>
      </fieldset>

      <p className="text-center text-body-secondary small mt-4 mb-0">
        ¿Recordaste tus credenciales?{' '}
        <button type="button" className="btn btn-link btn-sm p-0 align-baseline" onClick={() => cambiarVista('login')}>
          Regresar a iniciar sesión
        </button>
      </p>
    </form>
  )
}

export default RecuperacionForm
