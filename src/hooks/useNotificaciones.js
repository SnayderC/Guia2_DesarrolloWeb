import { useCallback, useRef, useState } from 'react'

// Cola de notificaciones (toasts) que reemplaza a showToast() de la Guía 1.
function useNotificaciones() {
  const [notificaciones, setNotificaciones] = useState([])
  const siguienteId = useRef(0)

  const notificar = useCallback((tipo, titulo, mensaje) => {
    siguienteId.current += 1
    const id = siguienteId.current
    setNotificaciones((prev) => [...prev, { id, tipo, titulo, mensaje }])
  }, [])

  const cerrar = useCallback((id) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return { notificaciones, notificar, cerrar }
}

export default useNotificaciones
