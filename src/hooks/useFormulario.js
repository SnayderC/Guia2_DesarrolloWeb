import { useCallback, useRef, useState } from 'react'

// Estado y eventos compartidos por los formularios migrados de la Guía 1.
// En `errores`: campo ausente = sin validar, "" = válido, texto = mensaje de error.
//
// Opciones:
// - recortar: campos a los que se aplica trim() al salir del campo.
// - transformar: { campo: fn } para sanear el valor mientras se escribe.
// - dependientes: { campo: [otros] } campos que se revalidan cuando cambia `campo`.
function useFormulario(inicial, validadores, opciones = {}) {
  const { recortar = [], transformar = {}, dependientes = {} } = opciones

  const [form, setForm] = useState(inicial)
  const [errores, setErrores] = useState({})
  const [intentoEnvio, setIntentoEnvio] = useState(false)
  const campos = useRef({})

  const validar = (nombre, datos) => validadores[nombre](datos[nombre], datos)

  // Callback ref para poder enfocar el primer campo con error.
  const registrar = useCallback(
    (nombre) => (elemento) => {
      campos.current[nombre] = elemento
    },
    [],
  )

  const handleChange = (e) => {
    const { name, type, checked } = e.target
    let valor = type === 'checkbox' ? checked : e.target.value
    if (transformar[name]) valor = transformar[name](valor)

    const datos = { ...form, [name]: valor }
    setForm(datos)
    if (!validadores[name]) return

    const cambios = {}
    // Como en la Guía 1: al escribir solo se quita el error cuando el campo pasa a ser válido.
    if (errores[name] && !validar(name, datos)) cambios[name] = ''
    for (const dependiente of dependientes[name] ?? []) {
      if (String(datos[dependiente]).trim() !== '') cambios[dependiente] = validar(dependiente, datos)
    }
    if (Object.keys(cambios).length) setErrores((prev) => ({ ...prev, ...cambios }))
  }

  // Al salir del campo: si está vacío y aún no se intentó enviar, no se marca nada.
  const handleBlur = (e) => {
    const { name } = e.target
    if (!validadores[name]) return

    let datos = form
    if (recortar.includes(name) && form[name] !== form[name].trim()) {
      datos = { ...form, [name]: form[name].trim() }
      setForm(datos)
    }

    if (String(datos[name]).trim() === '' && !intentoEnvio) {
      setErrores((prev) => {
        const { [name]: _omitido, ...resto } = prev
        return resto
      })
      return
    }
    setErrores((prev) => ({ ...prev, [name]: validar(name, datos) }))
  }

  // Valida todo, enfoca el primer campo con error y devuelve true si es válido.
  const validarTodo = () => {
    setIntentoEnvio(true)
    const nuevos = {}
    for (const nombre of Object.keys(validadores)) nuevos[nombre] = validar(nombre, form)
    setErrores(nuevos)

    const primerError = Object.keys(nuevos).find((nombre) => nuevos[nombre])
    if (primerError) campos.current[primerError]?.focus()
    return !primerError
  }

  const reiniciar = () => {
    setForm(inicial)
    setErrores({})
    setIntentoEnvio(false)
  }

  const claseCampo = (nombre) => {
    if (errores[nombre] === undefined) return 'form-control'
    return errores[nombre] ? 'form-control is-invalid' : 'form-control is-valid'
  }

  return { form, errores, handleChange, handleBlur, validarTodo, reiniciar, claseCampo, registrar }
}

export default useFormulario
