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

const estaVacio = (valor) => String(valor ?? '').trim() === ''

export function validarEmail(valor) {
  if (estaVacio(valor)) return MENSAJES.requerido
  if (!GMAIL_REGEX.test(valor.trim())) return MENSAJES.email
  return ''
}

// La contraseña no se recorta: los espacios forman parte de la credencial.
export function validarPassword(valor) {
  if (estaVacio(valor)) return MENSAJES.requerido
  const { largo, letra, numero } = evaluarFortaleza(valor)
  if (!largo || !letra || !numero) return MENSAJES.password
  return ''
}

export function validarNombre(valor) {
  if (estaVacio(valor)) return MENSAJES.requerido
  const limpio = valor.trim()
  if (limpio.length < 3 || !NOMBRE_REGEX.test(limpio)) return MENSAJES.nombre
  return ''
}

// Mejora respecto a la Guía 1: parseInt aceptaba decimales ("25.9" → 25).
export function validarEdad(valor) {
  if (estaVacio(valor)) return MENSAJES.requerido
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

// Reglas del medidor de fortaleza del registro.
export function evaluarFortaleza(password = '') {
  const largo = password.length >= 8
  const letra = /[a-zA-Z]/.test(password)
  const numero = /[0-9]/.test(password)
  return { largo, letra, numero, puntaje: [largo, letra, numero].filter(Boolean).length }
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

// Validadores por formulario. Reciben (valor, datosDelFormulario).
export const VALIDADORES_LOGIN = {
  email: validarEmail,
  password: validarPassword,
}

export const VALIDADORES_REGISTRO = {
  fullname: validarNombre,
  email: validarEmail,
  age: validarEdad,
  phone: validarTelefono,
  password: validarPassword,
  confirmPassword: (valor, datos) => validarConfirmacion(valor, datos.password),
}

export const VALIDADORES_RECUPERACION = {
  email: validarEmail,
}
