// Reglas de validación migradas de la Guía 1 (legacy/guia1/script.js).
// Cada función es pura: recibe valores y devuelve un mensaje de error o "".

export const MENSAJES = {
  requerido: 'Este campo es obligatorio',
  email: 'Formato no válido. Debe pertenecer al dominio @gmail.com (ej: usuario@gmail.com)',
  password: 'Mínimo 8 caracteres, conteniendo al menos letras y números',
  nombre: 'Ingresa al menos 3 caracteres alfabéticos válidos',
  edad: 'La edad debe ser un número entero comprendido entre 18 y 75 años',
  telefono: 'Debe iniciar con +593 seguido de exactamente 9 dígitos numéricos (ej: +593991234567)',
  confirmacion: 'Las contraseñas no coinciden',
}

const GMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/i
const NOMBRE_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
const TELEFONO_REGEX = /^\+593[0-9]{9}$/

const estaVacio = (valor) => (valor ?? '').trim() === ''

export function validarEmail(valor) {
  if (estaVacio(valor)) return MENSAJES.requerido
  if (!GMAIL_REGEX.test(valor.trim())) return MENSAJES.email
  return ''
}

// La contraseña no se recorta: los espacios forman parte de la credencial.
export function validarPassword(valor) {
  if (estaVacio(valor)) return MENSAJES.requerido
  const tieneLetra = /[a-zA-Z]/.test(valor)
  const tieneNumero = /[0-9]/.test(valor)
  if (valor.length < 8 || !tieneLetra || !tieneNumero) return MENSAJES.password
  return ''
}

export function validarLogin({ email, password }) {
  return {
    email: validarEmail(email),
    password: validarPassword(password),
  }
}

// Reglas del formulario de registro de la Guía 1. Se conservan para no perder
// ninguna validación, aunque la landing solo integra el login.

export function validarNombre(valor) {
  if (estaVacio(valor)) return MENSAJES.requerido
  const limpio = valor.trim()
  if (limpio.length < 3 || !NOMBRE_REGEX.test(limpio)) return MENSAJES.nombre
  return ''
}

// Mejora respecto a la Guía 1: parseInt aceptaba decimales ("25.9" → 25).
export function validarEdad(valor) {
  if (estaVacio(String(valor ?? ''))) return MENSAJES.requerido
  const texto = String(valor).trim()
  if (!/^\d+$/.test(texto)) return MENSAJES.edad
  const edad = Number(texto)
  if (edad < 18 || edad > 75) return MENSAJES.edad
  return ''
}

export function validarTelefono(valor) {
  if (estaVacio(valor)) return MENSAJES.requerido
  if (!TELEFONO_REGEX.test(valor.trim().replace(/\s+/g, ''))) return MENSAJES.telefono
  return ''
}

export function validarConfirmacion(confirmacion, password) {
  if (estaVacio(confirmacion)) return MENSAJES.requerido
  if (confirmacion !== password) return MENSAJES.confirmacion
  return ''
}

// Equivale al filtro en tiempo real del teléfono de la Guía 1: solo un "+"
// inicial y dígitos, con un máximo de 13 caracteres.
export function sanitizarTelefono(valor) {
  const conMas = valor.startsWith('+')
  const digitos = valor.replace(/\D/g, '')
  return ((conMas ? '+' : '') + digitos).slice(0, 13)
}

export function hayErrores(errores) {
  return Object.values(errores).some(Boolean)
}
