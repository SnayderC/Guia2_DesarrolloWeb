import { useEffect, useRef, useState } from 'react'
import { hayErrores, validarEmail, validarLogin, validarPassword } from '../utils/validaciones'

const FORM_INICIAL = { email: '', password: '' }
const VALIDADORES = { email: validarEmail, password: validarPassword }
const DEMORA_ENVIO_MS = 1000

// En `errores`: campo ausente = sin validar, "" = válido, texto = mensaje de error.
function LoginForm() {
  const [form, setForm] = useState(FORM_INICIAL)
  const [errores, setErrores] = useState({})
  const [intentoEnvio, setIntentoEnvio] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [verPassword, setVerPassword] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  const claseCampo = (campo) => {
    if (errores[campo] === undefined) return 'form-control'
    return errores[campo] ? 'form-control is-invalid' : 'form-control is-valid'
  }

  // Como en la Guía 1: al escribir solo se quita el error cuando el campo pasa a ser válido.
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errores[name] && !VALIDADORES[name](value)) {
      setErrores((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Al salir del campo: si está vacío y aún no se intentó enviar, no se marca nada.
  const handleBlur = (e) => {
    const { name } = e.target
    const valor = name === 'email' ? form.email.trim() : form[name]

    if (name === 'email' && valor !== form.email) {
      setForm((prev) => ({ ...prev, email: valor }))
    }

    if (valor.trim() === '' && !intentoEnvio) {
      setErrores((prev) => {
        const { [name]: _omitido, ...resto } = prev
        return resto
      })
      return
    }

    setErrores((prev) => ({ ...prev, [name]: VALIDADORES[name](valor) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (enviando) return

    setIntentoEnvio(true)
    const nuevosErrores = validarLogin(form)
    setErrores(nuevosErrores)

    if (hayErrores(nuevosErrores)) {
      setMensaje({
        tipo: 'danger',
        titulo: 'Error de validación.',
        texto: 'Verifica los campos señalados antes de ingresar.',
      })
      const primerCampo = nuevosErrores.email ? emailRef : passwordRef
      primerCampo.current?.focus()
      return
    }

    // Autenticación simulada: no hay backend ni se guardan credenciales.
    const email = form.email.trim()
    setMensaje(null)
    setEnviando(true)
    temporizador.current = setTimeout(() => {
      setEnviando(false)
      setForm(FORM_INICIAL)
      setErrores({})
      setIntentoEnvio(false)
      setVerPassword(false)
      setMensaje({
        tipo: 'success',
        titulo: 'Autenticación exitosa.',
        texto: `Sesión iniciada correctamente para: ${email}`,
      })
    }, DEMORA_ENVIO_MS)
  }

  return (
    <section id="acceso" className="py-5 bg-body-tertiary">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-5">
            <h2 className="fw-bold">Accede a tu panel</h2>
            <p className="text-secondary">
              Ingresa con tu correo corporativo de Gmail para administrar los accesos de tu equipo.
            </p>
            <ul className="text-secondary small">
              <li>El correo debe pertenecer al dominio @gmail.com.</li>
              <li>La contraseña necesita al menos 8 caracteres, con letras y números.</li>
            </ul>
          </div>

          <div className="col-12 col-md-8 col-lg-6 mx-auto">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-sm-5">
                <h3 className="h4 mb-1">Iniciar sesión</h3>
                <p className="text-secondary small mb-4">
                  Ingresa tus credenciales corporativas para acceder
                </p>

                {mensaje && (
                  <div className={`alert alert-${mensaje.tipo} alert-dismissible`} role="alert">
                    <strong>{mensaje.titulo}</strong> {mensaje.texto}
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Cerrar mensaje"
                      onClick={() => setMensaje(null)}
                    />
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="login-email" className="form-label">
                      Correo electrónico <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      id="login-email"
                      name="email"
                      className={claseCampo('email')}
                      placeholder="usuario@gmail.com"
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errores.email)}
                      aria-describedby="error-login-email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={enviando}
                    />
                    <div id="error-login-email" className="invalid-feedback">
                      {errores.email}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="login-password" className="form-label">
                      Contraseña <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <div className="input-group has-validation">
                      <input
                        ref={passwordRef}
                        type={verPassword ? 'text' : 'password'}
                        id="login-password"
                        name="password"
                        className={claseCampo('password')}
                        placeholder="Mínimo 8 caracteres"
                        autoComplete="current-password"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errores.password)}
                        aria-describedby="error-login-password"
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={enviando}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        aria-controls="login-password"
                        onClick={() => setVerPassword((prev) => !prev)}
                        disabled={enviando}
                      >
                        {verPassword ? 'Ocultar' : 'Mostrar'}
                      </button>
                      <div id="error-login-password" className="invalid-feedback">
                        {errores.password}
                      </div>
                    </div>
                  </div>

                  <p className="small text-secondary">
                    ¿Olvidaste tu contraseña? Contacta al administrador de tu organización.
                  </p>

                  <button type="submit" className="btn btn-primary w-100" disabled={enviando}>
                    {enviando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                        <span role="status">Verificando…</span>
                      </>
                    ) : (
                      'Ingresar al sistema'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
