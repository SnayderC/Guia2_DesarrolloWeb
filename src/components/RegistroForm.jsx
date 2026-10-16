import { useEffect, useRef, useState } from 'react'
import Campo from './Campo'
import FortalezaPassword from './FortalezaPassword'
import useFormulario from '../hooks/useFormulario'
import { VALIDADORES_REGISTRO, sanitizarTelefono } from '../utils/validaciones'

const FORM_INICIAL = { fullname: '', email: '', age: '', phone: '', password: '', confirmPassword: '' }
const DEMORA_ENVIO_MS = 1000
const DEMORA_REDIRECCION_MS = 1200

function RegistroForm({ notificar, cambiarVista }) {
  const { form, errores, handleChange, handleBlur, validarTodo, reiniciar, claseCampo, registrar } =
    useFormulario(FORM_INICIAL, VALIDADORES_REGISTRO, {
      recortar: ['fullname', 'email', 'age'],
      transformar: { phone: sanitizarTelefono },
      dependientes: { password: ['confirmPassword'] },
    })
  const [enviando, setEnviando] = useState(false)
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  // Propiedades comunes de cada campo.
  const campo = (name) => ({
    name,
    value: form[name],
    error: errores[name],
    className: claseCampo(name),
    inputRef: registrar(name),
    onChange: handleChange,
    onBlur: handleBlur,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (enviando) return

    if (!validarTodo()) {
      notificar('danger', 'Formulario incompleto', 'Corrige los errores destacados en los campos del registro.')
      return
    }

    // Registro simulado: los datos no se envían ni se guardan.
    const nombre = form.fullname.trim()
    setEnviando(true)
    temporizador.current = setTimeout(() => {
      setEnviando(false)
      reiniciar()
      notificar('success', 'Cuenta creada', `Bienvenido al sistema, ${nombre}. Ya puedes iniciar sesión.`)
      temporizador.current = setTimeout(() => cambiarVista('login'), DEMORA_REDIRECCION_MS)
    }, DEMORA_ENVIO_MS)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset disabled={enviando} className="d-grid gap-4">
        <fieldset className="seccion-form">
          <legend className="seccion-titulo">
            <span className="seccion-indice">01</span> Identidad y contacto
          </legend>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <Campo
                id="register-name"
                label="Nombres completos"
                icono="fa-user"
                placeholder="Ej. Juan Carlos Pérez"
                autoComplete="name"
                ayuda="Solo letras, mínimo 3 caracteres"
                {...campo('fullname')}
              />
            </div>
            <div className="col-12 col-md-6">
              <Campo
                id="register-email"
                type="email"
                label="Correo electrónico (@gmail.com)"
                icono="fa-envelope"
                placeholder="nombre.apellido@gmail.com"
                autoComplete="email"
                ayuda="Debe ser una cuenta válida @gmail.com"
                {...campo('email')}
              />
            </div>
            <div className="col-12 col-md-6">
              <Campo
                id="register-age"
                type="number"
                label="Edad"
                icono="fa-calendar-days"
                placeholder="25"
                min="18"
                max="75"
                step="1"
                inputMode="numeric"
                ayuda="Entre 18 y 75 años"
                {...campo('age')}
              />
            </div>
            <div className="col-12 col-md-6">
              <Campo
                id="register-phone"
                type="tel"
                label="Teléfono (+593)"
                icono="fa-phone"
                placeholder="+593991234567"
                autoComplete="tel"
                inputMode="tel"
                maxLength={13}
                ayuda="Formato: +593 seguido de 9 dígitos"
                {...campo('phone')}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="seccion-form">
          <legend className="seccion-titulo">
            <span className="seccion-indice">02</span> Seguridad de la cuenta
          </legend>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <Campo
                id="register-password"
                type="password"
                label="Contraseña segura"
                icono="fa-lock"
                placeholder="Mín. 8 caracteres mixtos"
                autoComplete="new-password"
                ayuda="Mín. 8, con letras y números"
                {...campo('password')}
              />
            </div>
            <div className="col-12 col-md-6">
              <Campo
                id="register-confirm-password"
                type="password"
                label="Confirmar contraseña"
                icono="fa-lock"
                placeholder="Repite la contraseña"
                autoComplete="new-password"
                ayuda="Debe coincidir con la contraseña"
                etiquetaMostrar="confirmación de contraseña"
                {...campo('confirmPassword')}
              />
            </div>
          </div>
          <FortalezaPassword password={form.password} />
        </fieldset>

        <button type="submit" className="btn btn-primary btn-lg w-100">
          {enviando ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              <span role="status">Creando cuenta…</span>
            </>
          ) : (
            <>
              Crear cuenta corporativa <i className="fa-solid fa-user-check ms-2" aria-hidden="true" />
            </>
          )}
        </button>
      </fieldset>

      <p className="text-center text-body-secondary small mt-4 mb-0">
        ¿Ya estás registrado en la red?{' '}
        <button type="button" className="btn btn-link btn-sm p-0 align-baseline" onClick={() => cambiarVista('login')}>
          Iniciar sesión con tu cuenta
        </button>
      </p>
    </form>
  )
}

export default RegistroForm
