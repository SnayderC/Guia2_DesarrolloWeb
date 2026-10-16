import { useEffect, useState } from 'react'

// Rutas de la Guía 1. También acepta las formas cortas (#login, #register…).
export const RUTAS = {
  login: '#/login',
  register: '#/register',
  recovery: '#/recovery',
}

const vistaDesdeHash = (hash) => {
  const limpio = (hash || '').toLowerCase().replace(/^#\/?/, '')
  return RUTAS[limpio] ? limpio : null
}

// Sincroniza la vista del portal con la URL. Los hash de la landing (#inicio,
// #servicios…) no son rutas del portal, así que no cambian la vista.
function useVistaHash(seccionRef) {
  const [vista, setVista] = useState(() => vistaDesdeHash(window.location.hash) ?? 'login')

  useEffect(() => {
    // Normaliza la URL a la ruta canónica y lleva al usuario hasta el portal.
    const mostrarPortal = (nueva) => {
      if (window.location.hash !== RUTAS[nueva]) {
        history.replaceState({ vista: nueva }, '', RUTAS[nueva])
      }
      seccionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const sincronizar = () => {
      const nueva = vistaDesdeHash(window.location.hash)
      if (!nueva) return
      setVista(nueva)
      mostrarPortal(nueva)
    }

    const inicial = vistaDesdeHash(window.location.hash)
    if (inicial) mostrarPortal(inicial)

    window.addEventListener('hashchange', sincronizar)
    window.addEventListener('popstate', sincronizar)
    return () => {
      window.removeEventListener('hashchange', sincronizar)
      window.removeEventListener('popstate', sincronizar)
    }
  }, [seccionRef])

  const cambiarVista = (nueva) => {
    setVista(nueva)
    if (window.location.hash !== RUTAS[nueva]) {
      history.pushState({ vista: nueva }, '', RUTAS[nueva])
    }
  }

  return [vista, cambiarVista]
}

export default useVistaHash
