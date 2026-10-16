# NexusAuth · Landing Page con React y Bootstrap

Práctica 2 de la asignatura **Desarrollo Web** (Ingeniería de Software, UNEMI).

Landing page de **NexusAuth**, un servicio ficticio de gestión de accesos para empresas.
Integra el formulario de inicio de sesión de la **Guía 1** (hecho con HTML, CSS y JavaScript puro),
migrado a React con estados, eventos y validaciones.

> ⚠️ **La autenticación es simulada.** No hay backend ni base de datos: el formulario solo valida
> los datos en el navegador y muestra un mensaje de éxito. No se guardan contraseñas ni datos personales.

## Tecnologías

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Componentes funcionales, JSX, `useState`, `useRef`, `useEffect` |
| [Vite](https://vite.dev/) | Servidor de desarrollo y build de producción |
| [Bootstrap 5](https://getbootstrap.com/) | Grid, navbar, cards, formularios, alertas y diseño responsivo |
| [oxlint](https://oxc.rs/) | Linter incluido en la plantilla de Vite |

## Funcionalidades

- **Navbar responsivo**: el menú colapsable en móvil se abre y cierra con `useState`, sin el JavaScript de Bootstrap.
- **Secciones**: Hero, Servicios (tarjetas en grid), Acceso (login) y Footer.
- **Diseño responsivo** para móvil, tablet y escritorio con el grid de Bootstrap.
- **Formulario de login** con inputs controlados y validaciones:
  - Correo obligatorio del dominio `@gmail.com`.
  - Contraseña obligatoria de al menos 8 caracteres, con letras y números.
  - Validación al salir del campo (`onBlur`) y al enviar (`onSubmit`).
  - El error desaparece mientras escribes, en cuanto el valor es correcto.
  - Errores por campo con `is-invalid` / `invalid-feedback` y `aria-invalid`.
  - Mensaje general de error o de éxito con alertas de Bootstrap.
  - Foco automático en el primer campo con error.
  - Botón para mostrar u ocultar la contraseña.
  - Botón deshabilitado con spinner mientras se simula el envío.
  - Limpieza del formulario después de un inicio de sesión exitoso.

### Mejoras respecto a la Guía 1

- Las validaciones son funciones puras en `src/utils/validaciones.js`, separadas de la interfaz.
- Se aplica `trim()` al correo; la contraseña no se recorta porque los espacios forman parte de ella.
- Se eliminó la manipulación directa del DOM (`getElementById`, `innerHTML`, `addEventListener`).
  JSX escapa el texto automáticamente, así que ya no hace falta la función `escapeHTML`.
- Estado de envío con botón deshabilitado para evitar envíos duplicados.
- La regla de edad del registro solo acepta enteros (antes `"25.9"` se aceptaba como 25).

## Estructura

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Servicios.jsx
│   ├── LoginForm.jsx      # formulario migrado de la Guía 1
│   └── Footer.jsx
├── utils/
│   └── validaciones.js    # funciones puras de validación
├── App.jsx
├── main.jsx
└── index.css
legacy/guia1/              # código original de la Guía 1 (solo referencia)
```

## Instalación y ejecución

Requisitos: [Node.js](https://nodejs.org/) 20 o superior.

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run lint       # revisar el código
npm run build      # build de producción
npm run preview    # probar el build
```

## Integrantes

| Nombre | Usuario de GitHub |
|---|---|
| Snayder Cedeño | SnayderC |
| Julissa Lescano | Julissa Lescano |
| Dayanara Guerrero | GuerreroDayanara |
| Veronia Pin | VeronicaSuarez23 |
| Javier Quinteros | Javier Quinteros |




